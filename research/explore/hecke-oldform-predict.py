"""hecke-oldform-predict.py — parameter-free prediction of the level-1 line's amplitude ratio at dilation u (15 Sep 2026).

Derivation (from the proof of Theorem thm:smooth, paper IV). The pairs (d, x) with u^2 x^2 ≡ D (mod d) are the forms
Q = [d, 2ux, (u^2x^2 - D)/d] of discriminant 4D with 2u | b, points z_Q = (-ux + i sqrt|D|)/d. Poisson summation gives the
seed  (Y y^2/|D|) sum_k ŵ(kY y/sqrt|D|) e(-k Re z/u)  at z = z_Q, which equals  u · Ψ^w_{uY}(τ)  with τ = z_Q/u, where Ψ^w is
the level-1 seed of the theorem. The points τ are the Heegner points of the forms [u^2 d, 2u^2 x, c] of discriminant 4u^2 D,
i.e. the family  W_u = {forms of disc 4u^2 D : u^2 | a, 2u^2 | b}  (all contents), which is Γ_0(u^2)-invariant, with the
translation τ → τ+1 corresponding to x → x - d. Hence, by the theorem at level u^2 with Y → uY and the overall factor u,

    sqrt(Y) S^w_u(Y) = sqrt(u) |D|^{-1/4} sum_v Per_{W_u}(v) L~_v [ Γ(-it_v) W_c(3/2+it_v) (π sqrt|D| / (uY))^{it_v} + c.c. ],

v over an orthonormal basis of the even cusp forms of Γ_0(u^2). For the level-1 form u_j the relevant v span the oldform
space {u_j(z), u_j(uz), u_j(u^2 z)} (Gram–Schmidt on Γ_0(u^2)\H); L~ of u_j(u^m z) is u^{-m} L~_j (index k = u^m n carries
u^{m/2} a_j(n)). The predicted signed ratio of the t_j line, piece u over piece 1, is therefore

    r_j(u; D) = sqrt(u) · [ sum_k Per_{W_u}(v_k) L~(v_k) ] / [ Per_D(u_j) L~_j / ||u_j||^2_{SL_2(Z)} ],

with the phase shifted by -t_j log u (+π if r < 0). Everything on the right is computed here from the LMFDB coefficients;
the Gram matrix is computed by integrating over the cosets of Γ_0(u^2) in SL_2(Z) (level-1 forms are evaluated after
SL_2(Z)-reduction, so the Fourier series always converges fast). Checks printed: ||u_j||^2_{Γ_0(u^2)} = index · ||u_j||^2_1,
and <u_j(uz), u_j>/||u_j||^2 = λ_j(u) sqrt(u)/(u+1) (Iwaniec–Luo–Sarnak; paper IV measured 0.730 at u = 2).

    python research/explore/hecke-oldform-predict.py [u D ...]      e.g.  2 -4 2 -7 3 -15
Compare with research/explore/hecke-ratio-sharp.py (observed signed ratios).
"""
import sys, math
from math import gcd
import numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, matrix
sys.path.insert(0, "research/python")
from ulamnd.maass import FIRST_EVEN_R, FIRST_EVEN_COEFFS, form_classes
mp.dps = 18

R = mpf(FIRST_EVEN_R); A = [None] + [mpf(v) for v in FIRST_EVEN_COEFFS[1:]]
LAM = {2: float(A[2]), 3: float(A[3]), 5: float(A[5])}
Kc = {}
def K(x):
    k = round(float(x), 12)
    if k not in Kc: Kc[k] = besselk(mpc(0, R), x).real
    return Kc[k]

def reduce_sl2(x, y):
    """SL_2(Z)-reduce (x, y) into the standard fundamental domain."""
    x, y = mpf(x), mpf(y)
    for _ in range(200):
        n = mp.floor(x + mpf(1) / 2); x -= n
        r2 = x * x + y * y
        if r2 >= 1: return x, y
        x, y = -x / r2, y / r2
    return x, y

def f_val(x, y, N=20):
    """u_1 at (x, y), reduced first; terms with 2π n y > 40 are negligible (K_{it}(x) ~ e^{-x} against the e^{-πt/2} scale)."""
    x, y = reduce_sl2(x, y)
    nmax = min(N, int(40 / (2 * math.pi * float(y))) + 1)
    return 2 * sqrt(y) * sum(A[n] * K(2 * pi * n * y) * cos(2 * pi * n * x) for n in range(1, nmax + 1))

def fm(m, u, x, y):
    """u_1(u^m z)"""
    return f_val((u ** m) * x, (u ** m) * y)

# ---- integration over the fundamental domain F (Gauss–Legendre), as in smooth-level2-test.py
xs, wx = np.polynomial.legendre.leggauss(16)
def integrate_F(g):
    tot = mpf(0)
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi) / 2; ylo = sqrt(1 - x0 * x0)
        for yi, wyi in zip(xs, wx):
            y0 = ylo + (1 - ylo) * (mpf(yi) + 1) / 2; tot += mpf(wxi) / 2 * mpf(wyi) * (1 - ylo) / 2 * g(x0, y0) / y0 ** 2
        for (lo, hi) in ((1, 3), (3, 12), (12, 60)):
            for yi, wyi in zip(xs, wx):
                y0 = lo + (hi - lo) * (mpf(yi) + 1) / 2; tot += mpf(wxi) / 2 * mpf(wyi) * (hi - lo) / 2 * g(x0, y0) / y0 ** 2
    return tot

def coset_reps(N):
    """Representatives of Γ_0(N)\\SL_2(Z), as integer matrices (a, b, c, d) with bottom row (c, d) running over P^1(Z/N)."""
    seen, reps = set(), []
    units = [l for l in range(1, N) if gcd(l, N) == 1]
    for c in range(N):
        for d in range(N):
            if gcd(gcd(c, d), N) != 1: continue
            key = min(((l * c) % N, (l * d) % N) for l in units)
            if key in seen: continue
            seen.add(key)
            cc, dd = c, d
            if cc == 0: cc = N  # identity coset: any lift
            while gcd(cc, dd) != 1: dd += N
            # a, b with a*dd - b*cc = 1
            def egcd(p, q):
                if q == 0: return (1, 0, p)
                s, t, g = egcd(q, p % q); return (t, s - (p // q) * t, g)
            s, t, g = egcd(dd, cc)  # s*dd + t*cc = 1
            a, b = s, -t
            reps.append((a, b, cc, dd))
    return reps

def act(M, x, y):
    a, b, c, d = M; z = mpc(x, y); w = (a * z + b) / (c * z + d); return w.real, w.imag

_GRAM = {}
def gram(u):
    """Gram matrix of f_m = u_1(u^m z), m = 0,1,2, on Γ_0(u^2)\H = sum over cosets of integrals over F; all nine products from
    one evaluation of (f0, f1, f2) per quadrature point."""
    if u in _GRAM: return _GRAM[u]
    N = u * u; reps = coset_reps(N)
    G = matrix(3, 3)
    def acc(x, y):
        tot = matrix(3, 3)
        for M in reps:
            X, Y = act(M, x, y); v = [fm(m, u, X, Y) for m in range(3)]
            for i in range(3):
                for j in range(3): tot[i, j] += v[i] * v[j]
        return tot
    # reuse integrate_F's quadrature by integrating a matrix-valued function entrywise
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi) / 2; ylo = sqrt(1 - x0 * x0)
        for yi, wyi in zip(xs, wx):
            y0 = ylo + (1 - ylo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (1 - ylo) / 2 / y0 ** 2)
        for (lo, hi) in ((1, 3), (3, 12), (12, 60)):
            for yi, wyi in zip(xs, wx):
                y0 = lo + (hi - lo) * (mpf(yi) + 1) / 2; G += acc(x0, y0) * (mpf(wxi) / 2 * mpf(wyi) * (hi - lo) / 2 / y0 ** 2)
    _GRAM[u] = (G, len(reps)); return _GRAM[u]

# ---- the family W_u and its Γ_0(u^2)-orbits (classification as in smooth-level2-test.py)
def actform(a, b, c, al, be, ga, de): return (a*al*al + b*al*ga + c*ga*ga, 2*a*al*be + b*(al*de + be*ga) + 2*c*ga*de, a*be*be + b*be*de + c*de*de)
def mul(M, Nn): return [[M[0][0]*Nn[0][0] + M[0][1]*Nn[1][0], M[0][0]*Nn[0][1] + M[0][1]*Nn[1][1]], [M[1][0]*Nn[0][0] + M[1][1]*Nn[1][0], M[1][0]*Nn[0][1] + M[1][1]*Nn[1][1]]]
def invm(M): return [[M[1][1], -M[0][1]], [-M[1][0], M[0][0]]]
def reduce_form(a, b, c):
    M = [[1, 0], [0, 1]]
    for _ in range(10000):
        if c < a or (c == a and b < 0): a, b, c = actform(a, b, c, 0, -1, 1, 0); M = mul(M, [[0, -1], [1, 0]]); continue
        if b > a or b <= -a:
            k = -((b + a) // (2 * a)) if b > a else ((-b + a) // (2 * a)); a, b, c = actform(a, b, c, 1, k, 0, 1); M = mul(M, [[1, k], [0, 1]]); continue
        return (a, b, c), M
def stab_sl2(a, b, c):
    S = [[[1, 0], [0, 1]]]
    if b == 0 and a == c: S.append([[0, -1], [1, 0]])
    if a == b == c: S.append([[0, -1], [1, 1]]); S.append([[-1, -1], [1, 0]])
    return S

def orbits_W(u, D, Abound=None):
    """Γ_0(u^2)-orbit representatives of W_u = {[u^2 a', 2u^2 b', c] of disc 4u^2 D}: returns [(form, |stab in Γ_0(u^2)|)]."""
    N = u * u; Abound = Abound or max(60, 12 * abs(D))
    reps = []
    for ap in range(1, Abound + 1):
        for bp in range(-ap, ap + 1):
            if (u * u * bp * bp - D) % ap: continue
            a, b, c = N * ap, 2 * N * bp, (u * u * bp * bp - D) // ap
            g = gcd(gcd(a, abs(b)), c); prim = (a // g, b // g, c // g)
            r, M = reduce_form(*prim)
            found = False
            for (g2, r2, M2, _, _) in reps:
                if g2 != g or r2 != r: continue
                for s in stab_sl2(*r2):
                    Gm = mul(M, mul(s, invm(M2)))
                    if Gm[1][0] % N == 0: found = True; break
                if found: break
            if not found:
                st = sum(1 for s in stab_sl2(*r) if mul(M, mul(s, invm(M)))[1][0] % N == 0)
                reps.append((g, r, M, (a, b, c), st))
    return [(o, st) for (_, _, _, o, st) in reps]

def z_of(form):
    a, b, c = form; disc = b * b - 4 * a * c
    return mpf(-b) / (2 * a), sqrt(mpf(-disc)) / (2 * a)

def predict(u, D, verbose=True):
    n1 = integrate_F(lambda x, y: f_val(x, y) ** 2)                       # ||u_1||^2 on SL_2(Z)\H
    L1 = sum(A[k] * mpf(k) ** (-1.5) for k in range(1, len(A)))
    per1 = sum(f_val(*z_of((a, b, c))) / st for (a, b, c, st) in form_classes(4 * D))
    coef1 = per1 * L1 / n1
    G, index = gram(u)
    if verbose:
        print(f"u={u}: index {index}; ||u1||^2_{{Γ0}}/||u1||^2_1 = {float(G[0,0]/n1):.4f} (expect {index}); "
              f"<u1(uz),u1>/||u1||^2_{{Γ0}} = {float(G[0,1]/G[0,0]):.4f} (ILS: λ√u/(u+1) = {LAM[u]*math.sqrt(u)/(u+1):.4f}); "
              f"<u1(u²z),u1>/|| ||^2 = {float(G[0,2]/G[0,0]):.4f}, <u1(u²z),u1(uz)>/|| ||^2 = {float(G[1,2]/G[0,0]):.4f}")
    orbs = orbits_W(u, D)
    perW = [sum(fm(m, u, *z_of(o)) / st for (o, st) in orbs) for m in range(3)]
    Lm = [L1 * mpf(u) ** (-m) for m in range(3)]
    # Gram–Schmidt on f0, f1, f2 with Gram matrix G: v_k = sum_m C[k][m] f_m
    C = []
    basis_vecs = []
    for k in range(3):
        v = [mpf(1) if m == k else mpf(0) for m in range(3)]
        for q in basis_vecs:
            ip = sum(v[i] * q[j] * G[i, j] for i in range(3) for j in range(3))
            v = [v[m] - ip * q[m] for m in range(3)]
        nv = sqrt(sum(v[i] * v[j] * G[i, j] for i in range(3) for j in range(3)))
        v = [c / nv for c in v]; basis_vecs.append(v)
    coefu = sqrt(mpf(u)) * sum(sum(v[m] * perW[m] for m in range(3)) * sum(v[m] * Lm[m] for m in range(3)) for v in basis_vecs)
    r = coefu / coef1
    if verbose:
        print(f"   D={D}: {len(orbs)} orbits of W_u (stabs {[st for _, st in orbs]}); Per_W(f0,f1,f2) = {[float(p) for p in perW]}; Per_D(u1) = {float(per1):.3e}")
    return float(r)

if __name__ == "__main__":
    args = [int(v) for v in sys.argv[1:]]
    pairs = list(zip(args[0::2], args[1::2])) if args else [(2, -4), (2, -8), (2, -20), (2, -7), (2, -15), (2, -23), (2, -3), (2, -11), (2, -19), (3, -3), (3, -15), (3, -8), (3, -11), (3, -20), (3, -4), (3, -7), (5, -15), (5, -4), (5, -11), (5, -3), (5, -8)]
    obs = {(2,-3):-0.065,(2,-4):0.852,(2,-7):-0.353,(2,-8):0.865,(2,-11):-0.061,(2,-15):-0.379,(2,-19):-0.071,(2,-20):0.899,(2,-23):-0.428,
           (3,-3):0.655,(3,-4):0.196,(3,-7):0.341,(3,-8):-0.285,(3,-11):-0.320,(3,-15):0.726,(3,-20):-0.332,
           (5,-3):-0.255,(5,-4):-0.159,(5,-8):0.439,(5,-11):-0.114,(5,-15):0.431}
    last_u = None
    for u, D in pairs:
        r = predict(u, D, verbose=True); last_u = u
        print(f"      predicted r({u}; {D}) = {r:+.3f}    observed (sharp grids) {obs.get((u, D), float('nan')):+.3f}")
