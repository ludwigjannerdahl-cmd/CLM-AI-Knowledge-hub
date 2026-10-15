import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const base=process.env.HUB_BASE_URL||'http://127.0.0.1:8000';
const out='reports/browser-v21';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[],interactions=[],errors=[];
// Screen dimensions are declared; CSS viewport is measured. Reduced viewports test
// zoom-equivalent reflow, not the workstation's actual browser UI or browser zoom.
const targets=[['desktop-primary',1920,1080,1],['screen-equivalent',1920,1200,1],['zoom-equivalent-125',1536,864,1.25],['zoom-equivalent-150',1280,720,1.5],['zoom-equivalent-200',960,540,2],['desktop-secondary',1440,1000,1]];
const surfaces=[['overview','#/'],['run','#/work/preparation'],['develop','#/work/development'],['change','#/work/change?case=handoff'],['knowledge','#/knowledge'],['conditions','#/conditions'],['relationships','#/relationships/CHG-REQ%401'],['evidence','#/evidence/CHG-EVID%401'],['source','#/source/operating-model'],['topic','#/topic/sec-intelmodel/intel-requirements'],['topics','#/topics'],['scope','#/scope'],['next','#/next'],['about','#/about'],['design-lab','#/design-system']];
async function pageFor(width=1920,height=1080,options={}){const page=await browser.newPage({screen:{width:1920,height:1200},viewport:{width,height},...options});page.on('pageerror',error=>errors.push(error.message));return page;}
async function load(page,hash){await page.goto(base+'/'+hash,{waitUntil:'networkidle'});await page.locator('#page-title').waitFor({state:'visible'});}
async function measure(page){return page.evaluate(()=>({innerWidth,innerHeight,screenWidth:screen.width,screenHeight:screen.height,dpr:devicePixelRatio,visualScale:visualViewport.scale,scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,title:document.querySelector('#page-title').textContent,focus:document.activeElement?.id}));}
async function capture(page,name,fullPage=true){await page.screenshot({path:`${out}/${name}.png`,fullPage});}
try{
 for(const [name,width,height,zoomEquivalent] of targets){
  const page=await pageFor(width,height);
  for(const [surface,hash] of surfaces){
   await load(page,hash);const dimensions=await measure(page);
   assert.ok(!/not found|different destination/i.test(dimensions.title),`${surface}: valid route`);
   assert.ok(dimensions.scrollWidth<=dimensions.clientWidth+2,`${surface}/${name} overflow: ${JSON.stringify(dimensions)}`);
   if(name==='desktop-primary'){await capture(page,`${surface}-${name}`);await capture(page,`${surface}-${name}-first`,false);}
   else if(['overview','conditions','topic'].includes(surface))await capture(page,`${surface}-${name}`,false);
   results.push({surface,target:name,zoomEquivalent,dimensions,status:'pass'});
  }
  await page.close();
 }
 const page=await pageFor();
 await load(page,'#/design-system');
 assert.equal(await page.locator('.lab-live-block').count(),5);
 await page.locator('[data-action="work-domain"][data-value="develop"]').click();
 assert.equal(await page.locator('[data-action="work-domain"][data-value="develop"]').getAttribute('aria-pressed'),'true');
 await page.locator('[data-action="knowledge-stage"][data-value="structured"]').click();
 assert.equal(await page.locator('[data-action="knowledge-stage"][data-value="structured"]').getAttribute('aria-pressed'),'true');
 const first=page.locator('[data-condition]').first(),before=await first.isChecked();await first.click();assert.notEqual(await page.locator('[data-condition]').first().isChecked(),before);
 await page.locator('[data-lab-check="composition"]').selectOption('pass');assert.match(await page.locator('#lab-audit-result').innerText(),/1 of 5.*pass/i);
 await page.locator('#lab-audit-surface').selectOption({label:'Develop CLM'});assert.equal(await page.locator('[data-lab-check="composition"]').inputValue(),'unknown');
 interactions.push('Design Lab: actual production controls and worksheet reset');
 await load(page,'#/?domain=change&representation=structured');
 assert.equal(await page.locator('[data-action="work-domain"][data-value="change"]').getAttribute('aria-pressed'),'true');
 await page.locator('[data-action="work-domain"][data-value="run"]').click();await page.goBack();assert.equal(await page.locator('[data-action="work-domain"][data-value="change"]').getAttribute('aria-pressed'),'true');await page.goForward();
 interactions.push('URL-backed selection and Back/Forward');
 await load(page,'#/work/change?case=handoff');
 await page.locator('.task-continuation [data-action="work-step"]').last().click();assert.match(page.url(),/step=impact/);assert.match(page.url(),/case=handoff/);
 assert.equal(await page.evaluate(()=>document.activeElement.id),'task-stage');
 await page.locator('[data-action="object"][data-value="CHG-REQ@1"]').first().click();assert.ok(await page.locator('dialog').isVisible());
 await capture(page,'object-desktop-primary',false);
 await page.locator('[data-action="inspector-tab"][data-value="relationships"]').click();
 await page.locator('dialog [data-action="close"]').click();assert.ok(!await page.locator('dialog').isVisible());assert.match(page.url(),/case=handoff/);
 interactions.push('Task progression, focus, object inspection and close');
 await page.keyboard.press('Control+k');await page.locator('#search-input').fill('INS-01');
 await capture(page,'search-desktop-primary',false);
 await page.locator('.search-result[data-action="object"]').first().click();await page.locator('dialog [data-action="close"]').click();assert.equal(await page.locator('#search-input').inputValue(),'INS-01');await page.keyboard.press('Escape');
 interactions.push('Search → object → return preserves query');
 await load(page,'#/knowledge');await page.locator('.integrated-topic summary').first().click();assert.equal(await page.locator('.integrated-topic').first().getAttribute('open'),'');
 await page.locator('.integrated-topic summary').first().focus();await page.keyboard.press('Space');assert.equal(await page.locator('.integrated-topic').first().getAttribute('open'),null);
 interactions.push('Native disclosures support keyboard');
 await load(page,'#/');await page.keyboard.press('Tab');assert.ok(await page.evaluate(()=>document.activeElement.matches('a,button,input,summary')));const focus=await page.evaluate(()=>getComputedStyle(document.activeElement).outlineStyle);assert.notEqual(focus,'none');
 await page.evaluate(()=>window.scrollTo(0,900));assert.ok(Math.abs((await page.locator('.masthead').boundingBox()).y)<2);interactions.push('Visible keyboard focus and sticky navigation');
 await page.close();
 const dark=await pageFor(1920,1080,{colorScheme:'dark',reducedMotion:'reduce'});await load(dark,'#/conditions');assert.equal(await dark.locator('html').getAttribute('data-theme'),'dark');await capture(dark,'conditions-dark-reduced-motion',false);assert.ok(await dark.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches));await dark.close();
 assert.deepEqual(errors,[]);
}finally{
 await writeFile(`${out}/BROWSER_SMOKE.json`,JSON.stringify({commit:process.env.GITHUB_SHA||'local',kind:'Chromium-rendered desktop regression; not reader validation',primary:{screen:[1920,1200],cssViewport:[1920,1080],note:'Headless simulation. User workstation viewport and native browser zoom are UNKNOWN. Zoom-equivalent checks reduce CSS viewport; they are not native zoom.'},results,interactions,pageErrors:errors,readerComprehension:'UNVERIFIED'},null,2)+'\n');
 await browser.close();
}
console.log(JSON.stringify({browserQA:'pass',surfaceChecks:results.length,interactions:interactions.length,pageErrors:errors.length},null,2));
