# Astra assignment — V22 story refinement

Work on `v22-story-lab`.

The semantic/source model is protected. The current presentation is not.

Read first:

1. `planning/V22_STORY_ARCHITECTURE.md`
2. the relevant story JSON under `prototypes/v22-composition-lab/stories/`
3. the reference atlas only for the story you are improving.

Use deeper Sensemaking / Visual Grammar / Narrative guidance only when the current design problem requires it.

## Important visual reset

The nine existing golden-scene compositions have been reviewed and **rejected as a visual direction**. They are useful only as semantic/reasoning experiments.

Do not preserve their shared visual grammar. In particular, do not default to:

- cream/beige canvas + dark-green hairlines;
- small diagram floating in a large empty 1920 canvas;
- repeated white cards, thin connectors and tiny utility labels;
- one restrained editorial layout repeated nine ways;
- dense explanatory text doing the work that the visual should do.

The failure is not polish. The compositions remain too close to a premium strategy deck / calm documentation UI and too far from the supplied reference quality.

## Task

Start with **Useful work first** only.

Create three genuinely independent production-candidate experiences for the same story and semantic contract. They must differ in visual architecture and medium, not merely rearrange the same components.

At least:

- one direction should be immersive/editorial/spatial and use the full 1920×1200 canvas as a visual field;
- one should be object- and artifact-led, grounded in recognisable CLM work rather than abstract boxes;
- one should be an analytical interactive surface with strong simultaneous context and inspectability.

SVG, HTML, Canvas, WebGL, generative illustration or combinations are all allowed where they improve comprehension. Choose the medium from the reasoning job.

Do not build the other two stories until one Useful-work direction clearly reaches the visual bar.

## Visual bar

The supplied/generated reference boards are the acceptance target for hierarchy, ambition, materiality, spatial composition and memorability. They are not factual authority and should not be copied literally.

A successful first frame should have:

- one unmistakable visual idea;
- a dominant composition that occupies most of the viewport rather than a small centred diagram;
- typography used as part of the spatial composition, not only as labels;
- meaningful material differences between source, context, work artifact, human judgement, evidence and operating condition;
- richer visual objects: document fragments, traces, inspectors, annotations, spatial fields or other bespoke explanatory forms;
- less prose in the first frame; detail should emerge through interaction, inspection or narrative progression;
- enough contrast and scale that the primary mechanism is understandable from normal desktop viewing distance;
- a memorable image or interaction that a reader could describe afterwards.

The test is not “is this elegant?” The test is:

> Would this screenshot plausibly belong among the best supplied reference images without explanation or apology?

If not, reject it and rebuild the composition.

## Interaction

Interaction must materially change what the reader can understand.

Prefer interactions that reconfigure relationships, conditions or consequences:

- choosing Run / Develop / Change changes context, contribution, output and responsibility together;
- selecting a work artifact reveals its source/context/evidence without navigating away;
- changing an operating condition opens or closes only the affected route;
- removing context leaves the work visibly incomplete;
- moving from Understand to Explore preserves the same semantic anchors instead of loading a different-looking product.

Do not count tabs, accordions, hover states or decorative animation as meaningful interaction.

## 1920 first

Design and judge at **1920×1200**. Use the width for simultaneous context and large visual storytelling, not wider margins.

## Done for the next gate

For **Useful work first**:

- three materially different visual architectures exist;
- at least two are explicitly rejected with reasons;
- the strongest one is materially revised after side-by-side comparison with the reference atlas;
- the revised direction passes the semantic contract without relying on small-print prose to correct the visual;
- its primary interaction teaches the governing mechanism;
- keyboard and reduced-motion meaning remain intact;
- browser renders are inspected at 1920×1200;
- no console/page errors or horizontal overflow;
- no production propagation occurs.

Do not extract a design system, generic story engine or component library yet. Do not proceed to the other stories merely because the first implementation runs.