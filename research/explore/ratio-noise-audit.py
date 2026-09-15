"""ratio-noise-audit.py — noise floor of every entry of the dilation draft's Table tab:ratios (16 Sep 2026, after an outside review
asked whether the u = 3 inert outlier D = -7 (+0.341) disagrees with the exact identity r = u^{-3/2}).
Fit procedure of hecke-ratio-sharp.py (sharp grids, degree-3 detrend, nuisance lines: t_2, 19.42, 21.32; Strömberg's Γ_0(9) even set
at u = 3; the six strongest data-driven peaks in [2,12] at u = 5), in two variants: as published, and with the mean-error columns
(Y/Ymax)^{3/2}, (Y/Ymax)^{1/2} in the detrend (ERRATA 35). Noise = mean fitted amplitude at eight probe frequencies around t_1
(11.0 … 16.8, each at least 0.94 from t_1 and t_2), with the same nuisance set; expressed in ratio units by dividing by C_1(D).
z = (signed_obs - pred) / noise_ratio.       python research/explore/ratio-noise-audit.py
"""
import sys, os, math
import numpy as np
sys.path.insert(0, "research/python")
from ulamnd import spectral
DATA = "research/paper-IV/data"
T1, T2 = 13.779751351890739, 17.738563381057378
PROBES = [11.0, 11.6, 12.2, 12.8, 15.0, 15.6, 16.2, 16.8]
PRED = {(2, -4): 0.850, (2, -8): 0.850, (2, -20): 0.850, (2, -7): -0.341, (2, -15): -0.341, (2, -23): -0.341, (2, -3): -0.068, (2, -11): -0.068, (2, -19): -0.068,
        (3, -3): 0.695, (3, -15): 0.695, (3, -8): -0.311, (3, -11): -0.311, (3, -20): -0.311, (3, -4): 0.1925, (3, -7): 0.1925,
        (5, -15): 0.421, (5, -4): -0.076, (5, -11): -0.076, (5, -3): 0.089, (5, -8): 0.089}
def detrend(x, y, deg, drift):
    xm = x.mean(); Y = np.exp(x); cols = [((x - xm) / 5) ** k for k in range(deg + 1)]
    if drift: cols += [(Y / Y.max()) ** 1.5, (Y / Y.max()) ** 0.5]
    X = np.column_stack(cols); return y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
def top_peaks(x, y, tmin, tmax, n, avoid, step=0.01):
    ts = np.arange(tmin, tmax, step); r = np.array([spectral.joint_r2(x, y, [t]) for t in ts])
    idx = sorted([i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]], key=lambda i: -r[i]); out = []
    for i in idx:
        if all(abs(ts[i] - a) > 0.3 for a in list(avoid) + out): out.append(float(ts[i]))
        if len(out) >= n: break
    return out
def fit(path, u, drift):
    x, y = spectral.load_grid(path); y = detrend(x, y, 3, drift)
    nuis = [19.423481, 21.315796]
    if u == 3: nuis += spectral.GAMMA0_9_EVEN
    if u == 5: nuis += top_peaks(x, y, 2, 12, 6, avoid=[T1, T2])
    lines = spectral.fit_lines(x, y, [T1, T2] + nuis)
    noise = float(np.mean([spectral.fit_lines(x, y, [T1, T2] + nuis + [p])[-1][1] for p in PROBES]))
    return lines[0], noise
print(f"{'u':>2} {'D':>4} {'variant':>9} | {'C1':>7} {'Cu':>7} {'signed':>7} {'pred':>7} | {'noise(amp)':>10} {'noise(ratio)':>12} {'z':>6}")
for (u, D), pred in PRED.items():
    pu = os.path.join(DATA, f"piece-DS-all-D-{-D}-U{u}-grid.dat"); p1 = os.path.join(DATA, f"piece-DS-all-D-{-D}-grid.dat")
    if not (os.path.exists(pu) and os.path.exists(p1)): print(f"{u:>2} {D:>4} (no grid)"); continue
    for drift in (False, True):
        (_, C1, ph1), _ = fit(p1, 1, drift); (_, Cu, phu), nz = fit(pu, u, drift)
        d = ((phu - ph1 + T1 * math.log(u) + math.pi) % (2 * math.pi)) - math.pi
        s = Cu / C1 * (1 if abs(d) < math.pi / 2 else -1); nr = nz / C1
        print(f"{u:>2} {D:>4} {'drift' if drift else 'published':>9} | {C1:7.4f} {Cu:7.4f} {s:+7.3f} {pred:+7.3f} | {nz:10.4f} {nr:12.3f} {(s - pred) / nr:+6.2f}")
