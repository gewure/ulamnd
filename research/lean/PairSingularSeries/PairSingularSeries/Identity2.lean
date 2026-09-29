import PairSingularSeries.Identity

/-!
# The weighted identity, part 2: the product terms and their summability

* `Aterm d = μ(d)² d b(d) Ψ^{w,κ}_d`, `Bterm m = μ(m) b(m) ω(m)²`, `Gterm (d,m) = Aterm d · [coprime d m] · Bterm m`.
* `sum_antidiag_Gterm`: for every `q`,
  `∑_{(d,m) : dm = q} Gterm (d,m) = ∑_{h≤H} w(h) F'_h(q) + [q = 1] Ψ^{w,κ}_1`, where `F'_h(q) = F_h(q)` for `q ≥ 2`
  and `0` otherwise.
* `nu_ne_zero_dvd`: for squarefree `d` and `h ≠ 0`, `ν_f(d,h) ≠ 0 → d ∣ N_h` — so `d ↦ ν_f(d,h)` is finitely
  supported on squarefree `d`.
* `summable_abs_Bterm`, `summable_abs_Aterm`, `summable_Gterm`.
-/

namespace PairSingularSeries

open Finset Polynomial ArithmeticFunction

variable {f : ℤ[X]}

/-- `F'_h(q) = F_h(q)` for `q ≥ 2`, `0` for `q ≤ 1`. -/
noncomputable def Fp (f : ℤ[X]) (h : ℤ) (q : ℕ) : ℝ := if 2 ≤ q then Fterm f h q else 0

/-- `A(d) = μ(d)² d b(d) Ψ^{w,κ}_d`. -/
noncomputable def Aterm (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) (d : ℕ) : ℝ :=
  ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * PsiW f w κ d H

/-- `B(m) = μ(m) b(m) ω_f(m)²`. -/
noncomputable def Bterm (f : ℤ[X]) (m : ℕ) : ℝ :=
  ((moebius m : ℤ) : ℝ) * bfun f m * (omega f m : ℝ) ^ 2

/-- `G(d, m) = A(d) · [coprime d m] · B(m)`. -/
noncomputable def Gterm (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) (p : ℕ × ℕ) : ℝ :=
  Aterm f w κ H p.1 * (if p.1.Coprime p.2 then Bterm f p.2 else 0)

theorem moebius_sq_of_squarefree {q : ℕ} (hq : Squarefree q) : ((moebius q : ℤ) : ℝ) ^ 2 = 1 := by
  rw [moebius_apply_of_squarefree hq]
  push_cast
  rw [← pow_mul, mul_comm, pow_mul]
  simp

theorem Fterm_eq_zero_of_not_squarefree (h : ℤ) {q : ℕ} (hq : ¬ Squarefree q) : Fterm f h q = 0 := by
  unfold Fterm
  rw [moebius_eq_zero_of_not_squarefree hq]
  simp

theorem Bterm_eq_zero_of_not_squarefree {m : ℕ} (hm : ¬ Squarefree m) : Bterm f m = 0 := by
  unfold Bterm
  rw [moebius_eq_zero_of_not_squarefree hm]
  simp

theorem Aterm_eq_zero_of_not_squarefree (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) {d : ℕ} (hd : ¬ Squarefree d) :
    Aterm f w κ H d = 0 := by
  unfold Aterm
  rw [moebius_eq_zero_of_not_squarefree hd]
  simp

/-- **The antidiagonal identity.** For every `q`,
`∑_{(d,m) ∈ antidiag q} G(d,m) = ∑_{h≤H} w(h) F'_h(q) + [q = 1] Ψ^{w,κ}_1`. -/
theorem sum_antidiag_Gterm (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) (q : ℕ) :
    ∑ p ∈ q.divisorsAntidiagonal, Gterm f w κ H p =
      ∑ h ∈ Icc 1 H, w h * Fp f h q + (if q = 1 then PsiW f w κ 1 H else 0) := by
  rcases Nat.lt_or_ge q 2 with hq | hq
  · interval_cases q
    · -- q = 0
      simp [Fp]
    · -- q = 1
      simp [Fp, Gterm, Aterm, Bterm, bfun_one, omega_one]
  · -- q ≥ 2
    have hq1 : q ≠ 1 := by omega
    have hq0 : q ≠ 0 := by omega
    simp only [hq1, if_false, add_zero]
    have hFp : ∀ h, Fp f h q = Fterm f h q := fun h => by simp [Fp, hq]
    simp_rw [hFp]
    by_cases hsq : Squarefree q
    · -- squarefree `q ≥ 2`: both sides are the divisor sum
      rw [Nat.sum_divisorsAntidiagonal (fun a b => Gterm f w κ H (a, b))]
      have hrhs : ∑ h ∈ Icc 1 H, w h * Fterm f h q =
          ((moebius q : ℤ) : ℝ) ^ 2 * bfun f q * ∑ h ∈ Icc 1 H, w h * (cf f q h : ℝ) := by
        rw [Finset.mul_sum]
        refine Finset.sum_congr rfl fun h _ => ?_
        unfold Fterm
        ring
      rw [hrhs, sum_weight_cf f w κ hsq (by omega) H, moebius_sq_of_squarefree hsq, one_mul,
        Finset.mul_sum]
      refine Finset.sum_congr rfl fun d hd => ?_
      have hdq : d ∣ q := Nat.dvd_of_mem_divisors hd
      have hcop : d.Coprime (q / d) := coprime_div_of_squarefree hsq hdq
      have hd0 : d ≠ 0 := (Nat.pos_of_mem_divisors hd).ne'
      have hqd0 : q / d ≠ 0 := (Nat.div_pos (Nat.le_of_dvd (by omega) hdq) (by omega)).ne'
      have hsd : Squarefree d := hsq.squarefree_of_dvd hdq
      have hb : bfun f q = bfun f d * bfun f (q / d) := by
        rw [← bfun_mul f hd0 hqd0 hcop, Nat.mul_div_cancel' hdq]
      simp only [Gterm, Aterm, Bterm]
      rw [if_pos hcop, hb, moebius_sq_of_squarefree hsd]
      ring
    · -- non-squarefree `q ≥ 2`: both sides vanish
      have hrhs : ∑ h ∈ Icc 1 H, w h * Fterm f h q = 0 := by
        refine Finset.sum_eq_zero fun h _ => ?_
        rw [Fterm_eq_zero_of_not_squarefree h hsq, mul_zero]
      rw [hrhs]
      refine Finset.sum_eq_zero fun p hp => ?_
      obtain ⟨hpq, -⟩ := Nat.mem_divisorsAntidiagonal.mp hp
      simp only [Gterm]
      by_cases hd : Squarefree p.1
      · by_cases hm : Squarefree p.2
        · by_cases hc : p.1.Coprime p.2
          · exfalso
            apply hsq
            rw [← hpq]
            exact (Nat.squarefree_mul_iff.mpr ⟨hc, hd, hm⟩)
          · simp [hc]
        · simp [Bterm_eq_zero_of_not_squarefree hm]
      · simp [Aterm_eq_zero_of_not_squarefree w κ H hd]

/-- For a prime `p ∣ d` with `d` squarefree, `ν_f(d,h) ≠ 0 → ν_f(p,h) ≠ 0` (multiplicativity). -/
theorem nu_prime_ne_zero_of_dvd (h : ℤ) {d p : ℕ} (hd : Squarefree d) (hp : p.Prime) (hpd : p ∣ d)
    (hne : nu f d h ≠ 0) : nu f p h ≠ 0 := by
  have hd0 : d ≠ 0 := hd.ne_zero
  have hcop : p.Coprime (d / p) := coprime_div_of_squarefree hd hpd
  have hmul : nu f d h = nu f p h * nu f (d / p) h := by
    rw [← nu_mul f h hp.pos (Nat.div_pos (Nat.le_of_dvd (Nat.pos_of_ne_zero hd0) hpd) hp.pos) hcop,
      Nat.mul_div_cancel' hpd]
  intro h0
  rw [hmul, h0, zero_mul] at hne
  exact hne rfl

/-- **Finite support.** For squarefree `d` and `h ≠ 0`, if `ν_f(d,h) ≠ 0` then `d ∣ N_h`
(`N_h` from the resultant condition), in particular `d ≤ |N_h|`. -/
theorem nu_ne_zero_dvd (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    ∃ N : ℕ, N ≠ 0 ∧ ∀ d : ℕ, Squarefree d → nu f d h ≠ 0 → d ∣ N := by
  obtain ⟨N, hN0, hN⟩ := hf.resultant h hh
  refine ⟨N.natAbs, Int.natAbs_ne_zero.mpr hN0, fun d hd hne => ?_⟩
  rw [← Nat.prod_primeFactors_of_squarefree hd]
  apply Finset.prod_primes_dvd
  · intro p hp
    exact (Nat.prime_of_mem_primeFactors hp).prime
  · intro p hp
    have hpp := Nat.prime_of_mem_primeFactors hp
    have hpd := Nat.dvd_of_mem_primeFactors hp
    have := hN p hpp (nu_prime_ne_zero_of_dvd h hd hpp hpd hne)
    exact Int.natCast_dvd.mp (by simpa using this)

end PairSingularSeries
