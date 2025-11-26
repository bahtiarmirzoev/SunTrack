import { type Locale } from "./i18n-config"

const dictionaries = {
  en: () => import("./dictionaries/en").then((module) => module.default),
  az: () => import("./dictionaries/az").then((module) => module.default),
  ru: () => import("./dictionaries/ru").then((module) => module.default),
} as const

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["en"]>>

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  const dictionaryLoader = dictionaries[locale]
  if (!dictionaryLoader) {
    return dictionaries.en()
  }
  return dictionaryLoader()
}

