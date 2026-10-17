"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/data";
import { PhoneNumbers } from "@/components/PhoneNumber";
import SectionHeading from "@/components/SectionHeading";

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-padding bg-mesh relative overflow-hidden" aria-labelledby="faq-heading">
      <div className="max-w-3xl mx-auto relative">
        <SectionHeading
          badge="سوالات متداول"
          title={
            <>
              پرسش‌های <span className="text-gradient">متداول</span>
            </>
          }
        />

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <motion.div
                key={item.question}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl overflow-hidden transition-[background-color,box-shadow,border-color] duration-300 border ${
                  isOpen
                    ? "bg-white shadow-[0_4px_24px_-4px_rgba(244,63,110,0.1)] border-rose-200/60"
                    : "bg-white/70 border-rose-100/60 hover:border-rose-200/80"
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-5 sm:p-6 text-right transition-colors outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/50 focus-visible:ring-inset rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <span
                    className={`shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-sm font-bold transition-colors ${
                      isOpen
                        ? "bg-gradient-to-br from-rose-400 to-rose-600 text-white"
                        : "bg-rose-50 text-rose-500"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`flex-1 font-medium transition-colors ${isOpen ? "text-rose-700" : "text-charcoal"}`}>
                    {item.question}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-rose-50 text-rose-500" : "bg-cream text-charcoal/40"
                    }`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 mr-12 sm:mr-14 text-charcoal/65 leading-relaxed text-sm sm:text-base border-t border-rose-50 pt-4">
                        {"includePhones" in item && item.includePhones ? (
                          <>
                            برای رزرو نوبت می‌توانید با شماره‌های{" "}
                            <PhoneNumbers /> تماس بگیرید.
                          </>
                        ) : (
                          item.answer
                        )}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
