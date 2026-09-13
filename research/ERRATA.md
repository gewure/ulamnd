# Errata for the papers of this repository (I–IV)

Project-wide list, kept current (moved here from `research/paper-II/` on 13 September 2026). Items 1–10 concern paper I
and were found internally, 9–12 September 2026; items 11–15 come from the first external assessment of the repository
and from applying it (13 September 2026), see the last section. Rule (KNOWLEDGE.md, F15): an erratum to a statement in
an abstract, conjecture or theorem is applied to the paper the same day it is recorded.

**Status of items 1–10: applied to research/paper-I/main.tex (v7 on 9 September, v8 on 11 September 2026).** The text
below is the record of what was wrong.

# Errata for paper I (main.tex v6), found 9 September 2026 while preparing the follow-up

1. **Theorem 4, last sentence.** "…H̃_f(s) with H̃_f absolutely convergent for Re s > −1 (because dim V = 2
   kills all higher exterior powers)" is wrong. With v = p^{−(s+1)}, the pure-v part of the local factor
   of E_f at a split prime is (1+2v)(1−v)² = 1 − 3v² + 2v³, and after dividing by the extracted
   factors (1−v²)^{−3}(1−v³)² the expansion is 1 − 3v⁴ + 6v⁵ − …, not 1 + O(v^∞). So H̃_f converges
   absolutely for Re s > −3/4 only, and has meromorphic continuation to Re s > −1 as an infinite
   product of Dirichlet L-functions: H̃_f(s) = ζ(4w)^{−1}L(4w,χ_D)^{−2} ζ(5w)³L(5w,χ_D)³ ζ(6w)^{−6}L(6w,χ_D)^{−5} ⋯ × M_f(s),
   w = s+1, with M_f absolutely convergent for Re s > −1 (exponents computed exactly in
   followup/scripts/explicit-diag.py; the "higher exterior powers" remark is irrelevant because the
   local factor is (1+ωv)·det(1−Frob v|V), whose logarithm is not a polynomial).
   **Replacement text:** "and extracting the cubic terms as well, H_f(s) = ζ(3s+3)L(3s+3,χ_D)H̃_f(s) with
   H̃_f absolutely convergent for Re s > −3/4. (H̃_f itself continues meromorphically to Re s > −1 as an
   infinite product of powers of ζ(k(s+1)) and L(k(s+1),χ_D), k ≥ 4, and Re s = −1 is a natural boundary
   of D_f; see the sequel.)"

2. **Proposition 7 (explicit formula for the diagonal).** (i) The factor ζ(3s+3) in the numerator has a
   pole at s = −2/3, so P_m(x) must include a term c·x^{m−2/3}, larger than the zero terms x^{m−3/4};
   (ii) the residues "at s = −1, …, −m" do not exist: the contour cannot be moved to Re s ≤ −1
   (natural boundary), and the error term O(x^{m−1+ε}) comes from the line Re s = −1 + ε, exactly as in
   Goldston–Suriajaya; (iii) further poles at s = −1 + 1/k (k = 5, 7, …, of orders 3, 9, …) and zero
   families at s = ρ/k − 1 (k = 4, 6, …) all lie within the error term but should be mentioned.
   **Replacement for the statement:** "…= P_m(x) + c_f x^{m−2/3} + x^{m−1}Σ_{|γ|≤U} a_m(ρ)x^{ρ/2} + O(x^{m−3/4−ε₀})
   for some ε₀ > 0 under GRH for ζ and L(χ_D), where P_m collects the residues at s = 1 and s = 0 only",
   and in the sketch replace "moved to Re s = −1 + δ" by "moved to Re s = −3/4 − ε₀ (further left the
   next zero family, at Re s = −7/8, has individually large coefficients that cancel against the line
   integral, because |D_f| grows towards the natural boundary; numerically the k = 4 family is rejected by
   the data, followup/ROADMAP.md WP0)". The numerical section 4.2 should note that the fitted smooth basis lacked x^{m−2/3}.

3. **Theorem 3, proof, "E_f holomorphic in Re s > −1/2":** correct as stated (the v² term gives
   convergence for Re s > −1/2), no change.

4. **NOTES-towards-7.md §2.2** says the explicit formula would have "terms x^{ρ_K/2}" — correct — but the
   description of E(s) as "~ 1/L(2s+2, π_f) · (abs. conv.)" should be read with the caveat above.

None of this affects Theorems 2, 3, 5, 6, 8 or the conjecture. It affects only what the sequel is about.

---

# Errata for paper I v7 (not submitted; earlier notes wrongly said it was), found 10–11 September 2026; applied to main.tex as v8

4. **Conjecture 1 is false as stated in the sharp form.** v7 reads Σ_{h≤H}(S_f(h) − C²) = −½C log H + A_f + o(1).
   For f = t²+1, S_f(h) = 0 for every odd h, so Σ_f(H) drops by exactly C² = 1.8846 at every odd H and recovers
   at the next even H, for all H; the sharp sum has no limit after subtracting −½C log H. The paper's own Theorem 6
   controls the Cesàro sum Σ*_f(H) = Σ_{h≤H}(1 − h/H)(S_f(h) − C²), and the text elsewhere speaks of "the bounded
   oscillation of Off_f", so the Cesàro form was always the intended one.
   **Fix (v8):** Conjecture 1 states the Cesàro form with A_f + o(1), and the sharp form with O(1) as a consequence;
   a paragraph after it explains the parity example and that A_f is defined through the Cesàro form. Papers II
   and III quote the corrected form. (Found by us on 10 Sep; the erratum was recorded but not applied before
   the next edit — a process failure, see KNOWLEDGE.md F15.)

5. **The exact test measured the wrong quantity.** The fitted slope (Σ_f(10⁶) − Σ_f(10³))/log 10³ uses two sharp
   endpoints of the oscillating sum, so each polynomial's slope/C carries an O(1)/log 10³ ≈ ±0.1 error that does not
   average out. This produced the v7 statements "α = 0.92 ± 0.08 (log) / 1.19 ± 0.11 (unweighted)" and "the
   coefficient is 0.86 of the asymptotic ½, systematically short over three decades", the latter explained by a
   "drift of A_f". **Fix (v8):** research/experiments/exact.ts now also computes the Cesàro sum. Result over the same
   25 quadratics: α = 1.001 ± 0.001 (log), 1.005 ± 0.002 (unweighted), k = 0.498 / 0.496 ± 0.002, mean slope/C =
   −0.498 ± 0.003, per decade −0.496 ± 0.008, −0.499 ± 0.004, −0.500 ± 0.002. The Cesàro sum follows −½C log H to
   three decimals for every polynomial in every decade; the "shortfall" was an artefact of the sharp cut-off.
   Paper I §4 (exact test), Figure 2, Table 3, abstract and discussion rewritten accordingly; the sharp-sum fit
   is kept as a secondary line with the explanation.

6. **Stale code paths.** The papers cited `thesis/…`, `followup/…`, `paper/gen-macros.ts`; the repository was
   restructured on 10 Sep into `research/experiments`, `research/paper-II/scripts`, `research/paper-I/gen-macros.ts`.
   All references in the three papers, README and STATUS files updated; machine-specific paths (`~/.local/bin/tectonic`,
   `~/.venvs/...`) removed from the READMEs; the repository URL is given in paper I's "Data and code".

7. **Table 2 ("A_f/C")** estimates the constant from the sharp sum at H = 10⁵; the caption now says so and
   points to the Cesàro test.

8. **Authorship (all three papers, 11 September 2026, author's decision).** The model was listed as second author of
   papers II and III (and paper I's statement said the venue could demote it to an acknowledgement). Most publishers do
   not allow an AI system as an author. Now: single author on all three papers; the section "Statement on authorship and
   the use of AI" is replaced by "AI-assisted research: disclosure", identical in the three papers, stating the heavy
   use of the model, the division of roles, the author's verification and responsibility, and pointing to the public
   repository (with the knowledge base of errors) for a complete record.

9. **Bibliography of paper I verified (12 September 2026), before the arXiv posting.** Every entry of
   research/paper-I/refs.bib was checked against Crossref or arXiv: all 31 exist with the stated authors, venues and
   years (three 2025–2026 arXiv preprints included: 2512.03292, 2605.01155, 2606.28832). Two details corrected:
   Aletheia-Zomlefer–Fukshansky–Garcia's title reads "heuristic" (singular); Goldston–Suriajaya, Acta Arith. 200 (2021),
   71–90 (volume and pages added). Tóth 2000 was confirmed bibliographically by the literature agent on 11 Sep
   (IMRN 2000(14), 719–739) and could not be re-found through Crossref's search API; the entry is kept.

10. **Pre-arXiv pass on paper I (12 September 2026, second reviewer).** Independent brute-force re-verification of
    Theorem 2 from the statement alone (four quadratics, six shifts): both sides agree to the truncation error, and the
    vanishing cases vanish. Fixed: (a) the abstract claimed the Dedekind zeta function governs "the second moment of its
    prime values" without the Hardy–Littlewood conditional, although no theorem of the paper concerns primes — now
    conditioned; (b) the abstract displayed the sharp sum while calling it the Cesàro form — now displays the Cesàro
    sum; (c) "In plain terms:" introduced an unconditional-sounding statement about primes — now "In plain terms, and
    conjecturally:"; (d) the Cesàro fit macros printed "1.00 ± 0.00" — now three decimals (1.001 ± 0.001, k = 0.498);
    (e) forward references "part III, Corollary 13" to an unpublished paper replaced by \cite entries marked "in
    preparation"; (f) the AI disclosure named only one model although two were used — now names both.

---

# Errata from the external assessment of 12 September 2026 (applied 13 September 2026)

Source: *Ulam-nD — Assessment of mathematical legitimacy*, prepared with ChatGPT at the author's request, assessing
revision a372a63 (archived as `research/reviews/2026-09-12-assessment-a372a63.pdf`, text in `.txt`). Verdict quoted:
"a substantive exploratory mathematics project, but not a reliable collection of proved results in its current form."
Three findings, each a concrete counterexample pinned to line numbers. Each was re-derived by us by an independent
route before being applied (the checks are described in the items). We agree with all three. One further error
(item 14) was found while applying them.

11. **Paper I, Conjecture 1, sharp form (Finding 1: definite false claim).** v8 stated, "consequently",
    Σ_f(H) = Σ_{h≤H}(S_f(h) − C²) = −½C log H + O_f(1). False: Σ_f(H) − Σ_f(H−1) = S_f(H) − C², so a bounded remainder
    would make S_f bounded, and S_f is unbounded. For f = t, 𝔖(H) = 2C₂∏_{p|H,p>2}(p−1)/(p−2) → ∞ along the primorials
    (𝔖/2C₂ = 5.44 at H = ∏_{p≤47} p, where log log H = 3.7). For t²+1 the growth comes through the off-diagonal primes
    p | h²+4: S_f(h)/C² = 2.70, 2.93, 3.14, 3.36, 3.56 when 5, 10, 20, 40, 80 small split primes divide h²+4 and no small
    prime divides h, against 1.12 generically. So the v8 fix of item 4 (o(1) → O(1)) was itself wrong, and the phrase
    "the sharp sum oscillates by a bounded amount", repeated in five places, was wrong everywhere. Why the numerics did
    not catch it: log log 10⁷ < 3; a computation to any feasible H cannot distinguish O(1) from O(log log H).
    **Fix (v9, 13 Sep):** Conjecture 1 is the Cesàro statement only; Σ_f(H) is defined outside it with no asymptotic
    claimed; a new remark ("the sharp sum has no bounded remainder", label rem:sharp) gives the differencing argument
    and both examples and notes that the correct order of the sharp remainder is open even for f = t
    (Friedlander–Goldston, Vaughan: O((log H)^{2/3})). Table 2 caption, Figure 2 caption, the exact-test paragraph and
    the discussion say "of size about 1 in this range, not bounded". The Cesàro conjecture and every theorem are
    untouched. Papers II and III did not quote the sharp form of Conjecture 1.

12. **Paper II, Theorem "general f" (label thm:explicit-general) (Finding 2: incorrect generalisation).** The
    statement wrote the real term as c'_{f,m} x^{m−2/3}, the form of a simple pole. The pole of L(3s+3, Ψ₃) at
    s = −2/3 has order m₃ = ⟨Ψ₃, 1⟩, which is 1 for S_n but 2 for C₃ (f = t³−3t−1, discriminant 81: Ψ₃ = (8,−1,−1)),
    3 for D₄, 5 for C₄, 8 for C₅, 11 for C₆, 16 for C₇; a pole of order r contributes x^{m−2/3} times a polynomial of
    degree r−1 in log x. Checked two ways: by the paper's own formula ⟨Ψ₃,1⟩ = (⟨χ_V³,1⟩ − ⟨ψ³χ_V,1⟩)/3 = (9−3)/3 = 2
    for C₃, and by averaging the plethystic formula over the group elements for 19 transitive groups of degree ≤ 7.
    Found while checking: the proof evaluates L(4w, Ψ₄) at Re(4w) ≥ 1 − 4ε₀ and calls it pole-free, which needs
    m₄ = ⟨Ψ₄,1⟩ ≤ 0; true in all 19 groups (m₄ ∈ {−1, …, −84}), unproved in general. **Fix:** the theorem now has
    Σ_{N=3,4} x^{m−1+1/N} P_{f,m,N}(log x), deg P = r_N − 1, with r₃ = m₃ and r₄ = m₄ + ord_{s=½} L(s, Sym²V); the proof
    has the residue computation and the C₃ example; a new table lists m₂,…,m₆ for the 19 groups (m₂ < 0, m₃ ≥ 1,
    m₄ < 0, m₅ > 0 throughout); abstract, "in words" paragraph and open problem (b) adjusted. The quadratic theorem is
    unaffected (m₃ = 1), as is the numerical S₃ example t³−2 (m₃ = 1).

13. **Paper IV, Theorem thm:main and its informal version thm:K (Finding 3: significant proof defect — REPAIRED
    13 Sep, repair (ii); not yet read externally).** The model object (label eq:model) keeps the condition (d, 2D) = 1 on the moduli; Step 2 of the section
    "The spectral formula for a piece" writes the sum as a sum over complete SL₂(Z)-orbits of Heegner points, and the
    restriction is not orbit-invariant: for D = −4 (class number 1, a single orbit) the admitted form [5,4,1] is sent
    by z ↦ z/(z+1) to the excluded form [2,2,1]. Verified, and strengthened: for the eleven discriminants
    −3 ≥ D ≥ −56 every class contains both admitted and excluded leading coefficients among d ≤ 300, so the admitted
    set is a proper non-empty subset of every orbit. **Consequence:** the theorem is not established for the model
    object; the argument as written concerns the unrestricted sum. **Done on 13 Sep:** a boxed correction notice after
    the abstract; both theorem environments marked "not established as stated"; a new remark (label rem:coprime) with
    the counterexample and two repairs — (i) drop the condition: the unrestricted sum is the union of the Heegner
    points of the discriminants 4D/g², g² | 4D, a finite union of complete orbits, but the sawtooth lemma must be redone
    for the fixed points of x ↦ −x at p | 2D; (ii) keep it: 1_{(d,2D)=1} = Σ_{e | rad 2D} μ(e) 1_{e|d}, and {e | d} IS
    Γ₀(e)-invariant (new leading coefficient ≡ dα² mod e; checked for eight pairs (D,p)), so the restricted object is
    a finite union of complete Γ₀(e)-orbits at fixed level and the argument should go through at level e, with the
    newforms of the levels e | rad(2D) added to the spectrum — the fixed-level shadow of the u-uniformity problem.
    The abstract, the results list, Section 7 and the "what a referee should check" remark were amended; paper II's
    remark that part IV "settles/proves" the second spectrum and paper III's "proves the corresponding asymptotic"
    were softened. The numerical sections are unaffected. New tools for deciding between the repairs:
    `scripts/piece-divset.ts` (model object for the coprime / all / excluded divisor sets) and
    `scripts/piece-periodogram.ts`, `scripts/piece-level2.ts`. First run (13 Sep, KNOWLEDGE.md 0c): the restricted
    object carries the even Maass newforms of level e | rad(2D) and the unrestricted one does not — for D = −3 the
    largest line of the restricted object is 5.085, the first even level-3 newform (LMFDB: 5.0987), absent from the
    unrestricted sum. That is what repair (ii) predicts. **Repair carried out the same day (author's decision: (ii),
    keep the object, do the work):** Step 1 re-parametrises the pairs (d, x mod d) by ALL forms [d, 2x, ∗] of discriminant
    4D (a bijection for every d, verified: orbit counts Σ_g h(4D/g²) for 9 discriminants; the old discriminant-D
    parametrisation is a bijection only for odd d coprime to D and produces different points, Lemma conventions);
    Lemma subfamily: H_e = {e | a} is Γ₀(e)- and reflection-stable and a finite union of Γ₀(e)-orbits (orbit counts
    stabilise for 15 pairs (D,e)); Corollary parity-e; Step 2: S = Σ_{e | rad 2D} μ(e) S_e by Möbius on the paired
    sawtooth series (exact regrouping verified in rational arithmetic), each S_e a sum of Φ_t over H_e mod translation;
    Steps 3–5, Lemmas seed/trunc, Remark eisenstein (all cusps of Γ₀(e)), Prop. riesz (Kim–Sarnak, Hoffstein–Lockhart at
    fixed level, Weyl law for Γ₀(e)) and Theorem main redone at level e with P_e, Per_{D,e}; frequencies k, a_j(k),
    α_k = 2πk, β_k = 2πkt/√|D| (the ratio α/β = √|D|/t and hence the phase prediction are convention-independent).
    Theorem main now: sum over e | rad(2D) with μ(e), over even cusp forms of Γ₀(e) (level-one forms + newforms of
    level e). Correction notice and Remark rem:coprime record the error and the test. The referee remark names the new
    Step 1–2 as the first thing to check. **Status: proved modulo external reading; the repaired statement was tested
    against data before it was written (level-e newform lines present in the restricted object, absent in the
    unrestricted one).**

14. **Paper I, Hypothesis (E), sharp form; paper II §6 (found by us while applying item 11).** "(E): Off*_f(H) = O(H);
    in sharp form, Off_f(H) = O(1), which implies the Cesàro form" — the sharp form is false by the same differencing:
    the increments of Off_f(H) are the off-diagonal part of (S_f(H) − C²)/C², which for t²+1 is unbounded along the h
    of item 11 (there the diagonal part is O(1) and all the growth is off-diagonal). "Off_f bounded by 1.3 to 10⁷" is
    what log log growth looks like. **Fix:** paper I's (E) is the Cesàro statement only and says why the sharp form
    fails; paper II's two sentences treating Off_f(H) = O(1) as the stronger target / as consistent with the data now
    record that it is false in the limit. KNOWLEDGE path P3 ("sharp O(1) form of (E)") changed from open (★★) to
    refuted; fallacy F26.

15. **Also on 13 Sep.** Paper IV's results list claimed the theorem for the piece P_u itself; it was always about the
    model object (weight λ and squarefree condition dropped) — now says so (F29). Housekeeping: this file moved to
    `research/`; the assessment archived in `research/reviews/`; paper IV's README (a scaffold from 11 Sep) rewritten
    as a status page; paper II's README and the root README brought up to date.

16. **Paper IV, Theorem thm:main — the remainder bound (second adversarial reading, 13 Sep 2026, later; found by a
    fresh reader launched by us, not by the external assessment).** The repaired Steps 1–3, Lemma subfamily, the Möbius
    regrouping and the level-e unfolding PASSED. Four defects in the analytic bookkeeping of the ORIGINAL proof (the
    part KNOWLEDGE's 12 Sep entry called "closed by two elementary estimates"): (a) Lemma tail uses |K_{iτ}(x)| ≤ K_0(x),
    which discards e^{−πτ/2}; the coefficient normalisation |ρ_j(1)| ≍ e^{πt_j/2} gives it back, so the tail bound
    e^{πt_j/2}e^{−2πkt} does not sum over j; moreover for t_j ≫ kt²/√|D| the phase βy − t_j log y is stationary at
    y* = t_j√|D|/(2πkt) > t, inside the truncated range, where the tail is of the same order as the main term
    (verified by us: stationary-phase size e^{−πτ/2}τ^{−1/2}t^{−1/2}, same as the main term). (b) The non-oscillatory error
    O(t^{−5/2+ε}t_j^A) receives no Riesz decay in j (that decay comes from t^{∓it_j} in the main term only); Σ_j t_j^A|Per|
    diverges by Weyl for every A ≥ 0; A was never specified (Stirling: A = 1). (c) Boundedness of P_e[Φ^♭] was asserted
    from the x-measure statement of Lemma seed(ii); a discrete count was needed. (d) The paragraph after Lemma Kuniform
    claimed a saving t_j^{−3/4}; the integral gives (2/5)t_j^{1/4}c^{−1/2}, a LOSS of t_j^{1/4} (verified). **Fixes (13 Sep):**
    (c) repaired by a coset count (≪ y^{−1/2} + t/√|D| exceptional cosets per dyadic block, ≪ 1 + t total); (d) corrected in
    the text; (a) and (b) NOT repaired: the theorem is now titled "the remainder bound is not established", the proof
    ends with the list of what is missing, and Remark rem:gaps states precisely what is proved (exact expansion in L²,
    main terms, absolute convergence for m ≥ 2) and what is not (the remainder O(Y^{m+1/2−δ})), with the route
    (Riesz-smooth the seed first; uniform Bessel bounds keeping e^{−πτ/2}; explicit A). Abstract, notice, results list,
    referee remark amended. KNOWLEDGE: F30–F32. The numerical evidence concerns the main terms and is unaffected.
    **Paper III was to be read by a second fresh reader the same day; that reader died on the session's rate limit
    before producing anything. Paper III remains unread by anyone.**

17. **Paper IV, the remainder bound: the route of item 16 carried out, and what it shows (13 Sep, evening).** Smoothing the
    seed first (Riesz mean in t before the spectral expansion) gives an EXACT Mellin–Barnes formula for every spectral
    coefficient (new Proposition prop:exact; the Mellin transform of the Riesz-smoothed sine is π Y^{m+1−s}/(2cos(πs/2)Γ(m+2−s));
    validated to 8 digits against direct quadrature). Shifting the contour to Re s = 3/4 gives the main terms
    Y^{m+1/2±it_j} as residues and a per-form remainder ≪ Y^{m+1/4} t_j^{−5/4+ε}. BUT the sum over j of these bounds
    diverges (Σ t_j^{−3/4} against the Weyl density), the exponent −5/4 cannot be improved by the Riesz order or by
    shifting further (pole of 1/cos(πs/2) at s = 1), and the pole has a meaning: its residue is Y^m × (√|D|/2)B_2({x}), the
    memory of the sharp start at h = 1, which summed over d ≲ Y is a Riesz-smoothed Hooley sum Σ_k k^{−2}Σ_{d≲Y}ρ_k(d) —
    conjecturally of size √Y, i.e. of the SAME ORDER as the main term, and oscillating at the same t_j. Consequences:
    (i) the coefficients α_j of Theorem main are the residues PLUS a Hooley part not computed; (ii) the remainder bound
    is not a technicality but needs the modulus-side spectral theory (Kuznetsov/Bykovskiĭ) — item 16's "a day of work"
    was wrong; (iii) this plausibly explains the unconfirmed amplitude law (F22): the predicted amplitudes were residues
    only. What IS provable by the same computation: the smooth-window statement (two-sided smooth weight w: the seed is
    Schwartz, the contour goes to Re s = 5/2−ε, absolute convergence), shape confirmed numerically (√Y × smooth sum
    oscillates at the level-1 even parameters at the 100th percentile; restricted object's top line 8.95 = level-2 even
    newform). Not written as a theorem. Remark rem:gaps rewritten; theorem title unchanged ("remainder not established").

18. **Paper III, seven findings of a fresh adversarial reading (13 Sep, evening; fixes applied).** Core checked out:
    Lemma Gbar and its integral (verified for six moduli), the c_off formula (table to six digits), θ+6B<1 (recomputed).
    Found: (1) Theorem u1 claimed P_1^≤(Y) ≪ Y^{12/13+ε} with K = Y^{1/20}, but the tail is Y/K = Y^{19/20}; the optimum
    K = Y^{1/15} gives Y^{0.9346}. FIXED: statement now Y^{1−1/16} (qualitative conclusion P_1 ≪ Y^{1−δ} unchanged). (2) The
    same theorem invoked Prop. windowW outside its hypothesis θ+B<1 ((11/12,1/4) has 7/6); the hypothesis is used only
    for k > Y/2, empty for u = 1. FIXED: sentence added. (3) Lemma finfourier is proved for integer Y and was applied at
    Y = H/u real; false otherwise (verified: d'=7, R={±3}, Y=5.5: −0.3214 vs −0.5714). FIXED: reduction to ⌊Y⌋ with the
    correction term {Y}(N(m) − (2Y−{Y})/(2d')), which contributes ≪ Y^ε log(u²L) over the window. (4) Definition (eq:piece)
    omitted d' > 1. FIXED. (5) "c_off < 0 since every term is" — false reasoning when 3 splits (λ(3) = −3, m_3 < 0);
    true via λ(p)m_p = mp/(p−2) and c·m > 0. FIXED. (6) Theorem A's window display had u^{−θ−B} for u^{−θ} and "θ+B<1" for
    "θ+3B<1" (both implied by θ+6B<1). FIXED. (7) Remark: A ≤ 3 → A ≤ 4 and exp((log log u)^3) → ^4 (three places); the
    constant "m = 0.728431" in the numerical check is M = c_f m/2. FIXED. Paper III 26 pp. No finding touches Theorem A′,
    the decomposition, or c_off.

19. **Paper IV: the smooth-window theorem (positive result, 13 Sep, night).** The computation of item 17, applied to a
    two-sided smooth window w ∈ C_c^∞((0,∞)) instead of the sharp cut-off, gives a complete theorem (thm:smooth): the
    smooth-window sum equals Y^{−1/2}|D|^{−1/4} Σ_e μ(e) Σ_j Per_{D,e}(u_j) L~_j [Γ(−it_j) W_c(3/2+it_j) (π√|D|/Y)^{it_j} + c.c.]
    + continuous part O(Y^{−1/2}(log Y)^{−A}) + O(Y^{−5/2+ε}), absolutely convergent, no Riesz order: the seed is Schwartz
    on the small moduli (Poisson), its Mellin transform entire and rapidly decaying, the contour goes to Re s = 3−ε.
    TESTED BEFORE WRITING (scripts/smooth-phase-test.py): the phase of the t_1 line for the unrestricted object at D = −4
    is predicted with no free parameter (including the sign of the period u_1(2i) + u_1(i)/2 from LMFDB coefficients):
    predicted 4.066, observed 4.032 rad — difference 0.035 (the other sign would give 3.1). The theorem is about the
    window and far moduli of part III for u = 1 (small moduli drop out), i.e. the increments of S(t), which do not see
    the Hooley part. Not yet read by anyone outside.

20. **Paper IV: amplitude of Theorem thm:smooth confirmed; related-work paragraphs added to all four papers (13 Sep, late).**
    Amplitude: the L²-norm of u_1 over the SL₂(Z) fundamental domain computed from the 20 LMFDB coefficients (Parseval
    for y ≥ 1, Gauss–Legendre 24×24 below; converged to 20 digits with 12 coefficients: ‖ũ_1‖² = 1.8158e−19 in the
    a(1) = 1 normalisation); predicted amplitude of the t_1 line 2|D|^{−1/4}|Per L~||Γ(−it_1)W_c(3/2+it_1)| = 0.0600 vs
    observed 0.0569 (ratio 0.95; scripts/smooth-amplitude-test.py). Together with the phase (0.035 rad) this confirms
    every constant of the theorem. Related work: a "Related work" paragraph in the introductions of papers I, II, III
    and in Section 7 of paper IV, citing nine references NEW to the repository, each verified on 13 Sep against its
    arXiv abstract page (title, authors, date; journal where given): Browning–Sofos–Teräväinen (arXiv:2212.10373),
    Sofos (2606.15698), Demangos–Longhi–Saettone (2606.29250), Kotsovolis–Woo (2312.11445), Kuperberg (2210.09775),
    Ngo (2107.13301; Bull. LMS 2024, doi 10.1112/blms.13108), Liu–Masri–Young (1206.3208; Compos. Math. 149 (2013)
    1150–1174), Pascadi (2404.04239; Forum Math. Pi 14 (2026) e8), Humphries–Nordentoft (2211.05890; JEMS, to appear).
    Descriptions in the text are taken from the abstracts only. Previously cited contemporary work (Banks–Ford,
    Volfson, Bortolussi, Kuperberg 2025, Kuperberg–Rodgers–Roditty-Gershon, de la Bretèche–Kuperberg, Goldston–Suriajaya,
    Kravitz–Woo–Xu, Aletheia-Zomlefer–Fukshansky–Garcia, Marklof–Welsh, Kowalski–Soundararajan) is gathered in the same
    paragraphs. Author's request; rule: cite only what was verified.

21. **Paper IV: Theorem thm:smooth confirmed on two forms; paper II: the cubic log term is real but invisible (13 Sep, late).**
    Smooth-window data recomputed to Y = 10⁷; joint fit of the six even level-1 lines (smooth-two-lines.py): t₁ amplitude
    ratio 0.99, phase difference 0.010 rad (upper half: 0.998, 0.0001); t₂ = 17.7386 with its own LMFDB coefficients
    (1.0.1.7.1, downloaded 13 Sep, stored in data/): predicted 0.0085 / 5.860, observed over the upper half 0.0090 / 5.753
    (ratio 1.05, 0.11 rad); the lower half does not resolve the t₂ line (amplitude 0.001). Cubic: predict-cubic.py
    computes the Laurent coefficients at the double pole s = −2/3 for t³−3t−1 with the full Ψ_N machinery (a_N, b_N for
    N ≤ 11, K-independent to 9 digits, D_f(1) reproduced to 5e−12 at s = 1, the residual being the Euler-product tail);
    a = −0.00234 (m = 2), −0.00300 (m = 3); b ≈ −0.005. The zero terms are ~20 in the same units up to x^{1/12}: the log
    term is undetectable at x ≤ 10⁷. The correction of Theorem general-f therefore rests on the algebra (pole order),
    not on data; paper II now says so. Tail of M(s₀) (~2.5%) not applied to a; noted.
