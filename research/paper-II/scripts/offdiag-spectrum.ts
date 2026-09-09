/**
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

// Off_f(H') on a log grid, H' in [1e3, H]
const M = 4096; const uMin = Math.log(1e3), uMax = Math.log(H);
const us = Array.from({ length: M }, (_, j) => uMin + ((uMax - uMin) * j) / (M - 1));
const Hs = us.map((u) => Math.floor(Math.exp(u)));
const off: number[] = [];
{
  let cum = 0, comp = 0, j = 0;
  for (let h = 1; h <= H && j < M; h++) {
    const v = s[h] - 1; // S_f(h)/C^2 - 1  (s[h] = 0 for odd h)
    const y = v - comp; const t = cum + y; comp = t - cum - y; cum = t;
    while (j < M && Hs[j] === h) { off.push(cum + Hs[j] * Df1 - Acum[Hs[j]]); j++; }
  }
  while (j < M) { off.push(off[off.length - 1]); j++; }
}
// note: Sigma_f(H)/C^2 = sum_{h<=H}(S_f/C^2 - 1) is exactly what 'cum' holds.
const mean = off.reduce((p, q) => p + q, 0) / M;
const sd = Math.sqrt(off.reduce((p, q) => p + (q - mean) ** 2, 0) / M);
log(`Off_f: mean ${mean.toFixed(4)}, sd ${sd.toFixed(4)}, min ${Math.min(...off).toFixed(3)}, max ${Math.max(...off).toFixed(3)} (${el()})`);
// linear detrend in u (a residual drift would signal a log term), then Hann-windowed spectrum
const um = us.reduce((p, q) => p + q, 0) / M;
const sxx = us.reduce((p, q) => p + (q - um) ** 2, 0), sxy = us.reduce((p, q, i) => p + (q - um) * (off[i] - mean), 0);
const slope = sxy / sxx;
log(`drift of Off_f per unit log H: ${slope.toFixed(5)} (a log H term would show here; trivial bound ~ C^-1 = 0.73)`);
const det = off.map((v, i) => v - mean - slope * (us[i] - um));
const du = (uMax - uMin) / (M - 1);
const w = det.map((v, i) => v * (0.5 - 0.5 * Math.cos((2 * Math.PI * i) / (M - 1))));
const freq: number[] = [], power: number[] = [];
for (let om = 0.5; om <= 30; om += 0.02) {
  let re = 0, im = 0;
  for (let i = 0; i < M; i++) { const ph = om * i * du; re += w[i] * Math.cos(ph); im += w[i] * Math.sin(ph); }
  freq.push(om); power.push((re * re + im * im) / (M * M));
}
// peaks and their nearest predicted lines
const maass = [9.53370, 12.17301, 13.77975, 14.35851, 16.13807, 16.64426, 17.73856, 18.18092, 19.42348, 19.48471];
const zetaHalf = [7.067363, 10.511020, 12.505429, 15.212438, 16.467531, 18.793089, 20.459360, 21.663537, 24.008856, 24.964250];
const pk: { om: number; p: number }[] = [];
for (let i = 1; i < freq.length - 1; i++) if (power[i] > power[i - 1] && power[i] > power[i + 1]) pk.push({ om: freq[i], p: power[i] });
pk.sort((p, q) => q.p - p.p);
const res = (uMax - uMin); const resolution = 2 * Math.PI / res;
log(`resolution in omega: ${resolution.toFixed(3)}`);
const top = pk.slice(0, 15).map((p) => {
  const dm = Math.min(...maass.map((m) => Math.abs(m - p.om))), dz = Math.min(...zetaHalf.map((m) => Math.abs(m - p.om)));
  return { om: +p.om.toFixed(2), power: +p.p.toExponential(3), dMaass: +dm.toFixed(2), dZeta: +dz.toFixed(2) };
});
for (const t of top) log(`  peak omega=${t.om} power=${t.power} |nearest Maass| ${t.dMaass} |nearest zeta/2| ${t.dZeta}`);
// power at predicted lines vs random, in units of the local scatter (as in riesz-diag.ts)
const lo = 4, hi = 25;
const idx = freq.map((_, i) => i).filter((i) => freq[i] >= lo && freq[i] <= hi);
const lp = idx.map((i) => Math.log10(power[i]));
const mu = lp.reduce((p, q) => p + q, 0) / lp.length, sg = Math.sqrt(lp.reduce((p, q) => p + (q - mu) ** 2, 0) / lp.length);
const at = (om: number) => { let best = -Infinity; for (const i of idx) if (Math.abs(freq[i] - om) <= resolution / 2) best = Math.max(best, Math.log10(power[i])); return (best - mu) / sg; };
const zM = maass.filter((m) => m > lo + 1 && m < hi - 1).map(at), zZ = zetaHalf.filter((m) => m > lo + 1 && m < hi - 1).map(at);
let seed = 11; const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0), seed / 4294967296);
const zR: number[] = []; for (let k = 0; k < 4000; k++) zR.push(at(lo + 1 + rnd() * (hi - lo - 2)));
const mean1 = (v: number[]) => v.reduce((p, q) => p + q, 0) / v.length;
log(`mean z at Maass lines ${mean1(zM).toFixed(2)} (n=${zM.length}); at zeta/2 lines ${mean1(zZ).toFixed(2)} (n=${zZ.length}); random ${mean1(zR).toFixed(2)} +- ${Math.sqrt(mean1(zR.map((z) => (z - mean1(zR)) ** 2))).toFixed(2)}`);
log(`  per Maass line: ${zM.map((z) => z.toFixed(1)).join(" ")}`);
log(`  per zeta/2 line: ${zZ.map((z) => z.toFixed(1)).join(" ")}`);

writeFileSync(`research/paper-II/data/offdiag-${H}.dat`, "u H off\n" + us.map((u, i) => `${u.toFixed(5)} ${Hs[i]} ${off[i].toFixed(6)}`).join("\n") + "\n");
writeFileSync(`research/paper-II/data/offdiag-spectrum-${H}.dat`, "om power\n" + freq.map((f, i) => `${f.toFixed(2)} ${power[i].toExponential(5)}`).join("\n") + "\n");
writeFileSync("research/paper-II/data/offdiag-spectrum.json", JSON.stringify({ H, mean, sd, slope, resolution, top, zMaass: zM, zZeta: zZ, zRandomMean: mean1(zR) }, null, 1));
log(`done (${el()})`);
