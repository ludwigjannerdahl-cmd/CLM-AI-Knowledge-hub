import {chromium} from 'playwright';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';

const base=process.env.HUB_BASE_URL||'http://127.0.0.1:8000';
const out='reports/browser-v21';
await mkdir(out,{recursive:true});
const browser=await chromium.launch({headless:true});
const results=[];
const viewports=[
  ['desktop-1440',1440,1000],
  ['laptop-1280',1280,900],
  ['tablet-768',768,1024],
  ['mobile-390',390,844],
  ['mobile-320',320,760]
];
const surfaces=[
  ['overview','#/'],
  ['develop','#/work/development'],
  ['change','#/work/change?case=handoff'],
  ['knowledge','#/knowledge'],
  ['conditions','#/conditions'],
  ['relationships','#/relationships/REQ-01%401'],
  ['evidence','#/evidence/EVID-01%401']
];
async function overflow(page){return page.evaluate(()=>({scroll:document.documentElement.scrollWidth,client:document.documentElement.clientWidth,body:document.body.scrollWidth}));}
async function load(page,hash){await page.goto(base+'/'+hash,{waitUntil:'networkidle'});await page.locator('#page-title').waitFor({state:'visible'});}
try{
  for(const [name,width,height] of viewports){
    const page=await browser.newPage({viewport:{width,height}});
    await load(page,'#/design-system');
    assert.match(await page.locator('#page-title').innerText(),/Use the product to test the product/i);
    assert.equal(await page.locator('.lab-live-block').count(),5,'five live runtime specimens');
    assert.ok(await page.locator('[data-lab-check]').count()>=5,'manual acceptance checks present');
    const o=await overflow(page);assert.ok(o.scroll<=o.client+2,`${name} Design Lab horizontal overflow ${JSON.stringify(o)}`);
    await page.locator('[data-action="work-domain"][data-value="develop"]').click();
    assert.equal(await page.locator('[data-action="work-domain"][data-value="develop"]').getAttribute('aria-pressed'),'true');
    await page.locator('[data-action="knowledge-stage"][data-value="structured"]').click();
    assert.equal(await page.locator('[data-action="knowledge-stage"][data-value="structured"]').getAttribute('aria-pressed'),'true');
    const firstCondition=page.locator('[data-condition]').first();const before=await firstCondition.isChecked();await firstCondition.click();assert.notEqual(await page.locator('[data-condition]').first().isChecked(),before,'condition toggle changes scenario state');
    await page.locator('[data-lab-check="composition"]').selectOption('pass');
    assert.match(await page.locator('#lab-audit-result').innerText(),/1 of 5.*pass/i);
    await page.locator('#lab-audit-surface').selectOption({label:'Develop CLM'});
    assert.equal(await page.locator('[data-lab-check="composition"]').inputValue(),'unknown','changing surface resets manual observations');
    await page.screenshot({path:`${out}/design-lab-${name}.png`,fullPage:true});
    results.push({surface:'design-lab',viewport:name,overflow:o,status:'pass'});
    await page.close();
  }
  for(const [surface,hash] of surfaces){
    for(const [name,width,height] of [['desktop-1440',1440,1000],['mobile-390',390,844]]){
      const page=await browser.newPage({viewport:{width,height}});await load(page,hash);const o=await overflow(page);assert.ok(o.scroll<=o.client+2,`${surface}/${name} horizontal overflow ${JSON.stringify(o)}`);assert.ok((await page.locator('h1').first().innerText()).trim().length>0);await page.screenshot({path:`${out}/${surface}-${name}.png`,fullPage:true});results.push({surface,viewport:name,overflow:o,status:'pass'});await page.close();
    }
  }
  await writeFile(`${out}/BROWSER_SMOKE.json`,JSON.stringify({kind:'browser-rendered automated smoke checks; not reader validation',base,results},null,2)+'\n');
  console.log(JSON.stringify({browserQA:'pass',screenshots:results.length,viewports:viewports.length,surfaces:surfaces.length,report:`${out}/BROWSER_SMOKE.json`},null,2));
} finally {await browser.close();}
