"""The pieces of paper IV in Python: Riesz mean of the divisor-type sum along a quadratic, sharp and smooth window.

Model object (paper IV, eq. model, "unrestricted"/"all" and "coprime" divisor sets), for a discriminant D and dilation u:
    Q_u(h) = u^2 h^2 - D,   F(h) = sum_{d | Q_u(h), d in the divisor set} 1/d,   E = sum_{d in set} rho(d)/d^2,
    P(Y)   = sum_{h<=Y} (Y - h)(F(h) - E) - (E - 1) Y / 2                       (Riesz mean of order 1, paper convention),
    S^w(Y) = sum_h w(h/Y) (F(h) - E)                                             (smooth window; Theorem thm:smooth)
with the divisor sets  "coprime": (d, 2 D u) = 1  and  "all": every d.  P(Y)/sqrt(Y) oscillates at the even Maass
parameters of SL_2(Z) (and of the newforms of the levels e | rad 2D for the coprime set).

Implementation: numpy sieve over the roots of Q_u mod p for all p <= Y (Tonelli–Shanks), Hensel lifts for p^k, the
special primes p | 2Du by repeated division; the cofactor after sieving all p <= Y is 1 or a prime since Q_u <= u^2 Y^2 + |D| < (uY+..)^2
— we sieve to P_max = uY + sqrt|D| + 2 exactly as piece-divset.ts. E is computed as an Euler product with the exact tail
(prime zeta and L(2, chi)). Y = 10^7 takes about a minute in numpy; Y = 10^6 a few seconds.

    >>> res = pieces(D=-4, Y=10**6)
    >>> res["coprime"].grid        # (logY, Y, P, P/sqrtY) rows on 4096 log-spaced points, same format as the .dat files
"""
from __future__ import annotations
from dataclasses import dataclass, field
import math
import numpy as np
from mpmath import mp, mpf, primezeta, log, exp
from .roots import primes_upto, sqrt_mod_p, hensel_lift
from .singular import kronecker, fundamental_discriminant, sum_chi_over_primes

@dataclass
class PieceResult:
    D: int
    u: int
    divisor_set: str
    Y: int
    E: float
    F: np.ndarray                       # F(h), h = 0..Y (F[0] unused)
    grid: np.ndarray = field(default=None)      # columns logY, Y, P, P/sqrtY
    smooth: np.ndarray = field(default=None)    # columns logY, Y, sqrtY*S^w
    linear_coeff_analytic: float = 0.0

def expectation(D: int, u: int, divisor_set: str, P: int = 200000) -> float:
    """E = sum_{d in set} rho_u(d)/d^2 = prod_p (sum_k rho(p^k)/p^{2k}); for p not dividing 2Du, rho(p^k) = 1 + chi_D(p) and
    the factor is 1 + (1+chi)/(p^2-1). Tail beyond P exact through primezeta(2) and sum_p chi(p)/p^2 (log L)."""
    D0 = fundamental_discriminant(D)
    primes = primes_upto(P)
    special = [p for p in primes if (2 * D * u) % p == 0]
    logE = mpf(0)
    for p in primes:
        if p in special:
            if divisor_set == "coprime":
                continue
            # sum_k rho(p^k)/p^{2k} with rho(p^k) counted exactly by lifting root sets level by level (roots may be multiple)
            s, pk, roots = mpf(1), 1, [0]
            for k in range(1, 200):
                pk_new = pk * p
                roots = [x + pk * t for x in roots for t in range(p) if (u * u * (x + pk * t) ** 2 - D) % pk_new == 0]
                pk = pk_new
                if not roots or pk > 10 ** 40:
                    break
                s += mpf(len(roots)) / mpf(pk) ** 2
            logE += log(s)
        else:
            chi = kronecker(D0, p)
            logE += log(1 + mpf(1 + chi) / (mpf(p) ** 2 - 1))
    # tail: log(1 + (1+chi)/(p^2-1)) = (1+chi)/p^2 + O(p^-4)
    pz2 = primezeta(2) - sum(mpf(p) ** (-2) for p in primes)
    chi2 = sum_chi_over_primes(mpf(2), D0) - sum(kronecker(D0, p) / mpf(p) ** 2 for p in primes if p not in special)
    logE += pz2 + chi2
    return float(exp(logE))

def pieces(D: int, Y: int, u: int = 1, sets=("coprime", "all"), smooth: bool = False, grid_points: int = 4096,
           window=None) -> dict:
    """Compute the pieces for the divisor sets requested. Returns {set_name: PieceResult}."""
    if D % 4 not in (0, 1) or (D > 0 and math.isqrt(D) ** 2 == D):
        raise ValueError("D must be a non-square discriminant")
    if u < 1 or any(u % (q * q) == 0 for q in range(2, int(u ** 0.5) + 1)):
        raise ValueError("u must be squarefree")
    Pmax = u * Y + math.isqrt(abs(D)) + 2
    primes = primes_upto(Pmax)
    special = [p for p in primes if (2 * D * u) % p == 0]
    h = np.arange(Y + 1, dtype=np.int64)
    Q = np.abs(u * u * h * h - D).astype(np.int64)
    Q[0] = 1
    rem = Q.copy()
    Fc = np.ones(Y + 1); Fa = np.ones(Y + 1)
    Qmax = int(Q.max())
    inv_u2 = None
    for p in primes:
        if p in special:
            # exponent of p in Q(h) by repeated division; local factor 1 + 1/p + ... + 1/p^k into F_all only
            e = np.zeros(Y + 1, dtype=np.int64)
            mask = rem % p == 0
            while mask.any():
                rem[mask] //= p
                e[mask] += 1
                mask = rem % p == 0
            kmax = int(e.max())
            loc = np.ones(kmax + 1)
            for k in range(1, kmax + 1):
                loc[k] = loc[k - 1] + p ** (-k)
            Fa *= loc[e]
            continue
        # roots of u^2 x^2 ≡ D mod p:  x ≡ ±sqrt(D) · u^{-1}
        Dp = D % p
        if Dp == 0:
            continue  # cannot happen for p not special
        if kronecker(D, p) != 1:
            continue
        s = sqrt_mod_p(Dp, p)
        ui = pow(u, -1, p)
        roots = sorted({(s * ui) % p, ((p - s) * ui) % p})
        # k = 1
        for r in roots:
            sl = slice(r if r else p, Y + 1, p)
            rem[sl] //= p
            Fc[sl] *= 1 + 1 / p
            Fa[sl] *= 1 + 1 / p
        # higher powers p^k <= Qmax: Hensel lifts (simple roots)
        pk, k = p, 1
        while pk * p <= Qmax:
            pk *= p; k += 1
            lifted = [hensel_lift([u * u, 0, -D], r, p, k) for r in roots]
            factor = (sum(p ** (-j) for j in range(k + 1))) / (sum(p ** (-j) for j in range(k)))
            any_hit = False
            for r in lifted:
                if r > Y:
                    continue
                sl = slice(r if r else pk, Y + 1, pk)
                idx = np.arange(sl.start, sl.stop, sl.step)
                hit = idx[rem[idx] % p == 0]
                if hit.size:
                    any_hit = True
                    rem[hit] //= p
                    Fc[hit] *= factor
                    Fa[hit] *= factor
            if not any_hit and pk > Y:
                break
    # cofactors: 1 or a prime > Pmax
    big = rem > 1
    Fc[big] *= 1 + 1 / rem[big]
    Fa[big] *= 1 + 1 / rem[big]
    out = {}
    for name, F in (("coprime", Fc), ("all", Fa)):
        if name not in sets:
            continue
        E = expectation(D, u, name)
        res = PieceResult(D, u, name, Y, E, F)
        d = F - E; d[0] = 0
        S1 = np.cumsum(d); S2 = np.cumsum(h * d)
        lin = (E - 1) / 2 if name == "coprime" else None  # paper's analytic linear coefficient for the coprime set
        res.linear_coeff_analytic = lin if lin is not None else float("nan")
        Ts = np.unique(np.round(np.exp(np.linspace(math.log(1000), math.log(Y), grid_points))).astype(np.int64))
        P = Ts * S1[Ts] - S2[Ts] - (E - 1) * Ts / 2
        res.grid = np.column_stack([np.log(Ts), Ts, P, P / np.sqrt(Ts)])
        if smooth:
            w = window or (lambda t: math.exp(-1 / (1 - (4 * t - 3) ** 2)) if 0.5 < t < 1 else 0.0)
            Ys = np.unique(np.round(np.exp(np.linspace(math.log(2000), math.log(Y), 400))).astype(np.int64))
            vals = []
            for Yv in Ys:
                hs = np.arange(Yv // 2 + 1, Yv)
                wv = np.array([w(x / Yv) for x in hs])
                vals.append(math.sqrt(Yv) * float(np.dot(wv, d[hs])))
            res.smooth = np.column_stack([np.log(Ys), Ys, vals])
        out[name] = res
    return out

def write_grid(res: PieceResult, path: str) -> None:
    """Write the grid in the format of the .dat files (header 'logY Y P PoverSqrtY')."""
    with open(path, "w") as fh:
        fh.write("logY Y P PoverSqrtY\n")
        for lY, Yv, P, Ps in res.grid:
            fh.write(f"{lY:.5f} {int(Yv)} {P:.4f} {Ps:.6f}\n")
