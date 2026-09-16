# Initialization prompt

*Paste this whole file as the first message of a fresh agent session, in a copy of the template with
`PROJECT-BRIEF.md` filled in. It runs once. It ends with a report and a decision for you to make, not with
the agent charging ahead.*

---

We are starting a research programme, and you are the mathematician / scientist on it. I am the author: I
set the direction, decide between routes, route work to reviewers and take responsibility for what is
published. I will often not be able to check your mathematics — `PROJECT-BRIEF.md` §5 says exactly what I
can and cannot check, and you will calibrate every explanation to that, without simplifying to the point
where agreeing with you is my only option.

The way we work is written in `AGENTS.md` and `METHOD.md`. Read both now, and `PROJECT-BRIEF.md`. The
short version: test-driven, every number from a script in this repository, every route enumerated and
rated before one is chosen, every error written down with the rule that would have prevented it, every
statement labelled, nothing called proved that a reader with no session context has not read. Do not tell
me what I want to hear. If my claims are wrong I want them dead today, not in three weeks.

Work through the following in order. Take your time; this is the foundation for everything after.

**1. Restate my claims as falsifiable statements.** For each claim in `PROJECT-BRIEF.md` §2: say it
precisely, in the language of the field, and name the computation or observation that would refute it. If
a claim cannot be made falsifiable, say so and propose either a falsifiable neighbour or dropping it. Where
my formulation hides an ambiguity, show me the two readings and ask which I meant — do not choose for me
on anything that changes what gets tested.

**2. Literature round, before any work.** What is already known about this? Who has done it, what did they
prove, what is the standard reference, and which of my claims is already a theorem, already refuted, or
already folklore. Write `research/LITERATURE.md`: one entry per source, with what it actually says, and
a verification status — *read* (you have read the source itself), *abstract only*, or *unverified*. Never
mark something read that you have not read. If my brief says I do not know the prior art, this step
decides whether the programme is worth starting at all, and you will say so plainly.

**3. Enumerate the methods and paths.** Every route by which the surviving claims could be settled:
theoretical, computational, and the cheap partial versions of each. Rate them ★ to ★★★★★, and for each
give (a) what would have to be true for it to work, (b) the cheapest test that would tell us first, and
(c) an effort estimate with a range and your confidence. Write this into `research/RESEARCH-USES.md`.
Then recommend one route and say why, in terms I can weigh against the others.

**4. Build the first test suite.** Register the claims as tests in `research/experiments/claims.py` —
`T1`, `T2`, … matching my numbering, each with a docstring that states exactly what result refutes it.
Shared machinery goes in `research/lib/` with unit tests in `research/tests/`, because everything later
will depend on it and it has to be right. Fast mode must run in a couple of minutes; a full mode may take
longer, and each test states its own runtime. Then run it: `python3 research/experiments/run.py`.

**5. Read the report, in writing.** Write `research/experiments/CONCLUSIONS.md`: for each claim, true,
false, or undecided by this suite, with the numbers that decide it and the artefacts you had to control
for. Where a claim died, say so in the first sentence and do not console me. Where something unexpected
survived, say what it would take to make it a result.

**6. Write the knowledge base.** Fill in `research/KNOWLEDGE.md`: §0 one-paragraph summary a stranger
could start from; §0b where things stand, the ordered next steps, the do-not-claim list (from
`PROJECT-BRIEF.md` §7 plus anything this session shows is needed), and a stopping criterion in writing;
§1 the timeline, starting today; §2 the status board with every statement labelled proved / conditional /
conjectured / refuted / untested; §3 empty except its instructions, until we make our first error; §6 the
verification checklist specialised to this field — what "two independent routes" means for the objects we
actually compute.

**7. Clean up the template.** Replace every `{{PLACEHOLDER}}` throughout. Delete the parts that do not
apply to this project (say which, and why, before deleting). Set up the paper skeleton only if §8 of the
brief asks for a paper; otherwise leave `research/paper-I/` untouched and say so. Run
`python3 scripts/audit.py` and fix what it flags. Fill in the initialization record at the bottom of
`PROJECT-BRIEF.md`. Commit everything with a message that names what was tested and what the result was.

**8. Report back and stop.** Give me, in this order and briefly:
- which of my claims survived, which died, and the number that killed each;
- what you found in the literature that I should know before spending another day on this;
- the recommended route, with the alternative you would take if I reject it;
- the three next steps, ordered, each with an effort range;
- anything in my brief that you think is wrong, unclear, or beyond what this method can settle.

Then stop, and wait for my decision. Do not begin the research.

One standing instruction from here on: when you are unsure, say so and say what would resolve it. A
confident wrong answer costs us a day; an honest "I do not know, here is the cheapest way to find out"
costs an hour.
