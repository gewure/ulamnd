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
| L6  weighted version with (H − h) | — | — | TODO |
| L9′ ψ_d(0,H) = −{H/d} | — | — | TODO |
| L10 **Theorem 5(i)**: ω(p) ≤ 1 ∀p ⇒ ω(d) ≤ 1 for squarefree d ⇒ Off* ≡ 0 | `omega_prod_primeFactors_of_squarefree`, `omega_le_one_of_squarefree`, `OffStar_eq_zero_of_omega_le_one` | Split2.lean | PROVED |

## Tier 2 — analysis: THEOREM 1 IS PROVED, and both exact identities (Theorem 1's eq. (identity), Theorem 5's, corrected)

| paper | Lean | file | status |
|---|---|---|---|
| hypotheses on f: deg ≥ 1; no fixed prime divisor ω(p) < p; the resultant condition (for h ≠ 0 a nonzero N_h divisible by every prime with ν(p,h) ≠ 0) | `Admissible` (structure) | Hyp.lean | DEFINED |
| tool: ω(d) = #roots of f̄ in ZMod d; ROOT BOUND ω(p) ≤ deg f for primes p ∤ lc(f) | `omega_eq_card_zmod`, `omega_le_natDegree` | Hyp.lean | PROVED |
| tool (Mathlib candidate): a multiplicative F with F(0)=0, F(1)=1, F(p^k)=0 for k≥2 and Σ_p \|F(p)\| < ∞ is absolutely summable; the bound Σ_{q<N}\|F q\| ≤ ∏_{p<N}(1+\|F p\|) | `summable_abs_of_squarefree_mult`, `sum_range_abs_le_prod`, `abs_le_prod_primeFactors`, `eq_zero_of_not_squarefree` | SqfreeSummable.lean | PROVED |
| A1  \|g_p(h)\| ≤ 4(deg f)²/p² for p > 2 deg f, p ∤ lc, ν(p,h)=0; Σ_p \|g_p(h)\| < ∞ | `abs_gfac_le`, `summable_gabs` | Expansion.lean | PROVED |
| A2  Σ_q \|F_h(q)\| < ∞; Σ_e F_h(p^e) = 1 + g_p(h); ∏_{p≤x}(1+g_p(h)) → Σ_q F_h(q) (Euler product, Mathlib `EulerProduct.eulerProduct`) | `summable_abs_Fterm`, `tsum_Fterm_pow`, `tendsto_prod_one_add_gfac` | Expansion.lean | PROVED |
| A3  THEOREM 1, exact finite form: ∏_{p≤x} T_p(h) = (∏_{p≤x} E_p)² ∏_{p≤x}(1+g_p(h)) for EVERY x — unconditional | `Spartial_eq` | Expansion.lean | PROVED |
| A3  **THEOREM 1** (eq. expansion): if ∏_{p≤x} E_p → C then ∏_{p≤x} T_p(h) → C²·Σ_q F_h(q), i.e. S_f(h) = C(f)² Σ_{q sqfree} b(q) c^f_q(h) — hypotheses: `Admissible f`, `h ≠ 0`, convergence of C(f)'s partial products | `expansion` | Expansion.lean | PROVED |
| tool (Mathlib candidate): REGROUPING a summable double series over ℕ×ℕ vanishing on the axes along divisor antidiagonals, Σ'_q Σ_{dm=q} G(d,m) = Σ' G (extracted from Mathlib's L-series convolution proof) | `hasSum_sum_divisorsAntidiagonal`, `tsum_sum_divisorsAntidiagonal` | Regroup.lean | PROVED |
| L5  Σ_{h≤H} w(h) c^f_q(h) = Σ_{d\|q} dμ(q/d)ω(q/d)² Ψ^{w,κ}_d for squarefree q > 1, ANY weight w and constant κ; Σ_{d\|q} μ(d) = 0 for q > 1; coprimality of d and q/d for squarefree q | `sum_weight_cf`, `sum_moebius_divisors`, `coprime_div_of_squarefree`, `omega_div_mul` | Identity.lean | PROVED |
| A4  for h ≠ 0, squarefree d with ν(d,h) ≠ 0 divides N_h (finite support); Σ_d \|A(d)\| < ∞, Σ_m \|B(m)\| < ∞, G summable on ℕ×ℕ | `nu_ne_zero_dvd`, `summable_abs_Aterm`, `summable_abs_Bterm`, `summable_Gterm` | Identity2/3.lean | PROVED |
| the antidiagonal identity Σ_{dm=q} G(d,m) = Σ_{h≤H} w(h)F'_h(q) + [q=1]Ψ_1; the Euler product Σ_m [coprime d m] B(m) = ∏_{p∤d} P_p | `sum_antidiag_Gterm`, `tsum_Bd` | Identity2/4.lean | PROVED |
| **THE WEIGHTED IDENTITY**: Σ_{h≤H} w(h)(Σ_q F_h(q) − 1) = Σ_d W(d) Ψ^{w,κ}_d − Ψ^{w,κ}_1, for ANY w, κ | `weighted_identity` | Identity4.lean | PROVED |
| S_f(h) := lim ∏_{p≤x} T_p(h); S_f(h) = C² Σ_q F_h(q) (Theorem 1 in the paper's form) | `Sf`, `Sf_eq` | Theorems.lean | PROVED |
| A5  **eq. (identity)**: Σ_{h≤H}(S_f(h) − C²) = C² Σ_d W(d) Ψ_d(H) — exactly as printed | `eq_identity` | Theorems.lean | PROVED |
| A6  eq. (split) | — | — | TODO |
| A7  **THEOREM 5, the exact identity, CORRECTED** (ERRATA 43): Σ_{h≤H}(H−h)(S_f(h) − C²) = C²(Σ_d W(d) Σ_{s,s'} B_d(s'−s) + H/2). The paper's display lacked the +H/2 (the q = 1 remainder Ψ_1 = −H/2); found by this formalisation. | `eq_smoothed_exact`, `PsiW_smoothed_one` | Theorems.lean | PROVED |
| A6  B_d(m) depends on m mod d; B_d(d) = −H²/(2d) for d > H; the pairing (s,s') ↔ (s',s): Σ_{s,s'} B_d(s'−s) = ω(d)B_d(d) + ½Σ_{s≠s'} bracket | `B_congr`, `B_diag_gt`, `sum_offdiag_B`, `sum_B_split` | Split.lean | PROVED |
| A7′ \|W(d)\| ≤ μ²db(d)·Σ\|B\|; the diagonal series summable; Off*(H) absolutely convergent; Σ_d W·ΣΣB = Σ_d a(d)B_d(d) + Off*(H); Theorem 5's identity in split form | `abs_W_le`, `summable_diag`, `summable_oterm`, `tsum_split`, `eq_smoothed_split` | Split2.lean | PROVED |
| L10 **Theorem 5(i)**: ω(p) ≤ 1 ∀p ⇒ ω(d) ≤ 1 for squarefree d ⇒ Off* ≡ 0 | `omega_prod_primeFactors_of_squarefree`, `omega_le_one_of_squarefree`, `OffStar_eq_zero_of_omega_le_one` | Split2.lean | PROVED |

## Tier 3 — conditional on the named inputs: PROVED

| paper | Lean | file | status |
|---|---|---|---|
| tool (Mathlib candidate): discrete Abel identity Σ_{H<d≤X} a(d)/d = Σ_{H<d≤X}(A(d)−A(H))/(d(d+1)) + (A(X)−A(H))/(X+1); Σ_{H<d≤X} 1/(d(d+1)) = 1/(H+1) − 1/(X+1); log x ≤ 2√x; d^{−3/2} ≤ 2(1/√(d−1) − 1/√d) | `sum_Ioc_div_eq`, `sum_Ioc_one_div_mul_succ`, `log_le_two_sqrt`, `inv_mul_sqrt_le` | Tail.lean | PROVED |
| T5a  TAIL BOUND: if \|A(n) − L log n\| ≤ K (n ≥ 1) and Σ\|a(d)\|/d < ∞ then \|Σ_{d>H} a(d)/d\| ≤ (2K + 4\|L\|)/H — no integrals | `tail_div_le` | Tail.lean | PROVED |
| the diagonal series split at H: Σ_d a(d)B_d(d) = −(H/2)Σ_{d≤H}a(d) + ½Σ_{d≤H} d a(d)φ({H/d}) − (H²/2)Σ_{d>H} a(d)/d; \|a(d)\|/d ≤ Bsum·\|B(d)\| | `tsum_dterm_split`, `abs_a_div_le`, `summable_abs_a_div` | Asymptotic.lean | PROVED |
| T5b  **THEOREM 5, eq. (smoothed)**: under (E1) with C > 0, (E2), (E3): for all H ≥ 2, \|Σ_{h≤H}(1−h/H)(S_f(h)−C²) + ½C log H − (C²/H)Off*(H)\| ≤ (C²/2)K₂ + C²K₃/8 + C²(K₂ + 2/C) + C²/2 | `smoothed` | Asymptotic.lean | PROVED |
| T5c  **Theorem 5(ii)**: under (E1)–(E3), Σ_{h≤H}(1−h/H)(S_f(h)−C²) + ½C log H = o(log H) ⇔ Off*(H) = o(H log H) | `smoothed_iff` | Equivalence.lean | PROVED |
| CODA: irreducibility over ℚ ⇒ the resultant condition (Bézout in ℚ[X], denominators cleared by `IsLocalization.integerNormalization`); `Admissible f` from `Irreducible (f.map (algebraMap ℤ ℚ))` and ω(p) < p | `isCoprime_map_comp`, `exists_int_bezout`, `resultant_condition_of_irreducible`, `admissible_of_irreducible` | Irreducible.lean | PROVED |

Hypotheses, as Lean hypotheses (never axioms):
  (E1) `Tendsto (Cpartial f) atTop (𝓝 C)`, and `0 < C` for eq. (smoothed) — Landau's prime ideal theorem for Q[t]/(f).
  (E2) `∀ n ≥ 1, |Σ_{d ∈ Icc 1 n} a f d − C⁻¹ log n| ≤ K₂` — paper I, Theorem 2 (Dedekind zeta).
  (E3) `∀ n ≥ 1, Σ_{d ∈ Icc 1 n} d |a f d| ≤ K₃ n` — Shiu 1980.

## Not formalised, by design
(E1)–(E3) themselves, and Chebotarev for the exponent r_f in Theorem 5(ii)'s trivial bound.
