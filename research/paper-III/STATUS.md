# Paper III — status (11 September 2026)

**Complete draft (22 pp).** The rigorous pass of 11 Sep is finished; every theorem in the paper has a full proof, and
the one open problem (the window) is stated exactly, with the strength any Weyl-sum input must have (5θ+6B < 3).

Proved: exact decomposition into pieces (Prop. 2.1); weighted Kowalski–Soundararajan (Prop. 3.x with the Rankin
lemma); small moduli of every piece ≪ Y (log Y)^{-c}; far moduli d' > u²YL ≪ Y/(u²L); Type II range u > H^{2/3+ε}
with main term c_off(f) H (explicit constant; Lemma Gbar); Corollary: mean of sharp Off_f = c_off + (1 − D_f(1))/2,
confirmed to 3 digits for t²+1, t²+t+41, t²+t+17, 2t²+1 (scripts/offstar-mean.ts, scripts/off-general.ts, data/);
finite Fourier expansion of the window; Theorem A′ (unconditional reduction); Theorem A (under W with exponent
conditions); function field Theorem B (N ≤ 2, D = u).

Open (→ paper IV): the window W_u(Y; log H) for 1 < u ≤ H^{2/3}. Conjecture c_N(D) over F_q[u] (N = 3 test).

Reproduce: `npx tsx research/paper-III/scripts/offstar-mean.ts 10000000` (t²+1),
`Q=1,1,41 H=10000000 npx tsx research/paper-III/scripts/off-general.ts`, `python research/paper-III/scripts/coff.py`,
`npx tsx research/paper-III/scripts/offq.ts` (F_q[u]); compile with `tectonic main.tex`.
