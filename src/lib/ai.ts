export type GenerateImageParams = {
  prompt: string
  negative_prompt?: string // 负面提示词
  image_url?: string[]
  width?: number
  height?: number
  num_inference_steps?: number
  guidance_scale?: number
  seed?: number
}

// 限制 prompt 最大长度为 10000 字符（API 限制是 10240，留出安全边界）
const MAX_PROMPT_LENGTH = 10000

function truncatePrompt(prompt: string, maxLength: number = MAX_PROMPT_LENGTH): string {
  if (prompt.length <= maxLength) return prompt
  // 截断并添加省略标记
  return prompt.slice(0, maxLength - 3) + "..."
}

// 检查是否是 base64 图片数据
function isBase64Image(str: string): boolean {
  return str.startsWith("data:image/") || (str.length > 1000 && /^[A-Za-z0-9+/=]+$/.test(str.slice(0, 100)))
}

export async function generateImage(params: GenerateImageParams) {
  // 使用用户提供的 API 配置
  const apiKey = process.env.AI_API_KEY || "sk-RYWUiugYYhIAinJJ0OrraSQR54cbfmJA1TVMh9jme2JRnEA6"
  const modelId = process.env.MODEL_ID || "doubao-seedream-4-5-251128"
  // OpenAI 兼容模式，使用 /v1/images/generations 端点
  const baseUrl = process.env.AI_API_BASE_URL || "https://api.newcoin.top"
  const endpoint = `${baseUrl}/v1/images/generations`
  
  if (!apiKey) {
    throw new Error("Missing AI_API_KEY env")
  }

  // 处理 prompt：限制长度，避免包含 base64 图片数据
  let finalPrompt = params.prompt.trim()
  
  // 处理多图输入：用户照片 + 多个衣物图片
  if (params.image_url && params.image_url.length > 0) {
    const imageReferences: string[] = []
    
    // 分离 base64 和 URL 图片
    const base64Images: string[] = []
    const urlImages: string[] = []
    
    params.image_url.forEach((img) => {
      if (isBase64Image(img)) {
        base64Images.push(img)
      } else if (img.startsWith("http://") || img.startsWith("https://")) {
        urlImages.push(img)
      }
    })
    
    // 对于 URL 图片，可以附加到 prompt（但限制数量避免超长）
    // 最多附加 3 个 URL 图片引用
    const maxUrlRefs = 3
    urlImages.slice(0, maxUrlRefs).forEach((url, index) => {
      const ref = index === 0 
        ? `--reference_image ${url}` 
        : `--style_reference_${index} ${url}`
      imageReferences.push(ref)
    })
    
    // 如果有 base64 图片，在 prompt 中描述（因为无法直接传递）
    if (base64Images.length > 0) {
      finalPrompt = `${finalPrompt}, 参考用户上传的照片`
    }
    
    // 附加 URL 图片引用
    if (imageReferences.length > 0) {
      const appendedPrompt = `${finalPrompt} ${imageReferences.join(" ")}`
      if (appendedPrompt.length <= MAX_PROMPT_LENGTH) {
        finalPrompt = appendedPrompt
        console.log(`Appending ${imageReferences.length} image reference(s) to prompt`)
      } else {
        console.warn("Prompt would exceed length limit, skipping image references")
      }
    }
    
    // 如果有 base64 图片但无法传递，给出提示
    if (base64Images.length > 0) {
      console.warn(`${base64Images.length} base64 image(s) detected, using prompt description only`)
    }
  }
  
  // 最终截断 prompt 确保不超过限制
  finalPrompt = truncatePrompt(finalPrompt, MAX_PROMPT_LENGTH)

  // Construct payload strictly following OpenAI Image Generation API
  interface ImageGenerationPayload {
    model: string
    prompt: string
    negative_prompt?: string // 负面提示词
    n: number
    size: string
    num_inference_steps?: number
    guidance_scale?: number
    seed?: number
  }
  
  // 计算图片尺寸，确保至少 3686400 像素（API 要求）
  // 最小尺寸：1920x1920 = 3,686,400 像素
  const MIN_PIXELS = 3686400
  let finalWidth = params.width || 1920
  let finalHeight = params.height || 1920
  
  // 如果提供的尺寸不够，按比例放大
  const currentPixels = finalWidth * finalHeight
  if (currentPixels < MIN_PIXELS) {
    const scale = Math.sqrt(MIN_PIXELS / currentPixels)
    finalWidth = Math.round(finalWidth * scale)
    finalHeight = Math.round(finalHeight * scale)
    // 确保是 8 的倍数（某些模型要求）
    finalWidth = Math.ceil(finalWidth / 8) * 8
    finalHeight = Math.ceil(finalHeight / 8) * 8
  }
  
  const payload: ImageGenerationPayload = {
    model: modelId,
    prompt: finalPrompt,
    n: 1,
    size: `${finalWidth}x${finalHeight}`
  }
  
  // 添加负面提示词（如果提供）
  if (params.negative_prompt) {
    payload.negative_prompt = params.negative_prompt
  }
  
  // 如果提供了其他参数，添加到 payload（某些 API 可能支持）
  if (params.num_inference_steps) {
    payload.num_inference_steps = params.num_inference_steps
  }
  if (params.guidance_scale) {
    payload.guidance_scale = params.guidance_scale
  }
  if (params.seed) {
    payload.seed = params.seed
  }

  try {
    console.log("Submitting AI Task...", {
      model: payload.model,
      promptLength: payload.prompt.length,
      size: payload.size,
      endpoint
    })
    
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload)
    })

    if (!res.ok) {
      let errorText = ""
      try {
        errorText = await res.text()
        const errorJson = JSON.parse(errorText)
        // 提取更友好的错误信息
        if (errorJson.error?.message) {
          let errorMsg = errorJson.error.message
          
          // 尝试解析嵌套的 JSON 错误消息
          try {
            const innerError = JSON.parse(errorMsg)
            if (innerError.error?.message) {
              errorMsg = innerError.error.message
            }
          } catch {
            // 如果不是 JSON，使用原始消息
          }
          
          // 检查是否是长度错误
          if (errorMsg.includes("string_too_long") || errorMsg.includes("10240")) {
            throw new Error("提示词过长，请缩短描述内容（最大 10000 字符）")
          }
          
          // 检查是否是尺寸错误
          if (errorMsg.includes("3686400") || errorMsg.includes("image size must be at least")) {
            throw new Error("图片尺寸不符合要求，已自动调整为 1920x1920")
          }
          
          // 检查是否是参数错误
          if (errorMsg.includes("InvalidParameter") || errorMsg.includes("size")) {
            throw new Error(`图片尺寸错误：${errorMsg}`)
          }
          
          throw new Error(`API Error: ${errorMsg}`)
        }
      throw new Error(`API Submit Error: ${res.status} ${res.statusText} - ${errorText}`)
      } catch {
        // 如果解析失败，使用原始错误文本
        throw new Error(`API Submit Error: ${res.status} ${res.statusText} - ${errorText || res.statusText}`)
      }
    }

    const data = await res.json()
    
    // Standard OpenAI Response: { created: ..., data: [{ url: "..." }] }
    if (data.data && data.data.length > 0) {
        const imageUrl = data.data[0].url || data.data[0].b64_json
        if (!imageUrl) {
          throw new Error(`No image URL in response: ${JSON.stringify(data).slice(0, 200)}`)
        }
        return { imageUrl }
    } else if (data.url) {
        // 某些 API 可能直接返回 url
        return { imageUrl: data.url }
    } else {
        throw new Error(`Unknown response format: ${JSON.stringify(data).slice(0, 200)}`)
    }

  } catch (error) {
    console.error("AI Generation Error:", error)
    // 提供更友好的错误信息
    const errorMessage = error instanceof Error ? error.message : String(error)
    if (errorMessage.includes("string_too_long") || errorMessage.includes("10240")) {
      throw new Error("提示词过长，请缩短描述内容（最大 10000 字符）")
    }
    throw error
  }
}

// Backward compatibility alias
export const generateFlux2Dev = generateImage
