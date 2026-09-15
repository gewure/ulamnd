/**
 * dispersion-test.ts — sanity test of the dispersion step of PROOFS-uniform §9 (15 Sep 2026).
 * S(U,K,k) = Σ_{U<u≤2U} |Σ_{K<d≤2K, (d,u)=1} Σ_{r²≡D (d)} (e(kūr/d) − c_d(k)/φ(d))|²  over squarefree d with all primes split, coprime to 2D.
 * The proof bounds S by the diagonal U·Σ_d ω(d) plus a Weil term ≈ K³ (log factors dropped). A hidden off-diagonal main term (for instance a
 * wrong mean subtraction) would show up as S/(U Σω) growing like K; square-root cancellation over d would give S ≈ diagonal.
 *   D=-3 K=1500 k=1 npx tsx research/explore/dispersion-test.ts
 */
const D = Number(process.env.D ?? -3), K = Number(process.env.K ?? 1500), k = Number(process.env.KF ?? 1);
const gcd = (a: number, b: number): number => { while (b) { const t = a % b; a = b; b = t; } return a; };
const inv = (a: number, m: number) => { let [r0, r1, s0, s1] = [m, ((a % m) + m) % m, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; };
const factor = (n: number) => { const ps: number[] = []; let m = n; for (let p = 2; p * p <= m; p++) { if (m % p === 0) { ps.push(p); m /= p; if (m % p === 0) return null; } } if (m > 1) ps.push(m); return ps; };
const phi = (ps: number[]) => ps.reduce((a, p) => a * (p - 1), 1);
const mu = (ps: number[]) => (ps.length % 2 ? -1 : 1);
const ramanujan = (q: number, ps: number[], n: number) => { // c_q(n) = Σ_{e | (q,n)} e μ(q/e)
  const g = gcd(q, n); let s = 0; for (let e = 1; e <= g; e++) if (g % e === 0) { const qe = factor(q / e); if (qe) s += e * mu(qe); } return s; };
type Mod = { d: number; roots: number[]; eps: number };
const mods: Mod[] = [];
for (let d = K + 1; d <= 2 * K; d++) {
  const ps = factor(d); if (!ps || ps.some((p) => (2 * D) % p === 0)) continue;
  const roots: number[] = []; for (let x = 0; x < d; x++) if (((x * x - D) % d + d) % d === 0) roots.push(x);
  if (roots.length !== 2 ** ps.length) continue;                          // all primes split
  mods.push({ d, roots, eps: ramanujan(d, ps, k) / phi(ps) });
}
const sumOmega = mods.reduce((a, m) => a + m.roots.length, 0);
console.log(`D=${D} K=${K} k=${k}: ${mods.length} moduli, Σω = ${sumOmega}`);
console.log("      U      S/(U·Σω)   S/(U·Σω + K³)");
for (const U of [K / 8, K / 2, 2 * K, 8 * K, 32 * K].map(Math.round)) {
  let S = 0;
  for (let u = U + 1; u <= 2 * U; u++) {
    let re = 0, im = 0;
    for (const m of mods) {
      if (gcd(u, m.d) !== 1) continue;
      const ub = inv(u, m.d);
      for (const r of m.roots) { const a = 2 * Math.PI * ((k * ub * r) % m.d) / m.d; re += Math.cos(a) - m.eps; im += Math.sin(a); }
    }
    S += re * re + im * im;
  }
  console.log(`${String(U).padStart(7)}   ${(S / (U * sumOmega)).toFixed(3).padStart(8)}   ${(S / (U * sumOmega + K ** 3)).toFixed(4).padStart(10)}`);
}
