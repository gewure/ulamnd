"""smooth-phase-test.py — parameter-free phase test of the SMOOTH-WINDOW spectral formula (paper IV, 13 Sep 2026):
  sum_h w(h/Y)(sigma_{-1}(h^2-D) - E) = Y^{-1/2} sum_j Per(u_j) |D|^{-1/4} L~_j [ Gamma(-i t_j) W_c(3/2+i t_j) (pi sqrt|D| / Y)^{i t_j} + c.c. ] + ...
for the ALL-divisor object at D = -4 (sub-family = all forms of discriminant -16: points 2i (stabiliser 1) and i (stabiliser 2)),
w(u) = exp(-1/(1-(4u-3)^2)) on (1/2,1), first even Maass form t_1 = 13.7797513 (LMFDB coefficients, a(1) = 1).
Predicted phase of the t_1 line in sqrt(Y) S^w(Y) = C cos(t_1 log Y - phi):
   phi_pred = t_1 log(pi sqrt|D|) + arg( W_c(3/2 + i t_1) Gamma(-i t_1) ) + pi * [ u_1(2i) + u_1(i)/2 < 0 ]   (mod 2 pi),
W_c(z) = (2 pi)^{-z} Gamma(z) cos(pi z/2) W(1-z),  W(zeta) = int w(u) u^{zeta-1} du.  Observed: least squares on the grid file.
   python research/paper-IV/scripts/smooth-phase-test.py [tag=DS-all-D-4-smooth]
"""
import sys, numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log, arg, re
mp.dps = 30
R = mpf('13.77975135189073894424367328151771259715513256879'); D = 4
a = {1:'1',2:'1.54930447794129622450746926287076707892155702885',3:'0.246899772453980898011441050996101949008024809807',
4:'1.40034436536895243951127708008315459372491922872',5:'0.737060385348301086378778483390181480763698381648',
6:'0.382522923065639705404291496126326438169894064543',7:'-0.261420075765216142299887246426986520625437198055',
8:'0.620255317984684410959527030296119811028067184650',9:'-0.939040502362172455371141246475969670591646884308',
10:'1.14193095553326023543298144997506621013428612577',11:'-0.953564652617777476767573709662167965971573715655',
12:'0.345744705166808645709636643606267065108893248341',13:'0.278827029162325172187570322224228144409225388954',
14:'-0.405019294006802300466138905923457327460062740793',15:'0.181980041427339014443353228612131485198094638283',
16:'-0.439380023748378275129910751365633487567448551726',17:'1.30734171453365862411595596765660813299770850418',
18:'-1.45485965527795814008570203398177052531719868080',19:'0.0925585825082122607636913236432938192295256204388',
20:'1.03213835755916221587527833679033085150126939438'}
a = {n: mpf(v) for n, v in a.items()}
def u1(x0, y0): return 2*sqrt(y0)*sum(a[n]*besselk(mpc(0, R), 2*pi*n*y0).real*cos(2*pi*n*x0) for n in range(1, 21))
per = u1(0, 2) + u1(0, 1)/2
print(f"u_1(2i) = {u1(0,2)}, u_1(i) = {u1(0,1)}  ->  Per (Hecke-normalised) = {per}")
w = lambda u: exp(-1/(1-(4*u-3)**2)) if 0.5 < u < 1 else mpf(0)
W = lambda zeta: quad(lambda u: w(u)*u**(zeta-1), [mpf(1)/2, mpf(3)/4, 1])
z = mpf(3)/2 + 1j*R
Wc = (2*pi)**(-z)*gamma(z)*cos(pi*z/2)*W(1-z)
phi_pred = (R*log(pi*sqrt(D)) + arg(Wc*gamma(-1j*R)) + (pi if per < 0 else 0)) % (2*pi)
print(f"|W_c Gamma| = {abs(Wc*gamma(-1j*R))},  phi_pred = {float(phi_pred):.4f} rad (sign factor: {'pi' if per<0 else '0'})")
tag = sys.argv[1] if len(sys.argv) > 1 else "DS-all-D-4-smooth"
rows = np.loadtxt(f"research/paper-IV/data/piece-{tag}-grid.dat", skiprows=1)
x, y = rows[:, 0], rows[:, 3]
X = np.column_stack([np.ones_like(x), x]); y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
t = float(R); A = np.column_stack([np.cos(t*x), np.sin(t*x)]); c, *_ = np.linalg.lstsq(A, y, rcond=None)
phi_obs = np.arctan2(c[1], c[0]) % (2*np.pi); amp = np.hypot(*c)
print(f"observed: amplitude {amp:.4f}, phi_obs = {phi_obs:.4f} rad;  difference phi_obs - phi_pred = {((phi_obs - float(phi_pred) + np.pi) % (2*np.pi) - np.pi):+.4f} rad")
# controls: the same for a few random frequencies cannot be phase-tested; instead report the phase with the opposite sign choice
print(f"(with the other sign the difference would be {((phi_obs - float(phi_pred) + 2*np.pi) % (2*np.pi) - np.pi):+.4f} rad)")
