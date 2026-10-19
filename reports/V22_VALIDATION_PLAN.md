# V22 validation plan

V22 uses a separate prototype validation path before any production integration.

The branch workflow `.github/workflows/v22-prototype-validate.yml` performs static parsing and headless Chromium rendering of all six prototype views at desktop width plus Overview at mobile width. It uploads the resulting screenshots as a review artifact.

Passing this workflow establishes only that the prototype parses and renders. It does not establish visual acceptance, reader comprehension, production integration or enterprise approval.

The visual acceptance gate remains human/model comparison against the supplied reference boards, with explicit checks for focal hierarchy, authored composition, useful depth, native representation, relationship semantics, responsive preservation and absence of unsupported status/authority signals.
