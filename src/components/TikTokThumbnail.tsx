import { useEffect, useMemo, useState } from "react";
import { Video } from "lucide-react";
import { proxyImage } from "@/lib/image-proxy";

interface TikTokThumbnailProps {
  src?: string;
  videoId?: string;
  author?: string;
  alt: string;
  className?: string;
  iconClassName?: string;
}

async function fetchOEmbedThumbnail(videoId?: string, author?: string) {
  if (!videoId || !author) return "";

  try {
    const pageUrl = `https://www.tiktok.com/@${author.replace(/^@/, "")}/video/${videoId}`;
    const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(pageUrl)}`);
    if (!response.ok) return "";

    const data = await response.json();
    return typeof data.thumbnail_url === "string" ? data.thumbnail_url : "";
  } catch {
    return "";
  }
}

export function TikTokThumbnail({
  src,
  videoId,
  author,
  alt,
  className = "w-full h-full object-cover",
  iconClassName = "w-6 h-6",
}: TikTokThumbnailProps) {
  const initialSrc = useMemo(() => proxyImage(src), [src]);
  const [imageSrc, setImageSrc] = useState(initialSrc);
  const [failed, setFailed] = useState(false);
  const [triedFallback, setTriedFallback] = useState(false);

  useEffect(() => {
    setImageSrc(initialSrc);
    setFailed(false);
    setTriedFallback(false);
  }, [initialSrc]);

  const loadFallback = async () => {
    if (triedFallback) {
      setFailed(true);
      return;
    }

    setTriedFallback(true);
    const fallback = await fetchOEmbedThumbnail(videoId, author);
    const nextSrc = proxyImage(fallback);
    if (nextSrc && nextSrc !== imageSrc) {
      setImageSrc(nextSrc);
      setFailed(false);
      return;
    }

    setFailed(true);
  };

  if (!imageSrc || failed) {
    return (
      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
        <Video className={iconClassName} />
      </div>
    );
  }

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => {
        void loadFallback();
      }}
    />
  );
}