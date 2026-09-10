**Status: applied to paper/main.tex on 9 September 2026 (v7).** The text below is the record of what was wrong.

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

# Errata for paper I v7 (the submitted version), found 10–11 September 2026; applied to main.tex as v8

4. **Conjecture 1 is false as stated in the sharp form.** v7 reads Σ_{h≤H}(S_f(h) − C²) = −½C log H + A_f + o(1).
   For f = t²+1, S_f(h) = 0 for every odd h, so Σ_f(H) drops by exactly C² = 1.8846 at every odd H and recovers
   at the next even H, for all H; the sharp sum has no limit after subtracting −½C log H. The paper's own Theorem 6
   controls the Cesàro sum Σ*_f(H) = Σ_{h≤H}(1 − h/H)(S_f(h) − C²), and the text elsewhere speaks of "the bounded
   oscillation of Off_f", so the Cesàro form was always the intended one.
   **Fix (v8):** Conjecture 1 states the Cesàro form with A_f + o(1), and the sharp form with O(1) as a consequence;
   a paragraph after it explains the parity example and that A_f is defined through the Cesàro form. Papers II
   and III quote the corrected form. (Found by us on 10 Sep; the erratum was recorded but not applied before
   submission — a process failure, see KNOWLEDGE.md F15. The author should send the one-line correction to the
   editor.)

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
