# V22 Composition Lab

This directory is reserved for **pre-production** 1920×1200 golden-scene explorations.

It must not import or mutate production presentation components by default. The purpose is to let independent visual ideas compete before a reusable grammar is extracted.

Required structure after the design sprint:

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
  review/
    overview.md
    knowledge.md
    change.md
```

Each direction should be runnable in a browser independently and should declare:

- the reader question;
- the reasoning operation;
- the visual idea;
- the false-inference risk;
- references used;
- details deliberately suppressed.

Canonical viewport: **1920×1200**.

Do not promote code from this lab directly into `src/`. First accept one composition per golden scene, then extract a recurring grammar from the accepted work.