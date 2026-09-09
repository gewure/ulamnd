"use client";

export default function TheoryPanel() {
  return (
    <div className="h-full overflow-auto p-6 prose">
      <h2 style={{ marginTop: 0 }}>What this tool computes, and what it can and cannot say about the Riemann Hypothesis</h2>
      <p>
        This page is written for a computer scientist who wants to use the workbench seriously. It states the definitions precisely, proves the one theorem that underlies the whole “polynomial pattern” thesis, explains
        the number-theoretic quantities in the panels, and is candid about the gap between spiral patterns and the Riemann Hypothesis.
      </p>

      <h2>1. The d-dimensional spiral</h2>
      <p>
        <b>d = 2.</b> The classic Ulam spiral: 1 at the origin, 2 at (1,0), 3 at (1,1), turning counter-clockwise (in y-up coordinates; on a screen with y pointing down this is the clockwise picture you know). Ring k
        (Chebyshev norm k) holds the numbers (2k−1)²+1 … (2k+1)².
      </p>
      <p>
        <b>d ≥ 3.</b> Shell k = all lattice points with max|xᵢ| = k. It holds exactly the numbers (2k−1)ᵈ+1 … (2k+1)ᵈ, and is filled by “extending the spiral into the new direction first”: the (d−1)-dimensional ring of
        radius k is swept through the new axis x_d in the order x_d = 0, +1, −1, +2, −2, …, ±(k−1); within each layer the ring is walked in the (d−1)-dimensional spiral order. The two caps x_d = +k and x_d = −k are then
        filled with the complete (d−1)-dimensional ball of radius k (the first (2k+1)^(d−1) numbers of the (d−1)-dimensional spiral). The map n ↦ coordinates is a bijection ℕ → ℤᵈ, and the box [−R, R]ᵈ contains
        exactly the numbers 1 … (2R+1)ᵈ. Consecutive numbers are adjacent inside a layer but not across layers or caps; the theorem below does not need adjacency.
      </p>

      <h2>2. Theorem: every lattice line carries a polynomial of degree d</h2>
      <p>
        <b>Claim.</b> Let b ∈ ℤᵈ and v ∈ ℤᵈ \ {0}. Then there is t₀ such that the number n(t) sitting at b + t·v is, for all t ≥ t₀, given by a single polynomial fₐ(t) ∈ ℚ[t] of degree exactly d (integer-valued, with
        denominator dividing d!). The opposite ray b − t·v has its own polynomial. In two dimensions these are the well-known quadratics 4t² + bt + c of Ulam’s diagonals. Before t₀, while the ray still runs inside a single shell, n follows a
        transient of lower degree (in 2D a linear function along a ring side); the tool reports only the degree-d regime.
      </p>
      <p>
        <b>Proof sketch.</b> For t large, the shell index k(t) = maxᵢ|bᵢ + t·vᵢ| is a linear function of t (the coordinate attaining the maximum stabilises once one coordinate dominates or ties are exact). The number is n
        = (2k−1)ᵈ + 1 + (offset within the shell). By induction on d the offset is a polynomial of degree at most d−1 in k: for d = 2 the position along a ring side is linear in k; for d ≥ 3 the point lies either in the
        band, where offset = (layer index)·(ring size in d−1 dims) + (offset in the (d−1)-ring), or in a cap, where offset = (band size) + (position in the (d−1)-ball). The layer index is linear in t, the ring size
        (2k+1)^(d−1) − (2k−1)^(d−1) has degree d−2 in k, and the recursive offsets have degree ≤ d−1 by induction. Which case applies stabilises for large t. Hence n(t) = (2k(t)−1)ᵈ + (degree ≤ d−1) has degree
        exactly d, with leading coefficient (2|vⱼ|)ᵈ where j is the dominating coordinate. ∎
      </p>
      <p>
        The tool does not rely on this proof: for every ray it computes the sequence exactly, finds t₀ by exact finite differences (BigInt), recovers the rational coefficients, and verifies them on 2d+10 further points.
        So <i>“the patterns are polynomial when the dimension is increased” is true by construction</i>, in every dimension, and you can read off each polynomial. The scientific question is what the primes do on those
        polynomials.
      </p>

      <h2>3. Why the Ulam spiral shows diagonals: Hardy–Littlewood and Bateman–Horn</h2>
      <p>
        For an irreducible polynomial f of degree g with positive leading coefficient and no prime dividing all its values, the Bateman–Horn conjecture (1962; for quadratics this is Hardy–Littlewood’s Conjecture F, 1923)
        predicts
      </p>
      <p className="math">#{"{"} t ≤ T : f(t) prime {"}"} ~ C(f) · Σ_(t ≤ T) 1 / ln f(t), C(f) = Π_p (1 − ω(p)/p) / (1 − 1/p),</p>
      <p>
        where ω(p) is the number of solutions of f(t) ≡ 0 (mod p). The infinite product converges (conditionally) and is computed here over all primes p ≤ 2000 (p ≤ 1000 for d ≥ 5), with the exact period p^(v+1)
        needed when the denominator of f is divisible by p. If ω(p) = p for some p, then p divides every value and the line contains at most one prime: those are the visibly empty lines. If f is reducible it also
        contains at most finitely many primes even when C(f) ≠ 0; the tool flags this indirectly, because such a ray shows zero primes in the extrapolation.
      </p>
      <p>
        The constant C(f) varies a lot between polynomials. Euler’s t² + t + 41 has C ≈ 3.3 (this tool reproduces that); many lines have C well below 1. In the Ulam spiral you are literally seeing the map t ↦ C(f_line):
        lines with large C look dense, lines with small C look empty. Nothing else is known to be needed to explain the picture, and every quantitative check made so far (including the ones in this tool) agrees with
        the prediction to within the expected √(count) fluctuations.
      </p>
      <p>
        In d dimensions the same applies with degree-d polynomials. Along a line at shell distance k the numbers are ≈ (2k)ᵈ, so the local prime density is ≈ C(f) / (d·ln 2k). For a fixed number of integers in the box
        the prime density is the same in every dimension (it is 1/ln N), but the lines become shorter ((2R+1) points against (2R+1)ᵈ numbers), so single-line statistics get noisier as d grows. That is why the tool
        aggregates over all lines (the dispersion index Φ) instead of trusting individual “rich lines” in high dimension.
      </p>

      <h2>4. The measurements</h2>
      <ul>
        <li>
          <b>Expected count E</b> of a line = Σ 1/ln n over its points: the “random primes” null model (Cramér). <b>z = (A − E)/√E</b>.
        </li>
        <li>
          <b>Dispersion index Φ</b> = Σ(A−E)²/E / (lines − 1). Equal to 1 if primes were independent coin flips; larger if lines differ systematically. Bateman–Horn predicts Φ ≈ 1 + (mean E)·Var(C) over the lines of the
          box. Since Ē shrinks rapidly with d (lines have only 2R+1 points), the size-normalised <b>(Φ−1)/Ē ≈ Var(C)</b> is the number to compare across dimensions.
        </li>
        <li>
          <b>Empty lines</b> observed against Σ exp(−E): the excess counts lines with a fixed prime divisor (C = 0).
        </li>
        <li>
          <b>Extrapolation.</b> Because the polynomial is exact, a ray can be followed far beyond the box: values are tested with a deterministic Miller–Rabin (below 3.3·10²³; probable primes beyond) and compared with
          C(f)·Σ 1/ln f(t). Ratios near 1 mean the line is exactly as rich as conjectured, and no richer.
        </li>
        <li>
          <b>Diffraction.</b> The 2D Fourier power spectrum of the prime indicator in a window of the slice, and its autocorrelation. Periodic order gives lattice Bragg peaks, quasiperiodic order (Penrose) gives sharp
          peaks with non-crystallographic symmetry on a dense set, disorder gives a diffuse background. The prime field shows lattice peaks from residues mod 2, 3, 5 (the strongest at (½,½): all odd primes sit on a
          checkerboard because n ≡ x + y + 1 mod 2 on the Ulam spiral) over a diffuse background. A 5- or 8-fold star would be the quasicrystal signature; none is expected, and none has been seen.
        </li>
      </ul>

      <h2>5. The Riemann Hypothesis, and the honest connection</h2>
      <p>
        RH states that all non-trivial zeros of ζ(s) have real part ½. By the explicit formula, ψ(x) = x − Σ_ρ x^ρ/ρ − ln 2π − ½ ln(1 − x⁻²), the real parts of the zeros are exactly the exponents of the fluctuations of
        the prime counting functions. Hence (von Koch 1901, Schoenfeld 1976 with explicit constants) RH is <i>equivalent</i> to each of
      </p>
      <p className="math">|π(x) − li(x)| &lt; √x ln x / 8π (x ≥ 2657), |ψ(x) − x| &lt; √x ln²x / 8π (x ≥ 73.2), M(x) = O(x^(1/2+ε)),</p>
      <p>
        where M is the Mertens function Σ μ(n). The Riemann panel computes these from the sieve and plots each ratio against its bound; it also computes the zeros of ζ on the critical line (Borwein’s algorithm plus the
        Riemann–Siegel θ) and shows the explicit formula rebuilding ψ from them. Every finite computation of this kind confirms RH in its range and proves nothing beyond it; that is the nature of the problem.
      </p>
      <div className="callout">
        <p>
          <b>Where the spiral thesis stands relative to RH.</b> The visible structure of a prime spiral in any dimension is a <i>main-term</i> phenomenon: it is governed by the singular series C(f), i.e. by
          congruence information modulo small primes. RH is an <i>error-term</i> statement about fluctuations of size √x. The two live at different scales, and there is no known theorem, in either direction, linking the
          appearance of prime spirals to the location of zeta zeros. Worse for the thesis, the main terms along polynomial lines (Bateman–Horn for degree ≥ 2) are themselves unproven and are believed to be far harder
          than RH; even the existence of infinitely many primes of the form t² + 1 is open. What a tool like this <i>can</i> do is falsify: any line, dimension, or statistic that deviates from the Bateman–Horn prediction
          beyond √E fluctuations, persistently and increasingly with the range, would be a real discovery. The dispersion index, the extrapolated ratios and the cross-dimension comparison are designed to find such a
          deviation if it exists.
        </p>
      </div>

      <h2>6. Fibonacci dimensions</h2>
      <p>
        There is no known mechanism by which d = 2, 3, 5, 8 should behave differently from d = 4, 6, 7: the constructions and the heuristics above depend on d only through the degree of the polynomials and the length
        of the lines. That makes the hypothesis cleanly testable. The Compare panel builds boxes with the same number of integers in each dimension (so the prime density 1/ln N is matched), scans every lattice line, and
        reports Φ, sd(z), the empty-line excess and the richest polynomials per dimension. The null hypothesis is a smooth, monotone dependence on d; a kink at the Fibonacci dimensions relative to the controls would
        contradict it. Run it with the largest N your machine allows, and repeat with a different N, because a genuine effect must survive a change of scale.
      </p>

      <h2>7. Limits of the implementation</h2>
      <ul>
        <li>All numbers are exact below 2⁵³; coordinates and boxes are kept well inside that. Polynomial values in the extrapolation are exact BigInts.</li>
        <li>The whole-box scan quantises 1/ln n on 512 logarithmic bins (relative error below 1%); the point analysis uses exact logarithms.</li>
        <li>C(f) is a truncated Euler product; the truncation error for degree-2 polynomials is a few percent and grows with the degree.</li>
        <li>Memory: about 5 bytes per integer in the box. Boxes above 16 million numbers are allowed but warned; above 48 million they are refused.</li>
        <li>ζ(½+it) is evaluated by Borwein’s alternating series with enough terms for t ≤ 300; zeros are located by sign changes of Hardy’s Z and bisection, accurate to about 10⁻⁶.</li>
      </ul>

      <h2>8. Suggested experiments</h2>
      <ol>
        <li>d = 2, R = 1000. Scan lines. Click the richest line; confirm its polynomial and that the extrapolated ratio is ≈ 1. Check that C(f) ranks the lines in the same order as the observed z.</li>
        <li>Switch colour mode to “residue mod 6” to see that the diagonal pattern is largely the residue classes 1 and 5 mod 6 arranged by the quadratic map.</li>
        <li>d = 3, R = 80. Look at slices x₃ = 0, ±1, …: the 2D structure of each layer is a piece of the same Ulam ring family, with cubic lines running through the layers. Scan lines and compare Φ for axis-parallel versus diagonal directions.</li>
        <li>Compare panel with all of d = 2 … 8 at 2 million numbers, then at 4 million. Plot Φ against d and look for anything that is not smooth.</li>
        <li>Diffraction at 512×512 in 2D: identify each peak with a residue class; then try a slice in d = 3 and see which peaks survive.</li>
      </ol>
      <h2>9. Results of the thesis test suite</h2>
      <p>
        <code>npm run thesis</code> runs nine falsifiable experiments against the engine and writes <code>thesis/REPORT.md</code>; <code>thesis/CONCLUSIONS.md</code> reads them. In summary: every lattice ray is a
        degree-d polynomial (verified on 5,070 rays, zero exceptions); the prime counts on 430 rays followed far beyond the sieve agree with Bateman–Horn to within one standard error in every dimension; inside the box
        the dispersion across rays (Φ = 28 in 2D) is predicted quantitatively by the spread of the constants C(f) (27.8) and collapses below 1 once each ray is weighted by its own constant; the Fibonacci dimensions sit on
        the same smooth curve as the controls; all diffraction peaks are rational with denominators 2, 3, 6. The one quantity not explained by the main term is that primes on polynomial rays fluctuate <i>less</i> than
        independent trials (dispersion 0.4–0.8 against a random control of 1.0), the polynomial analogue of the variance deficit of primes in short intervals.
      </p>
      <p className="text-muted">
        References: Hardy & Littlewood, “Partitio Numerorum III” (1923); Bateman & Horn, Math. Comp. 16 (1962); von Koch, Acta Math. 24 (1901); Schoenfeld, Math. Comp. 30 (1976); Borwein, “An efficient algorithm for
        the Riemann zeta function” (2000); Baake & Grimm, “Aperiodic Order” (2013) for diffraction of point sets.
      </p>
    </div>
  );
}
