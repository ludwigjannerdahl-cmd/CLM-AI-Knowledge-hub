# V22 integrated runtime pass

## Exact candidate

Branch: `v22-visual-ambition`

Validated head: `b19387378ba091682d45495c5a7abe59ca27d9d9`

Base: verified V21 branch `v21-design-coherence`.

GitHub Actions run: `38787606238` (`V22 runtime validation`).

## What changed

V22 adds `src/visual-ambition.css` as an authored production layer after V21 coherence CSS and before the builder-only Design Lab styling. The build script now includes that layer in generated `docs/assets/styles.css` and the standalone review build.

The production runtime remains the same semantic application. No new CLM facts, object IDs, source text, ownership, approval, readiness, integration or observed outcome were added by this visual pass.

## Validation evidence

The exact candidate passed:

- static build generation;
- verification that the V22 visual layer is present in generated CSS;
- inherited model/controller tests;
- route and semantic structure checks;
- generated HTML audit;
- the inherited V21 Playwright browser regression;
- canonical V22 render capture in Chromium.

Seven V22 render states were checked for page errors and horizontal overflow:

- Overview — 1600 px desktop;
- Develop CLM — 1600 px desktop;
- Govern/change — 1600 px desktop;
- Knowledge — 1600 px desktop;
- Conditions — 1600 px desktop;
- Evidence — 1600 px desktop;
- Overview — 390 px mobile.

All seven recorded `scrollWidth == clientWidth`, no page errors and status `pass`.

The full render artifact is `v22-runtime-renders`, artifact ID `11998532740` on run `38787606238`.

## Rendered visual review

### Overview

Observed improvement:
- stronger editorial opening hierarchy;
- broader work-centred composition rather than an AI-layer diagram;
- materially differentiated context, contribution and output objects;
- more deliberate negative space and fewer visible container boundaries;
- review, authority and possible reuse remain separate.

Remaining gap:
- the visual field is intentionally restrained and still less illustrative than the most ambitious generated reference boards;
- the reference boards achieve additional character through bespoke illustration/imagery and richer art direction that should not be copied blindly into a public, source-disciplined runtime.

### Develop CLM

Observed improvement:
- the source folio, requirement sheet and adverse-test margin read as three related but non-equivalent artifacts;
- overlap and material treatment create hierarchy without relying on decorative card grids;
- missing implementation/result remains explicit;
- human framing, AI assistance and human/controlled verification form a visible responsibility rail.

Judgement: currently the strongest V22 canonical composition and suitable as a grammar source.

### Govern/change

Observed first state:
- large editorial framing and clean version comparison;
- historical/current state remains explicit;
- human responsibility and source/evidence boundaries remain intact.

Remaining gap:
- the automated screenshot is the baseline state before the proposed handoff revision is enabled, so it does not yet demonstrate the full version -> impact -> evidence-boundary composition. This surface should not be visually accepted on the baseline screenshot alone.

### Knowledge

Observed improvement:
- the three knowledge stages have distinct material treatments and clearer progression;
- the page still reads as knowledge/method structure, not as a source-of-wealth product;
- reuse remains a maintained responsibility rather than automatic compounding.

Remaining gap:
- deeper parts of the page intentionally return to denser product-reading patterns. This is appropriate for inspection, but the transition should continue to be checked for coherence with the more expressive orientation views.

### Conditions

Observed improvement:
- routes read as operational alternatives rather than one settings panel;
- missing interface affects only the live route;
- supplied-document work remains possible;
- record change remains explicitly outside the demonstration.

Judgement: strong reasoning representation; less visually theatrical than the generated boards by design.

### Evidence

Observed improvement:
- evidence is a material record before it is an interpretation;
- the visual makes the lack of an observed pass dominant;
- the version boundary is hard to miss;
- candidate revision does not inherit evidence automatically.

Judgement: strong and semantically safer than the generated reference boards.

### Mobile

Observed:
- no horizontal overflow;
- the desktop overlap dissolves into an ordered sequence;
- the previous prototype's visible programmatic-heading focus box is absent;
- context, contribution, output, review, reuse, conditions and discovery remain reachable.

The page is long, but that is preferable to shrinking the desktop composition into unreadable miniature geometry.

## Decision

The first production visual-ambition layer is technically sound and materially closer to the supplied art-direction bar. It also demonstrates that the visual grammar can cover several Hub reasoning families without making Source of Wealth the product ontology.

Do **not** merge V22 yet solely on this pass. The next acceptance evidence should cover the expanded Govern/change state and then compare the three golden surfaces — Overview, Develop CLM and expanded Govern/change — against the supplied reference families. If those pass, the visual grammar can be treated as accepted for broader propagation.
