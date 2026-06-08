import type { AlgorithmTopic, LanguageId, LanguageOption } from "@/types/tutorial";
import { CodeBlock } from "./CodeBlock";
import { ComplexityGrid } from "./ComplexityGrid";
import { LanguageTabs } from "./LanguageTabs";

type AlgorithmViewProps = {
  languages: LanguageOption[];
  onSelectLanguage: (language: LanguageId) => void;
  selectedLanguage: LanguageId;
  topic: AlgorithmTopic;
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="alList">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

function FlowDiagram({ steps }: { steps: string[] }) {
  return (
    <div className="algorithmFlow" aria-label="Execution flow diagram">
      {steps.map((step, index) => (
        <div className="algorithmFlowItem" key={`${step}-${index}`}>
          <span>{step}</span>
          {index < steps.length - 1 ? <strong>→</strong> : null}
        </div>
      ))}
    </div>
  );
}

export function AlgorithmView({
  languages,
  onSelectLanguage,
  selectedLanguage,
  topic,
}: AlgorithmViewProps) {
  const example = topic.languages[selectedLanguage];
  const selectedLabel =
    languages.find((language) => language.id === selectedLanguage)?.label ?? "Java";

  return (
    <>
      <LanguageTabs
        languages={languages}
        onSelectLanguage={onSelectLanguage}
        selectedLanguage={selectedLanguage}
      />

      <section className="topicHeader algorithmHeader">
        <div>
          <span className="eyebrow">Algorithms / {topic.family}</span>
          <h1>{topic.title}</h1>
          <p>{topic.summary}</p>
        </div>

        <div className="summaryGrid">
          <div>
            <strong>Problem Solved</strong>
            <span>{topic.problem}</span>
          </div>
          <div>
            <strong>Why It Exists</strong>
            <span>{topic.whyExists}</span>
          </div>
          <div>
            <strong>Production Relevance</strong>
            <span>{topic.productionUse}</span>
          </div>
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Prerequisites</span>
          <h2>Concepts You Need First</h2>
        </div>
        <h3>Historical Motivation</h3>
        <p>{topic.history}</p>
        <div className="signalList">
          {topic.prerequisites.map((prerequisite) => (
            <span key={prerequisite}>{prerequisite}</span>
          ))}
        </div>
        <h3>Underlying Data Structures</h3>
        <div className="signalList">
          {topic.dataStructures.map((structure) => (
            <span key={structure}>{structure}</span>
          ))}
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Approach</span>
          <h2>Naive vs Optimized</h2>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Naive Approach</strong>
            <p>{topic.naiveApproach}</p>
          </div>
          <div className="alCompareCol">
            <strong>Optimized Approach</strong>
            <p>{topic.optimizedApproach}</p>
          </div>
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Mechanics</span>
          <h2>Internal Execution</h2>
        </div>
        <BulletList items={topic.mechanics} />
        <div className="practiceGuide">
          <h3>Walkthrough</h3>
          <ol>
            {topic.walkthrough.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
        <div className="practiceGuide">
          <h3>Execution Flow Visualization</h3>
          <FlowDiagram steps={topic.visualization} />
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Cost model</span>
          <h2>Time, Space, and Memory</h2>
        </div>
        <ComplexityGrid items={topic.complexity} />
        <p className="whyText">{topic.memoryBehavior}</p>
        <p className="whyText">{topic.scalability}</p>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Implementation</span>
          <h2>Code Examples</h2>
        </div>
        <div className="alCodeBlock">
          <span className="alCodeLabel">{selectedLabel} implementation</span>
          <CodeBlock code={example.naiveCode} />
        </div>
        <div className="alCodeBlock">
          <span className="alCodeLabel">Optimized {selectedLabel} implementation</span>
          <CodeBlock code={example.optimizedCode} />
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Engineering judgment</span>
          <h2>Tradeoffs, Edge Cases, and Interviews</h2>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Tradeoffs</strong>
            <BulletList items={topic.tradeoffs} />
          </div>
          <div className="alCompareCol">
            <strong>Edge Cases</strong>
            <BulletList items={topic.edgeCases} />
          </div>
          <div className="alCompareCol">
            <strong>Interviewer Expectations</strong>
            <BulletList items={topic.interviewerExpectations} />
          </div>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Beginner Mistakes</strong>
            <BulletList items={topic.beginnerMistakes} />
          </div>
          <div className="alCompareCol">
            <strong>Variants and Improvements</strong>
            <BulletList items={topic.variants} />
          </div>
          <div className="alCompareCol">
            <strong>Common Interview Questions</strong>
            <BulletList items={topic.interviewQuestions} />
          </div>
        </div>
        <div className="alCallout">
          <span className="eyebrow">What Interviewers Are Testing</span>
          <p>{topic.interviewerFocus}</p>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Engineering Thinking</strong>
            <p>{topic.engineeringThinking}</p>
          </div>
          <div className="alCompareCol">
            <strong>What Juniors Miss</strong>
            <p>{topic.juniorMisses}</p>
          </div>
          <div className="alCompareCol">
            <strong>What Seniors Optimize For</strong>
            <p>{topic.seniorOptimizesFor}</p>
          </div>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Pairs Best With</strong>
            <BulletList items={topic.pairsBestWith} />
          </div>
          <div className="alCompareCol">
            <strong>When NOT To Use It</strong>
            <p>{topic.whenNotToUse}</p>
          </div>
        </div>
      </section>

      <section className="lessonSection">
        <div className="sectionTitle">
          <span className="eyebrow">Systems thinking</span>
          <h2>Modern Software Relevance</h2>
        </div>
        <div className="alCompare">
          <div className="alCompareCol">
            <strong>Database / Search / Distributed Relevance</strong>
            <p>{topic.databaseRelevance}</p>
          </div>
          <div className="alCompareCol">
            <strong>FAANG-Scale Use</strong>
            <p>{topic.faangScaleUse}</p>
          </div>
        </div>
        <div className="alCallout">
          <span className="eyebrow">Layer Connections</span>
          <BulletList items={topic.systemsConnections} />
        </div>
        {topic.distributedImplications ? (
          <div className="alCallout">
            <span className="eyebrow">Distributed Systems Link</span>
            <p>{topic.distributedImplications}</p>
          </div>
        ) : null}
      </section>
    </>
  );
}
