/* V21 runtime Design Lab: acceptance instrument inside the actual Hub runtime. */
(function(root){
  'use strict';
  const LAB_VIEW='design-system';
  const LAB_PATH='/design-system';
  function e(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function install(){
    const M=root.CLM_HUB_MODEL,V=root.CLM_HUB_VIEWS;
    if(!M||!V||root.__CLM_DESIGN_LAB_INSTALLED)return false;
    const parse=M.parseRoute.bind(M);
    M.parseRoute=function(hash){
      const raw=String(hash==null?'':hash).replace(/^#/,'');
      const at=raw.indexOf('?');
      const path=(at===-1?raw:raw.slice(0,at))||'/';
      if(path===LAB_PATH){
        const query=at===-1?'':raw.slice(at+1);
        return {view:LAB_VIEW,id:null,target:null,path:LAB_PATH,params:new URLSearchParams(query)};
      }
      return parse(hash);
    };
    const create=V.create.bind(V);
    V.create=function(deps){
      const base=create(deps),lab=createLab(deps),render=base.render.bind(base);
      return {...base,designLab:lab,render(){if(deps.state.route.view===LAB_VIEW){queueMicrotask(()=>lab.wireAudit());return lab.render();}return render();}};
    };
    root.__CLM_DESIGN_LAB_INSTALLED=true;
    return true;
  }

  function createLab({state,icon,button,link,objectLink,topicLink,sourceLink,X}){
    const D=root.CLM_HUB_DATA,M=root.CLM_HUB_MODEL;
    const status=(label,kind='information')=>`<span class="lab-chip lab-chip-${kind}">${e(label)}</span>`;
    const route=(href,label,meta='')=>`<a class="lab-route-link" href="${e(href)}"><span>${e(label)}</span>${meta?`<small>${e(meta)}</small>`:''}${icon('arrow')}</a>`;
    const falseInference=(a,b,why)=>`<article class="lab-stress-pair"><div><strong>${e(a)}</strong><span aria-hidden="true">≠</span><strong>${e(b)}</strong></div><p>${e(why)}</p></article>`;
    const gate=(name,stateLabel,kind,body)=>`<article class="lab-gate"><div><h3>${e(name)}</h3>${status(stateLabel,kind)}</div><p>${e(body)}</p></article>`;
    const conditionControls=()=>`<fieldset class="lab-condition-controls"><legend>Change the assumed operating conditions</legend><p>These controls use the same state and condition model as the Data & operation view. They do not grant permission or report current readiness.</p><div>${D.conditions.map(c=>`<label><input type="checkbox" data-condition="${e(c.id)}" ${state.flags[c.id]?'checked':''}><span><strong>${e(c.short||c.label||c.id)}</strong><small>${e(c.description||c.detail||'Scenario condition')}</small></span></label>`).join('')}</div></fieldset>`;
    const competency=[
      ['Work','What CLM work is actually being improved?','Orient with a work landscape before architecture.'],
      ['Meaning','Where did this meaning come from, and what is interpretation rather than source?','Use source alignment and typed lineage.'],
      ['Boundary','What may AI prepare versus what requires a human or authorised process?','Show the authority boundary locally, not as a generic footer.'],
      ['Evidence','What was observed, for which version and scope?','Use an evidence trace; do not turn a pointer into verification.'],
      ['Reuse','What selected artifact may inform another task?','Keep present-task acceptance separate from reuse scope.'],
      ['Conditions','What missing condition changes what is possible?','Interrupt the affected route rather than showing a passive warning.']
    ];
    const coverage=[
      ['Overview','#/','Orient to the whole Hub','Work landscape · transformation · condition preview','Run / Develop / Govern-change must all read as first-class.'],
      ['Run CLM','#/work/preparation','Trace a bounded preparation task','Task journey · source/observation pair','SOW is one specimen, not the Hub ontology.'],
      ['Develop CLM','#/work/development','Turn instruction into inspectable behaviour','Requirement anatomy · adverse-test trace','Development value does not require production AI.'],
      ['Govern / change','#/work/change?case=handoff','Understand change and impact','Version comparison · impact map','Old evidence remains pinned to old scope.'],
      ['Knowledge & methods','#/knowledge','Understand usable context','Knowledge transformation · skill anatomy','Structured does not mean executable.'],
      ['Data & operation','#/conditions','Understand what routes are possible','Condition route · authority boundary','Runtime, interface, access and release stay distinct.'],
      ['Search','#/topics','Find the right object without losing context','Typed discovery · contextual return','Search should reduce dependence on browsing 81 topic tabs.'],
      ['Source','#/source/strategy','Read the actual basis','Source reader · provenance','Source presence does not establish applicability.'],
      ['Relationships','#/relationships/REQ-01%401','Trace authored links','Bounded typed context','No force-directed graph or semantic inversion.'],
      ['Evidence','#/evidence/EVID-01%401','Inspect what is actually supported','Evaluation trace · version scope','Proposed tests and empty results are not observed passes.']
    ];
    const interactions=[
      ['Work domain','Changes context, AI verbs, output and review responsibility','Meaning changes, not merely colour.'],
      ['Knowledge stage','Changes the representation and what can be claimed','Readable → structured → consumed are different states.'],
      ['Operating condition','Blocks or enables only the affected route','Missing interface must not block supplied-document analysis.'],
      ['Relationship depth / view','Changes neighbourhood and projection','Direction and relationship wording remain stable.'],
      ['Object inspection','Moves from overview to identity, source, evidence and history','Return context and focus must remain recoverable.'],
      ['Version/change control','Changes impact candidates without rewriting history','Prior evidence must stay attached to the actual version.']
    ];
    const responsive=[
      ['Desktop','See context + relationship + consequence together','Full spatial composition with local annotations.'],
      ['Tablet','Preserve the selected reasoning path','Progressive panes; reduce simultaneous branches before reducing type.'],
      ['Mobile','Follow one ordered semantic sequence','Context → contribution → review → consequence. Never shrink a desktop diagram.']
    ];
    function liveWork(){return `<section class="lab-live-block"><div class="lab-live-heading"><div><p class="lab-kicker">Live specimen · actual component</p><h3>Work first, then context and assistance.</h3></div><p>Switch Run, Develop and Govern/change. The same production component must remain coherent across materially different CLM work.</p></div>${X.workIllustration()}</section>`;}
    function liveTransformation(){return `<section class="lab-live-block"><div class="lab-live-heading"><div><p class="lab-kicker">Live specimen · actual component</p><h3>Representation can change without changing authority.</h3></div><p>Inspect readable meaning, structured context and context actually consumed by a task.</p></div>${X.transformation(false)}${X.skillAnatomy()}</section>`;}
    function liveConditions(){return `<section class="lab-live-block"><div class="lab-live-heading"><div><p class="lab-kicker">Live specimen · same condition model</p><h3>A missing condition should alter the route.</h3></div><p>Use the switches below, then inspect the same route renderer used by the product.</p></div>${conditionControls()}${X.conditionRoutes(false)}</section>`;}
    function liveRelationships(){
      const depth=state.route.params.get('depth')==='2'?2:1;
      const mode=state.route.params.get('view')==='list'?'list':'map';
      return `<section class="lab-live-block"><div class="lab-live-heading"><div><p class="lab-kicker">Live specimen · typed model</p><h3>Bound the graph to the reader question.</h3></div><p>Change distance or representation. The authored relationship verb and direction must survive each projection.</p></div>${X.relationshipExplorer('REQ-01@1',depth,mode)}</section>`;
    }
    function liveEvidence(){return `<section class="lab-live-block"><div class="lab-live-heading"><div><p class="lab-kicker">Live specimen · evidence boundary</p><h3>Evidence answers a narrower question than “is this right?”</h3></div><p>This component should make result, implementation, version and limitation inspectable without manufacturing certainty.</p></div>${X.evaluationTrace('EVID-01@1')}</section>`;}
    function render(){
      return `<div class="design-lab"><header class="lab-intro"><div><p class="lab-kicker">Runtime Design Lab · builder-only</p><h1 id="page-title" tabindex="-1">Use the product to test the product.</h1><p class="lab-thesis">The Lab is not a style guide. It is an acceptance instrument for whether the Hub helps a reader reason correctly about CLM AI.</p></div><aside class="lab-contract"><strong>Design contract</strong><p>Project sources govern facts. Sensemaking & Explanation Architecture governs representation. The runtime is the visual-system source of truth.</p><div>${status('No factual authority','information')}${status('No production-status inference','review')}</div></aside></header>

      <section class="lab-section lab-purpose"><div class="lab-heading"><div><p class="lab-kicker">Reasoning contract</p><h2>Every important screen should make a decision-relevant question cheaper to answer.</h2></div><p>Visual sophistication is accepted only when it improves orientation, traceability, boundary recognition or verification. The Lab therefore starts with competency questions rather than components.</p></div><div class="lab-question-grid">${competency.map(([k,q,a])=>`<article><span>${e(k)}</span><h3>${e(q)}</h3><p>${e(a)}</p></article>`).join('')}</div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Semantic stress tests</p><h2>Keep distinctions that the interface is tempted to collapse.</h2></div><p>If any visual treatment makes the left side feel equivalent to the right, the representation is wrong even if it looks polished.</p></div><div class="lab-stress-grid">${[
        ['Source-linked','Verified','A pointer proves lineage, not factual verification.'],
        ['Reviewed','Approved','Review can address suitability without granting approval.'],
        ['Structured','Executable','A file or schema is not a runtime consumption contract.'],
        ['Runtime available','Interface available','Execution environment does not create system connectivity.'],
        ['Interface available','Permission granted','Technical reachability does not establish authorisation.'],
        ['Useful artifact','Reusable institutional context','Reuse needs applicability, ownership, maintenance and permitted consumption.']
      ].map(x=>falseInference(...x)).join('')}</div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Live runtime specimens</p><h2>Stress the real explanation components, not miniature imitations.</h2></div><p>These specimens use the same state, actions, objects and renderers as the reader-facing Hub. A failure here should be fixed in the shared product component rather than patched only inside the Lab.</p></div>${liveWork()}${liveTransformation()}${liveConditions()}${liveRelationships()}${liveEvidence()}</section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Cross-domain coverage</p><h2>Design quality has to survive beyond the Overview and beyond SOW.</h2></div><p>Each row names the reader question, its native representation and the failure mode to look for. Open the real surface rather than approving a pattern in isolation.</p></div><div class="lab-coverage-wrap"><table class="lab-coverage"><thead><tr><th>Area</th><th>Reasoning task</th><th>Representation</th><th>Stress condition</th><th>Open</th></tr></thead><tbody>${coverage.map(([area,href,q,rep,risk])=>`<tr><td><strong>${e(area)}</strong></td><td>${e(q)}</td><td>${e(rep)}</td><td>${e(risk)}</td><td>${route(href,'Inspect')}</td></tr>`).join('')}</tbody></table></div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Interaction contract</p><h2>An interaction is justified only when it changes understanding.</h2></div><p>Hover decoration is not interaction. The behaviours below should remain understandable with keyboard navigation, Back/Forward, reduced motion and without hidden hover-only meaning.</p></div><div class="lab-interaction-grid">${interactions.map(([a,b,c])=>`<article><span>${icon('sliders')}</span><div><h3>${e(a)}</h3><p>${e(b)}</p><small>${e(c)}</small></div></article>`).join('')}</div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Responsive re-projection</p><h2>Preserve semantics before preserving geometry.</h2></div><p>The same concept should not simply shrink. These three projections define what information remains simultaneous at each width.</p></div><div class="lab-responsive-grid">${responsive.map(([name,goal,body],i)=>`<article class="lab-device lab-device-${i}"><header><span>${e(name)}</span><small>${e(goal)}</small></header><div class="lab-device-flow"><span>Context</span><i>→</i><span>AI contribution</span><i>→</i><span>Review</span><i>→</i><span>Consequence</span></div><p>${e(body)}</p></article>`).join('')}</div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Falsification</p><h2>Try to prove the design is misleading.</h2></div><p>Passing source tests is necessary but insufficient. These are the failure hypotheses that should drive rendered QA and reader testing.</p></div><div class="lab-falsification-grid">${[
        ['Still a SOW website','Can a colleague understand Develop and Govern/change without translating everything from a wealth example?'],
        ['Two design systems','Do deep topic/source/object surfaces feel like the same product as the Overview?'],
        ['Card soup','Has a reasoning problem been forced into a bordered rectangle instead of its native representation?'],
        ['Visual theatre','Can the reader answer a competency question better because the graphic exists?'],
        ['Claim inflation','Has colour, depth or placement implied approval, maturity, verification or production status?'],
        ['Shrink-to-mobile','Does narrow layout preserve the semantic sequence rather than miniature desktop geometry?'],
        ['Utility takeover','Do notes, scoping, exports or controls compete with understanding and tracing CLM work?']
      ].map(([h,p])=>`<article><span>Disconfirm</span><h3>${e(h)}</h3><p>${e(p)}</p></article>`).join('')}</div></section>

      <section class="lab-section lab-audit" id="lab-audit"><div class="lab-heading"><div><p class="lab-kicker">Manual acceptance worksheet</p><h2>Record observations, not confidence.</h2></div><p>Manual observations only. No automatic browser testing, approval or persistence.</p></div><div class="lab-audit-toolbar"><label>Surface <select id="lab-audit-surface"><option>Overview</option><option>Run CLM</option><option>Develop CLM</option><option>Govern / change</option><option>Knowledge & methods</option><option>Data & operation</option><option>Search</option><option>Source</option><option>Relationships</option><option>Evidence</option></select></label><label>Viewport <select id="lab-audit-viewport"><option>1440 desktop</option><option>1280 laptop</option><option>768 tablet</option><option>390 mobile</option><option>320 mobile</option><option>200% zoom</option></select></label><button type="button" id="lab-audit-copy">Copy findings</button><button type="button" id="lab-audit-clear">Reset</button></div><div class="lab-audit-questions"><label>Composition <select data-lab-check="composition"><option value="unknown">Not tested</option><option value="pass">Observed pass</option><option value="fail">Observed failure</option></select></label><label>Semantic boundaries <select data-lab-check="semantics"><option value="unknown">Not tested</option><option value="pass">Observed pass</option><option value="fail">Observed failure</option></select></label><label>Keyboard / history <select data-lab-check="interaction"><option value="unknown">Not tested</option><option value="pass">Observed pass</option><option value="fail">Observed failure</option></select></label><label>Responsive <select data-lab-check="responsive"><option value="unknown">Not tested</option><option value="pass">Observed pass</option><option value="fail">Observed failure</option></select></label><label>Beyond SOW <select data-lab-check="transfer"><option value="unknown">Not tested</option><option value="pass">Observed pass</option><option value="fail">Observed failure</option></select></label></div><label class="lab-audit-notes">Evidence / reproduction steps<textarea id="lab-audit-notes" rows="4"></textarea></label><p id="lab-audit-result" role="status" aria-live="polite">Not tested.</p></section>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Promotion gates</p><h2>A pattern is not “done” because it exists.</h2></div><p>Keep source/model evidence, rendered-product evidence and reader-comprehension evidence separate. Unknown should remain unknown.</p></div><div class="lab-gates">${gate('Source & model integrity','Rerun required after change','information','Build, unit and structural checks verify identities, routes, links and semantic invariants. They do not verify composition.')}${gate('Rendered product','Not established here','review','Inspect actual desktop, tablet, mobile, 200% zoom, light/dark, keyboard, history and source-return behaviour.')}${gate('Reader comprehension','Not established here','missing','An unfamiliar colleague should explain work, source/interpretation, human authority, evidence scope, conditions and reuse without builder intervention.')}</div><div class="lab-invariant"><span>Promotion rule</span><p>Reuse a visual pattern across the Hub only when its semantics are stable, its interaction is testable, its responsive projection preserves meaning and it has not weakened source/evidence distinctions.</p></div></section>

      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Implementation invariants</p><h2>Keep the design system attached to the build.</h2></div><p>The runtime is the source of truth. Generated output should never become a second authored codebase.</p></div><div class="lab-implementation-grid"><article><code>src/</code><h3>Author here</h3><p>Components, explanation patterns, state language and CSS live in source.</p></article><article><code>docs/</code><h3>Generate, do not hand-edit</h3><p>The static Pages/standalone distribution is a build artifact.</p></article><article><code>reference boards</code><h3>Quality bar, not factual authority</h3><p>Use their composition grammar to solve new CLM reasoning problems.</p></article><article><code>SEA</code><h3>Method, not source of facts</h3><p>Choose representations from competency questions, states, boundaries and typed relationships.</p></article></div><div class="lab-actions">${link('#/','Return to the Overview',true)}${link('#/work/development','Stress Develop CLM')}${link('#/work/change?case=handoff','Stress Govern / change')}${link('#/conditions','Stress operating conditions')}</div></section>
    </div>`;
    }
    function wireAudit(){const el=document.querySelector('.design-lab');if(!el||el.dataset.auditWired)return;el.dataset.auditWired='true';const get=id=>el.querySelector('#'+id),checks=()=>[...el.querySelectorAll('[data-lab-check]')];const refresh=()=>{const v=checks().map(x=>x.value),fails=v.filter(x=>x==='fail').length,passes=v.filter(x=>x==='pass').length;get('lab-audit-result').textContent=fails?fails+' failure(s): not accepted.':passes===v.length?'All manually marked pass for this viewport; independent validation still required.':passes+' of '+v.length+' passed; acceptance incomplete.'};const reset=()=>{checks().forEach(x=>x.value='unknown');get('lab-audit-notes').value='';refresh()};el.addEventListener('change',ev=>{if(ev.target.matches('#lab-audit-surface,#lab-audit-viewport'))reset();else if(ev.target.matches('[data-lab-check]'))refresh()});get('lab-audit-clear').addEventListener('click',reset);get('lab-audit-copy').addEventListener('click',async()=>{const data={surface:get('lab-audit-surface').value,viewport:get('lab-audit-viewport').value,checks:Object.fromEntries(checks().map(x=>[x.dataset.labCheck,x.value])),notes:get('lab-audit-notes').value,kind:'manual observation only'};try{await navigator.clipboard.writeText(JSON.stringify(data,null,2));get('lab-audit-result').textContent='Findings copied; no approval recorded.'}catch{get('lab-audit-notes').value=JSON.stringify(data,null,2);get('lab-audit-notes').select();get('lab-audit-result').textContent='Clipboard blocked; findings selected in notes field.'}});refresh()}
    return {render,wireAudit};
  }

  root.CLM_HUB_DESIGN_LAB={install,create:createLab,view:LAB_VIEW,path:LAB_PATH};
  install();
})(typeof window!=='undefined'?window:globalThis);
