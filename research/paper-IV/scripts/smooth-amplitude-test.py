"""smooth-amplitude-test.py — amplitude test of Theorem thm:smooth (paper IV) at t_1 for the all-divisor object, D = -4.
Predicted amplitude of the t_1 line in sqrt(Y) S^w(Y):  C = 2 |D|^{-1/4} |Per(u_1)| |L~_1| |Gamma(-i t_1) W_c(3/2 + i t_1)|
with u_1 L^2-normalised on SL_2(Z)\H (measure dx dy/y^2), Per = u_1(2i) + u_1(i)/2, L~ = sum_k a(k) k^{-3/2}.
The LMFDB coefficients are Hecke-normalised (a(1) = 1); u_1 = u~/||u~||, so Per L~ = Per~ L~(3/2) / ||u~||^2 where
||u~||^2 = int_F |u~|^2 dx dy/y^2 is computed here from the Fourier expansion (20 coefficients; the tail of the norm is
estimated by the Rankin-Selberg-free route of just checking convergence in the number of coefficients).
   python research/paper-IV/scripts/smooth-amplitude-test.py
"""
import numpy as np
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log
mp.dps = 20
R = mpf('13.77975135189073894424367328151771259715513256879'); D = 4
a = [None, 1, 1.54930447794129622450746926287076707892155702885, 0.246899772453980898011441050996101949008024809807,
 1.40034436536895243951127708008315459372491922872, 0.737060385348301086378778483390181480763698381648,
 0.382522923065639705404291496126326438169894064543, -0.261420075765216142299887246426986520625437198055,
 0.620255317984684410959527030296119811028067184650, -0.939040502362172455371141246475969670591646884308,
 1.14193095553326023543298144997506621013428612577, -0.953564652617777476767573709662167965971573715655,
 0.345744705166808645709636643606267065108893248341, 0.278827029162325172187570322224228144409225388954,
 -0.405019294006802300466138905923457327460062740793, 0.181980041427339014443353228612131485198094638283,
 -0.439380023748378275129910751365633487567448551726, 1.30734171453365862411595596765660813299770850418,
 -1.45485965527795814008570203398177052531719868080, 0.0925585825082122607636913236432938192295256204388,
 1.03213835755916221587527833679033085150126939438]
a = [mpf(v) if v is not None else None for v in a]
Kc = {}
def K(x):
    key = float(x)
    if key not in Kc: Kc[key] = besselk(mpc(0, R), x).real
    return Kc[key]
def u(x0, y0, N=20): return 2*sqrt(y0)*sum(a[n]*K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1, N+1))
# ||u~||^2 over F: region y >= 1 (Parseval in x) + region sqrt(1-x^2) <= y < 1
def norm2(N):
    upper = 2*quad(lambda y: sum(a[n]**2*K(2*pi*n*y)**2 for n in range(1, N+1))/y, [1, 1.5, 2, 3, 5])
    # lower region: integrate |u|^2 dy/y^2 over y in [sqrt(1-x^2), 1] for x in [-1/2, 1/2] with Gauss-Legendre 24x24
    xs, wx = np.polynomial.legendre.leggauss(24)
    tot = mpf(0)
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi)/2; ylo = sqrt(1 - x0*x0)
        ys, wy = np.polynomial.legendre.leggauss(24)
        for yi, wyi in zip(ys, wy):
            y0 = ylo + (1 - ylo)*(mpf(yi)+1)/2
            tot += mpf(wxi)/2 * mpf(wyi)*(1-ylo)/2 * u(x0, y0, N)**2 / y0**2
    return upper + tot
for N in (12, 16, 20):
    print(f"N={N}: ||u~||^2 = {norm2(N)}")
n2 = norm2(20)
per = u(0, 2) + u(0, 1)/2
L32 = sum(a[k]*mpf(k)**(-1.5) for k in range(1, 21)); L32b = sum(a[k]*mpf(k)**(-1.5) for k in range(1, 13))
print(f"Per~ = {per},  L~(3/2) with 20 terms = {L32}, with 12 terms = {L32b}")
w = lambda t: exp(-1/(1-(4*t-3)**2)) if 0.5 < t < 1 else mpf(0)
W = lambda zeta: quad(lambda t: w(t)*t**(zeta-1), [mpf(1)/2, mpf(3)/4, 1])
z = mpf(3)/2 + 1j*R
Wc = (2*pi)**(-z)*gamma(z)*cos(pi*z/2)*W(1-z)
C = 2*mpf(D)**(-0.25)*abs(per*L32/n2)*abs(gamma(-1j*R)*Wc)
print(f"|Gamma(-iR) W_c(3/2+iR)| = {abs(gamma(-1j*R)*Wc)}")
print(f"PREDICTED amplitude C = {C}   (observed 0.0569 from smooth-phase-test.py; ratio obs/pred = {0.0569/float(C):.3f})")
