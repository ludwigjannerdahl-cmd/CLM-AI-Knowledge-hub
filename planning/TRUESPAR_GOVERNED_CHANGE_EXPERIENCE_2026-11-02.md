# CLM AI Knowledge Hub — Truespar architectural transfer and governed-change story

**Status:** Research/design package only, 2026-11-02. The live product is the coherent CLM explanatory website, NOT a new graph explorer or an internal bank workflow engine. Do not alter public main, deploy GitHub Pages, assert approved banking policy, ingest SEB confidential work material or replace V22 composition work. Reconcile before development with PRs #7–#9 and AGENTS.md. The Hub has 13 chapters, rich evidence traces, typed semantically qualified concepts and source-linked work examples to preserve.

## 1. Binding user job, not infrastructure fashion

The user wants people to understand what CLM AI enables, why, how, when it is permitted, who is responsible, and what the evidence proves. Current source:
- src/semantic/knowledge-to-capability.json — authored illustrative nodes, typed/qualified edges, source boundaries and object crosswalk.
- scripts/validate-semantic.mjs — fail-closed integrity: stable IDs, status semantics, qualified non-entailing relationships, permission/applicability/review/observed-test vocabulary.
- src/semantic-reasoning.js — simulated applicability/permission distinctions and observed-test checks.
- src/chapters.json and src/data.js — canonical explanatory content and object references.
- src/semantic-atlas.js and related CSS — the existing useful reader experience.
- planning/V22_* and the reviewed golden scenes — product presentation constraints.

**Avoid duplicate ontology**: The editor's core objects and work examples must remain the single source of meaning; introduce *derived* reader views over existing IDs rather than a competing knowledge graph service.

## 2. Transfer Truespar's implementation lessons

1. **Scriptor**: crates/scriptor-edit/src/lib.rs routes both human and agent edits through one typed EditOp + EditContext (actor, time, mode, rationale), with tracked changes; docs/testing.md separates byte-level preservation, real save-path preservation, schema validity, geometry and visual diff. For CLM, reuse the **operation vocabulary and testing layers**, not the OOXML editor or collaborative CRDT. Sources: https://github.com/truespar/scriptor/blob/main/crates/scriptor-edit/src/lib.rs ; https://github.com/truespar/scriptor/blob/main/docs/testing.md .
2. **Traverse**: semantic graph as a rebuildable read model. We already have qualified relationships, so only adopt traversal/graph UI patterns when they make source-to-work understanding faster. A graph database or vector service is unwarranted for small authored, static, public illustrative content. Source: https://github.com/truespar/traverse/blob/main/README.md .
3. **SiftX**: independent extraction reference and malformed-input tests. For Hub, translate to source-document fidelity checks and traceable document captions. Do not infer regulation from parsed text. Source: https://github.com/truespar/siftx/blob/main/docs/testing.md .
4. **Sentio**: metadata-only event notifications and idempotent change processing. Translate to an offline change candidate with source/version IDs; no need to deliver sensitive payloads, deploy SMTP or build event infrastructure. Source: https://github.com/truespar/sentio/blob/main/README.md .
5. **Paddock**: equal-scenario side-by-side evaluations. Apply this to V22 visual and comprehension testing. Do not choose a prettier layout because one mock screenshot was impressive; use stable task scenarios across variants. Source: https://github.com/truespar/paddock/blob/main/README.md .

## 3. The next useful product capability: 'What changed, why, and which work is affected?'

**Synthetic illustrated task**: A proposed KYC instruction changes applicability for a client type.
- Show SOURCE: authority/document with publication and version state, not silently labelled live or legally operative.
- Show MEANING: subject, concept, permitted interpretation, limitations and jurisdiction.
- Show IMPACT: which synthetic business workflow, data mapping, Fen-X illustration, Kaicy answer boundary and proposed test might be affected.
- Show CHANGE: attributed human/agent proposal with before/after, rationale and source links. Mark it NOT_APPROVED.
- Show REVIEW: who can evaluate, evidence required, conflicting interpretation and explicit unresolved conditions.
- Show OUTCOME: proposed test vs actual observed test result. An unexecuted test does not become PASS.

The reader should traverse this path from an existing useful-work scene and return without losing context. A graph visualization is secondary to understanding.

## 4. Proposed immutable proposal contract (illustrative only)

A proposal object should include:
proposal_id, actor_kind (human|agent), actor_id (synthetic demo), proposed_at, baseline_object_id, baseline_hash, source_reference_id, source_version, purpose, operation_type, suggested_value, rationale, semantic_impact_ids, status (candidate|in_review|reviewed_for_publication|rejected|superseded), test_execution (not_run|observed_pass|observed_fail|inconclusive), evidence_locator, validation_errors, reviewed_by_if_real.

Proposed operations: ADD_RELATIONSHIP, QUALIFY_RELATIONSHIP, PROPOSE_MAPPING, SUGGEST_TEST, SUPERSEDE_CLAIM, RECORD_REVIEW_OBJECTION. Do **not** implement APPROVE_BANK_POLICY, ALLOW_REAL_USER, EXECUTE_FENX or CLAIM_TEST_PASS. Unknown permission/applicability and missing source block the illustrated 'eligible' state. No candidate UI operation may mutate the canonical semantic atlas or banking instruction state without a reviewed source change.

Non-functional: stable object IDs, text and keyboard navigation, high contrast, mobile parity, no invented operational data, no PII, citations/version visible at point of claim, ability to inspect historical versions. Privacy-safe, entirely synthetic authored examples only.

## 5. Implementation roadmap, tied to one reader journey

### C-0 (P0): golden task and independent acceptance baseline
- Choose the synthetic KYC change thread using existing Hub objects/relations; first audit the exact canonical IDs and avoid adding new divergent classes.
- Freeze a baseline tested on desktop and mobile: reader can identify authoritative source, condition, human decision and missing evidence without ontology jargon.
- Document at least 8 specific tasks across Understand / Explore / Inspect and 4 deliberate misconception traps (proposal is not policy, graph link is not causal proof, unknown permission is not allow, unrun test is not observed pass). Run design review in existing V22 process, not a competing design project.
- **Deliverable:** annotated end-to-end story script, two independently reviewed visual composition alternatives, failure list and expected user inference. NO production deployment.

### C-1 (P1): typed proposal and impact trace research
- Derive a change overlay keyed to src/semantic/knowledge-to-capability.json and src/data.js stable IDs. Keep baseline unmodified; run through scripts/validate-semantic.mjs semantics and new proposal-specific checks.
- Create an optional inspect-and-compare pane: who suggested what, original/edited meaning, relationship proof path, objections, affected work and independent test status.
- Integrity tests: wrong source ID, stale hash, cross-scope edge, illegal authority upgrade, contradictory applicability, absent human review, fabricated execution, cyclic path, broken return/navigation state.
- **Accept only if:** no candidate may alter authoritative labels; no unsupported inference can be presented as fact; 100% of published illustrative change examples retain qualifiers and navigable sources.

### C-2 (P2): reader value and visual regression
- Use the same scripted reader questions against current Hub vs proposed overlay. Compare task success, time-to-source, explanation accuracy, source-return ability, false 'approved' inferences and subjective cognitive load. Sample actual mixed business/technical readers; automated DOM tests alone do not establish comprehension.
- Keep current build route, generated docs artifact, 13 chapters and approved brand constraints unchanged.
- Run npm run build, npm test, source/route checks, real Chromium desktop/tablet/mobile interaction snapshots and visibility checks; separately retain explicit human review before publication.
- If the proposal adds semantic complexity without helping readers answer a concrete business question, reject it.

## 6. Architectural decision

**Adopt now:** one typed and attributed change-proposal vocabulary, source-conditioned impact trace, preservation-oracle tests, task-based comparative design protocol.

**Do not adopt now:** Traverse graph server, Paddock model service, Scriptor engine, Sentio email server, a new production bank-policy approval engine or a second semantic source of truth.

**Operational boundaries:** This is public GitHub code. Do not copy internal SEB policies, screenshots, employee/client facts, live Fen-X workflows, or regulatory interpretations without explicit classification and publishing approval. Only published facts and carefully synthetic illustrative content belong here. All capability and permission assertions must remain non-entailing and explicitly unapproved when not verified.

Primary-source evaluation analogies: https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-generative-artificial-intelligence ; https://opentelemetry.io/docs/specs/semconv/ .
