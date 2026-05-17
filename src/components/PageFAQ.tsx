import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { JsonLd } from "./JsonLd";

export interface FAQItem {
  q: string;
  a: string;
}

interface PageFAQProps {
  id: string;
  title: string;
  items: FAQItem[];
}

export function PageFAQ({ id, title, items }: PageFAQProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };

  return (
    <section className="mt-16 max-w-3xl mx-auto">
      <JsonLd id={`faq-${id}`} data={jsonLd} />
      <h2 className="text-2xl font-bold text-foreground mb-6 text-center">{title}</h2>
      <Accordion type="single" collapsible className="space-y-2">
        {items.map((faq, i) => (
          <AccordionItem
            key={i}
            value={`faq-${id}-${i}`}
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
  );
}
