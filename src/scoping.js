/* Advisory scoping, not an AI Act classification or an approval engine. */
(function(root){
  'use strict';
  const version='3.0.0-advisory';
  const fields={
    name:{label:'Idea name',kind:'text',required:true},owner:{label:'Proposed accountable owner',kind:'text',required:true},team:{label:'Team / area',kind:'text'},
    description:{label:'Task and intended result',kind:'long',required:true},
    lifecycleStatus:{label:'Lifecycle',options:{idea:'Idea',poc:'Proof of concept',pilot:'Pilot',production:'Production'}},
    outputType:{label:'Output',options:{draft:'Draft or analysis',extraction:'Extracted facts',recommendation:'Recommendation',automation:'Action in a process'}},
    dataTypes:{label:'Data involved',options:{synthetic:'Synthetic / public',internal:'Internal business information',personal:'Customer / personal information',mixed:'Mixed information'}},
    audience:{label:'Who uses the output?',options:{individual:'Individual colleague',team:'Internal team',client_facing:'Customer or external user'}},
    influence:{label:'Influence on customer decisions',options:{none:'None',indirect:'Indirect',yes:'Direct'}},
    autonomy:{label:'Human oversight',options:{full_review:'Review every output before use',spot_check:'Sample outputs',exception_only:'Review exceptions',minimal:'Limited intervention'}},
    frequency:{label:'Frequency',options:{once:'One-off',recurring:'Recurring',continuous:'Continuous'}},
    changeType:{label:'Change',options:{new:'New solution',extension:'Extend existing work',replacement:'Replace an existing method'}},
    systems:{label:'Intended systems / route',kind:'text'},users:{label:'Intended users',kind:'text'},scope:{label:'Out of scope',kind:'long'},context:{label:'Knowledge, evidence and open questions',kind:'long'},
    isAgent:{label:'Tool-using agent?',options:{no:'No',yes:'Yes'}},
    agentType:{label:'Agent type',options:{declarative:'Declarative',custom:'Custom',multi_agent:'Multiple agents'}},
    agentPlatform:{label:'Intended runtime',kind:'text'},agentTools:{label:'Tools and permitted actions to establish',kind:'long'},
    agentMemory:{label:'Memory / retention',options:{none:'No retained memory',session:'Session only',persistent:'Persistent'}},agentKnowledge:{label:'Knowledge sources',kind:'long'},agentInstructions:{label:'Instruction maintenance',options:{version_controlled:'Version controlled',owner_managed:'Owner managed',platform_default:'Platform default',ungoverned:'Not established'}}
  };
  const patterns={1:'Individual assistance',2:'Process preparation or automation',3:'Decision support',4:'Action with limited intervention'};
  const agentFields=Object.keys(fields).filter(k=>k.startsWith('agent'));
  function blank(){return {...Object.fromEntries(Object.keys(fields).map(k=>[k,''])),files:[]};}
  function normalize(input={}){
    if(!input||typeof input!=='object'||Array.isArray(input))input={};
    const value=blank();for(const key of Object.keys(fields))value[key]=typeof input[key]==='string'?input[key].trim().slice(0,5000):'';
    value.files=Array.isArray(input.files)?input.files.filter(f=>f&&typeof f.name==='string').map(f=>({name:f.name.slice(0,500),size:Number.isFinite(f.size)&&f.size>=0?f.size:0,type:typeof f.type==='string'?f.type:'',lastModified:Number.isFinite(f.lastModified)?f.lastModified:null,contentsAnalysed:false})):[];
    return value;
  }
  function evaluate(input){
    const x=normalize(input),missing=[];
    for(const [key,f] of Object.entries(fields)){
      if(agentFields.includes(key)&&x.isAgent!=='yes')continue;
      if(f.options&&!Object.hasOwn(f.options,x[key]))missing.push(f.label);
      else if((f.required||(x.isAgent==='yes'&&['agentPlatform','agentTools','agentKnowledge'].includes(key)))&&!x[key])missing.push(f.label);
    }
    const boundary='Advisory working pattern only. No legal classification, formal risk tier, platform approval or delivery permission is assigned.';
    if(missing.length)return {status:'incomplete',pattern:null,missing,reasoning:[],questions:['Resolve the unknown inputs before suggesting a working pattern.'],boundary};
    let pattern=1;const reasoning=[];
    if(x.autonomy==='minimal'){pattern=4;reasoning.push('Limited intervention makes action boundaries and recovery central.');}
    else if(['yes','indirect'].includes(x.influence)||x.outputType==='recommendation'){pattern=3;reasoning.push('The output may shape a customer decision; assess the actual influence and review design.');}
    else if(x.outputType==='automation'||x.audience!=='individual'||x.dataTypes==='personal'||x.dataTypes==='mixed'||x.isAgent==='yes'||x.autonomy!=='full_review'){pattern=2;reasoning.push('The task crosses into shared process, sensitive context, tool use or reduced review.');}
    else reasoning.push('An individual reviews a bounded output before use. The actual tool and information still require a permitted route.');
    const specialist=/social\s*scor|biometric|emotion\s*(?:infer|recog)|subliminal/i.test(x.description+' '+x.context);
    const questions=['Confirm source applicability, permitted information and the actual consumption route.','Name business, knowledge and technical lifecycle owners as applicable.','Define task-specific acceptance evidence, monitoring and recovery proportionate to the scope.'];
    if(x.isAgent==='yes')questions.push('Verify tool permissions, identities, instruction versions, retained memory and intervention in the intended runtime.');
    if(specialist)questions.unshift('The description raises a specialist review question. A keyword match cannot establish legal status; seek the relevant legal/governance review.');
    return {status:specialist?'specialist-review':'advisory',pattern,missing:[],reasoning,questions,boundary};
  }
  function record(input,id,at){const x=normalize(input);return {schemaVersion:1,engineVersion:version,id,createdAt:at,input:x,result:evaluate(x),amendments:[],storage:'Browser-local, editable history; not an institutional audit log',attachments:'Metadata only. File contents are neither read nor analysed.'};}
  function effective(r){const a=r.amendments.at(-1);return {pattern:a?.pattern??r.result.pattern,label:patterns[a?.pattern??r.result.pattern]||'Unresolved',basis:a?'Proposed reviewer override':'Deterministic advisory suggestion',reason:a?.reason||r.result.reasoning.join(' ')};}
  function amend(r,pattern,reason,at){if(!r.result.pattern||!Object.hasOwn(patterns,pattern)||typeof reason!=='string'||!reason.trim())throw new Error('A complete scope, valid pattern and justification are required.');return {...r,amendments:[...r.amendments,{pattern:Number(pattern),reason:reason.trim().slice(0,5000),at}],updatedAt:at};}
  function exportRecord(r){return {...r,effective:effective(r),formalApproval:false};}
  function validRecord(r){return !!r&&r.schemaVersion===1&&r.engineVersion===version&&typeof r.id==='string'&&typeof r.createdAt==='string'&&r.input&&JSON.stringify(normalize(r.input))===JSON.stringify(r.input)&&r.result&&Array.isArray(r.amendments)&&r.amendments.every(a=>a&&Object.hasOwn(patterns,a.pattern)&&typeof a.reason==='string'&&typeof a.at==='string')&&JSON.stringify(evaluate(r.input))===JSON.stringify(r.result);}
  function readHistory(storage){try{const records=JSON.parse(storage.getItem('clm-ai-scope-history')||'[]');return {records:Array.isArray(records)?records.filter(validRecord):[],available:true};}catch{return {records:[],available:false};}}
  function saveHistory(storage,records){try{storage.setItem('clm-ai-scope-history',JSON.stringify(records));return true;}catch{return false;}}
  const example={...blank(),name:'Synthetic observation preparation',owner:'Proposed case-preparation owner',team:'CLM · illustrative',description:'Prepare an observation from a supplied synthetic business-sale sentence; expose gaps for a colleague.',lifecycleStatus:'poc',outputType:'extraction',dataTypes:'synthetic',audience:'team',influence:'none',autonomy:'full_review',frequency:'once',changeType:'new',systems:'Local synthetic demonstration; no live connections',users:'A colleague reviewing the preparation method',scope:'No risk rating, customer approval or live case action',context:'INS-01 version 1; source amount and corroboration missing',isAgent:'no'};
  root.CLM_SCOPING={version,fields,patterns,agentFields,blank,normalize,evaluate,record,effective,amend,exportRecord,validRecord,readHistory,saveHistory,example};
})(typeof window!=='undefined'?window:globalThis);
