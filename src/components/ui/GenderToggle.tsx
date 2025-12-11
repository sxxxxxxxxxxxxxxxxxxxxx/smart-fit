"use client"
import type { Gender } from "@/lib/types"

type Props = {
  value: Gender
  onChange: (g: Gender) => void
}

const btn = (active: boolean) =>
  `flex-1 py-4 border-1 rounded-none text-base tracking-[0.25em] transition-all duration-500 font-light ${
    active 
      ? "bg-black text-white border-black shadow-xl scale-[1.02]" 
      : "bg-white border-black/5 hover:border-black/20 hover:shadow-xl hover:scale-[1.01]"
  }`

export default function GenderToggle({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-5 w-full">
      <button onClick={() => onChange("female")} className={btn(value === "female")}>女</button>
      <button onClick={() => onChange("male")} className={btn(value === "male")}>男</button>
      <button onClick={() => onChange("neutral")} className={btn(value === "neutral")}>中性</button>
    </div>
  )
}