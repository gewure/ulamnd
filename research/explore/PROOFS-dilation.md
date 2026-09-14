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

## 3. Lemma C (the Gram matrix). On `Γ_0(u²)\H`, with `f_m(z) = u_j(u^m z)` and `⟨·,·⟩` the Petersson inner product,

    ⟨f_1, f_0⟩ = ⟨f_2, f_1⟩ = (λ_j(u)√u/(u+1)) ⟨f_0, f_0⟩,      ⟨f_2, f_0⟩ = ((λ_j(u)² − 1 − 1/u)/(u+1)) ⟨f_0, f_0⟩,      ⟨f_0,f_0⟩ = u(u+1) ‖u_j‖²_{SL_2(Z)}.

**Numerically to 4 digits at u = 2, 3, 5.** The first is Iwaniec–Luo–Sarnak (Lemma 2.4 of "Low lying zeros of families of
L-functions" in the holomorphic case; the Maass case is identical by unfolding). The second: unfold `⟨f_2, f_0⟩` over
`Γ_0(u²)`, or use `⟨f|B_{u²}, f⟩ = ⟨f|B_u, f|B_u^*⟩`-type manipulations with `T_u = u^{−1/2}(B_u^{-1}… )`; the answer
`(λ(u²) − 1/u)/(u+1)` with `λ(u²) = λ(u)² − 1` is what the numbers say. **Status: to be located in the literature or
proved by unfolding (a page).**

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
