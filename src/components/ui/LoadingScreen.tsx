"use client"

import { motion } from "framer-motion"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center">
      <motion.div 
        className="w-16 h-16 border-4 border-gray-100 border-t-black rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <motion.p 
        className="mt-6 font-serif text-lg tracking-widest text-gray-500 animate-pulse"
      >
        加载中...
      </motion.p>
    </div>
  )
}
