/**
 * freq-set-test.ts — joint-fit test of a predicted frequency set against a rival set and random sets (14 Sep 2026).
 *   [DEG=2] [COL=3] [NRAND=300] [SEED=1] npx tsx research/explore/freq-set-test.ts <tag> "<setA>" "<setB>" fmin fmax
 * reads research/paper-IV/data/piece-<tag>-grid.dat (column COL: 3 = P/sqrtY), detrends (mean + polynomial of degree
 * DEG in log Y), and reports the variance explained (R^2) by the joint least-squares fit of cos/sin at the frequencies
 * of set A, of set B, and the percentile of A among NRAND random sets of the same size drawn uniformly from [fmin, fmax].
 * Same statistic as paper IV's Table tab:fits (piece-maass.ts), but with arbitrary sets.
 */
import { readFileSync } from "node:fs";
const [tag, setA, setB, fminS, fmaxS] = process.argv.slice(2);
const A = setA.split(",").map(Number), B = setB.split(",").map(Number), fmin = Number(fminS), fmax = Number(fmaxS);
const DEG = Number(process.env.DEG ?? 2), COL = Number(process.env.COL ?? 3), NRAND = Number(process.env.NRAND ?? 300);
let seed = Number(process.env.SEED ?? 1); const rnd = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.trim().split(/\s+/).map(Number));
const x = rows.map((r) => r[0]), M = x.length; let y = rows.map((r) => r[COL]);
const mx = x.reduce((a, b) => a + b, 0) / M;
// polynomial detrend of degree DEG
{ const n = DEG + 1; const Xm = x.map((xx) => Array.from({ length: n }, (_, k) => ((xx - mx) / 5) ** k)); const G = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0);
  for (let i = 0; i < M; i++) for (let p = 0; p < n; p++) { g[p] += Xm[i][p] * y[i]; for (let q = 0; q < n; q++) G[p][q] += Xm[i][p] * Xm[i][q]; }
  for (let p = 0; p < n; p++) for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = 0; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; }
  const c = g.map((v, p) => v / G[p][p]); y = y.map((v, i) => v - Xm[i].reduce((a, b, p) => a + b * c[p], 0)); }
const tot = y.reduce((a, b) => a + b * b, 0);
function r2(freqs: number[]): number { // modified Gram–Schmidt on the cos/sin columns; R^2 = sum (q_k . y)^2 / tot
  const cols: number[][] = []; for (const t of freqs) { cols.push(x.map((v) => Math.cos(t * v))); cols.push(x.map((v) => Math.sin(t * v))); }
  const Q: number[][] = []; let expl = 0;
  for (const c0 of cols) { const c = c0.slice(); const n0 = Math.sqrt(c.reduce((a, b) => a + b * b, 0));
    for (const q of Q) { let d = 0; for (let i = 0; i < M; i++) d += q[i] * c[i]; for (let i = 0; i < M; i++) c[i] -= d * q[i]; }
    const n1 = Math.sqrt(c.reduce((a, b) => a + b * b, 0)); if (n1 < 1e-6 * n0) continue; // dependent column: skip
    for (let i = 0; i < M; i++) c[i] /= n1; Q.push(c); let d = 0; for (let i = 0; i < M; i++) d += c[i] * y[i]; expl += d * d; }
  return expl / tot;
}
const rA = r2(A), rB = r2(B); const rand: number[] = [];
for (let k = 0; k < NRAND; k++) { const s: number[] = []; while (s.length < A.length) { const t = fmin + (fmax - fmin) * rnd(); if (s.every((u) => Math.abs(u - t) > 0.4)) s.push(t); } rand.push(r2(s)); }
rand.sort((a, b) => a - b); const pct = (v: number) => (100 * rand.filter((r) => r < v).length / NRAND).toFixed(1);
console.log(`${tag}: R^2(A)=${rA.toFixed(4)} [${pct(rA)}th pct]  R^2(B)=${rB.toFixed(4)} [${pct(rB)}th pct]  random median ${rand[Math.floor(NRAND / 2)].toFixed(4)}, 95th ${rand[Math.floor(0.95 * NRAND)].toFixed(4)}, max ${rand[NRAND - 1].toFixed(4)}  (DEG=${DEG}, ${A.length} freqs in [${fmin},${fmax}])`);
