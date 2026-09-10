/**
 * offstar-mean.ts: running mean M(H) = (1/H) sum_{t<=H} Off_f(t) for f = t^2+1 (= Off*_f(H)/H up to O(1/H)),
 * at H = 10^k and dyadic blocks. Derived from paper-II/scripts/offdiag-spectrum.ts.
 *
 * Job (C4), local version: the off-diagonal Off_f(H) of f = t^2 + 1 for H up to 1e7, on a log grid, and its
 * spectrum in u = log H.  Tests whether the off-diagonal carries oscillations at the SL_2(Z) Laplace parameters
 * (9.5337, 12.1730, 13.7798, 14.3585, 16.1381) and/or at half the zeta ordinates (7.0673, 10.5110, 12.5054, ...).
 *
 *   npx tsx research/paper-II/scripts/offdiag-spectrum.ts [H=10000000]        (~1-2 min, 0.3 GB)
 *
 * Method (paper I, Theorem 2 + Theorem 5; paper II, Section 5):
 *   Off_f(H) = Sigma_f(H)/C^2 + H D_f(1) - sum_{n<=H} A_f(n),   Sigma_f(H) = sum_{h<=H}(S_f(h) - C^2),
 * with S_f(h)/C^2 = 2 A0 prod_{p|h, p=1(4)} (p-2)/(p-4) prod_{p|h^2+4, p odd} (p-3)/(p-4)  for even h, 0 for odd h,
 * A0 = prod_{p=1(4)} P_p = 0.517476844264072363 (exact, prime zeta functions), D_f(1) = 0.750790813652006,
 * A_f = a_f * 1 with a_f(2) = 2A0, a_f(2m) = a_f(2m/p) 2/(p-4) (m odd squarefree with split prime factors).
 * The C^2 cancels.  Precision: each term O(1) with relative error 1e-15; H D_f(1) known to 1e-13 relative.
 * Writes research/paper-II/data/offdiag-{H}.dat (u H Off) and offdiag-spectrum-{H}.dat (omega power), and
 * research/paper-II/data/offdiag-spectrum.json.
 */
import { writeFileSync } from "node:fs";

const H = Number(process.argv[2] ?? 10_000_000);
const A0 = 0.517476844264072363;
const Df1 = 0.750790813652006;
const log = (s: string) => process.stdout.write(s + "\n");
const t0 = performance.now();
const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";

// primes to H (smallest prime factor sieve)
const spf = new Int32Array(H + 1);
for (let i = 2; i <= H; i++) {
  if (spf[i]) continue;
  for (let j = i; j <= H; j += i) if (!spf[j]) spf[j] = i;
}
log(`sieve (${el()})`);

// sqrt(-1) mod p for p = 1 (4), by Euler's criterion trick: for a quadratic non-residue g, g^{(p-1)/4} is a sqrt(-1)
function powmod(b: number, e: number, m: number): number {
  let r = 1; b %= m;
  while (e > 0) { if (e & 1) r = Number((BigInt(r) * BigInt(b)) % BigInt(m)); b = Number((BigInt(b) * BigInt(b)) % BigInt(m)); e >>= 1; }
  return r;
}
function sqrtMinusOne(p: number): number {
  for (let g = 2; ; g++) { const r = powmod(g, (p - 1) >> 1, p); if (r === p - 1) return powmod(g, (p - 1) >> 2, p); }
}

// S_f(h)/C^2 for even h: 2 A0 * prod_{p|h, split} (p-2)/(p-4) * prod_{p | h^2+4, p odd} (p-3)/(p-4)
// sieve Q(h) = h^2 + 4 (exact in doubles up to 1e14 < 2^53) by the roots h = +-2 i mod p, p = 1 (4), p <= H
const s = new Float64Array(H + 1); // running product for even h
const Q = new Float64Array(H + 1);
for (let h = 2; h <= H; h += 2) { s[h] = 2 * A0; Q[h] = h * h + 4; }
for (let p = 5; p <= H; p += 4) {
  if (spf[p] !== p) continue;
  const i = sqrtMinusOne(p);
  const fac = (p - 3) / (p - 4);
  for (const r0 of [(2 * i) % p, (p - (2 * i) % p) % p]) {
    // h = r0 mod p, h even
    let h = r0 === 0 ? p : r0;
    if (h % 2 === 1) h += p;
    for (; h <= H; h += 2 * p) {
      s[h] *= fac;
      let q = Q[h];
      do { q /= p; } while (q % p === 0);
      Q[h] = q;
    }
  }
}
// leftover cofactor of Q(h): 1, or a prime > H (necessarily = 1 mod 4); powers of 2 have been... note Q(h) for even h
// is divisible by 4 (h=2k: 4k^2+4 = 4(k^2+1)); remove the power of 2 first.
let extra = 0;
for (let h = 2; h <= H; h += 2) {
  let q = Q[h];
  while (q % 2 === 0) q /= 2;
  if (q > 1) { s[h] *= (q - 3) / (q - 4); extra++; }
  // primes p | h with p = 1 (4): factor (p-2)/(p-4)
  let m = h;
  while (m % 2 === 0) m /= 2;
  while (m > 1) { const p = spf[m]; if (p % 4 === 1) s[h] *= (p - 2) / (p - 4); while (m % p === 0) m /= p; }
}
log(`S_f(h)/C^2 built, ${extra} large cofactors (${el()})`);

// a_f and A_f = a_f * 1
const a = new Float64Array(H + 1);
a[2] = 2 * A0;
for (let d = 6; d <= H; d += 4) { // d = 2 m, m odd
  const m = d / 2; const p = spf[m]; const rest = m / p;
  if (rest % p === 0 || p % 4 !== 1) { a[d] = 0; continue; }
  a[d] = a[2 * rest] * (2 / (p - 4));
}
const Acum = new Float64Array(H + 1); // sum_{n<=H} A_f(n) via divisor sums, accumulated by n
{
  const A = new Float64Array(H + 1);
  for (let d = 2; d <= H; d += 2) { const v = a[d]; if (v === 0) continue; for (let n = d; n <= H; n += d) A[n] += v; }
  let c = 0, comp = 0;
  for (let n = 1; n <= H; n++) { const y = A[n] - comp; const t = c + y; comp = t - c - y; c = t; Acum[n] = c; }
}
log(`A_f sums (${el()})`);


// running mean of Off_f(t)
const marks = [1e3,3e3,1e4,3e4,1e5,3e5,1e6,3e6,1e7].filter((m)=>m<=H);
let cum = 0, comp = 0, S = 0, S2 = 0, blockS = 0, blockN = 0, nextDy = 1024;
const rows: string[] = [];
for (let t = 1; t <= H; t++) {
  const v = s[t] - 1; const y = v - comp; const tt = cum + y; comp = tt - cum - y; cum = tt;
  const off = cum + t * Df1 - Acum[t];
  S += off; S2 += off*off; blockS += off; blockN++;
  if (t === nextDy) { rows.push(`dyadic block ending ${t}: mean Off = ${(blockS/blockN).toFixed(5)}`); blockS = 0; blockN = 0; nextDy *= 2; }
  if (marks.includes(t)) log(`H=${t.toExponential(0)}  M(H)=(1/H)sum Off = ${(S/t).toFixed(5)}   rms Off = ${Math.sqrt(S2/t).toFixed(4)}`);
}
for (const r of rows) log(r);
// Off*(H) = sum_{t<H} Off(t) - (H/2) kappa_f,  kappa_f = sum_d W_f(d) omega(omega-1)/d = 1 - D_f(1)  (paper III, Thm Type II)
const kappaHalf = (1 - Df1) / 2;
log(`kappa_f/2 = (1 - D_f(1))/2 = ${kappaHalf.toFixed(6)};  Off*(H)/H ~ M(H) - kappa_f/2 = ${(S / H - kappaHalf).toFixed(5)} at H=${H}`);
log(`predicted c_off(t^2+1) = -0.134390 (scripts/coff.py: -sum_p lambda(p) m_p log p/(p(p-1)) over p = 1 mod 4)`);
import { mkdirSync, writeFileSync } from "node:fs";
mkdirSync("research/paper-III/data", { recursive: true });
writeFileSync("research/paper-III/data/offstar-mean.dat", "# dyadic block end, mean Off_f(t) over the block, minus kappa_f/2\n" + rows.map((r) => { const m = r.match(/ending (\d+): mean Off = (\S+)/)!; return `${m[1]} ${m[2]} ${(Number(m[2]) - kappaHalf).toFixed(5)}`; }).join("\n") + "\n");
log(`done (${el()})`);
