# The level-1 spectrum of the dilated pieces: statements and proofs (draft, 15 September 2026)

Draft of the mathematics behind `research/explore/STATE.md` §7 and `hecke-oldform-predict.py`. Everything here was found
numerically first (the numbers are in STATE §7–7b); the proofs below are written to be checked. Status of each item is
marked. Notation as in paper IV: `D < 0` a discriminant, `u` an odd prime, `u_j` an even Hecke–Maass cusp form of
`SL_2(Z)` with `T_u u_j = λ_j(u) u_j`, `T_u f(z) = u^{-1/2}[ f(uz) + Σ_{b mod u} f((z+b)/u) ]`, `χ = χ_D(u)` the Kronecker
symbol (so `χ = 0` iff `u | D`). Forms `Q = [a, b, c]` of discriminant `b² − 4ac = 4D`, positive definite, all contents;
`z_Q = (−b + i√(4|D|))/(2a)`; `H = {all Q of disc 4D}`; `Per_D(f) = Σ_{Q ∈ H/SL_2(Z)} f(z_Q)/|Stab Q|`.

## 0. The reduction (proved in the script's docstring; restated)

The piece at dilation `u` is the sum over pairs `(d, x)` with `u²x² ≡ D (mod d)`. These are the forms
`Q = [d, 2ux, (u²x² − D)/d] ∈ H` with `2u | b`; call this sub-family `H^{(u)}`. The Poisson seed of piece `u` at `z_Q`
equals `u · Ψ^w_{uY}(z_Q/u)`, `Ψ^w` the level-1 seed of Theorem thm:smooth, and the points `τ_Q = z_Q/u` are the Heegner
points of the forms `Q' = [u²d, 2u²x, c]` of discriminant `4u²D`. So

    W_u := {Q' of disc 4u²D : u² | a', 2u² | b'}  (all contents),   Q ↦ Q' = [u²a, u b, c]  a bijection H^{(u)} → W_u,

and `W_u` is `Γ_0(u²)`-invariant (paper IV, Lemma subfamily, plus the check that `2u² | b'` is preserved: under
`γ ∈ Γ_0(u²)`, `b'' = 2a'αβ + b'(αδ+βγ) + 2c'γδ ≡ b'·αδ ≡ b' (mod 2u²)` since `u² | a'`, `u² | γ`, `αδ ≡ 1 (mod u²)`).
The translation `τ ↦ τ + 1` is `x ↦ x − d`, i.e. the quotient `W_u/⟨T⟩` is the set of pairs `(d, x mod d)`. Applying the
theorem at level `u²` with `Y → uY` and the overall factor `u`:

    √Y S^w_u(Y) = √u |D|^{−1/4} Σ_v Per_{W_u}(v) L~_v [Γ(−it_v) W_c(3/2 + it_v) (π√|D|/(uY))^{it_v} + c.c.] + (continuous) + O(Y^{−5/2+ε}),

`v` over an orthonormal basis of the even cusp forms of `Γ_0(u²)`, `Per_{W_u}(v) = Σ_{Q' ∈ W_u/Γ_0(u²)} v(τ_{Q'})/|Stab|`,
`L~_v = Σ_k a_v(k) k^{−3/2}` with `a_v` the Fourier coefficients at the cusp `∞` (width 1 for `Γ_0(u²)`). For the
oldforms `f_m(z) = u_j(u^m z)`, `m = 0, 1, 2`: `a_{f_m}(u^m n) = u^{m/2} a_j(n)`, hence `L~_{f_m} = u^{−m} L~_j`.
**Status: derived; every constant checked numerically at u = 2, 3, 5 (STATE §7).**

## 1. Lemma A (multiplicity). For every SL_2(Z)-class C of H,

    Σ_{Q' ∈ W_u/Γ_0(u²), uτ_{Q'} ∈ C} 1/|Stab_{Γ_0(u²)}(τ_{Q'})|  =  m_u(D) / |Stab_{SL_2(Z)}(C)|,    m_u(D) = 2u if u | D,  u − χ if u ∤ D.

Equivalently `Per_{W_u}(f_1) = m_u(D) Per_D(u_j)` for every level-1 `f` (since `f_1(τ_{Q'}) = u_j(uτ_{Q'}) = u_j(z_Q)`).
**Numerically: 6.000, 10.00 (ramified u = 3, 5); 2.001, 4.000 (split u = 3, 5); 3.999, 6.000 (inert u = 3, 5).**

*Proof sketch (to be completed).* Fix `Q_0 ∈ C` with `u ∤ a_0` (possible: the values of a primitive form represent
infinitely many primes; for imprimitive forms scale). The forms in `C` are `γQ_0`, `γ ∈ SL_2(Z)`, and `γQ_0 ∈ H^{(u)}`
iff `u | b(γQ_0)/2`. Writing `γ = (α β; γ δ)`, `b(γQ_0)/2 = a_0 αβ + (b_0/2)(αδ + βγ) + c_0 γδ`. Two forms `γQ_0, γ'Q_0`
of `H^{(u)}` give the same `Γ_0(u²)`-orbit in `W_u` iff `γ'γ^{−1}` transported to the `τ`-side lies in `Γ_0(u²)`, i.e.
(conjugating by `diag(u,1)`) iff `γ'γ^{−1} ∈ Γ^0(u²) = {u² | β}`. So the count is the number of double cosets
`Γ^0(u²) \ {γ : u | b(γQ_0)/2} / Stab(Q_0)`, weighted. Reduce mod `u²`: `Γ^0(u²)\SL_2(Z)` has `u(u+1)` cosets, indexed by
the top row `(α : β) mod u²` up to units, equivalently by a point of `P¹(Z/u²)`. The condition `u | b(γQ_0)/2` depends on
`γ mod u` only through `Q_0(α, γ)`-type expressions: using `αδ − βγ = 1` one finds
`b(γQ_0)/2 ≡ (α, β)`-quadratic in the top row: `a_0αβ + (b_0/2)(2αδ − 1) + c_0γδ` … [complete: show the condition is
`Q_0^∨(β, −α)`-type, i.e. `β/α` mod `u` must be a root of `Q_0(x,1) ≡ 0 (mod u)` for the excluded cosets, or its
complement]. The number of `(α:β) ∈ P¹(F_u)` with `Q_0(α, β) ≢ 0 (mod u)` is `u + 1 − #roots = u + 1 − (1 + χ) = u − χ`
when `u ∤ D`; lifting to `P¹(Z/u²)` and accounting for the `u` lifts per point and for the stabiliser gives `m = u − χ`.
When `u | D` the congruence has a double root and the forms with `u | a` enter; the count is `2u`. **Status: statement
certain from the numerics; proof to be written out in the coset language; the identification of the excluded cosets with
the roots of `Q_0 mod u` is the step to check.**

## 2. Lemma B (the period of the dilated family). For every level-1 even Hecke–Maass form `u_j`,

    Per_{W_u}(u_j) := Σ_{Q' ∈ W_u/Γ_0(u²)} u_j(τ_{Q'})/|Stab|  =  ( λ_j(u) √u + c_u(D) ) Per_D(u_j),    c_u(D) = u − 1 if u | D,  −(1 + χ) if u ∤ D,

and `Per_{W_u}(u_j(u²·)) = Per_{W_u}(u_j)`.
**Numerically: p0 = λ√u + 2, + 4 (ramified u = 3, 5); λ√u − 2 (split, both u); λ√u (inert, both u); and f_0 = f_2 exactly.**

*Proof (the Hecke neighbours; to be completed).* For `Q = [a, b, c] ∈ H` with `u ∤ a`, the `u + 1` Hecke neighbours of
`z_Q` are `uz_Q ↔ [a, ub, u²c]` and `(z_Q + k)/u ↔ [u²a, u(b − 2ak), c_k]`, `k mod u`, all of discriminant `4u²D`
(`c_k = (a²k² − (b/2)·2ak·… )` — compute: `c_k = ak² − bk + c`, integral). The Hecke relation summed over the classes of `H`:

    Σ_{Q ∈ H/SL_2} (1/|Stab Q|) Σ_{neighbours ν of z_Q} u_j(ν) = λ_j(u) √u · Per_D(u_j).                                   (H)

Sort the neighbours: (i) `(z_Q + k)/u` lies in `W_u` iff `2u² | u(b − 2ak)` iff `k ≡ (b/2) a^{−1} (mod u)`: exactly ONE
`k` per `Q`. (ii) If `u ∤ D`, among the remaining neighbours exactly `1 + χ` have a form of content divisible by `u`, hence
are Heegner points of discriminant `4D` again — the classical fact that `T_u` maps a CM point of discriminant `4D` to
`1 + χ` points of the same discriminant (classes multiplied by the prime ideals above `u`) and `u − χ` points of
discriminant `4u²D` (Gross–Kohnen–Zagier §…; for `u` inert none, split two, ramified one). Summed over all classes, the
same-discriminant neighbours run over all classes once each per ideal above `u`, so they contribute `(1 + χ) Per_D(u_j)`.
(iii) The remaining `u − χ − 1` neighbours of discriminant `4u²D` are NOT in `W_u`; but they are `Γ_0(u²)`-equivalent to
points of `W_u` attached to OTHER representatives of the same class — this is where Lemma A's multiplicity `m = u − χ`
enters: the `m` representatives of the class in `H^{(u)}` have `m` selected neighbours (one each), and the set of all
`u − χ` discriminant-`4u²D` neighbours of `z_Q`, taken over the `m` representatives, is exactly `m` copies of the
`W_u`-orbits above the class … [complete this bijection: it is the statement that the map
(representative, selected neighbour) → `W_u`-orbit is bijective onto the orbits above `C`, and that the non-selected
discriminant-`4u²D` neighbours of one representative are the selected neighbours of the others]. Granting it, summing (H)
over the classes and subtracting (ii) gives `Per_{W_u}(u_j) = (λ√u − (1 + χ)) Per_D(u_j)` for `u ∤ D`. For `u | D` the forms
with `u | a` (excluded above) contribute the additional `u · Per_D`, giving `λ√u − 1 + u`. The identity `f_0 = f_2` says
`Σ u_j(τ) = Σ u_j(u²τ)` over `W_u`: `u²τ_{Q'} = u z_Q`, the `uz_Q` neighbour, whose form `[a, ub, u²c]` is again in
`W_u` after the transport … [check]. **Status: mechanism identified and consistent with all six numbers; the bijection in
(iii) and the ramified count are the two steps to write out.**

## 1'. Lemmas A and B: the proof (15 Sep, 08:00; replaces the sketches above)

**CORRECTION (09:00, before any outside reading):** in Lemma B below the Hecke coset of `αγ⁻¹z₀` is determined by the SECOND
column line `ℓ₂`, not the first: `Γαγ₁⁻¹ = Γαγ₂⁻¹` iff `α(γ₂⁻¹γ₁)α⁻¹ ∈ Γ`, and `α(a b; c d)α⁻¹ = (a, b/u; uc, d)` is integral iff
`u | b`, i.e. `γ₂⁻¹γ₁ ∈ Γ⁰(u)`; right multiplication by `Γ⁰(u)` preserves `⟨γe₂⟩` and moves `⟨γe₁⟩`. (Check: `γ = (1 −k; 0 1)`,
`ℓ₁ = ⟨e₁⟩` fixed, `ℓ₂ = ⟨(−k,1)⟩` varies, and `αγ⁻¹z = (z+k)/u` are `u` DIFFERENT neighbours.) Correspondingly `u²τ = α'γ⁻¹z₀`
depends on `ℓ₁`. Read `ℓ₂` for `ℓ₁` (and `N(ℓ₂) = #{ℓ₁ ≠ ℓ₂ : ⊥}`) throughout the proof of Lemma B; by the symmetry of `B` the
counts, hence all values, are unchanged. The isotropic lines are then the `ℓ₂` with `Q₀(ℓ₂) = 0`: for `γ = (1 −k; 0 1)` the
neighbour `(z+k)/u` has form `[u²a, u(b−2ak), Q₀(−k,1)]`, of content divisible by `u` iff `Q₀(−k, 1) ≡ 0`, i.e. iff `ℓ₂` is
isotropic — consistent.

**Setting.** `u` an odd prime, `D<0`, `u ∤ D` or `u ∥ D` with `u` not dividing the conductor of `D` (the case `u | conductor`
is excluded; the direct computation still applies there). Right action `(Q∘γ)(v) = Q(γv)`; `C = Q₀∘Γ` a class, `Γ = SL₂(Z)`,
`S = Stab_Γ(Q₀)` (finite; sizes 1, 2, 3 in PSL). Let `B` be the bilinear form of `Q₀`: `Q₀(v) = B(v,v)`,
`B(v,w) = a v₁w₁ + (b/2)(v₁w₂+v₂w₁) + c v₂w₂`, of discriminant `D`; `B mod u` is nondegenerate iff `u ∤ D`, and of rank 1 with
radical line `r` (the double root of `Q₀ mod u`) if `u ∥ D`.

**Step 1: the transported group.** `α = (1 0; 0 u)` sends `z ↦ z/u`. For `γ ∈ Γ₀(u²)`, `α⁻¹γα = (a, ub; c/u, d)` with `u | c/u`;
so `α⁻¹Γ₀(u²)α = G_u := Γ₀(u) ∩ Γ⁰(u) = {u | b, u | c}`, of index `u(u+1)` in `Γ`. The bijection `Q ↦ Q' = [u²a, ub, c]`,
`H^{(u)} → W_u`, satisfies `z_{Q'} = z_Q/u` and intertwines the action of `G_u` on `H^{(u)}` with that of `Γ₀(u²)` on `W_u`
(same orbits, same stabilisers). Invariance of `H^{(u)}` under `G_u`: for `g ∈ G_u`, `b(Q∘g) ≡ b·αδ ≡ b (mod u)`, and `b` is even.

**Step 2: cosets are ordered pairs of lines.** `Γ → SL₂(F_u)` is onto and `G_u` is the preimage of the diagonal torus `T`, so
`Γ/G_u ≅ SL₂(F_u)/T`. A matrix `γ` with columns `(v, w)`, `det = 1`, modulo `T` (`v ↦ λv, w ↦ λ⁻¹w`) is the ordered pair of
distinct lines `(ℓ₁, ℓ₂) = (⟨v⟩, ⟨w⟩)` in `P¹(F_u)`: `u(u+1)` of them.

**Step 3: the family condition is orthogonality.** The middle coefficient of `Q₀∘γ` is `2B(γe₁, γe₂)`; so
`Q₀∘γ ∈ H^{(u)}` iff `u | B(γe₁, γe₂)` iff `ℓ₁ ⊥_B ℓ₂`. This is well defined on `Γ/G_u` (Step 2) and on `S\Γ` (`Q₀∘sγ = Q₀∘γ`).

**Step 4: the orbit mass.** `C ≅ S\Γ` via `Sγ ↦ Q₀∘γ`; the `G_u`-orbits in `C` are the double cosets `SγG_u`, with
`Stab_{G_u}(Q₀∘γ) = G_u ∩ γ⁻¹Sγ`. Each double coset contains `|S|/|G_u ∩ γ⁻¹Sγ|` right cosets `γ'G_u`. Hence, for any
right-`G_u`-invariant, left-`S`-invariant function `φ` on `Γ`,
    Σ_{G_u-orbits O ⊂ C} φ(O)/|Stab_{G_u}(O)| = (1/|S|) Σ_{γ ∈ Γ/G_u} φ(γ).                                               (M)

**Lemma A.** Take `φ = 1_{H^{(u)}}(Q₀∘γ) = 1[ℓ₁ ⊥ ℓ₂]`. Then `m_u(D) = #{(ℓ₁,ℓ₂) distinct : ℓ₁ ⊥_B ℓ₂}`.
- `u ∤ D`: `B` nondegenerate; each `ℓ₁` has a unique `ℓ₁^⊥`, and the pair is admissible iff `ℓ₁^⊥ ≠ ℓ₁`, i.e. `ℓ₁` non-isotropic.
  Isotropic lines are the roots of `Q₀ mod u`: `1 + χ_D(u)` of them. So `m = u + 1 − (1 + χ) = u − χ`.  ∎
- `u ∥ D`: `B(v,w) = 0` iff `⟨v⟩ = r` or `⟨w⟩ = r`; pairs `(r, ℓ₂)` and `(ℓ₁, r)` with the other line ≠ r: `u + u = 2u`.  ∎
(Equivalently `Per_{W_u}(u_j(u·)) = m·Per_D(u_j)`, since `u_j(u τ_{Q'}) = u_j(z_Q)` is constant on the class.)

**Lemma B.** Take `φ(γ) = u_j(z_{Q₀∘γ}/u)·1[ℓ₁ ⊥ ℓ₂]`. Since `z_{Q₀∘γ} = γ⁻¹z₀`, `z_{Q₀∘γ}/u = αγ⁻¹z₀`, and `αγ⁻¹ ∈ Δ_u`
(det `u`). The map `γ ↦ Γαγ⁻¹` is a bijection `Γ/Γ₀(u) → Γ\Δ_u` (the `u+1` Hecke cosets), and `γΓ₀(u)` is determined by
`ℓ₁ = ⟨γe₁⟩` alone (right multiplication by `Γ₀(u)` fixes the first column mod `u` up to scalars). So the value
`u_j(αγ⁻¹z₀) =: u_j(h_{ℓ₁}(z₀))` depends only on `ℓ₁`, and `{h_ℓ(z₀) : ℓ ∈ P¹(F_u)}` are the `u+1` Hecke neighbours of `z₀`:
    Σ_ℓ u_j(h_ℓ(z₀)) = √u λ_j(u) u_j(z₀)                                                                                   (T_u)
(Hecke normalisation `T_u f(z) = u^{-1/2} Σ_{Γ\Δ_u} f(Mz)`). By (M),
    Per_{W_u}(u_j) = Σ_C (1/|S_C|) Σ_{ℓ₁} N(ℓ₁) u_j(h_{ℓ₁}(z_C)),   N(ℓ₁) = #{ℓ₂ ≠ ℓ₁ : ℓ₁ ⊥ ℓ₂}.
- `u ∤ D`: `N(ℓ₁) = 1` if `ℓ₁` non-isotropic, `0` if isotropic. Hence
  `Per_{W_u}(u_j) = Σ_C (1/|S_C|)[√u λ u_j(z_C) − Σ_{ℓ isotropic} u_j(h_ℓ(z_C))]`. The isotropic lines are the eigenlines of the
  order `O_{4D}` acting on `L_C/uL_C` (`L_C = Z + Z z_C`), i.e. the `1+χ` sublattices `𝔭L_C` for the primes `𝔭 | u` of the order:
  their Heegner points `h_ℓ(z_C) = z_{𝔭·C}` have discriminant `4D` again, with the class multiplied by `[𝔭]`. The map `C ↦ 𝔭C`
  permutes the classes of each order (each content) and preserves `|S_C|` (the unit group of the order). Summing over `C`:
  `Σ_C (1/|S_C|) Σ_{iso} u_j(h_ℓ(z_C)) = (1 + χ) Per_D(u_j)`, and
    Per_{W_u}(u_j) = (√u λ_j(u) − (1 + χ_D(u))) Per_D(u_j).  ∎
- `u ∥ D`: `N(r) = u`, `N(ℓ₁) = 1` for `ℓ₁ ≠ r`. So
  `Per_{W_u}(u_j) = Σ_C (1/|S_C|)[Σ_ℓ u_j(h_ℓ) − u_j(h_r) + u·u_j(h_r)] = √u λ Per_D + (u−1) Σ_C (1/|S_C|) u_j(h_r(z_C))`,
  and `h_r(z_C) = z_{𝔭C}` for the ramified prime `𝔭` (`𝔭² = (u)`), a permutation of the classes; hence
    Per_{W_u}(u_j) = (√u λ_j(u) + u − 1) Per_D(u_j).  ∎
- `Per_{W_u}(u_j(u²·)) = Per_{W_u}(u_j)`: `u²τ_{Q'} = u z_Q = α'γ⁻¹z₀` with `α' = (u 0; 0 1)`, whose Hecke coset is determined
  by `ℓ₂ = ⟨γe₂⟩`; the counts `N'(ℓ₂) = #{ℓ₁ ≠ ℓ₂ : ⊥}` are the same as `N(ℓ₁)` by the symmetry of `B`.  ∎

**What is used from the literature.** (T_u) is the definition of the Hecke operator; the identification of the isotropic
lines with the same-discriminant Hecke neighbours, and of their classes with `[𝔭]·C`, is the classical action of `T_u` on
CM points / Heegner divisors (Gross–Kohnen–Zagier, Math. Ann. 278, §II; also in Zagier's account of the Hecke action on
Heegner points), valid when `u` does not divide the conductor. Numerically all six values (`m` and `c` for `u = 3, 5`, three
splitting types) agree with these formulas to four digits.

**Lemma C (Gram).** Proved in §3' below.

## 3. Lemma C (the Gram matrix). On `Γ_0(u²)\H`, with `f_m(z) = u_j(u^m z)` and `⟨·,·⟩` the Petersson inner product,

    ⟨f_1, f_0⟩ = ⟨f_2, f_1⟩ = (λ_j(u)√u/(u+1)) ⟨f_0, f_0⟩,      ⟨f_2, f_0⟩ = ((λ_j(u)² − 1 − 1/u)/(u+1)) ⟨f_0, f_0⟩,      ⟨f_0,f_0⟩ = u(u+1) ‖u_j‖²_{SL_2(Z)}.

**Numerically to 4 digits at u = 2, 3, 5.** The first is Iwaniec–Luo–Sarnak (Lemma 2.4 of "Low lying zeros of families of
L-functions" in the holomorphic case; the Maass case is identical by unfolding). The second: unfold `⟨f_2, f_0⟩` over
`Γ_0(u²)`, or use `⟨f|B_{u²}, f⟩ = ⟨f|B_u, f|B_u^*⟩`-type manipulations with `T_u = u^{−1/2}(B_u^{-1}… )`; the answer
`(λ(u²) − 1/u)/(u+1)` with `λ(u²) = λ(u)² − 1` is what the numbers say. **Status: to be located in the literature or
proved by unfolding (a page).**

## 3'. Lemma C (Gram matrix): PROOF (15 Sep, 08:40)

Notation: `f` level-1 Hecke–Maass, `T_p f = λ f` with `T_p f(w) = p^{-1/2}[f(pw) + Σ_{k mod p} f((w+k)/p)]`; `⟨·,·⟩_G` the Petersson
inner product on `G\H`; for `H ⊂ G` of finite index, `⟨F, Φ⟩_H = ⟨Tr_H^G F, Φ⟩_G` when `Φ` is `G`-invariant, with
`(Tr_H^G F)(z) = Σ_{γ ∈ H\G} F(γz)`; and `⟨Φ, Ψ⟩_H = [G:H] ⟨Φ, Ψ⟩_G` when both are `G`-invariant.

**(i) `⟨f(pz), f(z)⟩_{Γ₀(p)} = (λ√p/(p+1)) ⟨f,f⟩_{Γ₀(p)}`** (Iwaniec–Luo–Sarnak, Lemma 2.4): the cosets `Γ₀(p)\Γ` are the `p+1`
matrices `(1 0; b 1)` (`b mod p`) and `S`, and `p·(1 0; b 1)z = (p 0; pb 1) z`, `p·Sz = -p/z`: the points `p γ z`, `γ ∈ Γ₀(p)\Γ`,
are exactly the `p+1` Hecke neighbours of `z` (as `Γ\Δ_p`-cosets: `(p 0; pb 1) ~ (1 k; 0 p)` with `k ≡ b^{-1}`, and `(p 0; 0 1)`
from `S` … or directly `Tr_{Γ₀(p)}^Γ (f∘p) = Σ_{Γ\Δ_p} f∘M = √p λ f`). Hence `⟨f(pz), f⟩_{Γ₀(p)} = ⟨√p λ f, f⟩_Γ = √p λ ⟨f,f⟩_Γ
= (√p λ/(p+1)) ⟨f,f⟩_{Γ₀(p)}`. Both `f(pz)` and `f` are `Γ₀(p)`-invariant, so the same ratio holds on `Γ₀(p²)`: `g = λ√p/(p+1)`.
Also `⟨f(p²z), f(pz)⟩_{Γ₀(p²)} = g ⟨f,f⟩_{Γ₀(p²)}`: substitute `w = pz`, which carries `Γ₀(p²)\H` to `G_p\H` (`G_p = Γ₀(p)∩Γ⁰(p)`,
same index `p(p+1)`), and both `f(pw)`, `f(w)` are `Γ₀(p) ⊃ G_p`-invariant.

**(ii) `⟨f(p²z), f(z)⟩_{Γ₀(p²)} = ((λ² − 1 − 1/p)/(p+1)) ⟨f,f⟩_{Γ₀(p²)}`.** Trace from `Γ₀(p²)` to `Γ₀(p)`: cosets `γ_b = (1 0; pb 1)`,
`b mod p`. With `g(w) := f(pw)` (level `p`), `f(p²γ_b z) = g(pγ_b z) = g((p 0; pb 1)z) = g((1 0; b 1)·pz)`, and
`g((1 0;b 1)w) = f((p 0; b 1) w)`. For `b ≢ 0`: `(p 0; b 1) = γ (1 k; 0 p)` with `γ ∈ Γ`, `k ≡ b^{-1} (mod p)`, so
`f((p 0; b 1)w) = f((w+k)/p)`; for `b = 0`: `f(p w)`. With `w = pz`:
    Tr f(p²·) (z) = Σ_{k ≢ 0} f((pz + k)/p) + f(p²z) = [Σ_{k mod p} f((pz+k)/p) − f(z)] + f(p²z) = [√p λ f(pz) − f(p²z) − f(z)] + f(p²z)
                  = √p λ f(pz) − f(z),
using the Hecke relation at the point `pz`. Therefore
    ⟨f(p²z), f⟩_{Γ₀(p²)} = ⟨√p λ f(pz) − f, f⟩_{Γ₀(p)} = √p λ · (λ√p/(p+1)) ⟨f,f⟩_{Γ₀(p)} − ⟨f,f⟩_{Γ₀(p)}
                          = (λ²p/(p+1) − 1) ⟨f,f⟩_{Γ₀(p)} = (λ²/(p+1) − 1/p) ⟨f,f⟩_{Γ₀(p²)} = ((λ² − 1 − 1/p)/(p+1)) ⟨f,f⟩_{Γ₀(p²)}.  ∎
(Numerically 0.3001, −0.3181, −0.1095 at p = 2, 3, 5: exact to four digits.) Hence `h = (λ(p²) − 1/p)/(p+1)` with `λ(p²) = λ² − 1`.

**(iii) Newform Gram entry.** For a newform `v` of level `p` with Fricke eigenvalue `ε` (`v(−1/(pz)) = ε v(z)`), the same trace
gives `Tr_{Γ₀(p²)}^{Γ₀(p)} v(p·) (z) = Σ_b v((1 0; b 1)·pz)`. Now `Tr_{Γ₀(p)}^{Γ} v = Σ_b v((1 0;b 1)w) + v(Sw) = 0` (a newform is
orthogonal to every level-1 form, so its trace, a level-1 cusp form, vanishes), hence `Σ_b v((1 0;b 1)w) = −v(−1/w)`, and with
`w = pz`: `Tr v(p·) = −v(−1/(pz)) = −ε v(z)`. So `⟨v(pz), v⟩_{Γ₀(p²)} = −ε ⟨v,v⟩_{Γ₀(p)} = −(ε/p) ⟨v,v⟩_{Γ₀(p²)}`  ∎ (−1/3 at p = 3, ε = +1 ✓).

**(iv) Why `Per_{W_u}(f_0) = Per_{W_u}(f_2)` and `Per_{W_u}(v) = ε Per_{W_u}(v(u·))`: the divisor involution.** The Fricke
involution `W_{u²}: τ ↦ −1/(u²τ)` normalises `Γ₀(u²)` and maps the form `[u²a', 2u²b', c]` to `[u²c, −2u²b', a']` — i.e. the pair
`(d, x)` to `(Q_u(x)/d, −x)`, the pairing of a divisor with its complement — so it permutes `W_u/Γ₀(u²)` (preserving stabilisers).
For level-1 `f`: `f(W_{u²}τ) = f(u²τ)`, hence `Per(f_0) = Per(f_2)`. For a level-`u` newform: `W_{u²}τ = W_u(uτ)`, so
`v(W_{u²}τ) = ε v(uτ)` and `Per(v) = ε Per(v(u·))` (observed: equal, with ε = +1). The vanishing of `Per_{W_u}(v)` for inert `u`
is NOT explained by this; it needs the level-`u` analogue of the isotropic-line argument (open; the reader has been asked).

## 1''. The class-by-class form of Lemmas A and B: every prime u, every D (15 Sep, 11:30) — PROVED and checked

Steps 1–4 of §1' (transported group, cosets = ordered pairs of lines, family condition = orthogonality, mass formula (M))
and the identification `αγ⁻¹z₀ = h_{ℓ₂}(z₀)` use no hypothesis on `u` or `D`. Hence for EVERY prime `u` and every `D < 0`:
    Per_W(f₁) = Σ_C m(C) u_j(z_C)/|S_C|,          m(C)    = #{(ℓ₁,ℓ₂) distinct : B_C(ℓ₁,ℓ₂) ≡ 0 (u)},
    Per_W(f₀) = Per_W(f₂) = Σ_C |S_C|⁻¹ Σ_ℓ N_C(ℓ) u_j(h_ℓ z_C),   N_C(ℓ₂) = #{ℓ₁ ≠ ℓ₂ : B_C(ℓ₁,ℓ₂) ≡ 0 (u)},
with `h_{⟨(k,1)⟩} z = (z−k)/u`, `h_{⟨(1,0)⟩} z = −1/(uz)`. Only the EVALUATION of the counts needed `u` odd and `u² ∤ D`
(then `B_C mod u` is determined by `D` up to equivalence). At `u = 2`, with `b' = b/2`, `B(e₁,e₂) = b'`, `B(e₁,e₁+e₂) = a+b'`,
`B(e₂,e₁+e₂) = b'+c`:
    m(C) = 2([b'≡0] + [a≡b'] + [c≡b']);   N(e₂) = [b'≡0]+[c≡b'],  N(e₁+e₂) = [a≡b']+[c≡b'],  N(e₁) = [b'≡0]+[a≡b'].
  D even: m = 4 (primitive), 6 (content even);  D odd: m = 2, or 0 for the even-content classes (B alternating mod 2 —
  over F₂ the nondegenerate symmetric forms diag(1,1) and antidiag(1,1) are inequivalent; that is the 2-adic phenomenon).
  u² | D (u odd): the content-u classes have B ≡ 0, m = u(u+1).
**Check (hecke-classwise.py):** class-by-class vs direct orbit enumeration, p₀ and p₁ agree to 4 digits for u = 2,
D = −3,−4,−7,−8,−11,−12,−15,−16,−20 and u = 3, D = −9,−27,−36. Values at u = 2: (p₀,p₁) = (4.104, 4.913) for D/4 ≡ 2,3 (4);
(4.470, 5.278) for D/4 ≡ 1 (4); (4.756, 5.565) for D/4 ≡ 0 (4) [D = −16]; (−0.488, 0.321) for D ≡ 1 (8); (0.564, 1.373) for
D ≡ 5 (8); r₁(2;D) = +0.850 / +0.945 / +1.019 / −0.341 / −0.068. At u = 3 with 9 | D: r = 4.22 (D = −27), 1.75 (D = −9, −36),
larger than 1 because of the content-3 classes.
**Consequence for p₁ at u = 2:** p₁ = 4 + 2 Per⁽²⁾/Per_D (D even), 2 − 2 Per⁽²⁾/Per_D (D odd), Per⁽²⁾ = period over the
even-content classes (= forms 2Q', disc Q' = D). Numerically Per_D/Per⁽²⁾ = √2 λ(2) − χ_D(2) = 2.191, 1.191, 3.191 when D is
odd or D/4 ≡ 2,3 (4), as the T₂ relation between the periods of disc D and 4D suggests; 1.564 (D = −12), 1.278 (D = −16)
when D/4 is itself a discriminant (extra term). Not used; recorded in the draft as a remark.
This closes "the 2-adic case" and "u | conductor" of the open list; what remains there is a closed form for these
class-dependent entries via the Hecke relations (cosmetic) and the conceptual proof of the inert identity.

## 5'. Lemma D: the newform periods, and the vanishing for inert u (15 Sep, 09:00) — PROVED

Let `v` be a Hecke–Maass newform of level `u` (odd prime) with Fricke eigenvalue `ε` (`v(−1/(uz)) = ε v(z)`), `a_v(u) = −ε u^{-1/2}`,
and `U_u v(z) = u^{-1/2} Σ_{k mod u} v((z+k)/u) = a_v(u) v(z)`. Hypotheses on `(u, D)` as in Lemmas A, B.

**(i) The value at a family point depends only on `ℓ₂`.** For fixed `ℓ₂` the `u` choices of `ℓ₁` are `γ ↦ γ(1 0; c 1)`, `c mod u`
(right cosets of `G_u` inside `γΓ⁰(u)`), and `α(1 0; −c 1)α⁻¹ = (1 0; −uc 1) ∈ Γ₀(u)`; so the points `αγ⁻¹z₀` for the `u` values
of `ℓ₁` are `Γ₀(u)`-equivalent and `v` takes the same value on them: `v(αγ⁻¹z₀) =: V(ℓ₂)`.

**(ii) The `u+1` points as points of `X₀(u)`.** `ℓ₂ = ⟨(−k,1)⟩` gives `(z₀+k)/u` (`k mod u`); `ℓ₂ = ⟨e₁⟩` gives
`α S⁻¹ z₀ = −1/(u z₀) = W_u z₀`. Hence
    Σ_{ℓ₂ ∈ P¹(F_u)} V(ℓ₂) = Σ_k v((z₀+k)/u) + v(W_u z₀) = √u a_v(u) v(z₀) + ε v(z₀) = (−ε + ε) v(z₀) = 0.       (N)
(The level-1 analogue of (N) is `Σ_ℓ f(h_ℓ) = √u λ f(z₀)`; for a newform the Hecke term and the Fricke term cancel exactly.)

**(iii) The period.** By the mass formula (M) with `φ = v(αγ⁻¹z₀)·1[ℓ₁ ⊥ ℓ₂]`,
    Per_{W_u}(v) = Σ_C (1/|S_C|) Σ_{ℓ₂} N(ℓ₂) V_C(ℓ₂),     N(ℓ₂) = #{ℓ₁ ≠ ℓ₂ : ℓ₁ ⊥ ℓ₂}.
- `u` inert: no isotropic lines, `N ≡ 1`, so `Per_{W_u}(v) = Σ_C (1/|S_C|) Σ_{ℓ₂} V_C(ℓ₂) = 0` by (N).  ∎  (Observed: 1e-17.)
- `u` split: `N(ℓ₂) = 1 − 1[ℓ₂ isotropic]`, so `Per_{W_u}(v) = −Σ_C (1/|S_C|) Σ_{ℓ₂ iso} V_C(ℓ₂)` = minus the sum of `v` over the
  two level-`u` Heegner points of discriminant `4D` above each class (the neighbours `z_{𝔭C}`, `z_{𝔭̄C}` taken as points of
  `X₀(u)`) — a genuine level-`u` Heegner period in the sense of Gross–Kohnen–Zagier.
- `u ∥ D` (prime to the conductor): `N(r) = u`, `N = 1` otherwise, so `Per_{W_u}(v) = (u−1) Σ_C (1/|S_C|) V_C(r)`, `(u−1)` times the
  level-`u` Heegner period over the ramified neighbour.
- `Per_{W_u}(v(u·)) = ε Per_{W_u}(v)` by the divisor involution (§3'(iv)).
So Theorem 3's coefficient is `√u·[P_v, εP_v]·(G_v)⁻¹·(L~_v, L~_v/u)ᵀ` with the 2×2 Gram matrix `⟨v,v⟩·[[1, −ε/u],[−ε/u, 1]]`, and
it vanishes for inert `u`. Numerically confirmed at `D = −8, −11, −20` (split), `−3, −15` (ramified), `−4, −7` (inert): STATE §8. **Direct check of the
identity itself (09:20):** `Per_{W_3}(v)` from the orbit sum equals `−Σ_C Σ_{ℓ₂ iso} v((z_C+k)/3)/|S_C|` (split) and
`(u−1)·Σ_C v(radical neighbour)/|S_C|` (ramified) to all printed digits (ratio 1.00000) at `D = −8, −11, −20, −3, −15`.

**Consequence for the u-problem.** Every line of piece `u` that we can name is now a period over level-`u` Heegner points (or the
level-1 period times a local factor): the level-1 lines by Lemma B, the level-`u` newform lines by Lemma D. What remains
unnamed are the lines of the cycloidal-group forms of level `u²` (Strömberg), for which no analogue of (N) is available to us.

## 4. Theorem (the level-1 lines of the dilated pieces; conditional on Lemmas A–C, which are numerically certain)

For an odd prime `u` and the unrestricted object, the coefficient of the line `t_j` in `√Y S^w_u(Y)` equals that in
`√Y S^w_1(Y)` multiplied by

    r_j(u; D) = √u · Pᵀ (u(u+1) G)^{−1} L,     P = (p_0, p_1, p_0),  L = (1, 1/u, 1/u²),  G = [[1,g,h],[g,1,g],[h,g,1]],
    g = λ_j(u)√u/(u+1),  h = (λ_j(u)² − 1 − 1/u)/(u+1),  p_1 = m_u(D),  p_0 = λ_j(u)√u + c_u(D),

and its phase is shifted by `−t_j log u` (plus `π` if `r < 0`). Asymptotically `r_j(u; D) = λ_j(u)/u + O(u^{−3/2})` for
`u ∤ D` and `r_j(u; D) = u^{−1/2}(1 + O(λ_j(u)/√u))` for `u | D`. Consequently the sum over `u ≤ U` of
`w(u) (H/u)^{1/2} · amp_j(u)` converges absolutely (like `Σ λ_j(u) u^{−3/2}`), uniformly in `H`: for the level-1 lines the
main terms of the dilated pieces are uniformly summable in `u`.
**Values: u = 3: +0.6954 / −0.3105 / +0.1925; u = 5: +0.4210 / −0.0763 / +0.0894 (χ = 0 / +1 / −1); observed (paper IV data,
sharp grids): +0.655, +0.726 / −0.285, −0.320, −0.332 / +0.196, (+0.341 at 3σ); +0.431 / (below noise) / (below noise).**
The case `u = 2` needs its own 2-adic local constants (`p_1 = 4.912, 0.321, 1.373` for `D ≡ 0 (4), 1 (8), 5 (8)`); the
direct computation gives `+0.850 / −0.341 / −0.068`, observed `+0.85–0.90 / −0.35–−0.43 / −0.061–−0.071`.

## 5. Conjectures suggested by the numbers (untested unless stated)
- **Multiplicativity.** For squarefree `u = u_1 u_2`, `r_j(u; D) = r_j(u_1; D) r_j(u_2; D)`. Test: pieces at `u = 6` for
  `D = −12, −24` (both primes ramified: predicted `0.850 × 0.695 = 0.591`) — grids being computed 15 Sep.
- **The other lines.** The same formula with `v` a newform of level `u` (oldspace `{v(z), v(uz)}`) or a cycloidal-group
  form of level `u²` gives every line of piece `u`. First test: the level-3 newform `t = 5.0987` in piece 3 (coefficients
  from the LMFDB; Fricke sign from its page).
- **Size of every line.** `|amp_v(u)| ≪ u^{−1/2} · (normalised period of v over W_u)`; this is route 1b (level-aspect
  equidistribution) and is what the error-term problem will need on the spectral side.
