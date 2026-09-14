"""Spectral tests used in paper IV: detrending, single-frequency periodogram, joint fits, random-set percentiles.

The data are a series y(x) on a grid x = log Y (typically P(Y)/sqrt(Y) on 4096 log-spaced points). A spectral line at
the Maass parameter t appears as a cos(t x) / sin(t x) pair.

    x, y = load_grid("research/paper-IV/data/piece-DS-coprime-D-4-grid.dat")
    y = detrend(x, y, deg=3)
    peaks(x, y, 4, 30)                                  # top single-frequency R^2 peaks
    r2 = joint_r2(x, y, [13.7798, 17.7386, 19.4235])    # variance explained by a frequency set
    percentile(x, y, EVEN_LEVEL1, fmin=12, fmax=25)     # against random sets of the same size (the test of Table tab:fits)

Constants: EVEN_LEVEL1 / ODD_LEVEL1 are the first six even / odd spectral parameters of SL_2(Z) (LMFDB); GAMMA0_9_EVEN
and GAMMA0_9_ODD_ONLY are the level-9 eigenvalues from Strömberg (2012) as used in the u = 3 test.
"""
from __future__ import annotations
import numpy as np

EVEN_LEVEL1 = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353]
ODD_LEVEL1 = [9.533695, 12.173008, 14.358510, 16.138073, 16.644259, 18.180918]
GAMMA0_9_EVEN = [3.5360021, 5.0987419, 5.5040567, 6.6465814, 7.4317992, 8.6983430]        # Γ^3-type (both parities) and level-3 even
GAMMA0_9_ODD_ONLY = [4.3880536, 6.1205755, 6.7574153, 7.7581332, 8.1930359, 9.2923793]    # level-3 odd (absent in even objects)

def load_grid(path: str, col: int = 3):
    rows = np.loadtxt(path, skiprows=1)
    return rows[:, 0], rows[:, col]

def detrend(x, y, deg: int = 1, taper: bool = False):
    """Remove a least-squares polynomial of degree deg in x (x centred and scaled), optionally apply a Hann taper."""
    xm = x.mean()
    X = np.column_stack([((x - xm) / 5) ** k for k in range(deg + 1)])
    y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
    if taper:
        y = y * (0.5 - 0.5 * np.cos(2 * np.pi * np.arange(len(x)) / (len(x) - 1)))
    return y

def joint_r2(x, y, freqs) -> float:
    """Fraction of the variance of y explained by the joint least-squares fit of cos/sin at the given frequencies
    (QR, so nearly collinear frequencies are handled)."""
    A = np.column_stack([f(t * x) for t in freqs for f in (np.cos, np.sin)])
    Q, _ = np.linalg.qr(A)
    proj = Q.T @ y
    return float(proj @ proj / (y @ y))

def periodogram(x, y, tmin: float, tmax: float, step: float = 0.005):
    ts = np.arange(tmin, tmax + step / 2, step)
    return ts, np.array([joint_r2(x, y, [t]) for t in ts])

def peaks(x, y, tmin: float, tmax: float, step: float = 0.005, n: int = 10):
    """Top n local maxima (frequency, R^2) of the single-frequency periodogram."""
    ts, r = periodogram(x, y, tmin, tmax, step)
    idx = [i for i in range(1, len(r) - 1) if r[i] > r[i - 1] and r[i] >= r[i + 1]]
    idx.sort(key=lambda i: -r[i])
    return [(float(ts[i]), float(r[i])) for i in idx[:n]]

def percentile(x, y, freqs, fmin: float, fmax: float, n_random: int = 300, min_gap: float = 0.4, seed: int = 1):
    """R^2 of the set `freqs` and its percentile among n_random random sets of the same size drawn uniformly from
    [fmin, fmax] with pairwise gaps >= min_gap. Returns (r2, percentile, random_median, random_95th)."""
    rng = np.random.default_rng(seed)
    k = len(freqs)
    rand = []
    while len(rand) < n_random:
        s = []
        while len(s) < k:
            t = fmin + (fmax - fmin) * rng.random()
            if all(abs(t - u) >= min_gap for u in s):
                s.append(t)
        rand.append(joint_r2(x, y, s))
    rand = np.sort(rand)
    r2 = joint_r2(x, y, freqs)
    return r2, 100.0 * np.searchsorted(rand, r2) / n_random, float(np.median(rand)), float(rand[int(0.95 * n_random)])

def fit_lines(x, y, freqs):
    """Amplitude and phase of each frequency in a joint fit: returns [(t, C, phi)] with y ≈ sum C cos(t x - phi)."""
    A = np.column_stack([f(t * x) for t in freqs for f in (np.cos, np.sin)])
    c, *_ = np.linalg.lstsq(A, y, rcond=None)
    return [(t, float(np.hypot(c[2 * i], c[2 * i + 1])), float(np.arctan2(c[2 * i + 1], c[2 * i]) % (2 * np.pi))) for i, t in enumerate(freqs)]
