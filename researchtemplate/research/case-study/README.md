# The process record (optional)

The programme this template came from wrote a fifth paper about **how the other four were produced**:
the test-driven origin, the guardrails and what triggered each, the evolution of the prompting, the
complete error record, and what model readers cannot catch. It is the reason this template exists.

Whether or not you write such a paper, keep the raw material as you go — it cannot be reconstructed
afterwards, and it is the part of the work that transfers to other people:

- `INTERVIEW.md` — the questionnaire, answered by the human author, verbatim. Answer it *during* the
  work, not at the end; the answers to "what did you do when the tests refuted your claims" are worth
  nothing three weeks later.
- `SOURCES.md` — every claim the record makes, mapped to the evidence for it in this repository.
- `scripts/process-record.py` — regenerates the process numbers (days, commits, documents, errata,
  fallacies, readings) from git and the governance files, so that no number in the record is typed by
  hand either.

The prompts themselves are usually not in the repository. If you want them, save the transcripts as you
go, or quote fragments with dates — the source programme quotes six lines of the author's own prompts and
notes that none of them contains any mathematics.
