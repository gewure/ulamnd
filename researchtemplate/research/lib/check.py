"""Helpers for the verification rules of AGENTS.md.

Two independent routes for every constant, and agreement stated in units of an error — these are rules
that get skipped because stating them takes three lines of arithmetic. Here are the three lines.
"""

from __future__ import annotations

import math
from dataclasses import dataclass


@dataclass
class Agreement:
    a: float
    b: float
    abs_error: float
    rel_error: float
    digits: float          # decimal digits of agreement
    agrees: bool

    def __str__(self) -> str:
        return (f"{self.a!r} vs {self.b!r}: {self.digits:.1f} digits "
                f"(abs {self.abs_error:.3e}, rel {self.rel_error:.3e}) — "
                f"{'agree' if self.agrees else 'DISAGREE'}")


def agree(a: float, b: float, digits: float = 10.0) -> Agreement:
    """Compare two independent computations of the same constant.

    `digits` is the agreement demanded, in decimal digits of relative error. Returns the comparison
    rather than asserting it, so the report can quote the number of digits that actually agreed — that
    number belongs in the document, not a bare "verified".
    """
    err = abs(a - b)
    scale = max(abs(a), abs(b))
    rel = err / scale if scale else err
    d = math.inf if rel == 0 else -math.log10(rel)
    return Agreement(a, b, err, rel, d, d >= digits)


def in_units_of_error(observed: float, predicted: float, error: float) -> float:
    """How many error bars separate observation from prediction.

    An agreement quoted without this is not a quantified agreement (RULES-INHERITED R25). `error` must
    itself come from two methods — split halves, a second estimator, a probe — never from a single fit's
    reported standard error alone.
    """
    if error <= 0:
        raise ValueError("error must be positive and estimated two ways; see RULES-INHERITED R25")
    return abs(observed - predicted) / error
