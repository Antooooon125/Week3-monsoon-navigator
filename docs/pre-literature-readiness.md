# Monsoon Navigator — pre-literature research readiness

**Checkpoint:** 2026-11-22, `main` at [`b607af9dce751bae56528655a65afc362e21d8c7`](https://github.com/Antooooon125/Week3-monsoon-navigator/commit/b607af9dce751bae56528655a65afc362e21d8c7) (PR #3 merged; most recently inspected state).

**Purpose:** A short implementation addendum to the repository infrastructure handoff. Establish the minimum conventions necessary to start reading, extracting and testing historical evidence without losing provenance. This is a proposed specification, not evidence that any new infrastructure has been implemented.

**Committed:** as `docs/pre-literature-readiness.md`, with review fixes. PR #5 (agent governance, review process, `.gitignore`) was open, not merged, when this was committed.

## 1. Scope and authority

The existing `docs/baseline.md`, `CONTRIBUTING.md` and `docs/research-directions-and-milestones.md` remain authoritative for engine protection, owner approval, defects and R0–R8 milestone status. The infrastructure handoff covers AGENTS.md, CI, evidence validation, review and repository hygiene; this addendum fills practical gaps in literature intake and scientific data handling. Do not introduce another milestone numbering system.

- Path A is the classroom game; Path B is independent research. Do not edit protected game mechanics to run research.
- Preserve prior looks, including the R0 strategy sweep and the PR #3 finding that ship ranking reverses with policy. Same-seed comparisons are not automatically common-random-number comparisons.
- Licensing is unresolved. Write original infrastructure; do not copy CC BY-NC-SA project files until the owner authorizes the licensing arrangement.
- No identifiable student material, restricted PDFs, credentials or sensitive unpublished documents in Git, including temporary branches.
- Begin literature discovery now. Do not wait for comprehensive CI, a GIS pipeline or an interactive evidence browser.

## 2. Literature acquisition and knowledge management (P0; R1–R4)

Keep access, reading depth, extraction and verification as separate facts. A PDF on disk is not a read paper; a read paper is not necessarily evidence for a particular assertion. The following stages are a workflow, not a replacement for the canonical evidence-status vocabulary.

| Stage | Minimum record |
| --- | --- |
| Discovered | Title, authors, year, discovery route; identifier if known |
| Located | Verified publisher, library or archival record, access date |
| Acquired | Legally accessed edition or relevant chapter; access restrictions |
| Read | Exact sections, pages, figures or tables examined; reader/date |
| Extracted | Atomic observation or claim, original locator, scope and caveats |
| Independently verified | Different reviewer recreates the extraction from the source |
| Integrated | Linked claim, analysis or parameter; explicit assumptions and limits |

Use the existing planned `evidence/sources.yml` and `references/research.bib` as canonical records. `ACCESS.md` may be generated from the source registry or link to it; avoid maintaining two contradictory access statuses. Record search strings, databases, date, search scope, exclusion reasons and unresolved retrieval attempts. Zotero is optional for external library management; do not make it a dependency of public research reproducibility.

```text
references/
  research.bib
  ACCESS.md
  SEARCH-LOG.md
  acquisition-queue.yml
  reading-notes/
```

Each reading note should include: source ID; exact edition; direct reading extent; question; paraphrased findings with locators; quantitative extraction candidates; contradictory evidence; coverage limits; next step. Prefer source links to redistributing documents. A retrieval error is not proof of paywall status. Preserve archival identifiers and edition differences.

## 3. Multilingual research and translation provenance (P0; R1–R4)

Arabic, Judeo-Arabic (usually in Hebrew script), Chinese, Persian, Malay (including in Jawi script) and Tamil materials may be essential.

Candidates to assess, not yet confirmed as needed:
- **Malayalam**, for Calicut's own region.
- **Swahili**, for Kilwa, though its written record in this period is thin.
- **Portuguese**, for early-sixteenth-century accounts of Malacca and Kilwa. They describe the end of the period from outside, so treat them as later witnesses.

Language and script are listed separately here, as the next sentence requires. Separate the source language from the script, modern transliteration, translation and the researcher's interpretation. Use Unicode UTF-8; preserve original spellings where legally permissible and necessary. Never silently replace an original term with a seemingly equivalent modern one.

Suggested claim/observation fields (illustrative nulls, not a historical observation):

```yaml
language: null                 # language tag or documented historical variety
script: null
source_locator: null
transcription_source_id: null
transcription_locator: null
transliteration_scheme: null
translation_source_id: null
translation_locator: null
translation_method: null       # published | human | machine_assisted | none
translation_verified: false
verification_record_id: null
interpretation_notes: null
```

For machine-assisted transcription or translation, record tool/model and date, retain uncertainty and request qualified human or independently sourced corroboration where meaning is load-bearing. Never upgrade a claim because an AI translation sounds fluent. Only reproduce short permitted excerpts; otherwise use original paraphrases and precise locators. Check direction-of-writing and multilingual character rendering when source terms appear in the interface or PDF.

## 4. Historical entity resolution and metrology (P0; R1–R4)

Use stable identifiers and dated aliases rather than free-text joins. Keep historical port sites distinct from modern city centroids; do not assume that the same name identifies the same site or polity across centuries. Keep uncertain identities separate until supported.

Start with `data/authorities/README.md` and the small pilot's actual entities; expand only as needed. Candidate authority tables: places, people, commodities, vessel terminology, calendars, units and currencies. Record original names, variants, script, context, dates, authority source, coordinates with uncertainty, and merge/split decisions. Do not introduce speculative links between historical merchants.

For dates preserve verbatim date or season, calendar, interpretation and an interval of possible normalized dates. Record conversion algorithm, assumptions (including lunar/calendar conventions), and reference. For quantities preserve original value, unit, currency, location, period and measure type (mass vs volume; cargo capacity vs displacement; account money vs coin). Distinguish metric tonnes from other tons; wind-from and wind-toward conventions; nautical miles versus other distances.

Two cautions from the game itself:
- **Wind bearings.** `getWindState` gives the direction the wind blows **toward**: 45° for the SW monsoon (docs/baseline.md §2). Meteorological sources usually give the direction it comes **from**.
- **Distances.** The D10 great-circle figure was computed between modern city coordinates, not historical anchorages. It is a lower bound on a sea route, not a sailing distance. A conversion must never erase its original measurement.

```yaml
original_value: null
original_unit: null
original_currency: null
original_date: null
calendar: null
normalized_value: null
normalized_unit: null
normalized_range: null
conversion_source_id: null
conversion_method: null
applicable_region: null
applicable_period: null
uncertainty_notes: null
```

Null means unknown or not yet convertible, not zero. Keep uncertainty ranges and conflicting conversions rather than forcing a single number. Do not turn incomparable historical prices into a uniform simulated dirham series. Record observation type: actual voyage, navigational advice, archaeological estimate, commercial transaction, modern environmental observation, model result or game assumption.

## 5. Decision records (P1; when consequential choices arise)

Use lightweight `docs/decisions/ADR-NNN-topic.md` for durable decisions that cannot be understood from a code diff. Do not retroactively invent owner approval. Link existing baseline decisions instead of duplicating them.

Template: date; status (proposed/accepted/superseded); owner/authority; problem; alternatives; decision; rationale and evidence; limits; affected records; reconsideration trigger. Candidate topics: pathway separation, evidence vocabulary, historical unit normalization, route-specific calendar versus full weather routing, dependency and data retention policy. Begin only with actual decisions. Supersede with a new record instead of silently rewriting history.

## 6. Scientific data acquisition and reproducibility (P1; R3–R7)

Potential datasets: ERA5 modern reanalysis, IBTrACS modern cyclone tracks, GEBCO bathymetry, coastline data and Geniza document collections. Verify the exact release, rights, availability and fitness for purpose before acquisition. Modern climatology is not medieval weather; rainfall proxies are not direct sailing-wind fields. Historical record accessibility does not imply permission to republish transcriptions.

```text
data/
  manifests/        # small metadata committed
  raw/              # local only; ignored
  interim/          # local only; ignored
  curated/          # permitted, small source-grounded records
  authorities/
derived/            # compact regenerable tables/figures where permitted
```

**Review note.** "Ignored" is a requirement, not a current fact. No ignore rule for `data/raw/` or `data/interim/` exists on `main` or in PR #5's `.gitignore`. Add the rules in the same PR that creates these folders, and check them with `git check-ignore -v data/raw/example` before any data lands there. An ignore rule doesn't protect files that are already tracked.

A manifest should carry dataset ID, provider, release/version, persistent identifier, access date, license/redistribution scope, exact request (domain/date/variables/grid), file formats, size, checksum (e.g. SHA-256), preprocessing command/version, provenance links, expected outputs, limitations and missing-data conventions. Never commit keys or credentials; use environment/config placeholders. Prefer a small regional/monthly subset for the first pilot and document acquisition/storage/runtime estimates before large jobs. Record geospatial coordinate reference systems, longitude conventions, timezone/time basis, wind direction definitions and masks.

Use plain manifests and scripts initially. Consider DVC, workflow engines or remote artifact storage only when measured complexity warrants them. Commit raw data only if small, redistributable and explicitly justified. Do not use Git LFS or paid services by default. Verify normalized/derived tables can be regenerated from the permitted inputs.

## 7. Research environment (P1; R5–R7)

The game remains browser-based and independent of Python. Research computations live in `research/` with explicit entry points, pinned input/commit IDs, documented commands and minimal dependencies. Start with Python 3 and the standard library; add numpy, scipy, pandas, pyproj, xarray, geopandas or networkx only when needed. Prefer `python3` in portable examples. Record exact versions and lock the actual experiment environment once working. Reusable computation belongs in modules; notebooks are explanatory clients, not the sole implementation.

Research run manifest: experiment ID, protocol revision, baseline revision, model revision, dataset IDs/checksums, command, environment, seeds/event stream policy, resource use, outputs and deviations. Keep large data and untracked scratch output outside Git. The R0 browser fixture is an engine regression check, not historical validation. Test full accounting and campaign horizon before interpreting economic comparisons. No automatically scheduled heavy jobs or unapproved cloud compute. Lightweight CI and manual/release scientific runs should remain separate as in the governance handoff.

## 8. Evidence lineage browser (P1; defer until evidence exists)

Future feature: generate a browsable evidence view from canonical sources, observations, claims, assumptions, experiments and assets. A student or reviewer inspecting a route forecast should be able to see which parts are historical evidence, modern observations, model assumptions or illustrative artistic encodings, together with uncertainty and contradictory findings. Use stable IDs and machine-checked references; the browser is a derived view, never a second hand-maintained registry.

First deliver a simple generated text/HTML report with working links. Add visualization only when it improves retrieval and fits the approved atlas design. Never imply that the optical wind field is empirical if it represents the game model. Avoid exposing access-restricted source content or private records.

## 9. Research stopping rules (P0; R3–R7)

Define a question, smallest decisive test, evidence threshold, scope, search budget and stopping condition before each investigation. A supported result, contradiction, bounded uncertainty or documented gap is an acceptable first outcome. A fixed number of references is not an evidence threshold. If insufficient access prevents a conclusion, record the missing source and escalate the acquisition request rather than guessing.

| Workstream | Minimum first result | Stop or redirect when |
| --- | --- | --- |
| P01 navigation | Audit the Aden–Calicut route geometry and one dated historical window; separate advice from actual voyages | A load-bearing discrepancy is supported, or sources cannot discriminate |
| P02 institutions | Document evidence distinguishing at least two proposed cooperation mechanisms | A mechanism is contradicted, supported within scope or not identifiable |
| P03 economics | Parameter identifiability matrix and verified accounting checks | Identify defensible ranges versus unresolved assumptions |
| P04 vessels | Evidence-supported range or explicit limit for one vessel property | Comparability or measurement uncertainty blocks stronger conclusions |
| P05 chronology | A dated coexistence scenario for relevant ports and institutions | Time compression's specific consequences are documented |
| P06 risk/welfare | One directly sourced case of labour/provisioning/risk, with limits | No representative risk rate can be inferred without stronger evidence |
| P07 commodity ecology | One dated production–processing–port–consumption chain | Each link is sourced or explicitly missing |
| P08 climate | One proxy/climatology fitness assessment and uncertainty statement | Relevant physical connection remains unsupported |

Pre-register model tests before inspecting new outputs; cite prior looks and label exploratory outcomes. Independent reviewers should re-find the original evidence. Research must remain free to overturn the game, and a game revision needs owner approval.

## 10. Minimum readiness gate and immediate handoff

Status below is based on the last inspected main tree, not a live checklist. Recheck the current HEAD before implementing.

- [x] Pinned R0 classroom baseline and transit fixture.
- [x] CONTRIBUTING.md and owner-approval rules.
- [x] Research directions and R0–R8 milestone tracker (PR #3).
- [ ] AGENTS.md and governance package merged (R1). *Open as PR #5, awaiting independent review.*
- [ ] Minimal source/claim registry and bibliography with validation (R1).
- [ ] Acquisition/access ledger and search log (R1).
- [ ] Multilingual, date, unit and entity provenance conventions (R1–R3).
- [ ] Independent review protocol and finding disposition (R2/R5). *The protocol is in PR #5; no finding has an independently verified disposition yet.*
- [ ] First route investigation question, stopping rule and source intake defined (R3).

### Three implementation packages

| Package | Smallest useful deliverable | Milestone |
| --- | --- | --- |
| Foundation | Agent governance, hygiene, PR checklist, review rules; no engine change | R1/R5 |
| Knowledge system | Original registries, reading/access ledger, provenance conventions and planted-invalid-record tests | R1–R3 |
| First investigation | Aden–Calicut independent geometry and source-window audit; original evidence, counterevidence, explicit uncertainty and a next decision | R3, groundwork for M1/M2 and R6 |

Literature discovery and intake can proceed with foundation work. Do not delay the pilot for ADR directories, full authority catalogs, a complete geospatial database, an evidence browser or large simulation infrastructure. Record interim notes using stable source IDs, then import into the canonical registry once available. Existing `docs/research-directions-and-milestones.md` is the only authoritative implementation board; append dated checkpoint entries there after actual validation. The I01–I10 table in the infrastructure handoff is a snapshot checklist, not a second board; record status changes in the tracker.

**Definition of done for this planning phase:** the minimal knowledge intake process works on a real source, its claims can be re-located by a reviewer, and the first investigation can produce a falsifiable result. No additional broad planning document is required before reading begins.

## 11. Related specifications and precedents

- Monsoon Navigator: [baseline](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/baseline.md), [contribution rules](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/CONTRIBUTING.md), [research tracker](https://github.com/Antooooon125/Week3-monsoon-navigator/blob/b607af9dce751bae56528655a65afc362e21d8c7/docs/research-directions-and-milestones.md).
- Companion files: the infrastructure handoff is in PR #5 as `docs/repository-infrastructure-handoff.md` (not yet merged). `research-infrastructure-roadmap.md` and the three approved design documents are not committed.
- Methodological precedents: [Frost & Silver access ledger](https://github.com/Azuromalachite/frost-and-silver-game/blob/d64a632eaa78e2bc33f9cc4fd1726266f68ac246/references/ACCESS.md), [Rock Paper Scissors History review protocol](https://github.com/Azuromalachite/rock-paper-scissors-history/blob/982f524695aac23f442aee2e7324298ccc8c6531/docs/review-process.md), [Sesiidae Atlas](https://github.com/Azuromalachite/sesiidae-pheromone-atlas/tree/d13d13cf36cd290f8137f35c5da3863fc2ae5807), [Arrowfield agent rules](https://github.com/Azuromalachite/arrowfield/blob/15f1c0147fc4b31d6bc9b10d607abfb701270587/AGENTS.md). These are references for design principles, not authorization to copy files.
