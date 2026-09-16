"""Unit tests for `research/lib/`.

    python3 -m unittest discover -s research/tests -v

Convention: every function in `lib/` that a document's numbers depend on is tested here against a
brute-force or independently derived value — not against its own output recorded earlier.
"""

from __future__ import annotations

import math
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from lib.check import agree, in_units_of_error  # noqa: E402


class TestAgree(unittest.TestCase):
    def test_identical_values_agree_to_infinite_digits(self):
        a = agree(math.pi, math.pi)
        self.assertTrue(a.agrees)
        self.assertEqual(a.digits, math.inf)

    def test_digit_count_is_the_relative_error(self):
        a = agree(1.0, 1.0 + 1e-8, digits=10)
        self.assertFalse(a.agrees)
        self.assertAlmostEqual(a.digits, 8.0, places=6)

    def test_zero_scale_is_not_a_division_by_zero(self):
        self.assertTrue(agree(0.0, 0.0).agrees)


class TestUnitsOfError(unittest.TestCase):
    def test_counts_error_bars(self):
        self.assertAlmostEqual(in_units_of_error(1.2, 1.0, 0.1), 2.0)

    def test_refuses_a_missing_error_estimate(self):
        with self.assertRaises(ValueError):
            in_units_of_error(1.2, 1.0, 0.0)


if __name__ == "__main__":
    unittest.main()
