# CLM AI Knowledge Hub

A connected, illustrated explanation of useful CLM work, reviewed knowledge, methods, human responsibility, evidence, and the conditions for extending AI assistance.

This is the complete static source and generated build, version **21.1.0**. V21 reconciles the V20.1 reading-continuity work and applies the same desktop reading system across the whole Hub. It follows `planning/FINAL_BUILD_PLAN_FOR_ASTRA.md` and `planning/VISUAL_AND_CONTEXT_DIRECTION.md`. It integrates the supplied Hub's thirteen actual chapters, including its nine draft Intelligence Model topics, inside one application.

## Open the webpage

Open **`docs/OPEN_ME_FIRST.html`** from a local checkout for an offline review. No installation or local server is required. Keep its `sources/` folder alongside it for document downloads. `docs/index.html` is the modular hosting entry point.

V21.1 adds source/context reading columns, inspectable requirement traces, an evidence ledger and a broader object inspector. V20.1 supplies the reading continuity: the same instruction stays connected across representations, worked examples have explicit next steps, FenX context is tied to its possible Kaicy use, source excursions retain their original task, and object/search reading state is restored. This update is delivered through the repository; no new ZIP is required.

V20 adds a broader work illustration, literal knowledge transformation, visible condition routes, typed relationship exploration, object dossiers, evidence traces and an independent onboarding-handoff change case.

The page includes the illustrated overview, three worked paths, contextual full-topic explanations, subject/field inspection, instruction-change comparison, condition scenarios, object/source inspection, full Hub topic navigation, citations, search, local notes, exports, advisory task scoping, local history, light/dark/system themes, and presentation view.

## GitHub Pages configuration

The generated site is prepared under **`docs/`**, with relative assets, fragment routes and `.nojekyll`. No workflow, dependency installation or framework hosting is required.

The existing Pages workflow publishes the **repository root on `main`** at [CLM AI Knowledge Hub](https://ludwigjannerdahl-cmd.github.io/CLM-AI-Knowledge-hub/). The repository and site are public. The user authorised the reviewed V21 → V20 → main merge and deployment sequence. This work changes neither Pages configuration nor repository visibility or access. The generated root `index.html` preserves the query and fragment while opening `docs/`; the root `.nojekyll` keeps source downloads literal. This corrects the prior root page, which displayed the README rather than the application. Generated output must match source before merging.

Official setup reference: <https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site>.

## Maintain and verify

Requires Node.js 20+ for the build and checks, and Python 3 for the static HTML audit. No npm packages are required.

```sh
npm run build
npm test
node scripts/check.mjs --html-snapshots /tmp/clm-hub-html.json
python3 scripts/check-html.py /tmp/clm-hub-html.json
```

Edit `src/`, then regenerate `docs/`. Do not hand-edit generated assets. `src/data.js` contains the authored examples, provenance and stable object identities. `src/chapters.json` contains the integrated, qualified topic content. `src/source-texts.json` contains supplied source text for native reading. State and assumptions are separate from that content.

`scripts/import-hub.py /path/to/original.html` is the one-time migration utility. The raw input HTML stays in the original planning package: it includes retired scripts and captured local history and is deliberately excluded from this repository and website. The migration fingerprint and repairs are in `reports/MIGRATION_V19.json`.

## Review status

The V21.1 candidate passed 41 model/controller tests, 209 route executions and 565 static HTML states. The authorised GitHub Actions Chromium suite passed 90 desktop surface/viewport checks and 12 interaction groups, with zero page errors. It covers source return, history, task selection, focus, search, notes, advisory amendments and actual exports. The final production build reproduces byte for byte from a clean checkout. See [the coherence report](reports/V21_COHERENCE_PASS.md) for exact commits, run links, screenshots and limits.

**Reader comprehension remains UNVERIFIED.** The screen is simulated at 1920×1200, with a measured primary CSS viewport of 1920×1080. Reduced-viewport checks are zoom-equivalent reflow, not native browser zoom or the user's actual workstation. No WCAG conformance or cross-browser acceptance is claimed.

Approved SEB font binaries were not supplied. The CSS requests locally installed SEB Sans Serif and otherwise uses an explicit system sans-serif fallback. No substituted font is presented as the SEB font.

Start with `reports/V21_COHERENCE_PASS.md`, `reports/V21_PRESERVATION.json` and `reports/REBUILD_V21.json`. The V20 migration record remains the content/behaviour inventory. Older implementation and validation reports are historical checkpoints; their pending-browser and draft-branch statements describe their own commits, not this release. Independent reader testing remains a separate next step.
