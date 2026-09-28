# STATUS — what is proved, what is assumed (29 Sep 2026)

Every theorem below that is marked PROVED builds with `lake build`, contains no `sorry`, and
`#print axioms` shows only `propext`, `Classical.choice`, `Quot.sound` (see `Axioms.lean`).

## Definitions (`Defs.lean`) — PROVED to compile; source of truth for the statements

omega, roots, nu, Efac (C(f) local factor), Tfac (S_f(h) local factor), gfac, Cpartial, Spartial,
cf (root Ramanujan sum, by its divisor sum), bfun, Fterm, Pfac, W, a, psi, Psi, Off, B, phi, bracket,
OffStar.  Paper ↔ Lean: see ../FORMAL-PLAN.md §1.

## Tier 1 — finite, unconditional

| paper | Lean | file | status |
|---|---|---|---|
| L7  closed form of B_d(m), 1 ≤ m ≤ d, all H (also d > H, m > H) | `B_closed` | Bd.lean | PROVED |
| L7  the class {h ≤ H : h ≡ m (d)} = {m + kd : k < (H+d−m)/d} | `class_eq_image` | Bd.lean | PROVED |
| L7  ⌊(H−m)/d⌋ = (H+d−m)/d − 1 | `floor_eq` | Bd.lean | PROVED |
| L7′ B_d(d) = −H/2 + (d/2)φ({H/d}) | `B_diag` | Bracket.lean | PROVED |
| L8  B_d(m) + B_d(d−m) = bracket, 1 ≤ m ≤ d−1 | `bracket_eq` | Bracket.lean | PROVED |
| L9  \|bracket\| ≤ d/4 — for EVERY d ≥ 2, not only d ≤ H (stronger than the paper states; the paper's d ≤ H restriction is not needed for this bound, only for its use) | `bracket_abs_le` | Bracket.lean | PROVED |
| 0 ≤ φ ≤ 1/4 on [0,1) | `phi_bounds` | Bracket.lean | PROVED |
| tool: CRT COUNTING — for coprime m,n and ANY predicates P,Q: #{x<mn : P(x mod m) ∧ Q(x mod n)} = #{a<m : P a}·#{b<n : Q b} (not in Mathlib in this form) | `card_filter_crt`, `crt_injOn`, `crt_image` | CRT.lean | PROVED |
| L1  ω, ν multiplicative; ω(1) = ν(1,h) = 1; ω(0) = ν(0,h) = 0 | `omega_mul`, `nu_mul`, `omega_one`, `nu_one`, `omega_zero`, `nu_zero` | CRT.lean | PROVED |
| L2  c^f = (d ↦ dν(d,h)) ∗ (m ↦ μ(m)ω(m)²) as arithmetic functions; multiplicative; c^f_1 = 1, c^f_0 = 0; c^f_p = pν(p,h) − ω(p)² | `cf_eq_mul`, `cf_mul`, `cf_one`, `cf_zero`, `cf_prime` | Mult.lean | PROVED |
| L2′ b multiplicative, b(1) = 1, b(p) = (p−ω(p))⁻²; F_h multiplicative, F_h(0) = 0, F_h(1) = 1, F_h(p) = g_p(h), F_h(p^k) = 0 for k ≥ 2 | `bfun_mul`, `bfun_one`, `bfun_prime`, `Fterm_mul`, `Fterm_zero`, `Fterm_one`, `Fterm_prime`, `Fterm_prime_pow` | Mult.lean | PROVED |
| L3  T_p(h) = E_p²(1 + g_p(h)) for ω(p) < p | — | — | TODO |
| L4  Σ_{h≤H} ν(d,h) = ω(d)²H/d + Ψ_d(H) | — | — | TODO |
| L5  Σ_{h≤H} c^f_q(h) = Σ_{d\|q} dμ(q/d)ω(q/d)²Ψ_d(H), q > 1 squarefree | — | — | TODO |
| L6  weighted version with (H − h) | — | — | TODO |
| L9′ ψ_d(0,H) = −{H/d} | — | — | TODO |
| L10 ω ≤ 1 ⇒ Off ≡ 0, Off* ≡ 0 (Theorem 5(i)) | — | — | TODO |

## Tier 2 — analysis, unconditional — all TODO

A1 Σ_p \|g_p(h)\| < ∞; A2 Σ_q F_h(q) absolutely convergent and = ∏_p(1+g_p(h)) (Mathlib
`EulerProduct.eulerProduct_tprod`); A3 THEOREM 1 (expansion) with hypothesis "Cpartial → C";
A4 Σ_d d b(d)\|Ψ_d(H)\| < ∞; A5 eq. (identity); A6 eq. (split); A7 THEOREM 5 exact identity,
Off* absolutely convergent.

## Tier 3 — conditional — all TODO

Hypotheses (each a Lean hypothesis, never an axiom):
  (E1) `Tendsto (Cpartial f) atTop (𝓝 C)`, `0 < C`   — Landau's prime ideal theorem for Q[t]/(f).
  (E2) `∃ K, ∀ H ≥ 2, |Σ_{d≤H} a f d − C⁻¹ log H| ≤ K`   — paper I, Theorem 2 (Dedekind zeta).
  (E3) `∃ K, ∀ H ≥ 1, Σ_{d≤H} d |a f d| ≤ K H`   — Shiu 1980.
T5a tail Σ_{d>H} a(d)/d = O(1/H) from (E2) by Abel summation (Mathlib `sum_mul_eq_sub_integral_mul`);
T5b THEOREM 5 (smoothed); T5c Theorem 5(ii) as an equivalence.

## Not formalised, by design
(E1)–(E3) themselves, and Chebotarev for the exponent r_f in Theorem 5(ii)'s trivial bound.
