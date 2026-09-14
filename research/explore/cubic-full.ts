/**
 * cubic-full.ts — the FULL divisor-sum object for a polynomial f of degree 2 or 3 (14 Sep 2026, exploration).
 *
 *   c(h) = sum_{d | f(h), (d, a·disc f) = 1} 1/d   over ALL divisors (this needs the complete factorisation of f(h)),
 *   P(T) = sum_{h<=T} (T − h)(c(h) − E),   E = prod_{p ∤ a disc} (1 + rho(p)/(p^2 − 1))   (rho(p^k) = rho(p), simple roots),
 * on a log grid of 4096 points T in [10^3, Y]; the quadratic trend from the error in E and the linear term are fitted
 * and subtracted afterwards (see below), then P/sqrt(T) is scanned (piece-periodogram.ts).
 * Why all divisors: the Maass oscillation lives in the moduli d > T with a root x̄ ≤ T (the Hooley/DFI short-interval
 * range); any cutoff d ≤ T removes it (verified on the control x²+1 with cubic-piece.ts, 14 Sep).
 *
 * Method: root sieve over primes p ≤ Y (roots mod p as in cubic-piece.ts), dividing p out of f(h) (BigInt) as often as
 * it divides; the special primes (p | a·disc) are divided out by trial division; the remaining cofactor q has all prime
 * factors > Y, and since f(h) ≤ ~Y^3 it is 1, a prime, or a product of two primes > Y: q < Y^2 ⇒ prime; otherwise
 * Miller–Rabin decides and Pollard–Brent splits. Memory: Y BigInts (Y = 10^6: fine; 4·10^6: ~ a few hundred MB).
 *
 *   F="1,0,1" Y=1000000 TAG=full-ctrl-x2p1 npx tsx research/explore/cubic-full.ts     (control: must show 13.78, 17.74)
 *   F="1,0,0,-2" Y=1000000 TAG=full-x3m2 npx tsx research/explore/cubic-full.ts        (f = x^3 − 2)
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { smallPrimes } from "../lib/sieve";

const F = (process.env.F ?? "1,0,0,-2").split(",").map(Number);
const Y = Number(process.env.Y ?? 1_000_000), TAG = process.env.TAG ?? "full-test";
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const deg = F.length - 1; if (deg < 2 || deg > 3) throw new Error("degree 2 or 3 only");
const a = F[0];
const disc = deg === 3 ? (() => { const [A, B, C, Dd] = F; return B * B * C * C - 4 * A * C * C * C - 4 * B * B * B * Dd - 27 * A * A * Dd * Dd + 18 * A * B * C * Dd; })() : F[1] * F[1] - 4 * F[0] * F[2];
console.log(`f = [${F.join(",")}], disc = ${disc}, Y = ${Y}`);
const primes = smallPrimes(Y + 10).filter((p) => p <= Y);
const special = primes.filter((p) => Math.abs(a * disc) % p === 0);
console.log(`special primes: ${special.join(",")}`);

// ---- arithmetic mod p (Number, p <= 1e7)
const mod = (x: number, m: number) => ((x % m) + m) % m;
const mulmod = (x: number, y: number, m: number) => { const r = x * y; return r < 9e15 ? r % m : Number((BigInt(x) * BigInt(y)) % BigInt(m)); };
function powmod(b: number, e: number, m: number): number { let r = 1; b = mod(b, m); while (e > 0) { if (e & 1) r = mulmod(r, b, m); b = mulmod(b, b, m); e = Math.floor(e / 2); } return r; }
function inv(x: number, m: number): number { let [r0, r1, s0, s1] = [m, mod(x, m), 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return mod(s0, m); }
type Poly = number[];
function trim(u: Poly): Poly { let n = u.length; while (n > 0 && u[n - 1] === 0) n--; return u.slice(0, n); }
function polyMod(u: Poly, fm: Poly, p: number): Poly { u = u.slice(); const n = fm.length - 1; for (let i = u.length - 1; i >= n; i--) { const c = u[i]; if (c === 0) continue; for (let j = 0; j <= n; j++) u[i - n + j] = mod(u[i - n + j] - mulmod(c, fm[j], p), p); } return trim(u.slice(0, n)); }
function polyMulMod(u: Poly, v: Poly, fm: Poly, p: number): Poly { const w: number[] = new Array(u.length + v.length - 1).fill(0); for (let i = 0; i < u.length; i++) if (u[i]) for (let j = 0; j < v.length; j++) w[i + j] = mod(w[i + j] + mulmod(u[i], v[j], p), p); return polyMod(w, fm, p); }
function polyPowMod(base: Poly, e: number, fm: Poly, p: number): Poly { let r: Poly = [1], b = base; while (e > 0) { if (e & 1) r = polyMulMod(r, b, fm, p); b = polyMulMod(b, b, fm, p); e = Math.floor(e / 2); } return r; }
function polyGcd(u: Poly, v: Poly, p: number): Poly { u = trim(u); v = trim(v); while (v.length) { const lv = inv(v[v.length - 1], p); const vm = v.map((c) => mulmod(c, lv, p)); let r = u.slice(); const n = vm.length - 1; for (let i = r.length - 1; i >= n; i--) { const c = r[i]; if (!c) continue; for (let j = 0; j <= n; j++) r[i - n + j] = mod(r[i - n + j] - mulmod(c, vm[j], p), p); } u = v; v = trim(r.slice(0, n)); } const lu = inv(u[u.length - 1], p); return u.map((c) => mulmod(c, lu, p)); }
function polyDiv(u: Poly, v: Poly, p: number): Poly { let r = u.slice(); const n = v.length - 1; const q: number[] = new Array(u.length - n).fill(0); for (let i = r.length - 1; i >= n; i--) { const c = r[i]; q[i - n] = c; if (!c) continue; for (let j = 0; j <= n; j++) r[i - n + j] = mod(r[i - n + j] - mulmod(c, v[j], p), p); } return trim(q); }
function evalPoly(g: Poly, x: number, p: number): number { let r = 0; for (let i = g.length - 1; i >= 0; i--) r = mod(mulmod(r, x, p) + g[i], p); return r; }
function sqrtmod(n: number, p: number): number { n = mod(n, p); if (n === 0) return 0; if (p % 4 === 3) return powmod(n, (p + 1) / 4, p); let q = p - 1, s = 0; while (q % 2 === 0) { q /= 2; s++; } let z = 2; while (powmod(z, (p - 1) / 2, p) === 1) z++; let m = s, c = powmod(z, q, p), t = powmod(n, q, p), r = powmod(n, (q + 1) / 2, p); while (t !== 1) { let i = 0, tt = t; while (tt !== 1) { tt = mulmod(tt, tt, p); i++; } let b = c; for (let j = 0; j < m - i - 1; j++) b = mulmod(b, b, p); m = i; c = mulmod(b, b, p); t = mulmod(t, c, p); r = mulmod(r, b, p); } return r; }
function rootsOfSplit(g: Poly, p: number): number[] { const d = g.length - 1; if (d === 0) return []; if (d === 1) return [mod(-g[0], p)]; if (d === 2) { const disc2 = mod(mulmod(g[1], g[1], p) - 4 * g[0], p); const s = sqrtmod(disc2, p); const h2 = inv(2, p); return [mulmod(mod(-g[1] + s, p), h2, p), mulmod(mod(-g[1] - s, p), h2, p)]; } for (let tries = 0; tries < 60; tries++) { const c = 1 + Math.floor(Math.random() * (p - 1)); const h = polyPowMod([c, 1], (p - 1) / 2, g, p); const hm = h.slice(); hm[0] = mod((hm[0] ?? 0) - 1, p); const gg = polyGcd(g, trim(hm), p); if (gg.length > 1 && gg.length < g.length) { const other = polyDiv(g, gg, p); return [...rootsOfSplit(gg, p), ...rootsOfSplit(other, p)]; } } const r: number[] = []; for (let x = 0; x < p && r.length < d; x++) if (evalPoly(g, x, p) === 0) r.push(x); return r; }
function rootsModP(p: number): number[] { const fp = F.slice().reverse().map((c) => mod(c, p)); const la = inv(fp[fp.length - 1], p); const fm = fp.map((c) => mulmod(c, la, p)); if (p <= 3) { const r: number[] = []; for (let x = 0; x < p; x++) if (evalPoly(fm, x, p) === 0) r.push(x); return r; } const xp = polyPowMod([0, 1], p, fm, p); const xpx = xp.slice(); while (xpx.length < 2) xpx.push(0); xpx[1] = mod(xpx[1] - 1, p); const g = trim(xpx); if (g.length === 0) return rootsOfSplit(fm, p); const gcd = polyGcd(fm, g, p); return rootsOfSplit(gcd, p); }

// ---- BigInt number theory for the cofactors
const bmod = (x: bigint, m: bigint) => ((x % m) + m) % m;
function bpow(b: bigint, e: bigint, m: bigint): bigint { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; }
function isPrimeBig(n: bigint): boolean { // deterministic Miller–Rabin for n < 3.3e24
  if (n < 2n) return false; for (const p of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n]) { if (n === p) return true; if (n % p === 0n) return false; }
  let d = n - 1n, s = 0; while ((d & 1n) === 0n) { d >>= 1n; s++; }
  outer: for (const a of [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n]) { let x = bpow(a, d, n); if (x === 1n || x === n - 1n) continue; for (let r = 1; r < s; r++) { x = x * x % n; if (x === n - 1n) continue outer; } return false; }
  return true;
}
function gcdBig(a: bigint, b: bigint): bigint { while (b) { [a, b] = [b, a % b]; } return a; }
function rhoBrent(n: bigint): bigint { // Pollard–Brent; n composite, odd, no small factors
  if ((n & 1n) === 0n) return 2n;
  for (let c = 1n; ; c++) {
    let y = 2n, r = 1n, q = 1n, g = 1n, x = y, ys = y; const m = 128n;
    const f = (v: bigint) => (v * v + c) % n;
    while (g === 1n) { x = y; for (let i = 0n; i < r; i++) y = f(y); let k = 0n; while (k < r && g === 1n) { ys = y; const lim = m < r - k ? m : r - k; for (let i = 0n; i < lim; i++) { y = f(y); q = q * bmod(x - y, n) % n; } g = gcdBig(q, n); k += m; } r <<= 1n; }
    if (g === n) { do { ys = f(ys); g = gcdBig(bmod(x - ys, n), n); } while (g === 1n); }
    if (g !== n) return g;
  }
}

// ---- roots mod p, sieve
console.log(`${primes.length} primes (${el()})`);
const vals: bigint[] = new Array(Y + 1); const Fc = [BigInt(F[0])].concat(F.slice(1).map(BigInt));
for (let h = 1; h <= Y; h++) { let v = 0n; const H = BigInt(h); for (const c of Fc) v = v * H + c; vals[h] = v < 0n ? -v : v; }
const c = new Float64Array(Y + 1).fill(1);
let logE = 0, nsplit = 0, rhoSum = 0;
for (const p of primes) {
  const P = BigInt(p);
  if (special.includes(p)) { for (let h = 1; h <= Y; h++) while (vals[h] % P === 0n) vals[h] /= P; continue; } // excluded from c(h), divided out
  const roots = rootsModP(p); rhoSum += roots.length; if (roots.length === deg) nsplit++;
  logE += Math.log1p(roots.length / (p * p - 1));
  for (const r0 of roots) { let h = r0 === 0 ? p : r0; for (; h <= Y; h += p) { let k = 0; while (vals[h] % P === 0n) { vals[h] /= P; k++; } let loc = 1, pk = 1; for (let j = 1; j <= k; j++) { pk *= p; loc += 1 / pk; } c[h] *= loc; } }
}
console.log(`sieve done: ${nsplit} fully split primes, mean rho ${(rhoSum / primes.length).toFixed(4)} (${el()})`);
// cofactors
const Y2 = BigInt(Y) * BigInt(Y); let nPrime = 0, nSemi = 0, nOne = 0;
for (let h = 1; h <= Y; h++) {
  const q = vals[h]; if (q === 1n) { nOne++; continue; }
  if (q < Y2 || isPrimeBig(q)) { c[h] *= 1 + 1 / Number(q); nPrime++; continue; }
  const p1 = rhoBrent(q), p2 = q / p1; nSemi++;
  if (!isPrimeBig(p1) || !isPrimeBig(p2)) throw new Error(`cofactor ${q} at h=${h} not a semiprime: ${p1} * ${p2}`);
  c[h] *= (1 + 1 / Number(p1)) * (1 + 1 / Number(p2));
}
console.log(`cofactors: ${nOne} trivial, ${nPrime} prime, ${nSemi} semiprime (${el()})`);
// E: product over p <= Y computed above; the tail p > Y is ~ exp(sum_{p>Y} rho(p)/p^2) ≈ 1 + 1/(Y log Y) and is absorbed
// by the fitted quadratic term below (E cannot be computed to the needed 10^-9 without L-values of the Galois closure).
const E = Math.exp(logE);
const S1 = new Float64Array(Y + 1), S2 = new Float64Array(Y + 1);
for (let h = 1; h <= Y; h++) { S1[h] = S1[h - 1] + (c[h] - E); S2[h] = S2[h - 1] + h * (c[h] - E); }
const N = 4096, lo = Math.log(1000), hi = Math.log(Y); const Ts: number[] = [], Ps: number[] = [];
for (let i = 0; i < N; i++) { const T = Math.round(Math.exp(lo + (hi - lo) * i / (N - 1))); Ts.push(T); Ps.push(T * S1[T] - S2[T]); }
if (process.env.PRINT_T) for (const T of process.env.PRINT_T.split(',').map(Number)) console.log(`raw P(${T}) = ${(T * S1[T] - S2[T]).toFixed(3)}  (E used: ${E.toFixed(12)})`);
// fit and subtract c2 T^2 + c1 T + c0 (least squares, unweighted): c2 absorbs the error of E, c1 the linear term
const M = N; let sx = [0, 0, 0, 0, 0], sxy = [0, 0, 0]; for (let i = 0; i < M; i++) { const t = Ts[i] / Y; for (let k = 0; k <= 4; k++) sx[k] += t ** k; for (let k = 0; k <= 2; k++) sxy[k] += t ** k * Ps[i]; }
const G = [[sx[0], sx[1], sx[2]], [sx[1], sx[2], sx[3]], [sx[2], sx[3], sx[4]]]; const g = sxy.slice();
for (let p = 0; p < 3; p++) for (let r = 0; r < 3; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = 0; q < 3; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; }
const coef = g.map((v, p) => v / G[p][p]);
console.log(`fitted trend: P ≈ ${coef[2].toExponential(3)} (T/Y)^2 + ${coef[1].toExponential(3)} (T/Y) + ${coef[0].toExponential(3)}  → E_eff − E = ${(2 * coef[2] / Y / Y).toExponential(3)}; E = ${E.toFixed(12)}`);
const lines = ["logY Y P PoverSqrtY"]; let maxP = 0;
for (let i = 0; i < M; i++) { const t = Ts[i] / Y; const P = Ps[i] - (coef[2] * t * t + coef[1] * t + coef[0]); maxP = Math.max(maxP, Math.abs(P) / Math.sqrt(Ts[i])); lines.push(`${Math.log(Ts[i]).toFixed(5)} ${Ts[i]} ${P.toFixed(4)} ${(P / Math.sqrt(Ts[i])).toFixed(6)}`); }
mkdirSync("research/paper-IV/data", { recursive: true }); writeFileSync(`research/paper-IV/data/piece-${TAG}-grid.dat`, lines.join("\n") + "\n");
console.log(`max |P_detrended|/sqrtT = ${maxP.toFixed(3)}; wrote piece-${TAG}-grid.dat (${el()})`);
