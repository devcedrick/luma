import type { TestCasePreset } from "./types";

export const TEST_CASES: TestCasePreset[] = [
  {
    label: "Case 1",
    expectedOutcome: "no fever",
    inputs: {
      temperature: 36.5,
      nasal_breathing: "none",
      headache: false,
      cough: false,
      sore_throat: false,
      antibiotics_allergy: false,
    },
  },
  {
    label: "Case 2",
    expectedOutcome: "high fever, sinus membranes swelling",
    inputs: {
      temperature: 39.0,
      nasal_breathing: "heavy",
      headache: true,
      cough: true,
      sore_throat: true,
      antibiotics_allergy: false,
    },
  },
  {
    label: "Case 3",
    expectedOutcome: "cold, don't treat, don't give medication",
    inputs: {
      temperature: 37.5,
      nasal_breathing: "light",
      headache: true,
      cough: true,
      sore_throat: false,
      antibiotics_allergy: false,
    },
  },
  {
    label: "Case 4",
    expectedOutcome: "cold, treat, give medication, give Tylenol",
    inputs: {
      temperature: 37.5,
      nasal_breathing: "light",
      headache: true,
      cough: true,
      sore_throat: true,
      antibiotics_allergy: true,
    },
  },
  {
    label: "Case 5",
    expectedOutcome: "cold, treat, give medication, give antibiotics",
    inputs: {
      temperature: 37.5,
      nasal_breathing: "light",
      headache: true,
      cough: true,
      sore_throat: true,
      antibiotics_allergy: false,
    },
  },
];
