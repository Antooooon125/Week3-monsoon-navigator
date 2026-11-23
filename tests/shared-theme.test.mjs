// The builder's opt-in shared-foundation import (--shared-theme,
// --shared-theme-revision). Each case runs the real builder; prototype.html is
// restored byte for byte afterwards, and the no-argument build must still
// reproduce it.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const builder = fileURLToPath(new URL('../scripts/build-prototype.mjs', import.meta.url));
const outFile = fileURLToPath(new URL('../prototype.html', import.meta.url));
const index = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const saved = readFileSync(outFile);
const REV = 'a'.repeat(40);
const BLOCK = `:root{\n  --f-display:var(--kvis-font-display,"Archivo",sans-serif);\n  --f-body:var(--kvis-font-body,"Atkinson Hyperlegible",sans-serif);\n  --f-mono:var(--kvis-font-mono,"IBM Plex Mono",monospace);\n  --kvis-space-2:8px; --kvis-space-4:16px; --kvis-space-6:24px;\n  --kvis-control-min-size:44px; --kvis-focus-width:3px; --kvis-focus-offset:2px;\n}\n[hidden]{display:none!important}\n`;
const theme = body => `/* page theme */\n/* KVIS foundations:begin */\n${body}/* KVIS foundations:end */\n:root{--outside-sentinel-x7:1}\n`;
const dir = mkdtempSync(join(tmpdir(), 'atlas-shared-'));
const build = (...args) => execFileSync(process.execPath, [builder, ...args], { stdio: 'pipe' });
const withTheme = (css, rev = REV) => { const f = join(dir, 'theme.css'); writeFileSync(f, css); return build('--shared-theme', f, '--shared-theme-revision', rev); };
const engineOf = html => [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);

test.after(() => { writeFileSync(outFile, saved); rmSync(dir, { recursive: true, force: true }); });

test('a marked block is inlined once, with its revision and checksum; the engine is unchanged', () => {
  withTheme(theme(BLOCK));
  const html = readFileSync(outFile, 'utf8');
  const sha = createHash('sha256').update(BLOCK).digest('hex');
  assert.equal(html.split('<style id="atlas-foundations"').length, 2);
  assert.ok(html.includes(`<style id="atlas-foundations" data-source-revision="${REV}" data-foundations-sha256="${sha}">${BLOCK}</style>`));
  assert.ok(html.indexOf('id="atlas-foundations"') < html.indexOf('id="atlas-style"'), 'foundations come before Atlas styles');
  assert.ok(!html.includes('--outside-sentinel-x7'), 'nothing outside the marked block is imported');
  for (const r of ['display', 'body', 'mono']) assert.match(html, new RegExp(`--kvis-font-${r}:`));
  assert.deepEqual(engineOf(html), engineOf(index), 'engine script byte-identical');
});

for (const [name, css, rev] of [
  ['missing block', '/* no block */\n:root{}\n', REV],
  ['duplicated block', theme(BLOCK) + theme(BLOCK), REV],
  ['empty block', theme('\n'), REV],
  ['missing token', theme(BLOCK.replace('--kvis-space-6:24px;', '')), REV],
  ['mutable revision', theme(BLOCK), 'main'],
  ['short revision', theme(BLOCK), 'a'.repeat(7)]
]) {
  test(`the build fails on a ${name}`, () => {
    assert.throws(() => withTheme(css, rev));
  });
}

test('an unknown or half-given option fails', () => {
  assert.throws(() => build('--shared-theme'));
  assert.throws(() => build('--theme', 'x'));
});

test('the build without options still reproduces the committed prototype.html', () => {
  build();
  assert.ok(readFileSync(outFile).equals(saved));
});
