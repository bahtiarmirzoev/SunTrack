import type { Locale } from "./i18n-config"

export function toLocalePath(locale: Locale, path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`
  if (normalized === "/" || normalized === "") {
    return `/${locale}`
  }
  return `/${locale}${normalized === "/" ? "" : normalized}`
}


