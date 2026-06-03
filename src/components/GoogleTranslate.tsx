import { useEffect, useRef } from "react";
import { Globe } from "lucide-react";

const languages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
  { code: "it", label: "Italiano" },
  { code: "id", label: "Indonesia" },
  { code: "tr", label: "Türkçe" },
  { code: "hi", label: "हिन्दी" },
  { code: "ar", label: "العربية" },
  { code: "ja", label: "日本語" },
  { code: "ko", label: "한국어" },
  { code: "zh-CN", label: "中文" },
  { code: "ru", label: "Русский" },
];

export function GoogleTranslate() {
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    // @ts-ignore
    if (window.google && window.google.translate) {
      // @ts-ignore
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "pt",
          includedLanguages: languages.map((l) => l.code).join(","),
          layout:
            // @ts-ignore
            window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    }
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    // @ts-ignore
    window.googleTranslateElementInit = () => {
      // @ts-ignore
      if (window.google && window.google.translate) {
        // @ts-ignore
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "pt",
            includedLanguages: languages.map((l) => l.code).join(","),
            layout:
              // @ts-ignore
              window.google.translate.TranslateElement.InlineLayout.SIMPLE,
          },
          "google_translate_element"
        );
      }
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const lang = e.target.value;
    // @ts-ignore
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = lang;
      select.dispatchEvent(new Event("change"));
    }
  };

  return (
    <div className="relative flex items-center gap-2">
      <Globe className="w-4 h-4 text-muted-foreground" />
      <select
        ref={selectRef}
        onChange={handleChange}
        className="h-9 pl-2 pr-7 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-tiktok-cyan cursor-pointer appearance-none"
        defaultValue=""
      >
        <option value="" disabled>
          Idioma
        </option>
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
      {/* Hidden Google Translate container */}
      <div id="google_translate_element" className="hidden" />
    </div>
  );
}
