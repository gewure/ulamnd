# Scripts for this document

One script per number, or per family of numbers. Each script:

- states in its header what it computes, which statement in `main.tex` it supports, its parameters and its
  runtime;
- takes its parameters from the command line or the environment, with the values used in the paper as
  defaults, so that the paper's numbers are reproduced by running it with no arguments;
- writes its output to `../data/`, in a format that is read back by the document or by a table generator —
  never copied by hand;
- imports shared machinery from `research/lib/` rather than reimplementing it.

If a number in `main.tex` has no script here, it does not belong in `main.tex`.
