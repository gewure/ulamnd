"""hecke-components-fit.py (v2, 15 Sep 2026) — analysis of research/explore/data/components-D<|D|>-U<u>-grid.dat.

Design matrix of every fit: 1, (x - mean)/5, (Y/Ymax)^{3/2}, and cos/sin at the frequencies. The Y^{3/2} column is the exact
shape of an error δ in a subtracted mean (δ·√Y·Σ_h w(h/Y), Σ w ≈ 0.111·Y): the float64 means of the scripts differ at the
1e-11 level (mean-precision.py), which a degree-1 detrend in x = log Y does not remove.
(1) Regression of column P against the paper's grid, before and after removing a fitted δ·Y^{3/2}.
(2) Per-line amplitudes in P, T, L = L1 + L2, R, with a noise floor (mean amplitude at off-line probe frequencies).
    u = 3: Strömberg's attributions (level-one; level-3 even newforms 5.0987, 8.0389; cycloidal Γ³ 3.5360, 5.5041, 6.6466,
    7.4318, 8.6983; unattributed 8.7783). u = 5: the strongest periodogram peaks of L and of R in [2, 12] (no tabulated data).
(3) Signed ratio of t_1 to the u = 1 amplitude C_1(D) against the predictions T: w̄u^{-1/2}, L: r_1 - w̄u^{-1/2}, R: 0.
    python research/explore/hecke-components-fit.py [u]
"""
import sys, glob, re, math
import numpy as np
sys.path.insert(0, "research/python")
from ulamnd import spectral
T1 = 13.779751351890739
LAM1 = {3: 0.246899772453981, 5: 0.737060385348301}
LVL1 = [13.779751, 17.738563, 19.423481, 21.315796]
U3 = {"N5.10": 5.0987419, "N8.04": 8.038861, "C3.54": 3.5360021, "C5.50": 5.5040567, "C6.65": 6.6465814, "C7.43": 7.4317992, "C8.70": 8.6983430, "?8.78": 8.778282}
PROBES = [10.6, 11.3, 12.0, 12.7, 15.3, 16.0, 23.5, 26.0]

def kron(D, p): return 0 if D % p == 0 else (1 if pow(D % p, (p - 1) // 2, p) == 1 else -1)
def r_closed(u, chi, l):
    s = math.sqrt(u); g = l * s / (u + 1); h = (l * l - 1 - 1 / u) / (u + 1)
    G = np.array([[1, g, h], [g, 1, g], [h, g, 1]]); p0 = l * s + (u - 1) if chi == 0 else l * s - (1 + chi); p1 = 2 * u if chi == 0 else u - chi
    return s * float(np.array([p0, p1, p0]) @ np.linalg.solve(u * (u + 1) * G, np.array([1, 1 / u, 1 / u ** 2])))
def base(x):
    Y = np.exp(x); return [np.ones_like(x), (x - x.mean()) / 5, (Y / Y.max()) ** 1.5]
def fit(x, y, freqs):
    cols = base(x) + [f(t * x) for t in freqs for f in (np.cos, np.sin)]
    A = np.column_stack(cols); c, *_ = np.linalg.lstsq(A, y, rcond=None); nb = 3
    return [(t, float(np.hypot(c[nb + 2 * i], c[nb + 2 * i + 1])), float(np.arctan2(c[nb + 2 * i + 1], c[nb + 2 * i]) % (2 * np.pi))) for i, t in enumerate(freqs)], c, y - A @ c
def clean(x, y):
    A = np.column_stack(base(x)); c, *_ = np.linalg.lstsq(A, y, rcond=None); return y - A @ c
def peaks(x, y, n, tmin=2.0, tmax=12.0, gap=0.35):
    ts = np.arange(tmin, tmax, 0.01); r = np.array([spectral.joint_r2(x, y, [t]) for t in ts])
    idx = sorted([i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]], key=lambda i: -r[i]); out = []
    for i in idx:
        if all(abs(ts[i] - a) > gap for a in out): out.append(round(float(ts[i]), 2))
        if len(out) >= n: break
    return sorted(out)
def signed(Cu, pu, C1, p1, u):
    d = ((pu - p1 + T1 * math.log(u) + math.pi) % (2 * math.pi)) - math.pi
    return Cu / C1 * (1 if abs(d) < math.pi / 2 else -1), d

want = int(sys.argv[1]) if len(sys.argv) > 1 else None
for f in sorted(glob.glob("research/explore/data/components-D*-U*-grid.dat")):
    m = re.search(r"components-D(\d+)-U(\d+)-grid", f); D, u = -int(m.group(1)), int(m.group(2))
    if want and u != want: continue
    chi = kron(D, u); rows = np.loadtxt(f, skiprows=1); x = rows[:, 0]
    comps = {"P": rows[:, 2], "T": rows[:, 3], "L": rows[:, 4] + rows[:, 5], "R": rows[:, 6]}
    ref = np.loadtxt(f"research/paper-IV/data/piece-DS-all-D-{-D}-U{u}-smooth-grid.dat", skiprows=1)
    dif = comps["P"] - ref[:, 3]; g = (np.exp(x) / np.exp(x).max()) ** 1.5; k = float(dif @ g / (g @ g))
    x1, y1 = spectral.load_grid(f"research/paper-IV/data/piece-DS-all-D-{-D}-smooth-grid.dat")
    (_, C1, p1) = fit(x1, y1, LVL1)[0][0]
    wbar = (u - chi) / (u * (u + 1)); triv = wbar / math.sqrt(u); r = r_closed(u, chi, LAM1[u])
    pred = {"P": r, "T": triv, "L": r - triv, "R": 0.0}
    if u == 3:
        named = dict(U3)
    else:
        pl = peaks(x, clean(x, comps["L"]), 6) if chi != -1 else []
        pr = peaks(x, clean(x, comps["R"]), 6)
        named = {f"L{t:.2f}": t for t in pl}
        for t in pr:
            if all(abs(t - s) > 0.35 for s in pl): named[f"R{t:.2f}"] = t
    freqs = LVL1 + list(named.values())
    print(f"\nD={D} u={u} chi={chi:+d}: regression max|P-ref| = {np.max(np.abs(dif)):.1e}, after removing {k:+.3e}·(Y/Ymax)^1.5: {np.max(np.abs(dif - k * g)):.1e};  C1(D) = {C1:.4f}")
    print(f"   {'':>2} {'rms':>6} {'noise':>6} | {'t1':>6} {'signed':>7} {'pred':>7} {'dphi':>6} | " + " ".join(f"{n:>6}" for n in named))
    for kk, yv in comps.items():
        if kk == "L" and chi == -1:
            print(f"   {kk:>2} identically zero (inert)"); continue
        lines, c, res = fit(x, yv, freqs)
        amps = {t: a for (t, a, _) in lines}
        noise = float(np.mean([fit(x, yv, freqs + [p])[0][-1][1] for p in PROBES]))
        s, d = signed(lines[0][1], lines[0][2], C1, p1, u)
        print(f"   {kk:>2} {np.sqrt(np.mean(clean(x, yv) ** 2)):6.4f} {noise:6.4f} | {lines[0][1]:6.4f} {s:+7.3f} {pred[kk]:+7.3f} {d:+6.2f} | " + " ".join(f"{amps[t]:6.4f}" for t in named.values()))
