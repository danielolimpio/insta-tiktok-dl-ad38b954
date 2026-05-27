import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { LOCALES, LOCALE_META, SITE_URL, localePath, type Locale } from "@/i18n/config";

interface LanguageSwitcherProps {
  current: Locale;
  label: string;
}

export function LanguageSwitcher({ current, label }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 h-10 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
        aria-label={label}
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{LOCALE_META[current].label}</span>
        <span className="sm:hidden">{LOCALE_META[current].flag}</span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <ul className="absolute right-0 top-12 z-50 w-56 bg-card border border-border rounded-xl shadow-xl overflow-hidden">
            {LOCALES.map((l) => {
              const href = `${SITE_URL}${localePath(l)}`;
              const isCurrent = l === current;
              return (
                <li key={l}>
                  <a
                    href={href}
                    hrefLang={LOCALE_META[l].bcp47}
                    rel="alternate"
                    className="flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-muted transition-colors"
                  >
                    <span className="text-lg">{LOCALE_META[l].flag}</span>
                    <span className="flex-1 text-foreground">{LOCALE_META[l].label}</span>
                    {isCurrent && <Check className="w-4 h-4 text-tiktok-cyan" />}
                  </a>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
