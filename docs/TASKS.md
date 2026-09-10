---
status: draft
tags: [tasks, build-order]
---

# Luma - Tasks

Build order with done-criteria only. Logic lives in [[REQUIREMENTS]], [[DATA_MODEL]], [[ARCHITECTURE]], [[UI_GUIDELINES]] — this file never redefines it. Every box cites an FR/C.

## Phase 0 — Inference foundation (no UI)

- [ ] T0.1 `src/lib/types.ts` — per [[DATA_MODEL]] §2 (FR-2.1–FR-2.4). Done: file matches contracts block exactly.
- [ ] T0.2 `src/lib/rules.ts` — encode Rules 1–12 as `Rule` objects in id order (FR-2.2). Done: 12 entries, descriptions match plan rules.
- [ ] T0.3 `src/lib/inference.ts` — `seedWorkingMemory` + `forwardChain` fixpoint loop (FR-2.1, FR-2.2). Done: implements [[ARCHITECTURE]] §3 signatures.
- [ ] T0.4 Console check — run all 5 `TEST_CASES` inputs through `forwardChain`, compare against [[DATA_MODEL]] §6 outcomes (NFR-1). Done: 5/5 match, iteration numbers non-decreasing.
- [ ] T0.5 `src/lib/testCases.ts` — 5 presets with labels + expected outcomes (FR-1.2). Done: values match plan table.

## Phase 1 — Static shell (no behavior)

- [ ] T1.1 ~~`src/components/AcademicBanner.tsx` — sticky bar, exact C-6 copy (FR-4.1). Done: copy matches character-for-character.~~ **Removed:** banner component deleted; disclaimer consolidated in the footer (T1.3).
- [ ] T1.2 `src/components/Header.tsx` — mascot mark, short brand title, academic-purpose subtitle sentence (exact C-6 copy), About anchor link (FR-4.3). Done: renders per [[UI_GUIDELINES]].
- [ ] T1.3 `src/components/Footer.tsx` — author + exact C-6 copy (FR-4.2). Done: copy matches.
- [ ] T1.4 `src/components/InputForm.tsx` static layout — six labeled inputs, uncontrolled ok at this stage (FR-1.1). Done: all fields visible at 375 px (NFR-3).
- [ ] T1.5 Tokens — `globals.css` CSS vars + Tailwind wiring per [[UI_GUIDELINES]] (C-7, NFR-5). Done: token table values render.

## Phase 2 — State + run wiring (no animations yet)

- [ ] T2.1 `src/hooks/useInference.ts` — inputs, `applyPreset`, `run`, `reset`, `isLoading`, `hasRun` (FR-1.2, FR-1.3, FR-3.4). Done: preset fills form and clears prior results.
- [ ] T2.2 Wire `InputForm` controlled + `TestCaseBar.onSelect` (FR-1.1, FR-1.2). Done: every keystroke/selection reflects in state.
- [ ] T2.3 Wire `RunButton` loading state around synchronous `forwardChain` (FR-1.3). Done: spinner shows per run.
- [ ] T2.4 Temperature rule — `input[type=number]`; block empty/NaN with an inline message; warn outside 30–43 °C; any numeric runs (FR-1.4). Done: behavior documented in [[DATA_MODEL]] §2 rules paragraph.
- [ ] T2.5 `page.tsx` composition — header, test bar, form, button, result slots (FR-1.1–FR-4.2). Done: single `/` renders end-to-end without animation.

## Phase 3 — Results components

- [ ] T3.1 `src/components/InferenceTrace.tsx` — ordered fired-rule cards (FR-3.1). Done: card count equals `firedRules` length, order matches.
- [ ] T3.2 `src/components/WorkingMemoryPanel.tsx` — fact chips for final memory (FR-3.2). Done: chip set equals `finalMemory`.
- [ ] T3.3 `src/components/DiagnosisCard.tsx` — highlighted recommendation (FR-3.3). Derivation: disease/decision terminals in rule-id order, fever/nasal fallback. Done: output matches all 5 [[DATA_MODEL]] §6 outcomes.
- [ ] T3.4 Reset path — `reset()` clears results; sections unmount (FR-3.4). Done: returns to [[DATA_MODEL]] §6 empty-state.

## Phase 4 — Motion + responsive polish

- [ ] T4.1 Entrance stagger — trace 80 ms slide-in, chips 40 ms scale, delayed diagnosis glow, header fade, button pulse (FR-3.1–FR-3.3 per [[ARCHITECTURE]] Flow D). Done: matches animation table in [[UI_GUIDELINES]].
- [ ] T4.2 Exit transitions — `AnimatePresence` fade-out on reset/new run (FR-3.4). Done: no instant unmount flashes.
- [ ] T4.3 Responsive pass at 375 px — form grid stacks, trace cards full-width (NFR-3). Done: no horizontal scroll, all controls reachable.
- [ ] T4.4 About section — in-page anchor section plus header smooth-scroll link (FR-4.3). Done: link scrolls to section; no new route.

## Phase 5 — Verification + hardening (C-5, NFR sweep)

- [ ] T5.1 `npm run build` passes with zero errors.
- [ ] T5.2 `npm run lint` passes with zero findings.
- [ ] T5.3 5-case determinism re-check against [[DATA_MODEL]] §6 (NFR-1).
- [ ] T5.4 Disclaimer copy audit — header subtitle + footer match C-6 exactly (FR-4.2).
- [ ] T5.5 NFR sweep — NFR-2 (instant runs), NFR-3 (375 px), NFR-4 (no new runtime deps), NFR-5 (dark-only, tokens only).

## Out of scope for this list

Deferred/optional work — see [[REQUIREMENTS]] §4: Vercel deploy, extra rules/diseases, persistence, i18n, light mode, test runner, any second route (needs ADR per C-4).
