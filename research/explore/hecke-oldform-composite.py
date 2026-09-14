"""hecke-oldform-composite.py — direct level-u^2 prediction of the level-1 line ratio for SQUAREFREE COMPOSITE u (15 Sep 2026),
oldspace {u_1(dz) : d | u^2} (9 functions for u = 6), Gram matrix over the cosets of Γ_0(u^2) (index 72 for 36).
Tests the multiplicativity conjecture r(u1 u2) = r(u1) r(u2) on the theory side.   python ... 6 -12 6 -8   (slow: ~30 min each)
"""
import sys, math, importlib.util
from mpmath import mp, mpf, sqrt, matrix
sys.argv_backup = sys.argv; sys.argv = [sys.argv[0]]
spec = importlib.util.spec_from_file_location("hop", "research/explore/hecke-oldform-predict.py"); hop = importlib.util.module_from_spec(spec); spec.loader.exec_module(hop)
sys.argv = sys.argv_backup
from ulamnd.maass import form_classes
def divisors(n): return [d for d in range(1, n + 1) if n % d == 0]
def predict(u, D):
    N = u * u; ds = divisors(N); k = len(ds); reps = hop.coset_reps(N)
    G = matrix(k, k)
    def acc(x, y):
        tot = matrix(k, k)
        for M in reps:
            X, Y = hop.act(M, x, y); v = [hop.f_val(d * X, d * Y) for d in ds]
            for i in range(k):
                for j in range(k): tot[i, j] += v[i] * v[j]
        return tot
    xs, wx = hop.xs, hop.wx
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi) / 2; ylo = sqrt(1 - x0 * x0)
        for yi, wyi in zip(xs, wx):
            y0 = ylo + (1 - ylo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (1 - ylo) / 2 / y0 ** 2)
        for (lo, hi) in ((1, 3), (3, 12), (12, 60)):
            for yi, wyi in zip(xs, wx):
                y0 = lo + (hi - lo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (hi - lo) / 2 / y0 ** 2)
    n1 = hop.integrate_F(lambda x, y: hop.f_val(x, y) ** 2)
    print(f"u={u}: index {len(reps)}; ||u1||^2 ratio {float(G[0,0]/n1):.4f} (expect {len(reps)}); Gram/G00 first row: {[round(float(G[0,j]/G[0,0]),4) for j in range(k)]}", flush=True)
    L1 = sum(hop.A[m] * mpf(m) ** (-1.5) for m in range(1, len(hop.A)))
    per1 = sum(hop.f_val(*hop.z_of((a, b, c))) / st for (a, b, c, st) in form_classes(4 * D)); coef1 = per1 * L1 / n1
    orbs = hop.orbits_W(u, D, Abound=max(60, 12 * abs(D)))
    P = [sum(hop.f_val(d * hop.z_of(o)[0], d * hop.z_of(o)[1]) / st for (o, st) in orbs) for d in ds]
    L = [L1 / d for d in ds]
    # coefficient = P^T G^{-1} L (basis-free), G in absolute normalisation
    Ginv = G ** -1
    coefu = sqrt(mpf(u)) * sum(P[i] * Ginv[i, j] * L[j] for i in range(k) for j in range(k))
    print(f"   D={D}: {len(orbs)} orbits; predicted r({u}; {D}) = {float(coefu / coef1):+.4f}", flush=True)
if __name__ == "__main__":
    a = [int(v) for v in sys.argv[1:]]
    for u, D in zip(a[0::2], a[1::2]): predict(u, D)
