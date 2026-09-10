/**
 * piece-maass.ts — regression test of route R's prediction for f = t^2+1 (D = -4, Heegner point i):
 *   P_u(Y)/sqrt(Y) ≈ sum_j [a_j cos(t_j log Y) + b_j sin(t_j log Y)]  over the EVEN Maass forms of SL_2(Z)
 * (Katok–Sarnak: odd forms vanish at i and cannot appear). Compares the variance explained by the even set, the odd
 * set, and random frequency sets of the same size; also an F-type statistic per frequency.
 *   npx tsx research/paper-IV/scripts/piece-maass.ts 2
 */
import { readFileSync } from "node:fs";
const u = process.argv[2] ?? "2";
const rows = readFileSync(`research/paper-IV/data/piece-${/^\d+$/.test(u) ? "u" + u : u}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const x = rows.map((r) => r[0]), y0 = rows.map((r) => r[3]); const M = x.length;
// detrend (mean + linear in log Y)
const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
const y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx));
const tot = y.reduce((a, b) => a + b * b, 0);
// SL_2(Z) Laplace parameters (Booker–Strömbergsson–Venkatesh / LMFDB): even and odd
const even = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353];
const odd = [9.533695, 12.173008, 14.358510, 16.138073, 16.644259, 18.180918, 19.484714, 20.106694, 21.479061, 22.194675];
function solve(A: number[][], b: number[]): number[] { // least squares via normal equations (small)
  const n = A[0].length; const G = Array.from({ length: n }, () => new Array(n).fill(0)); const g = new Array(n).fill(0);
  for (let i = 0; i < A.length; i++) for (let p = 0; p < n; p++) { g[p] += A[i][p] * b[i]; for (let q = 0; q < n; q++) G[p][q] += A[i][p] * A[i][q]; }
  for (let p = 0; p < n; p++) { // gaussian elimination
    let piv = p; for (let r = p + 1; r < n; r++) if (Math.abs(G[r][p]) > Math.abs(G[piv][p])) piv = r;
    [G[p], G[piv]] = [G[piv], G[p]]; [g[p], g[piv]] = [g[piv], g[p]];
    for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = p; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; }
  }
  return g.map((v, p) => v / G[p][p]);
}
function r2(freqs: number[]): number {
  const A = x.map((lx) => freqs.flatMap((t) => [Math.cos(t * lx), Math.sin(t * lx)]));
  const c = solve(A, y); let rss = 0;
  for (let i = 0; i < M; i++) { let f = 0; for (let p = 0; p < c.length; p++) f += c[p] * A[i][p]; rss += (y[i] - f) ** 2; }
  return 1 - rss / tot;
}
const r2even = r2(even), r2odd = r2(odd.slice(0, 6));
let seed = 3; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const rs: number[] = []; for (let k = 0; k < 300; k++) rs.push(r2(Array.from({ length: 6 }, () => 12 + 13 * rnd())));
rs.sort((a, b) => a - b);
const pct = (v: number) => (rs.filter((r) => r < v).length / rs.length * 100).toFixed(1);
console.log(`u=${u}: R^2 even set (6 lines) = ${r2even.toFixed(4)}  [percentile among random 6-sets: ${pct(r2even)}%]`);
console.log(`      R^2 odd set (6 lines)  = ${r2odd.toFixed(4)}  [percentile: ${pct(r2odd)}%]`);
console.log(`      random 6-sets: median ${rs[150].toFixed(4)}, 95% ${rs[285].toFixed(4)}, max ${rs[299].toFixed(4)}`);
// per-line: R^2 of a single frequency vs the distribution over random single frequencies
const single = (t: number) => r2([t]);
const rs1: number[] = []; for (let k = 0; k < 500; k++) rs1.push(single(9 + 17 * rnd())); rs1.sort((a, b) => a - b);
const p1 = (v: number) => (rs1.filter((r) => r < v).length / rs1.length * 100).toFixed(0);
console.log(`      even lines, single-frequency R^2 and percentile: ${even.map((t) => `${t.toFixed(2)}:${single(t).toExponential(2)}(${p1(single(t))}%)`).join(" ")}`);
console.log(`      odd lines: ${odd.slice(0, 6).map((t) => `${t.toFixed(2)}:${single(t).toExponential(2)}(${p1(single(t))}%)`).join(" ")}`);
