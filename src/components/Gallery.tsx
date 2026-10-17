"use client";

import { useState, useCallback, useEffect, useLayoutEffect, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { PORTFOLIO_IMAGES, PORTFOLIO_IMAGES_MIXED, PORTFOLIO_CATEGORIES } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

/** At 1848px (6 masonry columns) → 18 images = 3 rows */
const INITIAL_ROWS = 3;
const LOAD_MORE_ROWS = 2;

function getColumnCount(width: number): number {
  if (width >= 1280) return 6;
  if (width >= 1024) return 5;
  if (width >= 640) return 4;
  return 3;
}

function getGalleryLimits(width: number) {
  const columns = getColumnCount(width);
  return {
    columns,
    initial: columns * INITIAL_ROWS,
    loadMore: columns * LOAD_MORE_ROWS,
  };
}

function getInitialVisibleCount(width: number, total: number) {
  return Math.min(getGalleryLimits(width).initial, total);
}

const ASPECT_PATTERNS = [
  "aspect-[4/5]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[5/6]",
  "aspect-[4/5]",
  "aspect-square",
] as const;

function getAspectClass(index: number) {
  if (index % 9 === 0) return "aspect-[3/5]";
  if (index % 7 === 0) return "aspect-[5/4]";
  return ASPECT_PATTERNS[index % ASPECT_PATTERNS.length];
}


type CategoryId = (typeof PORTFOLIO_CATEGORIES)[number]["id"];

export default function Gallery() {
  const [category, setCategory] = useState<CategoryId>("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(INITIAL_ROWS * 3);

  const filtered = useMemo(
    () =>
      category === "all"
        ? PORTFOLIO_IMAGES_MIXED
        : PORTFOLIO_IMAGES.filter((img) => img.category === category),
    [category]
  );

  const limits = useMemo(
    () => getGalleryLimits(windowWidth || 375),
    [windowWidth]
  );
  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleCategoryChange = useCallback((cat: CategoryId) => {
    const width = window.innerWidth;
    setWindowWidth(width);
    setCategory(cat);
    const total =
      cat === "all"
        ? PORTFOLIO_IMAGES.length
        : PORTFOLIO_IMAGES.filter((img) => img.category === cat).length;
    setVisibleCount(getInitialVisibleCount(width, total));
    setLightbox(null);
    setZoomed(false);
  }, []);

  useLayoutEffect(() => {
    const width = window.innerWidth;
    setWindowWidth(width);
    setVisibleCount(getInitialVisibleCount(width, PORTFOLIO_IMAGES.length));
  }, []);

  useEffect(() => {
    const update = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const close = useCallback(() => {
    setLightbox(null);
    setZoomed(false);
  }, []);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (lightbox === null) return;
      setZoomed(false);
      setLightbox((lightbox + dir + filtered.length) % filtered.length);
    },
    [lightbox, filtered.length]
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

  const openLightbox = (index: number) => {
    setZoomed(false);
    setLightbox(index);
  };

  return (
    <section id="gallery" className="section-padding bg-white relative overflow-hidden">
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="گالری"
          title={
            <>
              نمونه‌کارهای <span className="text-gradient">سالن زیبایی رزتی</span>
            </>
          }
          description="روی هر عکس کلیک کنید تا بزرگ‌نمایی شود"
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {PORTFOLIO_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                category === cat.id
                  ? "text-white shadow-md shadow-rose-500/20"
                  : "bg-cream text-charcoal/65 hover:bg-rose-50 border border-rose-100/60"
              }`}
            >
              {category === cat.id && (
                <motion.span
                  layoutId="activeGalleryFilter"
                  className="absolute inset-0 bg-gradient-to-l from-rose-500 to-rose-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="masonry-grid">
          {visible.map((img, i) => (
            <motion.button
              key={`portfolio-${img.src}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: (i % 12) * 0.03, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => openLightbox(i)}
              className="masonry-item relative w-full rounded-xl overflow-hidden group cursor-pointer ring-1 ring-rose-100/40 hover:ring-rose-300/60 transition-all hover:shadow-[0_8px_24px_-4px_rgba(244,63,110,0.2)]"
              aria-label={`مشاهده ${img.alt}`}
            >
              <div className={`relative ${getAspectClass(i)}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  loading={i < 12 ? "eager" : "lazy"}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-charcoal/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                  <span className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-xl">
                    <svg className="w-5 h-5 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {hasMore && (
          <div className="text-center mt-10">
            <button
              onClick={() =>
                setVisibleCount((count) =>
                  Math.min(count + limits.loadMore, filtered.length)
                )
              }
              className="btn-secondary"
            >
              مشاهده بیشتر
              <span className="text-rose-500 text-sm">({filtered.length - visibleCount} عکس)</span>
            </button>
          </div>
        )}
      </div>

      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-md flex flex-col"
            onClick={close}
          >
            <div className="flex items-center justify-between p-4 sm:p-5 shrink-0">
              <button
                onClick={close}
                className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                aria-label="بستن"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <span className="text-white/60 text-sm tabular-nums bg-white/10 px-4 py-1.5 rounded-full" dir="ltr">
                {lightbox + 1} / {filtered.length}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
                className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10"
                aria-label={zoomed ? "کوچک‌نمایی" : "بزرگ‌نمایی"}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {zoomed ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  )}
                </svg>
              </button>
            </div>

            <div className="flex-1 relative flex items-center justify-center px-4 pb-2 min-h-0">
              <button
                onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                className="absolute right-2 sm:right-6 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 transition-colors border border-white/10"
                aria-label="عکس قبلی"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <motion.div
                key={lightbox}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 28 }}
                className={`relative w-full max-w-5xl h-full max-h-[70vh] overflow-hidden rounded-2xl ${
                  zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomed((z) => !z);
                }}
              >
                <motion.div
                  animate={{ scale: zoomed ? 1.75 : 1 }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={filtered[lightbox].src}
                    alt={filtered[lightbox].alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                  />
                </motion.div>
              </motion.div>

              <button
                onClick={(e) => { e.stopPropagation(); navigate(1); }}
                className="absolute left-2 sm:left-6 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/25 transition-colors border border-white/10"
                aria-label="عکس بعدی"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            <div className="shrink-0 px-4 pb-5 pt-2" onClick={(e) => e.stopPropagation()}>
              <div className="flex gap-2 overflow-x-auto pb-1 justify-center max-w-4xl mx-auto">
                {filtered.map((img, i) => (
                  <button
                    key={img.src}
                    onClick={() => { setZoomed(false); setLightbox(i); }}
                    className={`relative shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden transition-all ${
                      i === lightbox
                        ? "ring-2 ring-rose-400 ring-offset-2 ring-offset-charcoal scale-110"
                        : "opacity-40 hover:opacity-80"
                    }`}
                    aria-label={`رفتن به عکس ${i + 1}`}
                  >
                    <Image src={img.src} alt="" fill className="object-cover" sizes="56px" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
