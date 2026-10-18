import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';

const source = readFileSync(new URL('../src/views.js',import.meta.url),'utf8');
const css = readFileSync(new URL('../src/visual-ambition.css',import.meta.url),'utf8');
const authored = readFileSync(new URL('../src/data.js',import.meta.url),'utf8');
const semanticData = readFileSync(new URL('../src/explanation-data.js',import.meta.url),'utf8');
const root = {};
vm.runInNewContext(source,{window:root,globalThis:root});

function renderOverview(){
  root.CLM_HUB_DATA={objects:{},
    workDomains:[
      {id:'run',route:'#/work/preparation'},
      {id:'develop',route:'#/work/development'},
      {id:'change',route:'#/work/change'}
    ],
    paths:{
      preparation:{id:'preparation',label:'Prepare an observation'},
      development:{id:'development',label:'Develop a behaviour'},
      change:{id:'change',label:'Analyse an instruction change'}
    }
  };
  vm.runInNewContext(semanticData,{window:root,globalThis:root});
  root.CLM_HUB_MODEL={escape:value=>String(value),routeForTopic:(c,t)=>'#/topic/'+c+'/'+t};
  root.CLM_HUB_CHAPTERS={chapters:[]};
  const deps={
    state:{workDomain:'run',route:{view:'overview'}},
    icon:()=>'<svg></svg>',
    button:()=>'<button>Search</button>',
    link:(href,label)=>'<a href="'+href+'">'+label+'</a>',
    objectLink:(id,label)=>'<button data-id="'+id+'">'+label+'</button>',
    topicLink:(c,t,label)=>'<a href="#/topic/'+c+'">'+label+'</a>',
    sourceLink:(id,label)=>'<a href="#/source/'+id+'">'+label+'</a>',
    scopeView:()=>'', X:{workIllustration:()=>'<figure>Legacy illustration</figure>',transformation:()=>'<section>Legacy meaning view</section>',conditionRoutes:()=>'<figure>Existing condition routes</figure>'}
  };
  return root.CLM_HUB_VIEWS.create(deps).render();
}

test('all three linked explanatory cases appear in the real homepage view',()=>{
  const html=renderOverview();
  assert.equal((html.match(/class="connection-lane"/g)||[]).length,3);
  for(const href of ['#/work/preparation','#/work/development','#/work/change'])
    assert.ok(html.includes('href="'+href+'"'),'Missing navigable path '+href);
  assert.ok(html.includes('Legacy illustration'),'Must preserve earlier visual content');
  assert.ok(html.includes('Legacy meaning view'),'Must preserve earlier ontology explanation');
});

test('native disclosure is accessible without new custom event handlers',()=>{
  const html=renderOverview();
  assert.ok(html.includes('aria-labelledby="connection-guide-title"'));
  assert.equal((html.match(/<summary>/g)||[]).length,9);
  assert.ok(html.includes('connection-lane" name="clm-paths" open>'),'First path should orient a new reader');
  assert.equal((html.match(/name="clm-paths"/g)||[]).length,3,'One-open native accordion groups all three paths');
  assert.ok(html.includes('id="connections"'));
  assert.ok(css.includes('@media(max-width:720px)'),'Mobile rendering contract');
  assert.ok(css.includes('prefers-reduced-motion:reduce'),'Motion contract');
});

test('source-backed object identity and epistemic distinctions stay explicit',()=>{
  const html=renderOverview();
  for(const id of ['INS-01@1','INS-01@2','REQ-01@1','MAP-01@1','TEST-01@1','EVID-01@1','CTX-FENX@2026-08-18','METHOD-01@1','OBS-01@1','REUSE-01@1']){
    assert.ok(html.includes('data-id="'+id+'"'),id+' missing in explanation');
    assert.ok(authored.includes("'"+id+"'"),id+' missing from source inventory');
  }
  assert.ok(html.includes('A test case is not an executed test'));
  assert.ok(html.includes('Not approved'));
  assert.ok(html.includes('No observed result'));
  assert.ok(html.includes('not verified') || html.includes('not approved') || html.includes('not an executed test'));
});

test('manage and decision boundaries exist without asserting runtime readiness',()=>{
  const html=renderOverview();
  for(const text of ['Manage CLM','Portfolio & dependencies','Lifecycle ownership','Controls & assurance','What this does not prove'])
    assert.ok(html.includes(text),text+' missing');
  assert.ok(html.includes('not verified system integrations'));
  assert.ok(html.includes('not an automatic fourth execution sequence'));
});

test('work traces have one canonical authored data source, not view-local copies',()=>{
  assert.ok(source.includes('const lanes=D.connectionTraces'));
  assert.ok(!source.includes('const lanes=['));
  assert.ok(semanticData.includes('D.connectionTraces=['));
  assert.ok(semanticData.includes('Synthetic links are not assertions of deployed integration'));
});
