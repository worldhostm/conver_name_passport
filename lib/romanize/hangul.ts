/**
 * 한글 음절 분해 유틸리티.
 * React·브라우저 API에 의존하지 않는 순수 함수만 둔다.
 */

const HANGUL_BASE = 0xac00;
const HANGUL_LAST = 0xd7a3;
const MEDIAL_COUNT = 21;
const FINAL_COUNT = 28;

export interface Jamo {
  /** 초성 인덱스 0..18 (ㄱ ㄲ ㄴ ㄷ ㄸ ㄹ ㅁ ㅂ ㅃ ㅅ ㅆ ㅇ ㅈ ㅉ ㅊ ㅋ ㅌ ㅍ ㅎ) */
  initial: number;
  /** 중성 인덱스 0..20 (ㅏ ㅐ ㅑ ㅒ ㅓ ㅔ ㅕ ㅖ ㅗ ㅘ ㅙ ㅚ ㅛ ㅜ ㅝ ㅞ ㅟ ㅠ ㅡ ㅢ ㅣ) */
  medial: number;
  /** 종성 인덱스 0..27 (0 = 받침 없음) */
  final: number;
}

export const INITIAL = {
  G: 0, KK: 1, N: 2, D: 3, TT: 4, R: 5, M: 6, B: 7, PP: 8, S: 9, SS: 10,
  NONE: 11, J: 12, JJ: 13, CH: 14, K: 15, T: 16, P: 17, H: 18,
} as const;

export const FINAL = {
  NONE: 0, G: 1, KK: 2, GS: 3, N: 4, NJ: 5, NH: 6, D: 7, L: 8, LG: 9, LM: 10,
  LB: 11, LS: 12, LT: 13, LP: 14, LH: 15, M: 16, B: 17, BS: 18, S: 19, SS: 20,
  NG: 21, J: 22, CH: 23, K: 24, T: 25, P: 26, H: 27,
} as const;

export function isHangulSyllable(ch: string): boolean {
  if (ch.length !== 1) return false;
  const code = ch.charCodeAt(0);
  return code >= HANGUL_BASE && code <= HANGUL_LAST;
}

/** 문자열 전체가 완성형 한글 음절로만 이루어졌는지 확인한다(공백 불허). */
export function isHangulOnly(text: string): boolean {
  if (text.length === 0) return false;
  for (const ch of text) {
    if (!isHangulSyllable(ch)) return false;
  }
  return true;
}

export function decompose(ch: string): Jamo | null {
  if (!isHangulSyllable(ch)) return null;
  const offset = ch.charCodeAt(0) - HANGUL_BASE;
  return {
    initial: Math.floor(offset / (MEDIAL_COUNT * FINAL_COUNT)),
    medial: Math.floor((offset % (MEDIAL_COUNT * FINAL_COUNT)) / FINAL_COUNT),
    final: offset % FINAL_COUNT,
  };
}

export function decomposeAll(text: string): Jamo[] {
  const result: Jamo[] = [];
  for (const ch of text) {
    const jamo = decompose(ch);
    if (jamo) result.push(jamo);
  }
  return result;
}
