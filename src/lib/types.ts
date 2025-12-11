// 统一的类型定义文件

export type Gender = "male" | "female" | "neutral"
export type SkinTone = "fair" | "wheat" | "dark" | "porcelain" | "medium" | "tan" | "deep"
export type BodyShape = "apple" | "pear" | "hourglass" | "rectangle"
export type Weather = "sunny" | "cloudy" | "rainy"
export type Occasion = "commute" | "date" | "gym" | "street"

// 用户资料
export interface UserData {
  gender: Gender
  height: number // cm
  weight: number // kg
  chest?: number
  waist?: number
  hip?: number
  skinTone: SkinTone
  bodyShape: BodyShape
  photo?: string // base64 图片数据
}

// 推荐上下文
export interface RecommendContext {
  weather: Weather
  temperature: number // °C
  occasion: Occasion
  seasonType?: string // 色彩季型
  useWardrobe?: boolean // 是否使用衣橱数据
}

// 穿搭推荐响应
export interface OutfitResponse {
  status: "success" | "error"
  imageUrl: string
  description: string
  recommendedItems: RecommendedItem[]
  matchedWardrobeItems?: string[] // 匹配的衣橱物品 ID
  error?: string
}

// 推荐商品
export interface RecommendedItem {
  type: string
  name: string
  brand: string
  price: string
  imageUrl?: string
  purchaseLink?: string
}

// API 错误响应
export interface ApiError {
  status: "error"
  message: string
  code?: string
}

// 表单验证错误
export interface ValidationError {
  field: string
  message: string
}

// 加载状态
export type LoadingState = "idle" | "loading" | "success" | "error"
