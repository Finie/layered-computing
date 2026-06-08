type CodeBlockProps = {
  code: string;
};

export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="codeBlock">
      <code>{code}</code>
    </pre>
  );
}
