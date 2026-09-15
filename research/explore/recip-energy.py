# Additive energy of reciprocals J_4(N) = #{x1*+x2* = x3*+x4* mod m, 1<=x_i<=N, (x_i,m)=1} at N = m^beta.
# Compare with 2N'^2 (diagonal, N' = #units <= N) + N'^4/m (random) and with Bourgain-Garaev's N^3 (at N=m^{1/2}).  PROOFS-uniform §19 lead.
import numpy as np, sys, math
def inv_table(m, N):
    xs = np.array([x for x in range(1, N+1) if math.gcd(x, m) == 1], dtype=np.int64)
    return np.array([pow(int(x), -1, m) for x in xs], dtype=np.int64)
def J4(m, N):
    iv = inv_table(m, N); n = len(iv)
    cnt = np.zeros(m, dtype=np.int64)
    for i in range(0, n, 2000):
        s = (iv[i:i+2000, None] + iv[None, :]) % m
        cnt += np.bincount(s.ravel(), minlength=m)
    return int((cnt.astype(np.float64)**2).sum()), n
cases = [("prime", 1000003), ("prime", 4000037), ("p1p2 balanced", 1009*997), ("p1p2 balanced", 2003*1999), ("p*small", 7*142873),
         ("many factors", 3*5*7*11*13*17*19), ("many factors", 5*13*17*29*37*41), ("p1p2 unbalanced", 101*9901)]
beta = float(sys.argv[1]) if len(sys.argv) > 1 else 0.5
print(f"beta={beta}: type m N' J4 J4/(2N'^2+N'^4/m) J4/N'^3")
for typ, m in cases:
    N = int(round(m**beta)); j, n = J4(m, N)
    print(f"{typ:16s} {m:9d} {n:6d} {j:12d} {j/(2*n*n+n**4/m):7.3f} {j/n**3:9.5f}", flush=True)
