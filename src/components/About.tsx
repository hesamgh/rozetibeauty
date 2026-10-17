"use client";

import { motion } from "framer-motion";
import { FEATURES, SITE } from "@/lib/data";
import SectionHeading from "@/components/SectionHeading";

const ICONS = [
  <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>,
  <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
];

const STATS = [
  { value: "+۱۰", label: "سال تجربه" },
  { value: "۵", label: "خدمت تخصصی" },
  { value: "۶", label: "منطقه تحت پوشش" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function About() {
  return (
    <section id="about" className="section-padding bg-section-white bg-mesh relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="درباره ما"
          title={
            <>
              بهترین سالن زیبایی{" "}
              <span className="text-gradient">میدان آرژانتین</span>
            </>
          }
          description="سالن زیبایی رزتی با پرسنلی بسیار حرفه‌ای و تجهیزات مدرن، ارائه‌دهنده خدمات میکاپ، گریم، کاشت ناخن، اپیلاسیون و خدمات ویژه عروس در منطقه آرژانتین، بخارست، بیهقی و عباس‌آباد است."
        />

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 max-w-2xl mx-auto"
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 sm:p-5 rounded-2xl card-glass"
            >
              <p className="text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</p>
              <p className="text-xs sm:text-sm text-charcoal/50 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              custom={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="group card-elevated p-6 sm:p-7 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-l from-rose-400 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center text-white mb-5 shadow-md shadow-rose-500/20 group-hover:scale-110 transition-transform duration-300">
                {ICONS[i]}
              </div>
              <h3 className="font-bold text-lg mb-2.5">{feature.title}</h3>
              <p className="text-charcoal/55 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-14 flex flex-wrap justify-center gap-2.5"
        >
          {SITE.areas.map((area) => (
            <span
              key={area}
              className="px-4 py-2 text-sm bg-white text-charcoal/70 rounded-full border border-rose-100/80 shadow-sm hover:border-rose-200 hover:text-rose-600 transition-colors cursor-default"
            >
              {area}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
