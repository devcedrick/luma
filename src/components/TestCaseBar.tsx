import type { TestCasePreset } from "@/lib/types";

interface TestCaseBarProps {
  cases: TestCasePreset[];
  onSelect: (preset: TestCasePreset) => void;
}

export default function TestCaseBar({ cases, onSelect }: TestCaseBarProps) {
  return (
    <div className="flex w-full flex-row flex-wrap gap-2">
      {cases.map((preset) => (
        <button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset)}
          className="rounded-md border border-border bg-surface px-3 py-2 text-sm text-text hover:border-accent"
        >
          {preset.label}
        </button>
      ))}
    </div>
  );
}
