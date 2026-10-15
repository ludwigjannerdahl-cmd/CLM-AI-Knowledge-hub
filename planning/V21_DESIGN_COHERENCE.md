# V21 Design Coherence

## Purpose

V21 moves the CLM AI Knowledge Hub from a mixed V19/V20 presentation layer toward one coherent runtime design system. It does not change the governing semantic model.

The Hub remains an internal explanatory knowledge product for CLM AI. Its job is to help a colleague understand, trace, challenge and reuse how recognisable CLM work, source meaning, structured knowledge, bounded AI assistance, human responsibility, evidence and operating conditions connect.

## Design principle

The GitHub runtime is the design system and implementation source of truth. Generated reference boards remain art-direction inputs; Sensemaking & Explanation Architecture governs representation-task fit; repository/Project sources govern factual claims.

Do not maintain a parallel whole-product Figma specification.

## V21 goals

1. Unify V19/V20 visual grammar across Overview, Work, Knowledge, Data/operation, Search, Source, Object, Change, Evidence and Topics.
2. Raise composition ambition and illustration sophistication without decorative complexity.
3. Make representation-task fit explicit: different reasoning questions use different native visual forms.
4. Keep Source of Wealth as one worked specimen, not the visual identity of the Hub.
5. Use the runtime Design Lab as an acceptance instrument for visual QA, semantic QA and implementation coherence.
6. Make browser-rendered comparison and reader comprehension the next evidence gate.

## Runtime Design Lab

Route: `#/design-system`

The Design Lab is builder-only and deliberately excluded from normal reader navigation. It runs through the same route parser, state, actions and explanation components as the product rather than mounting a parallel static mock-up.

The Lab should expose:

- the Hub's reasoning contract and competency questions;
- semantic foundations and state distinctions;
- typed relationship language;
- live explanation components using actual product state;
- representation-task fit and false-inference risks;
- cross-domain coverage with links to the real product surfaces;
- interaction contracts and responsive re-projection principles;
- explicit falsification checks;
- separate source/model, rendered-product and reader-comprehension evidence gates;
- implementation invariants for `src/` versus generated `docs/`.

The Lab exists to make design debt inspectable in the actual runtime. It is not a public style guide and not a substitute for rendered or reader validation.

## Competency questions

The design should make it cheaper for a reader to answer at least these questions:

1. What CLM work is actually being improved?
2. Where did this meaning come from, and what is interpretation rather than source?
3. What remains unresolved or unsupported?
4. What may AI prepare versus what requires a human or authorised process?
5. What selected artifact may inform another task, under what reuse scope?
6. What condition changes what is possible?

## Representation coverage

The runtime should support, where reader tasks justify them:

- work landscape;
- source/interpretation alignment;
- knowledge transformation;
- bounded task journey;
- knowledge dossier;
- relationship context;
- version comparison;
- impact map;
- operating-condition route;
- human/AI/authority boundary;
- evidence/evaluation trace;
- source reader;
- search + contextual preview.

## Semantic distinctions the Lab must protect

The visual system must not collapse:

- source-linked into verified;
- reviewed into approved;
- structured into executable;
- runtime availability into interface availability;
- interface availability into permission;
- useful work product into reusable institutional context.

If a visual treatment makes either side of one of these pairs appear equivalent, the design has failed even if it looks polished.

## Interaction contract

Interaction is justified only when it changes understanding. Product interactions should make a reasoning consequence visible:

- work-domain selection changes context, contribution, output and review responsibility;
- knowledge-stage selection changes representation and claim boundary;
- operating-condition changes interrupt only the affected route;
- relationship projection changes neighbourhood/view without changing typed semantics;
- version/change controls expose impact candidates without rewriting history;
- object/source inspection preserves return context and focus.

Essential meaning must not depend on hover. Keyboard, Back/Forward, focus restoration and reduced-motion behaviour are part of explanation quality.

## Whole-product guardrails

The Design Lab should actively test these failure hypotheses:

- the Hub still reads as a Source-of-Wealth product;
- only the Overview looks like the new design system;
- newer explanation surfaces and inherited reading UI still feel like two products;
- every reasoning problem has collapsed into cards;
- visual sophistication has weakened evidence/source distinctions;
- mobile is a shrunken desktop diagram rather than a semantic re-projection;
- tools and utilities compete with the primary job of understanding and tracing CLM AI work.

## Promotion gates

A representation should not spread through the Hub merely because the component exists.

Before promotion, distinguish three evidence gates:

1. **Source/model integrity** — build, unit and structural checks preserve identities, links and semantic invariants.
2. **Rendered-product evidence** — real browser inspection covers desktop, tablet, mobile, 200% zoom, theme, keyboard, history and source-return behaviour.
3. **Reader comprehension** — an unfamiliar colleague can explain work, source/interpretation, human authority, evidence scope, conditions and reuse without builder intervention.

Unknown remains unknown. Source tests do not establish visual quality, and visual quality does not establish comprehension.

## Implementation invariants

- `src/` is authored source.
- `docs/` is generated distribution and must not be hand-edited.
- reference boards set the art-direction quality bar but are not factual authority.
- SEA governs explanation method and representation-task fit but is not a source of CLM facts.
- the Design Lab must reuse production explanation components wherever the intent is to validate those components.

## Non-goals

- no framework migration merely for design;
- no force-directed graph library;
- no fake metrics, freshness or evidence counts;
- no marketing redesign;
- no new factual claims without source support;
- no Pages publication or repository access changes;
- no merge into main without rendered/reader acceptance.

## Acceptance

V21 is not accepted because components exist or because the Design Lab looks polished. It is accepted when:

- the Design Lab route executes through the normal runtime;
- cross-domain live specimens preserve semantic distinctions under interaction;
- browser-rendered product states show one coherent visual system;
- responsive projections preserve meaning;
- source/model tests continue to pass; and
- unfamiliar readers can explain the important distinctions without builder intervention.
