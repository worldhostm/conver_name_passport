"use client";

import { useMemo, useState, type FormEvent } from "react";
import { track, trackNameInputStartOnce, type PageType } from "@/lib/analytics/events";
import { findSurnameByHangul } from "@/data/surnames";
import {
  convertName,
  describePronunciation,
  validateNameInput,
  type NameFormat,
  type NameInput,
  type NameOrder,
  type NameValidationError,
} from "@/lib/romanize";
import { OptionsBar } from "./OptionsBar";
import { ResultCard } from "./ResultCard";
import { PronunciationNote } from "./PronunciationNote";
import { ShareButton } from "./ShareButton";

const ERROR_MESSAGE: Record<NameValidationError, string> = {
  surname_empty: "성을 입력해 주세요.",
  surname_not_hangul: "성은 한글로만 입력해 주세요.",
  surname_too_long: "성은 두 글자까지 입력할 수 있어요.",
  given_empty: "이름을 입력해 주세요.",
  given_not_hangul: "이름은 한글로만 입력해 주세요.",
  given_too_long: "이름은 여섯 글자까지 입력할 수 있어요.",
};

interface Props {
  pageType: PageType;
  /** 성씨 페이지에서 미리 채워 넣는 성 */
  initialSurname?: string;
}

export function Converter({ pageType, initialSurname = "" }: Props) {
  const [surname, setSurname] = useState(initialSurname);
  const [given, setGiven] = useState("");
  const [format, setFormat] = useState<NameFormat>("joined");
  const [order, setOrder] = useState<NameOrder>("surname-first");
  const [submitted, setSubmitted] = useState<NameInput | null>(null);
  const [error, setError] = useState<NameValidationError | null>(null);

  // 옵션이 바뀌면 같은 입력으로 결과만 다시 계산한다.
  const result = useMemo(
    () => (submitted ? convertName({ ...submitted, format }) : null),
    [submitted, format],
  );
  const pronunciation = useMemo(
    () => (submitted ? describePronunciation(submitted.given, format) : null),
    [submitted, format],
  );
  const surnameEntry = submitted ? findSurnameByHangul(submitted.surname) : undefined;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const validation = validateNameInput({ surname, given });
    if (!validation.ok) {
      setError(validation.error);
      setSubmitted(null);
      return;
    }
    setError(null);
    setSubmitted(validation.value);
    const converted = convertName({ ...validation.value, format });
    track("convert_submit", {
      page_type: pageType,
      name_format: format,
      surname_len: validation.value.surname.length,
      given_len: validation.value.given.length,
    });
    track("result_view", { candidate_count: converted.common.length });
  }

  return (
    <section className="converter" aria-labelledby="converter-title">
      <h2 id="converter-title" className="visually-hidden">
        이름 변환
      </h2>
      <form onSubmit={onSubmit} className="converter-form" noValidate>
        <div className="inputs">
          <label className="field field-surname">
            <span>성</span>
            <input
              type="text"
              inputMode="text"
              lang="ko"
              autoComplete="off"
              placeholder="홍"
              value={surname}
              maxLength={4}
              onChange={(e) => {
                setSurname(e.target.value);
                trackNameInputStartOnce(pageType);
              }}
            />
          </label>
          <label className="field field-given">
            <span>이름</span>
            <input
              type="text"
              inputMode="text"
              lang="ko"
              autoComplete="off"
              placeholder="길동"
              value={given}
              maxLength={8}
              onChange={(e) => {
                setGiven(e.target.value);
                trackNameInputStartOnce(pageType);
              }}
            />
          </label>
          <button type="submit" className="btn btn-primary">
            변환
          </button>
        </div>
        <p className="privacy-hint">입력한 이름은 서버로 전송하거나 저장하지 않습니다. 변환은 이 브라우저 안에서만 처리됩니다.</p>
        {error && (
          <p className="error" role="alert">
            {ERROR_MESSAGE[error]}
          </p>
        )}
      </form>

      <OptionsBar format={format} order={order} onFormatChange={setFormat} onOrderChange={setOrder} />

      {result && submitted && (
        <div className="results" aria-live="polite">
          {/* 카드 순서는 실험 대상(관용 표기를 먼저 보여주기). 바꾸면 copy_rank 해석도 함께 바뀐다. */}
          <ResultCard
            candidate={result.standard}
            rank={0}
            order={order}
            format={format}
            title="국어의 로마자 표기법 기준"
            description={
              result.common.length > 0
                ? "규칙대로 적은 표기입니다. 성은 아래 관용 표기와 비교해 보세요."
                : "규칙 표기와 많이 쓰는 표기가 같습니다."
            }
          />
          {result.common.map((candidate, i) => (
            <ResultCard
              key={candidate.surname}
              candidate={candidate}
              rank={i + 1}
              order={order}
              format={format}
              title={i === 0 ? "가장 많이 쓰는 성 표기" : "그 다음으로 많이 쓰는 성 표기"}
              description={i === 0 && surnameEntry ? surnameEntry.note : undefined}
            />
          ))}
          {pronunciation && <PronunciationNote note={pronunciation} />}
          <div className="results-actions">
            <ShareButton />
          </div>
        </div>
      )}
    </section>
  );
}
