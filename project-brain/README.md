# CLM Project Brain — integration staging
This is a **feature-branch implementation**, not a deployed cross-session service.

## Verified boundary
- The Hub authored source files are indexed deterministically, with hashes and stable identifiers.
- CI checks for drift against a committed manifest; it does not silently rewrite canonical knowledge.
- No claim is promoted to approved policy, regulation, implementation or observed outcome.
- No GitHub workflow can access arbitrary ChatGPT conversation history. Automatic future-session capture requires an authorized event source / connector and a defined delivery contract.
- A scheduled run can detect Hub changes; it cannot capture messages from ChatGPT.
- This is in the existing Hub repository as a reviewable integration branch, **not** a new dedicated repository.
- The personal Second Brain remains unchanged.

## Intended next integration
Authorized capture event -> immutable source reference and content fingerprint -> candidate claim with origin -> deduplication -> human review -> versioned promotion -> Hub view projection. Never infer approval from a source mention.
