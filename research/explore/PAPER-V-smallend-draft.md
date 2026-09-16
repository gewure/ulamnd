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

## REVISION 2 (16 Sep, after the reading of the new sections — PROOFS §37). These SUPERSEDE the corresponding text above.
LEMMA A″. (a) Step (1): the kernel weight is (1 + u)^{−1/2} = (4h/(N + 2h))^{1/2} ≍ (h/N)^{1/2} — NOT (N/(2h) − 1)^{−1/2}/√2 (the §21 R3 fix had not been carried over); with it,
 step (4) reads Σ_N N^{−1/2}g₂(N) and no extra h is lost. (b) Step (4)'s display is FALSE without the restriction d ≤ M (without it the first half is ≍ u^{1/2+o(1)}); the restriction
 is automatic: d² | N² − 4h² with 0 < N² − 4h² ≤ M² forces d ≤ M. Write it. (c) Step (4)'s justification must be: with (d, 2h) = 1 write d = d₊d₋, d₊² | N − 2h, d₋² | N + 2h;
 then N − 2h ≥ d − 4h, and with the corrected weight the draft's "N ≥ d ⇒ least term ≤ d^{−1/2}" is exactly right. (d) Constants: ∏c_p ≤ 2^{ω(u)}g₂(N) (not 4^{ω(u)});
 ρ(d²) = 2^{ω(d)} EXACTLY for (d, 2h) = 1; τ₃(u) = 3^{ω(u)}. (e) Honest dependences: the bound is uniform in u only up to 6^{ω(u)} (so the heading "u-free" overstates; pointwise it is
 a divisor-size factor, class (c), but it is averaged in the application by Σ_{u∼U}6^{ω(u)}/u ≍ (log U)^6/6!, class (b)); the h-dependence is h^{3/2+o(1)}, not h^{O(1)} — measured
 off/(√T·h^{3/2}) ∈ [2.3, 11.4] with no trend for h ≤ 17, while off/(√T·h²) falls monotonically. (f) State in step (2) that the coset count is independent of the representative and
 that the stabiliser of a pair of distinct points is ±I; the representation bound of step (2) is uniform only for bounded disc, i.e. for h = |D| = O(1).
S2′. The second scale's bound is no larger than 𝒜₁'s, the honest ratio being (L/X₂)^{1/2−θ} (the skew grows with X₂), not L/X₂. Let ψ₂ be supported on |t| ∈ [1, 2] (avoid double
 scaling); keep the amplitude ≍ Y and the coefficient (1/k)λμ²(k) in the display, writing (1/k)ψ₁(k/K) = (1/K)ψ̃₁(k/K); the Poisson error is O_A((X₂/k)^{−A}) = O_A(K^{−ηA}), so reaching
 K^{−A} costs A/η and constants depending on A, η, ψ; state X₂ > L (i.e. η(1 − δ) > δ) and q₀ ≤ 2K.
S1′. (a) "at the primes p | j (so p | 2D, p | h)" is wrong for p = 2 with D odd: say "p | 2D"; at p = 2 the Hensel step fails because −4ah is never a unit mod 2, and the local factor
 is ≤ |P¹(Z/2)| = 3. (b) Order matters: κ is supported on split squarefree integers, so λ = 1 * κ reproduces λ only AFTER the j-Möbius — state the decomposition in that order.
 (c) (k, u) = 1 is unconditional (p | (k,u) ⇒ p | |D| ⇒ p | 2D, excluded), not a consequence of content removal. (d) OPEN: when p | (u, D) the O1 renormalisation puts p | a, and the
 j-Möbius then produces levels with gcd(a, q₀) > 1; both §16's CRT factorisation and Lemma 3.1's shape q = ad need an argument there (O_D(1) levels, but validity is what is missing).
O5. (a) The primes p | ah must be pulled OUT of the product before the divisor bound (there the resultant mechanism can degenerate); their contribution is ∏_{p|(q₀,2D)}(p^v + p^{v−1})
 = O_D(1), using v_p(q₀) ≤ 1 for p | j and (em, 2D) = 1. (b) The m²-part needs §22 (G2)'s sharper c_{p^k} ≤ 2p^{⌊v_p(N²−4h²)/2⌋}; cross-reference it. (c) ⟨1⟩ ≍ c_d(u)ρ*(q₀) presumes
 gcd(a, q₀) = 1 (fails exactly in the O1 case) and has been checked numerically only for squarefree e. (d) τ₃(u⁴(N²−4h²)) is pointwise per pair and must be carried through the N-sum:
 Σ_N N^{−1/2}τ₃(·)g₂(N) ≪ M^{1/2+o(1)}.
O6′. (a) 3c(1 − 2θ)/2 = 1.172c at θ = 7/64 (not 1.336c). (b) The parameter choice must tie δ to η′: with C_GM = 20 (PROOFS §36) the stated δ = c/1000, η′ = c/(100C_GM) VIOLATES
 δ < 2η′; take δ = η′/2 = c/(200·max(1, C_GM)), which gives δ < η and δ < 2η′ for every C_GM, with the budget C_GMη′ + 2η + O(δ) ≈ 3.3·10^{−4} ≪ 1.172c. (c) "E = M = 1 dominates" is
 FALSE (the per-block bound is increasing in M, exponent 1 − 3θ = 0.672): state instead that the total over blocks is ≪ (X^{1/2+θ}u^{1−2θ}Y^{η(1−3θ)} + X^{1/2}u)Y^{O(δ)}. (d) The (E, M)
 block trivial sizes must be written (level u²EM², number of levels EM). (e) Honest exponent: δ_S(c) = min(2δ/3, η, 2η′ − δ, 1.172c − C_GMη′ − 2η − O(δ)) ≈ c/1000 — still ≍ c, but the
 earlier line "≪ H^{1−c}" was false about the theorem; also Σ_u|w|(H/u)^{1−δ} ≈ H^{1−2δ/3+o(1)}.
STILL NOT WRITTEN (the reading's list): S1 itself with the smooth cuts and the symmetrised root sum; S3/O4 (f ∈ C^{10}_δ for the box weights); the K₁ lemma at the levels
u²lcm(j,e,m²); the K₂ diagonal summed over levels; the Cauchy–Schwarz over levels with the coefficients κ(e)μ(m) and the per-block choice of Z₀, Z₁, Z₂; O1/O2 beyond §29's sketch;
and C_GM itself (§36 traces C = 20 but that is our trace, not Grimmelt–Merikoski's statement).

## S1 (the reduction), written out — after §33(2) and §37
Fix u squarefree with u ≤ H^{1/3−c}, Y = H/u, and recall 𝒫_u(Y) = Σ_{k>1 adm}(λ(k)/k)Σ_{x∈R^{(u)}_k}B^{(Y)}_k(⟨x⟩_k), the moduli k admissible (squarefree, split, coprime to 2Du).
(1) SYMMETRISED FORM. R^{(u)}_k is symmetric and 0 ∉ R^{(u)}_k, so pairing x ↔ k − x,
    Σ_{x∈R_k}B^{(Y)}_k(⟨x⟩_k) = ½Σ_{ℓ∈Z∖{0},\,k|Q_u(ℓ)}T(ℓ) − ½ϱ(k)∫_ℝT,  T(t) := (Y − |t|)^+,  ∫_ℝT = Y²,  ϱ(k) = |R^{(u)}_k|,
    an identity (paper III's proof of Proposition pieces; ℓ = 0 is a root only if k | |D|, excluded since k is coprime to 2D). This is GM's "count minus density × mass" shape.
(2) SMALL MODULI k ≤ Y^{1−δ}. For each pair {x, k−x} the bracket B^{(Y)}_k(m) + B^{(Y)}_k(k−m) lies in [−k/4, k/4] (paper III, loc. cit.), so the contribution is
    ≪ Σ_{k≤Y^{1−δ}}|λ(k)|ϱ(k) ≪_f Y^{1−δ}(log Y)^{O(1)} by Shiu's theorem. No smoothing is needed here: the cut is free because the identity is exact for each k.
(3) LARGE MODULI k > Y^{1+η}. Paper III's Lemma tail gives ≪ Y^{1−η}(log Y)^{10}(log log Y)^{26}, uniformly in u ≤ Y³. The cut at Y^{1+η} is sharp there; to hand a SMOOTH weight to
    Theorem 8.1 we insert a smooth ψ₁ supported on [Y^{1−δ}/2, 2Y^{1+η}], equal to 1 on [Y^{1−δ}, Y^{1+η}], and remove the two transition ranges by partial summation against Lemma tail
    at the top and by (2) at the bottom, at a cost ≪ Y^{1−δ}(log Y)^{O(1)} + Y^{1−η}(log Y)^{11}.
(4) THE WINDOW. What remains is Σ_{k}(λμ²(k)/k)ψ₁(k/K), dyadically in K ∈ [Y^{1−δ}, Y^{1+η}], of the symmetrised bracket of (1). Decompose T into smooth dyadic boxes in |ℓ| ∼ L,
    smoothing the two kinks of T at ℓ = ±Y at scale Δ = Y^{1−η′}: the change is ≪ (Δ/K)·Δ·H^{ε} per box, i.e. ≪ Y^{1+δ−2η′+ε} in total, and the resulting weights satisfy
    ψ₂^{(J)} ≪ (Y/Δ)^J = Y^{Jη′}, i.e. δ^{−1} ≍ Y^{η′} in GM's C^{10}_δ.
(5) SMALL BOXES. A box (L, K) has trivial size ≪ (Y/K)·L·H^{ε} (each ℓ ∼ L has ≪ H^{ε} divisors in a dyadic range, and the density term is of the same size), so all boxes with
    L ≤ Y^{1−3δ} contribute ≪ Y^{1−2δ+ε} together: the kink of T at ℓ = 0 never matters, and only the boxes with Y^{1−3δ} ≤ L ≤ Y need an estimate.
(6) MODULI WEIGHTS. On the window write λμ²(k)·1_{(k,2D)=1} = Σ_{j|(k,rad 2D)}μ(j)·Σ_{e|k}κ(e)·Σ_{m²|k}μ(m) (in this order — S1′), truncate at e ≤ E, m ≤ M = Y^{η} BEFORE the box
    decomposition (§33(4)(i)), the tails costing ≪ Y^{1−η+ε} each, and run the rest at the levels q = a·lcm(j, e, m²).
The output of S1 is: 𝒫_u(Y) = Σ over O(log²H) boxes (L, K) and levels of the GM-shaped discrepancy sums of (1), plus O(Y^{1−min(2δ/3, η, 2η′−δ)+ε}).

## S3, S4, S5, O4 written out — after §37
Throughout: a = u² (or pu′², O1), h = |D| (or |D|/p), q₀ = lcm(j, e, m²) with j | rad 2D, e ≤ E, m ≤ M = Y^{η}, and the level is q = a q₀. Box (L, K) as in S1(4)–(5),
X := L, R := L/K ∈ [Y^{−η}, Y^{3δ}], skew X/Y ≍ L u |D|^{−1/2} (GM §5).

### O4 (the hypotheses of Theorem 8.1 for the box weights)
The weight of a box is F(g) = f(x, y) with x = ℓ/k, y = √h/(u k) in Iwasawa coordinates, f(x, y) = ψ₂(ℓ/L)ψ̃₁(k/K)/K, ψ₂ the smoothed dyadic piece of the tent and ψ̃₁(t) = ψ₁(t)/t.
Then f is supported on |x| ≍ L/K, y ≍ √h/(uK), and ∂^{J₁}_x∂^{J₂}_y f ≪ (δ^{-1})^{J₁+J₂}(L/K)^{−J₁}(√h/(uK))^{−J₂} with δ^{−1} ≍ Y^{η′}, because the only non-dyadic scale in ψ₂ is the
kink smoothing at Δ = Y^{1−η′} (S1(4)). To meet Definition 2 of arXiv 2505.00489 (dyadic support in x as well) split the x-range, of ratio ≤ 4, into O(1) smooth pieces with the same
δ. The remaining hypotheses: X/Y = Lu|D|^{−1/2} > δ holds for L ≥ Y^{1−3δ}, u ≥ 1; J = 10 derivatives suffice; q^{o(1)} = (u²q₀)^{o(1)} = H^{o(1)}; the Hecke variable is trivial
(β supported on h = 1), so Rankin–Selberg (2.25) is not invoked (§36). The only δ-loss is the prefactor δ^{−C} = Y^{Cη′} with C = 20 by the trace of §36.

### S4 (the K₁ lemma at the levels q = a q₀)
LEMMA (= arXiv 2505.00489 §1.2 Example, restated at our levels). For q ≥ 1, Z ≥ 1 and 0 < R ≤ H^{O(1)},
  K₁(q; Z, R) := Σ_{γ∈Γ₀(q)} k_{Z²,R}(γ) ≪ H^{o(1)}(1 + R + 1/(qR) + Z/q),
with k_{Z²,R}(g) ≤ 1{u_R(g) ≤ Z²}(1 + u_R(g))^{−1/2}, u_R = (a² + (b/R)² + (cR)² + d² − 2)/4. (Cases c = 0, b = 0, bc ≠ 0; PROOFS §22 (G1), numerics data/k1-lattice.txt, confirmed
by the reading of §25.) Summed over the levels of a block, with q = u²q₀ and R = L/K ∈ [Y^{−η}, Y^{3δ}]:
  Σ_{j,e≤E,m≤M} K₁(u²lcm(j,e,m²); Z₁, R) ≪_D H^{o(1)}Y^{3δ+η}(EM + Z₁/u²),
since Σ_{e≤E,m≤M}1 = EM, Σ 1/(u²lcm(j,e,m²)R) ≪ Y^{3δ}/u² and Σ Z₁/(u²lcm) ≪ Z₁ log/u². No complementary-divisor reduction is needed (§33(9)).

### S5 (the K₂ diagonal summed over the levels)
The functional is α_q(g) = 1{c(g) ≡ 0 mod q}·1{b(g) ≡ 0 mod a} on the Heegner set Λ_{ah} (GM Lemma 3.1). Its diagonal is the number of Γ₀(q)-orbits of the family, weighted by
1/|Γ_g| ≤ 1:
  diag(q) = c_d(u)·ρ*(q₀),  c_d(u) = ∏_{p^k∥u}p^{k−1}(p − χ_{−h}(p)) ≍ u  (PROOFS §21, §25; exact),  ρ*(q₀) = #{projective zeros of Q_z mod q₀} ≤ 2^{ω(q₀)}∏_{p|(q₀,2D)}(p+1) ≪_D 2^{ω(q₀)},
valid when gcd(a, q₀) = 1 (the case p | (u, D) is the open item O1 of REVISION 2). Hence Σ_{j,e≤E,m≤M} diag ≪_D H^{o(1)}·u·EM. [Numerics: c_d(u, e) = c_d(u,1)ρ(e) for squarefree e,
data/gm-orbit-count-h1.txt; the p² | q₀ case is not yet checked numerically — O5(c).]

### S3 (Theorem 8.1 per block, and the Cauchy–Schwarz over the levels)
For a box (L, K) and a block (E, M) of levels, apply Theorem 8.1 to each level with the SAME Z₀, Z₁, Z₂ (Z₀Z₁Z₂ ≥ Lu|D|^{−1/2} + 1), pull the coefficients out by |κ(e)μ(m)| ≪ H^{o(1)}/E
(κ(e) ≍ e^{−1+o(1)}; no ℓ²-gain is claimed from them), and apply Cauchy–Schwarz over the levels:
  Σ_{levels} |⟨I|Δ_q F|α_q⟩| ≪ H^{o(1)}Y^{Cη′}(Lu)^{1/2}Z₀^{θ}(Σ_{levels}K₁)^{1/2}(Σ_{levels}K₂)^{1/2},
with Σ K₁ from S4, Σ K₂ ≪ H^{o(1)}(uEM + Z₂) from S5 and Lemma A″ (the off-diagonal, u-free after summing over levels: §16 FOLLOW-UP). Choosing Z₁ = u²EM, Z₂ = uEM and
Z₀ = Lu/(Z₁Z₂) — admissible since Z₀ ≥ 1 for u ≤ L^{1/2} — gives the per-block bound (X = L)
  ≪ H^{o(1)}Y^{Cη′+3δ+η}·(X/(EM))·(u²E²M²/X)^{1/2−θ},
i.e. the block's own trivial size X/(EM) times (u²E²M²/X)^{1/2−θ} (KNOWLEDGE F48: each block is compared with its own trivial size; the level count is EM and the level size u²EM²,
so the M-dependence is the one recorded in O6′(c)). Summing over the O(log²H) boxes and blocks and over u ≤ H^{1/3−c} as in S8 gives Theorem S with
δ_S(c) = min(2δ/3, η, 2η′ − δ, 1.172c − Cη′ − 2η − O(δ)) and the parameters of O6′(b).

## O1, O2 written out — after §29 and §37
Recall w is supported on SQUAREFREE u (paper III set-up), so no non-squarefree dilation occurs; the levels m² from μ² are the only non-squarefree ones (O5).
O2 (the prime 2). Either b is odd, so D is odd and ω(2) = 0 and w is supported on odd u; or b is even, so ω(2) = 1, P₂ = 0 and w is supported on even u, with u = 2u′, u′ odd
squarefree, and Q_u/4 = u′²x² + |D|/4: the pair is (a, h) = (u′², |D|/4), gcd(a, h) = 1, a odd. (ω(2) = 2 would make 2 a fixed prime divisor of f, excluded.) So a is always odd and
u′ is odd squarefree; the prime 2 enters only through the moduli, where it is excluded by the admissibility factor 1_{(k,2D)=1} of S1′, and through the local factor at 2 of the
level a·lcm(j, e, m²), which is ≤ |P¹(Z/2)| = 3. The Hensel step of O5 is not used at p = 2 (−4ah is never a unit there); the trivial factor p + 1 = 3 is.
O1 (odd p | (u, D)). Let p ∥ |D| (for non-fundamental D there are O_D(1) primes with bounded exponent, treated the same way) and u = p u′, u′ squarefree, p ∤ u′. Then Q_u = u²x² − D
has content p and Q_u/p = p u′²x² + |D|/p, so (a, h) = (p u′², |D|/p) with gcd(a, h) = 1. The undilation of Lemma A″ uses δ = diag(1, 1/u′): G = δ g δ = (m, p u′ℓ; p u′ℓ, p k) has
det G = p h = |D| and p | B_G, p | C_G, u′ | B_G; the conjugated group is Γ₀(p) ∩ Γ₀⁰(u′) (NOT Γ₀⁰(u′) — §37(7)). Since p ∥ |D| and p ∤ m, G mod p is a rank-one form, so its unique
projective zero is its kernel line and the condition C(τ.G) ≡ 0 (p) already forces B(τ.G) ≡ 0 (p): the local factor at p is 1, both for the diagonal and for pairs, and the diagonal
is ≍ u/p. The counts at the primes of u′ are those of Lemma A″ step (3) (p ∤ u′), the determinant is |D| = O(1), and the level p u′² being a non-square is harmless (GM Lemma 3.1
requires only gcd(a, h) = 1). Numerics: the weighted diagonal is exactly (4/3)∏_{p|u′}(p − χ_{−3}(p)) for D = −3, and the off-diagonal is flat in u′ on the admissible u′
(data/gm-kernel-count-a3u2-h1.txt, restricted to the support of w).
OPEN (inherited, §37(10)): with p | a the admissibility factor can produce levels q₀ with p | j, hence gcd(a, q₀) = p > 1. Then §16's CRT factorisation P¹(Z/aq₀) ≅ P¹(Z/a) × P¹(Z/q₀)
and the shape q = a·d of GM Lemma 3.1 both need an argument. There are O_D(1) such levels; what is missing is the validity of the parametrisation at them, not their number.
A clean way out, to be checked: absorb the factor p of j into a (i.e. work at (a, h) = (p u′², |D|/p) with the level p·lcm(e, m²)·u′² read as a·lcm(e, m²) with a already carrying p),
so that gcd(a, q₀) = 1 again and the j-Möbius runs only over the primes of 2D not dividing u.

## O6″ (parameters, final form) — after PROOFS §39
Take C := 24 (PROOFS §39: the printed proof of Grimmelt–Merikoski's Theorem 8.1 gives δ^{−20}, and δ^{−10} whenever AD ≥ 1, which holds here; 24 is the safe value against the
Prop 6.1 "T ≥ L" gap, and nothing below depends on the exact value because η′ is chosen after C). Parameters, in this order: c > 0 given; η′ := c/(200C); δ := η′/2; η := c/100;
δ₃ := δ. Then δ < η, δ < 2η′ and Cη′ + 2η + O(δ) ≤ c/200 + c/50 + O(c/400) < 1.172c = 3c(1 − 2θ)/2 at θ = 7/64, so
  δ_S(c) = min(2δ/3, η, 2η′ − δ, 1.172c − Cη′ − 2η − O(δ)) = 2δ/3 = c/(600C) = c/14400,
i.e. δ_S(c) ≍ c with an explicit constant, and the citation of C is only through the choice of η′.


## REVISION 3 (16 Sep, after the full reading — PROOFS §40). These SUPERSEDE the corresponding text above.
LEMMA A″ — merge REVISION 2 into the BODY (a referee reads the body): kernel weight (1+u)^{−1/2} = (4h/(N+2h))^{1/2} ≍ h^{1/2}N^{−1/2} (the body's (N/(2h)−1)^{−1/2}/√2 is unbounded as
 N → 2h⁺ and is wrong); constant 2^{ω(u)}, not 4^{ω(u)}; step (4) with d ≤ M, which is AUTOMATIC (d² | N²−4h², 0 < N²−4h² ≤ M² ⇒ d ≤ M, and the same inequality gives N ≥ d, all that
 step (4) needs once the weight is N^{−1/2}). State the lemma for h = O(1) (step (2)'s representation bound is uniform only for bounded discriminant). The 6^{ω(u)} is already
 absorbed by the lemma's own (hZu)^ε, so the statement is not overstated.
S1(1) — the density term must read ½ϱ(k)∫T/k: the /k was missing. (This is the main term being cancelled.)
S1(6) — there is no e-truncation and none is needed (the block bound decays like E^{−2θ} and the block trivial size like 1/E, so all dyadic E sum); only the m-tail costs Y^{1−η}.
 The per-piece error exponent is min(δ, η, 2η′ − δ) — the factor 2/3 belongs to the u-summation, not to a single piece. State the order (k-cuts → m-tail → boxes) consistently.
S3 — two fixes. (a) With the stated Z's and inputs the per-block bound is (block trivial L/(EM))·M·(u²E²M²/L)^{1/2−θ}: the draft's display silently used |κ(e)μ(m)| ≪ 1/(EM), i.e. it
 lost a factor M (μ has no 1/m decay). Harmless (M ≤ Y^η, and the budget carries 2η) but must be written. (b) "Z₀ ≥ 1 for u ≤ L^{1/2}" is FALSE: Z₀ = L/(u²E²M²) ≥ 1 needs uEM ≤ L^{1/2}.
 Reinstate the dichotomy of §21 R6: blocks with EM > L^{1/2}/u are bounded by their own trivial size L/(EM) ≤ L^{1/2}u and sum geometrically. With it the box total is
 ≪ (L^{1/2+θ}u^{1−2θ}Y^{η(1−2θ)} + L^{1/2}u)Y^{O(δ+η+η′)}, relative saving (u³/H)^{(1−2θ)/2}.
O4 — pull the tent amplitude Y/K out of F explicitly (Definition 2 normalises ‖f‖_∞ ≤ 1); note f is not a product (ψ₂(ℓ/L) depends on y too) and give the one-line mixed-derivative
 bound (each ∂_y produces 1/y ≍ 1/Y).
S4 — the honest R-range is R = L/K ∈ [Y^{−η−3δ}, Y^{δ}], and it is 1/R ≤ Y^{η+3δ} that bounds the 1/(qR) term while R ≤ Y^{δ} bounds the 1 + R term.
O1 — the clean reason, replacing "absorb p into a": for p | (u,D) with p ∥ |D|, after content removal (a,h) = (pu′², |D|/p) and p ∤ h; since k | aℓ² + h ≡ h (mod p), p ∤ k
 AUTOMATICALLY. So j never runs over p, gcd(a, q₀) = 1 always, and §16's CRT and Lemma 3.1's q = a·d are untouched. (Still to write: two special primes dividing u, and
 non-fundamental D with p² | D, where Q_u/p is not as claimed — O_D(1) cases, a sentence each.)
O6‴ (parameters, optimised) — the draft's choice is far from optimal. Maximising min(δ, η, 2η′ − δ, 3c(1−2θ)/2 − C η′ − 2η) at C = 20 by δ = η = η′ = t gives 23t = 1.171875c,
 t = 0.05096c and δ_S(c) ≈ 0.034c ≈ c/29 (with the u-summation factor 2/3 + c). The earlier c/1000 and c/14400 were artefacts of a non-optimal choice; c/29 is the honest headline.
STILL MISSING (the reading's list, in order of weight):
 (M1) S6 — the LEVEL-SUMMED off-diagonal, the crux: carrying τ₃(u⁴(N²−4h²)) and g₂(N) through Σ_N N^{−1/2}, and pulling the primes p | ah out of the product first. Without it
   ΣK₂ ≪ H^{o(1)}(uEM + Z₂) has no proof and the theorem rests on nothing.
 (M2) The K₂ DICTIONARY: ⟨α_q|Δk_{Z₂²,1}|α_q⟩ ≤ ⟨α_q|K_q k|α_q⟩ = diagonal + off-diagonal at level a·q₀, with GM's functional and the stabiliser weights, and the extension of
   Lemma A″ from S_{a,h}(1) to S_{a,h}(q₀).
 (M3) C_GM for THEOREM 8.1 specifically: §39's trace is of Theorem 7.1; 8.1's proof says only "by similar arguments", so the K-invariant variant's δ^{−O(1)} must be re-derived.
 (M4) Scope caveats in the statement: D < 0, u squarefree, δ_S(c) non-uniform and non-effective as c → 0, constants depending on f, D and on A/η in S2′.

## S6 (the level-summed off-diagonal) — written out, after §40 (M1)
CLAIM. With a = u² (or pu′², O1), h = O_f(1), q₀ = lcm(j, e, m²) as in S1′ and Z₂ ≥ 1,
  Σ_{q₀ ≤ EM²} off(a q₀; Z₂) ≪_{f,ε} H^{ε}\,(1 + Z₂),
where off(q; Z₂) is the off-diagonal of ⟨α_q|K_q k_{Z₂²,1}|α_q⟩, i.e. the weighted count of ordered pairs of DISTINCT family points at point-pair distance ≤ Z₂², modulo Γ₀(q).
PROOF. (1) By the CRT decomposition of §16 FOLLOW-UP (valid at prime powers, §21 R1: a common projective zero mod p^k forces p^k | Res because x³Res, y³Res ∈ (Q_{g₁}, Q_{g₂}),
and each form has ≤ 2 zeros mod p^k for p ∤ ah by Hensel), for a fixed pair (g₁, g₂) of distinct family points,
  Σ_{q₀} ∏_{p^k ∥ q₀} |R_{p^k}(g₁) ∩ R_{p^k}(g₂)| ≤ ∏_{p | (q₀, 2D)}(p^{v_p} + p^{v_p−1}) · Σ_{q₀' | Res, (q₀', 2Dah) = 1} 2^{ω(q₀')} ≪_D τ₃(N² − 4h²),
where the O_D(1) primes p | 2D (there v_p(q₀) ≤ 1 for p | j and (em, 2D) = 1) are PULLED OUT FIRST with the trivial factor p + 1, and Res = u⁴(N² − 4h²) contributes only through
N² − 4h² because the remaining q₀' are coprime to u (§36). So the level sum costs a divisor factor, not a factor EM².
(2) By Lemma A″'s parametrisation (undilation, lift to level one, local counts), the pairs at distance u(g₁,g₂) ≤ Z₂² are indexed by N = ⟨G₁,G₂⟩ ∈ (2h, 2h(1 + 2Z₂²)] =: (2h, M],
with weight (4h/(N + 2h))^{1/2} ≍ h^{1/2}N^{−1/2}, and for each N the number of Γ₀⁰(u)-orbits is ≤ P₁(N)·2^{ω(u)}g₂(N), P₁(N) ≪ (hN)^{o(1)}h^{1/2}, g₂(N)² | N² − 4h².
(3) Combining (1) and (2), the level-summed off-diagonal is
  ≪_D h^{1/2}·2^{ω(u)} Σ_{2h < N ≤ M} N^{−1/2}·(hN)^{o(1)}h^{1/2}·τ₃(N² − 4h²)·g₂(N).
By Cauchy–Schwarz in N, Σ_N N^{−1/2}τ₃(N²−4h²)g₂(N) ≤ (Σ_N N^{−1/2}τ₃(N²−4h²)²)^{1/2}(Σ_N N^{−1/2}g₂(N)²)^{1/2}, or more simply by Nair–Tenenbaum/Henriot (uniform in the
discriminant) Σ_{N≤M}τ₃(N²−4h²)^{A} ≪_A M(log M)^{3^A−1} and the divisor-switching bound Σ_{2h<N≤M}N^{−1/2}g₂(N) ≪ τ₃(u)M^{1/2} of Lemma A″ step (4): Hölder with exponents
(1+ε, (1+ε)/ε) gives Σ_N N^{−1/2}τ₃(N²−4h²)g₂(N) ≪_ε M^{1/2}(log M)^{O(1)}τ₃(u)^{1+ε}·H^{ε}. Since M ≍ hZ₂², this is ≪ H^{ε}(1 + Z₂), and 2^{ω(u)}τ₃(u) = 6^{ω(u)} ≪_ε H^{ε} —
pointwise divisor-size, averaged in the application by Σ_{u∼U}6^{ω(u)}/u ≍ (log U)^6/6! (§36, §37). □
[TO CHECK IN THE READING: the Hölder step's exponents; whether Henriot's uniform Nair–Tenenbaum bound applies to τ₃ of N² − 4h² with N in a short range; and whether the pull-out
of the p | 2D primes in (1) is uniform in the level.]

## S5′ (the K₂ dictionary) — written out, after §40 (M2)
By definition (GM §4.1, arXiv 2505.00493) the second kernel quantity is
  ⟨α_q|Δ_q k_{Z₂²,1}|α_q⟩ ≤ ⟨α_q|K_q k_{Z₂²,1}|α_q⟩ = Σ_{σ₁,σ₂ ∈ L_{ah}} |Γ_{σ₁ i}|^{−1}|Γ_{σ₂ i}|^{−1} Σ_{τ₁,τ₂ ∈ T_q} α_q(τ₁σ₁)α_q(τ₂σ₂) Σ_{γ∈Γ₀(q)} k(u(γτ₁σ₁ i, τ₂σ₂ i)),
the inequality because k ≥ 0 and the subtracted volume term is ≥ 0 (GM do the same, "drop the integral by positivity"). Unfolding the γ-sum as in PROOFS §17 Step 1, the right side is
  Σ_{g₂ ∈ Γ₀(q)\S_{a,h}(q₀)} |Γ_{g₂}|^{−1} Σ_{g₁ ∈ S_{a,h}(q₀)} k(u(g₁, g₂)) = diag(q) + off(q; Z₂),
where S_{a,h}(q₀) = {g : det g = ah, a | B, a q₀ | C} is the family at level q = a q₀ (GM Lemma 3.1), diag(q) = Σ_{g ∈ Γ₀(q)\S_{a,h}(q₀)}|Γ_g|^{−1}·k(0) is the count of S5, and off
is the quantity of S6. Lemma A″ is proved at q₀ = 1; for q₀ > 1 the family S_{a,h}(q₀) is the subset of S_{a,h}(1) cut out by the congruences C ≡ 0 (mod a q₀), i.e. by the local
conditions of (1) in S6, and the level-summed statement of S6 is exactly what replaces a separate Lemma A″ at each q₀: one proves the pair count at q₀ = 1 and sums the local
intersection factors over the levels. [TO CHECK: that the unfolding is legitimate with the stabiliser weights, i.e. that Σ_{τ} α_q(τσ) counts each Γ₀(q)-orbit of S_{a,h}(q₀)
exactly once with weight |Γ_g|^{−1}; GM's Prop 4.1 does this at q₀ = 1 and the same computation should give it in general.]
