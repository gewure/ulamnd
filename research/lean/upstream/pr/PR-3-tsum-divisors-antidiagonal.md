**Title:** feat(NumberTheory/SumDivisorsAntidiagonal): regroup a summable double series along divisor antidiagonals

For summable `G : ℕ × ℕ → α` (`α` a complete normed additive group) that vanishes whenever a coordinate is
`0`,

```
∑' n, ∑ p ∈ n.divisorsAntidiagonal, G p = ∑' p, G p
```

(`Nat.tsum_sum_divisorsAntidiagonal`), with the `HasSum` form `Nat.hasSum_sum_divisorsAntidiagonal` and
the fibre computation `Nat.tsum_fiber_mul_eq_sum_divisorsAntidiagonal`.

Motivation: this is exactly the regrouping inside `LSeriesHasSum.convolution` (which does it for
`term f s p.1 * term g s p.2` over `ℂ`), extracted for an arbitrary summable `G`. It is what one needs when
the summand is not a product — e.g. `G (d, m) = A d * [Coprime d m] * B m`, which arises when a Dirichlet
series is summed over squarefree `q = d m`.

If preferred I can instead generalise the existing lemma in `LSeries/Convolution.lean` and derive the
`ℂ` case from this one.

Extracted from a Lean formalisation of the paper *The pair singular series of a polynomial I*
(`gewure/ulamnd`, `research/lean`). Written with substantial assistance from Claude Code; every proof is
checked by Lean and I can explain each step.
