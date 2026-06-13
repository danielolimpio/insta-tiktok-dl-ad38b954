import { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link as LinkIcon, Clipboard, X, Download, Loader2, Sparkles, Shield, Zap, Music, FileVideo, UserX } from "lucide-react";
import { toast } from "sonner";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO, type HreflangAlternate } from "@/components/SEO";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { JsonLd } from "@/components/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { LOCALES, LOCALE_META, SITE_URL, localePath, localeUrl, type Locale } from "@/i18n/config";
import { T } from "@/i18n/translations";

const HISTORY_KEY = "tikdown_history";
function saveToHistory(video: VideoInfo) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: VideoInfo[] = raw ? JSON.parse(raw) : [];
    if (!history.some((v) => v.id === video.id)) {
      history.unshift(video);
      if (history.length > 50) history.pop();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  } catch {}
}

const FEATURE_ICONS = [Sparkles, FileVideo, Music, Zap, UserX, Shield];

interface LocalizedHomeProps {
  locale: Locale;
}

const LocalizedHome = ({ locale }: LocalizedHomeProps) => {
  const t = T[locale];
  const meta = LOCALE_META[locale];
  const canonical = localeUrl(locale);

  const alternates: HreflangAlternate[] = [
    ...LOCALES.map((l) => ({ hreflang: LOCALE_META[l].bcp47, href: localeUrl(l) })),
    { hreflang: "x-default", href: `${SITE_URL}/` },
  ];

  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const isValidTikTokUrl = (u: string) =>
    /^https?:\/\/(www\.|vm\.|vt\.)?tiktok\.com\/.+/i.test(u.trim());

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {}
  };

  const handleSubmit = async () => {
    if (!url.trim() || !isValidTikTokUrl(url)) {
      toast.error("Invalid TikTok link");
      return;
    }
    setIsLoading(true);
    setVideos([]);
    try {
      const v = await fetchTikTokVideo(url.trim());
      setVideos([v]);
      saveToHistory(v);
    } catch (e: any) {
      toast.error(e?.message || "Error");
    } finally {
      setIsLoading(false);
    }
  };

  // Schema.org JSON-LD
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TikDown",
    url: canonical,
    inLanguage: meta.bcp47,
    description: t.description,
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: meta.bcp47,
    mainEntity: t.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: meta.bcp47,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TikDown", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: t.heroTitle, item: canonical },
    ],
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title={t.title}
        description={t.description}
        keywords={t.keywords}
        canonical={canonical}
        ogLocale={meta.ogLocale}
        htmlLang={meta.bcp47}
        alternates={alternates}
      />
      <JsonLd id={`website-${locale}`} data={websiteSchema} />
      <JsonLd id={`faq-${locale}`} data={faqSchema} />
      <JsonLd id={`breadcrumb-${locale}`} data={breadcrumbSchema} />

      <AppSidebar />

      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />



        <main className="flex-1 px-4 sm:px-8 py-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              {t.heroBadge}
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              {t.heroTitle}{" "}
              <span className="text-gradient-tiktok">{t.heroTitleAccent}</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              {t.heroSubtitle}
            </p>
          </motion.div>

          {/* Localized URL input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full max-w-3xl mx-auto"
          >
            <div className="flex flex-col gap-3 sm:relative sm:block">
              <div className="pointer-events-none absolute left-4 top-4 hidden text-muted-foreground sm:block">
                <LinkIcon className="w-5 h-5" />
              </div>
              <div className="relative">
                <div className="absolute left-4 top-4 text-muted-foreground sm:hidden">
                  <LinkIcon className="w-5 h-5" />
                </div>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                  placeholder={t.inputPlaceholder}
                  className="w-full h-14 rounded-xl border-2 border-border bg-background pl-12 pr-4 text-sm text-foreground placeholder:text-muted-foreground transition-colors duration-300 focus:border-tiktok-cyan focus:outline-none sm:pr-44"
                  aria-label={t.inputPlaceholder}
                />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:absolute sm:right-3 sm:top-1/2 sm:flex sm:-translate-y-1/2 sm:items-center sm:gap-1.5">
                <button
                  onClick={handlePaste}
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                >
                  <Clipboard className="w-3.5 h-3.5" />
                  {t.pasteBtn}
                </button>
                {url.length > 0 && (
                  <button
                    onClick={() => setUrl("")}
                    className="flex items-center justify-center gap-1.5 rounded-lg bg-muted px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-3.5 h-3.5" />
                    {t.clearBtn}
                  </button>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isLoading}
              className="mt-4 w-full h-14 rounded-xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2 hover:opacity-90 transition-all duration-300 disabled:opacity-60"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
              {isLoading ? t.ctaProcessing : t.ctaDownload}
            </motion.button>
          </motion.div>

          {/* Results */}
          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">{t.resultsTitle}</h2>
              <div className="space-y-3">
                {videos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </motion.section>
          )}

          {/* How it works */}
          <section className="mt-20 max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              {t.howItWorksTitle}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {t.steps.map((s, i) => (
                <div key={i} className="p-6 rounded-xl border border-border bg-card text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan flex items-center justify-center font-bold">
                    {i + 1}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mt-20 max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8 text-center">
              {t.featuresTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {t.features.map((f, i) => {
                const Icon = FEATURE_ICONS[i % FEATURE_ICONS.length];
                return (
                  <div key={i} className="p-5 rounded-xl border border-border bg-card">
                    <Icon className="w-6 h-6 text-tiktok-cyan mb-2" />
                    <h3 className="font-semibold text-foreground mb-1">{f.title}</h3>
                    <p className="text-sm text-muted-foreground">{f.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mt-20 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 text-center">
              {t.faqTitle}
            </h2>
            <Accordion type="single" collapsible className="space-y-2">
              {t.faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${locale}-${i}`}
                  className="border border-border rounded-xl px-4 data-[state=open]:border-tiktok-cyan/30"
                >
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4 text-left">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          {/* Footer tagline */}
          <p className="text-center text-xs text-muted-foreground mt-16">{t.footerTagline}</p>
        </main>

        <Footer />
      </div>
    </div>
  );
};

/** Wrapper used by the /:lang route — validates the param and redirects unknown locales. */
export const LocalizedHomeRoute = () => {
  const { lang } = useParams<{ lang: string }>();
  const isValid = LOCALES.includes(lang as Locale);
  if (!isValid) return <Navigate to="/" replace />;
  return <LocalizedHome key={lang} locale={lang as Locale} />;
};

export default LocalizedHome;
