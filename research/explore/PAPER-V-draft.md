# Paper V — working draft of rigorous statements (started 15 Sep 2026, late night). NOT READ. Lemmas marked PROVED have complete proofs here;
# everything else is a precise target with a pointer to the heuristic derivation in PROOFS-uniform.md.

Notation as in paper III (f monic irreducible quadratic without fixed prime divisor, discriminant D; pieces 𝒫_u(Y); w(u) = P(1)λ(u)ω(u);
G°_{d′} = G_{d′} − Ḡ_{d′}; x* the inverse of x modulo the modulus in question; e_m(z) = e(z/m)).

## Target theorem (M): the pieces around u = H^{1/2}
For every f as in paper III there is δ > 0 with Σ_{H^{0.47} < u ≤ H^{0.53}} w(u) 𝒫_u(H/u) = c_off(f)·H·ι + O(H^{1−δ}), where ι is the part of the main term
carried by these u (≪ H^{1/2+ε}, see PROOFS §12.0; equivalently the pieces with u ∈ (H^{0.47}, H^{1/2+ε}] contribute O(H^{1−δ}) and paper III Theorem typeII
covers the rest). Consequence (with paper III): Σ_{u > H^{0.47}} w(u)𝒫_u(H/u) = c_off H + O(H^{1−δ}).
[Heuristic basis: PROOFS §12, §15, §19, §20, §23, §24. Readings: §16, §19, §21, §23.]

## Lemma E (energy of reciprocals, every modulus) — PROVED (Cilleruelo–Garaev's argument; checked by a reading, PROOFS §23)
Let m ≥ 2, 1 ≤ N ≤ m, J₄(N) = #{(x₁,…,x₄) ∈ [1,N]⁴ : (x_i, m) = 1, x₁* + x₂* ≡ x₃* + x₄* (mod m)}. Then for every ε > 0, J₄(N) ≪_ε m^ε(N² + N^{7/2}m^{−1/2}).
Step 1 (hyperbola in a square box, unit λ). For (λ, m) = 1, K ∈ Z, 1 ≤ M ≤ m: I(λ; K, M) := #{(x, y) ∈ (K, K+M]² : xy ≡ λ (mod m)} ≪_ε m^ε(M^{3/2}m^{−1/2} + 1).
 Proof. Write x = K + x′, y = K + y′, 1 ≤ x′, y′ ≤ M: x′y′ + Kx′ + Ky′ ≡ b := λ − K² (mod m). Let T = ⌊(m/M)^{1/2}⌋ ≥ 1. By Dirichlet there are 1 ≤ t ≤ T and
 u₀ ∈ Z with tK ≡ u₀ (mod m), |u₀| ≤ m/T. Multiplying by t: tx′y′ + u₀x′ + u₀y′ ≡ b₀ (mod m) with b₀ ≡ tb, |b₀| < m/2; so tx′y′ + u₀x′ + u₀y′ = b₀ + zm with
 |z| ≤ TM²/m + 2M/T + 1/2 ≤ 5M^{3/2}m^{−1/2} + 1/2 (using T ≤ (m/M)^{1/2} and T ≥ (m/M)^{1/2}/2). For each z: (tx′ + u₀)(ty′ + u₀) = n_z := t(b₀ + zm) + u₀².
 Here n_z ≡ t²(x′ + K)(y′ + K) = t²xy ≡ t²λ (mod m); since λ is a unit and 1 ≤ t² ≤ m/M < m (if M ≥ 2; M = 1 is trivial), m ∤ t²λ, so n_z ≠ 0. As
 |n_z| ≤ TM²·T + … ≤ 4m² (say), the number of factorisations, hence of (x′, y′), is ≪_ε m^ε for each z. Summing over the ≪ M^{3/2}m^{−1/2} + 1 values of z gives the claim. □
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

## Remaining lemmas for (M) (targets; heuristic derivations cited)
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
