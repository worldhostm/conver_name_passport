import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Analytics } from "@/lib/analytics/Analytics";
import { OFFICIAL_PASSPORT_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 한글 이름을 여권 영문 표기로`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "ko_KR",
  },
  twitter: { card: "summary" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f8fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0f1115" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <div className="container">
            <Link href="/" className="brand">
              {SITE_NAME}
            </Link>
            <nav className="nav" aria-label="주요 메뉴">
              <Link href="/surname">성씨별 표기</Link>
              <Link href="/guide">가이드</Link>
            </nav>
          </div>
        </header>
        <main className="container">{children}</main>
        <footer className="site-footer">
          <div className="container">
            <p>
              이 서비스는 국어의 로마자 표기법과 널리 쓰이는 관용 표기를 참고용으로 보여줍니다. 여권에 쓸 최종 표기는{" "}
              <a href={OFFICIAL_PASSPORT_URL} target="_blank" rel="noopener noreferrer">
                외교부 여권안내
              </a>{" "}
              등 공식 기관에서 확인하세요.
            </p>
            <p>입력한 이름은 서버로 전송되지 않습니다. 방문 통계는 Google Analytics로 수집합니다.</p>
            <p>
              <Link href="/privacy">개인정보처리방침</Link> · <Link href="/guide/romanization">표기 규칙</Link>
            </p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
