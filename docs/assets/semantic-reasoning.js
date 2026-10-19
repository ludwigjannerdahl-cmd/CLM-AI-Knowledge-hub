/* Explanatory reasoning fixtures, not a bank authorisation or rule engine. */
(function(root){
  'use strict';
  function assess(inputs){
    const acceptedApplicability=['applicable','not_applicable','unknown'];
    const acceptedPermission=['allow','deny','unknown'];
    if(!inputs||!acceptedApplicability.includes(inputs.applicability)||!acceptedPermission.includes(inputs.permission))
      return {state:'invalid',reason:'An input value is missing or outside the declared vocabulary',explanation:'No permission inference can be drawn from malformed inputs.'};
    if(inputs.applicability==='unknown')
      return {state:'blocked',reason:'No applicable instruction has been established',explanation:'Missing applicability remains unknown, not false and not implicitly applicable.'};
    if(inputs.applicability==='not_applicable')
      return {state:'blocked',reason:'Instruction does not apply to this task',explanation:'A not-applicable rule cannot be used to justify the operation.'};
    if(inputs.permission==='deny')
      return {state:'blocked',reason:'Explicit permission denial',explanation:'A specific denial blocks this demonstration even when applicability is established.'};
    if(inputs.permission==='unknown')
      return {state:'blocked',reason:'Permission decision is unknown',explanation:'Unknown permission is distinct from denial but never treated as an allow.'};
    if(inputs.purpose_match!==true)
      return {state:'blocked',reason:'Use purpose does not match grant',explanation:'A grant for one purpose cannot be reused silently for a different purpose.'};
    if(inputs.subject_match!==true)
      return {state:'blocked',reason:'Subject scope does not match',explanation:'A grant for one person or role does not apply to another subject.'};
    if(inputs.grant_current!==true)
      return {state:'blocked',reason:'Authorization is not current',explanation:'Historical permission cannot be assumed valid for the present task.'};
    return {state:'eligible_in_example',reason:'All illustrative prerequisites met; not proof of real runtime permission',explanation:'This is a simulated eligibility demonstration. A production decision requires an actual identity, grant, policy engine and observed enforcement.'};
  }
  function evidenceOfTest(record){
    if(!record||typeof record!=='object'||!record.actual_run_id||!record.observed_outcome||!record.runtime_version||!record.environment||!record.observed_at)
      return {state:'unknown',reason:'No version-scoped observed test result has been supplied'};
    if(!['observed_pass','observed_fail','inconclusive'].includes(record.observed_outcome))
      return {state:'unknown',reason:'The outcome is not a recognized observed result'};
    return {state:record.observed_outcome,reason:'The record is structurally complete; authenticity and scope still require external verification'};
  }
  root.CLM_SEMANTIC_REASONING={assess,evidenceOfTest};
})(typeof window!=='undefined'?window:globalThis);
