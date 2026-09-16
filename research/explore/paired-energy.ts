// PROOFS-uniform §38 (F24 test before any claim): the PAIRED count
//   Jp(Y) = #{y1*+y2* = y3*+y4* (mod m) AND y1+y2 = y3+y4 (mod m), 1<=y_i<=Y, (y_i,m)=1}
// against the plain energy J4(Y), at Y ~ m^{1/4} and m^{1/2}. Claim under test: Jp << Y^2 m^{o(1)} with no threshold.
const beta = Number(process.argv[2] ?? "0.25");
const cases: [string, number][] = [["prime", 1000003], ["prime", 4000037], ["p1p2 balanced", 1009 * 997], ["p1p2 balanced", 2003 * 1999],
  ["many factors", 4849845], ["p*small", 7 * 142873]];
function gcd(a: number, b: number): number { while (b) { [a, b] = [b, a % b]; } return a; }
function inv(x: number, m: number) { let [r0, r1, s0, s1] = [m, x % m, 0, 1]; while (r1) { const q = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - q * r1]; [s0, s1] = [s1, s0 - q * s1]; } return ((s0 % m) + m) % m; }
console.log(`beta=${beta}: type m Y' Jp Jp/Y'^2 J4 J4/(2Y'^2+Y'^4/m)`);
for (const [typ, m] of cases) {
  const Y = Math.round(Math.pow(m, beta)); const ys: number[] = [], iv: number[] = [];
  for (let y = 1; y <= Y; y++) if (gcd(y, m) === 1) { ys.push(y); iv.push(inv(y, m)); }
  const n = ys.length;
  // map (sum, invsum) -> count, via a hash of the pair
  const map = new Map<number, number>();
  let J4 = 0; const cnt = new Uint32Array(m);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
    let s = ys[i] + ys[j]; if (s >= m) s -= m;
    let t = iv[i] + iv[j]; if (t >= m) t -= m;
    const key = s * m + t; map.set(key, (map.get(key) ?? 0) + 1);
    cnt[t]++;
  }
  let Jp = 0; for (const v of map.values()) Jp += v * v;
  for (let r = 0; r < m; r++) J4 += cnt[r] * cnt[r];
  console.log(`${typ.padEnd(16)} ${String(m).padStart(9)} ${String(n).padStart(5)} ${String(Jp).padStart(10)} ${(Jp / n ** 2).toFixed(3).padStart(7)} ${String(J4).padStart(11)} ${(J4 / (2 * n * n + n ** 4 / m)).toFixed(3)}`);
}
