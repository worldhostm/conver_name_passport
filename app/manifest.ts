import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "여권 영문 이름",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    lang: "ko",
    background_color: "#f7f8fa",
    theme_color: "#1f5eff",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
