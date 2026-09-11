<div align="center">

  <img src="public/app-mascot.png" alt="Luma Mascot" width="96" height="96" style="margin-bottom: 12px;" />

# Luma

### Deterministic Forward-Chaining Expert System

  <p align="center">
    An automated reasoning engine that applies classic forward-chaining inference over a deterministic production rule base to evaluate patient observations, deduce clinical conclusions, and visually trace the step-by-step reasoning chain to a deductive fixpoint.
  </p>

  <p align="center">
    <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16.3.4-black?style=flat-square&logo=next.js" alt="Next.js" /></a>
    <a href="https://react.dev"><img src="https://img.shields.io/badge/React-19.2.8-blue?style=flat-square&logo=react" alt="React" /></a>
    <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript" alt="TypeScript" /></a>
    <a href="https://tailwindcss.com"><img src="https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=flat-square&logo=tailwindcss" alt="Tailwind CSS" /></a>
    <a href="https://www.framer.com/motion"><img src="https://img.shields.io/badge/Framer_Motion-13.2.0-ff5722?style=flat-square&logo=framer" alt="Framer Motion" /></a>
    <img src="https://img.shields.io/badge/Engine-Deterministic_Pure_TS-10b981?style=flat-square" alt="Pure TypeScript Engine" />
    <img src="https://img.shields.io/badge/Activity-Lab_Activity_%232-f59e0b?style=flat-square" alt="Academic Lab Activity #2" />
  </p>

  <p align="center">
    <a href="#-overview">Overview</a> •
    <a href="#-key-features">Key Features</a> •
    <a href="#-inference-engine--architecture">Inference Engine</a> •
    <a href="#-knowledge-base--production-rules">Knowledge Base</a> •
    <a href="#-test-case-benchmarks">Test Cases</a> •
    <a href="#-project-structure">Project Structure</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-academic-attribution">Attribution</a>
  </p>

</div>

---

## 🔬 Overview

**Luma** is a web-based, rule-based expert system developed for **Intelligent Systems Laboratory Activity #2**.

In classical artificial intelligence, tracing forward-chaining production rules by hand is tedious and error-prone. Luma automates this deductive process by:

1. Ingesting **six clinical patient observations** through a reactive, validated interface.
2. Seeding a volatile **working memory** with initial ground facts.
3. Executing a pure **forward-chaining cycle** across a knowledge base of **12 production rules**.
4. Reaching a **deductive fixpoint** ($\Delta \text{WorkingMemory} = \emptyset$) where no further rules can fire.
5. Projecting a choreographed, step-by-step **inference trace**, the final **working memory fact cloud**, and a highlighted **terminal diagnostic recommendation**.

> [!NOTE]
> **Academic Exercise Only**: This application is submitted as Laboratory Activity #2 for Intelligent Systems. It is an educational demonstration of knowledge representation and automated deduction, and is **not intended for real clinical diagnosis or medical use**.

---

## ✨ Key Features

- ⚙️ **Pure TypeScript Inference Engine**: Fully deterministic, zero-dependency reasoning loop operating completely in-memory without external APIs or database dependencies.
- 📜 **Animated Inference Trace**: Fired rules animate sequentially (80ms stagger), revealing the rule identifier, formal logic condition, iteration pass, and asserted conclusion.
- 🧠 **Dynamic Working Memory Inspector**: Inspect all derived and seeded ground facts represented as distinct monospace chips.
- ⚡ **One-Click Benchmark Presets**: Instant loading of 5 standard test cases (Cases 1–5) designed to exercise distinct deductive pathways and edge scenarios.
- 🩺 **Filtered Causal Recommendations**: Resolves final diagnosis and therapeutic courses in firing-order precedence, with intelligent fallbacks for non-terminal observations.
- 🛡️ **Defensive Physiological Validation**: Live temperature input sanitization with bounds checking and user warnings for non-physiological values outside $30^\circ\text{C} - 43^\circ\text{C}$.
- 🎨 **Modern Cyber-Clinical Aesthetic**: Polished dark-mode palette (`#0a0e14` background, `#121822` surface) with emerald fired indicators, amber terminal highlights, and JetBrains Mono typography.
- ♿ **Accessible Modal Dialog**: Full keyboard navigation, backdrop dismiss, Escape listener, focus trapping, and background scroll locking for the integrated system specification modal.

---

## 🏗️ Inference Engine & Architecture

Luma enforces a strict unidirectional separation of concerns between its deterministic logic core and the presentation layer:

```mermaid
flowchart TD
    subgraph UI ["Presentation Layer (React 19 + Framer Motion)"]
        Form["Patient Input Form (6 Observations)"]
        Presets["Test Case Bar (Presets 1-5)"]
        Trace["Inference Trace View"]
        Memory["Working Memory Inspector"]
        Diagnosis["Recommendation Card"]
    end

    subgraph State ["State Management (React Hook)"]
        Hook["useInference() Hook"]
    end

    subgraph Engine ["Domain & Inference Core (Pure TypeScript)"]
        Seed["seedWorkingMemory()"]
        Rules["Knowledge Base (RULES 1-12)"]
        Loop["forwardChain() Loop"]
        Fixpoint{"ΔWorkingMemory == ∅ ?"}
        Derive["deriveRecommendation()"]
    end

    Presets -->|Populate| Form
    Form -->|Submit Inputs| Hook
    Hook -->|PatientInputs| Seed
    Seed -->|Initial Facts| Loop
    Rules -->|Antecedents & Conclusions| Loop
    Loop --> Fixpoint
    Fixpoint -- No --> Loop
    Fixpoint -- Yes -->|Fired Rules & Final Memory| Derive
    Derive --> Hook
    Hook -->|Render| Trace
    Hook -->|Render| Memory
    Hook -->|Render| Diagnosis
```

### The Forward-Chaining Deduction Cycle

1. **Working Memory Seeding**:
   Initial boolean observations (`headache`, `cough`, `sore_throat`, `antibiotics_allergy`) are immediately asserted into a `Set<Fact>`.
2. **Iterative Multi-Pass Evaluation**:
   On each iteration pass $k$:
   - The engine iterates through the ordered rule set $R_1 \dots R_{12}$.
   - For rule $r$, if its conclusion is **not** already present in working memory and its antecedent condition holds true given current observations and memory state:
     $$\text{condition}(\text{wm}, \text{inputs}) = \text{true} \implies \text{wm} \leftarrow \text{wm} \cup \{\text{conclusion}_r\}$$
   - The fired rule is recorded with metadata including the iteration pass number.
3. **Termination Guarantee (Fixpoint)**:
   Because the set of possible facts is finite ($|\text{Facts}| = 16$) and facts are monotonically added (never retracted), the algorithm is mathematically guaranteed to terminate when an iteration pass produces zero newly fired rules ($\text{firedThisPass} = \text{false}$).

---

## 📖 Knowledge Base & Production Rules

Luma's knowledge base contains **12 production rules** divided into physiological classifiers, primary disease diagnostics, and clinical triage/treatment pathways:

|   ID    | Rule Identifier | Formal Logic Production                                                | Category           | Asserted Fact              |
| :-----: | :-------------- | :--------------------------------------------------------------------- | :----------------- | :------------------------- |
| **R1**  | Rule 1          | `IF temperature <= 37.0 THEN no_fever`                                 | Physiological      | `no_fever`                 |
| **R2**  | Rule 2          | `IF temperature > 37.0 AND temperature <= 38.0 THEN low_fever`         | Physiological      | `low_fever`                |
| **R3**  | Rule 3          | `IF temperature > 38.0 THEN high_fever`                                | Physiological      | `high_fever`               |
| **R4**  | Rule 4          | `IF nasal_breathing = "light" THEN nasal_discharge`                    | Physiological      | `nasal_discharge`          |
| **R5**  | Rule 5          | `IF nasal_breathing = "heavy" THEN sinus_membranes_swelling`           | Physiological      | `sinus_membranes_swelling` |
| **R6**  | Rule 6          | `IF low_fever AND headache AND nasal_discharge AND cough THEN cold`    | Disease Diagnostic | `cold`                     |
| **R7**  | Rule 7          | `IF cold AND NOT sore_throat THEN dont_treat`                          | Clinical Triage    | `dont_treat`               |
| **R8**  | Rule 8          | `IF cold AND sore_throat THEN treat`                                   | Clinical Triage    | `treat`                    |
| **R9**  | Rule 9          | `IF dont_treat THEN dont_give_medication`                              | Action / Triage    | `dont_give_medication`     |
| **R10** | Rule 10         | `IF treat THEN give_medication`                                        | Action / Triage    | `give_medication`          |
| **R11** | Rule 11         | `IF give_medication AND antibiotics_allergy THEN give_tylenol`         | Medication Choice  | `give_tylenol`             |
| **R12** | Rule 12         | `IF give_medication AND NOT antibiotics_allergy THEN give_antibiotics` | Medication Choice  | `give_antibiotics`         |

---

## 🧪 Test Case Benchmarks

The system includes 5 verified test cases mapped directly to lab benchmark specifications:

| Case       | Patient Observations                                                              | Rules Fired (In Order)                                       | Terminal Recommendation                          |
| :--------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------- | :----------------------------------------------- |
| **Case 1** | $36.5^\circ\text{C}$, breathing: `none`, no symptoms                              | `Rule 1`                                                     | `No fever`                                       |
| **Case 2** | $39.0^\circ\text{C}$, breathing: `heavy`, headache, cough, sore throat            | `Rule 3`, `Rule 5`                                           | `High fever, Sinus membranes swelling`           |
| **Case 3** | $37.5^\circ\text{C}$, breathing: `light`, headache, cough, no sore throat         | `Rule 2`, `Rule 4`, `Rule 6`, `Rule 7`, `Rule 9`             | `Cold, Don't treat, Don't give medication`       |
| **Case 4** | $37.5^\circ\text{C}$, breathing: `light`, all symptoms, allergic to antibiotics   | `Rule 2`, `Rule 4`, `Rule 6`, `Rule 8`, `Rule 10`, `Rule 11` | `Cold, Treat, Give medication, Give Tylenol`     |
| **Case 5** | $37.5^\circ\text{C}$, breathing: `light`, all symptoms, **no** antibiotic allergy | `Rule 2`, `Rule 4`, `Rule 6`, `Rule 8`, `Rule 10`, `Rule 12` | `Cold, Treat, Give medication, Give antibiotics` |

---

## 📂 Project Structure

```text
luma/
├── docs/                       # Architecture decisions, requirements, specifications
│   ├── ARCHITECTURE.md         # Layer contracts, data flows, cross-cutting concerns
│   ├── DATA_MODEL.md           # Formal specifications of types, rules, and outcomes
│   ├── PROJECT.md              # Vision, feature table, and user flows
│   └── REQUIREMENTS.md         # Functional and non-functional requirements trace
├── public/                     # Static media & branding
│   └── app-mascot.png          # Luma application mascot
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind CSS v4 design tokens and theme variables
│   │   ├── layout.tsx          # Root layout with Inter & JetBrains Mono typography
│   │   └── page.tsx            # Single-screen dashboard composing all sections
│   ├── components/
│   │   ├── AboutModal.tsx      # Accessible architecture & specifications dialog
│   │   ├── DiagnosisCard.tsx   # Amber glowing terminal recommendation display
│   │   ├── Footer.tsx          # Academic attribution & persistent disclaimer
│   │   ├── Header.tsx          # Branding mark, system badge, and modal trigger
│   │   ├── InferenceTrace.tsx  # Chronological, staggered animated fired rule cards
│   │   ├── InputForm.tsx       # Six controlled patient observation inputs with validation
│   │   ├── RunButton.tsx       # Animated inference action trigger with loading state
│   │   ├── TestCaseBar.tsx     # One-click preset case selector
│   │   └── WorkingMemoryPanel.tsx # Fact chip cloud of post-inference working memory
│   ├── hooks/
│   │   └── useInference.ts     # Stateless run lifecycle & reactive inputs hook
│   └── lib/
│       ├── diagnosis.ts        # Recommendation derivation and fact humanization
│       ├── inference.ts        # Pure forward chaining engine & memory seeding
│       ├── rules.ts            # Production rules knowledge base (12 Rules)
│       ├── testCases.ts        # 5 preset test case definitions
│       └── types.ts            # Core domain contracts (Rule, Fact, WorkingMemory, etc.)
├── package.json
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: `v20.x` or newer (`v22` recommended)
- **npm**: `v10.x` or newer (or `pnpm` / `yarn` / `bun`)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/devcedrick/luma.git
   cd luma
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Quality & Build Checks

To verify code correctness, type integrity, and production bundle packaging:

```bash
# Run ESLint validation
npm run lint

# Build production bundle with Next.js Turbopack
npm run build

# Run production server
npm run start
```

---

## 🎓 Academic Attribution

- **Course**: Intelligent Systems (CSci 141)
- **Assignment**: Laboratory Activity #2 — Rule-Based Forward-Chaining Expert System
- **Developer**: **Ken Cedrick Jimeno** ([@devcedrick](https://github.com/devcedrick))
- **Engine Logic**: Forward chaining to fixpoint ($\Delta \text{WorkingMemory} = \emptyset$)

<div align="center">
  <sub>Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.</sub>
</div>
