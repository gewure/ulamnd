/**
 * Variance of prime counts along polynomial sequences.
 *
 *   npx tsx thesis/variance.ts [--full]
 *
 * For polynomials f of degree d (two families: eventual ray polynomials of the d-dimensional
 * spiral, and random integer polynomials), and for a grid of lengths T, the number A of primes
 * among f(t0), …, f(t0+T−1) is compared with the Bateman–Horn expectation
 *     μ = Σ min(1, C(f)/ln f(t)),   V = Σ q(1−q)  (independent-Bernoulli variance).
 * The dispersion Φ = ⟨(A−μ)²/V⟩ over polynomials is tabulated against
 *     ρ = ln T / ⟨ln f(t)⟩,
 * the analogue of ln H / ln X in the Montgomery–Soundararajan variance for primes in short
 * intervals, whose prediction is Φ ≈ 1 − ρ. A random-integer control with the same T and value
 * range is run through the identical code. Writes thesis/variance.json and paper/data/*.dat.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { rayPolynomial } from "../lib/analysis";
import { directions, maxRadiusFor } from "../lib/spiral";
import { batemanHorn, evalPoly, isCertainlyReducible, isPrimeBig, lnBig, pairSingularSeries, type IntPoly } from "../lib/poly";

const FULL = process.argv.includes("--full");
let seed = 424242;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const randInt = (lo: number, hi: number) => lo + Math.floor(rnd() * (hi - lo + 1));
const log = (s: string) => process.stdout.write(s + "\n");
const f3 = (x: number, k = 3) => (Number.isFinite(x) ? x.toFixed(k) : "nan");
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / Math.max(1, xs.length);

interface PolyCase {
  family: "spiral" | "random" | "linear";
  d: number;
  poly: IntPoly;
  t0: number;
  C: number;
}

const T_GRID: Record<number, number[]> = {
  1: [50, 100, 200, 400, 800, 1600, 3200],
  2: [25, 50, 100, 200, 400, 800, 1600, 3200],
  3: [25, 50, 100, 200, 400, 800, 1600],
  4: [25, 50, 100, 200, 400, 800],
  5: [25, 50, 100, 200, 400],
  6: [25, 50, 100, 200],
};
const N_POLY = FULL ? 240 : 120;
const P_TRUNC = (d: number) => (d <= 2 ? 20000 : d <= 3 ? 8000 : 3000);

function makeSpiral(d: number, K: number): PolyCase[] {
  const out: PolyCase[] = [];
  const dirs = directions(d, Math.min(2, d));
  const R = Math.max(2, Math.min(20, maxRadiusFor(2_000_000, d)));
  let tries = 0;
  while (out.length < K && tries < K * 50) {
    tries++;
    const b = Array.from({ length: d }, () => randInt(-R, R));
    const v = dirs[randInt(0, dirs.length - 1)];
    const r = rayPolynomial(b, v, d);
    if (!r) continue;
    const bh = batemanHorn(r.poly, P_TRUNC(d));
    if (bh.fixedDivisor !== null || isCertainlyReducible(r.poly, r.t0)) continue;
    out.push({ family: "spiral", d, poly: r.poly, t0: r.t0, C: bh.C });
  }
  return out;
}

function makeRandom(d: number, K: number): PolyCase[] {
  const out: PolyCase[] = [];
  let tries = 0;
  while (out.length < K && tries < K * 50) {
    tries++;
    const num: bigint[] = [];
    for (let i = 0; i < d; i++) num.push(BigInt(randInt(-60, 60)));
    num.push(BigInt(randInt(1, 8)));
    const poly: IntPoly = { num, den: 1n, degree: d };
    // make sure values are positive and increasing from t0 = 0 upward: shift t so that f is
    // increasing; simplest: require f(t) > 1 for t in [0, 40] and f(40) > f(0)
    let ok = true;
    for (let t = 0; t <= 40; t++) if (evalPoly(poly, BigInt(t)) < 2n) ok = false;
    if (!ok) continue;
    const bh = batemanHorn(poly, P_TRUNC(d));
    if (bh.fixedDivisor !== null || isCertainlyReducible(poly, 0)) continue;
    out.push({ family: "random", d, poly, t0: 0, C: bh.C });
  }
  return out;
}

function makeLinear(K: number): PolyCase[] {
  const out: PolyCase[] = [];
  while (out.length < K) {
    const q = randInt(2, 300);
    const a = randInt(1, q - 1);
    let g = q,
      h = a;
    while (h) [g, h] = [h, g % h];
    if (g !== 1) continue;
    const poly: IntPoly = { num: [BigInt(a) + BigInt(q) * BigInt(randInt(0, 50)), BigInt(q)], den: 1n, degree: 1 };
    const bh = batemanHorn(poly, 20000); // = q/φ(q) for coprime progressions
    out.push({ family: "linear", d: 1, poly, t0: 0, C: bh.C });
  }
  return out;
}

interface Cell {
  family: string;
  d: number;
  T: number;
  n: number;
  rho: number;
  phi: number;
  se: number;
  phiRandom: number;
  /** Hardy–Littlewood pair-correlation prediction of Φ: ⟨Var_HL / V⟩ */
  phiHL: number;
  seHL: number;
  /** κ estimate: Σ_{h<T} (S_f(h) − C²) / (C² ln T), averaged over polynomials */
  kappa: number;
  /** same sum normalised by C instead of C² */
  kappaC: number;
  /** spread of κ across polynomials */
  kappaSD: number;
  obsOverPred: number;
  meanMu: number;
  meanLogX: number;
}

function run(cases: PolyCase[], Ts: number[], label: string): Cell[] {
  const cells: Cell[] = [];
  const d = cases[0].d;
  // precompute primality along each polynomial up to max T once
  const Tmax = Ts[Ts.length - 1];
  const perPoly = cases.map((pc) => {
    const prime: Uint8Array = new Uint8Array(Tmax);
    const w: Float64Array = new Float64Array(Tmax);
    const lnv: Float64Array = new Float64Array(Tmax);
    for (let i = 0; i < Tmax; i++) {
      const val = evalPoly(pc.poly, BigInt(pc.t0 + i));
      if (val < 2n) continue;
      const L = lnBig(val);
      lnv[i] = L;
      w[i] = 1 / L;
      prime[i] = isPrimeBig(val) ? 1 : 0;
    }
    const S = pairSingularSeries(pc.poly, Tmax, P_TRUNC(d));
    return { prime, w, lnv, S };
  });
  for (const T of Ts) {
    const rs: number[] = [];
    const rsRand: number[] = [];
    const hl: number[] = [];
    const kappas: number[] = [];
    const kappasC: number[] = [];
    let sumA = 0,
      sumMu = 0,
      sumLog = 0,
      cnt = 0;
    cases.forEach((pc, k) => {
      const { prime, w, lnv, S } = perPoly[k];
      let A = 0,
        mu = 0,
        V = 0,
        lsum = 0;
      for (let i = 0; i < T; i++) {
        if (w[i] === 0) continue;
        const q = Math.min(1, pc.C * w[i]);
        mu += q;
        V += q * (1 - q);
        lsum += lnv[i];
        A += prime[i];
      }
      if (V <= 0) return;
      rs.push((A - mu) ** 2 / V);
      // Hardy–Littlewood pair-correlation variance: V + 2 Σ_h (S(h) − C²) Σ_t w_t w_{t+h}
      const C2 = pc.C * pc.C;
      let cov = 0,
        ks = 0;
      for (let h = 1; h < T; h++) {
        let W = 0;
        for (let t = 0; t + h < T; t++) W += w[t] * w[t + h];
        cov += (S[h - 1] - C2) * W;
        ks += S[h - 1] - C2;
      }
      hl.push((V + 2 * cov) / V);
      kappas.push(ks / (C2 * Math.log(T)));
      kappasC.push(ks / (pc.C * Math.log(T)));
      sumA += A;
      sumMu += mu;
      sumLog += lsum / T;
      cnt++;
      // control: T random integers from [f(t0), f(t0+T)]
      const lo = evalPoly(pc.poly, BigInt(pc.t0)),
        hi = evalPoly(pc.poly, BigInt(pc.t0 + T));
      const span = Number(hi - lo);
      if (span > 0) {
        let Ar = 0,
          Pr = 0,
          Vr = 0;
        for (let i = 0; i < T; i++) {
          const val = lo + BigInt(Math.floor(rnd() * span));
          if (val < 2n) continue;
          const ww = 1 / lnBig(val);
          Pr += ww;
          Vr += ww * (1 - ww);
          if (isPrimeBig(val)) Ar++;
        }
        if (Vr > 0) rsRand.push((Ar - Pr) ** 2 / Vr);
      }
    });
    const phi = mean(rs);
    // bootstrap standard error of the mean of rs
    const B = 300;
    const boots: number[] = [];
    for (let b = 0; b < B; b++) {
      let s = 0;
      for (let i = 0; i < rs.length; i++) s += rs[Math.floor(rnd() * rs.length)];
      boots.push(s / rs.length);
    }
    const bm = mean(boots);
    const se = Math.sqrt(mean(boots.map((x) => (x - bm) ** 2)));
    const meanLogX = sumLog / cnt;
    const phiHL = mean(hl);
    const seHL = Math.sqrt(mean(hl.map((x) => (x - phiHL) ** 2)) / Math.max(1, hl.length));
    const cell: Cell = { family: label, d, T, n: rs.length, rho: Math.log(T) / meanLogX, phi, se, phiRandom: mean(rsRand), phiHL, seHL, kappa: mean(kappas), kappaC: mean(kappasC), kappaSD: Math.sqrt(mean(kappas.map((x) => (x - mean(kappas)) ** 2))), obsOverPred: sumA / sumMu, meanMu: sumMu / cnt, meanLogX };
    cells.push(cell);
    log(`  ${label} d=${d} T=${T}: n=${rs.length} ρ=${f3(cell.rho)} Φ=${f3(phi)}±${f3(se)} HL-pred ${f3(phiHL)}±${f3(seHL)} (1−ρ=${f3(1 - cell.rho)}) κ=${f3(cell.kappa, 2)} control ${f3(cell.phiRandom, 2)} obs/pred ${f3(cell.obsOverPred)} μ̄=${f3(cell.meanMu, 1)}`);
  }
  return cells;
}

const t0 = performance.now();
const all: Cell[] = [];
log("linear (arithmetic progressions)");
all.push(...run(makeLinear(N_POLY), T_GRID[1], "linear"));
for (const d of [2, 3, 4, 5, 6]) {
  log(`spiral rays, degree ${d}`);
  all.push(...run(makeSpiral(d, N_POLY), T_GRID[d], "spiral"));
  log(`random polynomials, degree ${d}`);
  all.push(...run(makeRandom(d, N_POLY), T_GRID[d], "random"));
}

// least-squares fit Φ = a + b·ρ over all polynomial cells (weights 1/se²)
const fitCells = all.filter((c) => c.family !== "linear" && c.se > 0);
let Sw = 0,
  Sx = 0,
  Sy = 0,
  Sxx = 0,
  Sxy = 0;
for (const c of fitCells) {
  const w = 1 / (c.se * c.se);
  Sw += w;
  Sx += w * c.rho;
  Sy += w * c.phi;
  Sxx += w * c.rho * c.rho;
  Sxy += w * c.rho * c.phi;
}
const det = Sw * Sxx - Sx * Sx;
const b = (Sw * Sxy - Sx * Sy) / det;
const a = (Sy - b * Sx) / Sw;
const seB = Math.sqrt(Sw / det),
  seA = Math.sqrt(Sxx / det);
let chi2 = 0,
  chi2HL = 0,
  chi2One = 0;
for (const c of fitCells) {
  chi2 += ((c.phi - (1 - c.rho)) / c.se) ** 2;
  chi2HL += ((c.phi - c.phiHL) / Math.sqrt(c.se * c.se + c.seHL * c.seHL)) ** 2;
  chi2One += ((c.phi - 1) / c.se) ** 2;
}
const fit = { a, seA, b, seB, cells: fitCells.length, chi2_vs_1minusRho: chi2, chi2_vs_HL: chi2HL, chi2_vs_one: chi2One, dof: fitCells.length };
log(`fit Φ = a + bρ: a = ${f3(a)} ± ${f3(seA)}, b = ${f3(b)} ± ${f3(seB)}`);
log(`χ² on ${fitCells.length} cells: against Φ = 1: ${f3(chi2One, 1)}; against Φ = 1 − ρ: ${f3(chi2, 1)}; against the Hardy–Littlewood pair prediction: ${f3(chi2HL, 1)}`);

mkdirSync("paper/data", { recursive: true });
writeFileSync("thesis/variance.json", JSON.stringify({ full: FULL, nPoly: N_POLY, cells: all, fit }, null, 1));
// pgfplots data files
const header = "rho phi se phiRandom phiHL seHL kappa kappaC kappaSD T d n mu\n";
for (const fam of ["spiral", "random", "linear"]) {
  const rows = all.filter((c) => c.family === fam).map((c) => `${f3(c.rho, 4)} ${f3(c.phi, 4)} ${f3(c.se, 4)} ${f3(c.phiRandom, 4)} ${f3(c.phiHL, 4)} ${f3(c.seHL, 4)} ${f3(c.kappa, 4)} ${f3(c.kappaC, 4)} ${f3(c.kappaSD, 4)} ${c.T} ${c.d} ${c.n} ${f3(c.meanMu, 2)}`);
  writeFileSync(`paper/data/variance-${fam}.dat`, header + rows.join("\n") + "\n");
}
for (const d of [2, 3, 4, 5, 6]) {
  const rows = all.filter((c) => c.d === d && c.family !== "linear").map((c) => `${f3(c.rho, 4)} ${f3(c.phi, 4)} ${f3(c.se, 4)} ${f3(c.phiRandom, 4)} ${f3(c.phiHL, 4)} ${f3(c.seHL, 4)} ${f3(c.kappa, 4)} ${f3(c.kappaC, 4)} ${f3(c.kappaSD, 4)} ${c.T} ${c.d} ${c.n} ${f3(c.meanMu, 2)}`);
  writeFileSync(`paper/data/variance-d${d}.dat`, header + rows.join("\n") + "\n");
}
writeFileSync(
  "paper/data/variance-fit.tex",
  `\\newcommand{\\fitA}{${f3(a)}}\\newcommand{\\fitAse}{${f3(seA)}}\\newcommand{\\fitB}{${f3(b)}}\\newcommand{\\fitBse}{${f3(seB)}}\\newcommand{\\fitChi}{${f3(chi2, 1)}}\\newcommand{\\fitChiHL}{${f3(chi2HL, 1)}}\\newcommand{\\fitChiOne}{${f3(chi2One, 0)}}\\newcommand{\\fitDof}{${fitCells.length}}\\newcommand{\\nPoly}{${N_POLY}}\n`,
);
log(`done in ${((performance.now() - t0) / 1000).toFixed(0)} s`);
