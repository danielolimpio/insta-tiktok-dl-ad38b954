import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Sun, Moon } from "lucide-react";
import { VideoInfo } from "@/components/VideoCard";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { TikTokThumbnail } from "@/components/TikTokThumbnail";

const HISTORY_KEY = "tikdown_history";

function getRecentDownloads(): VideoInfo[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function Header() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("tikdown_theme") === "dark";
    }
    return false;
  });
  const [showNotifs, setShowNotifs] = useState(false);
  const [downloads, setDownloads] = useState<VideoInfo[]>([]);

  useEffect(() => {
    setDownloads(getRecentDownloads());
  }, [showNotifs]);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("tikdown_theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("tikdown_theme", "light");
    }
  }, [darkMode]);

  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("tikdown_theme");
    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const count = downloads.length;

  return (
    <header className="sticky top-0 z-30 w-full h-14 flex items-center justify-between px-4 sm:px-8 bg-background/80 backdrop-blur-md border-b border-border">
      <div />

      <div className="flex items-center gap-2">
        <LanguageSwitcher current="pt" label="Idioma" />

        {/* Dark/Light mode */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title={darkMode ? "Modo Claro" : "Modo Escuro"}
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="w-10 h-10 rounded-xl flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors relative"
            title="Notificações"
          >
            <Bell className="w-5 h-5" />
            {count > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
                {count > 9 ? "9+" : count}
              </span>
            )}
          </button>

          {showNotifs && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowNotifs(false)} />
              <div className="absolute right-0 top-12 w-80 max-h-96 overflow-y-auto bg-card border border-border rounded-xl shadow-xl z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Downloads Recentes</h3>
                </div>
                {count === 0 ? (
                  <div className="p-6 text-center text-muted-foreground text-sm">
                    Nenhum download realizado ainda.
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {downloads.slice(0, 10).map((d) => (
                      <div key={d.id} className="p-3 flex items-center gap-3 hover:bg-muted/50 transition-colors">
                        <div className="w-10 h-10 rounded-lg bg-muted overflow-hidden flex-shrink-0">
                          <TikTokThumbnail
                            src={d.thumbnail}
                            videoId={d.id}
                            author={d.author}
                            alt={d.title || "Vídeo TikTok"}
                            iconClassName="w-4 h-4"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-foreground font-medium truncate">{d.title || "Vídeo TikTok"}</p>
                          <p className="text-[11px] text-muted-foreground">@{d.author || "unknown"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {count > 0 && (
                  <div className="p-3 border-t border-border">
                    <button
                      onClick={() => { setShowNotifs(false); navigate("/download"); }}
                      className="w-full text-center text-xs font-medium text-primary hover:underline"
                    >
                      Ver todos os downloads
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
