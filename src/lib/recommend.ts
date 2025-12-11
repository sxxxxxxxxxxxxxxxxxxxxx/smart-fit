// 推荐算法优化
// 基于用户数据、色彩季型、衣橱内容生成个性化推荐

import type { RecommendContext, RecommendedItem } from "./types"
import type { ClothingItem, SeasonType } from "./mockData"
import { getWardrobe } from "./storage"
import { getSeasonType } from "./storage"
import { mockRecommendedProducts } from "./mockData"

// 根据温度推荐服装厚度
export function getThicknessByTemperature(temp: number): "thin" | "medium" | "thick" {
  if (temp < 10) return "thick"
  if (temp < 20) return "medium"
  return "thin"
}

// 根据场合推荐风格
export function getStyleByOccasion(occasion: string): string[] {
  const styles: Record<string, string[]> = {
    commute: ["formal", "casual"],
    date: ["formal", "casual"],
    gym: ["sport"],
    street: ["street", "casual"],
  }
  return styles[occasion] || ["casual"]
}

// 根据色彩季型推荐颜色
export function getColorsBySeasonType(seasonType: SeasonType | null): string[] {
  if (!seasonType) return []
  return seasonType.recommendColors.map((c) => c.hex)
}

// 从衣橱中匹配推荐
export function matchWardrobeItems(
  context: RecommendContext,
  wardrobe: ClothingItem[]
): ClothingItem[] {
  const thickness = getThicknessByTemperature(context.temperature)
  const styles = getStyleByOccasion(context.occasion)
  const seasonColors = getColorsBySeasonType(getSeasonType())

  return wardrobe.filter((item) => {
    // 风格匹配
    const styleMatch = styles.includes(item.style)

    // 类型匹配（根据场合）
    let typeMatch = true
    if (context.occasion === "gym") {
      typeMatch = item.type === "top" || item.type === "bottom" || item.type === "shoes"
    } else if (context.occasion === "commute") {
      typeMatch = item.type !== "shoes" || item.style === "formal"
    }

    // 颜色匹配（如果有色彩季型）
    let colorMatch = true
    if (seasonColors.length > 0) {
      // 简化：检查颜色是否在推荐色系中（这里可以更精确）
      colorMatch = true // 实际应该比较颜色相似度
    }

    return styleMatch && typeMatch && colorMatch
  })
}

// 生成推荐商品列表
export function generateRecommendedItems(
  context: RecommendContext,
  matchedWardrobe: ClothingItem[]
): RecommendedItem[] {
  const thickness = getThicknessByTemperature(context.temperature)
  const styles = getStyleByOccasion(context.occasion)

  // 根据已有衣橱，推荐补充单品
  const wardrobeTypes = new Set(matchedWardrobe.map((item) => item.type))
  const neededTypes = ["top", "bottom", "outerwear", "shoes", "accessory"].filter(
    (type) => !wardrobeTypes.has(type)
  )

  // 从 Mock 数据中筛选
  let recommended = mockRecommendedProducts.filter((item) => {
    // 根据类型需求筛选
    const typeNeeded = neededTypes.some((type) => {
      const typeMap: Record<string, string> = {
        top: "上装",
        bottom: "下装",
        outerwear: "外套",
        shoes: "鞋",
        accessory: "配饰",
      }
      return item.type === typeMap[type]
    })

    return typeNeeded || neededTypes.length === 0
  })

  // 限制数量
  return recommended.slice(0, 6)
}

// 生成推荐描述
export function generateRecommendDescription(
  context: RecommendContext,
  matchedCount: number
): string {
  const occasionNames: Record<string, string> = {
    commute: "通勤",
    date: "约会",
    gym: "运动",
    street: "街头",
  }

  const weatherNames: Record<string, string> = {
    sunny: "晴朗",
    cloudy: "多云",
    rainy: "雨天",
  }

  const occasion = occasionNames[context.occasion] || context.occasion
  const weather = weatherNames[context.weather] || context.weather

  let desc = `今日${occasion}穿搭 · ${context.temperature}°C ${weather}`
  if (matchedCount > 0) {
    desc += ` · 已匹配 ${matchedCount} 件衣橱单品`
  }

  return desc
}

// 完整的推荐生成函数
export function generateRecommendation(context: RecommendContext): {
  matchedWardrobe: ClothingItem[]
  recommendedItems: RecommendedItem[]
  description: string
} {
  const wardrobe = context.useWardrobe ? getWardrobe() : []
  const matchedWardrobe = matchWardrobeItems(context, wardrobe)
  const recommendedItems = generateRecommendedItems(context, matchedWardrobe)
  const description = generateRecommendDescription(context, matchedWardrobe.length)

  return {
    matchedWardrobe,
    recommendedItems,
    description,
  }
}

