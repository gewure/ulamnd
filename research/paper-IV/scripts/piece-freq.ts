/**
 * piece-freq.ts — fit P(Y)/sqrt(Y) at frequencies MULT * t_j, for the even and the odd SL_2(Z) spectrum, against
 * random frequency sets drawn from a band around the tested frequencies. Used to decide between the competing
 * predictions omega = t_j and omega = 2 t_j (the latter is what Goldfeld-Sarnak's variable gives).
 *   MULT=2 npx tsx research/paper-IV/scripts/piece-freq.ts A-Dm4
 */
import { readFileSync } from "node:fs";
const tag = process.argv[2] ?? "A-Dm4";
const MULT = Number(process.env.MULT ?? 1);
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const x = rows.map((r) => r[0]), y0 = rows.map((r) => r[3]); const M = x.length;
const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
const y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx));
const tot = y.reduce((a, b) => a + b * b, 0);
const even = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353];
const odd = [9.533695, 12.173008, 14.358510, 16.138073, 16.644259, 18.180918];
function solve(A: number[][], b: number[]): number[] {
  const n = A[0].length; const G = Array.from({ length: n }, () => new Array(n).fill(0)); const g = new Array(n).fill(0);
  for (let i = 0; i < A.length; i++) for (let p = 0; p < n; p++) { g[p] += A[i][p] * b[i]; for (let q = 0; q < n; q++) G[p][q] += A[i][p] * A[i][q]; }
  for (let p = 0; p < n; p++) { let piv = p; for (let r = p + 1; r < n; r++) if (Math.abs(G[r][p]) > Math.abs(G[piv][p])) piv = r; [G[p], G[piv]] = [G[piv], G[p]]; [g[p], g[piv]] = [g[piv], g[p]]; for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = p; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; } }
  return g.map((v, p) => v / G[p][p]);
}
function r2(freqs: number[]): number {
  const A = x.map((lx) => freqs.flatMap((t) => [Math.cos(t * lx), Math.sin(t * lx)]));
  const c = solve(A, y); let rss = 0;
  for (let i = 0; i < M; i++) { let f = 0; for (let p = 0; p < c.length; p++) f += c[p] * A[i][p]; rss += (y[i] - f) ** 2; }
  return 1 - rss / tot;
}
const E = even.map((t) => MULT * t), O = odd.map((t) => MULT * t);
const lo = Math.min(...E, ...O) * 0.85, hi = Math.max(...E, ...O) * 1.15;
let seed = 5; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const rs: number[] = []; for (let k = 0; k < 300; k++) rs.push(r2(Array.from({ length: 6 }, () => lo + (hi - lo) * rnd())));
rs.sort((a, b) => a - b);
const pct = (v: number) => (rs.filter((r) => r < v).length / rs.length * 100).toFixed(1);
const re = r2(E), ro = r2(O);
console.log(`${tag}  MULT=${MULT}  band [${lo.toFixed(1)},${hi.toFixed(1)}]  R2 even=${re.toFixed(4)} (${pct(re)}%)  R2 odd=${ro.toFixed(4)} (${pct(ro)}%)  random median ${rs[150].toFixed(4)} max ${rs[299].toFixed(4)}`);
