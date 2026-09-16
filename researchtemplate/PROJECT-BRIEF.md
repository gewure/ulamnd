# Project brief

**You write this file, by hand, before anything else happens.** It is the only input the initialization
prompt needs, and it is the one document in the repository that is allowed to contain beliefs rather than
results. Fifteen minutes is enough. Vagueness here is expensive later: the agent will build the whole
programme on these anchor points, and a wrong anchor point produces confident work in the wrong direction.

Leave a section empty rather than filling it with something you do not mean. Replace every `<...>`.

---

## 1. The question

<One paragraph, in your own words, at whatever level of precision you actually have. What do you want to
know, and why do you think nobody knows it yet? If it started as a visual intuition or a hunch, say that.>

## 2. The claims

Three to six, numbered, stated as you believe them **before** any test. Write them so they can be wrong.

1. <claim>
2. <claim>
3. <claim>

## 3. What would refute each claim

For every claim above, what observation or computation would make you abandon it? If you cannot answer for
a claim, mark it `NOT YET FALSIFIABLE` — the first job of the programme is to make it so, or to drop it.

1. <refuted if ...>
2. <refuted if ...>
3. <refuted if ...>

## 4. What exists already

<What you know of the prior art: names, papers, tools, standard results, the textbook chapter this sits in.
"I do not know" is a legitimate answer and triggers a literature round before any work starts. List also
anything you have already tried, including what failed.>

## 5. What you can and cannot check yourself

<Your training and level. What you can read in a paper of this field, what you can verify by hand, what you
will have to take on trust or route to a reviewer. Be exact and unflattering; the agent calibrates every
explanation to this, and the guardrails exist because of what is on the "cannot" side.>

Can check: <...>
Cannot check: <...>
Have access to a specialist reader: <yes / no / who>

## 6. Resources and constraints

- Time: <hours per day, and for how long>
- Compute: <machine, cores, memory, any cluster, wall-clock you tolerate for one experiment>
- Money: <budget for tokens and compute>
- Software you are willing to depend on: <languages, libraries, TeX distribution; anything forbidden>
- Data: <what you have, what needs downloading, licences>

## 7. The do-not-claim list

Sentences that may never appear in this repository, however well the work goes. Start from these three and
add your field's versions; the agent will propose more and must ask before removing any.

- No claim that a result bears on <the famous open problem your field's cranks attach themselves to>
  unless the implication is proved and written out.
- No claim of novelty without a named literature check recorded in `research/LITERATURE.md`.
- No statement that something is proved when what exists is numerical support, however strong.
- <your own>

## 8. Output

<What the work should end as: papers (for which venue?), a technical report, a reusable tool, a dataset,
an internal answer. If papers: single author or a group, and who takes responsibility for the mathematics.>

## 9. Standing preferences

<How you want to be worked with. Examples from the source programme, which you may keep or replace:
"explain at the level where I can decide, not at the level where I can only agree"; "when I ask for an
effort estimate, give the range and your confidence"; "correct or leave open — never a weaker claim about
a different object"; "when you are vague, I will read it as a signal that we need more literature".>

---

## Initialization record

*(the agent fills this in at the end of initialization and does not touch it afterwards)*

- Initialized on: <date>
- Claims registered as tests: <T1 … Tn>
- Claims refuted by the first suite: <...>
- Surviving lead: <...>
- Literature round: <done / outstanding>, see `research/LITERATURE.md`
