**Title:** feat(NumberTheory/AbelSummationDiscrete): a tail bound by discrete partial summation

Let `a : ℕ → ℝ` with partial sums `A n = ∑ d ∈ Icc 1 n, a d`. If `|A n - L * log n| ≤ K` for all `n ≥ 1`
and `∑ |a d| / d` converges, then for `H ≥ 1`

```
|∑' d, (if H < d then a d / d else 0)| ≤ (2 * K + 4 * |L|) / H
```

(`tail_div_le_of_abs_sum_sub_log_le`). The proof is entirely discrete: the identity

```
∑_{H < d ≤ X} a d / d = ∑_{H < d ≤ X} (A d - A H) / (d (d + 1)) + (A X - A H) / (X + 1)
```

(`sum_Ioc_div_natCast_eq_sum_sub_div_add`), the telescoping `∑_{H<d≤X} 1/(d(d+1)) = 1/(H+1) - 1/(X+1)`,
`Real.log_le_two_mul_sqrt : log x ≤ 2 √x` for `x ≥ 1`, and `1/(d √d) ≤ 2 (1/√(d-1) - 1/√d)`.

Motivation: the standard situation `∑_{d ≤ n} a d = L log n + O(1)` (Mertens-type partial sums) and the
need for `∑_{d > H} a d / d = O(1/H)`; `Mathlib.NumberTheory.AbelSummation` gives the integral form, and
this file gives the elementary route that avoids integrability side conditions. This is the most
specialised of the four PRs I am submitting; I am open to the view that only the identity and the
telescoping lemma belong in Mathlib, or that the file belongs elsewhere.

Extracted from a Lean formalisation of the paper *The pair singular series of a polynomial I*
(`gewure/ulamnd`, `research/lean`). Written with substantial assistance from Claude Code; every proof is
checked by Lean and I can explain each step.
