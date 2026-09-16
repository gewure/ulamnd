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
| | content | status (15 September 2026) |
|---|---|---|
| I | The pair singular series, its Dedekind zeta function and the variance of prime values: exact identity, diagonal Dirichlet series ζ_K(s+1)E_f(s), closed formula for quadratics, Cesàro theorem for linear f, Conjecture 1 (first power of C(f), Cesàro form), exact test on 25 quadratics | v9, 31 pp. Corrected 13 Sep: the sharp-sum claims were false and are gone. Preprint ready; awaiting an arXiv endorser 14 Sep: the author's reviewing model conversation found an unproved non-vanishing claim in the proof of Theorem 3's asymptotic; re-proved via Perron with a power-saving error, unconditionally (ERRATA 26). |
| II | Zeros of Dedekind zeta functions in the second moment: E_f as an infinite product of Artin L-functions of the plethystic exponents Ψ_N, natural boundary, RH-conditional explicit formula, Ω-theorem, every coefficient for t²+1 | 24 pp. Corrected 13 Sep: the general-f theorem now has the log-polynomial at s = −2/3 Sections 2–4 read adversarially 14 Sep: seven expository fixes, no statement changed (ERRATA 24). 15 Sep: two proof defects found by an outside reading (empty parameter set; the Ω-theorem's Landau argument) repaired, the Ω-theorem now with an explicit constant (ERRATA 31). |
| III | The off-diagonal in Cesàro form: decomposition into pieces, unconditional small and far moduli, the main term c_off(f)·H, the window as the single open input, a function-field theorem | 27 pp. Read adversarially on 13 Sep (fresh reader): core sound, seven findings fixed (`research/ERRATA.md` item 18), one stated exponent corrected |
| IV | The second spectrum: the pieces oscillate at the even Maass parameters of SL₂(Z) with Katok–Sarnak amplitudes; a spectral argument for u = 1; uniformity in u as the open problem | 31 pp. The u = 1 theorem's orbit error (found by the external assessment) was repaired on 13 Sep (groups Γ₀(e), e \| rad(2D)); a second adversarial reading passed the repair but found the **remainder bound unproved**; carrying the proposed route out showed why: the remainder contains smoothed Hooley sums of the same order as the main term (Remark `rem:gaps`). The exact expansion and its leading terms are proved; the error term is open. For **smooth windows** the full theorem is proved (Theorem `thm:smooth`, 13 Sep): phase predicted with no free parameter and observed to 0.035 rad, amplitude predicted 0.0600 and observed 0.0597; on the restricted object the level-2 newform line and the oldform correction appear at their predicted sizes Sections 2–4 read adversarially 14 Sep: nine fixes incl. the real-argument definition of the piece and its Riesz means, one reader claim rejected (ERRATA 25). Internal phase finished; external review is what remains. |

**Python package (15 September 2026).** `research/python/ulamnd/` ports the parts of the TypeScript machinery that other
researchers are most likely to want: roots of polynomial congruences, the Bateman–Horn constant and pair singular series
of a quadratic with exact tails, the pieces of paper IV (sharp and smooth window), the spectral tests, and the Maass-form
predictions of the smooth-window theorem. Only numpy and mpmath are needed; `research/python/README.md` has three
one-minute examples and the tests cross-check every module against the TypeScript output or brute force.

**Follow-up draft (15 September 2026).** `research/paper-dilation/` — "Dilated pieces, Hecke correspondences and the
second spectrum": the coefficient of every computable Maass line in the piece with dilation u as an oldform projection at
level u², with an explicit closed form for the level-one lines at odd prime u, tested parameter-free on 21 (u,D) pairs and
on a level-3 newform. Working draft, not for circulation; three lemmas still to be proved in full (see its STATUS.md).

**Case study (started 14 September 2026).** `research/case-study/` scaffolds a fifth, methodological paper: how this
programme was produced (test-driven origin, guardrails, evolution of the prompting, the complete error record, what
model readers cannot catch). `main.tex` is the scaffold with interview slots, `INTERVIEW.md` the questionnaire,
`SOURCES.md` maps every claim to its evidence, `scripts/process-record.py` regenerates every process number from git. Its Appendix C is a one-page map of this repository (which files matter, what each is for, how everything is regenerated); read it first if you are new here.

Nothing here proves anything about primes without the Hardy–Littlewood conjecture, and nothing here bears on the
Riemann Hypothesis (`research/paper-II/LITERATURE.md`, §0, has the sentence we allow ourselves).

## Layout
- `research/paper-I` … `paper-IV` — sources, `refs.bib`, a `STATUS.md` or `README.md`, `scripts/`, `data/`
- `research/experiments/` — the scripts and results behind paper I (`REPORT-full.md`, `CONCLUSIONS.md`)
- `research/lib/` — the shared TypeScript number-theory library (spiral, sieve, polynomials, F_q[u], ζ); `research/tests/`
- `research/reviews/` — external assessments, archived with the revision they assessed
- `src/` — the Ulam-nD web workbench (Next.js), a visual companion that imports the library from `research/lib`;
  nothing in the papers depends on it
- `researchtemplate/` — the *method* of this repository with the mathematics removed: an empty research
  programme (governance files, claim harness, prompts, paper skeleton) for anyone who wants to reproduce the
  process rather than the result; see `researchtemplate/README.md`

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
