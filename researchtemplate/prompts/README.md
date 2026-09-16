# The prompts

The method, as text you paste. Nothing here is magic; each one exists because working without it produced
something that had to be thrown away.

| prompt | when |
|---|---|
| `00-initialize.md` | once, in a fresh session, with `PROJECT-BRIEF.md` filled in |
| `01-session-start.md` | at the beginning of every working session, before the day's request |
| `02-adversarial-reading.md` | when a proof or a document is finished — in a **new** session with no context |
| `03-outside-review.md` | for anything you cannot check yourself — a different vendor's model, instructed to attack |
| `04-paper-pass.md` | writing up, and every revision |
| `05-stopping-check.md` | when the agent always has a "next up" and you cannot tell if that is progress |
| `06-literature-round.md` | at initialization, before any novelty claim, and whenever the answers turn vague |
| `07-error-entry.md` | the moment something turns out to be wrong, before fixing it |

Two habits matter more than the wording:

- **The generator is never the checker.** 02 and 03 are run in sessions that have not seen the work.
- **Write the error down before you fix it.** The fix takes an hour and is forgotten; the entry in the
  fallacy list is what stops the next one.
