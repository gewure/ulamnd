"""drift-audit-run.py — rerun an analysis script with ulamnd.spectral.detrend extended by the drift columns of a float64
mean error: (Y/Ymax)^{3/2} (smooth and sharp grids) and (Y/Ymax)^{1/2} (sharp grids: the linear coefficient carries the same
error). Usage:  python research/explore/drift-audit-run.py plain|drift script.py [args]     (output to stdout)
"""
import sys, runpy
import numpy as np
sys.path.insert(0, "research/python"); sys.path.insert(0, "research/explore")
from ulamnd import spectral
mode, script = sys.argv[1], sys.argv[2]
if mode == "drift":
    def detrend(x, y, deg=1, taper=False):
        xm = x.mean(); Y = np.exp(x); Ym = Y.max()
        X = np.column_stack([((x - xm) / 5) ** k for k in range(deg + 1)] + [(Y / Ym) ** 1.5, (Y / Ym) ** 0.5])
        y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
        if taper: y = y * (0.5 - 0.5 * np.cos(2 * np.pi * np.arange(len(x)) / (len(x) - 1)))
        return y
    spectral.detrend = detrend
sys.argv = [script] + sys.argv[3:]
runpy.run_path(script, run_name="__main__")
