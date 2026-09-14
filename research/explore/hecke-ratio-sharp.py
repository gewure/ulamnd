"""hecke-ratio-sharp.py — amplitude ratio amp_j(u)/amp_j(1) of the level-1 line t_1 in the sharp Riesz pieces (object 'all',
4096 points) at dilations u = 2, 3, 5, against the CANDIDATE law read off the u = 2 data on 15 Sep 2026:

    r_j(u; D) = lambda_j(u^2)/u + (1 - chi_D(u))/(u(u+1)) - chi_D(u)^2 lambda_j(u)/sqrt(u),      lambda_j(u^2) = lambda_j(u)^2 - 1,

with the phase shifted by -t_j log u (+ pi when r < 0). Status: a guess fitted to three numbers (chi = 0, +1, -1 at u = 2);
its u = 3, 5 values are PREDICTIONS. Do not cite without a derivation (KNOWLEDGE F24: mechanism after test, not before).
Grids: research/paper-IV/data/piece-DS-all-D-<|D|>[-U<u>]-grid.dat (piece-divset.ts, sharp). Nuisance lines: the two next
even level-1 lines always; Strömberg's Γ_0(9) even set at u = 3; the six strongest data-driven peaks in [2, 12] at u = 5.
   python research/explore/hecke-ratio-sharp.py
"""
import os, sys, glob, re, math
import numpy as np
sys.path.insert(0, "research/python")
from ulamnd import spectral
from ulamnd.singular import kronecker
DATA = "research/paper-IV/data"
T1, T2 = 13.779751351890739, 17.738563381057378
LAM1 = {2: 1.549304477941296, 3: 0.246899772453981, 5: 0.737060385348301}

def chi_D(D, u):
    if u == 2:
        return 0 if D % 2 == 0 else (1 if D % 8 == 1 else -1)
    return kronecker(D, u)

def candidate(u, chi, lam):
    return (lam * lam - 1) / u + (1 - chi) / (u * (u + 1)) - chi * chi * lam / math.sqrt(u)

def top_peaks(x, y, tmin, tmax, n, avoid, step=0.01):
    ts = np.arange(tmin, tmax, step); r = np.array([spectral.joint_r2(x, y, [t]) for t in ts])
    idx = sorted([i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]], key=lambda i: -r[i]); out = []
    for i in idx:
        if all(abs(ts[i] - a) > 0.3 for a in list(avoid) + out): out.append(float(ts[i]))
        if len(out) >= n: break
    return out

def fit(path, u):
    x, y = spectral.load_grid(path); y = spectral.detrend(x, y, deg=3)
    nuis = [19.423481, 21.315796]
    if u == 3: nuis += spectral.GAMMA0_9_EVEN
    if u == 5: nuis += top_peaks(x, y, 2, 12, 6, avoid=[T1, T2])
    lines = spectral.fit_lines(x, y, [T1, T2] + nuis)
    return lines[0], float(np.std(y))

runs = {}
for f in glob.glob(os.path.join(DATA, "piece-DS-all-D-*-grid.dat")):
    if "smooth" in f: continue
    m = re.search(r"D-(\d+)(?:-U(\d+))?-grid", f); runs[(-int(m.group(1)), int(m.group(2) or 1))] = f
print(f"{'D':>4} {'u':>2} {'chi':>3} {'amp(1)':>7} {'amp(u)':>7} {'ratio_obs':>9} {'phase-(-t log u)':>16} {'signed_obs':>10} {'candidate':>9} | noise")
for (D, u), f in sorted(runs.items(), key=lambda kv: (kv[0][1], -kv[0][0])):
    if u == 1 or (D, 1) not in runs: continue
    (t, Cu, pu), nz = fit(f, u); (t, C1, p1), _ = fit(runs[(D, 1)], 1)
    dphi = ((pu - p1 + T1 * math.log(u) + math.pi) % (2 * math.pi)) - math.pi
    signed = Cu / C1 * (1 if abs(dphi) < math.pi / 2 else -1)
    chi = chi_D(D, u)
    print(f"{D:>4} {u:>2} {chi:>+3d} {C1:7.4f} {Cu:7.4f} {Cu/C1:9.3f} {dphi:+16.3f} {signed:+10.3f} {candidate(u, chi, LAM1[u]):+9.3f} | {nz:.4f}")
