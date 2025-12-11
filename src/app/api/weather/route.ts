import { NextResponse } from "next/server"

// Mock 天气 API - 返回固定数据
export async function GET() {
  // 模拟网络延迟
  await new Promise((resolve) => setTimeout(resolve, 500))
  
  // 返回 Mock 天气数据
  return NextResponse.json({ 
    temperature: 22, 
    condition: "sunny" as const 
  })
}