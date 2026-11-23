// Convert Natural Earth land polygons into the map's SVG frame (one-off; output is pinned).
//
//   node scripts/coastline.mjs <path to ne_50m_land.geojson>
//
// Source: Natural Earth 1:50m Land, v5.1.2 (public domain), from
// https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_land.geojson
// (SHA-256 e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b).
//
// Projection: equirectangular, x = a·lon + b and y = c·lat + d, fitted by least squares to the
// five ports' real coordinates and their fixed positions in the game's PORTS table (index.html).
// The engine's port positions are not moved; the fit and its residuals are recorded.
// Rings are clipped to the 800 × 450 viewBox plus a 12-unit margin, simplified with
// Douglas–Peucker at TOLERANCE map units, and rings smaller than MIN_AREA square units dropped.
// Writes prototype/coastline.json.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE_SHA256 = 'e874b27a51d146452be360cafb3cc50c86001074a67d534113e6534682f9826b';
const TOLERANCE = 0.75, MIN_AREA = 6, MARGIN = 12, W = 800, H = 450;
// Real positions (decimal degrees): Kilwa Kisiwani, Aden, Calicut (Kozhikode), Malacca, Quanzhou.
const REAL = { kilwa: [39.51, -8.96], aden: [45.02, 12.79], calicut: [75.78, 11.25], malacca: [102.25, 2.19], quanzhou: [118.68, 24.87] };

const input = process.argv[2];
if (!input) throw new Error('Usage: node scripts/coastline.mjs <ne_50m_land.geojson>');
const raw = readFileSync(input);
const sha = createHash('sha256').update(raw).digest('hex');
if (sha !== SOURCE_SHA256) throw new Error(`Unexpected source file (SHA-256 ${sha})`);
const geo = JSON.parse(raw.toString('utf8'));

// Port positions from the game itself.
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const ports = {};
for (const m of html.matchAll(/(\w+): \{\s*id: "\w+",\s*name: "[^"]+",\s*region: "[^"]+",\s*x: (\d+), y: (\d+)/g)) ports[m[1]] = [+m[2], +m[3]];
const fit1 = (xs, ys) => { const n = xs.length, mx = xs.reduce((a, b) => a + b) / n, my = ys.reduce((a, b) => a + b) / n;
  const s = xs.reduce((a, x, i) => a + (x - mx) * (ys[i] - my), 0) / xs.reduce((a, x) => a + (x - mx) ** 2, 0); return [s, my - s * mx]; };
const ids = Object.keys(REAL);
const [a, b] = fit1(ids.map(k => REAL[k][0]), ids.map(k => ports[k][0]));
const [c, d] = fit1(ids.map(k => REAL[k][1]), ids.map(k => ports[k][1]));
const project = ([lon, lat]) => [a * lon + b, c * lat + d];
const residuals = Object.fromEntries(ids.map(k => { const [x, y] = project(REAL[k]); return [k, [+(x - ports[k][0]).toFixed(1), +(y - ports[k][1]).toFixed(1)]]; }));

// Sutherland–Hodgman against the four edges of the margin box.
const box = [-MARGIN, -MARGIN, W + MARGIN, H + MARGIN];
const clip = ring => {
  let out = ring;
  const edges = [[p => p[0] >= box[0], (p, q) => [box[0], p[1] + (q[1] - p[1]) * (box[0] - p[0]) / (q[0] - p[0])]],
    [p => p[0] <= box[2], (p, q) => [box[2], p[1] + (q[1] - p[1]) * (box[2] - p[0]) / (q[0] - p[0])]],
    [p => p[1] >= box[1], (p, q) => [p[0] + (q[0] - p[0]) * (box[1] - p[1]) / (q[1] - p[1]), box[1]]],
    [p => p[1] <= box[3], (p, q) => [p[0] + (q[0] - p[0]) * (box[3] - p[1]) / (q[1] - p[1]), box[3]]]];
  for (const [inside, cut] of edges) {
    const src = out; out = [];
    for (let i = 0; i < src.length; i++) {
      const p = src[i], q = src[(i + 1) % src.length];
      if (inside(q)) { if (!inside(p)) out.push(cut(p, q)); out.push(q); } else if (inside(p)) out.push(cut(p, q));
    }
    if (!out.length) break;
  }
  return out;
};
const dp = (pts, tol) => {
  if (pts.length < 3) return pts;
  const [p, q] = [pts[0], pts.at(-1)]; let max = -1, at = 0;
  for (let i = 1; i < pts.length - 1; i++) {
    const [x, y] = pts[i], dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy);
    const dist = len ? Math.abs(dy * x - dx * y + q[0] * p[1] - q[1] * p[0]) / len : Math.hypot(x - p[0], y - p[1]);
    if (dist > max) { max = dist; at = i; }
  }
  if (max <= tol) return [p, q];
  return [...dp(pts.slice(0, at + 1), tol).slice(0, -1), ...dp(pts.slice(at), tol)];
};
const area = r => r.reduce((s, p, i) => { const q = r[(i + 1) % r.length]; return s + p[0] * q[1] - q[0] * p[1]; }, 0) / 2;
const simplifyRing = ring => {
  // Split the closed ring at its farthest point from the first so Douglas–Peucker keeps both halves.
  let far = 0, fd = -1; ring.forEach((p, i) => { const dd = Math.hypot(p[0] - ring[0][0], p[1] - ring[0][1]); if (dd > fd) { fd = dd; far = i; } });
  return [...dp(ring.slice(0, far + 1), TOLERANCE).slice(0, -1), ...dp([...ring.slice(far), ring[0]], TOLERANCE).slice(0, -1)];
};

const paths = [];
let kept = 0, dropped = 0;
for (const f of geo.features) {
  const polys = f.geometry.type === 'Polygon' ? [f.geometry.coordinates] : f.geometry.coordinates;
  for (const poly of polys) {
    const parts = [];
    for (const ring of poly) {
      const projected = ring.slice(0, -1).map(project);
      const clipped = clip(projected);
      if (clipped.length < 3) continue;
      const simple = simplifyRing(clipped);
      if (simple.length < 3 || Math.abs(area(simple)) < MIN_AREA) { dropped++; continue; }
      kept++;
      parts.push('M' + simple.map(([x, y]) => `${+x.toFixed(1)},${+y.toFixed(1)}`).join('L') + 'Z');
    }
    if (parts.length) paths.push(parts.join(''));
  }
}
const out = {
  source: { dataset: 'Natural Earth 1:50m Land', version: 'v5.1.2', licence: 'Public domain (naturalearthdata.com/about/terms-of-use)',
    url: 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/v5.1.2/geojson/ne_50m_land.geojson', sha256: SOURCE_SHA256 },
  projection: { kind: 'equirectangular, least-squares fit to the five ports', x: [+a.toFixed(6), +b.toFixed(4)], y: [+c.toFixed(6), +d.toFixed(4)],
    realPorts: REAL, residualsMapUnits: residuals },
  simplification: { method: 'Douglas–Peucker', toleranceMapUnits: TOLERANCE, minRingAreaSquareUnits: MIN_AREA, clipBox: box, ringsKept: kept, ringsDropped: dropped },
  paths
};
writeFileSync(resolve(root, 'prototype/coastline.json'), JSON.stringify(out, null, 1) + '\n');
console.log(`coastline.json: ${paths.length} paths, ${kept} rings (${dropped} dropped), ${(paths.join('').length / 1024).toFixed(1)} KB of path data; residuals`, JSON.stringify(residuals));
