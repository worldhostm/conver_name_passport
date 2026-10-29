import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { FINAL_CHARS, INITIAL_CHARS, MEDIAL_CHARS, applyCase, romanizeGivenName, romanizeSurname } from "@/lib/romanize";
import { FINAL_ROMAN, INITIAL_ROMAN, MEDIAL_ROMAN } from "@/lib/romanize/tables";
import { KOREAN_ROMANIZATION_RULE_URL, OFFICIAL_SOURCE_CHECKED_AT, CONTENT_PUBLISHED_AT, CONTENT_UPDATED_AT, absoluteUrl } from "@/lib/site";
import { ArticleJsonLd } from "../../_components/ArticleJsonLd";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { RelatedGuides } from "../../_components/RelatedGuides";
import { Faq } from "../../_components/Faq";
import { TrackedLink } from "../../_components/TrackedLink";

const TITLE = "국어의 로마자 표기법, 이름에 적용하는 규칙";
const DESCRIPTION =
  "여권 영문 이름의 기준인 국어의 로마자 표기법(2000년 고시)을 이름에 적용할 때 필요한 자모 대응표와 인명 규정(제3장 제4항)을 예시와 함께 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/guide/romanization") },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/guide/romanization"),
    publishedTime: CONTENT_PUBLISHED_AT,
    modifiedTime: CONTENT_UPDATED_AT,
    images: ["/opengraph-image"],
  },
};

const NAME_EXAMPLES: [string, string][] = [
  ["민", "용하"],
  ["송", "나리"],
  ["한", "복남"],
  ["홍", "빛나"],
  ["김", "복연"],
  ["설", "리"],
];

const FAQ = [
  {
    question: "이름에서는 왜 발음대로 적지 않나요?",
    answer:
      "로마자 표기법 제3장 제4항은 '이름에서 일어나는 음운 변화는 표기에 반영하지 않는다'고 정합니다. 한글 이름을 글자 단위로 되돌릴 수 있게 하기 위한 규정입니다. 그래서 복남은 [봉남]으로 발음되어도 Boknam으로 적습니다.",
  },
  {
    question: "성도 규칙대로 적어야 하나요?",
    answer:
      "표기법은 '성의 표기는 따로 정한다'고만 되어 있고 별도 고시는 없습니다. 실제로는 Kim, Lee, Park처럼 관용 표기가 널리 쓰이고 여권에서도 인정됩니다.",
  },
  {
    question: "'시'는 shi가 아니라 si인가요?",
    answer: "현행 표기법은 ㅅ을 항상 s로 적습니다. 그래서 '시우'는 Siu입니다. 다만 성씨 신·심은 Shin, Shim처럼 sh를 쓰는 관용 표기가 훨씬 많습니다.",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <TrackPageView pageType="guide" />
      <ArticleJsonLd path="/guide/romanization" headline={TITLE} description={DESCRIPTION} />
      <Breadcrumbs items={[{ name: "가이드", href: "/guide" }, { name: "국어의 로마자 표기법과 이름" }]} />
      <h1>국어의 로마자 표기법과 이름</h1>
      <p className="lead">
        여권 영문 이름의 기준은 문화관광부 고시 제2000-8호 &lsquo;국어의 로마자 표기법&rsquo;입니다. 이름에 적용할 때 필요한 부분만
        골라 정리했습니다.
      </p>
      <p className="meta-line">
        최근 갱신 <time dateTime={CONTENT_UPDATED_AT}>{CONTENT_UPDATED_AT}</time>
      </p>

      <h2>인명 규정(제3장 제4항)</h2>
      <ul>
        <li>인명은 성과 이름의 순서로 띄어 쓴다.</li>
        <li>이름은 붙여 쓰는 것을 원칙으로 하되, 음절 사이에 붙임표(-)를 쓰는 것을 허용한다.</li>
        <li>이름에서 일어나는 음운 변화는 표기에 반영하지 않는다.</li>
        <li>성의 표기는 따로 정한다.</li>
      </ul>

      <h2>용례</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>한글</th>
              <th>규칙 표기</th>
              <th>붙임표</th>
              <th>설명</th>
            </tr>
          </thead>
          <tbody>
            {NAME_EXAMPLES.map(([s, g]) => (
              <tr key={s + g}>
                <td>
                  {s}
                  {g}
                </td>
                <td>{applyCase(`${romanizeSurname(s)} ${romanizeGivenName(g)}`, "capitalized")}</td>
                <td>{applyCase(`${romanizeSurname(s)} ${romanizeGivenName(g, "hyphen")}`, "capitalized")}</td>
                <td>{describe(g)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>자음 표기(제2장 제2항)</h2>
      <p>
        ㄱ·ㄷ·ㅂ은 모음 앞에서 g·d·b, 자음 앞이나 어말에서 k·t·p로 적습니다. ㄹ은 모음 앞에서 r, 자음 앞이나 어말에서 l, &lsquo;ㄹㄹ&rsquo;은
        ll로 적습니다. 이름은 음절마다 따로 적으므로 받침은 항상 k·t·p·l 형태를 씁니다.
      </p>
      <h3>초성</h3>
      <ul className="jamo-list">
        {[...INITIAL_CHARS].map((ch, i) => (
          <li key={ch}>
            {ch} → <b>{INITIAL_ROMAN[i] || "–"}</b>
          </li>
        ))}
      </ul>
      <h3>받침(종성)</h3>
      <ul className="jamo-list">
        {FINAL_CHARS.map((ch, i) =>
          i === 0 ? null : (
            <li key={ch}>
              {ch} → <b>{FINAL_ROMAN[i]}</b>
            </li>
          ),
        )}
      </ul>

      <h2>모음 표기(제2장 제1항)</h2>
      <ul className="jamo-list">
        {[...MEDIAL_CHARS].map((ch, i) => (
          <li key={ch}>
            {ch} → <b>{MEDIAL_ROMAN[i]}</b>
          </li>
        ))}
      </ul>
      <p>&lsquo;ㅢ&rsquo;는 [이]로 소리 나더라도 ui로 적습니다(붙임 1). 장모음은 표기하지 않습니다(붙임 2).</p>

      <h2>이 변환기가 적용하는 방식</h2>
      <ul>
        <li>성과 이름을 각각 음절 단위로 자모 대응표에 따라 옮깁니다.</li>
        <li>이름의 음운 변화(연음, 비음화, 유음화 등)는 반영하지 않습니다. 발음과 다른 경우 별도 안내를 보여줍니다.</li>
        <li>&lsquo;ㄹㄹ&rsquo;만 소리 변화가 아닌 표기 규정이므로 ll로 적습니다(설리 → Seolli).</li>
        <li>성은 규칙 표기와 함께 <TrackedLink href="/surname">관용 표기 후보</TrackedLink>를 보여줍니다.</li>
      </ul>

      <Faq items={FAQ} />

      <p className="source">
        출처: 국립국어원 &lsquo;국어의 로마자 표기법&rsquo;(
        <a href={KOREAN_ROMANIZATION_RULE_URL} target="_blank" rel="noopener noreferrer">
          korean.go.kr
        </a>
        ), 확인 날짜 {OFFICIAL_SOURCE_CHECKED_AT}.
      </p>

      <RelatedGuides current="romanization" />
    </article>
  );
}

function describe(given: string): string {
  switch (given) {
    case "복남":
      return "[봉남]으로 소리 나지만 비음화를 반영하지 않는다.";
    case "빛나":
      return "받침 ㅊ은 t로 적는다. [빈나] 발음은 반영하지 않는다.";
    case "복연":
      return "[보견] 연음을 반영하지 않아 받침 ㄱ이 k로 남는다.";
    case "리":
      return "받침 ㄹ + 초성 ㄹ은 ll로 적는다(표기 규정).";
    default:
      return "음절 단위로 그대로 옮긴다.";
  }
}
