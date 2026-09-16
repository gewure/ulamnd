// Lemma A''' step (3)(b): the local count at p | P, brute-forced over all of SL2(F_p).
// Family F' = {G = (m B; B C) pos def, det G = h0, P u' | B, P | C}, h0 = |D| (s = 1), P | D squarefree, p || D for p | P.
// CLAIMS TO TEST, for every p | P and every G, G1, G2 in F':
//   (i)  p does not divide A_G = m;
//   (ii) G mod p has rank one, kernel L0 = (0:1);
//   (iii) for all tau in SL2(F_p): [p | B(tau.G) and p | C(tau.G)]  <=>  [p | C(tau.G)]   (the B-condition is free);
//   (iv) #{cosets Gamma_0(p)\SL2(F_p) with p | C(tau.G)} = 1;
//   (v)  for a pair, #{cosets with p | C for BOTH} <= 1.
// tau.G := tau G tau^t.
const Ds = (process.env.DS ?? "3,15,7,35,11,51").split(",").map(Number);   // |D|, squarefree odd
const uprimes = (process.env.UP ?? "1,7,11,13,17,19,23,29,31,37,41,43").split(",").map(Number);
const CMAX = Number(process.env.CMAX ?? "4000");
function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function primes(n: number) { const r: number[] = []; for (let p = 2; p * p <= n; p++) if (n % p === 0) { r.push(p); while (n % p === 0) n /= p; } if (n > 1) r.push(n); return r; }
function sl2(p: number) { const L: [number, number, number, number][] = []; for (let a = 0; a < p; a++) for (let b = 0; b < p; b++) for (let c = 0; c < p; c++) for (let d = 0; d < p; d++) if (mod(a * d - b * c, p) === 1) L.push([a, b, c, d]); return L; }
let bad = 0, tested = 0, pairsTested = 0;
for (const absD of Ds) {
  const P = absD;                       // take P = |D| (all prime factors special); p || D since |D| squarefree
  const ps = primes(P);
  for (const up of uprimes) {
    if (gcd(up, 2 * absD) !== 1) continue;
    const h0 = absD;                    // det of the undilated form; h = h0/P
    // enumerate F' : det = h0, P*up | B, P | C, positive definite, C <= CMAX
    const F: [number, number, number][] = [];
    for (let C = P; C <= CMAX; C += P) for (let B = 0; B <= C; B += P * up) {
      for (const Bs of B === 0 ? [0] : [B, -B]) { if ((Bs * Bs + h0) % C !== 0) continue; const A = (Bs * Bs + h0) / C; F.push([A, Bs, C]); }
    }
    if (F.length === 0) continue;
    const Fs = F.slice(0, 60);
    for (const p of ps) {
      const G = sl2(p);
      const cosetC = (A: number, B: number, C: number) => {   // cosets Gamma_0(p)\SL2(Fp) <-> bottom row up to scalar
        let n = 0; const seen = new Set<string>();
        for (const [a0, b0, c0, d0] of G) {
          const key = (() => { for (let t = 1; t < p; t++) { const k = `${mod(c0 * t, p)},${mod(d0 * t, p)}`; if (seen.has(k)) return null; } return `${c0},${d0}`; })();
          if (key === null) continue; seen.add(key);
          if (mod(c0 * c0 * A + 2 * c0 * d0 * B + d0 * d0 * C, p) === 0) n++;
        }
        return n;
      };
      for (const [A, B, C] of Fs) {
        tested++;
        if (mod(A, p) === 0) { console.log(`FAIL(i) |D|=${absD} p=${p} u'=${up} G=(${A},${B},${C}): p | A`); bad++; }
        // (ii) rank one with kernel (0:1)
        if (mod(B, p) !== 0 || mod(C, p) !== 0) { console.log(`FAIL(ii) |D|=${absD} p=${p} G=(${A},${B},${C})`); bad++; }
        // (iii) B-condition free
        for (const [a0, b0, c0, d0] of G) {
          const cc = mod(c0 * c0 * A + 2 * c0 * d0 * B + d0 * d0 * C, p);
          const bb = mod(a0 * c0 * A + (a0 * d0 + b0 * c0) * B + b0 * d0 * C, p);
          if (cc === 0 && bb !== 0) { console.log(`FAIL(iii) |D|=${absD} p=${p} G=(${A},${B},${C}) tau=(${a0},${b0},${c0},${d0})`); bad++; }
        }
        // (iv)
        const n = cosetC(A, B, C);
        if (n !== 1) { console.log(`FAIL(iv) |D|=${absD} p=${p} u'=${up} G=(${A},${B},${C}): cosets=${n}`); bad++; }
      }
      // (v) pairs
      for (let i = 0; i < Math.min(Fs.length, 12); i++) for (let j = 0; j < Math.min(Fs.length, 12); j++) {
        if (i === j) continue; pairsTested++;
        const [A1, B1, C1] = Fs[i], [A2, B2, C2] = Fs[j];
        let n = 0; const seen = new Set<string>();
        for (const [, , c0, d0] of G) { const k = `${c0},${d0}`; if (seen.has(k)) continue; seen.add(k);
          if (gcd(gcd(c0, d0), p) !== 1) continue;
          const q1 = mod(c0 * c0 * A1 + 2 * c0 * d0 * B1 + d0 * d0 * C1, p), q2 = mod(c0 * c0 * A2 + 2 * c0 * d0 * B2 + d0 * d0 * C2, p);
          if (q1 === 0 && q2 === 0) n++;
        }
        const cosets = n / (p - 1);
        if (cosets > 1 + 1e-9) { console.log(`FAIL(v) |D|=${absD} p=${p} pair=(${A1},${B1},${C1}),(${A2},${B2},${C2}): cosets=${cosets}`); bad++; }
      }
    }
  }
}
console.log(`forms tested: ${tested}, pairs tested: ${pairsTested}, FAILURES: ${bad}`);
