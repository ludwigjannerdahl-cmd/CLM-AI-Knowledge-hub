# Useful Work — first rendered review

Commit: e44b175349633f15e2fb4e40cf624d2ffed9ec33
GitHub Actions run: 38970292583 (failed)

The actual 1920×1200 A render is readable but fails the first-frame mechanism
criterion: the method and requirement/test/evidence region fall below the frame.
The three-column workpaper has useful substance, but the source/context column
is too narrow and the prepared observation consumes too much vertical space.
Revision widens the input column and reduces internal spacing without clipping
content or reducing body text below normal desktop reading size.

The source-return check also raced asynchronous browser history. Immediate
isVisible() observed the source page before popstate restored the inspector.
The revised browser test waits for the intended route and visible inspector,
then waits for Escape to remove both the dialog and object URL state. This is
not yet a confirmed app fix. Each composition now records failures independently
so one failure does not prevent renders of the other candidates.

Public-build correction: full supplied strategy/operating-model/design-source
documents and extracted bodies are no longer emitted as Pages assets. Provenance
records and integrated chapter explanations remain. Existing repository history
is not rewritten; this change does not certify historical publication clearance.

No composition is accepted yet. No reader comprehension test has been performed.
