// Every sea lane the adapter draws runs over water on the inlined coastline.
//
// Reads the waypoints from prototype/atlas.js and the land from prototype/coastline.json,
// builds each lane exactly as the adapter's lanePath does (straight to the first midpoint,
// then a quadratic through each waypoint), samples it every 0.25 map units, and requires:
// no sample inside land (even-odd over all rings), and at least MIN_CLEARANCE units of water
// from the coast outside PORT_ZONE units of either port. Ports are fixed by the engine and sit
// on the coast, so the zone around them is exempt.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const PORT_ZONE = 9, MIN_CLEARANCE = 1.5;
const adapter = readFileSync(new URL('../prototype/atlas.js', import.meta.url), 'utf8');
const coast = JSON.parse(readFileSync(new URL('../prototype/coastline.json', import.meta.url), 'utf8'));
const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const PORTS = {};
for (const m of html.matchAll(/(\w+): \{\s*id: "\w+",\s*name: "[^"]+",\s*region: "[^"]+",\s*x: (\d+), y: (\d+)/g)) PORTS[m[1]] = [+m[2], +m[3]];
const rings = coast.paths.flatMap(d => d.split('Z').filter(Boolean).map(r => r.replace(/^M/, '').split('L').map(p => p.split(',').map(Number))));

export function waypointsFrom(source) {
  const m = source.match(/const seaWaypoints=(\{[\s\S]*?\n  \});/);
  if (!m) throw new Error('seaWaypoints not found in atlas.js');
  return Function(`return ${m[1]}`)();
}
const inside = ([x, y]) => { let c = false; for (const r of rings) for (let i = 0, j = r.length - 1; i < r.length; j = i++) { const [xi, yi] = r[i], [xj, yj] = r[j]; if ((yi > y) !== (yj > y) && x < (xj - xi) * (y - yi) / (yj - yi) + xi) c = !c; } return c; };
const segDist = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
const clearance = p => { let d = Infinity; for (const r of rings) for (let i = 0; i < r.length; i++) d = Math.min(d, segDist(p, r[i], r[(i + 1) % r.length])); return d; };
// The adapter's lanePath, as points.
export function lanePoints(points) {
  const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], out = [];
  const line = (a, b) => { const n = Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) * 4); for (let k = 0; k <= n; k++) out.push([a[0] + (b[0] - a[0]) * k / n, a[1] + (b[1] - a[1]) * k / n]); };
  if (points.length === 2) { line(points[0], points[1]); return out; }
  let cur = mid(points[0], points[1]); line(points[0], cur);
  for (let i = 1; i < points.length - 1; i++) {
    const end = i < points.length - 2 ? mid(points[i], points[i + 1]) : points[i + 1], c = points[i];
    for (let k = 0; k <= 400; k++) { const t = k / 400, u = 1 - t; out.push([u * u * cur[0] + 2 * u * t * c[0] + t * t * end[0], u * u * cur[1] + 2 * u * t * c[1] + t * t * end[1]]); }
    cur = end;
  }
  return out;
}
export function checkLanes(waypoints) {
  const problems = [];
  for (const [key, mids] of Object.entries(waypoints)) {
    const [a, b] = key.split('-'), pts = [PORTS[a], ...mids, PORTS[b]];
    let worst = Infinity, at = null;
    for (const p of lanePoints(pts)) {
      if (Math.hypot(p[0] - pts[0][0], p[1] - pts[0][1]) < PORT_ZONE || Math.hypot(p[0] - pts.at(-1)[0], p[1] - pts.at(-1)[1]) < PORT_ZONE) continue;
      if (inside(p)) { problems.push({ lane: key, onLand: p.map(v => +v.toFixed(1)) }); break; }
      const c = clearance(p); if (c < worst) { worst = c; at = p.map(v => +v.toFixed(1)); }
    }
    if (worst < MIN_CLEARANCE) problems.push({ lane: key, clearance: +worst.toFixed(2), at });
  }
  return problems;
}

const waypoints = waypointsFrom(adapter);
test('every lane in the adapter runs over water on the inlined coastline', () => {
  assert.deepEqual(Object.keys(waypoints).sort(), ['aden-calicut', 'calicut-malacca', 'kilwa-aden', 'kilwa-calicut', 'malacca-quanzhou']);
  assert.deepEqual(checkLanes(waypoints), []);
});
test('the check fails when one waypoint is moved onto land', () => {
  // Planted: the Sri Lanka waypoint moved north into the island; and one moved onto the Horn of Africa.
  for (const [lane, index, point] of [['calicut-malacca', 3, [420, 210]], ['kilwa-aden', 3, [170, 210]]]) {
    const planted = structuredClone(waypoints);
    planted[lane][index] = point;
    assert.ok(checkLanes(planted).some(p => p.lane === lane), `${lane} waypoint ${index} → ${point} was not caught`);
  }
});

// Sea labels and the wind clock sit in open water. Boxes are the labels' measured sizes in the
// page (10 px monospace, 2 px letter-spacing): one line 13 units tall, 8 units per character.
const placements = Function(`return ${adapter.match(/const mapPlacements=(\{[^}]*\});/)[1]}`)();
export function placementProblems(p) {
  const out = [], landIn = (x0, y0, x1, y1) => { for (let x = x0; x <= x1; x += 1) for (let y = y0; y <= y1; y += 1) if (inside([x, y])) return [x, y]; return null; };
  const bob = landIn(p.bayOfBengal[0], p.bayOfBengal[1] - 11, p.bayOfBengal[0] + 104, p.bayOfBengal[1] + 3);
  if (bob) out.push({ label: 'BAY OF BENGAL', land: bob });
  const [sx, sy] = p.southChinaSea, scs = landIn(sx - 20, sy - 11, sx + 20, sy + 28);
  if (scs) out.push({ label: 'SOUTH CHINA SEA', land: scs });
  const [cx, cy] = p.clock;
  for (let a = 0; a < 360; a += 3) for (let r = 0; r <= 74; r += 2) { const q = [cx + r * Math.cos(a * Math.PI / 180), cy + r * Math.sin(a * Math.PI / 180)]; if (inside(q)) { out.push({ label: 'wind clock', land: q.map(v => +v.toFixed(1)) }); a = 360; break; } }
  return out;
}
test('sea labels and the wind clock sit on open water', () => {
  assert.deepEqual(placementProblems(placements), []);
});
test('the placement check fails with the clock at its old position or a label on Vietnam', () => {
  assert.ok(placementProblems({ ...placements, clock: [710, 365] }).some(p => p.label === 'wind clock'));
  assert.ok(placementProblems({ ...placements, southChinaSea: [630, 175] }).some(p => p.label === 'SOUTH CHINA SEA'));
});
