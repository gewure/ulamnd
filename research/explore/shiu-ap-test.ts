// PROOFS-uniform §34, class-(b)/(c) check for Lemma E Step 1: is sum_{z<=Z} tau(|n_z|) ~ tau(g0) * Z * log, with n_z = c0 + (t m) z, g0 = gcd(c0, t m)?
// Reports R = sum tau(n_z) / (Z * tau(g0) * log(max n_z)); the claim of §34 is R = O(1) (Shiu in progressions), so the only pointwise loss is tau(g0) <= tau(t) tau(m).
const P: number[] = []; { const N = 2_000_000; const s = new Uint8Array(N + 1); for (let i = 2; i <= N; i++) { if (!s[i]) { P.push(i); for (let j = i * i; j <= N; j += i) s[j] = 1; } } }
function tau(n: number) { let t = 1; for (const p of P) { if (p * p > n) break; let e = 0; while (n % p === 0) { n /= p; e++; } if (e) t *= e + 1; } if (n > 1) t *= 2; return t; }
function gcd(a: number, b: number): number { while (b) { [a, b] = [b, a % b]; } return a; }
const Z = 400;
console.log("m        t     g0      tau(g0)  meanTau  R=meanTau/(tau(g0) log)");
for (const m of [1000003, 1005973, 4000037, 4849845]) for (const t of [1, 2, 6, 30, 97]) {
  const c0 = (7919 * t + 13) % m + t * 11; const q = t * m, g0 = gcd(c0, q);
  let s = 0, mx = 1;
  for (let z = 1; z <= Z; z++) { const n = c0 + q * z; if (n > 4e12) break; s += tau(n); mx = Math.max(mx, n); }
  const mean = s / Z, lg = Math.log(mx);
  console.log(`${String(m).padStart(8)} ${String(t).padStart(5)} ${String(g0).padStart(7)} ${String(tau(g0)).padStart(8)} ${mean.toFixed(2).padStart(8)}  ${(mean / (tau(g0) * lg)).toFixed(3)}`);
}
