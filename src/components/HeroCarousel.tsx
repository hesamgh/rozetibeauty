"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HERO_SLIDES, SITE } from "@/lib/data";

const SLIDE_DURATION = 5000;
const CROSSFADE_DURATION = 0.9;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const slideStartRef = useRef(Date.now());

  const goTo = useCallback((index: number) => {
    setCurrent((index + HERO_SLIDES.length) % HERO_SLIDES.length);
    setProgress(0);
    slideStartRef.current = Date.now();
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    if (paused) return;

    const tick = setInterval(() => {
      const elapsed = Date.now() - slideStartRef.current;
      const p = Math.min(100, (elapsed / SLIDE_DURATION) * 100);
      setProgress(p);

      if (p >= 100) {
        setCurrent((c) => (c + 1) % HERO_SLIDES.length);
        setProgress(0);
        slideStartRef.current = Date.now();
      }
    }, 50);

    return () => clearInterval(tick);
  }, [paused]);

  const slide = HERO_SLIDES[current];

  return (
    <section
      id="home"
      className="bg-white pt-20 sm:pt-24 pb-6 sm:pb-8 px-4 sm:px-6 lg:px-8"
      aria-label="اسلایدر اصلی"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="relative w-full h-[36vh] min-h-[260px] max-h-[380px] sm:h-[40vh] sm:max-h-[420px] overflow-hidden rounded-2xl sm:rounded-3xl bg-charcoal shadow-[0_8px_40px_-8px_rgba(244,63,110,0.18)] ring-1 ring-rose-100/60">
          {/* All slides stacked — smooth crossfade, no white flash */}
          {HERO_SLIDES.map((s, i) => (
            <motion.div
              key={s.image}
              animate={{ opacity: i === current ? 1 : 0 }}
              transition={{ duration: CROSSFADE_DURATION, ease: "easeInOut" }}
              className="absolute inset-0"
              style={{ zIndex: i === current ? 2 : 1 }}
              aria-hidden={i !== current}
            >
              <div
                className="absolute inset-0 hero-ken-burns"
                style={{
                  animationPlayState: paused ? "paused" : "running",
                  animationDelay: `${i * 1.5}s`,
                }}
              >
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  priority={i <= 1}
                  className="object-cover"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/25 to-charcoal/5" />
              <div className="absolute inset-0 bg-gradient-to-l from-rose-900/10 to-transparent" />
            </motion.div>
          ))}

          {/* Content */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
            <div className="flex items-end justify-between gap-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="min-w-0 flex-1"
                >
                  <p className="text-rose-200/90 text-xs sm:text-sm font-medium mb-1.5">
                    سالن زیبایی رزتی · میدان آرژانتین
                  </p>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug">
                    {slide.title}
                  </h1>
                  <p className="text-white/75 text-sm sm:text-base mt-1 line-clamp-2 sm:line-clamp-1">
                    {slide.subtitle}
                  </p>
                </motion.div>
              </AnimatePresence>

              <div className="hidden sm:flex items-center gap-2 shrink-0">
                <a href={`tel:${SITE.phones[0].tel}`} className="btn-primary text-sm py-2.5 px-5">
                  رزرو نوبت
                </a>
                <a href="#gallery" className="btn-ghost text-sm py-2.5 px-5">
                  نمونه‌کارها
                </a>
              </div>
            </div>

            <div className="flex sm:hidden gap-2 mt-3">
              <a href={`tel:${SITE.phones[0].tel}`} className="flex-1 text-center btn-primary text-sm py-2.5">
                رزرو نوبت
              </a>
              <a href="#gallery" className="flex-1 text-center btn-ghost text-sm py-2.5">
                نمونه‌کارها
              </a>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    aria-label={`اسلاید ${i + 1}`}
                    aria-current={i === current ? "true" : undefined}
                    className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
                    style={{ width: i === current ? "2rem" : "1.25rem" }}
                  >
                    <span className="absolute inset-0 bg-white/25 rounded-full" />
                    {i === current && (
                      <span
                        className="absolute inset-y-0 right-0 bg-white rounded-full transition-[width] duration-75 ease-linear"
                        style={{ width: `${progress}%` }}
                      />
                    )}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  aria-label="اسلاید قبلی"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/15"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="اسلاید بعدی"
                  className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-sm flex items-center justify-center text-white transition-colors border border-white/15"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
