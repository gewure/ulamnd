# Lemma A‴: Lemma A″ at determinant P·h (the O1 case), in general form

Written 16 Sep. NOT YET READ. This discharges the item recorded in PROOFS §43 as
"(i) Lemma A″ at determinant p h for the O1 case", and, in the general form given here, also the two
cases O1 left open in one line each ("two special primes dividing u", "non-fundamental D with p² | D").

## 0. The content-removal normal form (general)

D < 0 is fixed; u is squarefree and in the support of w; Q_u(x, y) = u²x² + |D|y². Put

  c := gcd(u², |D|)   (the content of Q_u),  a := u²/c,  h := |D|/c.

Since u is squarefree, v_p(c) = min(2, v_p(D)) ∈ {0, 1, 2}, so c factors uniquely as

  c = P·s²,  P := ∏_{p | u, v_p(D) = 1} p  (squarefree),  s := ∏_{p | u, v_p(D) ≥ 2} p,  (P, s) = 1, P s | u.

Write u′ := u/(Ps). Then

  a = P u′²,  h = |D|/(P s²),  gcd(a, h) = 1,  h₀ := P h = |D|/s²,  h₀ = O_D(1),  P ∥ h₀.

Three facts used below, all immediate from this normal form:
 (i) (u′, 2h₀) = 1. A prime q | u′ has q | u and v_q(c) = 0, hence q ∤ D, hence q ∤ h₀ (h₀ | |D|); and
     q ≠ 2 because by O2 either D is odd and w is supported on odd u, or D is even and the prime 2 is
     already inside s (4 | D there), so 2 ∤ u′ in both branches.
 (ii) P ∥ h₀: for p | P, v_p(s) = 0, so v_p(h₀) = v_p(D) = 1.
 (iii) P ≪_D 1 and h₀ ≪_D 1: both divide |D|.

The case P = 1, s = 1 is Lemma A″ itself (a = u², h = |D|). The case P = 1, s = 2 is O2's even branch
(a = u′², h = |D|/4). The new content is P > 1.

## Lemma A‴

Let D < 0 be fixed and let (a, h) = (P u′², |D|/(P s²)) be as in §0. Put
  F := S_{a,h}(1) = {g = (A B; B C) : AC − B² = ah, a | B, a | C},
a Γ₀(a)-invariant set of positive definite forms, and for Z ≥ 1

  off(a; Z) := Σ_{g₂ ∈ Γ₀(a)\F} Σ_{g₁ ∈ F, g₁ ≠ g₂, u(g₁,g₂) ≤ Z} (1 + u(g₁,g₂))^{−1/2},

u(·,·) the point-pair invariant, orbits counted with the SL₂(Z)-stabiliser weights |Γ_g|^{−1} ≤ 1. Then

  off(a; Z) ≪_{D,ε} (Z u)^{ε} (1 + Z^{1/2})   uniformly in u.

(No factor h^{O(1)}: here the undilated determinant h₀ is O_D(1), not a growing parameter.)

## Proof

Steps (1), (2), (4) are Lemma A″'s steps (1), (2), (4) verbatim with h replaced by h₀ and u by u′.
Only step (3)(b) — the primes p | P — is new.

(1) UNDILATION. δ := diag(1, 1/u′), G := δgδ. For g ∈ F write B = aB₁ = P u′²B₁, C = aC₁ = P u′²C₁; then
   G = (A, P u′ B₁; P u′ B₁, P C₁),  det G = ah/u′² = P h = h₀,
so G ranges bijectively over
   F′ := {G ∈ S_{h₀} : P u′ | B_G, P | C_G}.
Conjugation: for γ = (α β; γ' δ') ∈ Γ₀(a), δγδ^{−1} = (α, u′β; γ'/u′, δ'), and a = P u′² | γ' gives
P u′ | γ'/u′; conversely every such matrix arises. Hence
   δ Γ₀(a) δ^{−1} = {γ : u′ | b, P u′ | c} = Γ₀(P) ∩ Γ₀⁰(u′),
using (P, u′) = 1. (This is O1's group, NOT Γ₀⁰(u′) — §37(7).) The map is an isometry of the associated
points of H, and ⟨g₁,g₂⟩ := A₁C₂ + A₂C₁ − 2B₁B₂ satisfies ⟨g₁,g₂⟩ = u′²⟨G₁,G₂⟩ =: u′²N, with
1 + 2u(g₁,g₂) = cosh d = N/(2h₀). Hence N ∈ Z, N > 2h₀ for g₁ ≠ g₂, and
   off(a; Z) = (1/√2) Σ_{2h₀ < N ≤ 2h₀(1+2Z)} (N/(2h₀) − 1)^{−1/2} · P_u(N),
   P_u(N) := #{(Γ₀(P) ∩ Γ₀⁰(u′))-orbits of ordered pairs (G₁,G₂) ∈ F′², ⟨G₁,G₂⟩ = N}  (stabiliser weights).

(2) LIFT TO LEVEL ONE. The stabiliser in SL₂(Z) of a pair of distinct points of H is ±I, so every such
orbit lies in a unique SL₂(Z)-orbit of pairs of determinant-h₀ forms with ⟨G₁,G₂⟩ = N, and
   P_u(N) = Σ_{O} #{τ ∈ (Γ₀(P) ∩ Γ₀⁰(u′))\SL₂(Z) : τ.G₁ ∈ F′, τ.G₂ ∈ F′}
over the P₁(N) := #{such SL₂(Z)-orbits} classes, evaluated at any representative. The bound of A″(2)
   P₁(N) ≪ (h₀N)^{o(1)} h₀^{1/2} ≪_D N^{o(1)}
(take G₂ among the ≪ h₀^{1/2+o(1)} reduced forms of determinant h₀; for each, W := 2h₀G₁ − N G₂ lies in
the rank-2 lattice G₂^⊥ with −det W = h₀(N² − 4h₀²), and representations of a fixed integer by a definite
binary lattice are ≪ (h₀N)^{o(1)}) now has h₀ = O_D(1), so the h₀^{1/2} is absorbed into the D-constant.

(3) LOCAL COUNT. (P, u′) = 1 and both conditions are congruence conditions, so by CRT
   (Γ₀(P) ∩ Γ₀⁰(u′))\SL₂(Z) ≅ ∏_{p | P} Γ₀(p)\SL₂(F_p) × ∏_{p | u′} T_p\SL₂(F_p),
and the count factors. Parametrise cosets by the rows of τ as in A″(3): the class of τ in T_p\SL₂(F_p) is
the ordered pair of distinct lines (L₁, L₂) ⊂ F_p² spanned by its rows (up to (t, t^{−1})), the class in
Γ₀(p)\SL₂(F_p) is the second row L₂ ∈ P¹(F_p); and p | B(τ.G) reads L₁ ⊥_G L₂, p | C(τ.G) reads
L₂ ⊥_G L₂, i.e. Q_G(L₂) ≡ 0 (p).

 (a) p | u′ (so p ∤ 2h₀ by §0(i)). The condition is u′ | B only, and this is A″(3) verbatim with h ↦ h₀:
     for one form c_p(G) = p − χ_{−h₀}(p); for a pair, L₂ must be an eigenline of G₂^{−1}G₁, whose
     characteristic polynomial is λ² − (N/h₀)λ + 1, so c_p(G₁,G₂) ≤ 2 unless G₂^{−1}G₁ is scalar mod p —
     in which case G₁ ≡ λG₂ (p) with λ ≡ ±1, so p² | det(G₁ − λG₂) = h₀ − λN + λ²h₀ and hence
     p² | N² − 4h₀², and there c_p ≤ p + 1 ≤ 2p. Therefore
       ∏_{p | u′} c_p ≤ 4^{ω(u′)}·g₂(N),  g₂(N) := ∏_{p | u′, p² | N² − 4h₀²} p,  g₂(N)² | N² − 4h₀².

 (b) p | P (NEW). Here BOTH conditions are imposed, p | B(τ.G) and p | C(τ.G), but they collapse to one.
     G ∈ F′ has p | B_G and p | C_G, so det G ≡ A_G C_G − B_G² ≡ 0 (p) — consistent with p | h₀ — and
     p ∤ A_G, since p | A_G would give p² | det G = h₀, contradicting p ∥ h₀ (§0(ii)). Hence
       G ≡ (A_G, 0; 0, 0) (mod p),  A_G ≢ 0,
     a rank-one form: Q_G(x, y) ≡ A_G x², whose only projective zero is L₀ := (0 : 1) = ker(G mod p).
     For L₂ = L₀ one has G L₂ ≡ 0, so L₁ ⊥_G L₂ holds for EVERY L₁ — the condition p | B(τ.G) is implied
     by p | C(τ.G) and imposes nothing. Therefore, for one form,
       c_p(G) = #{L₂ ∈ P¹(F_p) : Q_G(L₂) ≡ 0} = 1,
     and for a pair, c_p(G₁,G₂) = 1 if ker(G₁ mod p) = ker(G₂ mod p) and 0 otherwise; in particular
       c_p(G₁,G₂) ≤ 1  for every p | P.
     (This is the mechanism recorded in O1: the local factor at p | (u, D) is 1, for the diagonal as well
     as for pairs, which is why the diagonal there is ≍ u/P rather than ≍ u.)

 Combining (a) and (b): the coset count for a pair is ≤ 4^{ω(u′)} g₂(N), exactly the A″(3) bound with u′
 in place of u — the primes of P contribute nothing at all.

(4) SUMMATION. With M := 2h₀(1 + 2Z) and d running over the divisors of u′, A″(4) verbatim:
   Σ_{2h₀<N≤M}(N/(2h₀) − 1)^{−1/2} g₂(N)
     ≤ (2h₀)^{1/2} Σ_{d | u′} d Σ_{N ≤ M, d² | N²−4h₀²} (N − 2h₀)^{−1/2}
     ≤ (2h₀)^{1/2} Σ_{d | u′} d·ρ(d²)·(d^{−1/2} + 2M^{1/2}/d²) ≪_D τ₃(u′) M^{1/2},
since for each of the ρ(d²) ≤ 2^{ω(d)}O(1) classes N mod d² with d² | N² − 4h₀² and N > 2h₀ one has
N ≥ d (because N² − 4h₀² ≥ d²), so the least term is ≤ d^{−1/2} and the rest is ≪ M^{1/2}/d².

Combining (1)–(4), and M ≍_D Z:
   off(a; Z) ≪_{D,ε} N^{o(1)}·4^{ω(u′)}·τ₃(u′)·M^{1/2} ≪_{D,ε} (Zu)^{ε}(1 + Z^{1/2}). □

## Remarks

R1. WHAT IS NEW. Only step (3)(b). Everything else is A″ with (h, u) ↦ (h₀, u′), and h₀ = O_D(1) makes
    the statement cleaner than A″'s (no h^{O(1)}).

R2. THE TWO CASES O1 LEFT OPEN are both inside §0's normal form: "two special primes dividing u" is
    ω(P) ≥ 2, and (3)(b) is applied at each p | P independently by CRT; "non-fundamental D with p² | D"
    is v_p(D) ≥ 2, where p enters s, not P, and drops out of a entirely (v_p(a) = 0), so that prime is
    simply not present in the local count. Note (3)(b) needs p ∥ h₀ and §0(ii) supplies exactly that.

R3. THE ADMISSIBILITY SIDE is unaffected: by O1's "clean reason" (PROOFS §38 list), for p | (u, D) with
    p ∥ |D| one has p ∤ h and k | aℓ² + h ≡ h (mod p), so p ∤ k automatically; j never runs over p,
    gcd(a, q₀) = 1 always, and §16's CRT factorisation and GM Lemma 3.1's shape q = a·d are untouched.
    That argument uses only p ∥ |D| after content removal, i.e. §0(ii) again, so it covers ω(P) ≥ 2 too.

R4. SCOPE. With Lemma A‴ in hand, the phrase in S6′ "the claim is scoped to a = u² and O1 is carried
    separately" can be deleted: S6′ is stated for a = P u′² with the local count of (3) throughout, and
    the level sum of S6′(1) is unchanged because gcd(a, q₀) = 1 by R3.

## TO CHECK (for the reading)
 (C1) OPEN: the conjugation delta*Gamma_0(a)*delta^{-1} = Gamma_0(P) cap Gamma_0^0(u'), including surjectivity.
      This is an identity and has been checked symbolically only; it is the one step with no numerical cover.
 (C2) COVERED (data/o1-local.txt): p does not divide A_G, and G mod p is rank one with kernel (0:1) --
      brute-forced over all of SL_2(F_p) for every p | P: 2421 forms, 9114 ordered pairs, |D| = 3, 7, 11
      (omega(P) = 1) and |D| = 15, 35, 51 (omega(P) = 2), u' <= 43 coprime to 2D. Zero failures. The same run
      confirms that the B-condition is implied by the C-condition, that c_p(G) = 1, and that c_p(G_1,G_2) <= 1.
 (C3) COVERED (data/gm-kernel-count-a3u2-adm.txt, data/gm-kernel-count-a15u2.txt): the diagonal is
      c_d(P) * prod_{p|u'} (p - chi_{-h_0}(p)), i.e. the P-factor is bounded and not ~ P. For a = 15u'^2 the
      ratios c_d(u')/c_d(1) are exactly 8 and 12 at u' = 7, 11, with no discrepancy.
 (C4) COVERED (same two files): (K_2 - c_d)/sqrt(T) at T = 64 does not grow in u' -- 14.98, 10.83, 5.89, 11.44,
      8.20 for P = 3, and 13.84, 15.01, 12.94 for P = 15.
