import type { Metadata } from "next";
import { SITE } from "@/lib/data";
import Header from "@/components/Header";
import HeroCarousel from "@/components/HeroCarousel";
import About from "@/components/About";
import Services from "@/components/Services";
import Gallery from "@/components/Gallery";
import Salon from "@/components/Salon";
import Contact from "@/components/Contact";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import SeoContent from "@/components/SeoContent";
import { PwaInstallBanner } from "@/components/PwaInstallBanner";
import { FloatingCallButton } from "@/components/FloatingCallButton";

export const metadata: Metadata = {
  title: SITE.title,
  description: SITE.description,
  keywords: [...SITE.keywords],
  alternates: {
    canonical: SITE.url,
    languages: {
      "fa-IR": SITE.url,
      "x-default": SITE.url,
    },
  },
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    type: "website",
    locale: SITE.locale,
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main className="overflow-x-hidden">
        <HeroCarousel />
        <About />
        <Services />
        <Gallery />
        <Salon />
        <Faq />
        <Contact />
      </main>
      <Footer />
      <PwaInstallBanner />
      <SeoContent />

      <FloatingCallButton />
    </>
  );
}
