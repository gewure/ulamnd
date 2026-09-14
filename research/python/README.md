# ulamnd — the numerical machinery of papers I–IV in Python

Most of the programme's computations were written in TypeScript (`research/paper-*/scripts`, `research/explore`). This
package gives the parts that other people are most likely to want, in Python with numpy and mpmath, each cross-checked
against the TypeScript output or a brute-force computation (`tests/test_ulamnd.py`; the rule of the knowledge base:
every constant by two routes).

```
pip install numpy mpmath          # that is all
cd research/python && python -m pytest -q      # or: python tests/test_ulamnd.py
```

| module | what | paper |
|---|---|---|
| `ulamnd.roots` | roots of a polynomial mod p (any degree; gcd with x^p − x and Cantor–Zassenhaus, no trial), Hensel lifts, roots mod d by CRT, Tonelli–Shanks | III, IV |
| `ulamnd.singular` | Kronecker symbol; L(1, χ_D) by the digamma formula; the Bateman–Horn constant C(f) and the pair singular series S_f(h) of a quadratic with **exact tails** (the conditionally convergent Σ χ(p)/p through log L, Möbius-inverted over prime powers) | I |
| `ulamnd.pieces` | the pieces / model object of paper IV: Riesz mean of σ₋₁ along u²h²−D for the divisor sets "coprime" and "all", sharp and smooth window, on the standard log grid; expectation E with exact tail | III, IV |
| `ulamnd.spectral` | detrending, periodogram, joint least-squares fit of frequency sets, percentile against random sets (the test of paper IV's tables); the level-1 even/odd parameters and Strömberg's Γ₀(9) eigenvalues as constants | IV |
| `ulamnd.maass` | Maass forms of SL₂(Z) from LMFDB coefficient files, values at Heegner points, Petersson norm, the sum over all classes of forms of discriminant 4D, and the amplitude/phase predicted by Theorem thm:smooth | IV |

## Three things you can do in a minute

**1. The Hardy–Littlewood constant of a quadratic to 15 digits, with the tail done exactly.**
```python
from ulamnd.singular import C_quadratic
C, neglected = C_quadratic(-4)        # f = t^2 + 1
print(C)                              # 1.37281346281828...
```
The product over primes ≤ P is completed by Σ_{p>P} χ(p)/p = [Σ_k μ(k)/k · log L(k, χ^k)] − Σ_{p≤P} χ(p)/p, with L(1, χ)
from the digamma formula (mpmath's `dirichlet()` is wrong at s = 1, a lesson recorded in the knowledge base).

**2. The second spectrum: compute a piece and see the Maass line.**
```python
from ulamnd.pieces import pieces
from ulamnd import spectral
res = pieces(D=-4, Y=10**7)["coprime"]          # ~1 min; Y=10^6 in seconds (the line needs 10^7)
x, y = res.grid[:, 0], res.grid[:, 3]            # log Y, P(Y)/sqrt(Y)
y = spectral.detrend(x, y, deg=3, taper=True)
print(spectral.peaks(x, y, 10, 25)[:3])          # the first even Maass parameter 13.7798 leads
print(spectral.percentile(x, spectral.detrend(x, res.grid[:, 3], deg=3), spectral.EVEN_LEVEL1, 12, 25))
```

**3. The parameter-free prediction of Theorem thm:smooth and its test.**
```python
from ulamnd.maass import first_even_form, predict_smooth_line
C, phi = predict_smooth_line(first_even_form(), D=-11)     # amplitude and phase of the t_1 line, discriminant -11
```
Compare with the fitted line on `pieces(D=-11, Y=10**7, smooth=True)["all"].smooth` (columns log Y, Y, √Y S^w(Y)):
paper IV, Table tab:dsweep, finds ratios within 5% and 0.1 rad for |D| ≤ 23.

## What is deliberately not here
The function-field code (`research/lib/ffpoly.ts`), the thesis suite of the workbench, and the cubic full-factorisation
experiment (`research/explore/cubic-full.ts`, exploratory). The TypeScript remains the reference implementation; where
the two disagree, the tests are the arbiter and the discrepancy goes into `research/ERRATA.md`.

## Provenance
Written 14–15 September 2026 by the model in dialogue with the author, from the TypeScript originals; see the case
study `research/case-study/` for how this programme was produced and verified.
