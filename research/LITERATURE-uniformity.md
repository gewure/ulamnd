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
