import { useCallback, useEffect, useRef, useState } from "react";
import { forwardChain } from "@/lib/inference";
import type {
  FiredRule,
  PatientInputs,
  TestCasePreset,
  WorkingMemory,
} from "@/lib/types";

const EMPTY_INPUTS: PatientInputs = {
  temperature: 36.6,
  nasal_breathing: "none",
  headache: false,
  cough: false,
  sore_throat: false,
  antibiotics_allergy: false,
};

export function useInference() {
  const [inputs, setInputsState] = useState<PatientInputs>(EMPTY_INPUTS);
  const [firedRules, setFiredRules] = useState<FiredRule[]>([]);
  const [finalMemory, setFinalMemory] = useState<WorkingMemory | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const setInputs = useCallback((patch: Partial<PatientInputs>) => {
    setInputsState((prev) => ({ ...prev, ...patch }));
  }, []);

  const clearResults = useCallback(() => {
    clearTimer();
    setFiredRules([]);
    setFinalMemory(null);
    setIsLoading(false);
    setHasRun(false);
  }, [clearTimer]);

  const applyPreset = useCallback(
    (preset: TestCasePreset) => {
      setInputsState({ ...preset.inputs });
      clearResults();
    },
    [clearResults],
  );

  const run = useCallback(() => {
    if (Number.isNaN(inputs.temperature)) return;
    clearTimer();
    setIsLoading(true);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      const { firedRules, finalMemory } = forwardChain(inputs);
      setFiredRules(firedRules);
      setFinalMemory(finalMemory);
      setIsLoading(false);
      setHasRun(true);
    }, 500);
  }, [inputs, clearTimer]);

  const reset = useCallback(() => {
    clearResults();
  }, [clearResults]);

  return {
    inputs,
    setInputs,
    applyPreset,
    run,
    reset,
    firedRules,
    finalMemory,
    isLoading,
    hasRun,
  };
}
