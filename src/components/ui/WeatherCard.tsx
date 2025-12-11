import { Sun, Droplets, Wind, Thermometer } from 'lucide-react'

interface WeatherCardProps {
  temperature: number
  city?: string
  weather?: string
  humidity?: number
  windSpeed?: string
  uvIndex?: string
  className?: string
}

/**
 * 天气卡片组件 - 参考代码中的沉浸式天气展示
 * 用于推荐页面的天气信息显示
 */
export default function WeatherCard({
  temperature,
  city = 'Shanghai',
  weather = 'Sunny',
  humidity = 45,
  windSpeed = 'NW 2',
  uvIndex = 'High',
  className = ''
}: WeatherCardProps) {
  return (
    <div className={`relative p-12 flex flex-col justify-between ${className}`}>
      {/* 温度显示 */}
      <div className="relative z-20">
        <div className="flex items-start gap-4">
          <Sun className="text-amber-300 animate-pulse drop-shadow-[0_0_15px_rgba(253,230,138,0.6)]" size={48} strokeWidth={1.5} />
          <div>
            <h1 className="text-8xl font-serif font-medium tracking-tighter mb-1 drop-shadow-lg">{temperature}°</h1>
            <div className="text-2xl font-light flex items-center gap-3 tracking-wide opacity-90">
              <span>{city}</span>
              <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_5px_white]"></div>
              <span>{weather}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 天气详情 */}
      <div className="relative z-20">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl flex justify-between max-w-lg shadow-2xl hover:bg-white/20 transition-colors cursor-default">
          {[
            { label: 'HUMIDITY', val: `${humidity}%`, icon: <Droplets size={16} className="text-blue-200"/> },
            { label: 'WIND', val: windSpeed, icon: <Wind size={16} className="text-gray-200"/> },
            { label: 'UV INDEX', val: uvIndex, icon: <Thermometer size={16} className="text-orange-200"/> },
          ].map((item, i) => (
            <div key={i} className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] uppercase opacity-70 text-white">
                {item.icon} {item.label}
              </div>
              <div className="text-2xl font-medium tracking-tight">{item.val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
