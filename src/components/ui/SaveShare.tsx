"use client"
import { useState } from "react"
import { Download, Share } from "lucide-react"

type Props = {
  imageUrl: string
  description: string
}

export default function SaveShare({ imageUrl, description }: Props) {
  const [copied, setCopied] = useState(false)

  const download = async () => {
    const a = document.createElement("a")
    a.href = imageUrl
    a.download = "smartfit-outfit.png"
    a.click()
  }

  const share = async () => {
    const text = `SmartFit 今日穿搭：${description}`
    if (navigator.share) {
      try {
        await navigator.share({ title: "SmartFit", text, url: imageUrl })
      } catch {}
    } else {
      await navigator.clipboard.writeText(text + " " + imageUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={download}
        className="flex items-center justify-center gap-2 py-4 border-1 bg-white text-xs tracking-widest hover:border-black transition-all"
      >
        <Download size={16} strokeWidth={1.5} />
        保存
      </button>
      <button
        onClick={share}
        className="flex items-center justify-center gap-2 py-4 border-1 bg-white text-xs tracking-widest hover:border-black transition-all"
      >
        <Share size={16} strokeWidth={1.5} />
        {copied ? "已复制" : "分享"}
      </button>
    </div>
  )
}