"use client";

import { useState } from "react";
import type {
  AlgorithmFamily,
  AlgorithmTopic,
  AppLayerTopic,
  TutorialTopic,
} from "@/types/tutorial";

type TopicNavProps = {
  algorithmTopics: AlgorithmTopic[];
  topics: TutorialTopic[];
  appLayerTopics: AppLayerTopic[];
  selectedTopicId: string;
  onSelectTopic: (topicId: string) => void;
};

export function TopicNav({
  algorithmTopics,
  topics,
  appLayerTopics,
  selectedTopicId,
  onSelectTopic,
}: TopicNavProps) {
  const [foundationalOpen, setFoundationalOpen] = useState(true);
  const [algorithmOpen, setAlgorithmOpen] = useState(true);
  const [applicationOpen, setApplicationOpen] = useState(true);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const categoryOrder: TutorialTopic["category"][] = [
    "Foundations",
    "Core",
    "Sets",
    "Maps",
    "Trees",
    "Heaps",
    "Graphs",
    "Advanced",
  ];

  const categories = categoryOrder.filter((category) =>
    topics.some((topic) => topic.category === category),
  );

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

  const algorithmFamilies = algorithmFamilyOrder.filter((family) =>
    algorithmTopics.some((topic) => topic.family === family),
  );

  function selectTopic(topicId: string) {
    onSelectTopic(topicId);
    setMobileNavOpen(false);
  }

  return (
    <>
      <button
        aria-controls="topic-nav"
        aria-expanded={mobileNavOpen}
        className="mobileNavToggle"
        onClick={() => setMobileNavOpen(true)}
        type="button"
      >
        <span aria-hidden="true">☰</span>
        Topics
      </button>

      {mobileNavOpen ? (
        <button
          aria-label="Close topic navigation"
          className="mobileNavBackdrop"
          onClick={() => setMobileNavOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={`topicNav ${mobileNavOpen ? "open" : ""}`}
        id="topic-nav"
        aria-label="Topics"
      >
        <div className="mobileNavTop">
          <strong>Topics</strong>
          <button
            aria-label="Close topic navigation"
            onClick={() => setMobileNavOpen(false)}
            type="button"
          >
            ×
          </button>
        </div>

        {/* ── Foundational Computing ─────────────────── */}
        <button
          className="layerHeader"
          onClick={() => setFoundationalOpen((o) => !o)}
          type="button"
        >
          Foundational Computing
          <span className={`layerArrow ${foundationalOpen ? "" : "collapsed"}`}>▾</span>
        </button>

        {foundationalOpen && (
          <div>
            {categories.map((category) => (
              <div className="navGroup" key={category}>
                <p>{category}</p>
                {topics
                  .filter((topic) => topic.category === category)
                  .map((topic) => (
                    <button
                      className={topic.id === selectedTopicId ? "active" : ""}
                      key={topic.id}
                      onClick={() => selectTopic(topic.id)}
                      type="button"
                    >
                      {topic.title}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        )}

        <button
          className="layerHeader layerHeaderFuture"
          onClick={() => setAlgorithmOpen((o) => !o)}
          type="button"
        >
          Algorithms
          <span className={`layerArrow ${algorithmOpen ? "" : "collapsed"}`}>▾</span>
        </button>

        {algorithmOpen && (
          <div>
            {algorithmFamilies.map((family) => (
              <div className="navGroup" key={family}>
                <p>{family}</p>
                {algorithmTopics
                  .filter((topic) => topic.family === family)
                  .map((topic) => (
                    <button
                      className={topic.id === selectedTopicId ? "active" : ""}
                      key={topic.id}
                      onClick={() => selectTopic(topic.id)}
                      type="button"
                    >
                      {topic.title}
                    </button>
                  ))}
              </div>
            ))}
          </div>
        )}

        {/* ── Application Layer ──────────────────────── */}
        <button
          className="layerHeader layerHeaderFuture"
          onClick={() => setApplicationOpen((o) => !o)}
          type="button"
        >
          Application Layer
          <span className={`layerArrow ${applicationOpen ? "" : "collapsed"}`}>▾</span>
        </button>

        {applicationOpen && (
          <div className="navGroup">
            {appLayerTopics.map((topic) => (
              <button
                className={topic.id === selectedTopicId ? "active" : ""}
                key={topic.id}
                onClick={() => selectTopic(topic.id)}
                type="button"
              >
                {topic.title}
              </button>
            ))}
          </div>
        )}
      </aside>
    </>
  );
}
