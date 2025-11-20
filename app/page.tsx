"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRight,
  Sun,
  BarChart3,
  Cloud,
  ShieldCheck,
  BatteryCharging,
  Sparkles,
  Wind,
  Globe,
  Cpu,
  Menu,
  X,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay },
  viewport: { once: true, amount: 0.4 },
})

export default function Home() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navLinks = [
    { label: "Home", href: "/", active: true },
    { label: "How it works", href: "/how-it-works" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about" },
  ]

  const heroStats = [
    { value: "120+", label: "Sites optimized", detail: "across 14 countries" },
    { value: "25%", label: "More output", detail: "vs fixed-tilt arrays" },
    { value: "1.2M", label: "Data points/day", detail: "ingested & scored" },
  ]

  const capabilities = [
    {
      title: "Real-Time Monitoring",
      description: "High-resolution telemetry streams keep every inverter and string visible.",
      icon: Sun,
      accent: "from-lime-200/40 to-transparent",
    },
    {
      title: "Performance Analytics",
      description: "AI benchmarking surfaces anomalies, lost yield and predictive maintenance hints.",
      icon: BarChart3,
      accent: "from-emerald-200/40 to-transparent",
    },
    {
      title: "Health Monitoring",
      description: "Thermal drift, shading and mechanical stress are tracked with proactive alerts.",
      icon: Cloud,
      accent: "from-teal-200/40 to-transparent",
    },
    {
      title: "Grid-Ready Storage",
      description: "Battery orchestration balances charge windows with spot-price opportunities.",
      icon: BatteryCharging,
      accent: "from-yellow-200/40 to-transparent",
    },
    {
      title: "Global Fleet Control",
      description: "Multi-site command center orchestrates firmware, trackers and curtailment.",
      icon: Globe,
      accent: "from-sky-200/40 to-transparent",
    },
    {
      title: "Insights API",
      description: "Secure APIs push KPIs into your existing EMS, BI and trading stacks.",
      icon: Cpu,
      accent: "from-indigo-200/40 to-transparent",
    },
  ]

  const experiencePillars = [
    {
      title: "Adaptive Tracking",
      copy: "Digital twins simulate atmospheric scatter and mechanical backlash to align panels precisely.",
      metric: "+18% annual yield",
      icon: Wind,
    },
    {
      title: "Trustworthy AI",
      copy: "Explainable models highlight the variables behind every recommendation and alert.",
      metric: "96% anomaly recall",
      icon: ShieldCheck,
    },
    {
      title: "Immersive Dashboard",
      copy: "Fluid interactions, depth and ambient motion make complex data legible at a glance.",
      metric: "<150 ms latency",
      icon: Sparkles,
    },
  ]

  const testimonials = [
    {
      quote:
        "SunTrack transformed our utility-scale farms. The predictive tilting alone funded the rollout in under six months.",
      author: "Leyla Rahimova",
      title: "COO, Caspian Solar",
    },
    {
      quote:
        "The dashboard feels alive. Our operators collaborate in real time and catch issues before they become outages.",
      author: "Marco Jensen",
      title: "Head of Operations, Solunergy",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#071207] via-[#0e2012] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#0a1d0b] via-[#123615] to-[#0b1c0c]/90">
        <div className="container flex items-center justify-between py-5">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-200/80">SunTrack</p>
              <p className="text-lg font-semibold text-white">Solar Intelligence Platform</p>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-white/80 md:flex">
            {navLinks.map((link) => (
            <Link
                key={link.label}
                href={link.href}
                className={`transition ${
                  link.active
                    ? "text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
            </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden rounded-full border border-white/20 bg-white/10 p-2 text-white"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Button
              asChild
              variant="ghost"
              className="border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
            >
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-yellow-300 via-lime-300 to-emerald-400 text-black shadow-[0_15px_35px_rgba(106,255,145,0.25)] hover:opacity-90"
            >
              <Link href="/dashboard">View Dashboard</Link>
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
                  href="/login"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  Login
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
                  Live preview · Intelligent tracking in action
                </span>
              </motion.div>

              <motion.div {...fadeIn(0.1)} className="space-y-6">
                <h1 className="text-4xl font-bold leading-tight text-white md:text-6xl">
                  Solar performance that feels alive
            </h1>
                <p className="text-lg text-white/80">
                  Orchestrate panels, storage and energy markets with a cinematic dashboard, adaptive AI and the calm
                  confidence of predictive maintenance.
            </p>
              </motion.div>

              <motion.div {...fadeIn(0.2)} className="flex flex-col gap-4 sm:flex-row">
              <Button
                  asChild
                size="lg"
                  className="w-full bg-gradient-to-r from-emerald-500 via-lime-400 to-yellow-300 text-black shadow-lg shadow-emerald-500/30 hover:opacity-90 sm:w-auto"
              >
                <Link href="/how-it-works">
                    Learn how it works <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href="/dashboard">Explore the live demo</Link>
              </Button>
              </motion.div>

              <motion.div {...fadeIn(0.3)} className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="grid gap-6 sm:grid-cols-3">
                  {heroStats.map((stat, index) => (
                    <div key={stat.label} className="space-y-2 border-white/10 sm:border-l sm:pl-6 sm:first:border-none sm:first:pl-0">
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
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs text-emerald-200">
                    real-time sync
                  </span>
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
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">Capabilities</p>
              <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl">Built for ambitious solar teams</h2>
              <p className="mt-3 max-w-2xl text-lg text-slate-600">
                From sensor health to trading decisions, every interaction is crafted with depth, motion and clarity so
                operators stay in flow.
              </p>
            </motion.div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <motion.div
                  key={capability.title}
                  {...fadeIn(index * 0.05)}
                  className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg shadow-slate-200/50 transition hover:-translate-y-1 hover:shadow-emerald-100/80"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${capability.accent} opacity-0 transition group-hover:opacity-100`} />
                  <div className="relative space-y-4">
                    <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                      <capability.icon className="h-5 w-5" />
              </div>
                    <h3 className="text-xl font-semibold text-slate-900">{capability.title}</h3>
                    <p className="text-slate-600">
                      {capability.description}
              </p>
            </div>
                </motion.div>
              ))}
            </div>
              </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container space-y-16">
            <motion.div {...fadeIn(0)} className="text-center">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-600">Experience</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">The SunTrack signature</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                Motion, depth and clarity work together to elevate situational awareness for control-room teams.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-3">
              {experiencePillars.map((pillar, index) => (
                <motion.div
                  key={pillar.title}
                  {...fadeIn(0.1 * index)}
                  className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-xl shadow-emerald-100/50"
                >
                  <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                    <pillar.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">{pillar.title}</h3>
                  <p className="mt-3 text-slate-600">{pillar.copy}</p>
                  <p className="mt-6 text-sm font-medium text-emerald-700">{pillar.metric}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeIn(0.2)}
              className="grid gap-6 rounded-[32px] border border-emerald-100 bg-white p-8 text-slate-900 shadow-2xl shadow-emerald-100/80 md:grid-cols-2"
            >
              {testimonials.map((testimonial) => (
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
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-200">Next step</p>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Ready to orchestrate your solar future?</h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
                Deploy SunTrack in weeks, connect your fleet and watch every decision benefit from cinematic clarity.
              </p>
            </motion.div>

            <motion.div {...fadeIn(0.1)} className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="w-full bg-white text-emerald-900 shadow-xl shadow-white/20 hover:bg-white/90 sm:w-auto"
              >
                <Link href="/dashboard">Launch interactive dashboard</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="w-full border border-white/20 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
              >
                <Link href="/about">Meet the team</Link>
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
              <p className="font-semibold text-white">SunTrack</p>
              <p className="text-xs uppercase tracking-[0.4em] text-white/40">Solar orchestration</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {["Home", "How it works", "Dashboard", "About"].map((item) => (
              <Link
                key={item}
                href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
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
