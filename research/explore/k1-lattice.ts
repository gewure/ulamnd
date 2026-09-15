// Gap (G1), PROOFS §21: K1(q; Z, R) = sum_{gamma in Gamma_0(q)} k(gamma), k(g) = 1[u_R(g) <= Z^2] / sqrt(1 + u_R(g)),
// u_R(g) = (a^2 + (b/R)^2 + (cR)^2 + d^2 - 2)/4. Claimed: K1 << q^{o(1)} (1 + R + 1/(qR) + Z/q).
const qs = [9, 25, 45, 121, 169, 225], Zs = [10, 40, 160], Rs = [0.3, 1];
function divisors(n: number) { n = Math.abs(n); const d: number[] = []; for (let i = 1; i * i <= n; i++) if (n % i === 0) { d.push(i); if (i * i !== n) d.push(n / i); } return d; }
console.log("q Z R K1 claimed(1+R+1/(qR)+Z/q) ratio");
for (const q of qs) for (const Z of Zs) for (const R of Rs) {
  const Z2 = Z * Z; let K = 0;
  const w = (a: number, b: number, c: number, d: number) => { const u = (a * a + (b / R) ** 2 + (c * R) ** 2 + d * d - 2) / 4; return u <= Z2 ? 1 / Math.sqrt(1 + u) : 0; };
  const A = Math.ceil(2 * Z + 1);
  for (let a = -A; a <= A; a++) for (let d = -A; d <= A; d++) {
    const n = a * d - 1; // = b c
    if (n === 0) { // bc = 0: b = 0 or c = 0 (a d = 1)
      const Bmax = Math.ceil(2 * Z * R + 2), Cmax = Math.ceil(2 * Z / R + 2);
      for (let b = -Bmax; b <= Bmax; b++) K += w(a, b, 0, d);            // c = 0 (includes b = 0)
      for (let c = q; c <= Cmax; c += q) { K += w(a, 0, c, d) + w(a, 0, -c, d); } // b = 0, c != 0
      continue;
    }
    for (const c0 of divisors(n)) { if (c0 % q) continue; const b0 = n / c0; K += w(a, b0, c0, d) + w(a, -b0, -c0, d); }
  }
  const cl = 1 + R + 1 / (q * R) + Z / q;
  console.log(`${q}\t${Z}\t${R}\t${K.toFixed(2)}\t${cl.toFixed(2)}\t${(K / cl).toFixed(2)}`);
}
