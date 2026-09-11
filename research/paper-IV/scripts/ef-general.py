"""E F for the model piece to ~20 digits, for any discriminant D and any admissible u.
Model object (ALLDIV, lambda == 1):  E F = prod_{p split for D, p not | 2Du} (1 + 2/(p^2 - 1)).
Direct product for p <= P0; tail by the power series of log(1 + 2/(p^2-1)) in 1/p^2 against the split-prime zeta
  sum_{p split} p^{-s} = (P(s) + P_chi(s))/2  minus the p | 2D terms,
with P, P_chi obtained from log zeta and log L(s, chi_D) by Moebius inversion.
  python ef-general.py D u   (e.g. ef-general.py -4 5)
"""
from mpmath import mp, mpf, log, zeta, dirichlet, taylor, exp
import sys, functools
print = functools.partial(print, flush=True)
mp.dps = 30
D = int(sys.argv[1]); u = int(sys.argv[2]); P0 = int(sys.argv[3]) if len(sys.argv) > 3 else 2_000_000

def kronecker(a, n):                      # Kronecker symbol (a/n), n > 0
    if n == 0: return 1 if a in (1, -1) else 0
    r = 1
    if n < 0: n = -n; r = -1 if a < 0 else 1
    while n % 2 == 0:
        n //= 2
        if a % 2 == 0: return 0
        if a % 8 in (3, 5): r = -r
    a %= n
    while a:
        while a % 2 == 0:
            a //= 2
            if n % 8 in (3, 5): r = -r
        a, n = n, a
        if a % 4 == 3 and n % 4 == 3: r = -r
        a %= n
    return r if n == 1 else 0

q = abs(D)
chi = [kronecker(D, k) for k in range(q)]          # chi_D as a list of length q, chi[k] = chi(k)
sieve = bytearray([1]) * (P0 + 1); sieve[0] = sieve[1] = 0
for i in range(2, int(P0 ** 0.5) + 1):
    if sieve[i]: sieve[i*i::i] = bytearray(len(range(i*i, P0 + 1, i)))
primes = [p for p in range(2, P0 + 1) if sieve[p]]
split = [p for p in primes if kronecker(D, p) == 1 and (2 * D) % p != 0 and u % p != 0]

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

cond_primes = sorted({p for p in range(2, q + 1) if q % p == 0 and all(p % r for r in range(2, p))})

def logL(s, k):
    """log of the L-function of chi^k at s: chi if k is odd, the principal character mod q if k is even."""
    if k % 2 == 1:
        return log(dirichlet(s, chi))
    v = zeta(s)
    for p in cond_primes: v *= (1 - mpf(p) ** (-s))
    return log(v)

def prime_sums(n):
    """(sum_p p^-n, sum_p chi(p) p^-n) over ALL primes. Moebius inversion of
       log L(s, chi^m) = sum_m (1/m) sum_p chi(p)^m p^{-ms}; chi^k is principal for even k."""
    A = mpf(0); B = mpf(0)
    for k in range(1, 80):
        mu = mobius(k)
        if mu == 0: continue
        t1 = log(zeta(n * k))
        A += mu * t1 / k
        B += mu * logL(n * k, k) / k
        if abs(t1) < mpf(10) ** (-mp.dps - 3): break
    return A, B

N = 16
c = taylor(lambda w: log(1 + 2 * w / (1 - w)), 0, N)   # w = 1/p^2 ; log(1 + 2/(p^2-1))
logEF = sum(log(1 + mpf(2) / (mpf(p) * p - 1)) for p in split)
for n in range(1, N + 1):
    if c[n] == 0: continue
    A, B = prime_sums(2 * n)
    full = (A + B) / 2                                   # sum over split primes, all of them
    # (A+B)/2 counts a prime with chi(p) = 0 with weight 1/2; such p are never split, so remove that half-term.
    for p in primes:
        if kronecker(D, p) == 0: full -= mpf(p) ** (-2 * n) / 2
    # and remove the split primes we must exclude, namely p | 2Du
    for p in primes:
        if ((2 * D) % p == 0 or u % p == 0) and kronecker(D, p) == 1: full -= mpf(p) ** (-2 * n)
    direct = sum(mpf(p) ** (-2 * n) for p in split)
    logEF += c[n] * (full - direct)
print(mp.nstr(exp(logEF), 22))
