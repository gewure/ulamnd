"""Roots of polynomial congruences: mod p (any degree), mod p^k (Hensel, simple roots), mod d (CRT).

    >>> roots_mod_p([1, 0, 1], 13)          # x^2 + 1 mod 13
    [5, 8]
    >>> roots_mod_p([1, 0, 0, -2], 31)      # x^3 - 2 mod 31 (31 ≡ 1 mod 3, 2 is a cube)
    [4, 7, 20]
    >>> roots_mod_d([1, 0, 1], 65)          # x^2 + 1 mod 5·13
    [8, 18, 47, 57]

Coefficients are given highest degree first, as in numpy.polyval. Pure Python; fast enough for all primes up
to 10^7 (a few seconds) because roots mod p are found by gcd(x^p - x, f) and Cantor–Zassenhaus splitting, never by
trial. The functions are the Python counterparts of research/explore/cubic-piece.ts and cubic-full.ts.
"""
from __future__ import annotations
import random
from math import gcd
from typing import List, Sequence

# ---------------------------------------------------------------- polynomials over F_p, coefficients low -> high

def _trim(u: List[int]) -> List[int]:
    while u and u[-1] == 0:
        u.pop()
    return u

def _poly_mod(u: List[int], fm: List[int], p: int) -> List[int]:
    """u mod fm, fm monic (low->high)."""
    u = u[:]
    n = len(fm) - 1
    for i in range(len(u) - 1, n - 1, -1):
        c = u[i]
        if c:
            for j in range(n + 1):
                u[i - n + j] = (u[i - n + j] - c * fm[j]) % p
    return _trim(u[:n])

def _poly_mulmod(u, v, fm, p):
    w = [0] * (len(u) + len(v) - 1)
    for i, ui in enumerate(u):
        if ui:
            for j, vj in enumerate(v):
                w[i + j] = (w[i + j] + ui * vj) % p
    return _poly_mod(w, fm, p)

def _poly_powmod(base, e, fm, p):
    r, b = [1], base
    while e > 0:
        if e & 1:
            r = _poly_mulmod(r, b, fm, p)
        b = _poly_mulmod(b, b, fm, p)
        e >>= 1
    return r

def _poly_gcd(u, v, p):
    u, v = _trim(u[:]), _trim(v[:])
    while v:
        lv = pow(v[-1], -1, p)
        vm = [(c * lv) % p for c in v]
        r = u[:]
        n = len(vm) - 1
        for i in range(len(r) - 1, n - 1, -1):
            c = r[i]
            if c:
                for j in range(n + 1):
                    r[i - n + j] = (r[i - n + j] - c * vm[j]) % p
        u, v = v, _trim(r[:n])
    lu = pow(u[-1], -1, p)
    return [(c * lu) % p for c in u]

def _poly_div(u, v, p):
    """exact quotient u / v, v monic"""
    r = u[:]
    n = len(v) - 1
    q = [0] * (len(u) - n)
    for i in range(len(r) - 1, n - 1, -1):
        c = r[i]
        q[i - n] = c
        if c:
            for j in range(n + 1):
                r[i - n + j] = (r[i - n + j] - c * v[j]) % p
    return _trim(q)

def sqrt_mod_p(n: int, p: int) -> int:
    """A square root of n mod an odd prime p (Tonelli–Shanks); n must be a quadratic residue."""
    n %= p
    if n == 0:
        return 0
    if p % 4 == 3:
        return pow(n, (p + 1) // 4, p)
    q, s = p - 1, 0
    while q % 2 == 0:
        q //= 2
        s += 1
    z = 2
    while pow(z, (p - 1) // 2, p) == 1:
        z += 1
    m, c, t, r = s, pow(z, q, p), pow(n, q, p), pow(n, (q + 1) // 2, p)
    while t != 1:
        i, tt = 0, t
        while tt != 1:
            tt = tt * tt % p
            i += 1
        b = c
        for _ in range(m - i - 1):
            b = b * b % p
        m, c, t, r = i, b * b % p, t * (b * b) % p, r * b % p
    return r

def _roots_of_split(g: List[int], p: int, rng: random.Random) -> List[int]:
    """roots of a monic g that is a product of distinct linear factors over F_p"""
    d = len(g) - 1
    if d <= 0:
        return []
    if d == 1:
        return [(-g[0]) % p]
    if d == 2:
        disc = (g[1] * g[1] - 4 * g[0]) % p
        s = sqrt_mod_p(disc, p)
        h2 = pow(2, -1, p)
        return sorted({((-g[1] + s) * h2) % p, ((-g[1] - s) * h2) % p})
    for _ in range(80):  # Cantor–Zassenhaus
        c = rng.randrange(1, p)
        h = _poly_powmod([c, 1], (p - 1) // 2, g, p)
        hm = h[:] + [0] * (1 - len(h)) if not h else h[:]
        hm[0] = (hm[0] - 1) % p
        hm = _trim(hm)
        if not hm:
            continue
        gg = _poly_gcd(g, hm, p)
        if 1 < len(gg) < len(g):
            other = _poly_div(g, gg, p)
            return sorted(_roots_of_split(gg, p, rng) + _roots_of_split(other, p, rng))
    return sorted(x for x in range(p) if eval_mod(g[::-1], x, p) == 0)  # fallback (tiny p)

def eval_mod(coeffs_high_first: Sequence[int], x: int, m: int) -> int:
    r = 0
    for c in coeffs_high_first:
        r = (r * x + c) % m
    return r

def roots_mod_p(f: Sequence[int], p: int, rng: random.Random | None = None) -> List[int]:
    """All roots of f (coefficients highest degree first) modulo the prime p, sorted. Works for any degree."""
    rng = rng or random.Random(1)
    fp = [c % p for c in f][::-1]  # low -> high
    fp = _trim(fp)
    if not fp:
        return list(range(p))
    if len(fp) == 1:
        return []
    if p <= 3 or len(fp) - 1 >= p:
        return sorted(x for x in range(p) if eval_mod(f, x, p) == 0)
    la = pow(fp[-1], -1, p)
    fm = [(c * la) % p for c in fp]
    xp = _poly_powmod([0, 1], p, fm, p)
    xpx = xp[:] + [0] * max(0, 2 - len(xp))
    xpx[1] = (xpx[1] - 1) % p
    xpx = _trim(xpx)
    if not xpx:  # x^p ≡ x mod f: f splits completely
        return _roots_of_split(fm, p, rng)
    g = _poly_gcd(fm, xpx, p)
    return _roots_of_split(g, p, rng)

def hensel_lift(f: Sequence[int], r: int, p: int, k: int) -> int:
    """Lift a simple root r of f mod p to the unique root mod p^k congruent to r (Newton steps)."""
    n = len(f) - 1
    fprime = [c * (n - i) for i, c in enumerate(f[:-1])]
    root, pj = r, p
    inv = pow(eval_mod(fprime, r, p), -1, p)
    for _ in range(1, k):
        fv = eval_mod(f, root, pj * p)
        t = (-(fv // pj) * inv) % p
        root, pj = root + pj * t, pj * p
    return root

def roots_mod_d(f: Sequence[int], d: int, factorization: Sequence[tuple] | None = None) -> List[int]:
    """All roots of f mod d, by CRT over the prime powers of d. Roots mod p^k are Hensel lifts, so every prime dividing d
    must not divide the discriminant (simple roots); pass factorization=[(p, k), ...] to skip factoring."""
    if factorization is None:
        factorization, m, q = [], d, 2
        while q * q <= m:
            if m % q == 0:
                k = 0
                while m % q == 0:
                    m //= q
                    k += 1
                factorization.append((q, k))
            q += 1
        if m > 1:
            factorization.append((m, 1))
    roots, mod = [0], 1
    for p, k in factorization:
        pk = p ** k
        rk = [hensel_lift(f, r, p, k) for r in roots_mod_p(f, p)]
        inv = pow(mod, -1, pk) if mod > 1 else 0
        new = []
        for a in roots:
            for b in rk:
                t = ((b - a) * inv) % pk if mod > 1 else b
                new.append(a + mod * t)
        roots, mod = new, mod * pk
    return sorted(roots)

def discriminant(f: Sequence[int]) -> int:
    """Discriminant of a polynomial of degree 2 or 3 (highest degree first)."""
    if len(f) == 3:
        a, b, c = f
        return b * b - 4 * a * c
    if len(f) == 4:
        a, b, c, d = f
        return b * b * c * c - 4 * a * c ** 3 - 4 * b ** 3 * d - 27 * a * a * d * d + 18 * a * b * c * d
    raise ValueError("degree 2 or 3 only")

def primes_upto(n: int) -> List[int]:
    """Primes ≤ n (sieve of Eratosthenes, numpy if available)."""
    try:
        import numpy as np
        s = np.ones(n + 1, dtype=bool); s[:2] = False
        for i in range(2, int(n ** 0.5) + 1):
            if s[i]:
                s[i * i::i] = False
        return [int(v) for v in np.flatnonzero(s)]
    except ImportError:
        s = bytearray([1]) * (n + 1); s[0] = s[1] = 0
        for i in range(2, int(n ** 0.5) + 1):
            if s[i]:
                s[i * i::i] = bytearray(len(s[i * i::i]))
        return [i for i in range(n + 1) if s[i]]
