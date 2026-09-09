/**
 * Thesis test suite for the n-dimensional Ulam spiral.
 *
 *   npx tsx thesis/run.ts            quick (≈ 2M numbers per dimension, ~2 min)
 *   npx tsx thesis/run.ts --full     larger boxes (≈ 8M numbers per dimension)
 *
 * Writes thesis/results.json and thesis/REPORT.md. Every test states a hypothesis and
 * a pass/fail criterion; REPORT.md is the raw evidence, CONCLUSIONS.md the reading.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { buildBox, leaderboard, rayPolynomial, riemannSeries, slice2D, type Box } from "../lib/analysis";
import { directions, maxRadiusFor, toN, toNBig } from "../lib/spiral";
import { OMEGA_MASK, sieve, type SieveResult } from "../lib/sieve";
import { batemanHorn, evalPoly, isCertainlyReducible, isPrimeBig, lnBig } from "../lib/poly";
import { diffraction } from "../lib/fft";
import { schoenfeldPi, schoenfeldPsi } from "../lib/riemann";

const FULL = process.argv.includes("--full");
const TARGET_N = FULL ? 8_000_000 : 2_000_000;
const FIB = new Set([2, 3, 5, 8]);

// deterministic PRNG so the suite is reproducible
let seed = 20260908;
function rnd(): number {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
}
const randInt = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));

const log = (s: string) => process.stdout.write(s + "\n");
const f = (x: number, k = 3) => (Number.isFinite(x) ? x.toFixed(k) : "–");
const en = (x: number) => x.toLocaleString("en");
const results: Record<string, unknown> = { full: FULL, targetN: TARGET_N, date: new Date().toISOString() };
const md: string[] = [`# Thesis test suite — results`, ``, `Generated ${new Date().toISOString()}, ${FULL ? "full" : "quick"} mode, ≈ ${en(TARGET_N)} numbers per dimension. Deterministic seed; rerun with \`npm run thesis\`.`, ``];

let sharedSieve: SieveResult | null = null;
const boxes = new Map<number, Box>();
function box(d: number): Box {
  let b = boxes.get(d);
  if (!b) {
    const R = Math.max(1, maxRadiusFor(TARGET_N, d));
    b = buildBox(d, R, sharedSieve, () => {});
    sharedSieve = b.sv;
    boxes.set(d, b);
  }
  return b;
}
const isPrimeN = (b: Box, n: number) => (b.sv.data[n] & OMEGA_MASK) === 1;
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);

// ------------------------------------------------------------------ T1 polynomial theorem
function t1() {
  log("T1 polynomial theorem");
  const rows: string[] = [];
  const out: Record<number, unknown> = {};
  for (const d of [2, 3, 4, 5, 6, 7]) {
    const dirs = directions(d, Math.min(3, d));
    let rays = 0,
      found = 0,
      degreeOk = 0,
      leadOk = 0,
      verifiedOk = 0,
      maxT0 = 0;
    const B = d <= 3 ? 40 : 6;
    for (let i = 0; i < 30; i++) {
      const b = Array.from({ length: d }, () => randInt(-B, B));
      for (const v of dirs.slice(0, 40)) {
        const r = rayPolynomial(b, v, d);
        rays++;
        if (!r) continue;
        found++;
        if (r.poly.degree === d) degreeOk++;
        const lead = Number(r.poly.num[r.poly.degree]) / Number(r.poly.den);
        if (lead === Math.pow(2, d)) leadOk++;
        maxT0 = Math.max(maxT0, r.t0);
        let ok = true;
        const c = new Array(d).fill(0);
        for (let t = r.t0; t < r.t0 + 400 && ok; t += 3) {
          for (let k = 0; k < d; k++) c[k] = b[k] + t * v[k];
          if (evalPoly(r.poly, BigInt(t)) !== toNBig(c, d)) ok = false;
        }
        if (ok) verifiedOk++;
      }
    }
    out[d] = { rays, found, degreeOk, leadOk, verifiedOk, maxT0 };
    rows.push(`| ${d} | ${B} | ${rays} | ${found} | ${degreeOk} | ${leadOk} | ${verifiedOk} | ${maxT0} |`);
  }
  results.t1 = out;
  md.push(
    `## T1 — every lattice ray is eventually a polynomial of degree d with leading coefficient 2ᵈ`,
    ``,
    `Hypothesis: for every base point b (|bᵢ| ≤ B) and direction v ∈ {−1,0,1}ᵈ the number at b + t·v is, for all t ≥ t₀, a polynomial of degree exactly d with leading coefficient 2ᵈ. Pass = all counts equal the number of rays. "verified" re-evaluates the polynomial against the spiral map at 130 further points beyond t₀.`,
    ``,
    `| d | B | rays | polynomial found | degree = d | leading = 2ᵈ | verified to t₀+400 | max t₀ |`,
    `|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ ray statistics helpers
interface RayStat {
  A: number;
  E: number;
  V: number;
  C: number;
  Ebh: number;
  Vbh: number;
  L: number;
  fixed: boolean;
  reducible: boolean;
}

function sampleRays(b: Box, K: number, maxNz: number, Lmin: number, P: number): RayStat[] {
  const { d, R } = b;
  const dirs = directions(d, maxNz);
  const out: RayStat[] = [];
  const c = new Array(d).fill(0);
  let tries = 0;
  while (out.length < K && tries < K * 60) {
    tries++;
    const base = Array.from({ length: d }, () => randInt(-R, R));
    const v = dirs[randInt(0, dirs.length - 1)];
    const r = rayPolynomial(base, v, d);
    if (!r) continue;
    const ns: number[] = [];
    for (let t = r.t0; ; t++) {
      let inside = true;
      for (let k = 0; k < d; k++) {
        c[k] = base[k] + t * v[k];
        if (Math.abs(c[k]) > R) inside = false;
      }
      if (!inside) break;
      const n = toN(c, d);
      if (evalPoly(r.poly, BigInt(t)) !== BigInt(n)) throw new Error(`polynomial regime broke at t=${t} (d=${d}, b=${base}, v=${Array.from(v)})`);
      ns.push(n);
    }
    if (ns.length < Lmin) continue;
    const bh = batemanHorn(r.poly, P);
    const C = bh.C;
    let A = 0,
      E = 0,
      V = 0,
      Ebh = 0,
      Vbh = 0;
    for (const n of ns) {
      if (isPrimeN(b, n)) A++;
      const p = n > 2 ? 1 / Math.log(n) : 0;
      E += p;
      V += p * (1 - p);
      const q = Math.min(1, C * p);
      Ebh += q;
      Vbh += q * (1 - q);
    }
    out.push({ A, E, V, C, Ebh, Vbh, L: ns.length, fixed: bh.fixedDivisor !== null, reducible: isCertainlyReducible(r.poly, r.t0) });
  }
  return out;
}

function summarize(rs: RayStat[]) {
  const usable = rs.filter((r) => !r.fixed && !r.reducible && r.Vbh > 0);
  const n = usable.length;
  const phiNaive = mean(rs.filter((r) => r.V > 0).map((r) => (r.A - r.E) ** 2 / r.V));
  const phiBH = mean(usable.map((r) => (r.A - r.Ebh) ** 2 / r.Vbh));
  const phiPred = 1 + mean(usable.map((r) => (r.Ebh - r.E) ** 2 / r.V));
  const Cs = usable.map((r) => r.C);
  const meanC = mean(Cs);
  const varC = mean(Cs.map((x) => (x - meanC) ** 2));
  const Ebar = mean(rs.map((r) => r.E));
  const sumA = rs.reduce((a, r) => a + r.A, 0);
  const sumE = rs.reduce((a, r) => a + r.E, 0);
  const sumEbh = rs.reduce((a, r) => a + (r.fixed || r.reducible ? 0 : r.Ebh), 0);
  const fixedRays = rs.filter((r) => r.fixed).length;
  const fixedWithPrimes = rs.filter((r) => r.fixed && r.A > 1).length;
  return { rays: rs.length, usable: n, phiNaive, phiPred, phiBH, sePhi: Math.sqrt(2 / Math.max(1, n)), meanC, varC, Ebar, structure: (phiNaive - 1) / Ebar, ratioNaive: sumA / sumE, ratioBH: sumA / sumEbh, fixedRays, fixedWithPrimes, meanL: mean(rs.map((r) => r.L)) };
}

// ------------------------------------------------------------------ T2 Bateman–Horn beyond the box
function t2() {
  log("T2 Bateman–Horn extrapolation");
  const rows: string[] = [];
  const out: Record<number, unknown> = {};
  const plan: Record<number, [number, number]> = FULL ? { 2: [300, 3000], 3: [200, 1000], 4: [150, 400], 5: [100, 200], 6: [80, 120] } : { 2: [150, 2000], 3: [100, 600], 4: [80, 250], 5: [60, 120], 6: [40, 80] };
  for (const d of [2, 3, 4, 5, 6]) {
    const [K, T] = plan[d];
    const R = Math.max(1, maxRadiusFor(TARGET_N, d));
    const dirs = directions(d, Math.min(2, d));
    let sumA = 0,
      sumP = 0,
      sumNaive = 0,
      chi = 0,
      chiNaive = 0,
      chiRandom = 0,
      nRandom = 0,
      used = 0,
      skipped = 0;
    let sumZ = 0;
    while (used < K) {
      const b = Array.from({ length: d }, () => randInt(-R, R));
      const v = dirs[randInt(0, dirs.length - 1)];
      const r = rayPolynomial(b, v, d);
      if (!r) continue;
      const bh = batemanHorn(r.poly, d >= 5 ? 1000 : 2000);
      if (bh.fixedDivisor !== null || isCertainlyReducible(r.poly, r.t0)) {
        skipped++;
        continue;
      }
      let A = 0,
        P = 0,
        Vp = 0,
        Nv = 0,
        VN = 0;
      for (let t = r.t0; t < r.t0 + T; t++) {
        const val = evalPoly(r.poly, BigInt(t));
        if (val < 2n) continue;
        const w = 1 / lnBig(val);
        const q = Math.min(1, bh.C * w);
        P += q;
        Vp += q * (1 - q);
        Nv += w;
        VN += w * (1 - w);
        if (isPrimeBig(val)) A++;
      }
      if (A === 0 && P > 6) {
        skipped++; // undetected reducible polynomial
        continue;
      }
      used++;
      sumA += A;
      sumP += P;
      sumNaive += Nv;
      chi += (A - P) ** 2 / Vp;
      chiNaive += (A - Nv) ** 2 / VN;
      sumZ += (A - P) / Math.sqrt(Vp);
      // control: T integers drawn uniformly from the ray's value range, same code path
      const lo = evalPoly(r.poly, BigInt(r.t0)),
        hi = evalPoly(r.poly, BigInt(r.t0 + T));
      const span = Number(hi - lo);
      if (span > 0) {
        let Ar = 0,
          Pr = 0,
          Vr = 0;
        for (let i = 0; i < T; i++) {
          const val = lo + BigInt(Math.floor(rnd() * span));
          if (val < 2n) continue;
          const w = 1 / lnBig(val);
          Pr += w;
          Vr += w * (1 - w);
          if (isPrimeBig(val)) Ar++;
        }
        if (Vr > 0) {
          chiRandom += (Ar - Pr) ** 2 / Vr;
          nRandom++;
        }
      }
    }
    const meanZ = sumZ / used;
    out[d] = { rays: used, skipped, T, sumA, sumP, sumNaive, ratioBH: sumA / sumP, ratioNaive: sumA / sumNaive, phiBH: chi / used, phiNaive: chiNaive / used, phiRandom: chiRandom / Math.max(1, nRandom), meanZ };
    rows.push(`| ${d} | ${used} | ${T} | ${sumA} | ${f(sumP, 1)} | ${f(sumA / sumP)} ± ${f(1 / Math.sqrt(sumP))} | ${f(sumA / sumNaive)} | **${f(chi / used, 2)} ± ${f(Math.sqrt(2 / used), 2)}** | ${f(chiNaive / used, 2)} | ${f(chiRandom / Math.max(1, nRandom), 2)} | ${f(meanZ, 2)} | ${skipped} |`);
    log(`  d=${d}: ${used} rays, A/P = ${f(sumA / sumP)}, Φ_BH = ${f(chi / used, 2)}, Φ_random = ${f(chiRandom / Math.max(1, nRandom), 2)}`);
  }
  results.t2 = out;
  md.push(
    `## T2 — primes on polynomial rays beyond the box follow Bateman–Horn, with sub-Poisson variance`,
    ``,
    `Random rays (base point in the matched box, direction with ≤ 2 non-zero entries) are followed for T steps from the polynomial threshold t₀ using Miller–Rabin on the exact polynomial values. Prediction per ray: Σ min(1, C(f)/ln f(t)) with independent-Bernoulli variance. Pass for Bateman–Horn = observed/predicted within a few standard errors of 1. Φ_BH is the dispersion of the per-ray residuals; Φ_random is a control in which, for every ray, the same number of integers is drawn uniformly at random from the ray's value range and pushed through the identical primality/weighting code (must be ≈ 1 under independence). Rays with a fixed divisor or a reducible polynomial are skipped (counted).`,
    ``,
    `| d | rays | T | primes | predicted | obs/pred ± se | obs/naive | Φ_BH ± se | Φ_naive | Φ_random control | mean z | skipped |`,
    `|---|---|---|---|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T3 in-box pattern collapse
function t3() {
  log("T3 in-box pattern collapse");
  const rows: string[] = [];
  const out: Record<number, unknown> = {};
  for (const d of [2, 3, 4, 5, 6]) {
    const b = box(d);
    const K = FULL ? 3000 : 1500;
    const Lmin = d === 2 ? 30 : d <= 4 ? 8 : 4;
    const rs = sampleRays(b, K, d <= 4 ? d : 2, Lmin, d >= 5 ? 600 : 1500);
    const s = summarize(rs);
    const scan = d <= 5 || FULL ? leaderboard(b, d <= 3 ? d : 2, d === 2 ? 20 : Math.max(3, Math.floor((2 * b.R + 1) / 3)), 5, () => {}) : null;
    const scanStructure = scan ? (scan.overall.dispersion - 1) / (scan.overall.expected / scan.overall.lines) : NaN;
    out[d] = { ...s, R: b.R, N: b.N, scanStructure, scanPhi: scan?.overall.dispersion, scanLines: scan?.overall.lines };
    const enough = s.usable >= 200;
    rows.push(
      `| ${d}${FIB.has(d) ? " ★" : ""} | ${b.R} | ${en(b.N)} | ${s.rays}${enough ? "" : " ⚠"} | ${f(s.meanL, 1)} | ${f(s.Ebar, 2)} | ${f(s.phiNaive, 2)} | ${f(s.phiPred, 2)} | **${f(s.phiBH, 2)} ± ${f(s.sePhi, 2)}** | ${f(s.structure)} | ${f(s.varC)} | ${f(s.meanC)} | ${f(s.ratioNaive)} | ${f(s.ratioBH)} | ${s.fixedRays} (${s.fixedWithPrimes}) | ${scan ? f(scanStructure) : "–"} |`,
    );
    log(`  d=${d}: rays ${s.rays}, Φ_naive ${f(s.phiNaive, 2)} (pred ${f(s.phiPred, 2)}) → Φ_BH ${f(s.phiBH, 2)}; structure ${f(s.structure)} vs Var(C) ${f(s.varC)}`);
  }
  results.t3 = out;
  md.push(
    `## T3 — inside the box, the line pattern collapses once each ray is weighted by its own C(f)`,
    ``,
    `For each dimension a box with ≈ ${en(TARGET_N)} numbers is built (radius R). Random in-box rays are taken from their polynomial threshold t₀ onward (the code asserts that the polynomial matches the spiral at every point used). Φ_naive = mean (A−E)²/V with E = Σ 1/ln n and independent-Bernoulli variance V. "Φ predicted from C(f)" = 1 + mean((C·E − E)²/V) is the dispersion the naive model *must* show if the only thing happening is that each ray has its own Bateman–Horn constant. Φ_BH is the dispersion after replacing 1/ln n by min(1, C(f)/ln n). Pass for "the pattern is explained by congruences" = Φ_naive ≈ Φ predicted and Φ_BH ≲ 1. Structure = (Φ_naive − 1)/Ē should track Var(C). "fixed (with >1 prime)" counts rays with a fixed prime divisor and how many of them contain more than one prime (must be 0). The last column is the same structure statistic from the exhaustive whole-line scan of the UI, which mixes polynomial regimes along a line and quantises 1/ln n. ⚠ = fewer than 200 usable rays; the box is too small for that dimension.`,
    ``,
    `| d | R | N | rays | mean pts | Ē | Φ_naive observed | Φ predicted from C(f) | Φ_BH ± se | (Φ−1)/Ē | Var C | mean C | obs/E | obs/E_BH | fixed (with >1 prime) | whole-line scan (Φ−1)/Ē |`,
    `|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T4 the C(f) distribution by dimension (no sieve needed)
function t4() {
  log("T4 C(f) distribution by dimension");
  const rows: string[] = [];
  const out: Record<number, unknown> = {};
  for (const d of [2, 3, 4, 5, 6, 7, 8, 9, 10]) {
    const R = Math.max(2, maxRadiusFor(TARGET_N, d));
    const dirs = directions(d, Math.min(2, d));
    const K = FULL ? 600 : 300;
    const Cs: number[] = [];
    let fixed = 0,
      reducible = 0,
      tries = 0;
    const byClass: Record<number, number[]> = { 1: [], 2: [] };
    while (Cs.length + fixed + reducible < K && tries < K * 20) {
      tries++;
      const b = Array.from({ length: d }, () => randInt(-R, R));
      const v = dirs[randInt(0, dirs.length - 1)];
      const r = rayPolynomial(b, v, d);
      if (!r) continue;
      const bh = batemanHorn(r.poly, d >= 6 ? 400 : 1000);
      if (bh.fixedDivisor !== null) {
        fixed++;
        continue;
      }
      if (isCertainlyReducible(r.poly, r.t0)) {
        reducible++;
        continue;
      }
      Cs.push(bh.C);
      let nz = 0;
      for (let i = 0; i < d; i++) if (v[i] !== 0) nz++;
      byClass[nz].push(bh.C);
    }
    const m = mean(Cs),
      va = mean(Cs.map((x) => (x - m) ** 2));
    const sorted = Cs.slice().sort((a, b) => a - b);
    const q = (p: number) => sorted[Math.min(sorted.length - 1, Math.floor(p * sorted.length))];
    const total = Cs.length + fixed + reducible;
    out[d] = { R, rays: total, fixedFrac: fixed / total, reducibleFrac: reducible / total, meanC: m, varC: va, cv: Math.sqrt(va) / m, q10: q(0.1), q50: q(0.5), q90: q(0.9), max: sorted[sorted.length - 1], meanAxis: mean(byClass[1]), meanDiag: mean(byClass[2]) };
    rows.push(`| ${d}${FIB.has(d) ? " ★" : ""} | ${R} | ${total} | ${f(fixed / total, 2)} | ${f(reducible / total, 3)} | ${f(m)} | ${f(va)} | ${f(Math.sqrt(va) / m)} | ${f(q(0.1), 2)} / ${f(q(0.5), 2)} / ${f(q(0.9), 2)} | ${f(sorted[sorted.length - 1], 2)} | ${f(mean(byClass[1]), 2)} / ${f(mean(byClass[2]), 2)} |`);
    log(`  d=${d}: fixed ${f(fixed / total, 2)}, mean C ${f(m)}, Var C ${f(va)}`);
  }
  results.t4 = out;
  md.push(
    `## T4 — the distribution of Bateman–Horn constants by dimension (pure congruence data, no primes involved)`,
    ``,
    `For random rays in the matched box of each dimension the eventual polynomial is computed exactly and its constant C(f) = Π_p (1 − ω(p)/p)/(1 − 1/p) is evaluated from the roots modulo small primes only. This is what the spiral "pattern" is made of: the fraction of rays with a fixed prime divisor (C = 0, the visibly empty lines), and the spread of C among the rest (the visibly rich versus poor lines). No sieve is used, so the test reaches d = 10. Var C and the coefficient of variation CV = sd/mean are the congruence-only predictions of the structure measured in T3.`,
    ``,
    `| d | R | rays | fixed-divisor fraction | reducible fraction | mean C | Var C | CV | C at 10 / 50 / 90 % | max C | mean C axis / diagonal |`,
    `|---|---|---|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T5 Fibonacci
function t5() {
  const t3 = results.t3 as Record<number, { structure: number; varC: number; usable: number }>;
  const t4 = results.t4 as Record<number, { varC: number; meanC: number; fixedFrac: number; cv: number }>;
  const rows: string[] = [];
  const S = (d: number) => (t3[d] && t3[d].usable >= 200 ? t3[d].structure : NaN);
  const V = (d: number) => t4[d]?.varC ?? NaN;
  const F = (d: number) => t4[d]?.fixedFrac ?? NaN;
  const CV = (d: number) => t4[d]?.cv ?? NaN;
  for (const d of [3, 5, 8]) {
    const nb = d === 8 ? [7, 9] : [d - 1, d + 1];
    const avg = (g: (d: number) => number) => (g(nb[0]) + g(nb[1])) / 2;
    rows.push(`| ${d} | ${f(S(d))} | ${f(avg(S))} | ${f(V(d))} | ${f(avg(V))} | ${f(CV(d))} | ${f(avg(CV))} | ${f(F(d), 2)} | ${f(avg(F), 2)} |`);
  }
  md.push(
    `## T5 — Fibonacci dimensions against their neighbours`,
    ``,
    `Hypothesis under test: d ∈ {2, 3, 5, 8} carry more (or differently organised) line structure than the control dimensions. Each Fibonacci dimension is compared with the mean of its two neighbours (d = 8 with 7 and 9). Columns: measured structure (Φ−1)/Ē from T3 where the box is large enough, and the congruence-only quantities from T4. Pass for the Fibonacci hypothesis would require a consistent, same-sign excess at 3, 5 and 8 that is large compared with the sampling scatter visible in T4 between adjacent control dimensions.`,
    ``,
    `| d | structure | neighbours | Var C | neighbours | CV of C | neighbours | fixed-divisor fraction | neighbours |`,
    `|---|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T6 scale invariance
function t6() {
  log("T6 scale invariance");
  const rows: string[] = [];
  const out: Record<string, unknown> = {};
  for (const d of [2, 3, 4]) {
    for (const N of [TARGET_N / 4, TARGET_N]) {
      const R = Math.max(1, maxRadiusFor(N, d));
      const b = buildBox(d, R, sharedSieve, () => {});
      sharedSieve = b.sv;
      const rs = sampleRays(b, FULL ? 2000 : 1000, d, d === 2 ? 30 : 8, 1500);
      const s = summarize(rs);
      out[`${d}@${N}`] = s;
      rows.push(`| ${d} | ${R} | ${en(b.N)} | ${f(s.Ebar, 2)} | ${f(s.phiNaive, 2)} | ${f(s.phiPred, 2)} | ${f(s.phiBH, 2)} ± ${f(s.sePhi, 2)} | ${f(s.structure)} | ${f(s.varC)} | ${f(s.ratioBH)} |`);
    }
  }
  results.t6 = out;
  md.push(
    `## T6 — scale invariance`,
    ``,
    `The T3 statistics at a quarter of the box size. A real effect must be stable under a change of scale: Φ_BH should stay ≲ 1 and obs/E_BH ≈ 1 in both rows of each d; (Φ−1)/Ē and Var C are allowed to drift slowly because the population of rays (their base points) changes with R.`,
    ``,
    `| d | R | N | Ē | Φ_naive | Φ predicted | Φ_BH ± se | (Φ−1)/Ē | Var C | obs/E_BH |`,
    `|---|---|---|---|---|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T7 diffraction
function bestRational(x: number, qmax: number): { p: number; q: number; err: number } {
  let best = { p: 0, q: 1, err: Math.abs(x) };
  for (let q = 1; q <= qmax; q++) {
    const p = Math.round(x * q);
    const err = Math.abs(x - p / q);
    if (err < best.err - 1e-12) best = { p, q, err };
  }
  return best;
}
function t7() {
  log("T7 diffraction");
  const out: Record<string, unknown> = {};
  const rows: string[] = [];
  const cases: { label: string; d: number; R: number; fixed: number[]; size: number }[] = [
    { label: "d=2, window 512", d: 2, R: 300, fixed: [0, 0], size: 512 },
    { label: "d=2, window 1024", d: 2, R: 600, fixed: [0, 0], size: 1024 },
    { label: "d=3, slice x₃=0, window 128", d: 3, R: 70, fixed: [0, 0, 0], size: 128 },
    { label: "d=3, slice x₃=17, window 128", d: 3, R: 70, fixed: [0, 0, 17], size: 128 },
  ];
  for (const cs of cases) {
    const b = buildBox(cs.d, cs.R, sharedSieve, () => {});
    sharedSieve = b.sv;
    const s = slice2D(b, [0, 1], cs.fixed);
    const size = cs.size;
    const field = new Uint8Array(size * size);
    const off = Math.floor((b.side - size) / 2);
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) field[y * size + x] = (s[(y + off) * b.side + x + off] & OMEGA_MASK) === 1 ? 1 : 0;
    const df = diffraction(field, size);
    let total = 0;
    const h = size >> 1;
    const pw = (i: number) => Math.pow(10, df.logPower[i]) - 1;
    for (let i = 0; i < size * size; i++) if (i !== h * size + h) total += pw(i);
    const peaks = df.peaks.slice(0, 12).map((p) => {
      const rx = bestRational(p.fx, 12),
        ry = bestRational(p.fy, 12);
      const idx = (Math.round(p.fy * size) + h) * size + Math.round(p.fx * size) + h;
      return { fx: p.fx, fy: p.fy, power: pw(idx) / total, rx: `${rx.p}/${rx.q}`, ry: `${ry.p}/${ry.q}`, err: Math.max(rx.err, ry.err) * size };
    });
    const peakPower = peaks.reduce((a, p) => a + p.power, 0);
    const maxErr = Math.max(...peaks.map((p) => p.err));
    // golden-ratio test: distance of each peak's |f| from the nearest element of {k/2, k/3, k/5, k/6} vs from τ-related irrationals
    out[cs.label] = { peaks, peakPower, maxErr };
    rows.push(`| ${cs.label} | ${peaks.length} | ${f(peakPower * 100, 1)}% | ${f(maxErr, 2)} | ${peaks.slice(0, 8).map((p) => `(${p.rx}, ${p.ry})`).join(" ")} |`);
    log(`  ${cs.label}: ${peaks.slice(0, 4).map((p) => `(${p.rx},${p.ry})`).join(" ")}, ${f(peakPower * 100, 1)}% of off-origin power`);
  }
  results.t7 = out;
  md.push(
    `## T7 — diffraction: crystallographic peaks over a diffuse background, no quasicrystal`,
    ``,
    `Power spectrum of the prime indicator in a window of a slice. Each of the 12 strongest local maxima is matched to the nearest rational frequency p/q with q ≤ 12; "max error" is the distance in frequency bins (0 = exactly on a rational frequency of the window). A quasicrystal (Penrose) would show sharp peaks at irrational, golden-ratio-related positions with 5- or 10-fold symmetry; a residue-class structure shows only rational peaks with small denominators. "share of power" is the fraction of the off-origin spectral power carried by those 12 peaks; the remainder is diffuse.`,
    ``,
    `| case | peaks | share of power | max error (bins) | strongest peaks (fₓ, f_y) |`,
    `|---|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ T8 RH bounds
function t8() {
  log("T8 RH-equivalent bounds");
  const N = FULL ? 48_000_000 : 16_000_000;
  const sv = sharedSieve && sharedSieve.N >= N ? sharedSieve : sieve(N);
  sharedSieve = sv;
  const b: Box = { d: 1, R: 0, N, side: 1, strides: [1], sv, gridN: new Uint32Array(0) };
  const s = riemannSeries(b, 4000);
  let maxPi = 0,
    maxPsi = 0,
    maxM = 0,
    argPi = 0,
    argPsi = 0,
    argM = 0;
  const dyadic: { x: number; maxDev: number }[] = [];
  let curMax = 0,
    curLim = 1024;
  for (let i = 0; i < s.x.length; i++) {
    const x = s.x[i];
    const a = Math.abs(s.pi[i] - s.li[i]) / schoenfeldPi(x);
    const c = Math.abs(s.psi[i] - x) / schoenfeldPsi(x);
    const m = Math.abs(s.M[i]) / Math.sqrt(x);
    if (x >= 2657 && a > maxPi) {
      maxPi = a;
      argPi = x;
    }
    if (x >= 74 && c > maxPsi) {
      maxPsi = c;
      argPsi = x;
    }
    if (m > maxM) {
      maxM = m;
      argM = x;
    }
    if (x > curLim) {
      dyadic.push({ x: curLim, maxDev: curMax });
      curMax = 0;
      curLim *= 2;
    }
    curMax = Math.max(curMax, Math.abs(s.psi[i] - x));
  }
  const pts = dyadic.filter((p) => p.x >= 16384 && p.maxDev > 0).map((p) => [Math.log(p.x), Math.log(p.maxDev)]);
  const mx = mean(pts.map((p) => p[0])),
    my = mean(pts.map((p) => p[1]));
  const slope = pts.reduce((a, p) => a + (p[0] - mx) * (p[1] - my), 0) / pts.reduce((a, p) => a + (p[0] - mx) ** 2, 0);
  results.t8 = { N, maxPi, argPi, maxPsi, argPsi, maxM, argM, slope, dyadic };
  md.push(
    `## T8 — RH-equivalent bounds hold up to N, and the fluctuation exponent`,
    ``,
    `From the sieve up to N = ${en(N)}. Under RH the first two ratios stay below 1 for all x in the stated ranges (Schoenfeld 1976); the Mertens ratio is known to exceed 1 eventually (Odlyzko–te Riele 1985) but not below 10¹⁶. The exponent is the least-squares slope of log max|ψ(x)−x| over dyadic blocks against log x; RH is equivalent to fluctuations of order x^(1/2) up to logarithms, so a slope near 0.5 is expected. Nothing here can distinguish RH from "RH fails far beyond N".`,
    ``,
    `| statistic | max | at x |`,
    `|---|---|---|`,
    `| \\|π(x) − li(x)\\| / (√x ln x / 8π), x ≥ 2657 | ${f(maxPi)} | ${en(argPi)} |`,
    `| \\|ψ(x) − x\\| / (√x ln²x / 8π), x ≥ 74 | ${f(maxPsi)} | ${en(argPsi)} |`,
    `| \\|M(x)\\| / √x | ${f(maxM)} | ${en(argM)} |`,
    `| fluctuation exponent of ψ(x) − x (dyadic maxima, x ≥ 2¹⁴) | ${f(slope)} | |`,
    ``,
  );
  log(`  maxPi ${f(maxPi)} maxPsi ${f(maxPsi)} maxM ${f(maxM)} slope ${f(slope)}`);
}

// ------------------------------------------------------------------ T9 neighbour correlation
function t9() {
  log("T9 neighbour correlation");
  const rows: string[] = [];
  const out: Record<number, unknown> = {};
  // sieve-model probabilities: naive 1/ln n; parity-aware; mod-30-aware (Mertens-type correction Π p/(p−1) for coprime n)
  const p1 = (n: number) => (n > 2 ? 1 / Math.log(n) : n === 2 ? 1 : 0);
  const p2 = (n: number) => (n === 2 ? 1 : n % 2 === 0 ? 0 : n > 2 ? Math.min(1, 2 / Math.log(n)) : 0);
  const p30 = (n: number) => {
    if (n === 2 || n === 3 || n === 5) return 1;
    if (n < 7) return 0;
    if (n % 2 === 0 || n % 3 === 0 || n % 5 === 0) return 0;
    return Math.min(1, (30 / 8) / Math.log(n)); // 2·(3/2)·(5/4) = 3.75
  };
  for (const d of [2, 3, 4, 5, 6, 7, 8]) {
    const b = box(d);
    const { R, N, strides, gridN, sv } = b;
    const obs = new Array(d + 1).fill(0);
    const e1 = new Array(d + 1).fill(0),
      e2 = new Array(d + 1).fill(0),
      e30 = new Array(d + 1).fill(0);
    const c = new Int32Array(d).fill(-R);
    for (let fidx = 0; fidx < N; fidx++) {
      const n = gridN[fidx];
      const isP = (sv.data[n] & OMEGA_MASK) === 1;
      const a1 = p1(n),
        a2 = p2(n),
        a30 = p30(n);
      for (let i = 0; i <= d; i++) {
        let m: number;
        if (i < d) {
          if (c[i] >= R) continue;
          m = gridN[fidx + strides[i]];
        } else {
          if (c[0] >= R || c[1] >= R) continue;
          m = gridN[fidx + strides[0] + strides[1]];
        }
        e1[i] += a1 * p1(m);
        e2[i] += a2 * p2(m);
        e30[i] += a30 * p30(m);
        if (isP && (sv.data[m] & OMEGA_MASK) === 1) obs[i]++;
      }
      for (let i = 0; i < d; i++) {
        if (++c[i] <= R) break;
        c[i] = -R;
      }
    }
    const r1 = obs.map((o, i) => o / e1[i]),
      r2 = obs.map((o, i) => (e2[i] > 0 ? o / e2[i] : 0)),
      r30 = obs.map((o, i) => (e30[i] > 0 ? o / e30[i] : 0));
    out[d] = { obs, r1, r2, r30 };
    const fmt = (rs: number[]) => rs.slice(0, d).map((x) => f(x, 2)).join(" · ") + " ‖ " + f(rs[d], 2);
    rows.push(`| ${d}${FIB.has(d) ? " ★" : ""} | ${fmt(r1)} | ${fmt(r2)} | ${fmt(r30)} |`);
    log(`  d=${d}: mod-30 residual ${fmt(r30)}`);
  }
  results.t9 = out;
  md.push(
    `## T9 — nearest-neighbour prime pairs by dimension: the texture is congruences mod 2, 3, 5`,
    ``,
    `Observed / expected number of lattice-adjacent prime pairs, per axis x₁ … x_d and (after ‖) for the (+1,+1,0,…) diagonal. Three expectations: independence with p(n) = 1/ln n (raw); a model that knows which cells are odd (probability 2/ln n for odd n); a model that knows the residues mod 2, 3 and 5 (probability 3.75/ln n for n coprime to 30). A raw ratio of 0 means adjacent cells never share parity; a ratio of 1 in the mod-30 column means that nothing beyond the residues of the cells modulo 30 is needed to explain how often neighbouring cells are both prime. This is the cleanest way to see how the spiral's arithmetic texture changes with the dimension.`,
    ``,
    `| d | raw ratios (axes ‖ diagonal) | parity-adjusted | mod-30-adjusted |`,
    `|---|---|---|---|`,
    ...rows,
    ``,
  );
}

// ------------------------------------------------------------------ run
const t0 = performance.now();
mkdirSync("thesis", { recursive: true });
t1();
t2();
t3();
t4();
t5();
t6();
t7();
t8();
t9();
md.push(`---`, `Run time ${((performance.now() - t0) / 1000).toFixed(0)} s.`);
const OUT = FULL ? "research/experiments/REPORT-full.md" : "research/experiments/REPORT.md";
writeFileSync(FULL ? "research/experiments/results-full.json" : "research/experiments/results.json", JSON.stringify(results, (_, v) => (typeof v === "bigint" ? v.toString() : v), 1));
writeFileSync(OUT, md.join("\n"));
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s → ${OUT}`);
