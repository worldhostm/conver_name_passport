"use client";

import { clsx } from "clsx";
import React, { ComponentPropsWithoutRef } from "react";
import { Button as RACButton, Link as RACLink } from "react-aria-components";
import { type AnchorOrButtonProps } from "utils";
import "./button.css";

export type ButtonProps = Omit<ButtonBaseProps, "variant"> & {
  variant?: Exclude<
    ButtonBaseProps["variant"],
    "danger-primary" | "danger-subtle"
  >;
};
export const Button = React.forwardRef(function Button(
  { className, size = "medium", variant = "primary", ...props }: ButtonProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  // SDS 원본과의 차이: react-aria-components 1.22부터 Button과 Link의 render prop 타입이 달라
  // 유니언 props를 그대로 spread하면 타입 오류가 난다. 타입 가드로 좁힌 뒤 분해한다(style은 원본처럼 제외).
  if (isAnchorProps(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _style, ...linkProps } = props as ComponentPropsWithoutRef<typeof RACLink>;
    return (
      <RACLink
        {...linkProps}
        className={classNames}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {props.children}
      </RACLink>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style: _style, ...buttonProps } = props as ComponentPropsWithoutRef<typeof RACButton>;
  return (
    <RACButton
      {...buttonProps}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});

export type ButtonDangerProps = Omit<ButtonBaseProps, "variant"> & {
  variant?: Exclude<
    ButtonBaseProps["variant"],
    "primary" | "subtle" | "neutral"
  >;
};
/**
 * Only used for destructive actions
 */
export const ButtonDanger = React.forwardRef(function Button(
  {
    className,
    size = "medium",
    variant = "danger-primary",
    ...props
  }: ButtonDangerProps,
  ref: React.ForwardedRef<HTMLElement>,
) {
  const classNames = clsx(
    className,
    "button",
    `button-size-${size}`,
    `button-variant-${variant}`,
  );

  // SDS 원본과의 차이: react-aria-components 1.22부터 Button과 Link의 render prop 타입이 달라
  // 유니언 props를 그대로 spread하면 타입 오류가 난다. 타입 가드로 좁힌 뒤 분해한다(style은 원본처럼 제외).
  if (isAnchorProps(props)) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { style: _style, ...linkProps } = props as ComponentPropsWithoutRef<typeof RACLink>;
    return (
      <RACLink
        {...linkProps}
        className={classNames}
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
      >
        {props.children}
      </RACLink>
    );
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { style: _style, ...buttonProps } = props as ComponentPropsWithoutRef<typeof RACButton>;
  return (
    <RACButton
      {...buttonProps}
      className={classNames}
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
    >
      {props.children}
    </RACButton>
  );
});

type ButtonBaseProps = {
  type?: ComponentPropsWithoutRef<"button">["type"];
  size?: "small" | "medium";
  variant?:
    | "primary"
    | "neutral"
    | "subtle"
    | "danger-primary"
    | "danger-subtle";
} & AnchorOrButtonProps;

function isAnchorProps(
  props: ButtonBaseProps | ButtonDangerProps,
): props is (ButtonBaseProps | ButtonDangerProps) &
  ComponentPropsWithoutRef<typeof RACLink> {
  return "href" in props;
}

export type ButtonGroupProps = React.ComponentPropsWithoutRef<"div"> & {
  align?: "start" | "end" | "center" | "justify" | "stack";
};
export const ButtonGroup = ({
  align = "start",
  className,
  ...props
}: ButtonGroupProps) => {
  const classNames = clsx(
    className,
    "button-group",
    `button-group-align-${align}`,
  );
  return <div className={classNames} {...props} />;
};
