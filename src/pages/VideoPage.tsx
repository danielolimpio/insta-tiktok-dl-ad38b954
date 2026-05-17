import { useState } from "react";
import { motion } from "framer-motion";
import { AppSidebar } from "@/components/AppSidebar";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEO } from "@/components/SEO";
import { URLInput } from "@/components/URLInput";
import { VideoCard, VideoInfo } from "@/components/VideoCard";
import { fetchTikTokVideo } from "@/lib/tiktok-api";
import { toast } from "sonner";
import { Video, Sparkles, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { PageFAQ } from "@/components/PageFAQ";
import { RelatedTools } from "@/components/RelatedTools";
import { MediaSchema } from "@/components/MediaSchema";

const VIDEO_FAQ = [
  { q: "Como baixar vídeo do TikTok em MP4 HD sem marca d'água?", a: "Copie o link do vídeo no TikTok, cole no campo acima e clique em Baixar Agora. Em segundos entregamos o arquivo MP4 em 1080p Full HD sem o logo do TikTok, pronto para salvar no PC, Android ou iPhone." },
  { q: "É possível baixar vídeos do TikTok em 1080p Full HD?", a: "Sim. Quando o criador publicou em alta resolução, o TikDown entrega o vídeo em 1080p Full HD. Vídeos em qualidade menor são entregues na resolução máxima disponível na fonte original do TikTok." },
  { q: "Preciso instalar algum app para baixar vídeo do TikTok?", a: "Não. Nosso TikTok video downloader é 100% online, funciona no navegador do PC (Windows, Mac, Linux) e do celular (Android, iPhone). Não há instalação de APK, extensão ou software." },
  { q: "O download de vídeos do TikTok é gratuito e ilimitado?", a: "Sim. Você pode baixar quantos vídeos do TikTok quiser, sem cadastro, sem login e sem limite diário. Todo o processo é gratuito." },
  { q: "Posso baixar apenas o áudio em vez do vídeo?", a: "Sim. Se preferir somente a faixa sonora, use a página dedicada de áudio em /audio para extrair o MP3 do TikTok em alta qualidade." },
];

const HISTORY_KEY = "tikdown_history";

function saveToHistory(video: VideoInfo) {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    const history: VideoInfo[] = raw ? JSON.parse(raw) : [];
    if (!history.some((v) => v.id === video.id)) {
      history.unshift(video);
      if (history.length > 50) history.pop();
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    }
  } catch {}
}

const VideoPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      saveToHistory(videoData);
      toast.success("Vídeo do TikTok pronto para download em MP4 HD!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar o vídeo. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Baixar Vídeo do TikTok em MP4 HD Sem Marca D'Água | TikDown"
        description="Baixar vídeo do TikTok em MP4 HD 1080p sem marca d'água. TikTok video downloader online, grátis e sem cadastro — funciona em PC, Android e iPhone."
        canonical="https://baixarvideostiktok.com/video"
        keywords="baixar video tiktok, baixar video tiktok mp4, baixar tiktok hd, tiktok video downloader, tiktok 1080p download, tiktok no watermark, baixar tiktok sem marca d'agua, salvar video do tiktok, download tiktok video without watermark"
      />
      <AppSidebar />
      <div className="flex-1 lg:ml-[280px] flex flex-col">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-10 pt-8 lg:pt-0"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-xs font-semibold mb-4">
              <Video className="w-3.5 h-3.5" />
              TikTok Video Downloader MP4 HD
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Baixar Vídeo do TikTok em <span className="text-gradient-tiktok">MP4 HD Sem Marca D'Água</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Cole o link do TikTok e baixe vídeos em <strong className="text-foreground">MP4 1080p Full HD</strong> sem marca d'água. Online, grátis, ilimitado — direto no PC, Android ou iPhone.
            </p>
          </motion.div>

          <PageBreadcrumbs items={[{ name: "Baixar Vídeo MP4 HD", url: "/video" }]} />

          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 max-w-3xl mx-auto">
              <MediaSchema videos={videos} type="video" pageUrl="https://baixarvideostiktok.com/video" />
              <h2 className="text-xl font-bold text-foreground mb-4">Vídeo Pronto para Download</h2>
              <div className="space-y-3">
                {videos.map((v) => (
                  <VideoCard key={v.id} video={v} />
                ))}
              </div>
            </motion.section>
          )}

          {/* SEO Content Block */}
          <section className="mt-16 max-w-3xl mx-auto space-y-8">
            <article>
              <h2 className="text-2xl font-bold text-foreground mb-3">Como baixar vídeo do TikTok em MP4 HD</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para baixar vídeo do TikTok em <strong className="text-foreground">MP4 HD sem marca d'água</strong>, copie o link do vídeo no app do TikTok, cole no campo acima e clique em "Baixar Agora". Em segundos o TikDown processa o vídeo direto da fonte original do TikTok e entrega em MP4 1080p Full HD ou 720p, com áudio preservado e sem o logo do TikTok.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-foreground mb-3">Qualidade do vídeo TikTok baixado</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nosso baixador de vídeos TikTok suporta múltiplas resoluções: <strong className="text-foreground">1080p (Full HD)</strong>, 720p (HD) e 480p (SD). A qualidade depende do upload original feito pelo criador no TikTok. Vídeos gravados em 4K são entregues em 1080p, padrão máximo da plataforma TikTok. Se você quer apenas a trilha sonora, veja como <Link to="/audio" className="text-tiktok-cyan hover:underline font-medium">baixar áudio do TikTok em MP3</Link> ou acesse seu <Link to="/download" className="text-tiktok-cyan hover:underline font-medium">histórico de vídeos baixados</Link>.
              </p>
            </article>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="p-5 rounded-xl border border-border bg-card">
                <Zap className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Download Rápido</h3>
                <p className="text-xs text-muted-foreground">Vídeos do TikTok prontos em até 5 segundos.</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <Sparkles className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">MP4 HD Sem Marca</h3>
                <p className="text-xs text-muted-foreground">Vídeo limpo em Full HD, sem o logo do TikTok.</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <Shield className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">100% Seguro</h3>
                <p className="text-xs text-muted-foreground">Sem cadastro, sem login, sem instalar app.</p>
              </div>
            </div>
          </section>

          <PageFAQ id="video" title="Perguntas frequentes sobre baixar vídeo do TikTok" items={VIDEO_FAQ} />

          <RelatedTools exclude="video" />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default VideoPage;
