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

`scripts/build.mjs` now preserves the required load order in both modular and standalone output.

`scripts/check.mjs` is extended to:

- load the Design Lab before view creation;
- execute `#/design-system` through the route parser;
- assert the presence of competency, stress, coverage and promotion sections;
- assert live work-domain, knowledge-stage and condition controls;
- execute Run / Develop / Govern-change Lab variants;
- execute readable / structured / consumed Lab variants;
- include Design Lab coverage in the structure report.

## Evidence status

The edited JavaScript was syntax-checked before commit. This environment does not provide the repository checkout required to run the full build/test/check/package sequence after the GitHub changes, and it does not establish browser-rendered quality, native keyboard/history behaviour or reader comprehension.

Those remain separate acceptance gates. The branch should stay draft until the full repository build and rendered/reader checks are performed.
