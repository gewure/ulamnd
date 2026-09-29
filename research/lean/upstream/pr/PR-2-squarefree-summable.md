**Title:** feat(NumberTheory/EulerProduct): summability of a squarefree-supported multiplicative function from its values at primes

If `f : ℕ → F` (`F` a normed field) satisfies `f 0 = 0`, `f 1 = 1`, is multiplicative on coprime arguments
and vanishes at `p ^ k` for every prime `p` and `k ≥ 2`, then `∑ ‖f n‖` converges as soon as
`Summable fun p : Nat.Primes ↦ ‖f p‖` (`summable_norm_of_squarefree_multiplicative`). The bound is the
classical

```
∑_{n < N} ‖f n‖ ≤ ∏_{p < N} (1 + ‖f p‖) ≤ exp (∑_p ‖f p‖),
```

and the intermediate statements (`norm_eq_prod_primeFactors_of_multiplicative`,
`norm_le_prod_primeFactors_of_multiplicative`, `eq_zero_of_not_squarefree_of_multiplicative`,
`sum_range_norm_le_prod_of_multiplicative`) are exposed.

Motivation: `EulerProduct.eulerProduct_tprod` takes `Summable (‖f ·‖)` as a hypothesis; for the functions
that arise from Euler products of the form `∏_p (1 + g_p)` (squarefree support), this lemma supplies that
hypothesis from the primes alone, which is how such products are estimated in practice. The two together
give `∑ n, f n = ∏' p, (1 + f p)` from `∑_p ‖f p‖ < ∞`.

Extracted from a Lean formalisation of the paper *The pair singular series of a polynomial I*
(`gewure/ulamnd`, `research/lean`). Written with substantial assistance from Claude Code; every proof is
checked by Lean and I can explain each step. Happy to rename or to state it for `ℝ≥0`-valued norms if
preferred.
