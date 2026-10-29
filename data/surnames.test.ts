import { describe, expect, it } from "vitest";
import { SURNAMES, findSurnameByHangul, findSurnameBySlug } from "./surnames";
import { isHangulOnly, romanizeSurname } from "@/lib/romanize";

describe("data/surnames.ts 무결성", () => {
  it("slug는 서로 겹치지 않고 소문자 영문만 쓴다", () => {
    const slugs = SURNAMES.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) expect(slug).toMatch(/^[a-z]+$/);
  });

  it("한글 성은 서로 겹치지 않고 1~2음절 완성형 한글이다", () => {
    const hanguls = SURNAMES.map((s) => s.hangul);
    expect(new Set(hanguls).size).toBe(hanguls.length);
    for (const h of hanguls) {
      expect(isHangulOnly(h)).toBe(true);
      expect(h.length).toBeLessThanOrEqual(2);
    }
  });

  it("관용 표기는 1개 이상이며 첫 글자만 대문자인 영문이다", () => {
    for (const s of SURNAMES) {
      expect(s.common.length).toBeGreaterThan(0);
      for (const c of s.common) expect(c).toMatch(/^[A-Z][a-z]*$/);
      expect(new Set(s.common).size).toBe(s.common.length);
    }
  });

  it("모든 항목에 고유 설명이 있다", () => {
    for (const s of SURNAMES) expect(s.note.length).toBeGreaterThan(10);
  });

  it("규칙 표기가 변환 모듈 결과와 일치하도록 유도된다(파생값 저장 안 함)", () => {
    const kim = findSurnameByHangul("김")!;
    expect(romanizeSurname(kim.hangul)).toBe("gim");
    expect(kim.common[0]).toBe("Kim");
  });

  it("조회 함수", () => {
    expect(findSurnameBySlug("park")?.hangul).toBe("박");
    expect(findSurnameByHangul("없")).toBeUndefined();
  });

  it("성씨 페이지는 100개 이상으로 시작한다", () => {
    expect(SURNAMES.length).toBeGreaterThanOrEqual(100);
  });
});
