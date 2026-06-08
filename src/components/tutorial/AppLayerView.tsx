import type { AppLayerContentItem, AppLayerTopic } from "@/types/tutorial";
import { CodeBlock } from "./CodeBlock";

function ContentItem({ item }: { item: AppLayerContentItem }) {
  switch (item.type) {
    case "p":
      return <p>{item.text}</p>;

    case "h4":
      return <h4 className="alSubheading">{item.text}</h4>;

    case "ul":
      return (
        <ul className="alList">
          {item.items.map((text, i) => (
            <li key={i}>{text}</li>
          ))}
        </ul>
      );

    case "grid":
      return (
        <div className="alGrid">
          {item.cards.map((card) => (
            <div className="alCard" key={card.title}>
              <strong>{card.title}</strong>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      );

    case "compare":
      return (
        <div className="alCompare">
          {item.cols.map((col) => (
            <div className="alCompareCol" key={col.heading}>
              <strong>{col.heading}</strong>
              <ul>
                {col.points.map((pt, i) => (
                  <li key={i}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      );

    case "callout":
      return (
        <div className="alCallout">
          <span className="eyebrow">{item.label}</span>
          <p>{item.text}</p>
        </div>
      );

    case "code":
      return (
        <div className="alCodeBlock">
          <span className="alCodeLabel">{item.lang}</span>
          <CodeBlock code={item.text} />
        </div>
      );

    case "diagram":
      return (
        <div className="alDiagram">
          {item.caption && (
            <span className="alDiagramCaption">{item.caption}</span>
          )}
          <pre className="alDiagramPre">{item.text}</pre>
        </div>
      );

    case "tags":
      return (
        <div className="alTagRow">
          {item.items.map((tag) => (
            <span className="alTag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      );

    case "divider":
      return <div className="alDivider">{item.text}</div>;

    default:
      return null;
  }
}

type AppLayerViewProps = {
  topic: AppLayerTopic;
};

export function AppLayerView({ topic }: AppLayerViewProps) {
  return (
    <div>
      <div className="alHero">
        <span className="eyebrow">Application Layer</span>
        <h1>{topic.title}</h1>
        <p>{topic.overview}</p>
      </div>

      {topic.sections.map((section) => (
        <section className="alSection" key={section.heading}>
          <h2>{section.heading}</h2>
          {section.content.map((item, i) => (
            <ContentItem item={item} key={i} />
          ))}
        </section>
      ))}
    </div>
  );
}
