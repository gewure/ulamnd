"""c_off(f) for f = t^2+1: the off-diagonal main term  Off*_f(H) ~ c_off H  predicted by the Type II theorem
(paper III): c_off = - sum_{p split} lambda(p) m_p log p / (p(p-1)),  m_p = mean value of w(u) on (u,p)=1,
w(u) = u omega(u) W_f(u) = 4 A0 lambda(u') omega(u') for u = 2u'.  Compared with the measured
lim (1/H) sum_{t<=H} Off_f(t) - (1 - D_f(1))/2  (offstar-mean.ts).
"""
from mpmath import mp, mpf, pi, log, quad, inf
import functools
print = functools.partial(print, flush=True)
mp.dps = 20
A0 = mpf('0.517476844264072363'); Df1 = mpf('0.750790813652006')
N = 2_000_000
sieve = bytearray([1])*(N+1); sieve[0]=sieve[1]=0
for i in range(2,int(N**0.5)+1):
    if sieve[i]: sieve[i*i::i] = bytearray(len(range(i*i,N+1,i)))
P1 = [p for p in range(5,N+1,4) if sieve[p]]
P3 = [p for p in range(3,N+1,4) if sieve[p]]
lam = lambda p: mpf(p)/(p-4)
# m_{lambda omega} = L(1,chi) * prod_p (1-1/p)(1-chi(p)/p) (1+2 lambda(p)/p)^{[p=1(4)]}
F = mpf(1)/2   # p=2 factor: (1-1/2)(1-0)
for p in P3: F *= (1 - mpf(1)/p**2)
for p in P1: F *= (1 + 2*lam(p)/p) * (1 - mpf(1)/p)**2
# tails beyond N: log F_tail ~ sum_{p>N} [ -1/p^2 (p=3) ;  (2lam/p - 2/p + O(1/p^2)) ~ 2*4/(p(p-4)) - 1/p^2 ... ] ~ O(1/(N log N)) negligible at 1e-7
m_lo = (pi/4) * F
m = 2*A0*m_lo
S = mpf(0)
for p in P1:
    l = lam(p); S += l*log(p)/(p*(p-1)*(1+2*l/p))
# tail: sum_{p>N, p=1(4)} log p/p^2 ~ (1/2) * 1/N
S_tail = mpf(1)/(2*N)
c_off = -m*(S + S_tail)
print(f"m_lambda_omega = {m_lo}   m = {m}")
print(f"S = {S} (+tail {S_tail})")
print(f"c_off(t^2+1) predicted = {c_off}")
kappa_half = (1 - Df1)/2
print(f"(1-D_f(1))/2 = {kappa_half}")
for M in [-0.00945, -0.0098, -0.0095, -0.0101]:
    print(f"  measured with M_inf={M}: c_off = {M - kappa_half}")
