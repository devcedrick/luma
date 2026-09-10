import type { FiredRule } from "@/lib/types";

interface InferenceTraceProps {
  firedRules: FiredRule[];
}

export default function InferenceTrace({ firedRules }: InferenceTraceProps) {
  return (
    <section aria-label="Inference trace" className="flex w-full flex-col gap-2">
      <h2 className="text-sm font-bold text-text">Inference trace</h2>
      <ol className="flex w-full flex-col gap-2">
        {firedRules.map((fired) => (
          <li
            key={fired.rule.id}
            className="rounded-md border border-border border-l-4 border-l-fired bg-surface px-3 py-2"
          >
            <p className="font-mono text-xs text-text">
              Rule {fired.rule.id} → {fired.conclusion}
            </p>
            <p className="mt-1 text-xs text-text-muted">
              {fired.rule.description}
              <span className="ml-2 rounded bg-accent-dim px-1.5 py-0.5 font-mono text-[10px] text-text">
                iteration {fired.iterationNumber}
              </span>
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
