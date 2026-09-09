/**
 * Exact polynomial detection (finite differences over BigInt), rational
 * coefficient recovery, Bateman–Horn / Hardy–Littlewood singular series, and
 * deterministic Miller–Rabin for extrapolating along a line beyond the sieve.
 */
import { smallPrimes } from "./sieve";

export interface IntPoly {
  /** numerator coefficients, lowest degree first: f(t) = (Σ num[i] t^i) / den */
  num: bigint[];
  den: bigint;
  degree: number;
}

export function bigAbs(x: bigint): bigint {
  return x < 0n ? -x : x;
}
export function bigGcd(a: bigint, b: bigint): bigint {
  a = bigAbs(a);
  b = bigAbs(b);
  while (b) {
    const t = a % b;
    a = b;
    b = t;
  }
  return a;
}

function factorialBig(n: number): bigint {
  let r = 1n;
  for (let i = 2; i <= n; i++) r *= BigInt(i);
  return r;
}

/**
 * Detect the lowest-degree polynomial (degree <= maxDeg) that fits the whole
 * sequence exactly. Returns null if no such polynomial exists.
 * Requires seq.length >= maxDeg + 3 for a meaningful verification.
 */
export function detectPolynomial(seq: bigint[], maxDeg: number): IntPoly | null {
  const n = seq.length;
  if (n < maxDeg + 3) return null;
  // difference table; diffs[r][0] is Δ^r a_0
  let row = seq.slice();
  const leading: bigint[] = [row[0]];
  for (let r = 1; r <= maxDeg + 1; r++) {
    const next: bigint[] = new Array(row.length - 1);
    let allZero = true;
    for (let i = 0; i < row.length - 1; i++) {
      next[i] = row[i + 1] - row[i];
      if (next[i] !== 0n) allZero = false;
    }
    if (allZero) {
      // degree r-1 polynomial. Need at least 2 zero differences to trust it.
      if (next.length < 2) return null;
      return newtonToMonomial(leading);
    }
    leading.push(next[0]);
    row = next;
  }
  return null;
}

/** Convert Newton forward-difference form  Σ Δ^r a_0 · C(t, r)  into monomial form. */
function newtonToMonomial(leading: bigint[]): IntPoly {
  const deg = leading.length - 1;
  const D = factorialBig(deg);
  // g(t) = D * f(t) = Σ_r Δ^r a_0 * (D / r!) * t(t-1)...(t-r+1)
  const coeffs: bigint[] = new Array(deg + 1).fill(0n);
  // falling factorial polynomial as coefficient array
  let ff: bigint[] = [1n]; // t^(0 falling) = 1
  for (let r = 0; r <= deg; r++) {
    const scale = (leading[r] * D) / factorialBig(r);
    for (let i = 0; i < ff.length; i++) coeffs[i] += scale * ff[i];
    // multiply ff by (t - r)
    const nf: bigint[] = new Array(ff.length + 1).fill(0n);
    for (let i = 0; i < ff.length; i++) {
      nf[i + 1] += ff[i];
      nf[i] -= BigInt(r) * ff[i];
    }
    ff = nf;
  }
  // reduce
  let g = D;
  for (const c of coeffs) g = bigGcd(g, c);
  if (g === 0n) g = 1n;
  const num = coeffs.map((c) => c / g);
  let den = D / g;
  if (den < 0n) {
    den = -den;
    for (let i = 0; i < num.length; i++) num[i] = -num[i];
  }
  let degree = num.length - 1;
  while (degree > 0 && num[degree] === 0n) degree--;
  return { num: num.slice(0, degree + 1), den, degree };
}

/** Return q with q(t) = p(t - shift), i.e. re-index a polynomial detected on a subsequence starting at t = shift. */
export function shiftPoly(p: IntPoly, shift: number): IntPoly {
  const s = BigInt(shift);
  const out: bigint[] = new Array(p.num.length).fill(0n);
  // (t - s)^i expanded with binomials
  for (let i = 0; i < p.num.length; i++) {
    const c = p.num[i];
    if (c === 0n) continue;
    let binom = 1n;
    for (let j = 0; j <= i; j++) {
      // coefficient of t^(i-j): C(i,j) * (-s)^j
      let pw = 1n;
      for (let k = 0; k < j; k++) pw *= -s;
      out[i - j] += c * binom * pw;
      binom = (binom * BigInt(i - j)) / BigInt(j + 1);
    }
  }
  return { num: out, den: p.den, degree: p.degree };
}

export function evalPoly(p: IntPoly, t: bigint): bigint {
  let acc = 0n;
  for (let i = p.num.length - 1; i >= 0; i--) acc = acc * t + p.num[i];
  return acc / p.den;
}

export function polyToString(p: IntPoly, v = "t"): string {
  const terms: string[] = [];
  for (let i = p.num.length - 1; i >= 0; i--) {
    const c = p.num[i];
    if (c === 0n) continue;
    const a = bigAbs(c);
    const sign = c < 0n ? "−" : "+";
    let body: string;
    if (i === 0) body = a.toString();
    else {
      const coef = a === 1n ? "" : a.toString();
      body = coef + v + (i === 1 ? "" : superscript(i));
    }
    terms.push((terms.length === 0 ? (c < 0n ? "−" : "") : ` ${sign} `) + body);
  }
  const inner = terms.length ? terms.join("") : "0";
  return p.den === 1n ? inner : `(${inner}) / ${p.den}`;
}

function superscript(i: number): string {
  const map: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹" };
  return String(i)
    .split("")
    .map((ch) => map[ch])
    .join("");
}

function vp(n: bigint, p: bigint): number {
  let v = 0;
  while (n % p === 0n) {
    n /= p;
    v++;
  }
  return v;
}

let primeCache: number[] | null = null;
function primesUpTo(P: number): number[] {
  if (!primeCache || primeCache[primeCache.length - 1] < P) primeCache = smallPrimes(Math.max(P, 5000));
  return primeCache.filter((p) => p <= P);
}

export interface BatemanHorn {
  /** Hardy–Littlewood / Bateman–Horn constant C(f) = Π_p (1 - ω(p)/p) / (1 - 1/p) truncated at p <= P. */
  C: number;
  P: number;
  /** a prime p with ω(p)/p = 1, i.e. p divides f(t) for every t; then f is prime at most once. */
  fixedDivisor: number | null;
  /** density of t with p | f(t), for the first few primes */
  localDensities: { p: number; density: number }[];
}

/**
 * Compute the singular series of an integer-valued polynomial given as num/den.
 * Density of {t : p | f(t)} is computed exactly with period p^(v_p(den)+1).
 */
export function batemanHorn(f: IntPoly, P = 2000): BatemanHorn {
  const primes = primesUpTo(P);
  let C = 1;
  let fixedDivisor: number | null = null;
  const localDensities: { p: number; density: number }[] = [];
  for (const p of primes) {
    const pb = BigInt(p);
    const v = vp(f.den, pb);
    let M = p;
    for (let i = 0; i < v; i++) M *= p;
    const Mb = BigInt(M);
    // reduce coefficients mod M
    const coef = f.num.map((c) => Number(((c % Mb) + Mb) % Mb));
    let count = 0;
    for (let t = 0; t < M; t++) {
      let acc = 0;
      for (let i = coef.length - 1; i >= 0; i--) acc = (acc * t + coef[i]) % M;
      if (acc === 0) count++;
    }
    const density = count / M;
    if (localDensities.length < 12) localDensities.push({ p, density });
    if (density >= 1) {
      fixedDivisor = fixedDivisor ?? p;
      C = 0;
    }
    if (C !== 0) C *= (1 - density) / (1 - 1 / p);
  }
  return { C, P, fixedDivisor, localDensities };
}

/**
 * Hardy–Littlewood pair singular series along a polynomial:
 *   S_f(h) = Π_p (1 − ω₂(p,h)/p) / (1 − 1/p)²,   ω₂(p,h) = #{t mod p : p | f(t) f(t+h)},
 * for h = 1..H (index h-1), truncated at p <= P. Exact periods p^(v_p(den)+1) are used.
 * S_f(h) / C(f)² is the correlation factor for f(t) and f(t+h) both being prime.
 */
export function pairSingularSeries(f: IntPoly, H: number, P = 2000): Float64Array {
  const primes = primesUpTo(P);
  const logS = new Float64Array(H); // accumulate log S_f(h)
  for (const p of primes) {
    const pb = BigInt(p);
    const v = vp(f.den, pb);
    let M = p;
    for (let i = 0; i < v; i++) M *= p;
    const Mb = BigInt(M);
    const coef = f.num.map((c) => Number(((c % Mb) + Mb) % Mb));
    const isRoot = new Uint8Array(M);
    const roots: number[] = [];
    for (let t = 0; t < M; t++) {
      let acc = 0;
      for (let i = coef.length - 1; i >= 0; i--) acc = (acc * t + coef[i]) % M;
      if (acc === 0) {
        isRoot[t] = 1;
        roots.push(t);
      }
    }
    const base = -2 * Math.log(1 - 1 / p);
    // factor depends on h mod M
    const fac = new Float64Array(M);
    for (let r = 0; r < M; r++) {
      let overlap = 0;
      for (const t of roots) if (isRoot[(t + r) % M]) overlap++;
      const dens2 = (2 * roots.length - overlap) / M;
      fac[r] = dens2 >= 1 ? -Infinity : Math.log(1 - dens2) + base;
    }
    for (let h = 1; h <= H; h++) logS[h - 1] += fac[h % M];
  }
  const S = new Float64Array(H);
  for (let i = 0; i < H; i++) S[i] = Math.exp(logS[i]);
  return S;
}

// ------------------------------------------------------------ reducibility

export function bigSqrt(n: bigint): bigint {
  if (n < 0n) throw new Error("negative");
  if (n < 2n) return n;
  let x = BigInt(Math.floor(Math.sqrt(Number(n))));
  // Newton refinement
  for (let i = 0; i < 100; i++) {
    const y = (x + n / x) >> 1n;
    if (y === x || y === x + 1n || y === x - 1n) {
      x = y;
      break;
    }
    x = y;
  }
  while (x * x > n) x--;
  while ((x + 1n) * (x + 1n) <= n) x++;
  return x;
}

/**
 * Cheap exact reducibility tests over Q: square discriminant for quadratics, and
 * "f(t) is a perfect square at 12 consecutive integers" (then f = g^2) for any degree.
 * Returns true only when reducibility is certain.
 */
export function isCertainlyReducible(p: IntPoly, from = 0): boolean {
  if (p.degree === 2) {
    const [c, b, a] = [p.num[0], p.num[1] ?? 0n, p.num[2] ?? 0n];
    const disc = b * b - 4n * a * c;
    if (disc < 0n) return false;
    const r = bigSqrt(disc);
    return r * r === disc;
  }
  if (p.degree % 2 === 0 && p.degree >= 4) {
    for (let t = from; t < from + 12; t++) {
      const v = evalPoly(p, BigInt(t));
      if (v < 0n) return false;
      const r = bigSqrt(v);
      if (r * r !== v) return false;
    }
    return true;
  }
  return false;
}

// ------------------------------------------------------------ Miller–Rabin

const MR_BASES = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];
const MR_DETERMINISTIC_BOUND = 318665857834031151167461n; // ~3.3e23 (Sorenson–Webster)
const SMALL = smallPrimes(1000);

function modPow(b: bigint, e: bigint, m: bigint): bigint {
  let r = 1n;
  b %= m;
  while (e > 0n) {
    if (e & 1n) r = (r * b) % m;
    b = (b * b) % m;
    e >>= 1n;
  }
  return r;
}

/** Deterministic below ~3.3e23, otherwise a very strong probable-prime test. */
export function isPrimeBig(n: bigint): boolean {
  if (n < 2n) return false;
  for (const p of SMALL) {
    const pb = BigInt(p);
    if (n === pb) return true;
    if (n % pb === 0n) return false;
  }
  let d = n - 1n;
  let s = 0;
  while ((d & 1n) === 0n) {
    d >>= 1n;
    s++;
  }
  outer: for (const a of MR_BASES) {
    if (a % n === 0n) continue;
    let x = modPow(a, d, n);
    if (x === 1n || x === n - 1n) continue;
    for (let i = 1; i < s; i++) {
      x = (x * x) % n;
      if (x === n - 1n) continue outer;
    }
    return false;
  }
  return true;
}

export function isDeterministic(n: bigint): boolean {
  return n < MR_DETERMINISTIC_BOUND;
}

/** ln of a BigInt (approximate, fine for 1/ln weights). */
export function lnBig(n: bigint): number {
  if (n <= 0n) return NaN;
  const s = n.toString();
  if (s.length < 16) return Math.log(Number(n));
  const head = Number(s.slice(0, 15));
  return Math.log(head) + (s.length - 15) * Math.LN10;
}
