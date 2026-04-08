export type DownloadMediaKind = "video" | "audio";

interface DownloadMediaOptions {
  urls: string[];
  filename: string;
  kind: DownloadMediaKind;
  isMobile?: boolean;
  onDone: () => void;
  onProgress: (progress: number) => void;
}

const MIME_TYPES: Record<DownloadMediaKind, string> = {
  video: "video/mp4",
  audio: "audio/mpeg",
};

function triggerBlobDownload(blob: Blob, filename: string) {
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
}

async function fetchTypedBlob(
  url: string,
  mimeType: string,
  onProgress: (progress: number) => void,
) {
  const response = await fetch(url, {
    cache: "no-store",
    credentials: "omit",
    headers: {
      Accept: `${mimeType},*/*;q=0.8`,
    },
    mode: "cors",
  });

  if (!response.ok) {
    throw new Error("Download failed");
  }

  const contentLength = response.headers.get("content-length");
  const total = contentLength ? Number.parseInt(contentLength, 10) : 0;

  if (response.body) {
    const reader = response.body.getReader();
    const chunks: ArrayBuffer[] = [];
    let received = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (!value) continue;
      chunks.push(value.slice().buffer as ArrayBuffer);
      received += value.byteLength;

      if (total > 0) {
        onProgress(Math.min((received / total) * 100, 99));
      }
    }

    return new Blob(chunks, { type: mimeType });
  }

  const rawBlob = await response.blob();
  return new Blob([rawBlob], { type: mimeType });
}

function openDirectDownload(url: string, isMobile: boolean) {
  if (isMobile) {
    window.location.assign(url);
    return;
  }

  window.open(url, "_blank", "noopener,noreferrer");
}

export async function downloadMedia({
  urls,
  filename,
  kind,
  isMobile = false,
  onDone,
  onProgress,
}: DownloadMediaOptions) {
  const mimeType = MIME_TYPES[kind];
  const candidates = urls.filter(Boolean);

  if (!candidates.length) {
    throw new Error("Nenhum arquivo disponível para download.");
  }

  let lastError: unknown;

  for (const url of candidates) {
    try {
      const blob = await fetchTypedBlob(url, mimeType, onProgress);
      triggerBlobDownload(blob, filename);
      onProgress(100);
      onDone();
      return;
    } catch (error) {
      lastError = error;
    }
  }

  openDirectDownload(candidates[0], isMobile);
  onProgress(100);
  onDone();

  if (lastError) {
    console.warn("Blob download fallback activated", lastError);
  }
}