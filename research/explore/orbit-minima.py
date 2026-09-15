"""orbit-minima.py — regime (II) of PROOFS-uniform.md §2: for each pair (n ≤ X, x) with u²x² ≡ D (n), the minimum modulus
m(pair) = min over primitive (u b', d) of Q(u b', d), Q = [U, 2ux, n] (the G_u-orbit of the pair in H^{(u)}); reports the
fraction of pairs whose orbit minimum is ≤ V0 = (X|D|/u²)^{1/3} (the Weil-effective orbits) and the number of distinct minima.
    python research/explore/orbit-minima.py D X u1 u2 ...
"""
import sys, math
D=int(sys.argv[1]); X=int(sys.argv[2]); us=[int(v) for v in sys.argv[3:]]
for u in us:
    V0=(X*abs(D)/u**2)**(1/3); pairs=0; good=0; minima=set(); mins=[]
    for n in range(2,X+1):
        if math.gcd(n,2*D*u)>1: continue
        for x in range(n):
            if (u*u*x*x-D)%n: continue
            pairs+=1; U=(u*u*x*x-D)//n; m=n
            bmax=int(math.isqrt(n*n//(abs(D)*u*u)))+1      # Q(ub',d) >= u^2|D| b'^2/n ; need <= n to improve
            for bp in range(1,bmax+1):
                c0=-u*u*x*bp/n; half=math.sqrt(max(0,n*n-abs(D)*u*u*bp*bp))/n
                for d in range(math.floor(c0-half)-1, math.ceil(c0+half)+2):
                    if math.gcd(u*bp,d)!=1: continue
                    q=U*u*u*bp*bp+2*u*u*x*bp*d+n*d*d
                    if 0<q<m: m=q
            mins.append(m); minima.add(m)
            if m<=V0: good+=1
    mins.sort()
    print(f"u={u:>4}: pairs {pairs}, distinct orbit minima {len(minima)}, V0={V0:7.1f}, pairs with min<=V0: {100*good/pairs:5.1f}%, median min {mins[len(mins)//2]}, u*sqrt|D|={u*abs(D)**0.5:.0f}")
