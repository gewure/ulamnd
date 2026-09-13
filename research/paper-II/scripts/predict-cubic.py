"""predict-cubic.py — exact Laurent coefficients at the DOUBLE pole s = -2/3 for f = t^3 - 3t - 1 (paper II, ERRATA 12 test).
G_m(s) = m! zeta(s) D_f(s) / (s (s+1)...(s+m)),  D_f(s) = A0 * prod_{N<=K} L(N(s+1), Psi_N) * prod_p M_p(s),
L(Nw, Psi_N) = zeta(Nw)^{a_N} |L(Nw, chi)|^{2 b_N} (chi the cubic character mod 9), a_N = <Psi_N,1>.
At w = 1/3: L(3w, Psi_3) = zeta(3w)^2 |L(3w,chi)|^6 with zeta(3w)^2 = 1/(9 (w-1/3)^2) + 2 gamma/(3 (w-1/3)) + ...
Residue of G_m(s) x^{s+m}:  x^{m-2/3} (a log x + b),  a = R(s0)/9,  b = R'(s0)/9 + 2 gamma R(s0)/3,  R = G_m without zeta(3w)^2.
Consistency check (F9): the same machinery must reproduce D_f(1) = 0.9328820096102711... at s = 1.
   python research/paper-II/scripts/predict-cubic.py
"""
import json
from mpmath import mp, mpf, mpc, zeta, dirichlet, digamma, gamma, euler, pi, exp, log, diff, factorial, re
mp.dps = 30
import sys
K = int(sys.argv[1]) if len(sys.argv) > 1 else 11; P0 = 200000
w3 = exp(2j*pi/3); pow2 = {pow(2, k, 9): k for k in range(6)}
chi = [mpc(0) if n % 3 == 0 else w3**pow2[n % 9] for n in range(9)]
def Lchi(s):  # L(s, chi), s != 1 via mpmath; s == 1 via digamma
    if abs(s - 1) < mpf('1e-20'): return -sum(chi[a]*digamma(mpf(a)/9) for a in range(1, 9))/9
    return dirichlet(s, chi)
def zetaK(w): return zeta(w)*abs(Lchi(w))**2
def mobius(n):
    r = 1; d = 2
    while d*d <= n:
        if n % d == 0:
            n //= d
            if n % d == 0: return 0
            r = -r
        d += 1
    return -r if n > 1 else r
def PsiE(N): return sum(mobius(j)*(-1)**(N//j+1)*mpf(3)**(N//j) for j in range(1, N+1) if N % j == 0)/N
def PsiG(N): return sum(mobius(j)*(-1)**(N//j+1)*mpf(3)**(N//j) for j in range(1, N+1) if N % j == 0 and j % 3 == 0)/N
ab = {N: ((PsiE(N)+2*PsiG(N))/3, (PsiE(N)-PsiG(N))/3) for N in range(1, K+1)}
print("a_N, b_N:", {N: (int(a), int(b)) for N, (a, b) in ab.items()})
def Lglobal(N, w):  # L(Nw, Psi_N) for N >= 2 (N = 3 EXCLUDED at the pole: handled separately)
    a, b = ab[N]; return zeta(N*w)**a * abs(Lchi(N*w))**(2*b)
omega = lambda p: 1 if p == 3 else (3 if p % 9 in (1, 8) else 0)
def primes_upto(n):
    s = bytearray([1])*(n+1); s[0] = s[1] = 0
    for i in range(2, int(n**.5)+1):
        if s[i]: s[i*i::i] = bytearray(len(range(i*i, n+1, i)))
    return [p for p in range(2, n+1) if s[p]]
PR = primes_upto(P0)
def Mprod(s, Nmax=K, P=P0):
    w = s + 1; tot = mpf(0)
    for p in PR:
        if p > P: break
        v = mpf(p)**(-w); om = omega(p)
        F = 1 + (mpf(om)/(p-2*om))*mpf(p)**(-s) if om else mpf(1)
        Linv = mpf(1)
        for N in range(1, Nmax+1):
            a, b = ab[N]
            if om == 3: Linv *= (1 - v**N)**(a+2*b)
            elif om == 0: Linv *= (1 - v**N)**a * (1 + v**N + v**(2*N))**b
            else: Linv *= (1 - v**N)**a
        tot += log(F*Linv)
    return exp(tot)
cst = json.load(open("research/paper-II/data/constants-cubic.json")); A0 = mpf(cst["A0"])
# ---- F9 check at s = 1 (w = 2): D_f(1) = A0 * zeta_K(2) * prod_{N=2..K} L(2N, Psi_N) * M(1)
D1 = A0*zetaK(2)*mp.fprod(Lglobal(N, mpf(2)) for N in range(2, K+1))*Mprod(mpf(1))
print(f"check D_f(1): machinery {D1}  vs constants-cubic {cst['Df1'][:32]}   (M(1) with P0/2: {Mprod(mpf(1), P=P0//2)})")
# ---- Laurent data at s0 = -2/3
s0 = -mpf(2)/3
def R(s, m):  # G_m(s) with zeta(3(s+1))^2 removed (the rest of L(3w,Psi_3) = |L(3w,chi)|^6 kept)
    w = s + 1
    val = factorial(m)*zeta(s)*A0*zetaK(w)*Lglobal(2, w)*abs(Lchi(3*w))**6*mp.fprod(Lglobal(N, w) for N in range(4, K+1))*Mprod(s)
    return val/mp.fprod(s + j for j in range(m+1))
for m in (2, 3):
    Rm = R(s0, m); Rp = diff(lambda s: R(s, m), s0)
    a = Rm/9; b = Rp/9 + 2*euler*Rm/3
    print(f"m={m}: a_pred (coefficient of x^(m-2/3) log x) = {a}   b_pred = {b}")
print("M(s0) convergence check: P0 vs P0/2:", Mprod(s0), Mprod(s0, P=P0//2))
