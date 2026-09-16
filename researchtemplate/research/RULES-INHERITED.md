# Inherited rules

These are the domain-independent rules from the error record of the programme this template came from
(`github.com/gewure/ulamnd`, 49 recorded errors over nine days in analytic number theory). They are stated
generically; the parenthesis gives the shape of the original mistake, because a rule without its scar is
easy to nod at and forget.

They are free. Your own `KNOWLEDGE.md` §3 is where the expensive ones will go.

## About claims

**R1. Difference a partial sum before claiming a bounded remainder.** If the summand is unbounded, no
bounded remainder is possible, and no computation will tell you: a quantity growing like log log is below
3 at 10⁷. (A conjecture survived seven revisions and a numerical check to 10⁷ before an outside reader
differenced it in one line.)

**R2. A pattern in two data points from one family is not a conjecture.** Vary the family before naming a
constant or an exponent. (A constant "equal to 2 for all cases" was read off two members of one family;
the generic value is 1.)

**R3. Measure the quantity the theorem controls.** Not the convenient proxy, not the sharp version of a
smoothed statement. (Three decades of data showed a systematic 14% shortfall that was entirely an artefact
of measuring at endpoints an oscillation the theorem never claimed to control.)

**R4. Compute the main term before claiming cancellation.** "These terms should cancel" is a hypothesis,
and it is usually false by a constant. (Twice, in the same programme, with the second instance carrying an
explicit constant that then had to be added to the conjecture.)

**R5. Remove the obvious confounder before calling an effect real.** Especially when the effect is indexed
by something small — the smallest case usually has a special value of some weight, and it is doing all the
work. (An effect with p ≈ 5·10⁻⁴ across fourteen cases was entirely one sign flip at the smallest prime.)

**R6. Before a null result, derive what the theory predicts** — which observable, at which scale, with
which parameters. A null on the wrong observable proves nothing and killed a correct idea for two days.

**R7. A mechanism must have a numerically testable consequence, and it must be tested before it is written
up as the explanation.** The bookkeeping being right does not make the route the right one.

**R8. Correct or leave open.** Never a weaker claim about a different object; never a headline that
survives while the object beneath it quietly narrows. (After every rewrite of a statement, re-read the
abstract and the results list against it — the drift between headline and theorem is the single most
frequent error in the record.)

## About proofs

**R9. "The same proof works" must recompute everything the special case fixed by accident.** Multiplicities,
orders, degrees, the things that were 1 because the example was small. (A generalisation was written with
"identical to the proof of the quadratic case"; in general a pole order was between 2 and 16, and a
logarithmic factor appeared that the statement did not have.)

**R10. Every restriction on a summation or integration variable must be checked for invariance before the
object is rewritten in another form.** (The programme had identified exactly this as the central
obstruction of its open problem, in a paragraph written the same week it committed the error in an easier
case.)

**R11. Read the definition in the source before citing a theorem about it.** Especially after one
mis-citation in the same argument. (A theorem about one series was applied to a superficially identical
series that is not in the same function space; the citation was withdrawn the day it was checked.)

**R12. List the hypotheses of every borrowed result and check each against the object at hand.** A proof
that "cites a method" must satisfy the method's conditions, all of them, including the one that is usually
automatic. (A quotient was asserted non-vanishing in passing; that non-vanishing is a famous open problem.
Two internal passes and one outside assessment read the line without noticing.)

**R13. When you balance two terms, write both exponents at the chosen parameter and check them.** An
unoptimised parameter with an exponent copied from elsewhere is a classic. (Claimed 12/13; the true
optimum was 0.9345, and the tail had never been compared with the claim.)

**R14. Every constant, exponent and parameter a proof introduces needs its constraints listed and its
admissible set checked non-empty.** Never leave an exponent unnamed.

**R15. Re-read a lemma's hypotheses at every application.** "For integer Y" is a hypothesis, and the
application was at Y = H/u.

**R16. A bound uniform in a parameter that drops an exponential in that parameter must be checked against
the normalisation of whatever it multiplies.** True-and-useless is a category of error.

**R17. When an exponent condition changes twice in one day, re-derive it from scratch on paper**, with the
sums written out, and check both limiting directions against what you expect.

**R18. Before estimating a remainder, ask what it *is* on the other side of the identity.** A remainder
whose trivial bound diverges is usually a real object, not a bad estimate — and probably the same size as
the main term. Do not call it a technicality until you have done it. (Estimated at "a day of work"; still
open.)

**R19. Compare a degenerating method against the best proved bound, not against the trivial one.** A method
that "fails" in a range may still beat what is otherwise known there.

**R20. Do not describe an open problem as a lack of rigour.** And do not describe as a technicality
anything you have not carried out.

## About numbers

**R21. Every number in a document comes from a script in the repository.** No exceptions for numbers you
are sure of.

**R22. Two independent routes for every constant**, not the same code run twice; a cross-check that shares
a subroutine with the thing it checks is not a check. (Caught a sign error and a catastrophic cancellation
that no amount of re-reading would have.)

**R23. Complete every tail analytically.** A truncated product or sum multiplying a growing quantity
drifts, and the drift looks like a real effect that depends on your cutoff. (7% at the scale that mattered,
with a "constant" that moved with the cutoff: 0.81, 0.87, 0.91.)

**R24. Subtract exactly before fitting.** Least-squares removal of a main term buries the signal you are
looking for, and a missing term in the design matrix appears as a null result.

**R25. Any fitted amplitude quoted as agreement needs an error from two methods**, and the agreement
stated in units of that error.

**R26. Evaluate a closed form at a large argument before trusting an asymptotic read off it.**

**R27. In a sparse or arithmetically special set, re-derive the "most objects are typical" heuristics with
that set's own density.** They are routinely false there, and false in the direction that flatters you.

## About the process

**R28. Record external actions only when the human confirms they happened.** Submissions, uploads, emails.
An intention recorded as an event propagates into four files and two memories within a day.

**R29. Never claim novelty without a named check**, recorded, with the source read.

**R30. Nothing is proved until someone with no session context has read it.** Your own second pass is not a
reading.

**R31. Tooling traps that cost real time:** a `pkill -f <name>` that matches the harness's own command
line kills the session; unflushed output hides progress and makes a running job look hung; plotting tools
choke on comment characters in data headers. Trivial, and they cost hours.
