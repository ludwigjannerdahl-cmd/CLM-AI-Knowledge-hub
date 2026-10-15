import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(fileURLToPath(new URL('..',import.meta.url)));
const ctx={URLSearchParams,queueMicrotask,document:{querySelector:()=>null}};ctx.window=ctx;vm.createContext(ctx);
for(const name of ['data','explanation-data','chapters','source-texts','scoping','model','explanations','views','design-lab'])vm.runInContext(readFileSync(root+'/docs/assets/'+name+'.js','utf8'),ctx);
const D=ctx.CLM_HUB_DATA,N=ctx.CLM_HUB_CHAPTERS,M=ctx.CLM_HUB_MODEL;
const state={route:M.parseRoute('#/'),flags:{...M.defaultFlags},steps:{},tabs:{},subject:'client',changed:false,transferChanged:false,anchor:'work',workDomain:'run',knowledgeStage:'human'};
const e=M.escape;
const helpers={state,icon:()=>'<svg aria-hidden="true"></svg>',button:(l,a,v)=>'<button data-action="'+a+'" data-value="'+e(v)+'">'+e(l)+'</button>',link:(h,l)=>'<a href="'+h+'">'+e(l)+'</a>',objectLink:(id,l)=>{assert.ok(D.objects[id],'object '+id);return '<button>'+e(l||id)+'</button>';},topicLink:(c,t,l)=>'<a href="'+M.routeForTopic(c,t)+'">'+e(l)+'</a>',sourceLink:(id,l)=>{assert.ok(D.sources.some(x=>x.id===id),'source '+id);return '<a href="#/source/'+id+'">'+e(l||id)+'</a>';},scopeView:()=>'<h1>Advisory scope</h1>'};
const X=ctx.CLM_EXPLANATIONS.create(helpers);const views=ctx.CLM_HUB_VIEWS.create({...helpers,X});
const routes=['#/','#/design-system','#/topics','#/conditions','#/next','#/about',...D.layers.map(x=>'#/knowledge/'+x.id),...D.sources.map(x=>'#/source/'+x.id)];
for(const p of Object.values(D.paths))for(const [id] of p.steps)routes.push('#/work/'+p.id+'?step='+id);
for(const [step] of D.paths.change.steps)routes.push('#/work/change?case=handoff&step='+step);
for(const id of Object.keys(D.objects))for(const depth of [1,2])for(const mode of ['map','list'])routes.push('#/relationships/'+encodeURIComponent(id)+'?depth='+depth+'&view='+mode);
for(const o of Object.values(D.objects))if(M.objectKind(o)==='Evidence')routes.push('#/evidence/'+encodeURIComponent(o.id));
routes.push('#/source/strategy?page=1&line=3');
for(const c of N.chapters){routes.push('#/topic/'+c.id);for(const id of Object.keys(c.tabs))routes.push('#/topic/'+c.id+'/'+id);}
const errors=[];let links=0;const snapshots=[];
function checkLinks(html,context){for(const match of html.matchAll(/href="(#[^"]*)"/g)){const r=M.parseRoute(match[1].replace(/&amp;/g,'&'));links++;if(r.view==='topic'){const c=N.chapters.find(c=>c.id===r.id);if(!c)errors.push(context+': missing chapter '+r.id);else if(r.target&&!c.tabs[r.target]&&!c.anchors[r.target]&&!c.html.includes('id="native-'+r.target+'"'))errors.push(context+': missing target '+r.id+'/'+r.target);}else if(r.view==='source'&&!D.sources.some(s=>s.id===r.id))errors.push(context+': missing source '+r.id);else if(r.view==='not-found')errors.push(context+': unknown route '+match[1]);}}
for(const route of routes){state.route=M.parseRoute(route);const html=views.render();snapshots.push({route,html});assert.match(html,/<h1/,'Page title: '+route);assert.doesNotMatch(html,/undefined|\[object Object\]/,'Template failure '+route);checkLinks(html,route);}
state.route=M.parseRoute('#/design-system');
const lab=views.render();
assert.match(lab,/Runtime Design Lab/);assert.match(lab,/Live runtime specimens/);assert.match(lab,/Semantic stress tests/);assert.match(lab,/Cross-domain coverage/);assert.match(lab,/Promotion gates/);assert.match(lab,/Manual acceptance worksheet/);assert.match(lab,/data-lab-check=/);assert.match(lab,/data-action="work-domain"/);assert.match(lab,/data-action="knowledge-stage"/);assert.match(lab,/data-condition=/);assert.match(lab,/relationship-explorer/);assert.match(lab,/Evidence answers a narrower question/);checkLinks(lab,'design lab');snapshots.push({route:'design-lab:acceptance-workbench',html:lab});
for(const workDomain of ['run','develop','change']){state.workDomain=workDomain;state.route=M.parseRoute('#/design-system');const html=views.render();assert.match(html,/work-atlas/);assert.doesNotMatch(html,/undefined|\[object Object\]/);snapshots.push({route:'design-lab:work-domain:'+workDomain,html});}
for(const knowledgeStage of ['human','structured','consumed']){state.knowledgeStage=knowledgeStage;state.route=M.parseRoute('#/design-system');const html=views.render();assert.match(html,/transformation-pattern/);assert.doesNotMatch(html,/undefined|\[object Object\]/);snapshots.push({route:'design-lab:knowledge-stage:'+knowledgeStage,html});}
for(const o of Object.values(D.objects))for(const panel of ['definition','relationships','evidence','history']){const html=X.dossier(o,panel);snapshots.push({route:'dossier:'+o.id+'/'+panel,html});assert.doesNotMatch(html,/undefined|\[object Object\]/);checkLinks(html,'dossier '+o.id+'/'+panel);}
for(const step of D.paths.change.steps){state.route=M.parseRoute('#/work/change?case=handoff&step='+step[0]);state.transferChanged=true;const html=views.render();snapshots.push({route:'transfer-revision:'+step[0],html});checkLinks(html,'transfer revision');assert.doesNotMatch(html,/undefined/);state.route=M.parseRoute('#/work/change?step='+step[0]);state.changed=true;const primary=views.render();snapshots.push({route:'preparation-revision:'+step[0],html:primary});checkLinks(primary,'preparation revision');}
for(const workDomain of ['run','develop','change'])for(const knowledgeStage of ['human','structured','consumed']){state.route=M.parseRoute('#/');state.workDomain=workDomain;state.knowledgeStage=knowledgeStage;const html=views.render();snapshots.push({route:'overview:'+workDomain+'/'+knowledgeStage,html});checkLinks(html,'overview variant');}
for(let mask=0;mask<256;mask++){state.flags=Object.fromEntries(D.conditions.map((c,i)=>[c.id,!!(mask&(1<<i))]));const html=X.conditionRoutes();assert.match(html,/No write action/);snapshots.push({route:'conditions:'+mask,html});}
for(const c of N.chapters){for(const html of [c.html,...Object.values(c.panels)]){checkLinks(html,c.id);assert.doesNotMatch(html,/<script|<iframe|on(?:click|load|error)=|javascript:/i);}}
const classifier=N.chapters.find(c=>c.id==='sec-classifier');for(const id of ['clf-tool','clf-history']){assert.doesNotMatch(classifier.panels[id],/KPI.Reporting|Ludwig|CLF[-_]?2026|clf-result|clf-form/i);assert.match(classifier.panels[id],/#\/scope/);}
for(const s of D.sources)if(s.file)assert.ok(existsSync(root+'/docs/'+s.file),'Missing file: '+s.file);
const entry=readFileSync(root+'/docs/index.html','utf8');let staticAssets=0;
for(const match of entry.matchAll(/(?:src|href)="(assets\/[^"?#]+)(?:\?[^"#]*)?"/g)){assert.ok(existsSync(root+'/docs/'+match[1]),'Missing entry asset '+match[1]);staticAssets++;}
assert.doesNotMatch(entry,/(?:src|href)="\/(?:assets|sources)\//,'Repository-relative assets required');
assert.ok(existsSync(root+'/docs/.nojekyll'));assert.ok(existsSync(root+'/docs/assets/design-lab.js'));assert.equal(staticAssets,12);
const full=N.chapters.map(c=>M.plain(c.html)).join('\n')+'\n'+JSON.stringify(N.portfolio);
assert.doesNotMatch(full,/Outreach reduction measured in prototype testing|31% outreach reduction validated|Every cycle compounds the value|New data flows.*automatically into products/i);
assert.doesNotMatch(full,/Already NPAC-approved and operational|Every system that connects to the layer increases|No governance overhead|KAICY and CDD tools likely in scope|A system is always high-risk if it profiles|now in force as of 2 Aug(?:ust)? 2026/i);
assert.equal(N.chapters.length,13);assert.equal(N.chapters.reduce((n,c)=>n+Object.keys(c.tabs).length,0),81);assert.equal(Object.keys(N.portfolio).length,21);assert.equal(N.chapters.find(c=>c.id==='sec-portfolio').network.length,11);
for(const c of N.chapters)for(const t of Object.values(c.tabs)){const s=M.prepareChapter(c,{},t.id);assert.equal(s[t.group],t.id);for(const a of t.ancestors)assert.equal(s[c.tabs[a].group],a);}
const report={version:D.version,kind:'Source and template execution checks; not browser rendering',routesExecuted:routes.length,linksChecked:links,chapters:N.chapters.length,topicTabs:81,portfolioRecords:21,errors:[...new Set(errors)],dossierStates:Object.keys(D.objects).length*4,conditionCombinations:256,snapshotStates:snapshots.length,designLabAsset:true,designLabRoute:true,designLabLiveSpecimens:5,designLabSemanticStressTests:6,designLabManualWorksheet:true,browserQA:'Not performed by this script',readerValidation:'Not performed'};
mkdirSync(root+'/reports',{recursive:true});writeFileSync(root+'/reports/STRUCTURE_CHECK.json',JSON.stringify(report,null,2)+'\n');
const snapshotArg=process.argv.indexOf('--html-snapshots');if(snapshotArg!==-1){assert.ok(process.argv[snapshotArg+1]);writeFileSync(process.argv[snapshotArg+1],JSON.stringify(snapshots));}
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
