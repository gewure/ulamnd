# Route R: the pieces of the off-diagonal and the Maass spectrum (notes, 12 September 2026)

## 1. The numerical fact (scripts/piece-general.ts, piece-maass.ts, piece-stability.ts; data/piece-*)
For an irreducible quadratic f with discriminant D and a squarefree u with ω(u) ≥ 1, the piece
  P_u(Y) = Σ_{h≤Y} (Y−h)(F_u(Q_u(h)) − E F_u) − (E F_u − 1)Y/2,   Q_u(h) = u²h² − D,  F_u(n) = Π_{p | n split, p ∤ 2Du}(1 + 1/(p−4)),
is O(√Y), and P_u(Y)/√Y, detrended, is fitted by Σ_j a_j cos(t_j log Y + φ_j) over the EVEN Maass cusp forms of SL₂(Z)
(t_j = 13.7798, 17.7386, 19.4235, 21.3158, 22.7859, 24.1124) far better than by random frequency sets, and NOT by the odd
ones (t_j = 9.5337, 12.1730, 14.3585, 16.1381, 16.6443, 18.1809):

  f            D     u   Y_max   R²(even, 6 lines)  percentile vs random 6-sets   R²(odd)  pct   dominant line
  t²+1        −4     2   3·10⁷   0.093              99.7 %                        0.013    14 %  13.78 (amp 0.042, phase stable across halves)
  t²+t+1      −3     1   3·10⁷   0.140              100 %                         0.045    57 %  13.78 (amp 0.021/0.017 in the two halves, phase 1.01/1.03)
  t²−2         8     1   3·10⁷   0.248              100 % (above the max of 300)  0.023    12 %  13.78 (0.019/0.018, phase 0.89/0.61), 17.74 (0.005/0.006, −0.97/−1.43)
  t²−3        12     1   10⁷     0.066              99 %                          0.037    66 %
  t²+t−1       5     1   10⁷     0.062              92 %                          0.036    32 %
  t²+2        −8     2   10⁷     0.012              20 %                          0.027    64 %  (no signal)
  t²+t+41   −163     1   10⁷     0.003              0 %                           0.007    37 %  (no signal)

## 1b. The periods, computed (12 Sep, scripts/maass-period.py; coefficients of LMFDB 1.0.1.3.1)
For D < 0 with class number one the Katok–Sarnak period is u_1(z_D), z_D = (−b+i√|D|)/2, computed from
u(z) = 2√y Σ a(n) K_{iR}(2πny) cos(2πnx), R = 13.7797513. Relative to D = −4 (a common factor e^{−πR/2} cancels):

  D      |u_1(z_D)|/|u_1(i)|   fitted amp / amp(−4)   even-set significance
  −3           0.649                  0.483            yes (100th pct)
  −4           1.000                  1.000            yes (100th pct)
  −7           0.542                  0.111            yes (100th pct)
  −8           0.318                  0.281            NO  (47th pct)
  −11          0.302                  0.461            NO  (44th pct)
  −19          0.444                  1.358            marginal (92nd pct)
  −43          0.0066                   —              no signal
  −67          1.03e−4                  —              no signal
  −163         2.2e−10                  —              no signal

WHAT THIS DOES AND DOES NOT SHOW.
CONFIRMED (order of magnitude): K_{iR}(x) decays exponentially only once x > R, and 2πy_D = π√|D| crosses R = 13.78 at
|D| = (R/π)² ≈ 19.2. Below that threshold all periods lie within a factor 3 of each other — and all six discriminants
with |D| ≤ 19 show amplitudes within a factor 12 of each other. Above it the periods collapse by 10² (D=−43), 10⁴
(D=−67), 10¹⁰ (D=−163) — and those three show nothing. The presence/absence pattern is explained.
NOT CONFIRMED: the detailed amplitude law. The ratios disagree by up to a factor 5 (worst: D = −7, predicted 0.54,
observed 0.11). Two unmodelled effects of the right size: the local factors (E F_u ranges over 0.35–1.60 across these
polynomials and enters multiplicatively) and the amplitude uncertainty (the two half-ranges give 0.0026 vs 0.0053 for
D = −7, a factor 2). Settling this needs the local factors modelled and Y extended beyond 10⁷.
CORRECTED: the earlier note "the absences are explained by exponentially small periods" is right for D = −163
(period 2·10⁻¹⁰) but WRONG for D = −8, whose period, 0.32, is comparable to D = −4's. The absence at D = −8 and
D = −11 is NOT explained by the period and is currently unexplained. (Fallacy F22.)
SHARP PREDICTION, falsifiable: for the first even form the visibility threshold is |D| ≈ 19; for the next even forms
(R = 17.74, 19.42, …) it is at |D| ≈ 32, 38, …, so higher lines should persist to larger |D| than the first line does.

## 2. The mechanism (derivation outline — to be made rigorous in paper IV)
(a) Sawtooth form. S_u(t) = Σ_{h≤t}(F_u(Q_u(h)) − E F_u) = Σ_{d' adm} (λ(d')/d') Σ_{x∈R^{(u)}_{d'}} (½ − {(t − x)/d'})  (paper III,
    Fourier: Σ_{k≥1} (πk)^{−1} Σ_{d'} λ(d')ρ_k(d') d'^{−1} sin(2πkt/d'), ρ_k(d') = Σ_{u²x²≡D (d')} e(kx/d')).
(b) Mellin transform in t / Dirichlet series: Σ_t S_u(t) t^{−s} ↔ Σ_k k^{s−2}·(Γ-factor)·W_k(s),  W_k(s) = Σ_{d'} λ(d')ρ_k(d') d'^{−s}.
    The Cesàro piece P_u(Y) = Σ_{t<Y}(S_u(t) − const) is the Riesz mean of order 1: Perron integral of the Dirichlet
    series against Y^{s+1}/(s(s+1)).
(c) Weyl sums of quadratic roots are Salié sums. For odd squarefree c coprime to D, Σ_{x²≡D (c)} e(hx/c) = c^{−1/2}·(Gauss
    factor)·S̃(h, hD; c)-type sum (Salié's evaluation, DFI 1995 §2), i.e. Kloosterman sums of half-integral weight for
    the theta multiplier on Γ₀(4). For the dilated roots u²x² ≡ D the modulus range is c ≡ 0 (4·stuff) with the extra
    level u² (or: the original roots at the fractional frequency kū).
(d) Kuznetsov for weight 1/2 (Proskurin; used by Bykovskiĭ 1984 and DFI 2012): Σ_c c^{−1} S̃(m,n;c) φ(4π√(mn)/c) = spectral
    sum over weight-1/2 Maass forms of level 4 (·u²) of ρ_j(m)ρ̄_j(n) ĥ(t_j) + continuous part. The Dirichlet series W_k(s)
    corresponds to the test function φ(x) = x^{s−1}-type, so W_k(s) continues to Re s > 1/2 with poles at s = 1/2 ± it_j
    (weight-1/2 spectral parameters) and residues ∝ ρ_j(|D|)·ρ_j(k·stuff).
(e) Katok–Sarnak (1993, "Heegner points, cycles and Maass forms"): the weight-1/2 forms of level 4 in Kohnen's plus space
    correspond to weight-0 Maass forms u_j of SL₂(Z) with the SAME t_j (Shimura/Shintani), and the coefficient at |D| is,
    up to explicit factors, the period of u_j over the Heegner points (D<0) or the closed geodesics (D>0) of
    discriminant D. Parity: the periods vanish for odd u_j. So the poles of W_k(s) are at 1/2 ± it_j, t_j = EVEN Maass
    parameters of SL₂(Z), with residues ∝ period_D(u_j) × (coefficient at k).
(f) Riesz mean: shifting the Perron contour to Re s = 1/2 + ε (growth in |Im s| polynomial from the spectral expansion;
    Riesz order m absorbs it) gives P^{(m)}_u(Y) = c_u Y + Y^{1/2} Σ_j c_j(u,f) cos(t_j log Y + φ_j) + O(Y^{1/2−δ}·…) — the
    observed law. The Cesàro case m = 1 is what we computed; the sum over j converges by the spectral decay of the
    test function (Y^{1/2+it}/(s(s+1)) gives 1/t_j² per line: the first even form dominates, as observed).
(g) The k-sum: Σ_k k^{s−2} W_k(s) at Re s = 1/2+ε needs the residues' k-dependence, ρ_j(k…) ≪ k^{1/4}-ish individually
    (better on average) against k^{−3/2}: converges. This is why the "flat spectrum" obstruction of Theorem A does not
    bite here: the Weyl sums are not bounded one frequency at a time but expanded spectrally, and the k-dependence is a
    Fourier coefficient, not a Weil-type loss.

(Parameter lists verified against LMFDB, 12 Sep: level-1 forms with R ≤ 26 are exactly as used; next even form 25.826.)

## 3. Amplitude prediction (to compute once the coefficients are in hand; the LMFDB API exposes no coefficients — use
## Booker–Strömbergsson–Venkatesh's tables or Hejhal's algorithm)
For D<0 with class number 1: coefficient of Y^{1/2+it_j} ∝ u_j(z_D)/(cosh(πt_j)·‖u_j‖…)·Γ(…)·(local factors at p | 2Du,
which for u > 1 involve the oldform structure at level 4u²). Ratios across polynomials at fixed j are therefore
u_j(z_{D₁})/u_j(z_{D₂}) times local factors; ratios across j at fixed f are u_j(z_D) × spectral weights. Test: with the
Fourier coefficients a_j(n) of the first even form (LMFDB 1.0.1.3.1) compute u_1(i), u_1(ρ), u_1(i√2) via the Fourier
expansion u(z) = √y Σ_n a(n) K_{it}(2π|n|y) cos(2πnx) and compare |u_1(ρ)| : |u_1(i)| : |u_1(i√2)| with the fitted
13.78-amplitudes 0.139-fit for t²+t+1 (u=1) : t²+1 (u=2, level 16 — local factor at 2 unknown) : t²+2 (u=2, no signal).

## 4. What this means for the programme
- The "second spectrum" (P4) is real, and it sits in the pieces of the off-diagonal at scale √Y with the even Maass
  parameters of SL₂(Z); the sharp Off_f(H) hides it (F20).
- Paper IV's main line: route R, i.e. the explicit formula P_u(Y) = c_u Y + Y^{1/2}Σ_j(...) + error, first for fixed u
  (a theorem within reach by Bykovskiĭ/DFI/Katok–Sarnak), then the level uniformity for the sum over u.
- The parity selection rule is a clean prediction that the data confirm on five polynomials and refute on none
  (two absences are explained by exponentially small periods).

## 1c. A selection rule at p = 3 (12 Sep) — new, unexplained, and sharp
Splitting the nine-plus-five tested polynomials by the behaviour of the prime 3 in Q(sqrt D):

  3 SPLIT (lambda(3) = 3/(3-4) = -3, a large negative weight at the smallest split prime):
    D = -8 (47th pct), -11 (44th), 13 (67th), -23 (19th), 28 (23rd)      -> 0 of 5 show a signal
  3 INERT or SPECIAL (no lambda(3) factor):
    D = -4 (100th), -3 (100th, special), -7 (100th), 5 (92nd), 8 (100th), 12 (99th, special),
    17 (99.3rd), -19 (92nd), 20 (74.7th)                                  -> 8 of 9 show a signal

Under no association this split is unlikely (Fisher exact, roughly p = 5e-4). It is NOT a signal-to-noise effect:
sd(P/sqrt Y) is 0.056 for both D = -3 (signal) and D = -8 (none), and 0.235 for D = -11 (none) against 0.098 for
D = -4 (signal), so the groups are not separated by the size of the piece.
Status: UNEXPLAINED. What is special about 3 splitting is that lambda(3) = -3 is the only negative value of lambda,
and |lambda(3) rho(3)/3| = 2 > 1, so the local factor at 3 of the Euler product for W_k(s) has modulus up to
3 * 2 * 3^{-1/2} = 3.46 at Re s = 1/2 -- the one place where a single local factor dominates the spectral term. The
natural guesses are (i) the local factor at 3 shifts the abscissa so the spectral poles are no longer the nearest
singularity, or (ii) an oldform/newform effect at level divisible by 3. Neither is checked.
This is the sharpest open question in the project and it is cheap to attack: test more discriminants, and test whether
the signal returns when the p = 3 Euler factor is divided out of the piece.

## 1d. THE WEIGHT IS THE CULPRIT (12 Sep): the model piece with lambda == 1
Replacing lambda(p) = p/(p-4) by lambda == 1 -- i.e. F(n) = sum_{d|n, sqfree, (d,2Du)=1} 1/d, the restricted
sigma_{-1} along Q_u(h) -- and repeating the regression at Y = 10^7, u = 1:

  D      R^2 even   pct    R^2 odd   pct        with lambda (for comparison)
  -4      0.237     100     0.027    13         0.152 (100th)
  -3      0.139     100     0.019    13         0.139 (100th)
   8      0.319     100     0.036    14         0.217 (100th)
  17      0.098    99.3     0.017     7         0.078 (99.3rd)
  -8      0.109     100     0.029    17         0.031 ( 47th)  <-- was ABSENT
 -11      0.078     100     0.015    11         0.009 ( 44th)  <-- was ABSENT

SIX of six significant, every odd set below the 17th percentile, and the two discriminants that showed nothing with
the lambda weight show a clean signal without it. CONCLUSIONS:
(a) The p = 3 selection rule of 1c is an ARTEFACT OF THE WEIGHT, not a fact about the roots of the congruence.
    lambda(3) = 3/(3-4) = -3 is the unique negative value of lambda and the largest in modulus; at the smallest split
    prime it swamps the spectral term. Nothing arithmetic is hiding at 3. (Fallacy F23.)
(b) The right object for a theorem is the MODEL PIECE (lambda == 1). Its sawtooth/Weyl-sum reduction is identical
    (Lemmas 2.1, 2.2 do not use lambda) but its Dirichlet series is sum_d d^{-s} W_k(D;d) with NO multiplicative
    weight -- a Salie zeta function with a squarefree and a coprimality condition, and nothing else. The lambda-weighted
    piece, which is the one the off-diagonal of part III actually needs, is then this plus a perturbation
    lambda = 1 * kappa, kappa(p) = 4/(p-4) = O(1/p).
(c) The phenomenon is STRONGER without the weight (R^2 up to 0.32 against 0.22), so the model piece is also the better
    object to measure.

## 1e. The cleanest object (12 Sep): drop the squarefree condition too
Same test with lambda == 1 AND all divisors (not only squarefree), u = 1, Y = 10^7:

  D     weighted sqfree   lambda=1 sqfree   lambda=1 ALL divisors   (all percentiles 100 in the last column)
   8      0.217 (100)       0.319 (100)        0.420
  -4      0.152 (100)       0.237 (100)        0.361
  -3      0.139 (100)       0.139 (100)        0.208
  -8      0.031 ( 47)       0.109 (100)        0.162
 -11      0.009 ( 44)       0.078 (100)        0.167
  17      0.078 (99.3)      0.098 (99.3)       0.116

MONOTONE in all six rows: the more arithmetic weight removed, the more variance the even spectrum explains. Odd sets
4.7-28.7 percentile throughout. So the target object for the u = 1 theorem is
  G(Y) = sum_{h<=Y} (Y-h) (sigma*_{-1}(h^2 - D) - mean),  sigma*_{-1}(n) = sum_{d|n, (d,2D)=1} 1/d,
a Riesz mean of the Hooley/Gafurov divisor sums, whose Dirichlet series is Z_k(s) = sum_{(d,2D)=1} W_k(D;d) d^{-s} --
a Salie zeta function with a coprimality condition and NOTHING else. Lemmas 2.1 and 2.2 never used lambda or
squarefreeness so they apply verbatim. The part-III piece is this perturbed twice (Mobius over l^2; lambda = 1*kappa).
VALIDATION: the script's E F for the squarefree model agrees with a 22-digit computation to 12 digits (1.110144363168
vs 1.110144363167292941489); the residual induces a smooth drift of about 0.011 in P/sqrt(Y) across the range, an
order of magnitude below the signal. For publication-grade runs pass E F via the env var.

## 1f. FACTOR-2 TEST (12 Sep): the frequencies are t_j, and that rules out the route I had sketched
The Kloosterman-zeta route of Section 3 (Goldfeld-Sarnak, Z(s) = sum_c S(m,n;c) c^{-2s}, poles at s = s_j) sums over
the MODULUS c. Tracing it through the Hurwitz/Mellin step gives poles of A(s) at s = -1/2 + 2 i t_j and therefore an
oscillation of P(Y)/sqrt(Y) at frequency 2 t_j, not t_j. Tested directly (scripts/piece-freq.ts, MULT = 1 vs 2, with
the random control band widened to cover both):

  object    MULT=1 (t_j):  R^2 even (pct)      MULT=2 (2 t_j): R^2 even (pct)   R^2 odd at 2t_j (pct)
  A-Dm4      0.3614 (99.7)                      0.0221 (59.7)                    0.0325 (76.3)
  A-D8       0.4197 (100)                       0.0210 (43.0)                    0.0832 (92.0)
  A-Dm3      0.2078 (100)                       0.0218 (53.7)                    0.0948 (99.0)
  A-Dm11     0.1667 (100)                       0.0193 (69.0)                    0.0244 (77.7)

DECISIVE: the signal is at t_j. The 2 t_j prediction is refuted (43-69th percentile, i.e. nothing).
CONSEQUENCE: the Kloosterman-zeta-in-the-modulus route is NOT the mechanism. The right route is Bykovskii's: expand
the sum over the ARGUMENT h as a finite sum of SL_2(Z) Poincare series and apply the spectral decomposition in
WEIGHT 0, LEVEL 1. There the eigenvalue parametrisation lambda_j = s_j(1-s_j), s_j = 1/2 + i t_j, produces terms
Y^{s_j} = Y^{1/2} Y^{i t_j} directly -- the same shape as the error term in the hyperbolic lattice-point problem.
That matches all four observations at once: frequency t_j, scale sqrt(Y), even forms only (the Heegner/geodesic cycle
of discriminant D pairs trivially with odd forms), and the visibility threshold |D| < (t_j/pi)^2.
The Salie material of Section 3 remains TRUE (the Weyl sums are Salie sums, verified) but it is not the road to the
observed frequencies; it is the internal machinery of the modulus-side estimates, not of the argument-side expansion.

## 1g. THE PHASE TEST (12 Sep) -- the strongest evidence in the project
The mechanism of Section 5 predicts the PHASE of the t_1 = 13.7798 oscillation with NO free parameter once one
discriminant is fixed, because (i) the length enters the test function only through 2t/sqrt|D|, contributing a factor
(2/sqrt|D|)^{i t_1}, and (ii) the amplitude is proportional to the Katok-Sarnak period, a real number whose SIGN
shifts the phase by pi. With D_0 = -4 as reference (scripts/phase-test.py, periods from LMFDB coefficients):

   D    sign Per   predicted phi   observed phi   difference
  -3       +          +1.158         +1.050        +0.108
  -4       +          +3.140         +3.140        (reference)
  -7       +          +0.712         +0.500        +0.212
  -8       -          -1.509         -1.430        -0.079
 -11       -          +0.685         +0.530        +0.155
 -19       -          -1.833         -1.870        +0.037

FIVE predictions, all within 0.212 rad = 3.4% of a full period. Probability by chance: (2*0.212/2pi)^5 = 1.4e-6.
The test exercises both halves of the mechanism simultaneously: the (2/sqrt|D|)^{i t_1} factor (which is what makes
the predicted phases differ at all) and the sign of the period (which puts D = -8, -11, -19 on the opposite side,
computed independently of any arithmetic data). This is much stronger than any of the variance fits, and it is what
convinces me the argument-side Poincare route is right.
AMPLITUDES: fitted amplitude divided by |Per_D|/|Gamma_{z_D}| gives (x 10^7) 2.68, 2.22, 0.39, 1.90, 2.71, 2.71 for
D = -3, -4, -7, -8, -11, -19: five of six within 40% with no extra factor; the outlier D = -7 is also the least stable
fit (0.0028 vs 0.0048 across the halves, a factor 1.7). So amplitude ~ period/|Gamma_z| is supported but not sharp.

## 1h. THE ORGANISING IDENTITY (12 Sep) and the convergence lemma
(a) sum over Heegner points of (Im z)^s e(m Re z) = (sqrt|D|/2)^s sum_d d^{-s} sum_{b^2 = D (4d)} e(-mb/(2d)).
    Verified numerically for D=-4, s=1.6, m=1 to 1e-16. In words: THE DIRICHLET SERIES OF THE WEYL SUMS OF A QUADRATIC
    CONGRUENCE IS SELBERG'S POINCARE SERIES EVALUATED AT THE HEEGNER POINTS OF THAT DISCRIMINANT. This is the identity
    that organises the whole paper: the spectral expansion of P_m(.,s) has rightmost poles at s = 1/2 +- i t_j (from
    the Mellin transform of K_{it_j}), the orbit sum replaces u_j by the Katok-Sarnak period, and Mellin inversion
    turns a pole at s_j into Y^{1/2 + i t_j}. It ALSO settles the factor-2 question: the poles sit at 1/2 +- i t_j in
    the SAME variable d^{-s} in which the Weyl series is written, so the frequencies are t_j. The Kloosterman-zeta
    route reaches the same coefficients through the modulus in a c^{-2 sigma} normalisation; translating between the
    two is what I got wrong (F24).
(b) CONVERGENCE (missing piece 1 of Section 5, now resolved). The seed Phi_t(z) = y psi(2ty/sqrt|D| + 2x) has
    |Phi| <= y/2 and sum_gamma Im(gamma w) diverges. Symmetrising, Phi^+ = (Phi(z) + Phi(-zbar))/2, and using that psi
    is odd and piecewise linear with slope -1: for ||2x|| > a = 2ty/sqrt|D| one has EXACTLY
    psi(2x+a) + psi(-2x+a) = -2a, so Phi^+ = -a y = -2t y^2/sqrt|D|. Verified: the identity holds off a set of
    x-measure exactly 2a. So the seed is O(t y^2) off a set of measure O(ty) where it is O(y); both are dominated by
    t E(w,2), which converges. The Heegner orbit is stable under z -> -zbar ((d,b) -> (d,-b)), so symmetrising is free.
    This is the FOURTH consequence of the single symmetry x -> -x of the root set: vanishing linear term in the
    sawtooth identity; vanishing odd half of Hurwitz; vanishing periods of odd Maass forms; convergence of the
    Poincare series.
REMAINING in Section 5: smoothness (which Riesz order m makes the spectral sum converge absolutely -- governed by the
Gamma-factor decay e^{-pi t_j/4} in (mellinK) against the Weyl law) and the error term.

## 1i. HOOLEY'S SUM ITSELF (12 Sep) -- the cleanest confirmation
The identity of 1h predicts the same law for the BARE partial sums of the Weyl sums,
  T_k(X) = sum_{d<=X, (d,2D)=1} sum_{b^2 = D (d)} e(kb/d),
which Hooley (1963) bounded by O(X^{3/4+eps}). No divisor sum, no Riesz mean, no weight. Computed for all X <= 10^6
(scripts/weyl-partial.ts: Tonelli-Shanks + Hensel + CRT).

RESULT 1: T_1(X)/sqrt(X) is BOUNDED (|.| <= 0.56, sd 0.14 for D = -4) -- square-root cancellation, far beyond 3/4.
RESULT 2: its spectrum is the EVEN one for all six discriminants (96th-100th percentile); 2 t_j rejected (12.7th).
RESULT 3: the parameter-free phase prediction phi(D) - phi(-4) = (t_1/2) log(|D|/4) - pi*[period sign flips]:

   D    R^2 even (pct)   predicted phi   observed phi   difference
  -3     0.173 (100)        -2.992         -2.980        -0.012
  -4     0.412 (100)        -1.010         -1.010        (reference)
  -7     0.159 (100)        +2.846         +3.110        -0.264
  -8     0.252 (98.3)       +0.624         +0.520        +0.104
 -11     0.170 (100)        +2.818         +2.810        +0.008
 -19     0.206 (96.0)       +0.301         +0.310        -0.009

THREE of five within 0.012 rad = 0.19% of a full period; MEDIAN discrepancy 0.012 rad. On an independent object from
the one used in 1g, and a barer one. This is the strongest evidence in the project.
Note the standalone interest: "the partial sums of the Weyl sums of a quadratic congruence exhibit square-root
cancellation with an explicit spectral expansion over the even Maass forms of SL_2(Z), with amplitudes the
Katok-Sarnak periods" is a statement about Hooley's classical sum, independent of the singular-series programme.

## 1j. STEP 4 DONE ELEMENTARILY (12 Sep night) -- and a second mis-citation caught
Reading the Goldfeld-Sarnak PDF (on disk from the literature round) showed their Poincare series is
P_m(z,s) = sum (Im gamma z)^s e(m * gamma z) -- note e of gamma z, whose imaginary part contributes
e^{-2 pi m Im(gamma z)}, an exponential DECAY which is why they can say P_m is in L^2. Our series carries only
e(m Re gamma z). Different object; the citation does not apply, and the square-root-cancellation Proposition built on
it is withdrawn (F25).
It turns out none of it was needed. Step 4 is elementary:
  Phi^+_t(z) = (y/pi) sum_k k^{-1} sin(2 pi k a) cos(4 pi k x),  a = 2 t y / sqrt|D|
  <Phi^+_t, u_j> = sum_k (a_j(2k)/(pi k)) I_k,  I_k = int_0^inf y^{-1/2} sin(beta_k y) K_{i t_j}(alpha_k y) dy
                   with alpha_k = 4 pi k, beta_k = 4 pi k t / sqrt|D|   [x-integral forces n = 2k]
  y = w/beta_k, then K_{i tau}(x) = (1/2)[Gamma(-i tau)(x/2)^{i tau} + c.c.] + O(x^2)  (verified, rel err 1e-6 at x<=0.1)
  and int_0^inf w^{sigma-1} sin w dw = Gamma(sigma) sin(pi sigma / 2)  (verified)
  => I_k = beta_k^{-1/2} [ C_j (sqrt|D|/(2t))^{i t_j} + c.c. ] + O((sqrt|D|/t)^2)
  => <Phi^+_t, u_j> = t^{-1/2}(A_j(D) t^{-i t_j} + c.c.),  and Riesz => Y^{1/2 +- i t_j}.
EXPLAINS BOTH TESTED FACTS: frequency t_j (the Bessel expansion gives x^{+- i t_j}); and the phase factor
(sqrt|D|/2)^{i t_j}, i.e. the (t_j/2) log|D| shift confirmed to a median of 0.012 rad. The derivation is now
self-contained apart from the spectral decomposition itself.
NOTE on amplitudes: this derivation also predicts a factor beta^{-1/2} ~ |D|^{1/4}, i.e. amplitude ~ |D|^{-1/4} Per/|Gamma_z|.
Tested: that fits WORSE than |D|^{-1/2} Per/|Gamma_z| (spread 0.63-5.66 vs 0.39-2.71). So the amplitude's D-dependence
is still not pinned down -- do not claim it. The PHASE is the robust prediction.
REMAINING for a theorem: convergence of the sum over j (which Riesz order), and the Eisenstein/cusp treatment.

## 1k. DECOMPOSITION COMPLETED (12 Sep night) -- what is left is one uniform Bessel estimate
(a) Conventions reconciled: bijection of root sets for odd d coprime to 2D, frequency k <-> m = 2k. Verified.
(b) L^2: Heegner points have Im z <= sqrt|D|/2, so TRUNCATE the seed there -- free, and it makes the automorphised
    seed bounded on the quotient, hence L^2. Vanishing x-mean of the seed (psi has mean 0 over two periods) kills the
    Eisenstein constant terms, so the continuous spectrum is o(sqrt Y) by Riemann-Lebesgue.
(c) Riesz order: |A_j| = t_j^{-1/2+o(1)}; Riesz order m gives t_j^{-m-1}; Weyl law => converges for m >= 1 with
    Iwaniec-Sarnak, m >= 2 trivially. The CESARO mean suffices, matching the numerics.
LAST STEP: (Ksmall) K_{i tau}(x) = (1/2)[Gamma(-i tau)(x/2)^{i tau} + c.c.] + O(x^2) is an asymptotic for FIXED tau;
the constant in O(x^2) depends on tau, and K_{i tau}(x) changes regime at x ~ tau. We apply it at x = sqrt|D| w / t.
Needed: a version uniform in tau with a power saving. This is standard uniform Bessel analysis (uniform asymptotics
for K_{i tau}(x) across the transition, Balogh / Olver type) and it is the only thing between the derivation and the
theorem.

## 1l. THE LAST LEMMA (12 Sep night): uniform in the order, and elementary
K_{i tau}(x) = (1/2)[Gamma(-i tau)(x/2)^{i tau} + Gamma(i tau)(x/2)^{-i tau}] + E,  |E| <= |Gamma(i tau)|(e^{x^2/(4tau)} - 1),
for tau >= 1 and ALL x > 0. From the convergent series K_nu = (pi/2 sin nu pi)(I_{-nu} - I_nu): the n-th term carries
Gamma(1 -+ i tau)/Gamma(n+1 -+ i tau) = 1/((1 -+ i tau)...(n -+ i tau)), each factor of modulus >= tau, so the tail is
at most |Gamma(i tau)| sum_{n>=1}(x^2/4tau)^n/n!. Verified at 30 pairs (tau 2..300, x 0.5..8): holds every time.
Applied with x = c w, c = sqrt|D|/t (same for every k), split at W = sqrt(t_j)/c: relative error t_j^{-3/4}, uniform.
Stationary point of the combined phase at x = sqrt|D| -- fixed, inside the range. Prop. riesz has room to spare.
WHAT IS STILL NOT DONE (and why the paper says "target", not "theorem"): the tail w > W by non-stationary phase; the
summation of errors over k and then j with uniformity tracked; the interchanges. No new idea required -- but it is
not written, and this paper has already had two shortcuts through the literature turn out to be about the wrong
object (F24, F25). Do not upgrade the wording until the bookkeeping exists on paper.
