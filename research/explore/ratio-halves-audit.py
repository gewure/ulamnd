"""ratio-halves-audit.py — second, independent error estimate for Table tab:ratios (15 Sep 2026): fit the t_1 line separately on the
lower and the upper half of the log-Y range (same procedure as ratio-noise-audit.py, published variant, detrend inside each half,
C_1 and the reference phase from the full u = 1 grid). SE_half = |r_lower - r_upper| / 2 estimates the standard error of the
full-range ratio; pooled per u as an rms. Also prints the probe-noise estimate for comparison.   python research/explore/ratio-halves-audit.py
"""
import sys, os, math, importlib.util
import numpy as np
sys.path.insert(0, "research/python")
from ulamnd import spectral
spec = importlib.util.spec_from_file_location("rna", "research/explore/ratio-noise-audit.py")
src = open("research/explore/ratio-noise-audit.py").read().split("print(f\"{'u':>2}")[0]      # reuse definitions only
ns = {}; exec(compile(src, "ratio-noise-audit.py", "exec"), ns)
detrend, top_peaks, PRED, T1, T2, DATA, PROBES = ns["detrend"], ns["top_peaks"], ns["PRED"], ns["T1"], ns["T2"], ns["DATA"], ns["PROBES"]
def fit_xy(x, y, u):
    y = detrend(x, y, 3, False)
    nuis = [19.423481, 21.315796]
    if u == 3: nuis += spectral.GAMMA0_9_EVEN
    if u == 5: nuis += top_peaks(x, y, 2, 12, 6, avoid=[T1, T2])
    return spectral.fit_lines(x, y, [T1, T2] + nuis)[0]
pooled = {2: [], 3: [], 5: []}
print(f"{'u':>2} {'D':>4} | {'r_full':>7} {'r_lower':>8} {'r_upper':>8} {'SE_half':>8} | {'pred':>7} {'z_half':>7}")
for (u, D), pred in PRED.items():
    pu = os.path.join(DATA, f"piece-DS-all-D-{-D}-U{u}-grid.dat"); p1 = os.path.join(DATA, f"piece-DS-all-D-{-D}-grid.dat")
    if not (os.path.exists(pu) and os.path.exists(p1)): continue
    x1, y1 = spectral.load_grid(p1); (_, C1, ph1) = fit_xy(x1, y1, 1)
    xu, yu = spectral.load_grid(pu); mid = np.median(xu)
    rs = []
    for sel in (np.ones_like(xu, bool), xu <= mid, xu > mid):
        (_, Cu, phu) = fit_xy(xu[sel], yu[sel], u)
        d = ((phu - ph1 + T1 * math.log(u) + math.pi) % (2 * math.pi)) - math.pi
        rs.append(Cu / C1 * (1 if abs(d) < math.pi / 2 else -1))
    se = abs(rs[1] - rs[2]) / 2; pooled[u].append(se)
    print(f"{u:>2} {D:>4} | {rs[0]:+7.3f} {rs[1]:+8.3f} {rs[2]:+8.3f} {se:8.3f} | {pred:+7.3f} {(rs[0]-pred)/max(se,1e-9):+7.2f}")
for u, v in pooled.items():
    if v: print(f"u={u}: pooled SE_half (rms over {len(v)} entries) = {math.sqrt(np.mean(np.square(v))):.3f}")
