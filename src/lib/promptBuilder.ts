// 专业的提示词构建器
// 针对虚拟试衣场景优化，提升生成质量

import type { ClothingItem } from "./mockData"

// 质量增强关键词 - 针对虚拟试衣场景优化
const QUALITY_TAGS = [
  "masterpiece",
  "best quality",
  "ultra detailed",
  "8k uhd",
  "high resolution",
  "photorealistic",
  "professional fashion photography",
  "studio lighting",
  "sharp focus",
  "perfect composition",
  "accurate clothing fit",
  "realistic fabric texture",
  "natural body proportions",
  "seamless integration"
]

// 负面提示词（避免不良效果）- 针对虚拟试衣场景增强
const NEGATIVE_PROMPT = [
  "lowres",
  "bad anatomy",
  "bad hands",
  "text",
  "error",
  "missing fingers",
  "extra digit",
  "fewer digits",
  "cropped",
  "worst quality",
  "low quality",
  "normal quality",
  "jpeg artifacts",
  "signature",
  "watermark",
  "username",
  "blurry",
  "bad feet",
  "bad proportions",
  "deformed",
  "disfigured",
  "mutated",
  "ugly",
  "duplicate",
  "morbid",
  "mutilated",
  "extra limbs",
  "extra arms",
  "extra legs",
  "malformed limbs",
  "fused fingers",
  "too many fingers",
  "long neck",
  "cross-eyed",
  "bad eyes",
  "out of frame",
  "cartoon",
  "3d render",
  "illustration",
  "painting",
  "drawing",
  "sketch",
  "anime",
  "manga",
  "unrealistic",
  "distorted",
  "grainy",
  "noisy",
  // 虚拟试衣专用负面词
  "floating clothes",
  "clothing not fitting",
  "unnatural clothing position",
  "clothes detached from body",
  "poor clothing integration",
  "unrealistic fabric",
  "wrong clothing size",
  "clothing distortion",
  "seam visible",
  "bad clothing fit",
  // 避免改变人物特征
  "changed face",
  "changed body shape",
  "different person",
  "face swap",
  "altered facial features",
  "modified body proportions",
  "person looks different",
  "clothing overlay",
  "clothes floating on body",
  "face changed",
  "body changed",
  "different appearance"
].join(", ")

// 根据衣物类型获取专业描述
function getClothingTypeDescription(item: ClothingItem): string {
  const typeMap: Record<string, string> = {
    top: "上装",
    bottom: "下装",
    outerwear: "外套",
    shoes: "鞋履",
    accessory: "配饰"
  }
  
  const styleMap: Record<string, string> = {
    casual: "休闲风格",
    formal: "正式风格",
    sport: "运动风格",
    street: "街头风格"
  }
  
  const typeDesc = typeMap[item.type] || item.type
  const styleDesc = styleMap[item.style] || item.style
  
  return `${typeDesc}，${styleDesc}`
}

// 构建衣物组合描述
function buildClothingDescription(items: ClothingItem[]): string {
  if (items.length === 0) return ""
  
  const descriptions = items.map(item => {
    const typeDesc = getClothingTypeDescription(item)
    return `${item.name}（${typeDesc}）`
  })
  
  return descriptions.join("，搭配")
}

// 构建场景和风格描述
function buildSceneDescription(userPrompt: string): {
  scene: string
  lighting: string
  style: string
} {
  // 从用户 prompt 中提取关键词
  const lowerPrompt = userPrompt.toLowerCase()
  
  // 场景检测
  let scene = "专业摄影棚"
  if (lowerPrompt.includes("街头") || lowerPrompt.includes("street")) {
    scene = "城市街头，现代建筑背景"
  } else if (lowerPrompt.includes("室内") || lowerPrompt.includes("indoor")) {
    scene = "室内空间，简约背景"
  } else if (lowerPrompt.includes("户外") || lowerPrompt.includes("outdoor")) {
    scene = "自然户外环境"
  } else if (lowerPrompt.includes("工作室") || lowerPrompt.includes("studio")) {
    scene = "专业摄影工作室，纯色背景"
  }
  
  // 灯光检测
  let lighting = "柔和的自然光，均匀分布"
  if (lowerPrompt.includes("柔光") || lowerPrompt.includes("soft light")) {
    lighting = "柔和的漫射光，无强烈阴影"
  } else if (lowerPrompt.includes("硬光") || lowerPrompt.includes("hard light")) {
    lighting = "戏剧性的硬光，清晰阴影"
  } else if (lowerPrompt.includes("自然光") || lowerPrompt.includes("natural")) {
    lighting = "自然日光，温暖色调"
  } else if (lowerPrompt.includes("工作室灯光") || lowerPrompt.includes("studio")) {
    lighting = "专业工作室灯光，三点布光"
  }
  
  // 风格检测
  let style = "时尚写真风格"
  if (lowerPrompt.includes("高级") || lowerPrompt.includes("luxury")) {
    style = "高端时尚大片风格"
  } else if (lowerPrompt.includes("日常") || lowerPrompt.includes("casual")) {
    style = "日常穿搭风格"
  } else if (lowerPrompt.includes("街拍") || lowerPrompt.includes("street")) {
    style = "街头时尚风格"
  }
  
  return { scene, lighting, style }
}

// 主函数：构建优化的提示词
export function buildOptimizedPrompt(
  userPrompt: string,
  clothingItems: ClothingItem[],
  userPhoto?: string
): {
  positive: string
  negative: string
} {
  // 解析场景信息
  const { scene, lighting, style } = buildSceneDescription(userPrompt)
  
  // 构建衣物描述
  const clothingDesc = buildClothingDescription(clothingItems)
  
  // 构建主体描述 - 强调虚拟试衣的核心需求
  const subjectDesc = userPhoto 
    ? "真实人物照片，必须保持原有人物的面部特征、身材比例、肤色和整体外观完全不变，只将选择的服装穿到人物身上，确保服装与人物身体完美贴合，自然融合"
    : "专业模特，自然姿态，自信表情"
  
  // 构建姿态描述
  const poseDesc = userPrompt.includes("正面") || userPrompt.includes("front")
    ? "正面全身照，自然站立姿态，双手自然下垂"
    : userPrompt.includes("侧面") || userPrompt.includes("side")
    ? "侧面全身照，展现身材轮廓"
    : "全身照，自然姿态，展现完整穿搭效果"
  
  // 组合正面提示词 - 针对虚拟试衣优化
  const positiveParts = [
    // 质量标签
    ...QUALITY_TAGS,
    // 主体 - 强调保持原人物特征
    subjectDesc,
    // 核心指令 - 虚拟试衣的关键：明确告诉 AI 要给上传图片的人物穿上选择的衣服
    userPhoto && clothingItems.length > 0 
      ? "重要指令：将选择的服装自然地穿到上传照片中的人物身上，保持人物所有原有特征（面部、身材、肤色、发型等）完全不变，只更换和添加选择的服装，确保服装与人物身体完美贴合，看起来就像人物原本就穿着这些衣服一样"
      : "",
    // 姿态
    poseDesc,
    // 衣物 - 详细描述
    clothingDesc ? `穿着：${clothingDesc}，服装完美贴合身体曲线，自然垂坠感，与人物身体无缝融合` : "",
    // 场景
    `场景：${scene}`,
    // 灯光
    `灯光：${lighting}`,
    // 风格
    `风格：${style}`,
    // 技术参数 - 虚拟试衣专用
    "全身构图，人物居中，背景虚化",
    "服装细节清晰，纹理真实，面料质感逼真",
    "色彩准确，饱和度适中，符合真实色彩",
    "专业时尚摄影，商业级质量",
    userPhoto 
      ? "人物面部、身材、肤色等所有特征与上传照片完全一致，只改变服装"
      : "服装与人物完美融合，无违和感",
    "自然阴影和高光，立体感强",
    "服装版型准确，符合人体工学，贴合身体轮廓",
    userPhoto 
      ? "确保服装看起来就像人物原本就穿着的一样，自然真实"
      : ""
  ].filter(Boolean)
  
  const positive = positiveParts.join("，")
  
  return {
    positive,
    negative: NEGATIVE_PROMPT
  }
}

// 简化版：快速构建提示词（用于兼容）
export function buildSimplePrompt(
  userPrompt: string,
  clothingItems: ClothingItem[]
): string {
  const clothingNames = clothingItems.map(item => item.name).join("、")
  
  const enhanced = [
    userPrompt.trim(),
    clothingNames ? `穿着：${clothingNames}` : "",
    "高质量，专业摄影，细节清晰"
  ].filter(Boolean).join("，")
  
  return enhanced
}
