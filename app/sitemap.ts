import type { MetadataRoute } from "next";
import {
  localizedPath,
  pagePath,
  SITE_URL,
  type PageKey,
} from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(pagePath) as PageKey[];
  return keys.flatMap((key) =>
    (["en", "fr"] as const).map((locale) => ({
      url: `${SITE_URL}${localizedPath(locale, key)}`,
      lastModified: new Date("2026-07-29"),
      changeFrequency: key === "home" ? "weekly" : "monthly",
      priority: key === "home" ? 1 : key === "privacy" ? 0.3 : 0.8,
      alternates: {
        languages: {
          en: `${SITE_URL}${localizedPath("en", key)}`,
          fr: `${SITE_URL}${localizedPath("fr", key)}`,
        },
      },
    })),
  );
}
