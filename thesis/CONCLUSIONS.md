# Conclusions from the thesis test suite

Reading of `REPORT.md` (quick mode, ≈ 2 M numbers per dimension, deterministic seed). Every number
quoted below is in that file; rerun `npm run thesis` to regenerate it. Where the `--full` run
(`REPORT-full.md`) differs materially it is said so.

## The thesis, stated as testable claims

1. **Polynomial patterns.** Increasing the dimension of the Ulam spiral turns the pseudo-patterns into
   polynomial patterns.
2. **Explanatory content.** Those patterns contain information about primes beyond what is already
   predicted by classical heuristics (and could therefore say something about the Riemann Hypothesis).
3. **Fibonacci dimensions.** d = 2, 3, 5, 8 are special.
4. **Quasicrystal.** The patterns may be Penrose-like (quasiperiodic order).

## What the tests establish

### Claim 1 is true, and it is a theorem, not an observation (T1)

For 5,070 random rays in dimensions 2 to 7, every ray became a polynomial of degree exactly d with
leading coefficient 2ᵈ, verified against the spiral map 130 points beyond the detected threshold, with
zero exceptions. The proof is in the theory tab of the app; the suite confirms the implementation.

Two facts about these polynomials matter for everything below and were not obvious at the outset:

- A ray is *not* one polynomial. It runs through a lower-degree transient while it stays inside one
  shell, and it can switch between several degree-d regimes when the coordinate that dominates the
  Chebyshev norm changes sign. Only the *eventual* regime, reached after t ≥ 2·max|bᵢ| + 2, is the
  polynomial that governs the far part of the line. The first version of the detector accepted earlier
  regimes and this alone produced a spurious "unexplained pattern" (Φ_BH ≈ 12 in 2D). Anyone repeating
  this kind of experiment must control for it.
- The eventual polynomials have rational coefficients with denominators dividing d!, and about 21–30 %
  of all rays have a fixed prime divisor (T4). Those rays contain at most one prime and are the visibly
  empty lines. Not a single ray with a fixed divisor contained more than one prime (T3, 1,914 such rays).

### Claim 2 is false at the level of the main term: the pattern is exactly the Bateman–Horn constants (T2, T3, T6)

This is the central result.

- **Beyond the box (T2).** Following 430 random polynomial rays past the sieve with Miller–Rabin, the
  total number of primes agreed with the Bateman–Horn prediction C(f)·Σ 1/ln f(t) to within one standard
  error in every dimension: observed/predicted = 1.010 ± 0.006 (d = 2), 0.991 ± 0.016 (3), 1.025 ± 0.028
  (4), 0.975 ± 0.049 (5), 0.943 ± 0.081 (6). The naive model with C = 1 is off by 13–56 %.
- **Inside the box (T3).** The dispersion of prime counts across rays under the naive model is large
  (Φ_naive = 28.0 in 2D) and is *predicted quantitatively* by the spread of the constants alone:
  Φ predicted from C(f) = 27.8. After each ray is weighted by its own C(f) the dispersion collapses to
  Φ_BH = 0.48 ± 0.04 (2D), 0.74–0.78 (3D–5D). Nothing is left over. The size-normalised structure
  (Φ−1)/Ē tracks Var(C) (1.05 vs 0.81 in 2D, 0.99 vs 0.75 in 3D, 0.74 vs 0.86 in 4D) within the
  scatter expected from 1,500 rays.
- **Scale (T6).** Quartering the box changes none of this: Φ_BH stays at 0.47–0.77 and obs/E_BH at
  0.97–1.01 in every row.

So the "pseudo-patterns" are, to the precision of these experiments, a picture of the function
line ↦ C(f_line), and C(f) is computed from the roots of f modulo small primes only. This holds in every
dimension tested. The pattern therefore carries no information about primes that is not already in the
congruence structure of the polynomials, and in particular none about the zeros of ζ, which live in the
error term of a different counting function.

### Claim 3 is not supported (T4, T5)

With the number of integers per dimension held fixed, the congruence-only descriptors of the pattern vary
smoothly and slowly with d, and the Fibonacci dimensions sit on the same curve as the controls:

| d | 2★ | 3★ | 4 | 5★ | 6 | 7 | 8★ | 9 | 10 |
|---|---|---|---|---|---|---|---|---|---|
| fixed-divisor fraction | 0.22 | 0.21 | 0.21 | 0.22 | 0.26 | 0.28 | 0.30 | 0.30 | 0.27 |
| mean C | 1.35 | 1.24 | 1.22 | 1.35 | 1.36 | 1.46 | 1.41 | 1.58 | 1.50 |
| CV of C | 0.67 | 0.63 | 0.63 | 0.62 | 0.63 | 0.58 | 0.64 | 0.59 | 0.65 |

The excess of each Fibonacci dimension over the mean of its neighbours (T5) is of both signs and of the
size of the sampling scatter between adjacent control dimensions (300 rays per dimension; the
coefficient of variation is constant at 0.6 ± 0.04 across all nine dimensions). The measured structure
where the box is large enough (d = 3: 0.99 vs 0.90 for the neighbours) is a 10 % difference on a
quantity whose own uncertainty is about 10 %. There is no mechanism in the construction that could make
d = 5 differ from d = 4 or 6 other than through the degree of the polynomials, and the data show none.
The slow upward drift of the fixed-divisor fraction and of mean C with d is real and expected: higher
degree gives more roots modulo small primes.

### Claim 4 is false (T7)

All twelve strongest peaks of the diffraction pattern, in 2D at two window sizes and in two 3D slices,
sit on rational frequencies with denominators 2, 3 and 6 (max error 0.3–0.7 bins), carry 7–12 % of the
off-origin power, and the rest of the spectrum is diffuse. That is the signature of a residue-class
structure modulo 2 and 3 superposed on disorder, i.e. the spiral analogue of "primes are odd and not
divisible by 3". A Penrose-type quasicrystal would show sharp peaks at golden-ratio-related irrational
positions with five- or ten-fold symmetry; there are none.

### The texture between neighbouring cells is congruences modulo 30 (T9)

Whether two adjacent lattice cells can both be prime depends on the dimension in a striking way (raw
ratios of 0 along the first two axes, ≈ 2 along the third axis in 3D), but once the model knows the
residues of the cells modulo 2, 3 and 5 the observed/expected ratio is 0.94–1.11 for every axis in every
dimension from 2 to 8. The way the spiral's arithmetic texture "changes between dimensions" is
completely described by which neighbours share residues modulo 30; this follows from the layer
structure of the construction (consecutive layers differ by an even ring size, so cells adjacent along a
new axis share parity, while cells adjacent along the spiral direction never do).

### The RH-equivalent statistics behave as they must up to 16 million (T8)

|π(x) − li(x)| reaches 0.93 of Schoenfeld's bound (at x = 2,660, the start of the bound's range),
|ψ(x) − x| reaches 0.71 of its bound, |M(x)|/√x reaches 0.57, and the fluctuation exponent of ψ(x) − x
fitted over dyadic blocks is 0.47, consistent with the √x law RH predicts. None of this is evidence for
or against RH beyond what was known; every finite computation of this type comes out this way.

## The one genuinely interesting number: primes on polynomial rays fluctuate *less* than coin flips

In T2 and T3 the dispersion after Bateman–Horn correction is not 1 but 0.43–0.66 (beyond the box) and
0.48–0.78 (inside the box), each many standard errors below 1, while the control that pushes random
integers of the same size through the identical code gives 0.89–1.12. So the count of primes along a
polynomial ray has a variance well below the Bernoulli/Poisson value. The obvious mechanism is that the
sieving by small primes along a polynomial sequence is *periodic*, hence deterministic: f(t) and f(t+p)
are congruent modulo p, so the number of values escaping the small primes has almost no variance, and
only the large-prime part is random. This is the analogue, for polynomial sequences, of the known
variance deficit for primes in short intervals and arithmetic progressions (Montgomery–Soundararajan),
whose precise form does depend on the zeros of L-functions via pair-correlation statements.

This is the only place in the whole exercise where the spiral leads to a quantity that (a) is not the
main term, (b) is measurable with this tool to a few percent, and (c) is connected in the literature,
for the linear case, to the distribution of zeta zeros. A concrete follow-up project with a chance of
saying something new would be: measure Var(primes on f(t), t ≤ T) / Σ p(1−p) as a function of T, of the
degree d, and of the size of f, for many polynomials, and compare it with the prediction one obtains by
extending the Montgomery–Soundararajan heuristic to polynomial sequences. The spiral is then just a
convenient generator of polynomial families; the geometry plays no further role.

## Verdict

- The dimensional generalisation of the Ulam spiral is well-defined and every line on it is a
  degree-d polynomial. **True, proved, and verified.**
- The visible patterns are the Bateman–Horn constants of those polynomials, in every dimension, to the
  precision of the data (about 1 % on totals, 5 % on dispersions). **No unexplained structure.**
- Fibonacci dimensions are not special. **Not supported.**
- The patterns are not quasicrystalline. **Refuted.**
- Nothing here bears on the Riemann Hypothesis, because the patterns are main-term phenomena and RH is
  an error-term statement. The one measurable error-term phenomenon the tool surfaces, the sub-Poisson
  variance along polynomial rays, is worth a careful study in its own right, but it is a study about
  polynomials, not about spirals.

## Limits of these conclusions

- Quick mode uses ≈ 2 M integers per dimension; d ≥ 6 boxes have only 5–9 points per line, so the
  in-box tests (T3) are meaningful only for d ≤ 5. T2 and T4 do not need a box and reach d = 6 and 10.
- Bateman–Horn constants are truncated Euler products (p ≤ 1000–2000); the truncation error is a few
  percent for quadratics and grows with the degree. This limits how far below 1 % the agreement in T2
  can be pushed without a better tail estimate.
- The sub-Poisson variance is measured, not derived; the explanation offered is a heuristic. The
  numbers (0.43–0.78) vary with T, degree and size in a way the suite does not yet resolve.
- All statements are about the specific d ≥ 3 construction chosen here (shell sweep along the new axis,
  then caps). Other generalisations give other polynomials but, by the same argument, the same kind of
  polynomials; nothing suggests the conclusions would change.

## Confirmation by the full run (≈ 8 M numbers per dimension, `REPORT-full.md`)

Every conclusion above survives the four-fold larger boxes, and the agreement tightens:

- **Bateman–Horn beyond the box (T2):** observed/predicted = 1.001 ± 0.004 (d = 2, 72,531 primes on 300
  rays), 1.000 ± 0.009 (3), 0.968 ± 0.018 (4), 1.018 ± 0.031 (5), 1.004 ± 0.045 (6). Random control
  0.85–1.31, consistent with 1.
- **Pattern collapse inside the box (T3):** in 2D the naive dispersion is 50.1 and the value predicted
  from the constants alone is 49.8; after weighting by C(f) it is 0.55 ± 0.03. In 3D: 3.43 observed,
  3.82 predicted, 0.71 after weighting. Totals agree with the C-weighted expectation to 0.2–3 % in
  every dimension (obs/E_BH = 1.002, 0.993, 0.977, 0.971, 1.016). Still no ray with a fixed divisor
  containing more than one prime (4,195 such rays).
- **Scale (T6):** Φ_BH is 0.47/0.51 (2D), 0.76/0.72 (3D), 0.80/0.78 (4D) at 2 M and 8 M numbers.
- **Fibonacci (T5):** Var C at d = 3, 5, 8 is 0.67, 0.69, 0.88 against 0.72, 0.67, 0.90 for the
  neighbours; the fixed-divisor fractions are 0.25, 0.26, 0.27 against 0.23, 0.22, 0.33. No excess. (The
  in-box structure statistic at d = 5 drops to 0.35 versus 0.75 for the neighbours, but with Ē = 0.36
  primes per ray it is dominated by the Bernoulli small-count effect and the Var C column, which does not
  suffer from it, shows nothing.)
- **RH bounds to 48 M (T8):** same maxima; the fluctuation exponent of ψ(x) − x becomes 0.498.
- **Sub-Poisson variance:** Φ_BH after correction is 0.45 (2D, T = 3000), 0.58 (3D, T = 1000), 0.67
  (4D, T = 400), 0.90 (5D, T = 200), 0.97 (6D, T = 120) beyond the box. The deficit shrinks as the
  ray gets short relative to the size of its values, exactly the direction the periodic-sieve
  explanation predicts (deficit ≈ log T / log f), which strengthens the case that this is the
  polynomial analogue of the short-interval variance deficit and is the one quantity worth a dedicated
  study.

## Follow-up: the dedicated variance experiment and the paper

`thesis/variance.ts` measures the variance deficit systematically (three polynomial families, degrees
1–6, lengths 25–3200, random-integer control, bootstrap errors) and compares it with the prediction
from the Hardy–Littlewood pair singular series of each polynomial. Outcome (see `paper/main.pdf`):
the deficit is real (χ² = 7034 on 60 cells against no deficit, control at 1.0); for arithmetic
progressions the Montgomery–Soundararajan constant κ = −1/2 is recovered (−0.49); for polynomials of
degree ≥ 2 the pair-correlation prediction fits every cell (χ² = 75 on 60) while the universal law
1 − log T/log X fails (χ² = 574), and the per-polynomial constant κ_f is not universal at the accessible
lengths. One correction to the reading above: the apparent breakdown of the pair prediction for
quadratics at large T in early runs was a truncation artefact of the Euler products (p ≤ 5000); at
p ≤ 20000 the prediction is stable and correct.

## Final form of the result (paper v2)

`thesis/sumS.ts` computes Σ_f(H) = Σ_{h≤H}(S_f(h) − C²) to H = 10⁵ (Euler products to p ≤ 60000) for
110 polynomials. The slope per unit ln H, divided by C(f), is −0.53 ± 0.05 for progressions and
−0.50 ± 0.27 for 102 non-linear polynomials, uncorrelated with C; divided by C² it scatters twice as
much and correlates with C. Together with the heuristic (diagonal weight ω(p)/(p−ω(p)), Dirichlet
residue 1/C) this gives the paper's conjecture Σ_f(H) = −½ C(f) log H + A_f + o(1). Consequence: the
Montgomery–Soundararajan variance law is universal for polynomial prime values asymptotically; the
polynomial-dependent, slowly decaying lower-order term explains the excess deficit seen at T ≤ 3200.
The earlier "κ_f is not universal" reading in this file referred to the C²-normalised finite-H constant
and is superseded by this. Paper: paper/main.pdf.

## Proof status (paper v3)

Proved (paper, Section 3): the exact identity Σ_{h≤H}(S_f − C²) = C² Σ_d W_f(d) Ψ_d(H); the Dirichlet
series of the diagonal is ζ_K(s+1)E_f(s), K = ℚ[t]/(f), with residue 1/C(f) at s = 0; the Cesàro form
of the conjecture, −½ C log H + O(1), unconditionally for every linear f (elementary proof) and, for
general f, if and only if the off-diagonal remainder (differences of distinct roots of f modulo d)
contributes o(H log H) (Hypothesis E). Verified: for 25 quadratics the off-diagonal remainder,
computed exactly via Legendre symbols to d ≤ 4·10⁶, stays bounded (mean 0.90 at H = 10⁵, change 0.08
in units of ½logH/C over two decades) while both sides of the identity grow as predicted.
Not proved: Hypothesis (E) for any non-linear f. See paper/NOTES-towards-7.md for the programme
(Dedekind zeta zeros in the second moment of prime values of f).

## Deep dive (paper v4, 9 September 2026)

New theorems: E_f(s) = H_f(s)/L(2s+2, Sym²V_f) (symmetric square of the permutation representation of
Gal(f)); for quadratics D_f = ζ(s+1)L(s+1,χ_D)ζ(3s+3)L(3s+3,χ_D)H̃/[ζ(2s+2)²L(2s+2,χ_D)] with H̃ convergent
in Re s > −1; closed twin-prime-type formula for S_f(h), f quadratic; explicit formula (sketched, after
Goldston–Suriajaya) for the diagonal Riesz means over the zeros of ζ²L(χ_D). Numerical search for the
zeros of L(s,χ₋₄) in the second moment of t²+1: negative to 4·10⁷ (full sum: off-diagonal dominates;
diagonal: secondary error terms still dominate). Galois-group test: constant −½ independent of the
group, scatter larger for non-2-transitive groups. See paper/NOTES-towards-7.md §7.

## Second review round (paper v5, 9 September 2026)

An independent review of v4 verified Theorem 5 (quadratic closed form) to machine precision and
reproduced Table 3; it asked for the C-versus-C² test to be run exactly with a wide lever arm in C.
Done in `thesis/exact.ts`: 25 quadratics with 0.39 ≤ C ≤ 6.64, H ≤ 10⁶, no Euler truncation.
The exponent in slope ∝ −C^α is α = 0.87 ± 0.09 (log fit) / 1.10 ± 0.11 (unweighted); the C² law is
excluded by at least 8 standard errors. The finite-H coefficient is ≈ 0.82 of the asymptotic ½.
The paper now also states (Remark 7) that for 2-transitive Galois groups only o(H log H) for the
off-diagonal is needed for the leading term, demotes the explicit formula to a proposition, drops the
double-counted correlation argument and the spiral table, and adds the function-field theorem
(off-diagonal vanishes identically for moduli of degree ≤ N) with exact checks for q = 3, 5, 7
(`thesis/ff.ts`). Companion note `paper/routes.tex` scaffolds the two routes to a proof.

## Third review round (paper v6, 9 September 2026)

Reframed around the unconditional theorems (title, abstract, introduction with a "what is conditional
on what" paragraph; variance moved to the primes section as a consequence conditional on the
Hardy–Littlewood pair conjecture). The function-field theorem was corrected: the modulus d = 1
contributes an exact constant 1 − P(1) over F_q[u] (h = 0 excluded), which the previous statement
missed; the corrected identity mirrors the integer one exactly, and a new lemma shows the off-diagonal
remainder Off_f(N) is a finite sum over moduli of degree between N and ≈3N minus an explicit series.
Both were verified by two independent exact computations (`thesis/ff.ts`, `thesis/ff-tail.ts`).
