import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Como baixar videos TikTok sem marca d'água?", a: "Cole o link do vídeo do TikTok no campo acima, clique em Baixar Agora e escolha a qualidade. Nossa ferramenta remove a marca d'água automaticamente, entregando o vídeo original em MP4 HD." },
  { q: "O baixador de videos TikTok é grátis?", a: "Sim! O TikDown é um baixador de videos TikTok 100% gratuito e sem limites. Você pode baixar videos do TikTok quantas vezes quiser, sem cadastro." },
  { q: "Como salvar video do TikTok no celular Android?", a: "Abra o TikTok, copie o link do vídeo, acesse nosso site pelo navegador do celular, cole o link e clique em Baixar Agora. O vídeo será salvo na pasta Downloads do Android sem marca d'água." },
  { q: "Funciona como app para baixar videos do TikTok?", a: "Sim! Embora não seja um aplicativo instalável, o TikDown funciona como app para baixar videos do TikTok diretamente pelo navegador, tanto no celular quanto no PC. Não precisa instalar nada." },
  { q: "Como tirar marca d'água do TikTok online?", a: "Para tirar a marca d'água do TikTok, basta colar o link do vídeo e clicar em Baixar Agora. O sistema remove automaticamente o logo do TikTok, sem necessidade de edição." },
];

export function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Perguntas Frequentes sobre Baixar Videos TikTok
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
