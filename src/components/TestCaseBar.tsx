"use client";

import type { PatientInputs, TestCasePreset } from "@/lib/types";

interface TestCaseBarProps {
  cases: TestCasePreset[];
  onSelect: (preset: TestCasePreset) => void;
  activeInputs?: PatientInputs;
}

export default function TestCaseBar({
  cases,
  onSelect,
  activeInputs,
}: TestCaseBarProps) {
  const isCaseActive = (preset: TestCasePreset) => {
    if (!activeInputs) return false;
    return (
      activeInputs.temperature === preset.inputs.temperature &&
      activeInputs.nasal_breathing === preset.inputs.nasal_breathing &&
      activeInputs.headache === preset.inputs.headache &&
      activeInputs.cough === preset.inputs.cough &&
      activeInputs.sore_throat === preset.inputs.sore_throat &&
      activeInputs.antibiotics_allergy === preset.inputs.antibiotics_allergy
    );
  };

  return (
    <div className="flex w-full flex-wrap gap-2">
      {cases.map((preset) => {
        const active = isCaseActive(preset);
        return (
          <button
            key={preset.label}
            type="button"
            onClick={() => onSelect(preset)}
            aria-pressed={active}
            className={`min-h-[40px] flex-1 sm:flex-initial rounded-lg border px-3.5 py-2 text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-accent ${
              active
                ? "border-accent bg-accent-dim text-text shadow-xs font-semibold"
                : "border-border bg-surface text-text-muted hover:border-accent/60 hover:text-text hover:bg-surface/80"
            }`}
          >
            {preset.label}
          </button>
        );
      })}
    </div>
  );
}
