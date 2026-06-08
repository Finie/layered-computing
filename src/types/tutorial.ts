export type LanguageId = "java" | "typescript" | "python";

export type Complexity = {
  label: string;
  value: string;
};

export type LanguageExample = {
  internals: string;
  internalCode: string;
  problem: string;
  solutionCode: string;
  whyItFits: string;
};

export type TutorialTopic = {
  id: string;
  title: string;
  category:
    | "Foundations"
    | "Core"
    | "Sets"
    | "Maps"
    | "Trees"
    | "Heaps"
    | "Graphs"
    | "Advanced"
    | "Algorithms";
  summary: string;
  bestFor: string;
  avoidWhen: string;
  internalShape: string;
  interviewSignals: string[];
  complexity: Complexity[];
  languages: Record<LanguageId, LanguageExample>;
};

export type LanguageOption = {
  id: LanguageId;
  label: string;
};

export type RecognitionNote = {
  signal: string;
  meaning: string;
  example: string;
  code?: Partial<Record<LanguageId, string>>;
};

export type PracticeExample = {
  title: string;
  code?: Partial<Record<LanguageId, string>>;
};

export type PracticeNote = {
  setup: string;
  steps: string[];
  extraExamples: Array<string | PracticeExample>;
};

export type TopicLearningNotes = {
  recognition: RecognitionNote[];
  practice: PracticeNote;
};

// ── Algorithm Layer types ───────────────────────────────────

export type AlgorithmFamily =
  | "Foundations"
  | "Searching"
  | "Sorting"
  | "Recursion"
  | "Traversal"
  | "Dynamic Programming"
  | "Graphs"
  | "Compression"
  | "Security"
  | "AI & ML"
  | "Databases"
  | "Concurrency"
  | "Distributed";

export type AlgorithmLanguageExample = {
  naiveCode: string;
  optimizedCode: string;
};

export type AlgorithmTopic = {
  id: string;
  title: string;
  family: AlgorithmFamily;
  summary: string;
  problem: string;
  whyExists: string;
  history: string;
  prerequisites: string[];
  dataStructures: string[];
  naiveApproach: string;
  optimizedApproach: string;
  mechanics: string[];
  walkthrough: string[];
  visualization: string[];
  memoryBehavior: string;
  complexity: Complexity[];
  scalability: string;
  tradeoffs: string[];
  edgeCases: string[];
  beginnerMistakes: string[];
  variants: string[];
  interviewerExpectations: string[];
  interviewQuestions: string[];
  interviewerFocus: string;
  engineeringThinking: string;
  juniorMisses: string;
  seniorOptimizesFor: string;
  pairsBestWith: string[];
  whenNotToUse: string;
  productionUse: string;
  databaseRelevance: string;
  faangScaleUse: string;
  systemsConnections: string[];
  distributedImplications?: string;
  languages: Record<LanguageId, AlgorithmLanguageExample>;
};

// ── Application Layer types ──────────────────────────────────

export type AppLayerContentItem =
  | { type: "p"; text: string }
  | { type: "h4"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "grid"; cards: Array<{ title: string; body: string }> }
  | { type: "compare"; cols: Array<{ heading: string; points: string[] }> }
  | { type: "callout"; label: string; text: string }
  | { type: "code"; lang: string; text: string }
  | { type: "diagram"; caption: string; text: string }
  | { type: "tags"; items: string[] }
  | { type: "divider"; text: string };

export type AppLayerSection = {
  heading: string;
  content: AppLayerContentItem[];
};

export type AppLayerTopic = {
  id: string;
  title: string;
  overview: string;
  sections: AppLayerSection[];
};
