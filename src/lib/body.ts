// BMI 推算三围（简化版）
export function estimateMeasurements(height: number, weight: number) {
  const chest = Math.round(height * 0.54)
  const waist = Math.round(height * 0.38)
  const hip = Math.round(height * 0.54 + 2)
  return { chest, waist, hip }
}