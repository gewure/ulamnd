"""hecke-amp-test.py — does the level-1 line at dilation u carry the Hecke eigenvalue?  (15 Sep 2026, exploration)

Hypothesis (RESEARCH-USES 1a, sharpened by Strömberg's Γ_0(p^2) structure): in the piece at dilation u the amplitude of
the level-1 line t_j is  amp_j(u) = amp_j(1) · |λ_j(u)| / u^{1/2}  (λ_j(u) the Hecke eigenvalue, Hecke-normalised a_j(u)),
and its phase is shifted by −t_j log u (confirmed at u = 2 in paper IV). Alternatives printed for comparison: λ_j(u)/u and
λ_j(u) (no power of u). The u = 1 amplitude is taken from the SAME data (fit), not from theory, so the test is a ratio.

Data: smooth-window grids research/paper-IV/data/piece-DS-all-D-<|D|>[-U<u>]-smooth-grid.dat (piece-divset.ts SMOOTH=1).
Fit: joint least squares of cos/sin at t_1, t_2 on sqrt(Y) S^w(Y) after removing mean + linear trend in log Y.
   python research/explore/hecke-amp-test.py
"""
import os, glob, re, math
import numpy as np
DATA = "research/paper-IV/data"
T = [13.779751351890739, 17.738563381057378]
# Hecke eigenvalues a_j(u) (LMFDB, Hecke-normalised) for the first two even forms of SL_2(Z)
LAM = {13.779751351890739: {2: 1.549304477941296, 3: 0.246899772453981, 5: 0.737060385348301},
       17.738563381057378: {2: -0.765458056600338, 3: 0.246899772453981 * 0 + -0.  , 5: 0.0}}  # t_2 values filled below from the file if present
try:
    c2 = [None] + [float(v.split()[0]) for v in open(os.path.join(DATA, "maass-1.0.1.7.1-coefficients.txt")).read().split("\n")
                   if v.strip() and not v.startswith("#")]
    LAM[T[1]] = {2: c2[2], 3: c2[3], 5: c2[5]}
except Exception as e:
    print("no coefficient file for t_2:", e)

GAMMA0_9_EVEN = [3.5360021, 5.0987419, 5.5040567, 6.6465814, 7.4317992, 8.6983430]
def top_peaks(x, y, tmin, tmax, n=4, step=0.01, avoid=()):
    ts = np.arange(tmin, tmax, step); r = []
    for t in ts:
        A = np.column_stack([np.cos(t * x), np.sin(t * x)]); c, *_ = np.linalg.lstsq(A, y, rcond=None); r.append(float(((A @ c) ** 2).sum()))
    r = np.array(r); idx = [i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]]
    idx.sort(key=lambda i: -r[i]); out = []
    for i in idx:
        if all(abs(ts[i] - a) > 0.3 for a in list(avoid) + out): out.append(float(ts[i]))
        if len(out) >= n: break
    return out
def fit(path, u=1):
    rows = np.loadtxt(path, skiprows=1); x, y = rows[:, 0], rows[:, 3]
    X = np.column_stack([np.ones_like(x), x]); y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
    # nuisance: the level-u^2 lines that dominate the object for u = 3, 5 (Strömberg's Γ_0(9) even set; data-driven peaks for u = 5)
    nuis = GAMMA0_9_EVEN if u == 3 else top_peaks(x, y, 2, 12, n=6, avoid=T) if u == 5 else []
    freqs = list(T) + nuis
    A = np.column_stack([f(t * x) for t in freqs for f in (np.cos, np.sin)]); c, *_ = np.linalg.lstsq(A, y, rcond=None)
    return [(float(np.hypot(c[2 * i], c[2 * i + 1])), float(np.arctan2(c[2 * i + 1], c[2 * i]) % (2 * np.pi))) for i in range(len(T))], float(np.std(y - A @ c))

files = glob.glob(os.path.join(DATA, "piece-DS-all-D-*-smooth-grid.dat"))
runs = {}
for f in files:
    m = re.search(r"D-(\d+)(?:-U(\d+))?-smooth", f)
    D, u = -int(m.group(1)), int(m.group(2) or 1)
    runs[(D, u)] = f
print("Hecke amplitude test: amp(u)/amp(1) of the level-1 lines, smooth window, Y<=1e7, object 'all'")
print(f"{'D':>4} {'u':>2} {'chi_D(u)':>6} {'amp1(1)':>8} {'amp1(u)':>8} {'ratio':>6} | {'lam/sqrt(u)':>11} {'lam/u':>6} {'|lam|':>6} | {'dphi+t1 log u':>13} | {'t2: ratio':>9} {'lam2/sqrt(u)':>12} | noise")
for (D, u), f in sorted(runs.items(), key=lambda kv: (kv[0][1], -kv[0][0])):
    if u == 1 or (D, 1) not in runs:
        continue
    (a1u, p1u), (a2u, p2u) = fit(f, u)[0]; noise = fit(f, u)[1]
    (a11, p11), (a21, p21) = fit(runs[(D, 1)])[0]
    lam1, lam2 = LAM[T[0]][u], LAM[T[1]].get(u, float("nan"))
    import sys; sys.path.insert(0, "research/python"); from ulamnd.singular import kronecker
    chi = kronecker(D, u) if u % 2 else (0 if D % 2 == 0 else (1 if D % 8 == 1 else -1))
    dphi = ((p1u - p11 + T[0] * math.log(u) + math.pi) % (2 * math.pi)) - math.pi
    print(f"{D:>4} {u:>2} chi={chi:+d} {a11:8.4f} {a1u:8.4f} {a1u/a11:6.3f} | {abs(lam1)/math.sqrt(u):11.3f} {abs(lam1)/u:6.3f} {abs(lam1):6.3f} | {dphi:+13.3f} | "
          f"{a2u/a21 if a21 > 0.004 else float('nan'):9.3f} {abs(lam2)/math.sqrt(u):12.3f} | {noise:.4f}")
print("\nlambda_1(u): 2: 1.5493  3: 0.2469  5: 0.7371;  lambda_1(u)/sqrt(u): 1.095, 0.143, 0.330;  lambda_1(u)/u: 0.775, 0.082, 0.147")
print("The t_1 amplitude at u = 1 is ~0.03-0.06; a ratio below ~0.1 is at the noise floor (~0.003-0.005) and cannot be measured.")
