import type { TutorialTopic } from "@/types/tutorial";

type TopicHeaderProps = {
  topic: TutorialTopic;
};

export function TopicHeader({ topic }: TopicHeaderProps) {
  return (
    <section className="topicHeader">
      <div>
        <span className="eyebrow">{topic.category}</span>
        <h1>{topic.title}</h1>
        <p>{topic.summary}</p>
      </div>

      <div className="summaryGrid">
        <div>
          <strong>Best For</strong>
          <span>{topic.bestFor}</span>
        </div>
        <div>
          <strong>Internal Shape</strong>
          <span>{topic.internalShape}</span>
        </div>
        <div>
          <strong>Avoid When</strong>
          <span>{topic.avoidWhen}</span>
        </div>
      </div>
    </section>
  );
}
