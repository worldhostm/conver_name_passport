# 여권 영문 이름 변환기 — Claude Code 규칙

## 구조
- app/            : 페이지 (main, surname/[slug], guide/*, privacy). UI 컴포넌트는 app/_components/
- lib/romanize/   : 변환 로직 (순수 함수, React 의존 금지)
- lib/analytics/  : GA 이벤트 (events.ts의 track()만 사용)
- lib/site.ts     : 사이트 이름·URL·출처 링크 상수
- data/           : 성씨 관용 표기 등 데이터
- docs/           : analytics.md, decisions.md, changelog.md, components.md(SDS 컴포넌트·props), sds-agents.md(SDS 원본 규칙), seo.md(SEO 구현·수동 체크리스트)
- public/         : 정적 파일(검색엔진 소유 확인 HTML 등). 이미지·아이콘은 app/의 메타데이터 파일 규약을 우선 사용
- src/            : figma/sds에서 옮긴 디자인 시스템. src/ui/{layout,primitives,compositions,icons,utils,hooks}, src/examples, src/*.css
새 최상위 폴더를 만들지 말 것.

## 코드
- SDS 컴포넌트는 tsconfig paths 별칭(layout, primitives, compositions, icons, utils, hooks)으로 import
- SDS primitive 추가는 요청이 있을 때 원본에서 하나씩 복사하고 docs/components.md 갱신. 새 스타일을 만들지 않고 SDS 토큰·컴포넌트만 조합
- 표기 규칙 변경 시 테스트 추가 + 근거 조항 주석 필수 (lib/romanize/*.test.ts)
- 성씨 표기는 data/surnames.ts에서만 수정
- 세 번 반복되기 전에는 공통화하지 않기
- 300줄 넘는 파일은 분리 제안

## SEO
- 새 페이지는 metadata(title, description, canonical, OG)와 Breadcrumbs를 넣고 app/sitemap.ts에 추가
- 가이드 내용을 고치면 lib/site.ts의 CONTENT_UPDATED_AT 갱신

## 분석과 개인정보
- gtag 직접 호출 금지, track()만 사용 (gtag 로더는 lib/analytics/Analytics.tsx 한 곳)
- 이벤트 추가 시 docs/analytics.md 갱신
- 이름 문자열은 이벤트, 로그, URL 어디에도 넣지 않기

## 작업 방식
- 한 작업 = 한 목적, 범위 밖 변경은 제안만
- 새 패키지는 이유와 대안 설명 후 승인받기
- 끝나면 `npm run lint`, `npm run typecheck`, `npm test` 실행
- 변경 요약에 "사람이 확인할 것" 목록 포함
- 설계 결정은 docs/decisions.md에 한 줄로 기록
