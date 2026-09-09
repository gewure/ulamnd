/** Shared message and result types between the UI and the worker. */

export interface RayAnalysis {
  sign: 1 | -1;
  /** first step index from which the sequence is exactly polynomial */
  t0: number;
  degree: number;
  poly: string;
  /** coefficients as decimal strings (lowest degree first) and denominator, for re-evaluation */
  num: string[];
  den: string;
  C: number;
  fixedDivisor: number | null;
  /** "yes": proven reducible over Q (square discriminant / perfect square); "likely": C > 0 but no prime value found; "no": takes prime values */
  reducible: "yes" | "likely" | "no";
  localDensities: { p: number; density: number }[];
  /** extrapolation along the polynomial beyond the box, t in [t0, t0 + extT) */
  extT: number;
  extActual: number;
  extPredicted: number;
  extNaive: number;
  extDeterministic: boolean;
  /** first few values f(t0), f(t0+1), ... with primality */
  samples: { t: number; value: string; prime: boolean }[];
}

export interface LineAnalysis {
  dir: number[];
  nonzero: number;
  /** all points of the line inside the box */
  points: number;
  actual: number;
  expected: number;
  z: number;
  rays: RayAnalysis[];
}

export interface PointAnalysis {
  n: number;
  coords: number[];
  isPrime: boolean;
  factorization: string;
  omega: number;
  shell: number;
  lines: LineAnalysis[];
}

export interface LineRecord {
  dir: number[];
  start: number[];
  length: number;
  actual: number;
  expected: number;
  z: number;
  /** filled lazily */
  poly?: string;
  C?: number;
}

export interface ClassStats {
  nonzero: number;
  directions: number;
  lines: number;
  points: number;
  actual: number;
  expected: number;
  /** Σ (A-E)^2 / E  divided by (lines - 1): 1 = Poisson-like, > 1 = structured */
  dispersion: number;
  /** lines with no primes vs Σ exp(-E) */
  emptyLines: number;
  emptyExpected: number;
  /** histogram of z = (A-E)/√E in bins of width 0.25 from -6 to 6 */
  zHist: number[];
  meanZ: number;
  sdZ: number;
}

export interface LeaderboardResult {
  d: number;
  R: number;
  N: number;
  minLen: number;
  maxNonzero: number;
  top: LineRecord[];
  bottom: LineRecord[];
  classes: ClassStats[];
  overall: ClassStats;
  elapsedMs: number;
}

export interface RiemannSeries {
  N: number;
  x: number[];
  pi: number[];
  li: number[];
  R: number[];
  psi: number[];
  M: number[];
  primeCount: number;
}

export interface CompareEntry {
  d: number;
  R: number;
  N: number;
  primeCount: number;
  primeDensity: number;
  leaderboard: LeaderboardResult;
  topLines: LineRecord[];
}

export interface CompareResult {
  targetN: number;
  entries: CompareEntry[];
}

export interface CloudData {
  count: number;
  pos: Int16Array;
  n: Uint32Array;
}

export interface DiffractionData {
  size: number;
  logPower: Float32Array;
  autocorr: Float32Array;
  maxLogPower: number;
  peaks: { fx: number; fy: number; power: number }[];
  primesInWindow: number;
}

export interface BuildResult {
  d: number;
  R: number;
  N: number;
  primeCount: number;
  elapsedMs: number;
}

export type WorkerRequest =
  | { type: "build"; id: number; d: number; R: number }
  | { type: "slice"; id: number; axes: [number, number]; fixed: number[] }
  | { type: "cloud"; id: number; axes: [number, number, number]; fixed: number[] }
  | { type: "point"; id: number; coords: number[]; maxNonzero: number; extT: number }
  | { type: "leaderboard"; id: number; maxNonzero: number; minLen: number; topK: number }
  | { type: "diffraction"; id: number; axes: [number, number]; fixed: number[]; size: number }
  | { type: "riemann"; id: number }
  | { type: "compare"; id: number; dims: number[]; targetN: number; maxNonzero: number; minLen: number };

export type WorkerResponse =
  | { type: "progress"; id: number; frac: number; label: string }
  | { type: "result"; id: number; data: unknown }
  | { type: "error"; id: number; message: string };
