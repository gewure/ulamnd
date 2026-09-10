/**
 * piece-stability.ts — fit P_u(Y)/sqrt(Y) on the even SL_2(Z) lines separately on the two halves of the log-Y range and
 * report amplitude and phase per line; a real spectral line has consistent amplitude and phase in both halves.
 *   npx tsx research/paper-IV/scripts/piece-stability.ts t2m2-u1
 */
import { readFileSync } from "node:fs";
const tag = process.argv[2] ?? "u2";
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const even = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353];
function fit(sel: number[][]) {
  const x = sel.map((r) => r[0]), y0 = sel.map((r) => r[3]); const M = x.length;
  const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
  const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
  const y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx));
  const A = x.map((lx) => even.flatMap((t) => [Math.cos(t * lx), Math.sin(t * lx)]));
  const n = A[0].length; const G = Array.from({ length: n }, () => new Array(n).fill(0)); const g = new Array(n).fill(0);
  for (let i = 0; i < M; i++) for (let p = 0; p < n; p++) { g[p] += A[i][p] * y[i]; for (let q = 0; q < n; q++) G[p][q] += A[i][p] * A[i][q]; }
  for (let p = 0; p < n; p++) { let piv = p; for (let r = p + 1; r < n; r++) if (Math.abs(G[r][p]) > Math.abs(G[piv][p])) piv = r; [G[p], G[piv]] = [G[piv], G[p]]; [g[p], g[piv]] = [g[piv], g[p]]; for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = p; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; } }
  const c = g.map((v, p) => v / G[p][p]);
  return even.map((t, j) => ({ t, amp: Math.hypot(c[2 * j], c[2 * j + 1]), phase: Math.atan2(c[2 * j + 1], c[2 * j]) }));
}
const half = Math.floor(rows.length / 2);
const f1 = fit(rows.slice(0, half)), f2 = fit(rows.slice(half)), fa = fit(rows);
console.log(`${tag}: line | amp (first half, second half, all) | phase (first, second, all) [rad]`);
for (let j = 0; j < even.length; j++) console.log(`  ${even[j].toFixed(2)} | ${f1[j].amp.toFixed(4)} ${f2[j].amp.toFixed(4)} ${fa[j].amp.toFixed(4)} | ${f1[j].phase.toFixed(2)} ${f2[j].phase.toFixed(2)} ${fa[j].phase.toFixed(2)}`);
