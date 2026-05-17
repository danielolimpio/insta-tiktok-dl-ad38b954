import { useEffect } from "react";

interface JsonLdProps {
  id: string;
  data: Record<string, any> | Record<string, any>[];
}

export function JsonLd({ id, data }: JsonLdProps) {
  useEffect(() => {
    const safeId = id.replace(/[^a-zA-Z0-9_-]/g, "_");
    const scriptId = `jsonld-${safeId}`;
    let el = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement("script");
      el.type = "application/ld+json";
      el.id = scriptId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      const node = document.getElementById(scriptId);
      if (node) node.remove();
    };
  }, [id, data]);
  return null;
}
