/** piece-periodogram.ts — single-frequency R^2 scan of P(Y)/sqrt(Y) (detrended: mean + linear in log Y) on a grid file.
 *    [DEG=3] [TAPER=1] npx tsx research/paper-IV/scripts/piece-periodogram.ts <tag> [tmin tmax step]   reads data/piece-<tag>-grid.dat
 *  Prints the top local maxima; compare with the SL_2(Z) parameters (even 13.78, 17.74, 19.42, 21.32, 22.79, 24.11; odd 9.53, 12.17, 14.36, ...)
 *  and with the parameters of the level-N newforms for N | rad(2D). */
import { readFileSync } from "node:fs";
const tag = process.argv[2]; const tmin = Number(process.argv[3] ?? 4), tmax = Number(process.argv[4] ?? 30), step = Number(process.argv[5] ?? 0.005);
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const x = rows.map((r) => r[0]), y0 = rows.map((r) => r[3]), M = x.length;
const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
let y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx));
// DEG=k removes a polynomial trend of degree k in log Y (least squares) instead of the linear one; TAPER=1 applies a Hann window
// before the scan (reduces leakage of slow components into the line frequencies; the R^2 is then relative to the tapered series)
const DEG = Number(process.env.DEG ?? 1);
if (DEG > 1) { const n = DEG + 1; const Xm = x.map((xx) => Array.from({ length: n }, (_, k) => ((xx - mx) / 5) ** k)); const G = Array.from({ length: n }, () => new Array(n).fill(0)), g = new Array(n).fill(0);
  for (let i = 0; i < M; i++) for (let p = 0; p < n; p++) { g[p] += Xm[i][p] * y[i]; for (let q = 0; q < n; q++) G[p][q] += Xm[i][p] * Xm[i][q]; }
  for (let p = 0; p < n; p++) for (let r = 0; r < n; r++) if (r !== p) { const f = G[r][p] / G[p][p]; for (let q = 0; q < n; q++) G[r][q] -= f * G[p][q]; g[r] -= f * g[p]; }
  const c = g.map((v, p) => v / G[p][p]); y = y.map((v, i) => v - Xm[i].reduce((a, b, p) => a + b * c[p], 0)); }
if (process.env.TAPER === "1") y = y.map((v, i) => v * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (M - 1))));
const tot = y.reduce((a, b) => a + b * b, 0);
const r2 = (t: number) => { let cc = 0, ss = 0, cs = 0, cy = 0, sy = 0; for (let i = 0; i < M; i++) { const c = Math.cos(t * x[i]), s = Math.sin(t * x[i]); cc += c * c; ss += s * s; cs += c * s; cy += c * y[i]; sy += s * y[i]; }
  const det = cc * ss - cs * cs; const a = (cy * ss - sy * cs) / det, b = (sy * cc - cy * cs) / det; return (a * cy + b * sy) / tot; };
const ts: number[] = [], vs: number[] = []; for (let t = tmin; t <= tmax; t += step) { ts.push(t); vs.push(r2(t)); }
const peaks: [number, number][] = []; for (let i = 1; i < vs.length - 1; i++) if (vs[i] > vs[i - 1] && vs[i] >= vs[i + 1]) peaks.push([ts[i], vs[i]]);
peaks.sort((a, b) => b[1] - a[1]);
console.log(`${tag}: top peaks of single-frequency R^2 (frequency, R^2):`); console.log(peaks.slice(0, 12).map(([t, v]) => `  ${t.toFixed(3)}  ${v.toFixed(4)}`).join("\n"));
