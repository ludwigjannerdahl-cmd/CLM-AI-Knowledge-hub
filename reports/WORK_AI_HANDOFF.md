# Work coding AI handoff

## Start here

Read `README.md`, both files under `planning/` named FINAL_BUILD_PLAN_FOR_ASTRA and VISUAL_AND_CONTEXT_DIRECTION, and the implementation/migration/validation records. The site is an implemented review build, not a mockup or a plan awaiting construction. No Astra-specific hosting, session connector or model is needed to build it.

Run `npm run build`, `npm test`, and `npm run check` with Node 20+. Open `docs/index.html` in an authorised preview, or `docs/OPEN_ME_FIRST.html` directly. The source has no package dependencies. Use the actual environment's permitted browser path; do not infer that a previous environment's restrictions or capabilities still apply.

## Architecture

- `src/data.js`: authored narrative, stable object identities, provenance records, path definitions and conditions.
- `src/chapters.json`: integrated full topic content; HTML is already sanitised and qualified. Panels and full chapters share stable source identities.
- `src/source-texts.json`: full supplied strategy/method text for native source reading. Source downloads are allowlisted in the build script.
- `src/model.js`: scenario reasoning, routing, chapter ancestry, search and defensive storage helpers.
- `src/scoping.js`: deterministic advisory engine, immutable initial suggestion, amendments and one effective export/display projection.
- `src/views.js`: overview, work, meanings, conditions, decision and full reading templates.
- `src/app.js`: shared navigation, history/scroll/focus, inspection, search, notes, exports and tool interaction.
- `src/styles.css`: V16-derived green/editorial language and responsive compositions. Request approved local SEB font faces; do not impersonate the missing font.
- `scripts/build.mjs`: deterministic static output under `docs/`; no network or live system access.

## Where to work next

The immediate remaining work is native/browser and reader acceptance. Use the acceptance sequence in `reports/VALIDATION.md`. Repair observed failures in source and regenerate the site. Do not replace the integrated chapters with a reference drawer or a second app to simplify the layout.

Preserve task/subject selection, scenario assumptions, object IDs, full depth, source return and history. A new example should reuse the content model and view patterns rather than creating a new global chapter. Classify new claims by actual source scope and status.

## Focused context requests for the Hub-authoring AI

The supplied Mentor packet already established its role as a personal VS Code author/retrieval context. Do not request that context again, confuse it with PWMFO Presentation Partner, or imply the static Hub runs it. Retrieve only missing primary material:

- The current NP field lookup and exact applicable SOP/policy passage; verified aliases between journey and judgement-field names.
- Current named extraction/integration implementation, production status and control evidence if the Hub is to describe those as current facts.
- The original SEB–Bain model's denominator, scope, assumptions and date before presenting a benefit calculation.
- Current workload-specific governance/classification authority, approval-condition closure, identities and data routes.
- Named responsibility for the bounded reuse test and the actual Automation Legal Entities dependencies/scope. Work in progress does not establish a new deadline.

Require source/version, relevant passage, scope and unresolved points. Memory and reported code findings are context, not approval evidence. Keep private builder packets out of public distribution.

## Release boundary

The intended Pages source is `main:/docs`, but the site is not published by this package. Check internal-material access and private-repository Pages eligibility before enabling publication. Do not change repository visibility to get around a plan restriction. No live enterprise connection or operational action is included.
