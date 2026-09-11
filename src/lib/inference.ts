import { RULES } from "./rules";
import type { FiredRule, PatientInputs, WorkingMemory } from "./types";

export function seedWorkingMemory(inputs: PatientInputs): WorkingMemory {
  const wm: WorkingMemory = new Set();
  if (inputs.headache) wm.add("headache");
  if (inputs.cough) wm.add("cough");
  if (inputs.sore_throat) wm.add("sore_throat");
  if (inputs.antibiotics_allergy) wm.add("antibiotics_allergy");
  return wm;
}

export function forwardChain(inputs: PatientInputs): {
  firedRules: FiredRule[];
  finalMemory: WorkingMemory;
} {
  const wm = seedWorkingMemory(inputs);
  const firedRules: FiredRule[] = [];
  let iterationNumber = 1;

  for (;;) {
    let firedThisPass = false;
    for (const rule of RULES) {
      if (!wm.has(rule.conclusion) && rule.condition(wm, inputs)) {
        wm.add(rule.conclusion);
        firedRules.push({ rule, conclusion: rule.conclusion, iterationNumber });
        firedThisPass = true;
      }
    }
    if (!firedThisPass) break;
    iterationNumber += 1;
  }

  return { firedRules, finalMemory: wm };
}
