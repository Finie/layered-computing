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
  showMobileHeader?: boolean;
};

export function TopicNav({
  algorithmTopics,
  topics,
  appLayerTopics,
  selectedTopicId,
  onSelectTopic,
  showMobileHeader = true,
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
      {showMobileHeader ? (
        <div className="mobileTopicBar">
          <button
            aria-controls="topic-nav"
            aria-expanded={mobileNavOpen}
            aria-label="Open topic navigation"
            className="mobileNavToggle"
            onClick={() => setMobileNavOpen(true)}
            type="button"
          >
            <span aria-hidden="true" />
          </button>
          <strong>Layered Computing</strong>
        </div>
      ) : null}

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
        id={showMobileHeader ? "topic-nav" : "desktop-topic-nav"}
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

        <TopicNavContent
          algorithmFamilies={algorithmFamilies}
          algorithmTopics={algorithmTopics}
          appLayerTopics={appLayerTopics}
          applicationOpen={applicationOpen}
          foundationalOpen={foundationalOpen}
          algorithmOpen={algorithmOpen}
          categories={categories}
          selectedTopicId={selectedTopicId}
          selectTopic={selectTopic}
          setAlgorithmOpen={setAlgorithmOpen}
          setApplicationOpen={setApplicationOpen}
          setFoundationalOpen={setFoundationalOpen}
          topics={topics}
        />
      </aside>
    </>
  );
}

type MobileSiteHeaderProps = TopicNavProps;

export function MobileSiteHeader({
  algorithmTopics,
  topics,
  appLayerTopics,
  selectedTopicId,
  onSelectTopic,
}: MobileSiteHeaderProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tutorialMenuOpen, setTutorialMenuOpen] = useState(false);

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
    setTutorialMenuOpen(false);
  }

  function goHome() {
    selectTopic(topics[0].id);
  }

  return (
    <>
      <header className="mobileSiteHeader">
        <div className="mobileSiteHeaderInner">
          <button
            aria-controls="topic-nav"
            aria-expanded={mobileNavOpen}
            aria-label="Open topic navigation"
            className="mobileNavToggle"
            onClick={() => setMobileNavOpen(true)}
            type="button"
          >
            <span aria-hidden="true" />
          </button>

          <strong>Layered Computing</strong>

          <nav className="mobileSiteLinks" aria-label="Primary">
            <button onClick={goHome} type="button">
              Home
            </button>
            <div
              className="mobileTutorialMenu"
              onMouseEnter={() => setTutorialMenuOpen(true)}
              onMouseLeave={() => setTutorialMenuOpen(false)}
            >
              <button
                aria-expanded={tutorialMenuOpen}
                aria-haspopup="true"
                onClick={() => setTutorialMenuOpen((open) => !open)}
                onFocus={() => setTutorialMenuOpen(true)}
                type="button"
              >
                Tutorials
              </button>
              <div className={`mobileTutorialDropdown ${tutorialMenuOpen ? "open" : ""}`}>
                <TopicNavContent
                  algorithmFamilies={algorithmFamilies}
                  algorithmTopics={algorithmTopics}
                  appLayerTopics={appLayerTopics}
                  applicationOpen
                  foundationalOpen
                  algorithmOpen
                  categories={categories}
                  selectedTopicId={selectedTopicId}
                  selectTopic={selectTopic}
                  setAlgorithmOpen={() => undefined}
                  setApplicationOpen={() => undefined}
                  setFoundationalOpen={() => undefined}
                  topics={topics}
                />
              </div>
            </div>
          </nav>
        </div>
      </header>

      {mobileNavOpen ? (
        <button
          aria-label="Close topic navigation"
          className="mobileNavBackdrop"
          onClick={() => setMobileNavOpen(false)}
          type="button"
        />
      ) : null}

      <aside
        className={`topicNav mobileDrawerNav ${mobileNavOpen ? "open" : ""}`}
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
        <TopicNavContent
          algorithmFamilies={algorithmFamilies}
          algorithmTopics={algorithmTopics}
          appLayerTopics={appLayerTopics}
          applicationOpen
          foundationalOpen
          algorithmOpen
          categories={categories}
          selectedTopicId={selectedTopicId}
          selectTopic={selectTopic}
          setAlgorithmOpen={() => undefined}
          setApplicationOpen={() => undefined}
          setFoundationalOpen={() => undefined}
          topics={topics}
        />
      </aside>
    </>
  );
}

type TopicNavContentProps = {
  algorithmFamilies: AlgorithmFamily[];
  algorithmTopics: AlgorithmTopic[];
  appLayerTopics: AppLayerTopic[];
  applicationOpen: boolean;
  foundationalOpen: boolean;
  algorithmOpen: boolean;
  categories: TutorialTopic["category"][];
  selectedTopicId: string;
  selectTopic: (topicId: string) => void;
  setAlgorithmOpen: (update: (open: boolean) => boolean) => void;
  setApplicationOpen: (update: (open: boolean) => boolean) => void;
  setFoundationalOpen: (update: (open: boolean) => boolean) => void;
  topics: TutorialTopic[];
};

function TopicNavContent({
  algorithmFamilies,
  algorithmTopics,
  appLayerTopics,
  applicationOpen,
  foundationalOpen,
  algorithmOpen,
  categories,
  selectedTopicId,
  selectTopic,
  setAlgorithmOpen,
  setApplicationOpen,
  setFoundationalOpen,
  topics,
}: TopicNavContentProps) {
  return (
    <>
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
    </>
  );
}
