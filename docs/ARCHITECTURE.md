---
status: accepted
tags: [architecture]
---

# Luma - Architecture

Implements [[REQUIREMENTS]] on the shapes in [[DATA_MODEL]]. Single route, stateless, pure-TS engine under a thin UI shell.

## 1. Layer overview

```text
route (src/app/page.tsx: compose + render only)
  → components (presentational; props in, UI out; motion allowed)
    → hooks (useInference: inputs/results/loading/reset state)
      → lib (pure TS: types, rules, inference, testCases — no JSX, no I/O)
```

Rules:

1. Routes compose; they own no inference logic and no state beyond hook calls.
2. No SQL, no network, no `localStorage` anywhere — C-3 is structural, not just policy.
3. `lib/` never imports from `components/`, `hooks/`, or `framer-motion`.
4. Animations live in components only (`motion.*`, `AnimatePresence`, variants).
5. New modules/routes require the traceability row in §6 to be filled first.

## 2. Route map

| File | Title | Reads / writes | FR trace |
| :--- | :---- | :------------- | :------- |
| `src/app/page.tsx` (`/`) | Luma — Rule-Based Expert System | Reads form state via `useInference`; writes nothing persistent; owns all creation | FR-1.1–FR-4.2 |

Gaps (honest): only `layout.tsx`, `page.tsx`, `globals.css` exist today — all `components/`, `lib/`, `hooks/` files in [[PROJECT]] are pending (see [[TASKS]]). About is an in-page anchor section on `/` (FR-4.3); a separate route would require an ADR first (C-4).

## 3. Module contracts

### `src/lib/types.ts`

Role: single owner of domain shapes. Exports `PatientInputs`, `NasalBreathing`, `Fact`, `WorkingMemory`, `Rule`, `FiredRule`, `TestCasePreset` exactly as [[DATA_MODEL]] §2.

### `src/lib/rules.ts`

Role: the 12 production rules as data. Exports `RULES: Rule[]` ordered by id 1–12 with human-readable `description` per rule.

### `src/lib/inference.ts`

Role: pure inference engine. Exports `seedWorkingMemory(inputs: PatientInputs): WorkingMemory` and `forwardChain(inputs: PatientInputs): { firedRules: FiredRule[]; finalMemory: WorkingMemory }`.

### `src/lib/testCases.ts`

Role: preset data. Exports `TEST_CASES: TestCasePreset[]` (5 entries, §6 outcomes).

### `src/lib/diagnosis.ts`

Role: pure recommendation derivation. Exports `deriveRecommendation(firedRules: FiredRule[]): string` implementing the FR-3.3 filtered-causal rule.

### `src/hooks/useInference.ts`

Role: run lifecycle state. Exposes `inputs`, `setInputs`, `applyPreset(preset)`, `run()`, `reset()`, `firedRules`, `finalMemory`, `isLoading`, `hasRun`.

### Components (one role line each)

- `Header.tsx`: card with framed mascot mark, short brand title + Expert System badge, engine tagline, C-6 sentence info box, button-style About anchor (FR-4.3).
- `TestCaseBar.tsx`: `props { cases, onSelect }`; five buttons (FR-1.2).
- `InputForm.tsx`: `props { inputs, onChange, onRun }`; six controlled inputs; temperature uses `input[type=number]`, blocks empty/NaN with an inline message, warns outside 30–43 °C; Enter submits via the guarded `onRun` (FR-1.1, FR-1.4).
- `RunButton.tsx`: `props { onRun, isLoading, disabled? }`; CTA + spinner/pulse, disabled while loading or temperature empty (FR-1.3, FR-1.4).
- `InferenceTrace.tsx`: `props { firedRules }`; staggered rule cards (FR-3.1).
- `WorkingMemoryPanel.tsx`: `props { facts }`; mono fact chips (FR-3.2).
- `DiagnosisCard.tsx`: `props { recommendation }`; amber-glow conclusion derived by the FR-3.3 filtered-causal rule (disease/decision terminals in rule-id order, fever/nasal fallback).
- `Footer.tsx`: author + exact C-6 copy (FR-4.2).

## 4. Data flows

Flow A — Run pipeline (FR-1.3, FR-2.1–FR-2.4, FR-3.1–FR-3.3):

1. `page.tsx` calls `run()` from `useInference`.
2. `run()` sets `isLoading`; `RunButton` shows spinner.
3. `forwardChain(inputs)` seeds via `seedWorkingMemory`, loops `RULES` to fixpoint.
4. `run()` stores `firedRules`/`finalMemory`, clears `isLoading`.
5. `InferenceTrace`, `WorkingMemoryPanel`, `DiagnosisCard` render with entrance animations.

Flow B — Preset fill (FR-1.2): `TestCaseBar.onSelect` → `applyPreset` → `setInputs` → `InputForm` re-renders; results from any prior run are cleared.

Flow C — Reads/render: components read props only; nothing persists at any step (C-3).

Flow D — Animations (FR-3.1–FR-3.4): page-load fade (Header), button pulse (RunButton), trace stagger 80 ms, chips stagger 40 ms + scale 0.8, delayed diagnosis glow, `AnimatePresence` fade-out on reset/new run. See [[UI_GUIDELINES]].

## 5. Cross-cutting concerns

- Theming: dark-only tokens in `globals.css` CSS vars + Tailwind utilities; token table in [[UI_GUIDELINES]]; no light mode (C-7).
- Fonts: Inter 700 display, JetBrains Mono for facts/rule IDs (see [[UI_GUIDELINES]]).
- Error policy: empty/non-numeric temperature blocks the run with an inline message; implausible values warn without blocking (FR-1.4) — never crash, never silently coerce.
- Verification: `npm run build` (Turbopack production build) and `npm run lint` (C-5); 5-case console check per [[DATA_MODEL]] §6.

## 6. Traceability (FR → modules)

| FR | Routes | `src/` modules |
| :-- | :----- | :------------- |
| FR-1.1, FR-1.4 | `/` | `InputForm`, `useInference` |
| FR-1.2 | `/` | `TestCaseBar`, `testCases`, `useInference` |
| FR-1.3 | `/` | `RunButton`, `useInference`, `inference` |
| FR-2.1–FR-2.4 | `/` (via run) | `inference`, `rules`, `types` |
| FR-3.1 | `/` | `InferenceTrace` |
| FR-3.2 | `/` | `WorkingMemoryPanel` |
| FR-3.3 | `/` | `DiagnosisCard`, `diagnosis` |
| FR-3.4 | `/` | `useInference`, all result components |
| FR-4.2 | `/` | `Footer` |
| FR-4.3 | `/` | `Header` |
