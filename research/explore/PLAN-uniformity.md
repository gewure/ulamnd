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
(T″) [WRONG as first written, corrected 15 Sep 13:40 after the test below.] The sharp sum S_u(t) does NOT tend to zero:
     at integer t it has the offset E_u/2 (the mean over integer t of ψ((t−x)/d) is 1/(2d)), and S_u(t) − E_u/2 is an O(1)
     "noise" — sup over dyadic blocks ≈ 0.9–1.3 for D = −4, T = 2·10⁴, for EVERY u from 1 to 10⁵, not decaying in T.
     Its CESÀRO mean is what vanishes: (2/T)∫_{T/2}^T (S_u − E_u/2) = ±0.005 for all eleven u tested (u = 1, 2, 3, 7, 11, 31,
     101, 1009, 10007, 100003; D = −4, T = 2·10⁴), against the trivial O(1) and consistent with 0.4√T/(T/2) = 0.006
     (hecke: research/explore/sharp-sum-u.py, logs/sharp-sum-u-D4-T2e4.log). So the picture is: S_u − E_u/2 is bounded,
     mean-zero, short-range-correlated noise whose integral is the √Y random-walk-like piece with the Maass spectrum; the
     smooth-window theorem describes the smoothed averages of that noise at scale Y (size Y^{-1/2}); the Cesàro piece is
     ∫_0^Y S_u, and its o(Y) is the equidistribution of the dilated roots on ALL scales of moduli at once, Cesàro-averaged.
     Partial summation 𝒫^{(0)} = Y S_u(Y) − Σ_{h≤Y} h(F−E) is useless (both terms O(Y), cancelling to O(√Y)); the sharp
     cutoff at h = Y and the sharp start at h = 1 are both Hooley-type. NUMERICAL SUPPORT FOR (T′) UNIFORMLY IN u: the
     Cesàro mean deviates from E_u/2 by ≤ 0.006 ≈ 0.4√T/(T/2) for all u up to 10⁵ = T^{1.16} (the needed range is u ≤ Y²).
     Runs to T = 2·10⁵ (u up to 10⁸+7) and D = −7 launched 13:45 (logs/sharp-sum-u-D4-T2e5.log, -D7-T5e4.log).

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

## 4. Numerical facts established 15 Sep 13:30–14:30 (F24: tested BEFORE any mechanism is trusted)
(N1) Cesàro convergence uniform in u, including u ≫ Y. D = −4, T = 2·10⁵: (2/T)∫_{T/2}^T S_u − E_u/2 = +0.0011, +0.0008,
     +0.0003, +0.0012 for u = 1, 7, 101, 10007 (trivial size O(1); 0.4√T/(T/2) = 0.0018); at T = 2·10⁴ the deviations were
     ≤ 0.006 for eleven u up to 10⁵; D = −7, T = 5·10⁴: ≤ 0.0004 for u = 1, 2, 3, 11, 1009, 100003. The deviation scales like
     T^{-1/2} and shows no dependence on u. Scripts: sharp-sum-u.py; logs/sharp-sum-u-*.log.
(N2) Dilated Hooley sums have square-root cancellation uniformly in u. T^{(u)}_1(x) = Σ_{d≤x} Σ_{r²≡D(d)} e(ū r/d), D = −4,
     x ≤ 3·10⁵: max |T|/√x over dyadic blocks = 0.38 (u=1), 0.31 (2), 0.70 (3), 1.33 (7), 0.78 (101), 0.46 (1009), 0.99 (10007),
     0.53 (10⁶+3); no growth with u, u up to 10⁶ ≫ x. Script weyl-dilated.py; logs/weyl-dilated-D4-k1.log (k = 3: -k3.log).
(N3) The smooth-window sums √Y S^w_u(Y) grow mildly with u on the existing grids: std over the grid 0.10–0.14 (u = 1),
     0.07–0.19 (u = 2), 0.21–0.28 (u = 3), 0.21–0.32 (u = 5), 0.29–0.33 (u = 6) — roughly u^{1/2}, far below the crude
     level-u² spectral count u².
(N4) TWO HALVES SEPARATELY (two-halves.py, D = −4, X = 2·10⁵, k = 1; 15 Sep 18:40): splitting the pairs by |r′| < |p| (good) and
     |p| < |r′| (bad) in the reduced-class parametrisation of PROOFS-uniform §4, BOTH halves show square-root cancellation
     on their own for every u = 1, 3, 7, 20, 60, 200, 1000, 5000: max|T_good|/√x ≤ 0.99, max|T_bad|/√x ≤ 0.52 on dyadic blocks.
     The bad half holds ≈ 30% of the pairs. So the bad half — Kloosterman moduli ≡ 0 (mod u), summation variable of length
     ≍ 1/u² of the period — cancels by itself far beyond the elementary range u ≤ X^{1/6}: the spectral treatment of the
     bad half is the right target, and no cancellation between the halves is needed.
(N5) AVERAGING OVER u (weyl-uaverage.py, D = −4, X = 10⁵; 15 Sep 19:30): over M consecutive u the ratio |Σ_u T^{(u)}|/√(Σ|T^{(u)}|²)
     is 1.45 (u ∈ [1000,1200)), 0.86 (u ∈ [300000,300200)), 0.75 (k = 2, u ∈ [200000,200060)), 2.2 and 1.4 for two 30-value
     blocks — i.e. consecutive u behave like independent random signs (one block gave 0.05, a fluctuation, not structure).
     Averaging over u gives the generic √M and nothing more at this scale; the individual sums are already ≍ √X (N2).
CONJECTURE U (the uniform truth, from N1–N2): T^{(u)}_k(x) ≪_{D,ε} k^{A} x^{1/2+ε} and 𝒫^{(0)}_u(Y) ≪_{D} Y^{1/2+ε}, both
uniformly in squarefree u ≥ 1 (all u, not only u ≤ Y²). Everything the methods lose in u is an artefact of the method.

## 5. Where u sits in the Hooley–Tóth–Ngo parametrisation (read 15 Sep, arXiv 2107.13301 §3)
For f(X) = αX² + βX + γ the roots of f(ν) ≡ 0 (mod n) correspond to the forms Q_f = {[u', r, v] : v ≡ 0 (α), r ≡ β (2α),
disc Δ} with v = nα, modulo Γ_∞, and Q_f is stable under Γ = Γ₀(α). For OUR polynomial u²X² − D: α = u², β = 0, Δ = 4u²D,
Γ = Γ₀(u²), and Q_f = {v ≡ 0 (u²), r ≡ 0 (2u²)} — exactly the family W_u of the dilation draft (a ↔ v). Hooley's identity
r(ξ)/v(ξ) = 2a/c − (rc + 2vd)/(c v(ξ)) turns the Weyl phase e(k·root/n) into e(ka/c) + O(k/x): the Weyl sums are Poincaré
series on Γ₀(u²) (Ngo Cor. 3.14) whose Kloosterman sums have moduli c ≡ 0 (mod u²), and the spectral input is the
Deshouillers–Iwaniec/Pitt bound for sums of Kloosterman sums of Γ₀(q), q = Nu² (Ngo Thm 2.5, explicit in q). Consequences:
(i) B2 is well-posed: rerun Hooley's Weil-bound argument (incomplete Kloosterman sums over d of length ≍ √x to modulus
    c = u²c' — a 1/u fraction of the period) with u tracked; first guess T^{(u)}_k(x) ≪ u^{1/2} x^{3/4+ε} k^{c} (the u^{1/2} from
    the ≍ u h(D) classes of discriminant 4u²D, partly compensated by the shorter c'-range). To be derived, not guessed (F24).
(ii) Two regimes: for u ≫ √x the Kloosterman moduli c = u²c' exceed the range, and the roots are parametrised by the
    translates of the ≍ u class representatives alone — a different, "elementary" regime in which N2 still shows
    square-root cancellation; its mechanism (cancellation ACROSS classes) is unexplained and is the new phenomenon.
(iii) The λ(d)-weight of the pieces is harmless: λ = 1 * g with g(p) = 4/(p−4), so Σ_d λ(d)ρ_k(d) = Σ_e g(e) W_k(x; e) needs the
    Weyl sums with the divisibility e | d, which is DFI's/Ngo's W_h(x, N) with N = e and Σ_e g(e) e^{-1+...} convergent.

## 6. The regime map (15 Sep 16:30; derivation and two numerical checks in PROOFS-uniform.md §2)
For Weyl sums with moduli ≤ X: (I) u ≤ X^{1/5} Hooley/Weil on Γ₀(u²) with loss u^{5/4}; (II) X^{1/5} < u < X/√|D| orbit
structure present, Weil ineffective; (III) u ≥ X/√|D| every pair isolated in its orbit, Weyl sum = character sum of the
Hecke labels j(Q) = −r n̄ mod u (reciprocity), square-root cancellation on average over u ≥ X² (Type II), open for individual u.
For the WINDOW (moduli V ∈ (Y, u²Y log H], u ≤ Y²): u ≤ Y^{1/5} is closable now (partial theorem, u ≤ H^{1/6−δ});
Y^{1/5} < u ≤ Y^{1/2} needs level-u² spectral theory with uniform constants; u > Y^{1/2} has an isolated-pair part V < u².

## 7. The bad half as level-u² Kloosterman sums, and a warning (15 Sep 18:50; heuristic, to be done properly)
Poisson in the short variable p (length ≍ 2r′, period u²r′) turns the bad half of a class into
Σ_{r′ ≤ √(X/c̃)} Σ_{|m| ≲ u²} S(k, m; u² r′)·(Bessel-type weight)/(u²r′): Kloosterman sums of Γ₀(u²) at the cusp ∞ with
K ≍ u² frequencies and moduli C ≍ u²√(X/c̃) — exactly Ngo's Lemma 3.15 structure. Inserting the Pitt/DI bound (Ngo Thm 2.5)
with q = K = u² gives a per-class bound ≍ u^{5/2}X^{1/4}ã^{1/4}, which beats the trivial bad-half count Xã/(u²|D|) only for
u⁶ < Xã, i.e. (ã ≍ u√|D|) u ≲ X^{1/5} — the SAME threshold as Weil. If this heuristic survives a careful computation, the
generic level-aspect Kloosterman bounds do not extend the range, and the uniformity must come from the specific structure
(the m-sum is a smooth short Poisson dual, not an arbitrary K-range) or from AVERAGING OVER u: Σ_u w(u)/u · (level-u²
Kloosterman sums with moduli u²r′) = a level-ONE Kloosterman sum over all moduli c with the squarefull weight
#{(u, r′): u²r′ = c}·w(u)/u — Kuznetsov for SL₂(Z) — but the Bessel weights depend on u through the length H/u. This is the
spectral form of part III's "bilinear hybrid" (RESEARCH-USES 1c) and of the Type-II averaging; it is the candidate mechanism
for the whole range, and it should be tested numerically first: compare Σ_u w(u) T^{(u)}_k against Σ_u |T^{(u)}_k|.

## 8. Status of the two routes at the end of 15 Sep (21:00)
- Elementary (Hooley/Weil with u tracked): the sketch of PROOFS-uniform §4 does not survive scrutiny as written (§5: reduced
  representatives introduce a phase mod u², unreduced ones a large twist); a rigorous version would reach only u ≲ X^{1/8}.
  Not worth a draft. What it taught: the bad half = Kloosterman sums of Γ₀(u²); the good half's mod-u² phase is the same object.
- Structural (PROOFS-uniform §6): decompose the orthogonality indicator w_C on SL₂(F_u)/T (graph of the orthogonal involution σ_C)
  into SL₂(F_u)-components: trivial part = (u−χ)/(u(u+1))·√u·T_u applied to the LEVEL-ONE Poincaré series — uniformly
  O(u^{-1/2+7/64+ε}) by Hecke theory alone; Steinberg part = level u; principal series = level u². This puts the whole
  spectrum on the footing Lemmas B and D established for single lines. To be TESTED numerically first (hecke-components.py).
- Conjecture U stands numerically (N1–N5). The gap is between "true for all u" and "provable for u ≤ Y^{1/5}".

## 9. After the component test (16 Sep): where the non-uniformity lives
The piece splits exactly into T = w̄·S^w_1(uY) (the u = 1 object: uniform in u for free, relative size ≍ u^{-3/2}), a marginal
part L of level u (functions of one line: the Hecke/Fricke neighbours, i.e. Γ₀(u)-Poincaré series of the seed evaluated at
level-u Heegner points) and a remainder R of genuinely level u² (Steinberg's third copy and the principal series). On the data
R is the largest part and is everything for inert u. Consequences for the route:
- The level-u part L is a MILDER problem than the level-u² problem: its spectral expansion runs over Γ₀(u) (volume ≍ u, not u²),
  and its periods are level-u Heegner periods, for which Liu–Masri–Young's level-aspect equidistribution is stated.
- R is the hard core. Arithmetically (inert u) R = Σ_{h'} w(h'/(uY))(1[u|h'] − 1/u)(σ₋₁(h'²−D) − mean) = (1/u)Σ_{t≢0 (u)} of the
  additive twists e(th'/u) of the u = 1 sum at length uY: the u-aspect of R is an additive twist of conductor u of a FIXED object.
  That is a cleaner formulation of the whole problem than the level-u² picture: bound Σ_{h'} w(h'/X) e(th'/u) σ₋₁(h'² − D) with a
  saving uniform in u ≤ X^{2/3}. The Poisson dual pairs the frequency t/u with the fractions b′/a of the roots, so the problem is
  the equidistribution of the roots of x² ≡ D (mod a) against the rationals t/u — a shifted-convolution/Kloosterman question with
  a fixed quadratic and a varying rational shift, the natural input being a large sieve for roots of quadratic congruences
  (Fouvry–Iwaniec) averaged over t.
- Next: (1) measure the u-scaling of rms(L) and rms(R) at u = 3, 5, 7, 11, 13 on Y ≤ 10⁶ (cheap); (2) write the additive-twist
  formulation of R for split u (the marginal correction adds the u | a and u | n/a restrictions); (3) literature for sums of
  σ₋₁(h² − D) twisted by e(th/u) uniformly in u.

## 4′. Log
- 16 Sep: component test finished (STATE §17); §9 where the non-uniformity lives; the additive-twist formulation of R.
- 15 Sep 21:00: §5 correction of the elementary sketch; §6 representation-theoretic decomposition (trivial component = Hecke translate of the u=1 object); PLAN §8 status.
- 15 Sep 19:30: N5 (u-averages: random signs only; the 0.05 block was a fluctuation).
- 15 Sep 18:50: N4 (two halves cancel separately); §7 the bad half as Γ₀(u²) Kloosterman sums, the X^{1/5} warning, averaging over u as candidate mechanism.
- 15 Sep 16:30: regime map corrected (III starts at u ≍ X/√|D|; orbit-minima and isolation tests: orbit-minima.py); reciprocity/Hecke-label form; window-specific map.
- 15 Sep 15:20: regime map §6; PROOFS-uniform.md started (setup verified, elementary bound with u tracked, three regimes).
- 15 Sep 13:00: file created; literature facts above from arXiv 2107.13301 (Ngo) which quotes Hooley, Bykovskii, DFI, Tóth.
