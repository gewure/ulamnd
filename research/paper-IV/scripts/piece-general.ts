import { writeFileSync } from "node:fs";
import { smallPrimes } from "../../lib/sieve";

const H = Number(process.env.Y ?? 10_000_000);
const PGEN = Number(process.env.PGEN ?? 2_000_000); // truncation of the absolutely convergent products
// Tail of ∏_{p>PGEN} P_p: the split primes (density 1/2) contribute log P_p ≈ −4/p², so by the prime number
// theorem Σ_{p>P} log P_p ≈ −2 E₁(log P) ≈ −2/(P log P) ≈ −7e-8 at P = 2e6. Without this correction the
// truncation error δ enters Σ_{h≤H}(S_f(h) − C²) as a drift δ C² H (0.07 C² at H = 1e6) and biases the fitted
// exponent α towards 2. NOTAIL=1 reproduces the uncorrected computation.  (The analogous tail of the
// C(f) correction product is a character sum Σ_{p>P} χ(p)/p² with no main term; it is < 1e-10.)
const NOTAIL = process.env.NOTAIL === "1";
function expint1(y: number): number { return Math.exp(-y) * (1 / y - 1 / y ** 2 + 2 / y ** 3 - 6 / y ** 4 + 24 / y ** 5); }
const PGEN_TAIL = NOTAIL ? 1 : Math.exp(-2 * expint1(Math.log(PGEN)));
const primes = smallPrimes(Math.max(3, Number(process.env.U ?? 1)) * H + 1000);
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
  const s = new Float64Array(H + 1); // S_f(h)/C^2
  for (let h = 1; h <= H; h++) { let v = mult[h]; for (const { p, tab } of specTab) v *= tab[h % p]; s[h] = v; }
  return { name: name(q), C, D, special, Pgen, s };

}



/**
 * piece-general.ts — the piece P_u(Y) of an arbitrary irreducible quadratic f = a t^2 + b t + c (paper III, eq. piece), in
 * divisor-sum form: with Q_u(h) = u^2 h^2 - D, F_u(n) = prod_{p | n, p split, p not | 2Du} (1 + 1/(p-4)),
 * E F_u = prod_{p split, p not | 2Du} (1 + 2/(p(p-4))), P_u(Y) = sum_{h<=Y} (Y-h)(F_u(Q_u(h)) - E F_u) - (E F_u - 1) Y/2.
 * Writes the log grid of P_u(Y)/sqrt(Y) for the spectral test (piece-maass.ts).
 *   Q="1,1,41" U=1 Y=10000000 npx tsx research/paper-IV/scripts/piece-general.ts
 * u must be squarefree with omega(u) >= 1 (checked).
 */
import { mkdirSync, writeFileSync } from "node:fs";
const [qa, qb, qc] = (process.env.Q ?? "1,1,41").split(",").map(Number);
const q: Quad = { a: qa, b: qb, c: qc }; const u = Number(process.env.U ?? 1);
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const D = qb * qb - 4 * qa * qc; const special = Array.from(new Set([2, ...factorSmall(2 * qa * D).keys()])).sort((x, y) => x - y);
const omegaAt = (p: number) => (special.includes(p) ? omegaDirect(q, p) : 1 + legendre(D, p));
for (const [p, e] of factorSmall(u)) { if (e > 1) throw new Error("u not squarefree"); if (omegaAt(p) === 0) throw new Error(`omega(${p}) = 0`); }
const Pmax = u * H + Math.ceil(Math.sqrt(Math.abs(D))) + 2; // cofactor after sieving primes <= Pmax is 1 or a prime
if (Pmax > primes[primes.length - 1]) throw new Error("prime table too small");
const Qv = new Float64Array(H + 1), F = new Float64Array(H + 1).fill(1);
for (let h = 1; h <= H; h++) Qv[h] = Math.abs(u * u * h * h - D);
let EF = 1; const isSpecialU = (p: number) => special.includes(p) || u % p === 0;
for (const p of primes) {
  if (p > Pmax) break;
  if (isSpecialU(p)) { for (let h = 1; h <= H; h++) while (Qv[h] % p === 0) Qv[h] /= p; continue; }
  if (legendre(D, p) !== 1) continue;
  EF *= 1 + 2 / (p * (p - 4));
  const r = mulmod(sqrtmod(((D % p) + p) % p, p), modinv(u % p, p), p); const fac = 1 + 1 / (p - 4);
  for (const r0 of r === 0 ? [0] : [r, p - r]) for (let h = r0 === 0 ? p : r0; h <= H; h += p) { let x = Qv[h]; while (x % p === 0) x /= p; Qv[h] = x; F[h] *= fac; }
}
// tail of E F beyond Pmax: split primes have density 1/2, log(1+2/p^2) ~ 2/p^2 -> E_1(log Pmax)
{ const xx = Math.log(Pmax); EF *= Math.exp(Math.exp(-xx) / xx * (1 - 1 / xx + 2 / xx ** 2 - 6 / xx ** 3 + 24 / xx ** 4)); }
if (process.env.EF) EF = Number(process.env.EF);
let big = 0;
for (let h = 1; h <= H; h++) if (Qv[h] > 1) { const p = Qv[h]; if (!isSpecialU(p) && p % 2 === 1) F[h] *= 1 + 1 / (p - 4); big++; } // leftover prime > Pmax: it divides Q_u(h) so D is a square mod p -> split
console.log(`${name(q)} u=${u}: D=${D}, special ${special.join(",")}, E F_u = ${EF.toFixed(12)}, ${big} large cofactors (${el()})`);
const Mg = 4096, lo = Math.log(1e3), hi = Math.log(H);
const gridY = Array.from({ length: Mg }, (_, j) => Math.floor(Math.exp(lo + ((hi - lo) * j) / (Mg - 1)))); const gridP: number[] = []; let gj = 0;
let S = 0, cS = 0, Sh = 0, cSh = 0, maxS = 0;
const marks = new Set([1e3, 1e4, 1e5, 1e6, 1e7, 3e7].filter((m) => m <= H));
for (let h = 1; h <= H; h++) {
  const v = F[h] - EF; let yv = v - cS; let t = S + yv; cS = t - S - yv; S = t; yv = h * v - cSh; t = Sh + yv; cSh = t - Sh - yv; Sh = t;
  if (Math.abs(S) > maxS) maxS = Math.abs(S);
  const P = h * S - Sh - (EF - 1) * h / 2;
  while (gj < Mg && gridY[gj] === h) { gridP.push(P); gj++; }
  if (marks.has(h)) console.log(`Y=${h.toExponential(0)}  P_u(Y)=${P.toFixed(3)}  P/sqrtY=${(P / Math.sqrt(h)).toFixed(4)}  max|S_u|=${maxS.toFixed(3)}`);
}
mkdirSync("research/paper-IV/data", { recursive: true });
const tag = process.env.TAG ?? `${name(q).replace(/[^0-9a-z]/gi, "")}-u${u}`;
writeFileSync(`research/paper-IV/data/piece-${tag}-grid.dat`, "logY Y P PoverSqrtY\n" + gridY.map((yy, j) => `${Math.log(yy).toFixed(5)} ${yy} ${gridP[j].toFixed(4)} ${(gridP[j] / Math.sqrt(yy)).toFixed(6)}`).join("\n") + "\n");
console.log(`done (${el()})`);
