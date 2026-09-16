# Session-start prompt

*Paste at the beginning of every working session, before the day's actual request. It costs a minute and
it is the guardrail the source programme's author considers the most important one.*

---

Read `AGENTS.md`, then `research/KNOWLEDGE.md` §0b (state, next steps, do-not-claim), §3 (our own errors),
`research/RULES-INHERITED.md`, and the tail of `research/ERRATA.md`. If an exploration is in progress, read
`research/explore/STATE.md`. Do not work from your own recollection of previous sessions.

Then tell me, in ten lines or fewer:

1. Where the programme stands, in your words.
2. What the recorded next step is.
3. Anything recorded as an erratum that has not been applied yet, or any statement in a document that the
   status board and the document disagree about.
4. Anything you think the record gets wrong.

Then wait for today's task.

---

## Variant: after a long gap, a context loss, or a restarted session

Same as above, and additionally: run `python3 research/experiments/run.py` and `python3 scripts/audit.py`,
confirm the suite still reproduces the numbers the documents quote, and report any drift before we do
anything else. If a number moved, that is today's task, whatever I said I wanted.
