# V22 render automation status

A Playwright renderer now exists for the composition lab at 1920×1200.

It deliberately fails when the required nine independent direction files do not exist. This prevents the empty composition-lab shell from being mistaken for design evidence.

The renderer captures both first-frame and full-page screenshots, records console/page errors and horizontal overflow, and writes machine-readable results.

Visual quality remains a separate review gate; the renderer does not score aesthetics.