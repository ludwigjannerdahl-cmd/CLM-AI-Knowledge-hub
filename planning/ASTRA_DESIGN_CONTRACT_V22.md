# V22 Astra Design Contract

## Purpose

Create a substantially more authored, memorable and useful visual experience for the CLM AI Knowledge Hub without weakening its semantic, evidential or governance discipline.

This contract deliberately separates **truth constraints** from **design freedom**. The semantic and source model is protected. The presentation architecture is not.

## Product goal

The Hub is an internal explanatory knowledge environment for CLM AI in a regulated private bank. It should help an intelligent colleague understand, explore, challenge and reuse how these things connect:

- CLM business work;
- authoritative and interpretive source material;
- structured / machine-usable knowledge;
- methods, skills and requirements;
- bounded AI assistance;
- human judgement and authorised action;
- evidence and evaluation;
- reusable context for later work;
- actual data, runtime, access and operating conditions.

The product succeeds when another colleague can reconstruct the important mechanism without Ludwig having to reconnect the system for them.

## Semantic invariants — hard constraints

These may not be weakened for visual effect:

1. Source-linked is not verified.
2. Reviewed is not approved.
3. Structured is not automatically applicable.
4. Applicable is not automatically executable.
5. Runtime available is not interface available.
6. Interface available is not permission granted.
7. Proposed is not implemented.
8. A designed test is not an observed pass.
9. Prior-version evidence is not evidence for a revised version.
10. Useful task output is not automatically reusable institutional context.
11. Reuse requires explicit scope, applicability, ownership/maintenance and permitted consumption.
12. Human accountability remains explicit for consequential judgement, approval and authoritative action.
13. Current, historical, proposed, illustrative, inferred, uncertain and missing states remain visibly distinct.
14. Do not invent owners, approvals, readiness, integrations, production status, measured benefit, risk ratings or evidence counts.
15. Source of wealth is one worked specimen, not the ontology or visual identity of the Hub.
16. Visual prominence, depth, colour or position must not silently encode maturity, authority or approval.

## Visual thesis

**Editorial systems intelligence.**

The Hub should feel calm, precise, deeply authored and visually memorable. It is not a marketing landing page, generic SaaS dashboard, document library, PowerPoint converted to HTML, or collection of equally weighted cards.

Design for a **1920×1200 desktop workstation first**. Use the canvas aggressively when simultaneous context improves reasoning. Treat the desktop experience as a hybrid of analytical publication, inspectable product workspace and explanatory canvas.

Prefer:

- strong focal hierarchy;
- spatial explanation over boxes explaining boxes;
- bespoke diagrams and illustrations when they reduce inference cost;
- generous but purposeful negative space;
- meaningful scale variation;
- contextual side-by-side inspection;
- typography as structure;
- direct manipulation and progressive reveal when interaction teaches something;
- distinct visual forms for different reasoning jobs;
- material differences between source, interpretation, requirement, method, evidence and operational state;
- restraint in colour and effects.

Avoid by default:

- grids of equal cards;
- generic AI imagery;
- decorative node graphs;
- ornamental 3D that carries no meaning;
- repeated rounded rectangles as the main grammar;
- dashboard density where no quantitative monitoring task exists;
- tiny diagrams inside oversized containers;
- excessive chrome;
- motion that does not reveal meaning.

## Freedom granted to the model

Existing presentation code is **evidence of product semantics, not a design constraint**.

For the golden-scene exploration, the model may replace or ignore the existing:

- DOM composition;
- CSS architecture;
- visualization components;
- page geometry;
- illustration implementation;
- navigation presentation;
- local interaction pattern.

The model may choose semantic HTML, SVG, Canvas, WebGL, CSS 2.5D, generated visual assets, or combinations of these where justified by the reasoning task and accessibility requirements.

Do not preserve a current presentation merely because it is cheaper to modify.

## Canonical canvas

Primary acceptance canvas: **1920×1200**.

Compatibility views remain necessary later, but the design centre for the composition sprint is the 1920×1200 desktop workstation.

Do not merely centre a narrow marketing column inside this canvas. Use simultaneous context when useful: editorial framing, primary reasoning surface and contextual inspector can coexist.

## Golden-scene task

Before production propagation, create **at least three genuinely independent composition directions for each golden scene**:

1. **How AI fits into CLM work**
   - Reader question: How do real CLM work, relevant context, bounded AI assistance, human responsibility, evidence and operating conditions fit together?

2. **Knowledge becomes usable**
   - Reader question: How does human-readable material become structured, governed and consumable without implying automatic applicability, executability or authority?

3. **A change propagates**
   - Reader question: If an instruction or requirement changes, what may be affected, what evidence remains historical and where does a human review/decision remain?

Do not begin by choosing a diagram type. First determine what the reader must be able to work out.

Each direction should be compositionally independent, not the same DOM with different styling.

## Design exploration requirement

For each golden scene:

1. produce multiple directions;
2. explain the core visual idea in one sentence;
3. identify the dominant reasoning operation;
4. state what geometry or interaction makes that reasoning cheaper;
5. name the strongest false-inference risk;
6. render at 1920×1200;
7. compare to the reference atlas;
8. reject generic directions even if technically clean.

Only after one direction per golden scene clears visual and semantic review should recurring grammar be extracted.

## Skill use — pull, do not push

Do not preload the full Sensemaking / visualization library into every task.

Use it as a routed capability:

- if the hard part is conceptual structure, load Sensemaking Method;
- if the hard part is geometry/representation choice, load Visual Grammar and only relevant frames;
- if the hard part is argument/decision support, load Argument & Decision;
- if the hard part is sequencing/retention, load Narrative & Memory.

The frame catalogue is a catalogue, not a checklist. Do not include a BowTie, swimlane, timeline, graph, matrix or other visual merely to demonstrate coverage.

## Acceptance

A golden scene fails if either gate fails.

### Visual gate

- Would this scene plausibly belong beside the strongest supplied/generated reference boards?
- Does it communicate materially through geometry, not only prose?
- Is there one memorable visual idea?
- Is the hierarchy authored rather than assembled?
- Does the 1920×1200 canvas feel intentionally used?
- Would removing the primary visual make understanding materially worse?

### Semantic gate

- Are the hard invariants preserved?
- Are relationship verbs explicit where direction matters?
- Are current/target/proposed/historical states distinguishable?
- Is missing evidence visible rather than cosmetically completed?
- Are human judgement and authority placed where they act?
- Are unsupported enterprise claims absent?

There is no numeric beauty score and no averaging between these gates.

## Stop rule

Do not propagate a visual grammar to the broader Hub because a direction is merely cleaner than V21/V22.

Propagation begins only after **all three golden scenes** have one accepted 1920×1200 composition that clears both gates.