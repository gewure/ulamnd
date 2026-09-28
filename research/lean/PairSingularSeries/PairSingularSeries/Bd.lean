import PairSingularSeries.Defs

/-!
# The closed form of `B_d(m)` (paper I, proof of Theorem 5, "an elementary computation")

For `1 ≤ m ≤ d` and every `H ≥ 0` (also when `d > H`, and also when `m > H`):
  `B_d(m) = -Hm/d + m²/(2d) + H/2 - m/2 + (d/2) φ({(H - m)/d})`.
-/

namespace PairSingularSeries

open Finset

/-- The number of `h ∈ [1, H]` with `h ≡ m (mod d)`, for `1 ≤ m ≤ d`: it is `(H + d - m) / d`. -/
def K (d m H : ℕ) : ℕ := (H + d - m) / d

/-- The residue class `{1 ≤ h ≤ H : d ∣ h - m}` is `{m + k d : k < K}`. -/
theorem class_eq_image (d m H : ℕ) (hd : 1 ≤ d) (hm1 : 1 ≤ m) (hmd : m ≤ d) :
    (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - (m : ℤ)) =
      (range (K d m H)).image (fun k => m + k * d) := by
  ext h
  simp only [mem_filter, mem_Icc, mem_image, mem_range, K]
  constructor
  · rintro ⟨⟨h1, hH⟩, ⟨k, hk⟩⟩
    -- `h - m = d k` in `ℤ`; `k ≥ 0` because `h ≥ 1 > m - d`.
    have hk0 : 0 ≤ k := by
      by_cases h0 : 0 ≤ k
      · exact h0
      · exfalso
        have hneg : k < 0 := by omega
        have : (h : ℤ) - m ≤ -(d : ℤ) := by nlinarith
        omega
    obtain ⟨n, rfl⟩ := Int.eq_ofNat_of_zero_le hk0
    refine ⟨n, ?_, ?_⟩
    · have hle : m + n * d ≤ H := by
        have : (h : ℤ) = m + n * d := by linarith
        omega
      rw [Nat.lt_div_iff_mul_lt (by omega)]
      omega
    · have : (h : ℤ) = m + n * d := by linarith
      omega
  · rintro ⟨k, hk, rfl⟩
    rw [Nat.lt_div_iff_mul_lt (by omega)] at hk
    refine ⟨⟨by omega, by omega⟩, ⟨k, ?_⟩⟩
    push_cast
    ring

/-- `∑_{k < K} k = K (K - 1) / 2` in `ℝ`. -/
theorem gauss_real (n : ℕ) : ∑ k ∈ range n, (k : ℝ) = (n : ℝ) * ((n : ℝ) - 1) / 2 := by
  have hnat := Finset.sum_range_id_mul_two n
  rcases Nat.eq_zero_or_pos n with h0 | hpos
  · simp [h0]
  · have h := congrArg (fun x : ℕ => (x : ℝ)) hnat
    simp only [Nat.cast_mul, Nat.cast_sum, Nat.cast_ofNat, Nat.cast_sub hpos, Nat.cast_one] at h
    linarith

/-- The weighted count over the class: `∑_{k < K} (H - (m + k d)) = K(H - m) - d K(K-1)/2`. -/
theorem sum_class (d m H : ℕ) (hd : 1 ≤ d) (hm1 : 1 ≤ m) (hmd : m ≤ d) :
    ∑ h ∈ (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - (m : ℤ)), ((H : ℝ) - h) =
      (K d m H : ℝ) * ((H : ℝ) - m) - (d : ℝ) * ((K d m H : ℝ) * ((K d m H : ℝ) - 1) / 2) := by
  rw [class_eq_image d m H hd hm1 hmd, sum_image]
  · simp only [Nat.cast_add, Nat.cast_mul]
    rw [Finset.sum_sub_distrib, Finset.sum_add_distrib, ← Finset.sum_mul, gauss_real]
    simp only [sum_const, card_range, nsmul_eq_mul]
    ring
  · intro x _ y _ hxy
    have hd' : 0 < d := hd
    have hxy' : m + x * d = m + y * d := hxy
    have : x * d = y * d := by omega
    exact Nat.eq_of_mul_eq_mul_right hd' this

/-- `⌊(H - m)/d⌋ = K - 1`. -/
theorem floor_eq (d m H : ℕ) (hd : 1 ≤ d) (hmd : m ≤ d) :
    ⌊(((H : ℝ) - m) / d)⌋ = (K d m H : ℤ) - 1 := by
  unfold K
  set k := (H + d - m) / d with hk
  have hd0 : (0 : ℝ) < d := by exact_mod_cast hd
  have hdiv := Nat.div_add_mod (H + d - m) d
  have hmod := Nat.mod_lt (H + d - m) (by omega : d > 0)
  rw [← hk] at hdiv
  have hsub : ((H + d - m : ℕ) : ℝ) = (H : ℝ) + d - m := by
    rw [Nat.cast_sub (by omega)]; push_cast; ring
  have hlo' : d * k ≤ H + d - m := by omega
  have hhi' : H + d - m < d * k + d := by omega
  have hlo : (d : ℝ) * (k : ℝ) ≤ (H : ℝ) + d - m := by
    rw [← hsub]; exact_mod_cast hlo'
  have hhi : (H : ℝ) + d - m < (d : ℝ) * (k : ℝ) + d := by
    rw [← hsub]; exact_mod_cast hhi'
  rw [Int.floor_eq_iff]
  simp only [Int.cast_sub, Int.cast_one, Int.cast_natCast]
  constructor
  · rw [le_div_iff₀ hd0]; linarith
  · rw [div_lt_iff₀ hd0]; linarith

/-- **The closed form of `B_d(m)`** (paper I, proof of Theorem 5). Valid for `1 ≤ m ≤ d`, all `H`. -/
theorem B_closed (d m H : ℕ) (hd : 1 ≤ d) (hm1 : 1 ≤ m) (hmd : m ≤ d) :
    B d m H = -((H : ℝ) * m) / d + (m : ℝ) ^ 2 / (2 * d) + (H : ℝ) / 2 - (m : ℝ) / 2
      + (d : ℝ) / 2 * phi (Int.fract (((H : ℝ) - m) / d)) := by
  unfold B
  rw [sum_class d m H hd hm1 hmd]
  set θ := Int.fract (((H : ℝ) - m) / d) with hθ
  have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
  have hHm : (H : ℝ) - m = (d : ℝ) * ((K d m H : ℝ) - 1 + θ) := by
    have hf := Int.floor_add_fract (((H : ℝ) - m) / d)
    rw [floor_eq d m H hd hmd, ← hθ] at hf
    push_cast at hf
    field_simp at hf
    linarith
  have hH : (H : ℝ) = m + (d : ℝ) * ((K d m H : ℝ) - 1 + θ) := by linarith
  unfold phi
  rw [hH]
  field_simp
  ring

end PairSingularSeries
