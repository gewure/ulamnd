# A research-programme template for working with an AI agent

This directory is an **empty research repository**. It has the structure, the governance files and the
prompts of a programme that was actually carried out — four papers in analytic number theory, written in
nine days by a software engineer with no training in the field, working with a coding agent — with the
mathematics removed. You fill in `PROJECT-BRIEF.md`, run the initialization prompt, and the template
becomes your programme.

It is not a framework and installs nothing. It is a set of files an agent reads at the start of every
session, a loop for producing and checking claims, and the rules that were paid for with real errors.

## The claim this template makes

An agent left to itself produces confident, unfalsifiable output. The quality comes from four things, and
all four are file-shaped:

1. **A knowledge base the agent writes and re-reads.** State, timeline, status board, dead ends. Every
   session starts from the recorded state, not from the model's account of it.
2. **A computational check for everything.** No number reaches a document unless a script in the repository
   produced it. Claims are registered as tests before they are believed.
3. **A written error record.** Every mistake gets an entry, a fix, and the general rule that would have
   prevented it. The rules are read before work, not after.
4. **Adversarial reading by someone who was not there.** A fresh agent with no session context, or a
   different vendor's model, instructed to attack. The generator is never the checker.

What the human supplies is not the domain knowledge. It is the framing, the decisions between routes, the
routing of work to reviewers, and the refusal to accept a claim that has not been checked.

## Five-minute start

```
cp -r researchtemplate ~/my-programme && cd ~/my-programme && git init
$EDITOR PROJECT-BRIEF.md          # 15 minutes; it is the only thing you must write yourself
```

Then open an agent session in that directory and paste the contents of `prompts/00-initialize.md`.

The agent will turn your brief into falsifiable claims, do a literature round, build the first test suite,
run it, and write the knowledge base. **Expect most of your claims to be refuted on the first day.** In the
programme this template comes from, three of the author's four opening claims died the first evening; what
survived became the research.

Every later session begins by pasting `prompts/01-session-start.md`.

## What is in here

| file | what it is for |
|---|---|
| `PROJECT-BRIEF.md` | **you write this.** The question, your claims, what would refute them, what you can and cannot check yourself, budget, the do-not-claim list |
| `METHOD.md` | the guardrails, one table, each with what it prevents and what it cost to learn |
| `AGENTS.md` / `CLAUDE.md` | standing instructions the agent reads every session |
| `prompts/` | the reusable prompts: initialize, session start, adversarial reading, outside review, paper pass, stopping check |
| `research/KNOWLEDGE.md` | the state of the programme. §0b is the first thing anyone reads |
| `research/ERRATA.md` | every correction, dated, never deleted |
| `research/RULES-INHERITED.md` | domain-independent rules distilled from the source programme's 49 recorded errors |
| `research/RESEARCH-USES.md` | rated directions: what the findings could be good for |
| `research/LITERATURE.md` | literature rounds, with the verification status of every citation |
| `research/experiments/` | the claim harness: `claims.py` registers the thesis as tests, `run.py` produces `REPORT.md` |
| `research/lib/`, `research/tests/` | shared, tested code — everything a number depends on lives here |
| `research/paper-I/` | a paper skeleton: `main.tex`, `STATUS.md`, `scripts/`, `data/` |
| `research/explore/STATE.md` | working state of an exploration in progress, written for pick-up |
| `research/reviews/` | outside assessments, archived with the revision hash they assessed |
| `research/case-study/` | optional: the methodological record of your own process |
| `scripts/audit.py` | mechanical hygiene checks on the governance files |

## Commands

```
python3 research/experiments/run.py              # the claim suite (fast); writes REPORT.md
python3 research/experiments/run.py --full       # the long scales
python3 -m unittest discover -s research/tests   # unit tests for research/lib/
python3 scripts/audit.py                         # bookkeeping checks on the governance files
python3 research/case-study/scripts/process-record.py    # process numbers, from git
cd research/paper-I && tectonic main.tex         # a document
```

Python 3.11+, standard library only. Add what your field needs and record it in the brief; the template
depends on nothing so that the first thing you install is a decision, not an inheritance.

## The loop

```
   brief ──▶ claims as tests ──▶ run ──▶ REPORT ──▶ CONCLUSIONS
                                                        │
                        ┌───────────────────────────────┘
                        ▼
   KNOWLEDGE.md (state, status board, fallacies)  ◀── every session starts here
                        │
          ┌─────────────┼──────────────┐
          ▼             ▼              ▼
     explore/STATE   paper-N/       RESEARCH-USES
       (hypotheses)   (write-up)     (rated routes)
          │             │
          └──▶ adversarial reading (fresh agent, no context) ──▶ ERRATA ──▶ back into the paper
```

Nothing moves right without a number that a script produced, and nothing is called proved until someone
who was not in the session has read it.

## Honest limits

Read `METHOD.md` §"What this process does not catch" before you start, and write the same paragraph into
your own papers. Briefly: hostile model review reliably catches algebra, internal inconsistency,
convergence and misreadings of your own definitions. It does not reliably catch a borrowed theorem invoked
outside its hypotheses, and it cannot tell you whether the question is interesting. Neither can this
template. A specialist reading is a different thing from everything in here, and it is not optional if you
intend to publish.

If you use an AI system to produce research, say so in the work. The paper skeleton has a disclosure
section; do not delete it.

---

Derived from the process of `github.com/gewure/ulamnd` (September 2026), whose `research/case-study/`
documents it in full. The template carries the method, not the mathematics.
