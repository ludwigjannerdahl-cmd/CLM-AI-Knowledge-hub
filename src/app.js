(function () {
  'use strict';
  const D=window.CLM_HUB_DATA,M=window.CLM_HUB_MODEL,N=window.CLM_HUB_CHAPTERS,S=window.CLM_SCOPING,e=M.escape;
  const app=document.getElementById('app'),dialog=document.getElementById('dialog');
  if('scrollRestoration' in history)history.scrollRestoration='manual';
  const paths={compass:'M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0m13-4-3 5-5 3 3-5z',pen:'m4 20 1-6L16 3l5 5-11 11zm10-15 5 5',arrow:'M4 12h16m-6-6 6 6-6 6',file:'M14 3H6a1 1 0 0 0-1 1v16h14V8zm0 0v5h5M8 12h8m-8 4h6',person:'M8 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0M4 21v-3a8 8 0 0 1 16 0v3',info:'M12 11v6m0-10v.1M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0',plus:'M5 12h14m-7-7v14',minus:'M5 12h14',search:'M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14m5 12 6 6',close:'m6 6 12 12M6 18 18 6',note:'M5 3h14v18H5zM8 8h8M8 12h8M8 16h4',sun:'M8 12a4 4 0 1 0 8 0 4 4 0 0 0-8 0M12 1v2m0 18v2M1 12h2m18 0h2M4 4l2 2m12 12 2 2M4 20l2-2M18 6l2-2',screen:'M3 4h18v13H3zm9 13v4m-4 0h8',menu:'M4 6h16M4 12h16M4 18h16',check:'m4 12 5 5L20 6',shield:'m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5zm-4 10 3 3 5-6',layers:'m12 3 10 5-10 5L2 8zm-10 9 10 5 10-5M2 16l10 5 10-5',route:'M5 20V6a3 3 0 0 1 6 0v12a3 3 0 0 0 6 0V4m-3 3 3-3 3 3',sliders:'M6 3v5m0 4v9m12-18v9m0 4v5M3 8h6v4H3zm12 4h6v4h-6z',download:'M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5',code:'m8 6-6 6 6 6m8-12 6 6-6 6m-3-15-2 18',book:'M12 5C8 2 3 3 3 3v17s5-1 9 2c4-3 9-2 9-2V3s-5-1-9 2zm0 0v17',link:'m9 15 6-6M8 16l-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 10a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1'};
  function icon(name){return '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="'+(paths[name]||paths.file)+'"/></svg>';}
  function button(label,action,value='',cls='text-link'){return '<button type="button" class="'+cls+'" data-action="'+action+'" data-value="'+e(value)+'">'+e(label)+'</button>';}
  function link(href,label,primary=false){return '<a class="'+(primary?'btn primary':'text-link')+'" href="'+e(href)+'">'+e(label)+icon('arrow')+'</a>';}
  function objectLink(id,label){return '<button class="object-link" data-action="object" data-value="'+e(id)+'">'+icon('file')+e(label||D.objects[id]?.title||id)+'</button>';}
  function topicLink(c,t,label){return '<a class="topic-link" href="'+M.routeForTopic(c,t)+'">'+e(label)+icon('arrow')+'</a>';}
  function sourceLink(id,label){return '<a class="source-link" href="#/source/'+encodeURIComponent(id)+'">'+icon('book')+e(label||D.sources.find(x=>x.id===id)?.title||id)+'</a>';}
  const storage=()=>window.localStorage;
  const read=(key,fallback)=>M.safeRead(storage,key,fallback);
  const settings=read('clm-ai-settings',{}).value||{};
  const state={route:M.parseRoute(location.hash),anchor:'work',workDomain:'run',knowledgeStage:'human',subject:'client',changed:false,transferChanged:false,flags:{...M.defaultFlags},steps:{},tabs:{},disclosures:{},scopeInput:S.blank(),scopeRecord:null,notes:M.normalizeNotes(read('clm-ai-notes',{}).value),history:[],historyUnresolved:[],storageAvailable:true};
  try{const h=S.readHistory(storage());state.history=h.records;state.historyUnresolved=h.unresolved;state.storageAvailable=h.available;}catch{state.storageAvailable=false;}
  let modalKind='',modalReturn=null,lastHash=location.hash||'#/',restoring=false;
  const readingPositions=new Map();
  let theme=['light','dark','system'].includes(settings.theme)?settings.theme:'system';
  function applyTheme(){document.documentElement.dataset.theme=theme==='system'?(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'):theme;const b=document.querySelector('[data-action="theme"]');b.title='Theme: '+theme+'. Select to change.';b.setAttribute('aria-label',b.title);}
  applyTheme();matchMedia('(prefers-color-scheme: dark)').addEventListener('change',()=>{if(theme==='system')applyTheme();});
  document.querySelectorAll('[data-icon]').forEach(n=>n.innerHTML=icon(n.dataset.icon));
  function announce(text){document.getElementById('live-message').textContent=text;}
  function saveLocal(key,value){const ok=M.safeWrite(storage,key,value);if(!ok){state.storageAvailable=false;announce('Browser storage is unavailable. Export remains available in this session.');}return ok;}
  function focusKey(el){if(!el||el===document.body)return null;return el.id?{id:el.id}:{action:el.dataset?.action,value:el.dataset?.value,href:el.getAttribute?.('href')};}
  function focusElement(key){if(!key)return null;if(key.id)return document.getElementById(key.id);return Array.from(document.querySelectorAll('a,button,input,summary')).find(n=>key.action?n.dataset.action===key.action&&n.dataset.value===key.value:key.href?n.getAttribute('href')===key.href:false);}
  function snapshot(){const overlay=modalKind==='search'?{kind:'search',query:document.getElementById('search-input')?.value||'',filter:dialog.querySelector('[data-action=\"search-filter\"][aria-pressed=\"true\"]')?.dataset.value||'All'}:modalKind==='notes'?{kind:'notes'}:modalKind==='note'?{kind:'note',id:document.getElementById('note-text')?.dataset.noteId}:null;return {overlay,anchor:state.anchor,workDomain:state.workDomain,knowledgeStage:state.knowledgeStage,transferChanged:state.transferChanged,subject:state.subject,changed:state.changed,flags:state.flags,steps:state.steps,tabs:state.tabs,disclosures:state.disclosures,scopeInput:state.scopeInput,scopeRecord:state.scopeRecord,scroll:scrollY,focus:modalKind?modalReturn:focusKey(document.activeElement),modal:modalKind?{kind:modalKind,returnFocus:modalReturn,focus:focusKey(document.activeElement),scroll:dialog.scrollTop}:null};}
  function remember(){if(Number.isInteger(history.state?.position))readingPositions.set(history.state.position,scrollY);history.replaceState({...history.state,hub:true,snapshot:snapshot()},'',location.href);}
  function restore(s){if(!s)return;for(const k of ['anchor','workDomain','knowledgeStage','transferChanged','subject','changed','steps','tabs','disclosures','scopeInput','scopeRecord'])if(s[k]!==undefined)state[k]=s[k];if(s.flags)state.flags=M.normalizeFlags(s.flags);}
  function routeWith(key,value){const url=new URL(location.href);const r=M.parseRoute(url.hash);if(key==='object')r.params.delete('panel');if(value===null)r.params.delete(key);else r.params.set(key,value);return '#'+r.path+(r.params.size?'?'+r.params:'');}
  function navigate(hash,{keepScroll=false,focus=null,savedSnapshot=null,scrollToFocus=false}={}){
    if(hash==='#main'){document.getElementById('main').focus();return;}
    remember();const prior=location.hash||'#/';const prev=snapshot();
    const next=savedSnapshot||{...prev,overlay:null,modal:null,scrollToFocus,scroll:keepScroll?prev.scroll:0,focus:focus||null};
    const sourceReturn=M.sourceOrigin(prior,hash,history.state,prev,document.getElementById('page-title')?.textContent);
    const position=(history.state?.position||0)+1;readingPositions.delete(position);
    history.pushState({hub:true,position,snapshot:next,sourceReturn},'',hash);
    lastHash=location.hash;render(keepScroll||savedSnapshot?next:undefined);
  }
  function returnTo(origin){
    if(!origin)return;
    const delta=origin.position-history.state?.position;
    if(Number.isInteger(origin.position)&&Number.isInteger(delta)&&delta<0)history.go(delta);
    else navigate(origin.hash,{savedSnapshot:origin.snapshot});
  }
  function render(saved){
    restoring=true;state.route=M.parseRoute(location.hash);restore(saved);if(dialog.open)dialog.close();modalKind='';
    const domain=state.route.params.get('domain'),representation=state.route.params.get('representation');
    if(D.workDomains.some(x=>x.id===domain))state.workDomain=domain;
    if(['human','structured','consumed'].includes(representation))state.knowledgeStage=representation;
    const ret=state.route.view==='source'&&history.state?.sourceReturn?'<div class="return-bar">'+button('← Return to '+history.state.sourceReturn.label,'return')+'<span>Source reading · your task context is retained</span></div>':'';
    app.innerHTML=ret+views.render();
    document.querySelectorAll('.primary-nav a').forEach(a=>{const v=M.parseRoute(a.hash).view;const yes=v===state.route.view;a.toggleAttribute('aria-current',yes);if(yes)a.setAttribute('aria-current','page');});
    document.title=(document.getElementById('page-title')?.textContent||'CLM AI Knowledge Hub')+' · CLM AI';
    document.querySelectorAll('[data-disclosure]').forEach(n=>{const k=n.dataset.disclosure;if(Object.hasOwn(state.disclosures,k))n.open=state.disclosures[k];});
    initNative(app);document.body.classList.remove('menu-open');document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');
    const sourcePos=M.sourcePosition(window.CLM_SOURCE_TEXTS?.[state.route.id]||[],state.route.params);
    const target=state.route.view==='topic'&&state.route.target?document.getElementById('native-'+state.route.target):state.route.view==='source'&&(state.route.params.has('page')||state.route.params.has('line'))?document.getElementById(sourcePos.line?'source-line-'+sourcePos.page+'-'+sourcePos.line:'source-page-'+sourcePos.page):null;
    if(target){let n=target;while(n&&n!==app){if(n.tagName==='DETAILS')n.open=true;n=n.parentElement;}}
    requestAnimationFrame(()=>{
      if(saved){scrollTo(0,saved.scroll||0);focusElement(saved.focus)?.focus({preventScroll:true});if(saved.scrollToFocus)focusElement(saved.focus)?.scrollIntoView({block:'start'});}
      else if(target){target.scrollIntoView({block:'start'});target.focus?.({preventScroll:true});}
      else scrollTo(0,0);
      if(!saved?.focus&&!target&&!state.route.params.has('object'))document.getElementById('page-title')?.focus({preventScroll:true});
      const obj=state.route.params.get('object');if(obj)openObject(obj,false);else if(saved?.overlay?.kind==='search'){search();document.getElementById('search-input').value=saved.overlay.query;dialog.querySelectorAll('[data-action=\"search-filter\"]').forEach(n=>n.setAttribute('aria-pressed',String(n.dataset.value===saved.overlay.filter)));searchResults();}else if(saved?.overlay?.kind==='notes')notes();else if(saved?.overlay?.kind==='note')notes(saved.overlay.id);
      if(saved?.modal&&saved.modal.kind===modalKind){modalReturn=saved.modal.returnFocus;dialog.scrollTop=saved.modal.scroll||0;focusElement(saved.modal.focus)?.focus({preventScroll:true});}
      restoring=false;
    });
  }
  function rerender(focus){remember();const s=snapshot();s.focus=focus||s.focus;render(s);}
  function initNative(root){root.querySelectorAll('[data-native-chapter]').forEach(el=>{const c=N.chapters.find(c=>c.id===el.dataset.nativeChapter);if(!c)return;state.tabs=M.prepareChapter(c,state.tabs);el.querySelectorAll('[data-native-panel]').forEach(p=>p.hidden=state.tabs[c.tabs[p.dataset.nativePanel]?.group]!==p.dataset.nativePanel);el.querySelectorAll('[data-native-control]').forEach(b=>b.setAttribute('aria-pressed',String(state.tabs[c.tabs[b.dataset.nativeControl]?.group]===b.dataset.nativeControl)));});}
  function showDialog(kind,title,body,cls='inspector'){
    const already=dialog.open;if(!already)modalReturn=focusKey(document.activeElement);modalKind=kind;dialog.className=cls;
    dialog.innerHTML='<header class="dialog-header"><span id="dialog-title">'+e(title)+'</span><button data-action="close" aria-label="Close">'+icon('close')+'</button></header><div class="dialog-body">'+body+'</div>';
    if(!already)dialog.showModal();dialog.scrollTop=0;dialog.querySelector('h2')?.setAttribute('tabindex','-1');(dialog.querySelector('h2')||dialog.querySelector('button')).focus();
  }
  function closeDialog(){
    if(modalKind==='object'&&history.state?.objectReturn){returnTo(history.state.objectReturn);return;}
    const was=modalKind;dialog.close();modalKind='';
    if(was==='object'&&state.route.params.has('object')){history.replaceState({...history.state,hub:true},'',routeWith('object',null));lastHash=location.hash;state.route=M.parseRoute(location.hash);}
    const target=focusElement(modalReturn)||document.getElementById('page-title');target?.focus({preventScroll:true});remember();
  }
  function openObject(id,push=true){const o=D.objects[id];if(!o){announce('This object is unavailable.');return;}
    if(push){remember();const prior=snapshot();const objectReturn={hash:location.hash||'#/',position:history.state?.position??null,snapshot:prior};
      const position=(history.state?.position||0)+1;readingPositions.delete(position);
      history.pushState({hub:true,position,snapshot:{...prior,overlay:null,modal:null},sourceReturn:history.state?.sourceReturn||null,objectReturn},'',routeWith('object',id));lastHash=location.hash;state.route=M.parseRoute(location.hash);
    }
    const panel=state.route.params.get('panel');showDialog('object',o.type,X.dossier(o,['definition','relationships','evidence','history'].includes(panel)?panel:'definition'));
  }
  function download(name,value,type='application/json'){const content=typeof value==='string'?value:JSON.stringify(value,null,2);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([content],{type}));a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),3000);announce('Export prepared.');}
  const index=[];
  for(const c of N.chapters){for(const h of c.headings){const marker='id="native-'+h.id+'"';const start=c.html.indexOf(marker);const end=c.html.indexOf('<h',start+marker.length);index.push({kind:'Topic',title:h.title,text:M.plain(c.html.slice(start,end>start?end:start+9000)),href:M.routeForTopic(c.id,h.id),context:D.chapters.find(x=>x.id===c.id)?.title});}index.push({kind:'Chapter',title:D.chapters.find(x=>x.id===c.id)?.title||c.title,text:M.plain(c.html).slice(0,1000),href:M.routeForTopic(c.id),context:'Full chapter'});}
  for(const o of Object.values(D.objects))index.push({kind:M.objectKind(o),title:o.title,text:o.id+' '+o.summary+' '+o.fields.flat().join(' '),object:o.id,context:o.type+' · '+o.status});
  for(const s of D.sources)index.push({kind:'Source',title:s.title,text:s.summary+' '+s.scope,href:'#/source/'+s.id,context:s.kind});
  for(const p of Object.values(D.paths))index.push({kind:'Use case',title:p.label,text:p.lead+' '+p.eyebrow,href:'#/work/'+p.id,context:p.eyebrow});
  index.push({kind:'Use case',title:'Incomplete onboarding handoff',text:'Independent synthetic change transfer: source, interpretation, instruction, requirement, test and evidence',href:'#/work/change?case=handoff',context:'Govern / change CLM · synthetic transfer'});
  const searchKinds=['All','Requirement','Field','Instruction','Method','Evidence','Use case','Topic','Source'];
  for(const source of D.sources)for(const [page,text] of (window.CLM_SOURCE_TEXTS?.[source.id]||[]).entries())index.push({kind:'Source',title:source.title+(source.id==='strategy'?' · page '+(page+1):' · full text'),text,href:'#/source/'+source.id+'?page='+page,sourcePage:page,sourceId:source.id,context:'Supplied text extraction · '+source.kind});
  function excerpt(text,query){const clean=M.plain(text),word=query.trim().split(/\s+/)[0]?.toLowerCase()||'',at=clean.toLowerCase().indexOf(word),start=Math.max(0,at-70);return (start?'…':'')+clean.slice(start,start+230)+'…';}
  function search(){showDialog('search','Search the Hub','<div class="search-product-heading"><p class="eyebrow">Search & discovery</p><h2>Find the context behind the work.</h2><p>Keyword matching across full topics, source records and typed objects.</p></div><label class="sr-only" for="search-input">Search the Hub</label><div class="search-head">'+icon('search')+'<input type="search" id="search-input" placeholder="Try a field, requirement, instruction or topic…" autocomplete="off"></div><div class="search-filters" role="group" aria-label="Search type">'+searchKinds.map(x=>'<button data-action="search-filter" data-value="'+x+'" aria-pressed="'+(x==='All')+'">'+e(x==='All'?'All':x==='Use case'?'Use cases':x==='Evidence'?'Evidence':x+'s')+'</button>').join('')+'</div><div class="search-results" id="search-results" aria-live="polite"><p>Search a concept, stable identity or phrase. Select a result to read in context.</p></div>','search-dialog');document.getElementById('search-input').focus();}
  function searchResults(){const q=document.getElementById('search-input').value,filter=dialog.querySelector('[data-action="search-filter"][aria-pressed="true"]')?.dataset.value||'All';const results=M.search(index.filter(x=>filter==='All'||(filter==='Topic'?['Topic','Chapter'].includes(x.kind):x.kind===filter)),q);const groups=[...new Set(results.map(x=>x.kind))];document.getElementById('search-results').innerHTML=!q.trim()?'<p>Search a concept, stable identity or phrase. Select a result to read in context.</p>':!results.length?'<p>No match. Try a shorter phrase or another object type.</p>':'<p class="search-count">'+results.length+(results.length===45?' leading':'')+' matching records · lexical search</p>'+groups.map(kind=>'<section class="search-group"><h3>'+e(kind==='Chapter'?'Chapters':kind)+'</h3>'+results.filter(x=>x.kind===kind).map(x=>'<'+(x.object?'button data-action="object" data-value="'+e(x.object)+'"':'a href="'+e(x.sourceId?'#/source/'+encodeURIComponent(x.sourceId)+'?page='+x.sourcePage+'&line='+M.matchingSourceLine(x.text,q):x.href)+'"')+' class="search-result"><span class="result-type">'+e(x.kind)+'</span><span><small>'+e(x.context)+'</small><strong>'+e(x.title)+'</strong><p>'+e(excerpt(x.text,q))+'</p></span>'+icon('arrow')+'</'+(x.object?'button':'a')+'>').join('')+'</section>').join('');}
  function notes(id){if(!id){showDialog('notes','Your local notes','<h2>Keep your reading context.</h2><p>Notes stay in this browser. They are personal working notes, not approved knowledge or an institutional record.</p><div class="actions">'+button('Note on this reading','note',location.hash||'#/','btn')+button('Export all notes','notes-export')+'</div>'+Object.entries(state.notes).filter(([,v])=>v.text).map(([k,v])=>'<article class="local-note"><small>'+e(k)+'</small><p>'+e(v.text)+'</p>'+button('Edit note','note',k)+'</article>').join(''));return;}
    showDialog('note','Local working note','<h2>Note on this context</h2><p class="small">'+e(id)+'</p><label class="note-field" for="note-text">Your note</label><textarea id="note-text" data-note-id="'+e(id)+'" maxlength="12000">'+e(state.notes[id]?.text||'')+'</textarea><p class="note-status" id="note-status">Saved locally as you type. Export before moving devices.</p><div class="actions">'+button('Export this note','note-export',id)+button('All notes','notes')+'</div>');document.getElementById('note-text').focus();
  }
  function nativeTab(id,el){const container=el.closest('[data-native-chapter]');const c=N.chapters.find(x=>x.id===(container?.dataset.nativeChapter||state.route.id));if(!c||!c.tabs[id])return;state.tabs=M.prepareChapter(c,state.tabs,id);
    if(state.route.view==='topic'){navigate(M.routeForTopic(c.id,id),{keepScroll:true,focus:{action:'chapter-tab',value:id}});}
    else{initNative(app);remember();announce(c.tabs[id].title+' selected.');}
  }
  function detailRecord(kind,id){if(kind==='portfolio-detail'){const record=N.portfolio[id];if(!record)return;const body=Object.entries(record).map(([k,v])=>'<div><dt>'+e(k)+'</dt><dd>'+e(typeof v==='object'?JSON.stringify(v):v)+'</dd></div>').join('');showDialog('portfolio','Portfolio context','<h2>'+e(record.name||record.title||id)+'</h2><p>Authored portfolio record. Dates, status and benefit claims retain the qualifications below; no current approval or operation is established by this view.</p><dl class="object-metadata">'+body+'</dl>'+sourceLink('hub-snapshot'));}
    else{const c=N.chapters.find(c=>c.id==='sec-portfolio'),record=c.network[Number(id)];if(!record)return;showDialog('network','Capability relationships','<h2>'+e(record.name||'Capability')+'</h2><p>These relationships describe the source’s proposed portfolio, not a deployment map.</p><dl class="object-metadata">'+Object.entries(record).map(([k,v])=>'<div><dt>'+e(k)+'</dt><dd>'+e(v)+'</dd></div>').join('')+'</dl>'+topicLink('sec-portfolio','port-matrix','Open the full portfolio'));}}
  function field(k){const f=S.fields[k],v=state.scopeInput[k]||'';let input;if(f.options)input='<select name="'+k+'"><option value="">Not established</option>'+Object.entries(f.options).map(([a,b])=>'<option value="'+a+'" '+(v===a?'selected':'')+'>'+e(b)+'</option>').join('')+'</select>';else if(f.kind==='long')input='<textarea name="'+k+'" maxlength="5000">'+e(v)+'</textarea>';else input='<input name="'+k+'" value="'+e(v)+'" maxlength="5000">';return '<label class="scope-field '+(f.kind==='long'?'wide':'')+'"><span>'+e(f.label)+(f.required?' *':'')+'</span>'+input+'</label>';}
  function scopeResult(){const r=state.scopeRecord;if(!r)return '<div class="scope-empty">'+icon('file')+'<h2>Describe the actual task.</h2><p>The tool suggests a working pattern and review questions. Unknown inputs remain unresolved.</p></div>';const eff=S.effective(r);return (!state.storageAvailable?'<p class="storage-notice">Not saved: browser storage is unavailable. Export this record before leaving.</p>':'')+'<p class="eyebrow">'+(r.result.status==='incomplete'?'Incomplete scope':'Advisory working pattern')+'</p><h2>'+e(eff.label)+'</h2><p>'+e(r.result.boundary)+'</p>'+(r.result.missing.length?'<h3>Still unknown</h3><ul>'+r.result.missing.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul>':'<p class="scope-basis">'+e(eff.basis)+'</p><p>'+e(eff.reason)+'</p>')+'<h3>Review questions</h3><ul>'+r.result.questions.map(x=>'<li>'+e(x)+'</li>').join('')+'</ul><div class="actions">'+button('Export this scope','scope-export','','btn primary')+button('Export review brief','scope-brief','','btn')+'</div>'+(r.result.pattern?'<details><summary>Propose a different pattern '+icon('plus')+'</summary><p class="scope-help">A reasoned amendment does not grant approval. The original suggestion remains in the record.</p><label class="scope-field"><span>Working pattern</span><select id="override-pattern">'+Object.entries(S.patterns).map(([k,v])=>'<option value="'+k+'" '+(Number(k)===eff.pattern?'selected':'')+'>'+e(v)+'</option>').join('')+'</select></label><label class="scope-field"><span>Reason for amendment</span><textarea id="override-reason" maxlength="5000"></textarea></label>'+button('Record advisory amendment','scope-amend','','btn')+'<p id="override-message" role="status"></p></details>':'')+'<div class="scope-meta">Record '+e(r.id)+'<br>'+e(r.engineVersion)+' · '+e(r.createdAt)+'<br>Local, editable history. No institutional audit log.</div>';}
  function scopeView(){const group=(title,keys)=>'<section class="scope-section"><h2>'+title+'</h2><div class="scope-fields">'+keys.map(field).join('')+'</div></section>';return '<header class="page-intro"><p class="eyebrow">Lifecycle · advisory scoping</p><h1 id="page-title" tabindex="-1">Start with the work<br>and its boundaries.</h1><p class="lead">A deterministic aid to frame a discussion. It assigns no formal risk tier, legal classification, approval or delivery permission.</p></header>'+(!state.storageAvailable?'<p class="storage-notice">Browser storage is unavailable. The current session and exports remain available.</p>':'')+'<div class="actions scope-actions">'+button('Load synthetic example','scope-example','','btn')+button('Clear form','scope-clear')+topicLink('sec-lifecycle','lc-scoping','Read the lifecycle scoping explanation')+'</div><div class="scope-layout"><form class="scope-form" id="scope-form" tabindex="-1" novalidate>'+group('1 · Task and responsibility',['name','owner','team','description','lifecycleStatus','changeType'])+group('2 · Information, output and use',['outputType','dataTypes','audience','influence','autonomy','frequency','systems','users','scope','context','isAgent'])+'<section class="scope-section" id="agent-fields" '+(state.scopeInput.isAgent==='yes'?'':'hidden')+'><h2>3 · Agent configuration to establish</h2><div class="scope-fields">'+S.agentFields.map(field).join('')+'</div></section><section class="scope-section"><h2>Supporting-file record</h2><label class="scope-field"><span>Record file names and metadata</span><input type="file" id="scope-files" multiple></label><p class="scope-help">File contents are not uploaded, opened or analysed. Metadata alone is not evidence verification.</p><ul class="scope-file-list" id="scope-file-list">'+fileList()+'</ul></section><button class="btn primary" type="submit">Suggest a working pattern '+icon('arrow')+'</button></form><aside class="scope-output" id="scope-output" tabindex="-1" aria-live="polite">'+scopeResult()+'</aside></div><details class="scope-history" data-disclosure="scope-history"><summary><h2>Local scope history</h2>'+icon('plus')+'</summary><p class="scope-help">'+state.history.length+' saved records in this browser. Replay retains the original input and produces a new dated record with this engine.</p>'+ (state.historyUnresolved.length?'<p class="storage-notice">'+state.historyUnresolved.length+' incompatible or unreadable records are retained without replay. Export history to recover their original data.</p>':'')+'<div class="actions">'+button('Export history','scope-history-export')+'<label class="text-link">Import scope record <input id="scope-import" type="file" accept="application/json,.json"></label></div><div id="scope-history-list">'+historyList()+'</div><p class="scope-help">Older classifier records are retained in their original browser storage. '+button('Export legacy local history','legacy-export')+' Legacy inputs can be imported for review; missing fields stay unresolved.</p></details>'+views.related([['sec-classifier','clf-how'],['sec-classifier','clf-modeldoc'],['sec-risk','risk-controls'],['sec-intelmodel','intel-checklist']]);}
  function fileList(){return state.scopeInput.files.map((f,i)=>'<li><span>'+e(f.name)+' · '+f.size+' bytes · metadata only</span>'+button('Remove','scope-file-remove',i)+'</li>').join('');}
  function historyList(){return state.history.slice().reverse().map(r=>'<article class="history-entry"><div><strong>'+e(r.input.name||'Incomplete task')+'</strong><small>'+e(S.effective(r).label)+' · '+e(r.createdAt)+'</small></div><div>'+button('Read record','scope-read',r.id)+button('Replay inputs','scope-replay',r.id)+'</div></article>').join('')||'<p class="scope-help">No saved scopes yet.</p>';}
  function persistRecord(r){state.scopeRecord=r;state.history=[...state.history.filter(x=>x.id!==r.id),r];try{state.storageAvailable=S.saveHistory(storage(),state.history,state.historyUnresolved);}catch{state.storageAvailable=false;}if(!state.storageAvailable)announce('Storage unavailable. Export this result before leaving.');}
  function newScope(){const id='scope-'+(crypto.randomUUID?crypto.randomUUID():Date.now().toString(36));const r=S.record(state.scopeInput,id,new Date().toISOString());persistRecord(r);rerender({id:'scope-output'});}
  const X=window.CLM_EXPLANATIONS.create({state,icon,button,link,objectLink,topicLink,sourceLink});
  const views=window.CLM_HUB_VIEWS.create({state,icon,button,link,objectLink,topicLink,sourceLink,scopeView,X});
  document.addEventListener('click',async event=>{
    const a=event.target.closest('a');if(a&&a.getAttribute('href')?.startsWith('#')&&!event.ctrlKey&&!event.metaKey&&!event.shiftKey&&!event.altKey){event.preventDefault();navigate(a.getAttribute('href'));return;}
    const b=event.target.closest('[data-action]');if(!b)return;const action=b.dataset.action,v=b.dataset.value;
    if(action==='close'){closeDialog();return;}
    if(action==='object'){openObject(v);return;}
    if(action==='search'){search();return;}
    if(action==='search-filter'){dialog.querySelectorAll('[data-action="search-filter"]').forEach(n=>n.setAttribute('aria-pressed',String(n===b)));searchResults();return;}
    if(action==='note'){notes(v||location.hash);return;}
    if(action==='notes'){notes();return;}
    if(action==='notes-export'){download('CLM_local_notes.json',{schemaVersion:1,exportedAt:new Date().toISOString(),notes:state.notes,boundary:'Personal working notes; not approved knowledge'});return;}
    if(action==='note-export'){download('CLM_note.json',{context:v,...state.notes[v],boundary:'Personal working note'});return;}
    if(action==='object-export'){download('CLM_object.json',{...D.objects[v],sourceRecords:D.objects[v].sources.map(id=>D.sources.find(s=>s.id===id))});return;}
    if(action==='chapter-export'){const c=N.chapters.find(c=>c.id===v);download(v+'.txt',c.title+'\n\n'+M.plain(c.html)+'\n\nSource: '+N.sourceSha256,'text/plain');return;}
    if(action==='decision-export'){download('CLM_bounded_decision.txt','Proposed bounded reuse test\n\n'+M.plain(app.innerHTML)+'\n\nExported: '+new Date().toISOString(),'text/plain');return;}
    if(action==='copy-link'){try{await navigator.clipboard.writeText(location.href);announce('Link copied.');}catch{download('CLM_link.txt',location.href,'text/plain');}return;}
    if(action==='return'){returnTo(history.state?.sourceReturn);return;}
    if(action==='theme'){theme={system:'light',light:'dark',dark:'system'}[theme];applyTheme();saveLocal('clm-ai-settings',{theme});announce('Theme: '+theme);return;}
    if(action==='presentation'){const on=document.body.classList.toggle('presentation');b.setAttribute('aria-pressed',String(on));announce(on?'Presentation view on.':'Presentation view off.');return;}
    if(action==='menu'){const on=document.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',String(on));return;}
    if(action==='inspector-tab'){if(!['definition','relationships','evidence','history'].includes(v))return;history.replaceState({...history.state,hub:true},'',routeWith('panel',v));lastHash=location.hash;state.route=M.parseRoute(location.hash);openObject(state.route.params.get('object'),false);dialog.querySelector('[data-action="inspector-tab"][data-value="'+v+'"]')?.focus({preventScroll:true});return;}
    if(action==='work-domain'){if(!D.workDomains.some(x=>x.id===v))return;navigate(routeWith('domain',v),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='knowledge-stage'){if(!['human','structured','consumed'].includes(v))return;navigate(routeWith('representation',v),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='change-case'){if(!['preparation','handoff'].includes(v))return;navigate(routeWith('case',v),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='relationship-focus'){if(!D.objects[v])return;navigate('#/relationships/'+encodeURIComponent(v)+'?depth='+(state.route.params.get('depth')==='2'?'2':'1')+'&view='+(state.route.params.get('view')==='list'?'list':'map'));return;}
    if(action==='relationship-depth'){navigate(routeWith('depth',v==='2'?'2':'1'),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='relationship-mode'){navigate(routeWith('view',v==='list'?'list':'map'),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='anchor'){state.anchor=v;rerender({action,value:v});return;}
    if(action==='subject'){state.subject=v;rerender({action,value:v});return;}
    if(action==='meaning'){navigate('#/knowledge/'+v,{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='work-continue'){navigate(routeWith('step',v),{keepScroll:true,focus:{id:'task-stage'},scrollToFocus:true});return;}
    if(action==='work-step'){navigate(routeWith('step',v),{keepScroll:true,focus:{action,value:v}});return;}
    if(action==='reset-conditions'){state.flags={...M.defaultFlags};rerender({action,value:v});return;}
    if(action==='chapter-tab'){nativeTab(v,b);return;}
    if(action==='portfolio-detail'||action==='network-detail'){detailRecord(action,v);return;}
    if(action==='scope-example'){state.scopeInput=S.normalize(S.example);state.scopeRecord=null;rerender({action,value:v});return;}
    if(action==='scope-clear'){state.scopeInput=S.blank();state.scopeRecord=null;rerender({action,value:v});return;}
    if(action==='scope-file-remove'){state.scopeInput.files.splice(Number(v),1);state.scopeRecord=null;document.getElementById('scope-file-list').innerHTML=fileList();document.getElementById('scope-output').innerHTML=scopeResult();return;}
    if(action==='scope-export'&&state.scopeRecord){download('CLM_scope.json',S.exportRecord(state.scopeRecord));return;}
    if(action==='scope-brief'&&state.scopeRecord){download('CLM_review_brief.md',S.reviewBrief(state.scopeRecord),'text/markdown');return;}
    if(action==='scope-history-export'){download('CLM_scope_history.json',{schemaVersion:1,engineVersion:S.version,records:state.history.map(S.exportRecord),unresolvedRecords:state.historyUnresolved,boundary:'Local working history; not an institutional audit log'});return;}
    if(action==='scope-amend'){try{persistRecord(S.amend(state.scopeRecord,document.getElementById('override-pattern').value,document.getElementById('override-reason').value,new Date().toISOString()));rerender({id:'scope-output'});}catch(err){document.getElementById('override-message').textContent=err.message;}return;}
    if(action==='scope-read'||action==='scope-replay'){const r=state.history.find(r=>r.id===v);if(!r)return;state.scopeInput=S.normalize(r.input);state.scopeRecord=action==='scope-read'?r:null;rerender({id:'scope-output'});return;}
    if(action==='legacy-export'){const values={};for(const key of ['clm_classifier_audit_log','clm-v17-scope-history'])values[key]=read(key,null).value;download('CLM_legacy_local_history.json',{boundary:'Unreviewed legacy browser data. Not migrated or institutionally audited.',values});return;}
  });
  document.addEventListener('input',event=>{
    const n=event.target;if(n.id==='search-input'){searchResults();return;}
    if(n.id==='note-text'){state.notes[n.dataset.noteId]={text:n.value,updatedAt:new Date().toISOString()};const ok=saveLocal('clm-ai-notes',state.notes);document.getElementById('note-status').textContent=ok?'Saved in this browser.':'Storage unavailable. Your note remains in this session; export it.';return;}
    if(n.closest('#scope-form')&&n.name){state.scopeInput[n.name]=n.value;state.scopeRecord=null;document.getElementById('scope-output').innerHTML=scopeResult();if(n.name==='isAgent')document.getElementById('agent-fields').hidden=n.value!=='yes';}
  });
  document.addEventListener('change',async event=>{
    const n=event.target;
    if(n.dataset.condition){state.flags[n.dataset.condition]=n.checked;rerender({id:n.id});requestAnimationFrame(()=>document.querySelector('[data-condition="'+n.dataset.condition+'"]')?.focus({preventScroll:true}));return;}
    if(n.id==='transfer-version'){state.transferChanged=n.checked;rerender({id:n.id});return;}
    if(n.id==='change-version'){state.changed=n.checked;rerender({id:n.id});return;}
    if(n.id==='scope-files'){state.scopeInput.files=[...state.scopeInput.files,...Array.from(n.files).map(f=>({name:f.name,size:f.size,type:f.type,lastModified:f.lastModified,contentsAnalysed:false}))];state.scopeRecord=null;document.getElementById('scope-file-list').innerHTML=fileList();document.getElementById('scope-output').innerHTML=scopeResult();return;}
    if(n.id==='scope-import'){try{const f=n.files[0];if(!f)return;if(f.size>2000000)throw new Error('Choose a scope JSON file smaller than 2 MB.');const r=JSON.parse(await f.text());if(S.validRecord(r)){state.scopeInput=S.normalize(r.input);state.scopeRecord=null;announce('Inputs imported for replay. No approval carried over.');}else if(r.input&&typeof r.input==='object'){state.scopeInput=S.normalize(r.input);state.scopeRecord=null;announce('Legacy inputs imported for review. Missing inputs remain unresolved.');}else throw new Error('Choose an individual scope record with an input object.');rerender({id:'scope-form'});}catch(err){announce(err.message);showDialog('import-error','Import could not be completed','<h2>Check the scope file.</h2><p>'+e(err.message)+'</p>');}}
  });
  document.addEventListener('submit',event=>{if(event.target.id==='scope-form'){event.preventDefault();newScope();}});
  document.addEventListener('toggle',event=>{const n=event.target;if(n.tagName==='DETAILS'&&n.dataset.disclosure&&!restoring){state.disclosures[n.dataset.disclosure]=n.open;remember();}},true);
  dialog.addEventListener('cancel',event=>{event.preventDefault();closeDialog();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)closeDialog();}});
  document.addEventListener('keydown',event=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();search();}if(event.key==='Escape'&&!dialog.open){document.body.classList.remove('menu-open');document.querySelector('[data-action="menu"]').setAttribute('aria-expanded','false');if(document.body.classList.contains('presentation'))document.querySelector('[data-action="presentation"]').click();}});
  window.addEventListener('popstate',()=>{lastHash=location.hash;const saved=history.state?.snapshot;render(saved?{...saved,scroll:readingPositions.get(history.state?.position)??saved.scroll}:undefined);});
  window.addEventListener('hashchange',()=>{if(lastHash!==location.hash){lastHash=location.hash;render();}});
  let scrollSnapshotPending=false;
  window.addEventListener('scroll',()=>{if(restoring||scrollSnapshotPending)return;scrollSnapshotPending=true;requestAnimationFrame(()=>{scrollSnapshotPending=false;if(!restoring)readingPositions.set(history.state?.position,scrollY);});},{passive:true});
  window.addEventListener('pagehide',remember);
  if(!Number.isInteger(history.state?.position))history.replaceState({...history.state,hub:true,position:0},'',location.hash||'#/');
  restore(history.state?.snapshot);render(history.state?.snapshot);
})();
