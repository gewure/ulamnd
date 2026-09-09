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
