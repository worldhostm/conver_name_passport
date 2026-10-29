import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { SURNAMES } from "@/data/surnames";
import { absoluteUrl } from "@/lib/site";
import { Breadcrumbs } from "../_components/Breadcrumbs";
import { TrackedLink } from "../_components/TrackedLink";

export const metadata: Metadata = {
  title: "성씨 영어로: 김·이·박 등 108개 성씨 여권 영문 표기",
  description: "김 영어로 Kim, 이 영어로 Lee, 박 영어로 Park. 한국 성씨 108개의 여권 영문 표기를 성씨별로 정리했습니다. 많이 쓰는 표기와 로마자 표기법 기준 표기를 비교해 보세요.",
  alternates: { canonical: absoluteUrl("/surname") },
  openGraph: { title: "성씨 영어로: 108개 성씨 여권 영문 표기", url: absoluteUrl("/surname"), images: ["/opengraph-image"] },
};

export default function SurnameIndexPage() {
  return (
    <>
      <TrackPageView pageType="surname" />
      <Breadcrumbs items={[{ name: "성씨별 표기" }]} />
      <h1>성씨 영어로: 성씨별 여권 영문 표기</h1>
      <p className="lead">
        성씨 {SURNAMES.length}개의 영문 표기를 정리했습니다. 각 페이지에서 많이 쓰는 표기, 로마자 표기법 기준 표기, 선택할 때 참고할
        점을 볼 수 있습니다.
      </p>
      <ul className="chip-grid">
        {SURNAMES.map((s) => (
          <li key={s.slug}>
            <TrackedLink href={`/surname/${s.slug}`}>
              {s.hangul} {s.common[0]}
            </TrackedLink>
          </li>
        ))}
      </ul>
      <p className="section">
        <TrackedLink href="/">메인 변환기에서 이름까지 변환하기 →</TrackedLink>
      </p>
    </>
  );
}
