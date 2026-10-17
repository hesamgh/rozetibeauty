const DISMISS_KEY = "rozetibeauty-pwa-dismissed";
const DISMISS_DAYS = 7;
const PWA_READY_EVENT = "rozetibeauty-pwa-ready";
const PWA_INSTALLED_EVENT = "rozetibeauty-pwa-installed";
const PWA_DISMISSED_EVENT = "rozetibeauty-pwa-dismissed";

export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

declare global {
  interface Window {
    __rozetibeautyPwa?: {
      deferredPrompt: BeforeInstallPromptEvent | null;
    };
  }
}

export function isAndroidDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android/i.test(navigator.userAgent);
}

export function isIosDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  return (
    /iPad|iPhone|iPod/i.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function canInstallOnThisDevice(): boolean {
  return isAndroidDevice() || isIosDevice() || Boolean(getDeferredPrompt());
}

export function isMobileViewport(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(max-width: 1023px)").matches;
}

export function isStandaloneMode(): boolean {
  if (typeof window === "undefined") return false;

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.matchMedia("(display-mode: fullscreen)").matches ||
    ("standalone" in navigator &&
      (navigator as Navigator & { standalone?: boolean }).standalone === true)
  );
}

export function isDismissedRecently(): boolean {
  if (typeof localStorage === "undefined") return false;

  const raw = localStorage.getItem(DISMISS_KEY);
  if (!raw) return false;

  const dismissedAt = Number(raw);
  if (Number.isNaN(dismissedAt)) return false;

  const elapsed = Date.now() - dismissedAt;
  return elapsed < DISMISS_DAYS * 24 * 60 * 60 * 1000;
}

export function dismissInstallBanner(): void {
  localStorage.setItem(DISMISS_KEY, String(Date.now()));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(PWA_DISMISSED_EVENT));
  }
}

export function getDeferredPrompt(): BeforeInstallPromptEvent | null {
  return window.__rozetibeautyPwa?.deferredPrompt ?? null;
}

export function canShowInstallBanner(): boolean {
  if (!isMobileViewport()) return false;
  if (isStandaloneMode()) return false;
  if (isDismissedRecently()) return false;
  return canInstallOnThisDevice();
}

export function canShowFooterInstallLink(): boolean {
  if (!isMobileViewport()) return false;
  if (isStandaloneMode()) return false;
  if (!isDismissedRecently()) return false;
  return canInstallOnThisDevice();
}

export function getInstallButtonLabel(): string {
  return isIosDevice() ? "افزودن به صفحه اصلی" : "نصب اپلیکیشن";
}

export async function runPwaInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  if (!getDeferredPrompt()) {
    await waitForDeferredPrompt(8000);
  }
  return triggerPwaInstall();
}

export async function triggerPwaInstall(): Promise<"accepted" | "dismissed" | "unavailable"> {
  const promptEvent = getDeferredPrompt();
  if (!promptEvent) return "unavailable";

  await promptEvent.prompt();
  const { outcome } = await promptEvent.userChoice;

  if (outcome === "accepted") {
    window.__rozetibeautyPwa = { deferredPrompt: null };
  }

  return outcome;
}

export function waitForDeferredPrompt(timeoutMs = 8000): Promise<BeforeInstallPromptEvent | null> {
  const existing = getDeferredPrompt();
  if (existing) return Promise.resolve(existing);

  return new Promise((resolve) => {
    const onReady = () => {
      cleanup();
      resolve(getDeferredPrompt());
    };

    const timer = window.setTimeout(() => {
      cleanup();
      resolve(getDeferredPrompt());
    }, timeoutMs);

    const cleanup = () => {
      window.clearTimeout(timer);
      window.removeEventListener(PWA_READY_EVENT, onReady);
    };

    window.addEventListener(PWA_READY_EVENT, onReady);
  });
}

export { PWA_READY_EVENT, PWA_INSTALLED_EVENT, PWA_DISMISSED_EVENT };
