/* Pure reasoning kernel. No model call, governance action, persistence or enterprise access. */
(function(root){
  'use strict';
  const states=['APPLIES','EXCLUDED','UNRESOLVED'];
  const unknown=v=>v===null||v===undefined||v==='';
  const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
  function applicability(claim,facts){
    const reasons=[],missing=[];let excluded=false;
    for(const [key,allowed] of Object.entries(claim.scope||{})){
      const value=facts[key];
      if(unknown(value)){missing.push(key);reasons.push({key,state:'UNRESOLVED',reason:key+' is not supplied.'});}
      else if(!allowed.includes(value)){excluded=true;reasons.push({key,state:'EXCLUDED',reason:key+' = '+String(value)+' is outside '+allowed.join(' / ')+'.'});}
      else reasons.push({key,state:'APPLIES',reason:key+' = '+String(value)+' matches the recorded scope.'});
    }
    // A known contradiction can exclude a conjunction even if an unrelated fact is absent.
    return {state:excluded?'EXCLUDED':missing.length?'UNRESOLVED':'APPLIES',missing,reasons};
  }
  function governanceEligible(o,p){
    const g=o.governance;
    return o.status==='approved'&&o.runtimeEligible===true&&g?.actor==='human'&&!!g.decisionId&&!!g.reviewerRole&&g.claimVersion===o.version&&g.permittedTasks?.includes(p.task.id)&&(!o.source||(g.sourceVersion===p.objects.find(x=>x.id===o.source)?.version));
  }
  function validate(p){
    const errors=[],fail=(id,reason)=>errors.push({id,reason});
    if(!p||p.schemaVersion!=='1.0')return [{id:'schema',reason:'Unsupported specimen schema.'}];
    if(!['safe-synthetic','private-internal'].includes(p.publication))fail('publication','Publication classification must be explicit.');
    if(!p.task||typeof p.task!=='object'||!p.facts||typeof p.facts!=='object'||!p.envelope||typeof p.envelope!=='object'||!Array.isArray(p.objects)||!Array.isArray(p.bindingContext)||!Array.isArray(p.supportAssertions))return [...errors,{id:'shape',reason:'Task, facts, envelope, object records, context and support assertions are required.'}];
    for(const o of p.objects){if(!o||typeof o!=='object'||!Array.isArray(o.authority_for)||!Array.isArray(o.not_authority_for)||!Array.isArray(o.supportingEvidence)||!Array.isArray(o.revalidate_when)||!o.scope||typeof o.scope!=='object'||Object.values(o.scope).some(v=>!Array.isArray(v)||!v.length)||o.relationships&&!Array.isArray(o.relationships))fail('shape','Claim arrays and scope predicates must be explicit.');}
    for(const key of ['inputs','requiredKnowledge','outputContract','stopConditions','humanDecisionRights','evidenceRequirement'])if(!Array.isArray(p.task[key]))fail('task.'+key,'Task Contract '+key+' must be an array.');
    if(!Array.isArray(p.envelope.capabilities)||!['unknown','verified','not-verified'].includes(p.envelope.status)||typeof p.envelope.write!=='boolean')fail('envelope-shape','Execution Envelope status, capabilities and write boundary are required.');
    if(errors.length)return errors;
    for(const key of ['partyType','jurisdiction','stage'])if(!unknown(p.facts[key])&&p.task[key]!=='unresolved'&&p.task[key]!==p.facts[key])fail('contract-scope','Case '+key+' falls outside the Task Contract.');

    const ids=new Set();for(const o of p.objects||[]){if(!o.id||ids.has(o.id))fail('identity','Every object needs a unique identity.');ids.add(o.id);}
    const t=p.task||{};
    for(const key of ['id','work','businessScope','partyType','jurisdiction','stage','purpose','inputs','requiredKnowledge','method','outputContract','stopConditions','humanDecisionRights','writeAuthority','evidenceRequirement'])if(unknown(t[key])||Array.isArray(t[key])&&!t[key].length)fail('task.'+key,'Missing Task Contract field: '+key);
    const objectIndex=Object.fromEntries((p.objects||[]).map(o=>[o.id,o]));
    for(const o of p.objects||[]){
      for(const key of ['subject','assertion','scope','authority_for','not_authority_for','supportingEvidence','version','status','revalidate_when'])if(o[key]===undefined)fail(o.id,'Missing claim property: '+key);
      if(!['source','meaning','implementation','work','assurance'].includes(o.family))fail(o.id,'Unknown material family.');
      for(const ref of [...o.supportingEvidence,...(o.relationships||[]).map(r=>r.target)])if(!ids.has(ref))fail(o.id,'Unresolved object link: '+ref);
      if(o.family==='implementation'&&o.authority_for.some(a=>['policy','normative-requirement','law'].includes(a)))fail('implementation-authority','Implementation does not constitute policy authority.');
      if(o.kind==='proposal'&&o.decisionActor==='human')fail('proposal-decision','An AI proposal is not a human decision.');
      if(o.kind==='decision'&&o.decisionActor!=='human')fail('human-decision','Only a human decision record can establish a human decision.');
      if(o.sourceModality&&o.modality!==o.sourceModality)fail('modality','Interpretation changed the source modality.');
      if(o.governance?.sourceVersion&&o.governance.sourceVersion!==objectIndex[o.source]?.version&&o.status==='approved')fail('source-change','A changed source needs renewed governance review.');
      if(o.status==='approved'&&(!o.governance?.decisionId||!o.governance?.reviewerRole||o.governance?.actor!=='human'||o.governance.claimVersion!==o.version||!o.governance.permittedTasks?.includes(t.id)))fail('authority-seam','Approved knowledge needs a human governance record.');
      if(o.assertedApplicability&&o.assertedApplicability!==applicability(o,p.facts||{}).state)fail('applicability','Asserted applicability disagrees with the facts.');
    }
    for(const id of [...(t.requiredKnowledge||[]),...(t.inputs||[]),t.method,...(t.evidenceRequirement||[])])if(id&&!ids.has(id))fail('task-reference','Unknown Task Contract object: '+id);
    if(p.envelope?.write===true&&t.writeAuthority==='none')fail('write-boundary','Execution Envelope permits a write forbidden by the Task Contract.');
    for(const c of p.envelope?.capabilities||[])if(c.available===true&&(c.verified!==true||!c.evidence||!objectIndex[c.evidence]?.observed||p.envelope.status!=='verified'))fail('unverified-capability','Available capability needs verified evidence.');
    if(p.envelope?.status==='verified'&&(!p.envelope?.verificationEvidence||!objectIndex[p.envelope.verificationEvidence]?.observed||!p.envelope.runtime||!p.envelope.modelVersion||!p.envelope.identity||!p.envelope.logging||!p.envelope.disable))fail('unverified-envelope','A verified runtime needs verification evidence.');
    for(const b of p.bindingContext||[]){const o=objectIndex[b];if(!o||!governanceEligible(o,p)||applicability(o,p.facts).state!=='APPLIES')fail('draft-leakage','Binding context includes ungoverned, ineligible or non-applicable knowledge.');}
    for(const assertion of p.supportAssertions||[]){const ev=objectIndex[assertion.evidence];if(assertion.state==='verified'&&(!ev||ev.kind!=='evidence'||ev.observed!==true||ev.target!==assertion.target||ev.targetVersion!==assertion.version))fail('evidence-version','Evidence does not verify the asserted target version.');}
    return errors;
  }
  function adapt(input,{allowPrivate=false}={}){
    const p=JSON.parse(JSON.stringify(input));
    if(p.publication==='private-internal'&&!allowPrivate)throw Error('Private specimen is not permitted in the public adapter.');
    if(p.publication==='private-internal'){for(const o of p.objects||[]){if(o.family==='meaning'){o.status='draft';o.runtimeEligible=false;delete o.governance;}}p.bindingContext=[];}
    const errors=validate(p);if(errors.length)throw Error(errors.map(e=>e.id+': '+e.reason).join('\n'));
    return p;
  }
  function compile(p,facts=p.facts){
    const validation=validate({...p,facts});
    const knowledge=p.objects.filter(o=>p.task.requiredKnowledge.includes(o.id));
    const rows=knowledge.map(o=>({id:o.id,...applicability(o,facts),eligible:governanceEligible(o,p)}));
    const binding=validation.length?[]:rows.filter(r=>r.state==='APPLIES'&&r.eligible).map(r=>r.id);
    return {rows,binding,withheld:rows.filter(r=>!binding.includes(r.id)).map(r=>r.id),validation,stop:rows.some(r=>r.state==='UNRESOLVED')?'Applicability unresolved':binding.length<rows.filter(r=>r.state==='APPLIES').length?'Knowledge authority not established':null};
  }
  function evidenceState(record,target,version){
    if(record.kind!=='evidence'||!record.observed)return 'No observed result';
    if(record.target!==target)return 'Outside support scope';
    return record.targetVersion===version?'Recorded for this version':'Potentially affected · revalidation required';
  }
  function envelopeState(p){const valid=validate(p).length===0;return {desired:p.envelope.desired,verified:valid&&p.envelope.status==='verified'&&!!p.envelope.verificationEvidence,write:p.task.writeAuthority!=='none'&&p.envelope.write===true,capabilities:p.envelope.capabilities.map(c=>({...c,available:valid&&p.envelope.status==='verified'&&c.verified===true&&!!c.evidence&&c.available===true}))};}
  function feedbackCandidate(text,source){return {kind:'candidate',status:'draft',runtimeEligible:false,assertion:String(text),source};}
  function assertPublishable(p){if(p.publication!=='safe-synthetic'||p.provenance?.origin!=='authored-synthetic'||p.provenance?.privateDerived!==false)throw Error('Only explicitly safe, authored synthetic specimens can be published.');const errors=validate(p);if(errors.length)throw Error('Invalid specimen: '+JSON.stringify(errors));return true;}
  root.CLM_SPECIMEN_KERNEL={states,applicability,validate,adapt,compile,evidenceState,envelopeState,feedbackCandidate,assertPublishable,same};
})(typeof window!=='undefined'?window:globalThis);
