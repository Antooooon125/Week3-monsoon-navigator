# Monsoon Navigator — Game design and player experience

**Project:** Monsoon Navigator (*An Atlas of Moving Worlds* is the working title of the externally approved art direction, not the project's name)  
**Date:** 2026-11-22 (KST)  
**Committed:** as `docs/game-design-and-player-experience.md`, documentation only, with review notes. Nothing here is approved by the owner or the instructor.  
**Status:** Proposed living design specification and formative playtesting handoff; not authorization to change protected mechanics, grading, licensing or release rules.  
**Inspected revisions:** [Classroom main `b607af9`](https://github.com/Antooooon125/Week3-monsoon-navigator/tree/b607af9dce751bae56528655a65afc362e21d8c7); [visual prototype `ff74d45`](https://github.com/Antooooon125/Week3-monsoon-navigator/tree/ff74d45cc92907f29126626587ae68e2d2703d37). These are source-inspection checkpoints, not live status claims. No new game execution or human playtest was performed for this document.

## 1. Purpose and relationship to existing specifications

**A historical laboratory disguised as a merchant voyage; an atlas that writes itself as the student plays.**

The project already has a historical inquiry, a working merchant simulation, a proposed evidence architecture, and a sophisticated visual prototype. This specification addresses the missing discipline: designing, observing and iterating on the player's experience. It supplements `docs/gameplay-evolution.md` (Frost & Silver transfer), `docs/visual-evolution.md` (generative atlas concepts), the design documents and the existing research tracker. When this was committed, all of those companions were still open PRs, none merged: `docs/gameplay-evolution.md` (#8), `docs/visual-evolution.md` (#7), the readiness addendum (#6) and the governance handoff, AGENTS.md and the review process (#5). The art-direction, design-system and visual-refactor documents are not in the repository. Recheck their state before treating any of them as binding rules.

- **Path A:** Preserve the stable classroom simulation and improve its teaching and play experience.
- **Path B:** Test alternative mechanics, economic balance and causal explanations outside the classroom engine.
- **Visual track:** Preserve `index.html`; build `prototype.html` through its generator, not manual edits to the generated page.
- **Authority:** Follow `CONTRIBUTING.md` and owner-approval requirements for protected mechanics, as listed in `docs/baseline.md`. Every PR requires the browser baseline result; visible changes require before-and-after phone and desktop screenshots with fictional student details. Report outstanding checks explicitly. Do not treat Node DOM-double checks as browser review.
- **Tracking:** Use `docs/research-directions-and-milestones.md` for living status. The headings and priorities here are design work items, not new milestone IDs.
- **Rights and privacy:** Use original implementations, respect existing credits, avoid copying CC BY-NC-SA files from other projects while [licence issue #4](https://github.com/Antooooon125/Week3-monsoon-navigator/issues/4) is unresolved, and keep identifying student data off all Git branches. Obtain appropriate permission before involving students.
- **Non-goals:** More dashboard instruments, wind rose integration, a composite merchant welfare score, arbitrary balance penalties, commercial retention loops, or a parallel simulation engine. No mechanics change is justified just by having a design proposal.

## 2. Source-inspection gap analysis

| Discipline | State at inspected checkpoints | Design question |
|---|---|---|
| Historical educational concept | Established | Can students explain the mechanisms rather than repeat a conclusion? |
| Art direction | Strong prototype concept | Does the interface remain clear in real play? |
| Core decision system | Implemented | Are choices consequential and intelligible? |
| Hypothesis and audit | Implemented | Are reasoning and learning visible between the opening and final report? |
| Forecast and glossary | Implemented | Can a beginner use these without instruction? |
| Feedback | Partial; voyage log, condition meters, forecast and prototype event reports | Does each action communicate its cause, cost and consequences? |
| Onboarding | Mandatory charter and explanatory text; no documented interactive practice voyage | Can a novice make a first meaningful decision quickly? |
| Pacing and progression | 24-month horizon, no explicit player-experience arc documented | Is the middle of the campaign engaging rather than repetitive? |
| Failure and recovery | Repair, waiting, recovery, specialists, liquidation | Are recovery options clear, and are failures correctly explained? |
| Economy balance | Exploratory sweeps; D05/D06 | Does understanding matter more than exploitation? |
| Reproducibility | D13; seeded research harness but unseeded classroom RNG | Can players compare choices fairly? |
| Session continuity | In-memory state; no save/resume described | Can play span interruptions or lessons? |
| Accessibility | Some controls and prototype adaptations; real browser review pending | Can players with different access needs complete the full campaign? |
| Games user research | No formal human playtesting report found in inspected trees | What do actual players understand, enjoy and struggle with? |

This is an inspection-based assessment, not a usability verdict. Absence of documentation is not proof that no informal classroom testing has occurred. Ask the instructor and record prior experience without overstating its evidential strength.

## 3. Experiential pillars and MDA framework

Use Mechanics–Dynamics–Aesthetics (MDA) as a design lens [1]. Mechanics are the rules, dynamics are patterns produced during play, and aesthetics are the resulting player experience (not merely visual appearance).

| Layer | Monsoon Navigator |
|---|---|
| Mechanics | Ship capacities, costs, routes, wind alignment, cargo, hazards, time, debt and standing |
| Dynamics | Seasonal waiting, specialization, arbitrage, risk exposure, reinvestment, repeated circulation |
| Aesthetics | Anticipation, discovery, mastery, uncertainty, agency, attachment to places and a satisfying personal journey |

Five design pillars govern feature decisions:

| Pillar | Player-facing objective | Evidence to seek in playtesting |
|---|---|---|
| Meaningful agency | Understand options and choose between real trade-offs | Player can predict a consequence and explain an alternative |
| Anticipation | Think about the next season, not just the next click | Player compares departures and considers the cost of waiting |
| Discovery | Learn by testing a hypothesis | Player identifies a pattern they did not previously know |
| Emergence | Produce an individual story through decisions | Distinct paths produce distinct, accurately narrated folios |
| Mastery | Improve through understanding rather than repetition | Player applies lessons to a new situation without needing a scripted hint |

For each feature proposal record its intended experience, the mechanics/dynamics that produce it, observable signals of success, possible harms or confusion, and the smallest test. Reject features that merely add complexity. These are proposed pillars, not claims that all experiences are already achieved.

## 4. Core, medium and campaign loops

```text
Observe → Plan → Commit → Resolve → Interpret → Adapt
   ↑                                              |
   └──────────────────────────────────────────────┘
```

The current loop already supports planning and action. Strengthen the transition from resolution to interpretation and adaptation. Use one compact action-consequence summary that answers what changed, why it changed and what the player can do next. It must distinguish guaranteed costs, forecasts, realized random outcomes and unknowns.

| Scale | Loop | Intended experience |
|---|---|---|
| Micro | Buy/sell, forecast, wait, sail, repair | Clear action and immediate feedback |
| Medium | Trading circuit, seasonal cycle, recovery from events | Changing opportunities, accumulating experience |
| Macro | Full 24-month venture and audit | Reflection, narrative closure, meaningful comparison |

**Acceptance:** Observe a player explaining a next action using evidence from the preceding action. Do not require a modal or written answer after every transaction. Repeated feedback may be concise; consequential transitions should remain visible. No UI effect may advance time, alter cash, consume RNG or imply a voyage occurred when only a forecast was requested.

## 5. First-time user experience and progressive disclosure (P0)

### Optional practice passage

The current charter collects several decisions and a hypothesis before the player has encountered the system. Prototype a separate short practice passage (target approximately five minutes, to be measured rather than promised). The practice should be optional and available again on demand, with an explicit boundary before the assessed campaign [3].

1. **Read the ocean:** locate the current port, a destination, the actual month and directional wind cue.
2. **Load the hold:** make a small purchase and read the price, lot weight and capacity changes.
3. **Plan:** compare two departure months for the same route, including time and monetary consequences.
4. **Commit:** execute one voyage in the practice state and see the outcome.
5. **Reflect:** explain one result; return to the charter and form a testable hypothesis.

Use fictional inputs and the same engine or a clearly identified read-only demonstration of its behavior. No second hand-written economic/sailing system. A fixed favorable practice sequence may be used only if its special status is explicit and approved where it affects mechanics. A separate state and RNG context are necessary for interactive practice; do not silently mutate and then reset the real campaign. If that isolation requires engine refactoring, keep the implementation behind owner approval and begin with a non-mutating walkthrough.

### Progressive introduction, not locked mechanics

| Moment | Emphasize | Keep available |
|---|---|---|
| First encounter | Ship, wind, route, cargo, price | All existing mechanics and help |
| First wait or passage | Costs, elapsed time, hull and crew | Detailed calculation and source caveats |
| First relevant risk | Recovery, specialists, cargo protection | Other risk and economic information |
| Repeated visits | Standing, discounts, opportunity cost | Full local information |
| Final audit | Evidence, alternatives, model limitations | Complete original ledger |

Expose concepts when useful, not on an artificial month schedule. An advanced player can bypass guidance. Never disable a legal action simply because a tutorial has not introduced it. Preserve existing assessment requirements unless the instructor agrees to change them.

**Acceptance:** New players can complete a first passage, distinguish practice from assessment, return to help without losing progress, and correctly identify actual versus preview month. Confirm state isolation, no random-state leakage, keyboard operation, and accessible labels. Measure time and assistance rather than assuming the tutorial works.

## 6. Meaningful choice and decision legibility (P0)

Meaningful play requires an understandable action/outcome relationship that matters in the wider game [2]. Adapt the existing forecast instead of adding another instrument. Keep the wind rose out of the backlog.

Example compact decision brief: **Aden → Calicut, July, dhow, no navigator** (current model example; not historical data).

| Information | Display |
|---|---|
| Actual departure | July; distinct from preview month |
| Estimated transit | 14 days |
| Campaign time | 1 charged month |
| Estimated crew wages | 15 simulated D |
| Wind alignment | Tailwind |
| Risk | Conditional; not guaranteed to avoid hazards |
| Cargo and capacity | Actual current load and remaining space |
| Alternatives | Compare later month, wait, change cargo or destination |

The same route in January is estimated at 53 days, two charged months and 30 D wages (without navigator). January is also a **Headwind (Hazard)** passage in the model: hull damage on every such voyage and a 35% chance of turning back. The lane's 1,450 nm is shorter than the great-circle distance (D10), so even the model's July figure is under review. A departure comparison does not itself include all consequences of waiting, changes in market values or realized losses. Label these distinctions. Never equate minimum transit time with maximum total profit.

Preview should be freely reversible; commitment must be clear. Do not add repetitive confirmations to every small reversible action. Prevent accidental double commits, communicate disabled states and explain destructive actions in plain language. Buying/selling and time-advancing actions may have consequences that cannot safely be undone; distinguish planning cancellation from actual undo or a new replay.

**Acceptance:** Preview never changes economic state, actual month, location, RNG or route outcome. Test whether players correctly identify what will happen if they select Sail now while inspecting a future month. No guarantee or probability is displayed without support from the current engine and clear conditions.

## 7. Feedback and game feel (P0/P1)

Use the existing atlas visual vocabulary as a responsive consequence system, not a decorative overlay. Favor readable state deltas, consistent semantics, modest motion and direct acknowledgement.

| Trigger | Immediate response | Persistent response |
|---|---|---|
| Buy cargo | Cash and loaded weight change together; acknowledge lot count | Material mosaic and transaction ledger |
| Sell cargo | Show proceeds and released capacity | Ledger and updated inventory |
| Wait | Explain cost, elapsed month and actual condition/standing changes | Residence thread and port marks |
| Sail | A brief passage transition, skippable | Timestamped arrival or return; outcome summary |
| Adverse event | Concise cause, actual loss and available next options | Event report and log, chromatic rupture where useful |
| Standing threshold | State newly available discount/benefit if implemented | Port register and visible applicable cost |
| Settlement | Show realized values and reason campaign ended | Personalized folio and complete audit |

All illustrated feedback must be derived from actual state differences or structured events, not invented stories or re-running outcomes. Any trigger or display that cannot be derived from a before/after difference in `state` needs new recording. At `b607af9` that includes:
- visit counts (`state.visitedPorts` is a set);
- arrival months (D08);
- cash history;
- residence per port (only a global `stats.layoverMonths` exists);
- adverse events and turnbacks, which exist only as English log text built inside `sailTo`;
- lost and delivered cargo (`stats` counts tons loaded, D03).

Visit counts and arrival timestamps could come from a separately reviewed, read-only recording such as the one proposed in `docs/visual-evolution.md`. That proposal is in PR #7, unmerged and unreviewed. It records only origin, destination, departure month, months and turnback. Treasury history, per-port residence and cargo loss need recording that it doesn't propose. The current prototype builds its event reports from the voyage-log text, which is the kind of parsing this section warns against; record that as a known limitation. If records are insufficient, mark the limitation; do not parse ambiguous log text into false precision. D01/D07/D08 affect time and settlement; D02/D03 affect freight reporting. Gate richer visual claims on appropriate data fixes, as separate reviewed PRs.

**Game feel:** short, interruptible transitions; optional sound only if there is a meaningful, accessible purpose (off by default in classroom use); no obligatory waiting animation, screen shake, flashes or audio-only information. Respect reduced motion, focus, contrast, input responsiveness and small screens [3]. Rendering must never affect simulation state or consume random draws. An event card's dismissal should not remove the event from the ledger.

## 8. Pacing, progression and emergent mastery (P1)

Use natural milestones instead of manufactured dramatic incidents. A conceptual macro arc is learn → expand → consolidate; the 24 months need not be divided rigidly into thirds or scripted escalating difficulty. Some players may need to recover rather than expand. Preserve agency.

- **Learn:** first decisions make costs and constraints legible; support player understanding without guaranteeing profit.
- **Expand:** more capital, repeated voyages and investments may open alternatives under existing rules; avoid routine clicks that do not change strategic choices.
- **Consolidate:** make campaign time remaining and economic exposure visible; prepare the final audit without preempting the player's actions.

Potential milestones include first arrival, first adverse event, first discount, first profitable alternative comparison (only if the model can establish it), first solvency crisis, and first recovery. Trigger from actual events or validated state thresholds; do not introduce explicit prizes or bonuses, alter hazards to force drama, or label waiting as inherently wise.

Measure decision intervals, repetition, abandoned turns, time spent planning and instances of strategy revision through permitted observation. A rhythm chart is an experiential hypothesis, not measured difficulty. Let playtesting establish whether the middle campaign repeats too much and whether students have time for reflection. Keep lesson-length constraints in an instructor guide (none exists yet).

## 9. Failure and recovery (P0/P1)

| Situation | Feedback and recovery design |
|---|---|
| Purchase blocked | Explain cash or hold constraint and smaller feasible options |
| Hull damaged | Explain realized loss and available repair/continued-sailing choices |
| Crew health reduced | Show health and relevant existing recovery options |
| Cargo lost | Distinguish loaded, lost and delivered weight where records allow |
| Turnback | Show that destination was not reached and actual costs/time consumed |
| Liquidity crisis | Present actual cash, debt and available actions, without guaranteeing recovery |
| Insolvency or deadline | Explain end reason and actual settlement, not a misleading generic Month 24 label |
| Target missed | Retain full debrief and inquiry prompts; do not equate low profit with poor historical understanding |

D01 (late arrival), D07 (early end label), D08 (arrival date) require explicit resolution or limitations before relying on affected visual timelines. D03 is not delivered freight. Preserve the existing engine until fixes have been reviewed. In a replay, do not silently roll a more favorable hazard to rescue a player. Unclear feedback and incorrect controls are design defects; meaningful adverse consequences are learning opportunities.

## 10. Game economy and balancing practice (P0; Path B)

Treat the economy as resource flows, stocks, conversions, sources, sinks, bottlenecks and feedback loops. Historical validation and gameplay balance are related but separate: a plausible-looking price table is not evidence of an interesting decision system, and a balanced economic game is not a historical reconstruction.

```text
Sales / other income → Cash → Cargo purchases → Delivery → Sales
                          ├→ Wages / port fees / tariffs
                          ├→ Repairs / protection
                          ├→ Debt obligations
                          └→ Realized losses
```

Track capacity, time, capital, voyage losses, future information and terminal settlement as constraints on the reinforcing reinvestment loop. Begin from the existing D05/D06 prior looks. Baseline §5 reports all 5,400 informed simulated runs reach the 1,200 D target; same-seed ship rankings reverse across the three policies. These runs use exact future-price knowledge and a stand-in for `finishCampaign` with the same money logic, not actual student play or necessarily paired exogenous risks. Do not call the target trivial for all players or either ship universally dominant.

### First bounded balance audit

- Inventory resource stocks and transaction flows: cash, inventory lots/weight, debt, crew health, hull, time and standing. Map source functions and accounting units.
- Verify actual-game accounting and terminal settlement, including known deadline/turnback/loss defects. Report conservation errors and any differences from the existing harness.
- Specify simple feasible policies with explicit information sets: e.g. current-price-only, seasonal waiting, cautious liquidity, capacity-aware trading. Keep oracle policies separately labeled as upper-bound experiments.
- Pre-register comparisons, metrics and held-out scenarios; disclose prior looks. Sample starts, vessels, difficulties and feasible strategies; keep identical exogenous events only where the scenario design actually supports that comparison.
- Report distribution, risk, loss, resource constraints, strategy ranking and sensitivity, not just maximal profit. Investigate cost-free repetition, unlimited-market assumptions, predictable-price loops and end-of-game exploits as hypotheses, not assumed diagnoses.
- Identify the smallest decision-changing ablation or changed assumption. Study alternatives in Path B and seek historical support where needed. Do not tune for a predetermined pedagogical conclusion or arbitrary win rate.

Use the existing experiments M3/M4/M6 (milestone R7, with tests under R5) and relevant D IDs, not a new balance tracker. Keep sweeps local and bounded, with exact commands, seeds, model version, outputs and limitations. Do not launch large compute or paid CI without approval.

**Acceptance:** A reproducible audit identifies which constraints actually affect choice, and clearly separates student-feasible policies, hindsight and oracle cases. Owner approval and documented revalidation precede any classroom economy change.

## 11. Learning integrated into action (P0)

Habgood and Ainsworth's intrinsic-integration approach [4] motivates aligning what learners need to grasp with what they actually do to play. This is a design principle, not proof of learning effectiveness in Monsoon Navigator.

| Historical concept | Meaningful player decision | Reflection |
|---|---|---|
| Seasonal winds | Compare and select departure dates | When did waiting pay, and what did it cost? |
| Material transport | Allocate hold weight under capital constraints | What mattered besides nominal sale value? |
| Maritime risk | Invest in protection or retain liquidity | Which losses were avoidable under this model? |
| Commercial relationships | Revisit or remain in a port | What benefits does the game associate with standing? What does it omit? |
| Multi-centered networks | Choose among feasible routes | How did different ports contribute to the venture? |

Preserve teacher-led hypothesis and reflection, but integrate short observations and counterfactual thinking into play. Keep profit, actual condition, losses, freight and time distinct rather than scoring them into an invented welfare index. Do not grade chance outcomes as understanding. The historical inquiry is an investigation, not a conclusion to force through rewards. Use the evidence registry for supported claim anchors when available. The companion gameplay spec covers fair reference policies and research graduation; do not duplicate its scoring proposals here.

## 12. Emergent storytelling and player expression (P1)

Travel and trading games such as *80 Days*, *The Oregon Trail*, *Uncharted Waters: New Horizons* and *Sid Meier's Pirates!* are useful comparative design references (candidate games to inspect, not assertions that this project has reviewed their mechanics). Borrow principles, not art, code, characters or historical claims.

Let a voyage folio assemble a narrative from real decisions: routes and residence, material composition, risks and recovery, economic changes, reflections and model limitations. A player may look like a cautious seasonal trader, specialist, regional circuit merchant or resilient survivor, but these descriptors must be grounded in transparent observed criteria; avoid fixed character classes or mechanical bonuses. Avoid moral judgment inferred from profit or standing. Never fabricate merchant interpersonal relationships, visits, cargo or historical events.

Use `docs/visual-evolution.md` for the voyage thread, material mosaic, register marks, chromatic rupture, port identities, marginalia and final folio. The current prototype already has adverse event reports and a hold manifest; enhance rather than duplicate. Select the smallest visual change that helps players interpret their actual campaign.

## 13. Session continuity and error prevention (P1)

Design an optional explicitly controlled local save/resume system, not a backend. It is not yet implemented. Prefer anonymous versioned exports with clear privacy guidance, not automatically persisted student identifiers on shared devices. Consider browser capability and offline use; local storage can fail, be cleared, or behave differently for file URLs. Do not imply guaranteed durability.

A proposed save contract should contain model/build version, schema version, necessary game state, campaign objective and hypothesis where appropriate, non-identifying event/transaction history, saved date, and PRNG state or scenario version when reproducible RNG is implemented. An unseeded `Math.random()` run cannot promise exact continuation of future random events. Name/ID inputs must be omitted from generic saves; also check free-text fields and logs, which may contain personal details. Warn users before exporting. Provide a way to discard/clear local state and to begin a new campaign without silently destroying an active one.

On import, validate schema, version compatibility, type/range constraints, state references and record integrity. Treat saves as untrusted data, never executable HTML or JS; display text safely. Reject a corrupted/unsupported save without mutating active state. Do not mistake a checksum for authentication or proof of honest assessment. Save/resume is not an assessment security system.

**Acceptance:** Round-trip fixtures restore all relevant state; incompatible or invalid saves fail safely; no prohibited identifiers appear in default exports; an explicit clear operation works. Document what may change across model versions, what RNG guarantees are and are not possible, and whether an assessed instructor scenario permits resume. Any engine/RNG/state refactor requires owner review (D13, R5).

**Re-rolling.** With unseeded `Math.random()` (D13), saving before a voyage and reloading after a bad outcome lets a player redraw hazards until they get a better result. That quietly changes the risk the game is meant to teach, and it interacts with D05 and with assessment. Whether resume is allowed at all, and when, is an owner and instructor decision, to be made together with D13 and R5.

## 14. Formative games user research (P0 — first operational priority)

Automated model runs prove neither usability nor educational effectiveness. The next step should be observing a small number of appropriate participants playing the existing prototype, before investing in many new features.

**This section is not ethics or legal guidance. It has not been checked against the school's or any institution's policy.**

**Before anything involving students,** including a pilot, obtain:
- the school's approval;
- written consent from a parent or guardian for each minor, and the student's own assent;
- a data-retention plan naming who keeps any material, where, and when it will be deleted.

Instructor approval alone is not enough. Any session with students whose results may be published, including aggregate summaries in this public repository, counts as research for this purpose. Do not treat ordinary class participation as consent to research or publication.

**By default:** no audio or video recording, and no key linking session codes to identities. Without a key, the notes are anonymous. If a linking key is ever kept, the data is pseudonymous, not anonymous, and needs a named custodian and a deletion date. Recording needs its own separate consent.

**Starting point:** begin with internal adult volunteers. A small exploratory round of roughly 5–8 sessions is a suggestion, not a justified representative sample or a power calculation.

### Protocol

**Question:** Can a first-time player understand the objective, make and explain meaningful decisions, navigate setbacks and distinguish game assumptions from history without excessive help?

**Preparation:** Pin the revision, device/browser/viewport, scenario description, initial conditions, task script, moderator guidance and stop conditions. Record whether play uses the prototype or original page. The current live game is unseeded; do not call different runs same-weather comparisons. If randomness matters, use an appropriately controlled demonstration or document the observed outcome. Test the moderator script with one internal pilot. Use fictional student details and no recorded real names. Keep identifiable data, recordings, raw reports, screenshots and private class material outside Git and any public review artifacts.

**Session plan (illustrative, adapt to class time):**

| Segment | Approximate target | Task |
|---|---:|---|
| Orientation | 2–3 min | Ask player to identify the goal and begin, without teaching the solution |
| Setup and first passage | 8–12 min | Choose a vessel, form prediction, compare routes/months, buy cargo and sail |
| Subsequent choices | 10–15 min | Consider waiting, manage crew/hull and adjust strategy; observe a setback if it occurs |
| Audit or short debrief | 5–10 min | Explain a selected consequence and one alternative choice; if campaign unfinished, use the current evidence rather than pretending it ended |
| Interview | 3–5 min | Explore clarity, interest, perceived agency and difficulty |

Use a short think-aloud session for exploration, with neutral prompts such as “What are you looking for?” and “What do you expect will happen?” Do not supply the correct choice unless the participant is stuck; record assistance and its timing. Think-aloud can itself change play, so do not treat resulting timings as naturalistic play benchmarks. For timing-sensitive observations, consider a separate silent session. Permit stopping at any time and avoid framing the session as a test of the person. Do not script a random adverse event into the real classroom model merely for a session; an explicitly separate demonstration may be used if approved.

### Observation checklist

- [ ] Player identifies the goal and first action without prompting.
- [ ] Player distinguishes actual departure month from preview month.
- [ ] Player explains weight/lot/capacity and notices cash changes.
- [ ] Player predicts an effect of wind, compares departure alternatives, and explains the costs of waiting.
- [ ] Player understands why cash changed after a voyage.
- [ ] Player identifies a feasible alternative strategy or recovery option.
- [ ] Player recognizes a model assumption versus a historical claim.
- [ ] Player can find help, relevant source context and the audit.
- [ ] Player can interpret a ledger entry and connect it to a choice.
- [ ] Player can play with keyboard and/or the access methods appropriate to the test; observe relevant friction without assuming one session proves accessibility.

### Minimal observation record (template only; no participant data)

| Field | Example format |
|---|---|
| Revision / scenario / setup | SHA; preset, ship, port; viewport, browser |
| Non-identifying session code | Locally assigned random code, kept separate from identities |
| Task and expected understanding | Neutral task, outcome rubric |
| Observed action / elapsed interval | Factual description; time with stated start/end |
| Result | Independent / after hint / not completed / not observed |
| Assistance given | None or specific moderator intervention |
| Misinterpretation / friction | What happened, not presumed mental state |
| Design hypothesis | Possible reason, explicitly distinguished from observation |
| Proposed small change / re-test | Linked to feature or existing finding; no premature verification |

If a setback does not occur, record not observed rather than failure. Do not infer comprehension merely because the correct button was chosen. Collect examples of players' own explanations only with permission, minimize what is retained and remove identifying details. No analytics beacon, silent telemetry, personal identifiers or third-party tracking; observation-first, explicit consent for any later instrumentation. Avoid publishing unique quotes or small-cell information that could reveal identity.

### Synthesis and iteration

Classify findings by impact: cannot complete/unsafe, major misconception, significant friction, minor polish, or positive evidence. When recording them as findings, map these onto the review-process severities: cannot complete/unsafe = blocker; major misconception = high; significant friction = medium; minor polish = low. Positive evidence is noted, not filed. Reuse existing review IDs/dispositions under the repository's adopted protocol; avoid a separate issue namespace. (That protocol, `docs/review-process.md`, is in PR #5 and not yet merged.) Record observed counts with denominator (e.g. 3 of 6 sessions), assistance, uncertainty, and differences in test conditions. Do not generalize small convenience samples or confuse preference reports with behavioral evidence. Record no observed problems as “not observed,” not a proof of absence.

Select the highest-impact, lowest-complexity fix, state the expected behavioral improvement, implement it in a focused PR, and re-test with fresh participants where feasible. Keep alternative explanations and negative findings. Publish only aggregate, non-identifying summaries, and only when the approvals and consents above cover publication. With 5–8 sessions even aggregates can identify people, so avoid small counts tied to identifiable groups or unique details. Retain raw materials only under the agreed policy, outside Git.

For a later educational efficacy study, define learning outcomes, validated measures, comparison design and analysis in advance, and obtain relevant ethics approval. A usability pilot alone cannot establish increased learning or causal educational benefits.

## 15. Accessibility, session ergonomics and verification

Treat accessibility as a design practice from the start, not a final styling pass [3]. Test real browsers; DOM doubles are valuable for logic but cannot establish layout, focus, input or print quality.

| Concern | Acceptance check |
|---|---|
| Control clarity | Clear names, descriptions, current states and disabled reasons; no color-only signals |
| Keyboard/touch | Complete charter, forecast, trade, sail, recover, audit and close dialogs; visible focus and logical order |
| Responsive layout | 375 px and desktop; no unintended page overflow, usable trade table, readable text and hit targets |
| Theme/contrast | All five plate contexts and light/dark reading themes remain readable |
| Motion | Reduced-motion setting works, no forced timing or blocking effects; animations interruptible |
| Live feedback | Concise accessible action status, no overwhelming announcement flood |
| Error/destructive actions | State-preserving invalid-input handling, intentional reset/import/commit behavior |
| Offline / print | No required remote execution for prototype; complete multi-page audit without clipping, with fictional details |
| Semantic correctness | Actual/forecast distinction, time, cash, cargo, condition and effects are accurately derived |

Run the required browser transit fixture and record exact output. For the prototype also rebuild deterministically and run `node --test tests/prototype-engine.test.mjs`. Verify generated artifact freshness and inspect browser console. Test adverse outcomes, skipped/repeated rendering, input edge cases and no state/RNG effect from visual elements. Use an intentional regression where appropriate to prove that a check fails on the defect. Preserve the original protected file unless an approved mechanics PR requires a change. No CI/billing changes from a design-only task.

## 16. Prioritized delivery plan

In this table, "Track" is spelled out as Path A (classroom game), Path B (research outside `index.html`) or the visual track, as defined in section 1. It is not the Track A–C categories in `docs/gameplay-evolution.md` (PR #8), and not the work packages A–E in `docs/visual-evolution.md` (PR #7).

| Sequence | Deliverable | Track | Gate |
|---|---|---|---|
| 0 | Complete pending browser review of existing visual prototype; check current PRs | Path A / visual | Browser findings recorded; protected files and baseline preserved |
| 1 | Formative playtest protocol and pilot; explicit experience pillars | Path A | Permission, scoped tasks, observations and prioritized findings; no identifying artifacts |
| 2 | Address top observed comprehension/feedback gap; practice walkthrough concept | Path A | One focused change; observable re-test criterion; no engine mutation |
| 3 | Optional practice voyage and contextual help, if supported by findings | Path A (engine changes need owner approval) | State isolation; owner approval for required refactor; replayable tutorial |
| 4 | Economy flow/invariants audit and held-out strategy experiments | Path B; R5, R7 | Exact reproduction, prior looks, actual settlement and information limits |
| 5 | Pacing, milestone feedback and recovery iteration | Path A / visual | Actual event triggers, no forced events; accessibility and re-test |
| 6 | Session continuity proposal and implementation | Path A (state/RNG changes need owner approval) | Approved privacy/state/RNG contract, malformed-save tests and safe restart |
| 7 | Personalized folio and emergent narrative | Visual | Correct derived records, limitations for known defects and real print review |

The plan is conditional on findings: if an observed issue is more urgent, address it first with a justified narrow change. Use existing milestones and issue/review records. Do not introduce a permanent status table parallel to the tracker. Begin planning literature-supported alternatives in parallel, not by blocking all design work until the historical literature is complete.

## 17. Coding-agent handoff

1. Recheck `main`, visual branch and relevant PRs; read contribution rules, baseline, tracker, and adopted governance. Locate companion handoffs if present. Do not commit an obsolete status snapshot as the current state.
2. Add this document as a documentation-only change under the proposed destination, adapting it for any review or owner decision already made. Keep it separate from pending prototype browser fixes and unrelated research PRs.
3. Implement the smallest useful formative-playtest protocol and start with authorized internal testing. No hidden telemetry, real student artifacts or premature large-scale participant research.
4. Use observations to select one narrow experience improvement. Specify what it should change for the player and how to verify it; do not build every feature simultaneously.
5. Preserve existing protected mechanics and documented limitations. Separate experimental mechanics, RNG/save changes, bug fixes, historical claims and visual changes according to CONTRIBUTING.md. Coordinate with the visual and gameplay evolution specifications.
6. Run actual relevant checks and record exact results, skipped checks and independent review state. Do not claim usability, accessibility, learning or historical validation from model tests alone.
7. Ask the owner/instructor to approve consequential mechanics, assessment or classroom release changes. No direct merge, licence changes, CI cost changes or new external data requirements without permission.

**Definition of success:** Students voluntarily explore strategically meaningful alternatives, understand the consequences of their choices, and use the resulting campaign evidence to explain historical mechanisms and their uncertainties. A game that is harder, longer, prettier or more heavily instrumented is not automatically better.

## 18. References and precedent documents

General design references are leads and conceptual foundations, not a completed game-studies literature review. The cited official landing pages, publisher metadata/abstract and guidance were located on 2026-11-22; none was read in full. Reading depth on 2026-11-22: [1] landing page and abstract read; [2] not read, only the bibliographic record was located; [3] guideline index and version history read; [4] metadata only (Crossref). Register and verify specific claims at the appropriate reading depth if they become load-bearing research evidence.

1. Hunicke, R., LeBlanc, M., & Zubek, R. (2004). *MDA: A Formal Approach to Game Design and Game Research*. [AAAI workshop record](https://aaai.org/papers/ws04-04-001-mda-a-formal-approach-to-game-design-and-game-research/). Framework terminology and methodological lens.
2. Salen, K., & Zimmerman, E. (2003). *Rules of Play: Game Design Fundamentals*. MIT Press. ISBN 9780262240451 (checked against Open Library: *Rules of Play*, The MIT Press, 2003). [Open Library record](https://openlibrary.org/isbn/9780262240451). The earlier MIT Press link did not load on 2026-11-22, so it has been replaced. Candidate for deeper reading on meaningful play, discernible and integrated consequences; exact chapter locator to verify before formal extraction.
3. Microsoft. *Xbox Accessibility Guidelines*, v3.2. [Guideline index](https://learn.microsoft.com/en-us/xbox/accessibility/guidelines); [version history](https://learn.microsoft.com/en-us/xbox/accessibility/xag-version-history), including the gameplay-tutorial guidance added to XAG 109 (Objective clarity) in v2.5 (30 July 2021). The current version, 3.2, is dated 8 June 2023. Adapt principles to browser classroom games; do not claim certification or legal compliance.
4. Habgood, M. P. J., & Ainsworth, S. E. (2011). Motivating children to learn effectively: Exploring the value of intrinsic integration in educational games. *Journal of the Learning Sciences, 20*(2), 169–206. [DOI 10.1080/10508406.2010.508029](https://doi.org/10.1080/10508406.2010.508029). Motivates the design principle; the proposed playtest protocol does not reproduce that study.

Project references (pinned checkpoints):

- [Monsoon README](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/README.md): inquiry, game loop, limitations and in-memory state.
- [Monsoon baseline](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/baseline.md): protected engine, existing D IDs and exploratory results.
- [Monsoon CONTRIBUTING](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/CONTRIBUTING.md): approval, validation and privacy rules.
- [Monsoon research tracker](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/research-directions-and-milestones.md): existing work-package and milestone alignment.
- [Prototype documentation](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ff74d45cc92907f29126626587ae68e2d2703d37/docs/prototype.md): presentation adapter, actual versus forecast semantics, offline behavior and pending browser review.
- [Prototype engine tests](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ff74d45cc92907f29126626587ae68e2d2703d37/tests/prototype-engine.test.mjs): logic tests and their DOM-double limits.
- [Frost & Silver design guide](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/design.md) and [teaching guide](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/teaching-guide.md): contextual control placement, milestones, same-weather replay and educational framing.
- [Frost & Silver strategy study](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/strategies-2026-11-18.md): method for comparing incentives and the intended lesson, without importing the mechanics or files.
