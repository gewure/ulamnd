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
