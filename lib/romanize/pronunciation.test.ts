import { describe, expect, it } from "vitest";
import { describePronunciation } from "./pronunciation";

describe("describePronunciation — 발음과 원칙 표기 차이 안내(P2)", () => {
  it("연음: 복연은 원칙 bokyeon, 발음은 bogyeon", () => {
    expect(describePronunciation("복연")).toEqual({
      rule: "liaison",
      standard: "bokyeon",
      pronounced: "bogyeon",
      boundary: 0,
    });
  });

  it("비음화(표준 발음법 제18항): 복남은 원칙 boknam, 발음은 bongnam", () => {
    expect(describePronunciation("복남")).toMatchObject({
      rule: "nasalization",
      standard: "boknam",
      pronounced: "bongnam",
    });
  });

  it("유음화(표준 발음법 제20항): 선률은 원칙 seonryul, 발음은 seollyul", () => {
    expect(describePronunciation("선률")).toMatchObject({
      rule: "liquidization",
      standard: "seonryul",
      pronounced: "seollyul",
    });
  });

  it("받침 ㅇ + 모음은 표기가 같으므로 안내하지 않는다(영아 → yeonga)", () => {
    expect(describePronunciation("영아")).toBeNull();
  });

  it("받침 ㄹ + 모음 연음: 설아는 원칙 seola, 발음은 seora", () => {
    expect(describePronunciation("설아")).toMatchObject({ standard: "seola", pronounced: "seora" });
  });

  it("차이가 없는 이름은 null", () => {
    expect(describePronunciation("민준")).toBeNull();
    expect(describePronunciation("서연")).toBeNull();
    expect(describePronunciation("준")).toBeNull();
  });

  it("형식 옵션이 안내 문자열에도 적용된다", () => {
    expect(describePronunciation("복연", "hyphen")).toMatchObject({
      standard: "bok-yeon",
      pronounced: "bo-gyeon",
    });
  });
});
