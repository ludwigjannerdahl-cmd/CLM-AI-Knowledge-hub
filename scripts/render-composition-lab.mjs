import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';

const baseUrl = process.env.COMPOSITION_BASE_URL || 'http://127.0.0.1:4173';
const outDir = process.env.COMPOSITION_OUT_DIR || 'artifacts/v22-composition-renders';

const scenes = ['overview', 'knowledge', 'change'];
const directions = ['direction-a', 'direction-b', 'direction-c'];

await fs.mkdir(outDir, { recursive: true });

const required = [];
for (const scene of scenes) {
  for (const direction of directions) {
    required.push({
      scene,
      direction,
      file: path.join('prototypes', 'v22-composition-lab', scene, direction, 'index.html'),
      url: `${baseUrl}/${scene}/${direction}/`,
    });
  }
}

const missing = [];
for (const target of required) {
  try {
    await fs.access(target.file);
  } catch {
    missing.push(target.file);
  }
}

if (missing.length) {
  console.error('Composition sprint is not ready to render. Missing required independent directions:');
  for (const file of missing) console.error(`- ${file}`);
  console.error('Do not treat the composition lab shell as visual evidence.');
  process.exit(2);
}

const browser = await chromium.launch({ headless: true });
const results = [];

try {
  for (const target of required) {
    const page = await browser.newPage({ viewport: { width: 1920, height: 1200 }, deviceScaleFactor: 1 });
    const pageErrors = [];
    const consoleErrors = [];

    page.on('pageerror', error => pageErrors.push(String(error)));
    page.on('console', message => {
      if (message.type() === 'error') consoleErrors.push(message.text());
    });

    const response = await page.goto(target.url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      if (document.fonts?.ready) await document.fonts.ready;
    });
    await page.waitForTimeout(400);

    const metrics = await page.evaluate(() => ({
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      clientHeight: document.documentElement.clientHeight,
      scrollHeight: document.documentElement.scrollHeight,
      title: document.title,
    }));

    const slug = `${target.scene}-${target.direction}`;
    await page.screenshot({ path: path.join(outDir, `${slug}-1920x1200.png`), fullPage: false });
    await page.screenshot({ path: path.join(outDir, `${slug}-full.png`), fullPage: true });

    const interactions=[];
    if(await page.locator('[data-task]').count()){
      await page.locator('[data-task="change"]').click();assert.equal(await page.locator('body').getAttribute('data-task'),'change');assert.match(await page.locator('[data-task-field="scope"]').innerText(),/No object updates automatically/);interactions.push('Task changes the output, responsibility and visible route');
    }
    if(await page.locator('[data-revision-toggle]').count()){
      await page.locator('[data-revision-toggle]').uncheck();assert.match(await page.locator('body').getAttribute('class'),/revision-off/);assert.match(await page.locator('[data-revision-status]').innerText(),/Baseline selected/);await page.locator('[data-revision-toggle]').check();interactions.push('Revision selection changes impact scope without changing historical evidence');
    }
    if(await page.locator('[data-meaning]').count()){
      await page.locator('[data-meaning="boundary"]').click();assert.equal(await page.locator('[data-meaning="boundary"]').getAttribute('aria-pressed'),'true');assert.ok(await page.locator('[data-meaning-detail="boundary"]').isVisible());interactions.push('Meaning selection reveals its precise boundary');
    }
    if(await page.locator('[data-include]').count()){
      await page.locator('[data-include]').first().uncheck();assert.match(await page.locator('[data-packet-status]').innerText(),/incomplete/);interactions.push('Removing context leaves the packet visibly incomplete');
    }
    if(await page.locator('[data-inspect]').count()){
      await page.locator('[data-inspect]').first().click();assert.ok(await page.locator('dialog').isVisible());await page.keyboard.press('Escape');assert.ok(!await page.locator('dialog').isVisible());interactions.push('Scope inspection and keyboard return');
    }
    if(interactions.length)await page.screenshot({path:path.join(outDir,`${slug}-interaction.png`),fullPage:false});
    results.push({
      interactions,
      scene: target.scene,
      direction: target.direction,
      url: target.url,
      httpStatus: response?.status() ?? null,
      ...metrics,
      horizontalOverflow: metrics.scrollWidth > metrics.clientWidth,
      pageErrors,
      consoleErrors,
      pass: Boolean(response?.ok()) && metrics.scrollWidth === metrics.clientWidth && pageErrors.length === 0 && consoleErrors.length === 0,
    });

    await page.close();
  }
} finally {
  await browser.close();
}

await fs.writeFile(path.join(outDir, 'results.json'), JSON.stringify({ viewport: '1920x1200', results }, null, 2));

const failures = results.filter(result => !result.pass);
console.log(JSON.stringify({ rendered: results.length, failures: failures.length }, null, 2));
if (failures.length) process.exit(1);
