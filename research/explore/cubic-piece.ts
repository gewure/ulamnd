/**
 * cubic-piece.ts — level-1 root statistics of a polynomial f of degree <= 3 (14 Sep 2026, exploration, not a paper).
 *
 * Object (exact, finite), for each grid point T: divisors d <= T (moving cutoff), c_T(h) = sum_{d | f(h), d <= T, (d, a disc f) = 1} 1/d,
 *   A(T) = sum_{h<=T} c_T(h) − T·E  (sharp),  P(T) = sum_{h <= T} (T − h)(c_T(h) − E_T)  (Riesz order 1),  E_T = sum_{d<=T} rho(d)/d^2.
 *   Grid: 4096 log-spaced T in [10^3, Y]. Columns: logY Y P P/sqrtY A A/sqrtY.
 * Writes research/paper-IV/data/piece-<TAG>-grid.dat in the format of piece-general.ts (logY Y P P/sqrtY), so that
 * piece-periodogram.ts <TAG> and piece-maass.ts <TAG> can read it. The truncation d <= Y is part of the definition: it
 * makes the sawtooth series finite (moduli d in (T, Y] contribute a linear-in-T term, absorbed by the detrending).
 * For a quadratic f = x^2 - D this is the "coprime" model object of paper IV with the divisor cutoff, a control.
 *
 *   F="1,0,0,-2" Y=4000000 TAG=cubic-x3m2 npx tsx research/explore/cubic-piece.ts      (f = x^3 - 2)
 *   F="1,0,1" Y=4000000 TAG=cubic-ctrl-x2p1 npx tsx research/explore/cubic-piece.ts    (control: x^2 + 1, D = -4)
 *
 * Method: roots of f mod p for every prime p <= Y by gcd(x^p - x, f) in F_p[x] and Cantor–Zassenhaus splitting;
 * roots mod p^k by Hensel (all roots simple since p does not divide the discriminant); roots mod d by CRT along the
 * smallest-prime-factor recursion; then a sieve over d adding 1/d at h = x mod d. Cost ~ Y log Y additions.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { smallPrimes } from "../lib/sieve";

const F = (process.env.F ?? "1,0,0,-2").split(",").map(Number); // coefficients, highest degree first
const Y = Number(process.env.Y ?? 4_000_000), TAG = process.env.TAG ?? "cubic-test";
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const deg = F.length - 1; if (deg < 2 || deg > 3) throw new Error("degree 2 or 3 only");
const a = F[0];
// discriminant
const disc = deg === 3
  ? (() => { const [A, B, C, Dd] = F; return B * B * C * C - 4 * A * C * C * C - 4 * B * B * B * Dd - 27 * A * A * Dd * Dd + 18 * A * B * C * Dd; })()
  : F[1] * F[1] - 4 * F[0] * F[2];
if (disc === 0) throw new Error("f has a repeated root");
console.log(`f = [${F.join(",")}] (degree ${deg}), disc = ${disc}, Y = ${Y}`);
const primes = smallPrimes(Y + 10).filter((p) => p <= Y);
const special = new Set(primes.filter((p) => (Math.abs(a * disc)) % p === 0));
console.log(`excluded primes (dividing a*disc): ${[...special].join(",")}`);

// ---- arithmetic mod p (p <= 1e7, products < 2^53)
const mod = (x: number, m: number) => ((x % m) + m) % m;
const mulmod = (x: number, y: number, m: number) => { const r = x * y; return r < 9e15 ? r % m : Number((BigInt(x) * BigInt(y)) % BigInt(m)); };
function powmod(b: number, e: number, m: number): number { let r = 1; b = mod(b, m); while (e > 0) { if (e & 1) r = mulmod(r, b, m); b = mulmod(b, b, m); e = Math.floor(e / 2); } return r; }
function inv(x: number, m: number): number { // extended Euclid, gcd assumed 1
  let [r0, r1, s0, s1] = [m, mod(x, m), 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return mod(s0, m);
}
// polynomials mod p as arrays low->high, reduced mod the monic image of f
type Poly = number[];
function trim(u: Poly): Poly { let n = u.length; while (n > 0 && u[n - 1] === 0) n--; return u.slice(0, n); }
function polyMod(u: Poly, fm: Poly, p: number): Poly { // fm monic
  u = u.slice(); const n = fm.length - 1;
  for (let i = u.length - 1; i >= n; i--) { const c = u[i]; if (c === 0) continue; for (let j = 0; j <= n; j++) u[i - n + j] = mod(u[i - n + j] - mulmod(c, fm[j], p), p); }
  return trim(u.slice(0, n));
}
function polyMulMod(u: Poly, v: Poly, fm: Poly, p: number): Poly {
  const w: number[] = new Array(u.length + v.length - 1).fill(0);
  for (let i = 0; i < u.length; i++) if (u[i]) for (let j = 0; j < v.length; j++) w[i + j] = mod(w[i + j] + mulmod(u[i], v[j], p), p);
  return polyMod(w, fm, p);
}
function polyPowMod(base: Poly, e: number, fm: Poly, p: number): Poly { let r: Poly = [1], b = base; while (e > 0) { if (e & 1) r = polyMulMod(r, b, fm, p); b = polyMulMod(b, b, fm, p); e = Math.floor(e / 2); } return r; }
function polyGcd(u: Poly, v: Poly, p: number): Poly { // monic gcd
  u = trim(u); v = trim(v);
  while (v.length) { // u mod v
    const lv = inv(v[v.length - 1], p); const vm = v.map((c) => mulmod(c, lv, p));
    let r = u.slice(); const n = vm.length - 1;
    for (let i = r.length - 1; i >= n; i--) { const c = r[i]; if (!c) continue; for (let j = 0; j <= n; j++) r[i - n + j] = mod(r[i - n + j] - mulmod(c, vm[j], p), p); }
    u = v; v = trim(r.slice(0, n));
  }
  const lu = inv(u[u.length - 1], p); return u.map((c) => mulmod(c, lu, p));
}
function rootsOfSplit(g: Poly, p: number): number[] { // g monic, product of distinct linear factors, deg <= 3
  const d = g.length - 1;
  if (d === 0) return [];
  if (d === 1) return [mod(-g[0], p)];
  if (d === 2) { // x^2 + g1 x + g0: roots via Tonelli–Shanks on the discriminant
    const disc2 = mod(mulmod(g[1], g[1], p) - 4 * g[0], p); const s = sqrtmod(disc2, p); const h2 = inv(2, p);
    return [mulmod(mod(-g[1] + s, p), h2, p), mulmod(mod(-g[1] - s, p), h2, p)];
  }
  // degree 3: Cantor–Zassenhaus with random shifts
  for (let tries = 0; tries < 60; tries++) {
    const c = 1 + Math.floor(Math.random() * (p - 1));
    const h = polyPowMod([c, 1], (p - 1) / 2, g, p); const hm = h.slice(); hm[0] = mod((hm[0] ?? 0) - 1, p);
    const gg = polyGcd(g, trim(hm), p);
    if (gg.length > 1 && gg.length < g.length) { // proper factor
      const other = polyDiv(g, gg, p); return [...rootsOfSplit(gg, p), ...rootsOfSplit(other, p)];
    }
  }
  // fallback: brute force (should not happen)
  const r: number[] = []; for (let x = 0; x < p && r.length < d; x++) if (evalPoly(g, x, p) === 0) r.push(x); return r;
}
function polyDiv(u: Poly, v: Poly, p: number): Poly { // exact division, v monic
  let r = u.slice(); const n = v.length - 1; const q: number[] = new Array(u.length - n).fill(0);
  for (let i = r.length - 1; i >= n; i--) { const c = r[i]; q[i - n] = c; if (!c) continue; for (let j = 0; j <= n; j++) r[i - n + j] = mod(r[i - n + j] - mulmod(c, v[j], p), p); }
  return trim(q);
}
function evalPoly(g: Poly, x: number, p: number): number { let r = 0; for (let i = g.length - 1; i >= 0; i--) r = mod(mulmod(r, x, p) + g[i], p); return r; }
function sqrtmod(n: number, p: number): number {
  n = mod(n, p); if (n === 0) return 0; if (p % 4 === 3) return powmod(n, (p + 1) / 4, p);
  let q = p - 1, s = 0; while (q % 2 === 0) { q /= 2; s++; }
  let z = 2; while (powmod(z, (p - 1) / 2, p) === 1) z++;
  let m = s, c = powmod(z, q, p), t = powmod(n, q, p), r = powmod(n, (q + 1) / 2, p);
  while (t !== 1) { let i = 0, tt = t; while (tt !== 1) { tt = mulmod(tt, tt, p); i++; } let b = c; for (let j = 0; j < m - i - 1; j++) b = mulmod(b, b, p); m = i; c = mulmod(b, b, p); t = mulmod(t, c, p); r = mulmod(r, b, p); }
  return r;
}
function rootsModP(p: number): number[] {
  const fp = F.slice().reverse().map((c) => mod(c, p)); // low->high
  const la = inv(fp[fp.length - 1], p); const fm = fp.map((c) => mulmod(c, la, p)); // monic
  if (p <= 3) { const r: number[] = []; for (let x = 0; x < p; x++) if (evalPoly(fm, x, p) === 0) r.push(x); return r; }
  const xp = polyPowMod([0, 1], p, fm, p); const xpx = xp.slice(); while (xpx.length < 2) xpx.push(0); xpx[1] = mod(xpx[1] - 1, p);
  const g = trim(xpx); if (g.length === 0) return rootsOfSplit(fm, p); // f splits completely (x^p = x mod f)
  const gcd = polyGcd(fm, g, p); return rootsOfSplit(gcd, p);
}
// exact evaluation of f at integer x modulo m (BigInt, for Hensel lifting mod p^k)
function fmodBig(x: number, m: number): number { const M = BigInt(m); let r = 0n, X = BigInt(x) % M; for (const c of F) r = ((r * X) + BigInt(c)) % M; return Number((r + M) % M); }
function fprimeMod(x: number, p: number): number { // f'(x) mod p
  const n = F.length - 1; let r = 0; for (let i = 0; i < n; i++) r = mod(mulmod(r, x, p) + mulmod(F[i], n - i, p), p); return r;
}

// ---- rho(d) and roots for all d <= Y (CSR storage)
console.log(`primes: ${primes.length} (${el()})`);
const spf = new Int32Array(Y + 1); // smallest prime factor
for (const p of primes) for (let m = p; m <= Y; m += p) if (spf[m] === 0) spf[m] = p;
const rho = new Uint8Array(Y + 1); rho[1] = 1;
const rootsP = new Map<number, number[]>();
let nsplit = 0;
for (const p of primes) {
  if (special.has(p)) { rho[p] = 0; continue; }
  const r = rootsModP(p); rootsP.set(p, r); rho[p] = r.length; if (r.length === deg) nsplit++;
}
console.log(`roots mod p done: ${nsplit} fully split primes of ${primes.length} (${el()})`);
// rho multiplicative, rho(p^k) = rho(p) for p not special
for (let d = 2; d <= Y; d++) { if (rho[d] !== 0 || d === 1) continue; if (spf[d] === d) continue; const p = spf[d]; let m = d, k = 0; while (m % p === 0) { m /= p; k++; } rho[d] = rho[p] === 0 || rho[m] === 0 ? 0 : (rho[p] * rho[m] > 255 ? 255 : rho[p] * rho[m]); }
// primes with rho 0 stay 0; d=prime handled above (rho[p] set); composite d handled here — but the loop skipped d with rho already set (only primes). fine.
let total = 0; const off = new Float64Array(Y + 2); for (let d = 1; d <= Y; d++) { off[d] = total; total += rho[d]; } off[Y + 1] = total;
console.log(`total roots over all moduli d <= Y: ${total} (mean rho ${(total / Y).toFixed(3)}) (${el()})`);
const R = new Uint32Array(total);
R[off[1]] = 0;
for (let d = 2; d <= Y; d++) {
  if (rho[d] === 0) continue;
  const p = spf[d]; let m = d, k = 0, pk = 1; while (m % p === 0) { m /= p; k++; pk *= p; }
  // roots mod p^k by Hensel
  let rpk: number[] = rootsP.get(p)!;
  for (let j = 1; j < k; j++) { const pj = Math.pow(p, j), pj1 = pj * p; rpk = rpk.map((r) => { const fv = fmodBig(r, pj1); const t = mod(-Math.round(fv / pj) * inv(fprimeMod(r, p), p), p); return r + pj * t; }); }
  if (m === 1) { for (let i = 0; i < rpk.length; i++) R[off[d] + i] = rpk[i]; continue; }
  // CRT with roots mod m
  const rm = R.subarray(off[m], off[m + 1]); const ipk = inv(pk % m, m); let i = 0;
  for (const A of rpk) for (const B of rm) { const t = mulmod(mod(B - A, m), ipk, m); R[off[d] + i++] = A + pk * t; }
}
console.log(`roots mod all d built (${el()})`);
// ---- expectation E = sum_{d<=Y} rho(d)/d^2 (the tail beyond Y is O(1/Y))
let EY = 0; const Epre = new Float64Array(Y + 1); for (let d = 1; d <= Y; d++) { if (rho[d]) EY += rho[d] / d / d; Epre[d] = EY; }
console.log(`E_Y = ${EY.toFixed(12)} (${el()})`);
// with the moving cutoff d <= T the mean of c_T(h) is E_T = sum_{d<=T} rho(d)/d^2, not E_Y (using E_Y adds a T^2/Y trend)
// ---- moving cutoff: for each grid point T, divisors d <= T only (the moduli d > T of the full sum contribute a
// bounded, non-oscillatory term; a FIXED cutoff d <= Y would add a smooth T^3/Y trend to the Riesz mean — first version).
//   sharp:  A(T) = sum_{d<=T} (1/d) sum_{x in R_d} #{h<=T : h≡x (d)} − T·E,   #{...} = floor((T−x̄)/d)+1, x̄ ∈ [1,d]
//   Riesz1: P(T) = sum_{d<=T} (1/d) sum_x [ n(T−x̄) − d n(n−1)/2 ] − E·T(T−1)/2,  n = floor((T−x̄)/d)+1
const N = 4096, lo = Math.log(1000), hi = Math.log(Y); const lines = ["logY Y P PoverSqrtY A AoverSqrtY"];
let maxP = 0, lastP = 0;
for (let gi = 0; gi < N; gi++) {
  const T = Math.round(Math.exp(lo + (hi - lo) * gi / (N - 1)));
  let A = 0, P = 0;
  for (let d = 1; d <= T; d++) {
    if (rho[d] === 0) continue; const w = 1 / d;
    for (let i = off[d]; i < off[d + 1]; i++) { let x = R[i]; if (x === 0) x = d; if (x > T) continue; const n = Math.floor((T - x) / d) + 1; A += n * w; P += (n * (T - x) - d * n * (n - 1) / 2) * w; }
  }
  const ET = Epre[T]; A -= T * ET; P -= ET * T * (T - 1) / 2; lastP = P;
  maxP = Math.max(maxP, Math.abs(P) / Math.sqrt(T));
  lines.push(`${Math.log(T).toFixed(5)} ${T} ${P.toFixed(4)} ${(P / Math.sqrt(T)).toFixed(6)} ${A.toFixed(6)} ${(A / Math.sqrt(T)).toFixed(6)}`);
}
mkdirSync("research/paper-IV/data", { recursive: true });
writeFileSync(`research/paper-IV/data/piece-${TAG}-grid.dat`, lines.join("\n") + "\n");
// linear-trend diagnostic: fit P(T) = c1 T + c0 on the upper half
console.log(`max |P|/sqrtT on grid = ${maxP.toFixed(3)}; P(Y)/sqrtY = ${(lastP / Math.sqrt(Y)).toFixed(4)}; wrote piece-${TAG}-grid.dat (${el()})`);
