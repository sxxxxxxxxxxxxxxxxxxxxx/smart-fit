"use client"
import { useState } from "react"

type Props = {
  onClick: () => void | Promise<void>
}

export default function GenerateButton({ onClick }: Props) {
  const [loading, setLoading] = useState(false)
  return (
    <button
      disabled={loading}
      onClick={async () => {
        setLoading(true)
        await onClick()
        setLoading(false)
      }}
      className="mt-8 px-4 py-2 border-1 text-xs tracking-widest rounded-none"
    >
      {loading ? "生成中…" : "生成"}
    </button>
  )
}