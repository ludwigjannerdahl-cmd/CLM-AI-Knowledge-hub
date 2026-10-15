# V22 Information Payload — make the Hub teach something

## Why this exists

The current nine golden scenes are not only visually too simple. They also carry too little useful information. They mostly expose abstract relationships — work, context, review, evidence — without letting a reader reconstruct a concrete CLM mechanism.

The next Astra pass must increase **semantic payload**, not just visual ambition.

A scene fails if the reader leaves with only a slogan such as “AI needs context” or “humans stay accountable.” The scene must teach what the context is, how it changes the work, what output is produced, what remains unresolved, what evidence would be needed and what the next controlled step is.

## Concrete anchor case

Use one stable synthetic specimen across the first story so the reader can follow the same material through different types of CLM work.

### Source specimen

Synthetic source line:

> CLIENT [14]: “I sold my company in 2024.”

This supports a reported wealth-origin event. It does **not** establish proceeds, corroboration, net worth, verification, plausibility or a categorical lookup value.

### Instruction

`INS-01@1` — Preserve what the source says.

Required treatment:

- record the stated wealth-origin event and its source;
- retain missing amounts/corroboration as unresolved;
- separate preparation from verification/plausibility judgement;
- another task needs its own applicability and ownership review.

### Field/process context

`CTX-FENX@2026-08-18`

Relevant distinctions:

- natural-person client: `individualSourceOfWealth`;
- related party: `SourceOfWealth`;
- legal entity: `legalEntitySourceOfWealth`;
- the event description can be illustrated against `sourceOfWealthSignificantEvent`;
- current NP lookup values and verified cross-version aliases are not supplied;
- knowledge about field meaning is different from an operational read/write interface.

### Method

`METHOD-01@1` — Prepare a source-linked observation.

Inputs:

- indexed passage;
- subject;
- applicable instruction;
- field meaning.

Method:

`identify → map cautiously → cite → expose gaps → review`

Failure modes include wrong subject, unsupported categorisation, invented amount and judgement represented as fact.

### Prepared output

`OBS-01@1`

Candidate output:

- event: client states that they sold their company in 2024;
- candidate event field: `sourceOfWealthSignificantEvent` for the NP client subject;
- source pointer: line 14;
- unresolved: amount, supporting evidence, categorical NP lookup and source date;
- verification/plausibility judgement: not inferred.

This is a much richer teaching object than an abstract box labelled “AI prepares”.

## Three work modes from the same semantic core

### Run CLM — prepare a reviewable observation

Reader should be able to see:

- supplied line 14;
- instruction `INS-01@1`;
- field/subject context `CTX-FENX@2026-08-18`;
- method `METHOD-01@1`;
- output `OBS-01@1`;
- unresolved information;
- human review question: is the source represented faithfully, is the subject right, and are the gaps explicit?

The AI contribution is concrete: retrieve/structure/prepare. It does not verify, approve or write an authoritative customer record.

### Develop CLM — turn intent into testable behaviour

Use the same instruction and context to show a different kind of work:

`INS-01@1 → REQ-01@1 → MAP-01@1 → TEST-01@1 → EVID-01@1`

The reader should be able to inspect:

- input condition: an event is stated but amount is absent;
- expected behaviour: retain event + provenance; expose the missing amount;
- mapping: use the reported event field without inventing an unresolved categorical lookup;
- negative tests: wrong party, guessed lookup value, invented proceeds, verification inferred from transcript alone;
- evidence gap: no observed test run / implementation version / observer is supplied.

The scene must make “requirement/test/evidence” materially more concrete than three boxes connected by arrows.

### Govern / change CLM — trace what a revision actually changes

Use `INS-01@2` as a candidate revision:

> Also capture the source date, or explicitly state that it is not supplied.

This must create visible consequences without implying automatic propagation:

- `INS-01@2` is a change candidate, not approved;
- `REQ-01@1` becomes an impact-review candidate;
- `TEST-01@1` becomes an impact-review candidate;
- previous evidence remains pinned to `INS-01@1` / `REQ-01@1` scope;
- a version-2 claim requires relevant new evidence.

The reader should see exactly **what question changes**, not merely an animated “impact path.”

## Operating-condition payload

The first story should also teach why capability depends on the operating route.

Keep these distinctions visible:

- supplied document/context available;
- live interface available or unavailable;
- identity/permission separate from interface existence;
- write route separate from read route;
- runtime availability separate from interface availability;
- tested consumption route separate from having a document in a library.

Do not represent these as generic red/green maturity scores.

## Reuse payload

`REUSE-01@1` should make the next-use question concrete.

A future task may reuse selected instruction, field knowledge or method only after checking:

- meaning;
- applicability;
- source authority;
- ownership;
- maintenance;
- permitted consumption.

Ownership is not assigned in the supplied context. The design must show that absence rather than silently filling it.

## Competency questions for Useful work first

A successful first experience should let a reader answer these without reading a long explanatory essay:

1. What exact CLM task is being performed?
2. Which source/instruction/context objects inform it?
3. What does the AI actually do to the material?
4. What concrete output is produced?
5. What remains unknown or unresolved?
6. What does the human reviewer have to judge?
7. Which operating condition would change what the AI can do next?
8. What evidence exists, and what evidence is missing?
9. What could potentially be reused in another task?
10. What additional checks are required before that reuse?

If the composition cannot support these answers, it is too shallow even if it is visually excellent.

## Information-density rule

Do not solve the problem by adding paragraphs.

The first frame should expose multiple levels of information simultaneously through recognisable objects, material differences, traces, annotations and spatial grouping. Exact detail can appear through progressive inspection, but the first frame must already contain enough concrete substance that the product feels like a serious CLM intelligence surface rather than a conceptual poster.

A useful heuristic:

> At normal desktop viewing distance, the reader should see the mechanism. On closer inspection, the reader should discover exact source/object/evidence detail.

## Acceptance gate

Three gates now apply independently:

1. **Visual:** would the screenshot plausibly belong among the strongest reference boards?
2. **Semantic:** are authority/state/evidence distinctions preserved?
3. **Informational:** does the scene teach enough concrete CLM substance to answer the competency questions above?

A direction that passes only two of three is rejected.