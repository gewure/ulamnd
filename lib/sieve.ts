/**
 * Arithmetic sieve up to N. One byte per integer:
 *   bits 0..4 : Ω(n) = number of prime factors with multiplicity (capped at 31)
 *   bit 5     : n is NOT squarefree (some p^2 | n)
 *   bit 6     : n is prime and n-2 or n+2 is prime (member of a twin pair)
 * n is prime  <=>  Ω(n) == 1.
 */
export const OMEGA_MASK = 31;
export const NOT_SQUAREFREE = 32;
export const TWIN = 64;

export interface SieveResult {
  N: number;
  data: Uint8Array; // index n, n = 0..N
  primeCount: number;
}

export function sieve(N: number, onProgress?: (f: number) => void): SieveResult {
  const a = new Uint8Array(N + 1);
  let primeCount = 0;
  const report = onProgress ?? (() => {});
  let next = 0;
  for (let p = 2; p <= N; p++) {
    if (a[p] !== 0) continue;
    // p is prime
    primeCount++;
    a[p] = 1;
    if (p > next) {
      report(p / N);
      next = p + Math.max(1, N / 50);
    }
    // multiples of p: add 1 for each power of p dividing n
    for (let m = 2 * p; m <= N; m += p) a[m]++;
    if (p <= N / p) {
      const p2 = p * p;
      for (let m = p2; m <= N; m += p2) a[m] = (a[m] + 1) | NOT_SQUAREFREE;
      let pe = p2 * p;
      while (pe <= N) {
        for (let m = pe; m <= N; m += pe) a[m]++;
        if (pe > N / p) break;
        pe *= p;
      }
    }
  }
  // twin flags
  for (let p = 3; p + 2 <= N; p += 2) {
    if ((a[p] & OMEGA_MASK) === 1 && (a[p + 2] & OMEGA_MASK) === 1) {
      a[p] |= TWIN;
      a[p + 2] |= TWIN;
    }
  }
  report(1);
  return { N, data: a, primeCount };
}

export function isPrimeByte(b: number): boolean {
  return (b & OMEGA_MASK) === 1;
}

export function omega(b: number): number {
  return b & OMEGA_MASK;
}

/** Möbius function from the sieve byte. */
export function mobius(n: number, b: number): number {
  if (n === 1) return 1;
  if (b & NOT_SQUAREFREE) return 0;
  return (b & OMEGA_MASK) % 2 === 0 ? 1 : -1;
}

/** Simple list of primes up to n (trial sieve, for small n). */
export function smallPrimes(n: number): number[] {
  const s = new Uint8Array(n + 1);
  const out: number[] = [];
  for (let i = 2; i <= n; i++) {
    if (s[i]) continue;
    out.push(i);
    for (let j = i * i; j <= n; j += i) s[j] = 1;
  }
  return out;
}

/** Trial-division factorization for n < 2^53 (fine for n up to ~1e12). */
export function factorize(n: number): [number, number][] {
  const out: [number, number][] = [];
  if (n < 2) return out;
  let m = n;
  for (let p = 2; p * p <= m; p += p === 2 ? 1 : 2) {
    if (m % p === 0) {
      let e = 0;
      while (m % p === 0) {
        m /= p;
        e++;
      }
      out.push([p, e]);
    }
  }
  if (m > 1) out.push([m, 1]);
  return out;
}

export function factorString(n: number): string {
  if (n < 2) return String(n);
  return factorize(n)
    .map(([p, e]) => (e === 1 ? String(p) : `${p}^${e}`))
    .join(" · ");
}

/** 1/ln(n) lookup keyed by a coarse log2 bin of n (9 bits: exponent + 4 mantissa bits). */
export function buildInvLogTable(): Float32Array {
  const t = new Float32Array(32 * 16);
  for (let e = 0; e < 32; e++) {
    for (let m = 0; m < 16; m++) {
      // bin covers n in [2^e (1 + m/16), 2^e (1 + (m+1)/16))
      const lo = Math.pow(2, e) * (1 + m / 16);
      const hi = Math.pow(2, e) * (1 + (m + 1) / 16);
      const mid = Math.sqrt(lo * hi);
      t[e * 16 + m] = mid < 3 ? (mid <= 1 ? 0 : 1 / Math.log(mid)) : 1 / Math.log(mid);
    }
  }
  // n = 1 must contribute 0, n = 2 contributes 1/ln 2
  t[0] = 0; // n=1 -> e=0, m=0
  return t;
}

export function invLogBin(n: number): number {
  // n < 2^32 assumed
  const e = 31 - Math.clz32(n);
  const m = e >= 4 ? (n >>> (e - 4)) & 15 : (n << (4 - e)) & 15;
  return e * 16 + m;
}
