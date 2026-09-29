import PairSingularSeries.Asymptotic

/-!
# Theorem 5(ii) of paper I as an asymptotic equivalence

Under the hypotheses of `smoothed`, the Cesàro sum has the leading term `−½ C log H`, in the sense
`∑_{h≤H}(1 − h/H)(S_f(h) − C²) + ½ C log H = o(log H)`, if and only if `Off*_f(H) = o(H log H)`.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology Asymptotics

variable {f : ℤ[X]}

/-- **Theorem 5(ii).** The Cesàro leading term holds iff `Off*_f(H) = o(H log H)`. -/
theorem smoothed_iff (hf : Admissible f) {C : ℝ} (hC : Tendsto (Cpartial f) atTop (𝓝 C)) (hCpos : 0 < C)
    {K₂ : ℝ} (hdir : ∀ n : ℕ, 1 ≤ n → |(∑ d ∈ Icc 1 n, a f d) - C⁻¹ * Real.log n| ≤ K₂)
    {K₃ : ℝ} (hshiu : ∀ n : ℕ, 1 ≤ n → ∑ d ∈ Icc 1 n, (d : ℝ) * |a f d| ≤ K₃ * n) :
    (fun H : ℕ => ∑ h ∈ Icc 1 H, (1 - (h : ℝ) / H) * (Sf f h - C ^ 2) + C / 2 * Real.log H)
        =o[atTop] (fun H : ℕ => Real.log H) ↔
      (fun H : ℕ => OffStar f H) =o[atTop] (fun H : ℕ => (H : ℝ) * Real.log H) := by
  set K := C ^ 2 / 2 * K₂ + C ^ 2 * K₃ / 8 + C ^ 2 * (K₂ + 2 / C) + C ^ 2 / 2
  set X : ℕ → ℝ := fun H => ∑ h ∈ Icc 1 H, (1 - (h : ℝ) / H) * (Sf f h - C ^ 2) + C / 2 * Real.log H
  set R : ℕ → ℝ := fun H => X H - C ^ 2 / H * OffStar f H
  have hR : ∀ H : ℕ, 2 ≤ H → |R H| ≤ K := fun H hH => smoothed hf hC hCpos hdir hshiu H hH
  -- `R = o(log H)`: it is bounded and `log H → ∞`
  have hRo : R =o[atTop] (fun H : ℕ => Real.log H) := by
    have hlog : Tendsto (fun H : ℕ => Real.log H) atTop atTop :=
      Real.tendsto_log_atTop.comp tendsto_natCast_atTop_atTop
    have hbig : R =O[atTop] (fun _ : ℕ => (1 : ℝ)) :=
      IsBigO.of_bound K (Filter.eventually_atTop.mpr ⟨2, fun H hH => by
        simpa [Real.norm_eq_abs] using hR H hH⟩)
    exact hbig.trans_isLittleO ((isLittleO_const_left.mpr (Or.inr (by
      simpa [Real.norm_eq_abs] using hlog.congr' (Filter.eventually_atTop.mpr ⟨1, fun H hH => by
        rw [Function.comp_apply, Real.norm_eq_abs,
          abs_of_nonneg (Real.log_nonneg (by exact_mod_cast hH))]⟩)))))
  -- `X = R + (C²/H) Off*`
  have hX : X = fun H => R H + C ^ 2 / H * OffStar f H := by
    funext H; simp only [R]; ring
  -- the scaled off-diagonal versus `log H`
  have hscale : (fun H : ℕ => C ^ 2 / H * OffStar f H) =o[atTop] (fun H : ℕ => Real.log H) ↔
      (fun H : ℕ => OffStar f H) =o[atTop] (fun H : ℕ => (H : ℝ) * Real.log H) := by
    constructor
    · intro h
      rw [isLittleO_iff] at h ⊢
      intro ε hε
      have hε' : 0 < ε * C ^ 2 := by positivity
      filter_upwards [h hε', Filter.eventually_ge_atTop 1] with H hH hH1
      have hH0 : (0 : ℝ) < H := by exact_mod_cast hH1
      simp only [Real.norm_eq_abs, abs_mul, abs_div, abs_of_pos (by positivity : (0:ℝ) < C ^ 2),
        abs_of_pos hH0] at hH ⊢
      have hC2 : (0 : ℝ) < C ^ 2 := by positivity
      rw [div_mul_eq_mul_div, div_le_iff₀ hH0] at hH
      calc |OffStar f H| = (C ^ 2 * |OffStar f H|) / C ^ 2 := by field_simp
        _ ≤ (ε * C ^ 2 * |Real.log H| * H) / C ^ 2 := by gcongr
        _ = ε * (H * |Real.log H|) := by first | (field_simp; done) | (field_simp; ring)
    · intro h
      rw [isLittleO_iff] at h ⊢
      intro ε hε
      have hε' : 0 < ε / C ^ 2 := by positivity
      filter_upwards [h hε', Filter.eventually_ge_atTop 1] with H hH hH1
      have hH0 : (0 : ℝ) < H := by exact_mod_cast hH1
      simp only [Real.norm_eq_abs, abs_mul, abs_div, abs_of_pos (by positivity : (0:ℝ) < C ^ 2),
        abs_of_pos hH0] at hH ⊢
      have hC2 : (0 : ℝ) < C ^ 2 := by positivity
      calc C ^ 2 / H * |OffStar f H| ≤ C ^ 2 / H * (ε / C ^ 2 * (H * |Real.log H|)) := by gcongr
        _ = ε * |Real.log H| := by first | (field_simp; done) | (field_simp; ring)
  rw [← hscale]
  constructor
  · intro h
    have := h.sub hRo
    refine this.congr_left fun H => ?_
    simp only [hX]; ring
  · intro h
    have := hRo.add h
    refine this.congr_left fun H => ?_
    simp only [hX]

end PairSingularSeries
