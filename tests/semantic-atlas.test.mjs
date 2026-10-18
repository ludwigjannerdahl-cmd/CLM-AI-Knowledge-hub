import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateSemanticSource} from '../scripts/validate-semantic.mjs';

const read=(p)=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const model=JSON.parse(read('src/semantic/knowledge-to-capability.json'));
const root={CLM_SEMANTIC_SOURCE:model};
vm.runInNewContext(read('src/semantic-atlas.js'),{window:root,globalThis:root});
const html=(perspectiveId='reuse',nodeId=null)=>root.CLM_SEMANTIC_ATLAS.render({perspectiveId,nodeId});
const plain=s=>s.replace(/<[^>]*>/g,' ').replace(/\s+/g,' ');

test('semantic model is qualified, typed, stable and has unique identities',()=>{
 const r=validateSemanticSource(model);
 assert.deepEqual(r,{ok:true,errors:[]});
 assert.equal(model.nodes.length,8);
 assert.equal(model.edges.length,10);
 assert.equal(new Set(model.nodes.map(n=>n.id)).size,8);
 assert.ok(model.status.includes('not_approved'));
});

test('model rejects unknown references, unqualified edges and attempted self-approval',()=>{
 const corrupt=structuredClone(model);
 corrupt.edges[0].to='nonexistent';
 corrupt.edges[1].type='automatically_approves';
 corrupt.edges[2].condition='';
 assert.equal(validateSemanticSource(corrupt).ok,false);
 const errors=validateSemanticSource(corrupt).errors.join(' | ');
 assert.match(errors,/known distinct concepts/);
 assert.match(errors,/controlled/);
 assert.match(errors,/qualifier/);
});

test('knowledge-to-capability illustration is derived from model identity, without hard-coded concept duplication',()=>{
 const result=html();
 for(const n of model.nodes){
   assert.ok(result.includes('data-value="'+n.id+'"'),n.id+' not navigable');
   assert.ok(result.includes(n.label.replace(/&/g,'&amp;')),n.id+' not visible');
 }
 for(const p of model.perspectives)assert.ok(result.includes('data-value="'+p.id+'"'));
 assert.equal((result.match(/class="atlas-node(?: is-focused| is-muted)*"/g)||[]).length,8);
 assert.ok(result.includes('not operational status'));
 assert.ok(result.includes('not indicate installed integrations'));
 assert.ok(result.includes('aria-labelledby="semantic-atlas-title"'));
 assert.ok(result.includes('aria-live="polite"'));
});

test('three perspectives change the key inference rather than only recolouring the graph',()=>{
 const descriptions=model.perspectives.map(p=>plain(html(p.id,p.focus)));
 for(const p of model.perspectives){assert.ok(descriptions.some(h=>h.includes(p.answer)));}
 assert.notEqual(model.perspectives[0].question,model.perspectives[1].question);
 assert.notEqual(model.perspectives[1].question,model.perspectives[2].question);
 assert.ok(html('bounded','data').includes('Missing evidence must stay unknown'));
 assert.ok(html('change','authority').includes('draft, a legal citation'));
});

test('five forms and four mapping representations are explanatory categories, not maturity stages',()=>{
 const overview=html();
 assert.equal(model.knowledge_forms.length,5);
 assert.equal(model.meaning_layers.length,4);
 assert.ok(overview.includes('not a mandatory linear processing chain'));
 const layers=root.CLM_SEMANTIC_ATLAS.layerStudy();
 for(const l of model.meaning_layers)assert.ok(layers.includes(l.label));
 assert.ok(layers.includes('not a claim about SEB implementation'));
});

test('semantic source has no unrestricted data transfer or approval claims',()=>{
 const total=JSON.stringify(model);
 for(const phrase of ['Shared domain semantics do not grant permission','AI output does not constitute a human decision','Unknown case evidence is unknown']){
   assert.ok(total.includes(phrase),phrase);
 }
 assert.ok(model.edges.find(e=>e.id==='data-capability').condition.includes('Access'));
 assert.ok(model.edges.find(e=>e.id==='trace-meaning').condition.includes('steward'));
});

test('CSS provides functional mobile and reduced-motion adaptations',()=>{
 const css=read('src/semantic-atlas.css');
 assert.match(css,/@media\(max-width:700px\)/);
 assert.match(css,/prefers-reduced-motion:reduce/);
 assert.match(css,/\.atlas-node:focus-visible/);
 assert.match(css,/\.atlas-lines\{display:none\}/);
});
