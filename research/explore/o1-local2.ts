// Lemma A''' step (3)(b), GENERAL coverage -- supersedes o1-local.ts, which hardcoded P = |D|, h = 1, s = 1
// and so never tested P a proper divisor of |D|, nor non-fundamental D, nor even D (PROOFS 46(5) caveat).
// Here the normal form is COMPUTED from (D, u): c = gcd(u^2,|D|) = P*s^2, a = P*u'^2, h0 = |D|/s^2, u' = u/(P s).
// Tested, over ALL of SL2(F_p) for every p | P:
//   (0) the normal form itself: c = P s^2, a = u^2/c, gcd(a, |D|/c) = 1, P || h0, gcd(u', h0) = 1;
//   (i) p does not divide A_G;  (ii) G mod p rank one with kernel (0:1);
//   (iii) p | B(tau.G) is implied by p | C(tau.G);  (iv) c_p(G) = 1;  (v) c_p(G1,G2) <= 1.
const Ds = (process.env.DS ?? "3,4,7,8,11,12,15,19,20,23,24,35,40,51,55,60,84,99,115,135,175,235").split(",").map(Number);
const us = (process.env.US ?? "1,3,5,6,7,10,11,13,14,15,21,22,26,30,33,35,39,42,51,55,65,70,105").split(",").map(Number);
const CMAX = Number(process.env.CMAX ?? "3000"), FMAX = Number(process.env.FMAX ?? "40"), PMAX = Number(process.env.PMAX ?? "14");
function gcd(a: number, b: number): number { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
const mod = (x: number, m: number) => ((x % m) + m) % m;
function pf(n: number) { const r: [number, number][] = []; for (let p = 2; p * p <= n; p++) if (n % p === 0) { let k = 0; while (n % p === 0) { n /= p; k++; } r.push([p, k]); } if (n > 1) r.push([n, 1]); return r; }
function sl2(p: number) { const L: [number, number, number, number][] = []; for (let a = 0; a < p; a++) for (let b = 0; b < p; b++) for (let c = 0; c < p; c++) for (let d = 0; d < p; d++) if (mod(a * d - b * c, p) === 1) L.push([a, b, c, d]); return L; }
let bad = 0, nf = 0, np = 0, cfg = 0; const seenD = new Set<number>(), seenNF = new Set<number>();
for (const aD of Ds) {
  if (mod(-aD, 4) !== 0 && mod(-aD, 4) !== 1) continue;      // D = -aD must be a discriminant
  for (const u of us) {
    if (pf(u).some(([, k]) => k > 1)) continue;               // u squarefree
    const c = gcd(u * u, aD);
    let P = 1, s = 1;
    for (const [p] of pf(u)) { const v = pf(aD).find(([q]) => q === p)?.[1] ?? 0; if (v === 1) P *= p; else if (v >= 2) s *= p; }
    if (c !== P * s * s) { console.log(`FAIL(0:c) |D|=${aD} u=${u}: c=${c} P=${P} s=${s}`); bad++; continue; }
    const up = u / (P * s), h0 = aD / (s * s), a = P * up * up, h = aD / c;
    if (P === 1) continue;                                    // nothing new to test
    if (up % 2 === 0) continue;                               // the O2 hypothesis: u' odd
    if (a !== (u * u) / c) { console.log(`FAIL(0:a) |D|=${aD} u=${u}`); bad++; }
    if (gcd(a, h) !== 1) { console.log(`FAIL(0:gcd) |D|=${aD} u=${u}: gcd(a,h)=${gcd(a, h)}`); bad++; }
    if (gcd(up, h0) !== 1) { console.log(`FAIL(0:u'h0) |D|=${aD} u=${u}`); bad++; }
    for (const [p] of pf(P)) if (h0 % p !== 0 || h0 % (p * p) === 0) { console.log(`FAIL(0:P||h0) |D|=${aD} u=${u} p=${p} h0=${h0}`); bad++; }
    // F' : det = h0, P*u' | B, P | C, positive definite
    const F: [number, number, number][] = [];
    for (let C = P; C <= CMAX && F.length < FMAX; C += P) for (let B = 0; B <= C && F.length < FMAX; B += P * up)
      for (const Bs of B === 0 ? [0] : [B, -B]) { if ((Bs * Bs + h0) % C !== 0) continue; const A = (Bs * Bs + h0) / C; if (A > 0) F.push([A, Bs, C]); }
    if (F.length === 0) continue;
    cfg++; seenD.add(aD); if (s > 1) seenNF.add(aD);
    for (const [p] of pf(P)) {
      if (p > PMAX) continue;
      const G = sl2(p);
      for (const [A, B, C] of F) {
        nf++;
        if (mod(A, p) === 0) { console.log(`FAIL(i) |D|=${aD} u=${u} p=${p} G=(${A},${B},${C})`); bad++; }
        if (mod(B, p) !== 0 || mod(C, p) !== 0) { console.log(`FAIL(ii) |D|=${aD} u=${u} p=${p} G=(${A},${B},${C})`); bad++; }
        let z = 0; const seen = new Set<string>();
        for (const [a0, b0, c0, d0] of G) {
          const cc = mod(c0 * c0 * A + 2 * c0 * d0 * B + d0 * d0 * C, p), bb = mod(a0 * c0 * A + (a0 * d0 + b0 * c0) * B + b0 * d0 * C, p);
          if (cc === 0 && bb !== 0) { console.log(`FAIL(iii) |D|=${aD} u=${u} p=${p} G=(${A},${B},${C})`); bad++; }
          const k = `${c0},${d0}`; if (seen.has(k)) continue;
          for (let t = 1; t < p; t++) seen.add(`${mod(c0 * t, p)},${mod(d0 * t, p)}`);
          if (cc === 0) z++;
        }
        if (z !== 1) { console.log(`FAIL(iv) |D|=${aD} u=${u} p=${p} G=(${A},${B},${C}): ${z}`); bad++; }
      }
      for (let i = 0; i < Math.min(F.length, 10); i++) for (let j = 0; j < Math.min(F.length, 10); j++) {
        if (i === j) continue; np++;
        const [A1, B1, C1] = F[i], [A2, B2, C2] = F[j]; let z = 0; const seen = new Set<string>();
        for (const [, , c0, d0] of G) { const k = `${c0},${d0}`; if (seen.has(k)) continue; if (gcd(gcd(c0, d0), p) !== 1) continue;
          for (let t = 1; t < p; t++) seen.add(`${mod(c0 * t, p)},${mod(d0 * t, p)}`);
          if (mod(c0 * c0 * A1 + 2 * c0 * d0 * B1 + d0 * d0 * C1, p) === 0 && mod(c0 * c0 * A2 + 2 * c0 * d0 * B2 + d0 * d0 * C2, p) === 0) z++; }
        if (z > 1) { console.log(`FAIL(v) |D|=${aD} u=${u} p=${p}: ${z}`); bad++; }
      }
    }
  }
}
console.log(`configs (D,u) with P>1: ${cfg}; |D| values used: ${[...seenD].sort((x, y) => x - y).join(",")}`);
console.log(`of which NON-FUNDAMENTAL (s>1): ${[...seenNF].sort((x, y) => x - y).join(",") || "(none)"}`);
console.log(`forms tested: ${nf}, pairs tested: ${np}, FAILURES: ${bad}`);
