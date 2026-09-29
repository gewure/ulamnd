/-
Copyright (c) 2026 Jasper Reichardt. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: Jasper Reichardt
-/
import Mathlib

/-!
# Regrouping a double series over `ℕ × ℕ` along divisor antidiagonals

If `G : ℕ × ℕ → α` is summable and vanishes whenever one coordinate is `0`, then
`∑' n, ∑ p ∈ n.divisorsAntidiagonal, G p = ∑' p, G p`, and the left-hand family is a `HasSum`
(`Nat.hasSum_sum_divisorsAntidiagonal`, `Nat.tsum_sum_divisorsAntidiagonal`).

This is the mechanism behind the multiplicativity of L-series under Dirichlet convolution
(`LSeriesHasSum.convolution`), extracted for a general summable `G`.
-/

namespace Nat

open Finset

variable {α : Type*} [NormedAddCommGroup α]

/-- The fibre of `(d, m) ↦ d * m` over `n ≠ 0` is the divisor antidiagonal of `n`. -/
theorem preimage_mul_singleton_eq_divisorsAntidiagonal {n : ℕ} (hn : n ≠ 0) :
    (fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {n} = (n.divisorsAntidiagonal : Set (ℕ × ℕ)) := by
  ext p
  simp [hn]

/-- For `G` vanishing on the axes, the sum over the fibre of `(d, m) ↦ d * m` above `n` is the finite
sum over the divisor antidiagonal of `n`. -/
theorem tsum_fiber_mul_eq_sum_divisorsAntidiagonal (G : ℕ × ℕ → α)
    (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0) (n : ℕ) :
    ∑' b : ((fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {n}), G b = ∑ p ∈ n.divisorsAntidiagonal, G p := by
  rcases eq_or_ne n 0 with rfl | hn
  · have : ∀ b : ((fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {0}), G b = 0 := by
      rintro ⟨⟨d, m⟩, hb⟩
      simp only [Set.mem_preimage, Set.mem_singleton_iff, mul_eq_zero] at hb
      exact h0 (d, m) hb
    simp [this]
  · rw [preimage_mul_singleton_eq_divisorsAntidiagonal hn,
      Finset.tsum_subtype' n.divisorsAntidiagonal G]

/-- **Regrouping along divisor antidiagonals**, `HasSum` form. -/
theorem hasSum_sum_divisorsAntidiagonal [CompleteSpace α] (G : ℕ × ℕ → α) (hG : Summable G)
    (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0) :
    HasSum (fun n : ℕ => ∑ p ∈ n.divisorsAntidiagonal, G p) (∑' p, G p) := by
  have := hG.hasSum.tsum_fiberwise (fun p : ℕ × ℕ => p.1 * p.2)
  simpa only [tsum_fiber_mul_eq_sum_divisorsAntidiagonal G h0] using this

/-- **Regrouping along divisor antidiagonals.** -/
theorem tsum_sum_divisorsAntidiagonal [CompleteSpace α] (G : ℕ × ℕ → α) (hG : Summable G)
    (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0) :
    ∑' n : ℕ, ∑ p ∈ n.divisorsAntidiagonal, G p = ∑' p, G p :=
  (hasSum_sum_divisorsAntidiagonal G hG h0).tsum_eq

#min_imports

end Nat
