/-
# The pair singular series of a polynomial: definitions

Formalisation of the objects of paper I (J. Reichardt, "The pair singular series of a polynomial
I"), Section 3.  Everything is defined in arithmetic form: root counts modulo `d` are counted over
`Finset.range d`, and the root Ramanujan sum `cf` is DEFINED by its divisor sum, so that no
exponential sum appears anywhere.  See research/lean/FORMAL-PLAN.md for the paper correspondence.
-/
import Mathlib

open Polynomial Finset

namespace PairSingularSeries

/-- `ω_f(d)`: the number of roots of `f` modulo `d`, counted as `x ∈ [0, d)` with `d ∣ f(x)`.
For `d = 0` this is `0`. -/
def omega (f : ℤ[X]) (d : ℕ) : ℕ :=
  ((range d).filter (fun x : ℕ => (d : ℤ) ∣ f.eval (x : ℤ))).card

/-- The roots of `f` modulo `d`, as a finset of representatives in `[0, d)`. -/
def roots (f : ℤ[X]) (d : ℕ) : Finset ℕ :=
  (range d).filter (fun x : ℕ => (d : ℤ) ∣ f.eval (x : ℤ))

/-- `ν_f(d, h)`: the number of `x ∈ [0, d)` with `d ∣ f(x)` and `d ∣ f(x + h)`. -/
def nu (f : ℤ[X]) (d : ℕ) (h : ℤ) : ℕ :=
  ((range d).filter
    (fun x : ℕ => (d : ℤ) ∣ f.eval (x : ℤ) ∧ (d : ℤ) ∣ f.eval ((x : ℤ) + h))).card

/-- The local factor of the Bateman–Horn constant `C(f)` at `p`: `(1 - ω_f(p)/p)/(1 - 1/p)`. -/
noncomputable def Efac (f : ℤ[X]) (p : ℕ) : ℝ :=
  (1 - (omega f p : ℝ) / p) / (1 - 1 / (p : ℝ))

/-- The local factor of the pair singular series `S_f(h)` at `p`:
`(1 - (2ω_f(p) - ν_f(p,h))/p)/(1 - 1/p)^2`. -/
noncomputable def Tfac (f : ℤ[X]) (p : ℕ) (h : ℤ) : ℝ :=
  (1 - (2 * (omega f p : ℝ) - nu f p h) / p) / (1 - 1 / (p : ℝ)) ^ 2

/-- `g_p(h) = (p ν_f(p,h) - ω_f(p)^2)/(p - ω_f(p))^2`, so that `T_p(h) = E_p^2 (1 + g_p(h))`. -/
noncomputable def gfac (f : ℤ[X]) (p : ℕ) (h : ℤ) : ℝ :=
  ((p : ℝ) * nu f p h - (omega f p : ℝ) ^ 2) / ((p : ℝ) - omega f p) ^ 2

/-- Partial product `∏_{p ≤ x, p prime} E_p`, whose limit is `C(f)`. -/
noncomputable def Cpartial (f : ℤ[X]) (x : ℕ) : ℝ :=
  ∏ p ∈ (range (x + 1)).filter Nat.Prime, Efac f p

/-- Partial product `∏_{p ≤ x, p prime} T_p(h)`, whose limit is `S_f(h)`. -/
noncomputable def Spartial (f : ℤ[X]) (h : ℤ) (x : ℕ) : ℝ :=
  ∏ p ∈ (range (x + 1)).filter Nat.Prime, Tfac f p h

/-- The root Ramanujan sum `c^f_q(h) := ∑_{d ∣ q} d μ(q/d) ν_f(d,h) ω_f(q/d)^2`.
For squarefree `q` this equals `∑_{s,s'} c_q(s' - s - h)` of the paper; we never need that form. -/
def cf (f : ℤ[X]) (q : ℕ) (h : ℤ) : ℤ :=
  ∑ d ∈ q.divisors,
    (d : ℤ) * ArithmeticFunction.moebius (q / d) * nu f d h * (omega f (q / d) : ℤ) ^ 2

/-- `b(q) = ∏_{p ∣ q} (p - ω_f(p))^{-2}`. -/
noncomputable def bfun (f : ℤ[X]) (q : ℕ) : ℝ :=
  ∏ p ∈ q.primeFactors, (((p : ℝ) - omega f p) ^ 2)⁻¹

/-- The summand of the expansion, `F_h(q) = μ(q)^2 b(q) c^f_q(h)`, supported on squarefree `q`. -/
noncomputable def Fterm (f : ℤ[X]) (h : ℤ) (q : ℕ) : ℝ :=
  ((ArithmeticFunction.moebius q : ℤ) : ℝ) ^ 2 * bfun f q * (cf f q h : ℝ)

/-- The Euler factor `1 - ω_f(p)^2/(p - ω_f(p))^2` of the constant in `W_f`. -/
noncomputable def Pfac (f : ℤ[X]) (p : ℕ) : ℝ :=
  1 - (omega f p : ℝ) ^ 2 / ((p : ℝ) - omega f p) ^ 2

/-- `W_f(d) = μ(d)² d b(d) ∏_{p ∤ d} (1 - ω_f(p)^2/(p - ω_f(p))^2)`: the paper's `W_f` on squarefree
`d`, and `0` off squarefree `d` (the paper's sums over `d` run over squarefree `d` only). -/
noncomputable def W (f : ℤ[X]) (d : ℕ) : ℝ :=
  ((ArithmeticFunction.moebius d : ℤ) : ℝ) ^ 2 * (d : ℝ) * bfun f d *
    ∏' p : Nat.Primes, (if (p : ℕ) ∣ d then 1 else Pfac f p)

/-- `a_f(d) = W_f(d) ω_f(d)`. -/
noncomputable def a (f : ℤ[X]) (d : ℕ) : ℝ := W f d * omega f d

/-- `ψ_d(m, H) = #{1 ≤ h ≤ H : h ≡ m (mod d)} - H/d`. -/
noncomputable def psi (d : ℕ) (m : ℤ) (H : ℕ) : ℝ :=
  (((Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - m)).card : ℝ) - (H : ℝ) / d

/-- `Ψ_d(H) = ∑_{s, s'} ψ_d(s' - s, H)` over ordered pairs of roots of `f` modulo `d`. -/
noncomputable def Psi (f : ℤ[X]) (d : ℕ) (H : ℕ) : ℝ :=
  ∑ s ∈ roots f d, ∑ s' ∈ roots f d, psi d ((s' : ℤ) - s) H

/-- The off-diagonal remainder `Off_f(H) = ∑_d W_f(d) ∑_{s ≠ s'} ψ_d(s' - s, H)`. -/
noncomputable def Off (f : ℤ[X]) (H : ℕ) : ℝ :=
  ∑' d : ℕ, W f d * ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, psi d ((s' : ℤ) - s) H

/-- `B_d(m) = ∑_{h ≤ H, h ≡ m (d)} (H - h) - H^2/(2d)`. -/
noncomputable def B (d : ℕ) (m : ℤ) (H : ℕ) : ℝ :=
  (∑ h ∈ (Icc 1 H).filter (fun h : ℕ => (d : ℤ) ∣ (h : ℤ) - m), ((H : ℝ) - h)) - (H : ℝ) ^ 2 / (2 * d)

/-- `φ(θ) = θ - θ^2`. -/
def phi (θ : ℝ) : ℝ := θ - θ ^ 2

/-- The bracket of `Off*`: `-m(d-m)/d + (d/2)(φ({(H-m)/d}) + φ({(H+m)/d}))`. -/
noncomputable def bracket (d : ℕ) (m : ℤ) (H : ℕ) : ℝ :=
  -((m : ℝ) * ((d : ℝ) - m)) / d
    + (d : ℝ) / 2 * (phi (Int.fract (((H : ℝ) - m) / d)) + phi (Int.fract (((H : ℝ) + m) / d)))

/-- `Off*_f(H)`, summed over unordered pairs of distinct roots, written as one half of the sum over
ordered pairs `s ≠ s'` (the bracket is invariant under `m ↦ d - m`). `m = (s' - s) mod d`. -/
noncomputable def OffStar (f : ℤ[X]) (H : ℕ) : ℝ :=
  ∑' d : ℕ, W f d *
    ((1 / 2 : ℝ) * ∑ s ∈ roots f d, ∑ s' ∈ (roots f d).erase s, bracket d (((s' : ℤ) - s) % d) H)

end PairSingularSeries
