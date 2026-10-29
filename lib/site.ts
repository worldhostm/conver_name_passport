/** 사이트 전역 설정. 환경 변수는 .env.example 참고. */

export const SITE_NAME = "여권 영문 이름 변환기";
export const SITE_DESCRIPTION =
  "한글 이름을 입력하면 국어의 로마자 표기법 기준 여권 영문 이름과 많이 쓰는 관용 표기를 함께 보여주고 바로 복사할 수 있습니다. 이름은 서버로 보내지 않습니다.";

/**
 * 사이트 절대 주소. 우선순위:
 * 1) NEXT_PUBLIC_SITE_URL(커스텀 도메인을 쓰면 반드시 설정)
 * 2) Vercel이 빌드 시 자동 주입하는 프로덕션 도메인(VERCEL_PROJECT_PRODUCTION_URL)
 * 3) 프리뷰 배포 주소(VERCEL_URL)
 * 4) 로컬 개발 서버
 * canonical, OG, sitemap, robots가 모두 이 값을 쓰므로 localhost가 배포되면 색인이 되지 않는다.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");
  const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercelProd) return `https://${vercelProd}`;
  const vercelPreview = process.env.VERCEL_URL;
  if (vercelPreview) return `https://${vercelPreview}`;
  return "http://localhost:3000";
}
export const SITE_URL = resolveSiteUrl();

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** 외교부 여권안내 공식 페이지. 안내 문구의 근거이며 페이지에 출처·확인 날짜를 함께 표시한다. */
export const OFFICIAL_PASSPORT_URL = "https://www.passport.go.kr";
export const OFFICIAL_PASSPORT_NAME_RULE_URL =
  "https://www.passport.go.kr/home/kor/contents.do?menuPos=37";
export const OFFICIAL_SOURCE_CHECKED_AT = "2026-10-29";

/** 국립국어원 로마자 표기법 안내 */
export const KOREAN_ROMANIZATION_RULE_URL =
  "https://www.korean.go.kr/front/page/pageView.do?page_id=P000149&mn_id=99";

/** 외교부 여권안내 '로마자성명 변경 허용 요건' 페이지 */
export const OFFICIAL_PASSPORT_NAME_CHANGE_URL =
  "https://www.passport.go.kr/home/kor/contents.do?menuPos=39";

/** 콘텐츠 최초 공개일·최근 갱신일(ISO). sitemap lastmod, Article/HowTo 구조화 데이터에 쓴다. 내용을 고치면 UPDATED를 올린다. */
export const CONTENT_PUBLISHED_AT = "2026-10-29";
export const CONTENT_UPDATED_AT = "2026-10-29";

/** 검색엔진 소유 확인 코드. 비어 있으면 메타 태그를 넣지 않는다. */
export const GOOGLE_SITE_VERIFICATION = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? "";
export const NAVER_SITE_VERIFICATION = process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? "";

/** meta description은 검색 결과에서 잘리지 않도록 한국어 기준 약 150자로 자른다. */
export const MAX_DESCRIPTION_LENGTH = 150;
export function clampDescription(text: string, max = MAX_DESCRIPTION_LENGTH): string {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= max) return normalized;
  const cut = normalized.slice(0, max - 1);
  const lastStop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("다. "));
  return (lastStop > max * 0.6 ? cut.slice(0, lastStop + 1) : cut.trimEnd() + "…").trim();
}
