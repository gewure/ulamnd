"""smooth-Dsweep.py — the amplitude law of Theorem thm:smooth across discriminants (14 Sep 2026, exploration).
For each negative discriminant D in the list, all-divisor object, window w(u) = exp(-1/(1-(4u-3)^2)) on (1/2,1):
   predicted  sqrt(Y) S^w(Y) ∋ C cos(t_1 log Y - phi),
   C = 2 |D|^{-1/4} |Per_D L~| |Gamma(-i t_1) W_c(3/2+i t_1)| / ||u_1||^2,   phi = t_1 log(pi sqrt|D|) + arg(Gamma W_c) + pi [Per L~ < 0],
   Per_D = sum over ALL SL_2(Z)-classes of forms [a,b,c] of discriminant 4D (primitive and imprimitive) of u_1(z_Q)/|Stab Q|,
   z_Q = (-b + i sqrt(4|D|))/(2a), |Stab| = 2 for classes of k[1,0,1], 3 for k[1,1,1], else 1.
Observed: joint least squares of cos/sin at t_1 and t_2 (+ optional nuisance lines) on the detrended smooth grid
   research/paper-IV/data/piece-DS-all-D-<|D|>-smooth-grid.dat  (from  D=<D> U=1 Y=1e7 SMOOTH=1 piece-divset.ts).
This tests the D-dependence of the amplitude (the one prediction of paper IV not confirmed beyond D = -4), including the
Bessel turning point |D| ≈ (t_1/pi)^2 = 19.2 and the sign change of K_{i t_1}(pi sqrt|D|) between |D| = 3 and 4.
   python research/explore/smooth-Dsweep.py [D1 D2 ...]      (default list below); NUIS=1 adds four more even level-1 lines.
Mirrors research/paper-IV/scripts/smooth-two-lines.py (D = -4 case); the two must agree at D = -4.
"""
import sys, os, math
import numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log, arg
mp.dps = 20
ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATA = os.path.join(ROOT, "research", "paper-IV", "data")
Ds = [int(v) for v in sys.argv[1:]] or [-3, -4, -7, -8, -11, -15, -19, -20, -23, -24, -27, -43]

# ---- the first even Maass form of SL_2(Z) (LMFDB 1.0.1.3.1), Hecke-normalised coefficients a(n), n <= 20
R1 = mpf('13.77975135189073894424367328151771259715513256879')
a1 = [None, 1, 1.54930447794129622450746926287076707892155702885, 0.246899772453980898011441050996101949008024809807, 1.40034436536895243951127708008315459372491922872, 0.737060385348301086378778483390181480763698381648, 0.382522923065639705404291496126326438169894064543, -0.261420075765216142299887246426986520625437198055, 0.620255317984684410959527030296119811028067184650, -0.939040502362172455371141246475969670591646884308, 1.14193095553326023543298144997506621013428612577, -0.953564652617777476767573709662167965971573715655, 0.345744705166808645709636643606267065108893248341, 0.278827029162325172187570322224228144409225388954, -0.405019294006802300466138905923457327460062740793, 0.181980041427339014443353228612131485198094638283, -0.439380023748378275129910751365633487567448551726, 1.30734171453365862411595596765660813299770850418, -1.45485965527795814008570203398177052531719868080, 0.0925585825082122607636913236432938192295256204388, 1.03213835755916221587527833679033085150126939438]  # copied verbatim from smooth-two-lines.py (20 coefficients)
try:  # second even form from the downloaded LMFDB file, if present
    c2 = [None] + [float(v) for v in open(os.path.join(DATA, "maass-1.0.1.7.1-coefficients.txt")).read().split("\n")[1:] if v.strip()][:40]
    R2 = mpf('17.73856338105737789321732636154654617200548005325')
except FileNotFoundError:
    c2 = None
w = lambda t: exp(-1/(1-(4*t-3)**2)) if 0.5 < t < 1 else mpf(0)
W = lambda zeta: quad(lambda t: w(t)*t**(zeta-1), [mpf(1)/2, mpf(3)/4, 1])

def form_classes(disc):
    """All reduced forms [a,b,c] of the negative discriminant disc (primitive and imprimitive), with |Stab| in PSL_2(Z)."""
    out = []
    amax = int(math.isqrt(abs(disc) // 3)) + 1
    for a in range(1, amax + 1):
        for b in range(-a, a + 1):
            if (b * b - disc) % (4 * a): continue
            c = (b * b - disc) // (4 * a)
            if c < a: continue
            if (abs(b) == a or a == c) and b < 0: continue
            g = math.gcd(math.gcd(a, abs(b)), c)
            stab = 2 if (b == 0 and a == c) else 3 if (a == abs(b) == c) else 1
            out.append((a, b, c, g, stab))
    return out

class Form:
    def __init__(self, R, a, N=20):
        N = min(N, len(a) - 1); self.R = R; self.a = [None] + [mpf(v) for v in a[1:N+1]]; self.N = N; self.Kc = {}
    def K(self, x):
        k = float(x)
        if k not in self.Kc: self.Kc[k] = besselk(mpc(0, self.R), x).real
        return self.Kc[k]
    def u(self, x0, y0): return 2*sqrt(y0)*sum(self.a[n]*self.K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1, self.N+1))
    def norm2(self):
        upper = 2*quad(lambda y: sum(self.a[n]**2*self.K(2*pi*n*y)**2 for n in range(1, self.N+1))/y, [1, 1.5, 2, 3, 5])
        xs, wx = np.polynomial.legendre.leggauss(24); tot = mpf(0)
        for xi, wxi in zip(xs, wx):
            x0 = mpf(xi)/2; ylo = sqrt(1-x0*x0)
            for yi, wyi in zip(xs, wx):
                y0 = ylo + (1-ylo)*(mpf(yi)+1)/2
                tot += mpf(wxi)/2*mpf(wyi)*(1-ylo)/2*self.u(x0, y0)**2/y0**2
        return upper + tot
    def L32(self): return sum(self.a[k]*mpf(k)**(-1.5) for k in range(1, self.N+1))

forms = [Form(R1, a1)] + ([Form(R2, c2)] if c2 else [])
norms = [f.norm2() for f in forms]; L32s = [f.L32() for f in forms]
GW = [gamma(-1j*f.R)*((2*pi)**(-(mpf(3)/2+1j*f.R))*gamma(mpf(3)/2+1j*f.R)*cos(pi*(mpf(3)/2+1j*f.R)/2)*W(1-(mpf(3)/2+1j*f.R))) for f in forms]
print("form   ||u||^2      L~(3/2)    |Gamma W_c|")
for f, n2, L, gw in zip(forms, norms, L32s, GW): print(f"t={float(f.R):.4f}  {float(n2):.4e}  {float(L):+.5f}  {float(abs(gw)):.4e}")
print()
print("   D   classes  Per(t1)     C_pred(t1)  C_obs(t1)  ratio   dphi(rad) | C_pred(t2) C_obs(t2) ratio  dphi | K_{it1}(pi sqrt|D|)")
nuis = [19.423481, 21.315796, 22.785908, 24.112353] if os.environ.get("NUIS") == "1" else []
for D in Ds:
    absD = -D; classes = form_classes(4*D)
    path = os.path.join(DATA, f"piece-DS-all-D-{absD}-smooth-grid.dat")
    if not os.path.exists(path): print(f"{D:>5}  (no grid: run  D={D} U=1 Y=10000000 SMOOTH=1 npx tsx research/paper-IV/scripts/piece-divset.ts)"); continue
    rows = np.loadtxt(path, skiprows=1); x, y = rows[:, 0], rows[:, 3]
    X = np.column_stack([np.ones_like(x), x]); y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
    freqs = [float(f.R) for f in forms] + nuis
    A = np.column_stack([g(t*x) for t in freqs for g in (np.cos, np.sin)]); coef, *_ = np.linalg.lstsq(A, y, rcond=None)
    line = f"{D:>5}  {len(classes):>5}  "
    for i, f in enumerate(forms):
        per = mpf(0)
        for (a, b, c, g, stab) in classes: per += f.u(mpf(-b)/(2*a), sqrt(mpf(4*absD))/(2*a)) / stab
        C = 2*mpf(absD)**(-0.25)*abs(per*L32s[i]/norms[i])*abs(GW[i])
        phi = (f.R*log(pi*sqrt(mpf(absD))) + arg(GW[i]) + (pi if per*L32s[i] < 0 else 0)) % (2*pi)
        Co = float(np.hypot(coef[2*i], coef[2*i+1])); pho = float(np.arctan2(coef[2*i+1], coef[2*i]) % (2*np.pi))
        dphi = ((pho - float(phi) + np.pi) % (2*np.pi)) - np.pi
        if i == 0: line += f"{float(per):+.3e}  {float(C):.5f}     {Co:.5f}   {Co/float(C) if C else float('nan'):6.3f}  {dphi:+.3f}   | "
        else: line += f"{float(C):.5f}   {Co:.5f}  {Co/float(C) if C else float('nan'):6.3f} {dphi:+.3f} | "
    line += f"{float(besselk(mpc(0, R1), pi*sqrt(mpf(absD))).real):+.3e}"
    print(line)
