"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, ArrowRight, BarChart3, Cloud, Zap, Thermometer, RotateCw, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
  viewport: { once: true, amount: 0.4 },
})

const steps = [
  {
    title: "Data Capture",
    description: "Edge sensors stream irradiance, wind, temperature, mechanical torque and string telemetry every 5 seconds.",
    icon: Cloud,
    accent: "from-cyan-200/40",
  },
  {
    title: "AI Forecasting",
    description: "Weather ensembles and production baselines merge to predict optimal orientation and dispatch windows.",
    icon: BarChart3,
    accent: "from-emerald-200/40",
  },
  {
    title: "Tracker Control",
    description: "Actuators receive smooth motion profiles that avoid oscillation and reduce structural fatigue.",
    icon: RotateCw,
    accent: "from-lime-200/40",
  },
  {
    title: "Energy Orchestration",
    description: "Storage, grid export and loads respond to live prices, curtailment and resiliency signals.",
    icon: Zap,
    accent: "from-amber-200/40",
  },
  {
    title: "Operations Hub",
    description: "Immersive dashboards expose KPIs, anomalies and collaboration tools for global teams.",
    icon: Thermometer,
    accent: "from-violet-200/40",
  },
]

export default function HowItWorks() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "/how-it-works", active: true },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#051206] via-[#0c2011] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0b2010] to-[#123315]">
        <div className="container flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/70">SunTrack</p>
              <p className="text-lg font-semibold text-white">Methodology</p>
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
              aria-label="Open navigation menu"
              className="rounded-full border border-white/20 bg-white/10 p-2 text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Button
              asChild
              className="hidden bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-black shadow-lg shadow-emerald-500/30 md:inline-flex"
            >
              <Link href="/dashboard">View dashboard</Link>
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
                <Link
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  View dashboard
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
                Process
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                A deeply instrumented solar nervous system
              </h1>
              <p className="text-lg text-white/80">
                SunTrack fuses atmospheric science, digital twins and operator experience into a single loop. Each stage
                in the loop is choreographed with motion, context and explainable AI.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
                >
                  <Link href="/dashboard">Explore live control</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href="/about">Meet the team</Link>
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
                <p className="text-xs uppercase tracking-[0.3em] text-white/70">Live workflow</p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">Phase sync</p>
                  <p className="mt-2 text-3xl font-semibold text-white">Tracker slew: 2.1°/min</p>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">Atmospheric clarity</p>
                      <p className="mt-2 text-2xl font-semibold text-white">0.82</p>
                    </div>
                    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/50">AI confidence</p>
                      <p className="mt-2 text-2xl font-semibold text-white">97%</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  {[
                    { label: "Dataset sync", value: "Every 120s", status: "Healthy" },
                    { label: "Predictive alerts", value: "3 open", status: "Review" },
                    { label: "Tracker fleet", value: "98% aligned", status: "Live" },
                  ].map((item) => (
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
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Workflow</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Five synchronized layers</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Each layer is animated to surface its most important signal, whether you are on a tablet in the field or
                directing a control room.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {steps.map((step, index) => (
                <motion.div
                  key={step.title}
                  {...fadeUp(index * 0.05)}
                  className="group relative rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-xl shadow-emerald-50/80"
                >
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${step.accent} to-transparent opacity-0 transition group-hover:opacity-100`} />
                  <div className="relative space-y-4">
                    <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                      <step.icon className="h-6 w-6" />
                    </div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Step {index + 1}</p>
                    <h3 className="text-xl font-semibold text-slate-900">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container grid gap-10 md:grid-cols-2">
            <motion.div {...fadeUp(0)}>
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Timeline</p>
              <h2 className="mt-3 text-3xl font-bold">From signal to action in seconds</h2>
              <p className="mt-3 text-lg text-slate-600">
                A vertically integrated stack keeps latency under 150ms end-to-end, ensuring that tracker adjustments,
                alarms and market decisions land while they still matter.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { title: "T + 0s", copy: "Edge devices push normalized metrics to the SunTrack mesh bus." },
                  { title: "T + 10s", copy: "AI ensembles rescore scenarios; anomalies bubble up with explanations." },
                  { title: "T + 25s", copy: "Commands broadcast to trackers, storage and grid interfaces." },
                  { title: "T + 40s", copy: "Operators see cinematic transitions highlighting impacted assets." },
                ].map((item) => (
                  <li key={item.title} className="rounded-2xl border border-emerald-100 bg-white/80 p-4 shadow-sm shadow-emerald-100/50">
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
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">UI choreography</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Designed for situational awareness</h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    title: "Ambient motion",
                    copy: "Subtle parallax, acceleration curves and breathing glows guide attention without overwhelming operators.",
                  },
                  {
                    title: "Explainable overlays",
                    copy: "Each AI suggestion reveals the drivers behind it, with animated ribbons tracing data lineage.",
                  },
                  {
                    title: "Collaboration trails",
                    copy: "Hand-offs and comments leave luminous trails so teams can literally follow each other’s thinking.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-md shadow-emerald-100/60">
                    <h4 className="text-lg font-semibold text-slate-900">{item.title}</h4>
                    <p className="mt-2 text-slate-600">{item.copy}</p>
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
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-200">Next step</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
                Pilot SunTrack across your fleet in weeks
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Deploy in phases, light up your digital twin and watch the platform choreograph your hardware, teams and
                trading desks in real time.
              </p>
            </motion.div>

            <motion.div {...fadeUp(0.1)} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
              >
                <Link href="/dashboard">Launch interactive demo</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href="/about">View case studies</Link>
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
              <p className="font-semibold text-white">SunTrack</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">How it works</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {["Home", "Dashboard", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase()}`}
                className="text-white/70 transition hover:text-white"
              >
                {item}
              </Link>
            ))}
          </div>
          <p className="text-xs text-white/50">© {new Date().getFullYear()} SunTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
