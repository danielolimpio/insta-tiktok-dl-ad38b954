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

const downloadFile = async (
  url: string,
  filename: string,
  onProgress: (p: number) => void,
  onDone: () => void
) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Download failed");

    const contentLength = response.headers.get("content-length");
    const total = contentLength ? parseInt(contentLength, 10) : 0;

    if (total && response.body) {
      const reader = response.body.getReader();
      const chunks: Uint8Array[] = [];
      let received = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.length;
        onProgress(Math.min((received / total) * 100, 99));
      }

      const blob = new Blob(chunks, { type: filename.endsWith(".mp3") ? "audio/mpeg" : "video/mp4" });
      triggerBlobDownload(blob, filename);
    } else {
      // Fallback: no content-length, just get full blob
      const blob = await response.blob();
      triggerBlobDownload(blob, filename);
    }

    onProgress(100);
    onDone();
  } catch {
    // Fallback: open in new tab
    window.open(url, "_blank");
    onProgress(100);
    onDone();
  }
};

function triggerBlobDownload(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

export function VideoCard({ video }: { video: VideoInfo }) {
  const [quality, setQuality] = useState("1080p");
  const [state, setState] = useState<DownloadState>("idle");
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    const isHd = quality === "1080p";
    const isMp3 = quality === "mp3";
    const url = isMp3 ? video.musicUrl : isHd ? video.downloadUrlHd : video.downloadUrl;
    const ext = isMp3 ? "mp3" : "mp4";
    const filename = `${video.author}_${video.id}.${ext}`;

    setState("downloading");
    setProgress(0);

    downloadFile(
      url,
      filename,
      (p) => setProgress(p),
      () => setState("completed")
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 p-4 rounded-2xl border border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      {/* Top row: thumbnail + info */}
      <div className="flex items-start gap-3">
        <div className="w-20 h-20 sm:w-[140px] sm:h-24 rounded-lg bg-muted overflow-hidden flex-shrink-0">
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

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2">{video.title}</h3>
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
      <div className="flex flex-wrap items-center gap-2">
        {state === "idle" && (
          <>
            <select
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              className="h-9 px-2 rounded-lg border border-border bg-background text-xs font-medium text-foreground flex-1 min-w-[100px]"
            >
              <option value="1080p">MP4 1080p</option>
              <option value="720p">MP4 720p</option>
              <option value="480p">MP4 480p</option>
              <option value="mp3">MP3</option>
            </select>
            <button
              onClick={startDownload}
              className="h-9 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 hover:opacity-90 transition-all duration-300 flex-1 min-w-[100px] justify-center"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
            <button
              onClick={() => {
                setState("downloading");
                setProgress(0);
                downloadFile(
                  video.musicUrl,
                  `${video.author}_${video.id}.mp3`,
                  (p) => setProgress(p),
                  () => setState("completed")
                );
              }}
              className="h-9 px-3 rounded-lg border border-tiktok-cyan text-tiktok-cyan text-xs font-bold hover:bg-tiktok-cyan/10 transition-all duration-300 flex items-center gap-1.5 justify-center"
            >
              <Music className="w-3.5 h-3.5" />
              <span className="sm:hidden">MP3</span>
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
