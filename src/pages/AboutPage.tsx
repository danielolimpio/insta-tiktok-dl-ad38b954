import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Users, Target, Heart, Zap, Globe, Award } from "lucide-react";
import heroImg from "@/assets/hero-tiktok.webp";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto pt-8 lg:pt-0">
            <div className="text-center mb-12">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                Sobre o <span className="text-gradient-tiktok">BaixarVideosTikTok</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                A melhor ferramenta gratuita para baixar vídeos do TikTok sem marca d'água.
              </p>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-12"
            >
              <img src={heroImg} alt="Baixar vídeos do TikTok" className="w-64 sm:w-80 rounded-2xl" />
            </motion.div>

            {/* Mission */}
            <div className="p-8 rounded-3xl border border-border bg-card mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl gradient-tiktok flex items-center justify-center">
                  <Target className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">Nossa Missão</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                O baixarvideostiktok.com nasceu com uma missão simples: oferecer a maneira mais fácil, rápida e segura de baixar vídeos do TikTok sem marca d'água. Acreditamos que o acesso ao conteúdo deve ser simples e sem barreiras. Nosso compromisso é manter a ferramenta 100% gratuita, sem necessidade de cadastro e com a melhor qualidade de download disponível.
              </p>
            </div>

            {/* Values */}
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Nossos Valores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Zap, title: "Velocidade", desc: "Downloads instantâneos sem espera ou filas." },
                { icon: Heart, title: "Simplicidade", desc: "Interface intuitiva que qualquer pessoa pode usar." },
                { icon: Globe, title: "Acessibilidade", desc: "Funciona em qualquer dispositivo e navegador." },
                { icon: Users, title: "Comunidade", desc: "Milhares de usuários confiam em nosso serviço." },
                { icon: Award, title: "Qualidade", desc: "Vídeos em HD sem perda de qualidade." },
                { icon: Target, title: "Confiança", desc: "Sem anúncios invasivos ou downloads falsos." },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl border border-border bg-card text-center"
                >
                  <v.icon className="w-7 h-7 text-tiktok-cyan mx-auto mb-2" />
                  <h3 className="font-bold text-foreground text-sm">{v.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{v.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Disclaimer */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-bold text-foreground mb-3">Aviso Legal</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                O baixarvideostiktok.com não é afiliado ao TikTok, ByteDance ou qualquer outra plataforma de mídia social. Todos os nomes de produtos e marcas mencionados pertencem aos seus respectivos proprietários. Os usuários são responsáveis pelo uso adequado do conteúdo baixado, respeitando os direitos autorais dos criadores.
              </p>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
