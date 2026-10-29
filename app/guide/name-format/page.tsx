import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { OFFICIAL_PASSPORT_NAME_RULE_URL, OFFICIAL_SOURCE_CHECKED_AT, CONTENT_PUBLISHED_AT, CONTENT_UPDATED_AT, absoluteUrl } from "@/lib/site";
import { ArticleJsonLd } from "../../_components/ArticleJsonLd";
import { Breadcrumbs } from "../../_components/Breadcrumbs";
import { RelatedGuides } from "../../_components/RelatedGuides";
import { Faq } from "../../_components/Faq";
import { TrackedLink } from "../../_components/TrackedLink";

const TITLE = "영문 이름 붙여쓰기·하이픈·띄어쓰기 차이";
const DESCRIPTION =
  "여권 영문 이름을 GILDONG, GIL-DONG, GIL DONG 중 어떻게 쓸지 고를 때 알아야 할 차이. 해외 전산 처리, 미들네임 오인, 영문 이력서 작성 시 장단점을 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/guide/name-format") },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    url: absoluteUrl("/guide/name-format"),
    publishedTime: CONTENT_PUBLISHED_AT,
    modifiedTime: CONTENT_UPDATED_AT,
    images: ["/opengraph-image"],
  },
};

const FAQ = [
  {
    question: "여권에 GIL-DONG으로 되어 있는데 항공권에는 GILDONG으로 예약해도 되나요?",
    answer:
      "대부분의 항공사는 하이픈과 공백을 무시하고 비교하므로 문제 없는 경우가 많지만, 항공사마다 다릅니다. 가능하면 여권과 동일하게 입력하고, 하이픈 입력이 안 되면 붙여 쓰는 것이 일반적입니다.",
  },
  {
    question: "띄어쓰기를 하면 뒤 음절이 미들네임이 되나요?",
    answer:
      "여권 자체에는 미들네임 칸이 없지만, 해외 전산은 공백 뒤를 미들네임으로 분리해 저장하는 경우가 많습니다. 그러면 서류마다 이름이 GIL D. 같은 형태로 줄여 표시될 수 있습니다.",
  },
  {
    question: "일반 서류에서는 어떻게 대소문자를 쓰나요?",
    answer: "여권은 모두 대문자이지만 이력서나 이메일 서명에서는 Hong Gildong, Hong Gil-dong처럼 첫 글자만 대문자로 쓰는 것이 일반적입니다. 붙임표 뒤는 소문자로 둡니다.",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <TrackPageView pageType="guide" />
      <ArticleJsonLd path="/guide/name-format" headline={TITLE} description={DESCRIPTION} />
      <Breadcrumbs items={[{ name: "가이드", href: "/guide" }, { name: "붙여쓰기·하이픈·띄어쓰기 차이" }]} />
      <h1>붙여쓰기 · 하이픈 · 띄어쓰기, 무엇이 다른가</h1>
      <p className="lead">
        외교부는 이름을 붙여 쓰는 것을 원칙으로 하고 붙임표(-)와 띄어쓰기도 허용합니다. 세 형식은 모두 유효하지만, 해외에서 처리되는 방식이
        다릅니다.
      </p>
      <p className="meta-line">
        최근 갱신 <time dateTime={CONTENT_UPDATED_AT}>{CONTENT_UPDATED_AT}</time>
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>형식</th>
              <th>예</th>
              <th>장점</th>
              <th>주의</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>붙여쓰기</td>
              <td>
                <code>GILDONG</code>
              </td>
              <td>외교부 권장. 전산 입력 오류가 가장 적다. 미들네임 오인 없음.</td>
              <td>외국인이 음절 경계를 모르면 읽기 어려울 수 있다.</td>
            </tr>
            <tr>
              <td>하이픈</td>
              <td>
                <code>GIL-DONG</code>
              </td>
              <td>음절이 또렷해 발음 안내가 쉽다. 국립국어원 용례(Min Yong-ha)와 같다.</td>
              <td>하이픈을 입력할 수 없는 시스템에서는 생략되거나 공백으로 바뀐다.</td>
            </tr>
            <tr>
              <td>띄어쓰기</td>
              <td>
                <code>GIL DONG</code>
              </td>
              <td>영어권 이름 구조와 비슷해 보인다.</td>
              <td>두 번째 음절이 미들네임으로 처리되어 D. 같은 약자로 줄어들 수 있다.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2>어떤 형식을 고를까</h2>
      <ul>
        <li>
          <b>처음 정한다면 붙여쓰기</b>를 권합니다. 항공권, 비자, 해외 계정 어디에서도 변형 없이 그대로 쓸 수 있습니다.
        </li>
        <li>
          이미 가족이나 본인이 다른 서류에서 하이픈을 쓰고 있다면 그 표기를 유지하는 것이 혼선을 줄입니다.
        </li>
        <li>
          유학·취업 서류에서 발음을 안내하고 싶다면 서류에만 하이픈을 쓰고 여권은 붙여 쓰는 방법도 있습니다. 대부분의 기관은 하이픈과 공백
          차이를 같은 이름으로 봅니다.
        </li>
      </ul>

      <h2>대소문자</h2>
      <p>
        여권에는 모두 대문자로 인쇄됩니다. 영문 이력서·논문·이메일 서명 같은 일반 서류에서는 첫 글자만 대문자로 적습니다. 하이픈 뒤는
        소문자로 두는 것이 국립국어원 용례입니다(Hong Gil-dong). <TrackedLink href="/">변환기</TrackedLink>는 두 형식을 함께 보여줍니다.
      </p>

      <Faq items={FAQ} />

      <p className="source">
        출처: 외교부 여권안내 &lsquo;로마자성명 표기 기본원칙&rsquo;(
        <a href={OFFICIAL_PASSPORT_NAME_RULE_URL} target="_blank" rel="noopener noreferrer">
          passport.go.kr
        </a>
        ), 국어의 로마자 표기법 제3장 제4항. 확인 날짜 {OFFICIAL_SOURCE_CHECKED_AT}.
      </p>

      <RelatedGuides current="name-format" />
    </article>
  );
}
