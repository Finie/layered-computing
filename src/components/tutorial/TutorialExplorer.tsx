"use client";

import { useMemo, useState } from "react";
import { algorithmTopics } from "@/data/algorithm-content";
import { appLayerTopics } from "@/data/app-layer-content";
import { languages, learningNotes, topics } from "@/data/tutorial-content";
import type { AlgorithmFamily, LanguageId, TutorialTopic } from "@/types/tutorial";
import { AlgorithmView } from "./AlgorithmView";
import { AppLayerView } from "./AppLayerView";
import { CodeBlock } from "./CodeBlock";
import { ComplexityGrid } from "./ComplexityGrid";
import { LanguageTabs } from "./LanguageTabs";
import { TopicHeader } from "./TopicHeader";
import { TopicNav } from "./TopicNav";

function getPracticeTitle(example: string | { title: string }) {
  return typeof example === "string" ? example : example.title;
}

type OrderedTopic = {
  id: string;
  layer: string;
  title: string;
};

const topicCategoryOrder: TutorialTopic["category"][] = [
  "Foundations",
  "Core",
  "Sets",
  "Maps",
  "Trees",
  "Heaps",
  "Graphs",
  "Advanced",
];

const algorithmFamilyOrder: AlgorithmFamily[] = [
  "Foundations",
  "Sorting",
  "Searching",
  "Recursion",
  "Dynamic Programming",
  "Traversal",
  "Graphs",
  "Concurrency",
  "Compression",
  "Security",
  "Databases",
  "AI & ML",
  "Distributed",
];

export function TutorialExplorer() {
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageId>("java");
  const [selectedTopicId, setSelectedTopicId] = useState(topics[0].id);

  const orderedTopics = useMemo<OrderedTopic[]>(() => {
    const foundationalTopics = topicCategoryOrder.flatMap((category) =>
      topics
        .filter((topic) => topic.category === category)
        .map((topic) => ({
          id: topic.id,
          layer: `Foundational Computing / ${category}`,
          title: topic.title,
        })),
    );

    const orderedAlgorithmTopics = algorithmFamilyOrder.flatMap((family) =>
      algorithmTopics
        .filter((topic) => topic.family === family)
        .map((topic) => ({
          id: topic.id,
          layer: `Algorithms / ${family}`,
          title: topic.title,
        })),
    );

    const applicationTopics = appLayerTopics.map((topic) => ({
      id: topic.id,
      layer: "Application Layer",
      title: topic.title,
    }));

    return [...foundationalTopics, ...orderedAlgorithmTopics, ...applicationTopics];
  }, []);

  const selectedDsTopic = useMemo(
    () => topics.find((t) => t.id === selectedTopicId),
    [selectedTopicId],
  );

  const selectedAlTopic = useMemo(
    () => appLayerTopics.find((t) => t.id === selectedTopicId),
    [selectedTopicId],
  );

  const selectedAlgorithmTopic = useMemo(
    () => algorithmTopics.find((t) => t.id === selectedTopicId),
    [selectedTopicId],
  );

  const selectedNotes = selectedDsTopic ? learningNotes[selectedDsTopic.id] : null;
  const isAppLayer = !!selectedAlTopic;
  const isAlgorithmLayer = !!selectedAlgorithmTopic;
  const selectedIndex = orderedTopics.findIndex((topic) => topic.id === selectedTopicId);
  const previousTopic = selectedIndex > 0 ? orderedTopics[selectedIndex - 1] : null;
  const nextTopic =
    selectedIndex >= 0 && selectedIndex < orderedTopics.length - 1
      ? orderedTopics[selectedIndex + 1]
      : null;

  function selectTopic(topicId: string) {
    setSelectedTopicId(topicId);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="tutorialShell">
      <TopicNav
        algorithmTopics={algorithmTopics}
        appLayerTopics={appLayerTopics}
        onSelectTopic={selectTopic}
        selectedTopicId={selectedTopicId}
        topics={topics}
      />

      <main className="lessonPanel">
        {isAppLayer ? (
          <AppLayerView topic={selectedAlTopic} />
        ) : isAlgorithmLayer ? (
          <AlgorithmView
            languages={languages}
            onSelectLanguage={setSelectedLanguage}
            selectedLanguage={selectedLanguage}
            topic={selectedAlgorithmTopic}
          />
        ) : selectedDsTopic ? (
          <>
            <LanguageTabs
              languages={languages}
              onSelectLanguage={setSelectedLanguage}
              selectedLanguage={selectedLanguage}
            />

            <TopicHeader topic={selectedDsTopic} />

            <section className="lessonSection">
              <div className="sectionTitle">
                <span className="eyebrow">Cost model</span>
                <h2>Operations and Complexity</h2>
              </div>
              <ComplexityGrid items={selectedDsTopic.complexity} />
            </section>

            <section className="lessonSection">
              <div className="sectionTitle">
                <span className="eyebrow">Internals</span>
                <h2>How It Works Internally</h2>
              </div>
              <p>{selectedDsTopic.languages[selectedLanguage].internals}</p>
              <CodeBlock code={selectedDsTopic.languages[selectedLanguage].internalCode} />
            </section>

            <section className="lessonSection">
              <div className="sectionTitle">
                <span className="eyebrow">Practice</span>
                <h2>Interview-Style Problem</h2>
              </div>
              <p>{selectedDsTopic.languages[selectedLanguage].problem}</p>
              {selectedNotes ? (
                <div className="practiceGuide">
                  <h3>How to think about it</h3>
                  <p>{selectedNotes.practice.setup}</p>
                  <ol>
                    {selectedNotes.practice.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                </div>
              ) : null}
              <CodeBlock code={selectedDsTopic.languages[selectedLanguage].solutionCode} />
              <p className="whyText">{selectedDsTopic.languages[selectedLanguage].whyItFits}</p>
              {selectedNotes ? (
                <div className="exampleList">
                  <h3>Practice the same idea with</h3>
                  <div className="practiceExampleGrid">
                    {selectedNotes.practice.extraExamples.map((example) => (
                      <article key={getPracticeTitle(example)}>
                        <span>{getPracticeTitle(example)}</span>
                        <CodeBlock
                          code={
                            typeof example !== "string" &&
                            example.code?.[selectedLanguage]
                              ? example.code[selectedLanguage]
                              : selectedDsTopic.languages[selectedLanguage].solutionCode
                          }
                        />
                      </article>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>

            <section className="lessonSection">
              <div className="sectionTitle">
                <span className="eyebrow">Recognition</span>
                <h2>Signals That Point Here</h2>
              </div>
              {selectedNotes ? (
                <div className="recognitionGrid">
                  {selectedNotes.recognition.map((note) => (
                    <article key={note.signal}>
                      <h3>{note.signal}</h3>
                      <p>{note.meaning}</p>
                      <span>{note.example}</span>
                      <CodeBlock
                        code={
                          note.code?.[selectedLanguage] ??
                          selectedDsTopic.languages[selectedLanguage].solutionCode
                        }
                      />
                    </article>
                  ))}
                </div>
              ) : (
                <div className="signalList">
                  {selectedDsTopic.interviewSignals.map((signal) => (
                    <span key={signal}>{signal}</span>
                  ))}
                </div>
              )}
            </section>
          </>
        ) : null}

        {selectedIndex >= 0 ? (
          <nav className="lessonPager" aria-label="Previous and next topics">
            <button
              className="pagerButton"
              disabled={!previousTopic}
              onClick={() => previousTopic && selectTopic(previousTopic.id)}
              type="button"
            >
              <span className="pagerDirection">Previous</span>
              <strong>{previousTopic?.title ?? "Start of tutorial"}</strong>
              <small>{previousTopic?.layer ?? "No previous topic"}</small>
            </button>

            <button
              className="pagerButton next"
              disabled={!nextTopic}
              onClick={() => nextTopic && selectTopic(nextTopic.id)}
              type="button"
            >
              <span className="pagerDirection">Next</span>
              <strong>{nextTopic?.title ?? "End of tutorial"}</strong>
              <small>{nextTopic?.layer ?? "No next topic"}</small>
            </button>
          </nav>
        ) : null}
      </main>
    </div>
  );
}
