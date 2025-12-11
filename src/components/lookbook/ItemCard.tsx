"use client"
type OutfitItem = { id: string; name: string; price: number; imageUrl: string }

export default function ItemCard({ item, added, onAdd }: { item: OutfitItem; added: boolean; onAdd: (id: string) => void }) {
  return (
    <button
      onClick={() => onAdd(item.id)}
      className="snap-start rounded-none border-1 bg-white/70 backdrop-blur-sm px-3 py-2 flex flex-col items-center min-w-[96px]"
    >
      <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-contain" />
      <div className="mt-2 text-xs">{item.name}</div>
      <div className="text-[11px] text-black/70">¥{item.price}</div>
      {added && <div className="mt-1 text-[11px] underline">加入购物车</div>}
    </button>
  )
}