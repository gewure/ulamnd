# Adversarial reading prompt (fresh agent, no session context)

*Start a **new** session — no history, no memory of the work — and give it this prompt together with the
document. The generator must not be the checker. In the source programme a fresh reader found seven real
defects in a paper that two in-session passes had approved.*

*Do not tell the reader what you believe, which parts are new, or where you suspect a problem. Do not
attach the knowledge base: the document must stand on its own, exactly as a referee would receive it.*

---

You are refereeing the attached document for a journal in its field. Assume the author is competent and
that the errors, if any, are subtle. Your task is to find them. A report that finds nothing is only useful
if you can say precisely what you checked.

Work in this order, and report as you go:

1. **Check the statements against each other.** Abstract, introduction, results list, theorem statements,
   and the objects they are about. Does the headline claim the same thing as the theorem? Is the object in
   the theorem the object defined in §2? Note every drift, however small.
2. **Re-derive, do not read.** For every computation, identity, transform and estimate: do it yourself on
   paper and compare. Do not check that a line follows from the previous one; check that it is true. Where
   two terms are balanced, write both exponents at the chosen parameter and verify the balance.
3. **Every citation is a statement with hypotheses.** For each borrowed result: list its hypotheses and
   check each one against the object it is applied to here. Flag any that you cannot verify without the
   source, and say so explicitly rather than assuming the author read it.
4. **Every restriction and every condition on a variable.** Where a sum, integral or family is rewritten
   in another form, list every condition on the variables and check that the rewriting preserves each one.
   This is where the subtle errors live.
5. **Every constant, exponent and parameter introduced by the proof.** List its constraints and check that
   the set of admissible values is non-empty. Check any asymptotic read off a closed form by evaluating
   the closed form.
6. **The numbers.** Are they consistent with each other and with the claims? Does any agreement quoted as
   confirmation come with an error estimate, and is the agreement stated in units of that error?
7. **What is not said.** What does the document need that it does not state? Which step is asserted with
   "clearly", "similarly", "the same proof gives", "it follows that"? Attack those first.

Report every finding as: location, what is claimed, why it is wrong or unsupported, and how confident you
are. Separate *fatal* (a statement is false), *gap* (a statement may be true but is not proved here), and
*expository*. Rank them. If a claim is correct but for a different reason than given, say so — that counts.

Finally: state what you checked and what you did not, and which parts you were unable to verify without
resources you do not have.

---

## Handling the report (for the author)

- Re-derive each finding independently before applying it. Findings are wrong sometimes, and a wrong
  finding applied is worse than none.
- Every accepted finding becomes an `ERRATA.md` item the same day, and a rule in `KNOWLEDGE.md` §3 if it
  is of a kind that could recur.
- A rejected finding is recorded too, with the reason. In the source programme one reader claim was
  rejected on grounds that are written down, and that record is what makes the acceptance of the others
  meaningful.
- Archive the report in `research/reviews/` with the revision hash it read.
