"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useI18n } from "@/components/locale-provider"
import { i18n } from "@/lib/i18n-config"
import { toLocalePath } from "@/lib/locale-path"

export function LanguageSwitcher() {
  const { locale, dictionary } = useI18n()
  const pathname = usePathname()

  // Extract current path without locale
  const pathWithoutLocale = pathname.replace(`/${locale}`, "") || "/"

  const currentLocaleName = dictionary.common.localeNames[locale]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 border border-white/20 bg-white/5 text-white backdrop-blur-sm hover:bg-white/10"
        >
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{currentLocaleName}</span>
          <span className="sm:hidden">{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        {i18n.locales.map((loc) => {
          const localeName = dictionary.common.localeNames[loc]
          const isActive = loc === locale
          return (
            <DropdownMenuItem key={loc} asChild>
              <Link
                href={toLocalePath(loc, pathWithoutLocale)}
                className={`flex items-center justify-between w-full ${
                  isActive ? "bg-emerald-50 text-emerald-700 font-semibold" : ""
                }`}
              >
                <span>{localeName}</span>
                {isActive && <span className="text-xs">✓</span>}
              </Link>
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

