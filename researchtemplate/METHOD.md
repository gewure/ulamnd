# The method

Everything here was learned in one programme, mostly by getting something wrong first. Each guardrail is
stated with what it does, and — where it matters — what it cost to learn it. Keep the table in your own
repository and add a column: *when it entered, and whether you or the agent proposed it.* Ten of the
fourteen below were the human's; the record of which is which is worth having.

## The guardrails

| guardrail | what it does | why it exists |
|---|---|---|
| **Declare a research programme in the first prompt**: test-driven, methods and paths enumerated and rated, a knowledge file that collects findings | Sets the register for everything after. In the source author's view the single most important step | The first prompt shaped nine days of work |
| **Knowledge base** (`KNOWLEDGE.md`): one-paragraph summary, "where things stand and what to do next", status board, timeline, dead ends | Forces each session to start from the recorded state rather than the model's memory of it. Compacted notes a new session can pick up without re-deriving | Sessions end; context is lost; the agent's account of its own past work is unreliable |
| **Fallacy list** (`KNOWLEDGE.md` §3, and `RULES-INHERITED.md`) | Every error written down with its fix and the general rule that follows. Read before work, not after | 49 entries in the source. Several errors were repeats of an entry nobody had read |
| **Project-wide errata, never deleted** (`ERRATA.md`) | Corrections are additive and dated; the history of what was wrong stays visible | A correction that is silently applied cannot be audited, and gets re-broken |
| **Same-day rule** | An erratum to a statement in an abstract, theorem or conjecture is applied the same day, or the document is marked *do not circulate* | An erratum recorded as "worth a line next time" sat for a day while the notes claimed the paper was submitted |
| **Every number from a script in the repository** | Nothing typed by hand, nothing quoted from the model's head. The paper's numbers are regenerated, not remembered | The one discipline that caught the most errors |
| **Two independent routes for every constant** | Product vs. closed form; partial sum plus tail vs. exact evaluation | A truncated product that looked fine drifted by 7% at the scale that mattered |
| **State the thesis as tests before believing it** | Claims are registered in a harness and run; the answer is recorded whichever way it comes out | Three of the source's four opening claims were refuted the first evening. That was the good outcome |
| **Hostile outside review, compressed and returned** | Another vendor's model, instructed to attack. Findings are compressed, annotated with context, handed to the working agent, and the response is discussed with the reviewer again | Closest available thing to peer review. The largest single instance produced three findings, all of which stood |
| **Adversarial reading by a fresh instance with no session context** | Separates generator from checker. The reader gets the document and nothing else | A fresh reader found seven real defects in a paper that two in-session passes had approved |
| **Archive every assessment with the revision hash** | Review and text stay paired; you can tell what was actually read | Otherwise "it was reviewed" decays into folklore |
| **Correct or leave open — never a weaker claim about a different object** | Decides in advance what a repair may do | Repairs under pressure drift toward a true statement about something nobody asked about |
| **Press on effort estimates, in both directions** | Demand the attempt when the agent says "weeks"; record it when the agent says "a day" and is wrong | Both happened. One repair estimated at two weeks took a day; one remainder estimated at a day is still open |
| **A written stopping criterion, set before you need it** | Ends open-ended polishing | Without it the agent always has a "next up", and rigour inflates until sessions run out of context |
| **A do-not-claim list** | Sentences the agent may not write, whatever the results | Honest framing is easier to keep than to restore |

## The stopping criterion

Write your own version into `KNOWLEDGE.md` §0b **before** the first document is finished. The source
programme's, set when the author asked "are we not over-rigoring?":

> A document is internally done when every statement in it is either (a) proved and read adversarially at
> least once by a reader with no session context, or (b) explicitly labelled open or conjectural; every
> number in it is reproducible from the repository; the knowledge base and errata are current; and the
> open problem is stated exactly, with its known obstructions. What remains after that is research, or
> external review — not polishing.

Keep the demanded rigour at a human scale. In the source programme the fourth paper demanded more
verification than the situation warranted, sessions ran out of context and work had to be restarted.

## The register

The human's turns in the source programme contain no mathematics. They are decisions, constraints and
routing. The working image the author used, and recommends:

> an absolute pro mathematician who never budges to my requests, but patiently works with me through the
> problems and explains them in a way that I, as a software engineer, can build a research framework
> around — or tell it when I think we should hold, do more tests, do a review.

Two rules of thumb from the same source: *asking stupid questions gets stupid answers*, and *a few verbose
words at the right time can make a big difference*. A vague prompt is fine if it is anchored; the anchor
points must be valid.

When you understand nothing of a passage, do not nod. Ask for it to be simplified to the level where you
can make the next decision — which route, whether more literature is needed, whether to stop. Vagueness in
the answer is a signal that the ground is not solid and that a literature round is due.

## What this process does not catch

Say this in your papers. It is the honest part, and it is where the method ends.

- **Hostile model review reliably catches**: algebra, convergence, internal inconsistency, arithmetic, and
  misreadings of the document's own definitions — in quantity.
- **It catches unreliably**: a borrowed theorem invoked outside its hypotheses. This is caught only when
  the theorem is famous enough that the reader knows it cold; otherwise the citation is read as an
  authority rather than as a statement with conditions. Several of the source programme's worst errors
  were of exactly this kind, and the ones that were caught were caught by a *human* reading the original.
- **It does not catch at all**: whether the question is worth asking, whether the object you defined is the
  object the field cares about, and whether an unstated convention in your field makes your statement mean
  something other than what you think it means.
- **No finite computation** distinguishes a bounded quantity from one growing like log log. Numerical
  confirmation to 10⁷ is exactly what several false claims looked like.

A specialist's reading is a different instrument from everything in this template. Budget for it, and do
not describe model review as a substitute in anything you publish.

## Cost, for calibration

The source programme: nine days, about eight hours a day, roughly $150 of tokens and compute, one person,
a laptop, no cluster. Four papers of 24–32 pages, every number regenerable. That is the shape of what this
template is for — not a guarantee, and not a claim that the mathematics in it is right.
