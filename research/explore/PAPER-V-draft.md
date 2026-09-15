# Paper V — working draft of rigorous statements (started 15 Sep 2026, late night). NOT READ. Lemmas marked PROVED have complete proofs here;
# everything else is a precise target with a pointer to the heuristic derivation in PROOFS-uniform.md.

Notation as in paper III (f monic irreducible quadratic without fixed prime divisor, discriminant D; pieces 𝒫_u(Y); w(u) = P(1)λ(u)ω(u);
G°_{d′} = G_{d′} − Ḡ_{d′}; x* the inverse of x modulo the modulus in question; e_m(z) = e(z/m)).

## Target theorem (M): the pieces around u = H^{1/2}
For every f as in paper III there is δ_M > 0 (δ_M ≈ 10^{−4} with the parameters below) with
    Σ_{H^{0.47} < u ≤ H^{0.53}} w(u) 𝒫_u(H/u) = O(H^{1−δ_M})
(the Ḡ-part of these pieces is ≪ U(log H)^C per block, PROOFS §12.0, and is included in the O). Consequence, with paper III Theorem typeII at ε = 0.03:
Σ_{u > H^{0.47}} w(u)𝒫_u(H/u) = c_off(f)H + O(H^{1−δ}). [Statement corrected after the reading, PROOFS §28.]
[Heuristic basis: PROOFS §12, §15, §19, §20, §23, §24. Readings: §16, §19, §21, §23.]

## Lemma E (energy of reciprocals, every modulus) — PROVED (Cilleruelo–Garaev's argument; checked by a reading, PROOFS §23)
Let m ≥ 2 be SQUAREFREE (all that R4 uses: m = d/g), 1 ≤ N ≤ m, J₄(N) = #{(x₁,…,x₄) ∈ [1,N]⁴ : (x_i, m) = 1, x₁* + x₂* ≡ x₃* + x₄* (mod m)}. Then for every ε > 0,
J₄(N) ≪_ε m^ε(N² + N^{7/2}m^{−1/2}). (The bound holds for every m — PROOFS §23 fix — but only the squarefree case is needed.)
Step 1 (hyperbola in a square box, unit λ). For (λ, m) = 1, K ∈ Z, 1 ≤ M ≤ m: I(λ; K, M) := #{(x, y) ∈ (K, K+M]² : xy ≡ λ (mod m)} ≪_ε m^ε(M^{3/2}m^{−1/2} + 1).
 Proof. Write x = K + x′, y = K + y′, 1 ≤ x′, y′ ≤ M: x′y′ + Kx′ + Ky′ ≡ b := λ − K² (mod m). Let T = ⌊(m/M)^{1/2}⌋ ≥ 1. By Dirichlet there are 1 ≤ t ≤ T and
 u₀ ∈ Z with tK ≡ u₀ (mod m), |u₀| ≤ m/T. Multiplying by t: tx′y′ + u₀x′ + u₀y′ ≡ b₀ (mod m) with b₀ ≡ tb, |b₀| < m/2; so tx′y′ + u₀x′ + u₀y′ = b₀ + zm with
 |z| ≤ TM²/m + 2M/T + 1/2 ≤ 5M^{3/2}m^{−1/2} + 1/2 (using T ≤ (m/M)^{1/2} and T ≥ (m/M)^{1/2}/2). For each z: (tx′ + u₀)(ty′ + u₀) = n_z := t(b₀ + zm) + u₀².
 Here n_z ≡ t²(x′ + K)(y′ + K) = t²xy ≡ t²λ (mod m); since λ is a unit and 1 ≤ t² ≤ m/M < m (if M ≥ 2; M = 1 is trivial), m ∤ t²λ, so n_z ≠ 0. As
 |n_z| ≤ T(|b₀| + |z|m) + u₀² ≤ 5mM + Tm + m²/4 ≤ 7m², the number of factorisations, hence of (x′, y′), is ≪_ε m^ε for each z. Summing over the ≪ M^{3/2}m^{−1/2} + 1 values of z gives the claim. □
Step 2 (from energy to hyperbolas). J₄(N) = Σ_λ J₂(λ)², J₂(λ) := #{x, y ≤ N : x* + y* ≡ λ}, Σ_λ J₂(λ) = N′² (N′ = #{x ≤ N: (x,m) = 1}), so J₄ ≤ N′² max_λ J₂(λ).
 Unit λ: x* + y* ≡ λ ⇔ x + y ≡ λxy ⇔ (x − λ*)(y − λ*) ≡ λ*² (mod m) — a unit hyperbola in the square box (−λ*, N − λ*]² with equal shifts; Step 1 gives
 J₂(λ) ≪ m^ε(N^{3/2}m^{−1/2} + 1).
 Non-unit λ (fix of PROOFS §23): let g = gcd(λ, m) > 1. For p^e ∥ m, f := v_p(λ). If f ≥ e the congruence mod p^e reads x + y ≡ 0 (mod p^e). If f < e, x + y ≡ λxy
 (mod p^e) ⇔ (p^f x − μ*)(p^f y − μ*) ≡ μ*² (mod p^{e+f}) with λ = p^f μ, μ a p-unit [multiply by p^f μ* ·… — to be written out]. Let g′ = ∏_{f<e} p^f,
 g″ = ∏_{f≥e} p^e. The conditions at the primes with f ≥ e restrict x to ≤ N/g″ + 1 classes in which y is determined mod g″; combining the f < e primes by CRT
 gives one equal-shift unit hyperbola modulo m g′/g″ in a box of side g′N (after the substitution X = g′x). Step 1 gives J₂(λ) ≪ m^ε((gg′)^{1/2}N^{3/2}m^{−1/2} + 1)
 for N ≤ m/g″, and J₂(λ) ≤ N always. Since x + y ≡ 0 (mod g) forces g ≤ 2N (x, y ≤ N) and Σ_{gcd(λ,m)=g} J₂(λ) ≤ N(2N/g + 1), the non-unit λ contribute
 Σ_λ J₂(λ)² ≤ Σ_{g|m, g≤2N} max J₂·N(2N/g + 1) ≪ m^{2ε}(N² + N^{7/2}m^{−1/2}) (g′ ≤ g; details to be written). □ (non-unit part: sketch, checked numerically by the reader)

## Lemma B (bilinear Kloosterman fractions) — PROVED modulo citation
Let m ≥ 2, (a, m) = 1, 1 ≤ N₁, N₂ ≤ m, |α_i(x)| ≤ 1. Then for all k₁, k₂ ≥ 1 (Bourgain–Garaev, Acta Arith. 164 (2014), proof of Theorem 3, eq. before (5);
verified in PROOFS §23): |Σ_{x₁≤N₁} Σ_{x₂≤N₂} α₁(x₁)α₂(x₂) e_m(a x₁*x₂*)|^{2k₁k₂} ≤ m N₁^{2k₁k₂−2k₁} N₂^{2k₁k₂−2k₂} J_{2k₁}(N₁) J_{2k₂}(N₂).
Corollary B′. For m^{1/3} ≤ N₁, N₂ ≤ m: |Σ α₁α₂ e_m(a x₁*x₂*)| ≪_ε m^ε(N₁N₂)^{15/16}.
 Proof: k₁ = k₂ = 2 and Lemma E: N_i^{7/2}m^{−1/2} ≥ N_i² for N_i ≥ m^{1/3}, so |S|⁸ ≪ m^{1+4ε}(N₁N₂)⁴(N₁N₂)^{7/2}m^{−1} = m^{4ε}(N₁N₂)^{15/2}. □

## Lemma S (separation of u from the Fourier coefficients) — PROVED (sketch-level details marked)
Setting of R1: block U, Y = H/U, admissible d ∈ [Y^{1−δ}, YH^η], 1 ≤ k < d/2, β_k(d, N) := λ(d)ξ_k(d, N)/(2d²), ξ_k(d,N) = (1 − cos(2πkN/d))/sin²(πk/d) (real N).
(i) For u ∈ (U, 2U], replacing G°_d(ū, H/u) by its Fourier form at N(u) = ⌊H/u⌋ costs O(ω(d)) (paper III Step 4b(i)), and replacing ξ_k(d, N(u)) by ξ_k(d, H/u) costs
    ≤ |∂_Nξ_k|/(2d²) ≤ π/(4kd) per term; summed over u ∼ U, d ≤ YH^η, k ≤ K₁: ≪ U(log H)^C.
(ii) Let φ be a fixed smooth bump with Σ_j φ(u/2^j) = 1 on (0, ∞) and F_{k,d}(v) := ξ_k(d, H/v)φ(v/U)/(2d²). Then F_{k,d}(v) = (2π)^{−1}∫ F̃(it)v^{−it}dt with
    ∫|F̃(it)|dt ≪ b_k(d)·(1 + U·sup|F′|/sup|F|)·log H ≪ b_k(d)·H^{3η}, since U·|∂_v ξ_k(d,H/v)|/(2d²) ≤ Y·π/(4kd) and Y/(kd·b_k(d)) ≤ kY^δ + H^η (split d ≤ kY / d > kY),
    k ≤ K₁ = H^{2η}. [Mellin inversion for a C² compactly supported function; the tail in t is controlled by two integrations by parts — standard.]
Consequence: 𝓔′(U) = ∫ Σ_k Σ_d λ(d)F̃_{k,d}(it) Σ_u w(u)u^{−it}1_{(u,d)=1}ρ°_k(d; ū) dt + O(U(log H)^C), and u^{−it} = n₁^{−it}n₂^{−it}n₃^{−it} factors over any
factorisation u = n₁n₂n₃. All later bounds are uniform in t, so the separation costs H^{3η}·log H.

## Lemma R4 (the residual) — PROVED given Lemmas E, B′, S (to be read)
Let a ∈ [0.47, 0.53] (U = H^a), δ, η, δ₃ ≤ 10^{−3}, H ≥ H₀. Let 𝓡 be the part of the u-sum in Lemma S's consequence with u = n₁n₂n₃, weights 1(n₁)χ_D(n₂)γ(n₃),
n₃ ≤ H^{δ₃}, n₁ ∈ (N₁, 2N₁], n₂ ∈ (N₂, 2N₂] with N₁, N₂ ∈ [UY^{−1/2}H^{−3δ}, Y^{1/2}H^{3δ}] (dyadic). Then, uniformly in t,
  Σ_{k≤K₁} Σ_{d} |β_k(d)|·|Σ_{n₁,n₂,n₃} γ(n₃)χ_D(n₂)(n₁n₂n₃)^{−it}1_{(n₁n₂n₃,d)=1} [ρ_k(d; (n₁n₂n₃)*) − ω(d)c_d(k)/φ(d)]| ≪ H^{1−1/40}.
Proof. The mean term: Σ_u |w|·Σ_d |β_k(d)|ω(d)(k,d)/φ(d) ≪ U(log H)^C. Main term: expand ρ_k(d; x*) = Σ_{r∈R_d} e_d(k r x*); with g = (k, d), m = d/g ≥ Y^{1−δ}H^{−2η},
e_d(k r x*) = e_m(a x₁* x₂*) where x₁ = n₁, x₂ = n₂, inverses mod m, and a := (k/g)·r·n₃* (mod m) is a unit ((k/g, m) = 1, r and n₃ units; the condition
(n_i, d) = 1 is put into the coefficients). For fixed (k, d, r, n₃, t) the double sum is Σ_{x₁≤2N₁}Σ_{x₂≤2N₂} α₁(x₁)α₂(x₂)e_m(a x₁*x₂*) with |α_i| ≤ 1
(α₁ = x₁^{−it}1_{x₁>N₁}1_{(x₁,d)=1}, α₂ = χ_D(x₂)x₂^{−it}1_{x₂>N₂}1_{(x₂,d)=1}). Exponents: log N_i/log m ≥ (a − (1−a)/2 − 3δ)/((1−a)(1+η)) ≥ 0.38 > 1/3 and
2N_i ≤ 2Y^{1/2}H^{3δ} ≤ m for a ∈ [0.47, 0.53] and small parameters. Corollary B′: ≪ m^ε(N₁N₂)^{15/16}. Since N₁N₂ ≍ U/n₃ ≥ H^{0.47−δ₃−1}… more precisely
N₁N₂ ≫ U H^{−δ₃}, the double sum is ≪ H^ε(N₁N₂)·(UH^{−δ₃})^{−1/16}. Summing: Σ_{n₃}|γ(n₃)|(U/n₃) ≪ U; Σ_r ≤ ω(d) ≪ H^ε; Σ_d |β_k(d)|ω(d) ≪ H^ε Y/k² (d ≤ kY) + Y
(d > kY) ≪ H^ε Y; Σ_{k≤K₁} ≪ H^{2η}; dyadic boxes ≪ log² H. Total ≪ H^{O(ε+η+δ₃)}·UY·U^{−1/16} ≤ H^{1−0.47/16+O(ε+η+δ₃)} ≤ H^{1−1/40}. □
[Check in the reading: the β_k sum with ω(d); that Corollary B′'s implied constant is uniform in a; the dyadic cut-offs 1_{x_i > N_i} are allowed (α arbitrary).]

## Lemma R2 (Type I in u) — PROVED given Lemma S (to be read)
Setting as R4, with u = n·m′, n ∈ (N, 2N] carrying the smooth weight 1 (or χ_D(n), split into classes mod |D|), |c(m′)| ≤ τ₃(m′) arbitrary, N ≥ Y^{1/2}H^{3δ}. Then uniformly
in t the corresponding part of the u-sum is ≪ H^{1−δ+O(η+ε)}.
Proof. For fixed (k, d, r, m′): Σ_n φ(n/N)n^{−it}1_{(n,d)=1}e_d(k r (nm′)*) with φ smooth; with g = (k,d), m = d/g, it is an incomplete Kloosterman sum modulo m with
unit numerator and smooth weight V(v) = φ(v)v^{−it}·N^{−it}, whose derivatives are ≪ (1+|t|)^J; Lemma kloost of paper III (constants ≪ (1+|t|)²) gives
≪ H^{ε}(1+|t|)²(1 + N/m)m^{1/2} after removing (n, g) by Möbius. The mean term is again trivial (U(log H)^C). Summing over m′ ≤ 4U/N (Σ τ₃ ≪ H^ε U/N), roots,
d with |β_k(d)| and k: ≪ H^{ε+O(η)}·(U/N)·Σ_d |β_k(d)|(d^{1/2} + N d^{−1/2}) ≪ H^{ε+O(η)}((U/N)Y^{3/2} + UY^{1/2}) ≤ H^{1−3δ+O(ε+η)} + H^{1−a/2… }. □
(|t| ≤ H^{3η} up to the Mellin tail.)

## Lemma R3 (Type II in u) — PROVED given Lemma S and paper III Lemma kloost (to be read)
Setting as R4; u = u₁u₂ with u_i ∈ (U_i, 2U_i], U₁U₂ ≍ U, coefficients |a(u₁)|, |b(u₂)| ≤ H^ε (convolutions of 1, χ_D, γ, u^{−it}, coprimality to d). If
H^{3δ} ≤ U₂ ≤ UY^{−1/2}H^{−3δ}, then for each (k, t): B := Σ_d β(d) Σ_{u₁,u₂} a(u₁)b(u₂)1_{(u₁u₂,d)=1}ρ°_k(d; (u₁u₂)*) ≪ H^{O(ε+η)}·(Σ_d|β(d)|/Y)·UY·H^{−3δ/2}.
Proof. Cauchy–Schwarz over (d, u₁) with weight |β(d)|, u₁ made smooth by positivity (V ≥ 1_{[1,2]}):
|B|² ≤ S₁S₂, S₁ = Σ_d|β|Σ_{u₁}|a|² ≪ H^{2ε}U₁Σ_d|β|, S₂ = Σ_d|β|Σ_{u₂,u₂′}|b b′|Σ_{r,r′∈R_d}|Σ_{(u₁,d)=1}V(u₁/U₁)[e_d(kr(u₁u₂)*) − ε_d][e_d(−kr′(u₁u₂′)*) − ε_d]|
(ε_d = c_d(k)/φ(d), |ε_d| ≤ (k,d)/φ(d)). The terms with ε_d are ≪ H^ε Σ_d|β|U₂²((k,d)/φ(d))·(1 + U₁/d)d^{1/2}(k,d)^{1/2} + U₁U₂²(k,d)²/φ(d)²: negligible.
Main terms: the u₁-sum is Σ V(u₁/U₁)e_d(ν u₁*) with ν ≡ k(ru₂* − r′u₂′*) (mod d); Lemma kloost: ≪ τ(d)(1 + U₁/d)d^{1/2}(ν, d)^{1/2}, and trivially ≤ 3U₁.
For p | d, p ∤ k: p | ν ⇔ ru₂′ ≡ r′u₂ (mod p). With e := ∏_{p|d, p∤k, ru₂′≡r′u₂ (p)} p one has (ν, d) ≤ (k,d)e, and for fixed (d, r, r′, u₂) the u₂′ with a given e
satisfy a congruence mod e: ≤ 2U₂/e + 1 of them. Hence
  Σ_{u₂,u₂′,r,r′} min(U₁, (1 + U₁/d)d^{1/2}(ν,d)^{1/2}) ≪ H^ε(k,d)^{1/2}Σ_{e|d}[U₂(U₂/e)(1 + U₁/d)d^{1/2}e^{1/2} + U₂·U₁] ≪ H^{2ε}(k,d)^{1/2}[U₂²(d^{1/2} + U₁d^{−1/2}) + U₁U₂].
(The "+1" solutions use the trivial bound U₁; this covers the diagonal and all degenerate pairs.) With Σ_d |β(d)|(k,d)^{1/2}d^{s} ≪ H^{O(ε+η)}Y^{s}Σ_d|β| for
d ∈ [Y^{1−δ}, YH^η] (|s| ≤ 1/2): S₂ ≪ H^{O(ε+η)}Σ_d|β|·[U₂²Y^{1/2} + U₁U₂²Y^{−1/2} + U₁U₂], so
|B| ≪ H^{O(ε+η)}Σ_d|β|·[U^{1/2}U₂^{1/2}Y^{1/4} + UY^{−1/4} + UU₂^{−1/2}] = H^{O(ε+η)}(Σ_d|β|/Y)·UY·[(U₂Y^{1/2}/U)^{1/2} + Y^{−1/4} + U₂^{−1/2}]
≤ H^{O(ε+η)}(Σ_d|β|/Y)·UY·H^{−3δ/2}. No assumption U₁ ≤ d is needed. □

## Lemma R1 (reduction) — collects paper III and PROOFS §9 (to be read)
For a block U ∈ [H^{0.47}, H^{0.53}]: Σ_{U<u≤2U} w(u)𝒫_u(H/u) = Σ_u w(u)Σ_{d′}(λ/d′)Ḡ_{d′}(H/u) + Σ_{k≤K₁}𝓔′_k(U) + O(H^{1−η+3ε′} + UY^{1−δ}H^ε + U(log H)^C) with:
Ḡ-part ≪ Σ_u|w|(log Y)^C ≪ U(log H)^C (paper III, after (MH)); moduli d′ > YH^η: paper III Step 3 (valid for every U); moduli d′ ≤ Y^{1−δ}: |(λ/d′)G°| ≤ |λ|ω(1+σ/(8d′φ));
frequencies k > K₁ = H^{2η}: Step 4b(ii); the real-Y correction and the passage to Lemma S's Mellin form: Lemma S (i)–(ii).

## Lemma R5 (covering) — PROVED (to be read)
Write w = c_f(1 * χ_D * γ) (paper III, Lemma AP's proof; for ω(2) = 1 the shift u = 2u′ as in paper III), Σ_n |γ(n)|n^{−1/2−ε} < ∞, |γ(n)| ≪ τ(n)^{O(1)}. The n₃ > H^{δ₃}
part is ≪ UY·H^{−δ₃/3} trivially. Decompose n₁, n₂, n₃ ≤ H^{δ₃} dyadically (N₁, N₂, N₃). Let δ₃ ≤ δ. For a ∈ [0.47, 0.53]:
 (I) N₁ ≥ Y^{1/2}H^{3δ} or N₂ ≥ Y^{1/2}H^{3δ}: Lemma R2 (cofactor coefficient ≤ τ₃·|γ|).
 (II) otherwise, if one of N₁, N₂ lies in W := [H^{3δ}, UY^{−1/2}H^{−3δ}]: Lemma R3 with U₂ that atom (times n₃, which moves it by ≤ H^{δ₃}; shrink W by H^{δ₃} if needed).
 (III) otherwise: if N₂ < H^{3δ} then N₁ ≫ UH^{−3δ−δ₃} ≥ Y^{1/2}H^{3δ} (as U/Y^{1/2} ≥ H^{0.205}), contradicting "otherwise" — so N₂ ≥ UY^{−1/2}H^{−3δ} and likewise N₁;
     both lie in [UY^{−1/2}H^{−3δ}, Y^{1/2}H^{3δ}]: Lemma R4. (For U ≥ YH^{6δ+δ₃} case (III) is empty.)
CONCLUSION (Theorem M, modulo the readings): with η = δ/10, δ₃ = δ, δ = 10^{−3}: each block's G°-part is ≪ H^{1−δ} (R2: H^{1−3δ+O(η)}; R3: H^{1−3δ/2+O(η)}; R4: H^{1−1/40};
losses H^{3η} (Lemma S) and H^{2η} (k-sum) included), and there are O(log H) blocks.

## Original target list (superseded by the lemmas above; kept for reference)
 R1 (reduction). For a block U ∈ [H^{0.47}, H^{0.53}], Y = H/U: Σ_{U<u≤2U} w(u)𝒫_u(H/u) = Σ w(u)Σ_{d′}(λ/d′)Ḡ + 𝓔′(U) + O(H^{1−δ}), with Σ(λ/d′)|Ḡ| ≪ (log Y)^C per piece
     (paper III after (MH)) and 𝓔′ the G°-part restricted to d′ ∈ [Y^{1−δ}, YH^η], k ≤ H^{2η}, with the Fourier coefficients separated from u by a smooth partition /
     Mellin transform at a loss ≤ H^{3η} (PROOFS §19 (A), §9 Step 4′(a)–(c), paper III Step 4b (i)–(iii)).
 R2 (Type I in u). A smooth (or χ_D-periodic) atom of length N ≥ Y^{1/2}H^{2δ} gives a saving H^{−δ+O(η)} (PROOFS §12.2, §24; paper III Lemma kloost).
 R3 (Type II in u). Coefficients factoring as u = u₁u₂ with U₂ ∈ [H^{2δ}, min(Y, U Y^{−1/2})H^{−2δ}] give a saving H^{−δ+O(η)} (PROOFS §12.3 with §16's degenerate
     pairs written out, §24 for U₁ > d).
 R4 (residual). If both atoms of u = n₁n₂n₃ (weights 1, χ_D, γ; n₃ ≤ H^{δ₃}) lie in (U Y^{−1/2}H^{−2δ}, Y^{1/2}H^{2δ}), then for a ∈ [0.47, 0.53] both are ≥ d^{1/3}
     (for d ∈ [Y^{1−δ}, YH^η] and δ, η, δ₃ small) and Corollary B′ applied for each (d, k, root r) with a = (k/g)r n₃* modulo d/g gives a saving
     (N₁N₂)^{−1/16}H^{O(η)} ≤ H^{−(0.47/16)+O(δ+η+δ₃)}.
 R5 (covering). w = 1 * χ_D * γ with Σ|γ(n)|n^{−1/2−ε} < ∞ (paper III Lemma AP proof) and the three cases above exhaust the blocks (PROOFS §12.4, §24).
 With δ = η = δ₃ = 10^{−4}, all savings exceed the losses; δ(M) ≍ 10^{−4}.

## REVISION 1 (16 Sep, after the reading of the draft — PROOFS §28). The following SUPERSEDE the corresponding text above.
E (non-unit λ, squarefree m): if p | (λ, m) then x ≡ −y (mod p); with g = gcd(λ, m), Step 1 modulo m/g (or J₂ ≤ N when N > m/g) gives J₂(λ) ≪ m^ε(g^{1/2}N^{3/2}m^{−1/2} + 1),
 and Σ_{g≤2N}Σ_{gcd(λ,m)=g}J₂(λ)² ≤ Σ_g max J₂·N(2N/g + 1) closes the bound. □
S (ii) CORRECTED: the per-term statement "∫|F̃| ≪ b_k(d)H^{3η}" is false (F̃ lives at |t| ≍ kY/d, up to H^{2η}Y^{δ}). Correct form: ∫|F̃_{k,d}(it)|dt ≪ (b_k(d) + Y/(kd))·log H,
 and ∫|F̃_{k,d}(it)|(1 + |t|)^J dt ≪ (b_k(d) + Y/(kd))·T₀^J·log H with T₀ = 1 + kY/d + H^κ. RULE: never use a per-term loss — sum first:
 Σ_{k≤K₁}Σ_d |λ|ω(d)∫|F̃_{k,d}| ≪ H^ε Y log²H. R3 and R4 depend on d only through bounds uniform in d, so for them the separation costs H^ε.
 Also: factor 4 in U·H/v² (v ≥ U/2), the 1/(2π) in the consequence; b_k(d) (with 2Y) majorises sup|F| for all d.
ENDPOINTS: use the smooth partition from R1 on (d-cutoffs per j, H/u ∈ [Y/2, 2Y]); at u = H^{0.47} and H^{0.53} use a ramp of relative width H^{−κ}, κ ≤ δ/2; the transition
 zone is trivially ≪ H^{1−κ}(log H)^C; inside F this gives T₀ ≤ max(kY/d, H^κ): R2 loses H^{3κ}, R3/R4 only logs.
R2 CORRECTED: with (1 + |t|)² from Lemma kloost and the moment above, the d ≤ kY part gives k·Y^{3/2+3δ/2}; summed over k ≤ K₁: (U/N)K₁²Y^{3/2}Y^{3δ/2}, i.e. a saving
 H^{−3δ+4η+1.5(1−a)δ} ≈ H^{−1.8δ} at a = 0.47 (plus H^{3κ}). Typos: H^{1−a/2} → H^{1−(1−a)/2}; N·m^{−1/2} ≤ N k^{1/2}d^{−1/2}.
R3: "+1" made precise: for e ≤ 2U₂ the u₂′ count is ≤ 4U₂/e; for e > 2U₂ there are ≤ 2τ(d) values, each bounded by 3U₁ (this includes the diagonal and degenerate pairs, as
 d > 2U₂). Loss (k,d)^{1/2} ≤ H^η; the d^{−1/2} term loses Y^{δ/2} (harmless). Numerically (reader): ratio ≤ 0.28 over 40 random cases incl. U₁ > d, (k,d) > 1.
R4: Σ_{d≤kY}|β_k|ω ≪ H^ε Y/k (total H^εY/k; the k-sum costs log H). Boxes (N₁, N₂, N₃) with N₁N₂N₃ ≉ U are dropped before absolute values (they vanish); N₃ dyadic.
 Exponents checked numerically over a ∈ [0.47, 0.53]: log N_i/log m ≥ 0.381, 2N_i ≤ m, saving a/16 ≥ 0.0294 > 1/40 + O(ε + η + δ₃).
R5: smooth dyadic partitions for n₁, n₂ (R2 needs smoothness); "times n₃" in (II) unnecessary; for non-fundamental D use the primitive character mod the conductor and put
 the difference into γ; ω(2) = 1: u = 2u′, 2* into the numerator, 2^{−it} factors out, the Euler factor at 2 into γ; |γ(n)| ≤ 20^{ω(n)}.
CONCLUSION CORRECTED: losses are Step 3 H^{1−η+3ε′}; k > K₁: H^{1−η}; moduli d′ ≤ Y^{1−δ}: H^{1−(1−a)δ+ε} ≤ H^{1−0.47δ}; n₃ > H^{δ₃}: H^{1−δ₃/3}; savings R2 ≈ H^{−1.8δ}, R3 ≈ H^{−1.5δ+0.75η},
 R4 H^{−1/40}. With δ = 10^{−3}, η = δ/10, δ₃ = δ, ε′ = η/6, κ = δ/2: δ_M = η/2 = 5·10^{−5}. All savings exceed all losses. □ (Theorem M: complete after these fixes,
 per the reading; a second reading of the revised text is due.)
