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
- FR-1.4: `TBD` — validation/degrade rule for the temperature field (empty, non-numeric, or out-of-range input). Must be decided before build; never silently drop input.

### FR-2 Inference engine

- FR-2.1: System seeds working memory with raw inputs as facts before inference (`src/lib/inference.ts` `seedWorkingMemory`; see [[DATA_MODEL]] §2).
- FR-2.2: System forward-chains across all 12 rules, iterating until fixpoint (no new facts) (`src/lib/inference.ts` `forwardChain`, `src/lib/rules.ts`).
- FR-2.3: System records fired rules in firing order with iteration numbers (`FiredRule`; see [[DATA_MODEL]] §2).
- FR-2.4: System exposes the final working memory contents after halt (`forwardChain` return; see [[DATA_MODEL]] §5).

### FR-3 Results display

- FR-3.1: User can view the chain of fired rules in order, one animated card per rule (`src/components/InferenceTrace.tsx`).
- FR-3.2: User can view all final working-memory facts as chips (`src/components/WorkingMemoryPanel.tsx`).
- FR-3.3: User can read the highlighted final recommendation (`src/components/DiagnosisCard.tsx`). `TBD` — conclusion-derivation rule (which fact wins when several terminal facts exist). Must be decided before build.
- FR-3.4: User can reset the run; result sections clear with an exit animation (`src/hooks/useInference.ts`, `AnimatePresence`).

### FR-4 Academic framing

- FR-4.1: System shows the persistent academic banner with the exact Section 14 copy (`src/components/AcademicBanner.tsx`).
- FR-4.2: System shows the footer with author name Ken Cedrick Jimeno and the exact Section 14 copy (`src/components/Footer.tsx`).
- FR-4.3: `TBD` — About entry point behavior (header shows About; route vs modal vs section undecided).

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
- C-6 **Academic:** exact banner/footer copy from plan Section 14; author Ken Cedrick Jimeno; due 2026-09-11 17:00.
- C-7 **Theme:** dark-only per [[UI_GUIDELINES]]; no light mode.

## 4. Out of Scope

- Real medical diagnosis or use (explicit academic-exercise boundary).
- Persistence, accounts, backend, or any network calls.
- Additional diseases, rules beyond the 12, or rule editing UI.
- i18n, light mode, SSR/SEO optimization.
- Vercel deployment as a graded deliverable (optional, deferred).
- Automated test runner; verification is console checks + `npm run build` + `npm run lint` (see [[TASKS]] Phase 5).
