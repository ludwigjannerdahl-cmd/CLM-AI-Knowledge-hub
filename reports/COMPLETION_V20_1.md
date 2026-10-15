# V20.1 — connected reading and navigation completion

15 October 2026 · version 20.1.0 · `v20-visual-system`

## What changed and why

The previous V20 build implemented the major surfaces, but two defects still undermined the Hub's purpose. The representation illustration changed from a handoff source to wealth-origin context while describing them as the same meaning. Source reading also treated each new source page as the return destination, making the reader reconstruct the original task.

This update repairs those defects and makes progression explicit. It continues the current implementation and its editorial design rather than starting another redesign.

| Reader question | Implemented change |
| --- | --- |
| Where should I begin? | The opening names client lifecycle management, and its starting action follows the selected Run, Develop or Govern/change example. |
| What does the work actually produce? | The illustration contains concrete event, requirement and impact fragments. Generic output-rule labels are replaced by inspectable specimens. |
| How does readable guidance become task context? | All three representations follow `INS-01@1`, its natural-person field context and `METHOD-01@1`. They preserve missing amounts, source scope and review boundaries. |
| How does development help another task? | A new paired specimen connects retained FenX field meaning to possible Kaicy preparation, with reuse review between the two. It appears in the preparation review and development reuse steps. The reported Kaicy mechanism retains its date/source limitations. |
| What should I read next? | Each worked step has an explicit takeaway and previous/next controls. Continuing moves focus and reading position to the explanation. The final step connects to the relevant next task or bounded decision. |
| How do I get back from a source? | The original reading destination survives page changes and source excursions. Return restores task, subject, selected object panel and recorded reading position. |
| What happens when I close an object? | Nested objects return to the prior inspected object. Opening an object from search and closing it restores the query and results context. |
| Can I share the selected explanation? | Work-domain and representation selections have URL parameters and participate in Back/Forward history. |
| Can search take me to the passage? | Source-text matches link to the first matching term's extracted line. Invalid page/line values are bounded to a real location; malformed route encoding shows an unresolved destination. |

## Design and semantic preservation

The retained deep green, restrained surfaces, authored typography and normal scrolling remain. New forms are document fragments, a paired context/application composition and a quiet reading-continuation strip. Labels and relationships remain HTML controls and text. The mobile projection orders context, reuse review and application vertically instead of shrinking the desktop arrangement.

The opening remains about broad CLM work. FenX-to-Kaicy is a representative path, not the strategy. Present-task acceptance, permitted record changes and review for another use remain different questions. The independent handoff case keeps its own synthetic source and evidence; it does not acquire an AMLR derivation.

All thirteen chapters, 81 tabs, 21 portfolio records and nine draft Intelligence Model topics remain integrated. `src/chapters.json`, `src/source-texts.json`, the three primary document files and the scoping engine are unchanged from commit `1cf53e1`. No content was moved to an archive or separate application. Notes, exports, citations, source reading, themes, presentation mode, classifier history and original tool access remain available.

SEB Sans Serif still uses the declared local-font request and system fallback. Approved portable font binaries remain unavailable.

## Engineering

- Source changes are in `app.js`, `model.js`, `views.js`, `explanations.js`, `explanation-data.js`, and the new focused `reading.css` stylesheet. Canonical object identities and source authority are unchanged.
- Source excursions retain an original history destination. Object reading has a separate return destination. These are presentation state, not provenance or approval records.
- Reading positions are held in session memory and saved on navigation/page exit. Scroll events do not repeatedly write to browser history. New forward history entries clear any stale position for a replaced entry.
- Shared overview selections use `domain` and `representation` query parameters inside fragment routes. Hosting remains repository-relative and static.
- Generated `docs/` follows source. Version queries are updated to 20.1.0. The existing standalone page is still built, but no new ZIP is created.

## Verification performed

| Check | Result / scope |
| --- | --- |
| Automated tests | 38 passing; semantic, scoping and controller-host regression checks |
| Routes / dossiers | 208 route executions and 76 dossier states |
| Condition combinations | All 256 source/template combinations |
| Static HTML | 557 snapshots; no duplicate IDs, missing labelled/control targets or nested interactive controls detected |
| Internal references | 15,937 checked link occurrences |
| Content preservation | Full chapter and source corpora retained; direct byte comparison against the parent commit |
| GitHub Pages assets | Static build succeeds, repository-relative assets resolve, `.nojekyll` retained |
| Rendered browser / native interaction | Not performed |
| Reader comprehension / second-hand retelling | Not performed |

Evidence: `TEST_RESULTS_V20_1.txt`, `HTML_STRUCTURE_V20_1.json`, `STRUCTURE_CHECK.json` and `REBUILD_V20_1.json`. The controller host is explicitly a minimal JavaScript test harness, not a browser, DOM conformance test or rendered screenshot.

The required browser capability remains unavailable. The applicable Sites skill states: “If `$control-browser` is unavailable, skip browser QA: do not start a preview server, install a browser, or improvise another browser-control path.” No alternate browser path was used. The remaining native, visual and reader acceptance sequence is in `VALIDATION_V20.md`; the new source-return, step-continuation, shared-link and paired-reuse compositions must be included in that review.

## Repository and release boundary

This update belongs to the existing V20 review branch and draft pull request. Main was verified at `6185875`; no publication, merge, access change, enterprise connection or operational action is included. Existing ZIP/hash and V19/V20 reports describe earlier build records and are not evidence for a new 20.1 archive.

The website implementation and generated static assets are ready for review in the repository. Visual quality, native usability and independent reader understanding still require observation. The code checks alone cannot establish those outcomes.
