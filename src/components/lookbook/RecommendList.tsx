"use client"
import type { RecommendedItem } from "@/lib/types"

type Props = {
  items: RecommendedItem[]
}

export default function RecommendList({ items }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((it, i) => (
        <a
          key={i}
          href={`https://s.taobao.com/search?q=${encodeURIComponent(it.name)}`}
          target="_blank"
          rel="noreferrer"
          className="block border-1 rounded-none p-3 bg-white/70 backdrop-blur-sm"
        >
          <div className="text-xs font-semibold">{it.type}</div>
          <div className="text-sm mt-1">{it.name}</div>
          <div className="text-xs text-black/70 mt-1">{it.brand}</div>
          <div className="text-sm mt-2">{it.price}</div>
        </a>
      ))}
    </div>
  )
}