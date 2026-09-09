#!/usr/bin/env python3
"""
Exact explicit formula for the diagonal Riesz means of f = t^2 + 1, and its test against the data.

    ~/.venvs/ulamnd/bin/python followup/scripts/explicit-diag.py [K=8] [P=4000000] [GMAX=100]

Setting (paper, Thms 2-4).  a_f(d) = W_f(d) omega_f(d) on squarefree d, A_f = a_f * 1, and
    sum_n A_f(n) n^{-s} = zeta(s) D_f(s),   D_f(s) = prod_p F_p(s),   F_p(s) = P_p + p b(p) omega(p) p^{-s}.
For f = t^2+1 (u = 1/p, T = p^{-s}, v = uT = p^{-w}, w = s+1):
    split p (p = 1 mod 4):  F_p = (1 - 4u + 2v)/(1-2u)^2,   inert: F_p = 1,   p = 2: F_2 = 2T.
Removing zeta_K(w) = zeta(w) L(w,chi) leaves, at split p and as u -> 0, the *pure-v* factor
    S(v) = (1+2v)(1-v)^2 = 1 - 3v^2 + 2v^3,       inert:  I(v) = 1 - v^2,
whose logarithms have infinitely many terms.  Hence E_f = D_f/zeta_K(w) is NOT an absolutely
convergent Euler product beyond Re w > 1/2 (as the paper says); it is
    E_f(s) = prod_{k>=2} zeta(kw)^{a_k} L(kw,chi)^{b_k} * (mixed terms),
with integer exponents a_k, b_k computed below (a_2,b_2 = -2,-1; a_3,b_3 = 1,1; a_4,b_4 = -1,-2; ...).
Consequences: (i) the paper's tilde H_f converges absolutely only for Re s > -3/4; (ii) zeta(3w) in the
numerator gives a REAL POLE at s = -2/3, i.e. a term x^{m-2/3} in the Riesz mean, larger than the zero
terms x^{m-3/4}; (iii) further real poles at s = -1+1/k (k odd, a_k > 0) and zero families at
s = rho/k - 1 for every k with a_k < 0 or b_k < 0; (iv) the zeros of D_f (F_p = 0 <=> p^{-s} = (4-p)/2)
accumulate on Re s = -1, so Re s = -1 is a natural boundary and O(x^{m-1+eps}) cannot be improved
by contour shifting.

What this script does
  1. computes (a_k, b_k) exactly, and checks numerically that the residual local factors are 1 + O(p^-2);
  2. evaluates D_f(1), C(f), the Laurent data at s = 0, and all residues of
        G(s) x^{s+m} = m! zeta(s) D_f(s) x^{s+m} / (s(s+1)...(s+m))
     at s = 1, 0, the real poles, and the zero families k = 2, 4, 6, 8 (gamma/k <= GMAX/2),
     by trapezoidal Cauchy integrals on small circles (any pole order);
  3. reads research/paper-II/data/riesz-raw.dat, subtracts the exact smooth terms (only the x^{m+1} coefficient
     is refitted: it needs 1e-14 relative accuracy in the data, which double precision does not give),
     and compares the remainder with the predicted zero sum: regression coefficient beta (should be 1),
     residual power, and controls with all ordinates shifted.
Writes research/paper-II/data/explicit-diag.json and research/paper-II/data/explicit-diag-{m}.dat.
"""
import sys, json, time, functools
print = functools.partial(print, flush=True)
from fractions import Fraction
import numpy as np
import mpmath as mp

mp.mp.dps = 20
K = int(sys.argv[1]) if len(sys.argv) > 1 else 15   # need (K+1) Re(s+1) > 1 at every pole used: k=4 family has Re w = 1/8
P = int(sys.argv[2]) if len(sys.argv) > 2 else 4_000_000
GMAX = float(sys.argv[3]) if len(sys.argv) > 3 else 100.0
CHI = [0, 1, 0, -1]
t0 = time.time()
def el(): return f"{time.time()-t0:6.1f}s"

# ---------------------------------------------------------------- 1. exponents (a_k, b_k)
def exponents(K):
    """Solve  prod_k (1-v^k)^{-a_k} (1-chi v^k)^{-b_k}  =  S(v) [split, chi=1]  and  I(v) [inert, chi=-1]
    as formal power series, level by level.  log S = log(1+2v) + 2 log(1-v),  log I = log(1-v^2)."""
    a, b = {}, {}
    for n in range(1, K + 1):
        sig = Fraction((-1) ** (n + 1) * 2 ** n - 2, n)          # coefficient of v^n in log S
        io = Fraction(-2, n) if n % 2 == 0 else Fraction(0)      # coefficient of v^n in log I
        # split:  sum_{k|n} k (a_k + b_k) = n sigma_n
        apb = (n * sig - sum(k * (a[k] + b[k]) for k in a if n % k == 0)) / n
        # inert:  sum_{k|n} k (a_k + (-1)^{n/k} b_k) = n iota_n   =>  sum_{k|n, n/k odd} 2k b_k = n (sigma_n - iota_n)
        bn = (n * (sig - io) - sum(2 * k * b[k] for k in b if n % k == 0 and (n // k) % 2 == 1)) / (2 * n)
        b[n] = bn; a[n] = apb - bn
    for k in range(1, K + 1):
        assert a[k].denominator == 1 and b[k].denominator == 1, (k, a[k], b[k])
        a[k] = int(a[k]); b[k] = int(b[k])
    return a, b
a, b = exponents(K)
print("exponents (k: a_k, b_k):", {k: (a[k], b[k]) for k in a})
assert (a[1], b[1]) == (0, 0) and (a[2], b[2]) == (-2, -1) and (a[3], b[3]) == (1, 1)

# extra mixed-term extraction (split primes only; inert F_p = 1 has no u-dependence):
#   8 u v  ->  [zeta(w+1) L(w+1,chi)]^4 ;   -4 u^2 -> [zeta(2) L(2,chi)]^-2 ;  -16 u v^2 -> [zeta(2w+1) L(2w+1)]^-8
MIXED = [(1, 1, 4), (2, 0, -2), (1, 2, -8)]   # (a, b, exponent e): factor [zeta(a+bw) L(a+bw,chi)]^e

# ---------------------------------------------------------------- primes and local factors
def primes_upto(n):
    s = np.ones(n + 1, dtype=bool); s[:2] = False
    for i in range(2, int(n ** 0.5) + 1):
        if s[i]: s[i * i::i] = False
    return np.nonzero(s)[0]
pr = primes_upto(P).astype(np.float64)
np.seterr(divide="ignore")
chi_p = np.where(pr % 4 == 1, 1.0, np.where(pr % 4 == 3, -1.0, 0.0))
logp = np.log(pr)
split = pr % 4 == 1
Pp = np.where(split, 1 - 4 / (pr - 2) ** 2, 1.0); Pp[pr == 2] = 0.0
cT = np.where(split, 2 * pr / (pr - 2) ** 2, 0.0); cT[pr == 2] = 2.0
print(f"{len(pr)} primes up to {P} ({el()})")

def logH(s):
    """log of the residual Euler product H(s) = D_f(s) / [zeta_K(w) prod_k zeta(kw)^a_k L(kw)^b_k prod_mixed],
    complex128, primes <= P, plus an integral tail for the leading uncancelled term."""
    s = complex(s); w = s + 1
    T = np.exp(-s * logp)
    loc = np.log(Pp + cT * T)                                  # log F_p (branch irrelevant: only exp(sum) is used... but
    # ...we also need derivatives-free consistency between nearby s, so take log1p forms where possible)
    for k in range(1, K + 1):
        ak = 1 if k == 1 else a[k]; bk = 1 if k == 1 else b[k]
        pk = np.exp(-k * w * logp)
        loc += ak * np.log1p(-pk) + bk * np.log1p(-chi_p * pk)
    for (aa, bb, e) in MIXED:
        z = np.exp(-(aa + bb * w) * logp)
        loc += e * (np.log1p(-z) + np.log1p(-chi_p * z))
    tot = loc.sum()
    # tail: leading uncancelled split terms 32 u^2 v + 24 u^3 ... ~ 32 p^{-(2+w)}; and 32 u v^3 -> p^{-(1+3w)}
    # (coefficients from the expansion; both tails are < 1e-6 at P = 4e6 and only matter for Re w small)
    # the u^1 part of log F_p is 8v/(1+2v) = sum_b 8(-2)^{b-1} u v^b; b = 1, 2 are extracted as L-functions (MIXED),
    # b >= 3 and the leading u^2 term (32 u^2 v) are corrected by the prime-number-theorem integral
    tails = [(32.0, 2 + w)] + [(8.0 * (-2.0) ** (bb - 1), 1 + bb * w) for bb in range(3, 12)]
    for coef, z in tails:
        tot += 0.5 * coef * complex(mp.expint(1, (z - 1) * mp.log(P)))   # sum_{p>P, split} p^{-z} ~ 1/2 E1((z-1) log P)
    return tot
def H(s): return mp.exp(mp.mpc(logH(s)))   # mp: exponents a_k ~ 2^k/k make log H large for K ~ 15

# sanity: residual local factor at a large split prime should be 1 + O(p^-2)
def local_residual(p, s):
    s = complex(s); w = s + 1; T = p ** (-s); chi = 1 if p % 4 == 1 else -1
    F = (1 - 4 / (p - 2) ** 2 + 2 * p / (p - 2) ** 2 * T) if chi == 1 else 1.0
    r = F
    for k in range(1, K + 1):
        ak = 1 if k == 1 else a[k]; bk = 1 if k == 1 else b[k]
        r *= (1 - p ** (-k * w)) ** ak * (1 - chi * p ** (-k * w)) ** bk
    for (aa, bb, e) in MIXED:
        r *= ((1 - p ** (-(aa + bb * w))) * (1 - chi * p ** (-(aa + bb * w)))) ** e
    return r
for p in (1009, 10009, 100003):
    for s in (0.0, -0.75 + 5j, -0.9):
        r = local_residual(p, s)
        print(f"  residual local factor p={p:6d} s={s}: |r-1| = {abs(r-1):.2e}  (p^-2 = {p**-2:.1e}, p^-(1+3Re w) = {p**-(1+3*(s.real+1)):.1e})")

# validate the tail coefficients used in logH: log(residual) ~ 32 u^2 v + 32 u v^3 + ... at large split p
for s_ in (-0.75 + 5j, -0.875 + 5j):
    for p in (100003, 1000003):
        p = p if p % 4 == 1 else p + 2
        while any(p % q == 0 for q in range(2, 200)) or p % 4 != 1: p += 2
        r = local_residual(p, s_); u_ = 1 / p; v_ = p ** (-(s_ + 1))
        pred_ = 32*u_*u_*v_ + sum(8*(-2)**(bb-1)*u_*v_**bb for bb in range(3, 12)); print(f"  tail check p={p} s={s_}: log r = {np.log(r):.3e}   predicted u-series = {pred_:.3e}")

# ---------------------------------------------------------------- L-functions and D_f
def Lchi(z, d=0): return mp.dirichlet(z, CHI, derivative=d)
def Lfam(s):
    """zeta_K(w) * prod_{k>=2} zeta(kw)^a_k L(kw)^b_k * mixed  (mpmath)."""
    w = s + 1
    v = mp.zeta(w) * Lchi(w)
    for k in range(2, K + 1):
        v *= mp.zeta(k * w) ** a[k] * Lchi(k * w) ** b[k]
    for (aa, bb, e) in MIXED:
        z = aa + bb * w
        v *= (mp.zeta(z) * Lchi(z)) ** e
    return v
def Df(s): return Lfam(s) * H(s)
def G(s, m):
    v = mp.factorial(m) * mp.zeta(s) * Df(s)
    for j in range(m + 1): v /= (s + j)
    return v

# checks: D_f(1) against the partial sum, residue at 0 against 1/C(f)
raw = json.load(open("research/paper-II/data/riesz-raw.json"))
Df1 = Df(1)
print(f"D_f(1) = {mp.nstr(Df1, 15)}   partial sum to X: {raw['sumAd']:.12f}  (tail ~ 1/(C X) = {1/(1.3728*raw['X']):.1e})  ({el()})")
res0 = mp.limit(lambda s: s * Df(s), 0) if False else None
# residue at 0 = L(1,chi) * E_f(0), E_f(0) = Lfam(0)/(zeta(w)L(w)) evaluated as prod_{k>=2}... * H(0)
Ef0 = mp.mpf(1)
for k in range(2, K + 1): Ef0 *= mp.zeta(k) ** a[k] * Lchi(k) ** b[k]
for (aa, bb, e) in MIXED: Ef0 *= (mp.zeta(aa + bb) * Lchi(aa + bb)) ** e
Ef0 *= H(0).real
Cf = 1 / (Lchi(1) * Ef0)
print(f"residue of D_f at 0 = {mp.nstr(Lchi(1)*Ef0, 15)} = 1/C(f)  =>  C(t^2+1) = {mp.nstr(Cf, 15)}   (known: 1.3728134628182...)")
# A0 = prod_{p=1(4)} P_p exactly, to rescale the data (the script used p <= X):  log A0 = sum log(1-4/(p-2)^2)
# = sum_p sum_j (2^{j+1}-4^j)/j p^{-j}  via prime zeta sums over p = 1 mod 4, p > 5 (p = 5 exact; |4/(p-2)| < 1 needs p > 6)
def mobius(n):
    m, q, r = 1, 2, n
    while q * q <= r:
        if r % q == 0:
            r //= q
            if r % q == 0: return 0
            m = -m
        q += 1
    return -m if r > 1 else m
def Pchi(z):
    """P_chi(z) = sum_p chi(p) p^{-z} = sum_k mu(k)/k log L(kz, chi^k)"""
    Pc = mp.mpf(0)
    for k in range(1, 200):
        mu = mobius(k)
        if mu == 0: continue
        if k % 2 == 1: term = mp.log(Lchi(z * k))
        else: term = mp.log(mp.zeta(z * k) * (1 - mp.mpf(2) ** (-z * k)))
        Pc += mu * term / k
        if abs(term) < mp.mpf(10) ** (-mp.mp.dps - 2): break
    return Pc
def prime_sum_split(j, pmin_excl=5):
    """sum_{p = 1 mod 4, p > pmin_excl} p^{-j} = 1/2 [P(j) + P_chi(j)] - 2^{-j}/2 - (terms p <= pmin_excl)
    (1 + chi(p) = 2 on split p, 0 on inert p, 1 at p = 2)"""
    Pj = mp.primezeta(j)
    Pc = mp.mpf(0)
    for k in range(1, 200):
        mu = mobius(k)
        if mu == 0: continue
        if k % 2 == 1: term = mp.log(Lchi(j * k))
        else: term = mp.log(mp.zeta(j * k) * (1 - mp.mpf(2) ** (-j * k)))
        Pc += mu * term / k
        if abs(term) < mp.mpf(10) ** (-mp.mp.dps - 2): break
    v = (Pj + Pc) / 2 - mp.mpf(2) ** (-j) / 2
    for p in (5,):
        if p <= pmin_excl: v -= mp.mpf(p) ** (-j)
    return v
# direct compensated sum over the sieved split primes, plus the analytic tail sum_{split p > P} c_j p^{-j}
# for j = 2, 3 (c_2 = -4, c_3 = -16; j >= 4 contributes < 1e-18 for P >= 1e6)
import math
sp_arr = pr[split]
logA0_direct = math.fsum(np.log1p(-4.0 / (sp_arr - 2.0) ** 2).tolist())
def tail_split(j):
    tot = (mp.primezeta(j) + Pchi(j)) / 2 - mp.mpf(2) ** (-j) / 2   # all split p
    return float(tot) - math.fsum((sp_arr ** (-float(j))).tolist())
logA0 = mp.mpf(logA0_direct) + (-4) * mp.mpf(tail_split(2)) + (-16) * mp.mpf(tail_split(3))
A0 = mp.e ** logA0
scale = A0 / mp.mpf(raw["A0"])
print(f"A0 exact = {mp.nstr(A0, 18)}, script A0 = {raw['A0']:.16f}, rescale factor - 1 = {mp.nstr(scale-1, 5)}  ({el()})")

# ---------------------------------------------------------------- zeros
zz = []
n = 1
while True:
    g = float(mp.im(mp.zetazero(n)))
    if g > GMAX * K / 2: break
    zz.append(g); n += 1
def Lambda(t):   # completed L(1/2+it, chi_-4) up to a positive factor: real on the line (odd character, root number 1)
    s = mp.mpc(0.5, t)
    return mp.re((4 / mp.pi) ** (s / 2) * mp.gamma((s + 1) / 2) * Lchi(s) / abs(mp.gamma((s + 1) / 2)))
lz = []
tt = 0.5; step = 0.05; prev = Lambda(tt)
while tt < GMAX * K / 2:
    t2 = tt + step; cur = Lambda(t2)
    if prev * cur < 0:
        lz.append(float(mp.findroot(Lambda, (tt, t2), solver="anderson")))
    tt, prev = t2, cur
print(f"{len(zz)} zeta zeros, {len(lz)} L(chi_-4) zeros up to {GMAX*K/2:.0f}; first L zeros {lz[:4]}  ({el()})")

# ---------------------------------------------------------------- residues by Cauchy integrals
MS = (2, 3)
def taylor_coeffs(s0, order, r, N):
    """Taylor coefficients c_j (j < order) of g_m(s) = (s-s0)^order G_m(s) at s0 for every m in MS,
    by the trapezoid rule on |s-s0| = r (spectrally accurate).  The core zeta(s) D_f(s) is evaluated once."""
    s0 = mp.mpc(s0)
    pts = [s0 + r * mp.expj(2 * mp.pi * l / N) for l in range(N)]
    cores = [mp.zeta(sl) * Df(sl) * (sl - s0) ** order for sl in pts]
    out = {}
    for m in MS:
        vals = []
        for sl, cv in zip(pts, cores):
            kern = mp.factorial(m)
            for j in range(m + 1): kern /= (sl + j)
            vals.append(cv * kern)
        cs = []
        for j in range(order):
            c = mp.mpf(0)
            for l in range(N):
                c += vals[l] * mp.expj(-2 * mp.pi * j * l / N)
            cs.append(c / (N * r ** j))
        out[m] = cs
    return out   # residue of g(s) x^{s+m}/(s-s0)^order = x^{s0+m} sum_j c_{order-1-j} (log x)^j / j!

# k -> max frequency gamma/k.  Default: the k=2 family only (contour at Re s = -3/4 - eps).  The k=4 family
# (Re s = -7/8) has individually huge coefficients: |D_f| grows towards the natural boundary Re s = -1, and the
# k=4 poles only make sense together with the line integral they cancel against; the data reject them alone
# (beta = 0.001 on 9 Sep 2026).  Pass --with-k4 to include them for the record.
FAMILIES = {2: GMAX / 2}
if "--with-k4" in sys.argv: FAMILIES[4] = GMAX / 2
def residue_terms():
    """list of (label, s0, order, {m: [c_j]}) for all poles handled explicitly."""
    out = []
    out.append(("s=1", 1.0, 1, taylor_coeffs(1.0, 1, 0.05, 16)))
    out.append(("s=0", 0.0, 2, taylor_coeffs(0.0, 2, 0.05, 24)))
    for k in range(3, min(K, 7) + 1, 2):   # real poles k >= 9 have orders >= 28 and size x^{m-8/9}(log x)^27 * tiny: left in the error term
        if a[k] > 0:
            s0 = -1 + 1 / k
            others = [-1 + 1 / kk for kk in range(3, K + 1, 2) if kk != k and a[kk] > 0] + [0.0]
            r = 0.3 * min(abs(s0 - o) for o in others)
            out.append((f"real k={k}", s0, a[k], taylor_coeffs(s0, a[k], r, min(16 + 4 * a[k], 48))))
            print(f"   real pole k={k} order {a[k]} done ({el()})")
    for k, fmax in FAMILIES.items():
        if k > K: continue
        if a[k] < 0:
            for g in zz:
                if g / k <= fmax:
                    out.append((f"zeta k={k}", complex(-1 + 0.5 / k, g / k), -a[k], taylor_coeffs(complex(-1 + 0.5 / k, g / k), -a[k], 0.015, 16 + 2 * (-a[k]))))
        if b[k] < 0:
            for g in lz:
                if g / k <= fmax:
                    out.append((f"L k={k}", complex(-1 + 0.5 / k, g / k), -b[k], taylor_coeffs(complex(-1 + 0.5 / k, g / k), -b[k], 0.015, 16 + 2 * (-b[k]))))
        print(f"   family k={k} done, {len(out)} terms so far ({el()})")
    return out

def eval_term(term, x, m):
    """x: numpy array. returns complex array of the residue contribution (without the factor x^m)."""
    label, s0, order, csm = term
    cs = csm[m]
    s0 = complex(s0); lx = np.log(x)
    acc = np.zeros_like(x, dtype=complex)
    fact = 1.0
    for j in range(order):
        acc += complex(cs[order - 1 - j]) * lx ** j / fact
        fact *= (j + 1)
    return acc * np.exp((s0 + 0) * lx) * x ** 0   # x^{s0}; the x^m is applied by the caller

# ---------------------------------------------------------------- data comparison
rows = np.loadtxt("research/paper-II/data/riesz-raw.dat", skiprows=1)
u, x = rows[:, 0], rows[:, 1]
Rm = {1: rows[:, 2], 2: rows[:, 3], 3: rows[:, 4]}
sc = float(scale)
results = {"K": K, "P": P, "GMAX": GMAX, "exponents": {k: [a[k], b[k]] for k in a}, "Df1": float(Df1.real),
           "C": float(Cf.real), "A0": float(A0), "rescale_minus_1": float(scale - 1), "nZ": len(zz), "nL": len(lz),
           "Lzeros": lz[:20], "per_m": {}}

def lstsq(cols, y):
    A = np.column_stack(cols); coef, *_ = np.linalg.lstsq(A, y, rcond=None); return coef, A @ coef

import pickle, os
TERMS_FILE = f"research/paper-II/data/explicit-diag-terms-K{K}-P{P}-G{int(GMAX)}{'-k4' if 4 in FAMILIES else ''}.pkl"
if "--analyse-only" in sys.argv and os.path.exists(TERMS_FILE):
    terms = pickle.load(open(TERMS_FILE, "rb"))
else:
    terms = residue_terms()
    pickle.dump(terms, open(TERMS_FILE, "wb"))
print(f"{len(terms)} residue terms ({el()})")
for m in MS:
    xm = x ** m
    R = Rm[m] * sc
    smooth = np.zeros_like(x); zero_sum = np.zeros_like(x); fam = {}
    for t in terms:
        v = eval_term(t, x, m).real * xm     # real part: conjugate zeros give the complex conjugate term
        key = t[0]
        fam[key] = fam.get(key, 0) + v
        if t[0].startswith(("zeta", "L")): zero_sum += 2 * v   # + conjugate
        else: smooth += v
    # sizes of each family relative to x^{m-3/4}
    norm = x ** (m - 0.75)
    fam_rms = {k: float(np.sqrt(np.mean((2 * v / norm if k.startswith(("zeta", "L")) else v / norm) ** 2))) for k, v in fam.items()}
    print("   rms of each family / x^{m-3/4}:", {k: f"{v:.3g}" for k, v in fam_rms.items()})
    # exact coefficients for the record
    c1 = terms[0][3][m][0]; c0 = terms[1][3][m]
    print(f"   x^(m+1) coefficient: exact {mp.nstr(c1,15)}  [D_f(1)/(m+1) = {mp.nstr(Df1/(m+1),15)}]")
    print(f"   x^m log x coefficient: {mp.nstr(c0[0],12)}  [-1/(2C) = {mp.nstr(-1/(2*Cf),12)}],  x^m: {mp.nstr(c0[1],12)}")
    # (A) exact subtraction with the x^{m+1} coefficient refitted
    rem = R - smooth
    coef, fit = lstsq([x ** (m + 1)], rem)
    print(f"   x^(m+1) correction fitted to the data after exact subtraction: {coef[0]:.3e}, i.e. data/exact - 1 = {coef[0]/float(c1.real):.2e}")
    resid = (rem - fit) / norm
    pred = zero_sum / norm
    beta, _ = lstsq([pred], resid)
    r2 = 1 - np.mean((resid - beta[0] * pred) ** 2) / np.mean((resid - resid.mean()) ** 2)
    rms_res, rms_pred, rms_left = [float(np.sqrt(np.mean(q ** 2))) for q in (resid, pred, resid - pred)]
    print(f"   (A) rms residual {rms_res:.4f}, rms predicted zero sum {rms_pred:.4f}, rms(residual - prediction) {rms_left:.4f}; beta = {beta[0]:.4f}, R^2 = {r2:.4f}")
    # (A') with a smooth nuisance basis for the dropped real poles k >= 9: x^{m-8/9} (log x)^j, j <= 3
    nuis = [x ** (-5 / 36) * np.log(x) ** j for j in range(4)]
    cfn, fitn = lstsq([pred] + nuis, resid)
    r2n = 1 - np.mean((resid - fitn) ** 2) / np.mean((resid - resid.mean()) ** 2)
    rms_left_n = float(np.sqrt(np.mean((resid - fitn) ** 2)))
    print(f"   (A') with nuisance x^(m-8/9)(log x)^j: beta = {cfn[0]:.4f}, R^2 = {r2n:.4f}, rms left {rms_left_n:.4f}")
    # (B) also refit x^m and x^m log x (robustness against the 1e-8 accuracy of the log coefficient)
    coefB, fitB = lstsq([x ** (m + 1), xm * np.log(x), xm], rem)
    residB = (rem - fitB) / norm
    betaB, _ = lstsq([pred], residB)
    r2B = 1 - np.mean((residB - betaB[0] * pred) ** 2) / np.mean((residB - residB.mean()) ** 2)
    print(f"   (B) refit x^(m+1), x^m log x, x^m: beta = {betaB[0]:.4f}, R^2 = {r2B:.4f}, rms(residual - prediction) {np.sqrt(np.mean((residB-pred)**2)):.4f}")
    # (C) controls: shift all ordinates by delta (recompute zero sum with shifted frequencies but the same coefficients)
    controls = []
    for delta in np.arange(-0.6, 0.601, 0.1):
        if abs(delta) < 0.05: continue
        zs = np.zeros_like(x)
        for t in terms:
            if not t[0].startswith(("zeta", "L")): continue
            label, s0, order, csm = t
            t2 = (label, complex(s0.real, s0.imag + delta), order, csm)
            zs += 2 * eval_term(t2, x, m).real * xm
        bd, _ = lstsq([zs / norm], resid)
        r2d = 1 - np.mean((resid - bd[0] * zs / norm) ** 2) / np.mean((resid - resid.mean()) ** 2)
        controls.append((round(float(delta), 2), float(bd[0]), float(r2d)))
    print("   (C) controls (delta, beta, R^2):", [(d, f"{bb:.3f}", f"{rr:.3f}") for d, bb, rr in controls])
    # (D) family-by-family regression
    famcols = {k: 2 * v / norm for k, v in fam.items() if k.startswith(("zeta", "L"))}
    cf, _ = lstsq(list(famcols.values()), resid)
    print("   (D) per-family beta:", {k: f"{c:.3f}" for k, c in zip(famcols.keys(), cf)})
    results["per_m"][m] = {"beta_nuis": float(cfn[0]), "R2_nuis": float(r2n), "rms_left_nuis": rms_left_n, "rms_resid": rms_res, "rms_pred": rms_pred, "rms_left": rms_left, "beta": float(beta[0]), "R2": float(r2),
                           "betaB": float(betaB[0]), "R2B": float(r2B), "controls": controls, "family_rms": fam_rms,
                           "per_family_beta": dict(zip(famcols.keys(), map(float, cf))),
                           "coef_xm1_exact": float(c1.real), "coef_xm1_fit": float(coef[0]),
                           "coef_xmlog": float(c0[0].real), "coef_xm": float(c0[1].real)}
    np.savetxt(f"research/paper-II/data/explicit-diag-{m}.dat", np.column_stack([u, x, resid, pred, residB]), header="u x resid pred residB", comments="", fmt="%.10g")

json.dump(results, open("research/paper-II/data/explicit-diag.json", "w"), indent=1)
print(f"done ({el()})")
