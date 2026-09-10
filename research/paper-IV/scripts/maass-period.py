"""Katok-Sarnak test: value of the first even Maass form of SL_2(Z) (R = 13.7797513) at the Heegner points of
discriminant D < 0 with class number one, versus the amplitude of the 13.78 line fitted to P_1(Y)/sqrt(Y).
u(z) = 2 sqrt(y) sum_{n>=1} a(n) K_{iR}(2 pi n y) cos(2 pi n x).  Coefficients: LMFDB 1.0.1.3.1 (a(1)=1)."""
from mpmath import mp, mpf, besselk, sqrt, pi, cos, mpc
mp.dps = 30
R = mpf('13.77975135189073894424367328151771259715513256879')
a = {1:'1',2:'1.54930447794129622450746926287076707892155702885',3:'0.246899772453980898011441050996101949008024809807',
4:'1.40034436536895243951127708008315459372491922872',5:'0.737060385348301086378778483390181480763698381648',
6:'0.382522923065639705404291496126326438169894064543',7:'-0.261420075765216142299887246426986520625437198055',
8:'0.620255317984684410959527030296119811028067184650',9:'-0.939040502362172455371141246475969670591646884308',
10:'1.14193095553326023543298144997506621013428612577',11:'-0.953564652617777476767573709662167965971573715655',
12:'0.345744705166808645709636643606267065108893248341',13:'0.278827029162325172187570322224228144409225388954',
14:'-0.405019294006802300466138905923457327460062740793',15:'0.181980041427339014443353228612131485198094638283',
16:'-0.439380023748378275129910751365633487567448551726',17:'1.30734171453365862411595596765660813299770850418',
18:'-1.45485965527795814008570203398177052531719868080',19:'0.0925585825082122607636913236432938192295256204388',
20:'1.03213835755916221587527833679033085150126939438'}
a = {n: mpf(v) for n,v in a.items()}
def K(x): return besselk(mpc(0,R), x).real
def u1(x0, y0, N=20):
    return 2*sqrt(y0)*sum(a[n]*K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1,N+1))
# reduced principal form [1,b,c] of discriminant D: z = (-b + i sqrt|D|)/2
cases = [(-3,'t^2+t+1',mpf('0.0174')),(-4,'t^2+1',mpf('0.0360')),(-7,'t^2+t+2',mpf('0.0040')),
         (-8,'t^2+2',mpf('0.0101')),(-11,'t^2+t+3',mpf('0.0166')),(-19,'t^2+t+5',mpf('0.0489')),
         (-43,'t^2+t+11',None),(-67,'t^2+t+17',None),(-163,'t^2+t+41',None)]
print(" D     f            x0     y0      2piy0   |u_1(z_D)|    fitted amp   ratio amp/|u_1|")
for D,name,amp in cases:
    b = 1 if D%4 else 0
    x0 = mpf(-b)/2; y0 = sqrt(-D)/2
    v = u1(x0,y0)
    r = amp/abs(v) if amp is not None and abs(v)>0 else None
    print(f"{D:4d} {name:11s} {float(x0):+5.2f} {float(y0):6.3f} {float(2*pi*y0):7.2f} {float(v):+13.4e}"
          + (f"   {float(amp):8.4f}   {float(r):11.4e}" if r is not None else "   (no signal / not fitted)"))
# ratios relative to D = -4
v4 = u1(mpf(0), sqrt(4)/2)
print("\nratios relative to D = -4 (a common factor exp(-pi R/2) cancels):")
print("  D    |u_1(z_D)|/|u_1(i)|   amp(D)/amp(-4)   significant?")
sig={-3:'yes',-4:'yes',-7:'yes',-8:'no',-11:'no',-19:'marginal'}
for D,name,amp in cases:
    if amp is None: continue
    b = 1 if D%4 else 0
    v=u1(mpf(-b)/2, sqrt(-D)/2)
    print(f" {D:4d}   {float(abs(v)/abs(v4)):16.4f}   {float(amp/mpf('0.0360')):14.4f}   {sig[D]}")
print(f"\nnote: K_{{iR}}(x) decays exponentially only for x > R = {float(R):.2f}; 2*pi*y0 exceeds R first at |D| = {float((R/pi)**2):.1f}")
