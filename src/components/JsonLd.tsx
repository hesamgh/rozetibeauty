import { SITE, SERVICES, FAQ_ITEMS } from "@/lib/data";

function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const phones = SITE.phones.map((p) => `+98${p.tel.replace(/^0/, "")}`);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["BeautySalon", "LocalBusiness"],
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    alternateName: [
      "آرایشگاه زنانه رزتی",
      "سالن زیبایی میدان آرژانتین",
      "آرایشگاه زنانه منطقه آرژانتین",
      "Rozeti Beauty",
      "Rozeti Beauty Salon",
    ],
    description: SITE.description,
    url: SITE.url,
    telephone: phones,
    image: [
      `${SITE.url}/images/nama1.jpg`,
      `${SITE.url}/images/nama2.jpg`,
      `${SITE.url}/images/IMG_01.jpg`,
      `${SITE.url}/images/IMG_02.jpg`,
      `${SITE.url}/favicon.png`,
    ],
    logo: {
      "@type": "ImageObject",
      url: `${SITE.url}/favicon.png`,
      width: 512,
      height: 512,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.address,
      addressLocality: "تهران",
      addressRegion: "تهران",
      postalCode: "15138",
      addressCountry: "IR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.coordinates.lat,
      longitude: SITE.coordinates.lng,
    },
    location: {
      "@type": "Place",
      name: SITE.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address,
        addressLocality: "تهران",
        addressRegion: "تهران",
        addressCountry: "IR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.coordinates.lat,
        longitude: SITE.coordinates.lng,
      },
      hasMap: SITE.maps.google,
    },
    hasMap: SITE.maps.google,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
        ],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: phones[0],
        contactType: "customer service",
        areaServed: "IR",
        availableLanguage: ["fa", "Persian"],
      },
      {
        "@type": "ContactPoint",
        telephone: phones[1],
        contactType: "reservations",
        areaServed: "IR",
        availableLanguage: ["fa", "Persian"],
      },
    ],
    sameAs: [SITE.instagram, SITE.maps.google, SITE.maps.neshan],
    priceRange: "$$",
    currenciesAccepted: "IRR",
    paymentAccepted: "Cash, Credit Card",
    isAccessibleForFree: false,
    publicAccess: true,
    areaServed: SITE.areas.map((area) => ({
      "@type": "Place",
      name: `${area}، تهران`,
    })),
    knowsAbout: [
      ...SERVICES.map((s) => s.title),
      "سالن زیبایی میدان آرژانتین",
      "آرایشگاه زنانه تهران",
      "میکاپ عروس",
      "کاشت ناخن",
      "اپیلاسیون",
    ],
    slogan: "زیبایی حرفه‌ای در قلب میدان آرژانتین",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "خدمات سالن زیبایی رزتی",
      itemListElement: SERVICES.map((service, i) => ({
        "@type": "Offer",
        position: i + 1,
        url: `${SITE.url}/#services`,
        itemOffered: {
          "@type": "Service",
          "@id": `${SITE.url}/#service-${service.id}`,
          name: service.title,
          description: service.description,
          provider: { "@id": `${SITE.url}/#business` },
          areaServed: {
            "@type": "City",
            name: "تهران",
          },
          serviceType: service.title,
        },
      })),
    },
    potentialAction: [
      {
        "@type": "ReserveAction",
        name: "رزرو نوبت",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `tel:${SITE.phones[0].tel}`,
          inLanguage: "fa-IR",
          actionPlatform: [
            "http://schema.org/DesktopWebPlatform",
            "http://schema.org/MobileWebPlatform",
          ],
        },
      },
      {
        "@type": "CommunicateAction",
        name: "تماس با سالن",
        target: SITE.phones.map((p) => `tel:${p.tel}`),
      },
    ],
  };

  return <JsonLdScript data={jsonLd} />;
}

export function WebSiteJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE.url}/#website`,
    url: SITE.url,
    name: SITE.name,
    alternateName: "Rozeti Beauty",
    description: SITE.description,
    inLanguage: "fa-IR",
    publisher: { "@id": `${SITE.url}/#business` },
    copyrightHolder: { "@id": `${SITE.url}/#business` },
    datePublished: SITE.datePublished,
    dateModified: SITE.dateModified,
  };

  return <JsonLdScript data={jsonLd} />;
}

export function WebPageJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${SITE.url}/#webpage`,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    inLanguage: "fa-IR",
    isPartOf: { "@id": `${SITE.url}/#website` },
    about: { "@id": `${SITE.url}/#business` },
    mainEntity: { "@id": `${SITE.url}/#business` },
    datePublished: SITE.datePublished,
    dateModified: SITE.dateModified,
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${SITE.url}/images/nama1.jpg`,
      caption: "سالن زیبایی رزتی — میدان آرژانتین تهران",
    },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "#faq"],
    },
    breadcrumb: { "@id": `${SITE.url}/#breadcrumb` },
  };

  return <JsonLdScript data={jsonLd} />;
}

export function BreadcrumbJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE.url}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "خانه",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "خدمات",
        item: `${SITE.url}/#services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "نمونه‌کارها",
        item: `${SITE.url}/#gallery`,
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "تماس با سالن زیبایی رزتی",
        item: `${SITE.url}/#contact`,
      },
    ],
  };

  return <JsonLdScript data={jsonLd} />;
}

export function FaqJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE.url}/#faqpage`,
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLdScript data={jsonLd} />;
}

export function ItemListJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE.url}/#services-list`,
    name: "خدمات سالن زیبایی رزتی",
    description: "فهرست خدمات میکاپ، ناخن، اپیلاسیون، عروس و مراقبت پوست",
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((service, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: service.title,
      url: `${SITE.url}/#services`,
      description: service.description,
    })),
  };

  return <JsonLdScript data={jsonLd} />;
}
