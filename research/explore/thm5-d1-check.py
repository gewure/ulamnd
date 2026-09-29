# Sanity check of the corrected exact identity behind paper I, Theorem 5, for f(t) = t (so C(f) = 1,
# omega = 1, nu(d,h) = [d | h], c^f_q(h) = Ramanujan sum c_q(h), S(h) = sum_{q sqfree} c_q(h)/phi(q)^2).
# Claim (derived 30 Sep, to be settled by Lean):
#   sum_{h<=H} (H-h)(S(h) - 1) = sum_{d>=2} W(d) B_d(0) + (H/2)(1 - W(1)),   W(1) = 0 here,
# whereas the paper's display has no (H/2)(1 - W(1)) term.  Pure Python, no dependencies.
from math import gcd
Q = 300000; D = 300000; H = 12
# smallest prime factor sieve
spf = list(range(Q + 1))
for i in range(2, int(Q ** 0.5) + 1):
    if spf[i] == i:
        for j in range(i * i, Q + 1, i):
            if spf[j] == j: spf[j] = i
def factor(n):
    f = {}
    while n > 1:
        p = spf[n]; f[p] = f.get(p, 0) + 1; n //= p
    return f
mu = [0] * (Q + 1); phi = [0] * (Q + 1); mu[1] = 1; phi[1] = 1
for n in range(2, Q + 1):
    f = factor(n)
    mu[n] = 0 if any(k > 1 for k in f.values()) else (-1) ** len(f)
    ph = n
    for p in f: ph = ph // p * (p - 1)
    phi[n] = ph
def c_q(q, h):  # Ramanujan sum: sum_{d | gcd(q,h)} d mu(q/d)
    g = gcd(q, h); s = 0; d = 1
    while d * d <= g:
        if g % d == 0:
            s += d * mu[q // d]
            if d * d != g: s += (g // d) * mu[q // (g // d)]
        d += 1
    return s
def S(h):
    return sum(c_q(q, h) / phi[q] ** 2 for q in range(1, Q + 1) if mu[q] != 0)
Sh = [S(h) for h in range(1, H + 1)]
lhs = sum((H - h) * (Sh[h - 1] - 1) for h in range(1, H + 1))
primes = [p for p in range(3, 20000) if all(p % r for r in range(2, int(p ** 0.5) + 1))]
Podd = 1.0
for p in primes: Podd *= 1 - 1 / (p - 1) ** 2
def W(d):  # W(d) = mu(d)^2 d/phi(d)^2 prod_{p not | d}(1 - 1/(p-1)^2); the p = 2 factor is 0, so W(odd d) = 0
    if d % 2 == 1 or mu[d] == 0: return 0.0
    pr = Podd
    for p in factor(d):
        if p > 2: pr /= (1 - 1 / (p - 1) ** 2)
    return d / phi[d] ** 2 * pr
def B(d): return sum(H - h for h in range(1, H + 1) if h % d == 0) - H * H / (2 * d)
rhs_paper = sum(W(d) * B(d) for d in range(2, D + 1))
rhs_corr = rhs_paper + (H / 2) * (1 - W(1))
print(f"H={H}  LHS = {lhs:.4f}   paper RHS (sum over d>=2) = {rhs_paper:.4f}   corrected RHS = {rhs_corr:.4f}   [W(1) = {W(1)}]")
print("S(h), h=1..12:", " ".join(f"{x:.3f}" for x in Sh))
