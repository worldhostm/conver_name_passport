"use client";

// SDS 원본 Cards.tsx에서 범용 Card만 옮겼다.
// PricingCard, ProductInfoCard, ReviewCard, StatsCard, TestimonialCard는 Avatar·Image·data 모듈에
// 의존하므로 필요해질 때 추가한다.
import clsx from "clsx";
import { useMediaQuery } from "hooks";
import { ComponentPropsWithoutRef } from "react";
import { AnchorOrButton, AnchorOrButtonProps } from "utils";
import "./cards.css";

export type CardProps = ComponentPropsWithoutRef<"div"> & {
  /**
   * The alignment of the card content.
   */
  align?: "start" | "center" | "end";
  /**
   * The initial direction of the card.
   * All cards become vertical on mobile.
   */
  direction?: "horizontal" | "vertical";
  /**
   * The interaction props for the Card.
   * If present, the card itself is pressable.
   * AnchorOrButtonProps extend either button or anchor behavior.
   */
  interactionProps?: AnchorOrButtonProps;
  /**
   * An asset for the card.
   * Can be an Icon or an Image instance.
   */
  asset?: React.ReactNode;
  /**
   * Padding can be none, 600, or 800
   */
  padding?: "600" | "800";
  /**
   * Style variation of the card.
   */
  variant?: "default" | "stroke" | "brand";
};

/**
 * The basic card generic component that can be used to create vanity card components.
 */
export function Card({
  align = "start",
  children,
  className,
  direction = "vertical",
  interactionProps,
  variant = "default",
  asset,
  padding,
  ...props
}: CardProps) {
  const { isMobile } = useMediaQuery();
  const classNames = clsx(
    className,
    "card",
    `card-align-${align}`,
    `card-direction-${isMobile ? "vertical" : direction}`,
    `card-padding-${padding ? padding : "0"}`,
    `card-variant-${variant}`,
  );
  return (
    <div className={classNames} {...props}>
      {asset && <div className="card-asset">{asset}</div>}
      <div className="card-content">{children}</div>
      {interactionProps && (
        <AnchorOrButton className="card-interaction" {...interactionProps} />
      )}
    </div>
  );
}
