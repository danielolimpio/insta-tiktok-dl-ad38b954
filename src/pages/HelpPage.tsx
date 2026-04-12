import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { MessageCircle, Mail, Shield, BookOpen, AlertTriangle, CheckCircle2, Smartphone, Monitor, Globe, Link, Download, Search, Lightbulb } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-xs font-semibold mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              Central de Ajuda
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              <span className="text-gradient-tiktok">Ajuda</span> para Baixar Videos TikTok
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Dúvidas sobre como baixar videos do TikTok sem marca d'água? Encontre respostas detalhadas e tutoriais completos abaixo.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Mail, title: "E-mail", desc: "contato@baixarvideostiktok.com", link: "mailto:contato@baixarvideostiktok.com" },
              { icon: MessageCircle, title: "Chat", desc: "Resposta em até 24h", link: "#" },
              { icon: Shield, title: "Privacidade", desc: "Seus dados estão seguros", link: "/privacidade" },
            ].map((c) => (
              <a key={c.title} href={c.link} className="p-5 rounded-2xl border border-border bg-card text-center hover:shadow-md hover:border-tiktok-cyan/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center mx-auto mb-3">
                  <c.icon className="w-6 h-6 text-tiktok-cyan" />
                </div>
                <h3 className="font-bold text-foreground text-sm">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </a>
            ))}
          </div>

          {/* How to Use */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Como Baixar Videos do TikTok Sem Marca d'Água</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Guia passo a passo para baixar video do TikTok, salvar videos TikTok e tirar marca d'água</p>
            <div className="space-y-4">
              {[
                { step: "1", icon: Link, title: "Copie o link do vídeo do TikTok", desc: "Abra o TikTok no celular Android ou iPhone, encontre o vídeo desejado, toque em \"Compartilhar\" e depois em \"Copiar link\". O link será salvo na sua área de transferência." },
                { step: "2", icon: Search, title: "Cole o link no baixador de videos TikTok", desc: "Acesse baixarvideostiktok.com, cole o link no campo de pesquisa e clique em \"Baixar Agora\". Nosso sistema vai processar e remover marca d'água TikTok automaticamente." },
                { step: "3", icon: Download, title: "Salvar video do TikTok sem marca d'água", desc: "Escolha a qualidade desejada (1080p, 720p, 480p ou MP3) e clique em \"Download\". O vídeo será salvo no seu dispositivo sem marca d'água, pronto para assistir offline." },
              ].map((item) => (
                <div key={item.step} className="flex items-start gap-4 p-5 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-full bg-tiktok-cyan/15 flex items-center justify-center shrink-0">
                    <span className="text-sm font-bold text-tiktok-cyan">{item.step}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                      <item.icon className="w-4 h-4 text-tiktok-cyan" />
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Supported Platforms */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Dispositivos para Baixar Videos TikTok</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Nosso baixador de videos TikTok funciona em qualquer dispositivo com navegador web</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Smartphone, title: "Celular", items: ["TikTok download Android (Chrome)", "Baixar TikTok video no iPhone (Safari)", "Qualquer navegador móvel"] },
                { icon: Monitor, title: "Computador", items: ["Baixar TikTok no PC Windows", "Baixar videos TikTok no Mac", "Linux (qualquer navegador)"] },
                { icon: Globe, title: "Tablet", items: ["Salvar video do TikTok no iPad", "Tablets Android", "Navegadores padrão"] },
              ].map((platform) => (
                <div key={platform.title} className="p-5 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center mb-3">
                    <platform.icon className="w-5 h-5 text-tiktok-cyan" />
                  </div>
                  <h3 className="font-bold text-foreground text-sm mb-2">{platform.title}</h3>
                  <ul className="space-y-1.5">
                    {platform.items.map((item) => (
                      <li key={item} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <CheckCircle2 className="w-3 h-3 text-tiktok-cyan shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <FAQSection />

          {/* Troubleshooting */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Problemas ao Baixar Videos do TikTok</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Soluções rápidas para os problemas mais comuns ao baixar do TikTok</p>
            <div className="space-y-4">
              {[
                { icon: AlertTriangle, q: "O vídeo do TikTok não está baixando", a: "Verifique se o link está correto e se o vídeo é público. Links de vídeos privados, removidos ou com restrição de região não funcionam. Tente copiar o link novamente diretamente do app do TikTok." },
                { q: "O download está muito lento ao baixar videos TikTok", a: "A velocidade depende da sua conexão com a internet. Tente novamente em alguns minutos ou escolha uma qualidade menor (720p ou 480p) para baixar video do TikTok mais rápido.", icon: AlertTriangle },
                { q: "O áudio MP3 extraído não tem som", a: "Alguns vídeos do TikTok usam áudio protegido. Tente salvar video do TikTok com outro vídeo ou verifique o volume do seu dispositivo.", icon: AlertTriangle },
                { q: "O vídeo baixado não abre no celular Android", a: "Certifique-se de que seu celular tem um player compatível com MP4. No iPhone, os vídeos são salvos na galeria. No Android, verifique a pasta Downloads após baixar video no TikTok.", icon: AlertTriangle },
                { q: "Link vm.tiktok.com não funciona no baixador", a: "Links curtos (vm.tiktok.com e vt.tiktok.com) são totalmente suportados pelo nosso baixador de videos TikTok. Se não funcionar, copie o link completo da barra de endereços do navegador.", icon: AlertTriangle },
                { q: "O vídeo foi baixado com marca d'água do TikTok", a: "Nosso sistema remove marca d'água TikTok automaticamente. Se a marca d'água persistir, o servidor pode estar temporariamente sobrecarregado. Tente tirar marca d'água do TikTok novamente em alguns minutos.", icon: AlertTriangle },
              ].map((item) => (
                <div key={item.q} className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-bold text-foreground text-sm flex items-center gap-2">
                    <item.icon className="w-4 h-4 text-amber-500 shrink-0" />
                    {item.q}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed pl-6">{item.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tips */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Dicas para Baixar Videos TikTok</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Aproveite ao máximo nosso baixador de videos TikTok</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Use sempre o link mais recente para baixar videos do TikTok com sucesso",
                "Para vídeos longos, escolha 720p para salvar video do TikTok mais rápido",
                "O botão \"Colar\" facilita baixar TikTok video sem digitar o link manualmente",
                "Confira o histórico para reencontrar vídeos já baixados anteriormente",
                "No Android, verifique a pasta Downloads se o vídeo não aparecer na galeria após baixar",
                "Use MP3 quando quiser apenas salvar TikTok áudio de um vídeo musical",
              ].map((tip) => (
                <div key={tip} className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
                  <Lightbulb className="w-4 h-4 text-tiktok-cyan shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground leading-relaxed">{tip}</span>
                </div>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default HelpPage;
