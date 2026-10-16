/* A minimal controller host, not a DOM emulator or rendered/browser evidence. */
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

function host(hash){
  let current=new URL('https://example.test/CLM-AI-Knowledge-hub/'+hash),historyState=null,cursor=0;
  const entries=[{url:current.href,state:null}];
  const handlers={},frames=[],elements=new Map(),focus=[],scroll=[],saved=new Map();
  const cls={remove(){},contains(){return false;},toggle(){return false;}};
  const element=id=>({id,tagName:'DIV',dataset:{},classList:cls,open:false,innerHTML:'',textContent:'',parentElement:null,
    focus(){document.activeElement=this;focus.push(this.id);},scrollIntoView(){scroll.push(this.id);},
    setAttribute(){},getAttribute(){return null;},querySelectorAll(){return [];},querySelector(s){return s==='button'||s==='h2'?element(id+'-'+s):null;},addEventListener(){},close(){this.open=false;},showModal(){this.open=true;}});
  for(const id of ['app','main','dialog','live-message'])elements.set(id,element(id));
  const app=elements.get('app'),dialog=elements.get('dialog'),theme=element('theme'),menu=element('menu');
  for(const container of [app,dialog]){let html='';Object.defineProperty(container,'innerHTML',{get(){return html;},set(value){html=value;for(const key of elements.keys())if(!['app','main','dialog','live-message'].includes(key))elements.delete(key);}});}
  const document={title:'',body:{classList:cls},documentElement:{dataset:{}},activeElement:null,
    getElementById(id){
      if(elements.has(id))return elements.get(id);
      if(!app.innerHTML.includes('id="'+id+'"')&&!dialog.innerHTML.includes('id="'+id+'"'))return null;
      const n=element(id);n.parentElement=app;
      if(id==='page-title')n.textContent=app.innerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'')||'';
      elements.set(id,n);return n;
    },
    querySelector(s){return s.includes('theme')?theme:s.includes('menu')?menu:null;},querySelectorAll(){return [];},
    addEventListener(type,fn){handlers[type]=fn;}
  };
  const history={scrollRestoration:'auto',get state(){return historyState;},replaceState(s,_,url){historyState=structuredClone(s);current=new URL(url,current);entries[cursor]={url:current.href,state:historyState};},pushState(s,_,url){historyState=structuredClone(s);current=new URL(url,current);entries.splice(cursor+1);entries.push({url:current.href,state:historyState});cursor++;},go(delta){const next=cursor+delta;if(next<0||next>=entries.length)return;cursor=next;current=new URL(entries[cursor].url);historyState=structuredClone(entries[cursor].state);handlers.popstate?.();}};
  const ctx={URL,URLSearchParams,Date,console,document,history,crypto:{randomUUID:()=> 'host-check'},location:{get hash(){return current.hash;},get href(){return current.href;}},localStorage:{getItem(k){return saved.get(k)??null;},setItem(k,v){saved.set(k,v);}},matchMedia:()=>({matches:false,addEventListener(){}}),requestAnimationFrame:fn=>frames.push(fn),scrollTo:(_,y)=>{ctx.scrollY=y;},scrollY:0,setTimeout:()=>{},navigator:{},addEventListener:(type,fn)=>{handlers[type]=fn;}};
  ctx.window=ctx;vm.createContext(ctx);
  for(const f of ['data','explanation-data','scoping','model'])vm.runInContext(readFileSync(new URL('../src/'+f+'.js',import.meta.url),'utf8'),ctx);
  const chapters=JSON.parse(readFileSync(new URL('../src/chapters.json',import.meta.url),'utf8'));chapters.portfolio={};ctx.CLM_HUB_CHAPTERS=chapters;
  ctx.CLM_SOURCE_TEXTS={strategy:['First page\nSource meaning','Second page\nApplicability','Third page\nBoundaries']};
  ctx.CLM_USEFUL_FIXTURE=JSON.parse(readFileSync(new URL('../fixtures/useful-work.safe.json',import.meta.url),'utf8'));
  for(const f of ['explanations','views','specimen-kernel','useful-work','app'])vm.runInContext(readFileSync(new URL('../src/'+f+'.js',import.meta.url),'utf8'),ctx);
  function flush(){while(frames.length)frames.shift()();}
  flush();
  return {app,dialog,focus,scroll,history,handlers,flush,document,ctx,async link(href){await handlers.click({preventDefault(){},target:{closest:s=>s==='a'?{getAttribute:()=>href}:null}});flush();},async action(action,value=''){const b={dataset:{action,value}};await handlers.click({target:{closest:s=>s==='[data-action]'?b:null}});flush();}};
}

test('A direct topic-heading route keeps focus on that heading in the controller host',()=>{
  const corpus=JSON.parse(readFileSync(new URL('../src/chapters.json',import.meta.url),'utf8'));
  const c=corpus.chapters.find(c=>c.id==='sec-intelmodel'),h=c.headings.find(h=>h.tabs.length);
  const env=host('#/topic/'+c.id+'/'+h.id);
  assert.equal(env.focus.at(-1),'native-'+h.id);
  assert.equal(env.scroll.at(-1),'native-'+h.id);
  assert.equal(env.history.scrollRestoration,'manual');
});
test('The real scoping template transitions from unresolved to an advisory result in the controller host',async()=>{
  const env=host('#/scope');assert.match(env.app.innerHTML,/Describe the actual task/);
  env.handlers.submit({target:{id:'scope-form'},preventDefault(){}});env.flush();
  assert.match(env.app.innerHTML,/Incomplete scope/);assert.doesNotMatch(env.app.innerHTML,/Record advisory amendment/);
  await env.action('scope-example');
  env.handlers.submit({target:{id:'scope-form'},preventDefault(){}});env.flush();
  assert.match(env.app.innerHTML,/Process preparation or automation/);
  assert.match(env.app.innerHTML,/Export review brief/);
  assert.match(env.app.innerHTML,/Record advisory amendment/);
  assert.doesNotMatch(env.app.innerHTML,/Incomplete scope/);
});
test('Changing a work step retains the independent case in the controller URL',async()=>{const env=host('#/work/change?case=handoff');await env.action('work-step','impact');assert.match(env.ctx.location.hash,/case=handoff/);assert.match(env.ctx.location.hash,/step=impact/);assert.match(env.app.innerHTML,/CHG-INS/);assert.doesNotMatch(env.app.innerHTML,/Introduce version 2/);});
test('Overview selections reveal distinct work and literal context specimens',async()=>{const env=host('#/');assert.match(env.app.innerHTML,/Onboarding/);await env.action('work-domain','develop');assert.match(env.app.innerHTML,/A requirement with acceptance logic/);await env.action('knowledge-stage','structured');assert.match(env.app.innerHTML,/individualSourceOfWealth/);assert.match(env.app.innerHTML,/current lookup unresolved/);});
test('Unknown work, meaning and change identities do not silently select another case',()=>{for(const hash of ['#/work/missing','#/knowledge/missing','#/work/change?case=missing','#examples/missing'])assert.match(host(hash).app.innerHTML,/Page not found/);});

test('Source reading returns across several source pages to the exact task and scroll',async()=>{
  const env=host('#/work/preparation?step=context');
  await env.action('subject','party');env.ctx.scrollY=640;
  await env.link('#/source/strategy?page=0');
  await env.link('#/source/strategy?page=1&line=2');
  await env.link('#/source/strategy?page=2');
  assert.equal(env.history.state.sourceReturn.hash,'#/work/preparation?step=context');
  assert.equal(env.history.state.sourceReturn.position,0);
  await env.action('return');
  assert.equal(env.ctx.location.hash,'#/work/preparation?step=context');
  assert.match(env.app.innerHTML,/A statement about the client cannot simply be written into this subject/);
  assert.equal(env.ctx.scrollY,640);
  env.history.go(1);env.flush();
  assert.equal(env.ctx.location.hash,'#/source/strategy?page=0');
});
test('Closing linked objects walks back through the inspected context',async()=>{
  const env=host('#/work/development?step=requirement');
  await env.action('object','REQ-01@1');
  await env.action('object','INS-01@1');
  assert.match(env.ctx.location.hash,/object=INS-01%401/);
  await env.action('close');
  assert.match(env.ctx.location.hash,/object=REQ-01%401/);
  assert.match(env.dialog.innerHTML,/Preserve absent information as absent/);
  await env.action('close');
  assert.equal(env.ctx.location.hash,'#/work/development?step=requirement');
  assert.equal(env.dialog.open,false);
});
test('A source excursion retains the object panel and its scroll',async()=>{
  const env=host('#/work/development');
  await env.action('object','REQ-01@1');
  await env.action('inspector-tab','relationships');
  env.dialog.scrollTop=175;
  await env.link('#/source/strategy?page=0');
  await env.link('#/source/strategy?page=2');
  await env.action('return');
  assert.match(env.ctx.location.hash,/panel=relationships/);
  assert.equal(env.dialog.open,true);assert.equal(env.dialog.scrollTop,175);
  assert.match(env.dialog.innerHTML,/Typed relationships/);
});
test('Closing an object found by search restores its query',async()=>{
  const env=host('#/');await env.action('search');
  env.document.getElementById('search-input').value='source of wealth';
  await env.action('object','OBS-01@1');await env.action('close');
  assert.equal(env.document.getElementById('search-input').value,'source of wealth');
  assert.equal(env.dialog.open,true);
  assert.match(env.dialog.innerHTML,/Search & discovery/);
});
test('Shared overview links restore both selection and the matching starting task',async()=>{
  const env=host('#/?domain=develop&representation=structured');
  assert.match(env.app.innerHTML,/Follow a FenX requirement/);
  assert.match(env.app.innerHTML,/INS-01@1 \+ reported FenX context/);
  await env.action('work-domain','change');
  assert.match(env.ctx.location.hash,/domain=change/);
  assert.match(env.app.innerHTML,/Follow an instruction change/);
  assert.match(env.app.innerHTML,/href="#\/work\/change\?case=handoff"/);
  env.history.go(-1);env.flush();assert.match(env.app.innerHTML,/Follow a FenX requirement/);
});
test('Next-step control keeps the change case and focuses the actual explanation',async()=>{
  const env=host('#/work/change?case=handoff');
  await env.action('work-continue','impact');
  assert.match(env.ctx.location.hash,/case=handoff/);
  assert.match(env.ctx.location.hash,/step=impact/);
  assert.equal(env.focus.at(-1),'task-stage');
  assert.equal(env.scroll.at(-1),'task-stage');
  assert.match(env.app.innerHTML,/synthetic onboarding-handoff case/);
  assert.doesNotMatch(env.app.innerHTML,/synthetic date revision above/);
});
test('Out-of-range source locations resolve to a real passage and focus target',()=>{
  const env=host('#/source/strategy?page=999&line=999');
  assert.equal(env.focus.at(-1),'source-line-2-2');
  assert.equal(env.scroll.at(-1),'source-line-2-2');
});
test('Back to an unparameterised overview restores its original selection',async()=>{
  const env=host('#/');await env.action('work-domain','develop');
  assert.match(env.app.innerHTML,/Follow a FenX requirement/);
  env.history.go(-1);env.flush();
  assert.match(env.app.innerHTML,/Follow a KYC preparation/);
  assert.doesNotMatch(env.app.innerHTML,/Follow a FenX requirement/);
});
test('All representation choices preserve one instruction rather than switching examples',async()=>{
  const env=host('#/knowledge');
  for(const stage of ['human','structured','consumed']){
    await env.action('knowledge-stage',stage);
    const inspection=env.app.innerHTML.split('id="transformation-inspection"')[1].split('</section>')[0];
    assert.match(inspection,/INS-01@1/);
    assert.doesNotMatch(inspection,/CHG-SOURCE|onboarding handoff/i);
  }
  assert.match(env.app.innerHTML,/Amount, corroboration, source date and categorical lookup/);
});
test('Scroll snapshots support Back and Forward without a link click',async()=>{
  const env=host('#/');await env.link('#/work/preparation?step=output');
  env.ctx.scrollY=720;env.handlers.scroll();env.flush();
  env.history.go(-1);env.flush();env.history.go(1);env.flush();
  assert.equal(env.ctx.scrollY,720);
  assert.match(env.ctx.location.hash,/step=output/);
});

test('Requirement workbench retains separate source, requirement and unobserved test status',()=>{
  const env=host('#/work/development?step=requirement');
  assert.match(env.app.innerHTML,/provenance-workbench/);
  for(const id of ['INS-01@1','REQ-01@1','TEST-01@1'])assert.ok(env.app.innerHTML.includes(id));
  assert.match(env.app.innerHTML,/Proposed test · no observed pass/);
  assert.match(env.app.innerHTML,/production feature may be deterministic/);
});
test('Handoff evidence ledger keeps the historical scope and never inherits preparation evidence',()=>{
  const env=host('#/evidence/CHG-EVID%401');
  assert.match(env.app.innerHTML,/CHG-INS@1/);
  assert.match(env.app.innerHTML,/does not verify/);
  assert.match(env.app.innerHTML,/CHG-INS@2/);
  assert.doesNotMatch(env.app.innerHTML,/EVID-01@1|TEST-01@1/);
  assert.match(env.app.innerHTML,/No observed pass/);
});
test('Object provenance names source authority beside meaning without assigning a missing owner',async()=>{
  const env=host('#/work/development');await env.action('object','REQ-01@1');
  assert.match(env.dialog.innerHTML,/dossier-provenance/);
  assert.match(env.dialog.innerHTML,/Not supplied for this object/);
  assert.match(env.dialog.innerHTML,/Source linkage lets you inspect the basis/);
  assert.match(env.dialog.innerHTML,/not an approved FenX change/);
});

// Controller-host assertions below are deliberately not described as native browser QA.
test('Useful Work controls retain assumptions, inspection and return position',async()=>{
 const env=host('#/useful-work?composition=b');
 assert.match(env.app.innerHTML,/Source of wealth & funds/);
 await env.action('uw-country','NO');await env.action('uw-material','supplied');
 await env.action('uw-view','compiler');assert.match(env.ctx.location.hash,/country=NO/);assert.match(env.ctx.location.hash,/material=supplied/);
 assert.match(env.app.innerHTML,/Withheld · draft/);assert.equal(env.focus.at(-1),'uw-detail');
 env.ctx.scrollY=840;await env.action('object','UW-SCOPE-NO@1');assert.match(env.dialog.innerHTML,/APPLIES/);
 await env.link('#/source/useful-work-source?page=0&line=3');assert.equal(env.focus.at(-1),'source-line-0-3');
 await env.action('return');assert.match(env.ctx.location.hash,/object=UW-SCOPE-NO/);assert.equal(env.dialog.open,true);
 await env.action('close');assert.match(env.ctx.location.hash,/view=compiler/);assert.equal(env.ctx.scrollY,840);
});
test('Missing jurisdiction changes applicability to unresolved without silently excluding it',async()=>{
 const env=host('#/useful-work?view=compiler');await env.action('uw-country','missing');assert.match(env.app.innerHTML,/jurisdiction is not supplied/);
 await env.action('object','UW-SCOPE-NO@1');assert.match(env.dialog.innerHTML,/UNRESOLVED/);await env.action('close');
 env.history.go(-1);env.flush();assert.equal(env.ctx.location.hash,'#/useful-work?view=compiler');
});
test('Three integrated compositions are structurally distinct and preserve concrete objects',async()=>{
 const env=host('#/useful-work');for(const c of ['a','b','c']){await env.action('uw-composition',c);const h=env.app.innerHTML;assert.match(h,new RegExp('uw-composition-'+c));assert.match(h,/UW-REQ@1/);assert.match(h,/No observed result supplied/);assert.match(h,/No write authority/);if(c==='a')assert.match(h,/uw-central/);if(c==='b')assert.match(h,/uw-folio-main/);if(c==='c')assert.match(h,/uw-ledger-layout/);}
});
test('Deep-linked new objects render exact identity and authority without old dossier assumptions',()=>{
 for(const id of ['UW-TASK@1','UW-FIELD@1','UW-TEST@1','UW-EVIDENCE@1','UW-OUTPUT@1']){const env=host('#/useful-work?object='+encodeURIComponent(id));assert.ok(env.dialog.open);assert.ok(env.dialog.innerHTML.includes(id));assert.match(env.dialog.innerHTML,/Not authority for/);assert.doesNotMatch(env.dialog.innerHTML,/undefined|\[object Object\]/);}
});
test('Country changes propagate into inspected and exported Task Contracts',async()=>{
 const env=host('#/useful-work');await env.action('uw-country','NO');await env.action('object','UW-TASK@1');
 assert.match(env.dialog.innerHTML,/<dt>jurisdiction<\/dt><dd>NO<\/dd>/);
 const result=env.ctx.CLM_USEFUL_WORK.exportState(new URLSearchParams('country=NO&material=supplied'));
 assert.equal(result.task.jurisdiction,'NO');assert.equal(result.facts.jurisdiction,'NO');assert.equal(result.context.binding.length,0);
});
test('An invalid country deep link remains unknown, never silently Sweden',()=>{
 const env=host('#/useful-work?country=BOGUS&view=compiler');assert.match(env.app.innerHTML,/jurisdiction unknown/);assert.match(env.app.innerHTML,/jurisdiction is not supplied/);
});
test('Malicious source text is escaped in the actual integrated view',()=>{
 const env=host('#/useful-work');env.ctx.CLM_USEFUL_WORK.objects['UW-SOURCE@1'].lines[0][1]='<img src=x onerror=alert(1)>';
 const v=env.ctx.CLM_USEFUL_WORK.create({state:{route:{params:new URLSearchParams()}},button:()=>'',sourceLink:()=>'',topicLink:()=>'',link:()=>''}).render();
 assert.match(v,/&lt;img/);assert.doesNotMatch(v,/<img src=x/);
});
test('Object export carries the same selected facts and task contract as inspection',()=>{
 const env=host('#/useful-work?country=NO&material=absent');
 const x=env.ctx.CLM_USEFUL_WORK.exportObject('UW-TASK@1',new URLSearchParams('country=NO&material=absent'));
 assert.equal(x.contract.jurisdiction,'NO');assert.equal(x.inspectionContext.facts.supportSupplied,false);
 const r=env.ctx.CLM_USEFUL_WORK.exportObject('UW-SCOPE-SE@1',new URLSearchParams('country=NO'));
 assert.equal(r.inspectionContext.applicability.state,'EXCLUDED');assert.equal(r.inspectionContext.binding,false);
});
test('Source reader exposes the new proposal as authored context in the same Hub',()=>{
 const env=host('#/source/useful-work-source');assert.match(env.app.innerHTML,/UW-OUTPUT@1/);assert.match(env.app.innerHTML,/There is no underlying customer document/);assert.doesNotMatch(env.app.innerHTML,/No object-level use is recorded/);
});
test('Search-result inspection retains Norway and restores the search query',async()=>{
 const env=host('#/useful-work?country=NO&material=supplied');await env.action('search');env.document.getElementById('search-input').value='UW-REQ';
 env.handlers.input({target:{id:'search-input'}});assert.match(env.document.getElementById('search-results').innerHTML,/data-action="object" data-value="UW-REQ@1"/);
 await env.action('object','UW-REQ@1');assert.match(env.ctx.location.hash,/country=NO/);await env.action('close');assert.equal(env.document.getElementById('search-input').value,'UW-REQ');assert.match(env.ctx.location.hash,/material=supplied/);
});
