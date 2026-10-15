import {readFileSync,writeFileSync,existsSync,mkdirSync} from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {resolve} from 'node:path';
const root=resolve(import.meta.dirname,'..');
const ctx={URLSearchParams};ctx.window=ctx;vm.createContext(ctx);
for(const name of ['data','chapters','source-texts','scoping','model','views'])vm.runInContext(readFileSync(root+'/docs/assets/'+name+'.js','utf8'),ctx);
const D=ctx.CLM_HUB_DATA,N=ctx.CLM_HUB_CHAPTERS,M=ctx.CLM_HUB_MODEL;
const state={route:M.parseRoute('#/'),flags:{...M.defaultFlags},steps:{},tabs:{},subject:'client',changed:false,anchor:'work'};
const e=M.escape;
const views=ctx.CLM_HUB_VIEWS.create({state,icon:()=>'<svg aria-hidden="true"></svg>',button:(l,a,v)=>'<button data-action="'+a+'" data-value="'+e(v)+'">'+e(l)+'</button>',link:(h,l)=>'<a href="'+h+'">'+e(l)+'</a>',objectLink:(id,l)=>{assert.ok(D.objects[id],'object '+id);return '<button>'+e(l||id)+'</button>';},topicLink:(c,t,l)=>'<a href="'+M.routeForTopic(c,t)+'">'+e(l)+'</a>',sourceLink:(id,l)=>{assert.ok(D.sources.some(x=>x.id===id),'source '+id);return '<a href="#/source/'+id+'">'+e(l||id)+'</a>';},scopeView:()=>'<h1>Advisory scope</h1>'});
const routes=['#/','#/topics','#/conditions','#/next','#/about',...D.layers.map(x=>'#/knowledge/'+x.id),...D.sources.map(x=>'#/source/'+x.id)];
for(const p of Object.values(D.paths))for(const [id] of p.steps)routes.push('#/work/'+p.id+'?step='+id);
for(const c of N.chapters){routes.push('#/topic/'+c.id);for(const id of Object.keys(c.tabs))routes.push('#/topic/'+c.id+'/'+id);}
const errors=[];let links=0;
function checkLinks(html,context){for(const match of html.matchAll(/href="(#[^"]*)"/g)){const r=M.parseRoute(match[1].replace(/&amp;/g,'&'));links++;if(r.view==='topic'){const c=N.chapters.find(c=>c.id===r.id);if(!c)errors.push(context+': missing chapter '+r.id);else if(r.target&&!c.tabs[r.target]&&!c.anchors[r.target]&&!c.html.includes('id="native-'+r.target+'"'))errors.push(context+': missing target '+r.id+'/'+r.target);}else if(r.view==='source'&&!D.sources.some(s=>s.id===r.id))errors.push(context+': missing source '+r.id);else if(r.view==='not-found')errors.push(context+': unknown route '+match[1]);}}
for(const route of routes){state.route=M.parseRoute(route);const html=views.render();assert.match(html,/<h1/,'Page title: '+route);assert.doesNotMatch(html,/undefined|\[object Object\]/,'Template failure '+route);checkLinks(html,route);}
for(const c of N.chapters){for(const html of [c.html,...Object.values(c.panels)]){checkLinks(html,c.id);assert.doesNotMatch(html,/<script|<iframe|on(?:click|load|error)=|javascript:/i);}}
const classifier=N.chapters.find(c=>c.id==='sec-classifier');for(const id of ['clf-tool','clf-history']){assert.doesNotMatch(classifier.panels[id],/KPI.Reporting|Ludwig|CLF[-_]?2026|clf-result|clf-form/i);assert.match(classifier.panels[id],/#\/scope/);}
for(const s of D.sources)if(s.file)assert.ok(existsSync(root+'/docs/'+s.file),'Missing file: '+s.file);
const full=N.chapters.map(c=>M.plain(c.html)).join('\n')+'\n'+JSON.stringify(N.portfolio);
assert.doesNotMatch(full,/Outreach reduction measured in prototype testing|31% outreach reduction validated|Every cycle compounds the value|New data flows.*automatically into products/i);
assert.equal(N.chapters.length,13);assert.equal(N.chapters.reduce((n,c)=>n+Object.keys(c.tabs).length,0),81);assert.equal(Object.keys(N.portfolio).length,21);assert.equal(N.chapters.find(c=>c.id==='sec-portfolio').network.length,11);
for(const c of N.chapters)for(const t of Object.values(c.tabs)){const s=M.prepareChapter(c,{},t.id);assert.equal(s[t.group],t.id);for(const a of t.ancestors)assert.equal(s[c.tabs[a].group],a);}
const report={version:D.version,kind:'Source and template execution checks; not browser rendering',routesExecuted:routes.length,linksChecked:links,chapters:N.chapters.length,topicTabs:81,portfolioRecords:21,errors:[...new Set(errors)],browserQA:'Not performed: control-browser unavailable in the managed environment',readerValidation:'Not performed'};
mkdirSync(root+'/reports',{recursive:true});writeFileSync(root+'/reports/STRUCTURE_CHECK.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));if(errors.length)process.exitCode=1;
