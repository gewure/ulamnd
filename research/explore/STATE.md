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

## 2. The cubic experiment: full-factorisation object built and validated; Y = 10⁶ done, Y = 10⁷ running

**Script:** research/explore/cubic-full.ts (all divisors: root sieve + BigInt division, cofactor = 1 / prime / semiprime
via Miller–Rabin + Pollard–Brent; E = Π_{p≤Y}(1+ρ(p)/(p²−1)); a quadratic+linear trend in T is fitted and subtracted —
the T² term absorbs the missing tail of E (measured 7.6e−8 ≈ 1/(Y log Y), as expected) and the linear term the constant).
**Validation:** control x²+1 at Y = 10⁶: raw P(T) equals the brute-force Σ_{h≤T}(T−h)(F−EF) at T = 1000, 2000, 5000 to the
precision of EF; rms(P) ∝ T^0.497 (√T as the GL₂ mechanism requires). The 13.78 line is NOT visible in a periodogram at
Y = 10⁶ — but neither is it in paper IV's own object at Y = 10⁶ (checked: piece-divset Y=1e6 → top peak 10.85, R² 0.016);
it needs Y = 10⁷. So the control passes as far as Y = 10⁶ allows.
**Cubic x³ − 2, Y = 10⁶ (171 s; 129k semiprime cofactors):** rms(P) ∝ T^0.16 — NOT √T. The fluctuation of the cubic
level-1 statistic grows much more slowly than the quadratic one over T ∈ [10³, 10⁶]. Periodogram of P/√T (DEG 2–3, taper):
1.60 (R² 0.33, probably residual trend), 3.93 (0.09), 6.93 (0.05), 9.35 (0.02), 14.5 (0.02). Curiosity: 6.93 and 9.35 sit
0.13 and 0.17 above the first SL(3,Z) form's parameters 6.798 and 9.181 — far too weak and too few points to mean anything
yet. The T^0.16 growth is itself the first finding: with the GL₂ mechanism absent, the object may be much smaller (strong
cancellation), or its natural scale is not P/√T. Decide after Y = 10⁷.
**Running (background, started ~night of 14 Sep):** `NODE_OPTIONS=--max-old-space-size=12288 F="1,0,0,-2" Y=10000000
TAG=full-x3m2-1e7 npx tsx research/explore/cubic-full.ts` → log research/explore/logs/full-x3m2-1e7.log, output
piece-full-x3m2-1e7-grid.dat (expected ~30–60 min: ~1.3M semiprimes). Then: growth exponent, periodogram 0.3–40,
scan of P/T^a for a ∈ {0.16, 0.33, 0.5}, and the FKL/Bian parameter convention (below) before any comparison.
**Earlier tonight (superseded, kept for the record):**

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
  RESOLVED: FKL §3.2–3.3: the Γ-factors are Γ_R(s+μ_j), μ_j = iλ_j, λ₁ ≥ λ₂ ≥ 0, λ₃ = −λ₁−λ₂; Farmer's page quotes μ_j/2
  ({6.798, 2.382, −9.181} = half of FKL row 1 {13.5966, 4.7647, −18.3613}). Candidate frequencies in log Y are the |λ_j|:
  form 1: 4.76, 13.60, 18.36; form 2: 2.38, 14.14, 16.52; form 3: 4.19, 15.32, 19.51; form 4: 7.85, 15.74, 23.59;
  form 5: 1.98, 16.05, 18.04; form 6: 0.17, 16.40, 16.57 (or the halves, if the GL₃ analogue of Y^{1/2+it} carries μ/2); and which combination should appear as a frequency in log Y (the torus-orbit
  heuristic suggests the |μ_j| themselves; nothing is derived). Also the expected growth exponent of P for a cubic is
  NOT known (√T for GL₂; for GL₃ maybe different) — scan P/T^a for a ∈ {1/2, 2/3, 1}.
**Honest expectation:** unknown outcome; that is the point. If lines appear at GL(3) parameters it is a new phenomenon;
  if at unexplained frequencies, a puzzle; if none, the quadratic case is special in a way the heuristic does not predict.

## 3. Amplitude law: CONFIRMED across discriminants (D-sweep of Theorem thm:smooth, 14 Sep night)

**Script:** research/explore/smooth-Dsweep.py (generalises smooth-two-lines.py to any D < 0: Per_D = Σ over ALL reduced forms
of discriminant 4D, primitive and imprimitive, of u₁(z_Q)/|Stab|; agrees with the old script at D = −4). Data: smooth grids
`D=<D> U=1 Y=1e7 SMOOTH=1 piece-divset.ts` → piece-DS-all-D-<|D|>-smooth-grid.dat, now for 16 discriminants.
**Result, first line t₁ = 13.7798 (C_obs/C_pred, phase difference in rad; C_pred from LMFDB coefficients and the reduced
forms alone, NO free parameter):**
   D=−3: 1.018 (−0.04) | −4: 0.979 (−0.01) | −7: 1.012 (+0.03) | −8: 1.054 (+0.10) | −11: 1.002 (+0.03) | −15: 0.980 (+0.05) |
   −19: 1.006 (−0.01) | −20: 1.025 (−0.02) | −23: 0.971 (+0.08) | −24: 1.265 (+0.13) | −27: 1.177 (+0.40) | −31: 1.45 (−0.35) |
   −35: 1.22 (−0.09) | −39: 0.68 (−0.26) | −43: 3.7 (−1.2).
   Predicted amplitudes: 0.03–0.06 for |D| ≤ 23, then 0.016 (−24), 0.010 (−27), 0.007 (−31), 0.021 (−35), 0.007 (−39),
   0.0006 (−43); the noise floor of a single line on these grids is ~0.003–0.005. So: ten discriminants with |D| ≤ 23 agree
   within 5% and 0.1 rad (class numbers 2, 3, 4, 6 — the sum over ALL classes with stabiliser weights is right), and the
   decay past the Bessel turning point |D| ≈ 19 follows the prediction down to the noise floor (−43 is below it, as paper
   IV's threshold paragraph says: "gone at 43"). The second line t₂ (predicted 0.0002–0.018) is mostly below noise; where
   predicted ≥ 0.008 (D = −4, −7, −15, −20) the ratios are 0.73, 1.25, 0.73, 1.22.
**Meaning:** the amplitude law of thm:smooth, the one prediction paper IV had confirmed only at D = −4 (and the level-2
object), holds as a function of D including the class-number > 1 cases and the Bessel decay. This is the "amplitude law"
of RESEARCH-USES §2d/§4 item 5(a) — done for the smooth object. NOT a test of the Katok–Sarnak constant (no weight-1/2
coefficients involved); the KS shape (linear, |D|^{−3/4}) is from Sugiyama's announcement, see below.
**For paper IV:** DONE (ERRATA 30): paragraph + Table tab:dsweep in sec:smooth; the
threshold paragraph's prediction ("marginal at 27, reduced ~50× at 43") is now checked: at −27 predicted 0.010 vs observed
0.012; at −43 predicted 0.0006, observed at noise.

### 3b. Katok–Sarnak normalisation: the shape is pinned from the literature

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

## 5. Python package (15 Sep, early hours) — research/python/ulamnd
Written while the cubic run was computing, at the author's request ("most number researchers work with Python").
Modules roots / singular / pieces / spectral / maass; README with examples; tests/test_ulamnd.py (8 tests, all pass:
roots vs brute force; Kronecker and L(1,χ) closed forms; C(t²+1) = 1.3728134628182 to 2e-9 (the Hardy–Littlewood constant,
two routes); S_f two routes; pieces vs brute force at T ≤ 5000 and vs the TS grid at 4096 common points to < 0.05;
13.78 found and the even set ≥ 95th percentile on the TS data; predicted (C, φ) at D = −4 equals paper IV's).
Two lessons recorded: (1) mpmath's dirichlet() at s = 1 is unreliable (known) AND a truncated Dirichlet series for L(2,χ)
at 20000 terms is only good to 1e-9 — which produced a 1.5e-9 error in E and a visible quadratic trend; fixed by the
Hurwitz-zeta formula L(s,χ) = q^{-s} Σ_a χ(a) ζ(s, a/q); found by comparing three routes (product+tail, direct sum to 10⁷
with measured tail κ/N, TS). (2) HAZARD: running piece-divset.ts with a small Y overwrites research/paper-IV/data/
piece-DS-*-D-<D>-grid.dat (no Y in the file name) — I did this twice tonight for D = −4 and regenerated the Y = 10⁷ files
(bit-identical to the committed ones). Do diagnostics with a different D or copy the file first.

## 6. The Hecke mechanism for the u-sum (route 1a), TESTED 15 Sep early: the naive form is REFUTED, the phase law holds, and the
##    amplitude follows the splitting of u in Q(√D)

**Hypothesis tested:** amp_j(u)/amp_j(1) = |λ_j(u)|/√u for the level-1 line t_1 = 13.7798 in piece u (λ_1(2) = 1.549,
λ_1(3) = 0.247, λ_1(5) = 0.737 → predicted 1.095, 0.143, 0.330), phase shift −t_1 log u.
**Data:** sharp Riesz pieces, object 'all', Y = 10⁷, 4096 points, DEG-3 detrend; fit of t_1, t_2 plus nuisance lines (two more
even level-1 lines; Strömberg's Γ₀(9) even set at u = 3; six data-driven peaks in [2,12] at u = 5). Scripts:
research/explore/hecke-amp-test.py (smooth grids), hecke-ratio-sharp.py (sharp grids, the table below). Grids computed
tonight: DS-all-D-<|D|>-U2 for D = −3,−4,−7,−8,−11,−15,−19,−20,−23,−27,−31; U3 for −3,−4,−7,−8,−11,−15,−20; U5 for
−3,−4,−8,−11,−15 (+ u = 1 for all these D). Signed ratio = amp(u)/amp(1) with sign − when the phase is shifted by π
relative to −t_1 log u.
   u = 2:  2 ramified (D = −4, −8, −20):   +0.852, +0.865, +0.899   (phase residuals +0.006, −0.148, −0.087)
           2 split   (D = −7, −15, −23):    −0.353, −0.379, −0.428   (phase ≈ π: 3.11, 3.05, 2.83)
           2 inert   (D = −3, −11, −19):    −0.065, −0.061, −0.071   (phase ≈ π; 3σ-level amplitudes, consistent)
           (D = −27, −31: u=1 amplitude ≤ 0.006, below noise — ignore)
   u = 3:  3 ramified (D = −3, −15):        +0.655, +0.726           (phase residuals +0.21, +0.04)
           3 split   (D = −8, −11, −20):    −0.285, −0.320, −0.332   (phase ≈ π: −2.79, 2.77, 3.11)
           3 inert   (D = −4, −7):          +0.196, +0.341           (phases +0.02, +0.83; noise 0.06–0.09 rms → ~3σ)
   u = 5:  5 ramified (D = −15):            +0.431                   (phase +0.019)
           5 split   (D = −4, −11):         −0.159, −0.114           (phases ±1.6–2.0: unresolved)
           5 inert   (D = −3, −8):          −0.255, +0.439           (inconsistent; noise)
**Conclusions.** (1) The phase law −t_j log u holds wherever the line is measurable (all ramified cases at u = 2, 3, 5
within 0.2 rad). (2) The amplitude ratio is NOT |λ_j(u)|/√u: at u = 2 it is 0.87 / −0.39 / −0.065 for χ_D(2) = 0 / +1 / −1
(predicted 1.095 for all); at u = 3 the ramified ratio is +0.69 where λ_1(3)/√3 = 0.14. The naive Hecke mechanism of
RESEARCH-USES 1a is refuted by the data, as its predecessor (KNOWLEDGE 3b) was; tested before anything was written (F24).
(3) The ramified ratios 0.87, 0.69, 0.43 at u = 2, 3, 5 are consistent with c/(u+1), c ≈ 2.6, independent of λ_1(u);
the split ratios are negative (sign flip) and of size 0.39, 0.31, ~0.13; the inert ones small. (4) A three-parameter
guess r = λ(u²)/u + (1−χ)/(u(u+1)) − χ²λ(u)/√u fits the three u = 2 values (0.867, −0.395, −0.062) and FAILS at u = 3
(predicts −0.23 ramified, observed +0.69); recorded only so nobody refits it.
**What this means for uniformity in u.** The level-1 amplitude at dilation u is the projection of the dilated sub-family
{2u | b} of discriminant-4D Heegner points onto the 3-dimensional oldform space span{u_j(z), u_j(uz), u_j(u²z)} at level
u², with the Fourier-mode selection at a cusp of width u². The Hecke eigenvalue enters only through the Gram matrix of
that space — and paper IV's level-2 test already measured one Gram entry: ⟨u₁(2z), u₁⟩/‖u₁‖² = 0.730, which equals
λ_1(2)√2/(2+1) = 0.7303 exactly (the Iwaniec–Luo–Sarnak formula for prime level). So the amplitude law is a finite,
derivable expression: orbit representatives of the dilated sub-family under Γ⁰(u²) (conjugate to Γ₀(u²)), Maass values
there, the 3×3 Gram matrix in λ_j(u), and the cusp-width Fourier factor. The empirical decay ~2.6/(u+1) of the ramified
ratio, if it is the general size of the restricted geometric factor, is far inside what the u-sum needs (paper IV §7
asks for u^{1/4−ε}). NEXT STEP (theory, a day): derive amp_j(u; D) at level u² by the proof of thm:smooth on the
sub-family, as smooth-level2-test.py did for the level-2 restricted object; predict the 23 signed ratios above with no
free parameter. If they match, the u-dependence of the main spectral terms is understood, and the follow-up paper has
its theorem.

## 7. THE AMPLITUDE OF THE LEVEL-1 LINE AT DILATION u: DERIVED AND CONFIRMED (15 Sep, ~04:00)

**Statement (derived from the proof of thm:smooth; research/explore/hecke-oldform-predict.py, docstring has the derivation).**
The pairs (d, x) with u²x² ≡ D (mod d) are the forms [d, 2ux, ·] of discriminant 4D with 2u | b; the Poisson seed of piece u
at z_Q equals u·Ψ^w_{uY}(z_Q/u), and the points τ = z_Q/u are the Heegner points of the Γ₀(u²)-invariant family
W_u = {forms of disc 4u²D : u² | a, 2u² | b} (all contents), with τ ↦ τ+1 ↔ x ↦ x−d. Hence
   √Y S^w_u(Y) = √u |D|^{−1/4} Σ_v Per_{W_u}(v) L~_v [Γ(−it_v) W_c(3/2+it_v) (π√|D|/(uY))^{it_v} + c.c.],
v over an orthonormal basis of the even cusp forms of Γ₀(u²). For a level-1 form u_j the relevant v span
{u_j(z), u_j(uz), u_j(u²z)}, orthonormalised on Γ₀(u²)\H, with L~(u_j(u^m z)) = u^{−m} L~_j. The signed ratio of the
t_j line, piece u over piece 1, is
   r_j(u; D) = √u · Σ_k Per_{W_u}(v_k) L~(v_k) / (Per_D(u_j) L~_j / ‖u_j‖²_{SL₂(Z)}),   phase shift −t_j log u (+π if r < 0).
**Checks inside the computation:** ‖u₁‖²_{Γ₀(u²)} = index·‖u₁‖²_1 to 4 digits (index 6, 12, 30); ⟨u₁(uz),u₁⟩/‖u₁‖² =
λ₁(u)√u/(u+1) to 4 digits (0.7303, 0.1069, 0.2747) — the Iwaniec–Luo–Sarnak entry, which explains paper IV's measured 0.730.
**Prediction vs observation (sharp grids, hecke-ratio-sharp.py), NO free parameter:**
   u=2 ramified: +0.850 | obs +0.852, +0.865, +0.899 (D=−4,−8,−20)      split: −0.341 | obs −0.353, −0.379, −0.428 (−7,−15,−23)
        inert:    −0.068 | obs −0.065, −0.061, −0.071 (−3,−11,−19)
   u=3 ramified: +0.695 | obs +0.655, +0.726 (−3,−15)                   split: −0.311 | obs −0.285, −0.320, −0.332 (−8,−11,−20)
        inert:    +0.192 | obs +0.196, +0.341 (−4,−7; the second at ~3σ)
   u=5 ramified: +0.421 | obs +0.431 (−15)   split: −0.076 | obs −0.159, −0.114 (−4,−11; predicted below noise)
        inert:    +0.089 | obs −0.255, +0.439 (−3,−8; predicted below noise, observed noise)
Every measurable case (predicted |r| ≥ 0.19, 13 cases) agrees within the noise (typ. ±0.03, worst D=−23 −0.43 vs −0.34
and D=−7 u=3 +0.34 vs +0.19, both with u=1 amplitudes ≈ 0.02 i.e. low signal). The four cases with predicted |r| < 0.1
are consistent with noise. The fitted three-parameter guess of §6 (4) is superseded and was wrong at u = 3 as recorded.
**Structural observations from the numbers (to be proved):** (i) the ratio depends on D only through χ_D(u) (identical to
three decimals for all D of one splitting type — a local identity at u); (ii) Per_{W_u}(u₁(z)) = Per_{W_u}(u₁(u²z)) exactly;
(iii) Per_{W_u}(u₁(uz))/Per_D(u₁) = 2u for ramified u = 3, 5 (6.00, 10.00) and 4.91 at u = 2, D = −4 (4 | D: different local
structure); (iv) the ramified ratios 0.850, 0.695, 0.421 decay like ≈ 2.6/(u+1).
**Meaning.** The "restricted geometric factor" that paper IV §7 names as the one missing ingredient is, for the level-1
lines, an explicit derived expression, tested on 21 (u, D) pairs. The u-dependence of the main spectral terms of piece u
is understood: bounded, decaying like 1/u for ramified u, and given by a 3×3 oldform projection whose only inputs are
λ_j(u), χ_D(u) and the Heegner values. This is the theorem of the follow-up paper (uniformity in u, main-term side).
Still open on the way to the conjecture: (a) the closed form of Per_{W_u}(f_m)/Per_D as a function of (u, χ_D(u), λ_j(u));
(b) the lines of the level-u newforms and of the cycloidal-group forms at dilation u (they dominate pieces 3 and 5; their
amplitudes are the same formula with v running over those forms — needs their coefficients: LMFDB for level u, none for
Γ^u); (c) the ERROR term uniform in u, which no main-term formula addresses (paper IV Remark rem:gaps still applies).
**Paper IV:** §7's sentence "what is missing is precisely one thing: the size, in u, of the restricted geometric factor"
can now cite this; NOT edited (new result, not a correction — author's decision where it goes: paper IV remark or the
follow-up paper).

### 7b. Closed form (odd prime u; discovered from the numbers, verified to 4 digits against the direct computation; TO BE PROVED)
With λ = λ_j(u), s = √u, χ = χ_D(u), index u(u+1), and relative to ‖u_j‖²_{Γ₀(u²)}:
   Gram matrix of (u_j(z), u_j(uz), u_j(u²z)):  G = [[1, g, h], [g, 1, g], [h, g, 1]],  g = λ s/(u+1),  h = (λ² − 1 − 1/u)/(u+1)
      (g is Iwaniec–Luo–Sarnak; h was read off at u = 2, 3, 5: 0.3001, −0.3181, −0.1095 — the same formula each time.)
   Periods over W_u relative to Per_D(u_j):   P = (p0, p1, p0),
      p1 = Per_W(u_j(uz))/Per_D = 2u (u | D),  u − χ (u ∤ D)        [a multiplicity: each class of disc 4D appears 2u or u−χ times]
      p0 = Per_W(u_j(z))/Per_D = Per_W(u_j(u²z))/Per_D = λ s + (u − 1)  (u | D),   λ s − (1 + χ)  (u ∤ D)
   Fourier factors: L = (1, 1/u, 1/u²) times L~_j.
   r_j(u; χ) = √u · Pᵀ (u(u+1) G)^{−1} L        (basis-free form of Σ_k Per(v_k) L~(v_k) over an orthonormal basis).
   Values: u=3: +0.6954 / −0.3105 / +0.1925 (χ = 0 / +1 / −1); u=5: +0.4210 / −0.0763 / +0.0894 — equal to the direct
   computation (+0.695 / −0.311 / +0.192; +0.421 / −0.076 / +0.089). u = 2 is 2-adically different (p1 = 4.912, 0.321, 1.373 for
   D ≡ 0 mod 4 / D ≡ 1 mod 8 / D ≡ 5 mod 8; not integers — the condition "2u | b" at u = 2 reads "4 | b" while b is always even)
   and needs its own local computation; the direct method handles it (0.850 / −0.341 / −0.068, confirmed).
   Proof route for the identities: the Hecke correspondence T_u on Heegner divisors (Gross–Kohnen–Zagier): the u+1 points
   uz_Q, (z_Q + b)/u; the sub-family {2u | b} is where z_Q/u is again integral of level u²; p0 = λ s + (local count) is
   T_u u_j = λ u_j·(normalisation) minus the terms not in the family. A day of algebra; the numbers say what to prove.

## 8. The level-3 newform at dilation 3: predicted and confirmed (15 Sep, ~05:30) — the first line that does not exist at u = 1

Script research/explore/hecke-newform-u3.py: the level-3 newform v with t = 5.0987419 (LMFDB 3.0.1.2.1, even, Fricke +1;
coefficients downloaded to data/maass-3.0.1.2.1-coefficients.txt, format one bracketed list; Atkin–Lehner a(3) = −1/√3 checked),
evaluated anywhere by SL₂(Z)-reduction + coset split + Fricke v(−1/(z+k)) = ε v((z+k)/3); oldspace {v(z), v(3z)} on Γ₀(9)
(Gram: ⟨v(3z),v⟩/⟨v,v⟩ = −1/3 = a(3)√3/3 exactly; ⟨v(3z),v(3z)⟩ = ⟨v,v⟩); periods over the W₃ orbits; formula of §7 with √3.
Predicted amplitude and phase of the 5.0987 line in the smooth piece u = 3 (unrestricted object), NO free parameter, vs fit:
   D=−8  (3 split):    C 0.1404 / 0.1426 (ratio 1.016), Δφ +0.072      D=−11 (split):  0.1371 / 0.1370 (1.000), +0.050
   D=−20 (split):      0.1945 / 0.1931 (0.993), +0.032                D=−3  (3 | D):  0.3200 / 0.3262 (1.020), −0.008
   D=−15 (3 | D):      0.2016 / 0.1946 (0.965), +0.024
   D=−4, −7 (3 inert): predicted 0 (Per_{W₃}(v) = 0 to 1e-17: the newform's period over the family vanishes identically);
                       observed 0.019, 0.006 (noise level on these grids ~0.01–0.02).
So every line of piece u that we can compute is given by the same formula: level-1 oldforms (§7) and level-u newforms (§8),
each with its own Gram matrix; the cycloidal-group forms are the only ones we cannot predict (no coefficients). The phase
formula t log(π√|D|/u) + arg(ΓW_c) holds for both.
**Structural fact:** for inert u the level-u newform's period over W_u vanishes; for split/ramified u it does not — a
"local sign" of the newform lines (to be derived with Lemma B's method; it is the statement that Σ over the family of a
newform is a multiple of its period over the classes of disc 4D lifted to level u, which is empty when u is inert).

### 8b. Multiplicativity in u (conjecture §5 of PROOFS-dilation.md): partially tested at u = 6
Observed signed ratio of the t₁ line, piece 6 over piece 1 (sharp grids, 10 data-driven nuisance lines), vs r(2)·r(3):
   D=−8: −0.449 vs −0.264 | D=−20: −0.320 vs −0.264 | D=−15: −0.295 vs −0.237 | D=−4: +0.111 vs +0.163 | D=−12: +0.549 vs +0.657.
All five signs right (three sign flips predicted and seen); magnitudes within ~0.1 except D=−8 (0.19 off). The u = 6 grids
are noisy (level-36 spectrum dense, rms 0.05–0.10 against amplitudes 0.004–0.016), so this neither confirms nor refutes
exact multiplicativity. The exact theory-side value is being computed directly (9-dim oldspace {u₁(dz): d | 36}, 72 cosets;
research/explore/hecke-oldform-composite.py, log research/explore/logs/composite-u6.log, ~30 min per D).
Also learned: r(2; −12) = +0.945 ≠ 0.850 — the 2-adic constant depends on D/4 mod 4 (D=−12: D/4 ≡ 1), confirming that
u = 2 needs its own local analysis (four 2-adic classes: D ≡ 1, 5 (mod 8); D/4 ≡ 1, 2, 3 (mod 4) …).

### 8c. Multiplicativity settled on the theory side (15 Sep ~06:00)
hecke-oldform-composite.py at level 36 (9-dim oldspace, 72 cosets, ‖f₀‖²/‖u₁‖² = 72.000): r(6;−12) = +0.6573 = 0.945·0.695,
r(6;−8) = −0.2642 = 0.850·(−0.311). The 9×9 Gram matrix is the tensor product of the level-4 and level-9 matrices entry by
entry. So r_j(u;D) = Π_{p|u} r_j(p;D) exactly; the observed u=6 scatter is data noise. Draft paper written:
research/paper-dilation/main.tex (+ STATUS.md, refs.bib), compiled; not for circulation, unread by anyone else.

## 9. THE CUBIC EXPERIMENT AT Y = 10⁷: RESULT (15 Sep, run finished after 12052 s; 1.32 M semiprime cofactors)
Object: full divisor sum along x³ − 2 (all d coprime to 6), Riesz mean of order 1, quadratic+linear trend fitted (E_eff − E =
6.28e−9 = the expected tail 1/(Y log Y) — the sieve and E are right). Grid piece-full-x3m2-1e7-grid.dat.
**Growth:** rms(P) ∝ T^0.25 over [10³, 10⁷] (T^0.37 on the upper half), against T^0.497 for the quadratic control. The
fluctuation of the cubic level-1 statistic is far below the √T of the GL₂ mechanism; rms(P)/√T falls from 0.18 to 0.02.
**Lines:** single-frequency scan (DEG 3, taper): 1.49 (R² 0.40, residual trend), 3.99 (0.09), 6.78 (0.03), 9.38 (0.009), then
< 0.01. The same three weak peaks appeared at Y = 10⁶ (3.93, 6.93, 9.35); on the upper half alone they are gone (12.1, 3.07,
18.1 instead). 6.78 and 9.38 sit near Farmer's μ/2 values 6.798 and 9.181 of the first SL(3,Z) form, 3.99 near nothing.
**Joint-fit tests** (six frequencies vs 200 random six-sets):
      full | FKL lambda (2 forms)   R^2=0.076 pct= 54.0 (random median 0.072, 95th 0.515)
      full | FKL lambda/2           R^2=0.302 pct= 46.5 (random median 0.325, 95th 0.677)
      full | GL2 even level-1       R^2=0.020 pct= 20.5 (random median 0.027, 95th 0.045)
upper half | FKL lambda (2 forms)   R^2=0.363 pct= 42.0 (random median 0.381, 95th 0.518)
upper half | FKL lambda/2           R^2=0.289 pct=  8.5 (random median 0.312, 95th 0.330)
upper half | GL2 even level-1       R^2=0.344 pct= 57.5 (random median 0.330, 95th 0.420)
**Conclusion:** no defensible GL(3) signal at Y = 10⁷. The quadratic mechanism does not transfer naively: the cubic
level-1 statistic grows like T^{1/4}–T^{1/3}, not √T, and shows no stable lines. That is the honest outcome of the
discovery gamble, and it is itself informative: whatever governs the divisor sum of a cubic polynomial, it is not a
√T-oscillation at GL(3) spectral parameters at these heights. Possible readings (not tested): (a) the natural normalisation
for GL(3) is not P/√T (the archimedean parameters enter differently) and the lines are hidden under the trend removal;
(b) the fluctuation is dominated by the near-random d ≤ T part and any spectral term is of lower order; (c) Y = 10⁷ is
too small for a three-parameter spectrum whose first form has |λ| ≈ 13.6, 4.8, 18.4 (the quadratic needed Y = 10⁷ to see
t₁ = 13.8 with R² ≈ 0.15). A second cubic (cyclic, x³−3x−1) and Y = 10⁸ would cost ~40 h CPU in Node; only worth it with a
theoretical prediction of the growth exponent first. PARKED. Paper IV §7 / RESEARCH-USES 6b: record as "tested, negative
at 10⁷".

## 10. Lemmas A and B PROVED (15 Sep, 08:00); adversarial reading of the draft launched
Proofs in PROOFS-dilation.md §1' and in paper-dilation/main.tex (Section 3). Mechanism: the transported group is
G_u = Γ₀(u) ∩ Γ⁰(u); its cosets in SL₂(Z) are ordered pairs of distinct lines in P¹(F_u); the family condition "2u | b" is
B-orthogonality of the two column lines for the bilinear form B of the class; the mass formula turns the weighted orbit
count into a coset count → m = #{orthogonal pairs} = u − χ (B nondegenerate: isotropic lines excluded) or 2u (rank one:
radical line paired with anything). For the period: the Hecke coset of z_Q/u depends only on the first line; summing the
Hecke relation over lines and subtracting the isotropic lines (= the same-discriminant neighbours [𝔭]·C, GKZ) gives
p0 = √u λ − (1+χ), and the rank-one case gives √u λ + (u−1). Hypothesis: u ∤ D, or u ∥ D with u prime to the conductor.
Lemma C (Gram) remains: the general oldform inner-product formula ⟨f|B_{p^a}, f|B_{p^b}⟩/⟨f,f⟩ = p^{−k/2}(λ(p^k) − λ(p^{k−2})/p)/(1+1/p),
k = |a−b|, reproduces both entries (k=1: ILS; k=2: our h) — to be located/derived. A fresh adversarial reader (opus) is
reading the draft now; its findings go into ERRATA before anything else happens to the draft.

## 11. Lemmas C and D proved and checked (15 Sep, 09:20); one correction to the proof text of Lemma B
- Lemma C (Gram): two trace computations (Γ₀(p²) → Γ₀(p) → Γ); ⟨f(p²z), f⟩/⟨f,f⟩ = (λ² − 1 − 1/p)/(p+1) exactly as observed.
  Newform entry ⟨v(pz), v⟩/⟨v,v⟩ = −ε/p from the vanishing trace of a newform plus Fricke. PROOFS-dilation.md §3'.
- Lemma D (newform periods): the value at a family point depends only on the second column line; the u+1 lines give the
  u points (z+k)/u and the Fricke image W_u z, whose sum is √u a_v(u) v + ε v = 0; so the period vanishes for inert u and
  equals −(sum over the isotropic-line neighbours as level-u Heegner points) for split u, (u−1)·(ramified neighbour) for u ∥ D.
  Verified to machine precision at five discriminants. PROOFS §5'.
- Correction: in Lemma B the Hecke coset of z_Q/u is fixed by the SECOND column line (right multiplication by Γ⁰(u)); values
  unchanged by the symmetry of B. The draft (paper-dilation/main.tex) still has "first"; to be fixed together with the
  reader's findings (reading in progress; the draft is not edited while it is read).
Every line of piece u that has a name is now a Heegner-type period: level-1 lines (Lemma B) and level-u newform lines
(Lemma D). Unnamed: the cycloidal-group forms of level u².

## 12. First outside reading of the draft (15 Sep, 10:30): the asymptotic was wrong; draft rewritten
The reviewing conversation found that "λ(u)/u" was not the leading term: evaluating the closed form at u = 1009 gives
r = −3.0e−5 against λ/u = +5e−4. Verified symbolically: inert r = u^{-3/2} exactly (all λ), split r = −u^{-3/2}(1 − 2λ/√u + O(1/u)),
ramified r = u^{-1/2}(1 − λ/√u + (λ²+1)/u + …). Lesson F41: evaluate closed forms at large arguments before stating asymptotics.
The draft (9 pp) now has: Theorem 2 with the correct asymptotics and the exact inert identity; Lemmas A–D proved (A, B with the
ℓ₂ correction; C by traces; D the newform cancellation); tempered abstract (13/21 resolved, one outlier; period vs data for the
inert vanishing); the corollary with Σ u^{-2}. Still open: u | conductor (all of u = 2), composite-u tensor argument in writing,
cycloidal lines, a conceptual proof of the inert identity, and the error term.


## 13. Closing the small gaps (15 Sep, 11:30–): the 2-adic case is closed
- Proposition prop:classwise in the draft (PROOFS §1''): the class-by-class form of Lemmas A and B holds for every prime u
  and every D; at u = 2 the counts are read off (a, b/2, c) mod 2; verified against the direct orbit enumeration for
  twelve (u, D) pairs including 9 | D. Theorem 2 now covers u = 2 and u² | D with the class-by-class P. Draft 10 pp, 0 overfull.
- Script: research/explore/hecke-classwise.py.
- Proposition prop:mult (12:30): multiplicativity in squarefree u PROVED (PROOFS §6'): CRT on lines/cosets, class permutations
  transport the local structure at the other primes, Gram by Rankin–Selberg (tensor of Toeplitz matrices; reproduces Lemma C).
  Conjecture removed from the draft; Corollary extended to squarefree u. Draft 11 pp, 0 overfull.
- Next: paper IV §7 remark pointing to the draft; case-study episode (two readings, same error, F41). Then PLAN-uniformity.md
  and the error term (the hard work).

## 14. The hard work started (15 Sep, 13:00–14:30): PLAN-uniformity.md, two decisive numerical facts
- PLAN-uniformity.md §0 states the target three ways; the first version of (T″) ("S_u(Y) → 0") was WRONG and is corrected:
  the sharp sum has the offset E_u/2 at integers and is O(1) noise; its Cesàro mean is what vanishes.
- N1: Cesàro mean of S_u − E_u/2 over [T/2, T] is ±0.001 at T = 2·10⁵ for u = 1, 7, 101, 10007 (D = −4), scaling T^{-1/2},
  no u-dependence; also D = −7. N2: dilated Hooley sums T^{(u)}_1(x)/√x ≤ 1.33 for u up to 10⁶ at x ≤ 3·10⁵ — square-root
  cancellation uniform in u. Conjecture U recorded. Scripts sharp-sum-u.py, weyl-dilated.py.
- Literature: Hooley x^{3/4}log², Bykovskii/Hejhal x^{2/3+ε}, DFI 1995 Prop 1 (N²/x)^{1/20}(x/N)^{1+ε}gcd(h,N), Ngo 2021
  12/13 (positive disc) — none uniform in the discriminant; Ngo's §3 shows the parametrisation lives on Γ₀(α), α = the
  leading coefficient = u² for us = the level of the dilation draft. Kloosterman moduli ≡ 0 mod u².
- Next: B2 — Hooley's Weil-bound argument for u²X² − D with u explicit (PROOFS-uniform.md), then feed into paper III's
  Hypothesis-W machinery for a partial range of u; the u ≫ √x regime is the new phenomenon to understand.

## 15. Hooley's argument with u tracked (15 Sep, 18:00): the two halves, and where the spectral theory must enter
- PROOFS-uniform.md §4: per G_u-orbit of H^{(u)} the sum is Hooley's class sum for the form Q̃_j = [a_j, u b_j, u² c_j] of
  discriminant 4u²D (reduced representatives allowed; identity b/(2a) = q/p + ((b_j/2)p + c_j r)/(p a) verified). Good half
  (|r′| < |p|, modulus p coprime to u): Weil works up to u ≤ X^{1/4}. Bad half (modulus u r′ ≡ 0 mod u): Weil useless for
  r′ < u², which is all of it once u ≥ X^{1/6}; for u ≤ X^{1/5} the result is T^{(u)}_k(X) ≪ X^{3/4+ε}u^{5/4}k^{1/2} + u^{5}.
- The bad half is precisely the Kloosterman-sum structure (moduli ≡ 0 mod u²) that Ngo/DFI handle spectrally: the level-u²
  spectral theory with the level tracked is the next tool; the elementary range is u ≤ X^{1/5} (→ u ≤ H^{1/6} for Theorem A′).
- Not yet done: the rigorous write-up (3.1), the λ-weight (3.2), and any spectral bound. Numerical truth (N2): no u-dependence.

## 16. End of 15 Sep (21:00): elementary route downgraded, structural route identified
- PROOFS-uniform §5: the Hooley/Weil sketch (§4) over-claimed — reduced representatives bring a phase e(kφ(p,r′)/u²), unreduced
  ones a twist of size ≍ ku²; rigorous elementary range ≈ u ≤ X^{1/8}. No draft states the X^{3/4}u^{5/4} bound.
- PROOFS-uniform §6: piece u = Σ_C Σ_γ w_C(γ) seed(αγ⁻¹z_C) with w_C the indicator of the graph of the orthogonal involution
  σ_C ∈ PGL₂(F_u); its trivial SL₂(F_u)-component is (u−χ)/(u(u+1))·√u·T_u P[Ψ_{uY}] — the Hecke operator on the LEVEL-ONE
  Poincaré series, uniformly O(u^{-1/2+7/64+ε}); Steinberg = level u, principal series = level u². Next: hecke-components.py test.
- Numerical facts N1–N5 in PLAN §4; scripts sharp-sum-u.py, weyl-dilated.py, orbit-minima.py, two-halves.py, weyl-uaverage.py.

## 17. The component test, finished (15 Sep; Opus 5 continuing the session after Fable's usage limit)
- PROOFS-uniform §6′: §6's "trivial component = w̄·√u·T_u(Poincaré)" was wrong (F43). The coset average is U_u, a scalar 1/u on the
  homogeneous seed, so the trivial component is w̄·S^w_1(uY). Decomposition of the orthogonality indicator on the pairs of lines:
  trivial + (u/(u−1))(n(ℓ₁)+n(ℓ₂)) + R, R ⊥ one-line functions (Steinberg occurs three times in Ind_T^G 1; two copies are the
  one-line functions). Level-one and level-u newform values depend on one line ⇒ R has none of those lines; inert u ⇒
  marginal part ≡ 0 ⇒ r = w̄u^{-1/2} = u^{-3/2}: the inert identity explained (closed-form check to 4e−16).
- hecke-components.ts (arithmetic form: u | a ↔ ℓ₁ isotropic, u | n/a ↔ ℓ₂ isotropic; σ₋₁(n), σ₋₁(n/u)) on u = 3 (D = −8, −11, −20,
  −4, −7) and u = 5 (D = −4, −11, −8), Y ≤ 10⁷. Results PROOFS-uniform §6″: level-3 newform entirely in L, cycloidal Γ³ lines
  entirely in R, T carries t₁ at the predicted ratio, u = 5: L = the ε = +1 level-5 newforms, ε = −1 ones absent, R at no
  level-5 newform (2.64–2.71, 5.22–5.28, ≈10.8). Sizes: T 0.007–0.022 ≪ L 0.08–0.17 < R 0.15–0.32.
- Fricke refinement (dilation Lemma newperiod, Theorem 3): Per_{W_u}(v) = 0 for ε = −1, every splitting type; newform-fricke-check.py
  on LMFDB 5.0.1.5.1 (ε = −1): ≤ 1e−9 at five D; 5.0.1.7.1, 5.0.1.3.1 (ε = +1): nonzero split/ramified, Per(v(u·))/Per = +1.
- Data precision (ERRATA 35, F44): float64 means off by 1e−12–4e−11 ⇒ Y^{3/2} drift 0.02–0.16 at Y = 10⁷. Audits: tab:ratios u = 3
  moves ≤ 0.04, tab:newform ≤ 2%, paper IV tab:dsweep ≤ 2.6%. Dilation draft abstract/numerics and paper IV D-sweep paragraph
  updated; all new fits carry the Y^{3/2} column (hecke-components-fit.py v2, drift-audit-run.py).
- New data files: research/explore/data/components-D*-U*-grid.dat; LMFDB coefficients maass-5.0.1.{3,5,7}.1 in paper-IV/data.

## 18. Step 1 of the attack (15 Sep): all pieces measured exactly; a review pass on the draft
- pieces-all-u.ts (D = −3, H = 10⁷, 964,962 pieces, 7 s): no growth of P_u(H/u)/√Y in u (rms 0.09–0.15 in every dyadic bin up to
  u ≈ 4·10⁶); Σ_{u≤H^{2/3}} w·P = −940 (−6e−6 of H log H); total with the u > H tail reproduces c_off = −0.049928 to 7e−4. PLAN §10.
- Literature (general-purpose agent, report research/LITERATURE-uniformity.md): nothing uniform in a leading coefficient of size u²;
  Grimmelt–Merikoski 2505.00493 is the closest (our family on Γ₀(ad), a ≤ X^{o(1)}); being verified.
- Review pass on the dilation draft (ERRATA 36, F45): multiplicativity generalised to all squarefree u (exceptional primes kept
  together), corollary covers all squarefree u, precision claims replaced by measured errors (ratio-noise-audit.py,
  ratio-halves-audit.py: 0.01–0.7; D = −7 at 0.4 of an error), caption and provenance fixed.
- Narrow window (PROOFS-uniform §7, PLAN §11): moduli above Y^{1+η} contribute Y^{1−η+o(1)} to every piece, uniformly in u (divisor bound);
  numerically the oscillation lives in moduli Y … 16Y. Cesàro conjecture ⇐ Hypothesis W with θ + 2B < 1 (paper III had θ + 6B < 1). The core
  is one Type I estimate for u²ℓ² + |D| ≡ 0 (mod k), k ≍ Y, uniform in u ≤ Y² (Grimmelt–Merikoski Thm 1.4 with a = u²). window-truncation.ts.
- CANDIDATE THEOREM (PROOFS-uniform §8, PLAN §12): Hypothesis (E) in Cesàro form unconditionally for monic irreducible quadratics,
  Off*_f(H) ≪ H(log H)^{1−c} log log H, hence the leading term −½C(f) log H of Conjecture 1 in Cesàro form. Two independent adversarial
  readings (model instances) passed with small repairs; ERRATA 37 (paper III Remark KSwconst count). Papers not yet edited.

## 19. Power ranges (15 Sep, late): large end to H^{1/2}, middle identified
- Paper III Theorem E written in (reading of the text passed with fixes; ERRATA 38–39, F46–F47; date labels corrected to 15 Sep).
- PROOFS-uniform §9 (derivation, reading launched): Σ_{u>H^{1/2+ε}} w P_u(H/u) = c_off H + O(H^{1−δ}) by dispersion over u + Weil (paper III: 2/3).
  dispersion-test.ts: the dispersion square is its diagonal (ratio ≈ 0.9) for u from K/8 to 32K.
- PLAN §13: small end rigorous only for u = 1; middle candidates M1 (BFI/DI averaging of the Kloosterman sums with Heegner-pair numerators,
  well-factorable λ), M2 (q-van der Corput / two small factors), M3 (Grimmelt–Merikoski averaged over levels u², target u ≲ H^{1/3}).

## 20. Second reading of the large-u proof passed; publication structure decided (15 Sep, late)
- PROOFS-uniform §9 (u > H^{1/2+ε}): second independent reading "sound"; its new points (w irrelevant to the G° part, explicit sizes of the
  degenerate / d₁|d₂ / h = 0 terms, dispersion alone reaches almost to u ≈ H) recorded; §10's "m = 0 gives only the diagonal" was false
  (T₀(5,65) = 10 for D = −4) and is corrected — the extra terms are of diagonal size, §9 unaffected.
- Structure (user, 15 Sep): paper III takes Theorem E + the large-u range and is then frozen; dilation draft stays spectral; the middle → paper V.
- Next: write the large-u theorem into paper III (Theorem typeII extended, Theorem A per PROOFS §11 after its reading), compile, paper-text reading.

## 21. Paper III large-u text read; middle mapped; literature round 3 (15 Sep, night)
- Paper-text reading of the large-u extension: "sound, with minor fixes" (10 findings, all applied; verification of the fixes and of one
  new claim — the Step 5 threshold is not a limit of the method, since Ḡ contributes ≪ (H/u)^{ε′} per piece — running).
- PROOFS-uniform §12: Weil + Type I/II decomposition of w = 1*χ*γ in u covers (H^{1/3}, H^{1/2}] except balanced products u = n₁n₂;
  with factorable moduli (q-van der Corput) a ≥ 2/5 except non-factorable moduli. Heuristic, not read.
- LITERATURE-uniformity round 3: Grimmelt–Merikoski 2505.00493 — our piece u is their Type I sum with a = u² (D < 0); they need a ≺≺ 1.
  PROOFS-uniform §13: heuristic a-tracking gives u < H^{1/4} per piece, u < H^{1/3} averaged over u. Shared thresholds at H^{1/3} and H^{1/2}.
- Path A tested (PROOFS §14, gm-kernel-count.ts): at level u² the Grimmelt–Merikoski kernel has diagonal ≍ u and off-diagonal O(Z₂) uniformly
  in u (h = 1 to T = 256, and h = 3); reason: distances inside the family are quantised with spacing 1/(4h), independent of a = u². Exponent
  count: small end u < H^{1/3−ε} for D < 0, for every θ < 1, pending (a) the orbit count, (b) the neighbour count written out, (c) the weights.

