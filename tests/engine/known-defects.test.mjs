// Known defects, pinned as OBSERVED CURRENT BEHAVIOUR (docs/baseline.md §4).
//
// These tests assert what the game does today, not what it should do. They
// exist so a defect cannot change silently. A bug-fix PR for one of these
// defects is expected to make its test fail: replace the test with one for the
// corrected behaviour and update the defect's row in docs/baseline.md.
import { test } from "node:test";
import assert from "node:assert/strict";
import { loadEngine } from "./load-engine.mjs";

test("DEFECT D01 (current behaviour): a voyage arriving after month 24 is credited, and the ledger shows month 24", () => {
  // Junk, Aden → Calicut in November (month 22): 61 days at the speed floor, 3 months.
  const e = loadEngine().start({ vessel: "junk", port: "aden" });
  e.state.monthIndex = 22;
  e.state.cargo.ivory = 2;
  e.rng.push(0.0, 0.99, 0.99);                 // damage, no turn-back, no pirates
  e.g.sailTo("calicut");
  assert.equal(e.rng.remaining, 0, "scripted draws left unused");
  assert.equal(e.state.ended, true);
  assert.equal(e.state.monthIndex, 25);         // past the 24-month campaign
  assert.equal(e.state.currentPort, "calicut"); // the late arrival still counts
  // Ivory at Calicut, month min(23, 25) = 23: seed 'c'+'i' = 204, 227 ≡ 11, sin(11π/6) = −0.5 → 540 × 0.96 = 518.4 → 518
  const liquidation = e.logs().find(l => l.includes("Liquidation"));
  assert.equal(liquidation, "[M24 • Feb] Month 24 Liquidation: Sold 2× E. African Ivory at Calicut for 1036 D.");
  // "M24 • Feb": the month number is capped at 24 but the month name is month 26's.
});

test("DEFECT D07 (current behaviour): a campaign ended by debt is logged as \"Month 24 Liquidation\"", () => {
  const e = loadEngine().start();
  e.state.monthIndex = 2;
  e.state.cash = -240;
  e.state.cargo.pepper = 1;
  e.rng.push(0.75);
  e.g.waitInPort();                             // −280 D < −250: campaign ends in month 4
  assert.equal(e.rng.remaining, 0, "scripted draws left unused");
  assert.equal(e.state.ended, true);
  assert.equal(e.state.monthIndex, 3);
  // Pepper at Calicut, month 3: 214 ≡ 10, sin(5π/3) = −0.866 → 80 × 0.9307 = 74.46 → 74
  const liquidation = e.logs().find(l => l.includes("Liquidation"));
  assert.equal(liquidation, "[M4 • Apr] Month 24 Liquidation: Sold 1× Black Pepper at Calicut for 74 D.");
  // Nothing in the audit says the campaign ended early.
  assert.ok(!e.logs().some(l => /early|bankrupt|insolv/i.test(l)));
  assert.equal(e.el("audit-outcome-badge").textContent, "VENTURE DEFICIT • AUDIT REQUIRED");
});

test("DEFECT D08 (current behaviour): arrival log entries carry the departure month", () => {
  const e = loadEngine().start({ port: "aden" });
  e.rng.push(0.5, 0.99, 0.99);                 // Aden → Calicut in January: 2 months
  e.g.sailTo("calicut");
  assert.equal(e.rng.remaining, 0, "scripted draws left unused");
  assert.equal(e.state.monthIndex, 2);          // arrives in March (M3)
  const voyage = e.logs().find(l => l.includes("Sailed Aden → Calicut"));
  assert.ok(voyage.startsWith("[M1 • Jan] Sailed Aden → Calicut (53d / 2mo"), voyage);
});
