"""newform-fricke-check.py — direct numerical check of the Fricke refinement of Lemma newperiod (dilation draft), 16 Sep 2026.

Claim (derived): for an even newform v of prime level u with Fricke eigenvalue ε, the family period Per_{W_u}(v) is
    0                                        (u inert, Lemma D),
    -(1+ε)·(period over one root class of level-u Heegner points)   (u split: W_u swaps the two root classes b ≡ ±β mod 2u),
    (u-1)·(period over the root-0 class), which W_u maps to itself, hence 0 if ε = -1   (u ∥ D);
so Per_{W_u}(v) = 0 for ε = -1 in every case, and Per_{W_u}(v(u·)) = ε Per_{W_u}(v) always.
Non-circular test: the Γ_0(u²)-orbits of W_u are enumerated directly (hecke-oldform-predict.orbits_W, no use of the lemma);
v is evaluated at each orbit point by SL_2(Z)-reduction and the coset decomposition Γ_0(u)\SL_2(Z) = {I} ∪ {S T^k}, using
v(S T^k z) = ε v((z+k)/u) and the Fourier series at ∞ (LMFDB coefficients, Hecke-normalised).
    python research/explore/newform-fricke-check.py LABEL R [D ...]     (coefficient file research/paper-IV/data/maass-LABEL-coefficients.txt)
Prints Per(v), Per(v(u·)), the scale Σ|v|/|Stab| and the ratios.
"""
import sys, math, importlib.util
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos
label, R = sys.argv[1], mpf(sys.argv[2]); Ds = [int(v) for v in sys.argv[3:]] or [-4, -11, -15, -3, -8]
u = int(label.split(".")[0])
spec = importlib.util.spec_from_file_location("hop", "research/explore/hecke-oldform-predict.py"); hop = importlib.util.module_from_spec(spec)
_argv = sys.argv; sys.argv = [sys.argv[0]]; spec.loader.exec_module(hop); sys.argv = _argv
mp.dps = 20
txt = open(f"research/paper-IV/data/maass-{label}-coefficients.txt").read()
body = txt[txt.index('['):txt.rindex(']') + 1].strip('[]')
A = [None] + [mpf(tok.strip().split('+-')[0]) for tok in body.split(',') if tok.strip()]
eps = int(round(-float(A[u]) * math.sqrt(u)))
assert abs(float(A[u]) + eps / math.sqrt(u)) < 1e-6, f"a(u) = {float(A[u])} is not -eps/sqrt(u)"
print(f"{label}: R = {R}, {len(A)-1} coefficients, a({u}) = {float(A[u]):+.6f} => Fricke eps = {eps:+d}")
Kc = {}
def K(x):
    k = round(float(x), 14)
    if k not in Kc: Kc[k] = besselk(mpc(0, R), x).real
    return Kc[k]
def series(x, y):
    nmax = min(len(A) - 1, int(45 / (2 * math.pi * float(y))) + 1)
    assert nmax < len(A) - 1 or 2 * math.pi * (len(A) - 1) * float(y) > 40, "too few coefficients for this height"
    return 2 * sqrt(y) * sum(A[n] * K(2 * pi * n * y) * cos(2 * pi * n * x) for n in range(1, nmax + 1))
def reduce_with_matrix(x, y):
    x, y = mpf(x), mpf(y); a, b, c, d = 1, 0, 0, 1
    for _ in range(400):
        n = int(mp.floor(x + mpf(1) / 2)); x -= n; a, b = a - n * c, b - n * d
        r2 = x * x + y * y
        if r2 >= 1: return (x, y), (a, b, c, d)
        x, y = -x / r2, y / r2; a, b, c, d = -c, -d, a, b
    raise RuntimeError("reduction did not converge")
def v_val(x, y):
    (zx, zy), (a, b, c, d) = reduce_with_matrix(x, y)      # z = γ w with γ = (a b; c d); w = γ^{-1} z, γ^{-1} = (d -b; -c a)
    cc, dd = (-c) % u, a % u
    if cc == 0: return series(zx, zy)
    k = (dd * pow(cc, -1, u)) % u
    return eps * series((zx + k) / u, zy / u)
def kron(D, p): return 0 if D % p == 0 else (1 if pow(D % p, (p - 1) // 2, p) == 1 else -1)
# self-test of the evaluator: Γ_0(u)-invariance at a random point, and the Fricke relation v(-1/(u z)) = eps v(z)
z0 = (mpf("0.137"), mpf("0.411"))
g = (1, 0, u, 1)                                            # (1 0; u 1) ∈ Γ_0(u): z ↦ z/(u z + 1)
zz = mpc(*z0); gz = zz / (u * zz + 1); fz = -1 / (u * zz)
print(f"   evaluator self-test: v(z) = {float(v_val(*z0)):+.10f}, v(gz) = {float(v_val(gz.real, gz.imag)):+.10f}, eps·v(-1/(uz)) = {float(eps*v_val(fz.real, fz.imag)):+.10f}")
print(f"{'D':>4} {'type':>8} {'orbits':>6} {'Per(v)':>12} {'Per(v(u.))':>12} {'scale':>10} {'Per/scale':>10} {'Per(v(u.))/Per':>15}")
for D in Ds:
    chi = kron(D, u); typ = {1: "split", -1: "inert", 0: "ramified"}[chi]
    orbs = hop.orbits_W(u, D)
    vals0 = [v_val(*hop.z_of(o)) / st for (o, st) in orbs]
    vals1 = [v_val(*(lambda p: (u * p[0], u * p[1]))(hop.z_of(o))) / st for (o, st) in orbs]
    P0, P1 = sum(vals0), sum(vals1); scale = sum(abs(t) for t in vals0)
    ratio = float(P1 / P0) if abs(P0) > 1e-9 * scale else float("nan")
    print(f"{D:>4} {typ:>8} {len(orbs):>6} {float(P0):+12.4e} {float(P1):+12.4e} {float(scale):10.4e} {float(P0/scale):+10.2e} {ratio:+15.6f}")
