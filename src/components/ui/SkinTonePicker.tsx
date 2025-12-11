"use client"
import type { SkinTone } from "@/lib/types"

type Props = { value: SkinTone; onChange: (s: SkinTone) => void }

const tones: { key: SkinTone; label: string; color: string }[] = [
  { key: "fair", label: "FAIR", color: "bg-rose-100" },
  { key: "wheat", label: "WHEAT", color: "bg-amber-200" },
  { key: "dark", label: "DARK", color: "bg-amber-800" },
]

export default function SkinTonePicker({ value, onChange }: Props) {
  return (
    <div className="flex items-center gap-5">
      {tones.map((t) => (
        <button
          key={t.key}
          onClick={() => onChange(t.key)}
          className={`w-16 h-16 border-1 rounded-none transition-all duration-500 shadow-md hover:scale-110 ${t.color} ${
            value === t.key 
              ? "ring-2 ring-offset-4 ring-black shadow-xl scale-110" 
              : "hover:shadow-xl border-black/10 hover:border-black/30"
          }`}
          aria-label={t.label}
        />
      ))}
    </div>
  )
}