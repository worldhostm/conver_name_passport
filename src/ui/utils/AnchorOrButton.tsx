"use client";

import React, {
  ComponentPropsWithoutRef,
  ForwardedRef,
  forwardRef,
} from "react";
import {
  Button as RACButton,
  Link as RACLink,
  type ButtonProps as RACButtonProps,
} from "react-aria-components";

export type AnchorOrButtonSharedProps = {
  children?: React.ReactNode;
  href?: string;
};

export type AnchorOrButtonProps = (
  | RACButtonProps
  | ComponentPropsWithoutRef<typeof RACLink>
) &
  AnchorOrButtonSharedProps;

function isAnchorProps(
  props: AnchorOrButtonProps,
): props is AnchorOrButtonSharedProps &
  ComponentPropsWithoutRef<typeof RACLink> {
  return "href" in props;
}

export const AnchorOrButton = forwardRef(function AnchorOrButton(
  props: AnchorOrButtonProps,
  ref: ForwardedRef<HTMLElement>,
) {
  // SDS 원본과의 차이: react-aria-components 1.22부터 Button과 Link의 render prop 타입이 달라
  // 유니언 props를 그대로 spread하면 타입 오류가 난다. 분기별로 캐스팅한다(style은 원본처럼 제외).
  if (isAnchorProps(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style, ...linkProps } = props as ComponentPropsWithoutRef<typeof RACLink>;
    return (
      <RACLink
        {...linkProps}
        className={props.className}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {props.children}
      </RACLink>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style, ...buttonProps } = props as RACButtonProps;
  return (
    <RACButton
      {...buttonProps}
      className={props.className}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});
