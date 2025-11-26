"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, ArrowUpDown, Thermometer, Droplets, Battery, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PanelChart } from "@/components/panel-chart"
import { SolarCalculator } from "@/components/solar-calculator"
import { useI18n, useTranslations } from "@/components/locale-provider"
import { toLocalePath } from "@/lib/locale-path"
import { LanguageSwitcher } from "@/components/language-switcher"

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

type DictionaryShape = typeof import("@/lib/dictionaries/en").default

const NAV_ITEMS = [
  { key: "home", path: "" },
  { key: "howItWorks", path: "/how-it-works" },
  { key: "dashboard", path: "/dashboard" },
  { key: "about", path: "/about" },
] as const

const STAT_ICONS = {
  power: Zap,
  temperature: Thermometer,
  battery: Battery,
  humidity: Droplets,
} as const

const STAT_KEYS = ["power", "temperature", "battery", "humidity"] as const

export default function Dashboard() {
  const [panelData, setPanelData] = useState<PanelData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [energyData, setEnergyData] = useState<EnergyData | null>(null)
  const [loading, setLoading] = useState(true)
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { locale } = useI18n()
  const common = useTranslations("common") as DictionaryShape["common"]
  const dashboard = useTranslations("dashboard") as DictionaryShape["dashboard"]

  const navLinks = NAV_ITEMS.map((item) => ({
    label: common.nav[item.key],
    href: toLocalePath(locale, item.path),
    active: item.key === "dashboard",
  }))

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [panelResponse, weatherResponse, energyResponse] = await Promise.all([
          fetch("/api/panel-data"),
          fetch("/api/weather-data"),
          fetch("/api/energy-data"),
        ])

        const [panelPayload, weatherPayload, energyPayload] = await Promise.all([
          panelResponse.json(),
          weatherResponse.json(),
          energyResponse.json(),
        ])

        setPanelData(panelPayload)
        setWeatherData(weatherPayload)
        setEnergyData(energyPayload)
      } catch (error) {
        console.error("Error fetching data:", error)
        import("@/lib/mock-data").then(({ mockPanelData, mockWeatherData, mockEnergyData }) => {
          setPanelData(mockPanelData)
          setWeatherData(mockWeatherData)
          setEnergyData(mockEnergyData)
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#030a04] via-white to-white text-black">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0c2011] to-[#153716] text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <Link href={toLocalePath(locale, "/")} className="flex items-center gap-2 text-white">
            <Sun className="h-6 w-6 text-yellow-300" />
            <span className="text-xl font-bold">{dashboard.header.brand}</span>
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
              aria-label={common.menu.open}
              className="rounded-full border border-white/20 bg-white/10 p-2 md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <LanguageSwitcher />
            <Button className="hidden bg-white text-black hover:bg-yellow-400 hover:text-black md:inline-flex" asChild>
              <Link href={toLocalePath(locale, "/")}>{dashboard.actions.backHome}</Link>
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
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-200">{common.menu.label}</p>
                <button
                  onClick={() => setMobileNavOpen(false)}
                  aria-label={common.menu.close}
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
                <div className="pt-2 border-t border-white/10">
                  <LanguageSwitcher />
                </div>
                <Link
                  href={toLocalePath(locale, "/")}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  {dashboard.actions.backHome}
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
            <p className="text-xs uppercase tracking-[0.4em] text-emerald-600">{dashboard.heroCard.kicker}</p>
            <h2 className="mt-2 text-2xl font-semibold text-green-800">{dashboard.heroCard.title}</h2>
            <p className="text-sm text-gray-600">{dashboard.heroCard.description}</p>
          </motion.div>
          <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-green-700">{dashboard.system.title}</h1>
              <p className="text-gray-600">{dashboard.system.subtitle}</p>
            </div>
            <div className="mt-4 flex items-center gap-3 md:mt-0">
              <p className="text-sm text-gray-500">{dashboard.system.lastUpdated}</p>
              <Button size="sm" variant="outline" className="gap-2 border-green-700 text-green-700">
                <ArrowUpDown className="h-4 w-4" />
                {dashboard.actions.refresh}
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-6 md:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse rounded-lg border border-green-200 bg-green-50 p-4">
                  <div className="mb-3 h-4 w-1/2 rounded bg-green-100" />
                  <div className="h-8 w-2/3 rounded bg-green-100" />
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="mb-8 grid gap-6 md:grid-cols-4">
                {STAT_KEYS.map((key, index) => {
                  const card = dashboard.stats[key]
                  const Icon = STAT_ICONS[key]
                  const value =
                    key === "power"
                      ? `${energyData?.currentOutput ?? "--"} kW`
                      : key === "temperature"
                        ? `${panelData?.temperature ?? "--"}°C`
                        : key === "battery"
                          ? `${energyData?.batteryLevel ?? "--"}%`
                          : `${weatherData?.humidity ?? "--"}%`

                  return (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      className="relative overflow-hidden rounded-xl border border-green-100 bg-white/90 p-4 shadow-lg shadow-emerald-50/60"
                    >
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-br ${card.accent} to-transparent opacity-40`}
                      />
                      <div className="relative">
                        <div className="text-sm text-green-700">{card.label}</div>
                        <div className="mt-2 flex items-center text-2xl font-bold text-green-900">
                          <Icon className="mr-2 h-5 w-5 text-green-600" />
                          {value}
                        </div>
                        <p className="mt-1 text-xs text-gray-600">{card.sub}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="mb-8">
                <div className="flex gap-4 border-b border-green-300 pb-2">
                  {dashboard.tabs.map((tab, index) => (
                    <button
                      key={tab}
                      className={`${
                        index === 0 ? "text-green-700 font-medium" : "text-gray-600 hover:text-green-700"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="mt-4 h-[400px] rounded-xl border border-green-200 bg-green-50 p-4">
                  <PanelChart data={panelData?.performanceData || []} />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <div className="bg-gradient-to-b from-white to-emerald-50 py-8">
        <div className="container mx-auto px-4">
          <h2 className="mb-4 text-2xl font-bold text-green-700">{dashboard.calculator.title}</h2>
          <p className="mb-6 text-gray-600">{dashboard.calculator.description}</p>
          <SolarCalculator />
        </div>
      </div>

      <footer className="border-t bg-[rgba(26,67,10)] py-8 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-300" />
              <span className="font-bold text-white">{common.brand.name}</span>
            </div>
            <div className="flex gap-6">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.key}
                  href={toLocalePath(locale, item.path)}
                  className="text-sm text-white transition-colors hover:text-yellow-400"
                >
                  {common.nav[item.key]}
                </Link>
              ))}
            </div>
            <div className="text-sm text-white">
              © {new Date().getFullYear()} {common.brand.name}. {common.footer.rights}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

