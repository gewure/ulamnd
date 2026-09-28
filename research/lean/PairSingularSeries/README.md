# PairSingularSeries — Lean 4 / Mathlib formalisation of paper I, Theorems 1 and 5

Formalisation of the elementary content of

> J. Reichardt, *The pair singular series of a polynomial I*, Section 3 (Theorems 1 and 5).

Everything is stated in arithmetic form (root counts modulo `d` over `[0, d)`; the root Ramanujan
sum defined by its divisor sum), so no exponential sums appear. See `../FORMAL-PLAN.md` for the
correspondence with the paper and `STATUS.md` for what is proved and what is assumed.

## Build

    elan (https://github.com/leanprover/elan) → `lake exe cache get` → `lake build`

Toolchain and Mathlib revision are pinned in `lean-toolchain` and `lake-manifest.json`.

## Verifying there is no `sorry`

    grep -c sorry PairSingularSeries/*.lean          # every count is 0
    lake env lean Axioms.lean                          # every theorem: [propext, Classical.choice, Quot.sound]

## What "verified" means here — read this before citing

Theorem 1 will be verified with the existence of the constant `C(f)` (a conditionally convergent
product; Landau's theorem) as its one hypothesis, exactly as the paper uses it. Theorem 5's exact
identities will be verified unconditionally; its asymptotic will be verified *conditionally* on three
named inputs stated as Lean hypotheses — the existence of `C(f)`, the paper's Theorem 2, and Shiu's
theorem — none of which is in Mathlib. `STATUS.md` lists every such hypothesis. Nothing stronger is
claimed.
