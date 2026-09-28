import PairSingularSeries.Bd

/-!
# The diagonal value, the bracket, and its bound (paper I, proof of Theorem 5)

* `B_diag`:      `B_d(d) = -H/2 + (d/2) φ({H/d})`.
* `bracket_eq`:  `B_d(m) + B_d(d - m) = -m(d-m)/d + (d/2)(φ({(H-m)/d}) + φ({(H+m)/d}))` for `1 ≤ m ≤ d-1`.
* `bracket_abs_le`: `|bracket| ≤ d/4` — for every `d ≥ 2`, not only `d ≤ H`.
* `phi_bounds`:  `0 ≤ φ(θ) ≤ 1/4` on `[0, 1)`.
-/

namespace PairSingularSeries

open Finset

/-- `0 ≤ φ(θ) ≤ 1/4` for `0 ≤ θ < 1`. -/
theorem phi_bounds {θ : ℝ} (h0 : 0 ≤ θ) (h1 : θ < 1) : 0 ≤ phi θ ∧ phi θ ≤ 1 / 4 := by
  unfold phi
  constructor
  · nlinarith
  · nlinarith [sq_nonneg (θ - 1 / 2)]

/-- The diagonal value `B_d(d) = -H/2 + (d/2) φ({H/d})`. -/
theorem B_diag (d H : ℕ) (hd : 1 ≤ d) :
    B d (d : ℤ) H = -(H : ℝ) / 2 + (d : ℝ) / 2 * phi (Int.fract ((H : ℝ) / d)) := by
  have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
  have h := B_closed d d H hd hd le_rfl
  have hfr : Int.fract (((H : ℝ) - d) / d) = Int.fract ((H : ℝ) / d) := by
    have : ((H : ℝ) - d) / d = (H : ℝ) / d - 1 := by field_simp
    rw [this, Int.fract_sub_one]
  rw [hfr] at h
  rw [h]
  field_simp
  ring

/-- The bracket identity: for `1 ≤ m ≤ d - 1`,
`B_d(m) + B_d(d - m) = -m(d-m)/d + (d/2)(φ({(H-m)/d}) + φ({(H+m)/d}))`. -/
theorem bracket_eq (d m H : ℕ) (hm1 : 1 ≤ m) (hmd : m < d) :
    B d (m : ℤ) H + B d ((d - m : ℕ) : ℤ) H = bracket d (m : ℤ) H := by
  have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
  have h1 := B_closed d m H (by omega) hm1 hmd.le
  have h2 := B_closed d (d - m) H (by omega) (by omega) (by omega)
  have hcast : ((d - m : ℕ) : ℝ) = (d : ℝ) - m := by
    rw [Nat.cast_sub hmd.le]
  rw [hcast] at h2
  have hfr : Int.fract (((H : ℝ) - ((d : ℝ) - m)) / d) = Int.fract (((H : ℝ) + m) / d) := by
    have : ((H : ℝ) - ((d : ℝ) - m)) / d = ((H : ℝ) + m) / d - 1 := by field_simp; ring
    rw [this, Int.fract_sub_one]
  rw [hfr] at h2
  unfold bracket
  push_cast
  rw [h1, h2]
  field_simp
  ring

/-- `|bracket| ≤ d/4` for `1 ≤ m ≤ d - 1` — valid for every `d`, not only `d ≤ H`. -/
theorem bracket_abs_le (d m H : ℕ) (hm1 : 1 ≤ m) (hmd : m < d) :
    |bracket d (m : ℤ) H| ≤ (d : ℝ) / 4 := by
  have hd0 : (0 : ℝ) < d := by exact_mod_cast (by omega : 0 < d)
  have hm0 : (0 : ℝ) < m := by exact_mod_cast hm1
  have hmd' : (m : ℝ) < d := by exact_mod_cast hmd
  -- the two `φ` values lie in `[0, 1/4]`
  have hφ1 := phi_bounds (Int.fract_nonneg (((H : ℝ) - m) / d)) (Int.fract_lt_one _)
  have hφ2 := phi_bounds (Int.fract_nonneg (((H : ℝ) + m) / d)) (Int.fract_lt_one _)
  -- `0 ≤ m(d - m)/d ≤ d/4`
  have hA0 : 0 ≤ (m : ℝ) * ((d : ℝ) - m) / d := by
    apply div_nonneg <;> nlinarith
  have hA1 : (m : ℝ) * ((d : ℝ) - m) / d ≤ (d : ℝ) / 4 := by
    rw [div_le_div_iff₀ hd0 (by norm_num : (0 : ℝ) < 4)]
    nlinarith [sq_nonneg (2 * (m : ℝ) - d)]
  -- `0 ≤ (d/2)(φ₁ + φ₂) ≤ d/4`
  have hB0 : 0 ≤ (d : ℝ) / 2 * (phi (Int.fract (((H : ℝ) - m) / d))
      + phi (Int.fract (((H : ℝ) + m) / d))) := by
    apply mul_nonneg (by linarith); linarith [hφ1.1, hφ2.1]
  have hB1 : (d : ℝ) / 2 * (phi (Int.fract (((H : ℝ) - m) / d))
      + phi (Int.fract (((H : ℝ) + m) / d))) ≤ (d : ℝ) / 4 := by
    have : phi (Int.fract (((H : ℝ) - m) / d)) + phi (Int.fract (((H : ℝ) + m) / d)) ≤ 1 / 2 := by
      linarith [hφ1.2, hφ2.2]
    calc (d : ℝ) / 2 * (phi (Int.fract (((H : ℝ) - m) / d)) + phi (Int.fract (((H : ℝ) + m) / d)))
        ≤ (d : ℝ) / 2 * (1 / 2) := by
          apply mul_le_mul_of_nonneg_left this; linarith
      _ = (d : ℝ) / 4 := by ring
  unfold bracket
  push_cast
  rw [neg_div, abs_le]
  constructor <;> linarith

end PairSingularSeries
