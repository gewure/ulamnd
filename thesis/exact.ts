/**
 * The C-versus-C² test done exactly. Theorem 5 (closed twin-prime-type formula for quadratics) makes
 * S_f(h) computable by sieving h and Q(h) = a²h² − D, with no Euler-product truncation: the only
 * truncated object is the absolutely convergent product P(1) = ∏ P_p (terms 1 + O(1/p²)), and C(f) is
 * computed through L(1,χ_{D₀}) (digamma formula) times an absolutely convergent correction.
 *
 * For each quadratic we compute Σ_f(H) = Σ_{h≤H}(S_f(h) − C²) at H = 10³,…,10⁶ and fit
 * slope := (Σ(10⁶) − Σ(10³))/log 10³ = −k·C^α across polynomials with C spanning more than a decade.
 * Conjecture 1 predicts α = 1 (and k → ½ slowly); the "C² law" predicts α = 2.
 *
 *   npx tsx thesis/exact.ts            (~ 2 min)
 */
import { writeFileSync } from "node:fs";
import { batemanHorn, pairSingularSeries, type IntPoly } from "../lib/poly";
import { smallPrimes } from "../lib/sieve";

const H = 1_000_000;
const CHECK = [1_000, 10_000, 100_000, 1_000_000];
const PGEN = Number(process.env.PGEN ?? 2_000_000); // truncation of the absolutely convergent products
// Tail of ∏_{p>PGEN} P_p: the split primes (density 1/2) contribute log P_p ≈ −4/p², so by the prime number
// theorem Σ_{p>P} log P_p ≈ −2 E₁(log P) ≈ −2/(P log P) ≈ −7e-8 at P = 2e6. Without this correction the
// truncation error δ enters Σ_{h≤H}(S_f(h) − C²) as a drift δ C² H (0.07 C² at H = 1e6) and biases the fitted
// exponent α towards 2. NOTAIL=1 reproduces the uncorrected computation.  (The analogous tail of the
// C(f) correction product is a character sum Σ_{p>P} χ(p)/p² with no main term; it is < 1e-10.)
const NOTAIL = process.env.NOTAIL === "1";
function expint1(y: number): number { return Math.exp(-y) * (1 / y - 1 / y ** 2 + 2 / y ** 3 - 6 / y ** 4 + 24 / y ** 5); }
const PGEN_TAIL = NOTAIL ? 1 : Math.exp(-2 * expint1(Math.log(PGEN)));
const OUT = process.env.EXACT_OUT ?? "thesis/exact.json";
const primes = smallPrimes(10_000_000);
const f3 = (x: number, k = 3) => x.toFixed(k);

// ---------------------------------------------------------------- number theory helpers
function powmod(b: number, e: number, m: number): number {
  let r = 1n;
  let bb = BigInt(b) % BigInt(m);
  let ee = BigInt(e);
  const mm = BigInt(m);
  while (ee > 0n) {
    if (ee & 1n) r = (r * bb) % mm;
    bb = (bb * bb) % mm;
    ee >>= 1n;
  }
  return Number(r);
}
function mulmod(a: number, b: number, m: number): number {
  return Number((BigInt(a) * BigInt(b)) % BigInt(m));
}
function legendre(a: number, p: number): number {
  a = ((a % p) + p) % p;
  if (a === 0) return 0;
  return powmod(a, (p - 1) / 2, p) === 1 ? 1 : -1;
}
/** Tonelli–Shanks: x with x² ≡ n (mod p), p odd prime, n a QR. */
function sqrtmod(n: number, p: number): number {
  n = ((n % p) + p) % p;
  if (p % 4 === 3) return powmod(n, (p + 1) / 4, p);
  let q = p - 1,
    s = 0;
  while (q % 2 === 0) {
    q /= 2;
    s++;
  }
  let z = 2;
  while (legendre(z, p) !== -1) z++;
  let m = s,
    c = powmod(z, q, p),
    t = powmod(n, q, p),
    r = powmod(n, (q + 1) / 2, p);
  while (t !== 1) {
    let i = 0,
      tt = t;
    while (tt !== 1) {
      tt = mulmod(tt, tt, p);
      i++;
    }
    let b = c;
    for (let j = 0; j < m - i - 1; j++) b = mulmod(b, b, p);
    m = i;
    c = mulmod(b, b, p);
    t = mulmod(t, c, p);
    r = mulmod(r, b, p);
  }
  return r;
}
function modinv(a: number, p: number): number {
  return powmod(((a % p) + p) % p, p - 2, p);
}
/** Kronecker symbol (D/n) for n ≥ 1. */
function kronecker(D: number, n: number): number {
  let res = 1;
  if (n === 0) return Math.abs(D) === 1 ? 1 : 0;
  while (n % 2 === 0) {
    n /= 2;
    if (D % 2 === 0) return 0;
    const m8 = ((D % 8) + 8) % 8;
    if (m8 === 3 || m8 === 5) res = -res;
  }
  // Jacobi symbol (D/n), n odd
  let a = ((D % n) + n) % n;
  let b = n;
  while (a !== 0) {
    while (a % 2 === 0) {
      a /= 2;
      const m8 = b % 8;
      if (m8 === 3 || m8 === 5) res = -res;
    }
    [a, b] = [b, a];
    if (a % 4 === 3 && b % 4 === 3) res = -res;
    a %= b;
  }
  return b === 1 ? res : 0;
}
function digamma(x: number): number {
  let r = 0;
  while (x < 12) {
    r -= 1 / x;
    x++;
  }
  const x2 = 1 / (x * x);
  return r + Math.log(x) - 0.5 / x - x2 * (1 / 12 - x2 * (1 / 120 - x2 * (1 / 252 - x2 * (1 / 240 - x2 * (1 / 132 - x2 * (691 / 32760 - x2 / 12))))));
}
/** L(1, χ_{D0}) for a fundamental discriminant D0: −(1/q) Σ_{a<q} χ(a) ψ(a/q). */
function L1(D0: number): number {
  const q = Math.abs(D0);
  let s = 0;
  for (let a = 1; a < q; a++) {
    const chi = kronecker(D0, a);
    if (chi) s += chi * digamma(a / q);
  }
  return -s / q;
}
function factorSmall(n: number): Map<number, number> {
  const m = new Map<number, number>();
  n = Math.abs(n);
  for (let p = 2; p * p <= n; p++) while (n % p === 0) {
    m.set(p, (m.get(p) ?? 0) + 1);
    n /= p;
  }
  if (n > 1) m.set(n, (m.get(n) ?? 0) + 1);
  return m;
}
function fundamental(D: number): number {
  let s = D < 0 ? -1 : 1;
  for (const [p, e] of factorSmall(D)) if (e % 2 === 1) s *= p;
  return ((s % 4) + 4) % 4 === 1 ? s : 4 * s;
}

// ---------------------------------------------------------------- one quadratic
type Quad = { a: number; b: number; c: number };
const name = (q: Quad) => `${q.a === 1 ? "" : q.a}t^2${q.b ? (q.b > 0 ? "+" : "") + (Math.abs(q.b) === 1 ? (q.b > 0 ? "" : "-") : q.b) + "t" : ""}${q.c ? (q.c > 0 ? "+" : "") + q.c : ""}`;
const evalf = (q: Quad, t: number) => q.a * t * t + q.b * t + q.c;
function omegaDirect(q: Quad, p: number): number {
  let c = 0;
  for (let t = 0; t < p; t++) if (((evalf(q, t) % p) + p) % p === 0) c++;
  return c;
}

/** Exact C(f) for an irreducible integer quadratic without fixed divisor. */
function constantC(q: Quad): { C: number; special: number[]; D: number } {
  const D = q.b * q.b - 4 * q.a * q.c;
  const D0 = fundamental(D);
  const special = Array.from(new Set([2, ...factorSmall(2 * q.a * D).keys()])).sort((x, y) => x - y);
  let C = 1 / L1(D0);
  for (const p of special) {
    C *= (1 - omegaDirect(q, p) / p) / (1 - 1 / p);
    C /= 1 - kronecker(D0, p) / p;
  }
  for (const p of primes) {
    if (p > PGEN) break;
    if (special.includes(p)) continue;
    const chi = legendre(D, p);
    if (chi === 0) throw new Error("p | D not special");
    C *= (1 - chi / (p - 1)) / (1 - chi / p);
  }
  return { C, special, D };
}

function run(q: Quad) {
  const { C, special, D } = constantC(q);
  // P_gen = ∏_{p ∤ 2aD} (1 − 2ω/p)/(1 − ω/p)², ω = 1 + χ_D(p): absolutely convergent
  let Pgen = 1;
  for (const p of primes) {
    if (p > PGEN) break;
    if (special.includes(p)) continue;
    const w = 1 + legendre(D, p);
    Pgen *= (1 - (2 * w) / p) / (1 - w / p) ** 2;
  }
  Pgen *= PGEN_TAIL;
  // special primes: exact local factor as a function of h mod p (ν_p(h) = #{t: p | f(t), p | f(t+h)})
  const specTab = special.map((p) => {
    const roots: number[] = [];
    for (let t = 0; t < p; t++) if (((evalf(q, t) % p) + p) % p === 0) roots.push(t);
    const isRoot = new Uint8Array(p);
    for (const t of roots) isRoot[t] = 1;
    const w = roots.length;
    const tab = new Float64Array(p);
    for (let h = 0; h < p; h++) {
      let nu = 0;
      for (const t of roots) if (isRoot[(t + h) % p]) nu++;
      tab[h] = (1 - (2 * w - nu) / p) / (1 - w / p) ** 2;
    }
    return { p, tab };
  });
  // multiplier per h: start with Pgen, multiply by ∏_{p|h}(p−ω)/(p−2ω) and ∏_{p|Q(h)}(p−3)/(p−4) for generic p.
  // Signed products throughout: (p−ω)/(p−2ω) = −1 at p = 3, ω = 2, and P_3 = −3 then; S_f(h) ≥ 0 in the end.
  const mult = new Float64Array(H + 1).fill(Pgen);
  // (i) generic primes dividing h
  for (const p of primes) {
    if (p > H) break;
    if (special.includes(p)) continue;
    const w = 1 + legendre(D, p);
    if (w === 0) continue; // (p−0)/(p−0) = 1
    const lf = (p - w) / (p - 2 * w);
    for (let h = p; h <= H; h += p) mult[h] *= lf;
  }
  // (ii) generic primes dividing Q(h) = a²h² − D: sieve with roots h ≡ ±√D / a (mod p), divide out, remainder is 1 or a prime
  const rem = new Float64Array(H + 1);
  for (let h = 1; h <= H; h++) rem[h] = Math.abs(q.a * q.a * h * h - D);
  const bound = Math.ceil(Math.sqrt(q.a * q.a * H * H + Math.abs(D))) + 1;
  if (bound > primes[primes.length - 1]) throw new Error("prime table too small");
  const l34 = (p: number) => (p - 3) / (p - 4);
  for (const p of primes) {
    if (p > bound) break;
    if (special.includes(p)) {
      // divide out special primes from the cofactor only (their local factor is in specTab)
      for (let h = 1; h <= H; h++) while (rem[h] % p === 0) rem[h] /= p;
      continue;
    }
    if (legendre(D, p) !== 1) continue; // p ∤ Q(h) for all h unless D is a square mod p
    const r = mulmod(sqrtmod(D, p), modinv(q.a, p), p);
    const lf = l34(p);
    for (const r0 of r === 0 ? [0] : [r, p - r]) {
      for (let h = r0 === 0 ? p : r0; h <= H; h += p) {
        // rem[h] is divisible by p; divide out completely
        let x = rem[h];
        while (x % p === 0) x /= p;
        rem[h] = x;
        mult[h] *= lf;
      }
    }
  }
  for (let h = 1; h <= H; h++) if (rem[h] > 1) mult[h] *= l34(rem[h]); // remaining cofactor > bound ≥ √Q is a prime
  // assemble Σ_f(H)
  const sums: number[] = [];
  let acc = 0,
    ci = 0;
  const C2 = C * C;
  for (let h = 1; h <= H; h++) {
    let s = C2 * mult[h];
    for (const { p, tab } of specTab) s *= tab[h % p];
    if (s < -1e-9) throw new Error(`negative S_f(${h})`);
    acc += s - C2;
    if (h === CHECK[ci]) {
      sums.push(acc);
      ci++;
    }
  }
  return { name: name(q), a: q.a, b: q.b, c: q.c, D, C, Pgen, sums, slope: (sums[3] - sums[0]) / Math.log(1000), slopes: sums.slice(1).map((s, i) => (s - sums[i]) / Math.log(10)) };
}

// ---------------------------------------------------------------- validation against the definition (truncated product, P = 20000)
function validate(q: Quad) {
  // Compare like with like: the definition truncated at p ≤ PV against the closed form with every product
  // truncated at the same PV (Pgen, and the factors (p−3)/(p−4) for p | Q(h) only for p ≤ PV). The ratio
  // must then be 1 to rounding. Separately report the exact C(f) against the truncated one.
  const PV = 20000;
  const f: IntPoly = { num: [BigInt(q.c), BigInt(q.b), BigInt(q.a)], den: 1n, degree: 2 };
  const CPV = batemanHorn(f, PV).C;
  const { C, special, D } = constantC(q);
  const Hv = 3000;
  const Sdef = pairSingularSeries(f, Hv, PV);
  let PgenV = 1;
  for (const p of primes) {
    if (p > PV) break;
    if (special.includes(p)) continue;
    const w = 1 + legendre(D, p);
    PgenV *= (1 - (2 * w) / p) / (1 - w / p) ** 2;
  }
  let maxDev = 0,
    nVanish = 0;
  for (let h = 1; h <= Hv; h++) {
    let s = CPV * CPV * PgenV;
    for (const p of special) {
      const roots: number[] = [];
      for (let t = 0; t < p; t++) if (((evalf(q, t) % p) + p) % p === 0) roots.push(t);
      let nu = 0;
      for (const t of roots) if (roots.includes((t + h) % p)) nu++;
      const w = roots.length;
      s *= (1 - (2 * w - nu) / p) / (1 - w / p) ** 2;
    }
    for (const [p] of factorSmall(h)) if (!special.includes(p)) {
      const w = 1 + legendre(D, p);
      s *= (p - w) / (p - 2 * w);
    }
    let Q = Math.abs(q.a * q.a * h * h - D);
    for (const p of special) while (Q % p === 0) Q /= p;
    for (const [p] of factorSmall(Q)) if (p <= PV) s *= (p - 3) / (p - 4);
    if (Sdef[h - 1] > 1e-12) maxDev = Math.max(maxDev, Math.abs(s / Sdef[h - 1] - 1));
    else {
      if (Math.abs(s) > 1e-12) throw new Error(`vanishing mismatch at h=${h}`);
      nVanish++;
    }
  }
  return { C, Ctrunc: batemanHorn(f, 200000).C, maxDev, nVanish };
}

// ---------------------------------------------------------------- candidate pool → 25 quadratics spanning C
function ok(q: Quad): boolean {
  const D = q.b * q.b - 4 * q.a * q.c;
  if (D === 0) return false;
  const s = Math.round(Math.sqrt(Math.abs(D)));
  if (D > 0 && s * s === D) return false; // reducible
  if (q.a > 8) return false;
  for (const p of [2, 3, 5, 7]) if (omegaDirect(q, p) === p) return false; // fixed divisor
  if (Math.abs(D) > 4000) return false; // keep L(1,χ) cheap and special primes few
  return true;
}
const pool: Quad[] = [];
for (const a of [1, 2, 3, 5, 7]) for (let b = -6; b <= 6; b++) for (let c = -40; c <= 40; c++) {
  const q = { a, b, c };
  if (ok(q)) pool.push(q);
}
console.log(`pool: ${pool.length} quadratics`);
// cheap C estimate for ranking only (Legendre symbols with number arithmetic, p ≤ 3000)
const smallLegendre = (a: number, p: number) => {
  a = ((a % p) + p) % p;
  if (a === 0) return 0;
  let r = 1,
    b = a,
    e = (p - 1) / 2;
  while (e > 0) {
    if (e & 1) r = (r * b) % p;
    b = (b * b) % p;
    e >>= 1;
  }
  return r === 1 ? 1 : -1;
};
const roughC = (q: Quad) => {
  const D = q.b * q.b - 4 * q.a * q.c;
  let C = 1;
  for (const p of primes) {
    if (p > 3000) break;
    const w = (2 * q.a * D) % p === 0 ? omegaDirect(q, p) : 1 + smallLegendre(D, p);
    C *= (1 - w / p) / (1 - 1 / p);
  }
  return C;
};
const withC = pool.map((q) => ({ q, C: roughC(q) }));
withC.sort((x, y) => x.C - y.C);
// pick 25 spanning log C uniformly, always including the named ones
const named: Quad[] = [{ a: 1, b: 1, c: 41 }, { a: 1, b: 0, c: 1 }, { a: 1, b: 1, c: 17 }, { a: 1, b: 0, c: -2 }, { a: 1, b: 1, c: 11 }, { a: 2, b: 0, c: 1 }];
const chosen: Quad[] = [...named];
const lo = Math.log(withC[0].C),
  hi = Math.log(withC[withC.length - 1].C);
for (let i = 0; i < 19; i++) {
  const target = lo + ((hi - lo) * (i + 0.5)) / 19;
  let best = withC[0];
  for (const x of withC) if (Math.abs(Math.log(x.C) - target) < Math.abs(Math.log(best.C) - target) && !chosen.some((c) => c.a === x.q.a && c.b === x.q.b && c.c === x.q.c)) best = x;
  chosen.push(best.q);
}

// ---------------------------------------------------------------- validation
const v1 = validate({ a: 1, b: 0, c: 1 }),
  v2 = validate({ a: 1, b: 1, c: 41 }),
  v3 = validate({ a: 3, b: 2, c: 5 }),
  v4 = validate({ a: 2, b: 1, c: 3 });
console.log("validation (closed form vs definition, both truncated at p ≤ 20000, h ≤ 3000): max |ratio − 1| =", [v1, v2, v3, v4].map((v) => v.maxDev.toExponential(2)).join(", "), " vanishing h:", [v1, v2, v3, v4].map((v) => v.nVanish).join(", "));
console.log("C exact vs truncated(2e5):", [v1, v2, v3, v4].map((v) => `${f3(v.C, 5)}/${f3(v.Ctrunc, 5)}`).join("  "));

// ---------------------------------------------------------------- main run
const recs: ReturnType<typeof run>[] = [];
for (const q of chosen) {
  const t0 = performance.now();
  const r = run(q);
  recs.push(r);
  console.log(`${r.name.padEnd(14)} C=${f3(r.C, 4)} Σ(1e3..1e6)=${r.sums.map((s) => f3(s, 2)).join(" ")} slope/C=${f3(r.slope / r.C)} per-decade/C=${r.slopes.map((s) => f3(s / r.C, 2)).join(",")} (${((performance.now() - t0) / 1000).toFixed(1)}s)`);
}
recs.sort((x, y) => x.C - y.C);
const Cs_ = recs.map((r) => r.C);
// fit log(−slope) = log k + α log C
const xs = recs.map((r) => Math.log(r.C)),
  ys = recs.map((r) => Math.log(-r.slope));
const n = xs.length,
  mx = xs.reduce((a, b) => a + b) / n,
  my = ys.reduce((a, b) => a + b) / n;
let sxx = 0,
  sxy = 0;
for (let i = 0; i < n; i++) {
  sxx += (xs[i] - mx) ** 2;
  sxy += (xs[i] - mx) * (ys[i] - my);
}
const alphaLog = sxy / sxx,
  logk = my - alphaLog * mx;
let rss = 0;
for (let i = 0; i < n; i++) rss += (ys[i] - logk - alphaLog * xs[i]) ** 2;
const seAlphaLog = Math.sqrt(rss / (n - 2) / sxx);
const kLog = Math.exp(logk);
// direct nonlinear least squares slope_i = −k C_i^α (robust to a positive slope, which the log fit cannot take):
// for each α the optimal k is closed-form; scan α, then standard errors from the Jacobian.
const slopes = recs.map((r) => r.slope);
let best = { alpha: 0, k: 0, rss: Infinity };
for (let a = 0; a <= 3; a += 0.0005) {
  const ca = Cs_.map((c) => c ** a);
  const kk = -ca.reduce((acc, v, i) => acc + v * slopes[i], 0) / ca.reduce((acc, v) => acc + v * v, 0);
  const r2 = slopes.reduce((acc, sl, i) => acc + (sl + kk * ca[i]) ** 2, 0);
  if (r2 < best.rss) best = { alpha: a, k: kk, rss: r2 };
}
const alpha = best.alpha,
  k = best.k;
let seAlpha = 0,
  seK = 0;
{
  // covariance σ² (JᵀJ)⁻¹, J_i = (∂/∂k, ∂/∂α) of −k C^α
  let jkk = 0,
    jka = 0,
    jaa = 0;
  for (let i = 0; i < n; i++) {
    const ca = Cs_[i] ** alpha,
      dk = -ca,
      da = -k * ca * Math.log(Cs_[i]);
    jkk += dk * dk;
    jka += dk * da;
    jaa += da * da;
  }
  const s2 = best.rss / (n - 2);
  const det = jkk * jaa - jka * jka;
  seAlpha = Math.sqrt((s2 * jkk) / det);
  seK = Math.sqrt((s2 * jaa) / det);
}
const corr = (u: number[], w: number[]) => {
  const mu = u.reduce((a, b) => a + b) / u.length,
    mw = w.reduce((a, b) => a + b) / w.length;
  let suw = 0,
    suu = 0,
    sww = 0;
  for (let i = 0; i < u.length; i++) {
    suw += (u[i] - mu) * (w[i] - mw);
    suu += (u[i] - mu) ** 2;
    sww += (w[i] - mw) ** 2;
  }
  return suw / Math.sqrt(suu * sww);
};
const Cs = recs.map((r) => r.C);
const sC = recs.map((r) => r.slope / r.C),
  sC2 = recs.map((r) => r.slope / r.C ** 2);
const mean = (u: number[]) => u.reduce((a, b) => a + b) / u.length;
const sd = (u: number[]) => Math.sqrt(mean(u.map((x) => (x - mean(u)) ** 2)));
const fit = {
  n,
  seK,
  alphaLog,
  seAlphaLog,
  kLog,
  Cmin: Cs[0],
  Cmax: Cs[n - 1],
  alpha,
  seAlpha,
  k,
  sigmaFrom1: (alpha - 1) / seAlpha,
  sigmaFrom2: (alpha - 2) / seAlpha,
  corrC: corr(sC, Cs),
  corrC2: corr(sC2, Cs),
  meanSlopeC: mean(sC),
  sdSlopeC: sd(sC),
  meanSlopeC2: mean(sC2),
  sdSlopeC2: sd(sC2),
  decade: [0, 1, 2].map((i) => ({ mean: mean(recs.map((r) => r.slopes[i] / r.C)), sd: sd(recs.map((r) => r.slopes[i] / r.C)) })),
};
console.log(`\nfit slope = −k C^α over ${n} quadratics, C ∈ [${f3(Cs[0], 2)}, ${f3(Cs[n - 1], 2)}]:`);
console.log(`  α = ${f3(alpha)} ± ${f3(seAlpha)}   k = ${f3(k)} ± ${f3(seK)}   (α=1: ${f3(fit.sigmaFrom1, 1)} se;  α=2: ${f3(fit.sigmaFrom2, 1)} se)`);
console.log(`  [log-fit for comparison: α = ${f3(fit.alphaLog)} ± ${f3(seAlphaLog)}, k = ${f3(kLog)}]`);
console.log(`  corr(slope/C, C) = ${f3(fit.corrC, 2)}   corr(slope/C², C) = ${f3(fit.corrC2, 2)}`);
console.log(`  slope/C = ${f3(fit.meanSlopeC)} ± ${f3(fit.sdSlopeC)}   slope/C² = ${f3(fit.meanSlopeC2)} ± ${f3(fit.sdSlopeC2)}`);
console.log(`  per-decade slope/C: ${fit.decade.map((d) => `${f3(d.mean)}±${f3(d.sd)}`).join("  ")}`);
writeFileSync(OUT, JSON.stringify({ H, CHECK, PGEN, NOTAIL, PGEN_TAIL, validation: [v1, v2, v3, v4], fit, recs }, null, 1));
if (OUT === "thesis/exact.json") writeFileSync("paper/data/exact.dat", "C slope slopeC slopeC2\n" + recs.map((r) => `${r.C} ${r.slope} ${r.slope / r.C} ${r.slope / r.C ** 2}`).join("\n") + "\n");
if (OUT === "thesis/exact.json") writeFileSync(
  "paper/data/exact-rows.tex",
  recs.map((r) => `$${r.name.replace(/\^2/g, "^{2}")}$ & ${r.D} & ${f3(r.C)} & ${f3(r.sums[0], 2)} & ${f3(r.sums[3], 2)} & ${f3(r.slope / r.C)} & ${f3(r.slope / r.C ** 2)} \\\\`).join("\n") + "\n\\bottomrule\n",
);
