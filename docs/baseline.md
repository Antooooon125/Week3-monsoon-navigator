# Classroom baseline (R0)

This file pins the classroom game as it stands, so later visual, evidence and research work can show what it changed and what it left alone. It records game parameters and known defects. Nothing here is a historical claim.

## 1. Pinned revision

| | |
| --- | --- |
| Commit | `111acdc72821a259b679d2c6f5e7afa44630e2a5` (merge of PR #1, 2026-11-22) |
| Tree | `5d886d653b34ef453d9199ba40f8e514af3b7339` |
| Entry point | `index.html` |

PR #1 changed the wind clock drawing, the hypothesis concept check, the profit-target minimum, some on-screen wording and two README sentences. It did not change any value in section 2, so the sailing model is the same as at `db57f54`.

## 2. Protected engine

These symbols and constants define the classroom model. A change to any of them changes results, and needs the owner's approval in advance (see [CONTRIBUTING.md](../CONTRIBUTING.md)).

`PORTS`, `SEA_LANES`, `COMMODITIES`, `VESSELS`, `DIFFICULTIES`, `getWindState`, `getLivePortPrice`, `getEffectiveTariff`, `getEffectiveLayoverFee`, `computeTransit`, `buyCargoQty`, `sellCargoQty`, `waitInPort`, `sailTo`, `advanceTime`, `getMutinyRisk`, `finishCampaign`.

### Vessels and difficulty

| Vessel | Capacity (t) | Base speed (nm/day) | Wind coefficient α | Wages (D/month) | Hull damage multiplier |
| --- | --- | --- | --- | --- | --- |
| Dhow | 120 | 110 | 0.85 | 15 | 1.0 |
| Junk | 300 | 95 | 0.60 | 35 | 0.5 |

| Difficulty | Cash (D) | Loan (D) | Starting equity (D) | Damage multiplier | Port-fee multiplier | Route hints |
| --- | --- | --- | --- | --- | --- | --- |
| easy | 3,000 | 0 | 3,000 | 0.5 | 0.6 | yes |
| normal | 1,500 | 0 | 1,500 | 1.0 | 1.0 | no |
| hard | 800 | 500 | 300 | 1.0 | 1.0 | no |
| survival | 600 | 0 | 600 | 2.0 | 1.1 | no |

### Ports and lanes

| Port | Tariff | Port fee (D/month) | Piracy risk on arrival |
| --- | --- | --- | --- |
| Kilwa | 5% | 20 | 0.12 |
| Aden | 8% | 35 | 0.15 |
| Calicut | 4% | 25 | 0.04 |
| Malacca | 3% | 25 | 0.26 |
| Quanzhou | 6% | 30 | 0.10 |

| Lane (both directions) | Distance (nm) | Bearing out / back |
| --- | --- | --- |
| Kilwa – Aden | 1,650 | 25° / 205° |
| Kilwa – Calicut | 2,450 | 68° / 248° |
| Aden – Calicut | 1,450 | 102° / 282° |
| Calicut – Malacca | 1,600 | 105° / 285° |
| Malacca – Quanzhou | 1,750 | 38° / 218° |

### Base prices (D per lot)

| Good | Lot (t) | Category | Kilwa | Aden | Calicut | Malacca | Quanzhou |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Teak | 10 | Bulk | 65 | 130 | 40 | 55 | 95 |
| Porcelain | 8 | Bulk | 210 | 205 | 135 | 110 | 60 |
| Textiles | 5 | Bulk | 155 | 120 | 50 | 160 | 115 |
| Pepper | 2 | Semi-Bulk | 190 | 320 | 80 | 110 | 310 |
| Cloves | 1 | Luxury | 480 | 750 | 340 | 150 | 620 |
| Ivory | 3 | Luxury | 180 | 420 | 540 | 590 | 820 |

The price in a given month is the base price × (1 + 0.08 · sin((month + seed)·π/6)), rounded, where seed is the sum of the character codes of the port's and the good's first letters. Purchases add the tariff; sales do not.

### Wind and transit

| Months | Regime | Wind blows toward | Displayed speed |
| --- | --- | --- | --- |
| Jun–Sep | SW monsoon | 45° | 20 kt |
| Nov–Feb | NE monsoon | 225° | 18 kt |
| Mar–May | Transition | 315° | 6 kt |
| Oct | Transition | 135° | 6 kt |

The displayed wind speed is not used in any calculation.

Speed factor = max(0.25, cos(lane bearing − wind bearing) × α + 0.5), then × 0.65 in transition months and × 1.15 with a navigator. Days = round(distance / (base speed × factor)); months charged = max(1, ceil(days / 30)). Outside transition months, cos ≥ 0.4 is a tailwind and cos < −0.5 a headwind.

### Hazards, crew and standing

| Mechanism | Value in the code |
| --- | --- |
| Headwind | hull −(20 to 34) × damage multipliers; 35% chance of turning back; otherwise 40% chance of jettisoning 1 teak lot if any is aboard |
| Transition-month storm | probability 0.35, or 0.18 with a navigator; hull −(22 to 38) × damage multipliers |
| Becalmed | the next 0.25 of the same roll (with or without a navigator); −20 D |
| Porcelain | loses 20% of lots (at least 1) on a headwind or transition voyage if hull < 70% |
| Textiles | 35% chance of losing 1 bale on a transition voyage without tarpaulins |
| Piracy | destination risk × 1.5 if cloves or ivory are aboard (otherwise × 0.6), × 1.8 on survival, × 0.2 with marines, × 0.5 at destination standing ≥ 50. Takes 1 crate of cloves, else 1 lot of ivory, else min(cash, 75) D |
| Crew health | −8 per month at sea, −12 more after a headwind or storm; +20 per month in port |
| Mutiny | probability (50 − health) / 100 after a voyage; costs 2 months' wages |
| Standing | +15 per month waited, +5 per arrival, 10 at the home port; port fees × 0.75 at ≥ 20 and × 0.5 at ≥ 50; tariff −1 point at ≥ 50 |
| Port stories | 75% chance per month waited; +15 to +25 D, or +8% hull at Calicut |
| Loan | 5% added each time the month count crosses a multiple of 6 |
| Campaign end | month ≥ 24 or cash < −250 D; cargo sold at the current port, debt deducted |
| Specialists | repair 60 D (+25% hull), navigator 180 D, marines 160 D, tarpaulins 90 D |

Random draws use `Math.random()` without a seed, so a single run cannot be replayed.

## 3. Regression check

`tests/fixtures/baseline-transit.json` holds the output of `computeTransit()` at this revision for every lane, month, vessel and navigator choice (480 rows). `tools/baseline-check.html` loads the game in a frame, recomputes the table with the game's own functions, and compares the two.

To run it, serve the repository root over HTTP (for example `python3 -m http.server 8000`) and open `http://localhost:8000/tools/baseline-check.html`. It reports **MATCH** or **MISMATCH**.

The check was tested both ways. At this revision it reports MATCH. With the dhow's α changed from 0.85 to 0.86, it reported MISMATCH with 96 rows changed. That change was then reverted.

It covers the deterministic sailing model only. Trading arithmetic, random hazards, the ledger and the audit are not yet covered (roadmap R5). The published Aden → Calicut example is in the snapshot: dhow, no navigator, 14 days in July and 53 in January.

## 4. Known defects

Each defect stays in the baseline until a separate, reviewed bug-fix PR changes it. That PR updates this table.

| ID | Defect | Found by | Status |
| --- | --- | --- | --- |
| D01 | A voyage can arrive after month 24 (up to month 26) and is still credited; the ledger shows month 24 | README | open |
| D02 | Pepper is labelled Semi-Bulk in the market but counted as luxury in the audit | README | open |
| D03 | The freight tally counts cargo loaded, including voyages that turn back and cargo later lost | README | open |
| D04 | Tailwind CSS, PDF libraries and fonts load from remote servers; the PDF filename turns non-ASCII names into underscores | README | open |
| D05 | The profit target is always met: all 5,400 runs in the section 5 sweep end above 1,200 D | review, sweep | open |
| D06 | Which ship wins is set by the strategy, not by the seed. In same-seed runs the junk wins 300 of 300 under *sail always* and *avoid headwind and transition*, and the dhow wins 300 of 300 under *avoid headwind*, at every difficulty (section 5). The trade-off the README describes, lower overhead versus a bigger hold, is not what decides it. (Corrected 2026-11-22; the first wording generalised the *sail always* result to all strategies.) | review, sweep | open |
| D07 | A campaign ended by cash below −250 D is logged as "Month 24 Liquidation" and labelled like a completed one | code reading | open |
| D08 | Arrival log entries carry the departure month | code reading | open |
| D09 | Calicut's description says "zero piracy risk near harbor", but its piracy risk is 0.04 | code reading | open |
| D10 | Aden → Calicut is 1,450 nm, shorter than the great-circle distance of about 1,808 nm; this is the README's worked-example route | review | open |
| D11 | The wind speeds shown (6, 18, 20 kt) have no effect on transit | code reading | open, may be intended |
| D12 | PDF export likely repeats a band about 12 mm high at each page break and draws content into the margins | code reading only, not rendered | unverified |
| D13 | Randomness has no seed, so a run cannot be replayed or audited | review | open |
| F01 | Wind clock shaded the wrong months; its hand showed a compass bearing on a month dial | review | fixed in PR #1 |
| F02 | Hypothesis check matched word fragments ("junk" counted as June) | review | fixed in PR #1 |
| F03 | A negative profit target let a loss show "TARGET ACHIEVED" | review | fixed in PR #1 |
| F04 | Ship, navigator and physics-guide text described effects the model does not have | review | fixed in PR #1 |

## 5. Exploratory results already seen

These numbers were produced before any research pre-registration, by `economySweep()` in `tools/baseline-harness.js` (run with `?sweep=300`). They come from seeded automated strategies with perfect knowledge of prices, not from students, and are not historical findings.

Each strategy sells everything on arrival and fills the hold by the ratio of destination price to purchase cost. *Sail always* takes the best route regardless of wind. *Avoid headwind* takes the best route without a headwind, and waits if every route has one. *Avoid headwind and transition* also skips transition months. Each strategy ran 300 seeds per difficulty and vessel, starting at Calicut.

| Difficulty (equity) | Vessel | Sail always: min / median | Avoid headwind: min / median | Avoid headwind and transition: min / median |
| --- | --- | --- | --- | --- |
| normal (1,500 D) | dhow | 40,647 / 88,305 | 214,694 / 216,713 | 216,247 / 217,957 |
| normal (1,500 D) | junk | 146,870 / 167,826 | 173,734 / 175,864 | 451,659 / 456,317 |
| hard (300 D) | dhow | 38,963 / 79,478 | 184,253 / 189,229 | 185,489 / 190,203 |
| hard (300 D) | junk | 126,084 / 146,944 | 152,691 / 154,944 | 410,338 / 413,966 |
| survival (600 D) | dhow | 36,319 / 76,409 | 170,258 / 175,372 | 172,317 / 176,596 |
| survival (600 D) | junk | 118,357 / 139,119 | 145,223 / 147,106 | 396,683 / 401,618 |

Net profit in D. Every one of the 5,400 runs met the 1,200 D target.

**Dhow against junk on the same seed** (dhow wins out of 300; no ties):

| Strategy | normal | hard | survival |
| --- | --- | --- | --- |
| Sail always | 0 | 0 | 0 |
| Avoid headwind | 300 | 300 | 300 |
| Avoid headwind and transition | 0 | 0 | 0 |

These pairs share a seed, not common random numbers. The two ships make different voyages, so they draw different hazards from the same stream. Under the two *avoid* strategies the spread between seeds is small (minimum within about 3% of the median), so the strategy, not chance, decides the ranking. An earlier version of this section reported only the *sail always* row and concluded that no case favoured the smaller ship. That was wrong.

**Consequence for the research track.** The roadmap's M3 (when is a larger ship advantageous), M4 (when does waiting pay) and M6 (robustness) can no longer be blind tests of the current values. These results have already been seen:

- By median, avoiding headwinds beats sailing regardless of wind for both ships at every difficulty.
- Which ship wins reverses with the strategy.

Their pre-registrations must cite this section as a prior look.

## 6. Licensing: open question for the owner

`LICENSE` is the MIT licence, copyright Antooooon125. The game in `index.html` credits Amnuayvit Thitibordin (KVIS) under CC BY-NC-SA 4.0, and the README says the MIT licence does not relicense the game. CC BY-NC-SA asks that adaptations carry the same licence and say what was changed.

R0 does not change any licence. Until the owner decides, do not copy files from CC BY-NC-SA projects into this repository; that includes the Frost & Silver files the research roadmap suggests as templates. Write new files instead. This is a reading of the licence terms, not legal advice.
