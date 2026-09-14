"""ulamnd — Python counterparts of the numerical machinery of the Ulam-nD papers I–IV (September 2026).

Modules
    roots     roots of polynomial congruences mod p, p^k, d (any degree)
    singular  Kronecker symbol, L(1, chi) by digamma, Bateman–Horn constant and pair singular series of a quadratic with exact tails
    pieces    the pieces / model object of paper IV (Riesz mean of sigma_{-1} along u^2 h^2 - D; sharp and smooth window)
    spectral  detrending, periodogram, joint fits, random-set percentiles (the tests of paper IV's tables)
    maass     Maass forms from LMFDB coefficients, Heegner periods, the amplitude/phase prediction of Theorem thm:smooth

Every function is cross-checked against the TypeScript originals or a brute-force computation in tests/ (run: pytest).
"""
from . import roots, singular, pieces, spectral, maass  # noqa: F401
__version__ = "0.1.0"
