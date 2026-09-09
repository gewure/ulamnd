# research/paper-II/ — paper II: zeros of Dedekind zeta functions in the second moment of prime values

Scaffold created 9 September 2026. Builds on `../paper-I/main.tex` (paper I, v6).

| file | what |
|---|---|
| `ROADMAP.md` | the research programme: new structural facts, work packages WP0–WP7, milestones, honesty checks |
| `LITERATURE.md` | state of the art (two independent surveys, verified refs), gap analysis, the "RH connection" stated frankly |
| `ERRATA.md` | two corrections to paper I found while doing this (Theorem 4 last clause; Proposition 7) |
| `main.tex`, `refs.bib` | skeleton of paper II with theorem statements and status tags; compile `~/.local/bin/tectonic main.tex` |
| `scripts/riesz-raw.ts` | raw Riesz means of the diagonal of t²+1 on a log grid (`npx tsx research/paper-II/scripts/riesz-raw.ts [X]`) |
| `scripts/explicit-diag.py` | exact explicit formula (exponents, constants, all residues) and comparison with the data |
| `data/` | generated: `riesz-raw.{dat,json}`, `explicit-diag.json`, `explicit-diag-{2,3}.dat`, `wp0.tex` |

Python: `~/.venvs/ulamnd/bin/python` (mpmath 1.4, numpy 2.5; created 9 Sep 2026 because the system
Python has no pip). Run order: `riesz-raw.ts` (2 s) then `explicit-diag.py K P GMAX` (defaults 8, 4e6, 100;
test setting `8 1000000 60` takes about 15 min).

Never edit numbers in `main.tex` by hand; `data/wp0.tex` is to be generated from `data/explicit-diag.json`.
