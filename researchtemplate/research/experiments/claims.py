"""The thesis, as tests.

Every claim the author believes is registered here BEFORE it is believed, together with the condition
that would refute it. `run.py` executes them and writes `REPORT.md`; `CONCLUSIONS.md` is the human
reading of that report.

Rules (see ../../AGENTS.md):

  * one function per claim, named `T1`, `T2`, … matching `PROJECT-BRIEF.md` §2;
  * `refuted_if` is mandatory and is a sentence, not a formula — a claim nobody can refute is not a claim;
  * a test returns a `Verdict` and the numbers behind it; every number that will ever be quoted
    anywhere comes from here or from a script in a document's `scripts/`, never from a person's memory;
  * a test is deterministic: seed everything, and say in `notes` what the seed and the scale were;
  * `fast` must finish in seconds; `full` may take as long as it states in `runtime`.

Refuting the author's own claim is the expected outcome of the first suite, and it is reported plainly.
"""

from __future__ import annotations

import math
import random
from dataclasses import dataclass, field
from typing import Any, Callable

SEED = 20260916  # change once, at initialization; never per-run


# --------------------------------------------------------------------------------------------------
# registry
# --------------------------------------------------------------------------------------------------

SUPPORTED = "SUPPORTED"      # the test came out as the claim predicts
REFUTED = "REFUTED"          # the refutation condition was met
INCONCLUSIVE = "INCONCLUSIVE"  # the test does not decide it at this scale — say what would


@dataclass
class Verdict:
    verdict: str
    summary: str                       # one sentence, the number that decides it included
    numbers: dict[str, Any] = field(default_factory=dict)
    notes: str = ""                    # scale, seed, artefacts controlled for, what was NOT tested


@dataclass
class Claim:
    key: str
    statement: str
    refuted_if: str
    fn: Callable[[bool], Verdict]
    runtime: str


CLAIMS: dict[str, Claim] = {}


def claim(key: str, statement: str, refuted_if: str, runtime: str = "seconds"):
    """Register a claim. `refuted_if` is mandatory: no unfalsifiable claims in the suite."""
    def wrap(fn: Callable[[bool], Verdict]) -> Callable[[bool], Verdict]:
        if not refuted_if.strip():
            raise ValueError(f"{key}: refuted_if is empty — make the claim falsifiable or drop it")
        if key in CLAIMS:
            raise ValueError(f"{key}: registered twice")
        CLAIMS[key] = Claim(key, statement.strip(), refuted_if.strip(), fn, runtime)
        return fn
    return wrap


# --------------------------------------------------------------------------------------------------
# T0 — the suite's self-test. Keep it: it is the check that the harness itself is honest.
# --------------------------------------------------------------------------------------------------

@claim(
    "T0",
    statement="The harness is deterministic and reports a refutation when one occurs.",
    refuted_if="two runs with the same mode disagree, or the deliberately false sub-claim below comes "
               "back SUPPORTED.",
)
def T0(full: bool) -> Verdict:
    rng = random.Random(SEED)
    sample = [rng.random() for _ in range(1000)]
    checksum = round(math.fsum(sample), 12)

    # a deliberately false sub-claim: the mean of 1000 uniforms is exactly 1/2.
    mean = checksum / 1000
    false_subclaim_holds = mean == 0.5

    if false_subclaim_holds:
        return Verdict(REFUTED, "the deliberately false sub-claim came back true; the harness lies",
                       {"mean": mean})
    return Verdict(
        SUPPORTED,
        f"deterministic checksum {checksum}; the false sub-claim was correctly rejected (mean {mean:.6f})",
        {"checksum": checksum, "mean": mean, "seed": SEED},
        notes="Delete this claim only when the suite has real ones and you have run it twice.",
    )


# --------------------------------------------------------------------------------------------------
# T1 … Tn — your claims. One block each, copied from PROJECT-BRIEF.md §2 and §3.
# --------------------------------------------------------------------------------------------------

# @claim(
#     "T1",
#     statement="{{the claim, precisely, in the language of the field}}",
#     refuted_if="{{the observation or computation that would make us abandon it — a sentence}}",
#     runtime="~40 s fast, ~12 min full",
# )
# def T1(full: bool) -> Verdict:
#     """{{What this measures, and what it deliberately does not measure.}}"""
#     n = 10**7 if full else 10**5
#     ...
#     if observed > threshold:
#         return Verdict(REFUTED, f"observed {observed:.4f} > {threshold:.4f} at n = {n}",
#                        {"observed": observed, "threshold": threshold, "n": n},
#                        notes="controlled for {{the artefact that faked this effect the first time}}")
#     return Verdict(SUPPORTED, f"observed {observed:.4f} at n = {n}", {...})
