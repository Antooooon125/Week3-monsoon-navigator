# AGENTS.md — working contract for Monsoon Navigator

This file is for anyone, human or AI, working in this repository. It adds working practice to [CONTRIBUTING.md](CONTRIBUTING.md) and does not override it. Where the two seem to disagree, CONTRIBUTING.md wins; report the conflict.

## Mission and authority

Monsoon Navigator is a classroom history simulation, supported by a separate historical and computational research track. It teaches how seasonal winds constrain and enable commerce and human relationships. Research may contradict the game, and simulation output is not historical proof.

CONTRIBUTING.md reserves two decisions to the **repository owner**: agreement before any change to mechanics or parameters, and anything about licence and attribution. When it's unclear whether a change falls under either, ask the owner rather than deciding. Use [docs/baseline.md](docs/baseline.md) for the protected mechanics and known defects. A request for research or visual work does not authorise changes to gameplay.

## Before starting

1. Check the current branch, working tree, recent commits and open PRs. Keep unrelated changes, and never discard or overwrite uncommitted work.
2. Read CONTRIBUTING.md, docs/baseline.md and [docs/research-directions-and-milestones.md](docs/research-directions-and-milestones.md). Then check:
   - [docs/open-findings.md](docs/open-findings.md);
   - [docs/repository-infrastructure-handoff.md](docs/repository-infrastructure-handoff.md);
   - any dated handoff in `docs/handoffs/` (the folder doesn't exist yet; create it with the first dated handoff).
3. Decide which kind of change the task is. CONTRIBUTING.md defines six kinds: presentation, bug fix, mechanics or parameters, historical claims and sources, research, and licence and attribution. Keep different kinds in separate PRs where possible.
4. State the deliverable and the minimum verification before starting. Use only the ID families below, each where it is defined, and do not invent new ones.

### ID families

| Family | IDs | Defined in | Used for |
| --- | --- | --- | --- |
| Milestones | R0–R8 | docs/research-directions-and-milestones.md | Project milestones and their status (the only status board) |
| Experiments | M1–M6 | the same tracker | Proposed research experiments |
| Work packages | P01–P08 | the same tracker | Research work packages |
| Tickets | Q01–Q10 | the same tracker | The first work queue |
| Classroom defects | D01–D13, F01–F04 | docs/baseline.md §4 | Known defects (D) and fixed ones (F) |
| Review findings | RVnn-mm | docs/review-process.md | New findings from a numbered review; reuse a D or F ID when it's the same defect |
| Infrastructure checklist | I01–I10 | docs/repository-infrastructure-handoff.md §13 | A checklist of infrastructure items. Not a status board: record progress in the tracker |
| Verification layers | L0–L5 | docs/repository-infrastructure-handoff.md §8 | Kinds of test (syntax, deterministic, accounting, stochastic, research, pedagogy). Not milestones |

The disposition values in docs/review-process.md (`open`, `addressed_awaiting_review`, and so on) are the only finding statuses.

## Where information belongs

- `index.html` owns runtime behaviour. docs/baseline.md pins its expected behaviour and records known defects.
- The milestone tracker owns project status and research priorities.
- Once they exist, evidence registries own historical statements, sources and assets. Observation records own extracted data, and research protocols and results own model-specific findings. Until then, nothing in this list exists; do not write as if it does.
- Design documents own the visual rules once they are committed. A missing document is not permission to invent a replacement.
- Generated tables, bundles and figures are downstream. To change one, edit its source or generator and regenerate it; never hand-patch the output.

## Rules

- **Protected engine.** Do not change a constant or function listed in docs/baseline.md §2 without the owner's agreement first, as CONTRIBUTING.md requires.
  - A presentation PR keeps the baseline check at MATCH.
  - A bug-fix PR names the defect, shows behaviour before and after, and updates the defect's row.
- **Line endings.** `index.html` is stored with mixed line endings, and `.gitattributes` exempts it from normalisation. Do not normalise it except in its own reviewed PR, because doing so rewrites every line and hides real changes.
- **Tests.** Never weaken a test, fixture, claim status or expected result to make a check pass. If an approved change moves the baseline, say why and update every affected test and document.
- **Kinds of evidence.** Keep historical observation, navigational advice, modern climatology, reconstruction, interpretation, game assumption and model result separate. Label simulated days, costs, odds and winds as game values, and do not give unsupported numbers an air of precision.
- **Reading.** Finding, downloading or summarising a source is not reading it. Record the depth actually read, the locator, the date and the limitations. Never invent a quotation, identifier, date, page or citation.
- **History.** Keep original place names, dates, units, currencies and language where they matter, and record any conversion and its uncertainty. Do not present centuries as one simultaneous network without saying so.
- **Research.**
  - Before any new confirmatory run, write down the question, comparison, decision rule, thresholds, parameter ranges and prior looks (baseline §5).
  - Report null, negative and failed results, and any deviations from the plan.
  - Keep research models out of `index.html`.
  - A shared seed is not a shared set of random events.
- **Review.** An author alone does not verify a fix. A reviewer works from the pinned revision, reruns the reproduction or re-reads the source, and says what is still uncertain. See [docs/review-process.md](docs/review-process.md).
- **Privacy.** Never commit real student names, IDs, identifiable screenshots, reports, private communications, unpublished class work or credentials. Use fictional names in fixtures, screenshots and exported PDFs.
- **Credit and licences.** Keep creator credit and asset provenance. The licence question in docs/baseline.md §6 and [issue #4](https://github.com/Antooooon125/Week3-monsoon-navigator/issues/4) is unresolved, so do not copy files from CC BY-NC-SA projects. Do not commit restricted PDFs, full copyrighted texts or unapproved third-party assets.
- **Visual honesty.** Accessibility (stable meaning, contrast, keyboard use, reduced motion) comes before ornament. A wind field or colour effect is illustrative unless it comes from a documented data source, and must be labelled that way. Follow the approved design documents once they are committed.
- **Cost and permissions.**
  - Prefer small checks that anyone can run locally.
  - Do not start large downloads, long sweeps, paid runners or cloud compute without approval.
  - Never enable auto-merge, or change repository permissions, rulesets, billing or licences, to finish a task.

## Verification that exists today

Serve the repository root locally:

```sh
python3 -m http.server 8000
```

Open `http://localhost:8000/tools/baseline-check.html` and record the exact result line (MATCH or MISMATCH). It compares 480 deterministic transit rows. It does not check trading arithmetic, random events, the audit, PDF export or history.

- **Sweep.** `?sweep=300` reruns the exploratory strategy sweep. It isn't needed for documentation or presentation work.
- **Snapshot.** `?snapshot` is only for an approved change that moves the baseline (CONTRIBUTING.md, "Moving the baseline").

There is no CI yet. When other checks are added, use their documented commands, and do not claim a check exists or passes without running it.

## Finishing and handing off

Before calling a change done, state the revision, files changed, reason and affected milestone or defect.

**Every PR**, whatever its kind, reports the baseline check result line, as CONTRIBUTING.md's "Every PR" section requires. A documentation-only PR runs it too. What else to report depends on the kind of work:

| Work | Also report |
| --- | --- |
| Engine-related or bug fix | Behaviour before and after; the defect row updated |
| Visual | Before and after screenshots, at phone and desktop widths, with fictional data |
| Evidence | Source access and whether anyone else checked it |
| Research | Reproduction instructions and every outcome |

Report failed or skipped checks, limitations and decisions still open for the owner. A check that wasn't run is not a pass.

Use narrow branches and PRs, imperative commit subjects, and say why. Do not push or merge without authorisation. Update the tracker and docs/open-findings.md only when a gate is actually met. When the next person needs context that the code and tracker don't give, leave a dated handoff in `docs/handoffs/`, named `YYYY-MM-DD-topic.md`.
