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
