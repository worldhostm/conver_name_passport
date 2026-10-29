import { GUIDES } from "@/app/guide/_data";
import { TrackedLink } from "./TrackedLink";

/** 현재 가이드를 제외한 나머지 가이드 링크. 가이드 간 내부 링크 강화용. */
export function RelatedGuides({ current }: { current: string }) {
  const others = GUIDES.filter((g) => g.slug !== current);
  return (
    <section className="section" aria-labelledby="related-guides-title">
      <h2 id="related-guides-title">함께 보면 좋은 가이드</h2>
      <ul className="link-list">
        {others.map((g) => (
          <li key={g.slug}>
            <TrackedLink href={`/guide/${g.slug}`}>{g.title}</TrackedLink>
            <br />
            <small>{g.summary}</small>
          </li>
        ))}
        <li>
          <TrackedLink href="/">변환기로 돌아가기</TrackedLink>
        </li>
      </ul>
    </section>
  );
}
