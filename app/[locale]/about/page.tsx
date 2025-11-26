"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Sun, Mail, MapPin, Phone, Award, Users, Leaf, Zap, Menu, X } from "lucide-react"
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

const VALUE_ICONS = {
  sustainability: Leaf,
  humanCentered: Users,
  inventiveSpirit: Award,
  transparency: Zap,
} as const

const VALUE_KEYS = ["sustainability", "humanCentered", "inventiveSpirit", "transparency"] as const

const CONTACT_ICONS = {
  hq: MapPin,
  email: Mail,
  phone: Phone,
} as const

const CONTACT_KEYS = ["hq", "email", "phone"] as const

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay },
  viewport: { once: true, amount: 0.4 },
})

export default function About() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const { locale } = useI18n()
  const common = useTranslations("common") as DictionaryShape["common"]
  const about = useTranslations("about") as DictionaryShape["about"]

  const navLinks = NAV_ITEMS.map((item) => ({
    label: common.nav[item.key],
    href: toLocalePath(locale, item.path),
    active: item.key === "about",
  }))

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-[#040b05] via-[#0b1c11] to-white text-white">
      <header className="border-b border-white/10 bg-gradient-to-r from-[#081408] via-[#0f2b14] to-[#081408]">
        <div className="container flex items-center justify-between py-5">
          <Link href={toLocalePath(locale, "/")} className="flex items-center gap-3">
            <div className="rounded-full bg-white/10 p-2">
              <Sun className="h-6 w-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-200/70">{about.header.tagline}</p>
              <p className="text-lg font-semibold text-white">{about.header.title}</p>
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
              aria-label={common.menu.open}
              className="rounded-full border border-white/20 bg-white/10 p-2 text-white md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <LanguageSwitcher />
            <Button
              asChild
              className="hidden bg-gradient-to-r from-emerald-400 via-lime-300 to-yellow-300 text-black shadow-lg shadow-emerald-400/30 md:inline-flex"
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
              className="absolute inset-x-4 top-4 rounded-3xl border border-white/10 bg-gradient-to-br from-[#081409] to-[#123016] p-6 shadow-2xl"
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(143,255,183,0.18),_rgba(5,11,5,0)_60%)]" />
          <div className="container relative grid gap-12 lg:grid-cols-2">
            <motion.div {...fade(0)} className="space-y-6">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/70">
                {about.hero.badge}
              </span>
              <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl">{about.hero.title}</h1>
              <p className="text-lg text-white/80">{about.hero.description}</p>
              <div className="grid gap-4 sm:grid-cols-2">
                {about.hero.stats.map((stat) => (
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
                <p className="text-xs uppercase tracking-[0.35em] text-white/70">{about.snapshot.label}</p>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/50">{about.snapshot.disciplinesLabel}</p>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    {about.snapshot.disciplines.map((item) => (
                      <div key={item.label} className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <p className="text-xs uppercase tracking-[0.3em] text-white/50">{item.label}</p>
                        <p className="mt-2 text-lg font-semibold text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm uppercase tracking-[0.35em] text-white/60">{about.snapshot.officesLabel}</p>
                  <p className="text-lg text-white">{about.snapshot.officesValue}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-white py-20 text-slate-900">
          <div className="container space-y-12">
            <motion.div {...fade(0)} className="text-center">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{about.principles.kicker}</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">{about.principles.title}</h2>
              <p className="mt-3 mx-auto max-w-2xl text-lg text-slate-600">{about.principles.description}</p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {VALUE_KEYS.map((key, index) => {
                const value = about.principles.values[key]
                const Icon = VALUE_ICONS[key]
                return (
                  <motion.div
                    key={key}
                    {...fade(index * 0.05)}
                    className="rounded-3xl border border-slate-100 bg-white/80 p-6 shadow-xl shadow-emerald-50/80"
                  >
                    <div className="inline-flex rounded-full bg-emerald-50 p-3 text-emerald-700">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900">{value.title}</h3>
                    <p className="mt-3 text-slate-600">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-b from-white to-emerald-50 py-20 text-slate-900">
          <div className="container grid gap-10 md:grid-cols-[1.1fr_0.9fr]">
            <motion.div {...fade(0)} className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{about.story.kicker}</p>
              <h2 className="text-3xl font-bold">{about.story.title}</h2>
              <div className="space-y-4">
                {about.story.timeline.map((item) => (
                  <div
                    key={item.year}
                    className="rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm shadow-emerald-100/50"
                  >
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
              <p className="text-sm uppercase tracking-[0.35em] text-emerald-600">{about.contact.kicker}</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-900">{about.contact.title}</h3>
              <div className="mt-6 space-y-4">
                {CONTACT_KEYS.map((key) => {
                  const card = about.contact.cards[key]
                  const Icon = CONTACT_ICONS[key]
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-4 rounded-2xl border border-emerald-100 bg-white p-4 shadow-sm"
                    >
                      <Icon className="mt-1 h-5 w-5 text-emerald-600" />
                      <div>
                        <p className="font-semibold text-slate-900">{card.title}</p>
                        <p className="text-sm text-slate-600">{card.detail}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <form className="mt-8 space-y-3">
                <div>
                  <label htmlFor="contact-name" className="text-sm font-medium text-slate-600">
                    {about.contact.form.nameLabel}
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="text-sm font-medium text-slate-600">
                    {about.contact.form.emailLabel}
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label htmlFor="contact-message" className="text-sm font-medium text-slate-600">
                    {about.contact.form.messageLabel}
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    className="mt-1 w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-slate-900 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-100"
                    placeholder={about.contact.form.messagePlaceholder}
                  />
                </div>
                <Button className="w-full bg-emerald-600 text-white hover:bg-emerald-500">
                  {about.contact.form.submit}
                </Button>
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
              <p className="font-semibold text-white">{common.brand.name}</p>
              <p className="text-xs uppercase tracking-[0.35em] text-white/40">{about.footerTagline}</p>
            </div>
          </div>
          <div className="flex gap-6 text-sm">
            {NAV_ITEMS.filter((item) => item.key !== "about").map((item) => (
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
