import { describe, expect, it } from "vitest";
import { directions, forEachInBox, maxRadiusFor, oddPow, shellOf, toCoords, toN, toNBig, ulam2D, ulam2DInverse } from "../lib/spiral";
import { detectPolynomial, batemanHorn, evalPoly, isPrimeBig, polyToString } from "../lib/poly";
import { sieve, OMEGA_MASK, mobius } from "../lib/sieve";
import { buildBox, rayPolynomial, leaderboard, analyzePoint } from "../lib/analysis";
import { findZeros, li, psiExplicit, riemannR } from "../lib/riemann";
import { diffraction } from "../lib/fft";

describe("2D Ulam spiral", () => {
  it("matches the classic layout", () => {
    const expected: Record<number, [number, number]> = { 1: [0, 0], 2: [1, 0], 3: [1, 1], 4: [0, 1], 5: [-1, 1], 6: [-1, 0], 7: [-1, -1], 8: [0, -1], 9: [1, -1], 10: [2, -1], 11: [2, 0], 13: [2, 2], 17: [-2, 2], 21: [-2, -2], 25: [2, -2], 26: [3, -2] };
    const c = [0, 0];
    for (const [n, xy] of Object.entries(expected)) {
      ulam2D(Number(n), c);
      expect(c).toEqual(xy);
      expect(ulam2DInverse(xy[0], xy[1])).toBe(Number(n));
    }
  });
  it("is a bijection on a box", () => {
    const c = [0, 0];
    for (let n = 1; n <= 41 * 41; n++) {
      ulam2D(n, c);
      expect(ulam2DInverse(c[0], c[1])).toBe(n);
    }
  });
});

describe("d-dimensional spiral", () => {
  for (const d of [1, 3, 4, 5, 6]) {
    it(`d=${d}: toN ∘ toCoords = id, and shells are consecutive`, () => {
      const R = d >= 5 ? 2 : 4;
      const N = oddPow(R, d);
      const c = new Array(d).fill(0);
      const seen = new Set<string>();
      for (let n = 1; n <= N; n++) {
        toCoords(n, d, c);
        let k = 0;
        for (const x of c) k = Math.max(k, Math.abs(x));
        expect(k).toBe(shellOf(n, d));
        expect(toN(c, d)).toBe(n);
        const key = c.join(",");
        expect(seen.has(key)).toBe(false);
        seen.add(key);
      }
      expect(seen.size).toBe(N);
    });
    it(`d=${d}: forEachInBox agrees with toCoords`, () => {
      const R = d >= 5 ? 2 : 3;
      const c = new Array(d).fill(0);
      forEachInBox(R, d, (n, cc) => {
        toCoords(n, d, c);
        expect(Array.from(cc)).toEqual(c);
      });
    });
  }
  it("toNBig agrees with toN", () => {
    for (const d of [2, 3, 5, 7]) {
      const c = new Array(d).fill(0);
      for (let n = 1; n < 3000; n += 7) {
        toCoords(n, d, c);
        expect(toNBig(c, d)).toBe(BigInt(n));
      }
    }
    expect(toNBig([100, -3, 7, 0, 1, -50, 2, 9, 0, 1], 10) > 0n).toBe(true);
  });
  it("maxRadiusFor", () => {
    expect(maxRadiusFor(4000000, 2)).toBe(999);
    expect(maxRadiusFor(9, 2)).toBe(1);
    expect(maxRadiusFor(8, 2)).toBe(0);
  });
  it("direction counts", () => {
    expect(directions(2).length).toBe(4);
    expect(directions(3).length).toBe(13);
    expect(directions(5, 2).length).toBe(25);
  });
});

describe("polynomials", () => {
  it("detects quadratics of the 2D diagonal", () => {
    // (t,t): n = 4t^2 - 2t + 1
    const r = rayPolynomial([0, 0], [1, 1], 2)!;
    expect(r.t0).toBe(0);
    expect(polyToString(r.poly)).toBe("4t² − 2t + 1");
  });
  it("lines in d dims are degree-d polynomials", () => {
    for (const d of [3, 4, 5]) {
      for (const v of directions(d, 2).slice(0, 6)) {
        const r = rayPolynomial([1, -2, 0, 1, 0].slice(0, d), v, d);
        expect(r).not.toBeNull();
        expect(r!.poly.degree).toBe(d);
        // verify beyond detection window
        const c = new Array(d).fill(0);
        for (let t = r!.t0; t < r!.t0 + 60; t++) {
          for (let i = 0; i < d; i++) c[i] = [1, -2, 0, 1, 0][i] + t * v[i];
          expect(evalPoly(r!.poly, BigInt(t))).toBe(BigInt(toN(c, d)));
        }
      }
    }
  });
  it("handles half-integer coefficients", () => {
    const seq = [0n, 1n, 3n, 6n, 10n, 15n, 21n, 28n];
    const p = detectPolynomial(seq, 3)!;
    expect(polyToString(p)).toBe("(t² + t) / 2");
  });
  it("Euler polynomial has a large Hardy–Littlewood constant, squares have a fixed divisor", () => {
    const euler = detectPolynomial([41n, 43n, 47n, 53n, 61n, 71n, 83n, 97n], 3)!;
    expect(polyToString(euler)).toBe("t² + t + 41");
    const bh = batemanHorn(euler, 2000);
    expect(bh.C).toBeGreaterThan(3);
    const sq = detectPolynomial([0n, 4n, 16n, 36n, 64n, 100n, 144n], 3)!;
    expect(batemanHorn(sq).fixedDivisor).toBe(2);
  });
  it("Miller–Rabin", () => {
    expect(isPrimeBig(1000000007n)).toBe(true);
    expect(isPrimeBig(1000000007n * 998244353n)).toBe(false);
    expect(isPrimeBig(3215031751n)).toBe(false); // strong pseudoprime to 2,3,5,7
  });
});

describe("sieve", () => {
  it("counts primes and computes Ω and μ", () => {
    const s = sieve(10000);
    expect(s.primeCount).toBe(1229);
    expect(s.data[360] & OMEGA_MASK).toBe(6); // 2^3 3^2 5
    expect(mobius(30, s.data[30])).toBe(-1);
    expect(mobius(12, s.data[12])).toBe(0);
    expect(mobius(1, s.data[1])).toBe(1);
  });
});

describe("box analysis", () => {
  it("builds a 3D box and runs a leaderboard", () => {
    const box = buildBox(3, 6, null, () => {});
    expect(box.N).toBe(13 ** 3);
    const lb = leaderboard(box, 3, 5, 10, () => {});
    expect(lb.overall.lines).toBeGreaterThan(100);
    expect(lb.overall.actual).toBeGreaterThan(0);
    const pa = analyzePoint(box, [1, 2, 3], 3, 50);
    expect(pa.n).toBe(toN([1, 2, 3], 3));
    expect(pa.lines.length).toBe(13);
    for (const l of pa.lines) for (const r of l.rays) expect(r.degree).toBe(3);
  });
});

describe("riemann", () => {
  it("li and R are accurate", () => {
    expect(li(1000)).toBeCloseTo(177.6097, 3);
    expect(riemannR(1000)).toBeCloseTo(168.3594, 2);
  });
  it("finds the first zeros of zeta", () => {
    const z = findZeros(2, 50);
    expect(z.length).toBe(10);
    expect(z[0]).toBeCloseTo(14.134725, 4);
    expect(z[9]).toBeCloseTo(49.773832, 4);
  });
  it("explicit formula approximates psi", () => {
    const z = findZeros(2, 100);
    // psi(100) = 94.045...
    expect(Math.abs(psiExplicit(100.5, z, z.length) - 94.0453)).toBeLessThan(3);
  });
});

describe("fft", () => {
  it("diffraction of a checkerboard has a peak at (1/2,1/2)", () => {
    const s = 32;
    const f = new Uint8Array(s * s);
    for (let y = 0; y < s; y++) for (let x = 0; x < s; x++) f[y * s + x] = (x + y) % 2;
    const d = diffraction(f, s);
    expect(Math.abs(d.peaks[0].fx)).toBeCloseTo(0.5, 5);
  });
});
