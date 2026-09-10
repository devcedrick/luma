"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InputForm from "@/components/InputForm";
import RunButton from "@/components/RunButton";
import TestCaseBar from "@/components/TestCaseBar";
import { useInference } from "@/hooks/useInference";
import { TEST_CASES } from "@/lib/testCases";

export default function Home() {
  const {
    inputs,
    setInputs,
    applyPreset,
    run,
    reset,
    firedRules,
    finalMemory,
    isLoading,
    hasRun,
  } = useInference();
  const blocked = Number.isNaN(inputs.temperature);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6">
        <TestCaseBar cases={TEST_CASES} onSelect={applyPreset} />
        <InputForm inputs={inputs} onChange={setInputs} onRun={run} />
        <div className="flex flex-col gap-2">
          <RunButton onRun={run} isLoading={isLoading} disabled={blocked} />
          {hasRun && !isLoading && (
            <button
              type="button"
              onClick={reset}
              className="w-fit text-sm font-medium text-text-muted hover:text-text hover:underline"
            >
              Reset results
            </button>
          )}
        </div>
        {hasRun && !isLoading && finalMemory && (
          <section
            aria-live="polite"
            className="flex flex-col gap-2 rounded-md border border-border bg-surface p-4"
          >
            <h2 className="text-sm font-bold text-text">Results</h2>
            <ol className="flex flex-col gap-1 font-mono text-xs text-text">
              {firedRules.map((fired) => (
                <li key={fired.rule.id}>
                  Rule {fired.rule.id} → {fired.conclusion}
                  <span className="text-text-muted">
                    {" "}
                    (iteration {fired.iterationNumber})
                  </span>
                </li>
              ))}
            </ol>
            <p className="font-mono text-xs text-text-muted">
              {[...finalMemory].join(", ")}
            </p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
