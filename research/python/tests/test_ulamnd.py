"""Cross-checks of the Python package against brute force and against the TypeScript outputs in research/paper-IV/data.
Run:  cd research/python && ../../.venv-or-your-python -m pytest -q      (or: python tests/test_ulamnd.py)
"""
import os, sys, math, random
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
import numpy as np
from ulamnd import roots, singular, pieces, spectral, maass

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))))
DATA = os.path.join(ROOT, "research", "paper-IV", "data")

def test_roots_mod_p_bruteforce():
    rng = random.Random(7)
    for p in [5, 7, 11, 13, 101, 1009, 10007]:
        for _ in range(6):
            f = [rng.randrange(1, p)] + [rng.randrange(p) for _ in range(rng.choice([2, 3]))]
            got = roots.roots_mod_p(f, p)
            exp = sorted(x for x in range(p) if roots.eval_mod(f, x, p) == 0)
            assert got == exp, (f, p, got, exp)

def test_roots_mod_d_bruteforce():
    f = [1, 0, 0, -2]
    for d in [31 * 43, 7 * 31, 31 * 31, 43 * 31 * 7]:
        got = roots.roots_mod_d(f, d)
        exp = sorted(x for x in range(d) if roots.eval_mod(f, x, d) == 0)
        assert got == exp, (d, got, exp)

def test_kronecker_and_L1():
    # chi_{-4}: 1 on 1 mod 4, -1 on 3 mod 4, 0 on even
    assert [singular.kronecker(-4, n) for n in range(1, 9)] == [1, 0, -1, 0, 1, 0, -1, 0]
    # L(1, chi_{-4}) = pi/4
    assert abs(float(singular.L1_chi(-4)) - math.pi / 4) < 1e-15
    # L(1, chi_5) = 2 log((1+sqrt5)/2)/sqrt5
    assert abs(float(singular.L1_chi(5)) - 2 * math.log((1 + 5 ** .5) / 2) / 5 ** .5) < 1e-15

def test_C_quadratic_hardy_littlewood():
    # the Hardy–Littlewood constant for primes n^2 + 1: 1.3728134628182...
    C, neglected = singular.C_quadratic(-4, P=200000)
    assert abs(float(C) - 1.3728134628182) < 2e-9, float(C)
    # two routes: P = 100000 and P = 200000 agree
    C2, _ = singular.C_quadratic(-4, P=100000)
    assert abs(float(C) - float(C2)) < 1e-9

def test_S_f_two_routes():
    f = [1, 0, 1]
    a, b = singular.S_f(f, 1, P=50000), singular.S_f(f, 1, P=150000)
    assert abs(float(a) - float(b)) < 1e-7, (float(a), float(b))
    # h = 2: p = 5 divides f(1) f(3) = 2 * 10 ... nu_f(5, 2) = |{2,3} ∪ {0,1}| = 4 → local factor (1 - 4/5)/(1-1/5)^2 = 0.3125
    assert singular.nu_f(f, 5, 2) == 4

def _bruteforce_P(D, T, E):
    def F(n):
        s = 0.0; d = 1
        while d * d <= n:
            if n % d == 0:
                if d % 2 == 1: s += 1 / d
                e = n // d
                if e != d and e % 2 == 1: s += 1 / e
            d += 1
        return s
    return sum((T - h) * (F(h * h - D) - E) for h in range(1, T + 1)) - (E - 1) * T / 2

def test_pieces_against_bruteforce_and_ts():
    res = pieces.pieces(D=-4, Y=20000, sets=("coprime",))["coprime"]
    E = res.E
    assert abs(E - 1.1136805) < 1e-6, E
    grid = {int(r[1]): r[2] for r in res.grid}
    for T in [1000, 2000, 5000]:
        bf = _bruteforce_P(-4, T, E)
        # nearest grid point
        Tg = min(grid, key=lambda t: abs(t - T)); bfg = _bruteforce_P(-4, Tg, E)
        assert abs(grid[Tg] - bfg) < 1e-6 * max(1, abs(bfg)), (Tg, grid[Tg], bfg)
    # against the TypeScript grid (Y = 10^7; P(T) does not depend on Y beyond E, which agrees to ~1e-12)
    ts = os.path.join(DATA, "piece-DS-coprime-D-4-grid.dat")
    if os.path.exists(ts):
        rows = np.loadtxt(ts, skiprows=1); tsg = {int(r[1]): r[2] for r in rows}
        common = sorted(set(grid) & set(tsg))
        assert len(common) > 20
        diff = max(abs(grid[t] - tsg[t]) for t in common)
        assert diff < 0.05, diff

def test_spectral_first_line_in_ts_data():
    ts = os.path.join(DATA, "piece-DS-coprime-D-4-grid.dat")
    if not os.path.exists(ts):
        return
    x, y = spectral.load_grid(ts)
    y = spectral.detrend(x, y, deg=3, taper=True)
    top = [t for t, _ in spectral.peaks(x, y, 10, 25, n=6)]
    assert any(abs(t - 13.7798) < 0.06 for t in top), top
    r2, pct, med, p95 = spectral.percentile(x, spectral.detrend(x, spectral.load_grid(ts)[1], deg=3), spectral.EVEN_LEVEL1, 12, 25, n_random=100)
    assert pct >= 95, (r2, pct, med, p95)

def test_maass_prediction_D_minus_4():
    form = maass.first_even_form()
    C, phi = maass.predict_smooth_line(form, -4)
    assert abs(C - 0.05999) < 3e-4, C          # paper IV / smooth-two-lines.py: 0.05999
    assert abs(phi - 4.0663) < 3e-3, phi

if __name__ == "__main__":
    for name, fn in list(globals().items()):
        if name.startswith("test_"):
            fn(); print("ok", name)
