import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';

const origin=process.env.CLM_REVIEW_ORIGIN||'http://127.0.0.1:8000';
const out=process.env.CLM_REVIEW_OUTPUT||'/tmp/clm-hub-connection-review';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
for(const [name,width,height] of [['desktop',1600,1050],['tablet',920,900],['mobile',390,844]]){
  const context=await browser.newContext({viewport:{width,height},colorScheme:'light',reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.goto(origin+'/#/',{waitUntil:'networkidle'});
  const guide=page.locator('#connections');
  await guide.waitFor({state:'visible',timeout:12000});
  const lanes=guide.locator('details.connection-lane');
  const count=await lanes.count();
  if(count!==3)throw new Error(name+': expected three connected work paths, got '+count);
  await lanes.nth(1).locator('summary').click();
  const secondExpanded=await lanes.nth(1).evaluate(el=>el.open);
  if(!secondExpanded)throw new Error(name+': develop trace does not open');
  const source=await guide.locator('[data-action="object"]').count();
  if(source<10)throw new Error(name+': source object links absent');
  const domain=page.locator('#domain-knowledge');
  if(await domain.count()!==1)throw new Error(name+': knowledge journey absent');
  const stages=domain.locator('details.domain-stage');
  if(await stages.count()!==6)throw new Error(name+': expected six knowledge boundaries');
  await stages.nth(2).locator('summary').click();
  if(!await stages.nth(2).evaluate(el=>el.open))throw new Error(name+': authority boundary did not open');
  if(await stages.nth(0).evaluate(el=>el.open))throw new Error(name+': single-open accordion failed');
  const domainCapture=out+'/knowledge-'+name+'.png';
  await domain.screenshot({path:domainCapture});
  const metrics=await page.evaluate(()=>({
    scrollWidth:document.documentElement.scrollWidth,
    viewport:document.documentElement.clientWidth,
    headings:[...document.querySelectorAll('#connections h2')].map(x=>x.textContent.trim()),
    preservedFigure:!!document.querySelector('.work-atlas'),
    relationshipCards:document.querySelectorAll('#connections .connection-node').length,
    knowledgeStages:document.querySelectorAll('#domain-knowledge .domain-stage').length
  }));
  const screenshot=out+'/connections-'+name+'.png';
  await guide.screenshot({path:screenshot});
  const pass=errors.length===0&&metrics.scrollWidth<=metrics.viewport&&metrics.preservedFigure&&metrics.relationshipCards===14&&metrics.knowledgeStages===6;
  results.push({name,width,height,count,sourceLinks:source,secondExpanded,metrics,errors,screenshot,pass});
  await page.close();await context.close();
}
const context=await browser.newContext({viewport:{width:1380,height:900},reducedMotion:'reduce'});
const page=await context.newPage();
await page.goto(origin+'/#/',{waitUntil:'networkidle'});
await page.locator('#connections .connection-lane').nth(2).locator('summary').click();
await page.locator('#connections .connection-lane').nth(2).locator('.connection-follow').click();
await page.waitForTimeout(250);
const route=await page.evaluate(()=>location.hash);
results.push({name:'follow-change',route,pass:route.startsWith('#/work/change')});
await context.close();await browser.close();
await writeFile(out+'/results.json',JSON.stringify(results,null,2));
console.log(JSON.stringify(results.map(({name,pass,errors,route,metrics})=>({name,pass,errors,route,metrics})),null,2));
if(results.some(x=>!x.pass))process.exitCode=1;
