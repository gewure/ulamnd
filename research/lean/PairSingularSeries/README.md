# PairSingularSeries — Lean 4 / Mathlib formalisation of paper I, Theorems 1 and 5

Formalisation of

> J. Reichardt, *The pair singular series of a polynomial I*, Section 3 (Theorems 1 and 5),

against Mathlib, with every object stated in arithmetic form (root counts modulo `d` over `[0, d)`;
the root Ramanujan sum defined by its divisor sum), so no exponential sums appear. `STATUS.md` is the
statement-by-statement table; `../FORMAL-PLAN.md` records the plan and the paper ↔ Lean correspondence.

## What is verified (61 theorems, no `sorry`, standard axioms only)

* **Theorem 1 in full**: the exact finite identity `∏_{p≤x} T_p(h) = (∏_{p≤x} E_p)² ∏_{p≤x}(1 + g_p(h))`
  (`Spartial_eq`), the absolute convergence of `∑_q μ(q)² b(q) c^f_q(h)` and its Euler product, hence
  `S_f(h) = C(f)² ∑_q μ(q)² b(q) c^f_q(h)` (`expansion`, `Sf_eq`) and eq. (identity)
  `∑_{h≤H}(S_f(h) − C²) = C² ∑_d W_f(d) Ψ_d(H)` exactly as printed (`eq_identity`).
* **Theorem 5**: the exact identity of its proof, in the CORRECTED form
  `∑_{h≤H}(H−h)(S_f(h) − C²) = C²(∑_d W_f(d) ∑_{s,s'} B_d(s'−s) + H/2)` (`eq_smoothed_exact`) — the
  paper's display lacked the `+H/2`, see ERRATA 43 — its split into diagonal and `Off*` (`tsum_split`,
  `eq_smoothed_split`), part (i) (`OffStar_eq_zero_of_omega_le_one`), and **eq. (smoothed)** as an
  explicit `O(1)` bound (`smoothed`):
  `|∑_{h≤H}(1 − h/H)(S_f(h) − C²) + ½C log H − (C²/H) Off*_f(H)| ≤ (C²/2)K₂ + C²K₃/8 + C²(K₂ + 2/C) + C²/2`
  for `H ≥ 2`.
* The reusable tools, each independent of the project and a candidate for Mathlib: a Chinese-remainder
  counting lemma for arbitrary predicates (`card_filter_crt`); absolute summability of a multiplicative
  function vanishing off squarefree numbers from summability at the primes
  (`summable_abs_of_squarefree_mult`); regrouping of a summable double series along divisor
  antidiagonals (`tsum_sum_divisorsAntidiagonal`); a tail bound by discrete Abel summation with no
  integrals (`tail_div_le`).

## What is assumed — the fine print, verbatim for the paper

Every theorem takes `Admissible f`: positive degree, no fixed prime divisor (`ω_f(p) < p`), and the
resultant condition (for `h ≠ 0` a nonzero integer divisible by every prime modulo which `f(t)`, `f(t+h)`
have a common root). `admissible_of_irreducible` derives it from irreducibility of `f` over `ℚ` together
with "no fixed prime divisor" — the paper's own hypotheses, literally. Part (ii) of Theorem 5 is
`smoothed_iff`. Beyond that:

| hypothesis | where | what it is |
|---|---|---|
| (E1) `∏_{p≤x} E_p → C` (and `0 < C` for eq. (smoothed)) | `expansion`, `eq_identity`, `eq_smoothed_*`, `smoothed` | existence of the Bateman–Horn constant `C(f)`: Landau's prime ideal theorem for `Q[t]/(f)`; not in Mathlib |
| (E2) `∀ n ≥ 1, |∑_{d≤n} a_f(d) − C⁻¹ log n| ≤ K₂` | `smoothed` | paper I, Theorem 2 (the Dedekind zeta function of `Q[t]/(f)`); not in Mathlib |
| (E3) `∀ n ≥ 1, ∑_{d≤n} d |a_f(d)| ≤ K₃ n` | `smoothed` | Shiu's theorem; not in Mathlib |

The exact identities of Theorem 5 and everything in Theorem 1 except the final passage to the limit carry
no hypothesis beyond `Admissible f`. Nothing is an axiom: `Axioms.lean` prints, for each theorem,
`[propext, Classical.choice, Quot.sound]`.

## Build and check

    elan (https://github.com/leanprover/elan) · then in this directory:
    lake exe cache get && lake build          # ~1 min after the cache
    grep -c sorry PairSingularSeries/*.lean   # every count is 0
    lake env lean Axioms.lean                 # 61 lines, each ending in the standard three axioms

Toolchain and Mathlib revision are pinned in `lean-toolchain` and `lake-manifest.json`.

## Files

`Defs` (all objects) · `Bd`, `Bracket` (closed form of `B_d(m)`, bracket, bounds) · `Finite` (the
identities in `h`) · `CRT`, `Mult` (multiplicativity) · `Hyp` (the hypotheses; root bound via `ZMod p`) ·
`SqfreeSummable`, `Expansion` (Theorem 1) · `Identity`–`Identity4`, `Regroup`, `Theorems` (the weighted
identity and both paper identities) · `Split`, `Split2` (diagonal/off-diagonal, part (i)) · `Tail`,
`Asymptotic` (the tail bound and eq. (smoothed)) · `Equivalence` (part (ii)) · `Irreducible` (irreducibility ⇒ the resultant condition).
