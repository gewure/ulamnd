# Conclusions from the claim suite

*The human reading of `REPORT.md`. Every number quoted here is in that file; re-run `python3 run.py` to
regenerate it. Where the `--full` run differs materially from the fast one, say so.*

Last read: {{date}}, revision {{hash}}, mode {{fast/full}}.

## The thesis, as tested

{{The claims, numbered as in PROJECT-BRIEF.md §2 and claims.py.}}

1. {{claim}}
2. {{claim}}

## What the tests establish

### Claim {{n}} is {{true / false / undecided}} ({{T-keys}})

{{The finding in the first sentence, with the number that decides it. Then: at what scale, with what
control, and what the test does NOT show. If the claim died, say it died — no consolation paragraph.}}

{{If an artefact had to be controlled for, describe it: the first version of this measurement was wrong
because of X, and anyone repeating the experiment must control for it. This paragraph is worth more to a
later reader than the result.}}

### {{...}}

## What survived

{{The lead, if there is one: the observation that was not predicted and did not die. What would have to be
true for it to be a result, and what the cheapest next test is.}}

## What this suite does not decide

{{Explicitly. Claims marked INCONCLUSIVE and what scale or method would settle them; claims that are not
testable by computation at all and need theory or a reader.}}
