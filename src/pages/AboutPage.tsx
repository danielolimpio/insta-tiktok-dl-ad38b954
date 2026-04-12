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
                Sobre o <span className="text-gradient-tiktok">Baixar Videos TikTok</span>
              </h1>
              <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
                O melhor baixador de videos TikTok gratuito para salvar video do TikTok sem marca d'água em MP4 e MP3.
              </p>
            </div>

            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mb-12"
            >
              <img src={heroImg} alt="Baixar videos TikTok sem marca d'água - Baixador online" className="w-64 sm:w-80 rounded-2xl" />
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
                O baixarvideostiktok.com nasceu com a missão de ser o melhor baixador de videos TikTok da internet. Oferecemos a maneira mais fácil, rápida e segura de baixar videos do TikTok sem marca d'água. Nosso compromisso é manter a ferramenta 100% gratuita, sem necessidade de cadastro e com a melhor qualidade para salvar videos TikTok em MP4 e MP3. Funcionamos como um aplicativo para baixar video do TikTok, mas direto pelo navegador — sem instalar nada no celular ou PC.
              </p>
            </div>

            {/* Values */}
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Por Que Escolher Nosso Baixador de Videos TikTok</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {[
                { icon: Zap, title: "Velocidade", desc: "Baixar videos TikTok com download instantâneo." },
                { icon: Heart, title: "Simplicidade", desc: "Cole o link, clique e salve — fácil como um app." },
                { icon: Globe, title: "Compatibilidade", desc: "TikTok download Android, iPhone, Windows e Mac." },
                { icon: Users, title: "Comunidade", desc: "Milhares confiam no nosso baixador de videos TikTok." },
                { icon: Award, title: "Qualidade HD", desc: "Baixar video do TikTok em 1080p sem perda." },
                { icon: Target, title: "Sem Marca d'Água", desc: "Tirar marca d'água do TikTok automaticamente." },
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
                O baixarvideostiktok.com é um baixador de videos TikTok independente, não afiliado ao TikTok, ByteDance ou qualquer plataforma de mídia social. Todos os nomes de produtos e marcas pertencem aos seus respectivos proprietários. Os usuários são responsáveis pelo uso adequado do conteúdo ao baixar videos do TikTok, respeitando os direitos autorais dos criadores originais.
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
