"""sharp-sum-u.py — direct test of (T'') of PLAN-uniformity.md: does the SHARP sum
    S_u(t) = Σ_{h≤t} F_u(Q_u(h)) − t·E_u,   F_u(n) = Π_{p|n admissible}(1+λ(p)/p) − 1,  Q_u(h) = u²h² − D,
tend to 0, and how does sup_{t∈[T,2T]} |S_u(t)| depend on u (up to u ≫ t)?  Admissible p: split, p ∤ 2Du.
E_u = Π_{p split, p∤2Du}(1 + 2λ(p)/p²) − 1 (Euler product to 10^7, tail bounded).  Factorisation by trial division + Pollard–Brent.
    python research/explore/sharp-sum-u.py D T u1 u2 ...      e.g.  -4 20000 1 2 3 5 7 11 31 101 1009 10007
Output per u: sup|S_u| on dyadic blocks [T/8,T/4], [T/4,T/2], [T/2,T], the value S_u(T), and the mean over [T/2,T].
"""
import sys, math, random
from math import gcd
D = int(sys.argv[1]); T = int(sys.argv[2]); us = [int(v) for v in sys.argv[3:]]

def is_prime(n):
    if n < 2: return False
    for p in (2,3,5,7,11,13,17,19,23,29,31,37):
        if n % p == 0: return n == p
    d = n-1; s = 0
    while d % 2 == 0: d//=2; s+=1
    for a in (2,3,5,7,11,13,17,19,23,29,31,37):
        x = pow(a,d,n)
        if x in (1,n-1): continue
        for _ in range(s-1):
            x = x*x % n
            if x == n-1: break
        else: return False
    return True
def rho(n):
    if n % 2 == 0: return 2
    while True:
        y, c, m = random.randrange(1,n), random.randrange(1,n), 128; g = r = q = 1
        while g == 1:
            x = y
            for _ in range(r): y = (y*y+c) % n
            k = 0
            while k < r and g == 1:
                ys = y
                for _ in range(min(m, r-k)): y = (y*y+c) % n; q = q*abs(x-y) % n
                g = gcd(q, n); k += m
            r *= 2
        if g == n:
            g = 1
            while g == 1: ys = (ys*ys+c) % n; g = gcd(abs(x-ys), n)
        if g != n: return g
SMALL = [p for p in range(2, 20000) if is_prime(p)]
def factor(n):
    fs = []
    for p in SMALL:
        if p*p > n: break
        if n % p == 0:
            fs.append(p)
            while n % p == 0: n //= p
    if n > 1:
        stack = [n]
        while stack:
            m = stack.pop()
            if is_prime(m): fs.append(m)
            else:
                g = rho(m); stack += [g, m//g]
    return set(fs)
def kron(D, p):
    if p == 2: return 0 if D % 2 == 0 else (1 if D % 8 in (1,7) else -1)
    return 0 if D % p == 0 else (1 if pow(D % p, (p-1)//2, p) == 1 else -1)
lam = lambda p: p/(p-4)
# E_u: primes to 1e7 by sieve
N = 10**7; sieve = bytearray([1])*(N+1); sieve[0]=sieve[1]=0
for i in range(2, int(N**0.5)+1):
    if sieve[i]: sieve[i*i::i] = bytearray(len(sieve[i*i::i]))
primes = [i for i in range(N+1) if sieve[i]]
def E_of(u):
    prod = 1.0
    for p in primes:
        if p > 4 and kron(D, p) == 1 and u % p and (2*D) % p:
            prod *= 1 + 2*lam(p)/p**2
    return prod - 1   # tail beyond 1e7: < Σ_{p>1e7} 2/p² ≈ 1.2e-8
print(f"D={D} T={T}; blocks [T/8,T/4],[T/4,T/2],[T/2,T]: sup|S_u| ; S_u(T) ; mean S_u over [T/2,T]", flush=True)
for u in us:
    E = E_of(u); S = 0.0; sup = [0.0,0.0,0.0]; acc = 0.0; cnt = 0
    for h in range(1, T+1):
        n = u*u*h*h - D
        F = 1.0
        for p in factor(n):
            if p > 4 and kron(D, p) == 1 and u % p and (2*D) % p: F *= 1 + lam(p)/p
        S += F - 1 - E
        if h >= T//8:
            b = 0 if h < T//4 else (1 if h < T//2 else 2); sup[b] = max(sup[b], abs(S))
        if h >= T//2: acc += S; cnt += 1
    print(f"u={u:>6}: E_u={E:.6f}  sup|S| = {sup[0]:.3f} {sup[1]:.3f} {sup[2]:.3f}   S_u(T)={S:+.4f}   mean={acc/cnt:+.4f}", flush=True)
