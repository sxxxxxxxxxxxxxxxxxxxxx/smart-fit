# 🎨 UI 组件库使用指南

本目录包含 SmartFit 项目的可复用 UI 组件。

---

## 📦 组件列表

### 1. PageTransition

**用途:** 统一所有页面的进入动画效果

**使用方法:**
```tsx
import PageTransition from '@/components/ui/PageTransition'

export default function MyPage() {
  return (
    <PageTransition>
      <div className="...">
        {/* 你的页面内容 */}
      </div>
    </PageTransition>
  )
}
```

**Props:**
- `children: ReactNode` - 页面内容
- `className?: string` - 可选的额外类名

**效果:**
- 淡入动画 (fade-in)
- 从下方滑入 (slide-in-from-bottom-4)
- 持续时间: 700ms

---

### 2. GlassCard

**用途:** 玻璃态半透明卡片,适用于浮层信息展示

**使用方法:**
```tsx
import GlassCard from '@/components/ui/GlassCard'

<GlassCard hover={true}>
  <h3>卡片标题</h3>
  <p>卡片内容</p>
</GlassCard>
```

**Props:**
- `children: ReactNode` - 卡片内容
- `className?: string` - 可选的额外类名
- `hover?: boolean` - 是否启用悬停效果 (默认: true)

**效果:**
- 半透明背景 (bg-white/60)
- 背景模糊 (backdrop-blur-xl)
- 白色边框光晕 (border-white/20)
- 可选悬停增强效果

**应用场景:**
- 天气详情卡片
- 提示信息框
- 浮层菜单

---

### 3. WeatherCard

**用途:** 沉浸式天气信息展示,用于推荐页左侧

**使用方法:**
```tsx
import WeatherCard from '@/components/ui/WeatherCard'

<WeatherCard
  temperature={24}
  city="Shanghai"
  weather="Sunny"
  humidity={45}
  windSpeed="NW 2"
  uvIndex="High"
  className="absolute inset-0"
/>
```

**Props:**
- `temperature: number` - 温度 (必填)
- `city?: string` - 城市名 (默认: 'Shanghai')
- `weather?: string` - 天气状况 (默认: 'Sunny')
- `humidity?: number` - 湿度百分比 (默认: 45)
- `windSpeed?: string` - 风速 (默认: 'NW 2')
- `uvIndex?: string` - 紫外线指数 (默认: 'High')
- `className?: string` - 可选的额外类名

**设计特点:**
- 超大字号温度 (text-9xl)
- 玻璃态详情卡片
- 图标动画效果
- 呼吸灯阴影

---

### 4. ScenarioCard

**用途:** 场景选择卡片,用于推荐页场景选择

**使用方法:**
```tsx
import ScenarioCard from '@/components/ui/ScenarioCard'
import { Briefcase } from 'lucide-react'

<ScenarioCard
  id="commute"
  title="职场通勤"
  subtitle="Professional & Chic"
  icon={Briefcase}
  bgGradient="from-slate-50 to-slate-100"
  selected={occasion === 'commute'}
  onClick={() => setOccasion('commute')}
/>
```

**Props:**
- `id: string` - 唯一标识符
- `title: string` - 卡片标题 (中文)
- `subtitle: string` - 副标题 (英文描述)
- `icon: LucideIcon` - Lucide 图标组件
- `bgGradient: string` - Tailwind 渐变类名
- `selected: boolean` - 是否选中
- `onClick: () => void` - 点击回调

**交互效果:**
- 选中态: 黑底白字 + 缩放 + 选中勾
- 未选中: 白底 + 悬停上移
- 背景装饰: 渐变圆球模糊效果

**推荐渐变配色:**
```tsx
'from-slate-50 to-slate-100'   // 通勤 - 灰色
'from-rose-50 to-rose-100'     // 约会 - 粉色
'from-emerald-50 to-emerald-100' // 健身 - 绿色
'from-orange-50 to-orange-100'   // 街头 - 橙色
```

---

## 🎨 设计系统参考

### 间距规范
```css
gap-4   /* 16px - 小间距 */
gap-6   /* 24px - 标准间距 */
gap-8   /* 32px - 大间距 */

p-6     /* 24px - 小卡片内边距 */
p-8     /* 32px - 标准卡片内边距 */
p-10    /* 40px - 大卡片内边距 */
```

### 圆角规范
```css
rounded-xl   /* 12px - 小卡片 */
rounded-2xl  /* 16px - 标准卡片 */
rounded-3xl  /* 24px - 大卡片 */
rounded-full /* 完全圆角 - 按钮/标签 */
```

### 阴影层次
```css
shadow-sm    /* 微妙阴影 - 默认态 */
shadow-lg    /* 中等阴影 - 选中态 */
shadow-xl    /* 强阴影 - 悬停态 */
shadow-2xl   /* 超强阴影 - 聚焦态 */
```

### 动画时长
```css
duration-300  /* 300ms - 快速交互 (按钮/链接) */
duration-500  /* 500ms - 标准过渡 (卡片) */
duration-700  /* 700ms - 平滑动画 (图片缩放) */
duration-1000 /* 1s - 慢动画 (背景渐变) */
```

---

## 🔧 开发建议

### 1. 保持一致性
所有新页面都应使用 `PageTransition` 包裹,确保体验一致。

### 2. 复用优先
优先使用现有组件,避免重复造轮子。如需新组件,确保可复用性。

### 3. Props 类型化
所有组件必须定义清晰的 TypeScript 接口。

### 4. 样式可配置
通过 `className` prop 允许外部定制样式,保持组件灵活性。

---

## 🚀 快速开始示例

### 完整页面模板
```tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import PageTransition from '@/components/ui/PageTransition'
import NoiseLayer from '@/components/ui/NoiseLayer'

export default function MyPage() {
  const router = useRouter()
  const [value, setValue] = useState('')

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <NoiseLayer />
        
        {/* 你的页面内容 */}
        <main className="container mx-auto px-8 py-12">
          <h1 className="text-5xl font-serif mb-6">页面标题</h1>
          {/* ... */}
        </main>
      </div>
    </PageTransition>
  )
}
```

---

## 📝 更新日志

### v1.0.0 (2025-11-21)
- ✅ 新增 `PageTransition` 组件
- ✅ 新增 `GlassCard` 组件
- ✅ 新增 `WeatherCard` 组件
- ✅ 新增 `ScenarioCard` 组件
- ✅ 建立设计系统规范

---

**维护者:** SmartFit Team  
**最后更新:** 2025-11-21
