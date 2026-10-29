# 설계 결정 기록

한 줄씩, 날짜와 함께. 되돌릴 때 이유를 알 수 있게 한다.

- 2026-10-29 Next.js 16 App Router + 정적 생성. 성씨 페이지는 `generateStaticParams`, `dynamicParams = false`.
- 2026-10-29 스타일은 전역 CSS 하나(app/globals.css). Tailwind 등 추가 의존성 없이 시작.
- 2026-10-29 GA 로더는 `@next/third-parties` 대신 next/script 직접 사용. 자동 page_view를 꺼서 page_type을 붙이기 위함. 의존성 하나 절약.
- 2026-10-29 이름 변환은 음절 독립 변환. 받침은 항상 k/t/p/l. 예외는 'ㄹㄹ → ll'만(표기 규정, 음운 변화 아님).
- 2026-10-29 겹받침은 표준 발음법 대표음(ㄼ → l, ㄿ → p 등)으로 적는다. 이름에 드물어 예외 처리 없음.
- 2026-10-29 관용 표기 후보는 규칙 표기와 같은 것을 제외해 보여준다. 같으면 카드 설명에 "규칙 표기와 같습니다"로 안내.
- 2026-10-29 결과 카드 순서: 규칙 표기(rank 0) → 관용 표기(rank 1..). 관용 우선 실험은 Converter.tsx의 카드 순서만 바꾼다.
- 2026-10-29 각 카드에 여권 형식(대문자)과 일반 서류 형식(첫 글자 대문자) 두 줄, 복사 버튼 각각. 대소문자는 옵션 아님.
- 2026-10-29 공유 링크는 현재 페이지 URL만 공유(이름 미포함). 받는 사람은 직접 입력.
- 2026-10-29 성씨 데이터는 비율 숫자 없이 순서만 저장. 공개 통계 시점마다 수치가 달라 신뢰성 문제.
- 2026-10-29 성씨 108개로 시작. 이름별 페이지(/name/*)는 만들지 않음(얇은 페이지 위험).
- 2026-10-29 P2 발음 안내(연음·비음화·유음화)는 첫 경계 하나만 안내. 추천이 아니라 차이 설명.
- 2026-10-29 입력 길이 제한: 성 2음절, 이름 6음절.
- 2026-10-29 figma/sds 디자인 시스템을 src/ 아래로 부분 이식. 별칭은 vite alias 대신 tsconfig paths. 의존성은 clsx, react-aria-components 두 개만.
- 2026-10-29 SDS primitives는 요청한 7종(Button, Input, Text, Tag, Accordion, Tabs, Notification)만 옮기고, 그것들이 import하는 Fieldset·Icon·IconButton·Image·Link를 의존성으로 추가. 나머지는 요청 시 추가.
- 2026-10-29 SDS reset.css(a/button/input 등 all: unset)는 src/sds.css에 포함하되 globals.css보다 먼저 import해 앱 스타일이 우선하도록 함.
- 2026-10-29 ProductDetails 예시의 SelectField는 Select primitive 미이식으로 TagToggleGroup으로 대체.
