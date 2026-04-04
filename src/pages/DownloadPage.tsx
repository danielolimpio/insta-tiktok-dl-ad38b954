import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { URLInput } from "@/components/URLInput";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { Footer } from "@/components/Footer";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { toast } from "sonner";
import { Download, Zap, Shield, Infinity } from "lucide-react";
import videoDownloaderImg from "@/assets/video-downloader.webp";

const DownloadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      toast.success("Vídeo pronto para download!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar o vídeo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              <span className="text-gradient-tiktok">Download</span> de Vídeos TikTok
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Cole o link do vídeo e baixe em segundos. Sem marca d'água, sem cadastro, sem limites.
            </p>
          </motion.div>

          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">Resultado</h2>
              <div className="space-y-3">
                {videos.map((v) => <VideoCard key={v.id} video={v} />)}
              </div>
            </motion.section>
          )}

          <section className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Por que usar o TikDown?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: Zap, title: "Ultra Rápido", desc: "Downloads instantâneos sem espera." },
                { icon: Shield, title: "100% Seguro", desc: "Sem vírus, sem malware, sem cadastro." },
                { icon: Infinity, title: "Sem Limites", desc: "Baixe quantos vídeos quiser, grátis." },
              ].map((f) => (
                <div key={f.title} className="p-6 rounded-2xl border border-border bg-card text-center">
                  <f.icon className="w-8 h-8 text-tiktok-cyan mx-auto mb-3" />
                  <h3 className="font-bold text-foreground">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
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

export default DownloadPage;