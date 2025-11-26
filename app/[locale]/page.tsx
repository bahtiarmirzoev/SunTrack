"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  BatteryCharging,
  BarChart3,
  Cloud,
  Cpu,
  Globe,
  Menu,
  ShieldCheck,
  Sparkles,
  Sun,
  Wind,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useI18n, useTranslations } from "@/components/locale-provider"
import { toLocalePath } from "@/lib/locale-path"
import { LanguageSwitcher } from "@/components/language-switcher"

type DictionaryShape = typeof import("@/lib/dictionaries/en").default

const NAV_ITEMS = [
  { key: "home", path: "" },
  { key: "howItWorks", path: "/how-it-works" },
  { key: "dashboard", path: "/dashboard" },
  { key: "about", path: "/about" },
] as const

const capabilityAccents = [
  "from-lime-200/40 to-transparent",
  "from-emerald-200/40 to-transparent",
  "from-teal-200/40 to-transparent",
  "from-yellow-200/40 to-transparent",
  "from-sky-200/40 to-transparent",
  "from-indigo-200/40 to-transparent",
]

const capabilityIcons = [Sun, BarChart3, Cloud, BatteryCharging, Globe, Cpu]
const experienceIcons = [Wind, ShieldCheck, Sparkles]

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.4 },
})

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { locale } = useI18n()
  const common = useTranslations("common") as DictionaryShape["common"]
  const home = useTranslations("home") as DictionaryShape["home"]

  const navLinks = NAV_ITEMS.map((item) => ({
    label: common.nav[item.key],
    href: toLocalePath(locale, item.path),
    active: item.key === "home",
  }))

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#071207] via-[#0e2012] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0a1d0b] via-[#123615] to-[#0b1c0c]/90">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">{home.headerTagline}</p>
              <p className="text-lg font-semibold text-white">{home.headerTitle}</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition ${link.active ? "text-white" : "text-white/70 hover:text-white"}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="rounded-full border border-white/20 bg-white/10 p-2 text-white md:hidden"
              aria-label={common.menu.open}
            >
              <Menu className="h-5 w-5" />
            </button>
            <LanguageSwitcher />
            <Button
              asChild
              variant="ghost"
              className="border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href={toLocalePath(locale, "/login")}>{common.nav.login}</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-300 via-lime-300 to-emerald-400 text-black shadow-[0_15px_35px_rgba(106,255,145,0.25)] hover:opacity-90"
            >
              <Link href={toLocalePath(locale, "/dashboard")}>{home.navSecondaryCta}</Link>
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
              className="absolute inset-x-4 top-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b2310] to-[#0f2f15] p-6 shadow-2xl"
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
                  href={toLocalePath(locale, "/login")}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  {common.nav.login}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden pb-24 pt-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(135,255,168,0.25),_rgba(7,18,7,0)_65%)]" />
          <div className="container relative grid gap-16 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-8">
              <motion.div {...fadeIn(0)}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-emerald-300" />
                  {home.heroBadge}
                </span>
              </motion.div>

              <motion.div {...fadeIn(0.1)} className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">{home.heroTitle}</h1>
                <p className="text-lg text-white/80">{home.heroDescription}</p>
              </motion.div>

              <motion.div {...fadeIn(0.2)} className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-300 text-black shadow-lg shadow-emerald-500/30 hover:opacity-90 sm:w-auto"
                >
                  <Link href={toLocalePath(locale, "/how-it-works")}>
                    {home.heroPrimaryCta} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href={toLocalePath(locale, "/dashboard")}>{home.heroSecondaryCta}</Link>
                </Button>
              </motion.div>

              <motion.div
                {...fadeIn(0.3)}
                className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"
              >
                <div className="grid gap-6 sm:grid-cols-3">
                  {home.heroStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="space-y-2 border-white/10 sm:border-l sm:pl-6 sm:first:border-none sm:first:pl-0"
                    >
                      <p className="text-3xl font-semibold text-white">{stat.value}</p>
                      <p className="text-sm text-white/70">{stat.label}</p>
                      <p className="text-xs uppercase tracking-widest text-emerald-200/70">{stat.detail}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <motion.div
              {...fadeIn(0.15)}
              className="relative rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl"
            >
              <div className="absolute -left-16 top-16 hidden h-32 w-32 rounded-full bg-emerald-400/20 blur-3xl md:block" />
              <div className="absolute -right-10 bottom-6 hidden h-40 w-40 rounded-full bg-lime-400/20 blur-3xl md:block" />
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-sm uppercase tracking-[0.4em] text-white/60">Live array</p>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">real-time sync</span>
                </div>

                <div className="rounded-2xl bg-black/30 p-6 shadow-inner">
                  <p className="text-sm uppercase tracking-widest text-white/50">Today’s envelope</p>
                  <p className="mt-2 text-4xl font-semibold text-white">+4.3 MWh</p>
                  <p className="text-sm text-white/60">+12% vs forecast</p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Irradiance</p>
                      <p className="mt-2 text-2xl font-semibold text-white">912 W/m²</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Battery</p>
                      <p className="mt-2 text-2xl font-semibold text-white">82%</p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                  {[
                    { label: "Tracker alignment", value: "+3.4°", trend: "Stable" },
                    { label: "Thermal envelope", value: "32°C", trend: "Optimal" },
                    { label: "Wind shedding", value: "Ready", trend: "Auto" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between text-sm text-white/80">
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{item.value}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-emerald-200">{item.trend}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20 text-slate-900">
          <div className="container">
            <motion.div {...fadeIn(0)}>
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">{home.capabilitiesKicker}</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">{home.capabilitiesTitle}</h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">{home.capabilitiesDescription}</p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {home.capabilities.map((capability, index) => {
                const Icon = capabilityIcons[index]
                return (
                  <motion.div
                    key={capability.title}
                    {...fadeIn(index * 0.05)}
                    className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-emerald-100/80"
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${capabilityAccents[index]} opacity-0 transition group-hover:opacity-100`}
                    />
                    <div className="relative space-y-4">
                      <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                        {Icon ? <Icon className="h-5 w-5" /> : null}
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">{capability.title}</h3>
                      <p className="text-slate-600">{capability.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container space-y-16">
            <motion.div {...fadeIn(0)} className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">{home.experienceKicker}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{home.experienceTitle}</h2>
              <p className="mt-3 mx-auto max-w-2xl text-lg text-slate-600">{home.experienceDescription}</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {home.experience.map((pillar, index) => {
                const Icon = experienceIcons[index]
                return (
                  <motion.div
                    key={pillar.title}
                    {...fadeIn(0.1 * index)}
                    className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/50"
                  >
                    <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                      {Icon ? <Icon className="h-6 w-6" /> : null}
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900">{pillar.title}</h3>
                    <p className="mt-3 text-slate-600">{pillar.copy}</p>
                    <p className="mt-6 text-sm font-medium text-emerald-700">{pillar.metric}</p>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              {...fadeIn(0.2)}
              className="grid gap-6 rounded-[32px] border border-emerald-100 bg-white p-8 text-slate-900 shadow-2xl shadow-emerald-100/80 md:grid-cols-2"
            >
              {home.testimonials.map((testimonial) => (
                <div key={testimonial.author} className="space-y-4 border-emerald-100 md:border-l md:pl-6 first:border-none first:pl-0">
                  <p className="text-lg italic text-slate-700">“{testimonial.quote}”</p>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                    <p className="text-sm text-slate-500">{testimonial.title}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-grid opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-900/20" />
          <div className="container relative text-center">
            <motion.div {...fadeIn(0)}>
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">{home.nextStepKicker}</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{home.nextStepTitle}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{home.nextStepDescription}</p>
            </motion.div>

            <motion.div {...fadeIn(0.1)} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
              >
                <Link href={toLocalePath(locale, "/dashboard")}>{home.nextStepPrimaryCta}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href={toLocalePath(locale, "/about")}>{home.nextStepSecondaryCta}</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#071207] py-10 text-white/70">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Sun className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="font-semibold text-white">{common.brand.name}</p>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">{common.footer.orchestration}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className="text-white/70 transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {common.brand.name}. {common.footer.rights}
          </p>
        </div>
      </footer>
    </div>
  )
}
