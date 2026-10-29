import { describe, expect, it } from "vitest";
import { convertName, renderCandidate } from "./convert";

describe("convertName", () => {
  it("규칙 표기와 관용 표기 후보를 함께 돌려준다(김 → Gim + Kim)", () => {
    const result = convertName({ surname: "김", given: "민준", format: "joined" });
    expect(result.standard).toEqual({ type: "standard", surname: "gim", given: "minjun" });
    expect(result.common.map((c) => c.surname)).toEqual(["kim"]);
  });

  it("관용 표기 중 규칙 표기와 같은 것은 후보에서 제외한다(한 → Han만)", () => {
    const result = convertName({ surname: "한", given: "복남", format: "joined" });
    expect(result.standard.surname).toBe("han");
    expect(result.common.map((c) => c.surname)).toEqual(["hahn"]);
  });

  it("관용 후보는 많이 쓰는 순서를 유지한다(이 → Lee, Yi, Rhee, Li)", () => {
    const result = convertName({ surname: "이", given: "서연", format: "joined" });
    expect(result.standard.surname).toBe("i");
    expect(result.common.map((c) => c.surname)).toEqual(["lee", "yi", "rhee", "li"]);
  });

  it("테이블에 없는 성은 규칙 표기만 돌려준다", () => {
    const result = convertName({ surname: "묵", given: "길동", format: "joined" });
    expect(result.standard.surname).toBe("muk");
    expect(result.common).toEqual([]);
  });

  it("이름 형식 옵션이 모든 후보에 적용된다", () => {
    const result = convertName({ surname: "박", given: "지민", format: "hyphen" });
    expect(result.standard.given).toBe("ji-min");
    expect(result.common.every((c) => c.given === "ji-min")).toBe(true);
  });
});

describe("renderCandidate", () => {
  const candidate = { type: "common" as const, surname: "park", given: "ji-min" };

  it("여권 형식(대문자, 성 먼저)", () => {
    expect(renderCandidate(candidate, "surname-first", "upper")).toBe("PARK JI-MIN");
  });

  it("일반 서류 형식(첫 글자 대문자, 이름 먼저)", () => {
    expect(renderCandidate(candidate, "given-first", "capitalized")).toBe("Ji-min Park");
  });
});
