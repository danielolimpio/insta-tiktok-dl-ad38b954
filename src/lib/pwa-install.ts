// Captures the beforeinstallprompt event and triggers the native PWA install
// prompt the first time the user clicks/taps anywhere on the page.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const STORAGE_KEY = "pwa-install-prompted";

export function setupAutoInstallPrompt() {
  if (typeof window === "undefined") return;

  // Register a minimal service worker so Chrome/Edge fire beforeinstallprompt.
  // Skip in iframes / Lovable preview to avoid caching issues.
  const isInIframe = (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();
  const isPreviewHost =
    window.location.hostname.includes("lovableproject.com") ||
    window.location.hostname.includes("lovable.app") ||
    window.location.hostname.includes("id-preview--");

  if ("serviceWorker" in navigator) {
    if (isInIframe || isPreviewHost) {
      navigator.serviceWorker.getRegistrations().then((regs) => {
        regs.forEach((r) => r.unregister());
      });
    } else {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").catch(() => {});
      });
    }
  }

  let deferredPrompt: BeforeInstallPromptEvent | null = null;

  const isStandalone = () =>
    window.matchMedia("(display-mode: standalone)").matches ||
    // iOS Safari
    (window.navigator as unknown as { standalone?: boolean }).standalone === true;

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
  });

  const tryPrompt = async () => {
    if (!deferredPrompt) return;
    if (isStandalone()) return;
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return;

    sessionStorage.setItem(STORAGE_KEY, "1");
    const promptEvent = deferredPrompt;
    deferredPrompt = null;

    try {
      await promptEvent.prompt();
      await promptEvent.userChoice;
    } catch {
      // ignore
    }
  };

  const handler = () => {
    void tryPrompt();
  };

  // Listen for any click/tap anywhere on the page
  window.addEventListener("click", handler, { capture: true });
  window.addEventListener("touchend", handler, { capture: true });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    sessionStorage.setItem(STORAGE_KEY, "1");
  });
}
