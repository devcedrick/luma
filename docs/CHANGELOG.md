---
status: living
tags: [changelog]
---

# Luma - Changelog

Entries state *what* changed; `[ADR-XXXX]` references carry *why*.

## [Unreleased]

### Removed

- Academic banner component (`src/components/AcademicBanner.tsx`) and FR-4.1 retired; the banner sentence is reused as the header subtitle and the disclaimer consolidated in the footer (FR-4.2, C-6).

### Changed

- Resolved vault TBDs: About as in-page anchor section (FR-4.3), temperature block-plus-warn rule (FR-1.4), filtered-causal diagnosis derivation (FR-3.3).

## [0.0.0] - 2026-09-10

### Added

- Initial Next.js 16.3.4 scaffold (App Router, TypeScript strict, Tailwind v4, ESLint 9) with Framer Motion 13.2.0.
- Project `docs/` vault (vision, requirements, data model, architecture, tasks, UI guidelines, decisions, changelog, ADR template).
