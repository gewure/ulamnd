"""Phase test of the Section-5 mechanism.  In eq. (orbit) the length enters the test function only through the
combination tau = 2t/sqrt|D|, so the spectral term carries a factor (2/sqrt|D|)^{i t_j}; and the amplitude is
proportional to the Katok-Sarnak period, whose SIGN flips the phase by pi.  Hence, with no free parameter once one
discriminant is fixed,
    phi(D) - phi(D0) = (t_j/2) log(|D|/|D0|)  -  pi * [sign Per_D != sign Per_{D0}]   (mod 2 pi).
Observed phases are from scripts/piece-stability.ts on the model object (all divisors, lambda == 1), Y <= 1e7."""
from mpmath import mp, mpf, besselk, sqrt, pi, cos, log, mpc
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
a = {n: mpf(v) for n, v in a.items()}
def K(x): return besselk(mpc(0, R), x).real
def u1(x0, y0, N=20): return 2*sqrt(y0)*sum(a[n]*K(2*pi*n*y0)*cos(2*pi*n*x0) for n in range(1, N+1))
def period(D):
    b = 1 if D % 4 else 0
    return u1(mpf(-b)/2, sqrt(-D)/2)
obs = {-3: mpf('1.05'), -4: mpf('3.14'), -7: mpf('0.50'), -8: mpf('-1.43'), -11: mpf('0.53'), -19: mpf('-1.87')}
D0 = -4; p0 = period(D0); phi0 = obs[D0]
def wrap(x):
    while x > pi: x -= 2*pi
    while x <= -pi: x += 2*pi
    return x
print("  D    sign Per   predicted phase   observed phase   difference (rad)")
worst = mpf(0)
for D in [-3, -4, -7, -8, -11, -19]:
    pD = period(D)
    flip = pi if (pD > 0) != (p0 > 0) else mpf(0)
    pred = wrap(phi0 + (R/2)*log(mpf(-D)/mpf(-D0)) - flip)
    diff = wrap(pred - obs[D])
    worst = max(worst, abs(diff))
    print(f" {D:4d}      {'+' if pD>0 else '-'}       {float(pred):+13.3f}    {float(obs[D]):+13.3f}    {float(diff):+13.3f}")
print(f"\nlargest discrepancy: {float(worst):.3f} rad = {float(worst/(2*pi)*100):.1f}% of a full period, over 5 predictions with no free parameter")
