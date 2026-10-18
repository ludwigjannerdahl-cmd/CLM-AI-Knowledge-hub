/* Fail closed when the semantic source becomes inconsistent. This is semantic integrity,
   not evidence that bank interpretation, data access or use cases are approved. */
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

export function validateSemanticSource(model,{objects=null}={}){
  const errors=[];
  const fail=(path,message)=>errors.push(path+': '+message);
  if(!model||typeof model!=='object'||Array.isArray(model))return {ok:false,errors:['root: expected model object']};
  if(model.status!=='illustrative_not_approved')fail('status','must preserve unapproved status');
  if(!Array.isArray(model.nodes)||model.nodes.length<6)return {ok:false,errors:['nodes: need a defined set of concepts']};
  const ids=new Set();
  for(const [i,n] of model.nodes.entries()){
    const p='nodes['+i+']';
    if(!/^[a-z][a-z0-9-]*$/.test(n.id||''))fail(p+'.id','must be stable identifier');
    if(ids.has(n.id))fail(p+'.id','duplicate identifier');
    ids.add(n.id);
    for(const key of ['label','type','zone','question','description','reuse','boundary'])
      if(typeof n[key]!=='string'||n[key].trim().length<(key==='type'||key==='zone'?3:8))fail(p+'.'+key,'missing meaningful content');
    if(typeof n.x!=='number'||n.x<9||n.x>90||typeof n.y!=='number'||n.y<15||n.y>85)
      fail(p,'layout must remain inside safe plot region');
    for(const l of n.links||[])if(!/^#\/(?:knowledge|work\/|topic\/|evidence|relationships)/.test(l.href||''))fail(p+'.links','internal route only');
    if(!Array.isArray(n.hub_objects)||n.hub_objects.length<1||n.hub_objects.length>3)fail(p+'.hub_objects','needs 1–3 existing illustrative Hub anchors');
    if(typeof n.hub_crosswalk_note!=='string'||n.hub_crosswalk_note.length<28)fail(p+'.hub_crosswalk_note','must preserve qualifier');
    const hubIds=new Set();
    for(const id of n.hub_objects||[]){
      if(hubIds.has(id))fail(p+'.hub_objects','duplicate Hub anchor');hubIds.add(id);
      if(objects&&!Object.hasOwn(objects,id))fail(p+'.hub_objects','unknown canonical Hub object '+id);
    }
  }
  const verbs=new Set(['informs','constrains','governs','produces']);
  const edges=new Set();
  if(!Array.isArray(model.edges)||model.edges.length<6)fail('edges','typed relations required');
  for(const [i,edge] of (model.edges||[]).entries()){
    const p='edges['+i+']';
    if(!ids.has(edge.from)||!ids.has(edge.to)||edge.from===edge.to)fail(p,'must join two known distinct concepts');
    if(!verbs.has(edge.type))fail(p+'.type','must use controlled, non-overclaimed relationship vocabulary');
    if(!edge.id||edges.has(edge.id))fail(p+'.id','stable unique edge identifier required');
    edges.add(edge.id);
    if(typeof edge.condition!=='string'||edge.condition.length<20)fail(p+'.condition','qualifier is required');
    if(typeof edge.claim!=='string'||edge.claim.length<18)fail(p+'.claim','explanatory proposition required');
  }
  if(!Array.isArray(model.perspectives)||model.perspectives.length!==3)fail('perspectives','exactly three work-relevant lenses');
  const perspectives=new Set();
  for(const [i,p] of (model.perspectives||[]).entries()){
    if(!p.id||perspectives.has(p.id))fail('perspectives['+i+']','duplicate or missing lens ID');
    perspectives.add(p.id);
    if(!ids.has(p.focus)||!Array.isArray(p.highlight)||!p.highlight.includes(p.focus)||p.highlight.some(id=>!ids.has(id)))fail('perspectives['+i+']','invalid focus or highlighted nodes');
    for(const k of ['label','question','answer','footnote'])if(!p[k]||p[k].length<12)fail('perspectives['+i+'].'+k,'insufficient explanation');
  }
  if((model.knowledge_forms||[]).length!==5)fail('knowledge_forms','five complementary forms must be present');
  if((model.meaning_layers||[]).length!==4)fail('meaning_layers','four meaning representations must be present');
  if(!Array.isArray(model.invariants)||model.invariants.length<5)fail('invariants','explicit governance distinctions required');
  for(const term of ['authority','meaning','data','capability','control','human','trace','work'])if(!ids.has(term))fail('nodes','missing core '+term);
  return {ok:errors.length===0,errors};
}

const self=fileURLToPath(import.meta.url);
if(process.argv[1]&&resolve(process.argv[1])===self){
  const file=resolve(process.argv[2]||'src/semantic/knowledge-to-capability.json');
  const model=JSON.parse(readFileSync(file,'utf8'));
  const result=validateSemanticSource(model);
  console.log(JSON.stringify({semanticIntegrity:result.ok?'passed':'failed',nodes:model.nodes?.length,edges:model.edges?.length,perspectives:model.perspectives?.length,errors:result.errors},null,2));
  if(!result.ok)process.exitCode=1;
}
