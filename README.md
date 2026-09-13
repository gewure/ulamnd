# ulamnd — the second-moment programme for prime values of polynomials

A research repository. It began on 8 September 2026 as a web workbench for looking at n-dimensional Ulam spirals; the
spiral hypotheses were refuted on the first day (`research/experiments/CONCLUSIONS.md`), and what survived is a
programme in analytic number theory about the pair singular series S_f(h) of an irreducible polynomial f and the
second-order term of its mean. It is written up in four papers, every number of which is generated from code in this
repository.

## Where to start
1. `research/KNOWLEDGE.md` — section 0b: the state, the ordered next steps and the do-not-claim list; section 0c: the
   external assessment of 12 September 2026 and what it found; section 3: our own errors, F1–F29, each with the rule
   that follows from it.
2. `research/ERRATA.md` — every correction to the papers, by date and cause, including the three findings of the
   external assessment (items 11–13) and one of our own found while applying them (item 14).
3. The papers, in order.

## The papers (`research/paper-*/main.tex`; `tectonic main.tex` compiles each)
| | content | status (13 September 2026) |
|---|---|---|
| I | The pair singular series, its Dedekind zeta function and the variance of prime values: exact identity, diagonal Dirichlet series ζ_K(s+1)E_f(s), closed formula for quadratics, Cesàro theorem for linear f, Conjecture 1 (first power of C(f), Cesàro form), exact test on 25 quadratics | v9, 28 pp. Corrected 13 Sep: the sharp-sum claims were false and are gone. Preprint ready; awaiting an arXiv endorser |
| II | Zeros of Dedekind zeta functions in the second moment: E_f as an infinite product of Artin L-functions of the plethystic exponents Ψ_N, natural boundary, RH-conditional explicit formula, Ω-theorem, every coefficient for t²+1 | 22 pp. Corrected 13 Sep: the general-f theorem now has the log-polynomial at s = −2/3 |
| III | The off-diagonal in Cesàro form: decomposition into pieces, unconditional small and far moduli, the main term c_off(f)·H, the window as the single open input, a function-field theorem | 24 pp, complete draft |
| IV | The second spectrum: the pieces oscillate at the even Maass parameters of SL₂(Z) with Katok–Sarnak amplitudes; a spectral argument for u = 1; uniformity in u as the open problem | 21 pp. **The u = 1 theorem is not established as stated**: a proof gap found by the external assessment; correction notice in the paper; repair pending |

Nothing here proves anything about primes without the Hardy–Littlewood conjecture, and nothing here bears on the
Riemann Hypothesis (`research/paper-II/LITERATURE.md`, §0, has the sentence we allow ourselves).

## Layout
- `research/paper-I` … `paper-IV` — sources, `refs.bib`, a `STATUS.md` or `README.md`, `scripts/`, `data/`
- `research/experiments/` — the scripts and results behind paper I (`REPORT-full.md`, `CONCLUSIONS.md`)
- `research/lib/` — the shared TypeScript number-theory library (spiral, sieve, polynomials, F_q[u], ζ); `research/tests/`
- `research/reviews/` — external assessments, archived with the revision they assessed
- `src/` — the Ulam-nD web workbench (Next.js), a visual companion that imports the library from `research/lib`;
  nothing in the papers depends on it

## Commands (from the repository root)
```
npm install
npm test                                            # library tests (vitest)
npm run thesis                                      # paper I's experiment suite (about 2 minutes)
npx tsx research/experiments/<script>.ts            # one experiment; each header states its runtime
npx tsx research/paper-I/gen-macros.ts              # regenerate paper I's numbers from the JSON results
Q=1,0,1 U=1 Y=10000000 npx tsx research/paper-IV/scripts/piece-general.ts   # a piece of paper IV
cd research/paper-II && tectonic main.tex           # any paper; TeX Live 2023+ works too (pgfplots, booktabs, hyperref)
npm run dev                                         # the workbench at http://localhost:3000
```
The Python scripts in `research/paper-{II,III,IV}/scripts/` need Python 3.11+ with `mpmath` and `numpy`
(`python -m venv .venv && .venv/bin/pip install mpmath numpy`).

## The workbench (`src/`)
Zoomable 2D slices and a 3D point cloud of the d-dimensional Ulam spiral; per-point analysis (the exact polynomial of
every lattice ray through a point, its Bateman–Horn constant, observed against expected primes); whole-box line scans
(dispersion Φ, z-scores); diffraction; RH-equivalent error terms from the sieve; a comparison across dimensions; a
theory tab. The spiral for d ≥ 3: shell k holds (2k−1)^d+1 … (2k+1)^d, the (d−1)-dimensional ring swept along the new
axis (x_d = 0, +1, −1, …), then the caps x_d = ±k; every lattice ray then carries a polynomial of degree d
(`research/lib/spiral.ts`, theory tab). The workbench has not changed since 10 September and is not being developed further.

## AI disclosure
The mathematics, code and text were produced with heavy use of large language models (Anthropic's Claude), used
interactively by the author; each paper carries a disclosure section, and the knowledge base records the errors this
produced and how they were found. The external assessment archived in `research/reviews/` was likewise produced with
an AI system (ChatGPT) at the author's request; its findings were re-derived independently before being applied.
