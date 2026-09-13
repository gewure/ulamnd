/** piece-periodogram.ts — single-frequency R^2 scan of P(Y)/sqrt(Y) (detrended: mean + linear in log Y) on a grid file.
 *    npx tsx research/paper-IV/scripts/piece-periodogram.ts <tag> [tmin tmax step]   reads data/piece-<tag>-grid.dat
 *  Prints the top local maxima; compare with the SL_2(Z) parameters (even 13.78, 17.74, 19.42, 21.32, 22.79, 24.11; odd 9.53, 12.17, 14.36, ...)
 *  and with the parameters of the level-N newforms for N | rad(2D). */
import { readFileSync } from "node:fs";
const tag = process.argv[2]; const tmin = Number(process.argv[3] ?? 4), tmax = Number(process.argv[4] ?? 30), step = Number(process.argv[5] ?? 0.005);
const rows = readFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const x = rows.map((r) => r[0]), y0 = rows.map((r) => r[3]), M = x.length;
const mx = x.reduce((a, b) => a + b, 0) / M, my = y0.reduce((a, b) => a + b, 0) / M;
const sxx = x.reduce((a, v) => a + (v - mx) ** 2, 0), sxy = x.reduce((a, v, i) => a + (v - mx) * (y0[i] - my), 0);
const y = y0.map((v, i) => v - my - (sxy / sxx) * (x[i] - mx)); const tot = y.reduce((a, b) => a + b * b, 0);
const r2 = (t: number) => { let cc = 0, ss = 0, cs = 0, cy = 0, sy = 0; for (let i = 0; i < M; i++) { const c = Math.cos(t * x[i]), s = Math.sin(t * x[i]); cc += c * c; ss += s * s; cs += c * s; cy += c * y[i]; sy += s * y[i]; }
  const det = cc * ss - cs * cs; const a = (cy * ss - sy * cs) / det, b = (sy * cc - cy * cs) / det; return (a * cy + b * sy) / tot; };
const ts: number[] = [], vs: number[] = []; for (let t = tmin; t <= tmax; t += step) { ts.push(t); vs.push(r2(t)); }
const peaks: [number, number][] = []; for (let i = 1; i < vs.length - 1; i++) if (vs[i] > vs[i - 1] && vs[i] >= vs[i + 1]) peaks.push([ts[i], vs[i]]);
peaks.sort((a, b) => b[1] - a[1]);
console.log(`${tag}: top peaks of single-frequency R^2 (frequency, R^2):`); console.log(peaks.slice(0, 12).map(([t, v]) => `  ${t.toFixed(3)}  ${v.toFixed(4)}`).join("\n"));
