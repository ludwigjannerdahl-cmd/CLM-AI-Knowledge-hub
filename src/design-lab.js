(function(root){
  'use strict';
  function e(v){return String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function mini(kind){
    const n=(label,cls='')=>`<span class="lab-mini-node ${cls}">${e(label)}</span>`;
    const a='<span class="lab-mini-arrow" aria-hidden="true">→</span>';
    if(kind==='landscape')return `<div class="lab-mini-row">${n('Run CLM')}${n('Develop')}${n('Govern / change')}</div>`;
    if(kind==='transform')return `<div class="lab-mini-row">${n('Readable')}${a}${n('Structured')}${a}${n('Consumed','dark')}</div>`;
    if(kind==='journey')return `<div class="lab-mini-row">${n('Source')}${a}${n('Context')}${a}${n('Review')}</div>`;
    if(kind==='dossier')return `<div class="lab-mini-row">${n('Object ID','dark')}${n('Source + version')}${n('Evidence')}</div>`;
    if(kind==='relation')return `<div class="lab-mini-row">${n('Requirement')}${a}${n('informs')}${a}${n('Test')}</div>`;
    if(kind==='version')return `<div class="lab-mini-row">${n('v1')}${a}${n('v2 proposed','warn')}</div>`;
    if(kind==='impact')return `<div class="lab-mini-row">${n('Change','warn')}${a}${n('Req')}${n('Test')}</div>`;
    if(kind==='route')return `<div class="lab-mini-row">${n('Interface missing','warn')}${a}${n('Live retrieval blocked')}</div>`;
    if(kind==='boundary')return `<div class="lab-mini-row">${n('AI prepares')}${a}${n('Authorised action','dark')}</div>`;
    if(kind==='evidence')return `<div class="lab-mini-row">${n('Output')}${a}${n('Observation')}${a}${n('Review candidate')}</div>`;
    if(kind==='reader')return `<div class="lab-mini-row">${n('Source lines','dark')}${n('Interpretation')}${n('Related objects')}</div>`;
    return `<div class="lab-mini-row">${n('Search')}${a}${n('Preview')}${a}${n('Return')}</div>`;
  }
  function render(){
    const patterns=[
      ['Work landscape','Orient around recognisable CLM work','landscape'],
      ['Knowledge transformation','Show meaning changing representation without changing authority','transform'],
      ['Task journey','Trace one bounded piece of work from source to review','journey'],
      ['Object dossier','Inspect identity, scope, source, version and evidence','dossier'],
      ['Relationship context','Understand one typed link without graph spaghetti','relation'],
      ['Version comparison','See proposition-level change while preserving history','version'],
      ['Impact map','Show which linked objects become review candidates','impact'],
      ['Condition route','Show what a missing condition blocks','route'],
      ['Authority boundary','Separate assistance from consequential action','boundary'],
      ['Evidence trace','Show what was observed and what it supports','evidence'],
      ['Source reader','Read source material without losing provenance','reader'],
      ['Search + preview','Find and inspect without losing context','search']
    ];
    const coverage=[
      ['Overview','What is this Hub and how does AI fit into CLM work?','Work landscape + transformation + condition route'],
      ['Run CLM','How does context support a present task?','Task journey + source/observation pair'],
      ['Develop CLM','How does an instruction become behaviour and tests?','Requirement anatomy + adverse-test trace'],
      ['Govern / change','What changed and what might need review?','Version comparison + impact map'],
      ['Knowledge & methods','How does meaning become reusable without changing authority?','Transformation + skill anatomy'],
      ['Data & operation','Why is one route possible while another is blocked?','Condition route + authority boundary'],
      ['Search','How do I find the right object and return to my context?','Search + preview'],
      ['Source','What exactly does the source say and what is derived from it?','Source reader + provenance'],
      ['Object detail','What is this thing, where did it come from and what relates to it?','Dossier + relationship context'],
      ['Evidence','What was observed and what does it actually support?','Evidence trace + version scope']
    ];
    return `<div class="design-lab"><header class="lab-intro"><div><p class="lab-kicker">Runtime design lab · not in normal navigation</p><h1 id="page-title" tabindex="-1">Design the reasoning, then the screen.</h1></div><div><p class="lead">This route is the visual QA surface for the actual Hub runtime. It keeps semantic meaning, art direction and implementation together instead of maintaining a parallel mock-up system.</p><p class="lab-discreet">Reference boards set the quality bar. Project sources govern factual claims. Representation follows the reader question.</p></div></header>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Foundations</p><h2>Calm editorial surfaces with explicit semantic states.</h2></div><p>Deep green anchors identity and high-value boundaries. Ivory and white carry reading. Sage groups context. Amber and missing-state surfaces communicate review or absence without pretending that colour alone establishes meaning.</p></div><div class="lab-token-grid"><div class="lab-token" data-tone="forest"><strong>Pine / identity</strong><small>Header · authority boundary · selected focal object</small></div><div class="lab-token" data-tone="wash"><strong>Wash / context</strong><small>Background grouping · lower-consequence context</small></div><div class="lab-token" data-tone="sage"><strong>Sage / related context</strong><small>Structured support · selected reusable context</small></div><div class="lab-token" data-tone="amber"><strong>Amber / review</strong><small>Requires judgement · unresolved consumption condition</small></div></div></section>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">State language</p><h2>Do not collapse authority, review, availability and evidence.</h2></div><p>Each state answers a different question. A source can be authoritative while an implementation remains unknown. A result can be source-linked while verification remains absent.</p></div><div class="lab-state-grid"><div class="lab-state current"><b>Current</b><p>Established in the selected context. Still requires scope/version when material.</p></div><div class="lab-state proposed"><b>Proposed</b><p>Candidate target or revision. Not silently promoted to current.</p></div><div class="lab-state review"><b>Requires review</b><p>Human or controlled process must resolve the relevant question.</p></div><div class="lab-state missing"><b>Unavailable / unknown</b><p>Evidence, interface, owner or applicability is not supplied.</p></div></div></section>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Typed relationships</p><h2>Arrows carry propositions, not decoration.</h2></div><p>Direction and verb matter. The interface must not silently upgrade “informs” to “causes”, “source-linked” to “verified”, or “uses” to “owns”.</p></div><div class="lab-relations">${[['derived from','lineage / source basis'],['informs','provides context without determining outcome'],['constrains','limits acceptable behaviour'],['uses','consumes a source, method or object'],['produces','creates an output or candidate'],['verifies','supports a specific claim or behaviour']].map(([r,d])=>`<div class="lab-relation"><span class="edge"></span><div><strong>${e(r)}</strong><span>${e(d)}</span></div></div>`).join('')}</div></section>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Representation grammar</p><h2>One semantic core. Different projections for different reasoning tasks.</h2></div><p>The Hub should not become a card grid or a generic knowledge graph. Each pattern exists because it makes a particular reasoning operation easier.</p></div><div class="lab-pattern-grid">${patterns.map(([t,d,k])=>`<article class="lab-pattern"><h3>${e(t)}</h3><p>${e(d)}</p><div class="lab-mini">${mini(k)}</div></article>`).join('')}</div></section>
      <section class="lab-section"><div class="lab-heading"><div><p class="lab-kicker">Whole-product coverage</p><h2>Design quality must survive past the Overview.</h2></div><p>The table is an implementation coverage check, not product navigation. It makes it visible when a deep surface still falls back to the legacy documentation grammar.</p></div><table class="lab-coverage"><thead><tr><th>Area</th><th>Reader question</th><th>Native representation</th></tr></thead><tbody>${coverage.map(r=>`<tr>${r.map(c=>`<td>${e(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></section>
      <section class="lab-section"><div class="lab-invariant"><span>Invariant</span><p><strong>Model before metaphor.</strong> Graphics are accepted only when they make a reasoning relationship easier to understand. Visual depth groups information; it does not mean authority, maturity, approval or deployment.</p></div><div class="lab-qa">${[['Not a SOW website','Source of wealth remains one deep specimen. Develop, change, evidence and operating conditions require their own visual explanations.'],['Not two design systems','New explanation surfaces and inherited reading UI must converge on one token, typography, spacing and state language.'],['Not visual theatre','A sophisticated composition that cannot answer a competency question should be removed.']].map(([h,p])=>`<article><h3>${e(h)}</h3><p>${e(p)}</p></article>`).join('')}</div><p class="lab-note">Acceptance comes from browser-rendered comparison and reader comprehension. Existence of components or passing source tests does not establish visual quality.</p></section></div>`;
  }
  function isRoute(){return typeof location!=='undefined'&&location.hash.split('?')[0]==='#/design-system';}
  function mount(){if(!isRoute()||typeof document==='undefined')return false;const app=document.getElementById('app');if(!app)return false;app.innerHTML=render();document.title='Runtime Design Lab · CLM AI';document.querySelectorAll('.primary-nav a').forEach(a=>a.removeAttribute('aria-current'));requestAnimationFrame(()=>document.getElementById('page-title')?.focus({preventScroll:true}));return true;}
  root.CLM_HUB_DESIGN_LAB={render,mount};
  if(typeof document!=='undefined'){mount();addEventListener('hashchange',()=>mount());addEventListener('popstate',()=>mount());}
})(window);
