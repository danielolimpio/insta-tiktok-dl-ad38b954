import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { URLInput } from "@/components/URLInput";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { FeatureCards } from "@/components/FeatureCards";
import { HowItWorks } from "@/components/HowItWorks";
import { FAQSection } from "@/components/FAQSection";
import { AdSenseContent } from "@/components/AdSenseContent";
import { Footer } from "@/components/Footer";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { toast } from "sonner";

const HISTORY_KEY = "tikdown_history";

function saveToHistory(video: VideoInfo) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: VideoInfo[] = raw ? JSON.parse(raw) : [];
    const exists = history.some((v) => v.id === video.id);
    if (!exists) {
      history.unshift(video);
      if (history.length > 50) history.pop();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  } catch {}
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      saveToHistory(videoData);
      toast.success("Vídeo pronto para download!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar o vídeo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <AppSidebar />

      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0"
          >
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Baixar Vídeo do TikTok{" "}
              <span className="text-gradient-tiktok">Sem Marca D'Água</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              TikTok video downloader grátis para <strong className="text-foreground">baixar vídeo do TikTok em MP4 HD</strong>, remover marca d'água e converter para MP3. Funciona em PC, Android e iPhone — sem login, sem instalar app.
            </p>
          </motion.div>

          {/* URL Input */}
          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {/* Video Results */}
          {videos.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 max-w-3xl mx-auto"
            >
              <h2 className="text-xl font-bold text-foreground mb-4">Vídeos Encontrados</h2>
              <div className="space-y-3">
                {videos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </motion.section>
          )}

          {/* Features */}
          <div className="mt-12">
            <FeatureCards />
          </div>

          {/* How It Works */}
          <div className="mt-20">
            <HowItWorks />
          </div>

          {/* FAQ */}
          <div className="mt-20">
            <FAQSection />
          </div>

          {/* Rich Content for AdSense */}
          <div className="mt-20">
            <AdSenseContent />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
