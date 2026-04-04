import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { URLInput } from "@/components/URLInput";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { Footer } from "@/components/Footer";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { toast } from "sonner";
import { Music, Headphones, Disc3 } from "lucide-react";
import youtubeToTiktokImg from "@/assets/youtube-to-tiktok.webp";

const AudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      toast.success("Áudio encontrado!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar o áudio.");
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
              Converter TikTok para <span className="text-gradient-tiktok">MP3</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Extraia o áudio de qualquer vídeo do TikTok e baixe em MP3 de alta qualidade.
            </p>
          </motion.div>

          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">Áudio Encontrado</h2>
              <div className="space-y-3">
                {videos.map((v) => <VideoCard key={v.id} video={v} />)}
              </div>
            </motion.section>
          )}

          <section className="mt-16 max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-10">
              <div className="flex justify-center">
                <img src={youtubeToTiktokImg} alt="Converter TikTok para MP3" className="w-full max-w-xs rounded-2xl" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">Recursos do Conversor MP3</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Extraia o áudio de qualquer vídeo do TikTok e salve em MP3 de alta qualidade. Perfeito para ouvir músicas virais offline.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Music, title: "Alta Qualidade", desc: "Áudio MP3 com a melhor qualidade disponível." },
                { icon: Headphones, title: "Músicas Virais", desc: "Baixe as músicas que estão bombando no TikTok." },
                { icon: Disc3, title: "Rápido e Fácil", desc: "Conversão instantânea, sem espera." },
              ].map((f) => (
                <div key={f.title} className="p-5 rounded-2xl border border-border bg-card text-center">
                  <f.icon className="w-7 h-7 text-tiktok-pink mx-auto mb-2" />
                  <h3 className="font-bold text-foreground text-sm">{f.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
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

export default AudioPage;