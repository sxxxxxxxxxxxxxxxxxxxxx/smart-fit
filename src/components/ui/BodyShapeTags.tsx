"use client"
import type { BodyShape } from "@/lib/types"

type Props = { value: BodyShape; onChange: (b: BodyShape) => void }

const shapes: { key: BodyShape; label: string }[] = [
  { key: "apple", label: "APPLE" },
  { key: "pear", label: "PEAR" },
  { key: "hourglass", label: "HOURGLASS" },
  { key: "rectangle", label: "RECTANGLE" },
]

export default function BodyShapeTags({ value, onChange }: Props) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      {shapes.map((s) => (
        <button
          key={s.key}
          onClick={() => onChange(s.key)}
          className={`py-4 border-1 rounded-none text-sm tracking-[0.25em] transition-all duration-500 font-light ${
            value === s.key 
              ? "bg-black text-white border-black shadow-xl scale-[1.02]" 
              : "bg-white border-black/5 hover:border-black/20 hover:shadow-xl hover:scale-[1.01]"
          }`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}