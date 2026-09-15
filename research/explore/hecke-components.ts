/**
 * hecke-components.ts — F24 test of PROOFS-uniform.md §6 (corrected form, 15/15 Sep 2026).
 *
 * For an odd prime u with u ∤ D, piece u (smooth window, object "all") is the restriction of the u = 1 sum at length uY to
 * h' ≡ 0 (mod u):  S_u(Y) = Σ_{h'≡0 (u)} w(h'/(uY)) (σ_{-1}(h'^2 - D) - E_u).  In the coset picture (Prop. classwise of the
 * dilation draft) its weight on the pair (divisor a of n = h'^2 - D, root h' mod ua) is the indicator w = 1[ℓ1 ⊥ ℓ2] on the
 * u(u+1) ordered pairs of distinct lines; with the uniform measure on those pairs it decomposes as
 *     w = wbar + L1(ℓ1) + L2(ℓ2) + R,   wbar = (u-χ)/(u(u+1)),   L_i = (u/(u-1)) n(ℓ_i),   n(ℓ) = (1 - 1[ℓ isotropic])/u - wbar,
 * R orthogonal to every function of one line. Arithmetic dictionary: ℓ1 isotropic ⇔ u | a;  ℓ2 isotropic ⇔ u | n/a.
 * With A = σ_{-1}(n), B = Σ_{a|n, u|a} 1/a = σ_{-1}(n/u)/u, C = Σ_{a|n, u|n/a} 1/a = σ_{-1}(n/u) (B = C = 0 if u ∤ n):
 *     T  = wbar·A                                  (exactly wbar times the u = 1 sum at length uY)
 *     L1 = (u/(u-1))·[(A - B)/u - wbar·A],   L2 = (u/(u-1))·[(A - C)/u - wbar·A],   R = 1[u|h']·A - T - L1 - L2,
 * each with its own arithmetic mean subtracted (local factors at u: A: 1+(1+χ)/(u²-1), B: (1+χ)/(u²-1), C: (1+χ)u/(u²-1)).
 * Predictions (no free parameter): the level-one lines sit in T (ratio wbar·u^{-1/2}) and L1+L2 (ratio r_j(u;D) - wbar·u^{-1/2});
 * the level-u newform lines sit in L1+L2 only; R has neither. For inert u, L1 = L2 = 0 identically.
 *   D=-8 U=3 Y=10000000 npx tsx research/explore/hecke-components.ts
 * Writes research/explore/data/components-D<|D|>-U<u>-grid.dat (NOT the paper's data directory):
 *   logY Y sqrtY*P sqrtY*T sqrtY*L1 sqrtY*L2 sqrtY*R    on the 400-point grid of piece-divset.ts SMOOTH=1 (same Y values),
 * so column P must reproduce research/paper-IV/data/piece-DS-all-D-<|D|>-U<u>-smooth-grid.dat (regression check).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { smallPrimes } from "../lib/sieve";
const D = Number(process.env.D ?? -8), U = Number(process.env.U ?? 3), Y = Number(process.env.Y ?? 10_000_000);
if (D % 4 === 2 || D % 4 === 3 || D >= 0) throw new Error("D must be a negative discriminant");
if (U < 3 || U % 2 === 0 || D % U === 0) throw new Error("U must be an odd prime not dividing D");
for (let q = 2; q * q <= U; q++) if (U % q === 0) throw new Error("U must be prime");
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const N = U * Y;                                            // h' ≤ N
const Pmax = N + Math.ceil(Math.sqrt(Math.abs(D))) + 2;     // n = h'^2 - D < Pmax^2: cofactor after sieving is 1 or a prime
const primes = smallPrimes(Pmax + 1000);
const legendre = (a: number, p: number) => { a = ((a % p) + p) % p; if (a === 0) return 0; let r = 1n, b = BigInt(a), e = BigInt((p - 1) / 2), P = BigInt(p); while (e > 0n) { if (e & 1n) r = r * b % P; b = b * b % P; e >>= 1n; } return r === 1n ? 1 : -1; };
function sqrtmod(n: number, p: number): number {
  const pm = (b: bigint, e: bigint, m: bigint) => { let r = 1n; b %= m; while (e > 0n) { if (e & 1n) r = r * b % m; b = b * b % m; e >>= 1n; } return r; };
  n = ((n % p) + p) % p; const P = BigInt(p), Nn = BigInt(n);
  if (p % 4 === 3) return Number(pm(Nn, (P + 1n) / 4n, P));
  let q = P - 1n, s = 0; while (q % 2n === 0n) { q /= 2n; s++; }
  let z = 2n; while (pm(z, (P - 1n) / 2n, P) === 1n) z++;
  let m = s, c = pm(z, q, P), t = pm(Nn, q, P), r = pm(Nn, (q + 1n) / 2n, P);
  while (t !== 1n) { let i = 0, tt = t; while (tt !== 1n) { tt = tt * tt % P; i++; } let b = c; for (let j = 0; j < m - i - 1; j++) b = b * b % P; m = i; c = b * b % P; t = t * c % P; r = r * b % P; }
  return Number(r);
}
const rootsMod = (m: number) => { const r: number[] = []; for (let x = 0; x < m; x++) if (((x * x - D) % m + m) % m === 0) r.push(x); return r; };
const chi = legendre(D, U);
const Qv = new Float64Array(N + 1), A = new Float64Array(N + 1).fill(1), vu = new Int8Array(N + 1);
for (let h = 1; h <= N; h++) Qv[h] = Math.abs(h * h - D);
let E1 = 1;
const special = primes.filter((p) => (2 * D) % p === 0);
for (const p of special) {                                  // p | 2D: brute-force local mean and valuations (as piece-divset.ts)
  let mean = 1, pk = 1;
  for (let k = 1; k <= 20; k++) { pk *= p; if (pk > 4e6) break; const rho = rootsMod(pk).length; if (rho === 0) break; mean += rho / (pk * pk); }
  E1 *= mean;
  for (const r0 of rootsMod(p)) for (let h = r0 === 0 ? p : r0; h <= N; h += p) {
    let x = Qv[h], v = 0; while (x % p === 0) { x /= p; v++; } Qv[h] = x;
    A[h] *= (1 - Math.pow(p, -(v + 1))) / (1 - 1 / p);
  }
}
let E1gen = 1;
for (const p of primes) {
  if (p > Pmax) break;
  if ((2 * D) % p === 0 || legendre(D, p) !== 1) continue;
  E1gen *= 1 + 2 / (p * p - 1);
  const r = sqrtmod(D, p);
  for (const r0 of [r, p - r]) for (let h = r0; h <= N; h += p) {
    let x = Qv[h], v = 0; while (x % p === 0) { x /= p; v++; } Qv[h] = x;
    A[h] *= (1 - Math.pow(p, -(v + 1))) / (1 - 1 / p);
    if (p === U) vu[h] = v;
  }
}
{ const xx = Math.log(Pmax); E1gen *= Math.exp(Math.exp(-xx) / xx * (1 - 1 / xx + 2 / xx ** 2 - 6 / xx ** 3 + 24 / xx ** 4)); }
E1 *= E1gen;
let big = 0;
for (let h = 1; h <= N; h++) if (Qv[h] > 1) { A[h] *= 1 + 1 / Qv[h]; big++; }
// local factors at u and the component means
const LA = 1 + (1 + chi) / (U * U - 1), LB = (1 + chi) / (U * U - 1), LC = (1 + chi) * U / (U * U - 1);
const EB = E1 * LB / LA, EC = E1 * LC / LA, Eu = E1 / LA;
const wbar = (U - chi) / (U * (U + 1)), kap = U / (U - 1);
const mL1 = kap * ((E1 - EB) / U - wbar * E1), mL2 = kap * ((E1 - EC) / U - wbar * E1);
const fv = (v: number) => (1 - Math.pow(U, -(v + 1))) / (1 - 1 / U);
console.log(`D=${D} U=${U} (chi=${chi}) Y=${Y}: E1=${E1.toFixed(12)} E_u=${Eu.toFixed(12)} wbar=${wbar.toFixed(6)} mean(L1)=${mL1.toExponential(4)} mean(L2)=${mL2.toExponential(4)}, ${big} large cofactors (${el()})`);
// consistency of the means with the data: empirical averages over h' ≤ N
{ let sA = 0, sB = 0, sC = 0, sP = 0, cP = 0;
  for (let h = 1; h <= N; h++) { const a = A[h]; sA += a; if (vu[h] > 0) { const s = a * fv(vu[h] - 1) / fv(vu[h]); sB += s / U; sC += s; } if (h % U === 0) { sP += a; cP++; } }
  console.log(`empirical means over h' ≤ ${N}: A ${(sA / N).toFixed(6)} (E1 ${E1.toFixed(6)}), B ${(sB / N).toFixed(6)} (${EB.toFixed(6)}), C ${(sC / N).toFixed(6)} (${EC.toFixed(6)}), A on u|h' ${(sP / cP).toFixed(6)} (E_u ${Eu.toFixed(6)})`); }
const wfun = (x: number) => (x <= 0.5 || x >= 1 ? 0 : Math.exp(-1 / (1 - (4 * x - 3) ** 2)));
const lo = Math.log(1e3), hi = Math.log(Y), Ms = 400;
const gridS = Array.from({ length: Ms }, (_, j) => Math.floor(Math.exp(lo + ((hi - lo) * j) / (Ms - 1))));
const rows: string[] = [];
for (const Yv of gridS) {
  const X = U * Yv;
  const acc = [0, 0, 0, 0, 0], cc = [0, 0, 0, 0, 0];   // P, T, L1, L2 with Kahan; R = P - T - L1 - L2 at the end
  const add = (i: number, v: number) => { const vv = v - cc[i]; const t = acc[i] + vv; cc[i] = t - acc[i] - vv; acc[i] = t; };
  for (let h = Math.floor(X / 2); h <= X; h++) {
    const wt = wfun(h / X); if (wt === 0) continue;
    const a = A[h];
    let Bv = 0, Cv = 0;
    if (vu[h] > 0) { Cv = a * fv(vu[h] - 1) / fv(vu[h]); Bv = Cv / U; }
    if (h % U === 0) add(0, wt * (a - Eu));
    add(1, wt * wbar * (a - E1));
    add(2, wt * (kap * ((a - Bv) / U - wbar * a) - mL1));
    add(3, wt * (kap * ((a - Cv) / U - wbar * a) - mL2));
  }
  const s = Math.sqrt(Yv), P = acc[0], T = acc[1], L1 = acc[2], L2 = acc[3], R = P - T - L1 - L2;
  rows.push(`${Math.log(Yv).toFixed(5)} ${Yv} ${(s * P).toFixed(7)} ${(s * T).toFixed(7)} ${(s * L1).toFixed(7)} ${(s * L2).toFixed(7)} ${(s * R).toFixed(7)}`);
}
mkdirSync("research/explore/data", { recursive: true });
const out = `research/explore/data/components-D${-D}-U${U}-grid.dat`;
writeFileSync(out, "logY Y sqrtY_P sqrtY_T sqrtY_L1 sqrtY_L2 sqrtY_R\n" + rows.join("\n") + "\n");
const col = (i: number) => rows.map((r) => Number(r.split(" ")[i]));
const rms = (v: number[]) => Math.sqrt(v.reduce((x, y) => x + y * y, 0) / v.length);
console.log(`wrote ${out}; rms over grid: P ${rms(col(2)).toFixed(4)} T ${rms(col(3)).toFixed(4)} L1 ${rms(col(4)).toFixed(4)} L2 ${rms(col(5)).toFixed(4)} R ${rms(col(6)).toFixed(4)} (${el()})`);
