# Astra assignment — V22 story refinement

Work on `v22-story-lab`.

The semantic/source model is protected. The current presentation is not.

Read first:

1. `planning/V22_INFORMATION_PAYLOAD.md`
2. `planning/V22_STORY_ARCHITECTURE.md`
3. the relevant story JSON under `prototypes/v22-composition-lab/stories/`
4. the reference atlas only for the story you are improving.

Use deeper Sensemaking / Visual Grammar / Narrative guidance only when the current design problem requires it.

## Important reset

The nine existing golden-scene compositions have been reviewed and **rejected as a visual and informational direction**. They are useful only as semantic/reasoning experiments.

Do not preserve their shared visual grammar. In particular, do not default to:

- cream/beige canvas + dark-green hairlines;
- small diagram floating in a large empty 1920 canvas;
- repeated white cards, thin connectors and tiny utility labels;
- one restrained editorial layout repeated nine ways;
- abstract boxes labelled `context`, `work`, `review`, `evidence` without concrete underlying content;
- slogan-level explanations such as “AI needs context” or “humans remain accountable” that do not show what those statements mean in actual CLM work;
- dense explanatory prose compensating for a weak visual.

The failure is not polish. The scenes currently say too little. They show relationship skeletons but not enough source, field meaning, method, output, unresolved information, test logic, evidence or consequence for a reader to learn something substantial.

## Task

Start with **Useful work first** only.

Create three genuinely independent production-candidate experiences for the same story and semantic contract. They must differ in visual architecture and medium, not merely rearrange the same components.

Use the concrete anchor case in `V22_INFORMATION_PAYLOAD.md` as real semantic material:

- source line: `CLIENT [14]: “I sold my company in 2024.”`;
- instruction `INS-01@1`;
- process/field context `CTX-FENX@2026-08-18`;
- method `METHOD-01@1`;
- prepared observation `OBS-01@1`;
- requirement `REQ-01@1`;
- mapping `MAP-01@1`;
- proposed acceptance test `TEST-01@1`;
- evidence record `EVID-01@1`;
- reuse review `REUSE-01@1`;
- candidate revision `INS-01@2` where useful.

Do not invent additional institutional facts, approvals, field values, owners or observed evidence.

At least:

- one direction should be immersive/editorial/spatial and use the full 1920×1200 canvas as a visual field;
- one should be object- and artifact-led, grounded in recognisable CLM work rather than abstract boxes;
- one should be an analytical interactive surface with strong simultaneous context and inspectability.

SVG, HTML, Canvas, WebGL, generative illustration or combinations are all allowed where they improve comprehension. Choose the medium from the reasoning job.

Do not build the other two stories until one Useful-work direction clearly reaches all three gates: visual, semantic and informational.

## Information bar

The first frame must teach something concrete before the reader opens an inspector.

The reader should be able to reconstruct, from the composition and progressive inspection:

- what exact task is being performed;
- which source/instruction/context objects inform it;
- what the AI actually does to the material;
- what reviewable artifact is produced;
- what information remains unresolved;
- what the human reviewer must judge;
- what operating condition changes the next possible action;
- what evidence exists versus what remains absent;
- what might travel to another task and what must be checked before reuse.

For the Run-CLM view, do not stop at “AI prepares an observation.” Show the source statement, relevant subject/field meaning, the bounded method, the candidate observation, the source pointer and the unresolved amount/supporting evidence/lookup/source-date gaps.

For Develop CLM, make `INS-01@1 → REQ-01@1 → MAP-01@1 → TEST-01@1 → EVID-01@1` inspectable enough that the reader can see expected behaviour, negative cases and the missing observed result.

For Govern/change, when `INS-01@2` appears, show what proposition changed, which downstream objects become review candidates and why old evidence does not transfer automatically.

Do not increase informational value by adding paragraphs. Use spatial composition, recognisable work artifacts, source excerpts, exact object details, aligned comparisons, annotations and progressive disclosure.

At normal desktop viewing distance the reader should understand the mechanism. On closer inspection they should discover exact CLM content.

## Visual bar

The supplied/generated reference boards are the acceptance target for hierarchy, ambition, materiality, spatial composition and memorability. They are not factual authority and should not be copied literally.

A successful first frame should have:

- one unmistakable visual idea;
- a dominant composition that occupies most of the viewport rather than a small centred diagram;
- typography used as part of the spatial composition, not only as labels;
- meaningful material differences between source, context, work artifact, human judgement, evidence and operating condition;
- recognisable and information-bearing artifacts: source fragments, structured fields, requirement/test material, evidence states, annotations, inspectors and spatial traces;
- enough visible concrete content that the page does not read like an abstract strategy diagram;
- less prose in the first frame; detail should emerge through interaction, inspection or narrative progression;
- enough contrast and scale that the primary mechanism is understandable from normal desktop viewing distance;
- a memorable image or interaction that a reader could describe afterwards.

The test is not “is this elegant?” The test is:

> Would this screenshot plausibly belong among the best supplied reference images **and** would a knowledgeable CLM colleague learn something specific from it?

If either answer is no, reject it and rebuild the composition.

## Interaction

Interaction must materially change what the reader can understand.

Prefer interactions that reconfigure relationships, conditions or consequences:

- choosing Run / Develop / Change changes the concrete source/context/output/review/evidence material together;
- selecting the prepared observation exposes its source pointer, field meaning and unresolved information without navigating away;
- selecting the requirement exposes expected behaviour, mapping and adverse test cases;
- introducing `INS-01@2` visibly changes the impact-review set while historical evidence stays pinned to v1 scope;
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
- the revised direction passes the information-payload competency questions in `V22_INFORMATION_PAYLOAD.md`;
- its primary interaction teaches the governing mechanism using concrete CLM objects, not generic placeholders;
- keyboard and reduced-motion meaning remain intact;
- browser renders are inspected at 1920×1200;
- no console/page errors or horizontal overflow;
- no production propagation occurs.

There are now three independent acceptance gates:

1. visual quality;
2. semantic integrity;
3. informational substance.

A direction that passes only two is rejected.

Do not extract a design system, generic story engine or component library yet. Do not proceed to the other stories merely because the first implementation runs.