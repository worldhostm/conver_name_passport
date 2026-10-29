/**
 * 변환 결과 조립: 규칙 표기 1건 + 성씨 관용 표기 후보 N건.
 * UI는 이 결과를 그대로 카드로 그린다.
 */

import { findSurnameByHangul } from "@/data/surnames";
import {
  applyCase,
  composeFullName,
  romanizeGivenName,
  romanizeSurname,
  type LetterCase,
  type NameFormat,
  type NameOrder,
} from "./romanize";

export type CandidateType = "standard" | "common";

export interface NameCandidate {
  type: CandidateType;
  /** 로마자 성(소문자) */
  surname: string;
  /** 로마자 이름(소문자, 형식 적용됨) */
  given: string;
}

export interface ConvertResult {
  standard: NameCandidate;
  /** 규칙 표기와 다른 관용 표기 후보. 많이 쓰는 순서. */
  common: NameCandidate[];
  format: NameFormat;
}

export interface ConvertOptions {
  surname: string;
  given: string;
  format: NameFormat;
}

export function convertName({ surname, given, format }: ConvertOptions): ConvertResult {
  const standardSurname = romanizeSurname(surname);
  const romanGiven = romanizeGivenName(given, format);

  const entry = findSurnameByHangul(surname);
  const common: NameCandidate[] = (entry?.common ?? [])
    .map((s) => s.toLowerCase())
    .filter((s) => s !== standardSurname)
    .map((s) => ({ type: "common" as const, surname: s, given: romanGiven }));

  return {
    standard: { type: "standard", surname: standardSurname, given: romanGiven },
    common,
    format,
  };
}

/** 후보 하나를 화면·복사용 문자열로 만든다. */
export function renderCandidate(
  candidate: NameCandidate,
  order: NameOrder,
  letterCase: LetterCase,
): string {
  return applyCase(composeFullName(candidate, order), letterCase);
}
