---
status: accepted
tags: [index]
---

# Luma - Docs Home

Vault index. Start with [[PROJECT]], then [[REQUIREMENTS]]. Build from [[TASKS]]; check shapes in [[DATA_MODEL]] and modules in [[ARCHITECTURE]]; style from [[UI_GUIDELINES]].

## Core notes (`accepted` — frozen, change via ADR)

- [[PROJECT]] — vision, features, stack, user flow, routes, structure.
- [[REQUIREMENTS]] — owns all FR/NFR/C IDs; constraints; out of scope.
- [[DATA_MODEL]] — entities, TS contracts, mapping, query contracts, acceptance.
- [[ARCHITECTURE]] — layers, route map, module contracts, flows, traceability.
- [[TASKS]] — phased build order with done-criteria (`draft` until build starts).
- [[UI_GUIDELINES]] — tokens, component contracts, animation table, states (`draft` until build starts).

## Dynamic notes

- [[DECISIONS]] — decision summaries (`living`; read summary, then load one ADR, never all).
- [[CHANGELOG]] — release history (`living`; *what* changed, ADR refs carry *why*).

Conventions: flat `docs/*.md`, `UPPERCASE.md` filenames, wikilink-style links, frontmatter `tags:`. Single ownership per Step 2 of the vault spec — cross-reference by ID, never copy tables.
