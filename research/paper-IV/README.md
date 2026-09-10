# Paper IV — the window (scaffold, 11 September 2026)

**The problem, carried over verbatim from paper III, Theorem A′.** For an irreducible quadratic f with discriminant D,
squarefree u with ω(u) ≥ 1, length Y = H/u and L = log H, the *window* of piece u is

    W_u(Y; L) = Σ_{Y < d' ≤ u²Y L} (λ(d')/d') [ Σ_{x ∈ R^{(u)}_{d'}, <x>_{d'} ≤ Y} (Y − <x>_{d'}) − ω(d') Y²/(2d') ],

where d' runs over squarefree moduli coprime to u all of whose primes split, R^{(u)}_{d'} = {x mod d' : u²x² ≡ D} (the roots
of x² ≡ D dilated by ū), λ(p) = p/(p − 2ω(p)). Unconditionally (paper III, Thm A′)

    Off*_f(H) = c_off(f) H + Σ_{u ≤ H^{2/3+ε}} w(u) W_u(H/u; log H) + O(H (log H)^{1−c}),

so the Cesàro form of Hypothesis (E), hence the leading term −½C(f) log H of Conjecture 1, is EQUIVALENT to

    (W)   Σ_{u ≤ H^{2/3+ε}} w(u) W_u(H/u; log H) = o(H log H),

and "Off* = c_off H + o(H)" (the constant) needs the same sum to be o(H). Trivial size of the sum: H log H (each window
has trivial size Y log(u² L); the sum over u of w(u)/u is a log). A saving of any unbounded factor suffices for (W).

Exact Fourier form (paper III, Lemma finfourier): the bracket equals (1/(2d')) Σ_{0<k<d'/2} (1 − cos(2πkY/d'))/sin²(πk/d') · ρ_k(d'),
ρ_k(d') = Σ_{x ∈ R^{(u)}_{d'}} e(kx/d'): flat weight ≍ Y²/d' for k ≤ d'/Y (up to u²L frequencies), then k^{-2} decay.

What is known: u = 1 (DFI 2012 + sharp cut-off lemma) gives a power saving; u > H^{2/3+ε} is handled by averaging the
dilations (paper III, Thm Type II); a Weyl-sum hypothesis W(θ,B) closes (W) iff 5θ + 6B < 3 (3θ + 3B < 2 if the Type II
range were u > H^{1/2+ε}). The open range is roughly H^{1/10} < u < H^{2/3}, and for the constant all u > 1.

Files: BRAINSTORM.md (routes, ratings, tests), LITERATURE.md (verified references, to be filled from the research round).
