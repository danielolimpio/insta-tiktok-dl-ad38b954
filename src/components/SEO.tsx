import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogType?: string;
  ogImage?: string;
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

export function SEO({ title, description, canonical, keywords, ogType, ogImage }: SEOProps) {
  useEffect(() => {
    document.title = title;
    setMeta("description", description);
    setMeta("keywords", keywords ?? "");
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", ogType ?? "website", "property");
    setMeta("og:image", ogImage ?? "", "property");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage ?? "", "name");
    if (canonical) {
      setCanonical(canonical);
      setMeta("og:url", canonical, "property");
    } else {
      setMeta("og:url", "", "property");
    }
  }, [title, description, canonical, keywords, ogType, ogImage]);

  return null;
}
