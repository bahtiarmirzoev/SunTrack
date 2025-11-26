import type { ReactNode } from "react"
import { notFound } from "next/navigation"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LocaleProvider } from "@/components/locale-provider"
import { getDictionary } from "@/lib/get-dictionary"
import { i18n, type Locale } from "@/lib/i18n-config"
import "../globals.css"

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: Locale }
}) {
  const { locale } = params

  if (!i18n.locales.includes(locale)) {
    notFound()
  }

  const dictionary = await getDictionary(locale)

  return (
    <html
      lang={locale}
      style={{
        fontFamily: GeistSans.style.fontFamily,
      }}
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <LocaleProvider locale={locale} dictionary={dictionary}>
          {children}
        </LocaleProvider>
      </body>
    </html>
  )
}

