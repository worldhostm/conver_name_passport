/**
 * 인명 로마자 변환(국어의 로마자 표기법, 문화관광부 고시 제2000-8호).
 *
 * 제3장 제4항: 인명은 성과 이름의 순서로 띄어 쓴다. 이름은 붙여 쓰는 것을
 * 원칙으로 하되 음절 사이에 붙임표(-)를 쓰는 것을 허용한다.
 *   (1) 이름에서 일어나는 음운 변화는 표기에 반영하지 않는다.
 *       예: 한복남 Han Boknam, 홍빛나 Hong Bitna
 *   (2) 성의 표기는 따로 정한다. → 이 모듈은 규칙대로 적은 값만 돌려주고,
 *       관용 표기는 data/surnames.ts에서 관리한다.
 *
 * 따라서 이름은 음절 하나하나를 독립적으로 적는다. 받침은 항상 자음 앞·어말
 * 표기(k, t, p, l)를 쓰고(복연 → Bokyeon, 연음 미반영), 유일한 예외는
 * 제2장 제2항 붙임 2의 'ㄹㄹ → ll'(소리 변화가 아닌 표기 규정)이다.
 *
 * 일반 단어 변환(음운 변화 반영)은 이 모듈의 범위가 아니다.
 */

import { FINAL, INITIAL, decomposeAll, isHangulOnly } from "./hangul";
import { FINAL_ROMAN, INITIAL_ROMAN, MEDIAL_ROMAN } from "./tables";

export type NameFormat = "joined" | "hyphen" | "spaced";
export type NameOrder = "surname-first" | "given-first";
export type LetterCase = "upper" | "capitalized";

export const NAME_FORMATS: readonly NameFormat[] = ["joined", "hyphen", "spaced"];
export const NAME_ORDERS: readonly NameOrder[] = ["surname-first", "given-first"];

/**
 * 한글 문자열을 음절 단위 로마자 배열로 바꾼다.
 * 음운 변화는 반영하지 않으며 'ㄹㄹ'만 ll로 적는다.
 * 한글 음절이 아닌 문자는 무시한다.
 */
export function romanizeSyllables(text: string): string[] {
  const jamos = decomposeAll(text);
  return jamos.map((jamo, i) => {
    let initial = INITIAL_ROMAN[jamo.initial];
    const prev = i > 0 ? jamos[i - 1] : null;
    // 제2장 제2항 붙임 2: 'ㄹㄹ'은 ll로 적는다. (설리 → Seolli)
    if (prev && prev.final === FINAL.L && jamo.initial === INITIAL.R) {
      initial = "l";
    }
    return initial + MEDIAL_ROMAN[jamo.medial] + FINAL_ROMAN[jamo.final];
  });
}

/** 성(1~2음절)을 규칙대로 적는다. 예: 김 → gim, 남궁 → namgung */
export function romanizeSurname(surname: string): string {
  return romanizeSyllables(surname).join("");
}

/** 이름 음절을 형식 옵션에 따라 이어 붙인다(소문자). */
export function joinGivenName(syllables: readonly string[], format: NameFormat): string {
  switch (format) {
    case "joined":
      return syllables.join("");
    case "hyphen":
      return syllables.join("-");
    case "spaced":
      return syllables.join(" ");
  }
}

/** 이름을 규칙대로 적는다. 예: 길동 → gildong / gil-dong / gil dong */
export function romanizeGivenName(given: string, format: NameFormat = "joined"): string {
  return joinGivenName(romanizeSyllables(given), format);
}

/**
 * 대소문자 적용.
 * - upper: 여권 기재 형식(HONG GILDONG)
 * - capitalized: 일반 서류 형식(Hong Gildong). 공백으로 나뉜 단어마다 첫 글자만
 *   대문자로 하고, 붙임표 뒤는 소문자로 둔다(국립국어원 용례: Min Yong-ha).
 */
export function applyCase(text: string, letterCase: LetterCase): string {
  if (letterCase === "upper") return text.toUpperCase();
  return text
    .toLowerCase()
    .split(" ")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export interface FullNameParts {
  surname: string;
  given: string;
}

/** 성·이름 순서를 적용해 하나의 문자열로 만든다. */
export function composeFullName({ surname, given }: FullNameParts, order: NameOrder): string {
  const parts = order === "surname-first" ? [surname, given] : [given, surname];
  return parts.filter(Boolean).join(" ");
}

export interface NameInput {
  surname: string;
  given: string;
}

export type NameValidationError =
  | "surname_empty"
  | "surname_not_hangul"
  | "surname_too_long"
  | "given_empty"
  | "given_not_hangul"
  | "given_too_long";

export const MAX_SURNAME_SYLLABLES = 2;
export const MAX_GIVEN_SYLLABLES = 6;

/** 입력값을 다듬고 검증한다. 공백은 제거한다. */
export function validateNameInput(input: NameInput):
  | { ok: true; value: NameInput }
  | { ok: false; error: NameValidationError } {
  const surname = input.surname.replace(/\s+/g, "");
  const given = input.given.replace(/\s+/g, "");

  if (!surname) return { ok: false, error: "surname_empty" };
  if (!isHangulOnly(surname)) return { ok: false, error: "surname_not_hangul" };
  if (surname.length > MAX_SURNAME_SYLLABLES) return { ok: false, error: "surname_too_long" };
  if (!given) return { ok: false, error: "given_empty" };
  if (!isHangulOnly(given)) return { ok: false, error: "given_not_hangul" };
  if (given.length > MAX_GIVEN_SYLLABLES) return { ok: false, error: "given_too_long" };

  return { ok: true, value: { surname, given } };
}
