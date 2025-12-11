"use client"
import { motion } from "framer-motion"
import { X } from "lucide-react"
import { useEffect } from "react"

type Props = {
  src: string
  onClose: () => void
}

export default function ImageModal({ src, onClose }: Props) {
  useEffect(() => {
    const down = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", down)
    return () => window.removeEventListener("keydown", down)
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-40 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.img
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        src={src}
        alt="outfit"
        className="max-h-full object-contain"
        onClick={(e) => e.stopPropagation()}
      />
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <X size={24} />
      </button>
    </motion.div>
  )
}