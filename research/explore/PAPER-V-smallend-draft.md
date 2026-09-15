# Paper V — small end (Theorem S) working draft (16 Sep 2026). NOT READ. Statements + dependency map; proofs cited from PROOFS-uniform.md where they exist.

## Target theorem (S)
Let f be as in paper III with discriminant D < 0. For every c > 0 there is δ = δ(c) > 0 with
    Σ_{u ≤ H^{1/3−c}} w(u) 𝒫_u(H/u) = O(H^{1−δ}),
[w is supported on squarefree u; p = 2 and p | (u, D) cost O_D(1) by PROOFS §29 (sketch): for p | (u, D) use (a, h) = (pu′², |D|/p); for t² + 1 use (a, h) = ((u/2)², 1).]

## Structure (dependencies)
S1 (conversion, PROOFS §26(1), §27). For u ≤ Y^{1/2−2δ} (Y = H/u): 𝒫_u(Y) = Σ over window moduli k ∈ (Y^{1−δ}, Y^{1+η}] and window boxes |ℓ| ∼ L ≥ Y^{1−3δ} of
    (1/k)λμ²(k)·½[Σ_{ℓ∈Z, k | u²ℓ² + |D|} T_L(ℓ) − ρ(k)∫T_L/k] + O(Y^{1−δ′}),
   T_L the smooth dyadic pieces of the tent (smoothed at scale Δ = Y^{1−η′} at ℓ = ±Y); small moduli by the exact Cesàro progression identity, large by paper III Lemma tail,
   small boxes trivially ((Y/K)L H^ε). λμ² = Σ_{e|k, m²|k} κ(e)μ(m); blocks (E, M), M ≤ Y^{η} (tail m > Y^η trivial, PROOFS §25).
S2 (parametrisation). GM Lemma 3.1 with a = u², h = |D|: the counting sum over k ≡ 0 (mod q₀), q₀ = lcm(e, m²), equals ⟨I|Δ_{u²q₀}F|α_{q₀,a,h}⟩ (GM §5), F built from ψ₁(k/K), T_L;
   skew X/Y ≍ L·u·|D|^{−1/2}; x-range R = L/K.
S3 (GM Theorem 8.1, kernel paper 2505.00489) with Z₀Z₁Z₂ ≥ Lu + 1, Cauchy–Schwarz over the levels in a block (E, M): bound
   ≪ H^{o(1)}(Lu)^{1/2}Z₀^θ (Σ_{levels} K₁)^{1/2}(Σ_{levels} K₂)^{1/2}.
S4 (K₁, PROOFS §22 (G1), §25): K₁(q; Z, R) ≪ H^{o(1)}(1 + R + 1/(qR) + Z/q) [GM kernel paper §1.2 Example]; summed over the levels u²q₀: ≪ H^{o(1)}Y^{O(η)}(EM + Z₁/u² + u^{−2}).
S5 (K₂ diagonal, PROOFS §17 Step 3, §22 (G2), §25): #Γ₀(u²q₀)-orbits of the family, weighted ≍ ∏_{p^k∥u} p^{k−1}(p − χ_{−|D|}(p))·ρ(q₀) ≍ u·ρ(q₀); summed ≪ H^{o(1)}uEM.
S6 (K₂ off-diagonal, PROOFS §16 FOLLOW-UP, §17, §21 (fixed Step 4), §22 (G2), §25): summed over the levels ≪ H^{o(1)}(1 + Z₂) UNIFORMLY IN u
   (undilation to Γ₀⁰(u), lift to level one, local count ≤ 2^{ω(u)}g(N), divisor bound over levels via Res = u⁴(N² − 4h²), Σ_N N^{−1/2}g(N) ≪ H^{o(1)}M_N^{1/2} with Rankin).
S7 (exponents, PROOFS §16 (Hh), §21 R6): per block (E, M): (X/(EM))·(u²E²M²/X)^{1/2−θ}·Y^{O(η)} against the block's trivial size X/(EM) (X = L); blocks with EM ≥ X^{1/2}/u
   trivially ≪ X^{1/2}u; total ≪ H^{o(1)}Y^{O(η)}(X^{1/2+θ}u^{1−2θ} + X^{1/2}u) per box — nontrivial iff u < X^{1/2}; with θ = 7/64 (Kim–Sarnak, uniform over congruence
   subgroups) and u ≤ H^{1/3−c}: saving H^{−c′(c)}.
S8 (summation over boxes, moduli blocks and u): O(log^C H) boxes; Σ_{u ≤ H^{1/3−c}}|w(u)|·(H/u)^{1−c″} ≪ H^{1−c″/2}.

## Open items before a reading
 (O1), (O2), (O3): sketched in PROOFS §29 (bounded costs); to be checked in the reading (numerics for D = −3, u = 3u′). (O4) GM Theorem 8.1's hypotheses for F_L: f ∈ C^{10}_δ(X, Y) with δ^{−O(1)} = Y^{O(η′)}; X/Y > δ.
 (O5) The (E, M) level structure q₀ = lcm(e, m²) inside GM Lemma 3.1 (non-squarefree levels) and in S6's resultant step (extends: common root mod p^k ⇒ p^k | Res).
 (O6) Writing S1 with explicit exponents (δ, η, η′, δ′).

## O5 (non-squarefree levels q₀ = lcm(e, m²)) — sketch
GM Lemma 3.1 has no squarefreeness assumption on d (q = ad, gcd(a, h) = 1). In S5 the diagonal at level u²q₀ is c_d(u)·ρ*(q₀) with ρ*(q₀) the number of projective roots of
Q_z mod q₀ — ≤ 2^{ω(q₀)}·∏ p^{⌊v_p(disc)/2⌋} = 2^{ω(q₀)} for p ∤ ah (disc −4ah a unit at such p). In S6 the resultant step extends verbatim: a common projective root mod p^k
of Q_{g₁}, Q_{g₂} forces p^k | Res = ⟨g₁,g₂⟩² − 4 det g₁ det g₂ (x³Res, y³Res ∈ (Q₁, Q₂)), and each form has ≤ 2 roots mod p^k by Hensel (p ∤ ah); so
Σ_{q₀ ≤ EM², q₀ ∈ levels}∏_{p^k∥q₀}|R_{p^k}(g₁) ∩ R_{p^k}(g₂)| ≤ τ₃(Res)·τ(Res) ≪ H^{o(1)} (checked for p^k by the reader of §21).
## O6 (explicit exponents) — first pass
Parameters: δ (small moduli cut), η (large moduli Y^{1+η}; μ²-cut M = Y^η), η′ (tent smoothing Δ = Y^{1−η′}), boxes L ≥ Y^{1−3δ}. Losses: small moduli Y^{1−δ}H^ε; small boxes
Y^{1−2δ}H^ε; m > M tail Y^{1−η}; kink smoothing Δ²Y^{δ−1}H^ε = Y^{1−2η′+δ}H^ε; GM δ^{−O(1)} = Y^{O(η′)}; K₁'s Y^{O(η)}. Gain per window box: GM bound (Y/K)·L^{1/2}u·(u²E²M²/L)^{…}
— from S7 the box total is ≪ H^{o(1)}Y^{O(η+η′)}(L^{1/2+θ}u^{1−2θ} + L^{1/2}u)·(Y/K)·(K/L)… normalised to the box's trivial size (Y/K)L: saving (u/L^{1/2})^{min(1, 1−2θ)}·Y^{O(η+η′)}
≤ (u²/Y^{1−3δ})^{(1−2θ)/2}Y^{O(η+η′)}. For u ≤ H^{1/3−c}: u²/Y ≤ H^{−3c+O(c²)}·…, saving H^{−(3c/2)(1−2θ)(1−O(c))+O(η+η′+δ)}. Choose δ = η = η′ = c/100: δ_S(c) ≍ c(1−2θ)
with θ = 7/64. [To be redone carefully in the write-up, including the E, M block trivial sizes (KNOWLEDGE F48).]
