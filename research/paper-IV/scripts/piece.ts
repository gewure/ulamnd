/**
 * piece.ts — the whole piece P_u(Y) for f = t^2+1 by the multiplicative-function formula (paper IV, brainstorm §0):
 *   S_u(t) = Σ_{h<=t} (F_u(Q'(h)) − E F_u),   P_u(Y) = Σ_{t<Y} S_u(t) = Σ_{h<=Y} (Y−h)(F_u(Q'(h)) − E F_u),
 * where u = 2u' (u' squarefree, primes = 1 mod 4), Q'(h) = u'^2 h^2 + 1, F_u(n) = Π_{p | n, p = 1 (4), p ∤ u} (1 + 1/(p−4)),
 * E F_u = Π_{p = 1 (4), p ∤ u} (1 + 2/(p(p−4))). S_u is the sharp off-diagonal piece, P_u the Cesàro piece (paper III).
 *   U=2 Y=10000000 npx tsx research/paper-IV/scripts/piece.ts
 */
const u = Number(process.env.U ?? 2), Y = Number(process.env.Y ?? 1_000_000), up = u / 2;
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const Pmax = up * Y + 1; // cofactor after sieving primes <= u' Y is 1 or a prime (Q' <= (u'Y)^2 + 1)
const sieve = new Uint8Array(Pmax + 1);
for (let i = 2; i * i <= Pmax; i++) if (!sieve[i]) for (let j = i * i; j <= Pmax; j += i) sieve[j] = 1;
const powmod = (b: number, e: number, m: number) => { let r = 1n, bb = BigInt(b) % BigInt(m), ee = BigInt(e); const mm = BigInt(m); while (ee > 0n) { if (ee & 1n) r = (r * bb) % mm; bb = (bb * bb) % mm; ee >>= 1n; } return Number(r); };
const egcd = (a: number, m: number) => { let [o, r, s, t] = [a % m, m, 1, 0]; while (r) { const q = Math.floor(o / r); [o, r] = [r, o - q * r]; [s, t] = [t, s - q * t]; } return ((s % m) + m) % m; };
const Q = new Float64Array(Y + 1), F = new Float64Array(Y + 1).fill(1);
for (let h = 1; h <= Y; h++) Q[h] = up * up * h * h + 1;
let EF = 1, np = 0;
for (let p = 5; p <= Pmax; p += 4) {
  if (sieve[p]) continue; np++;
  const inU = u % p === 0; if (!inU) EF *= 1 + 2 / (p * (p - 4));
  // roots of u'^2 h^2 = -1 mod p: h = ± i / u'
  let i = 0; for (let g = 2; ; g++) { const r = powmod(g, (p - 1) >> 1, p); if (r === p - 1) { i = powmod(g, (p - 1) >> 2, p); break; } }
  const fac = 1 + 1 / (p - 4);
  if (up % p === 0) { // p | u': then u'^2 h^2 + 1 = 1 mod p, never divisible
    continue;
  }
  const r0 = Number((BigInt(i) * BigInt(egcd(up % p, p))) % BigInt(p));
  for (const r of r0 === 0 ? [0] : [r0, p - r0]) for (let h = r === 0 ? p : r; h <= Y; h += p) { let q = Q[h]; do { q /= p; } while (q % p === 0); Q[h] = q; if (!inU) F[h] *= fac; }
}
// E F tail beyond Pmax: Σ_{p>P, p=1(4)} log(1 + 2/(p(p-4))) ≈ (1/2)·2·∫_P^∞ dt/(t² log t) = E_1(log P) (asymptotic series; the
// character-twisted part Σ χ(p)/p² has no main term). Needed to ~1e-13: an error δ in E F is an error δ Y²/2 in P_u(Y).
const x = Math.log(Pmax); const E1 = Math.exp(-x) / x * (1 - 1 / x + 2 / x ** 2 - 6 / x ** 3 + 24 / x ** 4 - 120 / x ** 5 + 720 / x ** 6);
EF *= Math.exp(E1);
if (process.env.EF) EF = Number(process.env.EF); // high-precision value from scripts/ef.py (data/ef.txt)
let big = 0;
for (let h = 1; h <= Y; h++) { let q = Q[h]; while (q % 2 === 0) q /= 2; if (q > 1) { if (u % q !== 0) F[h] *= 1 + 1 / (q - 4); big++; } }
console.log(`u=${u}: ${np} primes = 1 (4) <= ${Pmax}, E F_u = ${EF.toFixed(12)}, ${big} large prime cofactors (${el()})`);
let S = 0, cS = 0, Sh = 0, cSh = 0, sumS = 0, sumS2 = 0, maxS = 0;
const marks = new Set([1e3, 1e4, 1e5, 1e6, 1e7].filter((m) => m <= Y));
// P_u(Y) (paper III, d' >= 2) = Σ_{h<=Y}(Y-h)(F - E F) - (E F - 1) Y/2   [the d'=1 term and the Y(Y-1)/2 vs Y²/2 convention]
console.log("Y | P_u(Y) | P_u(Y)/Y^(1/2) | S_u(Y) | rms S_u(t), t<=Y | max|S_u| | mean S_u  (E F precision limits P_u to about ±" + (5e-14 * Y * Y / 2).toExponential(0) + " at the largest Y)");
for (let h = 1; h <= Y; h++) {
  const v = F[h] - EF;
  let y = v - cS; let t = S + y; cS = t - S - y; S = t;            // S_u(h) = Σ_{h'<=h} v
  y = h * v - cSh; t = Sh + y; cSh = t - Sh - y; Sh = t;            // Σ h' v
  sumS += S; sumS2 += S * S; if (Math.abs(S) > maxS) maxS = Math.abs(S);
  if (marks.has(h)) { const P = h * S - Sh - (EF - 1) * h / 2; console.log(`${h.toExponential(0)} | ${P.toFixed(3)} | ${(P / Math.sqrt(h)).toFixed(3)} | ${S.toFixed(4)} | ${Math.sqrt(sumS2 / h).toFixed(4)} | ${maxS.toFixed(3)} | ${(sumS / h).toExponential(2)}`); }
}
console.log(`done (${el()})`);
