import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { HelpCircle, Search } from "lucide-react";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  // Funcionamento Geral
  { cat: "Geral", q: "Como o TikDown consegue tirar marca d'água do TikTok?", a: "O TikDown acessa a versão original do vídeo diretamente dos servidores do TikTok, antes da aplicação da marca d'água. Isso permite remover marca d'água TikTok automaticamente, entregando o vídeo limpo em MP4 HD." },
  { cat: "Geral", q: "O baixador de videos TikTok armazena os vídeos?", a: "Não. O TikDown não armazena nenhum vídeo em seus servidores. A ferramenta apenas atua como intermediária para baixar videos do TikTok diretamente para o seu dispositivo." },
  { cat: "Geral", q: "Existe limite de tamanho para baixar videos TikTok?", a: "Não há limite de tamanho. No entanto, vídeos muito longos podem demorar mais para baixar dependendo da sua conexão com a internet." },
  { cat: "Geral", q: "Posso baixar videos do TikTok de contas privadas?", a: "Não. O baixador de videos TikTok só consegue acessar vídeos públicos. Vídeos de contas privadas não são suportados por questões de segurança e privacidade." },
  { cat: "Geral", q: "O TikDown funciona para baixar TikTok video de outros países?", a: "Sim! Você pode baixar videos do TikTok de qualquer país do mundo. Não há restrição geográfica para usar nosso baixador." },
  { cat: "Geral", q: "Posso baixar Stories do TikTok com este baixador?", a: "Atualmente suportamos apenas baixar videos TikTok publicados no feed. Stories e conteúdos temporários não são suportados devido às restrições de acesso do TikTok." },

  // Downloads e Formatos
  { cat: "Downloads", q: "Qual a melhor qualidade para baixar video do TikTok?", a: "1080p (Full HD) oferece a melhor qualidade para salvar video do TikTok, ideal para telas grandes. 720p é um bom equilíbrio entre qualidade e tamanho. 480p gera arquivos menores, perfeito para economizar espaço no celular." },
  { cat: "Downloads", q: "Como salvar TikTok em MP3 para ouvir músicas?", a: "Nosso baixador de videos TikTok oferece a opção de extrair apenas o áudio em MP3. Ideal para salvar TikTok músicas, podcasts ou efeitos sonoros virais." },
  { cat: "Downloads", q: "O formato MP4 do baixador funciona em todos os dispositivos?", a: "Sim. O MP4 é compatível com todos os dispositivos modernos. Você pode baixar video do TikTok e reproduzir em iPhones, Android, Windows, Mac e smart TVs." },
  { cat: "Downloads", q: "Posso baixar videos do TikTok em lote?", a: "Atualmente processamos um vídeo por vez. Para baixar varios, cole um novo link após cada download. Estamos trabalhando em baixar videos TikTok em lote no futuro." },
  { cat: "Downloads", q: "Os vídeos mantêm o áudio ao baixar do TikTok?", a: "Sim! Ao baixar videos do TikTok, o áudio completo é preservado — músicas, narrações e efeitos sonoros, exatamente como no TikTok original." },
  { cat: "Downloads", q: "Onde ficam salvos os vídeos após baixar video no TikTok?", a: "No iPhone, os vídeos são salvos na pasta 'Arquivos' ou galeria. No Android, verifique a pasta 'Downloads'. Ao baixar TikTok no PC, o arquivo vai para a pasta de downloads padrão do navegador." },

  // Segurança e Privacidade
  { cat: "Segurança", q: "É seguro usar este baixador de videos TikTok?", a: "Sim, o TikDown é 100% seguro. Não solicitamos dados pessoais, não instalamos software e não acessamos sua conta do TikTok. Todo o processo de baixar videos TikTok acontece pelo navegador." },
  { cat: "Segurança", q: "O criador sabe que eu baixei o vídeo do TikTok?", a: "Não. O download é completamente anônimo. O criador não recebe notificação de que seu conteúdo foi baixado pelo nosso baixador de videos TikTok." },
  { cat: "Segurança", q: "O baixador de vídeo do TikTok coleta dados pessoais?", a: "Não coletamos dados pessoais identificáveis. Utilizamos apenas cookies essenciais e o histórico de downloads é salvo localmente no seu navegador." },
  { cat: "Segurança", q: "Preciso desativar antivírus para baixar videos do TikTok?", a: "Absolutamente não! Nosso baixador de videos TikTok funciona direto no navegador sem alterar configurações de segurança. Os arquivos baixados são vídeos MP4 e áudios MP3 legítimos." },
  { cat: "Segurança", q: "Baixar videos TikTok pode instalar vírus?", a: "Não. O TikDown é uma ferramenta 100% online. Nenhum software é instalado ao baixar videos do TikTok. Os arquivos são MP4 e MP3 limpos, sem risco de malware." },

  // Problemas Técnicos
  { cat: "Técnico", q: "Por que o botão 'Colar' não funciona ao baixar TikTok video?", a: "Alguns navegadores restringem o acesso à área de transferência. Use Ctrl+V (ou Cmd+V no Mac) para colar o link manualmente no campo do baixador de videos TikTok." },
  { cat: "Técnico", q: "O download começa mas não termina ao baixar videos TikTok", a: "Isso geralmente ocorre por instabilidade na conexão. Tente: 1) Verificar sua internet; 2) Escolher qualidade menor; 3) Limpar cache do navegador; 4) Tentar baixar video do TikTok novamente em alguns minutos." },
  { cat: "Técnico", q: "O link diz 'vídeo não encontrado' ao tentar baixar do TikTok", a: "O vídeo pode ter sido removido, ser de conta privada, o link estar incompleto ou o TikTok restringiu o acesso na sua região. Tente copiar o link novamente do app." },
  { cat: "Técnico", q: "O vídeo baixado está sem som após baixar video do TikTok", a: "Alguns vídeos usam áudios protegidos que podem ser removidos. Tente salvar video do TikTok de outro vídeo ou use o player VLC para reproduzir." },
  { cat: "Técnico", q: "Posso usar o baixador de videos TikTok na Smart TV?", a: "Desde que o navegador da TV suporte downloads. Recomendamos baixar TikTok no PC ou celular e depois transferir para a TV via cabo ou casting." },
  { cat: "Técnico", q: "O site está lento para baixar videos do TikTok", a: "Tente limpar cache e cookies, desativar extensões que interferem, ou acessar de outro navegador. Se persistir, nossos servidores podem estar em manutenção temporária." },

  // Direitos Autorais e Uso
  { cat: "Direitos", q: "Posso repostar vídeos após baixar videos do TikTok?", a: "Repostar vídeos de terceiros sem autorização pode violar direitos autorais. Ao baixar videos TikTok, recomendamos sempre pedir permissão ao criador e dar os devidos créditos." },
  { cat: "Direitos", q: "Posso usar para fins comerciais vídeos baixados do TikTok?", a: "Não recomendamos. Vídeos do TikTok são protegidos por direitos autorais. O uso comercial ao baixar videos do TikTok sem autorização pode ter consequências legais." },
  { cat: "Direitos", q: "O baixador de videos TikTok viola termos de uso do TikTok?", a: "O TikDown acessa conteúdo público disponível na internet. Recomendamos que os usuários usem o baixador de videos TikTok de forma responsável e ética." },
  { cat: "Direitos", q: "O que acontece se baixar video do TikTok que foi removido depois?", a: "O arquivo permanece no seu dispositivo. Porém, se o criador removeu o vídeo, considere que ele pode não querer que o conteúdo seja distribuído." },

  // Funcionalidades
  { cat: "Recursos", q: "O que é o Histórico de Downloads do baixador?", a: "O Histórico registra automaticamente os vídeos que você baixou ao usar nosso baixador de videos TikTok, salvando título, autor e miniatura localmente no navegador." },
  { cat: "Recursos", q: "Posso baixar apenas a thumbnail do vídeo do TikTok?", a: "Essa funcionalidade não está disponível isoladamente. A miniatura é exibida na pré-visualização, mas o download é apenas do vídeo completo em MP4 ou do áudio em MP3." },
  { cat: "Recursos", q: "O baixador de videos TikTok tem aplicativo para celular?", a: "Não temos app instalável, mas o TikDown funciona como aplicativo para baixar video do TikTok direto pelo navegador. Sem instalar nada — basta acessar baixarvideostiktok.com no celular ou PC." },
  { cat: "Recursos", q: "Como contatar o suporte do baixador de videos TikTok?", a: "Entre em contato pelo e-mail contato@baixarvideostiktok.com ou pela página de Contato. Respondemos em até 24 horas sobre dúvidas relacionadas a baixar videos do TikTok." },
];

const categories = ["Todas", "Geral", "Downloads", "Segurança", "Técnico", "Direitos", "Recursos"];

const FAQPage = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Todas");

  const filtered = faqs.filter((faq) => {
    const matchesSearch = search === "" || faq.q.toLowerCase().includes(search.toLowerCase()) || faq.a.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === "Todas" || faq.cat === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-xs font-semibold mb-4">
              <HelpCircle className="w-3.5 h-3.5" />
              FAQ — Baixar Videos TikTok
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Perguntas Frequentes sobre <span className="text-gradient-tiktok">Baixar Videos TikTok</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Tire suas dúvidas sobre como baixar videos do TikTok, salvar video do TikTok sem marca d'água, tirar marca d'água e muito mais.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar pergunta sobre baixar videos TikTok..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-tiktok-cyan/50 transition-colors"
              />
            </div>
          </div>

          {/* Category filters */}
          <div className="max-w-3xl mx-auto mb-8 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-tiktok-cyan/15 text-tiktok-cyan border border-tiktok-cyan/30"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-tiktok-cyan/20"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <div className="max-w-3xl mx-auto mb-4">
            <p className="text-xs text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "pergunta encontrada" : "perguntas encontradas"}
            </p>
          </div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2">
              {filtered.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`} className="border border-border rounded-xl px-4 data-[state=open]:border-tiktok-cyan/30">
                  <AccordionTrigger className="text-sm font-semibold text-foreground hover:no-underline py-4 text-left">
                    <span className="flex items-start gap-3">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-tiktok-cyan/10 text-tiktok-cyan text-[10px] font-bold uppercase shrink-0 mt-0.5">
                        {faq.cat}
                      </span>
                      <span>{faq.q}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground pb-4 leading-relaxed pl-[52px]">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {filtered.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Nenhuma pergunta encontrada para sua busca.</p>
                <button onClick={() => { setSearch(""); setActiveCategory("Todas"); }} className="text-xs text-tiktok-cyan mt-2 hover:underline">
                  Limpar filtros
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default FAQPage;
