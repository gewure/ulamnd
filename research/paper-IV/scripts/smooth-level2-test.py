"""smooth-level2-test.py — test of the LEVEL-2 part of Theorem thm:smooth on the restricted (coprime) object at D = -4.
S^w_cop = S^w_{e=1} - S^w_{e=2}.  (a) The line of the first even newform of level 2 (t = 8.9229, LMFDB 2.0.1.4.1, Fricke +1)
comes only from the e = 2 term: predicted amplitude/phase from its period over the Gamma_0(2)-orbits of H_2 = {forms of
disc -16 with 2 | a}, its Fourier coefficients and its norm on Gamma_0(2)\\H (fundamental domain F u S(F) u ST(F), with the
Fricke involution to evaluate near the cusp 0). (b) The t_1 = 13.78 line: e = 1 residue minus the e = 2 contribution of the
two-dimensional oldform space {u_1(z), u_1(2z)}, orthonormalised on Gamma_0(2)\\H.
   python research/paper-IV/scripts/smooth-level2-test.py
"""
import numpy as np, sys, os
from mpmath import mp, mpf, mpc, besselk, sqrt, pi, cos, exp, gamma, quad, log, arg, matrix
mp.dps = 20
D = 4
def load(label, N):
    return [None] + [mpf(v) for v in open(f"research/paper-IV/data/maass-{label}-coefficients.txt").read().split("\n")[1:] if v.strip()][:N]
R1 = mpf('13.77975135189073894424367328151771259715513256879')
A1 = [None,1,1.54930447794129622450746926287076707892155702885,0.246899772453980898011441050996101949008024809807,1.40034436536895243951127708008315459372491922872,0.737060385348301086378778483390181480763698381648,0.382522923065639705404291496126326438169894064543,-0.261420075765216142299887246426986520625437198055,0.620255317984684410959527030296119811028067184650,-0.939040502362172455371141246475969670591646884308,1.14193095553326023543298144997506621013428612577,-0.953564652617777476767573709662167965971573715655,0.345744705166808645709636643606267065108893248341,0.278827029162325172187570322224228144409225388954,-0.405019294006802300466138905923457327460062740793,0.181980041427339014443353228612131485198094638283,-0.439380023748378275129910751365633487567448551726,1.30734171453365862411595596765660813299770850418,-1.45485965527795814008570203398177052531719868080,0.0925585825082122607636913236432938192295256204388,1.03213835755916221587527833679033085150126939438]
A1 = [None] + [mpf(v) for v in A1[1:]]
R2 = mpf('8.9228764869917468920076285015'); A2 = load("2.0.1.4.1", 40); eps2 = 1
class Form:
    def __init__(s, R, a, scale=1):  # scale=2 means the function z -> u(2z) with u's coefficients a
        s.R, s.a, s.scale = R, a, scale; s.Kc = {}
    def K(s, x):
        k = float(x)
        if k not in s.Kc: s.Kc[k] = besselk(mpc(0, s.R), x).real
        return s.Kc[k]
    def __call__(s, x0, y0):
        x0, y0 = s.scale*x0, s.scale*y0
        return 2*sqrt(y0)*sum(s.a[n]*s.K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1, len(s.a)))
    def coeffs(s, kmax):  # Fourier coefficients of z -> u(scale z) at index k (for scale 2: index 2n gets sqrt2 a(n))
        c = {}
        for n in range(1, len(s.a)):
            if s.scale*n <= kmax: c[s.scale*n] = s.a[n]*sqrt(s.scale)
        return c
# Gauss-Legendre nodes on F (|x|<=1/2, y >= sqrt(1-x^2)), split at y = 1 for the upper part, plus y in [1, inf) with substitution
xs, wx = np.polynomial.legendre.leggauss(20)
def integrate_F(f):  # int_F f(x,y) dx dy / y^2
    tot = mpf(0)
    for xi, wxi in zip(xs, wx):
        x0 = mpf(xi)/2; ylo = sqrt(1 - x0*x0)
        for yi, wyi in zip(xs, wx):   # lower part y in [ylo, 1]
            y0 = ylo + (1-ylo)*(mpf(yi)+1)/2; tot += mpf(wxi)/2*mpf(wyi)*(1-ylo)/2*f(x0, y0)/y0**2
        for yi, wyi in zip(xs, wx):   # upper part y in [1, 8] then [8, 60]
            for (lo, hi) in ((1, 8), (8, 60)):
                y0 = lo + (hi-lo)*(mpf(yi)+1)/2; tot += mpf(wxi)/2*mpf(wyi)*(hi-lo)/2*f(x0, y0)/y0**2
    return tot
# ---- (a) the level-2 newform: norm on Gamma_0(2)\H via F u S(F) u ST(F) and Fricke: u(Sw) = eps u(w/2), u(STw) = eps u((w+1)/2)
u2 = Form(R2, A2)
def ip_level2(f, g):  # <f,g> over Gamma_0(2)\H for functions given as callables on H that are Gamma_0(2)-invariant,
                       # supplied together with their values on the other two cosets via the lambdas fS, fST
    pass
def norm2_newform(u, eps):
    return integrate_F(lambda x, y: u(x, y)**2 + (eps*u(x/2, y/2))**2 + (eps*u((x+1)/2, y/2))**2)
n2 = norm2_newform(u2, eps2)
print(f"level-2 newform t={float(R2):.4f}: ||u~||^2 on Gamma_0(2)\\H = {float(n2):.4e}")
# H_2 orbits under Gamma_0(2): forms [a,b,c] of disc -16 with 2 | a; classify via SL2(Z)-reduction + stabiliser test (as verify4)
from math import gcd
Dd = -16
def act(a,b,c,al,be,ga,de): return (a*al*al+b*al*ga+c*ga*ga, 2*a*al*be+b*(al*de+be*ga)+2*c*ga*de, a*be*be+b*be*de+c*de*de)
def mul(M,N): return [[M[0][0]*N[0][0]+M[0][1]*N[1][0], M[0][0]*N[0][1]+M[0][1]*N[1][1]],[M[1][0]*N[0][0]+M[1][1]*N[1][0], M[1][0]*N[0][1]+M[1][1]*N[1][1]]]
def inv(M): return [[M[1][1],-M[0][1]],[-M[1][0],M[0][0]]]
def reduce_with_matrix(a,b,c,Dl):
    M=[[1,0],[0,1]]
    while True:
        if c<a or (c==a and b<0): a,b,c=act(a,b,c,0,-1,1,0); M=mul(M,[[0,-1],[1,0]]); continue
        if b>a or b<=-a:
            k=-((b+a)//(2*a)) if b>a else ((-b+a)//(2*a)); a,b,c=act(a,b,c,1,k,0,1); M=mul(M,[[1,k],[0,1]]); continue
        return (a,b,c),M
def stab(a,b,c):
    S=[[[1,0],[0,1]]]
    if b==0 and a==c: S.append([[0,-1],[1,0]])
    if a==b==c: S.append([[0,-1],[1,1]]); S.append([[-1,-1],[1,0]])
    return S
fam=[]
for a in range(2,400,2):
    for b in range(-a+1,a+1):
        if (b*b-Dd)%(4*a): continue
        c=(b*b-Dd)//(4*a); g=gcd(gcd(a,abs(b)),c); fam.append((g,(a//g,b//g,c//g),(a,b,c)))
reps=[]  # (g, primitive reduced data, original form, stabiliser order in Gamma_0(2))
for g,F,orig in fam:
    r,M=reduce_with_matrix(*F, Dd//(g*g))
    found=False
    for (g2,r2,M2,_,_) in reps:
        if g2!=g or r2!=r: continue
        for s in stab(*r2):
            G=mul(M,mul(s,inv(M2)))
            if G[1][0]%2==0: found=True; break
        if found: break
    if not found:
        # stabiliser of z_orig in Gamma_0(2): conjugates M s M^{-1} of the reduced form's stabiliser lying in Gamma_0(2)
        st=sum(1 for s in stab(*r) if mul(M,mul(s,inv(M)))[1][0]%2==0)
        reps.append((g,r,M,orig,st))
print("Gamma_0(2)-orbits of H_2 (content, reduced primitive form, representative [a,b,c], |stab in Gamma_0(2)|):")
for g,r,M,orig,st in reps: print("   ",g,r,orig,st)
def zQ(orig): a,b,c=orig; return (mpf(-b)/(2*a), mpf(4)/(2*a))   # z = (-b + 4i)/(2a)
per2 = sum(u2(*zQ(o))/st for g,r,M,o,st in reps)
L2 = sum(A2[k]*mpf(k)**(-1.5) for k in range(1, len(A2)))
w = lambda t: exp(-1/(1-(4*t-3)**2)) if 0.5 < t < 1 else mpf(0)
W = lambda zeta: quad(lambda t: w(t)*t**(zeta-1), [mpf(1)/2, mpf(3)/4, 1])
def GW(R): z = mpf(3)/2 + 1j*R; return gamma(-1j*R)*(2*pi)**(-z)*gamma(z)*cos(pi*z/2)*W(1-z)
C2 = 2*mpf(D)**(-0.25)*abs(per2*L2/n2)*abs(GW(R2))
phi2 = (R2*log(pi*sqrt(D)) + arg(GW(R2)) + (pi if per2*L2 > 0 else 0)) % (2*pi)   # minus sign from mu(2) = -1
print(f"(a) newform 8.9229 in the COPRIME object: Per~ = {float(per2):+.4e}, L~(3/2) = {float(L2):+.5f} -> predicted C = {float(C2):.5f}, phi = {float(phi2):.4f}")
# ---- (b) the t_1 line in the coprime object: e=1 residue minus the e=2 oldform contribution
u1 = Form(R1, A1); u1d = Form(R1, A1, scale=2)
n1_G = integrate_F(lambda x, y: u1(x, y)**2)                     # ||u_1||^2 on SL2(Z)\H
G11 = 3*n1_G                                                     # ||u_1||^2 on Gamma_0(2)\H
# <u_1(2z), u_1(2z)> and <u_1(2z), u_1(z)> on Gamma_0(2)\H: cosets w, Sw, STw; u_1(2 Sw) = u_1(-2/w) = u_1(w/2), u_1(2 STw) = u_1((w+1)/2); u_1(Sw)=u_1(STw)=u_1(w)
G22 = integrate_F(lambda x, y: u1d(x, y)**2 + u1(x/2, y/2)**2 + u1((x+1)/2, y/2)**2)
G12 = integrate_F(lambda x, y: u1d(x, y)*u1(x, y) + u1(x/2, y/2)*u1(x, y) + u1((x+1)/2, y/2)*u1(x, y))
print(f"(b) Gram matrix on Gamma_0(2)\\H: <u1,u1>={float(G11):.4e} <u1(2z),u1(2z)>={float(G22):.4e} <u1(2z),u1>={float(G12):.4e}  (ratio G22/G11 = {float(G22/G11):.4f}, G12/G11 = {float(G12/G11):.4f})")
# orthonormal basis: v1 = u1/sqrt(G11); v2 = (u1(2z) - (G12/G11) u1)/sqrt(G22 - G12^2/G11)
c21 = -G12/G11; nv2 = sqrt(G22 - G12**2/G11)
per1_H2 = sum(u1(*zQ(o))/st for g,r,M,o,st in reps); per1d_H2 = sum(u1d(*zQ(o))/st for g,r,M,o,st in reps)
L1 = sum(A1[k]*mpf(k)**(-1.5) for k in range(1, len(A1)))           # L~ for u1's coefficients a(k)
L1d = sum(sqrt(mpf(2))*A1[n]*mpf(2*n)**(-1.5) for n in range(1, len(A1)))   # for u1(2z): coefficient sqrt2 a(n) at index 2n
# e=1 term (all-divisor sub-family: points 2i (stab 1), i (stab 2)) with u1 normalised on SL2(Z)\H
per1_H1 = u1(0, 2) + u1(0, 1)/2
term_e1 = per1_H1*L1/n1_G
# e=2 term: sum over v in {v1, v2} of Per_{H2}(v) * L~(v)
Pv1 = per1_H2/sqrt(G11); Lv1 = L1/sqrt(G11)
Pv2 = (per1d_H2 + c21*per1_H2)/nv2; Lv2 = (L1d + c21*L1)/nv2
term_e2 = Pv1*Lv1 + Pv2*Lv2
coef_cop = term_e1 - term_e2; coef_all = term_e1
for name, coef in (("all", coef_all), ("coprime", coef_cop)):
    C = 2*mpf(D)**(-0.25)*abs(coef)*abs(GW(R1)); phi = (R1*log(pi*sqrt(D)) + arg(GW(R1)) + (pi if coef < 0 else 0)) % (2*pi)
    print(f"(b) t_1 line in the {name} object: predicted C = {float(C):.5f}, phi = {float(phi):.4f}   (e=1 term {float(term_e1):+.4e}, e=2 term {float(term_e2):+.4e})")
# ---- observed: joint fits on the coprime smooth grid
lvl1 = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353]; lvl2 = [8.9228765, 10.920392, 12.092995, 14.685016, 15.3142, 16.4041, 16.9403, 17.8780]
for tag in ("DS-coprime-D-4-smooth", "DS-all-D-4-smooth"):
    rows = np.loadtxt(f"research/paper-IV/data/piece-{tag}-grid.dat", skiprows=1); x0, y0 = rows[:, 0], rows[:, 3]
    for sel, lab in ((np.ones_like(x0, dtype=bool), "full"), (x0 >= np.median(x0), "upper half")):
        x, y = x0[sel], y0[sel]; X = np.column_stack([np.ones_like(x), x]); y = y - X @ np.linalg.lstsq(X, y, rcond=None)[0]
        freqs = lvl1 + lvl2; A = np.column_stack([f(t*x) for t in freqs for f in (np.cos, np.sin)]); c, *_ = np.linalg.lstsq(A, y, rcond=None)
        out = []
        for i, t in enumerate(freqs):
            if t in (13.779751, 8.9228765): out.append(f"t={t:.4f}: C={np.hypot(c[2*i], c[2*i+1]):.5f} phi={np.arctan2(c[2*i+1], c[2*i]) % (2*np.pi):.4f}")
        print(f"observed [{tag}, {lab}]: " + " | ".join(out))
