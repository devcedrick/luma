---
status: draft
tags: [ui, guidelines]
---

# Luma - UI Guidelines

Dark-only, single-screen companion to [[ARCHITECTURE]] §5 and [[REQUIREMENTS]] C-7/NFR-5. Components import no DB/AI code (there is none — C-3); motion imports stay in components per [[ARCHITECTURE]] §1 rule 4.

## Layout + spacing

- Tailwind utilities only; page is a centered column, mobile-first (NFR-3, verify 375 px). `main` splits into two columns at `lg`: inputs + run controls sticky left, results right; stacked below `lg`.
- Sections stack: header → test bar → form → run → trace → memory → diagnosis → footer (see [[PROJECT]] flow).
- Form uses a 2-column grid on desktop, stacked on mobile. Consistent `gap` scale; no custom CSS except tokens.
- Escape hatch: custom CSS only in `globals.css` for tokens/fonts; component-level `<style>` is forbidden.

## Tokens (dark-only; no light column by design)

| Token | Value | Job |
| :---- | :---- | :-- |
| `--bg` | `#0A0E14` | page base (clinical obsidian slate) |
| `--surface` | `#121822` | card backgrounds (clinical cadet slate) |
| `--border` | `#1E293B` | subtle separators (precision slate) |
| `--accent` | `#0EA5E9` | inference highlight, links (clinical cerulean) |
| `--accent-dim` | `#0C4A6E` | muted chips/badges (deep telemetry cyan) |
| `--text` | `#F1F5F9` | primary text (high-legibility clinical slate) |
| `--text-muted` | `#94A3B8` | secondary text (clinical notes slate) |
| `--fired` | `#10B981` | rule-fired indicator (telemetry emerald) |
| `--conclusion` | `#F59E0B` | diagnosis highlight (diagnostic alert amber) |

Fonts: Inter 700 for display/headings; JetBrains Mono for fact names, rule IDs, working-memory output.

## Component visual contracts

- `Header`: bordered card with framed mascot mark, short brand title + badge, engine tagline; C-6 sentence in an info box; title fade-in + slide-up once on load; button-style About anchor smooth-scrolls to the in-page section (FR-4.3).
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
