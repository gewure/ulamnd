# Notes: where this could become a substantial result

Working notes, 8 September 2026. These are hints and a programme, not results. Everything marked
*conjectural* or *programme* is unproven. Written to accompany `main.tex`.

## 1. What is now proved, and what the proof exposes

The paper's Section 3 proves an exact identity. With ρ_d(a) = Σ_{f(s)≡0 (d)} e(as/d) and
c_q^f(h) = Σ_{(a,q)=1} |ρ_q(a)|² e(−ah/q) (a "root Ramanujan sum"),

    S_f(h)/C(f)² = Σ_{q squarefree} b(q) c_q^f(h),      b(q) = Π_{p|q} (p − ω_f(p))^{−2},

and, summing over h ≤ H,

    Σ_{h≤H} (S_f(h) − C²) = C² Σ_{d≥2} W_f(d) Ψ_d(H),
    W_f(d) = d·b(d)·Π_{p∤d} (1 − ω(p)²/(p−ω(p))²),
    Ψ_d(H) = Σ_{s,s' roots mod d} ( #{h ≤ H : h ≡ s'−s (d)} − H/d ).

The pairs s = s' give the *diagonal* −Σ_d a(d){H/d} with a(d) = W_f(d)ω(d). Its Dirichlet series is

    D(s) = Σ_d a(d) d^{−s} = ζ_K(s+1)·E(s),       K = ℚ[t]/(f),

with E holomorphic near s = 0, and Res_{s=0} D = 1/C(f). This is the −½·C(f)·log H.

**The Dedekind zeta function of the field cut out by f has appeared in the second moment of the
prime values of f.** For the Ulam spiral this means: each lattice line of the d-dimensional spiral
carries a degree-d polynomial f, hence a number field K_f of degree d, and the second-order
statistics of the primes on that line are governed by ζ_{K_f}. That is the first place in this whole
project where the primes on the spiral connect to an L-function.

## 2. The concrete programme (the candidate "7")

### 2.1 Known model: f = t (Vaughan, Goldston–Suriajaya)

For the twin-prime singular series 𝔖, Vaughan (2001) proved for the Cesàro mean

    S₁(x) = Σ_{k≤x} (x − k) 𝔖(k) = ½x² − ½ x log x + ½(1 − γ − log 2π) x + E(x),
    E(x) ≪ x^{1/2} exp(−c (log x)^{3/5}/(log log x)^{1/5}),   and  E(x) ≪ x^{5/12+ε} under RH,

and Goldston–Suriajaya (Acta Arith. 2021, arXiv:2007.16099) showed that for the Riesz means
S_m(x) = Σ_{k≤x}(x−k)^m 𝔖(k), m ≥ 2, the error term is an explicit formula

    E_m(x) = x^{m−1} Σ_{|γ|≤U} a(ρ) x^{ρ/2} + O(x^{m−1+ε}),     ρ = β + iγ zeros of ζ,

with a(ρ) involving ζ(ρ/2 − 1)ζ(ρ/2)/ζ'(ρ) and an Euler product 𝒢(ρ/2 − 1). Unconditionally
E_m(x) = Ω_±(x^{m−3/4}). The zeros enter because the generating Dirichlet series of 𝔖 contains a
factor 1/ζ(2s) (from the squarefree support of the Ramanujan-sum expansion), so the contour integral
picks up poles at s = ρ/2.

### 2.2 The polynomial analogue (programme)

Our expansion has exactly the same shape with a(d) in place of μ²(q)/φ(q)², and D(s) = ζ_K(s+1)E(s).
The squarefree support of a(d) produces, inside E(s), Euler factors 1 − c_p p^{−2−2s} + … with c_p a
quadratic expression in ω(p) (the local factor is P_p + p b(p) ω(p) p^{−s} with P_p = 1 − ω²/(p−ω)²;
expanding gives 1 + ω p^{−1−s} − ω² p^{−2} + 2ω² p^{−2−s} + …). Which L-function this corresponds to
must be worked out; because ω(p)² counts *pairs* of roots, expect the L-function of the permutation
representation of Gal(f) on ordered pairs of roots (which contains ζ_K and, for quadratics, ζ·L(χ_D)
twice). Working out the exact factorisation

    Σ_h S_f(h) h^{−s} = ζ(s) · ζ_K(s+1) · E(s),   E(s) = Π (local factor),   E(s) ~ 1/L(2s+2, π_f) · (abs. conv.)

is a finite, mechanical computation with the local factors (P_p + p b(p) ω(p) p^{−s}) already in hand.
If it comes out as expected, then Perron's formula for the Riesz means of Σ_h S_f(h) gives:

* main terms ½C·x² − ½C·x log x + (constant)·x, i.e. Conjecture 1 in Cesàro form (this part is the
  smoothed Theorem of Section 3, already proved for the diagonal);
* an explicit formula for the error term over the zeros of ζ_K (and of the pair L-function), with
  terms x^{ρ_K/2}·(…);
* hence: the size of the fluctuations of the pair-correlation sum of the prime values of f is
  controlled by the Riemann Hypothesis for ζ_K. Under GRH for K the error is O(x^{1/2+ε})-type;
  unconditionally it is Ω_±(x^{3/4−…}) as in Goldston–Suriajaya.

The obstacle is the off-diagonal part (pairs of distinct roots). In the Dirichlet-series formulation
it is *not* an obstacle: Σ_h S_f(h)h^{−s} is a single Euler product and the off-diagonal terms are
inside the local factors. The obstacle appears only when one wants to isolate the −½C log H from the
fractional-part sums by elementary means. So the analytic route (Perron + Euler product) is the
right one, and it is the route that produces the L-function connection. This is a well-defined
project of perhaps 15–25 pages; the tools are all in Goldston–Suriajaya and Vaughan.

**Why this would be a 7:** it would be a theorem (conditional on nothing for the main terms,
unconditional Ω-results for the error, GRH-conditional upper bounds) showing that the second moment
of prime values of an arbitrary irreducible polynomial is governed by the zeros of the Dedekind zeta
function of its splitting field. Nothing of that kind exists for polynomials of degree ≥ 2. For the
original motivation it gives the precise sense in which the Riemann hypothesis (for ζ_K) governs the
fluctuations of the primes along a line of a higher-dimensional Ulam spiral.

### 2.3 What to test numerically first (cheap)

* For f = t² + 1: K = ℚ(i), ζ_K = ζ·L(s, χ_{−4}). The predicted error term of the Riesz mean of
  Σ_h S_f(h) should oscillate with the frequencies γ/2 for the zeros ½+iγ of ζ **and of L(s,χ_{−4})**
  (first L-zero at γ ≈ 6.02). Compute the Riesz mean to x = 10^6 with the exact pair series (Legendre
  symbols make this cheap), subtract the main terms, and take a Fourier transform in log x. The
  appearance of γ ≈ 6.02 would be a clean confirmation that L(s,χ_{−4}) is in the second moment of
  primes of the form t² + 1.
* Same for f = t² + t + 41 (K = ℚ(√−163)): zeros of L(s, χ_{−163}).
* thesis/offdiag.ts already isolates the off-diagonal remainder Off(H) for quadratics via Legendre
  symbols; its boundedness in H is the numerical form of "the off-diagonal contributes no logarithm".

## 3. The Goldston–Montgomery direction (harder, less clear)

Goldston–Montgomery: under RH, Var(ψ(x+H) − ψ(x)) ~ H log(X/H) is equivalent to Montgomery's pair
correlation conjecture. The proof uses the explicit formula for ψ, which exists because primes are
the support of a Dirichlet series (ζ'/ζ). Prime *values of a polynomial* have no Dirichlet series, so a
direct analogue with "zeros ↔ variance of prime values of f" is not available. What is available is
the weaker statement in §2: the *conjectured* variance (through Σ_h S_f) has fluctuations governed by
ζ_K. A genuine equivalence would need a spectral interpretation of primes of the form f(t), which does
not exist for degree ≥ 2. Do not promise this.

## 4. The function-field analogue (a possible theorem now)

Keating–Rudnick (2014) proved the variance conjectures for primes in short intervals and arithmetic
progressions over F_q[u] using Katz's equidistribution theorems. For polynomials f ∈ F_q[u][t] (prime
values of f at polynomial arguments t of degree n), the analogue of Conjecture 1 is a statement about
finite sums of local factors, and the variance can be computed exactly in the large-q limit via
equidistribution of Frobenius in a monodromy group. This is the most likely place where the
"−½·C(f)·log H" law can be *proved* (in the q → ∞ regime). A paper doing this would be a solid 6–7.

## 5. Smaller items worth doing

* Closed form for the constant A_f: the smoothed diagonal gives A_f = C·[B_f − ½ − …] with B_f the
  constant in Σ_{d≤x} a(d) = (1/C)log x + B_f; B_f = (E'/E)(0) + (ζ_K residue data). Compute and compare
  with the measured A_f/C ≈ −0.34 from thesis/sumS.ts. (Note the off-diagonal also contributes O(1).)
* Prove Hypothesis (E) for quadratics using Hooley's / Duke–Friedlander–Iwaniec's equidistribution of
  roots of quadratic congruences (the off-diagonal sum is a sum of fractional parts {(H ± m)/d} over
  root differences m of f mod d, weighted by ~1/d).
* Higher moments along a polynomial sequence (Gaussian? the Montgomery–Soundararajan k-point
  singular series R_k for polynomial tuples).

## 6. Honest assessment

Sections 2.2 and 4 are the two routes that could turn this from a 4 into a 6 or 7. Both are real
work (weeks, not days), both are within reach of standard techniques, and both would for the first
time connect the primes on a polynomial line to the zeros of an L-function attached to that line.
The rest of the Ulam-spiral story (Fibonacci dimensions, quasicrystals) has no such route and should
be left where the paper leaves it.

## 7. Update after the deep dive (9 September 2026)

**Proved (paper v4, Section 3.3):**
* E_f(s) = H_f(s) / L(2s+2, Sym²V_f), V_f the permutation representation of Gal(f) on the roots;
  the coefficient of p^{−2−2s} is −χ_{Sym²V}(Frob_p) = −(½ω(ω+1) + n₂(p)). For quadratics:
  D_f(s) = ζ(s+1)L(s+1,χ_D) ζ(3s+3)L(3s+3,χ_D) H̃(s) / [ζ(2s+2)² L(2s+2,χ_D)], H̃ absolutely convergent
  for Re s > −1 (because dim V = 2 kills all higher exterior powers).
* Closed formula for quadratics: S_f(h) = C²Π P_p · Π_{p|h}(p−ω)/(p−2ω) · Π_{p | a²h²−D, p∤h}(p−3)/(p−4).
* Explicit formula for the diagonal Riesz means (m ≥ 2) over the zeros of ζ²L(χ_D), by the proof of
  Goldston–Suriajaya (sketched; details to be written).

**Numerically negative:** the zeros of L(s,χ_{-4}) are not visible in either the full sum (the
off-diagonal fractional-part fluctuations, of size x in the Cesàro mean, bury the x^{1/4} zero terms) or
the diagonal sum to 2·10⁷ (matched filter: predicted frequencies explain 13.5% of the residual variance,
shifted controls 14% on average). Reason: the explicit formula's secondary error O(x^{m−1+ε}) is not yet
dominated by the zero terms |a_m(ρ)| x^{m−3/4} at x ~ 10⁷ (x^{1/4} ≈ 67 only). To detect: compute a_m(ρ)
exactly (needs H̃ on Re s = −3/4 and ζ', L' at the zeros) and subtract, or push to x ≥ 10^10 with a
different algorithm for Σ_{n≤x}(x−n)^m A_f(n) (e.g. Dirichlet hyperbola with a(d) multiplicative).

**Galois group:** means of the slope/C agree across groups (−0.38 to −0.53, all within errors of the
finite-H value); the scatter is 3–5× larger for non-2-transitive groups (C₃, D₄, C₄, V₄), consistent with
the higher-order polar part of Σ_d W(d)ω°(d)d^{−s} (order r_f − 1). The constant −½ looks universal; the
approach to it is not.

**Where the 7 now lies.** Two theorems would do it: (a) analytic continuation of the off-diagonal
Dirichlet series Σ_d d^{−s} W_f(d) Σ_{s≠s'} ζ(s, ⟨(s'−s)/d⟩) to Re s < 0 with a pole-free strip — for
quadratics the root differences are ±√D/a mod d, so this is a Dirichlet series over the values of the
quadratic form a²h² − D and Kloosterman/Salié sums (Hooley, DFI) are the tool; (b) the function-field
version, where everything is a finite computation over F_q and Katz's equidistribution replaces
Hypothesis (E). Either gives the full "variance of prime values of f ↔ zeros of L(Sym²V_f)" statement.

## 8. Status after the second review round (9 September 2026, paper v5)

The reviewer's points and what was done with them:

- **Exact C-versus-C² test.** Theorem 5 makes S_f(h) computable with no Euler-product truncation.
  `thesis/exact.ts` implements it (sieve of h and Q(h)=a²h²−D with the roots ±√D/a mod p; cofactor is 1
  or a prime; C(f) from L(1,χ_{D₀}) via the digamma formula times an absolutely convergent correction).
  Validated against the definition truncated at the same primes: max |ratio−1| ≈ 1e-14, vanishing values
  included. 25 quadratics, 0.39 ≤ C ≤ 6.64, H ≤ 10⁶. Fit slope = −k C^α:
  log-least-squares α = 0.87 ± 0.09, k = 0.41; unweighted α = 1.10 ± 0.11, k = 0.33 ± 0.06.
  Both bracket α = 1; α = 2 is excluded by 8–13 standard errors. corr(slope/C, C) = 0.26,
  corr(slope/C², C) = 0.72. Mean slope/C = −0.41 ± 0.12, i.e. k ≈ 0.82 of the asymptotic ½ at these H;
  per decade −0.34, −0.57, −0.31. The paper now says this plainly (the old "−0.50 ± 0.27" is gone).
- **Theorem 6(ii) surfaced.** For a 2-transitive Galois group the trivial bound for Off* is H log H and
  any unbounded saving gives the leading term −½C log H (new Remark 7 and abstract). Hypothesis (E) is
  only needed for the constant term.
- **Theorem 7 → Proposition 9** (explicit formula for the diagonal), with the sketch labelled as such.
- **Double-counted correlation argument cut** from §3.5; Table 1 kept as a degree survey with the caveat
  that its mean C ≈ 1 cannot separate C from C².
- **Spiral section shrunk** to the definition, the theorem and one paragraph; Table of spiral primes removed.
- **Function field added as §3.6**: Theorem 8 (off-diagonal vanishes identically for all moduli of
  degree ≤ N over F_q[u]) with proof; conjecture −C(f)N + O(1) ⟺ Tail(N) = O(1); exact computation for
  q = 3, 5, 7 (`thesis/ff.ts`): diagonal increments → 1/C(f), tail bounded (swing ≤ 0.88 over N ≥ 2).
  Signed products are essential: for q = 3 a prime of norm 3 with ω = 2 has P_P = −3 and P(1) < 0.

Routes (companion `paper/routes.tex`, 6 pp, compiles):
- Route A (Hooley transcription with weights W_f(d)): Prop A1 exact reduction proved; A2 (small moduli,
  Hooley) and A3 (large moduli, hyperbola) stated as the two estimates to prove. Not done.
- Route B (F_q[u]): Theorem B1 proved; Prop B2 standard (Weil); Prop B3 (q→∞ via Deligne/Katz) is the
  theorem to write out. Numerics consistent.

Verdict unchanged from the reviewer: JNT / Acta Arith. / Mathematika are the right targets, with
Hypothesis (E) and the o(H log H) requirement positioned as the gap.

## 9. Reframing and the function-field identity, done right (9 September 2026, paper v6)

Following the third review (separate the three unproven things; lead with the unconditional part):

- **Title and abstract reframed.** The paper is now "The pair singular series of a polynomial: an exact
  identity, its Dedekind zeta function, and the variance of prime values". The abstract leads with the
  theorems about the explicit function S_f, states the conjecture as a statement about that function, and
  puts the variance consequence last, explicitly "assuming the Hardy–Littlewood pair conjecture".
- **"What is conditional on what"** paragraph in the introduction: (A) Bateman–Horn for nonlinear f (open,
  parity barrier, used nowhere); (B) HL pair conjecture (used only to translate into variance, as in
  Montgomery–Soundararajan); (C) Conjecture 1 / Hypothesis (E): prime-free statements, Hooley/DFI family.
  Section 2 is now purely arithmetic; the variance formula moved to the start of the primes section.
- **Function-field identity corrected and strengthened.** The earlier statement of Theorem 8 (with the
  truncated P_N(d)) was off by an exact constant: over F_q[u] the modulus d = 1 does NOT drop out (h = 0 is
  excluded from the q^N polynomials of degree < N, so ψ_1 = −1), contributing 1 − P(1). The corrected
  theorem mirrors the integer identity exactly:
    Σ_h(S_f/C² − 1) = −Σ_{1≤deg d≤N} a_f(d) − q^N Σ_{deg d>N} a_f(d)/|d| + (1 − P(1)) + Off_f(N).
  New Lemma (finite support): for f = t² − D, Off_f(N) is a finite sum over N < deg d ≤ M(N) = N−1+max(2N−2, deg D)
  minus the explicit series q^N Σ_{deg d>N} W_f(d)(ω²−ω)/|d|, computable from the exact identities
  Σ_d W_f ω²/|d| = 1 and Σ_d W_f ω/|d| = ∏_P(1 + b_P(ω_P − ω_P²)). Verified two independent ways
  (`thesis/ff.ts` from the S_f(h); `thesis/ff-tail.ts` from root pairs via CRT, plus brute force for small
  cases): agreement to ~1e-5 (Euler-product truncation), brute force exact. Off_f(N) is bounded in all cases.
  Diagonal increments → 1/C(f); diagonal tail → 1/(C(f)(q−1)).
- **Debugging record (for honesty):** the first version of ff-tail.ts had (i) wrong index placement in the
  power series for [L(X,χ)/(1−qX)]², (ii) a missing inert factor, (iii) the d=1 term missing, (iv) an inverted
  squarefree test in the brute force. Each was caught by the numerical cross-checks, which is exactly why
  the checkable-by-computation discipline matters here.
- **What the reviewer says about proving (E):** agreed. The nearest theorem is the large-q function-field
  statement (Prop B3 in routes.tex): the Lemma now says precisely which finite family of algebraic counts
  it needs (moduli of degree between N and 3N). Route A over ℤ remains the valuable, hard one.
