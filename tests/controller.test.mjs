/* A minimal controller host, not a DOM emulator or rendered/browser evidence. */
import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';

function host(hash){
  let current=new URL('https://example.test/CLM-AI-Knowledge-hub/'+hash),historyState=null;
  const handlers={},frames=[],elements=new Map(),focus=[],scroll=[],saved=new Map();
  const cls={remove(){},contains(){return false;},toggle(){return false;}};
  const element=id=>({id,tagName:'DIV',dataset:{},classList:cls,open:false,innerHTML:'',textContent:'',parentElement:null,
    focus(){document.activeElement=this;focus.push(this.id);},scrollIntoView(){scroll.push(this.id);},
    setAttribute(){},getAttribute(){return null;},querySelectorAll(){return [];},querySelector(){return null;},addEventListener(){},close(){this.open=false;}});
  for(const id of ['app','main','dialog','live-message'])elements.set(id,element(id));
  const app=elements.get('app'),dialog=elements.get('dialog'),theme=element('theme'),menu=element('menu');
  const document={title:'',body:{classList:cls},documentElement:{dataset:{}},activeElement:null,
    getElementById(id){
      if(elements.has(id))return elements.get(id);
      if(!app.innerHTML.includes('id="'+id+'"'))return null;
      const n=element(id);n.parentElement=app;
      if(id==='page-title')n.textContent=app.innerHTML.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1].replace(/<[^>]*>/g,'')||'';
      elements.set(id,n);return n;
    },
    querySelector(s){return s.includes('theme')?theme:s.includes('menu')?menu:null;},querySelectorAll(){return [];},
    addEventListener(type,fn){handlers[type]=fn;}
  };
  const history={scrollRestoration:'auto',get state(){return historyState;},replaceState(s,_,url){historyState=structuredClone(s);current=new URL(url,current);},pushState(s,_,url){historyState=structuredClone(s);current=new URL(url,current);}};
  const ctx={URL,URLSearchParams,Date,console,document,history,crypto:{randomUUID:()=> 'host-check'},location:{get hash(){return current.hash;},get href(){return current.href;}},localStorage:{getItem(k){return saved.get(k)??null;},setItem(k,v){saved.set(k,v);}},matchMedia:()=>({matches:false,addEventListener(){}}),requestAnimationFrame:fn=>frames.push(fn),scrollTo:()=>{},scrollY:0,setTimeout:()=>{},navigator:{},addEventListener:(type,fn)=>{handlers[type]=fn;}};
  ctx.window=ctx;vm.createContext(ctx);
  for(const f of ['data','scoping','model'])vm.runInContext(readFileSync(new URL('../src/'+f+'.js',import.meta.url),'utf8'),ctx);
  const chapters=JSON.parse(readFileSync(new URL('../src/chapters.json',import.meta.url),'utf8'));chapters.portfolio={};ctx.CLM_HUB_CHAPTERS=chapters;
  ctx.CLM_SOURCE_TEXTS={};
  for(const f of ['views','app'])vm.runInContext(readFileSync(new URL('../src/'+f+'.js',import.meta.url),'utf8'),ctx);
  function flush(){while(frames.length)frames.shift()();}
  flush();
  return {app,dialog,focus,scroll,history,handlers,flush,document,ctx,async action(action,value=''){const b={dataset:{action,value}};await handlers.click({target:{closest:s=>s==='[data-action]'?b:null}});flush();}};
}

test('A direct topic-heading route keeps focus on that heading in the controller host',()=>{
  const corpus=JSON.parse(readFileSync(new URL('../src/chapters.json',import.meta.url),'utf8'));
  const c=corpus.chapters.find(c=>c.id==='sec-intelmodel'),h=c.headings.find(h=>h.tabs.length);
  const env=host('#/topic/'+c.id+'/'+h.id);
  assert.equal(env.focus.at(-1),'native-'+h.id);
  assert.equal(env.scroll.at(-1),'native-'+h.id);
  assert.equal(env.history.scrollRestoration,'manual');
});
test('The real scoping template transitions from unresolved to an advisory result in the controller host',async()=>{
  const env=host('#/scope');assert.match(env.app.innerHTML,/Describe the actual task/);
  env.handlers.submit({target:{id:'scope-form'},preventDefault(){}});env.flush();
  assert.match(env.app.innerHTML,/Incomplete scope/);assert.doesNotMatch(env.app.innerHTML,/Record advisory amendment/);
  await env.action('scope-example');
  env.handlers.submit({target:{id:'scope-form'},preventDefault(){}});env.flush();
  assert.match(env.app.innerHTML,/Process preparation or automation/);
  assert.match(env.app.innerHTML,/Export review brief/);
  assert.match(env.app.innerHTML,/Record advisory amendment/);
  assert.doesNotMatch(env.app.innerHTML,/Incomplete scope/);
});
