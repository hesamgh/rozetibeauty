"use client";

import { useCallback, useEffect, useState } from "react";
import { SITE } from "@/lib/data";
import {
  PWA_DISMISSED_EVENT,
  PWA_INSTALLED_EVENT,
  PWA_READY_EVENT,
  canShowInstallBanner,
  isIosDevice,
  waitForDeferredPrompt,
} from "@/lib/pwa";

export function FloatingCallButton() {
  const [bannerVisible, setBannerVisible] = useState(false);

  const syncBanner = useCallback(() => {
    setBannerVisible(canShowInstallBanner());
  }, []);

  useEffect(() => {
    syncBanner();

    const onUpdate = () => syncBanner();
    const onInstalled = () => setBannerVisible(false);

    window.addEventListener(PWA_READY_EVENT, onUpdate);
    window.addEventListener(PWA_DISMISSED_EVENT, onUpdate);
    window.addEventListener(PWA_INSTALLED_EVENT, onInstalled);

    const media = window.matchMedia("(max-width: 1023px)");
    media.addEventListener("change", onUpdate);

    if (!isIosDevice()) {
      void waitForDeferredPrompt(12000).then(() => syncBanner());
    }

    return () => {
      window.removeEventListener(PWA_READY_EVENT, onUpdate);
      window.removeEventListener(PWA_DISMISSED_EVENT, onUpdate);
      window.removeEventListener(PWA_INSTALLED_EVENT, onInstalled);
      media.removeEventListener("change", onUpdate);
    };
  }, [syncBanner]);

  return (
    <a
      href={`tel:${SITE.phones[0].tel}`}
      className={`fixed left-6 z-40 md:hidden group transition-[bottom] duration-300 ease-out ${
        bannerVisible
          ? "bottom-[calc(11rem+env(safe-area-inset-bottom,0px))]"
          : "bottom-6"
      }`}
      aria-label="تماس با سالن زیبایی رزتی"
    >
      <span className="absolute inset-0 rounded-full bg-rose-500 fab-ring" />
      <span className="relative flex w-14 h-14 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-full shadow-xl shadow-rose-500/40 items-center justify-center transition-transform group-hover:scale-110 group-active:scale-95">
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      </span>
    </a>
  );
}
