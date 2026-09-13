/**
 * riesz-cubic.ts — raw Riesz means of the DIAGONAL for the cyclic cubic f = t^3 - 3t - 1 (discriminant 81, Galois group C_3,
 * conductor 9), the test polynomial for the corrected general-f explicit formula of paper II (ERRATA 12): the pole of
 * L(3s+3, Psi_3) at s = -2/3 is DOUBLE (m_3 = 2), so the smooth part must contain x^{m-2/3}(a log x + b) with a != 0.
 *   npx tsx research/paper-II/scripts/riesz-cubic.ts [X]        (default 1e7)
 * Splitting: p = 3 ramified (omega = 1); p = +-1 mod 9 split completely (omega = 3); other p inert (omega = 0); omega(2) = 0.
 * (Checked against brute-force root counting for p <= 3000 at start-up.)
 * a_f(d) = A0 * prod_{p | d} omega(p)/(p - 2 omega(p)) on squarefree d (paper I, Theorem 2: a_f = W_f omega_f),
 * A0 = prod_p P_p, P_p = 1 - omega^2/(p-omega)^2;  A_f = a_f * 1;  R_m(x) = sum_{n<=x} (x-n)^m A_f(n).
 * Writes research/paper-II/data/riesz-cubic.dat (u x R1 R2 R3) and riesz-cubic.json (A0, D_f(1) partial sums, C(f) partial).
 */
import { mkdirSync, writeFileSync } from "node:fs";
const X = Number(process.argv[2] ?? 10_000_000);
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const omega = (p: number) => (p === 3 ? 1 : p % 9 === 1 || p % 9 === 8 ? 3 : 0);
for (let p = 2; p <= 3000; p++) { let isp = true; for (let q = 2; q * q <= p; q++) if (p % q === 0) { isp = false; break; } if (!isp) continue;
  let r = 0; for (let t = 0; t < p; t++) if (((t * t * t - 3 * t - 1) % p + p) % p === 0) r++; if (r !== omega(p)) throw new Error(`splitting rule wrong at p=${p}: ${r} vs ${omega(p)}`); }
const spf = new Int32Array(X + 1);
for (let i = 2; i <= X; i++) { if (spf[i]) continue; for (let j = i; j <= X; j += i) if (!spf[j]) spf[j] = i; }
console.log(`sieve (${el()})`);
// A0 = prod_p P_p with Kahan log-sum; C(f) = prod_p (1 - omega/p)/(1 - 1/p)
let logA0 = 0, c1 = 0, logC = 0, c2 = 0, Dsum = 0;
for (let p = 2; p <= X; p++) if (spf[p] === p) { const w = omega(p); if (!w) continue;
  let y = Math.log1p(-w * w / ((p - w) * (p - w))) - c1; let t = logA0 + y; c1 = t - logA0 - y; logA0 = t;
  y = Math.log1p(-w / p) - Math.log1p(-1 / p) - c2; t = logC + y; c2 = t - logC - y; logC = t; }
// tails beyond X: log P_p ~ -9/p^2 on split primes (density 1/3 of primes): sum_{p>X} 9/(3 p^2) ~ 3/(X log X); C: (omega-1)/p on split ... sum (2/p)(1/3 density) -> 2/3 * 1/log X ... use E1-type tails
const E1 = (y: number) => Math.exp(-y) * (1 / y - 1 / y ** 2 + 2 / y ** 3 - 6 / y ** 4);
const lx = Math.log(X);
const A0 = Math.exp(logA0 - 3 * Math.exp(-lx) / lx); // tail of sum_{p>X} 9/p^2 over 1/3 of primes = 3 * int_X^inf dt/(t^2 log t) ~ 3/(X log X)
const Ctail = -(2 / 3) * E1(lx) + (2 / 3) * 0; // sum_{p>X, split} log((1-3/p)/(1-1/p)) ~ -2/p on 1/3 of primes -> -(2/3) E1(log X)
const C = Math.exp(logC + Ctail);
const a = new Float64Array(X + 1); a[1] = A0;
for (let d = 2; d <= X; d++) { const p = spf[d], m = d / p; if (spf[m] === p) { a[d] = 0; continue; } const w = omega(p); a[d] = w ? a[m] * w / (p - 2 * w) : 0; }
console.log(`a_f done (${el()}), A0 = ${A0.toExponential(12)}, C(f) = ${C.toFixed(12)}`);
// A = a * 1 by divisor sieve; D_f(1) partial = sum a(d)/d
const A = new Float64Array(X + 1);
for (let d = 1; d <= X; d++) { const v = a[d]; if (!v) continue; Dsum += v / d; for (let n = d; n <= X; n += d) A[n] += v; }
console.log(`A_f done (${el()}), sum_{d<=X} a(d)/d = ${Dsum.toFixed(12)}`);
// Riesz means on a log grid via running moments S_k = sum_{n<=x} n^k A(n): R_m(x) = sum_k C(m,k) x^{m-k} (-1)^k S_k
const grid: number[] = []; for (let u = Math.log(1e3); u <= Math.log(X) + 1e-9; u += 0.005) grid.push(Math.floor(Math.exp(u)));
const rows: string[] = []; let S0 = 0, S1 = 0, S2 = 0, S3 = 0, gi = 0;
const comp = [0, 0, 0, 0];
for (let n = 1; n <= X; n++) { const v = A[n];
  // Kahan for each moment
  let y = v - comp[0], t = S0 + y; comp[0] = t - S0 - y; S0 = t;
  y = n * v - comp[1]; t = S1 + y; comp[1] = t - S1 - y; S1 = t;
  y = n * n * v - comp[2]; t = S2 + y; comp[2] = t - S2 - y; S2 = t;
  y = n * n * n * v - comp[3]; t = S3 + y; comp[3] = t - S3 - y; S3 = t;
  while (gi < grid.length && grid[gi] === n) { const x = n;
    const R1 = x * S0 - S1, R2 = x * x * S0 - 2 * x * S1 + S2, R3 = x ** 3 * S0 - 3 * x * x * S1 + 3 * x * S2 - S3;
    rows.push(`${Math.log(x).toFixed(5)} ${x} ${R1.toPrecision(17)} ${R2.toPrecision(17)} ${R3.toPrecision(17)}`); gi++; } }
mkdirSync("research/paper-II/data", { recursive: true });
writeFileSync("research/paper-II/data/riesz-cubic.dat", "u x R1 R2 R3\n" + rows.join("\n") + "\n");
writeFileSync("research/paper-II/data/riesz-cubic.json", JSON.stringify({ X, A0, C, DfOnePartial: Dsum, f: "t^3-3t-1" }, null, 1));
console.log(`done (${el()}): ${rows.length} grid points`);
