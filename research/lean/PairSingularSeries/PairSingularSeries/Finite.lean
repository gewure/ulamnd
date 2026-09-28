import PairSingularSeries.Bracket

/-!
# The finite identities in `h` (paper I, proofs of Theorems 1 and 5)

* `Tfac_eq`:        `T_p(h) = E_p² (1 + g_p(h))` whenever `ω_f(p) ≠ p` and `p ≥ 2`   (L3).
* `sum_weight_nu`:  for any weight `w`, `∑_{h≤H} w(h) ν_f(d,h) = ∑_{s,s'} ∑_{h≤H, h≡s'-s} w(h)`.
* `sum_nu`:         `∑_{h≤H} ν_f(d,h) = ω_f(d)² H/d + Ψ_d(H)`                          (L4).
* `sum_nu_weighted`:`∑_{h≤H} (H-h) ν_f(d,h) = ω_f(d)² H²/(2d) + ∑_{s,s'} B_d(s'-s)`      (L6).
* `psi_zero`:       `ψ_d(0, H) = -{H/d}`                                                (L9′).
-/

namespace PairSingularSeries

open Finset Polynomial

/-! ### Evaluation respects congruences -/

/-- If `d ∣ a - b` then `d ∣ f(a) - f(b)`. -/
theorem dvd_eval_sub_eval (f : ℤ[X]) {d a b : ℤ} (h : d ∣ a - b) : d ∣ f.eval a - f.eval b :=
  dvd_trans h (Polynomial.sub_dvd_eval_sub a b f)

/-- If `d ∣ a - b` then `d ∣ f(a) ↔ d ∣ f(b)`. -/
theorem dvd_eval_iff (f : ℤ[X]) {d a b : ℤ} (h : d ∣ a - b) : d ∣ f.eval a ↔ d ∣ f.eval b := by
  have hs := dvd_eval_sub_eval f h
  constructor
  · intro ha
    have := dvd_sub ha hs
    simpa using this
  · intro hb
    have := dvd_add hb hs
    simpa using this

/-! ### The unique representative of a residue class in `[0, d)` -/

/-- Among `s ∈ [0, d)`, exactly one satisfies `d ∣ s - y`, namely `(y % d).toNat`. -/
theorem filter_range_dvd_eq_singleton (d : ℕ) (hd : 1 ≤ d) (y : ℤ) :
    (range d).filter (fun s : ℕ => (d : ℤ) ∣ (s : ℤ) - y) = {(y % (d : ℤ)).toNat} := by
  have hd0 : (0 : ℤ) < d := by exact_mod_cast hd
  ext s
  simp only [mem_filter, mem_range, mem_singleton]
  constructor
  · rintro ⟨hs, hdvd⟩
    have hmod : y % (d : ℤ) = (s : ℤ) % d := by
      have h1 : (s : ℤ) ≡ y [ZMOD d] := (Int.modEq_iff_dvd.mpr hdvd).symm
      exact h1.symm
    have hs' : (s : ℤ) % d = s := Int.emod_eq_of_lt (by omega) (by exact_mod_cast hs)
    rw [hmod, hs']
    simp
  · rintro rfl
    have h0 : 0 ≤ y % (d : ℤ) := Int.emod_nonneg y (by omega)
    have h1 : y % (d : ℤ) < d := Int.emod_lt_of_pos y hd0
    refine ⟨?_, ?_⟩
    · have : ((y % (d : ℤ)).toNat : ℤ) < d := by rw [Int.toNat_of_nonneg h0]; exact h1
      exact_mod_cast this
    · rw [Int.toNat_of_nonneg h0]
      -- `y % d - y = -(d * (y / d))`
      have := Int.emod_def y (d : ℤ)
      exact ⟨-(y / d), by linarith⟩

/-- `∑_{s' root mod d} 1[d ∣ s' - y] = 1[d ∣ f(y)]`: the unique representative of `y` is a root
iff `d ∣ f(y)`. -/
theorem sum_roots_indicator (f : ℤ[X]) (d : ℕ) (hd : 1 ≤ d) (y : ℤ) :
    ∑ s' ∈ roots f d, (if (d : ℤ) ∣ (s' : ℤ) - y then (1 : ℝ) else 0) =
      if (d : ℤ) ∣ f.eval y then 1 else 0 := by
  rw [Finset.sum_boole]
  unfold roots
  simp only [Finset.filter_filter]
  have key : (range d).filter (fun a : ℕ => (d : ℤ) ∣ f.eval (a : ℤ) ∧ (d : ℤ) ∣ (a : ℤ) - y) =
      ((range d).filter (fun s : ℕ => (d : ℤ) ∣ (s : ℤ) - y)).filter
        (fun a : ℕ => (d : ℤ) ∣ f.eval (a : ℤ)) := by
    rw [Finset.filter_filter]
    exact Finset.filter_congr fun a _ => and_comm
  rw [key, filter_range_dvd_eq_singleton d hd y, Finset.filter_singleton]
  have h0 : 0 ≤ y % (d : ℤ) := Int.emod_nonneg y (by omega)
  have hcong : (d : ℤ) ∣ (((y % (d : ℤ)).toNat : ℕ) : ℤ) - y := by
    rw [Int.toNat_of_nonneg h0]
    have := Int.emod_def y (d : ℤ)
    exact ⟨-(y / d), by linarith⟩
  have hiff : (d : ℤ) ∣ f.eval (((y % (d : ℤ)).toNat : ℕ) : ℤ) ↔ (d : ℤ) ∣ f.eval y :=
    dvd_eval_iff f hcong
  by_cases hy : (d : ℤ) ∣ f.eval y
  · rw [if_pos (hiff.mpr hy), if_pos hy]
    simp
  · rw [if_neg (mt hiff.mp hy), if_neg hy]
    simp

/-! ### `ν` as a sum over root pairs -/

/-- `ν_f(d,h) = ∑_{s root} 1[d ∣ f(s + h)]`. -/
theorem nu_eq_sum (f : ℤ[X]) (d : ℕ) (h : ℤ) :
    (nu f d h : ℝ) = ∑ s ∈ roots f d, (if (d : ℤ) ∣ f.eval ((s : ℤ) + h) then (1 : ℝ) else 0) := by
  rw [Finset.sum_boole]
  unfold nu roots
  rw [Finset.filter_filter]

/-- `ν_f(d,h) = ∑_{s,s' roots} 1[d ∣ s' - (s + h)]`. -/
theorem nu_eq_double_sum (f : ℤ[X]) (d : ℕ) (hd : 1 ≤ d) (h : ℤ) :
    (nu f d h : ℝ) =
      ∑ s ∈ roots f d, ∑ s' ∈ roots f d,
        (if (d : ℤ) ∣ (s' : ℤ) - ((s : ℤ) + h) then (1 : ℝ) else 0) := by
  rw [nu_eq_sum]
  refine Finset.sum_congr rfl fun s _ => ?_
  rw [sum_roots_indicator f d hd]

/-- **The weighted sum over `h` of `ν_f(d, h)`, as a sum over root pairs.** For any weight `w`,
`∑_{h ≤ H} w(h) ν_f(d,h) = ∑_{s,s'} ∑_{h ≤ H, d ∣ h - (s' - s)} w(h)`. -/
theorem sum_weight_nu (f : ℤ[X]) (d : ℕ) (hd : 1 ≤ d) (H : ℕ) (w : ℕ → ℝ) :
    ∑ h ∈ Icc 1 H, w h * (nu f d h : ℝ) =
      ∑ s ∈ roots f d, ∑ s' ∈ roots f d,
        ∑ h ∈ (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - ((s' : ℤ) - s)), w h := by
  simp_rw [nu_eq_double_sum f d hd, Finset.mul_sum]
  rw [Finset.sum_comm]
  refine Finset.sum_congr rfl fun s _ => ?_
  rw [Finset.sum_comm]
  refine Finset.sum_congr rfl fun s' _ => ?_
  rw [Finset.sum_filter]
  refine Finset.sum_congr rfl fun h _ => ?_
  have hiff : (d : ℤ) ∣ (h : ℤ) - ((s' : ℤ) - s) ↔ (d : ℤ) ∣ (s' : ℤ) - ((s : ℤ) + h) := by
    rw [← dvd_neg]
    constructor <;> intro hh <;> convert hh using 1 <;> ring
  by_cases hh : (d : ℤ) ∣ (h : ℤ) - ((s' : ℤ) - s)
  · simp [hh, hiff.mp hh]
  · simp [hh, mt hiff.mpr hh]

/-- **L4.** `∑_{h ≤ H} ν_f(d,h) = ω_f(d)² H/d + Ψ_d(H)`. -/
theorem sum_nu (f : ℤ[X]) (d : ℕ) (hd : 1 ≤ d) (H : ℕ) :
    ∑ h ∈ Icc 1 H, (nu f d h : ℝ) = (omega f d : ℝ) ^ 2 * H / d + Psi f d H := by
  have := sum_weight_nu f d hd H (fun _ => 1)
  simp only [one_mul] at this
  rw [this]
  unfold Psi psi
  have hcard : (roots f d).card = omega f d := rfl
  simp only [Finset.sum_const, nsmul_eq_mul, mul_one, Finset.sum_sub_distrib, hcard]
  ring

/-- **L9′.** `ψ_d(0, H) = -{H/d}`. -/
theorem psi_zero (d H : ℕ) (hd : 1 ≤ d) : psi d 0 H = -Int.fract ((H : ℝ) / d) := by
  unfold psi
  have hfilt : (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - 0) =
      (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - (d : ℤ)) := by
    apply Finset.filter_congr
    intro h _
    constructor
    · intro hh; have := dvd_sub hh (dvd_refl (d : ℤ)); simpa using this
    · intro hh; have := dvd_add hh (dvd_refl (d : ℤ)); simpa using this
  have hinj : Function.Injective (fun k : ℕ => d + k * d) := by
    intro x y hxy
    have hxy' : d + x * d = d + y * d := hxy
    have hd' : 0 < d := hd
    exact Nat.eq_of_mul_eq_mul_right hd' (by omega)
  rw [hfilt, class_eq_image d d H hd hd le_rfl, Finset.card_image_of_injective _ hinj,
    Finset.card_range]
  have hd0 : (d : ℝ) ≠ 0 := by exact_mod_cast (by omega : d ≠ 0)
  have hfl := floor_eq d d H hd le_rfl
  have h1 : ((H : ℝ) - d) / d = (H : ℝ) / d - 1 := by field_simp
  rw [h1, Int.floor_sub_one] at hfl
  have hK : (⌊(H : ℝ) / d⌋ : ℝ) = (K d d H : ℝ) := by
    have : ⌊(H : ℝ) / d⌋ = (K d d H : ℤ) := by linarith [hfl]
    rw [this]; simp
  rw [← Int.self_sub_floor, hK]
  ring

/-- **L6.** `∑_{h ≤ H} (H - h) ν_f(d,h) = ω_f(d)² H²/(2d) + ∑_{s,s'} B_d(s' - s)`. -/
theorem sum_nu_weighted (f : ℤ[X]) (d : ℕ) (hd : 1 ≤ d) (H : ℕ) :
    ∑ h ∈ Icc 1 H, ((H : ℝ) - h) * (nu f d h : ℝ) =
      (omega f d : ℝ) ^ 2 * (H : ℝ) ^ 2 / (2 * d)
        + ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H := by
  rw [sum_weight_nu f d hd H (fun h => (H : ℝ) - h)]
  have hB : ∀ s s' : ℕ,
      ∑ h ∈ (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - ((s' : ℤ) - s)), ((H : ℝ) - h)
        = B d ((s' : ℤ) - s) H + (H : ℝ) ^ 2 / (2 * d) := by
    intro s s'
    unfold B
    ring
  simp only [hB, Finset.sum_add_distrib, Finset.sum_const, nsmul_eq_mul]
  have hcard : (roots f d).card = omega f d := rfl
  rw [hcard]
  ring

/-- **L3.** `T_p(h) = E_p² (1 + g_p(h))` when `p ≥ 2` and `ω_f(p) ≠ p`. -/
theorem Tfac_eq (f : ℤ[X]) (p : ℕ) (h : ℤ) (hp : 2 ≤ p) (hω : (omega f p : ℝ) ≠ p) :
    Tfac f p h = Efac f p ^ 2 * (1 + gfac f p h) := by
  unfold Tfac Efac gfac
  have hp0 : (p : ℝ) ≠ 0 := by exact_mod_cast (by omega : p ≠ 0)
  have hp1 : (1 : ℝ) - 1 / p ≠ 0 := by
    have : (1 : ℝ) < p := by exact_mod_cast (by omega : 1 < p)
    have : 1 / (p : ℝ) < 1 := by rw [div_lt_one (by linarith)]; exact this
    linarith
  have hpω : (p : ℝ) - omega f p ≠ 0 := sub_ne_zero.mpr (Ne.symm hω)
  field_simp
  ring

end PairSingularSeries
