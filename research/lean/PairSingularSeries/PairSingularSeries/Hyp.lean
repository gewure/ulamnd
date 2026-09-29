import PairSingularSeries.Mult

/-!
# The standing hypotheses on `f`, and the root bound `ω_f(p) ≤ deg f`

* `Admissible f`: the hypotheses of paper I, Section 3, in the form the proofs use — positive degree,
  no fixed prime divisor (`ω_f(p) < p`), and the resultant condition (for `h ≠ 0` a nonzero integer
  `N_h` divisible by every prime `p` with `ν_f(p, h) ≠ 0`).  The last is what "`R(h) ≠ 0`" is used
  for; it follows from irreducibility, which is proved separately.
* `omega_eq_card_zmod`: `ω_f(d)` is the number of roots of `f` in `ZMod d`.
* `omega_le_natDegree`: for a prime `p` not dividing the leading coefficient, `ω_f(p) ≤ deg f`
  (a polynomial over the field `ZMod p` has at most `deg` roots).
-/

namespace PairSingularSeries

open Finset Polynomial

/-- The standing hypotheses of paper I, Section 3. -/
structure Admissible (f : ℤ[X]) : Prop where
  natDegree_pos : 0 < f.natDegree
  /-- No fixed prime divisor: `ω_f(p) < p` for every prime `p`. -/
  omega_lt : ∀ p : ℕ, p.Prime → omega f p < p
  /-- The resultant condition: for `h ≠ 0` there is `N_h ≠ 0` divisible by every prime `p` with
  `ν_f(p, h) ≠ 0`, i.e. by every prime modulo which `f(t)` and `f(t + h)` have a common root. -/
  resultant : ∀ h : ℤ, h ≠ 0 → ∃ N : ℤ, N ≠ 0 ∧ ∀ p : ℕ, p.Prime → nu f p h ≠ 0 → (p : ℤ) ∣ N

/-- The image of `f` in `(ZMod d)[X]`. -/
noncomputable def fbar (f : ℤ[X]) (d : ℕ) : (ZMod d)[X] := f.map (Int.castRingHom (ZMod d))

/-- `d ∣ f(x)` iff `x̄` is a root of `f̄` in `ZMod d`. -/
theorem dvd_iff_eval_fbar (f : ℤ[X]) (d : ℕ) (x : ℤ) :
    (d : ℤ) ∣ f.eval x ↔ (fbar f d).eval (x : ZMod d) = 0 := by
  rw [fbar, Polynomial.eval_intCast_map, eq_intCast, ZMod.intCast_zmod_eq_zero_iff_dvd]
  simp

/-- `ω_f(d)` is the number of roots of `f̄` in `ZMod d` (for `d ≥ 1`). -/
theorem omega_eq_card_zmod (f : ℤ[X]) (d : ℕ) [NeZero d] :
    omega f d = (Finset.univ.filter (fun x : ZMod d => (fbar f d).eval x = 0)).card := by
  unfold omega
  refine Finset.card_bij' (fun x _ => (x : ZMod d)) (fun y _ => y.val) ?_ ?_ ?_ ?_
  · intro x hx
    simp only [mem_filter, mem_range] at hx
    simp only [mem_filter, mem_univ, true_and]
    have hc : ((x : ℕ) : ZMod d) = (((x : ℕ) : ℤ) : ZMod d) := (Int.cast_natCast x).symm
    rw [hc, ← dvd_iff_eval_fbar]
    exact hx.2
  · intro y hy
    simp only [mem_filter, mem_univ, true_and] at hy
    simp only [mem_filter, mem_range]
    refine ⟨ZMod.val_lt y, ?_⟩
    rw [dvd_iff_eval_fbar]
    have : (((y.val : ℕ) : ℤ) : ZMod d) = y := by
      rw [Int.cast_natCast, ZMod.natCast_zmod_val]
    rw [this]
    exact hy
  · intro x hx
    simp only [mem_filter, mem_range] at hx
    rw [ZMod.val_natCast, Nat.mod_eq_of_lt hx.1]
  · intro y _
    exact ZMod.natCast_zmod_val y

/-- **Root bound.** For a prime `p` not dividing the leading coefficient of `f ≠ 0`,
`ω_f(p) ≤ deg f`. -/
theorem omega_le_natDegree (f : ℤ[X]) {p : ℕ} (hp : p.Prime) (hlc : ¬ (p : ℤ) ∣ f.leadingCoeff) :
    omega f p ≤ f.natDegree := by
  have : Fact p.Prime := ⟨hp⟩
  have : NeZero p := ⟨hp.ne_zero⟩
  rw [omega_eq_card_zmod]
  -- `f̄ ≠ 0` because its leading coefficient is the (nonzero) image of that of `f`
  have hlc' : (Int.castRingHom (ZMod p)) f.leadingCoeff ≠ 0 := by
    rw [eq_intCast, Ne, ZMod.intCast_zmod_eq_zero_iff_dvd]
    exact hlc
  have hne : fbar f p ≠ 0 := by
    intro h0
    have := Polynomial.leadingCoeff_map_of_leadingCoeff_ne_zero (Int.castRingHom (ZMod p)) hlc'
    rw [← fbar, h0, leadingCoeff_zero] at this
    exact hlc' this.symm
  -- the roots of `f̄` as a finset
  have hset : Finset.univ.filter (fun x : ZMod p => (fbar f p).eval x = 0) =
      (fbar f p).roots.toFinset := by
    ext x
    simp [Multiset.mem_toFinset, Polynomial.mem_roots hne, Polynomial.IsRoot.def]
  rw [hset]
  calc (fbar f p).roots.toFinset.card
      ≤ Multiset.card (fbar f p).roots := Multiset.toFinset_card_le _
    _ ≤ (fbar f p).natDegree := Polynomial.card_roots' _
    _ ≤ f.natDegree := Polynomial.natDegree_map_le

/-- A prime `p > |a|` does not divide the nonzero integer `a`. -/
theorem prime_not_dvd_of_gt {p : ℕ} {a : ℤ} (ha : a ≠ 0) (hgt : a.natAbs < p) :
    ¬ (p : ℤ) ∣ a := by
  intro hd
  have h1 : (p : ℤ) ∣ (a.natAbs : ℤ) := by rwa [Int.natCast_natAbs, dvd_abs]
  have h2 : p ∣ a.natAbs := by exact_mod_cast h1
  have h3 : a.natAbs ≠ 0 := Int.natAbs_ne_zero.mpr ha
  exact absurd (Nat.le_of_dvd (Nat.pos_of_ne_zero h3) h2) (not_le.mpr hgt)

end PairSingularSeries
