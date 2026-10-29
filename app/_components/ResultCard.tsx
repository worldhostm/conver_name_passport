"use client";

import { useState } from "react";
import { track } from "@/lib/analytics/events";
import { renderCandidate, type NameCandidate, type NameFormat, type NameOrder } from "@/lib/romanize";
import { copyText } from "./copyText";

interface Props {
  candidate: NameCandidate;
  /** 결과 목록에서의 순서(0부터). copy_rank로 전송. */
  rank: number;
  order: NameOrder;
  format: NameFormat;
  title: string;
  description?: string;
}

export function ResultCard({ candidate, rank, order, format, title, description }: Props) {
  const passport = renderCandidate(candidate, order, "upper");
  const document = renderCandidate(candidate, order, "capitalized");

  return (
    <article className={`card card-${candidate.type}`}>
      <header className="card-head">
        <span className="badge">{candidate.type === "standard" ? "규칙 표기" : "관용 표기"}</span>
        <h3>{title}</h3>
        {description && <p className="card-desc">{description}</p>}
      </header>
      <CopyRow label="여권 형식" value={passport} candidate={candidate} rank={rank} order={order} format={format} />
      <CopyRow label="일반 서류" value={document} candidate={candidate} rank={rank} order={order} format={format} />
    </article>
  );
}

interface RowProps {
  label: string;
  value: string;
  candidate: NameCandidate;
  rank: number;
  order: NameOrder;
  format: NameFormat;
}

function CopyRow({ label, value, candidate, rank, order, format }: RowProps) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function onCopy() {
    const ok = await copyText(value);
    setStatus(ok ? "copied" : "failed");
    track("copy_result", {
      candidate_type: candidate.type,
      name_order: order,
      name_format: format,
      copy_rank: rank,
    });
    window.setTimeout(() => setStatus("idle"), 1500);
  }

  return (
    <div className="copy-row">
      <div className="copy-text">
        <small>{label}</small>
        <output>{value}</output>
      </div>
      <button type="button" className="btn btn-copy" onClick={onCopy} aria-label={`${label} ${value} 복사`}>
        {status === "copied" ? "복사됨" : status === "failed" ? "실패" : "복사"}
      </button>
    </div>
  );
}
