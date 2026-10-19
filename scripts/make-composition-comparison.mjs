import fs from 'node:fs/promises';
import path from 'node:path';

// This script intentionally does not bundle reference images in the public repo.
// It writes a self-contained HTML review sheet that can point to private/local
// reference captures when a design session provides them.

const scene = process.argv[2];
if (!['overview', 'knowledge', 'change'].includes(scene)) {
  console.error('Usage: node scripts/make-composition-comparison.mjs <overview|knowledge|change>');
  process.exit(2);
}

const renderDir = process.env.COMPOSITION_RENDER_DIR || 'artifacts/v22-composition-renders';
const refDir = process.env.V22_REFERENCE_DIR || '';
const outDir = process.env.COMPOSITION_REVIEW_DIR || 'artifacts/v22-composition-review';
await fs.mkdir(outDir, { recursive: true });

const directions = ['direction-a', 'direction-b', 'direction-c'];
const images = directions.map(direction => ({
  label: direction.replace('direction-', 'Direction ').toUpperCase(),
  src: path.relative(outDir, path.join(renderDir, `${scene}-${direction}-1920x1200.png`)),
}));

const referenceNote = refDir
  ? `Private reference directory supplied at review time: ${refDir}`
  : 'Reference images remain private builder inputs. Open the private reference atlas beside this sheet.';

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>V22 ${scene} comparison</title>
<style>
body{margin:0;background:#f3f1e9;color:#12201c;font:15px/1.5 Arial,sans-serif}main{max-width:1920px;margin:auto;padding:38px 48px 80px}h1{font-size:48px;letter-spacing:-.04em;margin:.2em 0}.note{color:#66736e;max-width:80ch}.grid{display:grid;grid-template-columns:1fr;gap:28px;margin-top:32px}.item{background:#fffef9;border:1px solid #d9ded8;padding:14px}.item h2{font-size:18px;margin:4px 0 12px}.item img{display:block;width:100%;height:auto;background:#e8e6dd}.review{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-top:28px}.review div{background:#fffef9;border:1px solid #d9ded8;padding:16px}.review strong{display:block;margin-bottom:6px}@media(max-width:900px){main{padding:24px}.review{grid-template-columns:1fr}}
</style></head><body><main>
<p>V22 · 1920×1200 composition review</p><h1>${scene[0].toUpperCase()+scene.slice(1)}</h1>
<p class="note">${referenceNote}</p>
<section class="grid">${images.map(image => `<article class="item"><h2>${image.label}</h2><img src="${image.src}" alt="${image.label}"></article>`).join('')}</section>
<section class="review"><div><strong>Largest visual gap</strong><span>Complete during review.</span></div><div><strong>Largest semantic risk</strong><span>Complete during review.</span></div><div><strong>Reject</strong><span>Name at least one direction.</span></div><div><strong>Revision move</strong><span>One composition-level change.</span></div></section>
</main></body></html>`;

await fs.writeFile(path.join(outDir, `${scene}-comparison.html`), html);
console.log(path.join(outDir, `${scene}-comparison.html`));
