"""mean-precision.py — why hecke-components.ts and piece-divset.ts disagree by a constant mean offset ~1e-11 for split u = 3.
Replicates both codes' float64 products (Python floats are IEEE doubles, same as JS), a log-sum reference (math.fsum of log1p),
and the accuracy of the shared tail formula (cutoffs Pmax, Pmax/2, Pmax/4).   python research/explore/mean-precision.py
"""
import math, numpy as np
import sys
U, Y = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (3, 10_000_000)
DS = [int(v) for v in sys.argv[3:]] or [-8, -11, -20]
def tail(Pm):
    xx = math.log(Pm); return math.exp(math.exp(-xx) / xx * (1 - 1 / xx + 2 / xx ** 2 - 6 / xx ** 3 + 24 / xx ** 4))
N = U * Y
lim = N + 1000 + 10
sv = np.ones(lim + 1, dtype=bool); sv[:2] = False
for i in range(2, int(lim ** 0.5) + 1):
    if sv[i]: sv[i * i::i] = False
primes = np.nonzero(sv)[0]
for D in DS:
    Pmax = N + math.ceil(math.sqrt(abs(D))) + 2
    ps = primes[primes <= Pmax]
    special = [int(p) for p in ps[:50] if (2 * D) % int(p) == 0]
    spec = 1.0
    for p in special:
        mean, pk = 1.0, 1
        for k in range(1, 21):
            pk *= p
            if pk > 4e6: break
            x = np.arange(pk, dtype=np.int64); rho = int(np.count_nonzero((x * x - D) % pk == 0))
            if rho == 0: break
            mean += rho / (pk * pk)
        spec *= mean
    odd = ps[(ps > 2) & ((2 * D) % ps != 0)]
    leg = np.array([pow(D % int(p), (int(p) - 1) // 2, int(p)) == 1 for p in odd])
    split = [int(p) for p in odd[leg]]
    mine_gen = 1.0
    for p in split: mine_gen *= 1 + 2 / (p * p - 1)
    mine_gen *= tail(Pmax)
    chi = 1 if pow(D % U, (U - 1) // 2, U) == 1 else -1
    LA = 1 + (1 + chi) / (U * U - 1)
    E_mine = (spec * mine_gen) / LA
    ref_gen = 1.0
    for p in split:
        if p != U: ref_gen *= 1 + 2 / (p * p - 1)
    ref_gen *= tail(Pmax)
    E_ref = spec * ref_gen
    def hp(cut):
        s = math.fsum(math.log1p(2 / (p * p - 1)) for p in split if p != U and p <= cut)
        return spec * math.exp(s) * tail(cut)
    E_hp = hp(Pmax); E_hp2 = hp(Pmax / 2); E_hp4 = hp(Pmax / 4)
    print(f"D={D}: split primes {len(split)}; E_mine-E_ref = {E_mine-E_ref:+.3e}  (measured on the grids: E_ref-E_mine = delta)")
    print(f"        E_hp-E_mine = {E_hp-E_mine:+.3e}   E_hp-E_ref = {E_hp-E_ref:+.3e}")
    print(f"        tail-formula check: E_hp(Pmax/2)-E_hp(Pmax) = {E_hp2-E_hp:+.3e},  E_hp(Pmax/4)-E_hp(Pmax) = {E_hp4-E_hp:+.3e}")
