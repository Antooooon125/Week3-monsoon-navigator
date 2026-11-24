// The ITCZ panel's geometry against the builder's projection.
//
// - The builder replaces __ATLAS_PROJECTION__ in the adapter with coastline.json's own fit, once, so the panel's land,
//   its 65° and 95° E meridians and its latitude markers use the same projection as the game map.
// - The cited positions (Schneider et al. 2014, p. 45; Fig. 2b): the sector is 65–95° E and the markers sit at 20° N
//   (boreal summer) and 8° S (boreal winter), both inside the 800 × 450 frame and on either side of the equator.
// - The panel draws no band on the map and nothing from getWindState (the KVIS test atlas-itcz.test.mjs checks the
//   built panel; here the adapter source is checked for the panel's block).
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, mkdtempSync, rmSync, cpSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const adapter = readFileSync(new URL('../prototype/atlas.js', import.meta.url), 'utf8');
const coast = JSON.parse(readFileSync(new URL('../prototype/coastline.json', import.meta.url), 'utf8'));
const block = adapter.slice(adapter.indexOf('// ITCZ panel (2026-11-25'), adapter.indexOf("itcz.addEventListener('toggle'"));
const ITCZ = Function(`return ${block.match(/const ITCZ=(\{[^}]*\})/)[1]}`)();
const [a, b] = coast.projection.x, [c, d] = coast.projection.y;
const px = lon => a * lon + b, py = lat => c * lat + d;

test('the builder injects coastline.json\'s projection into the adapter, once', () => {
  assert.equal(adapter.split('__ATLAS_PROJECTION__').length, 2);
  const dir = mkdtempSync(join(tmpdir(), 'atlas-itcz-'));
  try {
    for (const f of ['index.html', 'prototype', 'scripts']) cpSync(join(root, f), join(dir, f), { recursive: true });
    execFileSync(process.execPath, ['scripts/build-prototype.mjs'], { cwd: dir, stdio: 'ignore' });
    const built = readFileSync(join(dir, 'prototype.html'), 'utf8');
    assert.ok(!built.includes('__ATLAS_PROJECTION__'));
    const m = built.match(/const PROJECTION=(\{[^;]*\});/);
    assert.ok(m, 'PROJECTION not found in the built page');
    assert.deepEqual(JSON.parse(m[1]), { x: coast.projection.x, y: coast.projection.y });
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test('the cited sector and latitudes, inside the frame on either side of the equator', () => {
  assert.deepEqual(ITCZ, { west: 65, east: 95, summer: 20, winter: -8 });
  for (const lon of [ITCZ.west, ITCZ.east]) assert.ok(px(lon) > 0 && px(lon) < 800);
  assert.ok(py(ITCZ.summer) > 0 && py(ITCZ.summer) < py(0) && py(ITCZ.winter) > py(0) && py(ITCZ.winter) < 450);
});

test('the panel draws no band and uses nothing from getWindState', () => {
  const code = block.replace(/^\s*\/\/.*$/gm, '');
  assert.doesNotMatch(code, /getWindState|<rect(?! width="800" height="450" class="atlas-itcz-ground")|<pattern|<mask|marker-end/);
});
