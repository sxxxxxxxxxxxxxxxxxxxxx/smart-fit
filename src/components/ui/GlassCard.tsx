import { ReactNode } from 'react'

interface GlassCardProps {
  children: ReactNode
  className?: string
  hover?: boolean
}

/**
 * 玻璃态卡片组件 - 借鉴参考代码的视觉效果
 * 提供半透明背景 + 模糊效果 + 边框光晕
 */
export default function GlassCard({ children, className = '', hover = true }: GlassCardProps) {
  return (
    <div 
      className={`
        bg-white/60 backdrop-blur-xl border border-white/20 
        rounded-2xl shadow-lg
        ${hover ? 'hover:bg-white/80 hover:shadow-xl transition-all duration-300' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  )
}
