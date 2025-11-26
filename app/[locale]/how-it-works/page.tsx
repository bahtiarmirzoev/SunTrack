"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, BarChart3, Cloud, Zap, Thermometer, RotateCw, Menu, X } from "lucide-react"
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

const STEP_ICONS = {
  dataCapture: Cloud,
  aiForecasting: BarChart3,
  trackerControl: RotateCw,
  energyOrchestration: Zap,
  operationsHub: Thermometer,
} as const

const STEP_KEYS = ["dataCapture", "aiForecasting", "trackerControl", "energyOrchestration", "operationsHub"] as const

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
  viewport: { once: true, amount: 0.4 },
})

export default function HowItWorks() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { locale } = useI18n()
  const common = useTranslations("common") as DictionaryShape["common"]
  const howItWorks = useTranslations("howItWorks") as DictionaryShape["howItWorks"]

  const navLinks = NAV_ITEMS.map((item) => ({
    label: common.nav[item.key],
    href: toLocalePath(locale, item.path),
    active: item.key === "howItWorks",
  }))

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#051206] via-[#0c2011] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0b2010] to-[#123315]">
        <div className="container flex items-center justify-between py-5">
          <Link href={toLocalePath(locale, "/")} className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">{howItWorks.header.tagline}</p>
              <p className="text-lg font-semibold text-white">{howItWorks.header.title}</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${item.active ? "text-white" : "hover:text-white"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              aria-label={common.menu.open}
              className="rounded-full border border-white/20 bg-white/10 p-2 text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <LanguageSwitcher />
            <Button
              asChild
              className="hidden bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-black shadow-lg shadow-emerald-500/30 md:inline-flex"
            >
              <Link href={toLocalePath(locale, "/dashboard")}>{common.nav.viewDashboard}</Link>
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
              className="absolute inset-x-4 top-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1c0f] to-[#153716] p-6 shadow-2xl"
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
                    key={link.href}
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
                  href={toLocalePath(locale, "/dashboard")}
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  {common.nav.viewDashboard}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <section className="relative overflow-hidden pb-20 pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(139,255,174,0.2),_rgba(8,18,8,0)_60%)]" />
          <div className="container relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div {...fadeUp(0)} className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.4em] text-white/70">
                {howItWorks.hero.badge}
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{howItWorks.hero.title}</h1>
              <p className="text-lg text-white/80">{howItWorks.hero.description}</p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
                >
                  <Link href={toLocalePath(locale, "/dashboard")}>{howItWorks.hero.primaryCta}</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href={toLocalePath(locale, "/about")}>{howItWorks.hero.secondaryCta}</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              {...fadeUp(0.15)}
              className="relative rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl"
            >
              <div className="absolute -left-12 top-12 hidden h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl md:block" />
              <div className="absolute -right-8 bottom-6 hidden h-32 w-32 rounded-full bg-lime-400/30 blur-3xl md:block" />
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">{howItWorks.livePanel.label}</p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">{howItWorks.livePanel.kicker}</p>
                  <p className="mt-2 text-3xl font-semibold text-white">{howItWorks.livePanel.headline}</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {howItWorks.livePanel.metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{metric.label}</p>
                        <p className="mt-2 text-2xl font-semibold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  {howItWorks.livePanel.stream.map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 text-sm text-white/80">
                      <span>{item.label}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white">{item.value}</span>
                        <span className="rounded-full bg-white/10 px-2 py-0.5 text-xs text-emerald-200">{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20 text-slate-900">
          <div className="container space-y-12">
            <motion.div {...fadeUp(0)} className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{howItWorks.workflow.kicker}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{howItWorks.workflow.title}</h2>
              <p className="mt-3 mx-auto max-w-2xl text-lg text-slate-600">{howItWorks.workflow.description}</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {STEP_KEYS.map((key, index) => {
                const step = howItWorks.workflow.steps[key]
                const Icon = STEP_ICONS[key]
                return (
                  <motion.div
                    key={key}
                    {...fadeUp(index * 0.05)}
                    className="group relative rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-xl shadow-emerald-50/80"
                  >
                    <div
                      className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.accent} to-transparent opacity-0 transition group-hover:opacity-100`}
                    />
                    <div className="relative space-y-4">
                      <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                        <Icon className="h-6 w-6" />
                      </div>
                      <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{step.stepLabel}</p>
                      <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                      <p className="text-slate-600">{step.description}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container grid gap-10 md:grid-cols-2">
            <motion.div {...fadeUp(0)}>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{howItWorks.timeline.kicker}</p>
              <h2 className="mt-3 text-3xl font-bold">{howItWorks.timeline.title}</h2>
              <p className="mt-3 text-lg text-slate-600">{howItWorks.timeline.description}</p>
              <ul className="mt-8 space-y-4">
                {howItWorks.timeline.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm shadow-emerald-100/50"
                  >
                    <p className="text-sm font-semibold text-emerald-700">{item.title}</p>
                    <p className="text-slate-600">{item.copy}</p>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp(0.1)}
              className="rounded-[32px] border border-emerald-100 bg-white/80 p-6 shadow-2xl shadow-emerald-100/80"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{howItWorks.ui.kicker}</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">{howItWorks.ui.title}</h3>
              <div className="mt-6 space-y-4">
                {howItWorks.ui.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-md shadow-emerald-100/60"
                  >
                    <h4 className="text-lg font-semibold text-slate-900">{card.title}</h4>
                    <p className="mt-2 text-slate-600">{card.copy}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/10 via-transparent to-emerald-900/20" />
          <div className="container relative text-center">
            <motion.div {...fadeUp(0)}>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">{howItWorks.nextStep.kicker}</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">{howItWorks.nextStep.title}</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">{howItWorks.nextStep.description}</p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
              >
                <Link href={toLocalePath(locale, "/dashboard")}>{howItWorks.nextStep.primaryCta}</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href={toLocalePath(locale, "/about")}>{howItWorks.nextStep.secondaryCta}</Link>
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#061005] py-10 text-white/70">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Sun className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="font-semibold text-white">{common.brand.name}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">{howItWorks.footerTagline}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {NAV_ITEMS.filter((item) => item.key !== "howItWorks").map((item) => (
              <Link
                key={item.key}
                href={toLocalePath(locale, item.path)}
                className="text-white/70 transition hover:text-white"
              >
                {common.nav[item.key]}
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

