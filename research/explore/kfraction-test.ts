// F24 test for PROOFS-uniform §15: size of S(d,r) = sum_{n1<=N} sum_{n2<=N} chi_{-4}(n2) e(r * inv(n1 n2) / d)
// for squarefree d with all prime factors = 1 mod 4 (roots of r^2 = -1 mod d), N = floor(d^beta), N^2 ~ d^{2 beta} < d.
// Reports rms |S| / sqrt(#terms) (square-root cancellation => O(1)) and max |S| / #terms (trivial = 1).
const lo = Number(process.env.LO ?? "20000"), hi = Number(process.env.HI ?? "40000"), beta = Number(process.env.BETA ?? "0.45");
const maxd = Number(process.env.MAXD ?? "150");
function factor(n: number) { const f: number[] = []; for (let p = 2; p * p <= n; p++) if (n % p === 0) { f.push(p); n /= p; if (n % p === 0) return null; } if (n > 1) f.push(n); return f; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function powmod(b: number, e: number, m: number) { let r = 1n, B = BigInt(b % m), M = BigInt(m), E = BigInt(e); while (E > 0n) { if (E & 1n) r = r * B % M; B = B * B % M; E >>= 1n; } return Number(r); }
let cnt = 0, sumsq = 0, maxratio = 0, terms0 = 0;
for (let d = lo; d <= hi && cnt < maxd; d++) {
  const f = factor(d); if (!f || f.some(p => p % 4 !== 1)) continue;
  // roots of r^2 = -1 mod d via CRT of prime roots
  let roots = [0], m = 1;
  for (const p of f) { let s = 0; for (let x = 1; x < p; x++) if ((x * x + 1) % p === 0) { s = x; break; }
    const nr: number[] = []; for (const r0 of roots) for (const sp of [s, p - s]) { // CRT r = r0 mod m, sp mod p
      const t = mod((sp - r0) * powmod(m % p, p - 2, p), p); nr.push(r0 + m * t); }
    roots = nr; m *= p; }
  const inv = new Int32Array(d); for (let x = 1; x < d; x++) { if (inv[x]) continue; }
  // inverse table via extended Euclid per needed value (products up to N^2 < d)
  const N = Math.floor(Math.pow(d, beta));
  const invOf = (x: number) => { let [a0, a1, s0, s1] = [d, x % d, 0, 1]; while (a1) { const q = Math.floor(a0 / a1); [a0, a1] = [a1, a0 - q * a1]; [s0, s1] = [s1, s0 - q * s1]; } return a0 === 1 ? mod(s0, d) : -1; };
  const prodInv = new Float64Array(N * N); const valid = new Uint8Array(N * N);
  for (let n1 = 1; n1 <= N; n1++) for (let n2 = 1; n2 <= N; n2++) { const iv = invOf(n1 * n2); if (iv >= 0) { prodInv[(n1 - 1) * N + n2 - 1] = iv; valid[(n1 - 1) * N + n2 - 1] = 1; } }
  let terms = 0; for (let i = 0; i < N * N; i++) if (valid[i] && ((i % N) + 1) % 2 === 1) terms++;
  for (const r of roots) {
    let re = 0, im = 0;
    for (let n1 = 1; n1 <= N; n1++) for (let n2 = 1; n2 <= N; n2 += 2) { const i = (n1 - 1) * N + n2 - 1; if (!valid[i]) continue;
      const chi = n2 % 4 === 1 ? 1 : -1; const ang = 2 * Math.PI * ((r * prodInv[i]) % d) / d; re += chi * Math.cos(ang); im += chi * Math.sin(ang); }
    const a2 = re * re + im * im; sumsq += a2 / terms; maxratio = Math.max(maxratio, Math.sqrt(a2) / terms); cnt++; terms0 = terms;
  }
}
console.log(`d in [${lo},${hi}], beta=${beta}: samples=${cnt}, last N^2-terms=${terms0}, rms|S|/sqrt(terms)=${Math.sqrt(sumsq / cnt).toFixed(3)}, max|S|/terms=${maxratio.toFixed(4)}`);
