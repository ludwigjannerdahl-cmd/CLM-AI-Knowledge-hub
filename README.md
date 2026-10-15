# CLM AI Knowledge Hub

A connected, illustrated explanation of useful CLM work, reviewed knowledge, methods, human responsibility, evidence, and the conditions for extending AI assistance.

This is the complete static source and generated review build, version **20.1.0**, on **`v20-visual-system`**. The user-published V19 site still serves main commit `6185875`; this branch has not been merged or deployed. It follows `planning/FINAL_BUILD_PLAN_FOR_ASTRA.md` and `planning/VISUAL_AND_CONTEXT_DIRECTION.md`. It integrates the supplied Hub's thirteen actual chapters, including its nine draft Intelligence Model topics, inside one application.

## Open the webpage

Open **`docs/OPEN_ME_FIRST.html`** from a local checkout for an offline review. No installation or local server is required. Keep its `sources/` folder alongside it for document downloads. `docs/index.html` is the modular hosting entry point.

V20.1 completes the reading continuity: the same instruction stays connected across representations, worked examples have explicit next steps, FenX context is tied to its possible Kaicy use, source excursions retain their original task, and object/search reading state is restored. This update is delivered through the repository; no new ZIP is required.

V20 adds a broader work illustration, literal knowledge transformation, visible condition routes, typed relationship exploration, object dossiers, evidence traces and an independent onboarding-handoff change case.

The page includes the illustrated overview, three worked paths, contextual full-topic explanations, subject/field inspection, instruction-change comparison, condition scenarios, object/source inspection, full Hub topic navigation, citations, search, local notes, exports, advisory task scoping, local history, light/dark/system themes, and presentation view.

## GitHub Pages configuration

The generated site is prepared under **`docs/`**, with relative assets, fragment routes and `.nojekyll`. No workflow, dependency installation or framework hosting is required.

The existing V19 publication uses main. After review and a separately authorised V20 merge, the intended configuration remains **Settings → Pages → Deploy from a branch → `main` → `/docs`**. No Pages setting or repository audience was changed by this build. Private-repository plan eligibility and the intended site's access controls need checking before publication. A private repository does not by itself make its Pages site private; this build contains internal material.

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

Automated model, source/template and packaging checks are recorded in `reports/`. **Browser rendering, native keyboard/history/reflow behaviour and reader comprehension have not been validated in this environment.** The permitted `control-browser` tool was unavailable; no alternate browser path or preview server was used. The implementation must not be described as visually or operationally accepted on the strength of source tests.

Approved SEB font binaries were not supplied. The CSS requests locally installed SEB Sans Serif and otherwise uses an explicit system sans-serif fallback. No substituted font is presented as the SEB font.

Read `reports/COMPLETION_V20_1.md` for the latest changes and verification, then `reports/IMPLEMENTATION_V20.md`, `reports/CONTENT_BEHAVIOUR_MIGRATION_V20.md`, `reports/VALIDATION_V20.md`, and `reports/WORK_AI_HANDOFF_V20.md` before acceptance or further development. Earlier reports are historical build records. **Merge recommendation: hold until rendered and reader acceptance.**
