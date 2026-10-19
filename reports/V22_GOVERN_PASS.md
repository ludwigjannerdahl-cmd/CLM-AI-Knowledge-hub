# V22 Govern/change expanded-state pass

## Evidence

Workflow: `V22 govern change review`

Run: `38788234845`

Validated head: `37a6fe4abe48cb01bae1332bee92aeb84113e300`

Artifact: `v22-govern-change-renders`, artifact ID `11999665030`.

The workflow successfully rendered three states from the production runtime:

1. baseline change view;
2. proposed handoff revision enabled;
3. next step, `Identify affected work`.

No page errors or horizontal overflow were recorded (`1600 == 1600`).

## Visual judgement

### Proposed revision

The expanded comparison keeps baseline and candidate visibly distinct. The candidate explicitly states what is retained, added and not inferred. This is a useful comparison view but intentionally remains restrained; version comparison does not itself imply impact or implementation.

### Impact step

The next state is materially stronger and reaches the intended V22 reasoning pattern:

- source/meaning, requirement/expected behaviour and adverse test are composed as related but non-equivalent artifacts;
- the dark responsibility rail makes define / assist / verify responsibilities locally visible;
- interpretation and instruction form an explicit provenance path;
- `Candidates for impact review` appears as a separate downstream field rather than as automatically changed objects;
- candidate requirements, acceptance tests and evidence are marked for review, not silently updated;
- the page explicitly states that linked objects are candidates for impact review, not automatically updated content.

The screenshot captured after navigation retains the browser's scroll position, so the sticky application header appears part-way down the full-page image. That is a capture artifact, not evidence of duplicate runtime chrome. It should be reset to top in the next comparison artifact if this screenshot is used externally.

## Conclusion

The expanded Govern/change state now supplies the missing third golden composition for V22. It is visually less diagrammatic than some generated boards, but semantically stronger: propagation is shown through review candidates and explicit relationships rather than by visually asserting completed downstream change.

Together, Overview, Develop CLM and expanded Govern/change are sufficient to extract a broader production visual grammar. The next work should be controlled propagation and comparison, not another information-architecture redesign.
