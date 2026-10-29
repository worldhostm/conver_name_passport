import type { Metadata } from "next";
import { OFFICIAL_SOURCE_CHECKED_AT, SITE_NAME, absoluteUrl } from "@/lib/site";
import { Breadcrumbs } from "../_components/Breadcrumbs";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: `${SITE_NAME}의 개인정보처리방침. 입력한 이름은 수집하지 않으며, 방문 통계는 Google Analytics로 수집합니다.`,
  alternates: { canonical: absoluteUrl("/privacy") },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <article className="prose">
      <Breadcrumbs items={[{ name: "개인정보처리방침" }]} />
      <h1>개인정보처리방침</h1>
      <p>최종 갱신: {OFFICIAL_SOURCE_CHECKED_AT}</p>

      <h2>1. 입력한 이름은 수집하지 않습니다</h2>
      <p>
        {SITE_NAME}에서 입력한 한글 성과 이름은 사용자의 브라우저 안에서만 변환되며, 서버로 전송하거나 저장하지 않습니다. 이름
        문자열은 통계 이벤트, 로그, 페이지 주소(URL) 어디에도 포함하지 않습니다.
      </p>

      <h2>2. 방문 통계(Google Analytics 4)</h2>
      <p>
        서비스 개선을 위해 Google Analytics 4(GA4)를 사용해 다음 정보를 수집합니다. GA4는 쿠키와 유사 기술을 사용하여 방문자를
        구분합니다.
      </p>
      <ul>
        <li>페이지 조회, 유입 경로(검색엔진 등), 기기·브라우저 종류, 대략적인 지역</li>
        <li>서비스 사용 행동: 입력 시작 여부, 변환 실행 횟수, 선택한 표기 형식·순서, 복사 버튼 클릭, 안내 펼침, 링크 클릭</li>
        <li>변환 시 성과 이름의 글자 수(이름 자체는 보내지 않음)</li>
      </ul>
      <p>
        수집한 정보는 Google의 개인정보처리방침에 따라 처리됩니다. 브라우저의 쿠키 차단 설정이나 Google Analytics 차단 부가기능을
        사용하면 수집을 막을 수 있으며, 변환 기능은 그대로 사용할 수 있습니다.
      </p>

      <h2>3. 브라우저 저장소</h2>
      <p>
        입력 시작 이벤트를 한 세션에 한 번만 보내기 위해 세션 저장소(sessionStorage)에 표시 값 하나를 저장합니다. 이 값은 이름과 무관하며
        브라우저 탭을 닫으면 사라집니다.
      </p>

      <h2>4. 외부 링크</h2>
      <p>외교부 여권안내, 국립국어원 등 외부 사이트 링크는 각 사이트의 정책이 적용됩니다.</p>

      <h2>5. 문의</h2>
      <p>개인정보 관련 문의는 사이트 하단에 안내된 연락처로 보내 주세요.</p>
    </article>
  );
}
