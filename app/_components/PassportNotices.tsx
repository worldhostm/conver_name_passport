import { OFFICIAL_PASSPORT_URL, OFFICIAL_SOURCE_CHECKED_AT } from "@/lib/site";
import { NoticeBox } from "./NoticeBox";
import { TrackedLink } from "./TrackedLink";

/** 여권 영문 이름 관련 주의사항 모음(P1). 메인·성씨 페이지에서 공통으로 쓴다. */
export function PassportNotices() {
  return (
    <>
      <NoticeBox id="family_surname" title="가족과 성 표기를 똑같이 맞추세요">
        <p>
          부모와 자녀, 배우자 사이에 성 표기가 다르면(예: Kim과 Gim) 해외 입국 심사나 호텔·항공 예약에서 가족 관계 증명을 요구받을
          수 있습니다. 가족 중 이미 여권이 있는 사람이 있다면 그 표기를 그대로 쓰는 것이 가장 안전합니다.
        </p>
        <p>
          <TrackedLink href="/guide/family-surname">가족 성 표기 맞추기 가이드 →</TrackedLink>
        </p>
      </NoticeBox>
      <NoticeBox id="change_difficulty" title="한 번 정한 영문 이름은 바꾸기 어렵습니다">
        <p>
          여권의 로마자 성명은 발급 후 원칙적으로 변경이 제한되며, 가족 간 성 통일·명백한 오기·개명 등 정해진 사유가 있을 때만 바꿀 수
          있습니다. 항공권, 비자, 해외 학적·은행 기록이 모두 여권 표기와 같아야 하므로 처음부터 신중하게 정하세요.
        </p>
        <p>
          <TrackedLink href="/guide/name-change">변경 가능한 경우 자세히 →</TrackedLink>
        </p>
      </NoticeBox>
      <NoticeBox id="official_check" title="최종 확인은 공식 기관에서">
        <p>
          이 변환기는 규칙과 관용 표기를 비교해 보는 참고 도구입니다. 신청 전{" "}
          <a href={OFFICIAL_PASSPORT_URL} target="_blank" rel="noopener noreferrer">
            외교부 여권안내
          </a>
          의 로마자 성명 안내를 확인하세요. (안내 문구 확인 날짜: {OFFICIAL_SOURCE_CHECKED_AT})
        </p>
      </NoticeBox>
    </>
  );
}
