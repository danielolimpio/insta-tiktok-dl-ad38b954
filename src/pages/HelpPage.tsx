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
              <span className="text-gradient-tiktok">Ajuda</span> e Suporte
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Tem dúvidas? Encontre respostas detalhadas abaixo ou entre em contato conosco.
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

          {/* How to Use - Step by Step */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Como Usar o TikDown</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Guia passo a passo completo para baixar vídeos do TikTok</p>
            <div className="space-y-4">
              {[
                { step: "1", icon: Link, title: "Copie o link do vídeo", desc: "Abra o TikTok, encontre o vídeo desejado, toque em \"Compartilhar\" e depois em \"Copiar link\". O link será salvo na sua área de transferência." },
                { step: "2", icon: Search, title: "Cole o link no TikDown", desc: "Acesse baixarvideostiktok.com, cole o link no campo de pesquisa e clique em \"Baixar Agora\". Você pode usar o botão \"Colar\" para facilitar." },
                { step: "3", icon: Download, title: "Escolha a qualidade e baixe", desc: "Selecione a qualidade desejada (1080p, 720p, 480p ou MP3) e clique em \"Download\". O vídeo será salvo no seu dispositivo sem marca d'água." },
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
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Dispositivos Compatíveis</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">O TikDown funciona em qualquer dispositivo com navegador web</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Smartphone, title: "Celular", items: ["iPhone (Safari)", "Android (Chrome)", "Qualquer navegador móvel"] },
                { icon: Monitor, title: "Computador", items: ["Windows (Chrome, Edge, Firefox)", "Mac (Safari, Chrome)", "Linux (qualquer navegador)"] },
                { icon: Globe, title: "Tablet", items: ["iPad (Safari)", "Tablets Android", "Navegadores padrão"] },
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
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Problemas Comuns e Soluções</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Encontre soluções rápidas para os problemas mais frequentes</p>
            <div className="space-y-4">
              {[
                { icon: AlertTriangle, q: "O vídeo não está baixando", a: "Verifique se o link está correto e se o vídeo é público. Links de vídeos privados, removidos ou com restrição de região não funcionam. Tente copiar o link novamente diretamente do app do TikTok." },
                { q: "O download está muito lento", a: "A velocidade depende da sua conexão com a internet e da carga do servidor do TikTok. Tente novamente em alguns minutos ou escolha uma qualidade menor (720p ou 480p) para downloads mais rápidos.", icon: AlertTriangle },
                { q: "O áudio MP3 não tem som", a: "Alguns vídeos do TikTok usam áudio original que pode estar protegido ou ter volume muito baixo. Tente outro vídeo ou verifique o volume do seu dispositivo.", icon: AlertTriangle },
                { q: "O vídeo baixado não abre no celular", a: "Certifique-se de que seu celular tem um player de vídeo compatível com MP4. No iPhone, os vídeos são salvos automaticamente na galeria. No Android, verifique a pasta de downloads.", icon: AlertTriangle },
                { q: "Link \"vm.tiktok.com\" não funciona", a: "Links curtos do TikTok (vm.tiktok.com e vt.tiktok.com) são totalmente suportados. Se o link não funcionar, tente acessar o vídeo no TikTok e copiar o link completo da barra de endereços.", icon: AlertTriangle },
                { q: "O vídeo foi baixado com marca d'água", a: "O TikDown remove automaticamente a marca d'água. Se isso não ocorreu, o servidor pode estar temporariamente indisponível. Tente novamente em alguns minutos.", icon: AlertTriangle },
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
            <h2 className="text-2xl font-bold text-foreground text-center mb-2">Dicas para Melhor Experiência</h2>
            <p className="text-muted-foreground text-center text-sm mb-8">Aproveite ao máximo o TikDown com estas dicas</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Use sempre o link mais recente do vídeo para garantir compatibilidade",
                "Para vídeos longos, prefira a qualidade 720p para downloads mais rápidos",
                "O botão \"Colar\" facilita a inserção do link sem precisar selecionar manualmente",
                "Confira o histórico de downloads para reencontrar vídeos já baixados",
                "Em celulares, verifique a pasta de downloads se o vídeo não aparecer na galeria",
                "Use o formato MP3 quando quiser apenas o áudio de um vídeo musical",
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
