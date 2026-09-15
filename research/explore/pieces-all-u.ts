/**
 * pieces-all-u.ts — step 1 of the attack on the core (16 Sep 2026): EVERY piece of Theorem A' of part III, exactly.
 *
 * For squarefree u whose primes all have ω(p) ≥ 1, the piece of part III at length Y is (paper IV §2, exact for real Y)
 *     P_u(Y) = Σ_{1≤h≤Y} (Y - h)(F(u h) - 1) - (E_u - 1) Y²/2,
 *     F(n)   = Π_{p | n² - D, p split, p ∤ 2D} (1 + 1/(p-4))   (= Σ_{d | n²-D admissible} λ(d)/d),
 *     E_u    = Π_{p split, p ∤ 2Du} (1 + 2/(p(p-4))).
 * F_u(h) = F(uh) because a prime of u dividing (uh)² - D would divide D. So ONE sieve of n² - D over n ≤ H gives all pieces at
 * Y = H/u. Weights w(u) = P(1) λ(u) ω(u), λ(p) = p/(p - 2ω(p)) (part III §1). Off*_f(H) = Σ_u w(u) P_u(H/u) (Prop. pieces).
 * Means by Kahan-summed log1p over primes ≤ PE plus the tail formula (KNOWLEDGE F44: no float64 products).
 *   D=-3 H=10000000 PE=100000000 npx tsx research/explore/pieces-all-u.ts
 * Output: research/explore/data/pieces-allu-D<|D|>-H<H>.dat (u ≤ FILE_UMAX): u w Y P/√Y rms16 mean16, where rms16/mean16 are over
 * 16 lengths Y_j ∈ [Y/4, Y]; then a summary by dyadic u-bins and the cumulative u-sums at U = H^{k/12}.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { smallPrimes } from "../lib/sieve";
const D = Number(process.env.D ?? -3), H = Number(process.env.H ?? 1e7), PE = Number(process.env.PE ?? 1e8);
const FILE_UMAX = Number(process.env.FILE_UMAX ?? 100000);
if (D >= 0 || (((D % 4) + 4) % 4 !== 0 && ((D % 4) + 4) % 4 !== 1)) throw new Error("D must be a negative discriminant");
const Nmax = Math.floor(H);
if (Nmax * Nmax - D >= 2 ** 53) throw new Error("H too large for exact float64 values of n^2 - D");
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const Pmax = Nmax + Math.ceil(Math.sqrt(-D)) + 2;
const primes = smallPrimes(Math.max(Pmax, PE) + 1000);
function jacobi(a: number, n: number): number {
  a = ((a % n) + n) % n; let t = 1;
  while (a !== 0) { while (a % 2 === 0) { a /= 2; const r = n % 8; if (r === 3 || r === 5) t = -t; } const tmp = a; a = n; n = tmp; if (a % 4 === 3 && n % 4 === 3) t = -t; a %= n; }
  return n === 1 ? t : 0;
}
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
// f and ω(p)
const b = ((D % 4) + 4) % 4 === 1 ? 1 : 0, c0 = b === 1 ? (1 - D) / 4 : -D / 4;   // f(t) = t² + b t + c0
const omega = (p: number) => {
  if ((2 * D) % p !== 0) return 1 + jacobi(D, p);
  let k = 0; for (let t = 0; t < p; t++) if (((t * t + b * t + c0) % p + p) % p === 0) k++; return k;
};
const lam = (p: number) => { const om = omega(p); if (p - 2 * om === 0) throw new Error(`lambda(${p}) undefined (omega=${om}): choose another D`); return p / (p - 2 * om); };
// sieve of n² - D
const Qv = new Float64Array(Nmax + 1), F = new Float64Array(Nmax + 1).fill(1);
for (let n = 1; n <= Nmax; n++) Qv[n] = n * n - D;
for (const p of primes) {
  if (p > Pmax) break;
  if ((2 * D) % p === 0) {
    for (let r0 = 0; r0 < p; r0++) if (((r0 * r0 - D) % p + p) % p === 0)
      for (let n = r0 === 0 ? p : r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; }
    continue;
  }
  if (jacobi(D, p) !== 1) continue;
  const r = sqrtmod(D, p), fac = 1 + 1 / (p - 4);
  for (const r0 of [r, p - r]) for (let n = r0; n <= Nmax; n += p) { let x = Qv[n]; while (x % p === 0) x /= p; Qv[n] = x; F[n] *= fac; }
}
let big = 0;
for (let n = 1; n <= Nmax; n++) if (Qv[n] > 1) { F[n] *= 1 + 1 / (Qv[n] - 4); big++; }
console.log(`D=${D} f=t^2+${b}t+${c0} H=${H}: sieve done, ${big} large prime cofactors (${el()})`);
// means E (u = 1) and P(1), Kahan-summed logs
const tailSum = (P: number) => { const x = Math.log(P); return Math.exp(-x) / x * (1 - 1 / x + 2 / x ** 2 - 6 / x ** 3 + 24 / x ** 4); };
let sE = 0, cE = 0, sP = 0, cP = 0, signP = 1, zeroP = false;
const kah = (s: number, c: number, v: number): [number, number] => { const vv = v - c; const t = s + vv; return [t, t - s - vv]; };
for (const p of primes) {
  if (p > PE) break;
  const om = omega(p);
  if (om === 2 && (2 * D) % p !== 0) [sE, cE] = kah(sE, cE, Math.log1p(2 / (p * (p - 4))));
  if (om > 0) { const Pp = 1 - (om * om) / ((p - om) * (p - om)); if (Pp === 0) zeroP = true; else { if (Pp < 0) signP = -signP; [sP, cP] = kah(sP, cP, Math.log(Math.abs(Pp))); } }
}
const E = Math.exp(sE + tailSum(PE)), P1 = zeroP ? 0 : signP * Math.exp(sP - 2 * tailSum(PE));
console.log(`E = ${E.toPrecision(15)}, P(1) = ${P1.toPrecision(12)} (${el()})`);
// enumerate u
const spf = new Int32Array(Nmax + 1);
for (let i = 2; i <= Nmax; i++) if (spf[i] === 0) for (let j = i; j <= Nmax; j += i) if (spf[j] === 0) spf[j] = i;
const omCache = new Map<number, number>(), lamCache = new Map<number, number>();
const om_ = (p: number) => { let v = omCache.get(p); if (v === undefined) { v = omega(p); omCache.set(p, v); } return v; };
const lam_ = (p: number) => { let v = lamCache.get(p); if (v === undefined) { v = lam(p); lamCache.set(p, v); } return v; };
const tj = Array.from({ length: 16 }, (_, j) => 0.25 + (0.75 * j) / 15);
const Uk = Array.from({ length: 12 }, (_, k) => Math.pow(H, (k + 1) / 12));
const U23 = Math.pow(H, 2 / 3);
let cumW = 0, cumAbs = 0, cumSq = 0, nU = 0, kNext = 0, done23 = false;
const cumRows: string[] = [];
const bins = new Map<number, { vals: number[]; rms: number[]; Ymin: number; Ymax: number }>();
const fileRows: string[] = [];
const flushCum = (label: string, U: number) => cumRows.push(`${label.padEnd(10)} U=${U.toExponential(3)}  #u=${nU}  Σ w·P = ${(P1 * cumW).toExponential(4)}  Σ|w·P| = ${(Math.abs(P1) * cumAbs).toExponential(4)}  sqrt(Σ(w·P)²) = ${(Math.abs(P1) * Math.sqrt(cumSq)).toExponential(4)}  (H log H = ${(H * Math.log(H)).toExponential(3)}, H = ${H.toExponential(3)})`);
for (let u = 1; u <= Nmax; u++) {
  while (kNext < 12 && u > Uk[kNext]) { flushCum(`H^${kNext + 1}/12`, Uk[kNext]); kNext++; }
  if (!done23 && u > U23) { flushCum("H^(2/3)", U23); done23 = true; }
  let m = u, w = 1, Efac = 1, ok = true;
  while (m > 1) { const p = spf[m]; m /= p; if (m % p === 0) { ok = false; break; } const om = om_(p); if (om === 0) { ok = false; break; } w *= lam_(p) * om; if (om === 2 && (2 * D) % p !== 0) Efac *= 1 + 2 / (p * (p - 4)); }
  if (!ok) continue;
  const Eu = E / Efac, Y = H / u, M = Math.floor(Y);
  let A0 = 0, c0k = 0, A1 = 0, c1k = 0, j = 0; const Pj: number[] = [];
  const Yjs = tj.map((t) => Y * t);
  for (let h = 1; h <= M; h++) {
    const g = F[u * h] - 1;
    [A0, c0k] = kah(A0, c0k, g); [A1, c1k] = kah(A1, c1k, h * g);
    while (j < 16 && Math.floor(Yjs[j]) === h) { const Yv = Yjs[j]; Pj.push(Yv * A0 - A1 - (Eu - 1) * Yv * Yv / 2); j++; }
  }
  while (j < 16) { const Yv = Yjs[j]; const mm = Math.floor(Yv); Pj.push((mm >= 1 ? Yv * A0 - A1 : 0) - (Eu - 1) * Yv * Yv / 2); j++; }  // Y_j below 1 or never reached
  const P = Pj[15], sY = Math.sqrt(Y);
  const norm = Pj.map((v, i) => v / Math.sqrt(Math.max(Yjs[i], 1e-9)));
  const rms16 = Math.sqrt(norm.reduce((a, v) => a + v * v, 0) / 16), mean16 = norm.reduce((a, v) => a + v, 0) / 16;
  cumW += w * P; cumAbs += Math.abs(w * P); cumSq += (w * P) ** 2; nU++;
  const bk = Math.floor(Math.log2(u)); let B = bins.get(bk); if (!B) { B = { vals: [], rms: [], Ymin: Infinity, Ymax: 0 }; bins.set(bk, B); }
  B.vals.push(P / sY); B.rms.push(rms16); B.Ymin = Math.min(B.Ymin, Y); B.Ymax = Math.max(B.Ymax, Y);
  if (u <= FILE_UMAX) fileRows.push(`${u} ${w.toPrecision(8)} ${Y.toPrecision(8)} ${(P / sY).toFixed(6)} ${rms16.toFixed(6)} ${mean16.toFixed(6)}`);
}
while (kNext < 12) { flushCum(`H^${kNext + 1}/12`, Uk[kNext]); kNext++; }
flushCum("all u", Nmax);
mkdirSync("research/explore/data", { recursive: true });
const out = `research/explore/data/pieces-allu-D${-D}-H${H.toExponential(0).replace("+", "")}.dat`;
writeFileSync(out, "u w Y P_over_sqrtY rms16 mean16\n" + fileRows.join("\n") + "\n");
console.log(`pieces done (${el()}); wrote ${out}`);
console.log("bin [2^k, 2^(k+1)):  #u   Y range            rms_u(P/√Y)  median rms16   mean_u(P/√Y)");
for (const [k, B] of [...bins.entries()].sort((a, b2) => a[0] - b2[0])) {
  const n = B.vals.length, rmsU = Math.sqrt(B.vals.reduce((a, v) => a + v * v, 0) / n), meanU = B.vals.reduce((a, v) => a + v, 0) / n;
  const med = [...B.rms].sort((a, b2) => a - b2)[Math.floor(n / 2)];
  console.log(`k=${String(k).padStart(2)}  ${String(n).padStart(7)}  ${B.Ymin.toExponential(2)}-${B.Ymax.toExponential(2)}  ${rmsU.toFixed(4).padStart(10)}  ${med.toFixed(4).padStart(12)}  ${meanU.toFixed(4).padStart(12)}`);
}
console.log("cumulative u-sums (P(1) included):"); for (const r of cumRows) console.log("  " + r);
