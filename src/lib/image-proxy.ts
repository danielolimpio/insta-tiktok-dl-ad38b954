/**
 * TikTok cover URLs (tiktokcdn.com) are signed and either expire or block
 * direct hotlinking from browsers, which makes <img> requests fail.
 * We route them through images.weserv.nl, a free image proxy that
 * fetches the upstream image server-side and serves it with proper CORS.
 */
export function proxyImage(url: string | undefined | null): string {
  if (!url) return "";
  try {
    // Already proxied or local
    if (url.startsWith("/") || url.includes("images.weserv.nl")) return url;
    const u = new URL(url);
    // weserv expects the URL without protocol
    const stripped = `${u.host}${u.pathname}${u.search}`;
    return `https://images.weserv.nl/?url=${encodeURIComponent(stripped)}`;
  } catch {
    return url;
  }
}
