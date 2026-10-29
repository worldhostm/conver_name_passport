import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { absoluteUrl } from "@/lib/site";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { TrackedLink } from "../_components/TrackedLink";
import { GUIDES } from "./_data";

export const metadata: Metadata = {
  title: "여권 영문 이름 가이드",
  description: "여권 영문 이름 정하는 법, 가족 성 표기 통일, 붙여쓰기와 하이픈 차이, 영문 이름 변경 조건, 로마자 표기법 규칙을 정리한 가이드 모음입니다.",
  alternates: { canonical: absoluteUrl("/guide") },
  openGraph: { title: "여권 영문 이름 가이드", url: absoluteUrl("/guide"), images: ["/opengraph-image"] },
};

export default function GuideIndexPage() {
  return (
    <>
      <TrackPageView pageType="guide" />
      <Breadcrumbs items={[{ name: "가이드" }]} />
      <h1>여권 영문 이름 가이드</h1>
      <p className="lead">영문 이름을 처음 정하거나 확인해야 하는 순간에 필요한 내용만 모았습니다.</p>
      <ul className="link-list">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <TrackedLink href={`/guide/${g.slug}`}>{g.title}</TrackedLink>
            <br />
            <small>{g.summary}</small>
          </li>
        ))}
      </ul>
    </>
  );
}
