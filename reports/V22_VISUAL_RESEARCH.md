# V22 visual research synthesis

## Question

How can the Hub reach the visual ambition of the generated boards without becoming a decorative dashboard, a source-of-wealth-only product, or a visually confident representation of unsupported enterprise facts?

## Observed common grammar in the supplied boards

Across the supplied reference set, the strongest recurring qualities are:

- a warm ivory / pale stone canvas with deep pine used sparingly for the shell, selected objects and focal states;
- high light-to-dark contrast but low overall saturation;
- one clear visual focal point per major scene rather than many equally weighted cards;
- deliberate asymmetry, overlap and negative space;
- large variation in object scale;
- document materiality: source folios, highlighted passages, requirement sheets, evidence records and object dossiers feel like different information objects;
- restrained linework and selective connectors rather than all-to-all graphs;
- small annotations that explain relationship meaning near the relevant object;
- a shift in density by task: spacious orientation, guided worked traces, denser inspection views and efficient search/reference views;
- consistent object identity across source, requirement, field, method, evidence and change contexts;
- visual transitions from readable source -> structured context -> bounded use;
- current/proposed/uncertain states shown with small semantic markers rather than large decorative colour fields;
- diagrams and illustrations that carry explanatory work rather than merely decorate the page.

## Where the boards should not be followed literally

Some boards contain visual or content shortcuts that a production knowledge product should reject:

- generated counts and freshness markers that look authoritative;
- article numbers, states, approvals or readiness signals not grounded in current sources;
- tiny labels that work only at a single screenshot scale;
- ambiguous arrows whose relationship must be inferred from position;
- depth that could be mistaken for maturity or importance;
- diagrams that collapse source, interpretation, requirement, implementation and evidence into one smooth flow;
- landscape imagery and editorial serif typography that may be visually attractive but are not automatically approved product/brand assets.

V22 therefore extracts composition and information-design principles, not literal assets or generated facts.

## External research

### IBM Design Language — layout and composition

IBM's current layout guidance emphasizes hierarchy, scale, proportion, contrast, rhythm, repetition and variation; recommends ample negative space; and explicitly recommends balanced asymmetry and planned eye movement to create compositional flow. This supports moving beyond repeated equal card grids while retaining systematic alignment.

Sources:
- https://www.ibm.com/design/language/layout/overview/
- https://www.ibm.com/design/language/layout/tips-and-techniques/

### IBM technical diagrams

Technical-diagram guidance reinforces explicit node/connector semantics, clear hierarchy, legibility and consistent notation for systems, relationships and flows. This supports typed relationship labels and restrained diagrams rather than decorative network density.

Source:
- https://www.ibm.com/design/language/infographics/technical-diagrams/design/

### Nielsen Norman Group — progressive disclosure and complex applications

NN/g recommends showing primary options first, deferring secondary material until requested, and easing transitions between primary and supporting information. Their complex-application guidance also stresses making important information visually salient, sometimes by removing competing elements rather than adding emphasis.

Sources:
- https://www.nngroup.com/articles/progressive-disclosure/
- https://www.nngroup.com/articles/complex-application-design/

### Carbon Design System — multiple density models

Carbon explicitly distinguishes editorial, product/docs and high-density interface models. That supports using different density regimes inside one coherent Hub rather than forcing every surface into the same card/dashboard template.

Sources:
- https://www.carbondesignsystem.com/building-blocks/foundations/2x-grid/guidelines
- https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines

### OpenAI Astra guidance

Current OpenAI guidance describes GPT-6 Astra as capable of complex coding and front-end work and emphasizes thorough planning and browser/testing feedback. OpenAI showcase examples also demonstrate Astra building visually sophisticated interactive browser experiences when it has a concrete visual objective and a way to inspect the result. The implication for this project is that feedback quality and visual acceptance evidence matter more than adding another large prose style specification.

Sources:
- https://developers.openai.com/api/docs/models/gpt-6-astra
- https://developers.openai.com/api/docs/guides/prompt-engineering
- https://developers.openai.com/blog/how-to-build-games-with-astra

## Product conclusion

The Hub can cover many CLM aspects without becoming visually diffuse if it is organized around **reasoning families**, not topic cards.

The broad visual architecture should support:

1. orient to CLM work;
2. trace source -> interpretation -> requirement -> test;
3. inspect knowledge transformation and object provenance;
4. trace human / AI / authority boundaries;
5. compare versions and impact;
6. diagnose operating conditions;
7. inspect evidence and evaluation scope;
8. find and explore objects through search and typed relationships.

Source of wealth remains one representative vertical slice. It should not supply the nouns, geometry or navigation model for the whole product.

## Implementation consequence

The V22 prototype deliberately builds six different scenes from one visual grammar:

- Overview / work landscape;
- Develop CLM;
- Govern/change;
- Knowledge transformation;
- Operating conditions;
- Evidence & evaluation.

The next step after visual acceptance is not to add more prototype screens. It is to migrate the accepted composition grammar into the real V21 production components and re-run semantic, browser, responsive and reader tests.
