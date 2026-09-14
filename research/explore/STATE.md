# Exploration of 14 September 2026 (night): three follow-ups of paper IV — state for pick-up

Author's decision (14 Sep): do all three of (1) the cubic experiment, (2) the u = 3 anomaly, (3) the amplitude law /
Katok–Sarnak normalisation. Work stopped at the author's request after a first significant part; nothing here is in a
paper. Every number below is reproducible with the commands given. Read this file first when resuming.

## 1. The u = 3 anomaly: RESOLVED — the unidentified line 3.5 is Strömberg's Γ₀(9) eigenvalue 3.5360 (a Γ³-type form)

**Literature (verified, PDFs in the session scratchpad; cite from the arXiv abstracts):** F. Strömberg, "Newforms and
spectral multiplicities for Γ₀(9)", Proc. LMS 2012, arXiv 1106.5741. Theorem: Γ₀(9) has NO genuinely new eigenvalues;
its spectrum = oldforms + twists of level-1 forms + twists of Γ₀(3) forms + forms coming from the cycloidal group Γ³
(index 3), the latter with multiplicity two and BOTH parities. Table 1 (R < 10, columns odd | even, "new on"):
  3.5360020929376 Γ³ (both parities) | 4.3880535632221 Γ₀(3) odd only | 5.0987419087295 Γ₀(3) even only |
  5.5040566796766 Γ³ (both) | 6.1205755330872 Γ₀(3) odd | 6.6465813556094 Γ³ (both) | 6.7574152777543 Γ₀(3) odd |
  7.4317991717218 Γ³ (both) | 7.7581331950210 Γ₀(3) odd | 8.038861203863 Γ₀(3) even | 8.193035931685 Γ₀(3) odd |
  8.698342956468 Γ³ (both) | 8.7782823935563 Γ₀(3) even | 9.0800693497016 Γ³ (both) | 9.2923793282248 Γ₀(3) odd |
  9.5336952613536 Γ₀(1) odd | 9.74374939916 Γ₀(3) even.
LMFDB level-3 parities checked directly: 3.0.1.1.1 (4.388) odd, 3.0.1.2.1 (5.0987) even, 3.0.1.3.1 (6.1206) odd.

**Prediction of paper IV §7 (level u² = 9 for u = 3, even forms only):** lines at 3.536, 5.099, 5.504, 6.647, 7.432,
8.039, 8.698, 8.778, 9.080, 9.744; NO lines at 4.388, 6.121, 6.757, 7.758, 8.193, 9.292, 9.534.

**Data (new tonight):** smooth-window pieces u = 3 for D = −8, −11, −20 to Y = 10⁷:
  `D=-8 U=3 Y=10000000 SMOOTH=1 npx tsx research/paper-IV/scripts/piece-divset.ts` (24 s each) →
  research/paper-IV/data/piece-DS-{all,coprime,excluded}-D-{8,11,20}-U3-smooth-grid.dat.
  Periodograms: `DEG=2 npx tsx research/paper-IV/scripts/piece-periodogram.ts DS-all-D-8-U3-smooth 2 10 0.005`.
  Top peaks (frequency, R²):
    all D=−8:      3.525 .29 | 6.685 .11 | 8.670 .08 | 7.555 .06 | 5.955 .02 | 9.515 .02 | 4.325 .02
    coprime D=−8:  7.505 .20 | 3.555 .16 | 6.585 .11 | 9.485 .08 | 5.960 .04 | 4.310 .02
    all D=−11:     6.675 .31 | 3.480 .22 | 5.180 .20 | 8.505 .06 | 7.665 .03 | 4.315 .004
    coprime D=−11: 6.775 .21 | 5.180 .18 | 3.535 .18 | 9.280 .05 | 7.765 .05
    all D=−20:     6.665 .48 | 5.075 .27 | 7.640 .05 | 4.145 .02 | 3.520 .01
    coprime D=−20: 6.645 .48 | 5.540 .18 | 7.630 .06 | 3.495 .03 | 4.240 .01
  Sharp (Riesz) pieces, DEG=3 TAPER=1, range 2–9: all D=−8: 3.535 (.34), 5.135 (.10); coprime D=−8: 3.615 (.20);
  coprime D=−11: 3.640 (.27).
**Reading:** present across discriminants: 3.48–3.56 (=3.536 Γ³), 5.08–5.18 (=5.099 level 3 even), 6.59–6.78 (=6.647 Γ³),
  8.5–8.7 (=8.698 Γ³), 5.54 (=5.504 Γ³, D=−20 coprime), 7.5–7.67 (≈7.432 Γ³, offset +0.1–0.2, less clean). Odd-only
  eigenvalues 4.388, 6.121, 6.757 appear only weakly (R² ≤ .02) — as predicted. Unresolved: 9.28–9.52 (near the odd
  level-1 form 9.534, which should be absent; the smooth grid is coarse there), 5.96 (D=−8; between 5.504 and 6.121).
**Joint-fit test (done, freq-set-test.ts, Gram–Schmidt, 300 random six-sets in [3, 9.5]):**
  sharp grids DEG=3: all D=−8 R²(even)=0.82 [100th pct] R²(odd)=0.08 [3rd]; coprime D=−8 0.60 [95th] / 0.12 [5th];
  all D=−11 0.81 [100th] / 0.14 [2nd]; coprime D=−11 0.63 [100th] / 0.11 [1st]. Smooth grids (401 pts, DEG=2): even set
  at 99.7–100th percentile for all six; odd set 5th–53rd. Paper IV footnote updated with this (ERRATA 29).
**Status:** the level-u² picture is confirmed on a NON-squarefree level, where the LMFDB has no data, by a published
  spectrum. This is item 3 of RESEARCH-USES §4 ("the slow component at u ≥ 3") closed in the affirmative. Not yet done:
  a joint-fit test (the six predicted even frequencies vs 300 random six-sets vs the odd-only set), as in paper IV's
  Table tab:fits — write a generic `freq-set-test.ts` (tag, set A, set B). A phase/amplitude test is impossible without
  the Γ³-form coefficients (not in the LMFDB; Strömberg may have them).
**u = 5 (level 25):** the piece D=−4 U=5 has its strongest line at 2.625 (R² .25, DEG=3). Strömberg §8 conjectures no
  genuinely new forms on Γ₀(25) and says forms of the cycloidal group Γ⁵ (index 5) appear with multiplicity two.
  PREDICTION: 2.625 is the first eigenvalue of Γ⁵. Not verified: the Γ⁵ spectrum was not found online (search done);
  ask Strömberg/Farmer–Lemurell or compute with Hejhal's algorithm.
**For paper IV:** §7 / Remark on u > 1 should cite Strömberg 2012 and state the identification; the footnote that called
  the u = 3, 5 tests inconclusive is now superseded for u = 3. NOT yet edited (author's decision on when).

## 2. The cubic experiment: infrastructure built, object design corrected twice, BLOCKED on full factorisation

**Script:** research/explore/cubic-piece.ts (roots of f mod p by gcd(x^p − x, f) + Cantor–Zassenhaus, Hensel to p^k,
  CRT to all d ≤ Y, CSR storage; 2e6 in 7 s). Control f = x²+1 and target f = x³ − 2; grids written to
  research/paper-IV/data/piece-cubic-{ctrl-x2p1,x3m2}-grid.dat and the linear-detrended -lin- versions.
**What was learned (three versions in one evening):**
  (a) fixed divisor cutoff d ≤ Y with E_Y: a T³/Y trend swamps everything (P/√T = 80 at T = Y);
  (b) moving cutoff d ≤ T with E_Y: T²/Y trend; with E_T = Σ_{d≤T} ρ/d² the trend is linear in T and removable
      (control: rms P/√T = 0.018 after the linear fit) — BUT the control shows NO 13.78 line (top peaks 21.5, 10.9, 8.9
      at R² ≤ 0.07). Diagnosis: the oscillation lives in moduli d > T with a root x̄ ≤ T — the Hooley/DFI range of
      "roots of congruences in short intervals" — which the cutoff d ≤ T removes exactly. The all-divisor object of
      paper IV includes d up to f(h) ~ Y² for quadratics; for a cubic it needs d up to ~Y³, i.e. the FULL factorisation
      of f(h) for h ≤ Y.
  (c) The sharp (order-0) sum A(T) has no √T oscillation (spectral terms are T^{−1/2+it}); only the Riesz mean P
      shows the lines. Column A is useless for this purpose.
**Next step (substantial, not started):** full factorisation of h³ − 2 for h ≤ 10⁶ (values ≤ 10¹⁸): root sieve over
  p ≤ 10⁶ (exists), then cofactor c: c = 1, or prime (c < 10¹² ⇒ prime), or p₁p₂ with p₁, p₂ > 10⁶ (Miller–Rabin, then
  Pollard–Brent rho; ~5·10⁵ such numbers — do it in C with __int128, or in TS with care; ~40 min in Node BigInt).
  Then c(h) = Π_{p^k ∥ f(h), p ∤ 6} (1 + 1/p + … + 1/p^k), P(T) = Σ_{h≤T}(T − h)(c(h) − E), E = Π_p (1 + ρ(p)/(p(p−1)))
  -type Euler product computed to high precision (two routes, F9), linear term fitted, then the periodogram in 1–30.
  Run the control x²+1 the same way first; it must show 13.78 and 17.74 as in paper IV.
**Target frequencies (GL(3)):** the "first" SL(3,Z) Maass form has L-function parameters {6.79829, 2.38234, −9.18063}
  (Farmer's page aimath.org/~farmer/symsquare, found by Bian and Booker). Farmer–Koutsoliotas–Lemurell, IMRN 2014,
  arXiv 1212.4545, Table 3.1 lists 15 forms as (λ₁, λ₂): (13.59658451, 4.76468206), (14.14163558, 2.38038848),
  (15.31863407, 4.19173391), (15.74069912, 7.85232504), (16.05436164, 1.98365457), (16.40312474, 0.17112189), … .
  UNRESOLVED: the map between FKL's (λ₁, λ₂) and the three L-parameters (their λ-convention is defined in §3.2 of the
  paper — read it before comparing); and which combination should appear as a frequency in log Y (the torus-orbit
  heuristic suggests the |μ_j| themselves; nothing is derived). Also the expected growth exponent of P for a cubic is
  NOT known (√T for GL₂; for GL₃ maybe different) — scan P/T^a for a ∈ {1/2, 2/3, 1}.
**Honest expectation:** unknown outcome; that is the point. If lines appear at GL(3) parameters it is a new phenomenon;
  if at unexplained frequencies, a puzzle; if none, the quadratic case is special in a way the heuristic does not predict.

## 3. Amplitude law / Katok–Sarnak normalisation: the shape is pinned from the literature; the D-sweep test not run

**Found (arXiv 2110.02847, K. Sugiyama, announcement of a Shintani–Katok–Sarnak correspondence for level N; details
  "to appear elsewhere"):** Theorem 1: for Φ a weight-0 Maass cusp form on Γ₀(N) with eigenvalue λ(1−λ), there is a
  weight-1/2 form F on Γ₀(4N) with Fourier coefficients (Whittaker normalisation (1.2))
     c(−n) = n^{−3/4} Σ_{v ∈ Γ₀(N)\L_N, d_N(v) = −n} χ(v₁) Φ(z_v) / ε(v),      ε(v) = |Stab(v)|,
  i.e. LINEAR in the values at the Heegner points, with the D-dependence |D|^{−3/4} and no dependence on λ in that
  factor (the positive-index coefficients are cycle integrals). This is the level-N version of Katok–Sarnak 1993
  (Israel J. Math. 84) and confirms paper IV's footnote (linear, not squared). To cite: Katok–Sarnak for N = 1 (the
  original; not open access — pin the constant from the paper itself before publication), Sugiyama for level N.
  For paper IV eq:ks: κ(t_j, D) ∝ |D|^{−3/4} up to a t-independent constant in this normalisation. NOT yet edited.
**The D-sweep test of Theorem thm:smooth (planned, not started):** generalise smooth-two-lines.py to arbitrary D:
  Per_D(u₁) = Σ over ALL forms [a,b,c] of discriminant 4D (primitive and imprimitive; reduced representatives, weights
  1/|Stab|) of u₁(z_Q); predicted C_pred(D) = 2|D|^{−1/4}|Per L~||Γ(−it)W_c(3/2+it)|/‖u‖²; observed from the smooth
  grids `D=<D> U=1 SMOOTH=1 piece-divset.ts` for D ∈ {−3,−4,−7,−8,−11,−15,−19,−20,−23,−24,−27,−43}. This tests the
  amplitude law (the one prediction of paper IV not confirmed beyond D = −4) including the Bessel turning point near
  |D| = 19.2 and the sign change of K_{it₁}(π√|D|) between |D| = 3 and 4 (paper IV, threshold paragraph).
  Existing: D = −4 (ratio 0.99, phase 0.010 rad), level-2 restricted object (ERRATA 23).

## 4. Housekeeping done tonight
- piece-periodogram.ts: env COL selects the column to scan (default 3).
- research/explore/ is the place for this exploration; data in research/paper-IV/data/ with tags DS-*-U3-smooth and cubic-*.
- RESEARCH-USES §6 (14 Sep) has the ranked list of follow-up paths this work belongs to (6b hierarchy; §4 item 3).
