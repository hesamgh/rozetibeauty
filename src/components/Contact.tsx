"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SITE, EXTERIOR_IMAGES } from "@/lib/data";
import { PhoneNumber } from "@/components/PhoneNumber";
import SectionHeading from "@/components/SectionHeading";

const CONTACT_ICONS = {
  address: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  phone: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  hours: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  website: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
};

export default function Contact() {
  return (
    <section id="contact" className="section-padding bg-section-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-100/20 rounded-full blur-3xl pointer-events-none" />
      <div className="max-w-7xl mx-auto relative">
        <SectionHeading
          badge="تماس با ما"
          title={
            <>
              رزرو نوبت در <span className="text-gradient">سالن زیبایی رزتی</span>
            </>
          }
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <div className="card-elevated p-6 sm:p-7">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  {CONTACT_ICONS.address}
                </span>
                آدرس
              </h3>
              <p className="text-charcoal/65 leading-relaxed pr-13">{SITE.address}</p>
            </div>

            <div className="card-elevated p-6 sm:p-7">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  {CONTACT_ICONS.website}
                </span>
                وب‌سایت
              </h3>
              <a
                href={SITE.url}
                className="text-rose-600 hover:text-rose-700 font-medium transition-colors pr-13"
                dir="ltr"
              >
                https://rozetibeauty.ir
              </a>
            </div>

            <div className="card-elevated p-6 sm:p-7">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  {CONTACT_ICONS.phone}
                </span>
                تلفن
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                {SITE.phones.map((phone) => (
                  <a
                    key={phone.tel}
                    href={`tel:${phone.tel}`}
                    className="flex-1 text-center btn-primary"
                  >
                    <PhoneNumber display={phone.display} />
                  </a>
                ))}
              </div>
            </div>

            <div className="card-elevated p-6 sm:p-7">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center">
                  {CONTACT_ICONS.hours}
                </span>
                ساعات کاری
              </h3>
              <ul className="space-y-3">
                {SITE.hours.map((h) => (
                  <li key={h.days} className="flex justify-between items-center py-2 border-b border-rose-50 last:border-0">
                    <span className="text-charcoal/60">{h.days}</span>
                    <span className="font-semibold text-charcoal bg-rose-50 px-3 py-1 rounded-full text-sm">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={SITE.maps.google}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] btn-secondary"
              >
                <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Google Maps
              </a>
              <a
                href={SITE.maps.neshan}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 min-w-[140px] btn-secondary"
              >
                <svg className="w-5 h-5 text-rose-500" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
                نشان
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:h-full"
          >
            <div className="relative flex-1 min-h-[300px] lg:min-h-0 rounded-3xl overflow-hidden shadow-[0_12px_48px_-8px_rgba(244,63,110,0.15)] ring-1 ring-rose-100/50">
              <iframe
                title="موقعیت سالن زیبایی رزتی روی Google Maps"
                src={SITE.maps.googleEmbed}
                className="absolute inset-0 h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/80 via-charcoal/30 to-transparent pt-16 pb-6 px-6">
                <p className="pointer-events-auto text-white font-bold text-lg mb-3">مسیریابی به سالن</p>
                <div className="pointer-events-auto flex gap-2">
                  <a
                    href={SITE.maps.google}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-white/95 hover:bg-white text-charcoal rounded-xl text-sm font-medium transition-colors"
                  >
                    Google Maps
                  </a>
                  <a
                    href={SITE.maps.neshan}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 bg-gradient-to-l from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-xl text-sm font-medium transition-colors"
                  >
                    نشان
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 shrink-0 h-32 sm:h-36 lg:h-40">
              {EXTERIOR_IMAGES.map((img) => (
                <div
                  key={img.src}
                  className="relative h-full rounded-2xl overflow-hidden shadow-md ring-1 ring-rose-100/40 group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
