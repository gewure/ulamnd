"""weyl-dilated.py — F24 test for Task B2 of PLAN-uniformity.md: the dilated Hooley sums
    T^{(u)}_k(x) = Σ_{d ≤ x, (d,2Du)=1} Σ_{r² ≡ D (d)} e(k ū r / d)        (all d, not only squarefree; ū = u^{-1} mod d),
i.e. the Weyl sums of the roots of u²x² ≡ D (mod d) (paper IV §sec:hooley has u = 1: T_1(X)/√X bounded, ≤ 0.56 for D = −4).
Question: is sup_x |T^{(u)}_k(x)|/√x bounded UNIFORMLY in u, including u ≫ x?  One enumeration of (d, r) serves all u.
    python research/explore/weyl-dilated.py D X k u1 u2 ...     e.g. -4 300000 1 1 2 3 7 101 1009 10007 1000003
Prints, per u, max_{x in dyadic block} |T(x)|/√x for blocks [X/32,X/16],…,[X/2,X], and T(X)/√X.
"""
import sys, math, cmath
D = int(sys.argv[1]); X = int(sys.argv[2]); k = int(sys.argv[3]); us = [int(v) for v in sys.argv[4:]]
spf = list(range(X+1))
for i in range(2, int(X**0.5)+1):
    if spf[i] == i:
        for j in range(i*i, X+1, i):
            if spf[j] == j: spf[j] = i
def sqrt_mod_p(a, p):
    a %= p
    if p == 2: return [a]
    if pow(a, (p-1)//2, p) != 1: return []
    if p % 4 == 3: r = pow(a, (p+1)//4, p); return [r, p-r]
    q, s = p-1, 0
    while q % 2 == 0: q//=2; s+=1
    z = 2
    while pow(z, (p-1)//2, p) != p-1: z += 1
    m, c, t, r = s, pow(z,q,p), pow(a,q,p), pow(a,(q+1)//2,p)
    while t != 1:
        i, tt = 0, t
        while tt != 1: tt = tt*tt % p; i += 1
        b = pow(c, 1 << (m-i-1), p); m, c, t, r = i, b*b % p, t*b*b % p, r*b % p
    return [r, p-r]
roots_pk = {}   # roots of r^2 ≡ D mod p^j (Hensel), for odd p ∤ D
def roots(pj, p):
    if pj in roots_pk: return roots_pk[pj]
    if pj == p: R = sqrt_mod_p(D, p)
    else:
        R = []
        for r in roots(pj//p, p):      # lift: r' = r - (r^2 - D)/(2r) mod pj
            inv = pow(2*r % pj, -1, pj); R.append((r - (r*r - D)*inv) % pj)
    roots_pk[pj] = R; return R
T = {u: 0.0 for u in us}; out = {u: [0.0]*6 for u in us}; blocks = [X>>5, X>>4, X>>3, X>>2, X>>1, X+1]
def pf(n):
    out, q = set(), 2
    while q * q <= n:
        while n % q == 0: out.add(q); n //= q
        q += 1
    if n > 1: out.add(n)
    return out
uprimes = {u: pf(u) for u in us}
for d in range(1, X+1):
    # factor d
    n, fac = d, []
    while n > 1:
        p = spf[n]; pj = 1
        while n % p == 0: n //= p; pj *= p
        fac.append((p, pj))
    if any(p == 2 or D % p == 0 for p, _ in fac): continue
    # roots mod d by CRT
    R = [0]; mod = 1
    ok = True
    for p, pj in fac:
        Rp = roots(pj, p)
        if not Rp: ok = False; break
        inv = pow(mod, -1, pj); newR = []
        for r in R:
            for rp in Rp: newR.append((r + mod * ((rp - r) * inv % pj)) % (mod*pj))
        R = newR; mod *= pj
    if not ok or d == 1: continue
    for u in us:
        if any(d % p == 0 for p in uprimes[u]): continue
        ub = pow(u % d, -1, d) if d > 1 else 0
        T[u] += sum(math.cos(2*math.pi*k*((ub*r) % d)/d) for r in R)    # real by symmetry
    if d >= blocks[0]:
        b = next(i for i, B in enumerate(blocks) if d < B) if d < X else 4
        for u in us:
            v = abs(T[u]) / math.sqrt(d)
            if v > out[u][b]: out[u][b] = v
print(f"D={D} X={X} k={k}: max |T^(u)_k(x)|/sqrt(x) on dyadic blocks [X/32,X/16] ... [X/2,X];  T(X)/sqrt(X)")
for u in us:
    print(f"u={u:>8}: " + " ".join(f"{v:6.3f}" for v in out[u][:5]) + f"   final {T[u]/math.sqrt(X):+7.3f}")
