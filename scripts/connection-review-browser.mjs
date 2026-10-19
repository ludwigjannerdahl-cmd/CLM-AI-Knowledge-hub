import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';

/* Real browser acceptance for the generated Hub. Does not certify reader comprehension or SEB release approval. */
const origin=process.env.CLM_REVIEW_ORIGIN||'http://127.0.0.1:8000';
const out=process.env.CLM_REVIEW_OUTPUT||'/tmp/clm-hub-connection-review';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
const assert=(condition,message)=>{if(!condition)throw Error(message)};

for(const [name,width,height] of [['desktop',1600,1050],['tablet',920,900],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height},colorScheme:'light',reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',error=>errors.push(String(error)));
  await page.goto(origin+'/#/',{waitUntil:'networkidle'});
  const atlas=page.locator('#semantic-atlas');
  await atlas.waitFor({state:'visible',timeout:12000});
  assert(await atlas.locator('.atlas-node').count()===8,name+': missing semantic concepts');
  assert(await atlas.locator('[data-action="semantic-perspective"]').count()===3,name+': missing reasoning lenses');
  assert(await atlas.locator('.atlas-edge').count()===10,name+': missing typed connectors');
  assert(await atlas.locator('h3#semantic-atlas-title').count()===1,name+': semantic model lacks heading');

  await atlas.locator('[data-action="semantic-perspective"][data-value="bounded"]').click();
  assert(await atlas.locator('[data-action="semantic-perspective"][data-value="bounded"]').getAttribute('aria-pressed')==='true',name+': lens not selected');
  assert((await atlas.locator('.atlas-focus-question').innerText()).includes('unchecked authority'),name+': lens explanation not changed');
  const data=atlas.locator('[data-action="semantic-node"][data-value="data"]');
  await data.focus();
  await data.press('Enter');
  assert(await atlas.locator('[data-action="semantic-node"][data-value="data"]').getAttribute('aria-pressed')==='true',name+': keyboard concept selection failed');
  assert((await atlas.locator('.atlas-inspector h3').innerText()).includes('case evidence'),name+': inspector did not follow model');
  assert((await atlas.locator('.atlas-detail-boundary').innerText()).includes('unknown'),name+': boundary lost after selection');

  await atlas.locator('[data-action="semantic-perspective"][data-value="reuse"]').click();
  await atlas.locator('[data-action="semantic-node"][data-value="meaning"]').click();
  const knowledgeForm=atlas.locator('details.atlas-knowledge-forms');
  await knowledgeForm.locator('summary').click();
  assert(await knowledgeForm.evaluate(element=>element.open),name+': knowledge forms disclosure failed');
  assert(await knowledgeForm.locator('li').count()===5,name+': missing complementary knowledge forms');
  await knowledgeForm.locator('summary').click();

  // Remove the fixed header only for evidence screenshots; it can otherwise obscure tall sections.
  // Evidence capture only: fixed navigation and the accessible skip-link would otherwise appear in stitched element screenshots.
  await page.addStyleTag({content:'.masthead{position:static!important}.skip-link{visibility:hidden!important}'});
  const atlasImage=out+'/semantic-atlas-'+name+'.png';
  await atlas.screenshot({path:atlasImage,animations:'disabled'});
  const homepage=await page.evaluate(()=>({
    scrollWidth:document.documentElement.scrollWidth,
    viewport:document.documentElement.clientWidth,
    atlasNodes:document.querySelectorAll('#semantic-atlas .atlas-node').length,
    semanticSourceLoaded:!!window.CLM_SEMANTIC_SOURCE,
    oldFigurePreserved:!!document.querySelector('.work-atlas')
  }));
  assert(homepage.scrollWidth<=homepage.viewport,name+': horizontal overflow on overview');
  assert(homepage.semanticSourceLoaded&&homepage.oldFigurePreserved,name+': source/visual continuity missing');

  const guide=page.locator('#connections');
  assert(await guide.locator('details.connection-lane').count()===3,name+': existing work paths missing');
  await guide.locator('details.connection-lane').nth(1).locator('summary').click();
  assert(await guide.locator('details.connection-lane').nth(1).evaluate(el=>el.open),name+': prior paths no longer work');
  await guide.screenshot({path:out+'/connections-'+name+'.png',animations:'disabled'});

  await page.goto(origin+'/#/knowledge',{waitUntil:'networkidle'});
  const layer=page.locator('.semantic-layer-study');
  assert(await layer.locator('li').count()===4,name+': semantic representation layers missing');
  const competency=page.locator('#semantic-competency');
  assert(await competency.count()===1,name+': competency lab missing on knowledge route');
  assert(await competency.locator('details.semantic-question').count()===7,name+': seven competency questions expected');
  const allowed=competency.locator('[data-action="semantic-fixture"][data-value="permitted_fixture"]');
  await allowed.focus();
  await allowed.press('Enter');
  assert(await competency.locator('[data-action="semantic-fixture"][data-value="permitted_fixture"]').getAttribute('aria-pressed')==='true',name+': hypothetical permission case not selected');
  assert((await competency.locator('.semantic-fixture-outcome').innerText()).includes('not proof of real runtime permission'),name+': permission simulation boundary missing');
  const unknown=competency.locator('[data-action="semantic-fixture"][data-value="unknown_grant"]');
  await unknown.click();
  assert((await competency.locator('.semantic-fixture-outcome').innerText()).includes('Permission decision is unknown'),name+': unknown permission no longer fail-closed');
  const question=competency.locator('details.semantic-question').nth(2);
  await question.locator('summary').click();
  assert(await question.evaluate(el=>el.open),name+': question disclosure failed');
  assert((await question.innerText()).toLowerCase().includes('no observed task-scoped runtime grant'),name+': evidence gap missing');
  await page.addStyleTag({content:'.masthead{position:static!important}.skip-link{visibility:hidden!important}'});
  await competency.screenshot({path:out+'/semantic-competency-'+name+'.png',animations:'disabled'});
  const detailed=page.locator('#domain-knowledge');
  assert(await detailed.locator('details.domain-stage').count()===6,name+': prior deep case was lost');
  await detailed.locator('details.domain-stage').nth(2).locator('summary').click();
  assert(await detailed.locator('details.domain-stage').nth(2).evaluate(el=>el.open),name+': deep case fails native keyboard disclosure');
  // Evidence capture only: fixed navigation and the accessible skip-link would otherwise appear in stitched element screenshots.
  await page.addStyleTag({content:'.masthead{position:static!important}.skip-link{visibility:hidden!important}'});
  await layer.screenshot({path:out+'/meaning-layers-'+name+'.png',animations:'disabled'});
  const knowledge=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:document.documentElement.clientWidth}));
  assert(knowledge.scrollWidth<=knowledge.viewport,name+': horizontal overflow on knowledge page');
  const pass=errors.length===0;
  results.push({name,pass,errors,homepage,knowledge,atlasImage,knowledgeStages:6});
  await page.close();await context.close();
}
const context=await browser.newContext({viewport:{width:1380,height:900},reducedMotion:'reduce'});
const page=await context.newPage();
await page.goto(origin+'/#/',{waitUntil:'networkidle'});
await page.locator('#connections details.connection-lane').nth(2).locator('summary').click();
await page.locator('#connections details.connection-lane').nth(2).locator('.connection-follow').click();
await page.waitForTimeout(250);
const route=await page.evaluate(()=>location.hash);
results.push({name:'follow-change',route,pass:route.startsWith('#/work/change')});
await context.close();await browser.close();
await writeFile(out+'/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({name,pass,errors,route,homepage,knowledge})=>({name,pass,errors,route,homepage,knowledge})),null,2));
if(results.some(r=>!r.pass))process.exitCode=1;
