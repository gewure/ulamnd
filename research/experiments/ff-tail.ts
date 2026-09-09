/**
 * The off-diagonal remainder of the function-field identity has FINITE SUPPORT; this script checks the
 * identity and the support lemma by two independent computations.
 *
 * Over A = F_q[u], f = t² − D, Theorem 8 of the paper gives, for the sum over nonzero h of degree < N,
 *   Σ_h (S_f(h)/C² − 1) = −Σ_{1≤deg d≤N} a_f(d) − q^N Σ_{deg d>N} a_f(d)/|d| + (1 − P(1)) + Off_f(N),
 *   Off_f(N) = Σ_{deg d>N} W_f(d) Σ_{s≠s'} ( 1[m̃ ≠ 0, deg m̃ < N] − q^{N−deg d} ),
 * (s,s') ordered pairs of roots of f mod d, m̃ the representative of s'−s of degree < deg d,
 * W_f(d) = P(1) λ(d)/|d|, λ(d) = ∏_{P|d} |P|/(|P|−2ω_f(P)), a_f = W_f ω_f.
 * Lemma: if m̃ ≠ 0 has degree < N then, with d₂ = ∏{P | d : s ≡ s' (P)} and d₁ = d/d₂, d₂ | m̃ and
 * d₁ | m̃² − 4D, so deg d ≤ M(N) := N − 1 + max(2N − 2, deg D). Hence
 *   Off_f(N) = T_act(N) − T_exp(N),
 *   T_act(N) = Σ_{N<deg d≤M(N)} W_f(d) A_N(d),  A_N(d) = #{(s,s'): s ≠ s', m̃ ≠ 0, deg m̃ < N},
 *   T_exp(N) = q^N Σ_{deg d>N} W_f(d)(ω_f(d)² − ω_f(d))/|d| = q^N [ (1 − A(1)) − Σ_{deg d≤N} W_f(d)(ω_f(d)² − ω_f(d))/|d| ],
 * using the exact identities Σ_d W_f(d)ω_f(d)²/|d| = 1 and Σ_d W_f(d)ω_f(d)/|d| = A(1) = P(1)∏_P(1 + ω_P/(|P|(|P|−2ω_P))).
 * (Proof of the first: Σ_d W_f(d)ω(d)²/|d| = Σ_Q b(Q) ω(Q)² Σ_{d|Q} μ(Q/d) = 1.)
 * Off_f(N) is computed (i) from LHS (thesis/ff.json, from the S_f(h) themselves) through the identity, and
 * (ii) as T_act − T_exp from the roots modulo every squarefree d of degree ≤ M(N); T_act is additionally
 * recomputed by brute force (all monic d, roots by exhaustive search) where q^{M(N)} ≤ 3000.
 *
 *   npx tsx thesis/ff-tail.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fq, type Poly } from "../lib/ffpoly";

const ff = JSON.parse(readFileSync("research/experiments/ff.json", "utf8")) as { q: number; D: string; C: number; P1: number; rows: { N: number; count: number; lhs: number }[] }[];
const f3 = (x: number, k = 4) => x.toFixed(k);

function run(q: number, Dcoeffs: number[], Nmax: number, degPrimes: number) {
  const F = fq(q);
  const { norm, deg, isZero, key, mul, mod, add, sub, scal, invmod, legendre, sqrtmod } = F;
  const D = norm(Dcoeffs);
  const primes = F.primesUpTo(degPrimes);
  type Loc = { P: Poly; k: number; size: number; omega: number; chi: number; r: Poly | null; lambda: number; PP: number };
  const loc: Loc[] = [];
  let P1 = 1;
  for (const P of primes) {
    const k = deg(P),
      size = Math.pow(q, k);
    const chi = legendre(D, P);
    const omega = 1 + chi;
    const r = chi === 1 ? sqrtmod(D, P) : chi === 0 ? [] : null;
    if (r && chi === 1 && key(mod(sub(mul(r, r), D), P)) !== "") throw new Error("bad sqrt");
    const PP = 1 - (omega * omega) / ((size - omega) * (size - omega));
    P1 *= PP;
    loc.push({ P, k, size, omega, chi, r, lambda: size / (size - 2 * omega), PP });
  }
  // ---- A(1) = Σ_d a_f(d)/|d| (absolutely convergent Euler product; primes beyond the table negligible)
  let A1 = P1;
  for (const L of loc) A1 *= 1 + L.omega / (L.size * (L.size - 2 * L.omega));
  // partial sums over squarefree d of degree ≤ Nmax: S2[j] = Σ_{deg d=j} W ω²/|d|, S1[j] = Σ_{deg d=j} W ω/|d| = Σ a_f/|d|,
  // Sa[j] = Σ_{deg d=j} a_f(d); enumerated as products of distinct primes with ω > 0 (others have ω(d) = 0)
  const S2 = new Array(Nmax + 1).fill(0),
    S1 = new Array(Nmax + 1).fill(0),
    Sa = new Array(Nmax + 1).fill(0);
  S2[0] = P1;
  S1[0] = P1;
  Sa[0] = P1;
  {
    const usable0 = loc.filter((L) => L.omega > 0);
    const cho: Loc[] = [];
    const visit0 = (start: number, dgSum: number) => {
      if (dgSum >= 1) {
        let lambda = 1,
          omega = 1;
        for (const L of cho) {
          lambda *= L.lambda;
          omega *= L.omega;
        }
        const size = Math.pow(q, dgSum);
        const W = (P1 * lambda) / size;
        S2[dgSum] += (W * omega * omega) / size;
        S1[dgSum] += (W * omega) / size;
        Sa[dgSum] += W * omega;
      }
      for (let i = start; i < usable0.length; i++) {
        const L = usable0[i];
        if (dgSum + L.k > Nmax) continue;
        cho.push(L);
        visit0(i + 1, dgSum + L.k);
        cho.pop();
      }
    };
    visit0(0, 0);
  }
  // ---- T_act(N): squarefree d with all prime factors split or ramified, N < deg d ≤ M(N)
  const usable = loc.filter((L) => L.omega > 0);
  const Mof = (N: number) => N - 1 + Math.max(2 * N - 2, deg(D));
  const Mmax = Mof(Nmax);
  if (Mmax > degPrimes) throw new Error(`need primes to degree ${Mmax}`);
  const rows: { N: number; M: number; nD: number; count: number; lhs: number; diag: number; diagInc: number; diagTail: number; constTerm: number; offLHS: number; Tact: number; TactBrute: number; Texp: number; offDirect: number }[] = [];
  const Tact = new Array(Nmax + 1).fill(0);
  const nD = new Array(Nmax + 1).fill(0);
  // recursive enumeration of squarefree products of usable primes with total degree in (Nmin, Mmax]
  const chosen: Loc[] = [];
  const visit = (start: number, dgSum: number, dpoly: Poly) => {
    if (dgSum > 1 && chosen.length) {
      // evaluate d for every N with N < dgSum ≤ M(N)
      let anyN = false;
      for (let N = 1; N <= Nmax; N++) if (N < dgSum && dgSum <= Mof(N)) anyN = true;
      if (anyN) evaluate(dpoly, dgSum);
    }
    for (let i = start; i < usable.length; i++) {
      const L = usable[i];
      if (dgSum + L.k > Mmax) continue;
      chosen.push(L);
      visit(i + 1, dgSum + L.k, mul(dpoly, L.P));
      chosen.pop();
    }
  };
  const evaluate = (d: Poly, dg: number) => {
    const size = Math.pow(q, dg);
    let lambda = 1;
    for (const L of chosen) lambda *= L.lambda;
    const W = (P1 * lambda) / size;
    // CRT idempotents e_i ≡ 1 mod P_i, 0 mod P_j
    const idem: Poly[] = chosen.map((L) => {
      const [cof] = F.divmod(d, L.P);
      return mod(mul(cof, invmod(mod(cof, L.P), L.P)), d);
    });
    // options per prime: [m_i, multiplicity]
    const opts: [Poly, number][][] = chosen.map((L) => (L.chi === 1 ? [[[], 2], [scal(2, L.r!), 1], [scal(q - 2, L.r!), 1]] : [[[], 1]]));
    // count differences of degree < N (for each N), nonzero
    const cnt = new Array(Nmax + 1).fill(0);
    const rec = (i: number, m: Poly, mult: number, nonzero: boolean) => {
      if (i === chosen.length) {
        if (!nonzero) return;
        const mm = mod(m, d);
        if (isZero(mm)) throw new Error("CRT gave zero difference");
        const dm = deg(mm);
        for (let N = dm + 1; N <= Nmax; N++) cnt[N] += mult;
        return;
      }
      for (const [mi, mu] of opts[i]) rec(i + 1, isZero(mi) ? m : add(m, mul(mi, idem[i])), mult * mu, nonzero || !isZero(mi));
    };
    rec(0, [], 1, false);
    for (let N = 1; N <= Nmax; N++) if (N < dg && dg <= Mof(N)) {
      Tact[N] += W * cnt[N];
      nD[N]++;
    }
  };
  visit(0, 0, [1]);
  // ---- brute-force T_act for N with q^{M(N)} ≤ 3000: all monic d, squarefree test and roots by exhaustive search
  const brute = (N: number): number => {
    const M = Mof(N);
    if (Math.pow(q, M) > 3000) return NaN;
    let total = 0;
    for (let dg = N + 1; dg <= M; dg++) for (const d of F.monic(dg)) {
      // factor d over the prime table; require squarefree with all factors of ω > 0
      let rem = d,
        ok = true,
        lambda = 1;
      const facs: Loc[] = [];
      for (const L of loc) {
        if (deg(L.P) > deg(rem)) break;
        const [qt, rm] = F.divmod(rem, L.P);
        if (!isZero(rm)) continue;
        if (isZero(F.divmod(qt, L.P)[1])) ok = false; // square factor
        if (L.omega === 0) ok = false;
        facs.push(L);
        lambda *= L.lambda;
        rem = qt;
        if (!ok) break;
      }
      if (!ok || deg(rem) > 0) continue;
      const size = Math.pow(q, dg);
      // roots of x² ≡ D mod d by exhaustive search over residues of degree < dg
      const roots: Poly[] = [];
      for (let idx = 0; idx < size; idx++) {
        const c: number[] = [];
        let x = idx;
        for (let i = 0; i < dg; i++) {
          c.push(x % q);
          x = Math.floor(x / q);
        }
        const r = norm(c);
        if (isZero(mod(sub(mul(r, r), D), d))) roots.push(r);
      }
      let A = 0;
      for (const s of roots) for (const s2 of roots) {
        if (key(s) === key(s2)) continue;
        const m = mod(sub(s2, s), d);
        if (!isZero(m) && deg(m) < N) A++;
      }
      total += ((P1 * lambda) / size) * A;
    }
    return total;
  };
  const rec = ff.find((r) => r.q === q && r.D === Dcoeffs.join(","));
  if (!rec) throw new Error("case missing from thesis/ff.json");
  for (let N = 1; N <= Nmax; N++) {
    let p2 = 0,
      p1 = 0,
      diag = 0;
    for (let j = 0; j <= N; j++) {
      p2 += S2[j];
      p1 += S1[j];
      if (j >= 1) diag += Sa[j];
    }
    const qN = Math.pow(q, N);
    const Texp = qN * (1 - A1 - (p2 - p1)); // q^N Σ_{deg d>N} W(ω² − ω)/|d|
    const diagTail = qN * (A1 - p1); // q^N Σ_{deg d>N} a_f(d)/|d|
    const constTerm = 1 - P1;
    const row = rec.rows.find((r) => r.N === N)!;
    const offLHS = row.lhs + diag + diagTail - constTerm;
    rows.push({ N, M: Mof(N), nD: nD[N], count: row.count, lhs: row.lhs, diag, diagInc: N >= 2 ? Sa[N] : NaN, diagTail, constTerm, offLHS, Tact: Tact[N], TactBrute: brute(N), Texp, offDirect: Tact[N] - Texp });
  }
  return { q, D: Dcoeffs.join(","), C: rec.C, P1, A1, rows };
}

const cases: [number, number[], number, number][] = [
  [3, [0, 1], 5, 12], // D = u, N ≤ 5: M(5) = 12
  [3, [1, 0, 1], 5, 12],
  [3, [2, 0, 1], 5, 12],
  [5, [0, 1], 3, 8], // M(3) = 6; primes to degree 8 for the generating function
  [5, [2, 0, 1], 3, 8],
  [7, [0, 1], 3, 7],
];
const out = [];
for (const [q, Dc, Nmax, dp] of cases) {
  const t0 = performance.now();
  const r = run(q, Dc, Nmax, dp);
  out.push(r);
  console.log(`q=${q}, D=(${r.D}): C=${f3(r.C)} P(1)=${f3(r.P1)}  A(1)=${f3(r.A1, 6)}  1/(C(q−1))=${f3(1 / (r.C * (q - 1)))}  (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
  for (const row of r.rows)
    console.log(
      `  N=${row.N}: LHS=${f3(row.lhs)} Σa_f=${f3(row.diag)} (inc ${f3(row.diagInc)}) diagTail=${f3(row.diagTail)} const=${f3(row.constTerm)} → Off(LHS)=${f3(row.offLHS)} | M(N)=${row.M} #d=${row.nD} T_act=${f3(row.Tact)} (brute ${f3(row.TactBrute)}) T_exp=${f3(row.Texp)} → Off(direct)=${f3(row.offDirect)}  diff=${(row.offDirect - row.offLHS).toExponential(1)}`,
    );
}
writeFileSync("research/experiments/ff-tail.json", JSON.stringify(out, null, 1));
