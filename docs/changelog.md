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
