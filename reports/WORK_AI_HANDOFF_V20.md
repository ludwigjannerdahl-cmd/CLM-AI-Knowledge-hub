# V20 handoff

Read `README.md`, `planning/V20_PRODUCT_BRIEF.md`, `reports/IMPLEMENTATION_V20.md`, `reports/CONTENT_BEHAVIOUR_MIGRATION_V20.md` and `reports/VALIDATION_V20.md`.

The complete source and static output are on `v20-visual-system`. Main and the user-published V19 deployment remain separate. Do not merge or deploy on the strength of source tests alone.

## Run

Requires Node 20+ and Python 3; no npm dependencies.

```sh
npm run build
npm test
node scripts/check.mjs --html-snapshots /tmp/clm-v20-html.json
python3 scripts/check-html.py /tmp/clm-v20-html.json
npm run package
```

Open `docs/OPEN_ME_FIRST.html` directly, keeping `sources/` alongside it. `docs/index.html` is the modular Pages entry. Use the current environment's actual authorised browser capability for the outstanding acceptance checks. Do not assume this build environment's capabilities or restrictions apply elsewhere.

## New architecture

`explanation-data.js` extends the shared data registry with work-domain descriptors and seven explicitly synthetic handoff objects. `explanations.js` provides semantic components and explanation patterns. `explanations.css` is the coordinated visual layer over the retained V19 styles. The build combines styles and emits all runtime assets.

The model supplies typed discovery and deterministic bounded relationship expansion. Existing routes stay valid; new routes are `#/relationships/<object-id>` and `#/evidence/<evidence-id>`. Graph distance and list/context mode use query parameters. `#/work/change?case=handoff` is the independent transfer case. Source page/line links use extraction indices, explicitly distinguished from authoritative paragraph numbering.

The shared controller retains meaningful UI state in history snapshots. Object-panel selection also has a query parameter. Local scope exports share the same effective result; incompatible history is retained without being promoted to valid records. A review brief is working material and is not represented as the current SEB model-card template.

## Next acceptance work

Complete the browser and reader tasks in the validation record. Compare all major surfaces with the actual reference deck, especially labels, density, contrast, route interruption, source return and narrow-screen projections. Fix observed failures in source and rebuild. No screenshot evidence was produced in this environment.

Current primary facts still needed for business claims: NP lookup/SOP and field aliases; current integration and approval evidence; the original Bain model assumptions; named reuse responsibility; Automation Legal Entities dependencies. Neither these missing facts nor browser limitations justify inventing status or moving useful content to an archive.
