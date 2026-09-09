# Ulam-nD — prime spiral research workbench

A local Next.js tool for exploring n-dimensional Ulam spirals and testing whether the
"pseudo-patterns" of primes on them carry more information than the standard
number-theoretic heuristics predict.

```bash
npm install
npm run dev        # http://localhost:3000
npx vitest run     # spiral bijection, polynomial detection, ζ zeros, sieve, analysis
```

Everything runs in the browser. Heavy work (sieve, spiral layout, line scans) runs in a
Web Worker; the default box is 4 million numbers (about 20 MB). Boxes above 16 M numbers are
warned about, above 48 M refused.

## What is in it

| Tab | What it does |
|---|---|
| 2D slice | Zoomable canvas of a 2D slice of the d-dimensional spiral (scroll = zoom, drag = pan, click = analyse). Colour by prime / twin / Ω(n) / μ(n) / residue class. Zoomed out, brightness = prime density. |
| 3D cloud | WebGL point cloud of the primes in a 3D sub-box (d ≥ 3), with the current 2D slice layer highlighted. |
| point analysis | For a clicked point: every lattice line through it, the exact polynomial of each ray (BigInt finite differences), its Hardy–Littlewood / Bateman–Horn constant C(f), observed vs expected primes in the box (z-score), and an extrapolation far beyond the box with Miller–Rabin. |
| line scan | Scans every lattice line in the box: dispersion index Φ, size-normalised structure (Φ−1)/Ē, z-score histograms per direction class, empty-line excess, richest and poorest lines with their polynomials. |
| diffraction | 2D FFT power spectrum and autocorrelation of the prime field (quasicrystal / Penrose test), with peak identification. |
| Riemann | RH-equivalent error terms from the sieve (π−li, ψ−x, Mertens against Schoenfeld's bounds), ζ(½+it) and Hardy's Z(t) via Borwein's algorithm, zero finding, and the explicit formula rebuilding ψ(x) from the zeros. |
| dimensions | Builds boxes in several dimensions with the same number of integers and compares the line statistics; Fibonacci dimensions are marked, the others serve as controls. |
| theory | Definitions, the proof that every lattice line carries a degree-d polynomial, the conjectures involved, and an honest account of the relation to RH. |

## Definition of the d-dimensional spiral

d = 2 is the classic Ulam spiral. For d ≥ 3, shell k (Chebyshev norm k) holds the numbers
(2k−1)^d+1 … (2k+1)^d: the (d−1)-dimensional ring of radius k is swept through the new axis
in the order x_d = 0, +1, −1, +2, −2, …, then the two caps x_d = ±k are filled with the
(d−1)-dimensional ball. See `lib/spiral.ts` and the theory tab.

## Layout

- `lib/spiral.ts` – n ↔ coordinates in any dimension, shell enumeration, direction sets
- `lib/sieve.ts` – Ω(n), squarefree and twin flags in one byte per integer
- `lib/poly.ts` – exact polynomial detection, Bateman–Horn constants, reducibility tests, Miller–Rabin
- `lib/analysis.ts` – box construction, slices, point analysis, whole-box line scan, RH series
- `lib/riemann.ts` – li, R(x), ζ on the critical line, Z(t), zero finding, explicit formula
- `lib/fft.ts` – 2D FFT, diffraction, autocorrelation
- `lib/worker.ts` – worker entry; `lib/workerClient.ts` – promise wrapper
- `components/` – the UI
- `tests/` – vitest

## Thesis test suite

```bash
npm run thesis            # ≈ 2 M numbers per dimension, ~2 min → thesis/REPORT.md
npx tsx thesis/run.ts --full   # ≈ 8 M numbers per dimension → thesis/REPORT-full.md
```

`thesis/run.ts` runs nine falsifiable experiments (polynomial theorem, Bateman–Horn agreement with a
random control, in-box pattern collapse, the C(f) distribution up to d = 10, Fibonacci dimensions against
controls, scale invariance, diffraction, RH-equivalent bounds, nearest-neighbour texture) with a fixed
random seed. `thesis/REPORT.md` is the evidence; `thesis/CONCLUSIONS.md` is the reading of it.

## Paper

`paper/main.tex` is a peer-review draft built entirely from the data: `npx tsx thesis/variance.ts`
(variance experiment, ~10 min), `npx tsx paper/gen-macros.ts` (tables and macros), then
`tectonic main.tex` inside `paper/` (the [tectonic](https://tectonic-typesetting.github.io) engine
compiles it without a TeX installation). `thesis/trunc.ts` reproduces the truncation table.

`paper/NOTES-towards-7.md` records the research programme that follows from the exact identity of
Section 3 of the paper (Dedekind zeta functions in the second moment of prime values of a polynomial).
`thesis/sumS.ts` and `thesis/offdiag.ts` are the two arithmetic (prime-free) experiments behind it.
`thesis/riesz.ts`, `thesis/riesz-diag.ts`, `thesis/riesz-fit.ts`, `thesis/riesz-analysis.ts` search for
the zeros of L(s,χ₋₄) in the second moment of t²+1 (negative at 4·10⁷; see paper Section 6);
`thesis/galois.ts` tests the constant −½ across Galois groups.
`thesis/exact.ts` is the exact C-versus-C² test for quadratics (closed formula of Theorem 5, no Euler
truncation, 25 quadratics to H = 10⁶). `thesis/ff.ts` computes the function-field (F_q[u]) analogue exactly
for q = 3, 5, 7, and `thesis/ff-tail.ts` verifies the finite-support lemma for its off-diagonal remainder
independently (roots modulo every squarefree d via CRT; `lib/ffpoly.ts` holds the F_q[u] arithmetic). `paper/routes.tex` is a companion note scaffolding the two routes to a proof
(Hooley/DFI over ℤ; Katz/Deligne over F_q[u]).

`paper/STATUS.md` is the hand-off document: what is proved, what is numerical, how to regenerate everything, and the next steps.
