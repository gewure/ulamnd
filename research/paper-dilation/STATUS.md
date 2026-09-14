# Dilated pieces, Hecke correspondences and the second spectrum — status (15 September 2026, first draft)

Working draft, not for circulation. What it contains and what its status is:
- Theorem 1 (spectral formula for piece u at level Γ₀(u²) via the seed identity): PROVED (a corollary of paper IV's smooth theorem).
- Theorem 2 (level-one lines: explicit ratio r_j(u;D) for odd primes u): PROVED for u ∤ D and u ∥ D prime to the conductor
  (Lemmas A, B, C all proved on 15 Sep). ASYMPTOTICS CORRECTED 15 Sep after an outside reading: r = u^{-3/2} EXACTLY for inert u
  (an identity in λ and u, verified symbolically), −u^{-3/2}(1 − 2λ/√u + …) split, u^{-1/2}(1 − λ/√u + …) ramified. The first
  draft said λ(u)/u; the λ√u terms cancel. Fallacy F41.
- Theorem 3 (newform lines; vanishing for inert u): PROVED (Lemma newperiod: the Hecke and Fricke terms cancel for a newform,
  so the family period vanishes for inert u and is a level-u Heegner period otherwise; Gram entry −ε/u by the trace). Two senses
  of "vanishing observed": the PERIOD vanishes to 1e-17 in the computation; in the DATA the line is at the noise level
  (0.019, 0.006 against resolved amplitudes 0.14–0.32), i.e. absent to within 5–15%.
- Corollary (uniform summability of the level-one main terms over u): follows from Theorem 2; the sum now converges like Σ u^{-2}.
- Multiplicativity in u: exact on the theory side (direct level-36 computation = product; Gram matrix a tensor product), argument to be written.
- Tests: 21 (u,D) pairs for the first level-one line; 7 discriminants for the level-3 newform; u = 6 signs. All in
  research/explore/STATE.md §6–8 with the scripts.
Open: the 2-adic case (u dividing the conductor); cycloidal-group lines; any bound uniform in the newform; the error term
uniform in u (the conjecture of part III itself). This draft has been read once from outside (15 Sep: the asymptotic error found and fixed; Lemma C independently derived); a second fresh reading is in progress; the rule of the programme
(no second claim before an outside reading) applies.
