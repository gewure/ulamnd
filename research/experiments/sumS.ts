/**
 * Growth of the pair-correlation sum  Σ_{h≤H} (S_f(h) − C(f)²)  for many polynomials, up to H = 1e5,
 * with the Euler products truncated at p ≤ 60000. No primes are involved: this is pure congruence
 * arithmetic, and it decides how the Montgomery–Soundararajan constant generalises.
 *
 *   npx tsx thesis/sumS.ts
 *
 * For each polynomial we record Σ(H) at H = 10^2 … 10^5, the local slope per unit ln H over the last
 * decade, the same for the "diagonal-only" series (in which only the p | h correlations are kept), and
 * write thesis/sumS.json plus paper/data/sumS.dat.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { rayPolynomial } from "../lib/analysis";
import { directions } from "../lib/spiral";
import { batemanHorn, evalPoly, isCertainlyReducible, type IntPoly } from "../lib/poly";
import { smallPrimes } from "../lib/sieve";

let seed = 777;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const randInt = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));
const log = (s: string) => process.stdout.write(s + "\n");
const f3 = (x: number, k = 3) => (Number.isFinite(x) ? x.toFixed(k) : "nan");

const H = 100000;
const P = 60000;
const CHECK = [100, 316, 1000, 3162, 10000, 31623, 100000];
const PRIMES = smallPrimes(P);

function vp(n: bigint, p: bigint): number {
  let v = 0;
  while (n % p === 0n) {
    n /= p;
    v++;
  }
  return v;
}

/** cumulative sums Σ_{h≤H'} (S(h) − C²) for the full and the diagonal-only pair series, at the checkpoints */
function sums(f: IntPoly, C: number): { full: number[]; diag: number[] } {
  const logS = new Float64Array(H);
  const logD = new Float64Array(H);
  for (const p of PRIMES) {
    const pb = BigInt(p);
    const v = vp(f.den, pb);
    let M = p;
    for (let i = 0; i < v; i++) M *= p;
    const Mb = BigInt(M);
    const coef = f.num.map((c) => Number(((c % Mb) + Mb) % Mb));
    const isRoot = new Uint8Array(M);
    const roots: number[] = [];
    for (let t = 0; t < M; t++) {
      let acc = 0;
      for (let i = coef.length - 1; i >= 0; i--) acc = (acc * t + coef[i]) % M;
      if (acc === 0) {
        isRoot[t] = 1;
        roots.push(t);
      }
    }
    const base = -2 * Math.log(1 - 1 / p);
    const w = roots.length; // ω (density w/M)
    const dens1 = w / M;
    const fac = new Float64Array(M);
    const facD = new Float64Array(M);
    for (let r = 0; r < M; r++) {
      let overlap = 0;
      for (const t of roots) if (isRoot[(t + r) % M]) overlap++;
      const dens2 = (2 * w - overlap) / M;
      fac[r] = dens2 >= 1 ? -Infinity : Math.log(1 - dens2) + base;
      // diagonal-only: overlap = ω when M | r (r ≡ 0), else the mean off-diagonal value ω²/M
      const ovD = r === 0 ? w : (w * w - w) / (M - 1) || 0;
      const d2 = (2 * w - ovD) / M;
      facD[r] = d2 >= 1 ? -Infinity : Math.log(1 - d2) + base;
    }
    void dens1;
    for (let h = 1; h <= H; h++) {
      logS[h - 1] += fac[h % M];
      logD[h - 1] += facD[h % M];
    }
  }
  const C2 = C * C;
  const full: number[] = [],
    diag: number[] = [];
  let sf = 0,
    sd = 0,
    ci = 0;
  for (let h = 1; h <= H; h++) {
    sf += Math.exp(logS[h - 1]) - C2;
    sd += Math.exp(logD[h - 1]) - C2;
    if (h === CHECK[ci]) {
      full.push(sf);
      diag.push(sd);
      ci++;
    }
  }
  return { full, diag };
}

interface Rec {
  family: string;
  d: number;
  poly: string;
  C: number;
  full: number[];
  diag: number[];
  slope: number; // dΣ/d ln H over [1e4, 1e5]
  slopePrev: number; // over [1e3, 1e4]
  slopeDiag: number;
}

const recs: Rec[] = [];
const named: [string, IntPoly][] = [
  ["t^2+t+41", { num: [41n, 1n, 1n], den: 1n, degree: 2 }],
  ["4t^2-2t+1", { num: [1n, -2n, 4n], den: 1n, degree: 2 }],
  ["4t^2+3t+17", { num: [17n, 3n, 4n], den: 1n, degree: 2 }],
  ["4t^2+30t+7", { num: [7n, 30n, 4n], den: 1n, degree: 2 }],
  ["t^2+1", { num: [1n, 0n, 1n], den: 1n, degree: 2 }],
  ["t^3+2", { num: [2n, 0n, 0n, 1n], den: 1n, degree: 3 }],
];
function add(family: string, d: number, name: string, poly: IntPoly) {
  const bh = batemanHorn(poly, P);
  if (bh.fixedDivisor !== null || isCertainlyReducible(poly, 0)) return;
  const { full, diag } = sums(poly, bh.C);
  const n = CHECK.length;
  const slope = (full[n - 1] - full[n - 3]) / Math.log(10);
  const slopePrev = (full[n - 3] - full[n - 5]) / Math.log(10);
  const slopeDiag = (diag[n - 1] - diag[n - 3]) / Math.log(10);
  recs.push({ family, d, poly: name, C: bh.C, full, diag, slope, slopePrev, slopeDiag });
  log(`${family.padEnd(7)} d=${d} C=${f3(bh.C)} Σ(1e3)=${f3(full[2], 2)} Σ(1e4)=${f3(full[4], 2)} Σ(1e5)=${f3(full[6], 2)} slope=${f3(slope)} slope/C²=${f3(slope / (bh.C * bh.C))} slope/C=${f3(slope / bh.C)} diag=${f3(slopeDiag)} ${name}`);
}

const t0 = performance.now();
for (const [name, poly] of named) add("named", poly.degree, name, poly);
// linear
for (let i = 0; i < 12; i++) {
  const q = randInt(2, 300);
  const a = randInt(1, q - 1);
  let g = q,
    h = a;
  while (h) [g, h] = [h, g % h];
  if (g !== 1) continue;
  add("linear", 1, `${a}+${q}t`, { num: [BigInt(a), BigInt(q)], den: 1n, degree: 1 });
}
for (const d of [2, 3, 4]) {
  const dirs = directions(d, 2);
  let made = 0,
    tries = 0;
  while (made < 16 && tries < 400) {
    tries++;
    const b = Array.from({ length: d }, () => randInt(-8, 8));
    const v = dirs[randInt(0, dirs.length - 1)];
    const r = rayPolynomial(b, v, d);
    if (!r) continue;
    const before = recs.length;
    add("spiral", d, `ray b=(${b}) v=(${Array.from(v)})`, r.poly);
    if (recs.length > before) made++;
  }
  made = 0;
  tries = 0;
  while (made < 16 && tries < 400) {
    tries++;
    const num: bigint[] = [];
    for (let i = 0; i < d; i++) num.push(BigInt(randInt(-60, 60)));
    num.push(BigInt(randInt(1, 8)));
    const poly: IntPoly = { num, den: 1n, degree: d };
    let ok = true;
    for (let t = 0; t <= 40; t++) if (evalPoly(poly, BigInt(t)) < 2n) ok = false;
    if (!ok) continue;
    const before = recs.length;
    add("random", d, num.map((c, i) => `${c}t^${i}`).join("+"), poly);
    if (recs.length > before) made++;
  }
}

mkdirSync("research/paper-I/data", { recursive: true });
writeFileSync("research/experiments/sumS.json", JSON.stringify({ H, P, CHECK, recs }, null, 1));
const header = "C d slope slopeC2 slopeC slopePrevC2 slopeDiagC2 fam\n";
const famCode: Record<string, number> = { linear: 0, spiral: 1, random: 2, named: 3 };
writeFileSync(
  "research/paper-I/data/sumS.dat",
  header + recs.map((r) => `${f3(r.C, 4)} ${r.d} ${f3(r.slope, 4)} ${f3(r.slope / (r.C * r.C), 4)} ${f3(r.slope / r.C, 4)} ${f3(r.slopePrev / (r.C * r.C), 4)} ${f3(r.slopeDiag / (r.C * r.C), 4)} ${famCode[r.family]}`).join("\n") + "\n",
);
// summary
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);
const sd = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
for (const fam of ["linear", "spiral", "random", "named"]) {
  for (const d of [1, 2, 3, 4]) {
    const rs = recs.filter((r) => r.family === fam && r.d === d);
    if (!rs.length) continue;
    const s2 = rs.map((r) => r.slope / (r.C * r.C)),
      s1 = rs.map((r) => r.slope / r.C),
      sD = rs.map((r) => r.slopeDiag / (r.C * r.C));
    log(`${fam} d=${d}: n=${rs.length} slope/C² = ${f3(mean(s2))} ± ${f3(sd(s2))}   slope/C = ${f3(mean(s1))} ± ${f3(sd(s1))}   diag-only slope/C² = ${f3(mean(sD))} ± ${f3(sd(sD))}`);
  }
}
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s`);
