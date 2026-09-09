# Thesis test suite — results

Generated 2026-09-08T19:34:26.855Z, quick mode, ≈ 2,000,000 numbers per dimension. Deterministic seed; rerun with `npm run thesis`.

## T1 — every lattice ray is eventually a polynomial of degree d with leading coefficient 2ᵈ

Hypothesis: for every base point b (|bᵢ| ≤ B) and direction v ∈ {−1,0,1}ᵈ the number at b + t·v is, for all t ≥ t₀, a polynomial of degree exactly d with leading coefficient 2ᵈ. Pass = all counts equal the number of rays. "verified" re-evaluates the polynomial against the spiral map at 130 further points beyond t₀.

| d | B | rays | polynomial found | degree = d | leading = 2ᵈ | verified to t₀+400 | max t₀ |
|---|---|---|---|---|---|---|---|
| 2 | 40 | 120 | 120 | 120 | 120 | 120 | 62 |
| 3 | 40 | 390 | 390 | 390 | 390 | 390 | 73 |
| 4 | 6 | 960 | 960 | 960 | 960 | 960 | 12 |
| 5 | 6 | 1200 | 1200 | 1200 | 1200 | 1200 | 13 |
| 6 | 6 | 1200 | 1200 | 1200 | 1200 | 1200 | 13 |
| 7 | 6 | 1200 | 1200 | 1200 | 1200 | 1200 | 13 |

## T2 — primes on polynomial rays beyond the box follow Bateman–Horn, with sub-Poisson variance

Random rays (base point in the matched box, direction with ≤ 2 non-zero entries) are followed for T steps from the polynomial threshold t₀ using Miller–Rabin on the exact polynomial values. Prediction per ray: Σ min(1, C(f)/ln f(t)) with independent-Bernoulli variance. Pass for Bateman–Horn = observed/predicted within a few standard errors of 1. Φ_BH is the dispersion of the per-ray residuals; Φ_random is a control in which, for every ray, the same number of integers is drawn uniformly at random from the ray's value range and pushed through the identical primality/weighting code (must be ≈ 1 under independence). Rays with a fixed divisor or a reducible polynomial are skipped (counted).

| d | rays | T | primes | predicted | obs/pred ± se | obs/naive | Φ_BH ± se | Φ_naive | Φ_random control | mean z | skipped |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 | 150 | 2000 | 30163 | 29872.2 | 1.010 ± 0.006 | 1.561 | **0.43 ± 0.12** | 204.44 | 1.04 | 0.13 | 55 |
| 3 | 100 | 600 | 3771 | 3805.1 | 0.991 ± 0.016 | 1.192 | **0.62 ± 0.14** | 18.50 | 0.90 | -0.07 | 24 |
| 4 | 80 | 250 | 1277 | 1245.4 | 1.025 ± 0.028 | 1.373 | **0.60 ± 0.16** | 11.51 | 1.12 | 0.07 | 14 |
| 5 | 60 | 120 | 412 | 422.6 | 0.975 ± 0.049 | 1.321 | **0.60 ± 0.18** | 5.64 | 1.01 | -0.07 | 29 |
| 6 | 40 | 80 | 144 | 152.7 | 0.943 ± 0.081 | 1.131 | **0.66 ± 0.22** | 2.29 | 0.89 | -0.16 | 14 |

## T3 — inside the box, the line pattern collapses once each ray is weighted by its own C(f)

For each dimension a box with ≈ 2,000,000 numbers is built (radius R). Random in-box rays are taken from their polynomial threshold t₀ onward (the code asserts that the polynomial matches the spiral at every point used). Φ_naive = mean (A−E)²/V with E = Σ 1/ln n and independent-Bernoulli variance V. "Φ predicted from C(f)" = 1 + mean((C·E − E)²/V) is the dispersion the naive model *must* show if the only thing happening is that each ray has its own Bateman–Horn constant. Φ_BH is the dispersion after replacing 1/ln n by min(1, C(f)/ln n). Pass for "the pattern is explained by congruences" = Φ_naive ≈ Φ predicted and Φ_BH ≲ 1. Structure = (Φ_naive − 1)/Ē should track Var(C). "fixed (with >1 prime)" counts rays with a fixed prime divisor and how many of them contain more than one prime (must be 0). The last column is the same structure statistic from the exhaustive whole-line scan of the UI, which mixes polynomial regimes along a line and quantises 1/ln n. ⚠ = fewer than 200 usable rays; the box is too small for that dimension.

| d | R | N | rays | mean pts | Ē | Φ_naive observed | Φ predicted from C(f) | Φ_BH ± se | (Φ−1)/Ē | Var C | mean C | obs/E | obs/E_BH | fixed (with >1 prime) | whole-line scan (Φ−1)/Ē |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 ★ | 706 | 1,996,569 | 1500 | 345.8 | 25.65 | 28.04 | 27.82 | **0.48 ± 0.04** | 1.054 | 0.809 | 1.364 | 1.021 | 1.001 | 352 (0) | 0.642 |
| 3 ★ | 62 | 1,953,125 | 1500 | 25.2 | 1.88 | 2.86 | 3.11 | **0.74 ± 0.04** | 0.986 | 0.754 | 1.467 | 1.032 | 1.006 | 476 (0) | 0.450 |
| 4 | 18 | 1,874,161 | 1500 | 10.2 | 0.79 | 1.59 | 1.92 | **0.76 ± 0.04** | 0.743 | 0.859 | 1.462 | 0.993 | 0.999 | 489 (0) | 0.187 |
| 5 ★ | 8 | 1,419,857 | 1500 | 4.6 | 0.37 | 1.15 | 1.42 | **0.78 ± 0.04** | 0.406 | 0.780 | 1.514 | 0.985 | 0.961 | 488 (0) | 0.085 |
| 6 | 5 | 1,771,561 | 269 ⚠ | 4.0 | 0.37 | 0.95 | 1.57 | **0.77 ± 0.11** | -0.144 | 1.085 | 1.562 | 0.784 | 0.840 | 109 (0) | – |

## T4 — the distribution of Bateman–Horn constants by dimension (pure congruence data, no primes involved)

For random rays in the matched box of each dimension the eventual polynomial is computed exactly and its constant C(f) = Π_p (1 − ω(p)/p)/(1 − 1/p) is evaluated from the roots modulo small primes only. This is what the spiral "pattern" is made of: the fraction of rays with a fixed prime divisor (C = 0, the visibly empty lines), and the spread of C among the rest (the visibly rich versus poor lines). No sieve is used, so the test reaches d = 10. Var C and the coefficient of variation CV = sd/mean are the congruence-only predictions of the structure measured in T3.

| d | R | rays | fixed-divisor fraction | reducible fraction | mean C | Var C | CV | C at 10 / 50 / 90 % | max C | mean C axis / diagonal |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 ★ | 706 | 300 | 0.22 | 0.003 | 1.347 | 0.814 | 0.670 | 0.47 / 1.11 / 2.54 | 5.09 | 0.94 / 2.05 |
| 3 ★ | 62 | 300 | 0.21 | 0.000 | 1.241 | 0.606 | 0.627 | 0.46 / 1.04 / 2.28 | 4.70 | 1.28 / 1.23 |
| 4 | 18 | 300 | 0.21 | 0.000 | 1.216 | 0.595 | 0.634 | 0.41 / 1.06 / 2.20 | 5.43 | 1.26 / 1.20 |
| 5 ★ | 8 | 300 | 0.22 | 0.000 | 1.349 | 0.701 | 0.621 | 0.59 / 1.14 / 2.38 | 5.79 | 1.64 / 1.29 |
| 6 | 5 | 300 | 0.26 | 0.000 | 1.359 | 0.728 | 0.628 | 0.42 / 1.15 / 2.55 | 4.37 | 1.83 / 1.28 |
| 7 | 3 | 300 | 0.28 | 0.000 | 1.463 | 0.710 | 0.576 | 0.62 / 1.28 / 2.53 | 4.39 | 1.60 / 1.44 |
| 8 ★ | 2 | 300 | 0.30 | 0.000 | 1.411 | 0.822 | 0.643 | 0.53 / 1.18 / 2.76 | 4.50 | 1.88 / 1.36 |
| 9 | 2 | 300 | 0.30 | 0.000 | 1.583 | 0.864 | 0.587 | 0.65 / 1.31 / 2.96 | 5.35 | 1.94 / 1.55 |
| 10 | 2 | 300 | 0.27 | 0.000 | 1.500 | 0.957 | 0.652 | 0.52 / 1.24 / 3.03 | 5.15 | 1.75 / 1.47 |

## T5 — Fibonacci dimensions against their neighbours

Hypothesis under test: d ∈ {2, 3, 5, 8} carry more (or differently organised) line structure than the control dimensions. Each Fibonacci dimension is compared with the mean of its two neighbours (d = 8 with 7 and 9). Columns: measured structure (Φ−1)/Ē from T3 where the box is large enough, and the congruence-only quantities from T4. Pass for the Fibonacci hypothesis would require a consistent, same-sign excess at 3, 5 and 8 that is large compared with the sampling scatter visible in T4 between adjacent control dimensions.

| d | structure | neighbours | Var C | neighbours | CV of C | neighbours | fixed-divisor fraction | neighbours |
|---|---|---|---|---|---|---|---|---|
| 3 | 0.986 | 0.899 | 0.606 | 0.704 | 0.627 | 0.652 | 0.21 | 0.21 |
| 5 | 0.406 | – | 0.701 | 0.661 | 0.621 | 0.631 | 0.22 | 0.23 |
| 8 | – | – | 0.822 | 0.787 | 0.643 | 0.581 | 0.30 | 0.29 |

## T6 — scale invariance

The T3 statistics at a quarter of the box size. A real effect must be stable under a change of scale: Φ_BH should stay ≲ 1 and obs/E_BH ≈ 1 in both rows of each d; (Φ−1)/Ē and Var C are allowed to drift slowly because the population of rays (their base points) changes with R.

| d | R | N | Ē | Φ_naive | Φ predicted | Φ_BH ± se | (Φ−1)/Ē | Var C | obs/E_BH |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 353 | 499,849 | 14.58 | 15.55 | 15.17 | 0.47 ± 0.05 | 0.998 | 0.769 | 1.007 |
| 2 | 706 | 1,996,569 | 25.52 | 26.95 | 25.58 | 0.51 ± 0.05 | 1.017 | 0.791 | 0.999 |
| 3 | 39 | 493,039 | 1.47 | 2.23 | 2.73 | 0.67 ± 0.06 | 0.832 | 0.841 | 0.991 |
| 3 | 62 | 1,953,125 | 1.90 | 2.65 | 2.83 | 0.73 ± 0.05 | 0.871 | 0.746 | 1.007 |
| 4 | 12 | 390,625 | 0.83 | 1.83 | 2.30 | 0.77 ± 0.06 | 1.004 | 1.070 | 0.972 |
| 4 | 18 | 1,874,161 | 0.80 | 1.40 | 1.94 | 0.69 ± 0.05 | 0.500 | 0.897 | 1.006 |

## T7 — diffraction: crystallographic peaks over a diffuse background, no quasicrystal

Power spectrum of the prime indicator in a window of a slice. Each of the 12 strongest local maxima is matched to the nearest rational frequency p/q with q ≤ 12; "max error" is the distance in frequency bins (0 = exactly on a rational frequency of the window). A quasicrystal (Penrose) would show sharp peaks at irrational, golden-ratio-related positions with 5- or 10-fold symmetry; a residue-class structure shows only rational peaks with small denominators. "share of power" is the fraction of the off-origin spectral power carried by those 12 peaks; the remainder is diffuse.

| case | peaks | share of power | max error (bins) | strongest peaks (fₓ, f_y) |
|---|---|---|---|---|
| d=2, window 512 | 12 | 12.4% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (1/3, -1/3) (-1/3, 1/3) (1/6, -1/6) |
| d=2, window 1024 | 12 | 10.9% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (1/6, -1/6) (-1/6, 1/6) (1/3, -1/3) |
| d=3, slice x₃=0, window 128 | 12 | 11.0% | 0.33 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (-1/6, -1/2) (1/6, -1/2) (0/1, -1/3) |
| d=3, slice x₃=17, window 128 | 12 | 6.9% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (-1/3, 0/1) (1/3, 0/1) (0/1, -1/3) |

## T8 — RH-equivalent bounds hold up to N, and the fluctuation exponent

From the sieve up to N = 16,000,000. Under RH the first two ratios stay below 1 for all x in the stated ranges (Schoenfeld 1976); the Mertens ratio is known to exceed 1 eventually (Odlyzko–te Riele 1985) but not below 10¹⁶. The exponent is the least-squares slope of log max|ψ(x)−x| over dyadic blocks against log x; RH is equivalent to fluctuations of order x^(1/2) up to logarithms, so a slope near 0.5 is expected. Nothing here can distinguish RH from "RH fails far beyond N".

| statistic | max | at x |
|---|---|---|
| \|π(x) − li(x)\| / (√x ln x / 8π), x ≥ 2657 | 0.925 | 2,660 |
| \|ψ(x) − x\| / (√x ln²x / 8π), x ≥ 74 | 0.706 | 100 |
| \|M(x)\| / √x | 0.567 | 199 |
| fluctuation exponent of ψ(x) − x (dyadic maxima, x ≥ 2¹⁴) | 0.470 | |

## T9 — nearest-neighbour prime pairs by dimension: the texture is congruences mod 2, 3, 5

Observed / expected number of lattice-adjacent prime pairs, per axis x₁ … x_d and (after ‖) for the (+1,+1,0,…) diagonal. Three expectations: independence with p(n) = 1/ln n (raw); a model that knows which cells are odd (probability 2/ln n for odd n); a model that knows the residues mod 2, 3 and 5 (probability 3.75/ln n for n coprime to 30). A raw ratio of 0 means adjacent cells never share parity; a ratio of 1 in the mod-30 column means that nothing beyond the residues of the cells modulo 30 is needed to explain how often neighbouring cells are both prime. This is the cleanest way to see how the spiral's arithmetic texture changes with the dimension.

| d | raw ratios (axes ‖ diagonal) | parity-adjusted | mod-30-adjusted |
|---|---|---|---|
| 2 ★ | 0.00 · 0.00 ‖ 2.01 | 1.20 · 0.52 ‖ 1.00 | 1.00 · 1.00 ‖ 1.00 |
| 3 ★ | 0.01 · 0.01 · 1.98 ‖ 1.97 | 0.86 · 1.28 · 1.00 ‖ 1.00 | 0.97 · 1.03 · 1.00 ‖ 1.00 |
| 4 | 0.04 · 0.04 · 1.86 · 1.50 ‖ 1.87 | 0.97 · 0.98 · 0.97 · 0.77 ‖ 0.98 | 1.03 · 0.94 · 0.97 · 1.00 ‖ 0.99 |
| 5 ★ | 0.10 · 0.10 · 1.68 · 1.44 · 1.80 ‖ 1.74 | 0.98 · 1.04 · 0.93 · 0.78 · 0.96 ‖ 0.97 | 1.01 · 0.99 · 0.99 · 0.98 · 0.99 ‖ 0.99 |
| 6 | 0.14 · 0.15 · 1.56 · 1.42 · 1.66 · 1.32 ‖ 1.62 | 0.97 · 1.04 · 0.92 · 0.82 · 0.94 · 0.73 ‖ 0.96 | 1.00 · 0.97 · 0.96 · 1.03 · 0.97 · 0.95 ‖ 0.98 |
| 7 | 0.15 · 0.17 · 1.61 · 1.22 · 1.81 · 1.19 · 2.09 ‖ 1.51 | 0.96 · 1.06 · 1.04 · 0.77 · 1.12 · 0.72 · 1.25 ‖ 0.92 | 1.01 · 1.01 · 0.96 · 1.00 · 0.98 · 0.98 · 1.04 ‖ 0.99 |
| 8 ★ | 0.13 · 0.16 · 1.23 · 1.28 · 1.16 · 1.22 · 1.32 · 1.15 ‖ 1.43 | 0.91 · 1.08 · 0.88 · 0.89 · 0.80 · 0.83 · 0.89 · 0.76 ‖ 0.85 | 1.03 · 0.99 · 0.97 · 1.03 · 0.96 · 1.02 · 1.11 · 0.96 ‖ 0.97 |

---
Run time 98 s.