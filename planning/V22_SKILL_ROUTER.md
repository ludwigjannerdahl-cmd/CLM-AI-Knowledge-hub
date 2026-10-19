# V22 Skill Router — progressive disclosure for Astra

## Intent

Do not preload the entire Sensemaking & Explanation Architecture package for every visual task.

The semantic contract is always active. Skills are loaded only when the current problem needs them.

## Always active

Read:

- `planning/ASTRA_DESIGN_CONTRACT_V22.md`
- the current scene brief;
- the factual/source objects needed for that scene;
- the relevant entries in `planning/V22_REFERENCE_ATLAS.md`.

Do not load the full visualization catalogue by default.

## Router

### A. The scene structure itself is unclear

Use when the hard question is: **what is actually going on, what concepts matter, and which relationships must survive?**

Load only:

- Sensemaking method;
- relationship vocabulary if relationship semantics are unstable;
- source/authority material required for the scene.

Output before design:

- competency question;
- semantic spine;
- material uncertainty;
- false-inference risks.

Then stop reading method files unless another gap emerges.

### B. The semantic structure is known but the geometry is unclear

Use when the hard question is: **what should the viewer be able to work out from the scene, and what representation makes that cheap?**

Load:

- Visual Grammar;
- only the relevant subset of Frame Catalog families.

Do not browse every frame.

Examples of routed families:

- `trace` → trace overlay / swimlane / dependency path / impact chain;
- `compare` → aligned comparison / small multiples / matrix;
- `diagnose` → constraint/dependency view / BowTie / counterfactual scenarios;
- `explain` → causal chain / state transition / layered transformation;
- `decide` → decision table / argument map / consequences.

The model may reject all listed frames and create another faithful geometry if it can explain why.

### C. The visual is correct but the story feels flat

Use when the hard question is: **how should understanding unfold and remain memorable?**

Load:

- Narrative & Memory.

Use for:

- sticky narrative scenes;
- progressive reveal;
- misconception repair;
- transitions from editorial orientation to dense inspection.

Do not convert every page into scrollytelling.

### D. The page supports a recommendation or product decision

Use when the hard question is: **why should the reader act, choose or challenge?**

Load:

- Argument & Decision.

Use for:

- portfolio/value views;
- bounded-next-decision pages;
- evidence/recommendation structures.

Do not use argument maps for ordinary explanatory pages.

## Selection discipline

For each major view, record only:

- competency question;
- reasoning operation;
- selected visual idea;
- false-inference risk;
- deliberately suppressed detail.

If a skill does not materially improve one of these, do not load it.

## Anti-patterns

Do not:

- use the frame catalogue as a coverage checklist;
- create one example of every diagram family;
- force one visual grammar across every reasoning operation;
- keep adding method documents to the prompt because a previous model struggled;
- make Astra explain the methodology when the design task is already clear;
- let methodology become the visual identity of the Hub.

## Principle

**Protect the semantic core. Keep the model's solution space open.**