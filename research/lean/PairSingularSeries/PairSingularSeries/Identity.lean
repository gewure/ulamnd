import PairSingularSeries.Expansion

/-!
# The weighted identities of paper I (eq. (identity) of Theorem 1, the exact identity of Theorem 5)

Both are instances of ONE statement with a general weight `w : ℕ → ℝ` and a general subtracted constant
`κ`: with `ψ^{w,κ}_d(m) = ∑_{h ≤ H, h ≡ m (d)} w(h) − κ/d` and `Ψ^{w,κ}_d = ∑_{s,s'} ψ^{w,κ}_d(s'−s)`,
  `∑_{h≤H} w(h) (S_f(h)/C² − 1) = ∑_{d≥1} W_f(d) Ψ^{w,κ}_d − (∑_{h≤H} w(h) − κ)`.
The last term is the `q = 1` remainder of the Möbius cancellation; it is `0` for Theorem 1 (`w = 1`,
`κ = H`) and `−H/2` for Theorem 5 (`w = H − h`, `κ = H²/2`) — see ERRATA 43.

This file: the finite part (the `κ`-general versions of L4/L6, coprimality of `d` and `q/d` for
squarefree `q`, `∑_{d∣q} μ(d) = 0` for `q > 1`, and L5).
-/

namespace PairSingularSeries

open Finset Polynomial ArithmeticFunction

variable {f : ℤ[X]}

/-- `ψ^{w,κ}_d(m) = ∑_{h ≤ H, d ∣ h − m} w(h) − κ/d`. -/
noncomputable def psiW (w : ℕ → ℝ) (κ : ℝ) (d : ℕ) (m : ℤ) (H : ℕ) : ℝ :=
  (∑ h ∈ (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - m), w h) - κ / d

/-- `Ψ^{w,κ}_d = ∑_{s,s' roots mod d} ψ^{w,κ}_d(s' − s)`. -/
noncomputable def PsiW (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (d : ℕ) (H : ℕ) : ℝ :=
  ∑ s ∈ roots f d, ∑ s' ∈ roots f d, psiW w κ d ((s' : ℤ) - s) H

/-- L4/L6 with a general weight and constant: `∑_{h≤H} w(h) ν_f(d,h) = ω_f(d)² κ/d + Ψ^{w,κ}_d`. -/
theorem sum_weight_nu_kappa (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (d : ℕ) (hd : 1 ≤ d) (H : ℕ) :
    ∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ) = (omega f d : ℝ) ^ 2 * κ / d + PsiW f w κ d H := by
  rw [sum_weight_nu f d hd H w]
  unfold PsiW psiW
  have hcard : (roots f d).card = omega f d := rfl
  simp only [Finset.sum_sub_distrib, Finset.sum_const, nsmul_eq_mul, hcard]
  ring

/-- `Ψ^{w,κ}_1 = ∑_{h≤H} w(h) − κ`: the `q = 1` remainder. -/
theorem PsiW_one (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) :
    PsiW f w κ 1 H = (∑ h ∈ Icc 1 H, w h) - κ := by
  have h := sum_weight_nu_kappa f w κ 1 le_rfl H
  simp only [nu_one, Nat.cast_one, mul_one, omega_one, one_pow, one_mul, div_one] at h
  linarith

/-- For squarefree `q` and `d ∣ q`, `d` and `q/d` are coprime. -/
theorem coprime_div_of_squarefree {q d : ℕ} (hq : Squarefree q) (hd : d ∣ q) :
    d.Coprime (q / d) := by
  have hmul : d * (q / d) = q := Nat.mul_div_cancel' hd
  have h1 : Nat.gcd d (q / d) * Nat.gcd d (q / d) ∣ q := by
    have := Nat.mul_dvd_mul (Nat.gcd_dvd_left d (q / d)) (Nat.gcd_dvd_right d (q / d))
    rwa [hmul] at this
  exact Nat.isUnit_iff.mp (hq _ h1)

/-- For squarefree `q` and `d ∣ q`: `ω_f(q/d) ω_f(d) = ω_f(q)`. -/
theorem omega_div_mul {q d : ℕ} (hq : Squarefree q) (hd : d ∣ q) :
    omega f (q / d) * omega f d = omega f q := by
  have hq0 : q ≠ 0 := hq.ne_zero
  have hd0 : 0 < d := Nat.pos_of_dvd_of_pos hd (Nat.pos_of_ne_zero hq0)
  have hqd0 : 0 < q / d := Nat.div_pos (Nat.le_of_dvd (Nat.pos_of_ne_zero hq0) hd) hd0
  rw [← omega_mul f hqd0 hd0 (coprime_div_of_squarefree hq hd).symm, Nat.div_mul_cancel hd]

/-- `∑_{d ∣ q} μ(d) = 0` for `q > 1` (from `μ * ζ = 1`). -/
theorem sum_moebius_divisors {q : ℕ} (hq : 1 < q) : ∑ d ∈ q.divisors, (moebius d : ℤ) = 0 := by
  have h := congrArg (fun F : ArithmeticFunction ℤ => F q) moebius_mul_coe_zeta
  simp only [mul_apply, one_apply, Nat.ne_of_gt hq, if_false] at h
  rw [Nat.sum_divisorsAntidiagonal
    (fun a b => (moebius a : ℤ) * ((zeta : ArithmeticFunction ℕ) : ArithmeticFunction ℤ) b)] at h
  rw [← h]
  refine Finset.sum_congr rfl fun d hd => ?_
  have hd' := Nat.mem_divisors.mp hd
  have hne : q / d ≠ 0 := (Nat.div_pos (Nat.le_of_dvd (by omega) hd'.1)
    (Nat.pos_of_dvd_of_pos hd'.1 (by omega))).ne'
  simp [natCoe_apply, zeta_apply, hne]

/-- `∑_{d ∣ q} μ(q/d) = 0` for `q > 1`. -/
theorem sum_moebius_div_divisors {q : ℕ} (hq : 1 < q) :
    ∑ d ∈ q.divisors, (moebius (q / d) : ℤ) = 0 := by
  rw [show ∑ d ∈ q.divisors, (moebius (q / d) : ℤ) = ∑ d ∈ q.divisors, (moebius d : ℤ) from
    Nat.sum_div_divisors q _]
  exact sum_moebius_divisors hq

/-- **L5, general weight.** For squarefree `q > 1`:
`∑_{h≤H} w(h) c^f_q(h) = ∑_{d ∣ q} d μ(q/d) ω_f(q/d)² Ψ^{w,κ}_d`. -/
theorem sum_weight_cf (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) {q : ℕ} (hq : Squarefree q) (hq1 : 1 < q)
    (H : ℕ) :
    ∑ h ∈ Icc 1 H, w h * (cf f q h : ℝ) =
      ∑ d ∈ q.divisors, (d : ℝ) * (moebius (q / d) : ℝ) * (omega f (q / d) : ℝ) ^ 2 *
        PsiW f w κ d H := by
  -- expand `c^f_q(h)`, swap the finite sums, apply the κ-identity at each `d`
  have h1 : ∀ h : ℕ, w h * (cf f q h : ℝ) =
      ∑ d ∈ q.divisors, (d : ℝ) * (moebius (q / d) : ℝ) * (omega f (q / d) : ℝ) ^ 2 *
        (w h * (nu f d h : ℝ)) := by
    intro h
    unfold cf
    push_cast
    rw [Finset.mul_sum]
    refine Finset.sum_congr rfl fun d _ => ?_
    ring
  simp_rw [h1]
  rw [Finset.sum_comm]
  have h2 : ∀ d ∈ q.divisors, ∑ h ∈ Icc 1 H, (d : ℝ) * (moebius (q / d) : ℝ) *
      (omega f (q / d) : ℝ) ^ 2 * (w h * (nu f d h : ℝ)) =
      (d : ℝ) * (moebius (q / d) : ℝ) * (omega f (q / d) : ℝ) ^ 2 *
        ((omega f d : ℝ) ^ 2 * κ / d + PsiW f w κ d H) := by
    intro d hd
    have hd1 : 1 ≤ d := Nat.pos_of_mem_divisors hd
    rw [← Finset.mul_sum, sum_weight_nu_kappa f w κ d hd1 H]
  rw [Finset.sum_congr rfl h2]
  -- the κ-part is `κ ω(q)² ∑_{d∣q} μ(q/d) = 0`
  have hκ : ∑ d ∈ q.divisors, (d : ℝ) * (moebius (q / d) : ℝ) * (omega f (q / d) : ℝ) ^ 2 *
      ((omega f d : ℝ) ^ 2 * κ / d) = 0 := by
    have : ∀ d ∈ q.divisors, (d : ℝ) * (moebius (q / d) : ℝ) * (omega f (q / d) : ℝ) ^ 2 *
        ((omega f d : ℝ) ^ 2 * κ / d) = κ * (omega f q : ℝ) ^ 2 * (moebius (q / d) : ℝ) := by
      intro d hd
      have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (Nat.pos_of_mem_divisors hd).ne'
      have hω := omega_div_mul (f := f) hq (Nat.dvd_of_mem_divisors hd)
      have hω' : (omega f (q / d) : ℝ) * omega f d = omega f q := by exact_mod_cast hω
      field_simp
      rw [← hω']
      ring
    rw [Finset.sum_congr rfl this, ← Finset.mul_sum]
    have := sum_moebius_div_divisors hq1
    have h' : ∑ d ∈ q.divisors, (moebius (q / d) : ℝ) = 0 := by exact_mod_cast this
    rw [h', mul_zero]
  simp only [mul_add, Finset.sum_add_distrib, hκ, zero_add]

end PairSingularSeries
