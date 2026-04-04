import { useState } from "react";
import { Download, Music, X, Check, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

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
  const [quality, setQuality] = useState("1080p");
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);

  const simulateDownload = () => {
    setState("downloading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setState("completed");
          return 100;
        }
        return p + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="w-full sm:w-[140px] h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
        <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" loading="lazy" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm text-foreground truncate">{video.title}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          TikTok • {video.size} • {video.duration}
        </p>
        <p className="text-xs text-tiktok-cyan mt-0.5">@{video.author}</p>

        {state === "downloading" && (
          <div className="mt-3">
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
          <div className="mt-2 flex items-center gap-1.5 text-xs font-medium text-green-500">
            <Check className="w-4 h-4" />
            Concluído
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 flex-shrink-0 self-center">
        {state === "idle" && (
          <>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="h-9 px-2 rounded-lg border border-border bg-background text-xs font-medium text-foreground"
            >
              <option value="1080p">MP4 1080p</option>
              <option value="720p">MP4 720p</option>
              <option value="480p">MP4 480p</option>
              <option value="mp3">MP3</option>
            </select>
            <button
              onClick={simulateDownload}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all duration-300"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button className="h-9 px-3 rounded-lg border border-tiktok-cyan text-tiktok-cyan text-xs font-bold hover:bg-tiktok-cyan/10 transition-all duration-300">
              <Music className="w-3.5 h-3.5" />
            </button>
          </>
        )}
        {state === "downloading" && (
          <button
            onClick={() => { setState("idle"); setProgress(0); }}
            className="h-9 w-9 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {state === "completed" && (
          <button
            onClick={() => { setState("idle"); setProgress(0); }}
            className="h-9 w-9 rounded-full bg-muted text-muted-foreground flex items-center justify-center hover:text-destructive transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
