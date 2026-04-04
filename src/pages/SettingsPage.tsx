import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { Settings, Monitor, Download, Globe } from "lucide-react";

const SettingsPage = () => {
  const [defaultQuality, setDefaultQuality] = useState("1080p");
  const [autoDownload, setAutoDownload] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              <span className="text-gradient-tiktok">Configurações</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base">Personalize sua experiência no TikDown.</p>
          </motion.div>

          <div className="max-w-2xl mx-auto space-y-6">
            {/* Quality */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-5 h-5 text-tiktok-cyan" />
                <h2 className="font-bold text-foreground">Qualidade Padrão</h2>
              </div>
              <select
                value={defaultQuality}
                onChange={(e) => setDefaultQuality(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm"
              >
                <option value="1080p">MP4 1080p (Full HD)</option>
                <option value="720p">MP4 720p (HD)</option>
                <option value="480p">MP4 480p (SD)</option>
                <option value="mp3">MP3 (Áudio)</option>
              </select>
            </div>

            {/* Auto Download */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Download className="w-5 h-5 text-tiktok-cyan" />
                  <div>
                    <h2 className="font-bold text-foreground">Download Automático</h2>
                    <p className="text-xs text-muted-foreground">Iniciar download assim que o vídeo for encontrado</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoDownload(!autoDownload)}
                  className={`w-12 h-7 rounded-full transition-colors duration-300 ${autoDownload ? "bg-tiktok-cyan" : "bg-muted"}`}
                >
                  <div className={`w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${autoDownload ? "translate-x-6" : "translate-x-1"}`} />
                </button>
              </div>
            </div>

            {/* Language */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-5 h-5 text-tiktok-cyan" />
                <h2 className="font-bold text-foreground">Idioma</h2>
              </div>
              <select className="w-full h-11 px-4 rounded-xl border border-border bg-background text-foreground text-sm">
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;