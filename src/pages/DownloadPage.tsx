import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { AppSidebar } from "@/components/AppSidebar";
import { Footer } from "@/components/Footer";
import { Download, Trash2, Clock, Video, Music, Search, AlertCircle } from "lucide-react";
import { VideoInfo } from "@/components/VideoCard";
import { toast } from "sonner";

const HISTORY_KEY = "tikdown_history";

function getHistory(): VideoInfo[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const DownloadPage = () => {
  const [history, setHistory] = useState<VideoInfo[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const clearHistory = () => {
    localStorage.removeItem(HISTORY_KEY);
    setHistory([]);
    toast.success("Histórico limpo com sucesso!");
  };

  const removeItem = (id: string) => {
    const updated = history.filter((v) => v.id !== id);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
    setHistory(updated);
    toast.success("Item removido do histórico.");
  };

  const filtered = search.trim()
    ? history.filter(
        (v) =>
          v.title.toLowerCase().includes(search.toLowerCase()) ||
          v.author.toLowerCase().includes(search.toLowerCase())
      )
    : history;

  return (
    <div className="min-h-screen flex bg-background">
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
              <Clock className="w-3.5 h-3.5" />
              Histórico Local
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground leading-tight">
              Histórico de <span className="text-gradient-tiktok">Videos Baixados</span>
            </h1>
            <p className="text-muted-foreground mt-3 text-base max-w-xl mx-auto">
              Veja todos os videos TikTok que você já baixou. O histórico é salvo localmente no seu navegador para você acessar seus downloads facilmente.
            </p>
          </motion.div>

          {/* Info Banner */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card">
              <AlertCircle className="w-5 h-5 text-tiktok-cyan shrink-0 mt-0.5" />
              <div className="text-sm text-muted-foreground">
                <p className="font-medium text-foreground mb-1">Como funciona o histórico?</p>
                <p>Os downloads ficam salvos apenas no seu navegador (localStorage). Não armazenamos nenhuma informação em servidores. Ao limpar os dados do navegador, o histórico será removido automaticamente.</p>
              </div>
            </div>
          </div>

          {/* Search + Actions */}
          <div className="max-w-3xl mx-auto mb-6 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar no histórico..."
                className="w-full h-11 rounded-xl border border-border bg-background pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-tiktok-cyan focus:outline-none"
              />
            </div>
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                className="flex items-center justify-center gap-2 h-11 px-5 rounded-xl border border-destructive/30 text-destructive text-sm font-medium hover:bg-destructive/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Limpar Tudo
              </button>
            )}
          </div>

          {/* Stats */}
          {history.length > 0 && (
            <div className="max-w-3xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <Download className="w-5 h-5 text-tiktok-cyan mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{history.length}</p>
                <p className="text-xs text-muted-foreground">Total de Downloads</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card text-center">
                <Video className="w-5 h-5 text-tiktok-cyan mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{history.filter(v => v.downloadUrl).length}</p>
                <p className="text-xs text-muted-foreground">Vídeos</p>
              </div>
              <div className="p-4 rounded-xl border border-border bg-card text-center hidden sm:block">
                <Music className="w-5 h-5 text-tiktok-cyan mx-auto mb-1" />
                <p className="text-2xl font-bold text-foreground">{history.filter(v => v.musicUrl).length}</p>
                <p className="text-xs text-muted-foreground">Com Áudio</p>
              </div>
            </div>
          )}

          {/* History List */}
          <div className="max-w-3xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-16">
                <Clock className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {search ? "Nenhum resultado encontrado" : "Nenhum download ainda"}
                </h3>
                <p className="text-sm text-muted-foreground max-w-md mx-auto">
                  {search
                    ? "Tente buscar com outros termos."
                    : "Quando você baixar um vídeo na página inicial, ele aparecerá aqui automaticamente."}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map((video) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:shadow-sm transition-shadow"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden shrink-0">
                      {video.thumbnail ? (
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          crossOrigin="anonymous"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                          <Video className="w-6 h-6" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-foreground line-clamp-1">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        @{video.author} • {video.size} • {video.duration}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(video.id)}
                      className="shrink-0 p-2 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
                      title="Remover"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default DownloadPage;
