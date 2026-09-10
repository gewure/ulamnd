# Knowledge base: the second-moment programme for prime values of polynomials
Compact, chronological, with the dead ends. Written 9–10 September 2026 so that someone new can pick up the
context without reading the sessions. Ratings: ★☆☆☆☆ (dead) … ★★★★★ (do this next). Ratings are intuitive
and dated; update them.

## 0. One-paragraph summary
For an irreducible polynomial f, the pair singular series S_f(h) is the explicit weight that (under
Hardy–Littlewood) governs simultaneous primality of f(t), f(t+h). Paper I (v7, submitted by the author)
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
  paper III; four polynomials for numerics (deferred to external machine); paper I submitted as v7.
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
  Hypothesis W(θ,B) the window needs 4B < 1−θ, not B < 1−θ; DFI's (3/4, 1/4) does not satisfy it — W needs
  square-root cancellation. (f) Paper I's Conjecture 1 (o(1), sharp) found false (parity of t²+1); v7 was submitted
  with it. Corrected to v8 (Cesàro form); exact test redone in Cesàro form: α = 1.001 ± 0.001, k = 0.498 (F15, F16).
- 11 Sep (later). Rigorous pass part 2: Section 5 of paper III rewritten. (g) Exact finite Fourier expansion of the
  window term (verified numerically): Σ_x B = (1/4d') Σ_{0<k<d'} (1−cos 2πkY/d')/sin²(πk/d') ρ_k(d') — flat weight
  Y²/d' for k ≤ d'/Y, so a window modulus has up to u²L frequencies of full weight. (h) Consequence: Hypothesis
  W(θ,B) closes the window only if 5θ+6B < 3 (and small moduli need 2B(2−θ) < 1−θ); the earlier "B < 1−θ" and
  "4B < 1−θ" were both wrong bookkeeping (F18). Square-root cancellation with loss < (uk)^{1/12} is required;
  DFI's (3/4,1/4) is far off. (i) Far moduli generalised: d' > u²YL contribute O(Y/(u²L)) trivially, so with
  L = log H no reflection argument is needed anywhere — the "Hooley reflection" step is gone from the paper.
  (j) Theorem A′ (unconditional): Off* = c_off H + Σ_{u≤H^{2/3+ε}} w(u) W_u(H/u; log H) + O(H (log H)^{1−c});
  Cesàro (E) ⟺ windows = o(H log H). Theorem A (conditional on W with the exponent conditions): Off* = c_off H
  + O(H^{1−δ}), A_f = A_f^diag + C² c_off. Paper III: 22 pp.
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
W(θ,B) with 5θ+6B < 3, 2B(2−θ) < 1−θ; F_q[u]: Theorem B (N ≤ 2, D = u).
PROVED (paper II): pair fields; Ψ_N virtual characters; structure theorem; quadratic exponents (necklace);
natural boundary (all f, incl. f = t); Ω_±(x^{m−3/4}) unconditional; Prop. O_f (holomorphy ⇒ Cesàro
conjecture); F_q[u] structure theorem.
PROVED UNDER RH: explicit formula for quadratics (m ≥ 2, full proof incl. horizontal-segment lemma); general f
under GRH for constituents of Ψ_1, Ψ_2, Ψ_3.
NUMERICAL: t²+1 explicit formula β ≈ 1 (X = 4·10⁷, γ ≤ 100); α = 0.92 ± 0.08 (C not C²); Off_f bounded to 10⁵;
F_q[u] identities two ways.
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
    line when you next touch paper I" was not applied before the author submitted. RULE: an erratum to a
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
F10. Programming: `pkill -f <script>` kills the harness's own shell when the command line contains the name;
    Python output buffering hides progress; savetxt header '#' breaks pgfplots. Trivial but cost time.

## 4. Paths and their ratings (10 Sep 2026)
| # | path | rating | comment |
|---|------|--------|---------|
| P1 | Paper III, Route A, Cesàro form of (E) for quadratics | ★★★★★ (rigorous pass 11 Sep: KSw, far moduli, Type II with c_off proved) | Unconditional: small moduli (log-saving), far moduli (trivial), u > H^{2/3+ε} (main term c_off H). Open = the window (Y, u²Y] for 1 < u ≤ H^{2/3}; Hypothesis W needs 4B < 1−θ, i.e. square-root cancellation in dilated Weyl sums — NOT a uniformity extension of DFI. Honest framing: W is a hard open problem. | Target theorem. Cesàro weight gives k^{−2} Fourier decay so DFI's k^{1/4} suffices; only unbounded saving needed (Remark 7). Real work: Lemma A for small moduli (Hooley's Lemma 5 with the phase). Hooley 1963 is the template. |
| P2 | Route B, F_q[u], q → ∞ (Prop. B3) | ★★★★★ (10 Sep; Thm B proved for N ≤ 2, D = u) | Formulated via Lang–Weil on explicit varieties V_{k,N} (paper III §5). Local q-sweep for t²−u: q·Off_f(N) → ≈ −2.05 for N = 1, 2 (q ≤ 43): a 1/q LAW with an explicit constant, sharper than the q^{-1/2} target. First main term for the off-diagonal anywhere in the programme. Compute κ by hand for N = 1, 2. | Reinstated (Opus was right that it was dropped without a stated reason; the reason was scope). Small moduli vanish identically (Thm 8), remainder finite (Lemma 9), Katz/Deligne applies. Shortest path to an unconditional off-diagonal theorem; needs the monodromy of the Salié-type sheaf. Could be a section of paper III or a companion. |
| P3 | Sharp O(1) form of (E) | ★★☆☆☆ | Needs decay in the frequency that no known Weyl bound gives; equivalent in spirit to the spectral formula P4. State as open. |
| P4 | Maass-spectral explicit formula for Off_f ("second spectrum") | ★★☆☆☆ (was ★★★, 10 Sep) | Beautiful, hard; precedent Bykovskiĭ/Soundararajan–Young for prime geodesics. Do NOT start before job (C4) shows whether Maass lines exist. If they do, this is the headline of paper III or IV. |
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
