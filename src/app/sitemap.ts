import type { MetadataRoute } from "next";
import { SITE } from "@/lib/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(SITE.dateModified),
      changeFrequency: "weekly",
      priority: 1,
      images: [
        `${SITE.url}/images/nama1.jpg`,
        `${SITE.url}/images/IMG_01.jpg`,
        `${SITE.url}/favicon.png`,
      ],
    },
  ];
}
