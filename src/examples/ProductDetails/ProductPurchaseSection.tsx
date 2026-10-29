"use client";

import { useMediaQuery } from "hooks";
import { IconShoppingBag } from "icons";
import { Flex, FlexItem } from "layout";
import { Button, Label, TagToggle, TagToggleGroup, TagToggleList } from "primitives";
import { useState } from "react";
import type { Key } from "react-aria-components";

export interface ProductPurchaseSectionProps {
  colors: string[];
  quantities: string[];
  defaultColor?: string;
  defaultQuantity?: string;
  onAdd?: (selection: { color: string; quantity: string }) => void;
}

/**
 * 옵션·구매 영역.
 * SDS 원본 예시는 SelectField/SelectItem을 썼지만 Select primitive는 아직 옮기지 않았으므로
 * 이미 옮긴 Tag primitive의 TagToggleGroup(단일 선택)으로 옵션을 고른다.
 */
export function ProductPurchaseSection({
  colors,
  quantities,
  defaultColor = colors[0],
  defaultQuantity = quantities[0],
  onAdd,
}: ProductPurchaseSectionProps) {
  const { isDesktop } = useMediaQuery();
  const [color, setColor] = useState<string>(defaultColor);
  const [quantity, setQuantity] = useState<string>(defaultQuantity);

  return (
    <FlexItem>
      <Flex
        wrap
        gap="200"
        direction={isDesktop ? "row" : "column"}
        alignSecondary={isDesktop ? "end" : "stretch"}
      >
        <FlexItem size="fill">
          <OptionToggleGroup label="Color" options={colors} value={color} onChange={setColor} />
        </FlexItem>
        <FlexItem size="fill">
          <OptionToggleGroup label="Quantity" options={quantities} value={quantity} onChange={setQuantity} />
        </FlexItem>
        <Button variant="primary" onPress={() => onAdd?.({ color, quantity })}>
          Add
          <IconShoppingBag />
        </Button>
      </Flex>
    </FlexItem>
  );
}

interface OptionToggleGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

function OptionToggleGroup({ label, options, value, onChange }: OptionToggleGroupProps) {
  function handleChange(keys: "all" | Set<Key>) {
    if (keys === "all") return;
    const [first] = keys;
    if (first !== undefined) onChange(String(first));
  }
  return (
    <TagToggleGroup
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[value]}
      onSelectionChange={handleChange}
    >
      <Label>{label}</Label>
      <TagToggleList>
        {options.map((option) => (
          <TagToggle key={option} id={option}>
            {option}
          </TagToggle>
        ))}
      </TagToggleList>
    </TagToggleGroup>
  );
}
