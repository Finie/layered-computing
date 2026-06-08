import type { Complexity } from "@/types/tutorial";

type ComplexityGridProps = {
  items: Complexity[];
};

export function ComplexityGrid({ items }: ComplexityGridProps) {
  return (
    <div className="complexityGrid" aria-label="Complexity summary">
      {items.map((item) => (
        <div className="complexityPill" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
