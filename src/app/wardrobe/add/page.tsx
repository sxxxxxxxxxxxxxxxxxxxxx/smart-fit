"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload } from "lucide-react"
import NoiseLayer from "@/components/ui/NoiseLayer"
import type { ClothingItem } from "@/lib/mockData"

export default function AddClothingPage() {
  const router = useRouter()
  const [image, setImage] = useState("")
  const [name, setName] = useState("")
  const [type, setType] = useState<ClothingItem["type"]>("top")
  const [color, setColor] = useState("#FFFFFF")
  const [style, setStyle] = useState<ClothingItem["style"]>("casual")

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (!name.trim()) {
      alert("请输入衣物名称")
      return
    }

    const newItem: ClothingItem = {
      id: Date.now().toString(),
      image: image || "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400",
      name: name.trim(),
      type,
      color,
      style,
      addedAt: new Date(),
    }

    const saved = localStorage.getItem("smartfit_wardrobe")
    const items: ClothingItem[] = saved ? JSON.parse(saved) : []
    items.push(newItem)
    localStorage.setItem("smartfit_wardrobe", JSON.stringify(items))

    router.push("/wardrobe")
  }

  const types = [
    { value: "top", label: "上装" },
    { value: "bottom", label: "下装" },
    { value: "outerwear", label: "外套" },
    { value: "shoes", label: "鞋" },
    { value: "accessory", label: "配饰" },
  ] as const

  const styles = [
    { value: "casual", label: "休闲" },
    { value: "formal", label: "正式" },
    { value: "sport", label: "运动" },
    { value: "street", label: "街头" },
  ] as const

  const colorOptions = [
    { hex: "#FFFFFF", name: "白色" },
    { hex: "#000000", name: "黑色" },
    { hex: "#808080", name: "灰色" },
    { hex: "#FF0000", name: "红色" },
    { hex: "#0000FF", name: "蓝色" },
    { hex: "#FFFF00", name: "黄色" },
    { hex: "#00FF00", name: "绿色" },
    { hex: "#FFA500", name: "橙色" },
    { hex: "#FFC0CB", name: "粉色" },
    { hex: "#A52A2A", name: "棕色" },
  ]

  return (
    <div className="min-h-screen w-full bg-white text-black overflow-x-hidden">
      <NoiseLayer />

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm w-full">
        <div className="w-full flex justify-center px-8 md:px-12 py-6">
          <div className="w-full max-w-[1440px] flex justify-between items-center">
            <button onClick={() => router.back()} className="flex items-center gap-2 hover:opacity-50 transition-opacity">
              <ArrowLeft size={20} />
              <span className="font-medium">返回</span>
            </button>
            <h1 className="text-lg font-bold">添加衣物</h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      <div className="w-full flex justify-center px-8 md:px-12 py-16">
        <div className="w-full max-w-[1200px] space-y-10">
        
        {/* Image Upload */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <label className="block text-sm font-medium text-gray-600 mb-6">衣物照片</label>
          <label className="relative block w-full max-w-md mx-auto aspect-square rounded-2xl overflow-hidden bg-gray-100 cursor-pointer group hover:shadow-xl transition-all">
            {image ? (
              <img src={image} alt="Clothing" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-gray-400 group-hover:text-black transition-colors">
                <Upload size={48} />
                <span className="text-base font-medium">上传照片</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        {/* Name */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <label className="block text-sm font-medium text-gray-600 mb-4">名称</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：白色 T 恤"
            className="w-full px-6 py-4 border-2 border-gray-200 rounded-2xl text-base bg-white focus:outline-none focus:border-black transition-all"
          />
        </div>

        {/* Type */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <label className="block text-sm font-medium text-gray-600 mb-6">类型</label>
          <div className="grid grid-cols-3 gap-4">
            {types.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`py-4 rounded-2xl text-base font-medium transition-all ${
                  type === t.value
                    ? "bg-black text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 hover:border-black"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Style */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <label className="block text-sm font-medium text-gray-600 mb-6">风格</label>
          <div className="grid grid-cols-2 gap-4">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => setStyle(s.value)}
                className={`py-4 rounded-2xl text-base font-medium transition-all ${
                  style === s.value
                    ? "bg-black text-white shadow-lg"
                    : "bg-white border-2 border-gray-200 hover:border-black"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Color */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <label className="block text-sm font-medium text-gray-600 mb-6">主色调</label>
          <div className="grid grid-cols-5 gap-4">
            {colorOptions.map((c) => (
              <button
                key={c.hex}
                onClick={() => setColor(c.hex)}
                className={`w-full aspect-square rounded-2xl transition-all hover:scale-110 ${
                  color === c.hex ? "ring-4 ring-black scale-110 shadow-lg" : "hover:shadow-md"
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className="w-full py-6 bg-black text-white hover:bg-gray-800 transition-all rounded-2xl text-lg font-semibold shadow-lg hover:shadow-xl"
        >
          保存
        </button>
        </div>
      </div>
    </div>
  )
}
