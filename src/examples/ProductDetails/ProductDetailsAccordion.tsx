import { Accordion, AccordionItem, TextList, TextListItem } from "primitives";

export interface ProductDetailsAccordionProps {
  sections: { title: string; items: string[] }[];
}

/** 상세 아코디언. 원본 예시의 <ul>/<li> 대신 SDS TextList/TextListItem을 쓴다. */
export function ProductDetailsAccordion({ sections }: ProductDetailsAccordionProps) {
  return (
    <Accordion>
      {sections.map((section) => (
        <AccordionItem key={section.title} id={section.title} title={section.title}>
          <TextList>
            {section.items.map((item) => (
              <TextListItem key={item}>{item}</TextListItem>
            ))}
          </TextList>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
