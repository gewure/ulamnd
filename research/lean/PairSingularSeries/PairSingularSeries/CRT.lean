import PairSingularSeries.Finite

/-!
# Counting solutions of congruence conditions modulo a product (Chinese remainder theorem)

The reusable tool: for coprime `m, n` and ANY predicates `P`, `Q`,
  `#{x < mn : P (x % m) ∧ Q (x % n)} = #{a < m : P a} · #{b < n : Q b}`     (`card_filter_crt`).
Corollaries for paper I: `ω_f` and `ν_f(·, h)` are multiplicative (`omega_mul`, `nu_mul`), and
`ω_f(1) = ν_f(1, h) = 1`.
-/

namespace PairSingularSeries

open Finset Polynomial

/-- `x ↦ (x % m, x % n)` is injective on `[0, mn)` when `m, n` are coprime. -/
theorem crt_injOn (m n : ℕ) (h : m.Coprime n) :
    Set.InjOn (fun x : ℕ => (x % m, x % n)) (range (m * n) : Set ℕ) := by
  intro x hx y hy hxy
  simp only [coe_range, Set.mem_Iio] at hx hy
  simp only [Prod.mk.injEq] at hxy
  have h1 : x ≡ y [MOD m] := hxy.1
  have h2 : x ≡ y [MOD n] := hxy.2
  have h3 : x ≡ y [MOD m * n] := (Nat.modEq_and_modEq_iff_modEq_mul h).mp ⟨h1, h2⟩
  unfold Nat.ModEq at h3
  rwa [Nat.mod_eq_of_lt hx, Nat.mod_eq_of_lt hy] at h3

/-- `x ↦ (x % m, x % n)` maps `[0, mn)` onto `[0, m) × [0, n)` when `m, n` are coprime. -/
theorem crt_image (m n : ℕ) (hm : 0 < m) (hn : 0 < n) (h : m.Coprime n) :
    (range (m * n)).image (fun x : ℕ => (x % m, x % n)) = range m ×ˢ range n := by
  apply Finset.eq_of_subset_of_card_le
  · intro p hp
    simp only [mem_image, mem_range] at hp
    obtain ⟨x, _, rfl⟩ := hp
    simp [mem_product, Nat.mod_lt _ hm, Nat.mod_lt _ hn]
  · rw [card_product, card_range, card_range, Finset.card_image_of_injOn (crt_injOn m n h),
      card_range]

/-- **CRT counting.** For coprime `m, n` and any predicates `P`, `Q`:
`#{x < mn : P (x % m) ∧ Q (x % n)} = #{a < m : P a} · #{b < n : Q b}`. -/
theorem card_filter_crt (m n : ℕ) (hm : 0 < m) (hn : 0 < n) (h : m.Coprime n)
    (P Q : ℕ → Prop) [DecidablePred P] [DecidablePred Q] :
    ((range (m * n)).filter (fun x => P (x % m) ∧ Q (x % n))).card =
      ((range m).filter P).card * ((range n).filter Q).card := by
  have hinj : Set.InjOn (fun x : ℕ => (x % m, x % n))
      ((range (m * n)).filter (fun x => P (x % m) ∧ Q (x % n)) : Set ℕ) :=
    (crt_injOn m n h).mono (by intro x hx; simpa using (Finset.mem_filter.mp hx).1)
  rw [← Finset.card_image_of_injOn hinj]
  have : ((range (m * n)).filter (fun x => P (x % m) ∧ Q (x % n))).image
      (fun x : ℕ => (x % m, x % n)) =
      (range m ×ˢ range n).filter (fun p : ℕ × ℕ => P p.1 ∧ Q p.2) := by
    ext ⟨a, b⟩
    simp only [mem_image, mem_filter, mem_product, mem_range, Prod.mk.injEq]
    constructor
    · rintro ⟨x, ⟨_, hPQ⟩, rfl, rfl⟩
      exact ⟨⟨Nat.mod_lt _ hm, Nat.mod_lt _ hn⟩, hPQ⟩
    · rintro ⟨⟨ha, hb⟩, hP, hQ⟩
      have hmem : (a, b) ∈ (range (m * n)).image (fun x : ℕ => (x % m, x % n)) := by
        rw [crt_image m n hm hn h]
        simp [mem_product, ha, hb]
      obtain ⟨x, hx, hxab⟩ := Finset.mem_image.mp hmem
      simp only [Prod.mk.injEq] at hxab
      obtain ⟨rfl, rfl⟩ := hxab
      exact ⟨x, ⟨Finset.mem_range.mp hx, hP, hQ⟩, rfl, rfl⟩
  rw [this, Finset.filter_product, card_product]

/-- `m ∣ (x % m) - x` in `ℤ`. -/
theorem dvd_mod_sub_self (m x : ℕ) : (m : ℤ) ∣ ((x % m : ℕ) : ℤ) - x := by
  have h := Nat.mod_add_div x m
  have h' : ((x % m : ℕ) : ℤ) + (m : ℤ) * ((x / m : ℕ) : ℤ) = x := by
    rw [← Nat.cast_mul, ← Nat.cast_add, h]
  exact ⟨-((x / m : ℕ) : ℤ), by linarith⟩

/-- For coprime `m, n`: `mn ∣ a ↔ m ∣ a ∧ n ∣ a` in `ℤ`. -/
theorem coprime_mul_dvd_iff {m n : ℕ} (h : m.Coprime n) (a : ℤ) :
    ((m * n : ℕ) : ℤ) ∣ a ↔ (m : ℤ) ∣ a ∧ (n : ℤ) ∣ a := by
  push_cast
  constructor
  · intro hd
    exact ⟨dvd_trans (dvd_mul_right _ _) hd, dvd_trans (dvd_mul_left _ _) hd⟩
  · rintro ⟨h1, h2⟩
    exact (Nat.isCoprime_iff_coprime.mpr h).mul_dvd h1 h2

/-- **`ω_f` is multiplicative.** -/
theorem omega_mul (f : ℤ[X]) {m n : ℕ} (hm : 0 < m) (hn : 0 < n) (h : m.Coprime n) :
    omega f (m * n) = omega f m * omega f n := by
  unfold omega
  rw [← card_filter_crt m n hm hn h]
  congr 1
  apply Finset.filter_congr
  intro x _
  rw [coprime_mul_dvd_iff h, dvd_eval_iff f (dvd_mod_sub_self m x),
    dvd_eval_iff f (dvd_mod_sub_self n x)]

/-- `m ∣ (x % m + h) - (x + h)` in `ℤ`. -/
theorem dvd_mod_add_sub (m x : ℕ) (h : ℤ) :
    (m : ℤ) ∣ (((x % m : ℕ) : ℤ) + h) - ((x : ℤ) + h) := by
  have := dvd_mod_sub_self m x
  convert this using 1
  ring

/-- **`ν_f(·, h)` is multiplicative.** -/
theorem nu_mul (f : ℤ[X]) (h : ℤ) {m n : ℕ} (hm : 0 < m) (hn : 0 < n) (hmn : m.Coprime n) :
    nu f (m * n) h = nu f m h * nu f n h := by
  unfold nu
  rw [← card_filter_crt m n hm hn hmn]
  congr 1
  apply Finset.filter_congr
  intro x _
  rw [coprime_mul_dvd_iff hmn, coprime_mul_dvd_iff hmn,
    dvd_eval_iff f (dvd_mod_sub_self m x), dvd_eval_iff f (dvd_mod_sub_self n x),
    dvd_eval_iff f (dvd_mod_add_sub m x h), dvd_eval_iff f (dvd_mod_add_sub n x h)]
  tauto

/-- `ω_f(1) = 1`. -/
theorem omega_one (f : ℤ[X]) : omega f 1 = 1 := by
  unfold omega
  simp

/-- `ν_f(1, h) = 1`. -/
theorem nu_one (f : ℤ[X]) (h : ℤ) : nu f 1 h = 1 := by
  unfold nu
  simp

/-- `ω_f(0) = 0` and `ν_f(0, h) = 0` (empty range). -/
theorem omega_zero (f : ℤ[X]) : omega f 0 = 0 := by unfold omega; simp
theorem nu_zero (f : ℤ[X]) (h : ℤ) : nu f 0 h = 0 := by unfold nu; simp

end PairSingularSeries
