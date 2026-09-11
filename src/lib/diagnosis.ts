import type { Fact, FiredRule } from "./types";

// Disease/decision terminals shown as the recommendation, in firing order.
const TERMINALS: ReadonlySet<Fact> = new Set([
  "cold",
  "treat",
  "dont_treat",
  "give_medication",
  "dont_give_medication",
  "give_tylenol",
  "give_antibiotics",
]);

// Fever/nasal findings shown when no terminal fact fired.
const FALLBACKS: ReadonlySet<Fact> = new Set([
  "no_fever",
  "low_fever",
  "high_fever",
  "nasal_discharge",
  "sinus_membranes_swelling",
]);

const LABELS: Record<Fact, string> = {
  no_fever: "No fever",
  low_fever: "Low fever",
  high_fever: "High fever",
  nasal_discharge: "Nasal discharge",
  sinus_membranes_swelling: "Sinus membranes swelling",
  headache: "Headache",
  cough: "Cough",
  sore_throat: "Sore throat",
  antibiotics_allergy: "Antibiotics allergy",
  cold: "Cold",
  treat: "Treat",
  dont_treat: "Don't treat",
  give_medication: "Give medication",
  dont_give_medication: "Don't give medication",
  give_tylenol: "Give Tylenol",
  give_antibiotics: "Give antibiotics",
};

/**
 * Derive the highlighted recommendation per REQUIREMENTS FR-3.3:
 * terminal disease/decision facts in firing (rule-id) order, humanized;
 * fever/nasal findings when no terminal fired.
 */
export function deriveRecommendation(firedRules: FiredRule[]): string {
  const terminals = firedRules
    .map((fired) => fired.conclusion)
    .filter((fact) => TERMINALS.has(fact));
  const shown = terminals.length > 0
    ? terminals
    : firedRules
      .map((fired) => fired.conclusion)
      .filter((fact) => FALLBACKS.has(fact));
  return shown.map((fact) => LABELS[fact]).join(", ");
}
