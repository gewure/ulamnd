import PairSingularSeries.Identity4

/-!
# The identities of Theorems 1 and 5 of paper I, in the paper's form

* `Sf f h := lim_{x→∞} ∏_{p≤x} T_p(h)`, the pair singular series as the limit of its partial products;
  `Sf_eq`: `S_f(h) = C² ∑_q F_h(q)` when `∏_{p≤x} E_p → C` (Theorem 1).
* `eq_identity` (Theorem 1, eq. (identity)): `∑_{h≤H} (S_f(h) − C²) = C² ∑_d W_f(d) Ψ_d(H)`.
* `eq_smoothed_exact` (Theorem 5, the exact identity, CORRECTED — ERRATA 43):
  `∑_{h≤H} (H − h)(S_f(h) − C²) = C² (∑_d W_f(d) ∑_{s,s'} B_d(s'−s) + H/2)`.
The sums over `d` run over all `d ≥ 0`; the terms `d = 0` vanish (`W_f(0) = 0`) and `W_f` vanishes off
squarefree `d`, so these are the paper's sums over squarefree `d ≥ 1`.
-/

namespace PairSingularSeries

open Finset Polynomial Filter Topology

variable {f : ℤ[X]}

/-- The pair singular series `S_f(h)`, as the limit of its partial products over `p ≤ x`. -/
noncomputable def Sf (f : ℤ[X]) (h : ℤ) : ℝ := limUnder atTop (Spartial f h)

/-- **Theorem 1 in the paper's form**: `S_f(h) = C² ∑_q μ(q)² b(q) c^f_q(h)`. -/
theorem Sf_eq (hf : Admissible f) (h : ℤ) (hh : h ≠ 0) {C : ℝ}
    (hC : Tendsto (Cpartial f) atTop (𝓝 C)) :
    Sf f h = C ^ 2 * ∑' q, Fterm f h q :=
  (expansion hf h hh hC).limUnder_eq

/-- `ψ^{1,H}_d(m) = ψ_d(m, H)`. -/
theorem psiW_one_weight (d : ℕ) (m : ℤ) (H : ℕ) : psiW (fun _ => 1) (H : ℝ) d m H = psi d m H := by
  unfold psiW psi
  simp

/-- `Ψ^{1,H}_d = Ψ_d(H)`. -/
theorem PsiW_one_weight (f : ℤ[X]) (d H : ℕ) : PsiW f (fun _ => 1) (H : ℝ) d H = Psi f d H := by
  unfold PsiW Psi
  simp only [psiW_one_weight]

/-- `Ψ^{1,H}_1 = 0`: the `q = 1` remainder vanishes in Theorem 1. -/
theorem PsiW_one_weight_one (f : ℤ[X]) (H : ℕ) : PsiW f (fun _ => 1) (H : ℝ) 1 H = 0 := by
  rw [PsiW_one]
  simp

/-- **Theorem 1, eq. (identity).** -/
theorem eq_identity (hf : Admissible f) (H : ℕ) {C : ℝ} (hC : Tendsto (Cpartial f) atTop (𝓝 C)) :
    ∑ h ∈ Icc 1 H, (Sf f h - C ^ 2) = C ^ 2 * ∑' d, W f d * Psi f d H := by
  have h1 : ∀ h ∈ Icc 1 H, Sf f h - C ^ 2 = C ^ 2 * ((fun _ : ℕ => (1 : ℝ)) h * ((∑' q, Fterm f h q) - 1)) := by
    intro h hh
    have hh0 : (h : ℤ) ≠ 0 := by
      have := (Finset.mem_Icc.mp hh).1
      omega
    rw [Sf_eq hf h hh0 hC]
    ring
  rw [Finset.sum_congr rfl h1, ← Finset.mul_sum, weighted_identity hf (fun _ => 1) (H : ℝ) H,
    PsiW_one_weight_one, sub_zero]
  congr 1
  exact tsum_congr fun d => by rw [PsiW_one_weight]

/-- `ψ^{H−h, H²/2}_d(m) = B_d(m)`. -/
theorem psiW_smoothed (d : ℕ) (m : ℤ) (H : ℕ) :
    psiW (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) d m H = B d m H := by
  unfold psiW B
  ring

/-- `Ψ^{H−h, H²/2}_d = ∑_{s,s'} B_d(s' − s)`. -/
theorem PsiW_smoothed (f : ℤ[X]) (d H : ℕ) :
    PsiW f (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) d H =
      ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H := by
  unfold PsiW
  simp only [psiW_smoothed]

/-- `∑_{h ≤ H} (H − h) = H(H − 1)/2`. -/
theorem sum_Icc_H_sub (H : ℕ) : ∑ h ∈ Icc 1 H, ((H : ℝ) - h) = (H : ℝ) * ((H : ℝ) - 1) / 2 := by
  have h := sum_class 1 1 H le_rfl le_rfl le_rfl
  have hfilt : (Icc 1 H).filter (fun h : ℕ => ((1 : ℕ) : ℤ) ∣ (h : ℤ) - ((1 : ℕ) : ℤ)) = Icc 1 H :=
    Finset.filter_true_of_mem fun _ _ => by simp
  rw [hfilt] at h
  have hK : K 1 1 H = H := by simp [K]
  rw [hK] at h
  push_cast at h
  rw [h]
  ring

/-- `Ψ^{H−h, H²/2}_1 = −H/2`: the `q = 1` remainder of Theorem 5 (ERRATA 43). -/
theorem PsiW_smoothed_one (f : ℤ[X]) (H : ℕ) :
    PsiW f (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) 1 H = -(H : ℝ) / 2 := by
  rw [PsiW_one, sum_Icc_H_sub]
  ring

/-- **Theorem 5, the exact identity (corrected).**
`∑_{h≤H} (H − h)(S_f(h) − C²) = C² (∑_d W_f(d) ∑_{s,s'} B_d(s'−s) + H/2)`. -/
theorem eq_smoothed_exact (hf : Admissible f) (H : ℕ) {C : ℝ}
    (hC : Tendsto (Cpartial f) atTop (𝓝 C)) :
    ∑ h ∈ Icc 1 H, ((H : ℝ) - h) * (Sf f h - C ^ 2) =
      C ^ 2 * ((∑' d, W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H) + (H : ℝ) / 2) := by
  have h1 : ∀ h ∈ Icc 1 H, ((H : ℝ) - h) * (Sf f h - C ^ 2) =
      C ^ 2 * (((fun h : ℕ => (H : ℝ) - h) h) * ((∑' q, Fterm f h q) - 1)) := by
    intro h hh
    have hh0 : (h : ℤ) ≠ 0 := by
      have := (Finset.mem_Icc.mp hh).1
      omega
    rw [Sf_eq hf h hh0 hC]
    ring
  rw [Finset.sum_congr rfl h1, ← Finset.mul_sum,
    weighted_identity hf (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) H, PsiW_smoothed_one]
  have : ∑' d, W f d * PsiW f (fun h : ℕ => (H : ℝ) - h) ((H : ℝ) ^ 2 / 2) d H =
      ∑' d, W f d * ∑ s ∈ roots f d, ∑ s' ∈ roots f d, B d ((s' : ℤ) - s) H :=
    tsum_congr fun d => by rw [PsiW_smoothed]
  rw [this]
  ring

end PairSingularSeries
