# Follow-up paper: roadmap (started 9 September 2026)

Working title: **The pair singular series of a polynomial II: zeros of Dedekind zeta functions in the
second moment of prime values.** Paper I = `paper/main.tex` (v6). Everything here builds on Theorems 2–6
of paper I. Status vocabulary: PROVED / SKETCHED / TO PROVE / CONJECTURAL / NUMERICAL.

## 0. What the follow-up is about, in one paragraph

Paper I showed that the diagonal part of Σ_{h≤H}(S_f(h) − C(f)²) has Dirichlet series
D_f(s) = ζ_K(s+1) E_f(s), K = Q[t]/(f), and that 1/E_f is "essentially" L(2s+2, Sym²V_f). Goldston and
Suriajaya proved, for f(t) = t, that the Riesz means of Σ_h 𝔖(h) have an explicit formula over the zeros
of ζ. The follow-up does the same for every f: the Riesz means of the diagonal have an explicit formula
whose oscillating part is indexed by the zeros of ζ_K and of the Dedekind zeta functions of the
"pair fields" of f (Lemma 1 below), with real secondary terms and a natural boundary that have no
analogue in the linear case; for t²+1 the formula is fully explicit and is tested against exact data
(WP0). Then: Ω-results, GRH-conditional bounds, the off-diagonal, the function-field version, and the
(conditional) consequences for the variance of prime values.

## 1. New structural facts found on 9 September (to be written up as Lemmas; all elementary)

**Lemma 1 (pair fields).** Sym²V_f is the permutation representation on multisets {α,β} of roots, i.e.
Sym²V_f = V_f ⊕ V_f^{(2)} with V_f^{(2)} the permutation representation on unordered pairs of distinct
roots. Hence
    L(s, Sym²V_f) = ζ_K(s) · Π_O ζ_{K_O}(s),
one Dedekind zeta function per Gal(f)-orbit O on unordered pairs, K_O the fixed field of a pair
stabiliser (for 2-transitive groups a single field K^{(2)} = Q(α+β, αβ) of degree n(n−1)/2). Check:
quadratic: Sym²V = 1 ⊕ 1 ⊕ χ_D, L = ζ²L(χ_D) = ζ_K·ζ ✓; S₃-cubic: K^{(2)} ≅ K, L = ζ_K² ✓; f = t: ζ ✓.
So *all* zeros that enter are zeros of Dedekind zeta functions of explicit number fields. PROVED (trivial).

**Lemma 2 (infinite product structure of E_f).** Writing u = 1/p, v = p^{−(s+1)}, the local factor of
D_f/ζ_K(s+1) at an unramified p is R_p(u, v) with R_p(0, v) = (1 + ω_f(p) v) · det(1 − Frob_p v | V_f)
= (1 + ω(g) v) Π_i (1 − v^{λ_i(g)}), g = Frob_p of cycle type λ. Its logarithm is Σ_k c_k(g) v^k with
c_k class functions of Gal(f); Möbius inversion over k gives virtual characters Ψ_k with
    E_f(s) = Π_{k≥2} L(k(s+1), Ψ_k)^{±1} · M_f(s),
M_f absolutely convergent in Re s > −1 (mixed terms u^a v^b, a ≥ 1). For f = t²+1 the exponents
(a_k, b_k) of ζ(kw)^{a_k}L(kw,χ₋₄)^{b_k}, w = s+1, are
    k: 2:(−2,−1)  3:(1,1)  4:(−1,−2)  5:(3,3)  6:(−6,−5)  7:(9,9)  8:(−14,−16)   (script, exact rationals).
Consequences (all for t²+1, analogues for every f):
  (a) the Euler product H̃_f of paper I, Theorem 4, converges absolutely only for Re s > −3/4, not > −1
      (the coefficient of v⁴ is −3 at split primes). **Erratum for paper I**, see ERRATA.md.
  (b) ζ(3s+3) in the numerator gives a REAL POLE at s = −2/3: the Riesz means contain a term
      x^{m−2/3}, larger than the zero terms x^{m−3/4}. Missing from Proposition 7 of paper I; it also
      explains part of the null result of paper I, Section 4.2 (the fitted smooth basis did not contain it).
  (c) real poles at s = −1 + 1/k for every odd k with a_k > 0 (orders 1, 3, 9, 28, …), and zero
      families at s = ρ/k − 1 for every k with a_k < 0 or b_k < 0 (k = 2, 4, 6, 8, …; sizes x^{m−3/4},
      x^{m−7/8}, x^{m−11/12}, … under GRH).
  (d) D_f has zeros where F_p(s) = 0, i.e. p^{−s} = −P_p/(p b(p) ω(p)); their real parts tend to −1 and
      their imaginary parts (2j+1)π/log p are dense: **Re s = −1 is a natural boundary** of D_f. So the
      error term O(x^{m−1+ε}) of the explicit formula cannot be improved by contour shifting, for any f
      (including f = t, i.e. Goldston–Suriajaya's series). PROVED modulo writing.
Reference points for (d): Estermann 1928, Dahlquist 1952, Kurokawa; Bhowmik–Essouabri–Lichtin 2007
for multivariable Euler products (add to refs after checking).

## 1b. Decisions taken with the author (9 September 2026, evening)
1. **Scope of the main theorem:** quadratics proved in full (Dirichlet L-functions only); general f stated
   as a theorem under explicit hypotheses (zero-density for the Dedekind zeta functions of the pair fields;
   the Ψ_k with negative constituents are differences of permutation characters), with an S₃ cubic worked
   as the example. → WP1 as written.
2. **Off-diagonal / Route A:** NOT in paper II. Paper II contains only the analytic reformulation (the
   off-diagonal Dirichlet series and what Conjecture 1 means for its continuation) and the numerics of
   Off_f(H) for t²+1. The Hooley-type proof is paper III. → WP4 reduced to its "cheap first step".
3. **Numerics:** four polynomials: t²+1 (done), t²+t+41, one real quadratic (t²−2), one S₃ cubic (t³−2).
   → WP2 as written, in that order. Before WP2: independent check of a few a_m(ρ) by direct derivative
   formulas (referee-proofing the Cauchy-integral residues).
4. **Paper I:** submit now as v7 (errata applied, readability pass); paper II cites it as "submitted".
   Venues: JNT / Acta Arith. / Mathematika.

Order of work: a_m(ρ) cross-check → WP1 (quadratic theorem, full proof) → WP5 (exact function-field
formula) → WP2 → WP3 → primes section (WP6, honest framing) → two review rounds → submit.

## 1c. Theorems written with proofs on 9 Sep (evening), followup/main.tex §§2–4
- Lemma (pair fields); Definition/Lemma (plethystic exponents Ψ_N(g) = (1/N)Σ_{j|N} μ(j)(−1)^{N/j+1}χ_V(g^j)^{N/j},
  virtual characters, bound 2n^N/N); Theorem (structure: D_f = Π_{N≤K}L(Nw,Ψ_N)·M_{f,K}, M_{f,K} absolutely
  convergent for Re s > −1 + 1/(K+1)); Proposition (quadratic exponents: a_N+b_N = −M_N(−2), a_N−b_N = even-divisor
  sum; a_N = b_N = ½M_N(2) for odd N); Theorem (natural boundary, all f incl. f = t); Theorem (explicit
  formula for quadratics under RH, m ≥ 2, with a full proof: growth lemma (G1)/(G2), horizontal-segment
  Lemma via Markov averaging over the zone |σ−½| ≤ 2ε₀, U ∈ [x^16, 2x^16]); Theorem (Ω_±(x^{m−3/4})
  unconditional for every quadratic with one uncancelled pole, no positivity needed; Landau).
- Verified: closed-form exponents against the level-by-level solution up to N = 16; general Ψ_N formula
  reproduces (a_N, b_N) for S₂.
- To check by a second reader: the constants in the horizontal-segment lemma; the claim (G1) for L(s,χ_D)
  under GRH (standard); the A = 16 bookkeeping; the definition of c_{f,m}.

## 2. Work packages

### WP0 — Exact explicit formula for the diagonal of t²+1, tested against data  [NUMERICAL, first result 9 Sep]

**Result (final run 9 Sep 2026: K = 15, primes ≤ 4·10⁶, zeros with γ ≤ 100, X = 4·10⁷; `data/explicit-diag.json`,
`data/explicit-diag.log`).** After subtracting the EXACT terms at s = 1, s = 0 and the real poles
s = −2/3, −4/5, −6/7 (no fitting: the only free parameter is a correction to the x^{m+1} coefficient, which
comes out at data/exact − 1 = −1.0·10⁻¹², itself a check of D_f(1) to 12 digits), the residual of
R₂(x)/x^{5/4} has rms 0.528 and the predicted k = 2 zero sum has rms 0.272 (ζ family alone 0.40, L family
0.33; the two are anticorrelated over this u-range). Regression of the residual on the prediction:
    m = 2:  β = 1.008 (raw), 0.991 with a smooth nuisance basis x^{m−8/9}(log x)^j; R² = 0.55; rms left 0.29
            per family: β_ζ = 1.006, β_L = 1.020
    m = 3:  β = 0.779 (raw; the zero terms, rms 0.11, sit under a smooth leftover of rms 0.6), 0.998 with nuisance
Controls (all ordinates shifted by δ ∈ [−0.6, 0.6]): β between −0.94 and +0.68, R² negative throughout; the
shift mostly changes the phase (δ·u₀ ≈ 2.6 rad at δ = 0.2), so the test is of predicted amplitude AND phase.
Conclusion: the zeros of L(s,χ₋₄) and of ζ are present in the second moment of the pair singular series of
t²+1 with the predicted amplitudes and phases to within 1–2 %. The unexplained rms 0.29 is the truncation
at γ ≤ 100 (coefficients decay only like γ^{−5/4} for m = 2) plus the O(x^{m−3/4−ε}) remainder.
The real terms are indeed larger than the zero terms: rms(x^{m−2/3} term) = 1.0, k = 5: 0.22, k = 7: 0.14.
Figure: `main.tex` Fig. 1 (data/explicit-diag-2.dat). Next: extend to γ ≤ 300 with the cached residues
(`--analyse-only` reuses `data/explicit-diag-terms-*.pkl`), and a phase-randomised control.

**Lesson about the secondary families.** The k = 4 family (poles at ρ/4 − 1, Re s = −7/8) has individually
huge coefficients (rms 13 and 92 in units of x^{m−3/4}) and the data reject it alone (β = 0.001): |D_f|
grows towards the natural boundary Re s = −1, so moving the contour past −3/4 creates large terms that
cancel against the line integral. The correct theorem is the contour at Re s = −3/4 − ε: main terms + real
poles with 1/k > 3/4 − ε... i.e. only k = 3 (x^{m−2/3}), plus the k = 2 zero family, plus
O(x^{m−3/4−ε}) — and the numerics show the O-term is small in practice. The sentence in ERRATA.md item 2
("O(x^{m−7/8+ε}) under GRH") must be weakened accordingly: the k = 4 family is not a usable correction.
This is worth a remark in the paper: explicit formulas near a natural boundary are asymptotic, not convergent,
in the contour position.
- `scripts/riesz-raw.ts`: raw Riesz means R_m(x), m = 1,2,3, on a log grid to X = 4·10⁷ (done, 2 s).
- `scripts/explicit-diag.py`: exponents (a_k, b_k); D_f(1), C(f), A0 to 1e−12 via prime zeta functions;
  all residues (s = 1, 0, real poles, zero families k = 2,4,6,8) by Cauchy integrals; comparison with
  the data: regression coefficient β of the residual on the predicted zero sum (β = 1 if the formula is
  right), controls with shifted ordinates, per-family β.
- Deliverable: Table of a_m(ρ) for the first zeros of ζ and L(χ₋₄); Figure residual vs prediction in
  u = log x; the number "β = … ± …" and the fraction of residual power explained.
- Decision point: if β ≈ 1 with controls ≈ 0 → Section 3.2 of the paper and the first genuine
  "zeros of L(s,χ₋₄) in the second moment of t²+1" statement. If not → find the missing term (the
  secondary O(x^{m−1+ε}) line integral, or a bug), since the identity is exact.

### WP1 — Theorem: explicit formula for the diagonal, general f  [TO PROVE, structure known]
- State: for m ≥ 2, Σ_{n≤x}(x−n)^m A_f(n) = D_f(1)x^{m+1}/(m+1) + x^m(−log x/(2C) + c_f)
  + Σ_{k odd} x^{m−1+1/k} Q_{f,k}(log x) + x^{m−1} Σ_{k≥2} Σ_{ρ_k} x^{ρ/k} Q_{f,k,ρ}(log x) + O(x^{m−1+ε}),
  ρ_k over zeros of the Dedekind zeta functions of Lemma 1 (k = 2) and of the L(·,Ψ_k) (k ≥ 3).
- Proof = Goldston–Suriajaya's contour argument with: Lemma 2 (continuation to Re s > −1 − nothing
  more), zero-density estimates for Dedekind zeta functions (or for Hecke L-functions via Brauer) to
  choose the height U, convexity bounds for growth. For quadratics everything is ζ and L(χ_D): write this
  case in full first; general f as a second theorem with the extra hypothesis that the Ψ_k are
  differences of permutation characters (always true? check: c_k(g) are integer class functions; the
  virtual characters they define are combinations of Dedekind zetas iff they are Z-combinations of
  permutation characters, which is the case for S_n but not for all G — Artin's conjecture is not
  needed for zeros, only for poles in the numerator: state precisely).
- Also: Ω_±(x^{m−3/4}) via Landau (A_f(n) ≥ 0 when P_p ≥ 0 for all p, e.g. t²+1) from the first zero of
  L(χ_D); GRH ⇒ O(x^{m−3/4+ε}) — but note the real term x^{m−2/3} is *larger*: the correct GRH statement
  is "error after the real terms".
- Hardest technical point: the growth of M_f(s) on Re s = −1 + δ (bounded, since absolutely convergent ✓)
  and of the finitely many L(kw,Ψ_k) with Re(kw) < 1 (convexity ✓).

### WP2 — More polynomials  [NUMERICAL]
- t²+t+41 (D = −163): zeros of L(χ₋₁₆₃) at 0.2029 (period 62 in log x: fit as a known component),
  2.3685, 4.0551, …; the class-number-one repulsion makes the first zero anomalous — a nice test.
- t²+2, t²−2 (D > 0, real quadratic), 2t²+1; an S₃ cubic (t³−2: K^{(2)} = K, so L = ζ_K², zeros of
  the Dedekind zeta of Q(2^{1/3}) — LMFDB has them) and an A₄/S₄ quartic.
- Generalise `explicit-diag.py`: ω_f(p) from the factorisation of f mod p (lib/poly.ts has it; port or
  compute in Python with sympy-free code), Dedekind zeta values via mpmath products of Hecke L's
  (quadratics) or LMFDB zero lists + Euler products (cubics).

### WP3 — Coefficients and the constant A_f  [TO PROVE / NUMERICAL]
- Closed form of the x^m coefficient c_f (= the diagonal part of A_f): c_f = −(1/C)[½(H_m − ... )
  + ½log 2π + ½(γ + L′/L(1,χ_D) + E_f′/E_f(0))]; compare with the measured A_f of paper I (Table 1)
  after adding the off-diagonal O(1). The script already computes the numbers for t²+1.

### WP4 — The off-diagonal  [TO PROVE, hard; Route A of routes.tex]
- The full sum Σ_h S_f(h) h^{−s} is a single Euler product: Σ_h S_f(h)h^{−s} = ζ(s)·C²·Σ_q b(q)Σ_h c_q^f(h)h^{−s}
  — write the off-diagonal Dirichlet series as Σ_d d^{−s} W_f(d) Σ_{s≠s′} ζ(s, ⟨(s′−s)/d⟩) (Hurwitz);
  its continuation to Re s < 0 with no poles in a strip is exactly Hypothesis (E) in analytic form.
  For quadratics the root differences are ±2√D mod d, so this is a Dirichlet series over the values of
  a²h² − D and Kloosterman/Salié sums (Hooley 1963; DFI 1995/2012; Kowalski–Soundararajan 2021 for the
  all-moduli input). Target theorem: for quadratic f the Cesàro form of Conjecture 1 holds
  (Props A2 + A3). This is the valuable one. Weeks of work; get an expert to check.
- Cheap first step: numerically isolate Off_f(H) for t²+1 to 10⁷ (thesis/offdiag.ts to 10⁵ exists) and
  look at its spectrum in log H: if the off-diagonal is "just" bounded + noise, its Riesz means are
  O(x^{m−1})-ish and the diagonal formula is the whole story at order x^{m−3/4}.

### WP5 — Function field  [TO PROVE; Route B of routes.tex; CORRECTED 9 Sep evening]
- Earlier note claimed the diagonal generating function over F_q[u] is rational in T = q^{−s} and the
  explicit formula an exact finite sum. WRONG for the same reason as over Z: E_f is an infinite product of
  L-functions in T (each rational), with a natural boundary at |T| = 1 (Re w = 0). Correct statement: for
  each K, D_f = ζ_A(w)Π_{N≤K}L(Nw,Ψ_N)·M_{f,K}(T) with M_{f,K} analytic in |T| < q^{−1/(K+1)}; the sum over
  h of degree < N is a coefficient extraction (circle contour in T), so the explicit formula is
  UNCONDITIONAL there (Weil: zeros of L(T,χ_D) on |T| = q^{−1/2}) with error q^{N(1−1/(K+1)+ε)}-type after
  the k = 2 family. Nicer than over Z: no vertical-line growth problem. Write this down for t² − D.
- Prop. B2 of routes.tex has the same error as paper I's Theorem 4 ("H̃_f absolutely convergent for
  |T| < q"): fix when routes.tex is next touched.
- Then Prop. B3 (q → ∞) for the off-diagonal (Katz/Deligne).

### WP6 — Primes  [CONDITIONAL / NUMERICAL]
- Under the HL pair conjecture for f with error O(T^{1/2+ε}) — the Montgomery–Soundararajan hypothesis —
  the variance of the number of prime values f(t), t < T, is E + 2Σ_h(S_f(h) − C²)W_T(h): the diagonal
  explicit formula gives the oscillatory lower-order term. Be explicit that the zero terms (relative
  size T^{−1/4}) are BELOW the tolerance of the transfer: no unconditional or even heuristic statement
  "primes f(t) feel the zeros of ζ_K" follows. What does follow: the polynomial Montgomery–Soundararajan
  law with its constant; and a Goldston–Montgomery-type remark (Bui–Keating–Smith template for ζ_K),
  clearly labelled as not available for prime values of non-linear f.
- Numerical: actual prime pairs (f(t), f(t+h)) for t²+1 to t ≤ 10⁷ vs S_f(h)·W_T(h): confirms the pair
  conjecture at the level of the main term only. Optional.

### WP7 — Writing and review
- `followup/main.tex` skeleton exists; fill Sections 2–3 first (they are the theorem-grade content),
  then 4–6. Keep the "what is conditional on what" paragraph and the "safe sentence" of LITERATURE.md §0
  in the introduction verbatim in spirit.
- Two review rounds as for paper I. Ask the specialist: (i) zero-density input for Dedekind zetas in WP1,
  (ii) whether the natural-boundary lemma is known for the Goldston–Suriajaya series, (iii) Route A.
- Venues: Acta Arith. / JNT / Mathematika (paper I's reviewers' suggestion); if WP4 is done, Math. Ann.
  level. Submit paper I first with the erratum applied.

## 3. Milestones
- M1 (done 9 Sep): raw data, exponents, structural lemmas, literature.
- M2 (done 9 Sep): WP0 result β = 1.008 / 0.991 (m = 2), per family 1.006 / 1.020.
- M3: WP1 theorem for quadratics written with full proof; WP5 exact rational formula written. (~1–2 weeks)
- M4: WP2 numerics for 3–4 polynomials; WP3 constants. (~1 week)
- M5: draft v1 of the follow-up (Sections 1–3, 5, 7); external review.
- M6: WP4 attempt (open-ended); decide whether it goes in this paper or a third one.

## 3b. Note on paper I's exact test (9 Sep, late)
The ∏P_p truncation in thesis/exact.ts needed a tail correction (drift δC²H); done, α now 0.92 ± 0.08.
Lesson for paper II's numerics: every truncated Euler product that multiplies a quantity growing like H (or
x^{m+1}) must be completed analytically — explicit-diag.py already does this (A0 via prime zeta functions,
mixed-term tails via E₁).

## 4. Risks and honesty checks
- The user's framing "primes correlate with zeta zeros" must not appear. What is provable is
  "the second-order fluctuations of the (conjectural) pair-correlation weights S_f are governed by zeros
  of Dedekind zeta functions attached to f". LITERATURE.md §0 has the safe sentence.
- The real poles (x^{m−2/3}, …) and the natural boundary are new relative to Goldston–Suriajaya, but
  they might be known folklore for Euler products of this type (Dahlquist, Kurokawa). Check before
  claiming novelty; the *appearance in a singular-series average* is new in any case.
- The numerics cannot separate ordinates closer than ≈ 4π/(log-range) ≈ 1.5; the test is a
  matched-filter test, not a resolution test. Say so.
- Paper I needs the erratum (ERRATA.md) before submission.
