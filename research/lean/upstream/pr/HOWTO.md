# Upstreaming to Mathlib — what is prepared, what you must do

## 1 Oct 2026: REASSESSMENT after the Zulip feedback ("not to the level Mathlib needs"; no specifics received)

A self-audit against the usual review criteria — duplication, generality, placement, proof style — changes the plan:

| PR | audit | action |
|---|---|---|
| 1 CRT counting | no duplicate found; elementary and self-contained; placement (`Data/Nat/ChineseRemainder/Count.lean`) plausible; reviewers may prefer a `ZMod` formulation via `ZMod.chineseRemainder` | **keep**, offer the `ZMod` restatement if asked |
| 2 squarefree summability | the whole 150-line file is a CONSEQUENCE of Mathlib's own `summable_and_hasSum_smoothNumbers_prod_primesBelow_tsum` applied to `‖f‖`; the squarefree hypothesis is unnecessary | **replaced** by `EulerProduct.summable_norm_of_summable_primes` (any multiplicative `f`; hypotheses: `Summable ‖f (p^n)‖` at each prime and `Summable (p ↦ ∑_{n≥1} ‖f (p^n)‖)` over the primes), ~45 lines, inside `EulerProduct/Basic.lean` where it belongs; PR text `PR-2-squarefree-summable.md` rewritten |
| 3 antidiagonal regrouping | adds one general lemma over the three-line proof already in `LSeriesHasSum.convolution`; no second use inside Mathlib | **withdrawn** (park in the project) |
| 4 discrete Abel tail bound | duplicates `Finset.sum_Ioc_by_parts` (the identity) and `Real.log_le_rpow_div` at ε = 1/2 (`log x ≤ 2√x`); the tail bound with `L log n + O(1)` is too specific for Mathlib | **withdrawn** (stays in the project as `Tail.lean`) |

If the Zulip message said something more specific, paste it verbatim and the plan will be adjusted to it. The paragraphs below describe the original four
branches; branches 3 and 4 are left in the checkout but should not be pushed.

## (original notes)


Prepared (30 Sep 2026) in the local checkout `research/lean/upstream/mathlib4` (Mathlib master
`03f575ef70`, Lean `v4.35.0-rc3`), four branches with ONE commit each, all four building and passing
Mathlib's `lint-style` and `runLinter`, registered in `Mathlib.lean` by `mk_all`:

| branch | file | PR text |
|---|---|---|
| `reichardt/nat-crt-count` | `Mathlib/Data/Nat/ChineseRemainder/Count.lean` | `PR-1-crt-count.md` |
| `reichardt/squarefree-summable` | `Mathlib/NumberTheory/EulerProduct/SquarefreeSummable.lean` | `PR-2-squarefree-summable.md` |
| `reichardt/tsum-divisors-antidiagonal` | `Mathlib/NumberTheory/SumDivisorsAntidiagonal.lean` | `PR-3-tsum-divisors-antidiagonal.md` |
| `reichardt/discrete-abel-tail` | `Mathlib/NumberTheory/AbelSummationDiscrete.lean` | `PR-4-discrete-abel-tail.md` |

Suggested order of submission: 1, 3, 2, then 4 (4 is the most specialised; expect a request to
generalise or to move it, and possibly a suggestion that it belongs in a downstream project).

## Why this cannot be finished from the terminal alone

Mathlib accepts pull requests only from branches on `leanprover-community/mathlib4` itself (CI does not
run on forks), so pushing needs write access to that repository. New contributors get it by asking once
on the Lean Zulip. There is no `gh` on this machine and no GitHub token, so the two remaining steps are:

1. **Ask for write access** (once). On https://leanprover.zulipchat.com, stream `#new members` (or
   `#mathlib4`), post:

   > Hi, I'd like to contribute four small lemmas to Mathlib (a counting form of the Chinese remainder
   > theorem, summability of a squarefree-supported multiplicative function from its values at primes,
   > regrouping a double series along divisor antidiagonals, and a discrete partial-summation tail bound;
   > all four are extracted from a Lean formalisation of a paper on the pair singular series of a
   > polynomial). Could I get write access to push branches? My GitHub username is `gewure`.

   (Replace the username if your Mathlib account differs. Access is normally granted within a day.)

2. **Push and open** (per branch; from `research/lean/upstream/mathlib4`):

       git remote add upstream https://github.com/leanprover-community/mathlib4.git   # once
       git push upstream reichardt/nat-crt-count
       # then open https://github.com/leanprover-community/mathlib4/compare/master...reichardt/nat-crt-count
       # title = first line of the commit; body = the matching PR-*.md; add the label `t-number-theory`
       # (`t-data` for PR 1); leave `awaiting-review`.

   Alternatively, after access is granted, ask Claude Code to push and open them: with `gh` installed
   (`sudo dnf install gh && gh auth login`) it can do both from the terminal.

## Before pushing, if master has moved

Rebase each branch: `git fetch upstream && git rebase upstream/master`, then `lake exe cache get &&
lake build <module>` and `lake exe runLinter <module>` again. `Mathlib.lean` may conflict trivially
(one added line); re-run `lake exe mk_all` and `git add Mathlib.lean`.

## Disclosure

Mathlib asks contributors to be able to explain and maintain their code. These four files were written
with heavy AI assistance (Claude Code) and every proof was checked by Lean; say so in the PR body (the
texts already do). The mathematics is elementary and the author can defend every line; that is the
standard that matters to the reviewers.
