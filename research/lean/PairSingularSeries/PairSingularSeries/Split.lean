import PairSingularSeries.Theorems

/-!
# The diagonal / off-diagonal split (paper I, Theorem 5) and part (i)

* `B_congr`: `B_d(m)` depends only on `m mod d`; `B_diag_zero`: `B_d(0) = B_d(d)`.
* `B_diag_gt`: `B_d(d) = −H²/(2d)` for `d > H`.
* `sum_B_split`: `∑_{s,s'} B_d(s'−s) = ω_f(d) B_d(d) + ½ ∑_{s≠s'} bracket_d((s'−s) mod d)`.
* `summable_diag`: `d ↦ a_f(d) B_d(d)` is summable; `summable_offstar_term`: so is the `Off*` summand.
* `tsum_split`: `∑_d W(d) ∑_{s,s'} B_d(s'−s) = ∑_d a(d) B_d(d) + Off*(H)`.
* `OffStar_eq_zero_of_omega_le_one` (Theorem 5(i)): if `ω_f(p) ≤ 1` for all primes `p` then `Off* ≡ 0`.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology ArithmeticFunction

variable {f : ℤ[X]}

/-- `b ∣ a − a % b`. -/
theorem dvd_self_sub_emod (a b : ℤ) : b ∣ a - a % b :=
  ⟨a / b, by rw [Int.emod_def]; ring⟩

/-- `B_d(m)` depends only on the class of `m` modulo `d`. -/
theorem B_congr (d : ℕ) {m m' : ℤ} (H : ℕ) (h : (d : ℤ) ∣ m - m') : B d m H = B d m' H := by
  unfold B
  congr 1
  apply Finset.sum_congr _ (fun _ _ => rfl)
  apply Finset.filter_congr
  intro x _
  constructor
  · intro hx
    have := dvd_add hx h
    simpa [sub_add_sub_cancel] using this
  · intro hx
    have := dvd_sub hx h
    have e : (x : ℤ) - m' - (m - m') = (x : ℤ) - m := by ring
    rwa [e] at this

/-- `B_d(0) = B_d(d)`. -/
theorem B_diag_zero (d : ℕ) (H : ℕ) : B d 0 H = B d (d : ℤ) H :=
  B_congr d H (by simp)

/-- `B_d(s − s') = B_d(d − ((s' − s) mod d))` for the pairing `(s,s') ↔ (s',s)`. -/
theorem B_swap (d : ℕ) (hd : 1 ≤ d) (s s' : ℕ) (H : ℕ) :
    B d ((s : ℤ) - s') H = B d ((d : ℤ) - ((s' : ℤ) - s) % d) H := by
  apply B_congr
  have h1 : (d : ℤ) ∣ ((s' : ℤ) - s) - ((s' : ℤ) - s) % d := dvd_self_sub_emod _ _
  have e : (s : ℤ) - s' - ((d : ℤ) - ((s' : ℤ) - s) % d) = -((s' : ℤ) - s - ((s' : ℤ) - s) % d) - d := by
    ring
  rw [e]
  exact dvd_sub (dvd_neg.mpr h1) (dvd_refl _)

/-- `B_d(d) = −H²/(2d)` for `d > H`: no `h ≤ H` is divisible by `d`. -/
theorem B_diag_gt (d H : ℕ) (hd : H < d) : B d (d : ℤ) H = -(H : ℝ) ^ 2 / (2 * d) := by
  unfold B
  have : (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - (d : ℤ)) = ∅ := by
    apply Finset.filter_eq_empty_iff.mpr
    intro h hh hdvd
    have hh' := Finset.mem_Icc.mp hh
    have : (d : ℤ) ∣ (h : ℤ) := by
      have := dvd_add hdvd (dvd_refl (d : ℤ))
      simpa using this
    have hd' : d ∣ h := Int.natCast_dvd_natCast.mp this
    have := Nat.le_of_dvd (by omega) hd'
    omega
  rw [this, Finset.sum_empty, zero_sub]
  ring

/-- The class `m = (s' − s) mod d` of a pair of DISTINCT roots lies in `[1, d − 1]`. -/
theorem mod_pos_of_ne (d : ℕ) {s s' : ℕ} (hs : s ∈ roots f d) (hs' : s' ∈ roots f d) (hne : s' ≠ s) :
    1 ≤ (((s' : ℤ) - s) % d).toNat ∧ (((s' : ℤ) - s) % d).toNat < d := by
  have hd : 0 < d := by
    have := Finset.mem_range.mp (Finset.mem_filter.mp hs).1
    omega
  have hs1 := Finset.mem_range.mp (Finset.mem_filter.mp hs).1
  have hs2 := Finset.mem_range.mp (Finset.mem_filter.mp hs').1
  have hd0 : (0 : ℤ) < d := by exact_mod_cast hd
  have h0 : 0 ≤ ((s' : ℤ) - s) % d := Int.emod_nonneg _ (by omega)
  have h1 : ((s' : ℤ) - s) % d < d := Int.emod_lt_of_pos _ hd0
  constructor
  · -- the class is not `0`: `d ∣ s' − s` with `|s' − s| < d` would force `s' = s`
    by_contra hlt
    push Not at hlt
    have hz : ((s' : ℤ) - s) % d = 0 := by omega
    have hdvd : (d : ℤ) ∣ (s' : ℤ) - s := Int.dvd_of_emod_eq_zero hz
    obtain ⟨k, hk⟩ := hdvd
    have : k = 0 := by
      rcases lt_trichotomy k 0 with hk0 | hk0 | hk0
      · nlinarith
      · exact hk0
      · nlinarith
    subst this
    apply hne
    omega
  · omega

/-- The off-diagonal sum over ordered pairs as half the sum of the bracket. -/
theorem sum_offdiag_B (d : ℕ) (hd : 1 ≤ d) (H : ℕ) :
    ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, B d ((s' : ℤ) - s) H =
      (1 / 2 : ℝ) * ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, bracket d (((s' : ℤ) - s) % d) H := by
  -- symmetrise: the sum equals its swap, and `B(m) + B(d − m) = bracket(m)`
  set T := ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, B d ((s' : ℤ) - s) H with hT
  have hswap : T = ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, B d ((s : ℤ) - s') H := by
    rw [hT]
    exact Finset.sum_comm' fun x y => by
      simp only [Finset.mem_erase]
      constructor
      · rintro ⟨hx, hne, hy⟩; exact ⟨⟨Ne.symm hne, hx⟩, hy⟩
      · rintro ⟨⟨hne, hx⟩, hy⟩; exact ⟨hx, Ne.symm hne, hy⟩
  have h2 : 2 * T = ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, bracket d (((s' : ℤ) - s) % d) H := by
    calc 2 * T = T + T := by ring
      _ = ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s,
            (B d ((s' : ℤ) - s) H + B d ((s : ℤ) - s') H) := by
          rw [Finset.sum_congr rfl (fun s _ => Finset.sum_add_distrib), Finset.sum_add_distrib,
            ← hT, ← hswap]
      _ = _ := by
          refine Finset.sum_congr rfl fun s hs => Finset.sum_congr rfl fun s' hs' => ?_
          have hs'' := Finset.mem_of_mem_erase hs'
          have hne := Finset.ne_of_mem_erase hs'
          obtain ⟨hm1, hmd⟩ := mod_pos_of_ne d hs hs'' hne
          set m := (((s' : ℤ) - s) % d).toNat with hm
          have hmz : ((s' : ℤ) - s) % d = (m : ℤ) := by
            rw [hm, Int.toNat_of_nonneg (Int.emod_nonneg _ (by omega))]
          rw [B_swap d hd s s' H, hmz]
          have := bracket_eq d m H hm1 hmd
          rw [Nat.cast_sub hmd.le] at this
          rw [← this]
          -- `B d ((s' − s)) = B d m` since they are congruent mod d
          congr 1
          apply B_congr
          rw [← hmz]
          exact dvd_self_sub_emod _ _
  linarith

/-- **The split**: `∑_{s,s'} B_d(s'−s) = ω_f(d) B_d(d) + ½ ∑_{s≠s'} bracket`. -/
theorem sum_B_split (d : ℕ) (hd : 1 ≤ d) (H : ℕ) :
    ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H =
      (omega f d : ℝ) * B d (d : ℤ) H
        + (1 / 2 : ℝ) * ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, bracket d (((s' : ℤ) - s) % d) H := by
  rw [← sum_offdiag_B d hd H]
  have : ∀ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H =
      B d (d : ℤ) H + ∑ s' ∈ (roots f d).erase s, B d ((s' : ℤ) - s) H := by
    intro s hs
    rw [← Finset.add_sum_erase _ _ hs, sub_self, B_diag_zero]
  rw [Finset.sum_congr rfl this, Finset.sum_add_distrib, Finset.sum_const, nsmul_eq_mul]
  rfl

end PairSingularSeries
