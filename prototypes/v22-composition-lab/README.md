# V22 Composition & Story Lab

This directory is the **pre-production** visual/narrative workbench for the CLM AI Knowledge Hub.

It does not define production presentation. The canonical semantic/source model remains in the existing application data. The lab explores how that model should be projected before any production grammar is extracted.

## Two jobs

### Golden-scene composition

`overview/`, `knowledge/` and `change/` contain three independent 1920×1200 directions each.

These established useful visual evidence and exposed three reader projections:

- Understand — authored mental model;
- Explore — spatial / interactive reasoning;
- Inspect — exact source/object/evidence work.

### Story Lab

`story-lab/` combines the strongest golden-scene seeds into three guided story contracts under `stories/`:

1. Useful work first
2. Meaning that can travel
3. Change creates questions

The Story Lab is a review instrument, not a generic runtime story engine.

## Structure

```text
prototypes/v22-composition-lab/
  overview/
    direction-a/
    direction-b/
    direction-c/
  knowledge/
    direction-a/
    direction-b/
    direction-c/
  change/
    direction-a/
    direction-b/
    direction-c/
  stories/
    useful-work-first.json
    meaning-that-can-travel.json
    change-creates-questions.json
  story-lab/
  review/
```

## Direction contract

Each composition should remain explicit about:

- reader question;
- reasoning operation;
- governing visual idea;
- false-inference risk;
- references used;
- details deliberately suppressed.

## Story contract

Story scripts declare claims, reasoning intent, canonical focus objects and boundaries. They do **not** create another source of truth and should not prescribe a chart family before the reasoning need is understood.

## Canonical viewport

Primary visual acceptance: **1920×1200**.

## Promotion rule

Do not promote lab code directly into `src/`.

First make the three story experiences work across Understand / Explore / Inspect, validate them against the semantic contract and reference atlas, and test reader comprehension. Then extract the smallest recurring visual/story grammar that the successful scenes actually share.