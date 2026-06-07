/**
 * TikTok cover URLs are signed and either expire or block direct hotlinking,
 * which makes <img> requests fail or show blank placeholders.
 * We route them through images.weserv.nl, a free image proxy that
 * fetches the upstream image server-side and serves it with proper CORS.
 */
export function proxyImage(url: string | undefined | null): string {
  if (!url) return "";
  try {
    // Already proxied or local
    if (url.startsWith("/") || url.includes("images.weserv.nl")) return url;
    const u = new URL(url);
    if (u.hostname.includes("tikwm.com") || u.hostname.includes("tiktokcdn")) return url;
    // weserv expects the URL without protocol
    const stripped = `${u.host}${u.pathname}${u.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
  } catch {
    return url;
  }
}
