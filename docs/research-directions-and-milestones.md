# Monsoon Navigator — research directions and milestone tracker

**Project:** [Week3-monsoon-navigator](https://github.com/Antooooon125/Week3-monsoon-navigator)  
**Snapshot:** 2026-11-22, `main` at [`426a610ce98f0ec17c8d65508b9cc6b3cee2a057`](https://github.com/Antooooon125/Week3-monsoon-navigator/commit/426a610ce98f0ec17c8d65508b9cc6b3cee2a057) (merge at 12:59 KST).  
**Classroom engine baseline:** `111acdc72821a259b679d2c6f5e7afa44630e2a5`.  
**Status:** Proposed living research tracker; R0 merged, later milestones not yet authorized or implemented by this document.  
**Companions:** `research-infrastructure-roadmap.md`, `art-direction.md`, `design-system.md`, `visual-refactor-plan.md` (prepared separately and **not committed to this repository**). This tracker defines the R-, M-, P- and Q-identifiers it uses, so it can be read without them.  
**Later checkpoints:** see section 8; the 2026-11-22 checkpoint 2 corrects D06 and section 2.1.

## 1. Research charter

**Classroom question:** How did seasonal winds shape what merchants carried, when they sailed, and whom they depended on?

**Research question:** Under what physical, economic and institutional conditions can recurring environmental constraints organize durable commercial networks? When do adaptation, cooperation and resilience emerge, and when do they fail?

Monsoon Navigator is a classroom game first. Preserve Path A (classroom model) while developing independent Path B research. Research is allowed to contradict the game. Do not tune an alternative model merely to recover its intended lesson. A historically plausible mechanism, a documented observation, a calibrated estimate and a model-generated outcome are distinct evidence types.

Use Frost & Silver as a methodological precedent: provenance, preregistration, explicit counterevidence, reproducibility, uncertainty and reviewed graduation of research into gameplay. Per the current CONTRIBUTING rules, write original infrastructure rather than copying CC BY-NC-SA files until the owner resolves licensing. No engine or license changes are authorized here.

## 2. Verified repository checkpoint

| Item | State at snapshot | Evidence |
|---|---|---|
| PR #1 | Merged; clock, hypothesis check, target validation and wording fixes | [PR #1](https://github.com/Antooooon125/Week3-monsoon-navigator/pull/1) |
| R0 / PR #2 | Merged; contribution rules and pinned baseline | [PR #2](https://github.com/Antooooon125/Week3-monsoon-navigator/pull/2) |
| Baseline inventory | Ships, ports, prices, winds, hazards, protected functions, defects | [baseline.md](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/426a610ce98f0ec17c8d65508b9cc6b3cee2a057/docs/baseline.md) |
| Transit regression | 480 rows (10 directions × 12 months × 2 vessels × 2 navigator choices) | `tests/fixtures/baseline-transit.json`, `tools/baseline-check.html` |
| Checker verification | Repository reports MATCH, and 96 changed rows in an intentional coefficient mutation | `docs/baseline.md` §3; reported test, not independently rerun for this review |
| Economy sweep | Seeded harness; exploratory, not preregistered | `tools/baseline-harness.js`, `docs/baseline.md` §5 |
| Contribution rules | Owner agreement required before mechanics PR; prior looks disclosed | `CONTRIBUTING.md` |
| Literature baseline | Introductory README references only; no committed structured extraction or claim/source registry | Main tree at snapshot |
| Research and evidence infrastructure | No `research/`, `evidence/`, `references/`, or CI workflow committed | Main tree at snapshot |
| Visual redesign | Approved externally; not yet implemented or documented in main | Main tree at snapshot |
| Open PRs / branches | No open PRs returned; only main listed | GitHub API snapshot |

To repeat the existing checker:

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000/tools/baseline-check.html`. Append `?sweep=300` to reproduce the exploratory sweep. The sweep uses a seeded harness, not seeded classroom gameplay. It substitutes a simplified liquidation function; therefore it does not independently verify the real final audit. Preserve that limitation when interpreting results.

### 2.1 Prior looks that constrain future registrations

The R0 sweep reports 18 cells (3 difficulties × 2 vessels × 3 strategies), 300 seeds per cell = 5,400 runs, all exceeding the 1,200 D profit target. It additionally reruns paired sail-always comparisons. These strategies start at Calicut, know prices, greedily buy by price ratio, and sell upon arrival. No inference about ordinary student success, actual merchant profitability or all possible strategies follows.

Normal-difficulty medians (net simulated D), copied as observations of the model from baseline §5:

| Policy | Dhow | Junk |
|---|---:|---:|
| Sail always | 88,305 | 167,826 |
| Avoid headwind | 216,713 | 175,864 |
| Avoid headwind and transition | 217,957 | 456,317 |

The paired sail-always comparisons found zero dhow wins per 300 seeds at each of three difficulties. However, the dhow has the higher avoid-headwind median at all three difficulties. **Do not generalize zero paired wins under sail-always into universal junk dominance.** Nor do the aggregate medians alone establish paired win rates for the other policies. R0 wording around D06 should be clarified in a documentation PR.

> **Checkpoint 2 update.** Done in the PR that committed this tracker; see section 8. The win counts are now measured for every policy. The dhow wins 300/300 under *avoid headwind*, and the junk wins 300/300 under the other two policies, at every difficulty. "Paired" overstated the design: the runs share a seed, not common random numbers, which is the weakness section 4 warns about. M3, M4 and M6 must explicitly cite this prior look. A new preregistered test may use held-out seeds, alternative policies, parameter regimes and independent observations; it cannot retroactively be blind to the present baseline.

### 2.2 Defect tracking (retain repository IDs)

| ID | Current issue | Research / release dependency |
|---|---|---|
| D01 | Arrival after month 24 can be credited | Correct or explicitly model before time-horizon comparisons |
| D02 | Semi-bulk pepper counted as luxury | Freight statistics / audit |
| D03 | Loaded rather than delivered tonnage | Cargo-loss analysis / audit |
| D04 | CDN dependencies and non-ASCII filenames | Offline and classroom release |
| D05 | Target met in all sampled informed strategies | Economic robustness, not automatic evidence of student success |
| D06 | Ship trade-off questionable in sampled comparisons | Refine statement by policy; M3 |
| D07 | Early insolvency labelled month-24 liquidation | Economic outcome interpretation |
| D08 | Arrival log carries departure date | Temporal provenance and audit |
| D09 | Calicut text says zero piracy; code uses 0.04 | Evidence and wording audit |
| D10 | Aden–Calicut 1,450 nm below reported ~1,808 nm great-circle estimate | Verify coordinates and units independently; M1 |
| D11 | Wind speeds displayed but not used | M2; may be intended simplification, disclose |
| D12 | Potential PDF band overlap/margins | Unverified; render and test |
| D13 | Unseeded classroom RNG | Reproducible replay proposal, separate approval |

F01–F04 are marked fixed by PR #1. Keep all other statuses as in baseline until separate reviewed fixes. D05/D06 are empirical model-design concerns rather than proofs of software bugs. Research may proceed with frozen known defects if their influence is explicitly measured and conclusions are conditional.

## 3. Priority research directions

Priority is determined by capacity to overturn a central lesson, not by how much literature is available. Effort shares are initial planning estimates, not mandatory quotas. Work package IDs P01–P08 are not PR IDs R0–R8 or experiment IDs M1–M6.

| WP | Priority / share | Key question | First output | Experiments |
|---|---|---|---|---|
| P01 Navigation and regional monsoons | P0 / 25% | Do historical sailing windows agree with model predictions? | Dated route evidence and independent geometry audit | M1, M2 |
| P02 Merchant networks and institutions | P0 / 20% | Does seasonal residence facilitate durable relationships, under what conditions? | Geniza feasibility and competing-mechanism corpus | M5 |
| P03 Transport economics | P0 / 20% | When does waiting or larger capacity pay under imperfect information and capital constraints? | Economic identifiability and robustness report | M3, M4, M6 |
| P04 Maritime technology | P1 / 12% | Which performance differences can be justified across vessel traditions? | Evidence-constrained vessel atlas | M2, M3 |
| P05 Port chronology and temporal networks | P1 / 8% | How does changing geography and institutional chronology alter connectivity? | Dated port/route atlas | M1, M5, M6 |
| P06 Risk, labour and welfare | P1 / 7% | Who bears shipping risk, and how is it distributed? | Risk and labour evidence map | M3, M4, M6 |
| P07 Commodity ecology | P2 / 5% | How do production landscapes generate commercial flows? | Provenance chain for six goods | M3, M6 |
| P08 Climate variability | P2 / 3% | How robust are strategies to unpredictable seasons? | Environmental analogue and uncertainty scenarios | M2, M4, M6 |

### P01 — Historical Monsoon Atlas (first physical priority)

- **Hypothesis:** Route-specific seasonal accessibility is better represented by models that account for geography and constraints beyond a single basin-wide bearing.
- **Read deeply:** Tibbetts, *Arab Navigation in the Indian Ocean Before the Coming of the Portuguese*; Ibn Majid and al-Mahri through dated editions/translations; *Worlds of the Indian Ocean*, geography/navigation chapter ([DOI](https://doi.org/10.1017/9781108341004.002)); Copeland, *Riding the Monsoon* ([DOI](https://doi.org/10.1111/ehr.70016)), including methods and replication files if accessible. Candidate references, not verified readings in this checkpoint.
- **Extract:** Directed origin/destination, dates, advice versus actual voyage, calendar system, stops, vessel context, duration, uncertainty, original source locator and translation provenance. Independently check every existing lane distance and bearing against geodesics and navigable water routes; never mistake a lower bound for actual sailing distance.
- **Modern analogues:** [ERA5](https://cds.climate.copernicus.eu/datasets/reanalysis-era5-single-levels) winds/waves, separately sourced current fields, [IBTrACS](https://www.ncei.noaa.gov/products/international-best-track-archive) hazard seasonality. These are not medieval weather reconstructions. Use small versioned subsets; record coverage and units.
- **First test:** Aden–Calicut and reverse direction, then the remaining eight directions. Compare published 14/53-day example with independent geometry, historical advice and feasible sailing constraints. Check if conditions favour offshore passage but restrict harbour access.
- **Falsifier:** The uniform model systematically ranks historically inadvisable months highly, or added complexity fails to improve independent predictions.
- **Gate:** Auditable geometry table for all ten directed lanes; direct reading with locators; at least one well-documented route case (or explicit evidence-gap finding); preregistered M1 and reproducible independent comparison before recommending changes. Aim for 30–50 observations across routes only if evidence permits.
- **Art connection:** Wind vectors should show the actual model and label modern analogue / schematic / historical evidence distinctly; no decorative vortices presented as empirical data.

### P02 — Merchant Network Atlas (first social priority)

- **Hypothesis:** Seasonal residence creates opportunities for repeated interaction, but is not by itself sufficient for trust or cooperation.
- **Read deeply:** Goitein and Friedman, *India Traders of the Middle Ages*; Margariti, *Aden and the Indian Ocean Trade*; Goldberg, *Trade and Institutions in the Medieval Mediterranean* (comparative methods, not assumed transferable); Hall on eastern Indian Ocean diaspora networks. Start with [Princeton Geniza Lab](https://genizalab.princeton.edu/projects/indian-ocean-documents-cairo-geniza) and verify corpus access, version, metadata and reuse rights.
- **Extract:** Document ID, date range, people/aliases, places, transactions, residence evidence, institutions, legal or informal enforcement, positive and negative interactions, uncertainty and locator. Deduplicate persons conservatively and record alternative identities. Distinguish absence of mention from absence of interaction; the corpus is selective and western-region-biased.
- **First test:** Annotate a pilot of 30–50 relevant documents if accessible, including failures or disputes; assess whether time in port can actually be inferred. Review a subset independently and report annotation disagreement. No network scraping or NLP scale-up until the pilot demonstrates usable evidence.
- **Competing mechanisms:** repeated exchange, formal enforcement, kinship and language, brokerage/specialization, political protection, pre-existing migration and trust, seasonal residence. Compare seasonal with nonseasonal mobility while matching exposure and separating residence from exchange.
- **Falsifier:** Residence alone produces no durable cooperation under plausible mechanisms, or apparent associations vanish once pre-existing ties are accounted for. Do not award standing mechanically in the research model as a consequence of waiting.
- **Gate:** Corpus feasibility report, documented sample and coding protocol, rival mechanism table, M5 registration and model output labelled as conditional plausibility rather than historical causal identification.

### P03 — Transport economics and trade-offs (elevated after R0)

- **Hypotheses:** The advantage of large vessels depends on capital, freight composition and operating costs; seasonal waiting is rational only when its incremental benefits exceed opportunity and residence costs; the current economic lesson may be sensitive to invented spreads.
- **Read deeply:** Geniza transactions and shipping records; Chaudhuri, *Trade and Civilisation in the Indian Ocean*; Abu-Lughod, *Before European Hegemony*; Margariti; Goldberg; documentary material on qirad/mudaraba and regional partnerships. Establish context, original units, dates, transaction type and reading status. Do not conflate profit-sharing with an interest-bearing loan.
- **Extract:** Commodity quality, lot size, price, currency, unit, date, place, freight/crew/provisioning/storage/customs charges, capital arrangements, uncertainty. Preserve original units and record conversions only if justified; costs and prices may not be identifiable on a common scale.
- **First test:** Reconcile cash, debt and actual cargo-delivered arithmetic using controlled events. Reproduce R0 summaries and expose per-policy paired comparisons. Evaluate realistic information sets, including naive and bounded-knowledge strategies; declare them before new runs. Compare fixed horizon, initial equity, opportunity cost and bankruptcy.
- **Falsifier:** Vessel or waiting advantages disappear/reverse across justified ranges; the target is trivial under a broad range of bounded-information policies; outcome rankings depend predominantly on synthetic price spread or accounting defects.
- **Gate:** Parameter-identifiability matrix (direct observation / bounded estimate / analogy / synthetic / unknown), accounting tests, preregistered M3/M4/M6, complete reports of positive/null/reversed outcomes. No arbitrary tuning of the frozen game to a predetermined difficulty distribution.

### P04 — Comparative maritime technology

Read Vosmer and Flecker on Belitung and Jewel of Muscat, Quanzhou shipwreck evidence, and Manguin on Southeast Asian shipping ([candidate DOI](https://doi.org/10.1093/acrefore/9780190277727.013.30)). Investigate dhow, Chinese vessels and Austronesian traditions without assigning timeless ethnic ship categories. Extract dimensions, displacement versus payload, rig, draft, crew, maintenance, provisioning, construction and measured reconstruction performance. Separate archaeological facts, estimates and modern reconstruction choices.

**Falsifier:** A claimed vessel-tradition effect disappears after accounting for size, construction date, rig or operating conditions. **Gate:** Vessel evidence table with range/unknown fields and at least one explicitly contrasted reconstruction source per relevant tradition where attainable; M2/M3 input rationale. No new vessel mechanic without owner agreement.

### P05 — Port chronology and temporal networks

Build a dated port atlas for the original five nodes; candidate additions include Hormuz, Cambay, Palembang, Samudera-Pasai and Ẓafār, only where evidence supports the question. Distinguish Song–Yuan Quanzhou from later Melaka, specific regimes/navigational texts and archaeological periods. Treat c. 1000–1450 as a composite teaching window, not one year of mutually contemporaneous institutions. Annotate source dates versus event dates; check vignettes and political titles. Develop time-dependent edge weights for accessibility, duration and costs; do not equate a hypothetical network's centrality with actual historical trade volumes.

**Falsifier:** Simplified network conclusions reverse under documented chronology or route availability. **Gate:** Dated node/edge inventory, explicit anachronism list, corrected/qualified classroom claims, comparison of plausible time slices only where sources support them.

### P06 — Maritime risk, labour and welfare

Read Lambourn, *Abraham's Luggage*; relevant shipboard and merchant records; scholarship on slavery and coerced labour in the western Indian Ocean (e.g. Craig Perry as a discovery lead). Investigate who bears loss, labour conditions, provisioning, debt, shipwreck and political hazards. Separate a hazard's occurrence from a ship's exposure and vulnerability; a navigator changes avoidance, not meteorological occurrence. Avoid assigning timeless piracy probabilities to peoples or ports. Consider crew and welfare narratives where quantitative evidence is insufficient.

**Falsifier:** Merchant profit is a poor proxy for crew welfare or risk transfer. **Gate:** Evidence map relating risk and labour mechanisms to supported/unknown variables; explicitly bounded scenarios or qualitative debrief material, not invented historical mortality rates.

### P07 — Material Ecology Atlas

For teak, porcelain, textiles, pepper, cloves and ivory, trace ecology/resource, production, processing, inland movement, export, redistribution and consumption; distinguish origin from trading hub. Start with README museum and archaeological sources, Kew taxonomic records and economic histories; date and verify each source. For ivory, address exploitation and ethics rather than treating the commodity as merely a stock icon.

**Falsifier:** The assumed trade direction or material association is inconsistent with dated production and redistribution evidence. **Gate:** Six commodity provenance profiles with uncertainty, a rights-aware asset manifest and linked evidence; no automatic historical price inference from modern biogeography. This supports the approved material-catalogue design.

### P08 — Climate variability and resilience

Investigate interannual uncertainty, monsoon onset/strength, regional differences, ENSO/IOD and proxy limitations. Candidate reading: Burns et al. (2002), south Oman speleothem precipitation record ([DOI](https://doi.org/10.1029/2001JD001281)). Modern climate variability can inform analogues and stress tests, not supply actual medieval wind fields. Predefine perturbations to departure windows and correlated hazards, then test strategy robustness across scenarios.

**Falsifier:** Claimed adaptive strategies fail when seasonality is uncertain or hazards correlated. **Gate:** Documented scenario definitions and physically meaningful limits; sensitivity report without equating proxy precipitation to maritime wind speed.

## 4. Independent experiment register

These are proposed experiments, **not preregistrations**. Commit a specific protocol before executing each confirmatory comparison. It must state outputs, primary contrast, decision rule, parameter ranges and provenance, data split, exclusions, random-number scheme, dependency versions, stopping rule, and prior looks. Append dated deviations. If evidence is too sparse, report non-identifiability instead of claiming a successful historical validation.

| ID | Question / comparison | Primary outcomes | Dependency | Status |
|---|---|---|---|---|
| M1 | Uniform current model vs route-specific historical departure evidence; baseline vs corrected geometry | Agreement/ranking of departure windows, voyage-duration error where observed | P01, P05; route data | Not registered |
| M2 | Cosine model vs feasible-heading/wind/sea-state alternatives | Held-out window rankings, duration and access errors; uncertainty | P01, P04, P08 | Not registered |
| M3 | Capacity × capital × cargo values × operating costs, crossed with policies | Paired profit per month, insolvency, utilization and reversal regimes | P03/P04; accounting tests; R0 prior look | Not registered |
| M4 | Sail now vs wait, with common horizon and alternative foreknowledge | Net return including waiting, time, financing, failure and opportunity costs | P01/P03; deadline control; R0 prior look | Not registered |
| M5 | Seasonal vs nonseasonal mobility with relationship mechanisms independently varied | Persistent ties, transaction outcomes, network structure; exposure-matched controls | P02/P05; annotated pilot | Not registered |
| M6 | Global uncertainty over prices, costs, hazard, ship and strategic assumptions | Stability and sign reversals of intended trade-offs; target success by policy | P03 plus preceding studies; R0 prior look | Not registered |

Use event-keyed common random numbers when comparing policies with different event counts; same RNG seed alone does not guarantee identical exogenous hazards. Separate exploratory discovery from held-out confirmation. Quantify uncertainty and report results that fail the predicted direction, not just selected successful runs.

## 5. Milestone board (R-series implementation IDs from infrastructure roadmap)

Status vocabulary: `MERGED` = committed milestone met; `PARTIAL` = some criteria met; `OPEN` = not implemented/verified; `BLOCKED` = prerequisite missing; `REVIEW` = completed artifacts awaiting review. Checkboxes represent tangible exit gates, not time spent. No percentage completion is inferred from file count.

| Milestone | Priority | Status at snapshot | Exit evidence / acceptance gate |
|---|---|---|---|
| R0 — Freeze baseline | P0 | MERGED | Baseline revision, protected engine, 480-case fixture, checker, defects, prior look, contribution rules; PR #2 |
| R1 — Evidence skeleton | P0 | OPEN | Original source/claim/asset schema, canonical bibliography, access ledger, validator and negative tests |
| R2 — Claim inventory | P0 | OPEN | All load-bearing model constants, historical port vignettes, captions and lesson claims mapped to exact anchors/status |
| R3 — Navigation + chronology | P0 | OPEN | P01/P05 reading logs, geometry audit, historical route schema and sourced extracts, contradictions and gaps |
| R4 — Economy + institutions + vessels | P0/P1 | OPEN | P02/P03/P04 initial reviews, Geniza pilot, identifiability matrix and vessel evidence |
| R5 — Regression and CI | P0 | PARTIAL | R0 transit done; add engine arithmetic, forced hazard paths, replay/harness, audit/date/deadline tests, registry/data tests and minimal CI |
| R6 — M1/M2 navigation research | P0 | BLOCKED | Protocols committed before new tests, independent executable models and complete results; R3 and relevant R5 gates |
| R7 — M3–M6 research | P0/P1 | BLOCKED | R0 prior look cited; M3/M4/M5/M6 protocols, data constraints, sensitivity results and negative outcomes; relevant R4/R5 gates |
| R8 — Evidence-driven graduation | P1 | BLOCKED | Owner approves changes before PR, historical and model rationale, updated claims and fixtures, teaching review |

R3/R4 reading work and R5 testing can proceed in parallel with evidence scaffolding. R6/R7 are staging families, not one gigantic PR each; split by experiment. Visual refactoring proceeds separately after verifying R0 remains MATCH. No new UI claim, colour-coded empirical wind field or numerical label should outrun the evidence.

### Immediate sprint: inspectable minimum deliverables

- [x] R0 baseline and CONTRIBUTING merged (PR #2).
- [x] Prior exploratory sweep documented (baseline §5).
- [x] 480-row deterministic transit fixture and browser comparator committed; independent rerun not performed in this review.
- [ ] Owner settles license/attribution question before any copying from Frost & Silver.
- [ ] R1: register existing README and glossary sources with honest access statuses; create bibliography, claim/asset schema and validator.
- [ ] R2: inventory core statements, game parameters and visual provenance. Mark unsupported numbers and unresolved port/time claims.
- [ ] R3/P01: verify all ten lane geometries; start Aden–Calicut historical calendar case and Copeland replication feasibility; log inaccessible texts and exact requested sections.
- [ ] R4/P02: identify Geniza dataset version, rights and extraction feasibility; pilot annotation with uncertain identities and source locators.
- [ ] R4/P03: reproduce and critique R0 sweep; preserve raw outputs; identify parameter evidence gaps and clarify D06 by policy.
- [ ] R5: create deterministic trade/fee/debt, hazard, audit, preview and time-horizon checks; test actual finishCampaign rather than just surrogate liquidation.
- [ ] M1 and M3 preregistrations submitted for review before new confirmatory analyses; M5 study design prepared after corpus pilot.

Do not require a fixed number of positive outcomes to close a research task. A reviewed result that a parameter cannot be constrained, or that a mechanism fails, completes the evidence investigation.

## 6. First work queue (actionable handoff)

| Ticket | Deliverable | Suggested path | Depends on |
|---|---|---|---|
| Q01 | Evidence skeleton + tests (new original implementation) | `evidence/`, `references/` | R0; license policy |
| Q02 | Claim and parameter matrix including D09/D11 and prior look wording | `docs/model-assumption-audit.md` | Q01 |
| Q03 | Geometry + one route-window evidence case | `data/lane-geometry.csv`, `docs/navigation-literature.md`, `data/historical-sailing-windows.csv` | R0; Q01 for source IDs |
| Q04 | Copeland input/output replication feasibility | `research/replication/copeland/README.md` | Q03; rights/access check |
| Q05 | Geniza annotated sample, coverage report and codebook | `data/merchant-documents.csv`, `docs/merchant-networks-literature.md` | Q01; corpus access and reuse check |
| Q06 | Economics audit and identifiability report | `docs/commodity-economics-literature.md`, `data/historical-prices.csv` | Q01; R0 existing sweep |
| Q07 | Independently checked strategy sweep protocol and defect sensitivity | `research/pre-registrations/…`, `research/results/…` | Q06; R5 accounting and horizon tests |
| Q08 | R5 deterministic regression + lightweight CI | `tests/`, `.github/workflows/checks.yml` | R0 |
| Q09 | Historical sailing comparison | `research/pre-registrations/…M1…`, `research/models/`, `research/results/` | Q03, Q08 relevant fixtures |
| Q10 | Independent seasonal cooperation study | `research/pre-registrations/…M5…`, `research/models/`, `research/results/` | Q05; rival mechanisms documented |

Prefer Q01, Q03 and Q08 first; launch Q05/Q06 alongside reading work. Q04 is an access/replication assessment, not a promise of replication. If unavailable, record precise barriers and pursue an independent small benchmark. Q07/Q09/Q10 require committed protocols; characterize old results as exploratory.

## 7. Evidence and data requirements

Maintain `evidence/sources.yml`, `claims.yml`, `assets.yml`, `references/research.bib`, `references/ACCESS.md` and `data/README.md` following the infrastructure roadmap, with new original implementation. Each observation links to a stable source ID and exact page / table / document locator, scope and uncertainty. For images record creator, asset origin, license, modification, period and whether source object, reconstruction, schematic or generated illustration.

| Dataset | Minimum observation fields |
|---|---|
| Lane geometry | directed leg ID, source/target coordinates and datum, route method, geodesic minimum, possible maritime distance, units, bearing method, uncertainty, code/version |
| Sailing windows | route, dates, calendar, advice/actual, ship context, source ID/locator, extraction method, uncertainty |
| Voyage observations | departure/arrival/stop dates, duration ranges, direction, context and provenance |
| Merchant documents | corpus version/document ID, date range, person/alias IDs, place, relationship and transaction types, confidence, locator, reuse policy |
| Historical prices | original date/place/unit/currency/quality, price or interval, transaction type, normalized values only with justified conversion, locator |
| Vessels | archaeological or documentary context, period, ship dimensions, rig, payload/displacement distinction, measured/estimated, method, uncertainty |
| Port institutions | period, place, specific institution, observation vs interpretation, source, conflicting evidence |
| Commodity provenance | material/species, production geography, export/redistribution destinations, period, evidence, rights |

Each work package must distinguish **not located**, **located but not read**, **partly read**, **directly verified numerical observation** and **complete reading**. Record who read which sections and when. Do not infer historical calibration from an attractive citation or a present-day museum replica. Each data table needs schema tests, no duplicated observation IDs, justified units and no hidden imputations.

## 8. Milestone update protocol

At every checkpoint record inspected main HEAD, date, pinned engine revision, relevant PRs, observed files, tests actually run vs reported, new evidence, updated uncertainty and next action. Use append-only date-stamped progress notes; revise status table with change history. If upstream moves, inspect the diff before updating a milestone. Do not mark external drafts as committed. An open PR is not a merged result. A committed document is not proof of independent reading or successful experimentation.

Suggested log record (copy for each new update):

```yaml
checkpoint: YYYY-MM-DD
main_commit: null
engine_baseline: null
milestone: R3
work_package: P01
status: OPEN
pr: null
artifacts: []
verification:
  executed: []
  reported_not_rerun: []
  not_tested: []
new_evidence: []
contradictions_or_nulls: []
blockers: []
next_action: null
owner_review_required: false
```

Report source-reading progress as actual access levels, verified observations by type and coverage, unexplained contradictions, experiments registered/completed and regressions passed. Counts are useful only alongside quality and scope. Keep source acquisition gaps visible; missing observations are not zero values.

### Checkpoint log

**2026-11-22 — `426a610`**: R0 merged; R5 partial. PR #1 fixes F01–F04; R0 fixture and harness committed. Baseline reports all 5,400 exploratory runs exceed 1,200 D; paired sail-always junk wins, but avoid-headwind median favours dhow. D01–D13 remain open/unverified per baseline. No evidence registry, independent models, CI or new literature files on main. Next: Q01/Q03/Q08 plus Geniza feasibility and economics audit. Review performed by inspecting GitHub files/commits, not executing the browser harness. No repository mutation performed.

**2026-11-22 — checkpoint 2 (PR committing this tracker, based on `426a610`)**

```yaml
checkpoint: 2026-11-22
main_commit: 426a610ce98f0ec17c8d65508b9cc6b3cee2a057   # base of the PR
engine_baseline: 111acdc72821a259b679d2c6f5e7afa44630e2a5  # unchanged
milestone: R5 (harness) and documentation
work_package: P03
status: REVIEW
pr: the PR that adds this file
artifacts:
  - docs/research-directions-and-milestones.md (this tracker, with review fixes)
  - docs/baseline.md (D06 and section 5 corrected)
  - tools/baseline-harness.js (same-seed dhow/junk counts for every policy)
verification:
  executed:
    - tools/baseline-check.html: MATCH, 480 rows at 111acdc
    - ?sweep=300: all 18 cell medians reproduce baseline section 5 exactly
    - sail-always same-seed counts reproduce R0 (0/300 at each difficulty)
    - Crossref lookup of the Burns et al. 2002 DOI (matches title, authors, journal, year)
    - ERA5 and IBTrACS pages return HTTP 200; Princeton Geniza Lab returns 403 to scripted requests, not checked further
  reported_not_rerun:
    - MISMATCH on a 0.85 -> 0.86 dhow coefficient (R0 PR #2)
  not_tested:
    - the real finishCampaign (the sweep still uses a surrogate liquidation)
    - common random numbers (pairs share a seed only)
new_evidence:
  - same-seed dhow wins out of 300 (normal / hard / survival):
      sail always 0 / 0 / 0; avoid headwind 300 / 300 / 300;
      avoid headwind and transition 0 / 0 / 0
contradictions_or_nulls:
  - R0's D06 ("no ship trade-off") was wrong. Which ship wins reverses with
    the policy, and under the two avoid policies the seed hardly matters
    (minimum within about 3% of the median).
blockers:
  - licence question (baseline section 6) before any Frost & Silver reuse
next_action: Q01 / Q03 / Q08 as in section 6
owner_review_required: true   # tracker adopted as a living document
```

## 9. Graduation and completion criteria

**Minimum infrastructure parity:** R0–R5 complete, evidence checker tested, history-and-evidence guide linked from game, independent research charter, data and asset provenance, honest access ledger and reproducible local/CI tests. Separate known model-design limitations from defects.

**Substantive research parity:** At least one independently evaluated case in each of physical navigation, economic trade-offs and institutional mechanisms; direct source readings with locators; clear evidence gaps; pre-registered analyses with complete results, including counterexamples; review of chronology, risk and vessel evidence. The aim is useful findings or rigorous nulls, not arbitrary citation totals. All eight WPs should report their question and level of evidence even if later WPs remain exploratory.

**Graduation to classroom:** Owner agreement before mechanics PR; demonstrate what changes and why; separate visual, wording, bug-fix and mechanism PRs; tests and evidence updated together; disclose limitations and preserve playability; baseline regenerated only according to `CONTRIBUTING.md`. Do not confuse improved historical validity with increased graphical realism. The environment should become the artwork only insofar as it honestly represents the model or clearly labelled reference data.

## 10. Source and implementation references

- [Pinned repository tree](https://github.com/Antooooon125/Week3-monsoon-navigator/tree/426a610ce98f0ec17c8d65508b9cc6b3cee2a057)
- [Baseline document at inspected revision](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/426a610ce98f0ec17c8d65508b9cc6b3cee2a057/docs/baseline.md)
- [Contribution rules](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/426a610ce98f0ec17c8d65508b9cc6b3cee2a057/CONTRIBUTING.md)
- [Harness](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/426a610ce98f0ec17c8d65508b9cc6b3cee2a057/tools/baseline-harness.js)
- [Frost & Silver research charter](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/research/README.md), [source registry](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/evidence/sources.yml), [claim registry](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/evidence/claims.yml), [access ledger](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/references/ACCESS.md). Methodological references only; reuse subject to owner resolution of license terms.
- Earlier externally prepared `research-infrastructure-roadmap.md`: retains R0–R8 and M1–M6 identifiers; this tracker supersedes its initial status snapshot, not its architecture.

**Next decision:** establish the evidence foundation, then make the smallest defensible tests capable of overturning the present navigation, profit and automatic-standing narratives. Do not make the game more complicated merely to make it look more realistic.
