import Mathlib

/-!
# A multiplicative function vanishing off squarefree numbers is absolutely summable if it is
summable at the primes

`summable_abs_of_squarefree_mult`: if `F : ℕ → ℝ` satisfies `F 0 = 0`, `F 1 = 1`, is multiplicative
on coprime arguments, vanishes at `p^k` for `k ≥ 2`, and `∑_p |F p|` converges over the primes, then
`∑_q |F q|` converges. The bound is the classical
`∑_{q<N} |F q| ≤ ∏_{p<N} (1 + |F p|) ≤ exp ∑_p |F p|`.
This file depends on nothing in the project and is a candidate for Mathlib.
-/

namespace PairSingularSeries

open Finset

section

variable (F : ℕ → ℝ) (h0 : F 0 = 0) (h1 : F 1 = 1)
  (hmul : ∀ {m n : ℕ}, m.Coprime n → F (m * n) = F m * F n)
  (hpow : ∀ {p k : ℕ}, p.Prime → 2 ≤ k → F (p ^ k) = 0)

include h1 hmul in
/-- `|F q| = ∏_{p ∣ q} |F (p^{v_p(q)})|` for `q ≠ 0`. -/
theorem abs_eq_prod_primeFactors {q : ℕ} (hq : q ≠ 0) :
    |F q| = ∏ p ∈ q.primeFactors, |F (p ^ q.factorization p)| := by
  have hmul' : ∀ x y : ℕ, x.Coprime y → |F (x * y)| = |F x| * |F y| := by
    intro x y hxy
    rw [hmul hxy, abs_mul]
  have := Nat.multiplicative_factorization (fun n => |F n|) hmul' (by simp [h1]) hq
  rw [this, Nat.prod_factorization_eq_prod_primeFactors]

include h1 hmul hpow in
/-- `|F q| ≤ ∏_{p ∣ q} |F p|` for `q ≠ 0` (with equality for squarefree `q`). -/
theorem abs_le_prod_primeFactors {q : ℕ} (hq : q ≠ 0) :
    |F q| ≤ ∏ p ∈ q.primeFactors, |F p| := by
  rw [abs_eq_prod_primeFactors F h1 hmul hq]
  apply prod_le_prod₀ (fun _ _ => abs_nonneg _)
  intro p hp
  have hpp : p.Prime := Nat.prime_of_mem_primeFactors hp
  have hpos : 0 < q.factorization p :=
    hpp.factorization_pos_of_dvd hq (Nat.dvd_of_mem_primeFactors hp)
  rcases Nat.lt_or_ge (q.factorization p) 2 with hlt | hge
  · have : q.factorization p = 1 := by omega
    rw [this, pow_one]
  · rw [hpow hpp hge, abs_zero]
    exact abs_nonneg _

include h1 hmul hpow in
/-- `F q = 0` unless `q` is squarefree (for `q ≠ 0`). -/
theorem eq_zero_of_not_squarefree {q : ℕ} (hq : q ≠ 0) (hsq : ¬ Squarefree q) : F q = 0 := by
  rw [Nat.squarefree_iff_factorization_le_one hq] at hsq
  push Not at hsq
  obtain ⟨p, hp⟩ := hsq
  have hpp : p.Prime := by
    by_contra hnp
    rw [Nat.factorization_eq_zero_of_not_prime q hnp] at hp
    omega
  have hmem : p ∈ q.primeFactors := by
    rw [Nat.mem_primeFactors]
    exact ⟨hpp, Nat.dvd_of_factorization_pos (by omega), hq⟩
  have habs := abs_eq_prod_primeFactors F h1 hmul hq
  rw [Finset.prod_eq_zero hmem (by rw [hpow hpp (by omega), abs_zero])] at habs
  exact abs_eq_zero.mp habs

include h0 h1 hmul hpow in
/-- The partial-sum bound `∑_{q < N} |F q| ≤ ∏_{p < N, p prime} (1 + |F p|)`. -/
theorem sum_range_abs_le_prod (N : ℕ) :
    ∑ q ∈ range N, |F q| ≤ ∏ p ∈ (range N).filter Nat.Prime, (1 + |F p|) := by
  set S := (range N).filter (fun q => q ≠ 0 ∧ Squarefree q) with hS
  set P := (range N).filter Nat.Prime with hP
  -- (1) only squarefree `q ≥ 1` contribute
  have hstep1 : ∑ q ∈ range N, |F q| = ∑ q ∈ S, |F q| := by
    symm
    apply Finset.sum_subset (Finset.filter_subset _ _)
    intro q hq hqS
    simp only [hS, mem_filter, not_and] at hqS
    by_cases hq0 : q = 0
    · rw [hq0, h0, abs_zero]
    · rw [eq_zero_of_not_squarefree F h1 hmul hpow hq0 (hqS hq hq0), abs_zero]
  -- (2) each term is at most the product over its prime factors
  have hstep2 : ∑ q ∈ S, |F q| ≤ ∑ q ∈ S, ∏ p ∈ q.primeFactors, |F p| :=
    Finset.sum_le_sum fun q hq =>
      abs_le_prod_primeFactors F h1 hmul hpow ((Finset.mem_filter.mp hq).2.1)
  -- (3) `q ↦ q.primeFactors` is injective on squarefree `q`, and lands in the subsets of `P`
  have hinj : Set.InjOn Nat.primeFactors (S : Set ℕ) := by
    intro a ha b hb hab
    simp only [hS, coe_filter, Set.mem_setOf_eq, mem_range] at ha hb
    rw [← Nat.prod_primeFactors_of_squarefree ha.2.2, ← Nat.prod_primeFactors_of_squarefree hb.2.2,
      hab]
  have hsub : S.image Nat.primeFactors ⊆ P.powerset := by
    intro T hT
    obtain ⟨q, hq, rfl⟩ := Finset.mem_image.mp hT
    simp only [hS, mem_filter, mem_range] at hq
    rw [Finset.mem_powerset]
    intro p hp
    have hpp := Nat.prime_of_mem_primeFactors hp
    have hpq := Nat.dvd_of_mem_primeFactors hp
    simp only [hP, mem_filter, mem_range]
    exact ⟨lt_of_le_of_lt (Nat.le_of_dvd (Nat.pos_of_ne_zero hq.2.1) hpq) hq.1, hpp⟩
  have hstep3 : ∑ q ∈ S, ∏ p ∈ q.primeFactors, |F p| ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, |F p| := by
    calc ∑ q ∈ S, ∏ p ∈ q.primeFactors, |F p|
        = ∑ T ∈ S.image Nat.primeFactors, ∏ p ∈ T, |F p| :=
          (Finset.sum_image (f := fun T => ∏ p ∈ T, |F p|) (g := Nat.primeFactors) hinj).symm
      _ ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, |F p| :=
          sum_le_sum_of_subset_of_nonneg hsub
            fun T _ _ => Finset.prod_nonneg fun _ _ => abs_nonneg _
  -- (4) expand the product
  have hstep4 : ∑ T ∈ P.powerset, ∏ p ∈ T, |F p| = ∏ p ∈ P, (1 + |F p|) :=
    (Finset.prod_one_add P).symm
  calc ∑ q ∈ range N, |F q| = ∑ q ∈ S, |F q| := hstep1
    _ ≤ ∑ q ∈ S, ∏ p ∈ q.primeFactors, |F p| := hstep2
    _ ≤ ∑ T ∈ P.powerset, ∏ p ∈ T, |F p| := hstep3
    _ = ∏ p ∈ P, (1 + |F p|) := hstep4

include h0 h1 hmul hpow in
/-- **Absolute summability from summability at the primes**, for a multiplicative function vanishing
off squarefree numbers. -/
theorem summable_abs_of_squarefree_mult
    (hsum : Summable (fun p : ℕ => if p.Prime then |F p| else 0)) :
    Summable (fun q => |F q|) := by
  set g : ℕ → ℝ := fun p => if p.Prime then |F p| else 0 with hg
  have hg0 : ∀ p, 0 ≤ g p := fun p => by
    simp only [hg]; split_ifs <;> simp [abs_nonneg]
  refine summable_of_sum_range_le (c := Real.exp (∑' p, g p)) (fun _ => abs_nonneg _) fun N => ?_
  calc ∑ q ∈ range N, |F q|
      ≤ ∏ p ∈ (range N).filter Nat.Prime, (1 + |F p|) := sum_range_abs_le_prod F h0 h1 hmul hpow N
    _ ≤ ∏ p ∈ (range N).filter Nat.Prime, Real.exp |F p| := by
        apply prod_le_prod₀ (fun _ _ => by positivity)
        intro p _
        linarith [Real.add_one_le_exp |F p|]
    _ = Real.exp (∑ p ∈ (range N).filter Nat.Prime, |F p|) := (Real.exp_sum _ _).symm
    _ = Real.exp (∑ p ∈ range N, g p) := by rw [Finset.sum_filter]
    _ ≤ Real.exp (∑' p, g p) :=
        Real.exp_le_exp.mpr (Summable.sum_le_tsum _ (fun p _ => hg0 p) hsum)

end

end PairSingularSeries
