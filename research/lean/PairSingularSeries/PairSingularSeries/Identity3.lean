import PairSingularSeries.Identity2

/-!
# The weighted identity, part 3: summability of the product terms

* `summable_primes_of_bound`: a nonnegative function on the primes bounded by `c/p²` beyond a threshold
  is summable (the threshold argument, factored out).
* `summable_abs_Bterm`: `∑_m |B(m)| < ∞`.
* `summable_abs_Aterm`: `∑_d |A(d)| < ∞` — for each `h ≤ H` the function `d ↦ μ(d)² ν_f(d,h)` is
  supported on the divisors of `N_h`, so `d ↦ Ψ^{w,κ}_d` is a finite sum plus a multiple of `|B(d)|`.
* `summable_Gterm`: `G` is summable on `ℕ × ℕ`.
-/

namespace PairSingularSeries

open Finset Polynomial ArithmeticFunction

variable {f : ℤ[X]}

/-- `b(q) ≥ 0`. -/
theorem bfun_nonneg (f : ℤ[X]) (q : ℕ) : 0 ≤ bfun f q := by
  unfold bfun
  exact Finset.prod_nonneg fun _ _ => by positivity

/-- `|B(m)| = μ(m)² b(m) ω_f(m)²`. -/
theorem abs_Bterm (f : ℤ[X]) (m : ℕ) :
    |Bterm f m| = ((moebius m : ℤ) : ℝ) ^ 2 * bfun f m * (omega f m : ℝ) ^ 2 := by
  unfold Bterm
  -- `|μ m| = μ m ^ 2` since `μ m ∈ {-1, 0, 1}`
  have h1 : |((moebius m : ℤ) : ℝ)| = ((moebius m : ℤ) : ℝ) ^ 2 := by
    rcases moebius_eq_or (n := m) with h | h | h <;> simp [h]
  have h2 : (0 : ℝ) ≤ (omega f m : ℝ) ^ 2 := by positivity
  rw [abs_mul, abs_mul, h1, abs_of_nonneg (bfun_nonneg f m), abs_of_nonneg h2]

/-- The threshold argument: a nonnegative function on the primes, bounded by `c / p²` for all
primes `p ≥ P₀`, is summable. -/
theorem summable_primes_of_bound (g : ℕ → ℝ) (hg : ∀ p, 0 ≤ g p) (c : ℝ) (P₀ : ℕ)
    (hbound : ∀ p, p.Prime → P₀ ≤ p → g p ≤ c / (p : ℝ) ^ 2) :
    Summable (fun p : ℕ => if p.Prime then g p else 0) := by
  set b₁ : ℕ → ℝ := fun p => if p < P₀ then (if p.Prime then g p else 0) else 0 with hb₁
  set b₂ : ℕ → ℝ := fun p => c * (1 / (p : ℝ) ^ 2) with hb₂
  have hs₁ : Summable b₁ := by
    apply summable_of_ne_finset_zero (s := range P₀)
    intro p hp
    simp only [mem_range, not_lt] at hp
    simp [hb₁, not_lt.mpr hp]
  have hs₂ : Summable b₂ :=
    ((Real.summable_one_div_nat_pow (p := 2)).mpr one_lt_two).mul_left _
  have hc : 0 ≤ c := by
    -- `c ≥ 0` is forced if some prime `≥ P₀` exists; take the prime `≥ max P₀ 2` from `Nat.exists_infinite_primes`
    obtain ⟨p, hp₀, hp⟩ := Nat.exists_infinite_primes (max P₀ 2)
    have := hbound p hp (le_trans (le_max_left _ _) hp₀)
    have hp2 : (0 : ℝ) < (p : ℝ) ^ 2 := by
      have : (0 : ℝ) < p := by exact_mod_cast hp.pos
      positivity
    have := le_trans (hg p) this
    rwa [le_div_iff₀ hp2, zero_mul] at this
  refine (hs₁.add hs₂).of_nonneg_of_le (fun p => by split_ifs <;> simp [hg]) fun p => ?_
  by_cases hsmall : p < P₀
  · have : 0 ≤ b₂ p := by simp only [hb₂]; positivity
    simp only [hb₁, hsmall, if_true]
    linarith
  · push Not at hsmall
    simp only [hb₁, not_lt.mpr hsmall, if_false, zero_add, hb₂]
    split_ifs with hp
    · calc g p ≤ c / (p : ℝ) ^ 2 := hbound p hp hsmall
        _ = c * (1 / (p : ℝ) ^ 2) := by ring
    · positivity

/-- `|B(p)| ≤ 4 n²/p²` for a prime `p > 2n` not dividing the leading coefficient. -/
theorem abs_Bterm_le {p : ℕ} (hp : p.Prime) (hlc : ¬ (p : ℤ) ∣ f.leadingCoeff)
    (hbig : 2 * f.natDegree < p) :
    |Bterm f p| ≤ 4 * (f.natDegree : ℝ) ^ 2 / (p : ℝ) ^ 2 := by
  rw [abs_Bterm, moebius_apply_prime hp, bfun_prime f hp]
  have hω := omega_le_natDegree f hp hlc
  have hωr : (omega f p : ℝ) ≤ f.natDegree := by exact_mod_cast hω
  have hbigr : 2 * (f.natDegree : ℝ) < p := by exact_mod_cast hbig
  have hω0 : (0 : ℝ) ≤ omega f p := Nat.cast_nonneg _
  have hpos : (0 : ℝ) < (p : ℝ) - omega f p := by linarith
  have hp0 : (0 : ℝ) < p := by exact_mod_cast hp.pos
  push_cast
  rw [show ((-1 : ℝ) ^ 2 * (((p : ℝ) - omega f p) ^ 2)⁻¹ * (omega f p : ℝ) ^ 2)
      = (omega f p : ℝ) ^ 2 / ((p : ℝ) - omega f p) ^ 2 by ring]
  rw [div_le_div_iff₀ (pow_pos hpos 2) (pow_pos hp0 2)]
  have h1 : (omega f p : ℝ) ^ 2 ≤ (f.natDegree : ℝ) ^ 2 := by nlinarith
  have h2 : (p : ℝ) ^ 2 ≤ 4 * ((p : ℝ) - omega f p) ^ 2 := by nlinarith
  nlinarith [mul_le_mul h1 h2 (by positivity) (by positivity)]

theorem Bterm_zero (f : ℤ[X]) : Bterm f 0 = 0 := by simp [Bterm]
theorem Bterm_one (f : ℤ[X]) : Bterm f 1 = 1 := by simp [Bterm, bfun_one, omega_one]

theorem Bterm_mul (f : ℤ[X]) {m n : ℕ} (hmn : m.Coprime n) :
    Bterm f (m * n) = Bterm f m * Bterm f n := by
  unfold Bterm
  rcases Nat.eq_zero_or_pos m with rfl | hm
  · simp
  rcases Nat.eq_zero_or_pos n with rfl | hn
  · simp
  rw [isMultiplicative_moebius.map_mul_of_coprime hmn, bfun_mul f hm.ne' hn.ne' hmn,
    omega_mul f hm hn hmn]
  push_cast
  ring

theorem Bterm_prime_pow (f : ℤ[X]) {p k : ℕ} (hp : p.Prime) (hk : 2 ≤ k) : Bterm f (p ^ k) = 0 := by
  unfold Bterm
  have : moebius (p ^ k) = 0 := by
    rw [moebius_apply_prime_pow hp (by omega)]
    simp [show k ≠ 1 by omega]
  simp [this]

/-- `∑_m |B(m)| < ∞`. -/
theorem summable_abs_Bterm (hf : Admissible f) : Summable (fun m => |Bterm f m|) := by
  apply summable_abs_of_squarefree_mult (Bterm f) (Bterm_zero f) (Bterm_one f)
    (fun {m n} hmn => Bterm_mul f hmn) (fun {p k} hp hk => Bterm_prime_pow f hp hk)
  have hlc0 : f.leadingCoeff ≠ 0 := by
    rw [Ne, leadingCoeff_eq_zero]
    rintro rfl
    have := hf.natDegree_pos
    simp at this
  apply summable_primes_of_bound (fun p => |Bterm f p|) (fun _ => abs_nonneg _)
    (4 * (f.natDegree : ℝ) ^ 2) (max (2 * f.natDegree + 1) (f.leadingCoeff.natAbs + 1))
  intro p hp hP
  exact abs_Bterm_le hp (prime_not_dvd_of_gt hlc0 (by omega)) (by omega)

/-- `|Ψ^{w,κ}_d| ≤ ∑_{h≤H} |w(h)| ν_f(d,h) + ω_f(d)² |κ| / d`. -/
theorem abs_PsiW_le (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) {d : ℕ} (hd : 1 ≤ d) (H : ℕ) :
    |PsiW f w κ d H| ≤ (∑ h ∈ Icc 1 H, |w h| * (nu f d h : ℝ)) + (omega f d : ℝ) ^ 2 * |κ| / d := by
  have h := sum_weight_nu_kappa f w κ d hd H
  have hP : PsiW f w κ d H = (∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ)) - (omega f d : ℝ) ^ 2 * κ / d := by
    linarith
  rw [hP]
  calc |(∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ)) - (omega f d : ℝ) ^ 2 * κ / d|
      ≤ |∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ)| + |(omega f d : ℝ) ^ 2 * κ / d| := abs_sub _ _
    _ ≤ (∑ h ∈ Icc 1 H, |w h| * (nu f d h : ℝ)) + (omega f d : ℝ) ^ 2 * |κ| / d := by
        gcongr
        · calc |∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ)| ≤ ∑ h ∈ Icc 1 H, |w h * (nu f d h : ℝ)| :=
              Finset.abs_sum_le_sum_abs _ _
            _ = ∑ h ∈ Icc 1 H, |w h| * (nu f d h : ℝ) := by
              refine Finset.sum_congr rfl fun h _ => ?_
              rw [abs_mul, abs_of_nonneg (Nat.cast_nonneg (nu f d h) : (0 : ℝ) ≤ (nu f d h : ℝ))]
        · rw [abs_div, abs_mul, abs_of_nonneg (by positivity : (0:ℝ) ≤ (omega f d : ℝ) ^ 2),
            abs_of_nonneg (Nat.cast_nonneg d : (0 : ℝ) ≤ (d : ℝ))]

/-- For `h ≠ 0`, `d ↦ μ(d)² d b(d) ν_f(d,h)` is finitely supported (on the divisors of `N_h`). -/
theorem summable_sqfree_nu (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) (c : ℝ) :
    Summable (fun d : ℕ => ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * (c * (nu f d h : ℝ))) := by
  obtain ⟨N, hN0, hN⟩ := nu_ne_zero_dvd hf h hh
  apply summable_of_ne_finset_zero (s := N.divisors)
  intro d hd
  by_cases hsq : Squarefree d
  · have : nu f d h = 0 := by
      by_contra hne
      exact hd (Nat.mem_divisors.mpr ⟨hN d hsq hne, hN0⟩)
    simp [this]
  · simp [moebius_eq_zero_of_not_squarefree hsq]

/-- `∑_d |A(d)| < ∞`. -/
theorem summable_abs_Aterm (hf : Admissible f) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) :
    Summable (fun d => |Aterm f w κ H d|) := by
  -- majorant: `∑_{h≤H} μ² d b |w h| ν(d,h) + |κ| |B(d)|`
  set M : ℕ → ℝ := fun d => (∑ h ∈ Icc 1 H,
    ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * (|w h| * (nu f d h : ℝ))) + |κ| * |Bterm f d|
    with hM
  have hsM : Summable M := by
    apply Summable.add
    · apply summable_sum
      intro h hh
      have hh0 : (h : ℤ) ≠ 0 := by
        have := (Finset.mem_Icc.mp hh).1
        omega
      exact summable_sqfree_nu hf h hh0 |w h|
    · exact (summable_abs_Bterm hf).mul_left _
  refine hsM.of_nonneg_of_le (fun _ => abs_nonneg _) fun d => ?_
  rcases Nat.eq_zero_or_pos d with rfl | hd
  · simp [Aterm, hM]
    positivity
  · simp only [Aterm, hM]
    have hb := bfun_nonneg f d
    have hμ : (0 : ℝ) ≤ ((moebius d : ℤ) : ℝ) ^ 2 := by positivity
    rw [abs_mul, abs_of_nonneg (by positivity : (0:ℝ) ≤ ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d)]
    have hΨ := abs_PsiW_le f w κ hd H
    have hd0 : (0 : ℝ) < d := by exact_mod_cast hd
    calc ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * |PsiW f w κ d H|
        ≤ ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d *
          ((∑ h ∈ Icc 1 H, |w h| * (nu f d h : ℝ)) + (omega f d : ℝ) ^ 2 * |κ| / d) := by
          gcongr
      _ = (∑ h ∈ Icc 1 H, ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * (|w h| * (nu f d h : ℝ)))
          + |κ| * (((moebius d : ℤ) : ℝ) ^ 2 * bfun f d * (omega f d : ℝ) ^ 2) := by
          rw [mul_add, Finset.mul_sum]
          field_simp
      _ = _ := by rw [abs_Bterm]

/-- `G` is summable on `ℕ × ℕ`. -/
theorem summable_Gterm (hf : Admissible f) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) :
    Summable (Gterm f w κ H) := by
  have hprod := summable_mul_of_summable_norm (f := fun d => |Aterm f w κ H d|)
    (g := fun m => |Bterm f m|) (by simpa using summable_abs_Aterm hf w κ H)
    (by simpa using summable_abs_Bterm hf)
  refine hprod.of_norm_bounded fun p => ?_
  simp only [Gterm, Real.norm_eq_abs, abs_mul]
  apply mul_le_mul_of_nonneg_left _ (abs_nonneg _)
  split_ifs
  · exact le_rfl
  · rw [abs_zero]; exact abs_nonneg _

/-- `G` vanishes on the axes. -/
theorem Gterm_axes (f : ℤ[X]) (w : ℕ → ℝ) (κ : ℝ) (H : ℕ) (p : ℕ × ℕ) (hp : p.1 = 0 ∨ p.2 = 0) :
    Gterm f w κ H p = 0 := by
  rcases hp with h | h
  · simp [Gterm, Aterm, h]
  · simp [Gterm, Bterm, h]

end PairSingularSeries
