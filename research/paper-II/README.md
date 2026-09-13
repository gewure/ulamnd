# research/paper-II/ — paper II: zeros of Dedekind zeta functions in the second moment of prime values

`main.tex` (22 pp, 13 September 2026): the diagonal Dirichlet series E_f as an infinite product of Artin L-functions of
the plethystic exponents Ψ_N; pair fields; the natural boundary Re s = −1; the RH-conditional explicit formula for the
Riesz means of the diagonal (quadratics in full; general f with the correction of 13 September: a polynomial in log x
at s = −2/3 whose degree is one less than the multiplicity of the trivial character in Ψ₃, `research/ERRATA.md` item
12); the unconditional Ω-theorem; the off-diagonal as a Dirichlet series of Weyl sums; every coefficient for t²+1.

| file | what |
|---|---|
| `main.tex`, `refs.bib` | the paper; `tectonic main.tex` |
| `ROADMAP.md` | the programme as planned on 9–10 September (WP0–WP7); historical |
| `LITERATURE.md`, `LITERATURE-2.md`, `LITERATURE-3.md` | three literature rounds: verified references, the attributions to Kurokawa, Moroz and Hooley, the "safe sentence" about RH (§0 of the first) |
| `scripts/riesz-raw.ts` | raw Riesz means of the diagonal of t²+1 on a log grid (`npx tsx research/paper-II/scripts/riesz-raw.ts [X]`) |
| `scripts/explicit-diag.py K P GMAX` | exact explicit formula (exponents, constants, all residues) and the comparison with the data (defaults 8, 4e6, 100) |
| `scripts/gen-wp0.py` | generates `data/wp0.tex` from `data/explicit-diag.json` |
| `scripts/offdiag-spectrum.ts` | the null spectral test of the sharp off-diagonal (the right observable turned out to be paper IV's pieces) |
| `data/` | generated: `riesz-raw.*`, `explicit-diag*`, `wp0.tex` |

The errata file that used to live here is `research/ERRATA.md` (project-wide). Python scripts need mpmath and numpy in
a virtual environment (`python -m venv .venv && .venv/bin/pip install mpmath numpy`). Never edit numbers in `main.tex`
by hand; they come from `data/`.
