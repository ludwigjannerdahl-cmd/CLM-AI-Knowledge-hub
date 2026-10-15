# V21 implementation notes

## Direction

V21 freezes Figma as an exploratory artifact and moves design-system authority back into the runtime. The runtime now owns both implementation and visual-system QA.

## Why

Maintaining a parallel whole-product Figma model created another translation layer without resolving the main remaining risks: browser composition quality, deep-page consistency, responsive behaviour and reader comprehension.

## V21 design-lab objective

`#/design-system` is intentionally excluded from the main navigation. It is a runtime QA surface for:

- semantic foundations;
- state language;
- typed relationships;
- representation grammar;
- whole-product coverage;
- falsification checks.

It should be evaluated in the same browser, typography, CSS and responsive system as the product itself.

## Evidence status

The route and its source structure do not establish rendered quality. Browser comparison and reader testing remain required acceptance evidence.
