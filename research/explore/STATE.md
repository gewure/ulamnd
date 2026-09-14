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

