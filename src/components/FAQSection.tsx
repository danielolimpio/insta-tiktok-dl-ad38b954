import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "Como baixar vídeo do TikTok sem marca d'água?", a: "Cole o link do vídeo do TikTok no campo acima, clique em Baixar Agora e escolha o formato. Nosso TikTok downloader remove a marca d'água automaticamente, entregando o vídeo original em MP4 HD." },
  { q: "O TikTok downloader é realmente grátis e ilimitado?", a: "Sim! O TikDown é um baixador de vídeos do TikTok 100% gratuito, sem cadastro e sem limite diário. Você pode baixar vídeo do TikTok, salvar áudio em MP3 e remover marca d'água quantas vezes quiser." },
  { q: "Como baixar áudio do TikTok em MP3?", a: "Cole o link do vídeo, clique em Baixar Agora e selecione a opção MP3. Você poderá baixar o som do TikTok em alta qualidade — ideal para ringtones, edições de vídeo e coleções musicais." },
  { q: "Como salvar vídeo do TikTok no Android e iPhone?", a: "Abra o TikTok, copie o link, acesse baixarvideostiktok.com pelo navegador do celular, cole o link e toque em Baixar Agora. Funciona em iPhone (iOS) e Android sem instalar nenhum aplicativo." },
  { q: "Funciona no PC com Windows, Mac e Linux?", a: "Sim! Nosso TikTok downloader online é 100% baseado em navegador. Funciona em Windows, Mac e Linux — basta colar o link e baixar TikTok em MP4 HD diretamente para o computador." },
  { q: "Qual é a qualidade dos vídeos baixados?", a: "Mantemos a qualidade original do vídeo, com suporte a downloads em até 1080p Full HD. Se o criador postou em alta resolução, você recebe o arquivo na mesma qualidade, sem compressão adicional." },
  { q: "Como tirar a marca d'água do TikTok online?", a: "Para remover a marca d'água do TikTok, cole o link do vídeo e clique em Baixar Agora. O sistema processa o vídeo automaticamente e entrega a versão limpa, sem o logo do TikTok, em MP4 HD." },
  { q: "É seguro baixar vídeos do TikTok pelo TikDown?", a: "Sim. O processamento é feito de forma segura e não armazenamos seus vídeos nem dados pessoais. Recomendamos respeitar os direitos autorais e usar os downloads para fins pessoais." },
];

export function FAQSection() {
  return (
    <section className="w-full max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground text-center mb-8">
        Perguntas Frequentes sobre o TikTok Downloader
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
