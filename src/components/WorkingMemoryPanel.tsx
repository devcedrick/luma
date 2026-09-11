import type { Fact } from "@/lib/types";

interface WorkingMemoryPanelProps {
  facts: Fact[];
}

export default function WorkingMemoryPanel({ facts }: WorkingMemoryPanelProps) {
  return (
    <section aria-label="Working memory" className="flex w-full flex-col gap-2">
      <h2 className="text-sm font-bold text-text">Working memory</h2>
      <div className="flex w-full flex-row flex-wrap gap-1.5">
        {facts.map((fact) => (
          <span
            key={fact}
            className="rounded-full border border-border bg-surface px-2.5 py-1 font-mono text-xs text-text"
          >
            {fact}
          </span>
        ))}
      </div>
    </section>
  );
}
