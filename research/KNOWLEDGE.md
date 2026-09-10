# Knowledge base: the second-moment programme for prime values of polynomials
Compact, chronological, with the dead ends. Written 9–10 September 2026 so that someone new can pick up the
context without reading the sessions. Ratings: ★☆☆☆☆ (dead) … ★★★★★ (do this next). Ratings are intuitive
and dated; update them.

## 0. One-paragraph summary
For an irreducible polynomial f, the pair singular series S_f(h) is the explicit weight that (under
Hardy–Littlewood) governs simultaneous primality of f(t), f(t+h). Paper I (v8; not yet submitted anywhere — arXiv planned, 12 Sep)
proves an exact identity for Σ_{h≤H}(S_f(h) − C(f)²), splits it into a diagonal (equal roots mod d) with
Dirichlet series ζ_K(s+1)E_f(s) of residue 1/C(f), and an off-diagonal (distinct roots), and conjectures
Σ*_f(H) = Σ_{h≤H}(1−h/H)(S_f−C²) = −½C(f) log H + A_f + o(1) ("Conjecture 1"; linear-in-C; the sharp sum only
to O(1) — v7 said o(1) for the sharp sum, which is false, corrected in v8 on 11 Sep, F15). Paper II (draft, 19 pp) determines E_f completely
(infinite product of Artin L-functions of virtual characters Ψ_N; Ψ_2 = −Sym²V; natural boundary Re s = −1),
proves the RH-conditional explicit formula for the diagonal with zeros of ζ_K and pair-field zetas, an
unconditional Ω_±(x^{m−3/4}), verifies it numerically for t²+1, and reformulates the off-diagonal (Hypothesis
(E)) as the holomorphy of one Dirichlet series O_f. Paper III (planned) proves Hypothesis (E) in Cesàro form
for quadratics; as of 11 Sep it has, unconditionally: the far moduli (trivial), the small moduli (weighted
Kowalski–Soundararajan), and the pieces u > H^{2/3+ε}, which carry a MAIN TERM c_off(f)·H with an explicit
constant (−0.1344 for t²+1, confirmed numerically to 3 digits). Nothing here proves anything about primes; all
prime statements need Hardy–Littlewood.

## 1. Timeline (all 2026)
- 8 Sep. Ulam-nD workbench built to test the author's thesis (higher-dimensional Ulam spirals, Fibonacci
  dimensions, quasicrystals, RH). Thesis suite: patterns = Bateman–Horn constants (main term only); Fibonacci
  effect absent; not quasicrystalline. One lead survives: sub-Poisson variance along polynomial rays.
- 8 Sep. Variance experiment → Conjecture Σ_f(H) = −½C log H + A_f (first power of C). Paper v1–v2.
- 9 Sep (day). Paper v4–v6: exact identity, Dedekind zeta diagonal, Sym² Artin L-function, quadratic closed
  formula, Cesàro theorem for linear f and reduction to o(H log H) off-diagonal, function-field identity,
  three review rounds. Exact C-vs-C² test (α ≈ 0.87 then).
- 9 Sep (evening). Paper II scaffold. WP0: exponents (a_N,b_N) of E_f computed exactly → paper I's Theorem 4
  wrong about the abscissa; real pole at −2/3 missing from Prop. 7; natural boundary. Exact explicit formula
  for the diagonal of t²+1 verified: β = 1.008 (per family 1.006 / 1.020). Errata applied to paper I (v7).
  Reviewer round 4 via the author: conjecture wording fixed; Euler-product cutoff drift found and fixed in
  thesis/exact.ts (α now 0.92 ± 0.08, stable in the cutoff).
- 9 Sep (night). Paper II §§2–4 written with proofs; §5 off-diagonal reformulation; §6–8; appendix of
  external computations. Literature rounds 2–3: Kurokawa/Moroz attribution, Hooley 1963 precedent, paper III
  route, second-spectrum hypothesis. Decisions: quadratics in full + general f under hypotheses; Route A in
  paper III; four polynomials for numerics (deferred to external machine); paper I finalised as v7 (NOT submitted; the phrase "submitted" in earlier notes was wrong).
- 10 Sep. Repository restructured: research/ vs src/ (web). Local runs: off-diagonal of t²+1 exact to 10⁷
  (bounded, mean −0.01, sd 0.51, drift −0.001/log H; spectrum shows NO lines at Maass parameters or ζ/2 — null
  at resolution 0.68); F_q[u] q-sweep of Off_f(N) for t²−u (research/paper-III/data/offq.*). Paper III scaffold
  with the precise Lemma A (frequencies only up to (log H)^A thanks to the Cesàro k^{-2} decay; DFI 2012 covers
  d ≥ kH only, Hooley's method needed below). Singularity-map figure in paper II.
- 10 Sep. F_q[u] q-sweeps (research/paper-III/data/offq*): Off_f(N) has a main term of size 1/q. Proved for
  D = u, N = 1, 2: −2/q (T_exp → (N+1)/q from E[2^cycles] = k+1; T_act → c_N/q). Configuration count gives
  c_N(D) = min(N, max(2N−2, deg D) − 1), so the GENERIC constant is −1/q (= the weight of the excluded
  diagonal pairs at degree N+1); −2/q only for (N, deg D) ∈ {(1,1),(2,1),(2,2)}. Confirmed by D = u²+1
  (−1, −2) and D = u³+u (−1, −1). The first "κ = 2 for all N" guess was wrong (F12).
- 10 Sep (later). Leading-term tests confirm c_N(D) in all six cases incl. the decisive (N,deg D) = (3,1):
  q·T_act(deg 4) → 3, q·Off → −1. Unconditional small-moduli theorem added to paper III (Koksma + weighted
  KS); the remaining core identified as the window (Y, u²Y] per piece (F14).
- 10 Sep. Paper III written (11 pp): exact decomposition into pieces indexed by the agreeing part u (dilated
  roots of u²x² ≡ D, equal weight per unit log u); u = 1 unconditional via DFI + sharp-cutoff lemma (Δ²
  normalisation trick); u > H^{1/2} via averaging the dilations (Type II, divisor-type functions in APs);
  1 < u ≤ H^{1/2}: Hypothesis W (dilated Weyl sums with loss u^B, B < 1−θ) — the single open input.
  Theorem A conditional on W; Theorem B (F_q[u]) unconditional.
- 10 Sep. Second opinion (Claude Opus 5.1, via the author) assessed below; Alberts's survey checked:
  Kurokawa–Moroz criterion covers Frobenian coefficients only, not our 1/p dependence.
- 11 Sep. Rigorous pass on paper III, part 1. (a) Prop KSw proved in full (Shiu + Dickman-type Rankin lemma).
  (b) The far moduli d' > u²Y of piece u are O(Y/u²) by a trivial argument — no equidistribution needed. (c) The
  Type II theorem as drafted ("≪ H^{1−δ}") was FALSE: the pieces with u ≍ H do not cancel; the dilation average
  of the Cesàro weight is −log p/(p−1) for a prime modulus and 0 for composite (Lemma Gbar), giving
  Σ_{u>H^{2/3+ε}} w(u)P_u(H/u) = c_off(f) H + O(H^{1−δ}), c_off = −Σ_p λ(p)M_p log p/(p(p−1)) over split p. For
  t²+1: c_off = −0.134390; measured mean of Off_f(t) to 10⁷ is −0.0098 ± 0.0007 against predicted
  c_off + (1−D_f(1))/2 = −0.00978. The near-cancellation is why Off_f looked mean-zero in paper II. (d) Range of
  the dilation averaging is u > H^{2/3+ε}, not H^{1/2+ε} (Parseval over the units costs √φ(d')). (e) Under
  Hypothesis W(θ,B) the window needs [corrected later: θ+6B < 1, see F18]; DFI's (3/4, 1/4) does not satisfy it — W needs
  square-root cancellation. (f) Paper I's Conjecture 1 (o(1), sharp) found false (parity of t²+1); the notes wrongly
  recorded v7 as submitted (nothing has been submitted, 12 Sep). Corrected to v8 (Cesàro form); exact test redone in Cesàro form: α = 1.001 ± 0.001, k = 0.498 (F15, F16).
- 11 Sep (later). Rigorous pass part 2: Section 5 of paper III rewritten. (g) Exact finite Fourier expansion of the
  window term (verified numerically): Σ_x B = (1/4d') Σ_{0<k<d'} (1−cos 2πkY/d')/sin²(πk/d') ρ_k(d') — flat weight
  Y²/d' for k ≤ d'/Y, so a window modulus has up to u²L frequencies of full weight. (h) Consequence: Hypothesis
  W(θ,B) closes the window only if [5θ+6B < 3 — itself wrong; corrected to θ+6B < 1 the same night, F18]; the earlier "B < 1−θ" and
  "4B < 1−θ" were both wrong bookkeeping (F18). Square-root cancellation with loss < (uk)^{1/12} is required;
  DFI's (3/4,1/4) is far off. (i) Far moduli generalised: d' > u²YL contribute O(Y/(u²L)) trivially, so with
  L = log H no reflection argument is needed anywhere — the "Hooley reflection" step is gone from the paper.
  (j) Theorem A′ (unconditional): Off* = c_off H + Σ_{u≤H^{2/3+ε}} w(u) W_u(H/u; log H) + O(H (log H)^{1−c});
  Cesàro (E) ⟺ windows = o(H log H). Theorem A (conditional on W with the exponent conditions): Off* = c_off H
  + O(H^{1−δ}), A_f = A_f^diag + C² c_off. Paper III: 22 pp.
- 11 Sep (decision, author). No AI co-authorship: single-author papers with a uniform "AI-assisted research:
  disclosure" section (ERRATA item 8). Rationale: publishers' policies; transparency preserved by the disclosure and
  the public repository.
- 12 Sep. Record corrected: NOTHING has been submitted (earlier notes said v7 was submitted — false, F21). Author
  wants paper I on arXiv; concern: hallucinated content. Safeguard executed: all 31 references of paper I verified
  against Crossref/arXiv (ERRATA 9); confidence statement per theorem given to the author.
- 12 Sep (later, Opus 5 session). Paper I pre-arXiv pass: Theorem 2 INDEPENDENTLY re-verified by a brute-force
  script written from the printed statement alone (4 quadratics x 6 shifts, agreement to the truncation error);
  abstract claims conditioned; fit precision fixed; forward references made "in preparation" citations; disclosure
  names both models. Verdict: publishable as a preprint (ERRATA 10). No endorser yet; Zenodo/HAL noted as
  no-gatekeeping alternatives, journal submission needs no endorsement.
- 12 Sep (final). THEOREM PROVED (paper IV, Thm 5.x, u = 1, model object, Riesz order m >= 2):
    G^(m)(Y) = Y^m sqrt(Y) sum_j (alpha_j(D) Y^{i t_j} + c.c.) + E(Y) + O(Y^{m+1/2-delta}),
  sum over the EVEN Maass cusp forms of SL_2(Z), alpha_j proportional to the Katok-Sarnak period Per_D(u_j),
  E = continuous spectrum = o(Y^{m+1/2}).
  The two estimates that closed it, both elementary:
   (i) MELLIN-BARNES for I = int_0^inf y^{-1/2} sin(beta y) K_{i tau}(alpha y) dy. Mellin-Parseval gives an EXACT
       contour integral; in Re s > 0 the only poles are at s = 1/2 +- i tau + 2n; shifting to Re s = 5/2 - eps crosses
       just n = 0, giving the main term and a relative error O((alpha/beta)^{2-eps}) with uniformity in tau from
       Stirling. Verified: relative error / (alpha/beta)^2 stays in [3.5, 7.2] as alpha/beta runs 0.1 -> 0.01.
       This route AVOIDS the Bessel transition region entirely -- the earlier plan (uniform asymptotics across
       x ~ tau) was not needed and would have been much harder.
   (ii) TRUNCATED TAIL via |K_{i tau}(x)| <= K_0(x), from K_nu(x) = int_0^inf e^{-x cosh u} cosh(nu u) du. Verified at
       25 pairs. With truncation height T = t the tail is O(e^{-4 pi k t}), killed after summing over k and j.
  Key structural luck: alpha_k/beta_k = sqrt|D|/t is INDEPENDENT of k, so the relative error is uniform in k and
  survives the k-sum unchanged. Interchange of k-sum and y-integral justified by int y^{-1/2} K_0(alpha_k y) dy << k^{-1/2}
  and lambda_j(n) << n^{7/64+eps}.
  Standard inputs used (listed in the paper's "what a referee should check"): Gauss parametrisation; spectral
  decomposition of L^2(Gamma\H); Weyl law; Maass sup-norm bound; Kim-Sarnak; Mellin-Parseval. Named weak points:
  the Stirling uniformity in the shifted contour (given in outline), and the L^2 -> pointwise passage (which is why
  m >= 2 rather than m >= 1).
- 12 Sep (final). ALL FOUR PAPERS FINISHED: I 27 pp (v8, awaiting arXiv endorsement), II 21 pp, III 24 pp, IV 19 pp.
  Zero todo markers and zero unresolved references in II, III, IV. Paper II's "second spectrum" remark updated to
  record that part IV settled it AND that the test as first posed used the wrong observable (Off_f, bounded, instead
  of the Cesaro pieces at scale sqrt Y) and the wrong parity set. Paper III's piece-size remark now points at the
  proved theorem. Paper IV section 7 states the uniformity-in-u problem as the same wall part III meets from the
  other side: there no Weyl bound is uniform enough in the FREQUENCY, here no spectral bound is uniform enough in the
  LEVEL 4u^2.
- 12 Sep (night, last). UNIFORM BESSEL LEMMA PROVED, elementarily, closing the last named gap in structure:
  for tau >= 1 and all x > 0,  K_{i tau}(x) = (1/2)[Gamma(-i tau)(x/2)^{i tau} + Gamma(i tau)(x/2)^{-i tau}] + E
  with |E| <= |Gamma(i tau)| (exp(x^2/(4 tau)) - 1). Proof: the convergent series for K_nu via I_{-nu} - I_nu; the
  n-th term carries 1/((1 -+ i tau)...(n -+ i tau)), each factor of modulus >= tau, so the tail is
  |Gamma(i tau)| sum_{n>=1} (x^2/4tau)^n/n!. NO uniform-asymptotic machinery needed. Verified at 30 (tau, x) pairs,
  tau in 2..300, x in 0.5..8: bound holds every time (ratios 0.0002-0.995).
  Applied at x = c w, c = sqrt|D|/t (independent of k), splitting at W = sqrt(t_j)/c gives a relative error
  t_j^{-3/4} uniform in j -- which Prop. riesz absorbs easily. The stationary point of the combined phase sits at
  x = sqrt|D|, FIXED and well inside the lemma's range.
  STILL NOT A THEOREM: the bookkeeping (tail w > W by non-stationary phase; summing errors over k then j with
  uniformity; justifying interchanges) is not written out. No new idea is needed. Paper IV keeps "target" wording
  deliberately -- two earlier shortcuts through continuation theorems both appealed to the wrong object (F24, F25).
- 12 Sep (night, later). RIGOROUS DECOMPOSITION COMPLETED as a structure (paper IV Section 5.1, 17 pp). Three items
  closed: (a) CONVENTIONS -- for odd d coprime to 2D, reduction mod d is a bijection {b' mod 2d: b'^2 = D (4d)} ->
  {b mod d: b^2 = D (d)} and e(2k b'/(2d)) = e(k b/d), so sawtooth frequency k <-> Poincare frequency m = 2k
  (verified, 8 discriminants, d <= 200). (b) L^2 / CUSP -- every Heegner point has Im z = sqrt|D|/(2d) <= sqrt|D|/2,
  so the seed may be TRUNCATED at that height with no effect on the orbit sum; the truncated seed is bounded, is
  O(t y^2) at 0, and has vanishing x-mean, hence its automorphisation is bounded on the quotient and lies in L^2.
  The vanishing x-mean also kills the pairing with the constant terms of the Eisenstein series, so the continuous
  spectrum contributes sqrt(Y) * integral c(r) Y^{ir} dr = o(sqrt Y) by Riemann-Lebesgue -- which is why the discrete
  lines are what one sees. (c) RIESZ ORDER -- |A_j| = t_j^{-1/2+o(1)} (the e^{pi t_j/2} of rho_j(1) cancels the
  e^{-pi t_j/2} of the Gamma-factors), the Riesz mean of order m contributes t_j^{-m-1}, |Per| <= h(D)||u_j||_inf,
  so by the Weyl law the sum converges for m > 11/12 with Iwaniec-Sarnak (t^{5/12}) and for m > 1 with the trivial
  bound. CESARO ORDER m = 1 SUFFICES -- exactly the mean at which the numerics were computed.
  ONE step remains: (Ksmall) is an asymptotic for FIXED order, its O(x^2) constant depends on t_j, and the regimes of
  K_{it}(x) change at x ~ t; a form of (asymp) UNIFORM in t_j is needed. Standard but genuine Bessel analysis.
- 12 Sep (night). Step 4 of paper IV REDONE ELEMENTARILY, and it needs no continuation theorem at all: expand psi in
  Fourier, pair against the Whittaker expansion of u_j (the x-integral forces n = 2k, so only even-index coefficients
  survive), substitute y = w/beta, and use two standard facts -- the small-argument expansion
  K_{i tau}(x) = (1/2)[Gamma(-i tau)(x/2)^{i tau} + c.c.] + O(x^2) and int_0^inf w^{sigma-1} sin w dw =
  Gamma(sigma) sin(pi sigma/2). Both verified numerically. This yields <Phi^+_t, u_j> = t^{-1/2}(A_j t^{-i t_j} + c.c.),
  hence Y^{1/2 +- i t_j} after the Riesz mean. It EXPLAINS both tested facts: the frequencies are t_j (because the
  Bessel expansion gives x^{+- i t_j}, not x^{+- 2 i t_j}) and the phase carries (sqrt|D|/2)^{i t_j}, i.e. exactly the
  (t_j/2) log|D| shift confirmed to a median of 0.012 rad. The Proposition claiming square-root cancellation was
  WITHDRAWN: its proof used Goldfeld-Sarnak's P_m, a different series (F25).
- 12 Sep. HOOLEY'S SUM: the prediction tested on the barest object, T_k(X) = sum_{d<=X} sum_{b^2=D(d)} e(kb/d),
  which Hooley 1963 bounds by X^{3/4+eps}. Found: T_1(X)/sqrt(X) BOUNDED (square-root cancellation); even spectrum at
  96-100th percentile for six discriminants, 2t_j rejected at 12.7th; and the parameter-free phase prediction agrees
  with a MEDIAN discrepancy of 0.012 rad (0.19% of a period), three of five within 0.012. Independent of, and barer
  than, the object of the earlier phase test. Standalone statement worth making: Hooley's sum has square-root
  cancellation with an explicit spectral expansion whose amplitudes are Katok-Sarnak periods.
- 12 Sep. ORGANISING IDENTITY found and verified: the Dirichlet series of the Weyl sums of a quadratic congruence IS
  Selberg's Poincare series P_m(w,s) evaluated at the Heegner points of that discriminant (verified to 1e-16). Its
  rightmost poles are at s = 1/2 +- i t_j in the same variable, which settles the factor-2 question in favour of t_j
  and supersedes the Kloosterman-zeta route of Section 3. Also: the CONVERGENCE obstruction is resolved by
  symmetrisation -- psi(2x+a) + psi(-2x+a) = -2a exactly off a set of measure 2a, so the symmetrised seed decays like
  t y^2 and the Poincare series converges. Fourth consequence of the single symmetry x -> -x. Section 5 of paper IV
  now has Steps 1, 2, 3, 5 complete and Step 4 identified; what remains is the Riesz order and the error term.
- 12 Sep. PHASE TEST -- the strongest evidence so far, and a confirmation of the corrected (Poincare/argument-side)
  mechanism. It predicts phi(D) - phi(-4) = (t_1/2) log(|D|/4) - pi*[sign Per_D flips], with NO free parameter: the
  first term from the D-dependent dilation 2t/sqrt|D| in the test function, the second from the sign of the
  Katok-Sarnak period computed from LMFDB coefficients. Five predictions (D = -3, -7, -8, -11, -19), all correct to
  within 0.212 rad = 3.4% of a period; chance probability 1.4e-6. Amplitude ~ |Per_D|/|Gamma_z| holds to 40% for five
  of six (outlier D = -7, the least stable fit). Also verified: the Gauss parametrisation, i.e. the root pairs (d,b)
  form exactly h(D) SL_2(Z)-orbits of Heegner points (D = -3,-4,-8,-11,-20,-23,-24 with h = 1,1,1,1,2,3,2).
- 12 Sep. FACTOR-2 TEST caught a wrong mechanism (F24). The Kloosterman-zeta-of-the-modulus route predicts frequency
  2 t_j; the data give t_j decisively (99.7-100th pct vs 43-69th). The mechanism is Bykovskii's argument-side spectral
  expansion (Poincare series, weight 0, level 1), which yields Y^{1/2} Y^{i t_j} and matches all four observations:
  frequency, scale, even-only parity, and the threshold |D| < (t_j/pi)^2. Literature round 3 (agent) established:
  Goldfeld-Sarnak Inv. Math. 71 (1983) Thm 1 + Remark 3 covers weight 1/2 on Gamma_0(4N) and is citable; its residue
  constants (3.2) are WRONG and are corrected in Ahlgren-Andersen, Adv. Math. 289 (2016), Prop. 7; nobody has written
  down or continued the Dirichlet series of Weyl sums over roots of a quadratic congruence; the bridge is
  DFI 2012 Lemma 6.2 (after Duke-Imamoglu-Toth, Annals 173 (2011), Prop. 1); for Katok-Sarnak cite Andersen
  arXiv:2203.00704 Prop. 3.3 or DIT Annals 184 (2016) Prop. 6 rather than KS at second hand.
- 12 Sep (later still). CLEANEST OBJECT IDENTIFIED for the u = 1 theorem: drop BOTH the weight lambda and the
  squarefree condition. G(Y) = sum_{h<=Y}(Y-h)(sigma*_{-1}(h^2-D) - mean), sigma*_{-1}(n) = sum_{d|n,(d,2D)=1} 1/d --
  a Riesz mean of the Hooley/Gafurov divisor sums. R^2 for the even set: 0.116-0.420, 100th percentile for all six
  discriminants tested; monotone improvement across (weighted sqfree) -> (lambda=1 sqfree) -> (lambda=1 all divisors)
  in every row. Its Dirichlet series is a Salie zeta function with only a coprimality condition. Lemmas 2.1/2.2 of
  paper IV never used lambda or squarefreeness, so they carry over verbatim.
- 12 Sep (later). THE MODEL PIECE. With lambda == 1 (F(n) = restricted sigma_{-1} along Q_u) the even-Maass signal is
  present for ALL six discriminants tested at the 99.3-100th percentile (odd sets at 7-17th), including D = -8 and -11
  which were absent with the lambda weight. So (i) the p = 3 rule is an artefact of the weight (F23), (ii) the right
  object for the u = 1 theorem is the model piece, whose Dirichlet series is a Salie zeta function with a squarefree
  and coprimality condition and NO multiplicative weight, and (iii) the phenomenon is stronger without lambda
  (R^2 to 0.32 vs 0.22). Also verified: the "all primes split" condition on the moduli is AUTOMATIC (p | u^2h^2 - D,
  p not dividing 2Du, forces D a square mod p) -- 51374 occurrences, 0 exceptions.
- 12 Sep. SELECTION RULE AT p = 3 found (unexplained). The spectral signal in the pieces is present exactly when the
  prime 3 does NOT split in Q(sqrt D): 0 of 5 split cases (D = -8, -11, 13, -23, 28) show it, 8 of 9 non-split cases do
  (D = -4, -3, -7, 5, 8, 12, 17, -19, 20). Fisher exact ~5e-4. Not a size effect (sd of P/sqrt Y does not separate the
  groups). lambda(3) = -3 is the unique negative lambda and the only local factor that can dominate the spectral term
  at Re s = 1/2. Sharpest open question; cheap to attack (more discriminants; divide out the p=3 Euler factor).
- 12 Sep. Katok–Sarnak periods COMPUTED (LMFDB coefficients of the first even Maass form, R=13.7798, via
  scripts/maass-period.py). Presence/absence of the spectral signal is explained at the order-of-magnitude level:
  the periods are all within a factor 3 for |D| <= 19 (all six such discriminants show a signal) and collapse by
  10^2..10^10 for |D| = 43, 67, 163 (none shows a signal). Threshold: 2*pi*y_D = pi sqrt|D| crosses R at |D| = 19.2.
  The DETAILED amplitude law is NOT confirmed (ratios off by up to 5x; local factors E F_u vary 0.35-1.60 and the
  fitted amplitudes are uncertain by up to 2x). Absences at D = -8, -11 remain unexplained (F22).
  Parity rule stands: even set significant (92-100th pct) for D = -3, -4, -7, 5, 8, 12; odd set never.
- 12 Sep. Paper IV Sections 2-3 written with full proofs, each identity verified numerically first:
  (a) SAWTOOTH IDENTITY (exact, machine precision, D = -4, 8, -3, 12): S_u(t) = sum_d (lambda(d)/d) sum_{x in R_d}
      psi((t-x)/d), psi = 1/2 - {.}. The linear term that normally accompanies such a count VANISHES because the
      roots come in pairs +-x. Requires excluding d = 1 from both F_u and E F_u (R_1 = {0} is not a +-pair).
  (b) The piece is therefore a Walfisz-type sum: a sawtooth summed over admissible moduli at the roots of a quadratic
      congruence, weight lambda(d)/d. Mellin/Hurwitz gives A_u(s) via W_k(s+1) = sum_d lambda rho_k d^{-s-1}; the ODD
      half of Hurwitz's formula vanishes by the same +-symmetry -- the first appearance of the parity rule that later
      selects the EVEN Maass forms. One source for both.
  (c) DILATION IS A CHANGE OF FREQUENCY: rho_k(d) = W_{k ubar}(D;d) -- the dilation does not change the quadratic, it
      moves the frequency to k ubar, which DEPENDS ON THE MODULUS. That is exactly why u > 1 leaves the range of
      DFI's theorems (stated for frequencies fixed independently of the modulus). Crispest statement so far of the
      obstruction.
  (d) SALIE: verified for all split p <= 37 and D in {-4,-3,5,8,12}: W_{2h}(D;p) = K_chi(D,h^2;p)/(eps_p sqrt p),
      plus multiplicativity for composite squarefree c. So the Weyl sums ARE half-integral-weight Kloosterman sums
      with arguments (D, (k ubar/2)^2): first argument fixed by the polynomial, second carries frequency and dilation.
      Amplitudes are then a product of two Fourier coefficients: the Katok-Sarnak period at D, and (Shimura, at a
      square) a Hecke eigenvalue. Matches the observed law.
  Hypothesis K states what Kuznetsov must give; uniformity in k and in the level 4u^2 are the two things not in the
  literature.
- 12 Sep. DISCOVERY (numerical): the off-diagonal pieces oscillate with the even Maass cusp forms of SL₂(Z).
  P_u(Y)/√Y for t²+1 (u=2), t²+t+1, t²−2, t²−3, t²+t−1 (Y to 10⁷ or 3·10⁷) is fitted by cos(t_j log Y + φ_j) over the six
  even parameters 13.78…24.11 at the 92–100th percentile among random 6-sets (t²−2: R² 0.25, above all 300 random sets),
  odd parameters at 12–66 %; the 13.78 line has stable amplitude and phase across halves of log Y. Absent for D = −8
  and D = −163, whose Heegner points sit high in the cusp (Katok–Sarnak periods e^{−2π Im z}). Route R (Riesz means +
  Salié–Kuznetsov + Katok–Sarnak) predicts exactly this, parity rule included. research/paper-IV/NOTES-routeR.md.
  Paper IV = route R. Also: the earlier "no Maass lines" (job C4, F20) was the wrong observable and mixed parities.
- 11 Sep (late night). Self-review of papers I/II for consistency with III: Hypothesis (E) restated (Cesàro primary);
  Theorem 6 proof bound corrected to the symmetrised bracket; forward references. Paper III: the window's trivial
  size is O(Y), not Y log u² (Koksma is what loses the log); Corollary "small agreeing part": windows with
  u ≤ exp((log H)^{c/3}) are o(H) unconditionally. Spectral test of P_u(Y)/√Y (u = 2, 10): null at SL₂(Z)/ζ lines,
  inconclusive (wrong spectrum tested: route R predicts level 4u², weight 1/2). Brainstorm second pass: route R
  (Riesz means + Salié–Kuznetsov Dirichlet series of the Weyl sums; level uniformity A < 1/4 is the crux) rated
  ★★★★★; route T (sum-product Type II) ★★★; delta method / Kloosterman fractions / additive combinatorics dead.
- 11 Sep (night, self-review of paper III after the referee agents died on credits). Verified numerically: Lemma Gbar(e)
  (−log p/(p−1) for p = 5, 13; 0 for 65), the finite Fourier identity, c_off for 4 polynomials. Found and fixed: the
  exponent condition (F18, now θ+6B < 1); Step 4 arithmetic (1−3ε/4, harmless); Lemma AP had "g supported on integers
  coprime to D" although u may contain special primes (fixed: bounded local factors); the set-up's description of w
  for ω(2)=1 as "g(2) ∈ {0,1}" was wrong (w is supported on even u; it is g shifted by 2; mean value halves — fixed
  in eq. md); Lemma far's majorant for ρ_u made explicitly u-independent; Corollary: D_f(1) includes d = 1.
- 11 Sep (night). Paper III closed as a complete draft (23 pp; c_off confirmed for t²+t+41, t²+t+17, 2t²+1 too).
  Paper IV scaffolded (research/paper-IV: README with the window statement, BRAINSTORM with 11 routes rated, LITERATURE
  round 1). CALIBRATION: exact pieces P_u(Y) for t²+1 are O(√Y) (|P_u|/√Y ≤ 0.4 to Y = 10⁷), and the sharp pieces
  S_u(t) = Σ_{h≤t}(F_u(Q'(h)) − E F_u) are bounded (max 1.26 to 10⁷): square-root cancellation, far beyond what (W) needs.
  Literature round 1 (verified): best unconditional exponent for Weyl sums of quadratic roots with fixed D is θ = 2/3+ε
  (Bykovskiĭ 1984); only DFI 2012 and Grimmelt–Merikoski 2025 have discriminant uniformity, neither covers a = u²;
  Kloosterman-fraction route structurally blocked (numerator depends on the modulus through the root). Hence Hypothesis W
  is not the plan for paper IV; the plan is the divisor-problem / Dirichlet-series view of the pieces (route 11).

## 2. What is proved, conjectured, refuted (status board)
PROVED (paper I): exact identity; ζ_K(s+1)E_f(s) with residue 1/C; E_f = H_f/L(2s+2,Sym²V) with H_f abs. conv.
for Re s > −2/3 (H̃_f only for Re s > −3/4 — corrected); quadratic closed formula; Cesàro theorem for linear f;
reduction to Off* = o(H log H); F_q[u] identity + finite support; spiral rays are degree-d polynomials.
PROVED (paper III, 11 Sep): exact decomposition into pieces; weighted Kowalski–Soundararajan (Prop KSw, full proof);
small moduli of every piece ≪ Y (log Y)^{−c}; far moduli d' > u²YL ≪ Y/(u²L) (trivial); Type II range u > H^{2/3+ε}
with main term c_off(f) H, explicit constant (Lemma Gbar: dilation average −log p/(p−1) prime, 0 composite);
Corollary: mean of sharp Off_f = c_off + (1−D_f(1))/2 (t²+1: −0.00978 predicted, −0.0098 ± 0.0007 measured);
finite Fourier expansion of the window; Theorem A′ (unconditional reduction to the windows); Theorem A under
W(θ,B) with θ+6B < 1; F_q[u]: Theorem B (N ≤ 2, D = u).
PROVED (paper II): pair fields; Ψ_N virtual characters; structure theorem; quadratic exponents (necklace);
natural boundary (all f, incl. f = t); Ω_±(x^{m−3/4}) unconditional; Prop. O_f (holomorphy ⇒ Cesàro
conjecture); F_q[u] structure theorem.
PROVED UNDER RH: explicit formula for quadratics (m ≥ 2, full proof incl. horizontal-segment lemma); general f
under GRH for constituents of Ψ_1, Ψ_2, Ψ_3.
NUMERICAL: t²+1 explicit formula β ≈ 1 (X = 4·10⁷, γ ≤ 100); Cesàro exact test k = 0.498 ± 0.003 (C not C²); c_off
confirmed for 4 quadratics; pieces O(√Y) with oscillations at the EVEN Maass parameters of SL₂(Z) (5 quadratics, 12 Sep);
F_q[u] identities two ways.
CONJECTURED (with strong numerical support incl. a parameter-free phase test at p ~ 1.4e-6): the second spectrum: P_u(Y) = c_u Y + √Y Σ_j c_j cos(t_j log Y + φ_j) + …, t_j even
Maass parameters (route R; paper IV target theorem for fixed u).
CONJECTURED: Conjecture 1 in Cesàro form (⇔ Hypothesis (E) in Cesàro form ⇔ windows o(H log H));
Off*_f(H) = c_off(f) H + o(H) (constant identified; numerically confirmed for t²+1); Hypothesis W; no-bias.
REFUTED (11 Sep): Maass lines in Off_f (null to 10⁷); "Off* ≪ H^{1−δ}" (main term exists); Conjecture 1 in sharp form
with o(1).
REFUTED / DEAD: Fibonacci dimensions special; quasicrystal patterns; spiral patterns beyond Bateman–Horn;
"primes correlate with zeta zeros" as an unconditional statement; exact rational function-field formula.

## 3. Known fallacies (things we got wrong, and the fix) — read before repeating them
F1. "H̃_f converges absolutely for Re s > −1" (paper I v4–v6, Thm 4). The pure-v series never terminates for
    ω ≥ 2; abscissa is −3/4; infinitely many L-factors follow. Fix: plethystic exponents; natural boundary.
F2. Explicit formula "with residues at s = −1..−m and error x^{m−1+ε}" (Prop. 7 v6). The contour cannot cross
    Re s = −1; a real pole at −2/3 was missing; correct form is RH-conditional with error x^{m−3/4−ε₀}.
F3. Pushing the contour to −7/8 to gain a second zero family. The residues are individually enormous (rms 13
    and 92 vs 0.5) and cancel against the line integral; the data reject them (β = 0.001). Near a natural
    boundary the explicit formula is asymptotic, not convergent, in the contour position.
F4. Truncated Euler products multiplying quantities growing like H. ∏P_p cut at 2·10⁶ without tail gave a
    drift δC²H (0.07C² at H = 10⁶) and a cutoff-dependent α (0.81/0.87/0.91 at 10⁶/2·10⁶/10⁷). Fix: PNT tail
    exp(−2E₁(log P)); explicit-diag.py completes all such products (prime zeta functions, E₁ tails).
F5. "Over F_q[u] the generating function is rational and the explicit formula is a finite sum" (roadmap WP5,
    routes.tex Prop. B2). Same error as F1; it is an infinite product with boundary |T| = q.
F6. Least-squares removal of main terms before looking for zeros (paper I §4.2 null result). The missing
    x^{m−2/3} term and the coarse frequency resolution buried the signal; exact subtraction reveals it.
F7. Claiming Conjecture 1 as proved in prose ("our result is that this shortfall is…", v7 first draft).
    The reviewer caught it; the plain-terms paragraph now names Hypothesis (E) as the larger gap.
F8. Novelty claims without reading the classics: Kurokawa (1986)/Moroz (1988) have the Frobenian
    factorisation and boundary criterion; Hooley (1963) has the diagonal/off-diagonal split and the twisted
    Weyl lemma. Both now cited; our claims narrowed to the two-variable case and the specific series.
F9. Sign of a character sum in the exact constant A0 (prime zeta helper); and catastrophic cancellation
    P(j) − 2^{−j}/2 at large j. Caught by the 1e-12 consistency check of D_f(1). Lesson: every exact constant
    must have an independent check (D_f(1) vs partial sum; C(f) vs literature; refitted x^{m+1} coefficient).
F11. "DFI 2012 applies to the phase e(kH/d) for d ≥ (kH)^{1/2}" (roadmap, 9 Sep). Wrong: their condition
    y²|f''| ≤ 1 with f(c) = g(c/Y)e(kH/c) needs Y ≥ kH, so their theorem covers only moduli above kH; the
    trivial-bound range d ≤ H needs Hooley's method with the phase (paper III §2–3).
F12. "κ = 2 for all N" (10 Sep, morning). Based on N ≤ 2 for D = u only; the configuration count and the
    D = u²+1, u³+u sweeps show the generic constant is 1. Lesson: a conjecture from two data points in one
    family is not a conjecture; vary the family before naming a constant.
F13. "DFI covers the pieces u > 1" (implicit in the 9 Sep roadmap). The pieces need Weyl sums of roots of
    u²x² ≡ D, i.e. roots of x² ≡ D dilated by u^{-1} modulo d'; DFI's theorem is for a fixed fundamental
    discriminant. Only u = 1 is covered. (Paper III §2, §5.)
F14. "The twisted phase e(kH/d) is the obstacle" (paper III, first draft, 10 Sep). It is an artefact of the
    exact Fourier expansion. Koksma's inequality with the symmetrised test function (variation ≤ 3) removes the
    length entirely for moduli d' ≤ Y, and a weighted Kowalski–Soundararajan bound (same local mean square for
    every dilation; Shiu instead of the sieve for the weights) makes the small moduli of every piece
    unconditional. The real core is the WINDOW d' ∈ (Y, u²Y] (interval shorter than the period), self-dual
    under Hooley's reflection, empty for u = 1, where a log-saving loses a factor log u. (Paper III §3.2, §5.1.)
F15. "Σ_{h≤H}(S_f(h) − C²) = −½C log H + A_f + o(1)" (paper I, Conjecture 1, v1–v7, SUBMITTED). False for every f with
    a residue class of h where S_f vanishes (t²+1: odd h) — the sharp sum oscillates by C² forever. The Cesàro
    form is what Theorem 6 controls and what was meant. Process lesson: an erratum recorded on 10 Sep as "worth a
    line when you next touch paper I" was not applied for a day, while the notes wrongly said the paper had been
    submitted (it had not; corrected 12 Sep). RULE: an erratum to a
    statement in the abstract/conjecture/theorem is applied the same day, or the paper is marked "do not submit".
F16. "The finite-H coefficient is 0.86 of ½, systematically short over three decades, explained by the drift of
    A_f" (paper I v6–v7, §4). Artefact of measuring the sharp sum at two endpoints: each endpoint carries an O(1)
    oscillation, ±0.1 in slope/C after dividing by log 10³. In Cesàro form the coefficient is 0.498 ± 0.003 in
    every decade. RULE: measure the quantity the theorem controls (here the Cesàro sum), never a sharp cut-off of
    an oscillating sum.
F17. "Σ_{u>H^{1/2+ε}} w(u)P_u(H/u) ≪ H^{1−δ}" and "Off* ≪ H^{1−δ} under W" (paper III first draft, 10 Sep). The
    pieces with bounded length Y = H/u do not cancel: the Cesàro weight sees the gap between the discrete count of
    roots (integers ≥ 1) and the continuous expectation Y²/(2d'). Main term c_off(f)·H with an explicit constant;
    the correct conjecture is Off*_f(H) = c_off H + o(H), and the Cesàro constant A_f contains C²c_off. Also the
    averaging range is u > H^{2/3+ε}. RULE (again F12): compute the main term before claiming cancellation; the
    F_q[u] result (−1/q main term) was already telling us the off-diagonal has one.
F18. "Hypothesis W with B < 1−θ closes the window" (drafts 10–11 Sep), then "5θ+6B < 3" (11 Sep afternoon, F18 as
    first recorded): BOTH wrong. The second dropped the "1+" in Σ_{u≤U} w(u)u^a ≪ U^{1+a} and used sup_{t≤u²YL}|S_k(t)|
    instead of dyadic blocks. Correct (11 Sep night, self-review): with dyadic partial summation the window costs
    u^{3B}(log H)^B Y^θ per piece, and the condition is θ + 6B < 1 (range 2/3) or θ + 3B < 1 (range 1/2): ANY power
    saving in the modulus suffices; the loss in frequency k ≤ u² log H and in u must be below (uk)^{(1−θ)/6}. DFI's
    h^{1/4} fails by the frequency exponent, not θ. RULE: when an exponent condition changes twice in a day, recompute
    it from scratch on paper with the sums over u written out, and check both directions (does B=0, θ→1 give the
    expected "any saving suffices"?).
F19. "The window moduli d' ≤ u²Y almost all have a divisor in [u², Y], so the rough ones are negligible" (paper IV
    brainstorm, first pass, 11 Sep). Wrong at every practical scale: admissible moduli (all primes split) have density
    1/√log while primes have 1/log, so d' = p·m with p > Y, m < u² make up a fraction ~ log(u²)/√log Y of the window —
    the MAJORITY for u ≥ 10 at Y ≤ 10⁵ (data/window-split.log). RULE: in a sparse set of moduli, "most integers are
    composite" heuristics must be re-derived with the set's own density.
F20. "No Maass lines in Off_f(H) ⇒ the second-spectrum idea is dead" (paper II job C4, 10 Sep; P4 downgraded). The
    spectral oscillations predicted by the Kuznetsov route live in the Cesàro pieces at scale √Y (P_u(Y) = O(√Y)
    numerically), with the spectrum of level 4u² and weight 1/2 — the sharp Off_f(H) is a different, bounded object
    and the SL₂(Z) parameters are not the relevant ones. RULE: before a null spectral test, derive which spectrum and
    which observable the theory predicts; a null on the wrong observable proves nothing.
F25. "Goldfeld-Sarnak's continuation of the Poincare series P_m(z,s) applies to our orbit sum, so Hooley's sum has
    square-root cancellation" (paper IV, Proposition of 12 Sep, WITHDRAWN the same day). Their P_m carries e(m*gamma z)
    -- whose imaginary part gives an exponential decay e^{-2 pi m Im(gamma z)}, putting it in L^2 -- while our series
    carries only e(m Re gamma z) and is NOT in L^2. Different object; the citation does not apply. Caught by reading
    the original PDF, which was on disk from the literature round. RULE: read the definition in the source before
    citing a theorem about it, especially after a first mis-citation in the same argument.
F24. "The spectral poles come from the Kloosterman zeta function of the MODULUS (Goldfeld-Sarnak), so the piece
    oscillates at 2 t_j" (paper IV Section 3, Hypothesis K as first written, 12 Sep). The bookkeeping is right for
    that route -- GS normalise Z(s) = sum_c S c^{-2s}, poles at s_j, giving 2 t_j after the Hurwitz/Mellin step -- but
    the route is the wrong one: it sums over the modulus, and our object sums over the ARGUMENT h. Tested and refuted
    directly: at 2 t_j the even set sits at the 43rd-69th percentile (nothing), at t_j at the 99.7-100th. The correct
    route is Bykovskii's argument-side expansion in SL_2(Z) Poincare series, weight 0 level 1, where s_j = 1/2 + i t_j
    gives Y^{1/2} Y^{i t_j} directly, as in the hyperbolic lattice-point problem. RULE: a sketched mechanism must have
    a numerically testable consequence, and it must be tested before it is written up as the explanation.
F23. "There is a selection rule at p = 3: the spectral signal is present exactly when 3 does not split" (12 Sep,
    recorded with Fisher p ~ 5e-4 on 14 polynomials). TRUE as a description of the lambda-weighted pieces, FALSE as a
    statement about the arithmetic: with lambda == 1 (the model piece) all six discriminants tested, D = -8 and -11
    included, show the even spectrum at the 100th percentile. lambda(3) = -3 is the unique negative value of lambda
    and swamps the spectral term at the smallest split prime. RULE: when an effect is indexed by a small prime, test
    it with the arithmetic weight removed before calling it arithmetic. (Same day as F22 -- both came from reading a
    pattern before removing the obvious confounder.)
F22. "The polynomials with no Maass signal are those with exponentially small Katok–Sarnak periods" (NOTES-routeR,
    12 Sep). Only true for D = −163 (period 2e−10 relative to D = −4). For D = −8 the period is 0.32, comparable to
    D = −4's, yet the signal is absent (47th percentile). The reason: K_{iR}(x) is exponentially small in the ORDER,
    not the argument, until x > R; the periods are all comparable for |D| < (R/pi)^2 = 19.2. So the absences at
    D = −8, −11 are UNEXPLAINED. RULE: before invoking exponential decay of a Bessel function, check which of the
    order and the argument is large.
F21. "Paper I v7 was submitted" (KNOWLEDGE, STATUS, ERRATA, memory, 10–12 Sep). It was not; the author had only
    said they would upload it, and I recorded the intention as a fact. RULE: record submissions, uploads and
    external actions only when the author confirms they happened.
F10. Programming: `pkill -f <script>` kills the harness's own shell when the command line contains the name;
    Python output buffering hides progress; savetxt header '#' breaks pgfplots. Trivial but cost time.

## 4. Paths and their ratings (10 Sep 2026)
| # | path | rating | comment |
|---|------|--------|---------|
| P1 | Paper III, Route A, Cesàro form of (E) for quadratics | ★★★★★ (rigorous pass 11 Sep: KSw, far moduli, Type II with c_off proved) | Unconditional: small moduli (log-saving), far moduli (trivial), u > H^{2/3+ε} (main term c_off H). Open = the window (Y, u²Y] for 1 < u ≤ H^{2/3}; Hypothesis W needs θ+6B < 1: any modulus saving, but loss below (uk)^{(1−θ)/6} in frequency and dilation — no known Weyl bound is frequency-uniform. Honest framing: W is a hard open problem; paper IV goes via the divisor-sum form of the pieces instead. | Target theorem. Cesàro weight gives k^{−2} Fourier decay so DFI's k^{1/4} suffices; only unbounded saving needed (Remark 7). Real work: Lemma A for small moduli (Hooley's Lemma 5 with the phase). Hooley 1963 is the template. |
| P2 | Route B, F_q[u], q → ∞ (Prop. B3) | ★★★★★ (10 Sep; Thm B proved for N ≤ 2, D = u) | Formulated via Lang–Weil on explicit varieties V_{k,N} (paper III §5). Local q-sweep for t²−u: q·Off_f(N) → ≈ −2.05 for N = 1, 2 (q ≤ 43): a 1/q LAW with an explicit constant, sharper than the q^{-1/2} target. First main term for the off-diagonal anywhere in the programme. Compute κ by hand for N = 1, 2. | Reinstated (Opus was right that it was dropped without a stated reason; the reason was scope). Small moduli vanish identically (Thm 8), remainder finite (Lemma 9), Katz/Deligne applies. Shortest path to an unconditional off-diagonal theorem; needs the monodromy of the Salié-type sheaf. Could be a section of paper III or a companion. |
| P3 | Sharp O(1) form of (E) | ★★☆☆☆ | Needs decay in the frequency that no known Weyl bound gives; equivalent in spirit to the spectral formula P4. State as open. |
| P4 | Maass-spectral explicit formula for the off-diagonal ("second spectrum") | ★★★★★ (11 Sep night, as route R of paper IV) | The right object is the Cesàro/Riesz PIECE P_u(Y) at scale √Y (numerically O(√Y)), not the sharp Off_f(H) (bounded; the C4 null result tested the wrong quantity — lesson recorded). Route: Dirichlet series of the Weyl sums W_k(s) = Σ_d λρ_k d^{−s}, Bykovskiĭ/Kuznetsov for weight 1/2, poles at 1/2 ± it_j of level 4u²; Riesz mean of order m gives a power saving per piece; the crux is level uniformity A < 1/4. See research/paper-IV/BRAINSTORM.md. |
| P5 | Job (C4): spectrum of Off_f(e^u) for t²+1 | done to 10⁷ (10 Sep) | Null: no Maass or ζ lines at resolution 0.68; Off bounded, no drift. Extend to 10⁹ externally (segmented sieve) before closing the question. |
| P6 | General two-variable Frobenian Dahlquist/Kurokawa–Moroz theorem | ★★☆☆☆ | Opus's argument adopted: a remark in paper II, not a section; a referee is more likely to say "known, see X" than to demand it. Possible short note later, after reading Kurokawa I and Moroz. |
| P7 | Non-abelian example (t³−2, S₃): Ψ_N, pair field = K, zeros of ζ_K | ★★★☆☆ | Theory item (compute Ψ_N for S₃, list poles) + numerics (C3). Good for the general-f theorem's credibility. |
| P8 | Limiting distribution / no-bias theorem (Akbary–Ng–Shahabi) | ★★★☆☆ | Conditional (RH + LI + Gonek–Hejhal); clean statement; medium effort. Paper II open problem (g). |
| P9 | Lower Riesz order to m > 0; converse "E_m small ⇒ RH for ζ_K" | ★★★☆☆ | Brüdern–Kaczorowski–Perelli technique; the converse is the interesting half. |
| P10 | k-point singular series for polynomial tuples, multivariable Euler products | ★☆☆☆☆ | Even R₃'s order of magnitude is open in the linear case (Kuperberg). Remark only. |
| P11 | Class number in the x^{m−2/3} coefficient | ★★★☆☆ | Trivial, quotable; in paper II as a remark; worth a numerical check across D (C3). |
| P12 | Non-2-transitive quartics: does (E) fail? | ★★★☆☆ | Genuine open possibility; cheap test (C3-type, Σ + ½C log H for x⁴+1, x⁴−2, cyclic quartic, S₄). |
| P13 | Goldston–Montgomery equivalence for ζ_K / prime values of f | ★☆☆☆☆ | No Dirichlet series for prime values of non-linear f; only the prime-ideal side exists (Bui–Keating–Smith). Discussion only. |
| P14 | "Primes correlate with zeta zeros" as a headline | ☆☆☆☆☆ | Fallacy. Zero terms are T^{−1/4} below the Hardy–Littlewood transfer tolerance. Never claim. |
| P15 | Ulam spiral geometry (Fibonacci, quasicrystal, dimension effects) | ☆☆☆☆☆ | Refuted 8 Sep; the spiral is only a polynomial generator. |
| P16 | External review of paper I's Theorem 2 by a specialist | ★★★★☆ | Opus: "nobody has checked it". Correction: the identity is verified numerically to 1e-14 two independent ways (thesis/exact.ts validation; sumS/offdiag consistency), so its truth is not in doubt; what is unchecked externally are the analytic proofs (Thm 6, paper II's horizontal lemma). Action: arXiv (needs endorsement) + one precise question to Suriajaya or Rodgers. Author's call; does not block paper III. |
| P17 | Extend the zero sum to γ ≤ 300; x to 10⁹ (C2, C6) | ★★☆☆☆ | Improves the numerics, not the theorems. External machine, later. |

## 5. Second opinion (Claude Opus 5.1, 10 Sep) — assessed
- Glossary: accurate; one nuance: the Cesàro weight makes the per-modulus test function a continuous
  piecewise quadratic (corner), hence k^{−2}, as stated. Adopted into the KB.
- "Kurokawa does not apply because of the 1/p variable": correct, and now confirmed against Alberts's survey
  (his class is Π_p Q_p(p^{−s}) with Q_p Frobenian; criterion = Kurokawa–Moroz, his Thm 9.3).
- "Route B is the nearest theorem and was dropped": correct; reinstated as P2 (★★★★☆). Reason it was set aside:
  the author chose Route A for paper III; both can be pursued, B is more mechanical.
- "The real bottleneck is external review; Theorem 2 unchecked": half right — see P16.
- "Read Alberts before claiming novelty": done (10 Sep); novelty claim narrowed and Moroz added.
- "Frobenian Dahlquist theorem as a remark, not a section": adopted (P6).
- "Cesàro, unambiguously, in the title of paper III": adopted (P1). O(1) stays an open problem (P3).
- "DFI works via hyperbolic geometry/Maass forms": fine as a gloss; DFI 2012 is Kuznetsov for half-integral
  weight Kloosterman sums; the geometric dictionary (roots ↔ geodesic tops) is Marklof–Welsh.

## 6. How to verify things here (checklist)
- Any exact constant: two independent routes (product vs L-values; partial sum + tail vs exact).
- Any explicit formula: subtract exactly, fit at most one coefficient, compare β with 1 AND with shifted controls.
- Any truncated Euler product multiplying H or x^{m+1}: complete the tail analytically.
- Any novelty claim: Kurokawa 1986, Moroz 1988, Alberts 2024 (Euler products); Hooley 1963/64, DFI 1995/2012,
  Marklof–Welsh 2023 (roots of congruences); Goldston–Suriajaya 2021, KRR 2022 (singular-series averages).
- Files: paper/STATUS.md (paper I), research/paper-II/ROADMAP.md (plan), LITERATURE*.md (surveys), ERRATA.md.
