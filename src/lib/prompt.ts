import type { UserData, Context } from "./types"

export function buildPrompt(user: UserData, ctx: Context) {
  const bodyDesc =
    user.gender === "female"
      ? `a young ${user.skinTone}-skinned asian woman, height ${user.height}cm, weight ${user.weight}kg, ${user.bodyShape}-shaped body type`
      : `a young ${user.skinTone}-skinned asian man, height ${user.height}cm, weight ${user.weight}kg, ${user.bodyShape}-shaped body type`

  const tempDesc =
    ctx.temperature < 10
      ? "heavy coat, scarf, winter fashion"
      : ctx.temperature > 28
      ? "short sleeves, summer dress, breathable"
      : "light jacket, cardigan, spring outfit"

  const occasionDesc: Record<string, string> = {
    commute: "smart casual, blazer, office appropriate",
    date: "romantic, elegant, dress, charming",
    gym: "sportswear, leggings, sneakers, activewear",
    street: "trendy, loose fit, denim, oversized",
  }

  const weatherDesc: Record<string, string> = {
    sunny: "bright sunlight, clear sky",
    cloudy: "soft diffused light, overcast",
    rainy: "rain falling, wet street, holding umbrella",
  }

  const positive = `Full body shot of ${bodyDesc}, wearing stylish ${tempDesc} and ${occasionDesc[ctx.occasion]}, ${weatherDesc[ctx.weather]}, cinematic lighting, 8k resolution, realistic texture.`
  const negative = "cartoon, illustration, 3d render, deformed body, extra fingers, bad anatomy, blurry, watermark"

  return { positive, negative, aspectRatio: "9:16" as const }
}