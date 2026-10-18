# Delivery contract — CLM AI Knowledge Hub

This repository builds **one evolving internal explanatory website**. The website is the product. The ontology, source register, tests and CI are supporting instruments, not competing deliverables.

## User intent to preserve
- Help a mixed business/technical audience understand **what CLM AI does, why, how, under what conditions, and how the parts connect**.
- Cover business work (Run, Develop, Govern & Change, Manage), Fen-X, policy/meaning, AI methods, governed context/data, platforms, human decisions, controls, evaluation, people/adoption, portfolio, and evidence.
- Preserve and develop the 13 integrated chapter bodies and the strongest existing V22 visual compositions. Do **not** substitute a simplified marketing landing page or a new isolated ontology explorer.
- Make the homepage legible; let users drill into exact sources and deeper technical detail. Complexity remains available without being presented all at once.
- Reuse stable object IDs, source status, versions, authority and conditional relationships. Proposed/illustrative is never presented as approved/current/observed.

## Semantic model to web contract
1. Start from a concrete reader operation: **trace, compare, explain, diagnose or decide**.
2. Derive curated projections from `src/data.js` and `src/explanation-data.js`, not view-local duplicate claims. The V22 homepage traces use `D.connectionTraces`.
3. Connect business outcomes, work, institutional meaning, requirements, execution, human decisions and evidence using **labelled relationships**. Do not use generic graph connectivity as success evidence.
4. Give every consequential example a source/meaning boundary and at least one falsification or failure case. An instruction candidate is not approved; a test case is not a run; a source pointer is not verification.
5. Retain `src/chapters.json` and existing route/topic IDs. Never rewrite a substantial chapter solely to fit a layout.
6. Design for a general reader first; use familiar labels, guided examples and inline explanations, with details and source provenance on demand. Do not remove expert depth to obtain simplicity.

## Implementation discipline
- Work against the **latest verified richer product baseline**, not stale `main` merely because it is the default. Compare refs before changes.
- Change `src/` canonically; run `npm run build`, `npm test` and `npm run check`. Validate the **actual browser** at desktop, tablet and mobile. Screenshots and links are evidence; unit test counts alone are not.
- Deliver an accessible *reviewable webpage* early, improve it in place and maintain visual continuity. No new standalone ontology packages unless explicitly requested.
- In status reports distinguish commit, successful CI, built artifact, deployed URL and independently validated user comprehension. Never conflate them.
- Do not introduce internal SEB files or additional potentially confidential facts into the **public** repository. Repository/source permissions and intended hosting boundary require explicit resolution before public promotion. A public GitHub Pages site is not an internal access-controlled site.
- Named business ownership, regulatory interpretations, environment status, tested integrations and operational readiness require actual evidence. Preserve unknowns.
- Treat user feedback on design and explanations as product input and keep stable semantic IDs while iterating.

## Release demonstration
A reviewer should be able to:
- explain the CLM AI environment from the overview without learning ontology terminology;
- follow a synthetic KYC observation through source, correct subject/field meaning, proposed output and human review;
- trace a requirement and a change candidate to mapping, proposed tests and missing observed results;
- find the relevant governance or data dependency and understand what the Hub does **not** claim;
- open a deeper source/topic and return without losing their task;
- use the same functions at mobile and desktop widths.

If a change cannot demonstrate a better reader inference, a resolved defect or retained capability, do not call it product progress.
