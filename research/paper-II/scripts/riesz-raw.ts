/**
 * Raw Riesz means of the DIAGONAL of the pair-correlation sum of f = t² + 1, on a log grid, with no
 * fitting. Companion to thesis/riesz-diag.ts; the difference is that the smooth main terms are NOT
 * removed by least squares here. The exact main terms and the exact zero coefficients a_m(ρ) are
 * computed by followup/scripts/explicit-diag.py, which reads the file written here.
 *
 *   npx tsx followup/scripts/riesz-raw.ts [X]        (default X = 4e7; ~5 s, 1 GB)
 *
 * Writes followup/data/riesz-raw.dat with columns  u  x  R1  R2  R3   where
 *   R_m(x) = Σ_{n≤x} (x−n)^m A(n),   A = a_f * 1,  a_f(d) = W_f(d)ω_f(d)  (paper, Theorem 2),
 * and followup/data/riesz-raw.json with X, A0 (= Π_{p≡1(4), p≤X} P_p), Σ_{d≤X} a(d), Σ_{d≤X} a(d)/d.
 */
import { mkdirSync, writeFileSync } from "node:fs";

const X = Number(process.argv[2] ?? 40_000_000);
const log = (s: string) => process.stdout.write(s + "\n");
const t0 = performance.now();
const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";

const spf = new Int32Array(X + 1);
for (let i = 2; i <= X; i++) {
  if (spf[i]) continue;
  for (let j = i; j <= X; j += i) if (!spf[j]) spf[j] = i;
}
log(`spf sieve (${el()})`);

// a_f(d) for f = t²+1 (see thesis/riesz-diag.ts): a(2) = 2·A0, a(2m) = a(2·rest)·2/(p−4) for split p
// Kahan-compensated log-sum: a systematic relative error of 1e-13 in A0 would already be visible in R_m
let logA0 = 0, cA0 = 0;
for (let p = 3; p <= X; p += 2) if (spf[p] === p && p % 4 === 1) {
  const y = Math.log1p(-4 / ((p - 2) * (p - 2))) - cA0;
  const t = logA0 + y;
  cA0 = t - logA0 - y;
  logA0 = t;
}
const A0 = Math.exp(logA0);
const a = new Float64Array(X + 1);
a[2] = 2 * A0;
for (let d = 4; d <= X; d += 2) {
  const m = d / 2;
  if (m % 2 === 0) continue;
  const p = spf[m];
  const rest = m / p;
  if (rest % p === 0 || p % 4 !== 1) { a[d] = 0; continue; }
  a[d] = a[2 * rest] * (2 / (p - 4));
}
let sumA = 0, sumAd = 0;
for (let d = 2; d <= X; d += 2) { sumA += a[d]; sumAd += a[d] / d; }
log(`a(d) built, A0 = ${A0}, Σa = ${sumA}, Σa/d = ${sumAd} (${el()})`);

const A = new Float64Array(X + 1);
for (let d = 2; d <= X; d += 2) {
  const v = a[d];
  if (v === 0) continue;
  for (let n = d; n <= X; n += d) A[n] += v;
}
log(`divisor sums (${el()})`);

const uMin = Math.log(1e4), uMax = Math.log(X);
const M = 4096;
const us = Array.from({ length: M }, (_, j) => uMin + ((uMax - uMin) * j) / (M - 1));
const xs = us.map((u) => Math.exp(u));
// compensated prefix sums of A, nA, n²A, n³A
const S = [0, 0, 0, 0], Cc = [0, 0, 0, 0];
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
  while (j < M && xs[j] < n + 1) { for (let k = 0; k < 4; k++) pref[k].push(S[k]); j++; }
}
while (j < M) { for (let k = 0; k < 4; k++) pref[k].push(S[k]); j++; }
const R1 = xs.map((x, i) => x * pref[0][i] - pref[1][i]);
const R2 = xs.map((x, i) => x * x * pref[0][i] - 2 * x * pref[1][i] + pref[2][i]);
const R3 = xs.map((x, i) => x ** 3 * pref[0][i] - 3 * x * x * pref[1][i] + 3 * x * pref[2][i] - pref[3][i]);

mkdirSync("research/paper-II/data", { recursive: true });
writeFileSync(
  "research/paper-II/data/riesz-raw.dat",
  "u x R1 R2 R3\n" + us.map((u, i) => `${u.toPrecision(17)} ${xs[i].toPrecision(17)} ${R1[i].toPrecision(17)} ${R2[i].toPrecision(17)} ${R3[i].toPrecision(17)}`).join("\n") + "\n",
);
writeFileSync("research/paper-II/data/riesz-raw.json", JSON.stringify({ X, A0, logA0, sumA, sumAd, uMin, uMax, M }, null, 1));
log(`done (${el()})`);
