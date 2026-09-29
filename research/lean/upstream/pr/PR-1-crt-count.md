**Title:** feat(Data/Nat/ChineseRemainder/Count): counting form of the Chinese remainder theorem

For coprime `m` and `n`, the map `x ↦ (x % m, x % n)` is a bijection from `Finset.range (m * n)` onto
`Finset.range m ×ˢ Finset.range n`; consequently, for arbitrary predicates `P`, `Q`,

```
#{x ∈ range (m * n) | P (x % m) ∧ Q (x % n)} = #{a ∈ range m | P a} * #{b ∈ range n | Q b}
```

(`Nat.card_filter_range_mul_of_coprime`, with `Nat.injOn_mod_mod_range` and `Nat.image_mod_mod_range`).
No positivity hypotheses are needed: both sides vanish if `m = 0` or `n = 0`.

Motivation: this is the form of the Chinese remainder theorem that makes the number of roots of an integer
polynomial modulo `d` — and the number of common roots of two polynomials modulo `d` — a multiplicative
function of `d`, without passing through `ZMod` or a ring isomorphism. I could not find it in Mathlib in
this generality (`Nat.chineseRemainder` gives the bijection element-wise; `ZMod.chineseRemainder` the ring
isomorphism; neither the count with predicates).

Extracted from a Lean formalisation of the paper *The pair singular series of a polynomial I* (repository
`gewure/ulamnd`, directory `research/lean`). Written with substantial assistance from Claude Code; every
proof is checked by Lean and I can explain each step.
