/**
 * weyl-partial.ts — the partial sums of the Weyl sums of a quadratic congruence, directly:
 *   T_k(X) = sum_{d <= X, (d,2D)=1} sum_{b mod d, b^2 = D (d)} e(kb/d).
 * Section 5 identifies the Dirichlet series of these as Selberg's Poincare series at the Heegner points, whose
 * rightmost poles are at s = 1/2 +- i t_j.  Hence the prediction  T_k(X) = main + sum_j c_j X^{1/2 + i t_j} + ... ,
 * i.e. T_k(X)/sqrt(X) should oscillate in log X at the EVEN Maass parameters.  Hooley (1963) proves O(X^{3/4+eps}).
 *   D=-4 K=1 X=2000000 npx tsx research/paper-IV/scripts/weyl-partial.ts
 */
import { mkdirSync, writeFileSync } from "node:fs";
const D = Number(process.env.D ?? -4), K = Number(process.env.K ?? 1), X = Number(process.env.X ?? 1_000_000);
const TAG = process.env.TAG ?? `D${D}k${K}`;
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const spf = new Int32Array(X + 1);
for (let i = 2; i <= X; i++) { if (spf[i]) continue; for (let j = i; j <= X; j += i) if (!spf[j]) spf[j] = i; }
console.log(`sieve (${el()})`);
const mod = (a: number, m: number) => ((a % m) + m) % m;
function powmod(b: number, e: number, m: number): number { let r = 1n, bb = BigInt(mod(b, m)), ee = BigInt(e); const mm = BigInt(m); while (ee > 0n) { if (ee & 1n) r = (r * bb) % mm; bb = (bb * bb) % mm; ee >>= 1n; } return Number(r); }
function sqrtModP(a: number, p: number): number { // p odd prime, a a QR
  a = mod(a, p); if (a === 0) return 0;
  if (p % 4 === 3) return powmod(a, (p + 1) / 4, p);
  let q = p - 1, ss = 0; while (q % 2 === 0) { q /= 2; ss++; }
  let z = 2; while (powmod(z, (p - 1) / 2, p) !== p - 1) z++;
  let m = ss, c = powmod(z, q, p), t = powmod(a, q, p), r = powmod(a, (q + 1) / 2, p);
  while (t !== 1) { let i = 0, tt = t; while (tt !== 1) { tt = Number((BigInt(tt) * BigInt(tt)) % BigInt(p)); i++; }
    let b = c; for (let j = 0; j < m - i - 1; j++) b = Number((BigInt(b) * BigInt(b)) % BigInt(p));
    m = i; c = Number((BigInt(b) * BigInt(b)) % BigInt(p)); t = Number((BigInt(t) * BigInt(c)) % BigInt(p)); r = Number((BigInt(r) * BigInt(b)) % BigInt(p)); }
  return r;
}
function egcd(a: number, m: number) { let [o, r, s1, t1] = [mod(a, m), m, 1, 0]; while (r) { const q = Math.floor(o / r); [o, r] = [r, o - q * r]; [s1, t1] = [t1, s1 - q * t1]; } return mod(s1, m); }
const mulm = (a: number, b: number, m: number) => Number((BigInt(a) * BigInt(b)) % BigInt(m));
// T_k(X) on a log grid
const M = 4096, lo = Math.log(1e3), hi = Math.log(X);
const grid = Array.from({ length: M }, (_, j) => Math.floor(Math.exp(lo + ((hi - lo) * j) / (M - 1))));
const out: number[] = []; let gj = 0;
let re = 0, im = 0, cre = 0, cim = 0, nd = 0;
for (let d = 1; d <= X; d++) {
  while (gj < M && grid[gj] === d - 1) { out.push(re / Math.sqrt(d - 1)); gj++; }
  if (d > 1 && (2 * D) % d === 0) continue;
  // factor d, lift sqrt(D) to each prime power, CRT
  let ok = true; let roots: number[] = [0]; let modulus = 1; let m = d;
  while (m > 1 && ok) {
    const p = spf[m]; let pe = 1, e = 0; while (m % p === 0) { m /= p; pe *= p; e++; }
    if (p === 2 || D % p === 0) { ok = false; break; }
    if (powmod(D, (p - 1) / 2, p) !== 1) { ok = false; break; }
    let r = sqrtModP(D, p);
    for (let i = 1; i < e; i++) { // Hensel: r <- r - (r^2 - D)/(2r) mod p^(i+1)
      const pk = Math.pow(p, i + 1);
      const f = mod(mulm(r, r, pk) - D, pk); const inv2r = egcd(mod(2 * r, pk), pk);
      r = mod(r - mulm(f, inv2r, pk), pk);
    }
    const nr: number[] = [];
    const A = egcd(mod(modulus, pe), pe);
    for (const x of roots) for (const y of [r, pe - r]) { const t = mulm(mod(y - x, pe), A, pe); nr.push(x + modulus * t); }
    roots = nr; modulus *= pe;
  }
  if (!ok) continue;
  nd++;
  for (const b of roots) { const ph = 2 * Math.PI * K * (b % d) / d; const yr = Math.cos(ph) - cre, yi = Math.sin(ph) - cim; const tr = re + yr, ti = im + yi; cre = tr - re - yr; cim = ti - im - yi; re = tr; im = ti; }
}
while (gj < M) { out.push(re / Math.sqrt(X)); gj++; }
const mean = out.reduce((a, b) => a + b, 0) / M;
const sd = Math.sqrt(out.reduce((a, b) => a + (b - mean) ** 2, 0) / M);
console.log(`D=${D} k=${K} X=${X}: ${nd} admissible moduli; T_k(X) = ${re.toFixed(3)}; T_k(X)/sqrt(X) = ${(re / Math.sqrt(X)).toFixed(5)}; over the grid mean ${mean.toFixed(4)} sd ${sd.toFixed(4)} max|.| ${Math.max(...out.map(Math.abs)).toFixed(3)} (${el()})`);
mkdirSync("research/paper-IV/data", { recursive: true });
writeFileSync(`research/paper-IV/data/piece-W${TAG}-grid.dat`, "logY Y P PoverSqrtY\n" + grid.map((y, j) => `${Math.log(y).toFixed(5)} ${y} ${(out[j] * Math.sqrt(y)).toFixed(4)} ${out[j].toFixed(6)}`).join("\n") + "\n");
