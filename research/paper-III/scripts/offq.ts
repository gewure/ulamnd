/**
 * Route B evidence: the function-field off-diagonal Off_f(N) for f = t^2 - D over F_q[u], D = u, as a function
 * of q at fixed N (N = 2 for all q; N = 3 for small q).  Prop. B3 predicts Off_f(N) = O_N(q^{-1/2}) as q -> inf.
 * Off_f(N) = T_act(N) - T_exp(N) exactly as in research/experiments/ff-tail.ts (finite-support lemma), computed from
 * the roots of f modulo every squarefree d of degree in (N, M(N)], M(N) = N - 1 + max(2N - 2, deg D).
 *
 *   npx tsx research/paper-III/scripts/offq.ts        (a few minutes)
 * Writes research/paper-III/data/offq.json and offq.dat (q N off Tact Texp).
 */
import { writeFileSync } from "node:fs";
import { fq, type Poly } from "../../lib/ffpoly";
const f3 = (x: number, k = 5) => x.toFixed(k);
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
  const rows: { N: number; M: number; nD: number; Tact: number; Texp: number; off: number }[] = []; // placeholdermber; TactBrute: number; Texp: number; offDirect: number }[] = [];
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
  for (let N = 1; N <= Nmax; N++) {
    let p2 = 0, p1 = 0;
    for (let j = 0; j <= N; j++) { p2 += S2[j]; p1 += S1[j]; }
    const qN = Math.pow(q, N);
    const Texp = qN * (1 - A1 - (p2 - p1));
    rows.push({ N, M: Mof(N), nD: nD[N], Tact: Tact[N], Texp, off: Tact[N] - Texp });
  }
  return { q, D: Dcoeffs.join(","), P1, A1, rows };
}

const out: { q: number; D: string; P1: number; A1: number; rows: { N: number; M: number; nD: number; Tact: number; Texp: number; off: number }[] }[] = [];
const Dc = (process.env.D ?? "0,1").split(",").map(Number);   // coefficients of D, low degree first
const TAG = process.env.TAG ?? "";
const qs2 = [3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
const qs3 = process.env.N3 === "0" ? [] : [3, 5, 7];   // N = 3 needs all squarefree d of degree <= 6 (q^6 enumeration): too slow beyond q = 7 locally
for (const q of qs2) {
  const t0 = performance.now();
  const Nmax = qs3.includes(q) ? 3 : 2;
  const degP = Nmax === 3 ? 6 : 4;   // M(2) = 3, M(3) = 6; one extra degree for the Euler products when cheap
  const r = run(q, Dc, Nmax, degP);
  out.push(r);
  console.log(`q=${q}: ` + r.rows.map((row) => `N=${row.N} Off=${f3(row.off)} (Tact ${f3(row.Tact)} Texp ${f3(row.Texp)}, #d=${row.nD})`).join("  ") + `  (${((performance.now() - t0) / 1000).toFixed(1)} s)`);
}
writeFileSync(`research/paper-III/data/offq${TAG}.json`, JSON.stringify(out, null, 1));
writeFileSync(`research/paper-III/data/offq${TAG}.dat`, "q N off Tact Texp sqrtq_off\n" + out.flatMap((r) => r.rows.map((row) => `${r.q} ${row.N} ${row.off} ${row.Tact} ${row.Texp} ${row.off * Math.sqrt(r.q)}`)).join("\n") + "\n");
