# Saving map for the §12 residual via Bourgain-Garaev's Hoelder inequality (Acta Arith. 2014, proof of Thm 3):
#   |S|^{2k1k2} <= m N1^{2k1k2-2k1} N2^{2k1k2-2k2} J_{2k1}(N1) J_{2k2}(N2)
# with energy bounds (exponents base m, nu = log N / log m):
#   BG Thm 1:  j_BG(k,nu) = k nu + max(0, (2k-1) nu - 1)
#   k = 2 (Cilleruelo-Garaev transfer, side agent, to verify): j_4(nu) = max(2 nu, 3.5 nu - 0.5); for k >= 2 also (2k-4) nu + j_4(nu)
#   k = 1: j = nu.
# Residual (PROOFS §12.4): nu1 + nu2 = theta = a/(1-a), nu_i in (theta - 1/2, 1/2). Saving in m-exponent; H-exponent = (1-a) * that.
import sys
def jBG(k, nu): return k*nu + max(0.0, (2*k-1)*nu - 1)
def j4new(nu): return max(2*nu, 3.5*nu - 0.5)
def jbest(k, nu, new):
    if k == 1: return nu
    v = jBG(k, nu)
    if new: v = min(v, (2*k-4)*nu + j4new(nu))
    return v
def saving(nu1, nu2, new, K=12):
    best = 0.0
    for k1 in range(1, K+1):
        for k2 in range(1, K+1):
            b = (1 + (2*k1*k2-2*k1)*nu1 + (2*k1*k2-2*k2)*nu2 + jbest(k1, nu1, new) + jbest(k2, nu2, new)) / (2*k1*k2)
            best = max(best, nu1 + nu2 - b)
    return best
print("a      theta   min saving (H-exp) old-J  new-J   argmin nu1 (new)")
for i in range(0, 34):
    a = 1/3 + 0.005 + i*0.005 if i < 33 else 0.4999
    th = a/(1-a); lo = max(th-0.5, 0.0)
    res_old = []; res_new = []
    steps = 400
    for s in range(1, steps):
        nu1 = lo + (0.5-lo)*s/steps; nu2 = th - nu1
        if not (lo < nu2 < 0.5): continue
        res_old.append((saving(nu1, nu2, False), nu1)); res_new.append((saving(nu1, nu2, True), nu1))
    mo = min(res_old); mn = min(res_new)
    print(f"{a:.4f} {th:.4f}  {mo[0]*(1-a):.5f}  {mn[0]*(1-a):.5f}  {mn[1]:.3f}", flush=True)
