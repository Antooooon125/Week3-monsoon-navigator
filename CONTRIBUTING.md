# Contributing

Monsoon Navigator is a classroom game first. These rules keep its teaching model stable while the visual design, the evidence base and a separate research track grow around it. The pinned baseline, its protected parameters and its known defects are in [docs/baseline.md](docs/baseline.md).

## Kinds of change

| Kind | Examples | Rules |
| --- | --- | --- |
| Presentation | Layout, styling, accessibility, illustrations, wording that makes no new claim | Leave the protected engine (baseline section 2) untouched. The baseline check must still report MATCH. |
| Bug fix | One row of the known-defects table, or a tightly related group | One defect per PR where possible. Name the defect ID, show before and after, and update its row in `docs/baseline.md`. |
| Mechanics or parameters | Any value or function in baseline section 2: prices, tariffs, ship values, winds, hazard odds, standing, debt, campaign length, scoring | Needs the owner's agreement **before** the PR is opened. Regenerate the transit snapshot in the same PR if the sailing model changes, and update baseline sections 2–4. |
| Historical claims and sources | Port stories, glossary, README history, captions | Cite the source in the PR. Say whether it was read in full, in part or only found. Never invent quotations, page numbers or DOIs. |
| Research (Path B) | Alternative sailing models, sensitivity studies | Lives outside `index.html` and never edits it to make an experiment run. Write the pre-registration before looking at the results, and cite any earlier look (baseline section 5). |
| Licence and attribution | `LICENSE`, credits, reuse of other projects' files | The owner decides. Do not copy files from CC BY-NC-SA projects until the licence question in baseline section 6 is settled. |

Do not combine a large visual refactor with a mechanics change or a research conclusion in one PR.

## Every PR

- Run the baseline check (baseline section 3) and paste its result line: MATCH, or MISMATCH with the reason.
- For visible changes, attach before and after screenshots at phone and desktop widths.
- Use fictional student names and IDs in screenshots, fixtures and exported PDFs. Never use real student details.
- Say what you did not test, for example PDF export, Safari or keyboard-only use.

## Moving the baseline

The baseline moves only when an approved mechanics change or a bug fix that touches the sailing model is merged. In that PR:

1. Open `tools/baseline-check.html?snapshot`, copy the `snapshot` object from the output into `tests/fixtures/baseline-transit.json`, and set `revision` to the commit it describes.
2. Explain in the PR which rows changed and why.
3. Update the pinned revision and the affected tables in `docs/baseline.md`.
