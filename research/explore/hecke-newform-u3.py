"""hecke-newform-u3.py — the first "newform at dilation u" prediction (15 Sep 2026): the level-3 newform t = 5.0987
(LMFDB 3.0.1.2.1, even, Fricke +1) in piece u = 3, unrestricted object, smooth window.

Same formula as for the level-1 lines (PROOFS-dilation.md §0), with v running over the orthonormalised oldspace
{v(z), v(3z)} of the level-3 newform inside L²(Γ_0(9)\H):
    √Y S^w_3(Y) ∋ √3 |D|^{-1/4} Σ_k Per_{W_3}(v_k) L~(v_k) [Γ(-it)W_c(3/2+it) (π√|D|/(3Y))^{it} + c.c.]
    → amplitude C = 2 √3 |D|^{-1/4} |Σ_k Per(v_k) L~(v_k)| |Γ(-it) W_c(3/2+it)|,  phase φ = t log(π√|D|/3) + arg(Γ W_c) + π[coef<0].
Evaluation of a level-3 form at an arbitrary point: SL_2(Z)-reduce to F with γ, split γ^{-1} = g·c with g ∈ Γ_0(3) and
c ∈ {I, S, ST, ST²} by the bottom row mod 3, and use v(S T^k z) = v(-1/(z+k)) = ε v((z+k)/3) (Fricke involution
W_3 τ = -1/(3τ), eigenvalue ε). Coefficients a(n) at ∞ Hecke-normalised (a(1) = 1); L~(v(3z)) = L~(v)/3 (index 3n carries √3 a(n)).
Observed: amplitude of the 5.0987 line in piece-DS-all-D-<|D|>-U3-smooth-grid.dat with all Γ_0(9) even lines + level-1 lines
in the fit.   python research/explore/hecke-newform-u3.py [D ...]
"""
import sys, math, re
import numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, gamma, log, arg, matrix
sys.path.insert(0, "research/python"); sys.path.insert(0, "research/explore")
from ulamnd import spectral
from ulamnd.maass import W_mellin
import importlib.util
spec = importlib.util.spec_from_file_location("hop", "research/explore/hecke-oldform-predict.py")
hop = importlib.util.module_from_spec(spec)
sys.argv_backup = sys.argv; sys.argv = [sys.argv[0]]
spec.loader.exec_module(hop)  # for orbits_W, z_of, coset_reps, act, reduce_sl2, quadrature
sys.argv = sys.argv_backup
mp.dps = 18
u = 3
R = mpf('5.0987419087295'); eps = 1
txt = open("research/paper-IV/data/maass-3.0.1.2.1-coefficients.txt").read()
body = txt[txt.index('['):txt.rindex(']') + 1].strip('[]')
A = [None] + [mpf(tok.strip().split('+-')[0]) for tok in body.split(',') if tok.strip()]
assert abs(float(A[3]) + eps / math.sqrt(3)) < 1e-6, "Atkin–Lehner check failed"
Kc = {}
def K(x):
    k = round(float(x), 12)
    if k not in Kc: Kc[k] = besselk(mpc(0, R), x).real
    return Kc[k]
def series(x, y, N=40):
    nmax = min(N, int(40 / (2 * math.pi * float(y))) + 1)
    return 2 * sqrt(y) * sum(A[n] * K(2 * pi * n * y) * cos(2 * pi * n * x) for n in range(1, nmax + 1))
def reduce_with_matrix(x, y):
    """returns (z in F, gamma) with z = gamma w"""
    x, y = mpf(x), mpf(y); a, b, c, d = 1, 0, 0, 1   # gamma = (a b; c d)
    for _ in range(300):
        n = int(mp.floor(x + mpf(1) / 2)); x -= n; a, b = a - n * c, b - n * d
        r2 = x * x + y * y
        if r2 >= 1: return (x, y), (a, b, c, d)
        x, y = -x / r2, y / r2; a, b, c, d = -c, -d, a, b
    return (x, y), (a, b, c, d)
def v_val(x, y):
    """level-3 newform at an arbitrary point"""
    (zx, zy), (a, b, c, d) = reduce_with_matrix(x, y)          # z = γ w, γ = (a b; c d); w = γ^{-1} z, γ^{-1} = (d -b; -c a)
    cc, dd = (-c) % 3, a % 3                                     # bottom row of γ^{-1} mod 3
    if cc == 0: return series(zx, zy)                            # γ^{-1} ∈ Γ_0(3)
    # γ^{-1} = g · S T^k with bottom row of S T^k = (1, k): (cc, dd) ≡ ±(1, k)
    k = (dd * pow(cc, -1, 3)) % 3
    return eps * series((zx + k) / 3, zy / 3)
def fm(m, x, y): return v_val((u ** m) * x, (u ** m) * y)

# Gram matrix of {v(z), v(3z)} on Γ_0(9)\H by cosets of Γ_0(9) in SL_2(Z)
reps = hop.coset_reps(9); G = matrix(2, 2)
def acc(x, y):
    tot = matrix(2, 2)
    for M in reps:
        X, Y = hop.act(M, x, y); w = [fm(0, X, Y), fm(1, X, Y)]
        for i in range(2):
            for j in range(2): tot[i, j] += w[i] * w[j]
    return tot
xs, wx = hop.xs, hop.wx
for xi, wxi in zip(xs, wx):
    x0 = mpf(xi) / 2; ylo = sqrt(1 - x0 * x0)
    for yi, wyi in zip(xs, wx):
        y0 = ylo + (1 - ylo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (1 - ylo) / 2 / y0 ** 2)
    for (lo, hi) in ((1, 3), (3, 12), (12, 60)):
        for yi, wyi in zip(xs, wx):
            y0 = lo + (hi - lo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (hi - lo) / 2 / y0 ** 2)
print(f"Gram on Γ0(9): <v,v>={float(G[0,0]):.4e}, <v(3z),v>/<v,v>={float(G[0,1]/G[0,0]):.4f} (Atkin–Lehner guess a(3)√3/(3+1)·? = {float(A[3])*math.sqrt(3)/4:.4f}), <v(3z),v(3z)>/<v,v>={float(G[1,1]/G[0,0]):.4f}")
L = [sum(A[k] * mpf(k) ** (-1.5) for k in range(1, len(A))), None]; L[1] = L[0] / 3
z = mpf(3) / 2 + 1j * R
Wc = (2 * pi) ** (-z) * gamma(z) * cos(pi * z / 2) * W_mellin(1 - z); GW = gamma(-1j * R) * Wc
Ds = [int(v) for v in sys.argv[1:]] or [-8, -11, -20, -4, -7, -3, -15]
GAMMA9 = [3.5360021, 5.0987419, 5.5040567, 6.6465814, 7.4317992, 8.6983430, 8.038861, 8.778282]
LVL1 = [13.779751, 17.738563, 19.423481, 21.315796]
print(f"{'D':>4} {'chi3':>4} {'orbits':>6} {'Per(v)':>10} {'Per(v(3z))':>10} {'C_pred':>8} {'phi_pred':>8} | {'C_obs':>7} {'phi_obs':>7} {'ratio':>6} {'dphi':>6}")
for D in Ds:
    orbs = hop.orbits_W(u, D)
    P = [sum(fm(m, *hop.z_of(o)) / st for (o, st) in orbs) for m in range(2)]
    # Gram–Schmidt
    e0 = [1 / sqrt(G[0, 0]), 0]
    w1 = [-G[0, 1] / G[0, 0], 1]; n1 = sqrt(w1[0] ** 2 * G[0, 0] + 2 * w1[0] * w1[1] * G[0, 1] + w1[1] ** 2 * G[1, 1]); e1 = [w1[0] / n1, w1[1] / n1]
    coef = sum((e[0] * P[0] + e[1] * P[1]) * (e[0] * L[0] + e[1] * L[1]) for e in (e0, e1))
    C = 2 * sqrt(mpf(u)) * mpf(abs(D)) ** (-0.25) * abs(coef) * abs(GW)
    phi = (R * log(pi * sqrt(mpf(abs(D))) / u) + arg(GW) + (pi if coef < 0 else 0)) % (2 * pi)
    chi = 0 if D % 3 == 0 else (1 if pow(D % 3, 1, 3) == 1 else -1)
    try:
        x, y = spectral.load_grid(f"research/paper-IV/data/piece-DS-all-D-{-D}-U3-smooth-grid.dat")
        y = spectral.detrend(x, y, deg=1)
        lines = spectral.fit_lines(x, y, [5.0987419] + [t for t in GAMMA9 if abs(t - 5.0987419) > 0.01] + LVL1)
        Co, po = lines[0][1], lines[0][2]
        dphi = ((po - float(phi) + math.pi) % (2 * math.pi)) - math.pi
        obs = f"{Co:7.4f} {po:7.3f} {Co/float(C):6.3f} {dphi:+6.3f}"
    except OSError:
        obs = "(no smooth U3 grid)"
    print(f"{D:>4} {chi:>+4d} {len(orbs):>6} {float(P[0]):+10.3e} {float(P[1]):+10.3e} {float(C):8.4f} {float(phi):8.3f} | {obs}")
