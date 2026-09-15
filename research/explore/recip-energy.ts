// Additive energy of reciprocals J_4(N) = #{x1*+x2* = x3*+x4* mod m, 1<=x_i<=N, (x_i,m)=1}, N = m^beta (PROOFS-uniform §19 lead).
// Compare with 2N'^2 + N'^4/m (diagonal + random) and with N'^3 (Bourgain-Garaev Theorem 1 at N = m^{1/2}).
const beta = Number(process.argv[2] ?? "0.5");
const cases: [string, number][] = [["prime", 1000003], ["prime", 4000037], ["p1p2 balanced", 1009 * 997], ["p1p2 balanced", 2003 * 1999],
  ["p*small", 7 * 142873], ["many factors", 3 * 5 * 7 * 11 * 13 * 17 * 19], ["many factors", 5 * 13 * 17 * 29 * 37 * 41], ["p1p2 unbalanced", 101 * 9901]];
function gcd(a: number, b: number): number { while (b) { [a, b] = [b, a % b]; } return a; }
function inv(x: number, m: number) { let [r0, r1, s0, s1] = [m, x % m, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; }
console.log(`beta=${beta}: type m N' J4 J4/(2N'^2+N'^4/m) J4/N'^3`);
for (const [typ, m] of cases) {
  const N = Math.round(Math.pow(m, beta)); const iv: number[] = [];
  for (let x = 1; x <= N; x++) if (gcd(x, m) === 1) iv.push(inv(x, m));
  const n = iv.length; const cnt = new Uint32Array(m);
  for (let i = 0; i < n; i++) { const a = iv[i]; for (let j = 0; j < n; j++) { let s = a + iv[j]; if (s >= m) s -= m; cnt[s]++; } }
  let J = 0; for (let r = 0; r < m; r++) J += cnt[r] * cnt[r];
  console.log(`${typ.padEnd(16)} ${String(m).padStart(9)} ${String(n).padStart(6)} ${String(J).padStart(12)} ${(J / (2 * n * n + n ** 4 / m)).toFixed(3).padStart(7)} ${(J / n ** 3).toFixed(5).padStart(9)}`);
}
