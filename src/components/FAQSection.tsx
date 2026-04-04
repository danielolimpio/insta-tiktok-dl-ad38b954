import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "É grátis para baixar?", a: "Sim! Nossa ferramenta é 100% gratuita e sem limites de downloads. Você pode baixar quantos vídeos quiser." },
  { q: "Os vídeos têm marca d'água?", a: "Não! Todos os vídeos são baixados sem a marca d'água do TikTok, mantendo a qualidade original." },
  { q: "Qual a qualidade dos vídeos?", a: "Oferecemos download em várias qualidades: 1080p, 720p e 480p em formato MP4, além de áudio em MP3." },
  { q: "Funciona no celular?", a: "Sim! Nossa ferramenta é totalmente responsiva e funciona perfeitamente em smartphones e tablets." },
  { q: "Preciso criar uma conta?", a: "Não! Não é necessário nenhum cadastro ou login. Basta colar o link e baixar." },
];

export function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Perguntas Frequentes
      </h2>
      <Accordion type="single" collapsible className="space-y-2">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4 data-[state=open]:border-tiktok-cyan/30">
            <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4">
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
