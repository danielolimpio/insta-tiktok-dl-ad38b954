import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { FAQSection } from "@/components/FAQSection";
import { MessageCircle, Mail, Shield } from "lucide-react";

const HelpPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              <span className="text-gradient-tiktok">Ajuda</span> e Suporte
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Tem dúvidas? Encontre respostas abaixo ou entre em contato conosco.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="max-w-3xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              { icon: Mail, title: "E-mail", desc: "contato@baixarvideostiktok.com", link: "mailto:contato@baixarvideostiktok.com" },
              { icon: MessageCircle, title: "Chat", desc: "Resposta em até 24h", link: "#" },
              { icon: Shield, title: "Privacidade", desc: "Seus dados estão seguros", link: "#" },
            ].map((c) => (
              <a key={c.title} href={c.link} className="p-5 rounded-2xl border border-border bg-card text-center hover:shadow-md transition-shadow">
                <c.icon className="w-7 h-7 text-tiktok-cyan mx-auto mb-2" />
                <h3 className="font-bold text-foreground text-sm">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{c.desc}</p>
              </a>
            ))}
          </div>

          {/* FAQ */}
          <FAQSection />

          {/* Troubleshooting */}
          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-6">Problemas Comuns</h2>
            <div className="space-y-4">
              {[
                { q: "O vídeo não está baixando", a: "Verifique se o link está correto e se o vídeo é público. Links de vídeos privados não funcionam." },
                { q: "O download está muito lento", a: "A velocidade depende da sua conexão e do servidor. Tente novamente em alguns minutos." },
                { q: "O áudio MP3 não tem som", a: "Alguns vídeos do TikTok usam áudio original que pode estar protegido. Tente outro vídeo." },
              ].map((item) => (
                <div key={item.q} className="p-5 rounded-2xl border border-border bg-card">
                  <h3 className="font-bold text-foreground text-sm">{item.q}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{item.a}</p>
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