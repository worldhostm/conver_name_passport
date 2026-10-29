"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { track } from "@/lib/analytics/events";

type Props = ComponentProps<typeof Link> & { href: string };

/** 내부 링크 클릭을 internal_link_click으로 기록하는 Link. */
export function TrackedLink({ href, onClick, ...rest }: Props) {
  return (
    <Link
      href={href}
      onClick={(e) => {
        track("internal_link_click", { link_target: href });
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
