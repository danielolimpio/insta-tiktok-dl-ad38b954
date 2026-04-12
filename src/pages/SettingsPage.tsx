import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { Settings, Monitor, Download, Globe, Shield, Smartphone, Wifi, HardDrive, Bell, Eye, Palette, Info, CheckCircle2 } from "lucide-react";

const SettingsPage = () => {
  const [defaultQuality, setDefaultQuality] = useState("1080p");
  const [autoDownload, setAutoDownload] = useState(false);

  const Toggle = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`w-12 h-7 rounded-full transition-colors duration-300 ${enabled ? "bg-tiktok-cyan" : "bg-muted"}`}
    >
      <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
    </button>
  );

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-xs font-semibold mb-4">
              <Settings className="w-3.5 h-3.5" />
              Personalização
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              <span className="text-gradient-tiktok">Configurações</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Personalize sua experiência no TikDown. Todas as configurações são salvas localmente no seu navegador.
            </p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Quality */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-tiktok-cyan" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">Qualidade Padrão de Vídeo</h2>
                  <p className="text-xs text-muted-foreground">Escolha a qualidade padrão para downloads de vídeo</p>
                </div>
              </div>
              <select
                value={defaultQuality}
                onChange={(e) => setDefaultQuality(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm mt-3"
              >
                <option value="1080p">MP4 1080p (Full HD) — Melhor qualidade</option>
                <option value="720p">MP4 720p (HD) — Equilíbrio entre qualidade e tamanho</option>
                <option value="480p">MP4 480p (SD) — Menor tamanho de arquivo</option>
                <option value="mp3">MP3 (Áudio) — Apenas o áudio do vídeo</option>
              </select>
              <div className="mt-3 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground flex items-start gap-2">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>A qualidade selecionada será aplicada automaticamente ao buscar um novo vídeo. Você sempre pode alterar a qualidade individualmente antes de baixar.</span>
              </div>
            </motion.div>

            {/* Auto Download */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-tiktok-cyan" />
                  </div>
                  <div>
                    <h2 className="font-bold text-foreground">Download Automático</h2>
                    <p className="text-xs text-muted-foreground">Iniciar download automaticamente quando o vídeo for encontrado</p>
                  </div>
                </div>
                <Toggle enabled={autoDownload} onToggle={() => setAutoDownload(!autoDownload)} />
              </div>
              <div className="mt-3 p-3 rounded-lg bg-muted/50 text-xs text-muted-foreground flex items-start gap-2">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Quando ativado, o download começará automaticamente assim que o vídeo for processado, sem necessidade de clicar no botão de download.</span>
              </div>
            </motion.div>

            {/* Language */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl bg-tiktok-cyan/10 flex items-center justify-center">
                  <Globe className="w-5 h-5 text-tiktok-cyan" />
                </div>
                <div>
                  <h2 className="font-bold text-foreground">Idioma da Interface</h2>
                  <p className="text-xs text-muted-foreground">Altere o idioma de exibição do site</p>
                </div>
              </div>
              <select className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm mt-3">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </motion.div>

            {/* Info Section */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
              <h2 className="text-xl font-bold text-foreground mb-4 mt-10">Informações do Sistema</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Shield, title: "Privacidade", desc: "Não coletamos dados pessoais. Todas as configurações ficam salvas localmente no seu navegador." },
                  { icon: Smartphone, title: "Compatibilidade", desc: "Funciona em todos os dispositivos: computador, tablet e celular. Sem necessidade de instalar apps." },
                  { icon: Wifi, title: "Conexão", desc: "A velocidade de download depende da sua conexão com a internet e do servidor do TikTok." },
                  { icon: HardDrive, title: "Armazenamento", desc: "Os vídeos são baixados diretamente para o seu dispositivo. Verifique o espaço disponível." },
                  { icon: Palette, title: "Tema", desc: "O site utiliza tema escuro otimizado para conforto visual durante uso prolongado." },
                  { icon: Eye, title: "Cookies", desc: "Usamos apenas cookies essenciais para salvar suas preferências e histórico de downloads." },
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-2xl border border-border bg-card">
                    <item.icon className="w-6 h-6 text-tiktok-cyan mb-2" />
                    <h3 className="font-bold text-foreground text-sm">{item.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Features list */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="p-6 rounded-2xl border border-border bg-card mt-6">
              <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
                <Bell className="w-5 h-5 text-tiktok-cyan" />
                Recursos Disponíveis
              </h2>
              <div className="space-y-3">
                {[
                  "Download de vídeos sem marca d'água em MP4 (480p, 720p, 1080p)",
                  "Extração de áudio em formato MP3 de qualquer vídeo",
                  "Histórico de downloads salvo localmente no navegador",
                  "Interface responsiva para desktop, tablet e celular",
                  "Sem necessidade de cadastro ou login",
                  "Downloads ilimitados e 100% gratuitos",
                  "Suporte a links curtos (vm.tiktok.com e vt.tiktok.com)",
                  "Processamento rápido direto no navegador",
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-tiktok-cyan shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;
