import { applyCase, type PronunciationNote as Note } from "@/lib/romanize";

const RULE_LABEL: Record<Note["rule"], string> = {
  liaison: "받침이 다음 모음으로 이어지는 연음",
  nasalization: "받침이 ㄴ·ㅁ 앞에서 바뀌는 비음화",
  liquidization: "ㄴ·ㄹ이 만나 [ㄹㄹ]로 나는 유음화",
};

/** 발음과 원칙 표기가 다를 때 보여주는 안내(P2). */
export function PronunciationNote({ note }: { note: Note }) {
  return (
    <aside className="pron-note" role="note">
      <strong>발음과 표기가 다른 이름입니다.</strong>{" "}
      실제 발음대로 적으면 <b>{applyCase(note.pronounced, "capitalized")}</b>에 가깝지만, 여권 표기 원칙은
      이름의 음운 변화를 반영하지 않으므로 <b>{applyCase(note.standard, "capitalized")}</b>로 적습니다({RULE_LABEL[note.rule]}).
      발음을 살린 표기를 원하면 여권 신청 때 직접 그 표기를 적을 수 있지만, 가족과 통일되는지 먼저 확인하세요.
    </aside>
  );
}
