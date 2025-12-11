"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { 
  Sun, Cloud, CloudRain, Wind, 
  Briefcase, Heart, Dumbbell, Coffee,
  Sparkles, Thermometer, Calendar, RefreshCw
} from "lucide-react"
import { getMockOutfitImage } from "@/lib/mockData"
import { generateRecommendation } from "@/lib/recommend"
import { getPreferences, savePreferences } from "@/lib/storage"
import { cn } from "@/lib/utils"
import type { Occasion, Weather, RecommendContext } from "@/lib/types"

const scenarios = [
  { id: 'commute' as Occasion, label: '通勤', icon: Briefcase },
  { id: 'date' as Occasion, label: '约会', icon: Heart },
  { id: 'gym' as Occasion, label: '运动', icon: Dumbbell },
  { id: 'street' as Occasion, label: '休闲', icon: Coffee },
]

export default function RecommendPage() {
  const [loading, setLoading] = useState(false)
  const [weather] = useState<Weather>("sunny")
  const [temperature] = useState(24)
  const [occasion, setOccasion] = useState<Occasion>("commute")
  const [outfitImage, setOutfitImage] = useState("")
  const [recommendation, setRecommendation] = useState<any>(null)

  useEffect(() => {
    handleGenerate()
  }, []) // Generate on mount

  const handleGenerate = async () => {
    setLoading(true)
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const context: RecommendContext = {
      weather,
      temperature,
      occasion,
      useWardrobe: false,
    }
    const rec = generateRecommendation(context)
    setRecommendation(rec)
    setOutfitImage(getMockOutfitImage(occasion, weather))
    setLoading(false)
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Context & Controls */}
        <div className="lg:col-span-4 space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
          >
            <h1 className="font-serif text-4xl font-bold">每日穿搭</h1>
            <p className="text-gray-500">为您今天的日程量身定制。</p>
          </motion.div>

          {/* Weather Widget */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 bg-white rounded-2xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] flex items-center justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-gray-500 mb-1">
                <Calendar size={14} className="text-black" />
                <span className="text-xs font-bold uppercase tracking-wider text-black">今天</span>
              </div>
              <div className="text-4xl font-bold flex items-start text-black">
                {temperature}°
                <span className="text-xl text-gray-400 font-normal mt-1">C</span>
              </div>
              <div className="text-sm text-gray-600 font-medium capitalize mt-1">
                {weather === 'sunny' ? '晴朗舒适' : weather === 'rainy' ? '下雨' : weather === 'cloudy' ? '多云转晴' : '大风'}
              </div>
            </div>
            <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center shadow-lg transform rotate-12">
              <Sun size={32} />
            </div>
          </motion.div>

          {/* Occasion Selector */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">场合</h3>
            <div className="grid grid-cols-2 gap-3">
              {scenarios.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setOccasion(s.id)}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200",
                    occasion === s.id 
                      ? "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[-2px] translate-y-[-2px] font-extrabold ring-1 ring-black" 
                      : "bg-white text-gray-400 border-gray-200 hover:border-gray-400 hover:text-gray-600"
                  )}
                >
                  <s.icon size={24} className={cn("mb-2 transition-transform", occasion === s.id ? "scale-110 stroke-[2.5px]" : "stroke-[1.5px]")} />
                  <span className={cn("text-sm", occasion === s.id ? "font-extrabold" : "font-medium")}>{s.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-4 bg-white text-black border-2 border-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin" />
                生成中...
              </>
            ) : (
              <>
                <Sparkles size={18} />
                刷新推荐
              </>
            )}
          </motion.button>
        </div>

        {/* Right Column: Recommendation Card */}
        <div className="lg:col-span-8">
          <motion.div
            key={occasion} // Animate when occasion changes
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden group shadow-2xl"
          >
             {/* Background Image */}
             {outfitImage && (
               <div className="absolute inset-0">
                 <img 
                   src={outfitImage} 
                   alt="Outfit" 
                   className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" />
               </div>
             )}

             {/* Content Overlay */}
             <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end text-white">
                <div className="space-y-6 max-w-lg">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                      匹配度: 98%
                    </span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider border border-white/10">
                      {scenarios.find(s => s.id === occasion)?.label}
                    </span>
                  </div>

                  <h2 className="font-serif text-4xl md:text-5xl leading-tight">
                    {recommendation?.reason || "为您今天的行程完美搭配。"}
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-4 pt-4">
                     {recommendation?.items?.map((item: string, i: number) => (
                       <div key={i} className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg border border-white/10">
                         <div className="w-2 h-2 bg-white rounded-full" />
                         <span className="text-sm font-medium">{item}</span>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
