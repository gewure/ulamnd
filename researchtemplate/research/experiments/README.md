# The claim suite

The thesis, stated as tests, run as code.

```
python3 run.py                 # fast mode — keep it under a couple of minutes
python3 run.py --full          # the long scales
python3 run.py --only T1,T3
```

`run.py` writes `REPORT.md` and `results.json` (`REPORT-full.md`, `results-full.json` in full mode).
Those files are **generated**: never edit them, re-run instead. `CONCLUSIONS.md` is the human reading of
the report and is the only file here written by hand.

## The discipline

- A claim is registered in `claims.py` **before** it is believed, with the condition that would refute it.
- Every number quoted anywhere in the programme comes from here or from a script in a document's
  `scripts/`. Nothing is typed from memory, including numbers you are sure of.
- Tests are deterministic. One seed, set once, recorded in the report.
- Shared machinery goes in `../lib/` with unit tests in `../tests/` — the suite may not be the only thing
  that has ever exercised a function a result depends on.
- When a test refutes a claim, that is the result. Record it, in the first sentence, without softening.
- Re-run the suite after any change to `lib/`, and diff the numbers against what the documents quote. A
  number that moved is the day's work, whatever else was planned.

## Two routes

Anything that becomes a constant in a document needs a second, independent computation — not the same
function called twice, and not a check that shares a subroutine with the thing it checks. Put the second
route in the same claim (`numbers` can hold both) or in a document's `scripts/`, and say in the report
which two routes agreed and to how many digits.
