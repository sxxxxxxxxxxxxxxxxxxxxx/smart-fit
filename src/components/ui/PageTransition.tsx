import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * 页面过渡动画容器
 * 统一所有页面的进入动画效果
 */
export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  return (
    <div className={`animate-in fade-in slide-in-from-bottom-4 duration-700 h-full w-full overflow-hidden ${className}`}>
      {children}
    </div>
  )
}
