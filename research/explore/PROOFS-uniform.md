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

## 6′. CORRECTION of §6 (16 Sep 2026): the trivial component is w̄·S^w_1(uY), not a Hecke translate; the inert identity explained
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
- TEST (running 16 Sep): hecke-components.ts computes P, T, L1, L2, R on the paper's smooth grids for u = 3 (D = −8, −4, −11, −7,
  −20) and u = 5 (D = −4, −8, −11); hecke-components-fit.py checks P against the paper's grids, fits the lines in each component
  and compares with the predictions above. The smoke test (Y = 2·10⁵) confirmed the four local-factor means to six digits.

## 6″. RESULTS of the component test (16 Sep 2026) — the decomposition is confirmed; two by-products
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
(e) u = 5 against the LMFDB level-5 even newforms (fetched 16 Sep): L carries 4.1324 (ε=+1), 6.0540 (+1), 8.2947 (+1) — D = −4:
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

## 7. The narrow window (16 Sep 2026) — PROVED (elementary) and checked; to be read before it enters paper III
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
ADVERSARIAL READING OF §7 (16 Sep, a fresh model instance given §7, paper III §§2 and 6 and the script; independent of this session's
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

## 8. CANDIDATE THEOREM (16 Sep 2026, evening): Hypothesis (E) in Cesàro form holds unconditionally — UNDER ADVERSARIAL READING, NOT A CLAIM
STATEMENT. For every irreducible quadratic f there is c = c(f) > 0 such that
    Off*_f(H) = c_off(f)·H + O_f( H (log H)^{1−c} log log H ),
and hence, by part I, Theorem 6 (Σ_{h≤H}(1−h/H)(S_f(h)−C²) = −½C log H + O_f(1) + (C²/H)·Off*_f(H)),
    Σ_{h≤H} (1 − h/H)(S_f(h) − C(f)²) = −½ C(f) log H + O_f( (log H)^{1−c} log log H ).
This is Conjecture 1 of part I in Cesàro form with its leading term (part I Thm 6(ii)), NOT the constant A_f, which needs Off* − c_off H = o(H).
INPUTS. Part III: Proposition pieces (Off* = Σ_u w(u) P_u(H/u), Σ_{u≤t}|w(u)|/u ≪ log t); Theorem typeII (u > H^{2/3+ε}); Theorem small and
Proposition KSw with Remark KSwconst (uniform for t ≥ max(exp((log log u)^4), Y₁(f))); the identity (eq:Pgt) for moduli above the length.
External: Koksma's inequality; Shiu's theorem; Henriot, "Nair–Tenenbaum bounds uniform with respect to the discriminant", Math. Proc. Camb.
Phil. Soc. 152 (2012), Corollary 2 of Theorem 5 (arXiv 1102.1643; hypotheses read 16 Sep: Q primitive, F ∈ M_k(A,B,ε) with ε < α/(50g(g+1/δ)),
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
