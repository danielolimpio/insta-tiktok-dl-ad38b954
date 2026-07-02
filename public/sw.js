// Minimal, non-intrusive service worker.
// Purpose: satisfy PWA install-prompt eligibility on Chrome/Edge WITHOUT
// intercepting any network request. Intercepting caused broken images on
// first load (favicon + TikTok thumbnails) because clients.claim() + a
// respondWith fetch handler re-issued in-flight requests through the SW
// context, losing referrer/credentials and failing cross-origin fetches.
const SW_VERSION = "v3-passthrough";

self.addEventListener("install", () => {
  // Activate as soon as it's installed, but do NOT claim existing clients —
  // the current page keeps using the network directly until the next reload.
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  // Clean up any legacy caches from older SW versions.
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))))
  );
});

// Empty fetch listener: presence is enough for install-prompt heuristics on
// older Chrome; we deliberately do NOT call event.respondWith so the browser
// handles every request natively (correct referrer, cookies, CORS, cache).
self.addEventListener("fetch", () => {});
