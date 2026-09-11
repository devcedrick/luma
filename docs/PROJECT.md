---
status: accepted
tags: [vision]
---

# Luma

Luma is a web-based rule-based expert system built for Intelligent Systems Laboratory Activity #2. It serves BSCS students demonstrating forward-chaining inference: it removes the pain of hand-tracing production rules by accepting six patient observations, running inference across 12 rules to a fixpoint, and presenting an animated step-by-step trace of the reasoning chain plus the final working memory. Academic exercise only — not for real medical use.

## Purpose

- Enter six patient observations in one form (professor requirement 1).
- Seed working memory from raw inputs as facts (professor requirement 2).
- Run forward-chaining inference across all 12 rules (professor requirement 3).
- Show the chain of fired rules in order, animated (professor requirement 4).
- Show the final working memory contents (professor requirement 5).
- State the academic purpose persistently (footer).

## Core Features

| Feature | Description |
| :------ | :---------- |
| Patient input form | User can enter temperature, nasal breathing, headache, cough, sore throat, antibiotics allergy |
| Test case bar | User can load one of 5 preset cases into the form with one click |
| Run inference | User can execute forward chaining and see a loading state on the button |
| Inference trace | User can watch fired rules appear one card at a time, in firing order |
| Working memory panel | User can inspect every fact present after inference halts |
| Diagnosis card | User can read the highlighted final recommendation |
| Academic footer | User always sees the lab-activity disclaimer and author name |

## Tech Stack

- TypeScript (strict) — type safety for rule/fact structures.
- Next.js 16.3.4 (App Router) — familiarity, fast dev, SSR optional.
- Tailwind CSS v4 — utility-first, consistent spacing.
- Framer Motion 13.2.0 — declarative list/step reveals, zero custom keyframes.
- Storage: none — all logic is stateless, working memory lives per run.
- React 19.2.8, Node 22, npm 11.
- Deployment: Vercel (optional, not graded).

## Basic User Flow

1. User opens `/` and sees the header, test case bar, and empty input form.
2. User types the six observations (or clicks a preset case button to fill them).
3. User clicks Run Inference; the button shows a loading state.
4. Inference seeds working memory and forward-chains to a fixpoint synchronously.
5. The inference trace animates in, one fired-rule card at a time (80 ms stagger).
6. Working memory chips animate in (40 ms stagger, scale from 0.8).
7. The diagnosis card enters with a delay and amber glow.
8. User clicks Reset (or a new run) and result sections exit via fade-out.
9. User tries the remaining preset cases to compare reasoning chains.

## Routes

| Route | Title | Behavior |
| :---- | :---- | :------- |
| `/` | Luma — Rule-Based Expert System | Reads form state, runs inference in memory, renders trace + memory + diagnosis. Owns all creation (inputs are entered here; nothing is created elsewhere). |

Rationale: single-screen lab demo. One route keeps the reasoning chain, inputs, and conclusions visible together with no navigation state to manage (see [[REQUIREMENTS]] C-4).

## Project Structure

```text
luma/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # root layout, fonts, metadata
│   │   ├── page.tsx            # route /, composes all sections
│   │   ├── globals.css         # tailwind base + CSS vars (tokens)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Header.tsx          # app name + subtitle + About anchor link
│   │   ├── TestCaseBar.tsx     # 5 preset case buttons
│   │   ├── InputForm.tsx       # six patient inputs
│   │   ├── RunButton.tsx       # CTA with loading state
│   │   ├── InferenceTrace.tsx  # animated fired-rule list
│   │   ├── WorkingMemoryPanel.tsx  # fact chip cloud
│   │   ├── DiagnosisCard.tsx   # final recommendation
│   │   └── Footer.tsx          # author + disclaimer
│   ├── lib/
│   │   ├── types.ts            # PatientInputs, Fact, Rule, FiredRule
│   │   ├── rules.ts            # 12 Rule objects
│   │   ├── inference.ts        # seedWorkingMemory(), forwardChain()
│   │   └── testCases.ts        # 5 preset inputs + expected outcomes
│   └── hooks/
│       └── useInference.ts     # inputs/results/loading/reset state
├── public/                     # static svg assets
└── docs/
    └── PROJECT.md              # this file (see [[HOME]] for the vault index)
```

Notes:

- Stateless by design: no database, no API routes, no persistence (see [[REQUIREMENTS]] C-3).
- Inference engine is pure TypeScript with zero non-UI dependencies.
- About entry point is an in-page anchor section reached from the header link (see [[REQUIREMENTS]] FR-4.3).
- Diagnosis card shows disease/decision terminals in causal order with a fever/nasal fallback (see [[REQUIREMENTS]] FR-3.3).
- Empty/non-numeric temperature blocks the run; implausible values warn without blocking (see [[REQUIREMENTS]] FR-1.4).
