import { T } from "@/lib/i18n/T";
import type { FaqItem } from "@/data/homeFaq";

export function FaqAccordion({ id, items, maxWidth }: { id: string; items: FaqItem[]; maxWidth?: number }) {
  return (
    <div className="accordion" id={id} style={maxWidth ? { maxWidth, margin: "0 auto" } : undefined}>
      {items.map((item, index) => {
        const collapseId = `${id}-${item.id}`;
        return (
          <div className="accordion-item" key={item.id}>
            <h3 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#${collapseId}`}
                aria-expanded="false"
                aria-controls={collapseId}
              >
                <T k={item.questionKey}>{item.question}</T>
              </button>
            </h3>
            <div id={collapseId} className="accordion-collapse collapse" data-bs-parent={`#${id}`}>
              <div className="accordion-body">
                <T k={item.answerKey}>{item.answer}</T>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
