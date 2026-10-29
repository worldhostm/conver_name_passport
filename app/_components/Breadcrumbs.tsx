import Link from "next/link";
import { absoluteUrl } from "@/lib/site";
import { JsonLd } from "./JsonLd";

export interface Crumb {
  name: string;
  /** 사이트 내부 경로. 마지막 항목은 생략 가능(현재 페이지). */
  href?: string;
}

/** 브레드크럼 내비게이션 + BreadcrumbList 구조화 데이터. 첫 항목은 항상 홈. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all: Crumb[] = [{ name: "홈", href: "/" }, ...items];
  return (
    <>
      <nav className="breadcrumbs" aria-label="현재 위치">
        <ol>
          {all.map((item, i) => (
            <li key={`${item.name}-${i}`}>
              {item.href && i < all.length - 1 ? <Link href={item.href}>{item.name}</Link> : <span aria-current="page">{item.name}</span>}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            ...(item.href ? { item: absoluteUrl(item.href) } : {}),
          })),
        }}
      />
    </>
  );
}
