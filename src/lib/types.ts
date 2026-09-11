export type NasalBreathing = "none" | "light" | "heavy";

export interface PatientInputs {
  temperature: number; // degrees Celsius, any numeric
  nasal_breathing: NasalBreathing;
  headache: boolean;
  cough: boolean;
  sore_throat: boolean;
  antibiotics_allergy: boolean;
}

export type Fact =
  | "no_fever"
  | "low_fever"
  | "high_fever"
  | "nasal_discharge"
  | "sinus_membranes_swelling"
  | "headache"
  | "cough"
  | "sore_throat"
  | "antibiotics_allergy"
  | "cold"
  | "treat"
  | "dont_treat"
  | "give_medication"
  | "dont_give_medication"
  | "give_tylenol"
  | "give_antibiotics";

export type WorkingMemory = Set<Fact>;

export interface Rule {
  id: number;
  label: string; // e.g. "Rule 6"
  description: string; // human-readable IF...THEN
  condition: (wm: WorkingMemory, inputs: PatientInputs) => boolean;
  conclusion: Fact;
}

export interface FiredRule {
  rule: Rule;
  conclusion: Fact;
  iterationNumber: number;
}

export interface TestCasePreset {
  label: string; // e.g. "Case 1"
  expectedOutcome: string; // human-readable terminal facts
  inputs: PatientInputs;
}
