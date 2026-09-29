# Upstreaming to Mathlib

`files/` — the four Mathlib-ready files exactly as committed on the branches of the local checkout
`mathlib4/` (ignored by git; ~7 GB with cache; recreate with `git clone https://github.com/leanprover-community/mathlib4 && lake exe cache get`
and re-apply `files/` at the paths in `pr/HOWTO.md`). `drafts/` — the same files in the `import Mathlib` + `#min_imports` form used to
find the minimal imports. `pr/` — the PR descriptions and `HOWTO.md` (the Zulip request for write access, the push commands, the rebase
recipe). All four build on Mathlib master `03f575ef70` and pass `lint-style` and `runLinter`.
