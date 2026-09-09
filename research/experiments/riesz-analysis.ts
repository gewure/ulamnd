/**
 * Significance analysis of the spectrum produced by thesis/riesz.ts: detrend log-power by a quadratic in
 * log ω, then compare the detrended power at the predicted frequencies γ/2 (zeros of L(s,χ_{-4}) and of ζ)
 * with the power at control frequencies (midpoints between consecutive predicted frequencies).
 *   npx tsx thesis/riesz-analysis.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
const sp = readFileSync("research/paper-I/data/riesz-spectrum.dat", "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const R = JSON.parse(readFileSync("research/experiments/riesz.json", "utf8")) as { Lzeros: number[]; Zzeros: number[]; resolution: number };
const om = sp.map((r) => r[0]);
const lp = sp.map((r) => Math.log10(r[2]));
const lo = 4.0, hi = 24.0; // usable band (below 4 the fit residual leaks)
const idx = om.map((_, i) => i).filter((i) => om[i] >= lo && om[i] <= hi);
// quadratic detrend in log ω
const X = idx.map((i) => [1, Math.log(om[i]), Math.log(om[i]) ** 2]);
const y = idx.map((i) => lp[i]);
function lstsq(A: number[][], b: number[]) {
  const n = A[0].length; const M: number[][] = Array.from({ length: n }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < A.length; r++) for (let i = 0; i < n; i++) { M[i][n] += A[r][i] * b[r]; for (let k = 0; k < n; k++) M[i][k] += A[r][i] * A[r][k]; }
  for (let i = 0; i < n; i++) { let p = i; for (let r = i + 1; r < n; r++) if (Math.abs(M[r][i]) > Math.abs(M[p][i])) p = r; [M[i], M[p]] = [M[p], M[i]]; for (let r = i + 1; r < n; r++) { const f = M[r][i] / M[i][i]; for (let k = i; k <= n; k++) M[r][k] -= f * M[i][k]; } }
  const x = new Array(n).fill(0); for (let i = n - 1; i >= 0; i--) { let s = M[i][n]; for (let k = i + 1; k < n; k++) s -= M[i][k] * x[k]; x[i] = s / M[i][i]; } return x;
}
const c = lstsq(X, y);
const det = new Map<number, number>();
idx.forEach((i, j) => det.set(i, y[j] - (c[0] + c[1] * X[j][1] + c[2] * X[j][2])));
const vals = Array.from(det.values());
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sdv = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
const mu = mean(vals), sg = sdv(vals);
// detrended value at an arbitrary frequency: max within ±0.5·resolution (peak may be slightly displaced)
const at = (w: number) => { let best = -Infinity; for (const i of idx) if (Math.abs(om[i] - w) <= 0.5 * R.resolution) best = Math.max(best, det.get(i)!); return best; };
const predL = R.Lzeros.map((g) => g / 2).filter((w) => w >= lo + 0.5 && w <= hi - 0.5);
const predZ = R.Zzeros.map((g) => g / 2).filter((w) => w >= lo + 0.5 && w <= hi - 0.5);
const pred = [...predL, ...predZ].sort((a, b) => a - b);
const ctrl: number[] = []; for (let i = 0; i + 1 < pred.length; i++) if (pred[i + 1] - pred[i] > R.resolution) ctrl.push((pred[i] + pred[i + 1]) / 2);
const zL = predL.map((w) => (at(w) - mu) / sg), zZ = predZ.map((w) => (at(w) - mu) / sg), zC = ctrl.map((w) => (at(w) - mu) / sg);
// null distribution for the "max within window" statistic: random frequencies
let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const zR: number[] = []; for (let k = 0; k < 4000; k++) zR.push((at(lo + 0.5 + rnd() * (hi - lo - 1)) - mu) / sg);
const rep = { band: [lo, hi], nL: predL.length, nZ: predZ.length, nCtrl: ctrl.length, meanZL: mean(zL), meanZZ: mean(zZ), meanZCtrl: mean(zC), meanZRandom: mean(zR), sdZRandom: sdv(zR), seL: sdv(zR) / Math.sqrt(predL.length), seZ: sdv(zR) / Math.sqrt(predZ.length), fracLabove: zL.filter((z) => z > mean(zR)).length / predL.length, fracZabove: zZ.filter((z) => z > mean(zR)).length / predZ.length };
console.log(JSON.stringify(rep, null, 1));
console.log("per L-zero z:", zL.map((z) => z.toFixed(2)).join(" "));
console.log("per ζ-zero z:", zZ.map((z) => z.toFixed(2)).join(" "));
console.log("controls z:", zC.map((z) => z.toFixed(2)).join(" "));
writeFileSync("research/experiments/riesz-analysis.json", JSON.stringify({ ...rep, zL, zZ, zC, predL, predZ, ctrl }, null, 1));
writeFileSync("research/paper-I/data/riesz-detrended.dat", "om det\n" + idx.map((i) => `${om[i].toFixed(3)} ${det.get(i)!.toFixed(4)}`).join("\n") + "\n");
