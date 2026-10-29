# 여권 영문 이름 변환기

한글 이름을 입력하면 국어의 로마자 표기법 기준 여권 영문 표기와 많이 쓰는 관용 표기를 함께 보여주는 정적 웹 서비스.
기획서: `여권 영문 이름 변환기 서비스 기획서.md`. 작업 규칙: `CLAUDE.md`.

## 실행

```bash
cp .env.example .env.local   # NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_SITE_URL 설정
npm install
npm run dev
```

## 검증

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## 폴더

- `app/` 페이지와 UI 컴포넌트(`app/_components`)
- `lib/romanize/` 변환 로직(순수 함수)과 테스트
- `lib/analytics/` GA4 이벤트 래퍼
- `data/surnames.ts` 성씨 관용 표기
- `docs/` 측정 설계, 결정 기록, 변경 로그
