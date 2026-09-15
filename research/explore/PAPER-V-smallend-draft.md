# Paper V — small end (Theorem S) working draft (16 Sep 2026). NOT READ. Statements + dependency map; proofs cited from PROOFS-uniform.md where they exist.

## Target theorem (S)
Let f be as in paper III with discriminant D < 0. For every c > 0 there is δ = δ(c) > 0 with
    Σ_{u ≤ H^{1/3−c}} w(u) 𝒫_u(H/u) = O(H^{1−δ}),
[FIRST VERSION: restricted to u with (u, 2D) = 1; the special primes p | (u, D) and p = 2 are listed below as open items.]

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
 (O1) p | (u, D): content of the family forms; GM Prop 4.1's gcd step; local counts at p | h. (O2) p = 2 (D = −4 with even u; local counts mod 2^k).
 (O3) Stabiliser weights |Γ_z| in the functional (factor ≤ 3). (O4) GM Theorem 8.1's hypotheses for F_L: f ∈ C^{10}_δ(X, Y) with δ^{−O(1)} = Y^{O(η′)}; X/Y > δ.
 (O5) The (E, M) level structure q₀ = lcm(e, m²) inside GM Lemma 3.1 (non-squarefree levels) and in S6's resultant step (extends: common root mod p^k ⇒ p^k | Res).
 (O6) Writing S1 with explicit exponents (δ, η, η′, δ′).
