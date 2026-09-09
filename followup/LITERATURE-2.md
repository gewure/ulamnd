# Literature, round 2 (9 September 2026, night): paper II questions and where unexpected results may lie

Survey run after the theorems of paper II §§2–4 were written. Verification key as in LITERATURE.md:
[V] checked on publisher/arXiv, [V-cite] confirmed via citing sources, [M] from memory. The full text of
Goldston–Suriajaya (Acta Arith. 2021) was read.

## The one thing that changes the paper: attribution

- **Kurokawa (1986)**, *On the meromorphy of Euler products (I)*, Proc. LMS (3) 53, 1–47 [V]; *(II)* ibid. 209–236.
  [M on contents:] Euler products "of Galois type" Π_p H(ρ(Frob_p); p^{-s}) with H over the representation
  ring R(G); meromorphy on C characterised by a cyclotomic/unit condition in R(G) (λ-ring, Adams operations);
  Chebotarev produces the accumulating zeros. **Our Ψ_N factorisation and natural boundary in the pure-v
  variable are (close to) special cases.** New in our setting: the second variable u = 1/p (Galois × Igusa
  hybrid), the explicit Ψ_N for D_f, the location Re s = −1, the consequences for the explicit formula. The
  manuscript now says so (intro, "Relation to the literature"). **Read Kurokawa I before submission.**
- **Estermann (1928)** Proc. LMS 27, 435–448; **Dahlquist (1952)** Ark. Mat. 1, 533–554 [V]: Π_p h(p^{-s}),
  meromorphic on C iff h is a product of cyclotomic polynomials, else natural boundary (zeros accumulate).
  Dahlquist's Witt/cyclotomic factorisation h = Π(1−X^k)^{−c_k} is our Ψ_N-factorisation done in Z.
- **Bhowmik–Essouabri–Lichtin (2007)** Forum Math. 19, 1111–1139 [V]; **Delabarre (2010/11)** arXiv
  1001.3838, 1004.0360 [V]; **Kurokawa–Ochiai (2009)** JNT 129, 1919–1930 [V]: multivariable Euler
  products Π_p h(p^{-s_1},…,p^{-s_n}); for f = t our local factor is h(X,Y) = (1−2X+XY)/(1−X)² on the line
  (s_1,s_2) = (1, s+1): check whether their criterion predicts our boundary for f = t.
- **du Sautoy–Grunewald (2002)** Amer. J. Math. 124, 1–48 [V]; du Sautoy–Woodward LNM 1925: Π_p W(p, p^{-s}),
  "ghost polynomial", natural boundary unless the ghost is friendly. Cleanest language for a general
  "Frobenian Dahlquist theorem".
- **Bhowmik–Schlage-Puchta (2007)**, *Natural boundaries of Dirichlet series*, Funct. Approx. 37, 17–29 [V];
  (2010) arXiv 1001.1891; Bhowmik (2010) arXiv 1001.1869. Theorem: natural boundary at σ₀ ⇒ no asymptotic
  formula by residue terms with error O(x^{σ₀−ε}). ⇒ our Remark "no asymptotic explicit formula": the
  O(x^{m−1+ε}) of Goldston–Suriajaya is best possible in the strong sense. (Check their growth hypotheses.)
- **Alberts (2024/26)** arXiv 2406.18190 [V]: explicit continuation of Frobenian Euler products to Re s > 0;
  standard reference in arithmetic statistics; we go past 0 down to the boundary.
- **Glücksam–Zou (2026)** arXiv 2601.05896 [V]: comparison test for meromorphic extensions.
- **Goldston–Suriajaya (2021)** [V, full text]: F(s) = 4C₂/(2^{s+1}+1)·ζ(s)ζ(s+1)/ζ(2s+2)·G(s),
  G(s) = Π_{p>2}(1 + 2/((p−2)(p^{s+1}+1))), continued to σ > −1 "only"; **no natural-boundary remark**; zeros of
  the local factors at p^{s+1} = −p/(p−2), i.e. σ_p → −1 — our Theorem (natural boundary) for f = t is new
  relative to their paper.
- **Brüdern–Kaczorowski–Perelli (2019)** Trans. AMS 372, 6981–6999 [V]; Languasco–Zaccagnini series [V-cite]:
  explicit formulas for Cesàro–Riesz means of any order k > 0 via double Mellin transforms → tool to lower our
  m ≥ 2 to all m > 0. **Bhowmik–Ruzsa (2018)** Anal. Math. 44, 51–56 [V]: "good error ⇔ RH" equivalences →
  model for a converse theorem.
- Computation of the products via the factorisation: Moree (2000) Manuscripta 101, 385–399 [V];
  Ettahri–Ramaré–Surel (2021) Math. Comp. 90, 2247–2265 [V]; Cohen (c.1996) [V].

## Virtual characters / plethysm
- Serre (1974/75) Sém. DPP exp. 20 [V]; Odoni (1975) Mathematika 22 [V-cite]; Cazaran–Moree (1999) Expo.
  Math. 17; Berndt–Moree (2024/25) arXiv 2409.03428 [V] (survey, 208 refs): Landau–Ramanujan tradition,
  Frobenian Euler products through Artin L-functions, but only at a fixed point s, never with s as the
  variable of an explicit formula.
- Charlton–Medvedovsky–Moree (2024) arXiv 2412.01803 [V]: S₃/S₄ Artin L-series arise generically in
  Euler–Kronecker constants → precedent for non-abelian Ψ_N; write out t³−2 (Sym²V = 2·1 ⊕ std ⊕ Sym²std).
- Witt/necklace background: Hazewinkel arXiv 0804.3888; Dress–Siebeneicher [M]: "1 + χ_V v = Π(1−v^N)^{−Ψ_N}"
  is a Witt vector in W(R(G)) with ghost components ψ^N(χ_V) — a slick conceptual proof of Lemma (plethystic
  exponents). Hyde (2022) Acta Arith. 204; Minh et al. (2026) arXiv 2606.02324 (cyclotomic factors of necklace
  polynomials).
- No prior "PLog(1 + χ_V v)" in an L-function paper found.

## Limiting distributions and bias
- **Akbary–Ng–Shahabi (2014)** Q. J. Math. 65, 743–780 [V]: general limiting logarithmic distribution for
  x^{-a}Σc(ρ)x^ρ. Applies to E_m/(x^{m−3/4} log x) (double ζ-zeros dominate at that scale, L(χ_D) zeros one log
  below). Needs Σ|γ|^{-1}|ζ'(ρ)|^{-2} < ∞ (Gonek–Hejhal).
- Devin (2020) Math. Proc. Camb. 169, 103–140; Martin–Ng (2020) Trans. AMS 373; Hayani (2025/26) arXiv
  2512.23302; Leung (2026) Adv. Math.; Hamieh–Kadiri–Martin–Ng (2024) arXiv 2407.03530 (problem list).
- Assessment: no real singularity on Re s = −3/4 ⇒ under LI the limiting distribution is symmetric ⇒
  log-density of {E_m < 0} = ½ exactly: a clean "no Chebyshev bias" theorem despite the negative main term.
  Moree (2004) Math. Comp. 73, 425–449: bias from non-cyclotomic Euler products (closest precedent).

## Higher moments
- Montgomery–Soundararajan (2004); Kuperberg (2025) ANT 19, 617–666 [V] (odd moments; function-field R₃, R₅);
  Kuperberg 2023, 2022/23; KRR (2022). Kuperberg's methods are combinatorial; the L-function route via
  multivariable Dirichlet series (BEL machinery) for R₃ is unexplored and hard. The k-point local factor is a
  polynomial of degree k−1 in v over Z[ω]; its plethystic log lives in the λ-ring Z[V]: "Sym^k-type" only in
  the λ-ring sense. Treat as a remark, not a project.
- Polynomial k-point correlations: nothing found. Adjacent: Baier–Zhao (2007); Skorobogatov–Sofos (2023)
  Invent. Math. 231; Browning–Sofos–Teräväinen; Bortolussi (2026) arXiv 2604.02287 (read: variance of BH
  error terms); Sofos (2026); Banks–Ford (2026).

## Function field
- No Dahlquist/Estermann theorem over F_q[u] found: likely a gap. Over F_q[u] every L(q^{-N}T^N, Ψ_N) is
  rational with RH known; the Riesz-mean formula is a finite residue sum plus a Cauchy integral near |T| = q;
  the −7/8-type cancellation becomes exactly computable. Candidate standalone note "Dahlquist over F_q[u]".
- Keating–Rudnick (2014); Sawin–Shusterman (2022); Bary-Soroker (2012); Entin (2016); Palimar (2019);
  Kimura–Koyama–Kurokawa (2014) LMP 104 (Euler products beyond the boundary, global function fields);
  Demangos–Longhi–Saettone (2026).

## Ranked directions (agent's ranking, my annotations in brackets)
1. "No explicit formula past the boundary" as a theorem via BSP07 — easy, quotable. [Added as Remark; upgrade to
   Corollary after checking BSP07's hypotheses.]
2. Frobenian (Galois × Igusa) Dahlquist theorem in ghost language — medium; check Kurokawa I first. [Frame
   Theorem (structure) as extension; possible standalone note.]
3. Class number in the x^{m−2/3} term — trivial, nice headline. [Added as Remark.]
4. Limiting distribution, provable absence of bias — medium, conditional. [Open problem (g).]
5. Function field as exact laboratory — low–medium. [WP5 / (C5).]
6. Lower the Riesz order to all m > 0; converse "E_m small ⇒ RH for ζ_K" — medium; converse is the interesting one. [Open problem (h).]
7. Non-abelian example t³−2 written out — medium. [WP2 / (C3), also a theory item: Ψ_N for S₃.]
8. k-point via multivariable Euler products — hard; remark only.
