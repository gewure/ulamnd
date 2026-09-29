import PairSingularSeries.Hyp
import PairSingularSeries.SqfreeSummable

/-!
# Theorem 1 of paper I: the expansion of `S_f(h)/C(f)²` into root Ramanujan sums

* `abs_gfac_le`: for a prime `p > 2 deg f` not dividing the leading coefficient and with
  `ν_f(p,h) = 0`, `|g_p(h)| ≤ 4 (deg f)² / p²`.
* `summable_gabs`: `∑_p |g_p(h)|` converges over the primes (`f` admissible, `h ≠ 0`).
* `summable_abs_Fterm`: `∑_q |F_h(q)|` converges.
* `tsum_Fterm_pow`: `∑_e F_h(p^e) = 1 + g_p(h)` at a prime.
* `Spartial_eq`: the EXACT finite identity `∏_{p≤x} T_p(h) = (∏_{p≤x} E_p)² ∏_{p≤x} (1 + g_p(h))`.
* `tendsto_prod_one_add_gfac`: `∏_{p≤x} (1 + g_p(h)) → ∑_q F_h(q)` (Euler product).
* `expansion` (**Theorem 1**): if `∏_{p≤x} E_p → C` then `∏_{p≤x} T_p(h) → C² ∑_q F_h(q)`,
  i.e. `S_f(h) = C(f)² ∑_q μ(q)² b(q) c^f_q(h)`.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology

variable {f : ℤ[X]}

/-- `|g_p(h)| ≤ 4 n²/p²` for a prime `p > 2n` (`n = deg f`) with `p ∤ lc(f)` and `ν_f(p,h) = 0`. -/
theorem abs_gfac_le {p : ℕ} (hp : p.Prime) (h : ℤ) (hlc : ¬ (p : ℤ) ∣ f.leadingCoeff)
    (hnu : nu f p h = 0) (hbig : 2 * f.natDegree < p) :
    |gfac f p h| ≤ 4 * (f.natDegree : ℝ) ^ 2 / (p : ℝ) ^ 2 := by
  have hω := omega_le_natDegree f hp hlc
  have hωr : (omega f p : ℝ) ≤ f.natDegree := by exact_mod_cast hω
  have hbigr : 2 * (f.natDegree : ℝ) < p := by exact_mod_cast hbig
  have hω0 : (0 : ℝ) ≤ omega f p := Nat.cast_nonneg _
  have hpos : (0 : ℝ) < (p : ℝ) - omega f p := by linarith
  have hp0 : (0 : ℝ) < p := by exact_mod_cast hp.pos
  unfold gfac
  rw [hnu]
  simp only [Nat.cast_zero, mul_zero, zero_sub, abs_div, abs_neg, abs_pow, abs_of_nonneg hω0,
    abs_of_pos hpos]
  rw [div_le_div_iff₀ (pow_pos hpos 2) (pow_pos hp0 2)]
  have h1 : (omega f p : ℝ) ^ 2 ≤ (f.natDegree : ℝ) ^ 2 := by nlinarith
  have h2 : (p : ℝ) ^ 2 ≤ 4 * ((p : ℝ) - omega f p) ^ 2 := by nlinarith
  nlinarith [mul_le_mul h1 h2 (by positivity) (by positivity)]

/-- `∑_p |g_p(h)|` converges over the primes, for admissible `f` and `h ≠ 0`. -/
theorem summable_gabs (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    Summable (fun p : ℕ => if p.Prime then |gfac f p h| else 0) := by
  obtain ⟨N, hN0, hN⟩ := hf.resultant h hh
  have hlc0 : f.leadingCoeff ≠ 0 := by
    rw [Ne, leadingCoeff_eq_zero]
    rintro rfl
    have := hf.natDegree_pos
    simp at this
  set n := f.natDegree with hn
  set P₀ := max (2 * n + 1) (max (f.leadingCoeff.natAbs + 1) (N.natAbs + 1)) with hP₀
  -- the two majorants
  set b₁ : ℕ → ℝ := fun p => if p < P₀ then |gfac f p h| else 0 with hb₁
  set b₂ : ℕ → ℝ := fun p => 4 * (n : ℝ) ^ 2 * (1 / (p : ℝ) ^ 2) with hb₂
  have hs₁ : Summable b₁ := by
    apply summable_of_ne_finset_zero (s := range P₀)
    intro p hp
    simp only [mem_range, not_lt] at hp
    simp [hb₁, not_lt.mpr hp]
  have hs₂ : Summable b₂ :=
    ((Real.summable_one_div_nat_pow (p := 2)).mpr one_lt_two).mul_left _
  refine (hs₁.add hs₂).of_nonneg_of_le (fun p => by split_ifs <;> simp [abs_nonneg]) fun p => ?_
  by_cases hsmall : p < P₀
  · -- small `p`: the first majorant is the term itself
    have : b₂ p ≥ 0 := by simp only [hb₂]; positivity
    simp only [hb₁, hsmall, if_true]
    split_ifs <;> linarith [abs_nonneg (gfac f p h)]
  · -- large `p`: the bound `4n²/p²`
    push Not at hsmall
    simp only [hb₁, not_lt.mpr hsmall, if_false, zero_add]
    split_ifs with hp
    · have h2n : 2 * n < p := by omega
      have hlc : ¬ (p : ℤ) ∣ f.leadingCoeff :=
        prime_not_dvd_of_gt hlc0 (by omega)
      have hnu : nu f p h = 0 := by
        by_contra hne
        exact prime_not_dvd_of_gt hN0 (by omega) (hN p hp hne)
      have := abs_gfac_le hp h hlc hnu h2n
      simp only [hb₂]
      calc |gfac f p h| ≤ 4 * (n : ℝ) ^ 2 / (p : ℝ) ^ 2 := this
        _ = 4 * (n : ℝ) ^ 2 * (1 / (p : ℝ) ^ 2) := by ring
    · simp only [hb₂]; positivity

/-- `∑_q |F_h(q)|` converges. -/
theorem summable_abs_Fterm (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    Summable (fun q => |Fterm f h q|) := by
  apply summable_abs_of_squarefree_mult (Fterm f h) (Fterm_zero f h) (Fterm_one f h)
    (fun {m n} hmn => Fterm_mul f h hmn) (fun {p k} hp hk => Fterm_prime_pow f h hp hk)
  refine (summable_gabs hf h hh).congr fun p => ?_
  split_ifs with hp
  · rw [Fterm_prime f h hp]
  · rfl

/-- `∑_q ‖F_h(q)‖` converges (norm form, for the Euler product). -/
theorem summable_norm_Fterm (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    Summable (fun q => ‖Fterm f h q‖) := by
  simpa only [Real.norm_eq_abs] using summable_abs_Fterm hf h hh

/-- `∑_e F_h(p^e) = 1 + g_p(h)` at a prime `p`: only `e = 0, 1` contribute. -/
theorem tsum_Fterm_pow (h : ℤ) {p : ℕ} (hp : p.Prime) :
    ∑' e : ℕ, Fterm f h (p ^ e) = 1 + gfac f p h := by
  rw [tsum_eq_sum (s := range 2)]
  · rw [Finset.sum_range_succ, Finset.sum_range_one, pow_zero, pow_one, Fterm_one, Fterm_prime f h hp]
  · intro e he
    simp only [mem_range, not_lt] at he
    exact Fterm_prime_pow f h hp he

/-- **The exact finite identity**: `∏_{p≤x} T_p(h) = (∏_{p≤x} E_p)² · ∏_{p≤x} (1 + g_p(h))`. -/
theorem Spartial_eq (hf : Admissible f) (h : ℤ) (x : ℕ) :
    Spartial f h x = Cpartial f x ^ 2 * ∏ p ∈ (range (x + 1)).filter Nat.Prime, (1 + gfac f p h) := by
  unfold Spartial Cpartial
  rw [← Finset.prod_pow, ← Finset.prod_mul_distrib]
  apply Finset.prod_congr rfl
  intro p hp
  have hpp : p.Prime := (Finset.mem_filter.mp hp).2
  have hω : (omega f p : ℝ) ≠ p := by
    have := hf.omega_lt p hpp
    exact_mod_cast this.ne
  exact Tfac_eq f p h hpp.two_le hω

/-- **Euler product**: `∏_{p ≤ x} (1 + g_p(h)) → ∑_q F_h(q)` as `x → ∞`. -/
theorem tendsto_prod_one_add_gfac (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) :
    Tendsto (fun x : ℕ => ∏ p ∈ (range (x + 1)).filter Nat.Prime, (1 + gfac f p h)) atTop
      (𝓝 (∑' q, Fterm f h q)) := by
  have hEP := EulerProduct.eulerProduct (f := Fterm f h) (Fterm_one f h)
    (fun {m n} hmn => Fterm_mul f h hmn) (summable_norm_Fterm hf h hh) (Fterm_zero f h)
  have hEP' : Tendsto (fun n : ℕ => ∏ p ∈ Nat.primesBelow n, (1 + gfac f p h)) atTop
      (𝓝 (∑' q, Fterm f h q)) := by
    refine hEP.congr fun n => Finset.prod_congr rfl fun p hp => ?_
    exact tsum_Fterm_pow h (Nat.prime_of_mem_primesBelow hp)
  exact hEP'.comp (tendsto_add_atTop_nat 1)

/-- **Theorem 1 of paper I** (`thm:expansion`, eq. (expansion)). If the partial products of the
Bateman–Horn constant converge, `∏_{p≤x} E_p → C`, then the partial products of the pair singular
series converge and `S_f(h) = C² ∑_q F_h(q) = C(f)² ∑_{q squarefree} b(q) c^f_q(h)`. -/
theorem expansion (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) {C : ℝ}
    (hC : Tendsto (Cpartial f) atTop (𝓝 C)) :
    Tendsto (Spartial f h) atTop (𝓝 (C ^ 2 * ∑' q, Fterm f h q)) := by
  have := (hC.pow 2).mul (tendsto_prod_one_add_gfac hf h hh)
  exact this.congr fun x => (Spartial_eq hf h x).symm

end PairSingularSeries
