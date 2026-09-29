import Mathlib

/-!
# Regrouping a double series over `ℕ × ℕ` along divisor antidiagonals

`tsum_sum_divisorsAntidiagonal`: if `G : ℕ × ℕ → ℝ` is summable and vanishes whenever a coordinate is
`0`, then `∑' q, ∑_{(d,m) : dm = q} G (d,m) = ∑' p, G p`, and the left-hand family is a `HasSum`.
This is the mechanism behind Mathlib's `LSeriesHasSum.convolution`, extracted for real-valued `G`.
Depends on nothing in the project; a candidate for Mathlib.
-/

namespace PairSingularSeries

open Finset

/-- The fibre of `(d, m) ↦ d m` over `q ≠ 0` is the divisor antidiagonal of `q`. -/
theorem preimage_mul_eq_divisorsAntidiagonal {q : ℕ} (hq : q ≠ 0) :
    (fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {q} = (q.divisorsAntidiagonal : Set (ℕ × ℕ)) := by
  ext p
  simp [hq]

/-- The fibre sum over `q` equals the finite antidiagonal sum, for `G` vanishing on the axes. -/
theorem tsum_fiber_eq_sum_antidiag (G : ℕ × ℕ → ℝ) (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0)
    (q : ℕ) :
    ∑' b : ((fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {q}), G b = ∑ p ∈ q.divisorsAntidiagonal, G p := by
  rcases eq_or_ne q 0 with rfl | hq
  · -- every term of the fibre over `0` vanishes, and so does the empty antidiagonal sum
    have : ∀ b : ((fun p : ℕ × ℕ => p.1 * p.2) ⁻¹' {0}), G b = 0 := by
      rintro ⟨⟨d, m⟩, hb⟩
      simp only [Set.mem_preimage, Set.mem_singleton_iff, mul_eq_zero] at hb
      exact h0 (d, m) hb
    simp [this]
  · rw [preimage_mul_eq_divisorsAntidiagonal hq, Finset.tsum_subtype' q.divisorsAntidiagonal G]

/-- **Regrouping.** For summable `G` vanishing on the axes,
`HasSum (fun q => ∑_{(d,m) : dm = q} G (d,m)) (∑' p, G p)`. -/
theorem hasSum_sum_divisorsAntidiagonal (G : ℕ × ℕ → ℝ) (hG : Summable G)
    (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0) :
    HasSum (fun q : ℕ => ∑ p ∈ q.divisorsAntidiagonal, G p) (∑' p, G p) := by
  have := hG.hasSum.tsum_fiberwise (fun p : ℕ × ℕ => p.1 * p.2)
  simpa only [tsum_fiber_eq_sum_antidiag G h0] using this

theorem tsum_sum_divisorsAntidiagonal (G : ℕ × ℕ → ℝ) (hG : Summable G)
    (h0 : ∀ p : ℕ × ℕ, p.1 = 0 ∨ p.2 = 0 → G p = 0) :
    ∑' q : ℕ, ∑ p ∈ q.divisorsAntidiagonal, G p = ∑' p, G p :=
  (hasSum_sum_divisorsAntidiagonal G hG h0).tsum_eq

end PairSingularSeries
