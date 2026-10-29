"use client";

/**
 * gtag.js 로더. 자동 page_view를 끄고(send_page_view: false) 페이지마다
 * <TrackPageView />가 page_type을 붙여 보낸다.
 * 이 파일과 events.ts 밖에서는 gtag를 다루지 않는다.
 */

import Script from "next/script";
import { GA_ID } from "./events";

export function Analytics() {
  if (!GA_ID) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('js', new Date());
gtag('config', '${GA_ID}', { send_page_view: false, anonymize_ip: true });`}
      </Script>
    </>
  );
}
