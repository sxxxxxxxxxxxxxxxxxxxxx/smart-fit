import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { prompt, weather, occasion } = await req.json()
    const key = process.env.OPENAI_API_KEY
    if (!key) throw new Error("Missing OPENAI_API_KEY")

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content:
              "你是时尚编辑，用中文写 60 字以内的穿搭点评，风格简洁高级。",
          },
          {
            role: "user",
            content: `天气${weather}，场合${occasion}，提示词：${prompt}`,
          },
        ],
        max_tokens: 90,
        temperature: 0.7,
      }),
    })
    const json = await res.json()
    const description = json.choices?.[0]?.message?.content?.trim() ?? "今日穿搭已为您准备好。"
    return NextResponse.json({ description })
  } catch (e: any) {
    return NextResponse.json({ description: "今日穿搭已为您准备好。" })
  }
}