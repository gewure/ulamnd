# Paper III — status (13 September 2026)

**Complete draft (22 pp).** The rigorous pass of 11 Sep is finished; every theorem in the paper has a full proof, and
the one open problem (the window) is stated exactly, with the strength any Weyl-sum input must have (θ+6B < 1: any power saving in the modulus, loss below (uk)^{(1−θ)/6}).

Proved: exact decomposition into pieces (Prop. 2.1); weighted Kowalski–Soundararajan (Prop. 3.x with the Rankin
lemma); small moduli of every piece ≪ Y (log Y)^{-c}; far moduli d' > u²YL ≪ Y/(u²L); Type II range u > H^{2/3+ε}
with main term c_off(f) H (explicit constant; Lemma Gbar); Corollary: mean of sharp Off_f = c_off + (1 − D_f(1))/2,
confirmed to 3 digits for t²+1, t²+t+41, t²+t+17, 2t²+1 (scripts/offstar-mean.ts, scripts/off-general.ts, data/);
finite Fourier expansion of the window; Theorem A′ (unconditional reduction); Theorem A (under W with θ+6B < 1); function field Theorem B (N ≤ 2, D = u).

Open (→ paper IV): the window W_u(Y; log H) for 1 < u ≤ H^{2/3}. Conjecture c_N(D) over F_q[u] (N = 3 test).

Reproduce: `npx tsx research/paper-III/scripts/offstar-mean.ts 10000000` (t²+1),
`Q=1,1,41 H=10000000 npx tsx research/paper-III/scripts/off-general.ts`, `python research/paper-III/scripts/coff.py`,
`npx tsx research/paper-III/scripts/offq.ts` (F_q[u]); compile with `tectonic main.tex`.

13 Sep 2026: the external assessment (research/reviews/) had no finding on paper III. One sentence changed: the
remark pointing at part IV's u = 1 result now says it is a spectral argument with a known gap, not a theorem
(research/ERRATA.md item 13). 24 pp.

13 Sep 2026 (evening): read adversarially by a fresh reader (research/ERRATA.md item 18). Core sound: decomposition,
dilation-average lemma (verified for six moduli), c_off (table to six digits), exponent condition θ+6B<1 (recomputed).
Seven findings, all fixed: Theorem u1's exponent 12/13 → 1−1/16 (the K-balance had not been optimised); the window
proposition invoked outside its hypothesis (harmless for u = 1, now argued); the finite Fourier lemma used at
non-integer Y (correction term added); d' > 1 in the definition of a piece; the sign argument for c_off; two exponents
in Theorem A's window display; (log log u)^3 → ^4 in three places. 26 pp.

13 Sep (night): related-work paragraph; date updated; 27 pp.

## 16 September 2026 (late): Hypothesis (E) in Cesàro form PROVED (Theorem thm:E, §sec:closed)
- Lemma lem:tail (moduli above Y(log Y)^13 negligible uniformly in u ≤ Y³, via Henriot's uniform Nair–Tenenbaum bound, erratum a*D*),
  Proposition prop:narrow (the window up to Y(log Y)^13 by Koksma + Proposition KSw), Theorem thm:E: Off*_f(H) ≪ H(log H)^{1−c} log log H,
  hence Conjecture 1 of part I in Cesàro form with its leading term, unconditionally for monic irreducible quadratics.
- Argument checked by two adversarial readings (fresh model instances; research/explore/PROOFS-uniform.md §8); a third reading of the
  paper text is running. No human check. The constant A_f remains conditional (Theorem A).
- Rewritten: abstract, results list, Koksma paragraph, closing paragraph of §6, "What remains" item 1, Remark rem:exponents, Remark
  rem:KSwconst's count (ERRATA 37). The claim "a logarithmic saving is not enough" is withdrawn (ERRATA 38, KNOWLEDGE F46). 30 pp.
