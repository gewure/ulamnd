# Research uses: what the findings of papers I–IV could be good for, argued and rated

Written 13 September 2026, the day after the first external assessment and the repair of paper IV. This file is
the place for thoughts about *where the work could lead*, kept separate from KNOWLEDGE.md (what is established, what
went wrong) and from the papers (what is claimed). Everything here is a hint or a route, not a result, unless it says
otherwise. Ratings:

| stars | meaning |
|---|---|
| ★★★★★ | a concrete route with the tools in hand; do it next |
| ★★★★ | promising and concrete; one identified idea missing |
| ★★★ | plausible; the connection is real but the work is open-ended |
| ★★ | speculative; worth a note, not a plan |
| ★ | essentially no route from here |
| ☆ | do not claim; listed to prevent the claim |

Rule for this file: every entry names what would have to be true for it to work, and what numerical test would tell
us first. Update the ratings when something is learned; date the change.

## 0. What we actually have (the toolbox)

Established (with the caveats of KNOWLEDGE.md 0b: II–IV unread by specialists; IV's repair one day old):
- **The exact identity** (paper I, Thm 2): Σ_{h≤H}(S_f(h) − C²) as a sum over squarefree moduli of counts of root
  pairs, split into a diagonal (equal roots) and an off-diagonal (distinct roots). Re-verified independently twice.
- **The diagonal is a Dirichlet series ζ_K(s+1)E_f(s)** with E_f an infinite product of Artin L-functions of the
  plethystic exponents Ψ_N (paper II), natural boundary Re s = −1, and an RH-conditional explicit formula for the
  Riesz means with the zeros of ζ_K and of the pair fields, plus real terms x^{m−1+1/N}·(polynomial in log x of degree
  ⟨Ψ_N,1⟩ − 1) — a Galois-theoretic fine structure (table of ⟨Ψ_N,1⟩ for 19 groups).
- **The off-diagonal decomposes into pieces** indexed by the dilation u (paper III), with unconditional control of the
  small and far moduli, a main term c_off(f)·H from u > H^{2/3+ε}, and the windows of the pieces with u ≤ H^{2/3} as the
  single open input; Theorem A′ is the exact reduction.
- **The pieces are automorphic objects** (paper IV): the root pairs are Heegner points of discriminant 4D (all forms,
  primitive or not); the piece at u = 1 with the coprimality condition is a signed sum over the sub-families {e | a},
  each a finite union of Γ₀(e)-orbits, e | rad(2D); the Dirichlet series of the Weyl sums is a Poincaré series at those
  points (the organising identity); the spectral expansion gives Y^{1/2±it_j} with amplitudes the periods of the even
  Maass forms of level e over the sub-family. For general u the sub-family is {2u² | b, u² | c} at discriminant 4u²D,
  stable under Γ⁰(u²) (conjugate to Γ₀(u²)): piece u lives at level u².
- **Numerical machinery** that has caught every one of our own errors that it could have: exact pieces to 10⁷ in
  seconds for any (D, u) and any divisor set (piece-divset.ts), spectral regressions and periodograms with taper and
  detrend, mean values to 22 digits (ef-general.py), the parameter-free phase test (median 0.012 rad at u = 1), the
  divisor-set test that found the level-e newforms.
- **Methodological findings**: differencing kills any sharp-sum O(1) claim whenever the summand is unbounded (F26);
  "same proof" generalisations must recompute pole orders (F27); every condition on a summation variable must be
  checked for invariance before an orbit rewrite (F28); derive a numerically testable consequence before writing a
  mechanism up (F24); log log growth is invisible to any computation (F26).

## 1. The open conjecture of the series: uniformity in u

**Statement.** (Paper III, Theorem A′; paper IV, Section 7.) The Cesàro conjecture for a quadratic f is equivalent to
Σ_{u ≤ H^{2/3+ε}} w(u) 𝒲_u(H/u; log H) = o(H log H); with the spectral formula for piece u at level u² this becomes:
the spectral expansion of piece u has an error O((H/u)^{1/2} u^{A}) with A < 1/4, uniformly in u, so that the sum over
u ≤ H^{2/3} of w(u)(H/u)^{1/2}u^{A} is O(H^{1−δ}).

**What is now known about its structure** (13 Sep): the forms of piece u are the level-u sub-family {2u | b} of the
discriminant-4D points, dilated by u: z_{[a,2u²x,∗]} = u·z_{[a,2ux,∗]}. So the pieces for all u are dilates of
sub-families of ONE fixed set of points, the Heegner points of discriminant 4D. The u-sum is a sum over dilations.

### 1a. Hecke operators and L-functions of Maass forms ★★★★☆
The dilation z ↦ uz is one term of the Hecke operator T_u (the matrices of determinant u are (a b; 0 d), ad = u; the
dilation is a = u, d = 1). A sum over u with weights w(u)/u of dilates of a fixed automorphic object is, formally, a
Dirichlet series in Hecke operators, and T_u u_j = λ_j(u) u_j. If the u-sum of the pieces can be written through the
full T_u (the missing terms being (z+b)/u, b mod u — the other sub-families), the spectral coefficient of the line t_j
in Σ_u w(u)P_u becomes ⟨Φ,u_j⟩·Per(u_j)·Σ_u w(u)λ_j(u)u^{−1/2}·(explicit), i.e. an L-function of u_j at the edge of the
critical strip, times the level-one period. Then the uniformity in u is the convergence of L(s,u_j) near s = 1 (known,
with polynomial dependence on t_j) — no level-uniform spectral theory would be needed at all.
- *What must be true*: the other terms of T_u, applied to the sub-family, must reassemble into the other pieces or
  into something controlled. KNOWLEDGE 3b's naive Shimura version of this idea failed numerically (predicted amplitude
  ratio 0.639 at u = 2 against 1.017 observed) — but that version ignored the sub-family and the level. Redo the
  bookkeeping with the correct set {2u² | b, u² | c}.
- *First test*: the amplitude ratio amp(u)/amp(1) of the line t_1 = 13.78 for u = 2, 3, 5 against λ_1(u)·u^{−1/2} with
  λ_1(2) = 1.549 (LMFDB, first even level-1 form). The phases are already right (−t_j log u confirmed at u = 2).
  Data: piece-divset.ts with U; amplitudes from piece-maass.ts. Caveat from 13 Sep: at u = 3, 5 the level-one line is
  not detectable at Y ≤ 10⁷, so the test needs either larger Y or a matched filter.
- *Why ★★★★☆ and not five*: the same idea has failed once in a naive form; the sub-family may not be a Hecke image;
  and even if it works for the model object, the weight λ and the squarefree condition (model → piece) add their
  own sub-families.

### 1b. The spectral large sieve in the level aspect ★★★
*Literature found 13 Sep (verified):* Liu–Masri–Young (Compos. Math. 2013) equidistribute the FULL sets of Heegner points
of level q as q, D → ∞ via hybrid subconvexity and L²-restriction norms on the points; Humphries–Nordentoft (JEMS, to
appear) do the level and subgroup aspects for real quadratic invariants by rewriting Weyl sums as adèlic period
integrals of Rankin–Selberg type; Pascadi (Forum Math. Pi 2026) has a level-uniform large sieve for exceptional
Maass forms. These are the tools for our sub-families {2u²|b, u²|c}; none treats sub-families defined by a
divisibility condition on the middle coefficient, which is the new feature.
Deshouillers–Iwaniec's large sieve inequality for the spectrum of Γ₀(N) is uniform in N. The pieces at level u² are
Poincaré series at a cusp of width u²; Σ_u w(u) Σ_j |⟨Φ,u_j^{(u²)}⟩|²·(period)² is the kind of quantity it bounds.
- *What must be true*: the period sums over ≍ u Heegner points of level u² must be bounded on average over j with a
  saving over the trivial u·sup|u_j|; the large sieve gives averages over the spectrum, and Cauchy–Schwarz then needs a
  second-moment bound for the periods (a Katok–Sarnak-type identity at level u², relating Per² to L(1/2, u_j ⊗ χ) and
  a level-u² twist).
- *First test*: compute Σ_j Per_{u}(u_j)² over the first 20 forms at level 1 for u = 1 (Katok–Sarnak) and check the
  scaling of the analogous sums as u grows — needs Maass data at levels u² (see §4).

### 1c. The bilinear hybrid of KNOWLEDGE 3f ★★★
Average over u first (bilinear in (u, d)), then spectral in d. Tools named there: Fouvry–Iwaniec's large sieve for
roots of quadratic congruences (Acta Arith. 79), Deshouillers–Iwaniec, Kloosterman-fraction bounds (structurally
blocked in the form we needed; maybe not in a hybrid form). This is what part III's Type II argument does at the large-u
end; the missing object is the same argument for H^{1/10} < u < H^{2/3}. Rated three because the tools exist and the
route is standard, and no step is identified as the one that works.

### 1d. Function field first ★★★★★ (for a theorem, not for the conjecture over Z)
Over F_q[u] (paper III, Section 5; paper I's function-field theorem) the whole programme becomes a question about
point counts on explicit varieties V_{k,N}; the small moduli vanish identically, the remainder has finite support, and
the conjectured main term −(N+1−c_N(D))/q with c_N(D) = min(N, max(2N−2, deg D)−1) is confirmed numerically in six
cases. Deligne/Katz (monodromy of the Salié-type sheaf) should give the Cesàro form of (E) over F_q[u] for q → ∞
unconditionally. This is the most likely place to close a conjecture with the present tools, and the result would be
the function-field analogue of Conjecture 1 with an explicit constant, which does not exist in the literature.
- *First step*: compute κ_N(D) by hand for N = 3 (Remark config) and verify against offq.ts; then the monodromy.

### 1e. What is NOT a route ☆
- Bounding each u separately with the trivial Weyl law at level u² (the spectral identity is exact; bounding its
  right side well IS the original problem). KNOWLEDGE 3f item 5.
- The periodisation shortcut (3e) and the Kloosterman-zeta-of-the-modulus route (F24): recorded as wrong.

## 2. Related well-known conjectures and problems, and what the findings offer

### 2a. Square-root cancellation for Hooley's Weyl sums (composite moduli) ★★★
Hooley (1963) proved X^{3/4+ε} for Σ_{d≤X} Σ_{ν²≡D (d)} e(kν/d); Bykovskiĭ X^{2/3+ε}; square-root cancellation
X^{1/2+ε} is expected and open for composite moduli (DFI 1995 handle prime moduli). Paper IV's organising identity says
the Dirichlet series of these Weyl sums is a Poincaré series at the Heegner points of discriminant 4D; its Section on
Hooley's sum observes square-root cancellation numerically with the even level-one spectrum and the same phase law.
- *What the method gives*: for RIESZ MEANS of Hooley's sum (order m ≥ 2), a spectral expansion with error o(X^{1/2}) —
  the same proof as Theorem main with the seed e(k Re z) instead of the sawtooth, at levels e | rad(2D) if the moduli are
  restricted to (d, 2D) = 1. This is probably "known to experts" in the form of Bykovskiĭ's treatment; the explicit
  amplitudes (Katok–Sarnak periods, phases (t_j/2) log|D|) are, as far as we know, new.
- *What it does not give*: the sharp sum. The passage from a Riesz mean to the sharp cutoff costs exactly the
  exponent Bykovskiĭ loses.
- *Sharpened 13 Sep (evening)*: the remainder of paper IV's Riesz-mean theorem IS a Riesz-smoothed Hooley sum
  (ERRATA 17): the sharp start of Σ_{h≤t} leaves the term Y^m(√|D|/2)B₂({x}) = Y^m(2π²)^{-1}Σ_k k^{-2}Σ_{d≲Y}ρ_k(d). So the
  two problems are one: the piece's oscillation at t_j has an argument-side source (our residues) and a modulus-side
  source (Hooley's sums), and any theorem with an error term for the Cesàro pieces must treat both. Conversely, the
  organising identity gives the argument-side half of Hooley's problem for free. ★★★★ for the *smoothed* statements
  (both sides are then standard); ☆ for the sharp sums.
- *First step*: write the seed for e(k Re z), check the parity rule (odd forms drop out for the real part; the
  imaginary part picks the odd ones — a new, testable prediction), and rerun weyl-partial.ts on Riesz means.

### 2b. The variance of primes in polynomial sequences (Montgomery–Soundararajan for polynomials) ★★★
Conjecture 1 (first power of C(f)) predicts, under Hardy–Littlewood, Var/E ≈ 1 − log H/log X for the primes among
f(t), t < T (paper I, eq. varHL2), the exact polynomial analogue of Montgomery–Soundararajan's law for intervals. This
is a new prediction about primes and it is testable far beyond what we did (T ≤ 4·10⁷). It offers nothing towards
proving anything about primes; the value is the sharp, falsifiable statement and the explicit constant A_f
(= A_f^diag + C² c_off).
- *Related open problem*: the k-point analogue (paper II open problem (d)); even the linear case's third moment is open
  (Kuperberg). ★ for that.

### 2c. Equidistribution of Heegner points and closed geodesics in the level aspect ★★★ (raised 13 Sep: the methods exist, see 1b)
Duke's theorem (discriminant aspect) is the untwisted statement behind our period sums; the u-problem asks for period
bounds over the level-u² sub-families with the level growing — a "sparse" or level-aspect equidistribution for Heegner
points, related to Michel–Venkatesh's work in spirit. Our contribution would be a natural family (the dilates of the
level-u sub-families of one discriminant) where such a statement has an arithmetic consequence (the pair correlation of
prime values). No route to prove it from here; two stars because the family is natural and the numerics are cheap.

### 2d. Central values of L-functions of Maass forms ★★
Katok–Sarnak: Per_D(u_j)² is proportional to L(1/2, u_j)·L(1/2, u_j ⊗ χ_D). The amplitudes of the lines in the pieces
therefore encode central values, and paper IV's Table of amplitudes is (up to the normalisation we have not pinned) a
measurement of them. As a numerical method this is far worse than existing ones; as a consistency check of the theory it
is useful (the amplitude law is the one prediction of paper IV that is NOT confirmed — that is where to look).

### 2e. Selberg's eigenvalue conjecture ★☆
An exceptional eigenvalue at level u² (s_j ∈ (1/2, 1)) would make piece u grow like Y^{s_j} > Y^{1/2}; our pieces are
O(√Y) numerically for u ≤ 5, consistent with the known absence of exceptional eigenvalues at small levels. The
pieces are, in principle, a detector of exceptional eigenvalues; they are not a route to the conjecture.

### 2f. The Riemann Hypothesis and GRH ☆
The explicit formula of paper II is conditional on RH for ζ_K and the pair fields; the zeros appear in the second
moment at relative size T^{−1/4}, below the Hardy–Littlewood transfer tolerance (KNOWLEDGE P14). Nothing here bears on
RH. The converse (E_m(x) small ⇒ RH for ζ_K, paper II open problem / KNOWLEDGE P9) is a standard Landau-type
statement and would be a nice remark, not progress on RH. Never write otherwise (the "safe sentence" of
paper-II/LITERATURE.md §0).

### 2g. The sharp-sum remainder (new question) ★★
For f = t: Σ_{h≤H}𝔖(h) = H − ½ log H + E(H) with E = O((log H)^{2/3}) (Friedlander–Goldston, Vaughan). Our differencing
shows E(H) − E(H−1) = 𝔖(H) − 1 − ½ log(H/(H−1)), which is ≫ log log H along primorials, so E is not O(1) and the true order
lies between log log H and (log H)^{2/3}. For t²+1 the same growth arises from the off-diagonal primes. A conjecture
"E(H) ≍ (log log H)^{?}" would be new; proving anything beyond Friedlander–Goldston needs Vinogradov-type exponential
sums. Two stars: a clean question, no tool of ours applies.

### 2h. Hypothesis W and Kloosterman fractions ★★
Hypothesis W(θ, B) of paper III (Weyl sums of dilated roots, uniform in the frequency k ≤ u² log H and the dilation) is,
in the level-u² language, exactly the uniform version of paper IV's spectral formula. The known bilinear bounds for
Kloosterman fractions (DFI 1997, Bettin–Chandee) are structurally the wrong shape (LITERATURE round 1). The
reformulation may unblock a hybrid; no concrete step identified.

## 3. Uses of the *methods* (independent of the conjecture)

- **Plethystic exponents for Frobenian Euler products with a 1/p-dependence** (paper II, Ψ_N): the factorisation
  1 + χ_V v = ∏ det(1 − g v^N | Ψ_N)^{−1} and the meromorphy/natural-boundary criterion extend Kurokawa–Moroz to this
  two-variable situation. Use: any singular-series-type Euler product ∏(1 − (aω + bν)/p)/(1 − ω/p)^k. ★★★
- **The differencing lemma** (F26) as a sanity check on any "partial sum = main term + O(1)" claim in the literature
  on singular series averages. ★★★ (cheap, sharp, and we found two of our own errors with it).
- **Verify-then-write**: every mechanism of paper IV was wrong at least once before its numerically testable
  consequence was checked (F24, F25, F28). The infrastructure (pieces in seconds for any (D, u, divisor set); the
  phase test with no free parameter; the divisor-set test) is reusable for any question about roots of quadratic
  congruences. ★★★★
- **The level-e resolution of coprimality conditions** (Lemma subfamily): a divisibility condition on the leading
  coefficient of the forms is Γ₀(e)-invariant; a condition on the middle coefficient is Γ⁰-type; the dilation moves
  between them. Routine once seen; useful whenever an arithmetic sum over quadratic forms carries congruence
  conditions. ★★★

## 4. Infrastructure that the open problem needs (ordered)

1. **Maass form data at non-squarefree levels** (4, 9, 25): the LMFDB has squarefree levels only. Options: Strömberg's
   or Booker–Strömbergsson–Venkatesh tables; or implement Hejhal's algorithm for Γ₀(N) (pullback to a fundamental
   domain, Fourier expansions at every cusp). Without it the level-u² prediction cannot be tested for u > 2. ★★★★★
2. **A spectral estimator with the Riesz kernel**: the theory predicts Y^{m+1/2+it_j}·B(m+1, ½ ∓ it_j); fit that shape
   (a matched filter) instead of a bare cosine on P/√Y; this suppresses slow components legitimately. piece-periodogram
   now has DEG (polynomial detrend) and TAPER (Hann); the matched filter is the next step. ★★★★
3. **The slow component at u ≥ 3** (lines near 3.5 and 5.1 in log Y, R² up to 0.6, surviving a fifth-degree detrend and
   a Hann window; the 5.1 matches the first even level-3 newform for u = 3 and two discriminants, the 3.5 is unidentified
   and, if the level-u² picture is right, must be a level-9 parameter). Understand it before any claim about u > 1.
4. **The model → piece passage** (weight λ, squarefree condition): write it as sub-families {mℓ² | d} with weights
   κ(m)μ(ℓ), decaying like 1/m and 1/ℓ²; state precisely which level-uniform input would make Theorem main a theorem
   about the actual u = 1 piece. Milder than the u-problem; unexplored.
5. **Paper IV's remainder bound** (ERRATA 16–17, Remark rem:gaps): the smoothing route was carried out on 13 Sep and
   is NOT enough — the remainder contains Riesz-smoothed Hooley sums of the same order as the main term. Two honest
   options: (a) DONE 13 Sep night — Theorem thm:smooth, phase-tested to 0.035 rad; next: amplitude test (needs the
   L²-normalisation of u_1) and an outside reading ★★★★★; (b) compute the Hooley part by the modulus-side spectral
   expansion and add it to the residues, then retest the amplitude law ★★★ (a research task, Bykovskiĭ's territory).
6. **Paper II's corrected general theorem, tested**: the cyclic cubic t³ − 3t − 1 must show a log x factor at
   x^{m−2/3}. Script riesz-cubic.ts (13 Sep) produces the Riesz means; the fit and the exact prediction of the
   coefficient are the next step (research/paper-II/scripts/). Status 13 Sep: constants to 40 digits (two routes),
   fit inconclusive; then (13 Sep late) a_pred computed exactly: −0.0023 at m = 2, four orders below the zero-term noise
   at x ≤ 10⁷ — the log term is undetectable there, the correction rests on the algebra. To test it one would need the
   zeros of L(s,χ) for the cubic character subtracted exactly and x far beyond 10⁷; not worth it. ☆ as a numerical
   project. Lesson re-learned: mpmath's dirichlet() is wrong at s = 1; compute L(1,χ) by the digamma formula.

## 4b. Parked research items (13 Sep night): NOT part of the internal phase
These are research, not polishing; they start only on the author's decision. In order of expected value per effort:
1. The Hooley part of the Riesz-mean theorem via the modulus-side (Kuznetsov/Bykovskiĭ) expansion, then the amplitude law
   of §6 retested with the corrected coefficients (★★★).
2. The smooth-window theorem at general u (level u², Γ⁰(u²)): the computation is the same; testing needs Maass data at
   non-squarefree levels (★★★ for the theorem, blocked for the test).
3. The function-field theorem (1d) (★★★★★ for a closable statement).
4. The Hecke/L-function mechanism for the u-sum (1a) (★★★★☆), then the level-aspect tools of 1b.
5. Uniformity in u itself.

## 5. Thoughts, unrated
- Every one of the three errors found on 12 Sep sits at a place where an "obviously" true step replaced a
  computation. The programme's strength is that it tests; its weakness is the step between the test and the theorem.
  The fix is procedural (KNOWLEDGE §6 checklist), not mathematical.
- The most valuable single number the project has produced is probably c_off(t²+1) = −0.13439, the first main term
  of the off-diagonal anywhere, confirmed to three digits by an independent mean. It is a theorem (paper III) and a
  prediction (mean of the sharp off-diagonal) at once, and it says the off-diagonal is not noise.
- If the Hecke idea (1a) is right, the Cesàro constant A_f would acquire a spectral expression: A_f^diag from ζ_K and
  the pair fields, C²c_off from the dilation average, and the pieces' contribution from L-values of Maass forms at the
  edge — three different spectra in one constant. That would be worth a paper even without the uniformity.

## 6. Follow-up paths explored on 14 September 2026 (after the internal phase; literature verified that day)

Question asked by the author: the k-tuple singular series as a follow-up — interesting, or cosmetic? And what else, more
promising, could the findings be used for? Literature checked (arXiv abstracts read; papers named here only if seen):
Montgomery–Soundararajan 2004 (Gaussian moments of the k-point series for f = t); Kowalski, Acta Arith. 148 (2011),
arXiv 0805.4682 (limiting distribution of the k-tuple singular series, moment symmetry µ_k(m) = µ_m(k), Gallagher-type
LEADING-order averages for general polynomial families f ⊙ h, conditional Poisson law for polynomial prime patterns in
short intervals); Kuperberg 2023, arXiv 2301.06095 (singular-series sums with smooth weights); Kowalski–Soundararajan,
arXiv 2003.12965 (equidistribution from CRT; roots of polynomial congruences, quantitative forms open in degree ≥ 3);
arXiv 2003.13100 (joint distribution of roots of pairs of congruences); Einsiedler–Lindenstrauss–Michel–Venkatesh, Ann.
Math. 173 (2011) (periodic torus orbits, Duke's theorem for cubic fields); Bykovskiĭ (spectral expansion of Σ σ_ν(n²+h),
error O(X^{2/3+ε})); Gorodetsky–Sawin, Math. Ann. 2019, arXiv 1811.04834 (twin prime polynomials over F_q[T], large q,
a LOWER-ORDER term in Δ consistent with Hardy–Littlewood); Sawin–Shusterman, arXiv 1808.04001 (twin primes over F_q[T],
fixed large q); Entin, arXiv 1409.0846; Bank–Foster, arXiv 1708.07491; Palimar, arXiv 1909.03778.

### 6a. The k-tuple series as proposed ★★ (cosmetic as a stand-alone paper)
Leading order for polynomial k-point series is Kowalski 2011 (Gallagher-type, Poisson regime). The second-order
Gaussian-moment structure of Montgomery–Soundararajan pairs moduli and is universal; a polynomial version would be
conditional on Conjecture 1 and would teach nothing new about primes. Do not do this alone.

### 6b. The root-statistics hierarchy (the defensible version of 6a) ★★★★ for insight, conditional, weeks of work
Reframe by the number of roots involved: level 1 = divisor sums of f(n) (Hooley 1963 quadratics; cubic case open);
level 2 = pair correlation (papers I–IV); level k = k-tuples of roots. Content that would help others: (i) the exact
reduction "pair correlation of a degree-n f = level-1 root statistics of its difference polynomial (degree n(n−1))",
which locates why quadratics are special (x² − D) and why cubics live on the Galois closure; (ii) ordered k-tuples of
roots mod d ↔ ideals of norm d ↔ integral points on periodic torus orbits in SL_m(Z)\SL_m(R)/SO_m (Heegner points = m=2;
ELMV = m=3), with the GL_3 spectrum of a cubic's level-1 statistics as a stated conjecture, not a chase; (iii) the Galois
tower in the sub-leading terms (k-point terms see k-transitivity; unconditional, testable: S_4 vs A_4 quartics at the
3-point level); (iv) which quantitative joint-equidistribution hypothesis on roots gives which Cesàro prime statistic,
stated in smoothed form (F26). MS-type Gaussian moments as one corollary. First step: read Kowalski 2011 §5 and
Kowalski–Soundararajan fully; pilot: joint distribution of pairs of roots of one S_3 cubic mod d.

### 6c. Function field, positioned against Gorodetsky–Sawin ★★★★★ (unchanged rating, novelty now sharper)
Our object (the shift-averaged pair correlation with its explicit constant −(N+1−c_N(D))/q, paper III §5) is not their
object (the count at a single shift Δ), but their lower-order term "consistent with Hardy–Littlewood" is the closest
prior result and the methods (equidistribution of L-functions, Katz monodromy) are the same. Any write-up must cite
GS 2019, Sawin–Shusterman 2018, Entin 2014, Bank–Foster 2017 and state the difference in the first paragraph. Fixed-q,
degree → ∞ (Sawin–Shusterman's regime) is out of reach for us; large q is the target.

### 6d. Statistics of the pair singular series of a polynomial (Kowalski's Theorems 1.1–1.2 for S_f(h)) ★★★★ doable, ★★★ interest
Kowalski proved, for linear k-tuples, that Σ*_{|h|≤H} S(h)^m ~ µ_k(m) H^k with the symmetry µ_k(m) = µ_m(k), and a
limiting distribution. For a fixed polynomial f the moments Σ_{h≤H} S_f(h)^m are Frobenian Euler products with a
1/p-dependence — exactly the Ψ_N machinery of paper II; our −½C(f) log H is the m = 1 second-order term. New questions
with tools in hand: the second-order (log) terms of all moments via ζ_K and the pair fields; whether a polynomial
analogue of the symmetry exists (the "local" origin Kowalski describes should be checkable p by p); the limiting
distribution of S_f(h) and its dependence on the Galois group. Self-contained, independent of the open window, uses
only paper I's identity and paper II's algebra. Natural companion: the Frobenian-Euler-product note of §3 (Kurokawa–
Moroz–Alberts extended to the two-variable case). One paper: "Moments and distribution of the pair singular series
of a polynomial".

### 6e. A benchmark paper for the experimental community ★★★★ value per effort
Conjecture 1 + Hardy–Littlewood predict Var/E = 1 − log H/log X + (A_f-dependent corrections) for the primes among
f(t) in short ranges (paper I eq. varHL2). Nobody has tested the second moment of polynomial prime values against a
prediction with an explicit constant. The workbench sieves are built for exactly this; publish data, code and the
comparison for ~20 polynomials to T ~ 10^9–10^10 (Aletheia-Zomlefer–Fukshansky–Garcia's "experiments on Bateman–Horn"
is the audience; also Kourbatov's k-tuple gap statistics). Independent of the open window; it tests HL at second order,
which is new evidence of a kind that helps others calibrate their own experiments.

### 6f. Smoothed Hooley/divisor sums with explicit Maass amplitudes (2a revisited) ★★ novelty, ★★★★ cheapness
Bykovskiĭ has the spectral expansion and O(X^{2/3+ε}) for Σ σ_ν(n²+h); our contribution would be the explicit
Katok–Sarnak amplitudes and phases confirmed numerically (and the odd forms in the imaginary part). A short note at most;
"known to experts" risk high.

### 6g. Order of preference (14 Sep)
1. 6c function field (a closable theorem; cite GS 2019 first). 2. 6e benchmark paper (outward-facing, quick, uses the
workbench). 3. 6d moments/distribution of S_f(h) (new, self-contained). 4. 1a Hecke/L-function mechanism (the route to
the conjecture; A_f with three spectra). 5. 6b hierarchy, only if the author wants the k-tuple theme; never 6a alone.
Items 1–3 depend only on paper I's identity and paper II's algebra, which are the parts that have been reviewed most;
nothing building on III–IV should start before outside review of those two.

### 6h. Night of 14 Sep: first results of the three follow-ups (details: research/explore/STATE.md)
- u = 3 anomaly RESOLVED: the 3.5 line is Γ₀(9)'s 3.5360 (Strömberg 2012, a Γ³-type form); the u = 3 pieces show exactly
  the even part of the Γ₀(9) spectrum. §4 item 3 closed; the level-u² picture (§1) confirmed where the LMFDB has no data. ★★★★★ as
  evidence for §1; the u = 5 line 2.625 ↔ first eigenvalue of Γ⁵ is the next check.
- Cubic experiment: the Maass oscillation of the divisor-sum object lives in the moduli d > T (Hooley/DFI range); any
  truncation d ≤ T kills it (verified on the control). The cubic object therefore needs full factorisation of f(h);
  infrastructure otherwise ready. Still ★★★ discovery value, cost now known (a C factoriser, a day).
- Katok–Sarnak: linear in the Heegner values with |D|^{−3/4} (Sugiyama, arXiv 2110.02847, level N). Pins the shape of
  paper IV's κ; the D-sweep amplitude test is the next step.
- (later that night) AMPLITUDE LAW CONFIRMED across 15 discriminants (smooth-Dsweep.py): ten with |D| ≤ 23 within 5% and
  0.1 rad, no free parameter, class numbers up to 6; Bessel decay past |D| ≈ 19 followed to the noise floor. §2d/§4-5(a)
  closed for the smooth object. Cubic full-factorisation object validated on the control; x³−2 at Y = 10⁶ has rms(P) ∝
  T^0.16 instead of √T — first hint that the cubic level-1 statistic behaves differently; Y = 10⁷ running.

### 6i. 15 Sep, early: route 1a tested — the naive Hecke ratio is refuted, the oldform-projection form is the route (★★★★☆)
Amplitude of the level-1 line at dilation u = 2, 3, 5 measured for 5–11 discriminants each (explore/STATE.md §6): phase law
−t_j log u holds; amplitude ratio is 0.87 / −0.39 / −0.065 at u = 2 according to χ_D(2) = 0/+1/−1, and ≈ c/(u+1) for ramified
u — not |λ_j(u)|/√u. The correct statement is the projection of the dilated sub-family onto the 3-dim oldform space at
level u², whose Gram matrix carries λ_j(u) (checked: ⟨u₁(2z),u₁⟩/‖u₁‖² = λ_1(2)√2/3 = 0.730, as measured in paper IV).
Deriving it is the next theoretical step and gives the follow-up paper its theorem; the observed 1/(u+1) decay is far
inside the u^{1/4−ε} that uniformity needs, for the main terms.

