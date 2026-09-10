# Brainstorm: how to prove the window (11 September 2026, first pass — before the literature round)

Ratings are provisional (★ = dead … ★★★★★ = do first). Each route lists: idea, why it could work, what it would give,
the obstruction, and a cheap TEST (numerical or theoretical) that can kill or promote it in a day.

## 0. The shape of the problem (read first)
- Per modulus d' ∈ (Y, u²YL], the count of dilated roots below Y minus its expectation. Fraction of a period covered:
  Y/d' ∈ [1/(u²L), 1). Trivial mass per piece: Y log(u²L); needed: any unbounded saving summed over u.
- Two mechanisms exist and both stop at the window: (i) CRT-mixing (Kowalski–Soundararajan) gives (log)^{-c} per
  modulus but the window has log u dyadic ranges, and the loss log u × the gain (log Y)^{-c} does not cancel;
  (ii) averaging the dilation ū over u ~ U kills everything once U > Y^2 (Type II, u > H^{2/3}).
- Two facts to exploit: the window is SELF-DUAL (e = Q_u(x)/d' lies in the same window), and its moduli are
  COMPOSITE almost always (d' ≤ u²Y log H; the d' without a divisor in [u², Y] are a vanishing proportion).
- A third fact: (W) needs only o(H log H). A saving of 1/log log H per window would do. This is a much lower bar than
  a power saving, and most of the routes below are aimed at it.

## 0b. CALIBRATION (route 9 done, 11 Sep): the pieces have square-root cancellation
Exact computation for t²+1 (scripts/piece.ts with E F_u to 22 digits from scripts/ef.py; cross-checked against the
modulus-by-modulus enumeration scripts/window.ts):
  P_u(Y) = Σ_{d'} (λ/d') Σ_x B  (whole Cesàro piece)          |P_u(Y)| / √Y ≤ 0.4 for u ∈ {2, 10, 26, 130}, Y ≤ 10⁷
    u=2:   −4.3, −1.6, 11.8, −5.9, 42.7      at Y = 10³ … 10⁷      (trivial scale Y log u², e.g. 10⁷·1.4)
    u=10:  −0.5, −7.0,  6.9, −24.1, 229.8
    u=26:  −3.8, 37.4, 24.9, 228.3            (Y ≤ 10⁶)
    u=130:  3.8,  4.5, 13.5, −97.9            (Y ≤ 10⁶)
  S_u(t) = Σ_{h≤t} (F_u(Q'(h)) − E F_u)  (sharp piece; F_u(n) = Π_{p|n, split, p∤u}(1 + 1/(p−4)), Q'(h) = (u/2)²h² + 1)
    is BOUNDED in the data: max |S_u(t)| for t ≤ 10⁷ is 1.26 (u=2), 0.29 (u=10); rms 0.48 / 0.07; its mean over t is
    exactly (E F_u − 1)/2 (a convention constant), so P_u(Y) = Σ_{t<Y} (S_u(t) − (E F_u − 1)/2).
Reading: (a) per piece the Cesàro off-diagonal is O(√Y) or smaller — the truth is square-root cancellation, far beyond
the o(Y log u) that (W) needs; (b) the sharp piece S_u(t) — trivially O(log t) — is numerically O(1): each prime p | Q'(h)
contributes a sawtooth of size 1/p, and the sawtooths at different primes cancel like independent signs (Σ 1/p² < ∞);
(c) this is the same phenomenon as the diagonal Σ_d a_f(d)({H/d} − ½) of paper I, which is o(log H) with the sawtooths at
different d cancelling — there the Dirichlet series ζ(s)D_f(s) proves it. The piece has the analogous series
G_u(s) = Σ_h F_u(Q'(h)) h^{−s} = Σ_{d'} (λ(d')/d'^{1+s}) Σ_{x∈R'} ζ(s, x/d') (Hurwitz), and P_u(Y) = o(Y) ⇔ G_u(s) − E F_u ζ(s)
has no pole at s = 1 with suitable growth — paper II's O_f(s) formulation, piece by piece. Route 11 is therefore not
"unlikely" but the natural analytic home of the numerics: the question is the boundary behaviour of Σ_{d'} λ(d') d'^{−1−s}
Σ_x ζ(s, x/d') on Re s = 1, i.e. of the "Hurwitz zeta of the roots" averaged over moduli. (Upgraded to ★★★★☆.)
Consequence for the routes below: any method that treats the frequencies k ≤ u²L one at a time (Weyl sums, Hypothesis W)
must not lose a power of k — the corrected condition is θ+6B < 1, and every known Weyl bound loses k^{1/4} or worse. Methods that
keep the sum over d' or over h intact (routes 1, 7, 11; the divisor-problem view S_u(t) = Σ_{h≤t}(F(Q'(h)) − E F)) are
the ones with a chance.

## 1. Sieve-style factorisation of the modulus (Type I in d') — ★★★★☆
Idea: write d' = d₁d₂ with d₂ ∈ [d'/Y, Y^{1−ε}] (exists for almost all d' in the window; Ford-type density). Then
d₁ = d'/d₂ ≤ Y^{...}: the count #{x ≤ Y : d₁d₂ | Q_u(x)} = Σ_{x ≤ Y, d₁ | Q_u(x)} 1_{d₂ | Q_u(x)}, and summing over d₂ in a
dyadic range with the weight λ(d₂) is a divisor-type sum Σ_x 1_{d₁|Q(x)} Σ_{d₂ ~ D₂, d₂ | Q(x)} λ(d₂): a "divisors of a
quadratic polynomial in an interval" problem (Hooley 1963 handles Σ τ(n²+a); we need divisors in a dyadic range,
restricted to x in the ω(d₁) classes mod d₁, with d₁ ≤ Y/D₂-ish so the classes are full periods).
Why it could work: the Type I level D₂ ≤ Y^{1−ε} is exactly the classical range where Σ_{d₂ ≤ D₂} |E(x; d₂)| is under
control by the large sieve / Barban–Davenport–Halberstam for the polynomial sequence Q_u(x) (roots of Q_u mod d₂
equidistribute in x for d₂ ≤ Y^{1−ε} on average over d₂ — this is Hooley's Σ₃/Σ₅ machinery).
Gives: the windows with d' having a suitable divisor; the rest (d' with all prime factors > Y^{1−ε} or < u² — rough
numbers) has density → 0 in the window, which is the unbounded saving (W) needs.
Obstruction: the two sides d₁, d₂ are tied by d₁d₂ | Q_u(x) via CRT — the root mod d₁d₂ is not a product of independent
counts; need the correlation (it is exactly the KS mixing). And the uniformity in u (the dilation ū enters both factors).
TEST DONE (11 Sep, scripts/window.ts, data/window-split.log): split the window moduli by P⁺(d') > Y ("rough": d' = p·m, p prime
> Y, m < u²) vs P⁺(d') ≤ Y ("smooth"). Result: the rough moduli are NOT a vanishing proportion at any practical scale —
they are the MAJORITY for u ≥ 10 (u=10, Y=10⁵: 404 303 rough vs 219 638 smooth; u=26, Y=10⁴: 383 452 vs 97 989), because
admissible integers have density ~ 1/√log while primes have 1/log, so the rough fraction is ~ log(u²)/√log Y and decays
only like 1/√log Y. Both parts show full cancellation individually (rough −25.0 / smooth +49.3 at u=2, Y=10⁵; rough +15.9
/ smooth −5.0 at u=10, Y=10⁵). CONSEQUENCES: (i) "ignore the rough moduli" costs a factor 1/√log at best — still an
unbounded saving in principle, so route 1 is not dead for (W), but it is not the clean win hoped for; (ii) the rough part
d' = p·m is a PRIME-modulus problem: roots of x² ≡ D mod p (CRT-glued with the small m) in an interval of length Y ≥ p/u²,
i.e. a positive fraction 1/u² of the period — exactly the setting of DFI 1995 (equidistribution to prime moduli, saving
(N²/x)^{1/20} → x^{−1/20} for N = 1) with frequencies k up to u²m: for BOUNDED u this is a theorem. So for bounded u the
rough part is done by DFI 1995 + CRT with m, and the smooth part d' = d₁d₂ (both factors ≤ Y) is the Type I side. Rating
stays ★★★★☆ but the route is now "rough = DFI 1995 per prime, smooth = factorisation", and the u-uniformity is the issue
in both halves.

## 2. Kloosterman fractions for a PARTIAL average over u — ★★★★☆
Idea: the dilation ū mod d' averaged over u in a short range U' ≪ U: Σ_{u ~ U, u ≡ ...} λω(u) e(k ū r/d') is a bilinear
form with Kloosterman fractions (Duke–Friedlander–Iwaniec 1997; Bettin–Chandee 2018 give cancellation in
Σ_{m,n} α_m β_n e(a m̄/n) as soon as MN is large compared with the modulus range, roughly (MN)^{1/2} ≫ (range)^{...}).
Why: Type II used the FULL residue average (needs U > d'^2-ish via Pólya–Vinogradov + Parseval); Kloosterman-fraction
bounds give cancellation already when U is a power of d' smaller than 1, extending the Type II range from H^{2/3}
towards H^{1/2} and below. Combining with Fourier in x: the window in piece u is Σ_k Σ_{d'} λ(d') g_k(d') Σ_x e(kx/d'),
x = ū r; sum over u in a dyadic block first.
Gives: possibly all u ≥ H^{δ}; the exponent condition on W then relaxes (3θ+3B<2 at range 1/2, better beyond).
Obstruction: the coefficient of u is λω(u) times a function of H/u (smooth) — fine; but the variable d' has the weight
λ(d')g_k(d') AND the root r depends on d' (two roots ±√D mod d') — so "β_n" carries the arithmetic of √D mod d'; DFI's
bound allows arbitrary bounded coefficients, so OK. The frequency k up to u²L multiplies the fraction: e(k ū r/d') with
k not coprime issues; fine.
TEST (theory, one afternoon): write the bilinear form precisely and plug the DFI/Bettin–Chandee exponent to see which
range of (U, d') gives a saving Y^{-δ} uniformly for d' ≤ u²YL.

## 3. Delta method for the ternary quadric u²x² − de = D in a lopsided box — ★★★☆☆
Idea: the window count is #{(x,d,e): u²x² − de = D, x ≤ Y, d,e ∈ (Y, u²YL]} with weights (Y−x)λ(d)/d. Heath-Brown's
delta method handles ternary quadratic forms in lopsided boxes with a main term (the singular series × singular
integral, which should reproduce ℰ) and an error term; the coefficient u² is a parameter — uniformity in it is the
question. Elegant because it treats d and e symmetrically (self-duality built in) and never mentions roots mod d.
Obstruction: the delta method for ternary forms typically saves only when the box is not too lopsided (Y vs u²Y) and
the form's determinant (∝ u²D) enters the error; the weight λ(d)/d is not smooth (multiplicative) — needs a
convolution trick (λ = 1*κ, κ small). Expect: works for u ≤ Y^{small}.
TEST: look up the exact error term of Heath-Brown Thm 4 (ternary, lopsided) and compute the range of u it covers.

## 4. Spectral: Bykovskiĭ's method for roots in short intervals — ★★★☆☆
Idea: the number of roots of x² ≡ D (mod q) in a short interval, summed over q ~ Q, is expressed via the spectral theory
of Γ₀(4)\H (Bykovskiĭ 1984; also DFI 1995 via half-integral weight Kuznetsov). The dilation by ū is a Hecke-type
translate; the level becomes 4u². The spectral large sieve (Deshouillers–Iwaniec) has explicit level dependence.
Why: this is the only method known to give genuinely short intervals (DFI 1995: x ≤ q^{1/2+...}? for prime q).
Obstruction: level 4u² with u up to H^{2/3}: the level dependence must be < u^{1/12} in our normalisation; spectral
bounds usually lose the level polynomially with exponent ≥ 1/2 without an extra averaging. Might work for u ≤ Y^{ε}.
TEST: find the level dependence in DFI 1995 Thm 1 / Deshouillers–Iwaniec large sieve and compare with θ+6B<1.

## 5. Dispersion method for the u-average — ★★★☆☆
Idea: Σ_u |Σ_{d'} λ(d') g(d') ρ_k(d')(u)|² expanded: pairs (d'₁, d'₂) and the correlation of dilated root sets mod d'₁d'₂;
the diagonal d'₁ = d'₂ is trivially small, the off-diagonal is a Kloosterman/Salié-type sum over u. This is how
Fouvry–Iwaniec extend Bombieri–Vinogradov-type ranges. It is route 2 with a square, and often gives more.
TEST: same afternoon as route 2.

## 6. Second Cesàro / higher Riesz mean in H — ★★☆☆☆
Idea: replace Σ_{h≤H}(1−h/H) by a smoother weight in h (Riesz order 2 or C^∞). Then the per-modulus test function's
Fourier coefficients decay faster... BUT the flat range k ≤ d'/Y comes from the support length Y < d', not from the
sharp edge; smoothing in h does not remove it. Averaging additionally over H in a dyadic range (Cesàro in H, which
still determines the log H coefficient) kills the frequencies k > d'/Y but leaves the flat ones. Probably dead for the
window itself, but useful to make every OTHER term power-saving. Keep as a supporting trick.
TEST: none needed; theoretical.

## 7. Function-field first (F_q[u], Lang–Weil/Katz) — ★★★★☆ as a strategy
Idea: prove the window over F_q[t] where "short interval" = fixed degree < deg d', and the dilated roots are points on an
explicit variety over F_q (paper III §6 already counts configurations). The whole (E) in Cesàro form over F_q[t] with
q → ∞ may be provable by Lang–Weil + monodromy of the Salié-type sheaf (Katz), including the analogue of the window.
Why: it tells us WHICH cancellation is real (geometric) and which is not; a q-independent main term for the window
would be a warning; a genuinely square-root error would say Hypothesis W's strength is realistic.
Gives: a theorem (paper IV could be "the window over function fields"), plus the correct conjecture over Z.
TEST: N=3, D=u, q ≤ 7 exact data exist (paper III); extend the configuration count to the window configurations and
check against data — half a day.

## 8. Use the self-duality as an involution to CANCEL, not just to reflect — ★★☆☆☆ (speculative)
Idea: pair each (x, d') with (x, e), e = Q_u(x)/d'; both in the window; the weights (Y−x)λ(d')/d' and (Y−x)λ(e)/e differ.
If λ were 1 and the weight 1/d', the sum over divisor pairs (d', e) of Q_u(x) in the window of (1/d' − 1/e)·sign... hmm:
Σ_{d'|Q, d' ∈ window} 1/d' = Σ_{e | Q, e ∈ window} e/Q — is there an exact identity making the window sum equal to a
"small" quantity (like the far moduli)? For the count Σ 1/d' over d' | n in (A, B] with AB = n·(const) there is the
symmetry d' ↔ n/d'. Worth 30 minutes with pen and paper; probably gives only the reflection we already know.

## 9. Probabilistic model / Poisson–Dirichlet for divisors of Q_u(x) — ★★☆☆☆ (heuristic, not a proof)
Idea: the divisors of Q_u(x) in the window behave like a Poisson–Dirichlet process (Arratia–Barbour–Tavaré, Ford); the
expected number in (Y, u²YL] with weight 1/d' equals the ℰ-term; fluctuations are what Off measures. A probabilistic
model would predict the SIZE of the window sum (is it really o(Y) per piece, or ~ Y/√log?). Useful to calibrate what
we should be trying to prove.
TEST: compute W_u(Y; L) numerically for t²+1, several u, Y up to 10⁵ (exact, small local run), and fit its size.
This is the single most useful experiment before choosing a route: it tells us whether the window is o(Y) per piece
(then any route giving an unbounded saving is enough) or whether cancellation happens only in the sum over u.

## 10. Additive combinatorics / sum-product for the dilated root set — ★☆☆☆☆
The set R^{(u)}_{d'} has size 2^{ω-ish}; dilation structure ū·R; Bourgain–Garaev style bounds for sets of inverses in
short intervals give savings only for very short intervals or very structured sets. Unlikely to beat KS's log-saving.

## 11. Analytic continuation of the piece's Dirichlet series — ★★★★☆ (upgraded after §0b)
Paper II showed (E) ⇔ holomorphy of O_f(s) on Re s = 1 (or similar). The window is a piece of O_f; perhaps the piece
u > H^{2/3} (now understood: c_off) corresponds to the pole and the window to the remaining boundary behaviour. A
Tauberian argument (Wiener–Ikehara with a weak boundary condition) could convert a WEAK statement about O_f (e.g.
continuity of the boundary values in L¹ sense) into (W). Elegant, unlikely to be easier than the direct problem.

## Order of work (revised 11 Sep after calibration and literature round 1)
1. DONE: route 9 — pieces are O(√Y); sharp pieces O(1). Route 2 (Kloosterman fractions) is structurally blocked (LITERATURE §2).
2. Route 11 / divisor-problem view: write S_u(t) = Σ_{h≤t}(F_u(Q'(h)) − E F_u) and attack the Cesàro mean of S_u by the
   Dirichlet series G_u(s) (Hurwitz zetas of the roots); first question: does Σ_{d'} λ(d') d'^{−1−s} Σ_x [ζ(s,x/d') − ζ(s)/d'·d'^{s}…]
   continue to Re s > 1 − δ? Its analytic behaviour is governed by Σ_{d'} λ(d') d'^{−1−s} Σ_x ψ(x/d') at s = 1 (digamma of
   the roots), which is a Hooley-type sum with the smooth weight ψ instead of a sharp interval — smooth weights are where
   Bykovskiĭ/DFI methods are strongest. Promising and unexplored.
3. Route 1 (factorisation of d') test: rough vs smooth moduli split of the window numerically (scripts/window.ts can do it).
4. Route 7 (function field) as the theorem track if 2 stalls.
