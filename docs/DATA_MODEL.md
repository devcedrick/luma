---
status: accepted
tags: [data-model, luma]
---

# Luma - Data Model

Source of truth for domain shapes. Formats stated here once; validators and review paths enforce them (see [[REQUIREMENTS]] FR-1.4). Modules that own these shapes: [[ARCHITECTURE]] §3.

## 1. Entities

| Entity | Fields | Notes |
| :----- | :----- | :---- |
| `PatientInputs` | `temperature: number` (°C, any numeric); `nasal_breathing: NasalBreathing` enum `"none" \| "light" \| "heavy"`; `headache, cough, sore_throat, antibiotics_allergy: boolean` | All fields required on the form object; temperature follows the FR-1.4 block-plus-warn rule |
| `Fact` | string-literal union (15 members: 3 fever, 2 nasal, 4 symptom, 1 cold, 5 treatment-chain) | Closed set; Rules 1–12 are the only producers |
| `WorkingMemory` | `Set<Fact>` | In-memory only, per run (C-3) |
| `Rule` | `id: number` (1–12); `label: string`; `description: string`; `condition(wm, inputs): boolean`; `conclusion: Fact` | Conditions may read raw `temperature`/`nasal_breathing` directly (Rules 1–5) |
| `FiredRule` | `rule: Rule`; `conclusion: Fact`; `iterationNumber: number` (1-based fixpoint pass) | Ordered by firing; drives [[PROJECT]] trace |
| `TestCasePreset` | `label: string`; `expectedOutcome: string`; `inputs: PatientInputs` | 5 presets; expected outcomes in §6 |

## 2. TypeScript contracts

```ts
type NasalBreathing = "none" | "light" | "heavy";

interface PatientInputs {
  temperature: number;           // degrees Celsius, any numeric
  nasal_breathing: NasalBreathing;
  headache: boolean;
  cough: boolean;
  sore_throat: boolean;
  antibiotics_allergy: boolean;
}

type Fact =
  | "no_fever" | "low_fever" | "high_fever"
  | "nasal_discharge" | "sinus_membranes_swelling"
  | "headache" | "cough" | "sore_throat" | "antibiotics_allergy"
  | "cold"
  | "treat" | "dont_treat"
  | "give_medication" | "dont_give_medication"
  | "give_tylenol" | "give_antibiotics";

type WorkingMemory = Set<Fact>;

interface Rule {
  id: number;
  label: string;           // e.g. "Rule 6"
  description: string;     // human-readable IF...THEN
  condition: (wm: WorkingMemory, inputs: PatientInputs) => boolean;
  conclusion: Fact;
}

interface FiredRule {
  rule: Rule;
  conclusion: Fact;
  iterationNumber: number;
}

interface TestCasePreset {
  label: string;           // e.g. "Case 1"
  expectedOutcome: string; // human-readable terminal facts
  inputs: PatientInputs;
}
```

Rules: every `PatientInputs` field is required and non-empty on submit; `temperature`/`nasal_breathing` are consumed raw by Rules 1–5 and never seeded as facts; only `true` booleans seed facts (`headache` → `"headache"`, etc.); nothing degrades to `null` — empty/non-numeric temperature blocks the run with an inline message and values outside 30–43 °C raise a non-blocking warning per [[REQUIREMENTS]] FR-1.4, never silently dropped. Diagnosis display follows the filtered-causal rule in [[REQUIREMENTS]] FR-3.3.

## 3. Schema

N/A — stateless system per [[REQUIREMENTS]] C-3. No tables, no migrations, no DDL. If persistence is ever introduced, it requires an ADR plus a v1 migration note here; until then this section stays empty by design.

## 4. Mapping table

| Source field | TS field | DB column | Null handling |
| :----------- | :------- | :-------- | :------------ |
| Form temperature input | `PatientInputs.temperature` | — (none) | FR-1.4 block-plus-warn; never coerce silently |
| Form nasal select | `PatientInputs.nasal_breathing` | — | Enum-closed; no null |
| Form toggles | `PatientInputs.headache/cough/sore_throat/antibiotics_allergy` | — | `false` seeds nothing; no null |
| Seeded/derived facts | `Fact` in `WorkingMemory` | — | Closed union; no null |
| Fired record | `FiredRule` | — | Always complete triple |

## 5. Query contracts

Pure functions only (no I/O). Ordering rule: rules evaluate in id order 1–12 within each fixpoint pass; passes repeat until a full pass adds nothing.

```ts
seedWorkingMemory(inputs: PatientInputs): WorkingMemory;
forwardChain(inputs: PatientInputs): { firedRules: FiredRule[]; finalMemory: WorkingMemory };
```

- `seedWorkingMemory` adds `"headache" | "cough" | "sore_throat" | "antibiotics_allergy"` for each `true` input; temperature and nasal breathing stay raw.
- `forwardChain` seeds, then loops Rules 1–12, firing any rule whose conclusion is absent and whose condition holds, until fixpoint.
- `TEST_CASES: TestCasePreset[]` exposes the 5 presets in case order.

## 6. Acceptance

- Round-trip: feeding each of the 5 presets through `forwardChain` yields exactly its expected outcome — Case 1: no fever; Case 2: high fever + sinus membranes swelling; Case 3: cold, don't treat, don't give medication; Case 4: cold, treat, give medication, give Tylenol; Case 5: cold, treat, give medication, give antibiotics.
- Order: `firedRules` iteration numbers are non-decreasing and conclusions are unique.
- Empty-state: before any run, `firedRules` is empty and no trace/memory/diagnosis renders (FR-3.4 reset returns to this state).
- Determinism: repeated runs on identical inputs produce identical chains (NFR-1).
