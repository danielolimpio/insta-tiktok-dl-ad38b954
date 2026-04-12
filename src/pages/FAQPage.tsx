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
  { cat: "Geral", q: "Como o TikDown consegue remover a marca d'água dos vídeos?", a: "O TikDown acessa a versão original do vídeo diretamente dos servidores do TikTok, antes da aplicação da marca d'água. Isso garante que você receba o vídeo limpo, exatamente como o criador o produziu, sem nenhuma edição adicional." },
  { cat: "Geral", q: "O TikDown armazena os vídeos que eu baixo?", a: "Não. O TikDown não armazena nenhum vídeo em seus servidores. A ferramenta apenas atua como intermediária entre você e os servidores do TikTok. O vídeo é baixado diretamente para o seu dispositivo." },
  { cat: "Geral", q: "Existe um limite de tamanho para os vídeos que posso baixar?", a: "Não há limite de tamanho imposto pelo TikDown. No entanto, vídeos muito longos (acima de 10 minutos) podem demorar mais para serem processados dependendo da sua conexão com a internet." },
  { cat: "Geral", q: "Posso baixar vídeos de contas privadas?", a: "Não. O TikDown só consegue acessar vídeos públicos. Vídeos de contas privadas exigem autenticação no TikTok, o que não é suportado pela ferramenta por questões de segurança e privacidade." },
  { cat: "Geral", q: "O TikDown funciona com links de outros países?", a: "Sim! O TikDown funciona com links do TikTok de qualquer país do mundo. Não há restrição geográfica para o uso da ferramenta." },
  { cat: "Geral", q: "Posso baixar Stories do TikTok?", a: "Atualmente o TikDown suporta apenas o download de vídeos publicados no feed. Stories e conteúdos temporários não são suportados devido às restrições de acesso do TikTok." },

  // Downloads e Formatos
  { cat: "Downloads", q: "Qual a diferença entre as qualidades 1080p, 720p e 480p?", a: "1080p (Full HD) oferece a melhor qualidade com mais detalhes, ideal para telas grandes. 720p (HD) é um bom equilíbrio entre qualidade e tamanho do arquivo. 480p (SD) gera arquivos menores, perfeito para economizar espaço no celular." },
  { cat: "Downloads", q: "Posso converter um vídeo do TikTok apenas em áudio MP3?", a: "Sim! O TikDown oferece a opção de extrair apenas o áudio do vídeo no formato MP3. Ideal para salvar músicas, podcasts ou efeitos sonoros que você encontrou no TikTok." },
  { cat: "Downloads", q: "O formato MP4 é compatível com todos os dispositivos?", a: "Sim. O MP4 é o formato de vídeo mais universal e é compatível com praticamente todos os dispositivos modernos, incluindo iPhones, Android, Windows, Mac e smart TVs." },
  { cat: "Downloads", q: "Posso baixar vários vídeos ao mesmo tempo?", a: "Atualmente o TikDown processa um vídeo por vez. Para baixar múltiplos vídeos, basta colar um novo link após o download do anterior ser concluído. Estamos trabalhando em uma funcionalidade de download em lote." },
  { cat: "Downloads", q: "Os vídeos baixados mantêm o áudio original?", a: "Sim! Os vídeos são baixados com o áudio completo original, incluindo músicas de fundo, narrações e efeitos sonoros, exatamente como aparecem no TikTok." },
  { cat: "Downloads", q: "Onde ficam salvos os vídeos baixados no meu celular?", a: "No iPhone, os vídeos são salvos na pasta 'Arquivos' ou diretamente na galeria de fotos. No Android, verifique a pasta 'Downloads' no gerenciador de arquivos ou na galeria do dispositivo." },

  // Segurança e Privacidade
  { cat: "Segurança", q: "O TikDown é seguro para usar?", a: "Sim, o TikDown é 100% seguro. Não solicitamos dados pessoais, não instalamos nenhum software no seu dispositivo e não acessamos sua conta do TikTok. Todo o processo acontece pelo navegador." },
  { cat: "Segurança", q: "O criador do vídeo sabe que eu baixei o conteúdo dele?", a: "Não. O download é completamente anônimo. O criador do vídeo não recebe nenhuma notificação ou aviso de que seu conteúdo foi baixado pelo TikDown." },
  { cat: "Segurança", q: "O TikDown coleta meus dados pessoais?", a: "Não coletamos dados pessoais identificáveis. Utilizamos apenas cookies essenciais para o funcionamento do site e para salvar seu histórico de downloads localmente no seu navegador." },
  { cat: "Segurança", q: "Preciso desativar meu antivírus para usar o TikDown?", a: "Absolutamente não! O TikDown funciona diretamente no navegador e não requer nenhuma alteração nas configurações de segurança do seu dispositivo. Se seu antivírus bloquear o download, verifique as configurações de download do navegador." },
  { cat: "Segurança", q: "O TikDown pode instalar vírus ou malware no meu dispositivo?", a: "Não. O TikDown é uma ferramenta 100% online que opera no navegador. Nenhum software é instalado. Os arquivos baixados são vídeos MP4 e áudios MP3 legítimos, sem risco de malware." },

  // Problemas Técnicos
  { cat: "Técnico", q: "Por que o botão 'Colar' não funciona no meu navegador?", a: "Alguns navegadores restringem o acesso à área de transferência por motivos de segurança. Nesse caso, use Ctrl+V (ou Cmd+V no Mac) para colar o link manualmente no campo de pesquisa." },
  { cat: "Técnico", q: "O download começa mas nunca termina. O que fazer?", a: "Isso geralmente ocorre por instabilidade na conexão. Tente: 1) Verificar sua internet; 2) Escolher uma qualidade menor (720p ou 480p); 3) Limpar o cache do navegador; 4) Tentar novamente em alguns minutos." },
  { cat: "Técnico", q: "O link que colei diz 'vídeo não encontrado'. Por quê?", a: "Isso pode acontecer quando: o vídeo foi removido pelo criador, o vídeo é de uma conta privada, o link está incompleto ou incorreto, ou o TikTok restringiu o acesso ao conteúdo na sua região." },
  { cat: "Técnico", q: "O vídeo baixado está sem som. Como resolver?", a: "Verifique se o vídeo original no TikTok possui som. Alguns vídeos usam áudios protegidos que podem ser removidos. Tente também abrir o vídeo com outro player de mídia como VLC." },
  { cat: "Técnico", q: "Posso usar o TikDown no navegador do meu Smart TV?", a: "Teoricamente sim, desde que o navegador da TV suporte downloads de arquivos. Na prática, recomendamos baixar no celular ou computador e depois transferir para a TV via cabo, pendrive ou casting." },
  { cat: "Técnico", q: "O site está lento ou não carrega. O que posso fazer?", a: "Tente limpar o cache e cookies do navegador, desativar extensões que possam interferir (como bloqueadores de anúncios agressivos), ou acessar de outro navegador. Se o problema persistir, nossos servidores podem estar em manutenção." },

  // Direitos Autorais e Uso
  { cat: "Direitos", q: "Posso repostar um vídeo baixado nas minhas redes sociais?", a: "Repostar vídeos de terceiros sem autorização pode violar direitos autorais. Recomendamos sempre pedir permissão ao criador original e dar os devidos créditos ao compartilhar conteúdo de outras pessoas." },
  { cat: "Direitos", q: "Posso usar vídeos baixados para fins comerciais?", a: "Não recomendamos. Vídeos do TikTok são protegidos por direitos autorais dos criadores. O uso comercial sem autorização expressa pode resultar em consequências legais. Consulte nossa página de Uso Responsável." },
  { cat: "Direitos", q: "O TikDown viola os termos de uso do TikTok?", a: "O TikDown é uma ferramenta independente que acessa conteúdo público disponível na internet. Recomendamos que os usuários respeitem os direitos autorais e utilizem os vídeos de forma responsável e ética." },
  { cat: "Direitos", q: "O que acontece se eu baixar um vídeo que foi removido depois?", a: "Se você já baixou o vídeo antes da remoção, o arquivo permanece no seu dispositivo. No entanto, se o criador removeu o vídeo, considere que ele pode não querer que o conteúdo seja distribuído." },

  // Funcionalidades
  { cat: "Recursos", q: "O que é o Histórico de Downloads?", a: "O Histórico de Downloads registra automaticamente os vídeos que você baixou, salvando informações como título, autor e miniatura. Esses dados ficam armazenados localmente no seu navegador e são apagados quando você limpa os cookies." },
  { cat: "Recursos", q: "Posso baixar apenas a miniatura (thumbnail) de um vídeo?", a: "Atualmente essa funcionalidade não está disponível de forma isolada. A miniatura é exibida na pré-visualização do vídeo, mas o download é apenas do vídeo completo ou do áudio." },
  { cat: "Recursos", q: "O TikDown tem aplicativo para celular?", a: "Não, o TikDown funciona exclusivamente pelo navegador e não possui aplicativo. A vantagem é que você não precisa instalar nada — basta acessar o site pelo navegador do seu celular ou computador." },
  { cat: "Recursos", q: "Como posso entrar em contato com o suporte do TikDown?", a: "Você pode nos contatar pelo e-mail contato@baixarvideostiktok.com ou pela página de Contato no menu do site. Respondemos em até 24 horas nos dias úteis." },
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
              FAQ
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Perguntas <span className="text-gradient-tiktok">Frequentes</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Encontre respostas para as dúvidas mais comuns sobre o TikDown. Use a busca ou navegue pelas categorias.
            </p>
          </motion.div>

          {/* Search */}
          <div className="max-w-3xl mx-auto mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar pergunta..."
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
