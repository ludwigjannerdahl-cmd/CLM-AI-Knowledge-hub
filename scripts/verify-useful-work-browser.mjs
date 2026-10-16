/* Run only in an environment whose browser QA is permitted. Never invoked by build.
   Usage: CLM_QA_BASE_URL=http://127.0.0.1:4173/ node scripts/verify-useful-work-browser.mjs
   Requires an already running preview and Playwright supplied by that environment. */
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
if(process.env.SITES_MANAGED_LINUX_CONTAINER==='1')throw Error('This environment requires control-browser. Do not run this alternative browser path here.');
const base=process.env.CLM_QA_BASE_URL;if(!base)throw Error('Set CLM_QA_BASE_URL to an authorised preview URL.');
const {chromium}=await import('playwright');
const out=process.env.CLM_QA_OUTPUT||'artifacts/v23-useful-work';await fs.mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const report={kind:'Native browser QA',base,viewport:{width:1920,height:1200},renders:[],failures:[],readerComprehension:'UNVERIFIED',visualExcellence:'Requires human inspection of actual renders'};
const check=(condition,message)=>{if(!condition)report.failures.push(message);};
try{
 for(const composition of ['a','b','c']){
  const page=await browser.newPage({viewport:report.viewport,deviceScaleFactor:1});const errors=[];
  page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.goto(base+'#/useful-work?composition='+composition,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
  const geometry=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,regions:[...document.querySelectorAll('.uw-source,.uw-context,.uw-workpaper,.uw-method,.uw-review,.uw-checks')].map(n=>({class:n.className,top:n.getBoundingClientRect().top,bottom:n.getBoundingClientRect().bottom})),text:document.querySelector('#uw-scene').innerText}));
  await page.screenshot({path:`${out}/${composition}-1920x1200.png`});await page.screenshot({path:`${out}/${composition}-full.png`,fullPage:true});
  check(geometry.width===geometry.scrollWidth,composition+': horizontal overflow');
  check(geometry.regions.every(r=>r.top>=0&&r.bottom<=1200),composition+': a core source/work/context/review/check region falls outside the first frame');
  check(geometry.text.includes('Source')&&geometry.text.includes('draft'),composition+': missing teaching payload');
  for(const id of ['UW-SOURCE@1','UW-INSTRUCTION@1','UW-CONTEXT@1','UW-METHOD@1','UW-OUTPUT@1','UW-REQ@1','UW-TEST@1','UW-REVIEW@1']){
   // Controls may be in a primary scene or its connected inspection depth.
   const trigger=page.locator(`[data-action="object"][data-value="${id}"]`).first();
   if(await trigger.count()){await trigger.click();check(await page.locator('dialog').isVisible(),composition+': object dialog did not open '+id);check((await page.locator('dialog').innerText()).includes(id),composition+': wrong object '+id);await page.keyboard.press('Escape');check(await trigger.evaluate(n=>n===document.activeElement),composition+': focus return failed '+id);}
  }
  await page.locator('[data-action="uw-country"][data-value="NO"]').click();await page.locator('[data-action="uw-material"][data-value="supplied"]').click();
  const snapshot=await page.evaluate(()=>window.CLM_USEFUL_WORK.exportState(new URLSearchParams(location.hash.split('?')[1])));
  assert.equal(snapshot.task.jurisdiction,'NO');assert.equal(snapshot.context.binding.length,0);
  await page.locator('[data-action="uw-view"][data-value="compiler"]').first().click();
  check(await page.locator('#uw-detail').evaluate(n=>n===document.activeElement),composition+': detail focus failed');
  await page.locator('[data-action="object"][data-value="UW-SCOPE-NO@1"]').click();
  check((await page.locator('dialog').innerText()).includes('APPLIES'),composition+': incorrect Norway applicability');
  await page.locator('dialog a[href="#/source/useful-work-source"]').click();
  await page.locator('[data-action="return"]').click();check(await page.locator('dialog').isVisible(),composition+': source return lost inspector');
  await page.keyboard.press('Escape');await page.locator('[data-action="uw-country"][data-value="missing"]').click();
  check((await page.locator('.uw-applicability').innerText()).includes('jurisdiction is not supplied'),composition+': unknown country did not expose missing reason');
  await page.reload({waitUntil:'networkidle'});check((await page.locator('.uw-applicability').innerText()).includes('jurisdiction is not supplied'),composition+': reload lost scenario');
  await page.goBack();check(new URLSearchParams(page.url().split('?')[1]).get('country')==='NO',composition+': browser history lost country');
  // Exercise shared search through the actual controller.
  await page.locator('[data-action="search"]').click();await page.locator('#search-input').fill('UW-REQ');
  check((await page.locator('dialog').innerText()).includes('Missing information stays missing'),composition+': search omitted new work objects');await page.keyboard.press('Escape');
  await page.goto(base+'#/useful-work?composition='+composition,{waitUntil:'networkidle'});
  for(const width of [1536,1280,390]){await page.setViewportSize({width,height:width===390?844:960});await page.screenshot({path:`${out}/${composition}-${width}.png`,fullPage:true});check(await page.evaluate(()=>document.documentElement.scrollWidth===innerWidth),composition+': overflow at '+width);}
  await page.setViewportSize(report.viewport);await page.emulateMedia({reducedMotion:'reduce'});await page.screenshot({path:`${out}/${composition}-reduced-motion.png`});
  await page.evaluate(()=>document.documentElement.dataset.theme='dark');await page.screenshot({path:`${out}/${composition}-dark.png`});
  check(errors.length===0,composition+': browser errors '+errors.join('; '));report.renders.push({composition,geometry,errors});await page.close();
 }
}finally{await browser.close();await fs.writeFile(out+'/results.json',JSON.stringify(report,null,2)+'\n');}
console.log(JSON.stringify(report));if(report.failures.length)process.exitCode=1;
