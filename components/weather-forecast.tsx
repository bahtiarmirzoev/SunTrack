"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Cloud, CloudRain, Sun, CloudSun } from "lucide-react"

interface WeatherForecastProps {
  data: any[]
}

export function WeatherForecast({ data }: WeatherForecastProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure component renders only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fallback data if none provided
  const forecastData = data?.length
    ? data
    : [
        { day: "Monday", condition: "sunny", temperature: 28, precipitation: 0 },
        { day: "Tuesday", condition: "partly-cloudy", temperature: 25, precipitation: 10 },
        { day: "Wednesday", condition: "cloudy", temperature: 22, precipitation: 30 },
        { day: "Thursday", condition: "rainy", temperature: 19, precipitation: 70 },
        { day: "Friday", condition: "partly-cloudy", temperature: 23, precipitation: 20 },
      ]

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny":
        return <Sun className="h-10 w-10 text-yellow-500" />
      case "partly-cloudy":
        return <CloudSun className="h-10 w-10 text-blue-400" />
      case "cloudy":
        return <Cloud className="h-10 w-10 text-gray-400" />
      case "rainy":
        return <CloudRain className="h-10 w-10 text-blue-500" />
      default:
        return <Sun className="h-10 w-10 text-yellow-500" />
    }
  }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[200px] bg-gray-50 rounded-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
      {forecastData.map((day, index) => (
        <Card key={index} className="overflow-hidden">
          <CardContent className="p-4 text-center">
            <h3 className="font-medium mb-2">{day.day}</h3>
            <div className="flex justify-center mb-2">{getWeatherIcon(day.condition)}</div>
            <p className="text-2xl font-bold">{day.temperature}°C</p>
            <p className="text-sm text-gray-500">{day.precipitation}% precipitation</p>
            <div className="mt-2 text-xs">
              <span
                className={
                  day.condition === "sunny" || day.condition === "partly-cloudy" ? "text-green-500" : "text-red-500"
                }
              >
                {day.condition === "sunny" || day.condition === "partly-cloudy"
                  ? "Optimal for energy production"
                  : "Reduced energy production expected"}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
