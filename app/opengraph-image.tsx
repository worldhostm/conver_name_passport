import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { OG_COLORS, OG_SIZE, loadKoreanFont } from "./_og/font";

export const alt = `${SITE_NAME} — 한글 이름을 여권 영문 표기로`;
export const size = OG_SIZE;
export const contentType = "image/png";

const TAGLINE = "한글 이름을 입력하면 여권 영문 표기와 많이 쓰는 관용 표기를 함께";
const HOST = SITE_URL.replace(/^https?:\/\//, "");

export default async function Image() {
  const font = await loadKoreanFont(SITE_NAME + TAGLINE);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: `linear-gradient(135deg, ${OG_COLORS.background} 0%, ${OG_COLORS.surface} 100%)`,
          color: OG_COLORS.text,
          fontFamily: "NotoSansKR, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 30, color: OG_COLORS.accent, fontWeight: 700 }}>홍길동</div>
          <div style={{ fontSize: 112, fontWeight: 700, letterSpacing: 4, lineHeight: 1 }}>HONG GILDONG</div>
          <div style={{ fontSize: 34, color: OG_COLORS.muted, display: "flex", gap: 28 }}>
            <span>Hong Gildong</span>
            <span>Hong Gil-dong</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 48, fontWeight: 700 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 28, color: OG_COLORS.muted, display: "flex", justifyContent: "space-between" }}>
            <span>{TAGLINE}</span>
            <span>{HOST}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansKR", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}
