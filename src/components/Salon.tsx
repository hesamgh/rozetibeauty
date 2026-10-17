"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SALON_IMAGES } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const ASPECTS = [
  "aspect-[3/5]",
  "aspect-square",
  "aspect-[4/5]",
  "aspect-[5/4]",
  "aspect-[3/4]",
] as const;

export default function Salon() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  const close = useCallback(() => setLightbox(null), []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightbox === null) return;
      setLightbox(
        (lightbox + dir + SALON_IMAGES.length) % SALON_IMAGES.length
      );
    },
    [lightbox]
  );

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") navigate(1);
      if (e.key === "ArrowRight") navigate(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, close, navigate]);

  return (
    <section id="salon" className="section-padding bg-section-cream relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gold-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-5xl mx-auto relative">
        <SectionHeading
          badge="فضای سالن"
          title={
            <>
              محیطی <span className="text-gradient">آرام و دلنشین</span>
            </>
          }
          description="با فضای سبز زیبا و اتاق بازی کودکان — روبروی بیمارستان کسری، میدان آرژانتین"
        />

        <div className="masonry-salon">
          {SALON_IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setLightbox(i)}
              className="masonry-item relative w-full rounded-2xl overflow-hidden group cursor-pointer ring-1 ring-rose-100/40 hover:ring-rose-300/50 transition-all hover:shadow-[0_8px_24px_-4px_rgba(244,63,110,0.15)]"
              aria-label={`مشاهده ${img.alt}`}
            >
              <div className={`relative ${ASPECTS[i % ASPECTS.length]}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute bottom-3 right-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <p className="text-white text-xs sm:text-sm font-medium truncate drop-shadow-lg">
                    {img.alt}
                  </p>
                </div>
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <span className="w-9 h-9 rounded-full bg-white/95 flex items-center justify-center shadow-lg">
                    <svg className="w-4 h-4 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 left-5 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 border border-white/10"
              aria-label="بستن"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 border border-white/10"
              aria-label="عکس قبلی"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 border border-white/10"
              aria-label="عکس بعدی"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <motion.div
              key={lightbox}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative w-full max-w-4xl h-[75vh] rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={SALON_IMAGES[lightbox].src}
                alt={SALON_IMAGES[lightbox].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            <p className="absolute bottom-5 text-white/50 text-sm bg-white/10 px-4 py-1.5 rounded-full" dir="ltr">
              {lightbox + 1} / {SALON_IMAGES.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
