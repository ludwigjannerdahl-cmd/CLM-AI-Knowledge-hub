import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import vm from 'node:vm';
const root=new URL('../',import.meta.url),ctx={URLSearchParams};ctx.window=ctx;vm.createContext(ctx);
for(const name of ['data','source-texts','model','specimen-kernel','useful-fixture','useful-work'])vm.runInContext(readFileSync(new URL('docs/assets/'+name+'.js',root),'utf8'),ctx);
const U=ctx.CLM_USEFUL_WORK,K=ctx.CLM_SPECIMEN_KERNEL;
const fixture=JSON.parse(readFileSync(new URL('fixtures/useful-work.safe.json',root),'utf8'));
assert.equal(JSON.stringify(ctx.CLM_USEFUL_FIXTURE),JSON.stringify(fixture),'Build must contain the exact safe fixture');
const e=ctx.CLM_HUB_MODEL.escape,helpers={button:(label,action,id='',cls='')=>`<button class="${cls}" data-action="${action}" data-value="${e(id)}">${e(label)}</button>`,sourceLink:(id,label)=>`<a href="#/source/${id}">${label}</a>`,topicLink:(id,target,label)=>`<a href="#/topic/${id}/${target}">${label}</a>`,link:(url,label)=>`<a href="${url}">${label}</a>`};
let states=0,inspections=0;
for(const composition of ['a','b','c'])for(const country of ['SE','NO','missing'])for(const material of ['unknown','supplied','absent'])for(const view of ['', 'compiler','stop','envelope','assurance','contract']){
 const params=new URLSearchParams({composition,country,material,view}),state={route:{params}},v=U.create({...helpers,state}),html=v.render();
 assert.match(html,/<h1 id="page-title"/);assert.doesNotMatch(html,/undefined|\[object Object\]|<iframe|<script/);
 assert.match(html,/No write authority/);assert.match(html,/No observed result supplied/);assert.match(html,/No customer data · no AI execution/);
 const current=U.exportState(params);assert.equal(current.context.binding.length,0);assert.equal(current.task.jurisdiction,country==='missing'?'unresolved':country);
 for(const match of html.matchAll(/data-action="object" data-value="([^"]+)"/g))assert.ok(U.inspectable(match[1]),'Unresolved inspection '+match[1]);
 states++;
}
for(const id of Object.keys(U.objects)){const state={route:{params:new URLSearchParams('country=NO&material=unknown')}},html=U.create({...helpers,state}).inspection(id);assert.ok(html.includes(id));assert.match(html,/Authority for/);assert.match(html,/Not authority for/);assert.match(html,/Revalidate when/);assert.doesNotMatch(html,/undefined|\[object Object\]/);inspections++;}
const record={kind:'Source/template execution; not rendered or native browser evidence',specimen:fixture.id,fixtureSHA256:createHash('sha256').update(readFileSync(new URL('fixtures/useful-work.safe.json',root))).digest('hex'),states,inspections,bindingContextDefault:K.compile(fixture).binding,semanticValidationErrors:K.validate(fixture),browser:'Separate GitHub Actions browser report required; local browser unavailable',visualExcellence:'UNVERIFIED',informationalValue:'Implemented; reader-tested value UNVERIFIED',readerComprehension:'UNVERIFIED'};
writeFileSync(new URL('reports/V23_USEFUL_WORK_CHECK.json',root),JSON.stringify(record,null,2)+'\n');console.log(JSON.stringify(record,null,2));
