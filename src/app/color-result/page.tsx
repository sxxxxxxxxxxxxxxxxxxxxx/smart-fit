"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Check, X, ArrowRight, Palette, Shirt } from "lucide-react"
import NoiseLayer from "@/components/ui/NoiseLayer"
import type { SeasonType } from "@/lib/mockData"

export default function ColorResultPage() {
  const router = useRouter()
  const [result, setResult] = useState<SeasonType | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("smartfit_season_type")
      if (saved) {
        setResult(JSON.parse(saved))
      } else {
        router.push("/color-test")
      }
    }
  }, [router])

  if (!result) return null

  const seasonName = result.name
  const englishName = result.id.toUpperCase()

  return (
    <div className="min-h-screen w-full bg-[#F4F4F4] text-black overflow-x-hidden">
      <NoiseLayer />

      {/* Sticky Header */}
      <nav className="sticky top-0 z-50 bg-[#F4F4F4]/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
           <span className="font-bold tracking-widest uppercase text-xs">色彩分析报告</span>
           <button onClick={() => router.push('/')} className="text-sm font-bold border-b border-black hover:opacity-50 transition-opacity">退出</button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12 pb-40">
        
        {/* Hero Section - Magazine Style */}
        <section className="relative min-h-[80vh] flex flex-col justify-center mb-20">
          {/* Giant Background Text */}
          <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black text-white leading-none select-none pointer-events-none mix-blend-difference opacity-10">
            {englishName}
          </h1>

          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
             <div>
               <div className="inline-flex items-center gap-2 px-4 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-8 shadow-lg">
                 <Palette size={14} /> 你的专属季型
               </div>
               <h2 className="text-8xl md:text-9xl font-serif font-medium mb-8 tracking-tight">{seasonName}</h2>
               <p className="text-2xl font-light text-gray-600 leading-relaxed max-w-md mb-12">
                 {result.description}
               </p>
               
               <div className="flex gap-6">
                 <button 
                   onClick={() => router.push("/wardrobe")}
                   className="bg-black text-white px-10 py-5 rounded-full font-bold text-lg flex items-center gap-3 hover:bg-gray-900 hover:scale-105 transition-all shadow-2xl"
                 >
                   进入衣橱 <ArrowRight size={20} />
                 </button>
               </div>
             </div>

             {/* Palette Preview Grid */}
             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
               {result.recommendColors.map((color, idx) => (
                 <div key={idx} className="aspect-square rounded-[2rem] relative group overflow-hidden shadow-lg cursor-pointer">
                   <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: color.hex }}></div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-[2px]">
                     <span className="bg-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">{color.name}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Deep Dive Section */}
        <section className="grid lg:grid-cols-3 gap-8">
          {/* Characteristics */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl transition-shadow duration-500">
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-100 pb-4 flex items-center gap-3">
              <span className="w-2 h-8 bg-black rounded-full"></span>
              特征分析
            </h3>
            <ul className="space-y-6">
              {result.characteristics.map((char, i) => (
                <li key={i} className="flex gap-4 items-start">
                  <span className="text-gray-200 font-serif font-bold text-2xl leading-none">0{i + 1}</span>
                  <p className="text-gray-600 leading-relaxed font-medium pt-1">{char}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Styling Tips */}
          <div className="bg-black text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 group-hover:bg-gray-700 transition-colors duration-700"></div>
             <div className="relative z-10">
               <h3 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4 flex items-center gap-3">
                 <Shirt size={24} className="text-gray-400" /> 穿搭建议
               </h3>
               <ul className="space-y-6">
                 {result.styling.map((tip, i) => (
                   <li key={i} className="flex items-start gap-4">
                     <div className="mt-1 p-1 bg-white/10 rounded-full shrink-0">
                       <Check size={12} />
                     </div>
                     <p className="text-gray-300 leading-relaxed">{tip}</p>
                   </li>
                 ))}
               </ul>
             </div>
          </div>

          {/* Avoid Colors */}
          <div className="bg-gray-100 p-10 rounded-[2.5rem] shadow-inner border border-gray-200">
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-300 pb-4 text-gray-500 flex items-center gap-3">
              <X size={24} /> 避免色系
            </h3>
            <div className="space-y-4">
              {result.avoidColors.map((color, i) => (
                <div key={i} className="flex items-center justify-between bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full shadow-inner border border-gray-100" style={{ backgroundColor: color.hex }}></div>
                    <span className="font-medium text-gray-400 line-through decoration-red-400 decoration-2">{color.name}</span>
                  </div>
                  <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center">
                    <X size={16} className="text-red-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}