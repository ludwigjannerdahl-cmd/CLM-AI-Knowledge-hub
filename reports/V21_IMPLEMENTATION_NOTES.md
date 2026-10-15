# V21 implementation notes

## Direction

V21 freezes Figma as an exploratory artifact and moves design-system authority back into the runtime. The runtime now owns both implementation and visual-system QA.

## Why

Maintaining a parallel whole-product Figma model created another translation layer without resolving the main remaining risks: browser composition quality, deep-page consistency, responsive behaviour and reader comprehension.

## Design Lab enhancement

`#/design-system` is intentionally excluded from the main navigation. It is now an acceptance workbench rather than a static style catalogue.

The enhancement adds practical value by exercising the real product grammar:

- competency questions define what a representation must help a reader understand;
- semantic stress tests keep source-linked/verified, reviewed/approved, structured/executable, runtime/interface, interface/permission and useful/reusable distinct;
- live `workIllustration`, `transformation`, `conditionRoutes`, `relationshipExplorer`, `skillAnatomy` and `evaluationTrace` specimens reuse the same explanation components as the reader-facing Hub;
- work-domain, knowledge-stage and operating-condition controls use the existing application state and actions;
- the relationship specimen reuses the production depth/view controls and preserves typed direction;
- whole-product coverage links directly into Overview, Run, Develop, Govern/change, Knowledge, Conditions, Source, Relationships and Evidence;
- interaction contracts describe what understanding must change when the user acts;
- responsive examples define semantic re-projection instead of shrink-to-mobile behaviour;
- falsification checks explicitly guard against SOW overfitting, two design systems, card soup, visual theatre, claim inflation, utility takeover and mobile shrinkage;
- promotion gates keep source/model, rendered-product and reader-comprehension evidence separate;
- implementation invariants keep `src/` authoritative and `docs/` generated.

## Runtime integration

The Design Lab script is loaded after the base views and before `app.js`. On load it:

1. extends the normal route parser with `#/design-system`;
2. wraps the existing view factory;
3. renders the Lab through the normal application controller, state, history and event system;
4. leaves all non-Lab routes delegated to the original renderer.

This avoids a second mock-up runtime and means component/state failures found in the Lab should be fixed in shared production code.

## Build and structural checks

`scripts/build.mjs` preserves the required load order in both modular and standalone output.

`scripts/check.mjs` is extended to:

- load the Design Lab before view creation;
- execute `#/design-system` through the route parser;
- assert the presence of competency, stress, coverage and promotion sections;
- assert live work-domain, knowledge-stage and condition controls;
- execute Run / Develop / Govern-change Lab variants;
- execute readable / structured / consumed Lab variants;
- include Design Lab coverage in the structure report.

A branch-scoped workflow, `.github/workflows/v21-validate.yml`, now runs the actual build and checks without publishing or changing repository access.

## Validation evidence

GitHub Actions run `38744037359` on commit `a511e39667dac068023393f3302284e2b0c3f2de` completed successfully.

The following steps passed in the repository checkout:

- static build;
- model and controller tests;
- route and semantic structure checks, including the Design Lab route and live specimens;
- generated HTML audit.

The workflow has read-only repository permissions and does not deploy or commit generated output.

## Remaining evidence gates

The successful CI run establishes source/build/model integrity for this V21 enhancement. It does **not** establish browser-rendered visual quality, native keyboard/history behaviour, responsive composition quality or reader comprehension.

Those remain separate acceptance gates. The branch should stay draft until rendered comparison and reader testing are complete.

The V20 base advanced to V20.1 during this work, so the stacked V21 branch also needs to be reconciled with that newer base before merge. Do not treat the passing V21 CI run as evidence that the branch already includes the V20.1 reading-continuity changes.
