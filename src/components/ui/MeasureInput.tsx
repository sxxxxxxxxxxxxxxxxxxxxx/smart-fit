"use client"
import { useState } from "react"
import { estimateMeasurements } from "../../lib/body"

type Props = {
  height: number
  weight: number
  chest?: number
  waist?: number
  hip?: number
  onChange: (field: "chest" | "waist" | "hip", val?: number) => void
}

export default function MeasureInput({ height, weight, chest, waist, hip, onChange }: Props) {
  const [auto, setAuto] = useState(!chest || !waist || !hip)

  const handleToggle = () => {
    if (!auto) {
      // 清空手动输入，切回自动
      onChange("chest", undefined)
      onChange("waist", undefined)
      onChange("hip", undefined)
    }
    setAuto((v) => !v)
  }

  const est = auto ? estimateMeasurements(height, weight) : { chest, waist, hip }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm tracking-[0.25em] font-light text-black/60">三围（cm）</div>
        <button onClick={handleToggle} className="text-sm underline hover:text-black transition-colors font-light">{auto ? "手动输入" : "自动估算"}</button>
      </div>
      <div className="grid grid-cols-3 gap-5">
        <div>
          <label className="text-xs text-black/50 mb-3 block font-light">胸围</label>
          <input
            type="number"
            value={est.chest ?? ""}
            onChange={(e) => onChange("chest", Number(e.target.value))}
            disabled={auto}
            className="w-full border-1 border-black/10 px-4 py-3 text-base bg-white focus:outline-none focus:border-black transition-all disabled:bg-[#fafafa] disabled:text-black/40 font-light"
          />
        </div>
        <div>
          <label className="text-xs text-black/50 mb-3 block font-light">腰围</label>
          <input
            type="number"
            value={est.waist ?? ""}
            onChange={(e) => onChange("waist", Number(e.target.value))}
            disabled={auto}
            className="w-full border-1 border-black/10 px-4 py-3 text-base bg-white focus:outline-none focus:border-black transition-all disabled:bg-[#fafafa] disabled:text-black/40 font-light"
          />
        </div>
        <div>
          <label className="text-xs text-black/50 mb-3 block font-light">臀围</label>
          <input
            type="number"
            value={est.hip ?? ""}
            onChange={(e) => onChange("hip", Number(e.target.value))}
            disabled={auto}
            className="w-full border-1 border-black/10 px-4 py-3 text-base bg-white focus:outline-none focus:border-black transition-all disabled:bg-[#fafafa] disabled:text-black/40 font-light"
          />
        </div>
      </div>
    </div>
  )
}