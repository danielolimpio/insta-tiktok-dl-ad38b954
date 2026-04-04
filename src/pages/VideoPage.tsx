import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { URLInput } from "@/components/URLInput";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { Footer } from "@/components/Footer";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { toast } from "sonner";
import { MonitorPlay, Film, Sparkles } from "lucide-react";
import videoCreatorImg from "@/assets/video-creator.webp";

const VideoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      toast.success("Vídeo encontrado!");
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
              Baixar <span className="text-gradient-tiktok">Vídeo MP4</span> do TikTok
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Salve vídeos do TikTok em MP4 com qualidade HD 1080p, sem marca d'água.
            </p>
          </motion.div>

          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">Vídeo Encontrado</h2>
              <div className="space-y-3">
                {videos.map((v) => <VideoCard key={v.id} video={v} />)}
              </div>
            </motion.section>
          )}

          <section className="mt-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground text-center mb-8">Qualidades Disponíveis</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Sparkles, label: "1080p Full HD", desc: "Máxima qualidade disponível" },
                { icon: MonitorPlay, label: "720p HD", desc: "Equilíbrio entre qualidade e tamanho" },
                { icon: Film, label: "480p SD", desc: "Arquivo menor, ideal para compartilhar" },
              ].map((q) => (
                <div key={q.label} className="p-5 rounded-2xl border border-border bg-card text-center">
                  <q.icon className="w-7 h-7 text-tiktok-cyan mx-auto mb-2" />
                  <h3 className="font-bold text-foreground text-sm">{q.label}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{q.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6">Como Baixar Vídeo MP4</h2>
                <ol className="space-y-4 text-muted-foreground">
                  <li className="flex gap-3"><span className="text-tiktok-cyan font-bold text-lg">1.</span><span>Abra o TikTok e copie o link do vídeo desejado.</span></li>
                  <li className="flex gap-3"><span className="text-tiktok-cyan font-bold text-lg">2.</span><span>Cole o link no campo acima e clique em "Baixar Agora".</span></li>
                  <li className="flex gap-3"><span className="text-tiktok-cyan font-bold text-lg">3.</span><span>Escolha a qualidade (1080p, 720p ou 480p) e faça o download.</span></li>
                </ol>
              </div>
              <div className="flex justify-center">
                <img src={videoCreatorImg} alt="Baixar vídeo MP4 do TikTok" className="w-full max-w-xs rounded-2xl" />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VideoPage;