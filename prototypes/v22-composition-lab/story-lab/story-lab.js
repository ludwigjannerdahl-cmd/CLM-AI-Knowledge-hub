const STORY_FILES={
  'useful-work-first':'../stories/useful-work-first.json',
  'meaning-that-can-travel':'../stories/meaning-that-can-travel.json',
  'change-creates-questions':'../stories/change-creates-questions.json'
};
const MODE_NOTES={
  understand:'Author-led explanation: establish the governing mental model with one memorable visual idea.',
  explore:'Reader-led reasoning: manipulate relationships, conditions or consequences without losing semantic boundaries.',
  inspect:'Analytical inspection: exact source, object, version, status and evidence with calm utility density.'
};
const qs=(s,r=document)=>r.querySelector(s);
const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
const params=new URLSearchParams(location.search);
let state={story:params.get('story')||'useful-work-first',mode:params.get('mode')||'understand',step:Number(params.get('step')||1)};
let storyCache={};

async function loadStory(id){
  if(!STORY_FILES[id]) id='useful-work-first';
  if(!storyCache[id]){
    const response=await fetch(STORY_FILES[id]);
    if(!response.ok) throw new Error(`Could not load ${id}`);
    storyCache[id]=await response.json();
  }
  return storyCache[id];
}
function updateUrl(){
  const next=new URL(location.href);
  next.searchParams.set('story',state.story);
  next.searchParams.set('mode',state.mode);
  next.searchParams.set('step',String(state.step));
  history.replaceState({},'',next);
}
function storyLabel(id){
  return ({'useful-work-first':'Useful work first','meaning-that-can-travel':'Meaning that can travel','change-creates-questions':'Change creates questions'})[id]||id;
}
function renderPicker(){
  const host=qs('.story-picker');host.innerHTML='';
  Object.keys(STORY_FILES).forEach((id,i)=>{
    const b=document.createElement('button');
    b.type='button';b.dataset.story=id;b.setAttribute('aria-current',String(id===state.story));
    b.innerHTML=`<strong>0${i+1} / ${storyLabel(id)}</strong><span>${i===0?'Work, context, responsibility and reuse':i===1?'Source meaning, explicit context and bounded consumption':'Revision, candidate impact and evidence boundaries'}</span>`;
    b.addEventListener('click',()=>{state.story=id;state.step=1;render();});
    host.appendChild(b);
  });
}
function renderModes(story){
  qsa('[data-mode]').forEach(b=>{
    const active=b.dataset.mode===state.mode;
    b.setAttribute('aria-selected',String(active));
    b.tabIndex=active?0:-1;
    b.onclick=()=>{state.mode=b.dataset.mode;render();};
  });
  const src=story.projection_seeds[state.mode];
  qs('[data-preview]').src=src;
  qs('[data-open-full]').href=src;
  qs('[data-mode-title]').textContent=state.mode[0].toUpperCase()+state.mode.slice(1);
  qs('[data-mode-note]').textContent=MODE_NOTES[state.mode];
}
function renderSteps(story){
  const host=qs('.step-list');host.innerHTML='';
  story.steps.forEach((step,i)=>{
    const b=document.createElement('button');
    b.type='button';b.textContent=String(i+1).padStart(2,'0');
    b.setAttribute('aria-label',`Step ${i+1}: ${step.claim}`);
    b.setAttribute('aria-current',String(state.step===i+1));
    b.onclick=()=>{state.step=i+1;render();};host.appendChild(b);
  });
  if(state.step<1||state.step>story.steps.length) state.step=1;
  const step=story.steps[state.step-1];
  qs('[data-step-index]').textContent=`Step ${String(state.step).padStart(2,'0')} / ${String(story.steps.length).padStart(2,'0')}`;
  qs('[data-step-claim]').textContent=step.claim;
  qs('[data-step-intent]').textContent=step.intent;
  qs('[data-step-salient]').textContent=step.salient;
  qs('[data-step-fixed]').textContent=step.hold_fixed;
  qs('[data-step-risk]').textContent=step.false_inference_risk;
  const focus=qs('[data-step-focus]');focus.innerHTML='';
  if(step.focus?.length){step.focus.forEach(id=>{const c=document.createElement('code');c.textContent=id;focus.appendChild(c);});}
  else{const e=document.createElement('em');e.textContent='Conceptual scene — no canonical object selected';focus.appendChild(e);}
  qs('[data-step-handoff]').textContent=step.handoff;
}
function renderSuccess(story){
  const host=qs('[data-reader-success]');host.innerHTML='';
  story.reader_success.forEach(text=>{const li=document.createElement('li');li.textContent=text;host.appendChild(li);});
}
async function render(){
  if(!STORY_FILES[state.story]) state.story='useful-work-first';
  const story=await loadStory(state.story);
  renderPicker();
  qs('[data-story-index]').textContent=`Story ${String(Object.keys(STORY_FILES).indexOf(state.story)+1).padStart(2,'0')} / 03`;
  qs('[data-story-title]').textContent=story.title;
  qs('[data-story-claim]').textContent=story.governing_claim;
  qs('[data-memory-handle]').textContent=story.memory_handle;
  renderModes(story);renderSteps(story);renderSuccess(story);updateUrl();
}
qsa('[data-mode]').forEach((b,i,arr)=>b.addEventListener('keydown',e=>{
  if(!['ArrowLeft','ArrowRight'].includes(e.key))return;
  e.preventDefault();const dir=e.key==='ArrowRight'?1:-1;const next=arr[(i+dir+arr.length)%arr.length];next.focus();next.click();
}));
render().catch(error=>{
  console.error(error);
  qs('.story-stage').innerHTML=`<div class="step-detail"><h2>Story Lab could not load.</h2><p>${error.message}</p></div>`;
});
