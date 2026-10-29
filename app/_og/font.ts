/**
 * OG 이미지용 한글 폰트 로더.
 * next/og(satori) 기본 폰트는 라틴 문자만 있어 한글이 깨진다. Google Fonts CSS API의 text= 파라미터로
 * 필요한 글자만 담은 서브셋을 빌드 시점에 받아 쓴다. 네트워크가 없으면 null을 돌려주고 라틴 문자만 그린다.
 */

const cache = new Map<string, Promise<ArrayBuffer | null>>();

export function loadKoreanFont(text: string): Promise<ArrayBuffer | null> {
  const chars = Array.from(new Set(text)).sort().join("");
  const cached = cache.get(chars);
  if (cached) return cached;
  const promise = fetchFont(chars).catch(() => null);
  cache.set(chars, promise);
  return promise;
}

async function fetchFont(text: string): Promise<ArrayBuffer | null> {
  const url = `https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&text=${encodeURIComponent(text)}`;
  // 오래된 UA를 보내면 woff2 대신 satori가 읽을 수 있는 truetype/opentype URL을 준다.
  const css = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1)" } })).text();
  const match = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/);
  if (!match) return null;
  const res = await fetch(match[1]);
  if (!res.ok) return null;
  return res.arrayBuffer();
}

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  background: "#0f1115",
  surface: "#171a21",
  text: "#e8eaf0",
  muted: "#9aa3b5",
  accent: "#5b8cff",
  positive: "#3ccf9a",
} as const;
