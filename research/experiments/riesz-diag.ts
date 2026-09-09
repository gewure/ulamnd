/**
 * Zeros of ζ and of L(s,χ_{-4}) in the DIAGONAL part of the pair-correlation sum of t² + 1.
 *
 *   npx tsx thesis/riesz-diag.ts
 *
 * The diagonal part of Σ_{h≤H}(S_f(h) − C²) is −C² Σ_d a_f(d){H/d}, with Dirichlet series
 * D_f(s) = ζ(s+1)L(s+1,χ_{-4}) H_f(s) / [ζ(2s+2)² L(2s+2,χ_{-4})]  (Theorems 3 and 4 of the paper).
 * Its Riesz means are Riesz means of the divisor-type function (a_f * 1)(n) = Σ_{d|n} a_f(d), with
 * generating series ζ(s)D_f(s); after the smooth main terms (poles at s = 1, 0, −1, −2) the residual is a
 * sum over the zeros ρ of ζ(2s+2)²L(2s+2,χ_{-4}), i.e. terms x^{m−1} x^{ρ/2}, oscillating in u = log x
 * with angular frequency γ/2. This is exactly computable for quadratics because ω(p) = 1 + χ_{-4}(p).
 * Writes paper/data/rieszd-*.dat and thesis/rieszd.json (same analysis as riesz.ts / riesz-analysis.ts).
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { findZeros } from "../lib/riemann";

const X = 20_000_000;
const log = (s: string) => process.stdout.write(s + "\n");
const t0 = performance.now();

// smallest prime factor sieve
const spf = new Int32Array(X + 1);
for (let i = 2; i <= X; i++) {
  if (spf[i]) continue;
  for (let j = i; j <= X; j += i) if (!spf[j]) spf[j] = i;
}
log(`spf sieve (${((performance.now() - t0) / 1000).toFixed(0)} s)`);

// a_f(d) for f = t^2 + 1:  ω(2) = 1 (P_2 = 0, so a(d) = 0 for odd d); ω(p) = 2 for p ≡ 1 (4), 0 for p ≡ 3 (4)
// a(d) = [2·ω(2)/(2−ω(2))²] · Π_{odd p ∤ d} P_p · Π_{odd p | d} pω/(p−ω)²   (squarefree d, 2 | d)
//       = 2 · A0' · Π_{odd p | d} [pω/(p−ω)² / P_p],   P_p = 1 − ω²/(p−ω)²;  for ω = 0: P_p = 1, factor 0 (a(d)=0 if such p | d)
let logA0 = 0;
for (let p = 3; p <= X; p += 2) if (spf[p] === p && p % 4 === 1) logA0 += Math.log(1 - 4 / ((p - 2) * (p - 2)));
const A0 = Math.exp(logA0);
const a = new Float64Array(X + 1);
a[2] = 2 * A0;
// multiplicative extension over squarefree d = 2·m, m odd squarefree with all prime factors ≡ 1 (4)
// factor for split p: [2p/(p−2)²] / [1 − 4/(p−2)²] = 2p/((p−2)² − 4) = 2p/(p(p−4)) = 2/(p−4)
for (let d = 4; d <= X; d += 2) {
  const m = d / 2;
  if (m % 2 === 0) continue; // 4 | d: not squarefree
  const p = spf[m];
  const rest = m / p;
  if (rest % p === 0 || p % 4 !== 1) {
    a[d] = 0;
    continue;
  }
  a[d] = a[2 * rest] * (2 / (p - 4));
}
log(`a(d) built, A0' = ${A0.toFixed(6)} (${((performance.now() - t0) / 1000).toFixed(0)} s)`);

// divisor sums A(n) = Σ_{d|n} a(d)  (only even d contribute)
const A = new Float64Array(X + 1);
for (let d = 2; d <= X; d += 2) {
  const v = a[d];
  if (v === 0) continue;
  for (let n = d; n <= X; n += d) A[n] += v;
}
log(`divisor sums (${((performance.now() - t0) / 1000).toFixed(0)} s)`);

// Riesz means R_m(x) = Σ_{n≤x} (x−n)^m A(n) on a log grid, via compensated prefix sums of A, nA, n²A, n³A
const uMin = Math.log(1e4),
  uMax = Math.log(X);
const M = 4096;
const us = Array.from({ length: M }, (_, j) => uMin + ((uMax - uMin) * j) / (M - 1));
const xs = us.map((u) => Math.exp(u));
const S = [0, 0, 0, 0],
  Cc = [0, 0, 0, 0];
const pref: number[][] = [[], [], [], []];
let j = 0;
for (let n = 1; n <= X && j < M; n++) {
  const v = A[n];
  if (v !== 0) {
    let pw = 1;
    for (let k = 0; k < 4; k++) {
      const y = v * pw - Cc[k];
      const t = S[k] + y;
      Cc[k] = t - S[k] - y;
      S[k] = t;
      pw *= n;
    }
  }
  while (j < M && xs[j] < n + 1) {
    for (let k = 0; k < 4; k++) pref[k].push(S[k]);
    j++;
  }
}
while (j < M) {
  for (let k = 0; k < 4; k++) pref[k].push(S[k]);
  j++;
}
const R1 = xs.map((x, i) => x * pref[0][i] - pref[1][i]);
const R2 = xs.map((x, i) => x * x * pref[0][i] - 2 * x * pref[1][i] + pref[2][i]);
const R3 = xs.map((x, i) => x ** 3 * pref[0][i] - 3 * x * x * pref[1][i] + 3 * x * pref[2][i] - pref[3][i]);

function lstsq(Am: number[][], b: number[]): number[] {
  const n = Am[0].length;
  const Mx: number[][] = Array.from({ length: n }, () => new Array(n + 1).fill(0));
  for (let r = 0; r < Am.length; r++)
    for (let i = 0; i < n; i++) {
      Mx[i][n] += Am[r][i] * b[r];
      for (let k = 0; k < n; k++) Mx[i][k] += Am[r][i] * Am[r][k];
    }
  for (let i = 0; i < n; i++) {
    let p = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(Mx[r][i]) > Math.abs(Mx[p][i])) p = r;
    [Mx[i], Mx[p]] = [Mx[p], Mx[i]];
    for (let r = i + 1; r < n; r++) {
      const f = Mx[r][i] / Mx[i][i];
      for (let k = i; k <= n; k++) Mx[r][k] -= f * Mx[i][k];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = Mx[i][n];
    for (let k = i + 1; k < n; k++) s -= Mx[i][k] * x[k];
    x[i] = s / Mx[i][i];
  }
  return x;
}
const xn = xs.map((x) => x / X);
// main terms: m=1: x², x log x, x, 1;  m=2: x³, x² log x, x², x, 1;  m=3: x⁴, x³ log x, x³, x², x, 1
function residual(R: number[], m: number, norm: number): number[] {
  const cols = (x: number) => {
    const c = [Math.pow(x, m + 1), Math.pow(x, m) * Math.log(x)];
    for (let k = m; k >= 0; k--) c.push(Math.pow(x, k));
    return c;
  };
  const Am = xn.map(cols);
  const scale = Math.pow(X, m + 1);
  const b = R.map((v) => v / scale);
  const cf = lstsq(Am, b);
  return R.map((v, i) => (v - scale * Am[i].reduce((s, q, k) => s + q * cf[k], 0)) / Math.pow(xs[i], norm));
}
const n1 = residual(R1, 1, 0.25),
  n2 = residual(R2, 2, 1.25),
  n3 = residual(R3, 3, 2.25);

function spectrum(vals: number[]) {
  const n = vals.length;
  const mean = vals.reduce((p, q) => p + q, 0) / n;
  const w = vals.map((v, i) => (v - mean) * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1))));
  const du = (uMax - uMin) / (n - 1);
  const freq: number[] = [],
    power: number[] = [];
  for (let om = 0.5; om <= 25; om += 0.02) {
    let re = 0,
      im = 0;
    for (let i = 0; i < n; i++) {
      const ph = om * i * du;
      re += w[i] * Math.cos(ph);
      im += w[i] * Math.sin(ph);
    }
    freq.push(om);
    power.push((re * re + im * im) / (n * n));
  }
  return { freq, power };
}
const sp1 = spectrum(n1),
  sp2 = spectrum(n2),
  sp3 = spectrum(n3);

// predicted frequencies
const Rz = JSON.parse(readFileSync("research/experiments/riesz.json", "utf8")) as { Lzeros: number[] };
const Lzeros: number[] = Rz.Lzeros;
const Zzeros = findZeros(3, 60, 0.02);
const resolution = (2 * Math.PI) / (uMax - uMin);

// significance: detrended log power at predicted vs random frequencies
function analyse(sp: { freq: number[]; power: number[] }) {
  const lo = 4,
    hi = 24;
  const idx = sp.freq.map((_, i) => i).filter((i) => sp.freq[i] >= lo && sp.freq[i] <= hi);
  const Xm = idx.map((i) => [1, Math.log(sp.freq[i]), Math.log(sp.freq[i]) ** 2]);
  const y = idx.map((i) => Math.log10(sp.power[i]));
  const c = lstsq(Xm, y);
  const det = new Map<number, number>();
  idx.forEach((i, k) => det.set(i, y[k] - (c[0] + c[1] * Xm[k][1] + c[2] * Xm[k][2])));
  const vals = Array.from(det.values());
  const mean = (v: number[]) => v.reduce((p, q) => p + q, 0) / v.length;
  const sdv = (v: number[]) => Math.sqrt(mean(v.map((q) => (q - mean(v)) ** 2)));
  const mu = mean(vals),
    sg = sdv(vals);
  const at = (w: number) => {
    let best = -Infinity;
    for (const i of idx) if (Math.abs(sp.freq[i] - w) <= 0.5 * resolution) best = Math.max(best, det.get(i)!);
    return best;
  };
  const predL = Lzeros.map((g) => g / 2).filter((w) => w >= lo + 0.5 && w <= hi - 0.5);
  const predZ = Zzeros.map((g) => g / 2).filter((w) => w >= lo + 0.5 && w <= hi - 0.5);
  let seed = 7;
  const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
  const zR: number[] = [];
  for (let k = 0; k < 4000; k++) zR.push((at(lo + 0.5 + rnd() * (hi - lo - 1)) - mu) / sg);
  const zL = predL.map((w) => (at(w) - mu) / sg),
    zZ = predZ.map((w) => (at(w) - mu) / sg);
  return { meanZL: mean(zL), meanZZ: mean(zZ), meanZR: mean(zR), sdZR: sdv(zR), nL: predL.length, nZ: predZ.length, zL, zZ, seL: sdv(zR) / Math.sqrt(predL.length), seZ: sdv(zR) / Math.sqrt(predZ.length), det: idx.map((i) => [sp.freq[i], det.get(i)!] as [number, number]) };
}
const an1 = analyse(sp1),
  an2 = analyse(sp2),
  an3 = analyse(sp3);
for (const [m, an] of [[1, an1], [2, an2], [3, an3]] as const) {
  log(`m=${m}: mean z at L-zero freqs ${an.meanZL.toFixed(2)} ± ${an.seL.toFixed(2)} (n=${an.nL}); at ζ-zero freqs ${an.meanZZ.toFixed(2)} ± ${an.seZ.toFixed(2)} (n=${an.nZ}); random ${an.meanZR.toFixed(2)} ± ${an.sdZR.toFixed(2)}`);
  log(`   per L zero: ${an.zL.map((z) => z.toFixed(1)).join(" ")}`);
  log(`   per ζ zero: ${an.zZ.map((z) => z.toFixed(1)).join(" ")}`);
}
// strongest peaks of m=2 spectrum with nearest prediction
const pk: { om: number; p: number }[] = [];
for (let i = 1; i < sp2.freq.length - 1; i++) if (sp2.power[i] > sp2.power[i - 1] && sp2.power[i] > sp2.power[i + 1] && sp2.freq[i] >= 4) pk.push({ om: sp2.freq[i], p: sp2.power[i] });
pk.sort((p, q) => q.p - p.p);
const cands = [...Lzeros.map((g) => ({ src: "L", v: g / 2 })), ...Zzeros.map((g) => ({ src: "Z", v: g / 2 }))];
const matches = pk.slice(0, 12).map((p) => {
  let best = cands[0];
  for (const c of cands) if (Math.abs(c.v - p.om) < Math.abs(best.v - p.om)) best = c;
  return { om: p.om, power: p.p, src: best.src, v: best.v, dist: Math.abs(best.v - p.om) };
});
for (const m of matches) log(`  ω=${m.om.toFixed(2)} power=${m.power.toExponential(2)} nearest ${m.src} γ/2=${m.v.toFixed(3)} Δ=${m.dist.toFixed(3)}`);

mkdirSync("research/paper-I/data", { recursive: true });
writeFileSync("research/paper-I/data/rieszd-spectrum.dat", "om p1 p2 p3\n" + sp1.freq.map((f, i) => `${f.toFixed(3)} ${sp1.power[i].toExponential(5)} ${sp2.power[i].toExponential(5)} ${sp3.power[i].toExponential(5)}`).join("\n") + "\n");
writeFileSync("research/paper-I/data/rieszd-detrended.dat", "om d2\n" + an2.det.map(([f, d]) => `${f.toFixed(3)} ${d.toFixed(4)}`).join("\n") + "\n");
writeFileSync("research/paper-I/data/rieszd-residual.dat", "u x n2\n" + us.filter((_, i) => i % 4 === 0).map((u, ii) => `${u.toFixed(4)} ${xs[ii * 4].toExponential(4)} ${n2[ii * 4].toExponential(5)}`).join("\n") + "\n");
writeFileSync("research/experiments/rieszd.json", JSON.stringify({ X, A0, resolution, an1: { ...an1, det: undefined }, an2: { ...an2, det: undefined }, an3: { ...an3, det: undefined }, matches, Lzeros, Zzeros }, null, 1));
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s`);
