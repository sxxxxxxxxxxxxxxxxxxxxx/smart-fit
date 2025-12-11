// Mock 数据层 - 用于替代真实 API 调用

import type { RecommendedItem } from "./types"

// ====== 衣橱 Mock 数据 ======
export interface ClothingItem {
  id: string
  image: string
  name: string
  type: "top" | "bottom" | "outerwear" | "shoes" | "accessory"
  color: string
  style: "casual" | "formal" | "sport" | "street"
  purchaseLink?: string
  addedAt: Date
}

export const mockWardrobeItems: ClothingItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
    name: "白色基础 T 恤",
    type: "top",
    color: "#FFFFFF",
    style: "casual",
    addedAt: new Date("2025-01-15"),
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400",
    name: "黑色休闲裤",
    type: "bottom",
    color: "#000000",
    style: "casual",
    addedAt: new Date("2025-01-10"),
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400",
    name: "牛仔夹克",
    type: "outerwear",
    color: "#4A90E2",
    style: "casual",
    addedAt: new Date("2025-01-05"),
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    name: "白色运动鞋",
    type: "shoes",
    color: "#FFFFFF",
    style: "sport",
    addedAt: new Date("2025-01-20"),
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400",
    name: "条纹衬衫",
    type: "top",
    color: "#E8F4F8",
    style: "formal",
    addedAt: new Date("2025-01-18"),
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400",
    name: "黑色西装裤",
    type: "bottom",
    color: "#000000",
    style: "formal",
    addedAt: new Date("2025-01-12"),
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400",
    name: "灰色卫衣",
    type: "top",
    color: "#9E9E9E",
    style: "street",
    addedAt: new Date("2025-01-08"),
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400",
    name: "运动裤",
    type: "bottom",
    color: "#212121",
    style: "sport",
    addedAt: new Date("2025-01-25"),
  },
]

// ====== 穿搭效果图 Mock 数据 ======
export const mockOutfitImages = {
  commute_sunny: [
    "https://images.unsplash.com/photo-1548142813-c348350df52b?w=800", // Business casual woman smiling
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800", // Professional woman in blazer
    "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800", // Office wear walking
    "https://images.unsplash.com/photo-1589465885857-44ed230818f6?w=800", // Stylish commute
    "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800", // Business suit
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800", // Smart casual office
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800", // Professional man
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800", // Minimalist office
  ],
  commute_cloudy: [
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800", // Trench coat fashion
    "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800", // Cloudy day outfit
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800", // Menswear commute
    "https://images.unsplash.com/photo-1485230946086-1d99d529a763?w=800", // Overcoat style
    "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800", // Grey weather style
  ],
  commute_rainy: [
    "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=800", // Rainy day commute
    "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800", // Umbrella fashion
    "https://images.unsplash.com/photo-1620799140408-ed5341cd2431?w=800", // Raincoat style
    "https://images.unsplash.com/photo-1504194921103-f8b80cadd5e4?w=800", // Rainy street style
  ],
  date_sunny: [
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", // Floral dress
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800", // Summer dress
    "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800", // Romantic style
    "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800", // Elegant dress
    "https://images.unsplash.com/photo-1617922001439-4a2e6562f328?w=800", // Silk dress
    "https://images.unsplash.com/photo-1529139574466-a302d2052574?w=800", // Date night
  ],
  date_cloudy: [
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800", // Boho chic
    "https://images.unsplash.com/photo-1550614000-4b9519e0037a?w=800", // Cozy date outfit
    "https://images.unsplash.com/photo-1605763240004-7e93b172d754?w=800", // Evening dress
    "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800", // Romantic mood
  ],
  date_rainy: [
    "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800", // Indoor date style
    "https://images.unsplash.com/photo-1519554318711-aaf73ece0704?w=800", // Elegant coat
    "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=800", // Rainy romantic
  ],
  gym_sunny: [
    "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800", // Active wear sunny
    "https://images.unsplash.com/photo-1483721310020-03333e577078?w=800", // Running gear
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800", // Gym outfit
    "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=800", // Yoga wear
    "https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800", // Fitness model
  ],
  gym_cloudy: [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800", // Hoodie gym
    "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800", // Indoor gym
    "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?w=800", // Sportswear
  ],
  gym_rainy: [
    "https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800", // Indoor workout
    "https://images.unsplash.com/photo-1576678927484-cc907957088c?w=800", // Gym interior
  ],
  street_sunny: [
    "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800", // Street style dress
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", // Chic street
    "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800", // Men's street
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800", // Edgy street
    "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=800", // Fashion week style
    "https://images.unsplash.com/photo-1485230946086-1d99d529a763?w=800", // Coat style
  ],
  street_cloudy: [
    "https://images.unsplash.com/photo-1490367532201-b9bc1dc483f6?w=800", // Denim street
    "https://images.unsplash.com/photo-1529139574466-a302d2052574?w=800", // Urban style
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800", // Layered outfit
  ],
  street_rainy: [
    "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800", // Rainy mood
    "https://images.unsplash.com/photo-1515347619252-60a6bf4fffce?w=800", // Umbrella street
  ],
}

// ====== 商品推荐 Mock 数据 ======
export const mockRecommendedProducts: RecommendedItem[] = [
  {
    type: "上装",
    name: "纯色圆领 T 恤",
    brand: "Uniqlo",
    price: "¥79",
  },
  {
    type: "上装",
    name: "牛津纺衬衫",
    brand: "无印良品",
    price: "¥199",
  },
  {
    type: "下装",
    name: "修身直筒裤",
    brand: "优衣库",
    price: "¥199",
  },
  {
    type: "下装",
    name: "经典牛仔裤",
    brand: "Levi's",
    price: "¥399",
  },
  {
    type: "外套",
    name: "轻薄风衣",
    brand: "ZARA",
    price: "¥399",
  },
  {
    type: "外套",
    name: "棒球夹克",
    brand: "H&M",
    price: "¥299",
  },
  {
    type: "鞋",
    name: "经典小白鞋",
    brand: "Adidas",
    price: "¥499",
  },
  {
    type: "鞋",
    name: "帆布鞋",
    brand: "Converse",
    price: "¥359",
  },
  {
    type: "配饰",
    name: "简约手表",
    brand: "卡西欧",
    price: "¥299",
  },
  {
    type: "配饰",
    name: "帆布包",
    brand: "ZARA",
    price: "¥159",
  },
]

// ====== 色彩季型数据 ======
export interface SeasonType {
  id: "spring" | "summer" | "autumn" | "winter"
  name: string
  description: string
  recommendColors: Array<{ name: string; hex: string }>
  avoidColors: Array<{ name: string; hex: string }>
  characteristics: string[]
  styling: string[]
}

export const seasonTypes: Record<string, SeasonType> = {
  spring: {
    id: "spring",
    name: "春季型",
    description: "暖调+明亮，适合清新温暖的色彩",
    recommendColors: [
      { name: "珊瑚粉", hex: "#FF7F7F" },
      { name: "桃粉色", hex: "#FFB6C1" },
      { name: "浅黄色", hex: "#FFFACD" },
      { name: "嫩绿色", hex: "#90EE90" },
      { name: "驼色", hex: "#C19A6B" },
      { name: "米白色", hex: "#FFF8DC" },
    ],
    avoidColors: [
      { name: "纯黑色", hex: "#000000" },
      { name: "纯白色", hex: "#FFFFFF" },
      { name: "深灰色", hex: "#2F4F4F" },
    ],
    characteristics: ["肤色偏暖黄调", "发色浅棕或金棕", "适合金色饰品", "佩戴暖色更显气色"],
    styling: ["选择柔和明亮的暖色调", "避免过于沉重的颜色", "多用撞色搭配增加活力"],
  },
  summer: {
    id: "summer",
    name: "夏季型",
    description: "冷调+柔和，适合温柔清爽的色彩",
    recommendColors: [
      { name: "浅蓝色", hex: "#ADD8E6" },
      { name: "薰衣草紫", hex: "#E6E6FA" },
      { name: "浅粉色", hex: "#FFB6D9" },
      { name: "灰粉色", hex: "#D8BFD8" },
      { name: "烟灰色", hex: "#B0C4DE" },
      { name: "柔和白", hex: "#F5F5F5" },
    ],
    avoidColors: [
      { name: "橙色", hex: "#FFA500" },
      { name: "金色", hex: "#FFD700" },
      { name: "大红色", hex: "#DC143C" },
    ],
    characteristics: ["肤色偏粉调", "发色偏冷黑或深棕", "适合银色饰品", "佩戴冷色更显气色"],
    styling: ["选择柔和雾面的冷色调", "避免过于艳丽的颜色", "同色系搭配更显温柔"],
  },
  autumn: {
    id: "autumn",
    name: "秋季型",
    description: "暖调+沉稳，适合大地色系",
    recommendColors: [
      { name: "深棕色", hex: "#8B4513" },
      { name: "砖红色", hex: "#B22222" },
      { name: "墨绿色", hex: "#2F4F2F" },
      { name: "芥末黄", hex: "#E1AD01" },
      { name: "驼色", hex: "#C19A6B" },
      { name: "橄榄绿", hex: "#808000" },
    ],
    avoidColors: [
      { name: "粉色", hex: "#FFC0CB" },
      { name: "浅蓝色", hex: "#87CEEB" },
      { name: "荧光色", hex: "#00FF00" },
    ],
    characteristics: ["肤色偏暖黄调", "发色深棕或黑褐", "适合金色饰品", "适合成熟稳重风格"],
    styling: ["选择深沉温暖的大地色", "避免太浅或太亮的颜色", "层次搭配突显质感"],
  },
  winter: {
    id: "winter",
    name: "冬季型",
    description: "冷调+鲜明，适合高对比度色彩",
    recommendColors: [
      { name: "纯白色", hex: "#FFFFFF" },
      { name: "纯黑色", hex: "#000000" },
      { name: "宝蓝色", hex: "#0047AB" },
      { name: "酒红色", hex: "#722F37" },
      { name: "亮粉色", hex: "#FF1493" },
      { name: "银灰色", hex: "#C0C0C0" },
    ],
    avoidColors: [
      { name: "橙色", hex: "#FFA500" },
      { name: "驼色", hex: "#C19A6B" },
      { name: "浅黄色", hex: "#FFFACD" },
    ],
    characteristics: ["肤色对比度高", "发色纯黑", "适合银色饰品", "可驾驭鲜艳色彩"],
    styling: ["选择高饱和度的冷色调", "黑白配是最佳选择", "大胆使用撞色"],
  },
}

// ====== 色彩测试题目 ======
export interface ColorTestQuestion {
  id: number
  question: string
  description: string
  options: Array<{ 
    value: string; 
    label: string; 
    description?: string;
    color?: string; // 用于显示色块
    image?: string; // 用于显示图片 (Mock用色块替代)
    score: Record<string, number> 
  }>
}

export const colorTestQuestions: ColorTestQuestion[] = [
  {
    id: 1,
    question: "你的肤色偏向？",
    description: "观察手腕内侧血管颜色",
    options: [
      { value: "warm", label: "暖调 (偏黄)", description: "血管呈绿色/橄榄色", color: "#F5E6C8", score: { spring: 2, autumn: 2, summer: 0, winter: 0 } },
      { value: "cool", label: "冷调 (偏粉)", description: "血管呈蓝色/紫色", color: "#FBE0DD", score: { spring: 0, autumn: 0, summer: 2, winter: 2 } },
      { value: "neutral", label: "中性", description: "蓝绿血管均有", color: "#EAD7C5", score: { spring: 1, autumn: 1, summer: 1, winter: 1 } },
    ],
  },
  {
    id: 2,
    question: "你的自然发色是？",
    description: "未染发时的原生发色",
    options: [
      { value: "black", label: "纯黑色", color: "#1A1A1A", score: { spring: 0, autumn: 0, summer: 1, winter: 3 } },
      { value: "dark_brown", label: "深棕色", color: "#4A3B2A", score: { spring: 0, autumn: 2, summer: 1, winter: 1 } },
      { value: "brown", label: "棕色", color: "#8B5A2B", score: { spring: 1, autumn: 2, summer: 1, winter: 0 } },
      { value: "light_brown", label: "浅棕/金棕色", color: "#C69C6D", score: { spring: 3, autumn: 1, summer: 0, winter: 0 } },
    ],
  },
  {
    id: 3,
    question: "你佩戴哪种饰品更显气色？",
    description: "对比金色和银色对肤色的影响",
    options: [
      { value: "gold", label: "金色", description: "气色更好，不显暗沉", color: "#D4AF37", score: { spring: 2, autumn: 2, summer: 0, winter: 0 } },
      { value: "silver", label: "银色", description: "肤色更亮，不显苍白", color: "#C0C0C0", score: { spring: 0, autumn: 0, summer: 2, winter: 2 } },
      { value: "both", label: "都可以", description: "两者效果都不错", color: "#E5E4E2", score: { spring: 1, autumn: 1, summer: 1, winter: 1 } },
    ],
  },
  {
    id: 4,
    question: "穿纯白色 vs 米白色，哪个更适合？",
    description: "观察面部是否发灰或更精神",
    options: [
      { value: "pure_white", label: "纯白色", color: "#FFFFFF", score: { spring: 0, autumn: 0, summer: 1, winter: 3 } },
      { value: "ivory", label: "米白色", color: "#FFF8DC", score: { spring: 3, autumn: 2, summer: 0, winter: 0 } },
      { value: "similar", label: "差不多", color: "#F2F2F2", score: { spring: 1, autumn: 1, summer: 2, winter: 1 } },
    ],
  },
  {
    id: 5,
    question: "你更适合以下哪种颜色？",
    description: "选择让你看起来最有活力的色系",
    options: [
      { value: "bright", label: "明亮鲜艳", description: "高饱和度色彩", color: "#FF4081", score: { spring: 2, autumn: 0, summer: 0, winter: 2 } },
      { value: "soft", label: "柔和淡雅", description: "低饱和度莫兰迪色", color: "#B0C4DE", score: { spring: 1, autumn: 0, summer: 3, winter: 0 } },
      { value: "deep", label: "深沉浓郁", description: "大地色或深色系", color: "#8B4513", score: { spring: 0, autumn: 3, summer: 0, winter: 1 } },
    ],
  },
]

// ====== 工具函数 ======

// 根据场合和天气获取穿搭图片
export function getMockOutfitImage(occasion: string, weather: string): string {
  const key = `${occasion}_${weather}` as keyof typeof mockOutfitImages
  const images = mockOutfitImages[key] || mockOutfitImages.commute_sunny
  
  // Randomly select one image from the array
  if (Array.isArray(images)) {
    return images[Math.floor(Math.random() * images.length)]
  }
  
  return images as unknown as string
}

// 计算色彩测试结果
export function calculateSeasonType(answers: Record<number, string>): SeasonType {
  const scores: Record<string, number> = {
    spring: 0,
    summer: 0,
    autumn: 0,
    winter: 0,
  }

  colorTestQuestions.forEach((q) => {
    const answer = answers[q.id]
    const option = q.options.find((opt) => opt.value === answer)
    if (option) {
      Object.entries(option.score).forEach(([season, score]) => {
        scores[season] += score
      })
    }
  })

  const maxScore = Math.max(...Object.values(scores))
  const resultSeason = Object.entries(scores).find(([_, score]) => score === maxScore)?.[0] || "spring"

  return seasonTypes[resultSeason]
}

// 根据季型推荐商品
export function getRecommendedProductsBySeasonType(seasonType: string): RecommendedItem[] {
  // 简化版：返回所有商品
  // 实际应根据季型推荐不同颜色的商品
  return mockRecommendedProducts
}
