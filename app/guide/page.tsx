import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { absoluteUrl } from "@/lib/site";
import { TrackedLink } from "../_components/TrackedLink";

export const metadata: Metadata = {
  title: "여권 영문 이름 가이드",
  description: "여권 영문 이름 정하는 법, 가족 성 표기 통일, 붙여쓰기와 하이픈 차이, 영문 이름 변경 조건, 로마자 표기법 규칙을 정리한 가이드 모음입니다.",
  alternates: { canonical: absoluteUrl("/guide") },
  openGraph: { title: "여권 영문 이름 가이드", url: absoluteUrl("/guide") },
};

const GUIDES = [
  { slug: "passport-name", title: "여권 영문 이름 정하는 법", summary: "처음 여권을 만들 때 영문 이름을 정하는 순서와 체크리스트." },
  { slug: "family-surname", title: "가족과 성 표기 맞추기", summary: "아이 여권을 만들 때 부모 표기와 통일해야 하는 이유와 방법." },
  { slug: "name-format", title: "붙여쓰기·하이픈·띄어쓰기 차이", summary: "GILDONG, GIL-DONG, GIL DONG이 해외 전산과 서류에서 어떻게 다르게 처리되는지." },
  { slug: "name-change", title: "여권 영문 이름 변경 가능한 경우", summary: "로마자 성명 변경이 허용되는 사유와 신청 방법, 주의할 점." },
  { slug: "romanization", title: "국어의 로마자 표기법과 이름", summary: "자모 대응표와 인명 표기 규정을 예시와 함께 정리." },
];

export default function GuideIndexPage() {
  return (
    <>
      <TrackPageView pageType="guide" />
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
