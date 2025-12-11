"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Plus, Search, Filter, 
  Shirt, Scissors, ShoppingBag, Footprints, Watch, LayoutGrid
} from "lucide-react"
import { mockWardrobeItems, type ClothingItem } from "@/lib/mockData"
import { cn } from "@/lib/utils"

const categories = [
  { id: 'all', label: '全部', icon: LayoutGrid },
  { id: 'top', label: '上装', icon: Shirt },
  { id: 'bottom', label: '下装', icon: Scissors },
  { id: 'outerwear', label: '外套', icon: ShoppingBag },
  { id: 'shoes', label: '鞋履', icon: Footprints },
  { id: 'accessory', label: '配饰', icon: Watch },
]

export default function WardrobePage() {
  const router = useRouter()
  const [items, setItems] = useState<ClothingItem[]>([])
  const [category, setCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem("smartfit_wardrobe")
      setItems(saved ? JSON.parse(saved) : mockWardrobeItems)
    }
  }, [])

  const filteredItems = items.filter(item => {
    const matchesCategory = category === "all" || item.type === category
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2"
        >
          <h1 className="font-serif text-5xl font-bold">我的衣橱</h1>
          <p className="text-gray-500">管理您的数字时尚资产库 ({items.length} 件单品)</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex items-center gap-4"
        >
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" size={18} />
            <input 
              type="text"
              placeholder="搜索单品..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 bg-gray-100 rounded-full text-sm font-medium w-64 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all"
            />
          </div>
          <button 
            onClick={() => router.push("/wardrobe/add")}
            className="flex items-center gap-2 px-6 py-3 bg-black text-white rounded-full text-base font-semibold tracking-wide hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            <Plus size={18} />
            添加单品
          </button>
        </motion.div>
      </div>

      {/* Category Filter */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex gap-2 overflow-x-auto pb-8 no-scrollbar"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border",
              category === c.id 
                ? "bg-black text-white border-black" 
                : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-black"
            )}
          >
            <c.icon size={16} />
            {c.label}
          </button>
        ))}
      </motion.div>

      {/* Grid */}
      <motion.div 
        layout
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <AnimatePresence>
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button className="p-2 bg-white/90 backdrop-blur rounded-full shadow-sm hover:bg-white transition-colors">
                     <Filter size={14} />
                   </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold text-gray-900 truncate pr-2">{item.name}</h3>
                  {item.season && (
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
                      {item.season === "spring" ? "春" : item.season === "summer" ? "夏" : item.season === "autumn" ? "秋" : item.season === "winter" ? "冬" : "四季"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500 capitalize">{item.type}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filteredItems.length === 0 && (
        <div className="text-center py-24 text-gray-400">
          <p>在此分类中没有找到相关单品。</p>
        </div>
      )}
    </div>
  )
}
