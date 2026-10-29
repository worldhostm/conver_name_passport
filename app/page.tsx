import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { SURNAMES } from "@/data/surnames";
import { SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/site";
import { Converter } from "./_components/Converter";
import { Faq } from "./_components/Faq";
import { JsonLd } from "./_components/JsonLd";
import { NoticeBox } from "./_components/NoticeBox";
import { TrackedLink } from "./_components/TrackedLink";
import { PassportNotices } from "./_components/PassportNotices";

export const metadata: Metadata = {
  title: { absolute: `${SITE_NAME} — 한글 이름을 여권 영문 표기로` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: `${SITE_NAME} — 한글 이름을 여권 영문 표기로`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl("/"),
  },
  keywords: ["여권 영문 이름", "영문 이름 변환", "한글 이름 영어로", "로마자 표기법 이름", "여권 영문 표기"],
};

const FAQ = [
  {
    question: "여권 영문 이름은 어떤 규칙으로 정하나요?",
    answer:
      "여권의 로마자 성명은 국어의 로마자 표기법(2000년 고시)에 따라 적는 것이 원칙입니다. 이름은 음절을 붙여 쓰거나 음절 사이에 붙임표(-)를 쓸 수 있고, 이름에서 일어나는 음운 변화는 표기에 반영하지 않습니다. 성은 Kim, Lee, Park처럼 널리 쓰이는 관용 표기도 인정됩니다.",
  },
  {
    question: "Kim과 Gim 중 어느 것을 써야 하나요?",
    answer:
      "규칙대로 적으면 Gim이지만 실제 여권에서는 Kim이 거의 전부입니다. 부모·배우자 등 가족이 이미 여권을 가지고 있다면 그 표기와 같게 맞추는 것이 가장 중요합니다.",
  },
  {
    question: "이름을 GILDONG과 GIL-DONG 중 어떻게 써야 하나요?",
    answer:
      "둘 다 허용됩니다. 외교부는 붙여 쓰기를 권장하며, 붙임표를 쓰면 일부 해외 전산에서 공백이나 생략으로 처리될 수 있습니다. 한 번 정하면 바꾸기 어려우므로 항공권·해외 서류와 동일하게 쓸 수 있는 형식을 고르세요.",
  },
  {
    question: "여권 영문 이름을 나중에 바꿀 수 있나요?",
    answer:
      "원칙적으로 제한되며, 가족 간 성 표기 통일, 발음과 명백히 다른 표기, 개명 등 정해진 사유가 있을 때만 변경할 수 있습니다. 자세한 조건은 외교부 여권안내에서 확인하세요.",
  },
  {
    question: "입력한 이름이 저장되나요?",
    answer:
      "아니요. 변환은 브라우저 안에서만 처리되고 이름은 서버로 전송되지 않습니다. 통계 도구에도 글자 수만 보내며 이름 문자열은 보내지 않습니다.",
  },
];

const POPULAR_SURNAME_COUNT = 30;

export default function HomePage() {
  const popular = SURNAMES.slice(0, POPULAR_SURNAME_COUNT);
  return (
    <>
      <TrackPageView pageType="main" />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: SITE_NAME,
          url: absoluteUrl("/"),
          description: SITE_DESCRIPTION,
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Any",
          inLanguage: "ko",
          offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
        }}
      />
      <h1>여권 영문 이름 변환기</h1>
      <p className="lead">
        한글 성과 이름을 입력하면 국어의 로마자 표기법 기준 표기와 많이 쓰는 관용 표기를 나란히 보여줍니다. 여권 형식(대문자)과
        일반 서류 형식을 한 번에 복사하세요.
      </p>

      <Converter pageType="main" />

      <section className="section" aria-labelledby="notice-title">
        <h2 id="notice-title">정하기 전에 꼭 확인할 것</h2>
        <PassportNotices />
      </section>

      <section className="section" aria-labelledby="surname-title">
        <h2 id="surname-title">성씨별 영문 표기</h2>
        <p>성씨마다 어떤 표기가 많이 쓰이는지, 규칙 표기와 무엇이 다른지 정리했습니다.</p>
        <ul className="chip-grid">
          {popular.map((s) => (
            <li key={s.slug}>
              <TrackedLink href={`/surname/${s.slug}`}>
                {s.hangul} {s.common[0]}
              </TrackedLink>
            </li>
          ))}
          <li>
            <TrackedLink href="/surname">전체 성씨 보기 →</TrackedLink>
          </li>
        </ul>
      </section>

      <section className="section" aria-labelledby="guide-title">
        <h2 id="guide-title">가이드</h2>
        <ul className="link-list">
          <li>
            <TrackedLink href="/guide/passport-name">여권 영문 이름 정하는 법: 순서대로 따라가기</TrackedLink>
          </li>
          <li>
            <TrackedLink href="/guide/family-surname">가족과 성 표기 맞추기: 아이 여권 만들 때</TrackedLink>
          </li>
          <li>
            <TrackedLink href="/guide/name-format">붙여쓰기·하이픈·띄어쓰기, 무엇이 다른가</TrackedLink>
          </li>
          <li>
            <TrackedLink href="/guide/name-change">여권 영문 이름 변경 가능한 경우</TrackedLink>
          </li>
          <li>
            <TrackedLink href="/guide/romanization">국어의 로마자 표기법, 이름에 적용하는 규칙</TrackedLink>
          </li>
        </ul>
      </section>

      <Faq items={FAQ} />

      <NoticeBox id="data_notice" title="이 서비스의 데이터와 한계">
        <p>
          변환 규칙은 국어의 로마자 표기법(문화관광부 고시 제2000-8호) 제3장 제4항 인명 규정을 따릅니다. 성씨 관용 표기 순서는
          공개된 여권 발급 통계와 널리 알려진 표기를 참고했으며 정확한 비율은 싣지 않습니다.
        </p>
        <p>최종 표기는 여권 신청 시 본인이 정하며, 여권사무 대행기관과 외교부 여권안내에서 확인하는 것이 가장 정확합니다.</p>
      </NoticeBox>
    </>
  );
}
