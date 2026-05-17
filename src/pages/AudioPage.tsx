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
import { Music, Headphones, Disc3, Radio } from "lucide-react";
import { Link } from "react-router-dom";
import { PageBreadcrumbs } from "@/components/PageBreadcrumbs";
import { PageFAQ } from "@/components/PageFAQ";
import { RelatedTools } from "@/components/RelatedTools";

const AUDIO_FAQ = [
  { q: "Como baixar áudio do TikTok em MP3?", a: "Cole o link do vídeo do TikTok que contém a música ou som desejado, clique em Baixar Agora e selecione a opção Áudio MP3. O TikDown entrega o arquivo MP3 em alta qualidade, pronto para salvar no PC ou celular." },
  { q: "É possível baixar músicas virais do TikTok em MP3?", a: "Sim. Qualquer som ou trilha utilizado em um vídeo público do TikTok pode ser extraído em MP3, incluindo músicas virais, remixes, narrações e efeitos sonoros." },
  { q: "Posso usar o MP3 baixado como toque de celular?", a: "Sim. O MP3 extraído do TikTok pode ser usado como ringtone, alarme ou notificação no Android e iPhone, além de servir como trilha sonora em edições no CapCut, InShot e outros editores." },
  { q: "Qual a qualidade do áudio MP3 do TikTok?", a: "Mantemos a qualidade original do áudio publicado no TikTok, sem compressão adicional. O resultado é um MP3 limpo, ideal para escuta e edição." },
  { q: "Quero o vídeo completo em vez do áudio. Onde baixo?", a: "Use nossa página dedicada de vídeo em /video para baixar o TikTok completo em MP4 1080p Full HD sem marca d'água." },
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

const AudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [videos, setVideos] = useState<VideoInfo[]>([]);

  const handleSubmit = async (url: string) => {
    setIsLoading(true);
    setVideos([]);
    try {
      const videoData = await fetchTikTokVideo(url);
      setVideos([videoData]);
      saveToHistory(videoData);
      toast.success("Áudio do TikTok pronto para download em MP3!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao buscar o áudio. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      <SEO
        title="Baixar Áudio do TikTok em MP3 Grátis | TikTok MP3 Downloader"
        description="Baixar áudio do TikTok em MP3 grátis e sem cadastro. Extraia músicas, sons virais e narrações do TikTok em alta qualidade — funciona em PC, Android e iPhone."
        canonical="https://baixarvideostiktok.com/audio"
        keywords="baixar audio tiktok, baixar musica tiktok, tiktok mp3, tiktok mp3 download, tiktok audio downloader, baixar som do tiktok, extrair audio tiktok, tiktok music download, salvar musica tiktok, ringtone tiktok"
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
              <Music className="w-3.5 h-3.5" />
              TikTok MP3 Downloader
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Baixar Áudio do TikTok em <span className="text-gradient-tiktok">MP3 Grátis</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Extraia o <strong className="text-foreground">som do TikTok em MP3</strong> — músicas virais, narrações, efeitos sonoros e trilhas. Online, grátis, ilimitado e em alta qualidade.
            </p>
          </motion.div>

          <PageBreadcrumbs items={[{ name: "Baixar Áudio MP3", url: "/audio" }]} />

          <URLInput onSubmit={handleSubmit} isLoading={isLoading} />

          {videos.length > 0 && (
            <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 max-w-3xl mx-auto">
              <h2 className="text-xl font-bold text-foreground mb-4">Áudio Pronto para Download</h2>
              <p className="text-sm text-muted-foreground mb-4">Use o botão "Áudio MP3" no card abaixo para baixar apenas a faixa sonora.</p>
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
              <h2 className="text-2xl font-bold text-foreground mb-3">Como baixar música do TikTok em MP3</h2>
              <p className="text-muted-foreground leading-relaxed">
                Para <strong className="text-foreground">baixar áudio do TikTok em MP3</strong>, copie o link do vídeo que contém a música ou som desejado, cole no campo acima e clique em "Baixar Agora". Após o processamento, escolha a opção <strong className="text-foreground">"Áudio MP3"</strong> para extrair apenas a faixa sonora — sem vídeo, em alta qualidade e pronto para usar como toque de celular, edição de vídeo ou playlist.
              </p>
            </article>

            <article>
              <h2 className="text-2xl font-bold text-foreground mb-3">Para que serve baixar áudio do TikTok</h2>
              <p className="text-muted-foreground leading-relaxed">
                Baixar <strong className="text-foreground">músicas do TikTok em MP3</strong> é útil para criar ringtones personalizados, montar playlists com sons virais, usar trilhas em edições de vídeo no CapCut ou InShot, gravar narrações como base para podcasts e arquivar áudios que podem desaparecer da plataforma. O TikDown extrai o áudio direto da fonte, mantendo a qualidade original.
              </p>
            </article>

            <div className="grid sm:grid-cols-3 gap-4 mt-8">
              <div className="p-5 rounded-xl border border-border bg-card">
                <Headphones className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Alta Qualidade</h3>
                <p className="text-xs text-muted-foreground">MP3 com a qualidade original do TikTok.</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <Disc3 className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Músicas Virais</h3>
                <p className="text-xs text-muted-foreground">Salve trends e sons antes que sumam.</p>
              </div>
              <div className="p-5 rounded-xl border border-border bg-card">
                <Radio className="w-6 h-6 text-tiktok-cyan mb-2" />
                <h3 className="font-semibold text-foreground mb-1">Toque de Celular</h3>
                <p className="text-xs text-muted-foreground">MP3 pronto para usar como ringtone.</p>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default AudioPage;
