# 변경 로그

격주 개선 배포마다 한 항목. 실험은 변경 전후 2주 비교 결과를 함께 적는다.

## 2026-10-29 — 초기 구현

- 변환 로직(lib/romanize): 음절 단위 인명 변환, 형식 옵션, 대소문자, 순서, 발음 차이 안내. 단위 테스트 49개.
- 성씨 관용 표기 108개(data/surnames.ts).
- 페이지: 메인(/), 성씨 목록(/surname), 성씨별(/surname/[slug]) 108개, 가이드 5개, 개인정보처리방침.
- SEO: 페이지별 title/description/canonical/OG, FAQ JSON-LD, sitemap.xml, robots.txt.
- GA4 이벤트 9종을 track()으로 일원화. 측정 ID는 환경 변수.

## 2026-10-29 — SDS 부분 이식

- figma/sds의 theme/reset/responsive/icons CSS, layout(Flex, Grid, Section), primitives 7종(+의존 5종), Card 조합, 아이콘 3개를 `src/`로 이식.
- `examples/ProductDetails`를 이미지·정보·옵션/구매·상세 아코디언 섹션으로 분리.
- 컴포넌트·props 목록: `docs/components.md`. SDS 원본 규칙: `docs/sds-agents.md`.

## 2026-10-29 — SEO 보강

- 파비콘(icon.svg), manifest, OG 이미지 자동 생성(메인·성씨 108개), Twitter large card.
- 구조화 데이터 추가: WebSite, BreadcrumbList(성씨·가이드·목록), Article(가이드), HowTo(정하는 법).
- 브레드크럼 UI, 가이드 간 관련 가이드 링크, 가이드 갱신일 표시.
- 성씨 description 150자 제한, sitemap lastmod 고정, Google·네이버 소유 확인 메타(환경 변수), GA preconnect.
- 사람이 할 일 체크리스트: docs/seo.md.
- 키워드 조정: 메인은 "여권 영문 이름 변환기 / 여권 이름 변환 / 한글 이름 영어로", 성씨 페이지는 "{성} 영어로 / {성}씨 여권 영문 이름 표기" 롱테일 중심으로 title·description·H1·FAQ 재작성.
- 검색엔진 소유 확인 파일(Google, 네이버)을 public/에 배치. 사이트 주소는 환경 변수 없이도 Vercel 프로덕션 도메인을 자동 사용.
