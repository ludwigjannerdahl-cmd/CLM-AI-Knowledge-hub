/* The Hub's semantic explorer: all concepts, relations and perspectives come from one validated JSON source. */
(function(root){
  'use strict';
  const esc=value=>String(value??'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
  const select=(model,id)=>model.nodes.find(n=>n.id===id);
  const relationship=(model,edge,node)=>{
    const other=select(model,edge.from===node.id?edge.to:edge.from);
    const direction=edge.from===node.id?'outgoing':'incoming';
    return '<li class="atlas-relation"><span class="atlas-relation-verb">'+esc(edge.type.replaceAll('_',' '))+'</span><span class="atlas-relation-target">'+esc(other.label)+'</span><span class="atlas-relation-direction">'+(direction==='incoming'?'← Informs this concept':'→ From this concept')+'</span><small>'+esc(edge.condition)+'</small></li>';
  };
  function svgEdges(model,perspective,focused){
    const active=new Set(perspective.highlight);
    const nodes=Object.fromEntries(model.nodes.map(n=>[n.id,n]));
    const shapes=model.edges.map((edge,i)=>{
      const a=nodes[edge.from],b=nodes[edge.to],ax=a.x*12,ay=a.y*6,bx=b.x*12,by=b.y*6;
      const horizontal=Math.abs(bx-ax)>80;
      const sign=bx>=ax?1:-1;
      // Connect the centres of labelled regions; the lines are directional relationship statements, not data traffic.
      const d=horizontal?'M '+ax+' '+ay+' C '+(ax+sign*65)+' '+ay+', '+(bx-sign*65)+' '+by+', '+bx+' '+by:
        'M '+ax+' '+ay+' C '+(ax-65)+' '+(ay+(by-ay)*.35)+', '+(bx+65)+' '+(by-(by-ay)*.35)+', '+bx+' '+by;
      const current=edge.from===focused||edge.to===focused;
      const inPerspective=active.has(edge.from)&&active.has(edge.to);
      const klass='atlas-edge'+(current&&inPerspective?' is-active':inPerspective?' is-present':' is-quiet');
      return '<path class="'+klass+'" d="'+d+'" marker-end="url(#atlas-arrow)" data-relation="'+esc(edge.id)+'"/>';
    }).join('');
    return '<svg class="atlas-lines" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="atlas-arrow" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><path d="M0 0 L7 3.5 L0 7" fill="none" stroke="#b9d8c8" stroke-width="1.2"/></marker></defs><circle cx="466" cy="295" r="190" class="atlas-orbit"/><circle cx="466" cy="295" r="260" class="atlas-orbit atlas-orbit-secondary"/><path d="M40 555 H1150" class="atlas-horizon"/>'+shapes+'</svg>';
  }
  function render({perspectiveId='reuse',nodeId=null,compact=false,objectLink=null,objects={}}={}){
    const model=root.CLM_SEMANTIC_SOURCE;
    if(!model||!model.nodes||!model.edges||!model.perspectives)throw Error('Canonical semantic source unavailable');
    const perspective=model.perspectives.find(p=>p.id===perspectiveId)||model.perspectives[0];
    const node=select(model,nodeId)||select(model,perspective.focus);
    const active=new Set(perspective.highlight);
    const adjacent=model.edges.filter(edge=>edge.from===node.id||edge.to===node.id);
    const tabs=model.perspectives.map(p=>'<button type="button" class="atlas-perspective'+(p.id===perspective.id?' selected':'')+'" data-action="semantic-perspective" data-value="'+esc(p.id)+'" aria-pressed="'+String(p.id===perspective.id)+'"><span>'+esc(p.number)+'</span>'+esc(p.label)+'</button>').join('');
    const nodes=model.nodes.map((n,i)=>'<button type="button" class="atlas-node'+(n.id===node.id?' is-focused':'')+(active.has(n.id)?'':' is-muted')+'" data-action="semantic-node" data-value="'+esc(n.id)+'" aria-pressed="'+String(n.id===node.id)+'" style="--atlas-x:'+n.x+'%;--atlas-y:'+n.y+'%" title="'+esc(n.question)+'"><span class="atlas-node-index">'+String(i+1).padStart(2,'0')+' / '+esc(n.zone)+'</span><span class="atlas-node-label">'+esc(n.label)+'</span><span class="atlas-node-dot" aria-hidden="true"></span></button>').join('');
    const related=adjacent.map(edge=>relationship(model,edge,node)).join('');
    const links=(node.links||[]).map(l=>'<a class="atlas-reading-link" href="'+esc(l.href)+'">'+esc(l.label)+' <span aria-hidden="true">↗</span></a>').join('');
    const examples=(node.hub_objects||[]).map(id=>{
      const item=objects[id];
      const action=typeof objectLink==='function'&&item?objectLink(id,'Inspect '+id):'<code>'+esc(id)+'</code>';
      return '<li><span class="atlas-object-status">'+esc(item?.status||'Illustrative Hub anchor')+'</span>'+action+'</li>';
    }).join('');
    const hubCrosswalk='<details class="atlas-hub-examples"><summary>Trace to '+(node.hub_objects||[]).length+' authored Hub '+((node.hub_objects||[]).length===1?'object':'objects')+'</summary>'+
      '<p>'+esc(node.hub_crosswalk_note||'Authored example only; not verified operational evidence.')+'</p><ul>'+examples+'</ul></details>';
    const detail='<aside class="atlas-inspector" aria-labelledby="atlas-detail-title" aria-live="polite">'+
      '<span class="atlas-detail-type">'+esc(node.type)+' / selected concept</span>'+
      '<h3 id="atlas-detail-title">'+esc(node.question)+'</h3>'+
      '<p class="atlas-detail-description">'+esc(node.description)+'</p>'+
      '<div class="atlas-detail-secondary"><span>Why this can scale</span><p>'+esc(node.reuse)+'</p></div>'+
      '<div class="atlas-detail-boundary"><span>What this does not establish</span><p>'+esc(node.boundary)+'</p></div>'+
      '<details class="atlas-links" '+(compact?'':'')+'><summary>Inspect '+adjacent.length+' typed relationships</summary><ul>'+related+'</ul></details>'+hubCrosswalk+
      '<div class="atlas-reading">'+links+'</div></aside>';
    const knowledge=model.knowledge_forms.map(f=>'<li><strong>'+esc(f.label)+'</strong><span>'+esc(f.description)+'</span></li>').join('');
    const formDetails='<details class="atlas-knowledge-forms"><summary><span>Underneath the diagram</span><strong>Five forms of institutional knowledge</strong><span class="atlas-detail-arrow">↗</span></summary><p class="atlas-forms-preface">These are complementary kinds of knowledge, not a mandatory linear processing chain.</p><ol>'+knowledge+'</ol></details>';
    const subhead=compact?'':'<div class="semantic-heading"><div><p class="eyebrow">The meaning behind the model</p><h2>Banking-aware AI begins<br>with banking knowledge.</h2></div><p>Models can reason over language. They still need trustworthy definitions, applicable instructions, permitted data and a bounded task. Explore the same system through three questions, without mistaking this illustrative architecture for a deployed SEB integration.</p></div>';
    return '<section class="semantic-atlas'+(compact?' semantic-atlas-compact':'')+'" id="semantic-atlas" aria-labelledby="semantic-atlas-title">'+subhead+
      '<div class="atlas-workbench"><div class="atlas-topline"><span class="atlas-topline-kicker">SYSTEM EXPLANATION / 01</span><span class="atlas-topline-status">Proposed explanatory model · not operational status</span></div>'+
      '<div class="atlas-top-copy"><h3 id="semantic-atlas-title">One shared meaning.<br><em>Many kinds of work.</em></h3><p>Choose a reasoning path, then select any concept to inspect its relationships and limits.</p></div>'+
      '<div class="atlas-perspectives" role="group" aria-label="Choose a CLM reasoning path">'+tabs+'</div>'+
      '<div class="atlas-focus-question"><span>THE QUESTION</span><strong>'+esc(perspective.question)+'</strong></div>'+
      '<div class="atlas-layout"><div class="atlas-map" role="group" aria-label="Explore the model concepts">'+svgEdges(model,perspective,node.id)+'<div class="atlas-node-layer">'+nodes+'</div><p class="atlas-map-caption">Lines mean typed conceptual relationships. They do not indicate installed integrations or actual data flows.</p></div>'+detail+'</div>'+
      '<div class="atlas-outcome"><span class="atlas-outcome-counter">0'+(model.perspectives.indexOf(perspective)+1)+' / INTERPRETATION</span><strong>'+esc(perspective.answer)+'</strong><p>'+esc(perspective.footnote)+'</p></div>'+
      formDetails+'</div>'+
      '<div class="semantic-continuation"><p>Go from this shared model to real questions: what should a CLM task do, what context can it use, and where does judgement remain human?</p><nav aria-label="Continue exploring CLM AI"><a href="#/knowledge">Understand domain knowledge <span aria-hidden="true">↗</span></a><a href="#/work/development">Follow a Fen-X requirement <span aria-hidden="true">↗</span></a><a href="#/work/change">Trace a change <span aria-hidden="true">↗</span></a></nav></div>'+
      '</section>';
  }
  function layerStudy(){
    const model=root.CLM_SEMANTIC_SOURCE;
    if(!model)throw Error('Canonical semantic source unavailable');
    const layers=model.meaning_layers.map((l,i)=>'<li><span>0'+(i+1)+'</span><strong>'+esc(l.label)+'</strong><p>'+esc(l.description)+'</p></li>').join('');
    return '<section class="semantic-layer-study" aria-labelledby="meaning-study-title"><div><p class="eyebrow">From fields to understood context</p><h2 id="meaning-study-title">Metadata records what exists.<br>Semantics say what it means.</h2><p>A field name, a domain concept and a system mapping are not the same object. Connecting these views gives AI context without promoting technical metadata into institutional authority.</p><a href="#/relationships">Inspect existing Hub object relationships ↗</a></div><ol>'+layers+'</ol><p class="meaning-study-note">Four complementary representation layers, not a claim about SEB implementation or a required sequence. Definitions need ownership, scope, provenance and review.</p></section>';
  }
  function competencyLab({fixtureId='unknown_rule',objectLink=null,objects={}}={}){
    const model=root.CLM_SEMANTIC_SOURCE;
    const engine=root.CLM_SEMANTIC_REASONING;
    if(!model?.competency_questions||!engine)throw Error('Canonical semantic competency source or evaluator unavailable');
    const fixture=model.reasoning_fixtures.find(f=>f.id===fixtureId)||model.reasoning_fixtures[0];
    const result=engine.assess(fixture.inputs);
    const questions=model.competency_questions.map((q,i)=>{
      const anchors=(q.hub_objects||[]).map(id=>{
        const actual=objects[id];
        const link=actual&&typeof objectLink==='function'?objectLink(id,'Inspect '+id):'<code>'+esc(id)+'</code>';
        return '<li><span class="semantic-q-source-state">'+esc(actual?.status||'Authored synthetic object')+'</span>'+link+'</li>';
      }).join('');
      const contracts=q.required_contracts.map(id=>'<code>'+esc(id)+'</code>').join(' ');
      return '<details class="semantic-question" name="semantic-questions" '+(i===0?'open':'')+'>'+
        '<summary><span class="semantic-question-index">'+String(i+1).padStart(2,'0')+'</span><strong>'+esc(q.question)+'</strong><span class="semantic-question-more" aria-hidden="true">+</span></summary>'+
        '<div class="semantic-question-body"><div class="semantic-q-answer"><span>What can the authored Hub answer?</span><p>'+esc(q.current_answer)+'</p></div>'+
        '<div class="semantic-q-explain"><div><span>Missing evidence</span><p>'+esc(q.why_not)+'</p></div><div><span>A dangerous inference</span><p>'+esc(q.negative_case)+'</p></div></div>'+
        '<div class="semantic-q-contract"><span>The record types a defensible answer would need</span><div>'+contracts+'</div></div>'+
        '<div class="semantic-q-anchors"><span>Inspect the underlying authored examples</span><ul>'+anchors+'</ul></div></div></details>';
    }).join('');
    const controls=model.reasoning_fixtures.map(f=>'<button type="button" data-action="semantic-fixture" data-value="'+esc(f.id)+'" aria-pressed="'+String(f.id===fixture.id)+'" class="semantic-fixture'+(f.id===fixture.id?' selected':'')+'">'+esc(f.label)+'</button>').join('');
    return '<section class="semantic-competency-lab" id="semantic-competency" aria-labelledby="semantic-competency-title"><header class="semantic-cq-header"><div><p class="eyebrow">When knowledge has to withstand scrutiny</p><h2 id="semantic-competency-title">Can the model answer<br>the consequential question?</h2></div><p>An ontology earns its place by exposing what we can and cannot conclude. Each question links back to existing Hub examples, missing proof and a counterexample. This is a candidate explanatory contract—not SEB production policy.</p></header>'+
      '<div class="semantic-cq-grid"><div class="semantic-cq-list">'+questions+'</div><aside class="semantic-cq-method"><p class="eyebrow">How to read the result</p><h3>Unknown is not no.<br>And it is not yes.</h3><p>A missing fact can remain unknown in a semantic model. Operational validation must still require the fields and permissions needed for action.</p>'+
      '<div><span>Reasoning model</span><strong>What the case means</strong></div><div><span>Validation</span><strong>What information must exist</strong></div><div><span>Execution</span><strong>What is permitted now</strong></div>'+
      '<p class="semantic-method-warning">These are different operations. Do not use a rule's applicability as a tool-access grant.</p></aside></div>'+
      '<div class="semantic-gate-lab"><div class="semantic-gate-header"><div><p class="eyebrow">Illustrative reasoning exercise</p><h3>What changes when<br>one condition is missing?</h3></div><p>Try seven hypothetical situations. This deterministic demonstration is not connected to any authorization service, identity, production data or SEB policy engine.</p></div>'+
      '<div class="semantic-fixtures" role="group" aria-label="Choose a hypothetical permission case">'+controls+'</div>'+
      '<div class="semantic-fixture-outcome" role="status" aria-live="polite"><span>'+esc(result.state==='eligible_in_example'?'Illustrative prerequisite set complete':'Illustrative operation blocked')+'</span><strong>'+esc(result.reason)+'</strong><p>'+esc(result.explanation)+'</p></div>'+
      '<p class="semantic-gate-footer">In this exercise, only a scoped, applicable, current, explicitly allowed case is eligible. A real system must separately enforce and record the permission check.</p></div></section>';
  }
  root.CLM_SEMANTIC_ATLAS={render,layerStudy,competencyLab};
})(typeof window!=='undefined'?window:globalThis);
