/**
 * Does the Galois group matter? Slope of Σ_{h≤H}(S_f(h) − C²) per unit ln H, divided by C(f), for
 * polynomials whose Galois group is or is not 2-transitive on the roots. The group is verified from the
 * distribution of ω(p): C3 gives ω ∈ {0,3} (density 1/3 for 3); S3 gives ω ∈ {0,1,3}; V4 and C4 give
 * ω ∈ {0,4} (density 1/4 for 4); D4 gives ω ∈ {0,2,4} with densities 5/8,1/4,1/8; S4 and A4 are 2-transitive.
 *
 *   npx tsx thesis/galois.ts
 */
import { writeFileSync } from "node:fs";
import { batemanHorn, pairSingularSeries, type IntPoly, isCertainlyReducible } from "../lib/poly";
import { smallPrimes } from "../lib/sieve";

const H = 100000;
const P = 60000;
const CHECK = [1000, 10000, 100000];
const f3 = (x: number, k = 3) => x.toFixed(k);
const primes = smallPrimes(20000);

function omegaDist(f: IntPoly): Record<number, number> {
  const cnt: Record<number, number> = {};
  let tot = 0;
  for (const p of primes) {
    if (p < 50) continue;
    let c = 0;
    for (let t = 0; t < p; t++) {
      let acc = 0n;
      for (let i = f.num.length - 1; i >= 0; i--) acc = (acc * BigInt(t) + f.num[i]) % BigInt(p);
      if (acc === 0n) c++;
    }
    cnt[c] = (cnt[c] ?? 0) + 1;
    tot++;
  }
  for (const k of Object.keys(cnt)) cnt[+k] = Math.round((1000 * cnt[+k]) / tot) / 1000;
  return cnt;
}
function group(d: number, dist: Record<number, number>): [string, number] {
  const has = (k: number) => (dist[k] ?? 0) > 0.02;
  if (d === 3) return has(1) ? ["S_3", 2] : ["C_3", 3];
  if (d === 4) {
    if (has(1)) return ["S_4/A_4", 2];
    if (has(2)) return ["D_4", 3];
    return ["C_4/V_4", 4];
  }
  return ["?", 0];
}

const cases: [string, IntPoly][] = [];
const poly = (name: string, coeffs: number[]) => cases.push([name, { num: coeffs.map(BigInt), den: 1n, degree: coeffs.length - 1 }]);
// Shanks' simplest cubics t^3 - a t^2 - (a+3) t - 1: cyclic for every a
for (const a of [-1, 0, 1, 2, 3, 4, 5, 6]) poly(`t^3${a === 0 ? "" : a === -1 ? "+t^2" : `-${a}t^2`}-${a + 3}t-1`, [-1, -(a + 3), -a, 1]);
// generic cubics (S3)
for (const [c, b] of [[2, 0], [3, 1], [5, -2], [7, 3], [11, 0], [4, 3]]) poly(`t^3${b ? (b > 0 ? `+${b}t` : `${b}t`) : ""}+${c}`, [c, b, 0, 1]);
// D4 quartics t^4 - c (c not a square, -c not a square, 4c not a fourth power)
for (const c of [2, 3, 5, 6, 7, 10]) poly(`t^4-${c}`, [-c, 0, 0, 0, 1]);
// C4 and V4 quartics
poly("t^4+4t^2+2", [2, 0, 4, 0, 1]);
poly("t^4-4t^2+2", [2, 0, -4, 0, 1]);
poly("t^4+5t^2+5", [5, 0, 5, 0, 1]);
poly("t^4+1", [1, 0, 0, 0, 1]);
poly("t^4-2t^2+9", [9, 0, -2, 0, 1]);
poly("t^4+6t^2+4", [4, 0, 6, 0, 1]);
// generic quartics (S4)
for (const [c, b] of [[1, 1], [3, 2], [5, 1], [2, 3], [7, -1]]) poly(`t^4${b > 0 ? `+${b}t` : `${b}t`}+${c}`, [c, b, 0, 0, 1]);

const rows: string[] = [];
const out: { name: string; group: string; r: number; C: number; sums: number[]; slopeC: number; dist: Record<number, number> }[] = [];
for (const [name, f] of cases) {
  const bh = batemanHorn(f, P);
  if (bh.fixedDivisor !== null || isCertainlyReducible(f, 0)) {
    console.log(`${name}: skipped (fixed divisor ${bh.fixedDivisor} / reducible)`);
    continue;
  }
  const dist = omegaDist(f);
  const [g, r] = group(f.degree, dist);
  const C = bh.C;
  const S = pairSingularSeries(f, H, P);
  const sums: number[] = [];
  let acc = 0,
    ci = 0;
  for (let h = 1; h <= H; h++) {
    acc += S[h - 1] - C * C;
    if (h === CHECK[ci]) {
      sums.push(acc);
      ci++;
    }
  }
  const slopeC = (sums[2] - sums[0]) / Math.log(100) / C;
  console.log(`${name.padEnd(16)} ${g.padEnd(8)} r=${r} C=${f3(C)} ω-dist=${JSON.stringify(dist)} Σ(1e3)=${f3(sums[0], 2)} Σ(1e5)=${f3(sums[2], 2)} slope/C=${f3(slopeC)}`);
  out.push({ name, group: g, r, C, sums, slopeC, dist });
}
// group summary
const groups = Array.from(new Set(out.map((o) => o.group)));
const mean = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
const sd = (xs: number[]) => Math.sqrt(mean(xs.map((x) => (x - mean(xs)) ** 2)));
for (const g of groups) {
  const xs = out.filter((o) => o.group === g).map((o) => o.slopeC);
  console.log(`group ${g}: n=${xs.length} slope/C = ${f3(mean(xs))} ± ${f3(sd(xs))} (se ${f3(sd(xs) / Math.sqrt(xs.length))})`);
  rows.push(`$${g}$ & ${out.find((o) => o.group === g)!.r} & ${xs.length} & ${f3(mean(out.filter((o) => o.group === g).map((o) => o.C)), 2)} & $${f3(mean(xs))} \\pm ${f3(sd(xs))}$ & ${f3(sd(xs) / Math.sqrt(xs.length))} \\\\`);
}
writeFileSync("research/experiments/galois.json", JSON.stringify(out, null, 1));
writeFileSync("research/paper-I/data/galois-rows.tex", rows.join("\n") + "\n\\bottomrule\n");
writeFileSync("research/paper-I/data/galois-all.tex", out.map((o) => `$${o.name.replace(/\^(\d)/g, "^{$1}")}$ & $${o.group}$ & ${o.r} & ${f3(o.C)} & ${f3(o.sums[0], 2)} & ${f3(o.sums[2], 2)} & ${f3(o.slopeC)} \\\\`).join("\n") + "\n\\bottomrule\n");
