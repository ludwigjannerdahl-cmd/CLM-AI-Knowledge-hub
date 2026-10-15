import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const baseUrl=process.env.COMPOSITION_BASE_URL||'http://127.0.0.1:4173';
const outDir=process.env.COMPOSITION_OUT_DIR||'artifacts/v22-composition-renders';
const stories=[
  ['useful-work-first','Useful work first'],
  ['meaning-that-can-travel','Meaning that can travel'],
  ['change-creates-questions','Change creates questions']
];
await fs.mkdir(outDir,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
try{
  for(const [story,title] of stories){
    const page=await browser.newPage({viewport:{width:1920,height:1200},deviceScaleFactor:1});
    const pageErrors=[];const consoleErrors=[];
    page.on('pageerror',e=>pageErrors.push(String(e)));
    page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text());});
    const url=`${baseUrl}/story-lab/?story=${story}&mode=understand&step=1`;
    const response=await page.goto(url,{waitUntil:'networkidle'});
    await page.evaluate(async()=>{if(document.fonts?.ready)await document.fonts.ready;});
    await page.waitForTimeout(500);
    assert.equal((await page.locator('[data-story-title]').innerText()).trim(),title);
    assert.equal(await page.locator('[data-mode="understand"]').getAttribute('aria-selected'),'true');
    assert.ok(await page.locator('[data-preview]').getAttribute('src'));
    const metrics=await page.evaluate(()=>({clientWidth:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth,clientHeight:document.documentElement.clientHeight,scrollHeight:document.documentElement.scrollHeight,title:document.title}));
    await page.screenshot({path:path.join(outDir,`story-${story}-understand-1920x1200.png`),fullPage:false});

    await page.locator('[data-mode="explore"]').click();
    assert.equal(await page.locator('[data-mode="explore"]').getAttribute('aria-selected'),'true');
    assert.match(page.url(),/mode=explore/);
    await page.locator('.step-list button').nth(2).click();
    assert.match(page.url(),/step=3/);
    await page.waitForTimeout(200);
    await page.screenshot({path:path.join(outDir,`story-${story}-explore-step3.png`),fullPage:false});

    await page.locator('[data-mode="inspect"]').click();
    assert.equal(await page.locator('[data-mode="inspect"]').getAttribute('aria-selected'),'true');
    assert.ok((await page.locator('[data-step-risk]').innerText()).trim().length>0);

    results.push({story,url,httpStatus:response?.status()??null,...metrics,horizontalOverflow:metrics.scrollWidth>metrics.clientWidth,pageErrors,consoleErrors,pass:Boolean(response?.ok())&&metrics.scrollWidth===metrics.clientWidth&&pageErrors.length===0&&consoleErrors.length===0});
    await page.close();
  }
}finally{await browser.close();}
await fs.writeFile(path.join(outDir,'story-lab-results.json'),JSON.stringify({viewport:'1920x1200',results},null,2));
const failures=results.filter(r=>!r.pass);
console.log(JSON.stringify({stories:results.length,failures:failures.length},null,2));
if(failures.length)process.exit(1);
