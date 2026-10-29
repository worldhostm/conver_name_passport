import type { Metadata } from "next";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import {
  OFFICIAL_PASSPORT_NAME_CHANGE_URL,
  OFFICIAL_PASSPORT_NAME_RULE_URL,
  OFFICIAL_SOURCE_CHECKED_AT,
  absoluteUrl,
} from "@/lib/site";
import { Faq } from "../../_components/Faq";
import { TrackedLink } from "../../_components/TrackedLink";

const TITLE = "여권 영문 이름 변경 가능한 경우와 신청 방법";
const DESCRIPTION =
  "여권 로마자 성명은 원칙적으로 바꿀 수 없고 여권법 시행령 제3조의2가 정한 사유에만 변경할 수 있습니다. 발음 불일치, 가족 성 통일, 개명, 부정적 의미 등 허용 사유와 신청 방법, 변경 후 주의점을 정리했습니다.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: absoluteUrl("/guide/name-change") },
  openGraph: { title: TITLE, description: DESCRIPTION, url: absoluteUrl("/guide/name-change") },
};

const REASONS: { title: string; detail: string }[] = [
  {
    title: "로마자 성명이 한글 성명의 발음과 명백히 일치하지 않는 경우",
    detail: "단, 통계상 널리 쓰이는 표기(해당 한글 성명 사용자의 절반 이상 또는 1만 명 이상이 쓰는 표기)는 발음 불일치로 보지 않습니다. Kim, Lee 같은 관용 표기는 이 사유로 바꿀 수 없습니다.",
  },
  {
    title: "국외에서 여권과 다른 로마자 성명을 취업·유학 등으로 장기간 사용한 경우",
    detail: "국외 회사의 고용계약서, 정규 학교 입학증명서 등 그 이름을 썼음을 보여주는 서류가 필요합니다.",
  },
  {
    title: "가족 구성원 사이의 로마자 성(姓)을 일치시킬 필요가 있는 경우",
    detail: "가족 동반 출입국 때 가족임을 증명하기 위한 것으로, 이름이 아닌 성만 맞출 수 있습니다. 아이 여권을 부모와 다르게 만든 경우가 여기에 해당합니다.",
  },
  {
    title: "배우자의 로마자 성을 추가·변경·삭제하려는 경우",
    detail: "성별과 무관하게 배우자 성을 본인 성에 덧붙이거나 뺄 수 있습니다.",
  },
  {
    title: "로마자 철자가 사전에 명백히 부정적인 뜻으로 등재된 경우",
    detail: "외교부 예시: GANG, SIN, KILL. 이런 표기는 처음 정할 때부터 피하는 것이 좋습니다.",
  },
  {
    title: "한글 성명을 개명한 경우",
    detail: "가족관계등록부의 이름이 바뀌었으면 로마자 성명도 새 이름에 맞게 바꿀 수 있습니다.",
  },
  {
    title: "그 밖의 사유",
    detail: "최초 발급 여권을 아직 사용하지 않은 경우, 해외 이주, 학술 활동, 동명이인 입국 규제, 외교부 장관이 인정하는 사유 등이 있습니다. 조건이 세부적이므로 공식 페이지를 확인하세요.",
  },
];

const FAQ = [
  {
    question: "Kim을 Gim으로, 또는 Gim을 Kim으로 바꿀 수 있나요?",
    answer:
      "발음 불일치 사유로는 어렵습니다. 널리 쓰이는 표기는 발음과 명백히 다르다고 보지 않기 때문입니다. 다만 가족 간 성 통일처럼 다른 사유에 해당하면 가능합니다.",
  },
  {
    question: "이름 철자가 마음에 안 들어서 바꾸고 싶어요.",
    answer:
      "단순한 선호 변경은 허용 사유가 아닙니다. 발음과 명백히 다르거나, 해외에서 다른 표기를 장기간 사용했다는 증명이 있어야 합니다. 그래서 처음 정할 때 신중해야 합니다.",
  },
  {
    question: "변경하면 어떤 불편이 있나요?",
    answer:
      "외교부는 변경된 로마자 성명으로 과거 방문국에 다시 갈 때 위변조 여권으로 오인될 수 있다고 안내합니다. 비자, 항공 마일리지, 해외 계정도 모두 새 표기로 바꿔야 합니다.",
  },
];

export default function Page() {
  return (
    <article className="prose">
      <TrackPageView pageType="guide" />
      <h1>여권 영문 이름 변경, 가능한 경우</h1>
      <p className="lead">
        여권의 로마자 성명은 재발급 때도 이전과 똑같이 적는 것이 원칙입니다. 여권법 시행령 제3조의2가 정한 사유에 해당할 때만 바꿀 수 있고,
        그래서 처음 정할 때가 가장 중요합니다.
      </p>

      <h2>왜 엄격한가</h2>
      <p>
        외교부는 로마자 성명을 자유롭게 바꾸게 하면 같은 사람인지 식별하기 어려워지고, 다른 나라의 출입국 심사에서 한국 여권의 신뢰도가
        떨어진다고 설명합니다. 로마자 성명은 &lsquo;영어 이름&rsquo;이 아니라 공적 장부에 적힌 한글 이름의 음역이라는 점이 기본
        입장입니다.
      </p>

      <h2>변경이 허용되는 사유</h2>
      <ol>
        {REASONS.map((r) => (
          <li key={r.title}>
            <b>{r.title}</b>
            <br />
            <small>{r.detail}</small>
          </li>
        ))}
      </ol>

      <h2>신청 방법</h2>
      <ol>
        <li>해당 사유를 증명하는 서류를 준비합니다(가족관계증명서, 고용계약서, 입학증명서, 개명 사실이 반영된 기본증명서 등).</li>
        <li>&lsquo;여권 로마자성명 변경 신청서&rsquo;를 작성합니다.</li>
        <li>여권사무 대행기관(시·군·구청 여권 민원실)에 여권 재발급과 함께 신청합니다.</li>
      </ol>

      <h2>변경 뒤 할 일</h2>
      <ul>
        <li>항공사 마일리지, 비자, 해외 은행·학교 계정의 이름을 새 표기로 갱신합니다.</li>
        <li>과거 방문국을 다시 갈 때는 이전 여권을 함께 가져가면 설명이 쉽습니다.</li>
        <li>
          가족 모두의 성 표기가 같은지 다시 확인합니다. <TrackedLink href="/guide/family-surname">가족 성 표기 맞추기</TrackedLink>
        </li>
      </ul>

      <Faq items={FAQ} />

      <p className="source">
        출처: 외교부 여권안내 &lsquo;로마자성명 변경 허용 요건&rsquo;(
        <a href={OFFICIAL_PASSPORT_NAME_CHANGE_URL} target="_blank" rel="noopener noreferrer">
          passport.go.kr
        </a>
        ), &lsquo;로마자성명 표기 기본원칙&rsquo;(
        <a href={OFFICIAL_PASSPORT_NAME_RULE_URL} target="_blank" rel="noopener noreferrer">
          passport.go.kr
        </a>
        ). 확인 날짜 {OFFICIAL_SOURCE_CHECKED_AT}. 요건과 서류는 바뀔 수 있으니 신청 전 공식 페이지를 다시 확인하세요.
      </p>
    </article>
  );
}
