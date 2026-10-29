"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track, type PageType } from "./events";

/** 페이지 진입 시 page_view(page_type)를 보낸다. 경로가 바뀌면 다시 보낸다. */
export function TrackPageView({ pageType }: { pageType: PageType }) {
  const pathname = usePathname();
  useEffect(() => {
    track("page_view", { page_type: pageType });
  }, [pathname, pageType]);
  return null;
}
