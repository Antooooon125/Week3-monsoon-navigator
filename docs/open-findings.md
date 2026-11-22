# Open findings

An index, not a second copy. Details live where each finding is owned. The process is in [review-process.md](review-process.md).

Statuses use each source's own vocabulary:
- D and F rows: the status column in baseline.md §4.
- Review findings: the disposition values in review-process.md.
- Issues: plain words.

| Where | What | Status |
| --- | --- | --- |
| [baseline.md §4](baseline.md#4-known-defects) | Classroom defects D01–D13 | Open, except D12, which is unverified |
| [baseline.md §4](baseline.md#4-known-defects) | F01–F04, fixed in PR #1 | Fixed by the author. Not yet re-checked by an independent reviewer under this process, so not `verified_fixed` |
| [Issue #4](https://github.com/Antooooon125/Week3-monsoon-navigator/issues/4) | Repository says MIT; the game is an adaptation of CC BY-NC-SA 4.0 | Waiting for the owner's decision |
| [PR #5 reviews](https://github.com/Antooooon125/Week3-monsoon-navigator/pull/5) | First review of `bed26b0`: 14 findings. Re-verification of `3b59103`: 12 `verified_fixed`, 2 fixed with a new issue, plus new findings N1–N4 | N1–N4 `addressed_awaiting_review` in the second follow-up commit. Re-verification pending |

## Review reports

None yet in `reviews/`. The two fresh-agent reviews of PR #5 predate this process. Only a summary table is in the PR #5 description; the full reports are not committed. The first report under this process will be `reviews/review-r01.md`.
