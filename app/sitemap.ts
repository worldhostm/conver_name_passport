import type { MetadataRoute } from "next";
import { SURNAMES } from "@/data/surnames";
import { CONTENT_UPDATED_AT, absoluteUrl } from "@/lib/site";
import { GUIDES } from "./guide/_data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // 빌드 시각이 아닌 콘텐츠 갱신일을 쓴다. 매 빌드마다 lastmod가 바뀌면 검색엔진이 신호로 쓰지 못한다.
  const now = new Date(CONTENT_UPDATED_AT);
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
      url: absoluteUrl(`/guide/${g.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/privacy"), lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
