# PROOFS-uniform.md — the error term uniform in u: derivations (started 15 Sep 2026, 15:00)
Companion to PLAN-uniformity.md. Everything here is derivation; nothing is cited elsewhere before an outside reading.

## 1. The dilated Weyl sums as Poincaré-type sums on Γ₀(u²) (setup, VERIFIED numerically 15 Sep 14:50)
Polynomial f(X) = u²X² − D (α = u², β = 0, Δ = 4u²D), Ngo's convention (arXiv 2107.13301 §3.2): forms q = [U, R, V],
(ξ·q)(X,Y) = q(aX+cY, bX+dY) for ξ = (a b; c d), so U(ξ) = q(a,b), V(ξ) = q(c,d), R(ξ) = 2Uac + 2Vbd + R(ad+bc).
    Q_f = {[U,R,V] ∈ Z³ : V ≡ 0 (u²), R ≡ 0 (2u²), R² − 4UV = 4u²D},   stable under Γ := Γ₀(u²).
Roots x (mod n) of u²x² ≡ D ↔ Γ_∞\Q_f[nu²] (forms with V = nu²) via x ≡ R/(2u²) (mod n)  [checked: n = 5, 13, 25, 65, 85, u = 3, D = −4].
Weyl phase: x/n ≡ R/(2V) (mod 1). Hooley's identity (Ngo Lemma 3.2; checked exactly on 200 random cases):
    R(ξ)/V(ξ) = 2a/c − (R_j c + 2V_j d)/(c·V(ξ))          for q = ξ·q_j, q_j = [U_j, R_j, V_j], c ≠ 0.
Hence, with the orbit decomposition Q_f = ⊔_j Γ·q_j (finite stabilisers Γ^{(j)}, |Γ^{(j)}/±1| ∈ {1,2,3}),
    T^{(u)}_k(X) := Σ_{n≤X} Σ_{u²x²≡D (n)} e(kx/n) = Σ_j (1/|Γ^{(j)}/±|) Σ_{(c,d): u²|c, (c,d)=1, q_j(c,d) ≤ u²X, mod ±} e(k ā/c)·e(−k(R_j c + 2V_j d)/(2c q_j(c,d)))
where ā = inverse of d modulo c (a d ≡ 1 mod c), and the c = 0 terms (ξ ∈ Γ_∞) contribute one term per orbit with V_j ≤ u²X.
Bijection with the level-one family: [U, 2u²r̃, u²ṽ] ↔ [U, 2ur̃, ṽ] ∈ H^{(u)} = {disc 4D, 2u | b} (the dilation draft's Q ↦ Q');
V ≤ u²X ⇔ ṽ ≤ X, and ṽ is the modulus n. The Γ₀(u²)-orbits of Q_f are the G_u-orbits of H^{(u)}, G_u = Γ₀(u) ∩ Γ⁰(u),
counted by Prop. classwise of the draft: ≍ u·h(4D) orbits.
Writing c = u²c', R_j = 2u²r', V_j = u²ṽ_j: q_j(c,d) = u²·q'_j(c',d) with q'_j = [u²U_j, 2u²r', ṽ_j] (disc 4u²D again), and
    T^{(u)}_k(X) = Σ_j (1/|Γ^{(j)}/±|) Σ_{c'≥1} Σ_{d: (u²c',d)=1, q'_j(c',d) ≤ X} 2·Re[ e(k ā/(u²c')) e(−k(u²r'c' + ṽ_j d)/(u²c' q'_j(c',d))) ] + (c=0 terms).
Ranges. For fixed j and c' ≥ 1, d runs over the interval I_j(c') of centre −u²r'c'/ṽ_j and half-length
√(Xṽ_j − |D|u²c'²)/ṽ_j ≤ √(X/ṽ_j); it is non-empty iff c' ≤ C_j := √(Xṽ_j/|D|)/u.  The smooth twist
φ_j(c',d) = k(u²r'c' + ṽ_j d)/(u²c' q'_j(c',d)) satisfies |u²r'c' + ṽ_j d| = |∂_d q'_j|/2 ≤ √(ṽ_j q'_j) and q'_j(c',d) ≥ |D|u²c'²/ṽ_j,
so |φ_j| ≤ k ṽ_j/(u³ c'² |D|^{1/2}) and φ_j is monotone on O(1) pieces of I_j(c'): for k ≤ u² L and ṽ_j ≤ u|D|^{1/2} (see below)
the twist has total variation O(L|D|^{1/2}·(1/c'²)) — a bounded factor.
Choice of representatives. The last coefficient ṽ over a G_u-orbit of H^{(u)} runs over the values of the level-one form
on the primitive vectors (b,d) with u | b (an index-u sublattice); by Minkowski every orbit has a representative with
    ṽ_j ≤ (2/√3)·u·|D|^{1/2}·(1+o(1)),   and then U_j = (u²r'² − D)/ṽ_j.
The number of orbits with ṽ_j ≤ V is #{(n ≤ V, x)} ≍ V (each such pair is the minimum of its own orbit when V is small).

## 2. The elementary (Weil) bound with u tracked — the three regimes (derivation 15 Sep 15:10; exponents TO BE CHECKED)
Incomplete Kloosterman sum over d ∈ I (length L) to modulus c = u²c' (Hooley Lemma 3 / Weil):  ≪ (L/c + 1) c^{1/2+ε} (k,c)^{1/2}.
Weil beats the trivial bound L iff L ≥ c^{1/2}, i.e. c' ≤ c'_0(j) := X/(u²ṽ_j) (using L ≍ √(X/ṽ_j)).
(a) Weil range c' ≤ min(C_j, c'_0): Σ (u²c')^{1/2+ε} + L Σ (u²c')^{-1/2+ε} ≪ X^{ε}[u·min(C_j,c'_0)^{3/2} + √(X/ṽ_j) u^{-1} min(C_j,c'_0)^{1/2}].
(b) Trivial range c'_0 < c' ≤ C_j (exists iff u ṽ_j^{3/2} > (X|D|)^{1/2}): Σ L ≪ √(X/ṽ_j)·C_j = X/(u|D|^{1/2}) per orbit — NO saving.
Case u = 1: c'_0 = X/ṽ > C_j = √(Xṽ/|D|), only (a): Σ_j X^{3/4}(ṽ_j/|D|)^{3/4} + X^{3/4}ṽ_j^{-1/4}|D|^{-1/4} ≪ X^{3/4+ε}: Hooley's 3/4.
Case u > 1: orbits with ṽ_j ≤ (X|D|/u²)^{1/3} are in case (a) throughout; per orbit (a) gives ≪ X^{ε}[u C_j^{3/2} + √(X/ṽ_j)u^{-1}C_j^{1/2}]
    = X^{3/4+ε}[u^{-1/2}(ṽ_j/|D|)^{3/4} + u^{-3/2}ṽ_j^{-1/4}|D|^{-1/4}]; summed over the ≍ V orbits with ṽ_j ≤ V := (X|D|/u²)^{1/3}:
    ≪ X^{3/4+ε}u^{-1/2}|D|^{-3/4}V^{7/4} = X^{3/4+ε}u^{-1/2}|D|^{-3/4}(X|D|/u²)^{7/12} = X^{4/3+ε}u^{-5/3}|D|^{-1/6}.
    Orbits with ṽ_j > (X|D|/u²)^{1/3}: bounded trivially by their number of pairs, ≍ #{(n,x): n ≤ X, orbit minimum > V} — this is
    X minus the (a)-orbits' pairs; a saving needs those to be few, i.e. needs u small: they are all pairs when u > X^{1/5}.
    RESULT (elementary, u tracked): T^{(u)}_k(X) ≪ X^{1+ε}·min(1, X^{1/3}u^{-5/3}|D|^{-1/6}) + [pairs in orbits with ṽ_j > V]
    — nontrivial only for u ≪ X^{1/5}, and then the saving is X^{-(1/5 − ...)}: for u ≤ X^{1/5−δ} the whole sum is in regime (a)
    up to the orbit count and T^{(u)}_k ≪ X^{3/4+ε}u^{5/4}|D|^{1/8}·(k, u²·)^{1/2}·(1 + kṽ/u³)^{...}.   [bookkeeping to redo cleanly]
Regime map — CORRECTED 15 Sep 16:00 after two numerical checks (orbit-isolation and orbit-minima, D = −4, X = 3000):
  * isolated pairs (no other element of the G_u-orbit with modulus ≤ X): 0% for u ≤ 60, 0.3% at u = 100, 10% at 400, 50% at
    800, 100% from u = 1600 = X/√|D| on. So regime (III) begins at u ≍ X/|D|^{1/2}, NOT at X^{1/2} (the first draft of this
    section said √X: it used the Minkowski bound ṽ ≤ u√|D| for ALL orbits, but the relevant orbits have ṽ_j = n ≤ X and
    C_j = √(Xn/|D|)/u < 1 for all n ≤ X iff u > X/√|D|).
  * orbit minima: median minimum ≈ u|D|^{1/2}/2; pairs with minimum ≤ V₀ = (X|D|/u²)^{1/3}: 100% (u ≤ 3), 50% (u = 7),
    4% (u = 15), 0% (u ≥ 30); X^{1/5} = 5. So the Weil-effective range is u ≲ X^{1/5}, as derived. The number of orbits met by
    the pairs is far below u·h (133 at u = 400): most G_u-orbits have every modulus > X.
  (I)   u ≤ X^{1/5}:        Hooley on Γ₀(u²) with loss u^{5/4}; spectral version to improve.
  (II)  X^{1/5} < u < X/√|D|: orbit structure present but Weil-ineffective (Kloosterman moduli u²c' vs interval lengths √(X/ṽ)).
  (III) u ≥ X/√|D|:        every pair is its own orbit's only small element.
Reciprocity form of regime (III) (16:10). With ū = u^{-1} (mod n), n̄ = n^{-1} (mod u) and 1/(nu) ≡ n̄/u + ū/n (mod 1):
    e(k ū r/n) = e(−k r n̄/u) · e(k r/(nu)),
so  T^{(u)}_k(X) = Σ_{n≤X} Σ_{r²≡D (n)} e(−k (r n̄ mod u)/u) · e(kr/(nu)),  the second factor of phase ≤ k/u·(r/n).
INTERPRETATION: j(Q) := −r n̄ mod u is the index of the Hecke neighbour (z_Q + j)/u that is the dilated point: x = ū r =
(r + n j)/u with j ≡ −r n̄ (mod u); so e(kx/n) = e(k j/u) e(kr/(nu)). The regime-(III) Weyl sum is the character sum
Σ_{level-one pairs, n ≤ X} e(k j(Q)/u) of the "Hecke labels" j(Q) ∈ Z/u — for u prime ≫ X, the reductions mod u of the ≍ X
Farey-type fractions −r/n of height ≤ X. For individual u ≫ X this is a Kloosterman-type sum with variables ≤ X ≪ √u,
where no cancellation is known in general (sum-product territory); Conjecture U (N2) says it is there.
Averaging over u (16:20; heuristic, Weil for incomplete Kloosterman sums mod nn′ over u ∈ [U, 2U]):
    (1/U) Σ_{u~U} |T^{(u)}_k(X)|² ≪ X + X³/U      (diagonal X; off-diagonal pairs (Q,Q′) give (nn′)^{1/2+ε}/U each when nn′ > U),
i.e. square-root cancellation on average for U ≥ X², a saving for U > X. This is part III's Type II seen from here.
WHAT THE WINDOW NEEDS (16:30). In Theorem A′ the window has moduli V ∈ (Y, u²Y log H] at length Y with u ≤ Y²; the small
moduli d ≤ Y are done by Theorem small uniformly (log saving). So regime (III) (u ≥ V) never occurs for the window moduli
(V ≥ Y ≥ ... and V ≥ u only fails for V < u, possible only when u > Y). Map for the window:
  - u ≤ Y^{1/5}: all V ≥ Y ≥ u⁵ are Weil-effective ⇒ Hooley's bound with u tracked closes the window: the partial theorem
    (Task 3.2, range u ≤ H^{1/6−δ}).
  - Y^{1/5} < u ≤ Y^{1/2}: u² ≤ Y ≤ V, orbit structure everywhere, Weil-ineffective for V < u⁵: spectral level-u² needed.
  - u > Y^{1/2}: the bottom of the window (Y < V < u²) has isolated pairs; the top (V ≥ u²) has the structure. Averaging
    over u helps only for V < u (needs u > Y): E_u|T|² ≪ V + V³/u.
  The gap Y^{1/5} < u ≤ Y² is the whole difficulty; its two faces are (a) level-u² spectral theory with uniform constants
  (Kuznetsov for Γ₀(u²), DI large sieve; Ngo/Pitt-type bounds with q = u² explicit) for V ≥ u², and (b) the isolated-pair
  regime for V < u², where only the mod-u character-sum formulation and averaging over u are available.

## 3. Next (in order)
3.1 Redo §2(a) rigorously as a Proposition: T^{(u)}_k(X) ≪_ε X^{3/4+ε} u^{5/4} |D|^{1/8} (k, u²)^{1/2}·(1 + k|D|^{1/2}/u²) for
    u ≤ X^{1/5}, k ≥ 1 — including the c = 0 terms, the ± and stabiliser bookkeeping, the case D even, and the exact Minkowski
    constant. Then the λ-weighted version (λ = 1 * g, divisibility e | n as a congruence on d modulo e; gcd(e, u²c') issues).
3.2 Feed into Prop. windowW of part III: window 𝒲_u(Y; L) ≪ u^{5/4+...} Y^{3/4+ε}(log) ⇒ Σ_{u ≤ H^{1/6−δ}} w(u) 𝒲_u(H/u; log H) ≪ H^{1−δ'}:
    the first POWER range of u (part III has exp((log H)^{c/3}), Cor. smallu). State as a theorem only after an outside reading.
3.3 Regime (III): test numerically whether cancellation for individual u ≫ X comes with the "Kloosterman-fraction" structure
    (compare T^{(u)} for u and for u' ≡ u mod lcm of small n — if the sums agree closely, the small moduli dominate the
    structure); read DFI 1997 "Bilinear forms with Kloosterman fractions" for the individual-u bounds available.

## 4. Hooley's argument for the dilated roots, u tracked — the two halves (15 Sep, 17:00–18:00; identity verified numerically)
Conventions of the dilation draft (right action (Q∘γ)(v) = Q(γv)). Pairs (n, x), u²x² ≡ D (n), x mod n  ↔  forms
Q = [n, 2ux, (u²x²−D)/n] ∈ H^{(u)} = {disc 4D, 2u | b} modulo translations by u (Γ_∞^{(u)} = {(1 um; 0 1)} ⊂ G_u);
Weyl phase e(kx/n) = e(k b(Q)/(2u a(Q))). Orbits H^{(u)} = ⊔_j Q_j∘G_u (N_u ≪ u^{1+ε} h(4D) of them, Prop. classwise).
For γ = (p q; r s) ∈ G_u (u | q, u | r): a(Q_j∘γ) = Q_j(p, r), and (Hooley's identity, CHECKED on 311 random cases)
    b(Q_j∘γ)/(2a(Q_j∘γ)) = q/p + ((b_j/2) p + c_j r)/(p · Q_j(p, r)).
Here q ≡ −r̄ (mod p) and u | q, so q = u q′ with q′ ≡ −\overline{u r} (mod p): e(k b/(2ua)) = e(−k \overline{u r}/p) · e(k((b_j/2)p + c_j r)/(u p Q_j(p,r))).
Write r = u r′. Then Q_j(p, u r′) = Q̃_j(p, r′) with Q̃_j := [a_j, u b_j, u² c_j] of discriminant 4u²D, the Kloosterman phase is
e(−k \overline{u²} \overline{r′}/p), and the twist is k((b̃_j/2)p + c̃_j r′)/(u² p Q̃_j(p, r′)) — Hooley's setting for the form Q̃_j,
with the twist divided by u² and the sum over primitive (p, r′) with (p, u) = 1 (automatic: a prime of u dividing n kills the roots).
KEY: the family orbit of Q_j is the SL₂(Z)-class of Q̃_j (restricted to (p,u) = 1), and the phase e(k b̃/(2u² ã)) depends on the
form Q̃ alone; so Q̃_j may be taken REDUCED: |b̃| ≤ ã ≤ c̃, ã ≤ 2u√(|D|/3), c̃ ≤ 2u²|D|/ã. Per class ≍ πX/(u|D|^{1/2}) pairs.
Twist size: |(b̃/2)p + c̃ r′| ≤ √(c̃ Q̃) (positive definite), so |twist| ≤ k√c̃/(u² p √Q̃).
GOOD HALF |r′| < |p| (modulus p): Q̃ ≥ ã p²/2, |twist| ≤ k√(2c̃/ã)/(u² p²) ≤ 2k|D|^{1/2}/(u ã p²) — bounded variation, uniformly.
  Incomplete Kloosterman sum over r′ (length L_p = min(2p, 2√(X/c̃))) to modulus p: ≪ min(L_p, p^{1/2+ε}(k,p)^{1/2}).
  Fully Weil-effective iff X/c̃ ≥ √(2X/ã) iff ã ≥ a₀ := (2u⁴|D|²/X)^{1/3}; then the half is ≪ (X/ã)^{3/4+ε}(k-factor).
  Sum over classes (≪ a^{ε} classes with reduced first coefficient a): ≪ X^{3/4+ε}(u|D|^{1/2})^{1/4}. Classes with ã < a₀ are
  bounded trivially: ≪ a₀^{1+ε} X/(u|D|^{1/2}) = X^{2/3+ε} u^{1/3}|D|^{1/6}. Nontrivial for u ≤ X^{1/4−δ}.   ← the good half alone would give u ≤ X^{1/4}.
BAD HALF |p| < |r′| (modulus must be r = u r′, i.e. ≡ 0 mod u). Identity (CHECKED, 235/235 random cases):
    b(Q_j∘γ)/(2a(Q_j∘γ)) = s/r − (a_j p + (b_j/2) r)/(r · Q_j(p, r)),      s ≡ p̄ (mod r),
  so e(kb/(2ua)) = e(k p̄_r/(u r))·twist = e(k p̄/(u² r′))·twist with modulus u²r′ and the variable p in |p| < |r′|, (p, u) = 1: Weil gives (u²r′)^{1/2+ε} per r′, useful only when the p-range
  2r′ exceeds it, i.e. r′ ≥ u²/4. Pairs of the bad half with r′ < u²: per class min(u⁴, X/c̃); the bad half holds about HALF of all
  pairs (Σ_a ρ(a) X a/(u²|D|) ≈ X/2), so for u ≥ X^{1/6} essentially all of them have r′ < u² and the elementary method fails.
  For u ≤ X^{1/5−δ}: the untreatable part is ≪ u^{5+ε} h(4D) = o(X), and the Weil part is ≪ Σ_classes u (X/c̃)^{3/4} ≪ u^{5/4}X^{3/4+ε}|D|^{1/8}.
RESULT (to be written rigorously; constants explicit; then outside reading):
    T^{(u)}_k(X) ≪_{D,ε} X^{3/4+ε} u^{5/4} k^{1/2+ε} + u^{5+ε}          for squarefree u ≤ X^{1/5},  k ≥ 1,
consistent with the X^{1/5} threshold found numerically (orbit-minima test) and with §2. The bottleneck is the bad half,
where the Kloosterman modulus carries the factor u² and the summation variable is short: exactly the sums Ngo/DFI treat
by Poisson + Kuznetsov (Kloosterman sums of Γ₀(u²), moduli c√N″), i.e. the level-u² spectral theory with the level
tracked (DI/Pitt bound with q = u² explicit, Ngo Thm 2.5). The good half's X^{1/4} shows what the spectral half should reach.
Consequence for the window if the RESULT holds with the λ-weight and admissibility (Task 3.2, via Prop. windowW of part III with
θ = 3/4, u-loss u^{5/4}, no loss in k beyond k^{1/2}... note Prop. windowW's Hypothesis W has (uk)^B with a single B; a two-exponent
version is needed): Σ_{u ≤ H^{θ₀}} w(u) 𝒲_u(H/u; log H) ≪ H^{1−δ} for θ₀ < 1/6 (from u^{5/4}(H/u)^{3/4} summed with |w(u)| ≪ 1 against u^{1/2}).

## 5. Correction to §4 (15 Sep, 20:30): the representative problem — the elementary theorem is NOT yet a proposition
Two things in §4 were too quick.
(a) "Q̃_j may be taken reduced." The family orbit is the Γ⁰(u²)-orbit of Q̃_j (matrices γ̃ = (p, u²q′; r′, s)), i.e. the set of forms
in the SL₂(Z)-class of Q̃_j with (ã, u) = 1 and b̃ ≡ 0 (mod 2u²), one translate out of u² for each first column. This description
IS representative-free, so Q̃_red may be used — but then the second column is pinned by the family congruence, and in Hooley's
identity b̃/(2u²ã) = q/(u²p) + twist the entry q modulo u²p is: q ≡ −\bar{r′} (mod p) and q ≡ q_{u²}(p, r′) (mod u²) with
q_{u²} the solution of the linear congruence (coefficient ã(Q̃)/p, a unit mod u² iff (ã, u) = 1 — that is why the family needs it).
By CRT, e(kq/(u²p)) = e(−k \overline{u² r′}/p) · e(k φ(p, r′)/u²), with φ a rational function of (p, r′) modulo u². The second factor
oscillates with (p, r′) mod u²; splitting into progressions costs a factor u² in the number of incomplete Kloosterman sums
(bound ≍ u² X^{3/4} per class instead of X^{3/4}), or — better — it is itself a Kloosterman-type sum modulo u², which is where the
spectral theory of Γ₀(u²) enters even for the good half.
(b) With the unreduced representative (a_j ≤ 2u√(|D|/3), |b_j| ≤ u a_j, c_j ≲ u² a_j/4 after G_u-reduction) the mod-u² phase is
absent but the twist is ≍ k c̃/(u³ p² |D|^{1/2}) ≍ k u a_j/p² — of size up to k u² for small p, so Hooley's smooth-twist step fails
for p ≲ (k u²)^{1/3}, and the range of the method shrinks accordingly.
So the clean statement "T^{(u)}_k(X) ≪ X^{3/4+ε} u^{5/4} k^{1/2} for u ≤ X^{1/5}" is a PLAUSIBLE TARGET, not a derived bound; the
honest elementary range after either fix is smaller (≈ u ≤ X^{1/8} with the u² loss). The numerical thresholds of §2 (Weil-effective
orbits up to u ≍ X^{1/5}) describe the sizes of the parametrisation, not what the Weil-bound proof delivers. Recorded so that no
draft states more than this. The elementary route is therefore NOT the way to a power range worth writing; the spectral route is.

## 6. The representation-theoretic decomposition of the family (15 Sep, 21:00; structural, from Prop. classwise) — TO TEST FIRST
Prop. classwise writes piece u as Σ_C |S_C|^{-1} Σ_{γ ∈ Γ/G_u} w_C(γ) · seed_{uY}(α γ^{-1} z_C), with w_C(γ) = 1[ℓ₁(γ) ⊥_{B_C} ℓ₂(γ)] the
indicator, on the u(u+1) pairs of distinct lines = SL₂(F_u)/T, of the graph of the orthogonal involution σ_C : ℓ ↦ ℓ^⊥ of B_C mod u
(σ_C ∈ PGL₂(F_u) is the image of the non-trivial element of the normaliser of the torus attached to the order at u; its fixed
points are the 1+χ isotropic lines). Decompose w_C under SL₂(F_u) acting on functions on pairs (Ind_T^G 1 = 1 ⊕ St ⊕ principal series):
  * trivial component w̄ = (u−χ)/(u(u+1)): its contribution is w̄ · Σ_{γ∈Γ/G_u} seed(αγ^{-1}z_C) = w̄ · Σ_{M ∈ Γ_∞\Δ_u} seed(M z_C)
    = w̄ · √u · (T_u P[Ψ_{uY}])(z_C) — the Hecke operator T_u applied to the LEVEL-ONE Poincaré series of the seed, so its spectral
    expansion is Σ_j λ_j(u)⟨P[Ψ],u_j⟩u_j(z_C) + Eisenstein, and |λ_j(u)| ≤ τ(u) u^{7/64} gives a bound uniform in u of relative size
    u^{-1/2+7/64+ε} against the u = 1 object. This is the λ_j(u)√u term of Lemma B, now for the WHOLE spectrum at once.
  * Steinberg component (functions on P¹(F_u) of mean zero, dimension u): the level-u part — the newform lines of Theorem 3 /
    Lemma D (the isotropic-line correction −(1+χ) of Lemma B lives here and in the trivial part).
  * principal-series components (dimension u+1 each, (u−3)/2 of them): the genuinely level-u² part (Γ₀(u²)-new forms, the
    cycloidal lines of Strömberg).
The point: the trivial component is uniformly controlled by Hecke theory alone; the question becomes the size of the
non-trivial components of the twisted Poincaré series Σ_γ w⁰_C(γ) seed(αγ^{-1} z_C), w⁰_C = w_C − w̄. Since w_C is the indicator of
the graph of σ_C, its non-trivial components have explicit coefficients (characters of SL₂(F_u) evaluated on σ_C); the Steinberg
part is a Γ₀(u)-Poincaré series and the principal-series parts are Γ(u)-vector-valued Poincaré series — all at level u, not u².
FIRST TEST (F24, before anything is believed): compute numerically, for D = −4 or −8 and u = 3, 5, 7, (i) the actual smooth piece
√Y S^w_u(Y) on the existing grids, (ii) the "trivial component" w̄·√u·Per_D(T_u P[Ψ_{uY}]) — i.e. w̄ times the FULL Hecke-translate sum
Σ over all u(u+1) cosets — from the same divisor data (all forms of discriminant 4D, all b, evaluated at (z_Q + j)/u and u z_Q), and
(iii) their difference. If the non-trivial part is the dominant one and grows with u, the decomposition is a bookkeeping device;
if it is smaller than the trivial part or decays, it is the mechanism. Script to write: hecke-components.py.

## 6′. CORRECTION of §6 (15 Sep 2026): the trivial component is w̄·S^w_1(uY), not a Hecke translate; the inert identity explained
§6 said the trivial SL₂(F_u)-component of piece u is "w̄·√u·T_u P[Ψ_{uY}]". That is wrong. Derivation:
- Class C, S_C acting freely on Γ/T^{uZ} (finite order against infinite order): the piece over C is
  |S_C|⁻¹ Σ_{γ∈Γ/T^{uZ}} w_C(γ) seed(γ⁻¹z_C),  seed(z) = uΨ_{uY}(z/u),  w_C(γ) = 1[ℓ₁(γ) ⊥ ℓ₂(γ)] right-G_u-invariant.
- Replace w_C by its uniform average w̄ = m/(u(u+1)) (m = u − χ for u ∤ D): Σ_{γ∈Γ/T^{uZ}} seed(γ⁻¹z) = Σ_{γ∈Γ/Γ_∞} Σ_{j mod u} uΨ_{uY}((γ⁻¹z − j)/u)
  = Σ_{γ∈Γ/Γ_∞} u·(U_uΨ_{uY})(γ⁻¹z), with Atkin's U_u (only the u matrices (1 j; 0 u); the matrix (u 0; 0 1) of T_u is absent).
  The seed is homogeneous: ψ_k(y) = (Y′y²/|D|)ŵ(kY′y/√|D|), so ψ_{uk}(y/u) = u⁻²ψ_k(y) and U_uΨ_{Y′} = u⁻¹Ψ_{Y′} EXACTLY.
  Hence the trivial component of piece u is w̄·Σ_C|S_C|⁻¹P_Γ[Ψ_{uY}](z_C) = w̄·S^w_1(uY): the u = 1 object at length uY.
- Arithmetic form: piece u = Σ_{h′≡0 (u)} w(h′/(uY))(σ_{-1}(h′²−D) − E_u), a restriction of the u = 1 sum at length uY. For the pair
  (divisor a of n = h′²−D, h′ mod ua): ℓ₁ isotropic ⇔ u | a; ℓ₂ isotropic ⇔ u | n/a; w = 1[u | h′].
- Decomposition of L²(ordered pairs of distinct lines) = Ind_T^G 1: the trivial representation once, Steinberg THREE times
  (dim St^T = #T-orbits on P¹(F_u) − 1 = 3: the orbits are {0}, {∞} and the two square classes of F_u^×, since diag(a,a⁻¹)
  acts by x ↦ a²x; an earlier line of this section said "twice", corrected the same day). Two of the copies are the
  mean-zero functions of ℓ₁ and those of ℓ₂; the third lies in the remainder R below. The two one-line copies are NOT orthogonal:
  ⟨φ(ℓ₁), ψ(ℓ₂)⟩ = −⟨φ, ψ⟩_{P¹}. Projecting w − w̄ onto their sum (conditions E[·|ℓ₁] = E[·|ℓ₂] = 0 on the remainder):
  the marginal part is (u/(u−1))·(n(ℓ₁) + n(ℓ₂)), n(ℓ) = N(ℓ)/u − w̄, N(ℓ) = #{ℓ′ ≠ ℓ : ℓ′ ⊥ ℓ}; the remainder R is orthogonal to
  every function of a single line.
- By the proofs of Lemmas B and D, the values at the coset points of the level-one oldforms f₀, f₁, f₂ depend on ℓ₂, on
  nothing, on ℓ₁ respectively, and those of the level-u newforms on one line. Hence R contributes to NO level-one and NO
  level-u line; the trivial component carries the level-one lines with ratio w̄·u^{-1/2} for every splitting type; the
  marginal part carries r_j(u;D) − w̄·u^{-1/2} and all level-u newform lines.
  Checked against the closed form of Theorem 2: P_triv = w̄·(u√uλ, u(u+1), u√uλ) = w̄u(u+1)·(middle column of G) gives
  r_triv = w̄u^{-1/2} for all χ ∈ {−1, 0, 1}, u ∈ {3,…,1009}, λ ∈ [−1.9, 1.99] (max deviation 3.9e−16).
- THE INERT IDENTITY, EXPLAINED: for inert u no line is isotropic, N ≡ 1 = uw̄, so n ≡ 0 and the marginal part vanishes
  identically; the level-one lines of piece u are those of w̄·S^w_1(uY), and r = w̄·u^{-1/2} = ((u+1)/(u(u+1)))·u^{-1/2} = u^{-3/2}.
  No Gram matrix is needed. (Split u=3: r = −0.3105 = trivial +0.0962 + marginal −0.4068; u=5: −0.0763 = +0.0596 − 0.1360.)
- For the uniformity problem: the trivial component is the u = 1 object at length uY (Theorem smooth, no uniformity issue),
  of relative size w̄u^{-1/2} ≍ u^{-3/2}. Everything non-uniform in u sits in the marginal (level-u) part and in R (level u²).
- TEST (running 15 Sep): hecke-components.ts computes P, T, L1, L2, R on the paper's smooth grids for u = 3 (D = −8, −4, −11, −7,
  −20) and u = 5 (D = −4, −8, −11); hecke-components-fit.py checks P against the paper's grids, fits the lines in each component
  and compares with the predictions above. The smoke test (Y = 2·10⁵) confirmed the four local-factor means to six digits.

## 6″. RESULTS of the component test (15 Sep 2026) — the decomposition is confirmed; two by-products
Scripts: hecke-components.ts (grids research/explore/data/components-D*-U*-grid.dat, Y ≤ 10⁷, the paper's 400-point smooth grid),
hecke-components-fit.py (v2), hecke-components-u5.py, newform-fricke-check.py, mean-precision.py. Every fit has the design
1, x, (Y/Ymax)^{3/2}, cos/sin (see by-product 1). Amplitudes; "noise" = mean amplitude at off-line probe frequencies.
(a) Exact identities. The four local-factor means (A, B, C, A on u | h′) match the empirical means to six digits; for inert u
    L1 ≡ L2 ≡ 0 to machine precision (u = 3: D = −4, −7; u = 5: D = −8), as derived.
(b) u = 3, level-3 newform t = 5.0987 (ε = +1). D = −8 / −11 / −20: P 0.141 / 0.136 / 0.192; L 0.143 / 0.138 / 0.191; R 0.004 / 0.004 /
    0.007 (noise 0.018 / 0.009 / 0.022); T ≤ 0.0003. ENTIRELY in the marginal (level-u) part. ✓
(c) u = 3, Strömberg's cycloidal Γ³ lines. 3.536: R = P in all five D (e.g. D = −4: 0.2009 vs 0.2010), L ≤ 0.003; 6.647: R ≈ P
    (0.175 vs 0.182, 0.252 vs 0.255, …), L ≤ 0.007. ENTIRELY in R. ✓  (The pair 8.698/8.778 is collinear at the resolution
    2π/9.2 ≈ 0.68 and shows opposite-phase inflation even in T; no statement is made about it.)
(d) Level-one line t₁ in T: signed ratio +0.100, +0.090, +0.083 (split, pred +0.096), +0.193, +0.188 (inert, pred +0.192), u = 5:
    +0.060 (pred +0.060), +0.061, +0.088 (pred +0.089); phases within 0.12 rad. In L and R the t₁ line is at or below the noise
    at Y ≤ 10⁷ (L split u = 3: −0.49, −0.53, −0.32 against −0.407 at 1–1.4σ with the predicted phase; R at < 1σ in all eight
    pairs): consistent with the prediction, not a test of it.
(e) u = 5 against the LMFDB level-5 even newforms (fetched 15 Sep): L carries 4.1324 (ε=+1), 6.0540 (+1), 8.2947 (+1) — D = −4:
    0.030 / 0.086 / 0.046 at L-noise 0.003; D = −11: 0.048 / 0.075 / 0.129 at 0.011; the ε = −1 forms 5.4362 and 7.9865 are ABSENT
    from L (0.0003 / 0.0020 and 0.0011 / 0.0024). T carries none. R's own lines (2.64–2.71, 5.22–5.28 in all three D, ≈10.8) are
    at no level-5 newform: the genuinely level-25 part (2.64 is the line predicted in part IV to be the first eigenvalue of Γ⁵).
(f) Sizes (rms over the grid, after the base columns): T 0.007–0.022; L 0.08–0.17; R 0.15–0.32; P 0.21–0.32. The part that is
    uniformly controlled (T, the u = 1 object) is negligible; the non-uniformity sits in L (level u) and R (level u²), with R
    the larger — for inert u R is everything.
BY-PRODUCT 1 (data precision; affects numbers in the papers at the percent level, ERRATA 35). The subtracted means E are float64
    Euler products over ~10⁶ primes; their rounding error is 10⁻¹²–2·10⁻¹¹ (mean-precision.py: against a log-sum reference, the
    paper's split u = 3 grids are off by 5–14·10⁻¹², u = 5 by up to 4·10⁻¹¹; this session's script is not systematically better),
    and the shared tail formula is good to ~10⁻¹². An error δ in E adds −δ·√Y·Σ_h w(h/Y) ≈ −0.111·δ·Y^{3/2} to √Y·S^w (and a Y^{3/2}
    and a Y^{1/2} term to the sharp grids): 0.02–0.16 at Y = 10⁷, which a degree-1 or degree-3 detrend in log Y does not remove.
    With a Y^{3/2} column the regression P ↔ paper grid is 6·10⁻⁷ for all eight pairs. Audit of published fits with the column added:
    dilation tab:ratios u = 2 ≤ 0.015, u = 3 ≤ 0.037 (split −0.285/−0.320/−0.332 → −0.315/−0.353/−0.354; ramified 0.655/0.726 →
    0.618/0.707), u = 5 ramified 0.431 → 0.445; tab:newform ≤ 2% in amplitude, ≤ 0.02 rad; paper IV tab:dsweep ≤ 2.6% for |D| ≤ 39
    (D = −23: ratio 0.97 → 0.95). Rule for all future fits: include the mean-error columns.
BY-PRODUCT 2 (Fricke refinement of Lemma newperiod, PROVED and checked). The Fricke involution W_u maps the level-u Heegner forms
    [ua, b, c] of discriminant 4D to [uc, −b, a], so it swaps the root classes b ≡ ±β (mod 2u) (split) and fixes the root-0 class
    (u ∥ D), preserving stabilisers; with v∘W_u = εv the split period is −(1+ε)·(one root class) and the ramified one is
    ε·itself. Hence Per_{W_u}(v) = 0 whenever ε = −1, for EVERY splitting type. Direct check (newform-fricke-check.py, orbits of W_u
    enumerated independently, v by reduction + coset decomposition): 5.0.1.5.1 (R 5.4362, ε = −1) Per/Σ|terms| ≤ 10⁻⁹ at D = −4, −11
    (split), −15 (ramified), −3, −8 (inert); 5.0.1.7.1 and 5.0.1.3.1 (ε = +1): 0.03–1.0 for split/ramified, ≤ 3·10⁻⁹ inert;
    Per(v(u·))/Per(v) = +1.000000 = ε in all nonzero cases. Matches (e): the ε = −1 lines are absent from the data.

## 7. The narrow window (15 Sep 2026) — PROVED (elementary) and checked; to be read before it enters paper III
LEMMA. For squarefree u with ω(u) ≥ 1, Y ≥ 2, K0 ≥ Y and every ε > 0,
    Σ_{d' > K0 admissible} (λ(d')/d') Σ_{x ∈ R^{(u)}_{d'}} B^{(Y)}_{d'}(x)  ≪_{f,ε}  Y² (uY)^ε / K0,
uniformly in u. PROOF. For d' > K0 ≥ Y, B^{(Y)}_{d'}(x) = (Y − x)^+ − Y²/(2d'). The second terms give ≤ Y² Σ_{d'>K0} |λ(d')|ρ(d')/(2d'²)
≪ Y² K0^{−1+ε}. The first terms give Σ_{h≤Y} (Y−h) Σ_{d' | Q_u(h), d' > K0} |λ(d')|/d' ≤ Y · Σ_{h≤Y} τ(Q_u(h)) max|λ| / K0 ≪ Y² (uY)^ε / K0,
since Q_u(h) ≤ u²Y² + |D|, τ(n) ≪ n^ε and |λ(d)| ≤ Π_{p|d} p/|p−4| ≪ d^ε. Both series converge absolutely, so the split by d' is legitimate. ∎
CONSEQUENCE 1 (Theorem A′ of part III, sharpened). With K0 = Y^{1+η}, the moduli above Y^{1+η} in the pieces with u ≤ H^{2/3+ε} contribute
Σ_u |w(u)| (H/u)^{1−η} H^{o(1)} ≪ H^{1−η/3+o(1)}. So the Cesàro conjecture holds iff Σ_{u ≤ H^{2/3+ε}} w(u) 𝒲′_u(H/u) = o(H log H) with the
NARROW window 𝒲′_u(Y) = Σ_{Y < d' ≤ Y^{1+η}}, for any fixed η > 0 — instead of the window (Y, u²Y log H] of paper III.
CONSEQUENCE 2 (the exponent condition). In the proof of Proposition windowW the frequencies k > K = Y^{2η} now cost Σ_{d' ≤ Y^{1+η}} λω(d')/K ≪ Y^{1−η}
(there are no moduli above Y^{1+η} left), and k ≤ K cost u^B Y^{θ+ε} K^B = u^B Y^{θ+O(η)} under Hypothesis W(θ, B). Summing with the weights,
Σ_{u ≤ H^{2/3+ε}} |w(u)| u^B (H/u)^θ ≍ H^{2/3 + θ/3 + 2B/3 + O(ε)}, so the Cesàro conjecture follows from Hypothesis W with θ + 2B < 1, not θ + 6B < 1.
(Theorem A's power-saving version additionally needs the small moduli with a power saving, 2B(2−θ) < 1−θ; the conjecture itself does not,
since Theorem small gives a log saving unconditionally.) Duke–Friedlander–Iwaniec's (3/4, 1/4) still fails: 3/4 + 1/2 > 1; B < 1/8 would do at θ = 3/4.
The loss (uk)^{3B} of paper III Remark exponents came from the frequency range u²L forced by moduli up to u²YL; only u^B is intrinsic.
NUMERICAL CHECK (window-truncation.ts, f = t² + t + 1, H = 10⁶, exact divisor enumeration): the tail of P_u(Y) beyond K0 = Y·2^j, divided by √Y:
    u = 7 (Y = 1.4·10⁵): j = 0: 0.047, j = 2: 0.072, j = 4: 0.005, j = 6: 0.000
    u = 31 (Y = 3.2·10⁴): 0.164, −0.017, −0.021, 0.000;   u = 91: −0.094, −0.015, −0.006, −0.000
    u = 1009 (Y = 991): −0.090, −0.038, 0.003, −0.001;   u = 10009 (Y = 100, u ≈ 100Y): 0.290, 0.092, 0.011, −0.001
  and tail/(Y²/K0) between 10⁻⁴ and 5·10⁻²: the divisor bound is far from sharp, and the √Y-oscillation of every piece lives in the moduli
  between about Y and 16Y, for u both below and far above Y.
THE CORE, RESTATED. Uniformly in squarefree u ≤ Y², bound with any saving (a power saving gives Theorem A)
    Σ_{Y < d' ≤ Y^{1+η}} (λ(d')/d') Σ_{x ∈ R^{(u)}_{d'}} B^{(Y)}_{d'}(x),
i.e. the roots x ≤ Y of u²x² ≡ D (mod d') for moduli just above the length, weighted by (Y − x) and λ(d')/d'. Equivalently (Möbius on λ = 1 * g,
g(p) = 4/(p−4)) Type I sums Σ_e g(e)/e Σ_{k ≡ 0 (e), k ~ K} Σ_{u²ℓ²+|D| ≡ 0 (k)} ψ(ℓ/Y) with K ∈ [Y, Y^{1+η}] — precisely the shape of Grimmelt–Merikoski's
Theorem 1.4 (arXiv 2505.00493) with a = u², h = |D|, D = e (their notation), which they prove only for a ≤ X^{o(1)}.
ROUGH a-TRACKING OF GRIMMELT–MERIKOSKI §5 (heuristic, to be done properly). In their Theorem 2.1 applied as in §5 the scale ratio is
X/Y = (length)·a^{1/2}/h^{1/2} ≈ Y·u, and the diagonal term K₂ counts the ≈ u family points (the sparse family: about u points on area u²).
Keeping the congruence b ≡ 0 (mod a) instead of dropping it by positivity, the bound is of the order Y^{1/2+θ} u^{1+θ}, non-trivial against Y for
u ≲ Y^{(1/2−θ)/(1+θ)} ≈ Y^{0.35} (θ = 7/64), i.e. u ≲ H^{0.26} in Theorem A′. This covers the lower end only; the loss is the sparsity (u points on
area u²) and the factor u^{1/2} in the scale ratio.
ADVERSARIAL READING OF §7 (15 Sep, a fresh model instance given §7, paper III §§2 and 6 and the script; independent of this session's
reasoning): no mathematical error; L, C1, C2, N all correct with three small gaps, fixes adopted:
 (1) the mean term: |λ| ≪ d^ε gives Y²K0^{−1+ε}, not uniform for K0 ≫ Y^{O(1)}; use Σ_{d≤t}|λ|ω(d) ≪_f t (Shiu, as in Lemma far) and partial
     summation: Σ_{d'>K0} |λ|ρ/d'² ≪ 1/K0, so the second term is ≪ Y²/K0 with no ε.
 (2) the ε in U0 = H^{2/3+ε} must be small in terms of η (εη + ε′ < η/3; in particular ε < 1/3).
 (3) for u ≤ Y^{η/2}(log H)^{−1/2} the window (Y, Y^{1+η}] is WIDER than paper III's (Y, u²Y log H], and Corollary smallu would pick up a
     factor η log Y; define the window as (Y, min(Y^{1+η}, u²Y log H)] (Lemma far or the lemma on the rest).
 Sharpening supplied by the reader: with the narrow window, paper III's POWER-SAVING Theorem A holds under 2B(2−θ) < 1−θ alone (the
 small-moduli condition, which implies θ + 2B < 1 and the k-convergence condition); strictly weaker than θ + 6B < 1. DFI still fails.
 Boundary term of the truncated partial summation: controlled, since Hypothesis W bounds S_k(t) at every t. Script N: computes exactly
 the bounded tail; the only numerical sensitivity (E times Y²/2) is ≈ 5·10⁻⁴ in tail/√Y at u = 7.

## 8. CANDIDATE THEOREM (15 Sep 2026, evening): Hypothesis (E) in Cesàro form holds unconditionally — UNDER ADVERSARIAL READING, NOT A CLAIM
STATEMENT. For every irreducible quadratic f there is c = c(f) > 0 such that
    Off*_f(H) = c_off(f)·H + O_f( H (log H)^{1−c} log log H ),
and hence, by part I, Theorem 6 (Σ_{h≤H}(1−h/H)(S_f(h)−C²) = −½C log H + O_f(1) + (C²/H)·Off*_f(H)),
    Σ_{h≤H} (1 − h/H)(S_f(h) − C(f)²) = −½ C(f) log H + O_f( (log H)^{1−c} log log H ).
This is Conjecture 1 of part I in Cesàro form with its leading term (part I Thm 6(ii)), NOT the constant A_f, which needs Off* − c_off H = o(H).
INPUTS. Part III: Proposition pieces (Off* = Σ_u w(u) P_u(H/u), Σ_{u≤t}|w(u)|/u ≪ log t); Theorem typeII (u > H^{2/3+ε}); Theorem small and
Proposition KSw with Remark KSwconst (uniform for t ≥ max(exp((log log u)^4), Y₁(f))); the identity (eq:Pgt) for moduli above the length.
External: Koksma's inequality; Shiu's theorem; Henriot, "Nair–Tenenbaum bounds uniform with respect to the discriminant", Math. Proc. Camb.
Phil. Soc. 152 (2012), Corollary 2 of Theorem 5 (arXiv 1102.1643; hypotheses read 15 Sep: Q primitive, F ∈ M_k(A,B,ε) with ε < α/(50g(g+1/δ)),
uniformly in x ≥ c₀‖Q‖^δ and x^α ≤ y ≤ x, bound ≪ Δ_{D*} y Π_{g<p≤x}(1−ρ(p)/p) Π_{p≤x, p∤D*}(1 + G(p)ρ(p)/p), Δ_{D*} ≤ Π_{p|D*}(1+1/p)^C,
constants depending only on g, α, δ, A, B; no fixed-prime-divisor hypothesis in Theorem 5).
PROOF. Fix ε ∈ (0, 1/10). Let u ≤ U₀ := H^{2/3+ε} be squarefree with ω(u) ≥ 1 and Y := H/u ≥ H^{1/3−ε}; then u ≤ Y³ and log Y ≍ log H.
Split P_u(Y) at d' = Y and at d' = Z := Y(log Y)^A (A fixed below): P_u(Y) = P^≤_u(Y) + W_u(Y) + T_u(Y).
(i) Small moduli. P^≤_u(Y) ≪_f Y(log Y)^{−c} by Theorem small (Y ≥ exp((log log u)^4) for H ≥ H₀).
(ii) Window. W_u(Y) = Σ_{Y<d'≤Z} (λ(d')/d') I(d'), I(d') = Σ_{x∈R'_{d'}} B^{(Y)}_{d'}(rep x). For d' > Y and m ∈ [1, d'],
   B^{(Y)}_{d'}(m) = (Y−m)^+ − Y²/(2d') (paper III §sec:far). With θ_x = rep x/d' ∈ (0,1) and f(θ) = (Y − θd')^+ on [0,1]: ∫₀¹ f = Y²/(2d'),
   f is monotone with total variation Y, so Koksma gives |I(d')| ≤ ω(d')·Y·D*(θ_x) ≤ ω(d')·Y·disc(Δ^{(u)}_{d'}).
   With w = |λω|·1_{(·,2Du)=1} (as in Theorem small) and S(t) = Σ_{q≤t} w(q) disc(Δ_q) ≤ t(log t)^{−c} for t ≥ Y (Prop. KSw), partial summation:
   |W_u(Y)| ≤ Y Σ_{Y<d'≤Z} w(d') disc/d' = Y[S(Z)/Z − S(Y)/Y + ∫_Y^Z S(t) t^{−2} dt] ≤ Y[(log Z)^{−c} + (log Y)^{−c} log(Z/Y)]
            ≪ A·Y (log Y)^{−c} log log Y.
(iii) Tail. By (eq:Pgt) T_u(Y) = 𝒜_Z − ℰ_Z. First ℰ_Z = (Y²/2) Σ_{d'>Z} λρ(d')/d'² ≪ Y²/Z, since Σ_{d≤t}|λ|ρ(d) ≪_f t (Shiu).
   Next |𝒜_Z| ≤ Σ_{x≤Y} (Y−x) Σ_{d' | Q_u(x), d' > Z} |λ(d')|/d' ≤ (Y/Z) Σ_{x≤Y} G_u(Q_u(x)), where
   G_u(n) := Σ_{d | n, d squarefree, all p | d split, p ∤ 2Du} |λ(d)| = Π_{p | n, p split, p ∤ 2Du} (1 + |λ(p)|) ≤ 6^{ω(n)}   (|λ(p)| ≤ 5).
   CLAIM: Σ_{x≤Y} G_u(Q_u(x)) ≪_f Y (log Y)^{10} (log log Y)^{C} uniformly for u ≤ Y³.
   Proof of claim: x ≤ Y^{1/2} contribute ≤ Y^{1/2+o(1)} (G ≤ 6^ω ≪ n^{o(1)}). For X ∈ [Y^{1/2}, Y] dyadic, write Q_u = κ·Q* with κ the content
   (κ | gcd(u², D)·const, so κ ≪_f 1) and Q* primitive irreducible quadratic with ‖Q*‖ ≤ u²|D|; G_u(κm) ≤ 6^{ω(κ)} G_u(m) ≪_f G_u(m).
   G_u is multiplicative, G_u(m) ≤ 6^{Ω(m)} and ≤ B_ε m^ε, so G_u ∈ M_1(6, B_ε, ε). Henriot Cor. 2 with k = 1, g = 2, α = 1/2, δ = 1/12:
   the range condition X ≥ c₀‖Q*‖^{1/12} holds since X ≥ Y^{1/2} ≥ c₀(u²|D|)^{1/12} for u ≤ Y³ and Y ≥ Y₀. It gives
   Σ_{X<x≤2X} G_u(|Q*(x)|) ≪ Δ_{D*} X Π_{2<p≤X}(1 − ρ(p)/p) Π_{p≤X}(1 + 6ρ(p)/p) ≪ Δ_{D*} X (log X)^{10},
   with ρ(p) ≤ 2 and Δ_{D*} ≤ Π_{p | D*}(1+1/p)^C ≪ (log log(u|D|))^C, D* dividing a fixed multiple of disc(Q*) ≍ u²D. Sum over dyadic X. ∎
   Hence |T_u(Y)| ≪_f Y (log Y)^{10−A} (log log Y)^C + Y(log Y)^{−A}.
(iv) Conclusion. With A = 11, P_u(Y) ≪_f Y (log Y)^{−c} log log Y uniformly for u ≤ U₀, H ≥ H₀(f, ε). So
   Σ_{u≤U₀} |w(u)| |P_u(H/u)| ≪ H (log H)^{−c} log log H · Σ_{u≤H} |w(u)|/u ≪ H (log H)^{1−c} log log H,
   and Theorem typeII gives Σ_{u>U₀} w(u) P_u(H/u) = c_off H + O(H^{1−δ}). Proposition pieces sums the two. ∎
WHAT IS NEW AGAINST PART III. Part III bounded the moduli above u²Y log H trivially (Lemma far) and left the window (Y, u²Y log H], where the
harmonic sum over moduli is log(u² log H) ≍ log H and a log-saving in the discrepancy is swamped — hence its statement "a logarithmic saving is
not enough". An average of the divisor-type function G_u over the values of u²x² − D, uniform in the discriminant (Henriot), removes all moduli
above Y(log Y)^{11}; on the remaining log-power range the harmonic sum is only O(log log Y), and part III's own unconditional log-saving
(Koksma + weighted Kowalski–Soundararajan) suffices. No spectral theory, no level-u² input, no averaging over u.
CONSISTENCY WITH THE NUMERICS: at H = 10⁷ (f = t²+t+1), Σ_{u≤H^{2/3}} w·P = −940 (−6·10⁻⁶ of H log H); the tails beyond 16Y are ≤ 0.02√Y.
CHECKS REQUESTED FROM THE READERS: (1) Henriot Cor. 2's hypotheses for G_u and Q* (primitive; class M; the range; the D*-factor; the content);
(2) Prop. KSw and Theorem small at t ∈ [Y, Y(log Y)^{11}] with the stated uniformity in u ≤ H^{2/3+ε}; (3) Koksma's inequality with the
representative convention and the sign/boundary conventions of B; (4) the use of part I Theorem 6; (5) any proved statement of parts I–III
this contradicts (part III's "a logarithmic saving is not enough" is an assertion about its window, not a theorem).
NUMERICAL SANITY CHECK OF STEP (iii) (gu-average.ts, f = t²+t+1, H = 10⁷; log in logs/gu-average-D3.log): (1/Y) Σ_{x≤Y} G_u(Q_u(x)) over up to
400 admissible u per range: Y = 100: 3.8 (u ≤ 10), 6.3 (u ≤ 10²), 9.4 (u ≤ 10⁴), 11.3 (u ≤ 10⁵); Y = 1000: 6.4, 9.5, 11.1 (u ≤ 10⁶ = Y²);
Y = 3000: 7.6, 11.0, 11.9 (u ≤ 9·10⁶ ≈ Y²); maximum over all u tested 15.0 = 0.71 (log Y)². The average saturates at the global mean of G
(12.7) as u grows, as it must once u²x² − D behaves like a generic integer of its size: uniform polylogarithmic size, as step (iii) needs.
(The first version of the script sampled only even u, all inadmissible for D = −3; fixed before these numbers.)
READER 2 OF 2 ON §8 (15 Sep, fresh instance, focus: decomposition, Koksma, uniformity, part I Thm 6, consistency, structural attack):
"could not break it"; no fatal error. Gaps and fixes, ADOPTED in the statement below:
 (1) u ≤ Y³ ⇔ u ≤ H^{3/4}; with U₀ = H^{2/3+ε} this needs ε ≤ 1/12, not ε < 1/10. Also at the lowest block X = Y^{1/2} Henriot's range needs
     c₀|D|^{1/12} ≤ 1. FIX: take ε < 1/12 and start the dyadic blocks at X = Y^{0.6} (x ≤ Y^{0.6} cost Y^{0.6+o(1)}), δ = 1/13.
 (2) the exponent: "ρ(p) ≤ 2" alone gives Π(1+12/p) = (log X)^{12}; the true count ρ(p) = 1 + χ_D(p) (0 for p | u) gives ≪ (log X)^5. FIX: say
     so, or take A = 13 (A enters only as A·log log Y).
 (3) u < u₁ and u = 1, 2 (log log u undefined) are covered by the t₀(f) clause of Theorem small; say so explicitly.
 (4) in the display, c_off·H is smaller than the error term; the statement is really Off*_f(H) ≪ H(log H)^{1−c} log log H.
 Scope: paper III's proofs are for monic f = t² + bt + c without fixed prime divisor (its tables include 2t²+1, its proofs do not treat a ≠ 1);
 state the theorem for that set-up.
 Verified by the reader (with scripts): the formula for B at real Y and the cut at d' = Y; absolute convergence of the three parts;
 representatives ↔ d' | Q_u(x); Koksma (253 random cases, 0 violations, max ratio 0.46); partial summation; disjointness of u ≤ U₀ and
 typeII's range; the consequence via part I Thm 6; no proved statement of parts I–III contradicted (paper III's "a logarithmic saving is
 not enough", the Koksma paragraph before Corollary smallu and KNOWLEDGE line ~649 are assertions about the wide window and would need
 rewriting); no hidden u-dependence in KSw's x₁ or Henriot's constants; no circularity. Not audited by this reader: Henriot's hypotheses
 (reader 1).
STATEMENT AS AMENDED: for monic irreducible f = t² + bt + c without fixed prime divisor, Off*_f(H) ≪_f H(log H)^{1−c} log log H, and
Σ_{h≤H}(1−h/H)(S_f(h) − C(f)²) = −½C(f) log H + O_f((log H)^{1−c} log log H). Proof as above with ε < 1/12, blocks from X = Y^{0.6}, δ = 1/13, A = 13.
Status: reader 2 passed; reader 1 (Henriot, KSw uniformity) pending.
READER 1 OF 2 ON §8 (15 Sep, fresh instance, focus: Henriot and KSw inputs; obtained the published ERRATUM, Math. Proc. Camb. Phil. Soc. 157
(2014) 375–377): (A) correct with two gaps, (B) correct with a slip in Remark KSwconst; nothing breaks steps (ii) or (iii).
 (A1) same as reader 2's (1): ε < 1/12 (Henriot's ‖Q‖ is the sum of |coefficients|, ‖Q*‖ ≤ u² + |D|); or δ = 1/24, or x ≤ Y^{2/3} trivially.
 (A2) the ERRATUM replaces D* by a*D* in Corollaries 1–2 (a* = leading coefficient of Q*, here u²/κ): the Δ-factor runs over p | uD and is still
      ≤ Π(1+1/p)^C with C ≤ 2·13 = 26 independent of u (uses only (2.9) and ρ(p^ν) ≤ g p^{ν−1} for primitive Q*); so Δ ≪ (log log(u|D|))^{26}.
      Cite a*D*. The corrected Theorem 5 keeps: Q primitive, ε < α/(50g(g+1/δ)), x ≥ C₀‖Q‖^δ, x^α < y ≤ x, constants depending on g, α, δ, A, B.
 Verified: G_u ∈ M₁(6, B_ε, ε) with B_ε independent of u; content κ = gcd(u², D) with G_u(κm) = G_u(m) exactly; Q* primitive irreducible (r = 1),
 no fixed-divisor hypothesis needed; (1−ρ/p)(1+6ρ/p) ≤ 1 + 10/p; |𝒜_Z| ≤ (Y/Z)ΣG_u; ℰ_Z ≪ Y²/Z uniformly (Shiu); numerically
 Σ_{x≤1500} G_u(Q_u(x))/(Y log Y) = 0.66, 0.75, 0.97, 1.14 for u = 7, 1729, 1.98·10⁶ (≈ 0.9Y²), 5.2·10⁹ (≈ 2300Y²).
 (B) KSw: every "x ≥ x₁" in its proof depends only on β, γ, C₀, except P ≥ β(1−2^{−1/2}) log log x at t = x, where t₀ enters: x₁ = max(t₀, x₁′(β,γ,C₀)),
     no hidden u-dependence; KS Lemmas 3.5/3.7 (arXiv 2003.12965) hold for arbitrary sets. SLIP in Remark KSwconst (paper III): charging the removed
     primes 2·log log log u, β = ½ needs log log t ≥ 4L + O_f(1) (L = log log log u), which t ≥ exp((log log u)^4) does not give; the true loss is
     Σ_{p|u split} 2/(p−4) ≤ L + O_f(1) (checked: 2.24 against L = 2.38 at log u ≈ 10⁵), so the requirement is log log t ≥ 2L + O_f(1), which holds
     for u ≥ u₁(f). Fix: redo the count (or take β = ¼, halving c). This also repairs paper III's Theorem small itself (ERRATA to be filed).
     At t ∈ [Y, Z]: KSw applies for all squarefree u ≤ H^{2/3+ε}; Koksma and partial summation verified.
BOTH READINGS PASSED (15 Sep, late). FINAL STATEMENT: for monic irreducible f = t² + bt + c without fixed prime divisor there is c = c(f) > 0 with
    Off*_f(H) ≪_f H (log H)^{1−c} log log H,   Σ_{h≤H}(1−h/H)(S_f(h) − C(f)²) = −½ C(f) log H + O_f((log H)^{1−c} log log H).
Proof: §8 with ε < 1/12, dyadic blocks from X = Y^{0.6} (δ = 1/13), A = 13, Henriot Cor. 2 as corrected by the erratum (a*D*), Remark KSwconst's
count repaired. Both readings were by model instances; no human has checked it. Parts I and III are not yet edited.

## 9. LARGE-u POWER RANGE: u > H^{1/2+ε} by dispersion over u and Weil (15 Sep, late) — TWO ADVERSARIAL READINGS PASSED (fixes adopted, see end of §10)
CLAIM. For f as in paper III §1 and every ε ∈ (0, 1/10) there is δ = δ(ε) > 0 with
    Σ_{u > H^{1/2+ε}} w(u) P_u(H/u) = c_off(f)·H + O_{f,ε}(H^{1−δ})        (paper III Theorem typeII: u > H^{2/3+ε}).
It suffices to treat the dyadic blocks U ∈ [H^{1/2+ε}, H^{2/3+ε}] (Type II covers the rest) and to show, in the notation of the proof of
Theorem typeII (G°_{d'}(a,Y) = G_{d'}(a,Y) − Ḡ_{d'}(Y)), that for each such block
    𝓔(U) := Σ_{U<u≤2U} w(u) Σ_{d' ≤ Z, (d',u)=1} (λ(d')/d') G°_{d'}(ū, H/u) ≪ H^{1−δ},   Z = Z_U = Y H^η, Y = Y_U = H/U ∈ [H^{1/3−ε}, H^{1/2−ε}],
together with Step 3 (moduli d' > Z_U: ≪ H^{1−η+3ε′}, unchanged) and Step 5 (the main term) with U₀ = H^{1/2+ε}. Parameters: ε′ ≪ η ≪ ε,
K₁ = H^{2η}, J = H^{δ₁} with δ₁ ≪ ε.
WHY TYPE II STOPS AT 2/3. Its Step 4 treats each d' separately: Pólya–Vinogradov for Σ_u w(u)ψ(u) (≪ U^{1/2}d'^{1/2}) and Parseval (√φ(d'))
give U^{1/2} Y Z per block, < H^{1−δ} iff Y < H^{1/3}. The dispersion below keeps the sum over d' inside a Cauchy–Schwarz over u.
STEP 4′(a) FOURIER. For admissible d' (odd, R_{d'} symmetric, 0 ∉ R_{d'}) and integer N, paper III Lemma finfourier gives
Σ_{r∈R_{d'}} B^{(N)}_{d'}(ar) = (1/(4d')) Σ_{0<k<d'} c_k(d',N) ρ_k(d';a), c_k = (1−cos(2πkN/d'))/sin²(πk/d'), ρ_k(d';a) = Σ_{r∈R_{d'}} e(kar/d').
The mean over units a is ρ̄_k(d') = ω(d') ε_{d'}(k), ε_d(k) := c_d(k)/φ(d) (Ramanujan sum; each r is a unit), so
G°_{d'}(a,N) = (1/(4d')) Σ_k c_k ρ°_k(d';a) with ρ° = ρ − ρ̄. Real Y = H/u: B^{(Y)} − B^{(N)} = ϑ(N_{d'}(m) − (2Y−ϑ)/(2d')) (paper III, proof of
Prop. windowW) contributes O(ω(d')) per modulus, hence ≪ Σ_u |w| Σ_{d'≤Z} λω/d' ≪ U log Z per block: negligible.
Bounds: sin(πk/d') ≥ 2k/d' for k ≤ d'/2 (use the symmetry k ↔ d'−k) gives |c_k|/(4d'²) ≤ b_k(d') := min(1/(8k²), π²N²/(8d'²)); and
|∂_N c_k|/(4d'²) ≤ π/(8k d').
STEP 4′(b) HIGH FREQUENCIES k > K₁: ≤ Σ_u |w| Σ_{d'≤Z} (λ/d')·(d'ω/(4K₁))·2 ≪ U Z/K₁ = H^{1−η}.
STEP 4′(c) SEPARATION OF u AND d'. For k ≤ K₁ split (U, 2U] into J intervals I_j with base points u_j; |N(u) − N(u_j)| ≤ Y/J + 1, so replacing
c_k(d', N(u)) by c_k(d', N(u_j)) costs ≪ Σ_u |w| Σ_{d'} λω (π/(8kd'))(Y/J + 1) ≪ U Y log Z/(kJ); summed over k ≤ K₁: ≪ H^{1−δ₁} log² H.
What remains is Σ_j B_k(I_j) with B_k(I) := Σ_{u∈I} w(u) Σ_{d'≤Z,(d',u)=1} β(d') ρ°_k(d';ū), β(d') = λ(d')c_k(d',N(u_j))/(4d'²), |β| ≤ |λ| b_k.
STEP 4′(d) DISPERSION. Cauchy–Schwarz: |B_k(I)|² ≤ (Σ_{u∈I} |w(u)|²)·S, Σ|w|² ≪ U (log U)^C, and with a smooth φ ≥ 1_{[1,2]} supported in [1/2, 3],
S := Σ_u φ(u/U) |Σ_{d'} β(d') 1_{(u,d')=1} ρ°_k(d';ū)|² = Σ_{d₁,d₂} β(d₁)β̄(d₂) Σ_{r₁,r₂} Σ_{(u,d₁d₂)=1} φ(u/U) [e(kūr₁/d₁) − ε₁][e(−kūr₂/d₂) − ε₂].
 • The ε₁ε₂ terms: ≪ U (Σ_d |β| ω (k,d)/φ(d))² ≪ U τ(k)² (log H)^C k^{−4}.
 • The single-exponential terms: Weil for incomplete Kloosterman sums (with Möbius for (u, d₂) = 1): Σ_{(u,d₁d₂)=1} φ(u/U) e(kūr₁/d₁)
   ≪ τ(d₂)(U/d₁ + 1) d₁^{1/2+ε″}(k,d₁)^{1/2}; with |ε₂| ≤ (k,d₂)/φ(d₂) the total is ≪ H^{ε″}(U N^{1/2} k^{−7/2} + N^{3/2} k^{−5/2}).
 • The main terms. With g = (d₁,d₂), d_i = g d_i′, q = g d₁′d₂′ and c = r₁d₂′ − r₂d₁′: for (u,q) = 1, ū_{d₁}r₁/d₁ − ū_{d₂}r₂/d₂ ≡ ū_q c/q (mod 1), so the
   inner sum is Σ_{(u,q)=1} φ(u/U) e(kcū/q) ≪ (U/q + 1) q^{1/2+ε″} (kc, q)^{1/2} (Weil), unless kc ≡ 0 (mod q). Since (r_i, d_i′) = 1 and
   (d₁′, d₂′) = 1, (c, d₁′d₂′) = 1; so kc ≡ 0 (mod q) forces d₁′, d₂′ | k and k c ≡ 0 (mod g). Degenerate terms (d₁′, d₂′ | k): ≤ U Σ_g Σ_{d₁′,d₂′|k}
   |β(gd₁′)β(gd₂′)| ω² ≪ U τ(k)² Σ_g |β(g)|² ω(g)² ≪ U N τ(k)² (log H)^C / k³  (Σ_d b_k(d)² ≪ N/k³).
   Non-degenerate, using (kc,q)^{1/2} ≤ (k,q)^{1/2} g^{1/2} and q^{1/2} g^{1/2} = (d₁d₂)^{1/2}, U q^{−1/2} g^{1/2} = U g (d₁d₂)^{−1/2}:
   ≪ H^{ε″} [ (Σ_{d≤Z} |β(d)| d^{1/2})² + U Σ_g g Σ_{d₁,d₂ ≡ 0 (g)} |β₁β₂|(d₁d₂)^{−1/2} ] ≪ H^{ε″} [ N³/k + U N (log H)/k³ ],
   from Σ_d b_k(d) d^{1/2} ≪ N^{3/2} k^{−1/2} and Σ_{d ≡ 0 (g)} b_k(d) d^{−1/2} ≪ (kN)^{1/2}/(g k²).
 Hence S ≪ H^{ε″}(U N/k³ + N³/k) and |B_k(I)| ≪ H^{ε″}(U N^{1/2} k^{−3/2} + U^{1/2} N^{3/2} k^{−1/2}).
STEP 4′(e) ASSEMBLY. With N ≤ Y and U = H/Y:
 𝓔(U) ≪ H^{ε″} J Σ_{k≤K₁} (U Y^{1/2} k^{−3/2} + U^{1/2} Y^{3/2} k^{−1/2}) + H^{1−δ₁} log² H + H^{1−η}
      ≪ H^{ε″+δ₁} (H Y^{−1/2} + H^{1/2} Y K₁^{1/2}) + H^{1−δ₁} log² H + H^{1−η}.
 For Y ∈ [H^{1/3−ε}, H^{1/2−ε}]: H Y^{−1/2} ≤ H^{5/6+ε/2} and H^{1/2} Y K₁^{1/2} ≤ H^{1−ε+η}. So 𝓔(U) ≪ H^{1−δ} with δ = min(δ₁, η, ε − η − δ₁ − ε″)/2.
STEP 5′ MAIN TERM with U₀ = H^{1/2+ε}, Y₀ = H^{1/2−ε}: as in Theorem typeII, with the split of the d'-sum at D₁ = Y₀ (not H^{1/3}):
 Σ_{d'≤Y₀} (λ/d')|R_{d'}| ≪ (log Y₀ + Y₀) H^{1/2+3ε′} ≪ H^{1−ε+3ε′}; for d' > Y₀, H/u ≤ Y₀ < d' for all u > U₀, and the separate bounds give
 ≪ H log H · Σ_{d'>Y₀} λωτ/(d'φ) ≪ H^{1/2+ε+2ε′}; the tails of the integrals ≪ Y₀^{−1+ε′}. So M(H) = c_off H + O(H^{1−ε+3ε′}).
CONCLUSION: Σ_{u > H^{1/2+ε}} w(u)P_u(H/u) = c_off H + O(H^{1−δ}). ∎ (pending reading)
WHERE THE ARGUMENT STOPS, AND WHY (the middle). The only term that needs U > H^{1/2} is the Weil term (Σ_d |β(d)| d^{1/2})² ≈ N³/k: incomplete
Kloosterman sums Σ_{u∼U} e(kcū/q) to moduli q = lcm(d₁,d₂) ≈ Y², nontrivial by Weil only for U > q^{1/2} ≈ Y, i.e. u > H^{1/2}. Below that one needs
cancellation in the sum over the moduli pairs (d₁,d₂) and the root numerators c = r₁d₂′ − r₂d₁′ of these incomplete Kloosterman sums — after
Poisson in u, sums of complete Kloosterman sums S(kc, m; q) averaged over q = lcm(d₁,d₂) with numerators from pairs of roots: the
Bombieri–Friedlander–Iwaniec / Deshouillers–Iwaniec regime (spectral large sieve for sums of Kloosterman sums), with λ(d) multiplicative hence
well-factorable. See PLAN §13.
NUMERICAL SANITY TEST OF STEP 4′(d) (dispersion-test.ts, f = t²+t+1, moduli d ∈ (1500, 3000] squarefree all-split, 141 moduli, Σω = 388):
S/(U·Σω) = 0.923, 0.911, 0.899, 0.910, 0.886 for U = K/8, K/2, 2K, 8K, 32K (k = 1) and 0.82–0.91 (k = 3): the dispersion square is its diagonal
to within 20% at every U, including U = K/8 below the Weil range. No hidden off-diagonal main term (the mean subtraction ε_d(k) = c_d(k)/φ(d) is
right), and the true off-diagonal is far below the Weil bound K³ — the obstruction at U < H^{1/2} is in the method, not in the arithmetic.

## 10. M1, first task: the dispersion square after Poisson (15 Sep, late) — DERIVATION (heuristic where marked)
Poisson in u modulo q (u ≡ x mod q, (x,q) = 1): Σ_{(u,q)=1} φ(u/U) e(aū/q) = (U/q) Σ_{m∈Z} φ̂(mU/q) S(a, m; q), S(a,m;q) = Σ*_{x mod q} e((a x̄ + m x)/q).
Inserting this into the square of §9 and undoing the sum over the roots:
    S = Σ_{d₁,d₂} β(d₁) β̄(d₂) (U/q) Σ_m φ̂(mU/q) T_m(d₁,d₂),   T_m(d₁,d₂) = Σ*_{x mod q} e(mx/q) ρ°_k(d₁; x̄) \overline{ρ°_k(d₂; x̄)},  q = lcm(d₁,d₂),
exactly (ρ_k(d; x̄) = Σ_{r∈R_d} e(k x̄ r/d) depends on x mod d only, so the pair lives mod q). Only |m| ≤ M₀ = q H^ε/U matter.
m = 0: [CORRECTED after the second reading of §9] T₀ is NOT only the diagonal. The mean is subtracted over all units mod d, not prime by
prime, so T₀(d₁,d₂) ≠ 0 in general when g = (d₁,d₂) > 1 and d₁ ≠ d₂: the reader computed, for D = −4, k = 1, T₀(5,65) = 10, T₀(5,85) = 10,
T₀(65,85) = 20, and for k = 3, T₀(17,1105) = −17. These terms are of diagonal size in total, ≪ U N/k³ (§9's degenerate and d₁ | d₂ bounds;
|c_q(a)| ≤ (a,q) ≤ q^{1/2}(a,q)^{1/2}), so the m = 0 part of S is ≪ H^{ε″} U N/k³ and the needed saving below concerns m ≠ 0 only.
LOCAL STRUCTURE of T_m (m ≠ 0). By CRT, with ρ_h(d) = Π_{p|d} ρ_{h·\overline{(d/p)}}(p) and ρ_t(p) = e(ts_p/p) + e(−ts_p/p), s_p² ≡ D (mod p):
 • p | d₁, p ∤ d₂: factor Σ*_x e(m′x/p)(e(k′s_p x̄/p) + e(−k′s_p x̄/p)) = S(k′s_p, m′; p) + S(−k′s_p, m′; p);
 • p | d₂, p ∤ d₁: the conjugate analogue;
 • p | g = (d₁,d₂): Σ*_x e(m′x/p) ρ_{k′x̄}(p) \overline{ρ_{k″x̄}(p)} = Σ_{±,±} S((±k′ ∓ k″)s_p, m′; p), where k′ ≡ k″ gives Ramanujan sums (−1).
 (m′, k′, k″ are the twists by the complementary moduli.) Equivalently ρ_t(p) is a normalised Salié sum (T(a,b;p) = ε_p √p (b/p) Σ_{y²≡4ab} e(y/p)).
 Weil: |T_m| ≤ 4^{ω(q)} q^{1/2}, which reproduces the N³/k of §9.
THE SAVING NEEDED. |B_k(I)| ≤ U Y H^{−δ} needs S ≤ U Y² H^{−2δ}; Weil gives S ≈ Y³ (k = 1). So below u = H^{1/2} one needs a saving of Y/U = H^{1−2a}
(U = H^a) in Σ_{d₁,d₂} β₁β̄₂ (U/q) Σ_{0<|m|≤M₀} φ̂(mU/q) T_m(d₁,d₂) over the Weil bound: H^{0.48} at a = 0.26, → 1 at a = 1/2.
WHERE IT COULD COME FROM (heuristic). The moduli q = lcm(d₁,d₂) run over a range of size ≈ Y²; Linnik–Selberg-type cancellation for
Σ_q S(a,m;q)/q (Kuznetsov, spectral large sieve) saves about (moduli range)^{1/2} ≈ Y over Weil, which exceeds the needed Y/U for every U ≥ 1.
Three things stand in the way, and they are the actual content of M1: (i) the numerators ±k s_p are the square roots of D modulo the prime
factors, not a fixed integer — this is the half-integral-weight structure (the Weyl sums of roots are Salié sums, and their spectral theory is
Proskurin's Kuznetsov formula, the input of DFI 2012 for u = 1); (ii) the coefficients are bilinear in (d₁, d₂) with q = lcm(d₁, d₂), not a
function of q, and the twists k′, m′ couple the factors; (iii) the exceptional spectrum and the large range m ≤ q/U (the Kloosterman sums are
far from the transition range only when U is large). A reasonable first goal: the case g = (d₁,d₂) = 1, where T_m factors into a product of
two Salié-type sums over independent moduli d₁, d₂ twisted by d̄₂, d̄₁ — a bilinear form in Kloosterman/Salié sums with the moduli as
variables.
ADVERSARIAL READING OF §9 (15 Sep, late; fresh model instance): "the extension to u > H^{1/2+ε} is correct"; no fatal error. Numerical checks by
the reader: CRT identity (7486 cases, all g > 1 pairs, 0 failures); (c, d₁′d₂′) = 1 and the degenerate claim (no counterexample, d ≤ 300, k < 60);
Lemma finfourier to 1e−11 including N ≥ d′; real-Y correction ≤ 0.42 ω; mean of ρ_k over units = ω c_{d′}(k)/φ(d′); c_k and ∂_N c_k bounds
(ratio ≤ 0.993); smooth incomplete Kloosterman ≤ 0.28 (U/q+1) q^{1/2} τ(q)(a,q)^{1/2}; the d-sums; and the dispersion with the REAL weights
β = λc_k/(4d²) (N = 40, d ≤ 600, U = 200 … 20000): S/diagonal = 0.64–0.77. Gaps (minor), fixes ADOPTED:
 (1) the factor (k,q)^{1/2} was dropped after (kc,q)^{1/2} ≤ (k,q)^{1/2} g^{1/2}: (k,q) ≤ (k,d₁)(k,d₂) and splitting by e = (k,d) gives
     Σ_d b_k(d) d^{1/2} (k,d)^{1/2} ≪ τ(k) N^{3/2} k^{−1/2}; same for the g-sum (even the crude k^{1/2} only changes H^{1−ε+η} to H^{1−ε+3η/2}).
 (2) δ = ½ min(δ₁, η − 3ε′, ε − η − δ₁ − ε″, 1/6 − ε/2 − δ₁ − ε″); with η ≠ ε/2, paper III's Step 4 for U ≥ H^{2/3+ε} gives H^{1−3ε/2+η+3ε′} (fine).
 (3) after folding, the sums run over d′ ∈ (2k, Z]; the single-exponential and ε₁ε₂ terms carry τ(k), (k,d)^{1/2}, absorbed in H^{ε″}.
 Cosmetic: Cauchy–Schwarz over the intervals I_j saves J^{1/2}; Step 5′ re-derived, all bounds check ("H/u ≤ Y₀ < d′" true but unnecessary).
 OVERSTATEMENT CORRECTED: the Weil term is NOT the only obstruction below H^{1/2}; Step 5′'s remainder ≪ Y₀ H^{1/2+3ε′} also needs Y₀ < H^{1/2}.
 That one is not intrinsic: an error t^{1/3+ε}d′^ε in Lemma AP(i) (the divisor problem for ζ(s)L(s,χ)), or averaging E_{d′}(t) over d′, removes it.
SECOND ADVERSARIAL READING OF §9 (15 Sep, late; fresh model instance, independent of the first): verdict "sound" — "the extension to
u > H^{1/2+ε} stands; the 2/3 in paper III came from an un-optimised Step 4, not from a real barrier." Numerical checks by the reader: the
Fourier identity for G°(a,N) to 5e−10 (d′ = 5…377, Y = 3…501, including d′ < N); real-Y correction ≤ 0.39 ω; the m = 0 terms of §10.
Agrees with the first reader's fixes (1)–(3) and the overstatement correction; disagrees with nothing. New points, recorded:
 (a) the G° part uses neither Lemma AP nor any property of w: it bounds Σ_u a_u X_u for any bounded a_u (Lemma AP enters only in Step 5′);
 (b) explicit sizes: ε₁ε₂ terms ≪ U τ(k)² log²/k⁴ (|c_d(k)| ≤ (k,d) < d/2); degenerate pairs ≪ U N τ(k)²/k³; non-degenerate pairs with
     d₁ | d₂ ≪ U N/k³; the h = 0 Poisson term (U/q)c_q(kc) is absorbed only via |c_q(a)| ≤ (a,q) ≤ q^{1/2}(a,q)^{1/2} — to be written out;
 (c) the dispersion bound H^{1+δ₁+ε″}Y^{−1/2} alone works for Y > H^{3δ₁}, i.e. almost up to u ≈ H; one common dyadic grid can be used;
 (d) Step 3 needs ε′ < η/3; paper III's Step 4 for U ≥ H^{2/3+ε} gives H^{1−3ε/2+η+3ε′}; admissible choice ε′ = ε/100, η = ε/4, δ₁ = ε″ = ε/10;
 (e) no published barrier is beaten: U ≈ q^{1/2} is the standard dispersion-plus-Weil threshold;
 (f) the §10 m = 0 statement was false (corrected above); §9 unaffected.
STATUS OF §9: two independent adversarial readings passed (model instances; no human check). To go into paper III as the extension of
Theorem typeII (decision 15 Sep: paper III takes Theorem E and the large-u range, then is frozen; the middle goes to a new paper V).

## 11. Consequence for paper III's Theorem A (15 Sep, late) — §9 has passed two readings; this derivation itself NOT YET READ
With §9 (pieces u > H^{1/2+ε} unconditional with a power saving) and Lemma tail (moduli above Y^{1+η} free), Hypothesis W is needed only for
u ≤ U₀ = H^{1/2+ε}. Re-running the proof of Theorem A with this U₀:
 • small moduli: H^{1/(2−θ)} Σ_{u≤U₀}|w| u^{B−1/(2−θ)} ≪ H^{1/2 + 1/(2(2−θ)) + B/2 + O(ε)}, < 1 iff B < (1−θ)/(2−θ); the k-sum converges under the same
   condition (exponent −2 + B + 1/(2−θ) < −1);
 • narrow window (frequencies k ≤ Y^{2η}, so the E-term of Prop. windowW vanishes): H^θ Σ_{u≤U₀}|w| u^{B−θ} ≪ H^{1/2 + θ/2 + B/2 + O(ε+η)}, < 1 iff
   θ + B < 1, implied by the first since (1−θ)/(2−θ) ≤ 1 − θ; plus Σ(H/u)^{1−η} ≪ H^{1−η/2};
 • moduli above Y^{1+η}: Lemma tail, ≪ H^{1−η/2+o(1)}.
So Theorem A holds under Hypothesis W(θ, B) with B < (1−θ)/(2−θ) alone — strictly weaker than θ + 6B < 1 (since 2 − θ < 6). At θ = 3/4 this is
B < 1/5 (paper III: B < 1/24). Note that no (θ, B) at all is known for the dilated roots uniformly in u; DFI's (3/4, 1/4) are for u = 1.
Not yet in paper III; to be read together with the paper text of the large-u theorem.

## 12. THE MIDDLE, FIRST MAP (15 Sep, night): what Weil plus a decomposition of w in u gives — HEURISTIC EXPONENT COUNT, NOT READ, NOT A CLAIM
Block u ∼ U = H^a, a ∈ (1/4, 1/2], Y = H/u ≍ H^{1−a}, notation of §9 / paper III Step 4b (G° = G − Ḡ, β(d) ≪ |λ(d)| min(k^{−2}, Y²d^{−2})).
0. FREE PARTS (rigorous, one line each; to be read):
 • Ḡ part: Σ_{d′}(λ(d′)/d′)|Ḡ_{d′}(Y)| ≪ Y^{ε′} (paper III, after (MH)), so Σ_{u≤H^{1/2+ε}} |w(u)|·(H/u)^{ε′} ≪ H^{1/2+2ε}. CONSEQUENCE: the
   "second obstruction" recorded after the first reading of §9 (Step 5′'s remainder Y₀H^{1/2+3ε′} needs Y₀ < H^{1/2}) is NOT an obstruction
   to extending the range: Step 5 is only needed for u > H^{1/2+ε}; for smaller u the dilation-averaged part is trivially small and only
   G° matters. [Correct the wording in PLAN §13 and paper III "What remains" item 1 — after the running reading, not during it.]
 • Small moduli of G°: |(λ/d′)G°_{d′}| ≤ |λ|ω(d′)(1 + σ/(8d′φ)), so the moduli d′ ≤ Y^{1−δ} give ≪ Y^{1−δ} per piece (Shiu).
 • Moduli d′ > Y^{1+η}: Lemma tail. Frequencies k > Y^{2η}: Step 4b(ii). So what is needed is the G° part with d′ ∈ [Y^{1−δ}, Y^{1+η}], k ≤ Y^{2η}.
1. w = 1 * χ * γ (Lemma AP's proof), Σ|γ(n)|n^{−1/2−ε} < ∞: the terms with n₃ > H^{δ₃} are ≪ UY·H^{−δ₃/3} trivially. So u = n₁n₂n₃, weights
   1(n₁), χ(n₂), γ(n₃), n₃ ≤ H^{δ₃}: two smooth(-periodic) atoms and one short arbitrary one.
2. TYPE I (a smooth atom n of length N, arbitrary cofactor m ≤ U/N): per (d, m) the n-sum is an incomplete Kloosterman sum modulo d; after
   the mean subtraction (the h = 0 Poisson term against ε_d(k)) it is ≪ H^ε(1 + N/d)d^{1/2}. Total ≪ H^ε(U/N)Y^{3/2}: power saving iff
   N ≥ Y^{1/2}H^{2δ}. (χ: split n₂ into classes mod |D|.)
3. TYPE II (u = u₁u₂, u_i ∼ U_i, arbitrary coefficients): Cauchy over (d, u₁) with u₂ inside, u₁ made smooth by positivity. Off-diagonal
   (u₂,r) ≠ (u₂′,r′): Weil modulo d for Σ_{u₁} e(kū₁(ū₂r − ū₂′r′)/d), ≪ d^{1/2} per term for U₁ ≤ d; fully degenerate pairs need
   d | D(u₂′² − u₂²) (≤ H^ε moduli per pair) or u₂ = u₂′ with r, r′ agreeing on a divisor of d: both of diagonal size. Result
   |B| ≪ H^ε(UY·U₂^{−1/2} + U^{1/2}U₂^{1/2}Y^{5/4}): power saving iff H^{2δ} ≤ U₂ ≤ U·Y^{−1/2}H^{−2δ}; the interval is nonempty iff U ≥ Y^{1/2}H^{4δ},
   i.e. a > 1/3.
4. COVERING. Type I unless n₁, n₂ < Y^{1/2}H^{2δ}; Type II if some sub-product of (n₁, n₂, n₃) lies in [H^{2δ}, UY^{−1/2}H^{−2δ}]. Residual set:
   n₁, n₂ both in (UY^{−1/2}, Y^{1/2}) up to H^{O(δ)}, n₁n₂ ≍ U — NONEMPTY for every a ∈ (1/3, 1/2) (e.g. n₁ ≈ n₂ ≈ U^{1/2}), and of full size
   (Σ over it of |weights| ≍ U·log(Y/U) up to constants). For a ≤ 1/3 Types I/II cover nothing. So Weil alone gives NO new range; it
   reduces H^{1/3} < u ≤ H^{1/2} to the balanced binary sums Σ_{n₁∼N₁}Σ_{n₂∼N₂} χ(n₂) F(n₁n₂) with N_i ∈ (U/Y^{1/2}, Y^{1/2}), N₁N₂ ≍ U, i.e. to
   sums over ideals 𝔞 of Q(√D) of norm ≍ U of F(N𝔞), F(u) = Σ_d β(d) ρ°_k(d; ū). Two-dimensional completion (Kl₃-type complete sums, size ≈ d)
   gives ≈ Y against the trivial U: useless for U < Y.
5. FACTORABLE MODULI (λ multiplicative): Heath-Brown's q-van der Corput, Σ_{n∈I} e(an̄/q) ≪ q^ε N^{1/2}(q₁^{1/2} + q₂^{1/4}) for q = q₁q₂
   (Weyl shift by multiples of q₁); q₁ ≈ q^{1/3}: N^{1/2}q^{1/6}. Then Type I needs N ≥ Y^{1/3}, Type II needs U₂ ≤ UY^{−1/3}, and the
   residual set is empty iff U ≥ Y^{2/3}, i.e. a ≥ 2/5. So u ∈ (H^{2/5+ε}, H^{1/2}] would be covered FOR THE MODULI with a divisor near d^{1/3};
   the others (a positive λ-proportion: primes, p₁p₂ with p₁ > d^{1/3}, …) get nothing beyond Weil. Prime moduli ≈ Y on average over u ∼ U
   is the dilated DFI/Tóth problem; not reachable this way.
6. WHICH SPECTRAL OBJECT. Type II's off-diagonal after Poisson in u₁ is Σ_{d≍Y} β(d) Σ_{0<|h|≤Y/U₁} Σ*_x e(hx/d) ρ_k(d;ū₂x̄) ρ_k(d;ū₂′x̄), locally
   Σ_± S(k s_p(ū₂ ± ū₂′), h; p): single modulus d ≍ Y, root numerators; saving needed over Weil U₂Y^{1/2} (= H^{1/2} for U₂ = U^{1/2}). §10's
   dispersion over u (pairs of moduli, q ≈ Y²) needs only Y/U = H^{1−2a}. So §10 is the better spectral target, and on the residual set of 4 the
   u-variable is a norm of an ideal (two smooth variables), which may help its Poisson step.
7. HONEST SUMMARY. Weil-type input (with a Type I/II decomposition of w and, optionally, factorable moduli) does not close any part of the middle
   for all u and all moduli. It localises the difficulty: (i) balanced products u = n₁n₂ (norms of ideals) in (H^{1/3}, H^{1/2}]; (ii) for
   a ∈ (2/5, 1/2], additionally only the non-factorable moduli. The spectral input (§10: sums over moduli of Kloosterman sums with root
   numerators, Salié / half-integral weight) is needed for (i); its required saving H^{1−2a} is smallest near a = 1/2. Literature round next:
   de la Bretèche–Drappeau (level of distribution of quadratic polynomials, Kloosterman sums with root numerators via Deshouillers–Iwaniec),
   Merikoski and Pascadi (n² + 1), bilinear forms with Salié sums, Iwaniec 1987 / Proskurin.

## 13. Grimmelt–Merikoski with a = u² (15 Sep, night) — HEURISTIC COUNT, NOT READ, NOT A CLAIM
IDENTIFICATION (exact for D < 0). Piece u counts ℓ ≤ Y with u²ℓ² + |D| ≡ 0 (mod k), (k,u) = 1, weight λ(k) = Σ_{e|k}κ(e): GM's Type I sum
(Theorem 1.4) with a = u², h = |D|, X = Y, level D = Y^{δ} (the e > Y^δ part is ≪ Y^{1−δ+ε} trivially), smooth ψ₂ in place of the Cesàro/sharp
weight (conversion as in paper III Lemma sharp). Equivalently: the roots m = uℓ ≤ H of the FIXED congruence m² ≡ D (mod k) in the
progression m ≡ 0 (mod u) — the dilation is a progression condition on the original roots.
HOW a ENTERS GM's PROOF (§5): level q = ad; skewness X/Y ≍ X a^{1/2}h^{−1/2}; K₁ ≺≺ (number of levels) + Z₁; K₂ ≺≺ (number of levels)·(ah)^{1/2}
+ ah·Z₂ (Prop 4.1 with h → ah: diagonal = levels × #Λ_{ah}, off-diagonal = pairs of Heegner points of determinant ah in the kernel support,
the level absorbed by a divisor bound, so it does not grow with the number of levels); Z₁Z₂Z₀ = X(ah)^{−1/2}, Z_i ≥ 1. (GM bound K₁, K₂ by
sums over all q ≤ aD, which loses a; restricting to q = ad should not.)
COUNT (h, D ≺≺ 1). Per u: bound ≈ (X u)^{1/2}·(K₁K₂)^{1/2} with K₁ ≈ 1, K₂ ≈ u²(Z₂ ≥ 1): ≈ X^{1/2}u^{3/2}, nontrivial against X iff u < X^{1/3} = Y^{1/3},
i.e. u < H^{1/4}. Averaged over u ∼ U (Cauchy over (u, d), levels u²d): K₁ ≈ U, K₂ ≈ U·U + U² ≈ U², bound for the block ≈ (XU)^{1/2}U^{3/2} = X^{1/2}U²
against the trivial UX: nontrivial iff U < X^{1/2} = Y^{1/2}, i.e. U < H^{1/3}. (Consistent with the earlier estimate u ≲ H^{0.26} for the
unaveraged kernel method, PLAN §13.) The obstruction is the off-diagonal ah·Z₂ with Z₂ ≥ 1: the number of pairs of Heegner points of
discriminant ≍ u²|D| at bounded hyperbolic distance ≍ u², which the level cannot absorb.
PICTURE (heuristic):
 • u > H^{1/2+ε}: proved (§9, paper III Theorem typeII).
 • u < H^{1/3−ε}: plausible by GM's kernel method with a = u² tracked and an average over u (to be done carefully; D < 0 only).
 • H^{1/3} < u ≤ H^{1/2}: Type I/II decomposition of w in u with Weil (§12) covers all but the balanced products u = n₁n₂ (norms of ideals).
 • The thresholds H^{1/3} (GM averaged ↔ §12 Type II window empty) and H^{1/2} (dispersion ↔ §12) are shared: at each, BOTH sides lose
   their saving, so even with all three pieces a log-width band around u = H^{1/3} and u = H^{1/2} would remain (Σ w(u)/u over a band
   [H^{c−ε}, H^{c+ε}] is ≍ ε log H, not a power saving). A power beyond one threshold is required at each.
 NEXT (rigorous order): (1) GM Theorem 1.4 for a ≤ H^{o(1)} ⇒ every piece with u ≤ H^{o(1)} has a power saving (D < 0) — small, citable;
 (2) track a in GM §4–§5; (3) the balanced-product sums of §12.4 against the spectral input.
§13 ADDENDUM (same night) — the spectral-gap factor was left out above. In GM's Theorem 2.1 the bound carries Z₀^θ with Z₀Z₁Z₂ = (X/Y)
(skewness, ≍ X a^{1/2}h^{−1/2} = Xu for h ≺≺ 1), and in GM's own ranges the θ-dependence disappears because D and h are large. In ours
(h, D ≺≺ 1) it does not: per u, Z₁ = Z₂ = 1 gives ≈ X^{1/2+θ}u^{3/2+θ}, nontrivial iff u < X^{(1/2−θ)/(3/2+θ)}: θ = 0 → u < Y^{1/3} (H^{1/4}),
θ = 7/64 → u < Y^{25/103} (≈ H^{0.195}). Averaged over u ∼ U (Z₁ = U, Z₂ = 1, Z₀ = X): ≈ X^{1/2+θ}U² against UX, nontrivial iff U < X^{1/2−θ}:
θ = 0 → H^{1/3}, θ = 7/64 → U < Y^{25/64} ≈ H^{0.28}. A larger level D (using more of λ's divisor structure) might remove θ as in GM; not
examined. So the "H^{1/3} averaged" of §13 holds only under Selberg's conjecture at this level of the count; unconditionally ≈ H^{0.28}.

## 14. Path A tested (15 Sep, night): the kernel counts at level u² — NUMERICS + HEURISTIC EXPONENT COUNT, NOT READ, NOT A CLAIM
SOURCE. Grimmelt–Merikoski arXiv 2505.00489 Theorem 8.1 (read): Σ_h β(h)⟨α₁|T_{h,1}ΔF|α_{2,h}⟩ ≪ q^{o(1)}δ^{−O(1)}(X/Y)^{1/2+o(1)}H^{1/2}Z₀^θ
⟨α₁|Δk_{Z₁²,X}|α₁⟩^{1/2}(Σ|β|²⟨α₂|Δk_{Z₂²,1}|α₂⟩)^{1/2}, Z₀Z₁Z₂ ≥ X/Y + 1; the win over the trivial bound comes only from Z₀^θ with θ < 1/2
("if α₁ = α₂, X₀ = 1, X₁ = X₂ = √(AD) the statement is trivial"). Their Type I proof (2505.00493 §5): level q = ad, functional α_{d,a,h} =
[c ≡ 0 mod ad][b ≡ 0 mod a] on the Heegner set Λ_{ah}, skewness X/Y ≍ X a^{1/2}h^{−1/2}; K₁ ≤ Σ_q ⟨I|K_q k|I⟩ ≈ (levels)(1 + R) + Z₁/q-type,
K₂ ≤ Σ_q ⟨α_q|K_q k|α_q⟩ bounded crudely by Prop 4.1 with h → ah: (levels)(ah)^{1/2} + ah·Z₂ — which, taken at face value, loses a = u².
TEST (gm-kernel-count.ts, data/gm-kernel-count-h1.txt; h = 1 i.e. D = −4, a = u², q = u², T = Z₂²): the exact quantities
 c_d(u) (diagonal) = 1,1,2,2,2,4,4,4,6,4,6,8,6 for u = 1..13 — ≍ u (the number of Γ₀(u²)-orbits of the family, as in the dilation draft);
 (K₂ − c_d)/√T at T = 64: 10.6, 3.5, 6.7, 3.6, 3.0, 3.5, 6.6, 3.5, 6.5, 2.1, 6.9, 2.6, 3.8 — O(1), NO GROWTH IN u (odd u ≈ 6.5, even u ≈ 3.5).
 So K₂ ≈ c·u + O(Z₂) per level, not u + u²Z₂: the congruences mod a on both points of a pair cut the off-diagonal by a.
CONSISTENCY. With K₁ ≈ 1 + Z₁/u², K₂ ≈ u + Z₂ and Z₀ = 1, Z₁Z₂ = Xu the bound is ≍ X, the trivial size: the normalisation is right.
EXPONENT COUNT (h ≺≺ 1). Per u, at divisor level E (λ = 1*κ, coefficients eκ(e) bounded, weight 1/E): K₁ ≈ E + Z₁/u², K₂ ≈ Eu + Z₂; Z₁ = Eu²,
Z₂ = Eu, Z₀ = X/(E²u²): contribution ≈ (1/E)(Xu)^{1/2}(X/(E²u²))^θ·E u^{1/2} = X^{1/2}u(X/(E²u²))^θ; with E = X^{1/2}/u (≥ 1 iff u ≤ X^{1/2}) the
θ-factor is 1 and the tail e > E is ≪ X/E = X^{1/2}u trivially. Total ≈ X^{1/2}u against X: POWER SAVING FOR u < X^{1/2−ε} = Y^{1/2−ε}, i.e.
u < H^{1/3−ε}, INDEPENDENT OF θ (GM's level trick). This replaces the §13 estimates (H^{1/4}, H^{0.28}): those used the crude K₂.
THE H^{1/3} BARRIER is robust in this method: averaging over u ∼ U gives X^{1/2}U² against UX (same threshold), and moving the dilation into a
Hecke operator (dilation draft: family W_u = restricted Hecke image of the h(4D) level-one points; Theorem 8.1's H^{1/2}(Σ|β|²)^{1/2} with h = u²)
gives X^{1/2}U² again. The diagonal ≍ u (number of orbits) is the obstruction. A Hecke structure of index ≍ u instead of u² (the restricted
operator of Prop classwise acts on level-one forms like √u·λ(u), Lemma B) would give X^{1/2}U^{3/2}, i.e. U < H^{1/2} — but that operator is
not a Hecke operator on the whole level-u² spectrum; idea only.
UPDATED MAP (heuristic): u < H^{1/3−ε} (D < 0) via GM with a tracked | (H^{1/3}, H^{1/2}] Weil Type I/II except balanced products | u > H^{1/2+ε}
proved. Shared thresholds H^{1/3} and H^{1/2}. RIGOROUS TASK for the small end: prove K₂(u) ≪ q^{o(1)}(E·u + Z₂) with the mod-a congruences kept
(adapt GM Prop 4.1: for τ.w₁, τ.z₂ ∈ S_{a,h}(e) write (m, aℓ, ak); u(g₁,g₂) = (a k₁k₂/(4h))(ℓ₁/k₁ − ℓ₂/k₂)² + (k₁k₂/4)(1/k₁ − 1/k₂)²; the
cross product is ≡ 0 mod a), then check Theorem 8.1's hypotheses (smooth dyadic f, δ, X/Y > δ) for our weights. Running: T up to 256, and h = 3.
§14 ADDENDUM (same night). (1) Larger radius, h = 1 (data/gm-kernel-count-h1-T256.txt): (K₂ − c_d)/√T at T = 256 is 11.4, 3.7, 7.3, 2.8, 4.5,
6.6, 7.5, 6.7 for u = 1, 2, 3, 5, 6, 7, 9, 11 — flat in u, slowly growing in T (log-type). (2) h = 3 (data/gm-kernel-count-h3.txt; u = 3 violates
gcd(a,h) = 1 and is excluded): at T = 64, 57.7, 14.0, 13.8, 45.4, 23.9, 14.5, 16.0, 40.9, 33.4 for u = 1, 2, 4, 5, 7, 8, 10, 11, 13 — no growth in u
(fluctuating with the splitting of the small primes). The u²-independence of the off-diagonal per level is confirmed for two discriminants.
(3) WHY (rigorous, elementary). For g = (A, B; B, C) put ⟨g₁, g₂⟩ = A₁C₂ + A₂C₁ − 2B₁B₂. If g_i ∈ S_{a,h}(e) (B ≡ 0 mod a, C ≡ 0 mod ae,
det = ah) then a | ⟨g₁, g₂⟩, and cosh d(z₁, z₂) = 1 + 2u(z₁,z₂) = ⟨g₁,g₂⟩/(2ah). Hence 2h(1 + 2u) ∈ Z: the distances between points of the family
take values u ∈ (1/(4h))Z − 1/2 with spacing INDEPENDENT OF a, whereas for general Heegner points of determinant ah the spacing is 1/(4ah).
Given g₂ = (m₂, aℓ₂, aek₂′) and N = ⟨g₁,g₂⟩/a, the unknown g₁ = (m₁, aℓ₁, aek₁′) satisfies m₁ek₂′ + m₂ek₁′ − 2aℓ₁ℓ₂ = N and m₁ek₁′ − aℓ₁² = h;
eliminating m₁: a k₂′ℓ₁² − 2aℓ₂ℓ₁k₁′ + m₂e k₁′² − Nk₁′ + hk₂′ = 0, a conic whose quadratic part has discriminant −4ah·(…) < 0 (definite), so after
completing the square it has ≪ (ahNk₂′)^{o(1)} integer points (representations by a definite binary form ≪ divisor function). Therefore every
point of the family has ≪ H^{o(1)}(hZ)^{1/2} weighted neighbours within u ≤ Z (sum over N ≤ 2h(1+2Z) against (1+u)^{−1/2}).
(4) CONSEQUENCE FOR THE COUNT. Even the weaker K₂ ≪ H^{o(1)}·(#orbits)·(1 + Z₂) suffices: with #orbits ≪ H^{o(1)}uE at divisor level E, K₁ ≈ E + Z₁/u²,
Z₁ = Eu², Z₂ = 1, Z₀ = X/(Eu): contribution ≈ X^{1/2}u(X/(Eu))^θ; with E = X^{1/2} (GM need D ≤ X^{1/2}) this is X^{1/2+θ/2}u^{1−θ} < X exactly when
u < X^{1/2}, FOR EVERY θ < 1 — and the tail e > E costs X^{1/2}. So the small end u < H^{1/3−ε} (D < 0) needs only: (a) #Γ₀(u²e)\S_{u²,h}(e) ≪ H^{o(1)}ue
(the diagonal; numerics c_d ≈ u/2 at e = 1; the dilation draft counts ≍ u·h(4D) orbits of W_u); (b) the neighbour count (3) made fully rigorous,
including the stabiliser weights; (c) GM Theorem 8.1's hypotheses for our weights: smooth dyadic f in (x, y) — our moduli k and the Cesàro/sharp
cut-off in ℓ must be smoothed (paper III Lemma sharp-type losses), small moduli by Poisson, and λ = 1*κ at level E = X^{1/2}.
§14 task (a), numerics (gm-orbit-count.ts, data/gm-orbit-count-h1.txt; h = 1). The diagonal c_d(u, e) at level u²e satisfies
c_d(u, e) = c_d(u, 1)·ρ(e) in all eight composite cases tested (e = 5, 13 split: ×2; e = 7 inert: 0), and c_d(u, 1) = 1, 1, 2, 2, 2, 4, 4, 4, 6, 4, 6, 8, 6, 8
for u = 1…13, 17 — for odd primes p: (p − χ₋₄(p))/2 (3→2, 5→2, 7→4, 11→6, 13→6, 17→8), p²: p(p − χ(p))/2 (9→6), a factor 2 per extra power of 2. This is
the "u − χ of the u(u+1) cosets" count of the dilation draft (Prop classwise) times the class number: task (a) should follow from that proposition.
Summed over e ≤ E: ≍ u·E·(log)^{O(1)}, as used in (4).

## 15. The H^{1/2} threshold seen from §12 (15 Sep, night) — HEURISTIC, NOT READ
At U = Y (u ≈ H^{1/2}) the §12 residual set (smooth atoms n₁, n₂ both in (UY^{−1/2}, Y^{1/2})) is EMPTY: Type I needs N ≥ Y^{1/2}H^{2δ}, Type II covers
U₂ ≤ UY^{−1/2}H^{−2δ} = Y^{1/2}H^{−2δ}. For U = YH^{−η} the residual is the band n₁ ≈ n₂ ≈ Y^{1/2} within H^{O(δ+η)} — of full weight (≍ (δ+η) log H in
the u-measure), so the H^{1/2} threshold does not close by itself, but the object left there is explicit: for each modulus d ≍ Y and root r,
    Σ_{n₁∼N₁} Σ_{n₂∼N₂} χ_D(n₂) e(k r \overline{n₁n₂}/d),   N₁ ≈ N₂ ≈ d^{1/2−η/2},  N₁N₂ ≈ d^{1−η}
— a smooth bilinear Kloosterman-fraction sum just below the completion / Cauchy–Schwarz threshold N₁N₂ ≈ d (two-dimensional Poisson gives
≈ d via Kl₃-type sums; Cauchy with arbitrary coefficients gives (N₁N₂d)^{1/2}; both trivial there). ANY power saving d^{−c} in this range, on
average over d ≍ Y and r, would push §12's covering past U = Y, and together with §9 (u > H^{1/2+ε}) remove the H^{1/2} band: the needed saving is
only H^{O(η)}. Candidate inputs: additive combinatorics for Kloosterman fractions (Bourgain–Garaev 2014, Korolev, Shkredov, Kerr), q-van der Corput
for composite d (Heath-Brown; saving when d has a factor near d^{1/3}: §12.5), averaging over d. Literature follow-up running. The same shape
(bilinear Kloosterman fractions at the completion threshold) is what Blomer–Pascadi 2607.24311 and Kerr–Shparlinski–Wu–Xi attack for Kloosterman
sums; for fractions with smooth variables the problem may be easier.
§15 numerics (kfraction-test.ts, data/kfraction-test.txt; D = −4, squarefree d ∈ [2·10⁴, 4·10⁴] with all primes ≡ 1 mod 4, all roots r, N = d^β):
rms |S|/√(#terms) = 0.90, 0.92, 0.83 and max |S|/#terms = 0.053, 0.045, 0.027 for β = 0.40, 0.45, 0.49 (N² = d^{0.8…0.98}). The smooth bilinear
Kloosterman fractions below the completion threshold show square-root cancellation, like random signs; no arithmetic obstruction — only
a missing proof, as for every other threshold so far.
§15 AFTER LITERATURE ROUND 5 (heuristic, not read). Bourgain–Garaev, Acta Arith. 164 (2014), arXiv 1309.1124, Theorems 1 and 3 (ANY modulus m, intervals
from 1, bounded coefficients, (a,m) = 1), give for M, N ∈ [q^{1/3}, q^{1/2}]: Σ_{m≤M,n≤N} α_mβ_n e(a\overline{mn}/q) ≪ MN(MN/q)^{1/8}(log q)^{O(1)} (agent's
computation with k₁ = k₂ = 2, to be re-derived). Consequence for the band U = YH^{−η} (η > 0 fixed): the §12 residual (n₁ ≈ n₂ ≈ U^{1/2}) at moduli
d ≥ U·H^{c} saves (U/d)^{1/8}; with the free cutoff d ≥ Y^{1−δ} (δ < η) every relevant modulus has d/U ≥ H^{η}Y^{−δ}, so the residual saves H^{−(η−δ)/8}
and u ∈ (H^{1/3}, H^{1/2}) up to the band near H^{1/2}… would be covered where §12's residual was the only gap — NO: the residual exists for every
U ∈ (H^{1/3}, H^{1/2}), and there MN = U vs moduli d ≍ Y ≥ U·(Y/U): the ratio Y/U = H^{1−2a} is a POWER for a < 1/2, so Bourgain–Garaev saves
(U/Y)^{1/8} = H^{−(1−2a)/8} on the residual throughout the middle, provided M, N ≥ q^{1/3}, i.e. U^{1/2} ≥ Y^{1/3}, i.e. a ≥ 2/5 (for a < 2/5 use
k₁ = k₂ = 3 etc.: Corollary 1 saves unless N₁, N₂ both lie near some q^{1/(2j)}). SO THE WHOLE MIDDLE (H^{1/3}, H^{1/2}) MAY BE COVERED BY
§12 + BOURGAIN–GARAEV, with savings that tend to 0 only at the two ends a → 1/2 (U/Y → 1) and near the exceptional sizes N ≈ q^{1/(2j)}.
REMAINING AT a = 1/2 exactly (U ≈ Y ≈ d): the critical M ≈ N ≈ q^{1/2}: prime q — Bourgain–Garaev Izvestiya 2014 Theorem 9 (intervals anywhere,
η = 0 allowed); q with a divisor in [q^ε, q^{1/2−ε}] — q-van der Corput; q = (small)·(prime) — Theorem 9 after CRT (unchecked); q = p₁p₂ with
p₁ ≍ p₂ ≍ q^{1/2} — OPEN (λ-weighted proportion of such moduli is not power-small).
TO CHECK BEFORE ANY OF THIS IS TRUSTED: (i) §12's Type I/II and residual analysis (under reading); (ii) that the residual sum really is
Σ_{n₁,n₂} α β e(a\overline{n₁n₂}/d) with a = k r ē-type constants coprime to d after removing (k,d), with the G°-mean subtraction and the Fourier
coefficients ξ_k(d,N) carried along (they depend on N(u) = ⌊H/(n₁n₂)⌋ — separation of variables needed, as Step 4b(iii)); (iii) re-derive the
(MN/q)^{1/8} bound from Bourgain–Garaev Theorems 1 and 3; (iv) the exceptional sizes q^{1/(2j)} in Corollary 1.
§15 CHECK (iii) DONE + CORRECTION of the exceptional set. Bourgain–Garaev arXiv 1309.1124 Theorem 3 read (pdftotext): for I_i = [1, N_i], |α_i| ≤ 1,
(a, m) = 1, all k₁, k₂ ≥ 1: |Σ α₁α₂ e_m(a x₁*x₂*)| < C_{k₁,k₂}(log m)^{2(k₁/k₂ + k₂/k₁)} [N₁^{k₁−1}/m^{1/2} + m^{1/2}/N₁^{k₁}]^{1/(2k₁k₂)}
[N₂^{k₂−1}/m^{1/2} + m^{1/2}/N₂^{k₂}]^{1/(2k₁k₂)} N₁N₂; Corollary 1: saving m^{−δ(ε)} as soon as ONE of N₁, N₂ avoids ∪_j [m^{1/(2j)−ε}, m^{1/(2j)+ε}].
With k₁ = k₂ = 2 and m^{1/3} ≤ N_i ≤ m^{1/2} the bound is (N₁N₂/m)^{1/8}N₁N₂(log m)^{O(1)} — the agent's computation is right.
EXCEPTIONAL SET, corrected: the §12 residual (both smooth atoms in (U/Y^{1/2}, Y^{1/2}), modulus d ≍ Y) escapes Bourgain–Garaev only if BOTH atoms are
within d^{±ε} of powers d^{1/(2j)}. With N₁N₂ = U ∈ (d^{1/2}, d) this forces N₁ ≈ d^{1/2} and N₂ ≈ d^{1/(2j)} (or swapped), U ≈ d^{1/2+1/(2j)}, i.e.
a = a_j := (j+1)/(3j+1): j = 1: 1/2; j = 2: 3/7; j = 3: 2/5; j = 4: 5/13; … → 1/3. So the heuristic picture of the middle is: power saving for every
u = H^a with a ∈ (1/3, 1/2) OUTSIDE bands around the points a_j, and inside each band only the case "one atom at the Pólya–Vinogradov size d^{1/2}"
(where Type I also just fails). In a band: q-van der Corput handles moduli d with a divisor in [d^ε, d^{1/2−ε}]; prime d are handled for j ≤ 3 by
Bourgain–Garaev Izvestiya 2014 Theorem 9 (p^{1/8}(N₁N₂)^{3/4}(N₁³/p + 1)^{1/16}(N₂³/p + 1)^{1/16} < N₁N₂ iff j < 4 at N₁ = p^{1/2}, N₂ = p^{1/(2j)};
statement from the agent, unchecked); d = p₁p₂ with p₁ ≍ p₂ ≍ d^{1/2} (and d = small·prime, j ≥ 4) are open. The bands accumulate at a = 1/3.
§15: Bourgain–Garaev arXiv 1211.4184 Theorem 9 checked from the paper (prime p, intervals in arbitrary position, |α_i| ≤ 1):
max_{(a,p)=1} |ΣΣ α₁α₂ e_p(a x₁*x₂*)| ≪ p^{1/8}N₁^{3/4}N₂^{3/4}(N₁³/p + 1)^{1/16}(N₂³/p + 1)^{1/16}. The prime-modulus claim above (bands a_j, j ≤ 3) stands.

## 16. READING of §12–§14 (15 Sep, night; fresh model instance, independent brute-force scripts) — CORRECTIONS ADOPTED
Verdicts: §12 sound as a heuristic map (all exponents re-derived; the negative conclusion stands; minor gaps below). §13: counts wrong in
places. §14: numerics correct (reproduced by an independent brute force, u = 2–7, and a fast version for prime u ≤ 43 to T = 256), derivation
WRONG in the exponent count.
FATAL for the claim as derived (§14 EXPONENT COUNT and addendum (4)): each divisor-level block e ∼ E was compared with the trivial size X of the
whole sum, but with κ(e) ≍ e^{−1+o(1)} its trivial size is X/E; the block e ≈ 1 (κ(1) = 1) dominates and no choice of E removes Z₀^θ there. The
"level trick" does nothing here; "independent of θ" and "for every θ < 1" are FALSE (Theorem 8.1 is useless for θ ≥ 1/2 anyway).
CORRECTED COUNT (per piece, X = H/u, h ≍ 1, skewness Xu; re-derived here and agreeing with the reader):
 (R) with the proved inputs — diagonal ≍ uE, off-diagonal ≪ H^{o(1)}·(diagonal)·(1 + hZ₂) (§14 addendum (3)): Z₁ = u², Z₂ = 1, Z₀ = X/u gives
     X^{1/2+θ}u^{1−θ}, nontrivial iff u < X^{(1−2θ)/(2−2θ)}, i.e. u < H^{(1−2θ)/(3−4θ)}: H^{1/3} at θ = 0, H^{25/82} ≈ H^{0.305} at θ = 7/64.
 (Hh) under hypothesis (a′) — the off-diagonal summed over the levels e ∼ E is ≪ H^{o(1)}Z₂, NOT multiplied by the number of orbits (supported by
     the numerics at e = 1 only): Z₁ = u², Z₂ = u, Z₀ = X/u² gives X^{1/2+θ}u^{1−2θ}, nontrivial iff u < X^{1/2} for every θ < 1/2, i.e. u < H^{1/3}.
 So: unconditionally (with the inputs we can prove) u < H^{0.305}; H^{1/3} needs θ = 0 or (a′). (a′) is the weakest link: an equidistribution-type
 count of Γ₀(u²e)-orbits of pairs of family points with ⟨g₁, g₂⟩ = aN, averaged over e; route to try: representations of the binary Gram matrix
 (2ah, aN; aN, 2ah) by the ternary lattice of level-q symmetric matrices (mass formula / Siegel), averaged over e.
§13 ERRORS: Z₀Z₁Z₂ ≥ Xa^{1/2}h^{−1/2} + 1 (= Xu), not X(ah)^{−1/2}; the averaged K₂ "U·U + U²" is wrong (off-diagonal ≈ u²Z₂ per u, different
determinants, total ≈ U³Z₂); "H^{1/3} averaged" in §13 and its PICTURE is WITHDRAWN (replaced by (R)/(Hh) above).
OTHER FINDINGS (adopted):
 • Normalisation: for t² + 1 (D = −4) w lives on even u; the right GM parameters are a = (u/2)², h = 1 (odd moduli) — gm-kernel-count.ts's "u" is u/2.
   For odd special primes p | (u, D) the family forms have content p and GM's Prop 4.1 step gcd(a₂,b₂,c₂,q) = 1 fails (cost O_D(1), but GM cannot
   be cited as stated; visible in the h = 3, u = 3 row). GM's sign "b² − ac = ah" is a slip; ac − b² = ah is right. The conversion of G° (Cesàro
   weights, frequencies, Ḡ) to GM's smooth counting sums is unwritten.
 • §14 (3): the quadratic part has discriminant exactly −4ah; the weighted neighbour count is ≪ H^{o(1)}·h·Z^{1/2} (Σ_{N≤4hZ}(N/4h)^{−1/2}); the
   conic is nondegenerate iff N ≠ 2h; the per-N count uses no congruence — the only gain is N ∈ aZ; so (3) gives K₂ ≪ H^{o(1)}·diag·(1 + hZ₂), no more.
 • §14 (4)(a): orbit count per level = orb(u²)·∏_{p|e}(1 + χ(p)) (0 if p | (u,e)), orb(p²) = (p − χ₋₄(p))/2 for all p ≤ 53: ≍ uρ(e), sum over e ≤ E ≍ uE.
 • gm-kernel-count.ts undercounts pairs at exactly u = T_max (quantised distances, float window): ≤ 3%; e.g. u = 1, 2, 4, 7 at T = 64 brute force
   86.62, 29.50, 31.70, 57.33 vs 86.12, 29.00, 30.83, 56.58. No conclusion changes; fix: integer test N ≤ 2ah(1+2T).
 • §12.2–12.3: freezing β on intervals while u = u₁u₂ needs a smooth partition / Mellin separation (H^ε); partially degenerate Type II pairs give
   zero-frequency terms (U₁/d)φ(g), summing to diagonal size — to be written out. §12.4: the n₃ truncation H^{δ₃} must shrink as a → 1/3.
   §12.5: q-vdC omits a term N·q₂^{−1/4} and needs N ≥ q₁ (harmless). §12.0: H^{1/2+2ε} → H^{1/2+ε+ε′}.
 • §15 (Bourgain–Garaev) was NOT part of this reading; it builds on §12 (sound) and must be read next.
§16 FOLLOW-UP: hypothesis (a′) REDUCED to the single level e = 1 (rigorous, short; to be read).
By CRT, P¹(Z/u²e) = P¹(Z/u²) × P¹(Z/e) and α(τ.g) factors as [conditions mod a] × ∏_{p|e}[Q_g(c₀,d₀) ≡ 0 mod p], Q_g(c₀,d₀) = Ac₀² + 2Bc₀d₀ + Cd₀².
For g₁ ≠ g₂ of the same determinant ah, the definite forms Q_{g₁}, Q_{g₂} have no common complex root (a common root forces the conjugate root too,
hence proportionality, hence equality at equal determinant), so Res(Q_{g₁}, Q_{g₂}) ≠ 0, |Res| ≤ H^{O(1)}. For p ∤ ah neither form vanishes mod p
(content p would give p² | ah), so each has ≤ 2 projective roots mod p, and a common root mod p forces p | Res. Hence for every pair
Σ_{e≤E, (e,2uh)=1} ∏_{p|e} |R_p(g₁) ∩ R_p(g₂)| ≤ Σ_{e | Res} 2^{ω(e)} ≤ τ₃(Res) ≪ H^{o(1)}, uniformly in E, while the diagonal sums to ≍ uE.
So Σ_{e≤E} off(u, e; Z₂) ≪ H^{o(1)} off(u, 1; Z₂), and (a′) is equivalent to the SINGLE-LEVEL statement
    (a″)  off(u, 1; Z₂) ≪ H^{o(1)}(1 + Z₂)   uniformly in u   [pairs of family points at level u² at distance ≤ Z₂², counted modulo Γ₀(u²)].
Numerics (gm-kernel-levels.ts, data/gm-kernel-levels-T16.txt, h = 1, T = 16, integer distance test): E = 1, 10, 30, 60 —
u = 3: diag 2, 6, 18, 30; off 24.6, 42.0, 46.4, 51.2 | u = 5: diag 2, 2, 14, 26; off 6.9, 6.9, 17.6, 17.6 | u = 7: diag 4, 12, 36, 60; off 23.9, 36.8, 49.0, 55.8.
The diagonal grows like E, the off-diagonal like a divisor average (×2 over E = 1…60), as the reduction predicts.
(a″) is supported numerically for prime u ≤ 43 (reader's fast.ts) and u ≤ 13 (ours); its proof is THE open step for H^{1/3} at the small end.

## 17. PROOF SKETCH of (a″): the single-level off-diagonal is u-free (15 Sep, night) — DERIVATION, NOT READ, NOT A CLAIM
Setting: u squarefree, (u, 2h) = 1, a = u². Family F_u = S_{a,h}(1) = {g = (A, B; B, C): AC − B² = ah, a | B, a | C}, Γ₀(a)-invariant.
STEP 1 (undilation). With δ = diag(1, 1/u), G := δgδ = (m, uℓ; uℓ, k) for g = (m, aℓ; aℓ, ak): det G = h, and F_u ↔ F′_u := {G ∈ S_h : u | B_G}.
The point of G is u·z(g) (dilation by u, an isometry), δΓ₀(u²)δ^{−1} = Γ₀⁰(u) := {b ≡ c ≡ 0 mod u}, and ⟨G₁,G₂⟩ = ⟨g₁,g₂⟩/u² = N ∈ Z with
cosh d = N/(2h). So K₂'s off-diagonal at level u² (e = 1) is Σ_{2h<N≤2h(1+2Z)} (N/2h)^{−1/2} P_u(N), P_u(N) := #{Γ₀⁰(u)-orbits of ordered pairs
(G₁, G₂) ∈ F′_u², G₁ ≠ G₂, ⟨G₁, G₂⟩ = N}; the diagonal is #Γ₀⁰(u)\F′_u.
STEP 2 (lift to level one). Every Γ₀⁰(u)-orbit of pairs lies in a unique SL₂(Z)-orbit O of pairs of forms of determinant h with ⟨G₁,G₂⟩ = N
(stabiliser ±I for distinct points). Hence P_u(N) = Σ_O #{γ ∈ Γ₀⁰(u)\SL₂(Z): u | B(γ.G₁), u | B(γ.G₂)} for any representative (G₁, G₂) of O,
and #O =: P₁(N) ≪ h^{1/2+o(1)}(hN)^{o(1)} (representatives G₂ ∈ Λ_h, and for each the conic {G₁ : det = h, ⟨G₁,G₂⟩ = N} has ≪ (hN)^{o(1)} integer
points — §14 addendum (3) with a = 1; nondegenerate for N ≠ 2h).
STEP 3 (local count). By CRT, Γ₀⁰(u)\SL₂(Z) ≅ ∏_{p|u} T_p\SL₂(F_p) with T_p the diagonal torus, and T_p\SL₂(F_p) ≅ {ordered pairs of distinct lines
(L₁, L₂) in F_p²} (rows of γ up to (t, t^{−1})). The entry B(γ.G) = (a₀,b₀)G(c₀,d₀)ᵗ is the G-bilinear pairing of the rows, so the condition is
L₁ ⊥_{G} L₂. For one form (p ∤ h, G nondegenerate mod p): L₂ = x arbitrary, L₁ = (Gx)^⊥, distinct from x unless x is G-isotropic:
c_p(G) = p + 1 − (1 + χ_{−h}(p)) = p − χ_{−h}(p). [This is the diagonal: ∏_{p|u}(p − χ(p)) per SL₂(Z)-class, matching the numerics (p − χ(p))/2
with the ±I / class-number factor.] For a pair: L₁ must be orthogonal to both G₁x and G₂x, so G₁x ∥ G₂x, i.e. x is an eigenline of G₂^{−1}G₁ mod p,
whose characteristic polynomial is det(G₁ − λG₂)/h = λ² − (N/h)λ + 1 (det(G₁ − λG₂) = det G₁ − λ⟨G₁,G₂⟩ + λ² det G₂). If G₂^{−1}G₁ is not scalar mod p
there are ≤ 2 eigenlines, so c_p(G₁,G₂) ≤ 2. If it is scalar, G₁ ≡ λG₂ mod p with λ² ≡ 1 and N ≡ ⟨λG₂,G₂⟩ = 2λh, so p | N² − 4h², and c_p ≤ p + 1.
Hence ∏_{p|u} c_p(G₁,G₂) ≤ 2^{ω(u)} ∏_{p | (u, N² − 4h²)} (p + 1)/2 ≤ 2^{ω(u)} gcd(u, N² − 4h²)·(3/2)^{ω(u)}.
STEP 4 (sum over N). P_u(N) ≪ u^{o(1)} P₁(N) gcd(u, N² − 4h²), and with M = 2h(1 + 2Z):
Σ_{2h<N≤M} N^{−1/2} gcd(u, N² − 4h²) ≤ Σ_{d|u} d Σ_{2h<N≤M, d | N²−4h²} N^{−1/2} ≪ Σ_{d|u} d·ρ(d)·(M/d)^{1/2}·d^{−1/2}·(1 + …) ≪ τ₃(u)M^{1/2}
(the N ≡ ±2h mod d with N > 2h have N ≥ d − 2h, so Σ_j (jd)^{−1/2} over j ≤ M/d + 1 is ≪ (M/d)^{1/2}d^{−1/2}·… — to be written carefully, including d > M).
CONCLUSION (sketch): off(u, 1; Z₂) ≪ H^{o(1)} h^{O(1)} (1 + Z₂) UNIFORMLY IN u — hypothesis (a″) — and with §16's reduction, (a′). The diagonal is
≍ ∏_{p|u}(p − χ(p)) ≍ u. So the GM small end reaches u < H^{1/3−ε} for D < 0 and every θ < 1/2, modulo: (c) the conversion of G° to GM's smooth
sums, the special primes p | (u, D) and the 2-adic normalisation (§16), stabiliser weights, and GM Theorem 8.1's hypotheses. The prediction
"off(u,1) independent of u, with a factor depending on ω(u) and on u mod small primes" matches gm-kernel-count (odd/even u pattern).
§16/§17 numerics at T = 64 (data/gm-kernel-levels-T64.txt, h = 1): E = 1, 10, 30, 60 — off = 53.6, 87.2, 121.3, 128.7 (u = 3); 23.7, 23.7, 48.7, 50.9 (u = 5);
53.3, 92.2, 115.8, 128.8 (u = 7); 55.5, 103.4, 136.4, 143.7 (u = 11), against diag 2→30, 2→26, 4→60, 6→90. Over E = 1…60 the off-diagonal grows by ≤ 2.5
(divisor-like) while the diagonal grows ×15; at fixed E the off-diagonal does not grow with u (u = 3, 7, 11 agree within 12%). Consistent with §16 FOLLOW-UP
and §17. A reading of both is running.

## 18. Item (c): our pieces as Grimmelt–Merikoski Type I sums (15 Sep, night) — PLAN WITH ESTIMATES, NOT READ
Target (small end, D < 0): for u ≤ H^{1/3−ε}, P_u(Y) ≪ Y^{1−δ}·(Y^{1/2}/u)^{−c} uniformly, Y = H/u.
1. Reduction of the polynomial. (u, D) = 1: Q_u(x) = u²x² − D = a x² + h with a = u², h = |D|. t² + 1: w lives on even u = 2u′, Q_u/4 = u′²x² + 1
   (a = u′², h = 1, odd moduli). Special odd p | (u, D) with p² ∤ D: Q_u/p = p u′²x² + |D|/p (a = p u′², h = |D|/p, gcd(a, h) = 1); the undilation
   of §17 uses δ = diag(1, 1/u′) and determinant p·h — finitely many p, absorbed in constants. D > 0 is NOT covered (GM need a, h ≥ 1).
2. Moduli weights. The admissible weight is λ(k)μ²(k) on k | aℓ² + h (such k are automatically coprime to u, and their primes split or ramify);
   λ = 1 * κ with κ(p) = 4/(p−4) (so eκ(e) ≤ 4^{ω(e)}·O(1), divisor-bounded), μ² = Σ_{m²|k} μ(m). So λμ²(k) = Σ_{e|k, m²|k} κ(e)μ(m): Type I with level
   lcm(e, m²); the part m > M costs ≪ Y/M, the part e > E costs ≪ Y/E (block trivial sizes; cf. KNOWLEDGE F48 — every block compared with its own
   trivial size).
3. Moduli ranges. k ≤ Y^{1−η}: the Cesàro count over a progression has error ≤ k, total ≪ Y^{1−η}·H^{o(1)} — free. k > Y^{1+η}: Lemma tail — free.
   Window Y^{1−η} < k ≤ Y^{1+η}: smooth dyadic partition ψ₁(k/K) with the factor K/k absorbed.
4. The ℓ-weight. For k > Y (and after a trivial adjustment for k ≤ Y), Σ_{roots ℓ ∈ [1,k]} (Y − ℓ)^+ = ½ Σ_{roots ℓ ∈ Z∖{0}} (Y − |ℓ|)^+ by the symmetry ℓ ↦ −ℓ
   (0 is a root only for k | |D|). The tent (Y − |ℓ|)^+ is smoothed at scale Δ = Y^{1−η′} near its three kinks; the change is ≪ Δ per root in intervals of
   length Δ, i.e. ≪ Σ_{k∼K} k^{−1}(ρ(k)Δ²/k + Δ·#{ℓ ≤ Δ : k | aℓ² + h}) ≪ H^{o(1)}Δ²/K — a power saving for K ≍ Y. The smoothed tent is ψ₂(ℓ/Y) with
   ψ₂^{(J)} ≪ (Y/Δ)^J = Y^{Jη′}: GM's δ^{−O(1)} loss is Y^{O(η′)} — to be balanced against the saving.
5. Main terms. GM subtract ϱ(k)X∫ψ₂/k per k; paper III's piece subtracts the mean E_u (and has the nuisance term (E_u − 1)Y/2): the two main terms
   agree up to the smoothing errors of 4 and the small-moduli bookkeeping of Prop pieces — to be checked line by line.
6. Then Theorem 8.1 with q = ae·m²-type levels, the corrected count §16 (Hh) with §17's off-diagonal, and the diagonal ≍ u·(level count) give, per
   dyadic block (K, E, M), a bound X^{1/2+θ}u^{1−2θ}·Y^{O(η′)}·H^{o(1)} against the block's trivial size — nontrivial for u < Y^{1/2−O(η′)}.
OPEN POINTS for the rigorous write-up: GM Theorem 8.1's constant dependence (q^{o(1)}, δ^{−O(1)}), the stabiliser weights, 2-adic and special
primes, and whether the level m² (non-squarefree) disturbs §16's CRT reduction (P¹(Z/m²) is not a product of fields; handle by Möbius over
m ≤ M with M = Y^{η} and trivial bounds at the prime-square factors).

## 19. READING of §15 (15 Sep, night; fresh model instance; scripts reader-bg/sav.py, sav2.py, slope.py, num.py) — CORRECTIONS ADOPTED
Supersedes the inconsistent paragraphs of §15 ("… would be covered … — NO:", "the residual is EMPTY at U = Y").
(A) Reduction to Bourgain–Garaev's form: right. The mean term ωc_d(k)/φ(d) is trivially ≪ U(log H)^C; with g = (k,d), m = d/g ≥ d/K₁, a = (k/g)·r·n̄₃ is a unit
    mod m; coprimality conditions go into the arbitrary coefficients; dyadic supports sit inside initial intervals; the bound is uniform in a. GAP: the
    frozen ξ_k(d, N_j) and the block cut-off depend on n₁n₂n₃ (hyperbolic region): separate by a smooth partition + Mellin (loses J = H^{δ₁}) or Mellin
    of ξ_k over the block (loses ≈ 1 + kY/d ≤ H^{2η+δ}); all such losses must be ≪ the BG saving. (Paper III Step 4b(iii)'s "+1 as U ≥ H^{1/2}"
    becomes Y/U below H^{1/2}: harmless.)
(B) ERROR: the saving (U/Y)^{1/8} holds only for a ∈ [4/9, 1/2). The residual contains unbalanced splits ν₁ + ν₂ = θ = a/(1−a), ν_i ∈ (θ − 1/2, 1/2);
    with s(ν,k) = min(1/2 − (k−1)ν, kν − 1/2) the saving is m^{−(s(ν₁,k₁)+s(ν₂,k₂))/(2k₁k₂)}, k_i optimal. Minimum over the residual (H-exponent):
    a = 0.3925: 0.00085; 0.405: 0.0038; 0.415: 0.0022; 0.435: 0.0056; a ≥ 4/9: (1−2a)/8. Near a = 1/3 the k_i → ∞ and the constants (2k)^{45k²/k′},
    (log m)^{2(k₁/k₂+k₂/k₁)} blow up: δ(a) > 0 is NON-UNIFORM and non-effective there.
(C) Band centres a_j = (j+1)/(3j+1) confirmed (a fine scan finds zeros only there); at the corner (ν₁, ν₂) = (1/2, 1/(2j)) the Type I and Type II edges meet,
    so margins enlarge it. The saving vanishes linearly, ≈ c|a − a_j| (c ≈ 0.16, 0.115, 0.089, 0.074 below a_j for j = 2…5; ≈ 0.8 above), plus a fixed width
    O(δ + δ₃ + η + ε′). Bands merge for a − 1/3 ≲ (δ + η + δ₃)^{1/2}; at a = 1/3 nothing is covered.
PRIMES (understatement corrected): Izvestiya Theorem 9 covers primes for a > 5/13; Izvestiya THEOREM 10 (N_i < p^{(k_i+1)/(2k_i)}: bound
p^{1/(2k₁k₂)}N₁^{−1/(k₂(k₁+1))}N₂^{−1/(k₁(k₂+1))}(N₁N₂)^{1+o(1)}) with k₂ = 1, k₁ ≥ 2j covers every corner, and numerically the whole residual for all
a ∈ (1/3, 1/2); d = s·p with s small reduces to intervals in arbitrary position mod p (cost s²). Theorem 10 checked only from pdftotext — re-read.
q-van der Corput for an atom at d^{1/2±τ}: nontrivial iff q₁ ∈ (d^{2τ+c}, d^{1/2−τ−c}); fine with ε ≫ τ.
WHAT STAYS OPEN in the bands: moduli with no divisor in [d^ε, d^{1/2−ε}] other than s·p, i.e. d = s·p₁p₂ with p₁ ≍ p₂ ≍ d^{1/2}; and the band at a = 1/2
is shared with §9, so a log-width band around u = H^{1/2} stays open for those moduli. Near a = 1/3: nothing uniform.
LEAD (the reader's finding 6): the bands come from the ENERGY input, not from Hölder. At N₂ = m^{1/(2j)}, k₂ = j + 1, a saving needs J_{2k₂}(N₂) < m^{1/2+1/j−c};
Bourgain–Garaev Theorem 1's off-diagonal term N^{3k−1}/m is exactly m^{1/2+1/j}. ANY power improvement of J_{2k}(N) = #{x₁* + … + x_k* ≡ x_{k+1}* + … + x_{2k}* mod m,
x_i ≤ N} beyond (N^{2k−1}/m + 1)N^k for COMPOSITE m and initial intervals removes band j for all moduli; at k = 2, N = m^{1/2} it would also handle a = 1/2
including balanced p₁p₂. Numerics (m = 100003 prime, 255255 composite, N = m^{1/2}): J₄/(2N²) = 1.51, 1.08 — the diagonal dominates; Theorem 1's bound
overshoots by ≈ N. For primes Izvestiya Theorem 1 (N^{2k²/(k+1)}) already does this. TARGET: an energy bound for reciprocals of an initial interval
modulo a composite (squarefree) m, e.g. J₄(N) ≪ m^{o(1)}(N² + N^{4−c}) at N ≈ m^{1/2}.
OVERALL (heuristic): power saving for each FIXED a ∈ (1/3, 1/2) ∖ {a_j}, δ(a) ≍ c_j·dist(a, {a_j}), with parameter nesting ε′ < η/3, η, δ₁, δ, δ₃ ≪ δ_BG(a);
NOT a statement about the whole middle (bands, balanced two-prime moduli, a → 1/3). Weakest links: §12 Type II as left by §16 (partially degenerate pairs,
β frozen under u = u₁u₂) and the separation of variables in (A).
§19 LEAD, numerics (recip-energy.ts, data/recip-energy.txt): J₄(N) for N = m^{1/2}: J₄/(2N′² + N′⁴/m) = 1.008–1.017 for primes (10⁶, 4·10⁶), balanced
p₁p₂ (1009·997, 2003·1999), p·7, 101·9901 and two many-factor moduli (up to 4.9·10⁷); J₄/N′³ = 0.0005–0.003 (Bourgain–Garaev's N³ term overshoots by ≈ N).
At N = m^{1/4}: ratios 0.96–1.12. So J₄ ≈ diagonal + random for EVERY modulus type, balanced two-prime moduli included: the energy target of §19 is true
numerically; the missing input is a proof for composite m. (Integer reformulation: x₁* + x₂* ≡ x₃* + x₄* ⇔ (x₁+x₂)x₃x₄ − (x₃+x₄)x₁x₂ = mt with |t| ≤ 2N³/m;
for fixed x₁, x₂ the (x₃, x₄) lie on (Ax₃ − B)(Ax₄ − B) = Amt + B² (A = x₁+x₂, B = x₁x₂): divisor bound per t gives only N^{3+ε} — the known bound; the
needed gain is equidistribution of this cubic form's values in residue classes mod m, i.e. a modular-hyperbola count in short boxes with error
below m^{1/2}.) Literature follow-up on energy bounds for composite moduli running.

## 20. A new energy input and the saving map of the middle (15 Sep, night) — HEURISTIC, NOT READ, NOT A CLAIM
INPUT (side agent's transfer, unverified; my own check of the steps below agrees). Cilleruelo–Garaev, GAFA 21 (2011), arXiv 1007.1526, Theorem 1(4):
#{(x, y) ∈ [L+1, L+M]² : xy ≡ λ (mod p)} < M^{3/2+o(1)}p^{−1/2} + M^{o(1)} for λ a unit. The proof (Dirichlet: tL ≡ u₀ (mod m), 1 ≤ t ≤ T, |u₀| ≤ m/T;
lift (u₀ + tx′)(u₀ + ty′) = t²λ₀ + ms; divisor bound per s; vanishing factors excluded since t² < m and λ is a unit) never uses that p is prime, so
it holds for every modulus m. Since x* + y* ≡ λ ⇔ (x − λ*)(y − λ*) ≡ λ*² (a hyperbola in a square box with equal shifts), J₂(λ) ≪ m^{o(1)}(N^{3/2}m^{−1/2} + 1)
for units λ (non-units: gcd g ≤ 2N, same bound mod m/g), and
    J₄(N) = Σ_λ J₂(λ)² ≤ N² max_λ J₂(λ) ≪ m^{o(1)}(N² + N^{7/2}m^{−1/2})   for EVERY modulus m.
At N = m^{1/2} this is N^{5/2} (Bourgain–Garaev: N³; numerics: ≈ 2N²). In Bourgain–Garaev's Hölder inequality |S|⁸ ≤ m N₁⁴N₂⁴J₄(N₁)J₄(N₂) it gives
|S| ≪ m^{o(1)}(N₁N₂)^{15/16} at N₁ = N₂ = m^{1/2}, and at the band corners (N₁ ≈ m^{1/2}, N₂ ≈ m^{1/(2j)}) the pairing k₁ = 2, k₂ = j (with
J_{2j}(N₂) ≪ N₂^{j+o(1)} from BG Theorem 1, since N₂^{2j−1} ≤ m) gives |S|^{4j} ≤ m·N₁^{4j−4}N₂^{2j}·N₁^{5/2}·N₂^{j} = (N₁N₂)^{4j}·m^{−1/4}: saving m^{−1/(16j)}.
SAVING MAP (bg-saving-map.py, data/bg-saving-map.txt): minimum over the §12 residual (ν₁ + ν₂ = a/(1−a), ν_i ∈ (θ − 1/2, 1/2); all k₁, k₂ ≤ 12; energy
bounds BG Theorem 1, the new J₄, and J_{2k} ≤ N^{2k−4}J₄), H-exponent:
  a = 0.3383: 0 (old 0) | 0.3433: 0.0005 (0) | 0.3583: 0.0047 | 0.3833: 0.0092 | 0.4033: 0.0134 | 0.4283: 0.0178 (old 0.00004, band a₂ = 3/7 GONE) |
  0.4533: 0.0280 | 0.4833: 0.0302 | 0.4999: 0.0312 (old 0.00002: the a = 1/2 band GONE, saving → 1/32).
READING. With the new J₄ the bands a_j disappear and the saving is positive for every a ∈ (1/3, 1/2], increasing, and UNIFORM on [1/3 + c, 1/2] for each
c > 0; at a = 1/2 it is ≈ H^{−1/32}. Above a = 1/2 the §12 residual is empty (U > Y), so Types I/II alone cover u ∈ [H^{1/2}, H^{1/2+ε₀}] with their margin
savings, and §9 covers u > H^{1/2+ε₀} for a FIXED ε₀. Hence, IF §12 (with the §16/§19 gaps filled: partially degenerate Type II pairs, separation of variables)
and the J₄ transfer hold, the pieces with u ∈ [H^{1/3+c}, H] have a power saving for every c > 0 — the H^{1/2} threshold is CROSSED — and the only band
left is a neighbourhood of u = H^{1/3}, where both atoms sit at d^{1/4} (needs J₆ below N⁴ at N = m^{1/4}, open even for primes) and where the GM kernel
method (§14–§17) also stops. Positive discriminants D > 0 are covered by the §12/§20 route (no GM needed) but NOT by the small end.
TO CHECK: (1) the J₄ transfer from Cilleruelo–Garaev's proof, line by line, for composite m (including t sharing factors with m, non-unit λ, and
the "equal shifts" requirement); (2) bg-saving-map.py against the Hölder inequality as printed (bg1309.txt, proof of Theorem 3), the residual
region, and the conversion of m-exponents to H-exponents with the moduli range d ∈ [Y^{1−δ}, YH^η]; (3) uniformity near a = 1/2 from both sides.

## 21. READING of §16 FOLLOW-UP and §17 (15 Sep, night; fresh model instance; scripts reader-a2/) — CORRECTIONS ADOPTED
R1 (reduction to e = 1): CORRECT — a direct level-q brute force (no CRT) reproduces gm-kernel-levels exactly; 2000 pairs, no violation. Sharper: Res(Q_{g₁}, Q_{g₂})
   = ⟨g₁,g₂⟩² − 4 det g₁ det g₂ = u⁴(N² − 4h²), so nonvanishing is N ≠ 2h and the contributing levels satisfy e | N² − 4h²; extends to non-squarefree e
   (common root mod p^k ⇒ p^k | Res, Hensel ≤ 2 roots); primes p | (e, h) not covered.
R2 (undilation): CORRECT (undilated count reproduces off(u,1) exactly, u = 3, 5, 7, 11, T = 16, 64).
R3 (lift to level one): CORRECT. Cleaner P₁ bound: W = 2hG₁ − NG₂ ∈ G₂^⊥ (rank 2) with −det W = h(N² − 4h²): representations by a definite binary lattice
   ≪ (hN)^{o(1)} uniformly. Kernel weight is (4h/(N+2h))^{1/2}, not (N/2h)^{−1/2} (harmless).
R4 (local count): CORRECT (25,663 pairs, p ≤ 13, 8 values of h, 0 failures; single-form count p − χ; ≤ 2 non-scalar; c_p = 0 when N² − 4h² is a non-residue;
   CRT product matches brute force for u = 15, 21, 35). Diagonal factor 2 is |Aut⁺(I)/±I| (3 for (2,1;1,2)); elliptic stabilisers weighted.
R5 (Step 4): FALSE AS STATED — for d | u there are 2^{ω(d)} classes N² ≡ 4h² mod d, least N ≈ √d in mixed classes; counterexample u = N₀² − 4, M = N₀ (ratios
   1.9, 12, 50, 124). FIX (adopted): if G₁ ≡ λG₂ mod p then G₁ − λG₂ = pW, so p² | h − λN + λ²h and p² | N² − 4h²; hence ∏c_p ≤ 2^{ω(u)} g₂(N) with
   g₂ = ∏_{p|u, p²|N²−4h²} p, g₂² | N² − 4h², and Σ_N N^{−1/2} g₂(N) ≤ Σ_{d|u} d Σ_{d²|N²−4h²} N^{−1/2} ≤ 3τ₃(u)M^{1/2} (ρ(d) classes mod d², least N ≥ d).
   Numerically ≤ 0.19 τ₃(u)M^{1/2}. With the fix (a″) holds for squarefree u, (u, 2h) = 1, all Z₂, uniformly in u.
R6 ((Hh) count): RIGHT — per block e ∼ E: (X/E)(u²E²/X)^{1/2−θ} against X/E; blocks E ≥ X^{1/2}/u trivially ≪ X^{1/2}u; total ≪ H^{o(1)}(X^{1/2+θ}u^{1−2θ} + X^{1/2}u):
   nontrivial iff u < X^{1/2} ⇔ u < H^{1/3}, any θ < 1/2 — GIVEN the two gaps below.
GAPS (new):
 (G1) K₁. (Hh) uses K₁ ≈ E + Z₁/u²; GM's (5.2) is K₁ ≺≺ D(1 + 𝒳) + 𝒳^{−1} + Z₁ with 𝒳 = X/K (positivity extension to all q ≤ aD, no 1/q saving). Without the
      1/u² saving only u < X^{1/2−θ} ≈ H^{0.281} (θ = 7/64). Needed LEMMA: for q = u²e and R = 𝒳 ≤ 1, Σ_{γ∈Γ₀(q)} k_{Z²,R}(γ) ≪ H^{o(1)}(1 + Z/q + 1/(qR))
      (split parabolic/lower-triangular elements; for the rest a′d′ − 1 = b′c′ ≡ 0 mod q and a divisor bound; keep only the levels u²e). The term 1/(qR) =
      K/(Xu²e) needs K ≤ e u² X^{1+η}: GM's complementary-divisor reduction (K ≤ DX^{1+η}) redone with a = u².
 (G2) Non-squarefree and even u (D = −4 gives a = (u/2)² with u/2 arbitrary). Numerics flat (off = 28.5, 29.7, 29.9, 32.4 for u = 2, 4, 8, 16; 52.2, 57.4, 35.1 for
      u = 9, 27, 25, T = 64). Route for odd p^k: c_{p^k} = #{x ∈ P¹(Z/p^k): det(G₁x, G₂x) ≡ 0 mod p^k, x not G₁-isotropic mod p}; the binary form det(G₁x, G₂x) has
      discriminant exactly N² − 4 det₁ det₂ (checked symbolically + 20,000 cases); suggests c_{p^k} ≪ p^{min(k, ⌊v_p(N²−4h²)/2⌋)} (brute force mod 9, 25, 27, 49:
      max ≈ 2p^{⌊v/2⌋}). p = 2 separately.
NUMERICS (reader): off(u,1)/√T at T = 256: h = 1, all 92 primes u ≤ 499: mean ≈ 5.5 in every range, max 7.3; composite u ≤ 1365: ≤ 9; h = 2: 17–28; h = 5: ≈ 80–100
   for u ≥ 11. No growth in u. Pairs with G₁ ≡ ±G₂ mod p vanish once p² > N² − 4h², as the fix predicts.
Other u-dependence in Theorem 8.1: none beyond K₁ and the content at p | (u, D) (q^{o(1)} = H^{o(1)}; θ ≤ 7/64 uniform; X/Y > δ automatic; 𝒳 < 1 allowed).
STATUS OF THE SMALL END (D < 0): u < H^{1/3−ε} for every θ < 1/2 modulo (G1), (G2), §18's conversion, special primes, p = 2. Without (G1): H^{0.281}.

## 22. Gaps (G1) and (G2) of §21 (15 Sep, night) — DERIVATIONS + NUMERICS, NOT READ
(G1) LEMMA (K₁ at level q). For q ≥ 1, 0 < R ≤ H^{O(1)}, Z ≥ 1: K₁(q; Z, R) := Σ_{γ∈Γ₀(q)} k_{Z²,R}(γ) ≪ H^{o(1)}(1 + R + 1/(qR) + Z/q), where
k_{Z²,R}(g) ≤ 1[u_R(g) ≤ Z²](1 + u_R(g))^{−1/2}, u_R = (a² + (b/R)² + (cR)² + d² − 2)/4.
Sketch. Support: |a|, |d| ≤ 2Z + 1, |b| ≤ 2ZR, |c| ≤ 2Z/R. c = 0: a = d = ±1, Σ_b (1 + b²/(4R²))^{−1/2} ≪ 1 + R log. b = 0, c ≠ 0: a = d = ±1, c ∈ qZ, Σ (1 + c²R²/4)^{−1/2}
≪ 1 + (qR)^{−1} log. bc ≠ 0: ad ≡ 1 (mod q), ad ≠ 1, so ad = 1 + jq with 1 ≤ |j| ≪ Z²/q; given (a, d) the pair (b, c) is fixed up to ≪ τ(ad − 1) ≪ H^{o(1)}
choices, and Σ_{j} Σ_{ad = 1+jq} (1 + |a| + |d|)^{−1} ≪ H^{o(1)} Σ_{j≪Z²/q} (jq)^{−1/2} ≪ H^{o(1)} Z/q (no such j if Z² < q).
Numerics (k1-lattice.ts, data/k1-lattice.txt; q ∈ {9, 25, 45, 121, 169, 225}, Z ∈ {10, 40, 160}, R ∈ {0.3, 1}): K₁ ≈ (36–46)·Z/q at Z = 160 for every q
(e.g. q = 9: 637; q = 225: 27.7 at R = 0.3), no growth in q beyond the claimed shape; the ratio to 1 + R + 1/(qR) + Z/q settles at a constant (≈ 20–32).
CONSEQUENCE. Summed over the levels q = u²e, e ≤ E: K₁ ≪ H^{o(1)}(E(1 + R) + Z₁/u² + 1/(u²R)). In our window the skew is R = X/K with K ≤ Y^{1+η} (moduli above
by Lemma tail) and X = Y, so 1/(u²R) ≤ Y^{η}u^{−2}: no complementary-divisor reduction is needed, and K₁ ≪ H^{o(1)}(E + Z₁/u²) up to Y^{O(η)}, as (Hh) uses.
(G1) is closed at the level of a sketch.
(G2) NON-SQUAREFREE ODD u (sketch). For odd p^k ∥ u with p ∤ h: Γ₀⁰(p^k) mod p^k is the diagonal torus, and Γ₀⁰(p^k)\SL₂(Z/p^k) ↔ pairs of primitive rows up to
(t, t^{−1}). For a row x, the condition v₁ᵀG_ix ≡ 0 (mod p^k), i = 1, 2, with v₁ primitive forces det(G₁x, G₂x) ≡ 0 (mod p^k) (adjugate), and then v₁ is
determined up to scalars (G₁x ≢ 0 mod p since p ∤ h). The binary quadratic form x ↦ det(G₁x, G₂x) has discriminant N² − 4h² (reader: checked symbolically), so
its projective zeros mod p^k number ≤ 2p^{⌊v_p(N²−4h²)/2⌋} (including the content case, whose content c has p^{2c} | disc). Hence ∏_{p^k∥u} c_{p^k} ≤ 2^{ω(u)} g(N),
g(N) := ∏_{p|u} p^{⌊v_p(N²−4h²)/2⌋} ≤ gcd(u^∞, N² − 4h²)^{1/2}, and Σ_{2h<N≤M} N^{−1/2} g(N) ≪ H^{o(1)}M^{1/2} by Σ_{d|u^∞} d^{−1/2} = ∏_{p|u}(1 − p^{−1/2})^{−1} ≤ H^{o(1)}
and a Rankin bound for #{d ≤ 2M : d | u^∞}. Diagonal for p^k: #{x non-isotropic mod p} lifted — ≍ p^{k−1}(p − χ(p)). p = 2 (D = −4: u/2 arbitrary) still separate;
numerics flat (§21). (G2) is closed for odd u at the level of a sketch.
REMAINING FOR THE SMALL END (D < 0): §18's conversion, special primes p | (u, D), p = 2, stabiliser weights; then a careful write-up and a reading.

## 23. READING of §20 (15 Sep, night; fresh model instance; scripts reader-energy/) — CORRECTIONS ADOPTED
CLAIM 1 (J₄ ≪ m^{o(1)}(N² + N^{7/2}m^{−1/2}) for all m): SOUND WITH FIXES. Cilleruelo–Garaev Theorem 1(4) read line by line (1007.1526 §2): for unit λ it transfers to
any modulus — t sharing factors with m is harmless (only an injection into the integer equation is needed); a vanishing factor cannot occur (n_z ≡ t²λ, 1 ≤ t² ≤
m/M < m); equal shifts ARE needed (unequal shifts give only M^{4/3}m^{−1/3}) and (b) supplies them; no L-dependence; the o(1) is uniform (|n_z| ≤ 4m²). T must be
≤ (m/M)^{1/2} exactly. Step (c) correct.
 FIX 1 (gap): non-unit λ for NON-squarefree m (e.g. m = 4p, λ ≡ 2 mod 4; for every even m all attainable λ are non-units). Checked fix: for p | m with v_p(λ) = f
 < e = v_p(m), x + y ≡ λxy (mod p^e) ⇔ (p^f x − μ*)(p^f y − μ*) ≡ μ*² (mod p^{e+f}); primes with f ≥ e force x + y ≡ 0 (mod p^e); CRT gives one equal-shift hyperbola
 (box side g′N, modulus m g′/g″). Result J₂(λ) ≪ m^{o(1)}((gg′)^{1/2}N^{3/2}m^{−1/2} + 1) for N ≤ m/g″ (else J₂ ≤ N); with Σ_{gcd(λ,m)=g} J₂ ≤ N(2N/g + 1) and g ≤ 2N the J₄
 bound survives for ALL m. Imprecisions: N > m/g case (J₂ ≤ N closes it); "non-units: same bound" false for J₂ (extra g^{1/2}; numerically 6.7× at m = 1296000,
 g = 5400), J₄ unaffected; the "+1" is really m^{o(1)} (smooth λ*).
 Numerics (m ≈ 10⁶–4·10⁶, N = m^{0.4…0.7}, 20 modulus types incl. prime powers, balanced p₁p₂, 720720, 2^20): J₄/(N′² + N′^{3.5}m^{−1/2}) ≤ 1.5 (≤ 0.7 for N ≥ m^{1/2});
 J₄/(2N′² + N′⁴/m) = 1.00–1.07 for odd m, up to 2.8 for highly even m (structural). No abnormal J₂(λ).
CLAIM 2 (saving map): BOOKKEEPING SOUND. BG's Hölder inequality holds exactly as quoted (J counts all tuples of units; k ≥ 1 allowed, J₂ = N′); J_{2k} ≤ N^{2k−4}J₄
valid; formulas re-derived exactly (rationals): on the edge ν₂ = 1/2 with k₁ = k₂ = 2 the m-saving is θ/16 (ν₁ ≥ 1/3) or (2θ − 1.25)/8 (ν₁ < 1/3), giving H-exponent
1/56 at a = 3/7, 0.026562 at 0.45, 0.030625 at 0.49, 1/32 at 1/2 — matching the data. Corner computation (k₁ = 2, k₂ = j: m^{−1/(16j)}) and (N₁N₂)^{15/16} correct.
No missed zeros (Lipschitz ≤ 2.5; 4000-step scan, 1000 values of a): minimum strictly monotone in a, positive for a ≥ 0.3424 with k ≤ 12; the zeros near 1/3 come
from the cap k ≤ 12 (with k ≤ 60 positive at a = 0.3353); near 1/3 the saving ≈ ν₁/4 − 1/(16k₁) with k₁ ≈ 1/(2(θ − 1/2)) → ∞, constants (2k)^{90k³}(log m)^{4k²}.
 GAP (margins): the minimum sits on ν₂ = 1/2, exactly where Type I fails; the real residual is wider (Type I/II margins H^{O(δ)}, n₃ ≤ H^{δ₃}, moduli in
 [Y^{1−δ−2η}, YH^η]). Widening by τ = 0.02: saving at a = 1/2 0.0312 → 0.0306, at 0.4 0.0125 → 0.0100, at 0.35 NEGATIVE. So δ, η, δ₃, ε′ and the separation losses
 must be ≪ saving(a) ≍ (a − 1/3)/8 near 1/3: "for every c > 0" only with parameters depending on c.
 GAP (unwritten step, a just above 1/2): the residual is empty only for U ≥ Y·H^{4δ+δ₃+O(η)}; for Y ≤ U below that the balanced band remains (BG with the new J₄
 covers it: a = 0.505, τ = 0.02, saving 0.031), but §12's Type I/II bounds were derived for U ≤ Y only (Type II's Weil step assumes U₁ ≤ d; Type I's (1 + N/d)
 untracked for N > d). "Types I/II alone cover [H^{1/2}, H^{1/2+ε₀}]" is asserted, not derived; likely closes (Type I or U₂ = n₂ whenever an atom exceeds
 Y^{1/2}H^{2δ}, rest to the residual), with ε₀ against §9 to be fixed.
CONDITIONAL READING: "the H^{1/2} threshold is crossed, u ∈ [H^{1/3+c}, H]" holds at exponent level GIVEN §12 with the §16/§19 gaps filled, the J₄ transfer with
FIX 1, and the a > 1/2 step. Nothing in the J₄ or saving-map layer is fatal.
