import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { OFFICIAL_PASSPORT_NAME_RULE_URL, OFFICIAL_SOURCE_CHECKED_AT, absoluteUrl } from "@/lib/site";
import { Faq } from "../../_components/Faq";
import { TrackedLink } from "../../_components/TrackedLink";

const TITLE = "여권 영문 이름 정하는 법: 처음 발급할 때 순서대로";
const DESCRIPTION =
  "여권 영문 이름을 처음 정할 때 따라갈 순서. 가족 표기 확인, 성 관용 표기 선택, 이름 형식(붙여쓰기·하이픈) 결정, 발음 차이 확인, 신청서 작성까지 한 번에 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/guide/passport-name") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/guide/passport-name") },
};

const FAQ = [
  {
    question: "여권 영문 이름은 꼭 로마자 표기법대로 써야 하나요?",
    answer:
      "원칙은 로마자 표기법에 따른 음절 단위 음역입니다. 다만 성은 Kim, Lee처럼 널리 쓰이는 관용 표기가 인정되고, 이름도 발음과 맞으면 신청인이 적은 표기를 그대로 받아 주는 경우가 많습니다. 가족관계등록부 이름이 외국식 이름과 음역이 일치하면 외국식 표기(예: 김에스더 → KIM ESTHER)도 가능합니다.",
  },
  {
    question: "신청서에 영문 이름을 소문자로 써도 되나요?",
    answer: "여권에는 모두 대문자로 인쇄됩니다. 신청서에는 대문자로 적는 것이 안전하며, 이 변환기의 '여권 형식' 결과를 그대로 쓰면 됩니다.",
  },
  {
    question: "항공권을 이미 예약했는데 여권 표기와 다르면 어떻게 하나요?",
    answer:
      "항공권 영문 이름은 여권과 같아야 탑승할 수 있습니다. 여권을 아직 발급받지 않았다면 항공권 표기에 맞춰 여권을 신청하는 것이 가장 간단하고, 이미 발급받았다면 항공사에 이름 수정을 요청해야 합니다.",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <TrackPageView pageType="guide" />
      <h1>여권 영문 이름 정하는 법</h1>
      <p className="lead">
        여권의 영문 이름(로마자 성명)은 한 번 정하면 바꾸기 어렵고, 항공권·비자·해외 계정이 모두 이 표기를 따라갑니다. 아래 순서대로
        확인하면 나중에 후회할 가능성을 줄일 수 있습니다.
      </p>

      <h2>1. 가족 중 여권이 있는 사람의 성 표기를 먼저 확인한다</h2>
      <p>
        부모, 배우자, 형제의 여권에 적힌 성 표기를 그대로 쓰는 것이 1순위입니다. 가족 간 성 표기가 다르면 해외 입국 심사나 호텔 예약에서
        가족 관계를 증명해야 하는 상황이 생길 수 있습니다. 자세한 내용은{" "}
        <TrackedLink href="/guide/family-surname">가족과 성 표기 맞추기</TrackedLink>를 보세요.
      </p>

      <h2>2. 성은 관용 표기와 규칙 표기를 비교해 고른다</h2>
      <p>
        가족 표기가 없다면 두 가지를 비교합니다. 국어의 로마자 표기법대로 적은 규칙 표기(김 → Gim, 이 → I, 박 → Bak)와 실제 여권에서 많이
        쓰는 관용 표기(Kim, Lee, Park)입니다. 관용 표기는 외국인이 익숙하게 읽고 한국 성씨로 인식하는 장점이 있고, 규칙 표기는 발음에 더
        가깝습니다. <TrackedLink href="/surname">성씨별 표기 페이지</TrackedLink>에서 성씨마다 어떤 표기가 많이 쓰이는지 볼 수 있습니다.
      </p>

      <h2>3. 이름 형식을 정한다: 붙여쓰기, 하이픈, 띄어쓰기</h2>
      <p>
        외교부는 이름을 붙여 쓰는 것을 원칙으로 하고, 붙임표(-)나 띄어쓰기도 허용합니다. 붙여쓰기(GILDONG)가 해외 전산에서 가장 문제가
        적습니다. 하이픈이나 띄어쓰기는 일부 시스템에서 생략되거나 중간 이름(middle name)으로 처리될 수 있습니다. 차이는{" "}
        <TrackedLink href="/guide/name-format">이름 형식 가이드</TrackedLink>에서 설명합니다.
      </p>

      <h2>4. 발음과 표기가 다른 이름인지 확인한다</h2>
      <p>
        여권 표기 원칙은 이름의 음운 변화를 반영하지 않습니다. 예를 들어 &lsquo;복연&rsquo;은 발음이 [보견]이지만 규칙 표기는 BOKYEON입니다.
        발음을 살린 표기를 원하면 신청서에 직접 적을 수 있지만, 가족과의 통일과 읽기 쉬움을 함께 따져 보세요. 변환기는 이런 이름에 안내
        문구를 보여줍니다.
      </p>

      <h2>5. 영어 단어와 겹치는지 한 번 더 본다</h2>
      <p>
        규칙 표기가 영어 단어와 겹쳐 꺼리는 경우가 있습니다. 강(Gang), 신(Sin), 노(No), 범(Bum)이 대표적이고, 그래서 Kang, Shin, Noh,
        Beom 같은 표기가 많이 쓰입니다. 반대로 Park, Song, Moon처럼 영어 단어와 같아 오히려 읽기 쉬운 표기도 있습니다.
      </p>

      <h2>6. 신청서에는 대문자로, 여권 형식 그대로 적는다</h2>
      <p>
        여권에는 성과 이름이 모두 대문자로 인쇄됩니다. <TrackedLink href="/">변환기</TrackedLink>의 &lsquo;여권 형식&rsquo; 결과(예: HONG
        GILDONG)를 복사해 신청서에 옮기면 됩니다. 영문 이름을 적은 뒤 항공권, 해외 서비스 계정에도 똑같이 쓰세요.
      </p>

      <div className="callout">
        <strong>체크리스트</strong>
        <ul>
          <li>가족 여권의 성 표기와 같은가</li>
          <li>성 표기를 관용·규칙 중 무엇으로 할지 정했는가</li>
          <li>이름 형식(붙여쓰기 권장)을 정했는가</li>
          <li>발음과 표기가 다른 이름인지 확인했는가</li>
          <li>영어 단어와 겹쳐 곤란한 표기는 아닌가</li>
          <li>항공권 등 이미 쓴 영문 이름과 같은가</li>
        </ul>
      </div>

      <Faq items={FAQ} />

      <p className="source">
        출처: 외교부 여권안내 &lsquo;로마자성명 표기 기본원칙&rsquo;(
        <a href={OFFICIAL_PASSPORT_NAME_RULE_URL} target="_blank" rel="noopener noreferrer">
          passport.go.kr
        </a>
        ), 확인 날짜 {OFFICIAL_SOURCE_CHECKED_AT}. 규정은 바뀔 수 있으니 신청 전 공식 페이지를 다시 확인하세요.
      </p>
    </article>
  );
}
