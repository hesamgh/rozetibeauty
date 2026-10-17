"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SERVICES, SITE } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

function ServiceCarousel({
  images,
  title,
}: {
  images: readonly string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    setCurrent(0);
  }, [images]);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  if (images.length === 0) return null;

  return (
    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-charcoal/5 group shadow-[0_8px_40px_-8px_rgba(244,63,110,0.15)] ring-1 ring-rose-100/50">
      <AnimatePresence mode="wait">
        <motion.div
          key={`${title}-${current}`}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} — نمونه کار ${current + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.div>
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="عکس قبلی"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 sm:opacity-100 transition-all border border-white/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <button
            onClick={next}
            aria-label="عکس بعدی"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 hover:bg-white/35 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 sm:opacity-100 transition-all border border-white/20"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2 px-4 py-2 rounded-full bg-charcoal/30 backdrop-blur-md border border-white/10">
            {images.map((img, i) => (
              <button
                key={`${img}-${i}`}
                onClick={() => setCurrent(i)}
                aria-label={`نمونه کار ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-1.5 bg-white"
                    : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>

          <span
            className="absolute top-4 left-4 z-10 text-xs text-white bg-charcoal/30 backdrop-blur-md px-3 py-1.5 rounded-full tabular-nums border border-white/10"
            dir="ltr"
          >
            {current + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const service = SERVICES[active];

  return (
    <section id="services" className="section-padding bg-section-cream relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="خدمات ما"
          title={
            <>
              تخصص‌های <span className="text-gradient">سالن زیبایی رزتی</span>
            </>
          }
        />

        <div ref={tabsRef} className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mb-12">
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setActive(i)}
              className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                i === active
                  ? "text-white shadow-lg shadow-rose-500/25"
                  : "bg-white/80 text-charcoal/65 hover:bg-white hover:text-rose-600 border border-rose-100/60"
              }`}
            >
              {i === active && (
                <motion.span
                  layoutId="activeServiceTab"
                  className="absolute inset-0 bg-gradient-to-l from-rose-500 to-rose-600 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-1.5">
                <span>{s.icon}</span>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center"
          >
            <div className="order-2 lg:order-1">
              <div className="card-glass p-7 sm:p-8 lg:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-200 flex items-center justify-center text-2xl">
                    {service.icon}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold">{service.title}</h3>
                </div>
                <p className="text-charcoal/65 leading-relaxed text-base sm:text-lg mb-8">
                  {service.description}
                </p>
                <a href={`tel:${SITE.phones[0].tel}`} className="btn-primary">
                  رزرو این خدمت
                  <svg className="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
              </div>
            </div>

            {service.images.length > 0 ? (
              <div className="order-1 lg:order-2">
                <ServiceCarousel images={service.images} title={service.title} />
              </div>
            ) : (
              <div className="order-1 lg:order-2 relative aspect-[4/3] rounded-3xl overflow-hidden bg-gradient-to-br from-rose-100 via-rose-50 to-champagne flex items-center justify-center shadow-[0_8px_40px_-8px_rgba(244,63,110,0.12)]">
                <span className="text-7xl opacity-80">{service.icon}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
