"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { 
  Upload, ImageIcon, Shirt, Sparkles, Download, RefreshCw, X
} from "lucide-react"
import { mockWardrobeItems, type ClothingItem } from "@/lib/mockData"
import { cn } from "@/lib/utils"
import { buildOptimizedPrompt } from "@/lib/promptBuilder"

export default function VirtualTryonPage() {
  const [userPhoto, setUserPhoto] = useState("")
  const [selectedItems, setSelectedItems] = useState<ClothingItem[]>([])

  const handleToggleItem = (item: ClothingItem) => {
    setSelectedItems(prev => {
      const exists = prev.find(i => i.id === item.id)
      if (exists) {
        return prev.filter(i => i.id !== item.id)
      } else {
        // Limit to 3 items for example
        if (prev.length >= 3) return prev
        return [...prev, item]
      }
    })
  }
  const [items, setItems] = useState<ClothingItem[]>([])
  const [resultImage, setResultImage] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [prompt, setPrompt] = useState("时尚写真，工作室灯光，高级质感，人物正面")

  useEffect(() => {
    // Load data
    const profile = localStorage.getItem("smartfit_user_profile")
    const wardrobe = localStorage.getItem("smartfit_wardrobe")
    
    if (profile) {
      const data = JSON.parse(profile)
      if (data.photo) setUserPhoto(data.photo)
    }
    setItems(wardrobe ? JSON.parse(wardrobe) : mockWardrobeItems)
  }, [])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const img = document.createElement('img')
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height
          
          // Resize if too large (max 1024px dimension)
          const maxDim = 1024
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width)
              width = maxDim
            } else {
              width = Math.round((width * maxDim) / height)
              height = maxDim
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)
          
          // Compress to JPEG with 0.8 quality to reduce size
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8)
          setUserPhoto(dataUrl)
        }
        img.src = event.target?.result as string
      }
      reader.readAsDataURL(file)
    }
  }

  const handleGenerate = async () => {
    if (!prompt) return
    
    // 验证 prompt 长度
    if (prompt.length > 10000) {
      alert("提示词过长，请缩短描述内容（最大 10000 字符）")
      return
    }
    
    // 验证是否有选择的衣物
    if (selectedItems.length === 0) {
      alert("请至少选择一件衣物")
      return
    }
    
    setIsGenerating(true)
    try {
      // 构建多图数组：用户照片 + 选择的衣物图片
      const images: string[] = []
      
      // 添加用户照片（如果是 base64，也会传递，API 会处理）
      if (userPhoto) {
        images.push(userPhoto)
      }
      
      // 添加选择的衣物图片
      selectedItems.forEach(item => {
        if (item.image) {
          images.push(item.image)
        }
      })
      
      // 使用专业的提示词构建器
      const { positive: optimizedPrompt, negative: negativePrompt } = buildOptimizedPrompt(
        prompt.trim(),
        selectedItems,
        userPhoto || undefined
      )
      
      const res = await fetch("/api/ai/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: optimizedPrompt,
          negative_prompt: negativePrompt, // 添加负面提示词
          image: images.length > 0 ? images : undefined, // 传递多图数组
          width: 1920, // 满足 API 最小尺寸要求（1920x1920 = 3,686,400 像素）
          height: 1920,
          num_inference_steps: 30, // 增加步数提升质量
          guidance_scale: 7.5 // 提高引导强度，确保更好的提示词遵循
        })
      })
      
      const data = await res.json()
      if (res.ok && data?.success && data?.imageUrl) {
        setResultImage(data.imageUrl)
      } else {
        const errorMsg = data?.error || data?.message || "生成失败，请稍后重试"
        console.error("Generate error:", errorMsg)
        alert(`生成失败: ${errorMsg}`)
      }
    } catch (e: unknown) {
      console.error("Generate exception:", e)
      const errorMsg = e instanceof Error ? e.message : "请检查网络连接"
      alert(`发生错误: ${errorMsg}`)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col lg:flex-row overflow-hidden bg-gray-50">
      
      {/* Left Column: Model & Settings */}
      <div className="w-full lg:w-[320px] bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h1 className="font-serif text-xl font-bold">虚拟试衣间</h1>
          <p className="text-gray-500 text-xs mt-1">第一步：设置模特与场景</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Prompt */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400">生成描述</h2>
              <span className={`text-xs ${prompt.length > 10000 ? 'text-red-500' : prompt.length > 8000 ? 'text-yellow-500' : 'text-gray-400'}`}>
                {prompt.length}/10000
              </span>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => {
                const newPrompt = e.target.value
                // 限制最大长度
                if (newPrompt.length <= 10000) {
                  setPrompt(newPrompt)
                }
              }}
              placeholder="例如：时尚人像，柔光，街头场景..."
              rows={3}
              maxLength={10000}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-black resize-none"
            />
            {prompt.length > 8000 && (
              <p className="text-xs text-yellow-500 mt-1">
                提示词较长，建议缩短以确保生成质量
              </p>
            )}
          </div>

          {/* Model Selection */}
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
              <ImageIcon size={14} /> 选择模特
            </h2>
            <label className="relative block aspect-3/4 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer border-2 border-dashed border-gray-200 hover:border-black transition-all group">
               {userPhoto ? (
                 <div className="relative w-full h-full flex items-center justify-center bg-gray-50">
                   {userPhoto.startsWith("data:") ? (
                     <img src={userPhoto} alt="User" className="max-w-full max-h-full object-contain" />
                   ) : (
                     <Image
                       src={userPhoto}
                       alt="User"
                       fill
                       className="object-contain"
                       sizes="(max-width: 768px) 100vw, 320px"
                       unoptimized
                     />
                   )}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                     <span className="bg-white px-3 py-1 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity shadow-lg pointer-events-auto">更换照片</span>
                   </div>
                 </div>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2">
                   <Upload size={24} />
                   <span className="text-sm font-medium">上传照片</span>
                 </div>
               )}
               <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        </div>
      </div>

      {/* Middle Column: Preview Area */}
      <div className="flex-1 bg-gray-100 flex items-center justify-center p-8 relative overflow-hidden">
        <div className="bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] absolute inset-0 opacity-5 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {resultImage ? (
            <motion.div 
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative h-full max-h-[80vh] aspect-3/4 rounded-2xl overflow-hidden shadow-2xl bg-white group"
            >
              <Image
                src={resultImage}
                alt="Result"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
              <button 
                onClick={() => setResultImage(null)}
                className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur rounded-full hover:bg-white transition-colors"
                title="关闭预览"
                aria-label="关闭预览"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-4 group-hover:translate-y-0 duration-300">
                <button className="px-6 py-2 bg-white text-black rounded-full font-bold shadow-lg flex items-center gap-2 hover:bg-gray-50">
                  <Download size={16} /> 保存
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center text-gray-400 space-y-4 max-w-md"
            >
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                <Sparkles size={40} className="text-gray-300" />
              </div>
              <h3 className="text-xl font-medium text-gray-500">预览区域</h3>
              <p>在左侧上传照片，右侧选择服饰，点击生成查看效果。</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right Column: Wardrobe & Actions */}
      <div className="w-full lg:w-[320px] bg-white border-l border-gray-200 flex flex-col z-20 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <h2 className="font-serif text-xl font-bold">我的衣柜</h2>
          <p className="text-gray-500 text-xs mt-1">第二步：选择要试穿的服饰</p>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                <Shirt size={14} /> 已选 {selectedItems.length}/3
              </span>
              {selectedItems.length > 0 && (
                <button 
                  onClick={() => setSelectedItems([])}
                  className="text-xs text-red-500 hover:text-red-600 font-medium"
                >
                  清空选择
                </button>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {items.slice(0, 9).map((item) => {
                const isSelected = selectedItems.some(i => i.id === item.id)
                return (
                  <button
                    key={item.id}
                    onClick={() => handleToggleItem(item)}
                    className={cn(
                      "relative aspect-square rounded-lg overflow-hidden border-2 transition-all bg-gray-50 flex items-center justify-center",
                      isSelected ? "border-black ring-1 ring-black" : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 50vw, 150px"
                      unoptimized
                    />
                    {isSelected && (
                      <div className="absolute top-1 right-1 w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-xs font-bold shadow-sm z-10">
                        {selectedItems.findIndex(i => i.id === item.id) + 1}
                      </div>
                    )}
                  </button>
                )
              })}
              <button className="aspect-square rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors gap-1">
                <span className="text-2xl">+</span>
                <span className="text-xs font-bold">更多</span>
              </button>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={handleGenerate}
            disabled={!userPhoto || selectedItems.length === 0 || isGenerating}
            className="w-full py-4 bg-white text-black border-2 border-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-100 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            {isGenerating ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                正在生成...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                开始生成
              </>
            )}
          </button>
          <p className="text-center text-[10px] text-gray-400 mt-3">
            消耗 1 点算力 · 预计耗时 15-30 秒
          </p>
        </div>
      </div>
    </div>
  )
}
