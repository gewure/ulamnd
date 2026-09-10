"""E F_u = prod_{p = 1 (4), p not | u} (1 + 2/(p(p-4))) to 25 digits, for piece.ts (an error δ in E F_u is δ Y²/2 in P_u(Y)).
Direct product for p <= P0, tail via the power series of log(1 + 2t²/(1-4t)) in t = 1/p and prime sums
Σ_{p>P0, p=1(4)} p^{-n} = ½(P(n) + P_χ(n)) − (direct part), with P, P_χ from log ζ, log L(·,χ_{-4}) by Möbius inversion."""
from mpmath import mp, mpf, log, zeta, dirichlet, mpmathify
import sys
mp.dps = 30
P0 = 2_000_000
sieve = bytearray([1]) * (P0 + 1); sieve[0] = sieve[1] = 0
for i in range(2, int(P0 ** 0.5) + 1):
    if sieve[i]: sieve[i*i::i] = bytearray(len(range(i*i, P0 + 1, i)))
P1 = [p for p in range(5, P0 + 1, 4) if sieve[p]]
def mobius(n):
    r = 1; m = n; d = 2
    while d * d <= m:
        if m % d == 0:
            m //= d
            if m % d == 0: return 0
            r = -r
        d += 1
    if m > 1: r = -r
    return r
def primezeta(n, chi):
    # Σ_p chi(p) p^{-n}; chi = None (all primes) or χ_{-4}
    s = mpf(0)
    for k in range(1, 60):
        mu = mobius(k)
        if mu == 0: continue
        if chi is None: term = log(zeta(n * k))
        else:
            if k % 2 == 1: term = log(dirichlet(n * k, [0, 1, 0, -1]))
            else: term = log((1 - mpf(2) ** (-n * k)) * zeta(n * k))  # χ² = principal mod 4
        s += mu * term / k
        if abs(term) < mpf(10) ** (-mp.dps - 2): break
    return s
# series coefficients of log(1 + 2t²/(1-4t)) = Σ c_n t^n
N = 12
from mpmath import taylor
c = taylor(lambda t: log(1 + 2 * t**2 / (1 - 4 * t)), 0, N)
def EF(u):
    logEF = mpf(0)
    for p in P1:
        if u % p: logEF += log(1 + mpf(2) / (p * (p - 4)))
    # tail p > P0
    for n in range(2, N + 1):
        full = (primezeta(n, None) + primezeta(n, "chi")) / 2 - mpf(2) ** (-(n + 1))  # remove p = 2
        direct = sum(mpf(p) ** (-n) for p in P1)
        logEF += c[n] * (full - direct)
    return mp.e ** logEF
for u in [int(a) for a in (sys.argv[1:] or ["2", "10", "26", "130"])]:
    print(u, mp.nstr(EF(u), 22))
