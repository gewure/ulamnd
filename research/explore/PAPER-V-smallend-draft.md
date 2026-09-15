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

## REVISION 1 (16 Sep, after the reading — PROOFS §33). The following supersede the text above.
S1: the Cesàro progression error O(k) holds for the SYMMETRIC root sum (pair x ↔ k − x), not per residue. The m > M tail must be removed BEFORE the tent decomposition. The cuts at
 k = Y^{1−δ}, Y^{1+η} are smooth (bottom: per-k identity; top: partial summation against Lemma tail). Moduli: insert Σ_{j|(k, rad 2D)}μ(j) for the admissibility (split, coprime to 2D)
 and run at levels a·lcm(j, e, m²); at primes p | h use the trivial local factor p + 1 instead of the resultant/Hensel bound.
S2: NOT an identity with ⟨I|ΔF|α⟩ — use GM's two-scale difference (X₂ = K^{1+η}, count(T_{X₂}) by Poisson mod k), or match the ϱ-mean to the volume term to (uq₀/K)^{1/2+ε}.
S3/O4: C^{10}_δ needs dyadic support in x (split into O(1) smooth pieces); δ^{−1} ≍ Y^{η′}; GM's δ^{−O(1)} exponent must be extracted before any δ_S(c) is claimed.
S7/O6: box trivial size (Y/K)L; with levels lcm(e, m²) the per-block bound is X^{1/2}uM(X/(u²E²M³))^θ (S7 loses M², absorbed only if 2η < saving); parameter constraints δ < η,
 δ < 2η′; S8 in the form Σ_u|w|(H/u)(u³/H)^{κ} ≪ H^{1−3cκ}, κ = (1−2θ)/2.
O1: δ conjugates Γ₀(pu′²) to Γ₀(p) ∩ Γ₀⁰(u′); G mod p is rank one, so the local factor at p | (u, D) is 1 and the diagonal is ≍ u/p.
O2: ω(2) = 2 cannot occur; either u is odd or w is supported on even u with (a, h) = ((u/2)², |D|/4).
Numerics: restrict to admissible u′ (support of w) and use stabiliser weights; on admissible u′ ≤ 43 the off-diagonal is flat.
STILL MISSING (reading's list): written (a″) and O5; the two-scale main-term matching; the admissibility Möbius with p | h; GM's δ^{−O(1)}; the bookkeeping fixes.

## S2′ (two-scale main-term matching) — written out after §33(1)
Fix a box (L, K) and a level q = a·q₀ (q₀ = lcm(j, e, m²)). Let ψ₂ be the smooth x-weight of the box (support |ℓ| ∈ [L, 2L], mass ∫ψ₂ = 1 after normalisation) and put, following
GM §5, ψ₂^{(1)}(v) := ψ₂(v/L)/L and ψ₂^{(2)}(v) := ψ(v/X₂)/X₂ with X₂ := K^{1+η} and ψ a fixed smooth bump of mass 1. Both have mass 1, so
  Σ_{k≡0 (q₀)}ψ₁(k/K)[Σ_{aℓ²+h≡0 (k)}ψ₂^{(1)}(ℓ) − ϱ(k)/k] = 𝒜₁ − 𝒜₂ + Σ_{k≡0 (q₀)}ψ₁(k/K)[Σ ψ₂^{(2)}(ℓ) − ϱ(k)/k],
where 𝒜_i := ⟨I|Δ_q F_i|α_{q₀,a,h}⟩ with F_i built from (ψ₁, ψ₂^{(i)}) as in GM §5 — the volume terms of 𝒜₁ and 𝒜₂ are identical (equal masses), which is exactly why GM take the
difference. The last sum is evaluated trivially: for k ∼ K the ℓ-range X₂ = K^{1+η} exceeds k by K^{η}, so Poisson modulo k gives Σ_ℓ ψ₂^{(2)}(ℓ) = ϱ(k)/k + O_A(ϱ(k)K^{−A}) for every A,
uniformly in u (the dual frequencies are ≥ K^{η}); summing over k ∼ K with the weights λμ²/k gives O(K^{−A+1+ε}). So the box equals 𝒜₁ − 𝒜₂ + negligible, and Theorem 8.1 applies to
each 𝒜_i (for 𝒜₂ the skew is X₂u|D|^{−1/2}, and its bound is smaller by the factor L/X₂ ≤ K^{−η}). [This replaces S2's one-scale identity; PROOFS §33(1).]

## S1′ (admissibility) — written out after §33(3)
The moduli of the piece are squarefree, split, coprime to 2Du. Write the indicator as 1_{(k, 2D)=1} = Σ_{j | (k, rad 2D)} μ(j) and λμ²(k) = Σ_{e|k}κ(e)·Σ_{m²|k}μ(m); the primes of k are
automatically split or ramified (a root exists mod k) and (k, u) = 1 holds after the content removal of §29/O1 for fundamental D and, in general, from the same Möbius factor. This adds
O_D(1) values of j, i.e. levels q = a·lcm(j, e, m²), and at the primes p | j (so p | 2D, p | h) the local counts of §17 Step 3 and the resultant step of §16 must use the trivial bound
p + 1 instead of the Hensel/≤ 2 bound (the assumption there is p ∤ ah). Since j ≤ rad(2D) = O_D(1), this costs O_D(1).

## Lemma A″ (the off-diagonal at one level is u-free) — written out (PROOFS §17 with the §21 Step-4 fix; to be read)
Let h ≥ 1, u squarefree with (u, 2h) = 1, a = u², and F_u := S_{a,h}(1) = {g = (A B; B C) : AC − B² = ah, a | B, a | C}, a Γ₀(a)-invariant set of positive definite forms. For Z ≥ 1 put
  off(u; Z) := Σ_{g₂ ∈ Γ₀(a)\F_u} Σ_{g₁ ∈ F_u, g₁ ≠ g₂, u(g₁,g₂) ≤ Z} (1 + u(g₁,g₂))^{−1/2},
u(·,·) the point-pair invariant (u = (cosh d − 1)/2 for the corresponding points of H), orbits counted with the stabiliser weights |Γ_{g}|^{−1} ≤ 1. Then
  off(u; Z) ≪_ε (h Z u)^{ε} h^{O(1)} (1 + Z^{1/2})   uniformly in u.
Proof. (1) Undilation. With δ = diag(1, 1/u), G := δgδ maps F_u bijectively onto F′_u := {G ∈ S_h : u | B_G} (det G = h), δΓ₀(u²)δ^{−1} = Γ₀⁰(u) := {γ : u | b, u | c}, the map is an
isometry on the associated points, and ⟨g₁,g₂⟩ := A₁C₂ + A₂C₁ − 2B₁B₂ satisfies ⟨g₁,g₂⟩ = u²⟨G₁,G₂⟩ =: u²N with 1 + 2u(g₁,g₂) = cosh d = N/(2h). Hence N ∈ Z, N > 2h for g₁ ≠ g₂, and
off(u; Z) = Σ_{2h < N ≤ 2h(1+2Z)} (N/(2h) − 1)^{−1/2}·P_u(N)/√2, P_u(N) := #{Γ₀⁰(u)-orbits of ordered pairs (G₁, G₂) ∈ F′_u², ⟨G₁,G₂⟩ = N} (with stabiliser weights).
(2) Lift to level one. Every such orbit lies in a unique SL₂(Z)-orbit of pairs of forms of determinant h with ⟨G₁,G₂⟩ = N (the stabiliser of a pair of distinct points is ±I), so
P_u(N) = Σ_{O} #{γ ∈ Γ₀⁰(u)\SL₂(Z) : u | B(γ.G₁), u | B(γ.G₂)} over the P₁(N) := #{such SL₂(Z)-orbits} classes, with any representative. P₁(N) ≪ (hN)^{o(1)}h^{1/2}: take G₂ ∈ Λ_h
(≪ h^{1/2+o(1)} reduced forms); for each, W := 2hG₁ − NG₂ lies in the rank-2 lattice G₂^⊥ with −det W = h(N² − 4h²), and representations of a fixed integer by a definite binary
lattice are ≪ (hN)^{o(1)}.
(3) Local count. For squarefree u, Γ₀⁰(u)\SL₂(Z) ≅ ∏_{p|u} T_p\SL₂(F_p) ≅ ∏_p {ordered pairs of distinct lines (L₁, L₂) ⊂ F_p²} (rows of γ up to (t, t^{−1})), and u | B(γ.G) reads
L₁ ⊥_G L₂. For one form (p ∤ h): c_p(G) = p + 1 − (1 + χ_{−h}(p)) = p − χ_{−h}(p). For a pair: L₁ must be ⊥ to G₁L₂ and G₂L₂, so L₂ is an eigenline of G₂^{−1}G₁, whose characteristic
polynomial is λ² − (N/h)λ + 1; if G₂^{−1}G₁ is not scalar mod p there are ≤ 2 such lines, so c_p(G₁,G₂) ≤ 2. If it is scalar, G₁ ≡ λG₂ (mod p) with λ ≡ ±1, and then G₁ ∓ G₂ = pW, so
p² | det(G₁ − λG₂) = h − λN + λ²h and hence p² | N² − 4h²; in that case c_p ≤ p + 1 ≤ 2p. Therefore ∏_{p|u} c_p ≤ 4^{ω(u)}·g₂(N), g₂(N) := ∏_{p | u, p² | N²−4h²} p, and g₂(N)² | N² − 4h².
(4) Summation. With M := 2h(1 + 2Z) and d running over divisors of u:
Σ_{2h<N≤M}(N/(2h) − 1)^{−1/2}g₂(N) ≤ (2h)^{1/2}Σ_{d|u} d Σ_{N ≤ M, d² | N²−4h²}(N − 2h)^{−1/2} ≤ (2h)^{1/2}Σ_{d|u} d·ρ(d²)·(d^{−1/2} + 2M^{1/2}/d²) ≪ h^{1/2}τ₃(u)M^{1/2},
since for each of the ρ(d²) ≤ 2^{ω(d)}·O(1) classes N mod d² with d² | N² − 4h² and N > 2h one has N ≥ d (as N² − 4h² ≥ d²), so the least term is ≤ d^{−1/2} and the rest ≪ M^{1/2}/d².
Combining (1)–(4): off(u; Z) ≪ (hZu)^{ε}h^{O(1)}(1 + Z^{1/2}). □
[Checked numerically: the diagonal is exactly ∏_{p^k∥u}p^{k−1}(p − χ_{−h}(p)) and off(u; Z)/√Z is flat in u for h = 1, 2, 5 and all primes u ≤ 499 (PROOFS §21, §25).]

## O5 (levels q₀ = lcm(j, e, m²)) — written out
(i) Diagonal: the functional at level a·q₀ has ⟨1⟩ ≍ c_d(u)·ρ*(q₀), ρ*(q₀) = #{projective zeros of Q_z mod q₀} ≤ 2^{ω(q₀)}∏_{p | (q₀, 2D)}(p + 1) ≪_D 2^{ω(q₀)} (for p ∤ ah the
discriminant −4ah is a unit mod p and Hensel gives ≤ 2 zeros; at the O_D(1) primes p | 2D use the trivial p + 1).
(ii) Summing over levels: for a pair g₁ ≠ g₂ of family points, a common projective zero of Q_{g₁}, Q_{g₂} mod p^k forces p^k | Res(Q_{g₁}, Q_{g₂}) = ⟨g₁,g₂⟩² − 4 det g₁ det g₂ = u⁴(N² − 4h²)
(because x³Res, y³Res ∈ (Q_{g₁}, Q_{g₂})), and each form has ≤ 2 zeros mod p^k for p ∤ ah (Hensel), ≤ p^k + p^{k−1} otherwise. Hence Σ_{q₀ ≤ Q} ∏_{p^k ∥ q₀}|R_{p^k}(g₁) ∩ R_{p^k}(g₂)|
≪_D τ₃(u⁴(N² − 4h²)) ≪ (uhZ)^{o(1)}, uniformly in Q — the level sum costs a divisor factor, not a factor Q. [The same statement with the p | h exception of §33(3).]

## O6′ (parameters and bookkeeping) — corrected after §33(4)
Parameters: c (range u ≤ H^{1/3−c}); δ (small-moduli cut k ≤ Y^{1−δ}); η (top cut k ≤ Y^{1+η}, μ²-cut M = Y^{η}, admissibility j ≪_D 1); η′ (tent smoothing Δ = Y^{1−η′});
C_GM := the exponent in Grimmelt–Merikoski Theorem 8.1's δ^{−O(1)} (to be extracted; the audit of PROOFS §32 covers it); θ ≤ 7/64.
Order of operations (§33(4)(i)): remove the m > Y^{η} tail and the k-cuts BEFORE decomposing the tent; then all box comparisons are against the box's own trivial size (Y/K)L.
Losses per box: K₁'s Y^{O(δ+η)}; the level structure lcm(j, e, m²) costs M² = Y^{2η} (§33(4)(iv)); GM's smoothness loss δ^{−O(1)} = Y^{C_GM η′}; the kink Y^{1+δ−2η′} (needs δ < 2η′);
the m-tail Y^{1−η+ε}; the small moduli Y^{1−δ+ε}; the small boxes Y^{1−2δ+ε}.
Saving per box (S7, corrected): the block E = M = 1 dominates and the box total is ≪ X^{1/2+θ}u^{1−2θ} + X^{1/2}u against X = L ≍ Y, i.e. a relative saving (u/X^{1/2})^{1−2θ}
= (u³/H)^{(1−2θ)/2}·Y^{O(η+η′+δ)} ≤ H^{−3c(1−2θ)/2 + O(η+η′+δ) + C_GM η′}.
Admissible choice: η′ = c/(100 C_GM), η = c/100, δ = c/1000 — then C_GM η′ + 2η + O(δ) < 3c(1−2θ)/2 = 1.336c (θ = 7/64), δ < η, δ < 2η′ all hold, and
  Σ_{u ≤ H^{1/3−c}} |w(u)| (H/u)(u³/H)^{(1−2θ)/2} ≪ H^{1 − 3c(1−2θ)/2 + O(c/100)} ≪ H^{1−c},
so δ_S(c) ≍ c (the constant (1−2θ)/2·3 − O(1/100) is explicit once C_GM is known; before that, only δ_S(c) ≍_{GM} c is justified — §33(5)).
