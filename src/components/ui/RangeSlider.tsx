"use client"
import { useId } from "react"

type Props = {
  label: string
  value: number
  onChange: (v: number) => void
  min: number
  max: number
  step?: number
}

export default function RangeSlider({ label, value, onChange, min, max, step = 1 }: Props) {
  const id = useId()
  return (
    <div className="w-full select-none">
      <div className="text-sm tracking-[0.25em] font-light text-black/60 mb-6">{label}</div>
      <div className="flex items-center gap-8">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.currentTarget.value))}
          className="w-full h-[1px] appearance-none bg-black/10 accent-black cursor-pointer hover:bg-black/20 transition-all"
        />
        <div className="text-3xl font-extralight min-w-[70px] text-right tabular-nums">{value}</div>
      </div>
    </div>
  )
}