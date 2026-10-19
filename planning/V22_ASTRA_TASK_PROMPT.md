# Astra task prompt — V22 composition sprint

Use this prompt with the repository branch `v22-astra-composition-reset`.

---

You are redesigning the **presentation architecture** of an existing, source-disciplined CLM AI Knowledge Hub.

Do not treat the current UI as the design answer. Treat it as evidence of product semantics and interaction requirements.

Read:

1. `planning/ASTRA_DESIGN_CONTRACT_V22.md`
2. `planning/V22_REFERENCE_ATLAS.md`
3. `planning/V22_SKILL_ROUTER.md`
4. `planning/V22_GOLDEN_SCENE_SPRINT.md`
5. `planning/V22_VISUAL_REVIEW_PROTOCOL.md`

Then inspect only the current semantic/source/runtime files needed to understand the three golden scenes.

Your first task is **not production implementation**.

For each golden scene — Overview, Knowledge, Change — create at least three genuinely independent 1920×1200 composition directions under `prototypes/v22-composition-lab/`.

Before coding each direction, write the required design note. Use the reference atlas selectively. Load Sensemaking/visualization skills only when the current problem requires them.

You have freedom over presentation architecture. You may use semantic HTML, custom SVG, Canvas, WebGL, CSS 2.5D or custom illustration when justified. Do not preserve the existing DOM or component hierarchy merely because it exists.

Reject generic UI. A direction that is essentially a heading + cards + icons is a failed direction even if it is technically clean.

Render each direction at 1920×1200. Compare the directions against the active visual references. Explicitly reject at least one direction per scene, identify the largest remaining visual gap and semantic risk, revise the strongest direction, and render it again.

Do not modify production presentation code or extract a reusable visual grammar until all three scenes each have one accepted direction that clears both the visual and semantic gates.

Semantic invariants are hard constraints. Presentation choices are open.

---