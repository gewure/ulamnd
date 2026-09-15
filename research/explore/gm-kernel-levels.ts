// Test of hypothesis (a') (PROOFS-uniform §16): off-diagonal of the GM kernel summed over the levels q = u^2 e, e <= E squarefree, (e, 2uh) = 1.
// By CRT, P^1(Z/q) = P^1(Z/a) x P^1(Z/e); alpha(tau.g) = [a-part: c = 0, b = 0 mod a] * prod_{p|e} [Q_g(c0,d0) = 0 mod p].
// diag(E)  = sum_z (|V_a(z)|/phi(a)) * sum_e prod_{p|e} |R_p(z)|
// off(E,T) = sum_{z2} sum_{w1 != z2, N <= 2ah(1+2T)} (1+u)^{-1/2} (|V_a(z2) cap V_a(w1)|/phi(a)) * sum_e prod_{p|e} |R_p(z2) cap R_p(w1)|
// Integer distance test: N = A1 C2 + A2 C1 - 2 B1 B2, 1 + 2u = N/(2ah).
const us = (process.env.US ?? "3,5,7").split(",").map(Number);
const Es = (process.env.ES ?? "1,10,30,60").split(",").map(Number);
const T = Number(process.env.T ?? "16"), h = Number(process.env.H ?? "1");
function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function phi(n: number) { let r = n, m = n; for (let p = 2; p * p <= m; p++) if (m % p === 0) { while (m % p === 0) m /= p; r -= r / p; } if (m > 1) r -= r / m; return r; }
function primes(n: number) { const f: number[] = []; for (let p = 2; p * p <= n; p++) if (n % p === 0) { f.push(p); n /= p; if (n % p === 0) return null; } if (n > 1) f.push(n); return f; }
for (const u of us) {
  const a = u * u, Hp = a * h, Emax = Math.max(...Es);
  const eList = [] as { e: number; ps: number[] }[];
  for (let e = 1; e <= Emax; e++) { const ps = primes(e); if (!ps || gcd(e, 2 * u * h) !== 1) continue; eList.push({ e, ps }); }
  const allP = [...new Set(eList.flatMap(x => x.ps))];
  // a-part taus
  const taus: number[][] = [];
  for (let c0 = 0; c0 < a; c0++) for (let d0 = 0; d0 < a; d0++) {
    if (gcd(gcd(c0, d0), a) !== 1) continue;
    let done = false;
    for (let a0 = 0; a0 < a && !done; a0++) for (let b0 = 0; b0 < a && !done; b0++) if (mod(a0 * d0 - b0 * c0, a) === 1 % a) { taus.push([a0, b0, c0, d0]); done = true; }
  }
  const ph = phi(a);
  const Va = (A: number, B: number, C: number) => { const s = new Set<number>(); taus.forEach(([a0, b0, c0, d0], i) => {
    if (mod(mod(c0 * c0, a) * mod(A, a) + mod(2 * c0 * d0, a) * mod(B, a) + mod(d0 * d0, a) * mod(C, a), a) !== 0) return;
    if (mod(mod(a0 * c0, a) * mod(A, a) + mod(a0 * d0 + b0 * c0, a) * mod(B, a) + mod(b0 * d0, a) * mod(C, a), a) !== 0) return; s.add(i); }); return s; };
  const Rp = (A: number, B: number, C: number, p: number) => { const s: number[] = []; // projective points (1:t), t mod p, and (0:1)
    for (let t = 0; t < p; t++) if (mod(A + 2 * t * B + t * t * C, p) === 0) s.push(t); // (c0,d0) = (1,t)
    if (mod(C, p) === 0) s.push(-1); return s; };
  const Lam: number[][] = [];
  for (let C = 1; C * C <= (4 * Hp) / 3 + 1; C++) for (let B = -Math.floor(C / 2); B <= Math.floor(C / 2); B++) {
    if ((B * B + Hp) % C !== 0) continue; const A = (B * B + Hp) / C; if (A < C) continue; if (2 * B === -C) continue; if (A === C && B < 0) continue; Lam.push([A, B, C]); }
  const sumE = (inter: (p: number) => number) => { const byP = new Map(allP.map(p => [p, inter(p)])); return Es.map(E => eList.filter(x => x.e <= E).reduce((s, x) => s + x.ps.reduce((m, p) => m * byP.get(p)!, 1), 0)); };
  const diag = Es.map(() => 0), off = Es.map(() => 0);
  const Nmax = 2 * Hp * (1 + 2 * T);
  for (const [A2, B2, C2] of Lam) {
    const V2 = Va(A2, B2, C2); if (!V2.size) continue;
    const R2 = new Map(allP.map(p => [p, Rp(A2, B2, C2, p)]));
    const dE = sumE(p => R2.get(p)!.length); dE.forEach((x, j) => diag[j] += V2.size / ph * x);
    const rp = 1 + 2 * T + 2 * Math.sqrt(T * T + T) + 1;
    for (let C1 = 1; C1 <= Math.ceil(C2 * rp); C1++) {
      const w = Math.sqrt(4 * Hp * C1 * (T + 1) / C2) + 2, c = C1 * B2 / C2;
      for (let B1 = Math.floor(c - w); B1 <= Math.ceil(c + w); B1++) {
        if ((B1 * B1 + Hp) % C1 !== 0) continue; const A1 = (B1 * B1 + Hp) / C1;
        const N = A1 * C2 + A2 * C1 - 2 * B1 * B2; if (N > Nmax) continue;
        if (A1 === A2 && B1 === B2 && C1 === C2) continue;
        const V1 = Va(A1, B1, C1); let k = 0; for (const i of V1) if (V2.has(i)) k++; if (!k) continue;
        const uu = (N / (2 * Hp) - 1) / 2;
        const oE = sumE(p => { const r1 = Rp(A1, B1, C1, p); return R2.get(p)!.filter(t => r1.includes(t)).length; });
        oE.forEach((x, j) => off[j] += k / ph / Math.sqrt(1 + uu) * x);
      }
    }
  }
  console.log(`u=${u} T=${T} E=[${Es}] diag=[${diag.map(x => x.toFixed(1))}] off=[${off.map(x => x.toFixed(2))}] off/sqrtT=[${off.map(x => (x / Math.sqrt(T)).toFixed(2))}]`);
}
