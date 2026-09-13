"""smooth-two-lines.py — joint phase AND amplitude test of Theorem thm:smooth at the first two even Maass parameters,
all-divisor object, D = -4, window w(u) = exp(-1/(1-(4u-3)^2)) on (1/2,1). For each form j: predicted
   sqrt(Y) S^w(Y) ∋ C_j cos(t_j log Y - phi_j),  C_j = 2 |D|^{-1/4} |Per_j L~_j| |Gamma(-i t_j) W_c(3/2+i t_j)| / ||u~_j||^2,
   phi_j = t_j log(pi sqrt|D|) + arg(Gamma(-i t_j) W_c(3/2+i t_j)) + pi [Per_j L~_j < 0],
Per_j = u~_j(2i) + u~_j(i)/2 (Hecke-normalised), L~_j = sum_k a_j(k) k^{-3/2}; ||u~_j||^2 by integration over the fundamental domain.
Observed: joint least squares of cos/sin at t_1 and t_2 on the detrended grid.   python research/paper-IV/scripts/smooth-two-lines.py
"""
import numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log, arg
mp.dps = 20
D = 4
forms = {
 "1.0.1.3.1": (mpf('13.77975135189073894424367328151771259715513256879'), [None,1,1.54930447794129622450746926287076707892155702885,0.246899772453980898011441050996101949008024809807,1.40034436536895243951127708008315459372491922872,0.737060385348301086378778483390181480763698381648,0.382522923065639705404291496126326438169894064543,-0.261420075765216142299887246426986520625437198055,0.620255317984684410959527030296119811028067184650,-0.939040502362172455371141246475969670591646884308,1.14193095553326023543298144997506621013428612577,-0.953564652617777476767573709662167965971573715655,0.345744705166808645709636643606267065108893248341,0.278827029162325172187570322224228144409225388954,-0.405019294006802300466138905923457327460062740793,0.181980041427339014443353228612131485198094638283,-0.439380023748378275129910751365633487567448551726,1.30734171453365862411595596765660813299770850418,-1.45485965527795814008570203398177052531719868080,0.0925585825082122607636913236432938192295256204388,1.03213835755916221587527833679033085150126939438]),
}
c2 = [None] + [mpf(v) for v in open("research/paper-IV/data/maass-1.0.1.7.1-coefficients.txt").read().split("\n")[1:] if v.strip()][:40]
forms["1.0.1.7.1"] = (mpf('17.73856338105737789321732636154654617200548005325'), c2)
w = lambda t: exp(-1/(1-(4*t-3)**2)) if 0.5 < t < 1 else mpf(0)
W = lambda zeta: quad(lambda t: w(t)*t**(zeta-1), [mpf(1)/2, mpf(3)/4, 1])
def analyse(label, R, a, N=20):
    a = [None] + [mpf(v) for v in a[1:N+1]]
    Kc = {}
    def K(x):
        k = float(x)
        if k not in Kc: Kc[k] = besselk(mpc(0, R), x).real
        return Kc[k]
    def u(x0, y0): return 2*sqrt(y0)*sum(a[n]*K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1, N+1))
    upper = 2*quad(lambda y: sum(a[n]**2*K(2*pi*n*y)**2 for n in range(1, N+1))/y, [1, 1.5, 2, 3, 5])
    xs, wx = np.polynomial.legendre.leggauss(24); tot = mpf(0)
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi)/2; ylo = sqrt(1-x0*x0)
        for yi, wyi in zip(xs, wx):
            y0 = ylo + (1-ylo)*(mpf(yi)+1)/2
            tot += mpf(wxi)/2*mpf(wyi)*(1-ylo)/2*u(x0, y0)**2/y0**2
    n2 = upper + tot
    per = u(0, 2) + u(0, 1)/2; L32 = sum(a[k]*mpf(k)**(-1.5) for k in range(1, N+1))
    z = mpf(3)/2 + 1j*R; Wc = (2*pi)**(-z)*gamma(z)*cos(pi*z/2)*W(1-z); GW = gamma(-1j*R)*Wc
    C = 2*mpf(D)**(-0.25)*abs(per*L32/n2)*abs(GW)
    phi = (R*log(pi*sqrt(D)) + arg(GW) + (pi if per*L32 < 0 else 0)) % (2*pi)
    print(f"{label}: R={float(R):.5f}  Per~={float(per):+.4e}  L~(3/2)={float(L32):+.5f}  ||u~||^2={float(n2):.4e}  ->  C_pred={float(C):.5f}  phi_pred={float(phi):.4f}")
    return float(R), float(C), float(phi)
pred = [analyse(l, *forms[l]) for l in forms]
import sys, os
tag = sys.argv[1] if len(sys.argv) > 1 else "DS-all-D-4-smooth"
rows = np.loadtxt(f"research/paper-IV/data/piece-{tag}-grid.dat", skiprows=1); x0, y0 = rows[:, 0], rows[:, 3]
nuis = [19.423481, 21.315796, 22.785908, 24.112353] if os.environ.get("NUIS") == "1" else []   # further level-1 even lines as nuisance
def fit(sel, label):
    x, y = x0[sel], y0[sel]
    X = np.column_stack([np.ones_like(x), x]); y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
    freqs = [t for (t, _, _) in pred] + nuis
    A = np.column_stack([f(t*x) for t in freqs for f in (np.cos, np.sin)]); c, *_ = np.linalg.lstsq(A, y, rcond=None)
    resid = y - A @ c; print(f"[{label}] residual rms after the fit: {np.sqrt(np.mean(resid**2)):.5f}  (nuisance lines: {len(nuis)})")
    for i, (t, Cp, php) in enumerate(pred):
        Co = np.hypot(c[2*i], c[2*i+1]); pho = np.arctan2(c[2*i+1], c[2*i]) % (2*np.pi)
        print(f"   t={t:.4f}: predicted C={Cp:.5f} phi={php:.4f} | observed C={Co:.5f} phi={pho:.4f} | ratio C={Co/Cp:.3f}, dphi={((pho-php+np.pi)%(2*np.pi)-np.pi):+.4f} rad")
fit(np.ones_like(x0, dtype=bool), "full range"); mid = np.median(x0); fit(x0 < mid, "lower half"); fit(x0 >= mid, "upper half")
