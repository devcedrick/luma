---
status: living
tags: [changelog]
---

# Luma - Changelog

Entries state *what* changed; `[ADR-XXXX]` references carry *why*.

## [Unreleased]

## [1.0.0] - 2026-09-11

### Added

- Forward-chaining inference engine: 12 production rules, fixpoint loop, seeded working memory, 5 deterministic test presets.
- Full single-route UI: validated six-input form, preset bar, guarded run with loading state, animated inference trace, working-memory chips, diagnosis card, accessible About dialog, academic footer.
- Motion pass: staggered entrances, exit transitions, focus management, responsive two-column layout.

### Removed

- Academic banner component and FR-4.1; the banner sentence is reused as the header subtitle and the disclaimer consolidated in the footer (FR-4.2, C-6).
- In-page anchor About pattern replaced by the About dialog (FR-4.3).

### Changed

- Resolved vault TBDs: temperature block-plus-warn rule (FR-1.4), filtered-causal diagnosis derivation (FR-3.3).

## [0.0.0] - 2026-09-10

### Added

- Initial Next.js 16.3.4 scaffold (App Router, TypeScript strict, Tailwind v4, ESLint 9) with Framer Motion 13.2.0.
- Project `docs/` vault (vision, requirements, data model, architecture, tasks, UI guidelines, decisions, changelog, ADR template).
