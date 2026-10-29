# SEO 체크리스트

기획서 "페이지 구조와 SEO 전략"의 온페이지·등록 항목을 코드로 구현한 것과 사람이 직접 해야 하는 것을 나눈다.

## 코드로 구현됨

| 항목 | 위치 |
| --- | --- |
| 페이지별 title, description, canonical, OG, Twitter 카드 | 각 `page.tsx`의 `metadata`, `app/layout.tsx`(기본값·템플릿) |
| meta description 길이 제한(약 150자) | `clampDescription()` in `lib/site.ts`(성씨 페이지 적용) |
| OG 이미지 자동 생성(메인, 성씨별 108개) | `app/opengraph-image.tsx`, `app/surname/[slug]/opengraph-image.tsx`. 한글 폰트는 빌드 시 Google Fonts 서브셋을 받아 쓰고, 실패하면 라틴 문자만 그린다 |
| 파비콘, 웹 매니페스트 | `app/icon.svg`, `app/manifest.ts` |
| 구조화 데이터 | WebSite(전역), WebApplication + FAQPage(메인), FAQPage + BreadcrumbList(성씨), Article + BreadcrumbList(가이드), HowTo(정하는 법 가이드) |
| 브레드크럼 UI | `app/_components/Breadcrumbs.tsx` |
| 내부 링크 | 메인 → 상위 30 성씨·가이드, 성씨 → 이웃 성씨·규칙 가이드, 가이드 → 다른 가이드 전체(`RelatedGuides`) |
| sitemap.xml, robots.txt | `app/sitemap.ts`(lastmod는 `CONTENT_UPDATED_AT` 고정), `app/robots.ts` |
| 검색엔진 소유 확인 메타 | `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`, `NEXT_PUBLIC_NAVER_SITE_VERIFICATION` 설정 시 자동 삽입 |
| 성능 | 시스템 폰트, 외부 이미지 없음, GA 스크립트 afterInteractive + preconnect, 정적 생성 |
| 콘텐츠 날짜 | 가이드에 `<time>` 갱신일 표시, Article datePublished/dateModified. 내용을 고치면 `lib/site.ts`의 `CONTENT_UPDATED_AT`을 올린다 |

## 사람이 직접 해야 하는 것

배포 전
- [ ] 도메인 구매 후 `.env.local`(Vercel은 프로젝트 환경 변수)에 `NEXT_PUBLIC_SITE_URL=https://실제도메인` 설정. canonical, OG URL, sitemap 주소가 모두 이 값을 쓴다.
- [ ] Vercel 배포 후 `https://도메인/sitemap.xml`, `/robots.txt`, `/opengraph-image`가 열리는지 확인.
- [ ] 미리보기 배포(`*.vercel.app`)가 색인되지 않게 Vercel 프로젝트 설정에서 프로덕션 도메인만 색인 허용(또는 프리뷰에 noindex 헤더).

Google
- [ ] Search Console에 속성 추가(도메인 속성 권장, DNS TXT). HTML 태그 방식을 쓰면 content 값을 `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`에 넣고 재배포.
- [ ] Search Console에 `sitemap.xml` 제출.
- [ ] URL 검사로 메인·성씨 1개·가이드 1개 색인 요청.
- [ ] Rich Results Test(search.google.com/test/rich-results)로 메인(FAQ), 성씨(FAQ·Breadcrumb), 가이드(Article·HowTo) 확인.
- [ ] PageSpeed Insights 모바일 점수 확인(Core Web Vitals).
- [ ] GA4 ↔ Search Console 연결(검색어 데이터).

네이버
- [ ] 서치어드바이저(searchadvisor.naver.com)에 사이트 등록. HTML 태그 방식이면 content 값을 `NEXT_PUBLIC_NAVER_SITE_VERIFICATION`에 넣고 재배포.
- [ ] 사이트맵 제출, robots.txt 수집 요청, 메인 URL 수집 요청.
- [ ] 네이버 검색광고 키워드 도구로 "여권 영문 이름", "영문 이름 변환", "박 영어로" 등 실제 검색량·경쟁도 확인하고 title 문구 조정.

공유 미리보기
- [ ] 카카오톡 공유 디버거(developers.kakao.com/tool/debugger/sharing), Facebook Sharing Debugger, X Card Validator로 OG 이미지 확인. 캐시가 남아 있으면 갱신 요청.

콘텐츠
- [ ] 성씨 관용 표기 순서·설명을 외교부 통계와 대조해 수정. 수정 후 `CONTENT_UPDATED_AT` 갱신.
- [ ] 외부 유입 링크 소수 확보(블로그·커뮤니티 사용 후기).
- [ ] 4주 후 Search Console 노출 데이터로 CTR 낮은 페이지 title·description 교체(기획서 실험 후보).
