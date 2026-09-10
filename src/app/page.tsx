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
    isLoading,
    hasRun,
  } = useInference();
  const blocked = Number.isNaN(inputs.temperature);

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <Header />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-4 px-4 py-6">
        <TestCaseBar cases={TEST_CASES} onSelect={applyPreset} />
        <InputForm inputs={inputs} onChange={setInputs} />
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
      </main>
      <Footer />
    </div>
  );
}
