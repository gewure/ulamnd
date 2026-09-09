/**
 * Analytic number theory helpers used by the Riemann panel:
 *   li(x), Riemann's R(x), ζ(1/2+it) on the critical line (Borwein's algorithm),
 *   the Riemann–Siegel theta function, Hardy's Z(t), zero finding by sign change,
 *   and the explicit formula for Chebyshev's ψ(x).
 */

export const EULER_GAMMA = 0.5772156649015329;

/** Logarithmic integral li(x) via the Ramanujan series (fast, accurate for x >= 2). */
export function li(x: number): number {
  if (x <= 1) return x === 1 ? -Infinity : NaN;
  const L = Math.log(x);
  // Ramanujan: li(x) = γ + ln L + √x Σ_{n≥1} (-1)^{n-1} L^n / (n! 2^{n-1}) Σ_{k=0}^{⌊(n-1)/2⌋} 1/(2k+1)
  let sum = 0;
  let term = 1; // L^n / (n! 2^{n-1}) accumulates
  let inner = 0;
  for (let n = 1; n < 200; n++) {
    term *= L / n;
    if (n > 1) term /= 2;
    if ((n - 1) % 2 === 0) inner += 1 / (n); // adds 1/(2k+1) with 2k+1 = n when n odd
    const t = (n % 2 === 1 ? 1 : -1) * term * inner;
    sum += t;
    if (Math.abs(t) < 1e-17 * Math.abs(sum) && n > 10) break;
  }
  return EULER_GAMMA + Math.log(L) + Math.sqrt(x) * sum;
}

/** ζ(m) for real m >= 2. */
function zetaReal(m: number): number {
  const N = 2000;
  let s = 0;
  for (let n = 1; n <= N; n++) s += Math.pow(n, -m);
  // Euler–Maclaurin tail
  s += Math.pow(N, 1 - m) / (m - 1) - 0.5 * Math.pow(N, -m) + (m / 12) * Math.pow(N, -m - 1);
  return s;
}
const zetaCache: number[] = [];
function zetaInt(k: number): number {
  if (zetaCache[k] === undefined) zetaCache[k] = zetaReal(k);
  return zetaCache[k];
}

/** Riemann's prime counting function R(x) via the Gram series. */
export function riemannR(x: number): number {
  if (x < 2) return x < 1 ? 0 : 1;
  const L = Math.log(x);
  let sum = 1;
  let term = 1;
  for (let k = 1; k < 300; k++) {
    term *= L / k;
    const t = term / (k * zetaInt(k + 1));
    sum += t;
    if (t < 1e-16 * sum) break;
  }
  return sum;
}

// --------------------------------------------------------- ζ on the critical line

/** Borwein's algorithm 2 for the alternating zeta (eta) function; returns ζ(1/2 + it) as [re, im]. */
export function zetaCritical(t: number): [number, number] {
  const at = Math.abs(t);
  const n = Math.min(380, Math.ceil((at * Math.PI * 0.5 + Math.log(3 * (1 + 2 * at)) + 38) / Math.log(3 + Math.sqrt(8))) + 4);
  // d_k coefficients
  const d = new Float64Array(n + 1);
  let term = 1 / n; // i = 0 term: (n-1)!/(n! 0!) = 1/n
  let acc = term;
  d[0] = n * acc;
  for (let i = 1; i <= n; i++) {
    term *= ((n + i - 1) * 4 * (n - i + 1)) / (2 * i * (2 * i - 1));
    acc += term;
    d[i] = n * acc;
  }
  const dn = d[n];
  const sigma = 0.5;
  let re = 0,
    im = 0;
  for (let k = 0; k < n; k++) {
    const w = ((k % 2 === 0 ? 1 : -1) * (d[k] - dn)) / dn; // note sign: -(−1)^k (d_k − d_n)/d_n
    const lk = Math.log(k + 1);
    const mag = Math.exp(-sigma * lk);
    const ang = -t * lk;
    re += -w * mag * Math.cos(ang);
    im += -w * mag * Math.sin(ang);
  }
  // η(s) = (re, im); ζ = η / (1 - 2^{1-s}),  2^{1-s} = 2^{1/2} e^{-i t ln 2}
  const m = Math.SQRT2;
  const a = 1 - m * Math.cos(-t * Math.LN2);
  const b = -m * Math.sin(-t * Math.LN2);
  const den = a * a + b * b;
  return [(re * a + im * b) / den, (im * a - re * b) / den];
}

/** Riemann–Siegel theta function (Stirling, accurate for t > ~5). */
export function rsTheta(t: number): number {
  return (t / 2) * Math.log(t / (2 * Math.PI)) - t / 2 - Math.PI / 8 + 1 / (48 * t) + 7 / (5760 * t * t * t);
}

/** Hardy's Z(t) = e^{iθ(t)} ζ(1/2 + it), real for real t. */
export function hardyZ(t: number): number {
  const [re, im] = zetaCritical(t);
  const th = rsTheta(t);
  return re * Math.cos(th) - im * Math.sin(th);
}

/** Zeros of ζ on the critical line in (tMin, tMax) by sign changes of Z and bisection. */
export function findZeros(tMin: number, tMax: number, step = 0.05): number[] {
  const zeros: number[] = [];
  let tPrev = Math.max(tMin, 1);
  let zPrev = hardyZ(tPrev);
  for (let t = tPrev + step; t <= tMax; t += step) {
    const z = hardyZ(t);
    if ((zPrev < 0 && z > 0) || (zPrev > 0 && z < 0)) {
      let lo = tPrev,
        hi = t,
        zlo = zPrev;
      for (let i = 0; i < 40; i++) {
        const mid = 0.5 * (lo + hi);
        const zm = hardyZ(mid);
        if ((zlo < 0 && zm < 0) || (zlo > 0 && zm > 0)) {
          lo = mid;
          zlo = zm;
        } else hi = mid;
      }
      zeros.push(0.5 * (lo + hi));
    }
    tPrev = t;
    zPrev = z;
  }
  return zeros;
}

/**
 * Explicit formula for ψ(x) with the first K zero pairs 1/2 ± iγ:
 *   ψ(x) = x − Σ_ρ x^ρ/ρ − ln 2π − ½ ln(1 − x^{-2})
 */
export function psiExplicit(x: number, gammas: number[], K: number): number {
  if (x <= 1) return 0;
  const L = Math.log(x);
  const sx = Math.sqrt(x);
  let s = 0;
  for (let i = 0; i < K && i < gammas.length; i++) {
    const g = gammas[i];
    s += (2 * sx * (0.5 * Math.cos(g * L) + g * Math.sin(g * L))) / (0.25 + g * g);
  }
  return x - s - Math.log(2 * Math.PI) - 0.5 * Math.log(1 - 1 / (x * x));
}

/** Schoenfeld's RH-equivalent bounds. */
export function schoenfeldPi(x: number): number {
  return (Math.sqrt(x) * Math.log(x)) / (8 * Math.PI);
}
export function schoenfeldPsi(x: number): number {
  const L = Math.log(x);
  return (Math.sqrt(x) * L * L) / (8 * Math.PI);
}
