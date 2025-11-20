"use client"

import { useEffect, useState } from "react"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

interface PanelChartProps {
  data: any[]
}

export function PanelChart({ data }: PanelChartProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure chart renders only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fallback data if none provided
  const chartData = data?.length
    ? data
    : [
        { time: "6:00", angle: 15, energy: 0.2 },
        { time: "8:00", angle: 30, energy: 1.5 },
        { time: "10:00", angle: 45, energy: 2.8 },
        { time: "12:00", angle: 90, energy: 3.5 },
        { time: "14:00", angle: 75, energy: 3.2 },
        { time: "16:00", angle: 45, energy: 2.1 },
        { time: "18:00", angle: 20, energy: 0.8 },
      ]

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <XAxis dataKey="time" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="angle"
            stroke="#8884d8"
            name="Panel Angle (°)"
            strokeWidth={2}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="energy"
            stroke="#82ca9d"
            name="Energy Output (kW)"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
