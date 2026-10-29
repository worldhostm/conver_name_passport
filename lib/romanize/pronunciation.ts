/**
 * 발음 기반 안내(P2).
 *
 * 여권 표기 원칙(제3장 제4항 (1))은 이름의 음운 변화를 반영하지 않으므로,
 * 실제 발음대로 적은 결과와 달라지는 경우가 있다. 이 모듈은 그런 음절 경계를
 * 찾아 "원칙 표기"와 "발음에 가까운 표기"를 함께 돌려준다. 추천이 아니라 안내용이다.
 */

import { FINAL, INITIAL, decomposeAll } from "./hangul";
import { FINAL_LIAISON_ROMAN, FINAL_ROMAN, INITIAL_ROMAN, MEDIAL_ROMAN } from "./tables";
import { joinGivenName, romanizeSyllables, type NameFormat } from "./romanize";

export type PronunciationRule = "liaison" | "nasalization" | "liquidization";

export interface PronunciationNote {
  rule: PronunciationRule;
  /** 원칙대로 적은 이름(소문자) */
  standard: string;
  /** 실제 발음에 가깝게 적은 이름(소문자) */
  pronounced: string;
  /** 차이가 생긴 음절 위치(0부터) */
  boundary: number;
}

const NASAL_TARGET: Record<number, string> = {
  // 표준 발음법 제18항: 받침 'ㄱ, ㄷ, ㅂ'은 'ㄴ, ㅁ' 앞에서 [ㅇ, ㄴ, ㅁ]으로 발음한다.
  [FINAL.G]: "ng",
  [FINAL.KK]: "ng",
  [FINAL.GS]: "ng",
  [FINAL.LG]: "ng",
  [FINAL.K]: "ng",
  [FINAL.D]: "n",
  [FINAL.S]: "n",
  [FINAL.SS]: "n",
  [FINAL.J]: "n",
  [FINAL.CH]: "n",
  [FINAL.T]: "n",
  [FINAL.H]: "n",
  [FINAL.B]: "m",
  [FINAL.BS]: "m",
  [FINAL.LP]: "m",
  [FINAL.P]: "m",
};

/**
 * 이름에서 발음과 원칙 표기가 달라지는 첫 경계를 찾아 안내를 만든다.
 * 없으면 null.
 */
export function describePronunciation(
  given: string,
  format: NameFormat = "joined",
): PronunciationNote | null {
  const jamos = decomposeAll(given);
  const standard = romanizeSyllables(given);

  for (let i = 0; i < jamos.length - 1; i++) {
    const cur = jamos[i];
    const next = jamos[i + 1];
    if (cur.final === FINAL.NONE) continue;

    const curBody = INITIAL_ROMAN[cur.initial] + MEDIAL_ROMAN[cur.medial];
    const nextBody = MEDIAL_ROMAN[next.medial] + FINAL_ROMAN[next.final];

    // 연음: 받침 + 'ㅇ' 초성 → 받침이 다음 음절 초성으로 넘어간다. (복연 [보견] → bogyeon)
    if (next.initial === INITIAL.NONE && cur.final !== FINAL.NG) {
      const pronounced = [...standard];
      pronounced[i] = curBody;
      pronounced[i + 1] = FINAL_LIAISON_ROMAN[cur.final] + nextBody;
      return build("liaison", standard, pronounced, i, format);
    }

    // 비음화: ㄱ·ㄷ·ㅂ 받침 + ㄴ·ㅁ 초성 (복남 [봉남] → bongnam)
    if ((next.initial === INITIAL.N || next.initial === INITIAL.M) && NASAL_TARGET[cur.final]) {
      const pronounced = [...standard];
      pronounced[i] = curBody + NASAL_TARGET[cur.final];
      return build("nasalization", standard, pronounced, i, format);
    }

    // 유음화(표준 발음법 제20항): ㄴ+ㄹ, ㄹ+ㄴ → [ㄹㄹ] (선률 [설률] → seollyul)
    if (
      (cur.final === FINAL.N && next.initial === INITIAL.R) ||
      (cur.final === FINAL.L && next.initial === INITIAL.N)
    ) {
      const pronounced = [...standard];
      pronounced[i] = curBody + "l";
      pronounced[i + 1] = "l" + nextBody;
      return build("liquidization", standard, pronounced, i, format);
    }
  }
  return null;
}

function build(
  rule: PronunciationRule,
  standard: string[],
  pronounced: string[],
  boundary: number,
  format: NameFormat,
): PronunciationNote | null {
  const s = joinGivenName(standard, format);
  const p = joinGivenName(pronounced, format);
  if (s === p) return null;
  return { rule, standard: s, pronounced: p, boundary };
}
