// Diagonal of the GM kernel at level q = u^2 e (PROOFS-uniform §14 task (a)):
// c_d(u,e) = sum_{z in Lambda_{ah}} #{tau in P^1(Z/q) : c(tau.z) = 0 mod q, b(tau.z) = 0 mod a} / phi(q),  a = u^2, h fixed.
// Compare with u*e (and with the number of roots data).
const pairs = (process.env.UE ?? "1:1,2:1,3:1,5:1,7:1,11:1,13:1,17:1,1:5,2:5,3:5,3:7,5:7,2:13,7:5,3:13,11:5").split(",").map(s => s.split(":").map(Number));
const h = Number(process.env.H ?? "1");
function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function phi(n: number) { let r = n, m = n; for (let p = 2; p * p <= m; p++) if (m % p === 0) { while (m % p === 0) m /= p; r -= r / p; } if (m > 1) r -= r / m; return r; }
function inv(x: number, m: number) { let [r0, r1, s0, s1] = [m, mod(x, m), 0, 1]; while (r1) { const t = Math.floor(r0 / r1); [r0, r1] = [r1, r0 - t * r1]; [s0, s1] = [s1, s0 - t * s1]; } return r0 === 1 ? mod(s0, m) : -1; }
console.log(`h=${h}: u e q #Lambda c_d c_d/(u e) c_d/(u e * prod_{p|e}(1+chi))`);
for (const [u, e] of pairs) {
  const a = u * u, q = a * e, Hp = a * h;
  if (gcd(a, h) !== 1 || gcd(e, 2 * h * u) !== 1) { console.log(`${u} ${e} skipped (gcd)`); continue; }
  const Lam: [number, number, number][] = [];
  for (let C = 1; C * C <= (4 * Hp) / 3 + 1; C++) for (let B = -Math.floor(C / 2); B <= Math.floor(C / 2); B++) {
    if ((B * B + Hp) % C !== 0) continue; const A = (B * B + Hp) / C; if (A < C) continue;
    if (2 * B === -C) continue; if (A === C && B < 0) continue; Lam.push([A, B, C]);
  }
  let tot = 0;
  for (const [A, B, C] of Lam) {
    for (let c0 = 0; c0 < q; c0++) for (let d0 = 0; d0 < q; d0++) {
      if (q > 1 && gcd(gcd(c0, d0), q) !== 1) continue;
      const cc = mod(mod(c0 * c0, q) * A % q + mod(2 * c0 * d0, q) * mod(B, q) % q + mod(d0 * d0, q) * C % q, q);
      if (cc !== 0) continue;
      // complete to tau: find a0,b0 mod a with a0 d0 - b0 c0 = 1 mod a (b-condition is mod a only)
      let ok = false;
      const g = gcd(c0, a);
      for (let a0 = 0; a0 < a && !ok; a0++) {
        const rhs = mod(a0 * d0 - 1, a); if (rhs % g) continue;
        const b0 = g === a ? 0 : mod((rhs / g) * inv(c0 / g, a / g), a / g);
        if (mod(a0 * d0 - b0 * c0, a) !== 1 % a) continue;
        const bb = mod(mod(a0 * c0, a) * mod(A, a) + mod(a0 * d0 + b0 * c0, a) * mod(B, a) + mod(b0 * d0, a) * mod(C, a), a);
        ok = true; if (bb === 0) tot++;
      }
      if (!ok && a === 1) tot++;
    }
  }
  const cd = tot / (q === 1 ? 1 : phi(q));
  let chi = 1; { let m = e; for (let p = 2; p <= m; p++) if (m % p === 0) { while (m % p === 0) m /= p; const leg = Array.from({ length: p }, (_, x) => x).some(x => mod(x * x + Hp, p) === 0) ? 2 : 0; chi *= leg; } }
  console.log(`${u}\t${e}\t${q}\t${Lam.length}\t${cd.toFixed(2)}\t${(cd / (u * e)).toFixed(3)}\t${chi ? (cd / (u * e * chi / Math.max(1, 1))).toFixed(3) : "-"}`);
}
