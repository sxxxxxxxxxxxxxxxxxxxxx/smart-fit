"use client"
import { useEffect, useState } from "react"

type Props = {
  onData: (temp: number, condition: "sunny" | "cloudy" | "rainy") => void
}

export default function WeatherFetch({ onData }: Props) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch("/api/weather")
        const json = await res.json()
        onData(json.temperature, json.condition)
      } catch {
        // fallback
        onData(22, "sunny")
      } finally {
        setLoading(false)
      }
    }
    fetchWeather()
  }, [onData])

  return loading ? (
    <div className="text-xs text-black/50">定位中…</div>
  ) : null
}