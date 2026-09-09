/**
 * Arithmetic in A = F_q[u] for the function-field experiments (thesis/ff-tail.ts). Polynomials are
 * coefficient arrays, low degree first, normalised (no trailing zeros); the zero polynomial is [].
 * (thesis/ff.ts carries its own copy of the basic operations; this module adds gcd, CRT and square roots.)
 */
export type Poly = number[];

export function fq(q: number) {
  const norm = (a: Poly): Poly => {
    let n = a.length;
    while (n > 0 && a[n - 1] % q === 0) n--;
    return a.slice(0, n).map((c) => ((c % q) + q) % q);
  };
  const deg = (a: Poly) => a.length - 1; // deg 0 = -1
  const isZero = (a: Poly) => a.length === 0;
  const key = (a: Poly) => a.join(",");
  const add = (a: Poly, b: Poly): Poly => {
    const r: Poly = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) r.push(((a[i] ?? 0) + (b[i] ?? 0)) % q);
    return norm(r);
  };
  const sub = (a: Poly, b: Poly): Poly => {
    const r: Poly = [];
    for (let i = 0; i < Math.max(a.length, b.length); i++) r.push(((a[i] ?? 0) - (b[i] ?? 0) + q) % q);
    return norm(r);
  };
  const scal = (c: number, a: Poly): Poly => norm(a.map((x) => (x * c) % q));
  const mul = (a: Poly, b: Poly): Poly => {
    if (!a.length || !b.length) return [];
    const r: Poly = new Array(a.length + b.length - 1).fill(0);
    for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) r[i + j] = (r[i + j] + a[i] * b[j]) % q;
    return norm(r);
  };
  const invScalar = (x: number): number => {
    x = ((x % q) + q) % q;
    for (let y = 1; y < q; y++) if ((x * y) % q === 1) return y;
    throw new Error("no inverse");
  };
  const divmod = (a: Poly, b: Poly): [Poly, Poly] => {
    if (isZero(b)) throw new Error("division by zero");
    let r = norm(a);
    const qt: Poly = new Array(Math.max(0, a.length - b.length + 1)).fill(0);
    const lb = invScalar(b[b.length - 1]);
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
  const monicize = (a: Poly): Poly => scal(invScalar(a[a.length - 1]), a);
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
  /** extended gcd: returns [g, x, y] with x a + y b = g, g monic */
  const egcd = (a: Poly, b: Poly): [Poly, Poly, Poly] => {
    let [r0, r1] = [norm(a), norm(b)];
    let [x0, x1]: [Poly, Poly] = [[1], []];
    let [y0, y1]: [Poly, Poly] = [[], [1]];
    while (!isZero(r1)) {
      const [qt, rem] = divmod(r0, r1);
      [r0, r1] = [r1, rem];
      [x0, x1] = [x1, sub(x0, mul(qt, x1))];
      [y0, y1] = [y1, sub(y0, mul(qt, y1))];
    }
    const lc = invScalar(r0[r0.length - 1]);
    return [scal(lc, r0), scal(lc, x0), scal(lc, y0)];
  };
  /** inverse of a modulo m (coprime) */
  const invmod = (a: Poly, m: Poly): Poly => {
    const [g, x] = egcd(a, m);
    if (deg(g) !== 0) throw new Error("not invertible");
    return mod(x, m);
  };
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
  /** monic irreducibles of degree ≤ degMax, by sieving */
  const primesUpTo = (degMax: number): Poly[] => {
    const primes: Poly[] = [];
    const composite = new Set<string>();
    for (let dg = 1; dg <= degMax; dg++) {
      for (const p of monic(dg)) {
        if (composite.has(key(p))) continue;
        primes.push(p);
        for (let dm = 1; dm + dg <= degMax; dm++) for (const m of monic(dm)) composite.add(key(mul(p, m)));
      }
    }
    return primes;
  };
  /** Legendre symbol (a/P) for a prime P: 0, 1 or −1 (Euler criterion in the field A/P) */
  const legendre = (a: Poly, P: Poly): number => {
    const size = Math.pow(q, deg(P));
    const am = mod(a, P);
    if (isZero(am)) return 0;
    const e = powmod(am, (size - 1) / 2, P);
    return key(e) === "1" ? 1 : -1;
  };
  /** square root of a modulo a prime P (a a nonzero square mod P): Tonelli–Shanks in the field A/P */
  const sqrtmod = (a: Poly, P: Poly): Poly => {
    const size = Math.pow(q, deg(P));
    const n = mod(a, P);
    if (size % 4 === 3) return powmod(n, (size + 1) / 4, P);
    let Q = size - 1,
      s = 0;
    while (Q % 2 === 0) {
      Q /= 2;
      s++;
    }
    // non-residue z: scan low-degree polynomials
    let z: Poly = [2 % q];
    for (let idx = 2; ; idx++) {
      const c: number[] = [];
      let x = idx;
      while (x > 0) {
        c.push(x % q);
        x = Math.floor(x / q);
      }
      z = norm(c);
      if (deg(z) >= deg(P)) throw new Error("no non-residue found");
      if (legendre(z, P) === -1) break;
    }
    let m = s,
      c = powmod(z, Q, P),
      t = powmod(n, Q, P),
      r = powmod(n, (Q + 1) / 2, P);
    while (key(t) !== "1") {
      let i = 0,
        tt = t;
      while (key(tt) !== "1") {
        tt = mod(mul(tt, tt), P);
        i++;
      }
      let b = c;
      for (let j = 0; j < m - i - 1; j++) b = mod(mul(b, b), P);
      m = i;
      c = mod(mul(b, b), P);
      t = mod(mul(t, c), P);
      r = mod(mul(r, b), P);
    }
    return r;
  };
  return { q, norm, deg, isZero, key, add, sub, scal, mul, invScalar, divmod, mod, monicize, powmod, egcd, invmod, monic, primesUpTo, legendre, sqrtmod };
}
