// PROOFS-uniform §36: the single remaining obstruction is J_6(N) at N ~ m^{1/4}.
// J_6(N) = #{x1*+x2*+x3* = y1*+y2*+y3* mod m, all in [1,N], (x,m)=1}. Bourgain-Garaev Theorem 1 gives ~N^4 there; the truth should be ~ (diagonal 6N^3) + (random N^6/m).
// Computed exactly via the distribution of x1*+x2*+x3* mod m.
const beta = Number(process.argv[2] ?? "0.25");
const cases: [string, number][] = [["prime", 1000003], ["prime", 4000037], ["p1p2 balanced", 1009 * 997], ["p1p2 balanced", 2003 * 1999],
  ["many factors", 4849845], ["p*small", 7 * 142873], ["p1p2 unbalanced", 101 * 9901]];
function gcd(a: number, b: number): number { while (b) { [a, b] = [b, a % b]; } return a; }
function inv(x: number, m: number) { let [r0, r1, s0, s1] = [m, x % m, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; }
console.log(`beta=${beta}: type m N' J6 J6/(6N'^3+N'^6/m) J6/N'^4 (BG bound ~ N^4)`);
for (const [typ, m] of cases) {
  const N = Math.round(Math.pow(m, beta)); const iv: number[] = [];
  for (let x = 1; x <= N; x++) if (gcd(x, m) === 1) iv.push(inv(x, m));
  const n = iv.length;
  // pair sums first, then add the third inverse
  const cnt = new Uint32Array(m);
  for (let i = 0; i < n; i++) { const a = iv[i]; for (let j = 0; j < n; j++) { let s = a + iv[j]; if (s >= m) s -= m; cnt[s]++; } }
  const cnt3 = new Uint32Array(m);
  for (let r = 0; r < m; r++) { const c = cnt[r]; if (!c) continue; for (let k = 0; k < n; k++) { let s = r + iv[k]; if (s >= m) s -= m; cnt3[s] += c; } }
  let J = 0; for (let r = 0; r < m; r++) J += cnt3[r] * cnt3[r];
  const model = 6 * n ** 3 + n ** 6 / m;
  console.log(`${typ.padEnd(16)} ${String(m).padStart(9)} ${String(n).padStart(5)} ${String(J).padStart(12)} ${(J / model).toFixed(3).padStart(7)} ${(J / n ** 4).toFixed(4).padStart(8)}`);
}
