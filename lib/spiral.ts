/**
 * n-dimensional Ulam spiral ("hypercube-shell spiral").
 *
 * Definition (see the Theory panel for the full text):
 *
 *  d = 2: the classic Ulam spiral. 1 sits at the origin, 2 at (1,0), 3 at (1,1),
 *         and the walk turns counter-clockwise (in mathematical y-up coordinates).
 *         Ring k (k >= 1) holds the numbers (2k-1)^2+1 .. (2k+1)^2.
 *
 *  d >= 3: shell k (all points with Chebyshev norm max|x_i| = k) holds the numbers
 *         (2k-1)^d+1 .. (2k+1)^d, and is filled as follows.
 *         The (d-1)-dimensional shell k (the "ring") is swept through the new
 *         axis x_d first: layers x_d = 0, +1, -1, +2, -2, ..., +(k-1), -(k-1).
 *         Within a layer the ring is walked in the (d-1)-dimensional spiral order.
 *         Then the two caps x_d = +k and x_d = -k are filled with the complete
 *         (d-1)-dimensional ball of radius k (i.e. the first (2k+1)^(d-1) numbers of
 *         the (d-1)-dimensional spiral), first the +k cap, then the -k cap.
 *
 * The important structural property (proved in the Theory panel): along every
 * straight line with a direction in Z^d, the number n is eventually a polynomial of
 * degree exactly d in the step index. In 2D these are the well-known quadratics of
 * the Ulam spiral's diagonals.
 *
 * All values are exact as long as n < 2^53.
 */

export const MAX_SAFE = Number.MAX_SAFE_INTEGER;

/** (2k+1)^d as a Number (exact below 2^53). */
export function oddPow(k: number, d: number): number {
  const s = 2 * k + 1;
  let r = 1;
  for (let i = 0; i < d; i++) r *= s;
  return r;
}

/** Number of points in shell k of Z^d (Chebyshev norm exactly k). */
export function shellSize(k: number, d: number): number {
  if (k === 0) return 1;
  return oddPow(k, d) - oddPow(k - 1, d);
}

/** Shell index k of the number n (n >= 1) in dimension d. */
export function shellOf(n: number, d: number): number {
  if (n <= 1) return 0;
  let k = Math.floor((Math.pow(n, 1 / d) - 1) / 2);
  if (k < 0) k = 0;
  while (oddPow(k, d) < n) k++;
  while (k > 0 && oddPow(k - 1, d) >= n) k--;
  return k;
}

/** The index of layer j in the sweep order 0, +1, -1, +2, -2, ... */
export function layerIndex(j: number): number {
  return j > 0 ? 2 * j - 1 : -2 * j;
}
export function layerFromIndex(idx: number): number {
  return idx === 0 ? 0 : idx % 2 === 1 ? (idx + 1) / 2 : -idx / 2;
}

// ---------------------------------------------------------------- 2D (classic)

/** Classic Ulam spiral: n -> (x, y). Writes into out[0], out[1]. */
export function ulam2D(n: number, out: number[] | Int32Array | Float64Array, off = 0): void {
  if (n <= 1) {
    out[off] = 0;
    out[off + 1] = 0;
    return;
  }
  const k = shellOf(n, 2);
  const base = (2 * k - 1) * (2 * k - 1);
  const m = n - base - 1; // 0 .. 8k-1
  const side = 2 * k;
  if (m < side) {
    out[off] = k;
    out[off + 1] = -k + 1 + m;
  } else if (m < 2 * side) {
    out[off] = k - 1 - (m - side);
    out[off + 1] = k;
  } else if (m < 3 * side) {
    out[off] = -k;
    out[off + 1] = k - 1 - (m - 2 * side);
  } else {
    out[off] = -k + 1 + (m - 3 * side);
    out[off + 1] = -k;
  }
}

/** Classic Ulam spiral: (x, y) -> n. */
export function ulam2DInverse(x: number, y: number): number {
  const k = Math.max(Math.abs(x), Math.abs(y));
  if (k === 0) return 1;
  const base = (2 * k - 1) * (2 * k - 1);
  let m: number;
  if (x === k && y > -k) m = y + k - 1;
  else if (y === k) m = 2 * k + (k - 1 - x);
  else if (x === -k) m = 4 * k + (k - 1 - y);
  else m = 6 * k + (x + k - 1);
  return base + 1 + m;
}

// ---------------------------------------------------------------- general d

/**
 * n -> coordinates in dimension d. Writes d entries into out starting at off.
 * Coordinates are ordered x_1 .. x_d; x_d is the "newest" axis.
 */
export function toCoords(n: number, d: number, out: number[] | Int32Array | Float64Array, off = 0): void {
  if (d === 1) {
    // 1D "spiral": 1->0, 2->1, 3->-1, 4->2, 5->-2, ...
    out[off] = n <= 1 ? 0 : layerFromIndex(n - 1);
    return;
  }
  if (d === 2) {
    ulam2D(n, out, off);
    return;
  }
  if (n <= 1) {
    for (let i = 0; i < d; i++) out[off + i] = 0;
    return;
  }
  const k = shellOf(n, d);
  const base = oddPow(k - 1, d);
  const m = n - base - 1;
  const s = shellSize(k, d - 1); // ring size in d-1 dims
  const bandSize = (2 * k - 1) * s;
  if (m < bandSize) {
    const idx = Math.floor(m / s);
    const within = m - idx * s;
    toCoords(oddPow(k - 1, d - 1) + 1 + within, d - 1, out, off);
    out[off + d - 1] = layerFromIndex(idx);
  } else {
    const mm = m - bandSize;
    const ball = oddPow(k, d - 1);
    const cap = mm < ball ? 0 : 1;
    const within = mm - cap * ball;
    toCoords(1 + within, d - 1, out, off);
    out[off + d - 1] = cap === 0 ? k : -k;
  }
}

/** coordinates -> n in dimension d (reads d entries from c starting at off). */
export function toN(c: ArrayLike<number>, d: number, off = 0): number {
  if (d === 1) {
    const x = c[off];
    return x === 0 ? 1 : 1 + layerIndex(x);
  }
  if (d === 2) return ulam2DInverse(c[off], c[off + 1]);
  let k = 0;
  for (let i = 0; i < d; i++) {
    const a = Math.abs(c[off + i]);
    if (a > k) k = a;
  }
  if (k === 0) return 1;
  const base = oddPow(k - 1, d);
  const j = c[off + d - 1];
  const s = shellSize(k, d - 1);
  const bandSize = (2 * k - 1) * s;
  if (Math.abs(j) < k) {
    const idx = layerIndex(j);
    const within = toN(c, d - 1, off) - oddPow(k - 1, d - 1) - 1;
    return base + 1 + idx * s + within;
  }
  const cap = j > 0 ? 0 : 1;
  const ball = oddPow(k, d - 1);
  return base + 1 + bandSize + cap * ball + (toN(c, d - 1, off) - 1);
}

// ---------------------------------------------------------------- BigInt variant

function oddPowBig(k: bigint, d: number): bigint {
  const s = 2n * k + 1n;
  let r = 1n;
  for (let i = 0; i < d; i++) r *= s;
  return r;
}

/** coordinates -> n as a BigInt (exact for any size; slower than toN). */
export function toNBig(c: ArrayLike<number>, d: number, off = 0): bigint {
  if (d === 1) {
    const x = c[off];
    return x === 0 ? 1n : 1n + BigInt(layerIndex(x));
  }
  if (d === 2) {
    const x = BigInt(c[off]),
      y = BigInt(c[off + 1]);
    const ax = x < 0n ? -x : x,
      ay = y < 0n ? -y : y;
    const k = ax > ay ? ax : ay;
    if (k === 0n) return 1n;
    const base = (2n * k - 1n) * (2n * k - 1n);
    let m: bigint;
    if (x === k && y > -k) m = y + k - 1n;
    else if (y === k) m = 2n * k + (k - 1n - x);
    else if (x === -k) m = 4n * k + (k - 1n - y);
    else m = 6n * k + (x + k - 1n);
    return base + 1n + m;
  }
  let kk = 0;
  for (let i = 0; i < d; i++) {
    const a = Math.abs(c[off + i]);
    if (a > kk) kk = a;
  }
  if (kk === 0) return 1n;
  const k = BigInt(kk);
  const base = oddPowBig(k - 1n, d);
  const j = c[off + d - 1];
  const s = oddPowBig(k, d - 1) - oddPowBig(k - 1n, d - 1);
  const bandSize = (2n * k - 1n) * s;
  if (Math.abs(j) < kk) {
    const idx = BigInt(layerIndex(j));
    const within = toNBig(c, d - 1, off) - oddPowBig(k - 1n, d - 1) - 1n;
    return base + 1n + idx * s + within;
  }
  const cap = j > 0 ? 0n : 1n;
  const ball = oddPowBig(k, d - 1);
  return base + 1n + bandSize + cap * ball + (toNBig(c, d - 1, off) - 1n);
}

/**
 * Enumerate shell k of Z^d in spiral order. cb receives a scratch coordinate
 * array (do not retain it). This is much faster than calling toCoords for
 * every n when building whole grids.
 */
export function forEachInShell(k: number, d: number, cb: (c: Int32Array) => void, scratch?: Int32Array): void {
  const c = scratch ?? new Int32Array(d);
  if (k === 0) {
    for (let i = 0; i < d; i++) c[i] = 0;
    cb(c);
    return;
  }
  if (d === 1) {
    c[0] = k;
    cb(c);
    c[0] = -k;
    cb(c);
    return;
  }
  if (d === 2) {
    const side = 2 * k;
    for (let m = 0; m < side; m++) {
      c[0] = k;
      c[1] = -k + 1 + m;
      cb(c);
    }
    for (let m = 0; m < side; m++) {
      c[0] = k - 1 - m;
      c[1] = k;
      cb(c);
    }
    for (let m = 0; m < side; m++) {
      c[0] = -k;
      c[1] = k - 1 - m;
      cb(c);
    }
    for (let m = 0; m < side; m++) {
      c[0] = -k + 1 + m;
      c[1] = -k;
      cb(c);
    }
    return;
  }
  const inner = (cc: Int32Array) => cb(cc);
  for (let idx = 0; idx < 2 * k - 1; idx++) {
    c[d - 1] = layerFromIndex(idx);
    forEachInShell(k, d - 1, inner, c);
  }
  c[d - 1] = k;
  for (let kk = 0; kk <= k; kk++) forEachInShell(kk, d - 1, inner, c);
  c[d - 1] = -k;
  for (let kk = 0; kk <= k; kk++) forEachInShell(kk, d - 1, inner, c);
}

/** Enumerate all n = 1 .. (2R+1)^d in order, giving n and its coordinates. */
export function forEachInBox(R: number, d: number, cb: (n: number, c: Int32Array) => void): void {
  let n = 0;
  const scratch = new Int32Array(d);
  for (let k = 0; k <= R; k++) {
    forEachInShell(
      k,
      d,
      (c) => {
        n++;
        cb(n, c);
      },
      scratch,
    );
  }
}

/** Largest radius R with (2R+1)^d <= N. */
export function maxRadiusFor(N: number, d: number): number {
  let R = Math.floor((Math.pow(N, 1 / d) - 1) / 2);
  if (R < 0) R = 0;
  while (oddPow(R + 1, d) <= N) R++;
  while (R > 0 && oddPow(R, d) > N) R--;
  return R;
}

/**
 * Canonical direction set: vectors in {-1,0,1}^d, non-zero, first non-zero entry
 * positive, with at most maxNonzero non-zero entries.
 */
export function directions(d: number, maxNonzero = d): Int8Array[] {
  const out: Int8Array[] = [];
  const v = new Int8Array(d);
  const rec = (i: number, nz: number, firstSet: boolean) => {
    if (i === d) {
      if (nz > 0) out.push(new Int8Array(v));
      return;
    }
    v[i] = 0;
    rec(i + 1, nz, firstSet);
    if (nz < maxNonzero) {
      v[i] = 1;
      rec(i + 1, nz + 1, true);
      if (firstSet) {
        v[i] = -1;
        rec(i + 1, nz + 1, true);
      }
    }
    v[i] = 0;
  };
  rec(0, 0, false);
  // sort: fewer non-zero entries first, then lexicographic
  out.sort((a, b) => {
    let na = 0,
      nb = 0;
    for (let i = 0; i < d; i++) {
      if (a[i] !== 0) na++;
      if (b[i] !== 0) nb++;
    }
    if (na !== nb) return na - nb;
    for (let i = 0; i < d; i++) if (a[i] !== b[i]) return b[i] - a[i];
    return 0;
  });
  return out;
}

export function dirLabel(v: ArrayLike<number>): string {
  const parts: string[] = [];
  for (let i = 0; i < v.length; i++) parts.push(v[i] === 0 ? "0" : v[i] > 0 ? "+" : "−");
  return "(" + parts.join(",") + ")";
}

export function coordLabel(c: ArrayLike<number>): string {
  return "(" + Array.from(c).join(", ") + ")";
}
