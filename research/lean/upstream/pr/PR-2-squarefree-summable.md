**Title:** feat(NumberTheory/EulerProduct): absolute summability of a multiplicative function from its values at prime powers

The Euler product theorems in `EulerProduct/Basic.lean` (`eulerProduct_hasProd`, `eulerProduct_tprod`, …) take `Summable (‖f ·‖)` as a hypothesis. For a
multiplicative `f : ℕ → F` (`F` a normed field, `f 1 = 1`, multiplicative on coprime arguments) this hypothesis follows from data at the prime powers alone:

```
theorem EulerProduct.summable_norm_of_summable_primes
    (hf₁ : f 1 = 1) (hmul : ∀ {m n : ℕ}, m.Coprime n → f (m * n) = f m * f n)
    (hsum : ∀ {p : ℕ}, p.Prime → Summable (fun n ↦ ‖f (p ^ n)‖))
    (hp : Summable (fun p : Nat.Primes ↦ ∑' n : ℕ, ‖f (p ^ (n + 1))‖)) :
    Summable (fun n ↦ ‖f n‖)
```

Proof: apply the existing `summable_and_hasSum_smoothNumbers_prod_primesBelow_tsum` to `‖f ·‖` (which is multiplicative with value `1` at `1`), so that
`∑_{0<n<N} ‖f n‖ ≤ ∑_{m ∈ smoothNumbers N} ‖f m‖ = ∏_{p<N} ∑_n ‖f (p^n)‖ = ∏_{p<N} (1 + a_p) ≤ exp ∑_{p<N} a_p ≤ exp ∑_p a_p`, and conclude with
`summable_of_sum_range_le`. About 45 lines, placed directly after `eulerProduct_tprod`.

Motivation: this is how Euler products `∏_p (1 + g_p)` are actually estimated — from the primes — and it lets `eulerProduct_tprod` be used without proving the
summability of `‖f‖` separately. (A first version of this PR proved a special case for functions supported on squarefree numbers from scratch; a reader pointed
out it should be a corollary of the existing machinery, which it now is.)

Extracted from a Lean formalisation of the paper *The pair singular series of a polynomial I* (`gewure/ulamnd`, `research/lean`). Written with substantial
assistance from Claude Code; every proof is checked by Lean and I can explain each step.
