/**
 * Zeros of L(s, χ_{-4}) in the second moment of the primes of the form t² + 1.
 *
 *   npx tsx thesis/riesz.ts
 *
 * For f = t² + 1 the pair singular series has the exact closed form (paper, Prop. on quadratics)
 *     S_f(h) = 0 for odd h,   S_f(h) = 2·C²·P(1) · Π_{p|h, p split} (p−2)/(p−4) · Π_{p | h²+4, p∤h} (p−3)/(p−4)   for even h,
 * where P(1) = Π_{p odd} (1 − ω(p)²/(p−ω(p))²) and split means p ≡ 1 (mod 4). We compute S_f(h) exactly
 * (to double precision, up to the overall constant) for all even h ≤ X by two sieves, form the Riesz
 * means S_m(x) = Σ_{h≤x} (x−h)^m S_f(h), remove the smooth main terms by least squares, and Fourier-analyse
 * the residual in u = log x. The diagonal generating series is ζ(s)ζ(s+1)L(s+1,χ)·(…)/[ζ(2s+2)² L(2s+2,χ)],
 * so the residual should oscillate with angular frequencies γ/2 for the zeros ½+iγ of ζ AND of L(s,χ_{-4}).
 * Writes paper/data/riesz-*.dat and thesis/riesz.json.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { findZeros } from "../lib/riemann";

const X = 40_000_000; // largest h
const N = X / 2; // number of even h
const log = (s: string) => process.stdout.write(s + "\n");
const t0 = performance.now();

// ---------------------------------------------------------------- primes to X
function primeSieve(n: number): Uint8Array {
  const s = new Uint8Array(n + 1);
  s[0] = s[1] = 1;
  for (let i = 2; i * i <= n; i++) if (!s[i]) for (let j = i * i; j <= n; j += i) s[j] = 1;
  return s; // s[p] === 0 => prime
}
const comp = primeSieve(X);
log(`primes sieved (${((performance.now() - t0) / 1000).toFixed(0)} s)`);

function modpow(b: number, e: number, m: number): number {
  let r = 1n,
    bb = BigInt(b) % BigInt(m),
    ee = BigInt(e);
  const mm = BigInt(m);
  while (ee > 0n) {
    if (ee & 1n) r = (r * bb) % mm;
    bb = (bb * bb) % mm;
    ee >>= 1n;
  }
  return Number(r);
}
/** square root of −1 modulo a prime p ≡ 1 (mod 4) */
function sqrtMinusOne(p: number): number {
  for (let a = 2; ; a++) {
    // a is a non-residue iff a^((p-1)/2) ≡ -1
    if (modpow(a, (p - 1) / 2, p) === p - 1) return modpow(a, (p - 1) / 4, p);
  }
}

// ---------------------------------------------------------------- sieve of S_f(h), h = 2k, k = 1..N
// logS[k] accumulates log of the finite product; logRem[k] tracks log of the unsieved part of h²+4
const logS = new Float64Array(N + 1);
const logRem = new Float32Array(N + 1);
for (let k = 1; k <= N; k++) {
  // odd part of k² + 1 (h² + 4 = 4(k² + 1); the prime 2 is handled by the constant factor 2)
  let q = k * k + 1;
  while (q % 2 === 0) q /= 2;
  logRem[k] = Math.log(q);
}
let logP1 = 0; // log Π_{p odd ≤ X} P_p
let logC = Math.log(2); // C = Π (1-ω/p)/(1-1/p); p=2: ω=1 gives factor (1-1/2)/(1-1/2) = 1; p=2 handled: C_2 = 1. start with 0 -> fix below
logC = 0;
let nsplit = 0;
for (let p = 3; p <= X; p += 2) {
  if (comp[p]) continue;
  const split = p % 4 === 1;
  const w = split ? 2 : 0;
  logP1 += Math.log(1 - (w * w) / ((p - w) * (p - w)));
  logC += Math.log((1 - w / p) / (1 - 1 / p));
  if (!split) continue;
  nsplit++;
  // p | h  (h even): factor (p-2)/(p-4)
  const f1 = Math.log((p - 2) / (p - 4));
  for (let k = p; k <= N; k += p) logS[k] += f1; // h = 2k, p | h  <=>  p | k (p odd)
  // p | h²+4, p ∤ h: h ≡ ±2i, i² ≡ -1;  h = 2k  =>  k ≡ ±i (mod p)
  const i = sqrtMinusOne(p);
  const f2 = Math.log((p - 3) / (p - 4));
  const lp = Math.log(p);
  for (const r of [i, p - i]) {
    for (let k = r; k <= N; k += p) {
      logS[k] += f2;
      // remove all powers of p from h²+4 in the log tracker
      let v = 1;
      // p^2 | h^2+4 happens for a sparse set; check via exact arithmetic on the double (exact below 2^53)
      let q = k * k + 1;
      q /= p;
      while (q % p === 0) {
        q /= p;
        v++;
      }
      logRem[k] -= v * lp;
    }
  }
}
log(`sieve done: ${nsplit} split primes (${((performance.now() - t0) / 1000).toFixed(0)} s)`);
// large prime cofactors q > X of h²+4 (at most one): factor (q-3)/(q-4) ≈ 1 + 1/q
let nlarge = 0;
for (let k = 1; k <= N; k++) {
  const rem = logRem[k];
  if (rem > 0.5) {
    const q = Math.exp(rem);
    logS[k] += Math.log((q - 3) / (q - 4));
    nlarge++;
  }
}
log(`large cofactors: ${nlarge}`);
// S_f(2k) = 2 · C² · P(1) · exp(logS[k]);  (the p = 2 factor is 2 for even h)
const C = Math.exp(logC);
const P1 = Math.exp(logP1);
const K0 = 2 * C * C * P1;
log(`C(f) ≈ ${C.toFixed(6)}, P(1) ≈ ${P1.toFixed(6)}, prefactor ${K0.toFixed(6)}`);

// ---------------------------------------------------------------- Riesz means on a log grid of x
const uMin = Math.log(1e4),
  uMax = Math.log(X);
const M = 4096;
const us: number[] = [];
for (let j = 0; j < M; j++) us.push(uMin + ((uMax - uMin) * j) / (M - 1));
const xs = us.map((u) => Math.exp(u));
// prefix sums with Kahan compensation over even h in increasing order
let s0 = 0,
  s1 = 0,
  s2 = 0,
  c0 = 0,
  c1 = 0,
  c2 = 0;
const S0: number[] = [],
  S1: number[] = [],
  S2: number[] = [];
let j = 0;
const addK = (val: number, sum: number, comp: number): [number, number] => {
  const y = val - comp;
  const t = sum + y;
  return [t, t - sum - y];
};
for (let k = 1; k <= N && j < M; k++) {
  const h = 2 * k;
  const S = K0 * Math.exp(logS[k]);
  [s0, c0] = addK(S, s0, c0);
  [s1, c1] = addK(h * S, s1, c1);
  [s2, c2] = addK(h * h * S, s2, c2);
  while (j < M && xs[j] < h + 2) {
    // all even h' ≤ xs[j] are included when h' ≤ xs[j]; we sample at x just below the next even h
    S0.push(s0);
    S1.push(s1);
    S2.push(s2);
    j++;
  }
}
while (j < M) {
  S0.push(s0);
  S1.push(s1);
  S2.push(s2);
  j++;
}
// Riesz means: R1(x) = Σ (x-h) S = x S0 - S1;  R2(x) = Σ (x-h)² S = x² S0 - 2x S1 + S2
const R1 = xs.map((x, i) => x * S0[i] - S1[i]);
const R2 = xs.map((x, i) => x * x * S0[i] - 2 * x * S1[i] + S2[i]);

// ---------------------------------------------------------------- least-squares removal of the smooth terms
function lstsq(A: number[][], b: number[]): number[] {
  // normal equations, small system
  const n = A[0].length;
  const ATA: number[][] = Array.from({ length: n }, () => new Array(n).fill(0));
  const ATb = new Array(n).fill(0);
  for (let r = 0; r < A.length; r++) {
    for (let i = 0; i < n; i++) {
      ATb[i] += A[r][i] * b[r];
      for (let k = 0; k < n; k++) ATA[i][k] += A[r][i] * A[r][k];
    }
  }
  // Gaussian elimination with partial pivoting
  for (let i = 0; i < n; i++) {
    let piv = i;
    for (let r = i + 1; r < n; r++) if (Math.abs(ATA[r][i]) > Math.abs(ATA[piv][i])) piv = r;
    [ATA[i], ATA[piv]] = [ATA[piv], ATA[i]];
    [ATb[i], ATb[piv]] = [ATb[piv], ATb[i]];
    for (let r = i + 1; r < n; r++) {
      const fct = ATA[r][i] / ATA[i][i];
      for (let k = i; k < n; k++) ATA[r][k] -= fct * ATA[i][k];
      ATb[r] -= fct * ATb[i];
    }
  }
  const x = new Array(n).fill(0);
  for (let i = n - 1; i >= 0; i--) {
    let s = ATb[i];
    for (let k = i + 1; k < n; k++) s -= ATA[i][k] * x[k];
    x[i] = s / ATA[i][i];
  }
  return x;
}
// scale columns to avoid conditioning problems: work with x/X
const xn = xs.map((x) => x / X);
// m = 1: main terms α x² + β x log x + γ x + δ
const A1 = xn.map((x) => [x * x, x * Math.log(x), x, 1]);
const b1 = R1.map((v) => v / (X * X));
const c1v = lstsq(A1, b1);
const res1 = R1.map((v, i) => v - X * X * (c1v[0] * A1[i][0] + c1v[1] * A1[i][1] + c1v[2] * A1[i][2] + c1v[3] * A1[i][3]));
// m = 2: α x³ + β x² log x + γ x² + δ x + ε
const A2 = xn.map((x) => [x * x * x, x * x * Math.log(x), x * x, x, 1]);
const b2 = R2.map((v) => v / (X * X * X));
const c2v = lstsq(A2, b2);
const res2 = R2.map((v, i) => v - X * X * X * A2[i].reduce((s, a, k) => s + a * c2v[k], 0));
// normalised residuals (GRH size: x^{1/4} for m=1, x^{5/4} for m=2)
const n1 = res1.map((r, i) => r / Math.pow(xs[i], 0.25));
const n2 = res2.map((r, i) => r / Math.pow(xs[i], 1.25));
log(`main-term fit m=1: α=${(c1v[0]).toExponential(4)} (C²/2 = ${(C * C / 2).toExponential(4)}), β=${(c1v[1]).toExponential(4)} (−C/2·X^{-1}... scaled)`);

// ---------------------------------------------------------------- spectrum in u = log x (uniform grid), Hann window
function spectrum(vals: number[]): { freq: number[]; power: number[] } {
  const n = vals.length;
  const mean = vals.reduce((a, b) => a + b, 0) / n;
  const w = vals.map((v, i) => (v - mean) * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (n - 1))));
  const du = (uMax - uMin) / (n - 1);
  const freq: number[] = [],
    power: number[] = [];
  // direct DFT on a fine angular-frequency grid 0..25 (Lomb-style, since we want fine resolution)
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
const sp1 = spectrum(n1);
const sp2 = spectrum(n2);

// ---------------------------------------------------------------- zeros of L(s, χ_{-4}) on the critical line
// L(s,χ) = Σ_{k≥0} (-1)^k (2k+1)^{-s}: alternating; Borwein-type acceleration.
function Lchi4(t: number): [number, number] {
  const at = Math.abs(t);
  const n = Math.min(380, Math.ceil((at * Math.PI * 0.5 + Math.log(3 * (1 + 2 * at)) + 38) / Math.log(3 + Math.sqrt(8))) + 4);
  const d = new Float64Array(n + 1);
  let term = 1 / n,
    acc = term;
  d[0] = n * acc;
  for (let i = 1; i <= n; i++) {
    term *= ((n + i - 1) * 4 * (n - i + 1)) / (2 * i * (2 * i - 1));
    acc += term;
    d[i] = n * acc;
  }
  const dn = d[n];
  let re = 0,
    im = 0;
  for (let k = 0; k < n; k++) {
    const wgt = ((k % 2 === 0 ? 1 : -1) * (d[k] - dn)) / dn;
    const lk = Math.log(2 * k + 1);
    const mag = Math.exp(-0.5 * lk);
    re += -wgt * mag * Math.cos(-t * lk);
    im += -wgt * mag * Math.sin(-t * lk);
  }
  return [re, im];
}
const Lzeros: number[] = [];
{
  // minima of |L| below a threshold
  let prevA = Math.hypot(...Lchi4(0.1)),
    prevT = 0.1;
  let dec = false;
  for (let t = 0.12; t <= 60; t += 0.02) {
    const a = Math.hypot(...Lchi4(t));
    if (dec && a > prevA && prevA < 0.05) {
      // refine by golden section around prevT
      let lo = prevT - 0.02,
        hi = prevT + 0.02;
      for (let it = 0; it < 40; it++) {
        const m1 = lo + (hi - lo) * 0.382,
          m2 = lo + (hi - lo) * 0.618;
        if (Math.hypot(...Lchi4(m1)) < Math.hypot(...Lchi4(m2))) hi = m2;
        else lo = m1;
      }
      Lzeros.push((lo + hi) / 2);
    }
    dec = a < prevA;
    prevA = a;
    prevT = t;
  }
}
const Zzeros = findZeros(3, 60, 0.02);
log(`L(s,χ_{-4}) zeros: ${Lzeros.map((z) => z.toFixed(4)).join(", ")}`);
log(`ζ zeros: ${Zzeros.map((z) => z.toFixed(4)).join(", ")}`);

// ---------------------------------------------------------------- peaks of the spectrum and matching
function peaks(sp: { freq: number[]; power: number[] }, count: number) {
  const out: { om: number; p: number }[] = [];
  for (let i = 1; i < sp.freq.length - 1; i++) if (sp.power[i] > sp.power[i - 1] && sp.power[i] > sp.power[i + 1]) out.push({ om: sp.freq[i], p: sp.power[i] });
  out.sort((a, b) => b.p - a.p);
  return out.slice(0, count);
}
const pk1 = peaks(sp1, 12),
  pk2 = peaks(sp2, 12);
const match = (om: number) => {
  const cands = [...Lzeros.map((g) => ({ src: "L", v: g / 2 })), ...Zzeros.map((g) => ({ src: "ζ", v: g / 2 }))];
  let best = cands[0];
  for (const c of cands) if (Math.abs(c.v - om) < Math.abs(best.v - om)) best = c;
  return { ...best, dist: Math.abs(best.v - om) };
};
log("strongest peaks, m=2 residual:");
for (const p of pk2) {
  const m = match(p.om);
  log(`  ω=${p.om.toFixed(2)} power=${p.p.toExponential(2)}  nearest ${m.src} zero/2 = ${m.v.toFixed(3)} (Δ=${m.dist.toFixed(3)})`);
}
const resolution = (2 * Math.PI) / (uMax - uMin);
log(`frequency resolution ≈ ${resolution.toFixed(2)}`);

mkdirSync("research/paper-I/data", { recursive: true });
writeFileSync("research/paper-I/data/riesz-spectrum.dat", "om p1 p2\n" + sp1.freq.map((f, i) => `${f.toFixed(3)} ${sp1.power[i].toExponential(5)} ${sp2.power[i].toExponential(5)}`).join("\n") + "\n");
writeFileSync("research/paper-I/data/riesz-residual.dat", "u x r1 r2\n" + us.filter((_, i) => i % 4 === 0).map((u, ii) => { const i = ii * 4; return `${u.toFixed(4)} ${xs[i].toExponential(4)} ${n1[i].toExponential(5)} ${n2[i].toExponential(5)}`; }).join("\n") + "\n");
writeFileSync("research/paper-I/data/riesz-zeros.dat", "kind gamma half\n" + Lzeros.map((g) => `L ${g.toFixed(4)} ${(g / 2).toFixed(4)}`).join("\n") + "\n" + Zzeros.map((g) => `Z ${g.toFixed(4)} ${(g / 2).toFixed(4)}`).join("\n") + "\n");
writeFileSync("research/experiments/riesz.json", JSON.stringify({ X, C, P1, K0, fit1: c1v, fit2: c2v, Lzeros, Zzeros, peaks1: pk1, peaks2: pk2, resolution, matches2: pk2.map((p) => ({ om: p.om, power: p.p, ...match(p.om) })) }, null, 1));
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s`);
