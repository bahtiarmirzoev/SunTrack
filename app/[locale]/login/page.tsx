"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sun, ShieldCheck, Sparkles, Fingerprint, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n, useTranslations } from "@/components/locale-provider"
import { toLocalePath } from "@/lib/locale-path"
import { LanguageSwitcher } from "@/components/language-switcher"

type LoginPayload = {
  email: string
  password: string
}

type DictionaryShape = typeof import("@/lib/dictionaries/en").default

const FEATURE_ICONS = {
  zeroTrust: ShieldCheck,
  hardwareKeys: Fingerprint,
  cinematicUi: Sparkles,
} as const

const FEATURE_KEYS = ["zeroTrust", "hardwareKeys", "cinematicUi"] as const

export default function LoginPage() {
  const router = useRouter()
  const { locale } = useI18n()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useTranslations("login") as DictionaryShape["login"]

  const validate = (payload: LoginPayload) => {
    if (!payload.email) return login.form.validation.emailRequired
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(payload.email)) return login.form.validation.emailInvalid
    if (!payload.password) return login.form.validation.passwordRequired
    if (payload.password.length < 6) return login.form.validation.passwordLength
    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const payload: LoginPayload = { email: email.trim(), password }
    const validationError = validate(payload)
    if (validationError) {
      setError(validationError)
      return
    }

    setLoading(true)
    setTimeout(() => {
      router.push(toLocalePath(locale, "/dashboard"))
    }, 500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020705] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(82,255,183,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        <div className="absolute top-6 right-6 z-10">
          <LanguageSwitcher />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col justify-between rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_30px_100px_rgba(12,42,23,0.45)] backdrop-blur-3xl"
        >
          <div>
            <Link href={toLocalePath(locale, "/")} className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2">
                <Sun className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">{login.hero.tagline}</p>
                <p className="text-lg font-semibold text-white">{login.hero.label}</p>
              </div>
            </Link>
            <div className="mt-10 space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">{login.hero.title}</h1>
              <p className="text-white/80">{login.hero.description}</p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            {FEATURE_KEYS.map((key) => {
              const feature = login.features[key]
              const Icon = FEATURE_ICONS[key]
              return (
                <div key={key} className="flex items-start gap-3">
                  <Icon className="mt-1 h-4 w-4 text-emerald-300" />
                  <div>
                    <p className="text-sm font-semibold text-white">{feature.title}</p>
                    <p className="text-sm text-white/70">{feature.copy}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            {login.metrics.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between">
                <span>{stat.label}</span>
                <span className="font-semibold text-white">{stat.value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md self-center rounded-[32px] border border-white/10 bg-white/95 shadow-[0_20px_120px_rgba(12,42,23,0.25)]"
        >
          <Card className="border-0 bg-transparent shadow-none">
            <CardHeader className="px-8 pt-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                <Lock className="h-3.5 w-3.5" /> {login.card.badge}
              </div>
              <CardTitle className="mt-4 text-3xl text-[#0d2a12]">{login.card.title}</CardTitle>
              <p className="text-sm text-gray-500">{login.card.subtitle}</p>
            </CardHeader>

            <CardContent className="px-8 pb-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="mb-1 block text-sm font-medium text-gray-700">
                    {login.form.emailLabel}
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-60"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                      outlineColor: "rgba(26,67,10,1)",
                    }}
                    aria-required
                  />
                </div>

                <div>
                  <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700">
                    {login.form.passwordLabel}
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-md border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-opacity-60"
                    style={{
                      borderColor: "rgba(0,0,0,0.1)",
                      boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                      outlineColor: "rgba(26,67,10,1)",
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={showPassword}
                      onChange={(e) => setShowPassword(e.target.checked)}
                      className="accent-[rgba(26,67,10,1)]"
                    />
                    <span className="text-gray-600">{login.form.showPassword}</span>
                  </label>

                  <Link href={login.form.forgotPasswordHref} className="text-sm font-medium text-emerald-700">
                    {login.form.forgotPassword}
                  </Link>
                </div>

                {error && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-2xl bg-gradient-to-r from-emerald-600 via-lime-500 to-yellow-300 py-6 text-base font-semibold text-black shadow-[0_15px_40px_rgba(47,197,112,0.35)] transition hover:opacity-90"
                  >
                    {loading ? login.form.ctaLoading : login.form.cta}
                  </Button>
                </div>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 px-8 pb-8">
              <div className="flex flex-col gap-3 text-sm text-gray-500">
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                  <p>{login.connections.sso}</p>
                  <Globe className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                  <p>{login.connections.keys}</p>
                  <Lock className="h-4 w-4 text-emerald-600" />
                </div>
                <div className="text-center">
                  {login.connections.noAccount}{" "}
                  <Link href={login.connections.requestAccessHref} className="font-semibold text-emerald-600">
                    {login.connections.requestAccess}
                  </Link>
                </div>
              </div>
              <p className="text-center text-xs text-gray-400">
                © {new Date().getFullYear()} {login.footerNote}
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

