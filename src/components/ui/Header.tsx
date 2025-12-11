"use client"
import { Heart, Menu, ShoppingBag } from "lucide-react"

export default function Header() {
  return (
    <div className="absolute top-0 left-0 w-full h-12 flex items-center justify-between px-4 border-b border-[#e5e5e5] bg-transparent">
      <button className="rounded-none"><Menu size={20} /></button>
      <div className="flex items-center gap-4">
        <button className="rounded-none"><Heart size={20} /></button>
        <button className="rounded-none"><ShoppingBag size={20} /></button>
      </div>
    </div>
  )
}