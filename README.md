# ulamnd — the second-moment programme for prime values of polynomials

A research repository. It began on 8 September 2026 as a web workbench for looking at n-dimensional Ulam spirals; the
spiral hypotheses were refuted on the first day (`research/experiments/CONCLUSIONS.md`), and what survived is a
programme in analytic number theory about the pair singular series S_f(h) of an irreducible polynomial f and the
second-order term of its mean. It is written up in five papers and a working draft, every number of which is generated
from code in this repository, and the elementary core of paper I is formally verified in Lean 4.

## Where to start
1. `research/KNOWLEDGE.md` — the state, the ordered next steps and the do-not-claim list; the error record F1–F51,
   each with the rule that follows from it (F48–F51 are from the September–October work on the dilated pieces and
   the Lean formalisation).
2. `research/ERRATA.md` — every correction to the papers, by date and cause (43 items; the last three: the
   extension of paper III's proved range, the opening of paper V, and the `+H/2` that the formalisation found in
   paper I's Theorem 5 display).
3. `research/lean/PairSingularSeries/STATUS.md` — what is formally verified and under which hypotheses.
4. The papers, in order.

## The papers (`research/paper-*/main.tex`; `tectonic main.tex` compiles each; all on Zenodo, versions updated continuously)
| | content | status (30 September 2026) |
|---|---|---|
| I | The pair singular series S_f(h), its expansion in root Ramanujan sums, the diagonal Dirichlet series ζ_K(s+1)E_f(s), the Cesàro asymptotic −½C(f) log H with the off-diagonal Off*_f as the single obstruction, Conjecture 1, exact tests on 25 quadratics | 32 pp. **Theorems 1 and 5 formally verified in Lean 4/Mathlib** (`research/lean`): Theorem 1 in full, Theorem 5's identities, split and part (i) unconditionally, its asymptotic conditionally on three named inputs (Landau, Theorem 2, Shiu). The verification found and fixed a missing `C²H/2` in the exact identity of Theorem 5's proof (ERRATA 43; `O(H)`, theorem unchanged). Hypothesis (E) — Off* = O(H) — is the open problem of the whole programme. |
| II | Zeros of Dedekind zeta functions in the second moment: E_f as a product of Artin L-functions of plethystic exponents, natural boundary, RH-conditional explicit formula, Ω-theorem with explicit constant | 24 pp. Unchanged since 15 Sep (two proof defects repaired then, ERRATA 31). |
| III | The off-diagonal in Cesàro form: decomposition into dilated pieces; **Theorem E**: Off*_f(H) ≪ H(log H)^{1−c} log log H unconditionally for monic irreducible quadratics, hence the leading term of Conjecture 1 in Cesàro form; power saving for the pieces with u > H^{1/2+ε} (dispersion over u + Weil); the main term c_off(f)·H; Theorem A conditional on the window; a function-field theorem | 32 pp. **Frozen since 15 Sep** (corrections only). Range of the proved power saving extended from u > H^{2/3+ε} to u > H^{1/2+ε} on 15 Sep (ERRATA 40); three adversarial readings. Cites Grimmelt–Merikoski 2025. |
| IV | The second spectrum: the pieces oscillate at the even Maass parameters of SL₂(Z) with Katok–Sarnak amplitudes; exact expansion proved; full theorem for smooth windows; the sharp-window error term open | 31 pp. Cross-references updated to paper III's new range; otherwise unchanged since 15 Sep. |
| V | **The dilated pieces below H^{1/2}** (new, 16 Sep): Theorem M — the pieces with H^{0.47} < u ≤ H^{0.53} are O(H^{1−δ}) (energy of reciprocals for every squarefree modulus, Bourgain–Garaev, Mellin separation); Theorem S — for D < 0 the pieces with u ≤ H^{1/3−c} and (u,D) = 1 are O(H^{1−δ_S}), δ_S ≈ c/12, via Grimmelt–Merikoski's kernel theorem with the dilation tracked; the band u ≈ H^{1/3} identified as the single remaining obstruction (a six-fold reciprocal energy at N ≈ m^{1/4}, at a barrier named in Bourgain–Garaev's own corollary) | 7 pp. Theorems proved and read (three readings for M, two for S) **in the exploration notes** (`research/explore/PAPER-V-*.md`, `PROOFS-uniform.md` §12–§46); the paper is a skeleton whose proofs are pointers. **Writing the proofs into the paper is the current task.** |
| dilation | Dilated pieces, Hecke correspondences and the second spectrum: what a piece with dilation u *is* — every computable Maass line as an oldform projection at level u², closed forms for the level-one lines at prime u, newform lines vanish for inert u | 11 pp working draft. Descriptive counterpart of paper V (V bounds how *big* a piece is); its open error term is what V addresses. To be finalised after V. |

**What is proved about the conjecture, in one line.** The leading term of Conjecture 1 in Cesàro form is a theorem for
monic irreducible quadratics (III, Theorem E). The constant A_f needs Off* = O(H); power savings are proved for the
dilated pieces with u > H^{1/2+ε} (III), u ≈ H^{1/2} (V, Theorem M) and u ≤ H^{1/3−c}, D < 0 (V, Theorem S); the band
u ≈ H^{1/3} is open and no route to it is currently known (`research/explore/PROOFS-uniform.md` §31–§41).

**Python package (15 September 2026).** `research/python/ulamnd/` ports the parts of the TypeScript machinery that other
researchers are most likely to want: roots of polynomial congruences, the Bateman–Horn constant and pair singular series
of a quadratic with exact tails, the pieces of paper IV (sharp and smooth window), the spectral tests, and the Maass-form
predictions of the smooth-window theorem. Only numpy and mpmath are needed; `research/python/README.md` has examples.

**Case study (started 14 September 2026).** `research/case-study/` scaffolds a methodological paper: how this programme
was produced (test-driven origin, guardrails, the complete error record, adversarial model readings, what model readers
cannot catch — and now what a proof assistant catches that neither can). Its Appendix C is a one-page map of this
repository.

Nothing here proves anything about primes without the Hardy–Littlewood conjecture, and nothing here bears on the
Riemann Hypothesis (`research/paper-II/LITERATURE.md`, §0, has the sentence we allow ourselves).

## Formal verification (Lean 4 / Mathlib)

The elementary core of paper I — Theorem 1 in full, and Theorem 5's exact identities, split and part (i)
unconditionally, with its asymptotic conditional on three named inputs — is formally verified in Lean 4
against Mathlib: `research/lean/PairSingularSeries/` (56 theorems, no `sorry`; `Axioms.lean` prints the
standard axioms for each; `STATUS.md` is the statement-by-statement table; `../FORMAL-PLAN.md` the plan
and the paper-to-Lean correspondence). The three inputs stated as hypotheses, because none is in Mathlib,
are the existence of the Bateman–Horn constant `C(f)` (Landau), paper I's Theorem 2 (Dedekind zeta) and
Shiu's theorem. The formalisation found one correction to paper I (ERRATA 43: a missing `+H/2` in the
exact identity behind Theorem 5, `O(H)`, no consequence for the theorem) and produced four
project-independent tools that are candidates for Mathlib: a Chinese-remainder counting lemma for
arbitrary predicates, absolute summability of a multiplicative function vanishing off squarefree numbers
from its values at primes, regrouping of a double series along divisor antidiagonals, and a tail bound by
discrete Abel summation. Build: `elan`, then `lake exe cache get && lake build` in that directory.

## Layout
- `research/paper-I` … `paper-IV` — sources, `refs.bib`, a `STATUS.md` or `README.md`, `scripts/`, `data/`
- `research/experiments/` — the scripts and results behind paper I (`REPORT-full.md`, `CONCLUSIONS.md`)
- `research/lib/` — the shared TypeScript number-theory library (spiral, sieve, polynomials, F_q[u], ζ); `research/tests/`
- `research/lean/` — the Lean 4 / Mathlib formalisation of paper I's Theorems 1 and 5 (`PairSingularSeries/`,
  with `STATUS.md` and `Axioms.lean`) and its plan `FORMAL-PLAN.md`
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
