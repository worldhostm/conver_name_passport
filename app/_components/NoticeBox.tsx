"use client";

import type { ReactNode } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  id: string;
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

/** 접었다 펼치는 안내 박스. 펼칠 때 notice_expand를 보낸다. */
export function NoticeBox({ id, title, children, defaultOpen = false }: Props) {
  return (
    <details
      className="notice"
      open={defaultOpen}
      onToggle={(e) => {
        if (e.currentTarget.open) track("notice_expand", { notice_id: id });
      }}
    >
      <summary>{title}</summary>
      <div className="notice-body">{children}</div>
    </details>
  );
}
