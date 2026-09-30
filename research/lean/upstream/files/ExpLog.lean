/-
Copyright (c) 2024 Michael Stoll. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: Michael Stoll
-/
module

import Mathlib.Analysis.Normed.Module.FiniteDimension
public import Mathlib.Analysis.SpecialFunctions.Complex.LogDeriv
import Mathlib.LinearAlgebra.Complex.FiniteDimensional
public import Mathlib.NumberTheory.EulerProduct.Basic

/-!
# Logarithms of Euler Products

We consider `f : ℕ →*₀ ℂ` and show that `exp (∑ p in Primes, log (1 - f p)⁻¹) = ∑ n : ℕ, f n`
under suitable conditions on `f`. This can be seen as a logarithmic version of the
Euler product for `f`.
-/

public section

open Complex

open Topology in
/-- If `f : α → ℂ` is summable, then so is `n ↦ log (1 - f n)`. -/
lemma Summable.clog_one_sub {α : Type*} {f : α → ℂ} (hsum : Summable f) :
    Summable fun n ↦ log (1 - f n) := by
  have hg : DifferentiableAt ℂ (fun z ↦ log (1 - z)) 0 := by
    have : 1 - 0 ∈ slitPlane := (sub_zero (1 : ℂ)).symm ▸ one_mem_slitPlane
    fun_prop
  have : (fun z ↦ log (1 - z)) =O[𝓝 0] id := by
    simpa only [sub_zero, log_one] using! hg.isBigO_sub
  exact this.comp_summable hsum

namespace EulerProduct

set_option backward.isDefEq.respectTransparency false in
/-- A variant of the Euler Product formula in terms of the exponential of a sum of logarithms. -/
theorem exp_tsum_primes_log_eq_tsum {f : ℕ →*₀ ℂ} (hsum : Summable (‖f ·‖)) :
    exp (∑' p : Nat.Primes, -log (1 - f p)) = ∑' n : ℕ, f n := by
  have hs {p : ℕ} (hp : 1 < p) : ‖f p‖ < 1 := hsum.of_norm.norm_lt_one (f := f.toMonoidHom) hp
  have hp (p : Nat.Primes) : 1 - f p ≠ 0 :=
    fun h ↦ (norm_one (α := ℂ) ▸ (sub_eq_zero.mp h) ▸ hs p.prop.one_lt).false
  have H := hsum.of_norm.clog_one_sub.neg.subtype Nat.Prime |>.hasSum.cexp.tprod_eq
  simp only [Function.comp_apply, exp_neg, exp_log (hp _)] at H
  exact H.symm.trans <| eulerProduct_completely_multiplicative_tprod hsum

end EulerProduct

/-!
### Absolute summability from the primes

The Euler product theorems of `EulerProduct.Basic` assume `Summable (‖f ·‖)`. For a multiplicative
`f`
this follows from data at the prime powers alone, via the finite Euler relation for the smooth
numbers
and `∏ (1 + a_p) ≤ exp ∑ a_p`.
-/

namespace EulerProduct

open Finset

/-- **Absolute summability from the primes.** Let `f : ℕ → F`, `F` a normed field, with `f 1 = 1`
and
`f` multiplicative on coprime arguments. If `∑_n ‖f (p ^ n)‖` converges for every prime `p` and
`∑_p ∑_{n ≥ 1} ‖f (p ^ n)‖` converges over the primes, then `∑_n ‖f n‖` converges. Together with
`eulerProduct_tprod` this gives the Euler product from prime-power data alone. -/
theorem summable_norm_of_summable_primes {F : Type*} [NormedField F] {f : ℕ → F}
    (hf₁ : f 1 = 1) (hmul : ∀ {m n : ℕ}, m.Coprime n → f (m * n) = f m * f n)
    (hsum : ∀ {p : ℕ}, p.Prime → Summable (fun n : ℕ ↦ ‖f (p ^ n)‖))
    (hp : Summable (fun p : Nat.Primes ↦ ∑' n : ℕ, ‖f (p ^ (n + 1))‖)) :
    Summable (fun n ↦ ‖f n‖) := by
  set g : ℕ → ℝ := fun n ↦ ‖f n‖ with hg
  have hg₁ : g 1 = 1 := by simp [hg, hf₁]
  have hgmul : ∀ {m n : ℕ}, m.Coprime n → g (m * n) = g m * g n := fun h ↦ by
    simp [hg, hmul h, norm_mul]
  have hgsum : ∀ {p : ℕ}, p.Prime → Summable (fun n : ℕ ↦ ‖g (p ^ n)‖) := fun hp' ↦ by
    simpa [hg, Real.norm_eq_abs, abs_norm] using hsum hp'
  have hg0 : ∀ n, 0 ≤ g n := fun n ↦ norm_nonneg _
  -- the prime-power tails, as a function on `ℕ` supported on the primes
  set a : ℕ → ℝ := fun p ↦ if p.Prime then ∑' n : ℕ, g (p ^ (n + 1)) else 0 with ha
  have ha0 : ∀ p, 0 ≤ a p := fun p ↦ by
    simp only [ha]; split_ifs
    · exact tsum_nonneg fun _ ↦ hg0 _
    · exact le_rfl
  have hasum : Summable a := by
    have := (summable_subtype_iff_indicator (s := {p : ℕ | p.Prime})
      (f := fun p : ℕ ↦ ∑' n : ℕ, g (p ^ (n + 1)))).mp hp
    refine this.congr fun p ↦ ?_
    simp only [ha, Set.indicator_apply, Set.mem_ofPred_eq]
  refine summable_of_sum_range_le (c := g 0 + Real.exp (∑' p, a p)) hg0 fun N ↦ ?_
  obtain ⟨-, hH⟩ := summable_and_hasSum_smoothNumbers_prod_primesBelow_tsum hg₁ hgmul hgsum N
  have hH' : HasSum ((N.smoothNumbers : Set ℕ).indicator g)
      (∏ p ∈ N.primesBelow, ∑' n : ℕ, g (p ^ n)) :=
    hasSum_subtype_iff_indicator.mp hH
  -- (1) `∑_{n<N} g n ≤ g 0 + ∑' (indicator)`
  have h1 : ∑ n ∈ range N, g n ≤ g 0 + ∏ p ∈ N.primesBelow, ∑' n : ℕ, g (p ^ n) := by
    rcases Nat.eq_zero_or_pos N with rfl | hN
    · rw [range_zero, sum_empty]
      exact add_nonneg (hg0 0) (prod_nonneg fun p _ ↦ tsum_nonneg fun _ ↦ hg0 _)
    rw [sum_range_eq_add_Ico g hN, ← hH'.tsum_eq]
    gcongr
    calc ∑ n ∈ Ico 1 N, g n = ∑ n ∈ Ico 1 N, (N.smoothNumbers : Set ℕ).indicator g n := by
          refine sum_congr rfl fun n hn ↦ ?_
          have hn' := mem_Ico.mp hn
          rw [Set.indicator_of_mem (Nat.mem_smoothNumbers_of_lt hn'.1 hn'.2)]
      _ ≤ ∑' n, (N.smoothNumbers : Set ℕ).indicator g n :=
          hH'.summable.sum_le_tsum _ fun n _ ↦ by
            by_cases hn : n ∈ (N.smoothNumbers : Set ℕ)
            · rw [Set.indicator_of_mem hn]; exact hg0 n
            · rw [Set.indicator_of_notMem hn]
  -- (2) each Euler factor is `1 + a p ≤ exp (a p)`
  have h2 : ∏ p ∈ N.primesBelow, ∑' n : ℕ, g (p ^ n) ≤ Real.exp (∑ p ∈ N.primesBelow, a p) := by
    rw [Real.exp_sum]
    refine prod_le_prod₀ (fun p _ ↦ tsum_nonneg fun _ ↦ hg0 _) fun p hp' ↦ ?_
    have hpp : p.Prime := Nat.prime_of_mem_primesBelow hp'
    have hs : Summable (fun n : ℕ ↦ g (p ^ n)) := (hgsum hpp).of_norm
    rw [hs.tsum_eq_zero_add, pow_zero, hg₁]
    have : a p = ∑' n : ℕ, g (p ^ (n + 1)) := by simp [ha, hpp]
    rw [← this]
    linarith [Real.add_one_le_exp (a p)]
  -- (3) the finite sum over the primes below `N` is at most the full sum
  have h3 : ∑ p ∈ N.primesBelow, a p ≤ ∑' p, a p := by
    calc ∑ p ∈ N.primesBelow, a p ≤ ∑ p ∈ range N, a p :=
          sum_le_sum_of_subset_of_nonneg (fun p hp' ↦ mem_range.mpr (Nat.lt_of_mem_primesBelow hp'))
            fun p _ _ ↦ ha0 p
      _ ≤ ∑' p, a p := hasum.sum_le_tsum _ fun p _ ↦ ha0 p
  calc ∑ n ∈ range N, g n ≤ g 0 + ∏ p ∈ N.primesBelow, ∑' n : ℕ, g (p ^ n) := h1
    _ ≤ g 0 + Real.exp (∑ p ∈ N.primesBelow, a p) := by gcongr
    _ ≤ g 0 + Real.exp (∑' p, a p) := by gcongr

end EulerProduct
