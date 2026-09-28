# Formalising Theorems 1 and 5 of paper I in Lean 4 / Mathlib — plan and honest scope

Started 29 Sep 2026. Project: research/lean/PairSingularSeries (Lake project, Mathlib dependency).
Toolchain: elan 4.2.4 in ~/.elan (user-local, no root); Lean/Mathlib versions pinned in the project's
lean-toolchain and lake-manifest.json.

## 0. What the two theorems actually rest on (read before promising anything)

Paper I, Theorem 1 (thm:expansion) and Theorem 5 (thm:smoothed). Their proofs, as written, use:

  (E1) the EXISTENCE of C(f) = ∏_p (1 − ω_f(p)/p)/(1 − 1/p). This product converges only conditionally
       (ω_f(p) averages 1 by Chebotarev); its convergence is Landau's prime-ideal theorem for K = Q[t]/(f),
       NOT elementary and NOT in Mathlib. Theorem 1 uses C(f) as a given constant.
  (E2) Theorem 2 of the paper: Σ_{d≤H} a_f(d) = C(f)^{-1} log H + O(1). This is the Dedekind zeta function
       of K having a simple pole at 1 with a residue computation, plus a Tauberian/partial-summation step.
       NOT elementary, NOT in Mathlib in this form. Theorem 5's proof cites it for the −½C log H term.
  (E3) Shiu's theorem (Σ_{d≤H} d|a_f(d)| = O(H)), used in Theorem 5 for the φ({H/d}) term. NOT in Mathlib.
  (E4) Chebotarev, for the exponent r_f in Theorem 5(ii)'s trivial bound. NOT in Mathlib.

Everything else — the Euler-product expansion, Möbius cancellation, Ramanujan-type root sums, the finite
identities in h, the closed form of B_d(m), the bracket, the bounds |bracket| ≤ d/4, the rearrangements of
absolutely convergent series, part (i) — IS elementary and IS formalisable with what Mathlib has.

So the deliverable that is both honest and achievable is:

  THEOREM 1 formally verified, with C(f) entering as a hypothesis "the partial products converge to C"
  (exactly how the paper uses it), and everything else proved.
  THEOREM 5 formally verified MODULO THREE NAMED HYPOTHESES (E1)–(E3), each stated as a Lean hypothesis
  with the paper's citation attached; the derivation from them, including Abel summation for the tail
  term and every exact identity, proved. Part (ii)'s "iff" proved; its trivial bound with r_f (E4) not.

A paper sentence that is TRUE after this: "Theorem 1 and the identities of Theorem 5 are formally
verified in Lean 4/Mathlib; the asymptotic of Theorem 5 is verified conditionally on three explicitly
stated inputs (Landau's theorem for C(f), Theorem 2, and Shiu's bound), see repository." Anything
stronger would be false, and a formal reader would find that out in a minute — which is the whole point.

## 1. Definitions, in arithmetic form (no exponential sums anywhere)

f : Polynomial ℤ. Hypotheses used: (H1) no fixed prime divisor: ω_f(p) < p for all primes p;
(H2) for every h ≥ 1 the polynomials f(t), f(t+h) are coprime over ℚ, i.e. there are A, B ∈ ℤ[t] and an
integer N_h ≠ 0 with A f(t) + B f(t+h) = N_h. (H2) follows from irreducibility and deg f ≥ 1; it is what
"R(h) ≠ 0" is used for: a common root of f, f(·+h) modulo p forces p | N_h.

For d ≥ 1:
  ω(d)   := #{x : ZMod d | f(x) = 0}
  ν(d,h) := #{x : ZMod d | f(x) = 0 ∧ f(x+h) = 0}
Both multiplicative in d (CRT: ZMod (mn) ≃+* ZMod m × ZMod n for coprime m, n).

Local factors (in ℝ), for p prime:
  E_p     := (1 − ω(p)/p)/(1 − 1/p)                    [C(f) factor]
  T_p(h)  := (1 − (2ω(p) − ν(p,h))/p)/(1 − 1/p)²       [S_f(h) factor]
  g_p(h)  := (p ν(p,h) − ω(p)²)/(p − ω(p))²
Identity (needs ω(p) ≠ p): T_p(h) = E_p² (1 + g_p(h)).

Root Ramanujan sum, DEFINED by its divisor sum:
  c^f_q(h) := Σ_{d | q} d μ(q/d) ν(d,h) ω(q/d)²
(= Σ_{s,s'} c_q(s'−s−h) for squarefree q; we never need that form.) It is the Dirichlet convolution of
d ↦ d ν(d,h) with m ↦ μ(m) ω(m)², hence multiplicative; c^f_p(h) = p ν(p,h) − ω(p)².
  b(q) := ∏_{p | q} (p − ω(p))^{−2}   (multiplicative)
  F_h(q) := μ(q)² b(q) c^f_q(h)        (multiplicative, supported on squarefree q; F_h(p) = g_p(h))
  W(d) := d b(d) ∏_{p ∤ d} (1 − ω(p)²/(p − ω(p))²)      a(d) := W(d) ω(d)
  ψ_d(m,H) := #{h ≤ H : h ≡ m (d)} − H/d
  Ψ_d(H)   := Σ_{(s,s') roots mod d} ψ_d(s'−s, H)
  Off(H)   := Σ_d W(d) Σ_{s ≠ s'} ψ_d(s'−s, H)
  B_d(m)   := Σ_{h ≤ H, h ≡ m (d)} (H − h) − H²/(2d)
  φ(θ)     := θ − θ²
  Off*(H)  := Σ_{d≥2} W(d) Σ_{{s,s'}, s≠s'} [ −m(d−m)/d + (d/2)(φ({(H−m)/d}) + φ({(H+m)/d})) ],  m = s'−s mod d

## 2. Statements to be proved, in tiers

TIER 1 — finite/elementary, unconditional.
  L1  ω, ν multiplicative (CRT).                             L2  c^f multiplicative; c^f_p = pν − ω².
  L3  T_p(h) = E_p² (1 + g_p(h)) when ω(p) < p.               L4  Σ_{h≤H} ν(d,h) = ω(d)² H/d + Ψ_d(H).
  L5  Σ_{h≤H} c^f_q(h) = Σ_{d|q} d μ(q/d) ω(q/d)² Ψ_d(H) for squarefree q > 1  (uses Σ_{d|q} μ(q/d) = 0).
  L6  Weighted version with (H − h): Σ_{h≤H}(H−h) ν(d,h) = ω(d)² H²/(2d) + Σ_{(s,s')} B_d(s'−s).
  L7  Closed form of B_d(m) for 1 ≤ m ≤ d, all d ≥ 1 (also d > H); B_d(d) = −H/2 + (d/2)φ({H/d}).
  L8  Bracket: B_d(m) + B_d(d−m) = −m(d−m)/d + (d/2)(φ({(H−m)/d}) + φ({(H+m)/d})), 1 ≤ m ≤ d−1.
  L9  |bracket| ≤ d/4 for d ≤ H;  ψ_d(0,H) = −{H/d}.
  L10 If ω(p) ≤ 1 for all p then there are no pairs s ≠ s', so Off ≡ 0 and Off* ≡ 0  [Theorem 5(i)].

TIER 2 — analysis, unconditional.
  A1  Σ_p |g_p(h)| < ∞ (for p ∤ N_h, g_p(h) = −ω(p)²/(p−ω(p))², |·| ≤ n²/(p−n)²; finitely many exceptions).
  A2  Σ_q |F_h(q)| < ∞ and Σ_q F_h(q) = ∏_p (1 + g_p(h))  [Mathlib's Euler product for multiplicative f
      with summable norm; ∑_e F_h(p^e) = 1 + g_p(h) since F_h vanishes off squarefree].
  A3  THEOREM 1, eq. (expansion): if ∏_{p≤x} E_p → C then ∏_{p≤x} T_p(h) → C² Σ_q F_h(q).
      (Equivalently, unconditionally: ∏_{p≤x} T_p(h) = (∏_{p≤x} E_p)² ∏_{p≤x}(1+g_p(h)) for every x.)
  A4  Σ_d d b(d) |Ψ_d(H)| < ∞ (ν(d,h) ≠ 0 with d squarefree forces d | N_h, so finitely many d per h).
  A5  eq. (identity): Σ_{h≤H}(S_f(h) − C²) = C² Σ_{d≥2} W(d) Ψ_d(H)  [swap finite h-sum with tsum; L5;
      resum q = d·m with (m,d) = 1: Σ_{(m,d)=1} μ(m) b(m) ω(m)² = ∏_{p∤d}(1 − ω²/(p−ω)²), Euler product again].
  A6  eq. (split): the diagonal/off-diagonal separation, both series absolutely convergent.
  A7  THEOREM 5, exact identity: Σ_{h≤H}(H−h)(S_f(h) − C²) = C² Σ_{d≥2} W(d) Σ_{(s,s')} B_d(s'−s);
      diagonal = −(H/2)Σ_{d≤H} a(d) + ½Σ_{d≤H} d a(d) φ({H/d}) − (H²/2)Σ_{d>H} a(d)/d; off-diagonal = Off*(H)
      by L8 after pairing (s,s') with (s',s); Off*(H) absolutely convergent.

TIER 3 — conditional on the named inputs.
  Hypotheses: (E1) Tendsto (∏_{p≤x} E_p) atTop (𝓝 C) with C > 0;
              (E2) ∃K, ∀H≥2, |Σ_{d≤H} a(d) − C^{-1} log H| ≤ K;
              (E3) ∃K, ∀H≥1, Σ_{d≤H} d |a(d)| ≤ K H.
  T5a  From (E2) by Abel summation (Mathlib: sum_mul_eq_sub_sub_integral_mul): Σ_{d>H} a(d)/d = O(1/H)
       [the paper states 1/(CH) + o(1/H); O(1/H) is all that is used].
  T5b  THEOREM 5, eq. (smoothed): Σ_{h≤H}(1 − h/H)(S_f(h) − C²) = −½ C log H + O(1) + (C²/H) Off*(H).
  T5c  Theorem 5(ii), the equivalence: the Cesàro leading term holds iff Off*(H) = o(H log H).

NOT FORMALISED (and said so in the paper): (E1)–(E4) themselves.

## 3. Mathlib entry points to check once the cache is in
  ArithmeticFunction (IsMultiplicative, moebius, sum over divisors of μ = 0: `ArithmeticFunction.sum_divisors_moebius`?),
  ZMod.chineseRemainder, Polynomial roots over ZMod, EulerProduct.eulerProduct / eulerProduct_hasProd,
  HasProd / tprod, Summable.of_norm_bounded, Int.fract / Int.floor lemmas, Abel summation
  (`sum_mul_eq_sub_sub_integral_mul`), Real.log. Ramanujan sums themselves: probably absent — not needed.

## 4. Rules for this project
  - No `sorry` in anything called "verified"; `#print axioms` on each main theorem must show only
    propext, Classical.choice, Quot.sound.
  - Every hypothesis that replaces a deep theorem is named `hyp_*`, documented with the citation, and
    listed in STATUS.md. The list is the honest fine print and goes into the paper verbatim.
  - The Lean definitions are the source of truth; where they differ from the paper's prose (c^f defined by
    its divisor sum, C(f) as a limit hypothesis), the paper gets a remark.
