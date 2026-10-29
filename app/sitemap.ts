import type { MetadataRoute } from "next";
import { SURNAMES } from "@/data/surnames";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const GUIDES = ["passport-name", "family-surname", "name-format", "name-change", "romanization"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/surname"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    ...SURNAMES.map((s) => ({
      url: absoluteUrl(`/surname/${s.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/guide"), lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    ...GUIDES.map((g) => ({
      url: absoluteUrl(`/guide/${g}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
