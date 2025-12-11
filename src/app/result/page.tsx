"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import ImageModal from "../../components/ui/ImageModal"
import SaveShare from "../../components/ui/SaveShare"
import NoiseLayer from "../../components/ui/NoiseLayer"
import { mockRecommendedProducts, mockWardrobeItems } from "../../lib/mockData"

function ResultContent() {
  const search = useSearchParams()
  const router = useRouter()
  const [img, setImg] = useState("")
  const [desc, setDesc] = useState("")
  const [modal, setModal] = useState(false)
  const [seasonType, setSeasonType] = useState<any>(null)

  useEffect(() => {
    const imageUrl = search.get("img") ?? "/models/fallback.svg"
    const description = search.get("desc") ?? "今日穿搭已为您准备好。"
    setImg(imageUrl)
    setDesc(description)

    const saved = localStorage.getItem("smartfit_season_type")
    if (saved) {
      setSeasonType(JSON.parse(saved))
    }
  }, [search])

  return (
    <div className="min-h-screen w-full bg-white text-black overflow-x-hidden">
      <NoiseLayer />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm w-full">
        <div className="w-full flex justify-center px-8 md:px-12 py-6">
          <div className="w-full max-w-[1440px] flex justify-between items-center">
            <button onClick={() => router.back()} className="flex items-center gap-2 hover:opacity-50 transition-opacity">
              <ArrowLeft size={20} />
              <span className="font-medium">返回</span>
            </button>
            <h1 className="text-lg font-bold">穿搭方案</h1>
            <div className="w-20" />
          </div>
        </div>
      </nav>

      {/* Main Image */}
      <div className="w-full flex justify-center px-8 md:px-12 py-12">
        <div className="w-full max-w-[1200px]">
        <div className="relative aspect-[9/16] max-h-[80vh] rounded-3xl overflow-hidden cursor-pointer shadow-2xl mx-auto max-w-[600px]" onClick={() => setModal(true)}>
          <img
            src={img}
            alt="outfit"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-center text-sm text-gray-400 mt-6">点击查看大图</p>
      </div>
      </div>

      {/* Details */}
      <div className="w-full flex justify-center px-8 md:px-12 pb-20">
        <div className="w-full max-w-[1200px] space-y-12">
        
        {/* Description */}
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
          <p className="text-lg leading-relaxed text-center">{desc}</p>
        </div>

        {/* Color Tips */}
        {seasonType && (
          <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-10 border border-gray-100">
            <h3 className="text-xl font-bold mb-6">色彩搭配建议</h3>
            <p className="text-gray-600 mb-6">
              根据你的<strong>{seasonType.name}</strong>特征，今日穿搭选择了：
            </p>
            <div className="flex gap-4 flex-wrap">
              {seasonType.recommendColors.slice(0, 4).map((color: any, idx: number) => (
                <div key={idx} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl shadow-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="text-sm font-medium">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Wardrobe Match */}
        <div>
          <h3 className="text-2xl font-bold mb-6">衣橱匹配</h3>
          <div className="grid grid-cols-3 gap-6">
            {mockWardrobeItems.slice(0, 3).map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <p className="font-medium text-sm mb-1 truncate">{item.name}</p>
                <span className="inline-block px-3 py-1 bg-black text-white text-xs rounded-full">
                  已拥有
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">推荐购买</h3>
            <button
              onClick={() => router.push("/shop")}
              className="text-sm underline hover:opacity-50 transition-opacity"
            >
              查看全部
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mockRecommendedProducts.slice(0, 4).map((item, idx) => (
              <a
                key={idx}
                href={`https://s.taobao.com/search?q=${encodeURIComponent(item.name)}`}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <div className="aspect-square rounded-2xl bg-gray-100 mb-3 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-${idx % 2 === 0 ? '1523381210434-271e8be1f52b' : '1551488852-0801464c9e2f'}?q=80&w=400&auto=format&fit=crop`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    alt=""
                  />
                </div>
                <p className="text-xs text-gray-400 mb-1">{item.type}</p>
                <p className="font-semibold text-sm mb-1 line-clamp-2">{item.name}</p>
                <p className="text-xs text-gray-500 mb-2">{item.brand}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">{item.price}</span>
                  <ShoppingCart size={16} className="text-gray-400" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Actions */}
        <SaveShare imageUrl={img} description={desc} />
        
        <div className="grid grid-cols-2 gap-6">
          <button
            onClick={() => router.push("/recommend")}
            className="py-4 border-2 border-gray-200 rounded-2xl hover:border-black transition-all font-medium"
          >
            重新生成
          </button>
          <button
            onClick={() => router.push("/virtual-tryon")}
            className="py-4 bg-black text-white rounded-2xl hover:bg-gray-800 transition-all font-medium"
          >
            虚拟试衣
          </button>
        </div>

      </div>
      </div>

      {modal && <ImageModal src={img} onClose={() => setModal(false)} />}
    </div>
  )
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen w-full bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-500">加载中...</p>
        </div>
      </div>
    }>
      <ResultContent />
    </Suspense>
  )
}
