"""constants-cubic.py — exact constants for f = t^3 - 3t - 1 (C_3, conductor 9), two routes each (F9 rule):
  A0 = prod_p P_p, P_p = 1 - omega^2/(p-omega)^2;   D_f(1) = A0 prod_p (1 + omega/(p(p-2omega)));
  C(f) = prod_p (1-omega/p)/(1-1/p) = [L(1,chi)L(1,chibar)]^{-1} prod_p (1-omega/p)/((1-1/p)(1-chi/p)(1-chibar/p)).
Route 1: direct product over p <= P0 plus the tail by the power series in 1/p against the split-prime zeta functions
  P_split(k) = (P(k) + 2 Re P_chi(k))/3 - 3^{-k}/3,  P_chi(k) = sum_j mu(j)/j log L(jk, chi^j)  (chi^3 = principal mod 9).
Route 2: direct product to a smaller P1 with the same tail; agreement to ~1e-16 checks the tail machinery.
Writes research/paper-II/data/constants-cubic.json.   python constants-cubic.py
"""
import json
from mpmath import mp, mpf, mpc, log, exp, zeta, dirichlet, nsum, inf, pi, sqrt, re
def mobius(n):
    r=1; d=2
    while d*d<=n:
        if n%d==0:
            n//=d
            if n%d==0: return 0
            r=-r
        d+=1
    if n>1: r=-r
    return r
mp.dps = 40
# cubic character mod 9: generator 2 (order 6 mod 9); chi(2) = e^{2 pi i/3}, chi(n) = chi(2)^{k} for n = 2^k mod 9, chi(3m)=0
w3 = exp(2j * pi / 3); pow2 = {pow(2, k, 9): k for k in range(6)}
chi = [mpc(0) if n % 3 == 0 else w3 ** pow2[n % 9] for n in range(9)]
chibar = [c.conjugate() for c in chi]
chi0 = [mpc(0) if n % 3 == 0 else mpc(1) for n in range(9)]
omega = lambda p: 1 if p == 3 else (3 if p % 9 in (1, 8) else 0)
def Lval(s, ch): return dirichlet(s, ch)
def P_chi(k):  # sum over primes of chi(p) p^{-k}, k >= 2
    tot = mpc(0); j = 1
    while True:
        mu = mobius(j)
        if mu:
            chj = [chi0[n] if j % 3 == 0 else (chi[n] if j % 3 == 1 else chibar[n]) for n in range(9)]
            term = mpf(mu) / j * log(Lval(j * k, chj)); tot += term
        j += 1
        if j * k > 400: break
    return tot
def P_all(k):  # prime zeta function
    return nsum(lambda j: mobius(int(j)) / j * log(zeta(j * k)), [1, 400 // k]) if False else sum(mpf(mobius(j)) / j * log(zeta(j * k)) for j in range(1, 400 // k + 1) if mobius(j))
def P_split(k): return (P_all(k) + 2 * re(P_chi(k))) / 3 - mpf(3) ** (-k) / 3
def primes_upto(n):
    s = bytearray([1]) * (n + 1); s[0] = s[1] = 0
    for i in range(2, int(n ** .5) + 1):
        if s[i]: s[i*i::i] = bytearray(len(range(i*i, n + 1, i)))
    return [p for p in range(2, n + 1) if s[p]]
# power series of the three local factors at split primes (omega = 3) in v = 1/p, as functions; we need log g(p) = sum_k e_k p^{-k}
# get e_k numerically by series expansion with mpmath taylor in v
from mpmath import taylor
KMAX = 24
def coeffs(g):  # g(v) with v = 1/p; returns e_k for k = 1..KMAX of log g
    c = taylor(lambda v: log(g(v)), 0, KMAX); return c
gA = lambda v: 1 - 9 * v * v / (1 - 3 * v) ** 2
gD = lambda v: 1 + 3 * v * v / (1 - 6 * v)
gC = lambda v: (1 - 3 * v) / ((1 - v) ** 3)          # split: (1-3/p)/((1-1/p)(1-chi/p)(1-chibar/p)) with chi=chibar=1
gCi = lambda v: (1 - v) ** 2 / ((1 - v) * (1 - w3 * v) * (1 - w3.conjugate() * v))  # inert: omega=0: 1/((1-1/p)(1-chi/p)(1-chibar/p)) * (1-0)... 
# NOTE: at inert primes chi(p)+chibar(p) = -1, so (1-chi v)(1-chibar v) = 1 + v + v^2 and the C-factor is 1/((1-v)(1+v+v^2)) = 1/(1-v^3).
def tail_split(g, P0):  # sum_{p>P0, split} log g(1/p)
    e = coeffs(g); pr = primes_upto(P0)
    tot = mpf(0)
    for k in range(2, KMAX + 1):
        if abs(e[k]) < mpf(10) ** -60: continue
        Pk = P_split(k) - sum(mpf(p) ** (-k) for p in pr if omega(p) == 3)
        tot += e[k] * Pk
    return tot
results = {}
for P0 in (200000, 1000000):
    pr = primes_upto(P0)
    logA = log(mpf(3) / 4) + sum(log(gA(mpf(1) / p)) for p in pr if omega(p) == 3) + tail_split(gA, P0)
    logDoverA = log(mpf(4) / 3) + sum(log(gD(mpf(1) / p)) for p in pr if omega(p) == 3) + tail_split(gD, P0)
    # C(f): 1/(L(1,chi)L(1,chibar)) * prod_p R_p; R_p = (1-omega/p)/((1-1/p)(1-chi/p)(1-chibar/p)); p=3: (1-1/3)/(1-1/3) = 1
    # split: R = (1-3v)/(1-v)^3 ; inert: R = (1-0)/((1-v)(1+v+v^2)) = 1/(1-v^3) ; tail of inert part via P_inert(k) = P_all(k) - P_split(k) - 3^{-k}
    logR = sum(log(gC(mpf(1) / p)) for p in pr if omega(p) == 3) + sum(-log(1 - mpf(p) ** (-3)) for p in pr if omega(p) == 0)
    logR += tail_split(gC, P0)
    eI = taylor(lambda v: -log(1 - v ** 3), 0, KMAX)
    for k in range(3, KMAX + 1, 3):
        Pk_inert = P_all(k) - P_split(k) - mpf(3) ** (-k) - sum(mpf(p) ** (-k) for p in pr if omega(p) == 0)
        logR += eI[k] * Pk_inert
    # L(1,chi) for non-principal chi mod q: -(1/q) sum_a chi(a) psi(a/q)  (mpmath's dirichlet() cannot be used at s = 1)
    from mpmath import digamma
    L1chi = -sum(chi[a] * digamma(mpf(a) / 9) for a in range(1, 9)) / 9
    L1 = L1chi * L1chi.conjugate()
    # independent check of C(f): direct conditionally convergent product over ALL primes <= P0
    Cdirect = exp(sum(log(1 - mpf(omega(p)) / p) - log(1 - mpf(1) / p) for p in pr))
    C = exp(logR) / re(L1)
    results[P0] = dict(A0=exp(logA), Df1=exp(logA + logDoverA), C=C, L1chiL1chibar=re(L1))
    print(f"P0={P0}: A0 = {exp(logA)}\n           D_f(1) = {exp(logA+logDoverA)}\n           C(f) = {C}   (L(1,chi)L(1,chibar) = {re(L1)}, |Im| = {abs(L1.imag)}; direct product to P0: {Cdirect})")
a, b = results[200000], results[1000000]
print("agreement between the two cut-offs:", {k: float(abs(a[k] - b[k])) for k in ("A0", "Df1", "C")})
json.dump({k: str(v) for k, v in b.items()}, open("research/paper-II/data/constants-cubic.json", "w"), indent=1)
