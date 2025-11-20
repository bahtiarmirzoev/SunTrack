"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, ArrowUpDown, Thermometer, Droplets, Battery, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PanelChart } from "@/components/panel-chart"
import { WeatherForecast } from "@/components/weather-forecast"
import { EnergyProduction } from "@/components/energy-production"
import { PanelStatus } from "@/components/panel-status"
import { SolarCalculator } from "@/components/solar-calculator"

type PanelData = {
  temperature: number
  performanceData: any[]
  [key: string]: any
}

type WeatherData = {
  humidity: number
  forecast: any[]
  [key: string]: any
}

type EnergyData = {
  currentOutput: number
  batteryLevel: number
  productionData: any[]
  [key: string]: any
}

export default function Dashboard() {
  const [panelData, setPanelData] = useState<PanelData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [energyData, setEnergyData] = useState<EnergyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Dashboard", href: "/dashboard", active: true },
    { label: "About", href: "/about" },
  ]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const panelResponse = await fetch("/api/panel-data")
        const weatherResponse = await fetch("/api/weather-data")
        const energyResponse = await fetch("/api/energy-data")

        const panelData = await panelResponse.json()
        const weatherData = await weatherResponse.json()
        const energyData = await energyResponse.json()

        setPanelData(panelData)
        setWeatherData(weatherData)
        setEnergyData(energyData)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        import("@/lib/mock-data").then(
          ({ mockPanelData, mockWeatherData, mockEnergyData }) => {
            setPanelData(mockPanelData)
            setWeatherData(mockWeatherData)
            setEnergyData(mockEnergyData)
            setLoading(false)
          }
        )
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#030a04] via-white to-white text-black">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0c2011] to-[#153716] text-white">
        <div className="container mx-auto flex items-center justify-between py-4 px-4">
          <Link href="/" className="flex items-center gap-2 text-white">
            <Sun className="h-6 w-6 text-yellow-300" />
            <span className="text-xl font-bold">SunTrack</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`font-medium transition-colors ${
                  link.active ? "text-yellow-400" : "text-white hover:text-yellow-300"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label="Open navigation menu"
              className="rounded-full border border-white/20 bg-white/10 p-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Button className="hidden bg-white text-black hover:bg-yellow-400 hover:text-black md:inline-flex" asChild>
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </header>
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-x-4 top-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1f10] to-[#18421c] p-6 shadow-2xl"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">Menu</p>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  aria-label="Close navigation menu"
                  className="rounded-full border border-white/20 p-2 text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mt-6 flex flex-col gap-3">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileNavOpen(false)}
                    className={`rounded-2xl border border-white/10 px-4 py-3 text-base font-semibold text-white transition ${
                      link.active ? "bg-white/10" : "hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  Back to Home
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 rounded-3xl border border-emerald-100 bg-white/80 p-6 shadow-xl shadow-emerald-50/80"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">Control center</p>
            <h2 className="mt-2 text-2xl font-semibold text-green-800">Live fleet overview</h2>
            <p className="text-sm text-gray-600">
              Adaptive trackers, predictive analytics and weather foresight converge to keep your assets performing.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-green-700">System Dashboard</h1>
              <p className="text-gray-600">Monitor your SunTrack system performance in real-time</p>
            </div>
            <div className="mt-4 md:mt-0 flex items-center gap-3">
              <p className="text-sm text-gray-500 mb-1">Last updated: May 13, 2025 6:08 PM</p>
              <Button size="sm" variant="outline" className="gap-2 border-green-700 text-green-700">
                <ArrowUpDown className="h-4 w-4" /> Refresh Data
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="h-4 bg-green-100 rounded w-1/2 mb-3"></div>
                  <div className="h-8 bg-green-100 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-6 md:grid-cols-4 mb-8">
                {[
                  {
                    label: "Current Power Output",
                    value: `${energyData?.currentOutput ?? "--"} kW`,
                    accent: "from-emerald-200/40",
                    icon: Zap,
                    sub: "+12% from yesterday",
                  },
                  {
                    label: "Panel Temperature",
                    value: `${panelData?.temperature ?? "--"}°C`,
                    accent: "from-orange-200/40",
                    icon: Thermometer,
                    sub: "Optimal range: 15-35°C",
                  },
                  {
                    label: "Battery Status",
                    value: `${energyData?.batteryLevel ?? "--"}%`,
                    accent: "from-lime-200/40",
                    icon: Battery,
                    sub: "Estimated backup: 6 hours",
                  },
                  {
                    label: "Humidity",
                    value: `${weatherData?.humidity ?? "--"}%`,
                    accent: "from-sky-200/40",
                    icon: Droplets,
                    sub: "Last 24h: 45% avg",
                  },
                ].map((card, index) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    className="relative overflow-hidden rounded-xl border border-green-100 bg-white/90 p-4 shadow-lg shadow-emerald-50/60"
                  >
                    <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.accent} to-transparent opacity-40`} />
                    <div className="relative">
                      <div className="text-sm text-green-700">{card.label}</div>
                      <div className="flex items-center mt-2 text-2xl font-bold text-green-900">
                        <card.icon className="mr-2 h-5 w-5 text-green-600" />
                        {card.value}
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{card.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-8">
                <div className="flex gap-4 border-b border-green-300 pb-2">
                  <button className="text-green-700 font-medium">Performance</button>
                  <button className="text-gray-600 hover:text-green-700">Weather Forecast</button>
                  <button className="text-gray-600 hover:text-green-700">Energy Production</button>
                  <button className="text-gray-600 hover:text-green-700">System Status</button>
                </div>

                <div className="bg-green-50 p-4 rounded-xl border border-green-200 h-[400px] mt-4">
                  <PanelChart data={panelData?.performanceData || []} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="py-8 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-green-700 mb-4">How Dashboard Works</h2>
          <p className="text-gray-600 mb-6">Use the solar energy calculator below to estimate energy production for your setup in Azerbaijan.</p>
          <SolarCalculator />
        </div>
      </div>

      <footer style={{ backgroundColor: "rgba(26,67,10)" }} className="border-t py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Sun className="h-5 w-5 text-yellow-300" />
              <span className="font-bold text-white">SunTrack</span>
            </div>
            <div className="flex gap-6">
              <Link href="/" className="text-sm text-white  hover:text-yellow-400 transition-colors">Home</Link>
              <Link href="/how-it-works" className="text-sm text-white  hover:text-yellow-400 transition-colors">How It Works</Link>
              <Link href="/dashboard" className="text-sm text-white  hover:text-yellow-400 transition-colors">Dashboard</Link>
              <Link href="/about" className="text-sm text-white hover:text-yellow-400 transition-colors">About</Link>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-white">© 2025 SunTrack. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
