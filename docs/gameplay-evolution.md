# Monsoon Navigator — gameplay evolution from Frost & Silver

**Project:** Monsoon Navigator (*An Atlas of Moving Worlds* is the working title of the externally approved art direction, not the project's name)  
**Date:** 2026-11-22 (KST)  
**Committed:** as `docs/gameplay-evolution.md`, documentation only, with review notes. Nothing here is approved by the owner.  
**Status:** Proposed design and research handoff; not approval to change mechanics, grading, licensing or release rules.  
**Compared revisions:** [Frost & Silver `d64a632`](https://github.com/Azuromalachite/frost-and-silver-game/tree/d64a632eaa78e2bc33f9cc4fd1726266f68ac246), [Monsoon Navigator `b607af9`](https://github.com/Antooooon125/Week3-monsoon-navigator/tree/b607af9dce751bae56528655a65afc362e21d8c7), and the separate [visual prototype `ff74d45`](https://github.com/Antooooon125/Week3-monsoon-navigator/tree/ff74d45cc92907f29126626587ae68e2d2703d37). Recheck current branches and open PRs before implementation. This is based on source and documentation inspection, not a new execution of either game.

## 1. Design thesis

**A historical laboratory disguised as a merchant voyage.**

Transfer Frost & Silver's inquiry-driven gameplay, rather than its Andean mechanics or a prescribed historical conclusion. Frost & Silver asks how growth can coexist with declining human welfare. Monsoon Navigator asks how seasonal environmental constraints shape commerce, circulation and human relationships. Its own potential tension is commercial efficiency versus resilience, liquidity and dependence on other people. That tension must be tested rather than manufactured by arbitrary scores or scripted results.

Students should play two roles: merchants making constrained choices and historians investigating the consequences of those choices. The loop is **predict → decide → observe → compare → explain**. The personalized voyage folio proposed in the visual-evolution document should express this loop, not add redundant dashboard instrumentation. Wind rose integration is excluded from the classroom visual backlog; retain the existing directional field, season calendar and route comparison.

## 2. Scope and authority

- `CONTRIBUTING.md` governs changes; `docs/baseline.md` protects the classroom engine and records existing defects. The owner must agree to protected-mechanics changes before the PR opens. Do not treat a proposal here as such agreement.
- Maintain the classroom entry point (Path A) separately from independent research (Path B). The visual prototype is a generated artifact with a presentation adapter, not a second authoritative engine. Preserve the original page and complete its pending real-browser review before expanding the visual scope.
- Use `docs/research-directions-and-milestones.md` as the living project tracker. Priorities here are recommendations, not new milestone or defect IDs.
- Adopt principles and write original implementations. Do not copy Frost & Silver code, CSS, documents or other CC BY-NC-SA files into Monsoon Navigator while the licence-scope question remains open ([issue #4](https://github.com/Antooooon125/Week3-monsoon-navigator/issues/4)). Preserve creator and asset attribution. This proposal does not settle licensing.
- No actual student details, identifiable reports, screenshots or private class materials in Git, fixtures or review artifacts; use fictional examples.
- Model output is conditional on model assumptions. A successful simulated comparison is not a historical causal estimate. Research may overturn the intended teaching narrative.

## 3. Transfer matrix

| Frost & Silver precedent | Monsoon Navigator translation | Priority | Track |
|---|---|---|---|
| Prediction before play and evidence-based debrief | Testable voyage hypothesis, dated evidence and reflection | P0 | A |
| Same-weather replay | Reproducible maritime scenario with defined exposure | P0 | B |
| Matched counterfactuals | Alternative departure dates, vessel and investment choices | P0 | A/B |
| Strategy sweeps and sensitivity analysis | Diagnose commercial balance and policy-dependent ship advantage | P0 | B |
| GDP and food viewed separately | Profit, delivered freight, resilience and liquidity shown separately | P0 | A/B |
| Instructor teaching guide | Structured classroom comparison and fair assessment | P0 | A |
| Advance-selected strategy vs hindsight | Feasible reference policies, explicit information sets | P1 | B |
| Weather presets | Interpretable factorized scenarios | P1 | B/C |
| Milestone interruptions | Significant economic and sailing events with contextual questions | P1 | A |
| Re-planning under changing constraints | Revision of original plans after disruption | P1 | A/B |
| Quipu harvest reports | Personalized voyage folio and transparent ledger | P1 | A |
| Source-linked glossary | Historical marginalia at decisions | P1 | A/C |
| Alternative institution models | Test mechanisms of partnership, credit and seasonal residence | P1 | C |

A = pedagogical/presentation enhancement, B = reproducible experiments, C = historically informed mechanics. The same three letters label the delivery levels in section 13. They are not Path A/B (classroom game versus research) and not the work packages A–E in `docs/visual-evolution.md`. Track B work starts in Path B. Track C mechanics are researched in Path B and reach the classroom game only through owner-approved graduation (R8). Some A items require additional derived records; if a change affects protected logic, seek approval instead of classifying it as presentation.

## 4. Reproducibility and fair comparison (D13; M3, M4, M6)

Frost & Silver provides same-weather replay and weather presets; it checks that choices do not alter weather. Monsoon Navigator's live classroom RNG is unseeded at the inspected baseline. The research harness uses seeds but different routes and decisions consume different random draws. Merely passing the same seed is insufficient for matched exposure.

### Proposed experimental contract

1. Define a replayable scenario with version, initial state, policy information, seasonal rules and a deterministic random design. Preserve a normal random-play option.
2. Distinguish exogenous environmental conditions from conditional hazards caused or modified by the player's actions. Candidate designs include event tables keyed by time and location or purpose-specific random streams. Independent streams reduce accidental coupling but do not automatically establish common random numbers; specify what is matched, the relevant event identities and how repeat encounters are counted.
3. Do not force equal realized hazards when ships travel different routes at different times or differ in protection. A comparison holds a shared exogenous realization fixed, not all realized consequences.
4. A recorded action sequence can replay the same campaign under identical conditions, if feasible and the engine version matches. It is not automatically a general decision policy applicable to other histories. For alternative scenarios use explicit policies, including infeasible-action handling and allowed information.
5. Persist compact, versioned scenario metadata and event/action provenance for private local replay only as needed. Public fixtures must be synthetic. Do not introduce telemetry or upload student campaigns.

### Three comparison types

| Comparison | Hold fixed | Vary | Interpretation |
|---|---|---|---|
| Different strategies, same scenario | Initial state, rules and exogenous realization | Decision policy | Conditional effect of choices under that scenario |
| Same policy, different scenarios | Initial state, rules and policy | Environment realization | Robustness of a specified policy |
| Alternative institutional rules | Defined initial state, scenario and policy convention | A specific rule or model | Conditional model effect, not historical proof |

**Acceptance:** identical scenario and feasible action sequence reproduce state and event records at the same engine version; forecasts and visual rendering consume no simulation randomness; changing a UI theme does not affect hazards; comparison documentation identifies what is genuinely held fixed and what is not. Verify that changed paths do not spuriously shift unrelated exogenous events. Include deliberately failing cases. Initially implement and test in Path B; live RNG changes require separate owner approval.

## 5. Forecasts as student-scale counterfactuals

The existing departure comparison is a strong foundation. A student should first predict what will happen, inspect a controlled comparison and explain the consequence for a feasible plan. Avoid expanding the UI into a complex experiment console.

| Experiment | Hold fixed | Vary | Important limitation |
|---|---|---|---|
| Seasonal transit | Route, vessel, navigator state | Departure month | Narrow transit calculation; not a complete waiting decision |
| Vessel | Route, departure, comparable capital/state | Vessel type | Capacity feasibility and initial conditions must be explicit |
| Investment | Defined starting state and scenario | Navigator, escort or cargo protection | Charge purchase cost and allow only feasible actions |
| Wait or sail | Current state and shared scenario design | Action or feasible policy | Include time, all costs, opportunity cost and subsequent state |
| Standing mechanism | Scenario, policy convention | Specific standing benefit | Path B only until researched and approved |

### Existing example: Aden → Calicut, dhow, no navigator

At the pinned baseline, the deterministic transit table gives July 14 simulated days (one charged month, 15 D crew wages) and January 53 simulated days (two charged months, 30 D crew wages). These are game numbers, not historical passage durations. The model distance is under investigation (D10). Do not infer that waiting from January to July is profitable just from these numbers: waiting incurs wages and port fees, changes standing, advances the campaign, and can change purchase/sale prices and available opportunities. Hazards also differ.

**Student prompt:** “Would waiting be worth it in your situation? Compare the immediate passage cost with the full cost of the alternative plan, and identify uncertainties.”

**Acceptance:** comparison panels clearly distinguish actual state, forecast and realized outcome; display the information available at decision time; do not mutate gameplay or consume randomness. A forecast is not a guarantee. Any full counterfactual simulation uses an isolated state and defined random design.

## 6. Economic and strategy balance before new mechanics (D05, D06; M3, M4, M6)

Frost & Silver's documented strategy grid explored 2,304 strategies across 80 weather seeds (184,320 simulations). It exposed a contradiction: diversification was described as insurance but the modeled frost rules penalized spreading crews uphill. The response was to correct the explanation, not silently invent historical evidence or tune the model to force the intended lesson. Its welfare-score revisions also illustrate the danger of composite metrics driving player incentives.

### Monsoon Navigator prior look — do not preregister as unseen

The existing exploratory economy harness ran 5,400 trials: three difficulties × two ships × three policies × 300 seeds. All exceeded 1,200 D. Normal-difficulty median net profits are:

| Policy | Dhow (D) | Junk (D) |
|---|---:|---:|
| Sail always | 88,305 | 167,826 |
| Avoid headwinds | 216,713 | 175,864 |
| Avoid headwinds and transition | 217,957 | 456,317 |

The corrected baseline reports dhow wins in 300/300 same-seed comparisons under avoid-headwind, and zero under the other two policies, in each tested difficulty. Shared seeds are not common random numbers. The harness starts at Calicut, knows future prices, greedily buys by destination price/purchase-cost ratio, sells everything on arrival and uses a surrogate liquidation routine rather than the real `finishCampaign`. These are exploratory model results, not student success rates, validated merchant profitability, or proof that every strategy succeeds. The earlier universal-junk-dominance interpretation was wrong.

The unusually large profits motivate diagnosis; they do not by themselves establish which mechanism causes the result.

### First research experiment

- Reproduce the existing baseline and sweep, then compare the harness with actual game settlement. Resolve or explicitly condition on D01, D02, D03, D07 and D08 where they affect the outcome. Report any changes to the definition of profit or freight.
- Register a new comparison before examining new results, disclosing the prior look. Use feasible named policies with student-visible information, additional starting ports, capital states, cargo mixes, investments and held-out scenarios.
- Decompose gross sales, acquisition cost, tariffs, voyage and waiting wages, port fees, loss, repair, debt and liquidation. Track reinvestment, hold occupancy and repeated trade cycles. Test which mechanisms drive extreme profits and ship rankings.
- Independently vary price information, capital constraints, market throughput, costs, seasonal opportunities and hazard exposure in Path B. Market capacity, demand and uncertain prices are research candidates, not new classroom rules. Anchor plausible ranges in sources or explicitly label them exploratory.
- Report distributions, lower-tail results, insolvency, scenario/strategy rank reversals, and sensitivity to assumptions, not just average profit. Keep advance-selected policies distinct from hindsight optimization.
- Do not change the 1,200 D target simply to make the game harder, or add arbitrary penalties to produce a preferred vessel ranking. Test whether the teaching trade-offs are observable under feasible play.

**Acceptance:** a reproducible accounting reconciliation and conditional explanation of D05/D06, including counterevidence and limits. M3/M4/M6 registration cites baseline §5 and tracker checkpoint 2. Research must be capable of finding that a proposed mechanism is unnecessary or that the current teaching explanation is unsupported.

## 7. Multiple outcomes, not a Merchant Welfare Index

Borrow Frost & Silver's separation of economic output from human outcomes, not its particular welfare formula. Preserve the financial goal, but make distinct outcomes legible. Do not introduce a composite merchant score or arbitrary weighting without a defensible pedagogical and methodological reason.

| Dimension | Candidate measure | Guard against |
|---|---|---|
| Commercial performance | Net realized profit after settlement; return on initial equity | Confusing revenue with profit, or loan with equity |
| Liquidity | Lowest cash balance; cash shortfalls; debt service | End cash hiding insolvency risk; unclear treatment of debt |
| Freight | Loaded, lost, returned and delivered tons by category | D02 category mismatch and D03 counting loaded as delivered |
| Operational condition | Crew condition, hull integrity, adverse events | Treating game condition as historical human welfare |
| Time | Month spent at sea/in port; missed departures; campaign end reason | D01 deadline overrun, D07 early ending, D08 date ambiguity |
| Relationships | Visits, residence and game standing separately | Equating visits/standing with real trust or community membership |

The UI can initially show reliable existing quantities with clear labels. Do not derive delivered tonnage, minimum cash or exact trajectory from inadequate logs; implement approved structured event recording or mark unavailable. Metrics should reconcile with actual game state and preserve source units. Report final conditions and cumulative exposure separately.

The personalized voyage folio should present recorded choices and consequences using the previously proposed voyage thread and material mosaic. Label illustrative or missing information. Never fill gaps with fabricated destinations, relationships or route histories.

## 8. Scenario design and difficulty

Frost & Silver's current weather presets select deterministic weather realizations under unchanged rules; selected presets are not a representative empirical distribution. Monsoon Navigator's existing difficulty levels instead alter multiple parameters at once.

| Difficulty | Cash (D) | Loan (D) | Starting equity (D) | Hull damage multiplier | Port fee multiplier |
|---|---:|---:|---:|---:|---:|
| Easy | 3,000 | 0 | 3,000 | 0.5 | 0.6 |
| Normal | 1,500 | 0 | 1,500 | 1.0 | 1.0 |
| Hard | 800 | 500 | 300 | 1.0 | 1.0 |
| Survival | 600 | 0 | 600 | 2.0 | 1.1 |

Easy also offers route hints, and Survival modifies piracy exposure. Retain the existing modes unless an approved change is made. Do not attribute outcomes across difficulty modes to weather alone.

### Proposed experimental axes (Path B first)

- Economic position: starting equity, debt financing and available working capital.
- Environmental realization: ordinary seasonal conditions, adverse passages or repeated disruptions, with documented scenario selection.
- Institutional assumptions: baseline standing benefits versus a defined counterfactual mechanism.
- Information and assistance: observable forecasts, price information and instructional hints as explicit conditions.

An instructor can select a fixed reproducible classroom scenario; researchers can vary axes independently. Keep the student-facing setup concise. If future presets are selected from simulation runs, record selection rule, candidate seeds and known outcomes; identify them as designed scenarios, not historical frequency estimates.

## 9. Meaningful turning points and re-planning

Frost & Silver pauses at important milestones, rather than simply running the simulation forward. Translate this into inline voyage reports and occasional reflection opportunities. The visual prototype already reports first adverse-event types without changing simulation state.

| Trigger (recorded event or measured condition) | Prompt |
|---|---|
| First costly headwind passage | What would waiting have cost, and what might it have saved? |
| First significant delay, turnback or loss | How would you revise your route or cargo plan? |
| First debt repayment or cash shortfall | Which decisions affected liquidity? |
| First standing discount | How did the game's rules turn residence or arrivals into lower costs? |
| First repeated port visit | What benefits and constraints follow from returning? |
| First campaign end, including early insolvency | What happened, and which parts were outside your control? |

**Review note: which triggers the engine can detect today** (at `b607af9`, without new recording):

| Trigger | Detectable? |
| --- | --- |
| Headwind passages, turnbacks, losses and debt repayment | Yes. They appear as voyage-log entries when they happen |
| A first standing discount | Yes. Standing crosses the 20 and 50 thresholds in the live state |
| A cash shortfall | Yes. Cash below zero can be seen at the moment it happens |
| **First repeated port visit** | **No.** `state.visitedPorts` is a set, with no counts or order, and standing is not a visit count |
| An early insolvency ending | Only partly. It currently shares the month-24 label (D07) |

The repeated-visit trigger, and the "Visits" measure in section 7, need the separately reviewed read-only recording proposed in `docs/visual-evolution.md` (V01 review note). Until then, mark them unavailable rather than inferring them.

A “profitable layover” requires a specified comparison; do not trigger that claim just because standing increased. A loss event is a model outcome, not an occasion to present an unsupported historical anecdote. Avoid obligatory pop-ups for each transaction; use inline, dismissible notes and an ordinary event log. Every consequential event remains in the ledger even if dismissed. Do not introduce an arbitrary punishment for missing reflection prompts.

Allow students to revise their hypothesis or strategy during a campaign while retaining the initial version in the debrief. Record why they changed it. Re-planning is not a failure of the initial prediction; it is evidence of learning when justified. Do not infer a reusable policy from an incomplete action log.

**Acceptance:** turning points correspond to actual logged events; repeat rendering, dismissal and reflection do not change random draws, economic state or time; keyboard and reduced-motion behavior remain accessible. Preserve the underlying model and avoid claiming impossible comparisons.

## 10. Fair reference strategies and information limits

Use three clearly separated benchmarks:

| Benchmark | Definition | Appropriate use |
|---|---|---|
| Actual campaign | Recorded decisions and realized outcomes | Student explanation |
| Advance-selected reference policy | Chosen before scenario outcome is inspected; uses specified contemporaneous information and feasible decisions | Conditional comparison, not automatic grading |
| Hindsight benchmark | Restricted optimization using information not available in ordinary play; search space and limitations disclosed | Illustrate possible outcomes and limitations |

Candidates for reference policies: rapid turnover, seasonal sailing, conservative liquidity management and capacity utilization. Define route selection, purchasing and selling, waiting, repairs, investments and action feasibility, including what happens when cash, cargo or dates constrain the plan. Choose a reference policy before testing on held-out scenarios. Report the policy's information set; perfect knowledge of deterministic future prices is not necessarily available to students.

Use real settlement and consistent objective definitions. A strategy maximizing profit is not necessarily optimal on resilience or freight delivered. Where trade-offs exist, report multiple measures or non-dominated alternatives without inventing a single overall winner. Do not label a search over restricted policies as a global optimum.

## 11. Merchant ecology and institutional mechanics (P02, P03, P06; M5)

The present game adds standing on waiting and arrival, with discounts at thresholds. This is a pedagogical assumption, not evidence that mere time in port creates trust. The research question is when seasonal mobility and residence could encourage durable cooperation, and when costs, unequal power or conflict prevent it.

Potential mechanisms for literature-led investigation:

| Candidate mechanism | Testable question |
|---|---|
| Brokers and intermediaries | Does access to local knowledge alter feasible exchange, rather than merely grant a discount? |
| Warehousing and consignment | Can merchants separate cargo ownership, storage and transport timing? |
| Credit and partnership | How do risk sharing and liquidity constraints interact with seasonal circulation? |
| Distributed agents and information | When do networks overcome information delays and absence? |
| Repeated exchange and enforcement | What additional conditions make cooperation durable? |
| Political protection and institutions | Who benefits, who pays, and which risks remain? |

These are hypotheses and design candidates, not confirmed historical descriptions or implementation mandates. Begin with source-specific observations from the merchant-institution work package. Separate chronological and geographical contexts. Build the smallest independent model capable of comparing competing mechanisms, including no relationship benefit and cases where cooperation fails. Register falsifiers and document uncertainties. Do not invent fictional historical individuals, fixed ethnic traits or uniform institutions across centuries. Only graduate mechanisms into the classroom after evidence review, behavioral validation and owner approval.

## 12. Instructor guide and assessment

The game already follows Predict → Simulate → Audit. Extend it with a structured classroom investigation, not mandatory financial success. An illustrative 45–60-minute instructor-led pilot (subject to play-time testing and instructor approval):

| Stage | Activity |
|---|---|
| 5–10 min | Introduce map, time compression, source and model distinctions; write a testable hypothesis |
| 20–25 min | Play a defined campaign or a teacher-approved shortened exercise; record meaningful decisions |
| 10–15 min | Examine one controlled departure comparison or, when available, a reproducible alternative campaign |
| 10 min | Review ledger/folio, discuss trade-offs and historical limits |

Do not shorten the protected 24-month game just to fit this schedule; use a selected example or a later approved scenario if a full campaign is too long. Same-scenario replay is not available in the inspected classroom baseline; use deterministic forecast comparisons in the initial pilot.

### Proposed rubric for instructor discussion only

| Dimension | Illustrative weight |
|---|---:|
| Quality and testability of hypothesis | 20% |
| Reasoning about navigation and commercial decisions | 25% |
| Interpretation of actual campaign evidence | 25% |
| Counterfactual comparison and explanation | 20% |
| Recognition of model and historical limitations | 10% |

Do not implement these weights as official grading without instructor approval. No grade penalty merely for adverse random outcomes. A failed venture can support an excellent analysis. Assess the quality of decisions using information available at the time, evidence interpretation and justified revisions. If tests are not reproducible, avoid claiming that student outcomes differ solely because of skill. Keep the teacher's existing grading authority and privacy requirements.

## 13. Delivery sequence and acceptance gates

### Level A — immediate pedagogical work, preserving mechanics

After reviewing the existing visual prototype, add or improve the teaching guide, hypothesis wording, turning-point questions, source-aware marginalia and a multidimensional audit using already valid metrics. Coordinate with `docs/visual-evolution.md`: voyage thread, material mosaic, folio, no wind rose. Do not introduce new gameplay rules or unreliable derived statistics. Suggested narrow documentation PR first; keep baseline and visual work separate as appropriate.

**Gate:** existing 480-case browser baseline MATCH; before/after screenshots at phone and desktop widths for visible changes; prototype's Node tests retained and rerun when relevant; no state/RNG changes from presentation; actual browser review and fictional print output for audit changes. Explicitly report skipped checks. Evidence claims must be registered or marked as assumptions and reviewed.

### Level B — reproducible experiments and model diagnosis

R5 regression tests and research protocols for D13 and M3/M4/M6. Begin with minimal scenario/replay design in Path B, actual-engine accounting reconciliation and advance-selected feasible policies. Correct known audit/time defects in separate reviewed PRs with updated baseline entries. Behavioral tests should include intentional failures (e.g. mutated cash accounting, wrong date or display consuming RNG). The live replay system, if proposed, requires owner agreement before implementation. Keep heavy strategy sweeps local/manual, avoid expensive or unnecessary CI runs.

**Gate:** preregistration with prior looks; pinned model, environment and scenario definitions; exact commands; all outcomes including failures; deterministic replay and meaningful comparison invariants; independent reproduction. Do not promote prototype test coverage into claims about historical accuracy or completed R5.

### Level C — literature-driven gameplay mechanics

Use P01–P08 research and R3/R4 evidence/data groundwork as appropriate; conduct M1–M6 independent experiments under R6/R7. Research regional sailing windows, vessel trade-offs, market capacity, credit and institutions before modifying the classroom engine. The game need not simulate every historical mechanism to teach its question.

**Gate:** historical evidence with exact source locators and actual reading depth, defensible parameter ranges or explicit uncertainty, model tests including counterevidence, a documented teaching benefit, independent review and owner-approved R8 graduation. Update baseline and affected fixtures in the same approved mechanics PR. Never move the baseline to conceal a regression.

## 14. Immediate handoff for the implementing agent

1. Recheck main, visual branch, governance PRs and approved contribution rules. Do not overwrite concurrent edits or merge without permission.
2. Commit this as documentation only if authorized; keep it separate from the pending prototype browser review. Reference the living tracker instead of creating a competing status board.
3. Review the current prototype's actual behavior in a real browser and reuse its valid tests. The reported 14 passing Node checks and 480-case MATCH are not independent browser layout or historical verification.
4. Specify the smallest Level A improvements possible without changing the protected engine, starting with the instructor guide and questions tied to existing forecast and audited data.
5. In parallel, plan the first Path B experiment: diagnose price/capital/route policy effects using real settlement, disclose prior looks, and define reproducible scenarios. Deal with D01/D02/D03/D07/D08/D13 where relevant before asserting comparisons.
6. Report revision, changed files, exact checks and results, unrun checks, open evidence gaps and owner decisions. Seek independent re-review. Follow the repository's every-PR requirements, including baseline result and before/after screenshots for visible changes.

Definition of success: **students can make a meaningful choice, inspect its consequences, compare a feasible alternative and explain both the model's lesson and its limits.** Do not judge success by feature count, more UI controls, or the ability to force a preferred historical conclusion.

## 15. Revision-pinned precedents and project references

The following are repository references for the design comparison, not external historical evidence. Links pin the inspected revision so future changes do not silently alter the precedent.

### Frost & Silver

- [README — core learning loop and same-weather replay](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/README.md)
- [Teaching guide — classroom framing, reproducible scenarios and assessment](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/teaching-guide.md)
- [Design guide — pacing, predictions, reports and accessibility](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/design.md)
- [Strategy investigation — dominant policies and text/model contradictions](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/strategies-2026-11-18.md)
- [Sensitivity investigation — robustness and mechanism attribution](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/sensitivity-2026-11-18.md)
- [Hard-mode study — selection of weather scenarios](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/hard-mode-2026-11-18.md)
- [Weather debrief proposal — three comparisons; proposed rather than implemented behavior](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/docs/weather-debrief-proposal-2026-11-18.md)
- [Contribution rules — evidence, pinned run and fail-capable model checks](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/CONTRIBUTING.md)

### Monsoon Navigator

- [README — inquiry question, current play and limitations](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/README.md)
- [Contribution rules — protected mechanics and required checks](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/CONTRIBUTING.md)
- [Baseline — parameters, defects, prior exploratory results and licensing boundary](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/baseline.md)
- [Research directions and milestones — canonical research tracker](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/research-directions-and-milestones.md)
- [Visual prototype documentation](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ff74d45cc92907f29126626587ae68e2d2703d37/docs/prototype.md)
- [Prototype engine test suite — DOM-double tests and known limits](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/ff74d45cc92907f29126626587ae68e2d2703d37/tests/prototype-engine.test.mjs)

Companion planning documents, all open and none merged when this was committed:
- `docs/repository-infrastructure-handoff.md` (PR #5);
- `docs/pre-literature-readiness.md` (PR #6);
- `docs/visual-evolution.md` (PR #7).

Check their current status before treating them as binding rules.
