"""hecke-components-u5.py — the component test at u = 5 against the LMFDB list of Maass newforms of level 5 (fetched 15 Sep
2026, lmfdb.org/ModularForm/GL2/Q/Maass/?level=5; even forms with R < 8.6 and their Fricke signs listed below).
Predictions: level-5 newform lines only in L = L1 + L2 (none in T, none in R); by Lemma D with the Fricke involution swapping the
two isotropic lines (split u), the family period is -(1+ε)·(period over one isotropic line), so forms with ε = -1 are ABSENT
even from L; R carries only genuinely level-25 lines. Design: 1, x, (Y/Ymax)^{3/2}, cos/sin (as hecke-components-fit.py v2).
    python research/explore/hecke-components-u5.py
"""
import sys, math
import numpy as np
sys.path.insert(0, "research/python")
from ulamnd import spectral
LVL1 = [13.779751, 17.738563, 19.423481, 21.315796]
LV5 = [(4.13240421, +1), (5.43618046, -1), (6.05402838, +1), (6.82352699, +1), (7.98654905, -1), (8.29469778, +1), (8.48001583, +1)]
PROBES = [10.6, 11.3, 12.0, 12.7, 15.3, 16.0, 23.5, 26.0]
def base(x):
    Y = np.exp(x); return [np.ones_like(x), (x - x.mean()) / 5, (Y / Y.max()) ** 1.5]
def fit(x, y, freqs):
    A = np.column_stack(base(x) + [f(t * x) for t in freqs for f in (np.cos, np.sin)]); c, *_ = np.linalg.lstsq(A, y, rcond=None)
    return [float(np.hypot(c[3 + 2 * i], c[4 + 2 * i])) for i in range(len(freqs))]
def clean(x, y):
    A = np.column_stack(base(x)); c, *_ = np.linalg.lstsq(A, y, rcond=None); return y - A @ c
def peak_near(x, y, lo, hi):
    ts = np.arange(lo, hi, 0.002); r = [spectral.joint_r2(x, y, [t]) for t in ts]; i = int(np.argmax(r)); return float(ts[i]), float(r[i])
def peaks(x, y, n, avoid, tmin=2.0, tmax=12.0, gap=0.35):
    ts = np.arange(tmin, tmax, 0.01); r = np.array([spectral.joint_r2(x, y, [t]) for t in ts])
    idx = sorted([i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]], key=lambda i: -r[i]); out = []
    for i in idx:
        if all(abs(ts[i] - a) > gap for a in out + list(avoid)): out.append(round(float(ts[i]), 2))
        if len(out) >= n: break
    return sorted(out)
for D in (-4, -11, -8):
    rows = np.loadtxt(f"research/explore/data/components-D{-D}-U5-grid.dat", skiprows=1); x = rows[:, 0]
    comps = {"P": rows[:, 2], "T": rows[:, 3], "L": rows[:, 4] + rows[:, 5], "R": rows[:, 6]}
    lv5 = [t for t, _ in LV5]
    rpk = peaks(x, clean(x, comps["R"]), 5, avoid=lv5)
    freqs = LVL1 + lv5 + rpk
    print(f"\nD={D} u=5 ({'inert: L = 0' if D == -8 else 'split'}); R-only peaks added: {rpk}")
    loc = peak_near(x, clean(x, comps["R"]), 4.8, 5.7)
    print(f"   R: refined periodogram maximum in [4.8, 5.7] at t = {loc[0]:.3f} (R² {loc[1]:.3f}); nearest level-5 newform 5.436")
    if D != -8:
        locL = [peak_near(x, clean(x, comps["L"]), t - 0.25, t + 0.25)[0] for t in (4.1324, 6.0540, 8.2947)]
        print(f"   L: refined periodogram maxima near 4.13, 6.05, 8.29 at t = {', '.join('%.3f' % v for v in locL)}")
    hdr = " ".join(f"{t:>6.3f}{'+' if e > 0 else '-'}" for t, e in LV5) + " | " + " ".join(f"{t:>6.2f}R" for t in rpk)
    print(f"   {'':>2} {'noise':>6} | {hdr}")
    for k, yv in comps.items():
        if k == "L" and D == -8: continue
        a = fit(x, yv, freqs); nz = float(np.mean([fit(x, yv, freqs + [p])[-1] for p in PROBES]))
        a5 = a[len(LVL1):len(LVL1) + len(lv5)]; ar = a[len(LVL1) + len(lv5):]
        print(f"   {k:>2} {nz:6.4f} | " + " ".join(f"{v:7.4f}" for v in a5) + " | " + " ".join(f"{v:7.4f}" for v in ar))
