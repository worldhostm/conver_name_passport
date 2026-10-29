"use client";

import { useMediaQuery } from "hooks";
import { Flex, FlexItem, Section } from "layout";
import { ProductDetailsAccordion } from "./ProductDetailsAccordion";
import { ProductImageSection } from "./ProductImageSection";
import { ProductInfoSection } from "./ProductInfoSection";
import { ProductPurchaseSection } from "./ProductPurchaseSection";
import type { ProductDetailsData } from "./types";

export const SAMPLE_PRODUCT: ProductDetailsData = {
  name: "Ergonomic Office Chair",
  price: "129.99",
  currency: "$",
  promo: "30% Off",
  description:
    "Experience all-day comfort with our Ergonomic Office Chair, featuring adjustable lumbar support, breathable mesh back, and smooth-rolling casters. Perfect for home or office use.",
  imageUrl: "https://picsum.photos/seed/Modern office/1200/900",
  imageAlt: "Modern office chair in black",
  colors: ["Black", "Gray", "Blue", "Red", "White"],
  quantities: ["1", "2", "3", "4", "5"],
  details: [
    {
      title: "Product Details",
      items: [
        "Adjustable height and tilt",
        "Breathable mesh backrest",
        "360° swivel base",
        "Weight capacity: 250 lbs",
        "Easy assembly required",
      ],
    },
  ],
};

export interface ProductDetailsProps {
  product?: ProductDetailsData;
  onAdd?: (selection: { color: string; quantity: string }) => void;
}

/** SDS examples/ProductDetails.tsx를 섹션 단위로 나눈 조합. 레이아웃 뼈대는 원본과 같다. */
export function ProductDetails({ product = SAMPLE_PRODUCT, onAdd }: ProductDetailsProps) {
  const { isMobile } = useMediaQuery();
  const flexGap = isMobile ? "600" : "1200";
  const sectionPadding = isMobile ? "600" : "1600";

  return (
    <Section padding={sectionPadding} variant="stroke">
      <Flex container type="half" wrap gap={flexGap}>
        <ProductImageSection src={product.imageUrl} alt={product.imageAlt} />
        <FlexItem size="half">
          <Flex direction="column" gap="400" alignSecondary="stretch">
            <ProductInfoSection
              name={product.name}
              price={product.price}
              currency={product.currency}
              promo={product.promo}
              description={product.description}
            />
            <ProductPurchaseSection colors={product.colors} quantities={product.quantities} onAdd={onAdd} />
            <ProductDetailsAccordion sections={product.details} />
          </Flex>
        </FlexItem>
      </Flex>
    </Section>
  );
}
