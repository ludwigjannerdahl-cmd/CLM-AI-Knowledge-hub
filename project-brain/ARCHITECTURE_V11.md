# Ontology reconciliation v0.11 — architecture note

## What changed
The authored V22 Hub source **itself** contains three worked paths (preparation, development, instruction change), four explanation layers, eight enabling conditions and six customer-context domains. The separate `ontology_v11_alignment.json` captures those authored memberships and retains four conditional object links. These are **references in an explanatory site**, not evidence of deployed integrations, granted permissions, executed tests, approved instructions or funded products.

Source: `src/data.js` on `v22-golden-scenes`, Git blob `39d371f7f7b38ddc2bbd5b644a9f8befb3836ba3`. `verify_alignment.py` fails if this source changes or a referenced object/topic disappears. Do not silently reuse mappings after drift.

## Shared conversation: deliberately unresolved
The user supplied https://chatgpt.com/share/6ad3ee26-c3f0-83ed-aa0c-e60f482a14e8. Available web access did **not** retrieve its content. Register it as **unread, zero extracted claims**. Never guess what the session is about or quote it from a summary of a different chat. Obtain the transcript before deriving session-specific ontology claims.

## Actual source-to-claim procedure
1. Inventory full `src/chapters.json` and `src/data.js` with hashes and author-provided identifiers.
2. `stage_passages.py` writes each JSON string verbatim with a stable JSON-pointer ID and SHA-256 content fingerprint. The output is a **source passage**, not an atomic true claim. GitHub Actions publishes a review-only artifact with zero approved claims.
3. Segment significant claims against exact passages; attach scope, authority type, party/process version, time, origin and review status.
4. Candidate ontology relations must specify named predicate, subject, object, applicability and type. Distinguish `authored_reference` from `supported_requirement`, `implementation_observation`, `human_decision`, and `verified_result`.
5. Review and accept exact claims; only approved-to-publish Hub content enters projections. Such editorial review does not confer institutional regulatory approval.
6. Rebuild views from the canonical IDs; test unknown versus false, current versus proposed, and proposed test versus executed result.

## Provenance debt
The prior Project Brain v0.10 has 24 candidate captures pointing to broad `session:S-*` labels. Those are not exact transcript citations and cannot ground authoritative historical claims until reconciled.

## Runtime
This is a **draft integration branch**. It can process Hub source changes after checkout, but it cannot automatically access arbitrary future ChatGPT conversations. The personal Second Brain repository and the published Hub remain unchanged. GitHub Actions execution and the real V22 full-passage artifact must be verified independently.

## Falsification test
If the pipeline treats a synthetic object as operational, an unread session as evidence, a proposed test as an observed pass, or a content change as an approved revision, the release fails regardless of graph connectedness.
