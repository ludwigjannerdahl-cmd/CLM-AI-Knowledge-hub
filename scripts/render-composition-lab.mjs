import {chromium} from 'playwright';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const root='prototypes/v22-composition-lab/useful-work';
const out='artifacts/v22-composition-renders';await fs.mkdir(out,{recursive:true});
const variants=['direction-a','direction-b','direction-c'];
try{await fs.access(`${root}/revised/index.html`);variants.push('revised');}catch{}
const browser=await chromium.launch({headless:true});const results=[];
try{for(const variant of variants){
 const page=await browser.newPage({viewport:{width:1920,height:1200},deviceScaleFactor:1});const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
 const response=await page.goto(`http://127.0.0.1:4173/useful-work/${variant}/`,{waitUntil:'networkidle'});await page.evaluate(()=>document.fonts.ready);
 await page.screenshot({path:`${out}/useful-${variant}-1920x1200.png`});await page.screenshot({path:`${out}/useful-${variant}-full.png`,fullPage:true});
 const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:innerHeight,scrollHeight:document.documentElement.scrollHeight,objects:[...document.querySelectorAll('[data-node]')].map(e=>({node:e.dataset.node,top:e.getBoundingClientRect().top,bottom:e.getBoundingClientRect().bottom})),fonts:document.fonts.check('16px SEB')}));
 assert.equal(metrics.width,metrics.scrollWidth,'Horizontal overflow');
 const trigger=page.locator('[data-object="SOURCE-L14"]').first();await trigger.click();assert.ok(await page.locator('dialog').isVisible());assert.match(await page.locator('#detail-body').innerText(),/Only line 14/);
 await page.keyboard.press('Escape');assert.ok(!await page.locator('dialog').isVisible());assert.ok(await trigger.evaluate(el=>el===document.activeElement));
 for(const id of ['INS-01@1','CTX-FENX@2026-08-18','METHOD-01@1','OBS-01@1','REQ-01@1','TEST-01@1','EVID-01@1']){
  const control=page.locator(`button[data-object="${id}"]`).first();await control.click();assert.ok(await page.locator('dialog').isVisible());assert.match(await page.locator('#detail-body').innerText(),new RegExp(id.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')));await page.keyboard.press('Escape');
 }
 await page.locator('[data-object="REQ-01@1"]').first().click();await page.locator('dialog [data-object="TEST-01@1"]').click();await page.goBack();assert.match(await page.locator('#detail-body').innerText(),/Preserve absent information as absent/);await page.keyboard.press('Escape');
 await page.locator('[data-context-toggle]').uncheck();assert.ok(await page.locator('.unmapped-field').isVisible());await page.locator('[data-context-toggle]').check();
 await page.locator('[data-review="prepared"]').click();assert.match(await page.locator('[data-review-status]').innerText(),/reuse remain undecided/);
 await page.locator('[data-object="EVID-01@1"]').first().click();assert.match(await page.locator('#detail-body').innerText(),/Not supplied/);await page.screenshot({path:`${out}/useful-${variant}-inspection.png`});await page.keyboard.press('Escape');
 if(variant==='revised'){
  assert.ok(metrics.objects.every(o=>o.bottom<=1200),'All core artifacts must fit the first frame');
  assert.match(await page.locator('.test .eyebrow').innerText(),/Proposed test/i);await page.locator('[data-trace=amount]').click();assert.equal(await page.locator('.trace-active').count(),4);assert.match(await page.locator('[data-trace-status]').innerText(),/proposed test/);await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:`${out}/useful-revised-trace-amount.png`});
  await page.locator('[data-context-toggle]').uncheck();await page.reload({waitUntil:'networkidle'});assert.ok(await page.locator('.unmapped-field').isVisible());assert.equal(await page.locator('[data-trace=amount]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('[data-review=prepared]').getAttribute('aria-pressed'),'true');await page.locator('[data-context-toggle]').check();

  await page.evaluate(()=>scrollTo(0,0));await page.emulateMedia({reducedMotion:'reduce'});await page.screenshot({path:`${out}/useful-revised-reduced-motion.png`});
  await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth),390);await page.screenshot({path:`${out}/useful-revised-mobile.png`,fullPage:true});
 }
 assert.equal(errors.length,0);results.push({variant,status:response.status(),metrics,errors,interactions:['source read and focus return','all canonical objects','related object and browser back','missing field context withholds mapping','task acceptance does not approve reuse','evidence remains absent']});await page.close();
}}finally{await browser.close();await fs.writeFile(`${out}/results.json`,JSON.stringify(results,null,2));}
console.log(JSON.stringify({rendered:results.length,errors:0}));
