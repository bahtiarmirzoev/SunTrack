"use client"

import { useEffect, useState } from "react"
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, RotateCw, CheckCircle, AlertCircle } from "lucide-react"

interface PanelStatusProps {
  data: any
}

export function PanelStatus({ data }: PanelStatusProps) {
  const [mounted, setMounted] = useState(false)

  // Ensure component renders only on client
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fallback data if none provided
  const statusData =
    data && Object.keys(data).length
      ? data
      : {
          horizontalAngle: 135,
          verticalAngle: 45,
          tracking: "active",
          lastAdjustment: "10 minutes ago",
          systemHealth: "optimal",
          motorStatus: "operational",
          sensorStatus: "operational",
          nextMaintenance: "45 days",
          alerts: [],
        }

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-[300px] bg-gray-50 rounded-md">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">Current Panel Orientation</h3>

          <div className="flex justify-center mb-6">
            <div className="relative w-48 h-48 bg-gray-200 rounded-full flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-32 h-8 bg-blue-500 rounded-md transform"
                  style={{
                    transform: `rotate(${statusData.horizontalAngle}deg) skew(${statusData.verticalAngle}deg)`,
                  }}
                ></div>
              </div>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ArrowUp className="h-6 w-6 text-gray-500" />
              </div>
              <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2">
                <ArrowRight className="h-6 w-6 text-gray-500" />
              </div>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2">
                <ArrowDown className="h-6 w-6 text-gray-500" />
              </div>
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <ArrowLeft className="h-6 w-6 text-gray-500" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Sun className="h-8 w-8 text-yellow-500" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-500">Horizontal Angle</p>
              <p className="text-lg font-medium">{statusData.horizontalAngle}°</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vertical Angle</p>
              <p className="text-lg font-medium">{statusData.verticalAngle}°</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tracking Status</p>
              <div className="flex items-center justify-center gap-1">
                <RotateCw className="h-4 w-4 text-green-500" />
                <p className="text-lg font-medium capitalize">{statusData.tracking}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Adjustment</p>
              <p className="text-lg font-medium">{statusData.lastAdjustment}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-medium mb-4">System Health</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>System Status</span>
              </div>
              <span className="font-medium capitalize">{statusData.systemHealth}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Motor Status</span>
              </div>
              <span className="font-medium capitalize">{statusData.motorStatus}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>Sensor Status</span>
              </div>
              <span className="font-medium capitalize">{statusData.sensorStatus}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded-md">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-yellow-500" />
                <span>Next Maintenance</span>
              </div>
              <span className="font-medium">{statusData.nextMaintenance}</span>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">System Alerts</h4>
            {statusData.alerts && statusData.alerts.length > 0 ? (
              <div className="space-y-2">
                {statusData.alerts.map((alert: any, index: number) => (
                  <div key={index} className="p-2 bg-red-50 text-red-700 rounded-md text-sm">
                    {alert.message}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-2 bg-green-50 text-green-700 rounded-md text-sm">
                No active alerts. System operating normally.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function Sun({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}
