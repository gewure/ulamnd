import PairSingularSeries.Identity3
import PairSingularSeries.Regroup

/-!
# The weighted identity, part 4: the assembly

`weighted_identity`: for admissible `f`, any weight `w`, any constant `κ` and any `H`,
  `∑_{h≤H} w(h) (∑_q F_h(q) − 1) = ∑_d W_f(d) Ψ^{w,κ}_d − Ψ^{w,κ}_1`.
Since `S_f(h) = C(f)² ∑_q F_h(q)` (Theorem 1), this is the common core of eq. (identity) of Theorem 1
(`w = 1`, `κ = H`, where `Ψ^{w,κ}_1 = 0`) and of the exact identity of Theorem 5 (`w = H − h`,
`κ = H²/2`, where `Ψ^{w,κ}_1 = −H/2`; ERRATA 43).
-/

namespace PairSingularSeries

open Finset Polynomial ArithmeticFunction Filter Topology

variable {f : ℤ[X]}

/-- `Bd d m = [coprime d m] B(m)`, the summand of the Euler factor product `∏_{p ∤ d}`. -/
noncomputable def Bd (f : ℤ[X]) (d m : ℕ) : ℝ := if d.Coprime m then Bterm f m else 0

theorem Bd_zero (f : ℤ[X]) (d : ℕ) : Bd f d 0 = 0 := by simp [Bd, Bterm_zero]
theorem Bd_one (f : ℤ[X]) (d : ℕ) : Bd f d 1 = 1 := by simp [Bd, Bterm_one]

theorem Bd_mul (f : ℤ[X]) (d : ℕ) {m n : ℕ} (hmn : m.Coprime n) :
    Bd f d (m * n) = Bd f d m * Bd f d n := by
  unfold Bd
  by_cases h1 : d.Coprime m
  · by_cases h2 : d.Coprime n
    · rw [if_pos (Nat.Coprime.mul_right h1 h2), if_pos h1, if_pos h2, Bterm_mul f hmn]
    · have hnot : ¬ d.Coprime (m * n) := fun h => by
        rw [Nat.coprime_mul_iff_right] at h
        exact h2 h.2
      rw [if_neg hnot, if_neg h2, mul_zero]
  · have hnot : ¬ d.Coprime (m * n) := fun h => by
      rw [Nat.coprime_mul_iff_right] at h
      exact h1 h.1
    rw [if_neg hnot, if_neg h1, zero_mul]

theorem Bd_prime_pow (f : ℤ[X]) (d : ℕ) {p k : ℕ} (hp : p.Prime) (hk : 2 ≤ k) :
    Bd f d (p ^ k) = 0 := by
  unfold Bd
  simp [Bterm_prime_pow f hp hk]

theorem abs_Bd_le (f : ℤ[X]) (d m : ℕ) : |Bd f d m| ≤ |Bterm f m| := by
  unfold Bd
  split_ifs
  · exact le_rfl
  · rw [abs_zero]; exact abs_nonneg _

theorem summable_abs_Bd (hf : Admissible f) (d : ℕ) : Summable (fun m => |Bd f d m|) :=
  (summable_abs_Bterm hf).of_nonneg_of_le (fun _ => abs_nonneg _) (abs_Bd_le f d)

/-- `B(p) = P_p − 1` at a prime. -/
theorem Bterm_prime (f : ℤ[X]) {p : ℕ} (hp : p.Prime) : Bterm f p = Pfac f p - 1 := by
  unfold Bterm Pfac
  rw [moebius_apply_prime hp, bfun_prime f hp]
  push_cast
  ring

/-- `∑_e Bd d (p^e) = 1 + [p ∤ d] (P_p − 1) = if p ∣ d then 1 else P_p`. -/
theorem tsum_Bd_pow (f : ℤ[X]) (d : ℕ) {p : ℕ} (hp : p.Prime) :
    ∑' e : ℕ, Bd f d (p ^ e) = if p ∣ d then 1 else Pfac f p := by
  rw [tsum_eq_sum (s := range 2)]
  · rw [Finset.sum_range_succ, Finset.sum_range_one, pow_zero, pow_one, Bd_one]
    unfold Bd
    have hcop : d.Coprime p ↔ ¬ p ∣ d := by
      rw [Nat.coprime_comm]
      exact hp.coprime_iff_not_dvd
    by_cases hpd : p ∣ d
    · simp [hpd, hcop]
    · simp [hpd, hcop, Bterm_prime f hp]
  · intro e he
    simp only [mem_range, not_lt] at he
    exact Bd_prime_pow f d hp he

/-- **Euler product for the `d`-restricted series**:
`∑_m [coprime d m] B(m) = ∏_{p ∤ d} P_p` (with the factor `1` at `p ∣ d`). -/
theorem tsum_Bd (hf : Admissible f) (d : ℕ) :
    ∑' m, Bd f d m = ∏' p : Nat.Primes, (if (p : ℕ) ∣ d then 1 else Pfac f p) := by
  have hnorm : Summable (fun m => ‖Bd f d m‖) := by
    simpa only [Real.norm_eq_abs] using summable_abs_Bd hf d
  rw [← EulerProduct.eulerProduct_tprod (f := Bd f d) (Bd_one f d)
    (fun {m n} hmn => Bd_mul f d hmn) hnorm (Bd_zero f d)]
  exact tprod_congr fun p => tsum_Bd_pow f d p.prop

/-- `A(d) · ∑_m Bd d m = W_f(d) Ψ^{w,κ}_d`. -/
theorem Aterm_mul_tsum_Bd (hf : Admissible f) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) (d : ℕ) :
    Aterm f w κ H d * ∑' m, Bd f d m = W f d * PsiW f w κ d H := by
  rw [tsum_Bd hf d]
  unfold Aterm W
  ring

/-- `∑_q F_h(q) − 1 = ∑_q F'_h(q)` for `h ≠ 0`. -/
theorem tsum_Fterm_sub_one (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    (∑' q, Fterm f h q) - 1 = ∑' q, Fp f h q := by
  have hF : Summable (Fterm f h) := (summable_abs_Fterm hf h hh).of_abs
  have hFp : Summable (Fp f h) := by
    refine ((summable_abs_Fterm hf h hh).of_nonneg_of_le (fun _ => abs_nonneg _) fun q => ?_).of_abs
    unfold Fp
    split_ifs
    · exact le_rfl
    · rw [abs_zero]; exact abs_nonneg _
  have heq : ∀ q, Fterm f h q = Fp f h q + (if q = 1 then 1 else 0) := by
    intro q
    rcases Nat.lt_or_ge q 2 with hq | hq
    · interval_cases q
      · simp [Fp, Fterm_zero]
      · simp [Fp, Fterm_one]
    · simp [Fp, hq, show q ≠ 1 by omega]
  rw [tsum_congr heq, hFp.tsum_add (hasSum_ite_eq 1 (1 : ℝ)).summable, tsum_ite_eq]
  ring

theorem summable_Fp (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) : Summable (Fp f h) := by
  refine ((summable_abs_Fterm hf h hh).of_nonneg_of_le (fun _ => abs_nonneg _) fun q => ?_).of_abs
  unfold Fp
  split_ifs
  · exact le_rfl
  · rw [abs_zero]; exact abs_nonneg _

/-- **The weighted identity.** -/
theorem weighted_identity (hf : Admissible f) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) :
    ∑ h ∈ Icc 1 H, w h * ((∑' q, Fterm f h q) - 1) =
      (∑' d, W f d * PsiW f w κ d H) - PsiW f w κ 1 H := by
  -- (1) drop the terms `q ≤ 1`
  have h1 : ∀ h ∈ Icc 1 H, w h * ((∑' q, Fterm f h q) - 1) = ∑' q, w h * Fp f h q := by
    intro h hh
    have hh0 : (h : ℤ) ≠ 0 := by
      have := (Finset.mem_Icc.mp hh).1
      omega
    rw [tsum_Fterm_sub_one hf h hh0, tsum_mul_left]
  rw [Finset.sum_congr rfl h1]
  -- (2) swap the finite sum over `h` with the series over `q`
  have hsum : ∀ h ∈ Icc 1 H, Summable (fun q => w h * Fp f h q) := by
    intro h hh
    have hh0 : (h : ℤ) ≠ 0 := by
      have := (Finset.mem_Icc.mp hh).1
      omega
    exact (summable_Fp hf h hh0).mul_left _
  rw [← Summable.tsum_finsetSum hsum]
  -- (3) each `q`-term is an antidiagonal sum, up to the `q = 1` remainder
  have hterm : ∀ q, ∑ h ∈ Icc 1 H, w h * Fp f h q =
      (∑ p ∈ q.divisorsAntidiagonal, Gterm f w κ H p) - (if q = 1 then PsiW f w κ 1 H else 0) := by
    intro q
    rw [sum_antidiag_Gterm]
    ring
  rw [tsum_congr hterm]
  -- (4) regroup
  have hG := summable_Gterm hf w κ H
  have hreg := hasSum_sum_divisorsAntidiagonal (Gterm f w κ H) hG (Gterm_axes f w κ H)
  rw [hreg.summable.tsum_sub (hasSum_ite_eq 1 (PsiW f w κ 1 H)).summable, hreg.tsum_eq,
    tsum_ite_eq]
  -- (5) factor the double series
  have hrow : ∀ d, Summable (fun m => Gterm f w κ H (d, m)) := by
    intro d
    have : (fun m => Gterm f w κ H (d, m)) = fun m => Aterm f w κ H d * Bd f d m := by
      funext m
      rfl
    rw [this]
    exact ((summable_abs_Bd hf d).of_abs).mul_left _
  rw [hG.tsum_prod' hrow]
  congr 1
  refine tsum_congr fun d => ?_
  have : (fun m => Gterm f w κ H (d, m)) = fun m => Aterm f w κ H d * Bd f d m := by
    funext m
    rfl
  rw [this, tsum_mul_left, Aterm_mul_tsum_Bd hf w κ H d]

end PairSingularSeries
