// F24 test for path A (PROOFS-uniform §13/§14): the kernel quantities of Grimmelt–Merikoski (arXiv 2505.00493, §4.1, §5)
// for the polynomial a*l^2 + h with a = u^2, h = 1 (our piece u for D = -4), level q = a (divisor level d = 1).
// c_d(u)    = sum_{z in Lambda_{ah}} #{tau in Gamma_0(q)\SL2(Z) : alpha(tau.z) = 1}            (diagonal of K2)
// K2(u,T)   = sum_{z2 in Lambda} sum_{w1 in S_{ah}, u(w1,z2) <= T} (1+u)^{-1/2} #{tau : alpha(tau.w1) = alpha(tau.z2) = 1}
// alpha(g)  = [c(g) = 0 mod q] * [b(g) = 0 mod a],  tau.g = tau g tau^t,  g = (A B; B C) with AC - B^2 = ah, z = (B + i sqrt(ah))/C.
// tau runs over primitive bottom rows (c0,d0) mod q; totals divided by phi(q) (scalar classes). Stabiliser weights ignored (scaling test).
const us = (process.env.US ?? "1,2,3,4,5,6,7,8,9,10,11,12,13").split(",").map(Number);
const Ts = (process.env.TS ?? "1,4,16,64").split(",").map(Number);
const h = Number(process.env.H ?? "1");
function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function phi(n: number) { let r = n, m = n; for (let p = 2; p * p <= m; p++) if (m % p === 0) { while (m % p === 0) m /= p; r -= r / p; } if (m > 1) r -= r / m; return r; }
console.log(`h=${h}  columns: u  #Lambda  c_d  K2(T) for T in [${Ts}]  ;  (K2-c_d)/sqrt(T)`);
for (const u of us) {
  const a = u * u, q = a, Hp = a * h;
  // taus: bottom rows with a0,b0
  const taus: [number, number, number, number][] = [];
  for (let c0 = 0; c0 < q; c0++) for (let d0 = 0; d0 < q; d0++) {
    if (gcd(gcd(c0, d0), q) !== 1 && q > 1) continue;
    let found = false;
    for (let a0 = 0; a0 < q && !found; a0++) {
      const rhs = mod(a0 * d0 - 1, q), g = gcd(c0, q);
      if (rhs % g !== 0) continue;
      for (let b0 = 0; b0 < q; b0++) if (mod(b0 * c0, q) === rhs) { taus.push([a0, b0, c0, d0]); found = true; break; }
    }
    if (q === 1 && !found) taus.push([1, 0, 0, 1]);
  }
  const ph = q === 1 ? 1 : phi(q);
  const alpha = (t: [number, number, number, number], A: number, B: number, C: number) => {
    const [a0, b0, c0, d0] = t;
    const cc = mod(c0 * c0 % q * mod(A, q) + 2 * c0 * d0 % q * mod(B, q) + d0 * d0 % q * mod(C, q), q);
    if (cc !== 0) return false;
    const bb = mod(a0 * c0 % a * mod(A, a) + (a0 * d0 + b0 * c0) % a * mod(B, a) + b0 * d0 % a * mod(C, a), a);
    return bb === 0;
  };
  // Lambda: reduced forms |2B| <= C <= A, AC - B^2 = Hp
  const Lam: [number, number, number][] = [];
  for (let C = 1; C * C <= (4 * Hp) / 3 + 1; C++) for (let B = -Math.floor(C / 2); B <= Math.floor(C / 2); B++) {
    if ((B * B + Hp) % C !== 0) continue; const A = (B * B + Hp) / C; if (A < C) continue;
    if (2 * B === -C) continue; if (A === C && B < 0) continue;
    Lam.push([A, B, C]);
  }
  const Ls = Lam.map(([A, B, C]) => taus.filter(t => alpha(t, A, B, C)));
  const cd = Ls.reduce((s, L) => s + L.length, 0) / ph;
  const Tmax = Math.max(...Ts); const K2 = Ts.map(() => 0);
  for (let i = 0; i < Lam.length; i++) {
    const [, B2, C2] = Lam[i]; const L = Ls[i]; if (L.length === 0) continue;
    const rp = 1 + 2 * Tmax + 2 * Math.sqrt(Tmax * Tmax + Tmax), rm = 1 / rp;
    for (let C1 = Math.max(1, Math.floor(C2 * rm)); C1 <= Math.ceil(C2 * rp); C1++) {
      const s2 = (C1 * C2 / 4) * (1 / C1 - 1 / C2) ** 2; if (s2 > Tmax) continue;
      const w = Math.sqrt(4 * Hp * C1 * (Tmax - s2) / C2), c = C1 * B2 / C2;
      for (let B1 = Math.ceil(c - w); B1 <= Math.floor(c + w); B1++) {
        if ((B1 * B1 + Hp) % C1 !== 0) continue;
        const A1 = (B1 * B1 + Hp) / C1;
        const uu = (C1 * C2 / (4 * Hp)) * (B1 / C1 - B2 / C2) ** 2 + s2;
        let cnt = 0; for (const t of L) if (alpha(t, A1, B1, C1)) cnt++;
        if (!cnt) continue;
        for (let j = 0; j < Ts.length; j++) if (uu <= Ts[j] + 1e-9) K2[j] += cnt / Math.sqrt(1 + uu) / ph;
      }
    }
  }
  console.log(`${u}\t${Lam.length}\t${cd.toFixed(2)}\t${K2.map(x => x.toFixed(2)).join("\t")}\t;\t${K2.map((x, j) => ((x - cd) / Math.sqrt(Ts[j])).toFixed(3)).join("\t")}`);
}
