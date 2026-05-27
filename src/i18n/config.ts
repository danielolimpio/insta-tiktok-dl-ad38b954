export const LOCALES = ["en", "pt", "id", "es", "hi", "tr"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";
export const SITE_URL = "https://baixarvideostiktok.com";

export const LOCALE_META: Record<Locale, { bcp47: string; ogLocale: string; label: string; flag: string; dir: "ltr" | "rtl" }> = {
  en: { bcp47: "en-US", ogLocale: "en_US", label: "English", flag: "🇺🇸", dir: "ltr" },
  pt: { bcp47: "pt-BR", ogLocale: "pt_BR", label: "Português", flag: "🇧🇷", dir: "ltr" },
  id: { bcp47: "id-ID", ogLocale: "id_ID", label: "Bahasa Indonesia", flag: "🇮🇩", dir: "ltr" },
  es: { bcp47: "es-MX", ogLocale: "es_MX", label: "Español", flag: "🇲🇽", dir: "ltr" },
  hi: { bcp47: "hi-IN", ogLocale: "hi_IN", label: "हिन्दी", flag: "🇮🇳", dir: "ltr" },
  tr: { bcp47: "tr-TR", ogLocale: "tr_TR", label: "Türkçe", flag: "🇹🇷", dir: "ltr" },
};

/** Returns the URL path for a given locale (Portuguese is the root). */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Returns absolute canonical URL for a locale's home page. */
export function localeUrl(locale: Locale): string {
  return `${SITE_URL}${localePath(locale)}`;
}
