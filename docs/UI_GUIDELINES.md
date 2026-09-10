---
status: draft
tags: [ui, guidelines]
---

# Luma - UI Guidelines

Dark-only, single-screen companion to [[ARCHITECTURE]] §5 and [[REQUIREMENTS]] C-7/NFR-5. Components import no DB/AI code (there is none — C-3); motion imports stay in components per [[ARCHITECTURE]] §1 rule 4.

## Layout + spacing

- Tailwind utilities only; page is a centered single column, mobile-first (NFR-3, verify 375 px).
- Sections stack: header → test bar → form → run → trace → memory → diagnosis → footer (see [[PROJECT]] flow).
- Form uses a 2-column grid on desktop, stacked on mobile. Consistent `gap` scale; no custom CSS except tokens.
- Escape hatch: custom CSS only in `globals.css` for tokens/fonts; component-level `<style>` is forbidden.

## Tokens (dark-only; no light column by design)

| Token | Value | Job |
| :---- | :---- | :-- |
| `--bg` | `#0F1117` | page base |
| `--surface` | `#1A1D27` | card backgrounds |
| `--border` | `#2A2D3A` | subtle separators |
| `--accent` | `#7C9EFF` | inference highlight, links |
| `--accent-dim` | `#3D5099` | muted chips/badges |
| `--text` | `#E8EAF0` | primary text |
| `--text-muted` | `#6B7089` | secondary text |
| `--fired` | `#4ADE80` | rule-fired indicator |
| `--conclusion` | `#FBBF24` | diagnosis highlight + glow |

Fonts: Inter 700 for display/headings; JetBrains Mono for fact names, rule IDs, working-memory output.

## Component visual contracts

- `Header`: mascot mark + short brand title; subtitle carries the academic-purpose sentence (exact C-6 copy); title fade-in + slide-up once on load; About anchor link smooth-scrolls to the in-page section (FR-4.3).
- `TestCaseBar`: five equal buttons in a wrapping row; active-case state uses `--accent-dim`.
- `InputForm`: labeled controls — temperature numeric input (°C), nasal select (none/light/heavy), four Yes/No radio groups; empty/non-numeric temperature blocks the run with an inline message, values outside 30–43 °C warn without blocking; Enter submits through the same guarded run path (FR-1.4).
- `RunButton`: full-width-ish CTA; loading shows spinner + pulse, disables repeat clicks; disabled while temperature is empty (FR-1.4 block).
- `InferenceTrace`: vertical timeline; each card has a `--fired` left-border accent, mono `Rule N → conclusion` line, iteration badge.
- `WorkingMemoryPanel`: wrapping cloud of mono pill chips; facts only, no prose.
- `DiagnosisCard`: single bold moment — `--conclusion` amber ring + soft glow pulse after chips land.
- `Footer`: muted, centered; author + exact C-6 copy.

## Animation table (Framer Motion)

| Trigger | Element | Animation |
| :------ | :------ | :-------- |
| Page load | Header title | Fade + slide up, once |
| Run clicked | Button | Pulse + spinner |
| Results land | Trace container | Fade in from below |
| Per card | Fired-rule cards | Slide from left, 80 ms stagger |
| Per chip | Fact chips | Scale from 0.8, 40 ms stagger |
| After chips | Diagnosis card | Delayed entrance + glow pulse |
| Reset / new run | Result sections | `AnimatePresence` fade-out |

APIs: `motion.div` (`initial`/`animate`/`exit`), `AnimatePresence`, `variants` + `staggerChildren`, `useAnimation` in `RunButton`.

## States

- Pre-run: form + presets interactive; trace/memory/diagnosis absent (not empty boxes).
- Loading: button spinner; inputs stay editable (inference is synchronous).
- Results: trace → chips → diagnosis enter in that order.
- Reset: all result sections exit together; form values preserved.
