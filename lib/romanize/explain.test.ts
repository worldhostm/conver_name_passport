import { describe, expect, it } from "vitest";
import { explainSyllable } from "./explain";

describe("explainSyllable", () => {
  it("박 → ㅂ b / ㅏ a / ㄱ k", () => {
    expect(explainSyllable("박")).toEqual([
      { role: "초성", jamo: "ㅂ", roman: "b" },
      { role: "중성", jamo: "ㅏ", roman: "a" },
      { role: "종성", jamo: "ㄱ", roman: "k" },
    ]);
  });

  it("이 → 초성 ㅇ은 소리 없음, 받침 없음", () => {
    expect(explainSyllable("이")).toEqual([
      { role: "초성", jamo: "ㅇ", roman: "(소리 없음)" },
      { role: "중성", jamo: "ㅣ", roman: "i" },
    ]);
  });

  it("한글 음절이 아니면 빈 배열", () => {
    expect(explainSyllable("A")).toEqual([]);
  });
});
