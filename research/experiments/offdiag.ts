/**
 * Isolating the off-diagonal part of Σ_{h≤H}(S_f(h) − C²) for quadratics.
 *
 *   npx tsx thesis/offdiag.ts
 *
 * Exact identity (paper, Section 3):  Σ_{h≤H}(S_f(h) − C²) = C² [ −Σ_d a(d){H/d} + Off(H) ],
 * where a(d) = ∏_{p|d} pω(p)/(p−ω(p))² · ∏_{p∤d} (1 − ω(p)²/(p−ω(p))²) for squarefree d (0 otherwise),
 * and Off(H) collects the pairs of distinct roots. For quadratics ω(p) = 1 + (D/p) is a Legendre
 * symbol, so the diagonal sum can be computed exactly to very large d, and Off(H) follows by
 * subtraction from the directly computed left-hand side. The conjecture is equivalent to Off(H) = o(log H);
 * the heuristic predicts Off(H) = O(1).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { batemanHorn, pairSingularSeries, type IntPoly, isCertainlyReducible, evalPoly } from "../lib/poly";
import { smallPrimes } from "../lib/sieve";

let seed = 99;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const randInt = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));
const log = (s: string) => process.stdout.write(s + "\n");
const f3 = (x: number, k = 3) => (Number.isFinite(x) ? x.toFixed(k) : "nan");

const H = 100000;
const P_S = 60000; // truncation of the pair series
const DMAX = 4_000_000; // range of d in the diagonal sum (tail ≈ H/(C·DMAX))
const CHECK = [100, 316, 1000, 3162, 10000, 31623, 100000];

/** number of roots of f mod p by brute force (p small) */
function omegaBrute(f: IntPoly, p: number): number {
  let c = 0;
  for (let t = 0; t < p; t++) {
    let acc = 0n;
    for (let i = f.num.length - 1; i >= 0; i--) acc = (acc * BigInt(t) + f.num[i]) % BigInt(p);
    if (acc === 0n) c++;
  }
  return c;
}
/** Jacobi symbol (a/n), n odd positive */
function jacobi(a: number, n: number): number {
  a = ((a % n) + n) % n;
  let r = 1;
  while (a !== 0) {
    while (a % 2 === 0) {
      a /= 2;
      const m = n % 8;
      if (m === 3 || m === 5) r = -r;
    }
    [a, n] = [n, a];
    if (a % 4 === 3 && n % 4 === 3) r = -r;
    a %= n;
  }
  return n === 1 ? r : 0;
}

/** ω(p) for a quadratic a t² + b t + c with integer coefficients */
function omegaQuadratic(f: IntPoly, p: number, disc: bigint, lead: bigint): number {
  if (p < 50 || lead % BigInt(p) === 0n || disc % BigInt(p) === 0n) return omegaBrute(f, p);
  const d = Number(((disc % BigInt(p)) + BigInt(p)) % BigInt(p));
  return 1 + jacobi(d, p);
}

function diagonalSums(f: IntPoly): { diag: number[]; A0: number } {
  const primes = smallPrimes(DMAX);
  const [c, b, a] = [f.num[0], f.num[1] ?? 0n, f.num[2] ?? 0n];
  const disc = b * b - 4n * a * c;
  // local factors
  const omega = new Int8Array(DMAX + 1);
  let A0 = 1; // ∏_p P_p over p ≤ DMAX (the tail beyond DMAX is 1 + O(1/DMAX))
  const zeroPrimes: number[] = [];
  for (const p of primes) {
    const w = omegaQuadratic(f, p, disc, a);
    omega[p] = w;
    const Pp = 1 - (w * w) / ((p - w) * (p - w));
    if (Math.abs(Pp) < 1e-15) zeroPrimes.push(p);
    else A0 *= Pp;
  }
  // multiplicative a(d) on squarefree d:  a(d) = A0' · ∏_{p|d} [pω/(p−ω)² / P_p], where primes with
  // P_p = 0 must divide d (else a(d) = 0) and contribute pω/(p−ω)² without division.
  const ad = new Float64Array(DMAX + 1);
  const spf = new Int32Array(DMAX + 1);
  for (const p of primes) for (let m = p; m <= DMAX; m += p) if (!spf[m]) spf[m] = p;
  ad[1] = A0;
  for (let d = 2; d <= DMAX; d++) {
    const p = spf[d];
    const rest = d / p;
    if (rest % p === 0) {
      ad[d] = 0; // not squarefree
      continue;
    }
    const w = omega[p];
    const Pp = 1 - (w * w) / ((p - w) * (p - w));
    const fac = (p * w) / ((p - w) * (p - w));
    ad[d] = Math.abs(Pp) < 1e-15 ? ad[rest] * fac : (ad[rest] * fac) / Pp;
  }
  if (zeroPrimes.length) {
    // a(d) = 0 unless every zero-prime divides d
    for (let d = 1; d <= DMAX; d++) for (const z of zeroPrimes) if (d % z !== 0) ad[d] = 0;
  }
  // diagonal sums  Σ_d a(d){H/d}  at the checkpoints
  const diag: number[] = [];
  for (const Hc of CHECK) {
    let s = 0;
    for (let d = 2; d <= DMAX; d++) if (ad[d] !== 0) s += ad[d] * ((Hc / d) % 1);
    diag.push(s);
  }
  return { diag, A0 };
}

interface Rec {
  poly: string;
  C: number;
  sums: number[]; // Σ_{h≤H}(S_f − C²)/C²
  diag: number[]; // Σ_d a(d){H/d}
  off: number[]; // sums + diag  ( = Off(H) )
  ref: number[]; // (1/(2C)) log H
}
const recs: Rec[] = [];
function run(name: string, f: IntPoly) {
  const bh = batemanHorn(f, P_S);
  if (bh.fixedDivisor !== null || isCertainlyReducible(f, 0)) return;
  const C = bh.C;
  const S = pairSingularSeries(f, H, P_S);
  const sums: number[] = [];
  let acc = 0,
    ci = 0;
  for (let h = 1; h <= H; h++) {
    acc += S[h - 1] - C * C;
    if (h === CHECK[ci]) {
      sums.push(acc / (C * C));
      ci++;
    }
  }
  const { diag } = diagonalSums(f);
  const off = sums.map((s, i) => s + diag[i]);
  const ref = CHECK.map((Hc) => Math.log(Hc) / (2 * C));
  recs.push({ poly: name, C, sums, diag, off, ref });
  log(`${name.padEnd(22)} C=${f3(C)}  Σ/C²: ${sums.map((x) => f3(x, 2)).join(" ")} | diag: ${diag.map((x) => f3(x, 2)).join(" ")} | Off: ${off.map((x) => f3(x, 2)).join(" ")} | ½logH/C: ${ref.map((x) => f3(x, 2)).join(" ")}`);
}

const t0 = performance.now();
mkdirSync("research/paper-I/data", { recursive: true });
run("t^2+t+41", { num: [41n, 1n, 1n], den: 1n, degree: 2 });
run("4t^2-2t+1", { num: [1n, -2n, 4n], den: 1n, degree: 2 });
run("4t^2+3t+17", { num: [17n, 3n, 4n], den: 1n, degree: 2 });
run("4t^2+30t+7", { num: [7n, 30n, 4n], den: 1n, degree: 2 });
run("t^2+1", { num: [1n, 0n, 1n], den: 1n, degree: 2 });
run("2t^2+1", { num: [1n, 0n, 2n], den: 1n, degree: 2 });
run("t^2+t+1", { num: [1n, 1n, 1n], den: 1n, degree: 2 });
let made = 0;
while (made < 18) {
  const c = BigInt(randInt(-60, 60)),
    b = BigInt(randInt(-60, 60)),
    a = BigInt(randInt(1, 8));
  const f: IntPoly = { num: [c, b, a], den: 1n, degree: 2 };
  let ok = true;
  for (let t = 0; t <= 40; t++) if (evalPoly(f, BigInt(t)) < 2n) ok = false;
  if (!ok) continue;
  const before = recs.length;
  run(`${a}t^2${b >= 0n ? "+" : ""}${b}t${c >= 0n ? "+" : ""}${c}`, f);
  if (recs.length > before) made++;
}
writeFileSync("research/experiments/offdiag.json", JSON.stringify({ H, P_S, DMAX, CHECK, recs }, null, 1));
// data file: per checkpoint, Off(H) for each polynomial (columns) plus the two growing parts for the first polynomial
const lines = ["H " + recs.map((_, i) => `off${i}`).join(" ") + " " + recs.map((_, i) => `sum${i}`).join(" ") + " " + recs.map((_, i) => `diag${i}`).join(" ")];
CHECK.forEach((Hc, j) => lines.push(`${Hc} ${recs.map((r) => f3(r.off[j], 4)).join(" ")} ${recs.map((r) => f3(r.sums[j], 4)).join(" ")} ${recs.map((r) => f3(-r.diag[j], 4)).join(" ")}`));
writeFileSync("research/paper-I/data/offdiag.dat", lines.join("\n") + "\n");
// summary
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const last = recs.map((r) => r.off[CHECK.length - 1]);
const first = recs.map((r) => r.off[2]);
log(`Off(1e3): mean ${f3(mean(first))}, Off(1e5): mean ${f3(mean(last))}; max |Off(1e5)| = ${f3(Math.max(...last.map(Math.abs)))}; mean growth of diag part over [1e3,1e5] in units of (1/2C)logH: ${f3(mean(recs.map((r) => (r.diag[6] - r.diag[2]) / (r.ref[6] - r.ref[2]))))}`);
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s`);
