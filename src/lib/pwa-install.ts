// Captures the beforeinstallprompt event and triggers the native PWA install
// prompt the first time the user clicks/taps anywhere on the page.

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

const STORAGE_KEY = "pwa-install-prompted";

export function setupAutoInstallPrompt() {
  if (typeof window === "undefined") return;

  // Do not register an app-shell service worker here. A previous SW caused
  // first-load stale HTML/CSS and broken image requests. Manifest metadata is
  // kept for home-screen support, while any old app SW is removed.
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((regs) => {
      regs.forEach((r) => {
        void r.unregister();
      });
    });
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
