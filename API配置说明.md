# 🔧 API 配置说明

## 📋 当前配置

项目已配置使用以下 API：

- **API 模式**: OpenAI 兼容模式
- **主机 URL**: `https://api.newcoin.top`
- **模型 ID**: `doubao-seedream-4-5-251128`
- **端点**: `https://api.newcoin.top/v1/images/generations`

## 🔑 环境变量配置

### 方法 1：创建 `.env.local` 文件（推荐）

在项目根目录创建 `.env.local` 文件：

```env
# AI 图片生成 API 配置
AI_API_BASE_URL=https://api.newcoin.top
AI_API_KEY=sk-RYWUiugYYhIAinJJ0OrraSQR54cbfmJA1TVMh9jme2JRnEA6
MODEL_ID=doubao-seedream-4-5-251128
```

### 方法 2：使用代码中的默认值

如果未设置环境变量，代码会使用以下默认值：
- `AI_API_KEY`: `sk-RYWUiugYYhIAinJJ0OrraSQR54cbfmJA1TVMh9jme2JRnEA6`
- `MODEL_ID`: `doubao-seedream-4-5-251128`
- `AI_API_BASE_URL`: `https://api.newcoin.top`

## ⚠️ 重要提示

### Prompt 长度限制

- **API 限制**: 最大 10240 字符
- **代码限制**: 最大 10000 字符（留出安全边界）
- **自动处理**: 代码会自动截断超长的 prompt

### Base64 图片处理

- **不支持**: 当前 API 不支持直接传递 base64 图片数据
- **原因**: Base64 图片数据会导致 prompt 超过长度限制
- **解决方案**: 
  1. 如果图片是 base64，代码会自动跳过，不附加到 prompt
  2. 如果需要使用参考图片，请先上传到图床获取 URL

## 🐛 已修复的问题

1. ✅ **Prompt 长度限制**: 自动截断超过 10000 字符的 prompt
2. ✅ **Base64 检测**: 自动检测并跳过 base64 图片数据
3. ✅ **错误处理**: 提供更友好的错误提示
4. ✅ **API 配置**: 使用正确的 endpoint 和密钥

## 📝 使用示例

### 基本使用

```typescript
import { generateImage } from "@/lib/ai"

const result = await generateImage({
  prompt: "时尚写真，工作室灯光，高级质感",
  width: 768,
  height: 1024
})

console.log(result.imageUrl)
```

### 带参考图片（URL）

```typescript
const result = await generateImage({
  prompt: "时尚写真",
  image_url: ["https://example.com/image.jpg"], // 必须是 HTTP URL
  width: 768,
  height: 1024
})
```

## 🔍 故障排除

### 错误：提示词过长

**原因**: Prompt 超过 10000 字符限制

**解决**: 
- 缩短 prompt 描述
- 移除不必要的细节
- 代码会自动截断，但可能影响生成质量

### 错误：Base64 图片不支持

**原因**: API 不支持 base64 图片数据

**解决**:
- 将图片上传到图床（如 imgur、sm.ms 等）
- 使用图片的 HTTP URL 而不是 base64

### 错误：API 密钥无效

**原因**: 环境变量未设置或密钥错误

**解决**:
1. 检查 `.env.local` 文件是否存在
2. 确认密钥是否正确
3. 重启开发服务器（`npm run dev`）

## 📚 参考文档

- API 快捷使用教程: https://s.apifox.cn/1a6b2a5b-9228-46eb-9690-54ed5d8baed5
- OpenAI Image Generation API: https://platform.openai.com/docs/api-reference/images

