# PLAN — the error term uniform in u (the conjecture of part III), started 15 Sep 2026, 13:00

Directive (user, 15 Sep): "Close the small gaps, make that nice — and then prepare and start the hard work, because closing
this is the biggest bounty we can harvest." Small gaps closed (2-adic case, multiplicativity, cross-references; commits
e1478ce, 238bb3b, 3ebbac8). This file is the preparation. Rules in force: F24 (mechanism after test), F33 (no effort
estimates in prose), F41 (evaluate closed forms at large arguments), "correct or leave open".

## 0. The target, in three equivalent forms

Notation (paper III §2, paper IV §2): u squarefree, Y = H/u, admissible d (squarefree, (d, 2Du) = 1, all primes split),
R_d = {x mod d : u²x² ≡ D}, ρ_k(d) = Σ_{x∈R_d} e(kx/d), λ(p) = p/(p−4), F_u(n) = Σ_{d|n, d>1 adm.} λ(d)/d,
E_u = EF_u = Σ_{d>1 adm.} λ(d)ρ(d)/d², sharp piece S_u(t) = Σ_{h≤t} F_u(Q_u(h)) − t E_u, Q_u(h) = u²h² − D,
Cesàro piece 𝒫^{(0)}_u(Y) = ∫_0^Y S_u(t) dt (= paper III's piece up to the explicit linear nuisance term).

(T)  Theorem A′ of part III: the Cesàro conjecture ⇔ Σ_{u ≤ H^{2/3+ε}} w(u) 𝒲_u(H/u; log H) = o(H log H), where 𝒲_u is the
     window (moduli Y < d ≤ u²Y log H) and Σ_{u≤H} |w(u)|/u ≍ log H, 𝒲_u ≪ Y trivially. Since u ≤ H^{2/3} ⇔ u ≤ Y², it
     suffices that 𝒲_u(Y; L) = o(Y) uniformly in u ≤ Y², L ≤ 3 log Y — ANY uniform saving; and since the small moduli
     (Theorem small, log-saving, uniform) and the far moduli (Lemma far) are already o(Y) uniformly, this is
(T′) 𝒫^{(0)}_u(Y) = o(Y) uniformly in squarefree u ≤ Y².
(T″) Write 𝒫^{(0)}_u(Y) = Y S_u(Y) − Σ_{h≤Y} h (F_u(Q_u(h)) − E_u) (partial summation). The second term is a sum of dyadic
     smooth-window sums of the type of paper IV Theorem smooth / dilation Theorem 1 (weight h on [Y_j, 2Y_j]), each of size
     Y_j · (increment of S_u over the block) ≈ Y_j · Y_j^{-1/2}·(spectral sum at level u²). So, GIVEN an increments bound
     uniform in u (Task A), (T′) ⇔  S_u(Y) → 0 uniformly in squarefree u ≤ Y²  — the SHARP sum tends to zero.
     S_u(Y) = Σ_{d adm.} (λ(d)/d) Σ_{x∈R_d} ψ((Y−x)/d) (Lemma sawtooth, paired convergence; moduli d ≤ u²Y² + |D| matter),
     ψ = 1/2 − {·}. This is a pointwise statement about a sum of sawtooths over ALL admissible moduli, i.e. the
     equidistribution of the dilated roots ū·R_d ∩ [1, Y] for every scale of d simultaneously: Hooley's problem for the
     polynomial u²x² − D, uniform in u. Numerically S_1(t) stays below 1.3 and the observed 𝒫 ≍ 0.4√Y forces
     S_u(Y) ≍ Σ_j t_j amp_j Y^{-1/2}·osc → 0.

## 1. What is known, with the u-dependence (literature checked 15 Sep)
- Hooley 1963 Thm 1: W_h(x,1) = Σ_{x<n<2x} ρ_h(n) ≪_h x^{3/4}(log x)² for a FIXED irreducible quadratic (constant depends on the
  polynomial). Bykovskii 1984 Thm 4 / Hejhal: exponent 2/3+ε (spectral). DFI 2012 Prop. 1 (negative discriminant):
  W_h(x,N) ≪_ε gcd(h,N)(N²/x)^{1/20}(x/N)^{1+ε}, constant depending on the polynomial; Tóth 2000 and Ngo 2021 (arXiv
  2107.13301, Thm 1.1: W_h(x,N) ≪ x^{12/13}N^{-11/13}h^{1/13} + h x^ε) for positive discriminant. NONE is stated uniformly
  in the discriminant; for us the polynomial u²x² − D has discriminant 4u²D and the Poincaré-series method lives at
  level ≍ u² — exactly the level-u² picture of paper IV §7 and the dilation draft. Uniformity in the level is what
  Deshouillers–Iwaniec's large sieve provides on the spectral side; nobody has run the DFI/Bykovskii argument for the
  dilated roots with the level tracked. (Paper III Hypothesis W(θ, B) is the power-saving version of this; we need less.)
- Ours: Theorem 1 of the dilation draft (piece u = level-one seed at length uY over W_u; error O_{w,D,u,ε}(Y^{-2+ε}) — the
  u-dependence of the constant is NOT tracked); Theorem 2 + Prop. mult: the level-one lines have r_j(u;D) ≪ u^{-1/2}
  (ramified) / u^{-3/2} (else), multiplicative; Lemma D: newform lines vanish for inert u. So the NAMED main terms are
  uniformly summable. Unnamed: the cycloidal-group forms of level u² (Strömberg), and everything in the total spectral sum.

## 2. The programme (in order; each step a statement that is either proved or left open)

Task A (increments, uniform in u). Theorem 1 with every constant explicit in u:
   √Y S^w_u(Y) = √u |D|^{-1/4} Σ_v Per_{W_u}(v) L̃_v [A_v(uY) + c.c.] + ℰ^w_u(Y) + O(u^{a} Y^{-2+ε}),
   and a bound for the TOTAL spectral sum Σ_v |Per_{W_u}(v)| |L̃_v| |A_v| ≪ u^{b} uniformly (Cauchy–Schwarz + pre-trace
   formula for Σ_{t_v≤T}|v(τ)|² at the ≍ u h(4D) points of W_u, Hoffstein–Lockhart |ρ_v(1)|² ≪ e^{πt}(Nt)^ε/N for newforms of
   level N | u², ILS-type orthonormalisation of oldforms with Gram determinants bounded below by |λ(p)| ≤ p^{7/64}+p^{-7/64}),
   and the Eisenstein term ℰ^w_u with its u-dependence (cusps of Γ₀(u²): number ≍ u, widths, Fourier coefficients of
   E_𝔞 at the cusp ∞ bounded via the scattering matrix — the delicate part; log-separation only, rem:smoothmeaning).
   Output: S_u(2Y) − S_u(Y) (smoothed) ≪ u^{b'} Y^{-1/2}, nontrivial for u ≤ Y^{1/(2b')−ε}. Expected crude b' ≈ 2 (range
   u ≤ Y^{1/4}); any improvement of the period average (Katok–Sarnak/Waldspurger at level u²: Σ_v |Per_{W_u}(v)|² as
   L(1/2)-values, or the Hecke-transport of §3 below) improves the range.
   Where u enters (audit of paper IV's proof of thm:smooth, run at level u² with Y → uY): #orbits ≪ u h; P_{Γ₀(u²)}[Ψ] is a
   sub-sum of P_Γ[Ψ], so the L^∞ bound ≪_D 1 is uniform in u, and ‖P[Ψ]‖₂² ≪ u^{2+ε}; the coefficient formula is
   unchanged (cusp ∞ of width 1); the contour shift to Re s = 3−ε is unchanged; the sup norms at the points and the
   Weyl law at level u² (≍ u²T²/12) enter the summation; the Eisenstein series of ≍ u cusps enter ℰ^w_u.

Task B (the sharp sum). Prove S_u(Y) → 0 uniformly for u in the widest range possible:
   B1. u = 1 (and fixed u): Hooley's theorem gives it (T_k(Y) = o(Y) for each k with the trivial bound for k > K; the
       sawtooth Fourier series with the 1/k weights). Write this out as a proposition: for fixed u, 𝒫^{(0)}_u(Y) = o(Y).
       (Is this already in paper III? Theorem small + Lemma far + the window for fixed u: the window for fixed u is a
       Koksma bound Y log(u²L)(log Y)^{-c} — yes, fixed u is done there with a LOG saving. So B1 adds nothing new; skip.)
   B2. The dilated Hooley sum T^{(u)}_k(x) = Σ_{d≤x adm.} λ(d) Σ_{r²≡D (d)} e(k ū r/d): make Hooley's Weil-bound argument
       explicit in u (the polynomial u²x²−D; Hooley's parametrisation of pairs (d, x) with u²x² ≡ D (d) as forms of
       discriminant 4u²D, i.e. our family W_u; the Salié/Kloosterman sums that appear have modulus d and the twist ū).
       Target: T^{(u)}_k(x) ≪ x^{3/4+ε}(uk)^{c}, with c explicit. Then S_u(Y) = o(1) for u ≤ Y^{1/(4c)−ε}.
   B3. Combine: the range where BOTH A and B2 hold is the proved range of (T′); state the theorem
       "Σ_{u ≤ H^{θ₀}} w(u) 𝒲_u(H/u; log H) = o(H log H)" for the θ₀ obtained, i.e. Theorem A′ with the u-sum truncated —
       partial progress on the conjecture, honestly labelled. What remains is u ∈ (H^{θ₀}, H^{2/3}].
   B4. The remaining range: the level-aspect input (DI large sieve for the spectral side of B2 run at level u²; or the
       bilinear route of paper III §remains item 1, averaging over u first). Not planned in detail until A–B3 are done.

Task C (bookkeeping): every proved statement goes into a new section of the dilation draft or a separate note
   (research/paper-uniform/?) — decide after A; ERRATA/KNOWLEDGE/STATE as usual; outside reading before any claim.

## 3. A structural remark to exploit (from the dilation draft)
By Prop. classwise/mult, the family sum Σ_{Q∈W_u} Φ(z_Q) of ANY Γ₀(u²)-invariant Φ equals Σ_C |S_C|^{-1} Σ_{(ℓ₁⊥ℓ₂)} Φ(αγ⁻¹z_C):
a sum over the h(4D) level-one Heegner points of a RESTRICTED Hecke-type operator (u − χ of the u(u+1) cosets). For
Φ = the automorphised seed this rewrites piece u as a sum over a FIXED finite set of points; the u-dependence is in the
operator, whose spectral behaviour on level-one forms is Lemma B (λ(u)√u + c_u(D), decaying relative to the trivial
u − χ). For the total spectral sum this suggests bounding the restricted-Hecke image of the seed directly (a
Hecke-orbit equidistribution statement at the level-one points, rate via the spectral gap of T_u — Ramanujan on average),
instead of the level-u² spectral theory. To be tested numerically before use (F24): compute Σ_{Q∈W_u} Ψ(z_Q) for a
smooth seed and compare with (u − χ)·(mean) as u grows.

## 4. Log
- 15 Sep 13:00: file created; literature facts above from arXiv 2107.13301 (Ngo) which quotes Hooley, Bykovskii, DFI, Tóth.
