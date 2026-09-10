# Literature for the window problem — round 1 (11 September 2026; agent report, verified references only)

"Verified" = theorem statement read in the paper itself (full text); "bibliographic" = title/venue/year confirmed via Crossref
or reference lists, content quoted from a citing paper. Notation: ρ_h(n) = Σ_{ν mod n, f(ν)≡0} e(hν/n); W_h(x,N) = Σ_{x<n<2x, N|n} ρ_h(n).

## 1. Roots of quadratic congruences: Weyl sums, short intervals, averaging over moduli
- **Hooley 1963**, Acta Math. 110, 97–114 (verified). Thm 1: Σ_{k≤x} Σ_{ν²≡D (k)} e(hν/k) ≪ A(h) x^{3/4} log² x, fixed D
  (dependence on D uncontrolled); sharp cutoff; binary forms + Weil. Thm 3: ν/k uniformly distributed. → baseline θ = 3/4.
- **Hooley 1964**, Mathematika 11, 39–49 (bibliographic). Equidistribution of roots mod all n, any irreducible polynomial.
- **Bykovskiĭ 1984**, Zap. LOMI 134 / J. Soviet Math. 36 (1987) (bibliographic; content per Ngo 2021, Marklof–Welsh 2023).
  Thm 4: Hooley's exponent improved from 3/4 to 2/3+ε (spectral theory, negative D via Heegner points). Hejhal: same for
  some positive D. → best unconditional θ for fixed D is 2/3+ε; D-dependence not tracked.
- **Iwaniec 1978**, Invent. Math. 47, 171–188 (bibliographic). Hooley-type bounds for D = −1 with m ≡ 0 (n), uniform enough for a sieve.
- **Duke–Friedlander–Iwaniec 1995**, Ann. Math. 141, 423–441 (bibliographic; Prop. 1 quoted in Ngo (1.2)): negative D,
  W_h(x,N) ≪_ε gcd(h,N)^{1/20} (N²/x)^{1/20} x^{1+ε}/N. Nontrivial only for N² = o(x); no discriminant uniformity.
- **Tóth 2000**, IMRN 2000(14), 719–739 (bibliographic): positive D, W_h(x,N) ≪_h (N²/x)^{1/(4L)} x^{1+12/L}/N.
- **Homma 2008**, J. Number Theory 128, 500–508 (bibliographic): discrepancy version of DFI 1995 for prime moduli.
- **Duke–Friedlander–Iwaniec 2012**, IMRN 2012(11), 2493–2549 + erratum (verified). Thm 1.1: h, q ≥ 1, D > 0 odd
  fundamental, f smooth on [Y,2Y], |f| ≤ 1, y²|f''| ≤ 1: Σ_{c≡0(q)} f(c) W_h(D;c) ≪ h^{1/4}(Y+√(hD))^{3/4} D^{1/8−1/1331},
  absolute constant. Nontrivial iff Y > D^{1/2−1/1332}. Via half-integral-weight Kloosterman sums (Thm 1.2). §16: negative D.
  Intro: "extensions to non-fundamental discriminants are also possible" (not done). → the ONLY result with explicit
  discriminant uniformity; θ = 3/4 with D^{1/8}: far above 5θ+6B < 3.
- **Marklof–Welsh 2023**, Duke Math. J. 172(12), 2303–2364, arXiv 2105.02854 (verified). D > 0 squarefree, D ≢ 1 (4):
  pair correlation and limit point process of roots μ/m ordered by m; N_I(x,N) ≪ log N roots in an interval of length ~1/N;
  also with m ≡ 0 (n). No power saving; fixed D. → the only "short interval" statement, and it is a counting bound.
- **Ngo 2021**, arXiv 2107.13301 (verified). Positive D: W_h(x,N) ≪_ε x^{12/13} N^{−11/13} h^{1/13} + h x^ε (Pitt's bound
  on Kloosterman sums for Γ₀(q), exceptional spectrum).
- **Grimmelt–Merikoski 2025**, arXiv 2505.00493 (verified). aν² + h, a ≤ X^{o(1)}, h squarefree ≤ X². Thm 1.4 (Type I,
  smooth, moduli k ≡ 0 (d), d ≤ D ≤ X^{1/2}): error ≪ X^{o(1)} D^{1/2} X^{1/2} (D+h^{1/2})^{1/2} (1 + X/(D(D+h^{1/2})))^{θ/4},
  θ ≤ 7/64. Thm 1.5 (Type II, bounded α_m β_n). Thm 1.2: roots mod primes equidistributed uniformly for h ≤ X^{1+o(1)}.
  Negative discriminant only. They name "entanglement of the coefficients with the level d" as the obstruction for
  Kuznetsov. → closest in spirit (uniformity in h, Type I over moduli with divisibility), BUT leading coefficient a must
  be X^{o(1)} (ours is u² up to H^{4/3}) and the interval condition is on ℓ, not on ūℓ.
- **Dunn–Kerr–Shparlinski–Zaharescu 2020**, Adv. Math. 375, arXiv 1908.10143 (verified): bilinear forms in Weyl sums for
  modular square roots, prime q; Thm 1.7 bounds with q^{1/8} M^{7/24} N^{1/8}; discrepancy of {x/q: x² ≡ p, p ≤ P}
  nontrivial for P ≥ q^{13/20+ε}. → dual problem (modulus fixed, residue varies).
- **Shkredov–Shparlinski–Zaharescu 2020**, arXiv 2009.03460 (verified): average over primes q ≤ Q of the max over
  dilations λ and short intervals of the discrepancy of {x: x² ≡ λp}: ≤ (P^{11/12} + P^{4/5}Q^{1/10}) Q^{o(1)}.
- **Baier 2026**, arXiv 2605.01635 (verified): Σ_{|l|≤L} Σ_{m≤M} α_l β_m e_r(l√(jm)) over all square roots mod r,
  r odd squarefree: ≪ (L^{1/2}M^{1/2}r^{1/4} + M)‖α‖₂‖β‖_∞ r^ε; nontrivial for M ≥ r^{1/2+ε}. Composite moduli and a
  dilation j appear; Pólya–Vinogradov-limited, single modulus.
- **Welsh 2022**, ANT 16, 881–918: Gauss-type parametrisation of roots for degree d.
- **Kowalski–Soundararajan 2021**, Adv. Math. 385 (verified): average discrepancy ≤ (C/α) exp(−(1/6)Σ_{p≤x,ρ(p)≥2} 1/p):
  only (log x)^{−c}. → generic CRT mechanism gives no power saving.
- No paper by Humphries on this topic exists (attribution in our notes was wrong).

## 2. Bilinear forms with Kloosterman fractions
- **DFI 1997**, Invent. Math. 128, 23–43 (bibliographic; bound quoted in Bettin–Chandee (1.1)):
  Σ_{m~M, n~N, (m,n)=1} α_m β_n e(a m̄/n) ≪ ‖α‖‖β‖ (a+MN)^{3/8} (M+N)^{11/48+ε}. Saving N^{1/48} for M ≈ N.
- **Bettin–Chandee 2018**, Adv. Math. 328, 1234–1262 (verified). Thm 1: trilinear B(M,N,A) ≪ ‖α‖‖β‖‖ν‖ (1+|ϑ|A/(MN))^{1/2}
  [(AMN)^{7/20+ε}(M+N)^{1/4} + (AMN)^{3/8+ε}(AN+AM)^{1/8}]; saving N^{1/20} for A = 1. Remark 1: an archimedean
  perturbation e(f(m,n)) with ∂f ≪ X/(xy) is allowed at cost (1+X/(MN))^{1/2}. Thm 2: Jacobi-twisted version.
- **Wright 2026a/b**, arXiv 2604.25177, 2608.27732: improvements with a fixed factor in the modulus; Fouvry–Radziwiłł
  level of distribution for unbalanced convolutions to X^{1/2+1/66}, δ < 1/68.
- **Dong–Robles–Zeindler 2026**, arXiv 2601.00292: WITHDRAWN (error). Do not cite.
- → Our u-average Σ_u ν_u e(k r ū/d') is formally B(M,N,A) with m = u, n = d', a = kr — but r = r(d') is a root mod d',
  so the numerator depends on the denominator; the reciprocity step leaves an archimedean phase e(kr/(ud')) of size up
  to k/u, not small for k up to u² log H. No existing result treats a = a(n) of this type. (Assessment, not a citation.)

## 3. Level uniformity for half-integral weight / Salié–Kuznetsov
- **Iwaniec 1987**, Invent. Math. 87; **Duke 1988**, Invent. Math. 92 (bibliographic): a(n) ≪ n^{k/4−2/7+ε} for squarefree n;
  level dependence not explicit. **Blomer 2004**, Acta Arith. 114; **Blomer–Harcos 2008**, Crelle 621 (bibliographic only).
- **Waibel 2017**, arXiv 1706.09320 (verified). Thm 1: orthonormal basis of S_{k/2}(N,χ), n = t v² w²:
  Σ_j |a_j(n)|² ≪ n^{k/2−1}[t^{3/7}v^{6/7}/(N^{2/7}(n,N)^{1/7}) + t^{3/8}v^{3/4}/(N^{1/8}(n,N)^{1/4}) + v(n,N)/N + 1](nN)^ε.
  → the only explicit-in-N coefficient bound found; holomorphic forms, averaged over a basis; our problem needs Maass +
  Eisenstein via Kuznetsov.
- **DFI 2012 Thm 1.2** (verified): sums of half-integral-weight Kloosterman sums over c ≡ 0 (q), bound independent of q.
- Dunn–Zaharescu (JEMS, arXiv 1903.03416), Darreye 2020, Biró 2026 (arXiv 2604.11205, conditional on a twisted
  Linnik–Selberg conjecture), Shparlinski–Xiao 2026 (arXiv 2601.10113): abstracts only.

## 4. Modular hyperbola / modular inverses in short intervals / dilates
- **Shparlinski 2012**, Japan. J. Math. 7, arXiv 1103.2879 (verified). Thm 13: #{(x,y) ∈ H_{a,m} in boxes} =
  φ(m)XY/m² + O(m^{1/2+o(1)}), uniform in m (Weil). Thm 16: Σ*_a |#H − φXY/m²|² ≤ X(X+Y)m^{o(1)}. Hooley's conjecture
  Σ_{x≤X} e_m(s x̄) ≤ X^{1/2}m^{o(1)} for m^{1/4} ≤ X ≤ m is open.
- **Bourgain–Garaev 2014a**, Izv. Math. 78, arXiv 1211.4184; **2014b**, Acta Arith. 164, arXiv 1309.1124 (verified):
  energy bounds J_{2k} and bilinear incomplete Kloosterman sums; for general m only a (log m)^{−1/2} saving in
  max_a |Σ_{n≤N} e_m(a n̄)| for N > m^c.
- **Garaev–Shparlinski 2023**, arXiv 2304.07953: negative results for very short ranges.
- → For u ≤ H^{2/3} and d' up to u²Y log H the u-range is always below the Pólya–Vinogradov range for d'; only
  sum-product bounds apply, with unspecified or tiny savings, and they need both variables in intervals.

## 5. Function fields
- **Bagshaw–Shparlinski 2021**, arXiv 2112.02257 (verified): bilinear sums with square roots / inverses mod an irreducible
  F of degree r over F_q; nontrivial iff m+n ≥ 2r/3 (square roots) or ≥ r/2 (inverses).
- **Sawin 2020**, arXiv 1809.05137 (verified): square-root cancellation for d_k, μ, Λ in short intervals for large
  characteristic. **Sawin–Shusterman**, arXiv 1808.04001: level of distribution → 1 for Möbius.
- Keating–Rudnick 2014/2016; KRRR 2018; Bank–Bary-Soroker–Fehm 2018; Fu–Lau–Li–Xi 2025 (abstracts).
- → No function-field paper on roots of x² ≡ D (mod F) in short intervals or Weyl sums for quadratic roots averaged
  over moduli F.

## Assessment (agent's, endorsed)
1. [Corrected 11 Sep night: the condition is θ+6B < 1, not 5θ+6B < 3.] Any θ < 1 is fine; the barrier is B, the
   loss in the frequency k (up to u² log H) and the dilation u: it must be below (uk)^{(1−θ)/6}. Every known bound
   (Hooley A(h); DFI 2012 h^{1/4}; DFI 1995 gcd(h,N)^{1/20}) loses a power of the frequency — DFI 2012's (3/4, 1/4)
   fails by B, and even θ = 2/3+ε (Bykovskiĭ) would need B < 1/18. So the Weyl-sum route needs uniformity in the
   FREQUENCY first; nobody has that, and the dilation uniformity comes on top.
2. Only DFI 2012 (D^{−1/1331} saving, Y ≳ D^{1/2}, fundamental D) and Grimmelt–Merikoski 2025 (a ≤ X^{o(1)}) have
   explicit discriminant uniformity; neither covers a = u² up to H^{4/3} or the dilated interval.
3. Kloosterman fractions fail structurally (numerator depends on denominator through the root).
4. Sum-product methods: single modulus, tiny savings.
5. Missing: a bound for Σ_{d'~t} λ(d') Σ_{r²≡D(d')} e(k ū r/d') with explicit polynomial dependence on u, k, exponent
   < 3/5 in t, composite squarefree moduli. Nobody has combined Kuznetsov at level 4u² with Waibel-type level-explicit
   spectral input and an exceptional-spectrum treatment; even then the t-exponent barrier ≥ 2/3 remains.

CONSEQUENCE FOR PAPER IV: the Fourier/Weyl-sum route (Hypothesis W) needs frequency-uniform bounds that do not exist;
it is not the plan. The plan must exploit what the
Weyl-sum formulation throws away: the sum over ALL d' (or all u) at once, the composite structure of the moduli, or the
self-duality — see BRAINSTORM.md, routes 1, 2', 7 and the calibration in §0.
