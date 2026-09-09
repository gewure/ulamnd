# Literature: state of the art around the follow-up (surveyed 9 September 2026)

Two independent surveys were run (web search + arXiv/publisher/LMFDB checks). Every entry below was
checked on a publisher page, arXiv, or LMFDB unless marked **[unverified]** or **[partly verified]**.
Section 0 is the synthesis; Sections 1–7 are the raw material, lightly edited. BibTeX for the
verified core is in `refs.bib` (keys marked `% followup`).

## 0. Synthesis and gap analysis

**What is proved in the linear case f(t) = t (the template).**
- Σ_{k≤x} 𝔖(k) = x − ½ log x + O((log x)^{2/3}) (Friedlander–Goldston 1995); Cesàro mean with error
  ≪ x^{1/2} exp(−c(log x)^{3/5}(log log x)^{−1/5}), ≪ x^{5/12+ε} on RH (Vaughan 2001); Ω_±(x^{1/4})
  (Goldston–Suriajaya, JNT 2021).
- Riesz means of order m ≥ 2: **unconditional explicit formula** E_m(x) = x^{m−1} Σ_{|γ|≤U} a(ρ) x^{ρ/2}
  + O(x^{m−1+ε}) over the zeros of ζ (they enter at half scale through the factor 1/ζ(2s+2) of the
  generating Dirichlet series); Ω_±(x^{m−3/4}); sharp lim sup/lim inf under RH + simplicity + linear
  independence (Goldston–Suriajaya, Acta Arith. 2021).
- k-point averages R_k(h) with power savings (Montgomery–Soundararajan 2004), odd k (Bloom–Kuperberg 2025),
  progressions/smooth weights (Kuperberg 2025).
- Number fields, prime *elements*: Σ(𝔖(η)−1) w(·) ∼ −w(0) R_K log Hⁿ with ζ_K(s+1) in the generating
  series (Kuperberg–Rodgers–Roditty-Gershon 2022). This is the only prior appearance of ζ_K(s+1) in a
  singular-series average; it concerns prime elements of K, not prime values of a polynomial, and has
  no explicit formula over zeros.
- Function fields, q → ∞: variance of primes in short intervals / progressions (Keating–Rudnick 2014);
  Bateman–Horn *expectation* for arbitrary F (Entin 2016; Bary-Soroker 2014); a lower-order term for the
  twin-prime count (Gorodetsky–Sawin 2020); variances governed by higher-degree L-functions
  (Hall–Keating–Roditty-Gershon 2019; Hochfilzer 2021). Fixed q: Sawin–Shusterman 2022.
- Bateman–Horn on average over polynomials: L^k and L² prime tuples for 100 % of polynomials
  (Kravitz–Woo–Xu, arXiv:2512.03292); averaged second moment with "worse than square-root" error
  (Bortolussi, arXiv:2604.02287).

**Not in the literature (both surveys, independently).**
1. No asymptotic for Σ_{h≤H}(S_f(h) − C(f)²) for any non-linear irreducible f, not even the leading
   −½ C(f) log H, outside our paper.
2. No explicit formula over zeros of ζ_K, L(χ_D) or any Artin L-function for a *polynomial*
   singular-series average. Existing multi-L-function explicit formulas are in the Goldbach setting
   (Fujii 1991; Bhowmik–Halupczok–Matsumoto–Suzuki 2019; Goldston–Suriajaya 2023).
3. No identification of L(s, Sym² of the permutation representation) in any singular-series second moment.
4. No Goldston–Montgomery-type equivalence "variance of prime values of a fixed non-linear f ↔ pair
   correlation of zeros of ζ_K", and no standalone "Goldston–Montgomery for Dedekind zeta functions";
   the pieces exist (Bui–Keating–Smith 2016 for primitive Selberg-class L; de Laat–Rolen–Tripp–Wagner
   2019 for F_K(α); de la Bretèche–Kuperberg 2024 for prime-ideal moments).
5. No large-q function-field second moment of prime values of a non-linear polynomial over shifts.
6. Equidistribution of roots of congruences of degree ≥ 3 to *prime* moduli is open; to *all* moduli it
   is Hooley 1963/64, reproved conceptually by Kowalski–Soundararajan 2021 (CRT mixing).

**Where the follow-up sits.** The programme (explicit formula for Riesz means of Σ_h S_f(h) with
oscillatory terms indexed by zeros of ζ_K and of the pair-field zeta functions, Ω-results from the first
zero, GRH-conditional bounds, the function-field shadow) is the direct polynomial analogue of
Goldston–Suriajaya 2021 with ζ_K(s+1)E_f(s) as input. The technical novelties are (i) E_f is an infinite
product of L-functions rather than a single 1/ζ(2s+2): natural boundary at Re s = −1, real poles at
s = −1 + 1/k, several zero families; (ii) the off-diagonal (pairs of distinct roots) has no analogue in
the linear case; (iii) oscillation constants need linear independence across several L-functions.

**The RH connection, stated frankly** (this must go into the introduction of the follow-up).
1. Singular-series average → zeros of ζ_K: a **theorem** about an arithmetic function, unconditional
   (explicit formula + Ω-results), sharp constants under GRH + simplicity + Gonek–Hejhal-type bounds.
   It reflects the Möbius-type structure of the local factors, exactly as for Σ μ(n) or Σ 1/φ(n).
2. Singular-series average ↔ variance of primes: a **conjectural transfer** (Hardy–Littlewood/Bateman–Horn
   pair conjecture with power-saving error; Montgomery–Soundararajan 2002/2004). The zero terms are of
   relative size x^{−1/4}·(main power), *below* the O(x^{1/2+ε}) error the transfer tolerates: even
   assuming Bateman–Horn with square-root error, the zeros in the singular-series average are **not**
   transferred to the variance of actual primes. That would need an error o(x^{1/4}), which no heuristic
   supports (Bortolussi 2026 reports worse-than-square-root cancellation on average).
3. Variance of primes ↔ pair correlation of zeros: a **theorem under RH** in both directions
   (Goldston–Montgomery 1987; quantitative: Chan 2003, Languasco–Perelli–Zaccagnini 2012/2017;
   Selberg class: Bui–Keating–Smith 2016). Neither side is known.
4. RH/GRH is an **input** to 3 and to the sharp form of 1, never an output. The only converse is
   "a zero of ζ_K off the line ⇒ E_m/x^{m−3/4} unbounded".
Safe sentence: "Unconditionally, the low-lying zeros of ζ_K govern the second-order fluctuations of the
Riesz means of S_f; under a Bateman–Horn conjecture with power saving these means control the variance
of prime values of f only at a scale above the zero-induced fluctuations; and under GRH the variance is
in turn equivalent (Goldston–Montgomery) to pair correlation of the zeros of ζ_K. We do not claim any
unconditional link between prime values of f and zeros of ζ_K."

**How "primes are more regular than random" is already understood** (do not overclaim).
(a) At the Gallagher scale (intervals of length λ log x) primes are conjecturally Poisson, i.e. exactly
as random as Cramér predicts (Gallagher 1976). (b) At the Montgomery–Soundararajan scale H = N^θ the
variance H log(N/H) is sub-Poisson, the deficit coming from the −½ H log H term in Σ_{h≤H}(H−h)𝔖(h),
i.e. from the sieve structure of the singular series (Cramér–Granville correction); under RH this is
equivalent to Montgomery's F(α) ∼ 1 (Goldston–Montgomery). (c) Zeros of ζ enter only at lower order:
Ω_±(x^{1/4}) in the singular-series average. Our −½ C(f) log H is the polynomial form of (b); our
explicit formula is the polynomial form of (c). Neither is evidence for or against RH.

**Numerical facts for zero detection** (LMFDB, verified).
- L(s,χ₋₄): zeros 6.0209489047, 10.2437703042, 12.9880980123, 16.3426071046, 18.2919931961,
  21.4506113440, 23.2783765205, … ; L(½) ≈ 0.6677. Frequencies γ/2 in u = log x.
- L(s,χ₋₁₆₃): zeros 0.2029013375, 2.3685339468, 4.0550685388, 5.6759750360, 6.9031315816, 7.6358420019, …;
  L(½) ≈ 0.0685. The zero at 0.2029 has period 62 in log x: over any computable range it is a
  non-oscillating x^{m−3/4} term and must be treated as a known component, not detected.
- Resolving ordinates Δγ apart at scale ρ/2 needs a log-x range ≳ 4π/Δγ: 12.988 vs 14.135 needs ≈ 11;
  21.02 vs 21.45 needs ≈ 29 (hopeless).
- GRH for L(s,χ_D), |D| ≤ 400000, is certified to the heights needed (Platt 2016).
- Do not cite a "Bober–Platt listening to the zeros" paper: none exists. The log-x spectral method is
  Rubinstein–Sarnak 1994 and Mazur–Stein 2016.

## 1. Averages of the twin-prime singular series 𝔖(h)

- **Friedlander & Goldston (1995)**, *Some singular series averages and the distribution of Goldbach numbers in short intervals*, Illinois J. Math. 39, 158–180. Σ_{k≤x}𝔖(k) = x − ½log x + O((log x)^{2/3}); Cesàro mean ½x² − ½x log x + ½(1−γ−log 2π)x + O(x^{1/2+ε}) via the Ramanujan-sum expansion. Template for the −½ log H.
- **Montgomery & Soundararajan (2002)**, *Beyond pair correlation*, Bolyai Soc. Math. Stud. 11, 507–514 [partly verified]. k-point averages R_k and the Gaussian-moments heuristic; HL with x^{1/2+ε} error ⇒ variance ⇒ (via GM) strong pair correlation.
- **Montgomery & Soundararajan (2004)**, *Primes in short intervals*, Comm. Math. Phys. 252, 589–617; arXiv:math/0409258. Thm 2: R_k(h) = μ_k(−h log h + Ah)^{k/2} + O(h^{k/2−1/(7k)+ε}), A = 2−γ−log 2π. Thm 3: Gaussian moments of ψ(x+H)−ψ(x)−H from uniform HL. The −½H log H is what turns Cramér's H log N into H log(N/H).
- **Vaughan (2001)**, *On a variance associated with the distribution of primes in arithmetic progressions*, Proc. LMS (3) 82, 533–553. E(x) ≪ x^{1/2}exp(−c(log 2x)^{3/5}(log log 3x)^{−1/5}), ≪ x^{5/12+ε} on RH; also for progressions. No x^{1/2} barrier.
- **Goldston & Suriajaya (2021a)**, *A singular series average and the zeros of the Riemann zeta-function*, Acta Arith. 200, 71–90; arXiv:2007.16099. S_m(x) = x^{m+1}/(m+1) − ½x^m(log x − H_m + γ + log 2π) + E_m(x); Thm 1 (m ≥ 2): E_m(x) = x^{m−1}Σ_{|γ|≤U}a(ρ)x^{ρ/2} + O(x^{m−1+ε}), U ∈ [x⁵, 2x⁵], a(ρ) = 2C₂ m! ζ(ρ/2−1)ζ(ρ/2)G(ρ/2−1)/[(2^{ρ/2}+1)ζ′(ρ)(ρ/2−1)(ρ/2)⋯(ρ/2+m−1)], G(s) = ∏_{p>2}(1 + 2/((p−2)(p^{s+1}+1))). Thm 2 (RH): ≪ x^{m−3/4+ε}. Thm 3: absolutely convergent formula under RH + simplicity + Σ|ζ′(ρ)|^{−2} ≪ T. Thm 4: Ω_±(x^{m−3/4}) (Ingham 1942). Thm 5: lim sup/inf = ±Σ|a(ρ)| under LI. **The template.**
- **Goldston & Suriajaya (2021b)**, *The error term in the Cesàro mean of the prime pair singular series*, J. Number Theory 227, 144–157; arXiv:2007.14616. Ω_±(x^{1/4}) for m = 1 by Landau's theorem from the first zero. Cheap Ω-result for us from the first zero of L(χ_D).
- **Goldston, Ngotiaoco & Ziegler Hunts (2017)**, *The tail of the singular series for the prime pair and Goldbach problems*, Funct. Approx. 56, 117–141; arXiv:1409.2151. **Ge & Liu (2017)**, Lith. Math. J. 57, 294–318 (progressions).
- **Goldston–Suriajaya follow-ups:** none on singular-series averages after 2021 (Suriajaya's list, Sept 2026). Related: *On an average Goldbach representation formula of Fujii*, Nagoya Math. J. 250 (2023), 511–532; Friedlander–Iwaniec, *Note on a note of Goldston and Suriajaya*, arXiv:2105.09038 (weak HL/Goldbach ⇒ no Siegel zeros).
- **Kuperberg, Rodgers & Roditty-Gershon (2022)**, *Sums of singular series and primes in short intervals in algebraic number fields*, Ramanujan J. 58, 291–317; arXiv:2001.09513. Σ_{η≠0}(𝔖(η)−1)w(m(η)/H) ∼ −w(0)R_K log Hⁿ; contour integrals of ζ_K(s+1)F(s); Conjecture 5: universal variance factor 1−δ. **Closest prior "ζ_K in a singular-series average".**
- **de la Bretèche & Fiorilli (2021)**, *On a conjecture of Montgomery and Soundararajan*, Math. Ann. 381, 575–591; **de la Bretèche & Kuperberg (2024)**, *Lower bounds on weighted moments of primes in short intervals in number fields*, Israel J. Math., doi 10.1007/s11856-024-2711-0; arXiv:2305.02662. Lower bounds matching MS moments; number-field version.
- **Kuperberg (2025)**, *Odd moments in the distribution of primes*, Algebra & Number Theory 19(4), 617–666; arXiv:2109.03767; *Sums of singular series along arithmetic progressions and with smooth weights*, IJNT (2025), arXiv:2301.06095; *Sums of singular series with large sets…*, arXiv:2210.09775. **Bloom & Kuperberg (2025)**, *Odd moments and adding fractions*, Proc. LMS 131, e70068; arXiv:2312.09021.
- **Lemke Oliver & Soundararajan (2016)**, *Unexpected biases in the distribution of consecutive primes*, PNAS 113, E4446–E4454. Secondary terms of −½ log H type produce visible biases.
- **Goldston & Yıldırım (1998)**, *Primes in short segments of arithmetic progressions*, Canad. J. Math. 50, 563–580.
- **Kowalski**, *Averages of Euler products, distribution of singular series and the ubiquity of Poisson distribution*, arXiv:0805.4682 (Acta Arith. 148 (2011) [journal unverified]).

## 2. Second moments for prime values of polynomials; Bateman–Horn on average; random models

- **Baier & Zhao (2007)**, *Primes in quadratic progressions on average*, Math. Ann. 338, 963–982; **(2009)** IJNT 5 (arXiv:math/0701577); **Foo & Zhao (2013)**, *On primes represented by cubic polynomials*, Math. Z. 274, 323–340. Barban–Davenport–Halberstam-type second moments over the *family* n²+k, not over shifts h.
- **Kravitz, Woo & Xu (2025)**, *The distribution of prime values of random polynomials*, arXiv:2512.03292. 100 % of polynomials satisfy BH in L^k and the polynomial prime-tuples conjecture in L²; Poisson gaps. (Leng's higher-order Fourier uniformity.)
- **Browning, Sofos & Teräväinen (2022/26)**, *Bateman–Horn, polynomial Chowla and the Hasse principle with probability 1*, arXiv:2212.10373.
- **Bortolussi (2026)**, *Worse than square-root cancellation in Bateman–Horn's conjecture*, arXiv:2604.02287. Average over P ∈ Pol_d(H), x ≤ (log H)^δ, of |ψ_P(x) − x𝔖_P(x)|² = x log H + …; contains Σ_P 𝔖_P². Read before citing as a "BH variance" result.
- **Sofos (2026)**, arXiv:2606.15698; **Banks & Ford (2026)**, *Sets of integers satisfying Bateman–Horn statistics*, arXiv:2605.01155; **Banks, Ford & Tao (2023)**, *Large prime gaps and probabilistic models*, Invent. Math. 233, 1471–1518; **Demangos, Longhi & Saettone (2026)**, arXiv:2606.29250; **Volfson (2026)**, arXiv:2604.25969, arXiv:2606.28832 (single-author preprints; care).
- **Táfula (2025/26)**, *A note on the Cramér–Granville model*, Arch. Math. (Brno) 126, 275–283; **Granville (1995)**, Scand. Actuar. J. 1995, 12–28; **Gallagher (1976)**, Mathematika 23, 4–9; **Jha (2026)**, *The Poisson Tail Conjecture…*, arXiv:2605.23014.
- **Numerics/constants:** Shanks (1975), Math. Comp. 29, 271–287; Jacobson & Williams (2003), Math. Comp. 72, 499–519; Cohen (1998), *High precision computation of Hardy–Littlewood constants*, preprint; Moree (2000), Manuscripta Math. 101, 385–399; Ettahri, Ramaré & Surel (2021), Math. Comp. 90, 2247–2265 (Euler products over Frobenius classes via L-functions).
- **Not found:** any published pair statistic Σ_n 1_P(f(n))1_P(f(n+h)) vs S_f(h) for fixed non-linear f, or a variance of Σ_n 1_P(f(n)) over n-intervals.

## 3. Function-field analogues

- **Keating & Rudnick (2014)**, *The variance of the number of prime polynomials in short intervals and in residue classes*, IMRN 2014(1), 259–288; arXiv:1204.0708. Variance = matrix integral (Katz equidistribution).
- **Bary-Soroker (2014)**, IMRN 2014(2), 568–575; **Bank, Bary-Soroker & Rosenzweig (2015)**, Duke 164, 277–295; **Bank & Bary-Soroker (2015)**, JNT 151.
- **Entin (2016)**, *On the Bateman–Horn conjecture for polynomials over large finite fields*, Compos. Math. 152, 2525–2544; arXiv:1409.0846. Expectation only.
- **Gorodetsky & Sawin (2020)**, *Correlation of arithmetic functions over F_q[T]*, Math. Ann. 376, 1059–1106; arXiv:1811.04834. Lower-order term for #{f: f, f+Δ irreducible}. **Natural place for the function-field shadow of −½C log H.**
- **Andrade, Bary-Soroker & Rudnick (2015)**, Phil. Trans. R. Soc. A 373, 20140308; **Bary-Soroker & Fehm (2019)**, IMRN 2019(14), 4469–4515; **Hast & Matei (2019)**, IMRN 2019(21), 6554–6584.
- **Hall, Keating & Roditty-Gershon (2019)**, Algebra Number Theory 13 [partly verified]; arXiv:1703.09190; **Hochfilzer (2021)**, arXiv:2102.06415. Variances governed by degree ≥ 2 L-functions (two regimes). **Closest precedent for a variance governed by an Artin L-function.**
- **Kuperberg & Lalín (2022)**, Forum Math. 34, 711–747 (divisor functions, symplectic; not singular series).
- **Kurlberg & Rosenzweig**, arXiv:1802.01215; **Palimar (2019)**, arXiv:1909.03778 (quadratics, expectation).
- **Sawin & Shusterman (2022)**, Ann. of Math. 196, 457–506; Invent. Math. 229, 751–927 (fixed q). **Kowalski (2022)**, Bourbaki Exp. 1193.
- **Conrad, Conrad & Gross (2008)**, *Prime specialization in genus 0*, Trans. AMS 360, 2867–2908. Fixed-q BH constants differ (Möbius bias): a caution for Route B.
- **Answer:** no verified paper computes a second moment/variance of prime values of a non-linear f over shifts as q → ∞.

## 4. Equidistribution of roots of polynomial congruences (Hypothesis (E) family)

- **Hooley (1963)**, *On the number of divisors of quadratic polynomials*, Acta Math. 110, 97–114; **Hooley (1964)**, *On the distribution of the roots of polynomial congruences*, Mathematika 11, 39–49 (all moduli, any irreducible f).
- **Duke, Friedlander & Iwaniec (1995)**, Ann. of Math. 141, 423–441 (prime moduli, D < 0); **DFI (2012)**, *Weyl sums for quadratic roots*, IMRN 2012(11), 2493–2549; **Tóth (2000)**, IMRN 2000(14), 719–739 (D > 0); **Ngo (2024)**, BLMS, doi 10.1112/blms.13108.
- **Bykovskii (1984)**, Zap. Nauchn. Sem. LOMI 134 [partly verified]; **Homma (2008)**, JNT 128, 500–508.
- **Marklof & Welsh (2023)**, *Fine-scale distribution of roots of quadratic congruences*, Duke 172, 2303–2364 (pair correlation of the roots!).
- **Kowalski & Soundararajan (2021)**, *Equidistribution from the Chinese Remainder Theorem*, Adv. Math. 385, 107776. **Cleanest modern proof of the all-moduli input.**
- **Dunn, Kerr, Shparlinski & Zaharescu (2020)**, Adv. Math. 375, 107369; arXiv:2601.15448 (2026).
- **Foo (2010)**, Acta Arith. 144, 1–4; **Kitaoka**, arXiv:1706.08636 and the *Notes* series.
- **Cubic and higher to prime moduli: open.** Names "Huang/Ryan/McGrath/Carneiro" could not be connected to any such paper: do not cite.

## 5. ζ_K and Artin L-functions in prime-value statistics; the Bateman–Horn constant

- **Bateman & Horn (1962)**, Math. Comp. 16, 363–367. **Aletheia-Zomlefer, Fukshansky & Garcia (2020)**, Expo. Math. 38, 430–479. **Garcia (2024)**, Notices AMS (Oct).
- **Conrad (2003)**, *Hardy–Littlewood constants*, Springer Int. Ser. Eng. Comput. Sci. 726 [contents from memory]: partial products governed by ζ_K/ζ and Artin L-functions.
- **Foo (2011)** arXiv:1109.3040, 1109.3530: **withdrawn, do not cite.**
- **Not found:** any prior L(Sym² perm. rep.) in a singular-series second moment. **Our identification appears to be new.**

## 6. Goldston–Montgomery, pair correlation, generalisations

- **Montgomery (1973)**, PSPM 24, 181–193. **Goldston & Montgomery (1987)**, Progr. Math. 70, 183–203. **Gallagher & Mueller (1978)**, Crelle 303/304, 205–220 [unverified].
- **Rudnick & Sarnak (1996)**, Duke 81, 269–322 (fixed primitive L: GUE); **Murty & Perelli (1999)**, IMRN 1999(10), 531–545 (zeros of distinct primitive functions uncorrelated ⇒ for ζ_K = ζ·L(χ_D) the union is two independent GUE processes).
- **Chan (2003)**, J. LMS 68, 579–598; **Languasco, Perelli & Zaccagnini (2012)**, JMAA 394, 761–771; **(2017)** Trans. AMS 369, 4235–4250.
- **Bui, Keating & Smith (2016)**, J. LMS 94, 161–185; arXiv:1506.03741. GM for any L in the Selberg class; two regimes for degree ≥ 2. **Template for "GM for ζ_K" (degree 2, non-primitive: handle the factorisation by hand).**
- **de Laat, Rolen, Tripp & Wagner (2019)**, arXiv:1908.04876 (pair correlation for ζ_K, K abelian; > 45 % distinct zeros for quadratic K). **Alsharif (2019)**, PhD thesis, Mississippi.
- **Özlük (1996)**, JNT 59, 319–351; **Yıldırım (1991)**, Manuscripta Math. 72, 325–334; **Chandee, Lee, Liu & Radziwiłł (2014)**, Q. J. Math. 65, 63–87.
- **Kandhil, Languasco & Moree (2026)**, Math. Ann. 394, art. 43; arXiv:2411.19762; arXiv:2607.14515.
- **Grenié, Molteni & Perelli (2017)**, Mathematika 63, 364–371 (GRH for ζ_K ⇒ prime ideals in short intervals). **Leung (2024/26)**, arXiv:2401.04000.
- **Bhowmik, Halupczok, Matsumoto & Suzuki (2019)**, Mathematika 65, 57–97 (explicit formula with zeros of Dirichlet L-functions for Goldbach in progressions). **Fujii (1991)**, Acta Arith. 58 [unverified].
- **Goldston–Suriajaya circle 2022–26:** Res. Number Theory 8 (2022) art. 71; Acta Arith. 214 (2024), 357–376; arXiv:2501.14545, 2503.15449, 2507.06823, 2511.20059.
- **Katz & Sarnak (1999)**, Bull. AMS 36, 1–26; **Özlük & Snyder (1999)**, Acta Arith. 91, 209–228; **Rubinstein (2001)**, Duke 109, 147–181; **Fiorilli, Parks & Södergren (2017)**, Compositio 153, 1196–1216 (symplectic family of L(s,χ_D); the tiny first zero of L(χ₋₁₆₃) is the class-number-one exception).
- **Rubinstein & Sarnak (1994)**, Exp. Math. 3, 173–197; **Mazur & Stein (2016)**, CUP; **Platt (2016)**, Math. Comp. 85, 3009–3027; **Ingham (1942)**, Amer. J. Math. 64, 313–319; **Tollis (1997)**, Math. Comp. 66, 1295–1321.

## 7. Landau's problem and related (for the "what is conditional on what" paragraph)

- Iwaniec (1978), Invent. Math. 47, 171–188 (n²+1 is P₂); Friedlander & Iwaniec (1998), Ann. of Math. 148, 945–1040; Heath-Brown (2001), Acta Math. 186, 1–84; Heath-Brown & Li (2017), Invent. Math. 208 [pages unverified]; Merikoski (2023), JEMS 25, 1253–1284; Grimmelt & Merikoski (2025), arXiv:2505.00493; Green & Sawhney (2024), arXiv:2410.04189 (p²+nq²; journal status unverified). No 2025–26 progress towards infinitely many primes n²+1.

## 8. 2024–2026 arXiv sweep

No paper matching "singular series average / Riesz mean", "pair correlation of prime values of polynomials", "variance of Bateman–Horn", "explicit formula singular series" beyond the items above. Worth a look: arXiv:2509.24152 *Short interval variance and averaged correlations of arithmetic functions* [title only]; arXiv:2405.03540 [title only]; Tao, arXiv:2308.07205.

## 9. Corrections to the prompt / caveats

Chan's JLMS paper is 2003 (vol. 68). "Kuperberg–Lalín" is about divisor functions. Green–Sawhney's Acta acceptance is second-hand. Conrad 2003 contents, Vaughan 1998, Gallagher–Mueller 1978, Fujii 1991, Skorobogatov–Sofos 2023, Carmon–Rudnick 2014: from memory, check before citing.
