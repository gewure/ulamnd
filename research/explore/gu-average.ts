/**
 * gu-average.ts — sanity check of the one new analytic input of the candidate theorem (PROOFS-uniform §8, step iii):
 * (1/Y) Σ_{x≤Y} G_u(Q_u(x)), G_u(n) = Π_{p | n, p split, p ∤ 2Du} (1 + |λ(p)|), λ(p) = p/(p-4), Q_u(x) = u²x² − D,
 * should be ≪ (log Y)^B uniformly in u up to Y³ (Henriot 2012, Cor. 2). One sieve of n² − D, n ≤ H, gives Q_u(x) = (ux)² − D.
 *   D=-3 H=10000000 npx tsx research/explore/gu-average.ts
 */
import { smallPrimes } from "../lib/sieve";
const D = Number(process.env.D ?? -3), H = Number(process.env.H ?? 1e7);
const Nmax = Math.floor(H), Pmax = Nmax + Math.ceil(Math.sqrt(-D)) + 2;
const primes = smallPrimes(Pmax + 1000);
function jacobi(a: number, n: number): number { a = ((a % n) + n) % n; let t = 1; while (a !== 0) { while (a % 2 === 0) { a /= 2; const r = n % 8; if (r === 3 || r === 5) t = -t; } const tmp = a; a = n; n = tmp; if (a % 4 === 3 && n % 4 === 3) t = -t; a %= n; } return n === 1 ? t : 0; }
function sqrtmod(n: number, p: number): number {
  const pm = (b: bigint, e: bigint, m: bigint) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
  n = ((n % p) + p) % p; const P = BigInt(p), Nn = BigInt(n);
  if (p % 4 === 3) return Number(pm(Nn, (P + 1n) / 4n, P));
  let q = P - 1n, s = 0; while (q % 2n === 0n) { q /= 2n; s++; }
  let z = 2n; while (pm(z, (P - 1n) / 2n, P) === 1n) z++;
  let m = s, c = pm(z, q, P), t = pm(Nn, q, P), r = pm(Nn, (q + 1n) / 2n, P);
  while (t !== 1n) { let i = 0, tt = t; while (tt !== 1n) { tt = tt * tt % P; i++; } let b = c; for (let j = 0; j < m - i - 1; j++) b = b * b % P; m = i; c = b * b % P; t = t * c % P; r = r * b % P; }
  return Number(r);
}
const Qv = new Float64Array(Nmax + 1), G = new Float64Array(Nmax + 1).fill(1);
for (let n = 1; n <= Nmax; n++) Qv[n] = n * n - D;
for (const p of primes) {
  if (p > Pmax) break;
  if ((2 * D) % p === 0) { for (let r0 = 0; r0 < p; r0++) if (((r0 * r0 - D) % p + p) % p === 0) for (let n = r0 === 0 ? p : r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; } continue; }
  if (jacobi(D, p) !== 1) continue;
  const r = sqrtmod(D, p), fac = 1 + Math.abs(p / (p - 4));
  for (const r0 of [r, p - r]) for (let n = r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; G[n] *= fac; }
}
for (let n = 1; n <= Nmax; n++) if (Qv[n] > 1) G[n] *= 1 + Qv[n] / (Qv[n] - 4);
// G(ux) with primes of u excluded: a split p | u cannot divide (ux)² − D, so G_u(Q_u(x)) = G[ux] exactly.
console.log(`D=${D} H=${H}: mean of G over n ≤ H: ${(G.reduce((a, v, i) => (i ? a + v : a), 0) / Nmax).toFixed(3)}`);
console.log("   Y      u-range (capped at H/Y)   #u   mean_u (1/Y)Σ G   max_u   max/(log Y)^2");
const isOK = (u: number) => { let m = u; for (let q = 2; q * q <= m; q++) { if (m % q === 0) { m /= q; if (m % q === 0) return false; if ((2 * D) % q === 0 || jacobi(D, q) !== 1) return false; } } if (m > 1 && ((2 * D) % m === 0 || jacobi(D, m) !== 1)) return false; return true; };
for (const Y of [100, 300, 1000, 3000]) {
  for (const [lo, hi] of [[1, Y ** 0.5], [Y ** 0.5, Y], [Y, Y ** 2], [Y ** 2, Math.min(Y ** 3, Nmax / Y)]] as [number, number][]) {
    if (lo >= hi) continue;
    let cnt = 0, sum = 0, mx = 0;
    const cand: number[] = []; const top = Math.min(hi, Nmax / Y);
    for (let u = Math.ceil(lo); u <= top; u++) if (isOK(u)) cand.push(u);        // admissible u only (the first version sampled only even u)
    const pick = cand.length <= 400 ? cand : Array.from({ length: 400 }, (_, i) => cand[Math.floor((i * cand.length) / 400)]);
    for (const u of pick) {
      let s = 0; for (let x = 1; x <= Y; x++) s += G[u * x];
      const a = s / Y; sum += a; cnt++; if (a > mx) mx = a;
    }
    if (cnt) console.log(`${String(Y).padStart(5)}  [${lo.toExponential(1)}, ${hi.toExponential(1)}]  ${String(cnt).padStart(4)}   ${(sum / cnt).toFixed(3).padStart(8)}   ${mx.toFixed(2).padStart(7)}   ${(mx / Math.log(Y) ** 2).toFixed(3)}`);
  }
}
