/-
Copyright (c) 2026 Jasper Reichardt. All rights reserved.
Released under Apache 2.0 license as described in the file LICENSE.
Authors: Jasper Reichardt
-/
import Mathlib

/-!
# Counting solutions of congruence conditions modulo a product

For coprime `m` and `n`, the map `x ↦ (x % m, x % n)` is a bijection from `Finset.range (m * n)` onto
`Finset.range m ×ˢ Finset.range n` (the Chinese remainder theorem in counting form). Consequently, for
any predicates `P` and `Q`,
`#{x < m * n | P (x % m) ∧ Q (x % n)} = #{a < m | P a} * #{b < n | Q b}`
(`Nat.card_filter_range_mul_of_coprime`).

This is the form of the Chinese remainder theorem used to prove that the number of roots of a
polynomial modulo `d`, or of common roots of two polynomials modulo `d`, is a multiplicative function
of `d`.
-/

namespace Nat

open Finset

/-- For coprime `m`, `n`, the map `x ↦ (x % m, x % n)` is injective on `[0, m * n)`. -/
theorem injOn_mod_mod_range {m n : ℕ} (h : m.Coprime n) :
    Set.InjOn (fun x : ℕ => (x % m, x % n)) (range (m * n) : Set ℕ) := by
  intro x hx y hy hxy
  simp only [coe_range, Set.mem_Iio] at hx hy
  simp only [Prod.mk.injEq] at hxy
  have h3 : x ≡ y [MOD m * n] := (Nat.modEq_and_modEq_iff_modEq_mul h).mp ⟨hxy.1, hxy.2⟩
  unfold Nat.ModEq at h3
  rwa [Nat.mod_eq_of_lt hx, Nat.mod_eq_of_lt hy] at h3

/-- For coprime `m`, `n`, the map `x ↦ (x % m, x % n)` sends `[0, m * n)` onto `[0, m) × [0, n)`. -/
theorem image_mod_mod_range {m n : ℕ} (h : m.Coprime n) :
    (range (m * n)).image (fun x : ℕ => (x % m, x % n)) = range m ×ˢ range n := by
  rcases Nat.eq_zero_or_pos m with rfl | hm
  · simp
  rcases Nat.eq_zero_or_pos n with rfl | hn
  · simp
  apply Finset.eq_of_subset_of_card_le
  · intro p hp
    simp only [mem_image, mem_range] at hp
    obtain ⟨x, _, rfl⟩ := hp
    simp [mem_product, Nat.mod_lt _ hm, Nat.mod_lt _ hn]
  · rw [card_product, card_range, card_range,
      _root_.Finset.card_image_of_injOn (injOn_mod_mod_range h), card_range]

/-- **Chinese remainder theorem, counting form.** For coprime `m`, `n` and any predicates `P`, `Q`,
`#{x < m * n | P (x % m) ∧ Q (x % n)} = #{a < m | P a} * #{b < n | Q b}`. -/
theorem card_filter_range_mul_of_coprime {m n : ℕ} (h : m.Coprime n) (P Q : ℕ → Prop)
    [DecidablePred P] [DecidablePred Q] :
    #{x ∈ range (m * n) | P (x % m) ∧ Q (x % n)} = #{a ∈ range m | P a} * #{b ∈ range n | Q b} := by
  have hinj : Set.InjOn (fun x : ℕ => (x % m, x % n))
      (((range (m * n)).filter (fun x => P (x % m) ∧ Q (x % n)) : Finset ℕ) : Set ℕ) :=
    (injOn_mod_mod_range h).mono (by intro x hx; simpa using (Finset.mem_filter.mp hx).1)
  rw [← _root_.Finset.card_image_of_injOn hinj]
  have himage : ({x ∈ range (m * n) | P (x % m) ∧ Q (x % n)} : Finset ℕ).image
      (fun x : ℕ => (x % m, x % n)) = {p ∈ range m ×ˢ range n | P p.1 ∧ Q p.2} := by
    ext ⟨a, b⟩
    simp only [mem_image, mem_filter, mem_product, mem_range, Prod.mk.injEq]
    constructor
    · rintro ⟨x, ⟨hx, hPQ⟩, rfl, rfl⟩
      have hm : 0 < m := Nat.pos_of_ne_zero fun h0 => by simp [h0] at hx
      have hn : 0 < n := Nat.pos_of_ne_zero fun h0 => by simp [h0] at hx
      exact ⟨⟨Nat.mod_lt _ hm, Nat.mod_lt _ hn⟩, hPQ⟩
    · rintro ⟨⟨ha, hb⟩, hP, hQ⟩
      have hmem : (a, b) ∈ (range (m * n)).image (fun x : ℕ => (x % m, x % n)) := by
        rw [image_mod_mod_range h]
        simp [mem_product, ha, hb]
      obtain ⟨x, hx, hxab⟩ := Finset.mem_image.mp hmem
      simp only [Prod.mk.injEq] at hxab
      obtain ⟨rfl, rfl⟩ := hxab
      exact ⟨x, ⟨Finset.mem_range.mp hx, hP, hQ⟩, rfl, rfl⟩
  rw [himage, Finset.filter_product, card_product]

#min_imports

end Nat
