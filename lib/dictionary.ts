import "server-only"
import type { Locale } from "@/i18n.config"

// Import dictionaries statically to avoid dynamic import issues
import enDict from "@/dictionaries/en.json"
import arDict from "@/dictionaries/ar.json"

const dictionaries = {
  en: enDict,
  ar: arDict,
}

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale]
}
