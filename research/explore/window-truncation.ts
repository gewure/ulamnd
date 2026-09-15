/**
 * window-truncation.ts — test of the "narrow window" reduction (15 Sep 2026). Claim: in piece u at length Y, the moduli
 * d' > K0 contribute at most Y²·Y^{o(1)}/K0 (divisor bound for the root counts plus the tail of the mean), uniformly in u, so for
 * K0 = Y^{1+ε} the window of Theorem A' can be cut from (Y, u²Y log H] to (Y, Y^{1+ε}] at cost Y^{1-ε+o(1)}.
 * Exact computation: P_u^{≤K0}(Y) = Σ_{h≤Y}(Y-h) Σ_{d | Q_u(h), 1<d≤K0 admissible} λ(d)/d - (Y²/2) Σ_{1<d≤K0} λ(d)ρ(d)/d²,
 * compared with the full P_u(Y) (pieces-all-u.ts formula). f = t² + t + 1 (D = -3) by default.
 *   D=-3 H=1000000 U=7,13,31,91,1009,10009 npx tsx research/explore/window-truncation.ts
 * Prints for each u and K0 = Y·2^j: the tail T = P - P^{≤K0}, the bound scale Y²/K0 and √Y.
 */
import { smallPrimes } from "../lib/sieve";
const D = Number(process.env.D ?? -3), H = Number(process.env.H ?? 1e6), DMAX = Number(process.env.DMAX ?? 1e7), PE = Number(process.env.PE ?? 1e8);
const US = (process.env.U ?? "7,13,31,91,1009,10009").split(",").map(Number);
const Nmax = Math.floor(H), Pmax = Nmax + Math.ceil(Math.sqrt(-D)) + 2, MAXF = 10;
const primes = smallPrimes(Math.max(Pmax, PE, DMAX) + 1000);
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
const split = (p: number) => (2 * D) % p !== 0 && jacobi(D, p) === 1;
// sieve: admissible prime factors of n² - D for n ≤ Nmax, and F(n)
const Qv = new Float64Array(Nmax + 1), fac = new Float64Array((Nmax + 1) * MAXF), nf = new Uint8Array(Nmax + 1), F = new Float64Array(Nmax + 1).fill(1);
for (let n = 1; n <= Nmax; n++) Qv[n] = n * n - D;
for (const p of primes) {
  if (p > Pmax) break;
  if ((2 * D) % p === 0) { for (let r0 = 0; r0 < p; r0++) if (((r0 * r0 - D) % p + p) % p === 0) for (let n = r0 === 0 ? p : r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; } continue; }
  if (jacobi(D, p) !== 1) continue;
  const r = sqrtmod(D, p);
  for (const r0 of [r, p - r]) for (let n = r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; fac[n * MAXF + nf[n]] = p; nf[n]++; F[n] *= 1 + 1 / (p - 4); }
}
for (let n = 1; n <= Nmax; n++) if (Qv[n] > 1) { fac[n * MAXF + nf[n]] = Qv[n]; nf[n]++; F[n] *= 1 + 1 / (Qv[n] - 4); }
// mean E (Kahan log-sum), and the squarefree admissible d ≤ DMAX with λ(d)ρ(d)/d²
const tailSum = (P: number) => { const x = Math.log(P); return Math.exp(-x) / x * (1 - 1 / x + 2 / x ** 2 - 6 / x ** 3 + 24 / x ** 4); };
let sE = 0, cE = 0; for (const p of primes) { if (p > PE) break; if (split(p)) { const v = Math.log1p(2 / (p * (p - 4))) - cE; const t = sE + v; cE = t - sE - v; sE = t; } }
const E = Math.exp(sE + tailSum(PE));
const spf = new Int32Array(DMAX + 1);
for (const p of primes) { if (p > DMAX) break; for (let j = p; j <= DMAX; j += p) if (spf[j] === 0) spf[j] = p; }
console.log(`D=${D} H=${H}: sieve and mean done, E = ${E.toPrecision(14)}`);
for (const u of US) {
  const Y = H / u, M = Math.floor(Y);
  const up: number[] = []; { let m = u; for (let q = 2; q * q <= m; q++) while (m % q === 0) { up.push(q); m /= q; } if (m > 1) up.push(m); }
  let Efac = 1; for (const p of up) { if (!split(p)) throw new Error(`u=${u} has a non-split prime ${p}`); Efac *= 1 + 2 / (p * (p - 4)); }
  const Eu = E / Efac;
  const K0 = Array.from({ length: 12 }, (_, j) => Y * 2 ** j).filter((k) => k <= DMAX);
  const nb = K0.length;
  const Sb = new Float64Array(nb + 1);      // bins: d ≤ K0[0], (K0[0],K0[1]], …, > K0[nb-1]
  let full = 0;
  for (let h = 1; h <= M; h++) {
    const n = u * h, m = nf[n], wgt = Y - h; full += wgt * (F[n] - 1);
    for (let mask = 1; mask < 1 << m; mask++) {
      let d = 1, v = 1;
      for (let i = 0; i < m; i++) if (mask & (1 << i)) { const p = fac[n * MAXF + i]; d *= p; v /= p - 4; }
      let b = 0; while (b < nb && d > K0[b]) b++;
      Sb[b] += wgt * v;
    }
  }
  // mean partial sums Σ_{1<d≤K0} λρ/d² over squarefree admissible d coprime to u
  const Mp = new Float64Array(nb);
  for (let d = 2; d <= DMAX; d++) {
    let m = d, v = 1, ok = true;
    while (m > 1) { const p = spf[m]; m /= p; if (m % p === 0 || !split(p) || u % p === 0) { ok = false; break; } v *= 2 / (p * (p - 4)); }
    if (!ok) continue;
    for (let b = 0; b < nb; b++) if (d <= K0[b]) Mp[b] += v;
  }
  const Pfull = full - (Eu - 1) * Y * Y / 2;
  let cum = 0; const rows: string[] = [];
  for (let b = 0; b < nb; b++) { cum += Sb[b]; const Ptr = cum - Mp[b] * Y * Y / 2; const T = Pfull - Ptr;
    rows.push(`  K0 = Y·2^${b} = ${K0[b].toExponential(2)}:  P^{≤K0} = ${Ptr.toExponential(4)}  tail = ${T.toExponential(3)}  tail/(Y²/K0) = ${(T / (Y * Y / K0[b])).toExponential(2)}  tail/√Y = ${(T / Math.sqrt(Y)).toFixed(3)}`); }
  const binsTotal = Sb.reduce((a, v) => a + v, 0);
  console.log(`u=${u} Y=${Y.toFixed(1)}: P_full = ${Pfull.toExponential(4)} (P/√Y = ${(Pfull / Math.sqrt(Y)).toFixed(3)}); check Σ bins = ${binsTotal.toExponential(6)} vs Σ(Y-h)(F-1) = ${full.toExponential(6)}`);
  for (const r of rows) console.log(r);
}
