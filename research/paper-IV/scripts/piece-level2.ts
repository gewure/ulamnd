/** piece-level2.ts — does a grid file carry the LEVEL-2 even Maass newform frequencies on top of the level-1 even ones?
 *    LEVEL=2|3|5 npx tsx research/paper-IV/scripts/piece-level2.ts <tag> [nExtra=8]
 *  Fits P/sqrtY (detrended) on the six smallest level-1 even parameters, then regresses the RESIDUAL on the nExtra smallest
 *  level-2 even newform parameters (LMFDB, level 2: 8.9229 10.9204 12.0930 14.6850 15.3142 16.4041 16.9403 17.8780 ...), on
 *  the level-2 odd ones, and on 400 random sets of nExtra frequencies in [4, 25]; reports R^2 of the residual and percentiles.
 *  Prediction of repair (ii) of Remark rem:coprime: "excluded" and "coprime" carry level-2 lines, "all" does not. */
import { readFileSync } from "node:fs";
const tag = process.argv[2], nExtra = Number(process.argv[3] ?? 8);
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const x = rows.map((r) => r[0]), y0 = rows.map((r) => r[3]), M = x.length;
const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
let y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx));
// optional: remove a quadratic and cubic trend in log Y as well (QUAD=1), and drop all parameters below FMIN
if (process.env.QUAD === "1") { const X = x.map((xx) => [1, xx - mx, (xx - mx) ** 2, (xx - mx) ** 3]); const n = 4; const G = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0);
  for (let i = 0; i < M; i++) for (let p = 0; p < n; p++) { g[p] += X[i][p] * y[i]; for (let q = 0; q < n; q++) G[p][q] += X[i][p] * X[i][q]; }
  for (let p = 0; p < n; p++) { for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = 0; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; } }
  const c = g.map((v, p) => v / G[p][p]); y = y.map((v, i) => v - X[i].reduce((a, b, p) => a + b * c[p], 0)); }
const FMIN = Number(process.env.FMIN ?? 0);
const lvl1even = [13.779751, 17.738563, 19.423481, 21.315796, 22.785908, 24.112353];
const LEVEL = Number(process.env.LEVEL ?? 2); // newform parameters from LMFDB (fetched 13 Sep 2026), levels 2, 3 and 5 (LMFDB has no level 4 or 9 Maass forms)
const lists: Record<number, { even: number[]; odd: number[] }> = {
  2: { even: [8.9229, 10.9204, 12.0930, 14.6850, 15.3142, 16.4041, 16.9403, 17.8780, 19.1254, 20.1400, 20.5476, 21.6300, 22.0890, 22.7582],
       odd: [5.4173, 7.2209, 8.2737, 10.7127, 11.3177, 12.8220, 13.3102, 14.0972, 15.2740, 15.4429, 17.3193, 17.4931, 18.4371, 18.8501] },
  3: { even: [5.0987, 8.0389, 8.7783, 9.7437, 10.2311, 11.3464, 11.8900, 12.5805, 13.1351, 13.9932, 14.6262, 15.1595, 15.7049, 15.7995],
       odd: [4.3881, 6.1206, 6.7574, 7.7581, 8.1930, 9.2924, 10.5076, 10.9135, 11.3659, 11.7145, 12.6279, 13.3786, 13.3955, 13.5079] },
  5: { even: [4.1324, 5.4362, 6.0540, 6.8235, 7.9865, 8.2947, 8.4800, 9.2773, 9.3974, 9.6463, 10.2463, 10.6312, 11.1814, 11.2834],
       odd: [3.0284, 4.1032, 4.8972, 5.7058, 6.3512, 6.4585, 7.3255, 7.5853, 8.0185, 8.2261, 8.8179, 8.8207, 9.8334, 10.0458] },
};
const lvl2even = lists[LEVEL].even.filter((t) => t >= FMIN), lvl2odd = lists[LEVEL].odd.filter((t) => t >= FMIN);
function fit(freqs: number[], target: number[]): { r2: number; resid: number[] } {
  const n = 2 * freqs.length; const A = x.map((xx) => freqs.flatMap((t) => [Math.cos(t * xx), Math.sin(t * xx)]));
  const G = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0);
  for (let i = 0; i < M; i++) for (let p = 0; p < n; p++) { g[p] += A[i][p] * target[i]; for (let q = 0; q < n; q++) G[p][q] += A[i][p] * A[i][q]; }
  for (let p = 0; p < n; p++) { let piv = p; for (let r = p + 1; r < n; r++) if (Math.abs(G[r][p]) > Math.abs(G[piv][p])) piv = r; [G[p], G[piv]] = [G[piv], G[p]]; [g[p], g[piv]] = [g[piv], g[p]];
    for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = p; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; } }
  const c = g.map((v, p) => v / G[p][p]); const resid = target.map((v, i) => v - A[i].reduce((s, a, p) => s + a * c[p], 0));
  const tot = target.reduce((s, v) => s + v * v, 0), rs = resid.reduce((s, v) => s + v * v, 0); return { r2: 1 - rs / tot, resid };
}
const f1 = fit(lvl1even, y); console.log(`${tag}: level-1 even (6) explains R^2 = ${f1.r2.toFixed(3)} of the detrended P/sqrtY`);
const resid = f1.resid;
const r2e = fit(lvl2even.slice(0, nExtra), resid).r2, r2o = fit(lvl2odd.slice(0, nExtra), resid).r2;
let seed = 12345; const rnd = () => { seed = (seed * 1103515245 + 12345) & 0x7fffffff; return seed / 0x7fffffff; };
const rand: number[] = []; for (let k = 0; k < 400; k++) rand.push(fit(Array.from({ length: nExtra }, () => Math.max(4, FMIN) + (25 - Math.max(4, FMIN)) * rnd()), resid).r2);
rand.sort((a, b) => a - b); const pct = (v: number) => (100 * rand.filter((r) => r < v).length / rand.length).toFixed(1);
console.log(`  residual on level-${LEVEL} EVEN newforms (${nExtra}): R^2 = ${r2e.toFixed(3)}  -> percentile ${pct(r2e)} among random ${nExtra}-sets (median ${rand[200].toFixed(3)}, 95% ${rand[380].toFixed(3)}, max ${rand[399].toFixed(3)})`);
console.log(`  residual on level-${LEVEL} ODD  newforms (${nExtra}): R^2 = ${r2o.toFixed(3)}  -> percentile ${pct(r2o)}`);
