(function (root) {
  'use strict';
  const D=root.CLM_HUB_DATA;
  const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const defaultFlags={context:true,interface:false,contract:false,access:false,runtime:false,evaluation:false,recovery:false,owner:false};
  function normalizeFlags(input={}) {return Object.fromEntries(D.conditions.map(c=>[c.id,input[c.id]===true]));}
  function assessConditions(input) {
    const f=normalizeFlags(input),missing=keys=>keys.filter(k=>!f[k]);
    const liveMissing=missing(['interface','access']);
    const serviceMissing=missing(['context','access','runtime','evaluation','recovery','owner']);
    return [
      {id:'documents',title:'Analyse supplied material',state:'Available within a permitted document task',available:true,body:f.context?'Reviewed context can make the task more specific. Source fidelity and human verification still matter.':'Document analysis remains possible. Domain-specific interpretation is limited until the relevant context and applicability are established.',missing:[]},
      {id:'development',title:'Develop a deterministic feature',state:'Does not require an AI runtime in production',available:true,body:'AI can assist requirements, code and tests during development. The delivered feature may run deterministically. It still needs the actual engineering review and release route.',missing:[]},
      {id:'retrieval',title:'Retrieve current case information',state:liveMissing.length?'Relevant read route is missing':f.contract?'Read route and information contract assumed':'Read route assumed; quality/freshness unresolved',available:!liveMissing.length,body:liveMissing.length?'Supplied-document preparation can continue. Live retrieval cannot be assumed without both an interface and permitted access.':f.contract?'In this scenario, current information can be retrieved within the defined read scope. This does not grant write authority.':'A retrievable value is not automatically fit for use. Its meaning, freshness and quality still need to be established.',missing:liveMissing.length?liveMissing:missing(['contract'])},
      {id:'shared',title:'Offer supported shared preparation',state:serviceMissing.length?'Shared-service conditions remain':f.interface&&f.contract?'Shared preparation with live context assumed':'Shared preparation on supplied inputs assumed',available:!serviceMissing.length,body:serviceMissing.length?'A local prototype can still explain the method. A shared assistant needs configured operation, evaluation, permitted consumption and ownership.':'These are scenario assumptions, not a release verdict. The actual configured service and its approval route still need evidence. Without a live interface it works on supplied inputs.',missing:serviceMissing}
    ];
  }
  function parseRoute(hash='') {
    let raw=hash.replace(/^#/,'');
    const old={overview:'/',examples:'/work/preparation',system:'/knowledge',unlocks:'/conditions',decisions:'/next',scope:'/scope',reference:'/topics'};
    if(Object.hasOwn(old,raw))raw=old[raw];
    if(raw.startsWith('sec-'))raw='/topic/'+raw;
    if(raw.startsWith('library/'))raw='/topic/'+raw.slice(8);
    if(raw.startsWith('examples/'))raw='/work/'+({kaicy:'preparation',fenx:'development',amlr:'change'}[raw.slice(9)]||'preparation');
    const [path='/',query='']=raw.split('?');
    let parts;try{parts=path.split('/').filter(Boolean).map(decodeURIComponent);}catch{parts=[];}
    const q=new URLSearchParams(query),view=parts[0]||'overview';
    if(!['overview','work','knowledge','conditions','next','topics','topic','source','scope','about'].includes(view))return {view:'not-found',id:parts[0],params:q,path};
    return {view,id:parts[1]||'',target:parts[2]||'',params:q,path:path||'/'};
  }
  function routeForTopic(chapter,target=''){return '#/topic/'+encodeURIComponent(chapter)+(target?'/'+encodeURIComponent(target):'');}
  function prepareChapter(c,selection={},target='') {
    const next={...selection};
    for(const g of c.groups)if(!g.tabs.includes(next[g.id]))next[g.id]=g.default;
    const select=tid=>{const t=c.tabs[tid];if(t)next[t.group]=tid;};
    if(c.tabs[target]){for(const a of c.tabs[target].ancestors)select(a);select(target);}
    else {for(const a of c.anchors[target]||[])select(a);}
    return next;
  }
  function chapterMarkup(c,selection) {
    return c.html.replace(/(<(?:section|div)\b[^>]*data-native-panel="([^"]+)"[^>]*)(>)/g,(_,a,id,z)=>a+(selection[c.tabs[id]?.group]===id?'':' hidden')+z)
      .replace(/(<button\b[^>]*data-native-control="([^"]+)"[^>]*aria-pressed=")false"/g,(_,a,id)=>a+(selection[c.tabs[id]?.group]===id?'true':'false')+'"');
  }
  const plain=html=>String(html).replace(/<[^>]+>/g,' ').replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#39;/g,"'").replace(/\s+/g,' ').trim();
  const fold=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
  function search(index,query) {
    const words=fold(query.trim()).split(/\s+/).filter(Boolean);if(!words.length)return [];
    return index.map(x=>{const text=fold(x.title+' '+x.text),title=fold(x.title);return {...x,score:words.every(w=>text.includes(w))?words.reduce((n,w)=>n+(title.includes(w)?8:1),0):0};}).filter(x=>x.score).sort((a,b)=>b.score-a.score).slice(0,45);
  }
  function safeRead(getStorage,key,fallback) {try{const value=getStorage().getItem(key);return {value:value===null?fallback:JSON.parse(value),available:true};}catch{return {value:fallback,available:false};}}
  function safeWrite(getStorage,key,value){try{getStorage().setItem(key,JSON.stringify(value));return true;}catch{return false;}}
  function normalizeNotes(value){if(!value||typeof value!=='object'||Array.isArray(value))return {};return Object.fromEntries(Object.entries(value).filter(([id,n])=>id.length<300&&n&&typeof n.text==='string').map(([id,n])=>[id,{text:n.text.slice(0,12000),updatedAt:typeof n.updatedAt==='string'?n.updatedAt:null}]));}
  function changeImpact(changed){return {instruction:changed?'INS-01@2':'INS-01@1',affected:changed?['REQ-01@1','MAP-01@1','TEST-01@1']:[],evidence:{id:'EVID-01@1',instruction:'INS-01@1',result:null,currentCoverage:changed?'Not established for version 2':'No observed result supplied'}};}
  root.CLM_HUB_MODEL={escape,defaultFlags,normalizeFlags,assessConditions,parseRoute,routeForTopic,prepareChapter,chapterMarkup,plain,search,safeRead,safeWrite,normalizeNotes,changeImpact};
})(typeof window!=='undefined'?window:globalThis);
