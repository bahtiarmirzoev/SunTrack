"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Sun, ShieldCheck, Sparkles, Fingerprint, Lock, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type LoginPayload = {
  email: string
  password: string
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const BRAND = "rgba(26,67,10,1)"
  const SOFT_BG = "rgba(26,67,10,0.06)"

  const validate = (payload: LoginPayload) => {
    if (!payload.email) return "Email is required."
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(payload.email)) return "Please enter a valid email address."
    if (!payload.password) return "Password is required."
    if (payload.password.length < 6) return "Password must be at least 6 characters."
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    const payload: LoginPayload = { email: email.trim(), password }

    const validationError = validate(payload)
    if (validationError) {
      setError(validationError)
      return
    }

    // No API call — just simulate login and redirect
    setLoading(true)
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#020705] text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(82,255,183,0.15),_transparent_60%)]" />
        <div className="absolute inset-0 bg-grid opacity-20" />
      </div>
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 lg:flex-row">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-1 flex-col justify-between rounded-[32px] border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-8 shadow-[0_30px_100px_rgba(12,42,23,0.45)] backdrop-blur-3xl"
        >
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="rounded-full bg-white/10 p-2">
                <Sun className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">SunTrack</p>
                <p className="text-lg font-semibold text-white">Operator access</p>
              </div>
            </Link>
            <div className="mt-10 space-y-4">
              <h1 className="text-4xl font-semibold leading-tight text-white md:text-5xl">
                Precision-grade access for control rooms
              </h1>
              <p className="text-white/80">
                SunTrack blends cinematic clarity with uncompromising security. Log in once, orchestrate fleets globally.
              </p>
            </div>
          </div>
          <div className="mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            {[
              { icon: ShieldCheck, title: "Zero-trust posture", copy: "Granular scopes, device trust and adaptive MFA." },
              { icon: Fingerprint, title: "Hardware keys ready", copy: "WebAuthn, FIDO2 and enterprise SSO baked in." },
              { icon: Sparkles, title: "Cinematic UI", copy: "Ambient motion keeps situational awareness calm and clear." },
            ].map((feature) => (
              <div key={feature.title} className="flex items-start gap-3">
                <feature.icon className="mt-1 h-4 w-4 text-emerald-300" />
                <div>
                  <p className="text-sm font-semibold text-white">{feature.title}</p>
                  <p className="text-sm text-white/70">{feature.copy}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
            {[
              { label: "Global latency", value: "<150 ms" },
              { label: "Session integrity", value: "99.999%" },
              { label: "Regions", value: "14 live" },
            ].map((stat) => (
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
                <Lock className="h-3.5 w-3.5" /> Secure portal
              </div>
              <CardTitle className="mt-4 text-3xl text-[#0d2a12]">Sign in to SunTrack</CardTitle>
              <p className="text-sm text-gray-500">
                Access fleet metrics, alerts and collaboration threads
              </p>
            </CardHeader>

            <CardContent className="px-8 pb-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-60"
                  style={{
                    borderColor: "rgba(0,0,0,0.1)",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                    outlineColor: BRAND,
                  }}
                  aria-required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-opacity-60"
                  style={{
                    borderColor: "rgba(0,0,0,0.1)",
                    boxShadow: "inset 0 1px 2px rgba(0,0,0,0.03)",
                    outlineColor: BRAND,
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
                  <span className="text-gray-600">Show password</span>
                </label>

                <Link href="/forgot-password" className="text-sm font-medium" style={{ color: BRAND }}>
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div
                  role="alert"
                  aria-live="assertive"
                  className="text-sm text-red-700 bg-red-50 px-3 py-2 rounded-md"
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
                  {loading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4 px-8 pb-8">
            <div className="flex flex-col gap-3 text-sm text-gray-500">
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <p>SSO • Azure AD · Okta · Google</p>
                <Globe className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50 px-3 py-2">
                <p>Hardware keys • YubiKey · Feitian</p>
                <Lock className="h-4 w-4 text-emerald-600" />
              </div>
              <div className="text-center">
                Don’t have an account?{" "}
                <Link href="/request-access" className="font-semibold text-emerald-600">
                  Request access
                </Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-400">© {new Date().getFullYear()} SunTrack</p>
          </CardFooter>
        </Card>
        </motion.div>
      </div>
    </div>
  )
}
