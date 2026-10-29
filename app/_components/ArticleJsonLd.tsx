import { CONTENT_PUBLISHED_AT, CONTENT_UPDATED_AT, SITE_NAME, absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

interface Props {
  path: string;
  headline: string;
  description: string;
}

/** 가이드 페이지용 Article 구조화 데이터. */
export function ArticleJsonLd({ path, headline, description }: Props) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Article",
        headline,
        description,
        inLanguage: "ko",
        mainEntityOfPage: absoluteUrl(path),
        datePublished: CONTENT_PUBLISHED_AT,
        dateModified: CONTENT_UPDATED_AT,
        author: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        publisher: { "@type": "Organization", name: SITE_NAME, url: absoluteUrl("/") },
        image: absoluteUrl("/opengraph-image"),
      }}
    />
  );
}
