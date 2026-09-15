"""two-halves.py — F24 test of PROOFS-uniform.md §4: split the dilated Weyl sum T^{(u)}_k(X) = Σ_{n≤X} Σ_x e(kx/n) into the
GOOD half (|r'| < |p|) and the BAD half (|p| < |r'|), where (p, r') is the first column of the matrix carrying the reduced
representative of the class of Q̃ = [n, 2u²x, u²(u²x²−D)/n] (disc 4u²D) to Q̃. Prints both halves / √X on dyadic blocks.
    python research/explore/two-halves.py D X k u1 u2 ...
"""
import sys, math, importlib.util
sys.argv_b = sys.argv; sys.argv = [sys.argv[0]]
spec = importlib.util.spec_from_file_location("hop", "research/explore/hecke-oldform-predict.py"); hop = importlib.util.module_from_spec(spec); spec.loader.exec_module(hop)
sys.argv = sys.argv_b
D = int(sys.argv[1]); X = int(sys.argv[2]); k = int(sys.argv[3]); us = [int(v) for v in sys.argv[4:]]
# roots via smallest-prime-factor sieve + CRT (as in weyl-dilated.py)
spf = list(range(X+1))
for i in range(2, int(X**0.5)+1):
    if spf[i] == i:
        for j in range(i*i, X+1, i):
            if spf[j] == j: spf[j] = i
def sqrt_mod_p(a, p):
    a %= p
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
cache = {}
def roots(pj, p):
    if pj in cache: return cache[pj]
    if pj == p: R = sqrt_mod_p(D, p)
    else:
        R = []
        for r in roots(pj//p, p):
            inv = pow(2*r % pj, -1, pj); R.append((r - (r*r - D)*inv) % pj)
    cache[pj] = R; return R
def pf(n):
    out, q = set(), 2
    while q*q <= n:
        while n % q == 0: out.add(q); n //= q
        q += 1
    if n > 1: out.add(n)
    return out
blocks = [X>>3, X>>2, X>>1, X+1]
for u in us:
    up = pf(u); good = bad = 0.0; sup = {"good":[0]*4, "bad":[0]*4}; nb = 0; ng = 0
    for n in range(2, X+1):
        m, fac = n, []
        while m > 1:
            p = spf[m]; pj = 1
            while m % p == 0: m //= p; pj *= p
            fac.append((p, pj))
        if any(p == 2 or D % p == 0 or p in up for p, _ in fac): continue
        R = [0]; mod = 1; ok = True
        for p, pj in fac:
            Rp = roots(pj, p)
            if not Rp: ok = False; break
            inv = pow(mod, -1, pj); R = [(r + mod*((rp - r)*inv % pj)) % (mod*pj) for r in R for rp in Rp]; mod *= pj
        if not ok: continue
        ub = pow(u % n, -1, n)
        for r in R:
            x = (ub*r) % n
            a, b, c = n, 2*u*u*x, u*u*((u*u*x*x - D)//n)
            red, M = hop.reduce_form(a, b, c)          # red = Q̃∘M ; Q̃ = red∘M^{-1}, first column of M^{-1} = (M22, -M21)
            p1, r1 = M[1][1], -M[1][0]
            assert red[0]*p1*p1 + red[1]*p1*r1 + red[2]*r1*r1 == n
            val = math.cos(2*math.pi*k*x/n)
            if abs(r1) < abs(p1): good += val; ng += 1
            else: bad += val; nb += 1
        if n >= blocks[0]:
            bi = next(i for i, B in enumerate(blocks) if n < B)
            for name, v in (("good", good), ("bad", bad)):
                sup[name][bi] = max(sup[name][bi], abs(v)/math.sqrt(n))
    print(f"u={u:>6}: pairs good {ng:>6} bad {nb:>6} | max|T_good|/sqrt(x): {' '.join(f'{v:6.3f}' for v in sup['good'])} | max|T_bad|/sqrt(x): {' '.join(f'{v:6.3f}' for v in sup['bad'])} | final good {good/math.sqrt(X):+.3f} bad {bad/math.sqrt(X):+.3f}   X^(1/6)={X**(1/6):.1f} X^(1/4)={X**0.25:.1f}", flush=True)
