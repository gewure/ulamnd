# Paper IV — the second spectrum (status page, 13 September 2026)

`main.tex` (21 pp): the Cesàro pieces of part III oscillate at the even Maass parameters of SL₂(Z), with amplitudes the
Katok–Sarnak periods at the discriminant of the polynomial; a spectral argument for u = 1 on a model object; the
uniformity in u as the open problem; the numerical evidence, including the parameter-free phase test.

**Status.** The u = 1 theorem (labels `thm:main`, `thm:K`) had a proof gap in its first version: the proof passed from
the restricted divisor sum, whose moduli satisfy (d, 2D) = 1, to complete SL₂(Z)-orbits of Heegner points, and the
restriction is not orbit-invariant (external assessment of 12 September 2026, Finding 3). It was **repaired on 13
September** by Möbius inversion of the condition into sub-families {e | d}, which are finite unions of Γ₀(e)-orbits,
and by running the argument at the levels e | rad(2D) (Lemma `lem:subfamily`, Steps 1–3 of Section 5; the
parametrisation is now by forms of discriminant 4D). The repaired theorem predicts even Maass newforms of level e in
the spectrum of the model object and none in the unrestricted sum; this was checked numerically before the rewrite
(`scripts/piece-divset.ts`, `piece-level2.ts`; for D = −3 the largest line is the first even level-3 newform). The
correction notice after the abstract and Remark `rem:coprime` record the error; `research/ERRATA.md` item 13 lists
every change. Not yet read by anyone outside. 23 pp.

| file | what |
|---|---|
| `main.tex`, `refs.bib` | the paper; `tectonic main.tex` |
| `NOTES-routeR.md` | working notes of the route that became the paper (12 Sep) |
| `BRAINSTORM.md`, `LITERATURE.md` | the eleven routes rated, and the verified references (11 Sep; historical) |
| `scripts/piece-general.ts` | pieces P_u(Y) for any quadratic and u (`ALLDIV=1 NOLAMBDA=1` gives the model object); log grid to `data/` |
| `scripts/piece-maass.ts <tag>` | regression of P/√Y on the even, the odd and random frequency sets |
| `scripts/piece-divset.ts` | (13 Sep) the model object for the coprime / all / excluded divisor sets — the test behind Remark `rem:coprime` |
| `scripts/piece-periodogram.ts <tag>` | (13 Sep) single-frequency R² scan of a grid file |
| `LEVEL=2\|3 scripts/piece-level2.ts <tag>` | (13 Sep) residual after the level-1 even fit, regressed on the level-e even/odd newforms (LMFDB parameters) vs random sets |
| `scripts/piece-freq.ts`, `piece-spectrum.ts`, `piece-stability.ts`, `piece.ts`, `window.ts`, `weyl-partial.ts` | frequency scans, spectral tests, stability across halves, the u = 1 piece, the window, Hooley's partial sums |
| `scripts/ef.py`, `ef-general.py D u` | the mean value E F to 22 digits (an error δ enters as δY²/2) |
| `scripts/maass-period.py`, `phase-test.py` | Katok–Sarnak periods from LMFDB coefficients; the phase test |
| `data/` | every grid and log behind the tables |

Run everything from the repository root, e.g. `Q=1,0,1 U=1 Y=10000000 npx tsx research/paper-IV/scripts/piece-general.ts`
or `D=-4 Y=10000000 npx tsx research/paper-IV/scripts/piece-divset.ts`. Python scripts need mpmath and numpy
(`python -m venv .venv && .venv/bin/pip install mpmath numpy`).
