"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Mail, MapPin, Phone, Award, Users, Leaf, Zap, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
  viewport: { once: true, amount: 0.4 },
})

const values = [
  {
    title: "Sustainability",
    description: "Every release is measured against its carbon and circularity impact.",
    icon: Leaf,
  },
  {
    title: "Human-centered",
    description: "We design for clarity so operators stay calm even in high-stress events.",
    icon: Users,
  },
  {
    title: "Inventive spirit",
    description: "We blend hardware, AI and design disciplines to move the industry forward.",
    icon: Award,
  },
  {
    title: "Radical transparency",
    description: "Customers see our roadmaps, telemetry and incident reports in real time.",
    icon: Zap,
  },
]

export default function About() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How it works", href: "/how-it-works" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "About", href: "/about", active: true },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#040b05] via-[#0b1c11] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#081408] via-[#0f2b14] to-[#081408]">
        <div className="container flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">SunTrack</p>
              <p className="text-lg font-semibold text-white">Studio</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={`transition ${link.active ? "text-white" : "hover:text-white"}`}
              >
                {link.label}
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
              className="hidden bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-black shadow-lg shadow-emerald-400/30 md:inline-flex"
            >
              <Link href="/dashboard">Explore dashboard</Link>
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
              className="absolute inset-x-4 top-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#081409] to-[#123016] p-6 shadow-2xl"
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
                  href="/dashboard"
                  onClick={() => setMobileNavOpen(false)}
                  className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-center font-semibold text-white"
                >
                  Explore dashboard
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1">
        <section className="relative overflow-hidden pb-20 pt-16">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,255,183,0.18),_rgba(5,11,5,0)_60%)]" />
          <div className="container relative grid gap-12 lg:grid-cols-2">
            <motion.div {...fade(0)} className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
                About us
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">
                We choreograph sunlight, software and people
              </h1>
              <p className="text-lg text-white/80">
                SunTrack is the flagship product of Solaria, a collective of engineers, designers and field operators
                who have shipped more than 8 GW of solar capacity worldwide. We set out to turn industrial control rooms
                into immersive, trusted experiences.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { label: "Founded", value: "2025" },
                  { label: "Team", value: "48 experts" },
                  { label: "GW optimized", value: "4.5+" },
                  { label: "Markets", value: "14 regions" },
                ].map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.35em] text-white/60">{stat.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-white">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fade(0.15)}
              className="relative rounded-[32px] border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-3xl"
            >
              <div className="absolute -left-8 top-10 hidden h-32 w-32 rounded-full bg-emerald-400/30 blur-3xl md:block" />
              <div className="absolute -right-10 bottom-6 hidden h-32 w-32 rounded-full bg-lime-400/30 blur-3xl md:block" />
              <div className="relative space-y-4">
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">Studio snapshot</p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">Craft disciplines</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {[
                      { label: "Systems & AI", value: "18 people" },
                      { label: "Design & research", value: "12 people" },
                      { label: "Field ops", value: "9 people" },
                      { label: "Customer labs", value: "9 people" },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60">Offices</p>
                  <p className="text-lg text-white">Baku · Berlin · San Francisco</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20 text-slate-900">
          <div className="container space-y-12">
            <motion.div {...fade(0)} className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Values</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Principles that anchor every decision</h2>
              <p className="mt-3 max-w-2xl mx-auto text-lg text-slate-600">
                We write these principles on the walls of our lab, our dashboards and our contracts.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  {...fade(index * 0.05)}
                  className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-xl shadow-emerald-50/80"
                >
                  <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 text-2xl font-semibold text-slate-900">{value.title}</h3>
                  <p className="mt-3 text-slate-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fade(0)} className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Story</p>
              <h2 className="text-3xl font-bold">A timeline of bold bets</h2>
              <div className="space-y-4">
                {[
                  { year: "2025", detail: "Launched SunTrack after building bespoke trackers for microgrids in Azerbaijan." },
                  { year: "2026", detail: "Opened the Solar Interaction Lab to prototype immersive operational tooling." },
                  { year: "2027", detail: "Expanded to utility-scale fleets and introduced predictive maintenance." },
                  { year: "2028", detail: "Partnered with grid operators to co-design demand-response intelligence." },
                ].map((item) => (
                  <div key={item.year} className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-100/50">
                    <p className="text-sm font-semibold text-emerald-700">{item.year}</p>
                    <p className="text-slate-600">{item.detail}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              {...fade(0.1)}
              className="rounded-[32px] border border-emerald-100 bg-white/90 p-6 shadow-2xl shadow-emerald-100/80"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">Contact</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">Start a conversation</h3>
              <div className="mt-6 space-y-4">
                {[
                  {
                    icon: MapPin,
                    title: "Sunnyvale HQ",
                    detail: "123 Solar Way · Sunnyvale, CA 94086 · USA",
                  },
                  {
                    icon: Mail,
                    title: "Write us",
                    detail: "hello@suntrack.energy · partnerships@suntrack.energy",
                  },
                  {
                    icon: Phone,
                    title: "Talk to us",
                    detail: "+1 (555) 123-4567 · Mon–Fri · 9am–5pm PT",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm">
                    <item.icon className="mt-1 h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="text-sm text-slate-600">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form className="mt-8 space-y-3">
                {[
                  { label: "Name", type: "text", id: "contact-name" },
                  { label: "Email", type: "email", id: "contact-email" },
                ].map((field) => (
                  <div key={field.id}>
                    <label htmlFor={field.id} className="text-sm font-medium text-slate-600">
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      type={field.type}
                      className="mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    />
                  </div>
                ))}
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-slate-600">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder="Tell us about your fleet, challenges or goals."
                  />
                </div>
                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-500">Send message</Button>
              </form>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#050c05] py-10 text-white/70">
        <div className="container flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Sun className="h-6 w-6 text-yellow-400" />
            <div>
              <p className="font-semibold text-white">SunTrack</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">About</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {["Home", "How it works", "Dashboard"].map((item) => (
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