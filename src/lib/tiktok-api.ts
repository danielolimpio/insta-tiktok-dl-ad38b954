export interface TikTokVideoData {
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

const TIKWM_ORIGIN = "https://www.tikwm.com";

function resolveTikWmUrl(url?: string) {
  if (!url) return "";

  try {
    return new URL(url, TIKWM_ORIGIN).toString();
  } catch {
    return url;
  }
}

export async function fetchTikTokVideo(url: string): Promise<TikTokVideoData> {
  const response = await fetch("https://www.tikwm.com/api/", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      url,
      count: "12",
      cursor: "0",
      web: "1",
      hd: "1",
    }),
  });

  if (!response.ok) {
    throw new Error("Falha ao conectar com o servidor. Tente novamente.");
  }

  const json = await response.json();

  if (json.code !== 0 || !json.data) {
    throw new Error(json.msg || "Não foi possível processar este vídeo.");
  }

  const d = json.data;
  const durationSec = d.duration || 0;
  const mins = Math.floor(durationSec / 60);
  const secs = durationSec % 60;
  const durationStr = `${mins}:${secs.toString().padStart(2, "0")}`;

  const sizeMB = d.size ? (d.size / (1024 * 1024)).toFixed(1) + "MB" : "N/A";

  return {
    id: d.id || String(Date.now()),
    title: d.title || "Vídeo do TikTok",
    author: d.author?.unique_id || d.author?.nickname || "unknown",
    duration: durationStr,
    size: sizeMB,
    thumbnail: d.origin_cover || d.cover || "",
    downloadUrl: resolveTikWmUrl(d.play),
    downloadUrlHd: resolveTikWmUrl(d.hdplay || d.play),
    musicUrl: resolveTikWmUrl(d.music),
  };
}
