(()=>{'use strict';
const {objects,sources}=window.USEFUL_OBJECTS;
const dialog=document.querySelector('dialog'),body=document.querySelector('#detail-body');
let returnFocus=null;
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const source={id:'SOURCE-L14',type:'Supplied source specimen',title:'CLIENT [14]',status:'Synthetic teaching passage · not a real client record',summary:'“I sold my company in 2024.”',fields:[['Complete supplied passage','Only line 14 is supplied. No surrounding transcript is available.'],['Absent facts','Amount, supporting evidence, categorical NP lookup and source date.'],['Authority','Invented fixture. No legal or institutional authority.'],['Source link','src/data.js → OBS-01@1 → Source field']],sources:['synthetic'],links:[['constrains what can be prepared in','OBS-01@1']]};
function showObject(id,push=true){const o=id===source.id?source:objects[id];if(!o)return;if(!dialog.open)returnFocus=document.activeElement;
body.innerHTML=`<div class="eyebrow">${esc(o.type)} · ${esc(o.id)}</div><h2 id="detail-title">${esc(o.title)}</h2><span class="status">${esc(o.status)}</span><p>${esc(o.summary)}</p><dl>${o.fields.map(([a,b])=>`<div><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>${id==='OBS-01@1'?'<h3>Reported extraction schema</h3><p>The reported output has five keys: <code>field_key, value, evidence_line_ids, confidence_level, notes</code>. Confidence is not supplied for this synthetic observation. Review and reuse annotations are separate teaching metadata.</p>':''}<h3>Source & authority</h3>${(o.sources||[]).map(s=>sources.find(v=>v.id===s)).filter(Boolean).map(s=>`<p><b>${esc(s.title)}</b><br><small>${esc(s.kind)} · ${esc(s.date)}</small><br>${esc(s.scope)}</p>`).join('')}<h3>Related objects</h3><div class="related">${o.links.filter(x=>objects[x[1]]).map(([rel,target])=>`<button data-object="${esc(target)}">${esc(rel)}<br>${esc(target)} ↗</button>`).join('')}</div>`;
if(!dialog.open)dialog.showModal();dialog.scrollTop=0;if(push){const u=new URL(location);u.hash='object='+encodeURIComponent(id);history.pushState({object:id},'',u);}document.querySelector('[data-close]').focus();}
function close(){if(dialog.open)dialog.close();returnFocus?.focus({preventScroll:true});}
document.addEventListener('click',e=>{const button=e.target.closest('[data-object]');if(button)showObject(button.dataset.object);});
document.querySelector('[data-close]').addEventListener('click',()=>{history.pushState({},'',location.pathname+location.search);close();});
dialog.addEventListener('cancel',e=>{e.preventDefault();history.pushState({},'',location.pathname+location.search);close();});
function restore(){const id=new URLSearchParams(location.hash.slice(1)).get('object');if(id)showObject(id,false);else close();}
window.addEventListener('popstate',restore);restore();
document.querySelector('[data-context-toggle]').addEventListener('change',e=>{document.body.classList.toggle('no-context',!e.target.checked);});
document.querySelectorAll('[data-review]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-review]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('[data-review-status]').textContent=button.dataset.review==='prepared'?'Preparation accepted in this demonstration only. Customer assessment and reuse remain undecided.':'More work requested in this demonstration. Missing information remains unresolved.';}));
})();
