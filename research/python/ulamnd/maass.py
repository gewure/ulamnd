"""Maass forms of SL_2(Z) from LMFDB coefficients, their values at Heegner points, and the prediction of Theorem thm:smooth.

Theorem thm:smooth (paper IV) for the unrestricted object with a smooth window w on (1/2, 1):
    sqrt(Y) S^w(Y) = sum_j C_j cos(t_j log Y - phi_j) + (smaller),
    C_j   = 2 |D|^{-1/4} |Per_D(u_j) L~_j| |Gamma(-i t_j) W_c(3/2 + i t_j)| / ||u_j||^2,
    phi_j = t_j log(pi sqrt|D|) + arg(Gamma(-i t_j) W_c(3/2 + i t_j)) + pi [Per_D L~_j < 0],
    W_c(z) = (2 pi)^{-z} Gamma(z) cos(pi z / 2) W(1 - z),   W(zeta) = int w(t) t^{zeta - 1} dt,   L~_j = sum_k a_j(k) k^{-3/2},
    Per_D(u_j) = sum over all SL_2(Z)-classes of forms [a, b, c] of discriminant 4D (primitive or not) of u_j(z_Q)/|Stab Q|.
The form is Hecke-normalised (a(1) = 1) with Fourier expansion u(z) = 2 sqrt(y) sum_n a(n) K_{it}(2 pi n y) cos(2 pi n x)
(even forms); ||u||^2 is the Petersson norm over the standard fundamental domain, computed by quadrature.

Coefficients: download from https://www.lmfdb.org/ModularForm/GL2/Q/Maass/download_coefficients/<label> (the files
begin with the line "1 +- 0" for a(1); keep it). Labels: 1.0.1.3.1 (t = 13.7798), 1.0.1.7.1 (17.7386).

    form = MaassForm.from_lmfdb_file("research/paper-IV/data/maass-1.0.1.7.1-coefficients.txt", R=17.7385633810573779)
    pred = predict_smooth_line(form, D=-4)          # (C, phi)
"""
from __future__ import annotations
import math
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log, arg
import numpy as np

mp.dps = 20

def form_classes(disc: int):
    """All reduced forms [a, b, c] of the negative discriminant disc (primitive and imprimitive), with |Stab| in PSL_2(Z)."""
    out = []
    for a in range(1, math.isqrt(abs(disc) // 3) + 2):
        for b in range(-a, a + 1):
            if (b * b - disc) % (4 * a):
                continue
            c = (b * b - disc) // (4 * a)
            if c < a or ((abs(b) == a or a == c) and b < 0):
                continue
            stab = 2 if (b == 0 and a == c) else 3 if (a == abs(b) == c) else 1
            out.append((a, b, c, stab))
    return out

class MaassForm:
    def __init__(self, R, coeffs, N: int = 20):
        """R = spectral parameter t, coeffs[1..] Hecke-normalised a(n) (coeffs[0] ignored)."""
        self.R = mpf(R)
        self.a = [None] + [mpf(v) for v in coeffs[1:N + 1]]
        self.N = min(N, len(coeffs) - 1)
        self._K = {}

    @classmethod
    def from_lmfdb_file(cls, path: str, R, N: int = 20):
        vals = []
        for line in open(path).read().split("\n"):
            tok = line.strip().split()
            if not tok:
                continue
            try:
                vals.append(float(tok[0]))
            except ValueError:
                continue  # header line
        if abs(vals[0] - 1) > 1e-9:  # a(1) = 1 missing (a file whose first line was dropped)
            vals = [1.0] + vals
        return cls(R, [None] + vals, N)

    def K(self, x):
        k = float(x)
        if k not in self._K:
            self._K[k] = besselk(mpc(0, self.R), x).real
        return self._K[k]

    def value(self, x0, y0):
        return 2 * sqrt(y0) * sum(self.a[n] * self.K(2 * pi * n * y0) * cos(2 * pi * n * x0) for n in range(1, self.N + 1))

    def norm2(self):
        upper = 2 * quad(lambda y: sum(self.a[n] ** 2 * self.K(2 * pi * n * y) ** 2 for n in range(1, self.N + 1)) / y, [1, 1.5, 2, 3, 5])
        xs, wx = np.polynomial.legendre.leggauss(24)
        tot = mpf(0)
        for xi, wxi in zip(xs, wx):
            x0 = mpf(xi) / 2
            ylo = sqrt(1 - x0 * x0)
            for yi, wyi in zip(xs, wx):
                y0 = ylo + (1 - ylo) * (mpf(yi) + 1) / 2
                tot += mpf(wxi) / 2 * mpf(wyi) * (1 - ylo) / 2 * self.value(x0, y0) ** 2 / y0 ** 2
        return upper + tot

    def L32(self):
        return sum(self.a[k] * mpf(k) ** (-1.5) for k in range(1, self.N + 1))

    def period(self, D: int):
        """Per_D over all classes of forms of discriminant 4D, weights 1/|Stab|. D < 0."""
        per = mpf(0)
        for a, b, c, stab in form_classes(4 * D):
            per += self.value(mpf(-b) / (2 * a), sqrt(mpf(4 * abs(D))) / (2 * a)) / stab
        return per

DEFAULT_WINDOW = lambda t: exp(-1 / (1 - (4 * t - 3) ** 2)) if 0.5 < t < 1 else mpf(0)

def W_mellin(zeta, w=DEFAULT_WINDOW):
    return quad(lambda t: w(t) * t ** (zeta - 1), [mpf(1) / 2, mpf(3) / 4, 1])

def predict_smooth_line(form: MaassForm, D: int, w=DEFAULT_WINDOW, norm2=None):
    """(C, phi) predicted by Theorem thm:smooth for the line t = form.R in the unrestricted object at discriminant D < 0."""
    R = form.R
    z = mpf(3) / 2 + 1j * R
    Wc = (2 * pi) ** (-z) * gamma(z) * cos(pi * z / 2) * W_mellin(1 - z, w)
    GW = gamma(-1j * R) * Wc
    n2 = norm2 if norm2 is not None else form.norm2()
    per, L = form.period(D), form.L32()
    C = 2 * mpf(abs(D)) ** (-0.25) * abs(per * L / n2) * abs(GW)
    phi = (R * log(pi * sqrt(mpf(abs(D)))) + arg(GW) + (pi if per * L < 0 else 0)) % (2 * pi)
    return float(C), float(phi)

# the first even form of SL_2(Z) (LMFDB 1.0.1.3.1), 20 Hecke-normalised coefficients, as used in paper IV
FIRST_EVEN_R = "13.77975135189073894424367328151771259715513256879"
FIRST_EVEN_COEFFS = [None, 1, 1.54930447794129622450746926287076707892155702885, 0.246899772453980898011441050996101949008024809807,
    1.40034436536895243951127708008315459372491922872, 0.737060385348301086378778483390181480763698381648, 0.382522923065639705404291496126326438169894064543,
    -0.261420075765216142299887246426986520625437198055, 0.620255317984684410959527030296119811028067184650, -0.939040502362172455371141246475969670591646884308,
    1.14193095553326023543298144997506621013428612577, -0.953564652617777476767573709662167965971573715655, 0.345744705166808645709636643606267065108893248341,
    0.278827029162325172187570322224228144409225388954, -0.405019294006802300466138905923457327460062740793, 0.181980041427339014443353228612131485198094638283,
    -0.439380023748378275129910751365633487567448551726, 1.30734171453365862411595596765660813299770850418, -1.45485965527795814008570203398177052531719868080,
    0.0925585825082122607636913236432938192295256204388, 1.03213835755916221587527833679033085150126939438]

def first_even_form() -> MaassForm:
    return MaassForm(FIRST_EVEN_R, FIRST_EVEN_COEFFS)
