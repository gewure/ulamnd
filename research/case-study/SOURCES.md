# Sources for the case study (all in this repository unless stated)

| claim in main.tex | where the evidence is |
|---|---|
| timeline, commits per day | `git log`; regenerated into `record.tex` by `scripts/process-record.py` |
| phases 8–14 Sep | `research/KNOWLEDGE.md` §1 (timeline), §0b (state), §0c (assessment record) |
| thesis suite refuting three of four claims | `research/experiments/run.ts`, `REPORT.md`, `CONCLUSIONS.md` |
| honest framing (Bateman–Horn vs RH) | workbench theory panel (`src/components/TheoryPanel.tsx`); every paper's introduction |
| guardrails | `KNOWLEDGE.md` §0b (stopping criterion, do-not-claim), §3 (fallacies F1–F37), §6 (verification checklist); `ERRATA.md` |
| external assessment and the three findings | `research/reviews/2026-09-12-assessment-a372a63.{pdf,txt}`; ERRATA 11–15; KNOWLEDGE §0c |
| second outside reader (paper I, Thm dirichlet) | ERRATA 26; F37; the reader's message (author's copy, to be quoted with permission) |
| adversarial readings by fresh instances | ERRATA 18 (paper III), 22 (paper IV thm:smooth), 24 (paper II §§2–4), 25 (paper IV §§2–4); KNOWLEDGE §0c "second readings" |
| retractions | F15/F26 (sharp conjecture), F28 (paper IV orbit error); paper IV correction notice |
| predictions with no free parameter | ERRATA 19–23; `research/paper-IV/scripts/smooth-*.py`, `data/` |
| authorship decision | ERRATA 8; disclosure section in each `paper-*/main.tex` |
| the user's prompts | not in the repository; session transcripts (author's machine) and the interview |
| page counts | `pdfinfo` on the compiled PDFs (in `record.tex`) |
