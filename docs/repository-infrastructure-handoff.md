# Monsoon Navigator — repository infrastructure and agent governance

**Project:** Monsoon Navigator — An Atlas of Moving Worlds  
**Status:** Proposed implementation handoff; not authorization to modify the engine or repository.  
**Audit date:** 2026-11-22 (KST)  
**Inspected revision:** [`b607af9dce751bae56528655a65afc362e21d8c7`](https://github.com/Antooooon125/Week3-monsoon-navigator/commit/b607af9dce751bae56528655a65afc362e21d8c7)  
**Committed:** in the `infra/agent-governance` PR, together with the first infrastructure files (I01, I02 and the I05 procedure). See the note at the end of section 13 for how they differ from the drafts below.

## 1. Purpose and boundaries

Build the infrastructure that allows historical claims, observations, computational models, visual representations and teaching decisions to be traced, challenged, reproduced and corrected across human and AI contributors. Adopt the methodological strengths of the public repositories listed in section 3, without importing unnecessary complexity. They belong to Azuromalachite, a collaborator here, not to the owner of this repository.

**Terminology.** "Maintainer" in this document means the **repository owner**, the person CONTRIBUTING.md names as deciding on mechanics, licence and scope. The committed AGENTS.md uses "owner" to match CONTRIBUTING.md.

This handoff supplements, rather than replaces, the existing [`docs/research-directions-and-milestones.md`](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/research-directions-and-milestones.md). Keep R0–R8, M1–M6, P01–P08 and Q01–Q10 as defined there; do not create a competing research milestone taxonomy. Infrastructure items below use I01–I10 solely as checklist identifiers.

The governing documents are `CONTRIBUTING.md` and `docs/baseline.md`. The repository maintainer decides on engine changes, licensing, publication and graduation of research into the classroom game. The approved art direction can proceed as a separate presentation track. The previously drafted design documents are not yet present at the inspected revision.

**Licensing boundary:** the existing repository MIT license and the game's CC BY-NC-SA 4.0 attribution remain unresolved as a scope question. Until the maintainer resolves it, write original implementations and instructions; do not copy files from Frost & Silver or other CC BY-NC-SA projects. Preserve credits, do not assign new licenses or assume a new license applies to third-party material. This document is original guidance, not a transplant of another repository's instructions.

## 2. Verified checkpoint

Repository tree and recent commits were inspected during the preceding audit. No tests were independently executed during that inspection; execution claims below are reported by the repository.

| Component | State at inspected revision |
|---|---|
| PR #1 | Merged: wind clock, hypothesis check, target validation and model wording |
| PR #2 / R0 | Merged: protected baseline, known defects and contribution rules |
| PR #3 | Merged: research tracker; D06 correction |
| `index.html`, `README.md`, `harbor-atlas.jpg`, `LICENSE` | Present |
| `CONTRIBUTING.md`, `docs/baseline.md` | Present |
| `docs/research-directions-and-milestones.md` | Present |
| `tests/fixtures/baseline-transit.json` | Present: 480 deterministic transit cases |
| `tools/baseline-check.html`, `tools/baseline-harness.js` | Present: browser comparison and exploratory strategy harness |
| Agent instructions, review protocol, CI, dependency lock, evidence registries, observation schemas | Not present in inspected tree |
| Approved art direction, design system and visual refactor plan | Drafted separately; not committed at inspected revision |

The baseline pins classroom engine revision `111acdc72821a259b679d2c6f5e7afa44630e2a5`. The current repository head is different because documentation and harness work followed. Do not confuse repository head with the engine baseline revision.

### Prior looks (research integrity)

The exploratory harness produced 5,400 runs (three difficulties × two vessel types × three policies × 300 seeds) from Calicut, using informed automated cargo and route choices. All passed a 1,200 D profit target. PR #3 corrected D06: same-seed counts show the dhow wins 300/300 under `avoidHeadwind`, while the junk wins 300/300 under `sailAlways` and `avoidHeadwindAndTransition`, in each tested difficulty. These comparisons share initial seeds, not necessarily matched exogenous event draws. They are not evidence of student outcomes or actual historical profitability. The baseline's findings and the correction must be cited before M3, M4 or M6 is registered. Never silently relabel exploratory findings as prospective predictions.

## 3. Public repository precedents

These links are pinned to the revisions inspected in the comparative audit. Treat their practices as precedents, not as code authorized for reuse.

| Repository | Infrastructure to borrow conceptually | Implementation reference |
|---|---|---|
| Frost & Silver | Frozen teaching model; claim anchors; known defects; research separated from gameplay; negative tests | [AGENTS.md](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/AGENTS.md), [CI](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/.github/workflows/checks.yml), [research](https://github.com/Azuromalachite/frost-and-silver-game/tree/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/research) |
| Arrowfield | Single authoritative owner for each fact; pinned inputs; semantic visual tests; non-blocking canary; PR validation contract | [AGENTS.md](https://github.com/Azuromalachite/arrowfield/blob/15f1c0147fc4b31d6bc9b10d607abfb701270587/AGENTS.md), [PR template](https://github.com/Azuromalachite/arrowfield/blob/15f1c0147fc4b31d6bc9b10d607abfb701270587/.github/pull_request_template.md), [tests](https://github.com/Azuromalachite/arrowfield/tree/15f1c0147fc4b31d6bc9b10d607abfb701270587/tests) |
| ESPMap | Scientific invariants, error budget, schemas, executable adversarial review artifacts | [CLAUDE.md](https://github.com/Azuromalachite/espmap/blob/46b3954920b8a732fd57b21849665b5e34061799/CLAUDE.md), [docs](https://github.com/Azuromalachite/espmap/tree/46b3954920b8a732fd57b21849665b5e34061799/docs) |
| Sesiidae Pheromone Atlas | Atomic source observations, data schemas, reproducible exports, locked dependencies, data/code license boundaries | [repository](https://github.com/Azuromalachite/sesiidae-pheromone-atlas/tree/d13d13cf36cd290f8137f35c5da3863fc2ae5807), [data license](https://github.com/Azuromalachite/sesiidae-pheromone-atlas/blob/d13d13cf36cd290f8137f35c5da3863fc2ae5807/LICENSE-DATA.md), [validation](https://github.com/Azuromalachite/sesiidae-pheromone-atlas/blob/d13d13cf36cd290f8137f35c5da3863fc2ae5807/.github/workflows/validate.yml) |
| Rock Paper Scissors History | Independent source re-reading, review rounds, claim status, open findings, dated handoffs | [AGENTS.md](https://github.com/Azuromalachite/rock-paper-scissors-history/blob/982f524695aac23f442aee2e7324298ccc8c6531/AGENTS.md), [review process](https://github.com/Azuromalachite/rock-paper-scissors-history/blob/982f524695aac23f442aee2e7324298ccc8c6531/docs/review-process.md), [handoffs](https://github.com/Azuromalachite/rock-paper-scissors-history/tree/982f524695aac23f442aee2e7324298ccc8c6531/docs/handoffs) |
| Plasmid EcoEvo Lecture 2026 | Evidence layer versus status, participant privacy, issue templates, teaching conventions, releases | [evidence levels](https://github.com/Azuromalachite/plasmid-ecoevo-lecture-2026/blob/0deaf107ce0d32d4c29da55234f9787bc7df3cb0/evidence/evidence-levels.md), [participant policy](https://github.com/Azuromalachite/plasmid-ecoevo-lecture-2026/blob/0deaf107ce0d32d4c29da55234f9787bc7df3cb0/docs/participant-material-policy.md) |
| Personal website | Responsive browser checks, accessibility, structure and deployment validation | [site workflow](https://github.com/Azuromalachite/azuromalachite.github.io/blob/6d6555a72ee61fec16a6d6ed3e1e260393b23ae9/.github/workflows/site-build.yml) |

Governance backbone: Frost & Silver + Rock Paper Scissors History. Engineering backbone: Arrowfield + ESPMap. Data architecture: Sesiidae Atlas. Educational and privacy controls: Plasmid EcoEvo Lecture. Browser validation: personal website.

## 4. Source-of-truth map

Do not repeat constants, claim statuses or milestone state in multiple independently maintained files. Link to the canonical location, or generate a derived representation.

| Question | Canonical location | State |
|---|---|---|
| How agents operate | `AGENTS.md` | Proposed |
| What contributors may change | `CONTRIBUTING.md` | Existing |
| What the classroom engine actually does | `index.html`; pinned contract in `docs/baseline.md` | Existing |
| What historical claims are supported | `evidence/claims.yml`, `evidence/sources.yml` | Proposed |
| Which sources were read or unavailable | `references/ACCESS.md`, source registry | Proposed |
| What observation was extracted | `data/`, with source ID and locator | Proposed |
| How data are normalized and exported | `schemas/`, generator scripts, `derived/` | Proposed |
| Which hypotheses and methods were committed before experiments | `research/pre-registrations/` | Proposed |
| What was observed in experiments | `research/results/` and manifests | Proposed |
| Which design rules govern presentation | `docs/art-direction.md`, `docs/design-system.md` | Drafted separately |
| What research milestone is next | `docs/research-directions-and-milestones.md` | Existing |
| Known classroom defects | `docs/baseline.md` D01–D13 and F01–F04 | Existing |
| Independent review findings | `docs/open-findings.md`, `reviews/` | Proposed; cross-reference existing defect IDs |

## 5. Proposed root AGENTS.md (ready-to-use draft)

Extract the text between the following delimiters into a new root `AGENTS.md`. Review against current `CONTRIBUTING.md` and baseline before opening a PR. This draft does not pretend that proposed infrastructure already exists.

<!-- BEGIN AGENTS.MD -->

### AGENTS.md — working contract for Monsoon Navigator

#### Mission and authority

Monsoon Navigator is a classroom history simulation, supported by an independent historical and computational research track. Teach how environmental seasonality constrains and enables commerce and human relationships. Research is allowed to contradict the game; simulation output is not itself historical proof.

The repository maintainer has final authority. Follow `CONTRIBUTING.md` for approvals; use `docs/baseline.md` for protected mechanics and known defects. If these instructions conflict with an owner decision or the contribution contract, report the conflict rather than silently choosing. Do not assume a request for research or visuals authorizes modifications to gameplay.

#### Before starting

1. Inspect the current branch, working tree, recent commits and relevant open PRs; preserve unrelated human changes. Do not discard or overwrite uncommitted work.
2. Read `CONTRIBUTING.md`, `docs/baseline.md` and `docs/research-directions-and-milestones.md`. Check the most recent relevant handoff and open findings if present.
3. Identify whether the task concerns presentation, bug repair, evidence, research or protected mechanics. Keep these changes separate where possible.
4. State the intended deliverable and minimum verification. Use the existing milestone/experiment/defect IDs, not a new tracking vocabulary.

#### Where information belongs

- The game implementation owns actual runtime behavior. The baseline pins its expected behavior and records known defects.
- The milestone tracker owns project status and research priorities.
- Once established, evidence registries own historical statements, source provenance and assets; observation records own extracted data; research protocols and outputs own model-specific results.
- Approved design documents own visual rules once committed. Missing documents are not evidence of approval to invent a replacement.
- Generated tables, bundles and figures are downstream products. Modify their source records or generator, then regenerate; do not silently patch derived results.

#### Non-negotiable rules

- Do not edit a protected constant or function listed in `docs/baseline.md` without maintainer agreement required by `CONTRIBUTING.md`. A presentation PR must preserve the engine and transit snapshot. A bug-fix PR identifies the defect, shows before/after behavior and updates its disposition.
- Never weaken a test, fixture, claim status or expected result merely to obtain a passing check. If a deliberate approved change moves the baseline, record why and update all affected tests and evidence.
- Separate historical observation, navigational advice, modern climatology, reconstruction, interpretation, game assumption and model result. Display simulated days, costs, probabilities and wind parameters as such. Do not give unsupported metrics an appearance of empirical precision.
- Do not claim to have read a source merely because it was found, downloaded or summarized by another agent. Record actual reading depth, locator, access date and limitations. Never invent a quotation, identifier, date, page or citation.
- Preserve original historical place names, dates, units, currencies and language where relevant. Record transformations and their uncertainty. Do not collapse separate periods into a simultaneous network without labeling the abstraction.
- Register a research question, comparison plan, decision rule, thresholds, ranges and known prior looks before new confirmatory runs. Report null and negative results, failed runs and deviations. Keep research models outside `index.html`.
- A fix is not independently verified by its author alone. Use a reviewer who can inspect the pinned revision, rerun the reproduction or re-read the source, and state what remains uncertain.
- Never commit real student names, IDs, identifiable screenshots, reports, private communications, unpublished class work or credentials. Use fictional fixtures. Record any approved exceptions under the applicable privacy/permission policy before publication.
- Preserve creator credit and asset provenance. Respect the maintainer's unresolved license boundary: no copying CC BY-NC-SA project files until the issue is settled. Do not commit restricted PDFs, full copyrighted texts, or unapproved third-party assets.
- Keep the visual design accessible and honest: 60:30:10 compositions are a guideline, not a data encoding; seasonal iridescence is illustrative unless derived from an explicitly documented field. Stable semantic states, contrast, keyboard access and reduced motion take precedence over ornament.
- Prefer small, inexpensive, locally reproducible checks. Do not trigger large downloads, lengthy sweeps, paid runners or cloud compute without the required budget approval. Never enable auto-merge or change repository permissions, billing, rulesets or licenses merely to finish a task.

#### Existing verification commands

Serve the repository root locally:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/tools/baseline-check.html`. Record the exact MATCH/MISMATCH result. The fixture contains 480 deterministic transit rows. This test does not verify economic correctness, actual historical voyages or all gameplay paths.

The optional `?sweep=300` route reruns an exploratory strategy sweep; it is not a required check for routine documentation or presentation work. Use `?snapshot` only to generate a replacement fixture for an approved baseline-moving change, following `CONTRIBUTING.md`.

When additional validators and tests are merged, use their documented commands. Do not claim they exist or pass before checking the repository. Prefer `python3` for local shell commands; use pinned explicit runtimes for CI.

#### Completion and handoff

Before declaring a change done, identify the revision, files changed, reason and affected milestone. For engine-related work report the baseline check; for visual work inspect desktop and phone layouts and capture non-identifying screenshots; for evidence work specify source access and independent verification state; for research work include executable reproduction instructions and all outcomes. Report failed or skipped checks, external dependencies, limitations and open owner decisions. A test that was not run is not a pass.

Use narrowly scoped branches/PRs, imperative commit subjects and an explanation of why. Do not push or merge on behalf of the maintainer without authorization. Update the living tracker and relevant findings when the acceptance gate is actually met. Store a dated handoff when a subsequent contributor needs context that cannot be recovered easily from the code and tracker.

<!-- END AGENTS.MD -->

The committed root [AGENTS.md](../AGENTS.md) is the authoritative version; the draft above is kept as the record of the proposal. The committed file differs in these ways:

- "Owner" replaces "maintainer", to match CONTRIBUTING.md.
- It says CONTRIBUTING.md wins in a conflict.
- It lists the existing IDs.
- It adds a line-ending rule for `index.html`.
- It says that shared seeds are not shared random events.
- It turns the 60:30:10 and iridescence wording into a general honesty rule until the design documents are committed.
- It notes that no CI exists yet.

For the standalone file, promote the title to `# AGENTS.md — working contract for Monsoon Navigator` and each `####` subheading to `##`. The companion `CLAUDE.md` can consist of `@AGENTS.md` plus a short note to follow that single shared contract rather than creating divergent instructions.

## 6. Independent review and findings

Create `docs/review-process.md` with a review workflow: pin revision → independent investigation → reproduce or re-read → author proposes correction → maintainer decides unresolved trade-offs → independent reviewer checks correction → regression guard when appropriate. A reviewer should receive the scoped repository revision, relevant sources and reproduction instructions, not rely solely on the original author's narrative.

Each review report (`reviews/review-rNN.md`) contains scope, SHA, environment, previous finding disposition, leading finding, remaining findings, evidence or reproductions, strengths, limitations and release verdict. Use IDs such as `RV01-01` only for new review findings; link an existing D/F identifier when it is the same defect. For each finding record severity (blocker/high/medium/low), exact location, observed behavior, expected behavior, source or reproduction, proposed correction, acceptance test, owner decision and independent reviewer disposition. Keep `docs/open-findings.md` as an index with links rather than duplicate the baseline table.

Recommended disposition values: `open`, `addressed_awaiting_review`, `partial`, `verified_fixed`, `owner_accepted_limit`, `rejected_with_reason`. Distinguish evidence-confirmed errors from catalogue-only checks, internal inconsistency, unavailable sources and methodological concerns. Archive scripts, small inputs and outputs under `reviews/artifacts/rNN/` when they are safe to publish; store hashes and retrieval instructions for restricted or large inputs.

## 7. Evidence and historical data architecture

### Evidence skeleton (R1–R2)

Create original `evidence/sources.yml`, `claims.yml`, `assets.yml`, `evidence-levels.md`, `check_evidence.py`, `references/research.bib` and `references/ACCESS.md`. Distinguish **layer** (historical assertion, estimate, interpretation, game assumption, model result, observation, convention), **support status**, and **source access**; they answer different questions. Define the vocabulary before populating it. A source download is not a reading; absent support is not evidence of refutation. A model result can be well established within the model but historically unvalidated.

A source record needs stable ID, bibliographic details, stable URL/DOI/catalogue ID, access level, read/review date, reviewer, locator and scope. A claim needs stable ID, scoped wording, layer, status, evidence links, exact prose anchor(s), applicable code symbol/parameter and caveats. An asset record needs creator, source, license, modifications, period/region, depiction type (historic object, reconstruction, schematic or generated artwork), and usage locations. Record absent information as unknown rather than fabricating it. Track access and reading separately.

The validator should catch duplicate IDs, missing referenced sources, illegal vocabulary, absent anchors, changed declared constants, incomplete applicable metadata and invalid data schemas. Where permissible, use local structural checking rather than network-dependent URL checks in PR CI. A structural pass is not historical verification. Seed a deliberately invalid fixture for every rule and require its specified diagnostic; check that valid fixtures pass.

### Atomic source observations (R3–R4)

Adopt an observation-first design rather than a spreadsheet of decontextualized averages. One record should correspond to one source-specific observation or scoped historical statement. Preserve conflicting records and explicit uncertainty. Data schemas should distinguish actual voyage, advice, archaeological estimate, transaction, modern environmental measurement and model output.

Example template only (not a historical observation; do not treat as an evidence-bearing row):

```yaml
id: voyage-window-example-001
record_status: template_only
origin: aden
destination: calicut
historical_period:
  earliest_year: null
  latest_year: null
departure_window:
  start: null
  end: null
  original_calendar: null
  conversion_method: null
evidence:
  source_id: null
  locator: null
  observation_type: navigational_advice
  access_level: not_read
  verification_status: unverified
limitations:
  - No historical values extracted yet.
```

Start with schemas needed by an actual pilot (route geometry, historical sailing windows, voyage observations, transactions), not all possible domains. Maintain `data/README.md` documenting units, original values, temporal coverage, missingness, licensing and generated exports. For economic observations preserve original denomination, measure of weight, transaction type, date, location and conversion assumptions. Do not turn heterogeneous historic currency values into simulated dirhams without an explicit model.

Derive CSV/JSON analysis tables reproducibly from the canonical records; document generator commands and use a stable sort order. A stale derived file must fail validation. Exclude template-only or unvalidated rows from empirical calibration by default. Record actual custodians, access terms and immutable versions or checksums for external datasets (Geniza, environmental products and historic scans). Avoid bulk downloads until the specific question and storage/compute needs are clear.

## 8. Regression and verification layers (R5)

| Layer | Required test or artifact | Initial state |
|---|---|---|
| L0 — syntax/structure | Parse inline JS, machine-readable records and local anchors | Missing |
| L1 — deterministic runtime | Transit snapshot and forecast non-mutation | Partial: 480 transit rows |
| L2 — accounting | Cash/debt/fees, cargo mass and final settlement | Missing committed checks |
| L3 — stochastic behavior | Forced events, seed/replay, guard against RNG contamination | Partial: seeded research harness; classroom RNG not seeded |
| L4 — research validity | Independent models, historical comparisons, sensitivity, uncertainty | Pending R3/R4 and registrations |
| L5 — pedagogy | Teacher-approved inquiry, interpretable debrief, evidence limits | Narrative basis present; validation not documented |

The first new engine tests should use actual game functions, including `finishCampaign`, rather than silently substituting the harness's liquidation routine. Check buy/sell arithmetic, tariffs, debt accrual, standing discounts, crew and hull transitions, forced storms/turnbacks, cargo loss, UI forecast purity, chronological logs and campaign end. Track D01 (deadline), D02/D03 (freight), D07/D08 (end/date), D09 (description), D10/D11 (geometry/wind), D12 (PDF) and D13 (replay). Known defects should be documented as observed and explicitly tagged pending fixes; do not encode wrong behavior as a normative desired outcome or sneak fixes into infrastructure PRs.

For stochastic studies, distinguish sharing a seed from sharing the same exogenous draws. If policies consume different RNG sequences, use purpose-specific streams or an externally defined event design when the intended comparison requires it; document limitations. Changes to the classroom RNG need separate maintainer approval.

## 9. Lightweight CI and budget policy

**Review note.** The only existing check, `tools/baseline-check.html`, runs in a browser. CI cannot run it with Python or Node alone. Either the game's script is executed under a DOM stand-in in Node, or a headless browser is used. The first choice is cheaper but must be shown to fail on the same planted change, a 0.85 → 0.86 dhow coefficient. Decide this in the R5 PR.

Use a single bounded CPU PR workflow as the initial gate. Validate syntax, evidence, schema, negative fixtures and deterministic model checks using small local data. Use a fixed supported Python and Node version; lock added dependencies and record tool versions. Add read-only workflow permissions, concurrency cancellation for superseded PR runs, explicit job timeouts and selective path filters only when they cannot bypass relevant checks. Keep required job names stable. Pin third-party actions to reviewed releases or immutable commit SHAs as appropriate. Do not permit untrusted fork code to access secrets. Owner approval is required before changing rulesets or billing.

| Check | Trigger |
|---|---|
| JS syntax, local structure, evidence, schema, negative tests, transit and accounting | Every relevant PR; small deterministic CPU jobs |
| Browser smoke, semantic colors, accessibility, print/export | Relevant presentation changes or release; one browser initially |
| Cross-browser or larger visual matrix | Manual/release when needed |
| Full 5,400-run or larger strategy sweeps | Research/manual, not mandatory CI |
| ERA5 retrieval, gridded routing, large network or climate analyses | Local research or explicitly authorized compute |

Keep artifacts only as long as needed (e.g. seven days for non-release screenshots), with exact revision and fictional fixtures. Avoid routine large uploads or downloads. No paid runners or unnecessary scheduled workflows by default. Track actual runtimes and investigate regressions rather than assuming a budget. Manual release jobs must report whether full browser/PDF checks were executed. Local commands should remain the same as CI wherever practical.

## 10. Design, accessibility and semantic rendering

The approved art direction is *An Atlas of Moving Worlds*: chromatic overprinting for prediction, oceanic iridescence for navigation, translucent material ecology for trade, atmospheric instability for disruptions, and the printed merchant ledger for audit. Use the separate approved design documents rather than expanding them here. Their proposal uses 60:30:10 compositions, shared typography and semantic state colors; the ratios are compositional heuristics, not rigid pixel tests.

Test layout at 375 px and desktop, absence of unintended horizontal overflow, keyboard focus and operation, reduced-motion behavior, contrast, route and season labels, selected route differentiation, commodity identity across views, and print/PDF pagination. Confirm preview controls do not mutate state, animated effects do not alter the RNG or advance time, and changes to visual rendering do not introduce unregistered claims. Use deterministic fictional inputs for screenshots. Distinguish illustrative wind fields from empirical or reconstructed geophysical data; no visual upgrade is evidence of physical accuracy. Preserve source credit and asset provenance. Prefer local/offline fonts and dependencies only with verified redistribution permissions.

## 11. Privacy, attribution and releases

Create `docs/student-data-policy.md` before collecting or publishing any classroom-derived information. Prohibit identifiable real student records on all Git branches, screenshots, exported PDFs, logs and test fixtures unless formally authorized under applicable school policy and consent. A public video or assignment does not automatically authorize republication. Use fictional examples and minimize retained data. A pattern checker can detect some identifiers, but does not establish consent or complete anonymization. Keep secrets and local research/download outputs out of Git; `.gitignore` is not a privacy boundary for already tracked files.

Propose `CITATION.cff` with verified author/contributor names, roles, repository URL and actual release version; do not invent a DOI. Resolve license scope with the maintainer before adding a data license. Track third-party material separately under its actual terms. Add a concise `CHANGELOG.md`, versioned release notes, teaching guide, deployment checks, offline packaging and release smoke tests as these become useful. Do not claim a production-ready classroom release merely because a regression passes.

## 12. Handoff format

Store dated handoffs under `docs/handoffs/` only when useful. Keep milestone status canonical in the existing tracker.

```markdown
# Handoff — YYYY-MM-DD — scope
- Reviewed SHA / branch / PR:
- Milestone, experiment and finding IDs:
- Objective and scope:
- Completed changes and links:
- Results already seen (including nulls, failures and prior looks):
- Sources actually read (locators, access levels):
- Exact commands executed, environment and output:
- Checks not executed and why:
- Open findings and unresolved owner decisions:
- Data/asset/compute restrictions:
- Next smallest actionable task and acceptance test:
```

## 13. Infrastructure implementation tracker

Status refers to the inspected revision, not a live query. All open items are proposed; completion requires an evidence link and the relevant gate. Do not fill a repository with empty directories just to match this layout.

| ID | Priority | Infrastructure | Milestone alignment | Status | Acceptance gate |
|---|---|---|---|---|---|
| I01 | P0 | Agent governance | R1 | Open | Original AGENTS.md and CLAUDE.md consistent with existing contribution rules |
| I02 | P0 | Hygiene and PR contract | R1 | Open | Ignore rules, text conventions, PR template; no engine changes |
| I03 | P0 | Evidence infrastructure | R1–R2 | Open | Source/claim/asset example records, bibliography, validator and fail/pass fixtures |
| I04 | P0 | Regression and CI | R5 | Partial | Existing transit fixture retained; new arithmetic, hazards, audit and validation checks with bounded CI |
| I05 | P0 | Independent review | R2–R5 | Open | Review procedure, open-findings index and first independently verified disposition |
| I06 | P1 | Observation data architecture | R3–R4 | Open | Pilot schemas + sourced records + deterministic export + integrity checks |
| I07 | P1 | Design infrastructure | Parallel visual track | Drafts only | Approved docs committed; semantic/layout tests and asset provenance |
| I08 | P0 before publication | Privacy, citations and licenses | Before release/data reuse | Open | Student-data safeguards verified; owner-approved attribution and license scope |
| I09 | P1 | Research reproducibility | R6–R7 | Open | Preregistered run, manifest, pinned inputs/environment, all results and reproduction |
| I10 | P2 | Releases and teaching guide | R8 | Open | Versioned release, teaching validation, offline/print checks, documented limitations |

I04 is partial solely because R0 transit and the exploratory harness exist. I08 begins immediately as a precaution; its license decision remains an owner gate even if other infrastructure proceeds.

### Next PR — `infra/agent-governance`

**Allowed scope:** new original root `AGENTS.md`, `CLAUDE.md`, `.gitignore`, `.gitattributes`, `.github/pull_request_template.md`, `docs/review-process.md`, minimal `docs/open-findings.md`, and small navigational links in existing documentation if needed. Use the draft in section 5. Keep the first PR narrow: no historical new claims, no license edits, no protected engine changes, no research outputs masquerading as validation.

Suggested PR contract:

```markdown
## What changed / why
## Scope and milestone or defect IDs
## Protected engine and teaching contract
- [ ] No protected mechanics changed, or prior maintainer approval linked.
## Evidence and provenance
- Source IDs / access / exact locators (or none):
- Asset and data permissions (or none):
## Validation
- Baseline MATCH/MISMATCH and exact output:
- Other checks actually executed:
- Negative or regression case where applicable:
- Phone/desktop and print checks if visible changes:
## Known limits / checks not run
## AI assistance and independent verification
## Owner decisions still required
```

**Acceptance:** original instructions match `CONTRIBUTING.md`; existing baseline and 480-row transit fixture untouched; run browser baseline check and record output; links resolve; new docs do not claim absent tools are operational; no private data/restricted assets, license changes or unapproved engine changes. A documentation-only PR does not need to run a full economy sweep. Record any inability to execute verification clearly. Do not merge without maintainer authorization.

**Implementation note (`infra/agent-governance`, 2026-11-22).** This PR adds AGENTS.md, CLAUDE.md, `.gitattributes`, `.gitignore`, the PR template, docs/review-process.md, docs/open-findings.md and this file.

- **`.gitattributes` exempts `index.html`.** It is stored with mixed line endings. A blanket `text=auto eol=lf` would mark the protected file for a full rewrite, so normalising it is left to its own reviewed PR. The other text files are already stored with LF, so the rule changes none of them.
- **`.gitignore` covers exported audit PDFs** (`*_Week_3.pdf`), because they can carry student names.
- **Not yet done:**
  - CI (R5).
  - The student-data policy (I08).
  - `reviews/`, until the first review exists.
- **I05** is partial: the procedure and index exist, but no independently verified disposition does yet.

### Follow-on PRs

| Order | Suggested branch | Smallest meaningful deliverable |
|---|---|---|
| 1 | `infra/agent-governance` | I01/I02 and review protocol; privacy prohibition in agent rules |
| 2 | `research/r1-evidence` | Original registry skeleton, bibliography, validator and planted defects |
| 3 (parallel) | `test/r5-model-invariants` | Actual-engine deterministic accounting/forecast tests and minimal CI |
| 4 (parallel) | `research/r2-claims` | Inventory current claims and protected parameters, honest status and anchors |
| 5 | `research/r3-navigation-data` | Geometry audit, route-window pilot, observations and reproducible exports |
| 6 | `research/r4-economy-geniza` | Merchant documents and transaction pilot, identified parameter gaps |
| Separate track | `design/atlas-of-moving-worlds` | Commit approved design specs; presentation changes with independent review and baseline protection |

Split research and engineering work further if necessary. Use existing R6/R7 experimental gating and R8 maintainer-approved graduation; do not introduce a second scientific roadmap. Update tracker only after checking current state and recording implementation evidence.

## 14. Target repository architecture (incremental)

```text
Week3-monsoon-navigator/
├── AGENTS.md
├── CLAUDE.md
├── README.md
├── CONTRIBUTING.md
├── CHANGELOG.md
├── CITATION.cff
├── LICENSE                         # existing; owner decides scope
├── .gitignore
├── .gitattributes
├── .nojekyll                       # only if Pages deployment needs it
├── .github/
│   ├── workflows/checks.yml
│   ├── ISSUE_TEMPLATE/
│   └── pull_request_template.md
├── index.html                      # protected classroom entry point
├── harbor-atlas.jpg
├── assets/
├── vendor/                         # verified redistributable dependencies
├── docs/
│   ├── baseline.md                 # existing
│   ├── research-directions-and-milestones.md  # existing canonical tracker
│   ├── repository-infrastructure-handoff.md
│   ├── research-infrastructure-roadmap.md
│   ├── art-direction.md
│   ├── design-system.md
│   ├── visual-refactor-plan.md
│   ├── history-and-evidence.md
│   ├── teaching-guide.md
│   ├── review-process.md
│   ├── open-findings.md
│   ├── student-data-policy.md
│   ├── literature/
│   ├── handoffs/
│   └── releases/
├── evidence/
│   ├── claims.yml
│   ├── sources.yml
│   ├── assets.yml
│   ├── evidence-levels.md
│   └── check_evidence.py
├── references/
│   ├── research.bib
│   └── ACCESS.md
├── data/
│   ├── README.md
│   ├── sailing-windows/
│   ├── voyage-observations/
│   └── transactions/
├── schemas/
├── derived/
├── research/
│   ├── README.md
│   ├── models/
│   ├── pre-registrations/
│   ├── results/
│   └── manifests/
├── reviews/
│   └── artifacts/
├── tests/
│   ├── fixtures/baseline-transit.json  # existing
│   ├── model/
│   └── visual/
└── tools/
    ├── baseline-check.html         # existing
    └── baseline-harness.js         # existing
```

All paths other than the explicitly existing ones are proposed. Reconcile proposed data/layout paths with the living tracker before creating them, including earlier CSV plans: canonical observation records should generate derived tables rather than maintain competing hand-edited data stores. Choose dependency lock paths once dependencies are introduced. Do not create a large framework or migrate the single HTML game just to satisfy this tree.

## 15. Definition of durable infrastructure parity

The target is not feature-count parity with Frost & Silver, Arrowfield or ESPMap. It is the ability to answer, for any load-bearing claim or model number: where did it come from, what was actually read or run, what is its scope, what could falsify it, who checked it independently, which tests catch a regression, and how can a future contributor reproduce it cheaply?

Complete I01–I05 first. Let concrete navigation, merchant-network and economic research pilots drive the remaining schema and tooling decisions. Preserve the classroom baseline, record owner decisions and prefer one working check with an intentional failure case over a large skeleton of empty files.
