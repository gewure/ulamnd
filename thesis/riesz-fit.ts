/**
 * Matched-filter test on the residual of the diagonal Riesz mean (thesis/riesz-diag.ts): fit
 * Σ_i [A_i cos(ω_i u) + B_i sin(ω_i u)] with ω_i = γ_i/2 for the first zeros of L(s,χ_{-4}) and ζ, and
 * compare the explained variance with that of control frequency sets (all frequencies shifted by δ).
 *   npx tsx thesis/riesz-fit.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
const rows = readFileSync("paper/data/rieszd-residual.dat", "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const u = rows.map((r) => r[0]), y = rows.map((r) => r[2]);
const R = JSON.parse(readFileSync("thesis/rieszd.json", "utf8")) as { Lzeros: number[]; Zzeros: number[] };
function lstsq(A: number[][], b: number[]) {
  const n = A[0].length; const M: number[][] = Array.from({ length: n }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < A.length; r++) for (let i = 0; i < n; i++) { M[i][n] += A[r][i] * b[r]; for (let k = 0; k < n; k++) M[i][k] += A[r][i] * A[r][k]; }
  for (let i = 0; i < n; i++) { let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r; [M[i], M[p]] = [M[p], M[i]]; for (let r = i + 1; r < n; r++) { const f = M[r][i] / M[i][i]; for (let k = i; k <= n; k++) M[r][k] -= f * M[i][k]; } }
  const x = new Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let k = i + 1; k < n; k++) s -= M[i][k] * x[k]; x[i] = s / M[i][i]; } return x;
}
const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
const ym = mean(y); const tot = y.reduce((a, v) => a + (v - ym) ** 2, 0);
function explained(freqs: number[]): number {
  const A = u.map((uu) => { const c: number[] = [1]; for (const w of freqs) { c.push(Math.cos(w * uu), Math.sin(w * uu)); } return c; });
  const cf = lstsq(A, y);
  const res = y.map((v, i) => v - A[i].reduce((s, a, k) => s + a * cf[k], 0));
  return 1 - res.reduce((a, v) => a + v * v, 0) / tot;
}
const nL = 6, nZ = 4;
const predL = R.Lzeros.slice(0, nL).map((g) => g / 2), predZ = R.Zzeros.slice(0, nZ).map((g) => g / 2);
const pred = [...predL, ...predZ];
const r2pred = explained(pred);
const r2L = explained(predL), r2Z = explained(predZ);
// controls: shift all frequencies by δ in a grid avoiding the predicted set
const controls: { delta: number; r2: number }[] = [];
for (let d = -0.6; d <= 0.6001; d += 0.05) { if (Math.abs(d) < 0.1) continue; controls.push({ delta: +d.toFixed(2), r2: explained(pred.map((w) => w + d)) }); }
// random frequency sets of the same size in the same band
let seed = 3; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const rand: number[] = []; for (let k = 0; k < 300; k++) rand.push(explained(pred.map(() => 2.5 + rnd() * 10)));
rand.sort((a, b) => a - b);
const pv = rand.filter((r) => r >= r2pred).length / rand.length;
const out = { nL, nZ, pred, r2pred, r2L, r2Z, controls, randomMean: mean(rand), randomP95: rand[Math.floor(0.95 * rand.length)], randomMax: rand[rand.length - 1], pValue: pv };
console.log(JSON.stringify(out, null, 1));
writeFileSync("thesis/riesz-fit.json", JSON.stringify(out, null, 1));
