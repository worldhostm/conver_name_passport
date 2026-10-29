import { ImageResponse } from "next/og";
import { SURNAMES, findSurnameBySlug } from "@/data/surnames";
import { romanizeSurname } from "@/lib/romanize";
import { SITE_NAME } from "@/lib/site";
import { OG_COLORS, OG_SIZE, loadKoreanFont } from "../../_og/font";

export const alt = "성씨 여권 영문 표기";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return SURNAMES.map((s) => ({ slug: s.slug }));
}

const LABELS = { title: " 영어로", standard: "로마자 표기법 기준", common: "많이 쓰는 표기" };
// 모든 성씨 글자를 한 번에 서브셋해 빌드 중 폰트 요청을 한 번으로 줄인다.
const FONT_TEXT = SURNAMES.map((s) => s.hangul).join("") + SITE_NAME + Object.values(LABELS).join("");

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = findSurnameBySlug(slug);
  const hangul = entry?.hangul ?? "";
  const common = entry?.common ?? [];
  const standard = romanizeSurname(hangul).toUpperCase();
  const font = await loadKoreanFont(FONT_TEXT);

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
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 44, color: OG_COLORS.accent, fontWeight: 700 }}>{`${hangul}${LABELS.title}`}</div>
          <div style={{ fontSize: common.length > 2 ? 96 : 120, fontWeight: 700, letterSpacing: 2, lineHeight: 1.1 }}>
            {common.map((c) => c.toUpperCase()).join(" · ")}
          </div>
          <div style={{ fontSize: 30, color: OG_COLORS.muted, display: "flex", gap: 40 }}>
            <span>{`${LABELS.common}: ${common[0] ?? ""}`}</span>
            <span>{`${LABELS.standard}: ${standard}`}</span>
          </div>
        </div>
        <div style={{ fontSize: 40, fontWeight: 700, color: OG_COLORS.positive }}>{SITE_NAME}</div>
      </div>
    ),
    {
      ...size,
      fonts: font ? [{ name: "NotoSansKR", data: font, weight: 700, style: "normal" }] : undefined,
    },
  );
}
