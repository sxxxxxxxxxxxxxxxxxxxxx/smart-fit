import { LucideIcon, Check } from 'lucide-react'

interface ScenarioCardProps {
  id: string
  title: string
  subtitle: string
  icon: LucideIcon
  bgGradient: string
  selected: boolean
  onClick: () => void
}

/**
 * 场景选择卡片 - 参考代码中的场景选择交互
 * 用于推荐页面的场景选择
 */
export default function ScenarioCard({
  id,
  title,
  subtitle,
  icon: Icon,
  bgGradient,
  selected,
  onClick
}: ScenarioCardProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative p-8 rounded-[2rem] text-left border transition-all duration-500 flex flex-col gap-6 overflow-hidden
        ${selected 
          ? 'bg-gray-900 border-gray-900 text-white shadow-2xl scale-[1.02]' 
          : 'bg-white border-gray-100 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1'
        }`}
    >
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-4 rounded-2xl transition-colors ${
          selected 
            ? 'bg-white/20 text-white backdrop-blur-sm' 
            : `bg-gradient-to-br ${bgGradient} text-gray-700`
        }`}>
          <Icon size={24} />
        </div>
        {selected && (
          <div className="bg-emerald-400 rounded-full p-1 animate-in zoom-in">
            <Check size={16} className="text-black"/>
          </div>
        )}
      </div>
      
      <div className="relative z-10">
        <h3 className="font-bold text-xl mb-1">{title}</h3>
        <p className={`text-sm ${selected ? 'text-gray-300' : 'text-gray-400'}`}>{subtitle}</p>
      </div>

      {/* 背景装饰圆 */}
      <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full transition-colors duration-500 blur-3xl opacity-50 ${
        selected ? 'bg-indigo-500' : 'bg-gray-100'
      }`}></div>
    </button>
  )
}
