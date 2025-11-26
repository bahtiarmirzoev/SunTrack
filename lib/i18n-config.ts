export const i18n = {
  defaultLocale: "en",
  locales: ["az", "ru", "en"] as const,
}

export type Locale = (typeof i18n)["locales"][number]

