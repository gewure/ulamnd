# Literature, round 3 (9 September 2026, night): the off-diagonal — foundation for paper III

Survey on roots of quadratic congruences, weighted Weyl sums, fractional-part sums and the spectral side.
Verification legend as before. Full texts read by the agent: Hooley 1963, DFI 2012, Marklof–Welsh 2023,
Kowalski–Soundararajan 2021, Goldston–Suriajaya 2021, Soundararajan–Young 2013, Kitaoka 2017.

## The structural fact
**Hooley 1963 already has our decomposition.** His eq. (6): Σ⁺_{n≤x} d(n²+a) = 2xΣ₃ − Σ₄ + Σ₅ + O(1),
Σ₃ = Σ_{k≤X} ρ(k)/k (our diagonal at s = 1), Σ₅ = Σ_k {2Ψ_k(x) − Ψ_k(Y_k)}, Ψ_k(y) = Σ_{ν²≡−a(k)} ψ((y−ν)/k)
(our Off_f; Y_k = reflected argument = our large-moduli part). He states his untwisted Weyl bound does not apply
"since the sums ρ(h,k) appear with trigonometrical factors depending on k" and proves the twisted Lemma 5 for
R^±(h,X) = Σ_k ρ(h,k)e(±hx/k). That twisted sum with our weights and the phase e(kH/d) is what (E1) needs.

## Key references
- Hooley (1963) Acta Math. 110, 97–114 [V]; Hooley (1958) Math. Z. 69, 211–227 [V-cit] (large-discriminant
  regime; Dirichlet series identity); Hooley (1964) Mathematika 11, 39–49 [V] (all moduli, any degree, no
  power saving for deg ≥ 3); Hooley (1976) Cambridge Tract 70.
- Bykovskiĭ–Ustinov (2019) Dokl. Math. 99, 195–200 [V-cit]; Technau (2023) arXiv 2304.08143 [V].
- Iwaniec (1978) Invent. Math. 47, 171–188 [V]: Hooley's Kloosterman route with moduli m ≡ 0 mod n, uniform
  enough for a sieve — the "moduli in a progression" lemma needed to absorb multiplicative weights.
- Bykovskiĭ (1984) LOMI 134, 15–33 / J. Soviet Math. 36 (1987) [V-cit]: Poincaré series, spectral expansion;
  "extremely strong when D is fixed" (DFI). Hejhal (1986) Contemp. Math. 53, 277–339 [V-cit]: Weyl sums for
  D > 0 as integrals over closed geodesics — the title-level statement of the "second spectral connection".
- McKee (1995, 1999) Math. Proc. Camb. 117, 126 [V]; Dudek (2016) BAMS 93; Lapkova (2016–18) [V]: constants.
- Homma (2008) JNT 128, 500–508 [V] (prime moduli). Kowalski–Soundararajan (2021) Adv. Math. 385 [V, full
  text]: average discrepancy (log x)^{-c}; hyperplane obstruction (Thm 1.4) — exactly why ordered pairs of
  quadratic roots (s + s' = −b/a) must be reduced to the one-dimensional difference set, as we do.
- Martin–Sitar, arXiv 0903.1834 (Mathematika): Erdős–Turán with a moving target — the tool for ψ_d(m,H) whose
  target {H/d} depends on d.
- Marklof–Welsh (2023) Duke 172, 2303–2364 [V, full text]: roots ↔ tops of geodesics (Prop. 5.2: root μ mod m
  ⇔ ideal of Z[√D] with HNF basis), pair correlation and limit process; NO effective error terms. Li–Welsh
  (2023) arXiv 2304.14929; Welsh (2020) arXiv 2008.00538; Zehavi (2020) arXiv 2003.13100 (joint roots of pairs
  of polynomials).
- Prime/prime-square moduli bilinear technology: Dunn–Kerr–Shparlinski–Zaharescu (Adv. Math.);
  Shkredov–Shparlinski–Zaharescu (2024) Math. Z.; Shparlinski–Xiao (2026) arXiv 2601.10113; Baier (2025–26)
  arXiv 2601.15448, 2603.00768, 2603.25814, 2605.01635; Grimmelt–Merikoski (2025) arXiv 2505.00493 (uniformity
  in the shift h for roots of x² ≡ −h mod p).
- DFI (1995) Annals 141 [V]; Tóth (2000) IMRN [V]; Ngo (2024) BLMS [V] (D > 0, moduli in an AP);
  **DFI (2012) IMRN 2012(11), 2493–2549 [V, full text]**: allowed weights = smooth f on [Y,2Y] times c ≡ 0 mod q;
  Thm 1.1 W_h(D) ≪ h^{1/4}(Y + h√D)^{3/4}D^{1/8−1/1331}; engine Thm 1.2 (half-integral-weight Kloosterman sums,
  Kuznetsov for Γ₀(q), bilinear forms "with Kloosterman-type fractions"); §16 negative D. No bilinear weights in
  c for composite moduli anywhere in the literature.
- Blomer (2008), Templier (2011) Duke 157, Templier–Tsimerman: cuspidal analogues of Hooley's sum — "no main
  term unless dihedral": pure spectral error, i.e. the off-diagonal mechanism isolated.
- Spectral side: Duke (1988) Invent. 92; Sarnak (1982) JNT 15; **Soundararajan–Young (2013) Crelle 676,
  105–120 [V, full text]**: Ψ_Γ(x) = 2Σ_{n≤X}√(n²−4)L(1,n²−4), L(s,δ) = ζ(2s)/ζ(s)·Σ_q ρ_q(δ)q^{−s} (Zagier's
  series), ρ_q(n²−4) = q^{-1}Σ_k e(kn/q)S(k,k;q): prime geodesic counting IS a 1/q-weighted root count and its
  explicit formula runs over Maass eigenvalues — cleanest precedent for a Maass-spectral Off_f. Bykovskiĭ
  (1997) J. Math. Sci. 83; Balog–Biró–Cherubini–Laaksonen (2022) IMRN; Cherubini–Wu–Zábrádi arXiv 1901.03824.
  ELMV (2012) Enseign. Math. 58: D → ∞ regime only. Fouvry–Iwaniec (1997) Acta Arith. 79: O(log M) roots of
  ν² ≡ −1 (m) in an interval of length 1/M.
- Fractional parts / divisor weights: Friedlander–Goldston (1995); Montgomery–Soundararajan (2002); Vaughan
  (2001) (linear case has no Off at all: {x/q} against μ²/φ² via Ramanujan sums); Goldston–Suriajaya (2021 ×2);
  Kuperberg (2023 ×2), Bloom–Kuperberg; Kowalski (2011) Acta Arith. 148 (averages of Euler products, leading
  term only); Ustinov (2008/09) St. Petersburg Math. J. 20, 813–836 (lattice points on modular hyperbolas under
  curves via Kloosterman sums — the fractional-part/Kloosterman technology). Gap: no paper on secondary terms of
  divisor-weighted fractional-part sums as such.
- Function fields: Andrade–Bary-Soroker–Rudnick (2015); Bary-Soroker (2012/14); Sawin–Shusterman (2022);
  Bagshaw–Shparlinski (2021) arXiv 2112.02257 (modular square roots in F_q[T]); KS 2021 Appendix A. Not found: a
  function-field Hooley 1963 or Weyl sums of quadratic roots over all monic d — open but tractable (Marklof–
  Welsh Prop. 5.2 transfers to F_q[u][√D]; Salié sums explicit; large-q by Katz).
- Large moduli: Hooley 1963 §3 (reflection); Scourfield (1961); Iwaniec 1978 and Grimmelt–Merikoski 2025 for the
  level of distribution of #{h ≤ H : e | Q(h)}.
- Galois structure: each orbit O of ordered pairs → root sum of the difference resolvent R_O(y) = Π_O(y−(s'−s));
  quadratic for quadratics; x⁴+1: R_O = (y²−2)(y²+2) (quadratic pieces with symbol weights); cyclic quartic:
  irreducible degree 4, only qualitative equidistribution (Hooley 1964, KS 2021). Kitaoka arXiv 1706.08636
  Prop. 2: decomposable f = g(h(x)) has root pairs summing to a constant (hyperplane concentration).

## Proof route for Hypothesis (E), quadratics (agent's assessment, adopted)
0. Vaaler expansion of the sawtooth to length K: Off_f(H) = Σ_{0<|k|≤K}(c_k/k)T_k(H) + O((log H)/K) + large moduli,
   T_k(H) = Σ_{d≤H} W_f(d)Σ_{ν²≡4D/a²(d)} e(kν/d)e(kH/d).
1. Lemma A (twisted Weyl sums, moduli in a progression): Σ_{d≤X, e|d} ρ(k,d)e(kH/d) ≪ k^A e^B X^{1−δ}. For
   d ≍ C ≥ (kH)^{1/2+ε} the phase is smooth at scale C → DFI 2012 verbatim; for smaller C redo Hooley's Lemma 5
   with the phase, or Bykovskiĭ/DFI Poincaré series with e(kH·Im γi) in the test function. THE real work.
2. Lemma B (weights): W_f(d) = d^{-1}Σ_{e|d} g(e), g(e) ≪ e^{−1+ε}τ(e)^A; tails e > E ≪ E^{−1+ε}log H → only
   e ≤ (log H)^A matter. No multiplicative-weight theorem needed.
3. Lemma C (large moduli): Hooley reflection → same structure with divisors e of Q(h); level of distribution from
   Iwaniec 1978 / Grimmelt–Merikoski 2025.
4. Balance: Off_f(H) ≪ K^A + (log H)/K = o(log H) → Hypothesis (E) in Cesàro form → Conjecture in Cesàro form
   for every quadratic (S₂ 2-transitive). The O(1) form needs T_k ≪ k^{−1−η}: the spectral problem.

## Three unexpected-outcome hypotheses (tests specified in paper II Appendix (C4) and open problem (f))
1. Off_f(e^u) carries Maass lines at t_j = 9.5337, 12.1730, 13.7798, 14.3585, 16.1381 beside ζ-lines γ/2.
2. Exact Hypothesis (E) over F_q[u] as q → ∞ via Salié sums and Katz monodromy; A_f through the class number of
   F_q[u][√D].
3. Galois-type-dependent constants or a residual log for non-2-transitive quartics (x⁴+1, x⁴−2, cyclic quartic
   vs generic S₄).

## Extracted texts (scratchpad, session-local): dfi.txt, hooley.txt, mw.txt, ks.txt, gs.txt, sy.txt, kitaoka.txt.
