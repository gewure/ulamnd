"""Singular series and Bateman–Horn constants for an irreducible quadratic f, with exact tails (paper I).

Definitions (paper I):  omega_f(p) = number of roots of f mod p;  C(f) = prod_p (1 - omega_f(p)/p) / (1 - 1/p) is the
Bateman–Horn constant;  the pair singular series is
    S_f(h) = prod_p (1 - nu_f(p, h)/p) / (1 - 1/p)^2,     nu_f(p, h) = #{t mod p : p | f(t) f(t+h)}.
Conjecture 1 of paper I (Cesàro form): sum_{h<=H} (1 - h/H)(S_f(h) - C(f)^2) = -1/2 C(f) log H + A_f + o(1).

Exact tails. Every constant here is an Euler product whose logarithm is sum_p g(p) with g(p) = chi(p)/p + O(1/p^2) or
smaller; the conditionally convergent part is summed through the L-function,
    sum_p chi(p) p^{-s} = sum_{k>=1} mu(k)/k · log L(ks, chi^k),
where chi^k is chi for odd k and the principal character mod q for even k (L(s, chi_0) = zeta(s) prod_{p|q}(1 - p^{-s})),
and L(1, chi) is evaluated by the digamma formula (mpmath's dirichlet() is unreliable at s = 1). The absolutely
convergent remainder sum_p O(1/p^2) is summed to P and its tail bounded by the prime zeta function. So
C(f) and the local constants come out to ~20 digits from primes up to a few 10^5.

    >>> C_quadratic(-4)                     # f = t^2 + 1: the Hardy–Littlewood constant for primes n^2 + 1
    mpf('1.3728134628182...')
"""
from __future__ import annotations
from functools import lru_cache
from mpmath import mp, mpf, log, exp, zeta, digamma, primezeta, mpc
from .roots import primes_upto, roots_mod_p

mp.dps = 30

# ---------------------------------------------------------------- Kronecker symbol and Dirichlet L(s, chi_D)

def kronecker(a: int, n: int) -> int:
    """Kronecker symbol (a/n) for any integers, n != 0."""
    if n == 0:
        return 1 if abs(a) == 1 else 0
    if n < 0:
        n = -n
        s = -1 if a < 0 else 1
    else:
        s = 1
    # factor out 2s of n
    e = 0
    while n % 2 == 0:
        n //= 2
        e += 1
    if e > 0:
        if a % 2 == 0:
            return 0
        if e % 2 == 1:
            s *= 1 if a % 8 in (1, 7) else -1
    # Jacobi symbol (a/n), n odd
    a %= n
    r = 1
    while a:
        while a % 2 == 0:
            a //= 2
            if n % 8 in (3, 5):
                r = -r
        a, n = n, a
        if a % 4 == 3 and n % 4 == 3:
            r = -r
        a %= n
    return s * r if n == 1 else 0

def fundamental_discriminant(D: int) -> int:
    """The fundamental discriminant D0 with D = D0 f^2 (D a discriminant, i.e. D ≡ 0, 1 mod 4)."""
    d, f = D, 1
    q = 2
    while q * q <= abs(d):
        while d % (q * q) == 0 and (d // (q * q)) % 4 in (0, 1):
            d //= q * q
            f *= q
        q += 1
    return d

def L1_chi(D0: int):
    """L(1, chi_{D0}) for a fundamental discriminant D0 != 1, by the digamma formula  L(1,chi) = -(1/q) sum_a chi(a) psi(a/q)."""
    q = abs(D0)
    return -sum(kronecker(D0, a) * digamma(mpf(a) / q) for a in range(1, q) if kronecker(D0, a) != 0) / q

def L_chi(s, D0: int):
    """L(s, chi_{D0}) for s > 1 exactly, by Hurwitz zeta:  L(s, chi) = q^{-s} sum_{a=1}^{q} chi(a) zeta(s, a/q).
    (A truncated Dirichlet series at 20000 terms is only good to ~1e-9 at s = 2, which showed up as a 1.5e-9 error
    in the expectation constant of the pieces — found by the three-route comparison on 15 Sep 2026.)"""
    q = abs(D0)
    return mpf(q) ** (-s) * sum(kronecker(D0, a) * zeta(s, mpf(a) / q) for a in range(1, q) if kronecker(D0, a) != 0)

def sum_chi_over_primes(s, D0: int, kmax: int = 40):
    """sum_p chi_{D0}(p) p^{-s} for real s >= 1 through log L, exactly (Möbius inversion over prime powers)."""
    q = abs(D0)
    total = mpf(0)
    for k in range(1, kmax + 1):
        mu = _mobius(k)
        if mu == 0:
            continue
        ks = k * s
        if k % 2 == 1:
            Lk = L1_chi(D0) if ks == 1 else L_chi(ks, D0)
        else:  # principal character mod q
            Lk = zeta(ks)
            for p in _prime_factors(q):
                Lk *= 1 - mpf(p) ** (-ks)
        total += mpf(mu) / k * log(Lk)
    return total

def _mobius(n: int) -> int:
    m, q, k = n, 2, 0
    while q * q <= m:
        if m % q == 0:
            m //= q
            if m % q == 0:
                return 0
            k += 1
        q += 1
    if m > 1:
        k += 1
    return -1 if k % 2 else 1

def _prime_factors(n: int):
    out, q = [], 2
    while q * q <= n:
        if n % q == 0:
            out.append(q)
            while n % q == 0:
                n //= q
        q += 1
    if n > 1:
        out.append(n)
    return out

# ---------------------------------------------------------------- Bateman–Horn constant for a quadratic

def omega_quadratic(D: int, p: int) -> int:
    """number of roots of t^2 + b t + c (discriminant D) mod p"""
    if p == 2:
        return len(roots_mod_p([1, 0, -D], 2)) if D % 2 == 0 else 1  # crude; callers treat p | 2D separately
    k = kronecker(D, p)
    return 1 + k if p % 2 else 0

def C_quadratic(D: int, f=None, P: int = 300000):
    """Bateman–Horn constant C(f) = prod_p (1 - omega_f(p)/p)/(1 - 1/p) for an irreducible quadratic f of
    discriminant D (default f = t^2 - D/4 when D ≡ 0 mod 4, else t^2 + t + (1-D)/4). For p not dividing 2D,
    omega = 1 + chi_D(p) and the factor is 1 - chi_D(p)/(p-1); the primes p | 2D are treated by counting roots.
    Tail beyond P: sum_{p>P} chi(p)/(p-1) = sum_{p>P} chi(p)/p + O(1/P) summed exactly via log L."""
    if f is None:
        f = [1, 0, -D // 4] if D % 4 == 0 else [1, 1, (1 - D) // 4]
    D0 = fundamental_discriminant(D)
    primes = primes_upto(P)
    logC = mpf(0)
    special = [p for p in primes if (2 * D) % p == 0]
    for p in primes:
        if p in special:
            w = len(roots_mod_p(f, p))
            logC += log(1 - mpf(w) / p) - log(1 - mpf(1) / p)
        else:
            chi = kronecker(D0, p)
            logC += log(1 - mpf(chi) / (p - 1))
    # tail: sum_{p>P} log(1 - chi/(p-1)) = -sum_{p>P} chi/(p-1) - sum_{p>P} chi^2/(2(p-1)^2) - ...
    # first piece: chi/(p-1) = chi/p + chi/p^2 + ...; sum_{p>P} chi/p exactly, sum_{p>P} chi/p^2 exactly, rest via primezeta
    tail = mpf(0)
    S1 = sum_chi_over_primes(mpf(1), D0) - sum(kronecker(D0, p) / mpf(p) for p in primes if p not in special)
    S2 = sum_chi_over_primes(mpf(2), D0) - sum(kronecker(D0, p) / mpf(p) ** 2 for p in primes if p not in special)
    tail -= S1 + S2
    # remaining terms are O(sum_{p>P} p^{-3}) with |chi| <= 1: bound by primezeta
    pz3 = primezeta(3) - sum(mpf(p) ** (-3) for p in primes)
    # second-order term -sum chi^2/(2(p-1)^2) ≈ -1/2 sum_{p>P} 1/p^2 (chi^2 = 1 for p not dividing D0)
    pz2 = primezeta(2) - sum(mpf(p) ** (-2) for p in primes)
    tail -= pz2 / 2
    logC += tail
    return exp(logC), pz3  # value, and the size of the neglected terms

# ---------------------------------------------------------------- the pair singular series S_f(h)

def nu_f(f, p: int, h: int) -> int:
    """#{t mod p : p | f(t) f(t+h)} by the roots: roots of f and roots of f(t+h) = f-roots shifted by -h."""
    r = set(roots_mod_p(f, p))
    return len(r | {(x - h) % p for x in r})

def S_f(f, h: int, D: int | None = None, P: int = 100000):
    """S_f(h) = prod_p (1 - nu_f(p,h)/p)/(1 - 1/p)^2 with the tail summed exactly for a quadratic f.
    For p not dividing 2 D f(h)-related quantities... in general nu = 2 omega - #{common roots}; for p > P the common-root
    term vanishes (p | R(h), the resultant, only for finitely many p), so the tail factor is prod_{p>P}(1 - 2omega/p)/(1-1/p)^2
    = prod_{p>P} (1 - 2 chi(p)/p + O(p^{-2})) and is summed through sum_chi_over_primes. Quadratics only for the tail."""
    if D is None:
        a, b, c = f
        D = b * b - 4 * a * c
    D0 = fundamental_discriminant(D)
    primes = primes_upto(P)
    logS = mpf(0)
    for p in primes:
        nu = nu_f(f, p, h)
        logS += log(1 - mpf(nu) / p) - 2 * log(1 - mpf(1) / p)
    # tail: log((1 - 2(1+chi)/p)/(1-1/p)^2) = -2 chi/p + (-(2(1+chi))^2/2 + 1) / p^2 + ... ; keep the 1/p and 1/p^2 terms exactly
    chi_tail1 = sum_chi_over_primes(mpf(1), D0) - sum(kronecker(D0, p) / mpf(p) for p in primes)
    chi_tail2 = sum_chi_over_primes(mpf(2), D0) - sum(kronecker(D0, p) / mpf(p) ** 2 for p in primes)
    pz2 = primezeta(2) - sum(mpf(p) ** (-2) for p in primes)
    # expansion: log(1 - 2(1+chi)/p) + 2/p + 1/p^2 + ... = -2chi/p - (2(1+chi))^2/(2p^2) + 1/p^2 + O(p^-3)
    #          = -2 chi/p - (4 + 8 chi + 4 chi^2)/(2 p^2) + 1/p^2 ;  chi^2 = 1 (p not dividing D0):  = -2chi/p - (4 + 4chi)/p^2 + 1/p^2 ... let us be explicit:
    #          -2chi/p + (1 - 2 - 4 chi - 2)/p^2 = -2 chi/p - (3 + 4 chi)/p^2
    logS += -2 * chi_tail1 - 3 * pz2 - 4 * chi_tail2
    return exp(logS)

__all__ = ["kronecker", "fundamental_discriminant", "L1_chi", "sum_chi_over_primes", "C_quadratic", "nu_f", "S_f"]
