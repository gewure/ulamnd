# Can the paired system replace J₆ in our residual sum? (16 Sep, own analysis while the source verification runs) — NOT READ, NOT A CLAIM

## The object
The residual of §12 at the band is, for each modulus d ≍ Y, frequency k and root r (m := d/(k,d), a := (k/g)r n₃* a unit mod m, N₁ ≈ N₂ ≈ m^{1/4}):
  S = Σ_{x₁≤N₁} Σ_{x₂≤N₂} α₁(x₁) α₂(x₂) e_m(a x₁* x₂*).
Bourgain–Garaev's Hölder step turns |S|^{2k₁k₂} into m·N₁^{…}N₂^{…}·J_{2k₁}(N₁)J_{2k₂}(N₂), and at N_i ≈ m^{1/4} the binding one is J₆, which is at a named barrier (§38).

## Where a paired system naturally lives
Korolev's paired count Jp(Y) = #{y₁*+y₂* ≡ y₃*+y₄*, y₁+y₂ ≡ y₃+y₄ (mod q), y_i ≤ Y} is the natural energy for phases carrying BOTH a variable and its inverse, i.e. for sums of
Kloosterman type Σ_y e_q((ay* + by)/q) (Karatsuba's method). Our phase carries only reciprocals, so the paired count does not appear by itself. Two routes could produce it.

## Route A: complete one variable first
Write S = Σ_{x₂}α₂(x₂)T(x₂), T(x₂) = Σ_{x₁}α₁(x₁)e_m(a x₂* x₁*). Completing the x₁-sum by Poisson modulo m,
  T(x₂) = (N₁/m) Σ_{h∈Z} Ŵ(hN₁/m) S(a x₂*, h; m),  S(c,h;m) = Σ*_{z mod m} e_m(cz* + hz),
so the inner object now carries both z and z*. Applying Cauchy–Schwarz in x₂ and expanding the Kloosterman sums gives, for each pair (h, h′),
  Σ_{x₂} e_m(a x₂*(z* − w*) + (hz − h′w)),
and the natural fourth-moment count attached to the z, w variables is exactly a paired system: the z-side congruence is on reciprocals, the h-side on the arguments. The
question is whether the h-average (|h| ≤ m/N₁ ≈ m^{3/4}) is long enough to make that count the governing one, or whether the dual length again forces a plain energy.
COST CHECK (crude): completing costs (N₁/m)·(m/N₁) = 1 in count but replaces a sum of length N₁ ≈ m^{1/4} by one of length m over z with a dual sum of length m^{3/4} over h; the
paired bound Jp ≪ Y²q^{o(1)} would have to be applied at Y ≈ m^{1/4} (the x₂-variable) — which is exactly the regime where our numerics (§38) show it is trivial.

## Route B: the reciprocity picture
Before the residual is formed, the phase is e_d(k r ū) with u = n₁n₂n₃ and ū the inverse mod d. Reciprocity gives ū/d ≡ −d̄/u + 1/(ud) (mod 1), so
  e_d(k r ū) = e_u(−k r d̄)·e(kr/(ud)),
i.e. the SAME sum written with modulus u ≈ Y^{1/2}, phase carrying d̄ (an inverse) and a smooth factor carrying u in the denominator (an argument). In that picture both an inverse
and the variable itself appear, which is the shape Korolev's method wants — but §26(2) showed that the elementary route back is circular for the dispersion; what matters here is
whether the paired ENERGY, not the dispersion, survives the switch.

## What has to be decided (in this order)
1. Korolev's exact statement and hypotheses, and whether a bilinear Kloosterman-fraction bound has ever been derived from a paired count (source verification running).
2. If yes: which of Route A or Route B produces the paired count with the right variable in the right range; then a full exponent count.
3. A numerical test of the resulting bound at our sizes BEFORE any claim (F24), as was done for J₄, J₆ and Jp.
Nothing here is a claim; Route A is the one I would try first, because it keeps the modulus m and needs no reciprocity.

## VERDICT (16 Sep, after source verification — PROOFS §41): THE LEAD IS DEAD. Routes A and B are both closed for our sum.
The paired bound is real: M. A. Korolev, "Kloosterman sums with primes to composite moduli", arXiv:1911.09981 §2 Lemma 3 (= Research in Number Theory 6 (2020), art. 24):
for any integer q ≥ q₀ and variables in a dyadic block N < x_i, y_i ≤ N₁ ≤ min(cN, q),
  I_q(N) := #{x₁*+x₂* ≡ y₁*+y₂*, x₁+x₂ ≡ y₁+y₂ (mod q)} < (2c)³ 2^{ω(q)}τ₃(q)N²,
with an absolutely explicit constant and no threshold in N. (Our report of it had three inaccuracies: the interval is a dyadic block, q need not be composite, and in the paper I_q is
the paired count while J_q is Heath-Brown's plain energy — the names are swapped.) The proof is two pages and elementary: both symmetric functions of (x₁,x₂) get pinned, so the pair
is the root set of a fixed quadratic. Consequences that ARE free: the unit twist a(y₁+y₂) ≡ a(y₃+y₄), and y₁y₂ ≡ y₃y₄ in place of the additive congruence. What is NOT free: any
six-variable analogue — two symmetric functions pinning two roots is the entire mechanism.
The substitution we hoped for exists in exactly one place, Lemma 4 of the same paper (three Cauchy–Schwarzes giving |C|⁸ ≤ 2‖α‖₂⁸‖β‖_∞⁸N⁵I_q(N)J_q(M)), and it does not transfer:
 • Korolev's phase carries an additive term b·mn with (ab, q) = 1; it is that term which survives the Cauchy–Schwarz and puts y₁+y₂ into the exponential. Our residual sum is the
   b = 0 case, where the additive symmetric function is invisible and the plain energy reappears. Route A's completion does produce Kloosterman sums carrying both z and z*, but the
   variable whose energy is needed is x₂, and for x₂ the additive congruence is not generated.
 • Even if it could be formed it would buy nothing at our size: I_q ≪ N²q^{o(1)} beats Heath-Brown only for N > q^{1/3}, while at N ≈ q^{1/4} Heath-Brown already gives the optimal
   N²q^{o(1)} — the FOUR-variable energy was never the obstruction there. The obstruction is J₆, and the paired mechanism has no six-variable analogue.
 • Korolev's own bilinear output is non-trivial only for M²N > q and MN² > q, i.e. M ≈ N > q^{1/3}: at q^{1/4} it is worse than trivial.
So the band at u ≈ H^{1/3} still needs either a J₆-type bound below N⁴ at N ≈ m^{1/4} (no bound exists; named barrier, §38) or a genuinely different mechanism.
