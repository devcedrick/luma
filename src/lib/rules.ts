import type { Rule } from "./types";

export const RULES: Rule[] = [
  {
    id: 1,
    label: "Rule 1",
    description: 'IF temperature <= 37.0 THEN no_fever',
    condition: (_wm, inputs) => inputs.temperature <= 37.0,
    conclusion: "no_fever",
  },
  {
    id: 2,
    label: "Rule 2",
    description: 'IF temperature > 37.0 AND temperature <= 38.0 THEN low_fever',
    condition: (_wm, inputs) =>
      inputs.temperature > 37.0 && inputs.temperature <= 38.0,
    conclusion: "low_fever",
  },
  {
    id: 3,
    label: "Rule 3",
    description: 'IF temperature > 38.0 THEN high_fever',
    condition: (_wm, inputs) => inputs.temperature > 38.0,
    conclusion: "high_fever",
  },
  {
    id: 4,
    label: "Rule 4",
    description: 'IF nasal_breathing = "light" THEN nasal_discharge',
    condition: (_wm, inputs) => inputs.nasal_breathing === "light",
    conclusion: "nasal_discharge",
  },
  {
    id: 5,
    label: "Rule 5",
    description: 'IF nasal_breathing = "heavy" THEN sinus_membranes_swelling',
    condition: (_wm, inputs) => inputs.nasal_breathing === "heavy",
    conclusion: "sinus_membranes_swelling",
  },
  {
    id: 6,
    label: "Rule 6",
    description:
      "IF low_fever AND headache AND nasal_discharge AND cough THEN cold",
    condition: (wm) =>
      wm.has("low_fever") &&
      wm.has("headache") &&
      wm.has("nasal_discharge") &&
      wm.has("cough"),
    conclusion: "cold",
  },
  {
    id: 7,
    label: "Rule 7",
    description: "IF cold AND NOT sore_throat THEN dont_treat",
    condition: (wm) => wm.has("cold") && !wm.has("sore_throat"),
    conclusion: "dont_treat",
  },
  {
    id: 8,
    label: "Rule 8",
    description: "IF cold AND sore_throat THEN treat",
    condition: (wm) => wm.has("cold") && wm.has("sore_throat"),
    conclusion: "treat",
  },
  {
    id: 9,
    label: "Rule 9",
    description: "IF dont_treat THEN dont_give_medication",
    condition: (wm) => wm.has("dont_treat"),
    conclusion: "dont_give_medication",
  },
  {
    id: 10,
    label: "Rule 10",
    description: "IF treat THEN give_medication",
    condition: (wm) => wm.has("treat"),
    conclusion: "give_medication",
  },
  {
    id: 11,
    label: "Rule 11",
    description: "IF give_medication AND antibiotics_allergy THEN give_tylenol",
    condition: (wm) =>
      wm.has("give_medication") && wm.has("antibiotics_allergy"),
    conclusion: "give_tylenol",
  },
  {
    id: 12,
    label: "Rule 12",
    description:
      "IF give_medication AND NOT antibiotics_allergy THEN give_antibiotics",
    condition: (wm) =>
      wm.has("give_medication") && !wm.has("antibiotics_allergy"),
    conclusion: "give_antibiotics",
  },
];
