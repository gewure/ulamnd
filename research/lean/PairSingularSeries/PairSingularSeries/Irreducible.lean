import PairSingularSeries.Hyp

/-!
# Irreducibility over `ℚ` implies the resultant condition

If `f ∈ ℤ[X]` is irreducible over `ℚ` (i.e. `f.map (algebraMap ℤ ℚ)` is irreducible) then for every
`h ≠ 0` there is a nonzero integer `N` divisible by every prime `p` modulo which `f(t)` and `f(t + h)`
have a common root (`resultant_condition_of_irreducible`). Consequently `Admissible f` follows from
irreducibility over `ℚ` together with "no fixed prime divisor" (`admissible_of_irreducible`).

Proof: `f` and `g = f(X + h)` are coprime in `ℚ[X]` — `f` is irreducible and does not divide `g`, since
`g = c f` would force `c = 1` and then `f(X + h) = f(X)`, so `f` would take the value `f(0)` at every
`n h`, infinitely many points — and a Bézout relation `a f + b g = 1` in `ℚ[X]`, with denominators
cleared, gives `A f + B g = N` in `ℤ[X]` with `N ≠ 0`.
-/

namespace PairSingularSeries

open Polynomial

variable {f : ℤ[X]}

/-- `f(X + h)` evaluated at `x` is `f(x + h)`. -/
theorem eval_comp_X_add_C (f : ℤ[X]) (h x : ℤ) : (f.comp (X + C h)).eval x = f.eval (x + h) := by
  simp [eval_comp]

/-- If `f(X + h) = f(X)` in `ℚ[X]` with `h ≠ 0`, then `f` is constant. -/
theorem natDegree_eq_zero_of_comp_X_add_C_eq (F : ℚ[X]) {h : ℚ} (hh : h ≠ 0)
    (hF : F.comp (X + C h) = F) : F.natDegree = 0 := by
  -- `F(n h) = F(0)` for all `n`
  have hper : ∀ n : ℕ, F.eval ((n : ℚ) * h) = F.eval 0 := by
    intro n
    induction n with
    | zero => simp
    | succ n ih =>
      have := congrArg (fun P : ℚ[X] => P.eval ((n : ℚ) * h)) hF
      simp only [eval_comp, eval_add, eval_X, eval_C] at this
      rw [← ih, ← this]
      congr 1
      push_cast
      ring
  -- so `F - C (F.eval 0)` has infinitely many roots
  have hroots : Set.Infinite {x : ℚ | (F - C (F.eval 0)).IsRoot x} := by
    have himg : Set.range (fun n : ℕ => (n : ℚ) * h) ⊆ {x : ℚ | (F - C (F.eval 0)).IsRoot x} := by
      rintro x ⟨n, rfl⟩
      simp [IsRoot, eval_sub, eval_C, hper n]
    refine Set.Infinite.mono himg (Set.infinite_range_of_injective ?_)
    intro m n hmn
    have : (m : ℚ) = n := mul_right_cancel₀ hh hmn
    exact_mod_cast this
  have hzero : F - C (F.eval 0) = 0 := eq_zero_of_infinite_isRoot _ hroots
  have : F = C (F.eval 0) := sub_eq_zero.mp hzero
  rw [this, natDegree_C]

/-- `f` and `f(X + h)` are coprime in `ℚ[X]` when `f` is irreducible over `ℚ` and `h ≠ 0`. -/
theorem isCoprime_map_comp (hirr : Irreducible (f.map (algebraMap ℤ ℚ))) {h : ℤ} (hh : h ≠ 0) :
    IsCoprime (f.map (algebraMap ℤ ℚ)) ((f.comp (X + C h)).map (algebraMap ℤ ℚ)) := by
  set F := f.map (algebraMap ℤ ℚ) with hFdef
  have hG : (f.comp (X + C h)).map (algebraMap ℤ ℚ) = F.comp (X + C (h : ℚ)) := by
    rw [map_comp]; simp [hFdef]
  rw [hG, hirr.coprime_iff_not_dvd]
  intro hdvd
  obtain ⟨q, hq⟩ := hdvd
  have hF0 : F ≠ 0 := hirr.ne_zero
  have hdeg : F.natDegree = (F.comp (X + C (h : ℚ))).natDegree := by
    rw [natDegree_comp, natDegree_X_add_C, mul_one]
  have hq0 : q ≠ 0 := by
    rintro rfl
    rw [mul_zero] at hq
    exact (comp_eq_zero_iff.mp hq).elim hF0 (fun ⟨_, h1⟩ => by
      have := congrArg natDegree h1
      rw [natDegree_X_add_C, natDegree_C] at this
      exact one_ne_zero this)
  have hqdeg : q.natDegree = 0 := by
    have := congrArg natDegree hq
    rw [natDegree_mul hF0 hq0] at this
    omega
  obtain ⟨c, rfl⟩ := natDegree_eq_zero.mp hqdeg
  -- leading coefficients: `c = 1`
  have hlc : F.leadingCoeff = F.leadingCoeff * c := by
    have := congrArg leadingCoeff hq
    rw [leadingCoeff_comp (by rw [natDegree_X_add_C]; exact one_ne_zero), leadingCoeff_X_add_C,
      one_pow, mul_one, leadingCoeff_mul, leadingCoeff_C] at this
    exact this
  have hc : c = 1 := by
    have hlc0 : F.leadingCoeff ≠ 0 := leadingCoeff_ne_zero.mpr hF0
    have := mul_left_cancel₀ hlc0 (hlc.symm.trans (mul_one _).symm)
    exact this
  rw [hc, C_1, mul_one] at hq
  have hdeg0 := natDegree_eq_zero_of_comp_X_add_C_eq F (by exact_mod_cast hh : (h : ℚ) ≠ 0) hq
  exact absurd hdeg0 (Nat.pos_iff_ne_zero.mp (natDegree_pos_iff_degree_pos.mpr (degree_pos_of_irreducible hirr)))

/-- Clearing denominators in a Bézout relation: from `a F + b G = 1` in `ℚ[X]` with `F, G` the images of
`f, g ∈ ℤ[X]`, there are `A, B ∈ ℤ[X]` and `N ≠ 0` with `A f + B g = C N` in `ℤ[X]`. -/
theorem exists_int_bezout {f g : ℤ[X]}
    (hcop : IsCoprime (f.map (algebraMap ℤ ℚ)) (g.map (algebraMap ℤ ℚ))) :
    ∃ (A B : ℤ[X]) (N : ℤ), N ≠ 0 ∧ A * f + B * g = C N := by
  obtain ⟨a, b, hab⟩ := hcop
  -- integer normalisations of `a` and `b`
  obtain ⟨da, hda⟩ := IsLocalization.integerNormalization_spec (nonZeroDivisors ℤ) a
  obtain ⟨db, hdb⟩ := IsLocalization.integerNormalization_spec (nonZeroDivisors ℤ) b
  set A₀ := IsLocalization.integerNormalization (nonZeroDivisors ℤ) a
  set B₀ := IsLocalization.integerNormalization (nonZeroDivisors ℤ) b
  have hA₀ : A₀.map (algebraMap ℤ ℚ) = C ((da : ℤ) : ℚ) * a := by
    rw [hda.2, zsmul_eq_mul, C_eq_intCast]
  have hB₀ : B₀.map (algebraMap ℤ ℚ) = C ((db : ℤ) : ℚ) * b := by
    rw [hdb.2, zsmul_eq_mul, C_eq_intCast]
  have hda0 : (da : ℤ) ≠ 0 := nonZeroDivisors.ne_zero hda.1
  have hdb0 : (db : ℤ) ≠ 0 := nonZeroDivisors.ne_zero hdb.1
  refine ⟨C (db : ℤ) * A₀, C (da : ℤ) * B₀, (da : ℤ) * (db : ℤ), mul_ne_zero hda0 hdb0, ?_⟩
  -- check after mapping to `ℚ[X]`, where the map is injective
  apply Polynomial.map_injective (algebraMap ℤ ℚ) (algebraMap ℤ ℚ).injective_int
  rw [Polynomial.map_add, Polynomial.map_mul, Polynomial.map_mul, Polynomial.map_mul,
    Polynomial.map_mul, hA₀, hB₀, map_C, map_C, map_C]
  simp only [algebraMap_int_eq, eq_intCast]
  have : C ((db : ℤ) : ℚ) * (C ((da : ℤ) : ℚ) * a) * f.map (Int.castRingHom ℚ)
      + C ((da : ℤ) : ℚ) * (C ((db : ℤ) : ℚ) * b) * g.map (Int.castRingHom ℚ)
      = C ((da : ℤ) : ℚ) * C ((db : ℤ) : ℚ)
        * (a * f.map (algebraMap ℤ ℚ) + b * g.map (algebraMap ℤ ℚ)) := by
    rw [algebraMap_int_eq]
    ring
  rw [this, hab, mul_one, ← C_mul]
  push_cast
  ring

/-- **Irreducibility gives the resultant condition.** For `f ∈ ℤ[X]` irreducible over `ℚ` and `h ≠ 0`,
there is `N ≠ 0` such that every prime `p` with `ν_f(p, h) ≠ 0` divides `N`. -/
theorem resultant_condition_of_irreducible (hirr : Irreducible (f.map (algebraMap ℤ ℚ))) (h : ℤ)
    (hh : h ≠ 0) : ∃ N : ℤ, N ≠ 0 ∧ ∀ p : ℕ, p.Prime → nu f p h ≠ 0 → (p : ℤ) ∣ N := by
  obtain ⟨A, B, N, hN0, hAB⟩ := exists_int_bezout (isCoprime_map_comp hirr hh)
  refine ⟨N, hN0, fun p _ hne => ?_⟩
  -- a common root `x` modulo `p`
  obtain ⟨x, hx⟩ : ∃ x : ℕ, (p : ℤ) ∣ f.eval (x : ℤ) ∧ (p : ℤ) ∣ f.eval ((x : ℤ) + h) := by
    unfold nu at hne
    obtain ⟨x, hx⟩ := Finset.card_pos.mp (Nat.pos_of_ne_zero hne)
    exact ⟨x, (Finset.mem_filter.mp hx).2⟩
  have := congrArg (fun P : ℤ[X] => P.eval (x : ℤ)) hAB
  simp only [eval_add, eval_mul, eval_C, eval_comp_X_add_C] at this
  rw [← this]
  exact dvd_add (dvd_mul_of_dvd_right hx.1 _) (dvd_mul_of_dvd_right hx.2 _)

/-- **`Admissible f` from irreducibility over `ℚ` and "no fixed prime divisor".** -/
theorem admissible_of_irreducible (hirr : Irreducible (f.map (algebraMap ℤ ℚ)))
    (hω : ∀ p : ℕ, p.Prime → omega f p < p) : Admissible f where
  natDegree_pos := by
    have h1 := degree_pos_of_irreducible hirr
    have h2 : (f.map (algebraMap ℤ ℚ)).natDegree = f.natDegree :=
      natDegree_map_eq_of_injective (algebraMap ℤ ℚ).injective_int f
    rw [← h2]
    exact natDegree_pos_iff_degree_pos.mpr h1
  omega_lt := hω
  resultant := fun h hh => resultant_condition_of_irreducible hirr h hh

end PairSingularSeries
