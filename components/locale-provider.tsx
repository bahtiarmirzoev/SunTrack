"use client"

import { createContext, useContext } from "react"
import type { Locale } from "@/lib/i18n-config"
import type { Dictionary } from "@/lib/get-dictionary"

type LocaleContextValue = {
  locale: Locale
  dictionary: Dictionary
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

type LocaleProviderProps = {
  children: React.ReactNode
  locale: Locale
  dictionary: Dictionary
}

export function LocaleProvider({ children, locale, dictionary }: LocaleProviderProps) {
  return <LocaleContext.Provider value={{ locale, dictionary }}>{children}</LocaleContext.Provider>
}

export function useI18n() {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error("useI18n must be used within LocaleProvider")
  }
  return context
}

export function useTranslations<T extends keyof Dictionary>(section?: T): Dictionary[T] | Dictionary {
  const { dictionary } = useI18n()
  if (!section) {
    return dictionary
  }
  return dictionary[section]
}

