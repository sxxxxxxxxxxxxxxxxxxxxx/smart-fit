"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { 
  User, Ruler, Weight, Camera, Check, ChevronRight
} from "lucide-react"
import RangeSlider from "@/components/ui/RangeSlider"
import { cn } from "@/lib/utils"
import type { Gender, SkinTone, BodyShape } from "@/lib/types"

const BODY_SHAPES = [
  { id: 'hourglass', label: '沙漏型', desc: '肩臀同宽，腰部纤细' },
  { id: 'pear', label: '梨型', desc: '臀部宽于肩部' },
  { id: 'apple', label: '苹果型', desc: '腰腹部较为圆润' },
  { id: 'rectangle', label: 'H型/直筒', desc: '肩腰臀宽度相近' },
]

const SKIN_TONES = [
  { id: 'porcelain', color: '#F7E7CE', label: '白皙' },
  { id: 'fair', color: '#F0D5BE', label: '自然偏白' },
  { id: 'medium', color: '#D6A986', label: '自然色' },
  { id: 'tan', color: '#AD805D', label: '小麦色' },
  { id: 'deep', color: '#784B2F', label: '深肤色' },
]

export default function ProfilePage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  
  // Form State
  const [gender, setGender] = useState<Gender>("female")
  const [height, setHeight] = useState(170)
  const [weight, setWeight] = useState(60)
  const [skinTone, setSkinTone] = useState<SkinTone>("fair")
  const [bodyShape, setBodyShape] = useState<BodyShape>("hourglass")
  const [photo, setPhoto] = useState<string>("")

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => setPhoto(reader.result as string)
      reader.readAsDataURL(file)
    }
  }

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
    else {
      // Save and redirect
      const userData = { gender, height, weight, skinTone, bodyShape, photo }
      localStorage.setItem("smartfit_user_profile", JSON.stringify(userData))
      router.push("/recommend")
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl font-bold mb-4">您的个人档案</h1>
        <div className="flex items-center justify-center gap-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                step >= i ? "w-8 bg-black" : "w-2 bg-gray-200"
              )}
            />
          ))}
        </div>
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl"
      >
        {step === 1 && (
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">基本信息</h2>
              <p className="text-gray-500">让我们从基础开始了解您。</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { value: 'female', label: '女性' },
                { value: 'male', label: '男性' }
              ].map((g) => (
                <button
                  key={g.value}
                  onClick={() => setGender(g.value as Gender)}
                  className={cn(
                    "p-6 rounded-2xl border transition-all text-center capitalize font-medium",
                    gender === g.value 
                      ? "bg-black text-white border-black" 
                      : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>

            <div className="space-y-8">
              <RangeSlider 
                label="身高 (CM)" 
                value={height} 
                onChange={setHeight} 
                min={140} 
                max={220} 
              />
              <RangeSlider 
                label="体重 (KG)" 
                value={weight} 
                onChange={setWeight} 
                min={30} 
                max={150} 
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">身材与肤色</h2>
              <p className="text-gray-500">帮助我们了解您的独特特征。</p>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">肤色</label>
              <div className="flex justify-between gap-2">
                {SKIN_TONES.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSkinTone(tone.id as any)}
                    className="relative group"
                  >
                    <div 
                      className={cn(
                        "w-12 h-12 rounded-full border-2 transition-all",
                        skinTone === tone.id ? "border-black scale-110" : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: tone.color }}
                    />
                    {skinTone === tone.id && (
                      <div className="absolute inset-0 flex items-center justify-center text-black/50">
                        <Check size={16} />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-sm font-bold uppercase tracking-widest text-gray-400">体型</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {BODY_SHAPES.map((shape) => (
                  <button
                    key={shape.id}
                    onClick={() => setBodyShape(shape.id as any)}
                    className={cn(
                      "p-4 rounded-xl border text-left transition-all",
                      bodyShape === shape.id
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"
                    )}
                  >
                    <div className="font-bold mb-1">{shape.label}</div>
                    <div className="text-xs opacity-70">{shape.desc}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-12">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">个人照片</h2>
              <p className="text-gray-500">上传一张照片用于虚拟试衣（可选）。</p>
            </div>

            <label className="block w-full aspect-[3/4] max-w-sm mx-auto rounded-3xl border-2 border-dashed border-gray-300 hover:border-black transition-colors cursor-pointer relative overflow-hidden bg-gray-50 group">
              {photo ? (
                <img src={photo} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                  <Camera size={48} className="mb-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">点击上传</span>
                </div>
              )}
              <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            </label>
          </div>
        )}

        <div className="mt-12 flex justify-end">
          <button
            onClick={handleNext}
            className="px-8 py-4 bg-black text-white rounded-full font-bold flex items-center gap-2 hover:bg-gray-800 transition-all hover:pr-10 group"
          >
            {step === 3 ? "完成档案" : "下一步"}
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}
