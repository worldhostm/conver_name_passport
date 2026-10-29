/**
 * 음절 하나가 왜 그렇게 적히는지 설명하는 데이터(성씨 페이지·규칙 가이드용).
 * 순수 함수. 문장 조립은 UI에서 한다.
 */

import { decompose } from "./hangul";
import { FINAL_ROMAN, INITIAL_ROMAN, MEDIAL_ROMAN } from "./tables";

export const INITIAL_CHARS = "ㄱㄲㄴㄷㄸㄹㅁㅂㅃㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ";
export const MEDIAL_CHARS = "ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ";
export const FINAL_CHARS: readonly string[] = [
  "", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ",
  "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ",
];

export type JamoRole = "초성" | "중성" | "종성";

export interface JamoExplanation {
  role: JamoRole;
  jamo: string;
  roman: string;
}

/** 예: '박' → [초성 ㅂ b, 중성 ㅏ a, 종성 ㄱ k] */
export function explainSyllable(ch: string): JamoExplanation[] {
  const jamo = decompose(ch);
  if (!jamo) return [];
  const parts: JamoExplanation[] = [
    { role: "초성", jamo: INITIAL_CHARS[jamo.initial], roman: INITIAL_ROMAN[jamo.initial] || "(소리 없음)" },
    { role: "중성", jamo: MEDIAL_CHARS[jamo.medial], roman: MEDIAL_ROMAN[jamo.medial] },
  ];
  if (jamo.final > 0) {
    parts.push({ role: "종성", jamo: FINAL_CHARS[jamo.final], roman: FINAL_ROMAN[jamo.final] });
  }
  return parts;
}
