"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SITE } from "@/lib/data";
import { PhoneNumber } from "@/components/PhoneNumber";

const NAV_ITEMS = [
  { href: "#home", label: "خانه" },
  { href: "#about", label: "درباره ما" },
  { href: "#services", label: "خدمات" },
  { href: "#gallery", label: "نمونه‌کارها" },
  { href: "#salon", label: "سالن" },
  { href: "#faq", label: "سوالات" },
  { href: "#contact", label: "تماس" },
];

function scrollToHash(href: string) {
  const id = href.replace("#", "");
  const target = id ? document.getElementById(id) : null;

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.pushState(null, "", href);
    return;
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
  window.history.pushState(null, "", href);
}

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pendingHash, setPendingHash] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen && pendingHash) {
      const hash = pendingHash;
      setPendingHash(null);
      requestAnimationFrame(() => scrollToHash(hash));
    }
  }, [menuOpen, pendingHash]);

  const handleMobileNav = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (!href.startsWith("#")) return;
      e.preventDefault();
      setPendingHash(href);
      setMenuOpen(false);
    },
    []
  );

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Full-width background on scroll */}
      <div
        aria-hidden
        className={`absolute inset-0 transition-[background-color,box-shadow,border-color] duration-300 ${
          scrolled
            ? "bg-white/95 border-b border-rose-100/60 shadow-[0_4px_24px_-4px_rgba(244,63,110,0.08)]"
            : "bg-transparent border-b border-transparent"
        }`}
      />

      {/* Content aligned with page sections (padding outside max-w-7xl) */}
      <div className="relative px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto relative">
        <div className="flex items-center justify-between h-14 sm:h-16 w-full">
          <a href="#home" className="flex items-center gap-3 shrink-0 group">
            <Image
              src="/favicon.png"
              alt="لوگوی سالن زیبایی رزتی"
              width={40}
              height={40}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl object-cover shadow-md shadow-rose-500/30 group-hover:scale-105 transition-transform"
              priority
            />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-bold text-gradient leading-none">
                رزتی
              </span>
              <span className="hidden sm:block text-[11px] text-charcoal/50 tracking-wide">
                سالن زیبایی
              </span>
            </div>
          </a>

          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="منوی اصلی"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm font-medium text-charcoal/70 rounded-full transition-colors duration-300 hover:text-rose-600 hover:bg-rose-50/80"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <a href={`tel:${SITE.phones[0].tel}`} className="btn-primary text-sm py-2.5 px-5">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <PhoneNumber display={SITE.phones[0].display} />
            </a>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-xl text-charcoal hover:bg-rose-50 transition-colors shrink-0"
            aria-label="منو"
            aria-expanded={menuOpen}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden absolute top-full left-0 right-0 mt-2 z-50 bg-white rounded-2xl border border-rose-100/60 shadow-xl overflow-hidden"
            >
              <nav className="p-3 flex flex-col gap-0.5" aria-label="منوی موبایل">
                {NAV_ITEMS.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={(e) => handleMobileNav(e, item.href)}
                    className="py-3 px-4 text-charcoal/80 hover:text-rose-600 hover:bg-rose-50/60 rounded-xl transition-colors font-medium"
                  >
                    {item.label}
                  </motion.a>
                ))}
                <a
                  href={`tel:${SITE.phones[0].tel}`}
                  onClick={() => setMenuOpen(false)}
                  className="mt-2 btn-primary text-center"
                >
                  تماس: <PhoneNumber display={SITE.phones[0].display} />
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </div>

      {/* Mobile overlay — full screen */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lg:hidden fixed inset-0 bg-charcoal/20 z-40"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </header>
  );
}
