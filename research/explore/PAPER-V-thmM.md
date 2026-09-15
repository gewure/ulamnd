# Theorem M — merged text v2 (16 Sep 2026). Supersedes PAPER-V-draft.md (kept as history). Two readings: PROOFS §28 (complete after fixes, revision 1) and
# the second reading (complete after fixes, PROOFS §30); all findings of both merged here. No human check.

Notation as in paper III: f monic irreducible quadratic without fixed prime divisor, discriminant D; admissible moduli d (squarefree, all primes split, coprime to 2D and to u);
pieces 𝒫_u(Y), Y = H/u; w(u) = P(1)λ(u)ω(u) (supported on squarefree u); G_d, Ḡ_d, G°_d = G_d − Ḡ_d (paper III (eq:G)); x* the inverse modulo the modulus in question;
e_m(z) = e(z/m); ρ_k(d; a) = Σ_{r∈R_d} e_d(kar), ε_d(k) = c_d(k)/φ(d); ξ_k(d, N) = (1 − cos(2πkN/d))/sin²(πk/d) for real N; b_k(d) = min(1/(4k²), π²(2Y)²/(4d²)).
Parameters: δ = 10^{−3}, η = δ/10, δ₃ = δ, ε′ = η/7, κ = δ/2, K₁ = H^{2η}; "≪" constants depend on f and these parameters; ε > 0 arbitrarily small.

## Theorem M
Σ_{H^{0.47} < u ≤ H^{0.53}} w(u)𝒫_u(H/u) ≪ H^{1−δ_M} for every δ_M < η/2. With paper III Theorem typeII at ε = 0.03 (which covers u > H^{0.53}, including u > H, with the
complementary sharp cut-off): Σ_{u > H^{0.47}} w(u)𝒫_u(H/u) = c_off(f)H + O(H^{1−δ_M}).

## Lemma K (smooth incomplete Kloosterman sums; paper III Lemma kloost, restated)
Let q ≥ 1 squarefree, a ∈ Z, X > 0, W smooth, supported in an interval of length ≤ 4X, with ∫|W″| ≪ T²/X and ‖W‖_∞ ≪ 1 (T ≥ 1). Then
Σ_{(v,q)=1} W(v)e_q(av*) ≪ τ(q)(1 + X/q)T²q^{1/2}(a, q)^{1/2}. Proof: paper III's Poisson argument; |Ŵ(ξ)| ≪ min(X, T²/(X|ξ|²)). □

## Lemma E (energy of reciprocals, squarefree modulus)
Let m ≥ 2 squarefree, 1 ≤ N ≤ m, J₄(N) = #{x ∈ [1,N]⁴ : (x_i, m) = 1, x₁* + x₂* ≡ x₃* + x₄* (mod m)}. Then J₄(N) ≪_ε m^ε(N² + N^{7/2}m^{−1/2}).
Step 1. For (λ, m) = 1, K ∈ Z, 1 ≤ M ≤ m: #{(x, y) ∈ (K, K+M]² : xy ≡ λ (mod m)} ≪_ε m^ε(M^{3/2}m^{−1/2} + 1).
 If M = 1 this is trivial. Otherwise put x = K + x′, y = K + y′ (1 ≤ x′, y′ ≤ M), b := λ − K², T := ⌊(m/M)^{1/2}⌋ ≥ 1. Dirichlet gives 1 ≤ t ≤ T and u₀ with tK ≡ u₀ (mod m),
 |u₀| ≤ min(m/T, m/2) (least absolute residue). Then tx′y′ + u₀x′ + u₀y′ ≡ b₀ (mod m) with b₀ ≡ tb, |b₀| < m/2, so tx′y′ + u₀x′ + u₀y′ = b₀ + zm, |z| ≤ TM²/m + 2M/T + 1/2
 ≤ 5M^{3/2}m^{−1/2} + 1/2. For each z, (tx′ + u₀)(ty′ + u₀) = n_z := t(b₀ + zm) + u₀², |n_z| ≤ 7m². Since n_z ≡ t²(x′ + K)(y′ + K) ≡ t²λ (mod m), (λ, m) = 1 and
 1 ≤ t² ≤ m/M < m, m ∤ n_z, so n_z ≠ 0 and (x′, y′) is determined by one of ≪ m^ε factorisations of n_z. Summing over z gives the claim. □
Step 2. J₄ = Σ_λ J₂(λ)², J₂(λ) = #{x, y ≤ N, units : x* + y* ≡ λ}, Σ_λ J₂(λ) = N′² ≤ N². Unit λ: x* + y* ≡ λ ⇔ (x − λ*)(y − λ*) ≡ λ*² (mod m), a unit hyperbola in the
 square box (−λ*, N − λ*]², so J₂(λ) ≪ m^ε(N^{3/2}m^{−1/2} + 1). Non-unit λ, g := gcd(λ, m) > 1: for p | g, x* ≡ −y* (mod p), i.e. x ≡ −y (mod p); so x ≡ −y (mod g) and,
 modulo m/g, λ is a unit: if N ≤ m/g, Step 1 modulo m/g gives J₂(λ) ≪ m^ε(g^{1/2}N^{3/2}m^{−1/2} + 1); if N > m/g, J₂(λ) ≤ N. Also Σ_{gcd(λ,m)=g}J₂(λ) ≤ N(2N/g + 1)
 and g ≤ 2N. Hence Σ_λJ₂(λ)² ≤ N²·max_{unit}J₂ + Σ_{g|m, 1<g≤2N} max J₂·N(2N/g + 1) ≪ τ(m)m^ε(N^{7/2}m^{−1/2} + N²) (for N > m/g: ≤ 4N⁴/m ≤ N^{7/2}m^{−1/2}). □

## Lemma B (Bourgain–Garaev) and Corollary B′
For m ≥ 2, (a, m) = 1, 1 ≤ N_i ≤ m, |α_i| ≤ 1 supported on units, k₁, k₂ ≥ 1:
|Σ_{x₁≤N₁}Σ_{x₂≤N₂}α₁(x₁)α₂(x₂)e_m(ax₁*x₂*)|^{2k₁k₂} ≤ m N₁^{2k₁k₂−2k₁}N₂^{2k₁k₂−2k₂}J_{2k₁}(N₁)J_{2k₂}(N₂) [Acta Arith. 164 (2014), proof of Theorem 3 (5); valid for
composite m]. B′: for squarefree m and m^{1/3} ≤ N₁, N₂ ≤ m, with k₁ = k₂ = 2 and Lemma E: |Σ| ≪_ε m^ε(N₁N₂)^{15/16}. □

## Step R1 — reduction to smooth blocks and Mellin form
Let φ be a smooth partition of unity on (0, ∞) into dyadic bumps, and ψ a smooth cut-off equal to 1 on [H^{0.47}(1 + H^{−κ}), H^{0.53}] and 0 outside [H^{0.47}, H^{0.53}(1 + H^{−κ})],
with derivatives of relative scale H^{−κ}. The transition zones contain ≪ H^{0.53−κ} values of u, contributing ≪ H^{1−κ}(log H)^C trivially (|𝒫_u(Y)| ≪ Y). A block is
v ↦ φ_j(v)ψ(v), U := 2^j ∈ [H^{0.47}/4, 2H^{0.53}], Y := H/U; so a := log U/log H ∈ [0.46, 0.54] for H ≥ H₀. For one block:
 (a) Ḡ-part: Σ_{d′}(λ/d′)|Ḡ_{d′}(H/u)| ≪ (log Y)^C (paper III, after (eq:MH)): ≪ U(log H)^C.
 (b) Moduli d′ > YH^η: paper III Step 3 (valid for every U): ≪ H^{1−η+3ε′} = H^{1−4η/7}.
 (c) Moduli d′ ≤ Y^{1−δ}: |(λ/d′)G°| ≤ |λ|ω(1 + σ/(8d′φ)), Shiu: ≪ UY^{1−δ}.
 (d) For Y^{1−δ} < d ≤ YH^η: Fourier form at N(u) = ⌊H/u⌋ (paper III Lemma finfourier, folded 0 < k < d/2; the term k = 0 cancels exactly since R_d is symmetric and
     0 ∉ R_d), cost O(ω(d)) per (u, d) for real H/u; frequencies k > K₁: ≪ UYH^η/K₁ = H^{1−η}; replacing ξ_k(d, N(u)) by ξ_k(d, H/u) costs π/(4kd) per term: ≪ U(log H)^C.
     Since d ≥ Y^{1−δ} > 2K₁, (k, d) ≤ K₁ < d.
 (e) Mellin: F_{k,d}(v) := λ(d)ξ_k(d, H/v)φ_j(v)ψ(v)/(2d²) = (2π)^{−1}∫F̃_{k,d}(it)v^{−it}dt, and with T₀ := 1 + kY/d + H^κ:
     ∫|F̃_{k,d}(it)|(1 + |t|)^J dt ≪_J |λ(d)|·(Y/(kd))·T₀^J·log H (J = 0, 1, 2)
     [|F̃(it)| ≤ TV(F)/|t| for |t| ≤ T₀ (total variation ≪ |λ|Y/(kd), using b_k ≤ π²Y/(kd)), and J + 2 integrations by parts beyond T₀]. In particular
     Σ_{k≤K₁}Σ_d |λ|ω(d)∫|F̃_{k,d}| ≪ Y(log H)³.
 Hence the block equals O(errors) + (2π)^{−1}∫Σ_{k≤K₁}Σ_d F̃_{k,d}(it)·𝒮_{k,d}(t)dt, 𝒮_{k,d}(t) := Σ_u w(u)u^{−it}1_{(u,d)=1}[ρ_k(d; u*) − ω(d)ε_d(k)].
 The mean terms ω(d)ε_d(k)Σ_u… are ≪ Σ_{k,d}|λ|(Y/(kd))ω(k,d)/φ(d)·U ≪ UY^{δ}(log H)^C — harmless.

## Step R5 — decomposition and covering
w = c_f(1 * χ * γ) with χ the primitive character attached to Q(√D) (for ω(2) = 1: u = 2u′, the factor 2* goes into the numerator, 2^{−it} factors out, the Euler factor at 2
into γ; non-fundamental D: the difference into γ); γ multiplicative, γ(p) ≪ 1/p, |γ(p²)| ≤ 19, |γ(n)| ≤ 20^{ω(n)}, Σ|γ(n)|n^{−1/2−ε} < ∞. The n₃ > H^{δ₃} part is
≪ UYH^{−δ₃/2+ε} (trivial bound before Mellin). Smooth dyadic partitions for n₁ (weight 1), n₂ (weight χ, split into classes mod the conductor), n₃ ≤ H^{δ₃} (dyadic, weight γ);
boxes with N₁N₂N₃ ≉ U vanish and are dropped before absolute values. Cases (a ∈ [0.46, 0.54]):
 (I) N₁ ≥ Y^{1/2}H^{3δ} or N₂ ≥ Y^{1/2}H^{3δ}: R2.  (II) otherwise, N₁ or N₂ ∈ W := [H^{3δ}, UY^{−1/2}H^{−3δ}]: R3 with U₂ that atom.
 (III) otherwise: if N₂ < H^{3δ} then N₁ ≫ UH^{−3δ−δ₃} ≥ Y^{1/2}H^{3δ} (U/Y^{1/2} ≥ H^{0.19}), contradiction; so both N_i ∈ [UY^{−1/2}H^{−3δ}, Y^{1/2}H^{3δ}]: R4.
 (For U ≥ YH^{6δ+δ₃}, case (III) is empty.) The covering is exhaustive with margins ≥ 0.19.

## Step R2 — Type I
Box with n of size N ≥ Y^{1/2}H^{3δ} carrying 1 (or χ restricted to a class mod the conductor), cofactor coefficient ≤ 20^{ω}τ₃. For fixed (k, d, r, cofactor m′, t), with
g = (k, d), m = d/g: Σ_n W(n)e_m((k/g)r(nm′)*) with W(n) = φ(n/N)n^{−it}1_{(n,g)=1}-part (Möbius over e | g) — Lemma K with T = 1 + |t|, X = N: ≪ H^ε(1 + |t|)²(1 + N/m)m^{1/2}.
Summing over m′ ≤ 4U/N, roots, d with ∫|F̃|(1 + |t|)², k ≤ K₁: ≪ H^{ε}(U/N)Σ_{k,d}|λ|(Y/(kd))T₀²(d^{1/2} + Nk^{1/2}d^{−1/2}) ≪ H^{ε+4η}Y^{3δ/2+2κ}((U/N)Y^{3/2} + UY^{1/2+δ/2}),
≤ UY·H^{−3δ+4η+1.5(1−a)δ+2κ+ε} + UY^{1/2+O(δ)}. At a = 0.46: saving H^{−1.19δ}·… ≥ H^{−δ} — positive for all a ∈ [0.46, 0.54]. [Second reading: ≥ 1.45δ with J = 2 ramp cost.]

## Step R3 — Type II
Coefficients a(u₁), b(u₂) of size ≤ H^ε (including u^{−it}; t does not enter the bound), U₂ ∈ W. For fixed (k, t), weight β(d) := F̃_{k,d}(it) (|β| integrable as in R1(e)):
Cauchy–Schwarz over (d, u₁) with weight |β|, u₁ extended to a smooth majorant V of relative width 1 on (N₁N₃/4, 4N₁N₃] (Lemma K allows this support):
|B|² ≤ S₁S₂, S₁ ≪ H^{2ε}U₁Σ_d|β|. In S₂ the ε_d-terms are negligible; the main u₁-sums are Σ V e_d(νu₁*), ν ≡ k(ru₂* − r′u₂′*), bounded by
min(3U₁, τ(d)(1 + U₁/d)d^{1/2}(ν, d)^{1/2}) with (ν, d) = (k, d)·e, e := ∏_{p|d, p∤k, ru₂′≡r′u₂ (p)} p. For fixed (d, r, r′, u₂): if e ≤ 2U₂ there are ≤ 4U₂/e values of u₂′
with that e; if e > 2U₂, ≤ 1 per e, bounded by 3U₁ (this contains the diagonal and all degenerate pairs, since d/(k, d) > 2U₂). Hence
S₂ ≪ H^{O(ε+η)}Σ_d|β|·[U₂²(d^{1/2} + U₁d^{−1/2}) + U₁U₂] ≪ H^{O(ε+η)}Y^{δ/2}Σ_d|β|·[U₂²Y^{1/2} + U₁U₂²Y^{−1/2} + U₁U₂], and
|B| ≪ H^{O(ε+η)}Y^{δ/4}Σ_d|β|·UY^{0}·[(U₂Y^{1/2}/U)^{1/2} + Y^{−1/4} + U₂^{−1/2}] ≪ (Σ_d|β|)·U·H^{−3δ/2+O(η)}Y^{δ/4}. Summing Σ_{k}Σ_d|β| ≪ Y(log H)³: ≪ UY·H^{−1.43δ} (second reading). □

## Step R4 — residual
Both N_i ∈ [UY^{−1/2}H^{−3δ}, Y^{1/2}H^{3δ}], a ∈ [0.46, 0.54]. For fixed (k, d, r, n₃, t), with g = (k, d), m = d/g (squarefree, m ≥ Y^{1−δ}H^{−2η}), the numerator
(k/g)·r·n₃* is a unit mod m and the double sum is Σ_{x₁≤2N₁}Σ_{x₂≤2N₂}α₁α₂e_m(a x₁*x₂*) with |α_i| ≤ 1 supported on units (coprimality and dyadic cut-offs inside α).
log N_i/log m ≥ 0.38 > 1/3 and 2N_i ≤ m, so Corollary B′ gives ≪ m^ε(N₁N₂)^{15/16} ≤ H^ε(N₁N₂)·(UH^{−δ₃})^{−1/16}. Summing: Σ_{n₃}|γ|, Σ_r ≤ ω(d), Σ_{k,d}∫|F̃| ≪ Y(log H)³:
≪ H^{O(ε+δ₃)}UY·U^{−1/16} ≤ UY·H^{−0.028}. □

## Conclusion
Per block the errors are: R1(b) H^{1−4η/7}; R1(d) H^{1−η}; R1(c) UY^{1−δ} ≤ H^{1−0.46δ}; mean terms UY^δ; n₃-tail H^{1−δ₃/2+ε}; ramp H^{1−κ}(log H)^C; R2 ≤ UY·H^{−1.19δ};
R3 ≤ UY·H^{−1.43δ}; R4 ≤ UY·H^{−0.028}. With O(log H) blocks, the total is ≪ H^{1−4η/7}log H ≪ H^{1−δ_M} for every δ_M < 4η/7 (in particular δ_M = η/2 = 5·10^{−5}). □
