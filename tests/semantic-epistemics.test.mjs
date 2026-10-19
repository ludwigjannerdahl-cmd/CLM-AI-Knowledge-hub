import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
import {validateSemanticSource} from '../scripts/validate-semantic.mjs';

const read=p=>readFileSync(new URL('../'+p,import.meta.url),'utf8');
const model=JSON.parse(read('src/semantic/knowledge-to-capability.json'));
const root={CLM_SEMANTIC_SOURCE:model};
vm.runInNewContext(read('src/data.js'),{window:root,globalThis:root});
vm.runInNewContext(read('src/semantic-reasoning.js'),{window:root,globalThis:root});
vm.runInNewContext(read('src/semantic-atlas.js'),{window:root,globalThis:root});
const objects=root.CLM_HUB_DATA.objects;
const reason=root.CLM_SEMANTIC_REASONING;

test('expanded ontology validates against actual authored Hub objects',()=>{
 const result=validateSemanticSource(model,{objects});
 assert.deepEqual(result,{ok:true,errors:[]});
 assert.equal(model.schema_version,'0.3');
 assert.equal(model.ontology_contract.status,'candidate_schema_not_approved');
 assert.equal(model.record_contracts.length,14);
 assert.equal(model.competency_questions.length,7);
});

test('schema class and status cannot silently be upgraded to institutional approval',()=>{
 let bad=structuredClone(model);bad.record_contracts[0].status='bank_approved';
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(e=>e.includes('institutional schema')));
 bad=structuredClone(model);bad.ontology_contract.axes.permission=['allow','deny'];
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(e=>e.includes('permission')));
 bad=structuredClone(model);bad.edges[0].assertion_level='operational_fact';
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(e=>e.includes('logically entailing')));
});

test('all competency questions have typed prerequisite records and inspectable Hub anchors',()=>{
 const records=new Set(model.record_contracts.map(x=>x.id));
 for(const q of model.competency_questions){
   assert.ok(q.required_contracts.every(x=>records.has(x)),q.id);
   assert.ok(q.hub_objects.every(x=>objects[x]),q.id);
   assert.ok(q.current_answer&&q.why_not&&q.negative_case,q.id);
 }
 const html=root.CLM_SEMANTIC_ATLAS.competencyLab({objects,objectLink:id=>'<button data-action="object" data-value="'+id+'">'+id+'</button>'});
 for(const q of model.competency_questions)assert.ok(html.includes(q.question),q.id);
 assert.equal((html.match(/class="semantic-question"/g)||[]).length,7);
 assert.ok(html.includes('data-action="object"'));
 assert.ok(html.includes('data-action="semantic-fixture"'));
 assert.ok(html.includes('What can the authored Hub answer?'));
 assert.ok(html.includes('not connected to any authorization service'));
});

test('simulated permission gate differentiates unknown, denial, wrong scope, expiry and conditional eligibility',()=>{
 for(const fixture of model.reasoning_fixtures){
   const result=reason.assess(fixture.inputs);
   assert.equal(result.state,fixture.expected,fixture.id);
   assert.equal(result.reason,fixture.reason,fixture.id);
 }
 const badInputs={applicability:'unknown',permission:'unknown',purpose_match:false,subject_match:false,grant_current:false};
 assert.equal(reason.assess(badInputs).state,'blocked');
 assert.equal(reason.assess({...badInputs,applicability:'invalid'}).state,'invalid');
 assert.equal(reason.assess({...badInputs,permission:'invalid'}).state,'invalid');
 assert.equal(reason.assess(null).state,'invalid');
});

test('planned tests do not become observed passing tests without actual run reference',()=>{
 assert.equal(reason.evidenceOfTest(null).state,'unknown');
 assert.equal(reason.evidenceOfTest({test_id:'synthetic',observed_outcome:'observed_pass'}).state,'unknown');
 assert.equal(reason.evidenceOfTest({actual_run_id:'illustrative',observed_outcome:'planned',runtime_version:'v',environment:'sandbox',observed_at:'illustrative'}).state,'unknown');
 const structurallyComplete={test_id:'illustrative',actual_run_id:'illustrative-run',observed_outcome:'observed_pass',runtime_version:'v1',environment:'synthetic',observed_at:'illustrative-date'};
 assert.equal(reason.evidenceOfTest(structurallyComplete).state,'observed_pass');
 assert.match(reason.evidenceOfTest(structurallyComplete).reason,/authenticity and scope still require external verification/);
});

test('invalid record refs, unknown CQ type or false evidence upgrade fail integrity check',()=>{
 let bad=structuredClone(model);bad.competency_questions[0].required_contracts.push('NonexistentContract');
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(x=>x.includes('required_contracts')));
 bad=structuredClone(model);bad.competency_questions[0].hub_objects.push('fake@999');
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(x=>x.includes('unknown Hub object')));
 bad=structuredClone(model);bad.reasoning_fixtures.find(x=>x.id==='unknown_rule').expected='eligible_in_example';
 assert.ok(validateSemanticSource(bad,{objects}).errors.some(x=>x.includes('incorrectly elevated')));
});

test('switching scenarios changes answer without changing the canonical ontology',()=>{
 const original=JSON.stringify(model);
 for(const f of model.reasoning_fixtures){
   const html=root.CLM_SEMANTIC_ATLAS.competencyLab({fixtureId:f.id,objects});
   assert.ok(html.includes(f.label),f.id);
   assert.ok(html.includes(reason.assess(f.inputs).reason),f.id);
 }
 assert.equal(JSON.stringify(model),original,'Renderer must not mutate canonical semantics');
});
