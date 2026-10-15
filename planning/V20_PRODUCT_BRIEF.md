Continue development of the CLM AI Knowledge Hub in the existing GitHub repository:

ludwigjannerdahl-cmd/CLM-AI-Knowledge-hub

Current main HEAD when this instruction was written:
6185875ce4fe72ccb9f93eee14ec1e2defefffff

This is a continuation of the existing product, NOT a greenfield redesign.

Your task is to create the next visual/product iteration — effectively V20 — by preserving the semantic architecture, content depth, provenance discipline, routing, object identities, source model, interactive behaviours and epistemic boundaries of V19 while substantially upgrading the visual system, illustration system, interaction design and overall product quality.

Do not publish the site or change repository visibility/access.

==================================================
1. FIRST: INSPECT THE ACTUAL CURRENT REPOSITORY
==================================================

Before changing anything:

1. Inspect the current branch, HEAD, working tree and repository structure.
2. Read:
   - README.md
   - planning/FINAL_BUILD_PLAN_FOR_ASTRA.md
   - planning/VISUAL_AND_CONTEXT_DIRECTION.md
   - reports/IMPLEMENTATION_BRIEF.md
   - reports/CONTENT_BEHAVIOUR_MIGRATION.md
   - reports/VALIDATION.md
   - reports/WORK_AI_HANDOFF.md
3. Inspect the actual source implementation:
   - src/index.html
   - src/styles.css
   - src/views.js
   - src/app.js
   - src/model.js
   - src/data.js
   - src/scoping.js
   - src/chapters.json
   - src/source-texts.json
4. Inspect the attached visual reference images in detail.
5. Run the existing build/tests/checks before editing so you know the baseline.

Do not assume prior screenshots, earlier sessions, old V16 files or planning descriptions reflect the current checkout. Verify actual bytes and runtime behaviour.

Prefer a reversible implementation path:
- create a dedicated V20 visual-system branch from current main;
- keep main untouched until the redesign has been tested;
- commit coherent milestones rather than one huge unreviewable change.

==================================================
2. PRODUCT PURPOSE — DO NOT LOSE THIS
==================================================

The Hub is NOT:

- a marketing website;
- an AI sales page;
- a generic enterprise architecture diagram;
- a PowerPoint converted into HTML;
- a SharePoint/document library;
- a dashboard full of metrics;
- a catalogue of AI use cases;
- a Kaicy product page;
- a source-of-wealth product;
- a knowledge graph viewer for its own sake.

It is an internal explanatory knowledge product for CLM AI in a regulated private bank.

Its job is to help a colleague understand, trace, challenge and reuse how these things connect:

CLM business work
→ source material and business/regulatory meaning
→ structured / machine-usable knowledge
→ methods / skills / requirements
→ bounded AI assistance
→ human judgement and authorised action
→ evidence / evaluation
→ reusable context for later work
→ actual data, runtime, access and operating conditions.

The central question is:

“Can another colleague use the context correctly without Ludwig having to reconnect the whole system for them?”

The product should help readers answer questions such as:

- What CLM work is actually being improved?
- What information or knowledge does this task depend on?
- What is authoritative versus interpretive versus illustrative?
- What can AI assist with?
- What remains a human judgement or authorised action?
- What evidence exists?
- What changes when an operating condition is missing?
- What can safely inform another task?
- What changed between versions?
- How do I trace an object back to its source?
- How do I find related requirements, fields, instructions, evidence and use cases?
- What is current, proposed, unresolved or unavailable?

==================================================
3. GOVERNING SEMANTIC MODEL
==================================================

Preserve this governing relationship:

AI assists useful CLM work.

Selected reviewed artifacts may provide context for another task only when meaning, applicability, ownership, maintenance and permitted consumption are established.

Actual information and operating conditions determine how far the assistance can extend.

Keep these three questions separate:

1. Is the output suitable for the present task?
2. Which record changes/actions are actually permitted?
3. Which selected artifact may inform another task within an established reuse scope?

Do not collapse them into “human in the loop”.

Do not silently upgrade:
- informs → causes
- enables → guarantees
- source-linked → verified
- reviewed → approved
- interface available → permission granted
- runtime available → shared service established
- recorded status → current status
- illustrative object → implemented production object.

==================================================
4. WHAT THE ATTACHED IMAGES SHOULD CONTROL
==================================================

Treat the attached images as a VISUAL AND INTERACTION REFERENCE DECK.

They establish the expected level of:

- visual authorship;
- typography;
- information hierarchy;
- compositional sophistication;
- spatial reasoning;
- diagram quality;
- illustration quality;
- component quality;
- interaction clarity;
- visual pacing;
- restrained premium feel;
- deep-green / ivory / sage / stone palette;
- editorial seriousness;
- relationship visualisation;
- provenance visualisation;
- responsive behaviour;
- state language;
- coherent component grammar.

The rendered website should clearly belong to the same design family.

However:

DO NOT copy generated words, article numbers, dates, owners, metrics, evidence counts, “current” badges or status claims from the images.

Those images contain illustrative material and generated placeholders.

Use the real Hub source model and qualified repository content.

The images are visual authority, not factual authority.

==================================================
5. IMPORTANT: DO NOT REGRESS TO THE EARLIER GENERIC MODEL
==================================================

The large attached dashboard image is visually useful but conceptually contains several patterns we deliberately moved away from.

DO NOT reproduce it literally.

In particular, do not make the homepage primarily:

Business work
→ generic Knowledge layer
→ generic Skills layer
→ generic Agent layer
→ Governance foundation.

That abstraction makes readers understand a taxonomy before they understand the work.

Also avoid:

- six competing global CTAs;
- multiple competing entry systems;
- fake “Evidence available: 12” counters;
- fake freshness labels;
- a permanent right sidebar full of generic cards;
- governance as one horizontal foundation band;
- human judgement placed only at the end;
- “system ensures compliance” language;
- “monitors and improves automatically” loops;
- a giant generic knowledge graph;
- decorative AI imagery.

Use the visual sophistication of that concept, not its weaker information architecture.

==================================================
6. THE VISUAL TARGET
==================================================

The target is:

“editorial systems intelligence”

Think:

premium internal product
+ analytical publication
+ inspectable knowledge system
+ interactive explanatory graphics.

The visual tone should be:

calm
precise
trustworthy
crafted
analytical
information-rich
restrained
non-commercial
non-gimmicky.

Avoid:

marketing landing-page tropes
large faces
stock photography
AI blobs / glowing spheres
purple/blue AI gradients
excessive rounded cards
dashboard clutter
random 3D decoration
Awwwards-style novelty
over-animation
wall-of-text pages.

The design should feel sophisticated because relationships and information are made clearer, not because there are more effects.

==================================================
7. VISUAL SYSTEM: APPLY IT ACROSS THE ENTIRE WEBSITE
==================================================

The current V19 visual language is too concentrated in the homepage hero.

Do not create one beautiful homepage and leave the rest as legacy documentation UI.

The same design system must visibly govern:

- Overview
- Work & examples
- Knowledge & methods
- Data & operation
- All topics
- Search
- Source reader
- Object detail
- Requirement detail
- Field detail
- Instruction detail
- Evidence detail
- Relationship explorer
- Change/version views
- Operating-condition views
- Advisory scoping
- Status/uncertainty views
- About / source / reference pages
- Mobile/tablet projections.

Every important reader question should have an appropriate visual representation.

Do not turn every concept into the same bordered card.

==================================================
8. REPRESENTATION LIBRARY
==================================================

Use different visual forms for different reasoning operations.

A. OVERVIEW / ORIENTATION
Create a broader authored CLM work illustration.

Show recognizable work such as:
- onboarding;
- KYC review;
- event-driven review;
- regulatory/change analysis;
- requirements;
- development/testing;
- monitoring / review preparation.

Show AI contributions as verbs:
retrieve
structure
compare
analyse
prepare
draft
test

Show human judgement and controls where they act.

Do not make source-of-wealth the visual identity of the Hub.

Source-of-wealth remains one deep worked example.

B. POLICY / SOURCE → STRUCTURED KNOWLEDGE
Use an aligned transformation view.

For example:

source text
→ interpretation
→ requirement / field meaning
→ expected behaviour
→ implementation/method
→ evidence

Preserve source/version/provenance across the transformation.

C. WORKED TASK
Use a task journey / vertical slice.

For example:

source
→ relevant context
→ bounded AI contribution
→ prepared output
→ human review
→ permitted next action
→ evidence
→ possible reuse candidate

D. KNOWLEDGE OBJECT DETAIL
Use a dossier / canonical object view.

Show:
- stable identity;
- type;
- subject/scope;
- source;
- version;
- authority/review state;
- owner where actually known;
- typed relationships;
- evidence;
- history/change;
- uncertainty.

E. RELATIONSHIP EXPLORER
Create a deterministic, understandable 1-hop / 2-hop relationship view.

Avoid force-directed spaghetti graphs.

Relationship labels should be explicit:
derived from
informs
constrains
uses
produces
verifies
applies to
affected by
etc.

Provide an accessible list fallback.

F. CHANGE & IMPACT
Use:
- current/proposed version comparison;
- proposition-level diff;
- affected-object map;
- pinned historical evidence;
- clear review candidates.

Do not imply downstream objects update automatically.

G. OPERATING CONDITIONS
This area needs a major visual upgrade.

The current checkbox + result-list model is semantically good but visually weak.

Build an interactive route diagram where toggling a condition visibly changes the available path.

Examples:
- supplied document → bounded preparation possible;
- live interface missing → live retrieval blocked;
- runtime absent → runtime execution unavailable;
- knowledge consumption route missing → reuse unavailable;
- permission missing → relevant action stops;
- authorised record-change route missing → no write/update action.

The consequence should appear near the broken path, not only as text below.

H. SEARCH & DISCOVERY
Make search a first-class knowledge interaction.

Support clear object types such as:
- Requirements
- Fields
- Instructions
- Sources
- Evidence
- Use cases
- Topics

Use grouped result design, strong information scent and contextual preview where appropriate.

Do not pretend simple lexical search is semantic/vector search.

I. SOURCE READER / PROVENANCE
Use a high-quality reading composition:
- source passage;
- line/index references;
- highlights;
- metadata;
- source/version;
- linked interpretation / requirement / field / evidence;
- clear return to previous task context.

J. EVIDENCE / EVALUATION
Create a dedicated visual language for:

real work
→ AI output
→ human outcome
→ observation
→ evaluation
→ review candidate.

Possible dimensions:
- source fidelity;
- quality;
- grounding;
- failure mode;
- adoption;
- latency.

Observation must not visually imply automatic promotion into governed knowledge.

K. HUMAN / AI / AUTHORITY BOUNDARY
Use a clear boundary representation.

AI may:
retrieve
structure
compare
draft
prepare
suggest.

Human / controlled process may own:
interpretation where required
material judgement
approval
authoritative record change
consequential outcome
accountability.

Make clear that the boundary varies by task and control, not by model confidence alone.

L. HUMAN-READABLE → MACHINE-USABLE → EXECUTABLE KNOWLEDGE
Create one of the Hub’s signature explanatory graphics.

Human-readable:
policy / SOP / requirement / method / experience

→ structured:
concepts / relationships / field meaning / instructions / examples / constraints

→ executable context:
skills / methods / tools / output contract / evaluation

→ AI-assisted work.

Explicitly communicate:
machine-readable ≠ automatically approved
machine-readable ≠ automatically applicable
machine-readable ≠ automatically executable.

M. SKILL / EXECUTION-KNOWLEDGE ANATOMY
Show a skill as a structured execution contract:

purpose
trigger
required context
method
tools/interfaces
constraints
output contract
escalation
evaluation
references
version/maintenance.

N. STATUS / UNCERTAINTY
Create a coherent semantic state language for:

current
proposed
unknown
uncertain
source missing
version mismatch
interface unavailable
not applicable
requires review
rejected for reuse
invalid / failed validation.

Do not use green/red as the only information carrier.

O. RESPONSIVE PROJECTION
The same semantic model should reflow intentionally:

desktop = full relationship context
tablet = focused panes / progressive disclosure
mobile = task-focused ordered sequence

Do not simply shrink desktop diagrams.

==================================================
9. HOMEPAGE REDESIGN
==================================================

The homepage must be substantially stronger than V19 while keeping the work-centred thesis.

Keep the opening concept:

“How AI fits into CLM work”

but redesign the experience.

The homepage should answer before a click:

1. What work are we talking about?
2. What can AI contribute?
3. What kinds of knowledge/context support it?
4. Where does human responsibility remain?
5. What can become reusable?
6. What conditions change what is possible?
7. Where can I go next?

Use approximately 2–3 major authored explanatory visuals on the homepage — not 12.

Suggested rhythm:

1. strong orientation + primary explanatory illustration;
2. quiet explanatory bridge;
3. knowledge transformation graphic;
4. representative CLM work paths;
5. operating-conditions visual;
6. search/explore entry into the knowledge system.

Use visual pacing:
large → quiet → medium → dense → quiet → large.

Avoid the current pattern:
hero graphic → mostly text rows → green text panel → links.

==================================================
10. CONTENT FRAMING
==================================================

The Hub should feel broader than source-of-wealth.

The SOW specimen remains valuable because it tests:
- source fidelity;
- field meaning;
- missing information;
- review;
- provenance;
- reuse boundaries.

But it is one specimen.

Add at least one materially independent transfer case that tests whether the semantic model generalises.

A good candidate is regulatory / instruction change:

source provision
→ interpretation
→ instruction
→ requirement impact
→ implementation/test candidates
→ evidence needing review.

Do not invent real AMLR provisions or approved SEB interpretations for the example.

Use clearly synthetic/illustrative content unless actual sourced material supports the claim.

==================================================
11. DESIGN SYSTEM ARCHITECTURE
==================================================

Build a reusable system, not page-specific CSS.

Use three levels.

LEVEL A — PRIMITIVES
Surface
Stack
Inline
Grid
Text
Divider
Icon
Button
Tabs
Disclosure
Drawer/Dialog
Popover/Tooltip
Input
Select

LEVEL B — SEMANTIC COMPONENTS
SourceReference
StatusIndicator
RelationshipLabel
EvidencePointer
ObjectIdentity
VersionMarker
UncertaintyMarker
ReviewBoundary
MissingCondition
AuthorityBoundary

LEVEL C — EXPLANATION PATTERNS
SourceInterpretationPair
RequirementWithAcceptance
VersionComparison
WorkedTrace
ReuseReview
ImpactReview
ConditionRoute
RelationshipExplorer
KnowledgeTransformation
EvaluationTrace

Use semantic tokens rather than hard-coded visual meaning:

surface.page
surface.elevated
surface.reading
relationship.confirmed
relationship.proposed
state.current
state.proposed
state.uncertain
state.unavailable
state.review
evidence.present
evidence.missing
etc.

Do not encode “approved” or “verified” purely through a green style.

==================================================
12. TYPOGRAPHY
==================================================

Preserve the design intent around SEB Sans Serif.

If approved SEB Sans Serif is present locally in the implementation environment, use it.

If it is not present:
- use the honest fallback already established;
- do not bundle or impersonate proprietary font binaries;
- do not silently substitute another face and label it SEB Sans.

The visual design must still work well under the fallback.

Do not rely on the generated serif display face in the images as an approved font.

==================================================
13. INTERACTION DESIGN
==================================================

Make the Hub genuinely interactive, not just animated.

Good interaction should reveal more meaning.

Examples:

Selecting a source:
→ highlights the exact passage and provenance.

Selecting a knowledge object:
→ reveals meaning, scope, relationships and source.

Selecting a relationship:
→ explains what the typed relationship means.

Changing a version:
→ changes the impact candidates.

Removing an operating condition:
→ reroutes or blocks the affected path.

Selecting an evidence item:
→ shows what it actually supports and what it does not.

Selecting an object from search:
→ preserves search context and supports reliable return.

Required behaviours:
- deep-linkable state where appropriate;
- Back/Forward works;
- source return restores context;
- focus is restored;
- keyboard navigation works;
- visible focus states;
- no essential hover;
- reduced-motion support;
- selection state is explicit;
- long content uses progressive disclosure;
- dialogs/drawers never become dead ends.

Motion should communicate consequence:
selection
routing
relationship focus
version change
impact.

Do not use decorative motion.

==================================================
14. ENGINEERING CONSTRAINTS
==================================================

Do not migrate frameworks merely to make the redesign easier.

The current dependency-free static architecture is a feature unless actual evidence shows it cannot support the desired interaction.

Prefer:
- semantic HTML;
- CSS;
- controlled SVG;
- deterministic layout;
- progressive enhancement.

Do not add a force-graph library or large frontend dependency for a visual effect.

Protect:
- current routes;
- object IDs;
- source IDs;
- search;
- notes;
- exports;
- scoping;
- history;
- theme;
- presentation view;
- source reading;
- full chapter/topic content;
- existing qualified content;
- current tests.

Do not hand-edit generated docs/.

Edit src/ and regenerate docs/.

==================================================
15. FACTUAL / GOVERNANCE GUARDRAILS
==================================================

Preserve V19’s source discipline.

Never invent:
- production status;
- integration status;
- approvals;
- owners;
- risk ratings;
- measured ROI;
- evidence counts;
- freshness dates;
- platform permission;
- legal interpretations.

Keep:
- law/regulation;
- approved interpretation;
- business requirement;
- implementation;
- observation/evidence;
- inference;
- proposal;
- target state

visibly distinct when material.

Source-linked is not verified.

A strategy platform lane is not workload permission.

A runtime does not create an interface.

An interface does not create authorisation.

A document’s presence does not mean a runtime consumes it.

A proposed test is not an observed pass.

An observation is not automatic knowledge promotion.

==================================================
16. VISUAL QUALITY BAR
==================================================

The existing V19 is not the visual target.

Do not stop once:
- colours match;
- cards are polished;
- typography is cleaner.

The target requires a material increase in:
- authored illustration;
- representation variety;
- composition;
- spacing;
- visual hierarchy;
- information density control;
- interaction clarity;
- product distinctiveness.

The attached design-system boards should be recognisable in the resulting product.

A reviewer looking at the implemented pages beside the reference deck should conclude:

“These belong to the same design system.”

But the website should be more usable and semantically accurate than the generated images.

==================================================
17. VALIDATION
==================================================

After implementation:

Run:
npm run build
npm test
npm run check
npm run package

Then, if an authorised browser capability is available, perform real rendered QA.

At minimum inspect:
- 1920px desktop
- 1440px desktop
- 1280px laptop
- tablet
- 390px mobile
- 320px narrow mobile
- 200% zoom
- light mode
- dark mode
- reduced motion

Test:
- Overview
- Work paths
- Knowledge
- Conditions
- Search
- Object inspector
- Source reader
- relationship view
- change/version interaction
- evidence view
- scoping
- Back/Forward
- deep links
- source return
- dialogs
- keyboard only
- focus order
- focus restoration
- overflow
- long source text
- exports/downloads.

Do NOT claim browser or reader validation if you cannot actually run it.

Capture screenshots of the important rendered states when possible and compare them against the visual reference deck.

==================================================
18. READER ACCEPTANCE
==================================================

The finished design should make these questions answerable without explanation from the builder:

After ~30 seconds:
- What is this Hub for?
- What kind of CLM work can AI assist?
- Why does knowledge/context matter?

After following a task:
- What came from the source?
- What was prepared by AI?
- What remains unresolved?
- Who makes the consequential decision?

After exploring conditions:
- Why can document analysis work while live retrieval cannot?
- Why are runtime, interface and permission different?

After exploring change:
- Why does evidence for an old version not automatically prove the new version?

After exploring reuse:
- Why does a useful artifact not automatically become reusable institutional knowledge?

If the interface cannot make those distinctions clear, keep iterating.

==================================================
19. DEFINITION OF DONE
==================================================

Do not stop at a first visual pass.

The work is complete when:

- V19 semantic/content architecture is preserved;
- the site clearly reflects the attached visual system;
- design quality is consistent across all major areas, not only the homepage;
- different reasoning tasks use different appropriate representation types;
- source-of-wealth is one worked example rather than the visual identity of the Hub;
- operating conditions are visually interactive;
- search/discovery feels like a knowledge product;
- relationship/object/source/evidence views are coherent;
- responsive behaviour is intentional;
- automated tests pass;
- rendered QA is completed where tooling permits;
- remaining uncertainty is explicitly reported;
- docs/ is regenerated from src/;
- commits are pushed to the V20 branch;
- no Pages publication/access change is performed.

At the end, provide:

1. summary of what changed;
2. design rationale;
3. architecture changes;
4. screenshots / rendered states if browser tooling was available;
5. test results;
6. remaining issues and evidence gaps;
7. commit SHA / branch;
8. recommendation on whether V20 is ready to merge into main.

Continue working until the complete visual/product implementation and testing pass is finished. Do not stop after creating a plan or one redesigned page.