export const LOCALES = ["en", "id", "pt", "es", "ur", "fil", "ru", "bn", "ar", "vi"] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pt";
export const SITE_URL = "https://baixarvideostiktok.com";

export const LOCALE_META: Record<Locale, { bcp47: string; ogLocale: string; label: string; flag: string; dir: "ltr" | "rtl" }> = {
  en:  { bcp47: "en-US", ogLocale: "en_US", label: "English",     flag: "🇺🇸", dir: "ltr" },
  id:  { bcp47: "id-ID", ogLocale: "id_ID", label: "Indonesia",   flag: "🇮🇩", dir: "ltr" },
  pt:  { bcp47: "pt-BR", ogLocale: "pt_BR", label: "Português",   flag: "🇧🇷", dir: "ltr" },
  es:  { bcp47: "es-MX", ogLocale: "es_MX", label: "Español",     flag: "🇲🇽", dir: "ltr" },
  ur:  { bcp47: "ur-PK", ogLocale: "ur_PK", label: "اردو",        flag: "🇵🇰", dir: "rtl" },
  fil: { bcp47: "fil-PH", ogLocale: "fil_PH", label: "Filipino",  flag: "🇵🇭", dir: "ltr" },
  ru:  { bcp47: "ru-RU", ogLocale: "ru_RU", label: "Русский",     flag: "🇷🇺", dir: "ltr" },
  bn:  { bcp47: "bn-BD", ogLocale: "bn_BD", label: "বাংলা",        flag: "🇧🇩", dir: "ltr" },
  ar:  { bcp47: "ar-SA", ogLocale: "ar_SA", label: "العربية",     flag: "🇸🇦", dir: "rtl" },
  vi:  { bcp47: "vi-VN", ogLocale: "vi_VN", label: "Tiếng Việt",  flag: "🇻🇳", dir: "ltr" },
};

/** Returns the URL path for a given locale (Portuguese is the root). */
export function localePath(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "/" : `/${locale}`;
}

/** Returns absolute canonical URL for a locale's home page. */
export function localeUrl(locale: Locale): string {
  return `${SITE_URL}${localePath(locale)}`;
}
