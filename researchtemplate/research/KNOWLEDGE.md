# Knowledge base: {{PROGRAMME TITLE}}

Compact, chronological, with the dead ends. Written so that someone new — or a session with no context —
can pick up the work without reading the transcripts. Ratings ★☆☆☆☆ (dead) … ★★★★★ (do this next) are
intuitive and dated; update them.

*This file is the first thing every session reads and the last thing every session writes. If it is out of
date, the process is not running. Keep the section numbering: people learn where to look.*

## 0. One-paragraph summary

{{What the programme is about, what the central object is, what has been established, and the one sentence
of honest framing — what this does NOT show. A stranger should be able to start here. Rewrite it whenever
it stops being true; do not append.}}

## 0b. WHERE THINGS STAND, AND WHAT TO DO NEXT (updated {{date}})

**STATE.** {{One block per document or workstream: length, version, status, what it claims, what reading
it has had. Keep it to what a reader needs to decide what to do next.}}

**WHEN PICKING UP AGAIN, IN ORDER:**
1. {{next step, with what it needs and roughly what it costs}}
2. {{...}}
3. {{...}}

**STOPPING CRITERION** (write this before you need it; the source programme's version, adapt it):
> A document is internally done when every statement in it is either proved and read adversarially at
> least once by a reader with no session context, or explicitly labelled open/conjectural; every number is
> reproducible from this repository; KNOWLEDGE and ERRATA are current; and the open problem is stated
> exactly with its known obstructions. What remains after that is research, or external review.

**DO NOT, WITHOUT NEW EVIDENCE** (the do-not-claim list; from `PROJECT-BRIEF.md` §7 and everything learned
since. Items are added freely and removed only by the author):
- {{sentence the agent may not write}}
- {{...}}

## 0c. OUTSIDE ASSESSMENTS (record)

{{One entry per outside reading: date, who/what, the revision hash assessed, every finding, whether it
stood, and what it changed. Rejected findings are recorded with the reason — that is what makes the
accepted ones mean something. Archive the report itself in `reviews/`.}}

## 1. Timeline

{{Dated entries, append-only, one paragraph each: what was done, what came out, what was decided. This is
the only place where the history is kept in narrative form; never rewrite an entry, only add.}}

- **{{date}}** — programme initialized. {{claims registered; what the first suite refuted}}

## 2. What is proved, conjectured, refuted (status board)

Every statement in the programme appears here with exactly one label. A document may not claim more than
this board does; if they disagree, the board is right until the discrepancy is resolved.

**PROVED:** {{statement — where it is proved — who has read it}}

**PROVED UNDER A HYPOTHESIS:** {{statement — the hypothesis, named — where}}

**CONJECTURED, with numerical support:** {{statement — the evidence, with its scale and its error}}

**NUMERICAL ONLY:** {{observation — the script that produces it}}

**REFUTED:** {{statement — what killed it, with the number}}

**UNTESTED:** {{statement — the cheapest test that would decide it}}

## 3. Known fallacies (things we got wrong, and the fix) — read before repeating them

*Empty until the first error. It will not stay empty. Format, one entry per error:*

> **F{{n}}.** "{{the claim, quoted, as it was written}}" ({{where it appeared, date}}). {{Why it is false, in
> enough detail that the reader can verify the refutation.}} {{How it was found: which test, which reader,
> which session.}} **RULE:** {{the general rule, phrased to apply to a case we have not met yet}}.
> {{`[transferable]` if it is not specific to this field.}}

Rules: never delete an entry, never soften one, never remove one because the claim was later repaired.
Errors found by outside readers are marked as such. Before starting work in an area, re-read the entries
that touch it — several of the source programme's errors were repeats of entries nobody had read.

See also `RULES-INHERITED.md`: the domain-independent rules from the programme this template came from.
They cost someone else nine days; they are free to you.

## 4. Paths and their ratings ({{date}})

{{Every route currently open, rated ★–★★★★★, with what would have to be true for it to work and the cheap
test that would tell us first. The detailed version lives in `RESEARCH-USES.md`; this is the short list a
session can act on. Date every change of rating.}}

## 5. Second opinions

{{What outside models and readers said when asked to assess the programme as a whole — not a specific
document. Assessed, not quoted: which of it we acted on, and what we rejected.}}

## 6. How to verify things here (checklist)

*Specialise this to the objects this programme actually computes. The generic version:*

- Any constant: two independent routes, at least one of them not sharing code with the other.
- Any claimed asymptotic or limit: evaluate at a large argument and compare; difference a partial sum
  before claiming a bounded remainder; remember that no finite computation separates bounded from log log.
- Any truncation, cutoff or approximation multiplying a growing quantity: complete the tail analytically,
  or bound it and show the bound is smaller than the effect.
- Any fit: state what was subtracted, fit at most one free coefficient, and compare against shifted or
  randomised controls.
- Any agreement quoted as confirmation: an error estimated two ways, and the agreement stated in units of
  that error.
- Any novelty claim: the named sources checked, recorded in `LITERATURE.md`.
- Any borrowed theorem: its hypotheses listed and checked one by one against the object here.
- Any rewriting of a sum, family or object into another form: every condition on the variables listed and
  checked for invariance under the rewriting.
- {{field-specific items — the checks that would have caught this programme's own errors}}

Files: `ERRATA.md` (all corrections, dated), `reviews/` (outside assessments with revision hashes),
`LITERATURE.md` (sources with verification status), `explore/STATE.md` (exploration in progress),
`{{document}}/STATUS.md` (per document).
