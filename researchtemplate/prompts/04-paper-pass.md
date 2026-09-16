# Write-up prompt

*For turning a result into a document, and for every revision of one. Aim, in the source author's words:
"elite readability with enough rigour, and excellence and elegance".*

---

We are writing up <what>. Before you write a line:

- State what is proved, what is proved under a hypothesis (name it), what is conjectured with numerical
  support, and what is open. That list is the skeleton of the document and goes in `STATUS.md` first.
- Every number that will appear must already come from a script in `scripts/`, with its output in `data/`.
  If one does not, write the script now. Nothing is typed by hand, including anything you are confident of.
- Say which parts are new and which are standard, and for the new parts, what the literature check was.

Then write. Constraints:

- The introduction states the object, the result, and the honest limits, in that order, in language a
  reader from a neighbouring field can follow. The limits are not a closing caveat; they are part of the
  claim.
- Every theorem statement is self-contained: a reader who opens the document at that page must be able to
  tell what the object is and what the hypotheses are.
- Every open point is stated exactly — not "we expect", but what is missing, what strength of input would
  suffice, and what the known obstruction is.
- No sentence on the do-not-claim list. No "clearly", "obviously" or "it is easy to see" without the easy
  argument in the next clause.
- The disclosure section stays, and says accurately how the work was produced.

After writing:

1. Re-read the abstract and the results list against the theorem statements. Drift between headline and
   statement is the most common error in this repository's history — check it explicitly, every time.
2. Regenerate every number and diff it against what is written.
3. Update `STATUS.md` with a dated entry: what changed, what it is based on, what reading it has had.
4. Tell me what in the document you would attack first if you were the referee, and send it to a fresh
   reader (`02-adversarial-reading.md`). Do not tell me it is finished; tell me what stands between it and
   the stopping criterion in `KNOWLEDGE.md` §0b.
