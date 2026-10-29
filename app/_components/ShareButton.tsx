"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/events";
import { SITE_NAME } from "@/lib/site";
import { copyText } from "./copyText";

/**
 * 현재 페이지 주소를 공유한다. 이름은 URL에 넣지 않으므로
 * 받는 사람은 같은 페이지에서 직접 입력하게 된다.
 */
export function ShareButton() {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function onShare() {
    const url = `${window.location.origin}${window.location.pathname}`;
    if (typeof navigator.share === "function") {
      track("share_click", { share_method: "web_share" });
      try {
        await navigator.share({ title: SITE_NAME, url });
        return;
      } catch {
        // 사용자가 취소했거나 실패: 링크 복사로 대체
      }
    } else {
      track("share_click", { share_method: "copy_link" });
    }
    const ok = await copyText(url);
    setStatus(ok ? "copied" : "failed");
    window.setTimeout(() => setStatus("idle"), 1800);
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={onShare}>
      {status === "copied" ? "링크 복사됨" : status === "failed" ? "복사 실패" : "이 페이지 공유"}
    </button>
  );
}
