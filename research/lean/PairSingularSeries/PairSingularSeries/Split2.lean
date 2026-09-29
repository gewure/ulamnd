import PairSingularSeries.Split

/-!
# The split, part 2: summability, `Off*` absolutely convergent, Theorem 5's identity in split form,
and part (i)

* `abs_W_le`: `|W_f(d)| ≤ μ(d)² d b(d) · ∑_m |B(m)|` (the Euler-factor product is `∑_m Bd d m`).
* `summable_diag`: `d ↦ a_f(d) B_d(d)` is summable.
* `summable_offstar_term`, `tsum_split`: `∑_d W(d) ∑_{s,s'} B_d(s'−s) = ∑_d a(d) B_d(d) + Off*(H)`.
* `eq_smoothed_split`: `∑_{h≤H}(H−h)(S_f(h) − C²) = C² (∑_d a(d) B_d(d) + Off*(H) + H/2)`.
* `omega_le_one_of_squarefree`, `OffStar_eq_zero_of_omega_le_one` — **Theorem 5(i)**.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology ArithmeticFunction

variable {f : ℤ[X]}

/-- `∑_m |B(m)|`, a constant depending only on `f`. -/
noncomputable def Bsum (f : ℤ[X]) : ℝ := ∑' m, |Bterm f m|

/-- `|∑_m Bd d m| ≤ ∑_m |B(m)|`, uniformly in `d`. -/
theorem abs_tsum_Bd_le (hf : Admissible f) (d : ℕ) : |∑' m, Bd f d m| ≤ Bsum f := by
  have h1 : ‖∑' m, Bd f d m‖ ≤ ∑' m, ‖Bd f d m‖ :=
    norm_tsum_le_tsum_norm (by simpa only [Real.norm_eq_abs] using summable_abs_Bd hf d)
  simp only [Real.norm_eq_abs] at h1
  refine le_trans h1 ?_
  exact (summable_abs_Bd hf d).tsum_le_tsum (fun m => abs_Bd_le f d m) (summable_abs_Bterm hf)

/-- `|W_f(d)| ≤ μ(d)² d b(d) · Bsum`. -/
theorem abs_W_le (hf : Admissible f) (d : ℕ) :
    |W f d| ≤ ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * Bsum f := by
  have hW : W f d = ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * ∑' m, Bd f d m := by
    unfold W
    rw [tsum_Bd hf d]
  have hnn : (0:ℝ) ≤ ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d :=
    mul_nonneg (mul_nonneg (by positivity) (Nat.cast_nonneg _)) (bfun_nonneg f d)
  rw [hW, abs_mul, abs_of_nonneg hnn]
  exact mul_le_mul_of_nonneg_left (abs_tsum_Bd_le hf d) hnn

/-- The diagonal summand `a_f(d) B_d(d)`. -/
noncomputable def dterm (f : ℤ[X]) (H : ℕ) (d : ℕ) : ℝ := a f d * B d (d : ℤ) H

/-- The `Off*` summand. -/
noncomputable def oterm (f : ℤ[X]) (H : ℕ) (d : ℕ) : ℝ :=
  W f d * ((1 / 2 : ℝ) * ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, bracket d (((s' : ℤ) - s) % d) H)

theorem OffStar_eq_tsum_oterm (f : ℤ[X]) (H : ℕ) : OffStar f H = ∑' d, oterm f H d := rfl

/-- `d ↦ a_f(d) B_d(d)` is summable: beyond `H` it is `−(H²/2) a_f(d)/d`, bounded by a multiple of `|B(d)|`. -/
theorem summable_diag (hf : Admissible f) (H : ℕ) : Summable (dterm f H) := by
  -- majorant: the finitely many `d ≤ H`, plus `(Bsum H²/2) |B(d)|`
  set M : ℕ → ℝ := fun d => (if d ≤ H then |dterm f H d| else 0) + Bsum f * (H : ℝ) ^ 2 / 2 * |Bterm f d|
    with hM
  have hsM : Summable M := by
    apply Summable.add
    · apply summable_of_ne_finset_zero (s := Finset.range (H + 1))
      intro d hd
      simp only [mem_range, not_lt] at hd
      simp [show ¬ d ≤ H by omega]
    · exact (summable_abs_Bterm hf).mul_left _
  refine (hsM.of_nonneg_of_le (fun _ => abs_nonneg _) fun d => ?_).of_abs
  by_cases hd : d ≤ H
  · simp only [hM, hd, if_true]
    have : 0 ≤ Bsum f * (H : ℝ) ^ 2 / 2 * |Bterm f d| := by
      have : 0 ≤ Bsum f := tsum_nonneg fun _ => abs_nonneg _
      positivity
    linarith
  · simp only [hM, hd, if_false, zero_add]
    push Not at hd
    have hd0 : (0 : ℝ) < d := by exact_mod_cast (by omega : 0 < d)
    unfold dterm a
    rw [B_diag_gt d H hd, abs_mul, abs_mul, abs_of_nonneg (Nat.cast_nonneg (omega f d) : (0:ℝ) ≤ (omega f d : ℝ)),
      abs_div, abs_neg, abs_of_nonneg (by positivity : (0:ℝ) ≤ (H : ℝ) ^ 2),
      abs_of_pos (by positivity : (0:ℝ) < 2 * (d : ℝ))]
    have hW := abs_W_le hf d
    have hB := abs_Bterm f d
    have hω : (omega f d : ℝ) ≤ (omega f d : ℝ) ^ 2 := by
      have : (1 : ℝ) ≤ omega f d ∨ (omega f d : ℝ) = 0 := by
        rcases Nat.eq_zero_or_pos (omega f d) with h | h
        · right; exact_mod_cast h
        · left; exact_mod_cast h
      rcases this with h | h
      · nlinarith
      · rw [h]; norm_num
    have hb := bfun_nonneg f d
    have hμ : (0:ℝ) ≤ ((moebius d : ℤ) : ℝ) ^ 2 := by positivity
    have hBs : 0 ≤ Bsum f := tsum_nonneg fun _ => abs_nonneg _
    calc |W f d| * (omega f d : ℝ) * ((H : ℝ) ^ 2 / (2 * d))
        ≤ ((moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d * Bsum f * (omega f d : ℝ) ^ 2
          * ((H : ℝ) ^ 2 / (2 * d)) := by
          gcongr
      _ = Bsum f * (H : ℝ) ^ 2 / 2 * (((moebius d : ℤ) : ℝ) ^ 2 * bfun f d * (omega f d : ℝ) ^ 2) := by
          first | (field_simp; done) | (field_simp; ring)
      _ = Bsum f * (H : ℝ) ^ 2 / 2 * |Bterm f d| := by rw [hB]

/-- `d ↦ W(d) ∑_{s,s'} B_d(s'−s)` is summable (it is `A(d) · ∑_m Bd d m`). -/
theorem summable_W_sumB (hf : Admissible f) (H : ℕ) :
    Summable (fun d => W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H) := by
  have h : ∀ d, W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H =
      Aterm f (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) H d * ∑' m, Bd f d m := by
    intro d
    rw [Aterm_mul_tsum_Bd hf _ _ H d, PsiW_smoothed]
  simp_rw [h]
  have hs : Summable (fun d => |Aterm f (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) H d| * Bsum f) :=
    (summable_abs_Aterm hf (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) H).mul_right _
  refine hs.of_norm_bounded fun d => ?_
  rw [Real.norm_eq_abs, abs_mul]
  exact mul_le_mul_of_nonneg_left (abs_tsum_Bd_le hf d) (abs_nonneg _)

/-- Pointwise: `W(d) ∑_{s,s'} B_d(s'−s) = a(d) B_d(d) + oterm d`. -/
theorem W_sumB_eq (f : ℤ[X]) (H : ℕ) (d : ℕ) :
    W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H = dterm f H d + oterm f H d := by
  rcases Nat.eq_zero_or_pos d with rfl | hd
  · simp [dterm, oterm, a, W]
  · rw [sum_B_split d hd H]
    unfold dterm oterm a
    ring

/-- `Off*`'s summand is summable. -/
theorem summable_oterm (hf : Admissible f) (H : ℕ) : Summable (oterm f H) := by
  have := (summable_W_sumB hf H).sub (summable_diag hf H)
  refine this.congr fun d => ?_
  rw [W_sumB_eq]
  ring

/-- **The split**: `∑_d W(d) ∑_{s,s'} B_d(s'−s) = ∑_d a(d) B_d(d) + Off*(H)`. -/
theorem tsum_split (hf : Admissible f) (H : ℕ) :
    ∑' d, W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H =
      (∑' d, dterm f H d) + OffStar f H := by
  rw [OffStar_eq_tsum_oterm, ← (summable_diag hf H).tsum_add (summable_oterm hf H)]
  exact tsum_congr fun d => W_sumB_eq f H d

/-- **Theorem 5, the exact identity in split form.** -/
theorem eq_smoothed_split (hf : Admissible f) (H : ℕ) {C : ℝ}
    (hC : Tendsto (Cpartial f) atTop (𝓝 C)) :
    ∑ h ∈ Icc 1 H, ((H : ℝ) - h) * (Sf f h - C ^ 2) =
      C ^ 2 * ((∑' d, dterm f H d) + OffStar f H + (H : ℝ) / 2) := by
  rw [eq_smoothed_exact hf H hC, tsum_split hf H]

/-- For squarefree `d`, `ω_f(d) = ∏_{p ∣ d} ω_f(p)`. -/
theorem omega_prod_primeFactors_of_squarefree {d : ℕ} (hd : Squarefree d) :
    omega f d = ∏ p ∈ d.primeFactors, omega f p := by
  have hmul : ∀ x y : ℕ, x.Coprime y → omega f (x * y) = omega f x * omega f y := by
    intro x y hxy
    rcases Nat.eq_zero_or_pos x with rfl | hx
    · simp [omega_zero]
    rcases Nat.eq_zero_or_pos y with rfl | hy
    · simp [omega_zero]
    exact omega_mul f hx hy hxy
  rw [Nat.multiplicative_factorization (omega f) hmul (omega_one f) hd.ne_zero,
    Nat.prod_factorization_eq_prod_primeFactors]
  refine Finset.prod_congr rfl fun p hp => ?_
  have h1 : d.factorization p = 1 := by
    have hle := (Nat.squarefree_iff_factorization_le_one hd.ne_zero).mp hd p
    have hpos := (Nat.prime_of_mem_primeFactors hp).factorization_pos_of_dvd hd.ne_zero
      (Nat.dvd_of_mem_primeFactors hp)
    omega
  rw [h1, pow_one]

/-- If `ω_f(p) ≤ 1` at every prime then `ω_f(d) ≤ 1` for squarefree `d`. -/
theorem omega_le_one_of_squarefree (h1 : ∀ p : ℕ, p.Prime → omega f p ≤ 1) {d : ℕ}
    (hd : Squarefree d) : omega f d ≤ 1 := by
  rw [omega_prod_primeFactors_of_squarefree hd]
  exact le_trans (Finset.prod_le_prod' fun p hp => h1 p (Nat.prime_of_mem_primeFactors hp))
    (le_of_eq Finset.prod_const_one)

/-- **Theorem 5(i).** If `ω_f(p) ≤ 1` for every prime `p` (e.g. `f` linear), then `Off*_f ≡ 0`. -/
theorem OffStar_eq_zero_of_omega_le_one (h1 : ∀ p : ℕ, p.Prime → omega f p ≤ 1) (H : ℕ) :
    OffStar f H = 0 := by
  rw [OffStar_eq_tsum_oterm]
  have hz : ∀ d, oterm f H d = 0 := by
    intro d
    unfold oterm
    by_cases hsq : Squarefree d
    · have hcard : (roots f d).card ≤ 1 := omega_le_one_of_squarefree h1 hsq
      have herase : ∀ s ∈ roots f d, (roots f d).erase s = ∅ := by
        intro s hs
        rw [Finset.erase_eq_empty_iff]
        right
        exact Finset.eq_singleton_iff_unique_mem.mpr
          ⟨hs, fun x hx => Finset.card_le_one.mp hcard x hx s hs⟩
      rw [Finset.sum_congr rfl (fun s hs => by rw [herase s hs, Finset.sum_empty])]
      simp
    · simp [W, moebius_eq_zero_of_not_squarefree hsq]
  simp [hz]

end PairSingularSeries
