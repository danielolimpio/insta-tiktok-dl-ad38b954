import { useEffect } from "react";

export interface HreflangAlternate {
  hreflang: string;
  href: string;
}

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
  ogLocale?: string;
  htmlLang?: string;
  /** Hreflang alternates including x-default. Self-referencing entry is allowed and recommended. */
  alternates?: HreflangAlternate[];
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  if (!content) {
    const el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
    if (el) el.remove();
    return;
  }
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

const MANAGED_ALTERNATE_ATTR = "data-managed-alt";

function setAlternates(alternates: HreflangAlternate[]) {
  // Remove static hreflang alternates from index.html and any previously managed ones
  document.head
    .querySelectorAll<HTMLLinkElement>('link[rel="alternate"][hreflang]')
    .forEach((el) => el.remove());

  alternates.forEach(({ hreflang, href }) => {
    const link = document.createElement("link");
    link.setAttribute("rel", "alternate");
    link.setAttribute("hreflang", hreflang);
    link.setAttribute("href", href);
    link.setAttribute(MANAGED_ALTERNATE_ATTR, "true");
    document.head.appendChild(link);
  });
}

export function SEO({
  title,
  description,
  canonical,
  keywords,
  ogType,
  ogImage,
  ogLocale,
  htmlLang,
  alternates,
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    if (htmlLang) document.documentElement.lang = htmlLang;
    setMeta("description", description);
    setMeta("keywords", keywords ?? "");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType ?? "website", "property");
    setMeta("og:image", ogImage ?? "", "property");
    setMeta("og:locale", ogLocale ?? "", "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage ?? "", "name");
    if (canonical) {
      setCanonical(canonical);
      setMeta("og:url", canonical, "property");
    } else {
      setMeta("og:url", "", "property");
    }
    if (alternates && alternates.length > 0) {
      setAlternates(alternates);
    }
  }, [title, description, canonical, keywords, ogType, ogImage, ogLocale, htmlLang, alternates]);

  return null;
}
