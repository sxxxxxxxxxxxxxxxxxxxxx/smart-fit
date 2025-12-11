import { NextRequest, NextResponse } from "next/server"
import { getMockOutfitImage } from "../../../lib/mockData"

// Mock 穿搭生成 API - 返回预设图片
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { context } = body
    
    // 模拟 AI 生成延迟
    await new Promise((resolve) => setTimeout(resolve, 2000))
    
    // 根据场合和天气返回 Mock 图片
    const imageUrl = getMockOutfitImage(context.occasion, context.weather)

    return NextResponse.json({ status: "success", imageUrl })
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 500 })
  }
}