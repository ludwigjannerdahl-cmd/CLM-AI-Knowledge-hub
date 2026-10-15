# V22 Visual Review Protocol

## Purpose

Technical correctness is necessary but no longer sufficient for V22 visual acceptance.

The composition sprint must produce evidence that the visual work itself clears the supplied/generated reference bar while preserving the semantic contract.

## Canonical review canvas

- Width: **1920 px**
- Height: **1200 px**
- Browser scale: 100%
- Prefer full viewport captures for first-frame judgement.
- Full-page captures may be added for pacing review but do not replace first-frame review.

## Comparison sheet

For each golden scene, create one comparison sheet containing:

- active reference captures, each tagged with `learn_this` and `do_not_copy`;
- direction A render;
- direction B render;
- direction C render;
- short critique under each direction;
- selected direction after first review;
- revised selected direction after critique.

Do not use pixel-difference scoring against external references. The references are art-direction comparators, not templates.

## First-frame questions

A reviewer should be able to answer:

1. What is the dominant idea in this scene?
2. Where should I look first?
3. What relationship or transformation does the geometry make obvious?
4. What human responsibility / evidence / uncertainty boundary matters?
5. What becomes possible when I interact with the scene?

If the answers require reading most body copy, the visual is too weak.

## Generic-UI rejection signals

Reject or redesign when:

- the composition is mostly equal rectangles;
- illustration is merely an icon inside a shape;
- the page could be rebuilt from generic cards without losing meaning;
- hierarchy depends mainly on font-size differences;
- every object has the same visual material despite representing different semantic types;
- diagrams are tiny relative to the surrounding empty container;
- the primary visual is decorative and removable;
- 1920 px width is used only to increase margins;
- a complex relationship is explained in prose while the visual only labels nouns;
- the direction resembles the current V21/V22 layout with cosmetic restyling.

## Semantic rejection signals

Reject when:

- depth/position/colour implies approval, maturity or authority not supported by text;
- arrows lack a meaningful verb;
- proposal and implementation merge visually;
- missing evidence is hidden;
- prior evidence appears to transfer to a revision automatically;
- human judgement appears as a generic final checkpoint when it acts earlier;
- source of wealth becomes the Hub's global visual ontology;
- visual completeness implies operational readiness.

## Critique format

For each direction record:

### What works

Only observations that materially improve reasoning or authored quality.

### Largest remaining visual gap

Name the single most important difference versus the best reference family.

### Largest semantic risk

Name the false inference most likely to be created by this composition.

### What to remove

Identify anything that adds visual complexity without reducing inference cost.

### Revision move

One concrete change large enough to alter the composition, not a list of CSS polish items.

## Promotion condition

A scene can be nominated for production only when:

- it clears the visual gate in `ASTRA_DESIGN_CONTRACT_V22.md`;
- it clears the semantic gate;
- at least one competing direction has been explicitly rejected;
- a revised render exists after critique;
- the design decision can be explained without reference to implementation convenience.

After all three golden scenes are accepted, recurring grammar may be extracted.