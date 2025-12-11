// 统一的数据存储工具类
// 提供类型安全、错误处理、数据验证

import type { UserData } from "./types"
import type { SeasonType, ClothingItem } from "./mockData"

const STORAGE_KEYS = {
  USER_PROFILE: "smartfit_user_profile",
  SEASON_TYPE: "smartfit_season_type",
  WARDROBE: "smartfit_wardrobe",
  PREFERENCES: "smartfit_preferences",
  RECOMMEND_HISTORY: "smartfit_recommend_history",
} as const

// ====== 用户资料存储 ======
export function saveUserProfile(data: UserData & { photo?: string }): void {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save user profile:", error)
    throw new Error("保存用户资料失败，请检查浏览器存储空间")
  }
}

export function getUserProfile(): (UserData & { photo?: string }) | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE)
    if (!data) return null
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to load user profile:", error)
    return null
  }
}

export function hasUserProfile(): boolean {
  return getUserProfile() !== null
}

// ====== 色彩季型存储 ======
export function saveSeasonType(data: SeasonType): void {
  try {
    localStorage.setItem(STORAGE_KEYS.SEASON_TYPE, JSON.stringify(data))
  } catch (error) {
    console.error("Failed to save season type:", error)
    throw new Error("保存色彩季型失败")
  }
}

export function getSeasonType(): SeasonType | null {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEASON_TYPE)
    if (!data) return null
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to load season type:", error)
    return null
  }
}

// ====== 衣橱存储 ======
export function saveWardrobe(items: ClothingItem[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WARDROBE, JSON.stringify(items))
  } catch (error) {
    console.error("Failed to save wardrobe:", error)
    throw new Error("保存衣橱失败，请检查浏览器存储空间")
  }
}

export function getWardrobe(): ClothingItem[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WARDROBE)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to load wardrobe:", error)
    return []
  }
}

export function addWardrobeItem(item: ClothingItem): void {
  const items = getWardrobe()
  items.push(item)
  saveWardrobe(items)
}

export function removeWardrobeItem(itemId: string): void {
  const items = getWardrobe()
  const filtered = items.filter((item) => item.id !== itemId)
  saveWardrobe(filtered)
}

export function updateWardrobeItem(itemId: string, updates: Partial<ClothingItem>): void {
  const items = getWardrobe()
  const index = items.findIndex((item) => item.id === itemId)
  if (index !== -1) {
    items[index] = { ...items[index], ...updates }
    saveWardrobe(items)
  }
}

// ====== 用户偏好设置 ======
export interface UserPreferences {
  colorAnalysis: boolean
  useWardrobe: boolean
  tempControl: boolean
  autoRecommend: boolean
  notifications: boolean
}

const DEFAULT_PREFERENCES: UserPreferences = {
  colorAnalysis: true,
  useWardrobe: true,
  tempControl: true,
  autoRecommend: false,
  notifications: true,
}

export function savePreferences(prefs: Partial<UserPreferences>): void {
  try {
    const current = getPreferences()
    const updated = { ...current, ...prefs }
    localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(updated))
  } catch (error) {
    console.error("Failed to save preferences:", error)
  }
}

export function getPreferences(): UserPreferences {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PREFERENCES)
    if (!data) return DEFAULT_PREFERENCES
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(data) }
  } catch (error) {
    console.error("Failed to load preferences:", error)
    return DEFAULT_PREFERENCES
  }
}

// ====== 推荐历史 ======
export interface RecommendHistory {
  id: string
  occasion: string
  weather: string
  temperature: number
  imageUrl: string
  description: string
  createdAt: string
}

export function saveRecommendHistory(history: RecommendHistory): void {
  try {
    const histories = getRecommendHistories()
    histories.unshift(history)
    // 只保留最近 20 条
    const limited = histories.slice(0, 20)
    localStorage.setItem(STORAGE_KEYS.RECOMMEND_HISTORY, JSON.stringify(limited))
  } catch (error) {
    console.error("Failed to save recommend history:", error)
  }
}

export function getRecommendHistories(): RecommendHistory[] {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.RECOMMEND_HISTORY)
    if (!data) return []
    return JSON.parse(data)
  } catch (error) {
    console.error("Failed to load recommend history:", error)
    return []
  }
}

// ====== 清除所有数据 ======
export function clearAllData(): void {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key)
    })
  } catch (error) {
    console.error("Failed to clear data:", error)
  }
}

// ====== 检查存储空间 ======
export function checkStorageAvailable(): boolean {
  try {
    const test = "__storage_test__"
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}

