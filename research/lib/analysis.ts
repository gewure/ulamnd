/**
 * Analysis engine operating on a "Box": the first N = (2R+1)^d numbers laid out
 * in the d-dimensional spiral, together with the arithmetic sieve.
 */
import { directions, forEachInBox, oddPow, shellOf, toN, toNBig } from "./spiral";
import { OMEGA_MASK, buildInvLogTable, factorString, invLogBin, sieve, type SieveResult } from "./sieve";
import { batemanHorn, detectPolynomial, evalPoly, shiftPoly, isCertainlyReducible, isDeterministic, isPrimeBig, lnBig, polyToString, type IntPoly } from "./poly";
import { li, riemannR } from "./riemann";
import type { ClassStats, LeaderboardResult, LineAnalysis, LineRecord, PointAnalysis, RayAnalysis, RiemannSeries } from "./types";

export interface Box {
  d: number;
  R: number;
  N: number;
  side: number;
  strides: number[];
  sv: SieveResult;
  /** n at each flattened coordinate */
  gridN: Uint32Array;
}

export function flatIndex(box: Box, c: ArrayLike<number>): number {
  let f = 0;
  for (let i = 0; i < box.d; i++) f += (c[i] + box.R) * box.strides[i];
  return f;
}

export function unflatten(box: Box, f: number, out: number[]): number[] {
  for (let i = 0; i < box.d; i++) {
    out[i] = (f % box.side) - box.R;
    f = Math.floor(f / box.side);
  }
  return out;
}

const invLog = buildInvLogTable();

export function buildBox(d: number, R: number, existing: SieveResult | null, onProgress: (f: number, label: string) => void): Box {
  const N = oddPow(R, d);
  const side = 2 * R + 1;
  const strides: number[] = [];
  let s = 1;
  for (let i = 0; i < d; i++) {
    strides.push(s);
    s *= side;
  }
  const sv = existing && existing.N >= N ? existing : sieve(N, (f) => onProgress(f * 0.6, "sieving"));
  onProgress(0.6, "laying out spiral");
  const gridN = new Uint32Array(N);
  let last = 0;
  forEachInBox(R, d, (n, c) => {
    let f = 0;
    for (let i = 0; i < d; i++) f += (c[i] + R) * strides[i];
    gridN[f] = n;
    if (n - last > N / 20) {
      last = n;
      onProgress(0.6 + (0.4 * n) / N, "laying out spiral");
    }
  });
  onProgress(1, "done");
  return { d, R, N, side, strides, sv, gridN };
}

/** Sieve byte for a cell, or 0 when outside the box. */
export function cellByte(box: Box, c: ArrayLike<number>): number {
  for (let i = 0; i < box.d; i++) if (Math.abs(c[i]) > box.R) return 0;
  return box.sv.data[box.gridN[flatIndex(box, c)]];
}

// ------------------------------------------------------------------ slices

/** 2D slice: cell (x along axes[0], y along axes[1]) -> sieve byte. Row-major, y then x. */
export function slice2D(box: Box, axes: [number, number], fixed: number[]): Uint8Array {
  const { side, R, d } = box;
  const out = new Uint8Array(side * side);
  const c = fixed.slice();
  let base = 0;
  for (let i = 0; i < d; i++) if (i !== axes[0] && i !== axes[1]) base += (c[i] + R) * box.strides[i];
  const sx = box.strides[axes[0]],
    sy = box.strides[axes[1]];
  const data = box.sv.data,
    g = box.gridN;
  for (let y = 0; y < side; y++) {
    const rowBase = base + y * sy;
    const o = y * side;
    for (let x = 0; x < side; x++) out[o + x] = data[g[rowBase + x * sx]];
  }
  return out;
}

/** Positions (and n) of all primes in a 3D sub-box. */
export function cloud3D(box: Box, axes: [number, number, number], fixed: number[]): { pos: Int16Array; n: Uint32Array; count: number } {
  const { side, R, d } = box;
  let base = 0;
  for (let i = 0; i < d; i++) if (!axes.includes(i)) base += (fixed[i] + R) * box.strides[i];
  const s0 = box.strides[axes[0]],
    s1 = box.strides[axes[1]],
    s2 = box.strides[axes[2]];
  const data = box.sv.data,
    g = box.gridN;
  const posArr: number[] = [];
  const nArr: number[] = [];
  for (let z = 0; z < side; z++)
    for (let y = 0; y < side; y++) {
      const b = base + z * s2 + y * s1;
      for (let x = 0; x < side; x++) {
        const n = g[b + x * s0];
        if ((data[n] & OMEGA_MASK) === 1) {
          posArr.push(x - R, y - R, z - R);
          nArr.push(n);
        }
      }
    }
  return { pos: Int16Array.from(posArr), n: Uint32Array.from(nArr), count: nArr.length };
}

// ------------------------------------------------------------------ line polynomials

/**
 * Detect the eventual polynomial of a ray b + t·v (t >= 0) in dimension d.
 * A ray can pass through several degree-d regimes (the shell face changes when the dominating
 * coordinate flips sign); the ordering of |b_i + t v_i| is final for t >= 2·max|b_i| + 2, so the
 * regime found there is the eventual one. t0 is then walked back to the exact start of that regime.
 */
export function rayPolynomial(b: number[], v: ArrayLike<number>, d: number): { t0: number; poly: IntPoly } | null {
  let maxB = 0;
  for (let i = 0; i < d; i++) maxB = Math.max(maxB, Math.abs(b[i]));
  const window = 2 * d + 10;
  const tStar = 2 * maxB + 2;
  const tMax = tStar + 2 * d + 6;
  const seq: bigint[] = [];
  const c = new Array(d).fill(0);
  for (let t = 0; t < tMax + window; t++) {
    for (let i = 0; i < d; i++) c[i] = b[i] + t * v[i];
    seq.push(toNBig(c, d));
  }
  for (let ts = tStar; ts <= tMax; ts++) {
    const p = detectPolynomial(seq.slice(ts, ts + window), d);
    if (!p || p.degree !== d) continue;
    const poly = shiftPoly(p, ts);
    let t0 = ts;
    while (t0 > 0 && evalPoly(poly, BigInt(t0 - 1)) === seq[t0 - 1]) t0--;
    return { t0, poly };
  }
  return null;
}

function analyzeRay(b: number[], v: ArrayLike<number>, sign: 1 | -1, d: number, extT: number): RayAnalysis | null {
  const sv = Array.from(v, (x) => x * sign);
  const res = rayPolynomial(b, sv, d);
  if (!res) return null;
  const { t0, poly } = res;
  const bh = batemanHorn(poly, d >= 5 ? 1000 : 2000);
  let extActual = 0,
    extPredicted = 0,
    extNaive = 0;
  let extDeterministic = true;
  const samples: { t: number; value: string; prime: boolean }[] = [];
  for (let t = t0; t < t0 + extT; t++) {
    const val = evalPoly(poly, BigInt(t));
    if (val < 2n) continue;
    const pr = isPrimeBig(val);
    if (!isDeterministic(val)) extDeterministic = false;
    if (pr) extActual++;
    const w = 1 / lnBig(val);
    extNaive += w;
    extPredicted += bh.C * w;
    if (samples.length < 12) samples.push({ t, value: val.toString(), prime: pr });
  }
  const reducible: RayAnalysis["reducible"] = isCertainlyReducible(poly, t0) ? "yes" : extActual === 0 && extPredicted > 4 ? "likely" : "no";
  return {
    sign,
    t0,
    degree: poly.degree,
    poly: polyToString(poly),
    reducible,
    num: poly.num.map((x) => x.toString()),
    den: poly.den.toString(),
    C: bh.C,
    fixedDivisor: bh.fixedDivisor,
    localDensities: bh.localDensities,
    extT,
    extActual,
    extPredicted,
    extNaive,
    extDeterministic,
    samples,
  };
}

export function analyzePoint(box: Box, coords: number[], maxNonzero: number, extT: number, onProgress?: (f: number) => void): PointAnalysis {
  const { d, R } = box;
  const n = toN(coords, d);
  const byte = box.sv.data[n] ?? 0;
  const dirs = directions(d, maxNonzero);
  const lines: LineAnalysis[] = [];
  const c = new Array(d).fill(0);
  dirs.forEach((v, di) => {
    onProgress?.(di / dirs.length);
    // in-box walk both ways
    let points = 0,
      actual = 0,
      expected = 0;
    for (const sign of [1, -1] as const) {
      for (let t = sign === 1 ? 0 : 1; ; t++) {
        let inside = true;
        for (let i = 0; i < d; i++) {
          c[i] = coords[i] + sign * t * v[i];
          if (Math.abs(c[i]) > R) inside = false;
        }
        if (!inside) break;
        const m = box.gridN[flatIndex(box, c)];
        points++;
        if ((box.sv.data[m] & OMEGA_MASK) === 1) actual++;
        if (m > 1) expected += 1 / Math.log(m);
      }
    }
    const rays: RayAnalysis[] = [];
    for (const sign of [1, -1] as const) {
      const r = analyzeRay(coords, v, sign, d, extT);
      if (r) rays.push(r);
    }
    let nz = 0;
    for (let i = 0; i < d; i++) if (v[i] !== 0) nz++;
    lines.push({ dir: Array.from(v), nonzero: nz, points, actual, expected, z: expected > 0 ? (actual - expected) / Math.sqrt(expected) : 0, rays });
  });
  return {
    n,
    coords: coords.slice(),
    isPrime: (byte & OMEGA_MASK) === 1,
    factorization: factorString(n),
    omega: byte & OMEGA_MASK,
    shell: shellOf(n, d),
    lines,
  };
}

// ------------------------------------------------------------------ leaderboard

const Z_BINS = 48; // -6 .. 6 in 0.25 steps

function newStats(nonzero: number): ClassStats {
  return { nonzero, directions: 0, lines: 0, points: 0, actual: 0, expected: 0, dispersion: 0, emptyLines: 0, emptyExpected: 0, zHist: new Array(Z_BINS).fill(0), meanZ: 0, sdZ: 0 };
}

interface StatsAcc {
  s: ClassStats;
  chi2: number;
  sumZ: number;
  sumZ2: number;
}

function accLine(a: StatsAcc, A: number, E: number, L: number): void {
  a.s.lines++;
  a.s.points += L;
  a.s.actual += A;
  a.s.expected += E;
  if (E > 0) {
    const z = (A - E) / Math.sqrt(E);
    a.chi2 += ((A - E) * (A - E)) / E;
    a.sumZ += z;
    a.sumZ2 += z * z;
    const bin = Math.min(Z_BINS - 1, Math.max(0, Math.floor((z + 6) * 4)));
    a.s.zHist[bin]++;
  }
  if (A === 0) a.s.emptyLines++;
  a.s.emptyExpected += Math.exp(-E);
}

function finish(a: StatsAcc): ClassStats {
  const n = a.s.lines;
  a.s.dispersion = n > 1 ? a.chi2 / (n - 1) : 0;
  a.s.meanZ = n ? a.sumZ / n : 0;
  a.s.sdZ = n > 1 ? Math.sqrt(Math.max(0, a.sumZ2 / n - (a.sumZ / n) ** 2)) : 0;
  return a.s;
}

class TopK {
  items: LineRecord[] = [];
  constructor(
    private k: number,
    private sign: 1 | -1,
  ) {}
  offer(r: LineRecord): void {
    const key = r.z * this.sign;
    if (this.items.length < this.k) {
      this.items.push(r);
      if (this.items.length === this.k) this.items.sort((a, b) => b.z * this.sign - a.z * this.sign);
      return;
    }
    const worst = this.items[this.items.length - 1];
    if (key <= worst.z * this.sign) return;
    this.items[this.items.length - 1] = r;
    // insertion step
    for (let i = this.items.length - 1; i > 0 && this.items[i].z * this.sign > this.items[i - 1].z * this.sign; i--) {
      const t = this.items[i];
      this.items[i] = this.items[i - 1];
      this.items[i - 1] = t;
    }
  }
  sorted(): LineRecord[] {
    return this.items.slice().sort((a, b) => b.z * this.sign - a.z * this.sign);
  }
}

export function leaderboard(box: Box, maxNonzero: number, minLen: number, topK: number, onProgress?: (f: number, label: string) => void): LeaderboardResult {
  const t0 = performance.now();
  const { d, R, side, N, strides } = box;
  const dirs = directions(d, maxNonzero);
  const data = box.sv.data,
    g = box.gridN;
  const classes = new Map<number, StatsAcc>();
  const overall: StatsAcc = { s: newStats(0), chi2: 0, sumZ: 0, sumZ2: 0 };
  const top = new TopK(topK, 1),
    bottom = new TopK(topK, -1);
  const c = new Int32Array(d);
  const startTmp: number[] = new Array(d);
  dirs.forEach((v, di) => {
    onProgress?.(di / dirs.length, `direction ${di + 1}/${dirs.length}`);
    let nz = 0,
      step = 0;
    for (let i = 0; i < d; i++) {
      if (v[i] !== 0) nz++;
      step += v[i] * strides[i];
    }
    let acc = classes.get(nz);
    if (!acc) {
      acc = { s: newStats(nz), chi2: 0, sumZ: 0, sumZ2: 0 };
      classes.set(nz, acc);
    }
    acc.s.directions++;
    // iterate all points; a point starts a line when p - v is outside the box
    c.fill(-R);
    for (let f = 0; f < N; f++) {
      let isStart = false;
      let L = Infinity;
      for (let i = 0; i < d; i++) {
        const vi = v[i];
        if (vi === 0) continue;
        const xi = c[i];
        if ((vi === 1 && xi === -R) || (vi === -1 && xi === R)) isStart = true;
        const room = vi === 1 ? R - xi : xi + R;
        if (room < L) L = room;
      }
      if (isStart) {
        const len = L + 1;
        if (len >= minLen) {
          let A = 0,
            E = 0,
            ff = f;
          for (let t = 0; t < len; t++, ff += step) {
            const n = g[ff];
            if ((data[n] & OMEGA_MASK) === 1) A++;
            E += invLog[invLogBin(n)];
          }
          accLine(acc, A, E, len);
          accLine(overall, A, E, len);
          if (E > 0) {
            const z = (A - E) / Math.sqrt(E);
            const rec: LineRecord = { dir: Array.from(v), start: unflatten(box, f, startTmp).slice(), length: len, actual: A, expected: E, z };
            top.offer(rec);
            bottom.offer(rec);
          }
        }
      }
      // increment mixed-radix counter
      for (let i = 0; i < d; i++) {
        if (++c[i] <= R) break;
        c[i] = -R;
      }
    }
  });
  void side;
  const classStats = Array.from(classes.values())
    .map(finish)
    .sort((a, b) => a.nonzero - b.nonzero);
  return {
    d,
    R,
    N,
    minLen,
    maxNonzero,
    top: top.sorted(),
    bottom: bottom.sorted(),
    classes: classStats,
    overall: finish(overall),
    elapsedMs: performance.now() - t0,
  };
}

/** Attach the ray polynomial and Bateman–Horn constant to a line record. */
export function annotateLine(rec: LineRecord, d: number): LineRecord {
  const r = rayPolynomial(rec.start, rec.dir, d);
  if (!r) return rec;
  const bh = batemanHorn(r.poly, 1000);
  return { ...rec, poly: polyToString(r.poly), C: bh.C };
}

// ------------------------------------------------------------------ Riemann series

export function riemannSeries(box: Box, points = 1200, onProgress?: (f: number) => void): RiemannSeries {
  const { N, sv } = box;
  const data = sv.data;
  // sample x log-spaced between 100 and N
  const xs: number[] = [];
  const lo = Math.log(Math.min(100, N));
  const hi = Math.log(N);
  for (let i = 0; i < points; i++) {
    const x = Math.floor(Math.exp(lo + ((hi - lo) * i) / (points - 1)));
    if (xs.length === 0 || x > xs[xs.length - 1]) xs.push(x);
  }
  // prime powers p^k (k >= 2) up to N, with ln p
  const pp: { v: number; lp: number }[] = [];
  for (let p = 2; p * p <= N; p++) {
    if ((data[p] & OMEGA_MASK) !== 1) continue;
    for (let q = p * p; q <= N; q *= p) pp.push({ v: q, lp: Math.log(p) });
  }
  pp.sort((a, b) => a.v - b.v);
  const pi: number[] = [],
    lis: number[] = [],
    Rs: number[] = [],
    psi: number[] = [],
    M: number[] = [];
  let cntPi = 0,
    theta = 0,
    mert = 1,
    ppi = 0,
    ppSum = 0;
  let idx = 0;
  let nextReport = 0;
  for (let n = 2; n <= N && idx < xs.length; n++) {
    const b = data[n];
    const om = b & OMEGA_MASK;
    if (om === 1) {
      cntPi++;
      theta += Math.log(n);
    }
    if (!(b & 32)) mert += om % 2 === 0 ? 1 : -1;
    while (ppi < pp.length && pp[ppi].v <= n) ppSum += pp[ppi++].lp;
    while (idx < xs.length && xs[idx] === n) {
      pi.push(cntPi);
      lis.push(li(n));
      Rs.push(riemannR(n));
      psi.push(theta + ppSum);
      M.push(mert);
      idx++;
    }
    if (n > nextReport) {
      onProgress?.(n / N);
      nextReport = n + N / 40;
    }
  }
  return { N, x: xs.slice(0, pi.length), pi, li: lis, R: Rs, psi, M, primeCount: sv.primeCount };
}
