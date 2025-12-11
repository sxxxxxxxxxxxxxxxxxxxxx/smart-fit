"use client"

import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { ArrowRight, Sparkles, Palette, Shirt, Camera, Star } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "每日推荐",
    description: "基于您的当地天气和日程安排，智能生成穿搭建议。",
    icon: Sparkles,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop",
    href: "/recommend",
    color: "bg-blue-50"
  },
  {
    title: "色彩诊断",
    description: "通过专业色彩诊断，发现最适合您的专属色盘。",
    icon: Palette,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    href: "/color-test",
    color: "bg-pink-50"
  },
  {
    title: "数字衣橱",
    description: "数字化管理您的所有衣物，让搭配更轻松。",
    icon: Shirt,
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop",
    href: "/wardrobe",
    color: "bg-green-50"
  },
  {
    title: "虚拟试衣",
    description: "利用生成式 AI 技术，在购买前预览上身效果。",
    icon: Camera,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    href: "/virtual-tryon",
    color: "bg-orange-50"
  },
]

export default function HomePage() {
  const router = useRouter()
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95])

  return (
    <div className="flex flex-col gap-0 bg-white">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ opacity, scale }}
          className="absolute inset-0 z-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2072&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.85]"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-black/35 pointer-events-none" />
        </motion.div>

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 border border-white/30 rounded-full text-sm font-medium tracking-wider backdrop-blur-sm mb-6">
              AI 驱动的智能造型师
            </span>
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
              提升您的 <br />
              <span className="italic font-light">日常穿搭品味</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed"
          >
            您的私人 AI 造型师，懂您的独特品味，整理您的衣橱，并为您展示下一个最佳造型。
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <button 
              onClick={() => router.push("/recommend")}
              className="btn btn-primary btn-md w-full sm:w-auto min-w-[160px]"
            >
              开始搭配
            </button>
            <button 
              onClick={() => router.push("/wardrobe")}
              className="btn btn-dark btn-md w-full sm:w-auto min-w-[160px]"
            >
              我的衣橱
            </button>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <ArrowRight className="rotate-90 w-6 h-6" />
        </motion.div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 md:px-12 max-w-8xl mx-auto w-full">
        <div className="text-center mb-20 space-y-4">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">
            智能时尚体验
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            体验一系列旨在改变您与服装互动方式的智能工具。
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => router.push(feature.href)}
              className="group relative h-[400px] md:h-[500px] overflow-hidden cursor-pointer"
            >
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 p-8 w-full text-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-white/10 backdrop-blur-md rounded-full">
                    <feature.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium tracking-wider uppercase opacity-80">
                    {feature.title}
                  </span>
                </div>
                <h3 className="font-serif text-3xl mb-3 group-hover:translate-x-2 transition-transform duration-300">
                  {feature.description.split("，")[0]}...
                </h3>
                <p className="text-white/70 max-w-md line-clamp-2 mb-4">
                  {feature.description}
                </p>
                <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
                  探索更多 <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <div className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              10k+
            </div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">已生成穿搭</p>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="space-y-2"
          >
            <div className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              500+
            </div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">支持品牌</p>
          </motion.div>
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="space-y-2"
          >
            <div className="text-5xl font-serif font-bold text-transparent bg-clip-text bg-linear-to-r from-white to-gray-400">
              98%
            </div>
            <p className="text-gray-400 text-sm tracking-widest uppercase">用户满意度</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <Star className="w-12 h-12 mx-auto text-black" fill="currentColor" />
          <h2 className="font-serif text-5xl md:text-6xl font-bold text-gray-900">
            准备好重塑您的风格了吗？
          </h2>
          <p className="text-xl text-gray-500 font-light">
            加入成千上万的用户，改变他们的日常穿搭习惯。
          </p>
          <button 
            onClick={() => router.push("/profile")}
            className="mt-8 btn btn-secondary btn-lg transform hover:-translate-y-1"
          >
            创建您的档案
          </button>
        </motion.div>
      </section>
    </div>
  )
}
