import { NextRequest, NextResponse } from "next/server"
import { generateFlux2Dev } from "@/lib/ai"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { 
      prompt, 
      negative_prompt, // 负面提示词
      image, 
      width, 
      height, 
      num_inference_steps, 
      guidance_scale, 
      seed
    } = body || {}

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      )
    }

    // 处理多图输入：支持单个图片或图片数组
    // image 可以是字符串（单个）或数组（多个）
    const image_url = image 
      ? Array.isArray(image) 
        ? image // 已经是数组
        : [image] // 单个图片转为数组
      : undefined

    const result = await generateFlux2Dev({
      prompt,
      negative_prompt, // 传递负面提示词
      image_url,
      width,
      height,
      num_inference_steps,
      guidance_scale,
      seed
    })

    return NextResponse.json({
      success: true,
      imageUrl: result.imageUrl
    })
    
  } catch (error: unknown) {
    console.error("API Error:", error)
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error"
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}
