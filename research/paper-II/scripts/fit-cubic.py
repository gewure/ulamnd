"""fit-cubic.py  (constants from constants-cubic.json)\n — test of the corrected general-f explicit formula (ERRATA 12) on f = t^3 - 3t - 1 (C_3, m_3 = 2).
Model for the Riesz mean R_m(x) of the diagonal (data from riesz-cubic.ts):
   R_m(x) = D_f(1) x^{m+1}/(m+1) + x^m ( -log x/(2C) + c ) + x^{m-2/3} ( a log x + b ) + zero terms O(x^{m-3/4}).
D_f(1) and C(f) are computed here from Euler products with tails; c, a, b are fitted on x in [XMIN, X]; the fit with a
forced to 0 is reported for contrast. The paper's earlier statement corresponds to a = 0.
   python fit-cubic.py [XMIN=1e4]
"""
import json, sys, numpy as np
from mpmath import mp, mpf, log, exp, nsum, inf, primepi
mp.dps = 30
XMIN = float(sys.argv[1]) if len(sys.argv) > 1 else 1e4
meta = json.load(open("research/paper-II/data/riesz-cubic.json"))
rows = np.loadtxt("research/paper-II/data/riesz-cubic.dat", skiprows=1)
u, x = rows[:, 0], rows[:, 1]
cst = json.load(open("research/paper-II/data/constants-cubic.json"))   # from constants-cubic.py (40 digits, two routes agree)
A0, Df1, C = mpf(cst["A0"]), mpf(cst["Df1"]), mpf(cst["C"])
print(f"A0 = {A0}\nD_f(1) = {Df1}  (script partial sum to X: {meta['DfOnePartial']:.12f})\nC(f) = {C}")
Df1f, Cf = float(Df1), float(C)
sel = x >= XMIN
for m in (2, 3):
    R = rows[:, 1 + m][sel]; xx = x[sel]; L = np.log(xx)
    resid = R - Df1f * xx ** (m + 1) / (m + 1) + xx ** m * L / (2 * Cf)
    # scale to x^{m-2/3}
    y = resid / xx ** (m - 2 / 3)
    A_full = np.column_stack([xx ** (2 / 3), L, np.ones_like(xx)])        # c x^{2/3} + a log x + b
    A_noa = np.column_stack([xx ** (2 / 3), np.ones_like(xx)])            # a = 0
    for name, A in (("a free", A_full), ("a = 0 ", A_noa)):
        coef, res, *_ = np.linalg.lstsq(A, y, rcond=None); r = y - A @ coef
        rms = np.sqrt(np.mean(r ** 2))
        print(f"m={m} {name}: coef = {np.array2string(coef, precision=6)}  rms residual (units of x^(m-2/3)) = {rms:.5f}")
    # residual in units of the expected zero-term size x^{m-3/4}: rms of r * x^{m-2/3} / x^{m-3/4} = r x^{1/12}
    coef, *_ = np.linalg.lstsq(A_full, y, rcond=None); r = y - A_full @ coef
    print(f"      residual/x^(m-3/4) rms = {np.sqrt(np.mean((r * xx ** (1/12)) ** 2)):.4f}  (zero terms live here);  a = {coef[1]:.6f}, b = {coef[2]:.6f}, c = {coef[0]:.6f}")
