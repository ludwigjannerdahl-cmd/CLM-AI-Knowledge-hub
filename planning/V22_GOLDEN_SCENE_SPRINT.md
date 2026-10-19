# V22 Golden Scene Sprint — composition before production

## Rule

This sprint is a **design exploration**, not a production implementation sprint.

Do not begin by modifying `src/views.js`, `src/explanations.js`, `src/styles.css`, `src/visual-ambition.css` or other production presentation files.

The existing runtime is evidence of semantics and interaction requirements. It is not the visual solution.

Read first:

1. `planning/ASTRA_DESIGN_CONTRACT_V22.md`
2. `planning/V22_REFERENCE_ATLAS.md`
3. `planning/V22_SKILL_ROUTER.md`
4. relevant semantic/source objects for the scene only.

Canonical design canvas: **1920×1200**.

## Output requirement

For each golden scene, produce **three independently conceived directions**.

They must not be:

- the same DOM rearranged;
- one composition with different colours;
- three card-grid variants;
- literal copies of supplied reference boards.

Each direction should have a distinct governing visual idea and may use different implementation techniques.

Before writing prototype code, write a short design note for each direction:

- `name`
- `reader_question`
- `reasoning_operation`
- `visual_idea`
- `why_geometry_helps`
- `interaction_if_any`
- `false_inference_risk`
- `references_used`
- `what_is_deliberately_not_shown`

Then build the directions as isolated prototypes under `prototypes/v22-composition-lab/`.

No direction is production-approved merely because it renders.

---

# Golden scene 1 — How AI fits into CLM work

## Reader question

How do real CLM work, relevant context, bounded AI assistance, human responsibility, evidence and operating conditions fit together?

## Must preserve

- work is primary, not a generic AI/agent platform;
- AI contribution is expressed through actual work verbs;
- human judgement/authority is positioned where it acts;
- evidence is not decoration or a fake counter;
- operating conditions change what is possible;
- source of wealth is not the global identity;
- no invented current-state maturity/readiness.

## Composition freedom

Do **not** prescribe a layer cake.

At least one direction should be strongly editorial/spatial.
At least one should be work-landscape / explorable.
The third should be structurally different again.

The model may use custom SVG, CSS 2.5D, Canvas/WebGL, illustrated work scenes, spatial maps or another faithful geometry.

## Visual acceptance question

Would an intelligent colleague understand the Hub's governing mechanism from the first 1920×1200 frame without reading six separate cards?

---

# Golden scene 2 — Knowledge becomes usable

## Reader question

How does human-readable material become structured, governed and consumable for bounded work without implying automatic applicability, execution or authority?

## Must preserve

- source/provenance remains attached;
- interpretation and structure are not authority upgrades;
- machine-readable != applicable;
- applicable != executable;
- method/skill needs an actual harness and consumption route;
- selected context enters a bounded task, not a universal agent memory;
- reuse remains reviewed and maintained.

## Composition freedom

Do **not** default to three equal columns or stacked maturity layers.

Explore materially different ways to show transformation and boundaries. The scene may behave as:

- an exploded compiler / transformation canvas;
- a sticky narrative transformation;
- a source-to-consumption workbench;
- or another stronger solution.

Those are possibilities, not required layouts.

## Visual acceptance question

Can the reader see where meaning is preserved and where a new requirement/decision is introduced, rather than mentally inferring it from labels?

---

# Golden scene 3 — A change propagates

## Reader question

If an instruction or requirement changes, what may be affected, what remains historical, what evidence does not automatically transfer, and where does a human review/decision remain?

## Must preserve

- proposed != implemented;
- dependency does not imply automatic update;
- affected objects are review candidates where evidence supports only possible impact;
- prior evidence stays pinned to the version/scope that produced it;
- relationship verbs are explicit;
- uncertainty / missing evidence is visible;
- human decision is a next step, not geometry-implied approval.

## Composition freedom

Do **not** default to two side-by-side cards plus a list.

At least one direction should make propagation spatially visible.
At least one should make evidence/version boundaries the dominant visual idea.
The third should use another coherent representation.

Potential implementation techniques may include deterministic SVG dependency fields, aligned proposition diffs, temporal/version planes, annotated impact paths or custom hybrids.

## Visual acceptance question

Can the reader trace one changed proposition through likely downstream consequences and simultaneously see where the evidence chain stops?

---

# Review protocol

For each scene:

1. render all three directions at 1920×1200;
2. place them in one comparison sheet with the active reference captures;
3. compare composition, not pixels;
4. explicitly reject at least one direction;
5. identify what the strongest direction still fails to explain;
6. revise the strongest direction;
7. render again;
8. only then nominate one direction for semantic/visual acceptance.

## Generic-UI rejection rule

Reject the direction if the primary explanation could be described as:

> “a heading, some cards, some icons and a button”

or if the main visual can be removed without materially hurting comprehension.

## Production gate

Do not extract a reusable grammar and do not modify production presentation until all three scenes have one accepted composition.

The accepted compositions may share **identity and principles** without sharing one layout.