import { VideoInfo } from "./VideoCard";
import { JsonLd } from "./JsonLd";

interface MediaSchemaProps {
  videos: VideoInfo[];
  type: "video" | "audio";
  pageUrl: string;
}

export function MediaSchema({ videos, type, pageUrl }: MediaSchemaProps) {
  if (!videos.length) return null;

  const uploadDate = new Date().toISOString();

  const data = videos.map((v) => {
    if (type === "audio") {
      return {
        "@context": "https://schema.org",
        "@type": "AudioObject",
        name: v.title || `Áudio TikTok de @${v.author}`,
        description: `Áudio extraído de um vídeo do TikTok publicado por @${v.author}, disponível para download em MP3.`,
        contentUrl: v.musicUrl,
        encodingFormat: "audio/mpeg",
        duration: toIsoDuration(v.duration),
        uploadDate,
        creator: { "@type": "Person", name: `@${v.author}` },
        url: pageUrl,
      };
    }
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: v.title || `Vídeo TikTok de @${v.author}`,
      description: `Vídeo do TikTok publicado por @${v.author}, disponível para download em MP4 HD sem marca d'água.`,
      thumbnailUrl: v.thumbnail,
      contentUrl: v.downloadUrlHd || v.downloadUrl,
      embedUrl: v.downloadUrlHd || v.downloadUrl,
      uploadDate,
      duration: toIsoDuration(v.duration),
      creator: { "@type": "Person", name: `@${v.author}` },
      url: pageUrl,
    };
  });

  return <JsonLd id={`media-${type}-${videos.map((v) => v.id).join("-")}`} data={data} />;
}

function toIsoDuration(input: string): string {
  if (!input) return "PT0S";
  const parts = input.split(":").map((n) => parseInt(n, 10));
  let seconds = 0;
  if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
  else if (parts.length === 2) seconds = parts[0] * 60 + parts[1];
  else if (parts.length === 1 && !isNaN(parts[0])) seconds = parts[0];
  if (!seconds || isNaN(seconds)) return "PT0S";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `PT${h ? `${h}H` : ""}${m ? `${m}M` : ""}${s ? `${s}S` : ""}` || "PT0S";
}
