# Paper IV — the second spectrum (status page, 13 September 2026)

`main.tex` (21 pp): the Cesàro pieces of part III oscillate at the even Maass parameters of SL₂(Z), with amplitudes the
Katok–Sarnak periods at the discriminant of the polynomial; a spectral argument for u = 1 on a model object; the
uniformity in u as the open problem; the numerical evidence, including the parameter-free phase test.

**Status.** The u = 1 theorem (labels `thm:main`, `thm:K`) is **not established as stated**: the proof passes from the
restricted divisor sum, whose moduli satisfy (d, 2D) = 1, to complete SL₂(Z)-orbits of Heegner points, and the
restriction is not orbit-invariant (external assessment of 12 September 2026, Finding 3; `research/ERRATA.md` item 13;
correction notice after the abstract and Remark `rem:coprime` in the paper). Two repairs are described there — drop the
condition (theorem for the unrestricted sum, a finite union of orbits) or keep it (Γ₀(e)-orbits, e | rad 2D, level-e
spectral theory) — and neither is carried out. The numerical sections are unaffected. `research/KNOWLEDGE.md` 0b–0c
has the plan.

| file | what |
|---|---|
| `main.tex`, `refs.bib` | the paper; `tectonic main.tex` |
| `NOTES-routeR.md` | working notes of the route that became the paper (12 Sep) |
| `BRAINSTORM.md`, `LITERATURE.md` | the eleven routes rated, and the verified references (11 Sep; historical) |
| `scripts/piece-general.ts` | pieces P_u(Y) for any quadratic and u (`ALLDIV=1 NOLAMBDA=1` gives the model object); log grid to `data/` |
| `scripts/piece-maass.ts <tag>` | regression of P/√Y on the even, the odd and random frequency sets |
| `scripts/piece-divset.ts` | (13 Sep) the model object for the coprime / all / excluded divisor sets — the test behind Remark `rem:coprime` |
| `scripts/piece-periodogram.ts <tag>` | (13 Sep) single-frequency R² scan of a grid file |
| `scripts/piece-freq.ts`, `piece-spectrum.ts`, `piece-stability.ts`, `piece.ts`, `window.ts`, `weyl-partial.ts` | frequency scans, spectral tests, stability across halves, the u = 1 piece, the window, Hooley's partial sums |
| `scripts/ef.py`, `ef-general.py D u` | the mean value E F to 22 digits (an error δ enters as δY²/2) |
| `scripts/maass-period.py`, `phase-test.py` | Katok–Sarnak periods from LMFDB coefficients; the phase test |
| `data/` | every grid and log behind the tables |

Run everything from the repository root, e.g. `Q=1,0,1 U=1 Y=10000000 npx tsx research/paper-IV/scripts/piece-general.ts`
or `D=-4 Y=10000000 npx tsx research/paper-IV/scripts/piece-divset.ts`. Python scripts need mpmath and numpy
(`python -m venv .venv && .venv/bin/pip install mpmath numpy`).
