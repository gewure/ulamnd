# Thesis test suite — results

Generated 2026-09-08T19:37:02.796Z, full mode, ≈ 8,000,000 numbers per dimension. Deterministic seed; rerun with `npm run thesis`.

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
| 2 | 300 | 3000 | 72531 | 72476.6 | 1.001 ± 0.004 | 1.334 | **0.45 ± 0.08** | 159.32 | 1.04 | 0.01 | 118 |
| 3 | 200 | 1000 | 11715 | 11714.7 | 1.000 ± 0.009 | 1.199 | **0.58 ± 0.10** | 24.03 | 0.85 | 0.00 | 60 |
| 4 | 150 | 400 | 3100 | 3201.3 | 0.968 ± 0.018 | 1.207 | **0.67 ± 0.12** | 10.26 | 1.06 | -0.13 | 28 |
| 5 | 100 | 200 | 1088 | 1068.7 | 1.018 ± 0.031 | 1.386 | **0.90 ± 0.14** | 9.71 | 1.31 | 0.03 | 32 |
| 6 | 80 | 120 | 490 | 487.9 | 1.004 ± 0.045 | 1.407 | **0.97 ± 0.16** | 5.46 | 0.96 | 0.01 | 25 |

## T3 — inside the box, the line pattern collapses once each ray is weighted by its own C(f)

For each dimension a box with ≈ 8,000,000 numbers is built (radius R). Random in-box rays are taken from their polynomial threshold t₀ onward (the code asserts that the polynomial matches the spiral at every point used). Φ_naive = mean (A−E)²/V with E = Σ 1/ln n and independent-Bernoulli variance V. "Φ predicted from C(f)" = 1 + mean((C·E − E)²/V) is the dispersion the naive model *must* show if the only thing happening is that each ray has its own Bateman–Horn constant. Φ_BH is the dispersion after replacing 1/ln n by min(1, C(f)/ln n). Pass for "the pattern is explained by congruences" = Φ_naive ≈ Φ predicted and Φ_BH ≲ 1. Structure = (Φ_naive − 1)/Ē should track Var(C). "fixed (with >1 prime)" counts rays with a fixed prime divisor and how many of them contain more than one prime (must be 0). The last column is the same structure statistic from the exhaustive whole-line scan of the UI, which mixes polynomial regimes along a line and quantises 1/ln n. ⚠ = fewer than 200 usable rays; the box is too small for that dimension.

| d | R | N | rays | mean pts | Ē | Φ_naive observed | Φ predicted from C(f) | Φ_BH ± se | (Φ−1)/Ē | Var C | mean C | obs/E | obs/E_BH | fixed (with >1 prime) | whole-line scan (Φ−1)/Ē |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| 2 ★ | 1413 | 7,991,929 | 3000 | 661.1 | 44.39 | 50.14 | 49.81 | **0.55 ± 0.03** | 1.107 | 0.792 | 1.354 | 1.033 | 1.002 | 743 (0) | 0.647 |
| 3 ★ | 99 | 7,880,599 | 3000 | 36.9 | 2.49 | 3.43 | 3.82 | **0.71 ± 0.03** | 0.977 | 0.821 | 1.503 | 1.029 | 0.993 | 945 (0) | 0.472 |
| 4 | 26 | 7,890,481 | 3000 | 12.1 | 0.83 | 1.76 | 2.09 | **0.78 ± 0.03** | 0.907 | 0.921 | 1.507 | 1.003 | 0.977 | 987 (0) | 0.230 |
| 5 ★ | 11 | 6,436,343 | 3000 | 5.1 | 0.36 | 1.13 | 1.38 | **0.79 ± 0.03** | 0.350 | 0.755 | 1.459 | 0.997 | 0.971 | 892 (0) | 0.160 |
| 6 | 6 | 4,826,809 | 1831 | 4.1 | 0.33 | 1.20 | 1.44 | **0.84 ± 0.04** | 0.599 | 0.997 | 1.513 | 1.002 | 1.016 | 628 (0) | 0.049 |

## T4 — the distribution of Bateman–Horn constants by dimension (pure congruence data, no primes involved)

For random rays in the matched box of each dimension the eventual polynomial is computed exactly and its constant C(f) = Π_p (1 − ω(p)/p)/(1 − 1/p) is evaluated from the roots modulo small primes only. This is what the spiral "pattern" is made of: the fraction of rays with a fixed prime divisor (C = 0, the visibly empty lines), and the spread of C among the rest (the visibly rich versus poor lines). No sieve is used, so the test reaches d = 10. Var C and the coefficient of variation CV = sd/mean are the congruence-only predictions of the structure measured in T3.

| d | R | rays | fixed-divisor fraction | reducible fraction | mean C | Var C | CV | C at 10 / 50 / 90 % | max C | mean C axis / diagonal |
|---|---|---|---|---|---|---|---|---|---|---|
| 2 ★ | 1413 | 600 | 0.27 | 0.007 | 1.339 | 0.822 | 0.677 | 0.46 / 1.09 / 2.53 | 5.73 | 0.96 / 1.97 |
| 3 ★ | 99 | 600 | 0.25 | 0.000 | 1.335 | 0.672 | 0.614 | 0.50 / 1.15 / 2.22 | 5.60 | 1.40 / 1.31 |
| 4 | 26 | 600 | 0.18 | 0.000 | 1.172 | 0.611 | 0.667 | 0.41 / 0.99 / 2.15 | 4.61 | 1.38 / 1.10 |
| 5 ★ | 11 | 600 | 0.26 | 0.000 | 1.319 | 0.689 | 0.629 | 0.47 / 1.15 / 2.39 | 5.69 | 1.62 / 1.26 |
| 6 | 6 | 600 | 0.26 | 0.000 | 1.291 | 0.722 | 0.658 | 0.48 / 1.13 / 2.50 | 5.07 | 1.55 / 1.24 |
| 7 | 4 | 600 | 0.30 | 0.000 | 1.528 | 0.904 | 0.622 | 0.61 / 1.22 / 2.91 | 4.92 | 2.02 / 1.47 |
| 8 ★ | 3 | 600 | 0.27 | 0.000 | 1.392 | 0.884 | 0.676 | 0.48 / 1.14 / 2.84 | 5.66 | 1.64 / 1.36 |
| 9 | 2 | 600 | 0.36 | 0.000 | 1.505 | 0.901 | 0.631 | 0.53 / 1.27 / 2.85 | 5.06 | 1.74 / 1.48 |
| 10 | 2 | 600 | 0.32 | 0.000 | 1.479 | 0.906 | 0.644 | 0.50 / 1.22 / 2.80 | 6.00 | 1.62 / 1.46 |

## T5 — Fibonacci dimensions against their neighbours

Hypothesis under test: d ∈ {2, 3, 5, 8} carry more (or differently organised) line structure than the control dimensions. Each Fibonacci dimension is compared with the mean of its two neighbours (d = 8 with 7 and 9). Columns: measured structure (Φ−1)/Ē from T3 where the box is large enough, and the congruence-only quantities from T4. Pass for the Fibonacci hypothesis would require a consistent, same-sign excess at 3, 5 and 8 that is large compared with the sampling scatter visible in T4 between adjacent control dimensions.

| d | structure | neighbours | Var C | neighbours | CV of C | neighbours | fixed-divisor fraction | neighbours |
|---|---|---|---|---|---|---|---|---|
| 3 | 0.977 | 1.007 | 0.672 | 0.716 | 0.614 | 0.672 | 0.25 | 0.23 |
| 5 | 0.350 | 0.753 | 0.689 | 0.666 | 0.629 | 0.662 | 0.26 | 0.22 |
| 8 | – | – | 0.884 | 0.903 | 0.676 | 0.626 | 0.27 | 0.33 |

## T6 — scale invariance

The T3 statistics at a quarter of the box size. A real effect must be stable under a change of scale: Φ_BH should stay ≲ 1 and obs/E_BH ≈ 1 in both rows of each d; (Φ−1)/Ē and Var C are allowed to drift slowly because the population of rays (their base points) changes with R.

| d | R | N | Ē | Φ_naive | Φ predicted | Φ_BH ± se | (Φ−1)/Ē | Var C | obs/E_BH |
|---|---|---|---|---|---|---|---|---|---|
| 2 | 706 | 1,996,569 | 25.54 | 25.62 | 25.46 | 0.47 ± 0.04 | 0.964 | 0.800 | 0.999 |
| 2 | 1413 | 7,991,929 | 43.97 | 49.67 | 49.34 | 0.51 ± 0.04 | 1.107 | 0.820 | 1.003 |
| 3 | 62 | 1,953,125 | 1.87 | 2.93 | 3.33 | 0.76 ± 0.04 | 1.032 | 0.862 | 0.996 |
| 3 | 99 | 7,880,599 | 2.49 | 3.48 | 4.01 | 0.72 ± 0.04 | 0.996 | 0.848 | 0.986 |
| 4 | 18 | 1,874,161 | 0.79 | 1.76 | 2.12 | 0.80 ± 0.04 | 0.964 | 0.997 | 0.999 |
| 4 | 26 | 7,890,481 | 0.83 | 1.71 | 1.98 | 0.78 ± 0.04 | 0.852 | 0.867 | 1.032 |

## T7 — diffraction: crystallographic peaks over a diffuse background, no quasicrystal

Power spectrum of the prime indicator in a window of a slice. Each of the 12 strongest local maxima is matched to the nearest rational frequency p/q with q ≤ 12; "max error" is the distance in frequency bins (0 = exactly on a rational frequency of the window). A quasicrystal (Penrose) would show sharp peaks at irrational, golden-ratio-related positions with 5- or 10-fold symmetry; a residue-class structure shows only rational peaks with small denominators. "share of power" is the fraction of the off-origin spectral power carried by those 12 peaks; the remainder is diffuse.

| case | peaks | share of power | max error (bins) | strongest peaks (fₓ, f_y) |
|---|---|---|---|---|
| d=2, window 512 | 12 | 12.4% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (1/3, -1/3) (-1/3, 1/3) (1/6, -1/6) |
| d=2, window 1024 | 12 | 10.9% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (1/6, -1/6) (-1/6, 1/6) (1/3, -1/3) |
| d=3, slice x₃=0, window 128 | 12 | 11.0% | 0.33 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (-1/6, -1/2) (1/6, -1/2) (0/1, -1/3) |
| d=3, slice x₃=17, window 128 | 12 | 6.9% | 0.67 | (-1/2, -1/2) (-1/3, -1/3) (1/3, 1/3) (-1/6, -1/6) (1/6, 1/6) (-1/3, 0/1) (1/3, 0/1) (0/1, -1/3) |

## T8 — RH-equivalent bounds hold up to N, and the fluctuation exponent

From the sieve up to N = 48,000,000. Under RH the first two ratios stay below 1 for all x in the stated ranges (Schoenfeld 1976); the Mertens ratio is known to exceed 1 eventually (Odlyzko–te Riele 1985) but not below 10¹⁶. The exponent is the least-squares slope of log max|ψ(x)−x| over dyadic blocks against log x; RH is equivalent to fluctuations of order x^(1/2) up to logarithms, so a slope near 0.5 is expected. Nothing here can distinguish RH from "RH fails far beyond N".

| statistic | max | at x |
|---|---|---|
| \|π(x) − li(x)\| / (√x ln x / 8π), x ≥ 2657 | 0.925 | 2,660 |
| \|ψ(x) − x\| / (√x ln²x / 8π), x ≥ 74 | 0.706 | 100 |
| \|M(x)\| / √x | 0.567 | 199 |
| fluctuation exponent of ψ(x) − x (dyadic maxima, x ≥ 2¹⁴) | 0.498 | |

## T9 — nearest-neighbour prime pairs by dimension: the texture is congruences mod 2, 3, 5

Observed / expected number of lattice-adjacent prime pairs, per axis x₁ … x_d and (after ‖) for the (+1,+1,0,…) diagonal. Three expectations: independence with p(n) = 1/ln n (raw); a model that knows which cells are odd (probability 2/ln n for odd n); a model that knows the residues mod 2, 3 and 5 (probability 3.75/ln n for n coprime to 30). A raw ratio of 0 means adjacent cells never share parity; a ratio of 1 in the mod-30 column means that nothing beyond the residues of the cells modulo 30 is needed to explain how often neighbouring cells are both prime. This is the cleanest way to see how the spiral's arithmetic texture changes with the dimension.

| d | raw ratios (axes ‖ diagonal) | parity-adjusted | mod-30-adjusted |
|---|---|---|---|
| 2 ★ | 0.00 · 0.00 ‖ 2.00 | 1.20 · 0.52 ‖ 1.00 | 1.00 · 1.00 ‖ 1.00 |
| 3 ★ | 0.00 · 0.01 · 2.00 ‖ 1.98 | 0.83 · 1.22 · 1.01 ‖ 1.00 | 0.91 · 0.98 · 1.01 ‖ 1.00 |
| 4 | 0.03 · 0.03 · 1.84 · 1.58 ‖ 1.93 | 0.94 · 1.00 · 0.95 · 0.80 ‖ 1.00 | 1.01 · 0.95 · 0.99 · 1.04 ‖ 1.00 |
| 5 ★ | 0.08 · 0.08 · 1.75 · 1.48 · 2.08 ‖ 1.79 | 0.97 · 1.04 · 0.94 · 0.78 · 1.09 ‖ 0.98 | 1.00 · 0.99 · 0.98 · 0.99 · 1.02 ‖ 0.99 |
| 6 | 0.12 · 0.13 · 1.78 · 1.37 · 2.31 · 1.30 ‖ 1.68 | 0.96 · 1.05 · 1.02 · 0.77 · 1.28 · 0.71 ‖ 0.98 | 0.99 · 0.99 · 0.96 · 1.00 · 0.97 · 0.97 ‖ 0.99 |
| 7 | 0.15 · 0.16 · 1.52 · 1.32 · 1.79 · 1.32 · 1.54 ‖ 1.62 | 0.98 · 1.04 · 0.93 · 0.79 · 1.05 · 0.77 · 0.88 ‖ 0.97 | 1.00 · 0.99 · 0.97 · 0.97 · 1.01 · 0.95 · 0.98 ‖ 0.98 |
| 8 ★ | 0.16 · 0.16 · 1.63 · 1.21 · 1.83 · 1.18 · 2.06 · 1.17 ‖ 1.50 | 0.96 · 1.00 · 1.05 · 0.76 · 1.13 · 0.72 · 1.25 · 0.69 ‖ 0.91 | 1.00 · 0.96 · 0.96 · 0.99 · 0.98 · 0.98 · 1.05 · 0.97 ‖ 0.98 |

---
Run time 223 s.