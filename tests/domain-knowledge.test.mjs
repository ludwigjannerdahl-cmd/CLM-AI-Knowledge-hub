import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const data=readFileSync(new URL('../src/data.js',import.meta.url),'utf8');
const explanation=readFileSync(new URL('../src/explanation-data.js',import.meta.url),'utf8');
const view=readFileSync(new URL('../src/views.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/visual-ambition.css',import.meta.url),'utf8');
const root={};
vm.runInNewContext(data,{window:root,globalThis:root});
vm.runInNewContext(explanation,{window:root,globalThis:root});
root.CLM_SEMANTIC_SOURCE=JSON.parse(readFileSync(new URL('../src/semantic/knowledge-to-capability.json',import.meta.url),'utf8'));
vm.runInNewContext(readFileSync(new URL('../src/semantic-atlas.js',import.meta.url),'utf8'),{window:root,globalThis:root});
vm.runInNewContext(view,{window:root,globalThis:root});
const specimen=root.CLM_HUB_DATA.domainKnowledgeCase;
const escape=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
function render(route='overview'){ if(!root.CLM_HUB_CHAPTERS)root.CLM_HUB_CHAPTERS={chapters:[]};
 const deps={
   state:{workDomain:'run',semanticPerspective:'reuse',semanticNode:'meaning',route:{view:route,id:''}},
   icon:()=>'<svg></svg>',button:()=>'<button>Search</button>',
   link:(href,label)=>'<a href="'+href+'">'+label+'</a>',
   objectLink:(id,label)=>'<button data-object="'+id+'">'+label+'</button>',
   topicLink:(c,t,label)=>'<a href="#/topic/'+c+'/'+t+'">'+label+'</a>',
   sourceLink:(id,label)=>'<a href="#/source/'+id+'">'+label+'</a>',
   scopeView:()=>'',X:{workIllustration:()=>'<figure>Existing hero art</figure>',transformation:()=>'<figure>Existing transformation art</figure>',conditionRoutes:()=>'<figure>Existing condition routes</figure>',skillAnatomy:()=>'<div>Existing skill anatomy</div>'}
 };
 root.CLM_HUB_MODEL={escape,routeForTopic:()=>''};
 root.CLM_HUB_CHAPTERS={chapters:[]};
 return root.CLM_HUB_VIEWS.create(deps).render();
}
test('canonical specimen models six distinct epistemic boundaries',()=>{
 assert.equal(specimen.status,'illustrative_only');
 assert.deepEqual(Array.from(specimen.stages,x=>x.id),['report','meaning','authority','context','assist','decision']);
 assert.equal(new Set(specimen.stages.map(x=>x.kind)).size,6);
 for(const x of specimen.stages){
   assert.ok(x.risk&&x.output&&x.needs.length>=3&&x.concepts.length>=4&&x.reuse);
 }
});
test('website preserves existing work and adds navigable progressive disclosure',()=>{
 const home=render('overview');
 const html=render('knowledge');
 assert.ok(home.includes('Existing hero art'));
 assert.ok(home.includes('Existing transformation art'));
 assert.ok(home.includes('See what feeds what'));
 assert.ok(home.includes('id="semantic-atlas"'));
 assert.ok(!home.includes('class="domain-stage"'),'Long scenario belongs under Knowledge, not the overview');
 assert.ok(html.includes('A relationship changes.'));
 assert.equal((html.match(/class="domain-stage"/g)||[]).length,6);
 assert.equal((html.match(/name="domain-knowledge-stage"/g)||[]).length,6);
 for(const route of ['#/work/preparation','#/work/development','#/work/change'])assert.ok(html.includes('href="'+route+'"'));
 assert.ok(html.includes('aria-labelledby="domain-knowledge-title"'));
});
test('specimen does not silently upgrade evidence, applicability or permission',()=>{
 const html=render('knowledge');
 for(const phrase of ['not yet a verified customer record','not itself an approved bank rule','does not prove access','not a bank decision','An unexecuted test is not evidence','without automatically transferring data'])
  assert.ok(html.includes(phrase),phrase);
 assert.ok(html.includes('No real customer data'));
 assert.ok(html.includes('not evidence of a deployed SEB ontology'));
});
test('mobile and reduced-motion styles are explicitly supported',()=>{
 assert.ok(css.includes('.domain-knowledge'));
 assert.ok(css.includes('@media(max-width:720px)'));
 assert.ok(css.includes('prefers-reduced-motion:reduce'));
});
