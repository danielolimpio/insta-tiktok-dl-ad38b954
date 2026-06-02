// Minimal service worker — required by Chrome/Edge to fire the
// beforeinstallprompt event so the app can be installed as a PWA.
// Intentionally does NOT cache responses to avoid serving stale content.
self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Pass-through: required for install prompt eligibility.
  event.respondWith(fetch(event.request).catch(() => new Response("", { status: 504 })));
});
