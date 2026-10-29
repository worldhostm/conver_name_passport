import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { OFFICIAL_PASSPORT_NAME_RULE_URL, OFFICIAL_SOURCE_CHECKED_AT, CONTENT_PUBLISHED_AT, CONTENT_UPDATED_AT, absoluteUrl } from "@/lib/site";
import { ArticleJsonLd } from "../../_components/ArticleJsonLd";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { RelatedGuides } from "../../_components/RelatedGuides";
import { Faq } from "../../_components/Faq";
import { TrackedLink } from "../../_components/TrackedLink";

const TITLE = "가족과 성 표기 맞추기: 아이 여권 만들 때 확인할 것";
const DESCRIPTION =
  "아이 여권을 만들 때 부모와 성 영문 표기를 똑같이 맞춰야 하는 이유, 이미 다른 표기로 발급된 경우의 변경 방법, 자주 갈리는 성씨 사례를 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/guide/family-surname") },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/guide/family-surname"),
    publishedTime: CONTENT_PUBLISHED_AT,
    modifiedTime: CONTENT_UPDATED_AT,
    images: ["/opengraph-image"],
  },
};

const FAQ = [
  {
    question: "아이 성 표기를 부모와 다르게 하면 무슨 문제가 있나요?",
    answer:
      "입국 심사에서 부모·자녀 관계를 의심받아 추가 질문이나 증명 서류 제출을 요구받을 수 있고, 가족 단위 항공권·호텔 예약에서 동일 가족으로 인식되지 않는 불편이 생길 수 있습니다.",
  },
  {
    question: "이미 가족과 다른 표기로 여권을 발급받았는데 바꿀 수 있나요?",
    answer:
      "가족 간 로마자 성 표기를 일치시키려는 경우는 여권법 시행령이 정한 변경 사유에 해당합니다. 가족관계를 증명하는 서류와 변경 신청서를 갖춰 여권사무 대행기관에 신청합니다.",
  },
  {
    question: "엄마 성 표기와 아빠 성 표기 중 어디에 맞추나요?",
    answer: "아이의 성은 보통 아버지(또는 어머니) 성을 따르므로 같은 성을 쓰는 부모의 여권 표기에 맞춥니다. 성이 다른 부모의 표기는 맞출 대상이 아닙니다.",
  },
];

const EXAMPLES: [string, string][] = [
  ["정", "Jung / Jeong / Chung"],
  ["윤", "Yoon / Yun"],
  ["임", "Lim / Im / Yim"],
  ["안", "Ahn / An"],
  ["전", "Jeon / Jun / Chun"],
  ["유", "Yoo / Yu / You"],
  ["허", "Heo / Huh / Hur"],
  ["노", "Noh / No / Roh"],
];

export default function Page() {
  return (
    <article className="prose">
      <TrackPageView pageType="guide" />
      <ArticleJsonLd path="/guide/family-surname" headline={TITLE} description={DESCRIPTION} />
      <Breadcrumbs items={[{ name: "가이드", href: "/guide" }, { name: "가족과 성 표기 맞추기" }]} />
      <h1>가족과 성 표기 맞추기</h1>
      <p className="lead">
        아이 여권을 처음 만들 때 가장 자주 생기는 실수는 부모와 다른 성 표기를 쓰는 것입니다. 규칙 표기가 더 정확해 보여도, 가족 표기와의
        일치가 우선입니다.
      </p>
      <p className="meta-line">
        최근 갱신 <time dateTime={CONTENT_UPDATED_AT}>{CONTENT_UPDATED_AT}</time>
      </p>

      <h2>왜 같아야 하나</h2>
      <ul>
        <li>입국 심사에서 성이 다르게 보이면 가족 관계를 증명하라는 요청을 받을 수 있습니다.</li>
        <li>항공사·호텔의 가족 예약, 어린이 동반 탑승 확인에서 동일 가족으로 처리되지 않을 수 있습니다.</li>
        <li>해외 학교·보험·은행 서류에서 부모와 자녀 성이 다르게 기록되어 매번 설명해야 합니다.</li>
      </ul>

      <h2>어떻게 맞추나</h2>
      <ol>
        <li>아이와 같은 성을 쓰는 부모의 여권을 꺼내 성 표기를 확인합니다.</li>
        <li>그 표기를 아이 여권 신청서에 그대로 적습니다. 대문자로 적습니다.</li>
        <li>
          이름은 아이 것이므로 자유롭게 정하되, 형식(붙여쓰기·하이픈)은 가족과 통일하면 서류가 깔끔합니다.{" "}
          <TrackedLink href="/guide/name-format">형식 차이 보기</TrackedLink>
        </li>
        <li>
          <TrackedLink href="/">변환기</TrackedLink>에 성과 이름을 넣어 관용 표기 후보 중 부모 표기와 같은 카드를 복사합니다.
        </li>
      </ol>

      <h2>표기가 자주 갈리는 성씨</h2>
      <p>한 가족 안에서도 세대나 발급 시기에 따라 표기가 달라지기 쉬운 성씨입니다. 이런 성씨는 특히 가족 여권을 먼저 확인하세요.</p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>성</th>
              <th>흔히 갈리는 표기</th>
            </tr>
          </thead>
          <tbody>
            {EXAMPLES.map(([h, s]) => (
              <tr key={h}>
                <td>{h}</td>
                <td>{s}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>이미 다르게 발급됐다면</h2>
      <p>
        가족 간 성 표기를 일치시키는 것은 로마자 성명 변경이 허용되는 사유 중 하나입니다. 가족관계증명서 등 관계를 증명할 서류와 함께 변경
        신청서를 제출합니다. 자세한 조건은 <TrackedLink href="/guide/name-change">영문 이름 변경 가이드</TrackedLink>를 보세요.
      </p>

      <Faq items={FAQ} />

      <p className="source">
        출처: 외교부 여권안내(
        <a href={OFFICIAL_PASSPORT_NAME_RULE_URL} target="_blank" rel="noopener noreferrer">
          passport.go.kr
        </a>
        ), 확인 날짜 {OFFICIAL_SOURCE_CHECKED_AT}.
      </p>

      <RelatedGuides current="family-surname" />
    </article>
  );
}
