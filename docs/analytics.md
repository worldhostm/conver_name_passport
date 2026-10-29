# GA4 측정 설계

핵심 전환은 `copy_result`다. 이름 문자열은 어떤 이벤트에도 보내지 않는다(글자 수만 전송).
이벤트는 `lib/analytics/events.ts`의 `track()`으로만 보낸다. 이 표와 `EventParams` 타입이 어긋나면 안 된다.

## 설정

- 측정 ID: `NEXT_PUBLIC_GA_ID` 환경 변수. Vercel 프로젝트 환경 변수에서 **Production 환경에만** 설정한다. 로컬 `.env.local`에는 넣지 않는다.
- 전송 조건(`ANALYTICS_ENABLED`): 측정 ID 있음 + 프로덕션 빌드 + Vercel 프리뷰 아님. 개발 서버에서는 콘솔에 `[analytics]`로만 찍힌다. DebugView 확인이 필요하면 프로덕션 사이트에서 Google Analytics Debugger 확장 프로그램을 켜고 본다.
- 초기화 스크립트(dataLayer, `gtag('config')`)는 `beforeInteractive`로 초기 HTML `<head>`에 들어간다. `track()`은 초기화 전에 호출돼도 dataLayer에 직접 큐잉한다.
- gtag 로더(`lib/analytics/Analytics.tsx`)는 `send_page_view: false`로 설정하고, 각 페이지의 `<TrackPageView pageType>`가 `page_view`를 직접 보낸다. 그래서 `page_type` 파라미터가 항상 붙는다.

## 이벤트

| 이벤트 | 발생 시점 | 파라미터 | 비고 |
| --- | --- | --- | --- |
| `page_view` | 페이지 진입(경로 변경 포함) | `page_type`(main / surname / guide) | 자동 수집 끄고 직접 전송 |
| `name_input_start` | 성·이름 입력창 첫 입력 | `page_type` | 세션당 1회(sessionStorage) |
| `convert_submit` | 변환 버튼/엔터 | `page_type`, `name_format`, `surname_len`, `given_len` | 글자 수만 전송 |
| `result_view` | 결과 카드 노출(변환 직후) | `candidate_count` | 규칙 표기와 다른 관용 후보 개수 |
| `copy_result` | 복사 버튼 클릭 | `candidate_type`(standard / common), `name_order`, `name_format`, `copy_rank` | **핵심 이벤트(전환)**. copy_rank 0 = 첫 카드 |
| `option_change` | 형식·순서 옵션 변경 | `option_name`(name_format / name_order), `option_value` | |
| `notice_expand` | 안내 박스 펼침 | `notice_id` | family_surname, change_difficulty, official_check, data_notice |
| `internal_link_click` | TrackedLink 클릭 | `link_target`(경로) | 성씨·가이드 링크 |
| `share_click` | 공유 버튼 클릭 | `share_method`(web_share / copy_link) | 이름은 URL에 넣지 않음 |

## 퍼널

1. `page_view` (organic)
2. `name_input_start`
3. `convert_submit`
4. `copy_result`

## 세팅 체크리스트(GA 콘솔)

- [ ] GA4 속성 생성, 웹 데이터 스트림, 향상된 측정 켜기
- [ ] 위 파라미터를 맞춤 측정기준으로 등록(page_type, name_format, name_order, candidate_type, copy_rank, candidate_count, notice_id, link_target, share_method, option_name, option_value, surname_len, given_len)
- [ ] `copy_result`를 핵심 이벤트로 지정
- [ ] 탐색 분석에 4단계 유입경로 보고서 생성
- [ ] Search Console 연결
- [ ] 내부 트래픽 필터, DebugView로 이벤트 검증
- [ ] 개인정보처리방침(/privacy)에 GA 사용 안내 — 작성됨
