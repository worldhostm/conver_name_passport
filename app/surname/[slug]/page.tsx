import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TrackPageView } from "@/lib/analytics/TrackPageView";
import { SURNAMES, findSurnameBySlug, type SurnameEntry } from "@/data/surnames";
import { applyCase, explainSyllable, romanizeGivenName, romanizeSurname } from "@/lib/romanize";
import { absoluteUrl } from "@/lib/site";
import { Converter } from "../../_components/Converter";
import { Faq } from "../../_components/Faq";
import { PassportNotices } from "../../_components/PassportNotices";
import { TrackedLink } from "../../_components/TrackedLink";

interface Params {
  slug: string;
}

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return SURNAMES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const entry = findSurnameBySlug(slug);
  if (!entry) return {};
  const spellings = spellingList(entry);
  const title = `${entry.hangul} 영어로 — 여권 영문 표기 ${spellings}`;
  const description = `${entry.hangul}씨 여권 영문 이름 표기: 가장 많이 쓰는 ${entry.common[0]}, 로마자 표기법 기준 ${capitalize(
    romanizeSurname(entry.hangul),
  )}. ${entry.note}`;
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(`/surname/${entry.slug}`) },
    openGraph: { title, description, url: absoluteUrl(`/surname/${entry.slug}`) },
    keywords: [`${entry.hangul} 영어로`, `${entry.hangul}씨 영문 표기`, `${entry.hangul} 여권 영문`, ...entry.common],
  };
}

const SAMPLE_GIVEN_NAMES = ["민준", "서연", "지호"];

export default async function SurnamePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const entry = findSurnameBySlug(slug);
  if (!entry) notFound();

  const standard = capitalize(romanizeSurname(entry.hangul));
  const primary = entry.common[0];
  const others = entry.common.slice(1);
  const standardIsCommon = entry.common.includes(standard);
  const index = SURNAMES.findIndex((s) => s.slug === entry.slug);
  const related = [...SURNAMES.slice(Math.max(0, index - 3), index), ...SURNAMES.slice(index + 1, index + 4)];

  const faq = [
    {
      question: `${entry.hangul}씨는 여권에 영어로 어떻게 쓰나요?`,
      answer: `가장 많이 쓰는 표기는 ${primary}입니다. 국어의 로마자 표기법대로 적으면 ${standard}이며, ${
        others.length > 0 ? `${others.join(", ")}도 쓰입니다.` : "다른 표기는 드뭅니다."
      }`,
    },
    {
      question: `${primary}와 ${standard} 중 무엇을 써야 하나요?`,
      answer: standardIsCommon
        ? `${entry.hangul}씨는 규칙 표기와 많이 쓰는 표기가 ${standard}로 같아 고민할 필요가 적습니다. 가족이 이미 다른 표기를 쓰고 있다면 그 표기에 맞추세요.`
        : `둘 다 허용됩니다. 가족 중 이미 여권이 있는 사람이 있다면 그 표기와 같게 맞추는 것이 우선이고, 처음 정한다면 해외에서 읽히는 방식과 가족 표기 통일을 함께 고려하세요.`,
    },
    {
      question: "가족과 다른 성 표기를 써도 되나요?",
      answer:
        "법적으로 막혀 있지는 않지만 해외 입국 심사·예약에서 가족 관계 증명을 요구받을 수 있어 권장하지 않습니다. 가족 간 통일을 위한 변경은 여권 로마자 성명 변경 사유로 인정됩니다.",
    },
  ];

  return (
    <>
      <TrackPageView pageType="surname" />
      <h1>
        {entry.hangul} 영어로: 여권 영문 표기 {spellingList(entry)}
      </h1>
      <p className="lead">
        {entry.hangul}씨는 여권에서 <b>{primary}</b>를 가장 많이 씁니다. 국어의 로마자 표기법대로 적으면 <b>{standard}</b>
        {standardIsCommon ? "로 같습니다." : "입니다."} {entry.note}
      </p>

      <section className="section" aria-labelledby="spellings-title">
        <h2 id="spellings-title">{entry.hangul}씨 영문 표기 비교</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>표기</th>
                <th>구분</th>
                <th>여권 형식</th>
              </tr>
            </thead>
            <tbody>
              {!standardIsCommon && (
                <tr>
                  <td>{standard}</td>
                  <td>로마자 표기법 기준</td>
                  <td>
                    <code>{standard.toUpperCase()}</code>
                  </td>
                </tr>
              )}
              {entry.common.map((c, i) => (
                <tr key={c}>
                  <td>{c}</td>
                  <td>
                    {i === 0 ? "가장 많이 쓰는 표기" : "관용 표기"}
                    {c === standard ? " · 규칙 표기와 같음" : ""}
                  </td>
                  <td>
                    <code>{c.toUpperCase()}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="rule-title">
        <h2 id="rule-title">
          규칙대로 적으면 왜 {standard}인가
        </h2>
        {[...entry.hangul].map((ch) => (
          <div key={ch}>
            <p>
              &lsquo;{ch}&rsquo;는 다음 자모로 이루어져 있고, 각 자모를 로마자 표기법 자모 대응표대로 옮기면{" "}
              <b>{capitalize(romanizeSurname(ch))}</b>가 됩니다.
            </p>
            <ul className="jamo-list">
              {explainSyllable(ch).map((p) => (
                <li key={p.role}>
                  {p.role} {p.jamo} → <b>{p.roman}</b>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p>
          <TrackedLink href="/guide/romanization">표기 규칙 전체 보기 →</TrackedLink>
        </p>
      </section>

      <section className="section" aria-labelledby="example-title">
        <h2 id="example-title">{entry.hangul}씨 이름 예시</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>한글</th>
                <th>{primary} 표기(여권 형식)</th>
                <th>일반 서류</th>
              </tr>
            </thead>
            <tbody>
              {SAMPLE_GIVEN_NAMES.map((given) => {
                const roman = romanizeGivenName(given);
                return (
                  <tr key={given}>
                    <td>
                      {entry.hangul}
                      {given}
                    </td>
                    <td>
                      <code>{`${primary} ${roman}`.toUpperCase()}</code>
                    </td>
                    <td>{applyCase(`${primary} ${roman}`, "capitalized")}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="section" aria-labelledby="convert-title">
        <h2 id="convert-title">{entry.hangul}씨 이름 바로 변환하기</h2>
        <p>성은 미리 채워 두었습니다. 이름만 입력하면 규칙 표기와 관용 표기를 함께 볼 수 있습니다.</p>
        <Converter pageType="surname" initialSurname={entry.hangul} />
      </section>

      <section className="section">
        <h2>정하기 전에 확인할 것</h2>
        <PassportNotices />
      </section>

      <Faq items={faq} />

      <section className="section" aria-labelledby="related-title">
        <h2 id="related-title">다른 성씨 보기</h2>
        <ul className="chip-grid">
          {related.map((s) => (
            <li key={s.slug}>
              <TrackedLink href={`/surname/${s.slug}`}>
                {s.hangul} {s.common[0]}
              </TrackedLink>
            </li>
          ))}
          <li>
            <TrackedLink href="/surname">전체 성씨 →</TrackedLink>
          </li>
        </ul>
      </section>
    </>
  );
}

function capitalize(s: string): string {
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function spellingList(entry: SurnameEntry): string {
  const standard = capitalize(romanizeSurname(entry.hangul));
  const all = entry.common.includes(standard) ? entry.common : [...entry.common, standard];
  return all.slice(0, 3).join(", ");
}
