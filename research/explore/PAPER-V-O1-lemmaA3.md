# Lemma A‴: Lemma A″ at determinant P·h (the O1 case), in general form

Written 16 Sep. NOT YET READ. This discharges the item recorded in PROOFS §43 as
"(i) Lemma A″ at determinant p h for the O1 case", and, in the general form given here, also the two
cases O1 left open in one line each ("two special primes dividing u", "non-fundamental D with p² | D").

## 0. The content-removal normal form (general)

D < 0 is fixed; u is squarefree and in the support of w; Q_u(x, y) = u²x² + |D|y². Put

  c := gcd(u², |D|)   (the content of Q_u),  a := u²/c,  h := |D|/c.

Since u is squarefree, v_p(c) = min(2, v_p(D)) ∈ {0, 1, 2} FOR p | u (and v_p(c) = 0 for p ∤ u), so c factors uniquely as

  c = P·s²,  P := ∏_{p | u, v_p(D) = 1} p  (squarefree),  s := ∏_{p | u, v_p(D) ≥ 2} p,  (P, s) = 1, P s | u.

Write u′ := u/(Ps). Then

  a = P u′²,  h = |D|/(P s²),  gcd(a, h) = 1,  h₀ := P h = |D|/s²,  h₀ = O_D(1),  P ∥ h₀.

Three facts used below, all immediate from this normal form:
 (i) (u′, h₀) = 1 UNCONDITIONALLY: a prime q | u′ has q | u and v_q(c) = 0, hence q ∤ D, hence q ∤ h₀
     (h₀ | |D|). This needs neither fundamental D nor any hypothesis on u.
     (u′, 2) = 1 is NOT a fact about the normal form — it is an EXTERNAL HYPOTHESIS, imported from O2,
     and the lemma carries it. Either D is even, and then 4 | D (discriminants are ≡ 0, 1 mod 4, so
     v_2(D) = 1 is impossible) and the prime 2 enters s, leaving u′ odd; or D is odd, and then w is
     supported on odd u by O2. Swept over all 54717 pairs (|D|, u) with D ≡ 0,1 (mod 4), |D| < 600,
     u < 300 squarefree: (i) fails ONLY as 2 | u′, 9150 times, and every one of those has D odd and u
     even — exactly the branch O2 excludes. Everything else in §0 holds without exception, non-fundamental
     D included; in particular gcd(a, h) = 1 does NOT require D fundamental.
 (ii) P ∥ h₀: for p | P, v_p(s) = 0, so v_p(h₀) = v_p(D) = 1.
 (iii) P ≪_D 1 and h₀ ≪_D 1: both divide |D|.

The case P = 1, s = 1 is Lemma A″ itself (a = u², h = |D|). The case P = 1, s = 2 is O2's even branch
(a = u′², h = |D|/4). The new content is P > 1.

## Lemma A‴

Let D < 0 be fixed and let (a, h) = (P u′², |D|/(P s²)) be as in §0. Put
  F := S_{a,h}(1) = {g = (A B; B C) : AC − B² = ah, A, C > 0, a | B, a | C},
a Γ₀(a)-invariant set of positive definite forms, and for Z ≥ 1

  off(a; Z) := Σ_{g₂ ∈ Γ₀(a)\F} Σ_{g₁ ∈ F, g₁ ≠ g₂, u(g₁,g₂) ≤ Z} (1 + u(g₁,g₂))^{−1/2},

u(·,·) the point-pair invariant, orbits counted with the SL₂(Z)-stabiliser weights |Γ_g|^{−1} ≤ 1. Then

  off(a; Z) ≪_{D,ε} (Z u)^{ε} (1 + Z^{1/2}),  uniformly in u,

under the standing hypothesis that u′ is ODD (§0(i): automatic on the support of w, by O2, but a
hypothesis nonetheless — it is not a consequence of the normal form).
(No factor h^{O(1)} in the DISPLAY: the undilated determinant h₀ is O_D(1), not a growing parameter — but
the h₀-powers have moved into the D-constant, which is polynomial in |D|, not disappeared. And "uniformly
in u" is the same mild overstatement §37(e) flagged for A″: the honest u-dependence is
4^{ω(u′)}τ₃(u′) = 12^{ω(u′)}, absorbed by the (Zu)^{ε} but not literally uniform.)

## Proof

Steps (1), (2), (4) are Lemma A″'s steps (1), (2), (4) verbatim with h replaced by h₀ and u by u′.
Only step (3)(b) — the primes p | P — is new.

(1) UNDILATION. [REPAIRED after the reading: the first draft of this step carried the weight
(N/(2h₀) − 1)^{−1/2}/√2, copied VERBATIM from the pre-REVISION-2 body of Lemma A″ — i.e. it re-imported
the very error PROOFS §37(a)/§40 had already found and fixed there. The correct weight is
(1 + u)^{−1/2} = (4h₀/(N + 2h₀))^{1/2}, since 1 + 2u = N/(2h₀). The two differ by a factor
(1/2)√((N+2h₀)/(N−2h₀)), which is 3.905 at (h₀, N) = (15, 31), 0.866 at N = 60 and 0.5001 at N = 150000 —
bounded between 1/2 and √h₀, so the stated bound was never in danger, but an identity is an identity.]
δ := diag(1, 1/u′), G := δgδ. For g ∈ F write B = aB₁ = P u′²B₁, C = aC₁ = P u′²C₁; then
   G = (A, P u′ B₁; P u′ B₁, P C₁),  det G = ah/u′² = P h = h₀,
so G ranges bijectively over
   F′ := {G ∈ S_{h₀} : P u′ | B_G, P | C_G}.
Conjugation: for γ = (α β; γ' δ') ∈ Γ₀(a), δγδ^{−1} = (α, u′β; γ'/u′, δ'), and a = P u′² | γ' gives
P u′ | γ'/u′; conversely every such matrix arises. Hence
   δ Γ₀(a) δ^{−1} = {γ : u′ | b, P u′ | c} = Γ₀(P) ∩ Γ₀⁰(u′),
using (P, u′) = 1. (This is O1's group, NOT Γ₀⁰(u′) — §37(7).) The map is an isometry of the associated
points of H, and ⟨g₁,g₂⟩ := A₁C₂ + A₂C₁ − 2B₁B₂ satisfies ⟨g₁,g₂⟩ = u′²⟨G₁,G₂⟩ =: u′²N, with
1 + 2u(g₁,g₂) = cosh d = N/(2h₀). Hence N ∈ Z, N > 2h₀ for g₁ ≠ g₂, and
   off(a; Z) = Σ_{2h₀ < N ≤ 2h₀(1+2Z)} (4h₀/(N + 2h₀))^{1/2} · P_u(N),
   P_u(N) := #{(Γ₀(P) ∩ Γ₀⁰(u′))-orbits of ordered pairs (G₁,G₂) ∈ F′², ⟨G₁,G₂⟩ = N}  (stabiliser weights).

(2) LIFT TO LEVEL ONE. [This is the one place where A‴ is genuinely STRONGER than A″, and it should be
said: REVISION 2(f) of A″ cautions that the representation bound is uniform only for bounded discriminant.
Here h₀ | |D| = O_D(1), so the caveat is SATISFIED rather than tolerated.] The stabiliser in SL₂(Z) of a pair of distinct points of H is ±I, so every such
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
     (2^{ω(u′)} is the truth — A″'s REVISION — and is what S6′ uses; 4^{ω(u′)} is merely weaker, so it is
     safe here, but the two documents should not disagree in print.)

 (b) p | P (NEW). Here BOTH conditions are imposed, p | B(τ.G) and p | C(τ.G), but they collapse to one.
     G ∈ F′ has p | B_G and p | C_G, so det G ≡ A_G C_G − B_G² ≡ 0 (p) — consistent with p | h₀ — and
     p ∤ A_G, since p | A_G would give p² | det G = h₀, contradicting p ∥ h₀ (§0(ii)). Hence
       G ≡ (A_G, 0; 0, 0) (mod p),  A_G ≢ 0,
     a rank-one form: Q_G(x, y) ≡ A_G x², whose only projective zero is L₀ := (0 : 1) = ker(G mod p).
     For L₂ = L₀ one has G L₂ ≡ 0, so L₁ ⊥_G L₂ holds for EVERY L₁ — the condition p | B(τ.G) is implied
     by p | C(τ.G) and imposes nothing. Therefore, for one form,
       c_p(G) = #{L₂ ∈ P¹(F_p) : Q_G(L₂) ≡ 0} = 1,
     and for a pair, c_p(G₁,G₂) = 1 for every p | P — the "0 otherwise" branch of the first draft was
     vacuous, since by the preceding sentence EVERY G ∈ F′ has kernel exactly L₀.
     (This is the mechanism recorded in O1: the local factor at p | (u, D) is 1, for the diagonal as well
     as for pairs, which is why the diagonal there is ≍ u/P rather than ≍ u.)

 Combining (a) and (b): the coset count for a pair is ≤ 4^{ω(u′)} g₂(N), exactly the A″(3) bound with u′
 in place of u — the primes of P contribute nothing at all.

(4) SUMMATION. With M := 2h₀(1 + 2Z), the weight of (1) is (4h₀/(N + 2h₀))^{1/2} ≍ h₀^{1/2}N^{−1/2}, so
what is needed is A″(4) in the form the reading of S6′ confirmed (constant 3, worst measured ratio 0.663):
   Σ_{2h₀<N≤M} N^{−1/2} g₂(N)
     ≤ Σ_{d | u′, d ≤ M} d Σ_{N ≤ M, d² | N²−4h₀²} N^{−1/2}
     ≤ Σ_{d | u′, d ≤ M} d·ρ(d²)·(d^{−1/2} + 2M^{1/2}/d²) ≤ 3 τ₃(u′) M^{1/2},
since for each of the ρ(d²) = 2^{ω(d)} classes N mod d² with d² | N² − 4h₀² and N > 2h₀ one has N ≥ d
(because N² − 4h₀² ≥ d²), so the least term is ≤ d^{−1/2} and the rest is ≪ M^{1/2}/d².
[REPAIRED, twice, after the reading. (a) THE RESTRICTION d ≤ M IS ESSENTIAL and was missing — it was
missing in the pre-REVISION body of A″ too. Without it the d-sum is unrestricted while the inner N-sum is
empty for d > M, and the right-hand side is unbounded against τ₃(u′)M^{1/2}: measured ratios 4.01, 12.24,
39.58 at u′ = 15015, 255255, 4849845 with M = 200, and 46.09 at h₀ = 3, u′ = 1616615. It is also
automatic, in one line: d² | N² − 4h₀² and 0 < N² − 4h₀² < M² force d < M. (b) THE JUSTIFICATION "N ≥ d,
so the least term is ≤ d^{−1/2}" bounds N^{−1/2}, NOT (N − 2h₀)^{−1/2}, and against the draft's old weight
it was a non sequitur (h₀ = 11, d = 3: the smallest N in the class is 23, so (N − 2h₀)^{−1/2} = 1 > 3^{−1/2}).
With the corrected weight of (1) the argument is the right one and the non sequitur disappears — the two
repairs are the same repair.]

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

R4. SCOPE — CORRECTED after the reading; the first version OVERSTATED. Lemma A‴ supplies the off-diagonal
    input at a = P u′², and R3 gives gcd(a, q₀) = 1. But the level sum of S6′(1) is NOT "unchanged": the
    resultant changes shape from u⁴(N² − 4h²) to u′⁴(N² − 4h₀²), and S6′(1)'s clause "(q₀,u) = 1, so the u⁴
    is inert" becomes "(q₀, u′) = 1 and p ∤ q₀ for p | P". Harmless, but a rewrite, not a no-op. Worse,
    S6′(1) leans on "at odd p | D the levels with p² | q₀ are EMPTY, since v_p(u²ℓ² + h) ≤ v_p(D) = 1";
    under the normal form v_p(h) = v_p(D) − 2 can be POSITIVE for p | s, so that sub-claim must be redone
    before the O1 parenthesis in S6′ may be deleted. UNTIL THEN Theorem S keeps the restriction (u, D) = 1.

## READ (PROOFS §46) — status of each item

 (C1) CONFIRMED, and it was the item with no numerical cover: the conjugation
      delta*Gamma_0(a)*delta^{-1} = Gamma_0(P) cap Gamma_0^0(u'), INCLUDING SURJECTIVITY -- forward over
      1288 elements of Gamma_0(a), backward over 1016 elements of the image, ten (P,u') pairs, 0 failures.
      With it: the F <-> F' bijection, det G = h_0, <g1,g2> = u'^2 N, cosh d = N/(2h_0), N in Z, N > 2h_0
      (1002 forms, 2184 pairs, 0 failures).
 (C2) CONFIRMED, but our own run's coverage was narrower than this file claimed: o1-local.ts hardcodes
      P = |D| and h_0 = |D|, so h = 1 and s = 1 always -- it never tested P a proper divisor, nor
      non-fundamental D, nor even D. Those are covered by the reading's independent run (9340 forms,
      22218 pairs, 0 failures, |D| = 12, 15, 20, 35, 60, 84, 99, 115, 135, 175) and by o1-local2.ts here.
      Step (3)(b)'s well-definedness is confirmed NOT circular (210 pairs, indicator constant on every
      coset), and step (3)(a) at the new determinant also checks (1440 single-form counts; c_p <= 2 in
      11798 non-scalar pairs; p^2 | N^2 - 4h_0^2 in all 159562 scalar pairs).
 (C3) CONFIRMED (data/gm-kernel-count-a3u2-adm.txt, data/gm-kernel-count-a15u2.txt).
 (C4) CONFIRMED (same two files).

## STILL OPEN after the reading
 NOT in this lemma -- in its consumer. S6'(1) must be restated at (u', h_0): the resultant becomes
 u'^4 (N^2 - 4h_0^2), and its claim that at odd p | D the levels with p^2 | q_0 are EMPTY rests on
 v_p(u^2 l^2 + h) <= v_p(D) = 1, whereas under the normal form v_p(h) = v_p(D) - 2 can be POSITIVE for
 p | s. Until that is redone, Theorem S keeps the hypothesis (u, D) = 1. See PROOFS §46(6).
