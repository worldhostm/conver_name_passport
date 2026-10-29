import { Flex, FlexItem } from "layout";
import { Tag, Text, TextHeading, TextPrice } from "primitives";

export interface ProductInfoSectionProps {
  name: string;
  price: string;
  currency: string;
  promo?: string;
  description: string;
}

/** 정보 영역: 상품명 + 프로모션 태그, 가격, 설명. */
export function ProductInfoSection({ name, price, currency, promo, description }: ProductInfoSectionProps) {
  return (
    <>
      <Flex alignSecondary="center" gap="200">
        <TextHeading>{name}</TextHeading>
        {promo && (
          <Tag variant="secondary" scheme="positive">
            {promo}
          </Tag>
        )}
      </Flex>
      <FlexItem>
        <Flex direction="column" gap="200">
          <TextPrice currency={currency} price={price} />
        </Flex>
      </FlexItem>
      <Text>{description}</Text>
    </>
  );
}
