import { describe, expect, it } from "vitest";
import {
  applyCase,
  composeFullName,
  romanizeGivenName,
  romanizeSurname,
  romanizeSyllables,
  validateNameInput,
} from "./romanize";

/**
 * 근거: 국어의 로마자 표기법(문화관광부 고시 제2000-8호).
 * 각 케이스의 주석에 적용 조항을 남긴다. 규칙을 바꾸면 케이스를 추가한다.
 */
describe("romanizeSyllables — 인명 음절 변환", () => {
  it("제3장 제4항 용례: 민용하 → Min Yongha", () => {
    expect(romanizeSurname("민")).toBe("min");
    expect(romanizeGivenName("용하")).toBe("yongha");
  });

  it("제3장 제4항 용례: 송나리 → Song Nari", () => {
    expect(romanizeSurname("송")).toBe("song");
    expect(romanizeGivenName("나리")).toBe("nari");
  });

  it("제3장 제4항 (1) 음운 변화 미반영: 한복남 → Han Boknam (비음화 [봉남] 반영 안 함)", () => {
    expect(romanizeGivenName("복남")).toBe("boknam");
  });

  it("제3장 제4항 (1) 음운 변화 미반영: 홍빛나 → Hong Bitna (ㅊ 받침은 t)", () => {
    expect(romanizeGivenName("빛나")).toBe("bitna");
  });

  it("제3장 제4항 (1) 연음 미반영: 복연 → Bokyeon (받침 ㄱ은 다음 모음 앞에서도 k)", () => {
    expect(romanizeGivenName("복연")).toBe("bokyeon");
  });

  it("제2장 제2항 붙임 1: 받침 ㄱ·ㄷ·ㅂ은 어말에서 k·t·p", () => {
    expect(romanizeSyllables("국")).toEqual(["guk"]);
    expect(romanizeSyllables("곧")).toEqual(["got"]);
    expect(romanizeSyllables("밥")).toEqual(["bap"]);
  });

  it("제2장 제2항 붙임 2: ㄹ은 모음 앞 r, 받침 l, ㄹㄹ은 ll", () => {
    expect(romanizeSyllables("라")).toEqual(["ra"]);
    expect(romanizeSyllables("설")).toEqual(["seol"]);
    expect(romanizeGivenName("설리")).toBe("seolli");
    expect(romanizeSurname("류")).toBe("ryu");
  });

  it("제2장 제2항: 된소리·거센소리", () => {
    expect(romanizeSyllables("까")).toEqual(["kka"]);
    expect(romanizeSyllables("따")).toEqual(["tta"]);
    expect(romanizeSyllables("빠")).toEqual(["ppa"]);
    expect(romanizeSyllables("싸")).toEqual(["ssa"]);
    expect(romanizeSyllables("짜")).toEqual(["jja"]);
    expect(romanizeSyllables("차")).toEqual(["cha"]);
    expect(romanizeSyllables("카")).toEqual(["ka"]);
    expect(romanizeSyllables("타")).toEqual(["ta"]);
    expect(romanizeSyllables("파")).toEqual(["pa"]);
    expect(romanizeSyllables("하")).toEqual(["ha"]);
  });

  it("제2장 제1항: 모음 표기(ㅓ eo, ㅡ eu, ㅚ oe, ㅝ wo, ㅢ ui)", () => {
    expect(romanizeGivenName("서연")).toBe("seoyeon");
    expect(romanizeGivenName("은우")).toBe("eunu");
    expect(romanizeSurname("최")).toBe("choe");
    expect(romanizeSyllables("워")).toEqual(["wo"]);
    expect(romanizeSyllables("의")).toEqual(["ui"]);
    expect(romanizeSyllables("왜")).toEqual(["wae"]);
    expect(romanizeSyllables("웨")).toEqual(["we"]);
    expect(romanizeSyllables("위")).toEqual(["wi"]);
    expect(romanizeSyllables("얘")).toEqual(["yae"]);
    expect(romanizeSyllables("예")).toEqual(["ye"]);
  });

  it("'ㅅ'은 모음 앞에서 s로 적는다(시 → si, sh 아님)", () => {
    expect(romanizeGivenName("시우")).toBe("siu");
    expect(romanizeSurname("신")).toBe("sin");
  });

  it("받침 ㅇ은 ng, 받침 ㅅ·ㅈ·ㅊ·ㅌ·ㅎ은 t, 받침 ㅍ은 p, 받침 ㅋ은 k", () => {
    expect(romanizeSyllables("강")).toEqual(["gang"]);
    expect(romanizeSyllables("옷")).toEqual(["ot"]);
    expect(romanizeSyllables("낮")).toEqual(["nat"]);
    expect(romanizeSyllables("꽃")).toEqual(["kkot"]);
    expect(romanizeSyllables("밑")).toEqual(["mit"]);
    expect(romanizeSyllables("히읗")).toEqual(["hi", "eut"]);
    expect(romanizeSyllables("잎")).toEqual(["ip"]);
    expect(romanizeSyllables("부엌")).toEqual(["bu", "eok"]);
  });

  it("겹받침은 표준 발음법 제10항·제11항의 대표음으로 적는다", () => {
    expect(romanizeSyllables("넋")).toEqual(["neok"]); // ㄳ → k
    expect(romanizeSyllables("앉")).toEqual(["an"]); // ㄵ → n
    expect(romanizeSyllables("많")).toEqual(["man"]); // ㄶ → n
    expect(romanizeSyllables("닭")).toEqual(["dak"]); // ㄺ → k
    expect(romanizeSyllables("삶")).toEqual(["sam"]); // ㄻ → m
    expect(romanizeSyllables("여덟")).toEqual(["yeo", "deol"]); // ㄼ → l
    expect(romanizeSyllables("값")).toEqual(["gap"]); // ㅄ → p
    expect(romanizeSyllables("핥")).toEqual(["hal"]); // ㄾ → l
    expect(romanizeSyllables("읊")).toEqual(["eup"]); // ㄿ → p
    expect(romanizeSyllables("닳")).toEqual(["dal"]); // ㅀ → l
  });

  it("초성 ㅇ은 소리가 없어 적지 않는다: 이 → i, 오 → o, 우 → u", () => {
    expect(romanizeSurname("이")).toBe("i");
    expect(romanizeSurname("오")).toBe("o");
    expect(romanizeSurname("우")).toBe("u");
  });

  it("두 음절 성씨는 붙여 적는다: 남궁 → namgung, 황보 → hwangbo", () => {
    expect(romanizeSurname("남궁")).toBe("namgung");
    expect(romanizeSurname("황보")).toBe("hwangbo");
  });

  it("주요 성씨 규칙 표기", () => {
    expect(romanizeSurname("김")).toBe("gim");
    expect(romanizeSurname("박")).toBe("bak");
    expect(romanizeSurname("정")).toBe("jeong");
    expect(romanizeSurname("조")).toBe("jo");
    expect(romanizeSurname("윤")).toBe("yun");
    expect(romanizeSurname("임")).toBe("im");
    expect(romanizeSurname("권")).toBe("gwon");
    expect(romanizeSurname("황")).toBe("hwang");
  });

  it("한글이 아닌 문자는 무시한다", () => {
    expect(romanizeSyllables("a1 가")).toEqual(["ga"]);
  });
});

describe("romanizeGivenName — 이름 형식 옵션", () => {
  it("제3장 제4항: 이름은 붙여 쓰는 것이 원칙이고 붙임표를 허용한다", () => {
    expect(romanizeGivenName("길동", "joined")).toBe("gildong");
    expect(romanizeGivenName("길동", "hyphen")).toBe("gil-dong");
    expect(romanizeGivenName("길동", "spaced")).toBe("gil dong");
  });

  it("외자 이름은 형식과 무관하게 같다", () => {
    expect(romanizeGivenName("준", "hyphen")).toBe("jun");
    expect(romanizeGivenName("준", "spaced")).toBe("jun");
  });

  it("세 음절 이름", () => {
    expect(romanizeGivenName("아름이", "hyphen")).toBe("a-reum-i");
  });
});

describe("applyCase / composeFullName", () => {
  it("여권 형식은 모두 대문자", () => {
    expect(applyCase("hong gildong", "upper")).toBe("HONG GILDONG");
    expect(applyCase("hong gil-dong", "upper")).toBe("HONG GIL-DONG");
  });

  it("일반 서류 형식은 단어 첫 글자만 대문자, 붙임표 뒤는 소문자(Min Yong-ha)", () => {
    expect(applyCase("min yong-ha", "capitalized")).toBe("Min Yong-ha");
    expect(applyCase("hong gil dong", "capitalized")).toBe("Hong Gil Dong");
    expect(applyCase("HONG GILDONG", "capitalized")).toBe("Hong Gildong");
  });

  it("성·이름 순서 전환", () => {
    const parts = { surname: "hong", given: "gildong" };
    expect(composeFullName(parts, "surname-first")).toBe("hong gildong");
    expect(composeFullName(parts, "given-first")).toBe("gildong hong");
  });
});

describe("validateNameInput", () => {
  it("공백을 제거하고 통과시킨다", () => {
    expect(validateNameInput({ surname: " 홍 ", given: "길 동" })).toEqual({
      ok: true,
      value: { surname: "홍", given: "길동" },
    });
  });

  it("빈 값과 한글 아닌 값을 거른다", () => {
    expect(validateNameInput({ surname: "", given: "길동" })).toEqual({ ok: false, error: "surname_empty" });
    expect(validateNameInput({ surname: "Hong", given: "길동" })).toEqual({ ok: false, error: "surname_not_hangul" });
    expect(validateNameInput({ surname: "홍", given: "" })).toEqual({ ok: false, error: "given_empty" });
    expect(validateNameInput({ surname: "홍", given: "ㄱㄷ" })).toEqual({ ok: false, error: "given_not_hangul" });
  });

  it("길이 제한: 성 2음절, 이름 6음절", () => {
    expect(validateNameInput({ surname: "남궁김", given: "길동" })).toEqual({ ok: false, error: "surname_too_long" });
    expect(validateNameInput({ surname: "홍", given: "가나다라마바사" })).toEqual({ ok: false, error: "given_too_long" });
  });
});
