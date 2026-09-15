"""weyl-uaverage.py — F24 test of PLAN-uniformity §7: does averaging over u give EXTRA cancellation in the dilated Weyl sums?
For consecutive u in [U, U+M) coprime to 2D, compute T^{(u)}_k(X) = Σ_{d≤X,(d,2Du)=1} Σ_{r²≡D(d)} e(kū r/d) and report
|Σ_u T^{(u)}| / sqrt(Σ_u |T^{(u)}|²)  (≈ 1 for independent random signs, ≈ √M if coherent), plus Σ|T|/√X per u (mean).
    python research/explore/weyl-uaverage.py D X k U M
"""
import sys, math
D=int(sys.argv[1]); X=int(sys.argv[2]); k=int(sys.argv[3]); U=int(sys.argv[4]); M=int(sys.argv[5])
us=[u for u in range(U,U+M) if math.gcd(u,2*D)==1]
spf=list(range(X+1))
for i in range(2,int(X**0.5)+1):
    if spf[i]==i:
        for j in range(i*i,X+1,i):
            if spf[j]==j: spf[j]=i
def sqrt_mod_p(a,p):
    a%=p
    if pow(a,(p-1)//2,p)!=1: return []
    if p%4==3: r=pow(a,(p+1)//4,p); return [r,p-r]
    q,s=p-1,0
    while q%2==0: q//=2; s+=1
    z=2
    while pow(z,(p-1)//2,p)!=p-1: z+=1
    m,c,t,r=s,pow(z,q,p),pow(a,q,p),pow(a,(q+1)//2,p)
    while t!=1:
        i,tt=0,t
        while tt!=1: tt=tt*tt%p; i+=1
        b=pow(c,1<<(m-i-1),p); m,c,t,r=i,b*b%p,t*b*b%p,r*b%p
    return [r,p-r]
cache={}
def roots(pj,p):
    if pj in cache: return cache[pj]
    if pj==p: R=sqrt_mod_p(D,p)
    else:
        R=[]
        for r in roots(pj//p,p):
            inv=pow(2*r%pj,-1,pj); R.append((r-(r*r-D)*inv)%pj)
    cache[pj]=R; return R
T={u:0.0 for u in us}
for d in range(2,X+1):
    m,fac=d,[]
    while m>1:
        p=spf[m]; pj=1
        while m%p==0: m//=p; pj*=p
        fac.append((p,pj))
    if any(p==2 or D%p==0 for p,_ in fac): continue
    R=[0]; mod=1; ok=True
    for p,pj in fac:
        Rp=roots(pj,p)
        if not Rp: ok=False; break
        inv=pow(mod,-1,pj); R=[(r+mod*((rp-r)*inv%pj))%(mod*pj) for r in R for rp in Rp]; mod*=pj
    if not ok: continue
    for u in us:
        um=u%d
        if um==0 or math.gcd(um,d)>1: continue
        ub=pow(um,-1,d)
        T[u]+=sum(math.cos(2*math.pi*k*((ub*r)%d)/d) for r in R)
vals=[T[u] for u in us]
S=sum(vals); S2=math.sqrt(sum(v*v for v in vals)); A=sum(abs(v) for v in vals)
if len(sys.argv)>6 and sys.argv[6]=="show": print(" ".join(f"{u}:{T[u]/math.sqrt(X):+.2f}" for u in us))
print(f"D={D} X={X} k={k} u in [{U},{U+M}) ({len(us)} values): mean|T|/sqrt X = {A/len(us)/math.sqrt(X):.3f}, |Σ_u T| = {abs(S):.1f}, sqrt(Σ|T|²) = {S2:.1f}, ratio = {abs(S)/S2:.2f} (random-sign ≈ 1, coherent ≈ {math.sqrt(len(us)):.1f});  Σ_u T/(sqrt(X)·#u) = {S/len(us)/math.sqrt(X):+.4f}")
