# V22 Story Lab analysis

## Evidence reviewed

This iteration used:

- the current `v22-golden-scenes` branch and all nine 1920×1200 browser renders;
- the current canonical semantic/source model in `src/data.js` / `src/explanation-data.js`;
- prior project decisions about Freda-inspired layers, Run/Develop/Govern-change work, requirements/evidence, FenX/Kaicy/AMLR as proof paths rather than organising principles;
- the supplied/generated reference atlas and prior research into Atticus, Initiate Architecture, Land-book, Lapa Ninja, Mobbin, SaaSFrame, Page Flows, SiteInspire, Awwwards, pen.dev, EigenPal, Cohere, Invisible, Lokalise and Weave;
- the Sensemaking, Visual Grammar and Narrative/Memory methods as pull-based reasoning aids.

## Main finding

The nine golden scenes are not just nine competing styles. They expose three useful reader projections:

- **Understand** — authored explanation;
- **Explore** — spatial / interactive reasoning;
- **Inspect** — exact source/object/evidence work.

This is a stronger product architecture than either one master diagram or a simple split between narrative pages and workspace pages.

## Visual assessment of the current golden renders

The current scenes are a significant improvement over the earlier V22 runtime: they use the 1920 canvas more deliberately, reduce card-grid dependence, differentiate artifacts materially and create real spatial explanations.

They still do **not** yet match the strongest reference boards.

Largest remaining gaps:

1. **Illustration density is too low.** Several scenes rely on lines, text and pale planes where the references combine document fragments, object detail, annotations and richer material cues.
2. **The composition sometimes becomes too sparse.** The references use negative space to create hierarchy; some golden scenes use it as empty distance.
3. **Typography is still a secondary actor.** The strongest references use scale, editorial typography and cropping as part of the explanation.
4. **Mode transitions are not yet a designed product behaviour.** The A/B/C set suggests a strong Understand → Explore → Inspect model, but that handoff is not yet visible as one coherent experience.
5. **Interaction is correct but modest.** Current controls mainly change selection/state. The next pass should make relationships, conditions and boundaries visibly react while preserving the static meaning.

## Strongest current seeds

### Overview

- Understand: `direction-b` / annotated work desk.
- Explore: `direction-a` / working landscape.
- Inspect: `direction-c` / work score, but this needs visual strengthening before production.

### Knowledge

- Understand: `direction-c` / context aperture.
- Explore: `direction-b` / exploded record.
- Inspect: `direction-a` / annotation loom.

### Change

- Understand: `direction-b` / version fault line.
- Explore: `direction-a` / impact field.
- Inspect: `direction-c` / proposition ledger.

## Product conclusion

The next design problem is not “which one component library wins?” It is:

> Can one semantic core support a memorable guided explanation, an interactive reasoning surface and an exact inspection workspace without changing meaning between them?

The new Story Lab is built to test that question.

## What should happen next

1. Use the three story scripts as narrative contracts.
2. Revise the strongest golden scenes against the reference atlas, especially illustration richness and authored typography.
3. Design the transitions between Understand, Explore and Inspect rather than treating them as separate destinations.
4. Run unfamiliar-reader comprehension tests against the story success criteria.
5. Only then extract the minimal renderer/device grammar and consider production propagation.

Do not build a generic story engine, universal graph renderer or large component system before those steps produce evidence.