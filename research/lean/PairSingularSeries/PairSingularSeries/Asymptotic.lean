import PairSingularSeries.Split2
import PairSingularSeries.Tail

/-!
# Theorem 5 of paper I, eq. (smoothed), conditionally on the three analytic inputs

Hypotheses (each a Lean hypothesis with the paper's citation; none is in Mathlib):
* (E1) `∏_{p≤x} E_p → C` with `C > 0` — Landau's prime ideal theorem for `Q[t]/(f)`;
* (E2) `|∑_{d≤n} a_f(d) − C⁻¹ log n| ≤ K₂` for `n ≥ 1` — paper I, Theorem 2 (Dedekind zeta);
* (E3) `∑_{d≤n} d |a_f(d)| ≤ K₃ n` for `n ≥ 1` — Shiu's theorem.

Conclusion (`smoothed`): there is `K` with, for all `H ≥ 2`,
  `|∑_{h≤H} (1 − h/H)(S_f(h) − C²) + (C/2) log H − (C²/H) Off*_f(H)| ≤ K`,
i.e. `∑_{h≤H}(1 − h/H)(S_f(h) − C²) = −½ C log H + O(1) + (C²/H) Off*_f(H)`, with the constant
`K = (C²/2)K₂ + C²K₃/8 + C²(K₂ + 2/C) + C²/2` explicit.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology

variable {f : ℤ[X]}

theorem a_zero (f : ℤ[X]) : a f 0 = 0 := by simp [a, W]
theorem dterm_zero (f : ℤ[X]) (H : ℕ) : dterm f H 0 = 0 := by simp [dterm, a_zero]

/-- `|a_f(d)|/d ≤ Bsum · |B(d)|`. -/
theorem abs_a_div_le (hf : Admissible f) (d : ℕ) : |a f d| / d ≤ Bsum f * |Bterm f d| := by
  have hBs : 0 ≤ Bsum f := tsum_nonneg fun _ => abs_nonneg _
  rcases Nat.eq_zero_or_pos d with rfl | hd
  · simp [a_zero]
    positivity
  · have hd0 : (0 : ℝ) < d := by exact_mod_cast hd
    unfold a
    rw [abs_mul, abs_of_nonneg (Nat.cast_nonneg (omega f d) : (0:ℝ) ≤ (omega f d : ℝ)),
      div_le_iff₀ hd0]
    have hW := abs_W_le hf d
    have hB := abs_Bterm f d
    have hω : (omega f d : ℝ) ≤ (omega f d : ℝ) ^ 2 := by
      rcases Nat.eq_zero_or_pos (omega f d) with h | h
      · rw [h]; simp
      · have : (1 : ℝ) ≤ omega f d := by exact_mod_cast h
        nlinarith
    have hnn : (0:ℝ) ≤ ((ArithmeticFunction.moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * Bsum f :=
      mul_nonneg (mul_nonneg (mul_nonneg (by positivity) (Nat.cast_nonneg _)) (bfun_nonneg f d)) hBs
    calc |W f d| * (omega f d : ℝ)
        ≤ ((ArithmeticFunction.moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * Bsum f * (omega f d : ℝ) ^ 2 :=
          mul_le_mul hW hω (Nat.cast_nonneg _) hnn
      _ = Bsum f * (((ArithmeticFunction.moebius d : ℤ) : ℝ) ^ 2 * bfun f d * (omega f d : ℝ) ^ 2) * d := by
          ring
      _ = Bsum f * |Bterm f d| * d := by rw [hB]

theorem summable_abs_a_div (hf : Admissible f) : Summable (fun d : ℕ => |a f d| / d) :=
  ((summable_abs_Bterm hf).mul_left (Bsum f)).of_nonneg_of_le (fun d => by positivity)
    (abs_a_div_le hf)

/-- The diagonal series, split at `H`:
`∑_d a(d) B_d(d) = −(H/2) ∑_{d≤H} a(d) + ½ ∑_{d≤H} d a(d) φ({H/d}) − (H²/2) ∑_{d>H} a(d)/d`. -/
theorem tsum_dterm_split (hf : Admissible f) (H : ℕ) (hH : 1 ≤ H) :
    ∑' d, dterm f H d =
      -(H : ℝ) / 2 * ∑ d ∈ Icc 1 H, a f d
        + 1 / 2 * ∑ d ∈ Icc 1 H, (d : ℝ) * a f d * phi (Int.fract ((H : ℝ) / d))
        - (H : ℝ) ^ 2 / 2 * ∑' d : ℕ, (if H < d then a f d / d else 0) := by
  have hs := summable_diag hf H
  have h1 : ∀ d, dterm f H d = (if d ≤ H then dterm f H d else 0) + (if H < d then dterm f H d else 0) := by
    intro d
    by_cases hd : d ≤ H
    · simp [hd, show ¬ H < d by omega]
    · simp [hd, show H < d by omega]
  have hs₁ : Summable (fun d => if d ≤ H then dterm f H d else 0) := by
    apply summable_of_ne_finset_zero (s := range (H + 1))
    intro d hd
    simp only [mem_range, not_lt] at hd
    simp [show ¬ d ≤ H by omega]
  have hs₂ : Summable (fun d => if H < d then dterm f H d else 0) := by
    have := hs.sub hs₁
    refine this.congr fun d => ?_
    by_cases hd : d ≤ H
    · simp [hd, show ¬ H < d by omega]
    · simp [hd, show H < d by omega]
  rw [tsum_congr h1, hs₁.tsum_add hs₂]
  -- the finite part
  have hfin : ∑' d, (if d ≤ H then dterm f H d else 0) =
      -(H : ℝ) / 2 * ∑ d ∈ Icc 1 H, a f d
        + 1 / 2 * ∑ d ∈ Icc 1 H, (d : ℝ) * a f d * phi (Int.fract ((H : ℝ) / d)) := by
    rw [tsum_eq_sum (s := Icc 1 H)]
    · rw [Finset.mul_sum, Finset.mul_sum, ← Finset.sum_add_distrib]
      refine Finset.sum_congr rfl fun d hd => ?_
      have hd' := Finset.mem_Icc.mp hd
      rw [if_pos hd'.2]
      unfold dterm
      rw [B_diag d H hd'.1]
      ring
    · intro d hd
      simp only [Finset.mem_Icc, not_and, not_le] at hd
      by_cases hd0 : d = 0
      · subst hd0; simp [dterm_zero]
      · have : H < d := hd (by omega)
        simp [show ¬ d ≤ H by omega]
  -- the tail
  have htail : ∑' d, (if H < d then dterm f H d else 0) =
      -((H : ℝ) ^ 2 / 2) * ∑' d : ℕ, (if H < d then a f d / d else 0) := by
    rw [← tsum_mul_left]
    refine tsum_congr fun d => ?_
    by_cases hd : H < d
    · rw [if_pos hd, if_pos hd]
      unfold dterm
      rw [B_diag_gt d H hd]
      have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
      first | (field_simp; done) | (field_simp; ring)
    · simp [hd]
  rw [hfin, htail]
  ring

/-- `0 ≤ φ({x}) ≤ 1/4`. -/
theorem phi_fract_bounds (x : ℝ) : 0 ≤ phi (Int.fract x) ∧ phi (Int.fract x) ≤ 1 / 4 :=
  phi_bounds (Int.fract_nonneg x) (Int.fract_lt_one x)

/-- **Theorem 5 of paper I, eq. (smoothed)**, conditionally on (E1)–(E3), with an explicit constant. -/
theorem smoothed (hf : Admissible f) {C : ℝ} (hC : Tendsto (Cpartial f) atTop (𝓝 C)) (hCpos : 0 < C)
    {K₂ : ℝ} (hdir : ∀ n : ℕ, 1 ≤ n → |(∑ d ∈ Icc 1 n, a f d) - C⁻¹ * Real.log n| ≤ K₂)
    {K₃ : ℝ} (hshiu : ∀ n : ℕ, 1 ≤ n → ∑ d ∈ Icc 1 n, (d : ℝ) * |a f d| ≤ K₃ * n) :
    ∀ H : ℕ, 2 ≤ H →
      |∑ h ∈ Icc 1 H, (1 - (h : ℝ) / H) * (Sf f h - C ^ 2) + C / 2 * Real.log H
          - C ^ 2 / H * OffStar f H|
        ≤ C ^ 2 / 2 * K₂ + C ^ 2 * K₃ / 8 + C ^ 2 * (K₂ + 2 / C) + C ^ 2 / 2 := by
  intro H hH
  have hH1 : 1 ≤ H := by omega
  have hH0 : (0 : ℝ) < H := by exact_mod_cast (by omega : 0 < H)
  have hCne : C ≠ 0 := hCpos.ne'
  -- (1) the smoothed sum from the split identity
  have hsm : ∑ h ∈ Icc 1 H, (1 - (h : ℝ) / H) * (Sf f h - C ^ 2) =
      C ^ 2 / H * ((∑' d, dterm f H d) + OffStar f H + (H : ℝ) / 2) := by
    have : ∀ h ∈ Icc 1 H, (1 - (h : ℝ) / H) * (Sf f h - C ^ 2)
        = (1 / H) * (((H : ℝ) - h) * (Sf f h - C ^ 2)) := by
      intro h _
      field_simp
    rw [Finset.sum_congr rfl this, ← Finset.mul_sum, eq_smoothed_split hf H hC]
    ring
  rw [hsm, tsum_dterm_split hf H hH1]
  set A := ∑ d ∈ Icc 1 H, a f d with hAdef
  set P := ∑ d ∈ Icc 1 H, (d : ℝ) * a f d * phi (Int.fract ((H : ℝ) / d)) with hPdef
  set T := ∑' d : ℕ, (if H < d then a f d / d else 0) with hTdef
  -- (2) the three bounds
  have hA : |A - C⁻¹ * Real.log H| ≤ K₂ := hdir H hH1
  have hP : |P| ≤ K₃ * H / 4 := by
    calc |P| ≤ ∑ d ∈ Icc 1 H, |(d : ℝ) * a f d * phi (Int.fract ((H : ℝ) / d))| :=
          Finset.abs_sum_le_sum_abs _ _
      _ ≤ ∑ d ∈ Icc 1 H, (d : ℝ) * |a f d| * (1 / 4) := by
          refine Finset.sum_le_sum fun d _ => ?_
          have hφ := phi_fract_bounds ((H : ℝ) / d)
          rw [abs_mul, abs_mul, abs_of_nonneg (Nat.cast_nonneg d), abs_of_nonneg hφ.1]
          exact mul_le_mul_of_nonneg_left hφ.2 (by positivity)
      _ = (1 / 4) * ∑ d ∈ Icc 1 H, (d : ℝ) * |a f d| := by
          rw [Finset.mul_sum]
          refine Finset.sum_congr rfl fun d _ => ?_
          ring
      _ ≤ (1 / 4) * (K₃ * H) := by
          apply mul_le_mul_of_nonneg_left (hshiu H hH1) (by norm_num)
      _ = K₃ * H / 4 := by ring
  have hT : |T| ≤ (2 * K₂ + 4 * |C⁻¹|) / H :=
    tail_div_le (a f) C⁻¹ K₂ (fun n hn => hdir n hn) (summable_abs_a_div hf) hH1
  have hCinv : |C⁻¹| = 1 / C := by
    rw [abs_of_pos (inv_pos.mpr hCpos), one_div]
  -- (3) assemble
  have hexpr : C ^ 2 / H * ((-(H : ℝ) / 2 * A + 1 / 2 * P - (H : ℝ) ^ 2 / 2 * T) + OffStar f H
        + (H : ℝ) / 2) + C / 2 * Real.log H - C ^ 2 / H * OffStar f H
      = -(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P - C ^ 2 * H / 2 * T
        + C ^ 2 / 2 := by
    field_simp
    ring
  rw [hexpr]
  -- (4) the triangle inequality, term by term
  have hK₂ : 0 ≤ K₂ := le_trans (abs_nonneg _) (hdir 1 le_rfl)
  have t1 : |-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H)| ≤ C ^ 2 / 2 * K₂ := by
    rw [abs_mul, abs_neg, abs_of_pos (by positivity : (0:ℝ) < C ^ 2 / 2)]
    exact mul_le_mul_of_nonneg_left hA (by positivity)
  have t2 : |C ^ 2 / (2 * H) * P| ≤ C ^ 2 * K₃ / 8 := by
    rw [abs_mul, abs_of_pos (by positivity : (0:ℝ) < C ^ 2 / (2 * H))]
    calc C ^ 2 / (2 * H) * |P| ≤ C ^ 2 / (2 * H) * (K₃ * H / 4) :=
          mul_le_mul_of_nonneg_left hP (by positivity)
      _ = C ^ 2 * K₃ / 8 := by field_simp; ring
  have t3 : |C ^ 2 * H / 2 * T| ≤ C ^ 2 * (K₂ + 2 / C) := by
    rw [abs_mul, abs_of_pos (by positivity : (0:ℝ) < C ^ 2 * H / 2)]
    calc C ^ 2 * H / 2 * |T| ≤ C ^ 2 * H / 2 * ((2 * K₂ + 4 * |C⁻¹|) / H) :=
          mul_le_mul_of_nonneg_left hT (by positivity)
      _ = C ^ 2 * (K₂ + 2 / C) := by rw [hCinv]; field_simp; ring
  have t4 : |C ^ 2 / 2| = C ^ 2 / 2 := abs_of_pos (by positivity)
  calc |-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P - C ^ 2 * H / 2 * T + C ^ 2 / 2|
      ≤ |-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P - C ^ 2 * H / 2 * T| + |C ^ 2 / 2| :=
        abs_add_le _ _
    _ ≤ (|-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H)| + |C ^ 2 / (2 * H) * P| + |C ^ 2 * H / 2 * T|)
        + |C ^ 2 / 2| := by
        gcongr
        calc |-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P - C ^ 2 * H / 2 * T|
            = |(-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P) + (-(C ^ 2 * H / 2 * T))| := by
              ring_nf
          _ ≤ |-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H) + C ^ 2 / (2 * H) * P| + |-(C ^ 2 * H / 2 * T)| :=
              abs_add_le _ _
          _ ≤ (|-(C ^ 2 / 2) * (A - C⁻¹ * Real.log H)| + |C ^ 2 / (2 * H) * P|) + |C ^ 2 * H / 2 * T| := by
              rw [abs_neg]
              gcongr
              exact abs_add_le _ _
    _ ≤ (C ^ 2 / 2 * K₂ + C ^ 2 * K₃ / 8 + C ^ 2 * (K₂ + 2 / C)) + C ^ 2 / 2 := by
        rw [t4]
        gcongr
    _ = _ := by ring

end PairSingularSeries
