"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AboutModal from "@/components/AboutModal";
import DiagnosisCard from "@/components/DiagnosisCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import InferenceTrace from "@/components/InferenceTrace";
import InputForm from "@/components/InputForm";
import RunButton from "@/components/RunButton";
import TestCaseBar from "@/components/TestCaseBar";
import WorkingMemoryPanel from "@/components/WorkingMemoryPanel";
import { useInference } from "@/hooks/useInference";
import { deriveRecommendation } from "@/lib/diagnosis";
import { TEST_CASES } from "@/lib/testCases";

export default function Home() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);
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
  const showResults = hasRun && !isLoading && finalMemory !== null;

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-text">
      <Header onOpenAbout={() => setIsAboutOpen(true)} />
      <main className="mx-auto grid w-full max-w-5xl flex-1 grid-cols-1 items-center gap-8 px-4 py-8 lg:grid-cols-2">
        <div className="flex w-full flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <div className="flex w-full flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Test Case Presets
            </span>
            <TestCaseBar
              cases={TEST_CASES}
              onSelect={applyPreset}
              activeInputs={inputs}
            />
          </div>

          <div className="flex w-full flex-col gap-5 rounded-xl border border-border bg-surface/60 p-5 shadow-xs sm:p-6">
            <div className="border-b border-border/70 pb-3">
              <h2 className="text-base font-bold text-text">
                Patient Observations
              </h2>
              <p className="mt-0.5 text-xs text-text-muted">
                Configure physiological indicators to trigger forward-chaining rules.
              </p>
            </div>

            <InputForm inputs={inputs} onChange={setInputs} onRun={run} />

            <div className="flex flex-col gap-3 pt-2 border-t border-border/70">
              <RunButton onRun={run} isLoading={isLoading} disabled={blocked} />
              {showResults && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={reset}
                    className="text-xs font-medium text-text-muted transition-colors hover:text-text hover:underline focus:outline-none"
                  >
                    Reset results
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex w-full flex-col gap-6">
          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                aria-live="polite"
                className="flex w-full flex-col gap-6"
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                    Inference Trace & Findings
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-0.5 text-xs text-text-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-fired" />
                    {firedRules.length} {firedRules.length === 1 ? "rule fired" : "rules fired"}
                  </span>
                </div>
                <InferenceTrace firedRules={firedRules} />
                <WorkingMemoryPanel facts={[...finalMemory]} />
                <DiagnosisCard recommendation={deriveRecommendation(firedRules)} />
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                className="flex min-h-[380px] w-full flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border/80 bg-surface/30 p-8 text-center"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-surface text-text-muted">
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 1-6.23-.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-text">
                  Reasoning Engine Idle
                </h3>
                <p className="mt-1 max-w-xs text-xs text-text-muted">
                  Run inference to see the reasoning chain here.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <Footer />
    </div>
  );
}
