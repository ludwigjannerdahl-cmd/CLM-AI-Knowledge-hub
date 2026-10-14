---
title: "CLM AI Operating Model — Intelligence Layers, Enablers, AI-Native Development and Scaling"
version: "1.0"
date: "2026-10-09"
status: "Working knowledge synthesis — not an approved SEB policy or architecture"
ownership_context: "PWM&FO / Client Lifecycle Management (CLM)"
intended_consumers:
  - "AI assistants and agents supporting CLM product, development, regulatory analysis and governance"
  - "CLM product managers, business analysts, developers, architects, risk/compliance partners and data owners"
  - "Future CLM Knowledge Hub / SharePoint / GCP knowledge services"
purpose:
  - "Create one coherent explanation model for scaling AI within CLM"
  - "Connect SEB's AI sub-strategy with CLM-specific architecture and operating practices"
  - "Translate lessons from Freda's public operating model into a regulated-bank context"
  - "Define how data products, knowledge products, machine-readable requirements and agent harnesses compound"
  - "Define an AI-native way of working across Run, Develop, Govern and Manage CLM"
source_classes:
  internal_primary:
    - "AI sub-strategy v1.0 (SEB Group Technology — Strategy & Change, 2026-05-08)"
    - "CLM AI Knowledge Hub.html — uploaded snapshot, 10,913 lines"
    - "AMLR_HUB_GOVERNING_SPEC.md"
    - "06_PRODUCTION_GOVERNANCE.md"
    - "05_RUNTIME_AND_HARNESS_COMPATIBILITY.md"
    - "07_EVALUATION_AND_OBSERVABILITY.md"
    - "02_SOURCE_AUTHORITY.md"
  public_external:
    - "Freda public platform, discover, orchestrate, deploy and agents pages"
    - "Freda public Legal Engineer role"
    - "ACCA / Accounting and Business article describing 20-60-20 usage among professional-services firms"
    - "Robert Menetray's documented 20-60-20 development workflow"
evidence_rule: "Preserve the distinction between source fact, internal interpretation, proposed CLM design, AI inference and open question. Do not silently promote a proposal into an approved operating model."
---

# CLM AI Operating Model — master knowledge file

## 0. How this file should be used

This document is a **machine-readable strategic knowledge artifact**, not a presentation and not an approved policy. Its job is to give future AI systems a coherent model of how AI should scale inside Client Lifecycle Management (CLM) in PWM&FO.

When an AI uses this file, it should:

1. Preserve distinctions between **law, SEB interpretation, business requirement, technical implementation, observed evidence and AI inference**.
2. Prefer reusable CLM capabilities over isolated AI use cases.
3. Treat **FenX as an authoritative operational KYC system**, not as an AI knowledge layer.
4. Treat **SharePoint / CLM AI Hub as a human-facing knowledge and governance surface**, not automatically as the system of record for runtime state.
5. Treat **GCP as the strategic high-control AI and machine-intelligence surface where justified by data, orchestration and control requirements**, while recognising that Copilot Studio / Power Platform and M365 remain valid lanes for appropriate use cases.
6. Never assume an agent, model or platform is the strategy. The strategy is the **shared CLM intelligence, data, controls and operating capability** that multiple runtimes can consume.
7. Use the 20/60/20 model as a **working heuristic**, not a mandated or universal ratio.
8. Challenge any strategy in which agent count, prompt count or model usage grows faster than reusable data products, knowledge products, controls, tests and evaluation assets.
9. Keep uncertainty explicit. Unknown must remain unknown until validated.

---

# 1. Governing thesis

## 1.1 Core thesis

CLM should not scale AI primarily by creating more agents. It should scale AI by building **reusable, governed CLM intelligence** that can be consumed across product development, regulatory work, KYC operations, reporting and future agentic workflows.

The operating model can be explained through three complementary views:

### A. Intelligence and execution layers — what CLM is building

1. **Regulatory Engine** — what must be done and why.
2. **CLM Context Graph** — what is true in the specific customer, process and system context.
3. **Operating Plane** — how requirements are implemented, controlled, evidenced, tested and owned.
4. **Agentic Execution** — what AI can safely do using the three layers underneath.

### B. Enablers — what makes the layers usable at scale

- Data products.
- Knowledge products.
- APIs and events.
- Identity and access.
- Common semantic model and metadata.
- Agent harness and reusable skills/tools.
- Platforms and runtime infrastructure.
- Evaluation and observability.
- Governance, lifecycle and ownership.
- Synthetic/anonymised development data where appropriate.

### C. AI-native way of working — how CLM work changes

AI affects more than operational KYC. It changes how CLM:

- **Runs** KYC and lifecycle operations.
- **Develops** systems, requirements, tests and architecture.
- **Governs and changes** policy, regulation, controls and compliance implementation.
- **Manages** KPIs, reporting, portfolio decisions and management communication.

A useful working heuristic is:

> **Human defines what good looks like → AI performs a large share of the bounded execution → human verifies against the definition of good.**

This is often expressed as **20% / 60% / 20%**, but the percentages should vary with risk, ambiguity and verifiability.

---

# 2. Why this model is needed

CLM currently has many important AI-related assets and initiatives:

- FenX and its structured KYC workflows.
- KAICY and adjacent AI capabilities.
- M365 / Copilot Studio / Power Platform opportunities.
- GCP / Vertex AI development patterns.
- AMLR / AMLA analysis and the AMLR Knowledge Hub.
- CLM AI Knowledge Hub and SharePoint structures.
- Reusable skills, knowledge packages and governance modules.
- AI use-case classification and model-card concepts.
- A growing portfolio of proposed AI capabilities.

The failure mode is **concept proliferation**: each initiative develops its own knowledge, prompts, mappings, integrations, controls and evaluation logic. This creates local progress but global fragmentation.

The desired direction is:

> **One CLM knowledge model. One capability model. Multiple interfaces and runtimes.**

The model should make it possible for a KYC requirement written today to become useful tomorrow for:

- FenX development.
- test generation.
- regulatory impact analysis.
- KAICY reasoning.
- audit traceability.
- future agentic workflows.
- KPI and control monitoring.

That is the compounding mechanism.

---

# 3. Evidence and authority model

## 3.1 Never collapse authority levels

A core design rule is:

```text
Legal source
≠
SEB interpretation
≠
Policy / instruction
≠
Business requirement
≠
Technical implementation
≠
Observed system evidence
≠
AI inference
```

These layers may be connected, but they must remain distinguishable.

## 3.2 Minimum claim metadata

For material knowledge, record where possible:

- claim or object ID;
- claim type;
- exact source;
- source authority;
- jurisdiction;
- valid-from / valid-to;
- recorded-at;
- approval status;
- owner;
- confidence / uncertainty;
- supersedes / superseded-by;
- downstream objects affected;
- revalidation status.

## 3.3 Recommended authority states

```yaml
authority_state:
  - binding_law
  - regulatory_guidance_or_level2
  - approved_seb_interpretation
  - approved_policy_or_instruction
  - approved_sop
  - observed_system_evidence
  - validated_business_requirement
  - validated_test_evidence
  - working_interpretation
  - proposal
  - ai_inference
  - open_question
```

AI may create proposals and candidate mappings. It must not silently promote them into approved institutional truth.

---

# 4. The Freda-derived explanation model

## 4.1 Why Freda is useful as inspiration

Freda publicly describes four connected layers:

- Regulatory Engine.
- Company Graph.
- Operating Plane.
- Agentic Execution.

The value of this model is explanatory clarity. It separates **regulatory knowledge, company context, operational control state and execution**.

The public Freda material suggests that its differentiator is not simply retrieval over compliance documents. It is attempting to build a connected compliance state model where agents act against structured obligations, company context, controls, evidence and permissions.

### Important evidence boundary

Freda's exact internal implementation is not public. Do not assume:

- a specific graph database such as Neo4j;
- a specific event architecture;
- a particular vector store;
- exact model-routing technology;
- exact storage separation.

What is useful is the **logical architecture**, not speculation about proprietary implementation.

---

# 5. Layer 1 — Regulatory Engine

## 5.1 Definition for CLM

The Regulatory Engine is a machine-readable model of:

- regulation;
- regulatory guidance / Level-2 material;
- SEB-approved interpretation;
- KYC policy and instructions;
- SOP logic;
- applicability;
- exceptions;
- dependencies;
- effective dates;
- regulatory change.

It answers:

> **What are we required to do, for whom, under which conditions, and why?**

## 5.2 Why it matters

Without this layer, an AI system repeatedly performs legal interpretation from documents at runtime. That creates:

- inconsistency;
- hallucination risk;
- difficult auditability;
- repeated interpretation cost;
- inability to perform reliable change impact.

With a Regulatory Engine, the AI reasons over **structured, governed regulatory knowledge**.

## 5.3 Current CLM/PWM&FO assets that contribute

- AMLR Hub.
- AMLR_HUB_GOVERNING_SPEC.
- AMLA / AMLR source mapping.
- KYC Instructions.
- SOPs.
- policy interpretations.
- source-authority rules.
- regulatory gap analyses.

The AMLR governing specification is already close to an early Regulatory Engine because it calls for canonical obligation IDs, explicit source authority, versioned interpretation objects, change propagation and stable links into FenX capabilities, evidence, tests and remediation.

## 5.4 Target regulatory object example

```yaml
obligation_id: EU-AMLR-2024-1624-A024-P01-R01
source:
  regulation: EU_2024_1624
  article: 24
  paragraph: 1
jurisdiction: EU
valid_from: TBD
subject: beneficial_ownership
requirement: "..."
applicability_rules: []
exceptions: []
interpretation_ids: []
policy_requirement_ids: []
control_ids: []
status: binding_law
```

## 5.5 Value to CLM

- regulatory change impact;
- stronger AI grounding;
- consistent interpretation reuse;
- traceability from FenX behaviour back to legal basis;
- easier audit and supervisory explanation;
- faster regulatory change delivery;
- safer generation of requirements and tests.

---

# 6. Layer 2 — CLM Context Graph

## 6.1 Definition for CLM

The CLM Context Graph is the machine-readable representation of the facts and relationships relevant to CLM.

It answers:

> **What is true in this specific customer, process, product, data and system context?**

The graph should not initially model the whole bank. It should model enough of CLM to support useful queries.

## 6.2 Example domain objects

- Customer.
- Legal Entity.
- Natural Person.
- Beneficial Owner.
- Authorised Representative.
- Related Party.
- Product.
- Jurisdiction.
- KYC Profile.
- KYC Assessment.
- FenX Case / Journey.
- Risk Profile.
- Screening Result.
- Evidence Object.
- Data Product.
- Source System.

## 6.3 Example relationships

```text
CUSTOMER --HAS_PARTY--> PERSON_OR_ENTITY
ENTITY --HAS_BENEFICIAL_OWNER--> PERSON
CUSTOMER --HAS_KYC_PROFILE--> KYC_PROFILE
CUSTOMER --HAS_RISK_PROFILE--> RISK_PROFILE
CUSTOMER --HAS_SCREENING_RESULT--> SCREENING_RESULT
KYC_PROFILE --SUPPORTED_BY--> EVIDENCE
KYC_PROFILE --ASSESSED_IN--> FENX_CASE
ENTITY --OPERATES_IN--> JURISDICTION
CUSTOMER --USES_PRODUCT--> PRODUCT
```

## 6.4 Physical implementation principle

A logical graph does not require a graph database from day one.

The important requirement is:

- stable IDs;
- typed relationships;
- provenance;
- temporal validity;
- resolvable identity;
- consistent semantics.

Implementation could involve:

- relational tables;
- BigQuery views;
- event streams;
- graph storage where multi-hop queries justify it;
- APIs and data products.

## 6.5 Value to CLM

The Regulatory Engine may know:

> A particular BO rule applies when condition X exists.

The CLM Context Graph can establish:

> Condition X exists for this customer now.

That intersection creates contextual intelligence.

---

# 7. Layer 3 — Operating Plane

## 7.1 Definition for CLM

The Operating Plane is the structured state of how CLM implements, controls and proves its obligations.

It answers:

> **How are we complying, how do we know it works, who owns it, and what remains open?**

## 7.2 Core objects

- control;
- process;
- policy requirement;
- business requirement;
- system requirement;
- FenX capability;
- data dependency;
- evidence requirement;
- evidence instance;
- test case;
- test result;
- gap;
- remediation;
- task;
- owner;
- AI service;
- evaluation suite;
- deployment / release state.

## 7.3 Canonical chain

```text
Regulatory obligation
    ↓
SEB interpretation
    ↓
Policy / Instruction
    ↓
SOP
    ↓
Business requirement
    ↓
System requirement
    ↓
Control
    ↓
FenX capability / API / data rule
    ↓
Test
    ↓
Evidence
    ↓
Gap / finding
    ↓
Remediation
    ↓
Owner / status
```

This chain is the operational heart of the model.

## 7.4 Why this is strategically important

Today many of these objects exist, but the links between them are often implicit or distributed across Jira, documents, FenX configuration, test artefacts, SharePoint, spreadsheets and people's knowledge.

The Operating Plane makes the links explicit.

It creates the possibility to ask:

- Which AMLR obligations have no mapped control?
- Which controls have no test evidence?
- Which requirements changed but have not been retested?
- Which FenX capabilities have no requirement traceability?
- Which gaps lack a named owner?
- Which AI services use a knowledge source whose authority changed?

This is continuous assurance, not merely documentation.

---

# 8. Layer 4 — Agentic Execution

## 8.1 Definition for CLM

Agentic Execution is the set of AI capabilities that use the underlying regulatory, contextual and operational state to perform bounded work.

It answers:

> **What work can AI safely perform using governed CLM intelligence?**

## 8.2 Potential execution surfaces

- KAICY.
- Copilot Studio agents.
- M365 / declarative agents for lower-risk knowledge work.
- GCP / Vertex AI agents for source-first regulated workflows and deeper orchestration.
- deterministic workflows triggered by AI analysis.
- reporting and management assistants.
- regulatory-change assistants.
- development agents in GitHub Copilot / VS Code.

## 8.3 Autonomy ladder

Prefer a controlled progression:

1. Answer.
2. Observe.
3. Explain.
4. Prepare.
5. Recommend.
6. Human-approved action.
7. Bounded low-risk autonomous action.
8. Continuous monitoring / orchestration.

Customer-impacting or regulatory outcomes require stronger oversight than internal assistance.

## 8.4 Value

Once the other layers are reliable, each new agent becomes cheaper and safer because it does not need to rebuild:

- regulatory logic;
- customer context;
- data integrations;
- evidence logic;
- evaluation;
- permissions;
- monitoring.

---

# 9. Enablers beneath the layers

The four layers describe the intelligence/execution system. They cannot scale without common enablers.

## 9.1 Data products

A data product is a governed, versioned, reusable interface to trusted structured information.

For CLM, likely data products include:

- Party / Entity Profile.
- Beneficial Ownership / Related Parties.
- KYC Profile.
- KYC Assessment / Case State.
- Risk Profile.
- Screening Profile.
- KYC Evidence.
- Product / Expected Activity Context.
- Transaction / Activity Signals where approved and necessary.

Each product needs:

- schema;
- owner;
- semantics;
- source lineage;
- quality expectations;
- freshness expectations;
- access rules;
- versioning;
- standard interface.

### Critical distinction

**FenX is not itself the data product.**

FenX is an operational platform and system of record for key KYC workflow/assessment state. A data product is the stable, governed interface through which authorised consumers reuse relevant information.

## 9.2 Knowledge products

Knowledge products are the unstructured/semi-structured equivalent of data products.

Examples:

- Beneficial Ownership Requirements.
- KYC Instruction knowledge package.
- SoW / SoF knowledge package.
- AMLR obligation set.
- jurisdictional guidance package.
- FenX field / workflow definitions.
- control interpretation package.

Each should have:

- canonical source;
- authority state;
- owner;
- version;
- effective dates;
- allowed use;
- prohibited use;
- dependencies;
- validation status;
- machine-readable representation.

## 9.3 APIs and events

Agents and AI services require governed roads into systems.

Priority patterns:

- read APIs;
- write APIs with explicit approval / scopes;
- event notifications;
- event ingress;
- data sync;
- controlled adapters;
- MCP wrappers where they improve agent interoperability.

MCP is an agent-facing interface standard; it does not replace source-system integration, authentication, entitlement, transformation, error handling or ownership.

## 9.4 Identity and access

Authorisation should be evaluated against:

```text
User
× Agent / Service
× Tool
× Object
× Action
× Data classification
```

Approval of an AI application does not imply universal read/write access.

## 9.5 Common semantic model

The system requires shared meaning for objects such as:

- customer;
- party;
- beneficial owner;
- KYC profile;
- evidence;
- obligation;
- interpretation;
- requirement;
- control;
- capability;
- test;
- gap.

Without this, every use case creates its own ontology and reuse breaks down.

## 9.6 Evaluation and observability

Every production capability should have:

- benchmark / test set;
- expected outcomes;
- source-grounding tests;
- permission tests;
- tool/action tests;
- edge cases;
- failure tests;
- runtime telemetry;
- override / correction metrics;
- regression rules;
- release gates.

## 9.7 Governance and ownership

Ownership must be explicit. Avoid "the team" as an owner.

At minimum distinguish:

- business/product purpose owner;
- technical service / IT delivery owner;
- data owner;
- knowledge owner;
- control/evaluation owner;
- incident and recovery owner;
- release approver where required.

---

# 10. Requirements as machine-readable institutional knowledge

## 10.1 Strategic shift

Traditionally:

> **Requirement = communication between business and development.**

Target state:

> **Requirement = governed semantic object connecting regulation, business intent, system behaviour and verification.**

This is one of the strongest opportunities in the model.

## 10.2 Why requirements matter beyond delivery

A good requirement can encode:

- regulatory rationale;
- SEB interpretation;
- business intent;
- applicability;
- process rule;
- data dependency;
- system behaviour;
- FenX mapping;
- acceptance criteria;
- test linkage;
- evidence expectation;
- owner and version.

When validated, the requirement becomes reusable institutional knowledge.

## 10.3 Requirement as translation layer

```text
Regulation
   ↓
SEB interpretation
   ↓
Policy / Instruction / SOP
   ↓
BUSINESS REQUIREMENT
   ↓
SYSTEM REQUIREMENT
   ↓
FenX / API / Data / Control implementation
   ↓
Acceptance test
   ↓
Observed evidence
```

Requirements are therefore the bridge between the Regulatory Engine and Operating Plane.

## 10.4 Example requirement schema

```yaml
requirement_id: CLM-BO-014
requirement_type: functional
status: approved
version: 3

intent:
  title: Verify beneficial owner identity
  business_outcome: "Beneficial owners are verified using approved evidence before completion where required."

source_lineage:
  regulatory_obligation_ids:
    - EU-AMLR-2024-1624-A0XX-P0X-R0X
  seb_interpretation_ids:
    - SEB-INT-BO-00X
  policy_requirement_ids:
    - KYC-POL-BO-00X
  sop_ids:
    - SOP-LE-BO-00X

applicability:
  customer_type:
    - legal_entity
  jurisdictions:
    - SE
  conditions: []
  exceptions: []

expected_behaviour:
  statement: "..."
  must_not_do:
    - "Do not create duplicate customer-risk scoring logic in FenX."

implementation_mapping:
  system: FenX
  capability_ids:
    - FENX-CAP-BO-VERIFY
  data_product_ids:
    - DP-PARTY
    - DP-BENEFICIAL-OWNERSHIP

verification:
  acceptance_test_ids:
    - TEST-BO-014-A
    - TEST-BO-014-B
  evidence_required:
    - identity_verification_result
    - evidence_source
    - verification_timestamp

ownership:
  business_owner: TBD
  technical_owner: TBD
  validation_owner: TBD
```

## 10.5 Machine-readable requirements enable new queries

Future AI should be able to answer:

- Why does FenX ask this question?
- Which regulation drives this field?
- What would break if this requirement changes?
- Which test proves this requirement?
- Which requirements depend on this data product?
- Which AMLR changes require revalidation?
- Which requirement has no current implementation evidence?

## 10.6 Development work becomes knowledge production

This is the larger consequence:

> **CLM development no longer produces only software. It also produces machine-readable institutional knowledge.**

Every well-structured increment can improve:

- regulatory mappings;
- requirement quality;
- system understanding;
- data semantics;
- control evidence;
- test coverage;
- future AI context.

This means CLM does not necessarily need a separate grand "build the knowledge graph" programme. The graph can be built incrementally through normal delivery if the artefacts are structured and linked correctly.

---

# 11. AI-native working model: Run, Develop, Govern, Manage

AI strategy for CLM must not be reduced to operational KYC agents.

There are four value pools.

## 11.1 Run CLM

Examples:

- document extraction;
- case preparation;
- evidence summarisation;
- missing-information detection;
- KYC narrative drafting;
- gap-driven outreach preparation;
- trigger significance analysis;
- SoW/SoF preparation;
- monitoring and exception surfacing.

## 11.2 Develop CLM

Examples:

- requirement drafting;
- traceability generation;
- impact analysis;
- solution design;
- API/data contract drafting;
- code generation;
- code review;
- test-case generation;
- regression analysis;
- architecture review;
- documentation;
- migration mapping.

The SEB AI sub-strategy explicitly supports AI across design, coding, testing, review and architecture while retaining human decision authority.

## 11.3 Govern and change CLM

Examples:

- AMLR/AMLA decomposition;
- policy comparison;
- regulatory change detection;
- obligation-to-control mapping;
- gap analysis;
- control-evidence preparation;
- compliance traceability;
- supervisory evidence preparation;
- model/AI governance documentation.

## 11.4 Manage CLM

Examples:

- KPI production;
- variance analysis;
- portfolio analysis;
- roadmap dependency analysis;
- management commentary;
- steering material;
- cost/value tracking;
- delivery reporting;
- risk and issue synthesis.

---

# 12. The 20/60/20 AI-native work heuristic

## 12.1 Evidence status

The 20/60/20 split should **not** be presented as an official universal standard.

However, it has emerged independently in several professional and development contexts:

- An ACCA / Accounting and Business article reported that many senior people interviewed across 11 professional-services firms described a model where humans perform the first and last 20% while AI performs much of the middle 60%.
- Robert Menetray documented a 20% planning / 60% AI execution / 20% human validation workflow for software development, explicitly calling the percentages rough and context-specific.

This makes it a useful heuristic, not policy.

## 12.2 Principle

> **Human direction → AI leverage → Human verification**

### First ~20% — define what good looks like

Human expertise should establish:

- business problem;
- source authority;
- context;
- regulatory boundaries;
- architecture constraints;
- expected behaviour;
- prohibited behaviour;
- edge cases;
- acceptance logic;
- output contract.

### Middle ~60% — AI performs bounded execution

AI can:

- draft;
- analyse;
- synthesise;
- compare;
- generate alternatives;
- identify dependencies;
- generate tests;
- review consistency;
- produce documentation;
- write or modify code;
- run iterative checks where tools allow.

### Final ~20% — verify against the definition of good

Humans must validate:

- correctness;
- source fidelity;
- regulatory meaning;
- architecture fit;
- edge cases;
- security;
- maintainability;
- operational consequence;
- customer impact;
- acceptance criteria;
- whether the result should be promoted into institutional knowledge.

## 12.3 Ratio should adapt to risk

Do not force 20/60/20 mechanically.

Examples:

- regulatory interpretation: possibly 30/40/30 or greater human share;
- repetitive test generation with strong automated verification: possibly 10/80/10;
- customer-impacting decision logic: human verification and formal controls may dominate;
- internal drafting: AI share can be higher.

The ratio should depend on:

- ambiguity;
- consequence of error;
- verifiability;
- data quality;
- source authority;
- reversibility.

## 12.4 Important second-order effect

As generation becomes cheap, **verification becomes the bottleneck**.

Therefore CLM should invest not only in generative AI, but also in:

- test harnesses;
- checklists;
- source traceability;
- automated regression;
- typed outputs;
- deterministic validations;
- evidence-based acceptance criteria.

---

# 13. Example: AI-native requirements development

## 13.1 Human setup

A PM/BA defines:

- business problem;
- source regulation / policy;
- affected process;
- FenX context;
- source systems;
- constraints;
- what good looks like;
- what must not be changed;
- known edge cases.

## 13.2 AI execution

AI then performs much of:

- source comparison;
- current-state analysis;
- requirement decomposition;
- dependency mapping;
- user-story generation;
- acceptance criteria;
- test-case generation;
- API/data contract proposals;
- diagram generation;
- conflicting requirement detection;
- implementation notes;
- traceability mapping.

## 13.3 Human validation

The domain expert validates:

- business intent;
- legal / policy meaning;
- applicability;
- exceptions;
- duplicated logic;
- architecture;
- operational ownership;
- testability.

The developer validates:

- technical correctness;
- security;
- performance;
- maintainability;
- deployment consequences.

## 13.4 Promotion into knowledge

Validated outputs should be promoted into canonical objects, rather than left only in transient chat or Jira prose.

This creates a compounding knowledge loop.

---

# 14. CLM agent harness

## 14.1 Why the harness is a product

Do not build only "a Kaicy prompt" or "a BO agent prompt".

Build a reusable CLM harness that provides:

```text
Identity
Permissions
Request / event routing
Context assembly
Regulatory retrieval
Data-product retrieval
Knowledge-product retrieval
Skills
Tools
Workflow / orchestration
Policy gates
Human approval gates
Structured output validation
Evaluation
Trace / evidence logging
Monitoring
Fallback / kill switch
```

## 14.2 Separation of concerns

- **Knowledge** tells the agent what is true / approved.
- **Skills** describe reusable behaviour.
- **Tools** provide executable capability.
- **Harness** determines how those capabilities are selected, constrained and observed.
- **Runtime** is the environment where the harness executes.

A Markdown file in SharePoint is knowledge unless the runtime explicitly supports executing it as a skill.

## 14.3 Runtime choice

Use the lightest viable lane that satisfies the requirement.

### M365 / Copilot

Best for:

- personal productivity;
- internal drafting;
- already-permissioned collaboration knowledge.

### Copilot Studio / Power Platform

Best for:

- shared business assistants;
- bounded workflows;
- governed connectors;
- team-level automation where platform controls are sufficient.

### GCP / Vertex AI

Best for:

- source-first regulated applications;
- C4 / sensitive data where approved;
- custom orchestration;
- custom retrieval/evaluation;
- deeper FenX / data integration;
- stronger engineered observability and runtime control.

The architecture should be **runtime-portable at the intelligence layer**. Do not lock domain knowledge into one runtime.

---

# 15. SharePoint / CLM AI Hub role

## 15.1 Target role

SharePoint and the CLM AI Hub should become the **human-facing control and discovery surface** for the operating model.

It should help humans understand:

- what knowledge exists;
- what is approved;
- who owns it;
- what agents/services exist;
- what data/knowledge products they consume;
- what evaluation exists;
- what the current lifecycle state is;
- what is changing.

## 15.2 What SharePoint should not become

Do not make SharePoint the primary runtime for:

- real-time customer state;
- transactional KYC state;
- event orchestration;
- high-volume graph traversal;
- production agent execution state;
- complex tool orchestration.

## 15.3 Hub design principle

The current CLM AI Knowledge Hub is rich but contains strategy, governance, architecture, platform guidance, portfolio, data strategy and classifier logic in one large HTML artefact.

Long-term target:

> **The Hub should render governed objects rather than be the place where truth is manually embedded.**

The same principle already exists in the AMLR governing specification.

---

# 16. FenX role

FenX should remain the authoritative operational KYC platform for relevant KYC workflow, assessment and structured case state.

The intelligence architecture should **reference and consume FenX state**, not duplicate it into a competing system of record.

Useful FenX integration patterns include:

- query/read APIs;
- command/write APIs;
- event notifications;
- data sync;
- external adapters;
- event ingress.

FenX go-live is therefore not merely an application milestone. It is a **data and event unlock** for future CLM intelligence.

---

# 17. KAICY role

KAICY is strategically important, but it should not become the organising principle for all CLM AI.

KAICY should increasingly consume shared CLM capabilities such as:

- KYC knowledge products;
- KYC data products;
- evidence models;
- FenX interfaces;
- reusable evaluation suites;
- common guardrails;
- reusable skills.

The stronger framing is:

> **KAICY is one major consumer of the CLM intelligence platform, not the platform itself.**

This reduces monolith risk and increases reuse across other CLM products and workflows.

---

# 18. SEB AI strategy alignment

The SEB AI sub-strategy supports several core principles in this model.

## 18.1 Shared foundations + decentralised ownership

The strategy calls for scalable, secure, compliant and reusable foundations while preserving decentralised delivery and local ownership.

CLM translation:

- central/enterprise capabilities provide approved platforms, model access, security and common governance;
- CLM owns domain outcomes, context, knowledge, allowed behaviour and value;
- technical lifecycle ownership remains explicit.

## 18.2 Knowledge as strategic infrastructure

The strategy states that competitive differentiation increasingly comes from context, domain knowledge and trusted execution, and that structured, governed, machine-readable knowledge should become a core AI capability.

CLM translation:

- KYC Instructions, SOPs, regulatory interpretations and process logic should be treated as **knowledge products**;
- requirements should be structured for AI consumption;
- source authority and versioning are architectural concerns.

## 18.3 Data products as foundational capability

The strategy explicitly calls out data products as a foundational Horizon 1 capability.

CLM translation:

- FenX/data work is part of the AI strategy even when no AI model is involved;
- data ownership, lineage and interfaces are AI-enabling investments.

## 18.4 AI in software development

The strategy says AI should be used across design, coding, testing, review and architecture, while humans retain decision authority.

CLM translation:

- AI value measurement must include **development throughput and quality**, not only operational KYC automation.

## 18.5 Use AI from inception

The strategy recommends AI consultation from early process/application/business-model design.

CLM translation:

- every significant initiative should ask at inception:
  - what can AI help analyse/design/build/test?
  - what machine-readable knowledge should this initiative leave behind?
  - what reusable capability can it contribute?

## 18.6 No standalone AI backlog

The strategy states AI should be integrated into normal product/modernisation portfolio governance.

CLM translation:

- maintain an AI capability map for discovery;
- do not create a parallel product backlog whose only logic is "AI";
- use AI where it improves the business solution.

---

# 19. Horizon model for CLM

SEB uses an 80/15/5 focus across Refactor / Rearchitect / Reinvent.

## 19.1 80% — Refactor

Focus on improving current workflows and establishing foundations.

CLM examples:

- improve requirements with AI;
- automate test generation;
- document intelligence;
- KAICY extraction/adoption;
- policy Q&A;
- KPI/reporting automation;
- data products;
- knowledge products;
- FenX integration;
- evaluation harness;
- observability;
- lineage.

## 19.2 15% — Rearchitect

Redesign selected journeys around reusable intelligence.

CLM examples:

- Regulatory Engine;
- CLM Context Graph;
- Operating Plane;
- event-driven trigger flows;
- AI-assisted case preparation embedded in FenX journeys;
- continuous control monitoring.

## 19.3 5% — Reinvent

Controlled experiments with more autonomous execution.

Examples:

- bounded multi-step KYC agents;
- low-risk autonomous remediation;
- continuous KYC monitoring;
- agent-to-agent orchestration.

The purpose of the 80/15/5 split is to prevent autonomy discussions from consuming more attention than the foundational work that makes autonomy safe.

---

# 20. Ownership model

## 20.1 Avoid the simplistic "builder owns everything" model

Small teams and high agency are valuable, but production accountability should be explicit across different dimensions.

## 20.2 Recommended accountability split

| Domain | Primary accountability |
|---|---|
| Regulatory Engine | Compliance / KYC policy owners + relevant legal/regulatory owners |
| Knowledge products | Knowledge owner / business domain owner |
| Data products | Data owner / domain owner |
| CLM Context Graph semantics | CLM product + data/architecture owners |
| Requirements | CLM Product / BA with validation by relevant domain owner |
| Operating Plane | Process/control owners + CLM Product |
| Agent/service purpose | Business/Product Owner |
| Runtime / deployment | Technical Service / IT Delivery Owner |
| Model/harness/platform | Technology / D&A as applicable |
| Evaluation | Product + Risk/Compliance + Technical Owner |
| Incident / rollback | Named technical/operational owner |

## 20.3 Ownership principle

> **Technology owns how the AI system operates. Business/control functions own the outcome, the context, and what the AI is allowed to know and do.**

This is consistent with the SEB AI sub-strategy.

---

# 21. Change governance by object, not by monolith

A scalable operating model should ask **what changed**, not automatically re-review the whole product.

Examples:

```text
Knowledge wording change
→ knowledge validation

Regulatory interpretation change
→ downstream revalidation

Data schema change
→ data-contract + consumer regression

Tool permission change
→ security/control reassessment

Model change
→ eval regression

Prompt/skill change
→ behavioural regression tests

New customer-impacting action
→ risk-tier reassessment

FenX capability change
→ requirement/control/test traceability check
```

This enables faster governance without lowering the control standard.

---

# 22. Evaluation and observability as first-class assets

## 22.1 Evaluation is part of the product

Do not evaluate only the prompt or Markdown. Evaluate the **actual configured service in its target runtime**.

Test dimensions should include:

- routing;
- source grounding;
- conflicting sources;
- permissions;
- tool/action execution;
- customer/regulatory boundary handling;
- prompt injection;
- structured-output validity;
- runtime limitations;
- failure and recovery;
- latency/retry behaviour;
- regression after changes.

## 22.2 Evaluation data becomes reusable institutional knowledge

Every human correction is potentially useful as:

- an eval case;
- an edge case;
- a false-positive example;
- a false-negative example;
- a knowledge gap;
- a data-quality signal.

Do **not** automatically promote corrections into policy or regulatory truth.

## 22.3 Distinguish four states

```text
Observed fact
AI inference
Human-validated conclusion
Approved institutional knowledge
```

Only the final state should be reused as authoritative knowledge where authority is required.

---

# 23. Compounding loops

## 23.1 Intelligence compounding loop

```text
Better source data / knowledge
        ↓
Better requirements and mappings
        ↓
Better implementation
        ↓
Better tests / evidence
        ↓
Better agent context
        ↓
Better outcomes
        ↓
Validated corrections / observations
        ↓
Better shared knowledge and evals
```

## 23.2 Development compounding loop

```text
Human defines good
      ↓
AI drafts / builds / tests
      ↓
Human verifies
      ↓
Accepted artefacts become machine-readable knowledge
      ↓
Future AI receives better context
      ↓
Less setup cost next time
```

This is how AI-enabled development can become a strategic asset rather than a temporary productivity boost.

---

# 24. AI development cost and value narrative

## 24.1 Management question

A growing AI cost base in CLM development will create a valid challenge:

> **What value does this cost create?**

The weak answer is:

> "Developers are more productive."

The stronger answer is:

> **AI changes the unit economics of the full CLM development flow — requirements, analysis, design, coding, testing, documentation, review and regulatory change — while also creating reusable machine-readable knowledge.**

## 24.2 Measure value across five dimensions

### Throughput

- cycle time per work item;
- implementation lead time;
- requirements completed;
- tests generated/executed;
- delivery volume.

### Quality

- escaped defects;
- rework;
- requirement completeness;
- test coverage;
- clarification loops;
- documentation completeness.

### Capacity release

- human hours avoided on repetitive drafting/coding/testing;
- time shifted toward architecture, domain judgement and verification;
- backlog capacity created.

Use the term **capacity release**, not headcount savings unless headcount actually changes.

### Speed to value

- earlier regulatory remediation;
- faster FenX changes;
- shorter time from idea to production;
- faster response to policy/regulatory change.

### Option value

- internal solutions become economical where external purchase/consultant work was previously the only viable option;
- prototyping and testing become cheaper;
- small teams can own broader product scope.

## 24.3 Suggested CLM development AI scorecard

| Metric | Purpose |
|---|---|
| AI tooling/model cost per month | Direct cost |
| Active AI-enabled developers / analysts | Adoption denominator |
| Cycle time per work item | Delivery productivity |
| PR / implementation lead time | Engineering throughput |
| Human hours per requirement/test pack | Non-code productivity |
| Rework / escaped defects | Quality counterbalance |
| AI-generated work accepted without material rewrite | Output usefulness |
| Cost per accepted production outcome | Unit economics |
| External/consultant work avoided | Build-vs-buy value |
| Human override / correction rate | Quality / trust signal |

## 24.4 Value equation

```text
Net AI value
=
Delivery capacity released
+ Avoided external spend
+ Value of earlier delivery
+ Avoided rework / defects
+ Control / quality improvement
− AI tooling and operating costs
```

Not every term will be perfectly monetisable. Directional evidence is still better than usage statistics alone.

## 24.5 Recommended management wording

> AI-kostnaden bör inte primärt ses som ytterligare en utvecklarlicens, utan som kostnaden för att öka kapaciteten i hela utvecklingsflödet. AI används inte bara för kodgenerering utan för kravarbete, analys, arkitektur, test, dokumentation och kvalitetssäkring. Värdet behöver därför mätas i kortare ledtid, högre throughput, minskat manuellt arbete och rework samt i vilken utsträckning vi kan lösa mer internt. Samtidigt ska vi inte anta att investeringen är lönsam bara för att användningen är hög; kostnaden behöver följas mot konkreta leveransutfall och en tydlig baseline.

---

# 25. Portfolio model: capabilities before agents

## 25.1 Primary portfolio question

For every AI initiative ask:

> **What reusable capability does this leave behind?**

Examples:

A transcript-to-KYC use case should leave behind:

- KYC field schema;
- extraction capability;
- evidence/provenance model;
- FenX integration;
- evaluation dataset;
- human-verification pattern;
- knowledge mappings.

A regulatory-change use case should leave behind:

- obligation model;
- source versioning;
- dependency graph;
- change impact logic;
- evaluation cases.

## 25.2 Capability portfolio examples

- document intelligence;
- source-grounded regulatory retrieval;
- KYC data extraction;
- entity/relationship reasoning;
- evidence handling;
- policy navigation;
- requirement generation;
- FenX read/write integration;
- evaluation harness;
- structured output validation;
- case preparation;
- reporting and management synthesis.

Agents are consumers/compositions of these capabilities.

---

# 26. Minimum viable vertical slice

The best way to prove the model is not to build all layers horizontally.

Use one bounded vertical slice, preferably **beneficial ownership / related parties** because relevant AMLR, FenX and gap-analysis work already exists.

Build one complete chain:

```text
Legal source
  ↓
Atomic obligation
  ↓
Applicability
  ↓
SEB interpretation
  ↓
Policy / SOP
  ↓
Business requirement
  ↓
System requirement
  ↓
Control
  ↓
Required data product
  ↓
FenX capability
  ↓
Evidence
  ↓
Test
  ↓
Gap
  ↓
Remediation / owner
  ↓
AI-supported analysis or preparation
```

Expose the same chain through:

- AMLR Hub — regulatory exploration;
- CLM AI Hub / SharePoint — human governance/discovery;
- GCP API / graph — machine consumption;
- KAICY / future agents — execution;
- evaluation harness — verification.

If this vertical works, scale the pattern to PEP, SoW/SoF, review triggers and other KYC domains.

---

# 27. Canonical object model v0.1

A future CLM Intelligence Model should consider at least these object types.

## 27.1 Regulatory / knowledge objects

- `LegalSource`
- `LegalProvision`
- `Obligation`
- `ApplicabilityRule`
- `Interpretation`
- `PolicyRequirement`
- `SOPInstruction`
- `KnowledgeProduct`

## 27.2 Development / specification objects

- `BusinessRequirement`
- `SystemRequirement`
- `AcceptanceCriterion`
- `DataContract`
- `ArchitectureDecision`

## 27.3 Operational objects

- `Control`
- `Process`
- `FenXCapability`
- `EvidenceRequirement`
- `EvidenceInstance`
- `TestCase`
- `TestResult`
- `Gap`
- `Remediation`
- `Owner`

## 27.4 Data/context objects

- `Customer`
- `Party`
- `BeneficialOwner`
- `Product`
- `Jurisdiction`
- `KYCProfile`
- `KYCAssessment`
- `RiskProfile`
- `ScreeningResult`
- `DataProduct`
- `SourceSystem`

## 27.5 AI/runtime objects

- `AIService`
- `Agent`
- `Skill`
- `Tool`
- `EvalSuite`
- `Deployment`
- `Runtime`
- `PermissionPolicy`

## 27.6 Core relationship types

Prefer typed relationships such as:

- `DERIVED_FROM`
- `APPLIES_WHEN`
- `INTERPRETED_BY`
- `IMPLEMENTS`
- `REQUIRES`
- `CONSUMES`
- `PRODUCES`
- `SUPPORTED_BY`
- `EVIDENCED_BY`
- `TESTED_BY`
- `HAS_GAP`
- `REMEDIATED_BY`
- `OWNED_BY`
- `SUPERSEDES`
- `TRIGGERS_REVALIDATION_OF`
- `DEPENDS_ON`
- `READS_FROM`
- `WRITES_TO`

Avoid a generic `RELATED_TO` relationship unless there is no better semantic type.

---

# 28. Operating lifecycle

## 28.1 Knowledge lifecycle

```text
Source
→ Extracted candidate
→ Reviewed interpretation
→ Approved knowledge
→ Consumed by AI / process
→ Observed outcome
→ Candidate update
→ Revalidation
```

## 28.2 Requirement lifecycle

```text
Candidate
→ Refined
→ Validated
→ Approved
→ Implemented
→ Tested
→ Operating evidence
→ Changed / superseded
→ Revalidation required
```

## 28.3 AI service lifecycle

```text
Idea
→ Value / risk triage
→ Prototype
→ Evaluate
→ Governance / approval
→ Deploy
→ Observe
→ Reassess
→ Improve / retire
```

The lifecycles should link. A regulatory source change may automatically place downstream requirements, controls, tests and AI services into `REVALIDATION_REQUIRED`.

---

# 29. Key anti-patterns

## 29.1 Agent-first portfolio

**Symptom:** agent count rises while shared knowledge/data/eval maturity does not.

**Consequence:** duplicated prompts, integrations, controls and inconsistent answers.

## 29.2 SharePoint as runtime architecture

**Symptom:** knowledge files are assumed to behave like executable skills.

**Consequence:** false expectations about orchestration and tool behaviour.

## 29.3 FenX duplication

**Symptom:** AI platform creates a second KYC state store.

**Consequence:** competing truths and increased audit complexity.

## 29.4 Graph theatre

**Symptom:** build Neo4j / graph visualisation before stable IDs, source authority or semantic relationships exist.

**Consequence:** beautiful graph of unreliable assumptions.

## 29.5 Regulatory RAG as Regulatory Engine

**Symptom:** search over PDFs is described as computable compliance.

**Consequence:** repeated runtime interpretation and poor traceability.

## 29.6 Requirement prose trap

**Symptom:** critical semantics live only in Jira narrative.

**Consequence:** AI cannot reliably reuse intent, source lineage or acceptance logic.

## 29.7 AI inference becomes truth

**Symptom:** a plausible AI mapping is reused without validation.

**Consequence:** errors compound across downstream agents and requirements.

## 29.8 Usage as value

**Symptom:** token consumption, active users or generated code are presented as ROI.

**Consequence:** high activity may hide rework and review cost.

## 29.9 Verification starvation

**Symptom:** AI increases generation volume but review capacity remains fixed.

**Consequence:** bottleneck shifts to expert validation and defect triage.

---

# 30. Decision rules for future AI assistants

When advising on a CLM AI initiative, ask in this order:

1. **What business problem or regulatory outcome are we solving?**
2. **Which layer does the problem primarily belong to: Regulatory Engine, CLM Context Graph, Operating Plane, or Agentic Execution?**
3. **Which enablers are required?**
4. **Do required data products exist and have owners?**
5. **Do required knowledge products exist and have authority metadata?**
6. **Can the work be solved deterministically more safely/cheaply?**
7. **What reusable capability will this initiative leave behind?**
8. **What is the human definition of good?**
9. **What can AI execute and what must a human verify?**
10. **What evidence proves success?**
11. **Who owns this when it fails on Monday morning?**
12. **What is the customer/regulatory impact if it is wrong?**
13. **Can we observe the AI before granting write authority?**
14. **What changes would trigger revalidation?**
15. **How does this integrate into normal CLM portfolio governance rather than becoming an isolated AI backlog?**

---

# 31. Suggested CLM AI operating model summary

## 31.1 What we build

```text
Regulatory Engine
      ↕
CLM Context Graph
      ↓
Operating Plane
      ↓
Agentic Execution
```

## 31.2 What enables it

```text
Data products
Knowledge products
Semantic model
APIs / events / MCP
IAM
Platforms
Agent harness
Evaluation / observability
Governance / ownership
Synthetic / anonymised development data
```

## 31.3 Where value appears

```text
RUN CLM
DEVELOP CLM
GOVERN / CHANGE CLM
MANAGE CLM
```

## 31.4 How humans and AI work

```text
Human defines what good looks like
        ↓
AI performs bounded execution
        ↓
Human verifies and accepts/rejects
        ↓
Validated output becomes reusable knowledge/evidence where appropriate
```

## 31.5 How the portfolio compounds

```text
Every initiative should produce:
Business value
+
Reusable data/knowledge/capability
+
Evaluation evidence
+
Better machine-readable CLM context
```

---

# 32. Recommended near-term actions

## P0 — align the explanation model

1. Add the four-layer + enabler model to the CLM AI Knowledge Hub.
2. Use it as the red thread across data, architecture, governance and portfolio sections.
3. Clearly state that it is a **CLM interpretation inspired by Freda**, not an SEB-mandated architecture.

## P1 — formalise data and knowledge products

1. Identify 5–8 critical CLM data products.
2. Identify priority CLM knowledge products.
3. Name owners and interfaces.
4. Document freshness, authority and quality expectations.

## P1 — requirements as knowledge

1. Define a machine-readable requirement schema.
2. Add stable IDs.
3. Require source lineage for regulated requirements.
4. Link acceptance tests and FenX capabilities.
5. Pilot on one beneficial-ownership requirement set.

## P1 — measure AI-enabled development

1. Establish baseline cycle-time / rework measures.
2. Track AI cost separately from value metrics.
3. Pilot the 20/60/20 workflow on requirements, testing and regulatory analysis.
4. Compare accepted outcome quality and time, not generation volume.

## P2 — first Operating Plane vertical

Build BO/related-party chain from AMLR to FenX/test/evidence/gap/owner.

## P2 — shared harness

Standardise reusable:

- identity;
- permission patterns;
- source retrieval;
- tool contracts;
- evaluation;
- logging;
- human approval;
- kill switch.

## P3 — bounded agentic execution

Expand autonomy only after:

- data quality is measurable;
- source authority is governed;
- requirements are traceable;
- evaluation suites are stable;
- write actions are controlled and reversible.

---

# 33. What would make this strategy fail? — inversion check

The strategy is failing if:

- CLM has many agents but no common semantic model.
- each AI project builds its own pipeline to FenX/MDM.
- requirements remain prose and cannot be traced to source or tests.
- AI-generated regulatory interpretations become de facto policy.
- the graph becomes a second source of customer truth.
- SharePoint stores stale copies of operational state.
- GCP/Copilot platform choice becomes ideological instead of requirement-driven.
- 20/60/20 is used to justify reducing human review rather than improving it.
- AI cost rises but cycle time, quality and delivered outcomes do not improve.
- human verification becomes the bottleneck but is not measured.
- nobody owns knowledge freshness or agent failure.
- governance review remains monolithic instead of risk/change specific.
- the organisation celebrates prototypes rather than production value and reusable capability.

---

# 34. Confidence and unresolved questions

## High-confidence conclusions

- SEB's AI strategy clearly supports reusable foundations, data products, machine-readable knowledge, AI in software development, human oversight, and integration of AI into normal portfolio governance.
- CLM's current Hub already contains many relevant components but not yet one unified semantic operating model.
- AMLR_HUB_GOVERNING_SPEC already points toward canonical regulatory objects, explicit FenX capabilities, evidence/test objects and downstream revalidation.
- Requirements can be designed as machine-readable institutional artefacts and should be treated as a key bridge between regulation and implementation.
- AI value in CLM should include development, regulatory work and management/reporting, not only operational KYC agents.

## Medium-confidence proposals

- The Freda-derived four-layer model is a strong CLM explanation model.
- GCP is the likely machine-intelligence plane for higher-control CLM workloads, but platform choice remains requirement- and approval-dependent.
- A federated logical CLM graph is preferable to trying to create a new master customer database.
- The Operating Plane is likely the highest-leverage missing architectural concept.

## Open questions requiring validation

- Which data products will be formally owned and exposed first?
- What is the target enterprise graph / metadata technology, if any?
- What exact FenX APIs/events will be available in production and under which permissions?
- Which requirement repository can support stable IDs and machine-readable metadata without creating duplicate process overhead?
- What live SharePoint architecture will become canonical versus illustrative?
- Which runtime controls are approved for C3/C4 workloads at the time of implementation?
- Which metrics can be baselined now to measure development AI ROI credibly?

---

# 35. Source notes

## Internal source set

### AI sub-strategy v1.0 — SEB Group Technology, Strategy & Change, 2026-05-08

Key ideas used in this synthesis:

- developed AI operating model;
- reusable secure foundations + decentralised delivery;
- Technology owns how AI operates; business/control functions own outcomes, context and allowed behaviour;
- machine-readable institutional knowledge as strategic AI infrastructure;
- structured data via data products and analogous responsibility for unstructured knowledge;
- distinction between personal productivity and process-integrated AI;
- AI across software design, coding, testing, review and architecture;
- AI-driven co-creation and auditing across development;
- use AI from inception;
- Refactor → Rearchitect → Reinvent with 80/15/5 focus;
- integrate AI into normal portfolio governance rather than a standalone AI backlog;
- agent guardrails, least privilege, HITL, auditability, monitoring and knowledge-bounded execution.

### CLM AI Knowledge Hub.html — uploaded snapshot

Key ideas used:

- AI patterns across CLM;
- agent architecture and MCP;
- FenX integration patterns;
- runtime/platform lanes;
- KAICY context;
- AI Service Control Register;
- AI use-case portfolio;
- PWM&FO Data Layer and data-product definitions;
- AI use-case classifier / model-card concept;
- infrastructure-before-agents principle.

### AMLR_HUB_GOVERNING_SPEC.md

Key ideas used:

- canonical source / obligation / interpretation / gap objects;
- explicit authority states;
- AI inference cannot become approved interpretation automatically;
- FenX represented as stable capabilities rather than prose;
- evidence/test objects;
- bidirectional AMLR ↔ FenX lineage;
- change propagation and `REVALIDATION_REQUIRED`;
- do not prioritise autonomous multi-agent workflows before the knowledge graph is trustworthy.

### Runtime, governance and evaluation modules

Key ideas used:

- distinguish knowledge from executable skills;
- choose actual runtime explicitly;
- separate tools from skills;
- explicit production ownership;
- record runtime/model/tools/knowledge/version;
- evaluate configured agent, not documentation only;
- regression on source/tool/model/runtime changes;
- preserve source authority and surface conflicts.

## Public Freda source set

Public pages consulted:

- https://freda.com/platform
- https://freda.com/discover
- https://freda.com/orchestrate
- https://freda.com/agents
- https://freda.com/deploy
- https://freda.com/careers/legal-engineer

Use Freda primarily as a **logical architecture inspiration**. Public marketing describes product intent and capabilities; it is not proof of implementation details at SEB scale.

## Public 20/60/20 source set

- ACCA / Accounting and Business: "Firms keep AI on tight leash" (2026), describing interviews with senior people across 11 professional-services firms where many used a 20-60-20 human/AI/human pattern.
- Robert Menetray: "I Found Out AI Steals 60% of My Work" (2026), describing a 20% human planning / 60% AI execution / 20% final review development workflow and explicitly calling the percentages rough/contextual.

The 20/60/20 model must therefore be described as an **emerging practical heuristic**, not an official SEB standard or universal AI law.

---

# 36. Compact AI instruction block

When using this knowledge to advise CLM:

1. Start from the business/regulatory problem, not the model or agent.
2. Determine which intelligence layer is missing.
3. Check enabler readiness before recommending agentic execution.
4. Prefer reusable data/knowledge/capability investments over isolated pilots.
5. Treat requirements as reusable machine-readable knowledge where possible.
6. Use AI throughout CLM development, governance and management, not only KYC operations.
7. Apply human-direction → AI-execution → human-verification; adapt the ratio to risk and verifiability.
8. Preserve source authority and uncertainty.
9. Do not let AI inference become institutional truth without validation.
10. Integrate AI work into normal CLM product/portfolio governance.
11. Measure value using accepted outcomes, cycle time, quality, rework, capacity release and avoided spend — not usage alone.
12. If agent count grows faster than data products, knowledge products, tests and controls, flag the strategy as non-compounding.
13. If a proposed graph duplicates FenX or other authoritative systems, redesign it as a reference/context layer.
14. If SharePoint is being used as runtime state or orchestration infrastructure, challenge the design.
15. If a use case cannot explain what reusable capability it leaves behind, challenge its portfolio priority.

---

# End state

The intended CLM end state is not "many AI agents".

It is a CLM organisation where:

- regulatory knowledge is computable and traceable;
- customer/process context is reusable and current;
- implementation/control state is observable;
- development artefacts become reusable institutional knowledge;
- data and knowledge products are owned;
- AI services share harnesses, tools and evaluations;
- humans concentrate on context, judgement and verification;
- AI performs a growing share of bounded execution;
- every new delivery improves the foundations for the next one.

That is how AI can compound inside CLM rather than fragment it.
