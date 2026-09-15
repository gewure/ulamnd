# Knowledge base: the second-moment programme for prime values of polynomials
Compact, chronological, with the dead ends. Written 9–10 September 2026 so that someone new can pick up the
context without reading the sessions. Ratings: ★☆☆☆☆ (dead) … ★★★★★ (do this next). Ratings are intuitive
and dated; update them.

## 0. One-paragraph summary
For an irreducible polynomial f, the pair singular series S_f(h) is the explicit weight that (under
Hardy–Littlewood) governs simultaneous primality of f(t), f(t+h). Paper I (v8; not yet submitted anywhere — arXiv planned, 12 Sep)
proves an exact identity for Σ_{h≤H}(S_f(h) − C(f)²), splits it into a diagonal (equal roots mod d) with
Dirichlet series ζ_K(s+1)E_f(s) of residue 1/C(f), and an off-diagonal (distinct roots), and conjectures
Σ*_f(H) = Σ_{h≤H}(1−h/H)(S_f−C²) = −½C(f) log H + A_f + o(1) ("Conjecture 1"; linear-in-C; Cesàro form ONLY — the sharp sum has no bounded remainder at all: v7 said o(1),
v8 said O(1), both false, v9 of 13 Sep claims nothing about the sharp sum; F15, F26). Paper II (draft, 19 pp) determines E_f completely
(infinite product of Artin L-functions of virtual characters Ψ_N; Ψ_2 = −Sym²V; natural boundary Re s = −1),
proves the RH-conditional explicit formula for the diagonal with zeros of ζ_K and pair-field zetas, an
unconditional Ω_±(x^{m−3/4}), verifies it numerically for t²+1, and reformulates the off-diagonal (Hypothesis
(E)) as the holomorphy of one Dirichlet series O_f. Paper III (planned) proves Hypothesis (E) in Cesàro form
for quadratics; as of 11 Sep it has, unconditionally: the far moduli (trivial), the small moduli (weighted
Kowalski–Soundararajan), and the pieces u > H^{2/3+ε}, which carry a MAIN TERM c_off(f)·H with an explicit
constant (−0.1344 for t²+1, confirmed numerically to 3 digits). Nothing here proves anything about primes; all
prime statements need Hardy–Littlewood.

## 0b. WHERE THINGS STAND, AND WHAT TO DO NEXT (updated 13 September 2026, after the first external assessment)

STATE. Four papers, all compiling, zero unresolved references, 26/26 tests passing.
  paper-I   31 pp  v10 (14 Sep; Thm dirichlet proof repaired, ERRATA 26). Conjecture 1 in Cesàro form ONLY; the sharp sum has no bounded remainder (new Remark
                   rem:sharp; ERRATA 11, 14). Preprint ready; awaiting an arXiv endorser (math.NT).
  paper-II  24 pp  corrected 13 Sep: the general-f explicit formula has the log-polynomial at s = −2/3 (ERRATA 12).
  paper-III 27 pp  READ by a fresh adversarial reader (13 Sep evening, opus): core sound (decomposition, c_off to six
                   digits, θ+6B<1 recomputed); 7 findings all FIXED (ERRATA 18): Thm u1's exponent 12/13 -> 1-1/16 (the
                   K-optimisation had not been done), a proposition invoked outside its hypothesis (harmless for u=1,
                   now said), the finite Fourier lemma used at non-integer Y (correction term added), d'>1 in the
                   definition, the sign argument for c_off, two exponents in Thm A's display, (loglog u)^3 -> ^4.
  paper-IV  27 pp  u = 1: orbit error REPAIRED (ERRATA 13); remainder bound found unproved (ERRATA 16); the smoothing
                   route CARRIED OUT (ERRATA 17, Prop. prop:exact): exact coefficients, main terms as residues — and the
                   remainder is NOT a technicality: it contains Riesz-smoothed Hooley sums (the sharp start at h=1 leaves
                   a Y^m B_2({x}) term), same order as the main term. So α_j = residue + Hooley part (uncomputed); the
                   theorem stands as exact expansion + proved leading terms, remainder OPEN and equivalent to the
                   modulus-side (Kuznetsov/Bykovskiĭ) treatment of smoothed Hooley sums. PROVED instead (13 Sep night):
                   Theorem thm:smooth — the smooth-window spectral formula, absolutely convergent, explicit
                   coefficients, phase of the first line predicted with no free parameter and observed to 0.035 rad,
                   amplitude and phase confirmed on TWO forms (t_1: ratio 0.99, 0.010 rad; t_2: 1.05, 0.11 rad over the
                   upper half of Y ≤ 1e7; ERRATA 19–21). One proved theorem in paper IV again, every constant tested;
                   READ adversarially 13 Sep (fresh reader, opus): core verified with the residue constant reproduced
                   numerically by the reader; 8 expository points fixed (ERRATA 22); no fatal finding. LEVEL-2 PART
                   CONFIRMED on the restricted object (ERRATA 23): newform line 8.9229 at 1.02/0.05 rad, absent in the
                   unrestricted object as predicted; t_1 reduced 0.060 -> 0.027 by the oldform term as predicted. 30 pp.
Everything is pushed to github.com/gewure/ulamnd. The assessment is archived in research/reviews/.

WHAT THE ASSESSMENT TAUGHT US (record in 0c). Three places examined, three real errors; two in the newest work, one
in a fix we had made ourselves and endorsed after a numerical check that could not have detected it (F26). The error
density rises with recency, and nothing in papers II–IV has been read by a specialist. Assume there is more to find.

WHEN IS THE INTERNAL PHASE FINISHED (criterion set 13 Sep, at the author's request, to stop open-ended polishing):
  a paper is internally done when every statement in it is either PROVED AND READ ADVERSARIALLY AT LEAST ONCE (external
  assessment or a fresh agent with no session context) or EXPLICITLY LABELLED open/conjectural; every number is
  reproducible from the repository; ERRATA/KNOWLEDGE are current; the open problem is stated exactly with its known
  obstructions. Status (14 Sep): paper I yes (assessment + internal); paper III yes (fresh reading, 7 fixes); paper II yes
  (Sections 2–4 read, 7 fixes, ERRATA 24); paper IV yes (Section 5 read twice, thm:smooth read, Sections 2–4 read: 10
  findings, 9 fixed, 1 rejected with reason, ERRATA 25). THE INTERNAL PHASE IS FINISHED as of 14 Sep. What remains is
  RESEARCH (RESEARCH-USES.md §4b), to be started only by a decision of the author, and EXTERNAL review (the author is
  reading outside; feedback so far: one concrete finding, paper I Thm dirichlet's proof, fixed 14 Sep, ERRATA 26).
  Do not reopen polishing without a concrete finding; act on every concrete finding at once.
  EXPLORATION IN PROGRESS (14 Sep night, author asleep): research/explore/STATE.md — pick up there. Order when
  resuming: (1) write the joint-fit test for the Γ₀(9) even set (cheap, closes item 2); (2) full factorisation
  factoriser in C for h³ − 2, h ≤ 10⁶, then the cubic periodogram (item 1); (3) D-sweep of the smooth amplitude law
  (item 3). Paper IV edits (Strömberg citation, KS footnote) only on the author's decision.

WHEN PICKING UP AGAIN, IN ORDER:
0. Paper IV: (a) DONE 13 Sep: Theorem thm:smooth written, phase-tested (0.035 rad) and amplitude-tested (0.95) by
   computing ‖u_1‖ from the coefficients (smooth-amplitude-test.py). Still to do: the second line t_2 (needs its
   coefficients), the restricted object (needs level-2 forms), and an outside reading of the proof. (b) For the Riesz/Cesàro object: the Hooley part. Either
   compute it with the modulus-side spectral expansion (Bykovskiĭ's method for Σ_{d≲Y}ρ_k(d) with the smooth cutoff J_m
   provides) and ADD it to the residues — then test the amplitude law (F22) with the corrected α_j — or state the theorem
   with α_j = residue + Hooley part and leave the bound open. Do NOT call the remainder bound a technicality again.
1. Paper IV: get the REPAIRED Section 5 read by someone outside (a fresh adversarial pass of 13 Sep passed it). What to check first:
   Step 1 (pairs (d,x) <-> ALL forms of disc 4D, incl. imprimitive), Lemma subfamily (Gamma_0(e)-stability of {e | a}),
   Step 2 (Möbius regrouping of the paired sawtooth series; S_e is NOT sum_h(F_e - E_e), it is the psi-series), Step 3
   (unfolding at level e, width of the cusp infinity is 1), Remark eisenstein (constant terms of ALL cusps killed by the
   vanishing x-mean), Prop. riesz (Hoffstein–Lockhart at fixed level; oldforms). Open loose end: the amplitude/sign
   bookkeeping of Section 6's phase test still uses the level-1 Katok–Sarnak period at D; the corrected coefficient is a
   signed combination over e. Compute the level-e periods numerically (needs Fourier coefficients of level-2/3 Maass
   newforms) and check amplitudes AND the D = −3 level-2 absence.
2. Only then: a second pass over the other ~20 places of the same three kinds (every "consequently", every
   "identical to the proof of", every passage from an arithmetic sum to a group-theoretic one), by an outside reader.
3. arXiv for paper I (endorsement is the only blocker; routes in the 12 Sep timeline entry).
4. The open problem of 3e/3f is unchanged (hybrid attack, 3f item 4). Do not attack it before 1 is done.

DO NOT, WITHOUT NEW EVIDENCE: call paper IV's u = 1 result a theorem with an error term (the remainder bound is open,
ERRATA 16); call anything in paper III externally read; state ANY
sharp-sum asymptotic with a bounded remainder (F26: differencing kills it whenever the summand is unbounded); write
"the same proof works" for a generalisation without recomputing the multiplicities and pole orders (F27); pass from a
restricted arithmetic sum to an orbit sum without checking that the restriction is invariant (F28); describe the u > 1
gap as a lack of rigour (it is an open problem, 3f); claim a connection to physics or quantum chaos.

## 0c. THE EXTERNAL ASSESSMENT OF 12 SEPTEMBER 2026 (record)
"Ulam-nD — Assessment of mathematical legitimacy", prepared with ChatGPT at the author's request, assessing revision
a372a63; research/reviews/2026-09-12-assessment-a372a63.{pdf,txt}. Verdict: "a substantive exploratory mathematics
project, but not a reliable collection of proved results in its current form". It says explicitly that it is NOT an
allegation of fraud and that AI involvement is NOT the basis of the judgment; it credits the transparency of the
repository and re-verified the finite-prime version of paper I's exact identity independently (24 cases, four
polynomials, exact rational arithmetic). Its findings, each pinned to line numbers and each a concrete counterexample,
were re-derived by us by independent routes before we acted (13 Sep):
  1. Paper I: sharp form of Conjecture 1 with O(1) is impossible (S_t(H) unbounded at primorials). CONFIRMED; fixed (v9).
  2. Paper II: the general explicit formula assumes a simple pole at s = −2/3; the C_3 cubic t^3−3t−1 has a double pole
     (Psi_3 = (8,−1,−1)). CONFIRMED by two routes; multiplicities tabulated for 19 groups; fixed.
  3. Paper IV: the proof passes from the restricted sum ((d,2D) = 1) to complete orbits; the restriction is not
     orbit-invariant ([5,4,1] -> [2,2,1] under z -> z/(z+1), D = −4). CONFIRMED and strengthened (every class mixes both
     kinds, 11 discriminants). NOT REPAIRED; theorem marked not established.
Its self-declared limits: partial scope, no novelty audit, numerics not reproduced, and "finite-arithmetic agreement
certifies nothing about analytic continuation or interchanges of infinite sums". Read it as: three for three where it
looked; the rest is unexamined, not clean.
Our own additional finding while applying it: the sharp form Off_f(H) = O(1) of Hypothesis (E) is false by the same
differencing (ERRATA 14, F26); "bounded to 10^7" is what log log growth looks like.
FIRST RUN OF THE DIVISOR-SET TEST (13 Sep, scripts/piece-divset.ts, piece-maass.ts, piece-level2.ts; Y = 10^7, model
object = Riesz mean of order 1 of the divisor sum along h^2 − D, weight 1; three divisor sets: coprime = (d,2D) = 1 (the
paper's object), all = every divisor (a finite union of complete SL_2(Z)-orbits), excluded = all − coprime). Prediction of
repair (ii): coprime and excluded carry the even NEWFORMS of level e | rad(2D), "all" does not. Level-e parameters from
LMFDB (level 2 even: 8.9229, 10.9204, 12.0930, ...; level 3 even: 5.0987, 8.0389, 8.7783, ...). After removing the six
level-1 even lines, the residual regressed on the 8 smallest level-e even newforms vs 400 random 8-sets:
     D    e   object     level-1 even R^2 (pct)   level-e EVEN newforms R^2 (pct)   level-e odd (pct)
    -4    2   coprime        0.36 (100)               0.090 (98)                       (53)
    -4    2   all            0.48 (100)               0.008 (16)                       (78)
    -4    2   excluded       0.47 (100)               0.105 (95)                       (74)
    -8    2   coprime        0.16 (100)               0.080 (90)                       (64)
    -8    2   all            0.20 (99.7)              0.012 (28)                       (80)
    -8    2   excluded       0.25 (99.7)              0.110 (99.3)                     (41)
    -3    3   coprime        0.21 (100)               0.369 (99.8)                     (58)
    -3    3   all            0.34 (100)               0.030 (78)                       (96.5)
    -3    3   excluded       0.25 (100)               0.401 (100)                      (64)
  The D = −3 case is the clean one: the single-frequency periodogram of the coprime AND the excluded object has its
  LARGEST peak at 5.085 (R^2 0.23 / 0.25, above the level-1 line 13.78), and 5.0987 is the first EVEN Maass newform of
  level 3 (LMFDB); in "all" that frequency has R^2 0.0098. So the restriction (d, 2D) = 1 injects the level-3 spectrum,
  exactly as the Gamma_0(3)-orbit description says, and removing the restriction removes it. At D = −4, −8 the level-2
  lines are present at the 90th–99th percentile in coprime/excluded and absent in "all". NOT seen: level-2 lines at
  D = −3 (36th pct), although e = 2 also divides rad(2D) = 6; the amplitudes (periods of level-2 forms over the disc −12
  sub-family) may simply be small — unexplained, recorded. Also all three objects have P/sqrt(Y) bounded (0.13–0.52):
  square-root cancellation holds for the unrestricted sum too, as repair (i) predicts.
  CONCLUSION FOR THE REPAIR DECISION: the data say the paper's object is a level-rad(2D) object, i.e. repair (ii) is the
  true description; repair (i) (drop the condition) gives a correct level-1 theorem about a different object.
  GENERAL u, THE CLEAN STATEMENT (13 Sep, after the repair): the forms of piece u are those of disc 4u^2 D with
  2u^2 | b and u^2 | c; that set is stable under Gamma^0(u^2) = {u^2 | beta} (conjugate to Gamma_0(u^2)) and under
  none of Gamma_0(u^2), Gamma^0(u), Gamma(u) — VERIFIED numerically for 5 pairs (D,u). Also z_{[a,2u^2x,*]} = u *
  z_{[a,2ux,*]}: piece u = the level-u sub-family {2u | b} of the disc-4D points, dilated by u. So the u-problem is:
  Theorem main at level u^2, uniformly in u, plus the period bound. The "twisted period" of 3e is the level-1 way of
  writing this level-u^2 period. Section 7 of paper IV now says so.
  u > 1 NUMERICS (13 Sep, piece-divset.ts U=3,5; D=-8,-11 (u=3), D=-4 (u=5); Y=1e7): INCONCLUSIVE. Level-1 even lines
  NOT detectable at u=3,5 (R^2 0.01-0.02, 2nd-35th pct) although present at u=1,2. Objects dominated by a slowly
  varying component (single-frequency peaks at ~3.5 and ~5.1 in log Y with R^2 up to 0.60, in ALL and COPRIME alike);
  with a cubic detrend and t >= 6, the level-3 even newforms at u=3 sit at the 59th-70th pct (nothing), while ODD
  level-3/5 sets score 96th-100th — contradicting parity, hence almost certainly an artefact of residual low-frequency
  power (odd lists contain small parameters). The 5.1 line at u=3 for BOTH D=-8 and D=-11 matches the level-3 even
  newform 5.0987 (predicted), but 5.105 also appears at u=5, D=-4, where level 5 has no such parameter -> do not
  claim. NEEDED before any conclusion: understand the slow component (candidates: continuous spectrum at level u^2,
  a Y^{1/2-delta} main term of the far moduli, or the small first eigenvalues of level-u^2 newforms — level 9 and 25
  are NOT in the LMFDB; LMFDB Maass forms exist for squarefree levels only, e.g. 2, 3, 5); a proper spectral estimate
  (multitaper / matched filter with the Riesz kernel) instead of single-frequency R^2; and Maass data at levels u^2
  (compute them: Hejhal's algorithm, or Strömberg's tables). Tools: piece-level2.ts (QUAD=1 cubic detrend, FMIN).
  SECOND ADVERSARIAL READING (13 Sep, later; a fresh general-purpose agent with no session context, ~400 words,
  paper IV Section 5 only): repair (ii) PASSED at every point it examined (Step 1 bijection incl. even d, imprimitive
  forms; Lemma subfamily; Corollary parity-e; Möbius regrouping; Step 3 unfolding; final "no other parameters").
  FOUND: remainder bookkeeping insufficient (F30–F32; ERRATA 16). Two cosmetic points (bijection is onto Q_{4D}/Z;
  the orthonormal basis of oldforms is a Gram–Schmidt of u(e''z), not those functions). Verdict quoted: "the sum of
  main terms converges absolutely for m ≥ 2, but the remainder O(Y^{m+1/2−δ}) is not established; Theorem main is
  unproven as stated." We agree. The paper III reader died on the rate limit — paper III remains unread.
  CUBIC TEST — CLOSED (13 Sep late, ERRATA 21): a_pred = −0.00234 (m=2), K-independent, machinery checked at s=1 to
  5e-12; four orders below the zero-term noise at x ≤ 1e7 → undetectable; the correction stands on the algebra. The
  earlier fit values (21, 15.7) were the zero terms' low-frequency part, not the log term (F-lesson: a fit with a
  collinear log x + b basis over 4.6 units of log x is meaningless without subtracting the oscillatory terms).
  CUBIC TEST OF PAPER II's CORRECTION (13 Sep, in progress — superseded by the entry above): riesz-cubic.ts (Riesz means of the diagonal of
  t^3−3t−1 to 10^7), constants-cubic.py (A0, D_f(1), C(f) to 40 digits, two routes agree; C via L(1,χ)L(1,χ̄) with
  the digamma formula — mpmath's dirichlet() is WRONG at s = 1, gave 8e4 instead of 0.377; and both first versions of
  the C product skipped the inert primes, F9 again), fit-cubic.py. Result so far: with exact D_f(1) and 1/(2C) the
  fit of c x^m + x^{m−2/3}(a log x + b) halves the rms residual relative to a = 0 (6.3 vs 11.9 at m=2; 4.8 vs 8.9 at m=3)
  with a ≈ 21 (m=2), 15.7 (m=3) — but the predicted m-dependence of a is a_3/a_2 = 1.29 and the fit gives 0.74, and a
  and b are nearly collinear over log x ∈ [11.5, 16.1]. INCONCLUSIVE. Needed: the exact a_pred (Laurent coefficient
  at s = −2/3: m!ζ(−2/3)ζ_K(1/3)L(1,χ)²L(1,χ̄)²/9 × ∏_{N≠3}L(N/3,Ψ_N) × M_{f,K}(−2/3)/∏(s0+j)), and the zero terms of
  ζ(s)L(s,χ)L(s,χ̄) subtracted (paper II did this for t^2+1 and got β = 1.008).
  THE REMAINDER ROUTE CARRIED OUT (13 Sep, evening; ERRATA 17). Exact Mellin–Barnes coefficient formula (validated to
  8 digits), main terms = residues at 1/2 ± i t_j, per-form remainder ≪ Y^{m+1/4} t_j^{-5/4}, j-sum of the bounds
  DIVERGES for every m; the pole of 1/cos(πs/2) at s = 1 is the obstruction and equals Y^m (√|D|/2) B_2({x}) — the
  sharp start at h=1 — i.e. Riesz-smoothed Hooley sums Σ_k k^{-2} Σ_{d≲Y} ρ_k(d), size √Y conjecturally. LESSON (F33):
  the Y^{1/2±it_j} oscillation of the piece has TWO sources — the argument-side residues (our Poincaré series at the
  Heegner points) and the modulus-side Hooley sums — and the data see their sum; the "amplitude law not confirmed"
  (F22) is what that looks like. Provable now: the smooth-window version (increments), shape confirmed (piece-divset
  SMOOTH=1: 100th pct even level-1, top line 8.95 = level-2 newform for the coprime object). In the smooth version the
  small moduli d ≪ Y drop out (Poisson), so it is a statement about the window + far moduli only — exactly paper III's
  open region. Sharp-start objects (Cesàro, Riesz) carry the small moduli's Hooley sums in addition.
  DECISION (author, 13 Sep): (ii). Principle stated: correct or leave open, never patch with a weaker claim about a
  different object. REPAIR DONE the same day (ERRATA 13 has the list of changes). Verified before writing: the 4D
  parametrisation (orbit counts = sum_g h(4D/g^2), 9 discriminants), Gamma_0(e)-stability and finite orbit counts (15
  pairs), the Möbius regrouping (exact). Paper IV 23 pp.

## 1. Timeline (all 2026)
- 15 Sep (11:30). Second outside reading of the dilation draft (fresh instance): same fatal item as the first (asymptotic), same
  column slip, same proofs for Gram and inert vanishing; six further points applied (u² ∤ D; O-constants depend on u; PSL;
  Theorem 3 display; corollary scale; multiplicativity a conjecture). ERRATA 34. Draft now: every statement proved or open.
- 15 Sep (10:30). First outside reading of the dilation draft: the asymptotic λ(u)/u was WRONG (the λ√u terms cancel); the
  truth is u^{-3/2} exactly for inert u, −u^{-3/2}(1−2λ/√u+…) split, u^{-1/2}(1−λ/√u+…) ramified — decay set by the splitting
  type, Hecke eigenvalue only in corrections. Draft rewritten with Lemmas A–D proved (D: newform Hecke+Fricke cancellation),
  claims tempered. ERRATA 33, F41. A second fresh reading is running.
- 15 Sep (09:20). Lemmas C (Gram, two traces) and D (newform periods: Hecke and Fricke terms cancel, vanishing for inert u,
  level-u Heegner period otherwise) PROVED and checked to machine precision. All named lines of the dilated pieces are now
  Heegner-type periods. Draft edits wait for the adversarial reading in progress.
- 15 Sep (08:00). Lemmas A and B of the dilation draft PROVED (lines in P¹(F_u), B-orthogonality, Hecke sum minus isotropic
  lines); Theorem 2 now rests only on the Gram lemma (standard). Adversarial reading of the draft launched (fresh opus agent).
- 15 Sep (morning). The reviewing conversation read the PROOFS: two real defects in paper II (an empty parameter set in the
  explicit-formula proof; the Ω-theorem's proof did not prove it — comparison term's transform mislocated, its real pole
  forgotten) fixed with the standard Landau second step and an explicit constant; paper I's natural-boundary sentence now
  cites part II; paper IV's L² step made explicit and the log-only Eisenstein separation stated. ERRATA 31–32, F39–F40.
  Same reading verified thm:dirichlet's new proof, thm:smoothed's Shiu step, paper III's exponents and thm:smooth's main
  computation independently — the core holds.
- 15 Sep (morning). CUBIC EXPERIMENT DONE (Y = 10⁷, 3.3 h): NO GL(3) signal; the level-1 statistic of x³ − 2 grows like
  T^{1/4}–T^{1/3}, not √T; the weak peaks (4.0, 6.8, 9.4) do not persist on the upper half; joint fits of GL(3) parameter
  sets are not above random. The quadratic mechanism does not transfer. Parked; explore/STATE.md §9.
- 15 Sep (~06:00). Multiplicativity in u exact on the theory side (level-36 direct computation equals the product; Gram
  matrix is a tensor product). First draft of the follow-up paper written: research/paper-dilation/ (Theorem 1 proved,
  Theorem 2 conditional on three lemmas with numerically fixed values, Theorem 3 newform lines, corollary on uniform
  summability of the level-one main terms). NOT read by anyone; no claim outside the repository.
- 15 Sep (~05:30). The level-3 newform line (t = 5.0987) in piece u = 3 predicted with no free parameter and confirmed at
  five discriminants (amplitude within 4%, phase within 0.07 rad), predicted and observed absent when 3 is inert. Every
  computable line of a dilated piece now follows one formula (oldforms + newforms, each with its Gram matrix).
  Multiplicativity at u = 6: signs right, magnitudes noisy; exact level-36 prediction running. explore/STATE.md §8.
- 15 Sep (~04:30). Closed form of the level-1 amplitude ratio at odd prime dilation u: r = √u Pᵀ(u(u+1)G)⁻¹L with G the
  oldform Gram matrix (entries λ√u/(u+1) and (λ²−1−1/u)/(u+1)), P the local period multiplicities (2u | u−χ; λ√u + (u−1) |
  λ√u − (1+χ)), L = (1, 1/u, 1/u²); matches the direct computation to 4 digits. Identities to be proved (Hecke on Heegner
  divisors). explore/STATE.md §7b.
- 15 Sep (~04:00). RESULT: the amplitude of the level-1 Maass line at dilation u derived from thm:smooth at level Γ₀(u²)
  (oldform projection onto {u_j(z),u_j(uz),u_j(u²z)} over the family W_u = {disc 4u²D: u²|a, 2u²|b}) and confirmed with
  no free parameter on 21 (u,D) pairs (explore/STATE.md §7; hecke-oldform-predict.py). Depends on D only via χ_D(u);
  ramified ratios 0.850, 0.695, 0.421 at u = 2, 3, 5. The "restricted geometric factor" of paper IV §7 is explicit for
  the level-1 lines. Follow-up paper has its theorem (main terms); the error term uniform in u remains open.
- 15 Sep (early, continued). Hecke test of route 1a on 23 (D,u) pairs: naive ratio |λ(u)|/√u REFUTED (tested before
  writing, F24 worked); phase law −t log u confirmed at u = 2, 3, 5 (ramified); amplitude follows the splitting of u in
  Q(√D) and decays like ~2.6/(u+1) when ramified. Gram entry λ√u/(u+1) = 0.730 matches paper IV's measured 0.730. Next:
  derive the level-u² oldform-projection amplitude. explore/STATE.md §6.
- 15 Sep (early). Python package research/python/ulamnd (roots, singular series with exact tails, pieces, spectral tests,
  Maass predictions), 8 cross-check tests passing; C(t²+1) reproduced to 2e-9; three-route check of the expectation
  constant to 1e-12 caught a 1.5e-9 truncation error in L(2,χ) (now Hurwitz zeta). See explore/STATE.md §5.
- 14 Sep (deep night). D-sweep of the smooth amplitude law: confirmed at 15 discriminants (details explore/STATE.md §3);
  cubic full-divisor object built (cubic-full.ts), control validated against brute force, x³−2 at Y=10⁶ shows rms ∝ T^0.16;
  Y=10⁷ run launched in the background.
- 14 Sep (later night). Joint-fit test written (explore/freq-set-test.ts, Gram–Schmidt): even Γ₀(9) set at the 95th–100th
  percentile, odd-only set at the 1st–5th, on the u = 3 sharp pieces D = −8, −11 (both objects). Paper IV footnotes updated
  (ERRATA 29). Continuing with the cubic full-factorisation mode and the D-sweep of the smooth amplitude law.
- 14 Sep (night). Exploration started on three follow-ups (research/explore/STATE.md has the full state). RESULT: the
  unidentified u = 3 line at 3.5 is Strömberg's Γ₀(9) eigenvalue 3.5360 (a Γ³-type form, Proc. LMS 2012); smooth-window
  pieces for D = −8, −11, −20 show the even Γ₀(9) spectrum (3.536, 5.099, 5.504, 6.647, 8.698) and not the odd-only one
  (4.388, 6.121, 6.757) — the level-u² picture confirmed at a non-squarefree level. Prediction: the u = 5 line 2.625 is
  the first eigenvalue of the cycloidal group Γ⁵ (unverified). Cubic experiment: infrastructure built; the control showed
  that the Maass oscillation lives in moduli d > T (Hooley/DFI range), so the object needs FULL factorisation of f(h) —
  blocked until that is written. Katok–Sarnak shape pinned from Sugiyama's level-N announcement (arXiv 2110.02847):
  linear in Φ(z_v), factor |D|^{−3/4}. D-sweep amplitude test planned, not run.
- 14 Sep (last). The reviewing conversation read the case study: provenance of its §8 quote wrong (F38, ERRATA 28);
  paper III prop:windowW restated so thm:u1 invokes it inside its hypotheses (ERRATA 27); base rate paragraph and the
  scope of model review added. Case study v1.1.
- 14 Sep (night). Case study finished as version 1 (16 pp, research/case-study/main.pdf, venue arXiv): interview
  Q1–Q12 in two rounds (Appendix A, spelling-corrected), prompt fragments only, the outside reader's limits paragraph
  quoted verbatim with permission, the mathandai.org declaration cited, all independent readings listed (Appendix B),
  repository map and regeneration table (Appendix C). Tone made deliberately modest at the author's request.
- 14 Sep (evening). Case study scaffolded (research/case-study/): 9-pp LaTeX skeleton with §§ set-up, origin,
  guardrails table, prompting stages, error classification, verification, limits, recommendations; 12 interview
  questions (INTERVIEW.md) awaiting the author's answers; process numbers generated from git (record.tex).
- 14 Sep (later). The author's long-running reviewing Claude conversation (not independent) found the unproved "non-vanishing in a zero-free
  region" in the proof of paper I Thm dirichlet's asymptotic. Replaced by a Perron argument with ζ_K in the numerator;
  error term now O(x^{−1/(6n)+ε}) unconditionally; B_f identified as the Laurent constant. ERRATA 26, F37. Paper I 31 pp.
- 14 Sep. Last two internal readings applied: paper II Sections 2–4 (7 fixes, ERRATA 24) and paper IV Sections 2–4
  (10 findings: 9 fixed, the "Katok–Sarnak is squared" claim rejected; ERRATA 25). Substantive: S_u(t) and the Riesz
  pieces redefined for real t as integrals (the discrete eq:rieszweyl was off by a main term), admissible = all primes
  split, Salié substitution b = h̄y, the Section 4 frequency 2t_j, the visibility threshold softened with computed
  Bessel values. INTERNAL PHASE FINISHED per the criterion in 0b.
- 13 Sep (very last). Level-2 part of thm:smooth confirmed on the restricted object (ERRATA 23): Möbius sign, the
  level-2 newform, the oldform Gram matrix — each visible in the data at its predicted size. Gotcha: LMFDB coefficient
  files may start with "1 +- 0" without a decimal point; check Atkin–Lehner a(p) = -eps/sqrt p for p | level.
- 13 Sep (last). thm:smooth read adversarially: core verified, 8 points fixed (ERRATA 22). Tally for the day: six
  adversarial passes (one external, five fresh agents), errors found in five, the sixth (thm:smooth) passed on substance.
- 13 Sep (later). thm:smooth confirmed on two forms to Y = 1e7 (ERRATA 21); cubic log coefficient computed and found
  undetectable (ERRATA 21); second even Maass form's coefficients downloaded from the LMFDB (download_coefficients
  endpoint works; the API has no coefficients).
- 13 Sep (late). Theorem thm:smooth amplitude-tested: 0.0600 predicted vs 0.0569 observed (ERRATA 20). Related-work
  paragraphs with nine newly verified references added to papers I–IV (ERRATA 20; author's request).
- 13 Sep (later night). Theorem thm:smooth (smooth windows) proved and phase-tested to 0.035 rad (ERRATA 19); smooth-phase-test.py.
- 13 Sep (night). Remainder route of paper IV carried out: exact coefficient formula (Prop. prop:exact), main terms as
  residues, and the discovery that the remainder contains Riesz-smoothed Hooley sums (ERRATA 17, F33); the
  smooth-window statement identified as the provable one and its shape confirmed numerically. Paper III read by a fresh
  reader (opus, ~160k tokens): 7 findings, all fixed (ERRATA 18, F34–F36); core sound. Cubic test of paper II's
  correction: constants to 40 digits, fit inconclusive, exact prediction of the log coefficient NOT done (next).
- 13 Sep (evening). Second adversarial reading of paper IV Section 5 (fresh agent): repair passed, remainder bound found
  unproved (F30–F32, ERRATA 16); theorem downgraded to "exact expansion + main terms proved, remainder open"; the
  boundedness gap closed by a coset count. Paper III reader died on credits. RESEARCH-USES.md written (uses and hints,
  rated). Cubic test of paper II's correction started (inconclusive so far). Formatting pass on all four papers.
- 13 Sep (later). Paper IV REPAIRED by route (ii): Section 5 rewritten at level Gamma_0(e), e | rad(2D) (details in
  ERRATA 13); discriminant convention moved to 4D; abstract, notice, thm:K, cor:shape, referee remark, Section 6 phase
  paragraph updated; three bib entries added (Iwaniec 2002, Hoffstein–Lockhart 1994, Kim–Sarnak 2003). 23 pp, compiles.
- 13 Sep. FIRST EXTERNAL ASSESSMENT applied (0c; ERRATA 11–15). Paper I v9 (all sharp-sum claims removed; sharp
  form of Hypothesis (E) recorded as false); paper II general-f theorem corrected (log-polynomial at −2/3, table of
  m_N for 19 groups: m_4 < 0 and m_5 > 0 in all of them, no proof); paper IV u = 1 theorem marked NOT ESTABLISHED with
  a correction notice and Remark rem:coprime (counterexample, two repairs). New tools: paper-IV/scripts/piece-divset.ts
  (model object for the coprime / all / excluded divisor sets), piece-periodogram.ts. ERRATA.md moved to research/;
  assessment archived in research/reviews/; READMEs rewritten. Paper III unchanged (one sentence softened).
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

F41. "r = λ(u)/u + O(u^{-3/2})" read off a closed form by dropping the small entries (paper-dilation draft, 15 Sep). The vector
P had an entry of size u multiplying the "small" entries, and the dropped products cancelled the kept term exactly; the true
law is ±u^{-3/2} (exactly u^{-3/2} for inert u). Rule (from the reviewer): whenever an asymptotic is read off a closed form,
EVALUATE the closed form at a large argument (two lines of numpy at u = 1009) and compare; and when a "leading term" carries
an oscillating factor (λ), check whether it survives at all. Same species as F26/F39/F40: local steps right, one global magnitude
relation dropped. (ERRATA 33)

F42. "The sharp sum S_u(Y) tends to zero uniformly in u" (PLAN-uniformity (T″), first version, 15 Sep). At integer t the sharp
sum has the offset E_u/2 (the mean of ψ((t−x)/d) over integer t is 1/(2d)) and is O(1) noise; only its Cesàro mean vanishes.
Found within the hour by the first numerical test (sharp-sum-u.py). Rule: before replacing a Cesàro statement by a pointwise
one, compute the pointwise object at a few arguments.

F43. "The trivial SL₂(F_u)-component of piece u is w̄·√u·T_u applied to the level-one Poincaré series" (PROOFS-uniform §6,
15 Sep). Summing the seed over all u(u+1) cosets gives Atkin's U_u (the matrices (1 j; 0 u)), not T_u, which also contains
(u 0; 0 1); on the homogeneous seed U_u is the scalar 1/u, so the trivial component is w̄·S^w_1(uY), the u = 1 object at length
uY. Found by re-deriving before the test was run (15 Sep). The corrected form explains the inert identity (dilation draft,
Remark components). Rule: when an averaged coset sum is identified with a Hecke operator, write down the matrices summed.

F44. Float64 Euler products as subtracted means (all piece grids, 13–15 Sep). Rounding and tail errors of 10⁻¹²–4·10⁻¹¹ give
a Y^{3/2} drift of 0.02–0.16 at Y = 10⁷ that polynomial detrending in log Y leaves in the data; published ratios at u = 3 move
by up to 0.04 when the drift is fitted. Found by the regression check of a new script against the paper's grids, where the
two codes disagreed only for split u (the new one multiplied one extra factor, which changed the rounding path). Rule: every
fit of a piece grid includes the mean-error columns, and a new mean is checked against a log-sum. (ERRATA 35)

F45. "They hold to a few percent at u = 2 and within about 0.04 at u = 3" (dilation draft abstract, 15–15 Sep), and a "(+0.341)"
entry called an unexplained outlier. No error bar had been measured for any fitted ratio. Two estimates (amplitude at off-line probe
frequencies; half the difference of fits on the two halves of the range) give errors 0.04–0.5 at u = 3 and up to 0.7 at u = 5: every
entry, the "outlier" included (0.4 of an error), is consistent with the prediction, and none is "a few percent". Close agreement in
a noisy fit was read as precision. Found when the author's reviewing conversation asked to re-audit the outlier. Rule: no
agreement statement for a fitted amplitude without an error estimate from at least two methods; entries are called outliers only
in units of that error. (ERRATA 36)

F46. "A logarithmic saving is not enough in the window" (paper III abstract and results, KNOWLEDGE F14, 10–15 Sep). An assertion about one
bound — Koksma on the whole window (Y, u²Y log H], whose log(u² log H) dyadic ranges swamp a (log Y)^{−c} saving — repeated as a fact about
the problem for six days. The ranges above Y(log Y)^{13} carry nothing (a divisor average over the values of u²x² − D, uniform in the
discriminant: Henriot 2012), and on the O(log log Y) ranges left the saving suffices: Hypothesis (E) in Cesàro form holds unconditionally
(paper III Theorem E; two adversarial readings). Found by first measuring where each piece lives (window-truncation.ts: the √Y-oscillation
sits in moduli Y … 16Y). Rule: when a method loses a factor from the length of a summation range, measure how much of the range
contributes before calling the loss intrinsic; and never promote "our bound fails" to "the problem needs more". (ERRATA 38)

F47. "…exactly when Off* is o(H log H), which part III proves" appended to paper I's abstract under a display ending in +O_f(1) (15 Sep).
The added clause credited the o(H log H) theorem to a display whose error term needs Off* = O(H), a different and unproved statement.
Same species as F7/F15 (a headline drifting from its theorem). Found by a reading of the paper text. Rule: when a clause credits a
result to an existing display or statement, re-read that display's error term and hypotheses against the result's, word by word. (ERRATA 39)

F38. "A Claude instance given the papers and nothing else" (case study v1, §8) for a reader that was the author's
long-running reviewing conversation with weeks of context. A statement about PROCESS asserted from memory instead of
checked with the author; same species as F21 ("submitted"). Rule: every sentence describing who did what, with what
context, is a claim to be verified like a constant — ask, or look at the record; provenance of a reviewer is part of the
evidence, and overstating independence is the case-study analogue of overstating a theorem. Found by the reader itself.
(ERRATA 28)

F39. "δ = ε₀ and ε₀ ≤ ε₁(ε₀), possible since ε₁(δ) ≫ δ/log(1/δ)" (paper II, explicit formula). The lemma gives ε₁(δ) ≍
δ/log(1/δ), which makes the choice IMPOSSIBLE for small ε₀ — the justification was the reason it fails. Rule: for every
named constant in a proof, list the constraints it must satisfy and check that the set is non-empty; a quantifier is a
claim to be verified like any other. (ERRATA 31a)

F40. "∫ ε x^{m−3/4} x^{−s−m−1} dx = ε x₀^{−s−1/4}/(s+1/4)" (paper II, Ω-theorem): the exponent copied by pattern from the
neighbouring transforms (three of four in the same sentence were right), and the comparison term's own real pole then
forgotten when declaring the function holomorphic on the real axis — which is exactly what Landau's theorem hinges on.
Rule: recompute every transform in a display; never copy the pattern. And: the object YOU introduce (a comparison term, a
smoothing, a truncation) has its own singularities — list them with the others. (ERRATA 31b)

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
under GRH for constituents of Ψ_1..Ψ_4 (corrected 13 Sep, ERRATA 12: at s = −2/3 a polynomial in log x of degree
m_3 − 1, m_3 = ⟨Ψ_3,1⟩ = 2 for C_3, up to 16 for C_7; the proof also needs m_4 ≤ 0, true for all 19 tabulated groups,
unproved in general).
NUMERICAL: t²+1 explicit formula β ≈ 1 (X = 4·10⁷, γ ≤ 100); Cesàro exact test k = 0.498 ± 0.003 (C not C²); c_off
confirmed for 4 quadratics; pieces O(√Y) with oscillations at the EVEN Maass parameters of SL₂(Z) (5 quadratics, 12 Sep);
F_q[u] identities two ways.
CONJECTURED (with strong numerical support incl. a parameter-free phase test at p ~ 1.4e-6): the second spectrum: P_u(Y) = c_u Y + √Y Σ_j c_j cos(t_j log Y + φ_j) + …, t_j even
Maass parameters (route R). Paper IV's u = 1 proof for the model object has a known gap (ERRATA 13, F28), so this is
CONJECTURED for the model object too, with the argument written out except at one step.
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
    [15 Sep: the loss is NOT intrinsic — F46; Hypothesis (E) in Cesàro form is proved, paper III Theorem E.]
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
F26. "The Cesàro asymptotic implies the sharp one with O(1)" (paper I v8, Conjecture 1 and Hypothesis (E); our own
    fix of F15, endorsed after a numerical check to 10^7). False whenever the summand is unbounded: Σ(H) − Σ(H−1) IS
    the summand, so a bounded remainder bounds the summand; S_f(h) grows like log log h (primorials for f = t; many
    small split primes dividing h^2+4 for t^2+1 — there it is the OFF-diagonal part that grows, so the sharp
    Off_f(H) = O(1) is false as well). log log 10^7 < 3, so "bounded to 10^7" is exactly what unbounded log log growth
    looks like. RULE: before writing O(1) for a partial sum, difference it; no numerical check can distinguish O(1)
    from O(log log H). Found by the external assessment (Finding 1); the Off_f consequence by us on applying it.
F27. "Identical to the proof of the quadratic case" (paper II, Theorem general f). The quadratic case has a simple pole
    at s = −2/3 because m_3 = 1 for S_2; in general the pole has order m_3 = ⟨Psi_3, 1⟩ — 2 for C_3, 5 for C_4, 16 for
    C_7 — and the residue carries (log x)^{m_3−1}. The same proof also relied on L(4w, Psi_4) being pole-free at
    Re 4w = 1, i.e. on m_4 ≤ 0: true in every example (19 groups), unproved. RULE: a "same proof" generalisation must
    recompute every quantity whose value the special case fixed by accident (here the pole orders). Found by the
    external assessment (Finding 2).
F28. "The restricted sum is a sum over the Heegner orbit" (paper IV, Step 2 and Theorem main). The model keeps
    (d, 2D) = 1; the leading coefficient of a form is not a class invariant (its values over the orbit are the numbers
    the form represents), so the admitted forms are a proper subset of every orbit ([5,4,1] and [2,2,1] for D = −4).
    What IS invariant: {e | d} under Gamma_0(e). So the restricted sum is a union of Gamma_0(e)-orbits, e | rad 2D — the
    fixed-level shadow of the u-problem (3e), where the sub-family {2u^2 | b} is not Gamma-invariant either. We had
    identified exactly this kind of non-invariance as THE obstruction for u > 1 (3f item 1) while committing it at
    u = 1. RULE: whenever an arithmetic sum is rewritten as an orbit sum, list every condition on the summation
    variables and check each for invariance under the group. Found by the external assessment (Finding 3).
F30. "|K_{iτ}(x)| ≤ K_0(x), so the truncated tail is O(e^{−2πkt}) after summing over j" (paper IV, Lemma tail and the
    proof of Theorem main, 12 Sep; celebrated in the 12 Sep KNOWLEDGE entry as one of the "two elementary estimates that
    closed it"). The inequality is true and useless: K_iτ carries e^{−πτ/2} for x < τ, |ρ_j(1)| ≍ e^{πτ/2} gives it back,
    and the bound does not sum over j. Worse, for t_j ≫ t² the truncated range contains the stationary point of the
    phase βy − t_j log y and the discarded piece equals the main term in size. RULE: a bound "uniform in τ" that drops
    an exponential in τ must be checked against the normalisation of whatever it multiplies; and "changes nothing in
    the orbit sum" (true) is not "changes nothing in the estimate of the coefficients" (false). Found by a fresh
    adversarial reading, 13 Sep.
F31. "The error terms sum by Prop. riesz with room to spare, since they carry two further powers of t" (paper IV, proof of
    Theorem main). Powers of t do nothing for the sum over j: the Riesz factor t_j^{−m−1} arises from integrating the
    OSCILLATING main term t^{∓it_j}; a non-oscillatory error O(t^{−5/2}t_j^A) integrates to Y^{m−3/2}t_j^A, and Σ_j t_j^A |Per|
    diverges by the Weyl law. RULE: in a spectral expansion, every term needs its own decay in j; smooth the seed first
    so that all coefficients inherit it. Also: never leave an exponent unnamed ("τ^A").
F32. "Saving of t_j^{−3/4}" from ∫_0^W w^{3/2}dw with W = √t_j/c (paper IV, paragraph after Lemma Kuniform). The integral
    is (2/5)W^{5/2} = (2/5)t_j^{5/4}c^{−5/2}; times c²/t_j this is t_j^{+1/4}c^{−1/2}: a LOSS. Superseded by Lemma mellin,
    but false as written for a day. RULE: do the one-line integral on paper before writing "saving".
F33. "The remainder bound is a standard technical task, a day of work" (KNOWLEDGE 0b and ERRATA 16, 13 Sep afternoon;
    withdrawn the same evening). Carrying the route out (ERRATA 17) showed the remainder contains Riesz-smoothed Hooley
    sums of the same order as the main term, because the sharp start of Σ_{h≤t} leaves a Y^m B_2({x}) component whose
    spectral coefficients decay only like t_j^{-3/2}. RULE: before estimating a remainder, ask what it IS on the other
    side of the identity; a spectral sum whose trivial bounds diverge is usually a real object, not a bad bound.
F34. "≪ Y^{12/13+ε} with K = Y^{1/20}" (paper III, Theorem u1): the tail Y/K = Y^{19/20} was never compared with the
    claimed exponent; the optimum gives Y^{0.9345}. RULE: when balancing two terms, WRITE both exponents at the chosen
    K and check them; an unoptimised K with a copied exponent is a classic. Found by the fresh reader (opus), 13 Sep.
F35. "Lemma proved for integer Y, applied at Y = H/u" (paper III, Lemma finfourier in Prop. windowW). The identity is
    false for non-integer Y (−0.32 vs −0.57 at d'=7, Y=5.5); the fix costs one correction term. RULE: every lemma's
    hypotheses are re-read at every application; "Y ≥ 1 an integer" is a hypothesis. Same reader.
F36. "c_off < 0 since every term is" (paper III, Thm typeII). When 3 splits, λ(3) = −3 and m_3 < 0: the terms are not all
    negative; the sum is, by an identity (λ(p)m_p = mp/(p−2)) and a sign count of Euler factors. RULE: "every term is
    negative" must be checked at the smallest prime, where our weights change sign (λ(3) = −3 is the recurring culprit:
    F23 too).
F29. "The theorem is for the piece P_u" (paper IV results list). It was for the model object (weight lambda and the
    squarefree condition dropped); the results list said "piece". Minor, but the same drift between headline and
    statement as F7 and F15. RULE: after every rewrite of a theorem, re-read the abstract and the results list against
    the statement.

F37. "Holomorphic and non-vanishing in a zero-free region" for a quotient ζ_K/ζ (paper I, Thm dirichlet, old proof).
Non-vanishing of ζ_K/ζ near σ = 1 is the no-Siegel-zero statement and is NOT known; it was asserted in passing because
Selberg–Delange "usually" comes with G(1) ≠ 0. But the method needs only holomorphy and polynomial growth of G, and here
the cleaner route puts ζ_K in the NUMERATOR (Perron on ζ_K(s)E_f(s−1)), where its zeros are irrelevant, and gives a
power saving. Rule: when a factor sits in the numerator, never mention its zeros; when a proof "cites a method", list
the method's hypotheses and check each one against the object. Caught by the author's long-running reviewing conversation (14 Sep), after two internal
passes and one external assessment had read the same lines. (ERRATA 26)

## 3e. THE OBSTRUCTION, FINALLY IDENTIFIED EXACTLY (12 Sep, night) -- and it is NOT a tap-in
Chasing the general-u case to the end gives the cleanest statement of what blocks the Cesaro conjecture.
Write the general-u points as w = (-b' + sqrt D)/d with b' = u x. Because x runs mod d and (u,d) = 1, b' runs over
ALL roots of b'^2 = D (mod d) -- but as an INTEGER in [0, ud) it is constrained by u | b'. So the sum is over the
u = 1 Heegner set taken modulo translation by u, restricted to the sub-family u | b'. Detecting that condition by
additive characters,
      1_{u | b'} = (1/u) sum_{a mod u} e(a b'/u),   and   b' = -d * Re w,
turns the geometric factor into (1/u) sum_{a mod u} [ sum over Heegner points of u_j(w) e(-a d Re w / u) ]:
a TWISTED HEEGNER PERIOD, with a phase depending on the modulus d. That dependence on d is precisely the dilation
obstruction of part III. The a = 0 term is the ordinary Katok-Sarnak period; the a != 0 terms are the problem.
So the final statement of the open problem is: bound
      sum_{Q} u_j(z_Q) e(a d_Q Re z_Q / u)        (a not 0 mod u)
with a saving of u^{1/4+eps} over the trivial bound. This is a twisted equidistribution statement for Heegner points
in the u-aspect. It is a genuine open problem of the same family as the ones part III ran into -- NOT a formality.
HONEST NOTE (12 Sep): a first pass suggested the restriction could be removed by periodising the seed, which would
have made the period u-independent and the problem easy. That is wrong: periodising mixes the sub-family with its
translates, which is exactly what the additive characters above express. Also the amplitude data do not support the
naive u^{-1/2} law (observed ratios amp(u=2)/amp(u=1) are 1.04, 0.99, 1.03, 1.25, 1.81 against a predicted 0.707),
which is consistent with the twisted terms contributing at the same order. The PHASE law -t_j log u is confirmed
(3d); the AMPLITUDE law is not, and the discrepancy is where the twisted terms live.

## 3f. WHY THE REMAINING STEP IS HARD (for whoever picks this up)
The obstruction of 3e is one sentence long but it is not shallow, and the reason is structural, not technical.
1. EVERY tool used in paper IV requires Gamma-invariance. The spectral decomposition applies to functions on
   Gamma \ H; unfolding requires the seed to be summed over a coset space; Katok-Sarnak evaluates a period of an
   automorphic form. The twist e(a d_Q Re z_Q / u) depends on d_Q, the leading coefficient of the FORM, which is not
   a class invariant: applying gamma in Gamma changes d. So the twisted sum is not a period of an automorphic form
   at all. It leaves the category in which our machinery lives. That is the whole difficulty in one line.
2. It is the SAME obstruction as part III's, not an analogue. There the Weyl sums carry the frequency k ubar, which
   depends on the modulus; here the phase depends on d. Both say: the object is not invariant, so spectral methods
   do not see it.
3. Even the UNTWISTED statement is deep. sum_Q u_j(z_Q) -> 0 is Duke's theorem (1988), which rests on Iwaniec's
   bounds for Fourier coefficients of half-integral weight forms, i.e. on subconvexity. The twisted version is
   strictly harder than a theorem that itself took a breakthrough.
4. WHAT WOULD ACTUALLY WORK, most likely: do not bound each u separately. Average over u as well, so that the
   modulus-dependent phase becomes a bilinear form in (u, d) rather than a fixed twist. That is precisely what
   part III's Type II argument does at the large-u end, and what a spectral treatment does at the small-u end; the
   missing object is a hybrid, spectral in d and bilinear in u. Candidate tools: the Fouvry-Iwaniec large sieve for
   roots of quadratic congruences (Gaussian primes, Acta Arith. 79 (1997)), the spectral large sieve of
   Deshouillers-Iwaniec (level-uniform), and the Kloosterman-fraction bilinear bounds (DFI 1997, Bettin-Chandee 2018)
   -- the last of which is structurally blocked in the form we needed it (LITERATURE round 1) but may not be in a
   hybrid form.
5. SCALE: this is a research programme, not an afternoon. Treat any claim to have closed it in one sitting with
   suspicion, including from me: on 12 Sep alone, four shortcuts through this step looked clean and were wrong
   (F24, F25, the Shimura idea of 3b, the periodisation idea of 3e).

## 3d. GENERAL u CONFIRMED (12 Sep, night) -- the structure extends; one factor remains
The corrected general-u derivation (3c) predicts, with NO free parameter, that the phase of the t_j-oscillation
shifts by exactly -t_j log u relative to u = 1, because the expansion parameter of the Mellin-Barnes lemma becomes
alpha/beta = sqrt|D|/(u t). TESTED at u = 2 for six discriminants, model object, Y <= 10^7, mean value to 22 digits
(scripts/ef-general.py, written for this):

   D    phi(u=1)   predicted phi(u=2)   observed   difference
  -4     +3.13         -0.138            -0.14      +0.002
   8     +0.78         -2.488            -2.37      -0.118
  -8     -1.42         +1.595            +1.29      +0.305
  -7     +0.53         -2.738            +0.54      +3.005   <-- differs by pi (sign), least stable fit of the six
  12     +0.62         -2.648            -2.95      +0.302
  (-3 has 2 inert, so u = 2 is not admissible there)

FOUR of five within 0.31 rad, median 0.302; the fifth differs by pi, i.e. by a SIGN in the geometric factor. So the
general-u structure is right: Poincare series over Gamma_infty^{(u^2)} \ Gamma, modes k = n u^2, expansion parameter
sqrt|D|/(u t). Paper IV Section 7 rewritten around this.
WHAT REMAINS, now sharply stated: bound the RESTRICTED geometric factor -- a sum of a Maass form over a specific
sub-family of the Heegner points of discriminant 4u^2 D (those forms with middle coefficient divisible by 2u^2) -- by
u^{1/4-eps}. That single bound would give the Cesaro conjecture for quadratics. It is no longer "an error term":
it is a concrete period-type sum.
NOTE: scripts/ef-general.py had two bugs, both caught by checking against the direct product: (i) primes where chi
vanishes contribute a HALF-term to (P + P_chi)/2 and must be removed; (ii) the Moebius inversion for P_chi needs the
L-function of chi^k, which is the PRINCIPAL character for even k, not chi. With both fixed it reproduces the direct
product plus exactly the predicted tail (3.6e-8).

## 3c. GENERAL u: THE GEOMETRY, AND A CORRECTION TO PAPER IV (12 Sep, later)
CORRECTION MADE TO PAPER IV (real error, now fixed): the Poincare series of Step 3 must be summed over
Gamma_infty \ Gamma, NOT over Gamma. Reason: the arithmetic parametrisation is by (d, b mod 2d), and b -> b+2d is
z -> z-1, so the sum runs over Heegner points MODULO TRANSLATION. A full Gamma-orbit contains z+n for every n, all of
the same height, and sum_{Gamma}(Im gamma w)^2 diverges, whereas sum_{Gamma_infty\Gamma}(Im gamma w)^2 = E(w,2)
converges. The Step-4 computation was unaffected (it already used int_0^1 dx, the classical unfolding for a coset
sum), but Lemma seed and Step 3 as written were wrong. Paper IV now says Gamma_infty\Gamma throughout.

WHY THE SHIMURA SHORTCUT FAILED (3b). For general u the pairs are (d, x) with u^2 x^2 = D (d); the associated forms
have discriminant 4u^2 D and the point is z = (-u^2 x + u sqrt D)/d, so Im z = u sqrt|D|/d and Re z = -u^2 x/d. With
x mod d, Re z has period u^2, NOT 1. So the seed is invariant under translation by u^2, not by 1, and the relevant
object is the Poincare series over Gamma_infty^{(u^2)} \ Gamma; the Fourier pairing then forces k = n u^2. The sum is
therefore NOT the full Katok-Sarnak period over all Heegner points of discriminant 4u^2 D but a restricted
sub-family, which is exactly why the naive Shimura amplitude prediction failed its check (0.639 predicted vs 1.017).
This is the dilation problem of part III in geometric form.

WHAT THE CORRECTED PICTURE PREDICTS, AND ONE CONFIRMATION. With k = n u^2 and a = t y/(u sqrt|D|), the Bessel and
sine parameters become alpha = 2 pi n, beta = 2 pi n u t / sqrt|D|, so the expansion parameter is
  alpha/beta = sqrt|D| / (u t)      [u = 1 recovers the earlier sqrt|D|/t]
and the phase factor (alpha/2beta)^{i t_j} gives an EXTRA phase shift of -t_j log u relative to u = 1.
TESTED: for t^2+1, phi(u=2) - phi(u=1) predicted -t_1 log 2 = -3.268 (mod 2pi), observed -3.31. Difference 0.042 rad.
One clean data point; u = 5, 10 have unstable phases (amplitude near the noise floor, consistent with the predicted
u^{-1/2} decay) and u = 13 blows up numerically (E F precision). Stabilising those is the next concrete step: it needs
E F computed to ~1e-14 for general u, i.e. extending scripts/ef.py beyond the D = -4 squarefree case.

## 3b. THE OPEN PROBLEM AND A CANDIDATE ATTACK (12 Sep, not yet verified)
Open: paper IV's theorem is for u = 1; the Cesaro conjecture needs all u <= H^{2/3+eps}. Paper IV Section 7 states the
obstruction as "no spectral bound is uniform enough in the level 4u^2" -- the mirror of paper III's "no Weyl bound is
uniform enough in the frequency".
CANDIDATE ATTACK (idea, NOT established): that framing may overstate the difficulty, because the discriminants that
occur are not arbitrary -- they are D times a SQUARE, namely 4u^2 D = D(2u)^2. Two consequences if it works:
 (a) the Heegner points of discriminant D f^2 are still SL_2(Z) orbits, so the spectral decomposition stays at
     LEVEL 1 throughout and no level-uniform spectral theory is needed;
 (b) Shimura's relation for half-integral-weight coefficients, c(|D| f^2) = c(|D|) sum_{d|f} mu(d) chi_D(d) d^{-1/2}
     lambda(f/d), converts the period at D f^2 into HECKE EIGENVALUES times the period at D. The loss would then be
     u^{7/64+eps} (Kim-Sarnak), not u^{1}, and no subconvexity for L(1/2, u_j x chi_D) would be needed.
STATUS: NOT CONFIRMED. A quick test contradicts the naive form: predicted amp(u=2)/amp(u=1) for t^2+1 is
2^{-1/2} lambda(4)/lambda(2) = 0.639, observed 1.017. So either the u-normalisation of the test function or the
Shimura bookkeeping (or the identification of which discriminant occurs) is wrong. Work it out properly before
claiming anything. The numerics are cheap: pieces at u = 1, 2 for t^2+1 exist (data/piece-U{1,2}-Dm4-grid.dat).
SECOND HALF, independent of (a)-(b): even granting the above, the spectral asymptotic needs t >> u, i.e. u <= H^{1/2};
paper III's averaging covers u > H^{2/3}. Closing the gap needs paper III's Type II range improved from 2/3 to 1/2 --
which paper III already flags as plausible by replacing Parseval-over-units with the Fouvry-Iwaniec large sieve for
roots of quadratic congruences (Gaussian primes, Acta Arith. 79 (1997)).

## 4. Paths and their ratings (10 Sep 2026)
| # | path | rating | comment |
|---|------|--------|---------|
| P1 | Paper III, Route A, Cesàro form of (E) for quadratics | ★★★★★ (rigorous pass 11 Sep: KSw, far moduli, Type II with c_off proved) | Unconditional: small moduli (log-saving), far moduli (trivial), u > H^{2/3+ε} (main term c_off H). Open = the window (Y, u²Y] for 1 < u ≤ H^{2/3}; Hypothesis W needs θ+6B < 1: any modulus saving, but loss below (uk)^{(1−θ)/6} in frequency and dilation — no known Weyl bound is frequency-uniform. Honest framing: W is a hard open problem; paper IV goes via the divisor-sum form of the pieces instead. | Target theorem. Cesàro weight gives k^{−2} Fourier decay so DFI's k^{1/4} suffices; only unbounded saving needed (Remark 7). Real work: Lemma A for small moduli (Hooley's Lemma 5 with the phase). Hooley 1963 is the template. |
| P2 | Route B, F_q[u], q → ∞ (Prop. B3) | ★★★★★ (10 Sep; Thm B proved for N ≤ 2, D = u) | Formulated via Lang–Weil on explicit varieties V_{k,N} (paper III §5). Local q-sweep for t²−u: q·Off_f(N) → ≈ −2.05 for N = 1, 2 (q ≤ 43): a 1/q LAW with an explicit constant, sharper than the q^{-1/2} target. First main term for the off-diagonal anywhere in the programme. Compute κ by hand for N = 1, 2. | Reinstated (Opus was right that it was dropped without a stated reason; the reason was scope). Small moduli vanish identically (Thm 8), remainder finite (Lemma 9), Katz/Deligne applies. Shortest path to an unconditional off-diagonal theorem; needs the monodromy of the Salié-type sheaf. Could be a section of paper III or a companion. |
| P3 | Sharp O(1) form of (E) | ☆☆☆☆☆ REFUTED 13 Sep (F26) | False: the increments of Off_f(H) are the off-diagonal part of S_f(H) − C², unbounded (log log growth along rare H). The sharp question that remains is the ORDER of the remainder, open even for f = t (Friedlander–Goldston (log H)^{2/3}). |
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
- Any asymptotic read off a closed form: evaluate the closed form at a large argument and compare (F41).
- Any fit of a grid with a subtracted mean: include the mean-error shape (Y^{3/2} for smooth windows, Y^{3/2} and Y^{1/2} for
  sharp Riesz means) in the design matrix; check the mean itself against a log-sum (F44). Any coset average identified with
  a Hecke operator: list the matrices actually summed (F43).
- Any fitted amplitude or ratio quoted as agreement: give its error from two methods (probe frequencies, split halves) and state
  the agreement in units of that error (F45).
- Any named constant or exponent chosen in a proof: list its constraints, check the set is non-empty (F39). Any Mellin/
  Perron/Laplace transform in a display: recompute it, never copy the pattern; list the singularities of every object the
  proof itself introduces (F40).
- Any partial-sum asymptotic with O(1): difference it first (F26). Any "same proof" generalisation: recompute every
  pole order and multiplicity the special case fixed by accident (F27). Any rewrite of an arithmetic sum as an orbit
  sum: list every condition on the summation variables and check its invariance under the group (F28).
- Files: research/paper-I/STATUS.md, research/ERRATA.md (project-wide, incl. the external assessment items 11–15),
  research/reviews/ (external assessments, archived with the revision assessed), research/paper-II/ROADMAP.md (plan,
  historical), LITERATURE*.md (surveys).
