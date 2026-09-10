/**
 * piece-spectrum.ts — spectrum in log Y of P_u(Y)/sqrt(Y) (from piece.ts grid files), tested against the
 * Laplace parameters of Maass forms for SL_2(Z) (level 1, in every Gamma_0(N)) and half the zeta ordinates, as in
 * paper II's offdiag-spectrum.ts. Prediction of route R (paper IV): P_u(Y) = sqrt(Y) * sum_j c_j cos(t_j log Y + phi_j) + ...
 *   npx tsx research/paper-IV/scripts/piece-spectrum.ts 2
 */
import { readFileSync, writeFileSync } from "node:fs";
const u = process.argv[2] ?? "2";
const rows = readFileSync(`research/paper-IV/data/piece-u${u}-grid.dat`, "utf8").trim().split("\n").slice(1).map((l) => l.split(" ").map(Number));
const us = rows.map((r) => r[0]), v = rows.map((r) => r[3]); const M = us.length;
const mean = v.reduce((a, b) => a + b, 0) / M;
const um = us.reduce((a, b) => a + b, 0) / M;
const sxx = us.reduce((a, x) => a + (x - um) ** 2, 0), sxy = us.reduce((a, x, i) => a + (x - um) * (v[i] - mean), 0);
const slope = sxy / sxx;
const det = v.map((x, i) => x - mean - slope * (us[i] - um));
const sd = Math.sqrt(det.reduce((a, b) => a + b * b, 0) / M);
console.log(`u=${u}: P/sqrtY mean ${mean.toFixed(4)} sd ${sd.toFixed(4)} drift/unit logY ${slope.toFixed(5)}  (M=${M}, logY in [${us[0].toFixed(2)}, ${us[M - 1].toFixed(2)}])`);
const w = det.map((x, i) => x * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (M - 1))));
const du = (us[M - 1] - us[0]) / (M - 1);
const freq: number[] = [], power: number[] = [];
for (let om = 0.5; om <= 30; om += 0.02) {
  let re = 0, im = 0;
  for (let i = 0; i < M; i++) { const ph = om * i * du; re += w[i] * Math.cos(ph); im += w[i] * Math.sin(ph); }
  freq.push(om); power.push((re * re + im * im) / (M * M));
}
const maass = [9.53370, 12.17301, 13.77975, 14.35851, 16.13807, 16.64426, 17.73856, 18.18092, 19.42348, 19.48471];
const zetaHalf = [7.067363, 10.511020, 12.505429, 15.212438, 16.467531, 18.793089, 20.459360, 21.663537, 24.008856, 24.964250];
const resolution = 2 * Math.PI / (us[M - 1] - us[0]);
const pk: { om: number; p: number }[] = [];
for (let i = 1; i < freq.length - 1; i++) if (power[i] > power[i - 1] && power[i] > power[i + 1]) pk.push({ om: freq[i], p: power[i] });
pk.sort((a, b) => b.p - a.p);
console.log(`resolution ${resolution.toFixed(2)}; top peaks:`);
for (const t of pk.slice(0, 12)) { const dm = Math.min(...maass.map((m) => Math.abs(m - t.om))), dz = Math.min(...zetaHalf.map((m) => Math.abs(m - t.om))); console.log(`  omega=${t.om.toFixed(2)} power=${t.p.toExponential(2)} |Maass| ${dm.toFixed(2)} |zeta/2| ${dz.toFixed(2)}`); }
const lo = 4, hi = 25; const idx = freq.map((_, i) => i).filter((i) => freq[i] >= lo && freq[i] <= hi);
const lp = idx.map((i) => Math.log10(power[i])); const mu = lp.reduce((a, b) => a + b, 0) / lp.length, sg = Math.sqrt(lp.reduce((a, b) => a + (b - mu) ** 2, 0) / lp.length);
const at = (om: number) => { let best = -Infinity; for (const i of idx) if (Math.abs(freq[i] - om) <= resolution / 2) best = Math.max(best, Math.log10(power[i])); return (best - mu) / sg; };
const zM = maass.filter((m) => m > lo + 1 && m < hi - 1).map(at), zZ = zetaHalf.filter((m) => m > lo + 1 && m < hi - 1).map(at);
let seed = 7; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const zR: number[] = []; for (let k = 0; k < 4000; k++) zR.push(at(lo + 1 + rnd() * (hi - lo - 2)));
const m1 = (a: number[]) => a.reduce((x, y) => x + y, 0) / a.length;
console.log(`mean z at Maass lines ${m1(zM).toFixed(2)}; at zeta/2 lines ${m1(zZ).toFixed(2)}; random ${m1(zR).toFixed(2)} +- ${Math.sqrt(m1(zR.map((z) => (z - m1(zR)) ** 2))).toFixed(2)}`);
console.log(`  per Maass line: ${zM.map((z) => z.toFixed(1)).join(" ")}\n  per zeta/2 line: ${zZ.map((z) => z.toFixed(1)).join(" ")}`);
writeFileSync(`research/paper-IV/data/piece-u${u}-spectrum.dat`, "om power\n" + freq.map((f, i) => `${f.toFixed(2)} ${power[i].toExponential(4)}`).join("\n") + "\n");
