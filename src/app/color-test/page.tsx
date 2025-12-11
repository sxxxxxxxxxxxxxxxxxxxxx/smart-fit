"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, RotateCcw, Check } from "lucide-react"
import { colorTestQuestions, calculateSeasonType } from "@/lib/mockData"
import { cn } from "@/lib/utils"

export default function ColorTestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})

  const question = colorTestQuestions[currentQuestion]
  const isLastQuestion = currentQuestion === colorTestQuestions.length - 1
  
  const handleAnswer = (value: string) => {
    setAnswers({ ...answers, [question.id]: value })
    if (!isLastQuestion) {
      setTimeout(() => setCurrentQuestion(curr => curr + 1), 300)
    } else {
      setTimeout(finishTest, 300)
    }
  }

  const finishTest = () => {
    const result = calculateSeasonType(answers)
    localStorage.setItem("smartfit_season_type", JSON.stringify(result))
    router.push("/color-result")
  }

  const progress = ((currentQuestion + 1) / colorTestQuestions.length) * 100

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      {/* Control Bar */}
      <div className="flex items-center justify-between mb-16">
        <button 
          onClick={() => currentQuestion > 0 ? setCurrentQuestion(c => c - 1) : router.back()}
          className="p-4 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all"
        >
          <ArrowLeft size={24} />
        </button>
        
        <div className="flex flex-col items-center gap-3">
           <span className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400">分析进度</span>
           <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-black" 
               initial={{ width: 0 }}
               animate={{ width: `${progress}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>
        </div>

        <button 
          onClick={() => setCurrentQuestion(0)} 
          className="p-4 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-all"
        >
          <RotateCcw size={24} />
        </button>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="text-center mb-16 space-y-6"
        >
          <span className="inline-block px-4 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500">
            问题 {currentQuestion + 1} / {colorTestQuestions.length}
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold">
            {question.question}
          </h2>
          <p className="text-xl text-gray-500 font-light">{question.description}</p>
        </motion.div>
      </AnimatePresence>

      {/* Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {question.options.map((option, idx) => {
          const isSelected = answers[question.id] === option.value
          return (
            <motion.button
              key={option.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => handleAnswer(option.value)}
              className={cn(
                "relative group h-[400px] rounded-3xl overflow-hidden border-2 text-left p-8 flex flex-col justify-end transition-all duration-300",
                isSelected 
                  ? "border-black bg-black text-white" 
                  : "border-transparent bg-white hover:border-gray-200 shadow-xl hover:shadow-2xl"
              )}
            >
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                style={{ backgroundColor: option.color }} 
              />
              
              <div className="relative z-10 space-y-2">
                <h3 className="text-2xl font-bold">{option.label}</h3>
                {isSelected && (
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 bg-white text-black p-2 rounded-full"
                  >
                    <Check size={20} />
                  </motion.div>
                )}
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
