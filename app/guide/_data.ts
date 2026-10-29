/** 가이드 목록. 목차 페이지, 관련 가이드 링크, sitemap이 함께 쓴다. */
export interface GuideMeta {
  slug: string;
  title: string;
  summary: string;
}

export const GUIDES: readonly GuideMeta[] = [
  { slug: "passport-name", title: "여권 영문 이름 정하는 법", summary: "처음 여권을 만들 때 영문 이름을 정하는 순서와 체크리스트." },
  { slug: "family-surname", title: "가족과 성 표기 맞추기", summary: "아이 여권을 만들 때 부모 표기와 통일해야 하는 이유와 방법." },
  { slug: "name-format", title: "붙여쓰기·하이픈·띄어쓰기 차이", summary: "GILDONG, GIL-DONG, GIL DONG이 해외 전산과 서류에서 어떻게 다르게 처리되는지." },
  { slug: "name-change", title: "여권 영문 이름 변경 가능한 경우", summary: "로마자 성명 변경이 허용되는 사유와 신청 방법, 주의할 점." },
  { slug: "romanization", title: "국어의 로마자 표기법과 이름", summary: "자모 대응표와 인명 표기 규정을 예시와 함께 정리." },
];

export function findGuide(slug: string): GuideMeta | undefined {
  return GUIDES.find((g) => g.slug === slug);
}
