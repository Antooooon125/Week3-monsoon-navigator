# Monsoon Navigator — Visual evolution: an atlas that writes itself

**Status:** Design concepts accepted by the collaborator leading the visual track, for a later visual iteration. Implementation and the repository owner's approval are pending; "accepted" does not mean owner-approved.  
**Reference prototype:** [`ff74d45cc92907f29126626587ae68e2d2703d37`](https://github.com/Antooooon125/Week3-monsoon-navigator/commit/ff74d45cc92907f29126626587ae68e2d2703d37), branch `design/atlas-of-moving-worlds`. This is the last inspected prototype, not a claim about the current branch tip.  
**Committed:** as `docs/visual-evolution.md` on `main`, with review notes. The prototype it refers to lives only on the `design/atlas-of-moving-worlds` branch (no PR yet). Paths such as `prototype/`, `scripts/build-prototype.mjs` and `tests/prototype-engine.test.mjs` exist there, not on `main`.  
**Scope:** Presentation, derived campaign visualization and planning; no authorization to change mechanics, historical claims, licensing or scoring.

## 1. Design thesis

The atlas gradually writes itself as the student plays. Every campaign creates a distinctive composition through movement, residence, exchange and disruption. Use the existing five visual plates, 60:30:10 compositional heuristic, editorial typography and controlled optical effects. The new ideas should strengthen the relationship between gameplay and artwork, not add a dashboard of instruments.

Prioritize **voyage thread + material mosaic + personalized voyage folio** as one coherent visual system. Let historical research inform port identities and marginalia. Do not add the wind rose that was proposed in earlier design discussion (not recorded in this repository): the current wind field, seasonal clock/month strip and route comparisons already cover its educational purpose. Preserve machine-readable direction conventions internally; distinguish wind from and toward in simple annotations only where clarification is needed.

## 2. Prerequisites and protected contracts

- Read the latest `CONTRIBUTING.md`, baseline, milestone tracker, and `AGENTS.md` if merged; check open PRs and the actual branch tip. Resolve any conflict in favor of the governing contribution rules.
- Finish the existing prototype's browser review before expanding its scope. The pushed branch reported 14 passing Node tests and 480 matching transit cases; those are not browser or accessibility results. Do not claim new execution without running it.
- Preserve the original `index.html`, protected engine semantics, known defects, RNG behavior and classroom assessment. Do not fix model defects implicitly to make a chart look right.
- Keep the prototype generated from `index.html`, `prototype/atlas.css`, `prototype/atlas.js` and the build script; never hand-edit generated `prototype.html`. No separate event simulation or second economic engine.
- Read the approved art-direction/design-system/refactor documents if committed. If absent, this note is a proposed design addendum, not a claim that the full design contract has been merged.
- Keep existing credits and asset licenses, and use original artwork. Resolve licensing boundaries with the owner before reusing external or other-project assets. All examples and screenshots must use fictional student details.

**Review note: checked against `ff74d45` (2026-11-22).**

*Matches the prototype:*
- `tests/prototype-engine.test.mjs` has 14 tests, including one that checks the 480-row transit snapshot against both `index.html` and the prototype. These run under a minimal DOM stand-in in Node. Node isn't installed on the reviewing machine, so the count and the MATCH are as reported, not rerun.
- `index.html`, `LICENSE`, the fixture and `tools/` are unchanged on that branch.
- The three font families are bundled with their SIL OFL texts.

*Needs a decision during work package A:*
- **Licence.** `docs/prototype.md` on that branch says the prototype and its new visual material "are distributed under the same terms" (CC BY-NC-SA 4.0). That is a licence decision. Under CONTRIBUTING.md it belongs to the owner, and it is still open in issue #4. Hold the statement, or mark it as proposed, until the owner decides.
- **Push script.** `scripts/push-prototype.ps1` is a personal publishing script committed to the repository. It sets a local git author email if none is set. Decide whether repository tooling should include it.


## 3. Concept specifications

### V01 — Voyage thread (first priority)

A discrete time–location diagram that records the campaign across a 24-month axis. Each port occupies a labeled row; residence appears as horizontal segments, transit as a connection between origin and destination, adverse outcomes as explicit marks. A turnback ends at the origin rather than at a fictional successful arrival. The vertical axis is categorical, not geographical distance. The line can use cobalt on ivory in the audit and the established stable pink accent within the navigation environment.

**Data gate:** inventory actual state/log fields and their timestamps. D01 (campaign overruns) and D08 (arrival log carries departure date) are known limitations at the reference baseline. Do not infer exact arrival dates from ambiguous logs or use the clamped display month as a true timestamp. If an event is not recoverable with certainty, show only the recorded sequence, label the limitation, or defer the timed chart. A minimal append-only telemetry proposal, if necessary, requires separate review; it must observe actual transitions without changing state, RNG, timing, scoring or actions. Do not pretend an absent telemetry stream already exists.

**Review note: what the engine actually records (at `b607af9`).**

| Field | What it holds | Limits for V01, V04 and V07 |
| --- | --- | --- |
| `state.logs` | English text entries, newest first, each prefixed `[M<n> • <Mon>]` | `n` is clamped to 24 (D01). A voyage entry is written before time advances, so it carries the **departure** month (D08). |
| Voyage log entry | `Sailed X → Y` or `Attempted X → Y (TURNED BACK)`, then `(<days>d / <months>mo, …)` | The arrival month can be computed as departure month + months, except for a voyage that runs past month 24 |
| `state.visitedPorts` | A set of distinct ports | No order, no timestamps, no visit counts |
| `state.diaspora` | Standing per port (+15 per month waited, +5 per arrival, 10 at the home port) | Standing is not a visit count |
| `state.stats` | Counts of winds and layover months, plus tons **loaded** | Loaded, not delivered (D03); pepper counted as luxury (D02) |
| Treasury | Current cash only | No cash history |

*Consequences:*
- A V01 thread could be rebuilt from the log text. That would make the wording of the English log an unofficial data format, which a small rewording would silently break.
- V04 visit counts and any V07 treasury chart need data the engine doesn't record.
- The safer route is the separately reviewed, read-only telemetry adapter this section already describes: record `(from, to, departure month, months, turned back)` by observing actual transitions.


**Acceptance:** ordered port labels; residence and travel distinct; turnbacks/loss/early liquidation faithfully represented when recorded; no invented stops or dates; same trace renders identically; textual equivalent available; no horizontal page overflow at 375 px. The audit is the first target; an in-play miniature is optional only if it does not duplicate existing controls.

### V02 — Material mosaic (first priority)

Extend the existing specimen illustrations and weight-based manifest rather than introducing an additional cargo dashboard. Use a rectangular composition with occupied area proportional to actual weight and an explicit empty area. Material textures supply identity: pepper as dots, textiles as woven lines, porcelain as concentric rings, timber as grain, cloves as stylized buds, ivory as a neutral material motif without romanticizing exploitation.

| Material | Suggested base / structural / accent | Encoding |
|---|---|---|
| Pepper | `#343D2C` / `#7E9857` / `#C98B46` | Granular dots |
| Textiles | `#D9C8AB` / `#365980` / `#C84238` | Weave |
| Porcelain | `#ECE8DB` / `#284B93` / `#B8C6D9` | Rings |
| Teak | `#98754F` / `#4B5640` / `#D8B784` | Linear grain |
| Cloves | `#57362F` / `#B36E4A` / `#8D9E68` | Bud shapes |
| Ivory | `#E7DFC9` / `#958D7C` / `#527976` | Abstract material pattern |

These hues and motifs are compositional proposals, not evidence of historical objects. Use adaptive contrasting text, labels and legends. Derive each segment from the existing cargo quantity times the commodity's weight, divided by actual vessel capacity. Zero stock has no occupied segment; don't give small amounts a misleading minimum area. Keep lots, tonnes and free capacity available as text; don't imply physical stowage, volume or stability is modeled.

**Acceptance:** empty, partial and full holds; both vessels; purchase, sale, cargo loss and turnback; total occupied + free capacity reconciles with engine values; color-independent identification; no state changes or random draws during rendering. Reuse or replace redundant manifest elements instead of adding duplicate readings.

### V03 — Port material identities (research-coupled)

Use restrained abstract motifs in market headings, printed register marks and folio details. They are candidate visual research directions, not confirmed medieval reconstructions:

| Port | Candidate material vocabulary |
|---|---|
| Kilwa | Coral-stone texture and porous mineral patterns |
| Aden | Volcanic forms and dry mineral pigments |
| Calicut | Timber, botanical motifs and woven fibres |
| Malacca | Interlaced timber patterns and tropical botanical forms |
| Quanzhou | Ceramic glazes and architectural rhythms |

Confirm specific motifs against relevant historical period, geography and source material before presenting them as historical. Avoid using modern buildings as unlabelled medieval reconstructions or treating any port as culturally homogeneous. Record source/creator, license, date, place, depiction type and modifications. Original abstract patterns can be used with a schematic label; no copying photographs without rights. Port accents supplement, not replace, seasonal palette and stable semantic colors.

**Acceptance:** distinct but restrained identity; documented provenance; no new unsupported history; consistent navigation and trade cues across all five ports.

### V04 — Accumulated register marks (optional)

Represent successful visits or other **actually recorded** port events with repeated geometric impressions. Use abstract register marks, not purported replicas of historical seals. A mark may mean one visit only if visits are counted accurately; never equate visits with personal trust or a specific merchant connection. Show existing game standing as a separate labeled quantity. Do not imply the game simulates a concrete social network.

**Acceptance:** count reconciliation with recorded events, no invented people, distinct treatment of visits and standing, accessible text, no celebrations of unsupported causal conclusions. If required event counts are absent, defer or use the already available standing value without pretending it counts visits.

### V05 — Chromatic rupture (optional refinement)

During an actual logged adverse event, the inline report can take on the aubergine / copper / citron plate (`#392D48`, `#B98263`, `#D6E5A0`). Interrupt route strokes, offset translucent layers or use a static broken pattern. This is an abstract event illustration, not modeled cyclone geometry or actual storm intensity. Keep the event explanation and controls readable. Avoid flashing, shaking, forced modal interruptions, color-only warnings and whole-screen effects that look like changes in physical state. The existing event card is the appropriate initial surface.

**Acceptance:** triggered by the corresponding real log event, no event generated by rendering, no replay on dismiss/re-render, keyboard operability, reduced-motion/static fallback, stable semantic labels and contrast.

### V06 — Historical marginalia (research-coupled)

Introduce brief adjacent evidence notes beside key decisions, especially seasonal departure, waiting costs, vessel trade-offs and port standing. The note should identify whether it describes a game assumption, documented historical observation, interpretation or unresolved question. Use collapsible/linked detail with a reliable source locator; don't crowd the primary action or make an inaccessible hover-only interface.

Example placeholder, not a historical evidence claim: *Model assumption — waiting incurs the game's fixed fees. Historical cost calibration remains unresolved.*

The canonical evidence registry, when implemented, should drive the labels and source links. Do not create a second hand-maintained claim registry in JavaScript or cite unexamined papers as confirmation. Until registries exist, the prototype's existing source dialog and general simulation caveats suffice.

**Acceptance:** source depth and claim layer consistent with registries; exact anchors and reading limitations; supports touch, keyboard and offline reading of available notes; no unsupported claims promoted to historical fact.

### V07 — Personalized voyage folio (first priority; depends on V01/V02)

Evolve the audit into a compact, printable atlas generated by the actual campaign. Retain all required financial/scoring fields, prediction and reflection, and the dated ledger. A suggested sequence:

1. Cover / trajectory: title, campaign duration and the student's voyage thread.
2. Circulation: places encountered and actual recorded movements.
3. Material exchange: cargo mosaic and a documented trade summary.
4. Disruption: event register drawn from recorded outcomes.
5. Reflection: initial prediction, decisions, consequences and historical limits.

Show actual duration/outcome for early insolvency; don't silently label every result a completed 24-month campaign. Distinguish loaded, delivered, lost and remaining cargo only if recoverable (see D02/D03). A final snapshot is not a time-series or record of all materials ever traded. If treasury history or delivered volumes are not recorded, omit those charts rather than reconstruct unsupported values. Use real units, axes and legends for quantitative displays. The visual composition may be unique per campaign without using randomness.

**Acceptance:** reconciles with actual audit values; no silent changes to grading or calculations; deterministic rendering from the same record; print/PDF in multiple pages tested with long text, missing/zero values, adverse events and early ending; all text readable in print and on mobile; no student data committed or automatically published.

## 4. Shared visual rules

- Five visual plates remain coherent: Predict (ivory/cobalt/vermilion), Navigate (midnight/spectral blue/pink), Trade (celadon/blue-green/orchid), Disruption (aubergine/copper/citron), Audit (paper/cobalt/vermilion). Maintain seasonal optical modulation only where it helps the current task.
- Archivo display, Atkinson Hyperlegible body, IBM Plex Mono numeric labels as in the prototype; use existing bundled licensed fonts and responsive sizing.
- 60:30:10 guides composition, never overrides accessibility or quantitative proportions. Texture has meaning only when declared, and decorative optical effects are not weather observations.
- A single source of truth for each displayed number. Render existing game data or a documented derived view model; never adjust model behavior in a stylistic PR.
- Prefer replacing redundant displays to adding more UI. Provide accessible names, keyboard use, focus, contrast, reduced motion, text equivalents and a static print representation.
- Render deterministically. No extra `Math.random()` calls, no simulation progression, no mutation of campaign values. Keep offline play and small local builds; do not add dependencies, expensive Actions jobs or asset downloads without a concrete need and approval.
- No wind-rose integration in this classroom visual backlog. A future research-only empirical wind rose falls outside this scope.

## 5. Implementation order and gates

| Work package | Scope | Release gate |
|---|---|---|
| A | Complete browser review of existing prototype; record baseline and evidence | Current prototype accepted by reviewer/owner; no unapproved mechanics changes |
| B | V02 material mosaic as a refinement of existing cargo view; V01 feasibility audit | Engine data inventory; reproducible build; both vessels, cargo states, data provenance and visual checks |
| C | V01 journey thread and V07 audit folio | Actual recoverable events; if needed separately approved telemetry; print/mobile/early end tests and unchanged scoring |
| D | V04 register marks and V05 rupture | Introduce only if useful; test event semantics and presentation purity |
| E | V03 port identities and V06 marginalia | Sourced visual research and canonical evidence registry as required |

V01–V07 are design concept identifiers, not new research milestones. If PR #5's AGENTS.md is merged, its "ID families" table needs a row for them (design concepts, defined here, no status). The existing milestone tracker remains the only authoritative project status board. Prefer small reviewable PRs; B and C may be split. Do not expand the existing visual PR merely because these ideas are accepted in conversation. If upstream changes, rebuild from the actual reviewed base rather than overwriting newer game work.

## 6. Verification checklist for implementers

- Check exact current SHA and compare with the reviewed base. Record modified paths and scope. Verify protected classroom files unchanged for presentation-only work.
- Run the documented browser baseline checker and paste its exact result for every PR in accordance with CONTRIBUTING.md. Run `node scripts/build-prototype.mjs` and `node --test tests/prototype-engine.test.mjs` when available; confirm generated HTML matches the committed output on rebuild. The Node DOM substitute is not a browser test.
- Extend tests using actual engine functions and known controlled events. Confirm new renderers preserve economic state, RNG count, actual/preview month distinction, and settlement. Add edge cases for eligible data and renderers rather than rewriting expectations to pass.
- Real browser: desktop and 375 px mobile; before/after screenshots with fictional inputs; both reading themes, keyboard, focus restoration, reduced-motion setting, offline gameplay, market table scroll, event dismissal and end-to-end campaign. Exercise print pagination with long audit/ledger/reflection. Check console errors and required network requests.
- Explicitly record what was not run. Do not mark browser, accessibility or historical validation as complete based on syntax or DOM-double tests. Keep any screenshots containing actual student identifiers and restricted sources out of Git.
- Independent reviewer checks pinned revision and reproductions; report unresolved issues, and obtain repository-owner approval before merge. Do not alter PR #5/#6, licensing, or unrelated research code to deliver a visual feature.

## 7. Coding-agent handoff

Read this addendum, current prototype docs, existing design documents if committed, baseline and contribution/agent rules. First review the already-pushed prototype; don't start a parallel rewrite. After that review lands, propose the smallest independent enhancement: a material mosaic derived from the existing hold data, plus an inventory of whether the game records sufficiently reliable voyage events for the thread/folio. Report gaps rather than inventing data. Keep the original engine intact, produce before/after screenshots, and run the required checks. Treat the wind rose as deliberately removed from the backlog. Defer historically specific motifs and claims to research-led work. Record progress in the canonical milestone tracker only once the relevant gate is verified.

**Success:** richer visual meaning without additional navigational complexity, and a truthful personalized atlas composed from the player's actual decisions.
