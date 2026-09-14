"""hecke-classwise.py — the class-by-class form of Lemmas A and B (dilation draft), valid for EVERY prime u and every D < 0,
including u = 2 and u^2 | D, where the closed forms of Lemmas A/B (m = u - chi, 2u; c_u(D)) do not apply.

From the mass formula (M) of PROOFS-dilation.md §1' with the two test functions, for each SL_2(Z)-class C of forms of
discriminant 4D (all contents), with B_C the bilinear form of a representative Q_C = [a, b, c], B_C(v,w) = a v1 w1 +
(b/2)(v1 w2 + v2 w1) + c v2 w2, lines ℓ of P^1(F_u) represented by (k,1), 0 <= k < u, and (1,0):
    m(C)        = #{(ℓ1, ℓ2) distinct : B_C(ℓ1, ℓ2) ≡ 0 (mod u)},
    N_C(ℓ2)     = #{ℓ1 ≠ ℓ2 : B_C(ℓ1, ℓ2) ≡ 0 (mod u)},
    h_ℓ2(z)     = (z - k)/u for ℓ2 = <(k,1)>,   u z (≡ -1/(uz)) for ℓ2 = <(1,0)>      (the Hecke neighbour fixed by ℓ2),
    Per_W(f1)   = Σ_C m(C) u_j(z_C) / |S_C|,        Per_W(f0) = Σ_C |S_C|^{-1} Σ_ℓ2 N_C(ℓ2) u_j(h_ℓ2 z_C),     Per_W(f2) = Per_W(f0).
Here f_m(z) = u_j(u^m z) and Per_W is the period over the Γ_0(u^2)-orbits of W_u = {disc 4u^2 D : u^2 | a, 2u^2 | b},
weighted by 1/|Stab|. The script prints p_m = Per_W(f_m)/Per_D(u_j) from the class-by-class formula and from the direct
enumeration of orbits (hecke-oldform-predict.py), and the resulting r_j(u; D) = √u P^T (u(u+1) G)^{-1} L.
    python research/explore/hecke-classwise.py [u D ...]         default: u = 2 for eight D, and u = 3 with 9 | D.
Result (15 Sep 2026): all pairs agree to ~1e-3 (quadrature of the orbit enumeration), see STATE §12 / draft Prop. u=2.
"""
import sys, math
import numpy as np
from mpmath import mpf, sqrt, matrix
import importlib.util
sys.path.insert(0, "research/python"); sys.path.insert(0, "research/explore")
spec = importlib.util.spec_from_file_location("hop", "research/explore/hecke-oldform-predict.py")
hop = importlib.util.module_from_spec(spec); _argv = sys.argv; sys.argv = [sys.argv[0]]; spec.loader.exec_module(hop); sys.argv = _argv
from ulamnd.maass import form_classes

def lines(u): return [(k, 1) for k in range(u)] + [(1, 0)]
def Bmod(Q, v, w, u):
    a, b, c = Q; return (a * v[0] * w[0] + (b // 2) * (v[0] * w[1] + v[1] * w[0]) + c * v[1] * w[1]) % u
def neighbour(l, x, y, u):
    return (u * x, u * y) if l == (1, 0) else ((x - l[0]) / u, y / u)

def classwise(u, D):
    cls = form_classes(4 * D); L = lines(u)
    perD = mpf(0); P1 = mpf(0); P0 = mpf(0); rows = []
    for (a, b, c, st) in cls:
        Q = (a, b, c); x, y = hop.z_of(Q); val = hop.f_val(x, y)
        perD += val / st
        m = sum(1 for l1 in L for l2 in L if l1 != l2 and Bmod(Q, l1, l2, u) == 0)
        P1 += m * val / st
        Ns = []
        for l2 in L:
            N = sum(1 for l1 in L if l1 != l2 and Bmod(Q, l1, l2, u) == 0); Ns.append(N)
            if N: P0 += N * hop.f_val(*neighbour(l2, x, y, u)) / st
        rows.append((Q, st, m, Ns))
    return float(P0 / perD), float(P1 / perD), rows

def direct(u, D):
    orbs = hop.orbits_W(u, D)
    perW = [sum(hop.fm(m, u, *hop.z_of(o)) / st for (o, st) in orbs) for m in range(3)]
    perD = sum(hop.f_val(*hop.z_of((a, b, c))) / st for (a, b, c, st) in form_classes(4 * D))
    return [float(p / perD) for p in perW]

def r_from_P(u, p0, p1):
    G, _ = hop.gram(u); Gn = np.array([[float(G[i, j] / G[0, 0]) for j in range(3)] for i in range(3)])
    P = np.array([p0, p1, p0]); Lv = np.array([1, 1 / u, 1 / u ** 2])
    return math.sqrt(u) * float(P @ np.linalg.solve(u * (u + 1) * Gn, Lv))

if __name__ == "__main__":
    args = [int(v) for v in sys.argv[1:]]
    pairs = list(zip(args[0::2], args[1::2])) if args else [(2, -4), (2, -8), (2, -20), (2, -12), (2, -16), (2, -7), (2, -15), (2, -3), (2, -11), (3, -27), (3, -9), (3, -36)]
    print(f"{'u':>2} {'D':>4} | {'p0 class':>9} {'p0 direct':>9} | {'p1 class':>9} {'p1 direct':>9} | {'p2 direct':>9} | {'r(class)':>9} {'r(direct)':>9} | classes: (Q, |S|, m(C), N_C(l))")
    for u, D in pairs:
        p0, p1, rows = classwise(u, D); d = direct(u, D)
        print(f"{u:>2} {D:>4} | {p0:+9.4f} {d[0]:+9.4f} | {p1:+9.4f} {d[1]:+9.4f} | {d[2]:+9.4f} | {r_from_P(u,p0,p1):+9.4f} {r_from_P(u,d[0],d[1]):+9.4f} | "
              + "; ".join(f"[{a},{b},{c}] |S|={st} m={m} N={Ns}" for ((a, b, c), st, m, Ns) in rows))
