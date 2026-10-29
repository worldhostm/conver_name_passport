"use client";

/**
 * gtag.js 로더. 자동 page_view를 끄고(send_page_view: false) 페이지마다
 * <TrackPageView />가 page_type을 붙여 보낸다.
 * 이 파일과 events.ts 밖에서는 gtag를 다루지 않는다.
 */

import Script from "next/script";
import { ANALYTICS_ENABLED, GA_ID } from "./events";

export function Analytics() {
  if (!ANALYTICS_ENABLED) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      {/* 초기화는 beforeInteractive로 초기 HTML <head>에 넣어, 첫 page_view가 초기화보다 먼저 실행되지 않게 한다. */}
      {/* 이 컴포넌트는 app/layout.tsx(루트 레이아웃)에서만 렌더된다. App Router에서는 루트 레이아웃의 beforeInteractive가 허용되며, 아래 규칙은 Pages Router 기준 경고다. */}
      {/* eslint-disable-next-line @next/next/no-before-interactive-script-outside-document */}
      <Script id="ga4-init" strategy="beforeInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });`}
      </Script>
    </>
  );
}
