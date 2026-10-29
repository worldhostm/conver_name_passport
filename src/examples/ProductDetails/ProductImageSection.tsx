import { Image } from "primitives";

export interface ProductImageSectionProps {
  src: string;
  alt: string;
}

/** 이미지 영역. 원본 예시와 같이 Flex(type="half")의 직접 자식으로 둔다. */
export function ProductImageSection({ src, alt }: ProductImageSectionProps) {
  return <Image src={src} alt={alt} size="large" aspectRatio="4-3" />;
}
