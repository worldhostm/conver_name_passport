export interface ProductDetailsData {
  name: string;
  /** 가격(통화 기호 제외) */
  price: string;
  currency: string;
  /** 할인 등 프로모션 문구. 없으면 태그를 그리지 않는다. */
  promo?: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  colors: string[];
  quantities: string[];
  /** 아코디언 제목 → 항목 목록 */
  details: { title: string; items: string[] }[];
}
