/**
 * piece-divset.ts — the model object of paper IV (Riesz mean of order 1 of sigma_{-1} along h^2 - D, weight 1,
 * all divisors) computed simultaneously for THREE divisor sets, to test Remark rem:coprime (13 Sep 2026):
 *   coprime  : d | h^2-D with (d, 2D) = 1        (the model object eq:model of the paper)
 *   all      : every d | h^2-D                     (a finite union of complete SL_2(Z)-orbits: discriminants 4D/g^2)
 *   excluded : all - coprime                       (the sub-family the proof dropped; union of Gamma_0(e)-orbits, e | rad 2D)
 * Writes research/paper-IV/data/piece-DS-{coprime,all,excluded}-D<D>-grid.dat (same format as piece-general.ts, so
 * piece-maass.ts <tag> and piece-periodogram.ts <tag> read them).
 *   D=-4 Y=10000000 npx tsx research/paper-IV/scripts/piece-divset.ts        (U=u for the piece with dilation u: Q_u(h) = u^2 h^2 - D;
 *   the coprime set is then (d, 2Du) = 1; for (D,u) = 1 the primes of u never divide Q_u, so "all" = all d | Q_u(h))
 * Linear term: sum_{h<=Y}(Y-h)(F-EF) has the linear coefficient c = EF/2 + sum_d d^{-1} sum_{x in R_d, 1<=x<=d}(1/2 - x/d);
 * symmetric pairs {x, d-x} and fixed points x = d/2 contribute 0, the root x = d (i.e. 0) exists iff d | D and gives
 * -1/(2d); hence c_coprime = (EF_c - 1)/2 (the paper's convention) and c_all = (EF_a - sigma_{-1}(|D|))/2.
 * The fitted linear coefficient is printed next to the analytic one as a check.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { smallPrimes } from "../../lib/sieve";
const D = Number(process.env.D ?? -4), Y = Number(process.env.Y ?? 10_000_000), U = Number(process.env.U ?? 1);
if (D % 4 === 2 || D % 4 === 3 || D >= 0 && Number.isInteger(Math.sqrt(D))) throw new Error("D must be a non-square discriminant");
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const Pmax = U * Y + Math.ceil(Math.sqrt(Math.abs(D))) + 2; // cofactor after sieving p <= Pmax is 1 or prime (Q_u <= U^2 Y^2 + |D| < Pmax^2)
const primes = smallPrimes(Pmax + 1000);
const special = primes.filter((p) => (2 * D * U) % p === 0);
const rootsMod = (m: number) => { const r: number[] = []; for (let x = 0; x < m; x++) if (((U * U * x * x - D) % m + m) % m === 0) r.push(x); return r; };
const modinv = (a: number, m: number) => { let [g, x, y, u0, v0] = [a % m, 1, 0, m, 0]; let r0 = m, r1 = ((a % m) + m) % m, s0 = 0, s1 = 1; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; };
function sqrtmod(n: number, p: number): number { // Tonelli–Shanks, n a QR mod odd prime p
  const pm = (b: bigint, e: bigint, m: bigint) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
  n = ((n % p) + p) % p; const P = BigInt(p), N = BigInt(n);
  if (p % 4 === 3) return Number(pm(N, (P + 1n) / 4n, P));
  let q = P - 1n, s = 0; while (q % 2n === 0n) { q /= 2n; s++; }
  let z = 2n; while (pm(z, (P - 1n) / 2n, P) === 1n) z++; // z a non-residue
  let m = s, c = pm(z, q, P), t = pm(N, q, P), r = pm(N, (q + 1n) / 2n, P);
  while (t !== 1n) { let i = 0, tt = t; while (tt !== 1n) { tt = tt * tt % P; i++; } let b = c; for (let j = 0; j < m - i - 1; j++) b = b * b % P; m = i; c = b * b % P; t = t * c % P; r = r * b % P; }
  return Number(r);
}
const legendre = (a: number, p: number) => { a = ((a % p) + p) % p; if (a === 0) return 0; let r = 1n, b = BigInt(a), e = BigInt((p - 1) / 2), P = BigInt(p); while (e > 0n) { if (e & 1n) r = r * b % P; b = b * b % P; e >>= 1n; } return r === 1n ? 1 : -1; };
const Qv = new Float64Array(Y + 1), Fc = new Float64Array(Y + 1).fill(1), Fa = new Float64Array(Y + 1).fill(1);
for (let h = 1; h <= Y; h++) Qv[h] = Math.abs(U * U * h * h - D);
let EFc = 1, EFa = 1;
// special primes: local factor of sigma_{-1} only in F_all; mean factor sum_k rho(p^k)/p^{2k} by brute force
for (const p of special) {
  let mean = 1, pk = 1;
  for (let k = 1; k <= 20; k++) { pk *= p; if (pk > 4e6) break; const rho = rootsMod(pk).length; if (rho === 0) break; mean += rho / (pk * pk); }
  EFa *= mean;
  for (const r0 of rootsMod(p)) for (let h = r0 === 0 ? p : r0; h <= Y; h += p) {
    let x = Qv[h], v = 0; while (x % p === 0) { x /= p; v++; } Qv[h] = x;
    Fa[h] *= (1 - Math.pow(p, -(v + 1))) / (1 - 1 / p);
  }
}
for (const p of primes) {
  if (p > Pmax) break;
  if ((2 * D * U) % p === 0 || legendre(D, p) !== 1) continue;
  EFc *= 1 + 2 / (p * p - 1);
  const r = Number((BigInt(sqrtmod(D, p)) * BigInt(modinv(U % p, p))) % BigInt(p)); // roots of u^2 x^2 = D: x = sqrt(D)/u
  for (const r0 of [r, p - r]) for (let h = r0; h <= Y; h += p) {
    let x = Qv[h], v = 0; while (x % p === 0) { x /= p; v++; } Qv[h] = x;
    const f = (1 - Math.pow(p, -(v + 1))) / (1 - 1 / p); Fc[h] *= f; Fa[h] *= f;
  }
}
{ const xx = Math.log(Pmax); EFc *= Math.exp(Math.exp(-xx) / xx * (1 - 1 / xx + 2 / xx ** 2 - 6 / xx ** 3 + 24 / xx ** 4)); } // tail as in piece-general.ts
EFa *= EFc;
let big = 0;
for (let h = 1; h <= Y; h++) if (Qv[h] > 1) { const q = Qv[h]; const f = 1 + 1 / q; Fc[h] *= f; Fa[h] *= f; big++; }
let sig = 0; for (let d = 1; d <= Math.abs(D); d++) if (D % d === 0) sig += 1 / d;
const EFe = EFa - EFc;
const clin = { coprime: (EFc - 1) / 2, all: (EFa - sig) / 2, excluded: (EFa - sig) / 2 - (EFc - 1) / 2 };
console.log(`D=${D} U=${U} Y=${Y}: special ${special.join(",")}, E F_coprime = ${EFc.toFixed(12)}, E F_all = ${EFa.toFixed(12)}, sigma_{-1}(|D|) = ${sig.toFixed(6)}, ${big} large cofactors (${el()})`);
const Mg = 4096, lo = Math.log(1e3), hi = Math.log(Y);
const gridY = Array.from({ length: Mg }, (_, j) => Math.floor(Math.exp(lo + ((hi - lo) * j) / (Mg - 1))));
const sets: Record<string, { S: number; cS: number; Sh: number; cSh: number; grid: number[]; mean: number; F: (h: number) => number }> = {
  coprime: { S: 0, cS: 0, Sh: 0, cSh: 0, grid: [], mean: EFc, F: (h) => Fc[h] },
  all: { S: 0, cS: 0, Sh: 0, cSh: 0, grid: [], mean: EFa, F: (h) => Fa[h] },
  excluded: { S: 0, cS: 0, Sh: 0, cSh: 0, grid: [], mean: EFe, F: (h) => Fa[h] - Fc[h] },
};
let gj = 0;
for (let h = 1; h <= Y; h++) {
  for (const k in sets) { const s = sets[k]; const v = s.F(h) - s.mean; let yv = v - s.cS; let t = s.S + yv; s.cS = t - s.S - yv; s.S = t; yv = h * v - s.cSh; t = s.Sh + yv; s.cSh = t - s.Sh - yv; s.Sh = t; }
  while (gj < Mg && gridY[gj] === h) { for (const k in sets) { const s = sets[k]; s.grid.push(h * s.S - s.Sh - (clin as any)[k] * h); } gj++; }
}
mkdirSync("research/paper-IV/data", { recursive: true });
for (const k in sets) {
  const g = sets[k].grid; // fitted linear coefficient of the RAW Riesz mean against Y over the grid (least squares through origin on P_raw = P + c Y)
  let sxy = 0, sxx = 0; for (let j = 0; j < Mg; j++) { const yy = gridY[j]; sxy += (g[j] + (clin as any)[k] * yy) * yy; sxx += yy * yy; }
  const maxr = Math.max(...g.map((v, j) => Math.abs(v) / Math.sqrt(gridY[j])));
  console.log(`${k.padEnd(8)} analytic linear coeff ${(clin as any)[k].toFixed(6)}  fitted ${(sxy / sxx).toFixed(6)}   max |P|/sqrtY on grid = ${maxr.toFixed(3)}   P(Y)/sqrtY at Y=${Y}: ${(g[Mg - 1] / Math.sqrt(Y)).toFixed(4)}`);
  writeFileSync(`research/paper-IV/data/piece-DS-${k}-D${D}${U > 1 ? "-U" + U : ""}-grid.dat`, "logY Y P PoverSqrtY\n" + gridY.map((yy, j) => `${Math.log(yy).toFixed(5)} ${yy} ${g[j].toFixed(4)} ${(g[j] / Math.sqrt(yy)).toFixed(6)}`).join("\n") + "\n");
}
console.log(`done (${el()})`);
