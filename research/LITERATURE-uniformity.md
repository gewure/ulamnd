# Literature search: uniformity in the dilation u (pieces P_u, dilated roots, level u^2)

**Date:** 15 September 2026
**Scope:** the six topics set out in the brief: uniform non-split sums, the divisor function of a quadratic in progressions, uniform Weyl sums for quadratic roots, bilinear forms with Kloosterman fractions and modular roots, level-aspect Heegner points, and averages of polynomial singular series.
**Verification rule:** every statement quoted below was read either in the arXiv PDF (converted with `pdftotext`) or on the abstract page.
- Some statements are known only second-hand, through another paper that quotes them. Those are marked **(quoted in X)**.
- Statements taken only from an abstract are marked **(abstract only)**.
- Anything not checked is marked **unverified**.
- Text marked **"Assessment (ours)"** is our own reading or back-of-envelope calculation. It is not a claim made by the authors.

---

## Summary and ranking

Nothing in the literature states a bound uniform in a leading coefficient or discriminant as large as u^2 ≈ H^{4/3}. Every result found is either for a fixed polynomial, or uniform only in the constant term h, or restricted to a level that is a small power of the discriminant.

Three inputs are close enough to the structure of our problem to be worth working on.

**1. Grimmelt–Merikoski, arXiv 2505.00493, with its engine arXiv 2505.00489.** Their Type I estimate (Thm 1.4) counts roots of aℓ² + h ≡ 0 (mod k) with k ≡ 0 (mod d) in a window ℓ ~ X.
- **Range:** moduli k up to X², uniformly in h up to X^{2+o(1)}.
- **Parametrisation:** Heegner points of discriminant ah, invariant under Γ₀(ad), selected by the congruence b ≡ 0 (mod a) on the middle coefficient.
- **Match with our problem:** for d = 1 and a = u² this is exactly formulation (d), with ah = 4u²|D|-type discriminant and level u².
- **Gap:** they assume a ≤ X^{o(1)}. In the proof, a enters polynomially: through the aspect ratio, through the number of Heegner points, and through a positivity step that throws away the condition b ≡ 0 (mod a), i.e. the sparsity.
- **Task:** redo §5 keeping the congruence b ≡ 0 (mod a) inside the kernel count, and track the powers of a.

**2. Grimmelt–Merikoski, arXiv 2508.17979, with arXiv 2404.08502.** Here averaging over a small squarefree factor u of the modulus, performed inside the automorphic kernel, breaks the Weil/Kloosterman barrier (moduli X^{2/3}) for the divisor function in progressions.
- They obtain a bound for almost all moduli near X^{2/3}.
- This is the only rigorous template found for "averaging over u" as the source of the saving.
- In their method the u-average feeds a counting (divisor-bound) argument. It does not rely on sign cancellation between different u, so it is not ruled out by our finding N5 that the u-average gives only random-sign cancellation.

**3. Templier–Tsimerman, arXiv 1106.1139, with Blomer, IMRN 2008.** This gives sums of Hecke eigenvalues a_π(n² + d) with an error term uniform in both d and the length. The method is half-integral weight spectral theory: a theta series times a Poincaré series.
- **Adaptation:** for our piece, θ(z) is replaced by θ(u²z), which has level 4u². This is the "Hecke translate" or level-raising picture of formulation (d).
- **Obstacle 1:** the bounds would have to be uniform in the level 4u²: the half-integral weight coefficient exponent δ and the spectral gap θ.
- **Obstacle 2:** the method has to be extended from cusp forms to the Eisenstein (divisor-function) case.

**Other results.** The remaining results are useful background but do not apply:
- **Level of distribution:** de la Bretèche–Drappeau and Merikoski go only to level x^{1+25/178} for a fixed polynomial. Our moduli need level exponent 1 + log u / log Y, which is 3 at u = H^{2/3}.
- **Modular square roots:** Dunn–Kerr–Shparlinski–Zaharescu, Kerr–Shkredov–Shparlinski–Zaharescu, Shkredov–Shparlinski–Zaharescu and Baier all take the square root modulo the same modulus as the exponential. In our form (c) the root is modulo n and the exponential modulo u.
- **Kloosterman fractions:** Duke–Friedlander–Iwaniec 1997 and Bettin–Chandee need a numerator independent of the denominator. Ours is r with r² ≡ D (mod n).
- **Level-aspect Heegner points:** Liu–Masri–Young and Humphries–Nordentoft need level q ≤ D^{1/20} or q ≤ D^{1/36}, with a fundamental discriminant. Ours has level ≍ discriminant and a non-fundamental discriminant.
- **Singular series:** nothing was found that gives second-order, Montgomery–Soundararajan-type information for polynomial singular series.

---

## Detailed entries (most relevant first)

### 1. L. Grimmelt, J. Merikoski — *On the greatest prime factor and uniform equidistribution of quadratic polynomials*
arXiv:2505.00493 (v2, 30 May 2025). No journal reference on arXiv.

**Setting.** For 1 ≤ a ≺≺ 1 and square-free h with gcd(a,h) = 1, they consider ϱ_{a,h}(k) = #{ν mod k : aν² + h ≡ 0 (mod k)}. Here A ≺≺ B means |A| ≤ X^{o(1)} B.

**Thm 1.4 (Type I), read in the PDF.** Hypotheses:
- 1 ≤ D ≤ K ≤ X² and D ≤ X^{1/2};
- h square-free with 1 ≤ h ≺≺ X²;
- 1 ≤ a ≺≺ 1 with gcd(a,h) = 1;
- ψ₁ smooth, supported on [1,2]; ψ₂ smooth, supported on [−1,1].

Then

Σ_{d≤D} | Σ_{k≡0 (d)} ψ₁(k/K) [ Σ_{aℓ²+h≡0 (k)} ψ₂(ℓ/X) − (ϱ_{a,h}(k)/k) X ∫ψ₂ ] |
  ≺≺ D X^{1/2} (D + h^{1/2})^{1/2} (1 + X/(D(D + h^{1/2})))^θ.

The extraction lost the absolute-value bars, so where exactly they sit is **unverified**. Everything else is as printed. θ ≤ 7/64 (Kim–Sarnak), but by the authors' remark any spectral gap θ < 1/2 gives the same quality of result.
- For h ≺≺ D² the bound simplifies to D X^{1/2}(1 + X/D²)^θ.
- Cor 7.1: for D ≤ X^{1/2−η}, K ≤ X², h ≤ X^{1+ε} and a ≤ X^{o(1)}, the error term is ≺≺ X^{1−(1−2θ)η+ε/4}.
- Cut-offs are **smooth** in both k and ℓ. The moduli k are all integers, not only primes.

**Thm 1.5 (Type II).** Hypotheses: M ≥ N with MN ≥ X and M ≤ X, and β_n supported on square-free integers. Then

Σ_{m∼M, n∼N} α_m β_n [ Σ_{aℓ²+h≡0 (mn)} ψ(ℓ/X) − (ϱ(mn)/mn) X ∫ψ ]
  ≺≺ M X^{1/2} + M^{1/4} N^{1/2} X^{1/2} (N^{1/2} + h^{1/8}) (1 + X/(M^{1/2} N (N + h^{1/4})))^θ.

**Thm 1.2.** Roots of aν² + h ≡ 0 (mod p), over primes p ≤ X, are equidistributed uniformly for square-free h ≤ X^{1+o(1)} and a ≤ X^{o(1)}.

**Parametrisation (§3, Lemma 3.1).** S_{a,h}(d) is the set of symmetric integer matrices (a′ b; b c) of determinant ah with c ≡ 0 (mod ad) and b ≡ 0 (mod a). It is in bijection with {(m, ℓ, k) : aℓ² − mk = h, k ≡ 0 (mod d)}, via (a′, b, c) = (m, aℓ, ak).
- Normalised by (ah)^{−1/2}, the set is a disjoint union over Heegner points σ ∈ L_{ah} and cosets τ ∈ Γ₀(q)\SL₂(Z), where q = ad.
- The Heegner points must satisfy c(τσi) ≡ 0 (mod q) and b(τσi) ≡ 0 (mod a).

**Proof of Thm 1.4 (§5).** They apply their automorphic-kernel theorem (Thm 2.1, imported from 2505.00489) with Γ = Γ₀(ad), then Cauchy–Schwarz over d. The two kernel sums are bounded **by positivity**: K₁ ≤ Σ_{q≤aD} ⟨I|K_q k|I⟩ and K₂ ≤ Σ_{q≤aD} ⟨α_q|K_q k|α_q⟩, where α_q is defined with the condition c ≡ 0 (mod q) only.

**Assessment (ours).**
- **What matches.** With a = u², h = 1 (for f = t² + 1, u odd), d = 1 and X = Y = H/u, the Type I sum is the count behind P_u. The moduli k run up to H = uX.
  - For fixed a, Thm 1.4 with D = 1 is non-trivial for all K ≤ X², with error about X^{1/2+θ}. This matches the numerics P_u ≈ √Y up to θ.
  - It covers our full modulus range exactly when u ≤ X, i.e. u ≤ H^{1/2}.
  - The group is Γ₀(u²) and the points are Heegner points of discriminant 4u²-type, precisely our formulation (d).
- **Obstruction 1: a ≺≺ 1.** In §5, a enters in three places: (i) the ratio X/Y = X a^{1/2}/h^{1/2}, contributing (X/Y)^{1/2} ∝ a^{1/4}; (ii) the Heegner set L_{ah}, of size ≈ (ah)^{1/2}; (iii) the positivity step that extends the level sum to all q ≤ aD. That step discards b ≡ 0 (mod a), which is exactly the sparsity (u points on area u²).
  - Naive tracking therefore loses a positive power a^c.
  - The fixed-a saving is X^{1/2−θ} = (H/u)^{25/64}.
  - With u = H^β, a loss u^{2c} is affordable only if 2cβ < (25/64)(1−β). At β = 2/3 this needs c < 25/256 ≈ 0.1; with c = 1/2 it allows only β < 25/89 ≈ 0.28.
  - Hence the congruence b ≡ 0 (mod a) must be kept in the kernel count: the diagonal/off-diagonal analysis of Props 4.1–4.2 has to be redone with it.
- **Obstruction 2: Cesàro kernel.** Our weight (Y − h)_+ has a corner at h = Y. It needs a smoothing step, which is harmless for an o(H log H) target.

### 2. L. Grimmelt, J. Merikoski — *Weighted averages of SL₂(R) automorphic kernel, Part I: non-oscillatory functions*
arXiv:2505.00489 (v2, 30 May 2025).

**Main result (abstract and intro, read).**
- It evaluates weighted average discrepancies ⟨α₁|ΔF|α₂⟩ = Σ α₁(τ₁) α₂(τ₂) ΔF(τ₁,τ₂), where ΔF = K_Γ F − (1/|Γ\G|) ∫F.
- Here K_Γ F(τ₁,τ₂) = Σ_{γ∈Γ} χ(γ) F(τ₁^{-1}γτ₂), for a congruence subgroup Γ.
- Spectral theory is applied **directly to the kernel**, avoiding Kuznetsov, Kloosterman sums and the spectral large sieve. Divisor-switching symmetry in the level variable is preserved.

**Imported bound (2505.00493 Thm 2.1 = 2505.00489 Thm 8.1).** For Z₀Z₁Z₂ ≥ X/Y + 1:

Σ_{gcd(h,q)=1} β(h) ⟨α₁|T_{h,1} Δ_q F|α_{2,h}⟩
  ≪ q^{o(1)} δ^{−O(1)} (X/Y)^{1/2+o(1)} H^{1/2} Z₀^θ ⟨α₁|Δ_q k_{Z₁²,X}|α₁⟩^{1/2} (Σ_h |β(h)|² ⟨α_{2,h}|Δ_q k_{Z₂²,1}|α_{2,h}⟩)^{1/2}.

The k are explicit majorants of hyperbolic balls.

**Assessment (ours).** This is the natural engine for formulation (d).
- The level enters only as q^{o(1)} and through the two kernel counts. So uniformity in u² reduces entirely to **counting**: pairs of Heegner points of discriminant 4u²|D| on Γ₀(u²) at bounded hyperbolic distance, weighted by the congruence b ≡ 0 (mod u²).
- That is an elementary lattice-point problem, and the sparsity should be visible in it.
- No automorphic obstruction appears at this step. The spectral input is only a spectral gap.

### 3. L. Grimmelt, J. Merikoski — *The divisor function along arithmetic progressions and binary cubic polynomials*
arXiv:2508.17979 (v2, 4 Sep 2025).

**Thm 1.3 (read).** Hypotheses: r, s ≥ 1 coprime, s cube-free, ψ smooth on [1,2]. Uniformly in (a, rs) = 1:

(1/U) Σ_{u∼U, u sq-free, (u,ars)=1} |Δ_ψ(X; rsu, a)| ≪ δ^{−2} d(rs)^{O(1)} (log X)^{O(1)} L_{r,s}(U,X),

where L_{r,s}(U,X) = s^{1/8}U^{1/4}X^{1/4} + r^{1/4}X^{1/4} + (rs)^{1/2} + r^{1/2}s^{3/8}U^{1/4}.
- For rsU = X^{2/3+o(1)} this is a power saving when s³U⁶ < X^{2−ε}, r ≤ X^{1/3−ε}, U > X^ε and r¹²s⁹U⁶ < X^{8−ε}.

**Thm 1.1.** Δ(X; q, a) ≪ X^{1−ε}(log X)^B / q for all but O(√ε Q) moduli q ∈ (Q, 2Q], with Q < X^{2/3+ε}. This bridges the gap between Selberg–Hooley (q < X^{2/3−ε}) and Fouvry (q > X^{2/3+ε}).

**Thm 1.2.** Σ_{n₁,n₂≤X} d(n₁n₂² + 1) = (1 + O((log log X/log X)^{1/2})) (3/ζ(2)) X² log X.

**Assessment (ours).**
- **What matches.** This is the cleanest known instance of "average over a small factor u of the modulus" beating the square-root/Weil barrier.
  - The mechanism is the kernel count on Γ₂(q₁,q₂) with the u-average inside. It does not need sign cancellation between different u.
  - It is linear (d(n) in progressions), not quadratic, so it does not apply directly.
  - The structural analogue of our problem would be q₁ = u, with the quadratic congruence supplying the Heegner functional.
- **The good sign.** Thm 1.2 handles XY² + 1, a sum over **square** values n₂². That is the same kind of sparsity as our condition n ≡ 0 (mod u) on a quadratic.

### 4. L. Grimmelt, J. Merikoski — *Twisted correlations of the divisor function via discrete averages of SL₂(R) Poincaré series*
arXiv:2404.08502 (v2, 26 Apr 2024).

**Thm 1.2 (read).** Hypotheses: q square-free, gcd(h,q) = 1, −X/2 ≤ h ≤ X^{1+η}, and t: Z/qZ → C arbitrary. Then

Σ_n G(n/X) d(n) d(n+h) t(n) = Σ_{r mod q} t(r) ω(r,h;q) ∫ G(u/X) P_h(log u, log(u+h)) du + O(X^{1/2+O(η)} q^{1/2} ‖t‖₂ (|h|^θ + (X/q)^θ)),

with θ = 7/64.

**Thm 1.1.** A general counting theorem for Γ-invariant sets M ⊂ SL₂(R) with Γ = Γ₂(q₁,q₂). The error has the form δ^{−O(1)} Z^ε √(AD) √(K R), where K is an explicit "geometric/arithmetic" kernel count that must be estimated separately for each application.

**Assessment (ours).**
- For a single residue class, ‖t‖₂ = 1, so the error is X^{1/2}q^{1/2} against a main term ≈ X log² X / q. It is non-trivial only for q < X^{1/3}.
- Its value for us is methodological: the K-term is where the geometry of a sparse orbit family (our u points) would be exploited.

### 5. N. Templier, J. Tsimerman — *Non-split sums of coefficients of GL(2)-automorphic forms*
arXiv:1106.1139 (2011). Journal reference not on the arXiv page; believed to be Israel J. Math. (**unverified**).

**Thm 1 (read).** Let π be a cuspidal GL₂ representation, and W smooth on (1,2) with W^{(i)} ≪ 1. For all integers d ≠ 0 and Y ≫ |d|:

Σ_n a_π(n² + d) W((n² + d)/Y) = I(W) M_{π,d} √Y + O_{π,ε}(Y^{1/4+ε} |d|^δ (Y/|d|)^{θ/2}).

- θ ≤ 1/2 is the Selberg-eigenvalue exponent.
- δ ≤ 1/4 is the subconvexity exponent for Fourier coefficients of half-integral weight forms. δ = 0 corresponds to Lindelöf in the level aspect.
- M_{π,d} ≠ 0 only if π is dihedral and d > 0.
- The error is uniform in both d and Y. **Smooth** weights, **cusp forms only**.

**Cor 1.1.** For trivial central character, d > 0 and X ≫ d^{1/2}: Σ_n a_π(n² + d) V(n/X) ≪ X^{1/2+ε} d^δ (1 + X²/d)^{θ/2}.
- Remark (v): with more derivatives of W one can go down to X ≫ |d|^{1/2−η}.

**Assessment (ours).**
- **Where it fits.** Our piece is Σ_h F(uh) weighted, i.e. a sum over values u²h² − D of a divisor-type function.
  - That is a non-split sum along a quadratic with **leading coefficient u²**, not n² + d.
  - In the method, the theta series θ(z) must be replaced by θ(u²z), of level 4u².
  - The condition "Y ≫ |d|" is satisfied for us: values ≈ H² against discriminant ≈ u² ≤ H^{4/3}.
- **Obstructions.**
  - (i) Eisenstein case: F is a 1/d-weighted divisor function, not a cusp-form coefficient.
  - (ii) Level uniformity: the exponents δ and θ would be needed uniformly in half-integral weight level 4u². Known level-aspect bounds lose powers of the level.
  - (iii) The authors track uniformity in d only, not in a leading coefficient.

### 6. V. Blomer — *Sums of Hecke eigenvalues over values of quadratic polynomials*
IMRN 2008, doi:10.1093/imrn/rnn059; arXiv:0803.4301.

**Thm 1 (read).** Take f ∈ S_k(N,χ) with k ≥ 4, and q(x) = x² + sx + t. Then Σ_{n≤X} a(q(n)) = cX + O_{f,q,ε}(X^{6/7+ε}). The constant c = 0 if k is even or Δ > 0.

**Thm 2 (smooth version).** Take 1 ≤ P ≤ X^{1/2}, and w smooth on [X/2, 2X] with w^{(j)} ≪ (P/X)^j. Then Σ a(q(n))w(n) = c∫w + O(X^{1/2+θ}P^{3/2−θ} + X^{1/2}P^{5/2}) X^ε.

**Remarks (read).**
- The method extends to rx² + sx + t with r > 0. The dependence on r is **not tracked**.
- The paper quotes Hooley: Σ_{n≤X} τ(n² + a) = c₁(a) X log X + c₂(a) X + O(X^{8/9}(log X)³) for fixed a. It also quotes Bykovskii's improvement to X^{2/3+ε} **(quoted in Blomer)**.

**Assessment (ours).**
- This is fixed-polynomial only, but it states explicitly that a leading coefficient r > 0 fits the method.
- Tracking r = u² in its half-integral weight Kuznetsov formula is equivalent to the level-4u² problem in entry 5.
- The trivial-in-P structure shows how much sharp cut-offs cost: 6/7 with sharp cut-off against 1/2 + θ with smooth weights.

### 7. R. de la Bretèche, S. Drappeau — *Niveau de répartition des polynômes quadratiques et crible majorant pour les entiers friables*
J. Eur. Math. Soc. 22 (2020) 1577–1624; arXiv:1703.03197.

**Thm 1.1 (read).** Take η > 0, Q ≤ x^{1+25/178−η}, λ(q) bounded and well-factorable, D not a square, V smooth with compact support in R₊*. Then

Σ_{q≤Q} λ(q) ( Σ_{n: q | n²−D} V(n/x) − x V̂(0) ρ(q)/q ) ≪_{η,V,D} x^{1−η/3}.

- This improves Iwaniec's gain of 1/15 to 25/178 ≈ 1/7.12. Hooley's Conjecture R* would give 1/9.
- Dependence on D is not tracked.

**Thm 1.2.** P⁺(∏_{x<n≤2x}(n² − D)) ≫ x^{κ(θ)−ε}. This gives x^{1.2182} with θ = 7/64.

**Merikoski's statement of it (quoted in Merikoski, arXiv 1908.08816, Prop. 3).** For moduli m ∼ P = x^α, Type I information holds to level D = x^{(1−2θα)/(2−4θ)−η}.

**Assessment (ours).**
- **The level we need.** Our divisors d of u²h² − D, with h ≤ Y = H/u, range up to H = uY (by the hyperbola method). So we need equidistribution of dilated roots to level exponent 1 + log u / log Y: 1.5 at u = H^{1/3}, 2 at u = H^{1/2}, 3 at u = H^{2/3}. The best fixed-polynomial level known is 1 + 25/178, and only with well-factorable weights.
- **What we have instead.** Our weights λ(d)/d are smooth multiplicative, not well-factorable, and we also have averages over u and a saving of only o(1). Beyond level 1 + ε, the only route is to exploit those extra averages, as Grimmelt–Merikoski do with moduli up to X² (entry 1).

### 8. H. T. Ngo — *On roots of quadratic congruences*
Bull. London Math. Soc. (2024), doi:10.1112/blms.13108; arXiv:2107.13301.

**Definitions.** ρ_h(n) = Σ_{ν mod n, f(ν)≡0 (n)} e(hν/n), and the Weyl linear form W_h(x,N) = Σ_{x<n<2x, n≡0 (N)} ρ_h(n).

**Known bounds, as quoted in Ngo's introduction.**
- **Hooley:** W_h(x,1) ≪_h x^{3/4}(log x)². Bykovskii and Hejhal improved the exponent to 2/3 + ε.
- **DFI 1995 (Annals 141), Prop. 1, negative discriminant:** W_h(x,N) ≪_ε gcd(h,N)^{1/20} (N²/x)^{1/20} (x/N)^{1+ε}. Whether the implied constant depends on h or on f beyond this is **unverified**.
- **Tóth (IMRN 2000), positive discriminant:** W_h(x,N) ≪_h (N²/x)^{1/(4L)} (x/N)^{1+12/L}.

**Thm 1.1 (Ngo, positive discriminant).** W_h(x,N) ≪_ε x^{12/13} N^{−11/13} h^{1/13} + h x^ε, i.e. (N²/x)^{1/13} (x/N)^{1+ε} h^{1/13} + h x^ε.
- The author says the method "seems to work" for negative discriminant and leaves it to future work. Whether that has appeared is **unverified**.

**Assessment (ours).**
- These are the only fetched Weyl-sum bounds with **explicit frequency dependence**: h^{1/13}, or gcd(h,N)^{1/20}. With level structure n ≡ 0 (mod N) on the modulus, the saving is (N²/x)^{c}.
- **Obstruction 1:** the polynomial is fixed. Dependence on the discriminant or leading coefficient (4u²D, u²) is not tracked. The level N sits on the modulus, not on the root.
- **Obstruction 2:** with frequency k ≈ u² log H, the loss k^{1/13} ≈ u^{2/13} is affordable, but the discriminant dependence is the real question.
- **Paper III's (θ, B) test (ours).** DFI gives saving exponent 1/20 in (N²/x), with only gcd(h,N) dependence. Ngo gives h^{1/13} with saving 1/13. Neither gives uniformity in the polynomial, so the criterion θ + 6B < 1 cannot even be evaluated.

### 9. W. Duke, J. B. Friedlander, H. Iwaniec — *Weyl sums for quadratic roots*
IMRN 2012, no. 11, 2493–2549, doi:10.1093/imrn/rnr112. An erratum appeared in IMRN 2012(11), 2646–2648.

- **Content (abstract only, via OUP page summary).** It bounds Weyl sums over roots of quadratic congruences averaged over moduli Y < c < 2Y with a test weight f(c). Automorphic forms give a power saving in Y "even when Y is slightly smaller than" the square root of the discriminant. Applications: Linnik–Skubenko, cycle integrals of j, and three squares with one prime square.
- **Precise statement and discriminant dependence:** **unverified** (not on arXiv; the abstract formulas were not extracted).
- **Assessment (ours).** This is the one known result designed for **short ranges relative to the discriminant**, which is our regime. The pieces have u points against discriminant 4u²|D|. It should be read in full, since it may already contain explicit discriminant dependence.

### 10. W. Duke, J. B. Friedlander, H. Iwaniec — *Bilinear forms with Kloosterman fractions*
Invent. Math. 128 (1997) 23–43, doi:10.1007/s002220050135.

**Statement (quoted in Bettin–Chandee, read).** B_a(M,N) = Σ_{m∼M, n∼N, (m,n)=1} α_m β_n e(a m̄/n), with arbitrary α, β, satisfies

B_a(M,N) ≪ ‖α‖‖β‖ (a + MN)^{3/8} (M + N)^{11/48+ε}.

This saves about N^{1/48} when M ≈ N and a ≪ MN.

### 11. S. Bettin, V. Chandee — *Trilinear forms with Kloosterman fractions*
Adv. Math. (2018); arXiv:1502.00769.

**Thm 1 (read).** B(M,N,A) = Σ_{a∼A, m∼M, n∼N, (m,n)=1} α_m β_n ν_a e(ϑ a m̄/n), with arbitrary α, β, ν and ϑ ≠ 0. Then

B ≪ ‖α‖‖β‖‖ν‖ (1 + |ϑ|A/(MN))^{1/2} [ (AMN)^{7/20+ε} (M + N)^{1/4} + (AMN)^{3/8+ε} (AN + AM)^{1/8} ].

- This saves about min(A^{3/20}N^{1/20}, N^{1/8}) when |ϑ|A ≪ MN and M ≈ N.
- **Remark 1:** a smooth perturbation f(m,n) of the phase with ∂f ≪ X/(x²y) is allowed.

**Assessment (ours), entries 10–11.**
- **Matching roles.** Our form (c) is Σ_u α_u Σ_n Σ_{r²≡D (n)} e(k r n̄/u). The modulus is u (their n), the inverse is taken of n (their m), and the numerator is k·r.
- **Obstruction:** r is determined by n, through r² ≡ D (mod n). So the numerator is not a free variable with its own coefficients ν_a, and it is not a smooth perturbation either.
  - Summing trivially over r and putting it into β destroys the Kloosterman-fraction structure, since the phase then varies with r.
  - Writing r n̄ ≡ r m \overline{(r² − D)} (mod u), with m = (r² − D)/n, just returns to a divisor problem.
- **Size, even if it applied.** The generic saving N^{1/20} is far smaller than what is needed. Any saving suffices, but uniformly for M ≈ N ≈ H/u against modulus u up to H^{2/3}, where these bounds are in their weakest (unbalanced) range.
- **Also noted (abstract only).** T. Wright, *Trilinear Kloosterman fractions I: partially fixed moduli and unbalanced convolutions*, arXiv:2604.25177 (Apr 2026). It improves Bettin–Chandee when the denominator has a fixed factor. Exact exponents **unverified**.
- **Withdrawn.** A. Dong, N. Robles, D. Zeindler, arXiv:2601.00292 (Jan 2026), claimed improvements on B–C. The authors withdrew it because of a missing L² factor. **Do not use.**

### 12. A. Dunn, B. Kerr, I. E. Shparlinski, A. Zaharescu — *Bilinear forms in Weyl sums for modular square roots and applications*
Adv. Math. 375 (2020) 107369; arXiv:1908.10143.

**Thm 1.7 (read).** q prime, M, N ≤ q/2, a, h ∈ F_q^×:

W_{a,q}(α,β;h,M,N) = Σ_{m∼M} Σ_{n∼N} α_m β_n Σ_{x∈F_q, x²=amn} e_q(hx)

satisfies |W| ≤ ‖α‖₂ ‖β‖_∞^{1/3} ‖β‖₁^{2/3} q^{1/8+o(1)} M^{7/24} N^{1/8} (M^{7/48}/q^{1/16} + 1)(N^{7/48}/q^{1/16} + 1), plus a second variant.
- With bounded weights: |W| ≤ q^{1/8+o(1)} (MN)^{19/24} (M^{7/48}q^{−1/16} + 1)(N^{7/48}q^{−1/16} + 1).
- This is equivalent to bilinear forms in Salié sums. It gives a power saving in the Pólya–Vinogradov range.

**Thm 1.10.** The discrepancy of {x/q : x² ≡ p (mod q), p ≤ P prime} is ≤ q^{61/1760}P^{61/66+o(1)} + q^{13/110}P^{9/11+o(1)}. It is non-trivial for P ≥ q^{13/20+ε} under GRH-type counts of prime residues.

### 13. B. Kerr, I. D. Shkredov, I. E. Shparlinski, A. Zaharescu — *Energy bounds for modular roots and their applications*
J. Inst. Math. Jussieu 24 (2025) 1765–1806; arXiv:2103.09405.

**Thm 1.1 (read).** For q prime and N ≤ q, T_{2,2}(N; j, q) ≪ (N^{3/2}/q^{1/2} + 1) N^{2+o(1)}. Here T_{2,2} is the additive energy of the square roots of {j, 2j, …, Nj} modulo q.

**Thm 1.2.** T_{4,2} ≤ (N^{5/8}/q^{1/8} + N⁸/q^{1/2}) N^{6+o(1)} + N^{5+o(1)}.

**Thm 1.3.** For k ≥ 3 and on average over primes q ∼ Q, E_k ≪ N² + N⁴Q^{−1+o(1)}. Applications: Salié-sum correlations and roots of primes.

### 14. I. D. Shkredov, I. E. Shparlinski, A. Zaharescu — *On the distribution of modular square roots of primes*
arXiv:2009.03460. The same authors have a companion paper on bilinear forms with modular square roots in IMRN 2022(22) 17431–17474; its content is **unverified beyond title**.

**Thm 1.1 (read).** For 1 ≤ P ≤ Q: (1/Q) Σ_{q≤Q prime} max_λ Δ_{λ,q}(P) ≤ (P^{11/12} + P^{4/5}Q^{1/10}) Q^{o(1)}. Here Δ is the interval discrepancy of x with x² ≡ λp (mod q), p ≤ P. Non-trivial for P ≥ Q^{1/2+ε}.

### 15. S. Baier — *On certain bilinear sums with modular square roots and applications*
arXiv:2601.15448 (v4, 3 Jul 2026).

**Thm 2 and Cor 1 (read).** Σ(r,j,L,M,α,β) = Σ_{|l|≤L} Σ_{1≤m≤M} α_l β_m e_r(l √(jm)), with r ∈ N any modulus and (r,j) = 1. For r^{1/3} ≤ M ≤ r:

Σ ≪ (L^{1/2}M^{5/4}r^{−1/4} + L^{1/4}M^{7/8}r^{1/8}) ‖α‖₂ ‖β‖_∞ r^ε.

- Non-trivial for r^{1/3+3ε} ≤ L, M ≤ r^{1−ε}. Nothing is obtained if L, M ≤ r^{1/3}.

**Assessment (ours), entries 12–15.**
- **The mismatch.** In all four, the square root is taken **modulo the same modulus as the additive character** (x² ≡ amn (mod q), with phase e_q). In the sums with several moduli, only the modulus varies.
  - Our form (a) is Σ_d Σ_{r²≡D (d)} e(k r ū/d), with a fixed D, the modulus d varying, and a multiplier ū. So it is DFI-type roots twisted by the inverse of the dilation.
  - Our form (c) takes the root modulo n and the phase modulo u.
- **The one overlap.** Baier's e_r(l √(jm)) has the multiplier inside the square root, √(jm) = √j·√m. That is the closest match in shape to "roots twisted by ū", but his modulus r is fixed and the variables are numerators.
- **Verdict.** No direct application. The useful idea is additive-energy counting of modular roots, which could be the combinatorial input for the kernel counts in entries 1–2.

### 16. S.-C. Liu, R. Masri, M. P. Young — *Subconvexity and equidistribution of Heegner points in the level aspect*
Compositio Math. 149 (2013) 1150–1174; arXiv:1206.3208.

**Setting (read).** q prime, −D < −4 an **odd fundamental** discriminant with q split in Q(√−D), f a Hecke–Maass newform of level q, Θ_χ the class-group theta series.

**Thm 1.1.** Σ_χ L(f × Θ_χ, 1/2) = (3/π) (h(−D)²/√D) (q²/(q² − 1)) L(sym²f, 1) + O((qD)^ε min(qD^{7/16}, q^{3/4}D^{1/4} + q^{1/4}D^{1/2})).
- This gives hybrid subconvexity for q ≍ D^η, 0 < η < 1.

**Thm 1.4.** For a Galois orbit Gτ of Heegner points of discriminant −D on X₀(q), and any translate ω_q^{−1}Y₀(1) (volume ratio 1/(q+1)):
- N_{G,D,ω_q} ∼ h(−D)/(q+1), uniformly in ω_q, as q, D → ∞ with q ≤ D^{1/20−ε};
- N ≪ q^{1/4}D^{7/16+ε} for D^{1/20−ε} ≤ q ≤ D^{1/4−ε}.

**Assessment (ours).**
- **Our regime:** level q = u², discriminant 4u²|D|, so q ≍ discriminant (η = 1). The discriminant is **non-fundamental**, with conductor u sharing every prime with the level.
- **Why it fails:** LMY needs q ≤ D^{1/20} for the asymptotic, and q ≤ D^{1/4} even for the upper bound. It also needs q prime and D fundamental. Our pieces lie far outside.
- **What it does say:** the known level-aspect equidistribution of Heegner points lives at level ≤ discriminant^{small}, and our problem is at the opposite extreme.

### 17. P. Humphries, A. C. Nordentoft — *Sparse equidistribution of geometric invariants of real quadratic fields*
J. Eur. Math. Soc. 28:12 (2026) 5113–5192, doi:10.4171/JEMS/1691; arXiv:2211.05890.

**Thm 1.2 (read).** Fix δ ∈ [0, 1/36). For positive squarefree fundamental D, a genus G_D, an odd prime q split in E with q ≤ D^δ, and ω_q ∈ Γ/Γ₀(q), the level-q hyperbolic orbifolds satisfy

vol(Γ₀(q)\H) Σ_{A∈G_D} vol(F_A(q) ∩ Γ₀(q)ω_q^{−1}Γ\H) / (vol(Γ\H) Σ_A vol(F_A(q))) = 1 + o(1).

- Under GLH the range extends to δ < 1/12.
- The method uses Waldspurger/adelic periods, hybrid subconvexity and a homological sup-norm problem.

**Assessment (ours).** Same obstruction as LMY: level ≤ D^{1/36} and a fundamental discriminant. It confirms that "sparse in the level aspect" results require level much smaller than the discriminant.

### 18. D. Jetchev, B. Kane — *Equidistribution of Heegner points and ternary quadratic forms*
arXiv:0908.3905 (2009).

**Content (read).** Galois orbits of Heegner points of discriminant Dc² on X₀(N) equidistribute under **reduction modulo an inert prime ℓ** among supersingular points. Both the fundamental discriminant D and the conductor c may grow, with (c, N) = 1.

**Assessment (ours).** This is not archimedean equidistribution. It also requires the conductor coprime to the level, whereas ours is conductor u at level u². Not applicable. It is the only fetched result allowing conductor growth together with a level.

### 19. N. Templier — *A non-split sum of coefficients of modular forms*
arXiv:0902.2496 (2009).

**Thm 1 (read).** Let f be weight 2 of odd squarefree level. Then Σ_{N<n<2N} λ_f(n² + d) ≪_f N^{1−η}, uniformly for primes d ≡ 3 (mod 4) and d^{1/2−η′} ≤ N ≤ d^{1/2+η′}, with small absolute η, η′ > 0 (not explicit).

**Assessment (ours).** This is the "short-sum" regime N ≈ √(discriminant), analogous to our sparsity (u points against discriminant ≈ u²). It covers cusp forms with a prime discriminant d only, and the leading coefficient is 1.

### 20. A. Pascadi — *Large sieve inequalities for exceptional Maass forms and the greatest prime factor of n² + 1*
Forum Math. Pi 14 (2026) e8; arXiv:2404.04239.

**Content (read, intro).**
- New large sieve inequalities for the Fourier coefficients ρ_{ja}(n) of exceptional Maass forms of level q.
- They hold for sequences with sparse Fourier transform, such as a_m = e(mα) and dispersion-type b_n. They give the first savings in the critical case N ≈ q.
- Consequences: improved multilinear Kloosterman bounds, and P⁺(n² + 1) > n^{1.3} infinitely often.

**Assessment (ours).**
- It improves only the exceptional-spectrum dependence, and our target needs any saving.
- It becomes relevant only if a Kuznetsov route on Γ₀(u²) is taken, where coefficients entangled with the level u² are the issue.
- Entry 1 removes the θ-dependence altogether.

### 21. J. Merikoski — *On the largest prime factor of n² + 1*
J. Eur. Math. Soc. 25 (2023) 1253–1284; arXiv:1908.08816.

**Content (read).** A Type II estimate (Prop. 4) for Σ_{m∼M, n∼N} a_m b_n Σ_{ℓ∼x, ℓ²+1≡0 (mn)} 1 via Deshouillers–Iwaniec, giving P⁺(n² + 1) > n^{1.279}. Type I information is imported from de la Bretèche–Drappeau (Prop. 3, quoted above).

**Assessment (ours).** Fixed polynomial. Its relevance is superseded by the uniform version in entry 1.

### 22. Singular series for polynomials (topic 6)
- **E. Kowalski, *Averages of Euler products, distribution of singular series and the ubiquity of Poisson distribution*.** Preprint PDF from the author's ETH page; journal venue **unverified**, believed Acta Arith.
  - **Thm 1.1 (read).** For fixed k, (1/h^k) Σ*_{|h|≤h} S(h)^m → μ_k(m), with μ_k(m) = μ_m(k); μ_k(1) = 1 is Gallagher.
  - **Thm 1.2.** S(h) has a limiting distribution.
  - **Thm 1.3.** Poisson statistics for polynomial prime patterns, **conditional** on a uniform Bateman–Horn conjecture with error O(c(f)^ε / log N).
  - Only limits of averages (no rates), and only linear shifts in the unconditional part.
- **N. Kravitz, K. Woo, M. W. Xu, *The distribution of prime values of random polynomials*, arXiv:2512.03292 (abstract only).** Bateman–Horn holds for 100% of polynomials in an L^k sense, when averaging over coefficients.
- **E. Sofos, *The Bateman–Horn conjecture on average for generalized von Mangoldt functions*, arXiv:2606.15698 (abstract only).**
- **V. Volfson, arXiv:2606.28832 (math.GM, abstract only).** Tail of the singular product. Not refereed; not relied on.

**Assessment (ours).** No analogue of Montgomery–Soundararajan or Friedlander–Goldston (second-order terms of singular-series averages) for **polynomial** singular series along a progression of arguments was found.
- Our E_u − E and the Cesàro correction (E_u − 1)Y/2 are elementary main terms.
- The o(H log H) statement is an error-term (equidistribution) statement, so this literature does not supply it.
- Status: **nothing located**. This is not proof that nothing exists.

### 23. Other items checked and set aside
- **K. Woo, *Sums of Hecke eigenvalues along polynomial sequences and base change for GL(2)*, arXiv:2604.18923 (abstract only).** Sums of |λ_π| along polynomial sequences save a logarithm iff π is cuspidal. This is about absolute values, not relevant to cancellation.
- **J. Marklof, M. Welsh, *Fine-scale distribution of roots of quadratic congruences*, arXiv:2105.02854 (abstract read).** Limit laws for µ² ≡ D (mod m), for fixed D > 0 square-free and D ≢ 1 (mod 4), via geodesic line processes. Fixed D; not uniform.
- **G. Martin, S. Sitar, arXiv:0903.1834 (abstract read).** An Erdős–Turán inequality with a moving target, plus Hooley's argument adapted to **reducible** quadratics. A possible technical tool for the Cesàro/moving-endpoint issue; no uniformity.
- **Michel–Venkatesh; Harcos–Michel (Invent. Math. 2006); Clozel–Oh–Ullmo (Hecke points).** Not fetched. Their statements are **unverified** here.

---

## Sources
- Grimmelt–Merikoski 2505.00493: https://arxiv.org/abs/2505.00493
- Grimmelt–Merikoski 2505.00489: https://arxiv.org/abs/2505.00489
- Grimmelt–Merikoski 2508.17979: https://arxiv.org/abs/2508.17979
- Grimmelt–Merikoski 2404.08502: https://arxiv.org/abs/2404.08502
- Templier–Tsimerman: https://arxiv.org/abs/1106.1139
- Blomer: https://arxiv.org/abs/0803.4301 ; https://academic.oup.com/imrn/article-abstract/doi/10.1093/imrn/rnn059/700420
- de la Bretèche–Drappeau: https://arxiv.org/abs/1703.03197
- Ngo: https://arxiv.org/abs/2107.13301
- DFI 2012: https://academic.oup.com/imrn/article-abstract/2012/11/2493/795655
- DFI 1997: https://link.springer.com/article/10.1007/s002220050135
- Bettin–Chandee: https://arxiv.org/abs/1502.00769
- Wright: https://arxiv.org/abs/2604.25177
- Dong–Robles–Zeindler (withdrawn): https://arxiv.org/abs/2601.00292
- DKSZ: https://arxiv.org/abs/1908.10143
- KSSZ: https://arxiv.org/abs/2103.09405
- SSZ: https://arxiv.org/abs/2009.03460
- Baier: https://arxiv.org/abs/2601.15448
- Liu–Masri–Young: https://arxiv.org/abs/1206.3208
- Humphries–Nordentoft: https://arxiv.org/abs/2211.05890
- Jetchev–Kane: https://arxiv.org/abs/0908.3905
- Templier 2009: https://arxiv.org/abs/0902.2496
- Pascadi: https://arxiv.org/abs/2404.04239
- Merikoski 2019/2023: https://arxiv.org/abs/1908.08816
- Kowalski: https://people.math.ethz.ch/~kowalski/singular-series-distribution.pdf
- Kravitz–Woo–Xu: https://arxiv.org/abs/2512.03292
- Sofos: https://arxiv.org/abs/2606.15698
- Volfson: https://arxiv.org/abs/2606.28832
- Woo: https://arxiv.org/abs/2604.18923
- Marklof–Welsh: https://arxiv.org/abs/2105.02854
- Martin–Sitar: https://arxiv.org/abs/0903.1834

## Literature round 3 (15 Sep 2026, night): the middle range — sums over roots with Kloosterman / automorphic-kernel methods
- **Grimmelt–Merikoski, arXiv 2505.00493 (v2 2025), "On the greatest prime factor and uniform equidistribution of quadratic
  polynomials".** Read (pdftotext, §1–§5). Polynomials aℓ² + h, negative discriminant (a, h ≥ 1). Theorem 1.4 (Type I):
  for D ≤ K ≤ X², D ≤ X^{1/2}, h ≺≺ X², a ≺≺ 1:
  Σ_{d≤D} λ_d Σ_{k≡0(d)} ψ₁(k/K)[Σ_{aℓ²+h≡0(k)} ψ₂(ℓ/X) − ϱ_{a,h}(k)X∫ψ₂/k] ≺≺ D X^{1/2}(D + h^{1/2})^{1/2}(1 + X/(D(D+h^{1/2})))^θ.
  Theorem 1.5 (Type II in the modulus k = mn). Theorem 1.2: roots mod primes equidistributed uniformly in h ≤ X^{1+o(1)}, a ≤ X^{o(1)}.
  They remark the Type I/II bounds stay nontrivial for h < X². Method: symmetric matrices / Heegner points of determinant ah
  (Λ_{ah}, #Λ_{ah} ≤ (ah)^{1/2+o(1)}), level q = ad (Lemma 3.1: c ≡ 0 mod ad, b ≡ 0 mod a), their kernel theorem (Theorem 2.1 =
  [5, Thm 8.1], arXiv 2505.00489 "Weighted averages of SL₂(R) automorphic kernel I") + Cauchy–Schwarz over the level + divisor bound
  for the off-diagonal (Prop 4.1: Σ_{q∼Q}⟨α_q|K_q k_Z|α_q⟩ ≺≺ Qh^{1/2} + hZ^{1/2}); independent of Selberg (any spectral gap).
  RELEVANCE: for D < 0 our piece u IS their Type I sum with a = u², h = |D|, ℓ ≤ Y the window, and (since λ = 1 * κ with
  Σ_{e>E}κ(e)/e ≪ E^{−1+ε}) a level D = Y^{δ} suffices. They need a ≺≺ 1, i.e. u = H^{o(1)}: this already gives a power saving for
  every piece with u ≤ H^{o(1)} (smooth weights; paper III has only u = 1 via DFI). The a-dependence is not tracked; in their proof
  a enters through the level q = ad (their K₁, K₂ are bounded by sums over ALL q ≤ aD — loses a), the Heegner set Λ_{ah}, and the
  skewness X/Y ≍ X a^{1/2}h^{−1/2}. Heuristic count in PROOFS-uniform §13. Positive discriminant (D > 0) not covered.
- **Merikoski, arXiv 1908.08816 (JEMS), n² + 1.** Proposition 4 (Type II in the modulus, via Deshouillers–Iwaniec [DI82, Thm 9]
  for each r): Σ_{m∼M,n∼N} a_m b_n |A_{mn}| = main + O(x^{1−η}) for x^{α−1+η} ≪ N ≪ x^{(2−2θ−α)/3−η}. Moduli structure, h = 1.
- **de la Bretèche–Drappeau, arXiv 1703.03197 (JEMS 2020).** Théorème 5.2: bilinear (moduli mn) level of distribution of k² − D,
  error x^{1/2+ε}M^{1/2} + x^{1+ε}N^{1/2−θ}M^{−3/4+θ/2}; level 1 + 25/178 for well-factorable moduli (Théorème 1.1). Fixed D.
- **Dunn–Kerr–Shparlinski–Zaharescu, arXiv 1908.10143 (Adv. Math. 2020).** Bilinear forms in Weyl sums for modular square roots
  (Salié sums), fixed prime modulus, power saving in the Pólya–Vinogradov range via additive energy of quadratic residues. Also
  arXiv 2601.15448 (bilinear sums with modular square roots, averaging over modulus and primes). Structure: roots of an argument
  n mod p with n in a bilinear set — our ρ_k(d;ū) is a Weyl sum of the modular square roots of Dū²; not yet matched to our ranges.
- **Runbo Li, arXiv 2406.07575.** Observes GM's work gives x^{1.317} for n² + 1; no uniformity statement.
- Not found: any treatment of the leading coefficient a (our u²) as a large parameter, or of dilated roots averaged over a.

## Literature round 4 (15 Sep 2026, night; side agent, full report below verbatim; references reported as read in the PDF unless marked abstract-only; VERIFY BEFORE CITING)
# Literature round 4 (15 Sep 2026): tools for P_u(Y), u up to H^{1/2}

Scope: six targets from the brief. Items already in research/LITERATURE-uniformity.md (GM 2505.00493/00489/2508.17979,
2404.08502, Templier–Tsimerman, Blomer IMRN 2008, dlB–D, Merikoski, DFI 1995/2012, Ngo, Tóth, DKSZ, KSSZ, Baier,
Bettin–Chandee, Trilinear Kloosterman fractions I 2604.25177, LMY, Humphries–Nordentoft, Jetchev–Kane, Marklof–Welsh,
Kowalski singular series) are NOT repeated.

Verification: [PDF] = statement read in the arXiv/journal PDF via pdftotext; [abs] = abstract only; [unverified] = known
second-hand. "Assessment" = our reading, not the authors' claim.

Headline: nothing in the literature proves Weyl-sum or Heegner-point equidistribution uniformly at level u^2 with u a power
of H. The new tools found fall into three groups:
 (i) bilinear Kloosterman bounds beyond the Pólya–Vinogradov barrier for GENERAL moduli (Blomer–Pascadi 2026, Pascadi
     2025, KSWX); these are the right shape for the u ≈ H^{1/2} threshold.
 (ii) Iwaniec's "averaging over the level" device (Invent. 1987, reused by Duke 1988) together with level-uniform
     half-integral-weight bounds (Waibel; Blomer–Pascadi Thm 1.6 for the exceptional spectrum); these are the right shape for
     summing pieces u over levels u^2.
 (iii) trilinear/dispersion technology with congruence-restricted variables and multiplicative weights (Drappeau PLMS
     2017, Wright 2026, Granville–Shao); these fit the balanced range.

---------------------------------------------------------------------------------------------------------------------------

## 1. V. Blomer, A. Pascadi — Bilinear forms with Kloosterman sums via quadratic characters. arXiv:2607.24311 (27 Jul 2026) [PDF]
Thm 1.1. c ≥ 1, N ≤ c, intervals I, J of length ≤ N, a ∈ (Z/cZ)^×, arbitrary α, β:
  Σ_{m∈I,n∈J,(m,n,c)=1} α_m β_n S(am,n;c) ≪ ||α|| ||β|| N c^{1/2+o(1)} ( c^{13/32}/N^{7/8} + c^{5/16}/N^{11/16} + c^{1/9}/N^{1/3} ).
  At N = c^{1/2} this saves c^{-1/32}. It is nontrivial for N ∈ (c^{13/28+ε}, c^{7/12−ε}), for ALL moduli c (not only primes).
  Theorem 5.5 covers unequal lengths.
Thm 1.6 (exceptional-spectrum large sieve, general level q = rs, cusp ~ 1/s):
  Σ_{λ_j<1/4} X^{2θ_j} |Σ_{n∼N} α_n ρ_{ja}(n)|^2 ≪ (qN)^{o(1)} (1 + N/q) ||α||^2, with
  X = 1 + q/N + min(q^{18/11}/N^{23/11}, q^{16/13}/N^{18/13}, q^{32/29}/N^{33/29}) + q^2/N^3.
  Deshouillers–Iwaniec give X = 1 + q/N; at N = q this is X ≍ q^{1/2+1/29}.
Assessment: (a) After Cauchy–Schwarz our off-diagonal is a sum of S(kc, m; [d1,d2]). Suppose that, for a fixed modulus, it
  can be arranged as a bilinear form in two arguments of length ≈ modulus^{1/2}, e.g. (u1,u2) or (k, root-numerator) with
  coefficients free. Then Thm 1.1 is exactly the "beyond Weil at the critical balance" input. Heuristically it lowers the
  u-threshold from H^{1/2+ε} to roughly H^{1/2−η} with η ~ 1/28-type. This is speculative: our numerators c = r1 d2' − r2 d1'
  are tied to the modulus, and the Thm needs a fixed modulus with free coefficients in m and n.
  (b)/(c) Thm 1.6 is level-uniform and holds for any factorisation of q. In a GM-type Heegner/kernel argument at level
  q = u^2·d it controls the θ-loss (the factor (1+X/(D(D+h^{1/2})))^θ in GM Thm 1.4) without Selberg's conjecture and without
  coprimality (n,q) = 1.

## 2. A. Pascadi — Non-abelian amplification and bilinear forms with Kloosterman sums. arXiv:2511.08445 (v2 Jun 2026; refereed revision) [PDF]
Thm 1.1. M, N ≪ c^{1/2+o(1)}: Σ_{m≤M,n≤N,(m,n,c)=1} α_m β_n S(am,n;c) ≪ ||α|| ||β|| c^{1−1/700+o(1)}. If |α_m| ≤ 1 this improves
  to √M ||β|| c^{1−1/276}.
Thm 1.2. Let c = d d' e with d'|d and (d,e) = 1, and let f be the largest integer with f^2 | cd. For intervals of length
  ≪ c^{1/2+o(1)}: the bilinear sum is ≪ ||α|| ||β|| c^{1+o(1)} (f / min(c, d^2))^{1/6}.
  Example 1.3: if d | c with c/d squarefree and d ≍ √c, the saving is c^{-1/12} (e.g. c = pq with p ≍ q).
  The method is Fourier analysis on SL2(Z/cZ) plus amplification. Applications include the large sieve for exceptional forms
  at composite levels (§9).
Assessment: our moduli [d1,d2] and levels u^2 are composite. The saving grows with a balanced factorisation of the modulus,
  which is the reverse of the prime case, so this fits (c) (u = n1 n2 balanced) and moduli [d1,d2] with d1 ≍ d2. Thm 1.2
  also allows square factors via f. Same caveat as §1: the coefficients must be free given the modulus.

## 3. B. Kerr, I. E. Shparlinski, X. Wu, P. Xi — Bounds on bilinear forms with Kloosterman sums. arXiv:2204.05038, J. London Math. Soc. 2023 [PDF]
Thm 2.1. For any q, J an interval of length N, α on an interval of length M, d = gcd(a,q):
  Σ_{m,n} α_m K_q(m, an) ≪ ||α||_2 M^{1/2} N q^{1/2+o(1)} Δ1, where Δ1 can be any of
  (a) M^{-1/4}N^{-1}q^{1/2}d^{-1/4} + q^{1/2}N^{-1}M^{-1/2} + N^{-1/2};
  (b) M^{-1/2}(N^{-3/4}q^{1/2} + d^{1/2}) + N^{-1/2};
  (c) M^{-1/2}(N^{-1}q^{1/2} + (qd)^{1/4}) + N^{-1/2}.
  In the PV range M = N = q^{1/2} with bounded α this gives q^{11/8} (saving 1/8). Cor 2.2: the same for type I K_q(mn, a).
  Thm 3.2: the divisor function in a family of progressions.
Assessment: this is "one arbitrary coefficient plus one smooth interval" for general q, which matches a dispersion in which
  one variable (h or k) stays smooth. It is weaker than §1 for two arbitrary coefficients, but has explicit d = gcd(a,q)
  dependence, which is useful when numerators share factors with [d1,d2].

## 4. H. Iwaniec — Fourier coefficients of modular forms of half-integral weight. Invent. Math. 87 (1987) 385–401
## and W. Duke — Hyperbolic distribution problems and half-integral weight Maass forms. Invent. Math. 92 (1988) 73–90 [PDF of Duke; Iwaniec via Duke]
- Duke §3, Thm 2 (Proskurin): the Kuznetsov formula for weight k ∈ {0,1/2,1,3/2} with multiplier.
- Duke §5, Thm 5: for a spectral Maass form of weight k = ±1/2 + integer and discriminant D on Γ0(N), N ≡ 0 (mod D),
  eigenvalue 1/4 + t^2: ρ(n) ≪_{k,D,ε} |λ|^A ch(πt/2) |n|^{−2/7+ε} for n squarefree or a fundamental discriminant, with
  A = 5/4 − (k/4) sgn n.
- The proof uses "Iwaniec's device of averaging over the level" (Duke p. 85–86):
  (1) Take levels Q ∈ 𝒬 = {pN : P < p ≤ 2P, p ∤ n}, p prime.
  (2) Lift f to each Γ0(Q) with normalisation [Γ0(Q):Γ0(N)]^{−1/2}.
  (3) Sum the Kuznetsov inequality over Q:
      n|ρ(n)|^2 ≪ λ^{(5−k)/2} ch(πt) log P · (1/|𝒬|) Σ_{Q∈𝒬} (|S_Q| + |V_3(n,n)|),
      with S_Q = Σ_{c≡0 (Q)} c^{−1} K(n,n;c) J_{9/2}(4πn/c).
  (4) Bound Σ_Q |S_Q| by [Iwaniec 1987, Thm 3], a bound for sums of Kloosterman sums over the varying levels. The result is
      n|ρ(n)|^2 ≪ [(n/P)^{3/2} + (nP)^{3/8} + n^{3/7}] n^ε, with P = n^{1/7}.
Assessment: this is the closest classical template to "sum the pieces u over their levels u^2 and gain from the level
  average". Iwaniec's Thm 3 obtains cancellation in Σ_{Q∈𝒬} Σ_{c≡0 (Q)} K(n,n;c)/c beyond Weil by exploiting the averaging
  over Q (it is essentially a large sieve over the set of c having a divisor in 𝒬).
  Our sum Σ_u w(u) P_u has levels u^2, multiplicative weights, and D fixed, whereas Iwaniec has levels pN with p prime ∼ P.
  Two things must be checked in Iwaniec's Thm 3 (not yet read in the original): whether it survives
  (i) square levels u^2 in place of prime multiples pN, and (ii) weights w(u) not ≥ 0.
  Most useful for (b) (u ≤ H^{1/3}, where the level set is thin); possibly for (c).

## 5. F. Waibel — Fourier coefficients of half-integral weight cusp forms and Waring's problem. arXiv:1706.09320 (Ramanujan J., 2018) [PDF]
Thm 1. Take an orthonormal basis {φ_j = Σ a_j(n) e(nz)} of S_{k/2}(N, χ) for odd k ≥ 5, or of U^⊥ (the complement of the
  theta subspace) for k = 3. Write n = t v^2 w^2 with t squarefree, v | N^∞, (w,N) = 1, χ quadratic. Then
  Σ_j |a_j(n)|^2 ≪ n^{k/2−1} ( t^{3/7}v^{6/7}(n,N)^{1/7}/N^{2/7} + t^{3/8}v^{3/4}(n,N)^{1/4}/N^{1/8} + v(n,N)/N + 1 ) (nN)^ε.
  For general χ the third term is multiplied by (c_χ rad c_χ)^{1/4}. The proof extends Iwaniec/Duke with Blomer's
  (Acta Arith. 114 (2004)) uniform-level treatment of twisted Kloosterman sums at prime-power moduli.
Assessment: this is an explicit polynomial saving in the level N for half-integral-weight coefficients: the basis sum is
  ≪ n^{k/2−1}·(... + 1), with the per-level saving N^{−1/8} to N^{−2/7}. In the "θ(z) → θ(u^2 z), level 4u^2" picture (the
  Templier–Tsimerman/Blomer route) this is the kind of level-uniform input needed.
  Limitations: holomorphic weight ≥ 3/2 only (not the weight-1/2 Maass forms of the D < 0 Weyl sums); the theta subspace is
  excluded for k = 3; the index relevant to us, n ~ |D|h^2, is not squarefree (the v, w factors enter).
  Weight-1/2 Maass analogue uniform in N: NOT found.

## 6. Q. Sun — Uniform bounds for Kloosterman sums of half-integral weight with applications. arXiv:2305.19651, Forum Math. 37 (2025) 75–109 [PDF §1]; companion "same-sign case" arXiv:2309.05233 [abs]
Setting: "admissible" weight ±1/2 multipliers ν on Γ0(N), which include the theta multiplier and its quadratic twists.
  Admissibility requires level lifting to (Γ0(M), ν') and an average Weil bound over N | c ∈ [y,x].
Thm 1.2 (m̃ > 0 > ñ, Bm̃ and Bñ squarefree or coprime to M):
  Σ_{N|c≤X} S(m,n,c,ν)/c = Σ_{exceptional r_j} τ_j(m,n) X^{2s_j−1}/(2s_j−1) + O_{ν,ε}((|m̃ñ|^{143/588} + X^{1/6}) |m̃ñX|^ε).
Thm 1.3: ≪ |m̃ñ|^{131/588−θ/2} X^θ + |m̃ñ|^{143/588} + X^{1/6}. Thm 1.4 removes the squarefree condition, at a cost
  A_u(m,n) with u_m, u_n | M^∞.
Assessment: the uniformity is in m, n (i.e. h and D) and X, but the implied constant depends on ν and Γ0(N); the level is
  not tracked. It is useful as the D < 0 (opposite-sign, S(h^2, D)) statement at a FIXED level. To use it for levels u^2 the
  N-dependence would have to be redone. The companion handles mn > 0 (D > 0).

## 7. N. Andersen, W. Duke — Modular invariants for real quadratic fields and Kloosterman sums. arXiv:1801.08174, Algebra & Number Theory 14 (2020) 1537–1575 [PDF §1]
Thm 1.3 (Kohnen plus space, level 4). k = ±1/2, (−1)^λ m = v^2 d', (−1)^λ n = w^2 d with d, d' fundamental discriminants,
  not both 1:
  Σ_{4|c≤x} S_k^+(m,n,c)/c ≪ (x^{1/6} + (dd')^{2/9}(vw)^{1/3}) (mnx)^ε.
  The proof uses a Kuznetsov formula for the plus space plus Young's Weyl-type hybrid subconvexity (1405.5457). Under
  Lindelöf the exponent 2/9 becomes 1/6.
Assessment: this is the positive-discriminant (D > 0, Salié-type) analogue with explicit polynomial dependence on the
  square parts v, w, i.e. on frequencies h. That dependence is what the h-sum in P_u needs, and it treats non-fundamental
  indices. The level is only 4, and the paper notes that DFI's Γ0(4q) version (IMRN 2012, known) saves only n^{−1/1330}.
  Relevant for positive D at u = O(1), and as a template for tracking square parts.

## 8. S. Drappeau — Sums of Kloosterman sums in arithmetic progressions, and the error term in the dispersion method. arXiv:1504.05549, Proc. London Math. Soc. 114 (2017) [PDF §2]
Thm 2.1 (Deshouillers–Iwaniec type, with congruences). Let q, c0, d0 with (c0 d0, q) = 1, b_{n,r,s} supported on
  (0,N] × (R,2R] × (S,2S], and g smooth in (c,d,n,r,s). Then
  Σ_{c≡c0, d≡d0 (q), (qrd,sc)=1} Σ_{n,r,s} b_{n,r,s} g(c,d,n,r,s) e(n \overline{rd}/(sc))
    ≪ (qCDNRS)^{ε+O(ε0)} q^{3/2} K ||b||_2,
  where K^2 = qCS(RS+N)(C+RD) + C^2 DS √((RS+N)R) + D^2 NRS^{-1}.
  The author notes he made no attempt to optimise q; the loss comes from completing to modulus scq.
  Theorems 1.1–1.6: a power saving in the Titchmarsh divisor problem under GRH, and explicit Siegel-zero contributions.
Assessment: this is the canonical tool for dispersion with congruence-restricted smooth variables beyond PV, but the loss q^{3/2}
  is fatal for q ~ u large. Useful only if the u-congruence can be moved into the coefficients b (it can, at loss
  ||b||_2) and the remaining congruence modulus is small, e.g. in (c) after factoring u = n1 n2 with the congruence mod a
  small n1.

## 9. T. Wright — Trilinear Kloosterman fractions II: subdyadic intervals and nearly balanced convolutions. arXiv:2608.27732 (27 Aug 2026) [abs]
For α_m (m ∼ M) and β_n (n ∼ N) with β equidistributed to small moduli, it bounds sums over moduli q ∼ Q = X^{1/2+ε}
  (Fouvry–Radziwiłł "nearly balanced convolutions"). With N = X^{1/2+δ} and M = X^{1/2−δ}, the admissible range improves
  from δ < 1/112 to δ < 1/68. Sharper trilinear Kloosterman-fraction bounds hold on subdyadic intervals.
Assessment: (c) exactly this "balanced product beyond the square-root barrier" regime, for convolutions averaged over moduli
  q just above X^{1/2}, with arbitrary coefficients. Our analogue replaces α * β by w(u) with u = n1 n2 and the Kloosterman
  fraction by e(c ū/q). Matching to root-valued numerators is unverified.

## 10. A. Granville, X. Shao — Bombieri–Vinogradov for multiplicative functions, and beyond the x^{1/2}-barrier. arXiv:1703.06865 (Adv. Math. 2019) [abs]
Equidistribution of general (1-bounded) multiplicative functions in APs on average over moduli q ≤ x^{20/39−δ} for a fixed
  residue class. The abstract explains why the prime-number proofs do not transfer.
Assessment: (a)/(c) the only general "multiplicative weights beyond 1/2" statement found. Our weights w(u) ≈ 1 * χ_D are far
  more structured (a divisor-type convolution), so this is a benchmark for what a structure-free argument gives, not a tool.

## 11. B. Kerr, I. E. Shparlinski — Bilinear sums of Kloosterman sums, multiplicative congruences and average values of the divisor function over families of APs. arXiv:1811.09329 (Res. Number Theory 2020) [abs]
Σ_{n≤x, n≡a (q)} τ(n) for q ≥ x^{2/3}, with only minimal averaging over a (an interval of reduced residues or an arbitrary
  set). Method: Blomer's 2008 Voronoi treatment plus KMS/Shparlinski bilinear Kloosterman bounds plus a second Voronoi,
  reducing to multiplicative congruences.
Assessment: (target 2) this is the closest "divisor function in APs beyond the classical level with thin averaging" result,
  but for τ(n), not τ(n^2 − D). Target 2 proper (τ(n^2 + 1) in APs n ≡ a (q) with q near x^{1/2}): NOTHING found beyond
  the GM/Blomer/Templier–Tsimerman items already known.

## 12. M. P. Young — Weyl-type hybrid subconvexity bounds for twisted L-functions and Heegner points on shrinking sets. arXiv:1405.5457, JEMS 19 (2017) [abs]
Weyl-type subconvexity for L(1/2, f ⊗ χ_d), uniform in the spectral parameter and in d. Consequence: explicit counts of
  Heegner points of large odd discriminant in shrinking sets (level 1).
Assessment: this is the engine behind Andersen–Duke's explicit dependence (§7). It is level-1 only, so it does not by itself give
  level u^2. It is relevant if P_u can be reduced to level-1 Heegner points of discriminant 4u^2 D in a u-dependent shrinking
  region (the region scaled by 1/u). Speculative.

## 13. L. Clozel, H. Oh, E. Ullmo — Hecke operators and equidistribution of Hecke points. Invent. Math. 144 (2001) 327–351 [unverified here; abstract/secondary]
Effective equidistribution of Hecke points, including CM points of a FIXED CM field with varying order (conductor → ∞) at
  level 1. The rate comes from Hecke operator norms (≈ n^{−1/2+θ} on L^2_0, modulo Sobolev norms).
Assessment: Heegner points of discriminant 4u^2 D at level 1 are the conductor-u CM points of Q(√D), i.e. Hecke translates of
  the fixed CM set. This gives the "unrestricted" equidistribution in u with a power rate. Our pieces add the level u^2 /
  congruence m ≡ 0 (mod u) selection, which is exactly what COU does not see. Structural remark only.

## 14. P. Humphries, M. Radziwiłł — Optimal small scale equidistribution of lattice points on the sphere, Heegner points, and closed geodesics. arXiv:1910.01360, CPAM 75 (2022) [abs]
The variance of Heegner-point / closed-geodesic counts in shrinking balls and annuli, on average over discriminants.
Assessment: a second-moment (variance) statement, averaged over the discriminant, not over the level. It is the right genre
  for "Σ_u |P_u|^2"-type bounds, but the averaging variable does not match. Low relevance.

## 15. Also checked, set aside
- Dunn, arXiv:1708.03003 (RNT 2018): uniform sums of half-integral-weight Kloosterman sums, eta multiplier, level 1; improves
  Ahlgren–Andersen in the mn-aspect [abs]. Level 1, eta multiplier: not our multiplier.
- Blomer–Harcos–Michel, Forum Math. 19 (2007), Appendix 2 (Mao): a uniform upper bound for Fourier coefficients of holomorphic
  half-integral-weight cusp forms via Waldspurger + Baruch–Mao [unverified]. A possible level-uniform alternative to §5.
- Blomer, "Uniform bounds for Fourier coefficients of theta-series with arithmetic applications", Acta Arith. 114 (2004)
  [unverified]. Used by Waibel for the level uniformity.
- Musicantov–Zehavi, arXiv:2112.07494: sectorial equidistribution of roots of x^2+1 mod p (non-spherical Poincaré series on
  Γ\SL2(R)). Fixed polynomial, prime moduli.
- Bordignon–Bortolotto–Kerr, arXiv:2303.03768 (ANT 2025): Weyl sums with multiplicative coefficients and joint
  equidistribution of roots and polynomial values [abs]. No level/coefficient uniformity.
- Kuperberg, arXiv:2301.06095 (IJNT 2025): sums of Hardy–Littlewood singular series along APs and with smooth weights. Only
  linear k-tuples. Target 6 (polynomial singular series off-diagonal via automorphic methods): still NOTHING found.
- Fouvry–Ganguly–Kowalski–Michel, arXiv:1301.0214: Gaussian distribution of τ in residue classes mod p. Not relevant.
- Dunn–Zaharescu, arXiv:1903.03416: short sums of products of Salié sums below √p (prime modulus). Fixed modulus.
- Kerr–Shparlinski–Wu–Xi Thm 3.2; Motohashi-type averages: τ(n) only.

---------------------------------------------------------------------------------------------------------------------------
## Ranked lists

(a) u ≈ H^{1/2} threshold (Kloosterman sums after C–S at the critical balance)
  1. Blomer–Pascadi 2607.24311, Thm 1.1: c^{−1/32} at N = √c for all moduli, nontrivial down to N > c^{13/28}.
  2. Pascadi 2511.08445, Thm 1.1/1.2: composite moduli, saving from a balanced factorisation of the modulus.
  3. Kerr–Shparlinski–Wu–Xi 2204.05038, Thm 2.1: one smooth variable, general q, explicit gcd(a,q) dependence.
  4. Granville–Shao 1703.06865: benchmark only.
  Caveat for all four: they need the modulus fixed and the coefficients free. Our numerators are built from roots tied to
  [d1,d2]. The first check is whether the u-dispersion can be written as Σ_{u1,u2} α β S(a u1, u2; c) or with a smooth k.

(b) small end u ≤ H^{1/3} (level-uniform automorphic input on Γ0(u^2))
  1. Iwaniec 1987 Thm 3 (sums of Kloosterman sums over varying levels), as used in Duke 1988 §5. Next step: read Iwaniec's
     Thm 3 and check square levels u^2 and signed weights.
  2. Waibel 1706.09320, Thm 1: explicit N^{−1/8} to N^{−2/7} saving for half-integral coefficients at level N (holomorphic
     only).
  3. Blomer–Pascadi 2607.24311, Thm 1.6: level-uniform exceptional-spectrum large sieve, to remove the θ-loss in a GM Type I
     argument at level u^2 d.
  4. Sun 2305.19651 (D < 0) and Andersen–Duke 1801.08174 (D > 0): uniform in h and D with explicit square-part dependence,
     but at a fixed level. They would need redoing in N.
  5. Young 1405.5457 / Clozel–Oh–Ullmo: level-1 reformulation (conductor-u CM points in shrinking sets). Speculative.

(c) balanced products u = n1 n2 (norms of ideals) in between
  1. Pascadi 2511.08445, Thm 1.2: the saving is driven by a balanced factorisation of the modulus.
  2. Wright 2608.27732 (with Bettin–Chandee, known): nearly balanced convolutions over moduli X^{1/2+ε}.
  3. Drappeau 1504.05549, Thm 2.1: DI quintilinear sums with congruences, usable if the congruence modulus is a small factor n1.
  4. Iwaniec level-averaging (as in (b)), if the level set {u^2 : u = n1 n2} can play the role of {pN}.
  5. Kerr–Shparlinski 1811.09329: the method template (Voronoi → bilinear Kloosterman → multiplicative congruences).

Not found (honest negatives):
- a Weyl-sum bound for quadratic roots uniform in a leading coefficient or level that is a power of H;
- τ(n^2 − D) in APs to moduli near x^{1/2};
- a half-integral-weight Kuznetsov bound for Salié sums with the level tracked;
- a spectral large sieve for Kloosterman sums whose numerators are roots of quadratic congruences;
- Montgomery–Soundararajan-type off-diagonal results for polynomial singular series.

## Sources
- https://arxiv.org/abs/2607.24311  https://arxiv.org/abs/2511.08445  https://arxiv.org/abs/2204.05038
- https://arxiv.org/abs/1706.09320  https://arxiv.org/abs/2305.19651  https://arxiv.org/abs/2309.05233
- https://arxiv.org/abs/1801.08174  https://arxiv.org/abs/1504.05549  https://arxiv.org/abs/2608.27732
- https://arxiv.org/abs/1703.06865  https://arxiv.org/abs/1811.09329  https://arxiv.org/abs/1405.5457
- https://arxiv.org/abs/1910.01360  https://arxiv.org/abs/1708.03003  https://arxiv.org/abs/2112.07494
- https://arxiv.org/abs/2303.03768  https://arxiv.org/abs/2301.06095  https://arxiv.org/abs/1301.0214
- https://arxiv.org/abs/1903.03416
- https://www.math.ucla.edu/~wdduke/preprints/hyperbolic.pdf (Duke, Invent. Math. 92, 1988)
- https://link.springer.com/article/10.1007/s002220100126 (Clozel–Oh–Ullmo)
- https://users.renyi.hu/~gharcos/burgess.pdf (Blomer–Harcos–Michel)

## Literature round 5 (15 Sep 2026, night; side agent follow-up on bilinear Kloosterman fractions at MN ≈ q; verbatim; VERIFY BEFORE CITING)
# Report 2 (15 Sep 2026): double Kloosterman fractions below the completion threshold

Target:
  S = Σ_{m∼M} Σ_{n∼N} α_m β_n e(a·\overline{mn}/q),
with the following data:
  - q squarefree, q ≈ Y, all prime factors split;
  - M ≈ N ≈ q^{1/2−η}, so MN ≈ q^{1−2η};
  - a = k·r with r² ≡ D (mod q);
  - α_m = 1 on an interval and β_n = χ_D(n).
We want any bound ≪ MN q^{−c}.

Verification tags: [PDF] means the statement was read in the arXiv PDF (pdftotext). [ours] means our own computation from a
stated theorem.

## VERDICT

YES, for every modulus q (prime or composite, no factorisation needed), whenever η > 0 is fixed. The saving is (MN/q)^{1/8}.
The result is Bourgain–Garaev, "Kloosterman sums in residue rings", Theorem 3 (§1 below). It allows arbitrary
coefficients bounded by 1, the variables have to lie in initial intervals [1,N] (dyadic m ∼ M is fine), and the bound is
uniform in a with (a,q) = 1. Averaging over q or over roots is therefore not needed.

What it does NOT cover:
  - the window M, N ∈ [q^{1/2−ε}, q^{1/2+ε}], i.e. η → 0, where the saving (MN/q)^{1/8} degenerates;
  - (a,q) > 1 (reduce the modulus first).
For prime moduli the window is also closed: Bourgain–Garaev (Izvestiya), Theorem 9 gives a saving p^{−(1−2η)/16} for
intervals in arbitrary position, including η = 0. For composite moduli, the window can be treated by q-van der Corput when q
has a divisor in a suitable range (§5).

---------------------------------------------------------------------------------------------------------------------------

## 1. J. Bourgain, M. Z. Garaev — Kloosterman sums in residue rings. arXiv:1309.1124, Acta Arith. 164 (2014) 43–64 [PDF]

### The statements
General modulus m. Throughout, x* denotes the inverse mod m and variables are coprime to m.

Thm 1 (reciprocal energy). For I = [1,N] and any m, the number J_{2k} of solutions of
  x1* + … + xk* ≡ x_{k+1}* + … + x_{2k}* (mod m),  x_i ∈ [1,N],
satisfies
  J_{2k} < (2k)^{90k³} (log N)^{4k²} (N^{2k−1}/m + 1) N^k.
(The proof uses geometry of numbers / lattices and holds for arbitrary m.)

Thm 3 (bilinear Kloosterman fractions). Let I1 = [1,N1], I2 = [1,N2], and |α_i| ≤ 1 arbitrary. Uniformly in k1, k2 ≥ 1
and in gcd(a,m) = 1,
  Σ_{x1∈I1} Σ_{x2∈I2} α1(x1) α2(x2) e_m(a x1* x2*)
    < (2k1)^{45k1²/k2} (2k2)^{45k2²/k1} (log m)^{2(k1/k2 + k2/k1)}
      × (N1^{k1−1}/m^{1/2} + m^{1/2}/N1^{k1})^{1/(2k1k2)}
      × (N2^{k2−1}/m^{1/2} + m^{1/2}/N2^{k2})^{1/(2k1k2)} · N1N2.

The key inequality in the proof (§4.1, read) is
  |S|^{2k1k2} ≤ m · N1^{2k1k2−2k1} · N2^{2k1k2−2k2} · J_{2k1}(N1) · J_{2k2}(N2).

Cor 1. Suppose that for i = 1 or i = 2, N_i ∉ ∪_{j≥1} [m^{1/(2j)−ε}, m^{1/(2j)+ε}]. Then
  max_{(a,m)=1} |S| < m^{−δ(ε)} N1N2.

### Application to our range [ours]
Take k1 = k2 = 2. For m^{1/3} ≤ N_i ≤ m^{1/2} we have J_4(N_i) ≪ N_i^5/m · log^{16}. Hence
  |S|^8 ≤ m·M^4·N^4·(M^5/m)(N^5/m) = (MN)^9/m,
  so |S| ≪ MN · (MN/m)^{1/8} · (log m)^{O(1)}.
With MN = q^{1−2η} this gives |S| ≪ MN · q^{−η/4 + o(1)}.
For the smaller range q^{1/4} < N < q^{1/3} (i.e. 1/6 ≤ η < 1/4), use J_4 ≪ N²; the saving is then q^{−(1−4η)/8}.

### Fit to our sum
  - q composite squarefree: allowed (any m).
  - α_m = 1_{m∼M}: allowed (arbitrary |α| ≤ 1 on [1,2M]).
  - β_n = χ_D(n): allowed (bounded).
  - a = k r: need (kr, q) = 1. Since (D,q) = 1, r is a unit; if g = (k,q) > 1, pass to modulus q/g.
  - The bound is uniform in a, so it holds for every q and every root r individually.
  - Requirement: m, n in intervals starting near the origin, which holds for dyadic ranges.

## 2. J. Bourgain, M. Z. Garaev — Sumsets of reciprocals in prime fields and multilinear Kloosterman sums. arXiv:1211.4184, Izv. Math. 78:4 (2014) 656–707 [PDF]
Prime modulus p only. The paper says the composite case is deferred to §1 above, but §1 generalises only the
initial-interval results (Thms 1, 3), not Thms 7, 9, 10.

- Thm 1 (arbitrary interval I). J_{2k} < (|I|^{2k²/(k+1)} + |I|^{2k}/p)·|I|^{o(1)}.
- Thm 7 (arbitrary intervals). If |I1| > p^{1/18} and |I2| > p^{5/12+ε}, the bilinear sum is < p^{−δ}|I1||I2|.
- Thm 8 / Cor 2: the prime version of §1 Thm 3 / Cor 1 (initial intervals).
- Thm 9 (intervals in ARBITRARY position, arbitrary |α_i| ≤ 1):
    max_{(a,p)=1} |Σ_{x1∈I1} Σ_{x2∈I2} α1 α2 e_p(a x1* x2*)|
      ≪ p^{1/8} N1^{3/4} N2^{3/4} (N1³/p + 1)^{1/16} (N2³/p + 1)^{1/16}.
  [ours] For N1 = N2 = p^{1/2−η} this is ≪ N1N2 · p^{−1/16 + η/8}. It is nontrivial for all 0 ≤ η < 1/2, including the
  window η = 0 (N = p^{1/2}, bound p^{15/16}).
- Thm 10 (arbitrary position, N_i < p^{(k_i+1)/(2k_i)}): the bound is
    (p^{1/(2k1k2)} · N1^{−1/(k2(k1+1))} · N2^{−1/(k1(k2+1))}) · (N1N2)^{1+o(1)}.
- Thm 11: n ≥ 7 variables of length N with N^n > p^{1/3+ε} give saving p^{−δ}.
- Thm 13: n-linear sums with |I1|⋯|In| > p^{1/2+ε} give saving p^{−δ}.
Assessment: for prime q this is complete. Thm 9 is stronger than §1 for primes, and does not need initial intervals or a
  gap away from q^{1/2}. Our q are generally composite, so §1 is the operative statement.

## 3. Karatsuba / Korolev line
- The Karatsuba method is exactly §1 Thm 3: Hölder, then the count J_{2k} for [1,N], originally for very short N. Bourgain–Garaev
  extend its range. The earlier Karatsuba papers were not fetched separately.
- M. A. Korolev, "On Kloosterman sums with multiplicative coefficients", arXiv:1610.09171 [PDF §1].
  S_q(x;f) = Σ'_{n≤x} f(n) e_q(an* + bn), f multiplicative with |f| ≤ 1, general q.
  Thm 1: |S_q| ≤ 562 x · log log q/(ε log q) for q^{1/2+ε} ≤ x ≤ q. Log savings only, and the length is above √q.
  Not our range.
- M. A. Korolev, "Short Kloosterman sums to powerful modulus", arXiv:1604.02300 [PDF]. Saving exp(−γ(ln N)³/(ln q)²) for
  powerful q (small kernel). Not applicable: our q are squarefree.
- M. A. Korolev, "Kloosterman sums with primes to composite moduli", arXiv:1911.09981 [abs + §1]. Prime variable, nontrivial
  for q^{3/4+ε} ≤ X ≪ q^{3/2}. Not our shape.

## 4. Trace-function / algebraic-geometry results (prime moduli only)
- É. Fouvry, E. Kowalski, Ph. Michel, "Algebraic trace functions over the primes", arXiv:1211.6043, Duke 2014 [PDF].
  Thm 1.16 (Type I2): for an isotypic trace weight K mod p and smooth U, V, W,
    Σ_{m,n} K(mn)(m/n)^{it} U(m/M) V(n/N) W(mn/X) ≪ (1+|t|)^A (Q_U+Q_V)^B Q_W · X(1 + p/X)^{1/2} p^{−η}, for any η < 1/8.
  It is nontrivial for MN ≫ p^{3/4+ε}, e.g. M = N ≫ p^{3/8+ε}.
  K(x) = e(a x̄/p) is a rank-one isotypic Fourier trace weight, so this covers the smooth double sum with saving
  ≈ p^{−1/8 + η0} at MN = p^{1−2η0}. It needs BOTH weights smooth: β_n = χ_D(n) (splitting n into classes mod |D|) breaks
  the K(mn) product structure. Primes only.
  Thm 1.17: the type II version needs N > p^{1/2}, so not our range.
  Remark 1.19 points to Fouvry–Michel (Ann. ENS 1998), Prop 1.2 / Thm 1.4, for sub-Pólya–Vinogradov bounds with additive
  characters of rational functions. Not fetched.
- E. Kowalski, Ph. Michel, W. Sawin, "Bilinear forms with Kloosterman sums and applications", arXiv:1511.01636, Annals 2017 [PDF].
  Thm 1.3: p prime, 1 ≤ M ≤ N², N < p, MN < p^{3/2}, α bounded, N an interval:
    B(Kl_k, α, 1_N) ≪ p^ε ||α||_1^{1/2} ||α||_2^{1/2} M^{1/4} N (M²N⁵/p³)^{−1/12};
  nontrivial for M = N ≥ p^{3/7}.
  This is for hyper-Kloosterman Kl_k (k ≥ 2), not for e(a x̄) directly. [ours, speculative] Double Poisson turns S into
  (MN/q)·Σ_{h≤q/M, h'≤q/N} Kl_3(a h h'; q), with dual lengths q^{1/2+η}. Plugging in Thm 1.3 would give nontriviality only for
  η < ~1/100. This route is strictly worse than §1–2.
- É. Fouvry, E. Kowalski, Ph. Michel, C. S. Raju, J. Rivat, K. Soundararajan, "On short sums of trace functions",
  arXiv:1508.00512, Ann. Inst. Fourier 2017 [PDF].
  Thm 1.1: for √m < |I| ≤ m, |Σ_{n∈I} φ(n)| ≤ c√m log(4e⁸|I|/m^{1/2}), any modulus m.
  Cor 1.7: φ = e_p(a x^{−k}), k = 1, 2, has logarithmic saving for x ≥ √p (log p)^{−δ}.
  Only log-size savings at the √q edge, for a single variable. Not a power saving.
- I. D. Shkredov, "Modular hyperbolas and bilinear forms of Kloosterman sums", arXiv:1905.00291, J. Number Theory 220 (2021) [PDF intro].
  Incidence bounds for (a+b)(c+d) = λ in F_p, with a combinatorial bound for bilinear forms of complete Kloosterman sums
  K(n,m) over general sets. It concerns Kloosterman sums, not fractions. Prime p only.

## 5. Factorable composite moduli: q-van der Corput (Heath-Brown; Graham–Ringrose; Polymath 8a; Wu–Xi)
- J. Wu, P. Xi, "Arithmetic exponent pairs for algebraic trace functions and applications", arXiv:1603.07060, ANT [PDF §1, §4].
  Thm 4.3 / Cor 4.1: arithmetic exponent pairs (A-process, and A*-process A₁*) for squarefree q all of whose prime factors
  are ≤ q^η. These give short sums Σ_{n≤N} K(n) of trace functions mod q, including e(a n̄/q), nontrivial down to
  N = q^{ε}.
- D.H.J. Polymath, "New equidistribution estimates of Zhang type", arXiv:1402.0811 [PDF, located]. Type I estimates use
  q-van der Corput for incomplete Kloosterman sums with densely divisible squarefree q.
- [ours, elementary] One A-process step with q = q1 q2, q1 ≤ N, and Weil mod q2 gives, for each fixed m,
    |Σ_{n∼N} e(a \overline{mn}/q)|² ≪ q^ε (N q1 + N q2^{1/2}(1 + N/q2)).
  With N = q^{1/2−η} this is nontrivial as soon as q has a divisor q1 ∈ (q^{2η}, q^{1/2−η}). At q1 ≈ q^{1/3} it gives
  ≪ N^{1/2} q^{1/6+ε}.
  Assessment: this is a second route for composite q, with a much larger saving when q has such a divisor, and it survives
  η → 0 when q has a divisor in (q^ε, q^{1/2−ε}). It fails for q = (small)·prime and for q = p1p2 with p1 ≍ p2 ≍ q^{1/2};
  for those q, use §1 (η fixed) or §2 (prime part).

## 6. Versions averaged over the modulus
- Not needed, since §1 is uniform in q and in a.
- Classical DI/BFI averaging over q (Deshouillers–Iwaniec 1982, Thm 12; Bombieri–Friedlander–Iwaniec) requires a fixed
  numerator a, whereas ours is a = k r(q). Averaging over q and the roots r reconstructs the original dilated-root Weyl sum
  with leading coefficient (mn)², so it is circular.
- Balanced factorisation results of Pascadi 2511.08445 Thm 1.2 type are stated for Kloosterman SUMS; no analogue for
  fractions was found. The q-van der Corput bound in §5 plays that role for fractions.

---------------------------------------------------------------------------------------------------------------------------
## Summary answer

Does a known result give a power saving for Σ_{m∼M,n∼N} α_m β_n e(a·\overline{mn}/q) with M ≈ N ≈ q^{1/2−η}?

**YES, for all moduli q, if η > 0 is fixed.**
- Source: Bourgain–Garaev, Acta Arith. 164 (2014), Theorem 3 / Corollary 1 (arXiv:1309.1124).
- Bound: |S| ≪ MN·(MN/q)^{1/8}(log q)^{O(1)} for q^{1/3} ≤ M, N ≤ q^{1/2}.
- Extra structure needed: m and n in intervals near the origin; |α|, |β| ≤ 1; (a,q) = 1. No smoothness, no factorisation,
  no averaging. The bound is uniform in a.

**YES, for prime q, including η = 0.** Bourgain–Garaev, Izv. Math. 2014, Theorem 9, gives saving p^{−(1−2η)/16} for intervals
in arbitrary position and arbitrary coefficients.

**PARTIAL, for composite q when η → 0 (M, N within q^ε of q^{1/2}).** No general result was found. q-van der Corput (§5)
works if q has a divisor in (q^ε, q^{1/2−ε}). It fails for q = (small)·(prime), where Bourgain–Garaev Theorem 9 can be
applied after CRT with shifted intervals (not checked), and for q = p1p2 with p1 ≍ p2 ≍ q^{1/2}, which stays open.

Sources:
- https://arxiv.org/abs/1309.1124 (Bourgain–Garaev, residue rings)
- https://arxiv.org/abs/1211.4184 (Bourgain–Garaev, Izvestiya)
- https://arxiv.org/abs/1211.6043 (Fouvry–Kowalski–Michel)
- https://arxiv.org/abs/1511.01636 (Kowalski–Michel–Sawin)
- https://arxiv.org/abs/1508.00512 (short sums of trace functions)
- https://arxiv.org/abs/1905.00291 (Shkredov)
- https://arxiv.org/abs/1603.07060 (Wu–Xi)
- https://arxiv.org/abs/1402.0811 (Polymath 8a)
- https://arxiv.org/abs/1610.09171, https://arxiv.org/abs/1604.02300, https://arxiv.org/abs/1911.09981 (Korolev)

## Literature round 6 (15 Sep 2026, night; side agent, energy of reciprocals for composite moduli; verbatim; the transferred bound is the agent's own and UNVERIFIED)
# Report 3 (15 Sep 2026): additive energy of reciprocals of an initial interval, composite moduli

Question. For squarefree m, bound
  J_{2k}(N) = #{x1* + … + xk* ≡ x_{k+1}* + … + x_{2k}* (mod m) : 1 ≤ x_i ≤ N}.
Specifically:
  (i) J_4(N) ≪ m^{o(1)}(N^2 + N^{4−c}) at N ≈ m^{1/2};
  (ii) J_{2k}(N) below N^{3k−1}/m at N = m^{1/(2j)}, k = j+1.

Verification tags: [PDF] = read in the paper; [abs] = abstract only; [ours] = our derivation, with the ingredient read in a PDF.

## VERDICT
(i) YES, for every modulus m. The bound is J_4(N) ≪ m^{o(1)}(N^2 + N^{7/2} m^{−1/2}); at N = m^{1/2} it is N^{5/2}, i.e. c = 3/2.
    - Nobody states it for composite m: we found it in the literature only for primes.
    - The prime proof (Cilleruelo–Garaev GAFA 2011, Thm 1(4), from Heath-Brown's 1978 lattice idea) uses no primality
      beyond gcd(λ,m) = 1. Transfer checked line by line; see §1.
    - Fed into the Bourgain–Garaev Hölder step, it closes the m^{1/2} window of Report 2 for ALL moduli:
      Σ_{x≤N1, y≤N2} α β e_m(a x* y*) ≪ m^{o(1)}(N1N2)^{15/16} for m^{1/3} ≤ N1, N2 ≤ m (§2).
(ii) NO. Nothing found for composite m, and nothing even for primes at N = p^{1/(2j)}, j ≥ 2, in bilinear form. The
    near-optimal prime bounds (Bourgain–Garaev Izvestiya Thms 2–4) require N < p^{3/46}, p^{1/18}, p^{1/(4k²)}. The window at
    m^{1/4} (and m^{1/6}, …) stays open.

---------------------------------------------------------------------------------------------------------------------------

## 1. Key input: concentration on a modular hyperbola in a box with EQUAL shifts

### J. Cilleruelo, M. Z. Garaev — Concentration of points on two and three dimensional modular hyperbolas and applications. arXiv:1007.1526, GAFA 21 (2011) 892–904 [PDF, statement and proof of Thm 1]
Thm 1 (p prime, gcd(λ,p) = 1). Let I2(M;K,L) = #{K+1 ≤ x ≤ K+M, L+1 ≤ y ≤ L+M : xy ≡ λ (mod p)}. Then:
  I2(M;K,L) < M^{4/3+o(1)} p^{−1/3} + M^{o(1)};
  I2(M;L,L) < M^{3/2+o(1)} p^{−1/2} + M^{o(1)}   (K = L).

The proof (read):
  1. Shift to xy + Kx + Ly ≡ b.
  2. Dirichlet/pigeonhole gives t ≤ T with tK ≡ u0, |u0| ≤ p/T; for K = L one t serves both.
  3. Lift to an integer equation (tx+u0)(ty+u0) = n_z, with |z| < T M^2/p + 2M/T + 1/2.
  4. Apply the divisor bound for n_z ≠ 0.
  5. If n_z = 0, x or y is fixed, and λ a unit forces the other.
  6. Choose T ≈ (p/M)^{1/2}.
  The only arithmetic uses are the pigeonhole step (valid mod any m), the divisor bound (p^{o(1)} → m^{o(1)}), and
  "λ ≢ 0 ⇒ unique solution when a factor vanishes" (valid when gcd(λ,m) = 1). The M^{o(1)} refinement for M < p^{1/4}
  uses divisors in short intervals, also modulus-free.
  The same Heath-Brown idea is BG Izvestiya Lemma 10 / Cor 4, stated for p.

[ours] Lemma A. For ANY m ≥ 1, gcd(μ,m) = 1, M ≤ m, and any L:
  #{(x,y) ∈ [L+1, L+M]^2 : xy ≡ μ (mod m)} ≪ m^{o(1)}(M^{3/2} m^{−1/2} + 1).

## 2. Consequence for J_4 and for the bilinear sums [ours]

### J_4 bound
(a) Reduction to J_2. We have J_4 = Σ_λ J_2(λ)^2 ≤ N^2 · max_λ J_2(λ), where J_2(λ) = #{x* + y* ≡ λ}.
(b) Units λ. For gcd(λ,m) = 1, x* + y* ≡ λ ⇔ (x − λ*)(y − λ*) ≡ λ*^2 (mod m). This is a hyperbola in the box [1,N]^2
    shifted equally in both coordinates, so Lemma A gives J_2(λ) ≪ m^{o(1)}(N^{3/2} m^{−1/2} + 1).
(c) Non-units λ, with g = gcd(λ,m) > 1 (m squarefree).
    - Mod g the condition forces x + y ≡ 0, so J_2(λ) = 0 unless g ≤ 2N.
    - Lemma A modulo m/g gives J_2(λ) ≪ m^{o(1)}(N^{3/2}(g/m)^{1/2} + 1).
    - Also Σ_{g|λ} J_2(λ) ≤ N(2N/g + 1).
    - Summing over the τ(m) divisors g ≤ 2N contributes ≪ m^{o(1)}(N^{7/2}m^{−1/2} + N^2).
(d) Result: J_4(N) ≪ m^{o(1)}(N^2 + N^{7/2} m^{−1/2}) for all N ≤ m.
    - Compared with BG Acta Arith. Thm 1 at k = 2, (N^3/m + 1)N^2, it is better exactly when N > m^{1/3}.
    - At N = m^{1/2}: N^{5/2} instead of N^3.
    - For primes this is the known |I*+I*| ≫ min(N^2, (pN)^{1/2}) quoted in BG Izvestiya (1).

### Bilinear sums
Use the inequality from the proof of BG, Acta Arith. 2014, Thm 3 (§4.1, read): for gcd(a,m) = 1 and |α|, |β| ≤ 1,
  |S|^{2k1k2} ≤ m · N1^{2k1k2−2k1} · N2^{2k1k2−2k2} · J_{2k1}(N1) · J_{2k2}(N2).
With k1 = k2 = 2:
  |S|^8 ≪ m^{1+o(1)} N1^4 N2^4 Π_i (N_i^2 + N_i^{7/2} m^{−1/2}).
  - m^{1/3} ≤ N1, N2 ≤ m: |S| ≪ m^{o(1)} (N1N2)^{15/16}, a saving (N1N2)^{−1/16}, i.e. m^{−1/16} at N1 = N2 = m^{1/2}.
  - m^{1/4} ≤ N_i ≤ m^{1/3}: |S| ≪ m^{1/8+o(1)} (N1N2)^{3/4}, nontrivial iff N1N2 > m^{1/2+ε}.
  - Relative to Report 2 at MN = m^{1−2η}: the saving becomes max(m^{−η/4}, m^{−(1−2η)/16}); the new bound is the better
    one for η < 1/6.
Remaining window: N1, N2 both near m^{1/4} (and, via k ≥ 3, near m^{1/(2j)}, j ≥ 2). There J_4 ≍ N^2 is already optimal
  (diagonal), so the gap is exactly (ii): one needs J_6(m^{1/4}) ≪ N^{4−c} against BG's N^4.
Caution: this is our derivation, checked against the published proofs. It deserves an independent line-by-line check
  before it is used in a paper.

## 3. Literature checked for (ii) and for composite energy results

- **J. Bourgain, M. Z. Garaev, Izv. Math. 78 (2014), arXiv:1211.4184** [PDF]. Prime p only.
  - Thm 1 (arbitrary interval I): J_{2k} < N^{2k²/(k+1)+o(1)} + N^{2k+o(1)}/p.
  - Thm 2: x*+y*+z* = λ has < N^{2/3+o(1)} solutions for N < p^{3/46}.
  - Thm 3: J_6 < N^{3+o(1)} for N < p^{1/18}.
  - Thm 4: J_{2k} < N^{k+o(1)} for N < p^{c/k²}, c = 1/4.
  - Lemma 12: #{xy ≡ zt} with x,z ∈ I1, y,t ∈ I2, |I1||I2| < p, is ≤ (|I1||I2|)^{1+o(1)}. For INITIAL intervals this is
    trivial for any m, since it lifts to xy = zt over Z.
  - For (ii) at N = m^{1/(2j)}, k = j+1: Thm 1's exponent 2k²/(k+1) exceeds k+1 for j ≥ 2, so it does not help even for
    primes; Thms 2–4 are far outside the range. Whether the Thm 1 proof transfers to composite m for [1,N] was not checked,
    and it would not matter for (ii).
- **J. Bourgain, M. Z. Garaev, Acta Arith. 164 (2014), arXiv:1309.1124** [PDF]. Thm 1 (any m, I = [1,N]):
  J_{2k} < (2k)^{90k³}(log N)^{4k²}(N^{2k−1}/m + 1)N^k, proved via geometry of numbers. No composite improvement found since.
- **I. E. Shparlinski, "Modular hyperbolas", Japan. J. Math. 7 (2012), arXiv:1103.2879** [PDF §3–4].
  - Thm 13 (any m, completion): points in boxes = XY/m·(φ/m) + O(m^{1/2+o(1)}). Trivial at side m^{1/2}.
  - §4.4 Thm 30 (Cilleruelo–Garaev, prime): the bounds of §1.
  - The survey notes (Question 17 and surrounding text) that several ingredients "are not known for composite m". No composite
    concentration result is listed. The equal-shift case of §1 is not singled out for composite m.
- **T. H. Chan, I. E. Shparlinski, Acta Arith. 142 (2010)** [via CG and the survey]. I2 ≪ M^2/p + M^{1−η} via Bourgain's
  sum-product. Prime only, superseded by CG.
- **B. Kerr, A. Mohammadi, "Points on polynomial curves in small boxes modulo an integer", arXiv:1803.10373, JNT 2020** [PDF].
  - Thm 3 (ANY q, f of degree d ≥ 2 with leading coefficient coprime to q, cube of side H):
    #{y ≡ f(x)} ≤ H^{1+2/(d(d+1))+o(1)} q^{−2/(d(d+1))} + H^{1/d+o(1)}.
  - Thm 4: y^2 ≡ cubic.
  - These are polynomial curves only; the hyperbola y ≡ μ x* is not covered. Their geometry-of-numbers transference is
    the right toolkit for composite q.
- **B. Kerr, "Solutions to polynomial congruences in well shaped sets", arXiv:1210.1623, Bull. Aust. Math. Soc. 88 (2013)**
  [PDF intro]. Composite m, arbitrary F, via a multidimensional Vinogradov mean value theorem. The bounds are of Shparlinski
  type (small savings in measure). Not expected to beat N^3 for the 4-variable congruence (x1+x2)x3x4 ≡ (x3+x4)x1x2 at side
  m^{1/2}; the theorem was not read.
- **J. Bourgain, "The sum-product theorem in Z_q with q arbitrary", J. Anal. Math. 106 (2008)**; **J. Bourgain, M.-C. Chang,
  C. R. Acad. Sci. 339 (2004)** [abs].
  - |A+A| + |A·A| > |A|^{1+ε} for |A| < q^{1−δ} unless A has a large intersection with a translate of a subring.
  - Exponential sums over multiplicative subgroups for q with few large prime factors.
  - Qualitative ε only. For m = p1p2 with |A| ≈ m^{1/2} ≈ p_i the subring (ideal) obstruction is live. No usable J_4
    exponent.
- **2601.15448 v4 (bilinear sums with modular square roots)** [html via fetch]. Thm 4 gives the additive energy of modular
  SQUARE ROOTS for arbitrary composite moduli. It says nothing about inverses (t = −1). Its method (also
  Kerr–Shkredov–Shparlinski–Zaharescu, arXiv:2103.09405, composite q via geometry of numbers) is a pointer for (ii).
- **V. Blomer, M. S. Risager, I. E. Shparlinski, arXiv:2411.17823, JLMS 2025** [PDF intro]. Discrepancy of modular inverses
  ab ≡ 1 (mod c) averaged over c ≤ X, via triple sums of Kloosterman sums. It averages over the modulus, so it does not apply.
- **N. Bag, I. E. Shparlinski, arXiv:2111.07311** [PDF §6]. Mixed energy #{xm ≡ yn (p)}, prime only (Banks–Shparlinski).
- **M. Z. Garaev, I. E. Shparlinski, arXiv:2304.07953** [abs]. Modular inverses from short intervals, prime only.
- **Korolev (Sb. Math. 2016, "Karatsuba's method for estimating Kloosterman sums")** [abs via search]. New Karatsuba-method
  bounds for PRIME moduli under constraints on the number of summands. No composite J_{2k} improvement found.
- **Item 4 (Σ e(a x*y*/m) with m = p1p2 balanced, below √m, without energy):**
  - Nothing found. Blomer–Pascadi 2607.24311 and Pascadi 2511.08445 treat Kloosterman SUMS S(am,n;c) with intervals in m, n.
  - Poisson in y turns fractions into S(a x*, h; m) with the argument over inverses of an interval, not an interval.
  - Poisson in both variables gives Kl_3 bilinear sums at dual lengths > √m, for which no composite bound strong enough is
    known.
  - The route of §2 makes item 4 unnecessary at N ≈ m^{1/2}.

## Summary
- (i) YES: J_4(N) ≪ m^{o(1)}(N^2 + N^{7/2}m^{−1/2}) for any m. This is the Cilleruelo–Garaev/Heath-Brown equal-shift
  hyperbola bound, whose proof transfers verbatim to composite m; the transfer is ours and not in print that we found. At
  N = m^{1/2} it gives N^{5/2}, and hence a saving (N1N2)^{−1/16} for bilinear Kloosterman fractions over initial intervals,
  for all m^{1/3} ≤ N_i ≤ m. The m^{1/2} window is closed for all squarefree (indeed all) moduli.
- (ii) NO: no bound J_6 ≪ N^{4−c} at N = m^{1/4} (or J_{2k} below N^{k+1} at m^{1/(2j)}) is known for composite m, nor for
  primes at those sizes. The windows at m^{1/(2j)}, j ≥ 2, remain.
- Balanced m = p1p2: no special result was found; (i) does not need it.

Sources:
- https://arxiv.org/abs/1007.1526 (Cilleruelo–Garaev)
- https://arxiv.org/abs/1211.4184 (Bourgain–Garaev, Izvestiya)
- https://arxiv.org/abs/1309.1124 (Bourgain–Garaev, Acta Arith.)
- https://arxiv.org/abs/1103.2879 (Shparlinski survey)
- https://arxiv.org/abs/1803.10373 (Kerr–Mohammadi)
- https://arxiv.org/abs/1210.1623 (Kerr)
- https://arxiv.org/abs/2411.17823 (Blomer–Risager–Shparlinski)
- https://arxiv.org/abs/2111.07311 (Bag–Shparlinski)
- https://arxiv.org/abs/2304.07953 (Garaev–Shparlinski)
- https://arxiv.org/html/2601.15448v4
- https://arxiv.org/abs/2103.09405 (Kerr–Shkredov–Shparlinski–Zaharescu)
- https://link.springer.com/article/10.1007/s11854-008-0044-2 (Bourgain 2008)
- https://www.sciencedirect.com/science/article/pii/S1631073X04004194 (Bourgain–Chang)
- https://www.mathnet.ru/eng/sm8648 (Korolev 2016)

## Literature round 7 (16 Sep 2026; side agent; the H^{1/3} band after reciprocity; verbatim; VERIFY BEFORE CITING)
# Report 4 (16 Sep 2026): roots of quadratic congruences twisted mod a small modulus, averaged over the modulus

Problem. Find a power saving in
  T = Σ_{x∼X} α_x Σ_{d∼Y} φ(d/Y) Σ_{r²≡D (d)} e(c·r·\bar d/x),
where
  - (d,x) = 1 and \bar d is the inverse of d mod x;
  - X ≈ Y^{1/2};
  - α_x is bilinear: x = n1n2, n_i ≈ Y^{1/4}, coefficients 1 and χ_D.

Verification tags: [PDF] = statement read in the PDF; [via X] = quoted from paper X, which I read; [abs] = abstract only;
[ours] = our reading or computation.

## VERDICT: PARTIAL, and NO for the problem as posed
No known result gives cancellation in T at X ≈ Y^{1/2}. What exists:
 (a) Single-modulus equidistribution of roots with both the modulus and the root in progressions (de la Bretèche–Drappeau,
     Lemmas 8.2–8.4). The progression modulus there DIVIDES the root modulus (d | q | mq), the errors are polynomial in
     the modulus, and the useful level is tiny: about x ≤ Y^{2/13}, by our computation.
 (b) Large sieves / sums of Kloosterman sums averaged over the LEVEL (Deshouillers–Iwaniec Thms 6–7; Iwaniec 1987 Thm 3 via
     Duke; de la Bretèche–Drappeau Lemma 8.3(3)). All are at the cusp ∞, i.e. for moduli d ≡ 0 (mod level), with scaling
     matrices independent of the level and (for DI Thm 6) coefficients independent of the level. Drappeau states explicitly
     that the DI "switch q and c" trick is specific to a = ∞ with level-independent scaling.
 Our twist e(c r \bar d/x) with (d,x) = 1 is a cusp-0 / principal-congruence (Γ(x)-type) condition. It is not covered by
 (b), and (a) is far too weak at X ≈ Y^{1/2}. No Bombieri–Vinogradov / Barban–Davenport–Halberstam theorem for roots of
 quadratic congruences, or for τ(n²+1) in progressions, with level beyond the square root was found.

---------------------------------------------------------------------------------------------------------------------------

## 1. R. de la Bretèche, S. Drappeau — Niveau de répartition des polynômes quadratiques et crible majorant pour les entiers friables. arXiv:1703.03197, JEMS 22 (2020) [PDF §5, §8]

### Lemma 8.2 (roots with modulus AND root in progressions)
Setup: (q,r,d) ∈ N³, (q,2Dr) = 1, d | q, λ mod d invertible, ω² ≡ D (mod d), M ≫ qd, f smooth. Count
  P_f = Σ over pairs (m,Ω) with (m,qr) = 1, m ≡ λ (mod d), Ω² ≡ D (mod mq), Ω ≡ ω (mod d),
        α ≤ Ω/(mq) < β, weighted by f(m/M).
Result:
  P_f = (β−α) M \hat f(0) C_D A(qr) ρ(q/(q,d^∞))/φ(d) + O((qrM)^ε d^{3/4} (qd)^{1/2−θ} M^{1/2+θ}).

### Lemma 8.3 (Weyl sums behind Lemma 8.2)
(8.5) For 1 ≤ |h| ≤ q√d:
  Σ_{(m,Ω)} f(m/M) e(hΩ/(mq)) ≪ |h|(qr)^ε + (rM)^ε d^{3/4} (qd,h)^θ (qd)^{1/2−θ} M^{1/2+θ}.
(8.6) is the h-averaged version.
(8.7) With d = 1, averaged over the level q ∈ (Q,2Q] and over h ∈ I ⊂ [H,2H]:
  (1/Q) Σ_q (1/H) Σ_h e(th) Σ f_q(m/M) e(hΩ/(mq)) ≪ H(Qr)^ε + (rM)^ε {M^{1/2} + H^{−1/2} Q^{1/2−θ} M^{1/2+θ}}.
  This uses DI's weighted large sieve over levels, [DI83] Theorem 7, to temper θ.
Remark (read): for d = 1 and θ ≤ 1/4 this recovers DFI95 (25) and Tóth (15).

### §8.1.2 Gauss correspondence — the "switching modulus" step (read)
Let Q_D = {AX² + 2BXY + CY² : B² − AC = D}. Then
  S = Σ_{Q∈Γ\Q_D} Σ_{σ∈Γ∞\Γ/Γ_Q} [P(σ)] f(C(σQ)/(qM)) e(h B(σQ)/C(σQ)),
with C(σQ) = Q(γ,δ) for σ = (α β; γ δ). The progression conditions become
  P(σ): C(σQ) ≡ λq (mod qd), B(σQ) ≡ ω (mod d),
i.e. conditions on σ modulo qd. This is the switch from the modulus C ≍ Y to the bottom row (γ,δ) ≍ Y^{1/2}.
Lemma 8.4: the relevant classes σ ∈ Γ0(qd)\Γ number O(dτ(q)); their cusps a ~ u/v satisfy v | q and v = O_Q(1); the
Kloosterman sums S_{∞a}(h,n;γ) live on moduli γ ∈ C(∞,a) = {w_a^{1/2} v m : (m, qd/v) = 1}, with w_a ≍ qd.

### Level of distribution for divisibility (not progressions)
Prop 8.1 / Thm 5.2: a mean square over moduli m ∼ M with bilinear b_n, giving level x^{1+25/178} (Thm 1.1).
The text records the history: Iwaniec 1978 got 1+1/15 for D = −4; Lemke Oliver 2012 extended this to general quadratics;
Hooley's R* would give 1+1/9; Selberg's conjecture would give 1+1/6.

### Assessment [ours]
- Put q = d = x (progression modulus x dividing the root modulus mx, M ≈ Y/x). Per class the main term is ≈ Y/x² and the
  error is ≈ x^{5/4−3θ} Y^{1/2+θ}, so a single class is nontrivial only for x < Y^{2/13} (θ = 0).
- Our case needs (d,x) = 1 and the twist \bar d mod x. That is formally q = 1 with a progression modulus ≠ 1, which Lemma
  8.2 excludes (d | q). The cusp-pair machinery of Lemma 8.4 looks like it should extend, but it is not stated.
- The only level average (8.7) is at d = 1 (no progression) and saves only in the θ-aspect.

## 2. Deshouillers–Iwaniec (Invent. Math. 70, 1982), Theorems 5–7: large sieve for exceptional forms, single level and averaged over the level
The original is a GDZ scan only and was not read. The statements below are Drappeau's reproductions, arXiv:1504.05549
(PLMS 2017), Lemmas 4.8–4.10, with his commentary [via Drappeau].
- Thm 5 analogue (single level q, any cusp a):
    E_{q,a}(Y,(a_n)) := Σ_{f∈B(q,χ), t_f∈iR} Y^{2|t_f|} |Σ_{N<n≤2N} a_n n^{1/2} ρ_{fa}(n)|²
      ≪ (1 + (μ(a)NY)^{1/2})(1 + (q0 μ(a)N)^{1/2+ε}) ||a||².
- Thm 6 analogue (averaged over q ≤ Q with q0 | q; cusp a = ∞; scaling matrices independent of q):
    Σ_q E_{q,∞}(Y,(a_n)) ≪ (QN)^ε (Q/q0 + N + NY^{1/2}) ||a||².
  So Y can go up to (Q/N)² at no cost. Drappeau: "Deshouillers and Iwaniec make use of the very nice idea that with the
  choice a = ∞ for each q, the roles of q and c can be swapped in the Kuznetsov formula … This switching technique is
  specific to the choice a = ∞ for all q, with scaling matrices independent of q."
- Thm 7 analogue (a_n = indicator of an interval): Σ_q E_{q,∞} ≪ (QN)^ε (Q/q0 + N + (NY)^{1/2}) N.
- Pascadi, arXiv:2511.08445 [PDF §1.3]: DI Thm 5's loss (q/N)^{2θ} is improved when q has a divisor d ≍ √q (Cor 1.6: factor
  q^{6θ_j/5}). The remark after it says that with averaging over levels q ≤ Q, d | q, d ≍ √Q, "the sequence (α_n) inside the
  large sieve may depend on q in this case, unlike in [DI, Theorem 6]".
- Blomer–Pascadi 2607.24311, Thm 1.6 (Report 1): level-uniform improvement of X in DI Thm 5.
Assessment [ours]:
- The level-averaged gains (Thms 6–7) are for moduli c ≡ 0 (mod level) at the cusp ∞, which corresponds to x | d. Our phase
  e(c r \bar d/x) with (d,x) = 1 is a condition at the cusp 0 of Γ0(x), or, including r mod x, a Γ(x)-type condition,
  whose scaling matrices depend on x.
- Conjugating Γ(x) by z ↦ xz lands in Γ0(x²) ∩ Γ1(x) at ∞, but with frequencies c/x that depend on the level. That is
  exactly the "coefficients depend on the level" situation DI Thm 6 excludes.
- Pascadi's composite-level variant (levels q = x², d = x ≍ √q) has the right shape, but it controls only the exceptional
  spectrum. Speculative pointer, not a tool.

## 3. Iwaniec, Invent. Math. 87 (1987), Theorem 3, and Duke, Invent. Math. 92 (1988), §5
Iwaniec's original was not accessible (GDZ scan); the statement below is as used by Duke [PDF].
- Levels 𝒬 = {pN : P < p ≤ 2P, p ∤ n}, p prime.
- Iwaniec's Thm 3 bounds Σ_{Q∈𝒬} |Σ_{c≡0 (Q)} c^{−1} K(n,n;c) J_{9/2}(4πn/c)|.
- Combined with Proskurin–Kuznetsov (half-integral weight) this gives
    n|ρ(n)|² ≪ λ^{(5−k)/2} ch(πt) [(n/P)^{3/2} + (nP)^{3/8} + n^{3/7}] n^ε,
  and with P = n^{1/7}, ρ(n) ≪ n^{−2/7+ε}.
Assessment: again cusp ∞ with moduli c ≡ 0 (mod Q) and prime-times-fixed levels. It is the template for "gain by averaging
  over the level", but not for a coprime twist. The exact form of Iwaniec's Thm 3 is unverified.

## 4. Counting integral points on quadrics / orbits in congruence classes uniformly in the modulus
- **A. Nevo, P. Sarnak, "Prime and almost prime integral points on principal homogeneous spaces", Acta Math. 205 (2010)** [PDF §3].
  Thm 3.2: #{w ∈ Γ(q)y : ||w|| ≤ T}/vol{||g|| ≤ T} = 1/[Γ:Γ(q)] + O_η(T^{−θ/(1+dim G)+η}), uniformly over all q and all
  cosets y. Here θ = a/(2 n_e(G,Γ)) comes from bounds towards Ramanujan.
  Assessment: the relative error has no q-loss but only a tiny power of T. The main term is ≍ 1/[Γ:Γ(q)] ≍ q^{−3}, so the
  level of distribution is q ≤ T^{small}. Useless at X ≈ Y^{1/2}.
- **J. Liu, P. Sarnak, "Integral points on quadrics in three variables whose coordinates have few prime factors", Israel J. Math. 178 (2010)**
  [abs + Sarnak's "Equidistribution and Primes" notes]. It gives a "sharp level of distribution" for F(x) = t with F an
  indefinite ANISOTROPIC ternary form, via spectral methods, with r0 ≤ 26. Our quadric r² − de = D is ISOTROPIC, so it is not
  covered; the exact level was not verified.
- **Gorodnik–Nevo (Compositio 2012)** [abs]. General uniform counting in congruence cosets; same limitation as Nevo–Sarnak.

## 5. Heegner points on the level-x spectrum with D fixed ("large sieve for Heegner points")
- **Michel–Ramakrishnan (2007); Feigon–Whitehouse (Duke 2009); P. D. Nelson, arXiv:1202.6313 (JNT 2013)** [abs].
  Exact ("stable") formulas for Σ_{f of level N} L(1/2, f × θ_χ)/⟨f,f⟩ with fixed imaginary quadratic θ_χ, for N large
  compared with |D|. Via Waldspurger/Gross–Zagier, this is an exact second moment over the level-N spectrum of Weyl sums
  over the Heegner points of discriminant D.
  Assessment: holomorphic forms (fixed weight), one level at a time, no averaging over N. It could supply the Heegner side
  of a Cauchy–Schwarz after spectrally expanding T_x on level x, but not the needed gain from averaging over x.
  Speculative.
- **Liu–Masri–Young 1206.3208, Humphries–Nordentoft 2211.05890** (Report 1): the level must be a small power of the
  discriminant, and our discriminant is fixed. Not applicable.

## 6. Other items checked
- **S. Baier, E. A. Molla, "A Bombieri–Vinogradov theorem for sectors in real quadratic number fields", arXiv:2509.03657** [abs].
  Primes/ideals in sectors, averaged over moduli. Different objects; the level was not stated in the abstract.
- **Bykovskii (1984)** [search only]. Spectral expansion for additive divisor / zeta functions; no progression result with a
  level found.
- **Lemke Oliver, Acta Arith. 151 (2012); Iwaniec, Invent. Math. 47 (1978)** [via dlB–D]. Divisibility levels for quadratic
  polynomials; the switching is the Gauss correspondence plus Hooley-type short Kloosterman/Salié sums (R*). No
  small-modulus progression averaging.
- **BV/BDH for τ(n²+1) or ρ_D in progressions n ≡ a (q) averaged over q beyond x^{1/2}:** nothing found beyond Blomer's
  IMRN 2008 and Templier–Tsimerman (Report 1), which are not progression averages.

## Ranked usefulness for T
1. **de la Bretèche–Drappeau, Lemmas 8.2–8.4.** The only explicit statement with roots in progressions (for the modulus and for
   the root) and the Gauss-correspondence switch to Γ0(qd) at general cusps. Useful for reproducing T_x per x at levels
   x ≤ Y^{small}, and as the skeleton for a cusp-0 version.
2. **DI Thms 6–7 (Drappeau's Lemmas 4.9–4.10), Iwaniec 1987 Thm 3 via Duke.** The only level-averaging mechanisms. They need
   cusp ∞, level-independent scaling and (Thm 6) level-independent coefficients. Our cusp-0 / Γ(x) twist violates all three.
3. **Pascadi 2511.08445, Thm 9.4 remark.** Level averaging over q = x² with d = x ≍ √q and q-dependent coefficients, but only
   for the exceptional spectrum.
4. **Stable averages (Michel–Ramakrishnan / Feigon–Whitehouse / Nelson).** Heegner-side second moment on a fixed level, D
   fixed. Speculative.

Sources:
- https://arxiv.org/abs/1703.03197 (de la Bretèche–Drappeau)
- https://arxiv.org/abs/1504.05549 (Drappeau)
- https://arxiv.org/abs/2511.08445 (Pascadi)
- https://arxiv.org/abs/2607.24311 (Blomer–Pascadi)
- https://www.math.ucla.edu/~wdduke/preprints/hyperbolic.pdf (Duke 1988)
- https://eudml.org/doc/143426 (Iwaniec 1987)
- https://eudml.org/doc/142975 (Deshouillers–Iwaniec 1982)
- https://web.math.princeton.edu/sarnak/NS-final-Oct-08.pdf (Nevo–Sarnak)
- https://link.springer.com/article/10.1007/s11856-010-0069-y (Liu–Sarnak)
- https://mathtube.org/sites/default/files/lecture-notes/Sarnak.pdf (Sarnak notes)
- https://arxiv.org/abs/1202.6313 (Nelson)
- https://arxiv.org/abs/2509.03657 (Baier–Molla)
- https://eudml.org/doc/279604 (Lemke Oliver)

## Literature round 8 (16 Sep 2026; side agent; the J6 obstruction at N ≈ m^{1/4}; verbatim; VERIFY BEFORE CITING)
# Report 5 (16 Sep 2026): J_6 of reciprocals of [1,N] at N ≈ m^{1/4} — is anything below N^4 known?

Target. For k = 3, N ≈ m^{1/4}: any bound J_6(N) ≪ m^{o(1)} N^{4−c}, c > 0 fixed, for any moduli (prime included).
Equivalently J_{2k}(N) below N^{3k−1}/m at N = m^{1/(2j)}, k = j+1.

Verification tags: [PDF] = statement read in the paper; [RU] = read in the Russian original; [abs] = abstract only.

## VERDICT: **NO** — for every modulus, prime or composite.
Nothing in the literature beats N^4 at N ≈ m^{1/4}, k = 3. Bourgain–Garaev Thm 1 is unimproved since 2014; every
subsequent "energy of reciprocals" paper either reproves its shape (function fields), or works only for k = 2, or
works only for N below p^{1/18}. The gap between what is proved (p^{1/18} ≈ p^{0.0556}) and what is needed
(p^{1/4} = p^{0.25}) is a factor 4.5 in the exponent, and there is a **structural reason** for it (§4).

Partial credit, and genuinely useful:
- The t = 0 (rational) case of the equivalent formulation is **completely solved**, with a power saving off the
  diagonal — Konyagin–Korolev (§3). So the obstruction is *entirely* the t ≠ 0 terms.
- A **weaker substitute for the Hölder step does exist and is free** — Korolev's paired system J_q(Y) ≪ Y^2 q^{o(1)}
  for every composite q and every Y ≤ q (§5.1). If the Hölder step can be arranged around the paired
  (additive-in-x *and* additive-in-x*) system rather than J_6, no new input is needed at all. This is the single
  most actionable item in this report.

---------------------------------------------------------------------------------------------------------------------

## 1. The benchmark and its exact arithmetic at N = m^{1/4}

### J. Bourgain, M. Z. Garaev, "Kloosterman sums in residue rings", Acta Arith. 164 (2014), arXiv:1309.1124 [PDF]
Thm 1 (**any modulus m**, I = [1,N]):
  J_{2k} < (2k)^{90k^3}(log N)^{4k^2}(N^{2k−1}/m + 1)N^k.
At k = 3, N = m^{1/4}: N^{2k−1}/m = N^5/N^4 = N, so both terms are equal and J_6 < N^{4+o(1)}. Exactly the obstruction.
Thm 5 (any m): max_{(a,m)=1} |Σ_{n≤N} e_m(an*)| < (log log m)^{O(1)}(log m)^{−1/2} N for N > m^c. (See §5.3.)
**Cor 1 names our barrier in print**: the bilinear bound of Thm 3 is nontrivial "unless both N_1, N_2 are within
m^ε-ratio of an element of {m^{1/(2l)}, l ∈ Z_+}". The exceptional set of that corollary *is* the set of lengths at
which J_{2k} degenerates. So BG themselves flag m^{1/4}, m^{1/6}, … as the unreachable lengths.

### J. Bourgain, M. Z. Garaev, Izv. Math. 78 (2014), arXiv:1211.4184 — **prime p only** [PDF]
| statement | bound | range | at N = p^{1/4}, k = 3 |
|---|---|---|---|
| Thm 1 (arbitrary interval I) | J_{2k} < \|I\|^{2k²/(k+1)+o(1)} + \|I\|^{2k+o(1)}/p | all \|I\| | k=3: N^{4.5} + N^2 — **worse than N^4** |
| Thm 2 (ternary, fixed λ ∉ I^{−1}∪{0}) | J < \|I\|^{2/3+o(1)} | \|I\| < p^{3/46} ≈ p^{0.0652} | out of range |
| Thm 3 (**exactly our J_6**) | J_6 < \|I\|^{3+o(1)} | \|I\| < p^{1/18} ≈ p^{0.0556} | out of range |
| Thm 4 | J_{2k} < \|I\|^{k+o(1)} | \|I\| < p^{c/k²}, c = 1/4; k=3: p^{1/36} | out of range |
| Thm 5 | = Acta Arith. Thm 1, for p | all N | N^4 |

So even for primes, the best available at p^{1/4} is min(N^{4.5}+N^2, N^4) = N^4. The optimal bound N^{3+o(1)} is known
only up to p^{1/18}. The three small exponents 3/46, 1/18, 1/36 are exactly as the brief anticipated.

### No improvement exists — citation sweep
Full citation lists of both papers (Semantic Scholar, 21 and 78 citing works) were scanned. Every citing item that
touches energy of reciprocals either (a) is k = 2, (b) reproduces BG's shape in another setting, or (c) uses BG as a
black box. In particular:
- **C. Bagshaw, "Lattices in function fields and applications", arXiv:2304.05009, Mathematika 2025** [PDF]. Gives the
  function field version of BG: E^{inv}_{F,k}(m) ≤ q^{km+o(m)} + q^{m(3k−1)−r+o(m)} — *identical shape* (N^k + N^{3k−1}/m),
  no gain. Its genuine improvements (Thms 2.1, 2.2) are for polynomial curves y = f(x), not the hyperbola.
- **C. Bagshaw, I. E. Shparlinski, arXiv:2112.02257** [PDF]. Thm 2.2: E^{inv}_{q,r}(m) ≤ (q^{(7m−r)/2} + q^{2m})q^{o(m)} —
  the function field analogue of Heath-Brown's **k = 2** bound. Nothing for k ≥ 3.
- **I. E. Shparlinski, A. Zumalacárregui, "Sums of inverses in thin sets of finite fields", arXiv:1611.07647** [PDF].
  Thm 1.1: N_k(γ,m,ψ) ≤ q^{(k+o(1))m} — optimal, but only for m < n/(4k²−2k), i.e. the F_{q^n} analogue of BG Thm 4's
  p^{1/(4k²)} range. For k = 3 that is dimension < n/30. Out of range, and it is a *lower*-bound-for-sumsets paper.
- **A. Mohammadi, arXiv:2608.01203 (Aug 2026)** [PDF]. Boxes in F_{q}, q = p^n: bilinear Kloosterman bound nontrivial for
  |B_1||B_2| ≥ q^{1/2+ε}; Cor 1 gives |kB^{−1}| ≥ p^{−δ}min{|B|²,q} for some k = k(δ). Qualitative sumset expansion, no
  energy exponent, and the range is above the square root.
- **Yao Zhi, arXiv:2608.15458 (Aug 2026)** [PDF]. Asymptotics for Σ m_i x_i^{−s} ≡ λ with m_i in arbitrary sets, x_i in
  intervals; five terms need N > p^{14/29+ε}, six terms N > p^{8/17+ε}, α_r → 1/3 + 4/(9√r). The main input is a
  *centered fourth moment* (k = 2). Far above p^{1/4} and not an energy bound for k ≥ 3.
- **Garaev–Pardo–Shparlinski, arXiv:2410.03991** [abs]; **Garaev–Shparlinski, arXiv:2304.07953** (Mathematika 2023,
  *lower* bounds / omega-results for exponential sums with inverses) [abs]; **Shkredov, arXiv:1802.09066** [PDF, grep] —
  none contains an energy bound for reciprocals of an interval for k ≥ 3.
- **Shkredov, "On some multiplicative questions" / higher-energy papers**: the higher energies E_k there are of the
  *Schoen–Shkredov* type (a_1−a_2 = … = a_{2k−1}−a_{2k}) for arbitrary sets, not the 2k-fold additive energy of I^{−1}.
  No statement about modular inverses of an interval was found.
- **Murphy–Petridis–Roche-Newton–Rudnev–Shkredov, Macourt, Kerr**: no energy-of-I^{−1} result for k ≥ 3 located.
  Kerr–Mohammadi (arXiv:1803.10373) and Kerr (arXiv:1210.1623) cover polynomial curves/congruences, not xy ≡ λ.

**Answer to question 1: no. Not for any moduli, prime or composite, at N ≈ m^{1/4}, k ≥ 3.**

## 2. What breaks, and exactly where (answer to question 4)

### 2a. BG Acta Arith., §4, the Cauchy–Schwarz at (3) — the composite-modulus bottleneck [PDF, proof read]
The proof splits λ by the successive minima of Γ_λ = {(u,v): λu ≡ v (mod m)} against D = {|u| ≤ N^k, |v| ≤ kN^{k−1}}.
- **Case 2** (degenerate, µ_2 > 1) collapses to the *rational* equation 1/x_1+…+1/x_k = 1/x_{k+1}+…+1/x_{2k} and is
  bounded by Karatsuba's Lemma 3 by N^{k+o(1)}. This case is **already optimal** and cannot be improved (§3).
- **Case 1** (µ_2 ≤ 1) gives |Γ_λ ∩ D| ≤ 30kN^{2k−1}/m, and then inequality (3) applies Cauchy–Schwarz:
    Σ_{λ∈Ω'} |J(λ)|² ≤ (max_λ |Γ_λ ∩ D|) · #{x_1…x_k = y_1…y_k, Σ_i ∏_{j≠i}x_j = Σ_i ∏_{j≠i}y_j}
  and the second factor is again Karatsuba's Lemma 3 = N^{k+o(1)}. Product: N^{3k−1+o(1)}/m.
**This single Cauchy–Schwarz is the whole loss.** At k = 3, N = m^{1/4}: vol(D) = N^5 = m^{5/4}, so a *typical* λ has
|Γ_λ ∩ D| ≈ N^5/m = N^{... } = m^{1/4} / … ≈ 1 on average, while the *maximum* is ≈ N. Step (3) charges every λ the
maximum. To get N^{4−c} one needs a genuine second-moment bound for Σ_{λ∈Ω'}|J(λ)|² that does not decouple —
equivalently, to count the integer solutions of
  (x_2x_3+x_1x_3+x_1x_2)·y_1y_2y_3 − (y_2y_3+y_1y_3+y_1y_2)·x_1x_2x_3 = m·t,   x_i, y_i ≤ N,
summed over t ≠ 0, |t| ≪ N^5/m ≈ N, beating the trivial "max × diagonal".

### 2b. BG Izvestiya, Lemma 13 — why the prime result stops at p^{1/18} [PDF, proof read]
Thm 3 (J_6 ≪ N^{3+o(1)}) rests on Lemma 13, which requires N < 0.1 p^{1/18} J^{2/9} (J = #{x^{−1}+y^{−1}+z^{−1} ≡ λ});
the binding case is small J (≈ N^ε), giving N < p^{1/18}. Lemma 13 runs Heath-Brown's lattice argument in **three**
dimensions: Γ = {(u,v,w): (a²−2aλ^{−1})u + (a−λ^{−1})v + w ≡ 0 (mod p)} against D = {|u| ≤ 3N, |v| ≤ 3N², |w| ≤ N³}.
**vol(D) = N^6.** The argument needs the successive minima to be controlled, which requires N^6 ≲ p, i.e. **N ≲ p^{1/6}**.
At N = p^{1/4} one has N^6 = p^{3/2} ≫ p and D ∩ Γ carries ≈ p^{1/2} points: the method returns nothing at all, with a
factor-of-1.5 margin in the exponent. So p^{1/6} is a hard ceiling for this technique and p^{1/4} is beyond it.
This, not a numerical inefficiency, is why 1/18 has not been pushed to 1/4.
(The k = 2 case is easy by contrast because the lattice is 2-dimensional: vol = N^3, ceiling N ≲ p^{1/3} — which is why
Heath-Brown/Cilleruelo–Garaev/BG Cor 4 all succeed there, cf. Report 3.)

## 3. Question 2: the equivalent formulation. t = 0 is SOLVED; t ≠ 0 is untouched

### S. V. Konyagin, M. A. Korolev, "On a symmetric Diophantine equation with reciprocals", Trudy MIAN 294 (2016) 76–86 = Proc. Steklov Inst. Math. 294 (2016) 67–77 [RU, full text read: mathnet tm3732]
For I_r(N) = #{1/x_1+…+1/x_r = 1/x_{r+1}+…+1/x_{2r}, 1 ≤ x_i ≤ N} (this is *exactly* the t = 0 case of the brief):
- **Thm 1**: the number J_r(N) of **irreducible** solutions (no x_1,…,x_r occurs among x_{r+1},…,x_{2r}) satisfies
    J_r(N) < N^{r−δ(r)}((15/16)ln N + 30r²)^{10r³},  δ(r) = r/(2(2r−1)).
  For r = 3: **J_3(N) ≪ N^{2.7+o(1)}** — a genuine power saving off the diagonal.
- **Thm 2**: an asymptotic formula for I_r(N) with remainder uniform in all parameters; the main term is **r! N^r**,
  contributed by the solutions where (x_{r+1},…,x_{2r}) is a permutation of (x_1,…,x_r). For r = 2 the earlier bound
  quoted there is I_2(N) = 2N² + O(N (ln N)^7).
- Applications given in §3 are precisely to short Kloosterman sums Σ_{x≤N} e_p(ax*) with N ≤ p^c.

### S. V. Konyagin, M. A. Korolev, "Irreducible solutions of an equation involving reciprocals", Mat. Sb. 208:12 (2017) 107–123 = Sb. Math. 208 (2017) 1818–1834 [RU, full text read: mathnet sm8801]
**Thm 1** sharpens the above for r ≥ 3:
  J_r(N) < N^{r−r/(2(2r−1))} e^{(3r)³}((1/r)ln N + 9)^{10r²} exp(26r^{3/2}√(ln N)/ln(r ln N)).
Consequences stated there: **J_r(N) = o(N^{r−1/4})** for every fixed r ≥ 3, and J_r(N) ≤ N^{r−1/5} uniformly for
3 ≤ r ≤ (1/16)(ln N)^{1/3}.

*Caveat on δ(r).* The displayed exponent came through the PDF text layer garbled. δ(r) = r/(2(2r−1)) is reconstructed
from the papers' own worked arithmetic in sm8801 (they deduce N^{r−1/4}·N^{0.007+0.009+0.032} < N^{r−1/5}, which forces
δ(3) = 3/10, and δ(r) = r/(2(2r−1)) ↓ 1/4 as r → ∞, matching their claim "o(N^{r−1/4}) for every fixed r ≥ 3").
Read δ(r) off the printed formula before quoting it in a paper; the qualitative point (power saving off the diagonal,
r = 3 giving ≈ N^{2.7}) is not in doubt.

**So for the rational (t = 0) question in the brief the true count is 3!·N³(1+o(1)) = 6N³(1+o(1)), with non-diagonal
solutions ≪ N^{2.7+o(1)}.** This is a complete and sharp answer, and it is better than Karatsuba's Lemma 3 (the lemma
BG actually use: ≤ (2k)^{80k³}(log N)^{4k²}N^k), which only gives N^{3+o(1)} with no saving off the diagonal.

### t ≠ 0: nothing
No literature was found counting solutions of F(x,y) = n uniformly in n for this sextic (F = e_2(x)y_1y_2y_3 −
e_2(y)x_1x_2x_3), nor for the associated inequality version. The nearest relative, **M. A. Korolev, "On a Diophantine
inequality with reciprocals", Trudy MIAN 299 (2017) 144–154** [abs], is a different problem (a lower bound for
#{n ≤ N : α ≤ {(a n̄ + bn)/q} < β}), not an archimedean t ≠ 0 count. The Vaughan–Wooley paucity literature
(e.g. arXiv:2211.10500) covers Vinogradov-type symmetric systems, not reciprocals.
Note the heuristic is favourable — for fixed t ≠ 0 one expects ≈ N^6/N^5 = N solutions, so ≈ N·N = N² total against a
budget of N^3 — but **uniformity in n is exactly the hard part** (divisor-type spikes), and this is the same
difficulty as §2a in different clothing.

## 4. Question 3: weaker substitutes in the Hölder step

### 4.1 **The paired system — a real, free substitute** [PDF: Korolev slides, "5. New estimates"]
For the inhomogeneous sum S(X,Y) = ΣΣ e_q(a x*y* + b·…) Korolev uses
  |S(X,Y)|^8 ≪ (XY)^8 · qY · I_2(X)·J_2(Y)/(XY)^4,
where J_2(Y) counts the **paired** system
  y_1* + y_2* ≡ y_3* + y_4* (mod q)  AND  y_1 + y_2 ≡ y_3 + y_4 (mod q),  Y < y_j ≤ 2Y.
**Lemma (Korolev, 2018): for any composite q and any Y ≤ q,  J_q(Y) ≪ 2^{ω(q)}τ_3(q)Y² ≪ Y² q^{o(1)}.**
This is essentially optimal (the diagonal is Y²) and — crucially — **holds in the entire range Y ≤ q, with no
threshold**, because the two equations together are rigid. If the Hölder/Cauchy arrangement in the target application
can be set up so that the second factor is this paired system rather than J_6, **the obstruction disappears without any
new input**. This is the most promising line found. (Caveat: 2^{ω(q)}τ_3(q) is q^{o(1)} but for squarefree m with many
prime factors it is (log m)^{O(1)}-sized — harmless.)

### 4.2 Σ_λ J_2(λ)J_4(λ), and J_6 with one structured variable
No literature. Searched for mixed/weighted energies of I^{−1}, for J_6 with a variable restricted to Farey or
convergent-denominator sets, and for "Kloosterman fraction" energies at N ≈ m^{1/4}: nothing that separates the
variables in this way. The Bettin–Chandee trilinear Kloosterman fraction line (arXiv:1502.00769, and arXiv:2604.25177,
"Trilinear Kloosterman fractions I", 2026) is structurally different — arbitrary coefficients on all three variables,
with the modulus itself a variable — and does not yield a J_6 bound for a fixed modulus.

### 4.3 Bounds at N ≈ m^{1/4} obtained *without* an energy input
- **BG Acta Arith. Thm 5** [PDF]: for **arbitrary m** and any N > m^c,
    max_{(a,m)=1} |Σ_{n≤N} e_m(an*)| < (log log m)^{O(1)}(log m)^{−1/2} · N,
  proved from Bourgain's multilinear sum-product Lemma 1 (k = k(γ) large), **not** from J_{2k}. This *does* cover
  N = m^{1/4} for squarefree m — but it is a **log saving only**, and it is a *linear* (one-variable) sum.
- **Korolev (Sb. Math. 207 (2016) 1142–1158; slides Thm M.K. 2016)** [PDF slides]: for d = rad(q), c_1 = 900,
  c_2 = 160^{−4}, and max(d^{15}, e^{c_1(log q)^{2/3}}) ≤ N ≤ √q,
    |Σ_{c<n≤c+N} e_q(an* + bn)| ≤ N exp(−c_2 (log N)³/(log q)²),
  which at N = q^{1/4} is a power saving q^{−c_2/64} (minuscule but genuine). **Fatal caveat for the present purpose:
  the hypothesis rad(q)^{15} ≤ N makes this a *powerful-modulus* theorem — it is vacuous for squarefree m**, where
  rad(m) = m.
- **Korolev Thms 2–4 (2017–18)** [PDF slides], arbitrary composite q, sums with Λ(n): nontrivial only for
  N ≥ q^{5/8} (b = 0) or N ≥ q^{3/4} (b ≠ 0). Nothing near q^{1/4}.
- **Bourgain (2005) / Baker (2012)**: N ≥ q^{1/2+ε}. Nothing near q^{1/4}.

## 5. Assessment: how hard is this?

**Hard, and it is a recognised barrier rather than an oversight.** Three independent indications:

1. *The technique has a computable ceiling.* The only known route to optimal J_{2k} bounds for reciprocals is
   Heath-Brown's lattice/geometry-of-numbers argument. For k = 3 it lives in dimension 3 with a body of volume N^6,
   so it is confined to N ≲ p^{1/6}; the published range p^{1/18} is a lossy version of that ceiling. N = m^{1/4} sits
   beyond the ceiling by a factor 1.5 in the exponent, so this is not a matter of optimising constants — a different
   idea is required. For k = 2 the same method has ceiling p^{1/3} > p^{1/2}·(1/2)… which is why k = 2 is solved at
   every length of interest and k = 3 is solved at none.
2. *Everyone who needs it routes around it.* BG's own Cor 1 excises the lengths m^{1/(2l)}; Karatsuba's original
   mean-value theorem is stated exactly in the regime X^{2k−1} ≪ q where the diagonal dominates; Korolev's composite
   results all live above q^{5/8}; the 2026 papers (Yao Zhi, Mohammadi) work above the square root. No paper in
   30 years (Karatsuba 1995 → BG 2014 → 2026) claims the sub-square-root, sub-p^{1/6} regime for k ≥ 3.
3. *The t = 0 shadow is sharp but does not transfer.* Konyagin–Korolev prove the rational equation has count
   r!N^r(1 + o(1)) with power-saving paucity — i.e. the conjectured truth J_6 ≈ N^3 is *correct and provable* in the
   archimedean limit. The entire difficulty is the m·t ≠ 0 terms, i.e. a **uniform-in-n count for a singular sextic in
   6 variables in a box of side N with N^6 ≫ m**. That is the "variety in a small box beyond the completion range"
   problem, which is the same wall as the modular-hyperbola-in-short-boxes problem, one dimension up.

**Which barrier is it?** Not the Paley-graph/sum-product barrier: sum-product methods (Bourgain's Lemma 1) *do* apply
here and give the log-saving Thm 5 for all N > m^c; they are simply too weak to produce a power. It is precisely the
**modular-hyperbola-in-small-boxes barrier in dimension 3**: the k = 2 case is the classical
#{xy ≡ λ (mod m), x,y ∈ box}, solved by Heath-Brown; our k = 3 case is the 3-dimensional analogue
#{xyz ≡ λ} / the associated symmetric-function lattice, for which BG's Lemma 11 itself needs N < p^{1/8}. Any proof of
J_6 ≪ N^{4−c} at m^{1/4} would very likely first give new results on points of the 3-dimensional modular hyperbola in
boxes past the geometry-of-numbers range — a well-known open problem (Shparlinski's survey, arXiv:1103.2879, lists
the composite/higher-dimensional cases as open).

**Recommendation.** Do not wait on a J_6 improvement. Restructure the Hölder step around Korolev's paired system
(§4.1), which is unconditional, optimal, and valid for every composite modulus at every length.

## Sources
- https://arxiv.org/abs/1309.1124 — Bourgain–Garaev, Acta Arith. 164 (2014) [Thm 1, Thm 5, Cor 1, §4 proof, Lemma 3]
- https://arxiv.org/abs/1211.4184 — Bourgain–Garaev, Izv. Math. 78 (2014) [Thms 1–6, Lemmas 10–13, §9.3]
- http://mi.mathnet.ru/eng/tm3732 — Konyagin–Korolev, Proc. Steklov Inst. Math. 294 (2016) 67–77
- https://www.mathnet.ru/eng/sm8801 — Konyagin–Korolev, Sb. Math. 208 (2017) 1818–1834
- http://www.mathnet.ru/eng/tm3847 — Korolev, Proc. Steklov Inst. Math. 299 (2017) 132–142
- https://www.mathnet.ru/eng/sm8648 — Korolev, Sb. Math. 207 (2016) 1142–1158
- https://hkumath.hku.hk/~imr/event/SRC/files/slides_Maxim_Korolev.pdf — Korolev, survey slides (paired-system lemma)
- https://arxiv.org/abs/2304.05009 — Bagshaw, Mathematika 2025 (function field BG analogue)
- https://arxiv.org/abs/2112.02257 — Bagshaw–Shparlinski (function field, k = 2)
- https://arxiv.org/abs/1611.07647 — Shparlinski–Zumalacárregui
- https://arxiv.org/abs/2608.01203 — Mohammadi (2026)
- https://arxiv.org/abs/2608.15458 — Yao Zhi (2026)
- https://arxiv.org/abs/2410.03991 — Garaev–Pardo–Shparlinski
- https://arxiv.org/abs/2304.07953 — Garaev–Shparlinski, Mathematika 2023
- https://arxiv.org/abs/1103.2879 — Shparlinski, "Modular hyperbolas"
- https://arxiv.org/abs/1502.00769 , https://arxiv.org/abs/2604.25177 — Bettin–Chandee; trilinear Kloosterman fractions
