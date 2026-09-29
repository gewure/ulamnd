/-
Copyright (c) 2026 Jasper Reichardt. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: Jasper Reichardt
-/
import Mathlib

/-!
# Absolute summability of a multiplicative function supported on squarefree numbers

If `f : ℕ → F` (with `F` a normed field) satisfies `f 0 = 0`, `f 1 = 1`, is multiplicative on coprime
arguments and vanishes at `p ^ k` for every prime `p` and `k ≥ 2`, then `∑ ‖f n‖` converges as soon as
`∑_p ‖f p‖` converges over the primes (`summable_norm_of_squarefree_multiplicative`). The bound is the
classical `∑_{n < N} ‖f n‖ ≤ ∏_{p < N} (1 + ‖f p‖) ≤ exp (∑_p ‖f p‖)`.

Together with `EulerProduct.eulerProduct_tprod`, this gives the Euler product
`∑ n, f n = ∏' p, (1 + f p)` for such `f` from the summability at the primes alone.
-/

open Finset

variable {F : Type*} [NormedField F] (f : ℕ → F) (hf₁ : f 1 = 1)
  (hmul : ∀ {m n : ℕ}, m.Coprime n → f (m * n) = f m * f n)
  (hpow : ∀ {p k : ℕ}, p.Prime → 2 ≤ k → f (p ^ k) = 0)

include hf₁ hmul in
/-- `‖f n‖ = ∏_{p ∣ n} ‖f (p ^ n.factorization p)‖` for `n ≠ 0`. -/
theorem norm_eq_prod_primeFactors_of_multiplicative {n : ℕ} (hn : n ≠ 0) :
    ‖f n‖ = ∏ p ∈ n.primeFactors, ‖f (p ^ n.factorization p)‖ := by
  have hmul' : ∀ x y : ℕ, x.Coprime y → ‖f (x * y)‖ = ‖f x‖ * ‖f y‖ := fun x y hxy => by
    rw [hmul hxy, norm_mul]
  rw [Nat.multiplicative_factorization (fun n => ‖f n‖) hmul' (by simp [hf₁]) hn,
    Nat.prod_factorization_eq_prod_primeFactors]

include hf₁ hmul hpow in
/-- `‖f n‖ ≤ ∏_{p ∣ n} ‖f p‖` for `n ≠ 0`, with equality for squarefree `n`. -/
theorem norm_le_prod_primeFactors_of_multiplicative {n : ℕ} (hn : n ≠ 0) :
    ‖f n‖ ≤ ∏ p ∈ n.primeFactors, ‖f p‖ := by
  rw [norm_eq_prod_primeFactors_of_multiplicative f hf₁ hmul hn]
  refine prod_le_prod₀ (fun _ _ => norm_nonneg _) fun p hp => ?_
  have hpp : p.Prime := Nat.prime_of_mem_primeFactors hp
  have hpos : 0 < n.factorization p :=
    hpp.factorization_pos_of_dvd hn (Nat.dvd_of_mem_primeFactors hp)
  rcases Nat.lt_or_ge (n.factorization p) 2 with hlt | hge
  · rw [show n.factorization p = 1 by omega, pow_one]
  · rw [hpow hpp hge, norm_zero]
    exact norm_nonneg _

include hf₁ hmul hpow in
/-- `f n = 0` unless `n` is squarefree (for `n ≠ 0`). -/
theorem eq_zero_of_not_squarefree_of_multiplicative {n : ℕ} (hn : n ≠ 0) (hsq : ¬ Squarefree n) :
    f n = 0 := by
  rw [Nat.squarefree_iff_factorization_le_one hn] at hsq
  push Not at hsq
  obtain ⟨p, hp⟩ := hsq
  have hpp : p.Prime := by
    by_contra hnp
    rw [Nat.factorization_eq_zero_of_not_prime n hnp] at hp
    omega
  have hmem : p ∈ n.primeFactors :=
    Nat.mem_primeFactors.mpr ⟨hpp, Nat.dvd_of_factorization_pos (by omega), hn⟩
  have h := norm_eq_prod_primeFactors_of_multiplicative f hf₁ hmul hn
  rw [prod_eq_zero hmem (by rw [hpow hpp (by omega), norm_zero])] at h
  exact norm_eq_zero.mp h

include hf₁ hmul hpow in
/-- The partial-sum bound `∑_{n < N} ‖f n‖ ≤ ∏_{p < N, p prime} (1 + ‖f p‖)`. -/
theorem sum_range_norm_le_prod_of_multiplicative (hf₀ : f 0 = 0) (N : ℕ) :
    ∑ n ∈ range N, ‖f n‖ ≤ ∏ p ∈ (range N).filter Nat.Prime, (1 + ‖f p‖) := by
  set S := (range N).filter (fun n => n ≠ 0 ∧ Squarefree n) with hS
  set P := (range N).filter Nat.Prime with hP
  have hstep1 : ∑ n ∈ range N, ‖f n‖ = ∑ n ∈ S, ‖f n‖ := by
    symm
    apply sum_subset (filter_subset _ _)
    intro n hn hnS
    simp only [mem_filter, not_and] at hnS
    by_cases hn0 : n = 0
    · rw [hn0, hf₀, norm_zero]
    · rw [eq_zero_of_not_squarefree_of_multiplicative f hf₁ hmul hpow hn0 (hnS hn hn0), norm_zero]
  have hstep2 : ∑ n ∈ S, ‖f n‖ ≤ ∑ n ∈ S, ∏ p ∈ n.primeFactors, ‖f p‖ :=
    sum_le_sum fun n hn =>
      norm_le_prod_primeFactors_of_multiplicative f hf₁ hmul hpow ((mem_filter.mp hn).2.1)
  have hinj : Set.InjOn Nat.primeFactors (S : Set ℕ) := by
    intro a ha b hb hab
    simp only [hS, coe_filter, Set.mem_ofPred_eq, mem_range] at ha hb
    rw [← Nat.prod_primeFactors_of_squarefree ha.2.2, ← Nat.prod_primeFactors_of_squarefree hb.2.2,
      hab]
  have hsub : S.image Nat.primeFactors ⊆ P.powerset := by
    intro T hT
    obtain ⟨n, hn, rfl⟩ := mem_image.mp hT
    simp only [hS, mem_filter, mem_range] at hn
    rw [mem_powerset]
    intro p hp
    simp only [hP, mem_filter, mem_range]
    exact ⟨lt_of_le_of_lt (Nat.le_of_dvd (Nat.pos_of_ne_zero hn.2.1) (Nat.dvd_of_mem_primeFactors hp))
      hn.1, Nat.prime_of_mem_primeFactors hp⟩
  have hstep3 : ∑ n ∈ S, ∏ p ∈ n.primeFactors, ‖f p‖ ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, ‖f p‖ := by
    calc ∑ n ∈ S, ∏ p ∈ n.primeFactors, ‖f p‖
        = ∑ T ∈ S.image Nat.primeFactors, ∏ p ∈ T, ‖f p‖ :=
          (sum_image (f := fun T => ∏ p ∈ T, ‖f p‖) (g := Nat.primeFactors) hinj).symm
      _ ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, ‖f p‖ :=
          sum_le_sum_of_subset_of_nonneg hsub fun T _ _ => prod_nonneg fun _ _ => norm_nonneg _
  calc ∑ n ∈ range N, ‖f n‖ = ∑ n ∈ S, ‖f n‖ := hstep1
    _ ≤ ∑ n ∈ S, ∏ p ∈ n.primeFactors, ‖f p‖ := hstep2
    _ ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, ‖f p‖ := hstep3
    _ = ∏ p ∈ P, (1 + ‖f p‖) := (prod_one_add P).symm

include hf₁ hmul hpow in
/-- **Absolute summability from summability at the primes.** A function that is multiplicative on
coprime arguments, vanishes at `0` and at proper prime powers, and has `∑_p ‖f p‖ < ∞` over the primes
is absolutely summable. -/
theorem summable_norm_of_squarefree_multiplicative (hf₀ : f 0 = 0)
    (hsum : Summable fun p : Nat.Primes => ‖f p‖) :
    Summable fun n => ‖f n‖ := by
  set g : ℕ → ℝ := fun p => if p.Prime then ‖f p‖ else 0 with hg
  have hg0 : ∀ p, 0 ≤ g p := fun p => by simp only [hg]; split_ifs <;> simp
  have hgs : Summable g := by
    have := (summable_subtype_iff_indicator (s := {p : ℕ | p.Prime})
      (f := fun p : ℕ => ‖f p‖)).mp hsum
    refine this.congr fun p => ?_
    simp only [hg, Set.indicator_apply, Set.mem_ofPred_eq]
  refine summable_of_sum_range_le (c := Real.exp (∑' p, g p)) (fun _ => norm_nonneg _) fun N => ?_
  calc ∑ n ∈ range N, ‖f n‖
      ≤ ∏ p ∈ (range N).filter Nat.Prime, (1 + ‖f p‖) :=
        sum_range_norm_le_prod_of_multiplicative f hf₁ hmul hpow hf₀ N
    _ ≤ ∏ p ∈ (range N).filter Nat.Prime, Real.exp ‖f p‖ := by
        refine prod_le_prod₀ (fun _ _ => by positivity) fun p _ => ?_
        linarith [Real.add_one_le_exp ‖f p‖]
    _ = Real.exp (∑ p ∈ (range N).filter Nat.Prime, ‖f p‖) := (Real.exp_sum _ _).symm
    _ = Real.exp (∑ p ∈ range N, g p) := by rw [sum_filter]
    _ ≤ Real.exp (∑' p, g p) := Real.exp_le_exp.mpr (hgs.sum_le_tsum _ fun p _ => hg0 p)

#min_imports
