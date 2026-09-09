/** Truncation sensitivity of C(f) and of Σ_h (S_f(h) − C²) for five quadratics: npx tsx thesis/trunc.ts */
import { batemanHorn, pairSingularSeries, type IntPoly } from "../lib/poly";
const polys: IntPoly[] = [
  { num: [41n, 1n, 1n], den: 1n, degree: 2 },
  { num: [1n, -2n, 4n], den: 1n, degree: 2 },
  { num: [4000163n, -8000n, 4n], den: 1n, degree: 2 },
  { num: [17n, 3n, 4n], den: 1n, degree: 2 },
  { num: [7n, 30n, 4n], den: 1n, degree: 2 },
];
for (const f of polys) {
  const line: string[] = [];
  for (const P of [1000, 2000, 5000, 20000, 60000]) {
    const C = batemanHorn(f, P).C;
    const S = pairSingularSeries(f, 3200, P);
    let s200 = 0, s3200 = 0;
    for (let h = 1; h <= 3200; h++) { const v = S[h - 1] - C * C; if (h <= 200) s200 += v; s3200 += v; }
    line.push(`P=${P}: C=${C.toFixed(4)} Σ200=${s200.toFixed(2)} Σ3200=${s3200.toFixed(2)} κ3200=${(s3200 / (C * C * Math.log(3200))).toFixed(3)}`);
  }
  console.log(f.num.join(","), "\n  " + line.join("\n  "));
}
