// Kill-switch service worker.
// Previous versions could keep serving stale HTML/assets on a first visit,
// causing the app to appear unstyled and images to break until a refresh.
// This worker clears the app-shell caches, refreshes open pages, then removes
// itself so future loads go directly to the network/browser cache.
function isAppCacheForThisRegistration(name) {
  const appCachePattern = /(^|-)precache-v\d+-|(^|-)runtime-|(^|-)googleAnalytics-|tikdown|vite|workbox/i;
  return appCachePattern.test(name);
}

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cacheNames = await caches.keys();
        const appCaches = cacheNames.filter(isAppCacheForThisRegistration);
        await Promise.allSettled(appCaches.map((name) => caches.delete(name)));
        await self.clients.claim();
        const windowClients = await self.clients.matchAll({ type: "window" });
        await Promise.allSettled(windowClients.map((client) => client.navigate(client.url)));
      } finally {
        await self.registration.unregister();
      }
    })(),
  );
});
