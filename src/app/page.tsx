import { TutorialExplorer } from "@/components/tutorial/TutorialExplorer";

export default function Home() {
  return (
    <>
      <header className="appHeader">
        <div>
          <span className="eyebrow">Interactive study guide</span>
          <h1>Layered Computing Curriculum</h1>
          <p>
            Study computing as a chain of abstractions: primitive values become
            structured data, structured data enables algorithms, and algorithms
            scale into applications, databases, distributed systems, cloud
            infrastructure, and AI systems.
          </p>
        </div>
      </header>

      <TutorialExplorer />
    </>
  );
}
