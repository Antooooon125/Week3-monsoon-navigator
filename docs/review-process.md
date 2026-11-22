# Review process

How a finding goes from "someone noticed something" to "independently checked". It applies to code, evidence, research and wording.

## Steps

1. **Pin.** Record the commit under review. Reviews of a moving branch are not reviews.
2. **Investigate independently.** The reviewer gets the pinned revision, the relevant sources and the reproduction steps, not just the author's summary.
3. **Reproduce or re-read.** Rerun the check or the reproduction, or re-read the source at the cited locator.
4. **Propose.** The author proposes a correction, or explains why none is needed.
5. **Decide.** The owner decides what CONTRIBUTING.md reserves to them, which is mechanics and licence. Disagreements the reviewer and author can't settle also go to the owner.
6. **Re-check.** Someone other than the author confirms the correction against the pinned revision.
7. **Guard.** Where it makes sense, add a test or check that fails on the original defect, and show that it fails.

## Review reports

Each review goes in `reviews/review-rNN.md`, with:
- scope and commit;
- environment;
- what happened to the previous review's findings;
- the leading finding, then the rest;
- reproductions or evidence;
- strengths and limitations;
- a verdict.

Scripts and small inputs that are safe to publish go in `reviews/artifacts/rNN/`. For anything restricted or large, record a checksum and how to retrieve it.

## Findings

- **IDs.** Give a new finding an ID of the form `RVnn-mm` (review nn, finding mm). This is the review-finding family listed in AGENTS.md ("ID families"). If it is the same defect as an existing D or F row in docs/baseline.md, use that ID instead of creating a duplicate. RV IDs are not milestones, and fixing one does not move a milestone in the tracker.
- **What to record:** severity (blocker / high / medium / low), exact location, what happens, what should happen, the reproduction or source, the proposed correction, the test that will show it fixed, the owner's decision if one was needed, and the reviewer's disposition.
- **What kind of finding it is:**
  - an error confirmed by evidence;
  - an internal inconsistency;
  - a check against a catalogue or listing only;
  - an unavailable source;
  - a concern about method.

### Disposition values

| Value | Meaning |
| --- | --- |
| `open` | Not yet addressed |
| `addressed_awaiting_review` | A correction exists; nobody but the author has checked it |
| `partial` | Part of the finding is corrected |
| `verified_fixed` | Someone other than the author confirmed the fix at a pinned commit |
| `owner_accepted_limit` | The owner chose to keep the behaviour and say so |
| `rejected_with_reason` | Not a defect, with the reason recorded |

[docs/open-findings.md](open-findings.md) is the index. It links to findings rather than copying them.
