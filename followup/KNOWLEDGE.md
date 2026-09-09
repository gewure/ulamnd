# Knowledge base: the second-moment programme for prime values of polynomials
Compact, chronological, with the dead ends. Written 9–10 September 2026 so that someone new can pick up the
context without reading the sessions. Ratings: ★☆☆☆☆ (dead) … ★★★★★ (do this next). Ratings are intuitive
and dated; update them.

## 0. One-paragraph summary
For an irreducible polynomial f, the pair singular series S_f(h) is the explicit weight that (under
Hardy–Littlewood) governs simultaneous primality of f(t), f(t+h). Paper I (v7, submitted by the author)
proves an exact identity for Σ_{h≤H}(S_f(h) − C(f)²), splits it into a diagonal (equal roots mod d) with
Dirichlet series ζ_K(s+1)E_f(s) of residue 1/C(f), and an off-diagonal (distinct roots), and conjectures
Σ = −½C(f) log H + A_f + o(1) ("Conjecture 1"; linear-in-C). Paper II (draft, 19 pp) determines E_f completely
(infinite product of Artin L-functions of virtual characters Ψ_N; Ψ_2 = −Sym²V; natural boundary Re s = −1),
proves the RH-conditional explicit formula for the diagonal with zeros of ζ_K and pair-field zetas, an
unconditional Ω_±(x^{m−3/4}), verifies it numerically for t²+1, and reformulates the off-diagonal (Hypothesis
(E)) as the holomorphy of one Dirichlet series O_f. Paper III (planned) proves Hypothesis (E) in Cesàro form
for quadratics. Nothing here proves anything about primes; all prime statements need Hardy–Littlewood.

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
- 10 Sep. Second opinion (Claude Opus 5.1, via the author) assessed below; Alberts's survey checked:
  Kurokawa–Moroz criterion covers Frobenian coefficients only, not our 1/p dependence.

## 2. What is proved, conjectured, refuted (status board)
PROVED (paper I): exact identity; ζ_K(s+1)E_f(s) with residue 1/C; E_f = H_f/L(2s+2,Sym²V) with H_f abs. conv.
for Re s > −2/3 (H̃_f only for Re s > −3/4 — corrected); quadratic closed formula; Cesàro theorem for linear f;
reduction to Off* = o(H log H); F_q[u] identity + finite support; spiral rays are degree-d polynomials.
PROVED (paper II): pair fields; Ψ_N virtual characters; structure theorem; quadratic exponents (necklace);
natural boundary (all f, incl. f = t); Ω_±(x^{m−3/4}) unconditional; Prop. O_f (holomorphy ⇒ Cesàro
conjecture); F_q[u] structure theorem.
PROVED UNDER RH: explicit formula for quadratics (m ≥ 2, full proof incl. horizontal-segment lemma); general f
under GRH for constituents of Ψ_1, Ψ_2, Ψ_3.
NUMERICAL: t²+1 explicit formula β ≈ 1 (X = 4·10⁷, γ ≤ 100); α = 0.92 ± 0.08 (C not C²); Off_f bounded to 10⁵;
F_q[u] identities two ways.
CONJECTURED: Conjecture 1 (⇔ Hypothesis (E)); no-bias; Maass lines in Off_f.
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
F10. Programming: `pkill -f <script>` kills the harness's own shell when the command line contains the name;
    Python output buffering hides progress; savetxt header '#' breaks pgfplots. Trivial but cost time.

## 4. Paths and their ratings (10 Sep 2026)
| # | path | rating | comment |
|---|------|--------|---------|
| P1 | Paper III, Route A, Cesàro form of (E) for quadratics | ★★★★★ | Target theorem. Cesàro weight gives k^{−2} Fourier decay so DFI's k^{1/4} suffices; only unbounded saving needed (Remark 7). Real work: Lemma A for small moduli (Hooley's Lemma 5 with the phase). Hooley 1963 is the template. |
| P2 | Route B, F_q[u], q → ∞ (Prop. B3) | ★★★★☆ | Reinstated (Opus was right that it was dropped without a stated reason; the reason was scope). Small moduli vanish identically (Thm 8), remainder finite (Lemma 9), Katz/Deligne applies. Shortest path to an unconditional off-diagonal theorem; needs the monodromy of the Salié-type sheaf. Could be a section of paper III or a companion. |
| P3 | Sharp O(1) form of (E) | ★★☆☆☆ | Needs decay in the frequency that no known Weyl bound gives; equivalent in spirit to the spectral formula P4. State as open. |
| P4 | Maass-spectral explicit formula for Off_f ("second spectrum") | ★★★☆☆ | Beautiful, hard; precedent Bykovskiĭ/Soundararajan–Young for prime geodesics. Do NOT start before job (C4) shows whether Maass lines exist. If they do, this is the headline of paper III or IV. |
| P5 | Job (C4): spectrum of Off_f(e^u) for t²+1 to 10⁸ | ★★★★★ | Cheapest, most informative computation; decides P4. External machine. |
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
- Files: paper/STATUS.md (paper I), followup/ROADMAP.md (plan), LITERATURE*.md (surveys), ERRATA.md.
