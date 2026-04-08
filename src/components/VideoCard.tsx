import { useState } from "react";
import { Download, Music, X, Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useIsMobile } from "@/hooks/use-mobile";
import { downloadMedia } from "@/lib/download-media";

export interface VideoInfo {
  id: string;
  title: string;
  author: string;
  duration: string;
  size: string;
  thumbnail: string;
  downloadUrl: string;
  downloadUrlHd: string;
  musicUrl: string;
}

type DownloadState = "idle" | "downloading" | "completed";

export function VideoCard({ video }: { video: VideoInfo }) {
  const isMobile = useIsMobile();
  const [quality, setQuality] = useState("1080p");
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);

  const startDownload = async (forcedQuality?: "mp3") => {
    const selectedQuality = forcedQuality ?? quality;
    const isHd = selectedQuality === "1080p";
    const isMp3 = selectedQuality === "mp3";
    const ext = isMp3 ? "mp3" : "mp4";
    const filename = `${video.author}_${video.id}.${ext}`;
    const urls = isMp3
      ? [video.musicUrl]
      : isMobile
        ? [video.downloadUrl, video.downloadUrlHd]
        : isHd
          ? [video.downloadUrlHd, video.downloadUrl]
          : [video.downloadUrl, video.downloadUrlHd];

    setState("downloading");
    setProgress(0);

    try {
      await downloadMedia({
        urls,
        filename,
        kind: isMp3 ? "audio" : "video",
        isMobile,
        onProgress: (p) => setProgress(p),
        onDone: () => setState("completed"),
      });
    } catch {
      setState("idle");
      setProgress(0);
      toast.error("Não foi possível baixar este arquivo no momento.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow duration-300 hover:shadow-md"
    >
      {/* Top row: thumbnail + info */}
      <div className="grid gap-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-start">
        <div className="h-48 w-full overflow-hidden rounded-xl bg-muted sm:h-24 sm:w-[140px]">
          {video.thumbnail ? (
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
              loading="lazy"
              crossOrigin="anonymous"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center text-muted-foreground"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg></div>';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/></svg>
            </div>
          )}
        </div>

        <div className="min-w-0">
          <h3 className="line-clamp-2 text-base font-semibold text-foreground sm:text-sm">{video.title}</h3>
          <p className="text-xs text-muted-foreground mt-1">
            TikTok • {video.size} • {video.duration}
          </p>
          <p className="text-xs text-tiktok-cyan mt-0.5">@{video.author}</p>
        </div>
      </div>

      {/* Progress bar */}
      {state === "downloading" && (
        <div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full bg-tiktok-cyan rounded-full"
              animate={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <p className="text-xs text-tiktok-cyan mt-1 font-medium">{Math.round(Math.min(progress, 100))}%</p>
        </div>
      )}

      {state === "completed" && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-green-500">
          <Check className="w-4 h-4" />
          Concluído
        </div>
      )}

      {/* Action buttons - full width on mobile */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
        {state === "idle" && (
          <>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm font-medium text-foreground sm:h-9 sm:flex-1 sm:min-w-[120px] sm:px-2 sm:text-xs"
            >
              <option value="1080p">MP4 1080p</option>
              <option value="720p">MP4 720p</option>
              <option value="480p">MP4 480p</option>
              <option value="mp3">MP3</option>
            </select>
            <button
              onClick={startDownload}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-bold text-primary-foreground transition-all duration-300 hover:opacity-90 sm:h-9 sm:flex-1 sm:min-w-[140px] sm:text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={() => startDownload("mp3")}
              className="flex h-11 w-full items-center justify-center gap-1.5 rounded-lg border border-tiktok-cyan px-3 text-sm font-bold text-tiktok-cyan transition-all duration-300 hover:bg-tiktok-cyan/10 sm:h-9 sm:w-auto sm:text-xs"
            >
              <Music className="w-3.5 h-3.5" />
              <span>Baixar MP3</span>
            </button>
          </>
        )}
        {state === "downloading" && (
          <button
            onClick={() => { setState("idle"); setProgress(0); }}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors hover:bg-primary/20 sm:h-9 sm:w-9 sm:rounded-full"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {state === "completed" && (
          <button
            onClick={() => { setState("idle"); setProgress(0); }}
            className="flex h-11 w-full items-center justify-center rounded-xl bg-muted text-muted-foreground transition-colors hover:text-destructive sm:h-9 sm:w-9 sm:rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
