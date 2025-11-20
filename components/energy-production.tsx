"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EnergyProductionProps {
  data: any[]
}

export function EnergyProduction({ data }: EnergyProductionProps) {
  const [mounted, setMounted] = useState(false)
  const [view, setView] = useState<"daily" | "monthly">("daily")

  // Ensure chart renders only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fallback data if none provided
  const dailyData = data?.length
    ? data
    : [
        { hour: "6 AM", production: 0.2, predicted: 0.2 },
        { hour: "8 AM", production: 1.5, predicted: 1.4 },
        { hour: "10 AM", production: 2.8, predicted: 2.5 },
        { hour: "12 PM", production: 3.5, predicted: 3.2 },
        { hour: "2 PM", production: 3.2, predicted: 3.0 },
        { hour: "4 PM", production: 2.1, predicted: 2.0 },
        { hour: "6 PM", production: 0.8, predicted: 0.7 },
      ]

  const monthlyData = [
    { month: "Jan", production: 180, predicted: 170 },
    { month: "Feb", production: 200, predicted: 190 },
    { month: "Mar", production: 250, predicted: 240 },
    { month: "Apr", production: 280, predicted: 270 },
    { month: "May", production: 310, predicted: 300 },
    { month: "Jun", production: 350, predicted: 330 },
    { month: "Jul", production: 370, predicted: 360 },
    { month: "Aug", production: 360, predicted: 350 },
    { month: "Sep", production: 320, predicted: 310 },
    { month: "Oct", production: 280, predicted: 270 },
    { month: "Nov", production: 220, predicted: 210 },
    { month: "Dec", production: 190, predicted: 180 },
  ]

  const chartData = view === "daily" ? dailyData : monthlyData
  const xKey = view === "daily" ? "hour" : "month"

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[400px] bg-gray-50 rounded-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">Energy Production</h3>
          <p className="text-sm text-gray-500">
            {view === "daily" ? "Today's energy production by hour" : "This year's energy production by month"}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("daily")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "daily" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-3 py-1 text-sm rounded-md ${
              view === "monthly" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100 text-gray-800"
            }`}
          >
            Monthly
          </button>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <XAxis dataKey={xKey} />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="production"
              name={view === "daily" ? "Production (kWh)" : "Production (kWh)"}
              fill="#fbbf24"
              radius={[4, 4, 0, 0]}
            />
            <Bar dataKey="predicted" name="Predicted" fill="#94a3b8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{view === "daily" ? "14.1 kWh" : "3,110 kWh"}</div>
            <p className="text-xs text-green-600">+8% vs predicted</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Peak Production</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{view === "daily" ? "3.5 kW" : "370 kWh"}</div>
            <p className="text-xs text-gray-500">{view === "daily" ? "at 12 PM" : "in July"}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">94%</div>
            <p className="text-xs text-green-600">+6% with AI tracking</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
