# Outside review prompt (a different vendor's model, instructed to attack)

*The source programme's author routed every decision he could not check himself through this loop, and
described it as "very similar to how real peer review works". Use a model from a different vendor than the
one doing the work, in a session that has never seen the project.*

---

I am going to give you a research document. I want a hostile assessment. Assume it is probably wrong
somewhere and that your job is to find where — not to summarise it, not to praise it, and not to suggest
improvements to the writing.

Specifically:

1. What is actually claimed, in your words, and is that claim interesting or trivial in this field?
2. Is anything here already known? Name the prior work it duplicates, and be specific enough that I can
   look it up.
3. Where is the proof wrong? Re-derive; do not follow. Give me the line and the reason.
4. Where is it not wrong but not proved — a gap presented as a step?
5. Which cited theorem is used outside its hypotheses?
6. Is the numerical evidence evidence for the claim made, or for a different claim?
7. If you had to bet: which single statement in here is most likely to be false, and why?

Be blunt. If the whole thing is a triviality dressed up, say that in the first line.

---

## The loop (for the author)

1. Take the findings out of the reviewer's session and **compress** them: one paragraph per finding, in
   the project's own vocabulary, with the location.
2. **Annotate** each with the context the reviewer lacked — but do not annotate a finding out of
   existence, and do not tell the working agent which ones you think are wrong.
3. Hand them to the working agent with: *investigate each, independently derive whether it is right, fix
   what is right, and tell me which are wrong and why.*
4. Take the agent's response **back to the reviewer** and let them argue. Two rounds is usually enough.
5. Archive the original assessment in `research/reviews/` with the revision hash. Record the outcome of
   each finding in `ERRATA.md`, including the rejected ones with reasons.

Expect a yield of roughly: algebra and internal inconsistency, reliably; misuse of a famous theorem,
sometimes; misuse of an obscure one, almost never. Plan the specialist reading accordingly.
