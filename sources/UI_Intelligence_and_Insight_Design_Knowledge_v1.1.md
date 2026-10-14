---
title: "UI Intelligence & Insight Design for Frontier-Model Development — v1.1"
subtitle: "A durable design doctrine plus a dated frontier-model capability snapshot for GitHub Copilot, Claude, ChatGPT, HTML artifacts, dashboards, analytical interfaces, and visual QA"
id: "ui-intelligence-insight-design-2026-10-09"
type: "knowledge-synthesis"
status: "candidate"
authority: "derived"
scope: "personal"
classification: "personal_private"
created: "2026-10-09"
updated: "2026-10-09"
version: "1.1"
capability_snapshot_date: "2026-10-09"
review_state: "candidate-derived; not canonical until human review"
topics:
  - frontend design
  - dashboard design
  - information design
  - data visualization
  - GitHub Copilot
  - Claude
  - ChatGPT
  - coding agents
  - agentic workflows
  - HTML
  - analytical interfaces
  - visual QA
  - OKRs
  - measurement systems
  - context engineering
  - second brain
knowledge_kind: "synthesis"
---

# UI Intelligence & Insight Design for Frontier-Model Development

## Executive thesis

Frontier coding models have crossed an important threshold. They are no longer best understood as tools that convert requirements into code. The newest Claude and OpenAI models can increasingly perform the full loop:

**intent → research → information architecture → visual concept → implementation → render → inspect → critique → revise**

This changes how high-quality web pages, analytical HTML artifacts, dashboards, and interactive explainers should be built.

The primary bottleneck is no longer writing CSS or producing React components. Code generation is becoming abundant. The scarce resources are now:

1. **judgment about what matters;**
2. **correct metric semantics and causal structure;**
3. **information architecture;**
4. **visual taste;**
5. **evidence and provenance;**
6. **quality evaluation;**
7. **preserving the strengths of existing work while improving weaknesses.**

The correct response is **not** to compensate by creating a giant prompt that tells a frontier model exactly how to design every screen. Stronger models need less procedural hand-holding. The more capable the model becomes, the more important it is to define **what a good outcome means** while leaving room for the model to choose the composition, representation, interaction pattern, and implementation.

The recommended approach is therefore a thin **UI Intelligence Layer** on top of the existing GitHub Copilot and Second Brain setup:

> **Truth and context → intent and guardrails → frontier-model judgment → rendered inspection → adversarial review → verified result**

The design target is **analytical elegance**:

> **high information value + strong hierarchy + restraint + precision + excellent craft**

The interface should feel intelligent because the information has been intelligently organized—not because it contains more cards, gradients, icons, charts, or animation.

---


# v1.1 — Knowledge architecture

This revision separates three classes of knowledge so that durable principles do not decay when model products change.

## A. Durable design principles

These should survive model generations:

- a dashboard is a decision surface, not a collection of charts;
- start from the objective, causal structure, and user decision;
- the insight should normally be more prominent than the raw KPI;
- numbers need context such as target, baseline, trend, benchmark, rank, denominator, or distribution;
- dense can be elegant when hierarchy and alignment are strong;
- tables are first-class analytical components;
- evidence and provenance should sit close to material claims;
- hierarchy should be created primarily through meaning, position, typography, and contrast;
- interaction should improve reasoning rather than merely make the page feel modern;
- existing strengths should be identified and protected before redesign;
- generation is not the end state: the rendered artifact must be inspected and verified.

## B. Capability snapshot

Statements about Claude Design, Dashboards, Motion, OpenAI frontend behavior, GitHub Copilot, VS Code browser tools, or named models are **time-sensitive capability claims**. Unless otherwise stated, the capability snapshot in this document was verified on **2026-10-09**.

Before implementation depends on a specific feature, re-check current official documentation.

## C. Operating hypotheses

The following kinds of recommendations are hypotheses until benchmarked on Ludwig's actual work:

- which model produces the strongest first-pass visual architecture;
- whether a different model should critique the builder;
- whether multiple design concepts outperform immediate implementation for a given task;
- which visual-reference structure produces the best results;
- which model should be routed to architecture, implementation, or critique.

Do not convert these into permanent rules without evidence.

---

# Ludwig analytical design doctrine

This is the high-compression retrieval layer.

1. **Start with the insight.** Do not design until the most valuable conclusion can be stated clearly.
2. **Design for a decision.** Every major element should support an objective, understanding, diagnosis, trade-off, or action.
3. **Create hierarchy, not decoration.** Prefer meaning → position → size → typography → contrast → color → effects.
4. **Provide context.** A number without target, baseline, trend, benchmark, denominator, distribution, or other comparison is usually incomplete.
5. **Prefer evidence over ornament.** Important claims should be interrogable through data, assumptions, calculations, freshness, and sources.
6. **Preserve useful density.** Do not confuse minimalism with clarity.
7. **Choose the artifact, not the convention.** Use a dashboard, explainer, simulator, workbench, table, diagram, or narrative page according to the cognitive job.
8. **Let capable models design.** Specify objectives, constraints, evidence, references, and quality; do not micromanage every layout decision.
9. **Look at the result.** Build → render → interact → critique → improve → verify.
10. **Preserve strengths.** Existing good design is a constraint, not collateral damage.

A concise aesthetic statement:

> **Aim for calm, precise, editorial analytical design. Make important information feel obvious.**

---

# Epistemic status of the measurement framework

The measurement sections combine retrieved performance-management material, general OKR concepts, and synthesis from this conversation.

The discussion of objectives, key results, outcomes, drivers, diagnostics, and guardrails is directionally aligned with OKR thinking associated with _Measure What Matters_. However, Ludwig's actual copy of the book was **not retrievable from the accessible Library or Second Brain during this conversation**.

Therefore:

- do not describe this document as a direct extraction from Ludwig's copy of _Measure What Matters_;
- treat the current OKR section as synthesis rather than source-grounded extraction;
- when Ludwig's source copy becomes available, extract the relevant claims directly and reconcile them with this framework.

Provenance is part of analytical design quality.

---

# The Insight Component — a better primitive than the KPI card

For important analytical findings, use this conceptual grammar:

```text
INSIGHT
What did we learn?

MAGNITUDE
How large is it?

CONTEXT
Compared with what?

EVIDENCE
What supports it?

CONFIDENCE
How certain are we?

IMPLICATION
Why does it matter?

ACTION
What should happen?
```

Not every layer needs to be visible at once. Progressive disclosure is often better.

The important conceptual change is:

> Build **Insight Components**, not generic KPI cards.

---

# Representation challenge

Before adding a visualization, ask:

> **Why is this representation superior to a short sentence or a table?**

Visualization has cognitive and spatial cost. It must earn its place.

Examples:

- “73% of incremental revenue came from 46 households” may be clearer than a donut chart;
- a sorted table can outperform multiple bar charts when exact comparison matters;
- a one-line variance bar can outperform a large gauge;
- a causal diagram can outperform prose when relationships, not magnitudes, are the problem.

Do not visualize merely because a chart is possible.

---

# HTML artifact classes

Generated HTML should be treated differently depending on lifetime and consequence.

## Class 1 — Disposable analytical artifact

Typical lifetime: minutes to hours.

Use for one-off analysis, custom explainers, temporary scenario models, meeting preparation, and visualized reasoning.

Engineering expectations:

- self-contained where practical;
- real data and clear provenance;
- high visual quality;
- no unnecessary architecture;
- minimal dependencies unless they materially improve the artifact.

A few hundred lines of HTML/JS can be the correct solution.

## Class 2 — Reusable analytical tool

Typical lifetime: days to months.

Use for recurring exploration, lightweight portfolio or decision tools, internal analytical utilities, and repeated scenario testing.

Engineering expectations:

- explicit data model;
- reusable components where useful;
- sensible state management;
- stable inputs and outputs;
- tests for critical logic;
- responsive design;
- maintainable structure.

## Class 3 — Durable product

Typical lifetime: months to years.

Use for core product surfaces, authenticated systems, business-critical workflows, customer or regulated use, and multi-user applications.

Engineering expectations:

- full product architecture;
- accessibility;
- security;
- observability;
- CI and regression;
- data contracts;
- ownership;
- support model;
- explicit deployment and rollback.

Do not build Class 3 infrastructure around a Class 1 problem.

Do not ship Class 1 engineering discipline for a Class 3 product.

---

# Preservation and regression protocol

When improving an existing interface, explicitly identify:

```text
PRESERVE
What currently works and should remain?

PROBLEM
What specifically prevents the interface from working better?

CHANGE
What will be modified?

REGRESSION RISK
What existing strength could be weakened?

OBSERVATION
What rendered evidence will show that the new version is better?
```

The model should not redesign an established surface simply because generating a new composition is easier than making a selective improvement.

---

# Visual taste library

Visual references should become a retrievable corpus rather than a folder of attractive screenshots.

For each reference, record:

```text
REFERENCE
What is this?

USE
Which qualities are worth borrowing?

DO NOT COPY
Which qualities are irrelevant, brand-specific, weak, or misleading?

APPLIES TO
Which artifact classes or analytical problems is it useful for?
```

Useful categories include:

- dense analytical table;
- executive decision surface;
- operational monitoring page;
- scenario simulator;
- narrative data explainer;
- diagnostic workbench;
- evidence/provenance panel;
- mobile analytical interface;
- empty/error/loading states.

This is effectively **RAG for taste**.

The goal is not stylistic cloning. It is to give multimodal models examples from which they can infer density, hierarchy, typography, spacing, comparison patterns, and interaction quality.

---

# Capability snapshot — verified 2026-10-09

This section is explicitly time-sensitive.

## Anthropic

### Claude Dashboards and Claude Motion

Anthropic's official product announcements list **Claude Dashboards and Claude Motion as beta releases on 2026-10-08**. The same announcement says Docs, Slides, and Design are out of beta and available across Claude plans.

Design implication:

- live dashboards are becoming a first-class AI artifact;
- animation is becoming a generated explanatory medium;
- models can move beyond static prose toward explorable analytical artifacts.

Source:
https://claude.com/resources/product-announcements

### Claude Design

Current official Claude Design documentation says Claude can import design systems from GitHub repositories, design files, raw uploads, and local codebases. It can use real design-system components, check output against the system, and make corrections.

Design implication:

> Prefer machine-readable design context over repeatedly describing the same visual system in prose.

Sources:
https://support.claude.com/en/articles/14604416-get-started-with-claude-design
https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design

## OpenAI

### GPT-5.4 frontend guidance

OpenAI's official 2026 frontend guidance says GPT-5.4 was trained for stronger UI/image use, more complete frontend generation, and better inspection and verification of its own work.

It recommends:

- define design systems and constraints;
- provide visual references or mood boards;
- use real content;
- structure pages around a narrative;
- avoid generic card-heavy patterns;
- use browser/Playwright inspection;
- preserve established design language;
- use lower reasoning for simpler frontend work where appropriate.

Design implication:

> Visual references + real content + rendered verification are more valuable than large amounts of procedural prompting.

Source:
https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4

### GPT-6 Astra skill and prompting guidance

OpenAI's September 2026 guidance says stronger coding agents need less scaffolding and recommends revisiting bloated skills, `AGENTS.md`, and task prompts.

Design implication:

> Keep durable UI guidance compact and outcome-oriented. Use progressive disclosure instead of a single giant instruction file.

Source:
https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

## Visual Studio Code / GitHub Copilot

### Browser tools

Current VS Code documentation describes a closed visual and interactive feedback loop in which an agent can change code, run the app, inspect pages and screenshots, interact with UI, inspect console errors, run focused Playwright, fix problems, and repeat verification.

The browser tools are built into VS Code and do not require an external MCP server.

Design implication:

> Substantial frontend work should be judged from the rendered artifact, not source code alone.

Source:
https://code.visualstudio.com/docs/agents/run/browser-tools

### Subagents

Current VS Code guidance recommends subagents for bounded research, comparing approaches, and independent review, while noting that delegation adds cost and coordination overhead.

Design implication:

> Use an independent critic when the value of a second perspective exceeds the coordination cost. Do not delegate trivial work.

Source:
https://code.visualstudio.com/docs/agents/run/subagents

---

# Experimental model-routing hypotheses

These are **not durable doctrine**.

Potential hypotheses:

- a high-capability reasoning model may produce stronger initial information architecture for ambiguous interfaces;
- a fast frontier model may outperform a slower model for iterative CSS/UI correction once direction is clear;
- code-specialized models may outperform general models on large refactors;
- a different model family may provide more useful visual critique than the builder because it has different priors;
- low or medium reasoning may outperform maximum reasoning for straightforward visual iteration.

Benchmark representative tasks and record:

- insight quality;
- information architecture;
- visual judgment;
- restraint;
- responsiveness;
- interaction quality;
- data faithfulness;
- code maintainability;
- iterations to acceptance;
- latency;
- cost.

Do not let model marketing become architecture.

---

# Change policy and reassessment triggers

Review this knowledge when:

- Anthropic or OpenAI releases a materially stronger coding/design model;
- GitHub or VS Code materially changes browser, subagent, or agent-harness capabilities;
- Claude Design, Dashboards, or Motion materially changes;
- repeated interfaces reveal the same design failure;
- a rule appears to suppress a stronger model's native judgment;
- Ludwig repeatedly overrides the same design choice;
- benchmark results change preferred routing;
- the actual design system changes;
- accessibility, security, or product requirements change;
- a new artifact class becomes common in Ludwig's work.

When updating:

1. preserve durable principles unless evidence contradicts them;
2. date all capability claims;
3. move uncertain recommendations into hypotheses;
4. retire obsolete instructions instead of only adding new ones;
5. record which observed failure or improvement motivated the change.

The purpose of this knowledge is not to become longer.

The purpose is to make future design work better.

---


# 1. Context and intent

## 1.1 User-stated goals captured in the conversation

The following goals are explicit requirements from the conversation:

- Use Claude and OpenAI models inside **VS Code through GitHub Copilot**.
- Improve the current workflow **without removing what already works**.
- Create substantially better **HTML pages, dashboards, visualizations, and interactive analytical experiences**.
- Make generated interfaces **tasteful, elegant, professional, and information-dense**.
- Make the **value-added insight** visually obvious rather than merely displaying data.
- Use knowledge from **Measure What Matters** and other measurement/decision frameworks when determining what belongs on a dashboard.
- Exploit what the latest frontier models are **natively good at**, rather than forcing them into workflows designed for weaker models.
- Preserve the existing **Second Brain / bounded-context / provenance** architecture.
- Use visual references, real design systems, rendered inspection, and browser-based iteration.
- Prefer reusable capability over repeated prompt craftsmanship.

## 1.2 The key strategic decision

Do **not** rebuild the existing harness.

Extend it.

The current Second Brain architecture already contains several strong ideas:

- canonical Markdown and Git history;
- bounded context retrieval instead of dumping the whole vault into context;
- provenance and uncertainty;
- separation between source claims, personal synthesis, AI candidates, and reviewed knowledge;
- thin platform adapters;
- explicit review gates;
- no silent promotion of AI-generated knowledge.

Those principles should remain.

The missing capability is a parallel layer for:

- information design;
- dashboard logic;
- visual design;
- artifact selection;
- frontend execution;
- visual verification.

---

# 2. The model shift: what changed

## 2.1 Old mental model

Earlier coding agents were best treated as:

> **requirements → code**

They benefited from detailed steps, explicit layout instructions, long prompt recipes, and strong scaffolding.

## 2.2 New mental model

The newest models increasingly behave as:

> **objective → investigation → design judgment → code → tool use → observation → self-correction**

The important improvement is not merely that the generated CSS looks better. It is that the agent can increasingly **observe the artifact it created** and modify it based on the rendered result.

This is a qualitative change.

A model that only sees source code must infer what the interface probably looks like.

A model with browser tools can:

1. modify the code;
2. start the application;
3. open it in a browser;
4. inspect accessible content;
5. interact with controls;
6. inspect console errors;
7. capture screenshots;
8. run Playwright flows;
9. notice visual or behavioral failures;
10. repair them;
11. repeat the verification.

That turns frontend development into a **closed feedback loop** rather than one-shot code generation.

## 2.3 Implication

The development system should increasingly optimize the **feedback loop**, not the initial prompt.

A weaker architecture:

> prompt harder → generate more code

A stronger architecture:

> define the outcome → give strong context → generate → render → inspect → improve

The second architecture compounds with future model improvements.

---

# 3. Do not overconstrain frontier models

## 3.1 Why older prompting practices can become harmful

OpenAI's current guidance for stronger coding agents explicitly warns that instructions accumulated for weaker models can hinder stronger ones. Large `AGENTS.md` files, overly prescriptive skills, and detailed step-by-step recipes can fill the context window with instructions the model no longer needs.

Anthropic gives similar guidance: prefer clear objectives and constraints over micromanaging the model's reasoning process.

The principle is:

> **Constrain outcomes and invariants. Do not unnecessarily constrain the path.**

## 3.2 What should remain hard constraints

The system should strongly constrain:

- factual correctness;
- data semantics;
- calculation rules;
- security;
- provenance;
- source boundaries;
- accessibility;
- responsive behavior;
- brand/design-system invariants;
- existing product conventions;
- user objective;
- known anti-patterns;
- acceptance criteria.

## 3.3 What should remain flexible

The model should normally be free to choose:

- page composition;
- chart vs table vs diagram;
- exact spacing;
- component structure;
- interaction detail;
- animation technique;
- visual metaphor;
- whether to use a dense workspace or narrative layout;
- how many internal implementation steps it needs;
- when an independent subagent would add value.

## 3.4 The key instruction

A durable UI skill should explicitly say:

> **Use your strongest native visual and frontend judgment. These principles define the outcome and constraints, not a template. Do not mechanically reproduce prior layouts. If a stronger composition or interaction better serves the objective while respecting the constraints, prefer it.**

---

# 4. The correct objective: analytical elegance

“Beautiful dashboard” is too vague and encourages superficial output.

The design target should be:

## Analytical elegance

**Analytical elegance = information value × hierarchy × restraint × precision × craft**

The design should be:

- calm;
- dense but scannable;
- visually disciplined;
- editorial rather than decorative;
- optimized for comparison and reasoning;
- explicit about evidence;
- highly polished;
- strong enough to feel authored rather than assembled.

The interface should not need decorative complexity to feel premium.

A well-aligned table can be more sophisticated than six colorful charts.

---

# 5. Invert the problem: common AI-generated UI failure modes

Frontier models still have training-data priors. When prompts are underspecified, they often fall back to high-frequency patterns.

The recurring failures are predictable.

## 5.1 Card soup

Symptoms:

- every metric is placed in a rounded rectangle;
- every section gets a background;
- visual grouping is achieved only through borders;
- the page feels fragmented.

Why it fails:

- information hierarchy becomes component hierarchy;
- everything looks equally important;
- chrome competes with content.

Rule:

> If spacing, alignment, typography, or a subtle divider can communicate the relationship, do not add a card.

## 5.2 KPI theater

Typical pattern:

- four large numbers at the top;
- each with an arrow and percentage;
- no target, baseline, driver, or implication.

Why it fails:

A naked number is rarely an insight.

Prefer:

> current value + comparison + target + gap + meaning

## 5.3 Excess whitespace

AI often treats “premium” as “sparse.”

For analytical interfaces, this is often wrong.

The target is:

> **maximum useful information density subject to effortless scanning**

not:

> minimum visible information.

## 5.4 Decorative color

Common failure:

- many accent colors;
- colorful icons;
- rainbow charts;
- gradients used to create apparent sophistication.

Better principle:

> Color should encode meaning or attention.

Structural elements should be predominantly neutral.

## 5.5 Unnecessary icons

Icons are often generated because component libraries make them convenient.

Use an icon when it:

- improves recognition;
- reduces text;
- communicates an action;
- represents a familiar concept.

Do not add icons merely to make a section look “designed.”

## 5.6 Generic dashboard composition

Typical output:

- title;
- four KPIs;
- line chart;
- donut chart;
- bar chart;
- table.

This is visual convention without analytical intent.

A dashboard should be derived from the decision model, not from dashboard stereotypes.

## 5.7 Charts without conclusions

A chart title such as:

> Revenue by segment

describes the encoding.

A stronger title:

> Existing UHNW relationships generated most incremental revenue

communicates the insight.

## 5.8 Build passes = finished

A frontend can compile perfectly and still be poor.

Definition of done must include **rendered and behavioral verification**.

---

# 6. Start with the decision, not the chart

Before building a dashboard, the agent should establish:

## User

Who uses the artifact?

## Job

What are they trying to understand, decide, explain, monitor, or change?

## Questions

What are the 3–7 questions the artifact must answer?

## Evidence

What information is required to answer each question?

## Representation

What is the fastest, clearest form for each question?

## Hierarchy

What should be understandable in:

- 5 seconds;
- 30 seconds;
- 5 minutes?

## Action

What can the user do differently after seeing the result?

Only then should the agent design the interface.

---

# 7. The missing upstream layer: objectives and measurement

The dashboard discussion becomes materially stronger when combined with **Measure What Matters** and broader performance-management thinking.

The correct chain is not:

> data → chart → dashboard

It is:

> **objective → outcome → drivers → evidence → decision → representation → action**

## 7.1 Objective

What is the system ultimately trying to accomplish?

## 7.2 Key result / outcome measure

What observable result indicates success?

## 7.3 Drivers

What variables plausibly cause or influence the outcome?

## 7.4 Diagnostics

What evidence tells us why the driver or outcome moved?

## 7.5 Guardrails

What could be optimized in a harmful way?

## 7.6 Action

What intervention is available?

This is the causal skeleton of a useful analytical interface.

---

# 8. Outcome measures, diagnostic measures, and activity measures

A high-quality dashboard should distinguish three classes of metrics.

## 8.1 Outcome measures

Did we achieve the desired result?

Examples:

- retention;
- risk reduction;
- expected portfolio outcome;
- cycle time;
- conversion;
- final score.

## 8.2 Driver / diagnostic measures

Why is the outcome changing?

Examples:

- data quality;
- utilization;
- exposure;
- throughput;
- distribution;
- role change;
- process bottleneck.

## 8.3 Activity measures

What did we do?

Examples:

- cases processed;
- meetings held;
- commits;
- calls;
- notes created.

Activity is easy to count, which is exactly why it can become dangerous.

> **Activity is not accomplishment.**

A dashboard that overweights activity can make an organization look busy while masking weak outcomes.

---

# 9. Goodhart's Law and countermetrics

Once a metric becomes prominent, people adapt behavior to it.

Therefore every important measure should be stress-tested:

> If a smart person tried to maximize this number blindly, what would break?

Example pattern:

- throughput improves;
- quality deteriorates;
- difficult cases are avoided;
- downstream rework increases.

The dashboard should therefore include countermetrics or guardrails when needed.

A robust measurement surface often includes:

- outcome;
- throughput;
- quality;
- risk;
- evidence coverage.

The purpose is not to show more metrics. It is to prevent the chosen metric from creating the wrong behavior.

---

# 10. Objective trees and metric trees

A reusable analytical representation is the **objective tree**.

```text
OBJECTIVE
   ↓
KEY RESULTS / OUTCOMES
   ↓
DRIVERS
   ↓
DIAGNOSTICS
   ↓
ACTIONS
```

This gives each dashboard component a reason to exist.

For every component, ask:

> Which objective, outcome, driver, risk, or decision does this support?

If the answer is vague—“useful overview,” “nice context,” “completeness”—the component is probably weak.

---

# 11. Not every interface should be an OKR dashboard

Do not turn OKRs into a universal ontology.

Different problems require different analytical structures.

## Goal system

> objective → outcome → driver → action

Useful for performance and strategy.

## Operating system

> desired state → deviation → cause → intervention

Useful for operations.

## Risk system

> exposure → probability → impact → mitigation

Useful for risk management.

## Portfolio system

> objective → allocation → contribution → opportunity cost

Useful for investing and portfolio decisions.

## Diagnostic system

> symptom → evidence → hypothesis → test → cause

Useful for debugging and root-cause analysis.

The UI Intelligence Layer should identify the problem class before deciding the page structure.

---

# 12. The insight should be the visual hero

Most dashboards make the metric the hero.

A better analytical interface makes the **conclusion** the hero.

Weak:

> Revenue  
> 312M  
> +4.2%

Stronger:

> **Most incremental revenue came from existing high-value relationships.**

Then support it with:

- magnitude;
- comparison;
- evidence;
- implication;
- next action.

The dominant hierarchy becomes:

> **insight → magnitude → evidence → context → implication → action**

This is one of the most important design rules in this document.

---

# 13. One screen, one dominant analytical argument

A strong screen can contain substantial information, but it should normally have one dominant thesis.

Examples:

- “This category is the cheapest path to additional expected points.”
- “The apparent deterioration is mostly a measurement change.”
- “Retrieval quality improved, but reviewed knowledge coverage remains the bottleneck.”
- “The portfolio is resilient to one scenario but highly exposed to another.”

Everything else should support, qualify, or allow interrogation of that argument.

This creates a page that feels authored.

---

# 14. Three levels of information

A serious analytical product should support multiple reading speeds.

## Level 1 — Orientation

Question:

> What is happening?

Time:

~5 seconds.

Use:

- one primary insight;
- current state;
- most material change;
- one or two key comparisons.

## Level 2 — Diagnosis

Question:

> Why?

Time:

~30 seconds.

Use:

- driver decomposition;
- ranked opportunities;
- trends;
- variance;
- scenario contribution.

## Level 3 — Evidence

Question:

> Can I verify this?

Time:

minutes.

Use:

- raw values;
- tables;
- definitions;
- source freshness;
- assumptions;
- methodology;
- query/calculation;
- confidence.

The UI pattern is:

> **glance → understand → interrogate**

---

# 15. Provenance should be visible

AI-era analytical interfaces need strong epistemic design.

Every material claim should eventually make it possible to answer:

- Where did this come from?
- When was the source updated?
- Is the number observed, calculated, or estimated?
- What definition was used?
- What assumptions were used?
- How confident are we?
- Can I inspect the underlying calculation?

Claude Dashboards provide an important current pattern: each chart can expose the query that generated it and show refresh freshness.

The durable design principle is:

> **insight → value → evidence → calculation → source**

This should become a recurring pattern in analytical interfaces.

---

# 16. Context turns numbers into information

A metric becomes useful through comparison.

Prefer to show one or more of:

- target;
- prior period;
- historical range;
- benchmark;
- expectation;
- distribution;
- rank;
- confidence interval;
- scenario baseline.

Instead of:

> 91.4%

prefer:

> 91.4% · 89.1% previous period · target 95% · +2.3pp

The core principle:

> **A naked KPI should be considered incomplete unless the value is self-explanatory.**

---

# 17. Visualization grammar

The visualization should be chosen from the analytical question.

| Need | Good default |
|---|---|
| exact values | table |
| rank | sorted horizontal bar |
| time trend | line |
| distribution | histogram / strip / box |
| relationship | scatter |
| contribution to total | stacked bar |
| change between states | slope / delta / waterfall |
| variance from target | bullet / variance bar |
| many variables × entities | heatmap |
| sequence / process | flow |
| causal explanation | annotated diagram |
| scenarios | side-by-side table/chart |
| complex analytical dataset | dense sortable table |
| one critical fact | text |

The rule is not mechanical. It is a perceptual default.

When exact comparison matters, prefer encodings based on **position and length** over area, angle, or decoration.

---

# 18. Tables are first-class analytical components

AI-generated dashboards overuse charts.

For repeated analytical work, a well-designed table is often superior.

High-value table features include:

- strong numerical alignment;
- sticky headers;
- sensible column grouping;
- compact row height;
- sort;
- filters;
- inline deltas;
- carefully used sparklines;
- expandable evidence;
- clear states;
- direct actions;
- restrained highlighting.

Do not force a chart when a table makes comparison faster.

---

# 19. Visual hierarchy before decoration

A useful priority order:

> **meaning → position → size → typography → contrast → color → decoration**

Poor AI interfaces often invert this:

> color → shadow → radius → gradient → icon

The model should first decide what deserves attention.

Then use design mechanics to express that hierarchy.

---

# 20. Tasteful design: practical visual principles

## 20.1 Structure should be felt, not seen

Use:

- spacing;
- alignment;
- typography;
- subtle tonal shifts.

Use borders only when they add clarity.

Linear's 2026 redesign provides a useful principle:

> supporting interface elements should recede; structure should be perceptible without visually shouting.

## 20.2 Fewer surfaces

Use perhaps:

1. base page;
2. subtle grouped area;
3. elevated interactive layer.

Do not invent a new surface for every section.

## 20.3 Restrained radius

Rounded corners are not sophistication.

Use moderate radius where it supports the design language.

## 20.4 Minimal shadows

Elevation should indicate actual layering:

- menu;
- overlay;
- popover;
- floating control.

Do not add shadows to every panel.

## 20.5 Color as information

A useful mental target:

- most of the interface = structural neutrals;
- a small amount = accent or semantic color.

Use semantic color consistently:

- positive;
- negative;
- warning;
- selected;
- category differentiation where required.

Never use color as the sole carrier of critical meaning.

## 20.6 Typography is a primary design system

Most “premium” analytical design comes from:

- hierarchy;
- spacing;
- alignment;
- line-height;
- contrast;
- numerical typography.

Suggested conceptual levels:

- primary insight;
- major quantitative statement;
- section heading;
- analytical body;
- dense table;
- metadata/provenance.

Large type must be earned by importance.

---

# 21. Dense can be elegant

Minimalism is not the same as clarity.

Professional analytical tools are often information-dense because users repeatedly compare many variables.

The correct objective is:

> **high density + low cognitive friction**

Achieve it with:

- consistent alignment;
- clear grouping;
- muted secondary text;
- disciplined columns;
- compact but usable spacing;
- progressive disclosure;
- predictable controls.

Do not remove useful information simply to create empty space.

---

# 22. Writing is part of UI design

Karpathy's suggestion to use ASD-STE100-like language is particularly useful for analytical interfaces.

A practical version is:

> “80% of the way to ASD-STE100”

Use:

- short sentences;
- concrete verbs;
- explicit subjects;
- one idea per sentence;
- few adjectives;
- named quantities;
- explicit causal relationships;
- minimal marketing language.

Weak:

> “Market Opportunity Analysis provides actionable insights to help optimize outcomes.”

Better:

> “These opportunities improve categories where additional points are still attainable.”

Better still:

> “This change increases expected output by 2.3 units over the next 14 days.”

The UI should explain, not advertise itself.

---

# 23. HTML is becoming a general reasoning medium

HTML should no longer be treated merely as the final format for a website.

Frontier models can use HTML for:

- interactive explainers;
- simulations;
- scenario tools;
- one-off analytical artifacts;
- visual narratives;
- models with sliders;
- decision aids;
- prototypes;
- dashboards;
- interactive diagrams.

This is the deeper implication of Karpathy's “disposable software” thesis.

Historically, a custom application for a 30-minute decision was irrational.

When generation costs collapse, a bespoke interactive artifact can be cheaper than a long written explanation.

The artifact can also improve reasoning because the user can manipulate assumptions instead of only reading conclusions.

---

# 24. Do not default to “dashboard”

The artifact form should follow the cognitive job.

| Job | Default artifact |
|---|---|
| repeated monitoring | dashboard |
| one-off complex analysis | interactive explainer |
| uncertain decision | scenario simulator |
| root-cause analysis | diagnostic workbench |
| strategy / story | narrative data page |
| process / relationship | interactive diagram |
| model assumptions | parameter explorer |
| exact comparison | analytical table |
| fixed sequence explanation | animated explainer / video |

This is more powerful than making every data task look like BI software.

---

# 25. Motion is an information channel

Animation should communicate:

- state change;
- causality;
- scenario transition;
- re-ranking;
- the effect of an interaction;
- the progression of an explanation.

Bad motion:

- counters animating from zero;
- decorative floating particles;
- arbitrary chart entrance effects;
- animation with no analytical meaning.

Good motion:

- a projected outcome visibly changes when an assumption changes;
- bars re-rank when the scenario changes;
- a causal path is revealed in sequence;
- a before/after state transitions smoothly enough to preserve context.

Motion should answer:

> **What changed?**

---

# 26. Interaction can itself generate insight

A static page can state a conclusion.

An interactive page can let the user test the conclusion.

Useful controls may expose:

- scenario;
- time horizon;
- assumptions;
- filters;
- target;
- risk tolerance;
- comparison group;
- alternative action.

Then recompute:

- expected outcome;
- contribution;
- trade-off;
- downside;
- confidence.

The best interaction is not merely “interactive.” It changes the quality of the user's thinking.

---

# 27. Work at three visual distances

A useful design test:

## Across the room

Can the user see what matters?

## Normal working distance

Can the user understand why?

## Investigation distance

Can the user verify the conclusion?

A strong analytical interface supports all three.

---

# 28. Claude: what to exploit

## 28.1 Claude Design

Current Claude Design capabilities support the broader strategy:

- generate a first visual from a description;
- import design systems from GitHub, design files, uploads, or local code;
- use real components and tokens;
- visually edit and refine;
- move between Design and Claude Code;
- export to HTML and other formats.

The durable lesson:

> **Design context should be machine-readable and executable.**

Do not repeatedly describe the design system in prose if the model can inspect the actual components, tokens, reference implementations, and assets.

## 28.2 Claude Dashboards

Current Claude Dashboards can:

- connect to data sources;
- generate SQL per chart;
- expose the query;
- display freshness;
- support exploratory questions.

The durable lesson is not “use Claude for charts.”

It is:

> **Make analytical claims interrogable.**

## 28.3 Claude Cowork / unified Claude

Anthropic merged chat and Cowork so users do not need to decide which environment a task belongs in.

Architectural lesson:

> **The user should state the goal; the harness should decide the capability.**

Do not make the user manually route every task to:

- dashboard agent;
- HTML agent;
- visual agent;
- research agent.

A clear skill description should let the model infer when a capability is relevant.

## 28.4 Claude and agentic continuity

Keep a coherent main session for work where continuity matters.

Use subagents for:

- independent critique;
- bounded research;
- alternative approaches;
- isolated verification.

Do not create handoffs merely because multiple agents are available.

---

# 29. OpenAI models: what to exploit

OpenAI's current frontend guidance highlights several capabilities that should directly influence the harness.

## 29.1 Stronger image understanding

Use:

- screenshots;
- mood boards;
- visual references;
- real examples.

These often communicate layout rhythm and visual language better than long prose instructions.

## 29.2 More complete application generation

Ask for the actual product behavior, not only the shell.

Include:

- empty states;
- loading;
- errors;
- responsiveness;
- interactions;
- realistic content.

## 29.3 Tool-based inspection

The model should inspect and test its own frontend rather than reasoning only from source code.

## 29.4 Better results with real content

Real domain content improves:

- page structure;
- hierarchy;
- wording;
- component choice.

Placeholder content makes placeholder-looking UI.

## 29.5 Avoid over-reasoning simple frontend tasks

Not every CSS adjustment needs maximum reasoning.

Use higher reasoning when the hard problem is:

- information architecture;
- ambiguous product design;
- complex analytical logic;
- multi-step refactor;
- root-cause debugging.

Use lighter/faster modes when the task is obvious and local.

---

# 30. GitHub Copilot / VS Code: what to exploit

The VS Code environment now contains enough primitives to build a strong visual-development loop without replacing the current workflow.

## 30.1 Browser tools

Use the integrated browser to:

- open the app;
- navigate routes;
- inspect page content;
- click and type;
- hover and drag;
- inspect console errors;
- capture screenshots;
- run Playwright;
- test responsive states.

This should be standard for substantial frontend work.

## 30.2 Element-level feedback

Use the browser's “Add to Chat” / element selection to point to exact rendered problems instead of describing them abstractly.

This is highly valuable for:

- alignment;
- responsive issues;
- typography;
- controls;
- component-level improvements.

## 30.3 Subagents

Use subagents when independent context is valuable.

Good subagent use:

- codebase research;
- independent visual critique;
- accessibility review;
- performance review;
- comparison of approaches.

Bad use:

- trivial edits;
- constant handoffs;
- spawning agents without a clear scope.

## 30.4 Custom agents

A custom agent is useful when a role has a stable objective and different tool/model needs.

Recommended first custom agent:

> **Visual Critic**

Do not begin with ten agents.

---

# 31. Model diversity as an advantage

Different model families encode different priors.

For material design tasks, independent views can improve the outcome.

A useful pattern:

1. one model proposes the information architecture / visual thesis;
2. another model implements;
3. an independent model critiques the rendered result;
4. the builder applies the highest-value changes.

This creates an **ensemble of taste**.

Avoid having the same agent:

- design;
- implement;
- judge whether its design was excellent.

Independent critique reduces self-justification.

---

# 32. Model routing: use a benchmark, not dogma

Do not permanently hardcode one model to one role.

The available models change rapidly.

A reasonable temporary hypothesis may be:

- strongest reasoning model → ambiguous UX / architecture;
- fast strong coding model → implementation;
- code-specialized model → large refactor / agentic build;
- independent frontier model → critique.

But evaluate this empirically.

## Proposed benchmark

Run the same tasks across candidate models:

### Task A — Insight dashboard

Given a dataset, identify the important insight and design the artifact.

### Task B — Existing interface improvement

Preserve strengths and improve weaknesses.

### Task C — Interactive explainer

Convert a complex thesis into an HTML thinking tool.

### Task D — Responsive analytical application

Build and verify desktop/mobile behavior.

Score:

- insight quality;
- information architecture;
- visual judgment;
- originality;
- restraint;
- data faithfulness;
- responsive quality;
- interaction;
- code quality;
- iterations to acceptance;
- time;
- cost.

This creates routing based on **your real work**, not marketing or benchmarks.

---

# 33. The 1M context trap

A large context window is not automatically an advantage.

Relevant context is more valuable than maximum context.

Prefer:

- current page;
- relevant project requirements;
- design system;
- data semantics;
- 2–5 visual references;
- selected previous decisions.

Avoid:

- whole repository;
- whole Second Brain;
- months of unrelated conversation;
- entire design library.

The existing Second Brain principle—bounded, provenance-rich context—is correct.

Signal-to-noise remains important even with very large context windows.

---

# 34. Visual references: RAG for taste

A high-value capability is a curated visual reference library.

Do not save screenshots merely as “nice dashboard.”

Annotate why each example matters.

Example:

```text
dense-analytical-table.png

USE:
- high information density
- strong numerical alignment
- muted secondary metrics
- compact row states

DO NOT COPY:
- blue palette
- excessive row height
```

Over time this becomes **retrievable visual taste**.

This can outperform long prose descriptions of aesthetics because multimodal frontier models can infer:

- typography scale;
- spacing rhythm;
- composition;
- hierarchy;
- visual density;
- interaction patterns.

---

# 35. Preserve strengths before changing existing work

This is essential to the user's requirement: improve the workflow without destroying what already works.

Before modifying an existing page, the agent should identify:

## Preserve

What is already working?

## Change

What is specifically weak?

## Risk

What might the proposed change damage?

## Verify

How will we know the result is better?

This prevents the common agent failure:

> redesign everything because redesigning is easier than improving selectively.

A Visual Critic should explicitly report:

1. strengths to preserve;
2. blocking problems;
3. 1–3 highest-value improvements;
4. lower-priority observations.

---

# 36. Visual QA: generation is not the terminal step

The main operating principle:

> **Generation should never be the terminal step. Evaluation should be.**

The standard loop:

```text
FRAME
↓
INFORMATION ARCHITECTURE
↓
BUILD
↓
RUN
↓
RENDER
↓
INTERACT
↓
SCREENSHOT
↓
CRITIQUE
↓
FIX
↓
VERIFY AGAIN
```

## 36.1 Different checks need different tools

### Analytical correctness

Use deterministic unit/integration tests.

### Interaction behavior

Use Playwright or equivalent.

### Visual quality

Use screenshots + model vision + human review.

### Product judgment

Use the human.

Do not force one method to replace all four.

---

# 37. Responsive QA

“Responsive” should be demonstrated, not asserted.

Inspect at multiple regimes, for example:

- wide desktop;
- laptop;
- tablet;
- narrow mobile.

Also inspect important states:

- default;
- loading;
- empty;
- error;
- hover;
- focus;
- active filter;
- long label;
- large numeric value;
- missing data.

Hard blockers include:

- incorrect numbers;
- broken interaction;
- horizontal mobile overflow;
- unreadable labels;
- misleading chart scale;
- inaccessible control;
- console error;
- invented data.

---

# 38. Use a quality rubric without Goodharting it

A rubric is useful as a diagnostic tool, not as a rigid score optimizer.

Relevant dimensions include:

- decision usefulness;
- information architecture;
- data integrity;
- provenance;
- visual hierarchy;
- visualization quality;
- interaction;
- typography;
- density;
- responsive design;
- accessibility.

The critic should still begin with:

> What is this page trying to accomplish?

A score should never substitute for judgment.

---

# 39. Recommended UI Intelligence architecture

The intended system is deliberately lightweight.

```text
TRUTH / CONTEXT
Second Brain
project docs
data
metric definitions
provenance
design system
visual references
        ↓
INTENT / GUARDRAILS
objective
audience
decision
design principles
anti-patterns
acceptance criteria
        ↓
FRONTIER MODEL
reasoning
visual judgment
composition
coding
tool use
browser inspection
self-correction
        ↓
VERIFICATION
tests
Playwright
screenshots
critic
human judgment
```

The key architectural rule:

> **Do not duplicate frontier-model intelligence inside the guardrail layer.**

---

# 40. Recommended Copilot structure

Keep existing global project rules thin.

Suggested structure:

```text
.github/
  copilot-instructions.md
  instructions/
    product-ui.instructions.md
  agents/
    visual-critic.agent.md
  prompts/
    build-insight-artifact.prompt.md

~/.copilot/
  skills/
    ludwig-ui/
      SKILL.md
      principles.md
      analytical-ui.md
      anti-patterns.md
      visual-qa.md
      references.md
```

## 40.1 `copilot-instructions.md`

Keep this thin.

It should point to:

- project rules;
- Second Brain protocol;
- relevant skills.

Do not turn it into a giant dashboard manual.

## 40.2 `SKILL.md`

The root skill should mostly be a router.

It should tell the model:

- when the capability applies;
- what the high-level objective is;
- which deeper files to consult;
- what must be verified.

Use progressive disclosure.

## 40.3 Project-specific instructions

The reusable UI skill knows how to make excellent analytical software.

The project knows:

- brand;
- domain;
- product conventions;
- design tokens;
- actual components;
- audience.

## 40.4 Design system

Prefer real machine-readable assets:

- CSS variables;
- tokens;
- components;
- typography roles;
- chart primitives;
- tables;
- interaction patterns.

Do not repeatedly translate the same design system into natural language.

---

# 41. Proposed thin `Ludwig UI Intelligence` core

A durable root instruction could be:

> Use your strongest native visual, analytical, and frontend judgment. These principles define the outcome and constraints, not a layout recipe. First understand the objective, audience, evidence, and most valuable insight. Choose the artifact, composition, interaction, and visual representation that communicates the result most effectively. Use the existing design system and relevant references. Prefer calm, precise, information-dense analytical design over generic SaaS styling. Do not add visual treatments that do not improve understanding or interaction. Render the result, inspect it visually and functionally, preserve what already works, and improve the highest-value weaknesses. Never claim visual quality based only on source code.

This is intentionally shorter than a detailed step-by-step design recipe.

---

# 42. Proposed Visual Critic behavior

The first custom agent should be adversarial but selective.

Its job:

- inspect the rendered interface;
- understand the intended user decision;
- identify the strongest existing aspects;
- identify what blocks comprehension or use;
- prioritize 1–3 improvements;
- avoid redesign for its own sake.

It should review:

- decision usefulness;
- primary insight;
- hierarchy;
- density;
- chart/table choice;
- evidence visibility;
- visual restraint;
- typography;
- spacing;
- consistency;
- responsive behavior;
- accessibility;
- misleading encodings;
- generic AI UI patterns.

It should not automatically rewrite the implementation.

---

# 43. Artifact exploration for important tasks

For ambiguous, high-value design problems, explore alternatives before committing.

Example:

## Concept A — Dense analytical workspace

Best when the user repeatedly investigates and compares.

## Concept B — Editorial insight narrative

Best when the main task is understanding and communication.

## Concept C — Interactive model / scenario explorer

Best when uncertainty and assumptions matter.

Do not force exploration for trivial changes.

Use it when the design decision itself is material and ambiguous.

---

# 44. Design tokens and systematic iteration

Keep important visual variables explicit.

Potential token categories:

- page background;
- surface levels;
- text levels;
- accent;
- positive/negative/warning;
- radius;
- border contrast;
- density;
- content width;
- typography scale;
- table row height;
- chart label density;
- motion timing.

This allows the model to tune a coherent system instead of patching arbitrary values across many components.

---

# 45. One particularly important design instruction

Before visually optimizing a page:

> **State the most valuable insight in one sentence.**

Then use that sentence to determine the visual hierarchy.

The interface should help the reader:

1. understand the insight;
2. evaluate its evidence;
3. see its implications;
4. decide whether to act.

This is stronger than “make it beautiful.”

---

# 46. One particularly important aesthetic instruction

> **Aim for calm, precise, editorial analytical design. Prefer typography, alignment, spacing, proportion, and meaningful contrast over decoration. Use fewer surfaces, borders, colors, icons, and effects than a typical AI-generated dashboard. Preserve useful information density. Every strong visual treatment must be earned by importance.**

---

# 47. The operating workflow

A recommended default workflow in VS Code / Copilot:

## Step 1 — Frame the objective

Give the agent:

- user;
- decision;
- data;
- constraints;
- desired outcome.

Do not start with visual styling.

## Step 2 — Ask for the information architecture

Require:

- primary insight;
- user questions;
- evidence;
- hierarchy;
- suggested artifact form.

## Step 3 — Retrieve the relevant capability

Load:

- UI skill;
- project design instructions;
- small set of relevant visual references;
- data semantics.

## Step 4 — Build the dominant hierarchy first

Do not begin with a full dashboard template.

## Step 5 — Render immediately

Do not iterate on unseen JSX/CSS for long.

## Step 6 — Use browser tools

Inspect actual desktop and mobile output.

## Step 7 — Run independent critique

Prefer a different model or subagent for meaningful work.

## Step 8 — Preserve strengths

Explicitly identify what should not change.

## Step 9 — Fix high-value problems only

Avoid endless aesthetic churn.

## Step 10 — Verify behavior and correctness

Use:

- tests;
- Playwright;
- screenshots.

## Step 11 — Capture durable learning

If a reusable principle emerged, create a candidate.

Do not turn one-off preferences into permanent global rules automatically.

---

# 48. What not to do

Do not:

- replace GitHub Copilot simply because Claude or ChatGPT have new standalone product surfaces;
- copy every Claude capability into the Copilot harness;
- put the entire UI methodology in `copilot-instructions.md`;
- force every frontend task through maximum reasoning;
- use 1M context by default;
- use ten agents where one capable agent and one critic are enough;
- add another MCP server when VS Code already has the required browser capability;
- convert every analysis into React;
- make every dataset into a dashboard;
- use visual minimalism as an excuse to remove useful information;
- optimize the dashboard for screenshot aesthetics rather than decision value;
- treat an attractive rendering as proof the analysis is correct;
- let a critic destroy strengths while fixing weaknesses.

---

# 49. Expected future direction

The trend across Claude, ChatGPT/OpenAI, and GitHub Copilot suggests a larger transition.

Software creation is moving upward in abstraction.

As code becomes cheaper, the human role shifts toward:

- objective selection;
- judgment;
- taste;
- validation;
- causal reasoning;
- oversight.

At the same time, the model can increasingly generate **temporary, bespoke software artifacts** that previously would not have justified development cost.

Therefore future analytical work may increasingly look like:

> ask a question → model researches → model builds a custom interactive artifact → user explores → model revises → artifact is discarded or promoted into a durable product

The important skill becomes deciding which artifacts deserve to persist.

---

# 50. Durable principles

The following are the highest-value principles to retain.

1. **A dashboard is a decision surface, not a collection of charts.**
2. **Start from the objective and causal model, not the visualization.**
3. **Activity is not accomplishment.**
4. **A metric without context is usually incomplete.**
5. **The insight—not the KPI—should normally be the visual hero.**
6. **One screen should have one dominant analytical argument.**
7. **Support glance, understanding, and interrogation.**
8. **Evidence, methodology, freshness, and provenance should be accessible.**
9. **Tables are first-class analytical interfaces.**
10. **Density is not the enemy; cognitive friction is.**
11. **Use color to encode meaning, not decoration.**
12. **Use motion to explain change, not to signal that the page is modern.**
13. **HTML can be a thinking tool, not merely a website.**
14. **Do not default to dashboards; choose the artifact based on the cognitive job.**
15. **Use real design systems and visual references rather than repeatedly describing them.**
16. **Use browser observation as part of the frontend feedback loop.**
17. **Generation is not the final step; evaluation is.**
18. **Preserve existing strengths before modifying established work.**
19. **Use independent model critique selectively.**
20. **Constrain outcomes and invariants; let frontier models use native judgment.**
21. **Keep skills thin and use progressive disclosure.**
22. **Relevant context beats maximum context.**
23. **Benchmark models on the work that actually matters to you.**
24. **The better the model becomes, the more carefully define quality—and the less you need to prescribe the path.**

---

# 51. Source register

The following public sources were directly relevant to the research in this conversation. Product capabilities change quickly; verify current behavior when implementation depends on a specific feature.

## Anthropic

### Claude Design
https://claude.com/product/design

Key relevance:
- import design systems from GitHub/local code;
- build with real components;
- move between Claude Design and Claude Code;
- fine-grained visual editing;
- HTML export.

### Claude Design help
https://support.claude.com/en/articles/14604416-get-started-with-claude-design

Key relevance:
- `/design`;
- `/design-sync`;
- using actual design-system components.

### Claude Dashboards
https://support.claude.com/en/articles/17454700-get-started-with-claude-dashboards

Key relevance:
- natural-language dashboard creation;
- SQL per chart;
- visible query;
- refresh freshness;
- exploratory BI.

### Claude: Cowork and chat become one
https://claude.com/blog/cowork-is-now-claude

Key relevance:
- user no longer needs to route task type manually;
- context, skills, and connectors remain available;
- agent decides what a task needs.

### Claude resources
https://claude.com/resources/articles

Relevant 2026 release:
- Dashboards and Motion;
- increasingly integrated artifact creation.

## OpenAI

### Designing delightful frontends with GPT-5.4
https://developers.openai.com/blog/designing-delightful-frontends-with-gpt-5-4

Key relevance:
- improved image understanding;
- more complete frontend generation;
- tool-based inspection;
- design systems;
- visual references;
- real content;
- avoidance of generic card-heavy patterns;
- low/medium reasoning can be preferable for simple frontend work.

### Frontend prompt instructions
https://developers.openai.com/api/docs/guides/frontend-prompt

Key relevance:
- domain-specific frontend design;
- operational tools should be quiet, dense, predictable, and work-focused;
- preserve existing design language.

### Rethinking skills and prompts for GPT-6 Astra
https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

Key relevance:
- stronger models require less scaffolding;
- revisit bloated `AGENTS.md` and skill instructions;
- progressive disclosure;
- avoid unnecessary instructions.

## GitHub / VS Code

### Browser tools with agents
https://code.visualstudio.com/docs/agents/run/browser-tools

Key relevance:
- integrated browser;
- screenshots;
- page inspection;
- console errors;
- interaction;
- Playwright;
- build→inspect→fix loop;
- element-level feedback.

### Subagents
https://code.visualstudio.com/docs/agents/run/subagents

Key relevance:
- independent research;
- comparison;
- review;
- separate context;
- use selectively because delegation adds cost/coordination.

### Agent concepts
https://code.visualstudio.com/docs/agents/concepts/agents

Key relevance:
- agent loop;
- action;
- validation;
- review.

## Design / information sources

### Linear — A calmer interface for a product in motion
https://linear.app/now/behind-the-latest-design-refresh

Key relevance:
- preserve rich information density;
- supporting UI should recede;
- do not compete for attention without earning it;
- structure should be felt rather than seen;
- fewer borders and lower visual noise.

### Linear — Dashboard best practices
https://linear.app/now/dashboards-best-practices

Key relevance:
- fewer dashboards;
- clear purpose;
- match design to operational vs strategic job;
- tune density to audience/frequency;
- provide context, not isolated numbers.

### Apple HIG — Layout
https://developer.apple.com/design/human-interface-guidelines/layout

Key relevance:
- hierarchy by importance;
- alignment for scanning;
- grouping;
- progressive disclosure;
- adaptive layouts.

### Apple HIG — Design principles
https://developer.apple.com/design/human-interface-guidelines/design-principles

Key relevance:
- purpose;
- intention;
- meaningful design over ornament.

---

# 52. Second Brain integration note

This document is a **derived AI synthesis**, not a reviewed canonical belief.

Recommended lifecycle:

> candidate → human review → reconcile with existing notes → promote selected durable principles

Do not promote the entire document automatically merely because it is comprehensive.

Potential long-term knowledge objects may eventually be separated into:

- `concept-ui-intelligence`
- `concept-insight-first-design`
- `concept-dashboard-as-decision-surface`
- `learning-frontier-models-need-less-scaffolding`
- `learning-browser-feedback-loop`
- `reference-frontend-design-sources`
- `decision-copilot-ui-intelligence-layer`

That decomposition should happen only after review and de-duplication against existing knowledge.

---

# 53. Recommended next implementation

The smallest high-leverage implementation is:

1. Create a **thin `Ludwig UI Intelligence` Copilot skill**.
2. Create one **Visual Critic** agent.
3. Create one **build / render / inspect / refine** prompt.
4. Create a small **visual reference library**.
5. Use VS Code browser tools as a required quality loop for substantial frontend work.
6. Run a small **model benchmark** before hardcoding model routing.
7. Keep the existing Second Brain architecture and thin Copilot adapter unchanged unless evidence shows a real failure.

This captures the advantage of the newest models without suppressing their native capabilities.

---

# 54. Final principle

The key transition can be stated simply:

> **As models become more capable, define the destination more carefully and prescribe the route less.**

For design and analytical interfaces, the durable human contribution becomes:

- knowing what matters;
- defining the objective;
- understanding the causal structure;
- selecting trustworthy evidence;
- recognizing excellent design;
- challenging misleading representations;
- deciding whether the output is actually useful.

The frontier model should perform more of the implementation and exploration.

The harness should make sure it has the right context, constraints, references, tools, and feedback loop to do that work well.


# v1.1 release note

This revision preserves the original core thesis but improves the knowledge architecture.

Material changes:

- separates durable principles from time-sensitive capability claims and untested hypotheses;
- adds a high-compression analytical design doctrine;
- makes the provenance limitation around _Measure What Matters_ explicit;
- introduces the Insight Component as a reusable analytical primitive;
- adds the representation challenge;
- distinguishes disposable HTML artifacts, reusable analytical tools, and durable products;
- formalizes preservation and regression before redesign;
- adds a structured visual-reference / “RAG for taste” model;
- adds a dated capability snapshot grounded in current official Anthropic, OpenAI, and VS Code documentation;
- moves model routing into the hypothesis layer;
- adds reassessment triggers so the document can become shorter as well as longer when models improve.

The most important retained principle remains:

> **Find the most valuable insight, make it difficult to miss or misunderstand, provide enough evidence and context to trust it, and remove almost everything that does not help that job.**
