/**
 * window.ts — size of the window W_u(Y; L) for f = t^2+1 (paper III, eq. window; paper IV route 9).
 * For even squarefree u = 2u' (u' with all primes = 1 mod 4) and lengths Y, enumerate all squarefree d' <= 2 u^2 Y L
 * with all primes = 1 mod 4, coprime to u; roots of x^2 = -1 mod d' by CRT, dilated set R^{(u)} = {±2 ū i}; and split
 *   P_u(Y) = small (d' <= Y) + window (Y < d' <= u^2 Y L) + far (u^2 Y L < d' <= 2 u^2 Y L)   [far truncated]
 * with the exact Cesàro weights B^{(Y)}_{d'}(m) = Σ_{h<=Y, h=m (d')} (Y-h) - Y^2/(2d') and weight λ(d')/d', λ(p) = p/(p-4).
 *   U="2,10,26,130" Y="1000,10000,100000" L=1 npx tsx research/paper-IV/scripts/window.ts
 */
const Us = (process.env.U ?? "2,10,26,130").split(",").map(Number);
const Ys = (process.env.Y ?? "1000,10000,100000").split(",").map(Number);
const L = Number(process.env.L ?? 1);
const t0 = performance.now(); const el = () => ((performance.now() - t0) / 1000).toFixed(0) + " s";
const NCAP = Number(process.env.NCAP ?? 4e7); // pairs (u, Y) with 2 u^2 Y L > NCAP are skipped
const Nmax = Math.min(NCAP, Math.max(...Us.map((u) => 2 * u * u * Math.max(...Ys) * L)));
// primes = 1 mod 4 up to Nmax with sqrt(-1)
const sieve = new Uint8Array(Nmax + 1); const P: number[] = [];
for (let i = 2; i <= Nmax; i++) { if (sieve[i]) continue; if (i % 4 === 1) P.push(i); if (i <= Nmax / i) for (let j = i * i; j <= Nmax; j += i) sieve[j] = 1; }
const powmod = (b: number, e: number, m: number) => { let r = 1n, bb = BigInt(b), mm = BigInt(m); let ee = BigInt(e); bb %= mm; while (ee > 0n) { if (ee & 1n) r = (r * bb) % mm; bb = (bb * bb) % mm; ee >>= 1n; } return Number(r); };
const sqrtm1 = new Map<number, number>();
for (const p of P) { for (let g = 2; ; g++) { const r = powmod(g, (p - 1) >> 1, p); if (r === p - 1) { sqrtm1.set(p, powmod(g, (p - 1) >> 2, p)); break; } } }
console.log(`${P.length} primes = 1 (4) up to ${Nmax} (${el()})`);
const egcd = (a: number, m: number) => { let [o, r, s, t] = [a % m, m, 1, 0]; while (r) { const q = Math.floor(o / r); [o, r] = [r, o - q * r]; [s, t] = [t, s - q * t]; } return ((s % m) + m) % m; }; // a^{-1} mod m
const mulmod = (a: number, b: number, m: number) => Number((BigInt(a) * BigInt(b)) % BigInt(m));
function B(Y: number, m: number, d: number): number { // m in [1, d]
  if (m > Y) return -(Y * Y) / (2 * d);
  const n = Math.floor((Y - m) / d) + 1;
  return n * (Y - m) - (d * n * (n - 1)) / 2 - (Y * Y) / (2 * d);
}
for (const u of Us) {
  const uf = u; // must be even squarefree with odd part split; not checked
  const Yok = Ys.filter((Y) => 2 * u * u * Y * L <= NCAP); if (!Yok.length) continue;
  const cap = 2 * u * u * Math.max(...Yok) * L;
  // accumulators per Y: [small, window, far, count of d' in window]
  const acc = Ys.map(() => [0, 0, 0, 0, 0, 0, 0]); // + window-rough (P+(d') > Y), window-smooth, #rough
  // DFS over squarefree products of primes = 1 mod 4, coprime to u, carrying (d, lambda, roots of x^2=-1 mod d)
  const rec = (start: number, d: number, lam: number, roots: number[], pmax: number) => {
    for (let i = start; i < P.length; i++) {
      const p = P[i]; if (d * p > cap) break; if (u % p === 0) continue;
      const dp = d * p, lp = lam * (p / (p - 4)), ip = sqrtm1.get(p)!;
      // CRT: combine each root a mod d with ±ip mod p
      const dinv = egcd(d % p, p);
      const nr: number[] = [];
      for (const a of roots) for (const b of [ip, p - ip]) { const t = mulmod(((b - (a % p)) % p + p) % p, dinv, p); nr.push(a + d * t); }
      // evaluate d' = dp
      const uinv = egcd(u % dp, dp);
      const dil = nr.map((r) => mulmod(2 * r % dp, uinv, dp)); // x = 2 ū i  (and its negatives are included since roots come in ± pairs)
      for (let yi = 0; yi < Ys.length; yi++) {
        const Y = Ys[yi]; if (2 * u * u * Y * L > NCAP || dp > 2 * u * u * Y * L) continue;
        let s = 0; for (const x of dil) s += B(Y, x === 0 ? dp : x, dp);
        const val = (lp / dp) * s;
        if (dp <= Y) acc[yi][0] += val; else if (dp <= u * u * Y * L) { acc[yi][1] += val; acc[yi][3]++; if (Math.max(pmax, p) > Y) { acc[yi][4] += val; acc[yi][6]++; } else acc[yi][5] += val; } else acc[yi][2] += val;
      }
      rec(i + 1, dp, lp, nr, Math.max(pmax, p));
    }
  };
  rec(0, 1, 1, [0], 0);
  for (let yi = 0; yi < Ys.length; yi++) {
    const Y = Ys[yi]; if (2 * u * u * Y * L > NCAP) continue; const [sm, wi, fa, n, wr, ws, nr] = acc[yi];
    console.log(`u=${u} Y=${Y}: small=${sm.toFixed(3)} window=${wi.toFixed(3)} far(1x)=${fa.toFixed(3)} total=${(sm + wi + fa).toFixed(3)} | trivial scale Y log(u^2 L)=${(Y * Math.log(u * u * L)).toFixed(0)}, #d' in window ${n}, window/Y=${(wi / Y).toFixed(4)} | window split: rough (P+>Y) ${wr.toFixed(3)} over ${nr} moduli, smooth ${ws.toFixed(3)} over ${n - nr} (${el()})`);
  }
}
