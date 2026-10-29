"use client";

import { track } from "@/lib/analytics/events";
import type { NameFormat, NameOrder } from "@/lib/romanize";

const FORMAT_OPTIONS: { value: NameFormat; label: string; example: string }[] = [
  { value: "joined", label: "붙여쓰기", example: "GILDONG" },
  { value: "hyphen", label: "하이픈", example: "GIL-DONG" },
  { value: "spaced", label: "띄어쓰기", example: "GIL DONG" },
];

const ORDER_OPTIONS: { value: NameOrder; label: string; example: string }[] = [
  { value: "surname-first", label: "성 이름", example: "HONG GILDONG" },
  { value: "given-first", label: "이름 성", example: "GILDONG HONG" },
];

interface Props {
  format: NameFormat;
  order: NameOrder;
  onFormatChange: (value: NameFormat) => void;
  onOrderChange: (value: NameOrder) => void;
}

export function OptionsBar({ format, order, onFormatChange, onOrderChange }: Props) {
  return (
    <div className="options">
      <fieldset className="segmented">
        <legend>이름 형식</legend>
        {FORMAT_OPTIONS.map((opt) => (
          <label key={opt.value} className={opt.value === format ? "is-active" : ""}>
            <input
              type="radio"
              name="name_format"
              value={opt.value}
              checked={opt.value === format}
              onChange={() => {
                onFormatChange(opt.value);
                track("option_change", { option_name: "name_format", option_value: opt.value });
              }}
            />
            <span>{opt.label}</span>
            <small>{opt.example}</small>
          </label>
        ))}
      </fieldset>

      <fieldset className="segmented">
        <legend>표기 순서</legend>
        {ORDER_OPTIONS.map((opt) => (
          <label key={opt.value} className={opt.value === order ? "is-active" : ""}>
            <input
              type="radio"
              name="name_order"
              value={opt.value}
              checked={opt.value === order}
              onChange={() => {
                onOrderChange(opt.value);
                track("option_change", { option_name: "name_order", option_value: opt.value });
              }}
            />
            <span>{opt.label}</span>
            <small>{opt.example}</small>
          </label>
        ))}
      </fieldset>
    </div>
  );
}
