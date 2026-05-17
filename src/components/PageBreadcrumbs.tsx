import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
import { JsonLd } from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface PageBreadcrumbsProps {
  items: BreadcrumbItem[];
}

const SITE = "https://baixarvideostiktok.com";

export function PageBreadcrumbs({ items }: PageBreadcrumbsProps) {
  const fullItems: BreadcrumbItem[] = [{ name: "Início", url: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE}${item.url === "/" ? "" : item.url}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="max-w-3xl mx-auto mb-4">
      <JsonLd id={`breadcrumb-${items.map((i) => i.url).join("-")}`} data={jsonLd} />
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap">
        {fullItems.map((item, i) => {
          const isLast = i === fullItems.length - 1;
          return (
            <li key={item.url} className="inline-flex items-center gap-1.5">
              {i === 0 && <Home className="w-3 h-3" />}
              {isLast ? (
                <span className="text-foreground font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link to={item.url} className="hover:text-tiktok-cyan transition-colors">
                  {item.name}
                </Link>
              )}
              {!isLast && <ChevronRight className="w-3 h-3" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
