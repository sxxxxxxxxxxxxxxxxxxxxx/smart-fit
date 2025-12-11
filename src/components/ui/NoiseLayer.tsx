"use client"

export default function NoiseLayer() {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity: 0.08,
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(0,0,0,0.06) 0, rgba(0,0,0,0.06) 1px, transparent 1px, transparent 2px)",
      }}
    />
  )
}