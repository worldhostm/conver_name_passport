import { JsonLd, faqJsonLd, type FaqItem } from "./JsonLd";

/** FAQ 목록 + JSON-LD를 함께 출력한다. */
export function Faq({ items, title = "자주 묻는 질문" }: { items: FaqItem[]; title?: string }) {
  return (
    <section className="section" aria-labelledby="faq-title">
      <h2 id="faq-title">{title}</h2>
      <dl className="faq">
        {items.map((item) => (
          <div key={item.question} className="faq-item">
            <dt>{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
      <JsonLd data={faqJsonLd(items)} />
    </section>
  );
}
