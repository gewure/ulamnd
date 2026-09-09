/**
 * Function-field version of the pair-correlation sum, computed EXACTLY over A = F_q[u].
 *
 *   npx tsx thesis/ff.ts
 *
 * For f(t) = t² − D(u) with D ∈ A (q odd), the pair singular series over the primes P of A is
 *   S_f(h) = Π_P (1 − (2ω(P) − ν(P,h))/|P|) / (1 − 1/|P|)²,   |P| = q^{deg P},
 * with ω(P) = 1 + (D/P) (Legendre symbol in A/P) and ν(P,h) = ω(P) if P | h, 1 if P | h²−4D and P ∤ h,
 * 0 otherwise. For each h ≠ 0 the product is finite once the constant P(1) = Π_P P_P is factored out.
 *
 * The exact identity (paper, Theorem 8) reads, for the sum over nonzero h of degree < N,
 *   Σ_h (S_f(h)/C² − 1) = −Σ_{1≤deg d≤N} a_f(d) − q^N Σ_{deg d>N} a_f(d)/|d| + (1 − P(1)) + Off_f(N),
 * with a_f(d) = W_f(d) ω_f(d), W_f(d) = |d| b(d) ∏_{P∤d} P_P = P(1) λ(d)/|d|, λ(d) = ∏_{P|d} |P|/(|P|−2ω_f(P)),
 * P(1) = ∏_P P_P, and Off_f(N) the off-diagonal remainder, which involves only moduli of degree > N (every
 * residue class mod d, deg d ≤ N, has exactly q^{N−deg d} representatives of degree < N, so the pairs of
 * distinct roots cancel exactly for small moduli). The constant 1 − P(1) is the contribution of the modulus
 * d = 1, which over Z is zero and over F_q[u] is not, because h = 0 is excluded from the q^N polynomials of
 * degree < N. The conjecture in function-field form is Off_f(N) = O(1); Σ_{1≤deg d≤N} a_f(d) = N/C(f) + c_f + o(1)
 * and q^N Σ_{deg d>N} a_f(d)/|d| → 1/(C(f)(q−1)). We compute LHS, the two diagonal sums and hence Off exactly
 * (floating point on exact rationals; the series through A(1) = Σ_d a_f(d)/|d| = P(1) ∏_P (1 + ω_P/(|P|(|P|−2ω_P)))).
 * thesis/ff-tail.ts recomputes Off_f(N) independently from the roots of f modulo every squarefree d.
 */
import { writeFileSync } from "node:fs";

type Poly = number[]; // coefficients, low degree first, over F_q; normalised (no trailing zeros)

function run(q: number, Dcoeffs: number[], Nmax: number, degPrimes: number): { q: number; D: string; rows: { N: number; count: number; lhs: number; diag: number; diagTail: number; constTerm: number; off: number; diagPred: number }[]; C: number; P1: number; A1: number } {
  const norm = (a: Poly): Poly => {
    let n = a.length;
    while (n > 0 && a[n - 1] % q === 0) n--;
    return a.slice(0, n).map((c) => ((c % q) + q) % q);
  };
  const deg = (a: Poly) => a.length - 1; // deg(0) = -1
  const sub = (a: Poly, b: Poly): Poly => {
    const r: Poly = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) r.push(((a[i] ?? 0) - (b[i] ?? 0) + q) % q);
    return norm(r);
  };
  const mul = (a: Poly, b: Poly): Poly => {
    if (!a.length || !b.length) return [];
    const r: Poly = new Array(a.length + b.length - 1).fill(0);
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) r[i + j] = (r[i + j] + a[i] * b[j]) % q;
    return norm(r);
  };
  const inv = (x: number): number => {
    for (let y = 1; y < q; y++) if ((x * y) % q === 1) return y;
    throw new Error("no inverse");
  };
  const divmod = (a: Poly, b: Poly): [Poly, Poly] => {
    let r = a.slice();
    const qt: Poly = new Array(Math.max(0, a.length - b.length + 1)).fill(0);
    const lb = inv(b[b.length - 1]);
    while (r.length >= b.length && r.length) {
      const c = (r[r.length - 1] * lb) % q;
      const sh = r.length - b.length;
      qt[sh] = c;
      for (let i = 0; i < b.length; i++) r[sh + i] = (r[sh + i] - c * b[i] + q * q) % q;
      r = norm(r);
    }
    return [norm(qt), r];
  };
  const mod = (a: Poly, b: Poly) => divmod(a, b)[1];
  const isZero = (a: Poly) => a.length === 0;
  const key = (a: Poly) => a.join(",");
  const powmod = (a: Poly, e: number, m: Poly): Poly => {
    let r: Poly = [1],
      b = mod(a, m);
    while (e > 0) {
      if (e & 1) r = mod(mul(r, b), m);
      b = mod(mul(b, b), m);
      e >>= 1;
    }
    return r;
  };
  // enumerate monic polynomials of given degree
  function* monic(dg: number): Generator<Poly> {
    const total = Math.pow(q, dg);
    for (let idx = 0; idx < total; idx++) {
      const c: number[] = [];
      let x = idx;
      for (let i = 0; i < dg; i++) {
        c.push(x % q);
        x = Math.floor(x / q);
      }
      c.push(1);
      yield c;
    }
  }
  // irreducibles up to degPrimes by sieving
  const primes: Poly[] = [];
  const composite = new Set<string>();
  for (let dg = 1; dg <= degPrimes; dg++) {
    for (const p of monic(dg)) {
      if (composite.has(key(p))) continue;
      primes.push(p);
      // mark multiples of p of degree ≤ degPrimes
      for (let dm = 1; dm + dg <= degPrimes; dm++) for (const m of monic(dm)) composite.add(key(mul(p, m)));
    }
  }
  const D = norm(Dcoeffs);
  const fourD = norm(D.map((c) => (4 * c) % q));
  // local data per prime: omega, |P|, P_P, b(P)
  const local = new Map<string, { P: Poly; size: number; omega: number; PP: number; b: number }>();
  // P(1) = ∏ P_P is a signed product (P_P < 0 is possible for small |P|); C = ∏ (1 − ω/|P|)/(1 − 1/|P|).
  let P1 = 1,
    logC = 0;
  for (const P of primes) {
    const size = Math.pow(q, deg(P));
    let omega: number;
    const Dm = mod(D, P);
    if (isZero(Dm)) omega = 1;
    else {
      // Euler criterion: D^((|P|-1)/2) mod P = ±1
      const e = powmod(Dm, (size - 1) / 2, P);
      omega = key(e) === "1" ? 2 : 0;
    }
    const PP = 1 - (omega * omega) / ((size - omega) * (size - omega));
    const b = 1 / ((size - omega) * (size - omega));
    local.set(key(P), { P, size, omega, PP, b });
    P1 *= PP;
    logC += Math.log((1 - omega / size) / (1 - 1 / size));
  }
  const C = Math.exp(logC);
  // factor a polynomial into primes (trial division), returns list of prime keys with multiplicity ignored
  const factor = (a: Poly): string[] => {
    const out: string[] = [];
    let r = a.slice();
    for (const P of primes) {
      if (deg(P) * 2 > deg(r) + 1 && deg(r) >= 0) {
        if (deg(r) > 0) {
          if (deg(r) <= degPrimes) out.push(key(monicize(r)));
          else throw new Error(`prime factor of degree ${deg(r)} exceeds table (${degPrimes})`);
        }
        return out;
      }
      let [qt, rem] = divmod(r, P);
      if (isZero(rem)) {
        out.push(key(P));
        r = qt;
        [qt, rem] = divmod(r, P);
        while (isZero(rem)) {
          r = qt;
          [qt, rem] = divmod(r, P);
        }
      }
      if (deg(r) <= 0) return out;
    }
    if (deg(r) > 0) out.push(key(monicize(r)));
    return out;
  };
  const monicize = (a: Poly): Poly => {
    const l = inv(a[a.length - 1]);
    return norm(a.map((c) => (c * l) % q));
  };
  // normalised singular series s(h) = S_f(h)/(C² P(1)) as a finite product over primes dividing h(h²-4D)
  const sNorm = (h: Poly): number => {
    let s = 1;
    const seen = new Set<string>();
    const contribute = (Pk: string, divH: boolean) => {
      if (seen.has(Pk)) return;
      seen.add(Pk);
      const L = local.get(Pk);
      if (!L) throw new Error("unknown prime " + Pk);
      const nu = divH ? L.omega : 1;
      const g = (1 - (2 * L.omega) / L.size + nu / L.size) / Math.pow(1 - L.omega / L.size, 2);
      s *= g / L.PP;
    };
    for (const Pk of factor(h)) contribute(Pk, true);
    const Q = sub(mul(h, h), fourD);
    if (!isZero(Q)) for (const Pk of factor(Q)) if (!seen.has(Pk)) contribute(Pk, false);
    return s;
  };
  // squarefree monic d of degree ≤ Nmax with their prime lists
  const sqfree: { d: Poly; ps: string[]; dg: number }[] = [];
  for (let dg = 0; dg <= Nmax; dg++) {
    if (dg === 0) {
      sqfree.push({ d: [1], ps: [], dg: 0 });
      continue;
    }
    for (const d of monic(dg)) {
      // squarefree iff product of distinct primes with degrees summing to dg
      let r = d.slice();
      const ps: string[] = [];
      let ok = true;
      for (const P of primes) {
        if (deg(P) > deg(r)) break;
        const [qt, rem] = divmod(r, P);
        if (isZero(rem)) {
          ps.push(key(P));
          r = qt;
          if (isZero(divmod(r, P)[1])) {
            ok = false;
            break;
          }
        }
        if (deg(r) === 0) break;
      }
      if (ok && deg(r) === 0) sqfree.push({ d, ps, dg });
    }
  }
  const omegaOf = (ps: string[]) => ps.reduce((a, k) => a * local.get(k)!.omega, 1);
  const sizeOf = (ps: string[]) => ps.reduce((a, k) => a * local.get(k)!.size, 1);
  // a_N(d) = |d| b(d) ω(d) P_N(d) with P_N(d) = Σ_{(m,d)=1, deg m ≤ N − deg d} μ(m) b(m) ω(m)²
  const rows: { N: number; count: number; lhs: number; diag: number; diagTail: number; constTerm: number; off: number; diagPred: number }[] = [];
  // all nonzero h of degree < N: accumulate Σ s(h) by degree
  const sByDeg: number[] = [];
  for (let dg = 0; dg < Nmax; dg++) {
    let s = 0;
    const total = Math.pow(q, dg) * (q - 1);
    // all polynomials of exact degree dg (leading coefficient 1..q-1)
    for (let lead = 1; lead < q; lead++) for (const m of monic(dg)) {
      const h = norm(m.map((c) => (c * lead) % q));
      s += sNorm(h);
    }
    sByDeg.push(s);
    void total;
  }
  // A(1) = Σ_d a_f(d)/|d| = P(1) ∏_P (1 + ω_P/(|P|(|P|−2ω_P)))  (absolutely convergent; primes beyond the table negligible)
  let A1 = P1;
  for (const L of local.values()) A1 *= 1 + L.omega / (L.size * (L.size - 2 * L.omega));
  const lambdaOf = (ps: string[]) => ps.reduce((acc, k) => {
    const L = local.get(k)!;
    return (acc * L.size) / (L.size - 2 * L.omega);
  }, 1);
  const aOf = (ps: string[]) => (P1 * lambdaOf(ps) * omegaOf(ps)) / sizeOf(ps); // a_f(d) = W_f(d) ω_f(d)
  let cum = 0;
  for (let N = 1; N <= Nmax; N++) {
    cum += sByDeg[N - 1];
    const count = Math.pow(q, N) - 1;
    const lhs = P1 * cum - count; // Σ_h (S_f/C² − 1)
    let diag = 0,
      aOverSize = P1; // d = 1 term of Σ_{deg d ≤ N} a_f(d)/|d|
    for (const d of sqfree) if (d.dg >= 1 && d.dg <= N) {
      const a = aOf(d.ps);
      diag += a;
      aOverSize += a / sizeOf(d.ps);
    }
    const diagTail = Math.pow(q, N) * (A1 - aOverSize); // q^N Σ_{deg d>N} a_f(d)/|d|
    const constTerm = 1 - P1;
    const off = lhs + diag + diagTail - constTerm;
    rows.push({ N, count, lhs, diag, diagTail, constTerm, off, diagPred: N / C });
  }
  return { q, D: Dcoeffs.join(","), rows, C, P1, A1 };
}

const results: ReturnType<typeof run>[] = [];
const cases: [number, number[], number, number][] = [
  [3, [0, 1], 7, 14], // D = u          f = t² − u
  [3, [1, 0, 1], 7, 14], // D = u² + 1 (irreducible)
  [3, [2, 0, 1], 7, 14], // D = u² + 2
  [5, [0, 1], 5, 10], // q = 5, D = u
  [5, [2, 0, 1], 5, 10], // D = u² + 2 (irreducible)
  [7, [0, 1], 4, 8],
];
for (const [q, D, Nmax, dp] of cases) {
  const t0 = performance.now();
  const r = run(q, D, Nmax, dp);
  results.push(r);
  console.log(`q=${q}, f = t² − (${r.D}): C ≈ ${r.C.toFixed(4)}, P(1) ≈ ${r.P1.toFixed(4)}  (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
  for (const row of r.rows) console.log(`  N=${row.N}: #h=${row.count}  LHS=${row.lhs.toFixed(4)}  Σa_f=${row.diag.toFixed(4)} (N/C=${row.diagPred.toFixed(3)})  diagTail=${row.diagTail.toFixed(4)} (1/(C(q−1))=${(1 / (r.C * (q - 1))).toFixed(4)})  1−P(1)=${row.constTerm.toFixed(4)}  Off=${row.off.toFixed(4)}`);
}
writeFileSync("research/experiments/ff.json", JSON.stringify(results, null, 1));
// paper/data/ff-rows.tex is generated from thesis/ff.json by paper/gen-macros.ts
