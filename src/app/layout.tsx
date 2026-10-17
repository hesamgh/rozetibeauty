import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { SITE } from "@/lib/data";
import {
  LocalBusinessJsonLd,
  WebSiteJsonLd,
  WebPageJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
  ItemListJsonLd,
} from "@/components/JsonLd";
import { iranSans } from "@/lib/fonts";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#f43f6e",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  referrer: "origin-when-cross-origin",
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: SITE.url,
    languages: {
      "fa-IR": SITE.url,
    },
  },
  openGraph: {
    type: "website",
    locale: SITE.locale,
    alternateLocale: ["fa"],
    url: SITE.url,
    siteName: SITE.name,
    title: SITE.title,
    description: SITE.description,
    countryName: "Iran",
    images: [
      {
        url: "/images/nama1.jpg",
        width: 1200,
        height: 630,
        alt: "سالن زیبایی رزتی — آرایشگاه زنانه میدان آرژانتین تهران",
        type: "image/jpeg",
      },
      {
        url: "/images/IMG_01.jpg",
        width: 1200,
        height: 800,
        alt: "فضای داخلی سالن زیبایی رزتی میدان آرژانتین",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
    images: ["/images/nama1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {},
  category: "beauty",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: "/icons/icon-192.png",
  },
  other: {
    "geo.region": SITE.geo.region,
    "geo.placename": SITE.geo.placename,
    "geo.position": SITE.geo.position,
    ICBM: SITE.geo.icbm,
    "business:contact_data:website": SITE.url,
    "business:contact_data:locality": "تهران",
    "business:contact_data:region": "تهران",
    "business:contact_data:country_name": "Iran",
    "business:contact_data:street_address": SITE.address,
    "business:contact_data:phone_number": SITE.phones.map((p) => p.tel).join(", "),
    "og:see_also": SITE.instagram,
    "article:modified_time": SITE.dateModified,
    "article:published_time": SITE.datePublished,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={iranSans.variable}>
      <head>
        <LocalBusinessJsonLd />
        <WebSiteJsonLd />
        <WebPageJsonLd />
        <BreadcrumbJsonLd />
        <FaqJsonLd />
        <ItemListJsonLd />
      </head>
      <body className={iranSans.className}>
        {children}
        <Script src="/pwa-bootstrap.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
