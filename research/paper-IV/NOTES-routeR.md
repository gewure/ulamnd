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

The pattern of presence/absence is exactly the size of the Katok–Sarnak periods (§3): for D < 0 the amplitude is
governed by the value of the Maass form at the Heegner point z_D (Im z_D = √|D|/2: 0.87 for D=−3, 1 for D=−4, 1.41 for
D=−8, 6.4 for D=−163, and Maass forms decay like e^{−2πy}), for D > 0 by the integral over the closed geodesic, which
is not exponentially small (short geodesics for D = 5, 8, 12). Odd forms vanish at i and ρ, cancel over conjugate pairs of
Heegner points, and integrate to zero over reflection-symmetric geodesics — hence "even only".

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
