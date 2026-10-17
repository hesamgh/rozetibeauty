import Image from "next/image";
import { SITE } from "@/lib/data";
import { PhoneNumber } from "@/components/PhoneNumber";
import { PwaFooterInstall } from "@/components/PwaFooterInstall";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-charcoal text-white/80 overflow-hidden">
      {/* Top gradient line */}
      <div className="h-px bg-gradient-to-l from-transparent via-rose-500/50 to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-48 h-48 bg-gold-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/favicon.png"
                alt="لوگوی سالن زیبایی رزتی"
                width={40}
                height={40}
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-rose-500/20"
              />
              <h3 className="text-white text-xl font-bold">سالن زیبایی رزتی</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/50 max-w-xs">
              بهترین سالن زیبایی و آرایشگاه زنانه در میدان آرژانتین، منطقه ۶ تهران
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">تماس</h4>
            <ul className="space-y-3 text-sm">
              {SITE.phones.map((p) => (
                <li key={p.tel}>
                  <a
                    href={`tel:${p.tel}`}
                    className="flex items-center gap-2 hover:text-rose-400 transition-colors group"
                  >
                    <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <PhoneNumber display={p.display} />
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={SITE.url}
                  className="flex items-center gap-2 hover:text-rose-400 transition-colors group"
                >
                  <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-rose-500/20 transition-colors">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </span>
                  <span dir="ltr">rozetibeauty.ir</span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">شبکه‌های اجتماعی</h4>
            <div className="flex gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl bg-white/5 hover:bg-gradient-to-br hover:from-rose-500 hover:to-rose-600 px-3 py-2.5 transition-all hover:scale-105 hover:shadow-lg hover:shadow-rose-500/20"
                aria-label="اینستاگرام rozetibeauty"
              >
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
                <span className="text-sm font-medium" dir="ltr">
                  rozetibeauty
                </span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-white/35">
          <p>© {year} سالن زیبایی رزتی — تمامی حقوق محفوظ است</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <PwaFooterInstall />
            <p className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-500/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              میدان آرژانتین، تهران
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
