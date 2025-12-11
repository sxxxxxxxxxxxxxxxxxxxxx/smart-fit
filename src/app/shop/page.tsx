"use client"
import { useState, useEffect, startTransition } from "react"
import { useRouter } from "next/navigation"
import { ShoppingCart, Search, Heart } from "lucide-react"
import NoiseLayer from "@/components/ui/NoiseLayer"
import { mockRecommendedProducts, type SeasonType } from "@/lib/mockData"

export default function ShopPage() {
  const router = useRouter()
  const [seasonType, setSeasonType] = useState<SeasonType | null>(null)
  const [category, setCategory] = useState<"all" | "上装" | "下装" | "外套" | "鞋" | "配饰">("all")

  useEffect(() => {
    if (typeof window === "undefined") return
    const saved = localStorage.getItem("smartfit_season_type")
    if (!saved) return
    startTransition(() => {
      setSeasonType(JSON.parse(saved))
    })
  }, [])

  const categories = ["all", "上装", "下装", "外套", "鞋", "配饰"] as const

  // 多样化商品图片池，按品类区分，避免重复
  // 使用简化的 Unsplash URL，避免参数问题
  const productImagesByType: Record<string, string[]> = {
    上装: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
      "https://images.unsplash.com/photo-1551024506-0bccd828d307",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c",
    ],
    下装: [
      "https://images.unsplash.com/photo-1542272604-787c3835535d",
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    ],
    外套: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
      "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce",
      "https://images.unsplash.com/photo-1523475472560-d2df97ec485c",
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde",
    ],
    鞋: [
      "https://images.unsplash.com/photo-1528701800489-20be9f95a7e0",
      "https://images.unsplash.com/photo-1520256862855-398228c41684",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2",
      "https://images.unsplash.com/photo-1514986888952-8cd320577b68",
    ],
    配饰: [
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    ],
  }

  const fallbackImages = [
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    "https://images.unsplash.com/photo-1509631179647-0177331693ae",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d",
  ]

  const filteredProducts = category === "all" 
    ? mockRecommendedProducts 
    : mockRecommendedProducts.filter(item => item.type === category)

  return (
    <div className="min-h-screen w-full bg-white text-black">
      <NoiseLayer />

      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-gray-100 transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <button onClick={() => router.push('/')} className="text-2xl font-black tracking-tighter hover:opacity-80 transition-opacity">SMARTFIT.</button>
            <div className="hidden md:flex gap-8 text-sm font-medium text-gray-500">
              <button className="text-black hover:text-black transition-colors">New Arrivals</button>
              <button className="hover:text-black transition-colors">Brands</button>
              <button className="hover:text-black transition-colors">Editorial</button>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="relative hidden lg:block group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-hover:text-black transition-colors" size={18} />
               <input className="bg-gray-50 hover:bg-gray-100 rounded-full pl-12 pr-6 py-3 text-sm w-72 focus:outline-none focus:ring-2 focus:ring-black/5 transition-all" placeholder="Search products..." />
            </div>
            <button className="hover:opacity-50 transition-opacity relative p-2">
              <ShoppingCart size={24} />
              <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">0</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-[1800px] mx-auto px-8 py-12 pb-32 flex flex-col lg:flex-row gap-16">
        
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-72 shrink-0 hidden lg:block sticky top-32 h-[calc(100vh-8rem)] overflow-y-auto no-scrollbar pr-4">
           <div className="mb-12">
             <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gray-900">Categories</h3>
             <div className="flex flex-col gap-4 items-start">
               {categories.map((cat) => (
                 <button
                   key={cat}
                   onClick={() => setCategory(cat)}
                   className={`text-sm transition-all duration-300 hover:translate-x-2 ${
                     category === cat ? "font-bold text-black translate-x-2" : "text-gray-500 hover:text-black"
                   }`}
                 >
                   {cat === "all" ? "View All" : cat}
                 </button>
               ))}
             </div>
           </div>

           <div className="mb-12">
             <h3 className="font-bold text-xs uppercase tracking-[0.2em] mb-8 text-gray-900">Price Range</h3>
             <div className="space-y-4">
               <label className="flex items-center gap-4 text-sm text-gray-500 hover:text-black cursor-pointer group">
                 <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center transition-colors group-hover:border-black">
                    <input type="checkbox" className="peer hidden" />
                    <div className="w-2.5 h-2.5 bg-black rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                 </div>
                 ¥0 - ¥200
               </label>
               <label className="flex items-center gap-4 text-sm text-gray-500 hover:text-black cursor-pointer group">
                 <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center transition-colors group-hover:border-black">
                    <input type="checkbox" className="peer hidden" />
                    <div className="w-2.5 h-2.5 bg-black rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                 </div>
                 ¥200 - ¥500
               </label>
               <label className="flex items-center gap-4 text-sm text-gray-500 hover:text-black cursor-pointer group">
                 <div className="w-5 h-5 border border-gray-300 rounded flex items-center justify-center transition-colors group-hover:border-black">
                    <input type="checkbox" className="peer hidden" />
                    <div className="w-2.5 h-2.5 bg-black rounded-sm opacity-0 peer-checked:opacity-100 transition-opacity"></div>
                 </div>
                 ¥500+
               </label>
             </div>
           </div>

           {seasonType && (
             <div className="p-8 bg-[#1a1a1a] text-white rounded-4xl shadow-2xl relative overflow-hidden group cursor-pointer">
               <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <h3 className="font-bold text-xs uppercase tracking-widest mb-3">Smart Pick</h3>
               <p className="text-sm text-gray-400 mb-6 font-light leading-relaxed">Curated for your <span className="text-white font-medium">{seasonType.name}</span> profile.</p>
               <button className="w-full py-3 bg-white text-black rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors">
                 Apply Filter
               </button>
             </div>
           )}
        </aside>

        {/* Mobile Filter Bar (Visible only on mobile) */}
        <div className="lg:hidden overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar flex gap-3">
           {categories.map(cat => (
             <button 
               key={cat}
               onClick={() => setCategory(cat)}
               className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap border ${
                 category === cat ? 'bg-black text-white border-black' : 'border-gray-200 text-gray-600'
               }`}
             >
               {cat === 'all' ? 'All' : cat}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        <div className="flex-1">
           <div className="flex justify-between items-end mb-12 border-b border-gray-100 pb-6">
             <h1 className="text-5xl font-serif italic tracking-tight">{category === 'all' ? 'All Products' : category}</h1>
             <span className="text-sm font-medium text-gray-400 uppercase tracking-widest">{filteredProducts.length} items</span>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
             {filteredProducts.map((item, idx) => (
               <a
                 key={idx}
                 href={`https://s.taobao.com/search?q=${encodeURIComponent(item.name)}`}
                 target="_blank"
                 rel="noreferrer"
                 className="group cursor-pointer flex flex-col gap-6"
               >
                 <div className="aspect-3/4 bg-[#F5F5F5] relative overflow-hidden rounded-2xl">
                   <img
                    src={(productImagesByType[item.type]?.[idx % productImagesByType[item.type].length]) ?? fallbackImages[idx % fallbackImages.length]}
                     alt={item.name}
                     className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                     loading="lazy"
                     onError={(e) => {
                       // 如果图片加载失败，使用备用图片
                       const target = e.target as HTMLImageElement
                       target.src = fallbackImages[0]
                     }}
                   />
                   {/* Overlay Shadow */}
                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
                   
                  <button
                    className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur rounded-full opacity-0 translate-y-4 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black hover:text-white shadow-sm"
                    aria-label="收藏商品"
                    title="收藏商品"
                  >
                     <Heart size={18} />
                   </button>
                   
                   {idx % 3 === 0 && (
                     <span className="absolute top-4 left-4 bg-black/90 backdrop-blur text-white text-[10px] font-bold px-3 py-1.5 uppercase tracking-widest rounded-full shadow-sm">
                       New Arrival
                     </span>
                   )}
                 </div>
                 
                 <div>
                   <div className="flex justify-between items-baseline mb-2">
                     <h3 className="text-base font-bold group-hover:text-gray-600 transition-colors">{item.brand}</h3>
                     <span className="text-sm font-medium bg-gray-100 px-2 py-1 rounded-md">{item.price}</span>
                   </div>
                   <p className="text-sm text-gray-500 group-hover:text-black transition-colors">{item.name}</p>
                 </div>
               </a>
             ))}
           </div>
        </div>

      </main>
    </div>
  )
}