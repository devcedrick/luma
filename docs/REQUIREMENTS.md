---
status: accepted
tags: [requirements]
---

# Luma - Requirements

Derived from [[PROJECT]]. Stack: Next.js 16.3.4 (App Router) + TypeScript strict + Tailwind v4 + Framer Motion 13.2.0, stateless, no storage.

## 1. Functional Requirements

### FR-1 Input capture

- FR-1.1: User can enter all 6 input values on page load (`src/components/InputForm.tsx`).
- FR-1.2: User can load any of 5 preset cases into the form with one click (`src/components/TestCaseBar.tsx`, `src/lib/testCases.ts`).
- FR-1.3: User can start inference from the form; the run button shows a loading state while inference executes (`src/components/RunButton.tsx`, `src/hooks/useInference.ts`).
- FR-1.4: System blocks the run on empty or non-numeric temperature with an inline message (`src/components/InputForm.tsx`). Any numeric value runs (Rules 1–3 are total over all reals); values outside 30–43 °C run with a non-blocking plausibility warning. Nothing is ever silently coerced or dropped.

### FR-2 Inference engine

- FR-2.1: System seeds working memory with raw inputs as facts before inference (`src/lib/inference.ts` `seedWorkingMemory`; see [[DATA_MODEL]] §2).
- FR-2.2: System forward-chains across all 12 rules, iterating until fixpoint (no new facts) (`src/lib/inference.ts` `forwardChain`, `src/lib/rules.ts`).
- FR-2.3: System records fired rules in firing order with iteration numbers (`FiredRule`; see [[DATA_MODEL]] §2).
- FR-2.4: System exposes the final working memory contents after halt (`forwardChain` return; see [[DATA_MODEL]] §5).

### FR-3 Results display

- FR-3.1: User can view the chain of fired rules in order, one animated card per rule (`src/components/InferenceTrace.tsx`).
- FR-3.2: User can view all final working-memory facts as chips (`src/components/WorkingMemoryPanel.tsx`).
- FR-3.3: User can read the highlighted final recommendation (`src/components/DiagnosisCard.tsx`). Derivation rule: display terminal facts from the disease/decision set {`cold`, `treat`, `dont_treat`, `give_medication`, `dont_give_medication`, `give_tylenol`, `give_antibiotics`} ordered by firing rule id, humanized; if that set is empty, display the fever/nasal findings instead. Reproduces all five [[DATA_MODEL]] §6 outcomes.
- FR-3.4: User can reset the run; result sections clear with an exit animation (`src/hooks/useInference.ts`, `AnimatePresence`).

### FR-4 Academic framing

- FR-4.1: ~~System shows the persistent academic banner with the exact Section 14 copy.~~ **Removed** — banner component deleted; the academic disclaimer lives in the footer (FR-4.2).
- FR-4.2: System shows the footer with author name Ken Cedrick Jimeno and the two-line academic disclaimer (`src/components/Footer.tsx`).
- FR-4.3: User can jump to an in-page About section from the header link via smooth-scroll anchor on the same route (`src/components/Header.tsx`). No new route (see C-4).

## 2. Non-functional Requirements

- NFR-1 **Reliability (determinism):** identical inputs always produce the identical fired-rule chain and final memory; verified against the 5 expected outcomes in [[DATA_MODEL]] §6.
- NFR-2 **Performance:** inference runs synchronously to fixpoint with no perceptible delay on the 12-rule base; list animations use 80 ms / 40 ms staggers.
- NFR-3 **Usability:** mobile-first layout, verified at 375 px width; all 6 inputs reachable without navigation.
- NFR-4 **Maintainability:** inference engine is pure TypeScript with no runtime dependencies beyond the UI animation library.
- NFR-5 **Theming:** dark-only theme; every surface uses the tokens in [[UI_GUIDELINES]].

## 3. Constraints

- C-1 **Framework:** Next.js 16.3.4 (App Router), React 19.2.8 — no downgrade without ADR.
- C-2 **Language/styling/motion:** TypeScript strict, Tailwind CSS v4, Framer Motion 13.2.0.
- C-3 **Stateless:** no storage, no API routes, no persistence; working memory exists only per run in component state.
- C-4 **Single route:** `/` only; adding a route requires an ADR.
- C-5 **Toolchain/verification:** Node 22, npm 11; verify with `npm run build` and `npm run lint` — no reliance on stale memory.
- C-6 **Academic:** exact copy in two places — the header subtitle sentence and the footer two-liner (disclaimer + author Ken Cedrick Jimeno); the banner component itself is retired; due 2026-09-11 17:00.
- C-7 **Theme:** dark-only per [[UI_GUIDELINES]]; no light mode.

## 4. Out of Scope

- Real medical diagnosis or use (explicit academic-exercise boundary).
- Persistence, accounts, backend, or any network calls.
- Additional diseases, rules beyond the 12, or rule editing UI.
- i18n, light mode, SSR/SEO optimization.
- Vercel deployment as a graded deliverable (optional, deferred).
- Automated test runner; verification is console checks + `npm run build` + `npm run lint` (see [[TASKS]] Phase 5).
