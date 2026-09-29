import Mathlib

/-!
# A tail bound by discrete partial summation

`tail_div_le`: if `a : ℕ → ℝ` has partial sums `A(n) = ∑_{d≤n} a d` with `|A(n) − L log n| ≤ K` for
`n ≥ 1`, and `∑ |a d|/d < ∞`, then `|∑_{d>H} a d / d| ≤ (2K + 4|L|)/H` for `H ≥ 1`.
Proof: the discrete Abel identity `∑_{d>H} a d/d = ∑_{d>H} (A(d) − A(H))/(d(d+1))`, then
`∑_{d>H} 1/(d(d+1)) = 1/(H+1)` (telescoping), `log x ≤ 2√x`, and `d^{-3/2} ≤ 2(1/√(d−1) − 1/√d)`.
No integrals. Depends on nothing in the project.
-/

namespace PairSingularSeries

open Finset Filter Topology

/-- `1/(d(d+1)) = 1/d − 1/(d+1)`. -/
theorem one_div_mul_succ (d : ℕ) (hd : 1 ≤ d) :
    (1 : ℝ) / ((d : ℝ) * (d + 1)) = 1 / d - 1 / ((d : ℝ) + 1) := by
  have h0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
  field_simp
  ring

/-- Telescoping: `∑_{H < d ≤ X} 1/(d(d+1)) = 1/(H+1) − 1/(X+1)`. -/
theorem sum_Ioc_one_div_mul_succ (H X : ℕ) (hHX : H ≤ X) :
    ∑ d ∈ Ioc H X, (1 : ℝ) / ((d : ℝ) * (d + 1)) = 1 / ((H : ℝ) + 1) - 1 / ((X : ℝ) + 1) := by
  induction X, hHX using Nat.le_induction with
  | base => simp
  | succ X hHX ih =>
    rw [Finset.sum_Ioc_succ_top (by omega), ih, one_div_mul_succ (X + 1) (by omega)]
    push_cast
    ring

/-- `log x ≤ 2 √x` for `x ≥ 1` (indeed `log x ≤ 2(√x − 1)`). -/
theorem log_le_two_sqrt {x : ℝ} (hx : 1 ≤ x) : Real.log x ≤ 2 * Real.sqrt x := by
  have hs : 0 < Real.sqrt x := Real.sqrt_pos.mpr (by linarith)
  have h1 : Real.log x = 2 * Real.log (Real.sqrt x) := by
    have : (2 : ℝ) * Real.log (Real.sqrt x) = Real.log ((Real.sqrt x) ^ 2) := by
      rw [Real.log_pow]; norm_num
    rw [this, Real.sq_sqrt (by linarith)]
  rw [h1]
  have := Real.log_le_sub_one_of_pos hs
  linarith

/-- `1/(d √d) ≤ 2 (1/√(d−1) − 1/√d)` for `d ≥ 2`. -/
theorem inv_mul_sqrt_le (d : ℕ) (hd : 2 ≤ d) :
    (1 : ℝ) / ((d : ℝ) * Real.sqrt d) ≤ 2 * (1 / Real.sqrt ((d : ℝ) - 1) - 1 / Real.sqrt d) := by
  have hd1 : (0 : ℝ) < (d : ℝ) - 1 := by
    have : (2 : ℝ) ≤ d := by exact_mod_cast hd
    linarith
  have hd0 : (0 : ℝ) < d := by linarith
  set a := Real.sqrt ((d : ℝ) - 1) with ha
  set b := Real.sqrt d with hb
  have ha0 : 0 < a := Real.sqrt_pos.mpr hd1
  have hb0 : 0 < b := Real.sqrt_pos.mpr hd0
  have hab : a < b := Real.sqrt_lt_sqrt hd1.le (by linarith)
  have ha2 : a ^ 2 = (d : ℝ) - 1 := Real.sq_sqrt hd1.le
  have hb2 : b ^ 2 = d := Real.sq_sqrt hd0.le
  -- `1/a − 1/b = (b − a)/(ab) = 1/(ab(a+b))` since `b² − a² = 1`; and `ab(a+b) ≤ 2 b · b² = 2 d b`
  have hdiff : 1 / a - 1 / b = 1 / (a * b * (a + b)) := by
    field_simp
    nlinarith
  rw [hdiff]
  have hle : a * b * (a + b) ≤ 2 * ((d : ℝ) * b) := by
    have : a * b * (a + b) ≤ b * b * (b + b) := by
      apply mul_le_mul (mul_le_mul_of_nonneg_right hab.le hb0.le) (by linarith) (by positivity) (by positivity)
    nlinarith [hb2]
  calc (1 : ℝ) / ((d : ℝ) * b) = 2 * (1 / (2 * ((d : ℝ) * b))) := by field_simp
    _ ≤ 2 * (1 / (a * b * (a + b))) := by
        apply mul_le_mul_of_nonneg_left _ (by norm_num)
        exact one_div_le_one_div_of_le (by positivity) hle


/-- Partial sums `A(n) = ∑_{d ≤ n} a d`. -/
noncomputable def Apart (a : ℕ → ℝ) (n : ℕ) : ℝ := ∑ d ∈ Icc 1 n, a d

/-- **Discrete Abel identity.** For `H ≤ X`,
`∑_{H<d≤X} a d / d = ∑_{H<d≤X} (A(d) − A(H))/(d(d+1)) + (A(X) − A(H))/(X+1)`. -/
theorem sum_Ioc_div_eq (a : ℕ → ℝ) (H X : ℕ) (hHX : H ≤ X) :
    ∑ d ∈ Ioc H X, a d / d =
      ∑ d ∈ Ioc H X, (Apart a d - Apart a H) / ((d : ℝ) * (d + 1)) + (Apart a X - Apart a H) / ((X : ℝ) + 1) := by
  induction X, hHX using Nat.le_induction with
  | base => simp
  | succ X hHX ih =>
    rw [Finset.sum_Ioc_succ_top (by omega), Finset.sum_Ioc_succ_top (by omega), ih]
    have hA : Apart a (X + 1) = Apart a X + a (X + 1) := by
      unfold Apart
      rw [Finset.sum_Icc_succ_top (by omega)]
    rw [hA]
    have hX1 : (X : ℝ) + 1 ≠ 0 := by positivity
    have hX2 : (X : ℝ) + 1 + 1 ≠ 0 := by positivity
    push_cast
    field_simp
    ring

/-- Bound for the summand of the Abel sum, from `|A(n) − L log n| ≤ K` and `log x ≤ 2√x`:
for `1 ≤ H < d`, `|A(d) − A(H)| ≤ 2K + 2|L| √(d/H)`. -/
theorem abs_Apart_sub_le (a : ℕ → ℝ) (L K : ℝ)
    (hA : ∀ n : ℕ, 1 ≤ n → |Apart a n - L * Real.log n| ≤ K) {H d : ℕ} (hH : 1 ≤ H) (hd : H < d) :
    |Apart a d - Apart a H| ≤ 2 * K + 2 * |L| * Real.sqrt ((d : ℝ) / H) := by
  have h1 := hA d (by omega)
  have h2 := hA H hH
  have hH0 : (0 : ℝ) < H := by exact_mod_cast hH
  have hd0 : (0 : ℝ) < d := by exact_mod_cast (by omega : 0 < d)
  have hlog : Real.log d - Real.log H = Real.log ((d : ℝ) / H) := by
    rw [Real.log_div hd0.ne' hH0.ne']
  have hratio : (1 : ℝ) ≤ (d : ℝ) / H := by
    rw [le_div_iff₀ hH0]
    have : (H : ℝ) ≤ d := by exact_mod_cast hd.le
    linarith
  have hlogle : Real.log ((d : ℝ) / H) ≤ 2 * Real.sqrt ((d : ℝ) / H) := log_le_two_sqrt hratio
  have hlog0 : 0 ≤ Real.log ((d : ℝ) / H) := Real.log_nonneg hratio
  calc |Apart a d - Apart a H|
      = |(Apart a d - L * Real.log d) - (Apart a H - L * Real.log H) + L * (Real.log d - Real.log H)| := by
        ring_nf
    _ ≤ |Apart a d - L * Real.log d| + |Apart a H - L * Real.log H| + |L| * |Real.log d - Real.log H| := by
        have := abs_add_three (Apart a d - L * Real.log d) (-(Apart a H - L * Real.log H))
          (L * (Real.log d - Real.log H))
        rw [abs_neg, abs_mul] at this
        convert this using 2 <;> ring
    _ ≤ K + K + |L| * (2 * Real.sqrt ((d : ℝ) / H)) := by
        gcongr
        rw [hlog, abs_of_nonneg hlog0]
        exact hlogle
    _ = 2 * K + 2 * |L| * Real.sqrt ((d : ℝ) / H) := by ring

/-- `√(d/H)/(d(d+1)) ≤ (1/√H) · 1/(d √d)`. -/
theorem sqrt_ratio_div_le {H d : ℕ} (hH : 1 ≤ H) (hd : 1 ≤ d) :
    Real.sqrt ((d : ℝ) / H) / ((d : ℝ) * (d + 1)) ≤ (1 / Real.sqrt H) * (1 / ((d : ℝ) * Real.sqrt d)) := by
  have hH0 : (0 : ℝ) < H := by exact_mod_cast hH
  have hd0 : (0 : ℝ) < d := by exact_mod_cast hd
  have hsH : 0 < Real.sqrt H := Real.sqrt_pos.mpr hH0
  have hsd : 0 < Real.sqrt d := Real.sqrt_pos.mpr hd0
  rw [Real.sqrt_div' _ hH0.le]
  have hr : (1 / Real.sqrt H) * (1 / ((d : ℝ) * Real.sqrt d)) = 1 / (Real.sqrt H * ((d : ℝ) * Real.sqrt d)) := by
    rw [one_div_mul_one_div]
  rw [hr, div_le_div_iff₀ (by positivity) (by positivity)]
  have hsd2 : Real.sqrt d * Real.sqrt d = d := Real.mul_self_sqrt hd0.le
  have e : Real.sqrt d / Real.sqrt H * (Real.sqrt H * ((d : ℝ) * Real.sqrt d))
      = (Real.sqrt d * Real.sqrt d) * d * (Real.sqrt H / Real.sqrt H) := by ring
  rw [e, hsd2, div_self hsH.ne', mul_one]
  nlinarith

/-- Telescoping bound: `∑_{H<d≤X} 1/(d√d) ≤ 2/√H` for `H ≥ 1`. -/
theorem sum_Ioc_inv_mul_sqrt_le {H : ℕ} (hH : 1 ≤ H) (X : ℕ) :
    ∑ d ∈ Ioc H X, (1 : ℝ) / ((d : ℝ) * Real.sqrt d) ≤ 2 / Real.sqrt H := by
  rcases Nat.lt_or_ge X H with hX | hX
  · rw [Finset.Ioc_eq_empty (by omega), Finset.sum_empty]; positivity
  have hH0 : (0 : ℝ) < H := by exact_mod_cast hH
  have key : ∀ X, H ≤ X → ∑ d ∈ Ioc H X, (1 : ℝ) / ((d : ℝ) * Real.sqrt d)
      ≤ 2 * (1 / Real.sqrt H - 1 / Real.sqrt X) := by
    intro X hX
    induction X, hX using Nat.le_induction with
    | base => simp
    | succ X hHX ih =>
      rw [Finset.sum_Ioc_succ_top (by omega)]
      have := inv_mul_sqrt_le (X + 1) (by omega)
      push_cast at this ⊢
      have e : (X : ℝ) + 1 - 1 = X := by ring
      rw [e] at this
      linarith
  have h := key X hX
  have h0 : (0 : ℝ) ≤ 1 / Real.sqrt X := by positivity
  have e : (2 : ℝ) / Real.sqrt H = 2 * (1 / Real.sqrt H) := by ring
  rw [e]
  linarith

/-- The boundary term tends to `0`. -/
theorem tendsto_boundary (a : ℕ → ℝ) (L K : ℝ)
    (hA : ∀ n : ℕ, 1 ≤ n → |Apart a n - L * Real.log n| ≤ K) (H : ℕ) :
    Tendsto (fun X : ℕ => (Apart a X - Apart a H) / ((X : ℝ) + 1)) atTop (𝓝 0) := by
  -- `|A(X) − A(H)| ≤ 2|L|√X + (K + |A(H)|)` for `X ≥ 1`, and both `√X/(X+1)`, `1/(X+1) → 0`
  have hbound : ∀ X : ℕ, 1 ≤ X → |(Apart a X - Apart a H) / ((X : ℝ) + 1)| ≤
      2 * |L| * (Real.sqrt X / ((X : ℝ) + 1)) + (K + |Apart a H|) * (1 / ((X : ℝ) + 1)) := by
    intro X hX
    have hX0 : (0 : ℝ) < X := by exact_mod_cast hX
    have h1 := hA X hX
    have hlog : |Real.log X| ≤ 2 * Real.sqrt X := by
      rw [abs_of_nonneg (Real.log_nonneg (by exact_mod_cast hX))]
      exact log_le_two_sqrt (by exact_mod_cast hX)
    rw [abs_div, abs_of_pos (by positivity : (0:ℝ) < (X : ℝ) + 1)]
    have : |Apart a X - Apart a H| ≤ 2 * |L| * Real.sqrt X + (K + |Apart a H|) := by
      calc |Apart a X - Apart a H| ≤ |Apart a X| + |Apart a H| := abs_sub _ _
        _ ≤ (|Apart a X - L * Real.log X| + |L| * |Real.log X|) + |Apart a H| := by
            gcongr
            calc |Apart a X| = |(Apart a X - L * Real.log X) + L * Real.log X| := by ring_nf
              _ ≤ |Apart a X - L * Real.log X| + |L * Real.log X| := abs_add_le _ _
              _ = _ := by rw [abs_mul]
        _ ≤ (K + |L| * (2 * Real.sqrt X)) + |Apart a H| := by gcongr
        _ = 2 * |L| * Real.sqrt X + (K + |Apart a H|) := by ring
    rw [div_le_iff₀ (by positivity)]
    calc |Apart a X - Apart a H| ≤ 2 * |L| * Real.sqrt X + (K + |Apart a H|) := this
      _ = (2 * |L| * (Real.sqrt X / ((X : ℝ) + 1)) + (K + |Apart a H|) * (1 / ((X : ℝ) + 1))) * ((X : ℝ) + 1) := by
          field_simp
  have h1 : Tendsto (fun X : ℕ => Real.sqrt X / ((X : ℝ) + 1)) atTop (𝓝 0) := by
    -- `√X/(X+1) ≤ 1/√X → 0`
    have hle : ∀ X : ℕ, 1 ≤ X → |Real.sqrt X / ((X : ℝ) + 1)| ≤ (Real.sqrt X)⁻¹ := by
      intro X hX
      have hX0 : (0 : ℝ) < X := by exact_mod_cast hX
      have hs : 0 < Real.sqrt X := Real.sqrt_pos.mpr hX0
      rw [abs_of_nonneg (by positivity), ← one_div, div_le_div_iff₀ (by positivity) hs,
        Real.mul_self_sqrt hX0.le]
      linarith
    have h0 : Tendsto (fun X : ℕ => (Real.sqrt (X : ℝ))⁻¹) atTop (𝓝 0) :=
      tendsto_inv_atTop_zero.comp (Real.tendsto_sqrt_atTop.comp tendsto_natCast_atTop_atTop)
    exact squeeze_zero_norm' (Filter.eventually_atTop.mpr ⟨1, fun X hX => by
      simpa only [Real.norm_eq_abs] using hle X hX⟩) h0
  have h2 : Tendsto (fun X : ℕ => 1 / ((X : ℝ) + 1)) atTop (𝓝 0) :=
    tendsto_one_div_add_atTop_nhds_zero_nat
  have := (h1.const_mul (2 * |L|)).add (h2.const_mul (K + |Apart a H|))
  simp only [mul_zero, add_zero] at this
  exact squeeze_zero_norm' (Filter.eventually_atTop.mpr ⟨1, fun X hX => by
    simpa only [Real.norm_eq_abs] using hbound X hX⟩) this

/-- **The tail bound.** If `|A(n) − L log n| ≤ K` for `n ≥ 1` and `∑ |a d|/d < ∞`, then for `H ≥ 1`
`|∑_{d > H} a d / d| ≤ (2K + 4|L|)/H`. -/
theorem tail_div_le (a : ℕ → ℝ) (L K : ℝ)
    (hA : ∀ n : ℕ, 1 ≤ n → |Apart a n - L * Real.log n| ≤ K)
    (hs : Summable (fun d : ℕ => |a d| / d)) {H : ℕ} (hH : 1 ≤ H) :
    |∑' d : ℕ, (if H < d then a d / d else 0)| ≤ (2 * K + 4 * |L|) / H := by
  have hH0 : (0 : ℝ) < H := by exact_mod_cast hH
  set g : ℕ → ℝ := fun d => if H < d then a d / d else 0 with hg
  have hgs : Summable g := by
    refine hs.of_norm_bounded fun d => ?_
    simp only [hg, Real.norm_eq_abs]
    split_ifs
    · rw [abs_div, abs_of_nonneg (Nat.cast_nonneg d : (0:ℝ) ≤ (d : ℝ))]
    · rw [abs_zero]; positivity
  -- partial sums: `∑_{d < n} g d = ∑_{H < d ≤ n − 1} a d / d`
  have hpartial : ∀ n : ℕ, H + 1 ≤ n → ∑ d ∈ range n, g d = ∑ d ∈ Ioc H (n - 1), a d / d := by
    intro n hn
    have hset : (range n).filter (fun d => H < d) = Ioc H (n - 1) := by
      ext d
      simp only [mem_filter, mem_range, mem_Ioc]
      omega
    rw [← hset, Finset.sum_filter]
  -- the bound for each partial sum
  have hbound : ∀ X : ℕ, H ≤ X → |∑ d ∈ Ioc H X, a d / d| ≤
      (2 * K + 4 * |L|) / H + |(Apart a X - Apart a H) / ((X : ℝ) + 1)| := by
    intro X hX
    rw [sum_Ioc_div_eq a H X hX]
    refine le_trans (abs_add_le _ _) ?_
    gcongr
    -- `|∑ (A(d) − A(H))/(d(d+1))| ≤ ∑ (2K + 2|L|√(d/H))/(d(d+1)) ≤ 2K/(H+1) + 4|L|/H`
    calc |∑ d ∈ Ioc H X, (Apart a d - Apart a H) / ((d : ℝ) * (d + 1))|
        ≤ ∑ d ∈ Ioc H X, |Apart a d - Apart a H| / ((d : ℝ) * (d + 1)) := by
          refine le_trans (Finset.abs_sum_le_sum_abs _ _) (le_of_eq ?_)
          refine Finset.sum_congr rfl fun d hd => ?_
          have hd0 : (0 : ℝ) < d := by
            exact_mod_cast lt_of_le_of_lt (Nat.zero_le H) (mem_Ioc.mp hd).1
          rw [abs_div, abs_of_pos (mul_pos hd0 (by linarith))]
      _ ≤ ∑ d ∈ Ioc H X, ((2 * K) / ((d : ℝ) * (d + 1))
            + 2 * |L| * ((1 / Real.sqrt H) * (1 / ((d : ℝ) * Real.sqrt d)))) := by
          refine Finset.sum_le_sum fun d hd => ?_
          have hd' := mem_Ioc.mp hd
          have hd0 : (0 : ℝ) < (d : ℝ) * (d + 1) := by
            have : (0:ℝ) < d := by exact_mod_cast (by omega : 0 < d)
            positivity
          calc |Apart a d - Apart a H| / ((d : ℝ) * (d + 1))
              ≤ (2 * K + 2 * |L| * Real.sqrt ((d : ℝ) / H)) / ((d : ℝ) * (d + 1)) := by
                gcongr
                exact abs_Apart_sub_le a L K hA hH hd'.1
            _ = 2 * K / ((d : ℝ) * (d + 1)) + 2 * |L| * (Real.sqrt ((d : ℝ) / H) / ((d : ℝ) * (d + 1))) := by
                ring
            _ ≤ _ := by
                gcongr
                exact sqrt_ratio_div_le hH (by omega)
      _ = 2 * K * ∑ d ∈ Ioc H X, 1 / ((d : ℝ) * (d + 1))
            + 2 * |L| * (1 / Real.sqrt H) * ∑ d ∈ Ioc H X, 1 / ((d : ℝ) * Real.sqrt d) := by
          rw [Finset.sum_add_distrib, Finset.mul_sum, Finset.mul_sum]
          congr 1
          · refine Finset.sum_congr rfl fun d _ => ?_; ring
          · refine Finset.sum_congr rfl fun d _ => ?_; ring
      _ ≤ 2 * K * (1 / ((H : ℝ) + 1)) + 2 * |L| * (1 / Real.sqrt H) * (2 / Real.sqrt H) := by
          have hK : 0 ≤ K := by
            have := hA 1 le_rfl
            exact le_trans (abs_nonneg _) this
          gcongr
          · rw [sum_Ioc_one_div_mul_succ H X hX]
            have : (0:ℝ) ≤ 1 / ((X : ℝ) + 1) := by positivity
            linarith
          · exact sum_Ioc_inv_mul_sqrt_le hH X
      _ = 2 * K / ((H : ℝ) + 1) + 4 * |L| / H := by
          have hs : Real.sqrt H * Real.sqrt H = H := Real.mul_self_sqrt hH0.le
          have hsH : Real.sqrt H ≠ 0 := (Real.sqrt_pos.mpr hH0).ne'
          have e : 2 * |L| * (1 / Real.sqrt H) * (2 / Real.sqrt H)
              = 4 * |L| / (Real.sqrt H * Real.sqrt H) := by
            rw [div_eq_mul_inv, div_eq_mul_inv, div_eq_mul_inv, mul_inv]
            ring
          rw [e, hs]
          ring
      _ ≤ (2 * K + 4 * |L|) / H := by
          have hK : 0 ≤ K := by
            have := hA 1 le_rfl
            exact le_trans (abs_nonneg _) this
          rw [add_div]
          gcongr
          exact le_trans (by linarith) (le_refl ((H : ℝ) + 1))
  -- pass to the limit
  have htend : Tendsto (fun n : ℕ => |∑ d ∈ range n, g d|) atTop (𝓝 |∑' d, g d|) :=
    (hgs.hasSum.tendsto_sum_nat).abs
  have hlim : Tendsto (fun n : ℕ => (2 * K + 4 * |L|) / H + |(Apart a (n - 1) - Apart a H) / (((n - 1 : ℕ) : ℝ) + 1)|)
      atTop (𝓝 ((2 * K + 4 * |L|) / H + |0|)) := by
    apply Tendsto.const_add
    apply Tendsto.abs
    exact (tendsto_boundary a L K hA H).comp (tendsto_sub_atTop_nat 1)
  rw [abs_zero, add_zero] at hlim
  refine le_of_tendsto_of_tendsto' htend hlim fun n => ?_
  rcases Nat.lt_or_ge n (H + 1) with hn | hn
  · -- small `n`: the partial sum is `0`
    have : ∑ d ∈ range n, g d = 0 := by
      apply Finset.sum_eq_zero
      intro d hd
      simp only [hg, mem_range] at hd ⊢
      rw [if_neg (by omega)]
    rw [this, abs_zero]
    have hK : 0 ≤ K := le_trans (abs_nonneg _) (hA 1 le_rfl)
    exact add_nonneg (div_nonneg (by linarith [abs_nonneg L]) hH0.le) (abs_nonneg _)
  · rw [hpartial n hn]
    exact hbound (n - 1) (by omega)

end PairSingularSeries
