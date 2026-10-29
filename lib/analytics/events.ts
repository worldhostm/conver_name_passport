/**
 * GA4 이벤트 정의와 전송 함수.
 *
 * - 앱 코드는 이 파일의 track()만 호출한다. gtag 직접 호출 금지.
 * - 이벤트를 추가·변경하면 docs/analytics.md의 표도 함께 갱신한다.
 * - 개인정보: 이름 문자열은 어떤 파라미터에도 넣지 않는다. 글자 수만 보낸다.
 */

import type { CandidateType } from "@/lib/romanize/convert";
import type { NameFormat, NameOrder } from "@/lib/romanize/romanize";

export type PageType = "main" | "surname" | "guide";

export type ShareMethod = "web_share" | "copy_link";

export type OptionName = "name_format" | "name_order" | "letter_case";

export interface EventParams {
  /** 페이지 진입. 자동 수집 대신 page_type을 붙여 직접 보낸다. */
  page_view: { page_type: PageType };
  /** 입력창 첫 입력. 세션당 1회. */
  name_input_start: { page_type: PageType };
  /** 변환 실행. 이름은 보내지 않고 글자 수만 보낸다. */
  convert_submit: {
    page_type: PageType;
    name_format: NameFormat;
    surname_len: number;
    given_len: number;
  };
  /** 결과 카드 노출. 관용 후보 개수. */
  result_view: { candidate_count: number };
  /** 복사 버튼 클릭. 핵심 이벤트(전환). */
  copy_result: {
    candidate_type: CandidateType;
    name_order: NameOrder;
    name_format: NameFormat;
    /** 결과 카드의 순서(0 = 첫 카드) */
    copy_rank: number;
  };
  /** 형식·순서·대소문자 옵션 변경 */
  option_change: { option_name: OptionName; option_value: string };
  /** 주의사항 펼침 */
  notice_expand: { notice_id: string };
  /** 성씨·가이드 등 내부 링크 클릭 */
  internal_link_click: { link_target: string };
  /** 공유 버튼 클릭 */
  share_click: { share_method: ShareMethod };
}

export type EventName = keyof EventParams;

type GtagFn = (command: "event", name: string, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";

/**
 * GA 전송 여부. 측정 ID가 있고, 프로덕션 빌드이며, Vercel 프리뷰 배포가 아닐 때만 켠다.
 * 개발 서버(next dev)와 프리뷰 배포(NEXT_PUBLIC_VERCEL_ENV=preview)의 트래픽은 집계하지 않는다.
 */
export const ANALYTICS_ENABLED =
  Boolean(GA_ID) &&
  process.env.NODE_ENV === "production" &&
  (process.env.NEXT_PUBLIC_VERCEL_ENV ?? "production") === "production";

/** 서버 렌더링이나 측정 ID 미설정 환경에서는 조용히 넘어간다. */
export function track<E extends EventName>(event: E, params: EventParams[E]): void {
  if (typeof window === "undefined") return;
  if (!ANALYTICS_ENABLED) {
    if (process.env.NODE_ENV !== "production") console.debug("[analytics]", event, params);
    return;
  }
  if (typeof window.gtag !== "function") {
    // 초기화 스크립트보다 먼저 호출된 경우: gtag는 dataLayer.push 래퍼이므로 같은 방식으로 큐에 넣는다.
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    } as GtagFn;
  }
  window.gtag("event", event, params);
}

const INPUT_START_KEY = "cpn:name_input_start";

/** name_input_start를 세션당 한 번만 보낸다(sessionStorage 사용 불가 시 페이지 로드당 1회). */
let inputStartSentInMemory = false;
export function trackNameInputStartOnce(pageType: PageType): void {
  if (inputStartSentInMemory) return;
  try {
    if (window.sessionStorage.getItem(INPUT_START_KEY)) {
      inputStartSentInMemory = true;
      return;
    }
    window.sessionStorage.setItem(INPUT_START_KEY, "1");
  } catch {
    // 저장소를 못 쓰면 메모리 플래그만 사용
  }
  inputStartSentInMemory = true;
  track("name_input_start", { page_type: pageType });
}
