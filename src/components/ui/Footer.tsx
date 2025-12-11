import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <h3 className="font-serif text-2xl font-bold">SmartFit.</h3>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              通过 AI 驱动的推荐和虚拟试衣技术，提升您的日常穿搭品味。
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">探索</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/recommend" className="hover:text-black transition-colors">每日推荐</Link></li>
              <li><Link href="/wardrobe" className="hover:text-black transition-colors">数字衣橱</Link></li>
              <li><Link href="/virtual-tryon" className="hover:text-black transition-colors">虚拟试衣</Link></li>
              <li><Link href="/shop" className="hover:text-black transition-colors">商品推荐</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">公司</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><Link href="/about" className="hover:text-black transition-colors">关于我们</Link></li>
              <li><Link href="/careers" className="hover:text-black transition-colors">加入我们</Link></li>
              <li><Link href="/privacy" className="hover:text-black transition-colors">隐私政策</Link></li>
              <li><Link href="/terms" className="hover:text-black transition-colors">服务条款</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">关注我们</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-black transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-black transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-black transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© 2024 SmartFit Inc. 保留所有权利。</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-600">隐私</a>
            <a href="#" className="hover:text-gray-600">条款</a>
            <a href="#" className="hover:text-gray-600">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
