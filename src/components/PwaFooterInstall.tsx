"use client";

import { useCallback, useEffect, useState } from "react";
import { PwaIosInstallHint } from "@/components/PwaIosInstallHint";
import {
  PWA_DISMISSED_EVENT,
  PWA_INSTALLED_EVENT,
  PWA_READY_EVENT,
  canShowFooterInstallLink,
  getInstallButtonLabel,
  isIosDevice,
  runPwaInstall,
} from "@/lib/pwa";

export function PwaFooterInstall() {
  const [visible, setVisible] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [iosHintOpen, setIosHintOpen] = useState(false);

  const syncVisibility = useCallback(() => {
    setVisible(canShowFooterInstallLink());
  }, []);

  useEffect(() => {
    syncVisibility();

    const onUpdate = () => syncVisibility();
    const onInstalled = () => setVisible(false);

    window.addEventListener(PWA_DISMISSED_EVENT, onUpdate);
    window.addEventListener(PWA_READY_EVENT, onUpdate);
    window.addEventListener(PWA_INSTALLED_EVENT, onInstalled);

    const media = window.matchMedia("(max-width: 1023px)");
    media.addEventListener("change", onUpdate);

    return () => {
      window.removeEventListener(PWA_DISMISSED_EVENT, onUpdate);
      window.removeEventListener(PWA_READY_EVENT, onUpdate);
      window.removeEventListener(PWA_INSTALLED_EVENT, onInstalled);
      media.removeEventListener("change", onUpdate);
    };
  }, [syncVisibility]);

  const handleInstall = async () => {
    if (installing) return;

    if (isIosDevice()) {
      setIosHintOpen(true);
      return;
    }

    setInstalling(true);
    try {
      const outcome = await runPwaInstall();
      if (outcome === "accepted") {
        setVisible(false);
      }
    } finally {
      setInstalling(false);
      syncVisibility();
    }
  };

  if (!visible) return null;

  return (
    <>
      <button
        type="button"
        onClick={handleInstall}
        disabled={installing}
        className="md:hidden flex items-center gap-2 text-rose-400 hover:text-rose-300 transition-colors disabled:opacity-60 outline-none"
      >
        <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
        <span>{installing ? "در حال نصب..." : getInstallButtonLabel()}</span>
      </button>

      <PwaIosInstallHint open={iosHintOpen} onClose={() => setIosHintOpen(false)} />
    </>
  );
}
